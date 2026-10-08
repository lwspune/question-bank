import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_BND_FORCES_NOTE: SubtopicNote = {
  subtopicName: "Intermolecular Forces",
  title: "Intermolecular Forces, Boiling Points and Solubility",
  oneLineDefinition:
    "Weak attractions between molecules (London forces, dipole attractions and hydrogen bonds) decide boiling points and what dissolves in what.",
  whyItMatters:
    "Asked in 2015, 2016, every year from 2019 to 2022, and again in 2026: which substance has hydrogen bonds, which has the weakest forces, and why one substance boils higher than another. The 2026 question tested the difference between forces between molecules and bonds inside them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-bnd-imf-types",
      name: "The three intermolecular forces and where each acts",
      intuition:
        "Molecules attract each other weakly even when they have no overall charge. Electrons are always moving, so at any instant a molecule can be slightly lopsided and make its neighbour lopsided too. Polar molecules add a permanent attraction between their ends, and molecules with H on N, O or F add an especially strong one.",
      definition:
        "**Intermolecular forces** act between separate molecules. They are much weaker than the covalent bonds inside a molecule (**intramolecular** forces).\n" +
        "- **London (dispersion) forces**, also called instantaneous or induced dipole forces, act between **all** molecules and atoms. They grow with the **number of electrons** (bigger molecules) and with **contact area** (long, unbranched chains).\n" +
        "- **Dipole-dipole forces** act between **polar** molecules: the \\(\\delta^+\\) end of one attracts the \\(\\delta^-\\) end of the next.\n" +
        "- **Hydrogen bonds** are the strongest of the three, roughly a tenth of a covalent bond.\n" +
        "- Van der Waals forces is the collective name for London and dipole-dipole forces.",
      table: {
        columns: ["Force", "Acts between", "Cause", "Relative strength"],
        rows: [
          { cells: ["London (dispersion)", "All molecules and noble gas atoms", "Temporary dipole inducing a dipole in a neighbour", "Weakest for small molecules; grows with size"] },
          { cells: ["Dipole-dipole", "Polar molecules", "Permanent \\(\\delta^+\\) and \\(\\delta^-\\) ends attracting", "Stronger than London for molecules of similar size"] },
          { cells: ["Hydrogen bond", "Molecules with H bonded to N, O or F", "Very \\(\\delta^+\\) H attracted to a lone pair on N, O or F", "Strongest intermolecular force"] },
          { cells: ["Ion-dipole", "An ion and a polar molecule", "Ion charge attracting the opposite end of the dipole", "Strong; explains salts dissolving in water"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which forces act between molecules of liquid hydrogen chloride, HCl?",
        options: [
          "London forces only",
          "Dipole-dipole forces only",
          "Hydrogen bonds and London forces",
          "London forces and dipole-dipole forces",
          "Ionic bonds between \\(\\mathrm{H^+}\\) and \\(\\mathrm{Cl^-}\\) ions",
        ],
        steps: [
          "Every molecule has London forces. HCl is polar, so it also has dipole-dipole forces.",
          "C is wrong because the H is bonded to Cl, not to N, O or F. B forgets that London forces act in all molecules. E: pure HCl is a covalent molecule; it only forms ions in water.",
        ],
        answer: "(D) London forces and dipole-dipole forces",
      },
      practiceSet: [
        { prompt: "Which force is the only one acting between argon atoms?", answer: "London forces", method: "Atoms are non-polar" },
        { prompt: "Which has the stronger London forces: \\(\\mathrm{Cl_2}\\) or \\(\\mathrm{I_2}\\)?", answer: "\\(\\mathrm{I_2}\\)", method: "Many more electrons" },
        { prompt: "Name the forces between \\(\\mathrm{CH_4}\\) molecules.", answer: "London forces only", method: "Non-polar, no H on N, O or F" },
      ],
      traps: [
        {
          title: "London forces act in polar molecules too",
          body: "London forces are present in every molecule. In large molecules they can outweigh dipole forces: HI boils higher than HCl even though HCl is more polar, because HI has far more electrons. When asked why a heavier hydrogen halide boils higher, the answer is London forces, not dipoles.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bnd-hbond",
      name: "Hydrogen bonding: which substances have it",
      intuition:
        "N, O and F are small and very electronegative, so an H atom bonded to one of them is left almost bare of electrons. That exposed H is strongly attracted to a lone pair on an N, O or F atom of a neighbouring molecule. Without the N, O or F to strip the H, the effect does not happen.",
      definition:
        "A **hydrogen bond** forms between an H atom **covalently bonded to N, O or F** and a **lone pair on an N, O or F** atom of another molecule.\n" +
        "- Both parts are needed between molecules of a pure substance: an N to H, O to H or F to H bond, and a lone pair on N, O or F.\n" +
        "- H bonded to C (in \\(\\mathrm{CH_3F}\\), ethers, aldehydes, ketones) cannot form hydrogen bonds, even when the molecule contains O or F. These molecules can still **accept** hydrogen bonds from water.\n" +
        "- Water forms up to four hydrogen bonds per molecule, which explains its high boiling point and why ice is less dense than liquid water.\n" +
        "- Carboxylic acids (ethanoic acid) hydrogen bond very strongly, pairing up as dimers.\n" +
        "- Hydrogen bonds hold together the two strands of DNA and shape proteins.",
      table: {
        columns: ["Substance", "H bonded to N, O or F?", "Hydrogen bonds between its molecules?"],
        rows: [
          { cells: ["Water, \\(\\mathrm{H_2O}\\)", "Yes, O to H", "Yes"] },
          { cells: ["Ammonia, \\(\\mathrm{NH_3}\\)", "Yes, N to H", "Yes"] },
          { cells: ["Hydrogen fluoride, HF", "Yes, F to H", "Yes"] },
          { cells: ["Ethanol, \\(\\mathrm{C_2H_5OH}\\)", "Yes, O to H", "Yes"] },
          { cells: ["Methylamine, \\(\\mathrm{CH_3NH_2}\\)", "Yes, N to H", "Yes"] },
          { cells: ["Methane, \\(\\mathrm{CH_4}\\)", "No", "No"] },
          { cells: ["Hydrogen sulfide, \\(\\mathrm{H_2S}\\)", "No, H on S", "No"] },
          { cells: ["Dimethyl ether, \\(\\mathrm{CH_3OCH_3}\\)", "No, every H is on C", "No"] },
          { cells: ["Propanone, \\(\\mathrm{CH_3COCH_3}\\)", "No, every H is on C", "No"] },
        ],
      },
      selfCheckExample: {
        prompt: "In which one of these pure liquids are there hydrogen bonds between the molecules?",
        options: [
          "Dimethyl ether, \\(\\mathrm{CH_3OCH_3}\\)",
          "Hydrogen sulfide, \\(\\mathrm{H_2S}\\)",
          "Ethanol, \\(\\mathrm{CH_3CH_2OH}\\)",
          "Chloromethane, \\(\\mathrm{CH_3Cl}\\)",
          "Ethanal, \\(\\mathrm{CH_3CHO}\\)",
        ],
        steps: [
          "Look for H bonded directly to N, O or F. Only ethanol has one: its O to H group.",
          "A and E contain oxygen, but all their H atoms are on carbon. B has H on S, which is not electronegative enough. D has H on C and a Cl.",
        ],
        answer: "(C) Ethanol",
      },
      practiceSet: [
        { prompt: "Does pure \\(\\mathrm{CH_3F}\\) have hydrogen bonds between its molecules?", answer: "No", method: "Its H atoms are on C, not on F" },
        { prompt: "Why does water boil far higher than \\(\\mathrm{H_2S}\\)?", answer: "Water molecules hydrogen bond; \\(\\mathrm{H_2S}\\) molecules do not", method: "O is much more electronegative than S" },
        { prompt: "Can propanone form hydrogen bonds with water?", answer: "Yes, as an acceptor: water's H bonds to the lone pair on its O", method: "It still has none between its own molecules" },
      ],
      traps: [
        {
          title: "Having O or F in the molecule is not enough",
          body: "A hydrogen bond needs H attached directly to N, O or F. Fluoromethane, ethers and aldehydes contain O or F but all their H atoms are on carbon, so their pure liquids have no hydrogen bonds.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-bnd-boiling",
      name: "Ranking boiling points from intermolecular forces",
      intuition:
        "Boiling a molecular substance pulls whole molecules away from each other into the gas. The bonds inside each molecule stay intact. So the boiling point measures only how strongly the molecules attract each other: the stronger those forces, the more energy is needed and the higher the boiling point.",
      definition:
        "For simple molecular substances, **higher boiling point = stronger intermolecular forces**. Boiling breaks no covalent bonds.\n" +
        "Method, in order:\n" +
        "- 1. Giant structures (ionic, metallic, covalent network) boil far higher than any simple molecule.\n" +
        "- 2. Among molecules of similar size: hydrogen bonding > dipole-dipole > London only.\n" +
        "- 3. Same kind of forces: more electrons (bigger \\(M_r\\)) means a higher boiling point.\n" +
        "- 4. Same formula: the long unbranched chain boils higher than the compact branched isomer (more contact area).\n" +
        "- The same reasoning orders melting points and volatility: weaker forces, more volatile.",
      authoredExample: {
        prompt:
          "Butane (\\(M_r = 58\\)), propanone (58) and propan-1-ol (60) have similar masses. Put them in order of increasing boiling point and explain.",
        steps: [
          "Butane, \\(\\mathrm{C_4H_{10}}\\): non-polar, London forces only. Lowest: it boils at about 0 °C.",
          "Propanone, \\(\\mathrm{CH_3COCH_3}\\): polar C=O, so dipole-dipole forces, but no H on O. Boils at 56 °C.",
          "Propan-1-ol, \\(\\mathrm{CH_3CH_2CH_2OH}\\): an O to H group, so hydrogen bonds. Highest, at 97 °C.",
          "The masses are almost equal, so London forces are similar; the type of force decides the order.",
        ],
        answer: "Butane < propanone < propan-1-ol",
      },
      selfCheckExample: {
        prompt: "Which one of these substances has the highest boiling point?",
        options: [
          "\\(\\mathrm{H_2S}\\)",
          "\\(\\mathrm{H_2O}\\)",
          "\\(\\mathrm{H_2Se}\\)",
          "\\(\\mathrm{H_2Te}\\)",
          "\\(\\mathrm{CH_4}\\)",
        ],
        steps: [
          "Only water hydrogen bonds, and hydrogen bonding beats size here: water boils at 100 °C.",
          "Among the other Group 16 hydrides the boiling point rises with size, so \\(\\mathrm{H_2Te}\\) (about \\(-2\\) °C) is highest of those, but still well below water.",
          "D is the answer if you look at size only and forget hydrogen bonding; E is the lowest of all, London forces in a small molecule.",
        ],
        answer: "(B) \\(\\mathrm{H_2O}\\)",
      },
      practiceSet: [
        { prompt: "Hexane or 2,3-dimethylbutane (both \\(\\mathrm{C_6H_{14}}\\)): which boils higher?", answer: "Hexane", method: "Unbranched chain, more contact, stronger London forces" },
        { prompt: "Which boils higher: \\(\\mathrm{NH_3}\\) or \\(\\mathrm{PH_3}\\)?", answer: "\\(\\mathrm{NH_3}\\)", method: "Hydrogen bonds; \\(\\mathrm{PH_3}\\) has none" },
        { prompt: "At room temperature, chlorine is a gas and bromine a liquid. Why?", answer: "\\(\\mathrm{Br_2}\\) has more electrons, so stronger London forces", method: "Same type of force, larger molecule" },
        { prompt: "When water boils, which bonds break?", answer: "Only hydrogen bonds and other forces between molecules; no O to H bonds break", method: "The vapour is still \\(\\mathrm{H_2O}\\)" },
      ],
      traps: [
        {
          title: "Boiling breaks intermolecular forces, not covalent bonds",
          body: "Steam is made of whole \\(\\mathrm{H_2O}\\) molecules. A stronger O to H or C to H bond inside a molecule does not raise the boiling point. Options that explain a boiling point with the strength of the bonds inside the molecule (intramolecular forces) are wrong.",
        },
        {
          title: "Isomers with the same mass can boil at different temperatures",
          body: "Equal \\(M_r\\) does not mean equal boiling points. A branched isomer is more compact, touches its neighbours less, and has weaker London forces, so it boils lower than the straight-chain isomer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bnd-solubility",
      name: "Solubility: like dissolves like",
      intuition:
        "To dissolve, the solute particles must be pulled apart and surrounded by solvent particles. This happens easily when the new attractions between solute and solvent are as strong as the old ones. Polar and ionic solutes find strong partners in water; non-polar solutes only find London forces there, which cannot make up for breaking water's hydrogen bonds.",
      definition:
        "**Like dissolves like**: polar and ionic substances dissolve in polar solvents such as water; non-polar substances dissolve in non-polar solvents such as hexane.\n" +
        "- Ionic solids dissolve in water because the water dipoles surround each ion (**ion-dipole** attraction, hydration).\n" +
        "- Small molecules that hydrogen bond (methanol, ethanol, glucose, ammonia) dissolve well in water.\n" +
        "- In a series of alcohols, solubility in water **falls as the carbon chain grows**: the non-polar chain takes over from the single O to H group.\n" +
        "- Fats, oils and \\(\\mathrm{I_2}\\) dissolve in non-polar solvents, poorly in water.",
      table: {
        columns: ["Substance", "Dissolves well in", "Reason"],
        rows: [
          { cells: ["Sodium chloride", "Water, not hexane", "Ion-dipole attraction to water molecules"] },
          { cells: ["Ethanol", "Water, in any proportion", "Hydrogen bonds with water"] },
          { cells: ["Glucose", "Water", "Several O to H groups hydrogen bond with water"] },
          { cells: ["Iodine, \\(\\mathrm{I_2}\\)", "Hexane, only slightly in water", "Non-polar, London forces only"] },
          { cells: ["Cooking oil", "Hexane, not water", "Long non-polar chains"] },
          { cells: ["Hexan-1-ol", "Hexane better than water", "The long chain outweighs one O to H group"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which one of these substances is the most soluble in water?",
        options: [
          "Tetrachloromethane, \\(\\mathrm{CCl_4}\\)",
          "Hexane, \\(\\mathrm{C_6H_{14}}\\)",
          "Iodine, \\(\\mathrm{I_2}\\)",
          "Octane, \\(\\mathrm{C_8H_{18}}\\)",
          "Methanol, \\(\\mathrm{CH_3OH}\\)",
        ],
        steps: [
          "Methanol is small and has an O to H group, so it hydrogen bonds with water and mixes in any proportion.",
          "\\(\\mathrm{CCl_4}\\) has polar bonds but is a symmetric, non-polar molecule; B, C and D are non-polar too.",
        ],
        answer: "(E) Methanol",
      },
      practiceSet: [
        { prompt: "Which dissolves better in hexane: potassium bromide or naphthalene (a non-polar hydrocarbon)?", answer: "Naphthalene", method: "Like dissolves like" },
        { prompt: "Which is more soluble in water: butan-1-ol or methanol?", answer: "Methanol", method: "Shorter non-polar chain" },
        { prompt: "What attraction holds water molecules around a dissolved \\(\\mathrm{Na^+}\\) ion?", answer: "Ion-dipole attraction to the \\(\\delta^-\\) oxygen ends", method: "Hydration of ions" },
      ],
      traps: [
        {
          title: "A molecule with polar bonds may still be non-polar and insoluble in water",
          body: "\\(\\mathrm{CCl_4}\\) has four polar C to Cl bonds, but its symmetric tetrahedral shape cancels the dipoles, so it hardly dissolves in water. Solubility follows the polarity of the whole molecule, not of its bonds.",
        },
      ],
    },
  ],
};
