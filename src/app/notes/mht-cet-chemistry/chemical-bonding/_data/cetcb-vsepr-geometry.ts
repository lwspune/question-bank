import type { SubtopicNote } from "@/app/notes/_types";

export const VSEPR_NOTE: SubtopicNote = {
  subtopicName: "VSEPR Theory and Molecular Geometry",
  title: "VSEPR Theory and Molecular Geometry",
  oneLineDefinition:
    "Count the electron pairs around the central atom — bond pairs plus lone pairs — and they spread out to keep as far apart as possible; the arrangement of the bond pairs is the molecule's shape, and lone pairs push the bonds closer to distort the ideal angles.",
  whyItMatters:
    "The single biggest subtopic of this chapter — 21 PYQs, and the most reliable shape-questions in MHT-CET Chemistry. " +
    "They cluster four ways: count the lone pairs on the central atom (most, fewest, equal pair, or zero), name the shape of a given molecule or AXnEm type, recall a specific bond angle, and spot which molecule keeps its regular (undistorted) geometry. " +
    "Every one of them reduces to the same two-step drill: count bond pairs and lone pairs, then read the shape off the master table — so with one table memorised a student should never drop a mark here.",
  concepts: [
    // 1. VSEPR premise — repulsion order + regular vs distorted (formula variant, no formula box)
    {
      kind: "formula" as const,
      slug: "cetcb-vsepr-premise",
      name: "The VSEPR premise: electron pairs repel and spread out",
      intuition:
        "Electron pairs around the central atom are all negatively charged, so they repel each other and settle into the arrangement that keeps them as far apart as possible. That arrangement fixes the geometry. A lone pair takes up more room than a bond pair, so lone pairs squeeze the bonds together and distort the ideal angles.",
      definition:
        "The **Valence Shell Electron Pair Repulsion (VSEPR)** theory:\n" +
        "- Electron pairs (bond pairs **and** lone pairs) around the central atom arrange themselves to **minimise repulsion** — i.e. to stay as far apart as possible.\n" +
        "- The **repulsion order** is \\(\\text{lp-lp} > \\text{lp-bp} > \\text{bp-bp}\\) (lone-pair–lone-pair is strongest, bond-pair–bond-pair weakest).\n" +
        "- A molecule has its **regular (expected) geometry** only when the central atom has **no lone pairs** — then the electron-pair geometry and the molecular shape coincide (e.g. \\(\\text{CH}_4\\), \\(\\text{SiCl}_4\\), \\(\\text{PCl}_5\\), \\(\\text{SF}_6\\)).\n" +
        "- Any **lone pair distorts** the shape, so a molecule with lone pairs does **not** show the regular parent geometry (e.g. \\(\\text{SF}_4\\) see-saw, \\(\\text{XeF}_4\\) square planar).",
      pyqExampleId: "96938ec3-844a-4ff7-a620-b2d75f75baa5", // which has regular geometry as expected -> SiCl4
      authoredExample: {
        prompt:
          "Of \\(\\text{CH}_4\\) and \\(\\text{SiCl}_4\\), do they have the same geometry, and how many lone pairs sit on the central atom of each?",
        steps: [
          "In \\(\\text{CH}_4\\) carbon has 4 valence electrons, all used to bond four H atoms: 4 bond pairs, 0 lone pairs.",
          "In \\(\\text{SiCl}_4\\) silicon has 4 valence electrons, all used to bond four Cl atoms: 4 bond pairs, 0 lone pairs.",
          "Both are \\(\\text{AX}_4\\) with no lone pairs, so both take the same regular tetrahedral shape.",
        ],
        answer: "Same geometry (tetrahedral), with no lone pair on the central atom in either.",
      },
      selfCheckExample: {
        prompt:
          "Among \\(\\text{SF}_4\\), \\(\\text{BrF}_5\\), \\(\\text{XeF}_4\\) and \\(\\text{PCl}_5\\), which shows its regular parent geometry, and why?",
        steps: [
          "A regular geometry needs zero lone pairs on the central atom.",
          "\\(\\text{SF}_4\\) has 1 lone pair (see-saw), \\(\\text{BrF}_5\\) has 1 (square pyramidal), \\(\\text{XeF}_4\\) has 2 (square planar) — all distorted.",
          "\\(\\text{PCl}_5\\): P uses all 5 valence electrons bonding five Cl, so 0 lone pairs — regular trigonal bipyramidal.",
        ],
        answer: "\\(\\text{PCl}_5\\) — it has no lone pairs, so it keeps its regular trigonal bipyramidal geometry.",
      },
      practiceSet: [
        { prompt: "Which repels more strongly: a lone pair or a bond pair?", answer: "A lone pair" },
        { prompt: "Write the VSEPR repulsion order.", answer: "lp-lp > lp-bp > bp-bp" },
        { prompt: "A molecule shows its regular geometry only when the central atom has how many lone pairs?", answer: "Zero" },
        { prompt: "Do CH₄ and SiCl₄ have the same shape?", answer: "Yes — both tetrahedral, 0 lone pairs" },
        { prompt: "Does XeF₄ show a regular octahedral shape?", answer: "No — 2 lone pairs distort it to square planar" },
      ],
      traps: [
        {
          title: "Lone pairs count toward the electron geometry but not the described shape",
          body:
            "The parent (electron-pair) geometry counts every pair, but the reported **shape** names only where the **atoms** sit. \\(\\text{XeF}_4\\) has an octahedral electron geometry, yet its shape is **square planar** — the 2 lone pairs occupy positions but aren't drawn as part of the shape. Always answer with the atom-only shape unless the question asks for the parent geometry.",
        },
        {
          title: "'Regular geometry as expected' means zero lone pairs",
          body:
            "When the bank asks which molecule has its **regular** or **expected** geometry, it wants the one with **no lone pairs** on the central atom — \\(\\text{SiCl}_4\\), not \\(\\text{SF}_4\\)/\\(\\text{BrF}_5\\)/\\(\\text{XeF}_4\\). A lone pair always distorts, so any lone-pair molecule is disqualified.",
        },
      ],
    },

    // 2. Counting bond pairs and lone pairs (formula variant)
    {
      kind: "formula" as const,
      slug: "cetcb-vsepr-counting-pairs",
      name: "Counting bond pairs and lone pairs on the central atom",
      intuition:
        "Everything in VSEPR starts here. Take the central atom's valence electrons, use one for each bond it forms, and whatever is left over pairs up into lone pairs. Bond pairs plus lone pairs is the total number of electron domains that decides the shape.",
      definition:
        "How to count electron pairs on the **central atom**:\n" +
        "- **Bond pairs (bp)** = the number of atoms bonded to the central atom (for single bonds).\n" +
        "- **Lone pairs (lp)** \\(= \\dfrac{V - \\text{(bp)}}{2}\\), where \\(V\\) is the number of valence electrons on the central atom (electrons left after bonding, paired up).\n" +
        "- **Total pairs** \\(= \\text{bp} + \\text{lp}\\) — this sets the electron geometry (2 linear, 3 trigonal, 4 tetrahedral, 5 trigonal bipyramidal, 6 octahedral).\n" +
        "- Worked counts: \\(\\text{NH}_3\\) (N: \\(V=5\\), bp\\(=3\\), lp\\(=1\\)); \\(\\text{H}_2\\text{O}\\) (O: \\(V=6\\), bp\\(=2\\), lp\\(=2\\)); \\(\\text{BF}_3\\) (B: \\(V=3\\), bp\\(=3\\), lp\\(=0\\)); \\(\\text{SF}_6\\) (S: \\(V=6\\), bp\\(=6\\), lp\\(=0\\)); \\(\\text{BrF}_3\\) (Br: \\(V=7\\), bp\\(=3\\), lp\\(=2\\)).",
      formula: {
        label: "Lone pairs on the central atom",
        latex: "\\text{lp} = \\frac{V - \\text{bp}}{2}",
        symbols: [
          { symbol: "V", meaning: "valence electrons of the central atom" },
          { symbol: "\\(\\text{bp}\\)", meaning: "bond pairs = number of atoms bonded to it (single bonds)" },
          { symbol: "\\(\\text{lp}\\)", meaning: "lone pairs left on the central atom" },
        ],
      },
      pyqExampleId: "8845765b-aab8-4bbd-b790-188ae36e4127", // highest lone pairs -> ICl3 (2)
      authoredExample: {
        prompt:
          "How many lone pairs sit on the central atom of \\(\\text{BrF}_3\\)?",
        steps: [
          "Central atom Br has \\(V = 7\\) valence electrons.",
          "It bonds three F atoms, so bp \\(= 3\\), using 3 of the 7 electrons.",
          "Remaining electrons \\(= 7 - 3 = 4\\), which pair up: lp \\(= 4/2 = 2\\).",
        ],
        answer: "2 lone pairs (so \\(\\text{BrF}_3\\) is \\(sp^3d\\), T-shaped).",
      },
      selfCheckExample: {
        prompt:
          "Which of \\(\\text{SCl}_2\\), \\(\\text{PCl}_3\\), \\(\\text{ClF}_3\\) and \\(\\text{XeF}_4\\) has the fewest lone pairs on the central atom?",
        steps: [
          "\\(\\text{SCl}_2\\): S has \\(V=6\\), bp\\(=2\\), lp\\(=(6-2)/2=2\\).",
          "\\(\\text{PCl}_3\\): P has \\(V=5\\), bp\\(=3\\), lp\\(=(5-3)/2=1\\).",
          "\\(\\text{ClF}_3\\): Cl has \\(V=7\\), bp\\(=3\\), lp\\(=(7-3)/2=2\\); \\(\\text{XeF}_4\\): Xe has \\(V=8\\), bp\\(=4\\), lp\\(=(8-4)/2=2\\).",
        ],
        answer: "\\(\\text{PCl}_3\\) — with just 1 lone pair, the fewest.",
      },
      practiceSet: [
        { prompt: "Lone pairs on central atom of H₂O?", answer: "2", method: "O: V=6, bp=2, lp=(6−2)/2" },
        { prompt: "Lone pairs on central atom of NH₃?", answer: "1", method: "N: V=5, bp=3, lp=(5−3)/2" },
        { prompt: "Lone pairs on central atom of BF₃?", answer: "0", method: "B: V=3, bp=3, lp=(3−3)/2" },
        { prompt: "Lone pairs on central atom of SF₆?", answer: "0", method: "S: V=6, bp=6" },
        { prompt: "Which has 2 lone pairs on the central atom: NH₃, H₂O, SF₄ or SO₂?", answer: "H₂O" },
      ],
      traps: [
        {
          title: "Count lone pairs on the central atom only",
          body:
            "For IF, the question asks for lone pairs on the **central** iodine: I has \\(V=7\\), one electron goes into the I–F bond, leaving \\(6/2 = 3\\) lone pairs on I. Don't add the 3 lone pairs sitting on F — the central-atom count is 3.",
        },
        {
          title: "BF₃ has zero lone pairs — boron is electron-deficient",
          body:
            "Boron has only 3 valence electrons and forms 3 bonds, so **nothing is left over** — 0 lone pairs (an incomplete octet with 6 electrons). Students often assume every central atom carries a lone pair; \\(\\text{BF}_3\\), \\(\\text{SF}_6\\) and \\(\\text{PCl}_5\\) are common zero-lone-pair molecules.",
        },
      ],
    },

    // 3. The master shape table (reference variant)
    {
      kind: "reference" as const,
      slug: "cetcb-vsepr-shape-table",
      name: "The master shape table (AXnEm to geometry)",
      intuition:
        "Once you have the bond-pair and lone-pair counts, the shape is a straight table lookup. Write the molecule as \\(\\text{AX}_n\\text{E}_m\\) — A central atom, X bonded atoms, E lone pairs — and read off the name and ideal bond angle. This one table answers every 'what is the shape?' PYQ.",
      definition:
        "Notation: **A** is the central atom, **X** each bonded atom (bond pair), **E** each lone pair. Total pairs \\(=\\) X count \\(+\\) E count fixes the parent geometry; the lone pairs then decide the atom-only **shape**:\n" +
        "- **No lone pairs** (\\(\\text{AX}_2\\)…\\(\\text{AX}_6\\)) give the regular parent geometries.\n" +
        "- **With lone pairs**, the lone pairs take the roomiest positions and the shape is named by where the **atoms** end up.\n" +
        "- Key examples the bank uses: \\(\\text{NH}_3\\) (\\(\\text{AX}_3\\text{E}\\), pyramidal), \\(\\text{H}_2\\text{O}\\) (\\(\\text{AX}_2\\text{E}_2\\), bent), \\(\\text{SF}_4\\)/\\(\\text{TeF}_4\\) (\\(\\text{AX}_4\\text{E}\\), see-saw), \\(\\text{XeF}_4\\) (\\(\\text{AX}_4\\text{E}_2\\), square planar), \\(\\text{BrF}_5\\) (\\(\\text{AX}_5\\text{E}\\), square pyramidal).",
      table: {
        columns: ["Type (AXnEm)", "Bond pairs / Lone pairs", "Shape", "Ideal bond angle", "Example"],
        rows: [
          { cells: ["\\(\\text{AX}_2\\)", "2 / 0", "Linear", "\\(180^\\circ\\)", "\\(\\text{BeCl}_2\\), \\(\\text{C}_2\\text{H}_2\\)"] },
          { cells: ["\\(\\text{AX}_3\\)", "3 / 0", "Trigonal planar", "\\(120^\\circ\\)", "\\(\\text{BF}_3\\)"] },
          { cells: ["\\(\\text{AX}_2\\text{E}\\)", "2 / 1", "Bent (angular)", "about \\(119.5^\\circ\\)", "\\(\\text{SO}_2\\)"] },
          {
            cells: ["\\(\\text{AX}_4\\)", "4 / 0", "Tetrahedral", "\\(109.5^\\circ\\)", "\\(\\text{CH}_4\\), \\(\\text{SiCl}_4\\), \\(\\text{NH}_4^{+}\\)"],
            pyqExampleId: "5d0d0fc9-3844-4b64-93e4-c6cd7b752b3b",
          },
          {
            cells: ["\\(\\text{AX}_3\\text{E}\\)", "3 / 1", "Trigonal pyramidal", "\\(107^\\circ\\)", "\\(\\text{NH}_3\\)"],
          },
          {
            cells: ["\\(\\text{AX}_2\\text{E}_2\\)", "2 / 2", "Bent (angular)", "\\(104.5^\\circ\\)", "\\(\\text{H}_2\\text{O}\\), \\(\\text{SCl}_2\\)"],
            pyqExampleId: "cb027900-1683-4f83-8a80-89e91b83d7bf",
          },
          {
            cells: ["\\(\\text{AX}_5\\)", "5 / 0", "Trigonal bipyramidal", "\\(120^\\circ\\) and \\(90^\\circ\\)", "\\(\\text{PCl}_5\\)"],
            pyqExampleId: "9987e7b2-a953-4650-a85e-a49a75fe6597",
          },
          {
            cells: ["\\(\\text{AX}_4\\text{E}\\)", "4 / 1", "See-saw", "\\(90^\\circ\\), \\(120^\\circ\\)", "\\(\\text{SF}_4\\), \\(\\text{TeF}_4\\)"],
            noteAmber:
              "\\(\\text{AB}_4\\text{E}\\) has a trigonal-bipyramidal parent geometry but a see-saw shape — the bank tests both the type-to-shape and the parent-geometry versions.",
            pyqExampleId: "08e9c4a6-3f9d-4682-b1c1-d6bbd5e85c7e",
          },
          { cells: ["\\(\\text{AX}_3\\text{E}_2\\)", "3 / 2", "T-shaped", "about \\(90^\\circ\\)", "\\(\\text{ClF}_3\\), \\(\\text{BrF}_3\\), \\(\\text{ICl}_3\\)"] },
          { cells: ["\\(\\text{AX}_2\\text{E}_3\\)", "2 / 3", "Linear", "\\(180^\\circ\\)", "\\(\\text{XeF}_2\\)"] },
          { cells: ["\\(\\text{AX}_6\\)", "6 / 0", "Octahedral", "\\(90^\\circ\\)", "\\(\\text{SF}_6\\)"] },
          {
            cells: ["\\(\\text{AX}_5\\text{E}\\)", "5 / 1", "Square pyramidal", "about \\(90^\\circ\\)", "\\(\\text{BrF}_5\\), \\(\\text{IF}_5\\)"],
            pyqExampleId: "75eda034-b092-4f56-b467-ec04705c99ce",
          },
          {
            cells: ["\\(\\text{AX}_4\\text{E}_2\\)", "4 / 2", "Square planar", "\\(90^\\circ\\)", "\\(\\text{XeF}_4\\)"],
            pyqExampleId: "78106532-a832-40cc-b31d-683682b32ed2",
          },
        ],
        caption: "Read off the shape from the AXnEm type: count X (bonded atoms) and E (lone pairs), then look up the row.",
      },
      pyqExampleId: "6ca86f69-8542-4f28-b14c-2710a2b1fca5", // geometry of CH4, C2H2, NH3, BF3
      selfCheckExample: {
        prompt:
          "Give the shape of each: \\(\\text{CH}_4\\), \\(\\text{C}_2\\text{H}_2\\), \\(\\text{NH}_3\\), \\(\\text{BF}_3\\).",
        steps: [
          "\\(\\text{CH}_4\\): \\(\\text{AX}_4\\), 0 lp — tetrahedral.",
          "\\(\\text{C}_2\\text{H}_2\\): each carbon is \\(sp\\) (2 domains) — linear.",
          "\\(\\text{NH}_3\\): \\(\\text{AX}_3\\text{E}\\) — trigonal pyramidal; \\(\\text{BF}_3\\): \\(\\text{AX}_3\\), 0 lp — trigonal planar.",
        ],
        answer: "Tetrahedral, linear, trigonal pyramidal, trigonal planar.",
      },
      practiceSet: [
        { prompt: "Shape of BrF₅ (AX₅E)?", answer: "Square pyramidal" },
        { prompt: "Shape of an AB₄E-type molecule?", answer: "See-saw" },
        { prompt: "Geometry of PCl₅ (AX₅)?", answer: "Trigonal bipyramidal" },
        { prompt: "Shape of XeF₄ (AX₄E₂)?", answer: "Square planar" },
        { prompt: "Shape of XeF₂ (AX₂E₃)?", answer: "Linear" },
        { prompt: "Parent (electron-pair) geometry of TeF₄?", answer: "Trigonal bipyramidal" },
      ],
      traps: [
        {
          title: "H₂O is bent, not linear",
          body:
            "Water is \\(\\text{AX}_2\\text{E}_2\\): the 2 lone pairs on oxygen push the two O–H bonds down to about \\(104.5^\\circ\\), giving a **bent** shape — not the \\(180^\\circ\\) linear shape you might expect from just 'two bonds'. Its shape-twin in the bank is \\(\\text{SCl}_2\\), also bent.",
        },
        {
          title: "SF₄ is not tetrahedral — it has a lone pair",
          body:
            "\\(\\text{SF}_4\\) has 4 bonded atoms but S carries **1 lone pair** (\\(\\text{AX}_4\\text{E}\\)), so 5 electron domains give a **see-saw** shape, not tetrahedral. Only the zero-lone-pair \\(\\text{AX}_4\\) molecules (\\(\\text{CH}_4\\), \\(\\text{SiCl}_4\\), \\(\\text{NH}_4^{+}\\)) are tetrahedral.",
        },
        {
          title: "Parent geometry versus molecular shape",
          body:
            "For \\(\\text{TeF}_4\\) (\\(\\text{AX}_4\\text{E}\\)) the **parent geometry** is trigonal bipyramidal (5 domains) but the **molecular shape** is see-saw. If the question says 'geometry', answer the parent trigonal bipyramidal; if it says 'shape', answer see-saw. Read the wording.",
        },
      ],
    },

    // 4. Bond angles and how lone pairs shrink them (reference variant)
    {
      kind: "reference" as const,
      slug: "cetcb-vsepr-bond-angles",
      name: "Bond angles and how lone pairs shrink them",
      intuition:
        "Start from the ideal angle for the electron geometry, then knock it down a little for every lone pair — because a lone pair pushes harder than a bond pair, it squeezes the bond angles smaller. The classic run \\(\\text{CH}_4 > \\text{NH}_3 > \\text{H}_2\\text{O}\\) is the same tetrahedral parent with 0, 1 and 2 lone pairs.",
      definition:
        "Bond angle depends on the electron geometry and the number of lone pairs:\n" +
        "- Ideal angles by parent geometry: linear \\(180^\\circ\\), trigonal planar \\(120^\\circ\\), tetrahedral \\(109.5^\\circ\\), octahedral \\(90^\\circ\\).\n" +
        "- **Each lone pair pushes the bonds closer**, shrinking the angle below the ideal.\n" +
        "- The signature tetrahedral-family sequence: \\(\\text{CH}_4\\ (109.5^\\circ) > \\text{NH}_3\\ (107^\\circ) > \\text{H}_2\\text{O}\\ (104.5^\\circ)\\) — same parent, more lone pairs, smaller angle.\n" +
        "- \\(\\text{BF}_3\\) keeps its full \\(120^\\circ\\) (no lone pairs); \\(\\text{SO}_2\\) is bent at about \\(119.5^\\circ\\) (one lone pair barely dents the \\(120^\\circ\\) parent).",
      table: {
        columns: ["Molecule", "Bond pairs / Lone pairs", "Bond angle", "Note"],
        rows: [
          {
            cells: ["\\(\\text{CH}_4\\)", "4 / 0", "\\(109.5^\\circ\\)", "Ideal tetrahedral — no lone pair to distort."],
          },
          { cells: ["\\(\\text{NH}_3\\)", "3 / 1", "\\(107^\\circ\\)", "One lone pair shrinks \\(109.5^\\circ\\) a little."] },
          { cells: ["\\(\\text{H}_2\\text{O}\\)", "2 / 2", "\\(104.5^\\circ\\)", "Two lone pairs shrink it further."] },
          {
            cells: ["\\(\\text{BF}_3\\)", "3 / 0", "\\(120^\\circ\\)", "Trigonal planar, no lone pair — full angle."],
            pyqExampleId: "10f85e84-7346-45e8-94b2-aefcae2b639c",
          },
          {
            cells: ["\\(\\text{SO}_2\\)", "2 / 1", "about \\(119.5^\\circ\\)", "Bent; one lone pair barely dents the \\(120^\\circ\\) parent."],
            noteAmber:
              "SO\\(_2\\) is the O–S–O \\(119.5^\\circ\\) the bank tests — not \\(109.5^\\circ\\) or \\(180^\\circ\\); its parent is trigonal, not tetrahedral.",
            pyqExampleId: "216283b8-2bc4-4f16-a69d-0ebafecdd0da",
          },
        ],
        caption: "Take the ideal angle for the parent geometry, then subtract for each lone pair.",
      },
      pyqExampleId: "216283b8-2bc4-4f16-a69d-0ebafecdd0da", // O-S-O angle in SO2 = 119.5
      selfCheckExample: {
        prompt:
          "Arrange \\(\\text{CH}_4\\), \\(\\text{NH}_3\\) and \\(\\text{H}_2\\text{O}\\) in decreasing order of bond angle and explain.",
        steps: [
          "All three share a tetrahedral parent (4 electron domains).",
          "Lone pairs: \\(\\text{CH}_4\\) 0, \\(\\text{NH}_3\\) 1, \\(\\text{H}_2\\text{O}\\) 2 — more lone pairs squeeze the angle smaller.",
          "So \\(109.5^\\circ > 107^\\circ > 104.5^\\circ\\).",
        ],
        answer: "\\(\\text{CH}_4\\ (109.5^\\circ) > \\text{NH}_3\\ (107^\\circ) > \\text{H}_2\\text{O}\\ (104.5^\\circ)\\).",
      },
      practiceSet: [
        { prompt: "F–B–F bond angle in BF₃?", answer: "\\(120^\\circ\\)" },
        { prompt: "O–S–O bond angle in SO₂?", answer: "about \\(119.5^\\circ\\)" },
        { prompt: "H–C–H bond angle in CH₄?", answer: "\\(109.5^\\circ\\)" },
        { prompt: "H–N–H bond angle in NH₃?", answer: "\\(107^\\circ\\)" },
        { prompt: "H–O–H bond angle in H₂O?", answer: "\\(104.5^\\circ\\)" },
      ],
      traps: [
        {
          title: "SO₂ is 119.5°, not 109.5°",
          body:
            "\\(\\text{SO}_2\\) has a **trigonal** (not tetrahedral) parent — 2 bond pairs and 1 lone pair around S — so its O–S–O angle is about \\(119.5^\\circ\\), close to the \\(120^\\circ\\) trigonal ideal. The \\(107.5^\\circ\\)/\\(109^\\circ\\) distractors are tetrahedral-family angles that don't apply here.",
        },
        {
          title: "More lone pairs, smaller angle",
          body:
            "Because a lone pair repels harder than a bond pair, adding lone pairs to the **same** parent geometry always shrinks the bond angle: \\(\\text{CH}_4 > \\text{NH}_3 > \\text{H}_2\\text{O}\\). Don't quote \\(109.5^\\circ\\) for all three — only the zero-lone-pair member keeps the ideal.",
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
