import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { glueRuns, WHOLE_MAX_TEX } from "@/components/math/mathGlue";
import { StaticKatexRenderer, StaticRichText } from "@/components/math/StaticMath";

type Run = { type: "text" | "inline" | "block"; content: string; bold?: boolean };
const t = (content: string): Run => ({ type: "text", content });
const m = (content: string): Run => ({ type: "inline", content });
const LONG = "P(A \\mid B) > P(A) \\iff P(B \\mid A) > P(B)";

describe("glueRuns: keep punctuation on the formula's line", () => {
  it("takes the comma after a formula into its group", () => {
    expect(glueRuns([t("so it is "), m("\\frac{5}{12}"), t(", which is option (C).")])).toEqual([
      { kind: "one", run: t("so it is ") },
      { kind: "glued", whole: true, parts: [m("\\frac{5}{12}"), t(",")] },
      { kind: "one", run: t(" which is option (C).") },
    ]);
  });

  it("takes several closing marks and an opening bracket; a text run left empty is dropped", () => {
    expect(glueRuns([t("area ("), m("x^2"), t(")."), t("")])).toEqual([
      { kind: "one", run: t("area ") },
      { kind: "glued", whole: true, parts: [t("("), m("x^2"), t(").")] },
      { kind: "one", run: t("") },
    ]);
  });

  it("a short formula with nothing touching it is one unit, so it never splits inside", () => {
    expect(glueRuns([t("then "), m("6 \\times 6 = 36"), t(" outcomes")])).toEqual([
      { kind: "one", run: t("then ") },
      { kind: "glued", whole: true, parts: [m("6 \\times 6 = 36")] },
      { kind: "one", run: t(" outcomes") },
    ]);
  });

  it("a long formula keeps its own break points but still holds on to its full stop", () => {
    expect(LONG.length).toBeGreaterThan(WHOLE_MAX_TEX);
    expect(glueRuns([t("Likewise "), m(LONG), t(".")])).toEqual([
      { kind: "one", run: t("Likewise ") },
      { kind: "glued", whole: false, parts: [m(LONG), t(".")] },
    ]);
  });

  it("a long formula with nothing touching it is left alone", () => {
    expect(glueRuns([t("x "), m(LONG), t(" y")])).toEqual([t("x "), m(LONG), t(" y")].map((run) => ({ kind: "one", run })));
  });

  it("does not glue across a space", () => {
    expect(glueRuns([t("is ( "), m("x"), t(" , y")])).toEqual([
      { kind: "one", run: t("is ( ") },
      { kind: "glued", whole: true, parts: [m("x")] },
      { kind: "one", run: t(" , y") },
    ]);
  });

  it("never touches block maths or plain text", () => {
    const runs = [t("a, b."), { type: "block" as const, content: "x" }, t(", c")];
    expect(glueRuns(runs)).toEqual(runs.map((run) => ({ kind: "one", run })));
  });

  it("two formulas sharing one comma: the comma goes with the first", () => {
    expect(glueRuns([m("a"), t(","), m("b")])).toEqual([
      { kind: "glued", whole: true, parts: [m("a"), t(",")] },
      { kind: "glued", whole: true, parts: [m("b")] },
    ]);
  });

  it("keeps bold on the piece it moves", () => {
    const bold = { type: "text" as const, content: ".", bold: true };
    expect(glueRuns([m("x"), bold])).toEqual([{ kind: "glued", whole: true, parts: [m("x"), bold] }]);
  });
});

describe("rendered: the formula and its punctuation sit in one no-wrap span", () => {
  it("KatexTree: a short formula and its comma are one unbreakable unit", () => {
    const html = renderToStaticMarkup(createElement(StaticKatexRenderer, { text: "is \\(\\frac{5}{12}\\), which" }));
    const at = html.indexOf('style="white-space:nowrap"');
    expect(at).toBeGreaterThan(-1);
    const after = html.slice(at);
    expect(after.indexOf("katex")).toBeGreaterThan(-1);
    expect(after.indexOf(",")).toBeLessThan(after.indexOf(" which"));
    expect(after.slice(0, after.indexOf(","))).not.toContain("white-space:normal");
  });

  it("KatexTree: a long formula may still break inside, but not before its full stop", () => {
    const html = renderToStaticMarkup(createElement(StaticKatexRenderer, { text: `Likewise \\(${LONG}\\).` }));
    const at = html.indexOf('style="white-space:nowrap"');
    expect(at).toBeGreaterThan(-1);
    expect(html.slice(at)).toContain('style="white-space:normal"');
  });

  it("RichTree (notes bodies)", () => {
    const html = renderToStaticMarkup(createElement(StaticRichText, { text: "Area is \\(x^2\\)." }));
    expect(html).toContain('style="white-space:nowrap"');
  });

  it("text without maths is unchanged", () => {
    expect(renderToStaticMarkup(createElement(StaticKatexRenderer, { text: "a, b." }))).not.toContain("nowrap");
  });
});
