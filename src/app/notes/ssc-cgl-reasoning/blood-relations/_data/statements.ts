import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RBR_STATEMENTS_NOTE: SubtopicNote = {
  subtopicName: "Coded Statements and Expressions",
  title: "Coded Statements and Expressions",
  oneLineDefinition:
    "Coded questions turned round: either test four statements against one decoded chain, or test four chains to find the one that gives a stated relation.",
  whyItMatters:
    "Thirteen questions in the bank, every one MODERATE: seven from the 2023 shifts and six from 2024. Each asks you to decode four things instead of one, so the saving comes from eliminating options before you decode them all.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrbrcs-statements",
      name: "Checking which statement is correct or NOT correct",
      intuition:
        "Here the chain is decoded once and the options are four claims about it. A claim is correct only if the tree makes it certain; one that might be true, because a gender is open, is not correct.",
      definition:
        "1. Decode **every** link and draw the whole tree before reading the options; the options often name the middle people.\n" +
        "2. Mark each person's gender, or leave it open if no link fixes it.\n" +
        "3. Test each option: **true** (the tree forces it), **false** (the tree contradicts it) or **not certain** (it needs an open gender or an unnamed person).\n" +
        "4. 'Which is correct?' wants the one that is surely true. 'Which is NOT correct?' wants the one the tree contradicts.\n" +
        "5. **Fast route:** find both people of an option on the tree and say the relation aloud; most options fail on the level (a grandchild called a son) before gender is even needed.",
      authoredExample: {
        prompt:
          "In a code, 'A @ B' means 'A is the father of B', 'A # B' means 'A is the sister of B' and 'A & B' means 'A is the wife of B'. For 'P & Q @ R # S @ T', which statement is NOT correct? (i) P is the mother of S. (ii) R is T's father's sister. (iii) Q is T's grandfather. (iv) T is R's son.",
        steps: [
          "P is Q's wife; Q is R's father; R is S's sister; S is T's father (so S is male).",
          "R and S are siblings, so P and Q are the parents of both: (i) is true.",
          "R is the sister of T's father S: (ii) is true. Q is the father of T's father: (iii) is true.",
          "T is the child of R's brother, so T is R's nephew or niece, not R's son: (iv) is not correct.",
        ],
        answer: "(iv)",
      },
      selfCheckExample: {
        prompt:
          "In a code, 'M ^ N' means 'M is the son of N', 'M ~ N' means 'M is the husband of N' and 'M ! N' means 'M is the mother of N'. For 'A ^ B ~ C ! D', which statement is surely correct? (a) A is D's brother. (b) B is D's grandfather. (c) C is A's sister. (d) D is C's son.",
        steps: [
          "A is B's son; B is C's husband; C is D's mother. So B and C are the parents of A and D.",
          "(a) A is male and D's sibling: true. (b) B is D's father, so false. (c) C is A's mother, so false.",
          "(d) D's gender is never given, so it is not certain.",
        ],
        answer: "(a)",
      },
      practiceSet: [
        {
          prompt: "K is the mother of L and M, and no statement gives M's gender. Is 'M is L's brother' a correct statement?",
          answer: "No. It may be true, but it is not certain.",
        },
        {
          prompt: "In a code, 'X ~ Y' means 'X is the brother of Y' and 'X ! Y' means 'X is the mother of Y'. For 'P ~ Q ! R', is 'P is R's maternal uncle' correct?",
          answer: "Yes. P is the brother of R's mother Q.",
        },
        {
          prompt: "In a code, 'X ~ Y' means 'X is the brother of Y' and 'X ! Y' means 'X is the mother of Y'. For 'P ~ Q ! R', is 'R is the son of Q' surely correct?",
          answer: "No. R is Q's child, but R's gender is not given.",
        },
      ],
      pyqExampleId: "e90fc86a-ca34-4e0d-ad43-0be28f2e237e",
      traps: [
        {
          title: "Treating 'possible' as 'correct'",
          body:
            "A statement that holds only if an open gender goes one way is not a correct statement. In a 'which is correct' question, the answer is the one the tree forces.",
        },
        {
          title: "Checking only the two ends of the chain",
          body:
            "Statement options usually name people in the middle of the chain, such as the second and fourth. Draw the whole tree first; decoding only the ends leaves those options untestable.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrbrcs-build",
      name: "Finding the expression that gives a stated relation",
      intuition:
        "Now the relation is given and the four options are coded chains. Instead of decoding all four, turn the relation into a path, note the genders it needs, and throw out every option whose first link already gets them wrong.",
      definition:
        "1. Turn the wanted relation into a path from the second person: 'Z is the wife's father's mother of L' is L, then L's wife, then her father, then his mother, Z.\n" +
        "2. Note the genders the path needs. Here Z is a mother, so Z is female.\n" +
        "3. **Eliminate by the first link:** an option that makes Z a brother, father or husband fails at once.\n" +
        "4. Then check the last link, which must join the path to the second person correctly.\n" +
        "5. Decode in full only the one or two options left.",
      authoredExample: {
        prompt:
          "In a code, 'A ~ B' means 'A is the son of B', 'A ! B' means 'A is the wife of B', 'A @ B' means 'A is the father of B' and 'A # B' means 'A is the sister of B'. Which expression means 'P is the father's sister of S'? (i) P # Q @ S (ii) P ! Q @ S (iii) P ~ Q @ S (iv) P # Q ! S",
        steps: [
          "The path: S's father, then his sister P. P must be female.",
          "(iii) makes P a son, so it fails on the first link.",
          "(ii): P is Q's wife and Q is S's father, so P is S's mother. (iv): Q is S's wife, so P is S's wife's sister.",
          "(i): P is Q's sister and Q is S's father, so P is S's father's sister.",
        ],
        answer: "(i)",
      },
      selfCheckExample: {
        prompt:
          "In a code, 'A ^ B' means 'A is the mother of B', 'A = B' means 'A is the brother of B' and 'A & B' means 'A is the husband of B'. Which expression means 'K is the mother's brother of N'? (a) K = L ^ N (b) K ^ L = N (c) K & L ^ N (d) K = L & N",
        steps: [
          "K must be male, so (b), which makes K a mother, fails at once.",
          "(c): K is the husband of N's mother, so K is N's father. (d): L is N's husband, so K is N's husband's brother.",
          "(a): K is the brother of L, and L is N's mother.",
        ],
        answer: "(a)",
      },
      practiceSet: [
        {
          prompt: "Z is the paternal grandmother of Y. What is Z to Y's father?",
          answer: "His mother",
        },
        {
          prompt: "In a code, 'P @ Q' means 'P is the father of Q' and 'P # Q' means 'P is the sister of Q'. Using one more person B, write an expression in which A is C's father's sister.",
          answer: "A # B @ C",
        },
        {
          prompt: "In a code, 'Z & Y' means 'Z is the brother of Y'. Can an expression that begins 'Z & ...' show that Z is someone's mother?",
          answer: "No. The first link makes Z male.",
        },
      ],
      pyqExampleId: "b49abbcb-af54-48fb-a404-30571567fefa",
      traps: [
        {
          title: "Decoding every option in full",
          body:
            "Four full decodings cost most of a minute. The gender of the first person and the last link usually remove two or three options; decode only what is left.",
        },
        {
          title: "Building the path from the wrong end",
          body:
            "'Z is the wife's mother of L' starts at L: L's wife, then her mother. Starting at Z and reading 'wife' first gives a path to someone else entirely.",
        },
      ],
    },
  ],
};
