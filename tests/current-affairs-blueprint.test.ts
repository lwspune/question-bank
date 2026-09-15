/**
 * The pool blueprint: how many Current-Affairs questions to author per chapter,
 * and how many of those should be evergreen rather than dated.
 *
 * Derived from the PYQ history rather than hand-typed, because a hand-typed
 * table is a snapshot and this one has already been wrong once. The Sep-2026
 * pool put 25% of its questions in Defence (PYQ share 17%) and 19% in Science &
 * Technology (PYQ share 10%), while under-filling International Affairs and
 * Government Schemes — the two chapters with the LARGEST PYQ share. Nobody
 * chose that; there was simply nothing to check it against.
 *
 * The last test is the regression: a miniature of the real Sep-2026 shape, which
 * the score must call out on all three axes.
 */
import { describe, it, expect } from "vitest";
import { caBlueprint, allocateSeats, scorePool } from "@/lib/currentAffairs/blueprint";
import { poolWindow } from "@/lib/currentAffairs/window";
import type { CaRow } from "@/lib/currentAffairs/types";

let seq = 0;
function row(chapter: string, text: string, opts: Partial<CaRow> = {}): CaRow {
  return {
    id: `q${seq++}`,
    chapter,
    text,
    solution: null,
    pyqYear: 2025,
    pyqMonth: "Sep",
    sourceFile: "fixture",
    ...opts,
  };
}

/** Dated and evergreen stems, so a fixture can set a chapter's evergreen rate. */
const dated = (ch: string, year = 2025) => row(ch, `An event of March ${year} in ${ch}`);
const ever = (ch: string) => row(ch, `Which scheme in ${ch} is described above ?`);

function history(): CaRow[] {
  return [
    // International: 4 PYQ, 0 evergreen  (the real rate is 14%)
    ...Array.from({ length: 4 }, () => dated("International")),
    // Defence: 3 PYQ, 2 evergreen        (the real rate is 64%)
    dated("Defence"),
    ever("Defence"),
    ever("Defence"),
    // Sports: 1 PYQ, 0 evergreen
    dated("Sports"),
  ];
}

describe("caBlueprint", () => {
  it("derives per-chapter share from the PYQ counts", () => {
    const bp = caBlueprint(history());
    expect(bp.totalPyq).toBe(8);
    const intl = bp.chapters.find((c) => c.chapter === "International")!;
    expect(intl.pyqCount).toBe(4);
    expect(intl.share).toBeCloseTo(0.5, 6);
  });

  it("derives evergreen rate PER CHAPTER, not just bank-wide", () => {
    const bp = caBlueprint(history());
    expect(bp.chapters.find((c) => c.chapter === "Defence")!.evergreenRate).toBeCloseTo(2 / 3, 6);
    expect(bp.chapters.find((c) => c.chapter === "International")!.evergreenRate).toBe(0);
    expect(bp.evergreenRate).toBeCloseTo(2 / 8, 6);
  });

  it("sorts chapters by share, heaviest first", () => {
    const bp = caBlueprint(history());
    expect(bp.chapters.map((c) => c.chapter)).toEqual(["International", "Defence", "Sports"]);
  });

  it("counts distinct sittings, not rows", () => {
    const bp = caBlueprint([
      row("A", "x", { pyqYear: 2025, pyqMonth: "Apr" }),
      row("A", "y", { pyqYear: 2025, pyqMonth: "Apr" }),
      row("A", "z", { pyqYear: 2025, pyqMonth: "Sep" }),
    ]);
    expect(bp.sittings).toBe(2);
  });

  it("survives an empty history without dividing by zero", () => {
    const bp = caBlueprint([]);
    expect(bp.totalPyq).toBe(0);
    expect(bp.chapters).toEqual([]);
    expect(bp.evergreenRate).toBe(0);
  });
});

describe("allocateSeats", () => {
  it("allocates exactly the requested pool size", () => {
    const seats = allocateSeats(caBlueprint(history()), 100);
    expect(seats.reduce((n, s) => n + s.total, 0)).toBe(100);
  });

  it("allocates in proportion to share", () => {
    const seats = allocateSeats(caBlueprint(history()), 80);
    expect(seats.find((s) => s.chapter === "International")!.total).toBe(40);
    expect(seats.find((s) => s.chapter === "Defence")!.total).toBe(30);
    expect(seats.find((s) => s.chapter === "Sports")!.total).toBe(10);
  });

  it("splits each chapter by ITS OWN evergreen rate", () => {
    const seats = allocateSeats(caBlueprint(history()), 80);
    const def = seats.find((s) => s.chapter === "Defence")!;
    expect(def.evergreen).toBe(20); // 30 * 2/3
    expect(def.dated).toBe(10);
    const intl = seats.find((s) => s.chapter === "International")!;
    expect(intl.evergreen).toBe(0);
    expect(intl.dated).toBe(40);
  });

  it("always has total === evergreen + dated", () => {
    for (const size of [7, 11, 13, 88, 100]) {
      for (const s of allocateSeats(caBlueprint(history()), size)) {
        expect(s.evergreen + s.dated).toBe(s.total);
      }
    }
  });

  it("uses largest-remainder so a size that divides badly still sums exactly", () => {
    // 7 seats over shares 0.5 / 0.375 / 0.125 = 3.5 / 2.625 / 0.875.
    const seats = allocateSeats(caBlueprint(history()), 7);
    expect(seats.reduce((n, s) => n + s.total, 0)).toBe(7);
    expect(seats.find((s) => s.chapter === "Sports")!.total).toBe(1);
  });

  it("breaks a remainder tie by chapter name, so the same input gives the same table", () => {
    const bp = caBlueprint([dated("Bravo"), dated("Alpha")]);
    const a = allocateSeats(bp, 3);
    const b = allocateSeats(bp, 3);
    expect(a).toEqual(b);
    expect(a.find((s) => s.chapter === "Alpha")!.total).toBe(2);
  });
});

describe("scorePool", () => {
  const bp = caBlueprint(history());
  const win = poolWindow("2026-09"); // 2025-01 .. 2026-07

  it("reports a clean pool with no findings", () => {
    const pool = [
      ...Array.from({ length: 4 }, () => dated("International", 2026)),
      dated("Defence", 2026),
      ever("Defence"),
      ever("Defence"),
      dated("Sports", 2026),
    ];
    const score = scorePool(pool, bp, win);
    expect(score.poolSize).toBe(8);
    expect(score.findings).toEqual([]);
  });

  it("counts an evergreen row as undated rather than judging its window", () => {
    const score = scorePool([ever("Defence")], bp, win);
    expect(score.window.undated).toBe(1);
    expect(score.window.in + score.window.out + score.window.partial).toBe(0);
  });

  it("separates a straddling bare year from a decided one", () => {
    const pool = [
      row("Defence", "Something during 2026"), // straddles the T-2 ceiling
      row("Defence", "Something during 2025"), // wholly inside
      row("Defence", "Something during 2019"), // wholly outside
    ];
    const score = scorePool(pool, bp, win);
    expect(score.window).toMatchObject({ in: 1, partial: 1, out: 1, undated: 0 });
  });

  it("names the Sep-2026 failure on all three axes", () => {
    // Defence over-weighted, International starved, and almost nothing evergreen
    // — the shape the real pool had, at 1/10 scale.
    const pool = [
      ...Array.from({ length: 6 }, () => dated("Defence", 2025)),
      dated("International", 2025),
      dated("Sports", 2025),
    ];
    const score = scorePool(pool, bp, win);

    const defence = score.chapters.find((c) => c.chapter === "Defence")!;
    expect(defence.actual).toBeGreaterThan(defence.target);
    const intl = score.chapters.find((c) => c.chapter === "International")!;
    expect(intl.actual).toBeLessThan(intl.target);

    expect(score.genre.actualRate).toBe(0);
    expect(score.genre.targetRate).toBeCloseTo(0.25, 6);

    const joined = score.findings.join(" | ");
    expect(joined).toMatch(/Defence/);
    expect(joined).toMatch(/International/);
    expect(joined).toMatch(/evergreen/i);
  });

  it("flags a LARGE chapter that misses by a third — the calibration that 0.5 hid", () => {
    // Regression for the live run on the Sep-2026 pool. At SEAT_DELTA_FRACTION
    // 0.5, Government Schemes delivering 9 of 16 seats produced NO finding,
    // because 7 < 8. A big chapter could sit permanently 40% short in silence.
    const bigBp = caBlueprint([
      ...Array.from({ length: 16 }, () => dated("Schemes")),
      ...Array.from({ length: 4 }, () => dated("Sports")),
    ]);
    const pool = [
      ...Array.from({ length: 9 }, () => dated("Schemes", 2026)),
      ...Array.from({ length: 11 }, () => dated("Sports", 2026)),
    ];
    const score = scorePool(pool, bigBp, win);
    const schemes = score.chapters.find((c) => c.chapter === "Schemes")!;
    expect(schemes.target).toBe(16);
    expect(schemes.actual).toBe(9);
    expect(score.findings.join(" | ")).toMatch(/Schemes/);
  });

  it("still ignores a small absolute wobble on a big chapter", () => {
    // The absolute floor has to keep doing its job after the fraction moved.
    const bigBp = caBlueprint(Array.from({ length: 20 }, () => dated("Schemes")));
    const pool = Array.from({ length: 19 }, () => dated("Schemes", 2026));
    const score = scorePool(pool, bigBp, win);
    expect(score.findings.filter((f) => f.startsWith("Schemes"))).toEqual([]);
  });

  it("flags a pool whose dated rows sit outside the window", () => {
    const pool = Array.from({ length: 8 }, () => dated("International", 2019));
    const score = scorePool(pool, bp, win);
    expect(score.window.out).toBe(8);
    expect(score.findings.join(" | ")).toMatch(/window/i);
  });

  it("reports an empty pool without throwing", () => {
    const score = scorePool([], bp, win);
    expect(score.poolSize).toBe(0);
    expect(score.genre.actualRate).toBe(0);
  });
});
