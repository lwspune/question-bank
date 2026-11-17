/**
 * Write scripts/ssc-cgl/catalog.json: the chapter + subtopic names an SSC CGL question
 * may be filed under.
 *
 *   npx tsx scripts/ssc-cgl/seed-catalog.ts
 *
 * Most of SSC CGL Tier I is taught under names the bank already has, so they are
 * COPIED from CDS rather than re-invented: Mathematics (renamed Quantitative
 * Aptitude), English, and the eight General Knowledge subjects General Awareness is
 * split into. Reasoning, which no exam here carries in this shape, and the few SSC
 * topics CDS lacks come from catalog-authored.json.
 *
 * Read-only against the database. catalog.json is committed; re-run this only to
 * pick up a CDS rename, and extend catalog-authored.json (never catalog.json) when a
 * question fits nothing.
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { carryUsedNames, type Catalog } from "./catalogCarry";
import { parseTranscript } from "./lib";
import { join } from "node:path";

type Chapter = { chapter: string; subtopics: string[] };
type Authored = {
  subjects: Record<string, Chapter[]>;
  rename: Record<string, string>;
  add: Record<string, Chapter[]>;
};

const CDS_SUBJECTS = ["Mathematics", "English", "History", "Geography", "Polity", "Economics", "Physics", "Chemistry", "Biology", "Current Affairs"];

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function merge(into: Chapter[], extra: Chapter[], where: string): Chapter[] {
  const out = into.map((c) => ({ ...c, subtopics: [...c.subtopics] }));
  for (const e of extra) {
    const hit = out.find((c) => c.chapter === e.chapter);
    if (!hit) {
      out.push({ chapter: e.chapter, subtopics: [...e.subtopics] });
      continue;
    }
    for (const s of e.subtopics) {
      // CDS can gain a name SSC added first (the 2026-10-22 GK notes pass added
      // "Early Medieval Kingdoms"); the add is then redundant, not an error.
      if (hit.subtopics.includes(s)) {
        console.log(`note: ${where} / ${e.chapter}: "${s}" is now in CDS too; the authored add is redundant`);
        continue;
      }
      hit.subtopics.push(s);
    }
  }
  return out;
}

async function main() {
  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const authored: Authored = JSON.parse(readFileSync(join(__dirname, "catalog-authored.json"), "utf8"));

  const { data: exam, error: eErr } = await client.from("exams").select("id").eq("name", "CDS").single();
  if (eErr || !exam) throw new Error(`CDS exam not found: ${eErr?.message}`);

  const catalog: Record<string, Chapter[]> = {};
  for (const subject of CDS_SUBJECTS) {
    const { data: subj, error: sErr } = await client.from("subjects").select("id").eq("exam_id", exam.id).eq("name", subject).single();
    if (sErr || !subj) throw new Error(`CDS subject ${subject} not found: ${sErr?.message}`);
    const { data: chapters, error: cErr } = await client
      .from("chapters")
      .select("name, order_index, subtopics(name, order_index)")
      .eq("subject_id", subj.id);
    if (cErr) throw new Error(`chapters of ${subject}: ${cErr.message}`);
    const ord = (a: { order_index: number | null; name: string }, b: { order_index: number | null; name: string }) =>
      (a.order_index ?? 1e9) - (b.order_index ?? 1e9) || a.name.localeCompare(b.name);
    const list: Chapter[] = (chapters ?? [])
      .sort(ord)
      .map((c) => ({ chapter: c.name, subtopics: [...(c.subtopics ?? [])].sort(ord).map((s) => s.name) }));
    catalog[authored.rename[subject] ?? subject] = list;
  }
  for (const [subject, chapters] of Object.entries(authored.subjects)) {
    if (catalog[subject]) throw new Error(`authored subject ${subject} would overwrite a copied one`);
    catalog[subject] = chapters;
  }
  for (const [subject, extra] of Object.entries(authored.add)) {
    if (!catalog[subject]) throw new Error(`"add" names unknown subject ${subject}`);
    catalog[subject] = merge(catalog[subject], extra, subject);
  }

  // Third source (2026-11-17): every name a committed transcript still uses. A CDS
  // re-cut must not strand live SSC rows (catalogCarry.ts says why).
  const catalogPath = join(__dirname, "catalog.json");
  const previous: Catalog = existsSync(catalogPath) ? JSON.parse(readFileSync(catalogPath, "utf8")) : {};
  const used = new Set<string>();
  const dir = join(__dirname, "transcripts");
  for (const f of readdirSync(dir).filter((x) => x.endsWith(".txt"))) {
    for (const q of parseTranscript(readFileSync(join(dir, f), "utf8"))) used.add(`${q.chapter}\u0000${q.subtopic}`);
  }
  const { catalog: kept, carried } = carryUsedNames(catalog, previous, used);
  for (const c of carried) console.log(`kept (a transcript still uses it): ${c}`);
  const sorted = Object.fromEntries(Object.keys(kept).sort().map((k) => [k, kept[k]]));
  writeFileSync(catalogPath, JSON.stringify(sorted, null, 2) + "\n", "utf8");
  for (const [s, cs] of Object.entries(sorted)) {
    console.log(`${s.padEnd(24)} ${String(cs.length).padStart(3)} chapters ${String(cs.reduce((n, c) => n + c.subtopics.length, 0)).padStart(4)} subtopics`);
  }
  console.log("\nwrote scripts/ssc-cgl/catalog.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
