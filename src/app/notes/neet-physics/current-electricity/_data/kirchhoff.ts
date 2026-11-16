import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_CE_KIRCHHOFF_NOTE: SubtopicNote = {
  subtopicName: "Kirchhoff's Rules and Bridges",
  title: "Kirchhoff's Rules and Bridges",
  oneLineDefinition:
    "Kirchhoff's junction and loop rules for circuits that series and parallel cannot reduce, the balanced Wheatstone bridge, and the metre bridge and potentiometer that use it.",
  whyItMatters:
    "Nine NEET questions from 2021 to 2026, the largest share of this chapter, and every one but the 2021 potentiometer question comes with a circuit figure. Two use Kirchhoff's rules directly. Four are about the Wheatstone bridge: three turn on spotting a balance and dropping the middle arm, and one asks which arms make it most precise. Three are about the metre bridge and potentiometer: a balance length, and what happens when the cell and galvanometer swap places.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphce-kirchhoff",
      name: "Kirchhoff's junction and loop rules",
      intuition:
        "Two rules solve any circuit. Charge cannot pile up at a junction, so whatever current flows in must flow out. And the electric potential is like height: go once round any closed loop and you are back where you started, so all the rises and drops add to zero. Guess a direction for each current; a negative answer just means the current flows the other way.",
      definition:
        "- **Junction rule** (conservation of charge): at any junction, the sum of currents in equals the sum of currents out.\n" +
        "- **Loop rule** (conservation of energy): round any closed loop, the sum of the changes in potential is zero.\n" +
        "- Signs going round a loop: across a resistor in the direction of the current, \\(-IR\\); against it, \\(+IR\\). Across a cell from − to +, \\(+E\\); from + to −, \\(-E\\).\n" +
        "- Two cells opposing each other in one loop with total resistance R: \\(I = \\dfrac{E_1 - E_2}{R}\\), in the direction the larger emf pushes.\n" +
        "- If no current flows through a branch, the two ends of that branch are at the same potential.",
      formula: {
        label: "Kirchhoff's rules",
        latex: "\\sum I_{\\text{in}} = \\sum I_{\\text{out}}, \\qquad \\sum_{\\text{loop}} \\Delta V = 0",
      },
      authoredExample: {
        prompt:
          "A 12 V cell and a 4 V cell are joined in one loop with their positive terminals facing each other, through a total resistance of 4 Ω (internal resistances included). Find the current and its direction.",
        steps: [
          "The cells oppose each other, so the net emf is \\(12 - 4 = 8\\) V.",
          "\\(I = \\dfrac{8}{4} = 2\\) A.",
          "The current flows in the direction the 12 V cell drives it, so it enters the 4 V cell at its positive terminal (charging it).",
        ],
        answer: "2 A, driven by the 12 V cell",
      },
      selfCheckExample: {
        prompt:
          "At a junction, currents of 3 A and 2 A flow in and a current of 4 A flows out along one wire. What current flows in the only other wire, and which way?",
        steps: [
          "In: \\(3 + 2 = 5\\) A. Out so far: 4 A.",
          "The junction rule needs 1 A more going out.",
        ],
        answer: "1 A, out of the junction",
      },
      practiceSet: [
        { prompt: "Which conservation law is Kirchhoff's junction rule based on?", answer: "Conservation of charge" },
        { prompt: "Which conservation law is Kirchhoff's loop rule based on?", answer: "Conservation of energy" },
        { prompt: "Going round a loop through a resistor R in the direction of a current I, what is the change in potential?", answer: "\\(-IR\\)" },
        { prompt: "Solving a circuit gives a branch current of −0.5 A. What does the minus sign mean?", answer: "It flows opposite to the direction guessed" },
      ],
      pyqExampleId: "84da0f27-9a6a-406a-bea2-c4d9616f20a0",
      traps: [
        {
          title: "Opposing cells subtract",
          body: "Two cells joined positive to positive in one loop push against each other. The net emf is the difference, and the current goes the way the larger emf pushes.",
        },
        {
          title: "Keep the signs in step with your guess",
          body: "Once a current direction is guessed, use the same direction for every IR term in every loop. Switching mid-way is the commonest source of a wrong answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphce-wheatstone",
      name: "The Wheatstone bridge",
      intuition:
        "A Wheatstone bridge is two potential dividers side by side with a galvanometer across the middle. When both dividers split the voltage in the same ratio, the two middle points sit at the same potential and no current flows through the galvanometer. That middle arm can then be removed, or joined by a plain wire, without changing anything, and the rest is simple series and parallel.",
      definition:
        "- Arms P and Q on one side, R and S on the other, galvanometer between the middle points. **Balance:** \\(\\dfrac{P}{Q} = \\dfrac{R}{S}\\).\n" +
        "- At balance the galvanometer current is zero, whatever resistance is in that middle arm. Remove it, then reduce: \\((P + Q)\\) in parallel with \\((R + S)\\).\n" +
        "- A square of four equal resistors with a resistor along one diagonal, fed across the other diagonal, is a balanced bridge: the diagonal resistor carries no current.\n" +
        "- The bridge is most sensitive (most precise) when all four arms have resistances of the same order.",
      formula: {
        label: "Balance condition",
        latex: "\\frac{P}{Q} = \\frac{R}{S} \\quad\\Rightarrow\\quad I_g = 0",
      },
      authoredExample: {
        prompt:
          "In a Wheatstone bridge P = 4 Ω, Q = 8 Ω, R = 6 Ω and S = 12 Ω, with a 5 Ω galvanometer in the middle arm. A 9 V battery of negligible internal resistance is joined across the bridge. Find the current from the battery.",
        steps: [
          "\\(\\dfrac{P}{Q} = \\dfrac{4}{8} = \\dfrac{1}{2}\\) and \\(\\dfrac{R}{S} = \\dfrac{6}{12} = \\dfrac{1}{2}\\): balanced, so the 5 Ω arm carries nothing.",
          "\\(P + Q = 12\\ \\Omega\\) in parallel with \\(R + S = 18\\ \\Omega\\): \\(\\dfrac{12 \\times 18}{30} = 7.2\\ \\Omega\\).",
          "\\(I = \\dfrac{9}{7.2} = 1.25\\) A.",
        ],
        answer: "1.25 A",
      },
      selfCheckExample: {
        prompt:
          "Four equal 3 Ω resistors form a square ABCD, with a 10 Ω resistor joined from B to D. What is the resistance between A and C?",
        steps: [
          "By symmetry B and D are at the same potential, so the 10 Ω carries no current.",
          "Path ABC is 6 Ω and path ADC is 6 Ω, in parallel: 3 Ω.",
        ],
        answer: "3 Ω",
      },
      practiceSet: [
        { prompt: "In a balanced bridge P = 10 Ω, Q = 20 Ω and R = 15 Ω. Find S.", answer: "30 Ω" },
        { prompt: "How much current flows through the galvanometer of a balanced Wheatstone bridge?", answer: "None" },
        { prompt: "Does the galvanometer's own resistance affect the balance condition?", answer: "No" },
        { prompt: "When is a Wheatstone bridge most sensitive?", answer: "When all four resistances are of the same order" },
      ],
      pyqExampleId: "0968ec40-6352-43d0-b49a-e941eec18f63",
      traps: [
        {
          title: "Check the ratio before using Kirchhoff",
          body: "Before writing loop equations, test \\(P/Q = R/S\\). If it holds, the middle arm drops out and the circuit is plain series and parallel.",
        },
        {
          title: "The middle arm does not matter at balance",
          body: "At balance the galvanometer arm carries no current whatever its resistance, so a 2 Ω, a 10 Ω or a plain wire there gives the same total.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphce-metre-bridge",
      name: "The metre bridge and the potentiometer",
      intuition:
        "A metre bridge is a Wheatstone bridge in which a 1 m uniform wire forms two of the arms. Sliding the jockey along the wire changes the ratio of its two parts until the galvanometer reads zero. Because the wire is uniform, the ratio of its two resistances is just the ratio of the two lengths. A potentiometer uses a long uniform wire the same way: the balance length is proportional to the emf being balanced.",
      definition:
        "- Metre bridge with a known R in one gap and the unknown S in the other, balance at l cm from R's end: \\(\\dfrac{R}{S} = \\dfrac{l}{100 - l}\\).\n" +
        "- On a wire of any length L, the two parts are l and \\(L - l\\); measure each from its own end.\n" +
        "- Interchanging the cell and the galvanometer does not move the balance point. Away from it the galvanometer can deflect either way; at it, there is no deflection.\n" +
        "- Potentiometer, comparing two cells: \\(\\dfrac{E_1}{E_2} = \\dfrac{l_1}{l_2}\\), since the potential drop along the wire is the same per centimetre.",
      formula: {
        label: "Balance on a uniform wire",
        latex: "\\frac{R}{S} = \\frac{l}{100 - l}, \\qquad \\frac{E_1}{E_2} = \\frac{l_1}{l_2}",
      },
      authoredExample: {
        prompt:
          "In a metre bridge a 4 Ω resistor is in the left gap and an unknown resistor in the right gap. The balance point is 40 cm from the left end. Find the unknown resistance.",
        steps: [
          "\\(\\dfrac{4}{S} = \\dfrac{40}{60}\\).",
          "\\(S = 4 \\times \\dfrac{60}{40} = 6\\ \\Omega\\).",
        ],
        answer: "6 Ω",
      },
      selfCheckExample: {
        prompt:
          "In a metre bridge with 3 Ω in the left gap and 2 Ω in the right gap, where is the balance point, measured from the left end?",
        steps: [
          "\\(\\dfrac{3}{2} = \\dfrac{l}{100 - l}\\). Cross-multiply: \\(3(100 - l) = 2l\\).",
          "\\(300 = 5l\\), so \\(l = 60\\) cm.",
        ],
        answer: "60 cm",
      },
      practiceSet: [
        { prompt: "In a metre bridge the two gaps hold equal resistors. Where is the balance point?", answer: "At 50 cm" },
        { prompt: "A potentiometer balances a 2 V cell at 40 cm. At what length does it balance a 1.5 V cell?", answer: "30 cm" },
        { prompt: "Why must the wire of a metre bridge be uniform?", answer: "So that resistance is proportional to length" },
        { prompt: "The cell and galvanometer of a balanced metre bridge are interchanged. Does the balance point move?", answer: "No" },
      ],
      pyqExampleId: "4da47a3e-6d9a-4edf-9c83-20bf002fb980",
      traps: [
        {
          title: "Measure each part from its own end",
          body: "The length beside the left resistor is measured from the left end; the other part is the rest of the wire. A question asking for the distance from the other end wants \\(L - l\\).",
        },
        {
          title: "Swapping the cell and galvanometer keeps the balance",
          body: "The balance condition depends only on the four resistances, so interchanging the cell and galvanometer leaves the null point where it was.",
        },
      ],
    },
  ],
};
