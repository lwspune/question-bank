/**
 * Draft check for IMAT notes figures: render each component file to static
 * markup (what the notes ebooks and a page before it loads show) and apply the
 * IMAT word rules (src/lib/notes/visualText.ts). Runs without the test
 * database, so a drafter can check a figure in seconds; the real gate is
 * tests/imat-notes-visuals.test.ts.
 *
 *   npx tsx scripts/imat/check-visuals.ts src/app/notes/_components/visualizations/ImatX.tsx [...]
 *
 * `--allow-dashes` checks a figure BORROWED from another exam's notes: its
 * existing dashes are that page's, so only the IMAT-specific rules apply.
 * Exits 1 if any file fails to render or breaks a rule.
 */
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { visibleText, visualTextProblems } from "../../src/lib/notes/visualText";

async function main() {
  const args = process.argv.slice(2);
  const allowDashes = args.includes("--allow-dashes");
  const files = args.filter((a) => !a.startsWith("--"));
  if (files.length === 0) {
    console.error("usage: npx tsx scripts/imat/check-visuals.ts <component.tsx> [...]");
    process.exit(2);
  }
  let failed = 0;
  for (const f of files) {
    const name = path.basename(f);
    try {
      const mod = (await import(pathToFileURL(path.resolve(f)).href)) as { default?: ComponentType };
      if (!mod.default) throw new Error("no default export");
      const markup = renderToStaticMarkup(createElement(mod.default));
      const problems = visualTextProblems(markup, { noDashes: !allowDashes });
      const steps = (markup.match(/<li[\s>]/g) ?? []).length;
      const words = visibleText(markup).split(" ").length;
      if (problems.length) {
        failed++;
        console.log(`FAIL ${name}: ${problems.join("; ")}`);
      } else {
        console.log(`ok   ${name} (${markup.length} chars, ${words} words${markup.includes("data-step-list") ? `, ${steps} steps` : ""})`);
      }
    } catch (e) {
      failed++;
      console.log(`FAIL ${name}: ${(e as Error).message.split("\n")[0]}`);
    }
  }
  process.exit(failed ? 1 : 0);
}

void main();
