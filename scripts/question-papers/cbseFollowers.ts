/**
 * Follower sets whose transcription holds only the questions the leader set
 * does not print (see `withLeaderQuestions`). Each map is printed number ->
 * the leader's printed number of the SAME question, read off the printed
 * English pages on 2026-10-10 and checked option by option: every borrowed
 * MCQ prints its options in the leader's order, so it fingerprints to the
 * leader's row. Numbers absent from a map are the set's own transcription.
 */
export const CBSE_FOLLOWERS: Record<string, { leader: string; map: Record<string, string> }> = {
  "2025-65-5-2": {
    leader: "2025-65-5-1",
    map: {
      "1": "5", "2": "7", "4": "6", "5": "1", "6": "4", "7": "2", "9": "10", "10": "13", "13": "9",
      "15": "17", "16": "18", "17": "16", "18": "15", "19": "19", "20": "20",
      "23": "24", "24": "25", "25": "23",
      "27": "31", "29": "27", "30": "29", "31": "30",
      "34": "35", "35": "34",
      "36": "38", "37": "36", "38": "37",
    },
  },
  "2025-65-5-3": {
    leader: "2025-65-5-1",
    map: {
      "1": "7", "4": "5", "5": "4", "6": "2", "7": "1", "9": "13", "10": "9", "13": "10",
      "15": "16", "16": "15", "17": "18", "18": "17", "19": "19", "20": "20",
      "24": "23", "25": "24", "27": "30",
      "38": "36",
    },
  },
};
