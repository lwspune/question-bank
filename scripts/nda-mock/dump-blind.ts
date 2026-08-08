/**
 * Write a BLIND question packet for the derivation + classification agents.
 *
 *   npx tsx scripts/nda-mock/dump-blind.ts m1 [chunkSize]
 *
 * The packet carries the stem, the shared context and the four options — and
 * deliberately NOT the answer key or the worked solution. An agent that can see
 * the key rationalises towards it instead of solving, which is exactly the
 * failure this pass exists to catch (the source's own key is wrong often enough
 * to matter: Mock 1 Q64 alone is a printed-key error the author's errata sheet
 * caught, and Q96's key contradicts its own printed solution).
 *
 * Also emits the live NDA Mathematics taxonomy so classification targets an
 * existing chapter/subtopic instead of inventing one.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { requirePaper, DATA, OUT, EXAM_ID, SUBJECT_NAME } from "./config";
import type { ExtractedQuestion } from "./extract";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function taxonomyHandout(): Promise<string> {
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: subject } = await client
    .from("subjects")
    .select("id")
    .eq("exam_id", EXAM_ID)
    .eq("name", SUBJECT_NAME)
    .single();
  const { data: chapters } = await client
    .from("chapters")
    .select("id,name,subtopics(name)")
    .eq("subject_id", subject!.id)
    .order("name");

  const lines = ["# Live NDA / Mathematics taxonomy", ""];
  for (const c of chapters ?? []) {
    lines.push(`## ${c.name}`);
    for (const s of ((c.subtopics ?? []) as { name: string }[]).sort((a, b) =>
      a.name.localeCompare(b.name),
    )) {
      lines.push(`  - ${s.name}`);
    }
  }
  return lines.join("\n") + "\n";
}

async function main() {
  const id = process.argv[2];
  const chunk = Number(process.argv[3] ?? 20);
  const paper = requirePaper(id);
  loadEnv();

  const qs: ExtractedQuestion[] = JSON.parse(readFileSync(join(DATA, `${paper.id}.extract.json`), "utf8"));
  const dir = join(OUT, paper.id, "blind");
  mkdirSync(dir, { recursive: true });

  writeFileSync(join(OUT, paper.id, "taxonomy.md"), await taxonomyHandout(), "utf8");

  const parts: string[] = [];
  for (let start = 0; start < qs.length; start += chunk) {
    const slice = qs.slice(start, start + chunk);
    const from = slice[0].number;
    const to = slice[slice.length - 1].number;
    const out: string[] = [
      `# ${paper.label} — questions ${from}-${to} (BLIND)`,
      "",
      "The answer key and worked solution are deliberately withheld. Derive each",
      "answer yourself and report the option LETTER plus one line of working.",
      "",
    ];
    let lastSet: string | undefined;
    for (const q of slice) {
      if (q.context && q.setLabel !== lastSet) {
        out.push(`### Shared context for the following questions`, "", q.context, "");
        lastSet = q.setLabel;
      }
      if (!q.context) lastSet = undefined;
      out.push(`**Q${q.number}.** ${q.stem}`, "");
      for (const o of q.options) out.push(`  (${o.label}) ${o.text}`);
      out.push("");
    }
    const f = join(dir, `q${String(from).padStart(3, "0")}-${String(to).padStart(3, "0")}.md`);
    writeFileSync(f, out.join("\n"), "utf8");
    parts.push(f);
  }

  console.log(`wrote ${parts.length} blind packets to ${dir}`);
  for (const p of parts) console.log("  " + p);
  console.log(`taxonomy handout: ${join(OUT, paper.id, "taxonomy.md")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
