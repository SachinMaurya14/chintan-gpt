import { GoogleGenAI } from "@google/genai";
import { performSearchGrounding, generateVisualDiagram } from "./gemini.js";

let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in environment variables.");
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export interface TutorChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  imageUrl?: string;
  sources?: { title: string; uri: string }[];
  isGrounded?: boolean;
  visualConcept?: string;
  timestamp?: string;
}

export interface TutorPageContext {
  tab?: string;
  courseTitle?: string;
  lessonTitle?: string;
  problemTitle?: string;
  problemDifficulty?: string;
  problemDescription?: string;
  currentCode?: string;
  language?: string;
  companyName?: string;
}

export interface LearningMemoryItem {
  id: string;
  category: "goal" | "weakness" | "preference" | "mastered" | "project";
  text: string;
  updatedAt: string;
}

export interface TutorRequestParams {
  message: string;
  imageAttachment?: {
    mimeType: string;
    base64Data: string;
    filename?: string;
  };
  conversationHistory?: TutorChatMessage[];
  pageContext?: TutorPageContext;
  learningMemory?: {
    enabled: boolean;
    items: LearningMemoryItem[];
  };
  enableSearchGrounding?: boolean;
}

export interface TutorResponseData {
  answer: string;
  intent: "learning" | "coding" | "placement" | "current_info" | "general" | "creative";
  sources?: { title: string; uri: string }[];
  isGrounded: boolean;
  visualConcept?: string;
  visualImageUrl?: string;
  suggestedFollowUps?: string[];
}

/**
 * Heuristically detect whether the prompt strictly requests real-time / current information
 * or hiring data that benefits from Google Search grounding.
 */
function requiresSearchGrounding(message: string): boolean {
  const m = message.toLowerCase();
  const searchKeywords = [
    "latest hiring",
    "hiring trend",
    "hiring trends",
    "software hiring",
    "recruitment trend",
    "placement trend",
    "recruitment 202",
    "hiring in 202",
    "batch 202",
    "current trend",
    "industry trend",
    "recent update",
    "news today",
    "salary trends 202",
    "placement cut off 202",
    "openings at",
    "current software market",
    "market condition",
    "who is currently hiring",
    "recent layoffs",
    "eligibility criteria 202"
  ];
  return searchKeywords.some((k) => m.includes(k));
}

/**
 * Heuristically detect if the prompt asks for a visual explanation or diagram.
 */
function extractVisualConcept(message: string): string | null {
  const m = message.toLowerCase();
  const visualPatterns = [
    /visualize\s+([\w\s\-]+)/i,
    /show\s+(?:how\s+)?([\w\s\-]+?)\s+(?:works|visually)/i,
    /explain\s+([\w\s\-]+?)\s+visually/i,
    /diagram\s+(?:of|for)\s+([\w\s\-]+)/i,
    /draw\s+([\w\s\-]+)/i,
    /schematic\s+(?:of|for)\s+([\w\s\-]+)/i,
  ];

  for (const pat of visualPatterns) {
    const match = m.match(pat);
    if (match && match[1]) {
      const concept = match[1].replace(/please|can you|could you/gi, "").trim();
      if (concept.length > 2 && concept.length < 50) {
        return concept;
      }
    }
  }

  if (m.includes("visualize") || m.includes("show visually") || m.includes("draw diagram")) {
    return message.replace(/visualize|show visually|draw diagram|please|show me/gi, "").trim() || "Algorithmic Pipeline";
  }

  return null;
}

/**
 * Primary Chintan AI Tutor generation orchestrator.
 * Follows the Critical Behavior Rule:
 * USER INTENT > ACTIVE PAGE CONTEXT.
 * Never force unrelated page context into an answer.
 */
export async function generateTutorResponse(params: TutorRequestParams): Promise<TutorResponseData> {
  const {
    message,
    imageAttachment,
    conversationHistory = [],
    pageContext,
    learningMemory,
    enableSearchGrounding,
  } = params;

  const trimmedQuery = message.trim();

  // 1. Check if Search Grounding is required or requested
  const shouldSearch = enableSearchGrounding || requiresSearchGrounding(trimmedQuery);
  let groundingResult: { answer: string; sources: { title: string; uri: string }[]; isGrounded: boolean } | null = null;

  if (shouldSearch && !imageAttachment) {
    try {
      groundingResult = await performSearchGrounding({
        query: trimmedQuery,
        context: pageContext?.companyName ? `Company: ${pageContext.companyName}` : undefined,
      });

      if (groundingResult && groundingResult.isGrounded && groundingResult.answer) {
        // Check if user also asked for a visual concept
        const visualConcept = extractVisualConcept(trimmedQuery);
        let visualImageUrl: string | undefined = undefined;
        if (visualConcept) {
          try {
            const img = await generateVisualDiagram({ concept: visualConcept });
            if (img) visualImageUrl = img;
          } catch {}
        }

        return {
          answer: groundingResult.answer,
          intent: "current_info",
          sources: groundingResult.sources,
          isGrounded: true,
          visualConcept: visualConcept || undefined,
          visualImageUrl,
          suggestedFollowUps: [
            "How does this compare to last year?",
            "What preparation strategy fits these updates?",
            "Give me a related practice question"
          ]
        };
      }
    } catch (e) {
      console.warn("Search grounding fallback to generative tutor:", e);
    }
  }

  // 2. Prepare Context & Learning Memory Injections
  let memoryBlock = "";
  if (learningMemory?.enabled && Array.isArray(learningMemory.items) && learningMemory.items.length > 0) {
    memoryBlock = `\n[LEARNING MEMORY ACTIVE]\nThe student has specified these persistent profile items:\n${learningMemory.items
      .map((item) => `- [${item.category.toUpperCase()}]: ${item.text}`)
      .join("\n")}\nTailor pedagogical explanations, examples, and tone respectfully to these preferences when naturally applicable.\n`;
  }

  let pageContextBlock = "";
  if (pageContext) {
    const contextLines: string[] = [];
    if (pageContext.tab) contextLines.push(`- Current Platform Tab: ${pageContext.tab}`);
    if (pageContext.problemTitle) contextLines.push(`- Active Coding Problem: "${pageContext.problemTitle}" (${pageContext.problemDifficulty || "Standard"})`);
    if (pageContext.language) contextLines.push(`- Language in Editor: ${pageContext.language}`);
    if (pageContext.currentCode && pageContext.currentCode.trim().length > 0) {
      contextLines.push(`- Current Editor Code:\n\`\`\`${pageContext.language || "text"}\n${pageContext.currentCode.slice(0, 1500)}\n\`\`\``);
    }
    if (pageContext.courseTitle) contextLines.push(`- Active Course: "${pageContext.courseTitle}" (Lesson: "${pageContext.lessonTitle || 'Overview'}")`);
    if (pageContext.companyName) contextLines.push(`- Selected Placement Target: ${pageContext.companyName}`);

    if (contextLines.length > 0) {
      pageContextBlock = `\n[OPTIONAL SUPPORTING PAGE CONTEXT]\n${contextLines.join("\n")}\nCRITICAL INSTRUCTION: This page context is ONLY background information. If the student's question is unrelated (e.g. asking for a story, general knowledge, a different concept, or a joke), COMPLETELY IGNORE the page context and directly satisfy the user's intent!\n`;
    }
  }

  // 3. System Instruction enforcing intelligent, friendly, pedagogical student companion behavior
  const systemInstruction = `You are Chintan AI Tutor, the lead intelligent student companion embedded natively inside Chintan GPT.
You empower engineering and computer science students across India and globally in DSA, Software Engineering, System Design, Web Development, Competitive Programming, Campus Placements (TCS, Infosys, Wipro, Amazon, Google, etc.), and general day-to-day inquiries.

CORE BEHAVIOR RULES:
1. USER INTENT > ACTIVE PAGE CONTEXT:
   - Always prioritize the user's current question over any background page context.
   - If the user asks a creative question (e.g., "Tell me a story", "Tell a joke"), answer creatively with wit and warmth.
   - If the user asks a general knowledge or college question (e.g., "What is BBD University?", "How do I manage time?"), answer directly and helpful.
   - If the user asks about an algorithm or code while working on an editor, inspect their code and provide progressive hints without immediately giving away full solutions.
2. PEDAGOGY & TONE:
   - Warm, encouraging, articulate, technical yet intuitive.
   - Use clean Markdown with bold keywords, formatted lists, and concise paragraphs.
   - Use LaTeX syntax for math when appropriate ($O(N)$, $O(\\log N)$, $\\sum$).
   - For code, always specify the language in markdown blocks (\`\`\`python, \`\`\`cpp, \`\`\`java).
   - If the student is struggling or making an error, explain the *why* gently.
3. VISUAL EXPLANATION:
   - When the user asks to visualize or see a concept, explicitly explain the states step-by-step and provide a clear textual mental model.
4. HONESTY:
   - Never fabricate facts. If something is unknown or ambiguous, explain the trade-offs honestly.
${memoryBlock}${pageContextBlock}`;

  try {
    const ai = getAI();
    const TUTOR_MODELS = [
      "gemini-2.5-flash",
      "gemini-3.8-flash",
      "gemini-3.7-flash",
      "gemini-3-flash-preview",
      "gemini-3.1-flash-lite",
      "gemini-flash-latest"
    ];

  // Build multi-turn contents
  const contents: any[] = [];

  // Append recent conversation history (up to last 10 messages for context depth)
  const recentHistory = conversationHistory.slice(-10);
  for (const msg of recentHistory) {
    if (msg.role === "user") {
      contents.push({
        role: "user",
        parts: [{ text: msg.content }],
      });
    } else if (msg.role === "assistant") {
      contents.push({
        role: "model",
        parts: [{ text: msg.content }],
      });
    }
  }

  // Build the current prompt part(s)
  const currentParts: any[] = [];

  // Multimodal image attachment
  if (imageAttachment && imageAttachment.base64Data) {
    currentParts.push({
      inlineData: {
        mimeType: imageAttachment.mimeType || "image/png",
        data: imageAttachment.base64Data,
      },
    });
  }

  currentParts.push({
    text: trimmedQuery || "Please review the attached image and provide guidance.",
  });

  contents.push({
    role: "user",
    parts: currentParts,
  });

  let rawAnswer = "";
  let lastError: any = null;

  for (const model of TUTOR_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.65,
        },
      });

      if (response && response.text) {
        rawAnswer = response.text.trim();
        break;
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`[Chintan AI Tutor] Model ${model} failed, attempting next candidate...`, err?.message || err);
    }
  }

  if (!rawAnswer) {
    if (lastError) {
      throw lastError;
    }
    rawAnswer = "I am here to help you learn and build. Could you please rephrase or elaborate on your question?";
  }

  const answer = rawAnswer;

    // Detect intent
    let intent: TutorResponseData["intent"] = "learning";
    const lowerQ = trimmedQuery.toLowerCase();
    if (lowerQ.includes("code") || lowerQ.includes("debug") || lowerQ.includes("error") || lowerQ.includes("syntax") || pageContext?.currentCode) {
      intent = "coding";
    } else if (lowerQ.includes("tcs") || lowerQ.includes("placement") || lowerQ.includes("interview") || lowerQ.includes("resume") || lowerQ.includes("hr round")) {
      intent = "placement";
    } else if (lowerQ.includes("joke") || lowerQ.includes("story") || lowerQ.includes("poem") || lowerQ.includes("motivat")) {
      intent = "creative";
    } else if (lowerQ.includes("college") || lowerQ.includes("what is") || lowerQ.includes("who is") || lowerQ.includes("how to")) {
      intent = "general";
    }

    // Check if visual diagram should be generated
    const visualConcept = extractVisualConcept(trimmedQuery);
    let visualImageUrl: string | undefined = undefined;
    if (visualConcept) {
      try {
        const diagram = await generateVisualDiagram({
          concept: visualConcept,
          context: answer.slice(0, 300),
        });
        if (diagram) visualImageUrl = diagram;
      } catch (err) {
        console.warn("Visual generation error inside tutor:", err);
      }
    }

    // Dynamic suggested follow-ups
    const followUps: string[] = [];
    if (intent === "coding") {
      followUps.push("What is the Big-O time and space complexity?", "Can we optimize this further?", "Walk me through edge cases");
    } else if (intent === "learning") {
      followUps.push("Can you explain this with a real-world analogy?", "Show me a quick code example", "Visualize this concept");
    } else if (intent === "placement") {
      followUps.push("What questions does TCS/Google ask on this?", "Give me a mock interview question on this", "What are the common pitfalls in this round?");
    } else {
      followUps.push("Tell me more about this", "How can I apply this?", "Can you summarize in 3 key takeaways?");
    }

    return {
      answer,
      intent,
      isGrounded: false,
      visualConcept: visualConcept || undefined,
      visualImageUrl,
      suggestedFollowUps: followUps,
    };
  } catch (err: any) {
    console.error("Tutor Gemini generation failed:", err);
    throw new Error(`AI Tutor generation failed: ${err.message || "Unknown model error"}`);
  }
}
