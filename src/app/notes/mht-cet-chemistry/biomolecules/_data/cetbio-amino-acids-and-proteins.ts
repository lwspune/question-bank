import type { SubtopicNote } from "@/app/notes/_types";

export const AMINO_ACIDS_AND_PROTEINS_NOTE: SubtopicNote = {
  subtopicName: "Amino Acids, Peptides and Proteins",
  title: "Amino Acids, Peptides and Proteins",
  oneLineDefinition:
    "Alpha-amino acids carry an amino group and a carboxyl group on the same carbon and differ in the side chain R, which sets the class (acidic, basic, neutral) and the three- and one-letter code; they join through peptide (amide) bonds — n residues, n minus 1 bonds — into fibrous or globular proteins whose alpha-helix has 3.6 residues per turn.",
  whyItMatters:
    "27 PYQs, none HARD. Seventeen are the amino acids themselves — pick the acidic, basic, neutral or essential one from three-letter codes (asked nine times), the one-letter symbol, the side chain of serine or alanine, sulphur in methionine, the heterocyclic ring of histidine, the achiral glycine, the zwitterion; ten are peptides and proteins — how many bonds link n amino acids, glycylalanine, myosin as the fibrous one among globular proteins (asked six times), 3.6 residues per turn, pepsin. " +
    "Two cards.",
  concepts: [
    // 1 — the twenty amino acids
    {
      kind: "reference" as const,
      slug: "cetbio-amino-acid-classes-and-codes",
      name: "The Amino Acids by Side Chain: Class, Code and the Essential Ones",
      intuition:
        "Every alpha-amino acid is \\(\\text{H}_2\\text{N-CH(R)-COOH}\\); only R changes. If R carries a second COOH the acid is ACIDIC (aspartic, glutamic); if R carries a second basic nitrogen it is BASIC (lysine, arginine, histidine); everything else is neutral. Glycine has R = H, so its alpha-carbon has two hydrogens and is the one achiral amino acid. Ten cannot be made in the body and must be eaten — the essential ones. In water the acid exists as a zwitterion: the NH₂ takes the COOH's proton.",
      definition:
        "- **Acidic**: aspartic acid (Asp, **D**, R = –CH₂COOH), glutamic acid (Glu, E). Their amides asparagine (Asn) and glutamine (Gln) are NEUTRAL.\n" +
        "- **Basic**: lysine (Lys, K), arginine (Arg, R), histidine (His, H — imidazole ring, a heterocycle). Proline is NOT basic (its N is in a ring, an imino acid).\n" +
        "- **Neutral**: glycine (Gly, R = H, achiral), alanine (Ala, R = –CH₃), valine (Val, isopropyl), leucine (Leu, isobutyl), serine (Ser, –CH₂OH), threonine (Thr, –CH(OH)CH₃), cysteine (Cys, –CH₂SH), methionine (Met, –CH₂CH₂SCH₃), phenylalanine, tyrosine, tryptophan (Trp, indole), proline.\n" +
        "- **Sulphur**: methionine and cysteine. **Heterocyclic ring in R**: histidine (imidazole), tryptophan (indole); proline's ring includes the alpha-N.\n" +
        "- **Essential** (not synthesised in the body): histidine, isoleucine, leucine, lysine, methionine, phenylalanine, threonine, tryptophan, valine (arginine is semi-essential). Tyrosine, serine, glycine, glutamine, proline, cysteine, glutamic acid are non-essential.\n" +
        "- **Zwitterion** of glycine: \\(\\text{H}_3\\text{N}^+\\text{-CH}_2\\text{-COO}^-\\) — both groups charged, the molecule neutral overall.",
      table: {
        columns: ["Amino acid", "3-letter / 1-letter", "Side chain R", "Class"],
        rows: [
          { cells: ["Glycine", "Gly / G", "–H", "Neutral, achiral"] },
          { cells: ["Alanine", "Ala / A", "–CH₃", "Neutral"] },
          { cells: ["Serine", "Ser / S", "–CH₂OH", "Neutral"] },
          { cells: ["Threonine", "Thr / T", "–CH(OH)CH₃", "Neutral, essential"] },
          { cells: ["Methionine", "Met / M", "–CH₂CH₂SCH₃", "Neutral, essential, has S"] },
          { cells: ["Leucine / Valine", "Leu / L · Val / V", "isobutyl · isopropyl", "Neutral, essential"] },
          { cells: ["Tryptophan", "Trp / W", "indolylmethyl", "Neutral, essential, heterocyclic"] },
          { cells: ["Aspartic acid", "Asp / D", "–CH₂COOH", "Acidic"], noteAmber: "D is aspartic acid; E is glutamic acid." },
          { cells: ["Glutamic acid", "Glu / E", "–CH₂CH₂COOH", "Acidic"] },
          { cells: ["Lysine", "Lys / K", "–(CH₂)₄NH₂", "Basic, essential"] },
          { cells: ["Arginine", "Arg / R", "guanidino", "Basic"] },
          { cells: ["Histidine", "His / H", "imidazolylmethyl", "Basic, essential, heterocyclic"], noteAmber: "The one that is basic, essential and heterocyclic at once — the favourite answer." },
        ],
        caption: "Class follows the side chain: a second COOH is acidic, a second basic N is basic, everything else neutral.",
      },
      selfCheckExample: {
        prompt: "From Arg, Asp, Leu, His pick the neutral amino acid; from Arg, Lys, Met, Asp pick the acidic one.",
        steps: [
          "Arg and His are basic, Asp acidic — Leu is neutral. Arg and Lys basic, Met neutral — Asp is acidic.",
        ],
        answer: "Leu; Asp",
      },
      practiceSet: [
        { prompt: "One-letter symbol of aspartic acid?", answer: "D" },
        { prompt: "Which has no chiral carbon: histidine, glutamic acid, serine, glycine?", answer: "Glycine" },
        { prompt: "Amino acid with S in its side chain: methionine, lysine, glutamic acid, glycine?", answer: "Methionine" },
        { prompt: "NOT basic: proline, lysine, arginine, histidine?", answer: "Proline" },
      ],
      pyqExampleId: "8c4ec622-8f28-48cf-820d-d6861291b3dc",
      traps: [
        {
          title: "Gln and Asn read as acidic",
          body:
            "Glutamine and asparagine are the AMIDES of the acidic pair — neutral. Only Glu and Asp, the free side-chain acids, are acidic; the three-letter codes differ by one letter.",
        },
      ],
    },

    // 2 — peptides and proteins
    {
      kind: "formula" as const,
      slug: "cetbio-peptides-and-protein-structure",
      name: "Peptide Bonds, Protein Shape and Structure Levels",
      intuition:
        "A peptide bond is the amide –CO–NH– between the COOH of one amino acid and the NH₂ of the next, with loss of water; a chain of n residues has n − 1 of them, and the residues are named from the N-terminal end (glycylalanine = Gly then Ala). Proteins are FIBROUS (long threads: keratin, myosin, collagen, fibroin) or GLOBULAR (folded balls, water-soluble: insulin, albumins, legumelin, haemoglobin, enzymes). Structure has four levels; the secondary alpha-helix turns every 3.6 residues, held by N–H···O=C hydrogen bonds.",
      definition:
        "- **Peptide bond**: \\(\\text{-CO-NH-}\\); dipeptide = 2 residues, 1 bond (glycylalanine, Gly-Ala); **n residues ⇒ n − 1 bonds**, so (n − 1) bonds link **n** amino acids.\n" +
        "- **Fibrous**: keratin (hair, nails), **myosin** (muscle), collagen, fibroin (silk). **Globular**: insulin, egg albumin, serum albumin, legumelin, haemoglobin, myoglobin, enzymes.\n" +
        "- **Structure levels**: primary = sequence; secondary = **alpha-helix (3.6 residues per turn)** or beta-pleated sheet, by hydrogen bonds; tertiary = overall fold (disulphide, ionic, H-bonds, hydrophobic); quaternary = several chains (haemoglobin).\n" +
        "- **Denaturation**: heat or pH unfolds secondary/tertiary structure (boiled egg, curdled milk); the primary structure survives.\n" +
        "- Proteases: **pepsin** (stomach) and trypsin (intestine) hydrolyse proteins to alpha-amino acids. 3-Aminobutanoic acid, \\(\\text{CH}_3\\text{CH(NH}_2)\\text{CH}_2\\text{COOH}\\), is an amino acid too — a beta one; COOH stays the principal group in the name.",
      formula: {
        label: "Peptide-bond count",
        latex:
          "n\\ \\text{amino acids} \\to (n-1)\\ \\text{peptide bonds};\\qquad \\alpha\\text{-helix: } 3.6\\ \\text{residues per turn}",
      },
      authoredExample: {
        prompt: "A polypeptide has 51 residues. How many peptide bonds does it contain, and how many complete alpha-helical turns could 18 of those residues make?",
        steps: [
          "Bonds = 51 − 1 = 50. Turns = 18 / 3.6 = 5.",
        ],
        answer: "50 peptide bonds; 5 turns",
      },
      selfCheckExample: {
        prompt: "Which is NOT a globular protein: legumelin, egg albumin, myosin, insulin?",
        steps: [
          "Myosin is the muscle fibre protein — fibrous.",
        ],
        answer: "Myosin",
      },
      practiceSet: [
        { prompt: "Amino acids per turn of an alpha-helix?", answer: "3.6" },
        { prompt: "Glycylalanine is what kind of peptide?", answer: "A dipeptide" },
        { prompt: "How many amino acids are linked by (n − 1) amide bonds?", answer: "n" },
        { prompt: "Enzyme that breaks proteins to alpha-amino acids in the stomach?", answer: "Pepsin" },
      ],
      pyqExampleId: "73a8b920-f60d-450a-82b0-aa5b39364323",
      traps: [
        {
          title: "Insulin as fibrous",
          body:
            "Insulin, albumins and legumelin are globular. In every 'NOT globular' or 'identify fibrous' question the answer has been myosin.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Amines — basicity of the amino group",
      href: "/notes/mht-cet-chemistry/amines/cetam-reactions-and-basicity",
    },
    {
      label: "Nucleic Acids — the other biopolymer",
      href: "/notes/mht-cet-chemistry/biomolecules/cetbio-nucleic-acids",
    },
  ],
};
