import type { SubtopicNote } from "@/app/notes/_types";

export const GIBBS_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Gibbs Free Energy and Spontaneity",
  title: "Gibbs Free Energy and Spontaneity",
  oneLineDefinition:
    "ΔG = ΔH − TΔS packs the second law into system-only quantities: negative means spontaneous, zero means equilibrium, and the temperature at which it crosses zero is ΔH/ΔS.",
  whyItMatters:
    "12 PYQs, none HARD. Half are the sign table — which combination of ΔH and ΔS is spontaneous at all, high or no temperatures — and half are arithmetic: ΔG from ΔH, T and ΔS (units!), the boiling point or equilibrium temperature as ΔH/ΔS, and ΔG° = −2.303RT log K.",
  concepts: [
    // 1 — Gibbs energy and the sign table
    {
      kind: "formula" as const,
      slug: "cetth-gibbs-energy-and-spontaneity",
      name: "ΔG = ΔH − TΔS and the Sign Table",
      intuition:
        "Two things drive a process: releasing heat (ΔH < 0) and increasing disorder (ΔS > 0). ΔG weighs them at the given temperature. When both favour, it is spontaneous at every T; when both oppose, at none; when they disagree, temperature decides — entropy wins when T is high.",
      definition:
        "- \\(\\Delta G = \\Delta H - T\\Delta S\\); ΔG < 0 spontaneous, ΔG > 0 non-spontaneous, ΔG = 0 equilibrium. Keep ΔS in kJ K⁻¹ when ΔH is in kJ.\n" +
        "- ΔH < 0, ΔS > 0: spontaneous at ALL temperatures. ΔH > 0, ΔS < 0: at NONE.\n" +
        "- ΔH > 0, ΔS > 0: spontaneous at HIGH T only (\\(T > \\Delta H/\\Delta S\\)). ΔH < 0, ΔS < 0: at LOW T only (\\(T < \\Delta H/\\Delta S\\)) — A + B with −84.2 kJ and −200 J K⁻¹ is spontaneous below 421 K.\n" +
        "- Numbers: ΔH = 31400 J, ΔS = 32 J K⁻¹, 1273 K: \\(31400 - 40736 = -9336\\) J. Ice melting, 7 kJ, 24.8 J K⁻¹, 300 K: \\(7 - 7.44 = -0.44\\) kJ. ΔG° = 28000 J, ΔS° = 120 J K⁻¹, 298 K: \\(\\Delta H^\\circ = 28000 + 35760 = 63.76\\) kJ.\n" +
        "- \\(\\Delta G = -T\\Delta S_{\\text{total}}\\), which is why a negative ΔG is the same statement as the second law.",
      formula: {
        label: "Gibbs energy",
        latex:
          "\\Delta G = \\Delta H - T\\Delta S",
      },
      authoredExample: {
        prompt: "A reaction has ΔH = +40 kJ and ΔS = +125 J K⁻¹. Is it spontaneous at 300 K? Above what temperature does it become so?",
        steps: [
          "\\(\\Delta G_{300} = 40 - 300 \\times 0.125 = +2.5\\) kJ: not spontaneous.",
          "\\(T > 40000/125 = 320\\) K.",
        ],
        answer: "No; above 320 K",
      },
      selfCheckExample: {
        prompt: "ΔH = −60 kJ and ΔS = −150 J K⁻¹. Find ΔG at 350 K and the highest temperature at which the reaction is spontaneous.",
        steps: [
          "\\(\\Delta G = -60 + 52.5 = -7.5\\) kJ; spontaneous while \\(T < 60000/150 = 400\\) K.",
        ],
        answer: "\\(-7.5\\) kJ; 400 K",
      },
      practiceSet: [
        { prompt: "Spontaneous at all temperatures: signs of ΔH and ΔS?", answer: "ΔH < 0, ΔS > 0" },
        { prompt: "Non-spontaneous at all temperatures?", answer: "ΔH > 0, ΔS < 0" },
        { prompt: "ΔH = −84.2 kJ, ΔS = −200 J K⁻¹: highest T for spontaneity?", answer: "421 K" },
        { prompt: "ΔH = 7 kJ, ΔS = 24.8 J K⁻¹, 300 K: ΔG?", answer: "−0.44 kJ" },
      ],
      pyqExampleId: "7a0dc3aa-1322-451b-8e2c-0dcb9d30b18c",
      traps: [
        {
          title: "Subtracting joules from kilojoules",
          body:
            "7 − 300 × 24.8 = −7433 'kJ' is nonsense; 24.8 J K⁻¹ is 0.0248 kJ K⁻¹, giving −0.44 kJ. The mismatched-unit answer is on the option list.",
        },
      ],
    },

    // 2 — equilibrium temperature and K
    {
      kind: "formula" as const,
      slug: "cetth-equilibrium-temperature-and-k",
      name: "ΔG = 0: Boiling Points, Transition Temperatures and K",
      intuition:
        "At equilibrium ΔG = 0, so ΔH = TΔS and T = ΔH/ΔS — that is how a boiling point follows from the enthalpy and entropy of vaporisation. For a reaction the standard Gibbs energy sets the equilibrium constant: ΔG° = −2.303RT log K, a large K meaning a strongly negative ΔG°.",
      definition:
        "- At equilibrium: \\(\\Delta H^\\circ = T\\Delta S^\\circ\\), \\(T = \\dfrac{\\Delta H}{\\Delta S}\\). Boiling point: 30 kJ / 75 J K⁻¹ = 400 K. ΔH = −210 kJ, ΔS = −150 J K⁻¹: 1400 K.\n" +
        "- \\(\\Delta G^\\circ = -RT\\ln K = -2.303\\,RT\\log_{10} K\\), R = 8.314 × 10⁻³ kJ. \\(K_p = 3.356 \\times 10^{17}\\) at 298 K: \\(\\log K = 17.53\\), \\(\\Delta G^\\circ = -2.303 \\times 8.314 \\times 10^{-3} \\times 298 \\times 17.53 = -100\\) kJ.\n" +
        "- K > 1 ⇔ ΔG° < 0 (products favoured); K < 1 ⇔ ΔG° > 0.\n" +
        "- Non-standard: \\(\\Delta G = \\Delta G^\\circ + 2.303\\,RT\\log Q\\).",
      formula: {
        label: "Equilibrium conditions",
        latex:
          "T_{\\text{eq}} = \\frac{\\Delta H}{\\Delta S},\\qquad \\Delta G^\\circ = -2.303\\,RT\\log_{10} K",
      },
      authoredExample: {
        prompt: "Water has ΔH_vap = 40.7 kJ mol⁻¹ and ΔS_vap = 109 J K⁻¹ mol⁻¹. Predict its boiling point.",
        steps: [
          "\\(T = 40700/109 = 373\\) K.",
        ],
        answer: "\\(373\\) K (100 °C)",
      },
      selfCheckExample: {
        prompt: "A reaction has K = 10⁵ at 298 K. Find ΔG°.",
        steps: [
          "\\(\\Delta G^\\circ = -2.303 \\times 8.314 \\times 298 \\times 5 = -28{,}500\\) J.",
        ],
        answer: "\\(\\approx -28.5\\) kJ",
      },
      practiceSet: [
        { prompt: "ΔH_vap = 30 kJ, ΔS_vap = 75 J K⁻¹: boiling point?", answer: "400 K" },
        { prompt: "Relation between ΔH° and ΔS° at equilibrium?", answer: "\\(\\Delta H^\\circ = T\\Delta S^\\circ\\)" },
        { prompt: "\\(K_p = 3.356 \\times 10^{17}\\) at 298 K: ΔG°?", answer: "−100 kJ" },
        { prompt: "ΔH = −210 kJ, ΔS = −150 J K⁻¹: T for ΔG = 0?", answer: "1400 K" },
      ],
      pyqExampleId: "c2de9581-e2b1-4d10-8206-e5c900ed050f",
      traps: [
        {
          title: "Inverting to T = ΔS/ΔH",
          body:
            "75/30000 = 0.0025 is not a temperature. ΔH (J) over ΔS (J K⁻¹) gives kelvin; the inverted ratio gives K⁻¹, and the wrong option is built from it.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Entropy — ΔS_total, the quantity ΔG stands in for",
      href: "/notes/mht-cet-chemistry/chemical-thermodynamics/cetth-entropy",
    },
    {
      label: "Electrochemistry — ΔG° = −nFE°, the same ΔG° on a cell",
      href: "/notes/mht-cet-chemistry/electrochemistry/cetec-galvanic-cells",
    },
  ],
};
