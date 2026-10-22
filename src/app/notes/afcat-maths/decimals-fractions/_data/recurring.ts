import type { SubtopicNote } from "@/app/notes/_types";

export const AF_DF_RECURRING_NOTE: SubtopicNote = {
  subtopicName: "Recurring Decimals",
  title: "Terminating and Recurring Decimals, and Turning Them into Fractions",
  oneLineDefinition:
    "A fraction stops as a decimal only when its denominator is built from 2s and 5s. Otherwise a block of digits repeats, and that block can be turned back into a fraction with 9s and 0s.",
  whyItMatters:
    "The page asks two things: will this fraction terminate, and what fraction is this repeating decimal. Its HARD questions are all the mixed kind, where some digits after the point do not repeat, and that is where the marks go: a missing 0 in the denominator or a forgotten subtraction.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afdf-terminating-test",
      name: "Terminating or recurring: the denominator test",
      intuition:
        "Only 10, 100, 1000 can sit under a terminating decimal, and those are built from 2s and 5s alone. So a fraction terminates exactly when its denominator, in lowest terms, has no other prime factor.",
      definition:
        "- Put the fraction in **lowest terms** first, then factor the denominator.\n" +
        "- Only 2s and 5s: it **terminates** (\\(\\tfrac{7}{20} = 0.35\\), since \\(20 = 2^2 \\times 5\\)).\n" +
        "- Any other prime factor: it is **non-terminating recurring**, a block of digits repeating for ever, written with a bar: \\(\\tfrac19 = 0.111\\ldots = 0.\\overline{1}\\), \\(\\tfrac17 = 0.\\overline{142857}\\).\n" +
        "- A fraction never gives a non-terminating, non-repeating decimal. Those belong to numbers like \\(\\sqrt2\\) and \\(\\pi\\).",
      formula: {
        label: "The terminating test",
        latex: "\\dfrac ab \\text{ in lowest terms terminates} \\;\\text{means}\\; b = 2^m \\times 5^n",
      },
      authoredExample: {
        prompt: "Which of \\(\\tfrac{7}{20}\\), \\(\\tfrac{4}{15}\\), \\(\\tfrac{9}{16}\\) and \\(\\tfrac{5}{12}\\) are terminating decimals?",
        steps: [
          "\\(20 = 2^2 \\times 5\\): terminates, \\(0.35\\).",
          "\\(15 = 3 \\times 5\\): the 3 makes it recur.",
          "\\(16 = 2^4\\): terminates, \\(0.5625\\).",
          "\\(12 = 2^2 \\times 3\\): the 3 makes it recur.",
        ],
        answer: "\\(\\tfrac{7}{20}\\) and \\(\\tfrac{9}{16}\\).",
      },
      selfCheckExample: {
        prompt: "Does \\(\\tfrac{33}{150}\\) terminate? If it does, write the decimal.",
        steps: [
          "Lowest terms first: \\(\\tfrac{33}{150} = \\tfrac{11}{50}\\).",
          "\\(50 = 2 \\times 5^2\\), so it terminates: \\(\\tfrac{22}{100}\\).",
        ],
        answer: "Yes, \\(0.22\\).",
      },
      practiceSet: [
        { prompt: "Write \\(\\tfrac29\\) as a decimal, using a bar.", answer: "\\(0.\\overline{2}\\)" },
        { prompt: "Does \\(\\tfrac{3}{40}\\) terminate?", answer: "Yes, \\(0.075\\)" },
        { prompt: "Does \\(\\tfrac{7}{30}\\) terminate?", answer: "No: 30 has the factor 3" },
        { prompt: "Write \\(\\tfrac{7}{11}\\) as a recurring decimal.", answer: "\\(0.\\overline{63}\\)" },
      ],
      pyqExampleId: "84a19f26-39d4-49f9-b389-d7c260907d5c",
      traps: [
        {
          title: "Reduce before you test",
          body: "\\(\\tfrac{9}{12}\\) has a 3 in its denominator, but it is \\(\\tfrac34 = 0.75\\), which terminates. Cancel first, then look at the denominator.",
        },
        {
          title: "A rounded decimal is a different number",
          body: "\\(\\tfrac23 = 0.\\overline{6}\\). The options \\(0.6\\), \\(0.66\\) and \\(0.67\\) are all terminating numbers close to it, and none of them equals it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-pure-recurring",
      name: "Pure recurring decimals as fractions",
      intuition:
        "If \\(x = 0.\\overline{36}\\), then \\(100x = 36.\\overline{36}\\). Subtracting removes the endless tail: \\(99x = 36\\). So the repeating block goes over as many 9s as it has digits.",
      definition:
        "- A **pure recurring** decimal repeats from the first place after the point.\n" +
        "- One repeating digit: over 9 (\\(0.\\overline{5} = \\tfrac59\\)). Two: over 99. Three: over 999.\n" +
        "- Then cancel to lowest terms.\n" +
        "- A whole part is added separately: \\(2.\\overline{5} = 2 + \\tfrac59 = \\tfrac{23}{9}\\).\n" +
        "- \\(0.\\overline{9} = \\tfrac99 = 1\\) exactly.",
      formula: {
        label: "Pure recurring decimal",
        latex: "0.\\overline{d_1 d_2 \\dots d_n} = \\dfrac{d_1 d_2 \\dots d_n}{\\text{as many 9s as there are repeating digits}}",
      },
      authoredExample: {
        prompt: "Write \\(0.\\overline{36}\\) and \\(2.\\overline{5}\\) as fractions in lowest terms.",
        steps: [
          "Two repeating digits: \\(0.\\overline{36} = \\tfrac{36}{99} = \\tfrac{4}{11}\\).",
          "One repeating digit, plus the whole part: \\(2.\\overline{5} = 2 + \\tfrac59 = \\tfrac{23}{9}\\).",
        ],
        answer: "\\(\\tfrac{4}{11}\\) and \\(\\tfrac{23}{9}\\).",
      },
      selfCheckExample: {
        prompt: "Write \\(0.\\overline{153}\\) as a fraction in lowest terms.",
        steps: ["Three repeating digits: \\(\\tfrac{153}{999}\\).", "Both divide by 9: \\(\\tfrac{17}{111}\\)."],
        answer: "\\(\\tfrac{17}{111}\\).",
      },
      practiceSet: [
        { prompt: "Write \\(0.\\overline{7}\\) as a fraction.", answer: "\\(\\tfrac79\\)" },
        { prompt: "Write \\(0.\\overline{18}\\) as a fraction in lowest terms.", answer: "\\(\\tfrac{2}{11}\\)" },
        { prompt: "Write \\(3.\\overline{6}\\) as a fraction in lowest terms.", answer: "\\(\\tfrac{11}{3}\\)" },
        { prompt: "Write \\(0.\\overline{123}\\) as a fraction in lowest terms.", answer: "\\(\\tfrac{41}{333}\\)" },
      ],
      pyqExampleId: "09c04b3f-51e5-4d7a-a0f0-9aedde7ff81d",
      traps: [
        {
          title: "Nines, not a power of ten",
          body: "\\(0.\\overline{5}\\) is \\(\\tfrac59\\), not \\(\\tfrac{5}{10}\\). The \\(\\tfrac{5}{10}\\) option is the terminating decimal \\(0.5\\).",
        },
        {
          title: "The whole part is added, not written on top",
          body: "\\(2.\\overline{5}\\) is \\(2 + \\tfrac59\\). Putting all the digits over 99, as \\(\\tfrac{25}{99}\\), gives a number less than 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-mixed-recurring",
      name: "Mixed recurring decimals as fractions",
      intuition:
        "In \\(0.3\\overline{8}\\) the 3 does not repeat. Shifting by 100 and by 10 and subtracting gives \\(90x = 38 - 3\\). Each repeating digit puts a 9 in the denominator and each digit that does not repeat puts a 0 after the 9s.",
      definition:
        "- **Numerator**: all the digits up to the end of the first repeating block, read as a number, minus the digits that do not repeat.\n" +
        "- **Denominator**: one 9 for each repeating digit, then one 0 for each digit that does not repeat.\n" +
        "- Cancel to lowest terms at the end. Check by dividing back if time allows.",
      formula: {
        label: "Mixed recurring decimal",
        latex: "0.a\\overline{b} = \\dfrac{ab - a}{90}, \\quad 0.a\\overline{bc} = \\dfrac{abc - a}{990}, \\quad 0.ab\\overline{c} = \\dfrac{abc - ab}{900}",
      },
      authoredExample: {
        prompt: "Write \\(0.3\\overline{8}\\) as a fraction in lowest terms.",
        steps: [
          "One repeating digit and one that does not repeat: the denominator is 90.",
          "Numerator: \\(38 - 3 = 35\\).",
          "\\(\\tfrac{35}{90} = \\tfrac{7}{18}\\).",
        ],
        answer: "\\(\\tfrac{7}{18}\\).",
      },
      selfCheckExample: {
        prompt: "Write \\(0.2\\overline{45}\\) as a fraction in lowest terms.",
        steps: [
          "Two repeating digits, one that does not repeat: the denominator is 990.",
          "Numerator: \\(245 - 2 = 243\\).",
          "\\(\\tfrac{243}{990}\\); both divide by 9, giving \\(\\tfrac{27}{110}\\).",
        ],
        answer: "\\(\\tfrac{27}{110}\\).",
      },
      practiceSet: [
        { prompt: "Write \\(0.1\\overline{3}\\) as a fraction in lowest terms.", answer: "\\(\\tfrac{2}{15}\\)", method: "\\(\\tfrac{13 - 1}{90}\\)." },
        { prompt: "Write \\(0.5\\overline{6}\\) as a fraction in lowest terms.", answer: "\\(\\tfrac{17}{30}\\)" },
        { prompt: "Write \\(0.0\\overline{3}\\) as a fraction in lowest terms.", answer: "\\(\\tfrac{1}{30}\\)" },
        { prompt: "Write \\(0.16\\overline{2}\\) as a fraction in lowest terms.", answer: "\\(\\tfrac{73}{450}\\)", method: "\\(\\tfrac{162 - 16}{900}\\)." },
      ],
      pyqExampleId: "0272bb18-3886-4bcb-9dff-4f2c1acc1c9f",
      traps: [
        {
          title: "Subtract the part that does not repeat",
          body: "\\(0.6\\overline{1}\\) is \\(\\tfrac{61 - 6}{90} = \\tfrac{11}{18}\\). Writing \\(\\tfrac{61}{90}\\) skips the subtraction and is a common wrong option.",
        },
        {
          title: "One 0 for each digit that does not repeat",
          body: "\\(0.12\\overline{5}\\) has two digits before the repeat, so the denominator is 900, not 90 or 990.",
        },
      ],
    },
  ],
};
