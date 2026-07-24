import type { SubtopicNote } from "@/app/notes/_types";

export const POLARITY_IMF_NOTE: SubtopicNote = {
  subtopicName: "Dipole Moment, Polarity and Intermolecular Forces",
  title: "Dipole Moment, Polarity and Intermolecular Forces",
  oneLineDefinition:
    "A polar bond has a dipole; whether the whole molecule is polar depends on shape — symmetric molecules cancel their bond dipoles to zero, bent and pyramidal ones don't. The resulting polarity fixes which intermolecular force acts and hence the boiling point.",
  whyItMatters:
    "Eleven PYQs, and they cluster into three moves the bank repeats every year. " +
    "First: spot the molecule with zero (or highest, or lowest) dipole moment — always a symmetry judgement, never just 'does it have polar bonds'. " +
    "Second: name the intermolecular force between a given pair (dipole-induced dipole is the favourite). " +
    "Third: the hydrogen-bonding boiling-point question — which molecule can (or cannot) H-bond. Master symmetry, the IMF table and the N/O/F rule and the whole subtopic is yours.",
  concepts: [
    // 1 — dipole moment definition + formula (formula variant)
    {
      kind: "formula" as const,
      slug: "cetcb-pol-dipole-moment",
      name: "Dipole moment: definition and comparison",
      intuition:
        "When two different atoms share electrons, the more electronegative one pulls the shared pair closer, creating a tiny separation of charge. " +
        "The dipole moment measures the size of that separation — a bigger electronegativity difference means a bigger bond dipole. It is a vector, pointing from the positive end to the negative end.",
      definition:
        "Dipole moment facts the bank tests:\n" +
        "- The **dipole moment** \\(\\mu = q \\times d\\) — charge separated times the distance between the centres of positive and negative charge. It is a **vector** (has both size and direction).\n" +
        "- Units are the **debye (D)**; \\(1\\,\\text{D} = 3.336 \\times 10^{-30}\\,\\text{C·m}\\).\n" +
        "- A bond's dipole grows with the **electronegativity difference** of the two atoms. Down a group EN falls (F > Cl > Br > I), so the bond dipole falls: \\(\\mu(\\text{CH}_3\\text{F}) > \\mu(\\text{CH}_3\\text{Cl}) > \\mu(\\text{CH}_3\\text{Br}) > \\mu(\\text{CH}_3\\text{I})\\).\n" +
        "- To compare whole molecules, take the **vector sum** of the bond dipoles — a lone pair also contributes (its dipole can add to or oppose the bond dipoles).",
      formula: {
        label: "Dipole moment",
        latex: "\\mu = q \\times d",
        symbols: [
          { symbol: "\\(\\mu\\)", meaning: "dipole moment (debye, D)" },
          { symbol: "q", meaning: "magnitude of the separated charge" },
          { symbol: "d", meaning: "distance between the positive and negative charge centres" },
        ],
      },
      pyqExampleId: "41e9e0fc-aeae-4589-a416-47c071a751e3", // lowest dipole moment -> CH3I
      authoredExample: {
        prompt:
          "Arrange CH3F, CH3Cl, CH3Br and CH3I in decreasing order of dipole moment, given that the C–H part is the same in all four.",
        steps: [
          "All four have the same shape and the same C–H contribution, so the difference comes from the C–X bond dipole.",
          "The C–X bond dipole tracks the electronegativity of X. Down the halogen group EN falls: \\(\\text{F} > \\text{Cl} > \\text{Br} > \\text{I}\\).",
          "So the C–X dipole falls in the same order, and so does the molecular dipole moment.",
        ],
        answer: "\\(\\text{CH}_3\\text{F} > \\text{CH}_3\\text{Cl} > \\text{CH}_3\\text{Br} > \\text{CH}_3\\text{I}\\); \\(\\text{CH}_3\\text{I}\\) has the lowest dipole moment.",
      },
      selfCheckExample: {
        prompt:
          "Among H2S (~0.95 D), NH3 (~1.47 D), NF3 (~0.23 D) and CHCl3 (~1.04 D), which molecule is the most polar?",
        steps: [
          "'Most polar' means the largest net dipole moment.",
          "Compare the four given values: NH3 = 1.47 D is the largest.",
          "In NH3 the lone-pair dipole and the three N–H bond dipoles point the same way and add; in NF3 the lone-pair dipole opposes the N–F dipoles and largely cancels, giving only 0.23 D.",
        ],
        answer: "\\(\\text{NH}_3\\) (~1.47 D) is the most polar; \\(\\text{NF}_3\\) is the least despite N–F being very polar bonds.",
      },
      practiceSet: [
        { prompt: "Write the formula for dipole moment.", answer: "\\(\\mu = q \\times d\\)" },
        { prompt: "What is the SI-adjacent unit of dipole moment?", answer: "The debye (D)", method: "\\(1\\,\\text{D} = 3.336 \\times 10^{-30}\\) C·m" },
        { prompt: "Is dipole moment a scalar or a vector?", answer: "A vector", method: "it has direction, from the + end to the − end" },
        { prompt: "Which has the larger bond dipole, C–F or C–I?", answer: "C–F", method: "F is more electronegative than I" },
        { prompt: "Why is NH3 more polar than NF3?", answer: "In NH3 the lone-pair and bond dipoles add; in NF3 they oppose", method: "vector directions differ" },
      ],
      traps: [
        {
          title: "Dipole moment is a vector — add directions, not magnitudes",
          body:
            "NF3 has very polar N–F bonds yet a tiny dipole moment (~0.23 D) because its lone-pair dipole points **opposite** to the resultant of the N–F bond dipoles and nearly cancels it. In NH3 the two point the same way and add. Always sum the bond dipoles **as vectors**, and remember the lone pair contributes too.",
        },
        {
          title: "Bigger electronegativity difference → bigger bond dipole",
          body:
            "Down a group electronegativity falls, so the bond dipole falls: \\(\\mu(\\text{CH}_3\\text{F}) > \\mu(\\text{CH}_3\\text{Cl}) > \\mu(\\text{CH}_3\\text{Br}) > \\mu(\\text{CH}_3\\text{I})\\). Don't rank by molecular mass — the heaviest (CH3I) has the **smallest** dipole.",
        },
      ],
    },

    // 2 — molecular symmetry -> net dipole zero or not (formula variant, no formula box)
    {
      kind: "formula" as const,
      slug: "cetcb-pol-symmetry-net-polarity",
      name: "Symmetry: when polar bonds give a zero net dipole",
      intuition:
        "A molecule can be built entirely from polar bonds and still be non-polar overall — if its shape is symmetric, the bond dipoles point outward evenly and cancel. " +
        "The moment the shape is bent, pyramidal or otherwise lopsided, the pulls no longer cancel and the molecule has a net dipole.",
      definition:
        "The symmetry rule for net dipole moment:\n" +
        "- **Symmetric shapes cancel to zero.** Linear \\(\\text{CO}_2\\), trigonal planar \\(\\text{BF}_3\\), and tetrahedral \\(\\text{CCl}_4\\) and \\(\\text{CH}_4\\) all have **zero net dipole** — the identical bond dipoles are arranged so they sum to nothing.\n" +
        "- **Unsymmetric shapes do not cancel.** Bent \\(\\text{H}_2\\text{O}\\), pyramidal \\(\\text{NH}_3\\), and \\(\\text{CHCl}_3\\) (one C–H breaks the symmetry of CCl4) all have a **net dipole**.\n" +
        "- The test is always: *are the bond dipoles arranged symmetrically?* — not merely *does the molecule contain polar bonds?*\n" +
        "- \\(\\text{CHCl}_3\\) vs \\(\\text{CCl}_4\\) is the classic pair: replacing one Cl with H destroys the tetrahedral cancellation, so CHCl3 is polar while CCl4 is not.",
      pyqExampleId: "88ba975a-8fab-480c-a886-867c99150d70", // zero dipole moment -> BF3
      authoredExample: {
        prompt:
          "Which of CO2, BF3, CCl4 and H2O has a non-zero net dipole moment?",
        steps: [
          "CO2 is linear: the two C=O dipoles point in exactly opposite directions and cancel → zero.",
          "BF3 is trigonal planar and CCl4 is tetrahedral: the identical bond dipoles are symmetric and cancel → zero.",
          "H2O is bent (~104.5°): the two O–H dipoles do not point oppositely, so they add to a net dipole.",
        ],
        answer: "\\(\\text{H}_2\\text{O}\\) — its bent shape prevents the O–H dipoles cancelling; the other three are symmetric and non-polar.",
      },
      selfCheckExample: {
        prompt:
          "Identify the molecule that HAS a dipole moment: BF3, CH4, CHCl3 or CCl4.",
        steps: [
          "BF3 (trigonal planar), CH4 and CCl4 (both tetrahedral) are all symmetric, so their bond dipoles cancel to zero.",
          "CHCl3 replaces one Cl of CCl4 with H, breaking the tetrahedral symmetry.",
          "The three C–Cl dipoles no longer cancel with the C–H bond, leaving a net dipole.",
        ],
        answer: "\\(\\text{CHCl}_3\\) — the odd H breaks CCl4's symmetry, so it is polar; BF3, CH4 and CCl4 are all non-polar.",
      },
      practiceSet: [
        { prompt: "Does CO2 have a net dipole moment?", answer: "No (zero)", method: "linear and symmetric — the two C=O dipoles cancel" },
        { prompt: "Does BF3 have a net dipole moment?", answer: "No (zero)", method: "trigonal planar, symmetric" },
        { prompt: "Does CCl4 have a net dipole moment?", answer: "No (zero)", method: "tetrahedral, symmetric" },
        { prompt: "Does CHCl3 have a net dipole moment?", answer: "Yes", method: "one C–H breaks the symmetry of CCl4" },
        { prompt: "Why is H2O polar but CO2 is not?", answer: "H2O is bent so its dipoles don't cancel; CO2 is linear and they do" },
      ],
      traps: [
        {
          title: "Polar bonds do NOT guarantee a polar molecule",
          body:
            "BF3, CCl4, CH4 and CO2 are built from polar bonds yet have **zero net dipole** because their symmetric shapes make the bond dipoles cancel. Never answer 'it has a net dipole' just because you see electronegative atoms — check the **shape** first.",
        },
        {
          title: "CHCl3 is polar; CCl4 is not",
          body:
            "The single most-tested pair here. \\(\\text{CCl}_4\\) is perfectly tetrahedral, so its four C–Cl dipoles cancel → \\(\\mu = 0\\). \\(\\text{CHCl}_3\\) swaps one Cl for H, breaking that symmetry, so it has a net dipole. Same atoms, opposite answer — symmetry decides.",
        },
      ],
    },

    // 3 — intermolecular forces (reference table)
    {
      kind: "reference" as const,
      slug: "cetcb-pol-intermolecular-forces",
      name: "Types of intermolecular force",
      intuition:
        "Whether molecules are polar or not decides which weak force holds them together, and that force in turn sets the melting and boiling point. " +
        "The bank's job is usually just to name the force acting between a given pair of species — so learn which molecule shows which force and their strength order.",
      definition:
        "The intermolecular forces (van der Waals forces, plus hydrogen bonding), weakest to strongest:\n" +
        "- **London / dispersion forces** — momentary induced dipoles between **any** molecules, including non-polar ones (the only force in \\(\\text{CH}_4\\), \\(\\text{C}_6\\text{H}_6\\)). They grow with molecular size, so among HX gases dispersion is largest in **HI**.\n" +
        "- **Dipole–induced dipole (Debye)** — a **polar** molecule induces a dipole in a nearby **non-polar** one (e.g. \\(\\text{NH}_3 + \\text{C}_6\\text{H}_6\\)).\n" +
        "- **Dipole–dipole** — between two **polar** molecules; strongest for the largest dipole (among HX, **HF** has the largest dipole–dipole force).\n" +
        "- **Hydrogen bonding** — a special, strong dipole–dipole force when H is bonded to N, O or F (covered in the next concept).",
      table: {
        columns: ["Force", "Acts between", "Strength", "Example pair"],
        rows: [
          {
            cells: [
              "London / dispersion",
              "Any molecules (even non-polar)",
              "Weakest (grows with size)",
              "CH4 + C2H6",
            ],
            noteAmber: "Present in every substance; the ONLY force in non-polar molecules. Largest among HX in HI (biggest, most polarisable).",
          },
          {
            cells: [
              "Dipole–induced dipole (Debye)",
              "One polar + one non-polar molecule",
              "Weak",
              "NH3 + C6H6",
            ],
            pyqExampleId: "0a0f266c-4862-4e69-a7b7-daa15c13f316", // dipole-induced dipole -> NH3 + C6H6
          },
          {
            cells: [
              "Dipole–dipole",
              "Two polar molecules",
              "Moderate (bigger dipole → stronger)",
              "HF, HCl (polar HX)",
            ],
            noteAmber: "Strongest dipole–dipole among the hydrogen halides is HF, because F gives the largest bond dipole.",
          },
          {
            cells: [
              "Hydrogen bonding",
              "H on N/O/F, near a lone pair on N/O/F",
              "Strongest of these",
              "H2O, NH3, HF, alcohols",
            ],
          },
        ],
        caption: "Polar–polar → dipole–dipole; polar–non-polar → dipole-induced dipole; non-polar only → dispersion; H on N/O/F → hydrogen bond.",
      },
      pyqExampleId: "7f130e66-ed22-45ce-a600-10b56fe55d20", // force between polar and non-polar -> dipole-induced dipole
      selfCheckExample: {
        prompt:
          "Which intermolecular force acts (a) between NH3 and benzene, and (b) which hydrogen halide has the strongest dipole–dipole force?",
        steps: [
          "NH3 is polar; benzene (C6H6) is non-polar. A polar molecule near a non-polar one induces a dipole → dipole-induced dipole (Debye) force.",
          "Dipole–dipole strength tracks the dipole moment; among HF, HCl, HBr, HI the dipole is largest for HF (F is the most electronegative).",
          "So HF has the strongest dipole–dipole force.",
        ],
        answer: "(a) dipole-induced dipole (Debye) interaction; (b) HF has the strongest dipole–dipole force.",
      },
      practiceSet: [
        { prompt: "Which force acts between a polar and a non-polar molecule?", answer: "Dipole-induced dipole (Debye) interaction" },
        { prompt: "Which is the only intermolecular force in a non-polar molecule like CH4?", answer: "London / dispersion forces" },
        { prompt: "Among HF, HCl, HBr, HI, which has the strongest dipole–dipole force?", answer: "HF", method: "largest dipole moment" },
        { prompt: "Among HF, HCl, HBr, HI, which has the largest dispersion force?", answer: "HI", method: "largest, most polarisable molecule" },
        { prompt: "Which force acts between two polar molecules?", answer: "Dipole–dipole interaction" },
      ],
      traps: [
        {
          title: "Dipole–dipole vs dispersion point to different HX",
          body:
            "For the hydrogen halides, the **strongest dipole–dipole** force is in **HF** (largest bond dipole), but the **largest dispersion** force is in **HI** (biggest, most polarisable). The question wording decides — read whether it asks for dipole–dipole or for total van der Waals / dispersion.",
        },
        {
          title: "Match the force to the pair's polarity",
          body:
            "Two polar molecules → dipole–dipole. One polar + one non-polar → dipole-induced dipole. Both non-polar → dispersion only. Check the polarity of **both** species before naming the force.",
        },
      ],
    },

    // 4 — hydrogen bonding (formula variant, no formula box)
    {
      kind: "formula" as const,
      slug: "cetcb-pol-hydrogen-bonding",
      name: "Hydrogen bonding and boiling point",
      intuition:
        "Hydrogen bonding is an unusually strong attraction that forms when a hydrogen atom is tied to a small, very electronegative atom — nitrogen, oxygen or fluorine. " +
        "It behaves like a weak extra bond between molecules, so substances that can hydrogen-bond have abnormally high boiling points; those that can't boil lower.",
      definition:
        "The rule and its consequence:\n" +
        "- Hydrogen bonding needs H **covalently bonded to N, O or F** (the small, highly electronegative atoms) AND a nearby lone pair on another N, O or F to attract it. Memorise it as the **N/O/F rule**.\n" +
        "- Molecules with an **O–H or N–H** group (water, alcohols, phenol, ammonia, carboxylic acids, primary and secondary amines) form intermolecular hydrogen bonds and boil high.\n" +
        "- Molecules with **no H on N/O/F** (hydrocarbons like butane; ethers like CH3–O–CH3; tertiary amines with no N–H) **cannot donate** a hydrogen bond, so they boil low.\n" +
        "- \\(\\text{H}_2\\text{S}\\) barely hydrogen-bonds — S is large and not electronegative enough, which is why \\(\\text{H}_2\\text{O}\\) boils far higher than \\(\\text{H}_2\\text{S}\\).",
      pyqExampleId: "3d07ad74-117e-4cd4-b7a0-5c456fdac971", // does NOT form intermolecular H-bond -> butane
      authoredExample: {
        prompt:
          "Which of these does NOT form intermolecular hydrogen bonding: ethanol (C2H5OH), butane (C4H10), phenol (C6H5OH) or butan-1-ol (C4H9OH)?",
        steps: [
          "Hydrogen bonding needs H attached to N, O or F.",
          "Ethanol, phenol and butan-1-ol all carry an O–H group → they hydrogen-bond.",
          "Butane is a hydrocarbon: its only bonds are C–C and C–H, with no H on N/O/F.",
        ],
        answer: "Butane — it has no O–H or N–H, so it cannot form intermolecular hydrogen bonds (the others all can).",
      },
      selfCheckExample: {
        prompt:
          "Which has the lowest boiling point: (C2H5)2NH, C2H5N(CH3)2, n-C4H9OH or C2H5COOH?",
        steps: [
          "Boiling point here is governed by how well each can hydrogen-bond.",
          "n-C4H9OH (O–H) and C2H5COOH (an acid, which even dimerises via H-bonds) hydrogen-bond strongly; (C2H5)2NH is a secondary amine with an N–H, so it can too.",
          "C2H5N(CH3)2 is a tertiary amine — nitrogen carries NO hydrogen, so it cannot donate a hydrogen bond.",
        ],
        answer: "\\(\\text{C}_2\\text{H}_5\\text{N}(\\text{CH}_3)_2\\) — the tertiary amine has no N–H, so it cannot H-bond and boils lowest.",
      },
      practiceSet: [
        { prompt: "Hydrogen bonding forms only when H is bonded to which three atoms?", answer: "N, O or F", method: "the N/O/F rule" },
        { prompt: "Can butane form intermolecular hydrogen bonds?", answer: "No", method: "no H on N/O/F (only C–H, C–C)" },
        { prompt: "Can dimethyl ether (CH3–O–CH3) donate a hydrogen bond?", answer: "No", method: "it has no O–H; it can only accept" },
        { prompt: "Why does a tertiary amine like C2H5N(CH3)2 have a low boiling point?", answer: "No N–H, so it cannot form intermolecular H-bonds" },
        { prompt: "Why does H2O boil higher than H2S?", answer: "H2O hydrogen-bonds (H on O); S is too large/weakly electronegative for H2S to H-bond well" },
      ],
      traps: [
        {
          title: "No H on N/O/F means no hydrogen-bond donor",
          body:
            "A molecule can contain N, O or F and still not hydrogen-bond as a **donor** if there is no H directly on that atom. Ethers (CH3–O–CH3) and tertiary amines (no N–H) cannot **donate** a hydrogen bond, so they boil lower than alcohols and primary/secondary amines of similar size.",
        },
        {
          title: "H2S does not hydrogen-bond like H2O",
          body:
            "Students extend H-bonding to \\(\\text{H}_2\\text{S}\\) by analogy with water, but sulphur is large and not electronegative enough — \\(\\text{H}_2\\text{S}\\) shows only weak dipole–dipole/dispersion forces, which is exactly why it is a gas while water is a liquid.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Ionic and Covalent Bonding (NDA)",
      href: "/notes/nda-chemistry/chemical-bonding/ionic-covalent",
    },
  ],
};
