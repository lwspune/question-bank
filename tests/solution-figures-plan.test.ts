import { describe, it, expect } from "vitest";
import { planBatch, applyEdit, type Batch } from "../scripts/solution-figures/plan";

const A = "11111111-1111-4111-8111-111111111111";
const B = "22222222-2222-4222-8222-222222222222";
const C = "33333333-3333-4333-8333-333333333333";
const PDF1 = "C:/books/one.pdf";
const PDF2 = "C:/books/two.pdf";

function batch(over: Partial<Batch> = {}): Batch {
  return {
    figures: [
      { key: "wheatstone", pdf: PDF1, parts: [{ page: 3, bbox: [0.1, 0.6, 0.4, 0.8] }], ids: [A, B] },
      { key: "shm-graphs", pdf: PDF2, parts: [{ page: 10, bbox: [0.1, 0.1, 0.5, 0.5] }, { page: 10, bbox: [0.5, 0.0, 0.9, 0.4], mask: [[0.6, 0.3, 0.8, 0.35]] }], ids: [C] },
    ],
    ...over,
  };
}

describe("planBatch", () => {
  it("plans one crop job per figure, grouped by book, and one attach row per question", () => {
    const plan = planBatch(batch());
    expect(plan.errors).toEqual([]);
    expect(plan.cropsByPdf.get(PDF1)!.map((j) => j.ref)).toEqual(["wheatstone"]);
    expect(plan.cropsByPdf.get(PDF2)![0].parts).toHaveLength(2);
    expect(plan.attach).toEqual([
      { id: A, key: "wheatstone" },
      { id: B, key: "wheatstone" },
      { id: C, key: "shm-graphs" },
    ]);
  });

  it("refuses a figure key used twice", () => {
    const b = batch();
    b.figures[1].key = "wheatstone";
    expect(planBatch(b).errors.join("\n")).toMatch(/wheatstone.*twice/);
  });

  it("refuses a key that is not a lowercase slug (it becomes a file name)", () => {
    const b = batch();
    b.figures[0].key = "Fig 9.4";
    expect(planBatch(b).errors.join("\n")).toMatch(/slug/);
  });

  it("refuses a question attached to two figures, since a row holds one solution image", () => {
    const b = batch();
    b.figures[1].ids = [A];
    expect(planBatch(b).errors.join("\n")).toMatch(new RegExp(`${A}.*wheatstone.*shm-graphs`));
  });

  it("refuses an id that is not a uuid", () => {
    const b = batch();
    b.figures[0].ids = ["Q. 19"];
    expect(planBatch(b).errors.join("\n")).toMatch(/not a question id/);
  });

  it("refuses a figure with no questions or no parts", () => {
    const b = batch();
    b.figures[0].ids = [];
    b.figures[1].parts = [];
    const errs = planBatch(b).errors.join("\n");
    expect(errs).toMatch(/wheatstone.*no questions/);
    expect(errs).toMatch(/shm-graphs.*no parts/);
  });

  it("refuses a box outside the page or inside out, and a bad mask", () => {
    const b = batch();
    b.figures[0].parts = [{ page: 3, bbox: [0.5, 0.6, 0.4, 0.8] }];
    b.figures[1].parts = [{ page: 10, bbox: [0.1, 0.1, 0.5, 1.2] }, { page: -1, bbox: [0.1, 0.1, 0.5, 0.5], mask: [[0.1, 0.1]] as never }];
    const errs = planBatch(b).errors;
    expect(errs.filter((e) => /: box /.test(e))).toHaveLength(2);
    expect(errs.join("\n")).toMatch(/page -1/);
    expect(errs.join("\n")).toMatch(/mask/);
  });

  it("takes a part printed sideways with a quarter-turn rotation, and refuses any other angle", () => {
    const ok = batch();
    ok.figures[1].parts = [{ page: 10, bbox: [0.1, 0.1, 0.5, 0.5], rotate: 90 }];
    expect(planBatch(ok).errors).toEqual([]);
    const bad = batch();
    bad.figures[1].parts = [{ page: 10, bbox: [0.1, 0.1, 0.5, 0.5], rotate: 45 as never }];
    expect(planBatch(bad).errors.join(" | ")).toMatch(/rotate 45/);
  });

  it("plans a DRAWN figure (a spec) apart from the book crops, and refuses a figure with both sources or neither", () => {
    const drawn = planBatch(batch({ figures: [{ key: "lpp-region", draw: { kind: "plot" }, ids: [A] }] }));
    expect(drawn.errors).toEqual([]);
    expect(drawn.drawn).toEqual([{ ref: "lpp-region", spec: { kind: "plot" } }]);
    expect(drawn.cropsByPdf.size).toBe(0);
    const both = planBatch(batch({ figures: [{ key: "x", pdf: PDF1, parts: [{ page: 1, bbox: [0.1, 0.1, 0.5, 0.5] }], draw: { kind: "plot" }, ids: [A] }] }));
    expect(both.errors.join("\n")).toMatch(/x: .*both/);
    const neither = planBatch(batch({ figures: [{ key: "y", ids: [A] }] }));
    expect(neither.errors.join("\n")).toMatch(/y: .*no source/);
    const kindless = planBatch(batch({ figures: [{ key: "z", draw: {} as never, ids: [A] }] }));
    expect(kindless.errors.join("\n")).toMatch(/z: .*kind/);
  });

  it("accepts a label edit only for a question this batch attaches a figure to", () => {
    const ok = planBatch(batch({ edits: [{ id: A, find: "R in AD", replace: "S in AD" }] }));
    expect(ok.errors).toEqual([]);
    expect(ok.edits).toHaveLength(1);
    const stray = planBatch(batch({ edits: [{ id: "44444444-4444-4444-8444-444444444444", find: "x", replace: "y" }] }));
    expect(stray.errors.join("\n")).toMatch(/no figure in this batch/);
  });

  it("refuses an edit carrying a control character, the mark of a backslash a shell ate (\\a in \\angle became BELL)", () => {
    const errs = planBatch(batch({ edits: [{ id: A, find: "x", replace: "\\(\u0007ngle APB\\)" }, { id: B, find: "y\u0009", replace: "z" }] })).errors;
    expect(errs.filter((e) => /control character/.test(e))).toHaveLength(2);
  });

  it("refuses an empty or no-op edit", () => {
    const errs = planBatch(batch({ edits: [{ id: A, find: "", replace: "y" }, { id: B, find: "same", replace: "same" }] })).errors;
    expect(errs).toHaveLength(2);
  });
});

describe("applyEdit", () => {
  it("replaces a text found exactly once", () => {
    expect(applyEdit("Let R be in AD.", "R be in AD", "S be in AD")).toEqual({ status: "apply", next: "Let S be in AD." });
  });

  it("reports an edit already made, so a re-run changes nothing", () => {
    expect(applyEdit("Let S be in AD.", "R be in AD", "S be in AD")).toEqual({ status: "done", next: "Let S be in AD." });
  });

  it("does not append twice when the replacement extends the text it finds", () => {
    const once = applyEdit("Plot x against t.", "Plot x against t.", "Plot x against t. The book marks t.");
    expect(once.status).toBe("apply");
    expect(applyEdit(once.next, "Plot x against t.", "Plot x against t. The book marks t.")).toEqual({ status: "done", next: once.next });
  });

  it("refuses text that is missing, or found more than once", () => {
    expect(applyEdit("nothing here", "R be in AD", "S be in AD").status).toBe("missing");
    expect(applyEdit("R/S and R/S", "R/S", "S/R").status).toBe("ambiguous");
  });
});
