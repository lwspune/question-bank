import type { SubtopicNote } from "@/app/notes/_types";

export const PHENOL_RING_ALC_NOTE: SubtopicNote = {
  subtopicName: "Ring Substitution of Phenols and Phenol Tests",
  title: "Ring Substitution of Phenols and Phenol Tests",
  oneLineDefinition:
    "The OH group makes the ring so reactive that bromine water gives 2,4,6-tribromophenol at once while bromine in CS₂ gives mainly p-bromophenol; dilute nitric acid gives o- and p-nitrophenol, concentrated nitric acid gives picric acid, and phthalic anhydride gives phenolphthalein.",
  whyItMatters:
    "Seventeen PYQs, fourteen of them multiple choice, and two from 2026. Seven are about bromination: the solvent, the product and the mass of bromine used. Five are about nitration, steam-volatile o-nitrophenol and picric acid, and three of those ask for a number, usually a count of oxygen atoms or a percentage. Five test the phthalein dye test and the colours of phenolphthalein.",
  concepts: [
    // C1 — bromination
    {
      kind: "formula" as const,
      slug: "jcalc-bromination",
      name: "Bromination of phenol: the solvent decides",
      intuition:
        "The OH group pushes so much electron density into the ring that bromine is polarised without any Lewis acid. In water, phenol is partly ionised to the even more reactive phenoxide, and every free ortho and para position is brominated at once. In a solvent of low polarity at low temperature, the reaction stops after one bromine, mostly at para.",
      definition:
        "- **Bromine water** (polar): 2,4,6-tribromophenol, a white precipitate. Three \\(\\mathrm{Br_2}\\) per phenol; three HBr are released.\n" +
        "- **\\(\\mathrm{Br_2}\\) in \\(\\mathrm{CS_2}\\) or \\(\\mathrm{CHCl_3}\\)** at about 273 K (low polarity): monobromophenols, mainly p-bromophenol with some o-bromophenol.\n" +
        "- No \\(\\mathrm{FeBr_3}\\) is needed for phenol. For benzene the Lewis acid is needed: it polarises \\(\\mathrm{Br_2}\\) to give the electrophile \\(\\mathrm{Br^+}\\).\n" +
        "- The difference between the two solvents comes from solvent polarity, not from hyperconjugation or free radicals.",
      formula: {
        label: "Bromine water on phenol",
        latex: "\\mathrm{C_6H_5OH + 3Br_2 \\xrightarrow{H_2O} C_6H_2Br_3OH\\downarrow + 3HBr}",
      },
      authoredExample: {
        prompt:
          "9.4 g of phenol is treated with bromine water until no more reacts. Find the mass of bromine used and the mass of 2,4,6-tribromophenol formed (C 12, H 1, O 16, Br 80).",
        steps: [
          "Moles of phenol \\(= 9.4/94 = 0.100\\) mol.",
          "Three \\(\\mathrm{Br_2}\\) per phenol: \\(0.300\\) mol \\(\\times 160 = 48.0\\) g of \\(\\mathrm{Br_2}\\).",
          "Molar mass of \\(\\mathrm{C_6H_2Br_3OH}\\) \\(= 72 + 3 + 240 + 16 = 331\\) g mol\\(^{-1}\\).",
          "Mass formed \\(= 0.100 \\times 331 = 33.1\\) g.",
        ],
        answer: "48.0 g of bromine; 33.1 g of 2,4,6-tribromophenol.",
      },
      selfCheckExample: {
        prompt:
          "Phenol is treated (a) with \\(\\mathrm{Br_2}\\) in \\(\\mathrm{CS_2}\\) at 273 K and (b) with excess bromine water. Name the major product in each case.",
        steps: [
          "(a) Low polarity and low temperature: only one bromine enters, mostly para to OH.",
          "(b) Water ionises phenol to phenoxide and polarises bromine: all three ortho and para positions are brominated.",
        ],
        answer: "(a) p-Bromophenol; (b) 2,4,6-tribromophenol (white precipitate).",
      },
      practiceSet: [
        { prompt: "Does the bromination of phenol need a Lewis acid catalyst?", answer: "No" },
        { prompt: "What colour is the precipitate from phenol and bromine water?", answer: "White" },
        { prompt: "How many moles of \\(\\mathrm{Br_2}\\) does one mole of phenol use with bromine water?", answer: "3" },
        { prompt: "What does \\(\\mathrm{FeBr_3}\\) do in the bromination of benzene?", answer: "It polarises \\(\\mathrm{Br_2}\\) to give \\(\\mathrm{Br^+}\\)" },
      ],
      pyqExampleId: "ef7f3ea1-786c-4379-99eb-5abbbcc7a93d", // 2022 — bromine in CHCl3 vs water: solvent polarity
      traps: [
        {
          title: "CS₂ and CHCl₃ both count as low polarity",
          body: "Either solvent, at low temperature, gives mainly p-bromophenol. Only water (or another polar medium) gives the tribromo product.",
        },
        {
          title: "Count bromine molecules, not bromine atoms",
          body: "Three \\(\\mathrm{Br_2}\\) (160 g mol\\(^{-1}\\) each) are used per phenol. Three Br atoms go onto the ring and three leave as HBr.",
        },
      ],
    },

    // C2 — nitration and picric acid
    {
      kind: "formula" as const,
      slug: "jcalc-nitration-picric",
      name: "Nitration of phenol and picric acid",
      intuition:
        "Dilute nitric acid is enough to nitrate phenol, and it gives both ortho and para nitrophenol. The ortho isomer holds its OH to its own nitro group, so it cannot hydrogen-bond to its neighbours: it boils low and is carried over by steam. Concentrated nitric acid nitrates all three positions but also oxidises phenol, so picric acid is made by a safer route.",
      definition:
        "- **Dilute \\(\\mathrm{HNO_3}\\), 298 K**: o-nitrophenol + p-nitrophenol. Steam distillation carries off the ortho isomer (intramolecular hydrogen bond); the para isomer stays behind (intermolecular hydrogen bonds).\n" +
        "- p-Nitrophenol melts higher (about 114 °C) than o-nitrophenol (about 45 °C).\n" +
        "- **Conc. \\(\\mathrm{HNO_3}\\)**: 2,4,6-trinitrophenol, called picric acid, but in poor yield because the acid oxidises phenol.\n" +
        "- **Better route**: conc. \\(\\mathrm{H_2SO_4}\\) first gives phenol-2,4-disulphonic acid; conc. \\(\\mathrm{HNO_3}\\) then replaces both \\(\\mathrm{SO_3H}\\) groups and adds a third nitro group.\n" +
        "- Picric acid is a trinitroPHENOL (yellow, pKa about 0.4). TNT is trinitrotoluene.\n" +
        "- Oxygen atoms: phenol 1, a nitrophenol 3, phenol-2,4-disulphonic acid 7, picric acid 7.",
      formula: {
        label: "Percentage of oxygen in a compound",
        latex: "\\%\\,\\mathrm{O} = \\dfrac{16 \\times (\\text{number of O atoms})}{M} \\times 100",
      },
      authoredExample: {
        prompt:
          "Find the percentage by mass of oxygen in picric acid, the yellow product of phenol with concentrated nitric acid (C 12, H 1, N 14, O 16).",
        steps: [
          "Picric acid is 2,4,6-trinitrophenol, \\(\\mathrm{C_6H_2(NO_2)_3OH}\\) = \\(\\mathrm{C_6H_3N_3O_7}\\).",
          "\\(M = 72 + 3 + 42 + 112 = 229\\) g mol\\(^{-1}\\).",
          "Oxygen: 7 atoms, 112 g.",
          "\\(\\%\\,\\mathrm{O} = 112/229 \\times 100 = 48.9\\%\\).",
        ],
        answer: "48.9%.",
      },
      selfCheckExample: {
        prompt:
          "Why is picric acid made by treating phenol first with conc. \\(\\mathrm{H_2SO_4}\\) and then with conc. \\(\\mathrm{HNO_3}\\), rather than with conc. \\(\\mathrm{HNO_3}\\) alone?",
        steps: [
          "Concentrated nitric acid oxidises the very electron-rich phenol ring, so the direct yield is poor.",
          "Two \\(\\mathrm{SO_3H}\\) groups make the ring less electron-rich and protect it.",
          "Nitric acid then replaces both \\(\\mathrm{SO_3H}\\) groups by \\(\\mathrm{NO_2}\\) and adds a third nitro group.",
        ],
        answer: "The sulphonic acid groups protect the ring from oxidation and are then replaced by nitro groups, so the yield is much better.",
      },
      practiceSet: [
        { prompt: "Which nitrophenol is steam volatile?", answer: "o-Nitrophenol" },
        { prompt: "How many oxygen atoms are there in picric acid?", answer: "7" },
        { prompt: "Is picric acid 2,4,6-trinitrotoluene?", answer: "No; it is 2,4,6-trinitrophenol" },
        { prompt: "Which melts higher, o-nitrophenol or p-nitrophenol?", answer: "p-Nitrophenol" },
      ],
      pyqExampleId: "fff50419-00da-4065-b262-7a461c9c47bb", // 2026 — steam-volatile o-nitrophenol, rise in % oxygen
      traps: [
        {
          title: "Picric acid is a phenol, not TNT",
          body: "2,4,6-Trinitrotoluene (TNT) has a methyl group. Picric acid has an OH group, which is why it is a strong acid.",
        },
        {
          title: "Steam carries off the ortho isomer",
          body: "The hydrogen bond in o-nitrophenol is inside one molecule, so its molecules are held together weakly. p-Nitrophenol, bonded to its neighbours, stays in the flask.",
        },
      ],
    },

    // C3 — phthalein dye test
    {
      kind: "reference" as const,
      slug: "jcalc-phthalein-test",
      name: "The phthalein dye test for phenols",
      intuition:
        "Two phenol molecules join one carbonyl carbon of phthalic anhydride, each through the ring carbon para to its OH. The product, phenolphthalein, is a colourless lactone in acid. Dilute alkali opens the lactone to a coloured ion; a large excess of strong alkali takes the colour away again. A phenol whose para position is blocked cannot form the dye.",
      definition:
        "- 2 phenol + phthalic anhydride, conc. \\(\\mathrm{H_2SO_4}\\), heat → phenolphthalein + water.\n" +
        "- Phenolphthalein is colourless in acid, pink in dilute NaOH, and colourless again in excess concentrated NaOH.\n" +
        "- The ring carbon para to OH must carry an H; p-cresol fails the test.\n" +
        "- The test is specific to phenols. Lucas is for alcohols, Tollens' for aldehydes and the carbylamine test for primary amines.",
      table: {
        columns: ["Phenol", "Position para to OH", "Product with phthalic anhydride", "Colour in alkali"],
        rows: [
          { cells: ["Phenol", "Free", "Phenolphthalein", "Pink in dilute NaOH; colourless in acid and in excess strong alkali"] },
          { cells: ["o-Cresol", "Free", "o-Cresolphthalein", "Purple-red"] },
          { cells: ["p-Cresol", "Blocked by \\(\\mathrm{CH_3}\\)", "No phthalein dye", "No colour"], noteAmber: "The usual answer to 'which phenol gives no colour'." },
          { cells: ["Resorcinol (benzene-1,3-diol)", "Free", "Fluorescein", "Yellow-green fluorescence"] },
        ],
        caption: "Look for the ring carbon para to OH: if it carries a substituent, no phthalein forms.",
      },
      selfCheckExample: {
        prompt: "One of o-cresol and p-cresol gives no colour in the phthalein test. Which one, and why?",
        steps: [
          "The phenol must bond to phthalic anhydride through the ring carbon para to its OH.",
          "In o-cresol that carbon is free; in p-cresol it carries the methyl group.",
        ],
        answer: "p-Cresol, because its para position is blocked.",
      },
      practiceSet: [
        { prompt: "How many molecules of phenol combine with one molecule of phthalic anhydride?", answer: "2" },
        { prompt: "Which acid catalyses the phthalein reaction?", answer: "Concentrated \\(\\mathrm{H_2SO_4}\\)" },
        { prompt: "What colour is phenolphthalein in dilute NaOH?", answer: "Pink" },
        { prompt: "Which test identifies a phenolic OH: Lucas, Tollens' or phthalein?", answer: "The phthalein dye test" },
      ],
      pyqExampleId: "2f764ad4-a599-4116-9b1d-1e807af0a7d0", // 2023 — carbolic acid + phthalic anhydride gives phenolphthalein
      traps: [
        {
          title: "Excess alkali removes the pink colour",
          body: "Phenolphthalein is pink only in dilute alkali. In a large excess of concentrated NaOH it turns colourless again, so 'colourless' can be the right answer at the end of a sequence.",
        },
      ],
    },
  ],
};
