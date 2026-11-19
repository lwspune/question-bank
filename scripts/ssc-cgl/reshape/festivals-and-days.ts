/**
 * Reshape plan: SSC CGL Tier I Static GK "Festivals, Fairs and Important Days" (102 q), for
 * scripts/ssc-cgl/reshape.ts.
 *
 * Read all 102 rows (2026-11-19, draft agent S3). The move filed them under two subtopics
 * (festivals 97, days 5). The commonest question names a festival and asks its state, so the cut is
 * by region, after one page on the festivals every region shares: festivals of each faith, the Hindu
 * calendar, Makar Sankranti's regional names and the national and UN days (the five day rows fold
 * in here, since they are the same date-and-person recall). Then the Himalayas and the north; the
 * south and west; the east and centre; the north-east; and last the dance, music and cultural
 * festivals that state governments run (Lokrang, Khajuraho, Hornbill), which reuse the states taught
 * before them.
 * Never featured: 5b915834 (SSC printed it in Hindi only), 7fcceda2 (calls the Mishmi Tamladu a
 * Buddhist festival), 3f93e3a5 (calls the 75-day Bastar Dussehra ten-day), 76719238 (Vishu is also
 * Bisu in coastal Karnataka, so option C has a case), 7304b119 (the Karma drum statement turns on
 * Mandar against Madal).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  faith: "Religious Festivals and Important Days",
  north: "Festivals of the Himalayas and North India",
  southwest: "Festivals of South and West India",
  eastcentral: "Festivals of East and Central India",
  northeast: "Festivals of North-East India",
  cultural: "State Dance, Music and Cultural Festivals",
} as const;

const plan: ReshapePlan = {
  subject: "Static GK",
  chapter: "Festivals, Fairs and Important Days",
  order: [T.faith, T.north, T.southwest, T.eastcentral, T.northeast, T.cultural],
  byPrefix: {
    [T.faith]: [
      "52c1bf7d", "5429351a", "5b915834", "9b1ee86b", "4cc3d783", "52d731ff", "5fafa666", "9614d8d7",
      "fad2802a", "9c97edbb", "b8da1ed4", "f6b6dd8e", "fbddc767", "23b3f7a6", "30a5d994", "a439be06",
      "91084b29", "dc2d9b33", "65d19d80", "b26c2334", "7b7392b7", "1255ce92", "22121144", "f8d75146",
      "167f5c17", "1eb35f22",
    ],
    [T.north]: [
      "06f735aa", "49a2a229", "148b79d6", "dc0345c7", "3f774479", "0b19f315", "51ef5f48", "0b91d328",
      "39908d62", "22920b84", "498cb71a", "a41c4e85", "cca1e651", "363dc4bb", "afcc7c48", "dcfc1e44",
    ],
    [T.southwest]: [
      "15698739", "4f7fbeee", "3f2c955d", "f7bfaef9", "76719238", "8f8ed14e", "2734ed3f", "c8fc6e7e",
      "66d211e5", "b16fe9f6", "fbb71b56", "a22d10fb", "6b23c261", "a310017d",
    ],
    [T.eastcentral]: [
      "04b8432e", "725f3c4e", "aa681c9b", "b477b766", "f4ac22f8", "5201cb64", "7260f00b", "4465d390",
      "e2ad9ba9", "1acc797a", "57b0ee9c", "7304b119", "b81e08e7", "65d91789", "3f93e3a5", "08ec6d01",
      "c749fcc6", "9bb2cac9",
    ],
    [T.northeast]: [
      "86ee2190", "c2bac6f9", "412db7b8", "9559652b", "b686c621", "fbb3939a", "7fcceda2", "62e5db23",
      "4d484bb6", "b0762ec2", "c37a4937", "c98866f8", "725f73c9", "97c58b1d", "2e05ed46", "82308a5d",
      "8c84895b",
    ],
    [T.cultural]: [
      "14d508e8", "562f2389", "86d6b807", "f005ee3f", "13b776bd", "1d7fcde8", "20b05759", "fad69de9",
      "18f054ad", "9700ef9d", "48c4688c",
    ],
  },
  expected: {
    [T.faith]: 26,
    [T.north]: 16,
    [T.southwest]: 14,
    [T.eastcentral]: 18,
    [T.northeast]: 17,
    [T.cultural]: 11,
  },
  total: 102,
};

export default plan;
