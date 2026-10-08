import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_BEM_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Metabolism, ATP and Redox",
  title: "Metabolism, ATP and the Electron Carriers",
  oneLineDefinition:
    "Catabolism breaks molecules down and releases energy, anabolism builds them and uses it; ATP carries the energy between the two, and NAD⁺, FAD and NADP⁺ carry the electrons.",
  whyItMatters:
    "The ministry papers ask these as one-line facts: what metabolism includes (2026), the role of carbohydrates in catabolism (2026), the cell's energy currency and the type of reaction ATP hydrolysis is (2024), what exergonic means and which phosphate reserve muscles keep (2025), and what a redox reaction is (2023). Older papers asked which molecules are respiratory enzymes and which process is catabolic.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-bem-metabolism",
      name: "Metabolism: catabolism and anabolism, exergonic and endergonic",
      intuition:
        "Metabolism is every chemical reaction in a living cell. Some reactions break big molecules into small ones and release energy (catabolism); others build big molecules from small ones and need energy (anabolism). ATP links the two: catabolism makes it, anabolism spends it.",
      definition:
        "**Metabolism** is the sum of all chemical reactions in an organism. It happens in every living cell: plant, animal, fungal and bacterial.\n" +
        "- **Catabolism**: large molecules are broken into smaller ones, mostly by oxidation and hydrolysis. Overall it releases energy. Examples: glycolysis, the Krebs cycle, digestion, the oxidation of NADH.\n" +
        "- **Anabolism**: small molecules are built into larger ones, mostly by reduction and condensation. Overall it needs energy. Examples: protein synthesis, DNA replication, photosynthesis, glycogen synthesis.\n" +
        "- An **exergonic** reaction releases free energy (\\(\\Delta G < 0\\)) and is **spontaneous**: it can go on without an energy input.\n" +
        "- An **endergonic** reaction needs an input of free energy (\\(\\Delta G > 0\\)). Cells drive it by **coupling** it to an exergonic reaction, usually the hydrolysis of ATP.\n" +
        "- Carbohydrates are the main fuel of catabolism: they are broken down to release energy for cell work, and they are also stored (glycogen, starch) and used as building material.",
      table: {
        columns: ["Feature", "Catabolism", "Anabolism"],
        rows: [
          { cells: ["What happens", "Large molecules are broken into smaller ones", "Small molecules are built into larger ones"] },
          { cells: ["Energy overall", "Released (exergonic)", "Required (endergonic)"] },
          { cells: ["Typical chemistry", "Oxidation, hydrolysis", "Reduction, condensation"] },
          { cells: ["Link with ATP", "The energy released is used to make ATP from ADP", "ATP hydrolysis supplies the energy"] },
          { cells: ["Electron carriers", "NAD⁺ and FAD are reduced", "NADPH is oxidised (it gives up its electrons)"] },
          { cells: ["Examples", "Glycolysis, Krebs cycle, β-oxidation of fat, digestion", "Protein synthesis, DNA replication, Calvin cycle, glycogen synthesis"] },
        ],
        caption: "How fast a spontaneous reaction actually goes depends on enzymes, which the Biomolecules and Enzymes chapter covers.",
      },
      selfCheckExample: {
        prompt: "Which of the following is an example of anabolism in a healthy human cell?",
        options: [
          "Breakdown of glycogen to glucose in the liver",
          "Synthesis of glycogen from glucose in a muscle cell",
          "Oxidation of pyruvate in the mitochondria",
          "Hydrolysis of ATP to ADP and phosphate",
          "Removal of two-carbon units from a fatty acid",
        ],
        steps: [
          "Anabolism builds larger molecules from smaller ones and uses energy.",
          "Joining many glucose units into glycogen is a synthesis, so it is anabolic.",
          "Options A, C, D and E all break a molecule into smaller pieces or oxidise it: they are catabolic.",
        ],
        answer: "(B) Synthesis of glycogen from glucose in a muscle cell",
      },
      practiceSet: [
        { prompt: "Is the joining of amino acids into a protein anabolic or catabolic?", answer: "Anabolic", method: "Small molecules built into a large one" },
        { prompt: "A reaction has \\(\\Delta G = -20\\ \\text{kJ/mol}\\). Is it exergonic or endergonic?", answer: "Exergonic", method: "Negative \\(\\Delta G\\) means free energy is released" },
        { prompt: "Does metabolism happen only in animal cells?", answer: "No: in all living cells, including plants, fungi and bacteria" },
        { prompt: "What does a cell usually couple to an endergonic reaction to make it go?", answer: "The hydrolysis of ATP, an exergonic reaction" },
      ],
      traps: [
        {
          title: "Spontaneous does not mean fast",
          body: "An exergonic reaction is spontaneous: it releases energy and needs no energy input to proceed. That says nothing about its speed. Many exergonic reactions are extremely slow until an enzyme lowers the activation energy.",
        },
        {
          title: "Metabolism is both breaking down and building up",
          body: "Options that limit metabolism to synthesis, to animal cells, or to reactions in light are wrong. Metabolism is all the reactions of a cell, catabolic and anabolic together.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bem-atp",
      name: "ATP: structure, hydrolysis and the cell's energy currency",
      intuition:
        "A cell cannot use the energy of glucose directly for each job. It moves that energy in small packets into ATP, which every energy-using process accepts, like a currency. Hydrolysing ATP to ADP releases a convenient amount of energy, and the ADP is then recharged.",
      definition:
        "**ATP** (adenosine triphosphate) is a nucleotide: the base **adenine**, the five-carbon sugar **ribose**, and **three phosphate groups**. Adenine plus ribose is called adenosine.\n" +
        "- **ATP hydrolysis**: \\(\\mathrm{ATP + H_2O \\rightarrow ADP + P_i}\\). It is **exergonic**: about \\(-30.5\\ \\text{kJ/mol}\\) under standard conditions, and more in a real cell. It is a hydrolysis, not a condensation and not a redox reaction.\n" +
        "- The energy is released because the products are more stable than ATP. Breaking any bond on its own absorbs energy, so a \"high-energy bond\" is only shorthand.\n" +
        "- ATP is made from ADP and phosphate in three ways: **substrate-level phosphorylation** (a phosphate passed directly from a substrate, in glycolysis and the Krebs cycle), **oxidative phosphorylation** (mitochondria) and **photophosphorylation** (chloroplasts).\n" +
        "- ATP is not stored in large amounts; each molecule is recycled many times a minute. Muscles keep **creatine phosphate** as a quick reserve: it passes its phosphate to ADP to remake ATP during the first seconds of intense effort.",
      table: {
        columns: ["Molecule", "What it is", "Role"],
        rows: [
          { cells: ["ATP", "Adenine + ribose + 3 phosphates", "Universal energy currency: its hydrolysis powers muscle contraction, active transport and biosynthesis"] },
          { cells: ["ADP", "Adenine + ribose + 2 phosphates", "Product of ATP hydrolysis; recharged to ATP by phosphorylation"] },
          { cells: ["AMP", "Adenine + ribose + 1 phosphate", "Signals that the cell is low on energy; also a nucleotide of RNA"] },
          { cells: ["Creatine phosphate", "Creatine carrying a phosphate group", "Muscle reserve that regenerates ATP from ADP for a few seconds"] },
          { cells: ["NADH, FADH₂", "Reduced electron carriers", "Carry energy as electrons to the respiratory chain; not spent directly like ATP"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which components make up one molecule of ATP?",
        options: [
          "Adenine, deoxyribose and three phosphate groups",
          "Adenine, ribose and two phosphate groups",
          "Adenine, glucose and three phosphate groups",
          "Adenine, ribose and three phosphate groups",
          "Adenosine, ribose and three phosphate groups",
        ],
        steps: [
          "ATP is adenosine (adenine + ribose) with three phosphates.",
          "A uses the DNA sugar; B is ADP; C uses the wrong sugar.",
          "E counts the ribose twice, because adenosine already contains it.",
        ],
        answer: "(D) Adenine, ribose and three phosphate groups",
      },
      practiceSet: [
        { prompt: "Name the sugar in ATP.", answer: "Ribose (a five-carbon sugar)" },
        { prompt: "What are the products of ATP hydrolysis?", answer: "ADP and inorganic phosphate (\\(\\mathrm{P_i}\\))" },
        { prompt: "Which compound regenerates ATP in a sprinter's muscle during the first few seconds?", answer: "Creatine phosphate" },
        { prompt: "What is ATP synthesis called when the phosphate is passed directly from a substrate molecule?", answer: "Substrate-level phosphorylation" },
      ],
      traps: [
        {
          title: "NADH and FADH₂ are not the energy currency",
          body: "ATP is the currency that cell processes spend. NADH, FADH₂ and NADPH are electron carriers: their energy becomes usable only after they pass their electrons on, for example to the respiratory chain that makes ATP.",
        },
        {
          title: "Creatine phosphate, creatinine and carnitine are different molecules",
          body: "Creatine phosphate is the phosphate reserve in muscle. Creatinine is its waste product, excreted in urine. Carnitine carries fatty acids into mitochondria. The names look alike, and options use that.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bem-redox-carriers",
      name: "Redox reactions and the carriers NAD⁺, FAD and NADP⁺",
      intuition:
        "When food is oxidised, its electrons do not float around loose. Carrier molecules pick them up, usually together with hydrogen, and become reduced. A reduced carrier is like a charged battery: it takes the energy to the place where ATP is made, or to a reaction that needs electrons.",
      definition:
        "- **Oxidation** is the loss of electrons (often a loss of hydrogen or a gain of oxygen). **Reduction** is the gain of electrons (often a gain of hydrogen). Memory aid: OIL RIG.\n" +
        "- The two always happen together: the molecule that loses electrons is oxidised, the one that gains them is reduced. Biological oxidations that remove hydrogen are catalysed by **dehydrogenases**.\n" +
        "- **NAD⁺** accepts two electrons and one proton to become **NADH** (written NADH + H⁺, since a second proton goes into solution). It is used in glycolysis, the link reaction and the Krebs cycle.\n" +
        "- **FAD** accepts two electrons and two protons to become **FADH₂**, in the Krebs cycle and fat breakdown.\n" +
        "- **NADP⁺** is reduced to **NADPH** in the light-dependent reactions of photosynthesis. NADPH is the reducing carrier of anabolism (Calvin cycle, fatty acid synthesis).\n" +
        "- These carriers are **coenzymes**, made from B vitamins. They are not enzymes: they work with enzymes.",
      table: {
        columns: ["Carrier (oxidised → reduced)", "Main pathways", "Where its electrons go", "Vitamin source"],
        rows: [
          { cells: ["NAD⁺ → NADH", "Glycolysis, link reaction, Krebs cycle, β-oxidation", "Complex I of the respiratory chain", "Niacin (vitamin B3)"] },
          { cells: ["FAD → FADH₂", "Krebs cycle (succinate step), β-oxidation", "Complex II, then the rest of the chain", "Riboflavin (vitamin B2)"] },
          { cells: ["NADP⁺ → NADPH", "Made in the light-dependent reactions; used in the Calvin cycle and fat synthesis", "Onto carbon compounds being built (biosynthesis)", "Niacin (vitamin B3)"] },
          { cells: ["Coenzyme A", "Link reaction, Krebs cycle, β-oxidation", "Carries acetyl groups, not electrons", "Pantothenic acid (vitamin B5)"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "In the Krebs cycle, malate reacts as follows: malate + \\(\\mathrm{NAD^+}\\) \\(\\rightarrow\\) oxaloacetate + \\(\\mathrm{NADH + H^+}\\). Which statement is correct?",
        options: [
          "Malate is oxidised and \\(\\mathrm{NAD^+}\\) is reduced",
          "Malate is reduced and \\(\\mathrm{NAD^+}\\) is oxidised",
          "Both malate and \\(\\mathrm{NAD^+}\\) are oxidised",
          "\\(\\mathrm{NAD^+}\\) is the enzyme that catalyses the reaction",
          "No electrons are transferred; only protons move",
        ],
        steps: [
          "\\(\\mathrm{NAD^+}\\) gains electrons (with hydrogen) and becomes NADH, so it is reduced.",
          "Those electrons came from malate, so malate is oxidised.",
          "B reverses the roles. D confuses a coenzyme with an enzyme (here malate dehydrogenase). E ignores that NADH carries two electrons.",
        ],
        answer: "(A) Malate is oxidised and \\(\\mathrm{NAD^+}\\) is reduced",
      },
      practiceSet: [
        { prompt: "A molecule gains electrons. Is it oxidised or reduced?", answer: "Reduced" },
        { prompt: "Which carrier is reduced in the light-dependent reactions of photosynthesis?", answer: "\\(\\mathrm{NADP^+}\\), forming NADPH" },
        { prompt: "Is FAD an enzyme?", answer: "No, it is a coenzyme (an electron carrier)" },
        { prompt: "Which reduced carrier hands its electrons to complex I of the respiratory chain?", answer: "NADH" },
      ],
      traps: [
        {
          title: "Coenzymes are not enzymes",
          body: "\\(\\mathrm{NAD^+}\\), NADH, FAD, coenzyme A and acetyl coenzyme A are carriers, not enzymes. The enzymes in these steps are the dehydrogenases and synthases. An option calling any of these carriers a respiratory enzyme is wrong.",
        },
        {
          title: "A redox reaction is defined by moving electrons",
          body: "To spot a redox reaction, ask whether electrons pass from one molecule to another. Hydrolysis, condensation (such as joining two sugars) and base pairing move no electrons between molecules, so they are not redox reactions; reducing NAD⁺ to NADH is.",
        },
      ],
    },
  ],
};
