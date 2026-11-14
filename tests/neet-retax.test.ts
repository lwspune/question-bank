import { describe, expect, it } from "vitest";
import { patchEntryText, planMoves, planToMoves, sourceKeyFor, updateSourceEntries, type RowNow } from "../scripts/neet/retaxLib";

const catalog = {
  Physics: ["Units and Measurements"],
  Chemistry: ["Biomolecules"],
  Botany: ["Biological Classification", "Molecular Basis of Inheritance"],
  Zoology: ["Animal Kingdom", "Biomolecules"],
};

const row = (over: Partial<RowNow> = {}): RowNow => ({
  id: "11111111-1111-1111-1111-111111111111",
  sourceFile: "NEET_UG_2022.pdf",
  number: "151",
  subject: "Zoology",
  chapter: "Animal Kingdom",
  subtopic: "Kingdom Monera",
  ...over,
});

describe("planMoves", () => {
  it("plans a move across subjects when the target chapter is in that subject's catalog", () => {
    const { errors, changes, unchanged } = planMoves(
      [{ id: row().id, subject: "Botany", chapter: "Biological Classification", subtopic: "Kingdom Monera", why: "Monera is Botany" }],
      [row()],
      catalog
    );
    expect(errors).toEqual([]);
    expect(unchanged).toEqual([]);
    expect(changes).toHaveLength(1);
    expect(changes[0].from).toMatchObject({ subject: "Zoology", chapter: "Animal Kingdom" });
    expect(changes[0].to).toMatchObject({ subject: "Botany", chapter: "Biological Classification", subtopic: "Kingdom Monera" });
  });

  it("refuses a chapter outside the target subject's catalog", () => {
    const { errors, changes } = planMoves(
      [{ id: row().id, subject: "Botany", chapter: "Animal Kingdom", subtopic: "x", why: "" }],
      [row()],
      catalog
    );
    expect(changes).toEqual([]);
    expect(errors[0]).toMatch(/not in the Botany catalog/);
  });

  it("refuses an id that is not a NEET row, a duplicate id and an empty subtopic", () => {
    const r = row();
    const { errors } = planMoves(
      [
        { id: "22222222-2222-2222-2222-222222222222", subject: "Botany", chapter: "Biological Classification", subtopic: "a", why: "" },
        { id: r.id, subject: "Botany", chapter: "Biological Classification", subtopic: "a", why: "" },
        { id: r.id, subject: "Botany", chapter: "Biological Classification", subtopic: "b", why: "" },
      ],
      [r],
      catalog
    );
    expect(errors.some((e) => /not found/.test(e))).toBe(true);
    expect(errors.some((e) => /more than once/.test(e))).toBe(true);

    const empty = planMoves([{ id: r.id, subject: "Botany", chapter: "Biological Classification", subtopic: "  ", why: "" }], [r], catalog);
    expect(empty.errors[0]).toMatch(/empty subtopic/);
  });

  it("reports a move to where the row already is as unchanged, not as a change", () => {
    const r = row();
    const { changes, unchanged, errors } = planMoves(
      [{ id: r.id, subject: "Zoology", chapter: "Animal Kingdom", subtopic: "Kingdom Monera", why: "" }],
      [r],
      catalog
    );
    expect(errors).toEqual([]);
    expect(changes).toEqual([]);
    expect(unchanged).toEqual([r.id]);
  });
});

describe("sourceKeyFor", () => {
  const papers = { "2022": "NEET_UG_2022.pdf", "reneet-2024": "RE_NEET_UG_2024.pdf" };
  const tests = { "13011": "PARIKSHA_VV_13011.pdf" };

  it("maps a NEET paper and a Pariksha test to their data folder and file prefix", () => {
    expect(sourceKeyFor("NEET_UG_2022.pdf", papers, tests)).toEqual({ lane: "neet", prefix: "2022." });
    expect(sourceKeyFor("RE_NEET_UG_2024.pdf", papers, tests)).toEqual({ lane: "neet", prefix: "reneet-2024." });
    expect(sourceKeyFor("PARIKSHA_VV_13011.pdf", papers, tests)).toEqual({ lane: "pariksha", prefix: "13011." });
  });

  it("returns null for a source it does not know (e.g. the GPCC book)", () => {
    expect(sourceKeyFor("GPCC_NKL_Physics_Vol2_Ch23_Ray_Optics.pdf", papers, tests)).toBeNull();
  });
});

describe("updateSourceEntries", () => {
  const files = {
    "2022.zoology.json": [
      { number: 151, subject: "Zoology", chapter: "Animal Kingdom", subtopic: "Kingdom Monera", stem: "s" },
      { number: 152, subject: "Zoology", chapter: "Animal Kingdom", subtopic: "Phyla", stem: "t" },
    ],
    "2022.botany.json": [{ number: 101, subject: "Botany", chapter: "Biological Classification", subtopic: "Viruses", stem: "u" }],
    "2022.figures.json": { "151": "fig" },
  };

  it("rewrites exactly the one entry with that number, across the paper's question files", () => {
    const { updated, matched } = updateSourceEntries(files, "151", {
      subject: "Botany",
      chapter: "Biological Classification",
      subtopic: "Kingdom Monera",
    });
    expect(matched).toBe(1);
    expect(updated["2022.zoology.json"][0]).toMatchObject({ number: 151, subject: "Botany", chapter: "Biological Classification" });
    expect(updated["2022.zoology.json"][1]).toEqual(files["2022.zoology.json"][1]);
    expect(Object.keys(updated)).toEqual(["2022.zoology.json"]);
  });

  it("reports 0 matches for a number no question file holds, and never touches non-question files", () => {
    const { matched, updated } = updateSourceEntries(files, "999", { subject: "Botany", chapter: "x", subtopic: "y" });
    expect(matched).toBe(0);
    expect(updated).toEqual({});
  });

  it("reports every match when two question files hold the same number, so the caller can refuse", () => {
    const dup = { ...files, "2022.zoology-b.json": [{ number: 151, subject: "Zoology", chapter: "Animal Kingdom", subtopic: "z", stem: "v" }] };
    expect(updateSourceEntries(dup, "151", { subject: "Botany", chapter: "x", subtopic: "y" }).matched).toBe(2);
  });
});

describe("planToMoves", () => {
  const dumpRows = [
    { id: "aaaaaaaa-0000-0000-0000-000000000001" },
    { id: "bbbbbbbb-0000-0000-0000-000000000002" },
    { id: "cccccccc-0000-0000-0000-000000000003" },
  ];
  const base = { subject: "Botany", chapter: "Cell Cycle and Cell Division" };

  it("turns pages of 8-character id prefixes into one move per row, refiles included", () => {
    const { errors, moves } = planToMoves(
      {
        ...base,
        pages: { "Mitosis": "aaaaaaaa bbbbbbbb" },
        refile: { cccccccc: { subject: "Botany", chapter: "Cell: The Unit of Life", subtopic: "Nucleus", why: "about the nucleus" } },
      },
      dumpRows
    );
    expect(errors).toEqual([]);
    expect(moves).toEqual([
      { id: dumpRows[0].id, subject: "Botany", chapter: "Cell Cycle and Cell Division", subtopic: "Mitosis", why: "notes re-cut" },
      { id: dumpRows[1].id, subject: "Botany", chapter: "Cell Cycle and Cell Division", subtopic: "Mitosis", why: "notes re-cut" },
      { id: dumpRows[2].id, subject: "Botany", chapter: "Cell: The Unit of Life", subtopic: "Nucleus", why: "about the nucleus" },
    ]);
  });

  it("refuses a row placed twice, a row left out, and a prefix the dump does not hold", () => {
    const { errors } = planToMoves({ ...base, pages: { A: "aaaaaaaa zzzzzzzz", B: "aaaaaaaa" } }, dumpRows);
    expect(errors.some((e) => /aaaaaaaa.*more than once/.test(e))).toBe(true);
    expect(errors.some((e) => /zzzzzzzz.*not in the dump/.test(e))).toBe(true);
    expect(errors.some((e) => /bbbbbbbb.*not placed/.test(e))).toBe(true);
    expect(errors.some((e) => /cccccccc.*not placed/.test(e))).toBe(true);
  });
});

describe("patchEntryText", () => {
  const raw = [
    "[",
    "  {",
    '    "number": 101,',
    '    "subject": "Botany",',
    '    "chapter": "Cell: The Unit of Life",',
    '    "subtopic": "Enzymes",',
    '    "options": ["a", "b", "c", "d"],',
    '    "stem": "x"',
    "  },",
    "  {",
    '    "number": 1010,',
    '    "subject": "Botany",',
    '    "chapter": "Cell: The Unit of Life",',
    '    "subtopic": "Enzymes",',
    '    "stem": "y"',
    "  }",
    "]",
  ].join("\r\n");

  it("rewrites only the three fields of the entry with that number, leaving every other byte alone", () => {
    const { text, matched } = patchEntryText(raw, "101", { subject: "Zoology", chapter: "Biomolecules", subtopic: "Enzymes" });
    expect(matched).toBe(1);
    expect(text).toBe(
      raw
        .replace('"subject": "Botany",\r\n    "chapter": "Cell: The Unit of Life"', '"subject": "Zoology",\r\n    "chapter": "Biomolecules"')
    );
    expect(text).toContain('"options": ["a", "b", "c", "d"],');
    expect(JSON.parse(text)[1]).toMatchObject({ number: 1010, subject: "Botany" });
  });

  it("escapes the new values as JSON and matches a number stored as a string", () => {
    const r = raw.replace('"number": 101,', '"number": "101",');
    const { text, matched } = patchEntryText(r, "101", { subject: "Botany", chapter: "A \"quoted\" one", subtopic: "B" });
    expect(matched).toBe(1);
    expect(JSON.parse(text)[0].chapter).toBe('A "quoted" one');
  });

  it("reports 0 for a number no entry has", () => {
    expect(patchEntryText(raw, "7", { subject: "x", chapter: "y", subtopic: "z" }).matched).toBe(0);
  });
});
