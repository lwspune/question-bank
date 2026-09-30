import type { SubtopicNote } from "@/app/notes/_types";

export const PROTEINS_BIO_NOTE: SubtopicNote = {
  subtopicName: "Peptides and Protein Structure",
  title: "Peptides and Protein Structure",
  oneLineDefinition:
    "Amino acids join by peptide (amide) bonds into chains read from the free NH₂ end to the free COOH end; a chain of n residues has n − 1 peptide bonds, and a protein's shape is built in four levels, of which denaturation destroys all but the primary sequence.",
  whyItMatters:
    "Thirty PYQs, twenty-one multiple choice and nine asking for a number, four from 2026. Twelve are counts: peptide bonds, possible sequences, a minimum molar mass, sp² carbons, or how many compounds give the biuret test. Four read a drawn peptide or build a dipeptide from its parts. Fourteen are on the levels of protein structure, the forces that hold them, fibrous against globular proteins, and what denaturation destroys.",
  concepts: [
    // C1 — counting
    {
      kind: "formula" as const,
      slug: "jcbio-peptide-counting",
      name: "Counting peptide bonds and peptide sequences",
      intuition:
        "A peptide bond forms each time the COOH of one amino acid condenses with the NH₂ of the next and water is lost. A straight chain of n residues therefore has n − 1 such bonds. A chain has a direction, from its free NH₂ end to its free COOH end, so Gly-Ala and Ala-Gly are different peptides; counting sequences is counting ordered arrangements.",
      definition:
        "- **Peptide bond**: the amide link \\(\\mathrm{-CO{-}NH-}\\). Dipeptide = 2 residues, tripeptide = 3; oligopeptides have up to ten residues and polypeptides more. NCERT calls a polypeptide with more than a hundred residues and a mass above 10 000 u a protein.\n" +
        "- A linear chain of \\(n\\) residues has \\(n-1\\) peptide bonds, so residues minus bonds is always 1.\n" +
        "- A name such as alanylglycylvaline lists one residue per part: count the \"-yl\" parts and add the last one.\n" +
        "- Hydrolysis products in mole ratio give the residue count: 2 mol X and 1 mol Y per mol of peptide means 3 residues.\n" +
        "- **Sequences**: \\(n\\) different amino acids, each used once, give \\(n!\\) sequences. With \\(k\\) kinds of amino acid and repetition allowed, \\(k^n\\) chains of \\(n\\) residues. Read the stem to see which applies; the JEE keys count repeats such as Val-Val-Val when the stem does not forbid them.\n" +
        "- **Minimum molar mass**: if the protein contains at least one residue of an amino acid that makes up \\(p\\)% of its mass, \\(M_{\\min} = M \\times 100/p\\), where the JEE keys take \\(M\\) as the amino acid's own molar mass.\n" +
        "- **Biuret test**: a violet colour needs at least two peptide bonds, so tripeptides and proteins give it, a dipeptide does not, and biuret itself does.\n" +
        "- **sp² carbons**: each peptide C=O, each COOH carbon and each carbon of an aromatic ring.",
      formula: {
        label: "Peptide bonds, sequences and minimum molar mass",
        latex:
          "n_{\\text{peptide bonds}} = n - 1 \\qquad N_{\\text{no repeats}} = n! \\qquad N_{\\text{repeats allowed}} = k^{\\,n} \\qquad M_{\\min} = \\frac{M \\times 100}{p}",
      },
      authoredExample: {
        prompt:
          "A pentapeptide contains five different amino acids, each once. How many sequences are possible, how many peptide bonds does it have, and what is residues minus peptide bonds?",
        steps: [
          "The five residues are all different, so every ordering is a different peptide: \\(5! = 120\\) sequences.",
          "A straight chain of 5 residues has \\(5 - 1 = 4\\) peptide bonds.",
          "Residues minus bonds \\(= 5 - 4 = 1\\).",
        ],
        answer: "120 sequences; 4 peptide bonds; the difference is 1.",
      },
      selfCheckExample: {
        prompt:
          "Three amino acids X, Y and Z are available and any of them may be used more than once. How many dipeptides can be written? And a protein is 0.51% tryptophan by mass (molar mass 204 g mol\\(^{-1}\\)); what is its minimum molar mass?",
        steps: [
          "Each of the 2 positions can hold any of the 3 amino acids: \\(3^2 = 9\\) dipeptides.",
          "At least one tryptophan per molecule: \\(M_{\\min} = 204 \\times 100/0.51 = 40\\,000\\) g mol\\(^{-1}\\).",
        ],
        answer: "9 dipeptides; 40 000 g mol\\(^{-1}\\).",
      },
      practiceSet: [
        { prompt: "How many peptide bonds does a hexapeptide have?", answer: "5" },
        { prompt: "Does glycylalanine give a positive biuret test?", answer: "No; it has only one peptide bond" },
        { prompt: "How many dipeptides can five amino acids form if repeats are allowed?", answer: "\\(5^2 = 25\\)" },
        { prompt: "How many residues does alanylglycylleucine contain?", answer: "3" },
      ],
      pyqExampleId: "289ed9cc-afbf-4606-94ac-7f646fe8c0cf", // 2025 — four distinct residues: 4! sequences
      traps: [
        {
          title: "A chain has a direction",
          body: "Gly-Ala has glycine at the free NH₂ end and Ala-Gly has alanine there; they are different compounds. Count ordered arrangements (n!), not unordered choices.",
        },
        {
          title: "n residues make n − 1 bonds",
          body: "Seven residues are held by six peptide bonds, not seven. The last residue's COOH stays free.",
        },
        {
          title: "The biuret test needs two peptide bonds",
          body: "Glycine has none and glycylalanine has one, so neither gives the violet colour. A tripeptide and biuret itself do.",
        },
      ],
    },

    // C2 — reading and writing sequences
    {
      kind: "formula" as const,
      slug: "jcbio-peptide-sequences",
      name: "Reading and writing peptide sequences",
      intuition:
        "A peptide is written from the residue with the free NH₂ (the N-terminal) to the one with the free COOH (the C-terminal). To read a drawn peptide, start at the free NH₂, walk along the chain from one α-carbon to the next, and name each residue by its side chain. To make a chosen dipeptide, the COOH end of the first residue must meet the NH₂ of the second.",
      definition:
        "- Sequence order is N-terminal → C-terminal. In a name every residue but the last ends in \"-yl\": serylalanine is Ser-Ala, with serine at the free NH₂ end.\n" +
        "- Side chains to recognise in a drawing: \\(\\mathrm{-H}\\) glycine, \\(\\mathrm{-CH_3}\\) alanine, \\(\\mathrm{-CH_2OH}\\) serine, \\(\\mathrm{-CH(OH)CH_3}\\) threonine, \\(\\mathrm{-CH_2COOH}\\) aspartic acid, \\(\\mathrm{-CH_2CH(CH_3)_2}\\) leucine, \\(\\mathrm{-CH_2C_6H_5}\\) phenylalanine, \\(\\mathrm{-CH_2C_6H_4OH}\\) tyrosine.\n" +
        "- **Building a dipeptide**: the acid chloride of the N-terminal amino acid reacts with the free \\(\\mathrm{NH_2}\\) of the C-terminal one, losing HCl. \\(\\mathrm{H_2N{-}CH_2{-}COCl}\\) with \\(\\mathrm{H_2N{-}CH(CH_3){-}COOH}\\) gives Gly-Ala.\n" +
        "- Two reactions used to identify the residues come from other chapters, not NCERT Biomolecules: nitrous acid turns an α-amino acid into the α-hydroxy acid with loss of \\(\\mathrm{N_2}\\) (alanine gives lactic acid), and glycine on heating loses water to give a cyclic dimer, 2,5-diketopiperazine.",
      formula: {
        label: "A dipeptide, written N-terminal first",
        latex: "\\mathrm{H_2N{-}CH(R_1){-}CO{-}NH{-}CH(R_2){-}COOH} = \\text{residue 1-residue 2}",
      },
      authoredExample: {
        prompt: "Write the condensed formula of the dipeptide Ser-Ala, give its name, and say which residue carries the free \\(\\mathrm{NH_2}\\).",
        steps: [
          "Ser-Ala means serine is written first, so serine is the N-terminal residue.",
          "Serine's COOH forms the peptide bond with alanine's \\(\\mathrm{NH_2}\\): \\(\\mathrm{H_2N{-}CH(CH_2OH){-}CO{-}NH{-}CH(CH_3){-}COOH}\\).",
          "Name: seryl for the first residue, then alanine.",
        ],
        answer: "\\(\\mathrm{H_2N{-}CH(CH_2OH){-}CO{-}NH{-}CH(CH_3){-}COOH}\\), serylalanine; serine carries the free \\(\\mathrm{NH_2}\\).",
      },
      selfCheckExample: {
        prompt:
          "A tripeptide, read from its free \\(\\mathrm{NH_2}\\) end, carries the side chains \\(\\mathrm{-CH_3}\\), \\(\\mathrm{-H}\\) and \\(\\mathrm{-CH_2OH}\\) in that order. Write it in one-letter code and name it.",
        steps: [
          "\\(\\mathrm{-CH_3}\\) is alanine (A), \\(\\mathrm{-H}\\) is glycine (G), \\(\\mathrm{-CH_2OH}\\) is serine (S).",
          "Keep the order from the N-terminal end: A, G, S.",
        ],
        answer: "AGS, alanylglycylserine.",
      },
      practiceSet: [
        { prompt: "Which residue has the free \\(\\mathrm{NH_2}\\) group in Gly-Val?", answer: "Glycine" },
        { prompt: "What does nitrous acid turn alanine into?", answer: "Lactic acid, \\(\\mathrm{CH_3CH(OH)COOH}\\)" },
        { prompt: "Write alanylvalylglycine in one-letter code.", answer: "AVG" },
        { prompt: "Which acid chloride and amino acid give Ala-Gly with loss of HCl?", answer: "\\(\\mathrm{H_2N{-}CH(CH_3){-}COCl}\\) and glycine" },
      ],
      pyqExampleId: "8d3c7161-380f-460c-a939-7cc2da0e2f86", // 2023 — read a drawn tetrapeptide as FLDY
      traps: [
        {
          title: "Read from the free NH₂ end",
          body: "A drawn peptide read from the COOH end gives the sequence backwards: FLDY would come out as YDLF. Find the free NH₂ first.",
        },
        {
          title: "The acid chloride belongs to the first residue",
          body: "To make Gly-Ala, glycine supplies the COCl and alanine the free NH₂. The reverse pairing, glycine's COOH with alanine's COCl, gives Ala-Gly.",
        },
      ],
    },

    // C3 — levels of structure and denaturation
    {
      kind: "reference" as const,
      slug: "jcbio-protein-structure",
      name: "Levels of protein structure and denaturation",
      intuition:
        "The primary structure is the sequence, held by covalent peptide bonds. Everything above it, the helix or sheet, the overall fold and the packing of several chains, is held by weaker forces, mainly hydrogen bonds. Heat or a change in pH breaks those weak forces but not the peptide bonds. So the protein unfolds and loses its biological activity, while its sequence survives.",
      definition:
        "- **Fibrous proteins**: chains run parallel, held by hydrogen and disulphide bonds; insoluble in water. Keratin (hair, wool, silk), myosin (muscles), collagen.\n" +
        "- **Globular proteins**: chains coil into a sphere; soluble in water. Insulin, albumins.\n" +
        "- **Denaturation** (NCERT): a physical change such as heat or a chemical change such as pH disturbs the hydrogen bonds; globules unfold and helices uncoil, and the protein loses its biological activity. The secondary and tertiary structures are destroyed; the **primary structure remains intact**.\n" +
        "- Examples: coagulation of egg white on boiling; curdling of milk by the lactic acid that bacteria make in it.\n" +
        "- A peroxide link (\\(\\mathrm{-O{-}O-}\\)) plays no part in protein structure.",
      table: {
        columns: ["Level", "What it describes", "Held by", "After denaturation"],
        rows: [
          { cells: ["Primary", "The sequence of amino acids in each chain", "Peptide (covalent amide) bonds", "Intact"] },
          { cells: ["Secondary, α-helix", "The chain coiled into a right-handed spiral", "Hydrogen bonds between the C=O and N–H of peptide bonds on neighbouring turns", "Lost; the helix uncoils"] },
          { cells: ["Secondary, β-pleated sheet", "Chains stretched out and laid side by side", "Hydrogen bonds between the C=O and N–H of neighbouring chains", "Lost"] },
          { cells: ["Tertiary", "The overall folding of the chain, which gives the fibrous or globular shape", "Hydrogen bonds, disulphide links, van der Waals and electrostatic forces", "Lost; globules unfold"] },
          { cells: ["Quaternary", "The spatial arrangement of two or more polypeptide subunits", "The same weak forces acting between the subunits", "Lost"] },
        ],
        caption: "Only the primary structure is held by covalent peptide bonds, and only it survives denaturation.",
      },
      selfCheckExample: {
        prompt: "Milk curdles when bacteria make lactic acid in it. Which levels of structure of the milk proteins are destroyed, and which survives?",
        steps: [
          "The acid changes the pH, which disturbs the hydrogen bonds: this is denaturation.",
          "Denaturation destroys the secondary and tertiary structures (and the quaternary, where there is one).",
          "Peptide bonds are not broken, so the sequence stays.",
        ],
        answer: "Secondary and tertiary (and quaternary) are destroyed; the primary structure survives.",
      },
      practiceSet: [
        { prompt: "Which interaction holds the α-helix together?", answer: "Hydrogen bonding" },
        { prompt: "Is albumin fibrous or globular?", answer: "Globular, and soluble in water" },
        { prompt: "Which structure of egg-white protein survives boiling?", answer: "The primary structure" },
        { prompt: "Name a fibrous protein found in hair.", answer: "Keratin" },
      ],
      pyqExampleId: "2c5e654b-4785-4a7d-9683-e0defef3532d", // 2026 — incorrect statement on tertiary structure: pH leaves it intact
      traps: [
        {
          title: "Quaternary structure is not the overall fold",
          body: "The overall folding of one chain is the tertiary structure. The quaternary structure is how separate subunits pack together.",
        },
        {
          title: "Denaturation keeps the peptide bonds",
          body: "Boiling an egg destroys the secondary and tertiary structures but breaks no peptide bond, so the primary structure stays. A statement that heating breaks the peptide linkages is false.",
        },
        {
          title: "Fibrous proteins are the insoluble ones",
          body: "Keratin, collagen and myosin are fibrous and insoluble; albumin and insulin are globular and soluble. Acids denature the soluble globular form, not a soluble fibrous one.",
        },
      ],
    },
  ],
};
