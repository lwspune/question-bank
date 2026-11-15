/**
 * The study-circle button test was retired early (owner, 2026-11-15): 157
 * students saw the card and 6 said Yes (3.8%), against a bar of 40 Yes and
 * 10%. The card, its route and its Home read are gone; the table and the
 * growth readout stay so the result can still be read.
 */
import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(__dirname, "..");
const read = (p: string) => readFileSync(resolve(root, p), "utf8");

describe("study circle retired", () => {
  it("Home no longer renders the card", () => {
    expect(read("src/app/me/MeView.tsx")).not.toMatch(/StudyCircleCard|studyCircleAsk/);
    expect(existsSync(resolve(root, "src/app/me/StudyCircleCard.tsx"))).toBe(false);
  });

  it("Home's loader no longer reads whether to ask", () => {
    expect(read("src/lib/me/load.ts")).not.toMatch(/studyCircle/i);
    expect(existsSync(resolve(root, "src/lib/studyCircle/server.ts"))).toBe(false);
  });

  it("the route that recorded sightings and answers is gone", () => {
    expect(existsSync(resolve(root, "src/app/api/study-circle/route.ts"))).toBe(false);
  });

  it("the readout stays, so the result is still readable", () => {
    expect(existsSync(resolve(root, "src/lib/studyCircle/readout.ts"))).toBe(true);
    expect(read("src/app/dashboard/growth/page.tsx")).toMatch(/loadStudyCircleReadout/);
  });

  it("the experiment is recorded as decided", async () => {
    const { EXPERIMENTS } = await import("@/lib/growth/registry");
    const e = EXPERIMENTS.find((x) => x.id === "study-circle");
    expect(e?.status).toBe("decided");
    expect(e?.decision).toMatch(/6 of 157/);
  });
});
