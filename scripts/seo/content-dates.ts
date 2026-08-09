/**
 * Generate real per-chapter content dates for the sitemap's <lastmod>.
 *
 * `/notes` and `/guide` pages are CODE, not DB rows — their content lives in
 * `_data` TypeScript modules. So the honest "when did this page last change" is
 * the git commit date of that chapter's `_data` directory, which is exactly what
 * this script captures.
 *
 *   npm run seo:dates          # rewrite src/lib/seo/contentDates.generated.ts
 *   npm run seo:dates -- --check   # exit 1 if the file is out of date (CI-safe)
 *
 * WHY GENERATED-AND-COMMITTED rather than computed at build time: Vercel builds
 * from a shallow clone, so `git log` there can collapse every path to the single
 * available commit — which would silently regress every date back to "build
 * time", the exact defect this replaces. Committing the manifest makes the dates
 * deterministic, reviewable in the diff, and independent of the build host.
 *
 * STALENESS IS SAFE BY CONSTRUCTION. Forgetting to re-run this yields dates that
 * are OLDER than reality. Under-claiming a change costs a slower recrawl of one
 * page; over-claiming (the old behaviour) teaches Google to ignore the signal for
 * the whole site. Re-run it whenever a notes chapter or guide ships.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const REPO_ROOT = join(__dirname, "..", "..");
const OUT_PATH = join(REPO_ROOT, "src", "lib", "seo", "contentDates.generated.ts");

/** Last commit date touching `relPath`, ISO-8601, or null if git knows nothing. */
function lastCommitDate(relPath: string): string | null {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", relPath],
      { cwd: REPO_ROOT, encoding: "utf8" }
    ).trim();
    return out || null;
  } catch {
    return null;
  }
}

function dirsIn(relPath: string): string[] {
  const abs = join(REPO_ROOT, relPath);
  if (!existsSync(abs)) return [];
  return readdirSync(abs, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("_") && !e.name.startsWith("["))
    .map((e) => e.name);
}

/**
 * Collect route → date for every notes chapter and guide subject.
 *
 * A chapter's date comes from its `_data` directory rather than the whole
 * chapter folder, because `page.tsx` wrappers get touched by unrelated
 * refactors while `_data` changes only when the TEACHING CONTENT changes —
 * which is what a reader (and a crawler) actually cares about.
 */
function collect(): Record<string, string> {
  const dates: Record<string, string> = {};

  // /notes/<subjectRoute>/<chapterSlug>
  for (const subjectRoute of dirsIn("src/app/notes")) {
    for (const chapterSlug of dirsIn(`src/app/notes/${subjectRoute}`)) {
      const dataDir = `src/app/notes/${subjectRoute}/${chapterSlug}/_data`;
      if (!existsSync(join(REPO_ROOT, dataDir))) continue;
      const iso = lastCommitDate(dataDir);
      if (iso) dates[`/notes/${subjectRoute}/${chapterSlug}`] = iso;
    }
  }

  // /guide/<subjectRoute>
  for (const subjectRoute of dirsIn("src/app/guide")) {
    const dataDir = `src/app/guide/${subjectRoute}/_data`;
    if (!existsSync(join(REPO_ROOT, dataDir))) continue;
    const iso = lastCommitDate(dataDir);
    if (iso) dates[`/guide/${subjectRoute}`] = iso;
  }

  return dates;
}

function render(dates: Record<string, string>): string {
  const entries = Object.keys(dates)
    .sort()
    .map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(dates[k])},`)
    .join("\n");

  return `/**
 * GENERATED FILE — do not edit by hand. Run \`npm run seo:dates\`.
 *
 * Route → git commit date of that page's \`_data\` directory, used as the
 * sitemap's <lastmod>. See scripts/seo/content-dates.ts for why this is
 * committed rather than computed at build time, and src/lib/seo/lastmod.ts for
 * how a route with no entry here inherits from its nearest recorded ancestor.
 *
 * Entries: ${Object.keys(dates).length}
 */
import type { ContentDateMap } from "@/lib/seo/lastmod";

export const CONTENT_DATES: ContentDateMap = {
${entries}
};
`;
}

function main() {
  const check = process.argv.includes("--check");
  const next = render(collect());

  if (check) {
    const current = existsSync(OUT_PATH) ? readFileSync(OUT_PATH, "utf8") : "";
    if (current !== next) {
      console.error(
        "content dates are stale — run `npm run seo:dates` and commit the result"
      );
      process.exit(1);
    }
    console.log("content dates up to date");
    return;
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, next, "utf8");
  const count = Object.keys(collect()).length;
  console.log(`wrote ${count} content dates -> ${OUT_PATH}`);
}

main();
