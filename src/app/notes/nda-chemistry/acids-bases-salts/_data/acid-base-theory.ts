import type { SubtopicNote } from "@/app/notes/_types";

export const ACID_BASE_THEORY_NOTE: SubtopicNote = {
  subtopicName: "Acid-Base Theory: Concepts, Oxides and Electrolytes",
  title: "Acid-Base Theory, Oxides and Electrolytes",
  oneLineDefinition:
    "The three definitions of acids and bases (Arrhenius, Bronsted-Lowry, Lewis), how oxides are sorted into acidic, basic, neutral and amphoteric, and why some solutions conduct electricity while others do not.",
  whyItMatters:
    "The foundation of the chapter — seven PYQs, mostly testing one fact each: name the concept behind a definition, count the Lewis acids in a list, pick the neutral oxide, or pick the non-conducting solution. " +
    "Learn the three definitions and the oxide buckets and the rest of the chapter has a frame to hang on.",
  concepts: [
    // FOUNDATION — the three acid-base concepts
    {
      kind: "formula" as const,
      slug: "acid-base-concepts",
      name: "The three acid-base concepts: Arrhenius, Bronsted-Lowry and Lewis",
      intuition:
        "Chemists defined 'acid' and 'base' three times, each definition wider than the last. Arrhenius talks about H+ and OH- in water; Bronsted-Lowry talks about giving and taking a proton (H+); Lewis talks about giving and taking an electron pair. " +
        "Each later definition contains the earlier one — a Lewis acid is the most general kind.",
      definition:
        "The three definitions of acids and bases:\n" +
        "- **Arrhenius** — an **acid** dissociates in water to give **H+ (aq)** ions; a **base** dissociates in water to give **OH- (aq)** ions. Limited to aqueous solutions.\n" +
        "- **Bronsted-Lowry** — an **acid** is a **proton (H+) donor**; a **base** is a **proton acceptor**. Works beyond water.\n" +
        "- **Lewis** — an **acid** is an **electron-pair acceptor**; a **base** is an **electron-pair donor**. The most general definition.",
      pyqExampleId: "42089c79-e884-4cd5-a591-b298ac43c3fb", // Arrhenius concept
      authoredExample: {
        prompt:
          "Ammonia (NH3) reacts with boron trifluoride (BF3): the nitrogen lone pair fills boron's empty orbital. Classify NH3 and BF3 using the Lewis definition.",
        steps: [
          "BF3 has an incomplete octet on boron, so it can accept an electron pair.",
          "NH3 has a lone pair on nitrogen, so it can donate that electron pair.",
          "Lewis acid = electron-pair acceptor; Lewis base = electron-pair donor.",
        ],
        answer: "BF3 is the Lewis acid (accepts the pair); NH3 is the Lewis base (donates the pair).",
      },
      practiceSet: [
        { prompt: "Under the Arrhenius concept, an acid produces which ion in water?", answer: "Hydrogen ion, H+ (aq)" },
        { prompt: "Under the Bronsted-Lowry concept, an acid is defined as a what?", answer: "Proton (H+) donor" },
        { prompt: "Under the Lewis concept, a base is defined as a what?", answer: "Electron-pair donor" },
        { prompt: "Which acid-base concept defines acids and bases only in aqueous solution?", answer: "Arrhenius concept" },
      ],
      traps: [
        {
          title: "Match the definition to the right concept",
          body:
            "'Acids give H+ and bases give OH- in water' is the **Arrhenius** concept, not Bronsted-Lowry. Bronsted-Lowry is the proton-transfer (donor/acceptor) one; Lewis is the electron-pair one.",
        },
      ],
    },

    // Lewis acids — counting (formula variant)
    {
      kind: "formula" as const,
      slug: "lewis-acids",
      name: "Identifying Lewis acids",
      intuition:
        "A Lewis acid is anything hungry for an electron pair. The two tell-tale signs: an incomplete octet (the central atom has fewer than 8 electrons) or empty d-orbitals on a metal ion. Spot those and you have a Lewis acid.",
      definition:
        "A **Lewis acid** accepts an electron pair. Common Lewis acids and why:\n" +
        "- **BF3** and **AlCl3** — the central atom (B, Al) has an **incomplete octet**, so it accepts a pair.\n" +
        "- **FeCl3** — Fe(III) has **empty d-orbitals** to accept a pair.\n" +
        "- **NH3** is a Lewis **base**, not an acid — its nitrogen has a lone pair to **donate**.",
      pyqExampleId: "06bbf436-8993-4aa3-88ff-964c53e5e1dd", // count Lewis acids
      authoredExample: {
        prompt: "From the list CO2, BCl3, H2O and NH3, identify the Lewis acid.",
        steps: [
          "BCl3 has an incomplete octet on boron — it accepts an electron pair, so it is a Lewis acid.",
          "H2O and NH3 each have lone pairs to donate — they are Lewis bases.",
          "CO2 can act as a weak Lewis acid at carbon, but BCl3 is the clear electron-pair acceptor here.",
        ],
        answer: "BCl3 is the Lewis acid (incomplete octet on boron accepts an electron pair).",
      },
      practiceSet: [
        { prompt: "Is BF3 a Lewis acid or a Lewis base?", answer: "Lewis acid", method: "incomplete octet on boron accepts an electron pair" },
        { prompt: "Is NH3 a Lewis acid or a Lewis base?", answer: "Lewis base", method: "lone pair on nitrogen is donated" },
        { prompt: "Why is AlCl3 a Lewis acid?", answer: "Aluminium has an incomplete octet, so it accepts an electron pair" },
        { prompt: "Why is FeCl3 a Lewis acid?", answer: "Fe(III) has empty d-orbitals that accept an electron pair" },
      ],
      traps: [
        {
          title: "NH3 is a base, not an acid",
          body:
            "In a 'how many are Lewis acids?' list, **NH3 is the base** — its nitrogen lone pair is donated. AlCl3, BF3 and FeCl3 are the Lewis acids (all electron-pair acceptors).",
        },
      ],
    },

    // basicity / tribasic acids (formula variant)
    {
      kind: "formula" as const,
      slug: "basicity-of-acids",
      name: "Basicity of acids (monobasic, dibasic, tribasic)",
      intuition:
        "The 'basicity' of an acid is just how many replaceable (ionisable) hydrogen ions it can give per molecule. One H+ is monobasic, two is dibasic, three is tribasic. Count the acidic hydrogens.",
      definition:
        "**Basicity** = number of replaceable H+ ions an acid releases per molecule:\n" +
        "- **Monobasic** (1 H+): **HCl**, **HNO3**.\n" +
        "- **Dibasic** (2 H+): **H2SO4**, **H2CO3**.\n" +
        "- **Tribasic** (3 H+): **H3PO4** (phosphoric acid).",
      pyqExampleId: "ca57d882-4847-480b-b816-c1918675de4d", // tribasic acid = phosphoric
      authoredExample: {
        prompt: "What is the basicity of sulphuric acid (H2SO4), and what is the term for it?",
        steps: [
          "H2SO4 has two replaceable hydrogen ions per molecule.",
          "An acid releasing two H+ ions is called dibasic.",
        ],
        answer: "Basicity 2 — sulphuric acid is dibasic.",
      },
      practiceSet: [
        { prompt: "Which acid is tribasic: HCl, HNO3, H2SO4 or H3PO4?", answer: "H3PO4 (phosphoric acid)" },
        { prompt: "Basicity of hydrochloric acid (HCl)?", answer: "1 (monobasic)" },
        { prompt: "Basicity of sulphuric acid (H2SO4)?", answer: "2 (dibasic)" },
        { prompt: "Basicity of phosphoric acid (H3PO4)?", answer: "3 (tribasic)" },
      ],
      traps: [
        {
          title: "Tribasic = phosphoric acid",
          body:
            "Among HCl, HNO3, H2SO4 and H3PO4, the **tribasic** one is **phosphoric acid (H3PO4)** — three replaceable H+. HCl and HNO3 are monobasic; H2SO4 is dibasic.",
        },
      ],
    },

    // oxides classification (reference)
    {
      kind: "reference" as const,
      slug: "classification-of-oxides",
      name: "Classification of oxides: acidic, basic, neutral and amphoteric",
      intuition:
        "An oxide is an element bonded to oxygen, and how it behaves with acid or base sorts it into four buckets. Non-metal oxides are usually acidic; metal oxides are usually basic; a few non-metal oxides react with neither (neutral); and a few react with both (amphoteric).",
      definition:
        "The four oxide buckets:\n" +
        "- **Acidic oxides** — react with bases to form salts; mostly **non-metal** oxides: **CO2**, **SO2**, **NO2**.\n" +
        "- **Basic oxides** — react with acids to form salts; mostly **metal** oxides: **Na2O**, **MgO**, **CaO**.\n" +
        "- **Neutral oxides** — react with **neither** acids nor bases: **CO**, **N2O**, **NO**, **H2O**.\n" +
        "- **Amphoteric oxides** — react with **both** acids and bases: **Al2O3**, **ZnO**.",
      table: {
        columns: ["Type", "Reacts with", "Examples"],
        rows: [
          { cells: ["Acidic oxide", "Bases (forms a salt)", "CO2, SO2, NO2"] },
          { cells: ["Basic oxide", "Acids (forms a salt)", "Na2O, MgO, CaO"] },
          {
            cells: ["Neutral oxide", "Neither acids nor bases", "CO, N2O, NO, H2O"],
            noteAmber: "CO (carbon monoxide) is the neutral oxide the bank loves — CO2 in contrast is acidic.",
          },
          { cells: ["Amphoteric oxide", "Both acids and bases", "Al2O3, ZnO"] },
        ],
        caption: "Non-metal oxides tend to be acidic; metal oxides tend to be basic; CO/N2O/NO are neutral; Al2O3/ZnO are amphoteric.",
      },
      pyqExampleId: "94f12fff-7957-4fe2-9e0d-d231d3aaf0b6", // neutral oxide = CO
      selfCheckExample: {
        prompt: "Classify each oxide as acidic, basic or neutral: CO2, MgO, NO.",
        steps: [
          "CO2 is a non-metal oxide that reacts with bases — acidic.",
          "MgO is a metal oxide that reacts with acids — basic.",
          "NO reacts with neither acids nor bases — neutral.",
        ],
        answer: "CO2 acidic, MgO basic, NO neutral.",
      },
      practiceSet: [
        { prompt: "Which is a neutral oxide: CO, CO2, Na2O or MgO?", answer: "CO (carbon monoxide)" },
        { prompt: "Is CO2 an acidic, basic or neutral oxide?", answer: "Acidic" },
        { prompt: "Is MgO an acidic, basic or neutral oxide?", answer: "Basic" },
        { prompt: "Name an amphoteric oxide.", answer: "Al2O3 (or ZnO)" },
      ],
      traps: [
        {
          title: "CO is neutral, CO2 is acidic",
          body:
            "Carbon monoxide (**CO**) is a **neutral** oxide — it forms no salt with acids or bases. Do not confuse it with **CO2**, which is **acidic** (it forms carbonic acid / carbonates).",
        },
      ],
    },

    // electrolytes and conductivity (reference)
    {
      kind: "reference" as const,
      slug: "electrolytes-conductivity",
      name: "Electrolytes and electrical conductivity of solutions",
      intuition:
        "A solution conducts electricity only if it contains free ions. Acids, bases and salts dissolve into ions (electrolytes), so their solutions conduct. Covalent compounds like sugar and alcohol dissolve as whole molecules — no ions, no conduction.",
      definition:
        "What conducts and what does not:\n" +
        "- **Strong electrolytes** (conduct well) — strong acids (**HCl**), strong bases (**NaOH**), and salts (**NaCl**, **CuSO4**). They ionise fully in water.\n" +
        "- **Weak electrolytes** (conduct poorly) — weak acids like **CH3COOH** (acetic acid). They ionise only partly.\n" +
        "- **Non-electrolytes** (do NOT conduct) — **sugar**, **CH3OH** (methanol), and other covalent molecules that dissolve without forming ions.\n" +
        "- A base dissolved in water that conducts and turns the solution basic is **NaOH** (gives Na+ and OH- ions).",
      table: {
        columns: ["Substance in water", "Conducts?", "Reason"],
        rows: [
          { cells: ["NaOH (sodium hydroxide)", "Yes (basic solution)", "Strong electrolyte — gives Na+ and OH-"] },
          { cells: ["NaCl, CuSO4 (salts)", "Yes", "Ionise fully into free ions"] },
          { cells: ["HCl (strong acid)", "Yes", "Ionises fully into H+ and Cl-"] },
          { cells: ["CH3COOH (acetic acid)", "Weakly", "Weak electrolyte — partial ionisation"] },
          {
            cells: ["Sugar", "No", "Non-electrolyte — dissolves as whole molecules, no ions"],
            noteAmber: "Sugar is the classic non-conducting solution — it is covalent and produces no ions.",
          },
          { cells: ["CH3OH (methanol)", "No", "Non-electrolyte — covalent, no ions" ] },
        ],
      },
      pyqExampleId: "0fd78a5f-58e5-4d81-a52b-af1ca05c138d", // sugar does not conduct
      practiceSet: [
        { prompt: "Which does NOT conduct electricity in solution: copper sulphate, sodium chloride, sugar or sodium hydroxide?", answer: "Sugar", method: "covalent, no free ions" },
        { prompt: "Which compound conducts electricity and forms a basic solution: HCl, CH3COOH, CH3OH or NaOH?", answer: "NaOH" },
        { prompt: "Why does a sugar solution not conduct electricity?", answer: "It dissolves as whole molecules and produces no ions" },
        { prompt: "Acetic acid (CH3COOH) is a strong or weak electrolyte?", answer: "Weak electrolyte (partial ionisation)" },
      ],
      traps: [
        {
          title: "Sugar dissolves but does not ionise",
          body:
            "Sugar dissolves freely in water, but it dissolves as **neutral molecules**, not ions — so its solution does **not** conduct electricity. Salts, strong acids and strong bases all produce ions and DO conduct.",
        },
      ],
    },

    // first mineral acid discovered (reference) — HARD historical fact
    {
      kind: "reference" as const,
      slug: "first-mineral-acid",
      name: "The first mineral acid discovered",
      intuition:
        "A mineral acid is an inorganic acid derived from minerals — HCl, HNO3, H2SO4, H3PO4. The bank tests one historical fact here: which of these was discovered first.",
      definition:
        "The mineral acids and the historical fact:\n" +
        "- The common **mineral (inorganic) acids** are **HCl**, **HNO3**, **H2SO4** and **H3PO4**.\n" +
        "- **Nitric acid (HNO3)** was the **first mineral acid to be discovered** — credited to the Arab alchemist Jabir ibn Hayyan (around the 8th century).",
      table: {
        columns: ["Mineral acid", "Formula", "Note"],
        rows: [
          {
            cells: ["Nitric acid", "HNO3", "The first mineral acid discovered"],
            noteAmber: "Nitric acid is the bank's answer for 'first mineral acid discovered'.",
          },
          { cells: ["Hydrochloric acid", "HCl", "Mineral acid — discovered later"] },
          { cells: ["Sulphuric acid", "H2SO4", "'King of chemicals', dibasic" ] },
          { cells: ["Phosphoric acid", "H3PO4", "Tribasic mineral acid"] },
        ],
      },
      pyqExampleId: "81656a15-a916-40c6-b44b-0eba10431100", // first mineral acid discovered = nitric
      practiceSet: [
        { prompt: "Which was the first mineral acid to be discovered?", answer: "Nitric acid (HNO3)" },
        { prompt: "Name three mineral acids other than nitric acid.", answer: "Hydrochloric, sulphuric and phosphoric acid" },
        { prompt: "Is acetic acid a mineral acid?", answer: "No", method: "it is an organic acid, not derived from minerals" },
      ],
    },
  ],
};
