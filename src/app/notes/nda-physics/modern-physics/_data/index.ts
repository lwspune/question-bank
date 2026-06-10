import type { SubtopicNote } from "@/app/notes/_types";
import { PHOTOELECTRIC_EFFECT_NOTE } from "./photoelectric-effect";
import { ATOMIC_STRUCTURE_NOTE } from "./atomic-structure";
import { NUCLEAR_PHYSICS_NOTE } from "./nuclear-physics";
import { QUANTUM_AND_MODERN_EM_NOTE } from "./quantum-and-modern-em";
import { SCIENTISTS_AND_DISCOVERIES_NOTE } from "./scientists-and-discoveries";
import { SCIENTIFIC_ACRONYMS_NOTE } from "./scientific-acronyms";

export { MODERN_PHYSICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-physics/modern-physics/[subtopicSlug].
 * Slugs are "mod-" prefixed to stay globally unique across all NOTES_CHAPTERS
 * (the slug is the concept-tag key, not just a URL segment).
 * Render order is owned by chapter.subtopicOrder.
 */
export const MODERN_PHYSICS_NOTES: Record<string, SubtopicNote> = {
  "mod-photoelectric-effect": PHOTOELECTRIC_EFFECT_NOTE,
  "mod-atomic-structure": ATOMIC_STRUCTURE_NOTE,
  "mod-nuclear-physics": NUCLEAR_PHYSICS_NOTE,
  "mod-quantum-and-modern-em": QUANTUM_AND_MODERN_EM_NOTE,
  "mod-scientists-and-discoveries": SCIENTISTS_AND_DISCOVERIES_NOTE,
  "mod-scientific-acronyms": SCIENTIFIC_ACRONYMS_NOTE,
};

export const MODERN_PHYSICS_SLUGS = Object.keys(MODERN_PHYSICS_NOTES);
