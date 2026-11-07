/**
 * "Asked in NDA" (exam twins, migration 0220): the line a board question
 * carries, and the chapter's count. Pure, so every wording rule is pinned here.
 *
 * The rules that keep it compact however many exams are matched (owner,
 * 2026-11-06): one line per question; "similar" alone gets a quiet line and
 * never counts as "asked"; the student's own exam is named first.
 */
import { describe, it, expect } from "vitest";
import { chapterTwinLine, summariseTwins, tallyChapterTwins, type TwinLink } from "@/lib/crossExam/summary";

let n = 0;
function link(over: Partial<TwinLink> & Pick<TwinLink, "kind" | "paper">): TwinLink {
  n += 1;
  return {
    targetId: `t${n}`,
    examName: "NDA",
    examLabel: "NDA",
    paperOrder: 202301,
    ...over,
  };
}

describe("summariseTwins", () => {
  it("returns null for a question with no links", () => {
    expect(summariseTwins([])).toBeNull();
  });

  it("names the one paper for a single exact match", () => {
    const s = summariseTwins([link({ kind: "exact", paper: "NDA 2 2023" })]);
    expect(s).toMatchObject({ tone: "asked", label: "Asked in NDA 2 2023", detail: "same question" });
  });

  it("says new numbers for a single numbers match", () => {
    const s = summariseTwins([link({ kind: "numbers", paper: "NDA 1 2019" })]);
    expect(s).toMatchObject({ label: "Asked in NDA 1 2019", detail: "new numbers" });
  });

  it("counts papers when one exam asked it more than once", () => {
    const s = summariseTwins([
      link({ kind: "numbers", paper: "NDA 2 2017", paperOrder: 201709 }),
      link({ kind: "numbers", paper: "NDA 1 2019", paperOrder: 201904 }),
    ]);
    expect(s).toMatchObject({ label: "Asked in NDA", detail: "2 papers · new numbers" });
  });

  it("drops the kind when exact and numbers are mixed", () => {
    const s = summariseTwins([
      link({ kind: "exact", paper: "NDA 2 2017" }),
      link({ kind: "numbers", paper: "NDA 1 2019" }),
    ]);
    expect(s).toMatchObject({ label: "Asked in NDA", detail: "2 papers" });
  });

  it("counts a paper once when two of its questions match (a set)", () => {
    const s = summariseTwins([
      link({ kind: "numbers", paper: "NDA 2 2022" }),
      link({ kind: "numbers", paper: "NDA 2 2022" }),
    ]);
    expect(s).toMatchObject({ label: "Asked in NDA 2 2022", detail: "new numbers" });
    expect(s!.papers).toEqual(["NDA 2 2022"]);
    expect(s!.links).toHaveLength(2);
  });

  it("names up to two exams, the one with more papers first", () => {
    const s = summariseTwins([
      link({ kind: "numbers", paper: "MHT-CET 10 May 2025 S2", examName: "MHT-CET", examLabel: "MHT-CET" }),
      link({ kind: "numbers", paper: "NDA 2 2017" }),
      link({ kind: "exact", paper: "NDA 1 2019" }),
    ]);
    expect(s).toMatchObject({ label: "Asked in NDA, MHT-CET", detail: "3 papers" });
  });

  it("folds a third exam into +N", () => {
    const s = summariseTwins([
      link({ kind: "numbers", paper: "NDA 2 2017" }),
      link({ kind: "numbers", paper: "NDA 1 2019" }),
      link({ kind: "numbers", paper: "MHT-CET 2023 S1", examName: "MHT-CET", examLabel: "MHT-CET" }),
      link({ kind: "numbers", paper: "JEE 2024 S2", examName: "JEE Mains", examLabel: "JEE Main" }),
    ]);
    expect(s).toMatchObject({ label: "Asked in NDA, JEE Main +1", detail: "4 papers" });
  });

  it("names the student's own exam first", () => {
    const links = [
      link({ kind: "numbers", paper: "NDA 2 2017" }),
      link({ kind: "numbers", paper: "NDA 1 2019" }),
      link({ kind: "numbers", paper: "MHT-CET 2023 S1", examName: "MHT-CET", examLabel: "MHT-CET" }),
    ];
    expect(summariseTwins(links, "MHT-CET")!.label).toBe("Asked in MHT-CET, NDA");
    expect(summariseTwins(links, "MHT-CET")!.links[0].examName).toBe("MHT-CET");
  });

  it("ignores a preferred exam that has no link", () => {
    const s = summariseTwins([link({ kind: "numbers", paper: "NDA 1 2019" })], "NEET");
    expect(s!.label).toBe("Asked in NDA 1 2019");
  });

  it("builds the line from asked links only, keeping similar ones in the panel after them", () => {
    const s = summariseTwins([
      link({ kind: "similar", paper: "NDA 1 2024", paperOrder: 202404 }),
      link({ kind: "numbers", paper: "NDA 1 2019", paperOrder: 201904 }),
    ]);
    expect(s).toMatchObject({ tone: "asked", label: "Asked in NDA 1 2019", detail: "new numbers" });
    expect(s!.links.map((l) => l.kind)).toEqual(["numbers", "similar"]);
  });

  it("gives a similar-only question a quiet line naming its papers", () => {
    expect(summariseTwins([link({ kind: "similar", paper: "NDA 1 2024" })])).toMatchObject({
      tone: "similar",
      label: "Similar to NDA 1 2024",
      detail: null,
    });
    expect(
      summariseTwins([
        link({ kind: "similar", paper: "NDA 2 2024", paperOrder: 202409 }),
        link({ kind: "similar", paper: "MHT-CET 2023 S1", examName: "MHT-CET", examLabel: "MHT-CET", paperOrder: 202305 }),
      ])!.label
    ).toBe("Similar to NDA 2 2024 · MHT-CET 2023 S1");
  });

  it("summarises a similar-only question with three or more papers by exam", () => {
    const s = summariseTwins([
      link({ kind: "similar", paper: "NDA 2 2024" }),
      link({ kind: "similar", paper: "NDA 1 2022" }),
      link({ kind: "similar", paper: "NDA 2 2019" }),
    ]);
    expect(s).toMatchObject({ tone: "similar", label: "Similar to NDA", detail: "3 papers" });
  });

  it("orders the panel by kind, then newest paper first", () => {
    const s = summariseTwins([
      link({ kind: "numbers", paper: "NDA 2 2017", paperOrder: 201709 }),
      link({ kind: "similar", paper: "NDA 2 2025", paperOrder: 202509 }),
      link({ kind: "exact", paper: "NDA 1 2020", paperOrder: 202004 }),
      link({ kind: "numbers", paper: "NDA 1 2024", paperOrder: 202404 }),
    ]);
    expect(s!.links.map((l) => l.paper)).toEqual(["NDA 1 2020", "NDA 1 2024", "NDA 2 2017", "NDA 2 2025"]);
    expect(s!.papers).toEqual(["NDA 1 2020", "NDA 1 2024", "NDA 2 2017", "NDA 2 2025"]);
  });

  it("lists each target question once even if it arrives twice", () => {
    const one = link({ kind: "numbers", paper: "NDA 1 2019" });
    expect(summariseTwins([one, { ...one }])!.links).toHaveLength(1);
  });
});

describe("tallyChapterTwins", () => {
  const nda = (kind: TwinLink["kind"]) => link({ kind, paper: "NDA 1 2019" });
  const cet = (kind: TwinLink["kind"]) =>
    link({ kind, paper: "MHT-CET 2023 S1", examName: "MHT-CET", examLabel: "MHT-CET" });

  it("counts board questions, not links, per exam", () => {
    const tally = tallyChapterTwins([
      [nda("numbers"), nda("exact")], // one question, two NDA links: counts once
      [nda("similar")],
      [nda("similar"), cet("numbers")],
      [],
    ]);
    expect(tally).toEqual([
      { examName: "NDA", examLabel: "NDA", asked: 1, similar: 2 },
      { examName: "MHT-CET", examLabel: "MHT-CET", asked: 1, similar: 0 },
    ]);
  });

  it("counts a question as asked, not similar, when an exam has both kinds", () => {
    expect(tallyChapterTwins([[nda("similar"), nda("numbers")]])).toEqual([
      { examName: "NDA", examLabel: "NDA", asked: 1, similar: 0 },
    ]);
  });

  it("puts the student's exam first, then the most asked", () => {
    const rows = [[nda("numbers")], [nda("numbers")], [cet("numbers")]];
    expect(tallyChapterTwins(rows).map((t) => t.examName)).toEqual(["NDA", "MHT-CET"]);
    expect(tallyChapterTwins(rows, "MHT-CET").map((t) => t.examName)).toEqual(["MHT-CET", "NDA"]);
  });

  it("returns nothing for a chapter with no links", () => {
    expect(tallyChapterTwins([[], []])).toEqual([]);
  });
});

/**
 * The /board chapter page's one-line summary (2026-11-07, owner OK'd on a
 * mockup): the box it replaces took ~130 px of a phone screen, so the line
 * says the count and the total in one sentence. The total is named ("of the
 * 142 questions here") because the header above counts the textbook alone.
 */
describe("chapterTwinLine", () => {
  const show = (parts: { text: string; bold?: boolean }[]) => parts.map((p) => (p.bold ? `**${p.text}**` : p.text)).join("");
  const t = (examLabel: string, asked: number, similar: number) => ({ examName: examLabel, examLabel, asked, similar });

  it("one exam, asked and similar", () => {
    expect(show(chapterTwinLine([t("NDA", 51, 21)], 142))).toBe("**51** of the 142 questions here were asked in NDA · **21** similar");
  });

  it("one exam, asked only", () => {
    expect(show(chapterTwinLine([t("NDA", 51, 0)], 142))).toBe("**51** of the 142 questions here were asked in NDA");
  });

  it("one exam, similar only: never called asked", () => {
    expect(show(chapterTwinLine([t("NDA", 0, 21)], 142))).toBe("**21** of the 142 questions here are similar to NDA questions");
  });

  it("several exams: each exam's asked count, the student's exam first as tallied", () => {
    expect(show(chapterTwinLine([t("NDA", 51, 3), t("JEE Main", 12, 0), t("CDS", 0, 4)], 142))).toBe(
      "Of the 142 questions here, asked in NDA **51** · JEE Main **12**"
    );
  });

  it("several exams, none asked: each exam's similar count, never summed (one question can match two exams)", () => {
    expect(show(chapterTwinLine([t("NDA", 0, 3), t("CDS", 0, 4)], 142))).toBe(
      "Of the 142 questions here, similar to NDA **3** · CDS **4**"
    );
  });

  it("nothing matched: nothing to show", () => {
    expect(chapterTwinLine([], 142)).toEqual([]);
  });

  it("carries no dash", () => {
    expect(show(chapterTwinLine([t("NDA", 51, 21)], 142))).not.toMatch(/[\u2013\u2014]|--/);
  });
});
