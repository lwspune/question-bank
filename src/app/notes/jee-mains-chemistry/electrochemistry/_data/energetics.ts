import type { SubtopicNote } from "@/app/notes/_types";

export const ENERGETICS_ELEC_NOTE: SubtopicNote = {
  subtopicName: "Gibbs Energy, Equilibrium Constant and Combining Potentials",
  title: "Gibbs Energy, Equilibrium Constant and Combining Potentials",
  oneLineDefinition:
    "Turning a cell potential into Gibbs energy, an equilibrium constant, entropy or useful work, and finding a new E° from two known ones by adding Gibbs energies.",
  whyItMatters:
    "Sixteen PYQs, eleven of them numerical, and four from 2026. Nine convert E° into ΔG°, K, ΔS° or the work a cell can do; seven combine two or three known potentials into a new one, often from a Latimer diagram. Two ideas cover the page.",
  concepts: [
    // C1 — ΔG°, K and work
    {
      kind: "formula" as const,
      slug: "jcelec-gibbs",
      name: "Gibbs energy, K and work from E°",
      intuition:
        "A cell's voltage is its Gibbs energy per unit of charge. Multiply by the charge that flows, \\(nF\\), and you have \\(\\Delta G\\). From \\(\\Delta G^\\circ\\) the usual thermodynamics gives \\(K\\), and the slope of \\(E^\\circ\\) with temperature gives \\(\\Delta S^\\circ\\).",
      definition:
        "- \\(\\Delta G^\\circ=-nFE^\\circ_{cell}\\) and \\(\\Delta G=-nFE_{cell}\\). \\(F=96500\\) C mol⁻¹.\n" +
        "- \\(\\log K=\\frac{nE^\\circ_{cell}}{0.059}\\) at 298 K.\n" +
        "- The most negative \\(\\Delta G^\\circ\\) belongs to the largest \\(nE^\\circ\\), not the largest \\(E^\\circ\\).\n" +
        "- \\(\\Delta S^\\circ=nF\\left(\\frac{\\partial E^\\circ}{\\partial T}\\right)_P\\), and \\(\\Delta H^\\circ=\\Delta G^\\circ+T\\Delta S^\\circ\\).\n" +
        "- The maximum electrical work is \\(-\\Delta G\\): charge times potential, \\(nFE\\), never charge divided by potential.\n" +
        "- A cell working at efficiency \\(\\eta\\) delivers \\(\\eta\\,nFE\\). Work against a constant pressure is \\(P_{ext}\\Delta V\\).\n" +
        "- \\(\\Delta_fG^\\circ\\) is zero for elements and for \\(\\mathrm{H^+(aq)}\\).",
      formula: {
        label: "Gibbs energy and equilibrium constant",
        latex: "\\Delta G^\\circ=-nFE^\\circ_{cell},\\qquad \\log K=\\frac{nE^\\circ_{cell}}{0.059}",
      },
      authoredExample: {
        prompt:
          "For the Daniell cell, \\(E^\\circ_{cell}=1.10\\) V. Find \\(\\Delta G^\\circ\\) and \\(K\\) at 298 K.",
        steps: [
          "\\(\\mathrm{Zn+Cu^{2+}\\to Zn^{2+}+Cu}\\), so \\(n=2\\).",
          "\\(\\Delta G^\\circ=-2\\times96500\\times1.10=-212\\,300\\) J \\(=-212.3\\) kJ mol⁻¹.",
          "\\(\\log K=\\frac{2\\times1.10}{0.059}=37.29\\), so \\(K\\approx1.9\\times10^{37}\\).",
        ],
        answer: "\\(\\Delta G^\\circ=-212.3\\) kJ mol⁻¹; \\(K\\approx1.9\\times10^{37}\\).",
      },
      selfCheckExample: {
        prompt:
          "A hydrogen–oxygen fuel cell has \\(E^\\circ=1.23\\) V and runs at 60% efficiency. How much useful electrical work does it give per mole of \\(\\mathrm{H_2}\\)?",
        steps: [
          "\\(\\mathrm{H_2+\\tfrac12O_2\\to H_2O}\\): two electrons per \\(\\mathrm{H_2}\\), so \\(n=2\\).",
          "\\(-\\Delta G^\\circ=2\\times96500\\times1.23=237\\,390\\) J.",
          "Useful work \\(=0.60\\times237\\,390=142\\,434\\) J.",
        ],
        answer: "\\(\\approx142\\) kJ per mole of \\(\\mathrm{H_2}\\).",
      },
      practiceSet: [
        { prompt: "\\(E^\\circ=0.059\\) V, \\(n=2\\): \\(\\log K\\)?", answer: "\\(2\\)" },
        { prompt: "\\(K=10^{10}\\), \\(n=1\\): \\(E^\\circ\\)?", answer: "\\(0.59\\) V" },
        { prompt: "\\(n=2\\), \\((\\partial E^\\circ/\\partial T)_P=-5\\times10^{-4}\\) V K⁻¹: \\(\\Delta S^\\circ\\)?", answer: "\\(-96.5\\) J K⁻¹ mol⁻¹" },
        { prompt: "More negative \\(\\Delta G^\\circ\\): \\(n=1,\\,E^\\circ=1.0\\) V or \\(n=2,\\,E^\\circ=0.6\\) V?", answer: "\\(n=2,\\,E^\\circ=0.6\\) V", method: "\\(nE^\\circ\\) is 1.2 against 1.0." },
        { prompt: "\\(\\Delta_fG^\\circ\\) of \\(\\mathrm{H^+(aq)}\\)?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "8bc98640-24fe-4f7f-8bee-43060eaa08ad", // 2026 — methanol fuel cell at 80% efficiency compresses a gas; find ΔV
      traps: [
        {
          title: "Work as charge divided by potential",
          body: "Electrical work is \\(Q\\times E\\), in joules. A statement that puts \\(E\\) in the denominator is the incorrect one.",
        },
        {
          title: "Joules against kilojoules",
          body: "\\(nFE\\) comes out in joules. A blank asking for kJ mol⁻¹ needs a division by 1000 first.",
        },
      ],
    },

    // C2 — combining potentials
    {
      kind: "formula" as const,
      slug: "jcelec-combine",
      name: "Combining electrode potentials",
      intuition:
        "Potentials do not add, but Gibbs energies do. To get a new \\(E^\\circ\\), turn each known step into \\(\\Delta G^\\circ=-nFE^\\circ\\), add or subtract the steps, and divide by the new \\(n\\).",
      definition:
        "- If step 3 = step 1 − step 2: \\(n_3E^\\circ_3=n_1E^\\circ_1-n_2E^\\circ_2\\).\n" +
        "- Example: \\(E^\\circ(\\mathrm{Fe^{3+}/Fe^{2+}})=3E^\\circ(\\mathrm{Fe^{3+}/Fe})-2E^\\circ(\\mathrm{Fe^{2+}/Fe})\\).\n" +
        "- Latimer diagram (steps in series): \\(E^\\circ=\\frac{\\sum n_iE^\\circ_i}{\\sum n_i}\\).\n" +
        "- Insoluble-salt electrode: \\(\\mathrm{MX(s)+e^-\\to M(s)+X^-}\\) is \\(\\mathrm{M^++e^-\\to M}\\) plus \\(\\mathrm{MX\\to M^++X^-}\\). So \\(E^\\circ(\\mathrm{X^-/MX/M})=E^\\circ(\\mathrm{M^+/M})+0.059\\log K_{sp}\\).\n" +
        "- Two half-reactions combined into a FULL cell reaction are the one exception: there \\(E^\\circ_{cell}=E^\\circ_{cathode}-E^\\circ_{anode}\\), because the electrons cancel.",
      formula: {
        label: "Combining two steps",
        latex: "n_3E^\\circ_3=n_1E^\\circ_1\\pm n_2E^\\circ_2",
      },
      authoredExample: {
        prompt:
          "\\(E^\\circ(\\mathrm{Cu^{2+}/Cu})=0.34\\) V and \\(E^\\circ(\\mathrm{Cu^+/Cu})=0.52\\) V. Find \\(E^\\circ(\\mathrm{Cu^{2+}/Cu^+})\\).",
        steps: [
          "\\(\\mathrm{Cu^{2+}+2e^-\\to Cu}\\): \\(\\Delta G^\\circ_1=-2F(0.34)\\).",
          "\\(\\mathrm{Cu^++e^-\\to Cu}\\): \\(\\Delta G^\\circ_2=-1F(0.52)\\).",
          "Step 1 minus step 2 is \\(\\mathrm{Cu^{2+}+e^-\\to Cu^+}\\): \\(\\Delta G^\\circ_3=-0.68F+0.52F=-0.16F\\).",
          "With \\(n=1\\): \\(E^\\circ_3=0.16\\) V.",
        ],
        answer: "\\(0.16\\) V.",
      },
      selfCheckExample: {
        prompt:
          "Latimer diagram in acid: \\(\\mathrm{MnO_4^-}\\xrightarrow{0.56\\,V}\\mathrm{MnO_4^{2-}}\\xrightarrow{2.26\\,V}\\mathrm{MnO_2}\\). Find \\(E^\\circ(\\mathrm{MnO_4^-/MnO_2})\\).",
        steps: [
          "Mn goes +7 to +6 (1 electron), then +6 to +4 (2 electrons).",
          "\\(E^\\circ=\\frac{1(0.56)+2(2.26)}{1+2}=\\frac{5.08}{3}\\).",
        ],
        answer: "\\(\\approx1.69\\) V.",
      },
      practiceSet: [
        { prompt: "\\(E^\\circ(\\mathrm{Fe^{2+}/Fe})=-0.44\\) V, \\(E^\\circ(\\mathrm{Fe^{3+}/Fe})=-0.04\\) V. \\(E^\\circ(\\mathrm{Fe^{3+}/Fe^{2+}})\\)?", answer: "\\(0.76\\) V", method: "\\(3(-0.04)-2(-0.44)\\)." },
        { prompt: "\\(\\mathrm{A}\\xrightarrow{1.0\\,V,\\ 1e^-}\\mathrm{B}\\xrightarrow{0.4\\,V,\\ 2e^-}\\mathrm{C}\\). \\(E^\\circ(\\mathrm{A/C})\\)?", answer: "\\(0.60\\) V" },
        { prompt: "\\(E^\\circ(\\mathrm{M^+/M})=0.80\\) V, \\(K_{sp}(\\mathrm{MX})=10^{-8}\\). \\(E^\\circ(\\mathrm{X^-/MX/M})\\)?", answer: "\\(\\approx0.33\\) V", method: "\\(0.80+0.059\\times(-8)\\)." },
        { prompt: "Why can you not add two \\(E^\\circ\\) values for a new half-reaction?", answer: "\\(E^\\circ\\) is intensive; only \\(\\Delta G^\\circ\\) adds" },
      ],
      pyqExampleId: "0027568a-3bb6-4bbf-9d98-65d8c712b3e4", // 2026 — E°(Fe³⁺/Fe²⁺) from X and Y
      traps: [
        {
          title: "Subtracting potentials directly",
          body: "\\(E^\\circ(\\mathrm{Fe^{3+}/Fe})-E^\\circ(\\mathrm{Fe^{2+}/Fe})\\) is not \\(E^\\circ(\\mathrm{Fe^{3+}/Fe^{2+}})\\). Weight each potential by its electrons first.",
        },
        {
          title: "Averaging a Latimer diagram",
          body: "Two steps of 1 and 2 electrons are not averaged 50:50. Divide the electron-weighted sum by the TOTAL electrons.",
        },
      ],
    },
  ],
};
