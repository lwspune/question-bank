import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_CE_KIRCHHOFF_NOTE: SubtopicNote = {
  subtopicName: "Kirchhoff's Laws of Electrical Networks",
  title: "Kirchhoff's Laws and Cells in a Network",
  oneLineDefinition:
    "Kirchhoff's junction law and loop law, the two rules that solve any network of cells and resistors, and how to combine cells joined in parallel.",
  whyItMatters:
    "14 questions. Three were set in board papers: state Kirchhoff's first law (2026), name what the loop law conserves (2025), and find the current from two cells joined in parallel through a resistor (2022). The textbook adds networks with two batteries, cells in parallel, a loop of wire fed at two points and an infinite ladder of resistors.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpce-kirchhoff-laws",
      name: "Kirchhoff's junction law and loop law",
      intuition:
        "Two rules solve any circuit. Charge cannot pile up at a junction, so whatever current flows in must flow out. And electric potential is like height: walk once round a closed loop and you are back at the same potential, so all the rises and drops add to zero. Guess a direction for each current before you start; if an answer comes out negative, the current simply flows the other way.",
      definition:
        "- **First law (junction law):** the algebraic sum of the currents meeting at a junction is zero, \\(\\sum I = 0\\). Take currents flowing towards the junction as positive and those flowing away as negative. It is a statement of **conservation of charge**.\n" +
        "- **Second law (loop law):** in any closed loop, the algebraic sum of the products of current and resistance plus the algebraic sum of the e.m.f.s is zero, \\(\\sum IR + \\sum \\varepsilon = 0\\). It is a statement of **conservation of energy**.\n" +
        "- Signs while going round a loop: through a resistor in the direction of the current, the potential falls by \\(IR\\); against the current, it rises by \\(IR\\). Through a cell from \\(-\\) to \\(+\\), it rises by \\(\\varepsilon\\); from \\(+\\) to \\(-\\), it falls by \\(\\varepsilon\\).\n" +
        "- Both laws hold for AC circuits too, applied to the values at any one instant.",
      formula: {
        label: "Kirchhoff's laws",
        latex: "\\sum I = 0 \\ (\\text{junction}), \\qquad \\sum IR + \\sum \\varepsilon = 0 \\ (\\text{loop})",
      },
      authoredExample: {
        prompt:
          "A cell of e.m.f. 6 V and negligible internal resistance drives a current through resistors of 2 Ω and 4 Ω joined in series. Apply Kirchhoff's second law to find the current, and the potential difference across the 4 Ω resistor.",
        steps: [
          "Given: \\(\\varepsilon = 6\\) V, \\(R_1 = 2\\ \\Omega\\), \\(R_2 = 4\\ \\Omega\\). Let the current be \\(I\\).",
          "Going round the loop in the direction of the current: \\(-2I - 4I + 6 = 0\\).",
          "\\(6I = 6\\), so \\(I = 1\\) A.",
          "Potential difference across the 4 Ω resistor: \\(V = IR_2 = 1 \\times 4 = 4\\) V.",
        ],
        answer: "Current 1 A; potential difference across 4 Ω is 4 V",
      },
      selfCheckExample: {
        prompt:
          "At a junction, currents of 2 A and 3 A flow in, and a current of 1.5 A flows out along one wire. Find the current in the only other wire and its direction.",
        steps: ["In: \\(2 + 3 = 5\\) A. Out so far: 1.5 A.", "By the junction law the other wire carries \\(5 - 1.5 = 3.5\\) A out."],
        answer: "3.5 A, flowing away from the junction",
      },
      practiceSet: [
        { prompt: "Kirchhoff's junction law is a statement of the conservation of which quantity?", answer: "Electric charge" },
        { prompt: "Kirchhoff's loop law is a statement of the conservation of which quantity?", answer: "Energy" },
        { prompt: "Going round a loop through a resistor R in the direction of a current I, what is the change in potential?", answer: "A fall of \\(IR\\), written \\(-IR\\)" },
        { prompt: "Solving a network gives a branch current of \\(-0.5\\) A. What does the minus sign tell you?", answer: "The current flows opposite to the direction you guessed" },
      ],
      pyqExampleId: "998e7f12-f9eb-4b82-9704-096a9687b36f",
      traps: [
        {
          title: "State the sign convention with the law",
          body: "Writing only \\(\\sum I = 0\\) is half an answer. Say that currents towards the junction are taken positive and those away from it negative, and name the conservation law it rests on.",
        },
        {
          title: "Swapping the two conservation laws",
          body: "The junction law conserves charge; the loop law conserves energy. The board asks this as a one-mark question, so learn which is which.",
        },
        {
          title: "Changing the guessed direction mid-way",
          body: "Once you guess a direction for a current, use the same direction in every loop equation. Switching it in the second loop is the commonest cause of a wrong answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpce-cells-parallel",
      name: "Cells joined in parallel",
      intuition:
        "Two cells joined with like poles together share the same terminal voltage, so they behave like one cell with an e.m.f. somewhere between theirs and a smaller internal resistance. If one cell is much weaker, the stronger one can even push current backwards through it and charge it. In series the e.m.f.s add; in parallel they do not.",
      definition:
        "- Two cells of e.m.f.s \\(\\varepsilon_1, \\varepsilon_2\\) and internal resistances \\(r_1, r_2\\), joined in parallel with like poles together, act as one cell of e.m.f. \\(\\varepsilon_{eq} = \\dfrac{\\varepsilon_1/r_1 + \\varepsilon_2/r_2}{1/r_1 + 1/r_2}\\) and internal resistance \\(r_{eq} = \\dfrac{r_1 r_2}{r_1 + r_2}\\).\n" +
        "- Current through an external resistance R: \\(I = \\dfrac{\\varepsilon_{eq}}{R + r_{eq}}\\).\n" +
        "- \\(n\\) identical cells (e.m.f. \\(\\varepsilon\\), internal resistance \\(r\\)) in parallel: e.m.f. \\(\\varepsilon\\), internal resistance \\(r/n\\).\n" +
        "- The same answer comes from Kirchhoff's laws: write one loop through each cell and the external resistor.",
      formula: {
        label: "Two cells in parallel",
        latex: "\\varepsilon_{eq} = \\frac{\\varepsilon_1/r_1 + \\varepsilon_2/r_2}{1/r_1 + 1/r_2}, \\qquad r_{eq} = \\frac{r_1 r_2}{r_1 + r_2}",
      },
      authoredExample: {
        prompt:
          "A cell of e.m.f. 6 V and internal resistance 2 Ω is joined in parallel with a cell of e.m.f. 3 V and internal resistance 1 Ω, like poles together. The pair sends current through an external resistance of 4 Ω. Find the current through the 4 Ω resistor.",
        steps: [
          "Given: \\(\\varepsilon_1 = 6\\) V, \\(r_1 = 2\\ \\Omega\\); \\(\\varepsilon_2 = 3\\) V, \\(r_2 = 1\\ \\Omega\\); \\(R = 4\\ \\Omega\\).",
          "\\(\\varepsilon_{eq} = \\dfrac{6/2 + 3/1}{1/2 + 1/1} = \\dfrac{6}{1.5} = 4\\) V.",
          "\\(r_{eq} = \\dfrac{2 \\times 1}{2 + 1} = \\dfrac{2}{3}\\ \\Omega\\).",
          "\\(I = \\dfrac{\\varepsilon_{eq}}{R + r_{eq}} = \\dfrac{4}{4 + 2/3} = \\dfrac{12}{14} = 0.857\\) A.",
          "The terminal voltage is \\(0.857 \\times 4 = 3.43\\) V, more than 3 V, so the 3 V cell is being charged by the 6 V cell.",
        ],
        answer: "0.857 A (6/7 A)",
      },
      selfCheckExample: {
        prompt:
          "Two identical cells, each of e.m.f. 2 V and internal resistance 1 Ω, are joined in parallel and connected to a 1.5 Ω resistor. Find the current in the resistor.",
        steps: ["Equivalent e.m.f. 2 V; equivalent internal resistance \\(1/2 = 0.5\\ \\Omega\\).", "\\(I = \\dfrac{2}{1.5 + 0.5} = 1\\) A."],
        answer: "1 A",
      },
      practiceSet: [
        { prompt: "Two identical cells, each of e.m.f. E and internal resistance r, are joined in parallel. What are the e.m.f. and internal resistance of the pair?", answer: "E and \\(r/2\\)" },
        { prompt: "Three identical cells of internal resistance 0.6 Ω each are joined in parallel. Find the internal resistance of the combination.", answer: "0.2 Ω" },
        { prompt: "Do the e.m.f.s of cells add when the cells are joined in parallel?", answer: "No. They add only in series" },
      ],
      pyqExampleId: "078b569c-894e-44af-8560-fb3c7ff4703d",
      traps: [
        {
          title: "Adding e.m.f.s of cells in parallel",
          body: "Two 2 V cells in parallel give 2 V, not 4 V. Only the internal resistance changes. Use the weighted formula when the cells differ.",
        },
        {
          title: "Leaving out the internal resistance",
          body: "The current is \\(\\varepsilon_{eq}/(R + r_{eq})\\). Dividing by R alone gives too large a current and loses the calculation mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpce-networks",
      name: "Reducing a network of resistors",
      intuition:
        "Before writing any loop equation, look for resistors that are simply in series (one after another, same current) or in parallel (across the same two points, same potential difference). Replace them by one resistor, and repeat until one resistor is left. A loop of wire fed at two points is two arcs in parallel. An infinite ladder looks the same after you remove its first rung, which gives an equation for its resistance.",
      definition:
        "- **Series:** \\(R_s = R_1 + R_2 + \\dots\\) (same current through each).\n" +
        "- **Parallel:** \\(\\dfrac{1}{R_p} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dots\\) (same potential difference across each).\n" +
        "- A uniform loop of resistance R fed at two points splits into two arcs in proportion to their lengths, and the arcs are in **parallel**.\n" +
        "- **Infinite ladder:** call its resistance R. Removing the first rung leaves the same ladder, so R equals the first series resistor plus the first shunt in parallel with R. Solve the quadratic and keep the positive root.",
      formula: {
        label: "Series and parallel",
        latex: "R_s = R_1 + R_2 + \\dots, \\qquad \\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots",
      },
      authoredExample: {
        prompt:
          "Resistors of 6 Ω and 3 Ω are joined in parallel, and the pair is joined in series with a 4 Ω resistor across a 12 V battery of negligible internal resistance. Find the current drawn from the battery and the current in the 3 Ω resistor.",
        steps: [
          "Parallel pair: \\(R_p = \\dfrac{6 \\times 3}{6 + 3} = 2\\ \\Omega\\).",
          "Total resistance: \\(R = 2 + 4 = 6\\ \\Omega\\). Current from the battery: \\(I = \\dfrac{12}{6} = 2\\) A.",
          "Potential difference across the parallel pair: \\(2 \\times 2 = 4\\) V.",
          "Current in the 3 Ω resistor: \\(\\dfrac{4}{3} = 1.33\\) A.",
        ],
        answer: "2 A from the battery; 1.33 A in the 3 Ω resistor",
      },
      selfCheckExample: {
        prompt: "Using all three of three 2 Ω resistors, what are the largest and the smallest resistances you can make?",
        steps: ["All in series: \\(2 + 2 + 2 = 6\\ \\Omega\\).", "All in parallel: \\(2/3\\ \\Omega\\)."],
        answer: "6 Ω and 2/3 Ω",
      },
      practiceSet: [
        { prompt: "Resistors of 10 Ω, 12 Ω and 15 Ω are joined in parallel. Find the combined resistance.", answer: "4 Ω" },
        { prompt: "Why can the part of an infinite ladder after its first rung be replaced by the whole ladder?", answer: "Removing one rung from an infinite ladder leaves the same infinite ladder" },
        { prompt: "How many 1 Ω resistors must be joined in parallel to give 0.25 Ω?", answer: "Four" },
      ],
      pyqExampleId: "5b6a51bf-dc87-4ddd-a36d-3a20f38050b6",
      traps: [
        {
          title: "Taking the arcs of a loop in series",
          body: "Two points on a loop are joined by two separate paths, so the arcs are in parallel between those points, not in series.",
        },
        {
          title: "Keeping the negative root of the ladder equation",
          body: "The quadratic for an infinite ladder has one positive and one negative root. A resistance cannot be negative, so keep the positive root.",
        },
      ],
    },
  ],
};
