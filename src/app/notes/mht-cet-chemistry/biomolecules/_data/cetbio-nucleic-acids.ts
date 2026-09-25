import type { SubtopicNote } from "@/app/notes/_types";

export const NUCLEIC_ACIDS_NOTE: SubtopicNote = {
  subtopicName: "Nucleic Acids, DNA, RNA, Nucleotides and Bases",
  title: "Nucleic Acids: Nucleotides, Bases and the Double Helix",
  oneLineDefinition:
    "A nucleotide is a pentose sugar (ribose in RNA, 2-deoxyribose in DNA) carrying a nitrogen base at C-1 prime and a phosphate at C-5 prime; the bases are purines (adenine, guanine — nitrogens at 1, 3, 7, 9, joined through N-9) and pyrimidines (cytosine, thymine, uracil — nitrogens at 1 and 3, joined through N-1), and nucleotides link by 3 prime to 5 prime phosphodiester bonds into strands that pair A with T and G with C in the right-handed Watson–Crick double helix.",
  whyItMatters:
    "16 PYQs, none HARD. Fourteen are the nucleotide and its bases — which base is a purine, which has the most nitrogens or none of the amino group, the atom counts of cytosine, thymine and uracil, the ring positions of N in purine and pyrimidine, which N bonds the sugar, which sugar carbon lacks oxygen in DNA, how many OH a ribonucleoside has, where the phosphate sits in AMP; two are the Watson–Crick model and the phosphodiester backbone. " +
    "Two cards.",
  concepts: [
    // 1 — nucleotides and bases
    {
      kind: "formula" as const,
      slug: "cetbio-nucleotides-and-bases",
      name: "Nucleotide Anatomy: Sugar, Base and Phosphate by Position",
      intuition:
        "Draw the sugar as a five-membered furanose with its carbons primed, 1 prime to 5 prime. The base goes on C-1 prime; the phosphate on the C-5 prime CH₂OH; C-2 prime has OH in ribose and only H in 2-deoxyribose. Purines are the two-ring bases (adenine, guanine), pyrimidines the one-ring bases (cytosine, thymine in DNA, uracil in RNA). Count nitrogens from the ring positions plus any NH₂: the purine ring has N at 1, 3, 7, 9 — four — so adenine and guanine have five N each; the pyrimidine ring has N at 1 and 3, so cytosine (with NH₂) has three, thymine and uracil two.",
      definition:
        "- **Sugar**: RNA = D-ribose (**5 C**; OH at 2′, 3′, 5′), DNA = 2-deoxyribose (**C-2′ lacks the OH**). A ribonucleoside has **3 OH** (2′, 3′, 5′); a deoxyribonucleoside 2.\n" +
        "- **Nucleoside** = sugar + base (N-glycosidic bond at **C-1′**): **purine N-9**, **pyrimidine N-1**. **Nucleotide** = nucleoside + phosphate at **C-5′** (AMP = adenosine 5′-monophosphate).\n" +
        "- **Purines** (two rings, N at **1, 3, 7, 9**): adenine \\(\\text{C}_5\\text{H}_5\\text{N}_5\\), guanine \\(\\text{C}_5\\text{H}_5\\text{N}_5\\text{O}\\) — five N each, guanine has the most N of the four common bases.\n" +
        "- **Pyrimidines** (one ring, N at **1 and 3**): cytosine \\(\\text{C}_4\\text{H}_5\\text{N}_3\\text{O}\\) (3 N, 1 O); thymine \\(\\text{C}_5\\text{H}_6\\text{N}_2\\text{O}_2\\) (2 N, 2 O); uracil \\(\\text{C}_4\\text{H}_4\\text{N}_2\\text{O}_2\\) (2 N, 2 O).\n" +
        "- **Amino group on the ring**: adenine, guanine, cytosine have –NH₂; **thymine and uracil do not** (two C=O instead; thymine adds a CH₃).\n" +
        "- DNA bases A, G, C, T; RNA bases A, G, C, U.",
      formula: {
        label: "Ring nitrogens and the glycosidic N",
        latex:
          "\\text{purine: N-1, 3, 7, 9 (sugar at N-9)};\\quad \\text{pyrimidine: N-1, 3 (sugar at N-1)};\\quad \\text{phosphate at C-5}'",
      },
      authoredExample: {
        prompt: "How many moles of N atoms and of O atoms are in one mole of guanine, and how many OH groups does deoxyguanosine carry?",
        steps: [
          "Guanine \\(\\text{C}_5\\text{H}_5\\text{N}_5\\text{O}\\): 5 N, 1 O.",
          "Deoxyguanosine = guanine + 2-deoxyribose (no phosphate): OH at 3′ and 5′ only — 2.",
        ],
        answer: "5 N and 1 O; 2 OH",
      },
      selfCheckExample: {
        prompt: "Which nitrogen of a purine bonds to C-1′ of ribose in a ribonucleoside: 1, 3, 7 or 9?",
        steps: [
          "Purines attach through the five-membered ring's N-9 (pyrimidines through N-1).",
        ],
        answer: "N-9",
      },
      practiceSet: [
        { prompt: "Positions of N in the purine ring?", answer: "1, 3, 7 and 9" },
        { prompt: "Which DNA-sugar carbon lacks the OH oxygen?", answer: "C-2′" },
        { prompt: "Moles of N and O per mole of thymine?", answer: "2 and 2" },
        { prompt: "Base with no –NH₂ on the ring: adenine, guanine, thymine, cytosine?", answer: "Thymine" },
      ],
      pyqExampleId: "460cc8c5-2e15-4758-8c41-927c730dcdb7",
      traps: [
        {
          title: "Purine N at 1, 3, 5",
          body:
            "There is no N-5 in a purine — the six-membered ring's nitrogens are 1 and 3, the five-membered ring's 7 and 9. Position 5 is the shared carbon.",
        },
      ],
    },

    // 2 — the double helix
    {
      kind: "formula" as const,
      slug: "cetbio-dna-double-helix-and-backbone",
      name: "The Phosphodiester Backbone and the Watson–Crick Double Helix",
      intuition:
        "Nucleotides join when the phosphate on C-5 prime of one esterifies the OH on C-3 prime of the next: a 3 prime to 5 prime phosphodiester link, so every strand has a free phosphate at its 5 prime end and a free OH at its 3 prime end, and the backbone is sugar–phosphate–sugar (C–O–P–O–C), not C–O–C. Two such strands wind into a right-handed double helix with the backbone OUTSIDE and the bases INSIDE, held by hydrogen bonds between complementary pairs: A with T by two bonds, G with C by three. RNA is one strand with U in place of T.",
      definition:
        "- **Backbone**: sugar–phosphate, linked by **phosphodiester** bonds (**C–O–P–O–C**, not C–O–C). **5′ end = free phosphate; 3′ end = free OH**.\n" +
        "- **Watson–Crick**: two antiparallel polynucleotide strands, **right-handed** double helix; **backbone outside, bases inside**; stabilised by **hydrogen bonds** between **complementary** pairs **A=T** (2 H-bonds) and **G≡C** (3 H-bonds).\n" +
        "- Consequences: equal A and T, equal G and C (Chargaff); one strand fixes the other's sequence — the basis of replication.\n" +
        "- **RNA**: single strand, ribose, uracil for thymine; messenger, ribosomal, transfer RNA.\n" +
        "- The false statement to expect: 'backbone inside, bases outside' or 'backbone of –C–O–C– linkage'.",
      formula: {
        label: "Base pairing",
        latex:
          "\\text{A}=\\text{T}\\ (2\\ \\text{H-bonds}),\\quad \\text{G}\\equiv\\text{C}\\ (3\\ \\text{H-bonds});\\quad 5'\\text{-phosphate} \\cdots 3'\\text{-OH}",
      },
      authoredExample: {
        prompt: "A DNA sample is 22% adenine. Give the percentage of each of the other three bases.",
        steps: [
          "A pairs with T: T = 22%. The remainder, 56%, is G + C in equal amounts: 28% each.",
        ],
        answer: "T 22%, G 28%, C 28%",
      },
      selfCheckExample: {
        prompt: "Which is NOT a feature of the Watson–Crick model: right-handed double helix; sugar–phosphate backbone inside and bases outside; hydrogen bonding between strands; A=T and G≡C pairs?",
        steps: [
          "The backbone faces the water; the bases stack inside.",
        ],
        answer: "Backbone inside, bases outside",
      },
      practiceSet: [
        { prompt: "What is at the 5′ end of a polynucleotide?", answer: "A free phosphate" },
        { prompt: "Linkage between neighbouring nucleotides?", answer: "Phosphodiester (C–O–P–O–C)" },
        { prompt: "Handedness of the DNA double helix?", answer: "Right-handed" },
        { prompt: "How many hydrogen bonds between G and C?", answer: "Three" },
      ],
      pyqExampleId: "e5d015e1-5cf6-456a-bde8-5b4f8706f5ce",
      traps: [
        {
          title: "–C–O–C– as the backbone",
          body:
            "An ether link is what a glycosidic bond is; the nucleic-acid backbone runs through PHOSPHORUS — sugar 3′-O–P–O-5′ sugar. The statement 'backbone formed of –C–O–C– linkage' is the false one.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Carbohydrates — ribose, the aldopentose",
      href: "/notes/mht-cet-chemistry/biomolecules/cetbio-carbohydrates",
    },
    {
      label: "Amino Acids and Proteins — the polymer DNA encodes",
      href: "/notes/mht-cet-chemistry/biomolecules/cetbio-amino-acids-and-proteins",
    },
  ],
};
