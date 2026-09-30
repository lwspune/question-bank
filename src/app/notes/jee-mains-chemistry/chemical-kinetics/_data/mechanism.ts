import type { SubtopicNote } from "@/app/notes/_types";

export const JEE_CH_KIN_MECHANISM_NOTE: SubtopicNote = {
  subtopicName: "Mechanisms, Energy Profiles and Catalysts",
  title: "Mechanisms, Energy Profiles and Catalysts",
  oneLineDefinition:
    "The slow step of a mechanism writes the rate law once its intermediates are removed; an energy profile shows each step's barrier, the intermediates and ΔH, and a catalyst lowers the barriers without moving the start or the end.",
  whyItMatters:
    "Fifteen PYQs, eight of them multiple choice, and one from 2026. Six take a mechanism apart — the order from a slow step after a fast equilibrium, the steady state, or the overall activation energy from a composite rate constant; nine read energy profiles for barriers, intermediates, the rate-determining step, ΔH and what a catalyst changes. Two ideas cover the page.",
  concepts: [
    // C1 — rate law and Ea from a mechanism
    {
      kind: "formula" as const,
      slug: "jckin-mechanism",
      name: "Rate law and activation energy from a mechanism",
      intuition:
        "A reaction can go no faster than its slowest step, so that step writes the rate law. It often contains an intermediate, which cannot appear in the final answer. Replace it using the fast equilibrium before the slow step, or by setting its net rate of formation to zero (the steady state). When the overall \\(k\\) is a product or ratio of step constants, the activation energies add and subtract the same way.",
      definition:
        "- Rate law = the slow step's rate law, with its molecularity as the exponents.\n" +
        "- Fast pre-equilibrium \\(\\mathrm{A_2 \\rightleftharpoons 2A}\\): \\(K = \\dfrac{[A]^2}{[A_2]}\\), so \\([A] = (K[A_2])^{1/2}\\).\n" +
        "- Steady state for \\(A \\xrightarrow{k_1} B \\xrightarrow{k_2} C\\): \\(\\dfrac{d[B]}{dt} = k_1[A] - k_2[B] = 0\\), so \\([B] = \\dfrac{k_1}{k_2}[A]\\).\n" +
        "- Composite constant \\(k = \\dfrac{k_1k_2}{k_3}\\): \\(E_a = E_{a1} + E_{a2} - E_{a3}\\).\n" +
        "- A power carries over: \\(k = \\sqrt{k_1}\\) gives \\(E_a = \\tfrac12E_{a1}\\).",
      formula: {
        label: "Composite activation energy",
        latex: "k = \\frac{k_1k_2}{k_3}\\ \\Rightarrow\\ E_a = E_{a1} + E_{a2} - E_{a3}",
      },
      authoredExample: {
        prompt:
          "The reaction \\(\\mathrm{2NO + O_2 \\rightarrow 2NO_2}\\) follows the mechanism \\(\\mathrm{2NO \\rightleftharpoons N_2O_2}\\) (fast), \\(\\mathrm{N_2O_2 + O_2 \\rightarrow 2NO_2}\\) (slow). Find the rate law and the overall order.",
        steps: [
          "Slow step: rate \\(= k_2[\\mathrm{N_2O_2}][\\mathrm{O_2}]\\). \\(\\mathrm{N_2O_2}\\) is an intermediate.",
          "Fast equilibrium: \\([\\mathrm{N_2O_2}] = K[\\mathrm{NO}]^2\\).",
          "Rate \\(= k_2K[\\mathrm{NO}]^2[\\mathrm{O_2}]\\): order \\(2 + 1 = 3\\).",
        ],
        answer: "Rate \\(= k[\\mathrm{NO}]^2[\\mathrm{O_2}]\\); third order.",
      },
      selfCheckExample: {
        prompt:
          "The overall rate constant of a reaction is \\(k = k_2\\sqrt{\\dfrac{k_1}{k_3}}\\). The step activation energies are \\(E_{a1} = 100\\), \\(E_{a2} = 40\\) and \\(E_{a3} = 20\\) kJ mol\\(^{-1}\\). Find the overall \\(E_a\\).",
        steps: [
          "\\(E_a = E_{a2} + \\tfrac12(E_{a1} - E_{a3}) = 40 + \\tfrac12(100 - 20)\\).",
        ],
        answer: "\\(80\\) kJ mol\\(^{-1}\\).",
      },
      practiceSet: [
        { prompt: "The slow step is the elementary step \\(2A + B \\rightarrow\\) products. Rate law?", answer: "\\(k[A]^2[B]\\)" },
        { prompt: "Steady state for \\(A \\xrightarrow{k_1} B \\xrightarrow{k_2} C\\): \\([B] = ?\\)", answer: "\\(\\dfrac{k_1}{k_2}[A]\\)" },
        { prompt: "\\(k = k_1k_2\\). Overall \\(E_a\\)?", answer: "\\(E_{a1} + E_{a2}\\)" },
        { prompt: "\\(k = \\sqrt{k_1}\\). Overall \\(E_a\\)?", answer: "\\(\\tfrac12E_{a1}\\)" },
      ],
      pyqExampleId: "60fead68-0e2c-4dcf-8d87-958e52291b70", // 2025 — A₂ ⇌ 2A fast, A + B₂ slow: order 1.5
      traps: [
        {
          title: "An intermediate left in the rate law",
          body:
            "The final rate law contains only species in the overall equation (and any catalyst). Replace an intermediate using the fast equilibrium or the steady state before counting the order.",
        },
        {
          title: "Rate law written from the overall equation",
          body:
            "The exponents come from the SLOW step, not from the overall stoichiometry. \\(\\mathrm{2NO + Br_2 \\rightarrow 2NOBr}\\) is third order because of its mechanism, not because three molecules appear on the left.",
        },
      ],
    },

    // C2 — energy profiles and catalysts
    {
      kind: "formula" as const,
      slug: "jckin-energy-profiles",
      name: "Reading energy profiles and the effect of a catalyst",
      intuition:
        "An energy profile follows the energy along the reaction path. Each hump is an activated complex; each valley between humps is an intermediate. The climb from a step's start to its hump is that step's barrier. The start and the end fix \\(\\Delta H\\), so a catalyst — which only offers a lower path — cannot change it.",
      definition:
        "- Humps = activated complexes (one per step); valleys between humps = intermediates.\n" +
        "- The step with the largest barrier, measured from its own starting level, is the slow, **rate-determining** step.\n" +
        "- \\(\\Delta H = E_{a,f} - E_{a,b}\\). Products above reactants: endothermic, products less stable. Products below: exothermic.\n" +
        "- A **catalyst** gives a new path with a lower hump. It lowers \\(E_{a,f}\\) and \\(E_{a,b}\\) by the SAME amount, and leaves \\(\\Delta H\\), \\(\\Delta G\\) and \\(K\\) unchanged; the catalysed curve starts and ends at the same levels.\n" +
        "- A catalyst cannot make a non-spontaneous reaction happen; it only speeds up both directions.",
      formula: {
        label: "Barriers and enthalpy",
        latex: "\\Delta H = E_{a,f} - E_{a,b}",
      },
      authoredExample: {
        prompt:
          "An exothermic reaction has \\(\\Delta H = -35\\) kJ mol\\(^{-1}\\) and \\(E_{a,f} = 60\\) kJ mol\\(^{-1}\\). Find \\(E_{a,b}\\). A catalyst then lowers \\(E_{a,f}\\) to 42 kJ mol\\(^{-1}\\); find the new \\(E_{a,b}\\).",
        steps: [
          "\\(E_{a,b} = E_{a,f} - \\Delta H = 60 - (-35) = 95\\) kJ mol\\(^{-1}\\).",
          "The catalyst lowers both barriers by \\(60 - 42 = 18\\) kJ mol\\(^{-1}\\): \\(E_{a,b} = 95 - 18 = 77\\) kJ mol\\(^{-1}\\). \\(\\Delta H\\) stays \\(-35\\).",
        ],
        answer: "\\(95\\) kJ mol\\(^{-1}\\), then \\(77\\) kJ mol\\(^{-1}\\).",
      },
      selfCheckExample: {
        prompt:
          "A three-step reaction starts at 0 kJ mol\\(^{-1}\\). Its humps are at +70, +40 and +55 kJ mol\\(^{-1}\\), the valleys between them at +20 and +10, and the products end at −15. How many intermediates and activated complexes are there, which step is rate-determining, and what is \\(\\Delta H\\)?",
        steps: [
          "Three humps: 3 activated complexes. Two valleys: 2 intermediates.",
          "Barriers from each step's start: \\(70 - 0 = 70\\), \\(40 - 20 = 20\\), \\(55 - 10 = 45\\). The largest is step 1.",
          "\\(\\Delta H = -15 - 0 = -15\\) kJ mol\\(^{-1}\\).",
        ],
        answer: "2 intermediates, 3 activated complexes; step 1; \\(\\Delta H = -15\\) kJ mol\\(^{-1}\\).",
      },
      practiceSet: [
        { prompt: "\\(E_{a,f} = 90\\) and \\(E_{a,b} = 70\\) kJ mol\\(^{-1}\\). Find \\(\\Delta H\\).", answer: "\\(+20\\) kJ mol\\(^{-1}\\), endothermic" },
        { prompt: "A catalyst lowers \\(E_{a,f}\\) by 25 kJ mol\\(^{-1}\\). Change in \\(E_{a,b}\\)?", answer: "Also lowered by 25 kJ mol\\(^{-1}\\)" },
        { prompt: "Does a catalyst change \\(\\Delta G\\) or the equilibrium constant?", answer: "No" },
        { prompt: "On a profile the product level lies above the reactant level. Exothermic or endothermic?", answer: "Endothermic" },
      ],
      pyqExampleId: "3e9122b1-fff1-4207-aa56-876491dfe6f0", // 2025 — profile with E₁ and E₂: forward barrier and stability
      traps: [
        {
          title: "A catalyst that changes ΔH",
          body:
            "A catalyst lowers both barriers by the same amount, so \\(\\Delta H = E_{a,f} - E_{a,b}\\) does not change; nor do \\(\\Delta G\\) and \\(K\\). It cannot make a non-spontaneous reaction occur.",
        },
        {
          title: "The sign of ΔH flipped",
          body:
            "\\(\\Delta H = E_{a,f} - E_{a,b}\\), forward minus backward. With \\(E_{a,f} = 120\\) and \\(E_{a,b} = 150\\) kJ mol\\(^{-1}\\), \\(\\Delta H = -30\\) kJ mol\\(^{-1}\\): exothermic, not \\(+30\\).",
        },
        {
          title: "Valleys counted as activated complexes",
          body:
            "Peaks are activated complexes; the valleys between them are intermediates. The start and end levels are the reactants and products and are neither.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Arrhenius — how a lower barrier becomes a larger rate constant",
      href: "/notes/jee-mains-chemistry/chemical-kinetics/jch-kin-arrhenius",
    },
  ],
};
