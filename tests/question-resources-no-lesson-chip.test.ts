import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { getQuestionResources } from "@/lib/links/questionResources";

// The Concept Ladder chip linked MHT-CET Circle questions to www.conceptladder.in, which
// answered every page with HTTP 402 (Vercel DEPLOYMENT_DISABLED); the daily check first failed on 2026-11-02. The owner
// chose to remove the chip (TECH_DEBT_SPEC.md D1, 2026-11-05). These checks keep it gone.

const CIRCLE = {
  examName: "MHT-CET",
  subjectName: "Maths",
  chapterName: "Circle",
  subtopicName: "Two Circles — Touching, Common Tangents and Relative Position",
};

function filesUnder(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    return statSync(p).isDirectory() ? filesUnder(p) : /\.(ts|tsx)$/.test(name) ? [p] : [];
  });
}

describe("no external lesson chip on question cards", () => {
  it("resources for a question carry only the guide and notes links", () => {
    expect(Object.keys(getQuestionResources(CIRCLE)).sort()).toEqual(["guide", "notes"]);
  });

  it("no source file links to conceptladder.in", () => {
    const hits = filesUnder(path.resolve(__dirname, "../src")).filter((f) =>
      readFileSync(f, "utf8").includes("conceptladder.in")
    );
    expect(hits).toEqual([]);
  });
});
