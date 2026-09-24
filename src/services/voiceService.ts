// Browser Speech Recognition & Speech Synthesis Utility

// Type declarations for Web Speech API
interface IWindowSpeech extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export class VoiceService {
  private static recognitionInstance: any = null;
  private static isCurrentlyListening = false;

  /**
   * Check if Speech Recognition (STT) is supported in this browser.
   */
  static isSpeechRecognitionSupported(): boolean {
    if (typeof window === "undefined") return false;
    const win = window as unknown as IWindowSpeech;
    return Boolean(win.SpeechRecognition || win.webkitSpeechRecognition);
  }

  /**
   * Check if Speech Synthesis (TTS) is supported.
   */
  static isSpeechSynthesisSupported(): boolean {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  /**
   * Start listening for voice input.
   */
  static startListening(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (error: string) => void,
    onEnd?: () => void
  ): boolean {
    if (!this.isSpeechRecognitionSupported()) {
      onError("Speech recognition is not supported in this browser. Try Chrome, Edge, or Safari.");
      return false;
    }

    try {
      this.stopListening();

      const win = window as unknown as IWindowSpeech;
      const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;
      const recognition = new SpeechRec();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-IN"; // Good for English with Indian accent, fallback to en-US

      recognition.onstart = () => {
        this.isCurrentlyListening = true;
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalTranscript += item[0].transcript;
          } else {
            interimTranscript += item[0].transcript;
          }
        }

        const combined = finalTranscript || interimTranscript;
        if (combined.trim()) {
          onResult(combined, Boolean(finalTranscript));
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        if (event.error !== "no-speech") {
          onError(`Speech recognition error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        this.isCurrentlyListening = false;
        if (onEnd) onEnd();
      };

      recognition.start();
      this.recognitionInstance = recognition;
      return true;
    } catch (err: any) {
      console.error("Failed to start speech recognition:", err);
      onError(err.message || "Failed to start speech recognition");
      return false;
    }
  }

  /**
   * Stop speech recognition.
   */
  static stopListening(): void {
    if (this.recognitionInstance) {
      try {
        this.recognitionInstance.stop();
      } catch {}
      this.recognitionInstance = null;
    }
    this.isCurrentlyListening = false;
  }

  /**
   * Check if speech recognition is active.
   */
  static isListening(): boolean {
    return this.isCurrentlyListening;
  }

  /**
   * Speak out text using browser SpeechSynthesis.
   */
  static speakText(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): void {
    if (!this.isSpeechSynthesisSupported()) {
      if (onError) onError(new Error("Speech synthesis not supported in this browser"));
      return;
    }

    try {
      this.stopSpeaking();

      // Clean markdown tags & code blocks for smooth speech
      const cleaned = text
        .replace(/```[\s\S]*?```/g, "Code block omitted.")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/[*_#~>[\]]/g, "")
        .replace(/https?:\/\/\S+/g, "")
        .trim();

      if (!cleaned) return;

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      // Find an English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) => (v.name.includes("Google") || v.name.includes("Natural") || v.lang.startsWith("en")) && !v.name.includes("Whisper")
      );
      if (preferred) {
        utterance.voice = preferred;
      }

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      utterance.onerror = (err) => {
        if (onError) onError(err);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
      if (onError) onError(err);
    }
  }

  /**
   * Stop speaking.
   */
  static stopSpeaking(): void {
    if (this.isSpeechSynthesisSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Check if speech synthesis is currently active.
   */
  static isSpeaking(): boolean {
    return this.isSpeechSynthesisSupported() && window.speechSynthesis.speaking;
  }
}
