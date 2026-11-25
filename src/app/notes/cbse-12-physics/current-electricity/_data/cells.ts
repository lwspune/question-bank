import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_CE_CELLS_NOTE: SubtopicNote = {
  subtopicName: "Cells, EMF and Internal Resistance",
  title: "Cells: EMF, Internal Resistance and Combinations",
  oneLineDefinition:
    "The emf and internal resistance of a cell, the terminal voltage V = ε − Ir and its graphs, and the emf and internal resistance of cells joined in series and in parallel.",
  whyItMatters:
    "39 questions, thirty-six of them from board papers from 2023 to 2026. The board asks you to find the emf and internal resistance from two readings (2023, 2024, 2025), distinguish emf from terminal voltage (2023, 2025), draw V against I and V against R and read ε and r from the graph (2023, 2025), derive the emf and internal resistance of two cells in parallel (2023, 2025, 2026), and deal with cells joined the wrong way round in series (2024, 2025). The textbook adds the largest current a car battery can give and a battery being charged.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpce-terminal-voltage",
      name: "Emf, internal resistance and terminal voltage",
      intuition:
        "A cell is like a pump with a little resistance of its own inside. With no current drawn, the voltmeter across it reads its full emf. Draw a current and part of the emf is used up pushing the current through the electrolyte, so the voltage at the terminals drops by Ir. The more current you draw, the bigger the drop.",
      definition:
        "- **Emf** \\(\\varepsilon\\): the potential difference between the positive and negative electrodes in an **open circuit**, when no current flows. \\(\\varepsilon = V_+ + V_-\\), and it is a potential difference, not a force.\n" +
        "- **Internal resistance** r: the resistance of the electrolyte through which the current flows inside the cell.\n" +
        "- **Terminal voltage** while the cell gives a current I: \\(V = \\varepsilon - Ir\\). The drop inside the cell, Ir, is proportional to the current.\n" +
        "- With an external resistance R: \\(V = IR\\), so \\(I = \\dfrac{\\varepsilon}{R + r}\\) and \\(V = \\dfrac{\\varepsilon R}{R + r}\\).\n" +
        "- The largest current is at \\(R = 0\\): \\(I_{max} = \\dfrac{\\varepsilon}{r}\\). Most cells must be kept far below this to avoid damage.\n" +
        "- Two readings \\((I_1, V_1)\\) and \\((I_2, V_2)\\) give two equations \\(\\varepsilon = V + Ir\\): solve them for \\(\\varepsilon\\) and r.\n" +
        "- A low-voltage supply that must give a large current needs a very low r, since \\(I_{max} = \\varepsilon/r\\).",
      formula: {
        label: "Terminal voltage",
        latex: "V = \\varepsilon - Ir, \\qquad I = \\frac{\\varepsilon}{R + r}",
        symbols: [
          { symbol: "\\(\\varepsilon\\)", meaning: "emf of the cell" },
          { symbol: "\\(r\\)", meaning: "internal resistance of the cell" },
          { symbol: "\\(V\\)", meaning: "terminal voltage, the potential difference across R" },
        ],
      },
      authoredExample: {
        prompt:
          "When a cell gives a current of 1.0 A, its terminal voltage is 2.8 V. When it gives 3.0 A, the terminal voltage is 2.4 V. Find the emf and the internal resistance of the cell.",
        steps: [
          "Formula: \\(\\varepsilon = V + Ir\\) for each reading.",
          "First reading: \\(\\varepsilon = 2.8 + 1.0\\,r\\). Second reading: \\(\\varepsilon = 2.4 + 3.0\\,r\\).",
          "Subtracting: \\(0 = 0.4 - 2.0\\,r\\), so \\(r = 0.2\\ \\Omega\\).",
          "Substituting back: \\(\\varepsilon = 2.8 + 1.0 \\times 0.2 = 3.0\\) V.",
        ],
        answer: "ε = 3.0 V, r = 0.2 Ω",
      },
      selfCheckExample: {
        prompt: "A cell of emf 9 V and internal resistance 1.5 Ω is connected to a 6 Ω resistor. Find the current and the terminal voltage.",
        steps: ["\\(I = \\dfrac{9}{6 + 1.5} = 1.2\\) A.", "\\(V = \\varepsilon - Ir = 9 - 1.2 \\times 1.5 = 7.2\\) V."],
        answer: "1.2 A; 7.2 V",
      },
      practiceSet: [
        { prompt: "A cell has emf 6 V and internal resistance 0.3 Ω. What is the largest current it can give?", answer: "\\(I_{max} = \\dfrac{6}{0.3} = 20\\) A" },
        {
          prompt: "A battery of emf 9 V gives a current of 1.5 A to a 5.4 Ω resistor. Find its internal resistance.",
          answer: "\\(R + r = \\dfrac{9}{1.5} = 6\\ \\Omega\\), so \\(r = 0.6\\ \\Omega\\)",
        },
        { prompt: "The potential drop inside a cell is proportional to which quantity?", answer: "The current drawn from the cell" },
      ],
      pyqExampleId: "361281ca-bb4e-401c-a1d1-a2992feebcf7",
      traps: [
        {
          title: "Forgetting r in the current",
          body: "The current is \\(\\varepsilon/(R + r)\\), not \\(\\varepsilon/R\\). Leaving r out gives too large a current and loses the calculation mark.",
        },
        {
          title: "Reading the open-circuit value as the terminal voltage under load",
          body: "A voltmeter across a cell with no current drawn reads the emf. Once current flows it reads \\(\\varepsilon - Ir\\), which is less.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpce-emf-graphs",
      name: "Emf against terminal voltage, and the cell's graphs",
      intuition:
        "Three answers come up again and again: the difference between emf and terminal voltage, the straight line of V against I, and the curve of V against R. They all come from the two equations V = ε − Ir and I = ε/(R + r), so learn to read each graph from those.",
      definition:
        "- From \\(V = \\varepsilon - Ir\\), a graph of V against I is a straight line of slope \\(-r\\) cutting the V axis at \\(\\varepsilon\\) and the I axis at \\(\\varepsilon/r\\).\n" +
        "- From \\(V = \\dfrac{\\varepsilon R}{R + r}\\), V is zero at \\(R = 0\\) and rises towards \\(\\varepsilon\\) as R becomes very large.\n" +
        "- From \\(I = \\dfrac{\\varepsilon}{R + r}\\), I is \\(\\varepsilon/r\\) at \\(R = 0\\) and falls towards zero as R grows.",
      table: {
        columns: ["Asked", "What to write or draw", "What it shows"],
        rows: [
          {
            cells: [
              "Emf and terminal voltage",
              "Emf: the potential difference across the terminals in open circuit. Terminal voltage: the potential difference across the terminals while a current I flows, V = ε − Ir",
              "Emf belongs to the cell alone; the terminal voltage falls as more current is drawn",
            ],
            pyqExampleId: "5c8e3772-7ac2-441b-9852-4211ec15f9be",
            noteAmber: "Board 2023 asked for two differences and the main precaution while drawing current: never short-circuit the cell.",
          },
          {
            cells: [
              "V against I",
              "A straight line with negative slope, from ε on the V axis down to ε/r on the I axis",
              "The intercept on the V axis is ε; the size of the slope is r",
            ],
            pyqExampleId: "f521b37f-3649-480e-91f9-56d00cdc1390",
            noteAmber: "Board 2023 and 2025 asked for this graph and how to find ε and r from it.",
          },
          {
            cells: [
              "V against R",
              "A curve from the origin, rising steeply and then levelling off towards ε",
              "No terminal voltage on short circuit; nearly the full emf for a very large R",
            ],
            pyqExampleId: "f906487b-3ca6-4c8b-80ad-1166f9de0eae",
            noteAmber: "Board 2025 asked for V and I against R as R is raised from zero.",
          },
          {
            cells: [
              "I against R",
              "A curve starting at ε/r on the I axis and falling towards the R axis",
              "The largest current, ε/r, flows on short circuit",
            ],
          },
        ],
      },
      practiceSet: [
        {
          prompt: "On one V against I graph, the line for cell A is steeper than the line for cell B. Which cell has the larger internal resistance?",
          answer: "Cell A. The size of the slope is r",
        },
        { prompt: "What is the terminal voltage of a cell when its terminals are joined by a thick wire of no resistance?", answer: "Zero" },
      ],
      traps: [
        {
          title: "Drawing V against R as a straight line",
          body: "Only V against I is a straight line. V against R is a curve that starts at the origin and flattens towards ε; it never reaches ε.",
        },
        {
          title: "A difference that covers one side only",
          body: "\"Emf is the voltage on open circuit\" is half a difference. Each point must say what the emf is and what the terminal voltage is, side by side.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpce-cells-series",
      name: "Cells in series, a reversed cell and charging",
      intuition:
        "Cells in series push one after another, so their emfs add, and the current must pass through every internal resistance, so those add too. Turn one cell round and it pushes the wrong way: it does not just stop helping, it takes its emf off the total. A cell that has current forced into its positive terminal is being charged, and its terminal voltage is then more than its emf.",
      definition:
        "- **Series**, current leaving each cell from its positive electrode: \\(\\varepsilon_{eq} = \\varepsilon_1 + \\varepsilon_2 + \\dots\\) and \\(r_{eq} = r_1 + r_2 + \\dots\\)\n" +
        "- A cell whose current leaves from its **negative** electrode enters with a minus sign: \\(\\varepsilon_{eq} = \\varepsilon_1 - \\varepsilon_2\\). Its internal resistance still adds.\n" +
        "- So in a row of n equal cells with one reversed, \\(\\varepsilon_{eq} = (n - 2)\\varepsilon\\), not \\((n - 1)\\varepsilon\\), while \\(r_{eq} = nr\\).\n" +
        "- **Charging:** when current enters at the positive terminal, \\(V = \\varepsilon + Ir\\).\n" +
        "- A resistor in series in a charging circuit limits the current drawn from the supply.",
      formula: {
        label: "Cells in series",
        latex: "\\varepsilon_{eq} = \\varepsilon_1 + \\varepsilon_2 + \\dots, \\qquad r_{eq} = r_1 + r_2 + \\dots, \\qquad V_{\\text{charging}} = \\varepsilon + Ir",
      },
      authoredExample: {
        prompt:
          "Six cells, each of emf 2 V and internal resistance 0.25 Ω, are joined in series, but one is connected the wrong way round. The row is connected to a 2.5 Ω resistor. Find the current, and the potential difference across the reversed cell.",
        steps: [
          "Emf: five cells aid and one opposes, \\(\\varepsilon_{eq} = 5 \\times 2 - 2 = 8\\) V.",
          "Internal resistance: \\(r_{eq} = 6 \\times 0.25 = 1.5\\ \\Omega\\).",
          "Current: \\(I = \\dfrac{8}{2.5 + 1.5} = 2\\) A.",
          "The current enters the reversed cell at its positive terminal, so it is being charged: \\(V = \\varepsilon + Ir = 2 + 2 \\times 0.25 = 2.5\\) V.",
        ],
        answer: "2 A; 2.5 V across the reversed cell",
      },
      selfCheckExample: {
        prompt: "A 12 V battery of internal resistance 0.5 Ω is being charged with a current of 3 A. Find its terminal voltage.",
        steps: ["Charging, so \\(V = \\varepsilon + Ir = 12 + 3 \\times 0.5\\)."],
        answer: "13.5 V",
      },
      practiceSet: [
        {
          prompt: "Three cells, each of emf 1.5 V and internal resistance 0.5 Ω, are joined in series to a 4.5 Ω resistor. Find the current.",
          answer: "\\(I = \\dfrac{3 \\times 1.5}{4.5 + 3 \\times 0.5} = \\dfrac{4.5}{6} = 0.75\\) A",
        },
        {
          prompt: "Two identical cells, each of emf 1.5 V and internal resistance 1 Ω, are joined to a 1 Ω resistor, first in series and then in parallel. Find the current in each case.",
          answer: "Series: \\(\\dfrac{3}{1 + 2} = 1\\) A. Parallel: \\(\\dfrac{1.5}{1 + 0.5} = 1\\) A. They are equal because R = r",
        },
        { prompt: "Why is a resistor put in series when a battery is charged from a high-voltage dc supply?", answer: "To limit the charging current" },
      ],
      pyqExampleId: "88631089-c618-4d93-a919-4b568c2cffc1",
      traps: [
        {
          title: "A reversed cell costs only its own emf",
          body: "Turning one cell round changes the total by twice its emf: it loses its push and adds a push the other way. Its internal resistance is still in the circuit.",
        },
        {
          title: "Using V = ε − Ir for a cell being charged",
          body: "When current is forced in at the positive terminal, the terminal voltage is larger than the emf: \\(V = \\varepsilon + Ir\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpce-cells-parallel",
      name: "Cells in parallel",
      intuition:
        "Cells joined positive to positive and negative to negative must share one terminal voltage. Together they act like a single cell whose emf lies between theirs, pulled towards the cell with the smaller internal resistance, and whose internal resistance is smaller than either. Parallel cells do not give a bigger voltage; they can give more current.",
      definition:
        "- Two cells \\((\\varepsilon_1, r_1)\\) and \\((\\varepsilon_2, r_2)\\) with like terminals joined at \\(B_1\\) and \\(B_2\\); currents \\(I_1, I_2\\) leave their positive electrodes, and \\(I = I_1 + I_2\\).\n" +
        "- Both have the same terminal voltage: \\(V = \\varepsilon_1 - I_1r_1 = \\varepsilon_2 - I_2r_2\\).\n" +
        "- So \\(I = \\dfrac{\\varepsilon_1 - V}{r_1} + \\dfrac{\\varepsilon_2 - V}{r_2} = \\left(\\dfrac{\\varepsilon_1}{r_1} + \\dfrac{\\varepsilon_2}{r_2}\\right) - V\\left(\\dfrac{1}{r_1} + \\dfrac{1}{r_2}\\right)\\).\n" +
        "- Hence \\(V = \\dfrac{\\varepsilon_1r_2 + \\varepsilon_2r_1}{r_1 + r_2} - I\\,\\dfrac{r_1r_2}{r_1 + r_2}\\).\n" +
        "- Compare with \\(V = \\varepsilon_{eq} - Ir_{eq}\\): \\(\\varepsilon_{eq} = \\dfrac{\\varepsilon_1r_2 + \\varepsilon_2r_1}{r_1 + r_2}\\) and \\(r_{eq} = \\dfrac{r_1r_2}{r_1 + r_2}\\).\n" +
        "- For n cells: \\(\\dfrac{1}{r_{eq}} = \\sum \\dfrac{1}{r_i}\\) and \\(\\dfrac{\\varepsilon_{eq}}{r_{eq}} = \\sum \\dfrac{\\varepsilon_i}{r_i}\\). A cell joined the other way round enters with \\(-\\varepsilon\\).",
      formula: {
        label: "Two cells in parallel",
        latex: "\\varepsilon_{eq} = \\frac{\\varepsilon_1 r_2 + \\varepsilon_2 r_1}{r_1 + r_2}, \\qquad r_{eq} = \\frac{r_1 r_2}{r_1 + r_2}",
      },
      authoredExample: {
        prompt:
          "A cell of emf 8 V and internal resistance 2 Ω and a cell of emf 2 V and internal resistance 2 Ω are joined in parallel, like terminals together, across a 9 Ω resistor. Find the current through the resistor.",
        steps: [
          "Given: \\(\\varepsilon_1 = 8\\) V, \\(r_1 = 2\\ \\Omega\\); \\(\\varepsilon_2 = 2\\) V, \\(r_2 = 2\\ \\Omega\\); \\(R = 9\\ \\Omega\\).",
          "\\(\\varepsilon_{eq} = \\dfrac{8 \\times 2 + 2 \\times 2}{2 + 2} = \\dfrac{20}{4} = 5\\) V.",
          "\\(r_{eq} = \\dfrac{2 \\times 2}{2 + 2} = 1\\ \\Omega\\).",
          "\\(I = \\dfrac{\\varepsilon_{eq}}{R + r_{eq}} = \\dfrac{5}{9 + 1} = 0.5\\) A.",
          "The terminal voltage is \\(0.5 \\times 9 = 4.5\\) V, more than 2 V, so the 2 V cell is being charged by the 8 V cell.",
        ],
        answer: "0.5 A",
      },
      selfCheckExample: {
        prompt:
          "Four identical cells, each of emf 2 V and internal resistance 1.2 Ω, are joined in parallel. Find the largest current the combination can give.",
        steps: ["\\(\\varepsilon_{eq} = 2\\) V and \\(r_{eq} = \\dfrac{1.2}{4} = 0.3\\ \\Omega\\).", "\\(I_{max} = \\dfrac{\\varepsilon_{eq}}{r_{eq}} = \\dfrac{2}{0.3}\\)."],
        answer: "6.7 A",
      },
      practiceSet: [
        {
          prompt: "Two cells, each of emf E, with internal resistances r and 2r, are joined in parallel but with the second cell turned the other way round. Find the equivalent emf.",
          answer: "\\(\\dfrac{\\varepsilon_{eq}}{r_{eq}} = \\dfrac{E}{r} - \\dfrac{E}{2r} = \\dfrac{E}{2r}\\) and \\(r_{eq} = \\dfrac{2r}{3}\\), so \\(\\varepsilon_{eq} = \\dfrac{E}{3}\\)",
        },
        {
          prompt: "Two cells of unequal emf are joined in parallel, like terminals together, with nothing else connected. Does any current flow?",
          answer: "Yes. A current flows round the loop of the two cells, and the cell of smaller emf is charged",
        },
        { prompt: "Is the internal resistance of cells in parallel larger or smaller than that of each cell?", answer: "Smaller" },
      ],
      pyqExampleId: "757be760-3558-4b5a-a37d-52b98a4a9eb3",
      traps: [
        {
          title: "Adding the emfs of cells in parallel",
          body: "In parallel the emfs do not add. Two equal cells in parallel have the emf of one cell; only the internal resistance changes.",
        },
        {
          title: "Weighting each emf by its own resistance",
          body: "In \\(\\varepsilon_{eq} = (\\varepsilon_1r_2 + \\varepsilon_2r_1)/(r_1 + r_2)\\), each emf is multiplied by the **other** cell's internal resistance. Mixing them up gives a wrong value.",
        },
      ],
    },
  ],
};
