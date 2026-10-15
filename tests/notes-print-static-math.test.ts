import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The notes print handout draws its math on the server only (2026-10-16).
 *
 * Its equations used to be client components, which a phone draws again after
 * the server already has: on a budget Android phone the 1,493-equation MHT-CET
 * Indefinite Integration handout froze for 52 s, and a student who tapped
 * "Download as PDF" seven times never got it. The static renderers ship
 * finished markup. This fails if a print component goes back to a client one.
 */
const PRINT_DIR = join(process.cwd(), "src/app/notes/_components/print");
const CLIENT_MATH = /from\s+["']@\/components\/math\/(KatexRenderer|RichText|BlockText)["']/;

describe("notes print handout math", () => {
  const files = readdirSync(PRINT_DIR).filter((f) => f.endsWith(".tsx"));

  it("finds the print components", () => {
    expect(files).toContain("NotesChapterPrint.tsx");
  });

  for (const f of files) {
    it(`${f} does not import a client math renderer`, () => {
      expect(readFileSync(join(PRINT_DIR, f), "utf8")).not.toMatch(CLIENT_MATH);
    });
  }

  it("the chapter handout uses the static renderers", () => {
    const src = readFileSync(join(PRINT_DIR, "NotesChapterPrint.tsx"), "utf8");
    expect(src).toMatch(/from\s+["']@\/components\/math\/StaticMath["']/);
  });
});
