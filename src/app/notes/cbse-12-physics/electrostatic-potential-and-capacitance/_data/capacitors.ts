import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EP_CAPACITORS_NOTE: SubtopicNote = {
  subtopicName: "Capacitors, Capacitance and their Combinations",
  title: "Capacitors and their Combinations",
  oneLineDefinition:
    "Capacitance and the parallel plate capacitor, a dielectric slab in the gap with the battery on or off, capacitors in series and in parallel, and charging a capacitor through a resistor.",
  whyItMatters:
    "48 questions, the biggest page of the chapter. Forty-one were set in board papers, twenty-one of them in 2025: derive the capacitance of a parallel plate capacitor with air or with a dielectric (2024, 2026), find the capacitance with a slab partly filling the gap (2024, 2025), find the equivalent capacitance, charge and voltage in series and parallel networks (every year from 2023 to 2026), say what happens when a slab is removed or the plates are pulled apart with the battery on or off (2025, 2026), and answer case studies on plates, on capacitors in a circuit and on charging through a resistor (2025, 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpep-parallel-plate",
      name: "Capacitance and the parallel plate capacitor",
      intuition:
        "A capacitor is two conductors with an insulator between them. Charge one plate +Q and the other −Q and a potential difference V appears. Double the charge and V doubles too, so Q/V stays fixed: that ratio is the capacitance, and it depends only on the shape, size and spacing of the plates and on what fills the gap.",
      definition:
        "- **Capacitance** \\(C = \\dfrac{Q}{V}\\), where V is the potential difference between the plates. SI unit: the **farad**, \\(1\\ \\text{F} = 1\\ \\text{C V}^{-1}\\). One farad is very large; µF and pF are used in practice.\n" +
        "Derivation for a parallel plate capacitor (plate area A, separation d, charges \\(\\pm Q\\), \\(\\sigma = Q/A\\)):\n" +
        "- Each plate alone gives a field \\(\\dfrac{\\sigma}{2\\varepsilon_0}\\). Between the plates the two fields add; outside they cancel.\n" +
        "- So between the plates \\(E = \\dfrac{\\sigma}{\\varepsilon_0} = \\dfrac{Q}{\\varepsilon_0 A}\\), uniform.\n" +
        "- \\(V = Ed = \\dfrac{Qd}{\\varepsilon_0 A}\\).\n" +
        "- \\(C = \\dfrac{Q}{V} = \\dfrac{\\varepsilon_0 A}{d}\\): it depends only on A, d and the medium, not on Q or V.\n" +
        "- Only the area where the plates face each other counts. Three plates joined alternately to two terminals make two capacitors in parallel.\n" +
        "- The largest field a medium can stand without breaking down is its **dielectric strength**, about \\(3 \\times 10^{6}\\) V/m for air. This limits the charge a capacitor can hold.",
      formula: {
        label: "Parallel plate capacitor",
        latex: "C = \\frac{Q}{V}, \\qquad C = \\frac{\\varepsilon_0 A}{d}, \\qquad E = \\frac{\\sigma}{\\varepsilon_0} = \\frac{V}{d}",
      },
      authoredExample: {
        prompt:
          "A parallel plate capacitor has plates of area 0.05 m², 2 mm apart in air, and is connected to a 50 V supply. Find its capacitance, the charge on each plate and the field between the plates. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^2\\,\\text{N}^{-1}\\,\\text{m}^{-2}\\).)",
        steps: [
          "Given: \\(A = 0.05\\ \\text{m}^2\\), \\(d = 2 \\times 10^{-3}\\) m, \\(V = 50\\) V.",
          "\\(C = \\dfrac{\\varepsilon_0 A}{d} = \\dfrac{8.85 \\times 10^{-12} \\times 0.05}{2 \\times 10^{-3}} = 2.21 \\times 10^{-10}\\) F, about 221 pF.",
          "\\(Q = CV = 2.21 \\times 10^{-10} \\times 50 = 1.11 \\times 10^{-8}\\) C.",
          "\\(E = \\dfrac{V}{d} = \\dfrac{50}{2 \\times 10^{-3}} = 2.5 \\times 10^{4}\\) V/m.",
        ],
        answer: "About 221 pF; 1.11 × 10⁻⁸ C; 2.5 × 10⁴ V/m",
      },
      selfCheckExample: {
        prompt: "The plates of a 5 µF capacitor are at potentials of +40 V and −10 V. Find the charge on the plate at +40 V.",
        steps: ["Potential difference \\(= 40 - (-10) = 50\\) V.", "\\(Q = CV = 5\\ \\mu\\text{F} \\times 50\\ \\text{V} = 250\\ \\mu\\text{C}\\), positive."],
        answer: "+250 µC",
      },
      practiceSet: [
        { prompt: "What is 1 farad in coulombs and volts?", answer: "\\(1\\ \\text{F} = 1\\ \\text{C V}^{-1}\\)" },
        { prompt: "The plate separation of an air capacitor is halved. What happens to its capacitance?", answer: "It doubles" },
        { prompt: "Does the capacitance of a capacitor change if the charge on it is doubled?", answer: "No. C depends only on the geometry and the medium" },
        { prompt: "Two plates 4 mm apart are joined to a 20 V supply. Find the field between them.", answer: "5000 V/m" },
      ],
      pyqExampleId: "484edfd2-9608-44cc-ba71-11ff247f070b",
      traps: [
        {
          title: "Using the potential of one plate",
          body: "In \\(Q = CV\\), V is the potential difference between the plates. If the plates are at +V₁ and −V₂, use \\(V_1 + V_2\\).",
        },
        {
          title: "A field outside the plates",
          body: "The fields of the two plates cancel outside, so the field there is zero. Between them it is \\(\\sigma/\\varepsilon_0\\), not \\(\\sigma/2\\varepsilon_0\\).",
        },
        {
          title: "Plates shifted sideways",
          body: "If one plate slides so that only part of it faces the other, put only the overlapping area into \\(C = \\varepsilon_0 A/d\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpep-slab",
      name: "A dielectric slab, with the battery on or off",
      intuition:
        "A slab that fills only part of the gap cuts the field only in the part it fills, so the potential difference drops by less and the capacitance rises by less than K times. What happens next depends on the battery. Still connected, it holds V fixed and pushes in more charge. Disconnected, the charge is trapped and V must change instead.",
      definition:
        "Derivation for a slab of thickness \\(t\\) (\\(t < d\\)), the full plate area, dielectric constant K:\n" +
        "- In the air gaps the field is \\(E_0 = \\dfrac{\\sigma}{\\varepsilon_0}\\); in the slab it is \\(\\dfrac{E_0}{K}\\).\n" +
        "- \\(V = E_0(d - t) + \\dfrac{E_0}{K}t = \\dfrac{Q}{\\varepsilon_0 A}\\left(d - t + \\dfrac{t}{K}\\right)\\).\n" +
        "- \\(C = \\dfrac{Q}{V} = \\dfrac{\\varepsilon_0 A}{d - t + t/K}\\). Gap fully filled (\\(t = d\\)): \\(C = KC_0\\).\n" +
        "**What changes when a dielectric fills the gap:**\n" +
        "- **Battery connected** (V fixed): C, Q and the energy all become K times; E between the plates stays the same.\n" +
        "- **Battery disconnected** (Q fixed): C becomes K times; V, E and the energy all fall K times.\n" +
        "- Taking the slab out reverses each change. Pulling the plates apart with Q fixed: C falls, V rises, E stays the same, the energy rises.",
      formula: {
        label: "Slab of thickness t",
        latex: "C = \\frac{\\varepsilon_0 A}{d - t + \\dfrac{t}{K}}",
      },
      authoredExample: {
        prompt:
          "A parallel plate capacitor has plates of area 0.01 m², 6 mm apart in air. A slab of dielectric constant 3 and thickness 3 mm, of the same area, is placed between the plates. Find the capacitance before and after. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^2\\,\\text{N}^{-1}\\,\\text{m}^{-2}\\).)",
        steps: [
          "Before: \\(C_0 = \\dfrac{\\varepsilon_0 A}{d} = \\dfrac{8.85 \\times 10^{-12} \\times 0.01}{6 \\times 10^{-3}} = 1.48 \\times 10^{-11}\\) F, about 14.8 pF.",
          "After: \\(d - t + \\dfrac{t}{K} = 6 - 3 + \\dfrac{3}{3} = 4\\) mm.",
          "\\(C = \\dfrac{8.85 \\times 10^{-12} \\times 0.01}{4 \\times 10^{-3}} = 2.21 \\times 10^{-11}\\) F, about 22.1 pF.",
        ],
        answer: "About 14.8 pF before and 22.1 pF after",
      },
      selfCheckExample: {
        prompt:
          "A 10 pF air capacitor is charged to 50 V and the battery is disconnected. A dielectric of K = 5 is then made to fill the gap. Find the new capacitance, potential difference and stored energy.",
        steps: [
          "Q stays fixed: \\(Q = 10 \\times 10^{-12} \\times 50 = 5 \\times 10^{-10}\\) C.",
          "\\(C = 5 \\times 10 = 50\\) pF, so \\(V = \\dfrac{5 \\times 10^{-10}}{50 \\times 10^{-12}} = 10\\) V.",
          "\\(U = \\dfrac{1}{2}CV^2 = \\dfrac{1}{2} \\times 50 \\times 10^{-12} \\times 100 = 2.5 \\times 10^{-9}\\) J, one fifth of the first \\(1.25 \\times 10^{-8}\\) J.",
        ],
        answer: "50 pF; 10 V; 2.5 × 10⁻⁹ J",
      },
      practiceSet: [
        { prompt: "A capacitor stays joined to a battery while a dielectric of constant K is put in. What happens to the charge?", answer: "It becomes K times larger; the battery supplies the extra" },
        { prompt: "The battery is removed first and then a dielectric of constant K is put in. What happens to the potential difference?", answer: "It falls to 1/K of its value" },
        { prompt: "Two slabs, each as thick as the gap, cover half the plate area each. Are they in series or in parallel?", answer: "In parallel" },
      ],
      pyqExampleId: "8627af23-9761-440d-9cb5-d29510bfce10",
      traps: [
        {
          title: "Not saying what stays fixed",
          body: "Every 'how will it change' answer starts with one line: battery connected, so V is constant; or battery removed, so Q is constant. That line carries a mark.",
        },
        {
          title: "Writing tK instead of t/K",
          body: "Inside the slab the field is divided by K, so the slab adds \\(t/K\\) to the effective gap, not \\(tK\\). Check with K = 1: the answer must come back to \\(C_0\\).",
        },
        {
          title: "The wrong energy formula",
          body: "With Q fixed, use \\(U = Q^2/2C\\); with V fixed, use \\(U = \\frac{1}{2}CV^2\\). Using the other one with the old value gives the wrong direction of change.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpep-combination",
      name: "Capacitors in series and in parallel",
      intuition:
        "In series, the capacitors sit one after another, so each carries the same charge and the battery's voltage is shared out. In parallel, each sits straight across the battery, so each gets the full voltage and the charges add. The formulas are the opposite way round from resistors.",
      definition:
        "Derivation, series (NCERT):\n" +
        "- The same charge Q sits on every capacitor.\n" +
        "- The potential differences add: \\(V = V_1 + V_2 + \\dots = \\dfrac{Q}{C_1} + \\dfrac{Q}{C_2} + \\dots\\)\n" +
        "- Writing \\(V = Q/C\\): \\(\\dfrac{1}{C} = \\dfrac{1}{C_1} + \\dfrac{1}{C_2} + \\dots\\)\n" +
        "Derivation, parallel:\n" +
        "- The same potential difference V is across every capacitor.\n" +
        "- The charges add: \\(Q = Q_1 + Q_2 + \\dots = C_1V + C_2V + \\dots\\)\n" +
        "- Writing \\(Q = CV\\): \\(C = C_1 + C_2 + \\dots\\)\n" +
        "Useful results:\n" +
        "- In series, the smallest capacitor takes the largest share of the voltage. In parallel, the charge divides in proportion to C.\n" +
        "- In a balanced bridge (\\(C_1/C_2 = C_3/C_4\\)), the middle capacitor carries no charge and can be removed.\n" +
        "- In a steady DC circuit, a fully charged capacitor passes no current: its branch is an open circuit.\n" +
        "- A charged capacitor joined to an uncharged one shares its charge until both are at a common potential, \\(V = \\dfrac{C_1V_1}{C_1 + C_2}\\).",
      formula: {
        label: "Series and parallel",
        latex: "\\frac{1}{C_s} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\dots, \\qquad C_p = C_1 + C_2 + \\dots",
      },
      authoredExample: {
        prompt:
          "Capacitors of 2 µF and 3 µF are joined in series, and this pair is joined in parallel with a 4 µF capacitor across a 10 V battery. Find the equivalent capacitance, and the charge on and voltage across each capacitor.",
        steps: [
          "Series pair: \\(C_s = \\dfrac{2 \\times 3}{2 + 3} = 1.2\\ \\mu\\text{F}\\).",
          "With the 4 µF in parallel: \\(C = 1.2 + 4 = 5.2\\ \\mu\\text{F}\\).",
          "Series branch: \\(Q = 1.2 \\times 10 = 12\\ \\mu\\text{C}\\) on both the 2 µF and the 3 µF. Voltages: \\(\\dfrac{12}{2} = 6\\) V and \\(\\dfrac{12}{3} = 4\\) V, adding to 10 V.",
          "4 µF: full 10 V, so \\(Q = 4 \\times 10 = 40\\ \\mu\\text{C}\\).",
        ],
        answer: "5.2 µF; 12 µC on the 2 µF (6 V) and on the 3 µF (4 V); 40 µC on the 4 µF (10 V)",
      },
      selfCheckExample: {
        prompt: "You have three capacitors of 6 µF each. How would you join all three to get 9 µF?",
        steps: ["Two in series give \\(\\dfrac{6 \\times 6}{12} = 3\\ \\mu\\text{F}\\).", "This pair in parallel with the third: \\(3 + 6 = 9\\ \\mu\\text{F}\\)."],
        answer: "Two in series, and that pair in parallel with the third",
      },
      practiceSet: [
        { prompt: "Four capacitors of 8 µF each are joined in series. Find the equivalent capacitance.", answer: "2 µF" },
        { prompt: "In a series combination, which quantity is the same for every capacitor?", answer: "The charge" },
        { prompt: "A 2 µF capacitor charged to 100 V is joined to an uncharged 3 µF capacitor. Find the common potential.", answer: "40 V" },
        { prompt: "In the steady state, what current flows in a DC branch that contains a charged capacitor?", answer: "None" },
      ],
      pyqExampleId: "5471f28c-7409-47cc-8dc3-beb2623d6d43",
      traps: [
        {
          title: "Using the resistor rules",
          body: "Capacitors in series add as reciprocals and in parallel add directly, the opposite of resistors. A series combination is always smaller than the smallest capacitor in it.",
        },
        {
          title: "Equal voltages in series",
          body: "In series the charge is equal, not the voltage. The smaller capacitor takes the larger voltage; check that the voltages add up to the battery's.",
        },
        {
          title: "Missing a balanced bridge",
          body: "Before writing loop equations, test the bridge: if the ratios on both sides are equal, remove the middle capacitor and the network becomes simple series and parallel.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpep-rc",
      name: "Charging a capacitor through a resistor",
      intuition:
        "At the instant the switch closes, an empty capacitor has no voltage across it, so the whole battery voltage drives current through the resistor. As charge builds up, the capacitor's voltage rises, the current falls, and charging slows down. The product RC sets how fast this happens.",
      definition:
        "- **Not in the present NCERT chapter.** The 2025 board paper set it as a case study and printed the formulas in the passage. Learn to use them, and give it less time than the rest of the page.\n" +
        "- Charging: \\(q = Q\\left(1 - e^{-t/RC}\\right)\\), with final charge \\(Q = CV\\); current \\(i = \\dfrac{dq}{dt} = \\dfrac{V}{R}e^{-t/RC}\\).\n" +
        "- At \\(t = 0\\): \\(q = 0\\) and \\(i = V/R\\). As t grows very large: \\(q \\to CV\\) and \\(i \\to 0\\).\n" +
        "- RC is the **time constant** and has the dimensions of time, \\([\\text{M}^0\\text{L}^0\\text{T}\\,\\text{A}^0]\\). R decides how fast the capacitor charges, not the final charge.\n" +
        "- Discharging through R: \\(q = Qe^{-t/RC}\\), and the final charge is zero.",
      formula: {
        label: "Charging through a resistor",
        latex: "q = Q\\left(1 - e^{-t/RC}\\right), \\qquad i = \\frac{V}{R}e^{-t/RC}",
      },
      authoredExample: {
        prompt:
          "A 200 µF capacitor is charged through a 10 kΩ resistor by a 12 V battery. Find the time constant, the current at the start, the final charge and the current after 2 s. (Use \\(e = 2.72\\).)",
        steps: [
          "Time constant: \\(RC = 10 \\times 10^{3} \\times 200 \\times 10^{-6} = 2\\) s.",
          "Initial current: \\(I_0 = \\dfrac{V}{R} = \\dfrac{12}{10 \\times 10^{3}} = 1.2 \\times 10^{-3}\\) A \\(= 1.2\\) mA.",
          "Final charge: \\(Q = CV = 200 \\times 10^{-6} \\times 12 = 2.4 \\times 10^{-3}\\) C.",
          "After 2 s, \\(t = RC\\): \\(i = I_0e^{-1} = \\dfrac{1.2}{2.72} = 0.44\\) mA.",
        ],
        answer: "2 s; 1.2 mA; 2.4 mC; 0.44 mA",
      },
      selfCheckExample: {
        prompt: "A capacitor holding 6 mC discharges through a resistor. The time constant is 4 s. Find the charge left after 4 s. (Use \\(e = 2.72\\).)",
        steps: ["\\(q = Qe^{-t/RC} = 6 \\times e^{-1}\\).", "\\(q = \\dfrac{6}{2.72} = 2.2\\) mC."],
        answer: "2.2 mC",
      },
      practiceSet: [
        { prompt: "What current flows in an RC charging circuit once the capacitor is fully charged?", answer: "Zero" },
        { prompt: "Does a larger resistance change the final charge on the capacitor?", answer: "No, only how long it takes" },
        { prompt: "What quantity has the same dimensions as RC?", answer: "Time" },
      ],
      pyqExampleId: "04bcee21-5fb0-46cf-8ed4-f326c9c19556",
      traps: [
        {
          title: "Putting C into the starting current",
          body: "At the first instant the capacitor has no charge and no voltage, so the current is simply V/R. The capacitance does not enter.",
        },
      ],
    },
  ],
};
