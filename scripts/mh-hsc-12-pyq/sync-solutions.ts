/**
 * Push a chapter's committed SOLUTIONS to the live rows.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/sync-solutions.ts <chapterId>          # dry run
 *   npx tsx scripts/mh-hsc-12-pyq/sync-solutions.ts <chapterId> --apply
 *
 * For a chapter that is ALREADY COMMITTED, `commit.ts` skips every row on a
 * re-run (the hash is unchanged), so a later edit to the SOLUTION never reaches
 * the database — the source and the live row silently diverge. That is how an
 * errata bracket added after a chapter shipped ends up in `data/` and nowhere a
 * student can see it.
 *
 * SAFE AS AN IN-PLACE UPDATE, and that is the whole reason this can exist:
 * `content_hash` covers stem + options + answer and EXCLUDES `solution`, so the
 * row's identity does not move. A STEM or OPTION repair is the opposite case and
 * needs `resync-stems.ts` (delete + re-commit).
 *
 * Matches live rows by content_hash — computed with the project's own helpers, so
 * it cannot disagree with what `commitStaged` wrote — and refuses on anything it
 * cannot pair 1:1.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, CHAPTERS, DATA, requireChapter } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const id = process.argv[2];
  if (!id) throw new Error("usage: sync-solutions.ts <chapterId> [--apply]");
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);

  const c = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const rows = JSON.parse(readFileSync(join(DATA, `${id}.questions.json`), "utf8")) as {
    ref: string; stem: string; questionNumber: string; solution?: string; answer?: string;
    options?: { label: string; text: string }[];
  }[];

  const { contentHash, subjectiveContentHash } = await import("../../src/lib/upload/hash");
  const hashOf = (r: (typeof rows)[number]) =>
    r.options?.length
      ? contentHash(r.stem, r.options.map((o) => o.text), r.answer ?? "")
      : subjectiveContentHash(r.stem, null);

  const { data: live, error } = await c
    .from("questions")
    .select("id,content_hash,solution,question_number")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", CHAPTERS[id].sourceFile);
  if (error) throw error;
  const byHash = new Map((live ?? []).map((r) => [String(r.content_hash), r]));

  // TWO refs can share one live row: the board re-asks a question verbatim in a
  // later sitting and `content_hash` collapses the pair. If their solutions
  // DISAGREE, whichever appears later in the file would silently win — an
  // adjudication decided by array order. Refuse and make it a human call.
  const bySourceHash = new Map<string, typeof rows>();
  for (const r of rows) bySourceHash.set(hashOf(r), [...(bySourceHash.get(hashOf(r)) ?? []), r]);

  const planned: { id: string; ref: string; from: string; to: string }[] = [];
  const problems: string[] = [];
  for (const [hash, group] of bySourceHash) {
    const distinct = new Set(group.map((r) => r.solution ?? ""));
    if (distinct.size > 1) {
      problems.push(
        `${group.map((r) => r.ref).join(" / ")}: these share one live row (the board set the ` +
          `question twice) and their solutions DIFFER — pick one deliberately rather than ` +
          `letting file order decide`,
      );
      continue;
    }
    const r = group[0];
    if (!r.solution) continue;
    const hit = byHash.get(hash);
    if (!hit) {
      // Not necessarily missing. `content_hash` is unique per EXAM, and this
      // corpus adds board PYQs to chapters that already hold the Balbharati
      // textbook exercises — so where a board question is a verbatim reprint of
      // a textbook one it is ABSORBED into that row and never gets a pyq row of
      // its own. That is a coverage fact, not a failure, and it must be reported
      // as such rather than as a bare "no live row".
      const { data: elsewhere } = await c
        .from("questions")
        .select("id,question_kind,visibility,source_file,chapters(name)")
        .eq("exam_id", EXAM_ID)
        .eq("content_hash", hash)
        .maybeSingle();
      if (elsewhere) {
        const chapter = Array.isArray(elsewhere.chapters)
          ? (elsewhere.chapters[0] as { name: string } | undefined)?.name
          : (elsewhere.chapters as { name: string } | undefined)?.name;
        console.log(
          `  ABSORBED ${r.ref}: no pyq row — the identical question already exists as a ` +
            `${elsewhere.question_kind} row (${elsewhere.visibility}) in "${chapter}" ` +
            `[${elsewhere.source_file}]. Its solution belongs to that row and is left alone.`,
        );
        continue;
      }
      problems.push(`${r.ref}: no live row with a matching content_hash, and none anywhere in the exam`);
      continue;
    }
    if (String(hit.solution ?? "") === r.solution) continue;
    planned.push({ id: hit.id as string, ref: r.ref, from: String(hit.solution ?? ""), to: r.solution });
  }
  if (problems.length) throw new Error(`REFUSING (${problems.length}):\n  ${problems.join("\n  ")}`);

  console.log(`${ch.chapterName}: ${rows.length} committed | ${live?.length ?? 0} live`);
  if (!planned.length) { console.log("solutions already in sync — nothing to do."); return; }
  for (const p of planned) {
    console.log(`\n  ${p.ref}  ${p.id}`);
    console.log(`    live  : ${p.from.length} chars`);
    console.log(`    source: ${p.to.length} chars  (+${p.to.length - p.from.length})`);
  }
  if (!apply) { console.log(`\n[dry-run] ${planned.length} solution(s) would be updated.`); return; }
  for (const p of planned) {
    const { error: e } = await c.from("questions").update({ solution: p.to }).eq("id", p.id);
    if (e) throw e;
  }
  console.log(`\nupdated ${planned.length} solution(s).`);
}

main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
