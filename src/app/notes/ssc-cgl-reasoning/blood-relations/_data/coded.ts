import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RBR_CODED_NOTE: SubtopicNote = {
  subtopicName: "Coded Relations",
  title: "Coded Relations",
  oneLineDefinition:
    "Symbols stand for relations ('A @ B means A is the mother of B'), and a chain like 'K # L @ M' is decoded into plain links and drawn as a family tree.",
  whyItMatters:
    "Forty-four questions in the bank, twenty-six of them from the 2024 shifts and twenty-nine MODERATE. The code changes from question to question, so nothing can be memorised, but the method never changes: split the chain into links, translate each one, and fill the gaps the links leave.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrbrco-decode",
      name: "Decoding a symbol chain link by link",
      intuition:
        "A coded chain is a statement chain with the words replaced by symbols. Put the words back one link at a time, draw each link as you go, and the question becomes a Direct Relations question you already know how to solve.",
      definition:
        "1. Read the code table printed with **this** question. Each line reads 'left person is the ... of right person' unless it says otherwise.\n" +
        "2. Split the chain into links. In 'P @ Q # R & S' the links are P @ Q, Q # R and R & S; every middle person appears in two links.\n" +
        "3. Translate each link into words and draw it on the tree, in order.\n" +
        "4. Read the asked relation along the tree, one step per link, from the person asked about.\n" +
        "5. Fix the answer person's gender from any link where they stand on the left of a gendered word.\n" +
        "6. **Fast route:** you rarely need the whole chain. Decode only the links between the two people asked about, then check the gender.",
      authoredExample: {
        prompt:
          "In a code, 'A @ B' means 'A is the mother of B', 'A # B' means 'A is the brother of B' and 'A & B' means 'A is the husband of B'. In 'K # L @ M & N', how is K related to M?",
        steps: [
          "K # L: K is the brother of L, so K is male.",
          "L @ M: L is the mother of M.",
          "M & N: M is the husband of N. This link is not needed for K and M.",
          "K is the brother of M's mother.",
        ],
        answer: "Mother's brother (maternal uncle)",
      },
      selfCheckExample: {
        prompt:
          "In a code, 'P = Q' means 'P is the father of Q', 'P % Q' means 'P is the sister of Q' and 'P ? Q' means 'P is the wife of Q'. In 'D ? E = F % G = H', how is D related to H?",
        steps: [
          "D ? E: D is the wife of E. E = F: E is the father of F, so D is F's mother.",
          "F % G: F is G's sister, so D is G's mother too.",
          "G = H: G is H's father. D is the mother of H's father.",
        ],
        answer: "Father's mother (paternal grandmother)",
      },
      practiceSet: [
        {
          prompt: "In a code, 'X ~ Y' means 'X is the son of Y' and 'X ! Y' means 'X is the wife of Y'. What does 'A ~ B ! C' mean?",
          answer: "A is the son of C.",
          method: "B is C's wife, so B's son A is C's son.",
        },
        {
          prompt: "In a code, 'P = Q' means 'P is the father of Q' and 'P / Q' means 'P is the brother of Q'. What does 'K / L = M' mean?",
          answer: "K is M's father's brother (paternal uncle).",
        },
        {
          prompt: "In a code, 'M ^ N' means 'M is the mother of N'. How is R related to T in 'R ^ S ^ T'?",
          answer: "Mother's mother",
        },
        {
          prompt: "In a code, 'A # B' means 'A is the sister of B' and 'A @ B' means 'A is the father of B'. What does 'P @ Q # R' say about P and R?",
          answer: "P is R's father.",
          method: "Q and R are siblings, so Q's father is R's father.",
        },
      ],
      pyqExampleId: "948ca33b-1b28-4dec-9883-e3d2128b3cc5",
      traps: [
        {
          title: "Reading a code from the wrong side",
          body:
            "'A + B means A is the son of B' puts A one level below B. Reading it as 'B is the son of A' flips the whole tree, and the flipped answer is usually printed as an option.",
        },
        {
          title: "Carrying a code over from another question",
          body:
            "The same symbol means 'mother' in one shift and 'son' in the next. Decode only with the table printed beside the question you are solving.",
        },
        {
          title: "Leaving the answer person's gender open",
          body:
            "'Father's sister' and 'father's brother' differ only in gender. Look for any link where that person stands on the left of a gendered word; it may be the last link in the chain.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrbrco-gaps",
      name: "Filling a gap: the other parent and a gender fixed by a later link",
      intuition:
        "Codes often leave a hole: two links name two different parents of one child, or a person's gender only appears three links later. The answer sits in that hole, so the skill is to see what the links say together, not one at a time.",
      definition:
        "- If one link names X as a child's **mother** and another names Y as a parent of a sibling of that child, Y is the **father**, and X and Y are a married couple.\n" +
        "- 'X is the wife of Y' and 'Y is the father of C' make X the **mother** of C.\n" +
        "- A gender may appear only in a **later link** where the person is on the left: 'S is the wife of A' makes S female even if S appeared earlier as someone's child.\n" +
        "- A **reversed code** ('P @ Q means Q is the mother of P') gives the relation to the person on the right. Rewrite every link in plain words before drawing.\n" +
        "- If the gender the answer needs never appears, and 'Cannot be determined' is printed, choose it.",
      authoredExample: {
        prompt:
          "In a code, 'A ~ B' means 'A is the son of B', 'A ! B' means 'A is the mother of B' and 'A = B' means 'A is the sister of B'. In 'M ! N = O ~ P', how is P related to M?",
        steps: [
          "M ! N: M is the mother of N. N = O: N is the sister of O, so M is O's mother too.",
          "O ~ P: O is the son of P, so P is O's other parent.",
          "O's mother is M, so P is O's father and M's husband.",
        ],
        answer: "Husband",
      },
      selfCheckExample: {
        prompt:
          "In a code, 'X # Y' means 'X is the father of Y', 'X @ Y' means 'X is the brother of Y' and 'X % Y' means 'X is the daughter of Y'. In 'K @ L # M % N', how is N related to L?",
        steps: [
          "L # M: L is M's father. M % N: M is N's daughter, so N is M's other parent.",
          "M's father is L, so N is M's mother and L's wife.",
        ],
        answer: "Wife",
      },
      practiceSet: [
        { prompt: "A is the mother of C, and B is the father of C. How is A related to B?", answer: "Wife" },
        { prompt: "P is the wife of Q, and Q is the father of R. How is P related to R?", answer: "Mother" },
        {
          prompt: "In a code, 'X & Y' means 'X is the child of Y' and 'X ! Y' means 'X is the husband of Y'. In 'D & E ! F', is D's gender known?",
          answer: "No. D is the child of E and F, and no link calls D a son or a daughter.",
        },
        { prompt: "In a code, 'P ? Q' means 'Q is the father of P'. Who is the father in 'M ? N'?", answer: "N" },
      ],
      pyqExampleId: "15b8ee67-f5fc-45d6-9165-451c6afc9d06",
      traps: [
        {
          title: "Making the other parent a second mother",
          body:
            "When one parent of a child is named as the mother, any other parent named for the same child is the father, and the two are husband and wife. SSC builds many options on missing this.",
        },
        {
          title: "Missing a reversed code",
          body:
            "A line such as 'P @ Q means Q is the mother of P' gives the relation to the person on the right. Read every code line to the end; never assume the usual left-to-right direction.",
        },
      ],
    },
  ],
};
