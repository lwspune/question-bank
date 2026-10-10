/**
 * Build /question-papers from the board pipelines' transcriptions (2026-10-09).
 *
 *   npm run papers:build                         # DRY RUN: what would be written, what is refused
 *   npm run papers:build -- --apply              # write the papers, unpublished
 *   npm run papers:build -- --apply --publish    # write and publish
 *   npm run papers:build -- --exam=mh-ssc-10     # one board (cbse-12 · mh-hsc-12 · mh-ssc-10)
 *   npm run papers:build -- --only=2025-55-1     # one group (or one paper slug)
 *
 * Sources, one per pipeline:
 *   - CBSE Class 12: every transcription in scripts/cbse-12-pyq/data; marks are
 *     on each question (src/lib/questionPapers/manifest.ts).
 *   - MH HSC Class 12: the board-paper lane (scripts/mh-hsc-12-pyq/paper) and
 *     Geography (scripts/mh-hsc-12-geo-pyq); MH SSC Class 10 (scripts/mh-ssc-10).
 *     No marks are transcribed, so each paper takes its family's printed marks
 *     pattern (./mhPatterns.ts, applied by src/lib/questionPapers/mhPattern.ts).
 *     Each question's fingerprint comes from the lane's OWN buildPaperRecords,
 *     the function its commit used, so it cannot drift from the bank.
 *
 * A paper is REFUSED, never written short: marks that do not reach the printed
 * maximum, a question outside its pattern, or a question that is not a PUBLIC
 * question of its exam in one of the paper's own subjects.
 *
 * Idempotent: board_paper_replace upserts the paper and replaces its items in
 * one transaction, so a re-run after a question repair re-points the paper.
 *
 * WHEN IT SHOWS. The site reads the published list through a one-day cache
 * (getPublishedPapers), so a paper published here appears on /question-papers,
 * the Board hub and the sitemap within a day, or at the next deploy. A paper
 * page reached directly shows its new contents once its own day-long copy
 * expires. Check the data straight away with `npm run papers:smoke`.
 */
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { cbseManifest, withLeaderQuestions, type PaperManifest, type SourcePaper, type SourceQuestion } from "../../src/lib/questionPapers/manifest";
import { CBSE_FOLLOWERS } from "./cbseFollowers";
import { mhManifest, type MarksPattern } from "../../src/lib/questionPapers/mhPattern";
import { slugify } from "../../src/lib/board/query";
import { MH_PATTERNS, sscPatternFor } from "./mhPatterns";
import * as hscPaper from "../mh-hsc-12-pyq/paper/config";
import { catalogFor as hscCatalogFor } from "../mh-hsc-12-pyq/paper/catalog";
import * as hscGeo from "../mh-hsc-12-geo-pyq/config";
import { buildPaperRecords as geoRecords } from "../mh-hsc-12-geo-pyq/lib";
import * as ssc from "../mh-ssc-10/config";
import { buildPaperRecords as sscRecords } from "../mh-ssc-10/lib";

const CBSE_DIR = join(process.cwd(), "scripts/cbse-12-pyq/data");
/** CBSE's paper-code prefix → the bank's subject name (scripts/cbse-12-pyq/config.ts). */
const CBSE_SUBJECTS: Record<string, string> = { "55": "Physics", "56": "Chemistry", "57": "Biology", "65": "Mathematics" };

const EXAMS: Record<string, string> = {
  "cbse-12": "CBSE Class 12",
  "mh-hsc-12": "Maharashtra HSC Class 12",
  "mh-ssc-10": "Maharashtra State Board Class 10",
};

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const PUBLISH = args.includes("--publish");
const ONLY = args.find((a) => a.startsWith("--only="))?.slice("--only=".length) ?? null;
const EXAM = args.find((a) => a.startsWith("--exam="))?.slice("--exam=".length) ?? null;
if (EXAM && !EXAMS[EXAM]) throw new Error(`--exam must be one of ${Object.keys(EXAMS).join(", ")}`);

/** One paper ready to resolve: its exam, its subject, every subject its questions may be in. */
type Candidate = { exam: string; subjectName: string; subjects: string[]; manifest: PaperManifest };
type Built = Candidate & { questionIds: string[] };

const refused: string[] = [];

/** A transcription file holds an array, or `{ questions: [...] }`. */
function readQuestions(path: string): SourceQuestion[] {
  const d = JSON.parse(readFileSync(path, "utf8"));
  return (Array.isArray(d) ? d : d.questions) as SourceQuestion[];
}

/** Fingerprints by question, from the lane's own record builder (the commit's). */
function fingerprintsBy(questions: SourceQuestion[], rows: { contentHash: string }[], id: string) {
  if (rows.length !== questions.length) throw new Error(`${id}: ${rows.length} records for ${questions.length} questions`);
  const byQ = new Map(questions.map((q, i) => [q, rows[i].contentHash]));
  return (q: SourceQuestion) => byQ.get(q)!;
}

/**
 * A reconciled HSC sitting's reviewed `resolve` map (data/reconcile/<id>.json):
 * refs whose own row was deliberately left as it is, because corrected it would
 * copy another sitting's row word for word. Such a ref resolves to its OWN
 * sitting's row by id ("row:<id>"), not by fingerprint, which would find the
 * other sitting's copy. The row is still checked: PUBLIC, this exam, an
 * allowed subject.
 */
function resolvedRows(paperId: string): Record<string, string> {
  const path = join(dirname(hscPaper.questionsJsonPath(paperId)), "reconcile", `${paperId}.json`);
  return existsSync(path) ? ((JSON.parse(readFileSync(path, "utf8")) as { resolve?: Record<string, string> }).resolve ?? {}) : {};
}

/** A Maharashtra transcription calls a case study's set `setLabel`. */
function withSetId(questions: SourceQuestion[]): SourceQuestion[] {
  return questions.map((q) => {
    const label = (q as SourceQuestion & { setLabel?: string | null }).setLabel;
    return label && !q.setId ? Object.assign(q, { setId: label }) : q;
  });
}

function mh(
  exam: string,
  id: string,
  subjectName: string,
  subjects: string[],
  meta: Parameters<typeof mhManifest>[0],
  pattern: MarksPattern,
  fingerprint: (q: SourceQuestion) => string
): Candidate | null {
  const r = mhManifest(meta, pattern, fingerprint);
  if (!r.ok) {
    refused.push(`${id}: ${r.reason}`);
    return null;
  }
  return { exam, subjectName, subjects, manifest: r.manifest };
}

function cbseSources(): Candidate[] {
  const out: Candidate[] = [];
  for (const file of readdirSync(CBSE_DIR).filter((f) => /^\d{4}-\d+-\d+-\d+\.questions\.json$/.test(f)).sort()) {
    const read = (f: string) => JSON.parse(readFileSync(join(CBSE_DIR, f), "utf8")) as SourcePaper;
    const id = file.replace(/\.questions\.json$/, "");
    const follower = CBSE_FOLLOWERS[id];
    // A follower transcription holds only its own questions; the leader supplies the rest.
    const src = follower ? withLeaderQuestions(read(file), read(`${follower.leader}.questions.json`), follower.map) : read(file);
    const subjectName = CBSE_SUBJECTS[src.paper.split("/")[0]];
    if (!subjectName) {
      refused.push(`${file}: no subject for paper code ${src.paper}`);
      continue;
    }
    const r = cbseManifest(src, { subjectName });
    if (!r.ok) refused.push(r.reason);
    else out.push({ exam: "cbse-12", subjectName, subjects: [subjectName], manifest: r.manifest });
  }
  return out;
}

function hscSources(): Candidate[] {
  const out: Candidate[] = [];
  for (const paper of Object.values(hscPaper.PAPERS)) {
    const path = hscPaper.questionsJsonPath(paper.id);
    if (!existsSync(path)) continue; // a reconcile-only sitting with no transcription of its own
    const questions = withSetId(readQuestions(path));
    const { rows } = sscRecords(hscCatalogFor(paper.subject), questions as never);
    const month = paper.month.toLowerCase();
    const resolve = resolvedRows(paper.id);
    const byHash = fingerprintsBy(questions, rows, paper.id);
    const c = mh(
      "mh-hsc-12",
      paper.id,
      paper.subject,
      [paper.subject],
      {
        slug: `${slugify(paper.subject)}-${paper.year}-${month}`,
        groupSlug: `${paper.year}-${month}`,
        title: `Maharashtra HSC Class 12 ${paper.subject} ${paper.month} ${paper.year}`,
        year: paper.year,
        sitting: paper.month,
        paperCode: paper.paperCode && paper.paperCode !== "n/a" ? paper.paperCode : null,
        questions,
      },
      paper.subject === "Mathematics" ? MH_PATTERNS.hscMaths : MH_PATTERNS.hscPhysChem,
      (q) => (resolve[q.ref] ? `row:${resolve[q.ref]}` : byHash(q))
    );
    if (c) out.push(c);
  }
  for (const paper of Object.values(hscGeo.PAPERS)) {
    const questions = withSetId(readQuestions(hscGeo.questionsJsonPath(paper.id)));
    const { rows } = geoRecords(hscGeo.GEOGRAPHY_CATALOG, questions as never);
    const month = paper.month.toLowerCase();
    const c = mh(
      "mh-hsc-12",
      paper.id,
      "Geography",
      ["Geography"],
      {
        slug: `geography-${paper.year}-${month}`,
        groupSlug: `${paper.year}-${month}`,
        title: `Maharashtra HSC Class 12 Geography ${paper.month} ${paper.year}`,
        year: paper.year,
        sitting: paper.month,
        paperCode: null,
        questions,
      },
      MH_PATTERNS.hscGeography,
      fingerprintsBy(questions, rows, paper.id)
    );
    if (c) out.push(c);
  }
  return out;
}

function sscSources(): Candidate[] {
  const out: Candidate[] = [];
  for (const paper of Object.values(ssc.PAPERS)) {
    const path = ssc.questionsJsonPath(paper.id);
    if (!existsSync(path)) continue;
    const name = sscPatternFor(paper.id);
    if (!name) {
      refused.push(`${paper.id}: no marks pattern for this paper family`);
      continue;
    }
    const questions = withSetId(readQuestions(path));
    const subjects = paper.subjects ?? [paper.subjectName];
    const { rows } = sscRecords(ssc.paperCatalogs(paper), questions as never);
    const c = mh(
      "mh-ssc-10",
      paper.id,
      paper.subjectName,
      subjects,
      {
        slug: `${slugify(paper.subjectName)}-${paper.year}`,
        groupSlug: String(paper.year),
        title: `Maharashtra SSC Class 10 ${subjects.join(" and ")} ${paper.month} ${paper.year}`,
        year: paper.year,
        sitting: paper.month,
        paperCode: paper.paperCode ?? null,
        questions,
      },
      MH_PATTERNS[name],
      fingerprintsBy(questions, rows, paper.id)
    );
    if (c) out.push(c);
  }
  return out;
}

async function idsByHash(admin: SupabaseClient, examId: string, hashes: string[]): Promise<Map<string, { id: string; subjectId: string }>> {
  const out = new Map<string, { id: string; subjectId: string }>();
  // "row:<id>" is a reviewed resolve (see resolvedRows): look the row up by id,
  // under the same PUBLIC + exam rules as a fingerprint.
  const rowIds = [...new Set(hashes.filter((h) => h.startsWith("row:")).map((h) => h.slice(4)))];
  for (let i = 0; i < rowIds.length; i += 150) {
    const { data, error } = await admin
      .from("questions")
      .select("id, subject_id")
      .eq("exam_id", examId)
      .eq("visibility", "PUBLIC")
      .in("id", rowIds.slice(i, i + 150));
    if (error) throw new Error(`question lookup: ${error.message}`);
    for (const r of data ?? []) out.set(`row:${r.id}`, { id: r.id as string, subjectId: r.subject_id as string });
  }
  const unique = [...new Set(hashes.filter((h) => !h.startsWith("row:")))];
  // .in() puts the list in the URL: chunk at ~150, whatever the result size.
  for (let i = 0; i < unique.length; i += 150) {
    const { data, error } = await admin
      .from("questions")
      .select("id, content_hash, subject_id")
      .eq("exam_id", examId)
      .eq("visibility", "PUBLIC")
      .in("content_hash", unique.slice(i, i + 150));
    if (error) throw new Error(`question lookup: ${error.message}`);
    for (const r of data ?? []) out.set(r.content_hash as string, { id: r.id as string, subjectId: r.subject_id as string });
  }
  return out;
}

async function main() {
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const wanted = (exam: string) => !EXAM || EXAM === exam;
  const candidates = [
    ...(wanted("cbse-12") ? cbseSources() : []),
    ...(wanted("mh-hsc-12") ? hscSources() : []),
    ...(wanted("mh-ssc-10") ? sscSources() : []),
  ].filter((c) => !ONLY || c.manifest.slug === ONLY || c.manifest.groupSlug === ONLY);

  const built: Built[] = [];
  const examIds = new Map<string, string>();
  const subjectIds = new Map<string, Map<string, string>>();
  for (const exam of new Set(candidates.map((c) => c.exam))) {
    const { data: e, error } = await admin.from("exams").select("id").eq("name", EXAMS[exam]).single();
    if (error || !e) throw new Error(`exam "${EXAMS[exam]}" not found`);
    examIds.set(exam, e.id as string);
    const { data: subs, error: subErr } = await admin.from("subjects").select("id, name").eq("exam_id", e.id);
    if (subErr) throw new Error(`subjects: ${subErr.message}`);
    subjectIds.set(exam, new Map((subs ?? []).map((s) => [s.name as string, s.id as string])));
  }
  for (const exam of examIds.keys()) {
    const mine = candidates.filter((c) => c.exam === exam);
    const found = await idsByHash(admin, examIds.get(exam)!, mine.flatMap((c) => c.manifest.items.map((i) => i.contentHash)));
    const subs = subjectIds.get(exam)!;
    for (const c of mine) {
      const allowed = new Set(c.subjects.map((s) => subs.get(s)).filter((x): x is string => !!x));
      if (!subs.has(c.subjectName)) {
        refused.push(`${c.manifest.slug}: no subject "${c.subjectName}" in ${EXAMS[exam]}`);
        continue;
      }
      const missing = c.manifest.items.filter((i) => !allowed.has(found.get(i.contentHash)?.subjectId ?? ""));
      if (missing.length) {
        refused.push(
          `${c.manifest.slug}: ${missing.length} question(s) not PUBLIC in ${c.subjects.join("/")} (${missing.map((m) => m.printedNumber).slice(0, 8).join(", ")})`
        );
        continue;
      }
      built.push({ ...c, questionIds: c.manifest.items.map((i) => found.get(i.contentHash)!.id) });
    }
  }

  for (const exam of examIds.keys()) {
    const mine = built.filter((b) => b.exam === exam);
    const bySubject = new Map<string, number>();
    for (const b of mine) bySubject.set(b.subjectName, (bySubject.get(b.subjectName) ?? 0) + 1);
    console.log(`${EXAMS[exam]}: ${mine.length} paper(s) in ${new Set(mine.map((b) => b.manifest.groupSlug + b.subjectName)).size} page(s) ready`);
    for (const [s, n] of [...bySubject].sort()) console.log(`  ${s}: ${n}`);
  }
  if (refused.length) {
    console.log(`\nrefused ${refused.length}:`);
    for (const r of refused) console.log(`  ${r}`);
  }

  if (!APPLY) {
    console.log(`\nDRY RUN: nothing written. Add --apply to write${PUBLISH ? "" : " (unpublished; --publish to publish)"}.`);
    return;
  }
  let items = 0;
  for (const b of built) {
    const m = b.manifest;
    const { data, error } = await admin.rpc("board_paper_replace", {
      p_paper: {
        examId: examIds.get(b.exam),
        subjectId: subjectIds.get(b.exam)!.get(b.subjectName),
        slug: m.slug,
        groupSlug: m.groupSlug,
        setNumber: m.setNumber,
        year: m.year,
        sitting: m.sitting,
        paperCode: m.paperCode,
        title: m.title,
        totalMarks: m.totalMarks,
        durationMinutes: m.durationMinutes,
        sections: m.sections,
        published: PUBLISH,
      },
      p_items: m.items.map((it, i) => ({
        position: it.position,
        printedNumber: it.printedNumber,
        section: it.section,
        marks: it.marks,
        alternativeTo: it.alternativeTo,
        partOf: it.partOf,
        caseKey: it.caseKey,
        questionId: b.questionIds[i],
      })),
    });
    if (error) throw new Error(`${m.slug}: ${error.message}`);
    items += data as number;
  }
  console.log(`\nwrote ${built.length} paper(s), ${items} item(s), ${PUBLISH ? "PUBLISHED" : "unpublished"}.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
