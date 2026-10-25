/**
 * Turn an agent's draft into a stored visual (scripts/visuals/assemble.ts).
 * The agent writes params, steps and the answer; this adds what an agent must
 * never be trusted with: the version, the scene name and the fingerprint of
 * the solution as stored. Then it runs the same parse, step and self-check
 * tests the batch tool runs, so a bad draft is dropped here with a reason.
 *
 * One tolerance: an agent writes 0.1353 for e^-2. If the draft's answer agrees
 * with the scene's own value to 1 part in 1000, the scene's exact value is
 * stored; anything further off is refused. Pure. Spec: tests/visuals-assemble.test.ts.
 */
import { getScene } from "./registry";
import { checkVisual, parseSolutionVisual, solutionFingerprint, stepTexts } from "./visual";

export type Assembled = { ok: true; visual: unknown } | { ok: false; skipped?: boolean; reason: string };

export function assembleDraft(draft: unknown, sceneId: string, solution: string | null): Assembled {
  if (!draft || typeof draft !== "object") return { ok: false, reason: "not an object" };
  const d = draft as { skip?: unknown; reason?: unknown; params?: unknown; steps?: unknown; answer?: unknown };
  if (d.skip === true) return { ok: false, skipped: true, reason: typeof d.reason === "string" ? d.reason : "skipped" };
  if (!solution) return { ok: false, reason: "the question has no stored solution" };
  const scene = getScene(sceneId);
  if (!scene) return { ok: false, reason: `unknown scene ${sceneId}` };

  const answer = d.answer as { value?: unknown; label?: unknown; tolerance?: unknown } | undefined;
  const visual = {
    v: 1,
    scene: sceneId,
    params: d.params,
    steps: d.steps,
    fingerprint: solutionFingerprint(solution),
    answer: { ...(answer ?? {}) },
  };

  // Snap a close answer to the scene's exact value before the strict check.
  const parsed = parseSolutionVisual(visual);
  if (!parsed.ok) return { ok: false, reason: parsed.error };
  const own = scene.check(parsed.visual.params);
  const given = parsed.visual.answer.value;
  if (Number.isFinite(own) && parsed.visual.answer.tolerance === undefined && Math.abs(own - given) <= 1e-3 * Math.max(1, Math.abs(given))) {
    visual.answer = { ...visual.answer, value: own };
  }

  const final = parseSolutionVisual(visual);
  if (!final.ok) return { ok: false, reason: final.error };
  if (!stepTexts(final.visual, solution)) return { ok: false, reason: "the steps do not fit the solution's sentences" };
  const check = checkVisual(final.visual);
  if (!check.ok) return { ok: false, reason: `the scene gives ${Number.isFinite(check.value) ? check.value : "no answer"}, not ${given}` };
  return { ok: true, visual };
}
