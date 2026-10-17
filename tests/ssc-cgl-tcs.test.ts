import { describe, expect, it } from "vitest";
import { LAYOUTS } from "../scripts/ssc-cgl/config";
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
function shift(
  firstPage: number,
  time: string,
  keyOf: (n: number) => number,
  sections: [string, number][] = SECTIONS.map((n) => [n, 25]),
): TcsGeometry {
  const spans: TcsSpan[] = [...header(firstPage, time)];
  const images: TcsImage[] = [];
  let page = firstPage;
  let before = 0;
  sections.forEach(([name, count]) => {
    spans.push(section(page, 30, name));
    for (let n = 1; n <= count; n++) {
      const top = n % 2 === 1 ? 60 : 400;
      const q = question(page, top, n, keyOf(before + n));
      spans.push(...q.spans);
      images.push(...q.images);
      if (n % 2 === 0) page++;
    }
    before += count;
    page++;
  });
  return { spans, images };
}

/** Tier II Paper 1, as the 2024 sheets print its five modules (each restarting at Q.1). */
const TIER2: [string, number][] = [
  ["Module I Mathematical Abilities", 30],
  ["Module II Reasoning and General Intelligence", 30],
  ["Module I English Language and Comprehension", 45],
  ["Module II General Awareness", 25],
  ["Module I Computer Knowledge Module", 20],
];

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

  it("files each picture option under the label nearest its middle (a tall picture starts above its label)", () => {
    // 9 Sep 2024 Q10: option pictures 25pt tall, centred on "1."-"4.", each starting ~6pt above.
    const g = shift(2, "9:00 AM - 10:00 AM", () => 0);
    const opts = g.spans.filter((s) => s.page === 2 && s.y0 < 300 && /^[1-4]\. /.test(s.text));
    // Picture 1 starts just below "Ans" (which prints level with label 1 here); the rest start above their labels.
    opts.forEach((o, i) => g.images.push({ page: 2, name: `pic${i}`, x0: 97, y0: i === 0 ? o.y0 + 0.5 : o.y0 - 6, x1: 185, y1: o.y0 + 9 }));
    const [q] = assembleTcs(g);
    expect(q.optionImages).toEqual([["pic0"], ["pic1"], ["pic2"], ["pic3"]]);
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

  it("reads a Comprehension passage as the context of the sub-question after it, and shows it on its sheet", () => {
    // 9 Sep 2024: "Comprehension:", the passage, "SubQuestion No : 21", then Q.21.
    const g = shift(2, "9:00 AM - 10:00 AM", () => 0);
    const q96 = g.spans.find((s) => s.text === "Q.21" && s.page > 40)!;
    g.spans = g.spans.map((s) => (s.page === q96.page && s.y0 >= q96.y0 ? { ...s, y0: s.y0 + 100, y1: s.y1 + 100 } : s));
    g.images = g.images.map((im) => (im.page === q96.page && im.y0 >= q96.y0 ? { ...im, y0: im.y0 + 100, y1: im.y1 + 100 } : im));
    g.spans.push(
      span(q96.page, q96.y0 + 2, "Comprehension:", { bold: true }),
      span(q96.page, q96.y0 + 14, "In the following passage, some words have been deleted."),
      span(q96.page, q96.y0 + 24, "There is a saying (1)________ shadows."),
      span(q96.page, q96.y0 + 80, "SubQuestion No : 21", { bold: true })
    );
    const qs = assembleTcs(g);
    const q = qs.find((x) => x.number === 96)!;
    expect(q.context).toBe("In the following passage, some words have been deleted. There is a saying (1)________ shadows.");
    expect(q.stem).toBe("Stem of 21");
    expect(q.regions[0].y0).toBeLessThanOrEqual(q96.y0 + 2);
    expect(qs.find((x) => x.number === 97)!.context).toBeNull();
    expect(qs.find((x) => x.number === 95)!.options).toEqual(["opt 20a", "opt 20b", "opt 20c", "opt 20d"]);
  });

  it("refuses a file in which it finds no question at all (a layout it does not know)", () => {
    expect(() => assembleTcs({ spans: [span(1, 10, "Some other print")], images: [] })).toThrow(/no questions/);
  });

  it("reads the 2022 print's key colours, a shade off the 2024 ones", () => {
    // 1 Dec 2022: green 0x40c64a, red 0xf61717, body 0x242424.
    const g = shift(2, "9:00 AM - 10:00 AM", (n) => n % 4);
    g.spans = g.spans.map((s) => ({ ...s, color: s.color === GREEN ? 0x40c64a : s.color === RED ? 0xf61717 : s.color === DARK ? 0x242424 : s.color }));
    const qs = assembleTcs(g);
    expect(qs.map((q) => q.key).slice(0, 4)).toEqual(["B", "C", "D", "A"]);
  });

  it("reads an option label printed apart from its text, a hair above Ans (1 Dec 2022)", () => {
    const g = shift(2, "9:00 AM - 10:00 AM", () => 1);
    g.spans = g.spans.flatMap((s) => {
      const m = /^([1-4])\. (.*)$/.exec(s.text);
      if (!(s.page === 2 && s.y0 < 300 && m)) return [s];
      return [{ ...s, text: `${m[1]}.`, y0: s.y0 - 0.4, x1: s.x0 + 8 }, { ...s, text: m[2], x0: s.x0 + 11 }];
    });
    const [q] = assembleTcs(g);
    expect(q).toMatchObject({ key: "B", options: ["opt 1a", "opt 1b", "opt 1c", "opt 1d"] });
  });

  it("reads the 2023 print's key colours (green 0x37ac3f, red 0xe61616)", () => {
    const g = shift(2, "9:00 AM - 10:00 AM", (n) => n % 4);
    g.spans = g.spans.map((s) => ({ ...s, color: s.color === GREEN ? 0x37ac3f : s.color === RED ? 0xe61616 : s.color === DARK ? 0 : s.color }));
    expect(assembleTcs(g).map((q) => q.key).slice(0, 4)).toEqual(["B", "C", "D", "A"]);
  });

  it("reads a Q label fused with the first stem line, and a heading in three spans (1 Dec 2022)", () => {
    const g = shift(2, "9:00 AM - 10:00 AM", () => 0);
    g.spans = g.spans.flatMap((s) => {
      if (s.page === 5 && s.text === "Q.7") return [];
      if (s.page === 5 && s.text === "Stem of 7") return [{ ...s, text: "Q.7 Stem of 7", x0: 50 }];
      const m = /^Section : (Quantitative.*)$/.exec(s.text);
      if (m) return [{ ...s, text: "Section", x1: 75 }, { ...s, text: ":", x0: 77, x1: 80 }, { ...s, text: ` ${m[1]}`, x0: 80, y0: s.y0 - 0.3 }];
      return [s];
    });
    const qs = assembleTcs(g);
    expect(qs).toHaveLength(100);
    expect(qs[6]).toMatchObject({ number: 7, stem: "Stem of 7" });
    expect(qs[50]).toMatchObject({ part: "C", number: 51 });
  });

  it("reads the 18 Jul 2023 print: unlabelled date and time, fused Question ID, text-glyph ticks", () => {
    const g = shift(2, "9:00 AM - 10:00 AM", (n) => n % 4);
    g.spans = g.spans.flatMap((s) => {
      if (s.text === "Exam Time") return [];
      if (s.text === "9:00 AM - 10:00 AM") return [span(s.page, 4, "18/07/2023 ", { x0: 133 }), { ...s, text: "9:00 AM - 10:00 AM ", x0: 133 }];
      if (s.text === "Question ID :") return [];
      if (/^6306\d+$/.test(s.text)) return [{ ...s, text: `Question ID: ${s.text} `, x0: 399 }];
      const m = /^([1-4])\. /.exec(s.text);
      if (m && s.y0 < 2000) {
        const glyph = s.color === GREEN ? ",Z " : "X ";
        return [{ ...s, text: glyph, x0: 75, x1: 84, y0: s.y0 - 4, color: s.color === GREEN ? 0x74b06c : 0xb0403c, bold: true }, s];
      }
      return [s];
    });
    const qs = assembleTcs(g, { slots: ["9:00 AM - 10:00 AM"] });
    expect(qs).toHaveLength(100);
    expect(qs[0]).toMatchObject({ date: "2023-07-18", key: "B", options: ["opt 1a", "opt 1b", "opt 1c", "opt 1d"], questionId: "6306260" });
  });

  it("keeps a stem line's tail printed right of the panel's edge (11 Sep 2024 Q48)", () => {
    // "...dynasty from the" then "5th to 8th Century CE." as its own span at x 400, on a stem
    // line: only the panel's own lines (Question ID ... Chosen Option) are the panel.
    const g = shift(2, "9:00 AM - 10:00 AM", () => 0);
    g.spans = g.spans.flatMap((s) => (s.page === 2 && s.text === "Stem of 1" ? [s, { ...s, text: "5th to 8th Century CE.", x0: 400, x1: 470 }] : [s]));
    const [q] = assembleTcs(g);
    expect(q.stem).toBe("Stem of 1 5th to 8th Century CE.");
  });

  it("reads an unlabelled exam time split over two spans (18 Jul 2023: \"11 :45 AM -\" / \"12:45 PM\")", () => {
    const g = shift(2, "11:45 AM - 12:45 PM", () => 0);
    g.spans = g.spans.flatMap((s) => {
      if (s.text === "Exam Time") return [];
      if (s.text === "11:45 AM - 12:45 PM")
        return [span(s.page, 4, "18/07/2023 ", { x0: 131 }), { ...s, text: "11 :45 AM -", x0: 133, x1: 186 }, { ...s, text: "12:45 PM ", x0: 188, x1: 230 }];
      return [s];
    });
    const qs = assembleTcs(g, { slots: ["9:00 AM - 10:00 AM", "11:45 AM - 12:45 PM"] });
    expect(qs[0]).toMatchObject({ shift: 2, date: "2023-07-18" });
  });

  it("ignores a watermark picture repeated at one place on many pages (2022 print)", () => {
    const g = shift(2, "9:00 AM - 10:00 AM", () => 0);
    // It starts among Q1's options (1 Dec 2022 S2: y 283, the Question ID line at 314).
    for (let p = 2; p < 60; p++) g.images.push({ page: p, name: `wm${p}`, x0: 120, y0: 100, x1: 480, y1: 577 });
    const qs = assembleTcs(g);
    expect(qs[0].stemImages).toEqual([]);
    expect(qs[0].optionImages).toEqual([[], [], [], []]);
    expect(qs[0].regions[0].y1).toBeLessThan(250);
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

describe("assembleTcs, a sheet with no Question ID panel (CGL 2024 Tier II)", () => {
  it("ends a sheet's last question at the next sheet's logo and title, which print before its Exam Time", () => {
    const strip = (g: TcsGeometry): TcsGeometry => ({ spans: g.spans.filter((s) => !/^(Question ID|6306)/.test(s.text)), images: g.images });
    const a = strip(shift(2, "9:00 AM - 10:00 AM", () => 0));
    const b = strip(shift(60, "9:00 AM - 10:00 AM", () => 0));
    b.images.push({ page: 60, name: "logo", x0: 200, y0: 1, x1: 320, y1: 8 });
    b.spans.push(span(60, 4, "Combined Graduate Level Examination 2024 Tier II", { x0: 120 }), span(60, 7, "Exam Date", { x0: 50 }));
    const qs = assembleTcs({ spans: [...a.spans, ...b.spans], images: [...a.images, ...b.images] });
    const last = qs.find((q) => q.sheet === 0 && q.number === 100)!;
    expect(last.options[3]).toBe("opt 25d");
    expect(last.optionImages).toEqual([[], [], [], []]);
    expect(last.regions.every((r) => r.page < 60)).toBe(true);
  });
});

describe("assembleTcs, option text printed apart from its label", () => {
  it("files option text printed a hair ABOVE its own label under that label, not the one before (18 Jan 2025 Q55)", () => {
    // labels "1. ".."4. " with no text of their own; each option's text a span 1 pt higher
    const spans: TcsSpan[] = [
      ...header(2, "9:00 AM - 10:00 AM"),
      section(2, 30, "General Intelligence and Reasoning"),
      span(2, 60, "Q.1", { x0: 50, x1: 63, bold: true }),
      span(2, 60, "How is U related to L?", { bold: true }),
      span(2, 72, "Ans", { x0: 49, x1: 64, bold: true }),
    ];
    const texts = ["Son's wife's sister", "Son's wife's father", "Son's wife", "Son's wife's mother"];
    texts.forEach((t, i) => {
      const y = 73 + i * 18;
      spans.push(span(2, y - 1, t, { x0: 87, color: i === 1 ? GREEN : RED }));
      spans.push(span(2, y, `${i + 1}. `, { x0: 78, x1: 86, color: i === 1 ? GREEN : RED }));
    });
    const g: TcsGeometry = { spans, images: [] };
    const [q] = assembleTcs(g, { layout: [{ part: "A", match: /Reasoning/, count: 1, subjects: ["Reasoning"] }] });
    expect(q.options).toEqual(texts);
    expect(q.key).toBe("B");
  });
});

describe("assembleTcs, a headerless sheet (CGL 2019 Tier II, its first page cropped away)", () => {
  it("reads the questions as one sheet dated from config when no Exam Time header is printed", () => {
    const g = shift(2, "9:00 AM - 10:00 AM", (n) => n % 4);
    g.spans = g.spans.filter((s) => s.text !== "Exam Time" && s.text !== "9:00 AM - 10:00 AM");
    expect(() => assembleTcs(g)).toThrow(/before any Exam Time header/);
    const qs = assembleTcs(g, { headerless: { date: "2020-11-15" } });
    expect(qs).toHaveLength(100);
    expect(qs[0]).toMatchObject({ sheet: 0, shift: 1, date: "2020-11-15", number: 1 });
  });
});

describe("assembleTcs, Tier II", () => {
  const sheet = () => shift(2, "9:00 AM - 12:00 PM", (n) => n % 4, TIER2);

  it("reads 150 questions, numbering the modules 1-30, 31-60, 61-105, 106-130, 131-150", () => {
    const qs = assembleTcs(sheet(), { layout: LAYOUTS[2] });
    expect(qs).toHaveLength(150);
    expect(qs.map((q) => q.part).join("")).toBe("A".repeat(30) + "B".repeat(30) + "C".repeat(45) + "D".repeat(25) + "E".repeat(20));
    expect(qs[0]).toMatchObject({ part: "A", number: 1, key: "B" });
    expect(qs[60]).toMatchObject({ part: "C", number: 61 });
    expect(qs[105]).toMatchObject({ part: "D", number: 106 });
    expect(qs[149]).toMatchObject({ part: "E", number: 150, key: "C" });
  });

  it("refuses a Tier II sheet read with Tier I's layout, and a module longer than its count", () => {
    expect(() => assembleTcs(sheet())).toThrow(/unknown section "Module I Mathematical Abilities"/);
    const long: [string, number][] = TIER2.map(([n, c], i) => [n, i === 4 ? 21 : c]);
    expect(() => assembleTcs(shift(2, "9:00 AM - 12:00 PM", () => 0, long), { layout: LAYOUTS[2] })).toThrow(/Q21 is past the 20 questions of PART-E/);
  });
});

describe("groupTcsShifts", () => {
  const q = (sheet: number, date: string, shift: number, number: number, qid = `${date}-${shift}-${number}`): TcsQuestion => ({
    sheet, date, shift, part: "A", number, context: null, stem: "s", options: ["a", "b", "c", "d"], key: "A",
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
