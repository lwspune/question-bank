import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_BEM_FATS_PROTEINS_NOTE: SubtopicNote = {
  subtopicName: "Lipid and Protein Metabolism",
  title: "Fats and Proteins as Fuel, and Where Each Pathway Runs",
  oneLineDefinition:
    "Fatty acids are cut two carbons at a time into acetyl CoA, amino acids lose their nitrogen as urea in the liver, and every pathway has its own place in the cell and the body.",
  whyItMatters:
    "The 2025 paper asked which process happens mainly in the liver (the urea cycle) and why the body stores energy as fat rather than protein, and used β-oxidation and amino group removal as options in other items. The 2024 and 2026 papers asked where respiration and its stages take place.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-bem-fat-catabolism",
      name: "Fat as fuel: lipolysis and β-oxidation",
      intuition:
        "Fat is the body's long-term energy store. A triglyceride is split into glycerol and three fatty acids, and each fatty acid is then cut two carbons at a time into acetyl CoA, which enters the Krebs cycle. Fatty acid carbons carry more hydrogen than sugar carbons, so fat releases about twice as much energy per gram.",
      definition:
        "- **Lipolysis**: lipase hydrolyses a triglyceride into **glycerol + 3 fatty acids**. In adipose tissue this is switched on by glucagon and adrenaline.\n" +
        "- **Glycerol** goes to the liver and joins glycolysis as a triose phosphate, or is used to make glucose.\n" +
        "- **Fatty acids** are activated with coenzyme A in the cytoplasm (this costs ATP) and carried into the mitochondrial matrix by **carnitine**.\n" +
        "- **β-oxidation** (mitochondrial matrix): each round removes 2 carbons as **acetyl CoA** and makes **1 \\(\\mathrm{FADH_2}\\) and 1 NADH**. The acetyl CoA enters the Krebs cycle; the reduced carriers go to the respiratory chain.\n" +
        "- **Energy density**: about 37 kJ/g (9 kcal/g) for fat, against about 17 kJ/g (4 kcal/g) for carbohydrate or protein. Fat is also stored almost without water, while glycogen is stored with about 2 to 3 g of water per gram. So, gram for gram, a fat store holds several times more energy.\n" +
        "- **Fatty acid synthesis** is a separate anabolic pathway in the cytoplasm that uses NADPH; it is not β-oxidation run backwards.",
      formula: {
        label: "β-oxidation of a saturated fatty acid with n carbons",
        latex: "\\text{acetyl CoA} = \\frac{n}{2} \\qquad \\text{rounds} = \\frac{n}{2} - 1",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of carbon atoms in the fatty acid (an even number)" },
          { symbol: "rounds", meaning: "each round gives 1 NADH and 1 \\(\\mathrm{FADH_2}\\); the last round leaves two acetyl CoA, so there is one round fewer than acetyl CoA" },
        ],
      },
      authoredExample: {
        prompt:
          "Palmitic acid has 16 carbon atoms. How many acetyl CoA, NADH and \\(\\mathrm{FADH_2}\\) does its β-oxidation give? Using 10 ATP per acetyl CoA through the Krebs cycle and chain, 2.5 per NADH and 1.5 per \\(\\mathrm{FADH_2}\\), and 2 ATP spent to activate it, estimate its total ATP yield.",
        steps: [
          "Acetyl CoA: \\(16 / 2 = 8\\). Rounds: \\(8 - 1 = 7\\), so 7 NADH and 7 \\(\\mathrm{FADH_2}\\).",
          "From acetyl CoA: \\(8 \\times 10 = 80\\) ATP.",
          "From the carriers: \\(7 \\times 2.5 + 7 \\times 1.5 = 17.5 + 10.5 = 28\\) ATP.",
          "Total: \\(80 + 28 - 2 = 106\\) ATP, more than three times the yield of one glucose. Like all ATP totals, this is an estimate.",
        ],
        answer: "8 acetyl CoA, 7 NADH, 7 \\(\\mathrm{FADH_2}\\); about 106 ATP",
      },
      selfCheckExample: {
        prompt:
          "A saturated fatty acid with 14 carbon atoms is completely broken down by β-oxidation. How many acetyl CoA are produced, and how many rounds of β-oxidation are needed?",
        options: [
          "14 acetyl CoA in 7 rounds",
          "7 acetyl CoA in 7 rounds",
          "7 acetyl CoA in 6 rounds",
          "6 acetyl CoA in 6 rounds",
          "28 acetyl CoA in 13 rounds",
        ],
        steps: [
          "Each acetyl CoA holds 2 carbons: \\(14 / 2 = 7\\) acetyl CoA.",
          "The last round splits a 4-carbon unit into two acetyl CoA, so the rounds are one fewer: \\(7 - 1 = 6\\).",
          "B forgets that the last round makes two acetyl CoA; A and E treat each carbon as an acetyl group.",
        ],
        answer: "(C) 7 acetyl CoA in 6 rounds",
      },
      practiceSet: [
        { prompt: "What are the products of the complete hydrolysis of one triglyceride?", answer: "1 glycerol and 3 fatty acids" },
        { prompt: "Where in the cell does β-oxidation take place?", answer: "In the mitochondrial matrix" },
        { prompt: "About how much energy does 1 g of fat release, compared with 1 g of glucose?", answer: "About 37 kJ against about 17 kJ", method: "Roughly twice as much" },
        { prompt: "How many acetyl CoA does stearic acid (18 carbons) give, and in how many rounds?", answer: "9 acetyl CoA in 8 rounds" },
      ],
      traps: [
        {
          title: "Fat beats protein as a store on two counts",
          body: "Triglycerides release about twice the energy per gram of protein or carbohydrate, and they are stored with very little water. Protein in muscle is not an energy store at all: it is working tissue, used as fuel only in prolonged fasting.",
        },
        {
          title: "β-oxidation is not oxidative phosphorylation",
          body: "β-oxidation breaks fatty acids into acetyl CoA and makes NADH and \\(\\mathrm{FADH_2}\\); it makes no ATP itself. The ATP comes later, when those carriers are reoxidised by the respiratory chain.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bem-protein-catabolism",
      name: "Protein breakdown: transamination, deamination and the urea cycle",
      intuition:
        "Amino acids are not stored, so any extra is broken down. The nitrogen-containing amino group has to come off first, and its ammonia is toxic. The liver turns that ammonia into urea for the kidneys to excrete, and the carbon skeleton left over is burned in the Krebs cycle or turned into glucose or fat.",
      definition:
        "- Proteases hydrolyse proteins into amino acids. The body has **no protein store**; muscle protein is broken down for fuel only in prolonged fasting.\n" +
        "- **Transamination** (many tissues, especially liver and muscle): an **aminotransferase** moves the amino group from an amino acid onto a keto acid such as α-ketoglutarate, making glutamate. No ammonia is released. Vitamin B6 is the coenzyme.\n" +
        "- **Oxidative deamination** (mainly liver): glutamate loses its amino group as **ammonia** (\\(\\mathrm{NH_3}\\)), reducing \\(\\mathrm{NAD^+}\\).\n" +
        "- **Urea cycle** (liver only, partly in the mitochondria and partly in the cytoplasm): ammonia and \\(\\mathrm{CO_2}\\) are combined into **urea**, at a cost of ATP. Urea travels in the blood to the kidneys and leaves in urine.\n" +
        "- **Carbon skeletons** enter metabolism as pyruvate, acetyl CoA or Krebs cycle intermediates. **Glucogenic** amino acids can be made into glucose; **ketogenic** ones only into fat or ketone bodies.\n" +
        "- Protein releases about 17 kJ/g, like carbohydrate.",
      table: {
        columns: ["Process", "What happens", "Where"],
        rows: [
          { cells: ["Proteolysis", "Proteins hydrolysed to amino acids", "Gut (digestion) and inside cells"] },
          { cells: ["Transamination", "Amino group moved from an amino acid to a keto acid", "Many tissues, especially liver and muscle"] },
          { cells: ["Deamination", "Amino group removed as ammonia", "Mainly the liver"] },
          { cells: ["Urea cycle", "Ammonia and CO₂ combined into urea, using ATP", "Liver cells only"] },
          { cells: ["Excretion of urea", "Urea filtered from the blood into urine", "Kidneys"] },
          { cells: ["Use of the carbon skeleton", "Burned in the Krebs cycle, or made into glucose or fat", "Mainly the liver"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about the breakdown of amino acids in humans is correct?",
        options: [
          "Urea is made in the kidneys and excreted by the liver",
          "Deamination removes the amino group, and the liver converts the ammonia into urea",
          "Transamination releases ammonia directly into the blood",
          "Excess amino acids are stored as protein in adipose tissue",
          "The carbon skeleton of every amino acid is converted into fat",
        ],
        steps: [
          "The amino group is removed as ammonia (deamination), and the liver turns the toxic ammonia into urea: B is correct.",
          "A swaps the organs: the liver makes urea and the kidneys excrete it. C is wrong: transamination only moves the amino group to another molecule.",
          "D is wrong: there is no protein store. E is wrong: many skeletons can become glucose or be burned in the Krebs cycle.",
        ],
        answer: "(B) Deamination removes the amino group, and the liver converts the ammonia into urea",
      },
      practiceSet: [
        { prompt: "Which organ makes urea?", answer: "The liver" },
        { prompt: "Why must ammonia be converted to urea quickly?", answer: "Ammonia is toxic, especially to the brain" },
        { prompt: "What is moved from one molecule to another in transamination?", answer: "An amino group (\\(\\mathrm{-NH_2}\\))" },
        { prompt: "Name the Krebs cycle intermediate that accepts amino groups in transamination.", answer: "α-ketoglutarate (forming glutamate)" },
      ],
      traps: [
        {
          title: "Transamination moves the amino group; deamination removes it",
          body: "Transamination passes the amino group to another molecule and frees no ammonia. Deamination takes the amino group off as ammonia, which then enters the urea cycle in the liver.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bem-pathway-sites",
      name: "Where each metabolic pathway takes place: organelle and organ",
      intuition:
        "Many questions on this chapter are answered once you know where each pathway runs. The pathways that need oxygen to finish run in mitochondria; glycolysis, which needs no oxygen, runs in the cytoplasm of every cell. A few pathways belong mainly to one organ, usually the liver.",
      definition:
        "- **Cytoplasm**: glycolysis, both fermentations, fatty acid synthesis, most of gluconeogenesis.\n" +
        "- **Mitochondrial matrix**: link reaction, Krebs cycle, β-oxidation, the first steps of the urea cycle.\n" +
        "- **Inner mitochondrial membrane**: respiratory chain and ATP synthase. So the mitochondrion is the main site of cellular respiration, but not of all of it: glycolysis is outside.\n" +
        "- **Chloroplast**: light-dependent reactions on the thylakoid membranes, Calvin cycle in the stroma.\n" +
        "- **Gluconeogenesis** is the making of new glucose from non-carbohydrates (lactate, glycerol, glucogenic amino acids). It runs mainly in the liver, and in the kidney during long fasting.\n" +
        "- **Mainly liver**: urea cycle, gluconeogenesis, ketone body formation, glycogen stored to keep blood glucose steady. Muscles store glycogen too, but only for their own use.",
      table: {
        columns: ["Pathway", "Site in the cell", "Main tissues"],
        rows: [
          { cells: ["Glycolysis", "Cytoplasm", "Every cell, including red blood cells"] },
          { cells: ["Lactic fermentation", "Cytoplasm", "Working muscle, red blood cells"] },
          { cells: ["Link reaction and Krebs cycle", "Mitochondrial matrix", "Every cell with mitochondria"] },
          { cells: ["Respiratory chain and ATP synthase", "Inner mitochondrial membrane", "Every cell with mitochondria"] },
          { cells: ["β-oxidation", "Mitochondrial matrix", "Muscle, heart and liver (the brain uses little fat)"] },
          { cells: ["Fatty acid synthesis", "Cytoplasm", "Liver and adipose tissue"] },
          { cells: ["Urea cycle", "Mitochondrial matrix and cytoplasm", "Liver only"] },
          { cells: ["Gluconeogenesis", "Mostly cytoplasm (starts in mitochondria)", "Liver, and kidney in long fasting"] },
          { cells: ["Light-dependent reactions", "Thylakoid membranes", "Green plant cells and algae"] },
          { cells: ["Calvin cycle", "Chloroplast stroma", "Green plant cells and algae"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which pair of pathways both take place in the mitochondrial matrix?",
        options: [
          "Glycolysis and the Krebs cycle",
          "Lactic fermentation and the link reaction",
          "The respiratory chain and the Calvin cycle",
          "β-oxidation and the Krebs cycle",
          "Fatty acid synthesis and glycolysis",
        ],
        steps: [
          "β-oxidation and the Krebs cycle both run in the matrix: D is correct.",
          "Glycolysis, lactic fermentation and fatty acid synthesis are in the cytoplasm (A, B, E).",
          "The respiratory chain is in the inner membrane, not the matrix, and the Calvin cycle is in chloroplasts (C).",
        ],
        answer: "(D) β-oxidation and the Krebs cycle",
      },
      practiceSet: [
        { prompt: "Where in the cell are fatty acids made?", answer: "In the cytoplasm" },
        { prompt: "Which human cells rely only on glycolysis for ATP?", answer: "Red blood cells (they have no mitochondria)" },
        { prompt: "Where in the mitochondrion is ATP synthase?", answer: "In the inner membrane" },
        { prompt: "Which organ makes new glucose from lactate after exercise?", answer: "The liver (gluconeogenesis)" },
      ],
      traps: [
        {
          title: "Respiration starts outside the mitochondrion",
          body: "Mitochondria are the main site of cellular respiration, but its first stage, glycolysis, runs in the cytoplasm. An option placing glycolysis in mitochondria is wrong; an option naming mitochondria as the site of the Krebs cycle or of respiration as a whole is right.",
        },
      ],
    },
  ],
};
