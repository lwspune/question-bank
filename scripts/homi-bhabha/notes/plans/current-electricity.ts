/**
 * Reshape plan: Homi Bhabha Std IX "Current Electricity" (39 q), for scripts/homi-bhabha/reshape.ts.
 *
 * Read all 39 stems and solutions. The ingest filed them under seven subtopics; cut here by what a
 * question asks: charges at rest (rubbing, induction, lightning), current with cells and circuit
 * meters, Ohm's law with what sets a wire's resistance, resistors in series and parallel, and
 * electrical energy, power and the household supply. Never featured: 4576bcdb (notice: a wire in
 * the figure shorts the bulb), e9cb28ca (notice: two readings, 1:1 or 1:4), ebd462cf (R and S are
 * parallel branches, so option D is as correct as the key B).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  static: "Static Electricity",
  current: "Current, Cells and Circuits",
  ohm: "Ohm's Law and Resistance",
  combos: "Resistors in Series and Parallel",
  power: "Electrical Energy and Power",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Current Electricity",
  order: [T.static, T.current, T.ohm, T.combos, T.power],
  byPrefix: {
    [T.static]: ["f9a70d32", "f1f30feb", "f334e5e5", "6b0fec85", "53c8a18a", "de6545a1", "072fbff3"],
    [T.current]: ["162f3fdf", "41150262", "143ddbbb", "d3be8c72", "c0217adc", "daf25e27", "ebd462cf", "4576bcdb"],
    [T.ohm]: ["425e8709", "6ad65deb", "c24250ba", "e2988aac", "3f16dba4", "c1f6479e", "f4484358", "e9cb28ca", "f6568cc3"],
    [T.combos]: ["a4b9b52d", "6101a3ec", "719f553b", "e16374bc", "03c531aa", "04a573a4", "9c4ea0a0", "079bc970"],
    [T.power]: ["ed1dbf27", "1970964d", "4c53bd76", "49e36e73", "517c415c", "ae9fa05e", "45c793ab"],
  },
  expected: { [T.static]: 7, [T.current]: 8, [T.ohm]: 9, [T.combos]: 8, [T.power]: 7 },
  total: 39,
};

export default plan;
