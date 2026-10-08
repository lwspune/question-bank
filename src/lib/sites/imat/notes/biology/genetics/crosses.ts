import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_GEN_CROSSES_NOTE: SubtopicNote = {
  subtopicName: "Monohybrid and Dihybrid Crosses",
  title: "Punnett Squares, Probability, Test Crosses and Dihybrid Crosses",
  oneLineDefinition:
    "A cross is predicted by listing each parent's gametes and combining them; for two or more independent genes, solve each gene alone and multiply.",
  whyItMatters:
    "Dihybrid crosses were asked in 2011, 2012, 2015 and 2016: the most likely genotype, which parents give a set genotype, and how many phenotypes a cross can produce. A 2017 question combined a recessive condition with the sex of the child, a two-step probability.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-gen-monohybrid",
      name: "Monohybrid crosses and the Punnett square",
      intuition:
        "Each parent gives each child one allele, picked at random. A Punnett square simply lists one parent's possible gametes across the top and the other parent's down the side, so every box is one equally likely child. Count the boxes and you have the expected ratios.",
      definition:
        "A **monohybrid cross** follows one gene.\n" +
        "- Write each parent's gametes: \\(AA\\) gives only \\(A\\); \\(Aa\\) gives \\(A\\) and \\(a\\) in equal numbers.\n" +
        "- Combine every gamete with every gamete (the **Punnett square**).\n" +
        "- \\(Aa \\times Aa\\) gives genotypes \\(1\\ AA : 2\\ Aa : 1\\ aa\\) and phenotypes \\(3\\) dominant \\(: 1\\) recessive.\n" +
        "- \\(AA \\times aa\\) gives all \\(Aa\\) (the \\(F_1\\) generation); crossing two \\(F_1\\) gives the \\(F_2\\) with its 3 : 1 ratio.\n" +
        "- Ratios are **probabilities for each child**, not guarantees for a small family.",
      formula: {
        label: "Cross of two heterozygotes",
        latex: "Aa \\times Aa \\rightarrow \\tfrac{1}{4}\\,AA + \\tfrac{1}{2}\\,Aa + \\tfrac{1}{4}\\,aa",
        symbols: [
          { symbol: "\\(A\\)", meaning: "dominant allele" },
          { symbol: "\\(a\\)", meaning: "recessive allele" },
        ],
      },
      authoredExample: {
        prompt:
          "In guinea pigs, black fur (\\(B\\)) is dominant to white fur (\\(b\\)). Two heterozygous black guinea pigs have 64 offspring in total. How many are expected to be black, how many white, and what fraction of the black offspring are heterozygous?",
        steps: [
          "Gametes: each parent gives \\(B\\) or \\(b\\) with probability \\(\\tfrac12\\).",
          "Punnett square: \\(\\tfrac14\\,BB\\), \\(\\tfrac12\\,Bb\\), \\(\\tfrac14\\,bb\\). Of 64: 16 \\(BB\\), 32 \\(Bb\\), 16 \\(bb\\).",
          "Black \\(= 16 + 32 = 48\\); white \\(= 16\\).",
          "Among the 48 black ones, 32 are \\(Bb\\): \\(32/48 = \\tfrac23\\). A black offspring is twice as likely to be a carrier as not.",
        ],
        answer: "48 black, 16 white; \\(\\tfrac23\\) of the black ones are heterozygous",
      },
      selfCheckExample: {
        prompt:
          "In a plant, red flowers (\\(R\\)) are dominant to white (\\(r\\)). Two \\(Rr\\) plants are crossed and 200 seeds are grown. About how many plants are expected to have white flowers?",
        options: ["0", "25", "100", "50", "150"],
        steps: [
          "\\(Rr \\times Rr\\) gives \\(\\tfrac14\\,rr\\), the only genotype with white flowers.",
          "\\(\\tfrac14 \\times 200 = 50\\).",
          "150 is the number of red plants. 100 is the number of heterozygotes, which are red.",
        ],
        answer: "(D) 50",
      },
      practiceSet: [
        { prompt: "What genotypes come from \\(AA \\times aa\\)?", answer: "All \\(Aa\\)" },
        { prompt: "From \\(Aa \\times Aa\\), what fraction of the offspring are homozygous (either kind)?", answer: "\\(\\tfrac12\\)", method: "\\(\\tfrac14\\,AA + \\tfrac14\\,aa\\)" },
        { prompt: "From \\(AA \\times Aa\\), what fraction show the recessive phenotype?", answer: "0", method: "Every child receives an \\(A\\) from the \\(AA\\) parent" },
        { prompt: "In \\(Aa \\times Aa\\), what is the ratio of genotypes?", answer: "\\(1\\ AA : 2\\ Aa : 1\\ aa\\)" },
      ],
      traps: [
        {
          title: "A 3 : 1 ratio is a probability, not a rule for each family",
          body: "Two carriers with four children will not always have exactly one affected child. Each child independently has a \\(\\tfrac14\\) chance. The ratio appears only in large numbers of offspring.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gen-probability",
      name: "Probability rules for crosses: multiply for AND, add for OR",
      intuition:
        "Each child is a fresh draw: earlier children do not change the odds for the next one. When you need two independent things to happen together (affected AND a boy, or first child AND second child), multiply. When the outcome can happen in different ways that cannot both occur, add the ways.",
      definition:
        "- **Product rule**: for independent events, \\(P(\\text{A and B}) = P(\\text{A}) \\times P(\\text{B})\\).\n" +
        "- **Sum rule**: for events that cannot happen together, \\(P(\\text{A or B}) = P(\\text{A}) + P(\\text{B})\\).\n" +
        "- The sex of a child is independent of an autosomal gene: \\(P(\\text{boy}) = \\tfrac12\\).\n" +
        "- \"At least one\" is easiest as \\(1 - P(\\text{none})\\).\n" +
        "- \"Exactly one of two children\" can happen in two orders (first only, or second only): add both.",
      formula: {
        label: "Product and sum rules",
        latex: "P(A \\cap B) = P(A)\\,P(B) \\qquad P(A \\cup B) = P(A) + P(B)",
        symbols: [
          { symbol: "\\(P(A \\cap B)\\)", meaning: "probability that A and B both happen (independent events)" },
          { symbol: "\\(P(A \\cup B)\\)", meaning: "probability that A or B happens (events that exclude each other)" },
        ],
      },
      authoredExample: {
        prompt:
          "Two parents are both carriers (\\(Cc\\)) of an autosomal recessive condition. Find the probability that (a) their next child is an affected boy, (b) their next two children are both unaffected, (c) at least one of their next two children is affected.",
        steps: [
          "Each child: \\(P(\\text{affected}) = \\tfrac14\\), \\(P(\\text{unaffected}) = \\tfrac34\\).",
          "(a) Affected AND boy: \\(\\tfrac14 \\times \\tfrac12 = \\tfrac18\\).",
          "(b) Unaffected AND unaffected: \\(\\tfrac34 \\times \\tfrac34 = \\tfrac{9}{16}\\).",
          "(c) At least one affected \\(= 1 - P(\\text{both unaffected}) = 1 - \\tfrac{9}{16} = \\tfrac{7}{16}\\).",
        ],
        answer: "(a) \\(\\tfrac18\\); (b) \\(\\tfrac{9}{16}\\); (c) \\(\\tfrac{7}{16}\\)",
      },
      selfCheckExample: {
        prompt:
          "Albinism is autosomal recessive. Two heterozygous parents plan two children. What is the probability that exactly one of the two children has albinism?",
        options: ["\\(\\tfrac{3}{16}\\)", "\\(\\tfrac38\\)", "\\(\\tfrac14\\)", "\\(\\tfrac{1}{16}\\)", "\\(\\tfrac{9}{16}\\)"],
        steps: [
          "First affected, second not: \\(\\tfrac14 \\times \\tfrac34 = \\tfrac{3}{16}\\). First not, second affected: also \\(\\tfrac{3}{16}\\).",
          "The two orders cannot both happen, so add: \\(\\tfrac{3}{16} + \\tfrac{3}{16} = \\tfrac38\\).",
          "A counts only one order. D is both affected; E is both unaffected; C is the chance for a single child.",
        ],
        answer: "(B) \\(\\tfrac38\\)",
      },
      practiceSet: [
        { prompt: "What is the probability that three children are all boys?", answer: "\\(\\tfrac18\\)", method: "\\(\\tfrac12 \\times \\tfrac12 \\times \\tfrac12\\)" },
        { prompt: "From \\(Aa \\times Aa\\), what is the probability that a child is a heterozygous girl?", answer: "\\(\\tfrac14\\)", method: "\\(\\tfrac12 \\times \\tfrac12\\)" },
        { prompt: "Two carriers already have three affected children. What is the chance the fourth is affected?", answer: "\\(\\tfrac14\\)", method: "Each child is independent" },
        { prompt: "From \\(Aa \\times Aa\\), what is the probability that a child is a girl showing the dominant phenotype?", answer: "\\(\\tfrac38\\)", method: "\\(\\tfrac34 \\times \\tfrac12\\)" },
      ],
      traps: [
        {
          title: "Earlier children do not change the odds",
          body: "If two carriers already have an affected child, the next child still has exactly a \\(\\tfrac14\\) chance of being affected. Each fertilisation is a new, independent event. Options that lower or raise the chance because of previous children are wrong.",
        },
        {
          title: "\"An affected boy\" is not \"a boy who is affected\"",
          body: "\"The next child is an affected boy\" multiplies by \\(\\tfrac12\\) for the sex. \"If the next child is a boy, is he affected?\" does not, because the sex is already given. Read which one the question asks before multiplying.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gen-test-cross",
      name: "The test cross: revealing an unknown genotype",
      intuition:
        "A plant with the dominant phenotype could be \\(TT\\) or \\(Tt\\); you cannot tell by looking. Cross it with a homozygous recessive partner, whose gametes carry only the recessive allele. Then each offspring shows exactly the allele that came from the unknown parent, so the offspring read out its gametes directly.",
      definition:
        "A **test cross** (backcross to the recessive) crosses an individual showing the dominant phenotype with a **homozygous recessive** individual.\n" +
        "- If the unknown is \\(AA\\): all offspring show the dominant phenotype.\n" +
        "- If the unknown is \\(Aa\\): offspring are dominant and recessive in a **1 : 1** ratio.\n" +
        "- A single recessive offspring proves the unknown parent is \\(Aa\\). All dominant offspring only makes \\(AA\\) likely, more so with more offspring.",
      formula: {
        label: "Test cross outcomes",
        latex: "AA \\times aa \\rightarrow \\text{all } Aa \\qquad Aa \\times aa \\rightarrow \\tfrac12\\,Aa + \\tfrac12\\,aa",
        symbols: [
          { symbol: "\\(aa\\)", meaning: "the homozygous recessive tester" },
        ],
      },
      authoredExample: {
        prompt:
          "A black guinea pig (black \\(B\\) dominant to white \\(b\\)) is crossed with a white one. (a) The litters contain 5 black and 5 white young. What is the black parent's genotype? (b) A different black guinea pig, crossed with white ones, has 12 young, all black. How likely is it to get 12 black young if this parent were \\(Bb\\)?",
        steps: [
          "(a) The white parent gives only \\(b\\). White young (\\(bb\\)) must have received \\(b\\) from the black parent too, so the black parent is \\(Bb\\). The 1 : 1 ratio fits.",
          "(b) If the parent were \\(Bb\\), each young would be black with probability \\(\\tfrac12\\).",
          "Twelve black in a row: \\((\\tfrac12)^{12} = \\tfrac{1}{4096}\\), about 0.02%. So the parent is very probably \\(BB\\), though one more white young would prove otherwise.",
        ],
        answer: "(a) \\(Bb\\); (b) \\(\\tfrac{1}{4096}\\), so the parent is almost certainly \\(BB\\)",
      },
      selfCheckExample: {
        prompt:
          "Tall (\\(T\\)) is dominant to dwarf (\\(t\\)) in a plant. A tall plant is crossed with a dwarf plant, and about half of the offspring are dwarf. What is the genotype of the tall parent?",
        options: [
          "\\(TT\\)",
          "\\(tt\\)",
          "\\(TT\\) and \\(Tt\\) are equally likely",
          "It cannot be told from a cross with a dwarf plant",
          "\\(Tt\\)",
        ],
        steps: [
          "The dwarf parent gives only \\(t\\). Dwarf offspring (\\(tt\\)) need a \\(t\\) from the tall parent as well.",
          "So the tall parent carries \\(t\\): it is \\(Tt\\), and \\(Tt \\times tt\\) gives the 1 : 1 ratio seen.",
          "A \\(TT\\) parent would give only tall offspring; a \\(tt\\) parent would not be tall. Crossing with the recessive is exactly the test that answers the question.",
        ],
        answer: "(E) \\(Tt\\)",
      },
      practiceSet: [
        { prompt: "Why is the tester in a test cross always homozygous recessive?", answer: "Its gametes all carry the recessive allele, so the offspring show the unknown parent's allele" },
        { prompt: "What phenotype ratio does \\(Aa \\times aa\\) give?", answer: "1 dominant : 1 recessive" },
        { prompt: "In a test cross, one recessive offspring appears among 30. What is the unknown parent?", answer: "Heterozygous", method: "One recessive offspring is enough proof" },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gen-dihybrid",
      name: "Dihybrid crosses: the 9 : 3 : 3 : 1 ratio and the branch method",
      intuition:
        "When two genes sit on different chromosomes, each gene is inherited as if the other did not exist. So a dihybrid cross is really two monohybrid crosses running side by side. Work out each gene alone, then multiply: that is far faster than drawing a 16-box square, and it scales to three or more genes.",
      definition:
        "For genes that **assort independently** (on different chromosomes) with complete dominance:\n" +
        "- \\(AaBb \\times AaBb\\) gives phenotypes **9 : 3 : 3 : 1** (\\(\\tfrac34 \\times \\tfrac34\\), \\(\\tfrac34 \\times \\tfrac14\\), \\(\\tfrac14 \\times \\tfrac34\\), \\(\\tfrac14 \\times \\tfrac14\\)).\n" +
        "- The 16 boxes hold **9 different genotypes** but only **4 phenotypes**. The most frequent single genotype is \\(AaBb\\) (\\(\\tfrac14\\)).\n" +
        "- \\(AaBb \\times aabb\\) (dihybrid test cross) gives **1 : 1 : 1 : 1**.\n" +
        "- An individual heterozygous for \\(n\\) genes makes \\(2^n\\) kinds of gamete.\n" +
        "- Two parents both heterozygous for \\(n\\) genes give \\(3^n\\) genotypes and \\(2^n\\) phenotypes.",
      formula: {
        label: "Branch method for independent genes",
        latex: "P(\\text{combined}) = P(\\text{gene 1 outcome}) \\times P(\\text{gene 2 outcome}) \\times \\dots",
        symbols: [
          { symbol: "\\(\\tfrac34, \\tfrac14\\)", meaning: "dominant and recessive phenotype from \\(Aa \\times Aa\\)" },
          { symbol: "\\(\\tfrac12, \\tfrac12\\)", meaning: "dominant and recessive phenotype from \\(Aa \\times aa\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "In peas, round seed (\\(R\\)) is dominant to wrinkled (\\(r\\)) and yellow (\\(Y\\)) is dominant to green (\\(y\\)), on different chromosomes. Two \\(RrYy\\) plants are crossed. Find (a) the fraction of round green seeds, (b) the fraction with genotype \\(RrYy\\), (c) the phenotype ratio if an \\(RrYy\\) plant is crossed with an \\(rryy\\) plant instead.",
        steps: [
          "(a) Round from \\(Rr \\times Rr\\): \\(\\tfrac34\\). Green from \\(Yy \\times Yy\\): \\(\\tfrac14\\). Both: \\(\\tfrac34 \\times \\tfrac14 = \\tfrac{3}{16}\\).",
          "(b) \\(Rr\\): \\(\\tfrac12\\). \\(Yy\\): \\(\\tfrac12\\). Both: \\(\\tfrac14\\), the commonest single genotype.",
          "(c) \\(Rr \\times rr\\) gives round : wrinkled 1 : 1, and \\(Yy \\times yy\\) gives yellow : green 1 : 1. Combined: round yellow, round green, wrinkled yellow, wrinkled green in 1 : 1 : 1 : 1.",
        ],
        answer: "(a) \\(\\tfrac{3}{16}\\); (b) \\(\\tfrac14\\); (c) 1 : 1 : 1 : 1",
      },
      selfCheckExample: {
        prompt:
          "Three genes, A, B and C, are on different chromosomes and each shows complete dominance. Two \\(AaBbCc\\) individuals are crossed. What fraction of the offspring show the dominant phenotype for all three genes?",
        options: ["\\(\\tfrac{9}{64}\\)", "\\(\\tfrac{1}{64}\\)", "\\(\\tfrac{9}{16}\\)", "\\(\\tfrac34\\)", "\\(\\tfrac{27}{64}\\)"],
        steps: [
          "Each gene alone: dominant phenotype with probability \\(\\tfrac34\\).",
          "All three: \\(\\tfrac34 \\times \\tfrac34 \\times \\tfrac34 = \\tfrac{27}{64}\\).",
          "C stops after two genes; D after one. B is the all-recessive class, \\((\\tfrac14)^3\\).",
        ],
        answer: "(E) \\(\\tfrac{27}{64}\\)",
      },
      practiceSet: [
        { prompt: "How many kinds of gamete does an \\(AaBbCc\\) individual make (independent genes)?", answer: "8", method: "\\(2^3\\)" },
        { prompt: "How many different genotypes can come from \\(AaBb \\times AaBb\\)?", answer: "9", method: "\\(3 \\times 3\\)" },
        { prompt: "From \\(AaBb \\times AaBb\\), what fraction are \\(aabb\\)?", answer: "\\(\\tfrac{1}{16}\\)" },
        { prompt: "From \\(AABb \\times aaBb\\), what fraction are \\(Aabb\\)?", answer: "\\(\\tfrac14\\)", method: "\\(Aa\\) is certain (1); \\(bb\\) is \\(\\tfrac14\\)" },
      ],
      traps: [
        {
          title: "Sixteen boxes are not sixteen genotypes",
          body: "The \\(AaBb \\times AaBb\\) square has 16 boxes, but several boxes share a genotype: there are 9 genotypes and, with complete dominance, 4 phenotypes. Answers of 16 count boxes, not genotypes or phenotypes.",
        },
        {
          title: "9 : 3 : 3 : 1 needs both conditions",
          body: "The ratio appears only when both parents are heterozygous for both genes AND the genes assort independently. Linked genes, or a parent homozygous for one gene, give a different ratio.",
        },
      ],
    },
  ],
};
