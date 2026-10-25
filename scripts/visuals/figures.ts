/**
 * Questions in one chapter that point at a picture they do not carry.
 *
 *   npm run visuals:figures -- --exam="JEE Mains" --chapter="Application of Derivatives"
 *
 * The visuals lane reads every question of a chapter, so it is the cheapest
 * moment to catch a missing figure (owner, 2026-10-25: resolve it, not just flag
 * it). Same rules as audit:figures (scripts/lib/figureRefs), scoped to a chapter
 * instead of an exam or file. A hit is a question for a person, never a verdict:
 * many stems cite a figure whose numbers they already spell out. Read-only.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { describesFigureInText, optionsStandInForFigure, referencesFigure } from "../lib/figureRefs";

const arg = (name: string) => process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const exam = arg("exam");
  const chapter = arg("chapter");
  if (!exam || !chapter) throw new Error('usage: visuals:figures -- --exam="..." --chapter="..."');
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  type Row = {
    id: string;
    question_number: string | null;
    pyq_year: number | null;
    text: string;
    context: string | null;
    image_url: string | null;
    options: { text: string | null; image_url: string | null }[] | null;
  };
  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("id, question_number, pyq_year, text, context, image_url, options(text, image_url), exams!inner(name), chapters!inner(name)")
      .eq("visibility", "PUBLIC")
      .eq("exams.name", exam)
      .eq("chapters.name", chapter)
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    rows.push(...(data as unknown as Row[]));
    if (data.length < 1000) break;
  }

  const hits: string[] = [];
  for (const r of rows) {
    const why: string[] = [];
    if (!r.image_url && referencesFigure(r.text, r.context)) why.push(describesFigureInText(r.text, r.context) ? "stem cites a figure (numbers in text)" : "stem cites a figure");
    const opt = optionsStandInForFigure(r.text, r.options);
    if (opt) why.push(`options are pictures (${opt})`);
    if (why.length) hits.push(`${r.id}  ${r.pyq_year ?? ""} ${r.question_number ?? ""}  [${why.join("; ")}]\n    ${r.text.replace(/\s+/g, " ").slice(0, 160)}`);
  }
  console.log(`${exam} / ${chapter}: ${rows.length} PUBLIC, ${rows.filter((r) => r.image_url).length} with a stem picture, ${hits.length} pointing at one they lack`);
  for (const h of hits) console.log(h);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
