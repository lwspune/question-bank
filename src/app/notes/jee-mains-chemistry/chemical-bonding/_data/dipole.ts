import type { SubtopicNote } from "@/app/notes/_types";

export const DIPOLE_BOND_NOTE: SubtopicNote = {
  subtopicName: "Dipole Moment, Hydrogen Bonding and Intermolecular Forces",
  title: "Dipole Moment, Hydrogen Bonding and Intermolecular Forces",
  oneLineDefinition:
    "A molecule's dipole moment is the vector sum of its bond dipoles and lone-pair moments, so symmetry can cancel it; hydrogen bonds and other intermolecular forces then decide how molecules hold together.",
  whyItMatters:
    "Twenty-seven PYQs, nineteen of them multiple choice, and two from 2026. Seven ask about the size or direction of a dipole moment, most often NH₃ against NF₃; nine count or pick polar and non-polar molecules; eleven test hydrogen bonding and other intermolecular forces. Three ideas cover the page.",
  concepts: [
    // C1 — size and direction of the dipole moment
    {
      kind: "formula" as const,
      slug: "jcbond-dipole-direction",
      name: "Dipole moment: size and direction",
      intuition:
        "When two bonded atoms differ in electronegativity, the shared electrons shift towards one of them, leaving a small positive and a small negative end. The dipole moment is that charge times the distance between the ends. In a molecule, the bond moments and any lone-pair moment add as vectors.",
      definition:
        "- \\(\\mu = q \\times d\\). Unit: debye, \\(1\\ \\text{D} = 10^{-18}\\) esu cm \\(= 3.336 \\times 10^{-30}\\) C m. The electron's charge is \\(4.8 \\times 10^{-10}\\) esu.\n" +
        "- Chemists draw a crossed arrow from the positive end to the negative end: the cross at the positive end, the head at the negative end, showing where the electron density moves.\n" +
        "- \\(\\mathrm{NH_3}\\) (1.47 D) > \\(\\mathrm{NF_3}\\) (0.23 D). In \\(\\mathrm{NH_3}\\) the N–H bond moments point towards N and add to the lone-pair moment. In \\(\\mathrm{NF_3}\\) the N–F bond moments point away from N and partly cancel it.\n" +
        "- Values to know: \\(\\mathrm{H_2O}\\) 1.85, \\(\\mathrm{NH_3}\\) 1.47, \\(\\mathrm{CHCl_3}\\) 1.04, \\(\\mathrm{H_2S}\\) 0.95, HBr 0.79, \\(\\mathrm{NF_3}\\) 0.23 D.\n" +
        "- Fraction of ionic character \\(= \\dfrac{\\mu_{\\text{observed}}}{\\mu_{\\text{fully ionic}}}\\), with \\(\\mu_{\\text{fully ionic}} = e \\times d\\).",
      formula: {
        label: "Dipole moment",
        latex: "\\mu = q \\times d \\qquad 1\\ \\text{D} = 10^{-18}\\ \\text{esu cm}",
      },
      authoredExample: {
        prompt:
          "HCl has a dipole moment of 1.07 D and a bond length of 1.27 Å. Find the partial charge on each atom in esu, and the fraction of an electron's charge it represents (\\(e = 4.8 \\times 10^{-10}\\) esu).",
        steps: [
          "\\(d = 1.27\\ \\text{Å} = 1.27 \\times 10^{-8}\\) cm; \\(\\mu = 1.07 \\times 10^{-18}\\) esu cm.",
          "\\(q = \\dfrac{\\mu}{d} = \\dfrac{1.07 \\times 10^{-18}}{1.27 \\times 10^{-8}} = 8.43 \\times 10^{-11}\\) esu.",
          "Fraction of \\(e\\): \\(\\dfrac{8.43 \\times 10^{-11}}{4.8 \\times 10^{-10}} = 0.176\\).",
        ],
        answer: "\\(8.4 \\times 10^{-11}\\) esu, about 0.18 of an electron's charge (about 18% ionic).",
      },
      selfCheckExample: {
        prompt:
          "A diatomic molecule AB has a bond length of 1.5 Å and partial charges of \\(\\pm 0.2e\\) (\\(e = 4.8 \\times 10^{-10}\\) esu). Find its dipole moment in debye.",
        steps: [
          "\\(q = 0.2 \\times 4.8 \\times 10^{-10} = 9.6 \\times 10^{-11}\\) esu.",
          "\\(\\mu = 9.6 \\times 10^{-11} \\times 1.5 \\times 10^{-8} = 1.44 \\times 10^{-18}\\) esu cm.",
        ],
        answer: "1.44 D.",
      },
      practiceSet: [
        { prompt: "Which has the larger dipole moment, \\(\\mathrm{NH_3}\\) or \\(\\mathrm{NF_3}\\)?", answer: "\\(\\mathrm{NH_3}\\)" },
        { prompt: "Which has the larger dipole moment, \\(\\mathrm{H_2O}\\) or \\(\\mathrm{H_2S}\\)?", answer: "\\(\\mathrm{H_2O}\\) (1.85 D against 0.95 D)" },
        { prompt: "In the chemist's crossed arrow, where is the cross?", answer: "At the positive end" },
        { prompt: "Convert 2 D to esu cm.", answer: "\\(2 \\times 10^{-18}\\) esu cm" },
      ],
      pyqExampleId: "f19ccd62-faa8-47d1-a8d0-67b1480e6614", // 2026 — lowest dipole among five molecules, then its lone pairs
      traps: [
        {
          title: "More electronegative F does not mean a bigger dipole",
          body: "Each N–F bond is more polar than an N–H bond, yet \\(\\mathrm{NF_3}\\) (0.23 D) is far less polar than \\(\\mathrm{NH_3}\\) (1.47 D). The lone-pair moment adds to the bond moments in \\(\\mathrm{NH_3}\\) and opposes them in \\(\\mathrm{NF_3}\\).",
        },
        {
          title: "The two arrow conventions point opposite ways",
          body: "The chemist's arrow runs from positive to negative, following the electron density. The physicist's dipole vector runs from negative to positive. A statement that puts the tail on the negative centre describes the physics convention.",
        },
      ],
    },

    // C2 — polar or non-polar
    {
      kind: "reference" as const,
      slug: "jcbond-polar-count",
      name: "Polar or non-polar: when symmetry cancels",
      intuition:
        "Polar bonds do not always make a polar molecule. If identical bonds point symmetrically around the centre with no lone pair to spoil the balance, their moments cancel to zero. Change one outer atom, or add a lone pair that bends the shape, and a net dipole appears.",
      definition:
        "- Zero dipole: symmetric shapes with identical outer atoms and no net lone-pair moment: linear AX₂, trigonal planar AX₃, tetrahedral AX₄, square planar AX₄E₂, trigonal bipyramidal AX₅, octahedral AX₆, and linear AX₂E₃.\n" +
        "- Non-zero dipole: bent, pyramidal, see-saw, T-shaped and square pyramidal shapes; any heteronuclear diatomic; a symmetric shape with mixed outer atoms (\\(\\mathrm{CHCl_3}\\), \\(\\mathrm{CH_2Cl_2}\\)).\n" +
        "- Organic: \\(p\\)-dichlorobenzene and trans-1,2-dichloroethene have zero dipole; the ortho and meta isomers and the cis isomer are polar.\n" +
        "- A homonuclear diatomic (\\(\\mathrm{H_2}\\), \\(\\mathrm{N_2}\\)) is non-polar.",
      table: {
        columns: ["Shape", "Net dipole", "Examples"],
        rows: [
          { cells: ["Linear AX₂ or AX₂E₃", "Zero", "\\(\\mathrm{CO_2}\\), \\(\\mathrm{BeF_2}\\), \\(\\mathrm{BeCl_2}\\), \\(\\mathrm{XeF_2}\\)"] },
          { cells: ["Trigonal planar AX₃", "Zero", "\\(\\mathrm{BF_3}\\), \\(\\mathrm{BCl_3}\\), \\(\\mathrm{SO_3}\\)"] },
          { cells: ["Tetrahedral AX₄", "Zero", "\\(\\mathrm{CH_4}\\), \\(\\mathrm{CCl_4}\\), \\(\\mathrm{SiF_4}\\)"] },
          { cells: ["Square planar, TBP, octahedral", "Zero", "\\(\\mathrm{XeF_4}\\), \\(\\mathrm{PCl_5}\\), \\(\\mathrm{SF_6}\\)"] },
          { cells: ["Bent", "Non-zero", "\\(\\mathrm{H_2O}\\), \\(\\mathrm{H_2S}\\), \\(\\mathrm{SO_2}\\)"] },
          { cells: ["Pyramidal", "Non-zero", "\\(\\mathrm{NH_3}\\), \\(\\mathrm{NF_3}\\), \\(\\mathrm{PCl_3}\\)"] },
          { cells: ["See-saw, T-shaped, square pyramidal", "Non-zero", "\\(\\mathrm{SF_4}\\), \\(\\mathrm{ClF_3}\\), \\(\\mathrm{BrF_5}\\)"] },
          { cells: ["Tetrahedral with mixed atoms", "Non-zero", "\\(\\mathrm{CHCl_3}\\), \\(\\mathrm{CH_2Cl_2}\\)"] },
          { cells: ["Heteronuclear diatomic", "Non-zero", "HF, HCl, HBr"], noteAmber: "H₂ has zero dipole; HF, with the biggest electronegativity gap, has the largest of the hydrogen halides." },
        ],
        caption: "A lone pair on the centre breaks the symmetry unless the lone pairs themselves are placed symmetrically, as in XeF₂ and XeF₄.",
      },
      selfCheckExample: {
        prompt:
          "How many of these have a non-zero dipole moment: \\(\\mathrm{SO_2}\\), \\(\\mathrm{XeF_4}\\), \\(\\mathrm{PCl_5}\\), \\(\\mathrm{CH_2Cl_2}\\), \\(\\mathrm{BCl_3}\\), \\(\\mathrm{ClF_3}\\), \\(\\mathrm{SF_6}\\)?",
        steps: [
          "\\(\\mathrm{SO_2}\\) is bent and \\(\\mathrm{ClF_3}\\) is T-shaped: both polar.",
          "\\(\\mathrm{CH_2Cl_2}\\) is tetrahedral with mixed atoms: polar.",
          "\\(\\mathrm{XeF_4}\\), \\(\\mathrm{PCl_5}\\), \\(\\mathrm{BCl_3}\\) and \\(\\mathrm{SF_6}\\) are symmetric: zero.",
        ],
        answer: "3.",
      },
      practiceSet: [
        { prompt: "Is \\(\\mathrm{BeH_2}\\) polar?", answer: "No; linear, zero dipole" },
        { prompt: "Which is polar, cis- or trans-2-butene?", answer: "cis-2-butene" },
        { prompt: "Is 1,3-dichlorobenzene polar?", answer: "Yes" },
        { prompt: "Is \\(\\mathrm{SF_4}\\) polar?", answer: "Yes; see-saw" },
      ],
      pyqExampleId: "87a0a68a-ae77-4b9c-b942-9afda3f22f7a", // 2024 — count the zero-dipole molecules in a list of eleven
      traps: [
        {
          title: "Polar bonds can give a non-polar molecule",
          body: "C–Cl and B–F bonds are strongly polar, but \\(\\mathrm{CCl_4}\\) and \\(\\mathrm{BF_3}\\) have zero dipole moment. Ask whether the shape is symmetric, not whether the bonds are polar.",
        },
        {
          title: "Lone pairs do not always make a molecule polar",
          body: "\\(\\mathrm{XeF_4}\\) has two lone pairs and \\(\\mathrm{XeF_2}\\) has three, yet both are non-polar: the lone pairs sit opposite each other or round the equator, and their moments cancel.",
        },
      ],
    },

    // C3 — hydrogen bonding and intermolecular forces
    {
      kind: "reference" as const,
      slug: "jcbond-hbond-imf",
      name: "Hydrogen bonding and intermolecular forces",
      intuition:
        "A hydrogen bonded to F, O or N is left almost bare, so it is pulled strongly towards a lone pair on a nearby F, O or N. That is a hydrogen bond. It can link two molecules (intermolecular) or two groups inside one molecule (intramolecular), and which one happens changes boiling points and volatility.",
      definition:
        "- A hydrogen bond needs H covalently bonded to a small, highly electronegative atom (F, O, N) and a lone pair on another such atom.\n" +
        "- Intermolecular H-bonds join molecules: water, HF (zig-zag chains), \\(\\mathrm{NH_3}\\), \\(p\\)-nitrophenol. They raise the boiling point.\n" +
        "- Intramolecular H-bonds close a ring inside one molecule: \\(o\\)-nitrophenol, salicylaldehyde. The molecule has fewer links to its neighbours, so it boils lower and is steam volatile.\n" +
        "- The extent of H-bonding depends on the physical state: ice > liquid water > vapour; dissolved impurities disrupt it.\n" +
        "- Other forces: London (dispersion) forces act between all molecules, with energy \\(\\propto 1/r^6\\); dipole-dipole energy \\(\\propto 1/r^3\\) for fixed polar molecules and \\(1/r^6\\) for rotating ones.",
      table: {
        columns: ["Case", "Kind of attraction", "Effect"],
        rows: [
          { cells: ["HF", "Intermolecular H-bonds, zig-zag chains", "The strongest single H-bond; the H sits nearer one F, so the bonds are not symmetrical"] },
          { cells: ["Ice, water, water with solute", "Intermolecular H-bonds", "Most in ice (each molecule bonded four ways), fewer in liquid water, fewer again with impurities"] },
          { cells: ["\\(o\\)-Nitrophenol, salicylaldehyde", "Intramolecular H-bond", "Lower boiling point; steam volatile"] },
          { cells: ["\\(p\\)-Nitrophenol, \\(p\\)-hydroxybenzaldehyde", "Intermolecular H-bonds", "Higher boiling point; not steam volatile"] },
          { cells: ["\\(\\mathrm{CH_4 < HCN < NH_3}\\)", "None, weak C–H···N, N–H···N", "Order of intermolecular H-bond strength"] },
          { cells: ["Noble gases, \\(\\mathrm{CH_4}\\)", "London forces only", "Energy \\(\\propto 1/r^6\\); grows with molecular size"] },
          { cells: ["Ar, \\(\\mathrm{CH_4}\\), \\(\\mathrm{H_2O}\\), \\(\\mathrm{C_6H_6}\\)", "Van der Waals constant a (about 1.4, 2.3, 5.5, 18 L² bar mol⁻²)", "Larger a means stronger attraction between molecules"] },
        ],
        caption: "H bonded to F, O or N gives a hydrogen bond; where it forms, inside or between molecules, decides the boiling point.",
      },
      selfCheckExample: {
        prompt: "Which is steam volatile, 2-hydroxybenzaldehyde or 4-hydroxybenzaldehyde? Give the reason.",
        steps: [
          "In the 2-isomer the OH and CHO groups are adjacent and form a hydrogen bond inside the molecule.",
          "In the 4-isomer they are too far apart, so the OH bonds to neighbouring molecules instead.",
          "Fewer links between molecules means a lower boiling point.",
        ],
        answer: "2-Hydroxybenzaldehyde, because its hydrogen bond is intramolecular.",
      },
      practiceSet: [
        { prompt: "Is the hydrogen bond in \\(o\\)-nitrophenol intra- or intermolecular?", answer: "Intramolecular" },
        { prompt: "Can \\(\\mathrm{CH_4}\\) form hydrogen bonds?", answer: "No" },
        { prompt: "London interaction energy varies as \\(r^x\\). What is \\(x\\)?", answer: "\\(-6\\)" },
        { prompt: "Where is hydrogen bonding most extensive: ice, liquid water or steam?", answer: "Ice" },
      ],
      pyqExampleId: "afb6976a-6c54-4ae3-ba8e-8b22fe4ccecf", // 2024 — which statements about hydrogen bonding are correct
      traps: [
        {
          title: "Ortho means intramolecular",
          body: "The ortho isomer of a nitrophenol or hydroxybenzaldehyde bonds within itself; the para isomer bonds to its neighbours. Swapping them reverses every boiling-point and volatility answer.",
        },
        {
          title: "HF has no intramolecular hydrogen bond",
          body: "One HF molecule has a single H–F bond, so it cannot bond to itself. Its hydrogen bonds link separate molecules into chains, and they are not symmetrical.",
        },
      ],
    },
  ],
};
