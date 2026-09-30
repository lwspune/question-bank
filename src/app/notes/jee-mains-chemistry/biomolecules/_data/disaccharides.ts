import type { SubtopicNote } from "@/app/notes/_types";

export const DISACCHARIDES_BIO_NOTE: SubtopicNote = {
  subtopicName: "Disaccharides, Polysaccharides and Reducing Sugars",
  title: "Disaccharides, Polysaccharides and Reducing Sugars",
  oneLineDefinition:
    "A glycosidic link joins the anomeric carbon of one sugar to an OH of the next; a sugar still reduces Tollens' or Fehling's reagent only if some anomeric carbon keeps its free OH, which is why maltose and lactose reduce and sucrose does not; starch, glycogen and cellulose differ in the anomer and branching of their glucose chains.",
  whyItMatters:
    "Twenty-six PYQs, twenty-five multiple choice and one asking for a number, four from 2026. Thirteen name the units and the glycosidic link of sucrose, maltose or lactose, or explain why hydrolysed sucrose turns laevorotatory. Eight ask whether a sugar reduces Tollens', Fehling's or Benedict's reagent, often from a drawn structure. Five compare amylose, amylopectin, glycogen and cellulose by linkage, branching and source.",
  concepts: [
    // C1 — reducing or non-reducing
    {
      kind: "formula" as const,
      slug: "jcbio-reducing-sugars",
      name: "Reducing and non-reducing sugars",
      intuition:
        "A sugar reduces Tollens' or Fehling's reagent through its open chain, and a ring can open only at a hemiacetal: an anomeric carbon that still carries an OH. When a glycosidic link uses the anomeric carbon, that ring is locked as an acetal. So the test is one question: is any anomeric carbon still free?",
      definition:
        "- **Monosaccharides** (glucose, fructose, galactose, ribose, 2-deoxyribose) are all reducing.\n" +
        "- **Maltose** and **lactose** use the C-1 of one unit and the C-4 of the other. The second unit's C-1 is still a hemiacetal, so both are reducing.\n" +
        "- **Sucrose** links C-1 of glucose to C-2 of fructose. Both anomeric carbons are used, so sucrose is non-reducing.\n" +
        "- A **methyl glycoside** has its anomeric OH replaced by \\(\\mathrm{OCH_3}\\); it is an acetal and non-reducing.\n" +
        "- **Starch, amylose, glycogen and cellulose** have one reducing end in a chain of hundreds of units, too little to show: they give no Fehling's or Benedict's test.\n" +
        "- To judge a drawn structure, find each ring's anomeric carbon, the ring carbon bonded to two oxygens. If one of those oxygens is an OH, the sugar is reducing.",
      authoredExample: {
        prompt:
          "How many of these reduce Tollens' reagent: fructose, sucrose, lactose, cellulose, methyl α-D-glucoside, maltose, galactose?",
        steps: [
          "Fructose and galactose are monosaccharides: both reduce.",
          "Lactose and maltose keep one free anomeric C-1: both reduce.",
          "Sucrose uses both anomeric carbons in its link: it does not reduce.",
          "Methyl α-D-glucoside has its C-1 locked as an acetal, and cellulose is a polysaccharide: neither reduces.",
        ],
        answer: "Four: fructose, lactose, maltose and galactose.",
      },
      selfCheckExample: {
        prompt: "Two α-D-glucose units are joined through C-1 of one and C-1 of the other. Is the disaccharide reducing?",
        steps: [
          "The anomeric carbon of glucose is C-1.",
          "Here both C-1 atoms are in the glycosidic link, so neither ring has a free hemiacetal OH.",
          "Neither ring can open to a CHO group.",
        ],
        answer: "No, it is non-reducing, like sucrose.",
      },
      practiceSet: [
        { prompt: "Is lactose a reducing sugar?", answer: "Yes; the glucose unit's C-1 is free" },
        { prompt: "Does sucrose give a red precipitate with Fehling's solution?", answer: "No" },
        { prompt: "Is 2-deoxyribose a reducing sugar?", answer: "Yes, as every monosaccharide is" },
        { prompt: "Does amylose give an orange-red precipitate with Benedict's solution?", answer: "No" },
      ],
      pyqExampleId: "4b90c400-7930-4fc8-85aa-4da755029414", // 2023 — how many of seven sugars fail Benedict's
      traps: [
        {
          title: "A C-1 to C-4 link leaves one C-1 free",
          body: "In maltose the first glucose uses its C-1, but the second glucose uses only its C-4. Its own C-1 stays a hemiacetal, so maltose is reducing. A statement calling maltose non-reducing is false.",
        },
        {
          title: "Polysaccharides count as non-reducing",
          body: "Starch and amylose have a single reducing end on a very long chain, so they give no Benedict's or Fehling's precipitate. Count them with sucrose, not with glucose.",
        },
      ],
    },

    // C2 — disaccharide links
    {
      kind: "reference" as const,
      slug: "jcbio-disaccharide-links",
      name: "Glycosidic linkages in sucrose, maltose and lactose",
      intuition:
        "A glycosidic bond forms when the anomeric OH of one sugar condenses with an OH of another and water is lost. It is named by the anomer that used its C-1 and by the two carbons joined: maltose is α1–4, lactose β1–4, and sucrose α1–β2 because it joins two anomeric carbons.",
      definition:
        "- Hydrolysis of **sucrose** (cane sugar) gives equal amounts of D-(+)-glucose and D-(−)-fructose.\n" +
        "- Sucrose is dextrorotatory (about +66.5°). The hydrolysed mixture is laevorotatory, because the laevorotation of fructose (−92.4°) is larger than the dextrorotation of glucose (+52.5°). The sign changes, so the mixture is called **invert sugar**; the enzyme invertase does the same hydrolysis.\n" +
        "- Sucrose is made in plants from α-D-glucose and β-D-fructose; fructose is D-(−), never D-(+).\n" +
        "- **Maltose** (malt sugar) gives two α-D-glucose; **lactose** (milk sugar) gives β-D-galactose and β-D-glucose.\n" +
        "- A sugar that gives saccharic acid with nitric acid is glucose; its laevorotatory partner from a sugar hydrolysis is fructose, so the parent is sucrose.",
      table: {
        columns: ["Disaccharide", "Units on hydrolysis", "Glycosidic link", "Reducing?"],
        rows: [
          { cells: ["Sucrose (cane sugar)", "α-D-(+)-glucose and β-D-(−)-fructose", "C-1 of glucose to C-2 of fructose, α1–β2", "No"] },
          { cells: ["Maltose (malt sugar)", "Two α-D-glucose units", "C-1 of one glucose to C-4 of the next, α1–4", "Yes"] },
          { cells: ["Lactose (milk sugar)", "β-D-galactose and β-D-glucose", "C-1 of galactose to C-4 of glucose, β1–4", "Yes"] },
        ],
        caption: "Only sucrose joins two anomeric carbons, so only sucrose is non-reducing.",
      },
      selfCheckExample: {
        prompt: "Which disaccharide gives galactose on hydrolysis, and which carbon of the galactose unit is in the glycosidic link?",
        steps: [
          "Galactose comes only from lactose, the milk sugar.",
          "Lactose joins the anomeric C-1 of β-D-galactose to C-4 of glucose.",
        ],
        answer: "Lactose; C-1 of galactose (to C-4 of glucose).",
      },
      practiceSet: [
        { prompt: "What does hydrolysis of maltose give?", answer: "Two molecules of α-D-glucose" },
        { prompt: "Which sugar is called invert sugar?", answer: "The equimolar glucose–fructose mixture from hydrolysed sucrose" },
        { prompt: "Which disaccharide has a β1–4 glycosidic link?", answer: "Lactose" },
        { prompt: "Which two carbons does the glycosidic link of sucrose join?", answer: "C-1 of glucose and C-2 of fructose" },
      ],
      pyqExampleId: "3ee957ad-565a-496a-b7a5-d253bdfa9408", // 2025 — sucrose / maltose / lactose / amylopectin linkages
      traps: [
        {
          title: "Fructose, not glucose, is laevorotatory",
          body: "Invert sugar is laevorotatory because fructose (−92.4°) rotates more strongly than glucose (+52.5°). A reason that gives the laevorotation to glucose is false.",
        },
        {
          title: "Sucrose joins α-glucose to β-fructose",
          body: "The link is C-1 of α-D-glucose to C-2 of β-D-fructose. A statement with β-glucose and α-fructose has the anomers swapped and is false.",
        },
        {
          title: "Lactose uses C-1 of galactose",
          body: "In lactose the galactose unit gives its anomeric C-1 and the glucose unit gives C-4. The reverse, C-1 of glucose to C-4 of galactose, is a common wrong option.",
        },
      ],
    },

    // C3 — polysaccharides
    {
      kind: "reference" as const,
      slug: "jcbio-polysaccharides",
      name: "Starch, glycogen and cellulose: linkages and sources",
      intuition:
        "All three are made of glucose only. Two choices tell them apart: is the glucose α or β, and does the chain branch? Starch and glycogen use α-glucose, which animals can digest; cellulose uses β-glucose, which humans cannot. Branching at C-6 makes amylopectin, and even more branching makes glycogen.",
      definition:
        "- **Starch** is 15–20% amylose and 80–85% amylopectin. It is the main storage polysaccharide of plants.\n" +
        "- Boiling starch or cellulose with dilute \\(\\mathrm{H_2SO_4}\\) at 393 K under 2 to 3 atm hydrolyses it to glucose; bromine water then gives gluconic acid.\n" +
        "- **Glycogen** is called animal starch. Its structure is like amylopectin but more highly branched. It is stored in liver, muscles and brain; yeast and fungi also make it.\n" +
        "- **Cellulose** is the main polysaccharide of plant cell walls; humans have no enzyme to break its β links.\n" +
        "- Biopolymers and their monomers: starch from α-glucose, cellulose from β-glucose, nucleic acids from nucleotides, proteins from α-amino acids.",
      table: {
        columns: ["Polysaccharide", "Unit and linkage", "Shape and solubility", "Found in"],
        rows: [
          { cells: ["Amylose", "α-D-glucose, C-1 to C-4 only", "Unbranched chain of 200 to 1000 units; soluble in water", "Starch of plants, 15–20%"] },
          { cells: ["Amylopectin", "α-D-glucose, C-1 to C-4 in chains, C-1 to C-6 at branches", "Branched; insoluble in water", "Starch of plants, 80–85%"] },
          { cells: ["Glycogen", "α-D-glucose, C-1 to C-4 with C-1 to C-6 branches", "More highly branched than amylopectin", "Liver, muscles and brain of animals; yeast and fungi"] },
          { cells: ["Cellulose", "β-D-glucose, C-1 to C-4 only", "Straight chains packed side by side; insoluble in water", "Plant cell walls; not digested by humans"] },
        ],
        caption: "Only cellulose has β links; only amylopectin and glycogen branch.",
      },
      selfCheckExample: {
        prompt: "Which fraction of starch dissolves in water, amylose or amylopectin, and how do their chains differ?",
        steps: [
          "Amylose is an unbranched chain of α-glucose units joined C-1 to C-4; NCERT describes it as water soluble.",
          "Amylopectin has the same α1–4 chains with α1–6 branches, and it is insoluble in water.",
        ],
        answer: "Amylose; it is unbranched, while amylopectin branches through C-1 to C-6 links.",
      },
      practiceSet: [
        { prompt: "What is the monomer of cellulose?", answer: "β-D-Glucose" },
        { prompt: "Which polysaccharide is called animal starch?", answer: "Glycogen" },
        { prompt: "What share of starch is amylose?", answer: "15–20%" },
        { prompt: "Which link forms the branch points of amylopectin?", answer: "α C-1 to C-6" },
      ],
      pyqExampleId: "630cb443-3cb1-447d-aea1-c0cae7fa57ac", // 2025 — amylose / cellulose / glycogen / amylopectin by linkage and source
      traps: [
        {
          title: "Amylose is the water-soluble fraction",
          body: "NCERT calls amylose water soluble and amylopectin insoluble. An assertion that amylose is insoluble in water is false, even though amylose is indeed a long chain of 200 to 1000 glucose units.",
        },
        {
          title: "Cellulose and starch differ in the anomer, not the carbons",
          body: "Both join C-1 to C-4. Starch uses α-glucose and cellulose uses β-glucose. A polysaccharide described as having only β-glycosidic links is cellulose.",
        },
      ],
    },
  ],
};
