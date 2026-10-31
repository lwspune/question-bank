/**
 * Reshape plan: SSC CGL Tier I General Awareness Polity "Government Structure" (148 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 148 rows (2026-10-31, main session). Cut by organ of government: the Union executive with the
 * constitutional bodies; Parliament; the Supreme Court and High Courts; the states; and the laws Parliament
 * passed, led by the three criminal laws of 2023 (25 questions, all from the 2025 shifts). Never featured:
 * 217f3f64 (its solution opens with a Note), 7f3e5212 and 1fa97c6a (answers that rest on provisions since
 * ended), 94c8b6f8, d979fb73, 3d1ca5e5 and 9c649e5b (the key is the nearest option, not an exact one).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  executive: "Union Executive and Constitutional Bodies",
  parliament: "Parliament",
  judiciary: "Supreme Court and High Courts",
  states: "State Legislatures and Governors",
  laws: "New Criminal Laws and Other Acts",
} as const;

const plan: ReshapePlan = {
  subject: "Polity",
  chapter: "Government Structure — Parliament, Judiciary and Constitutional Bodies",
  order: [T.executive, T.parliament, T.judiciary, T.states, T.laws],
  byPrefix: {
    [T.executive]: [
      "282d423e", "67cf43d9", "95ae9a57", "5f0e0848", "7064ba80", "83ee14d7", "9827c66f", "9d11df05",
      "9fe23a10", "d1169e3f", "00bd858d", "32b03294", "b5c82966", "67225464", "8f1ca783", "2ce3d528",
      "3ebcdbbe", "6173f168", "afdf2599", "f52cba01", "fcc76ff9", "196b3778", "1bee5e40", "639c749e",
      "7388f9ad", "a77fb4c4", "0114ec2b", "5d0501aa", "b94a5d75",
    ],
    [T.parliament]: [
      "5fff65ae", "e060424b", "033210c8", "1d2b0085", "80053a25", "c393b134", "cf0a4d3f", "103ba4b7",
      "f49caa34", "145a8028", "5765712e", "bb4812ee", "bcc9bda6", "c6ea023b", "b7018ee8", "771d50b4",
      "a8992c81", "d98dc11f", "e605ce07", "c15733ab", "e3cb427d", "b1004dc2", "2101e329", "3d1ca5e5",
    ],
    [T.judiciary]: [
      "1759a954", "25ee8cf9", "3c098447", "3ddbc497", "476b3ecf", "e10243d1", "f0c0491a", "2a1e331c",
      "88306589", "b75b63f6", "3074b604", "4083a052", "d6bbdc3b", "cecfe62e", "01b1c48c", "1d7bf4cb",
      "f17be4b2", "f5cb6e36", "97425907", "22b15c80", "a9bb20bd", "a90f9128", "099dfaf3", "25ceb8d2",
      "5dac43bc", "962e6859", "965122ab", "ce703bcc", "64b18297", "0664687e", "aee6bd50", "d3327720",
    ],
    [T.states]: [
      "132a3a96", "1fa97c6a", "87588cff", "02281b75", "2a470808", "49b51446", "56a6ec9a", "73a85da9",
      "a317401e", "f0d262e9", "af0653d2", "1c4e3af8", "c8e45b6a", "39d7677c", "d9171c4f", "3713d1fe",
      "c8621fdc", "fc115da4", "2ff7e639", "7f3e5212", "9944d104", "a4ef16e0", "d8302fbf", "2a7a7b8a",
      "c6be351f", "ddfd70d1", "1b796e48",
    ],
    [T.laws]: [
      "5b8af4a4", "7ae47650", "3dbda8c8", "9c649e5b", "d979fb73", "152d50e5", "32c8fa6c", "40dfd545",
      "65b3e81d", "6bff3df8", "8329709f", "b76de842", "c19ba2e6", "e81a0ca0", "1d0aec80", "4e9acf08",
      "5110352b", "58ae7632", "6c788687", "8a668ef9", "8e496cd6", "94c8b6f8", "b4a563e2", "c05cee69",
      "e8f593ec", "902f461e", "217f3f64", "2b22306b", "2c2e9f2c", "68f3732a", "6b2f488f", "81bb0cf9",
      "b043d419", "c2966778", "f4e91d6c", "87d59e4d",
    ],
  },
  expected: {
    [T.executive]: 29,
    [T.parliament]: 24,
    [T.judiciary]: 32,
    [T.states]: 27,
    [T.laws]: 36,
  },
  total: 148,
};

export default plan;
