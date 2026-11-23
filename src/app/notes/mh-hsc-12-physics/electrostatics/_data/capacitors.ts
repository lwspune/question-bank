import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_ES_CAPACITORS_NOTE: SubtopicNote = {
  subtopicName: "Capacitors and Combination of Capacitors",
  title: "Capacitance and Capacitors in Series and Parallel",
  oneLineDefinition:
    "What capacitance is, its unit and what it depends on, how a capacitor works, and the equivalent capacitance of capacitors joined in series and in parallel.",
  whyItMatters:
    "11 questions. Six were set in board papers: define capacitance and its SI unit (2019), derive the equivalent capacitance of two capacitors in series (2023), combine two capacitors in series (2024), find the capacitance from the number of electrons transferred (2024), n equal capacitors in series (2026) and the capacity of an air capacitor (2026). The textbook adds a network of capacitors, a spherical capacitor and an isolated capacitor whose plates are pulled apart.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpes-capacitance",
      name: "Capacitance and its unit",
      intuition:
        "A capacitor is two conductors with equal and opposite charges. The more charge you put on, the larger the potential difference, in fixed proportion. Capacitance is that proportion: how much charge the pair holds for each volt. Bringing an earthed plate close to a charged plate lowers its potential, so the pair holds more charge for the same voltage. That is the whole idea of a capacitor.",
      definition:
        "- **Capacitance:** when the conductors carry charges +Q and −Q and the potential difference between them is V, \\(Q \\propto V\\), so \\(C = \\dfrac{Q}{V}\\). It is the ratio of the charge on either conductor to the potential difference between them.\n" +
        "- It depends on the size, shape and separation of the conductors and the medium between them, not on Q or V.\n" +
        "- **SI unit:** the farad, 1 F = 1 C/1 V. A capacitor has a capacitance of 1 F if a charge of 1 C raises the potential difference across it by 1 V. Dimensions \\([M^{-1}L^{-2}T^{4}A^{2}]\\).\n" +
        "- The farad is a very large unit; we use 1 µF = \\(10^{-6}\\) F, 1 nF = \\(10^{-9}\\) F and 1 pF = \\(10^{-12}\\) F.\n" +
        "- **Spherical capacitor** (concentric shells of radii a and b, b > a): \\(C = 4\\pi\\varepsilon_0 \\dfrac{ab}{b - a}\\). A wider gap gives a smaller capacitance.",
      formula: {
        label: "Capacitance",
        latex: "C = \\frac{Q}{V}",
      },
      authoredExample: {
        prompt:
          "A 4 µF capacitor is charged to a potential difference of 50 V. Find the charge on each plate and the number of electrons moved from one plate to the other. (e = 1.6 × 10⁻¹⁹ C)",
        steps: [
          "Given: \\(C = 4 \\times 10^{-6}\\) F, V = 50 V.",
          "Formula: Q = CV, and number of electrons \\(n = \\dfrac{Q}{e}\\).",
          "Substitution: \\(Q = 4 \\times 10^{-6} \\times 50 = 2 \\times 10^{-4}\\) C.",
          "\\(n = \\dfrac{2 \\times 10^{-4}}{1.6 \\times 10^{-19}} = 1.25 \\times 10^{15}\\).",
        ],
        answer: "2 × 10⁻⁴ C on each plate; 1.25 × 10¹⁵ electrons",
      },
      selfCheckExample: {
        prompt: "A charge of 6 nC on a capacitor gives a potential difference of 30 V across it. Find its capacitance.",
        steps: ["\\(C = \\dfrac{Q}{V} = \\dfrac{6 \\times 10^{-9}}{30} = 2 \\times 10^{-10}\\) F.", "= 200 pF."],
        answer: "2 × 10⁻¹⁰ F (200 pF)",
      },
      practiceSet: [
        { prompt: "Write 1 pF in farad.", answer: "\\(10^{-12}\\) F" },
        { prompt: "Does the capacitance of a capacitor depend on the charge given to it?", answer: "No. It depends only on the size, shape and separation of the conductors and the medium between them" },
        { prompt: "A 10 µF capacitor holds a charge of 50 µC. Find the potential difference across it.", answer: "5 V" },
      ],
      pyqExampleId: "12e581e3-3720-4802-bddf-80469c3dc0f8",
      traps: [
        {
          title: "A definition with half the ratio",
          body: "Say 'the ratio of the charge on EITHER conductor to the potential difference BETWEEN them'. The total charge on a capacitor is zero, so 'charge on the capacitor' alone is not enough.",
        },
        {
          title: "Unit without its meaning",
          body: "When the unit is asked, give the farad AND what one farad means: 1 C of charge raises the potential difference by 1 V.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpes-series-parallel",
      name: "Capacitors in series and in parallel",
      intuition:
        "In series, the same charge sits on every capacitor and the voltage is shared, so the group holds less charge per volt than any one of them. In parallel, every capacitor gets the full voltage and their charges add, so the group behaves like one big capacitor. Capacitors combine the opposite way to resistors.",
      definition:
        "**Series (derivation):**\n" +
        "- The capacitors are joined end to end. A charge +Q on the first plate induces −Q and +Q on the plates that follow, so every capacitor carries the **same charge Q**.\n" +
        "- The applied potential difference is shared: \\(V = V_1 + V_2 + V_3\\).\n" +
        "- \\(V = \\dfrac{Q}{C_1} + \\dfrac{Q}{C_2} + \\dfrac{Q}{C_3}\\). With \\(V = \\dfrac{Q}{C_s}\\), dividing by Q gives \\(\\dfrac{1}{C_s} = \\dfrac{1}{C_1} + \\dfrac{1}{C_2} + \\dfrac{1}{C_3}\\).\n" +
        "- For n equal capacitors C: \\(C_s = \\dfrac{C}{n}\\). Series is used to share a high voltage; the smallest capacitor gets the largest potential difference.\n" +
        "**Parallel:**\n" +
        "- Every capacitor has the **same potential difference V**; the charges add: \\(Q = Q_1 + Q_2 + Q_3 = C_1 V + C_2 V + C_3 V\\).\n" +
        "- With \\(Q = C_p V\\): \\(C_p = C_1 + C_2 + C_3\\). Parallel is used to get a large capacitance at a small potential.",
      formula: {
        label: "Series and parallel",
        latex: "\\frac{1}{C_s} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\dots, \\qquad C_p = C_1 + C_2 + \\dots",
      },
      authoredExample: {
        prompt:
          "Capacitors of 3 µF and 6 µF are joined in series across a 12 V supply. Find the equivalent capacitance, the charge on each and the potential difference across each. What would the equivalent capacitance and total charge be if they were joined in parallel instead?",
        steps: [
          "Given: \\(C_1 = 3\\) µF, \\(C_2 = 6\\) µF, V = 12 V.",
          "Series: \\(C_s = \\dfrac{C_1 C_2}{C_1 + C_2} = \\dfrac{3 \\times 6}{9} = 2\\) µF.",
          "Charge on each: \\(Q = C_s V = 2 \\times 12 = 24\\) µC.",
          "\\(V_1 = \\dfrac{24}{3} = 8\\) V and \\(V_2 = \\dfrac{24}{6} = 4\\) V; check: 8 + 4 = 12 V.",
          "Parallel: \\(C_p = 3 + 6 = 9\\) µF, total charge \\(Q = 9 \\times 12 = 108\\) µC.",
        ],
        answer: "Series: 2 µF, 24 µC each, 8 V and 4 V. Parallel: 9 µF, 108 µC",
      },
      selfCheckExample: {
        prompt: "Three capacitors of 6 µF each are available. Find the equivalent capacitance when all three are joined (i) in series, (ii) in parallel.",
        steps: ["Series: \\(\\dfrac{6}{3} = 2\\) µF.", "Parallel: \\(6 + 6 + 6 = 18\\) µF."],
        answer: "2 µF in series; 18 µF in parallel",
      },
      practiceSet: [
        { prompt: "Capacitors of 4 µF and 12 µF are joined in series. Find the equivalent capacitance.", answer: "3 µF" },
        { prompt: "n capacitors, each of capacitance C, are joined in parallel. Find the equivalent capacitance.", answer: "nC" },
        { prompt: "In a series combination, which capacitor has the largest potential difference across it?", answer: "The one with the smallest capacitance" },
      ],
      pyqExampleId: "bbac1e30-03d1-4630-bb0a-6e3815c8845f",
      traps: [
        {
          title: "Using the resistor rules",
          body: "For capacitors, SERIES uses reciprocals and PARALLEL simply adds. It is the reverse of resistors, and the commonest slip in this chapter.",
        },
        {
          title: "Same charge or same voltage",
          body: "In series every capacitor has the same CHARGE; in parallel every capacitor has the same VOLTAGE. A series derivation must say why the charge is the same: the middle plates are isolated, so their charges are induced equal and opposite.",
        },
        {
          title: "Leaving the answer as a reciprocal",
          body: "After adding \\(1/C_1 + 1/C_2\\), invert. \\(\\dfrac{3}{10}\\) µF⁻¹ is not a capacitance; \\(\\dfrac{10}{3}\\) µF is.",
        },
      ],
    },
  ],
};
