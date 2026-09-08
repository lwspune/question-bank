/**
 * Render a vocab chapter's PRINT view to a standalone HTML file.
 *
 *   npx tsx --tsconfig scripts/vocab/tsconfig.render.json scripts/vocab/render-print.tsx --chapter=exam-a-c
 *
 * THE --tsconfig FLAG IS NOT OPTIONAL. The root config sets jsx=preserve, which
 * Next compiles itself; a plain `npx tsx` run falls back to the CLASSIC JSX
 * runtime and every app component dies with "React is not defined".
 *
 * WHY THIS EXISTS: the /books routes are superadmin-gated and force-dynamic, so
 * `next build` never executes them and nothing headless proves they RENDER —
 * only that they compile. This drives the real component with the real loaded
 * view, so a render-time throw surfaces here with a stack instead of as a 500.
 *
 * Read-only. SERVICE-ROLE, because vocab_entries is RLS-locked.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createClient } from "@supabase/supabase-js";
import { loadVocabChapter } from "../../src/lib/vocab/query";
import { CADET_VOCAB } from "../../src/lib/vocab/registry";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
require.extensions[".css"] = () => {};

const arg = (n: string) => process.argv.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3);

async function main() {
  const { default: VocabChapterPrint } = await import(
    "../../src/app/books/vocab/_print/VocabChapterPrint"
  );

  const chapterSlug = arg("chapter") ?? CADET_VOCAB.chapters[0].slug;
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const view = await loadVocabChapter(client, CADET_VOCAB.slug, chapterSlug);
  if (!view) throw new Error(`no such chapter: ${chapterSlug}`);

  const body = renderToStaticMarkup(React.createElement(VocabChapterPrint, { view }));
  const html =
    `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
    `<title>${view.book.title} — ${view.chapter.label}</title>` +
    `<style>body{margin:0;background:#f4f4f5}</style></head><body>${body}</body></html>`;

  const out = join(process.cwd(), "generated-papers");
  mkdirSync(out, { recursive: true });
  const file = join(out, `vocab-${chapterSlug}.html`);
  writeFileSync(file, html);
  console.log(`${view.entries.length} entries (${view.printed} printed)`);
  console.log(`wrote ${file}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
