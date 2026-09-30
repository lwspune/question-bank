import type { SubtopicNote } from "@/app/notes/_types";

export const LIGANDS_COORD_NOTE: SubtopicNote = {
  subtopicName: "Ligands, Denticity and Nomenclature",
  title: "Ligands, Denticity and Nomenclature",
  oneLineDefinition:
    "A ligand is classified by how many donor atoms it binds with and whether it has a choice of donor atom; the name of a complex lists its ligands alphabetically, ends an anionic complex in -ate and gives the metal's oxidation state in Roman numerals.",
  whyItMatters:
    "Twenty-three PYQs, sixteen of them multiple choice, and two from 2026. Ten classify ligands as ambidentate, chelating, homoleptic or σ-donor and π-acceptor; seven are about the nickel–dimethylglyoxime complex and copper sulphate pentahydrate; six ask for an IUPAC name or the metal's oxidation state and d-electron count.",
  concepts: [
    // C1 — ligand types
    {
      kind: "reference" as const,
      slug: "jccoord-ligand-types",
      name: "Denticity and types of ligands",
      intuition:
        "Count the atoms a ligand actually bonds with. One donor atom makes it monodentate, two make it bidentate, six make EDTA⁴⁻ hexadentate. A ligand that bonds through two or more atoms at once closes a ring with the metal (a chelate). An ambidentate ligand is different: it has two possible donor atoms but uses only one of them at a time.",
      definition:
        "- **Monodentate**: one donor atom (\\(\\mathrm{NH_3}\\), \\(\\mathrm{H_2O}\\), \\(\\mathrm{Cl^-}\\), CO).\n" +
        "- **Chelating (polydentate)**: two or more donor atoms at once, forming a ring: en, \\(\\mathrm{C_2O_4^{2-}}\\), dmgH⁻, biuret (all bidentate), EDTA⁴⁻ (hexadentate).\n" +
        "- **Ambidentate**: one donor atom at a time, chosen from two: \\(\\mathrm{NO_2^-}\\) (N or O), \\(\\mathrm{SCN^-}\\) (S or N), \\(\\mathrm{CN^-}\\) (C or N).\n" +
        "- **Homoleptic**: only one kind of ligand, as in \\(\\mathrm{[Ni(CN)_4]^{2-}}\\). **Heteroleptic**: more than one kind, as in \\(\\mathrm{[Co(NH_3)_4Cl_2]^+}\\).\n" +
        "- \\(\\mathrm{N(CH_3)_3}\\) is only a σ-donor. \\(\\mathrm{P(CH_3)_3}\\) and \\(\\mathrm{PPh_3}\\) are σ-donors and also π-acceptors, through empty orbitals on phosphorus.",
      table: {
        columns: ["Ligand", "Donor atom(s)", "Denticity", "Type"],
        rows: [
          { cells: ["\\(\\mathrm{NH_3}\\), \\(\\mathrm{H_2O}\\)", "N; O", "1", "Monodentate, neutral"] },
          { cells: ["\\(\\mathrm{NO_2^-}\\)", "N (nitro) or O (nitrito)", "1", "Ambidentate"] },
          { cells: ["\\(\\mathrm{SCN^-}\\)", "S (thiocyanato) or N (isothiocyanato)", "1", "Ambidentate"] },
          { cells: ["\\(\\mathrm{CN^-}\\)", "C (cyanido) or N (isocyanido)", "1", "Ambidentate"] },
          { cells: ["en, \\(\\mathrm{H_2NCH_2CH_2NH_2}\\)", "Two N", "2", "Chelating, neutral"] },
          { cells: ["Oxalate, \\(\\mathrm{C_2O_4^{2-}}\\)", "Two O", "2", "Chelating, not ambidentate"], noteAmber: "Oxalate uses both oxygens at once; it has no choice of donor atom, so it is not ambidentate." },
          { cells: ["Biuret, \\(\\mathrm{H_2NCONHCONH_2}\\)", "Two carbonyl O, or two deprotonated amide N in alkali", "2", "Chelating"] },
          { cells: ["EDTA⁴⁻", "Two N and four O", "6", "Chelating; octahedral even around Ca²⁺"] },
          { cells: ["\\(\\mathrm{PPh_3}\\) (in Wilkinson's catalyst)", "P", "1", "σ-donor and π-acceptor"] },
        ],
        caption: "Chelating and ambidentate are different ideas: a chelate uses two atoms together, an ambidentate ligand uses one of two.",
      },
      selfCheckExample: {
        prompt: "Which of these complexes is homoleptic: \\(\\mathrm{[Co(NH_3)_5Cl]^{2+}}\\), \\(\\mathrm{[Fe(H_2O)_6]^{3+}}\\) or \\(\\mathrm{[Pt(NH_3)_2Cl_2]}\\)?",
        steps: [
          "Homoleptic means every ligand is the same.",
          "The cobalt and platinum complexes carry both ammonia and chloride. The iron complex carries only water.",
        ],
        answer: "\\(\\mathrm{[Fe(H_2O)_6]^{3+}}\\)",
      },
      practiceSet: [
        { prompt: "What is the denticity of EDTA⁴⁻?", answer: "6 (two N and four O)" },
        { prompt: "Is the oxalate ion an ambidentate ligand?", answer: "No; it is a bidentate chelating ligand" },
        { prompt: "Through which atom does cyanide bind iron in \\(\\mathrm{[Fe(CN)_6]^{4-}}\\)?", answer: "Carbon" },
        { prompt: "Name the two possible donor atoms of the nitrite ion.", answer: "N and O" },
      ],
      pyqExampleId: "1ab3ba9e-8e41-477f-bb6c-362647054087", // 2024 — count the ambidentate ligands in a list
      traps: [
        {
          title: "A chelating ligand is not ambidentate",
          body: "Oxalate and ethane-1,2-diamine bind through two atoms together, so they chelate. Ambidentate means one bond through either of two different atoms, as in \\(\\mathrm{NO_2^-}\\), \\(\\mathrm{SCN^-}\\) and \\(\\mathrm{CN^-}\\).",
        },
        {
          title: "Nitrogen and phosphorus ligands bond differently",
          body: "\\(\\mathrm{N(CH_3)_3}\\) and \\(\\mathrm{P(CH_3)_3}\\) both donate a lone pair, but only phosphorus can also accept π electrons back from the metal. A statement that their bonding is always the same is false.",
        },
        {
          title: "Wilkinson's catalyst carries triphenylphosphine",
          body: "Wilkinson's catalyst is \\(\\mathrm{[RhCl(PPh_3)_3]}\\). Its ligand is triphenylphosphine, a phosphine, not \\(\\mathrm{PH_3}\\) itself. A 2024 key treated 'phosphine acts as a ligand in Wilkinson catalyst' as false, reading phosphine as \\(\\mathrm{PH_3}\\).",
        },
      ],
    },

    // C2 — Ni(dmgH)2 and CuSO4·5H2O
    {
      kind: "reference" as const,
      slug: "jccoord-dmg-cuso4",
      name: "Nickel dimethylglyoximate and copper sulphate pentahydrate",
      intuition:
        "Two named compounds come up again and again. Dimethylglyoxime (dmgH₂) loses one oxime proton, and two of the anions hold Ni²⁺ in a flat square: the red precipitate that detects nickel. In blue vitriol, four waters sit on copper and the fifth is held only by hydrogen bonds.",
      definition:
        "- dmgH₂ is \\(\\mathrm{CH_3C(=NOH)C(=NOH)CH_3}\\), \\(\\mathrm{C_4H_8N_2O_2}\\). Each loses one H to give dmgH⁻, \\(\\mathrm{C_4H_7N_2O_2^-}\\), a bidentate anion that binds through two N.\n" +
        "- \\(\\mathrm{[Ni(dmgH)_2]}\\) is neutral, red, square planar and diamagnetic (d⁸ with dsp²). It is insoluble in the ammoniacal solution (pH about 9) where the test is done.\n" +
        "- Its 14 H atoms: 12 in four methyl groups and 2 in the O–H···O hydrogen bonds that link the two ligands.\n" +
        "- Rings: two five-membered chelate rings (Ni, N, C, C, N) and two six-membered hydrogen-bonded rings (Ni, N, O, H, O, N).\n" +
        "- \\(\\mathrm{CuSO_4\\cdot 5H_2O}\\) is written \\(\\mathrm{[Cu(H_2O)_4]SO_4\\cdot H_2O}\\): four Cu–O bonds to water; the fifth water is hydrogen-bonded to sulphate and to coordinated water. No ligand binds through sulphur.",
      table: {
        columns: ["Feature", "Value", "Reason"],
        rows: [
          { cells: ["Colour of \\(\\mathrm{[Ni(dmgH)_2]}\\)", "Red (rosy red precipitate)", "Used to detect Ni²⁺ in ammoniacal solution"] },
          { cells: ["Geometry and magnetism of \\(\\mathrm{[Ni(dmgH)_2]}\\)", "Square planar, diamagnetic", "d⁸ Ni²⁺ with dsp² hybridisation; N–Ni–N angles close to 90°"] },
          { cells: ["H atoms in \\(\\mathrm{[Ni(dmgH)_2]}\\)", "14", "Two ligands of \\(\\mathrm{C_4H_7N_2O_2^-}\\)"] },
          { cells: ["H atoms in hydrogen bonds", "2", "One O–H···O bridge on each side; the other 12 H are in methyl groups"] },
          { cells: ["Five-membered rings in \\(\\mathrm{[Ni(dmgH)_2]}\\)", "2", "One chelate ring per dmgH⁻; the other two rings are six-membered"] },
          { cells: ["Charge of the ligand as bound", "−1 (dmgH⁻)", "One oxime proton is lost; dmgH₂ itself is neutral"] },
          { cells: ["Waters bonded to Cu in \\(\\mathrm{CuSO_4\\cdot 5H_2O}\\)", "4", "Secondary valency 4 in the textbook formula \\(\\mathrm{[Cu(H_2O)_4]SO_4\\cdot H_2O}\\)"] },
          { cells: ["Hydrogen-bonded water in \\(\\mathrm{CuSO_4\\cdot 5H_2O}\\)", "1", "Held between sulphate and coordinated water, not bonded to Cu"] },
        ],
        caption: "Nickel dimethylglyoximate and blue vitriol are asked as facts, so the numbers in this table are worth memorising.",
      },
      selfCheckExample: {
        prompt: "How many nitrogen atoms are bonded to nickel in \\(\\mathrm{[Ni(dmgH)_2]}\\), and how many carbon atoms does the complex contain?",
        steps: [
          "Each dmgH⁻ binds through its two oxime nitrogens, and there are two ligands: 4 N on nickel.",
          "Each ligand, \\(\\mathrm{C_4H_7N_2O_2^-}\\), has 4 C, so the complex has 8 C.",
        ],
        answer: "4 N atoms bonded to Ni; 8 C atoms.",
      },
      practiceSet: [
        { prompt: "What colour is the nickel–dimethylglyoxime precipitate?", answer: "Red" },
        { prompt: "Is \\(\\mathrm{[Ni(dmgH)_2]}\\) paramagnetic?", answer: "No; it is diamagnetic" },
        { prompt: "How many water molecules are bonded to copper in \\(\\mathrm{CuSO_4\\cdot 5H_2O}\\) in the textbook formula?", answer: "4" },
        { prompt: "Is dimethylglyoxime bound to nickel as a neutral ligand?", answer: "No; it binds as the anion dmgH⁻" },
      ],
      pyqExampleId: "5d73dec0-25d2-4ebb-a7fb-a5193d6351cb", // 2025 — H atoms in the Ni–dmg complex
      traps: [
        {
          title: "dmgH⁻ is an anion when it binds",
          body: "Dimethylglyoxime loses one proton before it binds nickel, so the ligand is dmgH⁻ and the complex is neutral. Calling it a neutral bidentate ligand is the error in a common statement question.",
        },
        {
          title: "Blue vitriol has a longer story than four waters",
          body: "JEE keys follow the textbook formula \\(\\mathrm{[Cu(H_2O)_4]SO_4\\cdot H_2O}\\): four waters on copper, secondary valency 4. In the real crystal two sulphate oxygens also sit on copper at longer distances, so copper is six-coordinate. Answer with 4 unless the question describes the crystal.",
        },
      ],
    },

    // C3 — naming, oxidation state and d count
    {
      kind: "formula" as const,
      slug: "jccoord-naming",
      name: "IUPAC names, oxidation state and d-electron count of complexes",
      intuition:
        "A name is built in a fixed order: the cation first, then the anion; inside the complex, ligands in alphabetical order, then the metal with its oxidation state in Roman numerals. The same oxidation state then gives the d-electron count, which the rest of the chapter depends on.",
      definition:
        "- Ligands are listed alphabetically, ignoring the multiplying prefixes: di-, tri-, tetra- for simple ligands; bis-, tris-, tetrakis- for ligands whose names already contain a number or are in brackets, such as bis(ethane-1,2-diamine) and bis(trimethylphosphine).\n" +
        "- Anionic ligands end in -ido: chlorido, bromido, cyanido, oxido, hydroxido. Neutral ligands keep special names: aqua, ammine, carbonyl, nitrosyl.\n" +
        "- An anionic complex ends in -ate: cobaltate, manganate, platinate, and ferrate for iron, cuprate for copper, argentate for silver.\n" +
        "- The number of counter-ions is not stated: \\(\\mathrm{K_3[Fe(CN)_6]}\\) is potassium hexacyanidoferrate(III), not tripotassium.\n" +
        "- d-electron count = (group number of the metal) − (oxidation state). In the nitroprusside ion NO is counted as NO⁺.",
      formula: {
        label: "Oxidation state and d count",
        latex: "x + \\sum q_{\\text{ligands}} = q_{\\text{complex}} \\qquad n_d = \\text{group number} - x",
      },
      authoredExample: {
        prompt: "Name \\(\\mathrm{K_3[Fe(CN)_6]}\\) and give the d-electron count of iron.",
        steps: [
          "The complex ion is \\(\\mathrm{[Fe(CN)_6]^{3-}}\\): \\(x + 6(-1) = -3\\), so iron is +3.",
          "Six cyanide ligands: hexacyanido. The complex is an anion, so iron becomes ferrate.",
          "Name: potassium hexacyanidoferrate(III).",
          "Iron is in group 8, so the d count is \\(8 - 3 = 5\\).",
        ],
        answer: "Potassium hexacyanidoferrate(III); iron is d⁵.",
      },
      selfCheckExample: {
        prompt: "Name \\(\\mathrm{[Co(NH_3)_4Cl_2]Cl}\\) and give the d-electron count of cobalt.",
        steps: [
          "\\(x + 4(0) + 2(-1) = +1\\), so cobalt is +3.",
          "Ligands in alphabetical order: ammine before chlorido. The complex is a cation, so the metal keeps its name.",
          "Cobalt is in group 9, so the d count is \\(9 - 3 = 6\\).",
        ],
        answer: "Tetraamminedichloridocobalt(III) chloride; cobalt is d⁶.",
      },
      practiceSet: [
        { prompt: "Give the IUPAC name of \\(\\mathrm{[Pt(NH_3)_2Cl_2]}\\).", answer: "Diamminedichloridoplatinum(II)" },
        { prompt: "What is the oxidation state of each silver in \\(\\mathrm{[Ag(NH_3)_2][Ag(CN)_2]}\\)?", answer: "+1 in both" },
        { prompt: "What is the d-electron count of iron in \\(\\mathrm{[FeO_4]^{2-}}\\)?", answer: "d² (iron is +6)" },
        { prompt: "Give the IUPAC name of \\(\\mathrm{K_4[Fe(CN)_6]}\\).", answer: "Potassium hexacyanidoferrate(II)" },
      ],
      pyqExampleId: "b2a379bd-6563-4f23-b0db-076d450e3926", // 2024 — IUPAC name of K2MnO4
      traps: [
        {
          title: "Oxido, not oxo; manganate, not permanganate",
          body: "Current IUPAC names call the oxide ligand oxido, and an anionic manganese complex is a manganate. Permanganate is the common name of \\(\\mathrm{MnO_4^-}\\) only, and the charge fixes the oxidation state: \\(\\mathrm{K_2MnO_4}\\) is manganese(VI).",
        },
        {
          title: "Bis and tris for ligands that already carry a number",
          body: "Two trimethylphosphine ligands are bis(trimethylphosphine), not di(trimethylphosphine). Both trioxalatocobaltate(III) and tris(oxalato)cobaltate(III) are accepted for \\(\\mathrm{[Co(C_2O_4)_3]^{3-}}\\); pick the one the options offer.",
        },
      ],
    },
  ],
};
