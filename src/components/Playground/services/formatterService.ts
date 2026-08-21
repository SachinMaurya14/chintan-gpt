import { PlaygroundLanguageId } from "../types.js";

export interface FormatResult {
  success: boolean;
  formattedContent?: string;
  message?: string;
}

/**
 * Formatter Service for Playground IDE.
 * Clean abstraction for formatting source code across supported languages.
 * Uses Monaco Editor's registered document formatters.
 * Never claims formatting succeeded if no formatter actually ran.
 */
export class PlaygroundFormatterService {
  /**
   * Attempts to format the source code using Monaco's document formatter action.
   */
  static async formatCode(
    content: string,
    languageId: PlaygroundLanguageId,
    monacoEditor?: any
  ): Promise<FormatResult> {
    if (!content.trim()) {
      return { success: false, message: "Cannot format empty file." };
    }

    if (monacoEditor) {
      try {
        const action = monacoEditor.getAction("editor.action.formatDocument");
        if (action) {
          const prevValue = monacoEditor.getValue();
          await action.run();
          const newValue = monacoEditor.getValue();

          if (newValue !== prevValue) {
            return {
              success: true,
              formattedContent: newValue,
              message: "Document formatted successfully.",
            };
          } else {
            return {
              success: true,
              formattedContent: newValue,
              message: "Document is already well-formatted.",
            };
          }
        }
      } catch (err) {
        console.warn("Monaco format error:", err);
      }
    }

    // If Monaco formatter is unavailable for this language
    return {
      success: false,
      message: `Formatter is unavailable for ${languageId} in offline environment.`,
    };
  }
}
