/**
 * Reshape plan: SSC CGL Tier I "Data Interpretation" (219 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 219 stems and solutions and viewed all 108 chart figures (2026-10-23). The ingest filed
 * them by chart type (Tables 111, Bar and Line Graphs 61, Pie Charts 47), but a table and a bar graph
 * ask for the same work, so the cut here is by the WORK the row asks: reading totals, differences,
 * counts and cumulative "and above" tables; averages across a series; ratios of totals; one value as
 * a percentage of another (aggregate marks percentages included); percentage change and percent
 * more or less (base matters); pie charts and percentage shares of a total (the chart type does
 * change the method here: degrees, unitary 1%, comparing sectors without the total); and two-step
 * share problems (a ratio or percentage inside a share, working back to a missing total).
 * Never featured: the 39 rows whose solution opens with a Note: (badly printed), 0e583436 (key
 * disputed: the stem asks for engineers, 62 : 25, the key counts countries, 1 : 1), 74f35353 (its
 * printed table contradicts itself), 8567c38a (stem cut off), 2d8d4611 (company labels illegible),
 * 57fabd74 (933.25 keyed as 934).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  reading: "Reading Tables and Graphs",
  averages: "Averages from Data",
  ratios: "Ratios from Data",
  percent: "One Value as a Percentage of Another",
  change: "Percentage Change and Percent More or Less",
  shares: "Pie Charts and Shares of a Total",
  twostep: "Two-Step Share Problems",
} as const;

const plan: ReshapePlan = {
  chapter: "Data Interpretation",
  order: [T.reading, T.averages, T.ratios, T.percent, T.change, T.shares, T.twostep],
  byPrefix: {
    [T.reading]: [
      "a855cf07", "d27997fb", "6c396852", "dadc4456", "7ca3ad95", "f5591eee", "65348288", "7e6817ce",
      "ccb2fe4f", "495b4a79", "14b8f42e", "bfdd7499", "940c62aa", "f0dbd410", "e3787aff", "3c1bad7b",
      "a16ec2df", "51019876", "b15de780", "695be5fe", "c16c236b", "d567682e", "74f35353", "d36bc2c4",
      "819661e4",
    ],
    [T.averages]: [
      "ced4de29", "1fd4b9cb", "da79a8ae", "0bf651a7", "98d24007", "468035e3", "cd3862ba", "bd186845",
      "9768788c", "ee9c6063", "2ead3b6b", "573cee89", "0d2fd537", "d659a02f", "2e0d78e8", "8f50f538",
      "d9287aa4", "05a51a61", "55c66978", "f52ea4ef", "2483d6b7", "adc688f5", "74840321", "9bca55c9",
      "f87d51af", "8fbf8bf4", "6407880f", "57fabd74", "153b045b", "6914866c", "e7b98c91", "4d6e9626",
      "0e583436", "0bb4794f", "719f241b", "422f585b", "724b55b1", "6e12f4e7", "8117d7e9", "25fb4280",
      "423ff471", "7fbc58d5",
    ],
    [T.ratios]: [
      "c3db3e2d", "4985c47d", "2b004180", "b1be4669", "1a5c22c5", "46eb27d7", "62481af4", "59ad41c8",
      "130d630d", "6d823604", "88e4d984", "220bb53e", "b2d7dd69", "27511e53", "8485ff76", "2a898c9f",
      "8295198b", "417c57ad", "e6756318", "77e79af4", "c6325040", "82a568f0", "151a459c", "f3aadd6e",
      "15203fa8", "37a4b64a", "8dbbc5b9", "e1f1bf3e", "65e11ac2", "a2bb5cd2",
    ],
    [T.percent]: [
      "caa50355", "4c02145b", "da4ce062", "2d8d4611", "28432429", "7555cd13", "9410e6dd", "66af52c7",
      "4145b108", "ab12a48e", "8850f748", "bacd313b", "00b35f51", "6c059171", "13549716", "bdbb41a6",
      "b77fe506", "26c18e9a", "ef02a298", "949eb900", "0e14e3aa", "e70a3aa5", "b66ee579", "6c4fda4c",
      "11328e95", "7935c47c", "5881d4fe", "b36a975b", "68a64f8a", "70c0eeaf", "26a5c2cb", "239e20da",
      "6852066c", "e718c799",
    ],
    [T.change]: [
      "1982d50b", "7f3da44a", "078a9ac8", "69e60660", "791f90c6", "717bafaf", "2cdace04", "483edf0c",
      "64b45dfd", "fcb73a0e", "c3c425fa", "362a9360", "8567c38a", "d32c861b", "af73f6c2", "20ed803c",
      "b26af33a", "c54e542c", "6b7697eb", "89f8a370", "9e3874ed", "96c9c1c4", "a23e4d45",
    ],
    [T.shares]: [
      "b6af4965", "edcaacb8", "6398da1b", "324e00b2", "05f6f04a", "7ec44486", "c413db23", "472b875b",
      "9d32c8d8", "ef5697d9", "e6ef1b19", "7ddbe765", "aadebc60", "68e9506f", "8801a807", "b6efeb77",
      "c3e23e3c", "6bb18bb3", "c123ae63", "32778490", "4992dcd5", "bb6ca1c2", "cb18ea16", "3879107d",
      "e7d5eb0d", "3403605e", "f8ed42cd", "f5c1abd4", "08a8b830", "1216f7ac", "fb05931c", "30b53297",
      "414ca35f", "09cd1852", "24715b40", "f3dc3aa6", "370d7745", "d9b567cc", "3b4f8e3a", "e21b63b5",
      "cf7a6b15", "aa509520", "c8f6166e", "a1a459a9", "ffa2ab6c", "7b4765fa", "3c649927", "8e65ed79",
    ],
    [T.twostep]: [
      "5d0afc6b", "b5a6d262", "424876c8", "ec27b019", "c3630a13", "525e48b8", "f54542b1", "7d215394",
      "957a75b9", "ff396485", "08035175", "087c7408", "728f64e5", "021fa3be", "8204b9be", "4ab5c7dc",
      "09fcab3d",
    ],
  },
  expected: {
    [T.reading]: 25,
    [T.averages]: 42,
    [T.ratios]: 30,
    [T.percent]: 34,
    [T.change]: 23,
    [T.shares]: 48,
    [T.twostep]: 17,
  },
  total: 219,
};

export default plan;
