import { describe, expect, it } from "vitest";
import { FLEMING_AXES } from "../src/app/notes/_components/visualizations/FlemingsLeftHandRule";

// The diagram draws Field, Current and Force along three world axes, so the
// physics lives in which axis each one gets: F = I L x B. A student reported
// the 2026 diagram pointing the force the wrong way (it drew B along +x, I
// along +y and F along +z, but y x x = -z).
const cross = ([a1, a2, a3]: readonly number[], [b1, b2, b3]: readonly number[]) => [
  a2 * b3 - a3 * b2,
  a3 * b1 - a1 * b3,
  a1 * b2 - a2 * b1,
];

describe("Fleming's left-hand rule diagram", () => {
  it("points the force along current x field", () => {
    expect(cross(FLEMING_AXES.current, FLEMING_AXES.field)).toEqual([...FLEMING_AXES.force]);
  });

  it("draws three unit axes", () => {
    for (const v of Object.values(FLEMING_AXES)) {
      expect(v.reduce<number>((s, x) => s + x * x, 0)).toBe(1);
    }
  });
});
