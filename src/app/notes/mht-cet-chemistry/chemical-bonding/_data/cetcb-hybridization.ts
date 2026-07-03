import type { SubtopicNote } from "@/app/notes/_types";

export const HYBRIDIZATION_NOTE: SubtopicNote = {
  subtopicName: "Hybridization",
  title: "Hybridization",
  oneLineDefinition:
    "Hybridization mixes an atom's pure s, p (and sometimes d) atomic orbitals into an equal number of identical hybrid orbitals — and the count of those hybrids, the steric number, fixes the molecule's shape and bond angle.",
  whyItMatters:
    "Seven PYQs, mostly EASY recall plus one MODERATE — the most reliable single topic in Chemical Bonding. " +
    "They come in three shapes: name-the-hybridization-and-geometry (CH4 -> sp3, tetrahedral; SF4 -> sp3d, see-saw), pick-the-odd-one-out (which molecule is NOT sp3), and match hybridization to shape (sp2 -> trigonal planar). " +
    "Every one of them is settled by counting the steric number = bond pairs + lone pairs on the central atom, so master that one count and you never drop a mark here.",
  concepts: [
    // FOUNDATION — valence bond theory + sigma/pi bonds (State Board 5.4) — the basis for hybridization
    {
      kind: "reference" as const,
      slug: "cetcb-hyb-valence-bond-sigma-pi",
      name: "Valence bond theory: sigma and pi bonds",
      intuition:
        "Valence bond theory pictures a covalent bond as the overlap of two half-filled atomic orbitals. Head-on (axial) overlap gives a strong sigma bond; sideways overlap of parallel p-orbitals gives a weaker pi bond. Count them by bond multiplicity: single = one sigma, double = one sigma + one pi, triple = one sigma + two pi.",
      definition:
        "Valence bond theory (Heitler-London, Pauling):\n" +
        "- A **covalent bond forms when two half-filled atomic orbitals overlap** and pair their electrons; the greater the overlap, the stronger the bond.\n" +
        "- **Sigma \\(\\sigma\\) bond** — end-on (axial) overlap along the internuclear axis (s-s, s-p or p-p axial). Strong; allows free rotation.\n" +
        "- **Pi \\(\\pi\\) bond** — sideways (lateral) overlap of two parallel p-orbitals, above and below the axis. Weaker than sigma; no free rotation.\n" +
        "- **Bond multiplicity**: single \\(= 1\\sigma\\); double \\(= 1\\sigma + 1\\pi\\); triple \\(= 1\\sigma + 2\\pi\\). The first bond between two atoms is always a sigma bond.",
      table: {
        columns: ["Bond", "Sigma and pi", "Example"],
        rows: [
          { cells: ["Single bond", "\\(1\\sigma\\)", "\\(\\text{H}-\\text{H}\\); C-C in ethane"] },
          { cells: ["Double bond", "\\(1\\sigma + 1\\pi\\)", "\\(\\text{C}=\\text{C}\\) in ethene; \\(\\text{O}=\\text{O}\\)"] },
          { cells: ["Triple bond", "\\(1\\sigma + 2\\pi\\)", "\\(\\text{C}\\equiv\\text{C}\\) in ethyne; \\(\\text{N}\\equiv\\text{N}\\)"] },
        ],
        caption: "The first bond between two atoms is always a sigma bond; any extra bonds are pi.",
      },
      practiceSet: [
        { prompt: "How is a sigma bond formed?", answer: "By end-on (axial) overlap of orbitals along the internuclear axis." },
        { prompt: "How is a pi bond formed?", answer: "By sideways (lateral) overlap of two parallel p-orbitals." },
        { prompt: "How many sigma and pi bonds are in a triple bond such as \\(\\text{N}\\equiv\\text{N}\\)?", answer: "One sigma and two pi." },
        { prompt: "Which is stronger, a sigma or a pi bond?", answer: "Sigma — its axial overlap is more effective." },
        { prompt: "How many pi bonds are in a carbon-carbon double bond?", answer: "One." },
      ],
      traps: [
        {
          title: "The first bond is always sigma",
          body:
            "In any single, double or triple bond the FIRST bond is a **sigma** bond; only the additional bonds are pi. So a double bond is \\(1\\sigma + 1\\pi\\) (not \\(2\\pi\\)), and a triple bond is \\(1\\sigma + 2\\pi\\).",
        },
        {
          title: "Sigma is stronger than pi; pi locks rotation",
          body:
            "Axial overlap in a sigma bond is more effective than the sideways overlap of a pi bond, so a **sigma bond is stronger**. A pi bond also fixes the geometry — there is no free rotation about a double or triple bond.",
        },
      ],
    },

    // What hybridization is (formula variant, no formula box) — tests CH4 hybridization+geometry
    {
      kind: "formula" as const,
      slug: "cetcb-hyb-what-is-hybridization",
      name: "What hybridization is",
      intuition:
        "Pure atomic orbitals (one s, three p, ...) have different shapes and energies, so they cannot on their own explain why the four C-H bonds in methane are identical. " +
        "Hybridization is the idea that the central atom blends its valence orbitals into a new set of equivalent hybrid orbitals — as many hybrids as the orbitals mixed — which then point in fixed directions and hold the bonds.",
      definition:
        "**Hybridization** is the intermixing of atomic orbitals of nearly equal energy on the same atom to form an equal number of new, identical **hybrid orbitals**:\n" +
        "- The **number of hybrid orbitals formed = number of atomic orbitals mixed**. One s + three p give four \\(sp^3\\) hybrids.\n" +
        "- The hybrids are **equivalent in shape and energy** and point in fixed directions, which is what sets the molecular shape and bond angle.\n" +
        "- More **s-character** pulls the electrons closer to the nucleus and **widens the bond angle**: \\(sp\\) (50% s) \\(\\to 180^\\circ\\), \\(sp^2\\) (33% s) \\(\\to 120^\\circ\\), \\(sp^3\\) (25% s) \\(\\to 109.5^\\circ\\).\n" +
        "- Each hybrid orbital forms one **\\(\\sigma\\) bond** or holds one **lone pair**; \\(\\pi\\) bonds use the leftover unhybridized p orbitals.",
      pyqExampleId: "1e79e75c-0aa5-49d0-a687-e45bd7c17d42", // CH4 -> sp3, tetrahedral
      authoredExample: {
        prompt:
          "Explain why carbon in methane forms four identical bonds at 109.5 degrees, and name its hybridization.",
        steps: [
          "A free carbon atom has one \\(2s\\) and three \\(2p\\) orbitals in its valence shell — four orbitals of nearly equal energy.",
          "These four mix into four equivalent \\(sp^3\\) hybrid orbitals, each with the same shape and energy.",
          "The four hybrids repel to the farthest-apart arrangement — pointing to the corners of a tetrahedron at \\(109.5^\\circ\\).",
          "Each hybrid overlaps with a hydrogen \\(1s\\) orbital, so all four C-H bonds are identical.",
        ],
        answer:
          "Carbon is \\(sp^3\\) hybridized: four equivalent hybrid orbitals give a tetrahedral shape with \\(109.5^\\circ\\) bond angles.",
      },
      selfCheckExample: {
        prompt:
          "How many hybrid orbitals form when one s orbital mixes with two p orbitals, and what is the hybridization called?",
        steps: [
          "Number of hybrids formed = number of atomic orbitals mixed.",
          "Here 1 s + 2 p = 3 orbitals, so 3 hybrid orbitals form.",
          "One s and two p mixed is called \\(sp^2\\) hybridization.",
        ],
        answer: "Three hybrid orbitals; the hybridization is \\(sp^2\\).",
      },
      practiceSet: [
        { prompt: "Hybridization of carbon in \\(CH_4\\)?", answer: "\\(sp^3\\)" },
        { prompt: "How many hybrid orbitals form in \\(sp^3\\) hybridization?", answer: "Four", method: "1 s + 3 p = 4 orbitals mixed" },
        { prompt: "Which has more s-character, \\(sp\\) or \\(sp^3\\)?", answer: "\\(sp\\) (50% vs 25%)" },
        { prompt: "What does more s-character do to the bond angle?", answer: "Widens it", method: "\\(sp\\) 180, \\(sp^2\\) 120, \\(sp^3\\) 109.5" },
      ],
      traps: [
        {
          title: "Hybrids formed = orbitals mixed, not bonds made",
          body:
            "The number of hybrid orbitals equals the number of atomic orbitals that intermix, not the number of bonds. Water's oxygen is \\(sp^3\\) (four hybrids) even though it makes only two bonds — the other two hybrids hold lone pairs.",
        },
      ],
    },

    // Steric-number master table (reference variant) — tests sp2/sp/sp3d/sp3d2 recall
    {
      kind: "reference" as const,
      slug: "cetcb-hyb-steric-number-table",
      name: "The steric-number master table",
      intuition:
        "You do not need to memorise a shape for every molecule — you need one count. " +
        "Add the bond pairs and lone pairs on the central atom to get the steric number, and the steric number maps straight to the hybridization, the geometry and the bond angle.",
      definition:
        "The **steric number (SN)** = (number of \\(\\sigma\\)-bonded atoms) + (number of lone pairs) on the central atom. It fixes everything:\n" +
        "- **SN 2** \\(\\to sp\\), linear, \\(180^\\circ\\).\n" +
        "- **SN 3** \\(\\to sp^2\\), trigonal planar, \\(120^\\circ\\).\n" +
        "- **SN 4** \\(\\to sp^3\\), tetrahedral, \\(109.5^\\circ\\).\n" +
        "- **SN 5** \\(\\to sp^3d\\), trigonal bipyramidal, \\(90^\\circ\\) and \\(120^\\circ\\).\n" +
        "- **SN 6** \\(\\to sp^3d^2\\), octahedral, \\(90^\\circ\\).\n" +
        "Lone pairs count toward SN (so they set the hybridization) but the **shape name** you report is the arrangement of the atoms only.",
      table: {
        columns: ["Steric number", "Hybridization", "Geometry", "Bond angle", "Example"],
        rows: [
          {
            cells: ["2", "\\(sp\\)", "Linear", "\\(180^\\circ\\)", "\\(BeCl_2\\), \\(C_2H_2\\)"],
            noteAmber:
              "Acetylene \\(C_2H_2\\) has \\(sp\\) carbons (two atoms + one triple bond that counts as one \\(\\sigma\\)) — the bank's classic \\(sp\\) example.",
            pyqExampleId: "2a289762-ede7-4c35-80c7-b410c7430d7e",
          },
          {
            cells: ["3", "\\(sp^2\\)", "Trigonal planar", "\\(120^\\circ\\)", "\\(BF_3\\), \\(C_2H_4\\)"],
            noteAmber:
              "Trigonal planar geometry means \\(sp^2\\) — the answer to 'which hybridisation gives trigonal geometry'.",
            pyqExampleId: "07f33cb1-8bab-4d9b-981b-4eec410b8448",
          },
          {
            cells: ["4", "\\(sp^3\\)", "Tetrahedral", "\\(109.5^\\circ\\)", "\\(CH_4\\), \\(NH_3\\), \\(H_2O\\)"],
          },
          {
            cells: ["5", "\\(sp^3d\\)", "Trigonal bipyramidal", "\\(90^\\circ,\\,120^\\circ\\)", "\\(PCl_5\\), \\(SF_4\\)"],
            noteAmber:
              "\\(SF_4\\) is \\(sp^3d\\) (4 bond pairs + 1 lone pair = SN 5); the lone pair distorts it to a see-saw shape but the hybridization stays \\(sp^3d\\).",
            pyqExampleId: "281676f9-3ced-493c-832a-05e7b63425e4",
          },
          {
            cells: ["6", "\\(sp^3d^2\\)", "Octahedral", "\\(90^\\circ\\)", "\\(SF_6\\), \\(XeF_4\\)"],
            noteAmber:
              "\\(XeF_4\\) is \\(sp^3d^2\\) (4 bond pairs + 2 lone pairs = SN 6), square planar — NOT \\(sp^3\\).",
            pyqExampleId: "f2119c2f-8aee-4ac5-8fb8-78330d9ff542",
          },
        ],
        caption: "Count the steric number first; the row it lands in gives the hybridization, geometry and angle.",
      },
      pyqExampleId: "07f33cb1-8bab-4d9b-981b-4eec410b8448", // sp2 -> trigonal geometry
      selfCheckExample: {
        prompt:
          "The central atom of a molecule has 2 bonded atoms and 2 lone pairs. Give its steric number and hybridization.",
        steps: [
          "Steric number = bonded atoms + lone pairs = \\(2 + 2 = 4\\).",
          "SN 4 corresponds to \\(sp^3\\) hybridization.",
        ],
        answer: "Steric number 4, \\(sp^3\\) hybridization.",
      },
      practiceSet: [
        { prompt: "Steric number 2 gives which hybridization and shape?", answer: "\\(sp\\), linear, \\(180^\\circ\\)" },
        { prompt: "Which hybridization gives trigonal planar geometry?", answer: "\\(sp^2\\)", method: "SN 3, \\(120^\\circ\\)" },
        { prompt: "Hybridization and shape for steric number 6?", answer: "\\(sp^3d^2\\), octahedral, \\(90^\\circ\\)" },
        { prompt: "Bond angle of an \\(sp^3\\) hybridized central atom?", answer: "\\(109.5^\\circ\\)" },
        { prompt: "Hybridization of \\(SF_4\\)?", answer: "\\(sp^3d\\)", method: "4 bond pairs + 1 lone pair = SN 5" },
      ],
      traps: [
        {
          title: "Geometry name reports atoms only; SN includes lone pairs",
          body:
            "\\(SF_4\\) has steric number 5, so it is \\(sp^3d\\) — but its shape is called **see-saw**, not trigonal bipyramidal, because one of the five positions is a lone pair. The hybridization follows the steric number; the shape name follows only the bonded atoms.",
        },
        {
          title: "d-orbitals only appear from steric number 5",
          body:
            "\\(sp^3d\\) and \\(sp^3d^2\\) need d-orbitals and only occur for central atoms with an expanded octet (period 3 and below). If the steric number is 4 or less, the answer is \\(sp\\), \\(sp^2\\) or \\(sp^3\\) — never a d-form.",
        },
      ],
    },

    // Determining hybridization of a central atom (formula variant) — tests H2O + odd-one-out
    {
      kind: "formula" as const,
      slug: "cetcb-hyb-determining-hybridization",
      name: "Determining a central atom's hybridization",
      intuition:
        "Given a formula like \\(H_2O\\) or \\(XeF_4\\), you find the hybridization by drawing (or picturing) the central atom, counting how many atoms are bonded to it, and adding the lone pairs it carries. " +
        "That sum, the steric number, reads straight off the master table — the whole trick is remembering to count the lone pairs, which the distractors bank on you forgetting.",
      definition:
        "To find the hybridization of the central atom:\n" +
        "- Count the **\\(\\sigma\\)-bonded atoms** attached to it (a double or triple bond still counts as **one** \\(\\sigma\\) bond, i.e. one bonded atom).\n" +
        "- Add the **lone pairs** on the central atom: lone pairs \\(= \\dfrac{V - (\\text{bonding electrons used})}{2}\\), or just read them from the Lewis structure.\n" +
        "- **Steric number = bonded atoms + lone pairs**; then map SN to hybridization: 2 \\(\\to sp\\), 3 \\(\\to sp^2\\), 4 \\(\\to sp^3\\), 5 \\(\\to sp^3d\\), 6 \\(\\to sp^3d^2\\).",
      formula: {
        label: "Steric number",
        latex: "\\text{SN} = (\\sigma\\text{-bonded atoms}) + (\\text{lone pairs on central atom})",
        symbols: [
          { symbol: "\\text{SN}", meaning: "steric number, which fixes the hybridization" },
          { symbol: "\\sigma\\text{-bonded atoms}", meaning: "atoms directly bonded (each multiple bond counts once)" },
          { symbol: "\\text{lone pairs}", meaning: "non-bonding electron pairs on the central atom" },
        ],
      },
      pyqExampleId: "ea41fd10-5e5e-414c-81e7-085cfa7fab28", // H2O central atom sp3
      authoredExample: {
        prompt: "Determine the hybridization of the central atom in water, \\(H_2O\\).",
        steps: [
          "The central atom is oxygen, bonded to 2 hydrogen atoms: \\(\\sigma\\)-bonded atoms = 2.",
          "Oxygen has 6 valence electrons; 2 are used in the two O-H bonds, leaving 4 electrons = 2 lone pairs.",
          "Steric number = 2 bonded atoms + 2 lone pairs = 4.",
          "SN 4 maps to \\(sp^3\\) hybridization (bent shape, because two positions are lone pairs).",
        ],
        answer: "Oxygen is \\(sp^3\\) hybridized (steric number 4).",
      },
      selfCheckExample: {
        prompt: "Determine the hybridization of nitrogen in ammonia, \\(NH_3\\).",
        steps: [
          "Nitrogen is bonded to 3 hydrogen atoms: \\(\\sigma\\)-bonded atoms = 3.",
          "Nitrogen has 5 valence electrons; 3 are used in bonds, leaving 2 electrons = 1 lone pair.",
          "Steric number = 3 + 1 = 4.",
          "SN 4 gives \\(sp^3\\) hybridization.",
        ],
        answer: "Nitrogen is \\(sp^3\\) hybridized (steric number 4).",
      },
      practiceSet: [
        { prompt: "Hybridization of O in \\(H_2O\\)?", answer: "\\(sp^3\\)", method: "2 bonds + 2 lone pairs = SN 4" },
        { prompt: "Hybridization of N in \\(NH_3\\)?", answer: "\\(sp^3\\)", method: "3 bonds + 1 lone pair = SN 4" },
        { prompt: "Hybridization of C in \\(C_2H_2\\)?", answer: "\\(sp\\)", method: "2 atoms (triple bond counts once) = SN 2" },
        { prompt: "Hybridization of B in \\(BF_3\\)?", answer: "\\(sp^2\\)", method: "3 bonds + 0 lone pairs = SN 3" },
        { prompt: "Hybridization of Xe in \\(XeF_4\\)?", answer: "\\(sp^3d^2\\)", method: "4 bonds + 2 lone pairs = SN 6" },
      ],
      traps: [
        {
          title: "Count lone pairs on the central atom, not just the atoms",
          body:
            "\\(H_2O\\) and \\(NH_3\\) each have only 2 or 3 bonded atoms, yet both are \\(sp^3\\) — because oxygen carries 2 lone pairs and nitrogen 1. If you count only the bonded atoms you would wrongly call water \\(sp\\) and ammonia \\(sp^2\\). Always add the lone pairs.",
        },
        {
          title: "A multiple bond is one atom, not two, in the steric count",
          body:
            "In acetylene \\(C_2H_2\\) each carbon is bonded to one H and one C (a triple bond). The triple bond counts as **one** \\(\\sigma\\) bond, so the steric number is 2, giving \\(sp\\) — not \\(sp^3\\). Never count the extra \\(\\pi\\) bonds toward the steric number.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Bond Counting and Molecular Structure (NDA Chemistry)",
      href: "/notes/nda-chemistry/chemical-bonding",
    },
  ],
};
