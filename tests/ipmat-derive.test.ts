// Spec for the IPMAT blind-derivation loop (scripts/ipmat/derive.ts).
//
// WHY A LOOP AT ALL. IIM Indore publishes no IPMAT answer key and afterboards
// claims none, so all 1,445 keys are the source's own derivation — the BLIND
// lane in this project's key-trust triage. A key that is confidently wrong is
// worse than no key, so the keys have to be re-derived before anything ships.
//
// THE MEASUREMENT IS THE POINT, AND IT IS FRAGILE. Two rules protect it:
//
//   1. A PACKET MUST NOT CARRY THE ANSWER. Not the key index, not the
//      `isCorrect` flag, not a field that happens to correlate with it. Having
//      seen the key destroys the measurement, and on CDS this project already
//      learned that "out of the repo" is not "out of reach" — a key file moved
//      to a shared scratchpad was still listed by name.
//   2. AGREEMENT IS NOT ACCURACY. The scorer reports agreement with the
//      source, and that is all it can report. On CDS General Knowledge the real
//      score was 91.6% where dual-blind AGREEMENT read 98-99%. So the summary
//      must never be labelled accuracy, and a disagreement is a LEAD to
//      adjudicate, not a verdict.
import { describe, it, expect } from "vitest";
import {
  buildPacket,
  scoreDerivation,
  stratifiedSample,
  type PacketRow,
} from "../scripts/ipmat/derive";

type Src = {
  sourceId: string;
  exam: "ipmat-indore" | "ipmat-rohtak" | "jipmat";
  year: number;
  section: string;
  questionNumber: number;
  sourceTopic: string | null;
  sourceSubTopic: string | null;
  format: "mcq" | "numeric";
  text: string;
  context: string | null;
  options: { label: string; text: string; isCorrect: boolean; imageUrl: string | null }[];
  numericAnswer: string | null;
  dropped: boolean;
  reconstructed: boolean;
  problems: string[];
  figures: unknown[];
};

function mcq(n: number, correct: number, extra: Partial<Src> = {}): Src {
  return {
    sourceId: `id${n}`,
    exam: "jipmat",
    year: 2025,
    section: "QA",
    questionNumber: n,
    sourceTopic: "Arithmetic",
    sourceSubTopic: "Averages",
    format: "mcq",
    text: `question ${n}`,
    context: null,
    options: ["A", "B", "C", "D"].map((label, i) => ({
      label,
      text: `opt ${label}`,
      isCorrect: i + 1 === correct,
      imageUrl: null,
    })),
    numericAnswer: null,
    dropped: false,
    reconstructed: false,
    problems: [],
    figures: [],
    ...extra,
  };
}

function numeric(n: number, answer: string, extra: Partial<Src> = {}): Src {
  return { ...mcq(n, 1, extra), format: "numeric", options: [], numericAnswer: answer };
}

describe("buildPacket — the answer must not leak", () => {
  const packet = buildPacket([mcq(1, 3), numeric(2, "42")]);

  it("carries the stem, context and options", () => {
    expect(packet.rows[0].text).toBe("question 1");
    expect(packet.rows[0].options?.map((o) => o.label)).toEqual(["A", "B", "C", "D"]);
    expect(packet.rows[0].options?.map((o) => o.text)).toEqual(["opt A", "opt B", "opt C", "opt D"]);
  });

  it("carries NO isCorrect flag on any option", () => {
    const serialised = JSON.stringify(packet);
    expect(serialised).not.toContain("isCorrect");
    for (const o of packet.rows[0].options ?? []) {
      expect(Object.keys(o).sort()).toEqual(["label", "text"]);
    }
  });

  it("carries NO numericAnswer", () => {
    expect(JSON.stringify(packet)).not.toContain("numericAnswer");
    expect(JSON.stringify(packet)).not.toContain("42");
  });

  it("carries no field named like an answer at all", () => {
    // A blanket check, because the leak that matters is the one nobody thought
    // to exclude by name.
    const keys = new Set<string>();
    const walk = (v: unknown) => {
      if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") {
        for (const [k, inner] of Object.entries(v)) {
          keys.add(k);
          walk(inner);
        }
      }
    };
    walk(packet);
    for (const k of keys) {
      expect(k, `packet field "${k}" looks like an answer`).not.toMatch(
        /answer|correct|key|solution|verdict|difficulty/i
      );
    }
  });

  it("keeps a stable id so the scorer can join back", () => {
    expect(packet.rows.map((r) => r.id)).toEqual(["id1", "id2"]);
  });

  it("says which format each row is, so a deriver knows what to produce", () => {
    expect(packet.rows[0].format).toBe("mcq");
    expect(packet.rows[1].format).toBe("numeric");
    expect(packet.rows[1].options).toBeUndefined();
  });

  it("excludes rows that are not committable", () => {
    const built = [
      mcq(1, 1),
      mcq(2, 1, { reconstructed: true }),
      mcq(3, 1, { dropped: true }),
      mcq(4, 1, { problems: ["broken"] }),
    ];
    expect(buildPacket(built).rows.map((r) => r.id)).toEqual(["id1"]);
  });

  it("records the commit it was built from, so a score can be reproduced", () => {
    const p = buildPacket([mcq(1, 1)], { commit: "abc1234" });
    expect(p.commit).toBe("abc1234");
  });
});

describe("scoreDerivation", () => {
  const built = [mcq(1, 3), mcq(2, 1), numeric(3, "42"), numeric(4, "7")];

  it("scores an all-agreeing derivation", () => {
    const res = scoreDerivation(built, { id1: "C", id2: "A", id3: "42", id4: "7" });
    expect(res.scored).toBe(4);
    expect(res.agreed).toBe(4);
    expect(res.disagreed).toHaveLength(0);
    expect(res.agreementPct).toBe(100);
  });

  it("names each disagreement as a LEAD, with both answers", () => {
    const res = scoreDerivation(built, { id1: "B", id2: "A", id3: "41", id4: "7" });
    expect(res.agreed).toBe(2);
    expect(res.disagreed).toHaveLength(2);
    const lead = res.disagreed.find((d) => d.id === "id1")!;
    expect(lead.ours).toBe("B");
    expect(lead.source).toBe("C");
    expect(lead.verdict).toBe("LEAD");
  });

  it("accepts an MCQ answer given as an index as well as a letter", () => {
    const res = scoreDerivation(built, { id1: "3", id2: "1", id3: "42", id4: "7" });
    expect(res.agreed).toBe(4);
  });

  it("is case and space insensitive on a letter", () => {
    expect(scoreDerivation([mcq(1, 3)], { id1: " c " }).agreed).toBe(1);
  });

  it("compares a numeric answer by VALUE, not by string", () => {
    // "7.0" and "7" are the same answer; a string compare would manufacture a
    // disagreement and send someone to adjudicate nothing.
    expect(scoreDerivation([numeric(1, "7")], { id1: "7.0" }).agreed).toBe(1);
    expect(scoreDerivation([numeric(1, "7")], { id1: "07" }).agreed).toBe(1);
  });

  it("counts a row nobody derived as UNANSWERED, never as agreement", () => {
    const res = scoreDerivation(built, { id1: "C" });
    expect(res.scored).toBe(1);
    expect(res.unanswered).toBe(3);
    expect(res.agreementPct).toBe(100); // of what was scored, and only that
  });

  it("refuses to report a percentage off an empty sample", () => {
    // 0/0 is not 100%. Reporting one would be the most confident wrong number
    // available.
    const res = scoreDerivation(built, {});
    expect(res.scored).toBe(0);
    expect(res.agreementPct).toBeNull();
  });

  it("reports an answer for an id that is not in the corpus", () => {
    const res = scoreDerivation(built, { id1: "C", nope: "A" });
    expect(res.unknownIds).toEqual(["nope"]);
  });

  it("rejects an unparseable MCQ answer instead of scoring it wrong", () => {
    const res = scoreDerivation([mcq(1, 3)], { id1: "maybe C?" });
    expect(res.invalid).toEqual([{ id: "id1", given: "maybe C?" }]);
    expect(res.scored).toBe(0);
  });

  it("breaks agreement down by section, which is where the risk differs", () => {
    const rows = [
      mcq(1, 1, { section: "QA" }),
      mcq(2, 1, { section: "QA" }),
      mcq(3, 1, { section: "VA" }),
      mcq(4, 1, { section: "VA" }),
    ];
    const res = scoreDerivation(rows, { id1: "A", id2: "A", id3: "A", id4: "B" });
    expect(res.bySection.QA).toEqual({ scored: 2, agreed: 2 });
    expect(res.bySection.VA).toEqual({ scored: 2, agreed: 1 });
  });
});

describe("stratifiedSample", () => {
  const pool: PacketRow[] = Array.from({ length: 120 }, (_, i) => ({
    id: `id${i}`,
    exam: "jipmat",
    year: 2025,
    section: i < 40 ? "QA" : i < 80 ? "LR" : "VA",
    questionNumber: i,
    format: "mcq",
    text: `q${i}`,
    context: null,
    options: [],
    strata: i < 40 ? "QA/Averages" : i < 80 ? "LR/Puzzles" : `VA/${i % 3}`,
  }));

  it("returns the requested size", () => {
    expect(stratifiedSample(pool, 30, 1).length).toBe(30);
  });

  it("covers every stratum when the size allows", () => {
    const strata = new Set(pool.map((r) => r.strata));
    const got = new Set(stratifiedSample(pool, strata.size, 1).map((r) => r.strata));
    expect(got.size).toBe(strata.size);
  });

  it("is deterministic for a given seed, so a score is reproducible", () => {
    expect(stratifiedSample(pool, 20, 7).map((r) => r.id)).toEqual(
      stratifiedSample(pool, 20, 7).map((r) => r.id)
    );
  });

  it("gives a different sample for a different seed", () => {
    expect(stratifiedSample(pool, 20, 1).map((r) => r.id)).not.toEqual(
      stratifiedSample(pool, 20, 2).map((r) => r.id)
    );
  });

  it("never repeats a row", () => {
    const ids = stratifiedSample(pool, 60, 3).map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("returns the whole pool when asked for more than it holds", () => {
    expect(stratifiedSample(pool, 500, 1).length).toBe(pool.length);
  });
});
