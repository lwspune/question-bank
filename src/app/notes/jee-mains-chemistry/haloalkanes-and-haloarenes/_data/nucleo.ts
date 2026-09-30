import type { SubtopicNote } from "@/app/notes/_types";

export const NUCLEO_HALO_NOTE: SubtopicNote = {
  subtopicName: "Nucleophiles and Ambident Reagents",
  title: "Nucleophiles and Ambident Reagents",
  oneLineDefinition:
    "A nucleophile is stronger when it is charged, when it is the stronger base among donors of the same atom, and, in a protic solvent, when its donor atom is larger; cyanide and nitrite are ambident, so the potassium and silver salts give different products.",
  whyItMatters:
    "Thirteen PYQs, all multiple choice, two from 2026. Five rank nucleophiles or ask how a nucleophile changes a rate or a product; eight turn on an ambident nucleophile, cyanide or nitrite, and on whether its potassium or its silver salt was used.",
  concepts: [
    // C1 — nucleophilicity
    {
      kind: "formula" as const,
      slug: "jchalo-nucleophilicity",
      name: "Ranking nucleophiles: charge, basicity, size and solvent",
      intuition:
        "A nucleophile gives a lone pair to carbon, so the more available that lone pair, the stronger it is. Apply three checks in order. A charged species beats its neutral form. Among donors of the same atom, the stronger base is the better nucleophile. Going down a group in a protic solvent, the larger atom wins, because small anions are held tightly by hydrogen bonds.",
      definition:
        "- **Charge**: \\(\\mathrm{OH^- > H_2O}\\), \\(\\mathrm{RO^- > ROH}\\), \\(\\mathrm{NH_2^- > NH_3}\\), \\(\\mathrm{RS^- > RSH}\\).\n" +
        "- **Same donor atom, follow basicity**: \\(\\mathrm{RO^- > C_6H_5O^- > CH_3COO^-}\\). Resonance spreads the charge of phenoxide and acetate and makes the lone pair less available.\n" +
        "- **Protic solvent (water, alcohols)**: nucleophilicity rises down a group: \\(\\mathrm{I^- > Br^- > Cl^- > F^-}\\) and \\(\\mathrm{HS^- > HO^-}\\). The small fluoride ion is caged by hydrogen bonds.\n" +
        "- **Polar aprotic solvent (DMSO, DMF, acetone)**: anions are not caged, and the order follows basicity: \\(\\mathrm{F^- > Cl^- > Br^- > I^-}\\).\n" +
        "- \\(\\mathrm{I^-}\\) speeds up the hydrolysis of an alkyl chloride: it displaces chloride quickly and then leaves quickly, being both a good nucleophile and a good leaving group.\n" +
        "- A bulky base such as \\(\\mathrm{(CH_3)_3CO^-}\\) is strong but a poor nucleophile; it removes protons instead.",
      formula: {
        label: "Halide nucleophilicity in protic and in aprotic solvents",
        latex:
          "\\text{protic: } \\mathrm{I^- > Br^- > Cl^- > F^-} \\qquad \\text{aprotic: } \\mathrm{F^- > Cl^- > Br^- > I^-}",
      },
      authoredExample: {
        prompt: "Arrange for reaction with \\(\\mathrm{CH_3CH_2CH_2Br}\\) in water: \\(\\mathrm{HS^-}\\), \\(\\mathrm{OH^-}\\), \\(\\mathrm{CH_3COO^-}\\), \\(\\mathrm{H_2O}\\).",
        steps: [
          "Charge: water is the only neutral species, so it is last.",
          "\\(\\mathrm{HS^-}\\) against \\(\\mathrm{OH^-}\\): different atoms in the same group, protic solvent, so the larger S wins.",
          "\\(\\mathrm{OH^-}\\) against \\(\\mathrm{CH_3COO^-}\\): both attack through O, so follow basicity. The acetate charge is spread over two oxygens, so it is the weaker base.",
        ],
        answer: "\\(\\mathrm{HS^- > OH^- > CH_3COO^- > H_2O}\\)",
      },
      selfCheckExample: {
        prompt: "Which is the better nucleophile in water, \\(\\mathrm{Cl^-}\\) or \\(\\mathrm{Br^-}\\)? Which is better in DMF?",
        steps: [
          "In water the smaller \\(\\mathrm{Cl^-}\\) is held more tightly by hydrogen bonds, so the larger \\(\\mathrm{Br^-}\\) reacts faster.",
          "DMF does not hydrogen-bond to anions, so the stronger base, \\(\\mathrm{Cl^-}\\), is the better nucleophile.",
        ],
        answer: "\\(\\mathrm{Br^-}\\) in water; \\(\\mathrm{Cl^-}\\) in DMF.",
      },
      practiceSet: [
        { prompt: "Which is the better nucleophile: \\(\\mathrm{CH_3S^-}\\) or \\(\\mathrm{CH_3SH}\\)?", answer: "\\(\\mathrm{CH_3S^-}\\)" },
        { prompt: "Which is the better nucleophile: \\(\\mathrm{C_2H_5O^-}\\) or \\(\\mathrm{CH_3COO^-}\\)?", answer: "\\(\\mathrm{C_2H_5O^-}\\)" },
        { prompt: "Why does a little NaI speed up the hydrolysis of \\(\\mathrm{CH_3CH_2CH_2Cl}\\)?", answer: "\\(\\mathrm{I^-}\\) replaces Cl quickly and is then replaced by water quickly" },
        { prompt: "Which is the better nucleophile in water: \\(\\mathrm{H_2S}\\) or \\(\\mathrm{H_2O}\\)?", answer: "\\(\\mathrm{H_2S}\\)" },
      ],
      pyqExampleId: "2971ffc3-0714-4688-954f-228bc210c7b1", // 2026 — four nucleophiles with CH3Br in methanol
      traps: [
        {
          title: "The solvent reverses the halide order",
          body: "In water or an alcohol, iodide is the best halide nucleophile and fluoride the worst. In DMSO or DMF the order follows basicity and fluoride is the best. Check the solvent before ranking.",
        },
        {
          title: "Basicity ranks only donors of the same atom",
          body: "Hydroxide is a stronger base than hydrogen sulfide ion, yet \\(\\mathrm{HS^-}\\) is the better nucleophile in water. Use basicity to compare two oxygen nucleophiles, not an oxygen with a sulfur.",
        },
        {
          title: "A strong base can be a poor nucleophile",
          body: "Potassium tert-butoxide is too bulky to reach a carbon from behind. It takes a β-hydrogen instead and gives an alkene.",
        },
      ],
    },

    // C2 — ambident nucleophiles and the reagent table
    {
      kind: "reference" as const,
      slug: "jchalo-ambident",
      name: "Ambident nucleophiles and the reagent-to-product table",
      intuition:
        "Cyanide and nitrite each have two atoms that can attack carbon, so they are called ambident. The metal decides which atom is free to attack. A potassium salt gives a free anion, which attacks through carbon (cyanide) or oxygen (nitrite). In a silver salt the metal holds one end, so both silver salts bond through nitrogen.",
      definition:
        "- **KCN** (alcoholic) → nitrile, \\(\\mathrm{R{-}C{\\equiv}N}\\). **AgCN** → isocyanide, \\(\\mathrm{R{-}N{\\equiv}C}\\). KCN is largely ionic; AgCN is largely covalent.\n" +
        "- **KNO₂** → alkyl nitrite, \\(\\mathrm{R{-}O{-}N{=}O}\\). **AgNO₂** → nitroalkane, \\(\\mathrm{R{-}NO_2}\\).\n" +
        "- A carboxylate is not ambident: its two oxygens are equivalent. Silver carboxylates give esters.\n" +
        "- In a molecule with a ring halogen and a benzylic \\(\\mathrm{CH_2Cl}\\), only the \\(\\mathrm{CH_2Cl}\\) reacts; the aryl C–X bonds are untouched.",
      table: {
        columns: ["Reagent with R–X", "Attacking atom", "Product", "Class of product"],
        rows: [
          { cells: ["Aqueous NaOH or KOH", "O", "\\(\\mathrm{R{-}OH}\\)", "Alcohol"] },
          { cells: ["\\(\\mathrm{NaOR'}\\)", "O", "\\(\\mathrm{R{-}O{-}R'}\\)", "Ether (Williamson synthesis)"] },
          { cells: ["NaI in acetone", "I", "\\(\\mathrm{R{-}I}\\)", "Alkyl iodide"] },
          { cells: ["\\(\\mathrm{NH_3}\\)", "N", "\\(\\mathrm{R{-}NH_2}\\), then further alkylation", "Amine"] },
          { cells: ["KCN (alcoholic)", "C", "\\(\\mathrm{R{-}C{\\equiv}N}\\)", "Nitrile (alkyl cyanide)"] },
          { cells: ["AgCN", "N", "\\(\\mathrm{R{-}N{\\equiv}C}\\)", "Isocyanide (isonitrile)"] },
          { cells: ["\\(\\mathrm{KNO_2}\\)", "O", "\\(\\mathrm{R{-}O{-}N{=}O}\\)", "Alkyl nitrite"] },
          { cells: ["\\(\\mathrm{AgNO_2}\\)", "N", "\\(\\mathrm{R{-}NO_2}\\)", "Nitroalkane"] },
          { cells: ["\\(\\mathrm{R'COOAg}\\)", "O", "\\(\\mathrm{R'COOR}\\)", "Ester"] },
          { cells: ["\\(\\mathrm{LiAlH_4}\\)", "H (hydride)", "\\(\\mathrm{R{-}H}\\)", "Alkane"] },
        ],
        caption: "Both silver salts bond through nitrogen: AgCN gives the isocyanide and AgNO₂ the nitroalkane.",
      },
      selfCheckExample: {
        prompt: "Ethyl iodide is treated separately with \\(\\mathrm{KNO_2}\\) and with AgCN. Give the two products.",
        steps: [
          "\\(\\mathrm{KNO_2}\\) gives the free nitrite ion, which attacks through oxygen: ethyl nitrite.",
          "In AgCN the carbon end is held by silver, so nitrogen attacks: ethyl isocyanide.",
        ],
        answer: "\\(\\mathrm{CH_3CH_2{-}O{-}N{=}O}\\) (ethyl nitrite) and \\(\\mathrm{CH_3CH_2{-}N{\\equiv}C}\\) (ethyl isocyanide)",
      },
      practiceSet: [
        { prompt: "Is the acetate ion an ambident nucleophile?", answer: "No: its two oxygens are equivalent" },
        { prompt: "What does 2-bromobutane give with alcoholic KCN?", answer: "2-Methylbutanenitrile" },
        { prompt: "What does \\(\\mathrm{CH_3Br}\\) give with \\(\\mathrm{AgNO_2}\\)?", answer: "Nitromethane, \\(\\mathrm{CH_3NO_2}\\)" },
        { prompt: "Which nitrite salt converts an alkyl halide into an alkyl nitrite?", answer: "\\(\\mathrm{KNO_2}\\) (or \\(\\mathrm{NaNO_2}\\))" },
      ],
      pyqExampleId: "12553227-c59e-49bd-8d46-3267de388073", // 2023 — 1-bromopropane with four reagents
      traps: [
        {
          title: "Potassium nitrite gives the nitrite, silver nitrite the nitro compound",
          body: "\\(\\mathrm{KNO_2}\\) → \\(\\mathrm{R{-}O{-}N{=}O}\\) and \\(\\mathrm{AgNO_2}\\) → \\(\\mathrm{R{-}NO_2}\\). This pair is easy to swap; remember that both silver salts bond through nitrogen.",
        },
        {
          title: "AgCN is not ionic",
          body: "KCN is largely ionic, which leaves carbon free to attack. AgCN is largely covalent, which is why it gives the isocyanide. A reason stating that both salts are highly ionic is false.",
        },
        {
          title: "Aryl halogens survive while the side chain reacts",
          body: "When a benzene ring carries both ring halogens and a \\(\\mathrm{CH_2Cl}\\) group, a nucleophile such as cyanide replaces only the benzylic chlorine. Aryl C–X bonds do not undergo ordinary substitution.",
        },
      ],
    },
  ],
};
