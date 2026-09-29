/**
 * Reshape plan — CDS "Quadrilaterals" (54 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 54 stems AND solutions (2026-09-29). "Trapezium, Rhombus and Kite" (16) held two
 * different figures: trapeziums (similar triangles on the parallel sides, the midline) and
 * rhombuses and kites (perpendicular diagonals, area = half the product), so each gets a page.
 * The one tangential-quadrilateral row joins the general page, and the two midpoint-figure rows
 * filed under general (Varignon) join Parallelograms, where the other midpoint rows sit.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  general: "General Quadrilaterals and their Diagonals",
  parallelograms: "Parallelograms",
  rhombus: "Rhombus and Kite",
  trapezium: "Trapeziums",
  cyclic: "Cyclic Quadrilaterals",
} as const;

const plan: ReshapePlan = {
  chapter: "Quadrilaterals",
  order: [T.general, T.parallelograms, T.rhombus, T.trapezium, T.cyclic],
  whole: {},
  byPrefix: {
    [T.general]: [
      "f6ddaaf2", "50870abf", "e96b619c", "c9987c12", "7a84ce5e", "a44c64e0", "5c941b9a", "b45bbcf9",
      "db65c646", "d9e43f64", "bfacef02",
    ],
    [T.parallelograms]: [
      "d87b2c3c", "71d7c66b", "976d8dca", "1128d52d", "3f0206c3", "e5b7c971", "1464267d", "df1317a8",
      "ac702c3e", "3d881776", "dd2de9be", "505a9542", "63f8e80a", "6d9f8bd8",
    ],
    [T.rhombus]: ["8f162141", "05637649", "790d3e39", "d856f240", "cf4dd265", "3af919d1", "33fe3e53", "07145c6a"],
    [T.trapezium]: ["837442bd", "f4f20939", "bba774cc", "848bdd57", "fa192897", "29f365f9", "df41c7ee", "c04ba43d"],
    [T.cyclic]: [
      "99d6e4a6", "f2b220a9", "c5e89024", "60839ffa", "768fdd67", "168349e9", "f6e0d8b3", "bfd2eae5",
      "4861a348", "d8ca84ec", "ac20b451", "c94da1c6", "3ff6bd07",
    ],
  },
  expected: {
    [T.general]: 11,
    [T.parallelograms]: 14,
    [T.rhombus]: 8,
    [T.trapezium]: 8,
    [T.cyclic]: 13,
  },
  total: 54,
};

export default plan;
