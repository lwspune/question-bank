/**
 * Reshape plan: SSC CGL Tier I English "Idioms and Phrases" (204 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 204 rows (2026-10-23, main session). The ingest's six themed subtopics are the six teaching
 * pages, so nothing moves; each page's two concepts split its idioms by meaning. Never featured: 1b9f502d
 * (its notice).
 */
import type { ReshapePlan } from "../reshape";

const plan: ReshapePlan = {
  subject: "English",
  chapter: "Idioms and Phrases",
  order: ["Idioms: Time and Company", "Idioms: Trouble and Success", "Idioms: People and Character", "Idioms: Work and Money", "Idioms: Speech and Opinion", "Idioms: Feelings and States of Mind"],
  byPrefix: {
    "Idioms: Time and Company": [
      "f5d79fd2", "fc3116ca", "d9378c33", "e00d3bd4", "77a7935a", "f2c32923", "911596e0", "40e5f69a",
      "5e8aa387", "2bd3698b", "a017a90e", "33d30844", "745d2f19", "5ade2dcb", "bca1ac11", "e83b71dc",
      "044dab10", "9888d379", "6636d358", "1d9c8919", "e4f8b21f", "149306e2", "50a99f99", "9a81c570",
    ],
    "Idioms: Trouble and Success": [
      "9142333a", "caa2726d", "8ff90516", "5095c6ad", "82e1b7fc", "cf18e7da", "88c60c1f", "6d844d9f",
      "67dd5121", "415ce39d", "850f800e", "78fa5be3", "5b22777d", "d3ec1a45", "c354f93f", "8a8446bd",
      "9839c19d", "c3d4ee3a", "40417aa7", "b77a8077", "269a5435", "25e2af41", "56091222", "7ee8c467",
      "20081ae7", "8560cd09", "9146ffba", "ee3d46aa", "482cbea8", "bfad0bde", "cf325fff", "4a254ff6",
      "666a7797", "9d9304d9", "d505c5a8", "7c88d2b8", "5ba1558d", "d6130721", "3d798bb3", "cc6dbf0d",
      "09040407", "dcdcc06d", "5107e822", "37d24e88", "127451a6", "4728c057", "6b240f53", "f045d7f9",
      "0a183f25", "824ec2d0", "65b57c76", "66a3700a", "667ed7c7", "3604afc4", "baa57c40", "edc97fad",
      "dcb6abb7", "29602775", "6c347634", "cf532834", "7f61be8b", "7ce0e9a8", "10301d5e", "49354d77",
      "00518899", "2a3a4d91", "c5781d21", "90a1f1e8", "2eabe413", "0b29de21",
    ],
    "Idioms: People and Character": [
      "e935d149", "14859284", "cb1c93d2", "e6a3f963", "16b7d6a4", "72f08e79", "c97ebc3c", "44e67be4",
      "f1686622", "9fbc2236", "c2b6a668", "59b8b914", "91ad39ae", "84ced757", "bf73c4de", "2d903ae1",
      "e827bedf", "b13451ad", "6ee93b53", "56e8616e", "81f2ff93", "f4c6a0e4", "a1350764", "f05bd12a",
      "767c1930", "2befcc75", "cea1d013",
    ],
    "Idioms: Work and Money": [
      "1b9f502d", "f5bb6aa9", "cf655103", "31facfa7", "bb5821aa", "8f4840f8", "b8354a9e", "8efce0c7",
      "fb1599da", "60320667", "bcb788e2", "15eb1c93", "7f3d884d", "f5a4d8bd", "cc2d0f41", "fc2fbec7",
      "02bb8dae", "9b2cfe7a", "f781629d", "81621e22", "7d0b69e0", "85f7e3b7", "def07f67", "b67d63f2",
      "073df4c6",
    ],
    "Idioms: Speech and Opinion": [
      "1d7f3dd8", "32ac5c04", "f4f11ff6", "afb64db4", "8660a3e9", "da4f87b0", "2d54ba23", "08ab25b8",
      "8f72e84d", "305beae9", "285b17a2", "70fd9c05", "cb1aef4d", "78c4df4c", "bcf88dec", "19678831",
      "edaf30be", "57a96387", "e66ea6b7", "29b61c0c", "3c0141c7", "41775aba", "df96624d", "6a55e77c",
      "f111ddc4", "5b1ad301", "8015f095", "8fd8d4b1", "946ddf30", "28cb8a28", "08d5273c", "4534f5ea",
      "3e021f1d", "13e4dbae",
    ],
    "Idioms: Feelings and States of Mind": [
      "02131cf8", "a5c4c9d4", "43db972c", "d4d7286f", "80ca4510", "08bdec33", "6471dd8a", "81282716",
      "5d6b3bc9", "1e090077", "082c1e4e", "3cdc0a32", "e62db36e", "115d0e6c", "2ca0959a", "25cb9243",
      "77e366a1", "88e64b7f", "52a645dd", "6054756c", "f72286de", "dc206923", "f8c8eca7", "3edad47c",
    ],
  },
  expected: {"Idioms: Time and Company": 24, "Idioms: Trouble and Success": 70, "Idioms: People and Character": 27, "Idioms: Work and Money": 25, "Idioms: Speech and Opinion": 34, "Idioms: Feelings and States of Mind": 24},
  total: 204,
};

export default plan;
