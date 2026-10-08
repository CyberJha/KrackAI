export interface FeedbackItem {
  id: string;
  timestamp: number;
  rating: 'up' | 'down';
  sampleSnippet: string;
  candidateName?: string;
  burstinessScore?: number;
  zerogptScore?: number;
  detectedMarkers?: string[];
  feedbackTag?: string;
}

const STORAGE_KEY = 'krackai_humanizer_feedback_history';

/**
 * Retrieves all stored feedback items from localStorage
 */
export function getStoredFeedbackItems(): FeedbackItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse feedback items from localStorage', e);
    return [];
  }
}

/**
 * Saves a new feedback item into localStorage (keeps last 20 items)
 */
export function storeFeedbackItem(item: FeedbackItem): FeedbackItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getStoredFeedbackItems().filter((f) => f.id !== item.id);
    const updated = [item, ...current].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed to save feedback item to localStorage', e);
    return [];
  }
}

/**
 * Clears feedback for a specific output ID
 */
export function removeFeedbackItem(id: string): FeedbackItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getStoredFeedbackItems().filter((f) => f.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return current;
  } catch (e) {
    return [];
  }
}

/**
 * Builds dynamic adaptive feedback instructions to inject into LLM prompts
 */
export function buildAdaptiveFeedbackDirectives(items?: FeedbackItem[]): string {
  const history = items || getStoredFeedbackItems();
  if (history.length === 0) return "";

  const upvotes = history.filter((h) => h.rating === "up");
  const downvotes = history.filter((h) => h.rating === "down");

  const lines: string[] = [];

  if (upvotes.length > 0) {
    const preferredCandidates = Array.from(new Set(upvotes.map((u) => u.candidateName).filter(Boolean)));
    const avgBurstiness = Math.round(
      upvotes.reduce((acc, u) => acc + (u.burstinessScore || 75), 0) / upvotes.length
    );

    lines.push("REINFORCE USER-PREFERRED STYLISTIC ATTRIBUTES (Learned from user thumbs-up feedback):");
    lines.push("- Maintain target burstiness around " + avgBurstiness + "/100 with dynamic, non-uniform sentence lengths.");
    lines.push("- Interleave punchy 3-to-6-word observations with natural compound conversational sentences.");
    lines.push("- Use generous natural contractions (it's, don't, we've, that's, won't) to keep rhythm grounded.");
    if (preferredCandidates.length > 0) {
      lines.push("- Prioritize tonality favored in previous successful runs: " + preferredCandidates.join(", ") + ".");
    }
  }

  if (downvotes.length > 0) {
    lines.push("AVOID REPEAT OF DISLIKED PATTERNS (Learned from user thumbs-down feedback):");
    lines.push('- Strictly avoid formal transition padding ("moreover", "furthermore", "it is worth noting", "crucially", "ultimately").');
    lines.push("- Do NOT produce monotonous medium-length sentences or symmetrical paragraph structures.");
    lines.push("- Never include promotional hyperbole, meta-commentary, or artificial introductory staging.");
  }

  return lines.join("\n");
}
