import type { SubtopicNote } from "@/app/notes/_types";

export const CAPACITOR_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Energy Stored in a Capacitor",
  title: "Energy Stored in a Capacitor",
  oneLineDefinition:
    "A charged capacitor stores U = ½CV² = Q²/2C in the field between its plates; joining capacitors, re-arranging them or pulling their plates apart moves that energy around, and each change is found by comparing U before and after.",
  whyItMatters:
    "20 PYQs, six HARD — three of them two charged capacitors joined together, and the energy lost as their charge redistributes." +
    "The rest ask for U in one of its three forms, compare the energy of series and parallel groups, or ask for the work to pull isolated plates apart.",
  concepts: [
    // 1 — the energy formulas
    {
      kind: "formula" as const,
      slug: "cetp-energy-formulas",
      name: "Three Forms of the Stored Energy",
      intuition:
        "Charging a capacitor pushes each new bit of charge against the voltage already there, which rises from 0 to V — so the average push is V/2 and the energy is ½QV. Swap in Q = CV to get the other two forms. Spread over the volume between the plates, it is an energy density ½ε₀E².",
      definition:
        "- \\(U = \\dfrac{1}{2}CV^2 = \\dfrac{Q^2}{2C} = \\dfrac{1}{2}QV\\).\n" +
        "- Energy density between the plates: \\(u = \\dfrac{1}{2}\\varepsilon_0E^2 = \\dfrac{\\sigma^2}{2\\varepsilon_0} = \\dfrac{q^2}{2\\varepsilon_0A^2}\\); total \\(U = u \\times Ad\\).\n" +
        "- \\(U \\propto Q^2\\): charge up by 20% means energy up by 44%; charge up by 10%, energy up by 21%.\n" +
        "- Work to raise the voltage from \\(V_1\\) to \\(V_2\\): \\(\\dfrac{1}{2}C(V_2^2 - V_1^2)\\).\n" +
        "- All the energy of \\(C_1\\) at \\(V_1\\) moved into \\(C_2\\): \\(C_2V_2^2 = C_1V_1^2\\).\n" +
        "- Charged in parallel on one battery, \\(C_1\\) and \\(C_2\\): \\(\\dfrac{E_1 - E_2}{Q_1 - Q_2} = \\dfrac{V}{2}\\).",
      formula: {
        label: "Stored energy",
        latex: "U = \\tfrac{1}{2}CV^2 = \\frac{Q^2}{2C} = \\tfrac{1}{2}QV, \\qquad u = \\tfrac{1}{2}\\varepsilon_0E^2",
      },
      authoredExample: {
        prompt: "A \\(20\\,\\mu\\)F capacitor is charged to 50 V. Energy stored? And the energy density in a field of \\(10^5\\) V/m?",
        steps: [
          "\\(U = \\dfrac{1}{2} \\times 20 \\times 10^{-6} \\times 50^2 = 0.025\\) J.",
          "\\(u = \\dfrac{1}{2} \\times 8.85 \\times 10^{-12} \\times (10^5)^2 \\approx 0.044\\ \\text{J m}^{-3}\\).",
        ],
        answer: "0.025 J; about 0.044 J/m³",
      },
      selfCheckExample: {
        prompt: "Adding 2 C to a capacitor raises its energy by 21%. Original charge?",
        steps: ["\\(\\left(\\dfrac{q + 2}{q}\\right)^2 = 1.21 \\Rightarrow \\dfrac{q + 2}{q} = 1.1 \\Rightarrow q = 20\\) C."],
        answer: "20 C",
      },
      practiceSet: [
        { prompt: "A \\(400\\,\\mu\\)F capacitor at 50 V hands all its energy to a \\(100\\,\\mu\\)F one. Its voltage?", answer: "100 V" },
        { prompt: "Raising 0 V → 10 V takes work W. Work for 10 V → 20 V?", answer: "3W" },
        { prompt: "Charge up by 20%: energy up by?", answer: "44%" },
        { prompt: "Energy of an air capacitor with field E, plate area A, gap d?", answer: "\\(\\dfrac{1}{2}\\varepsilon_0E^2Ad\\)" },
      ],
      pyqExampleId: "965b8ad8-fc60-40ea-9981-80a7c2576b9d",
      traps: [
        {
          title: "Treating energy as proportional to charge",
          body:
            "Energy goes as \\(Q^2\\) (or \\(V^2\\)). A 44% rise in energy is a 20% rise in charge; the 3 C added is then 20% of the original, 15 C.",
        },
      ],
    },

    // 2 — energy of combinations
    {
      kind: "formula" as const,
      slug: "cetp-combination-energy",
      name: "Energy of Series and Parallel Groups",
      intuition:
        "A group stores the energy of its equivalent capacitor: ½C_eq V². For the same energy, a small C_eq needs a large voltage. Re-arranging charged capacitors without a battery moves no charge off them, so the energy stays the same.",
      definition:
        "- Group energy \\(U = \\dfrac{1}{2}C_{\\text{eq}}V^2\\). \\(n\\) identical in series: \\(\\dfrac{C}{n}\\); in parallel: \\(nC\\).\n" +
        "- Same energy in series and in parallel: \\(\\dfrac{V_s}{V_p} = \\sqrt{\\dfrac{C_p}{C_s}}\\); for \\(n\\) identical, \\(V_s : V_p = n : 1\\).\n" +
        "- \\(n\\) capacitors charged in parallel to \\(V\\), then separated and joined in series: total voltage \\(nV\\), energy unchanged.\n" +
        "- \\(n_1\\) of \\(C_1\\) in series at \\(V_1\\) versus \\(n_2\\) of \\(C_2\\) in parallel at \\(V_2\\), equal energy: \\(\\dfrac{C_1}{n_1}V_1^2 = n_2C_2V_2^2\\).",
      formula: {
        label: "Equal energy, series and parallel",
        latex: "\\tfrac{1}{2}C_sV_s^2 = \\tfrac{1}{2}C_pV_p^2 \\;\\Rightarrow\\; \\frac{V_s}{V_p} = \\sqrt{\\frac{C_p}{C_s}}",
      },
      authoredExample: {
        prompt: "Three identical capacitors must store the same energy connected in series as in parallel. Ratio of the voltages needed?",
        steps: ["\\(C_s = \\dfrac{C}{3}\\), \\(C_p = 3C\\).", "\\(\\dfrac{V_s}{V_p} = \\sqrt{\\dfrac{3C}{C/3}} = 3\\)."],
        answer: "3 : 1",
      },
      selfCheckExample: {
        prompt: "\\(1\\,\\mu\\)F and \\(2\\,\\mu\\)F are in parallel across 10 V. Total energy?",
        steps: ["\\(U = \\dfrac{1}{2} \\times 3 \\times 10^{-6} \\times 10^2 = 150\\,\\mu\\)J."],
        answer: "\\(150\\,\\mu\\)J",
      },
      practiceSet: [
        { prompt: "Two capacitors in ratio 1 : 2, same energy in parallel and in series. \\(V_p : V_s\\)?", answer: "\\(\\sqrt{2} : 3\\)" },
        { prompt: "Charged in parallel to V, then re-joined in series: what happens to the total energy?", answer: "Unchanged" },
        { prompt: "Work done charging \\(\\dfrac{C}{2}\\) and \\(C\\) in parallel to V?", answer: "\\(\\dfrac{3}{4}CV^2\\)" },
      ],
      pyqExampleId: "4e615dc4-f478-4400-adaf-0b0273f6f7b7",
      traps: [
        {
          title: "Squaring the capacitance ratio",
          body:
            "Equal energy gives \\(\\frac{V_s^2}{V_p^2} = \\frac{C_p}{C_s}\\), so the VOLTAGE ratio is the square root. For four identical capacitors that is 4 : 1, while 16 : 1 is the ratio of the capacitances.",
        },
      ],
    },

    // 3 — charge sharing and energy loss
    {
      kind: "formula" as const,
      slug: "cetp-charge-sharing",
      name: "Joining Two Charged Capacitors: Common Potential and Energy Lost",
      intuition:
        "Join two charged capacitors and charge flows until they sit at one common potential. Charge is conserved; energy is not — some is always lost as heat and radiation in the connecting wires. Joining opposite plates makes the charges partly cancel first.",
      definition:
        "- Like plates joined: \\(V = \\dfrac{C_1V_1 + C_2V_2}{C_1 + C_2}\\). Opposite plates joined: \\(V = \\dfrac{|C_1V_1 - C_2V_2|}{C_1 + C_2}\\).\n" +
        "- Energy lost: \\(\\Delta U = \\dfrac{C_1C_2}{2(C_1 + C_2)}(V_1 \\mp V_2)^2\\) — minus for like plates, plus for opposite plates.\n" +
        "- Identical capacitors, like plates: \\(\\Delta U = \\dfrac{1}{4}C(V_1 - V_2)^2\\).",
      formula: {
        label: "Common potential and loss",
        latex: "V = \\frac{C_1V_1 + C_2V_2}{C_1 + C_2}, \\qquad \\Delta U = \\frac{C_1C_2}{2(C_1 + C_2)}(V_1 - V_2)^2",
      },
      authoredExample: {
        prompt: "A \\(2\\,\\mu\\)F capacitor at 100 V is joined to an uncharged \\(3\\,\\mu\\)F one. Common potential and energy lost?",
        steps: [
          "\\(V = \\dfrac{200}{5} = 40\\) V.",
          "Before: \\(\\dfrac{1}{2} \\times 2 \\times 100^2 = 10\\,000\\,\\mu\\)J. After: \\(\\dfrac{1}{2} \\times 5 \\times 40^2 = 4000\\,\\mu\\)J.",
          "Lost: \\(6000\\,\\mu\\)J, matching \\(\\dfrac{2 \\times 3}{2 \\times 5} \\times 100^2\\).",
        ],
        answer: "40 V; 6 mJ lost",
      },
      selfCheckExample: {
        prompt: "\\(4\\,\\mu\\)F at 50 V and \\(1\\,\\mu\\)F at 100 V are joined positive plate to negative plate. Common potential?",
        steps: ["Net charge \\(200 - 100 = 100\\,\\mu\\)C on \\(5\\,\\mu\\)F."],
        answer: "20 V",
      },
      practiceSet: [
        { prompt: "Two identical capacitors at \\(V_1\\) and \\(V_2\\), like plates joined. Energy lost?", answer: "\\(\\dfrac{1}{4}C(V_1 - V_2)^2\\)" },
        { prompt: "Is charge or energy conserved when two capacitors are joined?", answer: "Charge; energy is lost" },
        { prompt: "\\(C\\) at \\(V\\) and \\(3C\\) at \\(3V\\), joined opposite plates. Final energy?", answer: "\\(8CV^2\\)" },
      ],
      pyqExampleId: "a5f87056-78a5-4c88-98df-5101b62fb178",
      traps: [
        {
          title: "Energy conserved by assumption",
          body:
            "The final energy is always LESS than the initial whenever the potentials differed. Computing \\(\\frac{1}{2}(C_1 + C_2)V^2\\) and calling it the initial energy gives no loss and matches no option.",
        },
      ],
    },

    // 4 — pulling the plates apart
    {
      kind: "formula" as const,
      slug: "cetp-plate-separation",
      name: "Pulling the Plates Apart: Work and Force",
      intuition:
        "Pull the plates of an isolated capacitor apart and the charge stays; the capacitance falls, so the voltage and the energy both rise in proportion to the gap. The extra energy is the work you did against the plates' attraction. The attraction itself is constant, Q²/2ε₀A, because the field between the plates does not change.",
      definition:
        "- **Isolated (Q fixed), gap \\(d \\to nd\\):** \\(C \\to \\dfrac{C}{n}\\), \\(V \\to nV\\), \\(E\\) unchanged, \\(U \\to nU\\). Work done \\(= (n - 1)U_i = (n - 1)\\dfrac{\\varepsilon_0AV^2}{2d}\\).\n" +
        "- Force between the plates: \\(F = \\dfrac{Q^2}{2\\varepsilon_0A} = \\dfrac{CV^2}{2d}\\) — each plate feels the field of the OTHER, \\(\\frac{E}{2}\\).\n" +
        "- With the battery connected instead (V fixed), widening the gap LOWERS \\(Q\\), \\(E\\) and \\(U\\).",
      formula: {
        label: "Isolated capacitor, gap multiplied by n",
        latex: "W = (n - 1)\\,\\frac{\\varepsilon_0AV^2}{2d}, \\qquad F = \\frac{Q^2}{2\\varepsilon_0A}",
      },
      authoredExample: {
        prompt: "A 10 pF capacitor is charged to 100 V and isolated. Its gap is doubled. Work done?",
        steps: [
          "\\(U_i = \\dfrac{1}{2} \\times 10^{-11} \\times 100^2 = 5 \\times 10^{-8}\\) J.",
          "\\(U \\propto d\\) at fixed Q: \\(U_f = 10^{-7}\\) J, so \\(W = 5 \\times 10^{-8}\\) J.",
        ],
        answer: "\\(5 \\times 10^{-8}\\) J",
      },
      selfCheckExample: {
        prompt: "An isolated capacitor with energy \\(U\\) has its gap made 5 times larger. Work needed?",
        steps: ["\\(U_f = 5U\\), so \\(W = 4U\\)."],
        answer: "\\(4U\\)",
      },
      practiceSet: [
        { prompt: "Isolated capacitor, gap increased: does the voltage rise or fall?", answer: "Rise" },
        { prompt: "Force between plates of capacitance C, gap d, voltage V?", answer: "\\(\\dfrac{CV^2}{2d}\\)" },
        { prompt: "Isolated capacitor, gap increased: which statement is false — charge constant, C falls, V falls?", answer: "V falls" },
      ],
      pyqExampleId: "eb42dd35-d076-4d21-9ca0-129dae5c0c73",
      traps: [
        {
          title: "Taking the final energy as the work",
          body:
            "The work is the INCREASE, \\(U_f - U_i\\). Pulled to 4 times the gap, \\(U_f = 4U_i\\) but the work is \\(3U_i = \\frac{3\\varepsilon_0AV^2}{2d}\\); \\(\\frac{2\\varepsilon_0AV^2}{d}\\) is the final energy and it is printed too.",
        },
      ],
    },
  ],
  related: [
    { label: "Capacitance and Combinations", href: "/notes/mht-cet-physics/electrostatics/cetp-capacitance" },
    { label: "Dielectrics — energy with the battery on or off", href: "/notes/mht-cet-physics/electrostatics/cetp-dielectrics" },
  ],
};
