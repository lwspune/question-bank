/**
 * Dump the match-list rows that do not parse as a table, for repair.
 *
 *   npx tsx scripts/dump-matchlists.ts NDA > out.json
 *
 * Detection is identical to scripts/audit-matchlists.ts (the REAL
 * parseTableBlocks, never a LIKE probe) so the two cannot disagree about what
 * is broken.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { parseTableBlocks } from "../src/components/math/parseTableBlocks";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Row = {
  id: string;
  question_number: string | null;
  visibility: string;
  question_kind: string;
  source_file: string | null;
  text: string;
  context: string | null;
  chapters: { name: string; subjects: { name: string; exams: { name: string } } } | null;
};

const isMatchList = (b: string) => /list\s*-?\s*i\b/i.test(b) && /list\s*-?\s*ii\b/i.test(b);
const hasTable = (s: string | null) =>
  !!s && parseTableBlocks(s).some((b) => (b as { kind?: string }).kind === "table");

async function main() {
  const filter = (process.argv[2] ?? "NDA").toLowerCase();
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const rows: Row[] = [];
  const PAGE = 200;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("questions")
      .select(
        "id, question_number, visibility, question_kind, source_file, text, context, chapters(name, subjects(name, exams(name)))"
      )
      .or("text.ilike.%List I%,context.ilike.%List I%,text.ilike.%List-I%,context.ilike.%List-I%")
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    rows.push(...((data ?? []) as unknown as Row[]));
    if (!data || data.length < PAGE) break;
  }

  const out = rows
    .filter((r) => (r.chapters?.subjects?.exams?.name ?? "").toLowerCase().includes(filter))
    .filter((r) => r.visibility === "PUBLIC")
    .filter((r) => isMatchList(`${r.context ?? ""}\n${r.text}`))
    .filter((r) => !hasTable(r.text) && !hasTable(r.context))
    .map((r) => ({
      id: r.id,
      q: r.question_number,
      kind: r.question_kind,
      source_file: r.source_file,
      chapter: r.chapters?.name ?? null,
      subject: r.chapters?.subjects?.name ?? null,
      text: r.text,
      context: r.context,
    }));

  console.log(JSON.stringify(out, null, 1));
}

main().catch((e) => { console.error(e); process.exit(1); });
