/**
 * GET /api/homework/group?plan=<slug>&n=<group> (2026-11-15): one repeat or
 * type group's questions, for the panel the repeat line's "See all" opens on
 * the same page (components/question/RepeatGroupPanel), so a student can try
 * every paper's version without leaving the card they were on.
 *
 * The same load as the group page (lib/homework/groupPage) with the anon
 * client: public questions of a published plan, nothing personal, so the CDN
 * keeps it for a day like the page. Answers inside the panel go through the
 * same free-answer counter as the page (useBoardReveal), not through here.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { loadGroupPage } from "@/lib/homework/groupPage";
import { groupHeading } from "@/lib/homework/chapters";
import { parseDayParam } from "@/lib/homework/links";

const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,99}$/;
const CACHE = "public, s-maxage=86400, stale-while-revalidate=3600";

export async function GET(request: NextRequest) {
  const plan = request.nextUrl.searchParams.get("plan") ?? "";
  const n = parseDayParam(request.nextUrl.searchParams.get("n") ?? "");
  if (!SLUG_RE.test(plan) || n === null) {
    return NextResponse.json({ error: "Give a plan and a group number." }, { status: 400 });
  }

  let page;
  try {
    page = await loadGroupPage(createSupabaseAnonClient(), plan, n);
  } catch (e) {
    console.error("homework group read failed", plan, n, e);
    return NextResponse.json({ error: "Could not load these questions." }, { status: 500 });
  }
  if (!page) {
    return NextResponse.json({ error: "No such group." }, { status: 404, headers: { "Cache-Control": CACHE } });
  }

  return NextResponse.json(
    {
      label: page.group.label,
      tier: page.group.tier,
      title: page.plan.title,
      examName: page.plan.examName,
      heading: groupHeading(page.group, page.slots.length),
      href: `/homework/${encodeURIComponent(page.plan.slug)}/group/${n}`,
      slots: page.slots,
    },
    { headers: { "Cache-Control": CACHE } }
  );
}
