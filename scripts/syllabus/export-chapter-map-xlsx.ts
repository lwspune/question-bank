/**
 * Chapter-level syllabus maps as Excel workbooks.
 *
 *   npx tsx scripts/syllabus/export-chapter-map-xlsx.ts            # both
 *   npx tsx scripts/syllabus/export-chapter-map-xlsx.ts ncert 12   # just one
 *
 *   -> generated-papers/NCERT_Std_XI_to_State_Board_Chapters.xlsx
 *   -> generated-papers/JEE_Mains_to_State_Board_Chapters.xlsx
 *
 * CHAPTER grain — "which State Board chapter do I open?" — deliberately coarser
 * than the /dashboard/syllabus alignment table, which answers the same question
 * per subtopic.
 *
 * Two things differ from the Word version, both because this is a SPREADSHEET:
 *   - the source chapter is repeated on every row instead of blanked on
 *     continuation rows. A blank reads nicely on paper but breaks sorting and
 *     filtering, which is the whole point of shipping .xlsx.
 *   - Std / Ch / name are separate columns rather than one "Std XII Ch.4 Name"
 *     string, so the sheet can be sorted by year or chapter number.
 *
 * JEE chapter ORDER comes from the shared dominantSbByChapter helper — the same
 * one /dashboard/syllabus orders its JEE table with, so the sheet and the page
 * cannot disagree about where a chapter belongs.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";
import { loadOldSyllabusChapters } from "../../src/lib/syllabus/query";
import { requireSubjectArg } from "./subject-arg";
import {
  SPINE,
  splitCoveredBy,
  parseCoveredRef,
  isTopLevelSection,
  splitPyqCount,
  dominantSbByChapter,
  sbBookOrder,
} from "../../src/lib/syllabus/summary";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type C = {
  id: string;
  source: string;
  class: number;
  chapter_no: number;
  chapter_name: string;
  section_no: string;
  concept: string;
  seq: number;
};
type L = { concept_id: string; exam: string; covered_by: string | null };

const roman = (c: number) => (c === 12 ? "XII" : "XI");

async function pageAll<T>(db: any, table: string, cols: string): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db.from(table).select(cols).range(from, from + 999);
    if (error) throw new Error(`${table}: ${error.message}`);
    out.push(...(data as T[]));
    if ((data as T[]).length < 1000) break;
  }
  return out;
}

/** One inbound mapping: a source chapter reaching into a State Board chapter. */
type Edge = { cls: number; ch: number; name: string; units: number; pyq: number };

function writeSheet(rows: Record<string, string | number>[], headers: string[], file: string, sheet: string) {
  const ws = XLSX.utils.json_to_sheet(rows, { header: headers });
  ws["!cols"] = headers.map((h) => ({
    wch: Math.min(52, Math.max(h.length + 2, ...rows.map((r) => String(r[h] ?? "").length + 2))),
  }));
  // Freeze the header and turn on autofilter — this is a lookup table, so the
  // first thing anyone does is filter it.
  ws["!freeze"] = { xSplit: 0, ySplit: 1 };
  ws["!autofilter"] = { ref: XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: rows.length, c: headers.length - 1 } }) };
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheet);
  mkdirSync(join(process.cwd(), "generated-papers"), { recursive: true });
  const out = join(process.cwd(), "generated-papers", file);
  writeFileSync(out, XLSX.write(wb, { bookType: "xlsx", type: "buffer" }));
  console.log(`WROTE ${out}  (${rows.length} rows)`);
  return out;
}

async function main() {
  // Positionals, skipping flags — `--subject=` may sit in any position.
  const positional = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const which = (positional[0] ?? "all").toLowerCase();
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
  const concepts = await pageAll<C>(
    db,
    "syllabus_concepts",
    "id,source,class,chapter_no,chapter_name,section_no,concept,seq",
  );
  const links = await pageAll<L>(db, "syllabus_concept_exams", "concept_id,exam,covered_by");
  const coveredOf = new Map(
    links.filter((l) => l.exam === SPINE.stateBoard).map((l) => [l.concept_id, l.covered_by]),
  );
  // DISTINCT chapters. Joining against concept rows instead multiplies every
  // aggregate by the number of concepts in the chapter — it inflated a 20-PYQ
  // chapter to 360 before this was pinned down.
  const sbChapter = new Map<string, string>();
  for (const c of concepts)
    if (c.source === SPINE.stateBoard) sbChapter.set(`${c.class}|${c.chapter_no}`, c.chapter_name);

  /** Group a spine's rows into chapter -> State Board chapter edges. */
  function edgesFor(rows: C[], unitOf: (c: C) => string): Map<string, Edge[]> {
    const acc = new Map<string, Map<string, { units: Set<string>; pyq: Map<string, number> }>>();
    for (const c of rows) {
      const covered = coveredOf.get(c.id);
      if (!covered) continue;
      const { pyq } = splitPyqCount(c.concept);
      for (const raw of splitCoveredBy(covered)) {
        const { cls, no } = parseCoveredRef(raw, c.class);
        const key = `${cls}|${Number(no.split(".")[0])}`;
        if (!sbChapter.has(key)) continue;
        const per = acc.get(c.chapter_name) ?? new Map();
        const cell = per.get(key) ?? { units: new Set<string>(), pyq: new Map<string, number>() };
        // Keyed by UNIT, so a source pointing at 5.6, 5.6.1 and 5.6.2 counts
        // once — and its PYQ is not added three times.
        cell.units.add(unitOf(c));
        cell.pyq.set(c.id, pyq);
        per.set(key, cell);
        acc.set(c.chapter_name, per);
      }
    }
    const out = new Map<string, Edge[]>();
    for (const [chapter, per] of acc) {
      out.set(
        chapter,
        [...per.entries()]
          .map(([k, v]) => {
            const [cls, ch] = k.split("|").map(Number);
            return {
              cls,
              ch,
              name: sbChapter.get(k)!,
              units: v.units.size,
              pyq: [...v.pyq.values()].reduce((a, b) => a + b, 0),
            };
          })
          .sort((a, b) => b.units - a.units || b.pyq - a.pyq || a.cls - b.cls || a.ch - b.ch),
      );
    }
    return out;
  }

  // ---------- NCERT ----------
  if (which === "all" || which === "ncert") {
    for (const cls of which === "ncert" && positional[1] ? [Number(positional[1])] : [11, 12]) {
      const mine = concepts.filter(
        (c) => c.source === SPINE.ncert && c.class === cls && isTopLevelSection(c.section_no),
      );
      const edges = edgesFor(mine, (c) => c.section_no);
      const chapters = [...new Map(mine.map((c) => [c.chapter_no, c.chapter_name])).entries()].sort(
        (a, b) => a[0] - b[0],
      );
      const rows: Record<string, string | number>[] = [];
      for (const [no, name] of chapters) {
        const es = edges.get(name) ?? [];
        if (!es.length) {
          // Emitted, not skipped: a chapter with NO State Board home is the most
          // useful row in the sheet, and dropping it would hide it.
          rows.push({ "NCERT Ch": no, "NCERT chapter": name, "SB Std": "", "SB Ch": "", "State Board chapter": "", Sections: "" });
          continue;
        }
        es.forEach((e, i) =>
          rows.push({
            "NCERT Ch": no,
            "NCERT chapter": name,
            "SB Std": roman(e.cls),
            "SB Ch": e.ch,
            "State Board chapter": e.name,
            Sections: e.units,
            Primary: i === 0 ? "yes" : "",
          }),
        );
      }
      writeSheet(
        rows,
        ["NCERT Ch", "NCERT chapter", "SB Std", "SB Ch", "State Board chapter", "Sections", "Primary"],
        `NCERT_Std_${roman(cls)}_to_State_Board_Chapters.xlsx`,
        `NCERT ${roman(cls)}`,
      );
    }
  }

  // ---------- JEE ----------
  if (which === "all" || which === "jee") {
    const cfg = requireSubjectArg(process.argv);
    const oldSyllabus = await loadOldSyllabusChapters(db as never, {
      subject: cfg.subject,
      liveFromYear: cfg.liveFromYear,
    });
    const mine = concepts.filter((c) => c.source === SPINE.jee);
    const edges = edgesFor(mine, (c) => c.id);

    // Same helper the page orders its JEE table with.
    const dominant = dominantSbByChapter(
      mine.map((c) => {
        const { pyq } = splitPyqCount(c.concept);
        const covered = coveredOf.get(c.id);
        return {
          chapterName: c.chapter_name,
          pyq,
          refs: splitCoveredBy(covered ?? "").flatMap((raw) => {
            const { cls, no } = parseCoveredRef(raw, c.class);
            const key = `${cls}|${Number(no.split(".")[0])}`;
            return sbChapter.has(key)
              ? [{ cls, no, chapterLabel: `Std ${roman(cls)} Ch.${no.split(".")[0]} ${sbChapter.get(key)}` }]
              : [];
          }),
        };
      }),
    );

    const chapterPyq = new Map<string, number>();
    for (const c of mine)
      chapterPyq.set(
        c.chapter_name,
        (chapterPyq.get(c.chapter_name) ?? 0) + splitPyqCount(c.concept).pyq,
      );

    const chapters = [...new Set(mine.map((c) => c.chapter_name))].sort((a, b) => {
      const oa = oldSyllabus.has(a) ? 1 : 0;
      const ob = oldSyllabus.has(b) ? 1 : 0;
      return (
        oa - ob ||
        sbBookOrder(dominant.get(a)) - sbBookOrder(dominant.get(b)) ||
        (chapterPyq.get(b) ?? 0) - (chapterPyq.get(a) ?? 0) ||
        a.localeCompare(b)
      );
    });

    const rows: Record<string, string | number>[] = [];
    for (const ch of chapters) {
      const es = edges.get(ch) ?? [];
      const syl = oldSyllabus.has(ch) ? "Old" : "Live";
      if (!es.length) {
        rows.push({
          "JEE chapter": ch,
          "SB Std": "",
          "SB Ch": "",
          "State Board chapter": "",
          Subtopics: "",
          PYQ: chapterPyq.get(ch) ?? 0,
          Syllabus: syl,
          Primary: "",
        });
        continue;
      }
      es.forEach((e, i) =>
        rows.push({
          "JEE chapter": ch,
          "SB Std": roman(e.cls),
          "SB Ch": e.ch,
          "State Board chapter": e.name,
          Subtopics: e.units,
          PYQ: e.pyq,
          Syllabus: syl,
          Primary: i === 0 ? "yes" : "",
        }),
      );
    }
    writeSheet(
      rows,
      ["JEE chapter", "SB Std", "SB Ch", "State Board chapter", "Subtopics", "PYQ", "Syllabus", "Primary"],
      "JEE_Mains_to_State_Board_Chapters.xlsx",
      "JEE to State Board",
    );
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
