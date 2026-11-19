/**
 * Reshape plan: Homi Bhabha Std IX "Acids, Bases and Salts" (44 q, all eight papers), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 44 stems and solutions. The ingest filed them under fourteen subtopics; cut here by what
 * a question asks: the acids of daily life (natural sources, solid acids, uses), strength, basicity
 * and dilution, indicators and the pH scale, the reactions of acids (metals, oxides, neutralisation),
 * and the types of salts with their water of crystallisation. Never featured (each carries a
 * notice): ea102ccb (humic acid is not tribasic either), b63c8fbd (H+ and H3O+ are the same ion),
 * 0ea3caff (what "acidic salt" means), dbab36de and dff5dd78 (soil to water is usually 1:2).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  around: "Acids and Bases Around Us",
  strength: "Strength, Basicity and Ionisation",
  ph: "Indicators and the pH Scale",
  reactions: "Reactions of Acids and Bases",
  salts: "Salts and Water of Crystallisation",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Acids, Bases and Salts",
  order: [T.around, T.strength, T.ph, T.reactions, T.salts],
  byPrefix: {
    [T.around]: ["4f8c586d", "46ce8f5f", "6d7c99be", "b7ba7286", "cdcbfec7"],
    [T.strength]: ["f22ca7f5", "d9dce90f", "9b015165", "cb9ab03b", "ea102ccb", "8c1a80cd", "624839b0", "80b4c99b", "7ed03794", "b63c8fbd"],
    [T.ph]: ["f5bea690", "bb7a66d7", "79ce0c40", "9f7941d2", "2671d388", "a047e7c3", "cded85ac", "1ebc50c8", "33eeec76", "b4f26341", "4f6c4fb4", "dbab36de", "dff5dd78"],
    [T.reactions]: ["c4ab1fee", "80ee7b97", "240df271", "d3423763", "ea0da656", "ba958133"],
    [T.salts]: ["bf9526eb", "0ea3caff", "7d957936", "ddf8da5e", "adfb2e0e", "34adedd6", "5094956b", "26f7db7d", "6e738e52", "01bf4dd9"],
  },
  expected: { [T.around]: 5, [T.strength]: 10, [T.ph]: 13, [T.reactions]: 6, [T.salts]: 10 },
  total: 44,
};

export default plan;
