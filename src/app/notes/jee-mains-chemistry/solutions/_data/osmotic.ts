import type { SubtopicNote } from "@/app/notes/_types";

export const OSMOTIC_SOL_NOTE: SubtopicNote = {
  subtopicName: "Osmosis and Osmotic Pressure",
  title: "Osmosis and Osmotic Pressure",
  oneLineDefinition:
    "Solvent flows through a semipermeable membrane into the more concentrated solution, and the pressure that stops it is the osmotic pressure, π = iCRT.",
  whyItMatters:
    "Nineteen PYQs, thirteen of them numeric, and six from 2026, more than any other page. Eleven use π = iCRT for a pressure or a molar mass, often of a protein or polymer; four match isotonic solutions by particle count; four ask which way the solvent flows and what can cross the membrane.",
  concepts: [
    // C1 — π = iCRT
    {
      kind: "formula" as const,
      slug: "jcsol-osmotic-pressure",
      name: "Osmotic pressure, π = iCRT",
      intuition:
        "Osmotic pressure behaves like the pressure of an ideal gas made of the solute particles: moles per litre times \\(RT\\). Because it is large even for tiny concentrations, it is the colligative property used to find the molar mass of a protein or a polymer at room temperature.",
      definition:
        "- \\(\\pi = iCRT\\), with \\(C\\) in mol per litre of SOLUTION and \\(i\\) the particles each formula unit gives (1 for a non-electrolyte, 2 for fully dissociated NaCl).\n" +
        "- Molar mass: \\(M = \\dfrac{wRT}{\\pi V}\\) (\\(V\\) in litres).\n" +
        "- Units: \\(R = 0.083\\) L bar/(K mol) \\(= 0.0821\\) L atm/(K mol) \\(= 8.314\\) kPa L/(K mol). \\(1\\) bar \\(= 10^5\\) Pa.\n" +
        "- A column of solution: \\(\\pi = h\\rho g\\) (in Pa with \\(h\\) in m, \\(\\rho\\) in kg/m³).\n" +
        "- Several solutes: add their particle concentrations.\n" +
        "- Same solution at a new temperature: \\(\\pi \\propto T\\).\n" +
        "- Mixing two solutions of the SAME concentration leaves the concentration, and so \\(\\pi\\), unchanged.",
      formula: {
        label: "Van 't Hoff equation for osmotic pressure",
        latex: "\\pi = iCRT \\qquad M = \\frac{wRT}{\\pi V} \\qquad \\pi = h\\rho g",
      },
      authoredExample: {
        prompt:
          "1.0 g of a protein in 200 mL of aqueous solution has an osmotic pressure of 2.0 mbar at 290 K. Find its molar mass (\\(R = 0.083\\) L bar/(K mol)).",
        steps: [
          "\\(\\pi = 2.0 \\times 10^{-3}\\) bar, \\(V = 0.2\\) L.",
          "\\(M = \\dfrac{wRT}{\\pi V} = \\dfrac{1.0 \\times 0.083 \\times 290}{2.0 \\times 10^{-3} \\times 0.2} = \\dfrac{24.07}{4.0 \\times 10^{-4}}\\).",
          "\\(M = 6.02 \\times 10^{4}\\) g/mol.",
        ],
        answer: "About \\(6.0 \\times 10^{4}\\) g/mol",
      },
      selfCheckExample: {
        prompt:
          "0.6 g of urea (M = 60) and 3.6 g of glucose (M = 180) are dissolved in water to make 500 mL of solution at 290 K. Find the osmotic pressure (\\(R = 0.083\\) L bar/(K mol)).",
        steps: [
          "Urea 0.01 mol and glucose 0.02 mol: 0.03 mol of particles in 0.5 L, so \\(C = 0.06\\) M.",
          "\\(\\pi = 0.06 \\times 0.083 \\times 290 = 1.44\\) bar.",
        ],
        answer: "About \\(1.44\\) bar",
      },
      practiceSet: [
        { prompt: "What is the osmotic pressure of 0.1 M glucose at 300 K (\\(R = 0.083\\) L bar/(K mol))?", answer: "\\(2.49\\) bar" },
        { prompt: "A solution has \\(\\pi = 5\\) bar at 250 K. What is its osmotic pressure at 300 K?", answer: "\\(6\\) bar" },
        { prompt: "Convert 400 Pa to bar.", answer: "\\(4 \\times 10^{-3}\\) bar" },
        { prompt: "A column of solution of density 1000 kg/m³ stands 0.102 m high (g = 9.8 m/s²). What osmotic pressure does it balance?", answer: "About \\(1000\\) Pa" },
      ],
      pyqExampleId: "4a7da43d-d584-4741-bc21-6debf6b659c4", // 2026 — haemoglobin, osmotic rise of a column
      traps: [
        {
          title: "Osmotic pressures do not add on mixing",
          body: "Mixing two solutions of the same concentration gives the same concentration, so the same \\(\\pi\\). Adding the two pressures doubles the answer; that doubled value is an option.",
        },
        {
          title: "Match R to the pressure unit",
          body: "With \\(R = 0.083\\) L bar/(K mol) the pressure must be in bar; with \\(R = 8.314\\) it comes out in kPa (litres) or Pa (cubic metres). Put a pressure in Pa into the bar form and the molar mass is off by \\(10^5\\).",
        },
        {
          title: "Litres of solution, not of solvent",
          body: "\\(C\\) is moles per litre of SOLUTION. For a dilute solution 'in 200 mL of water' the two are taken as equal, but the formula itself wants the solution's volume.",
        },
      ],
    },

    // C2 — isotonic solutions
    {
      kind: "formula" as const,
      slug: "jcsol-isotonic",
      name: "Isotonic solutions, equal iC",
      intuition:
        "At the same temperature, two solutions have the same osmotic pressure when they hold the same concentration of particles. So compare \\(iC\\), not \\(C\\): 0.1 M NaCl matches 0.2 M glucose, not 0.1 M glucose.",
      definition:
        "- Isotonic: \\(i_1 C_1 = i_2 C_2\\) at the same temperature.\n" +
        "- Ions per formula unit (complete dissociation): NaCl, KCl 2; \\(\\mathrm{CaCl_2}\\), \\(\\mathrm{BaCl_2}\\), \\(\\mathrm{K_2SO_4}\\), \\(\\mathrm{Na_2SO_4}\\) 3; \\(\\mathrm{AlCl_3}\\) 4; \\(\\mathrm{K_4[Fe(CN)_6]}\\) 5; \\(\\mathrm{Al_2(SO_4)_3}\\) 5.\n" +
        "- Double salts: Mohr's salt \\(\\mathrm{FeSO_4\\cdot(NH_4)_2SO_4\\cdot 6H_2O}\\) gives 5 ions; carnallite \\(\\mathrm{KCl\\cdot MgCl_2\\cdot 6H_2O}\\) gives 5. Water of crystallisation adds no particles.\n" +
        "- A solution isotonic with a cell or with blood has the same \\(\\pi\\): \\(C = \\dfrac{\\pi}{iRT}\\), then grams per litre \\(= C \\times M\\).\n" +
        "- A partly dissociated salt: \\(i\\) from the isotonic match, then \\(\\alpha = \\dfrac{i - 1}{n - 1}\\).",
      formula: {
        label: "Isotonic condition",
        latex: "i_1 C_1 = i_2 C_2",
      },
      authoredExample: {
        prompt:
          "A 0.12 M solution of \\(\\mathrm{K_2SO_4}\\) is fully dissociated. What molarity of glucose, and what molarity of \\(\\mathrm{AlCl_3}\\) (fully dissociated), is isotonic with it?",
        steps: [
          "\\(\\mathrm{K_2SO_4}\\): \\(i = 3\\), so \\(iC = 0.36\\) M of particles.",
          "Glucose (\\(i = 1\\)): 0.36 M.",
          "\\(\\mathrm{AlCl_3}\\) (\\(i = 4\\)): \\(0.36/4 = 0.09\\) M.",
        ],
        answer: "Glucose \\(0.36\\) M; \\(\\mathrm{AlCl_3}\\) \\(0.09\\) M.",
      },
      selfCheckExample: {
        prompt:
          "A 0.01 M solution of \\(\\mathrm{Na_2SO_4}\\) is isotonic with 0.026 M urea. Find the percent dissociation of \\(\\mathrm{Na_2SO_4}\\).",
        steps: [
          "\\(i \\times 0.01 = 1 \\times 0.026\\), so \\(i = 2.6\\).",
          "\\(\\mathrm{Na_2SO_4}\\) gives 3 ions: \\(\\alpha = \\dfrac{2.6 - 1}{3 - 1} = 0.8\\).",
        ],
        answer: "\\(80\\%\\)",
      },
      practiceSet: [
        { prompt: "How many ions does \\(\\mathrm{K_4[Fe(CN)_6]}\\) give on complete dissociation?", answer: "\\(5\\)" },
        { prompt: "How many ions does Mohr's salt give on complete dissociation?", answer: "\\(5\\)" },
        { prompt: "A 0.2 M NaCl solution is isotonic with what molarity of urea?", answer: "\\(0.4\\) M" },
        { prompt: "Isotonic solutions at the same temperature have equal values of what product?", answer: "\\(iC\\), so equal osmotic pressure" },
      ],
      pyqExampleId: "5e3ae129-5df0-4e05-9c53-5d06122c61ab", // 2026 — NaCl isotonic with a living cell
      traps: [
        {
          title: "Compare iC, not C",
          body: "0.1 M NaCl and 0.1 M glucose are not isotonic: the salt gives twice the particles. Always multiply each concentration by its ion count before comparing.",
        },
        {
          title: "Water of crystallisation is not a particle",
          body: "\\(\\mathrm{KCl\\cdot MgCl_2\\cdot 6H_2O}\\) gives \\(\\mathrm{K^+}\\), \\(\\mathrm{Mg^{2+}}\\) and three \\(\\mathrm{Cl^-}\\): 5 ions. The six water molecules join the solvent and add nothing.",
        },
      ],
    },

    // C3 — direction of flow and the membrane
    {
      kind: "reference" as const,
      slug: "jcsol-osmosis-direction",
      name: "Direction of osmosis and reverse osmosis",
      intuition:
        "A semipermeable membrane lets solvent through and holds solute back. The solvent moves to dilute the side with more particles. Push on that concentrated side with more than its osmotic pressure and the flow reverses.",
      definition:
        "- Solvent flows from lower \\(iC\\) (hypotonic) to higher \\(iC\\) (hypertonic).\n" +
        "- Ions and coloured species do not cross an ideal semipermeable membrane, so no reaction or colour appears on the other side.\n" +
        "- As solvent leaves the dilute side, its molarity rises; the concentrated side is diluted and its molarity falls.\n" +
        "- Reverse osmosis: pressure greater than \\(\\pi\\) on the CONCENTRATED side, through a true semipermeable membrane.",
      table: {
        columns: ["Situation", "What happens", "Why"],
        rows: [
          { cells: ["Two solutions across a semipermeable membrane", "Solvent flows from the side of lower iC to the side of higher iC", "It dilutes the side with more particles"] },
          { cells: ["Ions on either side of the membrane", "They stay on their own side; no precipitate or colour forms across it", "The membrane passes solvent only"], noteAmber: "'Blue colour forms on both sides' is the planted false option." },
          { cells: ["Naming the sides", "The side with higher iC is hypertonic, the other hypotonic", "It has the higher osmotic pressure"] },
          { cells: ["Concentrations as osmosis runs", "The concentrated side's molarity falls; the dilute side's rises", "Water leaves the dilute side and enters the concentrated side"] },
          { cells: ["Reverse osmosis", "Apply a pressure greater than π on the concentrated side", "Pure solvent is pushed back to the dilute side, as in desalination"] },
          { cells: ["Membrane for reverse osmosis", "Cellophane or parchment paper, not a porous partition", "A porous partition lets the solute through as well"] },
        ],
        caption: "The membrane decides what moves (solvent only); the particle count decides which way.",
      },
      selfCheckExample: {
        prompt: "0.1 M NaCl (fully dissociated) and 0.15 M glucose are separated by a semipermeable membrane. Which way does water flow?",
        steps: [
          "NaCl: \\(iC = 0.2\\) M. Glucose: \\(iC = 0.15\\) M.",
          "Water flows towards the higher particle concentration.",
        ],
        answer: "From the glucose side into the NaCl side.",
      },
      practiceSet: [
        { prompt: "Can \\(\\mathrm{Na^+}\\) ions cross an ideal semipermeable membrane?", answer: "No" },
        { prompt: "On which side is pressure applied for reverse osmosis?", answer: "The concentrated side" },
        { prompt: "Which is hypotonic: 0.1 M urea or 0.1 M KCl?", answer: "0.1 M urea" },
        { prompt: "Is parchment paper suitable as a membrane for reverse osmosis?", answer: "Yes; it is semipermeable" },
      ],
      pyqExampleId: "4b094849-a9f5-4f49-9efc-8001f4fc08a7", // 2026 — glucose in two chambers, K2SO4 osmotic pressure
      traps: [
        {
          title: "Solvent flows towards the concentrated side",
          body: "Osmosis moves solvent from the hypotonic to the hypertonic solution, never the other way. A statement that osmosis runs from hypertonic to hypotonic is false.",
        },
        {
          title: "Reverse osmosis pushes on the concentrated side",
          body: "The applied pressure must exceed \\(\\pi\\) and act on the concentrated solution. Pressure on the dilute side only speeds up ordinary osmosis.",
        },
      ],
    },
  ],
};
