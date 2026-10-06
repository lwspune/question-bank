import { describe, it, expect } from "vitest";
import { PAPERS, type Paper } from "../scripts/mpsc-mains/config";
import {
  deriveMainsSittings,
  mainsBlueprint,
  mainsChapterBlueprint,
  mainsScheme,
  MAINS_EXAM_SLUG,
} from "../scripts/mocks/mpscMainsSittings";
import { getExamBySlug } from "../src/lib/exam/examContext";

const byId = (id: string) => PAPERS.find((p) => p.id === id)!;

describe("mainsScheme — read off each booklet's cover", () => {
  it("the 200-question papers ran 2 hours at -1/4 (ASO/STI 2009, ASO 2012 covers)", () => {
    for (const id of ["asosti-2009", "aso-2012", "sti-2011", "psi-2011"]) {
      expect(mainsScheme(byId(id), byId(id).exams[0])).toEqual({ durationSecs: 120 * 60, correct: 1, wrong: -0.25 });
    }
  });

  it("the 100-question Group B papers ran 1 hour at -1/4 (ASO 2014, PSI 2016, Group B 2018 covers)", () => {
    for (const id of ["aso-2014", "psi-2016", "grpb-2018", "sti-2017"]) {
      expect(mainsScheme(byId(id), byId(id).exams[0])).toEqual({ durationSecs: 60 * 60, correct: 1, wrong: -0.25 });
    }
  });

  it("State Services Mains docks a question for every THREE wrong answers (2016-2018 covers)", () => {
    for (const id of ["ssm-2016", "ssm-2017", "ssm-2018"]) {
      const s = mainsScheme(byId(id), "ssm");
      expect(s.durationSecs).toBe(60 * 60);
      expect(s.wrong).toBeCloseTo(-1 / 3, 10);
    }
  });
});

describe("mainsBlueprint", () => {
  it("maps every exam key to a registered exam slug", () => {
    for (const slug of Object.values(MAINS_EXAM_SLUG)) expect(getExamBySlug(slug)).toBeTruthy();
  });

  it("is one section whose hard count is the printed question count", () => {
    const bp = mainsBlueprint(byId("aso-2012"), "aso");
    expect(bp.examName).toBe("MPSC ASO Mains");
    expect(bp.examSlug).toBe("mpsc-aso-mains");
    expect(bp.sections).toHaveLength(1);
    expect(bp.sections[0].count).toBe(200);
    expect(bp.marking).toEqual({ correct: 1, wrong: -0.25 });
  });

  it("spans every subject the ingest files rows under (the 2018 joint paper carries GK)", () => {
    expect([...mainsBlueprint(byId("grpb-2018"), "grpb").sections[0].subjects].sort()).toEqual(
      ["English", "General Knowledge", "Marathi"]
    );
  });
});

describe("mainsChapterBlueprint — the paper a chapter test is cut from", () => {
  it("runs at every printed paper's own rate: 36 seconds a question", () => {
    for (const exam of Object.keys(MAINS_EXAM_SLUG) as (keyof typeof MAINS_EXAM_SLUG)[]) {
      const bp = mainsChapterBlueprint(exam);
      expect(bp.durationSecs / bp.sections[0].count!).toBe(36);
    }
  });

  it("keeps each exam's own penalty: -1/3 for State Services, -1/4 for the rest", () => {
    expect(mainsChapterBlueprint("ssm").marking.wrong).toBeCloseTo(-1 / 3, 10);
    for (const exam of ["aso", "sti", "psi", "grpb"] as const) {
      expect(mainsChapterBlueprint(exam).marking).toEqual({ correct: 1, wrong: -0.25 });
    }
  });

  it("files under the same paper and section as that exam's full-paper mocks", () => {
    const full = mainsBlueprint(byId("aso-2014"), "aso");
    const ch = mainsChapterBlueprint("aso");
    expect(ch.examSlug).toBe("mpsc-aso-mains");
    expect(ch.examName).toBe(full.examName);
    expect(ch.code).toBe(full.code);
    expect(ch.sections.map((s) => s.key)).toEqual(["language"]);
    expect([...ch.sections[0].subjects].sort()).toEqual(["English", "Marathi"]);
  });
});

describe("deriveMainsSittings", () => {
  const key = (map: Record<number, string>) => () => map;

  it("emits one sitting per exam the booklet was sat for (2009 joint paper -> ASO + STI)", () => {
    const s = deriveMainsSittings([byId("asosti-2009")], key({ 15: "#", 35: "#", 1: "B" }));
    expect(s.map((x) => x.slug)).toEqual(["mpsc-aso-mains-2009", "mpsc-sti-mains-2009"]);
    expect(s[0].sourceFile).toBe("MPSC-Mains-asosti-2009-TNS-ASO");
    expect(s[0].graceNumbers).toEqual([15, 35]);
    expect(s[0].title).toBe("MPSC ASO Mains 2009 — 14 Aug 2010");
  });

  it("skips dropped papers and every registered paper yields a unique slug", () => {
    const s = deriveMainsSittings(PAPERS, key({}));
    expect(s.some((x) => x.key.startsWith("psi-2012"))).toBe(false);
    expect(new Set(s.map((x) => x.slug)).size).toBe(s.length);
    const live = PAPERS.filter((p: Paper) => !p.dropped).reduce((n, p) => n + p.exams.length, 0);
    expect(s).toHaveLength(live);
  });

  it("refuses a paper with a scan gap — it can never be a whole-paper mock", () => {
    const gappy = { ...byId("aso-2012"), missingQuestions: [7] };
    expect(() => deriveMainsSittings([gappy], key({}))).toThrow(/gap/);
  });
});
