import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { scanTree, toBaseline, compareToBaseline } from "../scripts/lib/voiceProbe";

/**
 * The em-dash ratchet: no file under src/ may gain a dash in visible text,
 * and a file that loses some must record it, so the count can only go down.
 * Why the em dash matters: scripts/lib/voiceProbe.ts.
 *
 * Fix a failure by rewriting the sentence (a full stop, a colon or brackets),
 * NOT by swapping in " – " or " -- ", which are counted too. After cleaning
 * text, lock the lower counts in with:  npm run audit:voice -- --update
 */

const ROOT = path.resolve(__dirname, "..");
const BASELINE = path.join(ROOT, "scripts/voice/dash-baseline.json");

describe("em-dash ratchet", () => {
  const baseline = JSON.parse(fs.readFileSync(BASELINE, "utf8")) as Record<string, number>;
  const scans = scanTree(ROOT);
  const { increased, decreased } = compareToBaseline(toBaseline(scans), baseline);

  it("no file gained an em dash in visible text", () => {
    const report = increased.map((c) => {
      const lines = scans[c.file]?.hits.map((h) => `    ${h.line}: ${h.text.trim().slice(0, 100)}`) ?? [];
      return `${c.file}: ${c.was} -> ${c.now}\n${lines.join("\n")}`;
    });
    expect(report, "rewrite the sentence; see the comment at the top of this test").toEqual([]);
  });

  it("the baseline records every drop (run: npm run audit:voice -- --update)", () => {
    expect(decreased.map((c) => `${c.file}: ${c.was} -> ${c.now}`)).toEqual([]);
  });
});
