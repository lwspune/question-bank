import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import BoardRevisionSheet from "@/app/board/_components/BoardRevisionSheet";
import { REVISION_SHEET_KEYS, loadRevisionSheet } from "@/lib/board/revision/registry";
import { MobilePromptProvider } from "@/lib/profile/MobilePromptProvider";
import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * Every revision sheet, drawn by the /board Revision tab's own component
 * (2026-11-09).
 *
 * The sheets write chemistry as `\ce{...}` (KaTeX's mhchem add-on). The sheet
 * checker (lib/board/revision/lint.ts) and the PDF printer load mhchem, the web
 * page did not: all 726 `\ce` zones in 44 sheets showed "KaTeX parse error" on
 * the page for six days while the checker passed them. The checker tested a
 * different KaTeX setup from the page's, so this test draws the PAGE, and must
 * not import the checker (it would load mhchem for the whole test file).
 */
// The download button reads the mobile-prompt context, as it does under the app layout.
const draw = (sheet: RevisionSheet) =>
  renderToStaticMarkup(createElement(MobilePromptProvider, null, createElement(BoardRevisionSheet, { sheet })));
const MATH_ERROR = /KaTeX parse error|class="text-destructive/;

describe("board revision sheets render on the page", () => {
  it("finds the sheets", () => {
    expect(REVISION_SHEET_KEYS.length).toBeGreaterThan(100);
  });

  for (const key of REVISION_SHEET_KEYS) {
    it(key, async () => {
      const [examSlug, subjectRoute, chapterSlug] = key.split("/");
      const sheet = await loadRevisionSheet({ examSlug, subjectRoute, chapterSlug });
      expect(sheet).not.toBeNull();
      const out = draw(sheet!);
      const hit = out.match(new RegExp(`.{0,120}(${MATH_ERROR.source}).{0,160}`));
      expect(hit?.[0] ?? null).toBeNull();
    });
  }

  it("a chemistry sheet's \\ce maths is drawn, with MathML kept for screen readers", async () => {
    const sheet = await loadRevisionSheet({ examSlug: "mh-hsc-12", subjectRoute: "chemistry", chapterSlug: "solid-state" });
    const out = draw(sheet!);
    expect(out).toContain("NaNO");
    expect(out).toContain("<math");
  });

  it("draws its maths on the server, not with a client renderer", () => {
    const src = readFileSync(join(process.cwd(), "src/app/board/_components/BoardRevisionSheet.tsx"), "utf8");
    expect(src).not.toMatch(/from\s+["']@\/components\/math\/(KatexRenderer|RichText|BlockText)["']/);
  });
});
