import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_CK_COLLISION_NOTE: SubtopicNote = {
  subtopicName: "Collision Theory of Chemical Reactions",
  title: "Collision Theory and Effective Collisions",
  oneLineDefinition:
    "How collision theory explains the rate of a reaction: collision frequency, the energy and orientation a collision needs to be effective, the steric factor, and how the theory links to the Arrhenius equation.",
  whyItMatters:
    "3 questions, all from board papers: an MCQ on what the colliding molecules of an effective collision must have (2024), and in 2026 the definitions of an effective collision and of collision frequency, each paired with the units of rate constants. A 2024 question filed on the Integrated Rate Equations page also asks you to define effective collisions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcck-collision-rate",
      name: "Collision frequency and the collision theory rate",
      intuition:
        "Molecules can react only when they meet. So the rate should depend on how often they collide, and on how many of those collisions carry enough energy. Count the collisions, multiply by the fraction that are energetic enough, and you have the rate. For complex molecules you also need them to meet the right way round, which is what the steric factor adds.",
      definition:
        "- **Collision theory** (Max Trautz and William Lewis, 1916 to 1918) is based on the kinetic theory of gases. Reactant molecules are taken as hard spheres, and reaction occurs when they collide.\n" +
        "- **Collision frequency (Z):** the number of collisions per second per unit volume of the reaction mixture.\n" +
        "- For a bimolecular elementary reaction \\(\\text{A} + \\text{B} \\rightarrow\\) products: rate \\(= Z_{\\text{AB}}\\,e^{-E_a/RT}\\), where \\(Z_{\\text{AB}}\\) is the collision frequency of A and B and \\(e^{-E_a/RT}\\) is the fraction of molecules with energy equal to or greater than \\(E_a\\).\n" +
        "- Comparing with \\(k = A\\,e^{-E_a/RT}\\), the Arrhenius factor A is related to the collision frequency.\n" +
        "- This works well for atoms and simple molecules, but complex molecules deviate, because not every energetic collision forms products. A **probability or steric factor P** is added: rate \\(= P\\,Z_{\\text{AB}}\\,e^{-E_a/RT}\\).\n" +
        "- **Drawback:** the theory treats atoms and molecules as hard spheres and ignores their structure.",
      formula: {
        label: "Collision theory rate",
        latex: "\\text{rate} = P\\,Z_{\\text{AB}}\\,e^{-E_a/RT}",
        symbols: [
          { symbol: "\\(Z_{\\text{AB}}\\)", meaning: "collision frequency of A and B" },
          { symbol: "\\(e^{-E_a/RT}\\)", meaning: "fraction of molecules with energy at least Ea" },
          { symbol: "\\(P\\)", meaning: "probability or steric factor, for proper orientation" },
        ],
      },
      authoredExample: {
        prompt:
          "Compare the collision theory rate, \\(Z_{\\text{AB}}\\,e^{-E_a/RT}\\), with the Arrhenius equation, \\(k = A\\,e^{-E_a/RT}\\). What does each factor stand for, and why is the factor P added for complex molecules?",
        steps: [
          "\\(Z_{\\text{AB}}\\) counts how often A and B collide per second per unit volume. In the Arrhenius equation, A plays this part, so A is related to the collision frequency.",
          "\\(e^{-E_a/RT}\\) appears in both. It is the fraction of molecules with energy equal to or greater than the activation energy.",
          "For complex molecules the theory gives too large a rate, because an energetic collision forms products only if the molecules are properly oriented.",
          "So the steric factor P is put in front: rate \\(= P\\,Z_{\\text{AB}}\\,e^{-E_a/RT}\\).",
        ],
        answer: "A corresponds to the collision frequency, the exponential to the fraction of energetic molecules, and P to the need for proper orientation",
      },
      selfCheckExample: {
        prompt: "Collision theory predicts rate constants fairly accurately for reactions of atoms and simple molecules, but not for complex molecules. Why?",
        steps: ["Not all collisions of complex molecules lead to products, even when they have enough energy.", "The molecules must also collide with proper orientation, which the simple theory ignores."],
        answer: "Complex molecules must also be properly oriented when they collide; the steric factor P accounts for this",
      },
      practiceSet: [
        { prompt: "Define collision frequency.", answer: "The number of collisions per second per unit volume of the reaction mixture" },
        { prompt: "What is threshold energy?", answer: "Activation energy plus the energy possessed by the reacting species" },
        { prompt: "State one drawback of collision theory.", answer: "It treats atoms and molecules as hard spheres and ignores their structure" },
      ],
      traps: [
        {
          title: "Collision frequency without 'per unit volume'",
          body: "The definition is the number of collisions per second per unit volume. Leaving out either 'per second' or 'per unit volume' loses the definition mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcck-effective-collisions",
      name: "Effective collisions: energy and orientation",
      intuition:
        "Most collisions are wasted. Two molecules may hit each other too gently to break any bonds, or they may hit hard but with the wrong ends facing, and simply bounce apart. Only a collision that is both energetic enough and properly aimed makes products.",
      definition:
        "- **Effective collisions:** collisions in which the molecules collide with sufficient kinetic energy (threshold energy) **and** proper orientation, so that bonds between the reacting species break and new bonds form to give products.\n" +
        "- **Threshold energy** = activation energy + energy possessed by the reacting species.\n" +
        "- With proper orientation the reacting atoms are brought together and bonds form; with improper orientation the molecules simply bounce back and no products are formed.\n" +
        "- So activation energy and proper orientation together decide whether a collision is effective, and hence the rate of the reaction.",
      table: {
        columns: ["Term", "Meaning", "Where it appears"],
        rows: [
          { cells: ["Collision frequency (Z)", "Number of collisions per second per unit volume of the reaction mixture", "\\(Z_{\\text{AB}}\\) in rate = \\(P\\,Z_{\\text{AB}}\\,e^{-E_a/RT}\\)"] },
          { cells: ["Threshold energy", "Activation energy plus the energy the reacting species already have", "The energy a colliding pair must reach"] },
          { cells: ["Activation energy", "Energy required to form the activated complex", "\\(e^{-E_a/RT}\\) gives the fraction of molecules that have it"] },
          { cells: ["Proper orientation", "Molecules meet so that the reacting atoms come together", "Steric factor P"] },
          {
            cells: ["Effective collision", "A collision with threshold energy and proper orientation, which forms products", "Only these collisions count towards the rate"],
            noteAmber: "Board 2026 asked you to define an effective collision.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Two molecules collide with more than the threshold energy but improper orientation. Is the collision effective?", answer: "No. They bounce back and no products form" },
        { prompt: "Which factor in the collision theory rate accounts for orientation?", answer: "The probability or steric factor P" },
      ],
      pyqExampleId: "41e8237b-b752-4ef4-828d-7f5d002c4803",
      traps: [
        {
          title: "Naming only one condition",
          body: "An effective collision needs both enough energy and proper orientation. A definition that gives only the energy condition is half an answer, and the MCQ offers each condition alone as a wrong option.",
        },
        {
          title: "Threshold energy is not the activation energy",
          body: "Threshold energy is the activation energy plus the energy the reactants already have. Write the relation if the question asks for either term.",
        },
      ],
    },
  ],
};
