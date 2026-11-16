import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_BM_VITAMINS_NOTE: SubtopicNote = {
  subtopicName: "Vitamins and Nucleic Acids",
  title: "Vitamins and Nucleic Acids",
  oneLineDefinition:
    "Fat-soluble and water-soluble vitamins with their sources and deficiency diseases, how a nucleoside and a nucleotide are built from a base, a pentose sugar and phosphoric acid, and how DNA and RNA differ in sugar, bases and strands.",
  whyItMatters:
    "Five NEET questions, from 2021 to 2026. Three are on vitamins: the vitamin whose lack causes the RBC deficiency, pernicious anaemia (2021); a match of four vitamins to their deficiency diseases (2025); and a match of four vitamins to their food sources (Re-NEET 2026). Two are on nucleic acids: two statements on how a nucleoside and a nucleotide are built (2023), and which of DNA and RNA is double stranded and carries thymine (2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchbm-vitamins",
      name: "Vitamins: sources and deficiency diseases",
      intuition:
        "Vitamins are organic compounds needed in small amounts in the diet, and the lack of each one causes a specific disease. They fall into two groups by what they dissolve in. Fat-soluble vitamins stay in body fat and the liver; water-soluble ones wash out in urine, so the diet must supply them regularly. The questions are mostly match-the-list, so learn the table as pairs.",
      definition:
        "- **Fat-soluble:** vitamins A, D, E and K. They are stored in the liver and in adipose (fat-storing) tissues.\n" +
        "- **Water-soluble:** the B group and vitamin C. They are readily excreted in urine and cannot be stored, so they must be supplied regularly in the diet.\n" +
        "- **The exception:** vitamin \\(\\text{B}_{12}\\) is water soluble but can be stored.\n" +
        "- The B vitamins by name: \\(\\text{B}_1\\) thiamine, \\(\\text{B}_2\\) riboflavin, \\(\\text{B}_6\\) pyridoxine. Vitamin C is ascorbic acid.",
      table: {
        columns: ["Vitamin", "Sources", "Deficiency disease"],
        rows: [
          { cells: ["A", "Fish liver oil, carrots, butter and milk", "Xerophthalmia (hardening of the cornea of the eye) and night blindness"], pyqExampleId: "97c8405a-5807-4d36-835c-82faabcb3d29", noteAmber: "Re-NEET 2026: vitamin A was matched with carrots, B₁₂ with meat, E with sunflower oil and K with green leafy vegetables." },
          { cells: ["\\(\\text{B}_1\\) (thiamine)", "Yeast, milk, green vegetables and cereals", "Beri-beri (loss of appetite, retarded growth)"] },
          { cells: ["\\(\\text{B}_2\\) (riboflavin)", "Milk, egg white, liver, kidney", "Cheilosis (fissures at the corners of the mouth and lips), digestive disorders, burning sensation of the skin"] },
          { cells: ["\\(\\text{B}_6\\) (pyridoxine)", "Yeast, milk, egg yolk, cereals and grams", "Convulsions"] },
          { cells: ["\\(\\text{B}_{12}\\)", "Meat, fish, egg and curd", "Pernicious anaemia (RBCs deficient in haemoglobin)"], pyqExampleId: "88fbfe58-92a3-4c58-8e75-0ad6d35667f9", noteAmber: "NEET 2021: the RBC deficiency disease is that of vitamin B₁₂." },
          { cells: ["C (ascorbic acid)", "Citrus fruits, amla and green leafy vegetables", "Scurvy (bleeding gums)"] },
          { cells: ["D", "Exposure to sunlight, fish and egg yolk", "Rickets (bone deformities in children) and osteomalacia (soft bones and joint pain in adults)"] },
          { cells: ["E", "Vegetable oils such as wheat germ oil and sunflower oil", "Increased fragility of RBCs and muscular weakness"] },
          { cells: ["K", "Green leafy vegetables", "Increased blood clotting time"] },
        ],
        caption: "B₂, B₆ and B₁₂ are the pairs most easily swapped: cheilosis, convulsions, pernicious anaemia.",
      },
      pyqExampleId: "347160d2-719e-4a1c-9507-b00893c4c742",
      selfCheckExample: {
        prompt: "One patient has bleeding gums; in another, blood takes longer than usual to clot. Which vitamin is lacking in each?",
        steps: [
          "Bleeding gums are the sign of scurvy, the deficiency disease of vitamin C.",
          "An increased blood clotting time is the deficiency disease of vitamin K.",
        ],
        answer: "Vitamin C in the first patient; vitamin K in the second",
      },
      practiceSet: [
        { prompt: "Which four vitamins are fat soluble?", answer: "A, D, E and K" },
        { prompt: "Which water-soluble vitamin can be stored in the body?", answer: "Vitamin \\(\\text{B}_{12}\\)" },
        { prompt: "Deficiency of which vitamin causes night blindness?", answer: "Vitamin A" },
        { prompt: "What is the chemical name of vitamin \\(\\text{B}_1\\), and which disease does its deficiency cause?", answer: "Thiamine; beri-beri" },
      ],
      traps: [
        {
          title: "Pernicious anaemia is B₁₂, convulsions are B₆",
          body: "A lack of vitamin \\(\\text{B}_{12}\\) leaves red blood cells short of haemoglobin: pernicious anaemia. A lack of \\(\\text{B}_6\\) causes convulsions, and a lack of \\(\\text{B}_2\\) causes cheilosis.",
        },
        {
          title: "Vitamin K deficiency increases clotting time",
          body: "Without vitamin K, blood takes longer to clot. An option saying the clotting time decreases is false.",
        },
        {
          title: "B₁₂ is the water-soluble vitamin that is stored",
          body: "Water-soluble vitamins are excreted in urine and must be supplied regularly, with one exception: vitamin \\(\\text{B}_{12}\\) can be stored.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchbm-nucleotides",
      name: "Nucleosides and nucleotides",
      intuition:
        "Complete hydrolysis of a nucleic acid gives three things: a pentose sugar, phosphoric acid and nitrogen bases. Put them back together in steps. A base on the sugar is a nucleoside; add a phosphate and it is a nucleotide; join many nucleotides and you have a nucleic acid.",
      definition:
        "- Nucleic acids are long-chain polymers of nucleotides, so they are also called **polynucleotides**.\n" +
        "- Complete hydrolysis of DNA or RNA gives a **pentose sugar**, **phosphoric acid** and nitrogen-containing heterocyclic compounds, the **bases**.\n" +
        "- **Nucleoside:** a base attached at the 1′ position of the sugar. The sugar carbons are numbered 1′, 2′, 3′ and so on, to tell them apart from the atoms of the base.\n" +
        "- **Nucleotide:** a nucleoside linked to **phosphoric acid** at the 5′ position of the sugar.\n" +
        "- Nucleotides are joined to each other by **phosphodiester** links between the 5′ and 3′ carbons of the sugars.",
      table: {
        columns: ["Unit", "Made of", "Where the parts join"],
        rows: [
          { cells: ["Nucleoside", "A base and a pentose sugar", "The base at C-1′ of the sugar"] },
          { cells: ["Nucleotide", "A nucleoside and phosphoric acid", "The phosphate at C-5′ of the sugar"], pyqExampleId: "d69a480b-f5c1-4329-b935-6d0ae99f6fc0", noteAmber: "NEET 2023: Statement II said phosphorous acid; the acid is phosphoric acid, so only Statement I was true." },
          { cells: ["Nucleic acid (polynucleotide)", "Many nucleotides", "Phosphodiester links between C-5′ and C-3′ of neighbouring sugars"] },
        ],
        caption: "Base at 1′, phosphate at 5′, the next nucleotide through 3′.",
      },
      pyqExampleId: "d69a480b-f5c1-4329-b935-6d0ae99f6fc0",
      selfCheckExample: {
        prompt: "A sample of RNA is completely hydrolysed. Name the three kinds of product.",
        steps: [
          "The backbone is sugar and phosphate, so a pentose sugar and phosphoric acid are released.",
          "The nitrogen-containing heterocyclic bases attached to the sugars are released as well.",
        ],
        answer: "A pentose sugar, phosphoric acid and nitrogen-containing bases",
      },
      practiceSet: [
        { prompt: "What kind of link joins one nucleotide to the next in a nucleic acid?", answer: "A phosphodiester link, between the 5′ and 3′ carbons of the sugars" },
        { prompt: "Why are the carbons of the sugar in a nucleoside numbered 1′, 2′, 3′?", answer: "To tell them apart from the atoms of the base" },
        { prompt: "Why are nucleic acids also called polynucleotides?", answer: "They are long-chain polymers of nucleotides" },
      ],
      traps: [
        {
          title: "Phosphoric acid, not phosphorous acid",
          body: "A nucleotide is a nucleoside linked to phosphoric acid, \\(\\text{H}_3\\text{PO}_4\\), at C-5′. Phosphorous acid, \\(\\text{H}_3\\text{PO}_3\\), is a different acid.",
        },
        {
          title: "The base and the phosphate sit on different carbons",
          body: "The base is attached at C-1′ of the sugar and the phosphate at C-5′. Swapping the two positions is a common wrong statement.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchbm-dna-rna",
      name: "DNA and RNA",
      intuition:
        "DNA and RNA differ in three ways: the sugar, one base, and the number of strands. DNA has 2-deoxyribose and thymine and is a double helix; RNA has ribose and uracil and is single stranded. In the double helix the bases of the two strands pair in a fixed way, adenine with thymine and cytosine with guanine, so one strand fixes the other.",
      definition:
        "- **Sugar:** β-D-2-deoxyribose in DNA, β-D-ribose in RNA.\n" +
        "- **Bases:** DNA has adenine (A), guanine (G), cytosine (C) and thymine (T). RNA has A, G, C and uracil (U).\n" +
        "- **DNA** is a double helix: two strands coiled round each other and held by hydrogen bonds between pairs of bases. The strands are complementary: adenine pairs with thymine, and cytosine with guanine.\n" +
        "- **RNA** has helices that are only single stranded, and they sometimes fold back on themselves. There are three types: messenger RNA (m-RNA), ribosomal RNA (r-RNA) and transfer RNA (t-RNA).\n" +
        "- DNA is the chemical basis of heredity and the reserve of genetic information, and it copies itself during cell division. Proteins are made by the RNA molecules, but the message for each protein is in DNA.",
      table: {
        columns: ["Feature", "DNA", "RNA"],
        rows: [
          { cells: ["Sugar", "β-D-2-deoxyribose", "β-D-ribose"] },
          { cells: ["Bases", "Adenine, guanine, cytosine, thymine", "Adenine, guanine, cytosine, uracil"] },
          { cells: ["Strands", "Double strand helix", "Single strand helix"], pyqExampleId: "bba7d309-8530-47cc-8f43-d1c1ed7713f5", noteAmber: "NEET 2026: DNA is a double strand helix with thymine as one of its four bases." },
          { cells: ["Role", "Reserve of genetic information; copies itself in cell division", "Carries out protein synthesis"] },
        ],
        caption: "Thymine and 2-deoxyribose mark DNA; uracil and ribose mark RNA.",
      },
      pyqExampleId: "bba7d309-8530-47cc-8f43-d1c1ed7713f5",
      selfCheckExample: {
        prompt: "One strand of a DNA double helix carries the bases A, T, G, C in that order. Which bases stand opposite them on the other strand?",
        steps: [
          "Adenine pairs with thymine and cytosine with guanine.",
          "So A faces T, T faces A, G faces C and C faces G.",
        ],
        answer: "T, A, C, G",
      },
      practiceSet: [
        { prompt: "Which sugar is present in DNA?", answer: "β-D-2-deoxyribose" },
        { prompt: "Name the three types of RNA.", answer: "Messenger (m-RNA), ribosomal (r-RNA) and transfer (t-RNA)" },
        { prompt: "In DNA, which base pairs with cytosine?", answer: "Guanine" },
        { prompt: "Which nucleic acid is the reserve of genetic information?", answer: "DNA" },
      ],
      traps: [
        {
          title: "Thymine in DNA, uracil in RNA",
          body: "DNA carries thymine and RNA carries uracil in its place. Adenine, guanine and cytosine are in both.",
        },
        {
          title: "RNA is single stranded",
          body: "DNA is the double helix. The helices of RNA are single stranded, even where the strand folds back on itself.",
        },
        {
          title: "DNA has 2-deoxyribose",
          body: "The sugar of DNA is β-D-2-deoxyribose, which lacks an oxygen at C-2′. Ribose is the sugar of RNA.",
        },
      ],
    },
  ],
};
