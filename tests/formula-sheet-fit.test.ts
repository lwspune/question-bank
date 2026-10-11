/**
 * The formula sheet's fit step (2026-10-12). The sheet is two columns on A4,
 * and a reference table cannot shrink below its widest cell that will not wrap
 * (chemical formulas do not), nor can a display formula wrap at all. Measured
 * over all 266 chapters before this fix: 84 tables in 33 chapters ran under the
 * other column, and 29 formulas in 15 chapters were CUT OFF by the formula
 * box's overflow rule, which looks complete and so is never reported.
 *
 * Width cannot be known from the data (it depends on fonts), so the page
 * measures itself before printing: an item wider than its column is marked
 * wide and its section is laid out in one column across the page, and an item still wider
 * than the page is scaled down to fit. This spec runs the page's OWN decision
 * functions against stand-in items; moving the sections is DOM work with no
 * DOM here, so it is proved by the real-browser check over every chapter,
 * `npm run audit:formula-sheets`.
 */
import { describe, it, expect } from "vitest";
import { getNotesChapterBySlug } from "@/lib/notes/chapters";
import { buildFormulaSheetHtml, FIT_SCRIPT } from "@/lib/export/pdf/formulaSheetHtml";

const COLUMN = 330;
const PAGE = 700;

/** A `.f` item whose content is `natural` px wide: a table or a formula box. */
function item(kind: "table" | "math", natural: number) {
  const classes = new Set<string>(["f"]);
  const box = () => (classes.has("wide") ? PAGE : COLUMN);
  const content = {
    style: {} as Record<string, string>,
    get offsetWidth() {
      return kind === "table" ? Math.max(natural, box()) : box();
    },
    get clientWidth() {
      return box();
    },
    get scrollWidth() {
      return Math.max(natural, box());
    },
  };
  return {
    classList: { add: (c: string) => classes.add(c), contains: (c: string) => classes.has(c) },
    get clientWidth() {
      return box();
    },
    querySelector: (sel: string) =>
      (sel === "table.ref" && kind === "table") || (sel === ".math" && kind === "math") ? content : null,
    content,
    classes,
  };
}

/** markWide, then (as after the section has moved to full width) shrinkWide on what it marked. */
function run(items: ReturnType<typeof item>[]) {
  new Function("items", `${FIT_SCRIPT}; shrinkWide(markWide(items));`)(items);
}

describe("the formula sheet's fit step", () => {
  it("leaves an item that fits its column alone", () => {
    const t = item("table", 300);
    const m = item("math", 200);
    run([t, m]);
    expect(t.classes.has("wide")).toBe(false);
    expect(m.classes.has("wide")).toBe(false);
    expect(t.content.style.zoom).toBeUndefined();
  });

  it("marks a table wider than its column wide", () => {
    const t = item("table", 480);
    run([t]);
    expect(t.classes.has("wide")).toBe(true);
    expect(t.content.style.zoom).toBeUndefined();
  });

  it("marks a formula the box would cut off wide instead", () => {
    const m = item("math", 520);
    run([m]);
    expect(m.classes.has("wide")).toBe(true);
    expect(m.content.style.zoom).toBeUndefined();
  });

  it("scales an item still wider than the page down to fit, never cuts it", () => {
    const m = item("math", 1000);
    const t = item("table", 900);
    run([m, t]);
    expect(m.classes.has("wide")).toBe(true);
    expect(Number(m.content.style.zoom)).toBeLessThanOrEqual(PAGE / 1000);
    expect(Number(m.content.style.zoom)).toBeGreaterThan(0.6);
    expect(Number(t.content.style.zoom)).toBeLessThanOrEqual(PAGE / 900);
  });
});

describe("the sheet carries the fit step", () => {
  const chapter = getNotesChapterBySlug("jee-mains-chemistry", "alcohols-phenols-and-ethers")!;
  const html = buildFormulaSheetHtml({ chapter, head: "", branded: true });

  it("runs the script in the page and lets a full-width section's tables break between rows", () => {
    expect(html).toContain("fitFormulaSheet(document)");
    expect(html).toMatch(/\.full \.f:has\(> table\.ref\)\s*\{[^}]*break-inside:\s*auto/);
    expect(html).toMatch(/\.ref tr\s*\{[^}]*break-inside:\s*avoid/);
  });

  it("lays the columns out at the A4 content width on screen too, so the measurement is the printed one", () => {
    // 210 mm less the 12 mm side margins of @page.
    expect(html).toMatch(/\.cols\s*\{[^}]*width:\s*186mm/);
  });
});
