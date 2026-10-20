/**
 * V's six default questions, RETIRED 2026-10-20 (owner). The buttons and the
 * route that answered them (/api/chat/faq) are gone: V's AI answers the same
 * questions, and the "Which exams?" answer said "28 exams" while the AI said
 * otherwise. The labels stay, because stored chats (chat_interactions rows
 * with event_type faq_click, 2026-09-29 to 2026-10-20) still name these ids,
 * and the chat history and dashboard show a tap by its label.
 */

export type ChatFaqId =
  | "exams"
  | "signup"
  | "mock-pass"
  | "notes"
  | "mocks"
  | "bank-size";

// Student-facing on purpose (see the "student specific" pivot). Downloads are
// answered inside "mock-pass" since 2026-10-01, when the one pass took them on.
export const PREDEFINED_QUESTIONS: readonly { id: ChatFaqId; label: string }[] = [
  { id: "exams", label: "Which exams do you cover?" },
  { id: "signup", label: "Do I need an account to browse questions?" },
  { id: "notes", label: "Where do I find notes for a subject?" },
  { id: "mocks", label: "Do you have timed mock tests?" },
  { id: "mock-pass", label: "What's the Premium Pass?" },
  { id: "bank-size", label: "How many questions are in the bank?" },
];
