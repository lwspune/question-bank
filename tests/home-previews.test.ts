import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { BAND_ORDER, labelFor } from "@/lib/performance/masteryMap";
import { buildResultHeadline } from "@/lib/mocks/resultHeadline";
import { FIX_SAMPLE, MAP_SAMPLE, PULSE_SAMPLE, SCORE_SAMPLE } from "@/lib/home/previewSamples";

/**
 * The homepage shows the product's own screens with sample data (2026-11-09):
 * How it works (a mock result, Review, the map) and What's inside. The samples
 * are typed with the real data types, so a change of shape breaks the build;
 * these tests hold that the numbers on the screens agree with each other, since
 * a preview that contradicts itself reads as a fake.
 */
const read = (...p: string[]) => readFileSync(join(process.cwd(), ...p), "utf8");

describe("the mock result sample", () => {
  it("adds up: right, wrong and left make the paper, sections make the score", () => {
    const { correct, wrong, skipped, sections, score, maxScore } = SCORE_SAMPLE;
    expect(correct + wrong + skipped).toBe(SCORE_SAMPLE.questions);
    expect(sections.reduce((s, x) => s + x.score, 0)).toBe(score);
    expect(sections.reduce((s, x) => s + x.maxScore, 0)).toBe(maxScore);
  });

  it("prints no unanswered line, whose live copy carries an em dash (no dashes in visible text)", () => {
    expect(SCORE_SAMPLE.headline.detail).toBeNull();
  });

  it("carries the headline the real result page would print for those numbers", () => {
    const { correct, wrong, skipped, score, maxScore } = SCORE_SAMPLE;
    expect(SCORE_SAMPLE.headline).toEqual(buildResultHeadline({ correct, wrong, skipped, score, maxScore }));
  });
});

describe("the Review sample", () => {
  it("adds up: chapters make the total, reasons make each chapter", () => {
    expect(FIX_SAMPLE.chapters.reduce((s, c) => s + c.count, 0)).toBe(FIX_SAMPLE.total);
    for (const c of FIX_SAMPLE.chapters) expect(c.wrong + c.reviewLater + c.vUnclear, c.name).toBe(c.count);
  });

  it("lists the most to fix first, as the real tab does", () => {
    const counts = FIX_SAMPLE.chapters.map((c) => c.count);
    expect(counts).toEqual([...counts].sort((a, b) => b - a));
  });
});

describe("the map sample", () => {
  it("counts each tile's dots by band, and labels the tile by the map's own rule", () => {
    for (const t of MAP_SAMPLE) {
      for (const band of BAND_ORDER) {
        expect(t.counts[band], `${t.chapter} ${band}`).toBe(t.dots.filter((d) => d.band === band).length);
      }
      expect(t.label, t.chapter).toBe(labelFor(t.counts));
    }
  });
});

describe("the Home sample agrees with the Review sample", () => {
  it("shows the same number waiting", () => {
    expect(PULSE_SAMPLE.due).toBe(FIX_SAMPLE.total);
  });

  it("hands Review its fixed count, so the homepage's Review never fetches the pulse", () => {
    const previews = readFileSync(join(process.cwd(), "src", "components", "home", "HomePreviews.tsx"), "utf8");
    expect(previews).toMatch(/<FixOverview[^>]*\sfixed=\{/);
    expect(PULSE_SAMPLE.totals?.fixed).toBeGreaterThan(0);
  });

  it("names the same three weakest chapters, with the same counts", () => {
    const top = FIX_SAMPLE.chapters.slice(0, 3).map((c) => [c.name, c.count]);
    expect((PULSE_SAMPLE.weak ?? []).map((w) => [w.name, w.due])).toEqual(top);
  });
});

describe("the previews on the homepage", () => {
  const frame = read("src", "components", "home", "ScreenPreview.tsx");
  const previews = read("src", "components", "home", "HomePreviews.tsx");
  const home = read("src", "components", "home", "HomeLanding.tsx");

  it("are pictures, not controls: inert, one image role, one description", () => {
    // A non-empty value: React 18 drops inert="" from the HTML.
    expect(frame).toContain('inert: "true"');
    expect(frame).toContain('role="img"');
    expect(frame).toContain("aria-label={label}");
  });

  it("never fetch, so the cached homepage stays a picture of the product", () => {
    expect(previews).not.toContain("fetch(");
    expect(frame).not.toContain("fetch(");
  });

  it("describe every screen they show", () => {
    const labels = [...previews.matchAll(/<ScreenPreview[^>]*\blabel="([^"]+)"/g)].map((m) => m[1]);
    expect(labels.length).toBeGreaterThanOrEqual(7);
    for (const l of labels) expect(l.length, l).toBeGreaterThan(20);
  });

  it("appear in How it works, What's inside and For teachers", () => {
    for (const name of ["MockResultPreview", "ReviewPreview", "MapPreview", "TeacherPaperPreview"]) {
      expect(home, name).toContain(`<${name}`);
    }
  });
});

describe("the map tile is one component", () => {
  it("is what the map page renders, so the homepage shows the real tile", () => {
    const page = read("src", "app", "me", "map", "page.tsx");
    expect(page).toContain('from "@/components/performance/MapTile"');
    expect(page).not.toMatch(/\nfunction Tile\(/);
  });
});
