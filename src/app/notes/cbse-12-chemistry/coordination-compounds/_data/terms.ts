import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_CC_TERMS_NOTE: SubtopicNote = {
  subtopicName: "Definitions of Some Important Terms Pertaining to Coordination Compounds",
  title: "Ligands, Coordination Number, Oxidation State and Other Key Terms",
  oneLineDefinition:
    "The words the whole chapter uses: ligands by denticity (unidentate, didentate, polydentate, ambidentate, chelating), coordination number and the oxidation state of the metal, coordination entity, sphere and polyhedron, homoleptic and heteroleptic complexes, and the chelate effect.",
  whyItMatters:
    "41 questions, thirty-four of them from board papers, in every year from 2022 to 2026. The board asks you to define or pick an ambidentate ligand (every year from 2022 to 2026), the polydentate ligand EDTA (2023, 2024), which ligand or complex is a chelate (2023, 2024, 2026) and why NH₄⁺ cannot be a ligand (2023). It sets the oxidation state of the metal (2023, 2024, 2026), the coordination number with a didentate ligand (2024, 2025, 2026), homoleptic and heteroleptic complexes (2023, 2025, 2026), the chelate effect (2024) and the difference between a double salt and a complex (2025, 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbccc-ligands",
      name: "Ligands and denticity",
      intuition:
        "A ligand holds the metal with a lone pair, like a hand. Water and ammonia have one hand. Ethane-1,2-diamine and oxalate have two hands that grip the same metal at once, closing a ring. EDTA has six. The nitrite ion has two different hands, nitrogen and oxygen, but it can only use one at a time: that makes it ambidentate, not didentate.",
      definition:
        "- **Ligands** are the ions or molecules bound to the central atom or ion. Each donates an electron pair through a **donor atom**; the central metal acts as a Lewis acid.\n" +
        "- **Unidentate:** bound through a single donor atom, as \\(\\text{Cl}^{-}\\), \\(\\text{H}_2\\text{O}\\), \\(\\text{NH}_3\\).\n" +
        "- **Didentate:** binds through two donor atoms, as ethane-1,2-diamine \\(\\text{H}_2\\text{NCH}_2\\text{CH}_2\\text{NH}_2\\) (en, two N) and oxalate \\(\\text{C}_2\\text{O}_4^{2-}\\) (two O).\n" +
        "- **Polydentate:** several donor atoms in one ligand, as \\(\\text{N}(\\text{CH}_2\\text{CH}_2\\text{NH}_2)_3\\). EDTA\\(^{4-}\\) (ethylenediaminetetraacetate) is **hexadentate**: it binds through two nitrogen and four oxygen atoms.\n" +
        "- **Chelate ligand:** a di- or polydentate ligand that uses two or more donor atoms at the same time to bind a single metal ion. The number of such ligating groups is the **denticity**.\n" +
        "- **Ambidentate ligand:** has two different donor atoms and binds through either one. \\(\\text{NO}_2^{-}\\) binds through N or O; \\(\\text{SCN}^{-}\\) through S or N.\n" +
        "- A species with no lone pair to donate, such as \\(\\text{NH}_4^{+}\\), cannot act as a ligand.",
      table: {
        columns: ["Type of ligand", "Donor atoms used", "Examples"],
        rows: [
          { cells: ["Unidentate", "One", "Cl⁻, H₂O, NH₃"] },
          { cells: ["Didentate", "Two, at the same time", "en (two N), C₂O₄²⁻ (two O)"] },
          { cells: ["Polydentate", "Several, at the same time", "N(CH₂CH₂NH₂)₃; EDTA⁴⁻ is hexadentate (2 N, 4 O)"] },
          {
            cells: ["Chelating", "Two or more donor atoms of one ligand on one metal ion, closing a ring", "en, oxalate, EDTA⁴⁻; [Co(en)₃]³⁺ is a chelate complex"],
            noteAmber: "Board 2023 asked which cobalt complex is a chelate: the one with en.",
            pyqExampleId: "4e359af7-1794-4d02-b9eb-d21d7b8ae2a7",
          },
          { cells: ["Ambidentate", "Either of two different donor atoms, one at a time", "NO₂⁻ (N or O), SCN⁻ (S or N)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Classify each ligand as unidentate, didentate, hexadentate or ambidentate: \\(\\text{H}_2\\text{O}\\), \\(\\text{SCN}^{-}\\), en, EDTA\\(^{4-}\\).",
        steps: [
          "\\(\\text{H}_2\\text{O}\\) binds through its one O atom: unidentate.",
          "\\(\\text{SCN}^{-}\\) can bind through S or through N, one at a time: ambidentate.",
          "en binds through both N atoms at once: didentate.",
          "EDTA\\(^{4-}\\) binds through 2 N and 4 O atoms: hexadentate.",
        ],
        answer: "Unidentate, ambidentate, didentate, hexadentate",
      },
      practiceSet: [
        { prompt: "Why can \\(\\text{NH}_4^{+}\\) not act as a ligand, though \\(\\text{NH}_3\\) can?", answer: "Its nitrogen has no lone pair left to donate: the lone pair of \\(\\text{NH}_3\\) is used in the bond to the fourth H" },
        { prompt: "Through which atoms does EDTA\\(^{4-}\\) bind a metal ion?", answer: "Two nitrogen atoms and four oxygen atoms" },
        { prompt: "Give the two ways in which the nitrite ion can bind a metal.", answer: "Through nitrogen (\\(-\\text{NO}_2\\)) or through oxygen (\\(-\\text{ONO}\\))" },
      ],
      pyqExampleId: "85b772d0-7fd1-4d48-92d0-5c1f77640d88",
      traps: [
        {
          title: "Calling an ambidentate ligand didentate",
          body: "\\(\\text{NO}_2^{-}\\) has two different donor atoms but uses only one at a time, so it closes no ring and forms no chelate. A didentate ligand uses two donor atoms together.",
        },
        {
          title: "EDTA is not bidentate",
          body: "EDTA\\(^{4-}\\) is hexadentate. A 2023 assertion-reason item gave a true assertion about EDTA with the reason \"EDTA is a bidentate ligand\", which is false: code (C).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbccc-cnox",
      name: "Coordination number and oxidation state of the metal",
      intuition:
        "Two different counts. The coordination number counts the donor atoms touching the metal, so a didentate ligand counts twice. The oxidation state is a charge balance: take the ligands off with their electron pairs and see what charge the metal is left with. Neutral ligands add nothing; each anionic ligand adds its own charge.",
      definition:
        "- **Coordination number (CN):** the number of ligand donor atoms to which the metal is directly bonded. In \\([\\text{PtCl}_6]^{2-}\\) it is 6; in \\([\\text{Ni}(\\text{NH}_3)_4]^{2+}\\) it is 4; in \\([\\text{Fe}(\\text{C}_2\\text{O}_4)_3]^{3-}\\) and \\([\\text{Co}(\\text{en})_3]^{3+}\\) it is 6, because oxalate and en are didentate.\n" +
        "- Only sigma bonds from ligand to metal are counted; pi bonds are not.\n" +
        "- **Oxidation number:** the charge the central atom would carry if all the ligands were removed along with the electron pairs they share with it. It is written as a Roman numeral, as Cu(I) in \\([\\text{Cu}(\\text{CN})_4]^{3-}\\).\n" +
        "- Ligand charges: \\(\\text{NH}_3\\), \\(\\text{H}_2\\text{O}\\), CO, en are 0; \\(\\text{Cl}^{-}\\), \\(\\text{Br}^{-}\\), \\(\\text{CN}^{-}\\), \\(\\text{OH}^{-}\\), \\(\\text{NO}_2^{-}\\) are \\(-1\\); \\(\\text{C}_2\\text{O}_4^{2-}\\), \\(\\text{CO}_3^{2-}\\), \\(\\text{SO}_4^{2-}\\) are \\(-2\\).\n" +
        "- Find the charge on the entity first from the counter ions outside the bracket.",
      formula: {
        label: "Charge balance for the metal",
        latex: "x + \\sum(\\text{charges of the ligands}) = \\text{charge on the coordination entity}",
        symbols: [{ symbol: "\\(x\\)", meaning: "oxidation state of the central metal" }],
      },
      authoredExample: {
        prompt: "Find the oxidation state and the coordination number of chromium in \\([\\text{Cr}(\\text{en})_2\\text{Br}_2]\\text{NO}_3\\).",
        steps: [
          "One \\(\\text{NO}_3^{-}\\) is outside, so the entity is \\([\\text{Cr}(\\text{en})_2\\text{Br}_2]^{+}\\).",
          "en is neutral and each \\(\\text{Br}^{-}\\) is \\(-1\\): \\(x + 0 + 2(-1) = +1\\), so \\(x = +3\\).",
          "Donor atoms: two en give \\(2 \\times 2 = 4\\), two \\(\\text{Br}^{-}\\) give 2. CN = 6.",
        ],
        answer: "Oxidation state +3, coordination number 6",
      },
      selfCheckExample: {
        prompt: "What is the oxidation state of iron in \\(\\text{K}_4[\\text{Fe}(\\text{CN})_6]\\)?",
        steps: ["Four \\(\\text{K}^{+}\\) outside, so the entity is \\([\\text{Fe}(\\text{CN})_6]^{4-}\\).", "\\(x + 6(-1) = -4\\), so \\(x = +2\\)."],
        answer: "+2",
      },
      practiceSet: [
        { prompt: "What is the oxidation state of nickel in \\([\\text{Ni}(\\text{CO})_4]\\)?", answer: "0: CO is a neutral ligand and the complex is neutral" },
        { prompt: "What is the coordination number of iron in \\([\\text{Fe}(\\text{C}_2\\text{O}_4)_3]^{3-}\\)?", answer: "6: each oxalate is didentate, \\(3 \\times 2 = 6\\)" },
        { prompt: "Find the oxidation state of platinum in \\([\\text{PtCl}_4]^{2-}\\).", answer: "\\(x - 4 = -2\\), so +2" },
      ],
      pyqExampleId: "816e3b11-83aa-45e5-a09e-7a3f1b9542d7",
      traps: [
        {
          title: "Reading the charge of the ion as the metal's oxidation state",
          body: "In \\([\\text{Pt}(\\text{en})_2\\text{Cl}_2]^{2+}\\) the two chlorido ligands carry \\(-2\\), so platinum is +4, not +2. Always add the ligand charges back.",
        },
        {
          title: "Counting ligands instead of donor atoms",
          body: "For en, oxalate and EDTA count the donor atoms, not the molecules. The number of ligand molecules is the usual wrong option in a board MCQ.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbccc-entity",
      name: "Coordination entity, sphere, polyhedron, homoleptic and heteroleptic",
      intuition:
        "Write a complex and draw the square bracket: everything inside is the coordination entity, held together as one unit with the metal at its centre. Whatever is outside is a counter ion that leaves in water. The shape the donor atoms make around the metal is the polyhedron. If all the ligands are the same kind the complex is homoleptic; if not, heteroleptic.",
      definition:
        "- **Coordination entity:** a central metal atom or ion bonded to a fixed number of ions or molecules, as \\([\\text{CoCl}_3(\\text{NH}_3)_3]\\), \\([\\text{Ni}(\\text{CO})_4]\\), \\([\\text{Fe}(\\text{CN})_6]^{4-}\\).\n" +
        "- **Central atom or ion:** the atom or ion to which the groups are bound in a definite arrangement, as \\(\\text{Co}^{3+}\\) in \\([\\text{CoCl}(\\text{NH}_3)_5]^{2+}\\). Central atoms are Lewis acids.\n" +
        "- **Coordination sphere:** the central atom and its ligands, enclosed in the square bracket. The ionisable groups outside are **counter ions**. In \\(\\text{K}_4[\\text{Fe}(\\text{CN})_6]\\) the sphere is \\([\\text{Fe}(\\text{CN})_6]^{4-}\\) and the counter ion is \\(\\text{K}^{+}\\).\n" +
        "- **Coordination polyhedron:** the spatial arrangement of the donor atoms around the central atom. Octahedral \\([\\text{Co}(\\text{NH}_3)_6]^{3+}\\), tetrahedral \\([\\text{Ni}(\\text{CO})_4]\\), square planar \\([\\text{PtCl}_4]^{2-}\\).\n" +
        "- **Homoleptic:** the metal is bound to only one kind of donor group, as \\([\\text{Co}(\\text{NH}_3)_6]^{3+}\\). **Heteroleptic:** bound to more than one kind, as \\([\\text{Co}(\\text{NH}_3)_4\\text{Cl}_2]^{+}\\).\n" +
        "- Counter ions do not count when you decide homoleptic or heteroleptic: only the ligands inside the bracket do.",
      table: {
        columns: ["Term", "Meaning", "Example"],
        rows: [
          { cells: ["Coordination entity", "Central metal bonded to a fixed number of ions or molecules", "[Co(NH₃)₆]³⁺"] },
          { cells: ["Coordination sphere", "Central atom with its ligands, inside the square bracket", "[Fe(CN)₆]⁴⁻ in K₄[Fe(CN)₆]"] },
          { cells: ["Counter ion", "Ionisable group written outside the bracket", "K⁺ in K₄[Fe(CN)₆]"] },
          { cells: ["Coordination polyhedron", "Arrangement of the donor atoms in space", "Octahedral, tetrahedral, square planar"] },
          { cells: ["Homoleptic", "Only one kind of donor group on the metal", "[Co(NH₃)₆]³⁺, [Ni(H₂O)₆]²⁺"] },
          { cells: ["Heteroleptic", "More than one kind of donor group on the metal", "[Co(NH₃)₄Cl₂]⁺"] },
        ],
      },
      selfCheckExample: {
        prompt: "Is \\([\\text{Pt}(\\text{NH}_3)_4]\\text{Cl}_2\\) homoleptic or heteroleptic? Name its coordination sphere and counter ions.",
        steps: [
          "Inside the bracket there are only \\(\\text{NH}_3\\) ligands, so it is homoleptic; the chlorides are outside and do not count.",
          "Sphere: \\([\\text{Pt}(\\text{NH}_3)_4]^{2+}\\). Counter ions: two \\(\\text{Cl}^{-}\\).",
        ],
        answer: "Homoleptic; sphere \\([\\text{Pt}(\\text{NH}_3)_4]^{2+}\\), counter ions \\(\\text{Cl}^{-}\\)",
      },
      practiceSet: [
        { prompt: "Name the coordination polyhedron of \\([\\text{PtCl}_4]^{2-}\\).", answer: "Square planar" },
        { prompt: "Which of \\([\\text{Cr}(\\text{H}_2\\text{O})_6]^{3+}\\) and \\([\\text{Cr}(\\text{H}_2\\text{O})_5\\text{Cl}]^{2+}\\) is heteroleptic?", answer: "\\([\\text{Cr}(\\text{H}_2\\text{O})_5\\text{Cl}]^{2+}\\): it has two kinds of ligand, water and chloride" },
        { prompt: "What is the central ion in \\([\\text{Fe}(\\text{CN})_6]^{3-}\\)?", answer: "\\(\\text{Fe}^{3+}\\)" },
      ],
      pyqExampleId: "56e52737-8338-4f7d-86f0-b3acc2f89019",
      traps: [
        {
          title: "Counting the counter ion as a ligand",
          body: "\\([\\text{Fe}(\\text{H}_2\\text{O})_6]\\text{Cl}_2\\) is homoleptic: the chlorides sit outside the bracket. A 2025 assertion-reason item on this was code (A).",
        },
        {
          title: "Defining a term without an example",
          body: "\"Explain with examples\" gives a mark for the example. Learn one formula for each term, written with the square bracket and the charge.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbccc-chelate",
      name: "Chelate complexes and the chelate effect",
      intuition:
        "A chelating ligand holds the metal with two or more hands at once. To pull it off, every hand must let go together, which rarely happens. So a complex of chelating ligands is more stable than a similar complex of separate one-handed ligands. That extra stability is the chelate effect.",
      definition:
        "- When a di- or polydentate ligand uses two or more donor atoms at once to bind a single metal ion, it closes a ring with the metal: a **chelate**.\n" +
        "- **Chelate effect:** chelate complexes tend to be **more stable** than similar complexes containing unidentate ligands.\n" +
        "- Examples: \\([\\text{Co}(\\text{en})_3]^{3+}\\) is more stable than \\([\\text{Co}(\\text{NH}_3)_6]^{3+}\\); \\([\\text{Fe}(\\text{C}_2\\text{O}_4)_3]^{3-}\\) is more stable than \\([\\text{Fe}(\\text{H}_2\\text{O})_6]^{3+}\\).\n" +
        "- More donor atoms in one ligand, more rings, more stability: EDTA\\(^{4-}\\) forms very stable complexes. That is why it is used to estimate hardness of water and to treat lead poisoning.",
      table: {
        columns: ["Compare", "More stable", "Reason"],
        rows: [
          { cells: ["[Co(en)₃]³⁺ and [Co(NH₃)₆]³⁺", "[Co(en)₃]³⁺", "en is didentate and forms chelate rings; NH₃ is unidentate"] },
          { cells: ["[Co(C₂O₄)₃]³⁻ and [CoF₆]³⁻", "[Co(C₂O₄)₃]³⁻", "Oxalate is didentate and chelates; F⁻ is unidentate"] },
          { cells: ["[Ni(en)₃]²⁺ and [Ni(NH₃)₆]²⁺", "[Ni(en)₃]²⁺", "Both bind through six N atoms, but only en chelates"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which is more stable, \\([\\text{Cr}(\\text{H}_2\\text{O})_6]^{3+}\\) or \\([\\text{Cr}(\\text{C}_2\\text{O}_4)_3]^{3-}\\)? Give the reason.",
        steps: [
          "Oxalate is didentate: three of them close three chelate rings around \\(\\text{Cr}^{3+}\\).",
          "Water is unidentate and closes no ring. By the chelate effect the oxalate complex is more stable.",
        ],
        answer: "\\([\\text{Cr}(\\text{C}_2\\text{O}_4)_3]^{3-}\\), because of the chelate effect",
      },
      practiceSet: [
        { prompt: "Define a chelate ligand.", answer: "A di- or polydentate ligand that uses two or more donor atoms at the same time to bind a single metal ion" },
        { prompt: "Why does EDTA form very stable complexes?", answer: "It is hexadentate, so one ligand grips the metal through six donor atoms and closes several chelate rings" },
        { prompt: "Can \\(\\text{NO}_2^{-}\\) form a chelate? Why?", answer: "No: it is ambidentate and binds through only one donor atom at a time" },
      ],
      pyqExampleId: "d6d5d735-d413-47ad-a61e-7fee85dd42d8",
      traps: [
        {
          title: "Giving the effect without saying which way",
          body: "\"How does it affect stability?\" needs the word: chelation INCREASES the stability. Add one pair of complexes as the example.",
        },
        {
          title: "Calling any complex with many ligands a chelate",
          body: "Six separate \\(\\text{NH}_3\\) molecules close no ring, so \\([\\text{Co}(\\text{NH}_3)_6]^{3+}\\) is not a chelate complex. A chelate needs one ligand bound to one metal ion through two or more donor atoms at the same time.",
        },
      ],
    },
  ],
};
