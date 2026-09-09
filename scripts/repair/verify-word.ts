/**
 * End-to-end proof for the mock-solution repair: build the REAL Word answer key
 * for each paper through the shipped exporter and read back what Word will show.
 *
 * A database check proves the stored text is clean; only this proves the
 * RENDERED page is. It also runs every solution through the project's own KaTeX
 * so the web surface is covered by the same pass.
 */
import { config } from "dotenv";
import JSZip from "jszip";
import katex from "katex";
import { createClient } from "@supabase/supabase-js";
import { buildAnswerKey } from "../../src/lib/export/docxBuilder";
import { parseRichSegments } from "../../src/components/math/parseLatex";
import { queryQuestionsByIds } from "../../src/lib/questions/query";

config({ path: ".env.local", override: true });

const PAPERS = [
  "6c382204-ad3a-47b3-955e-c2ed5b4e24cc",
  "6e806412-360e-4cd3-8562-3cd9cf5d6af9",
  "b932be1d-6c81-40db-abe3-a956f0884b41",
];

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

/** Literal junk that must never reach a rendered page. */
const JUNK: [string, RegExp][] = [
  ["bare LaTeX command", /\\[a-zA-Z]{2,}/],
  ["stray double backslash", /\\\\/],
  ["answer-key prefix", /^\s*(?:Ans|Sol|Solution)[\s.\-]*\([a-dA-D]\)/m],
  ["markdown bold marker", /\*\*/],
  ["carriage return", /\r/],
  ["local filesystem path", /[A-Za-z]:\\\\?Users/],
];

async function main() {
  let katexFailures = 0;
  let checked = 0;

  for (const pid of PAPERS) {
    const { data: paper } = await db.from("papers").select("title").eq("id", pid).single();
    const { data: links } = await db
      .from("paper_questions").select("question_id,position").eq("paper_id", pid).order("position");
    const ids = (links ?? []).map((l) => l.question_id as string);
    const rows = await queryQuestionsByIds(db as never, ids);

    // --- web surface: every solution through the project's own KaTeX ---
    for (const q of rows) {
      if (!q.solution) continue;
      checked++;
      for (const seg of parseRichSegments(q.solution)) {
        if (seg.type === "text") continue;
        try {
          katex.renderToString(seg.content, { displayMode: seg.type === "block", throwOnError: true });
        } catch (e) {
          katexFailures++;
          console.log(`  KaTeX FAIL ${q.id}: ${(e as Error).message.slice(0, 120)}`);
        }
      }
    }

    // --- Word surface: the shipped exporter, read back from the .docx ---
    const buf = await buildAnswerKey({ title: paper!.title as string, questions: rows, includeSolutions: true });
    const xml = await (await JSZip.loadAsync(buf)).file("word/document.xml")!.async("string");
    // Only <w:t> runs are literal text; OMML lives in <m:oMath> and is fine.
    const literal = [...xml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)].map((m) => m[1]).join("\n");

    console.log(`\n${paper!.title} — ${rows.length} questions, ${literal.length} chars of literal text`);
    for (const [name, re] of JUNK) {
      const hits = [...literal.matchAll(new RegExp(re.source, "gm"))];
      console.log(`  ${hits.length === 0 ? "OK  " : "HIT "} ${name.padEnd(24)} ${hits.length}${hits.length ? "  e.g. " + JSON.stringify(hits[0][0]) : ""}`);
    }
  }

  console.log(`\nKaTeX: ${checked} solutions parsed, ${katexFailures} failing zone(s).`);
  if (katexFailures > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
