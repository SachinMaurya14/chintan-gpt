import { LearningMemoryItem, MemoryCategory } from "../types/tutor.js";

const MEMORY_ENABLED_KEY = "chintan_tutor_memory_enabled_v1";
const MEMORY_ITEMS_KEY = "chintan_tutor_memory_items_v1";

const DEFAULT_MEMORY_ITEMS: LearningMemoryItem[] = [
  {
    id: "mem_default_1",
    category: "goal",
    text: "Targeting SDE role at top tech product & service companies (TCS Digital, Google, Amazon).",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mem_default_2",
    category: "weakness",
    text: "Needs progressive, step-by-step guidance on Dynamic Programming state formulation and Graph traversal.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mem_default_3",
    category: "preference",
    text: "Prefers concise technical explanations paired with real-world engineering analogies and Python/C++ examples.",
    updatedAt: new Date().toISOString(),
  },
];

export class MemoryService {
  /**
   * Check whether Learning Memory injection is active.
   */
  static isMemoryEnabled(): boolean {
    try {
      const stored = localStorage.getItem(MEMORY_ENABLED_KEY);
      if (stored === null) return true; // Default ON
      return stored === "true";
    } catch {
      return true;
    }
  }

  /**
   * Toggle Learning Memory ON or OFF.
   */
  static setMemoryEnabled(enabled: boolean): void {
    try {
      localStorage.setItem(MEMORY_ENABLED_KEY, String(enabled));
    } catch (e) {
      console.warn("Failed to set memory toggle:", e);
    }
  }

  /**
   * Get all active learning memory items.
   */
  static getMemoryItems(): LearningMemoryItem[] {
    try {
      const raw = localStorage.getItem(MEMORY_ITEMS_KEY);
      if (!raw) {
        // Initialize with helpful defaults
        this.saveMemoryItems(DEFAULT_MEMORY_ITEMS);
        return DEFAULT_MEMORY_ITEMS;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return DEFAULT_MEMORY_ITEMS;
    } catch (e) {
      console.warn("Failed to load memory items:", e);
      return DEFAULT_MEMORY_ITEMS;
    }
  }

  /**
   * Save array of memory items.
   */
  static saveMemoryItems(items: LearningMemoryItem[]): void {
    try {
      localStorage.setItem(MEMORY_ITEMS_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Failed to save memory items:", e);
    }
  }

  /**
   * Add a new learning memory item.
   */
  static addMemoryItem(category: MemoryCategory, text: string): LearningMemoryItem {
    const cleanText = text.trim();
    const newItem: LearningMemoryItem = {
      id: `mem_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      category,
      text: cleanText,
      updatedAt: new Date().toISOString(),
    };

    const items = this.getMemoryItems();
    items.unshift(newItem);
    this.saveMemoryItems(items);
    return newItem;
  }

  /**
   * Update an existing memory item.
   */
  static updateMemoryItem(id: string, text: string): void {
    const items = this.getMemoryItems();
    const item = items.find((m) => m.id === id);
    if (item) {
      item.text = text.trim();
      item.updatedAt = new Date().toISOString();
      this.saveMemoryItems(items);
    }
  }

  /**
   * Remove a memory item.
   */
  static removeMemoryItem(id: string): void {
    const items = this.getMemoryItems().filter((m) => m.id !== id);
    this.saveMemoryItems(items);
  }

  /**
   * Reset or clear all memory items.
   */
  static clearAllMemory(): void {
    try {
      localStorage.removeItem(MEMORY_ITEMS_KEY);
    } catch (e) {
      console.warn("Failed to clear memory:", e);
    }
  }
}
