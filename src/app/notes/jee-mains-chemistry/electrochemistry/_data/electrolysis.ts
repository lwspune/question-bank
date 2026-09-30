import type { SubtopicNote } from "@/app/notes/_types";

export const ELECTROLYSIS_ELEC_NOTE: SubtopicNote = {
  subtopicName: "Electrolysis and Faraday's Laws",
  title: "Electrolysis and Faraday's Laws",
  oneLineDefinition:
    "How much substance a given charge deposits or releases, and which product actually forms at each electrode when water competes with the ions.",
  whyItMatters:
    "Nineteen PYQs, fourteen of them numerical, and one from 2026. Fifteen turn a current and a time into a mass, a gas volume or a number of faradays, or run that backwards; four ask which product forms at each electrode. Two ideas cover the page.",
  concepts: [
    // C1 — Faraday's laws
    {
      kind: "formula" as const,
      slug: "jcelec-faraday",
      name: "Faraday's laws of electrolysis",
      intuition:
        "One faraday is one mole of electrons. Count the moles of electrons that flowed, divide by the electrons each particle needs, and you have the moles deposited or released.",
      definition:
        "- Charge \\(Q=It\\), with \\(t\\) in seconds. Moles of electrons \\(=\\frac{Q}{F}\\), \\(F=96500\\) C mol⁻¹.\n" +
        "- Mass deposited \\(m=\\frac{M\\,It}{nF}\\), where \\(n\\) is the electrons per particle.\n" +
        "- \\(n\\) per mole: \\(\\mathrm{Ag^+}\\) 1, \\(\\mathrm{Cu^{2+}}\\) 2, \\(\\mathrm{Ni^{2+}}\\) 2, \\(\\mathrm{Al^{3+}}\\) 3, Au in \\(\\mathrm{AuCl_4^-}\\) 3, \\(\\mathrm{MnO_4^-\\to Mn^{2+}}\\) 5, \\(\\mathrm{Cr_2O_7^{2-}\\to 2Cr^{3+}}\\) 6.\n" +
        "- Gases: \\(\\mathrm{O_2}\\) needs 4 electrons, \\(\\mathrm{H_2}\\) and \\(\\mathrm{Cl_2}\\) need 2. One mole of water oxidised to \\(\\mathrm{O_2}\\) gives 2 moles of electrons.\n" +
        "- Use the molar volume the question gives: 22.4 L or 22.7 L.\n" +
        "- Second law: the same charge through cells in series gives masses in the ratio of \\(\\frac{M}{n}\\).\n" +
        "- Electrochemical equivalent \\(Z=\\frac{M}{nF}\\), the mass deposited by 1 C.\n" +
        "- Plating a layer: mass \\(=\\) density \\(\\times\\) area \\(\\times\\) thickness.",
      formula: {
        label: "Faraday's first law",
        latex: "m=\\frac{M\\,I\\,t}{n\\,F}",
        symbols: [
          { symbol: "M", meaning: "molar mass of the substance" },
          { symbol: "n", meaning: "electrons needed per particle" },
          { symbol: "F", meaning: "96500 C per mole of electrons" },
        ],
      },
      authoredExample: {
        prompt:
          "A current of 1.93 A is passed through \\(\\mathrm{CuSO_4}\\) solution for 50 minutes. What mass of copper is deposited? (\\(M=63.5\\) g mol⁻¹)",
        steps: [
          "\\(Q=1.93\\times3000=5790\\) C.",
          "Moles of electrons \\(=\\frac{5790}{96500}=0.06\\).",
          "\\(\\mathrm{Cu^{2+}+2e^-\\to Cu}\\), so copper \\(=0.03\\) mol.",
          "Mass \\(=0.03\\times63.5=1.905\\) g.",
        ],
        answer: "\\(\\approx1.91\\) g of copper.",
      },
      selfCheckExample: {
        prompt:
          "Dilute \\(\\mathrm{H_2SO_4}\\) is electrolysed with 0.5 A for 64 min 20 s. What total volume of gas forms at STP (22.4 L mol⁻¹)?",
        steps: [
          "\\(t=3860\\) s, so \\(Q=0.5\\times3860=1930\\) C \\(=0.02\\) F.",
          "\\(\\mathrm{H_2}\\): \\(0.02/2=0.01\\) mol \\(=224\\) mL.",
          "\\(\\mathrm{O_2}\\): \\(0.02/4=0.005\\) mol \\(=112\\) mL.",
        ],
        answer: "\\(336\\) mL.",
      },
      practiceSet: [
        { prompt: "Faradays to reduce 1 mol of \\(\\mathrm{Cr_2O_7^{2-}}\\) to \\(\\mathrm{Cr^{3+}}\\)?", answer: "\\(6\\)" },
        { prompt: "Charge to deposit 1 mol of Al?", answer: "\\(3\\) F \\(=289\\,500\\) C" },
        { prompt: "Mass of Ag (108 g mol⁻¹) deposited by 9650 C?", answer: "\\(10.8\\) g" },
        { prompt: "The same charge through \\(\\mathrm{CuSO_4}\\) in series: mass of Cu (63.5)?", answer: "\\(3.175\\) g" },
        { prompt: "Electrochemical equivalent of silver?", answer: "\\(\\approx1.12\\times10^{-3}\\) g C⁻¹", method: "\\(108/96500\\)." },
      ],
      pyqExampleId: "de97d51c-2ef3-4d3a-b287-ef256ffa42e1", // 2026 — O₂ volume while Cu²⁺ deposits and after it runs out
      traps: [
        {
          title: "Four electrons for oxygen",
          body: "\\(\\mathrm{2H_2O\\to O_2+4H^++4e^-}\\). One mole of \\(\\mathrm{O_2}\\) needs 4 F, not 2 F.",
        },
        {
          title: "Minutes left as minutes",
          body: "Charge is \\(I\\times t\\) with \\(t\\) in seconds. Convert minutes and hours before multiplying.",
        },
        {
          title: "The charge on a complex ion's metal",
          body: "Gold in \\(\\mathrm{AuCl_4^-}\\) is +3, so each Au atom needs 3 electrons. Read the metal's oxidation state, not the ion's charge.",
        },
      ],
    },

    // C2 — what forms at each electrode
    {
      kind: "reference" as const,
      slug: "jcelec-products",
      name: "Products of electrolysis",
      intuition:
        "In water, every ion must compete with water itself. At the cathode the species with the higher reduction potential is reduced. At the anode the easiest oxidation wins, and an active metal anode can dissolve before anything else.",
      definition:
        "- **Cathode**: metal ions above hydrogen in the series (\\(\\mathrm{Ag^+}\\), \\(\\mathrm{Hg_2^{2+}}\\), \\(\\mathrm{Cu^{2+}}\\)) are deposited, the highest \\(E^\\circ\\) first. \\(\\mathrm{Na^+}\\), \\(\\mathrm{K^+}\\), \\(\\mathrm{Mg^{2+}}\\) and \\(\\mathrm{Al^{3+}}\\) are never deposited from water: \\(\\mathrm{H_2}\\) forms instead, and \\(\\mathrm{OH^-}\\) is left behind.\n" +
        "- **Anode, inert (Pt)**: \\(\\mathrm{Cl^-}\\) gives \\(\\mathrm{Cl_2}\\), because oxygen needs an extra overpotential. \\(\\mathrm{NO_3^-}\\) and dilute \\(\\mathrm{SO_4^{2-}}\\) are not oxidised: water gives \\(\\mathrm{O_2}\\). Concentrated \\(\\mathrm{H_2SO_4}\\) gives \\(\\mathrm{S_2O_8^{2-}}\\).\n" +
        "- **Anode, active (Ag, Cu)**: the anode metal itself dissolves; no gas forms.\n" +
        "- Oxygen can form only at an anode, never at a cathode.\n" +
        "- Brine: \\(\\mathrm{Cl_2}\\) at the anode, \\(\\mathrm{H_2}\\) and \\(\\mathrm{OH^-}\\) at the cathode, so the pH rises. Moles of \\(\\mathrm{OH^-}\\) formed equal moles of electrons passed.\n" +
        "- Once a metal ion is used up, water takes over at the cathode (\\(\\mathrm{H_2}\\)) while \\(\\mathrm{O_2}\\) keeps forming at the anode.",
      table: {
        columns: ["Electrolyte", "Electrodes", "Cathode", "Anode"],
        rows: [
          { cells: ["Molten NaCl", "Inert", "Na", "\\(\\mathrm{Cl_2}\\)"] },
          { cells: ["Aqueous NaCl (brine)", "Inert", "\\(\\mathrm{H_2}\\), with \\(\\mathrm{OH^-}\\) left in solution", "\\(\\mathrm{Cl_2}\\)"] },
          { cells: ["Aqueous \\(\\mathrm{AgNO_3}\\)", "Pt", "Ag", "\\(\\mathrm{O_2}\\)"] },
          { cells: ["Aqueous \\(\\mathrm{AgNO_3}\\)", "Ag", "Ag", "Ag dissolves as \\(\\mathrm{Ag^+}\\)"] },
          { cells: ["Aqueous \\(\\mathrm{CuSO_4}\\)", "Pt", "Cu", "\\(\\mathrm{O_2}\\)"] },
          { cells: ["Aqueous \\(\\mathrm{CuSO_4}\\)", "Cu", "Cu", "Cu dissolves as \\(\\mathrm{Cu^{2+}}\\)"] },
          { cells: ["Dilute \\(\\mathrm{H_2SO_4}\\)", "Pt", "\\(\\mathrm{H_2}\\)", "\\(\\mathrm{O_2}\\)"] },
          { cells: ["Concentrated \\(\\mathrm{H_2SO_4}\\)", "Pt", "\\(\\mathrm{H_2}\\)", "\\(\\mathrm{S_2O_8^{2-}}\\)"] },
        ],
        caption: "An active anode dissolves; an inert anode oxidises an anion or water.",
      },
      selfCheckExample: {
        prompt:
          "500 mL of brine is electrolysed for 965 s, and its pH rises to 13. What current was used? (Ignore any change in volume.)",
        steps: [
          "pH 13 means \\([\\mathrm{OH^-}]=0.1\\) M, so \\(0.1\\times0.5=0.05\\) mol \\(\\mathrm{OH^-}\\).",
          "Each electron at the cathode leaves one \\(\\mathrm{OH^-}\\): \\(\\mathrm{2H_2O+2e^-\\to H_2+2OH^-}\\). So 0.05 F passed.",
          "\\(Q=0.05\\times96500=4825\\) C, and \\(I=\\frac{4825}{965}=5\\) A.",
        ],
        answer: "\\(5\\) A.",
      },
      practiceSet: [
        { prompt: "1 M each of \\(\\mathrm{Ag^+}\\), \\(\\mathrm{Hg_2^{2+}}\\), \\(\\mathrm{Cu^{2+}}\\), \\(\\mathrm{Mg^{2+}}\\), inert electrodes: order of deposition?", answer: "Ag, then Hg, then Cu; Mg never" },
        { prompt: "Anode product, dilute \\(\\mathrm{H_2SO_4}\\) with Pt?", answer: "\\(\\mathrm{O_2}\\)" },
        { prompt: "Anode product, concentrated \\(\\mathrm{H_2SO_4}\\) with Pt?", answer: "\\(\\mathrm{S_2O_8^{2-}}\\)" },
        { prompt: "Does \\(\\mathrm{O_2}\\) form when \\(\\mathrm{AgNO_3}\\) is electrolysed with silver electrodes?", answer: "No; the silver anode dissolves" },
        { prompt: "pH of brine during electrolysis?", answer: "Rises" },
      ],
      pyqExampleId: "1c3cab75-3008-411c-9bbd-1fd4a2b5005a", // 2025 — which electrolyses give O₂
      traps: [
        {
          title: "Depositing sodium from water",
          body: "Water is reduced long before \\(\\mathrm{Na^+}\\) or \\(\\mathrm{Mg^{2+}}\\). From an aqueous solution the cathode gives \\(\\mathrm{H_2}\\), never the metal.",
        },
        {
          title: "Forgetting an active anode",
          body: "With silver or copper electrodes, the anode metal dissolves. An option that gives \\(\\mathrm{O_2}\\) there is wrong.",
        },
      ],
    },
  ],
};
