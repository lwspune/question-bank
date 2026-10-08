import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_GEN_SEX_LINKAGE_NOTE: SubtopicNote = {
  subtopicName: "Sex Determination and Sex Linkage",
  title: "Sex Chromosomes, the SRY Gene and X-linked Inheritance",
  oneLineDefinition:
    "Sex in humans is set by the sex chromosomes, and genes on the X chromosome follow special rules because a male has only one X.",
  whyItMatters:
    "This is the most asked part of the chapter. Haemophilia crosses came up in 2011 and 2022, an X-linked dominant condition in 2018, the SRY gene in 2021, and the 2023 ministry paper asked twice: which statement about an X-linked recessive muscle disease is wrong, and which colour-blindness families can have an affected daughter.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-gen-sex-determination",
      name: "Sex determination in humans: XX, XY and the SRY gene",
      intuition:
        "Every egg carries an X chromosome. A sperm carries either an X or a Y, in equal numbers, so the sperm decides the sex. What makes an embryo male is not the Y as a whole but one gene on it, SRY, which switches on testis development. The testes then make the hormones that build the rest of the male body.",
      definition:
        "- Human body cells have **46 chromosomes**: **22 pairs of autosomes** and **one pair of sex chromosomes**. Females are **XX**, males **XY**.\n" +
        "- Gametes carry 23: 22 autosomes plus one sex chromosome. Eggs always carry X; sperm carry X or Y in a 1 : 1 ratio, so \\(P(\\text{boy}) = \\tfrac12\\) for each child.\n" +
        "- The **SRY gene** (sex-determining region of Y) starts testis development. Without it, the embryo develops as female.\n" +
        "- The X carries many genes (hundreds that code for proteins); the Y carries few. A male has one copy of each X gene: he is **hemizygous**.\n" +
        "- In females one X in each body cell is switched off at random early in development (**X inactivation**, seen as a Barr body). Tortoiseshell cats show the resulting patches.",
      table: {
        columns: ["Situation", "Sex that develops", "Reason"],
        rows: [
          { cells: ["XX", "Female", "No SRY gene"] },
          { cells: ["XY", "Male", "SRY on the Y starts testis development"] },
          { cells: ["XX with SRY moved onto one X", "Male", "SRY is present, even without a Y"] },
          { cells: ["XY with SRY lost or not working", "Female", "No working SRY"] },
          { cells: ["XXY", "Male", "One Y with SRY is enough"] },
        ],
        caption: "SRY can move onto an X by an abnormal crossover in the father's meiosis, giving an X-bearing sperm that makes a male.",
      },
      selfCheckExample: {
        prompt: "Which parent's gamete decides the sex of a human child?",
        options: [
          "The mother's egg, which carries either an X or a Y",
          "Both gametes equally, since each carries one sex chromosome",
          "The mother's egg, because it is larger and contributes the cytoplasm",
          "The father's sperm, which carries either an X or a Y",
          "Neither: sex is decided by the temperature during development",
        ],
        steps: [
          "Eggs always carry an X. Sperm carry X or Y in equal numbers, so the sperm decides: option D.",
          "A and C are wrong because an egg never carries a Y. B ignores that the egg's contribution is always the same.",
          "E describes some reptiles, not humans.",
        ],
        answer: "(D) The father's sperm, which carries either an X or a Y",
      },
      practiceSet: [
        { prompt: "How many autosomes are in a human body cell?", answer: "44 (22 pairs)" },
        { prompt: "How many chromosomes, and which sex chromosome, can a normal human sperm carry?", answer: "23, with either an X or a Y" },
        { prompt: "What is the probability that a couple's four children are all girls?", answer: "\\(\\tfrac{1}{16}\\)", method: "\\((\\tfrac12)^4\\)" },
        { prompt: "Which gene on the Y chromosome starts male development?", answer: "SRY" },
      ],
      traps: [
        {
          title: "It is SRY, not the Y chromosome as a whole, that makes a male",
          body: "An XX person carrying SRY on one X develops as a male, and an XY person without a working SRY develops as a female. Statements that tie maleness only to \"having a Y\" miss this.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gen-x-recessive",
      name: "X-linked recessive inheritance: haemophilia, colour blindness, Duchenne",
      intuition:
        "A woman has two X chromosomes, so a recessive allele on one X is usually masked by a normal allele on the other: she is a carrier. A man has only one X, with nothing to mask it, so one recessive allele is enough. That is why these conditions are far more common in men, and why a son always gets his X from his mother.",
      definition:
        "Write the alleles on the X: \\(X^H\\) normal, \\(X^h\\) affected; the Y carries no allele.\n" +
        "- Female genotypes: \\(X^H X^H\\) normal, \\(X^H X^h\\) **carrier** (normal phenotype), \\(X^h X^h\\) affected.\n" +
        "- Male genotypes: \\(X^H Y\\) normal, \\(X^h Y\\) affected. One allele decides.\n" +
        "- A father gives his **X to every daughter** and his **Y to every son**: an affected man has all daughters carriers and no affected sons through him.\n" +
        "- A carrier mother gives the allele to half her children: half her sons are affected, half her daughters are carriers.\n" +
        "- An affected woman needs an affected father and a carrier (or affected) mother; all her sons are affected.\n" +
        "- Examples: **haemophilia A** (no clotting factor VIII), **red-green colour blindness**, **Duchenne muscular dystrophy** (faulty dystrophin). The allele spreads in a population with the X chromosomes that carry it.",
      formula: {
        label: "Carrier mother and unaffected father",
        latex: "X^H X^h \\times X^H Y \\rightarrow \\tfrac14 X^H X^H + \\tfrac14 X^H X^h + \\tfrac14 X^H Y + \\tfrac14 X^h Y",
        symbols: [
          { symbol: "\\(X^h\\)", meaning: "X chromosome carrying the recessive allele" },
          { symbol: "\\(Y\\)", meaning: "Y chromosome, carrying no allele of this gene" },
        ],
      },
      authoredExample: {
        prompt:
          "A man with haemophilia (\\(X^h Y\\)) has children with a woman who is homozygous normal (\\(X^H X^H\\)). (a) Describe their sons and daughters. (b) One of their daughters later has children with an unaffected man. What fraction of her sons will be affected, and what is the probability that any one of her children is an affected son?",
        steps: [
          "(a) Daughters get \\(X^h\\) from the father and \\(X^H\\) from the mother: all are carriers \\(X^H X^h\\), none affected. Sons get Y from the father and \\(X^H\\) from the mother: all unaffected.",
          "(b) The daughter is \\(X^H X^h\\); her partner is \\(X^H Y\\). Her sons get \\(X^H\\) or \\(X^h\\) from her equally: half of her sons are affected.",
          "Any one child is an affected son with probability \\(\\tfrac12\\) (son) \\(\\times\\ \\tfrac12\\) (gets \\(X^h\\)) \\(= \\tfrac14\\).",
        ],
        answer: "(a) All daughters carriers, all sons unaffected; (b) half her sons; \\(\\tfrac14\\) per child",
      },
      selfCheckExample: {
        prompt:
          "Red-green colour blindness is X-linked recessive. A colour-blind man and a woman homozygous for normal vision have a son. What is the probability that the son is colour blind?",
        options: ["\\(\\tfrac14\\)", "\\(\\tfrac12\\)", "0", "1", "\\(\\tfrac18\\)"],
        steps: [
          "The son received the Y from his father, not the father's X.",
          "His X came from his mother, who has only normal alleles: he is \\(X^B Y\\), with normal vision. The probability is 0.",
          "B and A treat the father's allele as if it could reach a son. The father's allele goes to every daughter instead, making them carriers.",
        ],
        answer: "(C) 0",
      },
      practiceSet: [
        { prompt: "Write the genotype of a woman with haemophilia.", answer: "\\(X^h X^h\\)" },
        { prompt: "A carrier mother and an unaffected father: what fraction of their daughters are affected?", answer: "0", method: "Every daughter gets \\(X^H\\) from the father" },
        { prompt: "A carrier mother and an unaffected father: what fraction of their sons are affected?", answer: "\\(\\tfrac12\\)" },
        { prompt: "Why are X-linked recessive conditions commoner in men?", answer: "Men have one X, so a single recessive allele is expressed; women need two" },
      ],
      traps: [
        {
          title: "A father never passes an X-linked allele to his son",
          body: "Sons receive their father's Y. So an affected son of an unaffected father got the allele from his mother, and an affected father cannot have an affected son through his own X. Any option tracing an X-linked allele from father to son is wrong.",
        },
        {
          title: "\"Half the sons\" is not \"a quarter of the children\"",
          body: "For a carrier mother and a normal father, \\(\\tfrac12\\) of the sons are affected, but only \\(\\tfrac14\\) of all children are affected sons. Women are affected far less often than men, never more often, for a recessive X-linked allele.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gen-x-dominant-y-linked",
      name: "X-linked dominant and Y-linked inheritance",
      intuition:
        "For an X-linked dominant allele, one copy causes the condition in either sex. The same rule as before decides who gets it: a father's X goes to all his daughters and to none of his sons. A Y-linked gene is simpler still: only men have a Y, and every son gets his father's Y.",
      definition:
        "- **X-linked dominant** (e.g. X-linked hypophosphataemic rickets): an affected man (\\(X^R Y\\)) has **all daughters affected** and **no sons affected**.\n" +
        "- A heterozygous affected woman (\\(X^R X^r\\)) passes it to **half her children of either sex**.\n" +
        "- An affected boy must have an affected mother. An affected girl has at least one affected parent.\n" +
        "- More females than males are affected (females have two chances to receive the allele).\n" +
        "- **Y-linked** (e.g. SRY, some male-infertility genes): only males, passed from father to **every son**, never to daughters.",
      formula: {
        label: "Affected father, X-linked dominant",
        latex: "X^R Y \\times X^r X^r \\rightarrow \\text{daughters all } X^R X^r,\\ \\text{sons all } X^r Y",
        symbols: [
          { symbol: "\\(X^R\\)", meaning: "X carrying the dominant allele that causes the condition" },
          { symbol: "\\(X^r\\)", meaning: "X carrying the normal recessive allele" },
        ],
      },
      authoredExample: {
        prompt:
          "An X-linked dominant condition. (a) An affected heterozygous woman has children with an unaffected man: what is the chance that a daughter is affected, and that a son is affected? (b) An affected man has children with an unaffected woman: describe the children.",
        steps: [
          "(a) \\(X^R X^r \\times X^r Y\\). Each child gets \\(X^R\\) or \\(X^r\\) from the mother equally. A daughter: \\(\\tfrac12\\) affected. A son: \\(\\tfrac12\\) affected.",
          "(b) \\(X^R Y \\times X^r X^r\\). Every daughter gets the father's \\(X^R\\): all affected. Every son gets the father's Y and a mother's \\(X^r\\): none affected.",
        ],
        answer: "(a) \\(\\tfrac12\\) for each sex; (b) all daughters affected, no sons affected",
      },
      selfCheckExample: {
        prompt:
          "A condition is caused by a dominant allele on the X chromosome. An affected man and an unaffected woman have two sons and two daughters. Which of their children are expected to be affected?",
        options: ["None of them", "Both sons only", "All four children", "Both daughters only", "One son and one daughter"],
        steps: [
          "The father's \\(X^R\\) goes to every daughter, and one dominant allele is enough: both daughters affected.",
          "Each son gets the father's Y and an \\(X^r\\) from the unaffected mother: neither son affected.",
          "B reverses the pattern (that is the Y-linked rule). E applies the affected-mother rule to an affected father.",
        ],
        answer: "(D) Both daughters only",
      },
      practiceSet: [
        { prompt: "For an X-linked dominant condition, a boy is affected. Which parent must be affected?", answer: "His mother" },
        { prompt: "A Y-linked trait: what fraction of an affected man's daughters show it?", answer: "None" },
        { prompt: "A woman homozygous for an X-linked dominant allele has children with an unaffected man. What fraction of the children are affected?", answer: "All of them", method: "Every child gets one of her \\(X^R\\)" },
      ],
      traps: [
        {
          title: "An X-linked allele in a boy came from his mother",
          body: "Whether the X-linked allele is dominant or recessive, a boy's only X came from his mother. If he has an X-linked dominant condition, his mother must carry the allele, and since it is dominant she is affected too. His father is irrelevant to it.",
        },
      ],
    },
  ],
};
