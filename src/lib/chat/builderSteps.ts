/**
 * The steps of V's practice-test builder counted in chat_interactions
 * (migration 0157), in funnel order, with the labels /dashboard/chat shows.
 * The route refuses any other step, so the dashboard can trust the list.
 */
export const BUILDER_STEP_LABELS = [
  { step: "open", label: "Opened the builder" },
  { step: "sign_in", label: "Asked to sign in" },
  { step: "built", label: "Built a test" },
  { step: "start", label: "Started it online" },
  { step: "download", label: "Downloaded it" },
] as const;

export type BuilderStepId = (typeof BUILDER_STEP_LABELS)[number]["step"];

const STEPS: ReadonlySet<string> = new Set(BUILDER_STEP_LABELS.map((s) => s.step));

export function isBuilderStep(v: unknown): v is BuilderStepId {
  return typeof v === "string" && STEPS.has(v);
}
