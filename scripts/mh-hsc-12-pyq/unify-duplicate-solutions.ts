/**
 * Where two refs collapse to ONE live row, make both source entries carry the
 * SAME solution — the one already live.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/unify-duplicate-solutions.ts <chapterId> [--apply]
 *
 * The board re-asks a question verbatim in a later sitting and `content_hash`
 * keeps one row for both. Each ref was authored independently, so the two
 * solutions are usually near-identical but not equal — and then any tool walking
 * the source has to choose between them, which `sync-solutions.ts` rightly
 * refuses to do by array order.
 *
 * Resolves toward the LIVE text, deliberately: it is the copy already published,
 * so this can never move what a student sees, and nothing is invented. Where the
 * live text is not one of the two authored copies it REFUSES, because that means
 * something else edited the row and the divergence needs reading, not flattening.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, CHAPTERS, DATA, requireChapter } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const id = process.argv[2];
  if (!id) throw new Error("usage: unify-duplicate-solutions.ts <chapterId> [--apply]");
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);

  const c = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const qs = JSON.parse(readFileSync(join(DATA, `${id}.questions.json`), "utf8")) as {
    ref: string; stem: string; answer?: string; options?: { label: string; text: string }[];
  }[];
  const sols = JSON.parse(readFileSync(join(DATA, `${id}.solutions.json`), "utf8")) as {
    ref: string; answer: string;
  }[];

  const { contentHash, subjectiveContentHash } = await import("../../src/lib/upload/hash");
  const hashOf = (r: (typeof qs)[number]) =>
    r.options?.length
      ? contentHash(r.stem, r.options.map((o) => o.text), r.answer ?? "")
      : subjectiveContentHash(r.stem, null);

  const groups = new Map<string, typeof qs>();
  for (const r of qs) groups.set(hashOf(r), [...(groups.get(hashOf(r)) ?? []), r]);
  const dupes = [...groups.entries()].filter(([, g]) => g.length > 1);
  if (!dupes.length) { console.log(`${ch.chapterName}: no collapsed duplicates.`); return; }

  const { data: live, error } = await c
    .from("questions")
    .select("id,content_hash,solution")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", CHAPTERS[id].sourceFile);
  if (error) throw error;
  const byHash = new Map((live ?? []).map((r) => [String(r.content_hash), r]));

  let changed = 0;
  for (const [hash, group] of dupes) {
    const hit = byHash.get(hash);
    if (!hit) throw new Error(`${group.map((r) => r.ref).join(" / ")}: no live row — commit first`);
    const liveText = String(hit.solution ?? "");
    const entries = group.map((r) => sols.find((s) => s.ref === r.ref)!).filter(Boolean);
    if (!entries.some((e) => e.answer === liveText)) {
      throw new Error(
        `${group.map((r) => r.ref).join(" / ")}: the LIVE solution matches neither authored ` +
          `copy — something else edited this row; read it rather than flattening it`,
      );
    }
    console.log(`\n${group.map((r) => r.ref).join(" / ")}  ->  ${hit.id}`);
    for (const e of entries) {
      const same = e.answer === liveText;
      console.log(`  ${e.ref}: ${e.answer.length} chars ${same ? "(already the live text)" : "-> live text"}`);
      if (!same) { e.answer = liveText; changed += 1; }
    }
  }

  if (!changed) { console.log("\nalready unified — nothing to do."); return; }
  if (!apply) { console.log(`\n[dry-run] ${changed} source entr(y/ies) would be aligned to the live text.`); return; }
  writeFileSync(join(DATA, `${id}.solutions.json`), JSON.stringify(sols, null, 2) + "\n");
  console.log(`\naligned ${changed} source entr(y/ies). NOW RUN: merge.ts ${id}`);
}

main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
