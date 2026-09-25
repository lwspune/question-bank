import type { SubtopicNote } from "@/app/notes/_types";

export const CLASSIFICATION_NOTE: SubtopicNote = {
  subtopicName: "Classification, Nomenclature and Physical Properties",
  title: "Classification, Nomenclature and Physical Properties",
  oneLineDefinition:
    "Halides are classed by the carbon that carries the halogen — sp³ (alkyl, allylic, benzylic), sp² (vinylic, aryl) or sp (alkynyl); boiling point rises with the mass of the halogen and the number of halogens, bond strength falls from C–F to C–I, and a carbon with four different groups makes the molecule chiral.",
  whyItMatters:
    "26 PYQs, 1 HARD — the largest page and the most predictable. Eleven ask which formula or name is vinylic, allylic or benzylic (or is NOT); eight ask the highest or lowest boiling point among the halomethanes or the strongest C–X bond; seven ask which halide is chiral or how many chiral carbons it has. " +
    "Three cards, no calculation.",
  concepts: [
    // 1 — classes
    {
      kind: "formula" as const,
      slug: "cethal-classes-of-halides",
      name: "Alkyl, Allylic, Benzylic, Vinylic and Aryl Halides",
      intuition:
        "Look at the carbon holding the halogen. sp³ and next to nothing special — alkyl. sp³ and NEXT TO a C=C — allylic. sp³ and attached to a benzene ring — benzylic. sp² in a C=C — vinylic. sp² in the ring itself — aryl. sp in a C≡C — alkynyl. One carbon further away, and the label is lost.",
      definition:
        "- **Vinylic**: X on an sp² carbon of a C=C — \\(\\text{CH}_3\\text{-CH=CH-X}\\); a haloalkene.\n" +
        "- **Allylic**: X on the sp³ carbon ADJACENT to a C=C — \\(\\text{CH}_2\\text{=CH-CH}_2\\text{X}\\), 3-bromopropene, \\(\\text{CH}_3\\text{CH=CH-CH}_2\\text{X}\\). NOT \\(\\text{CH}_3\\text{CH=CH-CH}_2\\text{CH}_2\\text{X}\\) (two carbons away).\n" +
        "- **Benzylic**: X on the carbon directly bonded to the ring — \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{X}\\) (bromophenylmethane), \\(\\text{C}_6\\text{H}_5\\text{CHBrCH}_3\\), \\(\\text{C}_6\\text{H}_5\\text{CBr(CH}_3)_2\\). NOT bromobenzene or 4-bromotoluene (aryl), NOT 1-bromo-2-phenylethane or 1-bromo-2-phenylbutane (X one carbon out).\n" +
        "- **Aryl**: X on the ring carbon — chlorobenzene. **Alkynyl**: X on an sp carbon — a haloalkyne.\n" +
        "- Primary, secondary, tertiary alkyl halides by how many carbons the C–X carbon carries.",
      formula: {
        label: "Class by the carbon bearing X",
        latex:
          "\\text{sp}^3:\\ \\text{alkyl / allylic (next to C=C) / benzylic (on ring carbon)};\\quad \\text{sp}^2:\\ \\text{vinylic / aryl};\\quad \\text{sp}:\\ \\text{alkynyl}",
      },
      authoredExample: {
        prompt: "Classify: \\(\\text{CH}_2\\text{=CH-Cl}\\), \\(\\text{C}_6\\text{H}_5\\text{-CH}_2\\text{CH}_2\\text{Br}\\), \\(\\text{CH}_3\\text{CH=CH-CH}_2\\text{Cl}\\).",
        steps: [
          "Cl on the alkene carbon: vinylic. Br one carbon away from the ring: a primary alkyl halide, not benzylic. Cl on the carbon next to C=C: allylic.",
        ],
        answer: "Vinylic; primary alkyl; allylic",
      },
      selfCheckExample: {
        prompt: "Which is NOT allylic: \\(\\text{CH}_2\\text{=CH-CH}_2\\text{X}\\), \\(\\text{CH}_3\\text{CH=CH-CH}_2\\text{X}\\), \\(\\text{CH}_3\\text{CH=CH-CH}_2\\text{CH}_2\\text{X}\\)?",
        steps: [
          "In the third the X-carbon is two bonds from the double bond.",
        ],
        answer: "\\(\\text{CH}_3\\text{CH=CH-CH}_2\\text{CH}_2\\text{X}\\)",
      },
      practiceSet: [
        { prompt: "A vinylic halide is a halo-?", answer: "Haloalkene" },
        { prompt: "Allylic among 1-, 2-, 3-bromopropene and 4-bromobut-1-ene?", answer: "3-Bromopropene" },
        { prompt: "Benzylic: bromobenzene, bromophenylmethane, 4-bromotoluene?", answer: "Bromophenylmethane" },
        { prompt: "In a haloalkyne X is bonded to a carbon of which hybridisation?", answer: "sp" },
      ],
      pyqExampleId: "d7d50278-86b8-4ca5-89b8-e0cc657d982e",
      traps: [
        {
          title: "Calling 1-bromo-2-phenylethane benzylic",
          body:
            "The bromine carbon is bonded to CH₂, not to the ring. Benzylic needs X on the ring-attached carbon: PhCH₂Br, PhCHBrR, PhCBrR₂.",
        },
      ],
    },

    // 2 — boiling points and bond strength
    {
      kind: "formula" as const,
      slug: "cethal-boiling-points-and-bond-strength",
      name: "Boiling Point and C–X Bond Strength",
      intuition:
        "Boiling point follows van der Waals forces, which grow with molecular mass and surface: heavier halogen, more halogens, longer chain — higher. Bond strength runs the other way: the small fluorine overlaps best, so C–F is the strongest and C–I the weakest bond.",
      definition:
        "- Same alkyl: \\(\\text{CH}_3\\text{I} > \\text{CH}_3\\text{Br} > \\text{CH}_3\\text{Cl} > \\text{CH}_3\\text{F}\\) in boiling point — fluoromethane lowest, iodomethane highest.\n" +
        "- More halogens: \\(\\text{CHBr}_3 > \\text{CH}_2\\text{Br}_2 > \\text{CH}_3\\text{Br} > \\text{CH}_3\\text{Cl}\\).\n" +
        "- Among isomers, branching LOWERS boiling point (less surface).\n" +
        "- Bond enthalpy: \\(\\text{C–F} > \\text{C–Cl} > \\text{C–Br} > \\text{C–I}\\); reactivity in substitution is the reverse (iodides fastest).\n" +
        "- Haloalkanes are denser than water for Br and I; slightly polar, insoluble in water.",
      formula: {
        label: "Two opposite orders",
        latex:
          "\\text{b.p.: } \\text{RI} > \\text{RBr} > \\text{RCl} > \\text{RF};\\qquad \\text{bond strength: } \\text{C–F} > \\text{C–Cl} > \\text{C–Br} > \\text{C–I}",
      },
      authoredExample: {
        prompt: "Arrange bromoethane, 1-bromopropane, 2-bromopropane and iodoethane by boiling point.",
        steps: [
          "Iodoethane (heaviest halogen) and 1-bromopropane (longer chain) sit high; 2-bromopropane is below its straight isomer; bromoethane lowest. Order: 1-bromopropane ≈ iodoethane > 2-bromopropane > bromoethane (actual: 71, 72, 59, 38 °C).",
        ],
        answer: "Iodoethane ≥ 1-bromopropane > 2-bromopropane > bromoethane",
      },
      selfCheckExample: {
        prompt: "Which has the lowest boiling point: chloromethane, bromomethane, dibromomethane, tribromomethane? Which has the strongest C–X bond: CH₃Cl, CH₃F, CH₃Br, CH₃I?",
        steps: [
          "Lightest is chloromethane. Strongest bond is C–F.",
        ],
        answer: "Chloromethane; CH₃F",
      },
      practiceSet: [
        { prompt: "Highest b.p.: CH₃F, CH₃Cl, CH₃Br, CH₃I?", answer: "CH₃I" },
        { prompt: "Lowest b.p.: chloromethane, fluoromethane, bromomethane, iodomethane?", answer: "Fluoromethane" },
        { prompt: "Decreasing b.p. of CHBr₃, CH₂Br₂, CH₃Br, CH₃Cl?", answer: "CHBr₃ > CH₂Br₂ > CH₃Br > CH₃Cl" },
        { prompt: "Highest C–X bond enthalpy?", answer: "C–F" },
      ],
      pyqExampleId: "957213b7-5519-41f4-b67f-544e3d1e09a0",
      traps: [
        {
          title: "Using bond strength to rank boiling points",
          body:
            "The strong C–F bond does not make CH₃F hard to boil — boiling breaks intermolecular forces, not bonds. Fluoromethane has the LOWEST boiling point and the STRONGEST bond.",
        },
      ],
    },

    // 3 — chirality and naming
    {
      kind: "formula" as const,
      slug: "cethal-chirality-in-haloalkanes",
      name: "Chiral Haloalkanes and Naming From a Structure",
      intuition:
        "A halide is chiral when the carbon carrying X — or any other carbon — has four different groups. The exam's recurring quartet is 2-bromopropane (two CH₃), 2-bromo-2-methylbutane (two CH₃), 3-bromopentane (two ethyls) and 2-bromo-3-methylbutane (H, Br, CH₃, isopropyl — chiral). Symmetric diiodides such as 1,4-diiodobutane are inactive.",
      definition:
        "- Chiral: 2-bromo-3-methylbutane, 2-iodo-3-methylbutane, sec-butyl bromide (2-bromobutane), 2-iodopentane, 3-iodohexane.\n" +
        "- Achiral: 2-bromopropane, 2-bromo-2-methylbutane, 2-iodo-2-methylbutane, 3-bromopentane, 3-iodopentane, n-, iso- and tert-butyl bromide, 1,4-diiodobutane (plane of symmetry).\n" +
        "- Counting: 2-chloro-3,4-dimethylhexane has THREE chiral carbons (C2, C3, C4); 3,4-dibromohexane two; 1,2- and 1,3-diiodobutane one each; 2,3-diiodobutane two.\n" +
        "- Naming a drawn halide: longest chain through the double bond, lowest locant to C=C — \\(\\text{CH}_3\\text{CH=CH-C(CH}_3)(\\text{Br)-CH}_3\\) is 4-bromo-4-methylpent-2-ene.",
      formula: {
        label: "Chirality test",
        latex:
          "\\text{C}abcd,\\ a \\neq b \\neq c \\neq d \\Rightarrow \\text{chiral; two identical groups} \\Rightarrow \\text{achiral}",
      },
      authoredExample: {
        prompt: "How many chiral carbons in 2,3-dibromopentane and in 2-bromo-2-chlorobutane?",
        steps: [
          "2,3-Dibromopentane: C2 (H, Br, CH₃, C3-side) and C3 (H, Br, ethyl, C2-side) — two. 2-Bromo-2-chlorobutane: C2 has Br, Cl, CH₃, C₂H₅ — one.",
        ],
        answer: "2; 1",
      },
      selfCheckExample: {
        prompt: "Which isomer of \(\text{C}_4\text{H}_9\text{Br}\) is chiral, and which diiodobutane is optically inactive?",
        steps: [
          "sec-Butyl bromide (2-bromobutane) is chiral; 1,4-diiodobutane is symmetric.",
        ],
        answer: "sec-Butyl bromide; 1,4-diiodobutane",
      },
      practiceSet: [
        { prompt: "Chiral carbons in 2-chloro-3,4-dimethylhexane?", answer: "Three" },
        { prompt: "Chiral: 2-iodopropane, 2-iodo-2-methylbutane, 2-iodo-3-methylbutane, 3-iodopentane?", answer: "2-Iodo-3-methylbutane" },
        { prompt: "No optical isomerism: 3-iodohexane, 2-iodopentane, 2-iodo-2-methylbutane?", answer: "2-Iodo-2-methylbutane" },
        { prompt: "IUPAC name of \\(\\text{CH}_3\\text{CH=CH-C(CH}_3)(\\text{Br)CH}_3\\)?", answer: "4-Bromo-4-methylpent-2-ene" },
      ],
      pyqExampleId: "245b0d98-1049-4069-bfe5-78db0b1eb8c8",
      traps: [
        {
          title: "Checking only the carbon that carries the halogen",
          body:
            "In 2-chloro-3,4-dimethylhexane C3 and C4 are also stereocentres. Walk every branch-point carbon before you count.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Basic Principles — chirality and enantiomers",
      href: "/notes/mht-cet-chemistry/basic-principles-of-organic-chemistry/cetbp-isomerism",
    },
    {
      label: "Nucleophilic Substitution — where the C–X bond strength shows up",
      href: "/notes/mht-cet-chemistry/halogen-derivatives/cethal-nucleophilic-substitution",
    },
  ],
};
