import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_BEM_GLYCOLYSIS_NOTE: SubtopicNote = {
  subtopicName: "Glycolysis and Link Reaction",
  title: "Glycolysis and the Link Reaction",
  oneLineDefinition:
    "In the cytoplasm, glucose is split into two pyruvate for a net 2 ATP and 2 NADH; in the mitochondrial matrix, each pyruvate then loses a CO₂ and becomes acetyl coenzyme A.",
  whyItMatters:
    "Glycolysis is asked in detail: the ministry papers of 2023 and 2025 named its enzymes (which steps use an isomerase) and asked how many NAD⁺ it reduces. Older papers asked the order of its stages, where CO₂ is first released, and which products glycolysis and the link reaction share.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-bem-glycolysis-pathway",
      name: "Glycolysis: the ten steps from glucose to pyruvate",
      intuition:
        "Glycolysis splits one glucose (6 carbons) into two pyruvate (3 carbons each). It first spends 2 ATP to make glucose reactive and easy to split, then earns 4 ATP and 2 NADH as the two halves are oxidised. It needs no oxygen, so it runs in every cell, with or without oxygen.",
      definition:
        "- Site: the **cytoplasm** (cytosol). It needs no oxygen and is the same in aerobic and anaerobic conditions.\n" +
        "- **Investment phase**: glucose is phosphorylated twice, using **2 ATP**, giving fructose 1,6-bisphosphate. This 6-carbon sugar splits into **two triose phosphates** (3 carbons each).\n" +
        "- **Payoff phase**: each triose phosphate is oxidised, reducing one \\(\\mathrm{NAD^+}\\), and gives 2 ATP by **substrate-level phosphorylation**.\n" +
        "- Net per glucose: **2 pyruvate, 2 ATP, 2 NADH**. **No \\(\\mathrm{CO_2}\\)** is released and no \\(\\mathrm{FADH_2}\\) is made.\n" +
        "- Enzyme families: **kinases** move a phosphate (to or from ATP), **isomerases** rearrange a molecule without adding anything, a **dehydrogenase** removes hydrogen (reducing \\(\\mathrm{NAD^+}\\)). **Phosphofructokinase** is the main control point.",
      table: {
        columns: ["Step", "Change", "Enzyme", "ATP or NADH"],
        rows: [
          { cells: ["1", "Glucose → glucose 6-phosphate", "Hexokinase", "1 ATP used"] },
          { cells: ["2", "Glucose 6-phosphate → fructose 6-phosphate", "Phosphoglucose isomerase", "None"] },
          { cells: ["3", "Fructose 6-phosphate → fructose 1,6-bisphosphate", "Phosphofructokinase", "1 ATP used"] },
          { cells: ["4", "Fructose 1,6-bisphosphate → dihydroxyacetone phosphate + glyceraldehyde 3-phosphate", "Aldolase", "None"] },
          { cells: ["5", "Dihydroxyacetone phosphate → glyceraldehyde 3-phosphate", "Triose phosphate isomerase", "None"] },
          { cells: ["6", "Glyceraldehyde 3-phosphate → 1,3-bisphosphoglycerate", "Glyceraldehyde 3-phosphate dehydrogenase", "1 NADH made"] },
          { cells: ["7", "1,3-bisphosphoglycerate → 3-phosphoglycerate", "Phosphoglycerate kinase", "1 ATP made"] },
          { cells: ["8", "3-phosphoglycerate → 2-phosphoglycerate", "Phosphoglycerate mutase", "None"] },
          { cells: ["9", "2-phosphoglycerate → phosphoenolpyruvate (water removed)", "Enolase", "None"] },
          { cells: ["10", "Phosphoenolpyruvate → pyruvate", "Pyruvate kinase", "1 ATP made"] },
        ],
        caption: "Steps 6 to 10 happen twice per glucose, once for each triose phosphate: 2 NADH and 4 ATP made, minus 2 ATP used in steps 1 and 3.",
      },
      selfCheckExample: {
        prompt: "Which statement about the glycolysis of one glucose molecule is correct?",
        options: [
          "It releases two molecules of \\(\\mathrm{CO_2}\\)",
          "It takes place in the mitochondrial matrix",
          "It gives a net gain of 2 ATP and 2 reduced NAD",
          "It gives a net gain of 4 ATP, because 4 ATP are made",
          "It needs oxygen to accept the electrons removed from glucose",
        ],
        steps: [
          "Glycolysis makes 4 ATP but uses 2, so the net gain is 2 ATP; it also reduces 2 \\(\\mathrm{NAD^+}\\).",
          "D gives the gross figure, not the net. A is wrong: no carbon leaves glycolysis, as both pyruvates together still hold all 6 carbons.",
          "B and E are wrong: glycolysis runs in the cytoplasm and needs no oxygen.",
        ],
        answer: "(C) It gives a net gain of 2 ATP and 2 reduced NAD",
      },
      practiceSet: [
        { prompt: "How many carbon atoms does a pyruvate molecule have?", answer: "3" },
        { prompt: "Which enzyme of glycolysis is its main control point?", answer: "Phosphofructokinase" },
        { prompt: "Name the two triose phosphates formed when fructose 1,6-bisphosphate splits.", answer: "Dihydroxyacetone phosphate and glyceraldehyde 3-phosphate" },
        { prompt: "Put in order: triose phosphates; glucose; fructose 1,6-bisphosphate; pyruvate.", answer: "Glucose, fructose 1,6-bisphosphate, triose phosphates, pyruvate", method: "Phosphorylate, split, then oxidise" },
      ],
      traps: [
        {
          title: "Gross is not net",
          body: "Glycolysis makes 4 ATP per glucose but spends 2 in the investment phase, so the net yield is 2 ATP. Options with 4 ATP give the gross figure.",
        },
        {
          title: "Glycolysis releases no CO₂",
          body: "Glucose has 6 carbons and the two pyruvates have 3 each, so no carbon is lost. In aerobic respiration the first \\(\\mathrm{CO_2}\\) is released in the link reaction; in yeast, the fermentation step after glycolysis releases it.",
        },
        {
          title: "Isomerases rearrange; kinases phosphorylate",
          body: "The isomerase steps change one sugar phosphate into another with the same atoms: glucose 6-phosphate to fructose 6-phosphate, and dihydroxyacetone phosphate to glyceraldehyde 3-phosphate. Adding a phosphate from ATP is done by a kinase, and splitting the 6-carbon sugar by aldolase.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bem-link-reaction",
      name: "The link reaction: pyruvate to acetyl coenzyme A",
      intuition:
        "Pyruvate cannot enter the Krebs cycle as it is. Inside the mitochondrion it loses one carbon as \\(\\mathrm{CO_2}\\) and two electrons to \\(\\mathrm{NAD^+}\\), and the 2-carbon acetyl group left over is attached to coenzyme A. Acetyl coenzyme A is the common entry point to the Krebs cycle for carbohydrate, fat and some amino acids.",
      definition:
        "- Pyruvate is carried from the cytoplasm into the **mitochondrial matrix**.\n" +
        "- The **pyruvate dehydrogenase complex** carries out an **oxidative decarboxylation**: \\[\\text{pyruvate (3C)} + \\text{CoA} + \\mathrm{NAD^+} \\rightarrow \\text{acetyl CoA (2C)} + \\mathrm{CO_2} + \\mathrm{NADH}\\]\n" +
        "- Per glucose (two pyruvates): **2 acetyl CoA, 2 \\(\\mathrm{CO_2}\\), 2 NADH**, and **no ATP**.\n" +
        "- Oxygen is not used in this step. It is needed later, at the end of the respiratory chain, to reoxidise the NADH; without it the link reaction soon stops.\n" +
        "- Acetyl CoA is also made by the breakdown of fatty acids (β-oxidation) and of some amino acids.",
      table: {
        columns: ["Product", "Per pyruvate", "Per glucose", "What happens to it"],
        rows: [
          { cells: ["Acetyl CoA", "1", "2", "Enters the Krebs cycle"] },
          { cells: ["CO₂", "1", "2", "Diffuses out; the first CO₂ of aerobic respiration"] },
          { cells: ["NADH", "1", "2", "Reoxidised by the respiratory chain"] },
          { cells: ["ATP", "0", "0", "No ATP is made in this step"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A drug blocks the transport of pyruvate into the mitochondria of a liver cell that has plenty of oxygen. Which product will the cell stop making from glucose?",
        options: [
          "Pyruvate",
          "ATP in the cytoplasm",
          "NADH in glycolysis",
          "Lactate",
          "Acetyl coenzyme A",
        ],
        steps: [
          "Glycolysis happens in the cytoplasm, so pyruvate, its ATP and its NADH are still made (A, B, C).",
          "Lactate is made in the cytoplasm too; with pyruvate trapped there, the cell would make more of it, not less (D).",
          "Acetyl CoA from glucose is made only inside the matrix, from pyruvate, so it stops.",
        ],
        answer: "(E) Acetyl coenzyme A",
      },
      practiceSet: [
        { prompt: "How many molecules of \\(\\mathrm{CO_2}\\) does the link reaction release per glucose?", answer: "2", method: "One per pyruvate" },
        { prompt: "Where does the link reaction take place?", answer: "In the mitochondrial matrix" },
        { prompt: "Which molecule carries the 2-carbon acetyl group into the Krebs cycle?", answer: "Coenzyme A (as acetyl CoA)" },
        { prompt: "How much ATP does the link reaction make?", answer: "None" },
      ],
      traps: [
        {
          title: "Decarboxylation releases CO₂ but uses no oxygen",
          body: "In the link reaction the \\(\\mathrm{CO_2}\\) comes from pyruvate's own carboxyl group, not from oxygen gas. Oxygen gas is used only at the end of the respiratory chain, where it accepts electrons and forms water.",
        },
      ],
    },
  ],
};
