import type { SubtopicNote } from "@/app/notes/_types";

export const WORK_CHTHERMO_NOTE: SubtopicNote = {
  subtopicName: "Work of Expansion",
  title: "Work of Expansion",
  oneLineDefinition:
    "The work of an expanding or compressed gas: external pressure times ΔV when that pressure is steady, −nRT ln(V₂/V₁) when the change is reversible, zero into a vacuum, and the area under the path on a p–V graph.",
  whyItMatters:
    "Twenty PYQs, half of them numerical, and six from 2026, more than any other page. Seven use the reversible isothermal or adiabatic formula; nine use a constant external pressure, a free expansion or the order of single-stage and reversible work; four read work as an area on a p–V graph.",
  concepts: [
    // C1 — reversible isothermal (and adiabatic) work
    {
      kind: "formula" as const,
      slug: "jcthermo-reversible-work",
      name: "Reversible isothermal and adiabatic work",
      intuition:
        "In a reversible expansion the outside pressure is kept only just below the gas pressure, so the gas does the most work it can. For an ideal gas at constant temperature, U and H do not change. Every joule of work the gas does is paid for by heat it takes in: q = −w.",
      definition:
        "- \\(w_{\\mathrm{rev}} = -nRT\\ln\\frac{V_2}{V_1} = -2.303\\,nRT\\log\\frac{V_2}{V_1}\\).\n" +
        "- At constant temperature \\(\\frac{V_2}{V_1} = \\frac{p_1}{p_2}\\), and \\(nRT = p_1V_1\\).\n" +
        "- Isothermal ideal gas: \\(\\Delta U = 0\\), \\(\\Delta H = 0\\), \\(q = -w\\).\n" +
        "- Reversible adiabatic: \\(q = 0\\), so \\(w = \\Delta U = nC_v\\Delta T\\). The gas cools as it expands.\n" +
        "- \\(\\ln 2 = 0.693\\), \\(\\ln 10 = 2.303\\). 1 L bar = 100 J; 1 L atm = 101.3 J.",
      formula: {
        label: "Reversible isothermal work",
        latex:
          "w_{\\mathrm{rev}} = -2.303\\,nRT\\log\\frac{V_2}{V_1} = -2.303\\,nRT\\log\\frac{p_1}{p_2}",
      },
      authoredExample: {
        prompt:
          "3 mol of an ideal gas at 400 K expands reversibly and isothermally from 4 L to 16 L. Find \\(w\\), \\(q\\), \\(\\Delta U\\) and \\(\\Delta H\\). (\\(R = 8.314\\) J K⁻¹ mol⁻¹, \\(\\log 4 = 0.602\\))",
        steps: [
          "\\(nRT = 3 \\times 8.314 \\times 400 = 9977\\) J.",
          "\\(w = -2.303 \\times 9977 \\times \\log 4 = -2.303 \\times 9977 \\times 0.602 = -13\\,832\\) J.",
          "Isothermal ideal gas: \\(\\Delta U = \\Delta H = 0\\), so \\(q = -w = +13.8\\) kJ.",
        ],
        answer: "\\(w \\approx -13.8\\) kJ, \\(q \\approx +13.8\\) kJ, \\(\\Delta U = \\Delta H = 0\\).",
      },
      selfCheckExample: {
        prompt:
          "An ideal gas occupies 12 L at 3 bar. It expands reversibly at constant temperature until its pressure is 1 bar. Find the work in joules. (\\(\\ln 3 = 1.099\\))",
        steps: [
          "\\(nRT = p_1V_1 = 3 \\times 12 = 36\\) L bar = 3600 J.",
          "\\(w = -nRT\\ln\\frac{p_1}{p_2} = -3600 \\times 1.099 = -3956\\) J.",
        ],
        answer: "\\(w \\approx -3.96\\) kJ.",
      },
      practiceSet: [
        {
          prompt: "1 mol of an ideal gas at 300 K doubles its volume reversibly and isothermally. Find \\(w\\). (\\(R = 8.314\\), \\(\\ln 2 = 0.693\\))",
          answer: "\\(\\approx -1.73\\) kJ",
        },
        { prompt: "An ideal gas expands isothermally. What are \\(\\Delta U\\) and \\(\\Delta H\\)?", answer: "Both zero" },
        {
          prompt: "2 mol of a gas with \\(C_v = 12.5\\) J K⁻¹ mol⁻¹ expands adiabatically and cools by 40 K. Find \\(w\\).",
          answer: "\\(-1000\\) J",
        },
        {
          prompt: "A gas expands reversibly and isothermally from 3 bar to 1 bar. What ratio goes inside the logarithm?",
          answer: "\\(p_1/p_2 = 3\\), the same as \\(V_2/V_1\\)",
        },
      ],
      pyqExampleId: "238362c6-df54-4de2-a95f-231a39ad022c", // 28 Jan 2026 S1 — 20 L, 0.5 to 0.2 MPa, w and q
      traps: [
        {
          title: "log for ln",
          body:
            "\\(nRT\\log\\frac{V_2}{V_1}\\) without the 2.303 is 2.303 times too small. For \\(nRT = 5\\) kJ and a volume ratio of 4 it gives \\(5 \\times 0.602 = 3.0\\) kJ against the correct \\(5 \\times 1.386 = 6.9\\) kJ, and the small value is always an option.",
        },
        {
          title: "q and w with the same sign",
          body:
            "In an isothermal change of an ideal gas, \\(q = -w\\). An option where \\(q\\) and \\(w\\) have the same sign, or where \\(\\Delta U\\) equals the work, is wrong.",
        },
      ],
    },

    // C2 — constant external pressure, free expansion, ordering
    {
      kind: "formula" as const,
      slug: "jcthermo-irreversible-work",
      name: "Work against a constant external pressure and free expansion",
      intuition:
        "Against a steady outside pressure, the work is that pressure times the change in volume. If the outside is a vacuum, nothing resists the gas, so no work is done, however much the volume grows. Splitting a change into more, smaller steps brings it closer to reversible.",
      definition:
        "- \\(w = -p_{\\mathrm{ext}}(V_2 - V_1)\\): negative for expansion, positive for compression.\n" +
        "- Free expansion (into a vacuum): \\(p_{\\mathrm{ext}} = 0\\), so \\(w = 0\\). For an ideal gas also \\(q = 0\\), \\(\\Delta U = 0\\) and \\(\\Delta T = 0\\) (Joule's experiment).\n" +
        "- Isothermal ideal gas: \\(\\Delta U = 0\\), so \\(q = -w = p_{\\mathrm{ext}}\\Delta V\\).\n" +
        "- Size of the work between the same two states: single-stage compression > multi-stage compression > reversible (the same for compression and expansion) > multi-stage expansion > single-stage expansion.\n" +
        "- 1 kPa dm³ = 1 J; 1 L bar = 100 J; 1 L atm = 101.3 J.",
      formula: {
        label: "Work against a constant external pressure",
        latex: "w = -p_{\\mathrm{ext}}\\,(V_2 - V_1)",
      },
      authoredExample: {
        prompt:
          "2 mol of an ideal gas at 350 K expands isothermally from 10 L to 25 L against a constant external pressure of 1.2 bar. Find \\(w\\) and \\(q\\) in joules.",
        steps: [
          "\\(w = -1.2 \\times (25 - 10) = -18\\) L bar = \\(-1800\\) J.",
          "Isothermal ideal gas: \\(\\Delta U = 0\\), so \\(q = -w = +1800\\) J.",
          "The amount and temperature are not needed: only \\(p_{\\mathrm{ext}}\\) and \\(\\Delta V\\) enter.",
        ],
        answer: "\\(w = -1800\\) J, \\(q = +1800\\) J.",
      },
      selfCheckExample: {
        prompt:
          "A gas is compressed from 8 L to 3 L by a constant external pressure of 2 atm. Find the work in joules. (1 L atm = 101.3 J)",
        steps: [
          "\\(w = -2 \\times (3 - 8) = +10\\) L atm.",
          "\\(10 \\times 101.3 = 1013\\) J. Positive: work is done on the gas.",
        ],
        answer: "\\(+1013\\) J.",
      },
      practiceSet: [
        { prompt: "5 L of an ideal gas expands isothermally into a vacuum until it fills 15 L. Find \\(w\\), \\(q\\) and \\(\\Delta U\\).", answer: "All zero" },
        { prompt: "A gas expands from 2 L to 7 L against a constant 100 kPa. Find \\(w\\) in joules.", answer: "\\(-500\\) J" },
        {
          prompt: "Between the same two states, which needs more work: a single-stage compression or a reversible compression?",
          answer: "The single-stage compression",
        },
        { prompt: "An ideal gas expands freely under adiabatic conditions. What is \\(\\Delta T\\)?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "8c6ae64f-8d33-4f8a-9535-7a81ebbf7376", // 27 Jan 2024 — 80 kPa, 30 to 45 dm3, heat transferred
      traps: [
        {
          title: "A change in volume does not mean work",
          body:
            "In a free expansion the volume does change. The work is still zero because the external pressure is zero, and \\(w\\) is \\(-p_{\\mathrm{ext}}\\Delta V\\), not \\(-p_{\\mathrm{gas}}\\Delta V\\).",
        },
        {
          title: "Reversible is the extreme in two different senses",
          body:
            "A reversible path gives the MOST work out of an expansion but needs the LEAST work for a compression. So single-stage compression needs the most work of all, and single-stage expansion gives the least.",
        },
      ],
    },

    // C3 — work as an area on a p–V graph
    {
      kind: "formula" as const,
      slug: "jcthermo-pv-area",
      name: "Work as an area on a p–V graph",
      intuition:
        "On a graph of p against V, the work in any step is the area under that step. Around a closed cycle the areas partly cancel, and the net work is the area enclosed. With p up and V across, a clockwise cycle means the gas does net work; an anticlockwise one means work is done on it.",
      definition:
        "- Vertical step (constant \\(V\\)): \\(w = 0\\).\n" +
        "- Horizontal step (constant \\(p\\)): \\(w = -p\\Delta V\\).\n" +
        "- Straight sloping step: the area of a trapezium, average \\(p\\) times \\(\\Delta V\\).\n" +
        "- Step along an isotherm: \\(w = -nRT\\ln\\frac{V_2}{V_1}\\), with \\(nRT = pV\\) read from any point on it.\n" +
        "- Whole cycle: \\(\\Delta U = 0\\), \\(q = -w\\), and \\(|w|\\) is the enclosed area.\n" +
        "- Check which axis carries \\(V\\) before reading any area; some graphs plot \\(V\\) upwards.",
      formula: {
        label: "Work around a cycle",
        latex: "w_{\\mathrm{net}} = -\\oint p\\,dV,\\qquad |w_{\\mathrm{net}}| = \\text{area enclosed}",
      },
      authoredExample: {
        prompt:
          "An ideal gas goes round the cycle A(1 bar, 2 L) → B(1 bar, 6 L) → C(3 bar, 6 L) → D(3 bar, 2 L) → A. Find the net work done on the gas in joules.",
        steps: [
          "A → B, expansion at 1 bar: \\(w = -1 \\times (6 - 2) = -4\\) L bar.",
          "B → C and D → A are at constant volume: \\(w = 0\\).",
          "C → D, compression at 3 bar: \\(w = -3 \\times (2 - 6) = +12\\) L bar.",
          "Net \\(w = -4 + 12 = +8\\) L bar = +800 J, the rectangle's area \\(2 \\times 4\\). With p up, the path runs anticlockwise, so the work is done on the gas.",
        ],
        answer: "\\(+800\\) J.",
      },
      selfCheckExample: {
        prompt:
          "An ideal gas goes round the triangle 1(2 bar, 1 L) → 2(2 bar, 5 L) → 3(4 bar, 1 L) → 1, with a straight line from 2 to 3. Find the net work done on the gas.",
        steps: [
          "1 → 2 at 2 bar: \\(w = -2 \\times 4 = -8\\) L bar.",
          "2 → 3 is a straight compression from 5 L to 1 L; the average pressure is 3 bar, so \\(w = +3 \\times 4 = +12\\) L bar.",
          "3 → 1 is at constant volume: \\(w = 0\\). Net \\(w = +4\\) L bar = +400 J, the triangle's area \\(\\tfrac{1}{2} \\times 4 \\times 2\\).",
        ],
        answer: "\\(+400\\) J.",
      },
      practiceSet: [
        { prompt: "What work is done along a vertical line on a p–V graph?", answer: "Zero" },
        { prompt: "An ideal gas expands at a constant 2 bar from 3 L to 8 L. Find \\(w\\) in joules.", answer: "\\(-1000\\) J" },
        {
          prompt: "A cycle drawn with p up encloses 6 L bar and runs clockwise. What is the net work done on the gas?",
          answer: "\\(-600\\) J",
        },
        { prompt: "Over a complete cycle, 300 J of work is done on a gas. What is \\(q\\)?", answer: "\\(-300\\) J" },
      ],
      pyqExampleId: "61043e67-4dc1-481a-9404-b9cefdca70f9", // 24 Jan 2023 — isobar, isochore and isotherm cycle (figure)
      traps: [
        {
          title: "V on the vertical axis",
          body:
            "When a graph plots V upwards, read each point as (p, V) and work the steps out one by one. The rule 'clockwise means work done by the gas' reverses when the axes are swapped.",
        },
        {
          title: "A cycle is not always the biggest area",
          body:
            "A cycle's net work is only the area between its two paths. One long expansion sweeps the whole area under its curve down to the V axis, which is often bigger than any enclosed loop.",
        },
      ],
    },
  ],
  related: [
    {
      label: "The first law — the sign convention used here",
      href: "/notes/jee-mains-chemistry/thermodynamics/jch-thermo-first-law",
    },
  ],
};
