import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_SE_JUNCTION_NOTE: SubtopicNote = {
  subtopicName: "Semiconductors and the p-n Junction",
  title: "Semiconductors and the p-n Junction",
  oneLineDefinition:
    "Energy bands and band gaps, intrinsic and doped semiconductors, how a p-n junction builds its barrier, what forward and reverse bias do to it, and how a diode behaves in a circuit.",
  whyItMatters:
    "Six NEET questions from 2021 to 2026, three of them from 2026. One compares the currents in n-type and p-type material. Four are about the junction itself: the barrier of a silicon diode, the depletion widths of three diodes under different bias, equal drops across two junctions, and the steep rise of forward current. One finds the current through ideal diodes in a circuit.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphse-doping",
      name: "Intrinsic and extrinsic semiconductors",
      intuition:
        "In a solid the electron energies group into bands. The valence band is full, the conduction band above it is where electrons can move freely, and between them is a gap of forbidden energies. A semiconductor's gap is small, so heat lifts a few electrons across and each one leaves a hole behind. Adding a few impurity atoms, doping, gives far more carriers of one kind, and that is what makes a semiconductor useful.",
      definition:
        "- **Bands:** in a metal the bands overlap or the conduction band is partly filled, so there is no gap. An insulator has a gap \\(E_g > 3\\) eV. A semiconductor has \\(E_g < 3\\) eV: about 1.1 eV for Si and 0.7 eV for Ge.\n" +
        "- **Intrinsic** (pure Si or Ge): \\(n_e = n_h = n_i\\). At absolute zero it behaves as an insulator. Heating frees more carriers, so its resistivity falls as the temperature rises.\n" +
        "- **n-type:** a pentavalent impurity (P, As, Sb), called a donor. Electrons are the majority carriers, holes the minority.\n" +
        "- **p-type:** a trivalent impurity (B, Al, Ga, In), called an acceptor. Holes are the majority carriers, electrons the minority.\n" +
        "- A doped crystal is **electrically neutral**: each donor or acceptor ion balances the carrier it gave.\n" +
        "- **Mass action:** \\(n_e n_h = n_i^{2}\\), doped or not.\n" +
        "- Applying \\(I = neAv_d\\) of Current Electricity to both carriers: \\(I = eA(n_e v_e + n_h v_h)\\) and \\(\\sigma = e(n_e\\mu_e + n_h\\mu_h)\\). Electrons have a larger mobility than holes.",
      formula: {
        label: "Carriers and conductivity",
        latex: "n_e n_h = n_i^{2}, \\qquad I = eA(n_e v_e + n_h v_h), \\qquad \\sigma = e(n_e\\mu_e + n_h\\mu_h)",
        symbols: [
          { symbol: "\\(n_i\\)", meaning: "carrier density of the pure semiconductor" },
          { symbol: "\\(n_e, n_h\\)", meaning: "electron and hole densities" },
          { symbol: "\\(\\mu_e, \\mu_h\\)", meaning: "electron and hole mobilities" },
        ],
      },
      authoredExample: {
        prompt:
          "Silicon has \\(n_i = 1.5 \\times 10^{16}\\ \\text{m}^{-3}\\). It is doped with boron until the hole density is \\(4.5 \\times 10^{22}\\ \\text{m}^{-3}\\). Find the electron density, and say which type the crystal is.",
        steps: [
          "Mass action: \\(n_e = \\dfrac{n_i^{2}}{n_h} = \\dfrac{(1.5 \\times 10^{16})^{2}}{4.5 \\times 10^{22}} = \\dfrac{2.25 \\times 10^{32}}{4.5 \\times 10^{22}}\\).",
          "\\(n_e = 5 \\times 10^{9}\\ \\text{m}^{-3}\\), far fewer than the holes.",
          "Holes are the majority carriers, as boron is trivalent: the crystal is p-type.",
        ],
        answer: "\\(5 \\times 10^{9}\\ \\text{m}^{-3}\\); p-type",
      },
      selfCheckExample: {
        prompt:
          "A pure semiconductor has \\(n_e = n_h = 2 \\times 10^{19}\\ \\text{m}^{-3}\\), \\(\\mu_e = 0.4\\ \\text{m}^{2}/\\text{V s}\\) and \\(\\mu_h = 0.2\\ \\text{m}^{2}/\\text{V s}\\). Find its conductivity.",
        steps: [
          "\\(\\sigma = e\\,n_i(\\mu_e + \\mu_h) = 1.6 \\times 10^{-19} \\times 2 \\times 10^{19} \\times (0.4 + 0.2)\\).",
          "\\(\\sigma = 3.2 \\times 0.6 = 1.92\\ \\text{S/m}\\).",
        ],
        answer: "1.92 S/m",
      },
      practiceSet: [
        { prompt: "Boron is added to pure silicon. Which carriers are then in the majority?", answer: "Holes (boron is trivalent)" },
        { prompt: "A semiconductor has \\(n_i = 10^{16}\\ \\text{m}^{-3}\\). After doping its electron density is \\(10^{22}\\ \\text{m}^{-3}\\). What is its hole density?", answer: "\\(10^{10}\\ \\text{m}^{-3}\\)" },
        { prompt: "Is a p-type semiconductor positively charged?", answer: "No, it is electrically neutral" },
        { prompt: "What happens to the resistivity of a pure semiconductor as it is heated?", answer: "It decreases" },
      ],
      pyqExampleId: "380e8fe2-c51a-4cdf-8d0a-c09a05fc782c",
      traps: [
        {
          title: "A doped crystal stays neutral",
          body: "An n-type crystal has more free electrons than holes, but every donor atom that gave an electron is left as a positive ion. The crystal as a whole carries no charge.",
        },
        {
          title: "The product is fixed, not the sum",
          body: "Doping raises one carrier density and lowers the other so that \\(n_e n_h = n_i^{2}\\) still holds. The minority density falls below \\(n_i\\); it does not stay at \\(n_i\\).",
        },
        {
          title: "Electrons move more easily than holes",
          body: "With equal carrier densities and the same field, n-type material carries the larger current, because the electron mobility is greater than the hole mobility.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphse-junction",
      name: "The p-n junction and its bias",
      visualizationSlug: "cet-diode-bias",
      intuition:
        "When p-type meets n-type, electrons diffuse into the p-side and holes into the n-side, and they cancel near the joint. That leaves a thin depletion layer of fixed ions with a field across it, the barrier, which stops further diffusion. A battery that lowers the barrier (forward bias) lets a large current flow; one that raises it (reverse bias) lets only a tiny current through.",
      definition:
        "- Majority carriers diffuse across the junction; the field of the depletion layer drives a drift of minority carriers back. With no battery the two balance and **no net current** flows.\n" +
        "- **Forward bias:** p-side to the positive terminal. The barrier falls and the depletion layer **narrows**. The current stays small until the threshold (cut-in) voltage, about 0.7 V for silicon and 0.2 V for germanium, and then rises sharply.\n" +
        "- **Reverse bias:** n-side to the positive terminal. The barrier rises and the depletion layer **widens**. A small current (microamperes) flows, carried by **minority** carriers; it hardly changes with the voltage until breakdown, where it rises suddenly.\n" +
        "- The field across a depletion layer of width d with barrier \\(V_b\\) is about \\(E = \\dfrac{V_b}{d}\\). A charge that crosses the junction against the barrier loses kinetic energy \\(eV_b\\).\n" +
        "- **Dynamic resistance** \\(r_d = \\dfrac{\\Delta V}{\\Delta I}\\), read from the I-V curve. A diode is not an ohmic conductor.",
      formula: {
        label: "Junction relations",
        latex: "E = \\frac{V_b}{d}, \\qquad r_d = \\frac{\\Delta V}{\\Delta I}",
        symbols: [
          { symbol: "\\(V_b\\)", meaning: "barrier potential" },
          { symbol: "\\(d\\)", meaning: "width of the depletion layer" },
          { symbol: "\\(r_d\\)", meaning: "dynamic resistance" },
        ],
      },
      authoredExample: {
        prompt:
          "On a silicon diode's forward curve, the voltage rises from 0.70 V to 0.75 V while the current rises from 10 mA to 20 mA. Find the dynamic resistance in this range.",
        steps: [
          "\\(\\Delta V = 0.75 - 0.70 = 0.05\\) V and \\(\\Delta I = 20 - 10 = 10\\) mA \\(= 0.01\\) A.",
          "\\(r_d = \\dfrac{\\Delta V}{\\Delta I} = \\dfrac{0.05}{0.01} = 5\\ \\Omega\\).",
        ],
        answer: "5 Ω",
      },
      selfCheckExample: {
        prompt:
          "The barrier across a junction is 0.4 V and its depletion layer is 0.5 μm wide. Find the electric field in the depletion layer.",
        steps: [
          "\\(E = \\dfrac{V_b}{d} = \\dfrac{0.4}{0.5 \\times 10^{-6}}\\).",
          "\\(E = 8 \\times 10^{5}\\ \\text{V/m}\\).",
        ],
        answer: "\\(8 \\times 10^{5}\\ \\text{V/m}\\)",
      },
      practiceSet: [
        { prompt: "A diode has its p-side at 3 V and its n-side at 5 V. Is it forward or reverse biased?", answer: "Reverse biased (the n-side is at the higher potential)" },
        { prompt: "What happens to the width of the depletion layer when a junction is forward biased?", answer: "It decreases" },
        { prompt: "Which carriers carry the small current through a reverse-biased junction?", answer: "Minority carriers" },
        { prompt: "About what forward voltage must a germanium diode reach before its current rises steeply?", answer: "About 0.2 V" },
      ],
      pyqExampleId: "3e60ee99-776f-4e74-99f2-f2d19442b00d",
      traps: [
        {
          title: "Compare potentials, not signs",
          body: "A diode is forward biased when its p-side is at the higher potential. p at \\(-2\\) V and n at \\(-6\\) V is forward bias even though both are negative.",
        },
        {
          title: "The reverse current is a minority current",
          body: "The few microamperes through a reverse-biased junction are carried by minority carriers, not majority carriers. The large current above the threshold in forward bias is not the reverse saturation current.",
        },
        {
          title: "A silicon diode needs about 0.7 V",
          body: "A silicon diode starts to conduct strongly at about 0.7 V, not at 0.1 to 0.3 V. The 0.2 V figure belongs to germanium.",
        },
        {
          title: "Forward narrows, reverse widens",
          body: "Forward bias makes the depletion layer thinner than in an unbiased junction; reverse bias makes it wider. So a reverse-biased diode has the widest layer and a forward-biased one the thinnest.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphse-diode-circuits",
      name: "Diodes in circuits",
      intuition:
        "Treat an ideal diode as a one-way switch. Forward biased, it is a closed switch with no voltage across it; reverse biased, it is an open switch and its branch carries no current. So first decide which way each diode is biased, then remove the blocked branches and solve what is left as an ordinary resistor circuit. A real diode also takes a small fixed voltage, about 0.7 V for silicon, which you subtract before using Ohm's law.",
      definition:
        "- **Ideal diode:** forward biased, zero resistance (a short circuit); reverse biased, infinite resistance (an open circuit).\n" +
        "- The diode symbol's arrow points from p to n, the way current can flow. The diode is forward biased when the end at the arrow's tail is at the higher potential.\n" +
        "- A reverse-biased ideal diode in series with anything stops the current in that whole path.\n" +
        "- **Diode with a forward drop** \\(V_0\\): in series with R across a battery E, \\(I = \\dfrac{E - V_0}{R}\\).\n" +
        "- **Diode with a forward resistance** \\(r_f\\): add \\(r_f\\) to the resistance of its branch.",
      formula: {
        label: "Diode in series with a resistor",
        latex: "I = \\frac{E - V_0}{R}\\ \\ \\text{(forward)}, \\qquad I = 0\\ \\ \\text{(reverse, ideal)}",
        symbols: [
          { symbol: "\\(V_0\\)", meaning: "forward voltage drop of the diode" },
          { symbol: "\\(E\\)", meaning: "emf of the battery" },
        ],
      },
      authoredExample: {
        prompt:
          "A silicon diode with a forward drop of 0.7 V is forward biased in series with a 200 Ω resistor across a 4.7 V battery. Find the current.",
        steps: [
          "The voltage left for the resistor is \\(4.7 - 0.7 = 4.0\\) V.",
          "\\(I = \\dfrac{4.0}{200} = 0.02\\) A \\(= 20\\) mA.",
        ],
        answer: "20 mA",
      },
      selfCheckExample: {
        prompt:
          "Two ideal diodes and a 10 Ω resistor are all in series across a 5 V battery. One diode is forward biased and the other is reverse biased. What current flows?",
        steps: [
          "The reverse-biased diode is an open circuit.",
          "It is in series with everything else, so no current flows anywhere in the loop.",
        ],
        answer: "Zero",
      },
      practiceSet: [
        { prompt: "What is the resistance of an ideal diode when it is forward biased?", answer: "Zero" },
        { prompt: "A diode with a 0.3 V forward drop is forward biased in series with a 100 Ω resistor across a 3.3 V battery. Find the current.", answer: "30 mA" },
        { prompt: "A diode drops 0.5 V when it conducts and can carry at most 10 mA. What is the largest battery voltage that can forward bias it through a 300 Ω series resistor?", answer: "3.5 V" },
        { prompt: "An ideal diode is reverse biased in series with a resistor across a battery. What is the voltage across the resistor?", answer: "Zero, since no current flows" },
      ],
      pyqExampleId: "50c7a764-e872-48ac-b509-bb47ef737702",
      traps: [
        {
          title: "Decide each diode's bias first",
          body: "A branch whose diode is reverse biased carries no current, so it drops out of the circuit. Solving as if every diode conducts gives a current that is too large.",
        },
        {
          title: "Subtract the drop before dividing",
          body: "With a real diode the current is \\(\\dfrac{E - V_0}{R}\\), not \\(\\dfrac{E}{R}\\). The diode's own voltage is not available to the resistor.",
        },
      ],
    },
  ],
};
