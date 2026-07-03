import type { SubtopicNote } from "@/app/notes/_types";

export const IONIC_COVALENT_NOTE: SubtopicNote = {
  subtopicName: "Ionic and Covalent Bonding, Lewis Structures and Octet Rule",
  title: "Ionic and Covalent Bonding, Lewis Structures and Octet Rule",
  oneLineDefinition:
    "Atoms bond to reach a stable octet — metals transfer electrons (ionic), non-metals share them (covalent), and one atom can donate both shared electrons (coordinate); Lewis dot structures track those electrons, Fajans' rules decide how covalent an 'ionic' bond really is, and formal charge checks which structure is right.",
  whyItMatters:
    "The backbone of MHT-CET Chemical Bonding — about 13 PYQs, mostly EASY-to-MODERATE recall and one-line work. " +
    "The bank tests it five ways: rank compounds by covalent (or ionic) character using Fajans' rules, spot the octet exception (incomplete, expanded or odd-electron), count the Lewis/resonance structures of an ion, count the electrons around a central atom, and compute a formal charge. " +
    "Learn Fajans' rules, the octet-exception families, and the formal-charge formula, and every one of these is a fast, sure mark.",
  concepts: [
    // FOUNDATION — bond types + octet rule (reference)
    {
      kind: "reference" as const,
      slug: "cetcb-icl-bond-types-octet",
      name: "The octet rule and the three ways atoms bond",
      visualizationSlug: "bond-ionic-covalent-formation",
      intuition:
        "Noble gases are unreactive because their outer shell is already full. Every other atom bonds to reach that same stable octet of eight outer electrons. " +
        "There are three ways: transfer electrons (ionic), share a pair from each atom (covalent), or have one atom donate both electrons of a shared pair (coordinate).",
      definition:
        "Atoms bond to achieve a stable, completely filled outer shell — a **duplet** of 2 for H and Li, an **octet** of 8 for most others (the **octet rule**). The three bond types:\n" +
        "- **Ionic (electrovalent) bond** — a metal **transfers** electrons to a non-metal, forming oppositely-charged ions held by electrostatic attraction. Example: \\(\\text{Na}^{+}\\text{Cl}^{-}\\), MgO.\n" +
        "- **Covalent bond** — two non-metals **share** one or more pairs, one electron of each shared pair coming from each atom. Example: \\(\\text{H}_2\\text{O}\\), \\(\\text{SCl}_2\\).\n" +
        "- **Coordinate (dative) bond** — a covalent bond in which **both** shared electrons come from the **same** atom. Example: the fourth N–H bond in \\(\\text{NH}_4^{+}\\), or \\(\\text{H}_3\\text{O}^{+}\\).\n" +
        "**Electrovalency** = number of electrons lost or gained; **covalency** = number of shared pairs an atom forms.",
      table: {
        columns: ["Bond type", "How the octet is reached", "Formed between", "Example"],
        rows: [
          { cells: ["Ionic (electrovalent)", "Electrons transferred (lost / gained)", "Metal + non-metal", "\\(\\text{NaCl}\\), \\(\\text{MgO}\\)"] },
          { cells: ["Covalent", "One pair shared, one electron from each atom", "Non-metal + non-metal", "\\(\\text{H}_2\\text{O}\\), \\(\\text{SCl}_2\\)"] },
          {
            cells: ["Coordinate (dative)", "Shared pair donated by one atom only", "Donor with a lone pair", "\\(\\text{NH}_4^{+}\\), \\(\\text{H}_3\\text{O}^{+}\\)"],
            noteAmber: "Once formed, a coordinate bond is identical to any ordinary covalent bond — the label only records where the pair came from.",
          },
        ],
        caption: "Transfer = ionic; share = covalent; one-sided share = coordinate.",
      },
      selfCheckExample: {
        prompt: "In the ammonium ion \\(\\text{NH}_4^{+}\\), how many of the four N–H bonds are coordinate (dative) bonds?",
        steps: [
          "Nitrogen forms three ordinary covalent N–H bonds, sharing one electron of each pair.",
          "The fourth H comes in as \\(\\text{H}^{+}\\) with no electrons, so nitrogen's lone pair supplies **both** electrons of that bond.",
          "A bond where one atom donates both shared electrons is a coordinate bond.",
        ],
        answer: "One — the fourth N–H bond is coordinate; the other three are ordinary covalent bonds.",
      },
      practiceSet: [
        { prompt: "Why do atoms form chemical bonds?", answer: "To complete their outermost shell (achieve a stable octet or duplet)" },
        { prompt: "What bond forms when a metal transfers electrons to a non-metal?", answer: "Ionic (electrovalent) bond" },
        { prompt: "What bond forms when two non-metals share electron pairs?", answer: "Covalent bond" },
        { prompt: "In which bond do both shared electrons come from one atom?", answer: "Coordinate (dative) bond" },
        { prompt: "Is \\(\\text{SCl}_2\\) ionic or covalent?", answer: "Covalent", method: "two non-metals (S and Cl) sharing electrons" },
      ],
      traps: [
        {
          title: "A coordinate bond is still a covalent bond",
          body:
            "A coordinate (dative) bond shares a pair of electrons exactly like an ordinary covalent bond — the **only** difference is that one atom supplied **both** electrons. Don't count it as a separate third kind of bonding force.",
        },
        {
          title: "Duplet for H and Li, octet for the rest",
          body:
            "Hydrogen and lithium are 'complete' with just **2** outer electrons (a duplet, like helium), not 8. So \\(\\text{Li}^{+}\\) has a stable duplet even though it has no octet — this is why LiCl is quoted as an 'incomplete octet' example while still being perfectly stable.",
        },
      ],
    },

    // Fajans' rules — ionic vs covalent character (reference)
    {
      kind: "reference" as const,
      slug: "cetcb-icl-fajans-covalent-character",
      name: "Fajans' rules — covalent character of an ionic bond",
      intuition:
        "No bond is purely ionic. A small, highly-charged cation pulls (polarises) the anion's electron cloud toward itself, and a large, soft anion is easily distorted — the more this happens, the more the bond looks covalent. " +
        "Fajans' rules turn that into three quick comparisons the bank tests directly.",
      definition:
        "**Fajans' rules** — covalent character (and lattice strength) rise when the cation polarises the anion more strongly:\n" +
        "- **Smaller cation** → higher polarising power → more covalent. Among group-1 halides \\(\\text{Li}^{+}\\) (smallest) gives the most covalent bond.\n" +
        "- **Larger anion** → more polarisable → more covalent. For a fixed metal, covalent character rises \\(\\text{MF} < \\text{MCl} < \\text{MBr} < \\text{MI}\\); so **ionic** character falls in the same order (MI is least ionic).\n" +
        "- **Higher cation charge** → more polarising → more covalent. \\(\\text{SnCl}_4\\) (\\(\\text{Sn}^{4+}\\)) is more covalent than \\(\\text{SnCl}_2\\) (\\(\\text{Sn}^{2+}\\)).\n" +
        "- **Lattice enthalpy** follows charge density: small, highly-charged ions (\\(\\text{Be}^{2+}\\), \\(\\text{F}^{-}\\)) give the highest lattice enthalpy, e.g. \\(\\text{BeF}_2\\).",
      table: {
        columns: ["Factor", "Effect on covalent character", "Bank example"],
        rows: [
          {
            cells: ["Smaller cation", "More covalent (stronger polariser)", "\\(\\text{LiI}\\) most covalent among LiCl, LiI, NaCl, NaI"],
            pyqExampleId: "164da3b9-b8ae-4421-b847-f1e2aa017af1",
          },
          {
            cells: ["Larger anion", "More covalent → least ionic", "\\(\\text{MI}\\) has the lowest ionic character (\\(\\text{MF}>\\text{MCl}>\\text{MBr}>\\text{MI}\\))"],
            pyqExampleId: "e19faf5a-ea91-424c-9358-cfca20be556c",
          },
          {
            cells: ["Higher cation charge", "More covalent", "\\(\\text{SnCl}_4\\) more covalent than \\(\\text{SnCl}_2\\), \\(\\text{PbCl}_2\\), \\(\\text{SbCl}_3\\)"],
            pyqExampleId: "efd293fa-36a9-44e2-b6e8-17c48c75627c",
          },
          {
            cells: ["Small + highly-charged ions", "Highest lattice enthalpy", "\\(\\text{BeF}_2\\) highest among LiCl, NaCl, \\(\\text{BeF}_2\\), \\(\\text{CaCl}_2\\)"],
            noteAmber: "Lattice enthalpy scales with charge density (charge / size), the same driver as polarising power.",
            pyqExampleId: "0a9420b6-1457-46be-bebb-12626ac0ab4a",
          },
        ],
        caption: "Small cation, large anion, high cation charge — all push an ionic bond toward covalent.",
      },
      pyqExampleId: "164da3b9-b8ae-4421-b847-f1e2aa017af1", // max covalent character — LiI
      selfCheckExample: {
        prompt: "Which metal halide has the lowest ionic character: MF, MCl, MBr or MI (same metal M)?",
        steps: [
          "For a fixed cation, the anion size grows \\(\\text{F}^{-} < \\text{Cl}^{-} < \\text{Br}^{-} < \\text{I}^{-}\\).",
          "A larger anion is more polarisable, so the bond becomes more covalent — meaning less ionic.",
          "The iodide, with the largest anion, is polarised most, so MI is the least ionic.",
        ],
        answer: "MI — the largest anion is polarised most, giving the lowest ionic (highest covalent) character.",
      },
      practiceSet: [
        { prompt: "By Fajans' rules, a smaller cation makes a bond more…", answer: "Covalent", method: "smaller cation = stronger polariser" },
        { prompt: "Order of covalent character for MF, MCl, MBr, MI (same M)?", answer: "MF < MCl < MBr < MI", method: "larger anion is more polarisable" },
        { prompt: "Which is more covalent, \\(\\text{SnCl}_2\\) or \\(\\text{SnCl}_4\\)?", answer: "\\(\\text{SnCl}_4\\)", method: "higher cation charge \\(\\text{Sn}^{4+}\\) polarises more" },
        { prompt: "Most covalent among LiCl, LiI, NaCl, NaI?", answer: "LiI", method: "smallest cation + largest anion" },
        { prompt: "Which two ion features give the highest lattice enthalpy?", answer: "Small size and high charge (high charge density)" },
      ],
      traps: [
        {
          title: "Ionic character is the reverse of covalent character",
          body:
            "The bank flips the question between 'most covalent' and 'least ionic' — they are the **same** answer. If MI is the most covalent halide it is automatically the **least ionic**. Read which one is asked, but the winning compound is identical.",
        },
        {
          title: "Charge density, not molar mass, sets lattice enthalpy",
          body:
            "\\(\\text{BeF}_2\\) beats \\(\\text{CaCl}_2\\) on lattice enthalpy because \\(\\text{Be}^{2+}\\) and \\(\\text{F}^{-}\\) are tiny and highly charged, not because of formula mass. Rank by **charge / size** (charge density), the same quantity that drives Fajans' rules.",
        },
      ],
    },

    // Octet exceptions (reference)
    {
      kind: "reference" as const,
      slug: "cetcb-icl-octet-exceptions",
      name: "Exceptions to the octet rule",
      intuition:
        "The octet rule is a guide, not a law. Some molecules fall short of eight electrons, some go past eight, and a few have an odd number so they can never pair up neatly. The bank asks you to spot which family a molecule belongs to.",
      definition:
        "Three families break the octet rule:\n" +
        "- **Incomplete octet** — the central atom has **fewer than 8** electrons. Examples: \\(\\text{BF}_3\\), \\(\\text{BeCl}_2\\), and \\(\\text{LiCl}\\) (\\(\\text{Li}^{+}\\) has only a 2-electron duplet).\n" +
        "- **Expanded octet** — a period-3 (or lower) central atom holds **more than 8** electrons using its d-orbitals. Examples: \\(\\text{PCl}_5\\) (10), \\(\\text{SF}_6\\) (12), \\(\\text{H}_2\\text{SO}_4\\) (12 around S).\n" +
        "- **Odd-electron molecules** — an **odd** total number of valence electrons leaves one unpaired, so the octet cannot be completed. Examples: **NO** (11 valence electrons), \\(\\text{NO}_2\\).\n" +
        "A molecule like \\(\\text{SCl}_2\\) (2 bond pairs + 2 lone pairs on S) **obeys** the octet.",
      table: {
        columns: ["Exception type", "Electron count on central atom", "Examples"],
        rows: [
          {
            cells: ["Incomplete octet", "Fewer than 8", "\\(\\text{BF}_3\\), \\(\\text{BeCl}_2\\), \\(\\text{LiCl}\\)"],
            noteAmber: "\\(\\text{LiCl}\\) is quoted as incomplete because \\(\\text{Li}^{+}\\) has a 2-electron duplet, not an octet.",
            pyqExampleId: "af87a3f9-bb6a-4cb5-8139-52f12e4f7fa4",
          },
          { cells: ["Expanded octet", "More than 8 (uses d-orbitals)", "\\(\\text{PCl}_5\\), \\(\\text{SF}_6\\), \\(\\text{H}_2\\text{SO}_4\\)"] },
          {
            cells: ["Odd-electron molecule", "Odd total → one unpaired electron", "\\(\\text{NO}\\), \\(\\text{NO}_2\\)"],
            pyqExampleId: "87b441a1-65ea-4792-8049-afa431056999",
          },
          {
            cells: ["Obeys the octet (for contrast)", "Exactly 8", "\\(\\text{SCl}_2\\), \\(\\text{H}_2\\text{O}\\), \\(\\text{CH}_4\\)"],
            pyqExampleId: "d24055fc-d622-427c-a760-ddb77895bf59",
          },
        ],
        caption: "Fewer than 8 = incomplete; more than 8 = expanded; odd total = odd-electron.",
      },
      pyqExampleId: "87b441a1-65ea-4792-8049-afa431056999", // odd electron molecule — NO
      selfCheckExample: {
        prompt: "Which of these obeys the octet rule: \\(\\text{H}_2\\text{SO}_4\\), \\(\\text{NO}_2\\), \\(\\text{SCl}_2\\) or \\(\\text{SF}_6\\)?",
        steps: [
          "\\(\\text{H}_2\\text{SO}_4\\) and \\(\\text{SF}_6\\) have expanded octets (12 electrons around S).",
          "\\(\\text{NO}_2\\) has an odd number of valence electrons, so it cannot complete its octet.",
          "In \\(\\text{SCl}_2\\), sulphur has 2 bond pairs and 2 lone pairs = 8 electrons.",
        ],
        answer: "\\(\\text{SCl}_2\\) — sulphur has exactly 8 electrons around it.",
      },
      practiceSet: [
        { prompt: "How many valence electrons does NO have, and what makes it special?", answer: "11 — an odd number, so it is an odd-electron molecule" },
        { prompt: "Classify the octet in \\(\\text{SF}_6\\).", answer: "Expanded octet (12 electrons around S)" },
        { prompt: "Classify the octet in \\(\\text{BF}_3\\).", answer: "Incomplete octet (only 6 electrons around B)" },
        { prompt: "Which molecule from \\(\\text{SF}_6\\), \\(\\text{PCl}_5\\), LiCl, \\(\\text{H}_2\\text{SO}_4\\) has an incomplete octet?", answer: "LiCl", method: "\\(\\text{Li}^{+}\\) has a 2-electron duplet" },
        { prompt: "Does \\(\\text{SCl}_2\\) obey the octet rule?", answer: "Yes — 2 bond pairs + 2 lone pairs = 8 electrons on S" },
      ],
      traps: [
        {
          title: "Odd electrons cannot complete an octet",
          body:
            "NO has **11** valence electrons and \\(\\text{NO}_2\\) has **17** — an odd count leaves one electron unpaired, so these can never reach a full octet. Any molecule with an odd valence-electron total is an octet exception by definition.",
        },
        {
          title: "Expanded octet needs period-3 (or lower) and d-orbitals",
          body:
            "Only central atoms from period 3 downward (S, P, Cl...) can expand past 8 using empty d-orbitals. Second-period atoms (C, N, O, F) can **never** exceed an octet — a tempting distractor to reject.",
        },
      ],
    },

    // Lewis structures + counting electrons around a central atom (reference)
    {
      kind: "reference" as const,
      slug: "cetcb-icl-lewis-structures",
      name: "Lewis structures, resonance count and electrons around an atom",
      intuition:
        "A Lewis (electron-dot) structure draws every bonding pair as a line and every lone pair as dots. When more than one equally-good structure exists you get resonance, and the bank counts them. It also asks you to total the electrons around a central atom. " +
        "A Lewis acid is simply a species that accepts a lone pair to complete an octet.",
      definition:
        "Working with Lewis structures:\n" +
        "- Each **single bond** = 1 shared pair = **2 electrons**; count them together with the atom's lone pairs to total the electrons around it.\n" +
        "- **Resonance structures** are the several valid Lewis structures that differ only in where the double bond sits. The **nitrite ion \\(\\text{NO}_2^{-}\\)** has **2** resonance structures (the N=O double bond can be on either oxygen).\n" +
        "- **Electrons around S in \\(\\text{H}_2\\text{SO}_4\\)** = 2 single (S–O–H) + 2 double (S=O) bonds = 4 bonds \\(\\times\\) 2 = **12** electrons (an expanded octet).\n" +
        "- A **Lewis acid** is an **electron-pair acceptor**; a **Lewis base** is an electron-pair donor. This is broader than the H⁺ (Brønsted) definition — it needs no proton at all.",
      table: {
        columns: ["Species / term", "Key count or definition", "Answer the bank wants"],
        rows: [
          {
            cells: ["\\(\\text{NO}_2^{-}\\) (nitrite)", "Double bond can sit on either O", "**2** resonance (Lewis) structures"],
            pyqExampleId: "486eca6f-c466-4b34-83c6-07a642bd372d",
          },
          {
            cells: ["Electrons around S in \\(\\text{H}_2\\text{SO}_4\\)", "2 single + 2 double bonds = 4 bonds", "**12** electrons"],
            pyqExampleId: "145e1660-f02b-4f28-a920-dcc4a5ea55b5",
          },
          {
            cells: ["Lewis acid", "Electron-pair **acceptor**", "Accepts an electron pair (not 'donates \\(\\text{H}^{+}\\)')"],
            noteAmber: "A Lewis acid need not contain hydrogen — \\(\\text{BF}_3\\) is a Lewis acid because boron accepts a lone pair.",
            pyqExampleId: "5943f9d1-8c39-44d8-b145-955394d1e0b6",
          },
          { cells: ["Lewis base", "Electron-pair **donor**", "Donates an electron pair (e.g. \\(\\text{NH}_3\\))"] },
        ],
        caption: "1 bond = 2 electrons; resonance = the count of equivalent double-bond placements.",
      },
      pyqExampleId: "486eca6f-c466-4b34-83c6-07a642bd372d", // number of Lewis structures for NO2- = 2
      selfCheckExample: {
        prompt: "How many electrons surround the sulphur atom in \\(\\text{H}_2\\text{SO}_4\\)?",
        steps: [
          "Sulphur forms two S–O–H single bonds and two S=O double bonds.",
          "That is 4 bonds in total, each holding 2 shared electrons: \\(4 \\times 2 = 8\\)? No — count each bond's electrons: 2 single bonds give \\(2 \\times 2 = 4\\) and 2 double bonds give \\(2 \\times 4 = 8\\).",
          "Total electrons around S \\(= 4 + 8 = 12\\), an expanded octet.",
        ],
        answer: "12 electrons — sulphur uses an expanded octet in \\(\\text{H}_2\\text{SO}_4\\).",
      },
      practiceSet: [
        { prompt: "How many resonance (Lewis) structures does \\(\\text{NO}_2^{-}\\) have?", answer: "2", method: "the double bond can sit on either oxygen" },
        { prompt: "How many electrons does one single bond represent?", answer: "2 (one shared pair)" },
        { prompt: "Define a Lewis acid.", answer: "An electron-pair acceptor" },
        { prompt: "Define a Lewis base.", answer: "An electron-pair donor" },
        { prompt: "Is \\(\\text{BF}_3\\) a Lewis acid or base?", answer: "Lewis acid", method: "boron accepts a lone pair to fill its octet" },
      ],
      traps: [
        {
          title: "Lewis acid = electron-pair acceptor, NOT proton donor",
          body:
            "A Lewis acid **accepts an electron pair**; 'gives \\(\\text{H}^{+}\\)' and 'donates a proton' describe a **Brønsted** acid. \\(\\text{BF}_3\\) has no hydrogen yet is a strong Lewis acid — pick 'accepts electron pair'.",
        },
        {
          title: "A double bond is 4 electrons when you total around an atom",
          body:
            "When counting electrons around a central atom, a single bond contributes 2 and a **double bond contributes 4**. For \\(\\text{H}_2\\text{SO}_4\\) the two S=O double bonds add 8, not 4 — giving 12 total, not 8.",
        },
      ],
    },

    // Formal charge (formula)
    {
      kind: "formula" as const,
      slug: "cetcb-icl-formal-charge",
      name: "Formal charge on an atom in a Lewis structure",
      intuition:
        "Formal charge is a bookkeeping check: it asks how many electrons an atom 'owns' in a structure versus how many it brought as a free atom. Splitting each bond evenly, an atom keeps all its lone-pair electrons plus half of every bonding electron. " +
        "The bank gives a Lewis structure and asks for the formal charge on the central atom — usually zero for a good structure.",
      definition:
        "The **formal charge** of an atom in a Lewis structure:\n" +
        "- Take the atom's **valence electrons**, subtract its **lone-pair (non-bonding) electrons**, and subtract **half** its bonding electrons.\n" +
        "- The best Lewis structure is the one with formal charges closest to zero.\n" +
        "- Example — carbon in \\(\\text{CO}_2\\) (O=C=O): valence \\(= 4\\), lone electrons \\(= 0\\), bonding electrons \\(= 8\\) (two double bonds), so FC \\(= 4 - 0 - \\tfrac{8}{2} = 0\\).",
      formula: {
        label: "Formal charge",
        latex: "\\text{FC} = V - L - \\tfrac{1}{2}\\,B",
        symbols: [
          { symbol: "V", meaning: "valence electrons of the free atom" },
          { symbol: "L", meaning: "lone-pair (non-bonding) electrons on the atom" },
          { symbol: "B", meaning: "bonding electrons around the atom (2 per single bond)" },
        ],
      },
      pyqExampleId: "787507f6-5a37-462f-8fc4-e0de0ba62922", // formal charge on C in CO2 = 0
      authoredExample: {
        prompt: "Find the formal charge on the sulphur atom in \\(\\text{SO}_2\\), where sulphur has one lone pair, one S=O double bond and one S–O single bond.",
        steps: [
          "Sulphur's valence electrons: \\(V = 6\\).",
          "Lone-pair electrons on S: one lone pair \\(= L = 2\\).",
          "Bonding electrons around S: one double bond (4) + one single bond (2) \\(= B = 6\\).",
          "Apply the formula: \\(\\text{FC} = 6 - 2 - \\tfrac{6}{2} = 6 - 2 - 3\\).",
        ],
        answer: "\\(\\text{FC} = +1\\) on the sulphur atom.",
      },
      selfCheckExample: {
        prompt: "Find the formal charge on the carbon atom in carbon dioxide, drawn as O=C=O.",
        steps: [
          "Carbon's valence electrons: \\(V = 4\\).",
          "Carbon has no lone pairs in O=C=O, so \\(L = 0\\).",
          "Two double bonds give \\(B = 4 + 4 = 8\\) bonding electrons.",
          "\\(\\text{FC} = 4 - 0 - \\tfrac{8}{2} = 4 - 4\\).",
        ],
        answer: "\\(0\\) — carbon carries no formal charge in \\(\\text{CO}_2\\).",
      },
      practiceSet: [
        { prompt: "State the formal-charge formula.", answer: "\\(\\text{FC} = V - L - \\tfrac{1}{2}B\\)" },
        { prompt: "Formal charge on C in \\(\\text{CO}_2\\) (O=C=O)?", answer: "0", method: "\\(4 - 0 - 8/2\\)" },
        { prompt: "How many bonding electrons does a double bond contribute to \\(B\\)?", answer: "4" },
        { prompt: "What formal charge does the best Lewis structure aim for?", answer: "As close to zero as possible" },
      ],
      traps: [
        {
          title: "Use half the bonding electrons, not all of them",
          body:
            "Formal charge splits each bond evenly, so an atom keeps only **half** its bonding electrons: \\(\\text{FC} = V - L - \\tfrac{1}{2}B\\). Forgetting the \\(\\tfrac{1}{2}\\) doubles the bonding contribution and gives a wrong sign or magnitude.",
        },
        {
          title: "Count lone-pair electrons, not lone pairs",
          body:
            "\\(L\\) is the **number of non-bonding electrons**, so one lone pair contributes 2, not 1. For carbon in \\(\\text{CO}_2\\) (no lone pairs) \\(L = 0\\), giving the clean FC \\(= 0\\) the bank expects.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Ionic and Covalent Bonding (NDA Chemistry)",
      href: "/notes/nda-chemistry/chemical-bonding/bond-ionic-covalent",
    },
  ],
};
