import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_CE_KIRCHHOFF_NOTE: SubtopicNote = {
  subtopicName: "Kirchhoff's Rules and Wheatstone Bridge",
  title: "Kirchhoff's Rules and the Wheatstone Bridge",
  oneLineDefinition:
    "Kirchhoff's junction rule and loop rule, how to use them to find the current in every branch of a network, and the balance condition of a Wheatstone bridge.",
  whyItMatters:
    "29 questions, twenty-five of them from board papers from 2023 to 2026. The board asks you to state Kirchhoff's rules and name what each one conserves (2025, 2026), explain why current is a scalar (2026), find the currents in a network with two or three cells (every year from 2023 to 2026, nearly always from a figure), and derive the balance condition of a Wheatstone bridge (2024, 2026). The textbook adds the cube of twelve resistors, a network solved with three loops and an unbalanced bridge.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpce-kirchhoff-rules",
      name: "Kirchhoff's junction rule and loop rule",
      intuition:
        "Two rules solve any circuit. Charge cannot pile up at a junction, so what flows in must flow out. And potential depends only on where you are, like height on a hill: walk once round a closed loop and you are back where you started, so the rises and falls add to zero. Guess a direction for each current first; a negative answer just means the current flows the other way.",
      definition:
        "- **Junction rule:** at any junction, the sum of the currents entering equals the sum of the currents leaving. It holds because, with steady currents, no charge piles up at a junction: **conservation of charge**.\n" +
        "- **Loop rule:** the algebraic sum of the changes in potential round any closed loop of resistors and cells is zero. It holds because potential depends only on the location of a point: **conservation of energy**.\n" +
        "- Label each current with a symbol and an arrow. If a current comes out negative, it flows opposite to the arrow.\n" +
        "- Signs round a loop: through a resistor along the current, the potential falls by IR; against it, it rises by IR. Through a cell from − to +, it rises by \\(\\varepsilon\\); from + to −, it falls by \\(\\varepsilon\\).\n" +
        "- **Current is a scalar:** currents at a junction add as numbers whatever the angles between the wires, so they do not obey vector addition. The arrow only shows the sense of flow.\n" +
        "- Points joined by plain wire with no resistance or cell between them are at the same potential.",
      formula: {
        label: "Kirchhoff's rules",
        latex: "\\sum I_{\\text{in}} = \\sum I_{\\text{out}}, \\qquad \\sum \\Delta V = 0 \\ \\text{round a closed loop}",
      },
      authoredExample: {
        prompt:
          "A cell of emf 12 V and internal resistance 1 Ω is connected to resistors of 3 Ω and 2 Ω in series. Use the loop rule to find the current, and the terminal voltage of the cell.",
        steps: [
          "Given: \\(\\varepsilon = 12\\) V, \\(r = 1\\ \\Omega\\), \\(R_1 = 3\\ \\Omega\\), \\(R_2 = 2\\ \\Omega\\). Let the current be I.",
          "Loop rule, going round in the direction of the current: \\(12 - 3I - 2I - 1 \\times I = 0\\).",
          "\\(6I = 12\\), so \\(I = 2\\) A.",
          "Terminal voltage: \\(V = \\varepsilon - Ir = 12 - 2 \\times 1 = 10\\) V.",
        ],
        answer: "2 A; terminal voltage 10 V",
      },
      selfCheckExample: {
        prompt: "At a junction, a current of 3 A flows in, and currents of 1.2 A and 0.5 A flow out along two wires. Find the current in the only other wire and its direction.",
        steps: ["In: 3 A. Out so far: \\(1.2 + 0.5 = 1.7\\) A.", "By the junction rule the other wire carries \\(3 - 1.7\\) A out."],
        answer: "1.3 A, flowing out of the junction",
      },
      practiceSet: [
        { prompt: "Kirchhoff's junction rule rests on the conservation of which quantity?", answer: "Electric charge" },
        { prompt: "Kirchhoff's loop rule rests on the conservation of which quantity?", answer: "Energy" },
        {
          prompt: "Going round a loop, you pass through a resistor R against the direction of its current I. What is the change in potential?",
          answer: "A rise of IR, written \\(+IR\\)",
        },
      ],
      pyqExampleId: "01e858fb-167e-41eb-921a-e051014a4af2",
      traps: [
        {
          title: "Swapping the two conservation laws",
          body: "The junction rule conserves charge; the loop rule conserves energy. The board asks this as a one-mark question, so learn which is which.",
        },
        {
          title: "Calling current a vector because it has an arrow",
          body: "The arrow shows only the sense of flow along the wire. Current is a scalar because currents meeting at a junction add as numbers, not by the parallelogram rule.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpce-kirchhoff-networks",
      name: "Solving a network for branch currents",
      intuition:
        "Use the junction rule first, to write every branch current in terms of as few unknowns as possible. Then pick as many closed loops as you have unknowns and write the loop rule for each. Solve the equations, and check your answer with a loop you did not use. A cell whose current comes out flowing into its positive terminal is being charged.",
      definition:
        "- **Step 1:** mark a current, with an arrow, in each branch. Use the junction rule at each junction to cut the number of unknowns.\n" +
        "- **Step 2:** choose as many independent closed loops as there are unknowns and write the loop rule for each, with the sign rules.\n" +
        "- **Step 3:** solve the equations. A negative current flows against its arrow.\n" +
        "- **Step 4:** check with a loop you did not use.\n" +
        "- A branch with a fully charged capacitor carries **no current** in the steady state; find the voltage across it from the rest of the circuit.\n" +
        "- Use symmetry where it is there: branches placed alike in the network carry equal currents, as in the cube of equal resistors.",
      formula: {
        label: "The two rules in use",
        latex: "\\sum I = 0 \\ \\text{(each junction)}, \\qquad \\sum \\varepsilon = \\sum IR \\ \\text{(each loop)}",
      },
      authoredExample: {
        prompt:
          "A cell of emf 12 V and internal resistance 4 Ω and a cell of emf 6 V and internal resistance 4 Ω are joined in parallel, like terminals together, across an 8 Ω resistor. Use Kirchhoff's rules to find the current in each cell and in the resistor.",
        steps: [
          "Let \\(I_1\\) leave the 12 V cell and \\(I_2\\) leave the 6 V cell at their positive terminals. Junction rule: the resistor carries \\(I_1 + I_2\\).",
          "Loop with the 12 V cell and the resistor: \\(12 - 4I_1 - 8(I_1 + I_2) = 0\\), so \\(12I_1 + 8I_2 = 12\\).",
          "Loop with the 6 V cell and the resistor: \\(6 - 4I_2 - 8(I_1 + I_2) = 0\\), so \\(8I_1 + 12I_2 = 6\\).",
          "Solving: \\(I_1 = 1.2\\) A and \\(I_2 = -0.3\\) A. The resistor carries \\(1.2 - 0.3 = 0.9\\) A.",
          "\\(I_2\\) is negative: 0.3 A flows into the positive terminal of the 6 V cell, so that cell is being charged.",
        ],
        answer: "1.2 A from the 12 V cell, 0.3 A into the 6 V cell, 0.9 A through the 8 Ω resistor",
      },
      selfCheckExample: {
        prompt: "Cells of emf 10 V and 4 V are joined in a single loop so that they oppose each other. The total resistance of the loop, including the cells, is 4 Ω. Find the current.",
        steps: ["Net emf \\(10 - 4 = 6\\) V; \\(I = \\dfrac{6}{4}\\) A."],
        answer: "1.5 A, driven by the 10 V cell",
      },
      practiceSet: [
        {
          prompt: "In the steady state, what current flows in a branch that contains a fully charged capacitor?",
          answer: "None",
        },
        {
          prompt: "A network has three unknown branch currents after the junction rule is used. How many loop equations do you need?",
          answer: "Three, from three independent loops",
        },
        {
          prompt: "A branch current through a cell comes out as \\(-0.5\\) A, with its arrow drawn out of the positive terminal. What is happening to the cell?",
          answer: "0.5 A flows into its positive terminal, so the cell is being charged",
        },
      ],
      pyqExampleId: "781540ee-1ac1-42ac-b108-e9c105bd40fd",
      traps: [
        {
          title: "Changing a current's direction between loops",
          body: "Once you mark a current's arrow, use that same direction in every loop equation. Reversing it in the second loop is the commonest cause of a wrong answer.",
        },
        {
          title: "Writing fewer equations than unknowns",
          body: "Three unknown currents need three independent equations. A loop that only repeats the other two adds nothing; pick loops that each include a branch not yet used.",
        },
        {
          title: "Not stating the direction of the answer",
          body: "When asked for the 'magnitude and direction' of a current, give both: say which way it flows (for example from B to C), not just the number of amperes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpce-wheatstone",
      name: "The Wheatstone bridge and its balance condition",
      intuition:
        "Four resistors make a diamond, with the cell across one diagonal and a galvanometer across the other. Adjust them until the galvanometer reads zero: then its two ends are at the same potential, the current splits into two separate paths, and the four resistances satisfy a simple ratio. Only ratios of resistances appear, so the cell's emf does not matter.",
      definition:
        "- **Set-up:** \\(R_1\\) in arm AD, \\(R_2\\) in arm AB, \\(R_3\\) in arm DC, \\(R_4\\) in arm BC. The source is across A and C (the battery arm), the galvanometer across B and D (the galvanometer arm).\n" +
        "- **Balanced bridge:** no current through the galvanometer, \\(I_g = 0\\).\n" +
        "- Junction rule at D and B: \\(I_1 = I_3\\) and \\(I_2 = I_4\\).\n" +
        "- Loop ADBA: \\(-I_1R_1 + 0 + I_2R_2 = 0\\), so \\(\\dfrac{I_1}{I_2} = \\dfrac{R_2}{R_1}\\).\n" +
        "- Loop CBDC: \\(I_2R_4 + 0 - I_1R_3 = 0\\), so \\(\\dfrac{I_1}{I_2} = \\dfrac{R_4}{R_3}\\).\n" +
        "- **Balance condition:** \\(\\dfrac{R_2}{R_1} = \\dfrac{R_4}{R_3}\\). An unknown \\(R_4\\) is then \\(R_4 = R_3\\dfrac{R_2}{R_1}\\).\n" +
        "- Interchanging the cell and the galvanometer leaves the balance condition unchanged.\n" +
        "- If the bridge is not balanced, find the galvanometer current with Kirchhoff's rules.",
      formula: {
        label: "Balance condition",
        latex: "\\frac{R_2}{R_1} = \\frac{R_4}{R_3}",
      },
      authoredExample: {
        prompt:
          "In a Wheatstone bridge, \\(R_1 = 10\\ \\Omega\\) (arm AD), \\(R_2 = 15\\ \\Omega\\) (arm AB) and \\(R_3 = 20\\ \\Omega\\) (arm DC). What resistance \\(R_4\\) in arm BC gives no deflection in the galvanometer?",
        steps: [
          "Given: \\(R_1 = 10\\ \\Omega\\), \\(R_2 = 15\\ \\Omega\\), \\(R_3 = 20\\ \\Omega\\).",
          "Formula: at balance, \\(\\dfrac{R_2}{R_1} = \\dfrac{R_4}{R_3}\\), so \\(R_4 = R_3\\,\\dfrac{R_2}{R_1}\\).",
          "Substitution: \\(R_4 = 20 \\times \\dfrac{15}{10} = 30\\ \\Omega\\).",
        ],
        answer: "R₄ = 30 Ω",
      },
      selfCheckExample: {
        prompt: "A bridge has P = 4 Ω and Q = 8 Ω in one pair of arms and R = 5 Ω and S = 10 Ω in the other, arranged so that balance needs P/Q = R/S. Is it balanced?",
        steps: ["\\(\\dfrac{P}{Q} = \\dfrac{4}{8} = 0.5\\) and \\(\\dfrac{R}{S} = \\dfrac{5}{10} = 0.5\\)."],
        answer: "Yes, the ratios are equal, so no current flows through the galvanometer",
      },
      practiceSet: [
        { prompt: "What current flows through the galvanometer of a balanced Wheatstone bridge?", answer: "None" },
        { prompt: "Does the balance condition depend on the emf of the cell?", answer: "No. It contains only the four resistances" },
        {
          prompt: "The cell and the galvanometer of a balanced bridge are interchanged. Is the bridge still balanced?",
          answer: "Yes. \\(\\dfrac{P}{Q} = \\dfrac{R}{S}\\) is the same condition as \\(\\dfrac{P}{R} = \\dfrac{Q}{S}\\)",
        },
      ],
      pyqExampleId: "22e99cbc-f8ff-4935-9131-7c6059369824",
      traps: [
        {
          title: "Deriving without the circuit diagram",
          body: "A derivation of the balance condition carries a mark for the labelled circuit: the four resistances in their arms, the cell with its key across one diagonal, the galvanometer across the other, and the currents marked.",
        },
        {
          title: "Saying a small current flows at balance",
          body: "At balance the galvanometer current is zero, not small. The board has set this as a false reason in an assertion and reason item.",
        },
      ],
    },
  ],
};
