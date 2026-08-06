/**
 * Seed the DEDICATED TEST project with everything the test suite borrows from
 * a "real" database:
 *
 *   1. Canonical taxonomy from taxonomy.json (MHT-CET only — it derives from
 *      the MHT-CET reference Excel; other exams were auto-created by uploads
 *      in prod), PLUS a minimal hand-seeded NDA branch (exam → Mathematics →
 *      Statistics → the Central-Tendency subtopic) that edit-apply-tags and
 *      filter-facets resolve by name.
 *   2. An "LWS Pune" org — sync-mock-flow's DESTINATION_ORG_NAME and the
 *      "(against LWS Pune seed)" reader tests look it up by name — WITH an
 *      ADMIN org_member (applyMockSync attributes synced rows to the org's
 *      first ADMIN; no admin → every sync 400s).
 *   3. A seed OWNER auth user for created_by columns. Deliberately NOT under
 *      @test.local/@test.invalid: the global-teardown sweeps those domains,
 *      and questions.created_by is a NO-ACTION FK, so sweeping the owner
 *      would fail (and the seed must survive teardown anyway).
 *   4. ≥150 PUBLIC MCQ questions (+4 options each) across MHT-CET
 *      Maths/Physics/Chemistry + a small NDA Maths deck — browse-query
 *      asserts totalCount ≥ 150 for the org and per-subject hits;
 *      filter-facets asserts NDA Maths chapter counts > 0; borrow-a-PUBLIC-
 *      question tests (mocks-rls, bookmarks, audience-exclusions) need stable
 *      rows.
 *   5. Three COMPLETED upload_jobs rows (uploads-list pages by 2 and asserts
 *      a page 2; dashboard-stats asserts daysSinceLastUpload is non-null).
 *
 * Idempotent: upserts/on-conflict/check-first throughout — safe to re-run.
 * Guarded: refuses to run against any project not on the test allow-list.
 *
 * Usage: npx tsx scripts/testdb/seed.ts
 */
import { config } from "dotenv";
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { seedTaxonomy, type Taxonomy } from "../../src/lib/seed";
import { ALLOWED_TEST_REFS, extractProjectRef } from "../../tests/helpers/testdb";

config({ path: path.join(process.cwd(), ".env.test.local") });

const SEED_OWNER_EMAIL = "seed-owner@testdb.internal";
const SEED_ORG_NAME = "LWS Pune";
const DIFFICULTIES = ["EASY", "MODERATE", "HARD"] as const;

const DECKS: Array<{ exam: string; subject: string; chapter: string; subtopic?: string; count: number }> = [
  { exam: "MHT-CET", subject: "Maths", chapter: "Vectors", count: 50 },
  { exam: "MHT-CET", subject: "Maths", chapter: "Differentiation", count: 40 },
  { exam: "MHT-CET", subject: "Physics", chapter: "Optics (Ray)", count: 40 },
  { exam: "MHT-CET", subject: "Chemistry", chapter: "Ionic Equilibria", count: 24 },
  {
    exam: "NDA",
    subject: "Mathematics",
    chapter: "Statistics",
    subtopic: "Measures of Central Tendency — Mean, Median, Mode",
    count: 8,
  },
  { exam: "NDA", subject: "Mathematics", chapter: "Probability", count: 4 },
  {
    exam: "NDA",
    subject: "Mathematics",
    chapter: "Matrices & Determinants",
    subtopic: "Determinant Properties, Operations, and Sums",
    count: 6,
  },
  {
    exam: "NDA",
    subject: "Mathematics",
    chapter: "Matrices & Determinants",
    subtopic: "Matrix Inverse",
    count: 5,
  },
];

/** Taxonomy nodes NOT in taxonomy.json that must exist (created if missing). */
const EXTRA_TAXONOMY: Array<{ exam: string; subject: string; chapters: Array<{ name: string; subtopics: string[] }> }> = [
  {
    exam: "NDA",
    subject: "Mathematics",
    chapters: [
      { name: "Statistics", subtopics: ["Measures of Central Tendency — Mean, Median, Mode"] },
      { name: "Probability", subtopics: [] },
      // filter-facets spot-checks this chapter AND this subtopic by NAME.
      {
        name: "Matrices & Determinants",
        subtopics: ["Determinant Properties, Operations, and Sums", "Matrix Inverse"],
      },
    ],
  },
];

async function ensure(
  admin: SupabaseClient,
  table: string,
  match: Record<string, unknown>,
  insert: Record<string, unknown>
): Promise<string> {
  let q = admin.from(table).select("id");
  for (const [k, v] of Object.entries(match)) q = q.eq(k, v as never);
  const { data: existing, error: selErr } = await q.maybeSingle();
  if (selErr) throw selErr;
  if (existing) return existing.id as string;
  const { data, error } = await admin.from(table).insert(insert).select("id").single();
  if (error) throw error;
  return data.id as string;
}

async function main(): Promise<void> {
  const url = process.env.TEST_SUPABASE_URL;
  const service = process.env.TEST_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !service) throw new Error("TEST_SUPABASE_URL / TEST_SUPABASE_SERVICE_ROLE_KEY not set");
  const ref = extractProjectRef(url);
  if (!ref || !ALLOWED_TEST_REFS.has(ref)) {
    throw new Error(`Refusing: ${url} is not an allow-listed test project`);
  }

  const admin = createClient(url, service, { auth: { persistSession: false } });

  // ── 1a) canonical taxonomy (MHT-CET) ──────────────────────────────────────
  const taxonomyPath = path.join(process.cwd(), "supabase", "seed", "taxonomy.json");
  const taxonomy = JSON.parse(fs.readFileSync(taxonomyPath, "utf8")) as Taxonomy;
  const stats = await seedTaxonomy(admin, taxonomy);
  console.log(
    `taxonomy: +${stats.exams} exams +${stats.subjects} subjects +${stats.chapters} chapters +${stats.subtopics} subtopics`
  );

  // ── 1b) extra taxonomy (NDA branch) ───────────────────────────────────────
  for (const ex of EXTRA_TAXONOMY) {
    const examId = await ensure(admin, "exams", { name: ex.exam }, { name: ex.exam });
    const subjectId = await ensure(
      admin,
      "subjects",
      { exam_id: examId, name: ex.subject },
      { exam_id: examId, name: ex.subject }
    );
    for (const ch of ex.chapters) {
      const chapterId = await ensure(
        admin,
        "chapters",
        { subject_id: subjectId, name: ch.name },
        { subject_id: subjectId, name: ch.name }
      );
      for (const st of ch.subtopics) {
        await ensure(admin, "subtopics", { chapter_id: chapterId, name: st }, { chapter_id: chapterId, name: st });
      }
    }
  }
  console.log("extra taxonomy (NDA branch): ok");

  // ── 2) org ────────────────────────────────────────────────────────────────
  const orgId = await ensure(admin, "organizations", { name: SEED_ORG_NAME }, { name: SEED_ORG_NAME });
  console.log(`org "${SEED_ORG_NAME}": ${orgId}`);

  // ── 3) seed owner user + ADMIN membership ─────────────────────────────────
  let ownerId: string | undefined;
  for (let page = 1; !ownerId; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    ownerId = data.users.find((u) => u.email === SEED_OWNER_EMAIL)?.id;
    if (data.users.length < 1000) break;
  }
  if (!ownerId) {
    const { data, error } = await admin.auth.admin.createUser({
      email: SEED_OWNER_EMAIL,
      password: `seed-${Math.random().toString(36).slice(2)}-${Date.now()}`,
      email_confirm: true,
    });
    if (error) throw error;
    ownerId = data.user!.id;
  }
  const { error: memErr } = await admin
    .from("org_members")
    .upsert({ org_id: orgId, user_id: ownerId, role: "ADMIN" }, { onConflict: "org_id,user_id", ignoreDuplicates: true });
  if (memErr) throw memErr;
  console.log(`seed owner (org ADMIN): ${ownerId}`);

  // ── 4) seed questions (bulk per deck) ─────────────────────────────────────
  let inserted = 0;
  for (const deck of DECKS) {
    const { data: exam } = await admin.from("exams").select("id").eq("name", deck.exam).single();
    const { data: subject } = await admin
      .from("subjects")
      .select("id")
      .eq("exam_id", exam!.id)
      .eq("name", deck.subject)
      .single();
    const { data: chapter } = await admin
      .from("chapters")
      .select("id")
      .eq("subject_id", subject!.id)
      .eq("name", deck.chapter)
      .maybeSingle();
    if (!chapter) throw new Error(`taxonomy missing chapter ${deck.exam}/${deck.subject}/${deck.chapter}`);
    let subtopicId: string | null = null;
    if (deck.subtopic) {
      const { data: st } = await admin
        .from("subtopics")
        .select("id")
        .eq("chapter_id", chapter.id)
        .eq("name", deck.subtopic)
        .single();
      subtopicId = st!.id;
    }

    const rows = Array.from({ length: deck.count }, (_, idx) => {
      const i = idx + 1;
      return {
        org_id: orgId,
        exam_id: exam!.id,
        subject_id: subject!.id,
        chapter_id: chapter.id,
        subtopic_id: subtopicId,
        // Physics stems carry the word "lens" — browse-query's full-text test
        // searches for it (mirrors prod's Optics content).
        text:
          deck.subject === "Physics"
            ? `Seed question ${i} for ${deck.exam} ${deck.subject} ${deck.chapter}: a convex lens question, what is ${i} + ${i}?`
            : `Seed question ${i} for ${deck.exam} ${deck.subject} ${deck.chapter}: what is ${i} + ${i}?`,
        solution: `Adding ${i} + ${i} gives ${2 * i}.`,
        difficulty: DIFFICULTIES[idx % DIFFICULTIES.length],
        visibility: "PUBLIC",
        question_kind: "pyq",
        pyq_year: 2018 + (idx % 5),
        // Subtopic segment only when present — keeps pre-existing seed hashes
        // stable so a re-run stays a no-op for them.
        content_hash: `testdb-seed-${deck.exam}-${deck.subject}-${deck.chapter}${
          deck.subtopic ? `-${deck.subtopic}` : ""
        }-${i}`
          .toLowerCase()
          .replace(/\s+/g, "-"),
        created_by: ownerId,
        source_file: "testdb-seed",
      };
    });
    const { data: insertedRows, error } = await admin
      .from("questions")
      .upsert(rows, { onConflict: "org_id,exam_id,content_hash", ignoreDuplicates: true })
      .select("id, content_hash");
    if (error) throw error;
    if (insertedRows && insertedRows.length > 0) {
      inserted += insertedRows.length;
      const optionRows = insertedRows.flatMap((q) => {
        const i = parseInt(q.content_hash.split("-").pop()!, 10);
        const correct = (i - 1) % 4;
        return ["A", "B", "C", "D"].map((label, idx) => ({
          question_id: q.id,
          label,
          text: idx === correct ? String(2 * i) : String(2 * i + idx + 1),
          is_correct: idx === correct,
        }));
      });
      const { error: optErr } = await admin.from("options").insert(optionRows);
      if (optErr) throw optErr;
    }
  }
  console.log(`seed questions inserted: ${inserted} (0 on re-run is expected)`);

  // ── 5) upload_jobs (uploads-list pages by 2; dashboard-stats needs one) ───
  for (let i = 1; i <= 3; i++) {
    const filename = `testdb-seed-${i}.xlsx`;
    const { data: existing } = await admin
      .from("upload_jobs")
      .select("id")
      .eq("org_id", orgId)
      .eq("filename", filename)
      .maybeSingle();
    if (existing) continue;
    const { error } = await admin.from("upload_jobs").insert({
      org_id: orgId,
      filename,
      created_by: ownerId,
      status: "COMPLETED",
      inserted: 10 * i,
      skipped: i,
    });
    if (error) throw error;
  }
  console.log("upload_jobs: ok");
  console.log("done");
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
