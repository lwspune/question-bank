/**
 * Reshape plan: CDS GK History "Medieval India" (106 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 106 stems AND solutions (2026-10-22). Eight teaching pages, by period and then
 * theme. Four period pages in time order: the early medieval kingdoms (Cholas, Pratiharas,
 * Kashmir, Odisha, Kakatiyas, with land grants, guilds and the period's learning); the Delhi
 * Sultanate (sultans, chronicles, siege engines and the stirrup, and the fifteenth century
 * courts of Mewar, Gwalior and Kashmir); Vijayanagara; and the Mughals with the Marathas and
 * the later Mughals. Then four theme pages: Bhakti (with the regional devotional literature of
 * Bengal and Braj), Sufis with the philosophical schools, the village economy with the
 * travellers' accounts, and art, architecture and science.
 *
 * The catalogue's "Medieval Literature and Texts" and "Other Medieval Kingdoms" scattered by
 * period: each text sits on the page of the court or movement that produced it.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  kingdoms: "Early Medieval Kingdoms",
  sultanate: "The Delhi Sultanate",
  vijayanagara: "The Vijayanagara Empire",
  mughals: "The Mughals and the Marathas",
  bhakti: "The Bhakti Movement",
  sufis: "Sufis and Schools of Thought",
  economy: "Peasants, Trade and Travellers",
  art: "Art, Architecture and Science",
} as const;

const plan: ReshapePlan = {
  subject: "History",
  chapter: "Medieval India",
  order: [T.kingdoms, T.sultanate, T.vijayanagara, T.mughals, T.bhakti, T.sufis, T.economy, T.art],
  whole: {
    "Society, Economy and Land Grants": T.economy,
    "Maratha Empire and Administration": T.mughals,
    "Art, Painting and Sculpture": T.art,
    "Medieval Literature and Texts": T.bhakti,
    "Mughal Empire and Administration": T.mughals,
    "Bhakti and Sufi Movements": T.bhakti,
    "Medieval Travellers, Trade and Crops": T.economy,
    "Vijayanagara Empire": T.vijayanagara,
    "Other Medieval Kingdoms (Chola, Rajput, Ahom, Sikh)": T.kingdoms,
    "Warfare, Arms and Military Technology": T.sultanate,
    "Religious and Philosophical Schools": T.sufis,
    "Science, Medicine and Technology": T.art,
    "Temple and Monument Architecture": T.art,
  },
  byPrefix: {
    // Grants, guilds, Sanskrit names for Muslims, Lakshmidhara, Apabhramsha, the Gwalior prashasti, Chola land classes.
    [T.kingdoms]: ["4e0b0478", "7097c108", "a6373edc", "b5dc67cb", "bb3a6a21", "bc415618", "dc722faa"],
    // Balban, Sirat-i-Firuz Shahi, Nuh Sipihr; Rana Kumbha, Man Kautuhal, Zainavilas.
    [T.sultanate]: ["31f64433", "34925d31", "3e048e04", "557399e5", "ac65451c", "c6891b9a"],
    // Domingo Paes, Abdur Razzaq, Amuktamalyada's language.
    [T.vijayanagara]: ["1919e871", "3c12418b", "62484a9d"],
    // Faizi, Tarikh-i-Akbari, Mughal painters, the first Nawab Wazir of Awadh.
    [T.mughals]: ["07416b75", "4c2dc382", "7a7420b4", "92670e38", "b1e7d4ed"],
    // Virashaiva doctrine joins the Virashaiva saints.
    [T.bhakti]: ["3ebc97dc"],
    // The Sufi rows of "Bhakti and Sufi Movements", and the Khoja ginan.
    [T.sufis]: ["2c16332b", "882c0e12", "8b1fd14e", "d2afe9e8", "e623fe5f"],
    // Ahom metal-casting, Irfan Habib on the Mughal state, Al-Biruni's language.
    [T.economy]: ["6bd48afa", "d7eb317f", "d8b67707"],
  },
  expected: {
    [T.kingdoms]: 13,
    [T.sultanate]: 11,
    [T.vijayanagara]: 13,
    [T.mughals]: 16,
    [T.bhakti]: 16,
    [T.sufis]: 9,
    [T.economy]: 18,
    [T.art]: 10,
  },
  total: 106,
};

export default plan;
