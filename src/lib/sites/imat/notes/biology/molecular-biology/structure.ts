import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_MOL_STRUCTURE_NOTE: SubtopicNote = {
  subtopicName: "DNA and RNA Structure",
  title: "Nucleotides, the Double Helix and Base Pairing",
  oneLineDefinition:
    "DNA and RNA are chains of nucleotides; in DNA two antiparallel chains are held together by A-T and G-C base pairs, which makes every count on one strand predict the other.",
  whyItMatters:
    "The papers ask Chargaff percentages (2011, 2013), counts of hydrogen and phosphodiester bonds (2013, 2017, 2018, 2023), a complementary strand (2024) and plain facts about the helix (2011, 2026). The 2023 paper also asked which base a DNA genome lacks and whether you can find the 5′ end from the letters alone.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-mol-nucleotides",
      name: "Nucleotides: the building blocks of DNA and RNA",
      intuition:
        "A nucleic acid is a long chain of the same kind of unit, the nucleotide. Every nucleotide has the same three parts; only the sugar and one of the bases differ between DNA and RNA. Learn the parts once and you can tell the two molecules apart from any list of components.",
      definition:
        "A **nucleotide** = a **phosphate** group + a **pentose** (five-carbon) sugar + a nitrogenous **base**.\n" +
        "- A **nucleoside** is the sugar and base without the phosphate.\n" +
        "- The base is attached to carbon 1′ of the sugar; the phosphate to carbon 5′.\n" +
        "- **Purines** (adenine, guanine) have two rings; **pyrimidines** (cytosine, thymine, uracil) have one.\n" +
        "- Nucleotides are joined by **phosphodiester bonds** (condensation reactions) between the phosphate on carbon 5′ of one sugar and carbon 3′ of the next. This makes the **sugar-phosphate backbone**.",
      table: {
        columns: ["Part", "In DNA", "In RNA"],
        rows: [
          { cells: ["Sugar", "deoxyribose (no -OH on carbon 2′)", "ribose (-OH on carbon 2′)"] },
          { cells: ["Purine bases (two rings)", "adenine, guanine", "adenine, guanine"] },
          { cells: ["Pyrimidine bases (one ring)", "cytosine, **thymine**", "cytosine, **uracil**"] },
          { cells: ["Phosphate", "one per nucleotide", "one per nucleotide"] },
          { cells: ["Number of strands", "usually two, as a double helix", "usually one, which can fold back on itself"] },
        ],
        caption: "Thymine is found only in DNA and uracil only in RNA. Everything else in the first four rows is shared.",
      },
      selfCheckExample: {
        prompt:
          "A nucleotide contains a base with a single ring and a sugar that carries an -OH group on carbon 2′. Which nucleotide could it be?",
        options: [
          "adenine with ribose",
          "uracil with ribose",
          "thymine with deoxyribose",
          "guanine with deoxyribose",
          "cytosine with deoxyribose",
        ],
        steps: [
          "An -OH on carbon 2′ means the sugar is ribose, so this is an RNA nucleotide. That rules out C, D and E.",
          "A single ring means a pyrimidine. Adenine is a purine with two rings, so A is out.",
          "Uracil is a pyrimidine found in RNA, so uracil with ribose fits both clues.",
        ],
        answer: "(B) uracil with ribose",
      },
      practiceSet: [
        { prompt: "Name the two purine bases.", answer: "Adenine and guanine", method: "Two rings each" },
        { prompt: "Which carbon of the sugar carries the phosphate in a nucleotide?", answer: "Carbon 5′" },
        { prompt: "What is the difference between a nucleoside and a nucleotide?", answer: "A nucleoside has no phosphate group" },
        { prompt: "Which base would you never find in the genome of a virus that stores its genes as DNA?", answer: "Uracil" },
      ],
      traps: [
        {
          title: "DNA has no uracil, but DNA bases can still pair with uracil",
          body: "Uracil is never part of DNA. But during transcription an adenine in the DNA template pairs with uracil in the new RNA. So 'DNA bases may form hydrogen bonds with uracil' is true, while 'DNA contains uracil' is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mol-double-helix",
      name: "The DNA double helix: backbone outside, paired bases inside",
      intuition:
        "Picture a twisted ladder. The two rails are sugar-phosphate backbones, and each rung is a pair of bases joined by hydrogen bonds. A purine always pairs with a pyrimidine, so every rung has the same length and the helix keeps the same width all along.",
      definition:
        "Double-stranded DNA is a **double helix** of two polynucleotide strands.\n" +
        "- **Complementary base pairing**: A pairs with T by **2 hydrogen bonds**; G pairs with C by **3 hydrogen bonds**.\n" +
        "- The strands are **antiparallel**: one runs 5′→3′, its partner 3′→5′.\n" +
        "- The **5′ end** of a strand has a free phosphate on carbon 5′; the **3′ end** has a free -OH on carbon 3′.\n" +
        "- The two strands are held together only by hydrogen bonds between bases. Phosphodiester bonds hold each strand together along its length.\n" +
        "- Watson and Crick built the model in 1953, using Rosalind Franklin's **X-ray crystallography** images and Chargaff's base ratios.",
      table: {
        columns: ["Feature", "Fact"],
        rows: [
          { cells: ["Outside of the helix", "the sugar-phosphate backbones, with negatively charged phosphates"] },
          { cells: ["Inside of the helix", "the bases, stacked on each other and paired across the strands"] },
          { cells: ["A-T pair", "2 hydrogen bonds"] },
          { cells: ["G-C pair", "3 hydrogen bonds, so G-C rich DNA is harder to separate"] },
          { cells: ["Direction of the strands", "antiparallel: 5′→3′ beside 3′→5′"] },
          { cells: ["Dimensions", "about 2 nm wide, 0.34 nm per base pair, about 10 base pairs per turn"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about double-stranded DNA is correct?",
        options: [
          "The bases are on the outside of the helix and the phosphates on the inside.",
          "Both strands run 5′→3′ in the same direction.",
          "A guanine and cytosine pair is held together by three hydrogen bonds.",
          "Purines pair with purines, which keeps the helix the same width.",
          "The two strands are joined to each other by phosphodiester bonds.",
        ],
        steps: [
          "G pairs with C through three hydrogen bonds, so C is correct.",
          "A reverses the structure: the backbone is outside. B ignores that the strands are antiparallel.",
          "D is wrong: a purine always pairs with a pyrimidine. E confuses the bonds: phosphodiester bonds run along each strand; the strands are joined by hydrogen bonds.",
        ],
        answer: "(C) A guanine and cytosine pair is held together by three hydrogen bonds.",
      },
      practiceSet: [
        { prompt: "How many hydrogen bonds join A to T?", answer: "2" },
        { prompt: "What does 'antiparallel' mean for the two strands of DNA?", answer: "They run in opposite directions: one 5′→3′, the other 3′→5′" },
        { prompt: "Which technique gave Rosalind Franklin her images of DNA?", answer: "X-ray crystallography (X-ray diffraction)" },
        { prompt: "Which part of DNA carries a negative charge?", answer: "The phosphate groups of the backbone" },
      ],
      traps: [
        {
          title: "Hydrogen bonds join the strands; phosphodiester bonds build each strand",
          body: "Options often swap the two bonds. The bases of opposite strands are held by hydrogen bonds, which are weak and easy to break for copying. Each strand's own nucleotides are linked by covalent phosphodiester bonds, which stay intact when the helix opens.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mol-complementary",
      name: "Writing the complementary strand and reading 5′ to 3′",
      intuition:
        "Base pairing means one strand fixes the other completely: replace each base by its partner. Because the strands are antiparallel, the partner strand runs the other way, so if you want to write it 5′→3′ like every other sequence, you must also reverse it.",
      definition:
        "To write the **complementary strand** of a DNA sequence:\n" +
        "- Swap each base for its partner: A ↔ T, G ↔ C.\n" +
        "- Label the ends: the complement of a 5′→3′ strand runs 3′→5′ underneath it.\n" +
        "- To write it in the usual 5′→3′ form, read the complement backwards.\n" +
        "- By convention sequences are written 5′→3′ unless labelled. The letters alone do not show which end is 5′: that end is defined by the free phosphate on carbon 5′, not by any base.",
      authoredExample: {
        prompt: "One strand of DNA is 5′-ATGCCTAG-3′. Write the complementary strand (a) lined up beneath it and (b) in the 5′→3′ direction.",
        steps: [
          "Swap each base: A→T, T→A, G→C, C→G gives TACGGATC.",
          "Lined up beneath the given strand it runs the other way: 3′-TACGGATC-5′.",
          "Reading that from its 5′ end gives 5′-CTAGGCAT-3′.",
        ],
        answer: "(a) 3′-TACGGATC-5′; (b) 5′-CTAGGCAT-3′",
      },
      selfCheckExample: {
        prompt: "A DNA strand reads 5′-GATTCA-3′. What is its complementary strand, written 5′→3′?",
        options: [
          "5′-CTAAGT-3′",
          "5′-CUAAGU-3′",
          "5′-ACTTAG-3′",
          "5′-TGAATC-3′",
          "5′-GATTCA-3′",
        ],
        steps: [
          "Swap each base: GATTCA becomes CTAAGT, which runs 3′→5′ beneath the original: 3′-CTAAGT-5′.",
          "Reverse it to read from the 5′ end: 5′-TGAATC-3′.",
          "A complements but forgets to reverse, so its ends are mislabelled. B uses uracil, which DNA lacks. C reverses without complementing. E is the original strand.",
        ],
        answer: "(D) 5′-TGAATC-3′",
      },
      practiceSet: [
        { prompt: "Write the complement of 5′-GGATC-3′ in the 5′→3′ direction.", answer: "5′-GATCC-3′", method: "Complement is 3′-CCTAG-5′; read it backwards" },
        { prompt: "Write the partner of 5′-AAAC-3′ lined up beneath it, with its ends labelled.", answer: "3′-TTTG-5′" },
        { prompt: "Which end of a DNA strand has a free -OH group on the sugar?", answer: "The 3′ end" },
      ],
      traps: [
        {
          title: "Complement AND reverse to write the partner 5′→3′",
          body: "Swapping the bases gives the partner strand running 3′→5′. Many options print those letters with 5′ and 3′ labels in the usual order, which is a different molecule. Reverse the complement before you compare it with options written 5′→3′.",
        },
        {
          title: "A start codon does not mark the 5′ end",
          body: "The 5′ end is a chemical feature (the free phosphate on carbon 5′). A sequence beginning with AUG or ATG tells you nothing about direction unless the ends are labelled or the 5′→3′ convention is stated.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mol-chargaff",
      name: "Chargaff's rule: base percentages in double-stranded DNA",
      intuition:
        "Every A in double-stranded DNA has a T opposite it, and every G a C. So across the whole molecule there are exactly as many A as T and as many G as C. Knowing one base's share fixes all four.",
      definition:
        "**Chargaff's rule** (for double-stranded DNA):\n" +
        "- %A = %T and %G = %C.\n" +
        "- So purines = pyrimidines = 50%: %A + %G = 50%.\n" +
        "- Given one base, its partner has the same share, and the other two share what is left equally.\n" +
        "- It does **not** hold for single-stranded DNA or RNA, which have no partner strand.",
      formula: {
        label: "Chargaff's rule",
        latex: "\\%A = \\%T, \\quad \\%G = \\%C, \\quad \\%A + \\%G = 50\\%",
        symbols: [
          { symbol: "\\(\\%A\\)", meaning: "percentage of all bases that are adenine (and so on for T, G, C)" },
        ],
      },
      authoredExample: {
        prompt: "In a sample of double-stranded DNA, 31% of the bases are adenine. Find the percentages of thymine, guanine and cytosine.",
        steps: [
          "Thymine pairs with adenine, so %T = 31%.",
          "A and T together: \\(31 + 31 = 62\\%\\). What is left: \\(100 - 62 = 38\\%\\).",
          "G and C share this equally: \\(38 / 2 = 19\\%\\) each.",
        ],
        answer: "T 31%, G 19%, C 19%",
      },
      selfCheckExample: {
        prompt: "Cytosine makes up 15% of the bases in a sample of double-stranded DNA. What percentage of the bases are adenine?",
        options: ["35%", "15%", "30%", "70%", "85%"],
        steps: [
          "%G = %C = 15%, so G and C together are 30%.",
          "A and T share the remaining 70% equally: 35% each.",
          "B copies the cytosine figure; C stops at G + C; D forgets to halve; E subtracts only cytosine from 100%.",
        ],
        answer: "(A) 35%",
      },
      practiceSet: [
        { prompt: "Double-stranded DNA has 12% thymine. What percentage is guanine?", answer: "38%", method: "\\((100 - 24)/2\\)" },
        { prompt: "Double-stranded DNA has 40% cytosine. What percentage of its bases are purines?", answer: "50%", method: "Purines always equal pyrimidines in a double helix" },
        { prompt: "An RNA virus genome is 20% uracil. Can you work out its percentage of adenine?", answer: "No: it is single-stranded, so Chargaff's rule does not apply" },
      ],
      traps: [
        {
          title: "Pair the right partners: G with C, A with T",
          body: "Given guanine, the matching share belongs to cytosine, not thymine. To find thymine from guanine, double the guanine figure, subtract from 100%, then halve. Copying the guanine number as the answer is the commonest wrong option.",
        },
        {
          title: "Chargaff's rule needs two strands",
          body: "A single strand of DNA, or any RNA, can have any base ratio. The rule is a consequence of pairing, so it applies only to double-stranded DNA taken as a whole.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mol-counting",
      name: "Counting nucleotides, hydrogen bonds and phosphodiester bonds",
      intuition:
        "A stretch of double-stranded DNA is a list of base pairs. Each pair has two nucleotides, two sugars and two phosphates, and either 2 or 3 hydrogen bonds. Along each strand, neighbouring nucleotides are linked once, so a strand of n nucleotides has one link fewer than its number of nucleotides.",
      definition:
        "For a **linear** double-stranded fragment of **N base pairs**:\n" +
        "- nucleotides = sugars = phosphates = 2N; purines = pyrimidines = N.\n" +
        "- **hydrogen bonds** = 2 × (number of A-T pairs) + 3 × (number of G-C pairs).\n" +
        "- **phosphodiester bonds** = 2(N − 1), because each strand of N nucleotides has N − 1 links.\n" +
        "- A **circular** double-stranded molecule (a plasmid, a bacterial chromosome) has no ends, so 2N phosphodiester bonds.\n" +
        "- To find the pairs from a count of one base: the number of A equals the number of A-T pairs, and the number of C equals the number of G-C pairs.",
      formula: {
        label: "Bonds in a linear double-stranded fragment",
        latex: "n_{\\text{H}} = 2\\,n_{AT} + 3\\,n_{GC}, \\qquad n_{\\text{PDE}} = 2(N - 1)",
        symbols: [
          { symbol: "\\(n_{AT}, n_{GC}\\)", meaning: "numbers of A-T and G-C base pairs" },
          { symbol: "\\(N\\)", meaning: "total base pairs, \\(N = n_{AT} + n_{GC}\\)" },
          { symbol: "\\(n_{\\text{PDE}}\\)", meaning: "phosphodiester bonds in both strands together" },
        ],
      },
      authoredExample: {
        prompt:
          "A linear double-stranded DNA fragment contains 60 nucleotides, 20% of which carry adenine. Find the numbers of base pairs, purines, hydrogen bonds and phosphodiester bonds.",
        steps: [
          "Base pairs: \\(N = 60 / 2 = 30\\). Purines: half the nucleotides, 30.",
          "Adenine: \\(20\\% \\times 60 = 12\\), so there are 12 A-T pairs and \\(30 - 12 = 18\\) G-C pairs.",
          "Hydrogen bonds: \\(2 \\times 12 + 3 \\times 18 = 24 + 54 = 78\\).",
          "Phosphodiester bonds: \\(2 \\times (30 - 1) = 58\\).",
        ],
        answer: "30 base pairs, 30 purines, 78 hydrogen bonds, 58 phosphodiester bonds",
      },
      selfCheckExample: {
        prompt:
          "A linear double-stranded DNA fragment is 24 base pairs long and contains 9 cytosine nucleotides in total. How many hydrogen bonds hold its two strands together?",
        options: ["48", "63", "72", "114", "57"],
        steps: [
          "9 cytosines means 9 G-C pairs; the other \\(24 - 9 = 15\\) pairs are A-T.",
          "Hydrogen bonds: \\(2 \\times 15 + 3 \\times 9 = 30 + 27 = 57\\).",
          "A gives every pair 2 bonds and C every pair 3. B swaps the pair counts. D counts each pair twice, once per strand.",
        ],
        answer: "(E) 57",
      },
      practiceSet: [
        { prompt: "How many phosphodiester bonds are there in a single strand of 25 nucleotides?", answer: "24" },
        { prompt: "A circular plasmid has 1000 base pairs. How many phosphodiester bonds does it contain?", answer: "2000", method: "No free ends, so 2N" },
        { prompt: "A fragment has 10 base pairs, 4 of them G-C. How many hydrogen bonds join its strands?", answer: "24", method: "\\(2 \\times 6 + 3 \\times 4\\)" },
        { prompt: "A double-stranded fragment contains 16 phosphate groups. How many deoxyribose sugars does it contain?", answer: "16", method: "One sugar and one phosphate per nucleotide" },
      ],
      traps: [
        {
          title: "Count pairs, not nucleotides, before multiplying",
          body: "If a fragment has 9 cytosines, it has 9 G-C pairs (9 C plus 9 G), not 18. Multiplying the nucleotide count by 3 double-counts every pair.",
        },
        {
          title: "Phosphates are not phosphodiester bonds",
          body: "Every nucleotide carries one phosphate, so phosphates = nucleotides. But a linear strand of n nucleotides has only n − 1 phosphodiester bonds, because the end nucleotide has no neighbour on one side.",
        },
      ],
    },
  ],
};
