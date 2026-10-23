import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RIN_CHAINS_NOTE: SubtopicNote = {
  subtopicName: "Inequality Chains",
  title: "Inequality Chains",
  oneLineDefinition:
    "Letters joined by signs such as greater than, less than and equal to; a conclusion about two letters is definitely true only if every sign between them points the same way.",
  whyItMatters:
    "Twelve questions in the bank, all from the 2025 shifts, with 6 EASY and 6 MODERATE. Each is solved by reading the signs between two letters, so one rule, applied with care, answers every one.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrinch-read",
      name: "Reading the signs between two letters",
      intuition:
        "Walk from one letter to the other along the chain and read every sign on the way. If all of them point the same way, the two letters are definitely related. If the signs turn round even once, nothing definite can be said.",
      definition:
        "- **Same direction:** \\(A > B \\ge C\\) gives \\(A > C\\). All the signs point one way, so the relation holds.\n" +
        "- **Strict or not:** if at least one sign on the way is strict (\\(>\\) or \\(<\\)), the result is strict. If every sign allows equality (\\(\\ge\\), \\(=\\)), the result is \\(\\ge\\) or \\(\\le\\).\n" +
        "- **Equal signs** never change the direction; they can be passed freely.\n" +
        "- **Opposite directions:** \\(A > B < C\\) gives no relation between A and C.\n" +
        "- Statements split by commas or semicolons can be joined through a shared letter: \\(T \\ge A\\) and \\(A \\le D\\) do not join into one direction, but \\(C < A\\) and \\(A \\le T\\) do.\n" +
        "- **Fast route:** write just the stretch of the chain between the two letters of a conclusion, and look at the signs alone.",
      authoredExample: {
        prompt: "Statement: \\(A > B \\ge C = D > E\\). Conclusions: I. \\(A > E\\). II. \\(C \\ge E\\). Which are definitely true?",
        steps: [
          "I: from A to E the signs are \\(>, \\ge, =, >\\), all pointing the same way with at least one strict, so \\(A > E\\). I is true.",
          "II: from C to E the signs are \\(=, >\\), so \\(C > E\\), and therefore \\(C \\ge E\\) is true as well.",
        ],
        answer: "Both I and II",
      },
      selfCheckExample: {
        prompt: "Statement: \\(P \\le Q < R > S\\). Conclusions: I. \\(P < R\\). II. \\(Q > S\\). Which are definitely true?",
        steps: [
          "I: from P to R the signs are \\(\\le, <\\), the same way with one strict, so \\(P < R\\). I is true.",
          "II: from Q to S the signs are \\(<, >\\), which point opposite ways. No relation. II is not definite.",
        ],
        answer: "Only I",
      },
      practiceSet: [
        { prompt: "In \\(X \\ge Y = Z\\), is \\(X \\ge Z\\) definitely true?", answer: "Yes" },
        { prompt: "In \\(X > Y < Z\\), is \\(X > Z\\) definitely true?", answer: "No: the signs point opposite ways." },
        { prompt: "In \\(A \\ge B \\ge C\\), is \\(A > C\\) definitely true?", answer: "No: A could equal C." },
        { prompt: "In \\(A \\ge B > C\\), is \\(A > C\\) definitely true?", answer: "Yes: one strict sign makes the result strict." },
      ],
      pyqExampleId: "081b90c8-412c-4ebf-8644-cb632c02ce2a",
      traps: [
        {
          title: "Turning \\(\\ge\\) into \\(>\\)",
          body:
            "\\(T = R \\ge U\\) gives \\(T \\ge U\\), not \\(T > U\\): T and U may be equal. Only a strict sign somewhere on the way makes the result strict.",
        },
        {
          title: "Joining across a sign that turns round",
          body:
            "In \\(A \\le T < D \\ge O\\), A and O have no fixed relation, because the signs turn at D. Check every sign between the two letters, not just the first and last.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrinch-either",
      name: "Either one or the other",
      intuition:
        "Sometimes neither conclusion is definite, yet one of them must be true. That happens when the two conclusions are about the same two letters and, between them, cover every possibility the statement leaves open.",
      definition:
        "- **Either-or pair:** the two conclusions name the same two letters, neither is definite on its own, and together they cover every case.\n" +
        "- When the statement gives \\(X \\ge Y\\): the pair \\(X > Y\\) and \\(X = Y\\) is an either-or pair.\n" +
        "- When the statement gives no relation at all: the pair \\(X \\ge Y\\) and \\(X < Y\\) is an either-or pair, since one of them must hold.\n" +
        "- A pair that leaves a case out (\\(X > Y\\) and \\(X < Y\\), missing \\(X = Y\\)) is not an either-or pair.\n" +
        "- **Fast route:** only check for either-or after both conclusions have failed on their own.",
      authoredExample: {
        prompt: "Statement: \\(M \\ge N = O\\). Conclusions: I. \\(M > O\\). II. \\(M = O\\). What follows?",
        steps: [
          "From M to O the signs give \\(M \\ge O\\), so neither \\(M > O\\) nor \\(M = O\\) is definite alone.",
          "Together they make up \\(M \\ge O\\), so one of them must be true.",
        ],
        answer: "Either I or II",
      },
      selfCheckExample: {
        prompt: "Statement: \\(A > B < C\\). Conclusions: I. \\(A \\ge C\\). II. \\(A < C\\). What follows?",
        steps: [
          "The signs between A and C point opposite ways, so neither conclusion is definite.",
          "But \\(A \\ge C\\) and \\(A < C\\) together cover every case, so one of them must hold.",
        ],
        answer: "Either I or II",
      },
      practiceSet: [
        { prompt: "The statement gives \\(X \\ge Y\\). The conclusions are \\(X > Y\\) and \\(X = Y\\). What follows?", answer: "Either I or II" },
        { prompt: "With no relation known, are \\(X > Y\\) and \\(X < Y\\) an either-or pair?", answer: "No: they leave out \\(X = Y\\)." },
        { prompt: "Must the two conclusions of an either-or pair name the same two letters?", answer: "Yes" },
        { prompt: "When should you check for an either-or pair?", answer: "Only after both conclusions have failed on their own." },
      ],
      pyqExampleId: "0d7f1a8d-918f-4aee-a46d-e1143ddf4ef5",
      traps: [
        {
          title: "Calling any two failed conclusions either-or",
          body:
            "Two conclusions about different pairs of letters, or ones that leave a case uncovered, are not an either-or pair. The answer is then neither.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrinch-coded",
      name: "Coded signs",
      intuition:
        "In some questions each sign is replaced by a symbol, and a table tells you what each symbol means. Decode every statement and conclusion into ordinary signs first; then the chain is read exactly as before.",
      definition:
        "1. Copy the table of meanings: for example @ for \\(\\ge\\), # for \\(<\\), % for \\(=\\).\n" +
        "2. Rewrite every statement with ordinary signs, and join the statements through their shared letters.\n" +
        "3. Rewrite each conclusion the same way and test it with the rules for reading a chain.\n" +
        "- **Fast route:** decode the conclusions first; often one of them already contradicts a statement.",
      authoredExample: {
        prompt:
          "Here @ means \\(\\ge\\) and % means \\(=\\). Statements: A @ B, B % C. Conclusion: A @ C. Is it true?",
        steps: [
          "The statements decode to \\(A \\ge B = C\\).",
          "The conclusion decodes to \\(A \\ge C\\), which the chain gives. It is true.",
        ],
        answer: "True",
      },
      selfCheckExample: {
        prompt: "Here © means \\(>\\) and ^ means \\(\\le\\). Statements: P © Q, Q ^ R. Conclusion: P © R. Is it true?",
        steps: [
          "The statements decode to \\(P > Q \\le R\\).",
          "The signs between P and R point opposite ways, so \\(P > R\\) is not definite.",
        ],
        answer: "Not true",
      },
      practiceSet: [
        { prompt: "What is the first step in a coded inequality question?", answer: "Decode every statement and conclusion into ordinary signs." },
        { prompt: "Here # means \\(<\\). What does A # B mean?", answer: "\\(A < B\\)" },
        { prompt: "Here % means \\(=\\) and @ means \\(\\ge\\). Statements: X % Y, Y @ Z. Is X @ Z true?", answer: "Yes" },
        { prompt: "After decoding, which rules do you use?", answer: "The same rules as for an ordinary chain." },
      ],
      pyqExampleId: "894ec0d7-bd6b-4768-9808-88f7cc966b36",
      traps: [
        {
          title: "Reading a symbol by its look",
          body:
            "A symbol means only what the table says. Do not guess that @ means greater than because it looks like one; copy the table and use it.",
        },
      ],
    },
  ],
};
