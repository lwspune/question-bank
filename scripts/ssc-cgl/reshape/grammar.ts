/**
 * Reshape plan: SSC CGL Tier I English "Grammar" (414 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 414 rows (2026-10-23, main session). The ingest put 309 rows under one subtopic, "Voice and
 * Reported Speech"; they split cleanly by the instruction into voice (227) and speech (82). The other 105
 * rows, spread over sixteen small subtopics, become one page on grammar inside the sentence.
 */
import type { ReshapePlan } from "../reshape";

const plan: ReshapePlan = {
  subject: "English",
  chapter: "Grammar",
  order: ["Active and Passive Voice", "Direct and Indirect Speech", "Sentence Grammar"],
  byPrefix: {
    "Active and Passive Voice": [
      "0153a71b", "0b7c0ed8", "0ca0655a", "0ccad0b7", "0e992e66", "108ffc58", "114b464d", "12e43554",
      "1793d8cd", "1c9e1c9c", "1cb39e48", "216ce9d7", "21bfec58", "23064ec9", "249ac3d6", "24b6dff5",
      "3252bd32", "36d15d98", "3781ae08", "37bfc960", "39b745dd", "3f0bbcee", "413f168a", "442e456e",
      "4dbd85bc", "4dffa452", "4ec13e06", "5004a1ef", "527ee1d7", "55100ca8", "56c9b53e", "5c95a1a1",
      "5e2196c6", "5e778b76", "61f3f012", "6732989e", "6bda2551", "6cb39122", "6ddd2dd1", "725fdbf2",
      "78500bf6", "7c81ba43", "7fabb330", "8557c161", "8e3150ca", "8e8684d1", "943c3c16", "a6a6f586",
      "af51507d", "b33a3299", "b452a484", "b7060eca", "bf8d7150", "c2c31f24", "c5a1c9f3", "c6ac6fbc",
      "c8a9343b", "ca736f51", "cabd6562", "cb79caf6", "d039d8da", "d0f09325", "d19caae2", "d1d3d3cb",
      "db06dd94", "dbc74255", "e323ed28", "e514808f", "e7a55658", "e7c66778", "e974bc03", "ea44a445",
      "eaeefc97", "ec44e54d", "ecde90fd", "f3c5b883", "f4265e58", "f89faade", "0502667e", "08e38590",
      "0a67d626", "0c92012e", "183511b3", "18f5eb41", "192dca84", "1ad2a5d3", "1c4f3761", "24bc9b99",
      "26803d16", "28df8d25", "2917b091", "2dd1d338", "2f1cb3e3", "326f77a0", "343fad47", "399c70f3",
      "3c4baceb", "3c576876", "3d1d25d0", "3f24ed65", "41bcbd04", "444727c9", "45085676", "48f38584",
      "4c7724d6", "4dbab5c9", "4ec90e6b", "50edd2df", "51e45d65", "585424ca", "5fbc5e2f", "666de67d",
      "6898434d", "68d62aaf", "6a8d46cc", "6c600e1a", "6c6790b3", "6dc1a41d", "74d22972", "75ec08f8",
      "7c3e8f3f", "88b601c5", "88c3487c", "8c3dd0ab", "8f5b7462", "9903ad14", "9be11d9d", "9e42c6f2",
      "a161d9bf", "a26eb4cc", "a4f62957", "a9c99827", "aa5a1f9a", "ae87883d", "affa6767", "b029c780",
      "b1303936", "b929b38c", "c106365f", "c3e3ff0a", "c867fdaf", "d1728fc8", "d904907c", "d9ec3915",
      "e612592d", "ee3d7eef", "f36df810", "f3988ced", "f8d08a06", "fa4279ee", "002b0ff1", "01a06958",
      "02c2b7c4", "04df0696", "070e4d1b", "0be3e6b4", "15ad2f1a", "15c42d36", "1d346214", "1e5a2d11",
      "260438cf", "262276f7", "27110545", "293143b1", "296ff4a5", "2adf432b", "2b7acf2b", "2d5aa029",
      "2f0e9f76", "30c62d6e", "3339310c", "33a3af61", "355b4100", "38017325", "3ad76aa6", "3b738a22",
      "4081e92d", "46207b21", "4a1d2149", "50b01189", "55f9f2ef", "59018b36", "5a581744", "5b7c82a7",
      "5d6aa115", "69545c4f", "6ac38d1b", "6c4e73dc", "70f7ade0", "7270f320", "73e178ff", "767a99ab",
      "7ad6db4d", "7ccfc720", "8152f458", "8363d92c", "83dfeead", "8b826251", "8dae853c", "8ddd08d6",
      "8fb4a9f3", "8fb9e03f", "8fc1bed1", "92798bd1", "9bd2f594", "a3a50d40", "a445f4b3", "a4e1049a",
      "a7eb6bab", "aebb3763", "b117c101", "b16f9cf3", "bad820af", "c09211cb", "c2342e20", "c307a0e3",
      "d38ca106", "d40a7ac7", "da7b6303", "dc3bd9d5", "e16763b9", "ef1767e1", "f2139b08", "f2e95a7e",
      "f766bc98", "fad4771a", "ff594f1e",
    ],
    "Direct and Indirect Speech": [
      "4363a0fd", "0838b7a6", "0ae2e1a0", "0c7bc500", "0e99fccd", "12907bb6", "1860e259", "1a07d453",
      "1a211a3f", "1f738404", "24dff7b4", "24e7634b", "28168c2c", "2b5374ad", "2cae19b7", "336025c3",
      "355e29ec", "364d9eb2", "39977df2", "3ab30daf", "3e290827", "452b458b", "4531bf93", "4bc08aa1",
      "4faae5ab", "511d199f", "53838d7e", "57dc98dc", "5ae3cfeb", "5ced32e3", "5f4f2f10", "61673a43",
      "63dc8531", "649c2236", "65491f0b", "670bbf37", "72ae6768", "7aa21600", "7ab1c5a0", "7c9402ba",
      "7fd2ad4a", "8500e6ac", "88cde736", "89e56a2e", "8c9f8cca", "8d1cc934", "8dcf631c", "8fe00daf",
      "91567528", "97eb11a8", "a1f86691", "a3582958", "a82e70bb", "a83887c6", "ac4ba1be", "ac51dc04",
      "ae51af41", "b3332556", "b7adeef4", "b8d0c493", "ba73d5d6", "bc0c1fec", "c1b66dd6", "c4d22c48",
      "c6680a3f", "c979939f", "cb831c7f", "cc289f0f", "ce8c4ac6", "d23d71d3", "dbbd2f75", "de01531f",
      "de89ebfd", "e00cc739", "e14011de", "e29b3679", "e71be14a", "e7cd7bee", "eb1ce454", "ecd66868",
      "fc2210f9", "fff5cc53",
    ],
    "Sentence Grammar": [
      "0ea95d0e", "1dc6bd28", "32a1e2fc", "348ea118", "562defef", "5f74d183", "6132b20a", "63b5bee8",
      "7288394a", "756dc807", "7ad189af", "82fab560", "846bda3c", "88175820", "88be5458", "973bbca4",
      "97bd3c29", "9e2730c0", "a06e0c06", "a0953410", "a451dd6f", "c8a27258", "cb136e4f", "e1e036c5",
      "e8adf46e", "05e7add3", "0d9b32bc", "54697169", "58acc8b4", "62e7c5a2", "67945d62", "74bd4e2d",
      "7ce23aef", "8243c0d6", "923ffbc8", "b2c5e700", "b349da95", "b6efa563", "c621c099", "e53b1717",
      "f78dd619", "01426316", "04d61872", "06cfd01c", "096eb6a3", "0d9758b8", "0f96d0b2", "13fabb50",
      "1484b17f", "154748e7", "166ca6fe", "1c188e5f", "23eaa414", "27983011", "296b1d32", "2be6ee09",
      "300ebc5f", "3535f4fa", "35a4e065", "37a34e03", "3ca18dad", "3d26c5be", "3ee6015e", "40dfef25",
      "43d1b942", "44fa1213", "45490ba3", "47b16682", "55006c5e", "57ef44e5", "6a595ae8", "6cb60d05",
      "70a046c8", "764bc28b", "77cc731c", "7b049cc5", "82396f72", "87531bc0", "8a83a037", "8fadec54",
      "97b65ec0", "97d0e4ab", "9dfd88c9", "aaf8e286", "ab2e3498", "ae5934f0", "b5907fa1", "b80dc352",
      "bd67950a", "bf6318de", "bf74b107", "c674acb1", "c6aa9a11", "d50dbdec", "d83d4fad", "e2c45ba6",
      "e4a58234", "e5678d42", "e9bf70ae", "ede0fb7d", "f4290268", "f45f85e2", "f9b44532", "fdc18785",
      "fee484f4",
    ],
  },
  expected: {"Active and Passive Voice": 227, "Direct and Indirect Speech": 82, "Sentence Grammar": 105},
  total: 414,
};

export default plan;
