/**
 * No browser bundle may carry the /notes content.
 *
 * WHY. `lib/notes/chapters.ts` imports every notes `_data` module — 1,884
 * files, the whole editorial corpus. Any `"use client"` module whose VALUE
 * imports reach it ships all of that to the visitor's phone. Found 2026-10-02:
 * `/formula/[slug]`'s FilteredQuestions → QuestionList → questionResources →
 * subtopicSlugRegistry → chapters.ts put 12.9 MB of JavaScript on every
 * /formula page. Nothing else caught it — the build succeeds, the page renders,
 * and the HTML is identical; only the bundle is wrong.
 *
 * Static and cheap: walks the real import graph (value imports only, since
 * `import type` is erased and never bundles) from every client module.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { collectImports } from "../scripts/lib/importGraph";

const REPO = path.resolve(__dirname, "..");

function readRepoFile(rel: string): string | null {
  try {
    const st = fs.statSync(path.join(REPO, rel));
    if (!st.isFile()) return null;
    return fs.readFileSync(path.join(REPO, rel), "utf8");
  } catch {
    return null;
  }
}

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(path.join(REPO, dir), { withFileTypes: true })) {
    const rel = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...sourceFiles(rel));
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(rel);
  }
  return out;
}

const isClientModule = (rel: string) => /^\s*["']use client["']/.test(readRepoFile(rel) ?? "");

/** The registry and the content modules it gathers. */
const isNotesContent = (rel: string) =>
  rel === "src/lib/notes/chapters.ts" || /^src\/app\/notes\/.+\/_data\//.test(rel);

describe("client bundles do not carry the /notes content", () => {
  const clientModules = sourceFiles("src").filter(isClientModule);

  it("finds the client modules at all (the scan is not vacuous)", () => {
    expect(clientModules.length).toBeGreaterThan(50);
  });

  it("no client module's value imports reach lib/notes/chapters.ts or a notes _data module", () => {
    const offenders: string[] = [];
    for (const entry of clientModules) {
      const reached = collectImports(entry, readRepoFile, { valueOnly: true });
      const hit = [...reached].find(isNotesContent);
      if (hit) offenders.push(`${entry} → … → ${hit}`);
    }
    expect(
      offenders,
      "These client components ship the whole notes corpus to the browser. Resolve what they need " +
        "on the server and pass it as props, or import a lean module that does not touch the registry.",
    ).toEqual([]);
  });
});
