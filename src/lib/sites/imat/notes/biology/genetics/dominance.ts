import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_GEN_DOMINANCE_NOTE: SubtopicNote = {
  subtopicName: "Beyond Simple Dominance",
  title: "Incomplete Dominance, Codominance, Blood Groups and Polygenes",
  oneLineDefinition:
    "Not every gene has one dominant and one recessive allele: alleles can blend in the phenotype, both show, come in sets of three or more, or add up across many genes.",
  whyItMatters:
    "No past IMAT question has yet been set on this page, but all of it is on the syllabus and in every school course. Blood groups in particular are a natural target for a short cross or a fact about antigens and antibodies.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-gen-incomplete-codominance",
      name: "Incomplete dominance and codominance",
      intuition:
        "With complete dominance, the heterozygote looks like the dominant homozygote. Sometimes it does not. If one dose of the pigment allele makes only half the pigment, the heterozygote is an intermediate colour. If both alleles make a product and both products show, the heterozygote shows both traits at once. Either way the heterozygote has its own phenotype, so the genotype ratio and the phenotype ratio become the same.",
      definition:
        "- **Incomplete dominance**: the heterozygote has an **intermediate** phenotype. Red snapdragons \\(C^R C^R\\) crossed with white \\(C^W C^W\\) give pink \\(C^R C^W\\).\n" +
        "- **Codominance**: both alleles are **fully expressed** side by side. Roan cattle have red and white hairs mixed; blood group AB has both A and B antigens.\n" +
        "- In both cases a cross of two heterozygotes gives **1 : 2 : 1** for genotypes and phenotypes alike.\n" +
        "- The alleles do not blend permanently: crossing two pink plants brings back red and white. Inheritance is still by separate units.",
      formula: {
        label: "Heterozygote cross without dominance",
        latex: "C^R C^W \\times C^R C^W \\rightarrow 1\\ \\text{red} : 2\\ \\text{intermediate} : 1\\ \\text{white}",
        symbols: [
          { symbol: "\\(C^R, C^W\\)", meaning: "two alleles, neither dominant (superscripts are used instead of capital and small letters)" },
        ],
      },
      authoredExample: {
        prompt:
          "In snapdragons, flower colour shows incomplete dominance: \\(C^R C^R\\) is red, \\(C^R C^W\\) pink, \\(C^W C^W\\) white. Two pink plants are crossed and 80 seedlings flower. How many of each colour are expected? What ratio would a pink plant crossed with a white plant give?",
        steps: [
          "Pink \\(\\times\\) pink: \\(\\tfrac14\\,C^R C^R\\), \\(\\tfrac12\\,C^R C^W\\), \\(\\tfrac14\\,C^W C^W\\).",
          "Of 80: 20 red, 40 pink, 20 white. Every genotype has its own colour, so the phenotype ratio is 1 : 2 : 1.",
          "Pink \\(\\times\\) white: \\(C^R C^W \\times C^W C^W\\) gives \\(\\tfrac12\\,C^R C^W\\) and \\(\\tfrac12\\,C^W C^W\\): 1 pink : 1 white.",
        ],
        answer: "20 red, 40 pink, 20 white; pink \\(\\times\\) white gives 1 pink : 1 white",
      },
      selfCheckExample: {
        prompt:
          "In a flowering plant, colour shows incomplete dominance: \\(C^R C^R\\) red, \\(C^R C^W\\) pink, \\(C^W C^W\\) white. A pink plant is crossed with a red plant. What percentage of the offspring are expected to be pink?",
        options: ["25%", "50%", "75%", "100%", "0%"],
        steps: [
          "\\(C^R C^W \\times C^R C^R\\): the red parent always gives \\(C^R\\); the pink parent gives \\(C^R\\) or \\(C^W\\) equally.",
          "Offspring: \\(\\tfrac12\\,C^R C^R\\) (red) and \\(\\tfrac12\\,C^R C^W\\) (pink), so 50% pink.",
          "75% would follow if pink counted as dominant (a 3 : 1 habit). 25% is the pink-by-pink white fraction.",
        ],
        answer: "(B) 50%",
      },
      practiceSet: [
        { prompt: "Red snapdragon \\(\\times\\) white snapdragon: what colour are the offspring?", answer: "All pink" },
        { prompt: "Roan cattle (red and white hairs) are crossed with roan. What phenotype ratio is expected?", answer: "1 red : 2 roan : 1 white" },
        { prompt: "In which pattern does the heterozygote show both parental traits fully?", answer: "Codominance" },
      ],
      traps: [
        {
          title: "Incomplete dominance is not blending inheritance",
          body: "A pink snapdragon looks like a blend, but its alleles stay separate: two pink parents produce red and white offspring again. Blending inheritance (the idea that parental traits mix irreversibly) was disproved by Mendel's work.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-gen-abo-rh",
      name: "Multiple alleles: the ABO and Rh blood groups",
      intuition:
        "A gene can have more than two alleles in a population, even though each person carries only two. The ABO gene has three: \\(I^A\\) and \\(I^B\\) each add a different sugar to a surface molecule on red cells (antigen A or B), and \\(i\\) adds nothing. \\(I^A\\) and \\(I^B\\) are codominant, and both are dominant to \\(i\\). The plasma carries antibodies against whichever antigen the body lacks.",
      definition:
        "- **Multiple alleles**: three or more alleles of one gene exist in the population; any one person has at most two.\n" +
        "- ABO: \\(I^A\\) and \\(I^B\\) are **codominant**; both are **dominant to** \\(i\\). Four phenotypes, six genotypes.\n" +
        "- A person makes antibodies against the ABO antigens they **lack**. Group O red cells carry no A or B antigen (useful for transfusion); group AB plasma carries no anti-A or anti-B.\n" +
        "- **Rh** (rhesus): the D antigen; the allele for it (\\(D\\)) is dominant to \\(d\\). Rh negative (\\(dd\\)) people make anti-D only after exposure to Rh positive blood.\n" +
        "- **Haemolytic disease of the newborn**: an Rh negative mother carrying an Rh positive fetus can be sensitised at the first birth; in a later Rh positive pregnancy her anti-D crosses the placenta and destroys fetal red cells. An anti-D injection after birth prevents sensitisation.",
      table: {
        columns: ["Blood group", "Genotypes", "Antigen on red cells", "Antibodies in plasma"],
        rows: [
          { cells: ["A", "\\(I^A I^A\\) or \\(I^A i\\)", "A", "Anti-B"] },
          { cells: ["B", "\\(I^B I^B\\) or \\(I^B i\\)", "B", "Anti-A"] },
          { cells: ["AB", "\\(I^A I^B\\)", "A and B", "Neither anti-A nor anti-B"] },
          { cells: ["O", "\\(i\\,i\\)", "Neither A nor B", "Anti-A and anti-B"] },
          { cells: ["Rh negative", "\\(dd\\)", "No D antigen", "Anti-D only after exposure to D"] },
        ],
        caption: "Rh positive is \\(DD\\) or \\(Dd\\), with the D antigen and no anti-D.",
      },
      selfCheckExample: {
        prompt:
          "A man of blood group A and a woman of blood group B have a first child of blood group O. What is the probability that their second child has blood group AB?",
        options: ["0", "\\(\\tfrac12\\)", "\\(\\tfrac34\\)", "\\(\\tfrac14\\)", "\\(\\tfrac18\\)"],
        steps: [
          "An O child is \\(i\\,i\\), so each parent carries \\(i\\): the father is \\(I^A i\\), the mother \\(I^B i\\).",
          "\\(I^A i \\times I^B i\\) gives \\(I^A I^B\\), \\(I^A i\\), \\(I^B i\\), \\(i\\,i\\), each \\(\\tfrac14\\). So AB has probability \\(\\tfrac14\\).",
          "A forgets that group A and B parents can both carry \\(i\\). E multiplies by \\(\\tfrac12\\) for the sex, which the question does not ask about.",
        ],
        answer: "(D) \\(\\tfrac14\\)",
      },
      practiceSet: [
        { prompt: "A parent of group AB and a parent of group O: which blood groups can their children have?", answer: "A or B only, in equal proportions", method: "\\(I^A I^B \\times i\\,i\\)" },
        { prompt: "Which antibodies are in the plasma of a group B person?", answer: "Anti-A" },
        { prompt: "How many ABO genotypes and phenotypes are there?", answer: "Six genotypes, four phenotypes" },
        { prompt: "Which Rh combination of mother and fetus risks haemolytic disease of the newborn?", answer: "Rh negative mother, Rh positive fetus (usually in a later pregnancy)" },
      ],
      traps: [
        {
          title: "An AB parent cannot have a group O child",
          body: "A group AB parent passes on either \\(I^A\\) or \\(I^B\\), never \\(i\\), so every child has at least one antigen. A family with an AB parent and an O child points to a wrong parentage claim (or a rare mutation), not to normal inheritance.",
        },
        {
          title: "Antibodies are against the antigens you lack",
          body: "Group A people have anti-B, not anti-A. Mixing these up reverses every transfusion answer. Group O red cells can go to all ABO groups because they carry no A or B antigen; group AB people can receive all groups because their plasma has neither antibody.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gen-polygenic",
      name: "Polygenic inheritance and continuous variation",
      intuition:
        "Height and skin colour do not fall into a few neat classes. They are controlled by many genes, each adding a small amount, plus the environment (food, sunlight). With many small steps the classes run into each other and the population forms a bell-shaped curve.",
      definition:
        "- **Polygenic inheritance**: one trait controlled by **several genes**, often each with an **additive** allele that adds the same small amount.\n" +
        "- It gives **continuous variation** (height, mass, skin colour), usually a **normal distribution**, and the environment adds further spread.\n" +
        "- A single gene with few alleles gives **discontinuous variation**: distinct classes, such as ABO blood groups.\n" +
        "- With \\(n\\) genes of two additive alleles each, there are \\(2n + 1\\) phenotype classes (from 0 to \\(2n\\) contributing alleles).",
      formula: {
        label: "Phenotype classes for n additive genes",
        latex: "\\text{classes} = 2n + 1",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of genes, each with one contributing and one non-contributing allele" },
        ],
      },
      authoredExample: {
        prompt:
          "A simple model of skin colour uses three genes (A, B, C), each with one allele that adds pigment (capital letter) and one that adds none. Two \\(AaBbCc\\) parents have children. How many shades are possible, and what fraction of the children have all six pigment alleles?",
        steps: [
          "A child can carry 0, 1, 2, 3, 4, 5 or 6 pigment alleles: \\(2 \\times 3 + 1 = 7\\) shades.",
          "All six means \\(AA\\), \\(BB\\) and \\(CC\\): each has probability \\(\\tfrac14\\), so \\((\\tfrac14)^3 = \\tfrac{1}{64}\\).",
          "The middle shade (3 pigment alleles) is the commonest, at \\(\\tfrac{20}{64}\\). The extremes are rare: the bell shape.",
        ],
        answer: "7 shades; \\(\\tfrac{1}{64}\\) have all six",
      },
      selfCheckExample: {
        prompt:
          "Ear length in a plant is controlled by two genes, each with one additive allele that adds length and one that does not. Two \\(AaBb\\) plants are crossed. How many phenotype classes of ear length are expected among the offspring?",
        options: ["5", "4", "9", "16", "3"],
        steps: [
          "With additive alleles, only the number of contributing alleles matters: 0, 1, 2, 3 or 4.",
          "That is \\(2 \\times 2 + 1 = 5\\) classes.",
          "4 is the dihybrid count under complete dominance; 9 counts genotypes; 16 counts Punnett boxes.",
        ],
        answer: "(A) 5",
      },
      practiceSet: [
        { prompt: "Name two human traits that show continuous variation.", answer: "Height and skin colour (also body mass)" },
        { prompt: "How many phenotype classes do four additive genes give?", answer: "9", method: "\\(2 \\times 4 + 1\\)" },
        { prompt: "From \\(AaBb \\times AaBb\\) with additive alleles, what fraction have no contributing allele?", answer: "\\(\\tfrac{1}{16}\\)", method: "\\(aa\\) and \\(bb\\): \\(\\tfrac14 \\times \\tfrac14\\)" },
        { prompt: "Does the ABO blood group show continuous or discontinuous variation?", answer: "Discontinuous" },
      ],
    },
  ],
};
