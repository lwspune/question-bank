import type { SubtopicNote } from "@/app/notes/_types";

export const NERNST_ELEC_NOTE: SubtopicNote = {
  subtopicName: "Nernst Equation and Concentration Effects",
  title: "Nernst Equation and Concentration Effects",
  oneLineDefinition:
    "How a cell's voltage moves away from E° when the concentrations, gas pressures or pH are not standard, and how to run the Nernst equation backwards to find an unknown.",
  whyItMatters:
    "Thirty PYQs, the largest page in the chapter, and nine of them from 2026. Twenty-three are numerical. Eleven find a cell emf from given concentrations, nine run the equation backwards for a concentration, a ratio, n or E°, and ten put H⁺ or OH⁻ into the log term through pH. Three ideas cover the page.",
  concepts: [
    // C1 — the Nernst equation forwards
    {
      kind: "formula" as const,
      slug: "jcelec-nernst-emf",
      name: "Cell emf from the Nernst equation",
      intuition:
        "\\(E^\\circ\\) is the voltage when every ion is at 1 M and every gas at 1 bar. Away from that, the voltage shifts by a small log term. More product pushes the voltage down; more reactant pushes it up.",
      definition:
        "- \\(E_{cell}=E^\\circ_{cell}-\\frac{0.059}{n}\\log Q\\) at 298 K. Use 0.06 if the question gives 0.06.\n" +
        "- \\(Q\\) is products over reactants, each raised to its coefficient in the BALANCED reaction. Solids and pure liquids count as 1.\n" +
        "- \\(n\\) is the number of electrons in the balanced full reaction. When the half-reactions differ, take their LCM.\n" +
        "- Concentration cell: the same couple on both sides, so \\(E^\\circ=0\\) and \\(E=\\frac{0.059}{n}\\log\\frac{c_{cathode}}{c_{anode}}\\). It gives a positive voltage only when the cathode side is more concentrated.\n" +
        "- As a cell runs, \\(Q\\) rises and \\(E_{cell}\\) falls, reaching 0 at equilibrium. \\(E^\\circ_{cell}\\) does not change.",
      formula: {
        label: "Nernst equation at 298 K",
        latex: "E_{cell}=E^\\circ_{cell}-\\frac{0.059}{n}\\log Q",
        symbols: [
          { symbol: "Q", meaning: "reaction quotient: products over reactants, powers from the balanced equation" },
          { symbol: "n", meaning: "electrons transferred in the balanced reaction" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the emf at 298 K of \\(\\mathrm{Mg|Mg^{2+}(0.001\\,M)\\|Cu^{2+}(0.0001\\,M)|Cu}\\). \\(E^\\circ(\\mathrm{Mg^{2+}/Mg})=-2.37\\) V, \\(E^\\circ(\\mathrm{Cu^{2+}/Cu})=+0.34\\) V.",
        steps: [
          "\\(E^\\circ_{cell}=0.34-(-2.37)=2.71\\) V.",
          "Reaction: \\(\\mathrm{Mg+Cu^{2+}\\to Mg^{2+}+Cu}\\), so \\(n=2\\).",
          "\\(Q=\\frac{[\\mathrm{Mg^{2+}}]}{[\\mathrm{Cu^{2+}}]}=\\frac{10^{-3}}{10^{-4}}=10\\).",
          "\\(E=2.71-\\frac{0.059}{2}\\log 10=2.71-0.0295=2.68\\) V.",
        ],
        answer: "\\(E_{cell}\\approx 2.68\\) V.",
      },
      selfCheckExample: {
        prompt:
          "Find the emf of \\(\\mathrm{Ni|Ni^{2+}(0.01\\,M)\\|Ag^+(0.1\\,M)|Ag}\\) at 298 K. \\(E^\\circ(\\mathrm{Ni^{2+}/Ni})=-0.25\\) V, \\(E^\\circ(\\mathrm{Ag^+/Ag})=+0.80\\) V.",
        steps: [
          "\\(E^\\circ_{cell}=0.80-(-0.25)=1.05\\) V.",
          "Reaction: \\(\\mathrm{Ni+2Ag^+\\to Ni^{2+}+2Ag}\\), so \\(n=2\\).",
          "\\(Q=\\frac{[\\mathrm{Ni^{2+}}]}{[\\mathrm{Ag^+}]^2}=\\frac{0.01}{(0.1)^2}=1\\).",
          "\\(\\log 1=0\\), so \\(E=E^\\circ=1.05\\) V. Forgetting the square gives \\(Q=0.1\\) and a wrong 1.08 V.",
        ],
        answer: "\\(1.05\\) V.",
      },
      practiceSet: [
        { prompt: "Daniell cell with \\([\\mathrm{Zn^{2+}}]=[\\mathrm{Cu^{2+}}]\\). \\(E\\)?", answer: "\\(E^\\circ=1.10\\) V" },
        { prompt: "\\(\\mathrm{Ag|Ag^+(0.001\\,M)\\|Ag^+(0.1\\,M)|Ag}\\): emf?", answer: "\\(0.118\\) V", method: "\\(0.059\\log(0.1/0.001)\\)." },
        { prompt: "Write \\(Q\\) for \\(\\mathrm{Cu+2Ag^+\\to Cu^{2+}+2Ag}\\).", answer: "\\([\\mathrm{Cu^{2+}}]/[\\mathrm{Ag^+}]^2\\)" },
        { prompt: "\\(E_{cell}\\) when the cell reaches equilibrium?", answer: "\\(0\\)" },
        { prompt: "To raise the emf of a Daniell cell, raise which ion's concentration?", answer: "\\(\\mathrm{Cu^{2+}}\\) (or lower \\(\\mathrm{Zn^{2+}}\\))" },
      ],
      pyqExampleId: "2b5012d5-fc4b-4f3e-bfe6-74f4e39f40ab", // 2026 — Sn(OH)₆²⁻/HSnO₂⁻ with Bi₂O₃/Bi, Q = 10⁶, n = 6 by balancing
      traps: [
        {
          title: "Dropping the powers in Q",
          body: "In \\(\\mathrm{Zn+2Ag^+}\\), the silver ion is squared in \\(Q\\). The same balancing that fixes \\(n\\) fixes the powers, so do both from one balanced equation.",
        },
        {
          title: "Q upside down",
          body: "\\(Q\\) is products over reactants. Writing it the other way flips the sign of the log term and moves the answer by twice the correction.",
        },
      ],
    },

    // C2 — the Nernst equation backwards
    {
      kind: "formula" as const,
      slug: "jcelec-nernst-unknown",
      name: "Solving the Nernst equation for an unknown",
      intuition:
        "The same equation has four quantities that can be missing: a concentration, a ratio of concentrations, \\(n\\), or \\(E^\\circ\\). Put in everything you know, isolate the log, and undo it.",
      definition:
        "- Rearranged: \\(\\log Q=\\frac{n\\,(E^\\circ-E)}{0.059}\\).\n" +
        "- If \\(E>E^\\circ\\), then \\(\\log Q<0\\), so \\(Q<1\\): reactants are in excess.\n" +
        "- For a redox couple on Pt (\\(\\mathrm{Fe^{3+},Fe^{2+}}\\)), the unknown is usually the ratio \\([\\text{reduced}]/[\\text{oxidised}]\\).\n" +
        "- To find \\(n\\), use two readings or one reading with a known \\(Q\\): \\(n=\\frac{0.059\\log Q}{E^\\circ-E}\\).\n" +
        "- To find \\(E^\\circ\\) of one electrode, first find \\(E^\\circ_{cell}\\) from the measured \\(E\\), then subtract the known electrode.",
      formula: {
        label: "Nernst equation, rearranged",
        latex: "\\log Q=\\frac{n\\left(E^\\circ_{cell}-E_{cell}\\right)}{0.059}",
      },
      authoredExample: {
        prompt:
          "\\(\\mathrm{Cu|Cu^{2+}(1\\,M)\\|Ag^+(x\\,M)|Ag}\\) reads 0.342 V at 298 K. \\(E^\\circ_{cell}=0.46\\) V. Find \\(x\\).",
        steps: [
          "Reaction: \\(\\mathrm{Cu+2Ag^+\\to Cu^{2+}+2Ag}\\), \\(n=2\\), \\(Q=\\frac{1}{x^2}\\).",
          "\\(0.342=0.46-0.0295\\log\\frac{1}{x^2}\\), so \\(0.0295\\log\\frac{1}{x^2}=0.118\\).",
          "\\(\\log\\frac{1}{x^2}=4\\), so \\(x^2=10^{-4}\\) and \\(x=10^{-2}\\).",
        ],
        answer: "\\([\\mathrm{Ag^+}]=0.01\\) M.",
      },
      selfCheckExample: {
        prompt:
          "A cell has \\(E^\\circ_{cell}=0.500\\) V. When \\(Q=10^{-3}\\), it reads 0.559 V at 298 K. Find \\(n\\).",
        steps: [
          "\\(0.559=0.500-\\frac{0.059}{n}\\log 10^{-3}=0.500+\\frac{0.177}{n}\\).",
          "\\(\\frac{0.177}{n}=0.059\\), so \\(n=3\\).",
        ],
        answer: "\\(n=3\\).",
      },
      practiceSet: [
        {
          prompt: "\\(\\mathrm{Pt|H_2(1\\,bar)|H^+(1\\,M)\\|Fe^{3+},Fe^{2+}|Pt}\\), \\(E^\\circ=0.77\\) V, reads 0.829 V. \\([\\mathrm{Fe^{2+}}]/[\\mathrm{Fe^{3+}}]\\)?",
          answer: "\\(0.1\\)",
          method: "\\(0.829=0.77-0.059\\log r\\), so \\(\\log r=-1\\).",
        },
        { prompt: "A Daniell cell (\\(E^\\circ=1.10\\) V) reads 1.159 V. \\([\\mathrm{Cu^{2+}}]/[\\mathrm{Zn^{2+}}]\\)?", answer: "\\(100\\)" },
        { prompt: "\\(E\\) falls by 0.059 V when \\(Q\\) rises tenfold. \\(n\\)?", answer: "\\(1\\)" },
        { prompt: "A concentration cell with \\(n=1\\) reads 0.118 V. Ratio of the two concentrations?", answer: "\\(100\\)" },
      ],
      pyqExampleId: "8c7e0a6a-81d5-4f53-acfe-f6e3e911b7a3", // 2026 — Zn/Ag cell reads 1.60 V; find log[Ag⁺]
      traps: [
        {
          title: "Losing the sign of the log",
          body: "If the measured \\(E\\) is ABOVE \\(E^\\circ\\), \\(\\log Q\\) must be negative. Check this before you take the antilog; a sign slip turns 0.01 M into 100 M.",
        },
        {
          title: "Square root forgotten",
          body: "When \\(Q=1/x^2\\), the log gives \\(x^2\\). Take the square root at the end.",
        },
      ],
    },

    // C3 — pH in the Nernst equation
    {
      kind: "formula" as const,
      slug: "jcelec-ph-electrodes",
      name: "Electrodes that depend on pH",
      intuition:
        "When \\(\\mathrm{H^+}\\) or \\(\\mathrm{OH^-}\\) sits in a half-reaction, its concentration goes into the log term like any other ion. So pH moves the potential: by 0.059 V per pH unit for every electron that carries one proton.",
      definition:
        "- Hydrogen electrode, \\(\\mathrm{2H^++2e^-\\to H_2}\\): \\(E=-\\frac{0.059}{2}\\log\\frac{p_{H_2}}{[\\mathrm{H^+}]^2}=-0.059\\,\\mathrm{pH}-0.0295\\log p_{H_2}\\).\n" +
        "- For \\(E=0\\) you need \\(p_{H_2}=[\\mathrm{H^+}]^2\\). In pure water that is \\(10^{-14}\\) bar.\n" +
        "- Oxygen electrode: \\(E=1.23-0.059\\,\\mathrm{pH}\\) (at 1 bar \\(\\mathrm{O_2}\\)).\n" +
        "- Quinhydrone electrode: \\(E=0.70-0.059\\,\\mathrm{pH}\\).\n" +
        "- \\(\\mathrm{MnO_4^-+8H^++5e^-\\to Mn^{2+}+4H_2O}\\): \\([\\mathrm{H^+}]^8\\) in the log. \\(\\mathrm{Cr_2O_7^{2-}+14H^++6e^-\\to 2Cr^{3+}+7H_2O}\\): \\([\\mathrm{H^+}]^{14}\\).\n" +
        "- In a basic solution a metal ion is fixed by \\(K_{sp}\\): \\([\\mathrm{Cu^{2+}}]=K_{sp}/[\\mathrm{OH^-}]^2\\).\n" +
        "- For a buffer, find the pH first: \\(\\mathrm{pH}=\\mathrm{p}K_a+\\log\\frac{[\\text{salt}]}{[\\text{acid}]}\\).",
      formula: {
        label: "Hydrogen electrode",
        latex: "E_{H^+/H_2}=-0.059\\,\\mathrm{pH}-\\frac{0.059}{2}\\log p_{H_2}",
      },
      authoredExample: {
        prompt:
          "A hydrogen electrode at 1 bar dips into a solution of pH 5 at 298 K. Find its potential. What \\(\\mathrm{H_2}\\) pressure would make it zero in the same solution?",
        steps: [
          "\\(E=-\\frac{0.059}{2}\\log\\frac{1}{(10^{-5})^2}=-0.0295\\times 10=-0.295\\) V.",
          "For \\(E=0\\) the log must be 0, so \\(p_{H_2}=[\\mathrm{H^+}]^2=10^{-10}\\) bar.",
        ],
        answer: "\\(-0.295\\) V; \\(10^{-10}\\) bar.",
      },
      selfCheckExample: {
        prompt:
          "Find the potential of \\(\\mathrm{MnO_4^-(0.01\\,M)|Mn^{2+}(0.1\\,M)}\\) at pH 2 and 298 K. \\(E^\\circ=1.51\\) V.",
        steps: [
          "\\(\\mathrm{MnO_4^-+8H^++5e^-\\to Mn^{2+}+4H_2O}\\), \\(n=5\\).",
          "\\(Q=\\frac{[\\mathrm{Mn^{2+}}]}{[\\mathrm{MnO_4^-}][\\mathrm{H^+}]^8}=\\frac{0.1}{0.01\\times10^{-16}}=10^{17}\\).",
          "\\(E=1.51-\\frac{0.059}{5}\\times17=1.51-0.20=1.31\\) V.",
        ],
        answer: "\\(\\approx 1.31\\) V.",
      },
      practiceSet: [
        { prompt: "Oxygen electrode at pH 10, 1 bar?", answer: "\\(0.64\\) V", method: "\\(1.23-0.59\\)." },
        { prompt: "Hydrogen electrode, 1 bar, pH 2?", answer: "\\(-0.118\\) V" },
        { prompt: "Power of \\([\\mathrm{H^+}]\\) in the Nernst term of \\(\\mathrm{Cr_2O_7^{2-}/Cr^{3+}}\\)?", answer: "\\(14\\)" },
        {
          prompt: "\\(E^\\circ(\\mathrm{Cu^{2+}/Cu})=0.34\\) V, \\(K_{sp}(\\mathrm{Cu(OH)_2})=10^{-18}\\). Potential at pH 14?",
          answer: "\\(\\approx -0.19\\) V",
          method: "\\([\\mathrm{Cu^{2+}}]=10^{-18}\\); \\(0.34-0.0295\\times18\\).",
        },
      ],
      pyqExampleId: "4b05a9db-1185-4ba8-8802-3d3c9efc33f8", // 2026 — pH above which O₂ evolves at the anode
      traps: [
        {
          title: "Electrode potential is not the cell emf",
          body: "\"Potential of the hydrogen electrode\" means the single electrode's reduction potential, \\(-0.059\\,\\mathrm{pH}\\). It is not an \\(E_{cell}\\), and no second electrode is subtracted.",
        },
        {
          title: "Forgetting the pressure term",
          body: "A hydrogen electrode at 2 atm or 0.1 bar needs \\(-0.0295\\log p_{H_2}\\) as well as the pH term.",
        },
      ],
    },
  ],
};
