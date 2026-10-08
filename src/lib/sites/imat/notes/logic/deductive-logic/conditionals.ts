import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_DED_CONDITIONALS_NOTE: SubtopicNote = {
  subtopicName: "Conditional Statements",
  title: "If, Only If and Unless: Conditionals and Valid Inference",
  oneLineDefinition:
    "An if-then statement links a condition to a result; only some ways of reasoning from it are valid, and the contrapositive is the one rewording that keeps its meaning.",
  whyItMatters:
    "Two ministry questions (2024 and 2025) gave an if-then statement and asked which conclusion can be deduced; both answers were modus tollens. Two Cambridge questions (2021 and 2022) asked for the argument with the same logical structure.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-ded-conditional-forms",
      name: "If P then Q: the converse, the inverse and the contrapositive",
      intuition:
        "\"If it is a whale, it is a mammal\" is true, but \"if it is a mammal, it is a whale\" is false: a dog is a mammal. Turning a conditional round changes its meaning. Turning it round AND negating both parts keeps the meaning: if it is not a mammal, it cannot be a whale.",
      definition:
        "In **if P then Q** (written \\(P \\Rightarrow Q\\)), P is the **antecedent** (the condition) and Q is the **consequent** (the result).\n" +
        "- The statement is false in only one case: P true and Q false. When P is false, it makes no claim.\n" +
        "- The **contrapositive** (if not Q then not P) always has the same meaning as the original.\n" +
        "- The **converse** (if Q then P) and the **inverse** (if not P then not Q) do not. They are equivalent to each other.\n" +
        "- \"Whenever P, Q\", \"every time P, Q\" and \"all P are Q\" are all forms of if P then Q.",
      table: {
        columns: ["Form", "Pattern", "Example", "Same meaning as the original?"],
        rows: [
          { cells: ["Original", "If P then Q", "If it is a whale, it is a mammal.", "Yes"] },
          { cells: ["Converse", "If Q then P", "If it is a mammal, it is a whale.", "No"] },
          { cells: ["Inverse", "If not P then not Q", "If it is not a whale, it is not a mammal.", "No (it matches the converse)"] },
          { cells: ["Contrapositive", "If not Q then not P", "If it is not a mammal, it is not a whale.", "Yes"] },
        ],
        caption: "Only the contrapositive can replace the original statement.",
      },
      selfCheckExample: {
        prompt: "Which statement has the same meaning as \"If a medicine is approved, it has passed clinical trials\"?",
        options: [
          "If a medicine has passed clinical trials, it is approved.",
          "If a medicine is not approved, it has not passed clinical trials.",
          "If a medicine has not passed clinical trials, it is not approved.",
          "Every medicine that has passed clinical trials is approved.",
          "A medicine is approved if and only if it has passed clinical trials.",
        ],
        steps: [
          "P = approved, Q = passed trials. The contrapositive is: if not passed trials, then not approved. That is C.",
          "A and D are the converse in two wordings. B is the inverse. None of these follows.",
          "E adds the converse on top of the original, so it claims more than the original does.",
        ],
        answer: "(C) If a medicine has not passed clinical trials, it is not approved.",
      },
      practiceSet: [
        { prompt: "Write the converse of \"If a number is divisible by 4, it is even.\" Is the converse true?", answer: "\"If a number is even, it is divisible by 4.\" False: 6 is even but not divisible by 4." },
        { prompt: "Write the contrapositive of \"If the alarm rings, the doors lock.\"", answer: "If the doors do not lock, the alarm did not ring." },
        { prompt: "In which single case is \"If P then Q\" false?", answer: "P true and Q false" },
      ],
      traps: [
        {
          title: "The converse is not equivalent",
          body: "\"If P then Q\" does not give \"if Q then P\". All whales are mammals, but not all mammals are whales. The only rewording with the same meaning is the contrapositive, \"if not Q then not P\".",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ded-nec-suff",
      name: "Necessary and sufficient conditions: only if, unless, if and only if",
      intuition:
        "In \"if P then Q\", P is enough to guarantee Q, so P is sufficient. Q cannot be missing whenever P happens, so Q is necessary for P. \"Only if\" points at the necessary condition. Rewrite every wording as an arrow before reasoning with it.",
      definition:
        "For \\(P \\Rightarrow Q\\):\n" +
        "- P is a **sufficient** condition for Q: P alone guarantees Q.\n" +
        "- Q is a **necessary** condition for P: without Q, P cannot happen.\n" +
        "- \"P **only if** Q\" means \\(P \\Rightarrow Q\\). The word after \"only if\" is the necessary condition.\n" +
        "- \"P **unless** Q\" means \"if not Q, then P\".\n" +
        "- \"P **if and only if** Q\" means both \\(P \\Rightarrow Q\\) and \\(Q \\Rightarrow P\\): each is necessary and sufficient for the other.",
      table: {
        columns: ["Wording", "As an arrow", "What it tells you"],
        rows: [
          { cells: ["If P, then Q", "\\(P \\Rightarrow Q\\)", "P is sufficient for Q; Q is necessary for P"] },
          { cells: ["Q if P", "\\(P \\Rightarrow Q\\)", "Same as above: the word after \"if\" is the condition"] },
          { cells: ["P only if Q", "\\(P \\Rightarrow Q\\)", "Q is necessary for P"] },
          { cells: ["Only Q can be P (only Qs are Ps)", "\\(P \\Rightarrow Q\\)", "Every P is a Q"] },
          { cells: ["P unless Q", "\\(\\text{not } Q \\Rightarrow P\\)", "Without Q, P happens"] },
          { cells: ["P if and only if Q", "\\(P \\Leftrightarrow Q\\)", "Each is necessary and sufficient for the other"] },
        ],
        caption: "\"Only if\" and \"if\" point in opposite directions.",
      },
      selfCheckExample: {
        prompt: "A notice says: \"You may enter the laboratory only if you are wearing goggles.\" Which statement follows from the notice?",
        options: [
          "Wearing goggles is necessary for entering the laboratory.",
          "Wearing goggles guarantees that you may enter the laboratory.",
          "If you are not wearing goggles, you may still enter the laboratory.",
          "Entering the laboratory is necessary for wearing goggles.",
          "If you do not enter the laboratory, you are not wearing goggles.",
        ],
        steps: [
          "\"Enter only if goggles\" is: enter \\(\\Rightarrow\\) goggles. The word after \"only if\" is necessary, so A follows.",
          "B treats goggles as sufficient: that is the converse, which the notice does not state.",
          "C contradicts the notice. D and E both say goggles \\(\\Rightarrow\\) enter (E is its contrapositive), which is again the converse.",
        ],
        answer: "(A) Wearing goggles is necessary for entering the laboratory.",
      },
      practiceSet: [
        { prompt: "Rewrite as if-then: \"A triangle is equilateral only if it is isosceles.\"", answer: "If a triangle is equilateral, it is isosceles." },
        { prompt: "Rewrite as if-then: \"You will not get a table unless you book.\"", answer: "If you do not book, you will not get a table.", method: "P unless Q: if not Q, then P" },
        { prompt: "Being 18 or over is necessary to vote. Ana is 20. Can you conclude that she can vote?", answer: "No", method: "A necessary condition is not a sufficient one" },
        { prompt: "\"Water boils at sea level if it reaches 100 °C.\" Which part is the sufficient condition?", answer: "Reaching 100 °C", method: "The word after \"if\" is the condition" },
      ],
      traps: [
        {
          title: "\"Only if\" introduces the necessary condition",
          body: "\"P only if Q\" means if P then Q. Reading it as \"if Q then P\" turns a necessary condition into a sufficient one, which is the most common wrong option on these items.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ded-valid-forms",
      name: "Valid inference: modus ponens and modus tollens, and the two fallacies",
      intuition:
        "Given \"if P then Q\", only two one-step conclusions are safe. If P happens, Q happens. If Q did not happen, P cannot have happened. The other two moves feel natural but fail, because Q can have causes other than P.",
      definition:
        "An argument is **valid** when the conclusion must be true whenever the premises are true. From \\(P \\Rightarrow Q\\):\n" +
        "- **Modus ponens**: P, so Q. Valid.\n" +
        "- **Modus tollens**: not Q, so not P. Valid (it uses the contrapositive).\n" +
        "- **Affirming the consequent**: Q, so P. Invalid.\n" +
        "- **Denying the antecedent**: not P, so not Q. Invalid.\n" +
        "- **Chaining**: \\(P \\Rightarrow Q\\) and \\(Q \\Rightarrow R\\) give \\(P \\Rightarrow R\\). Valid.",
      table: {
        columns: ["Name", "Premises", "Conclusion", "Valid?"],
        rows: [
          { cells: ["Modus ponens", "If P then Q; P", "Q", "Yes"] },
          { cells: ["Modus tollens", "If P then Q; not Q", "Not P", "Yes"] },
          { cells: ["Affirming the consequent", "If P then Q; Q", "P", "No"] },
          { cells: ["Denying the antecedent", "If P then Q; not P", "Not Q", "No"] },
          { cells: ["Chain", "If P then Q; if Q then R", "If P then R", "Yes"] },
        ],
        caption: "The two invalid forms are the converse and the inverse in disguise.",
      },
      selfCheckExample: {
        prompt: "\"Whenever the river floods, the road to the village is closed.\" Which conclusion can be deduced from this statement?",
        options: [
          "The road is closed, so the river has flooded.",
          "The river has not flooded, so the road is open.",
          "The road is open, so the river has flooded.",
          "The road is open, so the river has not flooded.",
          "The river has flooded, so the road may be open.",
        ],
        steps: [
          "Flood \\(\\Rightarrow\\) road closed. The road being open is \"not Q\", so by modus tollens the river has not flooded: D.",
          "A affirms the consequent: the road may be closed for roadworks. B denies the antecedent.",
          "C contradicts the rule, and E contradicts modus ponens: after a flood the road must be closed.",
        ],
        answer: "(D) The road is open, so the river has not flooded.",
      },
      practiceSet: [
        { prompt: "If an animal is an insect, it has six legs. A spider has eight legs. What follows?", answer: "A spider is not an insect.", method: "Modus tollens" },
        { prompt: "If the oven is on, its light is on. The light is on. Must the oven be on?", answer: "No", method: "Affirming the consequent is invalid" },
        { prompt: "If P then Q. If Q then R. P is true. What follows?", answer: "R", method: "Chain, then modus ponens" },
      ],
      traps: [
        {
          title: "Affirming the consequent looks like modus ponens",
          body: "From \"if it rains, the street is wet\" and \"the street is wet\", you cannot conclude that it rained: a burst pipe also wets the street. Only \"the street is dry, so it did not rain\" is valid.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ded-same-form",
      name: "Finding the argument with the same logical structure",
      intuition:
        "Two arguments about different topics can have the same skeleton. Replace each idea with a letter and write the argument as arrows. Then compare skeletons, not topics: the matching option has the same arrows, the same \"not\"s and the same kind of conclusion, valid or flawed.",
      definition:
        "To match structure:\n" +
        "- Write the original as a skeleton, for example \\(A \\Rightarrow B\\); not B; so not A.\n" +
        "- Translate \"requires\", \"needs\", \"only if\" into arrows first: \"A requires B\" is \\(A \\Rightarrow B\\).\n" +
        "- Do the same for each option and pick the identical skeleton.\n" +
        "- A flawed argument must be matched by an option with the **same flaw**. A valid option does not match a flawed original.\n" +
        "- Ignore the topic and whether the conclusion is true in real life.",
      authoredExample: {
        prompt:
          "Original: \"Only members can borrow books. Lena is not a member, so Lena cannot borrow books.\" Which has the same structure? (1) Only adults can vote. Tom is an adult, so Tom can vote. (2) Only licensed drivers may rent a car. Ivo has no licence, so Ivo may not rent a car. (3) Only athletes use this gym. Eva uses this gym, so Eva is an athlete.",
        steps: [
          "Original: borrow \\(\\Rightarrow\\) member; not member; so not borrow. That is modus tollens, valid.",
          "(1): vote \\(\\Rightarrow\\) adult; adult; so vote. Affirming the consequent: a different and flawed skeleton.",
          "(2): rent \\(\\Rightarrow\\) licence; not licence; so not rent. Same skeleton as the original.",
          "(3): use gym \\(\\Rightarrow\\) athlete; uses gym; so athlete. Modus ponens: valid, but a different skeleton.",
        ],
        answer: "(2)",
      },
      selfCheckExample: {
        prompt:
          "\"All qualified pilots have passed an eyesight test. Marta has passed an eyesight test, so she is a qualified pilot.\" Which argument has the same structure?",
        options: [
          "Every surgeon has studied anatomy. Leo is a surgeon, so Leo has studied anatomy.",
          "Every surgeon has studied anatomy. Leo has not studied anatomy, so Leo is not a surgeon.",
          "Every surgeon has studied anatomy. Leo is not a surgeon, so Leo has not studied anatomy.",
          "Some surgeons have studied music. Leo is a surgeon, so Leo has studied music.",
          "Every surgeon has studied anatomy. Leo has studied anatomy, so Leo is a surgeon.",
        ],
        steps: [
          "Original: pilot \\(\\Rightarrow\\) test; passed test; so pilot. This affirms the consequent, a flawed form.",
          "E has the same skeleton and the same flaw: surgeon \\(\\Rightarrow\\) anatomy; anatomy; so surgeon.",
          "A is modus ponens and B is modus tollens (both valid). C denies the antecedent, a different flaw. D starts from \"some\", not \"all\".",
        ],
        answer: "(E) Every surgeon has studied anatomy. Leo has studied anatomy, so Leo is a surgeon.",
      },
      practiceSet: [
        { prompt: "Write as an arrow: \"Having a passport is needed to board an international flight.\"", answer: "Board \\(\\Rightarrow\\) passport" },
        { prompt: "Name the skeleton: \"If A then B. Not A. So not B.\"", answer: "Denying the antecedent (invalid)" },
        { prompt: "An original argument is valid. Can a flawed option be its parallel?", answer: "No", method: "The parallel must keep the same form, so it is valid too" },
      ],
      traps: [
        {
          title: "Match the skeleton, not the topic",
          body: "An option on the same subject as the original, or with a conclusion that sounds sensible, is often the wrong one. Only the pattern of arrows and \"not\"s decides the match.",
        },
      ],
    },
  ],
};
