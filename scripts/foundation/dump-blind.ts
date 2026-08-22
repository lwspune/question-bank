/**
 * Blind packet for Foundation Course questions that have no stored solution.
 *
 *   npx tsx scripts/foundation/dump-blind.ts <paperId> <label>
 *
 * Writes scripts/foundation/data/<label>.blind.json plus, for any question
 * carrying a figure, a PNG next to it in scripts/foundation/out/blind/<label>/.
 * An agent derives the answer from that packet alone and authors a student-facing
 * solution; apply-solutions.ts writes the result back.
 *
 * WHY BLIND. Foundation answers were themselves DERIVED at ingest — the LWS
 * worksheets ship no printed answer key — so a pass that can see the stored key
 * is not a second opinion, it is an agreement machine. The key is withheld here
 * and reconciled afterwards.
 *
 * ⚠ WITHHOLD THE KEY, NEVER THE TASK. `context` (the directions) and the figure
 * are BOTH included deliberately. scripts/cds/fix-keys.ts withheld the section
 * directions along with the key, and its blind pass answered the synonym question
 * on three antonym items — three wrong keys that students then sat. A question
 * stripped of its directions is not a harder question, it is a different one.
 *
 * The figure matters for the same reason: 4 of these 10 stems ("the given figure
 * shows a food web…") are unanswerable without it, and an agent that cannot see
 * it will confabulate rather than refuse.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { downloadImage } from "../../src/lib/storage/images";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Opt = { label: string; text: string; is_correct: boolean; image_url: string | null };

async function main() {
  const paperId = process.argv[2];
  const label = process.argv[3];
  if (!paperId || !label) throw new Error("usage: dump-blind.ts <paperId> <label>");

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: pq, error: pqErr } = await client
    .from("paper_questions")
    .select("question_id, section_key, position")
    .eq("paper_id", paperId)
    .order("section_key")
    .order("position");
  if (pqErr) throw new Error(`paper_questions: ${pqErr.message}`);
  const ids = (pq ?? []).map((r) => r.question_id as string);

  const rows: any[] = [];
  for (let i = 0; i < ids.length; i += 100) {
    const { data, error } = await client
      .from("questions")
      .select(
        "id, text, context, solution, image_url, question_number, " +
          "options(label, text, is_correct, image_url), " +
          "exams(name), subjects(name), chapters(name), subtopics(name)"
      )
      .in("id", ids.slice(i, i + 100));
    if (error) throw new Error(`questions: ${error.message}`);
    rows.push(...(data ?? []));
  }
  const byId = new Map(rows.map((r) => [r.id, r]));

  const outDir = join("scripts", "foundation", "out", "blind", label);
  mkdirSync(outDir, { recursive: true });

  const packet: any[] = [];
  for (let i = 0; i < ids.length; i++) {
    const q = byId.get(ids[i]);
    if (!q) continue;
    if (q.solution && String(q.solution).trim().length > 0) continue;

    const seq = i + 1;
    const opts = (q.options ?? []) as Opt[];
    let figure: string | null = null;
    if (q.image_url) {
      const bytes = await downloadImage(client, q.image_url as string);
      const file = join(outDir, `q${seq}.png`);
      writeFileSync(file, bytes);
      figure = file.replace(/\\/g, "/");
    }
    const optFigures: Record<string, string> = {};
    for (const o of opts) {
      if (!o.image_url) continue;
      const bytes = await downloadImage(client, o.image_url);
      const file = join(outDir, `q${seq}_opt${o.label}.png`);
      writeFileSync(file, bytes);
      optFigures[o.label] = file.replace(/\\/g, "/");
    }

    packet.push({
      ref: `q${seq}`,
      id: q.id,
      paperNumber: seq,
      exam: q.exams?.name ?? null,
      subject: q.subjects?.name ?? null,
      chapter: q.chapters?.name ?? null,
      subtopic: q.subtopics?.name ?? null,
      // Directions are part of the QUESTION — see the header.
      context: q.context ?? null,
      stem: q.text,
      figure,
      options: opts
        .slice()
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((o) => ({ label: o.label, text: o.text, figure: optFigures[o.label] ?? null })),
      // Deliberately absent: is_correct, and any existing answer.
      derivedAnswer: null,
      solution: null,
      confidence: null,
      notes: null,
    });
  }

  // Leak check BEFORE the write: a packet that carries the key is not a blind
  // packet, and once it is on disk an agent may already have read it.
  const serialized = JSON.stringify(packet, null, 2);
  if (serialized.includes("is_correct")) {
    throw new Error("packet leaked is_correct — refusing to write a non-blind dump");
  }

  const file = join("scripts", "foundation", "data", `${label}.blind.json`);
  mkdirSync(join("scripts", "foundation", "data"), { recursive: true });
  writeFileSync(file, serialized);
  console.log(`${packet.length} unsolved question(s) -> ${file}`);
  console.log(`figures -> ${outDir}`);
  for (const p of packet) {
    console.log(`  ${p.ref}  Q${p.paperNumber}  ${p.chapter}${p.figure ? "  [figure]" : ""}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
