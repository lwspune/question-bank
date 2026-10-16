import { describe, expect, it } from "vitest";
import { assembleTcs, groupTcsShifts, shiftOfTime, type TcsGeometry, type TcsImage, type TcsQuestion, type TcsSpan } from "../scripts/ssc-cgl/tcs";

// The TCS response sheet (SSC CGL 2022-2024) as text: "Q.n", the stem, "Ans", options
// "1. ..".."4. ..", the key as the GREEN option text (wrong options are red), a right-hand
// panel with "Question ID". Sections restart at Q.1; a shift opens with an Exam Time header.
const DARK = 0x252525;
const GREEN = 0x40c64b;
const RED = 0xf61818;

function span(page: number, y: number, text: string, opts: Partial<TcsSpan> = {}): TcsSpan {
  return { page, x0: 70, y0: y, x1: 300, y1: y + 10, text, color: DARK, bold: false, ...opts };
}

/** One question at page/top: stem lines, then four options with `key` (0-3) in green. */
function question(page: number, top: number, n: number, key: number, stem = [`Stem of ${n}`]): { spans: TcsSpan[]; images: TcsImage[] } {
  const spans: TcsSpan[] = [span(page, top, `Q.${n}`, { x0: 50, x1: 63, bold: true })];
  stem.forEach((t, i) => spans.push(span(page, top + i * 10, t, { bold: true })));
  const ans = top + stem.length * 10 + 2;
  spans.push(span(page, ans, "Ans", { x0: 49, x1: 64, bold: true }));
  const images: TcsImage[] = [];
  for (let i = 0; i < 4; i++) {
    const y = ans + i * 16;
    spans.push(span(page, y, `${i + 1}. opt ${n}${"abcd"[i]}`, { x0: 88, color: i === key ? GREEN : RED }));
    images.push({ page, name: `icon-${page}-${y}`, x0: 70, y0: y + 1, x1: 85, y1: y + 11 });
  }
  spans.push(span(page, ans + 70, "Question ID :", { x0: 387, x1: 434 }));
  spans.push(span(page, ans + 70, `6306${page}${top}`, { x0: 436, x1: 489, bold: true }));
  return { spans, images };
}

function header(page: number, time: string): TcsSpan[] {
  return [span(page, 10, "Exam Time", { x0: 50 }), span(page, 10, time, { x0: 200 })];
}

function section(page: number, y: number, name: string): TcsSpan {
  return span(page, y, `Section : ${name}`, { x0: 50 });
}

const SECTIONS = ["General Intelligence and Reasoning", "General Awareness", "Quantitative Aptitude", "English Comprehension"];

/** A whole shift: header, four sections of 25, two questions per page. */
function shift(firstPage: number, time: string, keyOf: (n: number) => number): TcsGeometry {
  const spans: TcsSpan[] = [...header(firstPage, time)];
  const images: TcsImage[] = [];
  let page = firstPage;
  SECTIONS.forEach((name, s) => {
    spans.push(section(page, 30, name));
    for (let n = 1; n <= 25; n++) {
      const top = n % 2 === 1 ? 60 : 400;
      const q = question(page, top, n, keyOf(s * 25 + n));
      spans.push(...q.spans);
      images.push(...q.images);
      if (n % 2 === 0) page++;
    }
    page++;
  });
  return { spans, images };
}

describe("shiftOfTime", () => {
  it("numbers a day's shifts by start time, not by print order", () => {
    const times = ["4:00 PM - 5:00 PM", "9:00 AM - 10:00 AM", "12:30 PM - 1:30 PM"];
    expect(shiftOfTime("9:00 AM - 10:00 AM", times)).toBe(1);
    expect(shiftOfTime("12:30 PM - 1:30 PM", times)).toBe(2);
    expect(shiftOfTime("4:00 PM - 5:00 PM", times)).toBe(3);
  });
});

describe("assembleTcs", () => {
  it("reads 100 questions per shift, numbering sections A-D as 1-25, 26-50, 51-75, 76-100", () => {
    const qs = assembleTcs(shift(2, "9:00 AM - 10:00 AM", (n) => n % 4));
    expect(qs).toHaveLength(100);
    expect(qs[0]).toMatchObject({ shift: 1, part: "A", number: 1, key: "B" });
    expect(qs[25]).toMatchObject({ part: "B", number: 26 });
    expect(qs[99]).toMatchObject({ part: "D", number: 100, key: "A" });
  });

  it("takes the key from the green option, and the option text without its number", () => {
    const [q] = assembleTcs(shift(2, "9:00 AM - 10:00 AM", () => 2));
    expect(q.key).toBe("C");
    expect(q.options).toEqual(["opt 1a", "opt 1b", "opt 1c", "opt 1d"]);
    expect(q.stem).toBe("Stem of 1");
    expect(q.questionId).toBe("6306260");
  });

  it("joins a stem's wrapped lines, and keeps a numbered line on its own line", () => {
    const g = shift(2, "9:00 AM - 10:00 AM", () => 0);
    const q1 = question(2, 60, 1, 0, ["Read the statements", "carefully and answer.", "1. All cats are dogs."]);
    g.spans = [...header(2, "9:00 AM - 10:00 AM"), section(2, 30, SECTIONS[0]), ...q1.spans, ...g.spans.filter((s) => !(s.page === 2 && s.y0 < 400))];
    const [q] = assembleTcs(g);
    expect(q.stem).toBe("Read the statements carefully and answer.\n1. All cats are dogs.");
  });

  it("separates the shifts of a day file and numbers them by time", () => {
    const later = shift(80, "4:00 PM - 5:00 PM", () => 1);
    const first = shift(2, "9:00 AM - 10:00 AM", () => 0);
    const qs = assembleTcs({ spans: [...first.spans, ...later.spans], images: [...first.images, ...later.images] });
    expect(qs.filter((q) => q.shift === 1)).toHaveLength(100);
    expect(qs.filter((q) => q.shift === 3)).toHaveLength(0);
    expect(qs.filter((q) => q.shift === 2).every((q) => q.key === "B")).toBe(true);
  });

  it("keeps figure images: a stem figure, and pictures that are the options", () => {
    const g = shift(2, "9:00 AM - 10:00 AM", () => 0);
    g.images.push({ page: 2, name: "dice", x0: 70, y0: 63, x1: 170, y1: 71 });
    const [q] = assembleTcs(g);
    expect(q.stemImages).toEqual(["dice"]);
    expect(q.optionImages).toEqual([[], [], [], []]);
  });

  it("reads a Section heading printed as two spans (label, then name)", () => {
    // 2024 sheets print "Section :" and the section's name as separate spans on one line, the
    // name 0.2pt HIGHER (bold font), so it sorts before the label.
    const g = shift(2, "9:00 AM - 10:00 AM", () => 0);
    g.spans = g.spans.flatMap((s) => {
      const m = /^Section :\s(.+)$/.exec(s.text);
      return m ? [{ ...s, text: "Section : ", x1: 90 }, { ...s, text: m[1], x0: 90, y0: s.y0 - 0.2 }] : [s];
    });
    const qs = assembleTcs(g);
    expect(qs[0].part).toBe("A");
    expect(qs[99].part).toBe("D");
  });

  it("reads a Q label and Ans printed one character per line (a wide stem image squeezes the column)", () => {
    const g = shift(2, "9:00 AM - 10:00 AM", () => 0);
    // One continuous column of characters, as on 26 Sep 2024 Quant Q.14: "Ans" starts level
    // with option 1, so the label stack runs Q . 7 then A n s, 4pt apart here.
    const stack = (t: string, y: number, page: number) =>
      [...t].map((ch, i) => span(page, y + i * 4, ch, { x0: 46, x1: 51, bold: true }));
    g.spans = g.spans.flatMap((s) => {
      if (s.page === 5 && s.text === "Q.7") return stack("Q.7", s.y0, s.page);
      // ...and its "A" a fraction lower than option 1 (26 Sep 2024: 74.3 against 73.9).
      if (s.page === 5 && s.text === "Ans" && s.y0 < 300) return stack("Ans", s.y0 + 0.4, s.page);
      return [s];
    });
    const qs = assembleTcs(g);
    expect(qs).toHaveLength(100);
    expect(qs[6]).toMatchObject({ number: 7, key: "A", options: ["opt 7a", "opt 7b", "opt 7c", "opt 7d"] });
  });

  it("keeps each sheet's Exam Date, and numbers shifts by a fixed slot list across dates", () => {
    // A 2024 file runs past its day: 10 Sep 9:00 AM, then 11 Sep 9:00 AM.
    const SLOTS = ["9:00 AM - 10:00 AM", "12:30 PM - 1:30 PM", "4:00 PM - 5:00 PM"];
    const a = shift(2, "9:00 AM - 10:00 AM", () => 0);
    const b = shift(80, "9:00 AM - 10:00 AM", () => 1);
    a.spans.push(span(2, 5, "Exam Date", { x0: 50 }), span(2, 5, "10/09/2024", { x0: 200 }));
    b.spans.push(span(80, 5, "Exam Date", { x0: 50 }), span(80, 5, "11/09/2024", { x0: 200 }));
    const qs = assembleTcs({ spans: [...a.spans, ...b.spans], images: [...a.images, ...b.images] }, { slots: SLOTS });
    expect(qs).toHaveLength(200);
    expect(qs.every((q) => q.shift === 1)).toBe(true);
    expect(qs[0].date).toBe("2024-09-10");
    expect(qs[100]).toMatchObject({ date: "2024-09-11", number: 1, key: "B", sheet: 1 });
    expect(() => assembleTcs(shift(2, "2:00 PM - 3:00 PM", () => 0), { slots: SLOTS })).toThrow(/not one of the slots/);
  });

  it("reads a Q label and Ans broken into uneven pieces", () => {
    // 19 Sep 2024: "Q." / "4" / "A" / "ns"; 12 Sep 2024: "Q.2" / "1" / "Ans".
    const g = shift(2, "9:00 AM - 10:00 AM", () => 0);
    const pieces = (parts: string[], y: number, page: number) =>
      parts.map((t, i) => span(page, y + i * 4, t, { x0: 46, x1: 54, bold: true }));
    g.spans = g.spans.flatMap((s) => {
      if (s.page === 5 && s.text === "Q.7") return pieces(["Q.", "7"], s.y0, 5);
      if (s.page === 5 && s.text === "Ans" && s.y0 < 300) return pieces(["A", "ns"], s.y0, 5);
      if (s.page === 7 && s.text === "Q.11") return pieces(["Q.1", "1"], s.y0, 7);
      return [s];
    });
    const qs = assembleTcs(g);
    expect(qs).toHaveLength(100);
    expect(qs[6].options).toEqual(["opt 7a", "opt 7b", "opt 7c", "opt 7d"]);
    expect(qs[10].stem).toBe("Stem of 11");
  });

  it("reads a sheet printed scaled (gutter, icons and panel all moved in)", () => {
    // 26 Sep 2024's last sheet: Q labels at x 104 (not 48), tick icons at 120, the panel at
    // 359-369 (not 376-387). Fixed x thresholds read its panel as option text and its icons
    // as figures.
    const g = shift(2, "9:00 AM - 10:00 AM", (n) => n % 4);
    // ...and on it a squeezed question whose label prints one character per line.
    g.spans = g.spans.flatMap((s) =>
      s.page === 5 && (s.text === "Q.7" || (s.text === "Ans" && s.y0 < 300))
        ? [...s.text].map((ch, i) => span(5, s.y0 + i * 4, ch, { x0: 46, x1: 51, bold: true }))
        : [s]
    );
    const sx = (x: number) => 56 + 0.78 * x;
    g.spans = g.spans.map((s) => ({ ...s, x0: sx(s.x0), x1: sx(s.x1) }));
    g.images = g.images.map((im) => ({ ...im, x0: sx(im.x0), x1: sx(im.x1) }));
    const qs = assembleTcs(g);
    expect(qs).toHaveLength(100);
    expect(qs[0]).toMatchObject({ key: "B", options: ["opt 1a", "opt 1b", "opt 1c", "opt 1d"], questionId: "6306260" });
    expect(qs.every((q) => q.optionImages.every((x) => x.length === 0))).toBe(true);
  });

  it("refuses a question with no green option or two", () => {
    const none = shift(2, "9:00 AM - 10:00 AM", () => 9);
    expect(() => assembleTcs(none)).toThrow(/shift 1 Q1.*exactly one key/);
  });

  it("refuses a shift that is not numbered 1..100", () => {
    const g = shift(2, "9:00 AM - 10:00 AM", () => 0);
    g.spans = g.spans.filter((s) => s.text !== "Q.7");
    expect(() => assembleTcs(g)).toThrow(/shift 1.*missing 7/);
  });
});

describe("groupTcsShifts", () => {
  const q = (sheet: number, date: string, shift: number, number: number, qid = `${date}-${shift}-${number}`): TcsQuestion => ({
    sheet, date, shift, part: "A", number, stem: "s", options: ["a", "b", "c", "d"], key: "A",
    stemImages: [], optionImages: [[], [], [], []], questionId: qid, regions: [],
  });
  const sheet = (i: number, date: string, shift: number, qid?: (n: number) => string) =>
    Array.from({ length: 100 }, (_, k) => q(i, date, shift, k + 1, qid?.(k + 1)));

  it("files each sheet under t<tier>-<its date>-s<shift>, across files", () => {
    const got = groupTcsShifts(1, [
      { dir: "t1-2024-09-10", questions: [...sheet(0, "2024-09-10", 1), ...sheet(1, "2024-09-11", 1)] },
      { dir: "t1-2024-09-11", questions: sheet(0, "2024-09-11", 2) },
    ]);
    expect([...got.keys()]).toEqual(["t1-2024-09-10-s1", "t1-2024-09-11-s1", "t1-2024-09-11-s2"]);
    expect(got.get("t1-2024-09-11-s1")!.dir).toBe("t1-2024-09-10");
    expect(got.get("t1-2024-09-11-s1")!.questions.every((x) => x.sheet === 1)).toBe(true);
  });

  it("keeps the first of two identical copies of a shift, and refuses two that differ", () => {
    const same = groupTcsShifts(1, [
      { dir: "a", questions: sheet(0, "2024-09-11", 1) },
      { dir: "b", questions: sheet(0, "2024-09-11", 1) },
    ]);
    expect(same.get("t1-2024-09-11-s1")!.dir).toBe("a");
    expect(() =>
      groupTcsShifts(1, [
        { dir: "a", questions: sheet(0, "2024-09-11", 1) },
        { dir: "b", questions: sheet(0, "2024-09-11", 1, (n) => `other-${n}`) },
      ])
    ).toThrow(/t1-2024-09-11-s1.*differ/);
  });

  it("refuses a sheet that prints no Exam Date", () => {
    expect(() => groupTcsShifts(1, [{ dir: "a", questions: sheet(0, null as unknown as string, 1) }])).toThrow(/no Exam Date/);
  });
});
