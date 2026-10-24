import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_BC_CARBOHYDRATES_NOTE: SubtopicNote = {
  subtopicName: "Elements and Carbohydrates",
  title: "Elements and Carbohydrates",
  oneLineDefinition:
    "Which elements the body is made of, the four kinds of biomolecule, sugars sorted by size, and how starch and glycogen store glucose.",
  whyItMatters:
    "Seven CDS questions from 2016 (II) to 2026 (II). Six are about sugars: which are disaccharides, what lactose is made of, which polymer has no glucose, and where starch and glycogen are found. One asks the order of the elements in the body by mass.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbibc-elements",
      name: "The elements of the body and the four biomolecules",
      intuition:
        "Your body is about two-thirds water, and water is mostly oxygen by weight. So oxygen is the heaviest share of you, ahead of carbon. The carbon, hydrogen and oxygen that are left build the big molecules of life: carbohydrates, fats, proteins and nucleic acids. Proteins and nucleic acids also carry nitrogen.",
      definition:
        "What the body is made of:\n" +
        "- By **mass**: **oxygen** about 65 per cent, **carbon** about 18, **hydrogen** about 10, **nitrogen** about 3. Then calcium and phosphorus.\n" +
        "- By **number of atoms** the order changes: **hydrogen** is the most common atom, because each water molecule has two.\n" +
        "- The four classes of **biomolecule**: **carbohydrates** (sugars, starch), **lipids** (fats and oils), **proteins** (enzymes, muscle, hair) and **nucleic acids** (DNA, RNA).\n" +
        "- Carbohydrates and fats are made of **C, H and O** only. Proteins also have **nitrogen** (and often sulphur). Nucleic acids have **nitrogen and phosphorus**.",
      table: {
        columns: ["Element", "Share of body mass"],
        rows: [
          {
            cells: ["Oxygen", "About 65 per cent"],
            noteAmber: "CDS 2016 (II): by mass the order is oxygen, carbon, hydrogen, nitrogen.",
            pyqExampleId: "3245ef30-966e-41ab-8a10-6080b4cdb13b",
          },
          { cells: ["Carbon", "About 18 per cent"] },
          { cells: ["Hydrogen", "About 10 per cent"] },
          { cells: ["Nitrogen", "About 3 per cent"] },
          { cells: ["Calcium", "About 1.5 per cent, mostly in bones and teeth"] },
          { cells: ["Phosphorus", "About 1 per cent, in bones, DNA and ATP"] },
        ],
      },
      pyqExampleId: "3245ef30-966e-41ab-8a10-6080b4cdb13b",
      selfCheckExample: {
        prompt: "A molecule is a long chain of glucose units and contains only carbon, hydrogen and oxygen. Which class of biomolecule is it, and which element does it lack that every protein has?",
        steps: [
          "A chain of glucose units is a polysaccharide, so it is a carbohydrate.",
          "Carbohydrates are built from C, H and O only. Proteins are built from amino acids, which always carry nitrogen.",
        ],
        answer: "A carbohydrate; it has no nitrogen.",
      },
      practiceSet: [
        { prompt: "Which class of biomolecule are DNA and RNA?", answer: "Nucleic acids" },
        { prompt: "Which element is present in every protein but absent from plain sugars and fats?", answer: "Nitrogen" },
        { prompt: "Which atom is the most numerous in the human body when atoms are counted, not weighed?", answer: "Hydrogen" },
        { prompt: "Name the four main classes of biomolecule.", answer: "Carbohydrates, lipids, proteins and nucleic acids" },
      ],
      traps: [
        {
          title: "By mass, oxygen comes before carbon",
          body: "Carbon is the backbone of every biomolecule, so it is tempting to put it first. But the body is mostly water, and by **mass** **oxygen** leads (about 65 per cent), then carbon, hydrogen and nitrogen.",
        },
        {
          title: "Mass order is not atom order",
          body: "If the question counts **atoms**, **hydrogen** is the most common. If it asks **by mass**, oxygen is first. Read which one the stem means.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbibc-sugars",
      name: "Sugars by size: one unit, two units, many units",
      intuition:
        "Sugars are sorted by how many sugar units they have. A single unit, like glucose, is a monosaccharide. Two units joined together make a disaccharide, like cane sugar or milk sugar. Hundreds or thousands joined in a chain make a polysaccharide, like starch or cellulose. Digestion simply breaks the big ones back into single units.",
      definition:
        "Carbohydrates by size:\n" +
        "- **Monosaccharides** (one unit): **glucose**, **fructose** (fruit sugar), **galactose**; **ribose** is the five-carbon sugar of RNA.\n" +
        "- **Disaccharides** (two units): **sucrose** = glucose + fructose (cane sugar); **maltose** = glucose + glucose (malt sugar); **lactose** = glucose + galactose (milk sugar).\n" +
        "- **Polysaccharides** (many glucose units): **starch** (store in plants), **glycogen** (store in animals), **cellulose** (plant cell wall).\n" +
        "- **Natural rubber** is a polymer too, but of **isoprene**, a hydrocarbon. It has no glucose at all.",
      table: {
        columns: ["Sugar", "Kind", "Made of"],
        rows: [
          { cells: ["Glucose", "Monosaccharide", "One unit"] },
          { cells: ["Sucrose", "Disaccharide", "Glucose and fructose"] },
          { cells: ["Maltose", "Disaccharide", "Glucose and glucose"] },
          {
            cells: ["Lactose", "Disaccharide", "Glucose and galactose"],
            noteAmber: "CDS 2025 (I): lactose is glucose and galactose.",
            pyqExampleId: "73483948-057b-4cb6-9a68-4e4ea51e5548",
          },
          { cells: ["Starch, glycogen, cellulose", "Polysaccharide", "Many glucose units"] },
          {
            cells: ["Natural rubber", "Not a sugar", "Isoprene units, no glucose"],
            noteAmber: "CDS 2017 (II): of glycogen, starch, cellulose and rubber, only rubber has no glucose units.",
            pyqExampleId: "71a351bc-a0ab-453c-9cd9-d08c8d7e1c91",
          },
        ],
      },
      pyqExampleId: "e8bc1be0-757c-44ec-997b-62dc2caa8f35",
      selfCheckExample: {
        prompt: "Paper is made of a carbohydrate that has thousands of glucose units joined in long chains. Name it and say which size class it belongs to.",
        steps: [
          "Paper comes from wood pulp, which is plant cell wall.",
          "The plant cell wall is made of cellulose, a long chain of glucose units.",
        ],
        answer: "Cellulose, a polysaccharide.",
      },
      practiceSet: [
        { prompt: "Which two sugars join to make sucrose?", answer: "Glucose and fructose" },
        { prompt: "Which sugar is part of RNA?", answer: "Ribose" },
        { prompt: "Which polysaccharide makes up the cell wall of plants?", answer: "Cellulose" },
        { prompt: "What is the unit that natural rubber is built from?", answer: "Isoprene" },
      ],
      traps: [
        {
          title: "Lactose has galactose, sucrose has fructose",
          body: "**Lactose** (milk) = glucose + **galactose**. **Sucrose** (cane sugar) = glucose + **fructose**. The two are swapped in the options, and glucose + sucrose is not a sugar pair at all.",
        },
        {
          title: "Starch and glycogen are not disaccharides",
          body: "A disaccharide has exactly **two** units. Starch and glycogen have thousands, so they are **polysaccharides**; glucose, galactose, ribose and xylose are single units.",
        },
        {
          title: "Rubber is a polymer but not a carbohydrate",
          body: "Starch, glycogen and cellulose are all chains of glucose. **Rubber** is a chain of **isoprene**, so it is the one with no glucose.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbibc-storage",
      name: "Starch and glycogen: the two stores of glucose",
      intuition:
        "Both plants and animals keep spare glucose by joining it into a big chain that does not dissolve. Plants store it as starch, in potatoes, rice and wheat. Animals store it as glycogen, in the liver and the muscles. Glycogen is more branched than starch, so the body can break it down quickly when sugar is needed.",
      definition:
        "Two storage polysaccharides of glucose:\n" +
        "- **Starch** is the store of **plants**. It is a mixture of two polymers: **amylose** (unbranched) and **amylopectin** (branched). It turns **blue-black** with iodine.\n" +
        "- **Glycogen** is the store of **animals** and fungi, kept in the **liver** and **muscles**. It is a single, **more highly branched** polymer, sometimes called animal starch.\n" +
        "- Glycogen is **not** a mixture of amylose and amylopectin.",
      table: {
        columns: ["Feature", "Starch", "Glycogen"],
        rows: [
          {
            cells: ["Found in", "Plant cells", "Animal cells (liver and muscle)"],
            noteAmber: "CDS 2022 (II): starch is in plant cells and glycogen in animal cells.",
            pyqExampleId: "369c5a88-f088-443d-bd5f-904a291dd398",
          },
          {
            cells: ["Made of", "Amylose and amylopectin", "One highly branched polymer"],
            noteAmber: "CDS 2026 (II): neither 'both are amylose and amylopectin' nor 'both are stored in liver cells' is correct.",
            pyqExampleId: "b50ff2c4-05c8-44d6-a4cc-2f8c7246b2a5",
          },
          { cells: ["Branching", "Less branched", "More branched"] },
          { cells: ["Colour with iodine", "Blue-black", "Red-brown"] },
        ],
      },
      pyqExampleId: "369c5a88-f088-443d-bd5f-904a291dd398",
      selfCheckExample: {
        prompt: "A drop of iodine solution on a cut potato turns it blue-black. What does this show, and which part of starch gives the colour?",
        steps: [
          "Iodine gives a blue-black colour with starch, so the potato stores starch.",
          "The colour comes from the unbranched amylose chains, which coil around the iodine.",
        ],
        answer: "The potato contains starch; the amylose in it gives the blue-black colour.",
      },
      practiceSet: [
        { prompt: "In which two organs of the human body is glycogen stored?", answer: "The liver and the muscles" },
        { prompt: "Which two polymers make up starch?", answer: "Amylose and amylopectin" },
        { prompt: "Which is more branched: starch or glycogen?", answer: "Glycogen" },
        { prompt: "What colour does starch give with iodine solution?", answer: "Blue-black" },
      ],
      traps: [
        {
          title: "Only starch is amylose plus amylopectin",
          body: "Starch is a **mixture** of amylose and amylopectin. Glycogen is one polymer, shaped like amylopectin but more branched. A statement that **both** are such a mixture is wrong.",
        },
        {
          title: "The liver stores glycogen, never starch",
          body: "Starch is made only by plants. Liver and muscle cells store carbohydrate as **glycogen**, so 'starch and glycogen are both stored in liver cells' is false.",
        },
      ],
    },
  ],
};
