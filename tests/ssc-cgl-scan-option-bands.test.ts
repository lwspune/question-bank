import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// scan_figures.py crops a 2023 scan's option pictures from the page. It cut each option as the band
// halfway between the option marks, but a tall picture is not centred on its mark: on 24 Jul 2023
// S1 Q2 that clipped options A and C and gave B and D arcs of their neighbours. option_bands cuts
// at the white gaps between the pictures instead and gives each piece to the nearest mark.

const python = (code: string) => spawnSync("python", ["-E", "-P", "-c", code], { encoding: "utf8" });
const HAS_LIBS = python("import fitz, PIL").status === 0;
const SCRIPTS = join(__dirname, "..", "scripts", "ssc-cgl");

/** rows: a list of [y0, y1) ink runs, in rows of the rendered strip */
function bands(rows: [number, number][], height: number, yTop: number, scale: number, centres: number[]) {
  const code = `
import sys, json
sys.path.insert(0, ${JSON.stringify(SCRIPTS)})
from scan_figures import option_bands
ink = [False] * ${height}
for a, b in ${JSON.stringify(rows)}:
    for y in range(a, b): ink[y] = True
try:
    print(json.dumps(option_bands(ink, ${yTop}, ${scale}, ${JSON.stringify(centres)})))
except ValueError as e:
    print(json.dumps({"error": str(e)}))
`;
  const r = python(code);
  if (r.status !== 0) throw new Error(r.stderr);
  return JSON.parse(r.stdout);
}

describe.skipIf(!HAS_LIBS)("option_bands", () => {
  it("keeps a picture taller than the spacing between marks whole", () => {
    // Marks 20 pt apart; picture A runs 25 pt (rows 0-75 at scale 3), more than halfway to B's mark.
    const got = bands([[0, 75], [80, 120], [130, 200], [210, 240]], 250, 100, 3, [112, 133, 155, 175]);
    expect(got).toEqual([
      [100, 125],
      [100 + 80 / 3, 140],
      [100 + 130 / 3, 100 + 200 / 3],
      [170, 180],
    ]);
  });

  it("gives a picture made of several pieces (two circles side by side) to one option", () => {
    // B's picture is two runs with a 1-row gap: one picture, since the gap is too narrow to split on.
    const got = bands([[0, 30], [40, 60], [61, 80], [100, 130], [140, 170]], 180, 0, 1, [15, 60, 115, 155]);
    expect(got[1]).toEqual([40, 80]);
  });

  it("refuses an option that is left with no picture", () => {
    const got = bands([[0, 30], [100, 130], [140, 170]], 180, 0, 1, [15, 60, 115, 155]);
    expect(got.error).toMatch(/option B/);
  });
});
