/**
 * Reshape plan: CDS GK Polity "Fundamental Rights, DPSP and Local Governance" (68 q),
 * for scripts/cds-gs/reshape.ts.
 *
 * Read all 68 stems AND solutions (2026-10-23). The ingest filed the rows under three
 * catalogue subtopics, one of which ("Fundamental Rights, DPSP and Duties", 38 rows) holds
 * three different things a student learns apart: the rights themselves (Articles 12 to 30),
 * the remedy (Article 32 and the five writs), and the non-enforceable Parts IV and IVA.
 * So it is cut three ways by row. Elections come before the panchayats because the State
 * Election Commission is taught against the Election Commission of India.
 * There are no questions on municipalities, so they get no page of their own.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  rights: "Fundamental Rights",
  writs: "Writs and Constitutional Remedies",
  dpsp: "Directive Principles and Fundamental Duties",
  elections: "Elections and Electoral Systems",
  panchayats: "Panchayati Raj and Autonomous Councils",
} as const;

const plan: ReshapePlan = {
  subject: "Polity",
  chapter: "Fundamental Rights, DPSP and Local Governance",
  order: [T.rights, T.writs, T.dpsp, T.elections, T.panchayats],
  whole: {
    "Fundamental Rights, DPSP and Duties": T.rights,
    "Electoral Systems": T.elections,
    "Local Self-Government and Panchayati Raj": T.panchayats,
  },
  byPrefix: {
    // Article 32 and the writs
    [T.writs]: ["3e880945", "146c95a1", "91849e44", "b83e6f85", "371d5bda", "ab3333ca", "9fc243e3"],
    // Directive Principles (Part IV) and Fundamental Duties (Part IVA)
    [T.dpsp]: [
      "f72dad96", "41ed66f1", "44bb9f6c", "1fa7fcf9", "5a9ea888", "626bcc37",
      "06a0b964", "6893781e", "b06c8d15", "b0b9147e", "02afddb7",
    ],
  },
  expected: { [T.rights]: 20, [T.writs]: 7, [T.dpsp]: 11, [T.elections]: 13, [T.panchayats]: 17 },
  total: 68,
};

export default plan;
