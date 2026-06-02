import type { SubtopicNote } from "@/app/notes/_types";

export const RESISTOR_COMBINATIONS_NOTE: SubtopicNote = {
  subtopicName: "Combination of Resistors",
  title: "Combination of Resistors",
  oneLineDefinition:
    "Resistors in series add (R = R₁ + R₂ + …); resistors in parallel combine by reciprocals (1/R = 1/R₁ + 1/R₂ + …). Every network reduces by collapsing the innermost series/parallel groups one step at a time.",
  whyItMatters:
    "This is the chapter's marquee subtopic — 16 PYQs at 38% HARD, the bank's single biggest HARD pool. " +
    "Master five shapes and you own these marks: pure series, pure parallel, mixed series-parallel reduction, the 'cut a wire then reconnect' trick, and minimum-vs-maximum resistance. " +
    "Series always gives the LARGEST equivalent, parallel the SMALLEST — that one fact answers a surprising number of questions outright.",
  concepts: [
    // 1 — series (foundation)
    {
      kind: "formula" as const,
      slug: "series-combination",
      name: "Resistors in series",
      intuition:
        "In series the same current flows through every resistor (one path), and the voltages across them add up. So the resistances simply add — the combination is always BIGGER than the largest single resistor.",
      definition:
        "Resistors in **series** carry the **same current**; their voltages add. The equivalent resistance is the sum:\n" +
        "**\\(R_\\text{series} = R_1 + R_2 + \\cdots\\)** — always larger than the biggest individual resistor.",
      formula: {
        label: "Series equivalent",
        latex: "R_\\text{series} = R_1 + R_2 + \\cdots + R_n",
      },
      authoredExample: {
        prompt:
          "A 2 Ω, a 3 Ω, and a 5 Ω resistor are connected in series. What is the equivalent resistance?",
        steps: [
          "Series resistances add directly.",
          "\\(R = 2 + 3 + 5 = 10\\,\\Omega\\).",
        ],
        answer: "10 Ω.",
      },
      practiceSet: [
        { prompt: "Two 6 Ω resistors in series give…", answer: "12 Ω" },
        { prompt: "In series, which quantity is the same through every resistor?", answer: "The current" },
        { prompt: "Is the series equivalent bigger or smaller than the largest resistor?", answer: "Bigger" },
      ],
      traps: [
        {
          title: "Series = same current, voltages add",
          body:
            "Don't confuse the two combinations. Series: one current path, add the resistances. The combination can never be smaller than any single resistor in it.",
        },
      ],
    },

    // 2 — parallel
    {
      kind: "formula" as const,
      slug: "parallel-combination",
      name: "Resistors in parallel",
      intuition:
        "In parallel the same voltage sits across every resistor, and the currents through them add. Giving the charge extra paths can only make it easier to flow, so the equivalent resistance is always SMALLER than the smallest single resistor. For n EQUAL resistors R, the parallel value is just R/n.",
      definition:
        "Resistors in **parallel** have the **same voltage** across them; their currents add. The reciprocal of the equivalent equals the sum of reciprocals:\n" +
        "**\\(\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\cdots\\)** — always smaller than the smallest branch.\n" +
        "Two resistors: \\(R = \\dfrac{R_1 R_2}{R_1 + R_2}\\). " +
        "**\\(n\\) equal resistors** \\(R\\): equivalent \\(= R/n\\).",
      formula: {
        label: "Parallel equivalent",
        latex: "\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\cdots \\qquad (\\text{two: } R = \\tfrac{R_1R_2}{R_1+R_2})",
      },
      authoredExample: {
        prompt:
          "A 6 Ω and a 3 Ω resistor are connected in parallel. What is the equivalent resistance?",
        steps: [
          "Two-resistor shortcut: \\(R = \\dfrac{R_1 R_2}{R_1+R_2}\\).",
          "\\(R = \\dfrac{6\\times 3}{6+3} = \\dfrac{18}{9} = 2\\,\\Omega\\).",
          "Note it's smaller than 3 Ω, the smaller branch — as parallel always is.",
        ],
        answer: "2 Ω.",
      },
      selfCheckExample: {
        prompt:
          "Two equal resistors R in parallel are connected across a 12 V battery and draw a total current of 100 mA. Find R.",
        steps: [
          "Two equal R in parallel give an equivalent of \\(R/2\\).",
          "Equivalent resistance from the circuit: \\(R_\\text{eq} = V/I = 12 / 0.1 = 120\\,\\Omega\\).",
          "So \\(R/2 = 120 \\Rightarrow R = 240\\,\\Omega\\).",
        ],
        answer: "R = 240 Ω.",
      },
      practiceSet: [
        { prompt: "Three 1 Ω resistors in parallel give…", answer: "1/3 Ω", method: "equal resistors: R/n = 1/3" },
        { prompt: "Three equal resistors R in parallel give…", answer: "R/3" },
        { prompt: "A 4 Ω and 4 Ω in parallel give…", answer: "2 Ω", method: "R/n with n = 2" },
      ],
      pyqExampleId: "e11ff06b-b727-4c81-bb66-83381ab0aef1", // 2021 — three equal in parallel ⟹ R/3
      traps: [
        {
          title: "Parallel value is SMALLER than the smallest branch",
          body:
            "If you compute a parallel combination and get something bigger than one of the branches, you've made an error. Adding paths reduces resistance. For two equal R the answer is R/2, never 2R.",
        },
      ],
    },

    // 3 — mixed networks
    {
      kind: "formula" as const,
      slug: "mixed-networks",
      name: "Reducing mixed series-parallel networks",
      intuition:
        "Most circuit questions are nested: a parallel cluster sitting inside a series chain, or vice versa. The method is always the same — find the innermost pure-series or pure-parallel group, collapse it to one resistor, redraw, and repeat until a single number is left.",
      definition:
        "**Reduction algorithm:** (1) spot a sub-group that is purely series OR purely parallel; (2) replace it with its equivalent; (3) redraw and repeat. " +
        "A short-circuit (0 Ω) branch across two points forces those points to the same potential — current takes the zero-resistance path. " +
        "For self-similar **infinite ladders**, set the whole network equal to \\(R_\\infty\\) and solve the resulting equation (the rest of the ladder is identical to the whole).",
      visualizationSlug: "resistors-series-parallel",
      authoredExample: {
        prompt:
          "Three resistors 2 Ω, 4 Ω and 4 Ω: the two 4 Ω are in parallel, and that pair is in series with the 2 Ω. Find the equivalent resistance.",
        steps: [
          "Innermost group: 4 Ω ∥ 4 Ω = \\(4/2 = 2\\,\\Omega\\) (equal pair).",
          "Now in series with the 2 Ω resistor: \\(2 + 2 = 4\\,\\Omega\\).",
        ],
        answer: "4 Ω.",
      },
      selfCheckExample: {
        prompt:
          "A 2 Ω, 4 Ω and 8 Ω resistor are all in parallel, and that combination is in series with a 1 Ω resistor. Find the total resistance.",
        steps: [
          "Parallel part: \\(\\dfrac1{R_p} = \\dfrac12 + \\dfrac14 + \\dfrac18 = \\dfrac{4+2+1}{8} = \\dfrac{7}{8}\\).",
          "So \\(R_p = 8/7\\,\\Omega\\).",
          "Add the series 1 Ω: \\(R = \\dfrac87 + 1 = \\dfrac{15}{7}\\,\\Omega\\).",
        ],
        answer: "15/7 Ω ≈ 2.14 Ω.",
      },
      practiceSet: [
        { prompt: "First step in reducing any resistor network?", answer: "Collapse the innermost pure series/parallel group" },
        { prompt: "Current through a 0 Ω (short-circuit) branch in parallel with a resistor?", answer: "All of it takes the 0 Ω path", method: "zero resistance = path of least resistance" },
        { prompt: "(6 Ω in series with 6 Ω), all in parallel with 12 Ω → equivalent?", answer: "6 Ω", method: "12 ∥ 12 = 6" },
      ],
      pyqExampleId: "236ae3f2-adad-4223-b7be-00dc076eca63", // 2024 — (5+7) ∥ 36 = 9 Ω
      traps: [
        {
          title: "Collapse innermost first — don't add everything blindly",
          body:
            "You can't add a series and a parallel resistor in one step. Identify a sub-group that is PURELY one kind, reduce it, redraw, and only then look at the next group. Mixing the two rules in a single step is the most common network error.",
        },
      ],
    },

    // 4 — cut and recombine
    {
      kind: "formula" as const,
      slug: "cut-and-recombine",
      name: "Cutting a wire and reconnecting it",
      intuition:
        "Cut a wire of resistance R into n equal pieces and each piece has resistance R/n (shorter = less resistance). Reconnect those n pieces in parallel and you divide again by n — so the final resistance is R/n². A ring measured across a diameter is just two equal half-rings in parallel.",
      definition:
        "Cut a wire of resistance \\(R\\) into \\(n\\) equal pieces ⟹ each piece is \\(R/n\\). " +
        "Connect all \\(n\\) pieces in **parallel** ⟹ equivalent \\(= \\dfrac{R/n}{n} = \\dfrac{R}{n^2}\\). " +
        "A uniform **ring** of total resistance \\(R\\), measured across any diameter, behaves as two \\(R/2\\) arcs in parallel = \\(R/4\\).",
      formula: {
        label: "Cut into n, reconnect in parallel",
        latex: "R_\\text{final} = \\dfrac{R}{n^2}",
      },
      authoredExample: {
        prompt:
          "A 12 Ω wire is cut into three equal pieces, and the three pieces are connected in parallel. What is the equivalent resistance?",
        steps: [
          "Each piece: \\(12/3 = 4\\,\\Omega\\).",
          "Three 4 Ω in parallel (equal): \\(4/3\\,\\Omega\\).",
          "Shortcut check: \\(R/n^2 = 12/9 = 4/3\\,\\Omega\\). ✓",
        ],
        answer: "4/3 Ω ≈ 1.33 Ω.",
      },
      selfCheckExample: {
        prompt:
          "A uniform circular ring has total resistance 20 Ω. What is the resistance between the two ends of any diameter?",
        steps: [
          "A diameter splits the ring into two equal semicircular arcs.",
          "Each arc is half the ring: \\(20/2 = 10\\,\\Omega\\).",
          "The two arcs connect the same two points ⟹ they are in PARALLEL: \\(10 \\parallel 10 = 5\\,\\Omega\\).",
        ],
        answer: "5 Ω.",
      },
      practiceSet: [
        { prompt: "A 50 Ω wire cut into 5 equal pieces, reconnected in parallel → ?", answer: "2 Ω", method: "R/n² = 50/25" },
        { prompt: "A 20 Ω wire cut into 2, reconnected in parallel → ?", answer: "5 Ω", method: "each 10 Ω, in parallel = 5" },
        { prompt: "Cut R into n pieces and parallel them: final resistance?", answer: "R/n²" },
      ],
      pyqExampleId: "8820356f-1542-4d22-ab6c-73e5acfcaa87", // 2022 — 50 Ω cut into 5, parallel ⟹ 2 Ω
      traps: [
        {
          title: "Cut + parallel = R/n², not R/n",
          body:
            "Two effects stack: cutting into n pieces makes each R/n, AND paralleling n of them divides by another n. The combined result is R/n². Stopping at R/n is the dominant wrong answer.",
        },
      ],
    },

    // 5 — min / max resistance
    {
      kind: "formula" as const,
      slug: "min-max-resistance",
      name: "Minimum and maximum resistance",
      intuition:
        "Given a fixed set of resistors, you get the LARGEST possible resistance by wiring them all in series, and the SMALLEST by wiring them all in parallel. So 'which arrangement gives minimum resistance?' is really 'which is the most-parallel of the cheapest resistors?'",
      definition:
        "For any fixed collection of resistors: **all in series ⟹ maximum** equivalent (the sum); **all in parallel ⟹ minimum** equivalent (below the smallest branch). " +
        "To minimise resistance, parallel the smallest-valued resistors; to maximise, put the largest in series.",
      authoredExample: {
        prompt:
          "You have two 6 Ω resistors. What are the maximum and minimum resistances you can make with both of them?",
        steps: [
          "Maximum — series: \\(6 + 6 = 12\\,\\Omega\\).",
          "Minimum — parallel: \\(6/2 = 3\\,\\Omega\\).",
        ],
        answer: "Maximum 12 Ω (series), minimum 3 Ω (parallel).",
      },
      selfCheckExample: {
        prompt:
          "Which gives the smallest resistance between two points: (a) three 3 Ω in parallel, (b) two 3 Ω in parallel, (c) two 1 Ω in series, (d) three 1 Ω in series?",
        steps: [
          "(a) three 3 Ω parallel: \\(3/3 = 1\\,\\Omega\\).",
          "(b) two 3 Ω parallel: \\(3/2 = 1.5\\,\\Omega\\).",
          "(c) two 1 Ω series: \\(2\\,\\Omega\\).",
          "(d) three 1 Ω series: \\(3\\,\\Omega\\). The smallest is (a) at 1 Ω.",
        ],
        answer: "(a) three 3 Ω in parallel = 1 Ω.",
      },
      practiceSet: [
        { prompt: "All-series or all-parallel for maximum resistance?", answer: "All series" },
        { prompt: "All-series or all-parallel for minimum resistance?", answer: "All parallel" },
        { prompt: "Largest resistance from a 2 Ω and 3 Ω?", answer: "5 Ω (series)" },
      ],
      pyqExampleId: "8266b5e7-f9ca-4103-8cc9-2746dbc73681", // 2023 — minimum effective resistance
      traps: [
        {
          title: "Minimum ≠ fewest resistors",
          body:
            "Minimum resistance means MOST parallel paths of the SMALLEST resistors — not the smallest count of components. Three 3 Ω in parallel (1 Ω) beats two 1 Ω in series (2 Ω): more parallelism wins even with larger individual values.",
        },
      ],
    },
  ],
};
