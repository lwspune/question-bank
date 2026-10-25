/**
 * From when NEW questions of an exam must arrive with their animated-solution
 * verdict (owner, 2026-10-25: for a subject that has scenes, visuals are part
 * of ingestion, not a later wave). Exam name -> ISO date. Every PUBLIC question
 * of that exam created on or after the date must carry a visual or a recorded
 * verdict (scripts/visuals/data/*.json); tests/visuals-ingestion-gate.test.ts
 * checks it daily against production.
 *
 * Empty until Wave 1 ships for an exam: set its date in the same commit that
 * puts its first scenes live.
 */
export const VISUAL_INGESTION_FROM: Readonly<Record<string, string>> = {};
