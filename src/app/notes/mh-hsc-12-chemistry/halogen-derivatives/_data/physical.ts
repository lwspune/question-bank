import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_HD_PHYSICAL_NOTE: SubtopicNote = {
  subtopicName: "Physical Properties",
  title: "Physical Properties of Halogen Derivatives",
  oneLineDefinition:
    "Why the C-X bond is polar, how boiling points change with the halogen, the chain length and branching, and why alkyl halides do not dissolve in water.",
  whyItMatters:
    "3 questions, all from the textbook: two ask you to arrange compounds in order of boiling point and one asks why alkyl halides are immiscible with water though they are polar. The board has not set this page in the papers in this bank, but the boiling point rules are quick marks in an 'arrange' question.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscchd-boiling-points",
      name: "Boiling points: halogen, chain length and branching",
      intuition:
        "Alkyl halide molecules hold one another by van der Waals forces and dipole attractions. Bigger, heavier molecules with more surface to touch hold on more strongly, so they need a higher temperature to boil. Branching makes a molecule rounder, with less surface in contact, so it boils lower.",
      definition:
        "- Alkyl halides boil **much higher than the corresponding alkanes**: the C-X bond is polar and the molecular mass is higher.\n" +
        "- **Same alkyl group:** boiling point rises with the atomic mass of the halogen: \\(\\text{RI} > \\text{RBr} > \\text{RCl} > \\text{RF}\\).\n" +
        "- **Same halogen:** boiling point rises with the number of carbon atoms.\n" +
        "- **Isomers:** boiling point falls as branching increases, because the surface area and so the van der Waals forces decrease.\n" +
        "- **One carbon, several halogens:** the molecular size depends on the size and the number of halogen atoms, so more and bigger halogens mean a higher boiling point.\n" +
        "- The isomeric **dichlorobenzenes** have nearly the same boiling points, but the **para** isomer melts much higher: its symmetrical molecules pack closely in the crystal.",
      table: {
        columns: ["Series", "Boiling points (K)", "Rule it shows"],
        rows: [
          { cells: ["\\(\\text{CH}_3\\text{F},\\ \\text{CH}_3\\text{Cl},\\ \\text{CH}_3\\text{Br},\\ \\text{CH}_3\\text{I}\\)", "194.6, 248.8, 276.6, 315.4", "Heavier halogen, higher boiling point"] },
          { cells: ["\\(\\text{CH}_3\\text{Cl},\\ \\text{C}_2\\text{H}_5\\text{Cl},\\ \\text{C}_3\\text{H}_7\\text{Cl},\\ \\text{C}_4\\text{H}_9\\text{Cl}\\) (straight chains)", "248.8, 285.5, 320.0, 351.5", "More carbons, higher boiling point"] },
          { cells: ["1-Bromobutane, 2-bromobutane, 2-bromo-2-methylpropane", "375, 364, 346", "More branching, lower boiling point"] },
          { cells: ["o-, m-, p-Dichlorobenzene", "b.p. 453, 446, 448; m.p. 256, 249, 323", "Boiling points close; para melts highest"] },
        ],
      },
      selfCheckExample: {
        prompt: "Arrange in increasing order of boiling point: 1-iodopropane, 1-chloropropane, 1-bromopropane.",
        steps: ["Same alkyl group, so the boiling point follows the mass of the halogen: Cl < Br < I."],
        answer: "1-Chloropropane < 1-bromopropane < 1-iodopropane",
      },
      practiceSet: [
        { prompt: "Which boils higher, chloroethane or ethane? Why?", answer: "Chloroethane: its polar C-Cl bond and higher molecular mass give stronger attractions" },
        { prompt: "Which has the higher melting point, o-dichlorobenzene or p-dichlorobenzene?", answer: "p-Dichlorobenzene (323 K), because its symmetrical molecules pack closely" },
        { prompt: "Which boils lower: 2-bromo-2-methylpropane or 1-bromobutane?", answer: "2-Bromo-2-methylpropane, the branched isomer (346 K against 375 K)" },
      ],
      pyqExampleId: "110aa4d8-4c3c-4610-ad21-12309e0a25ac",
      traps: [
        {
          title: "Branching lowers the boiling point",
          body: "Isomers with the same formula: the more branched one has less surface area and weaker van der Waals forces, so it boils LOWER. Do not let the bigger-looking structure fool you.",
        },
        {
          title: "Para is about melting, not boiling",
          body: "The three dichlorobenzenes boil at nearly the same temperature. It is the melting point of the para isomer that is much higher, because of close packing in the crystal.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscchd-polarity-solubility",
      name: "The polar C-X bond and solubility",
      intuition:
        "A halogen pulls the shared electrons towards itself, so the carbon becomes slightly positive and the halogen slightly negative. That makes alkyl halides moderately polar. But polar is not enough to dissolve in water: a substance must also hydrogen bond with water, and alkyl halides cannot.",
      definition:
        "- Halogens are more electronegative than carbon, so the C-X bond is a **polar covalent bond**: \\(\\text{C}^{\\delta+}\\text{-X}^{\\delta-}\\). Alkyl halides are **moderately polar**.\n" +
        "- From F to I the size of the halogen increases, so the **C-X bond length increases** and the **bond strength decreases**: the larger p orbital is more diffused and overlaps less with the carbon orbital.\n" +
        "- **Solubility:** alkyl halides are **insoluble in water** because they cannot form hydrogen bonds with water; the attraction between alkyl halide molecules is stronger than that between alkyl halide and water. They dissolve in non-polar organic solvents.\n" +
        "- Aryl halides are also insoluble in water and soluble in organic solvents.",
      table: {
        columns: ["Bond", "Bond length (pm)", "Bond enthalpy (kJ mol⁻¹)", "Dipole moment (D)"],
        rows: [
          { cells: ["\\(\\text{CH}_3\\text{-F}\\)", "139", "452", "1.847"] },
          { cells: ["\\(\\text{CH}_3\\text{-Cl}\\)", "178", "351", "1.860"] },
          { cells: ["\\(\\text{CH}_3\\text{-Br}\\)", "193", "293", "1.830"] },
          { cells: ["\\(\\text{CH}_3\\text{-I}\\)", "214", "234", "1.636"] },
        ],
        caption: "Table 10.2 of the textbook: bond length grows and bond enthalpy falls from F to I.",
      },
      practiceSet: [
        { prompt: "Which C-X bond in the methyl halides is the weakest?", answer: "C-I, with bond enthalpy 234 kJ mol⁻¹" },
        { prompt: "Why does C-X bond strength decrease from fluorine to iodine?", answer: "The larger, more diffused p orbital of the halogen overlaps less with the carbon orbital" },
        { prompt: "In a C-Cl bond, which atom carries the partial positive charge?", answer: "Carbon" },
      ],
      pyqExampleId: "589c3386-d379-48ca-9981-0668df05e54f",
      traps: [
        {
          title: "Polar does not mean water soluble",
          body: "The reason to write is that alkyl halides cannot form hydrogen bonds with water. 'Because they are non-polar' is wrong: they are moderately polar.",
        },
        {
          title: "Longer bond, weaker bond",
          body: "Going from C-F to C-I the bond gets longer and weaker. Do not mix the order of bond length with the order of bond strength.",
        },
      ],
    },
  ],
};
