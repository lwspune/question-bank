import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_INO_CLASSES_NOTE: SubtopicNote = {
  subtopicName: "Classes of Inorganic Compounds",
  title: "Oxides, Hydroxides, Acids, Hydrides and Salts",
  oneLineDefinition:
    "Inorganic compounds fall into a few families; metal oxides make bases, non-metal oxides make acids, and acids with bases make salts.",
  whyItMatters:
    "The most asked page of the chapter. The papers asked to sort oxides into acidic, basic and amphoteric (2014, 2015), to pick the oxide that gives a hydroxide with water (2024), to recognise a gaseous acidic oxide (2023), and to name the class of an acid (2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-ino-oxides",
      name: "Basic, acidic, amphoteric and neutral oxides",
      intuition:
        "Metals hold their electrons loosely, so in an oxide the oxygen is present as the oxide ion, which grabs \\(\\mathrm{H^+}\\): a base. Non-metals share electrons with oxygen covalently, and the oxide pulls on water's oxygen to release \\(\\mathrm{H^+}\\): an acid. Elements on the border between metals and non-metals do a bit of both.",
      definition:
        "- **Basic oxides**: oxides of metals, especially Groups 1 and 2. They react with acids to form a salt and water; the soluble ones dissolve in water to give **hydroxides** (alkalis).\n" +
        "- **Acidic oxides**: oxides of non-metals (and of metals in high oxidation states, such as \\(\\mathrm{Mn_2O_7}\\)). They react with bases; the soluble ones dissolve in water to give **oxoacids**. In traditional naming they are **anhydrides**: \\(\\mathrm{CO_2}\\) is carbonic anhydride, \\(\\mathrm{SO_3}\\) sulfuric anhydride.\n" +
        "- **Amphoteric oxides** react with **both** acids and bases: \\(\\mathrm{Al_2O_3}\\), ZnO, PbO, BeO.\n" +
        "- **Neutral oxides** react with neither: CO, NO, \\(\\mathrm{N_2O}\\).\n" +
        "- Across period 3 the oxides go from basic (\\(\\mathrm{Na_2O}\\), MgO) to amphoteric (\\(\\mathrm{Al_2O_3}\\)) to acidic (\\(\\mathrm{SiO_2}\\), \\(\\mathrm{P_4O_{10}}\\), \\(\\mathrm{SO_3}\\), \\(\\mathrm{Cl_2O_7}\\)).",
      table: {
        columns: ["Type", "Formed by", "Behaviour", "Examples"],
        rows: [
          { cells: ["Basic", "Metals, especially Groups 1 and 2", "Neutralises acids; with water gives a hydroxide", "\\(\\mathrm{Na_2O}\\), \\(\\mathrm{K_2O}\\), CaO, MgO, CuO"] },
          { cells: ["Acidic", "Non-metals", "Neutralises bases; with water gives an oxoacid", "\\(\\mathrm{CO_2}\\), \\(\\mathrm{SO_2}\\), \\(\\mathrm{SO_3}\\), \\(\\mathrm{NO_2}\\), \\(\\mathrm{P_4O_{10}}\\), \\(\\mathrm{SiO_2}\\)"] },
          { cells: ["Amphoteric", "Metals near the metal and non-metal border", "Reacts with both acids and bases", "\\(\\mathrm{Al_2O_3}\\), ZnO, PbO"] },
          { cells: ["Neutral", "A few non-metals", "Reacts with neither acids nor bases", "CO, NO, \\(\\mathrm{N_2O}\\)"] },
        ],
        caption: "Silicon dioxide is acidic although it does not dissolve in water: it reacts with hot concentrated alkali.",
      },
      selfCheckExample: {
        prompt: "Which one of these oxides is amphoteric?",
        options: [
          "\\(\\mathrm{Na_2O}\\)",
          "ZnO",
          "\\(\\mathrm{SO_3}\\)",
          "CO",
          "CaO",
        ],
        steps: [
          "Zinc oxide dissolves in acids (giving zinc salts) and in strong alkalis: it is amphoteric.",
          "\\(\\mathrm{Na_2O}\\) and CaO are basic; \\(\\mathrm{SO_3}\\) is acidic; CO is neutral.",
        ],
        answer: "(B) ZnO",
      },
      practiceSet: [
        { prompt: "Is \\(\\mathrm{P_4O_{10}}\\) acidic or basic?", answer: "Acidic", method: "Non-metal oxide" },
        { prompt: "Name a neutral oxide of nitrogen.", answer: "NO (or \\(\\mathrm{N_2O}\\))", method: "Neither acidic nor basic" },
        { prompt: "What is the traditional name of \\(\\mathrm{CO_2}\\) as an acidic oxide?", answer: "Carbonic anhydride", method: "Anhydride of carbonic acid" },
      ],
      traps: [
        {
          title: "Not every non-metal oxide is acidic",
          body: "CO, NO and \\(\\mathrm{N_2O}\\) are neutral: they do not form acids in water. Most other non-metal oxides are acidic, including \\(\\mathrm{NO_2}\\), which reacts with water to give nitric acid.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ino-oxide-water",
      name: "Oxides with water: hydroxides and oxoacids",
      intuition:
        "Adding water to an oxide just adds the atoms of water to it. A metal oxide becomes a metal hydroxide. A non-metal oxide becomes an acid in which the non-metal keeps exactly the same oxidation number, which is the quickest way to find which acid you get.",
      definition:
        "- **Basic oxide + water** gives a **hydroxide**: \\(\\mathrm{Na_2O + H_2O \\rightarrow 2NaOH}\\), \\(\\mathrm{CaO + H_2O \\rightarrow Ca(OH)_2}\\).\n" +
        "- **Acidic oxide + water** gives an **oxoacid**: \\(\\mathrm{SO_3 + H_2O \\rightarrow H_2SO_4}\\), \\(\\mathrm{CO_2 + H_2O \\rightarrow H_2CO_3}\\), \\(\\mathrm{N_2O_5 + H_2O \\rightarrow 2HNO_3}\\).\n" +
        "- The non-metal's **oxidation number does not change**: S is \\(+4\\) in \\(\\mathrm{SO_2}\\) and in \\(\\mathrm{H_2SO_3}\\); \\(+6\\) in \\(\\mathrm{SO_3}\\) and in \\(\\mathrm{H_2SO_4}\\).\n" +
        "- Method: write oxide + \\(\\mathrm{H_2O}\\), add up the atoms, and if the non-metal appears twice, split the result into two acid molecules.",
      formula: {
        label: "Oxides and water",
        latex: "\\text{metal oxide} + \\mathrm{H_2O} \\rightarrow \\text{hydroxide} \\qquad \\text{non-metal oxide} + \\mathrm{H_2O} \\rightarrow \\text{oxoacid}",
      },
      authoredExample: {
        prompt: "Write the products when (a) potassium oxide and (b) dichlorine heptoxide, \\(\\mathrm{Cl_2O_7}\\), react with water.",
        steps: [
          "(a) \\(\\mathrm{K_2O + H_2O \\rightarrow 2KOH}\\): a basic oxide gives the hydroxide.",
          "(b) Cl in \\(\\mathrm{Cl_2O_7}\\): \\(2x - 14 = 0\\), so \\(x = +7\\).",
          "Add the atoms: \\(\\mathrm{Cl_2O_7 + H_2O}\\) gives \\(\\mathrm{H_2Cl_2O_8}\\), which is two molecules of \\(\\mathrm{HClO_4}\\).",
          "Check: in \\(\\mathrm{HClO_4}\\), \\(1 + x - 8 = 0\\), so Cl is still \\(+7\\). This is perchloric acid.",
        ],
        answer: "(a) KOH; (b) \\(\\mathrm{2HClO_4}\\), perchloric acid",
      },
      selfCheckExample: {
        prompt: "Which acid forms when sulfur dioxide dissolves in water?",
        options: [
          "\\(\\mathrm{H_2SO_3}\\)",
          "\\(\\mathrm{H_2SO_4}\\)",
          "\\(\\mathrm{H_2S}\\)",
          "\\(\\mathrm{H_2S_2O_7}\\)",
          "None: \\(\\mathrm{SO_2}\\) is a neutral oxide",
        ],
        steps: [
          "\\(\\mathrm{SO_2 + H_2O \\rightarrow H_2SO_3}\\). S is \\(+4\\) in both.",
          "B needs S at \\(+6\\), which comes from \\(\\mathrm{SO_3}\\). C is a binary acid with S at \\(-2\\). E is wrong: \\(\\mathrm{SO_2}\\) is acidic (it causes acid rain).",
        ],
        answer: "(A) \\(\\mathrm{H_2SO_3}\\)",
      },
      practiceSet: [
        { prompt: "Product of calcium oxide with water?", answer: "\\(\\mathrm{Ca(OH)_2}\\)", method: "Basic oxide to hydroxide" },
        { prompt: "Which acid comes from \\(\\mathrm{N_2O_5}\\)?", answer: "\\(\\mathrm{HNO_3}\\) (two molecules)", method: "N stays \\(+5\\)" },
        { prompt: "Balance: \\(\\mathrm{P_4O_{10}} + ?\\,\\mathrm{H_2O} \\rightarrow 4\\,\\mathrm{H_3PO_4}\\)", answer: "6", method: "12 H on the right" },
        { prompt: "Does CO give an acid in water?", answer: "No", method: "CO is a neutral oxide" },
      ],
      traps: [
        {
          title: "The acid keeps the oxidation number of its oxide",
          body: "\\(\\mathrm{SO_2}\\) gives sulfurous acid, \\(\\mathrm{H_2SO_3}\\) (S \\(+4\\)), not sulfuric acid. Only \\(\\mathrm{SO_3}\\) gives \\(\\mathrm{H_2SO_4}\\) (S \\(+6\\)). Match the oxidation numbers before choosing the acid.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ino-acids",
      name: "Binary acids, oxoacids, hydroxides and hydrides",
      intuition:
        "Look at which elements a formula contains and the family is usually obvious. Hydrogen plus one non-metal is a binary acid; add oxygen and it is an oxoacid; a metal with hydroxide groups is a base; and hydrogen joined to a single other element is a hydride.",
      definition:
        "- **Binary acids** (hydracids): hydrogen and one non-metal, acidic in water: HF, HCl, HBr, HI (the **hydrohalic** acids) and \\(\\mathrm{H_2S}\\). Named hydro...ic acid: hydrochloric acid.\n" +
        "- **Oxoacids** (oxyacids): hydrogen, a non-metal and oxygen; the acidic H atoms are joined to O. HClO, hypochlorous acid, is an oxoacid even though it has only one O.\n" +
        "- **Hydroxides**: a metal ion with \\(\\mathrm{OH^-}\\) ions: NaOH, \\(\\mathrm{Ca(OH)_2}\\). Most are bases; \\(\\mathrm{Al(OH)_3}\\) and \\(\\mathrm{Zn(OH)_2}\\) are amphoteric.\n" +
        "- **Hydrides**: hydrogen with one other element. Metal hydrides (NaH, \\(\\mathrm{CaH_2}\\)) are ionic, contain \\(\\mathrm{H^-}\\), and react with water to give hydrogen gas and a hydroxide. Non-metal hydrides (\\(\\mathrm{CH_4}\\), \\(\\mathrm{NH_3}\\), \\(\\mathrm{H_2O}\\)) are covalent molecules.\n" +
        "- An acid with two or three acidic H atoms is **diprotic** (\\(\\mathrm{H_2SO_4}\\)) or **triprotic** (\\(\\mathrm{H_3PO_4}\\)).",
      table: {
        columns: ["Class", "Made of", "Examples"],
        rows: [
          { cells: ["Binary acid (hydracid)", "H + one non-metal", "HCl, HBr, HF, \\(\\mathrm{H_2S}\\)"] },
          { cells: ["Oxoacid", "H + non-metal + O", "\\(\\mathrm{H_2SO_4}\\), \\(\\mathrm{HNO_3}\\), HClO, \\(\\mathrm{H_3PO_4}\\), \\(\\mathrm{H_2CO_3}\\)"] },
          { cells: ["Hydroxide", "Metal ion + \\(\\mathrm{OH^-}\\)", "NaOH, \\(\\mathrm{Ca(OH)_2}\\), \\(\\mathrm{Al(OH)_3}\\)"] },
          { cells: ["Metal hydride", "Metal + H (H is \\(-1\\))", "NaH, \\(\\mathrm{CaH_2}\\), LiH"] },
          { cells: ["Non-metal hydride", "Non-metal + H (H is \\(+1\\))", "\\(\\mathrm{CH_4}\\), \\(\\mathrm{NH_3}\\), \\(\\mathrm{H_2O}\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which one of the following is a binary acid (hydracid)?",
        options: [
          "\\(\\mathrm{HNO_3}\\)",
          "\\(\\mathrm{H_2SO_3}\\)",
          "\\(\\mathrm{H_2S}\\)",
          "\\(\\mathrm{HClO_4}\\)",
          "NaHS",
        ],
        steps: [
          "\\(\\mathrm{H_2S}\\) contains only hydrogen and one non-metal: a binary acid.",
          "A, B and D contain oxygen, so they are oxoacids. E is a salt (sodium hydrogen sulfide), not an acid.",
        ],
        answer: "(C) \\(\\mathrm{H_2S}\\)",
      },
      practiceSet: [
        { prompt: "Is HBrO a binary acid or an oxoacid?", answer: "An oxoacid", method: "It contains oxygen" },
        { prompt: "What forms when NaH reacts with water?", answer: "Hydrogen gas and sodium hydroxide", method: "\\(\\mathrm{H^-}\\) takes an \\(\\mathrm{H^+}\\) from water" },
        { prompt: "How many acidic hydrogen atoms does \\(\\mathrm{H_3PO_4}\\) have?", answer: "3 (triprotic)", method: "All three H are on O" },
      ],
      traps: [
        {
          title: "An acid is not an oxide, and a hydroxide is not an acid",
          body: "HClO contains H, Cl and O, so it is an oxoacid, not an acidic oxide (which has no H at all, like \\(\\mathrm{Cl_2O}\\)). A metal hydroxide such as NaOH is a base. Classify by the elements present before thinking about behaviour.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ino-salts",
      name: "Salts: normal, acid, basic and hydrated",
      intuition:
        "A salt is what is left when the acidic hydrogen of an acid has been replaced by a metal ion or ammonium. If every acidic hydrogen is replaced you get a normal salt; if some are left over you get an acid salt, which can still give up \\(\\mathrm{H^+}\\).",
      definition:
        "A **salt** is an ionic compound made of a cation (metal or ammonium) and the anion of an acid. Its name is cation then anion: potassium nitrate, ammonium sulfate.\n" +
        "- Ways to make a salt: acid + base \\(\\rightarrow\\) salt + water; acid + metal \\(\\rightarrow\\) salt + hydrogen; acid + carbonate \\(\\rightarrow\\) salt + water + \\(\\mathrm{CO_2}\\); basic oxide + acidic oxide \\(\\rightarrow\\) salt (\\(\\mathrm{CaO + CO_2 \\rightarrow CaCO_3}\\)).\n" +
        "- **Acid salts** come from acids with two or three acidic H atoms when only some are replaced: \\(\\mathrm{NaHCO_3}\\), \\(\\mathrm{NaHSO_4}\\), \\(\\mathrm{KH_2PO_4}\\), \\(\\mathrm{Na_2HPO_4}\\). Their names say how many H remain: sodium dihydrogen phosphate.\n" +
        "- \"Acid salt\" describes the formula, not the solution: \\(\\mathrm{NaHSO_4}\\) is acidic in water but \\(\\mathrm{NaHCO_3}\\) is slightly basic.",
      table: {
        columns: ["Type", "Contains", "Examples"],
        rows: [
          { cells: ["Normal salt", "No replaceable H left", "NaCl, \\(\\mathrm{K_2SO_4}\\), \\(\\mathrm{CaCO_3}\\), \\(\\mathrm{CH_3COONa}\\)"] },
          { cells: ["Acid salt", "Anion still carries acidic H", "\\(\\mathrm{NaHCO_3}\\), \\(\\mathrm{NaHSO_4}\\), \\(\\mathrm{KH_2PO_4}\\)"] },
          { cells: ["Basic salt", "\\(\\mathrm{OH^-}\\) as well as another anion", "Mg(OH)Cl, \\(\\mathrm{Cu_2(OH)_2CO_3}\\)"] },
          { cells: ["Hydrated salt", "Water of crystallisation", "\\(\\mathrm{CuSO_4 \\cdot 5H_2O}\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which one of the following is an acid salt?",
        options: [
          "\\(\\mathrm{CH_3COONa}\\)",
          "\\(\\mathrm{Na_3PO_4}\\)",
          "NaCl",
          "\\(\\mathrm{Ca(OH)_2}\\)",
          "\\(\\mathrm{NaH_2PO_4}\\)",
        ],
        steps: [
          "\\(\\mathrm{NaH_2PO_4}\\) keeps two of phosphoric acid's three acidic H atoms: an acid salt.",
          "A contains H, but those H atoms are on carbon and are not acidic: sodium ethanoate is a normal salt. B and C are normal salts. D is a base.",
        ],
        answer: "(E) \\(\\mathrm{NaH_2PO_4}\\)",
      },
      practiceSet: [
        { prompt: "Name \\(\\mathrm{KHSO_4}\\) and say what kind of salt it is.", answer: "Potassium hydrogen sulfate; an acid salt", method: "One acidic H left" },
        { prompt: "Which salt forms when CaO reacts with \\(\\mathrm{SO_3}\\)?", answer: "\\(\\mathrm{CaSO_4}\\), calcium sulfate", method: "Basic oxide + acidic oxide" },
        { prompt: "What does the \\(\\mathrm{5H_2O}\\) in \\(\\mathrm{CuSO_4 \\cdot 5H_2O}\\) mean?", answer: "Five water molecules of crystallisation per formula unit", method: "A hydrated salt" },
      ],
      traps: [
        {
          title: "Hydrogen in a formula does not make an acid salt",
          body: "Only acidic H counts. Sodium ethanoate, \\(\\mathrm{CH_3COONa}\\), and ammonium chloride contain H atoms, but none of them is a leftover acidic H of the parent acid, so they are normal salts.",
        },
      ],
    },
  ],
};
