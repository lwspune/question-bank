import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RBR_DIRECT_NOTE: SubtopicNote = {
  subtopicName: "Direct Relations",
  title: "Direct Relations",
  oneLineDefinition:
    "Short chains of plain statements such as 'A is the brother of B. B is the son of C', solved by placing each person on a small family tree, one statement at a time.",
  whyItMatters:
    "Thirty-five questions in the bank, thirty-three of them from the 2025 shifts and all but two EASY. Each is one to four short statements in order, so a tree drawn as you read gives the answer in a few seconds; the marks are lost on a skipped sibling step or a gender nobody stated.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrbrdr-generations",
      name: "Counting generations up and down a family tree",
      intuition:
        "Every relation sits on a level. Your parents are one level above you, their parents two above, your children one below. A married couple stands on one level and shares the children below it. Once each person has a level, the relation word is just the number of levels plus a gender.",
      definition:
        "- Write each statement as one link. 'A is the daughter of B' puts B **one level above** A, and A is female.\n" +
        "- One level up is a **father or mother**; two up is a **grandfather or grandmother**; three up is a **great-grandparent**.\n" +
        "- One level down is a **son or daughter**; two down is a **grandson or granddaughter**.\n" +
        "- The father's side is **paternal** and the mother's side is **maternal**: the mother's mother is the maternal grandmother.\n" +
        "- A **husband and wife** stand on the same level. SSC treats a married couple as the parents of the same children, so 'D is the wife of C' and 'B is the son of C' make D the mother of B.\n" +
        "- **Fast route:** count the levels between the two people and add the gender of the person asked about. Two levels up and female is grandmother, whatever the path.",
      authoredExample: {
        prompt: "P is the son of Q. Q is the daughter of R. How is P related to R?",
        steps: [
          "Q is one level above P (P is Q's son).",
          "R is one level above Q (Q is R's daughter), so R is two levels above P.",
          "P is two levels down from R, and P is male (a son): P is R's grandson.",
        ],
        answer: "Grandson (R's daughter's son)",
      },
      selfCheckExample: {
        prompt: "M is the husband of N. K is the daughter of M. L is the son of K. How is N related to L?",
        steps: [
          "N is M's wife, so N is the mother of M's daughter K.",
          "K is L's mother, so N is two levels above L, on the mother's side.",
          "N is female: L's mother's mother.",
        ],
        answer: "Maternal grandmother",
      },
      practiceSet: [
        { prompt: "X is the father of Y, and Y is the father of Z. How is X related to Z?", answer: "Grandfather (father's father)" },
        { prompt: "A is the mother of B, and C is the husband of A. How is C related to B?", answer: "Father" },
        {
          prompt: "R is the son of S, S is the son of T, and T is the son of U, a man. How is U related to R?",
          answer: "Great-grandfather",
          method: "U is three levels above R and male.",
        },
        { prompt: "K is the daughter of L, and L is the daughter of M. How is K related to M?", answer: "Granddaughter" },
      ],
      pyqExampleId: "f08d4698-05b5-450e-b4ba-e39e266e618d",
      traps: [
        {
          title: "Answering the relation the wrong way round",
          body:
            "'How is A related to B?' asks what A is to B. If B turns out to be A's grandmother, the answer is grandson or granddaughter, not grandmother. Say the answer as a sentence, 'A is B's ...', before you pick it.",
        },
        {
          title: "Calling every grandmother paternal",
          body:
            "The mother's mother is the maternal grandmother; only the father's mother is paternal. When the options print both, follow the middle person: through a mother is maternal, through a father is paternal.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrbrdr-siblings",
      name: "Siblings share the same parents",
      intuition:
        "A brother or sister link joins two people on the same level who have the same parents. So anything you learn about one sibling's parents is true for every sibling. Most statement chains turn on this one step.",
      definition:
        "- 'A is the brother of B' means A and B have the **same parents**, and A is male. It says nothing about B's gender.\n" +
        "- A parent of one sibling is a parent of all of them: 'A is the brother of B' and 'B is the son of C' make A the son of C.\n" +
        "- Sibling links chain: if A is the brother of B, B the sister of C and C the brother of D, all four are siblings.\n" +
        "- 'P is the father of Q and R' makes Q and R siblings.\n" +
        "- **Fast route:** draw siblings on one horizontal line. Any line up to a parent, drawn from one of them, is drawn from all of them.",
      authoredExample: {
        prompt: "F is the daughter of G. G is the sister of H. J is the father of H. How is J related to F?",
        steps: [
          "G and H are siblings, so H's father J is also G's father.",
          "F is G's daughter, so J is two levels above F, through her mother G.",
          "J is male: F's mother's father.",
        ],
        answer: "Maternal grandfather (mother's father)",
      },
      selfCheckExample: {
        prompt: "X and Y are sisters. Z is the brother of Y. W is the mother of X. How is Z related to W?",
        steps: ["X, Y and Z are siblings, so X's mother W is the mother of all three.", "Z is male: W's son."],
        answer: "Son",
      },
      practiceSet: [
        { prompt: "A is the sister of B, and B is the son of C. How is A related to C?", answer: "Daughter" },
        { prompt: "P is the mother of Q, and Q is the brother of R. How is P related to R?", answer: "Mother" },
        {
          prompt: "L is the brother of M, M is the sister of N, and N is the brother of O. How are L and O related?",
          answer: "They are siblings.",
          method: "Each link joins two children of the same parents, so all four share them.",
        },
        {
          prompt: "S is the father of T and U. V is the wife of S. How is V related to T?",
          answer: "Mother",
          method: "T and U are siblings, and S's wife is the mother of S's children.",
        },
      ],
      pyqExampleId: "fd05887a-c9af-470b-b117-0301d97ec185",
      traps: [
        {
          title: "Treating a sibling's wife as a sibling",
          body:
            "If A is the brother of B and C is the wife of B, C is not A's sister. She married into the family on B's level, so she is A's brother's wife, a sister-in-law.",
        },
        {
          title: "Stopping one step early",
          body:
            "From 'A is the brother of B, B is the son of C', the answer to 'How is A related to C?' is son. A student who stops at 'brother of B' never moves A up to C and picks a wrong relation such as nephew.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrbrdr-branches",
      name: "Uncles, aunts, nephews, nieces and cousins",
      intuition:
        "These are the side branches of the tree: the brothers and sisters of your parents, and their children. Each one is a sibling step joined to a parent step, so you already have the tools; only the names are new.",
      definition:
        "- **Uncle:** the brother of a parent, or the husband of an aunt. **Aunt:** the sister of a parent, or the wife of an uncle.\n" +
        "- The father's brother is the **paternal uncle**; the mother's brother is the **maternal uncle**. The same rule names aunts.\n" +
        "- **Nephew or niece:** the son or daughter of your brother or sister (or of your husband's or wife's brother or sister).\n" +
        "- **Cousin:** the child of an uncle or aunt. A cousin is on **your own level**; an uncle is one level up; a nephew one level down.\n" +
        "- **Elimination:** when the asked person's gender is not given and only one of 'uncle' and 'aunt' is printed, SSC keys the one printed. Check the level first; it removes most options.",
      authoredExample: {
        prompt: "P is the sister of Q. Q is the father of R. How is P related to R?",
        steps: [
          "P and Q are siblings, and Q is R's father.",
          "So P is the sister of R's father, one level above R on the father's side.",
          "P is female: R's paternal aunt.",
        ],
        answer: "Paternal aunt (father's sister)",
      },
      selfCheckExample: {
        prompt: "M is the wife of N. N is the brother of O. O is the mother of P. How is M related to P?",
        steps: [
          "N is the brother of P's mother O, so N is P's maternal uncle.",
          "M is N's wife, so M is the wife of P's maternal uncle.",
        ],
        answer: "Aunt (mother's brother's wife)",
      },
      practiceSet: [
        { prompt: "X is the brother of Y, and Y is the father of Z. How is X related to Z?", answer: "Paternal uncle" },
        { prompt: "A is the daughter of B, and B is the sister of C. How is A related to C?", answer: "Niece" },
        {
          prompt: "P is the son of Q. Q is the sister of R. S is the son of R. How is S related to P?",
          answer: "Cousin",
          method: "R is P's uncle or aunt, so R's son is P's cousin.",
        },
        { prompt: "What is the son of a man's sister to that man?", answer: "Nephew" },
      ],
      pyqExampleId: "63a2e08b-8390-4d8c-bd76-709c0f1d799a",
      traps: [
        {
          title: "Putting a cousin on the wrong level",
          body:
            "A cousin is on your own level, not one above or below. Your uncle's son is your cousin; your cousin's son is one level below you, so he is not your cousin.",
        },
        {
          title: "Mixing paternal and maternal uncles",
          body:
            "The mother's brother is the maternal uncle, the father's brother the paternal uncle. SSC often prints both, so name the parent in the middle before you answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrbrdr-gender",
      name: "When a gender is fixed, and when the answer cannot be determined",
      intuition:
        "A relation word carries a gender only for the person it describes. Some answers need a gender that no statement gives, and then the honest answer is that it cannot be told. SSC prints that option on purpose.",
      definition:
        "- Words that make a person male: son, brother, father, husband, nephew, uncle, grandson. Female: daughter, sister, mother, wife, niece, aunt, granddaughter.\n" +
        "- The word fixes only the person **on its left**: 'A is the son of B' makes A male and says nothing about B.\n" +
        "- A 'not' can fix a gender: if A is the father of B but B is **not** A's son, B is a daughter.\n" +
        "- If the answer needs a gender that no statement gives and **'Cannot be determined'** is printed, that is the answer, even when 'grandfather' is printed too.\n" +
        "- If no such option is printed, choose the word that needs no gender: grandparent, sibling, cousin.",
      authoredExample: {
        prompt: "L is the son of M. M is the daughter of N. (a) How is L related to N? (b) How is N related to L?",
        steps: [
          "M is L's mother and N is M's parent, so N is two levels above L on the mother's side.",
          "(a) L is male (a son), so L is N's grandson. This side is fixed.",
          "(b) No statement puts N on the left of a gendered word, so N may be L's grandfather or grandmother.",
        ],
        answer: "(a) Grandson (b) Cannot be determined: N is a maternal grandparent of unknown gender.",
      },
      selfCheckExample: {
        prompt: "A is the father of B, but B is not the son of A. C is the brother of B. How is B related to C?",
        steps: ["B is A's child but not A's son, so B is a daughter.", "B and C are siblings, and B is female: C's sister."],
        answer: "Sister",
      },
      practiceSet: [
        { prompt: "In the statement 'P is the sister of Q', whose gender is fixed?", answer: "Only P's (female)." },
        {
          prompt: "X is the son of Y, and Y is the son of Z. Is it certain that Z is X's grandfather?",
          answer: "No. Z is X's grandparent, and Z's gender is not given.",
        },
        { prompt: "M is the brother of N, and N is the daughter of O. How is N related to M?", answer: "Sister" },
        {
          prompt: "K and L are the two children of M. K is a girl. How is L related to K?",
          answer: "A sibling: brother or sister cannot be told.",
        },
      ],
      pyqExampleId: "da333715-b940-4015-8b57-16984b614263",
      traps: [
        {
          title: "Taking a gender from the word on the right",
          body:
            "'A is the son of B' tells you A is male. It does not make B the father: B may be the mother. Only a word with B on its left fixes B.",
        },
        {
          title: "Skipping a printed 'Cannot be determined'",
          body:
            "When the asked person's gender appears in no statement, 'Cannot be determined' is the correct option, even if 'grandfather' or 'nephew' is printed beside it. Picking the likely gender is a guess, not a deduction.",
        },
      ],
    },
  ],
};
