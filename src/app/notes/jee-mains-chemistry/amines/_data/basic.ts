import type { SubtopicNote } from "@/app/notes/_types";

export const BASIC_AMINE_NOTE: SubtopicNote = {
  subtopicName: "Structure, Physical Properties and Basicity",
  title: "Structure, Physical Properties and Basicity",
  oneLineDefinition:
    "Amines are pyramidal nitrogen bases; hydrogen bonding sets their boiling points, and the availability of the nitrogen lone pair sets their basic strength.",
  whyItMatters:
    "Seventeen PYQs, one numerical, two from 2026. Seven rank aliphatic amines, amides and caged amines by basic strength in water; six rank aryl amines and nitrogen rings; four test boiling points, the colour of aniline on storage and other physical facts.",
  concepts: [
    // C1 — structure and physical properties
    {
      kind: "reference" as const,
      slug: "jcamine-physical",
      name: "Structure and physical properties of amines",
      intuition:
        "An amine is ammonia with one, two or three hydrogens replaced by carbon groups. The nitrogen keeps its lone pair, so the molecule is pyramidal. Every N–H left on the nitrogen can hydrogen-bond to a neighbour, and that single fact explains most of the physical properties.",
      definition:
        "- **Primary** (1°) \\(\\mathrm{RNH_2}\\), **secondary** (2°) \\(\\mathrm{R_2NH}\\), **tertiary** (3°) \\(\\mathrm{R_3N}\\). The class counts carbons on nitrogen, not on the carbon next to it.\n" +
        "- Nitrogen is \\(sp^3\\) with the lone pair in the fourth orbital; the C–N–C angle in trimethylamine is about 108°.\n" +
        "- Boiling point at similar molar mass: alcohol > 1° amine > 2° amine > 3° amine ≈ alkane. O–H is more polar than N–H, and a 3° amine has no N–H at all.\n" +
        "- Lower aliphatic amines dissolve in water by hydrogen bonding; solubility falls as the carbon part grows.\n" +
        "- Pure aniline is colourless. On storage it darkens because air **oxidises** it.",
      table: {
        columns: ["Property", "What is observed", "Reason"],
        rows: [
          { cells: ["Shape at nitrogen", "Pyramidal, C–N–C about 108° in \\(\\mathrm{(CH_3)_3N}\\)", "\\(sp^3\\) nitrogen with one lone pair"] },
          { cells: ["Physical state", "Lower aliphatic amines are gases with a fishy smell; 1° amines with three or more carbons are liquids", "Molar mass and hydrogen bonding rise together"] },
          { cells: ["Boiling point of isomers", "1° > 2° > 3°", "Two N–H, one N–H, then no N–H for intermolecular hydrogen bonds"] },
          { cells: ["Amine against alcohol", "Alcohol boils higher at similar molar mass", "O–H is more polar than N–H, so its hydrogen bonds are stronger"] },
          { cells: ["Solubility in water", "Lower amines dissolve; higher amines and aniline barely dissolve", "Hydrogen bonds to water, outweighed by a large hydrophobic part"] },
          { cells: ["Aniline on storage", "Colourless when pure, turns brown on standing", "Atmospheric oxidation of the activated ring"] },
        ],
        caption: "Count the N–H bonds first: they decide hydrogen bonding, and hydrogen bonding decides boiling point.",
      },
      selfCheckExample: {
        prompt:
          "Arrange in increasing order of boiling point: propan-1-ol, propan-1-amine, N-methylethanamine and N,N-dimethylmethanamine.",
        steps: [
          "All four have molar mass 59 or 60, so hydrogen bonding decides.",
          "N,N-Dimethylmethanamine is tertiary: no N–H, no intermolecular hydrogen bond.",
          "N-Methylethanamine has one N–H; propan-1-amine has two.",
          "Propan-1-ol has an O–H, which forms the strongest hydrogen bonds.",
        ],
        answer: "N,N-Dimethylmethanamine < N-methylethanamine < propan-1-amine < propan-1-ol",
      },
      practiceSet: [
        { prompt: "Classify \\(\\mathrm{(CH_3)_3C{-}NH_2}\\) as a primary, secondary or tertiary amine.", answer: "Primary: only one carbon is attached to nitrogen" },
        { prompt: "Which boils higher: \\(\\mathrm{C_2H_5NHC_2H_5}\\) or \\(\\mathrm{(CH_3)_2NC_2H_5}\\)?", answer: "\\(\\mathrm{C_2H_5NHC_2H_5}\\): it has an N–H for hydrogen bonding" },
        { prompt: "Why does a stored sample of aniline turn brown?", answer: "Air oxidises it" },
        { prompt: "Of the three phenylenediamines, which melts highest?", answer: "The para isomer (about 140 °C): its symmetric molecules pack best in the crystal" },
      ],
      pyqExampleId: "28fb901c-3a19-47cd-8a2b-34418dd127e8", // 2026 — bp of butane, diethylamine, butylamine, butanol
      traps: [
        {
          title: "Primary amines associate more than secondary amines",
          body: "A primary amine has two N–H bonds and a secondary amine has one, so primary amines form more intermolecular hydrogen bonds and boil higher than their secondary isomers.",
        },
        {
          title: "Aniline darkens by oxidation, not reduction",
          body: "The electron-rich ring of an aryl amine is oxidised by air, giving coloured products. A statement that arylamines colour on storage by atmospheric reduction is false.",
        },
      ],
    },

    // C2 — aliphatic amines in water and gas
    {
      kind: "formula" as const,
      slug: "jcamine-basicity-aliphatic",
      name: "Basic strength of aliphatic amines and amides",
      intuition:
        "An amine is a base because its lone pair takes a proton. Alkyl groups push electrons onto nitrogen, so in the gas phase every extra alkyl group makes the amine more basic. In water two more effects join in: the protonated ion is stabilised by hydrogen bonds to water, which needs N–H bonds, and bulky groups crowd the nitrogen. The order in water is a compromise.",
      definition:
        "- **Gas phase** (inductive effect only): 3° > 2° > 1° > \\(\\mathrm{NH_3}\\).\n" +
        "- **Water**, methyl series: \\(\\mathrm{(CH_3)_2NH > CH_3NH_2 > (CH_3)_3N > NH_3}\\).\n" +
        "- **Water**, ethyl series: \\(\\mathrm{(C_2H_5)_2NH > (C_2H_5)_3N > C_2H_5NH_2 > NH_3}\\). The two series differ, so learn both.\n" +
        "- \\(pK_b\\) values (NCERT): \\(\\mathrm{NH_3}\\) 4.75; \\(\\mathrm{C_2H_5NH_2}\\) 3.29; \\(\\mathrm{(C_2H_5)_2NH}\\) 3.00; \\(\\mathrm{(C_2H_5)_3N}\\) 3.25; aniline 9.38. Smaller \\(pK_b\\), stronger base.\n" +
        "- Hydrazine \\(\\mathrm{H_2N{-}NH_2}\\) is weaker than ammonia: the second nitrogen withdraws electrons.\n" +
        "- Amides and imides are barely basic: the lone pair is delocalised onto C=O. Acetamide is weaker than aniline, and \\(\\mathrm{(CH_3CO)_2NH}\\) is weaker still.\n" +
        "- Tying the alkyl groups back in a cage (quinuclidine) removes the crowding, so it is more basic than triethylamine.",
      formula: {
        label: "Base dissociation of an amine and its pKb",
        latex:
          "\\mathrm{RNH_2 + H_2O \\rightleftharpoons RNH_3^+ + OH^-} \\qquad K_b = \\dfrac{[\\mathrm{RNH_3^+}][\\mathrm{OH^-}]}{[\\mathrm{RNH_2}]} \\qquad pK_b = -\\log K_b",
      },
      authoredExample: {
        prompt:
          "Arrange in decreasing basic strength in water: \\(\\mathrm{NH_3}\\), \\(\\mathrm{C_2H_5NH_2}\\), \\(\\mathrm{(C_2H_5)_2NH}\\), \\(\\mathrm{(C_2H_5)_3N}\\).",
        steps: [
          "Every ethylamine is stronger than \\(\\mathrm{NH_3}\\): the ethyl groups push electrons onto nitrogen.",
          "Diethylamine has two alkyl groups and still one N–H to hydrogen-bond its ion to water, so it is the strongest.",
          "In the ethyl series the balance of the three effects puts \\(\\mathrm{(C_2H_5)_3N}\\) above \\(\\mathrm{C_2H_5NH_2}\\); this is where it differs from the methyl series.",
          "The \\(pK_b\\) values 3.00 < 3.25 < 3.29 < 4.75 confirm the order.",
        ],
        answer: "\\(\\mathrm{(C_2H_5)_2NH > (C_2H_5)_3N > C_2H_5NH_2 > NH_3}\\)",
      },
      selfCheckExample: {
        prompt:
          "Arrange in decreasing basic strength in water: \\(\\mathrm{CH_3CONH_2}\\), \\(\\mathrm{CH_3CH_2CH_2NH_2}\\), \\(\\mathrm{NH_3}\\) and \\(\\mathrm{(CH_3CH_2CH_2)_2NH}\\).",
        steps: [
          "The secondary amine has two electron-pushing propyl groups and one N–H for solvation: strongest.",
          "The primary amine has one propyl group: stronger than ammonia.",
          "In acetamide the lone pair is delocalised onto the carbonyl oxygen, so it is far weaker than ammonia.",
        ],
        answer: "\\(\\mathrm{(CH_3CH_2CH_2)_2NH > CH_3CH_2CH_2NH_2 > NH_3 > CH_3CONH_2}\\)",
      },
      practiceSet: [
        { prompt: "In the gas phase, which is the strongest base: \\(\\mathrm{C_2H_5NH_2}\\), \\(\\mathrm{(C_2H_5)_2NH}\\) or \\(\\mathrm{(C_2H_5)_3N}\\)?", answer: "\\(\\mathrm{(C_2H_5)_3N}\\): with no solvent, only the inductive effect counts" },
        { prompt: "Amine X has \\(pK_b\\) 3.0 and amine Y has \\(pK_b\\) 4.7. Which is the stronger base?", answer: "X: a smaller \\(pK_b\\) means a stronger base" },
        { prompt: "Which is the stronger base: hydrazine or ammonia?", answer: "Ammonia" },
        { prompt: "Which is the weaker base: acetamide or diacetamide, \\(\\mathrm{(CH_3CO)_2NH}\\)?", answer: "Diacetamide: two carbonyl groups draw off the lone pair" },
      ],
      pyqExampleId: "a365b357-4860-4acc-9905-e5063ccd5120", // 2023 — methylamines in water
      traps: [
        {
          title: "Tertiary is not the strongest base in water",
          body: "In the gas phase a tertiary amine is the strongest, but in water it loses out on solvation and crowding. Trimethylamine is weaker than methylamine in water; triethylamine is weaker than diethylamine.",
        },
        {
          title: "The methyl and ethyl orders are different",
          body: "In water the methyl series runs 2° > 1° > 3°, while the ethyl series runs 2° > 3° > 1°. Swapping the two is the most common slip in these questions.",
        },
        {
          title: "An amide is not an amine",
          body: "Acetamide has a nitrogen with a lone pair, but the lone pair is shared with the carbonyl group. Acetamide is a weaker base than aniline, not a stronger one.",
        },
      ],
    },

    // C3 — aryl amines and nitrogen rings
    {
      kind: "formula" as const,
      slug: "jcamine-basicity-aromatic",
      name: "Basic strength of aryl amines and nitrogen heterocycles",
      intuition:
        "In aniline the nitrogen lone pair spreads into the benzene ring, so it is less free to take a proton. Anything that pushes more electrons toward nitrogen makes the amine more basic; anything that pulls them away makes it weaker. When the lone pair is part of an aromatic ring, as in pyrrole, it is hardly available at all.",
      definition:
        "- Aniline (\\(pK_b\\) 9.38) is far weaker than an aliphatic amine. Benzylamine, \\(\\mathrm{C_6H_5CH_2NH_2}\\) (\\(pK_b\\) 4.70), has an \\(sp^3\\) carbon between ring and nitrogen, so it behaves as an aliphatic amine.\n" +
        "- In water, N-alkyl anilines are slightly stronger than aniline: \\(\\mathrm{C_6H_5N(CH_3)_2}\\) 8.92 < \\(\\mathrm{C_6H_5NHCH_3}\\) 9.30 < \\(\\mathrm{C_6H_5NH_2}\\) 9.38 (\\(pK_b\\)).\n" +
        "- Ring substituents: electron donors (\\(\\mathrm{OCH_3}\\), \\(\\mathrm{CH_3}\\)) at the para position raise basicity; electron acceptors (\\(\\mathrm{Cl}\\), \\(\\mathrm{CN}\\), \\(\\mathrm{NO_2}\\)) lower it.\n" +
        "- A second phenyl group lowers basicity further: diphenylamine is much weaker than aniline.\n" +
        "- Nitrogen rings: piperidine and pyrrolidine (\\(sp^3\\) N) are strong; pyridine (\\(sp^2\\) N, lone pair outside the ring π system) is weak; pyrrole's lone pair is part of its aromatic sextet, so pyrrole is almost non-basic.\n" +
        "- The weakest base gives the strongest conjugate acid.",
      formula: {
        label: "A base and its conjugate acid at 298 K",
        latex: "pK_a(\\mathrm{BH^+}) + pK_b(\\mathrm{B}) = 14",
      },
      authoredExample: {
        prompt:
          "Arrange in increasing basic strength: 4-chloroaniline, 4-methylaniline, 4-nitroaniline and aniline.",
        steps: [
          "All four are aryl amines, so the lone pair is partly delocalised in each; only the para group differs.",
          "\\(\\mathrm{CH_3}\\) pushes electrons into the ring (+I, hyperconjugation), so 4-methylaniline is the strongest.",
          "\\(\\mathrm{Cl}\\) withdraws more by its −I effect than it gives by resonance, so 4-chloroaniline is a little weaker than aniline.",
          "\\(\\mathrm{NO_2}\\) withdraws strongly by −I and −R and pulls the lone pair onto its own oxygens, so 4-nitroaniline is the weakest.",
        ],
        answer: "4-Nitroaniline < 4-chloroaniline < aniline < 4-methylaniline",
      },
      selfCheckExample: {
        prompt:
          "Of cyclohexylamine, aniline and 4-nitroaniline, which forms the strongest conjugate acid?",
        steps: [
          "The strongest conjugate acid comes from the weakest base.",
          "Cyclohexylamine is aliphatic and strongly basic; aniline is weak; 4-nitroaniline is weaker still because the nitro group drains the lone pair.",
        ],
        answer: "4-Nitroaniline: its conjugate acid, the 4-nitroanilinium ion, is the strongest acid",
      },
      practiceSet: [
        { prompt: "Which is the stronger base: diphenylamine or aniline?", answer: "Aniline" },
        { prompt: "Which is the stronger base: pyrrolidine or pyrrole?", answer: "Pyrrolidine: its lone pair is not part of an aromatic ring" },
        { prompt: "The \\(pK_b\\) of aniline is 9.38. What is the \\(pK_a\\) of the anilinium ion at 298 K?", answer: "4.62" },
        { prompt: "Which is the stronger base: 4-methoxyaniline or aniline?", answer: "4-Methoxyaniline: the methoxy group donates electrons by resonance" },
      ],
      pyqExampleId: "f630d6a3-97fa-4447-b4ff-e9eb7c6a03f8", // 2021 — benzylamine and N-methyl anilines
      traps: [
        {
          title: "Benzylamine is not an aryl amine for basicity",
          body: "In benzylamine the nitrogen sits on a \\(\\mathrm{CH_2}\\) group, not on the ring, so its lone pair is not delocalised. It is about as basic as an aliphatic amine and far stronger than aniline.",
        },
        {
          title: "Pyridine and pyrrole are not equally basic",
          body: "Pyridine's lone pair lies in the ring plane, outside the aromatic π system, so it can take a proton. Pyrrole's lone pair is part of the aromatic sextet; protonating it destroys aromaticity, so pyrrole is almost non-basic.",
        },
      ],
    },
  ],
};
