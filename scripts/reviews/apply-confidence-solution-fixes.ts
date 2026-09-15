/**
 * RULE 5 rewrites for the two Confidence Mock 3 solutions the paper-text gate
 * flagged as hand-waves.
 *
 *   npx tsx scripts/reviews/apply-confidence-solution-fixes.ts            # dry run
 *   npx tsx scripts/reviews/apply-confidence-solution-fixes.ts --apply
 *
 * P6 is REPORTING, not blocking, because "clearly" has legitimate uses no regex
 * separates from a hand-wave. Both of these are genuine: each skips the one step
 * a student would actually be stuck on. That matters more here than in a
 * Blueprint Mock — a confidence paper is meant to be read afterwards, and a
 * solution that says "obviously" to someone who did not find it obvious
 * undoes precisely the confidence the paper was built to give.
 *
 * HASH-NEUTRAL BY CONSTRUCTION: `contentHash` is stem + sorted options + answer
 * and excludes `solution` (src/lib/upload/hash.ts), so this is a plain UPDATE —
 * no id change, and none of the three papers' references can be orphaned. The
 * script asserts the stored hash is unmoved rather than assuming it.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN = "confidence-mocks:2026-09-04-rule5";

type Fix = { id: string; tag: string; expect: string; solution: string; note: string };

const FIXES: Fix[] = [
  {
    id: "0376da5b-5b2a-4abe-966d-f8a4fc150575",
    tag: "Height & Distance — spherical ball subtending an angle",
    expect: "Clearly,",
    solution:
      "Let \\(O\\) be the centre of the spherical ball, and let \\(PA\\), \\(PB\\) be the two tangents from \\(P\\) to the ball, so that \\(\\angle APB = \\theta_{1}\\), \\(\\angle OPQ = \\theta_{2}\\) and \\(OA = OB = r\\).\n" +
      "\n" +
      "\\(PA\\) and \\(PB\\) are tangents from the SAME external point \\(P\\), so \\(PA = PB\\); with \\(OA = OB = r\\) and \\(OP\\) common, triangles \\(OAP\\) and \\(OBP\\) are congruent (SSS). Hence \\(PO\\) BISECTS \\(\\angle APB\\), giving\n" +
      "\\(\\angle APO = \\angle OPB = \\dfrac{\\theta_{1}}{2}\\).\n" +
      "\n" +
      "A tangent is perpendicular to the radius at its point of contact, so \\(\\angle OAP = 90^\\circ\\) and in right triangle \\(OAP\\),\n" +
      "\\(\\sin\\!\\left(\\dfrac{\\theta_{1}}{2}\\right) = \\dfrac{OA}{OP} = \\dfrac{r}{OP}\\), hence \\(OP = r\\,\\operatorname{cosec}\\dfrac{\\theta_{1}}{2}\\).\n" +
      "\n" +
      "Finally \\(OQ = OP\\sin\\theta_{2} = r\\sin\\theta_{2}\\,\\operatorname{cosec}\\dfrac{\\theta_{1}}{2}\\).",
    note:
      "RULE 5 rewrite (P6-hand-wave). The original asserted 'Clearly, angle APO = angle OPB = theta1/2' — which is the ONE step a student is stuck on, and is not obvious: it needs the equal-tangents property and an SSS congruence to show PO bisects the angle. The perpendicular-tangent step that justifies the cosec was also unstated. Answer unchanged; only the derivation was filled in. Hash-neutral (solution is not part of contentHash).",
  },
  {
    id: "c9eff8db-b7e5-4618-825a-297c62cfc6fc",
    tag: "Functions — range of x^2 - 6x + 7",
    expect: "Obviously,",
    solution:
      "Complete the square: \\(x^{2} - 6x + 7 = (x - 3)^{2} - 2\\).\n" +
      "\n" +
      "For every real \\(x\\), \\((x - 3)^{2} \\ge 0\\), so \\((x - 3)^{2} - 2 \\ge -2\\). The value \\(-2\\) is ATTAINED, at \\(x = 3\\), so it is a genuine minimum rather than a bound.\n" +
      "\n" +
      "As \\(x \\to \\pm\\infty\\), \\((x-3)^{2} \\to \\infty\\), and being continuous the function takes every value between \\(-2\\) and \\(\\infty\\).\n" +
      "\n" +
      "Hence the range is \\([-2, \\infty)\\) — closed at \\(-2\\) because that value is reached, open at \\(\\infty\\) because no real \\(x\\) attains it.",
    note:
      "RULE 5 rewrite (P6-hand-wave) plus a NOTATION FIX. The original wrote 'Obviously, minimum value is -2 and maximum infinity' and then printed the range as '[-2, infinity]' with a CLOSED bracket on infinity, which is wrong — infinity is not attained and cannot be included. The rewrite derives the minimum from (x-3)^2 >= 0, states that -2 is attained at x = 3, and brackets the interval correctly. Answer unchanged; hash-neutral (solution is not part of contentHash).",
  },
];

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  const db = createClient(url, key, { auth: { persistSession: false } });

  const reviews: ReviewInput[] = [];
  let applied = 0;
  let skipped = 0;

  for (const fix of FIXES) {
    console.log(`\n${fix.tag}`);
    const { data: q, error } = await db
      .from("questions").select("id, solution, content_hash").eq("id", fix.id).single();
    if (error) throw new Error(`${fix.tag}: ${error.message}`);

    if (q.solution === fix.solution) {
      console.log("  SKIP — already applied.");
      skipped += 1;
      reviews.push({
        questionId: fix.id, reviewedContentHash: q.content_hash as string,
        method: "solution_audit", verdict: "solution_rewritten", runLabel: RUN,
        source: "live", note: fix.note,
      });
      continue;
    }
    if (!q.solution || !q.solution.includes(fix.expect)) {
      throw new Error(
        `${fix.tag}: REFUSED — stored solution does not contain ${JSON.stringify(fix.expect)}; ` +
          `it may already have been rewritten by another pass`,
      );
    }

    if (!APPLY) { console.log(`  DRY RUN — would rewrite (removes "${fix.expect}").`); continue; }

    const before = q.content_hash as string;
    const { error: uErr } = await db.from("questions").update({ solution: fix.solution }).eq("id", fix.id);
    if (uErr) throw new Error(`${fix.tag}: ${uErr.message}`);

    const { data: after, error: aErr } = await db
      .from("questions").select("solution, content_hash").eq("id", fix.id).single();
    if (aErr) throw new Error(aErr.message);
    if (after.solution !== fix.solution) throw new Error(`${fix.tag}: write did not stick`);
    if (after.content_hash !== before) throw new Error(`${fix.tag}: content_hash MOVED — must not happen`);

    console.log("  APPLIED — solution rewritten, content_hash unchanged.");
    applied += 1;
    reviews.push({
      questionId: fix.id, reviewedContentHash: before,
      method: "solution_audit", verdict: "solution_rewritten", runLabel: RUN,
      source: "live", note: fix.note,
    });
  }

  if (!APPLY) { console.log(`\nDRY RUN — re-run with --apply`); return; }
  if (reviews.length) console.log("\n" + formatRecordResult(await recordReviews(db, reviews), RUN));
  console.log(`applied ${applied}, skipped ${skipped}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
