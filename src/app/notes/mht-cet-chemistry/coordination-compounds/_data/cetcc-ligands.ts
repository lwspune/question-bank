import type { SubtopicNote } from "@/app/notes/_types";

export const LIGANDS_NOTE: SubtopicNote = {
  subtopicName: "Ligands, Denticity and Donor Atoms",
  title: "Ligands: Denticity, Donor Atoms, Charge and Field Strength",
  oneLineDefinition:
    "A ligand is an ion or molecule that donates one or more electron pairs to the central metal; its denticity is the number of donor atoms it uses at once (monodentate chloro and cyano, bidentate oxalato and ethylenediamine, hexadentate EDTA), an ambidentate ligand such as nitrito or thiocyanato can bind through either of two atoms, its charge is neutral (ammine, aqua, carbonyl) or anionic (chloro, sulphato, oxalato), and its position in the spectrochemical series says how strongly it splits the metal's d orbitals.",
  whyItMatters:
    "33 PYQs, 2 HARD. Seventeen are denticity and donor-atom counts — oxalate and en bidentate, EDTA hexadentate, cyanide monodentate, the total donor atoms in tetracyanonickelate (4), trioxalatocobaltate (6) or pentaammineaquacobalt (6), and the two HARD counts on ambidentate SCN⁻ and free NO₂; ten are charge — the neutral ligand from a list (ammine, aqua, carbonyl, asked five times) and which complex has only anionic, only neutral or both kinds of ligand; six are the spectrochemical series — the strongest or weakest field ligand from a list, and one increasing order. " +
    "Three cards.",
  concepts: [
    // 1 — denticity and donor atoms
    {
      kind: "formula" as const,
      slug: "cetcc-denticity-and-donor-atoms",
      name: "Denticity and Counting Donor Atoms",
      intuition:
        "Denticity is the number of donor atoms a ligand uses on the SAME metal at the same time. Cl⁻, CN⁻, OH⁻, NH₃, H₂O, CO each use one atom: monodentate. Oxalate uses two oxygens, ethylenediamine two nitrogens: bidentate. EDTA uses two nitrogens and four carboxylate oxygens: hexadentate. An ambidentate ligand has two possible donor atoms but uses only one at a time — nitrite through N (nitro) or O (nitrito), thiocyanate through S (thiocyanato) or N (isothiocyanato) — so it is monodentate in any one complex. Donor atoms in a complex = sum over ligands of (number of ligands × denticity).",
      definition:
        "- **Monodentate**: Cl⁻, Br⁻, I⁻, F⁻, CN⁻, OH⁻, NH₃, H₂O, CO, NO₂⁻, SCN⁻ (one donor atom each). **Bidentate**: oxalato \\(\\text{C}_2\\text{O}_4^{2-}\\) (2 O), ethylenediamine en (2 N). **Hexadentate**: EDTA (2 N + 4 O = **6**).\n" +
        "- **Ambidentate** (two possible donor atoms, one used): NO₂⁻ (nitro, N / nitrito, O), SCN⁻ (thiocyanato, S / isothiocyanato, N), CN⁻ (cyano / isocyano). The paper's count for an ambidentate ion counts BOTH atoms: 2n mol SCN⁻ → **4n** mol donor atoms.\n" +
        "- Donor atoms in a complex: \\([\\text{Ni(CN)}_4]^{2-}\\) → 4 (one C each); \\([\\text{Co(C}_2\\text{O}_4)_3]^{3-}\\) → 3 × 2 = **6**; \\([\\text{Co(H}_2\\text{O)(NH}_3)_5]\\text{I}_3\\) → 1 + 5 = **6** (counter ions do not count); one mole oxalate → **2** moles donor atoms.\n" +
        "- Free \\(\\text{NO}_2\\) (the neutral molecule, not the nitrite ion) is keyed **0** donor atoms — it is not a ligand.\n" +
        "- Complexes with bidentate ligands in a list: those with oxalato or en (trioxalatocobaltate, bis(ethylenediamine)…platinum); cyano and fluoro complexes have none.",
      formula: {
        label: "Donor-atom count",
        latex:
          "\\text{donor atoms} = \\sum (\\text{number of ligands} \\times \\text{denticity});\\quad \\text{EDTA} = 6,\\ \\text{ox} = \\text{en} = 2",
      },
      authoredExample: {
        prompt: "Count the donor atoms in [Cr(en)₂(ox)]⁺ and give the coordination number of Cr.",
        steps: [
          "Two en × 2 N = 4; one oxalate × 2 O = 2. Total 6 donor atoms, so the coordination number is 6.",
        ],
        answer: "6 donor atoms; CN = 6",
      },
      selfCheckExample: {
        prompt: "How many moles of donor atoms are in 3 mol of [Co(C₂O₄)₃]³⁻, and in 2n mol of SCN⁻ (counting both possible donors)?",
        steps: [
          "6 per formula unit × 3 = 18. SCN⁻ has S and N: 2 × 2n = 4n.",
        ],
        answer: "18; 4n",
      },
      practiceSet: [
        { prompt: "Type of ligand: oxalate ion?", answer: "Bidentate" },
        { prompt: "Donor atoms in EDTA that bond the metal?", answer: "6" },
        { prompt: "Total donor atoms in tetracyanonickelate(II)?", answer: "4" },
        { prompt: "NOT monodentate: CN⁻, H₂NCH₂CH₂NH₂, OH⁻, Cl⁻?", answer: "H₂NCH₂CH₂NH₂ (bidentate)" },
      ],
      pyqExampleId: "0b9d0ef7-c1c7-4faa-a2b1-fbc52b483cc2",
      traps: [
        {
          title: "Counting all four oxygens of oxalate",
          body:
            "Oxalate has four O atoms but coordinates through two — it is bidentate, and one mole gives 2 moles of donor atoms. Cyanide has C and N but donates through carbon only: [Ni(CN)₄]²⁻ has 4 donor atoms, not 8.",
        },
      ],
    },

    // 2 — charge
    {
      kind: "reference" as const,
      slug: "cetcc-ligand-names-and-charges",
      name: "Neutral and Anionic Ligands by Name",
      intuition:
        "The name tells the charge. Neutral molecules keep a molecule-like name: ammine (NH₃), aqua (H₂O), carbonyl (CO), nitrosyl (NO), ethylenediamine (en). Anions end in -o: chloro, bromo, iodo, fluoro, cyano, hydroxo, nitro/nitrito, thiocyanato/isothiocyanato, sulphato, carbonato, nitrato, oxalato. So a complex named with only -o ligands (potassium trioxalatoaluminate(III)) has only anionic ligands; one named with ammine and aqua only (pentaammineaquacobalt(III) chloride) has only neutral ligands; pentaamminecarbonatocobalt(III) chloride has both.",
      definition:
        "- **Neutral**: ammine NH₃, aqua H₂O, carbonyl CO, nitrosyl NO, en, pyridine. Ammine (NH₃) is not amido (NH₂⁻).\n" +
        "- **Anionic** (-o): chloro, bromo, iodo, fluoro, cyano, hydroxo, nitro/nitrito, thiocyanato/isothiocyanato, sulphato, carbonato, nitrato, oxalato.\n" +
        "- Only anionic ligands: \\(\\text{K}_3[\\text{Al(C}_2\\text{O}_4)_3]\\), \\([\\text{Ni(CN)}_4]^{2-}\\), \\(\\text{Na}_3[\\text{Co(NO}_2)_6]\\). Only neutral: \\([\\text{Co(NH}_3)_5\\text{H}_2\\text{O}]\\text{Cl}_3\\), \\(\\text{Fe(CO)}_5\\), \\([\\text{Cu(NH}_3)_4]^{2+}\\). Both: \\([\\text{Co(NH}_3)_5\\text{CO}_3]\\text{Cl}\\), \\([\\text{Fe(H}_2\\text{O)}_5\\text{NCS}]^{2+}\\), \\([\\text{Pt(en)}_2(\\text{SCN})_2]^{2+}\\).\n" +
        "- Cisplatin \\([\\text{Pt(NH}_3)_2\\text{Cl}_2]\\): ligands NH₃ and Cl⁻.",
      table: {
        columns: ["Ligand", "Formula", "Charge", "Denticity"],
        rows: [
          { cells: ["Ammine", "NH₃", "0", "1"], noteAmber: "Ammine (NH₃) is neutral; amido (NH₂⁻) is anionic." },
          { cells: ["Aqua", "H₂O", "0", "1"] },
          { cells: ["Carbonyl", "CO", "0", "1"] },
          { cells: ["Ethylenediamine (en)", "H₂NCH₂CH₂NH₂", "0", "2"] },
          { cells: ["Chloro / bromo / iodo / fluoro", "X⁻", "−1", "1"] },
          { cells: ["Cyano", "CN⁻", "−1", "1 (through C)"] },
          { cells: ["Nitro / nitrito", "NO₂⁻ / ONO⁻", "−1", "1, ambidentate"] },
          { cells: ["Thiocyanato / isothiocyanato", "SCN⁻ / NCS⁻", "−1", "1, ambidentate"] },
          { cells: ["Oxalato", "C₂O₄²⁻", "−2", "2"] },
          { cells: ["Sulphato / carbonato", "SO₄²⁻ / CO₃²⁻", "−2", "1 (usually)"] },
          { cells: ["EDTA", "(edta)⁴⁻", "−4", "6"] },
        ],
        caption: "Molecule-like names are neutral; names ending in -o are anions.",
      },
      selfCheckExample: {
        prompt: "Which complex contains anionic AND neutral ligands: potassium trioxalatoaluminate(III), hexacyanoferrate(II) ion, pentaamminecarbonatocobalt(III) chloride, tetraamminecopper(II) ion?",
        steps: [
          "Ammine (neutral) with carbonato (anionic).",
        ],
        answer: "Pentaamminecarbonatocobalt(III) chloride",
      },
      practiceSet: [
        { prompt: "Neutral ligand: ammine, chloro, sulphato, nitrito?", answer: "Ammine" },
        { prompt: "Anionic ligand: isothiocyanato, ammine, aqua, ethylenediamine?", answer: "Isothiocyanato" },
        { prompt: "Complex with a neutral ligand: Fe(CO)₅, trioxalatocobaltate(III), sodium hexanitrocobaltate(III), tetracyanonickelate(II)?", answer: "Pentacarbonyliron(0)" },
        { prompt: "Ligands in cisplatin?", answer: "NH₃ and Cl⁻" },
      ],
      pyqExampleId: "897e35eb-9f99-43d0-ac66-c1abee431263",
      traps: [
        {
          title: "Reading carbonyl or carbonato by the 'carbon'",
          body:
            "Carbonyl is CO, neutral; carbonato is CO₃²⁻, anionic. Likewise nitrosyl (NO, neutral) against nitro/nitrato (anions).",
        },
      ],
    },

    // 3 — spectrochemical series
    {
      kind: "formula" as const,
      slug: "cetcc-spectrochemical-series",
      name: "Field Strength: the Spectrochemical Series",
      intuition:
        "Ligands are ranked by how far they split the metal's d orbitals. Halides and sulphide split least (weak field, high-spin complexes); CO and CN⁻ split most (strong field, low-spin). The order to carry: I⁻ < Br⁻ < S²⁻ < SCN⁻ < Cl⁻ < NO₃⁻ < F⁻ < OH⁻ < C₂O₄²⁻ < H₂O < NCS⁻ < EDTA⁴⁻ < NH₃ < en < NO₂⁻ < CN⁻ < CO. Any question that lists CO or CN⁻ wants it as strongest; any that lists a halide wants it as weakest.",
      definition:
        "- **Weak field** (small Δ, high spin): I⁻ < Br⁻ < S²⁻ < SCN⁻ < Cl⁻ < NO₃⁻ < F⁻ < OH⁻ < C₂O₄²⁻ < H₂O.\n" +
        "- **Strong field** (large Δ, low spin): NCS⁻ < EDTA⁴⁻ < NH₃ < en < NO₂⁻ < CN⁻ < **CO** (strongest).\n" +
        "- Keyed answers: strongest of {H₂O, OH⁻, ox, CO} → **CO**; strong among {CN⁻, SCN⁻, I⁻, ox} → **CN⁻**; weak among {EDTA, CO, F⁻, NH₃} → **F⁻**; weak among {NH₃, NC⁻, Br⁻, CO} → **Br⁻**; increasing among I⁻, Cl⁻, S²⁻, OH⁻ keyed **I⁻ < Cl⁻ < S²⁻ < OH⁻**.\n" +
        "- One paper keyed **EDTA above en** as the strongest of {S²⁻, OH⁻, EDTA, en}; the textbook series puts en above EDTA. Either way both sit far above OH⁻ and S²⁻.",
      formula: {
        label: "Spectrochemical series",
        latex:
          "\\text{I}^- < \\text{Br}^- < \\text{S}^{2-} < \\text{SCN}^- < \\text{Cl}^- < \\text{F}^- < \\text{OH}^- < \\text{C}_2\\text{O}_4^{2-} < \\text{H}_2\\text{O} < \\text{NH}_3 < \\text{en} < \\text{CN}^- < \\text{CO}",
      },
      authoredExample: {
        prompt: "Arrange NH₃, Cl⁻, CN⁻ and H₂O in increasing field strength, and say which would give a low-spin d⁶ complex.",
        steps: [
          "Cl⁻ < H₂O < NH₃ < CN⁻. NH₃ and CN⁻ are strong-field: both pair the electrons of a d⁶ ion (as in [Co(NH₃)₆]³⁺).",
        ],
        answer: "Cl⁻ < H₂O < NH₃ < CN⁻; NH₃ and CN⁻",
      },
      selfCheckExample: {
        prompt: "Which is the weak field ligand: EDTA, CO, F⁻, NH₃?",
        steps: [
          "Halides sit at the weak end.",
        ],
        answer: "F⁻",
      },
      practiceSet: [
        { prompt: "Highest field strength: H₂O, OH⁻, C₂O₄²⁻, CO?", answer: "CO" },
        { prompt: "Strong field ligand: CN⁻, SCN⁻, I⁻, C₂O₄²⁻?", answer: "CN⁻" },
        { prompt: "Weak field ligand: NH₃, NC⁻, Br⁻, CO?", answer: "Br⁻" },
        { prompt: "Strongest field: S²⁻, OH⁻, EDTA, en?", answer: "EDTA (paper's key; en by the textbook series — both far above OH⁻)" },
      ],
      pyqExampleId: "e101a75b-e715-497d-9bc0-a53fcd1a7b5d",
      traps: [
        {
          title: "Ranking by charge",
          body:
            "A −2 oxalate is a WEAKER field ligand than neutral NH₃ or CO. Field strength follows the donor atom and π-bonding, not the charge: C-donors (CO, CN⁻) top the series, halides sit at the bottom.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Bonding and Stability — where field strength decides spin and hybridisation",
      href: "/notes/mht-cet-chemistry/coordination-compounds/cetcc-bonding-and-stability",
    },
    {
      label: "Nomenclature — the ligand names inside a formula",
      href: "/notes/mht-cet-chemistry/coordination-compounds/cetcc-nomenclature",
    },
  ],
};
