import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_CE_BRIDGES_NOTE: SubtopicNote = {
  subtopicName: "Wheatstone Bridge and Metre Bridge",
  title: "The Wheatstone Bridge and the Metre Bridge",
  oneLineDefinition:
    "The balancing condition of a Wheatstone network, the metre bridge that uses it to find an unknown resistance, its sources of error, and Kelvin's method for the resistance of a galvanometer.",
  whyItMatters:
    "17 questions, eight of them from board papers in seven different years. The board asks you to derive the balancing condition (2024), explain the metre bridge with a circuit diagram (2018, 2025), describe Kelvin's method (2016), state sources of error (2026), find an unknown resistance from one balance point (2017) and find X and Y from two balance points (2020, 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpce-wheatstone",
      name: "The Wheatstone network and its balancing condition",
      intuition:
        "A Wheatstone network is four resistors in a square, a cell across one diagonal and a galvanometer across the other. Think of it as two potential dividers side by side. When both divide the voltage in the same ratio, the two middle points sit at the same potential, so no current flows through the galvanometer. That is balance, and it gives one simple equation between the four resistances.",
      definition:
        "- Resistances P (AB), Q (BC), R (DC) and S (AD) form a quadrilateral ABCD; the cell is across AC and the galvanometer across BD.\n" +
        "- **Balanced** when the galvanometer shows no deflection: \\(I_g = 0\\), so B and D are at the same potential.\n" +
        "- Derivation outline: with \\(I_g = 0\\), the current \\(I_1\\) in P also flows through Q, and the current \\(I_2\\) in S also flows through R. Kirchhoff's loop law for ABDA gives \\(I_1 P = I_2 S\\); for BCDB it gives \\(I_1 Q = I_2 R\\). Dividing: \\(\\dfrac{P}{Q} = \\dfrac{S}{R}\\).\n" +
        "- At balance the result does not depend on the e.m.f. of the cell or the resistance of the galvanometer.",
      formula: {
        label: "Balancing condition",
        latex: "\\frac{P}{Q} = \\frac{S}{R} \\quad (I_g = 0)",
      },
      authoredExample: {
        prompt:
          "In a Wheatstone network P = 10 Ω, Q = 20 Ω and R = 30 Ω, labelled as in the definition. What value of S balances the network, and what current then flows through a 50 Ω galvanometer?",
        steps: [
          "Balancing condition: \\(\\dfrac{P}{Q} = \\dfrac{S}{R}\\), so \\(S = \\dfrac{P}{Q} R = \\dfrac{10}{20} \\times 30\\).",
          "\\(S = 15\\ \\Omega\\).",
          "At balance no current flows through the galvanometer, whatever its resistance.",
        ],
        answer: "S = 15 Ω; galvanometer current zero",
      },
      selfCheckExample: {
        prompt: "Four resistors of 2 Ω, 4 Ω, 6 Ω and 12 Ω form a Wheatstone network with P = 2 Ω, Q = 4 Ω, S = 6 Ω and R = 12 Ω. Is it balanced?",
        steps: ["\\(P/Q = 2/4 = 0.5\\) and \\(S/R = 6/12 = 0.5\\)."],
        answer: "Yes, the ratios are equal",
      },
      practiceSet: [
        { prompt: "How much current flows through the galvanometer of a balanced Wheatstone network?", answer: "None" },
        { prompt: "Does the balancing condition depend on the e.m.f. of the cell?", answer: "No" },
        { prompt: "In a balanced network with P = 5 Ω, Q = 10 Ω and S = 4 Ω, find R.", answer: "8 Ω" },
      ],
      pyqExampleId: "f816dcee-fb60-4f22-877b-da47ac19b967",
      traps: [
        {
          title: "Skipping why B and D are at the same potential",
          body: "The derivation earns its marks at the start: say that at balance \\(I_g = 0\\), so B and D are at the same potential and the same current flows through P and Q. Without that line the two loop equations do not follow.",
        },
        {
          title: "Pairing the wrong arms",
          body: "The ratio compares the two arms on one side of the galvanometer with the two on the other side, in the same order. Label the quadrilateral and write each arm's resistance next to its letters before you divide.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpce-metre-bridge",
      name: "The metre bridge",
      intuition:
        "A metre bridge is a Wheatstone network built on one metre of uniform wire. The wire supplies two of the four arms, and sliding the jockey along it changes their ratio until the galvanometer reads zero. Because the wire is uniform, its resistance is proportional to its length, so the ratio of the two arms is just the ratio of the two lengths of wire.",
      definition:
        "- **Construction:** a uniform wire exactly 1 m long on a metre scale, ends under thick copper strips that leave two gaps. The unknown X goes in the left gap, a resistance box R in the right gap, a cell and key across the wire, and a galvanometer from the middle strip to the jockey.\n" +
        "- **Working:** the jockey is tapped along the wire to find the null point D, where the galvanometer shows no deflection.\n" +
        "- **Result:** with \\(l_X\\) the length beside X and \\(l_R = 100 - l_X\\) the length beside R (in cm), \\(\\dfrac{X}{R} = \\dfrac{l_X}{l_R}\\).\n" +
        "- The wire is of an alloy such as constantan, whose resistance hardly changes with temperature.",
      formula: {
        label: "Metre bridge at balance",
        latex: "X = R\\,\\frac{l_X}{100 - l_X}",
      },
      authoredExample: {
        prompt:
          "An unknown resistance X is in the left gap of a metre bridge and a 20 Ω resistance is in the right gap. The null point is 60 cm from the left end. Find X.",
        steps: [
          "Given: \\(R = 20\\ \\Omega\\), \\(l_X = 60\\) cm, so \\(l_R = 100 - 60 = 40\\) cm.",
          "Formula: \\(X = R\\,\\dfrac{l_X}{l_R}\\).",
          "\\(X = 20 \\times \\dfrac{60}{40} = 30\\ \\Omega\\).",
        ],
        answer: "X = 30 Ω",
      },
      selfCheckExample: {
        prompt: "With 12 Ω in the right gap of a metre bridge, the null point is 40 cm from the left end. Find the resistance in the left gap.",
        steps: ["\\(l_R = 60\\) cm.", "\\(X = 12 \\times \\dfrac{40}{60} = 8\\ \\Omega\\)."],
        answer: "8 Ω",
      },
      practiceSet: [
        { prompt: "Equal resistances are placed in the two gaps of a metre bridge. Where is the null point?", answer: "At 50 cm" },
        { prompt: "The null point of a metre bridge is at 40 cm. Where is it after the resistances in the two gaps are interchanged?", answer: "At 60 cm" },
        { prompt: "Why must the metre bridge wire have a uniform cross section?", answer: "So that the resistance of any part is proportional to its length" },
      ],
      pyqExampleId: "480908bf-8c97-4652-a0f0-1a7361b5e788",
      traps: [
        {
          title: "Measuring both lengths from the same end",
          body: "\\(l_X\\) is measured from the end beside X; \\(l_R\\) is the rest of the wire, \\(100 - l_X\\). Putting the same length in both places gives X = R every time.",
        },
        {
          title: "Explaining without a diagram",
          body: "A question that says 'with a neat circuit diagram' gives marks for the diagram: label the gaps, X, R, the cell and key, the galvanometer, the jockey and the null point D.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpce-bridge-errors",
      name: "Sources of error in a metre bridge and how to reduce them",
      intuition:
        "The metre bridge assumes a perfectly uniform wire whose ends meet the copper strips with no extra resistance. Neither is quite true, and a length read near one end has a large percentage error. Each source of error has a matching precaution, so learn them in pairs.",
      definition:
        "- The board asks for 'any two sources of error and how they can be minimised'. Give each error with its precaution.\n" +
        "- The null point is kept in the **middle one third** of the wire (34 cm to 66 cm), so that both lengths are large and their percentage errors are small and nearly equal.",
      table: {
        columns: ["Source of error", "Why it matters", "How it is reduced"],
        rows: [
          {
            cells: ["End resistance at the copper strips", "Adds a little resistance to each arm that the formula leaves out", "Interchange X and R, take the null point again, and use the mean result"],
            pyqExampleId: "a00fc602-d1c1-4f33-82aa-d816765711da",
            noteAmber: "Board 2026 asked for two sources of error and how to minimise them.",
          },
          {
            cells: ["Wire not of uniform cross section", "Resistance is then not proportional to length", "Use a uniform wire and never slide the jockey, which scrapes it"],
          },
          {
            cells: ["Null point near one end", "A short length has a large percentage error", "Choose R so that the null point lies in the middle one third"],
          },
          {
            cells: ["Heating of the wire", "Resistance changes while current keeps flowing", "Close the key only while taking a reading"],
          },
        ],
      },
      practiceSet: [
        { prompt: "Between which marks should the null point of a metre bridge lie?", answer: "Between about 34 cm and 66 cm, the middle one third" },
        { prompt: "Why should the jockey be tapped and not slid along the wire?", answer: "Sliding scrapes the wire and spoils its uniform cross section" },
      ],
      traps: [
        {
          title: "Listing errors without the precaution",
          body: "The question asks how each error is minimised. An error with no matching precaution earns only half its marks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpce-kelvin",
      name: "Kelvin's method for the resistance of a galvanometer",
      intuition:
        "To find a galvanometer's own resistance, put the galvanometer itself in one gap of the metre bridge, as one of the four arms. Current then flows through it all the time. Find the point on the wire where touching the jockey makes no change in its deflection: there the branch through the jockey carries no current, so the bridge is balanced.",
      definition:
        "- The galvanometer G is in one gap and a resistance box R in the other; the jockey joins the wire to the middle strip.\n" +
        "- A rheostat sets a steady deflection (about two thirds of full scale) before the jockey is used.\n" +
        "- **Balance:** the point on the wire where the deflection does **not change** when the jockey touches the wire. It is not a zero deflection.\n" +
        "- With \\(l_G\\) the length beside the galvanometer: \\(\\dfrac{G}{R} = \\dfrac{l_G}{100 - l_G}\\).",
      formula: {
        label: "Kelvin's method",
        latex: "G = R\\,\\frac{l_G}{100 - l_G}",
      },
      authoredExample: {
        prompt:
          "In Kelvin's method, the resistance box holds 60 Ω. The deflection stays the same when the jockey touches the wire at 40 cm from the galvanometer's end. Find the resistance of the galvanometer.",
        steps: [
          "Given: \\(R = 60\\ \\Omega\\), \\(l_G = 40\\) cm, so the other length is 60 cm.",
          "\\(G = R\\,\\dfrac{l_G}{100 - l_G} = 60 \\times \\dfrac{40}{60} = 40\\ \\Omega\\).",
        ],
        answer: "G = 40 Ω",
      },
      selfCheckExample: {
        prompt: "In Kelvin's method, what does the galvanometer show at the balance point?",
        steps: ["Current flows through the galvanometer all the time, because it is one of the arms."],
        answer: "The same deflection whether or not the jockey touches the wire",
      },
      practiceSet: [
        { prompt: "In Kelvin's method, where is the galvanometer placed?", answer: "In one gap of the metre bridge, as one arm of the bridge" },
        { prompt: "In Kelvin's method, R = 30 Ω and the balance point is at 50 cm. Find G.", answer: "30 Ω" },
      ],
      pyqExampleId: "369cf762-c669-4ab0-b739-c9699fe3e745",
      traps: [
        {
          title: "Looking for zero deflection",
          body: "In Kelvin's method the galvanometer always deflects. The balance point is where the deflection does not change, and saying 'zero deflection' loses the mark for the method.",
        },
      ],
    },
  ],
};
