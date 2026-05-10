import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { queryQuestionPreviewsByIds } from "@/lib/questions/query";

export const maxDuration = 30;

const MAX_IDS = 200;

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
    const ids = (body as { ids?: unknown }).ids;
    if (!Array.isArray(ids)) {
      return NextResponse.json(
        { error: "ids must be an array" },
        { status: 400 }
      );
    }
    const cleaned = Array.from(
      new Set(
        ids.filter((s): s is string => typeof s === "string" && s.length > 0)
      )
    );
    if (cleaned.length > MAX_IDS) {
      return NextResponse.json(
        { error: `Too many ids — max ${MAX_IDS}` },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();
    const items = await queryQuestionPreviewsByIds(supabase, cleaned);
    return NextResponse.json({ items });
  } catch (err) {
    console.error("cart preview route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
