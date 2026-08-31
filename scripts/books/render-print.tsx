/**
 * Render a chapter's PRINT view to a standalone HTML file.
 *
 *   npx tsx scripts/books/render-print.tsx --chapter=vocabulary
 *   npx tsx scripts/books/render-print.tsx            # every chapter
 *
 * WHY THIS EXISTS: /books/<book>/<chapter>/print is superadmin-gated and
 * `force-dynamic`, so `next build` never executes it and nothing headless
 * proves it RENDERS — only that it compiles. This drives the real component
 * with the real loaded view, so a render-time throw surfaces here with a stack
 * instead of as a 500 in a browser.
 *
 * The output opens directly in a browser (Ctrl+P included), which also makes it
 * the fastest way to eyeball a layout change without a dev server or a login.
 * It is NOT a substitute for checking the real route: this bypasses auth, the
 * App Router and Next's own font/CSS pipeline.
 *
 * Read-only. SERVICE-ROLE, because the book tables are RLS-locked.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
// Explicit: tsx compiles JSX with the CLASSIC runtime, which needs React in
// scope. Next uses the automatic runtime, so app code never imports it.
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createClient } from "@supabase/supabase-js";
import { NDA_CDS_ENGLISH } from "../../src/lib/books/registry";
import { loadBookChapter } from "../../src/lib/books/query";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/**
 * `KatexRenderer` imports `katex/dist/katex.min.css`. Next compiles that; plain
 * Node parses it as JavaScript and dies on the first `@font-face`. Stubbing the
 * extension is what lets the REAL component tree load here — and it must happen
 * before the component is required, hence the dynamic import in `main`.
 *
 * The cost is honest and worth stating: the output carries no KaTeX stylesheet,
 * so math renders unstyled. Layout of the page's own furniture — the contents
 * table, columns, headings — is unaffected, which is what this is for.
 */
require.extensions[".css"] = () => {};

function arg(name: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
}

async function main() {
  // Imported here, AFTER the .css stub above is installed.
  const { default: BookChapterPrint } = await import(
    "../../src/app/books/_print/BookChapterPrint"
  );

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const book = NDA_CDS_ENGLISH;
  const only = arg("chapter");
  const chapters = only ? book.chapters.filter((c) => c.slug === only) : book.chapters;
  if (only && chapters.length === 0) {
    throw new Error(`no chapter with slug "${only}" in ${book.title}`);
  }

  const outDir = join(process.cwd(), "generated-papers");
  mkdirSync(outDir, { recursive: true });

  for (const chapter of chapters) {
    const view = await loadBookChapter(client, book, chapter);
    // The throw we are hunting happens HERE, not at import time.
    const body = renderToStaticMarkup(<BookChapterPrint view={view} />);
    const file = join(outDir, `book-${book.slug}-${chapter.slug}-print.html`);
    writeFileSync(
      file,
      `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
        `<title>${chapter.name} — ${book.title}</title></head><body>${body}</body></html>`,
      "utf8"
    );
    console.log(`  ${chapter.name.padEnd(24)} ${view.total.toString().padStart(4)} q  ->  ${file}`);
  }

  console.log(`\nOK — ${chapters.length} chapter(s) rendered without throwing.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
