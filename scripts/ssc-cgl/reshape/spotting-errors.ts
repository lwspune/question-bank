/**
 * Reshape plan: SSC CGL Tier I English "Spotting Errors" (359 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 359 rows (2026-10-23, main session). The ingest filed 142 rows under "Sentence Improvement", a
 * question FORMAT (replace the underlined part) rather than a grammar point; every row is re-filed here by the
 * grammar point its answer turns on, into five teaching pages.
 */
import type { ReshapePlan } from "../reshape";

const plan: ReshapePlan = {
  subject: "English",
  chapter: "Spotting Errors",
  order: ["Agreement and Pronouns", "Tenses and Verb Forms", "Articles, Adjectives and Comparison", "Connectors and Word Order", "Prepositions, Word Choice and Idioms"],
  byPrefix: {
    "Agreement and Pronouns": [
      "050dee8c", "322dfeea", "33876315", "4a7506c4", "4b5f7eda", "4c1a80d6", "530c4b2b", "54ac405d",
      "5d9a0651", "66e7b934", "706cd5e9", "808dbbcd", "b06a78a0", "bb4c6612", "c8aab378", "d768f269",
      "1b710ef5", "253bc6d9", "26681631", "28aaace8", "5d8bd468", "6019f3bd", "7c28c5c4", "7f5bf875",
      "808dff8a", "bec4ec4f", "c17abe00", "c2453017", "ceb5635b", "e63f83fd", "e83a6425", "05c96f33",
      "0a41e7ac", "0c5f1c3d", "0feaf845", "1170a710", "1ee7e626", "288814f5", "2a665c53", "2ecd5e41",
      "34cea931", "3a854914", "6434dd03", "64d2281e", "808091da", "827b5a8d", "84e17bbb", "86860ab5",
      "87288653", "8cd701b2", "92b748a1", "99066658", "9f7e6e34", "a03bb340", "a242add9", "adddf3d6",
      "b3eaa0f8", "bf39da1a", "ee9a836c", "f44c2710", "fbcde0d0",
    ],
    "Tenses and Verb Forms": [
      "020f48fd", "02d180c9", "0b920379", "11e5fc80", "182a4122", "19c16fa0", "19f39eb1", "1a26b4d3",
      "2018589b", "243823c0", "2f81ed09", "38f0b39d", "395094d1", "401bd0e1", "4734183c", "4ba3f7a3",
      "59cf83d4", "5fec094a", "67a04a07", "6d2d2ce8", "75ca4aff", "783bcbe4", "7aa53350", "7e31397a",
      "7f917a63", "8dec914b", "93b1c778", "968e89ec", "98288f6e", "a423383f", "a4665263", "adacc9e2",
      "b354174b", "b42955c1", "b4ef6f5c", "d0076ad1", "d2846403", "dcad172e", "e486fb1a", "e690d98c",
      "eea73b91", "f54fddc9", "f856c060", "13dac367", "2040b293", "2f7e65bb", "338eb3c5", "5144e9ed",
      "5e923ab6", "603af0ec", "65675738", "693be9b7", "710d3329", "77d8af9c", "8289f809", "8a5cc0a4",
      "b3b6f247", "bf317e46", "c2a00561", "ca0780f0", "d63536c7", "d75f4b3a", "db99ab4e", "df920239",
      "e0564cd9", "ed57968b", "f4307a73", "079a48aa", "137a4b66", "21ebe9a4", "25301e1b", "2841bbc7",
      "3325979a", "5e81b274", "5f7f0b20", "5ffd3c5b", "6249200d", "6291b2f7", "6f63fe27", "74f52a60",
      "7bff93a9", "8f422b72", "911efa0c", "922b4830", "9dfbc368", "9fabc94a", "aa88ae1b", "bee50bff",
      "c8a097f8", "cbf51f9d", "d130b919", "d70a994a", "ddb4ad22", "ea8e1772", "f196ddc4", "f9c786d7",
    ],
    "Articles, Adjectives and Comparison": [
      "050a3288", "116315de", "1aa2727f", "28bcc9a8", "2fbc3f20", "344a2506", "3a08122f", "433b8fb5",
      "4788360b", "58e1f825", "70114689", "76d7b1cb", "818b8bf7", "8248580b", "93615fb3", "9d1388fa",
      "a3d86345", "b60447cf", "ba01cfc1", "c7b6617a", "c7cef338", "dafb95ed", "f7c78478", "01f215d4",
      "077f86ba", "148b77b5", "1572ee11", "165ba3be", "16911873", "32bd81ca", "32f25f52", "35b92444",
      "35f88eec", "36b986a7", "3aaa5316", "45d9e317", "4ad10612", "51d76bd0", "58b1325d", "86382b32",
      "afe97ffa", "b1dc7d97", "b22efd89", "b6aa08df", "ba2014f7", "bc79f092", "c072b5c2", "c0d8e837",
      "d16c2967", "d70347b7", "dc758b95", "f2b85bb1", "f6aada04", "fd3b631b", "ff1f39cc", "07c3b26b",
      "0bee30d6", "0c11cda0", "1ef7b63c", "37e3b44a", "52a8c003", "5afcf5e1", "7a7f8138", "89bfba07",
      "b830d428", "cb35d5a6", "ccb1d67a", "de0427c3", "e5452e77",
    ],
    "Connectors and Word Order": [
      "0d3efae1", "214f84a0", "28feb745", "454a20d1", "6720b6d0", "d221677a", "1ed149da", "2eed4f3b",
      "4767d110", "4d92000b", "9e8919cf", "a3dcdf3d", "f60e0aed", "0778f78d", "15f23e12", "26acc655",
      "34d81add", "52ba6fee", "604b39f6", "610acff8", "64290b72", "69fb7fde", "6e5d518a", "76e9daef",
      "7f8400f0", "89e06d69", "94bf4d10", "a7f8288c", "aa4f2eee", "ae178739", "ae7138ec", "ba394566",
      "c532411e", "db199b94", "de986487", "eff5fab9",
    ],
    "Prepositions, Word Choice and Idioms": [
      "100b0c37", "134dd464", "3a5559bf", "44d4ac92", "453c0c75", "6d88bf67", "71001c63", "749459e5",
      "74bd0b72", "7c866ff3", "88aa7cca", "8c03373b", "91ab718c", "93b2914e", "9502c391", "a366c7c0",
      "ab8bcb1d", "b85bf327", "bf69a278", "cb0ab8b9", "d70a1364", "e65095d2", "e9a13bf5", "e9a3adfc",
      "ef3355bd", "f9df91bb", "08ea1349", "0d66d596", "0fcd56f2", "11ec2941", "18580923", "1cf184f7",
      "30c813ff", "33a5252b", "39aaa11b", "47041182", "47e9ca18", "4800a921", "57496ab5", "65200005",
      "69e62386", "6aa90657", "755beb7c", "797331f0", "7cd01eab", "82a90852", "83490399", "83badf51",
      "8467deb4", "885091c3", "89c67930", "a0d33efe", "a18c3072", "a45da140", "a6fa9088", "b77fe3bc",
      "ce075a08", "d62a843f", "d99eb60d", "e7caa208", "eceb1550", "ef2559ac", "f5d28322", "f93543f6",
      "1016c142", "1c8839ed", "1faf89a8", "3755c542", "4d3baf9f", "5352f5cb", "54e2bc38", "612abefc",
      "61cf0f05", "661e6bbe", "66790aa1", "695c9957", "6fa7f383", "7aed6403", "84cba6c5", "894201fb",
      "8a076bac", "8b4690f7", "8c3b7e39", "8ded13e3", "94c484e3", "a2ebdf8f", "afab9964", "b4989dae",
      "b985f00b", "b9e2b737", "ba923def", "babf0401", "c63a6224", "c76a167f", "d00b3ee9", "d60634e6",
      "db0256ff",
    ],
  },
  expected: {"Agreement and Pronouns": 61, "Tenses and Verb Forms": 96, "Articles, Adjectives and Comparison": 69, "Connectors and Word Order": 36, "Prepositions, Word Choice and Idioms": 97},
  total: 359,
};

export default plan;
