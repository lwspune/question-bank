/**
 * Reshape plan: Homi Bhabha Std IX "Force and Laws of Motion" (24 q), for scripts/homi-bhabha/reshape.ts.
 *
 * Read all 24 stems and solutions. The ingest filed them under six subtopics; cut here by what a
 * question asks: the kinds of force (contact and non-contact, balanced and unbalanced, the nuclear
 * force), Newton's three laws (inertia, F = ma, action and reaction), and momentum with its
 * conservation (recoil, collisions, impulse). e6e7c041 (a pulley set-up that verifies W = Fs) is
 * a Work and Energy question; it sits on the forces page until the main session moves it. Never
 * featured: 02b6aa5a and 81b71f65 (notice: a line of the printed stem is cut off), 1e9dfe8b (key
 * D is right only by elimination: it is the one option without the cart's backward pull).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  forces: "Kinds of Force",
  laws: "Newton's Laws of Motion",
  momentum: "Momentum and Its Conservation",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Force and Laws of Motion",
  order: [T.forces, T.laws, T.momentum],
  byPrefix: {
    [T.forces]: ["659f0669", "aebca697", "37a25671", "e6e7c041", "1f4f8681"],
    [T.laws]: ["9f2b814d", "4e53fa50", "7fb41cdd", "c2e0f054", "bc7b6683", "9221af1d", "937da5f3", "1e9dfe8b"],
    [T.momentum]: ["fcb6ad13", "678472fd", "342333ca", "992efdce", "89e6dcff", "2b238c14", "b1e1da9a", "02b6aa5a", "81b71f65", "bdc1ebc8", "d1d32f31"],
  },
  expected: { [T.forces]: 5, [T.laws]: 8, [T.momentum]: 11 },
  total: 24,
};

export default plan;
