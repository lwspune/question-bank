/**
 * Standing quality probe over a subject's BOOK spines.
 *
 *   npx tsx scripts/syllabus/audit-spine.ts --subject=physics
 *   npx tsx scripts/syllabus/audit-spine.ts --subject=chemistry
 *
 * Exists because two real defects shipped in the Physics NCERT spine and NO
 * check I had could have caught either:
 *
 *   - 5.2.1 "The magnetic field lines" was missing entirely. The gap check only
 *     tested TOP-LEVEL contiguity (1.1, 1.2, ...), so a hole in a sub-section
 *     numbering was structurally invisible to it.
 *   - 9.3 was titled "STREAMLINE FLOW So far we have studied fluids at rest.
 *     The study" - a heading that had swallowed the prose after it. Nothing
 *     tested title QUALITY at all.
 *
 * Both were found by eye, weeks-equivalent later, while reading section lists
 * for an unrelated reason. This makes that luck into a check.
 *
 * TRIAGE, not a gate: it exits 0 and prints candidates. A book genuinely skips
 * numbers sometimes, and a long title is occasionally real.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { requireSubjectArg } from "./subject-arg";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Row = { class: number; chapter_no: number; section_no: string; concept: string };

/** "1.4.2" -> parent "1.4"; top-level sections have no parent. */
function parentOf(section: string): string | null {
  const parts = section.split(".");
  return parts.length > 2 ? parts.slice(0, -1).join(".") : null;
}

function lastNumber(section: string): number {
  return Number(section.split(".").pop());
}

async function main() {
  const cfg = requireSubjectArg(process.argv);
  loadEnv();
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  for (const source of ["MH State Board", "NCERT"]) {
    const { data, error } = await db
      .from("syllabus_concepts")
      .select("class,chapter_no,section_no,concept")
      .eq("subject", cfg.subject)
      .eq("source", source);
    if (error) throw new Error(error.message);
    const rows = (data ?? []) as Row[];
    if (!rows.length) continue;

    const present = new Set(rows.map((r) => `${r.class}|${r.section_no}`));
    const findings: string[] = [];

    // 1. SUB-SECTION holes. Grouped by parent, so 1.4.1 + 1.4.3 without 1.4.2
    //    is reported — the class that hid 5.2.1.
    const byParent = new Map<string, number[]>();
    for (const r of rows) {
      const p = parentOf(r.section_no);
      if (!p) continue;
      const key = `${r.class}|${p}`;
      byParent.set(key, [...(byParent.get(key) ?? []), lastNumber(r.section_no)]);
    }
    for (const [key, nums] of byParent) {
      const [cls, parent] = key.split("|");
      const max = Math.max(...nums);
      const missing = [];
      for (let i = 1; i <= max; i++) if (!nums.includes(i)) missing.push(`${parent}.${i}`);
      // Only report when the PARENT exists: an orphan run is a different defect.
      if (missing.length && present.has(`${cls}|${parent}`)) {
        findings.push(`Std${cls} sub-section hole under ${parent}: ${missing.join(", ")}`);
      }
    }

    // 2. TOP-LEVEL holes (the original check, kept).
    const byChapter = new Map<string, number[]>();
    for (const r of rows) {
      if (r.section_no.split(".").length !== 2) continue;
      const key = `${r.class}|${r.chapter_no}`;
      byChapter.set(key, [...(byChapter.get(key) ?? []), lastNumber(r.section_no)]);
    }
    for (const [key, nums] of byChapter) {
      const [cls, ch] = key.split("|");
      const max = Math.max(...nums);
      const missing = [];
      for (let i = 1; i <= max; i++) if (!nums.includes(i)) missing.push(`${ch}.${i}`);
      if (missing.length) findings.push(`Std${cls} ch${ch} missing: ${missing.join(", ")}`);
    }

    // 3. TITLE SANITY — the check that did not exist.
    for (const r of rows) {
      const t = r.concept;
      const why: string[] = [];
      // A heading that swallowed prose: sentence punctuation mid-title, or a
      // stop-word run that only running text produces.
      // A sentence terminator followed by a new capitalised clause: headings do
      // not contain full stops mid-string, running prose does.
      if (/[a-z]\.\s+[A-Z]/.test(t)) why.push("sentence break inside title");
      // FIRST-PERSON / narrative openers. Deliberately narrow: an earlier,
      // looser version also matched "of the <3 words>" and flagged eight real
      // titles ("Measurement of the Size of a Planet or a Star"), which is how a
      // probe becomes noise and then gets ignored.
      if (/\b(we have|we shall|so far|in this (chapter|section)|you have (seen|studied))\b/i.test(t))
        why.push("reads as prose");
      if (t.length > 95) why.push(`very long (${t.length})`);
      if (!/[A-Za-z]{3}/.test(t)) why.push("no alphabetic word");
      // NOT "starts lowercase": "p-n junction" is a real heading in both books.
      if (why.length) findings.push(`Std${r.class} ${r.section_no}: ${why.join(" · ")} — ${JSON.stringify(t.slice(0, 70))}`);
    }

    console.log(`\n=== ${cfg.label} · ${source}: ${rows.length} rows, ${findings.length} candidate(s) ===`);
    for (const f of findings) console.log("  " + f);
    if (!findings.length) console.log("  clean");
  }
  console.log("\nTriage only — a book may genuinely skip a number, and some titles are long.");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
