import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { splitByVerdict, VERDICT_CODES, type FigureVerdict } from "../scripts/lib/figures/verdicts";

// A figure audit flags a row whose stem points at a picture it does not carry.
// A person then reads it and records a verdict in scripts/lib/figures/triage/.
// Until 2026-10-14 nothing read those files, so a row ruled "the stem carries
// every value" came back on every audit run as "unanswerable if real".
const v = (id: string, verdict: FigureVerdict["verdict"]): FigureVerdict => ({ id, ref: id, verdict, why: "read" });

describe("splitByVerdict", () => {
  it("moves a row ruled to need no figure into reviewed, keeping its reason", () => {
    const flagged = [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }];
    const { open, reviewed } = splitByVerdict(flagged, [
      v("a", "SELFCONTAINED"), v("b", "DRAWS"), v("c", "CONCEPT"), v("d", "DESCRIBED"),
    ]);
    expect(open).toEqual([]);
    expect(reviewed.map((r) => [r.id, r.verdict])).toEqual([
      ["a", "SELFCONTAINED"], ["b", "DRAWS"], ["c", "CONCEPT"], ["d", "DESCRIBED"],
    ]);
    expect(reviewed[0].why).toBe("read");
  });

  it("keeps a row open when its verdict says a figure IS needed", () => {
    // MISS = genuinely missing; OPTIONS = the options are the figure. Both still
    // need an image, so a verdict must not hide them.
    const { open, reviewed } = splitByVerdict([{ id: "m" }, { id: "o" }], [v("m", "MISS"), v("o", "OPTIONS")]);
    expect(open.map((r) => r.id)).toEqual(["m", "o"]);
    expect(reviewed).toEqual([]);
  });

  it("keeps a row with no verdict open", () => {
    const { open } = splitByVerdict([{ id: "x" }], [v("y", "SELFCONTAINED")]);
    expect(open.map((r) => r.id)).toEqual(["x"]);
  });
});

describe("every triage file is readable", () => {
  const dir = join(__dirname, "..", "scripts", "lib", "figures", "triage");
  for (const f of readdirSync(dir).filter((n) => n.endsWith(".json"))) {
    it(f, () => {
      const rows = JSON.parse(readFileSync(join(dir, f), "utf8")).rows as FigureVerdict[];
      expect(rows.length).toBeGreaterThan(0);
      for (const r of rows) {
        expect(r.id).toMatch(/^[0-9a-f-]{36}$/);
        expect(VERDICT_CODES).toContain(r.verdict);
        expect(r.why.length).toBeGreaterThan(0);
      }
    });
  }
});
