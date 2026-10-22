/**
 * Reshape plan: CDS GK History "Modern India" (172 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 172 stems AND solutions (2026-10-22). Eleven teaching pages, by period and then theme:
 * the Company's rise; land revenue and the colonial economy; the early revolts and 1857; the Acts
 * and the administration; the religious reform movements; caste, women and social service; early
 * nationalism to 1916; Gandhi's rise and Non-Cooperation; the Swarajists, Civil Disobedience and the
 * Left; independence and after; and the historians, writers and orientalists. The catalogue's
 * "Freedom Movement" subtopic held 63 rows from 1870 to 1948, too many periods for one page, so it
 * is spread over five pages by prefix. Eleven pages, one more than planned: merging any two would
 * make a page of 26 or more rows that mixes two periods.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  company: "The Company Takes India",
  economy: "Land Revenue and the Colonial Economy",
  revolts: "Early Revolts and 1857",
  acts: "Acts and Administration",
  reform: "Religious Reform Movements",
  society: "Caste, Women and Social Service",
  early: "Early Nationalism",
  noncoop: "Gandhi and Non-Cooperation",
  civil: "Swarajists, Civil Disobedience and the Left",
  independence: "Independence and After",
  culture: "Historians, Writers and Orientalists",
} as const;

const plan: ReshapePlan = {
  subject: "History",
  chapter: "Modern India",
  order: [
    T.company, T.economy, T.revolts, T.acts, T.reform, T.society,
    T.early, T.noncoop, T.civil, T.independence, T.culture,
  ],
  whole: {
    "European Trading and Early British Conquest": T.company,
    "Warfare, Arms and Military Technology": T.company,
    "British Economic Policy and Industrial India": T.economy,
    "Revolt of 1857 and Popular Uprisings": T.revolts,
    "British Administration, Acts and Legislation": T.acts,
    "19th Century Social and Religious Reform": T.reform,
    "Freedom Movement — INC, Gandhi and Independence": T.independence,
    "Post-Independence India": T.independence,
    "Indian Literature, Poets and Cultural Figures": T.culture,
    "Art, Painting and Sculpture": T.culture,
    "Historiography and Historians of India": T.culture,
  },
  byPrefix: {
    // Auckland's fear of Russia (1836) belongs with the Afghan policy, not the Acts.
    [T.company]: ["e6fa8422"],
    // The Deccan riots, the Limitation Law and the Relief Act are one story of debt and land.
    [T.economy]: ["b028c182", "13f465fb", "39b2c73a", "af25f8da"],
    // Awadh's annexation and settlement, the Santal and Munda land questions.
    [T.revolts]: ["f5c14f3f", "2e18ac88", "f1b9f434", "d4c4d175"],
    [T.society]: [
      "d8a82c97", "cbbb2e40", "b79afdad", "23f243d2", "332aaa1a", "01fa61de", "6dbb56d6", "d0c814b5",
      "91733f7c", "c487ee21", "4cd09848", "a0d28def", "8a8296f1", "4256578d", "e462285b", "1297b7d9",
    ],
    [T.early]: [
      "65b7d493", "2e694120", "67bb7c43", "a10618f5", "dab49003", "a768ddcf", "f4467b79", "1b885fa1",
      "c8562c51", "396c4f72", "431b35cb", "23383f55",
    ],
    [T.noncoop]: [
      "7977c9db", "36a8eda0", "8da69a2e", "a58b1b1d", "e777fa23", "96ee8de9", "7c0f09bc", "45bb6f6a",
      "4996bff1", "39d8a79d", "19ea0f5b", "845a4f74", "31cf2a3d", "205d3bbc",
    ],
    [T.civil]: [
      "5c1e2ccb", "c04e1e6a", "b1d9450c", "c6d77b8e", "b816bdf3", "7ce4489c", "b192fb48", "34b9749f",
      "fe9e4708", "52dee210", "1415e4ab", "3f3e4438", "8bbb8ab4", "bb63ff06", "6cc161cc", "117d3547",
      "7f92c63f", "38b083f2", "5efe8940", "1c583f47", "fb0183ce", "120de56a",
    ],
    // Colebrooke at Fort William and Bose's The Indian Struggle sit with the orientalists and the books.
    [T.culture]: ["9a121e8b", "a8f0b8c8"],
  },
  expected: {
    [T.company]: 14,
    [T.economy]: 13,
    [T.revolts]: 12,
    [T.acts]: 21,
    [T.reform]: 11,
    [T.society]: 16,
    [T.early]: 12,
    [T.noncoop]: 14,
    [T.civil]: 22,
    [T.independence]: 21,
    [T.culture]: 16,
  },
  total: 172,
};

export default plan;
