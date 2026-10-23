/**
 * Reshape plan: SSC CGL Tier I Reasoning "Mirror and Water Images" (122 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 122 solutions (2026-10-23, main session). The ingest filed 119 under "Mirror Images" and 3 under
 * "Water Images". Cut by what the mirror acts on: a string of letters, numbers and symbols (reverse the order,
 * flip each character; the 3 water images, all strings, join this page), or a drawn figure (one shape, or
 * several parts in a frame).
 */
import type { ReshapePlan } from "../reshape";

const plan: ReshapePlan = {
  subject: "Reasoning",
  chapter: "Mirror and Water Images",
  order: ["Letters and Numbers in a Mirror", "Figures in a Mirror"],
  byPrefix: {
    "Letters and Numbers in a Mirror": [
      "1edd8f49", "ddc9f61a", "6d69fb23", "5c651e04", "6bfd8ad2", "2db9b7be", "5bbbc792", "26bb7b33",
      "f7b42cd3", "a612bad5", "ff21498d", "92bc9ab5", "df9e1c96", "799d4a9c", "6571f86a", "490fac78",
      "ad448dd6", "fadbeecd", "84f4e667", "40046b70", "4f7c6ecb", "0a82da10", "5034c203", "cf2c0355",
      "f0194484", "0725247e", "e890a82f", "e6aee3ae", "8bcf334e", "80b78f3e", "56fdb65d", "d0c0121d",
      "80776bac", "f31879c5", "e688da77", "21589a82", "004140d7", "efcc21b9", "922d08aa", "ecdd7053",
      "d22b670f", "b8301b83", "c7c2ee2a", "982925f4", "df874a66", "2f70b283", "e2601c10", "e6f7e4e3",
      "9ddea9bb", "be6ee0f3", "32a25900", "679d184a", "b78b7db4", "ae0388d4", "c185d299", "1ea46cdd",
      "15c2bbc8", "3185669a", "bf801d95", "b09d4a5e", "a538eb3e", "9fa65455", "b8481063", "05032670",
      "225f9946",
    ],
    "Figures in a Mirror": [
      "7e3f891b", "c8be7be2", "0df4ba67", "ab4da90e", "1835fdc0", "754d4027", "0a5fddb3", "c21443d4",
      "5ee15086", "1d17dfb3", "2b9593fa", "8a37d103", "87600e8e", "d04912c2", "32cffb5d", "4d53e249",
      "627fbe80", "c314dac2", "85e51d20", "e740264a", "fc52d45a", "3bf535c8", "3e5017ad", "e865578c",
      "e2f3c956", "30a49d64", "e8ff24c4", "c3b52959", "1767f461", "33b6917f", "b873275c", "de88ed97",
      "a765e581", "de5ad88a", "52bce2e1", "3bc5b05d", "f9904a80", "4474b619", "8a142842", "7b63e5ba",
      "525592e4", "274dd730", "ee083b92", "f1cb6e9c", "b0b3a2cd", "aa4eec9e", "8a1ec315", "1eafc654",
      "dee0c294", "b99cb3a5", "a83eac27", "94545d04", "ca22eb63", "9cc73930", "88dd83ec", "deced305",
      "d309ce0d",
    ],
  },
  expected: {"Letters and Numbers in a Mirror": 65, "Figures in a Mirror": 57},
  total: 122,
};

export default plan;
