import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/current-electricity";

export const BRIDGES_NOTE: SubtopicNote = {
  subtopicName: "Wheatstone Bridge and Meter Bridge",
  title: "The Wheatstone Bridge and the Metre Bridge",
  oneLineDefinition:
    "A Wheatstone bridge of four resistances P, Q, R and S is balanced, with no current in the galvanometer, when P/Q = R/S; the metre bridge is the same bridge with R and S replaced by the two lengths of a uniform wire, so an unknown resistance is read as X/R = l/(100 − l).",
  whyItMatters:
    "17 PYQs, 6 of them HARD. Nine are the Wheatstone bridge, mostly from a figure: the balancing condition with a parallel pair in one arm, the current drawn from a battery once a balanced middle arm is dropped, the direction of current through an unbalanced galvanometer, and how to rebalance a disturbed bridge. " +
    "Eight are the metre bridge — the null point after the resistances are swapped, doubled or shunted, and why a thicker wire changes nothing. " +
    "Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-ce-wheatstone",
      name: "The Balanced Bridge",
      intuition:
        "At balance the two ends of the galvanometer are at the same potential, so no current flows through it and that arm can simply be removed. What remains is two pairs of series resistances in parallel, which makes equivalent-resistance and battery-current questions easy: check P/Q = R/S first, and if it holds, delete the middle arm whatever its resistance. If the bridge is not balanced, find the potential at each end of the galvanometer by treating each side as a voltage divider; current flows from the higher end to the lower. A disturbed bridge is rebalanced by any change that restores the ratio, in either pair.",
      definition:
        "- **Balance**: \\(\\dfrac{P}{Q} = \\dfrac{R}{S}\\), no current in the galvanometer arm.\n" +
        "- At balance **remove the middle arm**: \\(R_{eq} = (P + Q) \\parallel (R + S)\\).\n" +
        "- A **parallel pair** in one arm counts as its equivalent: \\(S = \\dfrac{S_1S_2}{S_1 + S_2}\\).\n" +
        "- **Unbalanced**: each side is a divider; current flows through the galvanometer from the higher potential to the lower.\n" +
        "- A galvanometer reading unchanged with a switch open or closed means that switch's arm carries no current.",
      formula: {
        label: "Balance condition",
        latex: "\\frac{P}{Q} = \\frac{R}{S}",
      },
      authoredExample: {
        prompt: "P = 10 Ω, Q = 20 Ω, R = 15 Ω, S = 30 Ω, with a 7 Ω galvanometer between the junctions. Equivalent resistance?",
        steps: ["10/20 = 15/30: balanced, so drop the 7 Ω arm.", "(10 + 20) ∥ (15 + 30) = 30 × 45/75 = 18 Ω."],
        answer: "18 Ω",
      },
      selfCheckExample: {
        prompt: "Arms 2 Ω, 4 Ω, 3 Ω and 6 Ω with 5 Ω across the middle. Equivalent resistance?",
        steps: ["2/4 = 3/6: balanced; 6 ∥ 9."],
        answer: "3.6 Ω",
      },
      practiceSet: [
        { prompt: "One arm is S₁ ∥ S₂. The balance condition for P/Q?", answer: "P/Q = R(S₁ + S₂)/(S₁S₂)" },
        { prompt: "Arms P = Q = 4 Ω, R = 1 Ω, S = 3 Ω. Is the bridge balanced?", answer: "No — 4/4 ≠ 1/3" },
      ],
      pyqExampleId: "3d7589ce-7e5a-48d7-b2dd-7b36c4a02c29",
      traps: [
        {
          title: "Solving a balanced bridge by Kirchhoff's laws",
          body:
            "Check the ratio first. If P/Q = R/S the middle arm carries nothing and can be deleted, whatever its resistance — the network collapses to two series pairs in parallel.",
        },
        {
          title: "Assuming a bridge is balanced because it looks symmetric",
          body:
            "Balance is a ratio, not a shape. Arms of 4, 4, 1 and 3 Ω are not balanced, and current flows through the galvanometer toward the lower-potential junction.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-ce-meter-bridge",
      name: "The Metre Bridge and its Null Point",
      intuition:
        "The metre bridge replaces two arms with a 100 cm uniform wire. Resistance of the wire is proportional to length, so at the null point l cm from the left end the unknown in the left gap satisfies X/R = l/(100 − l). Everything follows from that one line: swapping the resistances moves the null point from l to 100 − l; doubling both changes nothing, so doubling and swapping gives 100 − l; a thicker or longer wire of the same material also changes nothing because only the ratio of lengths enters. Shunting one gap lowers its resistance, and the null point moves away from it.",
      definition:
        "- \\(\\dfrac{X}{R} = \\dfrac{l}{100 - l}\\), l from the left end.\n" +
        "- **Interchange** the gaps: null point moves from l to \\(100 - l\\) (10 Ω and 30 Ω: 25 → 75 cm).\n" +
        "- **Scale both** resistances, or change the wire's area: null point **unchanged**.\n" +
        "- **Distance from the centre**: \\(|l - 50|\\).\n" +
        "- **Shunt** X across a gap: that gap becomes \\(\\dfrac{RX}{R + X}\\); re-solve the ratio.\n" +
        "- Resistance per unit length of a wire in the gap: \\(\\dfrac{\\text{its resistance}}{\\text{its length}}\\).",
      formula: {
        label: "Metre bridge",
        latex: "\\frac{X}{R} = \\frac{l}{100 - l}",
      },
      authoredExample: {
        prompt: "An unknown X in the left gap and 6 Ω in the right balance at 40 cm. X?",
        steps: ["X/6 = 40/60.", "X = 4 Ω."],
        answer: "4 Ω",
      },
      selfCheckExample: {
        prompt: "20 Ω left and 30 Ω right. Null point, and its shift when they are interchanged?",
        steps: ["l/(100 − l) = 2/3 ⇒ l = 40 cm; swapped, 60 cm."],
        answer: "40 cm; 20 cm to the right",
      },
      practiceSet: [
        { prompt: "Null point at l. Both resistances doubled and interchanged. New null point?", answer: "(100 − l) cm" },
        { prompt: "2 Ω and 3 Ω balance at 40 cm. What shunt on the 3 Ω moves the null point to 62.5 cm?", answer: "2 Ω" },
      ],
      pyqExampleId: "4613dac4-2cbc-47c7-ba1e-083964cf3268",
      traps: [
        {
          title: "Thinking a thicker wire moves the null point",
          body:
            "Every centimetre of the new wire has the same resistance as every other, so the ratio of the two lengths — the only thing the balance reads — is unchanged. The null point stays at l.",
        },
        {
          title: "Measuring from the wrong end",
          body:
            "l is measured from the end next to the gap it is paired with. 'From the centre' means |l − 50|: 40 Ω and 60 Ω balance at 40 cm, which is 10 cm left of the centre.",
        },
      ],
    },
  ],
  related: [
    { label: "Kirchhoff's Laws — solving the unbalanced case", href: `${BASE}/cetp-ce-kirchhoff` },
    { label: "Potentiometer — another null-point instrument", href: `${BASE}/cetp-ce-potentiometer` },
  ],
};
