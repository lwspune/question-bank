/**
 * GET /api/learn/item?chapter=<lesson chapter>&concept=<lesson>[&session=id:1,id:0]
 * — the next check question of one Learn lesson, for V's "Your turn" card
 * (2026-11-22, owner: "use Learn questions for your turn: they are conceptual and
 * relatively easy; Learn was designed for this").
 *
 * The question comes from Learn's own function (learn_concept, never a key), with its
 * maths rendered here, and is picked by Learn's own rule (engine/nextItem): a signed-in
 * student's answers from the database (learn_my_attempts, their own login), a guest's
 * from the answers the card sends back. The card answers through POST
 * /api/learn/answer, which records a signed-in student's answer (mastery moves) and
 * only checks a guest's. No daily limit: Learn answers are not past-paper reveals.
 *
 * Reply: { ok: true, data: { item, title, seed, needed, signedIn } } | { ok: false, error }.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { nextItem, type AttemptLite } from "@/lib/learn/engine/nextItem";
import { MASTERY_NEEDED } from "@/lib/learn/links";
import { getLesson } from "@/lib/learn/query";
import { parseSessionAttempts } from "@/lib/learn/vItem";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, private" } as const;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status, headers: NO_STORE });

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const chapter = params.get("chapter") ?? "";
  const concept = params.get("concept") ?? "";
  if (!SLUG.test(chapter) || !SLUG.test(concept)) return fail(400, "Invalid lesson.");

  try {
    const lesson = await getLesson(chapter, concept);
    if (!lesson || lesson.items.length === 0) return fail(404, "This lesson has no questions yet.");

    const user = await getSessionUser();
    let attempts: AttemptLite[] = parseSessionAttempts(params.get("session"));
    if (user) {
      const { data, error } = await createSupabaseServerClient().rpc("learn_my_attempts", { p_chapter: chapter, p_concept: concept });
      if (error) throw new Error(`learn_my_attempts: ${error.message}`);
      // A signed-in student's answers here were recorded too, so the database's list is the whole of them.
      attempts = ((data ?? []) as { item_id: string; correct: boolean }[]).map((a) => ({ itemId: a.item_id, correct: a.correct }));
    }
    const ids = lesson.items.map((i) => i.id);
    const pick = nextItem(ids, attempts.filter((a) => ids.includes(a.itemId)));
    const item = lesson.items.find((i) => i.id === pick.itemId)!;
    return NextResponse.json(
      {
        ok: true,
        // The same option order the lesson page shows this student (engine/optionOrder's seed).
        data: { item, title: lesson.concept.title, seed: `${user?.id ?? "guest"}:${item.id}`, needed: MASTERY_NEEDED, signedIn: user !== null },
      },
      { headers: NO_STORE }
    );
  } catch (err) {
    console.error("learn item: read failed", chapter, concept, err);
    return fail(500, "Couldn't load a question. Please try again.");
  }
}
