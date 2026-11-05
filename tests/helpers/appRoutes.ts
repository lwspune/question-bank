/**
 * Does a URL path have a page in src/app? For tests that guard links.
 *
 * Resolves like the App Router: at each segment try the exact folder, then a single `[param]`
 * folder, and keep a branch only if it ends in a page.tsx. Backtracking matters since
 * TECH_DEBT_SPEC.md 2.2: a /notes chapter folder now holds only its `_data`, so the exact folder
 * leads nowhere and the subject's `[chapterSlug]` route serves the URL. A dynamic folder alone
 * would accept any slug, so a /notes/<subject>/<chapter>[/<subtopic>] path that resolves through
 * `[chapterSlug]` must also name a registered chapter (and one of its subtopics).
 */
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { getNotesChapterBySlug } from "@/lib/notes/chapters";

const APP = join(process.cwd(), "src", "app");

function candidates(dir: string, segment: string): { dir: string; dynamic: string | null }[] {
  const out: { dir: string; dynamic: string | null }[] = [];
  const exact = join(dir, segment);
  if (existsSync(exact) && statSync(exact).isDirectory()) out.push({ dir: exact, dynamic: null });
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory() && /^\[[^.\]][^\]]*\]$/.test(e.name)) out.push({ dir: join(dir, e.name), dynamic: e.name });
  }
  return out;
}

function resolve(dir: string, rest: string[], dynamics: (string | null)[]): (string | null)[] | null {
  if (rest.length === 0) return existsSync(join(dir, "page.tsx")) ? dynamics : null;
  for (const c of candidates(dir, rest[0])) {
    const r = resolve(c.dir, rest.slice(1), [...dynamics, c.dynamic]);
    if (r) return r;
  }
  return null;
}

export function appPageExists(urlPath: string): boolean {
  const segments = urlPath.split("?")[0].split("#")[0].split("/").filter(Boolean);
  const dynamics = resolve(APP, segments, []);
  if (!dynamics) return false;
  if (segments[0] === "notes" && dynamics[2] === "[chapterSlug]") {
    const chapter = getNotesChapterBySlug(segments[1], segments[2]);
    if (!chapter) return false;
    if (segments.length === 4) return chapter.slugs.includes(segments[3]);
    return segments.length === 3;
  }
  return true;
}
