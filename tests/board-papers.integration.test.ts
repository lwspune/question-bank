/**
 * Board papers (migrations 0146 + 0147): the rules the DATABASE enforces.
 *
 * The builder checks the same things, but the page and the download are
 * public, so a paper must not be able to hold a private question or an "OR"
 * that points forward, whatever writes it. And a board paper must count toward
 * the same daily paper limit as a whole past paper (0137), from either side.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";
import { claimBoardPaperDownload, claimMockPaperDownload, readTodaysMockPapers } from "@/lib/export/mockPaperLimit";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type Q = { id: string; exam_id: string; subject_id: string };
const RUN_ID = randomUUID().slice(0, 8);
const PASSWORD = "board-paper-test-pw-1234";

describe.skipIf(!HAS_ENV)("board papers (migration 0146)", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  let student: SupabaseClient;
  let userId = "";
  let qs: Q[] = [];
  let other: Q | null = null;
  let privateQ: string | null = null;
  // 0147: a question of ANOTHER subject in the SAME exam (the SSC History and
  // Political Science paper spans two bank subjects). Made here, removed after.
  let sameExamOtherSubject: Q | null = null;
  let madeSubjectId: string | null = null;
  const slug = `test-${RUN_ID}`;
  let paperId = "";
  let secondPaperId = "";
  let mockId = "";
  let savedLimit: number | null | undefined;

  const paper = (over: Record<string, unknown> = {}) => ({
    examId: qs[0].exam_id,
    subjectId: qs[0].subject_id,
    slug,
    groupSlug: slug,
    setNumber: 1,
    year: 2025,
    sitting: null,
    paperCode: "99/1/1",
    title: `Test board paper ${RUN_ID}`,
    totalMarks: 5,
    durationMinutes: 180,
    sections: [{ key: "A", title: "Section A", note: "" }],
    published: false,
    ...over,
  });
  const item = (position: number, q: Q, over: Record<string, unknown> = {}) => ({
    position,
    printedNumber: String(position),
    section: "A",
    marks: 2,
    alternativeTo: null,
    caseKey: null,
    questionId: q.id,
    ...over,
  });
  const replace = (p: unknown, items: unknown[]) => admin.rpc("board_paper_replace", { p_paper: p, p_items: items });

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });

    const { data: seed } = await admin.from("questions").select("id, exam_id, subject_id").eq("visibility", "PUBLIC").limit(200);
    const rows = (seed ?? []) as Q[];
    const first = rows[0];
    if (!first) throw new Error("no PUBLIC question in the test project");
    qs = rows.filter((r) => r.exam_id === first.exam_id && r.subject_id === first.subject_id).slice(0, 3);
    if (qs.length < 3) throw new Error("need 3 PUBLIC questions of one exam and subject in the test project");
    other = rows.find((r) => r.exam_id !== first.exam_id) ?? null;
    // A PRIVATE question of the SAME exam and subject, so only its visibility can
    // be the reason it is refused. The test project holds none, so make one: a
    // copy of a public row with a fresh fingerprint, deleted in afterAll.
    const { data: src } = await admin.from("questions").select("*").eq("id", qs[0].id).single();
    const copy = { ...(src as Record<string, unknown>) };
    delete copy.id;
    delete copy.created_at;
    delete copy.updated_at;
    delete copy.search_vector; // generated
    const { data: priv, error: privErr } = await admin
      .from("questions")
      .insert({ ...copy, visibility: "PRIVATE", content_hash: `board-paper-test-${RUN_ID}` })
      .select("id")
      .single();
    if (privErr) throw new Error(`private question fixture: ${privErr.message}`);
    privateQ = priv!.id as string;

    const { data: subs } = await admin.from("subjects").select("id").eq("exam_id", first.exam_id).neq("id", first.subject_id).limit(1);
    let otherSubject = (subs?.[0]?.id as string | undefined) ?? null;
    if (!otherSubject) {
      const { data: made, error: madeErr } = await admin
        .from("subjects")
        .insert({ exam_id: first.exam_id, name: `Board paper test subject ${RUN_ID}` })
        .select("id")
        .single();
      if (madeErr) throw new Error(`subject fixture: ${madeErr.message}`);
      madeSubjectId = made!.id as string;
      otherSubject = madeSubjectId;
    }
    const { data: moved, error: movedErr } = await admin
      .from("questions")
      .insert({ ...copy, subject_id: otherSubject, content_hash: `board-paper-test-subj-${RUN_ID}` })
      .select("id, exam_id, subject_id")
      .single();
    if (movedErr) throw new Error(`other-subject question fixture: ${movedErr.message}`);
    sameExamOtherSubject = moved as Q;

    const email = `boardpaper-${RUN_ID}@test.local`;
    const { data } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
    userId = data.user!.id;
    student = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn(email, student, { email, password: PASSWORD });

    const { data: m, error: mErr } = await admin
      .from("mock_tests")
      .insert({
        id: randomUUID(),
        slug: `test-board-limit-${RUN_ID}`,
        exam_id: first.exam_id,
        paper_code: "TBL",
        title: `Test paper ${RUN_ID}`,
        duration_secs: 60,
        marking: {},
        total_questions: 0,
        total_marks: 0,
        status: "draft",
        pyq_year: 2020,
      })
      .select("id")
      .single();
    if (mErr) throw new Error(`mock fixture: ${mErr.message}`);
    mockId = m!.id as string;

    const { data: prev } = await admin.from("paywall_settings").select("mock_papers_per_day").single();
    savedLimit = prev!.mock_papers_per_day as number | null;
  });

  afterAll(async () => {
    if (!admin) return;
    if (savedLimit !== undefined) {
      await admin.from("paywall_settings").update({ mock_papers_per_day: savedLimit }).eq("id", true);
    }
    if (userId) await admin.auth.admin.deleteUser(userId); // cascades download rows
    await admin.from("export_events").delete().in("board_paper_id", [paperId, secondPaperId].filter(Boolean));
    await admin.from("board_papers").delete().like("slug", `test-${RUN_ID}%`);
    if (mockId) await admin.from("mock_tests").delete().eq("id", mockId);
    if (privateQ) await admin.from("questions").delete().eq("id", privateQ);
    if (sameExamOtherSubject) await admin.from("questions").delete().eq("id", sameExamOtherSubject.id);
    if (madeSubjectId) await admin.from("subjects").delete().eq("id", madeSubjectId);
  });

  it("writes a paper and its items in one call", async () => {
    const { data, error } = await replace(paper(), [
      item(1, qs[0]),
      item(2, qs[1], { printedNumber: "2 (a)" }),
      item(3, qs[2], { printedNumber: "2 (b)", alternativeTo: 2 }),
    ]);
    expect(error).toBeNull();
    expect(data).toBe(3);
    const { data: p } = await admin.from("board_papers").select("id").eq("slug", slug).single();
    paperId = p!.id as string;
  });

  it("replaces the items on a re-run instead of adding to them", async () => {
    const { data, error } = await replace(paper(), [item(1, qs[0]), item(2, qs[1])]);
    expect(error).toBeNull();
    expect(data).toBe(2);
    const { count } = await admin.from("board_paper_items").select("position", { count: "exact", head: true }).eq("paper_id", paperId);
    expect(count).toBe(2);
  });

  it("hides an unpublished paper and its items from visitors", async () => {
    const { data: p } = await anon.from("board_papers").select("id").eq("slug", slug);
    const { data: items } = await anon.from("board_paper_items").select("position").eq("paper_id", paperId);
    expect(p).toEqual([]);
    expect(items).toEqual([]);
  });

  it("shows a published paper and its items to visitors", async () => {
    await replace(paper({ published: true }), [item(1, qs[0]), item(2, qs[1])]);
    const { data: p } = await anon.from("board_papers").select("id").eq("slug", slug);
    const { data: items } = await anon.from("board_paper_items").select("position").eq("paper_id", paperId);
    expect(p).toHaveLength(1);
    expect(items).toHaveLength(2);
  });

  it("refuses a question from another exam", async () => {
    expect(other, "the test project needs a PUBLIC question of a second exam").not.toBeNull();
    const { error } = await replace(paper(), [item(1, other!)]);
    expect(error?.message).toMatch(/not a PUBLIC question of this paper/);
  });

  it("accepts a question of another subject in the same exam (0147)", async () => {
    const { error } = await replace(paper(), [item(1, qs[0]), item(2, sameExamOtherSubject!)]);
    expect(error).toBeNull();
  });

  it("stores a question in parts: marks on the question, none on its parts (0147)", async () => {
    const { error } = await replace(paper(), [
      item(1, qs[0], { marks: 4 }),
      item(2, qs[1], { marks: null, partOf: 1, printedNumber: "1 (ii)" }),
    ]);
    expect(error).toBeNull();
    const { data } = await admin.from("board_paper_items").select("position, marks, part_of").eq("paper_id", paperId).order("position");
    expect(data).toEqual([
      { position: 1, marks: 4, part_of: null },
      { position: 2, marks: null, part_of: 1 },
    ]);
  });

  it("refuses a part with marks, a question without, and a part pointing forward (0147)", async () => {
    expect((await replace(paper(), [item(1, qs[0]), item(2, qs[1], { partOf: 1 })])).error).not.toBeNull();
    expect((await replace(paper(), [item(1, qs[0], { marks: null })])).error).not.toBeNull();
    expect(
      (await replace(paper(), [item(1, qs[0], { marks: null, partOf: 2 }), item(2, qs[1])])).error
    ).not.toBeNull();
  });

  it("refuses a private question", async () => {
    expect(privateQ, "the test project needs a PRIVATE question").not.toBeNull();
    const { error } = await replace(paper(), [item(1, { ...qs[0], id: privateQ! })]);
    expect(error).not.toBeNull();
  });

  it("refuses an OR that points at itself or a later position", async () => {
    const { error } = await replace(paper(), [item(1, qs[0], { alternativeTo: 1 }), item(2, qs[1])]);
    expect(error).not.toBeNull();
  });

  it("refuses deleting a question a paper uses", async () => {
    const { error } = await admin.from("questions").delete().eq("id", qs[0].id);
    expect(error).not.toBeNull();
  });

  it("does not let visitors call the writer", async () => {
    const { error } = await anon.rpc("board_paper_replace", { p_paper: paper(), p_items: [] });
    expect(error).not.toBeNull();
  });

  it("counts board papers and whole past papers toward one daily limit", async () => {
    await replace(paper({ slug: `${slug}-2`, groupSlug: slug, setNumber: 2, published: true }), [item(1, qs[0])]);
    const { data: p2 } = await admin.from("board_papers").select("id").eq("slug", `${slug}-2`).single();
    secondPaperId = p2!.id as string;
    await admin.from("paywall_settings").update({ mock_papers_per_day: 2 }).eq("id", true);

    expect(await claimBoardPaperDownload(admin, userId, paperId)).toEqual({ kind: "ok" });
    expect(await claimMockPaperDownload(admin, userId, mockId)).toEqual({ kind: "ok" });
    // A third paper of either kind is refused...
    expect(await claimBoardPaperDownload(admin, userId, secondPaperId)).toEqual({ kind: "limit", limit: 2 });
    // ...but a paper already taken today is free again.
    expect(await claimBoardPaperDownload(admin, userId, paperId)).toEqual({ kind: "ok" });

    const today = await readTodaysMockPapers(admin, userId);
    expect(today.todaysMockIds).toEqual([mockId]);
    expect(today.todaysBoardPaperIds).toEqual([paperId]);
  });

  it("does not let a student write the board download table", async () => {
    const { error } = await student.from("board_paper_downloads").insert({ user_id: userId, board_paper_id: secondPaperId });
    expect(error).not.toBeNull();
  });
});
