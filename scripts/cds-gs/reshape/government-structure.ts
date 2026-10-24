/**
 * Reshape plan: CDS GK Polity "Government Structure — Parliament, Judiciary and
 * Constitutional Bodies" (144 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 144 stems AND solutions (2026-10-23). Ten teaching pages, in the order the
 * Constitution builds the Union and then the States: the President; the Prime Minister,
 * the Council of Ministers and the law officers; the two Houses and their members; how
 * Parliament makes laws, money bills, motions and committees; the Supreme Court and High
 * Courts; writs and landmark cases; the Governor and the State legislature; constitutional
 * bodies; statutory bodies and key laws; ministries, NITI Aayog and schemes.
 *
 * The six catalogue subtopics do not follow that cut ("Constitutional Bodies and Offices"
 * mixes the President with the CAG; "Parliament" mixes seats with money bills), so every
 * row is placed by its id prefix. Placement notes:
 * - The Advocate General row (2b5eb338) goes to the State page; the Attorney General and
 *   Solicitor General rows go with the Union executive.
 * - Articles 311 and 312 (civil services) sit with the constitutional bodies (the UPSC page).
 * - NDMA under the Home Ministry (f6d2888b) joins the other NDMA rows on the statutory page.
 * - The 2015 NITI Aayog resolution (1bef6a02) joins the other NITI rows on the ministries page.
 * - MPLADS (48e362cf) is a scheme, so it goes to the ministries page.
 * - "Audi alteram partem" (8c7e3ca0) joins the writs page, where natural justice is taught.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  president: "The President and Vice-President",
  ministers: "Prime Minister, Ministers and Law Officers",
  parliament: "Houses of Parliament and Their Members",
  lawmaking: "Bills, Motions and Committees",
  courts: "Supreme Court and High Courts",
  writs: "Writs and Landmark Cases",
  states: "Governor and State Legislature",
  constitutional: "Constitutional Bodies",
  statutory: "Statutory Bodies and Key Laws",
  departments: "Ministries, NITI Aayog and Schemes",
} as const;

const plan: ReshapePlan = {
  subject: "Polity",
  chapter: "Government Structure — Parliament, Judiciary and Constitutional Bodies",
  order: [
    T.president,
    T.ministers,
    T.parliament,
    T.lawmaking,
    T.courts,
    T.writs,
    T.states,
    T.constitutional,
    T.statutory,
    T.departments,
  ],
  whole: {},
  byPrefix: {
    [T.president]: [
      "06e40ecd", "20505007", "42d12018", "5b066ded", "990d602f",
      "a8953ac6", "d7c01b8b", "ebb28bdf", "e48fbc0c", "8b30247c",
    ],
    [T.ministers]: [
      "bf04036d", "c85ae346", "50009b63", "52f3eb12", "fe63ee70",
      "437823aa", "e7bda1d5", "6fea7930",
    ],
    [T.parliament]: [
      "bef9ab6c", "282da97d", "870bfdf0", "3af28068", "f967c985",
      "9ba7bbda", "9826dfe7", "65e9aa02", "f8c51afb", "35b0778c",
      "174d802b", "32f75b79", "3ef1b75c", "25f7a97c", "d6fc4afc",
      "1d77fbbf", "df1b9c14", "6b80f8c6", "0fc0d70c",
    ],
    [T.lawmaking]: [
      "110fb5f8", "dd5347cb", "7975e2da", "d2bcf481", "47c1618a",
      "f4dd847b", "f9be337b", "d0fc20f7", "3659da71", "1fda38ee",
      "411ea245", "446d543a", "268991ee", "58f9ef9d",
    ],
    [T.courts]: [
      "03b37121", "5966ac4d", "f02174af", "73101f16", "a10d49b4",
      "193def63", "6156385f", "9ce5f3fc", "576d6c4b", "bf001301",
    ],
    [T.writs]: [
      "47167410", "84b8b718", "af6bf7a7", "b2b07acf", "c252b896",
      "52607220", "88b5e465", "416de592", "3e25cf96", "4a473aaa",
      "194f9ef8", "8c7e3ca0",
    ],
    [T.states]: [
      "0940cbc7", "09bd7774", "30d35137", "44bfb7a0", "50380b99",
      "7a06bbb7", "7af03bad", "7e5cc582", "8ca7fcbf", "b9068e57",
      "d0d97b77", "ec78ddd9", "ef4c8025", "f2dd8e33", "2b5eb338",
    ],
    [T.constitutional]: [
      "ae5a816d", "d961e261", "d9b7ff03", "df0c0a8d", "56bd7df5",
      "a01d4cc1", "55e64f3f", "cc22adba", "9adbc1d3", "30f75cb7",
      "7cbe008d",
    ],
    [T.statutory]: [
      "514d2b20", "8e2c9e90", "25cfb3ce", "736b6fe4", "6d37f739",
      "2507e643", "ca6de0e4", "82310f29", "7e0e3be8", "f6d2888b",
      "572308ab", "1ee2668c", "c0585c01", "c977502e", "85933302",
      "4e648fe4", "27f47e08", "59cc4e41", "3024b0ab", "472bc4ad",
      "a10c8896", "8b8c6d8a",
    ],
    [T.departments]: [
      "1bef6a02", "4e7ec79c", "78b6d96a", "fdf71514", "b3d46db5",
      "26d78ffe", "b2be1560", "809169ac", "7af89d8a", "64793a57",
      "caa6688b", "cc3ce22d", "a5258e9a", "ab2741bd", "476b3ece",
      "9a59a9e0", "c655a0c3", "3e882872", "f19f8af6", "48e362cf",
      "473995e0", "b8f8105f", "06743326",
    ],
  },
  expected: {
    [T.president]: 10,
    [T.ministers]: 8,
    [T.parliament]: 19,
    [T.lawmaking]: 14,
    [T.courts]: 10,
    [T.writs]: 12,
    [T.states]: 15,
    [T.constitutional]: 11,
    [T.statutory]: 22,
    [T.departments]: 23,
  },
  total: 144,
};

export default plan;
