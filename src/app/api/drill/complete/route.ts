/**
 * POST /api/drill/complete — record that a weak-area drill was finished.
 *
 * SEPARATE from the per-answer route because it records a different KIND of
 * fact. Those rows are per-question telemetry; this is the FEATURE event
 * /dashboard/pmf measures adoption and retention lift on. `drill_completed` has
 * carried the label "Weak-area drills" in the PMF snapshot since migration
 * 0103, and until now nothing in the codebase emitted it — one of the two kinds
 * the coverage test held on an explicit UNBUILT list.
 *
 * It records no score, deliberately: see recordDrillCompleted. The score is
 * derivable from the answer rows the server itself graded, and a client's tally
 * has no business sitting next to them in an append-only log.
 *
 * Terse responses — nothing reads the body.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { parseDrillComplete } from "@/lib/drill/parse";
import { recordDrillCompleted } from "@/lib/drill/service";

export async function POST(request: NextRequest) {
  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  if (!user) return new NextResponse(null, { status: 401 });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = parseDrillComplete(raw);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  // No rate limit of its own: this fires once per drill, and every answer that
  // preceded it has already passed the answer route's budget. A caller hitting
  // only this route writes a `size` and nothing else — bounded by the parser's
  // cap and worth less than the round trip it costs them.
  await recordDrillCompleted(parsed.questionIds);

  return new NextResponse(null, { status: 204 });
}
