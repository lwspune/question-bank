/**
 * Migration 0263 `articles`, against the TEST Supabase project.
 *
 * Proves what the pure spec cannot: anon reads PUBLISHED rows only, cannot read
 * a waiting edit (`pending`) or the `watch` note even on a published row,
 * cannot write at all, and the database itself refuses an em dash, a published
 * row without a date, and a second evergreen page for one exam.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { testRunId } from "./helpers/runId";
import { ARTICLE_PUBLIC_COLUMNS } from "@/lib/blog/catalog";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = testRunId().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const PREFIX = `test-${STAMP}`;

const BODY =
  "The Consortium of NLUs has announced the date.\n\n## What the paper looks like\n\n120 questions in 2 hours, with real papers.";

function article(slug: string, over: Record<string, unknown> = {}) {
  return {
    slug: `${PREFIX}-${slug}`,
    kind: "news",
    exam_slug: "clat",
    title: "CLAT 2027 exam date announced for December",
    description:
      "The Consortium has set CLAT 2027 for 6 December 2026. The date, the pattern, and how to use the weeks left with real past papers.",
    body: BODY,
    tags: ["CLAT"],
    reading_minutes: 1,
    ...over,
  };
}

describe.skipIf(!HAS_ENV)("articles (0263)", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    const { error } = await admin.from("articles").insert([
      article("live", { status: "published", date_published: "2026-11-16", pending: { title: "Secret waiting edit title" }, watch: "x" }),
      article("draft"),
    ], { defaultToNull: false });
    if (error) throw new Error(error.message);
  });

  afterAll(async () => {
    await admin?.from("articles").delete().like("slug", `${PREFIX}-%`);
  });

  it("anon sees published rows only", async () => {
    const { data, error } = await anon.from("articles").select(ARTICLE_PUBLIC_COLUMNS).like("slug", `${PREFIX}-%`);
    expect(error).toBeNull();
    expect((data ?? []).map((r) => r.slug)).toEqual([`${PREFIX}-live`]);
  });

  it("anon cannot read a waiting edit or the watch note", async () => {
    const pending = await anon.from("articles").select("pending").eq("slug", `${PREFIX}-live`);
    expect(pending.error).not.toBeNull();
    const watch = await anon.from("articles").select("watch").eq("slug", `${PREFIX}-live`);
    expect(watch.error).not.toBeNull();
  });

  it("anon cannot write", async () => {
    const ins = await anon.from("articles").insert(article("anon"));
    expect(ins.error).not.toBeNull();
    await anon.from("articles").update({ title: "Changed by an anonymous visitor" }).eq("slug", `${PREFIX}-live`);
    const { data } = await admin.from("articles").select("title").eq("slug", `${PREFIX}-live`).single();
    expect(data?.title).toBe("CLAT 2027 exam date announced for December");
  });

  it("refuses an em dash, a dateless published row, and a second evergreen page per exam", async () => {
    const dash = await admin.from("articles").insert(article("dash", { body: `${BODY} — aside` }));
    expect(dash.error?.message).toMatch(/articles_no_dashes/);

    const dateless = await admin.from("articles").insert(article("dateless", { status: "published" }));
    expect(dateless.error?.message).toMatch(/articles_published_has_date/);

    // Pick an exam slug no real evergreen page can hold, so the test never collides with data.
    const exam = `zz-${STAMP}`.slice(0, 40);
    const first = await admin.from("articles").insert(article("ever-1", { kind: "evergreen", exam_slug: exam }));
    expect(first.error).toBeNull();
    const second = await admin.from("articles").insert(article("ever-2", { kind: "evergreen", exam_slug: exam }));
    expect(second.error?.message).toMatch(/articles_one_evergreen_per_exam/);
  });
});
