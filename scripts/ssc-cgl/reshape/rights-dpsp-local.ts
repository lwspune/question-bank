/**
 * Reshape plan: SSC CGL Tier I General Awareness Polity "Fundamental Rights, DPSP and Local Governance" (69 q),
 * for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 69 rows (2026-10-31, main session). The ingest put 59 of them in one subtopic. Cut here into the three
 * Parts they come from (Fundamental Rights, Directive Principles, Fundamental Duties) and local bodies with
 * elections. Never featured: 3cf8f42f (its solution opens with a Note disputing SSC's key).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  rights: "Fundamental Rights",
  dpsp: "Directive Principles of State Policy",
  duties: "Fundamental Duties",
  local: "Local Self-Government and Panchayati Raj",
} as const;

const plan: ReshapePlan = {
  subject: "Polity",
  chapter: "Fundamental Rights, DPSP and Local Governance",
  order: [T.rights, T.dpsp, T.duties, T.local],
  byPrefix: {
    [T.rights]: [
      "140691d9", "39552377", "3b2ed4e9", "4508473d", "4b39274d", "8696492f", "9dfec1f6", "b9ef7355",
      "d989a724", "55154cee", "6f9c6d24", "68b17b5a", "9ff30963", "20267e71", "262a4f1a", "381dc7fb",
      "aea63d99", "00d0c5a5", "37bbf2a2", "8c587d22",
    ],
    [T.dpsp]: [
      "73cbca49", "9c078fd6", "028fa7aa", "060d2feb", "71895b53", "e5f400ec", "3cb6eac1", "26bfc790",
      "38a43467", "9714a7f5", "b760b7db", "b7f5eb2f", "d767ab0c", "51625ffd", "be13552b", "12af3d09",
      "297d64ed", "5f1fcd22", "77bd16cc",
    ],
    [T.duties]: [
      "03c85a9d", "2bbb0fcc", "3cf8f42f", "5595082d", "e63e03a3", "fc91b246", "59941104", "cfae0a79",
      "cb7279d9", "8020060a", "c5408db9", "fc5d8690", "6e4281b2", "858f3a60", "a5decc77", "b6aa8f2e",
      "c81545f3", "caa8c165", "e6539a24", "e97ac0c8",
    ],
    [T.local]: [
      "30a0fb45", "5d8e3d47", "70d47c69", "0acc6199", "20b4a50b", "8dd77a6a", "b06266b2", "fdf13d9c",
      "541096e8", "a257783f",
    ],
  },
  expected: {
    [T.rights]: 20,
    [T.dpsp]: 19,
    [T.duties]: 20,
    [T.local]: 10,
  },
  total: 69,
};

export default plan;
