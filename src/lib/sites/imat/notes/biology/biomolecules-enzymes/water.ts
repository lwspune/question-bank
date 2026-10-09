import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_BMO_WATER_NOTE: SubtopicNote = {
  subtopicName: "Water and Biomolecule Basics",
  title: "Water, the Elements of Life and Condensation",
  oneLineDefinition:
    "Water is a polar molecule held to its neighbours by hydrogen bonds; the big molecules of life are built from small units by condensation and broken down by hydrolysis.",
  whyItMatters:
    "Hydrogen bonds were asked in 2012 and again in the 2024 ministry paper. The older papers also asked which molecules contain which elements and groups (2012, 2013, 2019), and they liked a formula to work out after water is removed (2011, 2021).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-bmo-hydrogen-bond",
      name: "Polar water and the hydrogen bond",
      intuition:
        "Oxygen pulls the shared electrons of each O-H bond towards itself, so the oxygen end of water is slightly negative and the hydrogen ends are slightly positive. The slightly positive hydrogen of one molecule is then attracted to the slightly negative oxygen of the next. That attraction is the hydrogen bond: much weaker than a covalent bond, and constantly breaking and re-forming.",
      definition:
        "**Polarity**: oxygen is much more **electronegative** than hydrogen, so water has a partial negative charge \\(\\delta^-\\) on O and partial positive charges \\(\\delta^+\\) on each H. The molecule is bent (about 104.5°), so the charges do not cancel.\n" +
        "- A **hydrogen bond** is the attraction between a hydrogen atom that is covalently bonded to O or N (or F) and a lone pair on an O or N atom of **another** molecule (or a distant part of the same large molecule).\n" +
        "- It is **weak** (roughly twenty times weaker than the O-H covalent bond) and **temporary**: in liquid water hydrogen bonds break and re-form all the time.\n" +
        "- One water molecule can hydrogen bond to up to **four** neighbours.\n" +
        "- Hydrogen bonds also hold the two strands of DNA together and hold the secondary structure of proteins.",
      table: {
        columns: ["Bond or attraction", "Between", "Strength", "Example in biology"],
        rows: [
          { cells: ["Covalent bond", "Atoms sharing electrons inside one molecule", "Strong", "O-H inside a water molecule; C-C in a sugar"] },
          { cells: ["Ionic bond", "Oppositely charged ions or charged R groups", "Strong when dry, weaker in water", "Between charged R groups in a folded protein"] },
          { cells: ["Hydrogen bond", "H on O or N, and an O or N of another molecule", "Weak, temporary", "Between water molecules; DNA base pairs"] },
          { cells: ["Hydrophobic interaction", "Non-polar groups clustering away from water", "Weak", "Fatty acid tails inside a membrane"] },
        ],
        caption: "Only the covalent bond lies inside a water molecule. The hydrogen bond lies between molecules.",
      },
      selfCheckExample: {
        prompt:
          "Which of these statements about hydrogen bonds is/are correct? 1. A single water molecule can form hydrogen bonds with up to four other water molecules. 2. Hydrogen bonds hold the paired bases of the two DNA strands together. 3. Hydrogen bonds form between neighbouring methane (\\(\\mathrm{CH_4}\\)) molecules.",
        options: ["1 and 2 only", "1 only", "2 and 3 only", "1, 2 and 3", "3 only"],
        steps: [
          "Statement 1: each water has two H atoms to give and two lone pairs on O to receive, so up to four hydrogen bonds. Correct.",
          "Statement 2: base pairs (A with T, G with C) are held by hydrogen bonds. Correct.",
          "Statement 3: in methane H is bonded to carbon, which is not electronegative enough, and carbon has no lone pair. No hydrogen bonds. Wrong.",
          "So 1 and 2 only. Options containing 3 forget that the H must be attached to O or N.",
        ],
        answer: "(A) 1 and 2 only",
      },
      practiceSet: [
        { prompt: "Is the bond between O and H inside one water molecule a hydrogen bond?", answer: "No, it is a covalent bond", method: "Hydrogen bonds are between molecules" },
        { prompt: "Which end of a water molecule carries the partial negative charge?", answer: "The oxygen end", method: "O is more electronegative than H" },
        { prompt: "Are hydrogen bonds strong or weak compared with covalent bonds?", answer: "Weak, and temporary", method: "About twenty times weaker" },
      ],
      traps: [
        {
          title: "The O-H bond inside water is not a hydrogen bond",
          body: "Inside one water molecule, O and H share electrons in a covalent bond. The hydrogen bond is the weaker attraction between the H of one molecule and the O (or N) of another. An option calling the internal O-H bond a hydrogen bond is wrong.",
        },
        {
          title: "Hydrogen bonds do not need hydrolysis to break",
          body: "Hydrolysis breaks covalent bonds by adding water (a glycosidic, peptide or ester bond). Hydrogen bonds are broken simply by heat or movement, without any chemical reaction.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bmo-water-properties",
      name: "Properties of water that matter for life",
      intuition:
        "Almost every special property of water comes from its hydrogen bonds. To heat water up or to evaporate it, you must first break many hydrogen bonds, so water resists changes of temperature. Its polarity lets it surround charged and polar particles, which is why it dissolves so much.",
      definition:
        "- **Solvent**: water dissolves ions and polar molecules (they are **hydrophilic**); non-polar molecules such as fats are **hydrophobic** and do not dissolve. Most reactions in cells happen in solution.\n" +
        "- **High specific heat capacity** (about \\(4.2\\ \\text{J g}^{-1}\\ ^\\circ\\text{C}^{-1}\\)): a lot of energy is needed to raise its temperature, so the body and lakes stay at a steady temperature.\n" +
        "- **High latent heat of vaporisation**: evaporating a little water removes a lot of heat, so sweating and transpiration cool.\n" +
        "- **Cohesion** (water to water) gives high **surface tension** and lets columns of water be pulled up the xylem; **adhesion** (water to other surfaces) gives capillary rise.\n" +
        "- **Density**: water is densest at about 4 °C, and ice is less dense than liquid water, so ice floats and insulates the water beneath it.",
      table: {
        columns: ["Property", "Cause", "Why it matters to living things"],
        rows: [
          { cells: ["Good solvent for polar and ionic substances", "Polar molecule surrounds ions", "Transport in blood and sap; reactions in cytoplasm"] },
          { cells: ["High specific heat capacity", "Energy goes into breaking hydrogen bonds", "Stable body and habitat temperature"] },
          { cells: ["High latent heat of vaporisation", "Many hydrogen bonds break on evaporation", "Cooling by sweating and transpiration"] },
          { cells: ["Cohesion and surface tension", "Hydrogen bonds between water molecules", "Water columns in xylem; insects walk on ponds"] },
          { cells: ["Ice less dense than liquid water", "Hydrogen bonds hold ice in an open lattice", "Ice floats and insulates; lakes do not freeze solid"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which property of water best explains why sweating cools the body?",
        options: [
          "Its high specific heat capacity",
          "Its cohesion",
          "Its ability to dissolve salts",
          "Its high latent heat of vaporisation",
          "Its maximum density at about 4 °C",
        ],
        steps: [
          "Sweat cools only when it evaporates. Evaporating each gram takes a large amount of heat from the skin: that is the latent heat of vaporisation.",
          "Option A is the tempting neighbour: specific heat capacity is about warming liquid water without a change of state, which keeps temperature steady but is not the cooling of sweating.",
          "Cohesion, dissolving salts and the density maximum have nothing to do with evaporative cooling.",
        ],
        answer: "(D) Its high latent heat of vaporisation",
      },
      practiceSet: [
        { prompt: "Why does a lake freeze from the top down?", answer: "Ice is less dense than liquid water, so it floats", method: "Hydrogen bonds hold ice in an open lattice" },
        { prompt: "Name the property that lets water be pulled up a tall tree in an unbroken column.", answer: "Cohesion (with adhesion to the xylem walls)" },
        { prompt: "Will olive oil dissolve in water?", answer: "No, oil is non-polar (hydrophobic)" },
        { prompt: "Which property keeps the temperature of a large body of water steady through the day?", answer: "High specific heat capacity" },
      ],
      traps: [
        {
          title: "Heat capacity and latent heat are different properties",
          body: "Specific heat capacity is the energy to warm water by one degree, and keeps temperatures steady. Latent heat of vaporisation is the energy to turn liquid into vapour, and is what makes sweating and transpiration cool. IMAT puts both among the options.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bmo-classes",
      name: "The four classes of biological molecules and their elements",
      intuition:
        "Carbohydrates, lipids, proteins and nucleic acids are all built mainly from carbon, hydrogen and oxygen. What sets them apart is the extra elements and the small groups of atoms they carry. Knowing those groups lets you answer questions that ask which molecule contains nitrogen, or which has a carboxyl group.",
      definition:
        "- **Carbohydrates** contain C, H and O only (general formula of a simple sugar \\(\\mathrm{(CH_2O)}_n\\)). Many hydroxyl (OH) groups.\n" +
        "- **Lipids** contain C, H and O, with much less O than carbohydrates. Phospholipids add P (and often N).\n" +
        "- **Proteins** contain C, H, O and N, and usually S (in the amino acids cysteine and methionine).\n" +
        "- **Nucleic acids** contain C, H, O, N and P.\n" +
        "- Key groups: **carboxyl** \\(\\mathrm{-COOH}\\) (acidic) in every amino acid and every fatty acid; **amino** \\(\\mathrm{-NH_2}\\) in every amino acid; **hydroxyl** \\(\\mathrm{-OH}\\): many on sugars, three on glycerol.\n" +
        "- Water (H and O) is not a biomolecule polymer, but it takes part in building and breaking all of them.",
      table: {
        columns: ["Class", "Elements", "Building block", "Bond joining blocks"],
        rows: [
          { cells: ["Carbohydrates", "C, H, O", "Monosaccharide (for example glucose)", "Glycosidic bond"] },
          { cells: ["Lipids (triglycerides)", "C, H, O (phospholipids also P)", "Glycerol and fatty acids", "Ester bond"] },
          { cells: ["Proteins", "C, H, O, N, often S", "Amino acid", "Peptide bond"] },
          { cells: ["Nucleic acids", "C, H, O, N, P", "Nucleotide", "Phosphodiester bond"] },
        ],
        caption: "Lipids are not true polymers: a triglyceride is one glycerol with three fatty acids, not a long chain of repeating units.",
      },
      selfCheckExample: {
        prompt: "Which one of the following molecules always contains nitrogen?",
        options: ["A triglyceride", "An amino acid", "Sucrose", "Cholesterol", "Glycogen"],
        steps: [
          "Every amino acid has an amino group, \\(\\mathrm{-NH_2}\\), so it always contains nitrogen.",
          "Triglycerides, cholesterol (a lipid) and the carbohydrates sucrose and glycogen contain only C, H and O.",
        ],
        answer: "(B) An amino acid",
      },
      practiceSet: [
        { prompt: "Which two classes of biomolecule always contain nitrogen?", answer: "Proteins and nucleic acids" },
        { prompt: "Which element is found in nucleic acids but not in proteins?", answer: "Phosphorus" },
        { prompt: "How many hydroxyl groups does glycerol carry?", answer: "Three" },
        { prompt: "Name a group found in every amino acid and in every fatty acid.", answer: "The carboxyl group, \\(\\mathrm{-COOH}\\)" },
      ],
      traps: [
        {
          title: "Glycerol is an alcohol, not an acid",
          body: "Glycerol carries three hydroxyl groups and no carboxyl group. The carboxyl groups in a triglyceride come from the fatty acids. Options giving glycerol a carboxyl group, or no hydroxyl groups, are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-bmo-condensation",
      name: "Condensation and hydrolysis: building and breaking polymers",
      intuition:
        "To join two building blocks, the cell takes an OH from one and an H from the other. These leave together as a water molecule, and a new covalent bond joins the blocks. Breaking that bond again needs a water molecule to be put back. So the formula of a chain is the sum of its blocks minus one water for every bond made.",
      definition:
        "- **Condensation**: two molecules join by a covalent bond and **release** one water molecule.\n" +
        "- **Hydrolysis**: a covalent bond is broken by **adding** one water molecule. It is the reverse of condensation.\n" +
        "- A chain of \\(n\\) units has \\(n-1\\) bonds, so making it releases \\(n-1\\) water molecules, and breaking it completely uses \\(n-1\\).\n" +
        "- A triglyceride is the exception to the chain rule: one glycerol with three fatty acids makes three ester bonds, so three water molecules.\n" +
        "- Digestion is hydrolysis; building starch, proteins and DNA in a cell is condensation.",
      formula: {
        label: "Formula of a chain of n identical units",
        latex: "\\text{chain} = n \\times (\\text{unit}) - (n-1)\\,\\mathrm{H_2O}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of units joined in one unbranched chain" },
          { symbol: "\\(n-1\\)", meaning: "number of bonds made, and of water molecules released" },
        ],
      },
      authoredExample: {
        prompt:
          "Three glucose molecules \\((\\mathrm{C_6H_{12}O_6})\\) join in a short chain. What is the molecular formula of the product, and how many water molecules are released?",
        steps: [
          "Three units in a chain need two bonds, so two water molecules are released.",
          "Add the units: \\(3 \\times \\mathrm{C_6H_{12}O_6} = \\mathrm{C_{18}H_{36}O_{18}}\\).",
          "Remove two waters \\((\\mathrm{H_4O_2})\\): \\(\\mathrm{C_{18}H_{32}O_{16}}\\).",
        ],
        answer: "\\(\\mathrm{C_{18}H_{32}O_{16}}\\), with 2 water molecules released",
      },
      selfCheckExample: {
        prompt:
          "The amino acid glycine has the formula \\(\\mathrm{C_2H_5NO_2}\\). Three glycine molecules join by condensation into a single chain. What is the formula of the product?",
        options: [
          "\\(\\mathrm{C_6H_{15}N_3O_6}\\)",
          "\\(\\mathrm{C_6H_{13}N_3O_5}\\)",
          "\\(\\mathrm{C_6H_9N_3O_3}\\)",
          "\\(\\mathrm{C_2H_5NO_2}\\)",
          "\\(\\mathrm{C_6H_{11}N_3O_4}\\)",
        ],
        steps: [
          "Three units: \\(\\mathrm{C_6H_{15}N_3O_6}\\). Three units in a chain make two bonds, so remove two waters \\((\\mathrm{H_4O_2})\\).",
          "\\(\\mathrm{C_6H_{15}N_3O_6} - \\mathrm{H_4O_2} = \\mathrm{C_6H_{11}N_3O_4}\\).",
          "Option A removes no water, B removes only one, and C removes three (one per unit instead of one per bond).",
        ],
        answer: "(E) \\(\\mathrm{C_6H_{11}N_3O_4}\\)",
      },
      practiceSet: [
        { prompt: "How many water molecules are released when ten glucose units join in one unbranched chain?", answer: "9", method: "\\(n-1\\) bonds" },
        { prompt: "How many water molecules are needed to hydrolyse a six-unit chain completely?", answer: "5", method: "One per bond" },
        { prompt: "Two glucose molecules join. Give the formula and the relative molecular mass of the product (glucose = 180, water = 18).", answer: "\\(\\mathrm{C_{12}H_{22}O_{11}}\\), 342", method: "\\(2 \\times 180 - 18\\)" },
      ],
      traps: [
        {
          title: "One water per bond, not one per unit",
          body: "A chain of \\(n\\) units has \\(n-1\\) bonds, so \\(n-1\\) waters leave. Removing \\(n\\) waters (one for each unit) is the commonest wrong option in formula questions.",
        },
        {
          title: "Breaking a molecule into its parts releases no water",
          body: "Splitting a polymer, a triglyceride or a phospholipid into its building blocks is hydrolysis: water is used up, one molecule per bond broken. The number of water molecules released is zero. It is condensation, the building direction, that releases water.",
        },
      ],
    },
  ],
};
