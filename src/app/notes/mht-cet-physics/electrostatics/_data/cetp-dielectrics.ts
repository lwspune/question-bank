import type { SubtopicNote } from "@/app/notes/_types";

export const DIELECTRICS_NOTE: SubtopicNote = {
  subtopicName: "Dielectrics in Capacitors",
  title: "Dielectrics in Capacitors",
  oneLineDefinition:
    "A dielectric between the plates weakens the field inside it K times, so the capacitance rises; what else changes depends on whether the battery stays connected (V fixed) or is removed (Q fixed).",
  whyItMatters:
    "23 PYQs, nine HARD, five of them two dielectrics sharing the gap, where the figure decides series or parallel." +
    "The rest: a slab that fills only part of the gap, and which quantities change when a dielectric goes in with the battery on or off.",
  concepts: [
    // 1 — what a dielectric does
    {
      kind: "formula" as const,
      slug: "cetp-dielectric-basics",
      name: "Battery Connected or Removed: What Changes",
      intuition:
        "The dielectric's molecules line up against the field and cancel part of it, so the field inside drops K times and the capacitance rises K times. Then ask what is held fixed. With the battery removed, the charge cannot change, so the voltage and energy fall. With the battery connected, the voltage cannot change, so more charge flows on and the energy rises.",
      definition:
        "- Field inside a dielectric in an external field: \\(E = \\dfrac{E_0}{K} < E_0\\). Its job in a capacitor: to reduce the effective potential for a given charge, raising \\(C\\) to \\(KC\\).\n" +
        "- **Battery removed (Q fixed):** \\(V \\to \\dfrac{V}{K}\\), \\(E \\to \\dfrac{E}{K}\\), \\(U \\to \\dfrac{U}{K}\\).\n" +
        "- **Battery connected (V fixed):** \\(Q \\to KQ\\), \\(U \\to KU\\), \\(E = \\dfrac{V}{d}\\) unchanged — inserting and removing the slab leaves the field as it was.\n" +
        "- Two capacitors \\(C, C\\) in parallel, one filled: \\(\\Delta C = C(K - 1)\\). In series, one filled: \\(C_{\\text{eq}}\\) goes from \\(\\dfrac{C}{2}\\) to \\(\\dfrac{KC}{K + 1}\\), a change of \\(\\dfrac{C}{2}\\cdot\\dfrac{K - 1}{K + 1}\\).\n" +
        "- Changing the gap and filling it: \\(\\dfrac{C'}{C} = K\\dfrac{d}{d'}\\).",
      formula: {
        label: "Full dielectric",
        latex: "C = \\frac{K\\varepsilon_0 A}{d}; \\qquad Q\\text{ fixed: } U \\to \\frac{U}{K}; \\qquad V\\text{ fixed: } U \\to KU",
      },
      authoredExample: {
        prompt: "A \\(6\\,\\mu\\)F capacitor charged to 100 V is disconnected, then filled with a dielectric of \\(K = 3\\). New voltage and energy?",
        steps: [
          "\\(Q = 600\\,\\mu\\)C stays. \\(C \\to 18\\,\\mu\\)F, so \\(V = \\dfrac{600}{18} \\approx 33.3\\) V.",
          "\\(U_0 = \\dfrac{1}{2} \\times 6 \\times 10^{-6} \\times 100^2 = 0.03\\) J; \\(U = \\dfrac{0.03}{3} = 0.01\\) J.",
        ],
        answer: "33.3 V; 0.01 J",
      },
      selfCheckExample: {
        prompt: "With the battery still connected, a slab of \\(K = 4\\) fills the gap. What happens to the charge and to the field?",
        steps: ["\\(V\\) is fixed: \\(Q = CV\\) rises 4 times; \\(E = \\dfrac{V}{d}\\) is unchanged."],
        answer: "Charge \\(\\times 4\\); field unchanged",
      },
      practiceSet: [
        { prompt: "A dielectric of \\(K = 6\\) fills a capacitor and its capacitance becomes 3 times the air value. New gap?", answer: "\\(2d\\)" },
        { prompt: "Two equal capacitors in parallel on a battery; one is filled (K). Change in total capacitance?", answer: "\\(C(K - 1)\\)" },
        { prompt: "The field inside a dielectric placed in an external field is (less / more / equal)?", answer: "Less" },
        { prompt: "Isolated capacitor, energy \\(U_0\\); a slab of constant K fills it. New energy?", answer: "\\(\\dfrac{U_0}{K}\\)" },
      ],
      pyqExampleId: "5bc341d9-65e5-4fc2-9bb3-fec9be46c2f5",
      traps: [
        {
          title: "Not asking what is held fixed",
          body:
            "Energy falls to \\(\\frac{U}{K}\\) when the charge is fixed and rises to \\(KU\\) when the voltage is. The question tells you which only by saying 'charged and isolated' or 'battery remains connected'.",
        },
      ],
    },

    // 2 — a slab in part of the gap
    {
      kind: "formula" as const,
      slug: "cetp-dielectric-slab",
      name: "A Slab Filling Part of the Gap",
      intuition:
        "A slab of thickness t and constant K acts like a thinner layer of air, t/K thick. So the capacitor behaves as if its gap had shrunk by t(1 − 1/K). A metal sheet is the limit K → ∞: it simply removes its own thickness from the gap.",
      definition:
        "- Slab of thickness \\(t\\) in a gap \\(d\\): \\(C = \\dfrac{\\varepsilon_0 A}{d - t\\left(1 - \\frac{1}{K}\\right)}\\).\n" +
        "- Equivalent view: air gap \\(d - t\\) and slab \\(t\\) in series, \\(\\dfrac{1}{C} = \\dfrac{d - t}{\\varepsilon_0 A} + \\dfrac{t}{K\\varepsilon_0 A}\\).\n" +
        "- Conducting sheet of thickness \\(t\\): \\(C = \\dfrac{\\varepsilon_0 A}{d - t}\\). A sheet \\(\\frac{2d}{3}\\) thick triples \\(C\\).\n" +
        "- Keep the units apart: a numeric answer in \\(\\varepsilon_0\\) F needs \\(A\\) in m² and \\(d\\) in m.",
      formula: {
        label: "Partial slab",
        latex: "C = \\frac{\\varepsilon_0 A}{d - t\\left(1 - \\dfrac{1}{K}\\right)}",
      },
      authoredExample: {
        prompt: "A gap of 4 mm holds a slab 2 mm thick with \\(K = 4\\). By what factor does the capacitance change?",
        steps: [
          "Effective gap \\(= 4 - 2 + \\dfrac{2}{4} = 2.5\\) mm.",
          "\\(\\dfrac{C}{C_0} = \\dfrac{4}{2.5} = 1.6\\).",
        ],
        answer: "1.6 times",
      },
      selfCheckExample: {
        prompt: "A metal sheet of thickness \\(\\frac{d}{2}\\) is slid between the plates. New capacitance?",
        steps: ["Effective gap \\(\\frac{d}{2}\\), so \\(C = 2C_0\\)."],
        answer: "\\(2C_0\\)",
      },
      practiceSet: [
        { prompt: "Plates 100 cm², 4 mm apart, with a 1 mm slab of \\(K = 2\\). Capacitance in \\(\\varepsilon_0\\) F?", answer: "\\(\\dfrac{20}{7}\\varepsilon_0\\)" },
        { prompt: "Thickness of a \\(K = 2\\) slab that raises \\(C\\) by 50%?", answer: "\\(\\dfrac{2d}{3}\\)" },
        { prompt: "What does a slab of \\(K \\to \\infty\\) behave like?", answer: "A metal sheet: gap reduced by \\(t\\)" },
      ],
      pyqExampleId: "917aee47-1ce4-4031-b49d-71b29c19cd69",
      traps: [
        {
          title: "Subtracting t/K instead of t(1 − 1/K)",
          body:
            "The slab replaces \\(t\\) of air with an air-equivalent \\(\\frac{t}{K}\\), so the gap loses \\(t - \\frac{t}{K}\\). The options also offer \\(t\\left(1 + \\frac{1}{K}\\right)\\) and a factor of 2 in front.",
        },
      ],
    },

    // 3 — two dielectrics sharing the space
    {
      kind: "formula" as const,
      slug: "cetp-layered-dielectrics",
      name: "Two Dielectrics: Series or Parallel From the Figure",
      intuition:
        "Look at the boundary between the two materials. If it runs parallel to the plates, the materials are stacked one after the other across the gap — capacitors in series. If it runs from one plate to the other, they sit side by side, each over part of the area — capacitors in parallel.",
      definition:
        "- **Stacked across the gap (boundary parallel to the plates), thicknesses \\(d_1, d_2\\):** series, \\(C = \\dfrac{\\varepsilon_0 A}{d_1/K_1 + d_2/K_2}\\). Equal halves: \\(C = \\dfrac{2K_1K_2}{K_1 + K_2}C_0\\).\n" +
        "- **Side by side (boundary joining the plates), areas \\(A_1, A_2\\):** parallel, \\(C = \\dfrac{\\varepsilon_0}{d}(K_1A_1 + K_2A_2)\\). Equal halves: \\(C = \\dfrac{K_1 + K_2}{2}C_0\\). Half filled, half air: \\(\\dfrac{K + 1}{2}C_0\\).\n" +
        "- Three regions: reduce the stacked pair first, then add it in parallel with the rest.",
      formula: {
        label: "Equal halves",
        latex: "\\text{stacked: } C = \\frac{2K_1K_2}{K_1 + K_2}C_0, \\qquad \\text{side by side: } C = \\frac{K_1 + K_2}{2}C_0",
      },
      authoredExample: {
        prompt: "The gap is filled with two layers of equal thickness, \\(K_1 = 2\\) and \\(K_2 = 6\\), stacked between the plates. Then the same two fill it side by side instead. Capacitance each way, in terms of the air value \\(C_0\\)?",
        steps: [
          "Stacked: \\(\\dfrac{2 \\times 2 \\times 6}{2 + 6}C_0 = 3C_0\\).",
          "Side by side: \\(\\dfrac{2 + 6}{2}C_0 = 4C_0\\).",
        ],
        answer: "\\(3C_0\\) stacked; \\(4C_0\\) side by side",
      },
      selfCheckExample: {
        prompt: "A 12 pF air capacitor has half its plate area filled (full gap) with \\(K = 3\\). New capacitance?",
        steps: ["Side by side with air: \\(\\dfrac{1 + 3}{2} \\times 12 = 24\\) pF."],
        answer: "24 pF",
      },
      practiceSet: [
        { prompt: "Stacked equal layers \\(K_1, K_2\\): ratio \\(\\dfrac{C_0}{C}\\)?", answer: "\\(\\dfrac{K_1 + K_2}{2K_1K_2}\\)" },
        { prompt: "Side by side, \\(K_1 = 4\\) and \\(K_2 = 2\\), air value \\(1\\,\\mu\\)F. New C?", answer: "\\(3\\,\\mu\\)F" },
        { prompt: "Boundary between the two materials runs from plate to plate: series or parallel?", answer: "Parallel" },
      ],
      pyqExampleId: "56acccfc-9a7a-4d32-9508-e4efd0142752",
      traps: [
        {
          title: "The same words, two different figures",
          body:
            "'Filled with two dielectrics as shown' has been set with both figures. The ratio \\(\\frac{K_1 + K_2}{2K_1K_2}\\) belongs to the STACKED figure; side by side gives \\(\\frac{2}{K_1 + K_2}\\). Decide from the boundary line, not from memory of a past answer.",
        },
      ],
    },
  ],
  related: [
    { label: "Capacitance and Combinations — series and parallel rules used here", href: "/notes/mht-cet-physics/electrostatics/cetp-capacitance" },
    { label: "Energy Stored in a Capacitor", href: "/notes/mht-cet-physics/electrostatics/cetp-capacitor-energy" },
  ],
};
