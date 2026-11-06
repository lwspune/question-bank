/**
 * SSC CGL reprints (2026-11-06). When a shift reprinted a question the bank
 * already held, the ingestion kept ONE row and listed the reprint in
 * scripts/ssc-cgl/repeats.json. A homework plan counts sittings from rows, so
 * without this a question SSC asked twice would rank as "asked once".
 */
import { describe, expect, it } from "vitest";
import { addReprints, reprintSittings, type AssembledGroup } from "@/lib/homework/reprints";

const labels: Record<string, string> = {
  "t1-2025-09-12-s3": "12 Sep 2025 S3",
  "t1-2025-09-14-s3": "14 Sep 2025 S3",
};
const labelOf = (key: string) => labels[key];

describe("reprintSittings", () => {
  it("maps each reprinted question to the shifts that reprinted it, Tier I only", () => {
    const got = reprintSittings(
      {
        "t1-2025-09-12-s3": [{ questionId: "q1" }],
        "t1-2025-09-14-s3": [{ questionId: "q1" }, { questionId: "q2" }],
        "t2-2025-01-18-s1": [{ questionId: "q9" }],
      },
      labelOf
    );
    expect(Object.fromEntries(got)).toEqual({ q1: ["12 Sep 2025 S3", "14 Sep 2025 S3"], q2: ["14 Sep 2025 S3"] });
  });

  it("refuses a shift it cannot name, never guessing", () => {
    expect(() => reprintSittings({ "t1-2030-01-01-s1": [{ questionId: "q1" }] }, labelOf)).toThrow(/t1-2030-01-01-s1/);
  });
});

describe("addReprints", () => {
  const yearOf = (id: string) => ({ q1: "16 Sep 2025 S2", q2: "9 Sep 2024 S1", q3: "1 Aug 2023 S4" })[id]!;

  it("adds the reprint shifts to the question's repeat group", () => {
    const groups: AssembledGroup[] = [
      { tier: "repeat", label: "Same profit question", sittings: ["9 Sep 2024 S1*", "16 Sep 2025 S2"], questionIds: ["q1", "q2"] },
    ];
    const got = addReprints(groups, new Map([["q1", ["12 Sep 2025 S3"]]]), yearOf);
    expect(got[0].sittings).toEqual(["9 Sep 2024 S1*", "12 Sep 2025 S3", "16 Sep 2025 S2"]);
  });

  it("gives a reprinted question in no repeat group a group of its own", () => {
    const got = addReprints([], new Map([["q1", ["12 Sep 2025 S3", "14 Sep 2025 S3"]]]), yearOf);
    expect(got).toEqual([
      {
        tier: "repeat",
        label: "Reprinted word for word",
        sittings: ["12 Sep 2025 S3", "14 Sep 2025 S3", "16 Sep 2025 S2"],
        questionIds: ["q1"],
      },
    ]);
  });

  it("leaves type groups and other repeats alone", () => {
    const groups: AssembledGroup[] = [
      { tier: "type", label: "Successive discounts", sittings: ["1 Aug 2023 S4", "16 Sep 2025 S2"], questionIds: ["q3", "q1"] },
      { tier: "repeat", label: "Other", sittings: ["1 Aug 2023 S4", "9 Sep 2024 S1"], questionIds: ["q3", "q2"] },
    ];
    const got = addReprints(groups, new Map([["q1", ["12 Sep 2025 S3"]]]), yearOf);
    expect(got.slice(0, 2)).toEqual(groups);
    expect(got[2].questionIds).toEqual(["q1"]);
  });
});
