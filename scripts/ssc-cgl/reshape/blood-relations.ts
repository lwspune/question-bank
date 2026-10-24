/**
 * Reshape plan: SSC CGL Tier I Reasoning "Blood Relations" (154 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 154 stems and solutions (2026-10-23). The ingest filed them under "Direct Relations" (97)
 * and "Coded Relations" (57), but "Direct Relations" mixed three methods. Cut here by the method that
 * solves the row: short chains of plain statements, read in order (generations, siblings, side
 * branches, gender); a chain spoken by one person ("my father's only son ..."), unwound from the
 * speaker, including the chains that point back to the speaker and the in-law words; family puzzles
 * whose clues come out of order or describe a family of N; coded chains decoded link by link; and the
 * coded rows that ask which statement holds or which expression gives a relation. Never featured:
 * f195a7b0, 85b306a5, 4f9a1b22 (their solutions open with a Note: SSC printed them in Hindi only),
 * a5832038 (P's sister can be Q's own mother, and "Cannot be determined" is printed), 0d578592 and
 * 9c48cc67 (the same question twice: a cousin's wife keyed as "sister-in-law").
 */
import type { ReshapePlan } from "../reshape";

const T = {
  direct: "Direct Relations",
  spoken: "Spoken Relation Chains",
  puzzles: "Family Puzzles",
  coded: "Coded Relations",
  statements: "Coded Statements and Expressions",
} as const;

const plan: ReshapePlan = {
  chapter: "Blood Relations",
  subject: "Reasoning",
  order: [T.direct, T.spoken, T.puzzles, T.coded, T.statements],
  byPrefix: {
    [T.direct]: [
      "204d5f78", "3accff32", "8bb1c63a", "e20856f6", "e36d3b83", "6bed3ce7", "f08d4698", "1bc4d413",
      "fa5077e6", "fd1a1542",
      "b8fe30d0", "3827b2d8", "fd05887a", "6ced81d6", "0becb007", "93bcf6f7", "ced4da22", "2b7864fc",
      "fafea9ba", "36461067", "2cec0007", "97ad9c67",
      "e1882da5", "41e19114", "63a2e08b", "e42f6836", "7c270d0b", "f38365d3", "d09d7bc1",
      "2712403e", "da333715", "0dfdc076", "615b3035", "c13256b8", "a5832038",
    ],
    [T.spoken]: [
      "f195a7b0", "4f0dc73f", "7edfffca", "dadd6148", "78eb7132", "6beeb5b0", "2f801e2f", "42f5404d",
      "c39e0383", "6cf39ae4", "b5063180", "87ed677b", "7e383d71", "cd8b0b3c", "2cd6d371",
      "352bd7cf", "31e1e5c1", "bd1e77e3", "63375f96", "980ed2ac", "c89d000c", "875eee17", "7e772238",
      "25183665", "756979f7", "67557ea0", "0dd8076c", "fdcaabb4", "bd5fadde", "3fa3fa31", "7e9daa05",
      "4b5a1350", "1fae53e5", "89f78b16", "885738eb", "18145d30",
      "6e6915fb", "85b306a5", "869ecf71", "1eddf5e1", "3592c4f7", "0c0ae49c", "4ec2965d", "4a1441b6",
      "da4836f3", "bba9af63", "59125b8f", "d80dccb6", "940434c1", "0d578592", "9c48cc67",
    ],
    [T.puzzles]: [
      "754b72ad", "bb481bfa", "23df4470", "01ea2b39", "8b78f751", "0b66184c", "0fbb57ce",
      "2935e1bd", "a86280a1", "9e440e58", "abae3424",
    ],
    [T.coded]: [
      "5f8e3dfc", "ff1f7c46", "eb90e449", "d752328f", "494ae9ec", "4f57f0f0", "c7b00958", "d6ee05aa",
      "e62bcc5f", "8078c58c", "52362132", "ed98dfc7", "5f14edf6", "f72e9963", "a2992463", "256c209e",
      "e060fc7a", "12f561de", "ff42aace", "65e8537a", "b2f9c0d0", "f0fb9e57", "7cd12609", "7318617c",
      "42a4fef8", "948ca33b", "ea0f688c",
      "7d96774a", "8ce9e79e", "4f9a1b22", "7610acac", "7a19dc53", "3c0fb051", "1c0b4815", "49ad6a20",
      "1c6583b2", "112414fe", "c65738d0", "9dccfc36", "5cbfbd1f", "b7346ea3", "2b8c4298", "c773ad1e",
      "15b8ee67",
    ],
    [T.statements]: [
      "c4597490", "77a71bdc", "7ea26c02", "5fb30054", "84be6a57", "3b0dd793", "f51cbfa4", "e90fc86a",
      "8229faaf", "d040cae8", "c354c3fb", "fa9b373b", "b49abbcb",
    ],
  },
  expected: {
    [T.direct]: 35,
    [T.spoken]: 51,
    [T.puzzles]: 11,
    [T.coded]: 44,
    [T.statements]: 13,
  },
  total: 154,
};

export default plan;
