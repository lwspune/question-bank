/**
 * Pure section-template helpers. A template is an ordered, fully-editable list
 * of sections (subjects). Keys are stable slugs — renaming a section changes its
 * label, never its key, because `paper_questions.section_key` references it.
 *
 * `subjectToSectionKey` is the elegant tie-in: when a teacher adds a question
 * from the bank, the section is DERIVED from the question's subject, so the GAT
 * default ("English" question -> "english" section) needs no manual filing.
 */
import type { PaperSection, SectionTemplate } from "./types";

/** Reserved bucket for questions whose subject matches no section. Never a real subject slug. */
export const UNASSIGNED_KEY = "unassigned";

/**
 * Default sections for a new GAT paper. Editable per paper — add/delete/rename
 * subjects, retarget counts. Targets sum to ~150 (NDA GAT); the exact split is a
 * convenience starting point, not a constraint.
 */
export const DEFAULT_GAT_TEMPLATE: SectionTemplate = [
  { key: "english", label: "English", targetCount: 50, assignedTo: [] },
  { key: "physics", label: "Physics", targetCount: 20, assignedTo: [] },
  { key: "chemistry", label: "Chemistry", targetCount: 15, assignedTo: [] },
  { key: "biology", label: "Biology", targetCount: 10, assignedTo: [] },
  { key: "history", label: "History", targetCount: 20, assignedTo: [] },
  { key: "geography", label: "Geography", targetCount: 20, assignedTo: [] },
  { key: "polity", label: "Polity", targetCount: 5, assignedTo: [] },
  { key: "economics", label: "Economics", targetCount: 5, assignedTo: [] },
  { key: "current-affairs", label: "Current Affairs", targetCount: 5, assignedTo: [] },
];

export function slugifySectionKey(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Append a section with a unique key derived from its label (numeric-suffixed on collision). */
export function addSection(
  template: SectionTemplate,
  input: { label: string; targetCount: number; assignedTo?: string[] }
): SectionTemplate {
  const base = slugifySectionKey(input.label) || "section";
  const existing = new Set(template.map((s) => s.key));
  let key = base;
  let n = 2;
  while (existing.has(key) || key === UNASSIGNED_KEY) {
    key = `${base}-${n}`;
    n += 1;
  }
  const section: PaperSection = {
    key,
    label: input.label,
    targetCount: input.targetCount,
    assignedTo: input.assignedTo ?? [],
  };
  return [...template, section];
}

export function removeSection(template: SectionTemplate, key: string): SectionTemplate {
  return template.filter((s) => s.key !== key);
}

/** Rename a section's label; the key is left untouched so membership still resolves. */
export function renameSection(
  template: SectionTemplate,
  key: string,
  label: string
): SectionTemplate {
  return template.map((s) => (s.key === key ? { ...s, label } : s));
}

export function setSectionTarget(
  template: SectionTemplate,
  key: string,
  targetCount: number
): SectionTemplate {
  return template.map((s) => (s.key === key ? { ...s, targetCount } : s));
}

export function setSectionAssignees(
  template: SectionTemplate,
  key: string,
  assignedTo: string[]
): SectionTemplate {
  return template.map((s) => (s.key === key ? { ...s, assignedTo } : s));
}

/** Reorder by the supplied key order; keys not listed keep their relative order after. */
export function reorderSections(
  template: SectionTemplate,
  keyOrder: string[]
): SectionTemplate {
  const byKey = new Map(template.map((s) => [s.key, s] as const));
  const out: PaperSection[] = [];
  const taken = new Set<string>();
  for (const k of keyOrder) {
    const s = byKey.get(k);
    if (s && !taken.has(k)) {
      out.push(s);
      taken.add(k);
    }
  }
  for (const s of template) if (!taken.has(s.key)) out.push(s);
  return out;
}

/**
 * Map a question's subject name to the section it belongs in. Matches by label
 * (case-insensitive) or by slug equality. Returns null when nothing matches —
 * the caller then files the question under UNASSIGNED_KEY.
 */
export function subjectToSectionKey(
  subjectName: string,
  template: SectionTemplate
): string | null {
  const wantLabel = subjectName.trim().toLowerCase();
  const wantSlug = slugifySectionKey(subjectName);
  for (const s of template) {
    if (s.label.trim().toLowerCase() === wantLabel) return s.key;
    if (s.key === wantSlug) return s.key;
  }
  return null;
}
