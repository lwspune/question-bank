import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_BMO_ENZYMES_NOTE: SubtopicNote = {
  subtopicName: "How Enzymes Work",
  title: "Enzymes: Catalysis, the Active Site and Cofactors",
  oneLineDefinition:
    "Enzymes are biological catalysts, mostly globular proteins, that speed up reactions by lowering the activation energy and come out of the reaction unchanged.",
  whyItMatters:
    "The ministry papers keep returning to what an enzyme is: the definition of a catalyst (2025), the main job of enzymes in metabolism (2026) and which digestive enzymes act on proteins (2025). The older papers asked where in the cell enzymes are found (2021) and what shapes an active site (2018).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-bmo-catalysts",
      name: "Enzymes as catalysts that lower the activation energy",
      intuition:
        "Most reactions in a cell would be far too slow at 37 °C, because the molecules must first be pushed over an energy barrier, the activation energy. An enzyme offers a different route with a lower barrier, so far more molecules get over it each second. It does not change where the reaction ends up, only how fast it gets there, and it is free to work again afterwards.",
      definition:
        "- A **catalyst** is a substance that increases the rate of a reaction and is found **unchanged** at the end of it.\n" +
        "- **Enzymes** are biological catalysts. Almost all are **globular proteins** (a few are RNA, called **ribozymes**).\n" +
        "- They work by lowering the **activation energy** \\(E_a\\), the energy needed to start the reaction.\n" +
        "- They do **not** change the overall energy change of the reaction, the position of equilibrium or the amount of product finally formed; they only make equilibrium arrive sooner.\n" +
        "- They are **specific** (one enzyme, one reaction or one type of substrate), work at body temperature and can be switched on and off, so the cell controls its metabolism through them.\n" +
        "- Enzymes are not consumed, so a small amount can convert a very large amount of substrate.",
      table: {
        columns: ["Quantity", "Changed by an enzyme?", "Comment"],
        rows: [
          { cells: ["Activation energy", "Yes, lowered", "This is how the enzyme speeds the reaction"] },
          { cells: ["Rate of reaction", "Yes, increased", "Often by millions of times"] },
          { cells: ["Overall energy released or taken in", "No", "Products and reactants are the same as without the enzyme"] },
          { cells: ["Position of equilibrium", "No", "Equilibrium is reached faster, not shifted"] },
          { cells: ["The enzyme itself", "No", "Unchanged at the end and used again"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which of these statements about an enzyme-catalysed reaction is/are correct? 1. The enzyme lowers the activation energy of the reaction. 2. The enzyme increases the amount of energy released by the reaction. 3. The enzyme shifts the equilibrium so that more product is formed in the end.",
        options: ["1 and 2 only", "1 only", "1, 2 and 3", "2 and 3 only", "3 only"],
        steps: [
          "Statement 1 is how every catalyst works. Correct.",
          "Statement 2: the energy released depends only on the reactants and products, which the enzyme does not change. Wrong.",
          "Statement 3: a catalyst speeds up the forward and the reverse reaction alike, so equilibrium comes sooner but in the same place. Wrong.",
        ],
        answer: "(B) 1 only",
      },
      practiceSet: [
        { prompt: "What is found unchanged at the end of a catalysed reaction?", answer: "The catalyst (the enzyme)" },
        { prompt: "Does an enzyme supply energy to the reaction it catalyses?", answer: "No: it lowers the activation energy instead" },
        { prompt: "To which class of biomolecule do almost all enzymes belong?", answer: "Proteins (globular proteins)" },
      ],
      traps: [
        {
          title: "Enzymes do not raise the temperature or supply energy",
          body: "An enzyme speeds up a reaction at the same temperature by providing a route with a lower activation energy. It gives no energy to the reaction and is not used up. Options saying it heats the mixture, supplies energy, or turns into product are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bmo-active-site",
      name: "The active site: lock-and-key and induced fit",
      intuition:
        "The active site is a small pocket on the enzyme whose shape and charges match the substrate. The substrate binds, forming an enzyme-substrate complex, the reaction happens, and the products leave. The old lock-and-key picture says the pocket is a rigid exact fit. The newer induced-fit picture says the pocket moulds itself around the substrate as it binds, and that squeeze helps break or make bonds.",
      definition:
        "- The **active site** is the region of the enzyme where the substrate binds and the reaction takes place. It is formed by a few amino acids, often far apart in the sequence, brought together by folding.\n" +
        "- **Enzyme-substrate complex**: substrate bound in the active site. Then **enzyme-product complex**, then the products are released and the enzyme is free again.\n" +
        "- **Lock-and-key model**: the active site has a fixed shape **complementary** to the substrate. It explains **specificity**.\n" +
        "- **Induced-fit model** (the current model): the active site **changes shape slightly** as the substrate binds, giving a closer fit and putting strain on the substrate's bonds, which lowers the activation energy. It also explains why some enzymes accept a small family of similar substrates.\n" +
        "- Because the shape of the active site depends on the protein's structure, anything that changes that structure (heat, pH, mutation, some inhibitors) can change the activity.",
      table: {
        columns: ["Model", "Active site before binding", "On binding", "What it explains"],
        rows: [
          { cells: ["Lock-and-key", "Rigid, exactly complementary to the substrate", "No change of shape", "Specificity"] },
          { cells: ["Induced fit", "Roughly complementary", "Moulds around the substrate, straining its bonds", "Specificity, the lowering of activation energy, broad specificity of some enzymes"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which observation supports the induced-fit model more than the lock-and-key model?",
        options: [
          "Each enzyme catalyses only one kind of reaction",
          "Enzymes are made of protein",
          "Enzyme activity falls at high temperature",
          "The shape of the active site changes as the substrate binds",
          "The enzyme is unchanged at the end of the reaction",
        ],
        steps: [
          "Specificity (A) is explained by both models; the protein nature (B), loss of activity with heat (C) and being unchanged (E) are true of enzymes under either model.",
          "Only a change of shape on binding is specific to induced fit; the lock-and-key active site is rigid.",
        ],
        answer: "(D) The shape of the active site changes as the substrate binds",
      },
      practiceSet: [
        { prompt: "What is formed when a substrate binds to the active site?", answer: "An enzyme-substrate complex" },
        { prompt: "Which model says the active site is rigid?", answer: "The lock-and-key model" },
        { prompt: "Why can a mutation far from the active site still stop an enzyme working?", answer: "It can change the folding of the chain, and so the shape of the active site" },
      ],
      traps: [
        {
          title: "The active site is not built only from neighbouring amino acids",
          body: "The amino acids that line an active site can be far apart in the primary sequence, or even on different chains. They meet only because the chain folds. That is why the higher levels of structure decide the shape of the active site.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bmo-cofactors",
      name: "Cofactors, coenzymes and prosthetic groups",
      intuition:
        "Some enzymes cannot work with their protein alone; they need a small helper bound to them. If the helper is a metal ion, it is an inorganic cofactor. If it is a small organic molecule that comes and goes, carrying atoms or electrons between reactions, it is a coenzyme. If it is bound permanently, it is a prosthetic group. Many coenzymes are made from vitamins, which is one reason vitamins are needed in the diet.",
      definition:
        "- A **cofactor** is a non-protein substance an enzyme needs in order to work.\n" +
        "- **Inorganic cofactors** are metal or other ions, often from dietary **minerals**: \\(\\mathrm{Zn^{2+}}\\) in carbonic anhydrase, \\(\\mathrm{Mg^{2+}}\\) for enzymes that use ATP, \\(\\mathrm{Cl^-}\\) activates salivary amylase.\n" +
        "- **Coenzymes** are small organic molecules that bind loosely and carry groups or electrons from one reaction to another. Many come from **B vitamins**: \\(\\mathrm{NAD^+}\\) from niacin (B3), FAD from riboflavin (B2), coenzyme A from pantothenic acid (B5).\n" +
        "- A **prosthetic group** is a cofactor bound tightly and permanently, such as the haem in catalase and the cytochromes (haem also carries oxygen in haemoglobin, which is not an enzyme).\n" +
        "- **Apoenzyme**: the protein part without its cofactor, inactive. **Holoenzyme**: apoenzyme plus cofactor, active.",
      table: {
        columns: ["Kind of helper", "How it is bound", "Example", "Dietary source"],
        rows: [
          { cells: ["Inorganic cofactor (ion)", "Bound in or near the active site", "\\(\\mathrm{Zn^{2+}}\\) in carbonic anhydrase", "Minerals"] },
          { cells: ["Coenzyme", "Loosely; moves between enzymes", "\\(\\mathrm{NAD^+}\\) carrying electrons in respiration", "Vitamins (niacin for NAD)"] },
          { cells: ["Prosthetic group", "Tightly and permanently", "Haem in catalase", "Iron from the diet for the haem"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of the following is a coenzyme?",
        options: [
          "\\(\\mathrm{NAD^+}\\)",
          "\\(\\mathrm{Zn^{2+}}\\)",
          "An apoenzyme",
          "\\(\\mathrm{Mg^{2+}}\\)",
          "\\(\\mathrm{Cl^-}\\)",
        ],
        steps: [
          "Coenzymes are small organic molecules. \\(\\mathrm{NAD^+}\\) is organic (made from the vitamin niacin) and carries electrons between enzymes.",
          "\\(\\mathrm{Zn^{2+}}\\), \\(\\mathrm{Mg^{2+}}\\) and \\(\\mathrm{Cl^-}\\) are inorganic ions: cofactors, but not coenzymes. An apoenzyme is the protein part of an enzyme, not a helper.",
        ],
        answer: "(A) \\(\\mathrm{NAD^+}\\)",
      },
      practiceSet: [
        { prompt: "What is an enzyme without its required cofactor called?", answer: "An apoenzyme (inactive)" },
        { prompt: "Which vitamin is needed to make FAD?", answer: "Riboflavin (vitamin B2)" },
        { prompt: "Which ion activates salivary amylase?", answer: "The chloride ion, \\(\\mathrm{Cl^-}\\)" },
      ],
      traps: [
        {
          title: "Every coenzyme is a cofactor, but not every cofactor is a coenzyme",
          body: "Cofactor is the general word for any non-protein helper. Coenzymes are the organic ones. A metal ion such as \\(\\mathrm{Zn^{2+}}\\) is a cofactor but never a coenzyme.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bmo-enzyme-types",
      name: "Where enzymes work, and the main enzyme classes",
      intuition:
        "Every living cell runs on enzymes, so they are found in every compartment: in the cytoplasm, the nucleus, the mitochondria and the lysosomes. Some are sent out of the cell to work outside, like the digestive enzymes. Most enzyme names end in -ase and say what they act on or what they do.",
      definition:
        "- **Intracellular** enzymes work inside the cell: glycolysis in the **cytoplasm**, DNA and RNA polymerases in the **nucleus**, Krebs cycle and respiratory chain enzymes in the **mitochondria**, hydrolytic enzymes in **lysosomes**.\n" +
        "- **Extracellular** enzymes are secreted and work outside the cell: the digestive enzymes in the gut.\n" +
        "- Names usually end in **-ase**, often after the substrate: amylase (amylose, starch), lipase (lipids), protease or peptidase (proteins, peptides), maltase, lactase.\n" +
        "- The six main classes: **oxidoreductases** (redox reactions, such as dehydrogenases), **transferases** (move a group, such as transaminases moving amino groups), **hydrolases** (break bonds with water: all digestive enzymes), **lyases** (break bonds without water), **isomerases** (rearrange a molecule into an isomer), **ligases** (join molecules using ATP, such as DNA ligase).",
      table: {
        columns: ["Enzyme", "Substrate", "Products", "Where it works"],
        rows: [
          { cells: ["Amylase", "Starch", "Maltose", "Mouth (saliva) and small intestine (from pancreas)"] },
          { cells: ["Pepsin", "Proteins", "Shorter polypeptides", "Stomach, at about pH 2"] },
          { cells: ["Trypsin and other peptidases", "Polypeptides", "Short peptides and amino acids", "Small intestine"] },
          { cells: ["Lipase", "Triglycerides", "Fatty acids and glycerol (or monoglycerides)", "Small intestine, helped by bile"] },
          { cells: ["Catalase", "Hydrogen peroxide", "Water and oxygen", "Inside cells, especially liver"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which of the following contain enzymes? 1. Saliva 2. The matrix of a mitochondrion 3. A lysosome",
        options: ["1 only", "2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
        steps: [
          "Saliva contains amylase, an extracellular enzyme.",
          "The mitochondrial matrix holds the Krebs cycle enzymes.",
          "Lysosomes are full of hydrolytic enzymes. All three contain enzymes.",
          "Options that leave out saliva forget that enzymes also work outside cells.",
        ],
        answer: "(E) 1, 2 and 3",
      },
      practiceSet: [
        { prompt: "To which enzyme class do all digestive enzymes belong?", answer: "Hydrolases" },
        { prompt: "Which enzyme digests proteins in the stomach?", answer: "Pepsin (a protease)" },
        { prompt: "What does a transaminase do?", answer: "It transfers an amino group from one molecule to another (a transferase)" },
        { prompt: "Name an enzyme that works inside the nucleus.", answer: "DNA polymerase (or RNA polymerase)" },
      ],
      traps: [
        {
          title: "Amylase digests starch, peptidases digest proteins, lipase digests fats",
          body: "The name tells you the substrate. A protein is broken down by proteases and peptidases, not by amylase or lipase. Isomerases and transaminases are not digestive enzymes at all: they rearrange molecules or move amino groups inside cells.",
        },
      ],
    },
  ],
};
