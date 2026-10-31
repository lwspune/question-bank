/**
 * Reshape plan: SSC CGL Tier I General Awareness History "Modern India" (207 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 207 rows (2026-10-31, main session). The ingest filed them under ten subtopics; the 71-row
 * freedom-movement subtopic mixed sixty years. Cut here in time order: the Company's conquest with its
 * land revenue and the drain; 1857 with the tribal and peasant risings; the Acts, Governors-General and
 * education; the reform movements; nationalism to 1918 with the revolutionaries at home and abroad; Gandhi's
 * movements from Champaran to the Poona Pact; 1935 to 1947; India after 1947 with literature, music and
 * architecture. Never featured: e1c195f2 (the "half-loaf" label is not a standard name for any Act),
 * 4b97f12a (the 1881 Act limited children's hours, women's came in 1891), 340e4333 (architecture
 * statements graded by judgement), bc27ea6d (an assertion-reason pair the key reads loosely).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  comp: "Company Conquest and Land Revenue",
  revolts: "Revolt of 1857 and Popular Uprisings",
  acts: "British Administration, Acts and Legislation",
  reform: "19th Century Social and Religious Reform",
  early: "Early Nationalism and Revolutionaries",
  gandhi: "Gandhi and the Mass Movements",
  indep: "Quit India and Independence",
  culture: "India After 1947 and Culture",
} as const;

const plan: ReshapePlan = {
  subject: "History",
  chapter: "Modern India",
  order: [T.comp, T.revolts, T.acts, T.reform, T.early, T.gandhi, T.indep, T.culture],
  byPrefix: {
    [T.comp]: [
      "2cba29d7", "33d6de94", "4bd66882", "569087e4", "58e31a73", "725778ba", "b04bac45", "c8b21d19",
      "e7e25675", "356e70b1", "456095bf", "596a3e98", "67ed30da", "76e04cce", "7dfaf0d7", "acd48151",
      "ae93e373", "05e744e4", "8a7fd316", "f8a83711",
    ],
    [T.revolts]: [
      "5d9d554c", "96ef3a50", "ae3570c2", "e3944a5d", "e4033830", "24edd21a", "77cea9e3", "c789c721",
      "c9bc300b", "169fac82", "2cfe447f", "44f5dbd2", "5b2470b9", "600ba9ff", "6c150cca", "bca50759",
      "da102b7d", "f30474ed",
    ],
    [T.acts]: [
      "21a8f801", "291fd50b", "36d69134", "9f294503", "adc75b14", "b3a6efda", "c4d0bf2d", "c8bafc07",
      "dbe62bf5", "e17f12c7", "e70fbaf5", "ec895b05", "fc0c267b", "25dca909", "379b0cd0", "3b7746a3",
      "67eb6f10", "68cf94db", "731c7b35", "7924b98d", "7e4a8b9e", "c4220f10", "d0eb3ebc", "e1c195f2",
      "35f4e60b", "3ae4c6ed", "3c99b0da", "3cb27ad1", "4b97f12a", "52013cac", "5bbcc28e", "5bc13a36",
      "5bdc548b", "8f07e653", "951bba67", "a099385a", "a9b75dc7", "b43d343c", "cd7f9d28", "e9d2af22",
      "f7a44a9c", "ffb302e4",
    ],
    [T.reform]: [
      "05186847", "097b8f8b", "0ea67555", "2e87e509", "427354ba", "64beb2d4", "6c5440af", "6fec20fb",
      "77c49d0a", "7e1a243c", "9f2dfbe0", "aa36253a", "b3d6f864", "d91b8076", "d9ac56c0", "f43355ce",
      "f72dd2ca", "0f06b027", "4a032d1d", "616c3713", "672ff5b6", "7222c4af", "8f19b5df", "92cc12f2",
      "9f0cf8be", "a30ad0d4", "ac0967aa", "b1e9b33f", "b9c2971e", "c8df4d3b", "ccfd5a34", "d355b943",
      "e46c5455", "e697739f", "045d7dbc", "55103e0b", "fd193666",
    ],
    [T.early]: [
      "1549f917", "2de13068", "2e08c947", "91fe3d4f", "99847b7d", "a19ee14c", "c629e72b", "d1cdfab2",
      "d4350359", "ec0e6067", "f5b7f906", "638c2533", "84d96f0d", "d8e48afa", "decc2bf0", "f156c97d",
      "53b56e87", "9e75fdfb", "bc88c958", "eba01d05",
    ],
    [T.gandhi]: [
      "21efb7bb", "2e4caba6", "3ce43e49", "477108fc", "48848858", "66f58670", "7d196bfc", "aa714c6a",
      "af19e482", "be6334cf", "daf0c2b6", "dce3d16b", "eedc3f7a", "fa096c65", "ffb1fda1", "06e9498c",
      "29942331", "3d6f2f85", "434abe73", "51d6f044", "55ed7e65", "63b07ece", "728e4ea7", "7662a9a4",
      "76cdc3db", "8aeff368", "9218473b", "aa3ff521", "b8048be4", "e32fedfb", "ed86f323", "f130eb75",
      "fadcc33c", "fd95ad76", "5fe401be", "a1af1e08", "b0cd0283", "f4c2caf1",
    ],
    [T.indep]: [
      "0facb78c", "2efca488", "46cab347", "7b641d57", "c7078a4d", "cf154db9", "dba6cd0b", "fe81ce83",
      "a48d0025", "b3549da5", "bb1ae608", "31c5d008", "40e61738", "cd26fffb",
    ],
    [T.culture]: [
      "2e7b85d9", "6c68d73e", "e88d9cb2", "f7403dff", "076d0832", "30d67052", "4652c0fd", "5e208da8",
      "a11ada54", "a13c0fec", "c1224a2e", "fa843eb3", "13a07db6", "340e4333", "bc27ea6d", "c836beab",
      "ca3f5955", "d6659eda",
    ],
  },
  expected: {
    [T.comp]: 20,
    [T.revolts]: 18,
    [T.acts]: 42,
    [T.reform]: 37,
    [T.early]: 20,
    [T.gandhi]: 38,
    [T.indep]: 14,
    [T.culture]: 18,
  },
  total: 207,
};

export default plan;
