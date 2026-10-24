import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RCL_GAPS_NOTE: SubtopicNote = {
  subtopicName: "Letter Gap Patterns",
  title: "Letter Gap Patterns",
  oneLineDefinition:
    "Letter clusters whose steps are not all the same: the gaps grow or shrink by a rule, or the letters move forward and back in turn. Write every gap and compare the whole list.",
  whyItMatters:
    "Thirty-nine questions in the bank, 14 from the 2023 shifts and 25 from the 2024 shifts, with 33 EASY and 6 MODERATE. The odd cluster usually differs in just one of its gaps, so the only safe method is to write every gap of every option and compare the lists side by side.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrclga-growing",
      name: "Gaps that grow or shrink by a rule",
      intuition:
        "Here the steps inside a cluster are not equal. Three clusters share the same list of steps, such as +1, +3, +5, and the odd one changes one number in that list. Once each cluster is a list of gaps, the odd one is easy to see.",
      definition:
        "1. Turn every letter into its position (A1 to Z26, using EJOTY to count fast).\n" +
        "2. Under each cluster, write the gap from each letter to the next: +2, +3, +5.\n" +
        "3. Put the four gap lists side by side. Three are the same list; the fourth differs in one place.\n" +
        "4. A gap that runs past Z wraps round: carry on from A. From X (24) a step of +5 lands on 29, which is C (29 minus 26 = 3).\n" +
        "- **Common gap lists:** +1, +3, +5 (odd numbers); +2, +4, +6 (even numbers); +4, +3, +2 (falling by one); +2, +3, +5 (primes); +3, +5, +7.\n" +
        "- **Fast route:** compare the first gap of all four options, then the second, then the third. Stop as soon as one option stands apart; there is no need to finish the others. This is safe only when the other three agree on every gap you have checked so far.",
      authoredExample: {
        prompt: "Find the odd one out: (a) CDGL (b) KLOT (c) MNQV (d) RSVZ",
        steps: [
          "Positions: C3 D4 G7 L12; K11 L12 O15 T20; M13 N14 Q17 V22; R18 S19 V22 Z26.",
          "Gaps: (a) +1, +3, +5. (b) +1, +3, +5. (c) +1, +3, +5.",
          "(d) +1, +3, +4. The last gap is one short.",
        ],
        answer: "(d) RSVZ",
      },
      selfCheckExample: {
        prompt: "Find the odd one out: (a) BDHN (b) JLPV (c) EGKQ (d) MOSX",
        steps: [
          "Positions: B2 D4 H8 N14; J10 L12 P16 V22; E5 G7 K11 Q17; M13 O15 S19 X24.",
          "Gaps: (a), (b) and (c) each go +2, +4, +6.",
          "(d) goes +2, +4, +5, so it breaks the list.",
        ],
        answer: "(d) MOSX",
      },
      practiceSet: [
        { prompt: "What are the gaps in the letter cluster BFIK?", answer: "+4, +3, +2", method: "B2, F6, I9, K11." },
        { prompt: "A cluster starts at G and its gaps are +2, +3, +4. What is the cluster?", answer: "GILP", method: "G7, I9, L12, P16." },
        { prompt: "In the cluster WYBF, what is the gap from Y to B?", answer: "+3", method: "Y to Z, A, B is three steps, wrapping round after Z." },
        { prompt: "Find the odd one out: ABD, KLN, PQS, TUX", answer: "TUX", method: "The others go +1, +2; TUX goes +1, +3." },
      ],
      pyqExampleId: "ff258302-0978-4400-a270-49d33101020a",
      traps: [
        {
          title: "Checking only the first gap",
          body:
            "Two clusters can share their first and second gaps and differ only at the third. A cluster is odd if any one of its gaps differs, so write the full list before you decide.",
        },
        {
          title: "Losing count when a step passes Z",
          body:
            "From X, a step of +5 is Y, Z, A, B, C, so it lands on C. Counting stops at Z for many students and gives a wrong gap; add 26 to the later letter's position, or subtract 26 from a total above 26.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrclga-both-ways",
      name: "Letters that move forward and back",
      intuition:
        "Some clusters move one way and then the other: back two, then forward four. The size of each step and its direction both belong to the pattern, so a step of 2 forward and a step of 2 back are different steps.",
      definition:
        "1. Write each gap with its sign: + for forward along the alphabet, minus for back.\n" +
        "2. Compare the signed lists. KIM is minus 2, then +4; KMI would be +2, then minus 4, a different pattern.\n" +
        "3. Backward steps can wrap too: before A comes Z. Three steps back from C is Z.\n" +
        "4. In a four-letter cluster, the pattern may pair letters instead: the 2nd is the 1st plus 3, and the 4th is the 3rd minus 3. Check each pair on its own.\n" +
        "- **Fast route:** if the letters of one option all run in a single direction while the other three turn round, that option is usually the answer. Confirm it by writing the signed gaps once.",
      authoredExample: {
        prompt: "Find the odd one out: (a) KIM (b) RPT (c) FDH (d) VTW",
        steps: [
          "Positions: K11 I9 M13; R18 P16 T20; F6 D4 H8; V22 T20 W23.",
          "Signed gaps: (a) minus 2, +4. (b) minus 2, +4. (c) minus 2, +4.",
          "(d) minus 2, +3. The second step is one short.",
        ],
        answer: "(d) VTW",
      },
      selfCheckExample: {
        prompt: "Find the odd one out: (a) DGEH (b) LOMP (c) SVTW (d) BEDG",
        steps: [
          "Positions: D4 G7 E5 H8; L12 O15 M13 P16; S19 V22 T20 W23; B2 E5 D4 G7.",
          "Signed gaps: (a), (b) and (c) each go +3, minus 2, +3.",
          "(d) goes +3, minus 1, +3, so it is the odd one.",
        ],
        answer: "(d) BEDG",
      },
      practiceSet: [
        { prompt: "What are the signed gaps in the cluster PNR?", answer: "Minus 2, then +4", method: "P16, N14, R18." },
        { prompt: "Which letter is three places before C, wrapping round before A?", answer: "Z", method: "B, A, then Z." },
        { prompt: "A cluster starts at Q; the second letter is 2 back and the third is 5 ahead of the second. What is the cluster?", answer: "QOT", method: "Q17, O15, T20." },
        { prompt: "Find the odd one out: NMK, GFD, UTR, JHF", answer: "JHF", method: "The others go minus 1, minus 2; JHF goes minus 2, minus 2." },
      ],
      pyqExampleId: "17983161-991e-4b5c-9889-f79ad2939370",
      traps: [
        {
          title: "Dropping the direction of a step",
          body:
            "Written without signs, KIM and KMI both read as gaps of 2 and 4, yet one goes back then forward and the other forward then back. Keep the plus or minus on every gap.",
        },
        {
          title: "Wrapping the wrong way at the start of the alphabet",
          body:
            "Going back from A or B, carry on from Z: two places back from A is Y. Adding 26 to the position before you subtract avoids a negative number.",
        },
      ],
    },
  ],
};
