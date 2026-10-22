/**
 * Reshape plan: CDS GK History "Ancient India" (120 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 120 stems AND solutions (2026-10-22). The ingest's 14 catalogue subtopics mixed
 * periods (one "Literature and Inscriptions" bucket held Ashoka's edicts, the Sangam epics and
 * the Bakshali manuscript). Re-cut into ten teaching pages: seven in time order (Stone Age to
 * the Pallavas), then three themes that run across the periods (texts, art, society and trade).
 * A Sangam or Pallava row goes to the south page whatever its old bucket; an Ashokan inscription
 * goes to the Mauryas; a stupa or cave goes to art.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  stone: "Stone Age and Chalcolithic Cultures",
  indus: "Harappan Civilization",
  vedic: "Vedic Age",
  religions: "Buddhism, Jainism and Other Schools",
  mauryas: "Mahajanapadas and the Mauryas",
  guptas: "Post-Mauryan Kingdoms and the Guptas",
  sangam: "Sangam Age and the Pallavas",
  texts: "Literature, Grammar and Science",
  art: "Art and Architecture",
  society: "Society, Land and Trade",
} as const;

const plan: ReshapePlan = {
  subject: "History",
  chapter: "Ancient India",
  order: [T.stone, T.indus, T.vedic, T.religions, T.mauryas, T.guptas, T.sangam, T.texts, T.art, T.society],
  whole: {
    "Prehistory, Stone Age and Rock Art": T.stone,
    "Chalcolithic and Pre-Harappan Cultures": T.stone,
    "Harappan and Indus Valley Civilization": T.indus,
    "Vedic Age, Society and Literature": T.vedic,
    "Religious and Philosophical Schools": T.religions,
    "Buddhism, Jainism and Religious Architecture": T.religions,
    "Mahajanapadas, Magadha and Mauryan Empire": T.mauryas,
    "Post-Mauryan, Gupta and Sangam Period": T.guptas,
    "Ancient Indian Literature and Inscriptions": T.texts,
    "Temple and Rock-Cut Architecture": T.art,
    "Art, Painting and Sculpture": T.art,
    "Society, Trade and Foreign Connections": T.society,
  },
  byPrefix: {
    // Archaeology: the anthropology definition and Cunningham at Taxila open the Stone Age page.
    [T.stone]: ["dc8a40cc", "45457201"],
    // Warfare: the Rig Vedic arrow-maker.
    [T.vedic]: ["3fd7f69e"],
    // A Pali Jataka is a Buddhist text.
    [T.religions]: ["96766ffd"],
    // Ashoka's inscriptions and the Arthashastra.
    [T.mauryas]: ["580f976d", "8bd4fe37", "fd056504", "fd128c18", "de0dfa9d"],
    // Kings known from inscriptions: Prayaga, Hathigumpha, Junagadh, the four-site pairs.
    [T.guptas]: ["dd8a8369", "df2e1643", "38464129", "33afb7fa"],
    // Sangam society, epics and ports; the Pallavas.
    [T.sangam]: [
      "4068bacb", "a5da8e31", "ca526dcd", "2883e798", "aae78249", "4d5f732b",
      "2caaa73f", "47355ca9", "46f83648", "b059745a", "c2a44d64", "a7962d7e",
      "9ab30890", "e29e11d8",
    ],
    // Stupas, pillars and Buddhist sites.
    [T.art]: ["bca2a865", "57bfabd8", "e5ce81e9", "845ab415", "b36674e4"],
    // Coromandel trade and the word for a spear.
    [T.society]: ["b65cc51b", "a6d3a24e"],
  },
  expected: {
    [T.stone]: 12,
    [T.indus]: 11,
    [T.vedic]: 8,
    [T.religions]: 13,
    [T.mauryas]: 15,
    [T.guptas]: 12,
    [T.sangam]: 14,
    [T.texts]: 10,
    [T.art]: 13,
    [T.society]: 12,
  },
  total: 120,
};

export default plan;
