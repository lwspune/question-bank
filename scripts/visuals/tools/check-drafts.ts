/**
 * Check agent drafts against the scene itself, with no database: each draft's
 * params must parse, and the scene's own check must give the draft's
 * answer.value. Read-only; for agents to run on their own output before
 * handing it back (the assembler and visuals:run repeat every check later).
 *
 *   npx tsx scripts/visuals/tools/check-drafts.ts --scene=letterStrip <draft.json> [...]
 *
 * Prints one line per problem and a count; exits 1 when any draft fails.
 */
import { readFileSync } from "node:fs";
import { getScene } from "../../../src/lib/visuals/registry";
import { parseSolutionVisual } from "../../../src/lib/visuals/visual";

const sceneId = process.argv.find((a) => a.startsWith("--scene="))?.slice(8);
const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const scene = sceneId ? getScene(sceneId) : undefined;
if (!scene || !files.length) {
  console.error("usage: check-drafts.ts --scene=<id> <draft.json> ...");
  process.exit(2);
}

// Phrases agents used for the program's checking that reached students' notes (CBSE 12 Physics, 2026-11-09).
const CHECK_TALK = /\b(stands for|checked at|shown (here |at |for )+|for [a-zA-Z] ?= ?-?\d[^,;]*this gives|sample values?|for the check(ing)?|not shown|program checks?)/i;

/** Every note, label and text string in a draft's params (not the maths). */
function textsOf(x: unknown): string[] {
  if (Array.isArray(x)) return x.flatMap(textsOf);
  if (!x || typeof x !== "object") return [];
  return Object.entries(x as Record<string, unknown>).flatMap(([k, v]) =>
    typeof v === "string" ? (["note", "label", "text"].includes(k) ? [v] : []) : textsOf(v),
  );
}

let ok = 0;
let bad = 0;
for (const f of files) {
  const drafts = JSON.parse(readFileSync(f, "utf8")) as { n?: number; id?: string; skip?: boolean; params?: unknown; answer?: { value?: number; label?: string; tolerance?: number } }[];
  for (const d of drafts) {
    if (d.skip) continue;
    const tag = `#${d.n ?? "?"} ${String(d.id ?? "").slice(0, 8)}`;
    // The assembler's own limit: a longer label drops the draft there.
    if (typeof d.answer?.label !== "string" || !d.answer.label.trim() || d.answer.label.length > 32) {
      console.log(`${tag}: answer.label must be 1 to 32 characters`);
      bad++;
      continue;
    }
    // Students read every note and label; words about the checking ("x stands for v", "checked at u = -12") are not for them.
    const aboutTheCheck = textsOf(d.params).find((t) => CHECK_TALK.test(t));
    if (aboutTheCheck) {
      console.log(`${tag}: a note or label talks about the checking, not the working: "${aboutTheCheck}"`);
      bad++;
      continue;
    }
    // A stacked fraction in a matrix cell: \dfrac rows are cut off by the frame, \tfrac rows crowd into each other
    // (CBSE 12 Matrices, 21 drafts). Write the cell as 5/2.
    const tallCell = ((d.params as { lines?: { tex?: string }[] })?.lines ?? []).find((l) =>
      (l.tex?.match(/\\begin\{([pbv]?matrix)\}[\s\S]*?\\end\{\1\}/g) ?? []).some((m) => /\\[td]?frac/.test(m)),
    );
    if (tallCell) {
      console.log(`${tag}: write a fraction inside a matrix as 5/2, not \\frac (stacked cells are cut off or crowd): ${tallCell.tex}`);
      bad++;
      continue;
    }
    // A line or item whose step no beat plays never appears (2026-11-09: 10 of 11,991 stored visuals had one).
    const parts = ((d.params as { lines?: { step?: string }[]; items?: { step?: string }[] })?.lines ??
      (d.params as { items?: { step?: string }[] })?.items ??
      []) as { step?: string }[];
    const played = new Set(((d as { steps?: { beats?: string[] }[] }).steps ?? []).flatMap((s) => s.beats ?? []));
    const hidden = [...new Set(parts.map((l) => l.step).filter((s): s is string => !!s && !played.has(s)))];
    if (hidden.length) {
      console.log(`${tag}: no step plays ${hidden.join(", ")}, so those lines never appear; use the step ids the steps name`);
      bad++;
      continue;
    }
    const p = scene.parse(d.params);
    if (p && typeof p === "object" && "error" in p) {
      console.log(`${tag}: ${(p as { error: string }).error}`);
      bad++;
      continue;
    }
    // The steps rules the assembler applies (first step at sentence 0, beats once each, ...); the fingerprint is the assembler's job.
    const whole = parseSolutionVisual({ v: 1, scene: sceneId, params: d.params, steps: (d as { steps?: unknown }).steps, fingerprint: "00000000", answer: d.answer });
    if (!whole.ok) {
      console.log(`${tag}: ${whole.error}`);
      bad++;
      continue;
    }
    const v = scene.check(p);
    // The same rule as checkVisual: within answer.tolerance (at most 5% of the answer), else exact.
    const want = d.answer?.value;
    const tol = d.answer?.tolerance;
    if (tol !== undefined && typeof want === "number" && tol > 0.05 * Math.max(1, Math.abs(want))) {
      console.log(`${tag}: answer.tolerance is wider than 5% of the answer`);
      bad++;
      continue;
    }
    const near = typeof want === "number" && tol !== undefined ? Math.abs(v - want) <= tol : v === want;
    if (!near) {
      console.log(`${tag}: the scene gives ${v}, the draft says ${d.answer?.value} (${scene.checkText(p, v)})`);
      bad++;
      continue;
    }
    ok++;
  }
}
console.log(`${ok} ok, ${bad} with problems`);
process.exit(bad ? 1 : 0);
