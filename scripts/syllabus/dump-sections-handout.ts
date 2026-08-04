/**
 * Write the book spines for one subject as a markdown handout.
 *
 *   npx tsx scripts/syllabus/dump-sections-handout.ts --subject=chemistry
 *
 * Ruling authors — me or a subagent — must cite a section that EXISTS, because
 * commit-bank-rulings.ts refuses to write a `coveredBy` ref that resolves to no
 * section of the named book. Handing over the real list up front turns that
 * guard from a late failure into a non-event.
 *
 * Generated from the LIVE spine rather than from scripts/syllabus/data/*.json,
 * so the handout cannot drift from what the validator will check against.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { writeFileSync, mkdirSync } from "node:fs";
import { requireSubjectArg } from "./subject-arg";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const BOOKS = ["MH State Board", "NCERT"] as const;

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
  const cfg = requireSubjectArg(process.argv);

  const lines: string[] = [
    `# ${cfg.label} — book sections you may cite`,
    "",
    "Every `coveredBy` ref must name one of these, prefixed with the YEAR:",
    "`XI:11.8` or `XII:2.3`. A ref naming no section here is rejected at commit.",
    "",
  ];

  for (const source of BOOKS) {
    // Paged: the two spines together exceed the PostgREST 1000-row cap, and a
    // silently truncated handout would send an author looking for sections that
    // are present in the book but missing from the page they were given.
    const rows: {
      class: number;
      chapter_no: number;
      chapter_name: string;
      section_no: string;
      concept: string;
    }[] = [];
    for (let from = 0; ; from += 1000) {
      const { data, error } = await db
        .from("syllabus_concepts")
        .select("class,chapter_no,chapter_name,section_no,concept")
        .eq("subject", cfg.subject)
        .eq("source", source)
        .order("class")
        .order("chapter_no")
        .order("seq")
        .range(from, from + 999);
      if (error) throw new Error(`${source}: ${error.message}`);
      rows.push(...(data ?? []));
      if ((data ?? []).length < 1000) break;
    }

    lines.push(`## ${source} (${rows.length} sections)`, "");
    let lastChapter = "";
    for (const r of rows) {
      const key = `${r.class}|${r.chapter_no}`;
      if (key !== lastChapter) {
        lastChapter = key;
        const year = r.class === 11 ? "XI" : "XII";
        lines.push("", `### Std ${year} Ch.${r.chapter_no} ${r.chapter_name}`, "");
      }
      lines.push(`- \`${r.section_no}\` ${r.concept}`);
    }
    lines.push("");
  }

  const dest = join(process.cwd(), "generated-papers", `${cfg.key}-sections-handout.md`);
  mkdirSync(join(process.cwd(), "generated-papers"), { recursive: true });
  writeFileSync(dest, lines.join("\n"), "utf-8");
  console.log(`-> ${dest} (${lines.length} lines)`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
