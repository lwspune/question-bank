import type { SubtopicNote } from "@/app/notes/_types";

export const INSTRUMENTS_CE_NOTE: SubtopicNote = {
  subtopicName: "Meters, Meter Bridge and Potentiometer",
  title: "Meters, Meter Bridge and Potentiometer",
  oneLineDefinition:
    "A real voltmeter or ammeter changes the circuit it measures; the meter bridge and the potentiometer avoid this by measuring at balance, when no current flows through the galvanometer.",
  whyItMatters:
    "Thirty-three PYQs, and twenty of them ask for a number: the highest share in the chapter. Six are from 2026. Nine are about meters: what a real voltmeter reads, a voltmeter's resistance found from its reading, and an ammeter with a shunt. Eleven are meter-bridge balances, including shunting one gap or adding to it and finding where the null point moves. Thirteen are potentiometers: comparing emfs, the potential gradient of the wire, and four that find a cell's internal resistance by shunting it.",
  concepts: [
    // C1 — real meters
    {
      kind: "formula" as const,
      slug: "jpce-meters",
      name: "Real voltmeters and ammeters",
      intuition:
        "A voltmeter is connected in parallel, so it takes some current and lowers the resistance of the part it sits across. That lowers the very voltage it is trying to measure: a real voltmeter always reads less than the true value. The higher its resistance, the less it disturbs the circuit. An ammeter goes in series and should have as little resistance as possible.",
      definition:
        "- A voltmeter of resistance \\(R_V\\) across R: the reading is the voltage across \\(R \\parallel R_V\\), found by redoing the divider with that combination.\n" +
        "- To find \\(R_V\\) from a reading: the rest of the circuit fixes the current; the reading divided by that current is \\(R \\parallel R_V\\); solve for \\(R_V\\).\n" +
        "- Voltmeters in series share the voltage in proportion to their resistances.\n" +
        "- Ammeter of resistance \\(R_A\\) with a shunt S: the current divides inversely, so the ammeter carries \\(I\\dfrac{S}{S + R_A}\\).\n" +
        "- A V–I graph taken with the voltmeter across R and the ammeter outside both gives a slope of \\(R \\parallel R_V\\), not R.",
      formula: {
        label: "Loaded reading",
        latex: "V_{\\text{read}} = V\\,\\frac{R \\parallel R_V}{R \\parallel R_V + R_{\\text{rest}}}, \\qquad I_A = I\\,\\frac{S}{S + R_A}",
      },
      authoredExample: {
        prompt:
          "A 300 Ω and a 600 Ω resistor are in series across 12 V. A voltmeter of resistance 600 Ω is placed across the 600 Ω resistor. What does it read, and what would an ideal voltmeter read?",
        steps: [
          "600 Ω in parallel with 600 Ω is 300 Ω. Total: 600 Ω, so \\(I = 0.02\\) A.",
          "The reading is \\(0.02 \\times 300 = 6\\) V.",
          "An ideal meter would read \\(12 \\times \\dfrac{600}{900} = 8\\) V.",
        ],
        answer: "6 V, against 8 V for an ideal meter",
      },
      selfCheckExample: {
        prompt:
          "Two 200 Ω resistors are in series across 6 V. A voltmeter across one of them reads 2 V. Find its resistance.",
        steps: [
          "The other resistor has \\(6 - 2 = 4\\) V, so the current is \\(4/200 = 0.02\\) A.",
          "The pair under the meter: \\(2/0.02 = 100\\ \\Omega\\).",
          "\\(\\dfrac{200R_V}{200 + R_V} = 100\\), so \\(R_V = 200\\ \\Omega\\).",
        ],
        answer: "200 Ω",
      },
      practiceSet: [
        { prompt: "1 kΩ and 2 kΩ in series across 9 V. Reading of an ideal voltmeter across the 1 kΩ?", answer: "3 V" },
        { prompt: "An ammeter of 9 Ω has a 1 Ω shunt. What fraction of the current passes through the ammeter?", answer: "1/10" },
        { prompt: "Two 1000 Ω resistors in series across 6 V. A 1000 Ω voltmeter across one reads?", answer: "2 V" },
        { prompt: "Voltmeters of 2 kΩ and 3 kΩ in series across 10 V. Their readings?", answer: "4 V and 6 V" },
      ],
      pyqExampleId: "e7de7719-b3eb-42b5-bcd7-654b29f86a13", // 2026: two 100 Ω on 9 V, 400 Ω voltmeter across one
      traps: [
        {
          title: "A real voltmeter reads low",
          body: "It lowers the resistance it sits across, and so the voltage there. Use the ideal divider value only when the question says the meter is ideal.",
        },
        {
          title: "Higher meter resistance is better",
          body: "A voltmeter with a much larger resistance than the resistor it measures barely changes the circuit. Of two meters, the one with the higher resistance gives the truer reading.",
        },
        {
          title: "The slope is not R",
          body: "If the voltmeter sits across R and the ammeter measures the total current, V/I gives R in parallel with the meter's own resistance. Only an ideal voltmeter makes it R.",
        },
      ],
    },

    // C2 — meter bridge
    {
      kind: "formula" as const,
      slug: "jpce-meter-bridge",
      name: "The meter bridge",
      intuition:
        "A meter bridge is a Wheatstone bridge in which two arms are the two parts of a uniform wire 100 cm long. The jockey slides along the wire until the galvanometer shows no current. At that point the two gap resistances are in the same ratio as the two lengths of wire. Because only a ratio of lengths matters, the wire's material, radius and resistance per cm drop out.",
      definition:
        "- Left gap P, right gap Q, null point at l cm from the left end: \\(\\dfrac{P}{Q} = \\dfrac{l}{100 - l}\\).\n" +
        "- Measure l from the end next to P. Swapping the two gaps moves the null point to \\(100 - l\\).\n" +
        "- A shunt across one gap lowers that gap's resistance, so the null point moves towards that gap's end. A resistor added in series raises it, so the null point moves away.\n" +
        "- The balance does not depend on the wire's resistance per cm, radius or material, as long as the wire is uniform.\n" +
        "- End corrections a and b at the two ends add to the lengths: \\(\\dfrac{P}{Q} = \\dfrac{l + a}{100 - l + b}\\).\n" +
        "- Unknowns in series and then in parallel in one gap give \\(R_1 + R_2\\) and \\(R_1R_2/(R_1 + R_2)\\); together these give the product and each value.",
      formula: {
        label: "Balance",
        latex: "\\frac{P}{Q} = \\frac{l}{100 - l}",
      },
      authoredExample: {
        prompt:
          "A meter bridge has 4 Ω in the left gap and an unknown X in the right gap; the null point is at 40 cm. Find X. Then X is shunted by a 6 Ω resistor; find the new null point.",
        steps: [
          "\\(\\dfrac{4}{X} = \\dfrac{40}{60}\\), so \\(X = 6\\ \\Omega\\).",
          "Shunted: \\(6 \\parallel 6 = 3\\ \\Omega\\).",
          "\\(\\dfrac{4}{3} = \\dfrac{l}{100 - l}\\): \\(400 - 4l = 3l\\), so \\(l = 400/7 \\approx 57.1\\) cm. It moved towards the right end, the shunted side.",
        ],
        answer: "X = 6 Ω; the null point moves to about 57.1 cm",
      },
      selfCheckExample: {
        prompt:
          "A resistor R in the left gap balances 12 Ω in the right gap at 25 cm. A resistor S is then added in series with R, and the null point moves to 50 cm. Find R and S.",
        steps: [
          "\\(\\dfrac{R}{12} = \\dfrac{25}{75}\\), so \\(R = 4\\ \\Omega\\).",
          "At 50 cm the gaps are equal: \\(R + S = 12\\), so \\(S = 8\\ \\Omega\\).",
        ],
        answer: "R = 4 Ω, S = 8 Ω",
      },
      practiceSet: [
        { prompt: "Null point at 60 cm with 3 Ω in the right gap. Left gap?", answer: "4.5 Ω" },
        { prompt: "8 Ω in the left gap and 12 Ω in the right. Null point from the left end?", answer: "40 cm" },
        { prompt: "Equal resistors in both gaps; then the right one is shunted by an equal resistor. New null point?", answer: "About 66.7 cm from the left end" },
        { prompt: "Null point at 20 cm with 1 Ω in the left gap. Right gap?", answer: "4 Ω" },
      ],
      pyqExampleId: "0b2d2d40-9783-45f8-b031-9946a0751123", // 2023: R₁, R₂ in series against 10 Ω at 60 cm, in parallel against 3 Ω at 40 cm
      traps: [
        {
          title: "Measure from P's end",
          body: "l is the length on the same side as the gap on top of the fraction. Measuring from the other end swaps the ratio.",
        },
        {
          title: "Which way does a shunt move the null point?",
          body: "A shunt lowers that gap's resistance, so its length share shrinks and the null point moves towards that gap's end. Picture the ratio before writing numbers.",
        },
        {
          title: "Wire properties drop out",
          body: "Changing the wire's radius or material, or its resistance per cm, changes nothing at balance. Only a non-uniform wire or an end correction shifts the null point.",
        },
      ],
    },

    // C3 — potentiometer
    {
      kind: "formula" as const,
      slug: "jpce-potentiometer",
      name: "The potentiometer",
      intuition:
        "A steady current through a long uniform wire makes the potential fall evenly along it, by k volts per metre. A cell connected against part of this wire balances when the wire's drop over length l equals the cell's voltage. At balance the cell gives no current, so the potentiometer measures its full emf. Shunt the cell with a resistor and it now gives current, so the balance measures its lower terminal voltage, which reveals its internal resistance.",
      definition:
        "- Potential gradient \\(k = \\dfrac{V_{\\text{wire}}}{L}\\), with \\(V_{\\text{wire}} = \\varepsilon_0\\dfrac{R_w}{R_w + R_s + r_0}\\) from the driver cell \\(\\varepsilon_0\\) (internal resistance \\(r_0\\)) and any series resistance \\(R_s\\).\n" +
        "- At balance: \\(\\varepsilon = kl\\). Two cells: \\(\\dfrac{\\varepsilon_1}{\\varepsilon_2} = \\dfrac{l_1}{l_2}\\).\n" +
        "- Internal resistance: open circuit at \\(l_1\\), shunted by R at \\(l_2\\): \\(r = R\\dfrac{l_1 - l_2}{l_2}\\).\n" +
        "- With two shunts and no open-circuit reading: \\(\\dfrac{\\varepsilon R_1}{R_1 + r} = kl_1\\), \\(\\dfrac{\\varepsilon R_2}{R_2 + r} = kl_2\\); divide to remove ε and k.\n" +
        "- A smaller gradient means a longer balance length for the same voltage, so the instrument is more sensitive: use a longer wire or a smaller current.",
      formula: {
        label: "Balance and internal resistance",
        latex: "\\varepsilon = kl, \\qquad k = \\frac{V_{\\text{wire}}}{L}, \\qquad r = R\\,\\frac{l_1 - l_2}{l_2}",
      },
      authoredExample: {
        prompt:
          "A potentiometer wire 4 m long has resistance 8 Ω. It is driven by a 2 V cell of negligible internal resistance through a 12 Ω series resistor. A cell balances at 2.5 m. Find its emf.",
        steps: [
          "Current in the wire: \\(\\dfrac{2}{8 + 12} = 0.1\\) A.",
          "\\(V_{\\text{wire}} = 0.1 \\times 8 = 0.8\\) V, so \\(k = 0.8/4 = 0.2\\) V/m.",
          "\\(\\varepsilon = kl = 0.2 \\times 2.5 = 0.5\\) V.",
        ],
        answer: "0.5 V",
      },
      selfCheckExample: {
        prompt:
          "A cell shunted by 6 Ω balances at 150 cm; shunted by 2 Ω it balances at 100 cm. Find its internal resistance.",
        steps: [
          "\\(\\dfrac{6\\varepsilon}{6 + r} = 150k\\) and \\(\\dfrac{2\\varepsilon}{2 + r} = 100k\\).",
          "Divide: \\(\\dfrac{6(2 + r)}{2(6 + r)} = 1.5\\), so \\(3(2 + r) = 1.5(6 + r)\\).",
          "\\(6 + 3r = 9 + 1.5r\\), so \\(r = 2\\ \\Omega\\).",
        ],
        answer: "2 Ω",
      },
      practiceSet: [
        { prompt: "A 1.5 V cell balances at 75 cm. Another cell balances at 90 cm on the same wire. Its emf?", answer: "1.8 V" },
        { prompt: "A cell balances at 80 cm on open circuit and at 60 cm when shunted by 3 Ω. Internal resistance?", answer: "1 Ω" },
        { prompt: "A 10 m wire has 2 V across it. Balance length for a 0.5 V cell?", answer: "2.5 m" },
        { prompt: "The current in the wire is halved. What happens to the balance length for the same cell?", answer: "It doubles." },
      ],
      pyqExampleId: "efa65351-05b7-4d2b-81f4-3b408ccc9443", // 2026: shunted by 4 Ω at 120 cm and by 12 Ω at 180 cm
      traps: [
        {
          title: "The wire gets only its share",
          body: "The gradient uses the voltage across the wire, not the driver's full emf. A series resistance or the driver's internal resistance takes part of it.",
        },
        {
          title: "Shunted means terminal voltage",
          body: "A shunted cell delivers current, so its balance gives ε − Ir, not ε. Only the open-circuit balance gives the emf.",
        },
        {
          title: "Longer wire, more sensitive",
          body: "Sensitivity improves as the gradient falls, so a longer wire or a smaller current helps. A larger current makes it worse.",
        },
      ],
    },
  ],
};
