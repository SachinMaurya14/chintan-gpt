export type MessageRole = "user" | "assistant" | "system";

export interface MessageAttachment {
  name: string;
  mimeType: string;
  dataUrl: string; // base64 data url
  sizeBytes?: number;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface TutorMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  attachment?: MessageAttachment;
  sources?: GroundingSource[];
  isGrounded?: boolean;
  visualConcept?: string;
  visualImageUrl?: string;
  suggestedFollowUps?: string[];
  isPending?: boolean;
  isError?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: TutorMessage[];
}

export type MemoryCategory = "goal" | "weakness" | "preference" | "mastered" | "project";

export interface LearningMemoryItem {
  id: string;
  category: MemoryCategory;
  text: string;
  updatedAt: string;
}

export type DateGroupKey = "Today" | "Yesterday" | "Previous 7 Days" | "Older";

export interface DateGroupedSessions {
  today: ChatSession[];
  yesterday: ChatSession[];
  previous7Days: ChatSession[];
  older: ChatSession[];
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

export interface TutorChatRequest {
  message: string;
  imageAttachment?: {
    mimeType: string;
    base64Data: string;
    filename?: string;
  };
  conversationHistory?: {
    role: "user" | "assistant" | "system";
    content: string;
  }[];
  pageContext?: TutorPageContext;
  learningMemory?: {
    enabled: boolean;
    items: LearningMemoryItem[];
  };
  enableSearchGrounding?: boolean;
}

export interface TutorChatResponse {
  success: boolean;
  answer: string;
  intent: "learning" | "coding" | "placement" | "current_info" | "general" | "creative";
  sources?: GroundingSource[];
  isGrounded: boolean;
  visualConcept?: string;
  visualImageUrl?: string;
  suggestedFollowUps?: string[];
  error?: string;
}
