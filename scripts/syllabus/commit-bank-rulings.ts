/**
 * Write authored bank-spine rulings into syllabus_concept_exams.
 *
 *   npx tsx scripts/syllabus/commit-bank-rulings.ts phy-jee-rulings
 *   npx tsx scripts/syllabus/commit-bank-rulings.ts phy-jee-rulings --apply
 *
 * Rulings live in scripts/syllabus/data/<name>.json as DATA, not as TypeScript
 * consts (the Chemistry script inlines ~900 lines of them). Data keeps the
 * authored judgement reviewable on its own and lets a partial batch ship: only
 * the subtopics actually reviewed get a row, and everything else stays
 * genuinely unassessed rather than defaulting to "covered".
 *
 * THREE guards, each closing a way a ruling can silently land on the wrong row:
 *
 *   1. section_no must exist in the spine for this subject + source.
 *   2. the recorded `subtopic` must still match the spine's concept name.
 *      This is the load-bearing one. `section_no` is POSITIONAL (JEE-001,
 *      JEE-002, ...), so re-running the spine ingest after the bank's taxonomy
 *      changes SHIFTS every later ref: JEE-005 stops being Transformers and a
 *      ruling written for it would be applied, silently and plausibly, to some
 *      other subtopic. Matching on the name turns that into a loud failure.
 *   3. every covered_by ref must resolve to a live section of the named book,
 *      for THIS subject - checked before any write, so a bad ref surfaces while
 *      the mapping is being authored rather than after it ships.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { requireSubjectArg } from "./subject-arg";

type Side = { status?: "full" | "partial" | "not"; coveredBy?: string; note?: string };
type Ruling = { section_no: string; subtopic: string; stateBoard?: Side; ncert?: Side };
type File = { exam: string; subject: string; source: string; rulings: Ruling[] };

/** Which book each exam COLUMN is asking about on a bank-spine row. */
const BOOK_OF = { "MH State Board": "MH State Board", "CBSE Class 12": "NCERT" } as const;

/** Mirrors the syllabus_concept_exams_note_len CHECK constraint (migration 0065). */
const NOTE_MAX = 500;

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function main() {
  return (async () => {
    const apply = process.argv.includes("--apply");
    const name = process.argv.slice(2).find((a) => !a.startsWith("--"));
    if (!name) throw new Error("usage: commit-bank-rulings.ts <data-file-name> [--apply]");
    const cfg = requireSubjectArg(process.argv);
    loadEnv();

    const path = join(process.cwd(), "scripts", "syllabus", "data", `${name}.json`);
    if (!existsSync(path)) throw new Error(`missing rulings file: ${path}`);
    const file = JSON.parse(readFileSync(path, "utf8")) as File;
    if (file.subject !== cfg.subject) {
      throw new Error(`file declares subject "${file.subject}" but --subject is "${cfg.subject}"`);
    }

    const db = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    );

    // --- the spine this file rules on ---
    const { data: spine, error: spineErr } = await db
      .from("syllabus_concepts")
      .select("id,section_no,concept,chapter_name")
      .eq("subject", cfg.subject)
      .eq("source", file.source);
    if (spineErr) throw new Error(spineErr.message);
    const bySection = new Map((spine ?? []).map((r) => [r.section_no, r]));

    // --- guards 1 + 2 ---
    const problems: string[] = [];
    for (const r of file.rulings) {
      const row = bySection.get(r.section_no);
      if (!row) {
        problems.push(`${r.section_no}: no such section in the ${file.source} spine`);
        continue;
      }
      // The spine stores "Name (N PYQ)"; compare on the name alone.
      const actual = row.concept.replace(/\s*\(\d+\s*PYQ\)\s*$/, "");
      if (actual !== r.subtopic) {
        problems.push(
          `${r.section_no}: ruling is for "${r.subtopic}" but the spine now holds "${actual}" ` +
            `— positional refs shifted; re-anchor this file before writing`,
        );
      }
      // Mirrors the syllabus_concept_exams_note_len CHECK. Without this the
      // dry run reports a clean file and the limit is only discovered by the
      // INSERT failing, which is the least useful moment to learn it: the whole
      // batch rolls back and nothing says WHICH note was too long.
      for (const [side, s] of [
        ["stateBoard", r.stateBoard],
        ["ncert", r.ncert],
      ] as const) {
        const n = s?.note;
        if (n && n.length > NOTE_MAX) {
          problems.push(
            `${r.section_no} ${side}: note is ${n.length} chars, limit is ${NOTE_MAX}`,
          );
        }
      }
    }

    // --- guard 3 ---
    const liveOf = async (source: string) => {
      const { data, error } = await db
        .from("syllabus_concepts")
        .select("class,section_no")
        .eq("subject", cfg.subject)
        .eq("source", source);
      if (error) throw new Error(error.message);
      return new Set((data ?? []).map((x) => `${x.class}|${x.section_no}`));
    };
    const live: Record<string, Set<string>> = {
      "MH State Board": await liveOf("MH State Board"),
      "CBSE Class 12": await liveOf("NCERT"),
    };
    for (const r of file.rulings) {
      for (const [examCol, side] of [
        ["MH State Board", r.stateBoard],
        ["CBSE Class 12", r.ncert],
      ] as const) {
        if (!side?.coveredBy) continue;
        for (const raw of side.coveredBy.split(",").map((x) => x.trim()).filter(Boolean)) {
          const m = /^(XI|XII):(.+)$/.exec(raw);
          const cls = m ? (m[1] === "XII" ? "12" : "11") : "12";
          const no = m ? m[2].trim() : raw;
          if (!live[examCol].has(`${cls}|${no}`)) {
            problems.push(`${r.section_no} -> ${BOOK_OF[examCol]} Std${cls} ${no}: no such section`);
          }
        }
      }
    }

    if (problems.length) {
      console.error(`\nREFUSING TO WRITE — ${problems.length} problem(s):`);
      for (const p of problems) console.error("  " + p);
      process.exit(1);
    }

    const links = file.rulings.flatMap((r) =>
      ([["MH State Board", r.stateBoard], ["CBSE Class 12", r.ncert]] as const)
        .filter(([, side]) => side && (side.status || side.coveredBy))
        .map(([examCol, side]) => ({
          concept_id: bySection.get(r.section_no)!.id,
          exam: examCol,
          status: side!.status ?? "full",
          note: side!.note ?? null,
          covered_by: side!.coveredBy?.trim() || null,
        })),
    );

    const tally = { full: 0, partial: 0, not: 0 } as Record<string, number>;
    for (const l of links) tally[l.status] += 1;
    console.log(`\n${file.exam} — ${cfg.label}: ${file.rulings.length} subtopic(s) ruled`);
    console.log(`  ${links.length} link row(s): ${tally.full} full · ${tally.partial} partial · ${tally.not} not`);
    console.log("  all refs resolve; all subtopic names still match the spine.");

    if (!apply) {
      console.log("\nDRY RUN — nothing written. Re-run with --apply.");
      return;
    }
    for (let i = 0; i < links.length; i += 200) {
      const { error } = await db
        .from("syllabus_concept_exams")
        .upsert(links.slice(i, i + 200), { onConflict: "concept_id,exam" });
      if (error) throw new Error(`links: ${error.message}`);
    }
    console.log(`\nDone. ${links.length} ruling row(s) written.`);
  })();
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
