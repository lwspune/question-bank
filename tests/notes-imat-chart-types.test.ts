import { describe, expect, it } from "vitest";
import {
  SURVEY,
  TRAP,
  TRIP,
  barHeight,
  pieAngles,
  segmentSlopes,
} from "../src/app/notes/_components/visualizations/ImatChartTypes";

// The IMAT "Bar charts, line graphs and pie charts" concept draws four small
// charts from numbers the concept's own text uses. The figure is only worth
// having if each chart says what the text says, so the numbers are pinned here.

describe("IMAT chart-types diagram", () => {
  it("draws the worked example's survey: 18 walk, 30 bus, 12 car, 12 cycle", () => {
    expect(SURVEY.map((d) => [d.label, d.v])).toEqual([
      ["Walk", 18],
      ["Bus", 30],
      ["Car", 12],
      ["Cycle", 12],
    ]);
  });

  it("gives the pie the worked example's angles, adding to 360", () => {
    const angles = pieAngles(SURVEY);
    expect(angles).toEqual([90, 150, 60, 60]);
    expect(angles.reduce((a, b) => a + b, 0)).toBe(360);
  });

  it("draws the survey bars from zero, so heights keep the values' ratio", () => {
    const h = (v: number) => barHeight(v, 0, 30, 100);
    expect(h(30) / h(18)).toBeCloseTo(30 / 18);
    expect(h(12)).toBe(h(12));
    expect(h(0)).toBe(0);
  });

  it("draws the axis trap as the practice question states: 50 looks twice 40 but is 1.25 times", () => {
    const [a, b] = TRAP.values;
    expect([a, b]).toEqual([40, 50]);
    expect(TRAP.axisMin).toBe(30);
    const drawn = barHeight(b, TRAP.axisMin, TRAP.axisMax, 100) / barHeight(a, TRAP.axisMin, TRAP.axisMax, 100);
    expect(drawn).toBeCloseTo(2);
    expect(b / a).toBeCloseTo(1.25);
  });

  it("draws a distance-time trip that goes out, stops, then comes back home", () => {
    const slopes = segmentSlopes(TRIP);
    expect(slopes).toHaveLength(3);
    expect(slopes[0]).toBeGreaterThan(0);
    expect(slopes[1]).toBe(0);
    expect(slopes[2]).toBeLessThan(0);
    // The way back is steeper, so the caption can say it was faster.
    expect(Math.abs(slopes[2])).toBeGreaterThan(slopes[0]);
    expect(TRIP[0].d).toBe(0);
    expect(TRIP[TRIP.length - 1].d).toBe(0);
  });
});
