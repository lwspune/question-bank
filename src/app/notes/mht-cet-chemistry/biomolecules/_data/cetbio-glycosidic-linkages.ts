import type { SubtopicNote } from "@/app/notes/_types";

export const GLYCOSIDIC_LINKAGES_NOTE: SubtopicNote = {
  subtopicName: "Glycosidic Linkages in Di- and Polysaccharides",
  title: "Glycosidic Linkages in Di- and Polysaccharides",
  oneLineDefinition:
    "A glycosidic linkage is the C–O–C bridge formed when the anomeric OH of one sugar condenses with an OH of another: alpha-1,4 in maltose, amylose and the chains of amylopectin and glycogen, alpha-1,6 at their branch points, beta-1,4 in lactose and cellulose, and alpha-1,beta-2 between C-1 of glucose and C-2 of fructose in sucrose.",
  whyItMatters:
    "19 PYQs, one HARD. Thirteen are the disaccharides and oligosaccharides — the linkage in maltose (asked four times) and lactose (three), which carbons of glucose and fructose join in sucrose (three), invert sugar, how many moles of glucose each gives on hydrolysis, and which sugars contain galactose; six are the polysaccharides — the linkages in cellulose, amylose and amylopectin, what animals store, and the false statement about cellulose in animal cells. " +
    "Two cards.",
  concepts: [
    // 1 — disaccharides and oligosaccharides
    {
      kind: "reference" as const,
      slug: "cetbio-disaccharides-and-oligosaccharides",
      name: "Sucrose, Maltose, Lactose, Raffinose, Stachyose: the Linkage and the Hydrolysis Count",
      intuition:
        "Name the two monosaccharides, then the two carbons. Maltose is glucose–glucose through C-1 of one and C-4 of the other, alpha at the anomeric carbon: alpha-1,4. Lactose is galactose–glucose, beta-1,4. Sucrose is the odd one: C-1 of alpha-glucose to C-2 of beta-fructose, so BOTH anomeric carbons are used and no free hemiacetal is left — non-reducing, and no mutarotation. Hydrolysis counts follow from the units: maltose gives 2 glucose per mole, sucrose and lactose 1 each.",
      definition:
        "- **Maltose**: 2 alpha-D-glucose, **alpha-1,4**; reducing. Hydrolysis: **2 mol glucose** per mole — double what sucrose gives.\n" +
        "- **Lactose** (milk): beta-D-galactose + D-glucose, **beta-1,4**; reducing. Hydrolysis: 1 glucose + 1 galactose.\n" +
        "- **Sucrose**: **C-1 of alpha-D-glucose to C-2 of beta-D-fructose** (alpha-1,beta-2); **non-reducing**. Hydrolysis by dilute acid or invertase gives equimolar glucose + fructose = **invert sugar** (dextro +66.5° → laevo, because fructose's −92.4° outweighs glucose's +52.7°).\n" +
        "- **Raffinose** (trisaccharide): galactose + glucose + fructose. **Stachyose** (tetrasaccharide): 2 galactose + glucose + fructose. Both contain galactose; sucrose and maltose do not.\n" +
        "- Equal glucose per mole on hydrolysis: sucrose and lactose (1 each); raffinose and stachyose also give 1 glucose each.",
      table: {
        columns: ["Sugar", "Units", "Linkage", "Reducing?", "Glucose per mole"],
        rows: [
          { cells: ["Maltose", "Glucose + glucose", "alpha-1,4", "Yes", "2"] },
          { cells: ["Lactose", "Galactose + glucose", "beta-1,4", "Yes", "1"] },
          { cells: ["Sucrose", "Glucose + fructose", "C-1 (alpha-Glc) to C-2 (beta-Fru)", "No", "1"], noteAmber: "Both anomeric carbons are in the bond — hence non-reducing and invert sugar on hydrolysis." },
          { cells: ["Raffinose", "Gal + Glc + Fru", "Trisaccharide", "No", "1"] },
          { cells: ["Stachyose", "2 Gal + Glc + Fru", "Tetrasaccharide", "No", "1"] },
        ],
        caption: "Maltose is the only common disaccharide that gives two glucose per mole.",
      },
      selfCheckExample: {
        prompt: "n moles of which carbohydrate contain 2n moles of galactose, n of glucose and n of fructose: lactose, raffinose, amylose, stachyose?",
        steps: [
          "Two galactose per molecule with one glucose and one fructose is the tetrasaccharide.",
        ],
        answer: "Stachyose",
      },
      practiceSet: [
        { prompt: "Glycosidic linkage in maltose?", answer: "alpha-1,4" },
        { prompt: "Which carbons of alpha-glucose and beta-fructose join in sucrose?", answer: "C-1 and C-2" },
        { prompt: "Which gives invert sugar on hydrolysis?", answer: "Sucrose" },
        { prompt: "Pair both containing galactose: sucrose/stachyose, maltose/raffinose, raffinose/stachyose, lactose/maltose?", answer: "Raffinose and stachyose" },
      ],
      pyqExampleId: "1c860f7e-62b4-43da-ba66-9f49f4712fea",
      traps: [
        {
          title: "Lactose as the double-glucose sugar",
          body:
            "Lactose gives ONE glucose and one galactose. Only maltose gives two glucose per mole; the 'double quantity compared with sucrose' answer is maltose.",
        },
      ],
    },

    // 2 — polysaccharides
    {
      kind: "formula" as const,
      slug: "cetbio-polysaccharides",
      name: "Starch, Glycogen and Cellulose",
      intuition:
        "Three polymers of glucose, told apart by the anomer and the branching. Starch is plant storage: amylose, an unbranched alpha-1,4 chain, plus amylopectin, alpha-1,4 chains with alpha-1,6 branches. Glycogen is the same pattern, more branched, and it is how ANIMALS store excess glucose. Cellulose is beta-1,4, straight, hydrogen-bonded into fibres — the plant cell wall, and indigestible to us because we lack the enzyme for the beta link.",
      definition:
        "- **Amylose** (15–20% of starch): linear, **alpha-1,4** only.\n" +
        "- **Amylopectin** (80–85%): **alpha-1,4** chain, **alpha-1,6** at branch points.\n" +
        "- **Glycogen** (animal storage; liver, muscle): alpha-1,4 chain + alpha-1,6 branches, more branched than amylopectin. 'Excess glucose stored in animals' → **alpha-1,4 and alpha-1,6**.\n" +
        "- **Cellulose**: linear, **beta-1,4**, beta-D-glucose; plant cell wall — NOT animal cells (animals have no cell wall).\n" +
        "- Starch is the food-grain constituent; lactose is the milk sugar; glycogen is the animal reserve.",
      formula: {
        label: "Three glucose polymers",
        latex:
          "\\text{amylose: } \\alpha\\text{-1,4};\\quad \\text{amylopectin / glycogen: } \\alpha\\text{-1,4} + \\alpha\\text{-1,6};\\quad \\text{cellulose: } \\beta\\text{-1,4}",
      },
      authoredExample: {
        prompt: "A polysaccharide is hydrolysed only by an enzyme that cleaves beta-1,4 links, and it gives glucose alone. Identify it and say where it occurs.",
        steps: [
          "Beta-1,4 between glucose units is cellulose — the plant cell wall.",
        ],
        answer: "Cellulose; plant cell walls",
      },
      selfCheckExample: {
        prompt: "Which linkages form the chain and the branches of amylopectin, respectively?",
        steps: [
          "Chain alpha-1,4; branch alpha-1,6.",
        ],
        answer: "alpha-1,4 and alpha-1,6",
      },
      practiceSet: [
        { prompt: "Linkage in cellulose?", answer: "beta-1,4" },
        { prompt: "Linkage in amylose?", answer: "alpha-1,4 only" },
        { prompt: "Storage polysaccharide of animals?", answer: "Glycogen" },
        { prompt: "False: cellulose is a constituent of the cell wall in animal cells?", answer: "False — plant cells only" },
      ],
      pyqExampleId: "b56c1611-845b-45b8-bff3-866e81349e89",
      traps: [
        {
          title: "Amylose with a 1,6 branch",
          body:
            "Amylose is the UNBRANCHED half of starch — alpha-1,4 only. The option 'alpha-1,4 and alpha-1,6' describes amylopectin and glycogen.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Carbohydrates — the anomeric carbon that makes the linkage",
      href: "/notes/mht-cet-chemistry/biomolecules/cetbio-carbohydrates",
    },
    {
      label: "Lipids and Enzymes — the rest of the chapter",
      href: "/notes/mht-cet-chemistry/biomolecules/cetbio-lipids-and-enzymes",
    },
  ],
};
