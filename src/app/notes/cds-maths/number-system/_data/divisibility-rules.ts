import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_NS_DIVISIBILITY_RULES_NOTE: SubtopicNote = {
  subtopicName: "Divisibility Rules and Missing Digits",
  title: "Divisibility Rules & Missing Digits",
  oneLineDefinition:
    "The tests that decide divisibility from a number's written form alone — digit sums for 3 and 9, alternating sums for 11, the last few digits for the powers of 2 and 5 — and how to run them backwards to recover a digit the paper has hidden.",
  whyItMatters:
    "Nine PYQs, two of them HARD, and the smallest unit in the chapter by count — but it is pure mechanism, so it is close to guaranteed marks. Every question is one of two shapes: apply a test, or apply a test in reverse to find a hidden digit. The traps are all in the wording, not the mathematics.",
  concepts: [
    // C1 — the rules table (reference variant)
    {
      kind: "reference" as const,
      slug: "cdsns-divisibility-rules-table",
      name: "The divisibility test table",
      intuition:
        "Every one of these tests exists because of what \\(10\\) does modulo the divisor. For 3 and 9, \\(10 \\equiv 1\\), so each digit contributes its face value and the **digit sum** decides. For 11, \\(10 \\equiv -1\\), so digits alternate in sign. For the powers of 2 and 5, \\(10^k\\) is itself a multiple, so only the **last few digits** survive. Knowing the reason means you never mix up which test belongs to which divisor.",
      definition:
        "Learn the table below cold. Two structural facts make it much shorter than it looks:\n" +
        "- For a **composite** divisor, test its coprime prime-power parts separately: \\(6 = 2\\times3\\), \\(12 = 4\\times3\\), \\(33 = 3\\times11\\), \\(45 = 9\\times5\\).\n" +
        "- Testing \\(2\\) and \\(3\\) is **not** enough for \\(12\\); you need \\(4\\) and \\(3\\), because \\(12\\) carries two factors of 2.",
      table: {
        columns: ["Divisor", "Test", "Reason"],
        rows: [
          { cells: ["2", "last digit is even", "\\(10 \\equiv 0 \\pmod 2\\)"] },
          { cells: ["3", "digit sum divisible by 3", "\\(10 \\equiv 1 \\pmod 3\\)"] },
          { cells: ["4", "last two digits divisible by 4", "\\(100 \\equiv 0 \\pmod 4\\)"] },
          { cells: ["5", "last digit is 0 or 5", "\\(10 \\equiv 0 \\pmod 5\\)"] },
          { cells: ["6", "passes both the 2 and 3 tests", "\\(6 = 2\\times 3\\), coprime parts"] },
          { cells: ["8", "last three digits divisible by 8", "\\(1000 \\equiv 0 \\pmod 8\\)"] },
          { cells: ["9", "digit sum divisible by 9", "\\(10 \\equiv 1 \\pmod 9\\)"] },
          { cells: ["10", "last digit is 0", "\\(10 \\equiv 0 \\pmod{10}\\)"] },
          {
            cells: ["11", "alternating digit sum divisible by 11", "\\(10 \\equiv -1 \\pmod{11}\\)"],
            noteAmber:
              "Alternate the signs from the units digit leftwards. A result of \\(0\\) counts as divisible.",
          },
          { cells: ["16", "last four digits divisible by 16", "\\(10^4 \\equiv 0 \\pmod{16}\\)"] },
          { cells: ["25", "last two digits are 00, 25, 50 or 75", "\\(100 \\equiv 0 \\pmod{25}\\)"] },
          {
            cells: ["12", "passes the 4 and 3 tests", "\\(12 = 4\\times 3\\), not \\(2\\times 6\\)"],
            noteAmber:
              "Testing 2 and 6 is wrong: 18 passes both and is not a multiple of 12.",
          },
          { cells: ["7 and 13", "no short test worth learning", "\\(10\\) has order 6 modulo both"] },
        ],
        caption:
          "Thirteen rows. The reason column is not decoration — it is what tells you how many trailing digits a power-of-2 test needs.",
      },
      selfCheckExample: {
        prompt: "Is 391248 divisible by 11? And by 12?",
        steps: [
          "For 11, alternate from the units digit: \\(8 - 4 + 2 - 1 + 9 - 3 = 11\\).",
          "\\(11\\) is a multiple of 11, so yes, 391248 is divisible by 11.",
          "For 12, test 4 and 3 separately. Last two digits are 48, and \\(48 = 4\\times 12\\), so the 4-test passes.",
          "Digit sum is \\(3+9+1+2+4+8 = 27\\), a multiple of 3, so the 3-test passes. Hence 12 divides it too.",
        ],
        answer: "Yes to both.",
      },
      practiceSet: [
        { prompt: "Is 1234 divisible by 4?", answer: "No", method: "\\(34\\) is not a multiple of 4" },
        { prompt: "Digit sum test for 9 on 84321?", answer: "Divisible", method: "Digit sum \\(18\\)" },
        { prompt: "Smallest odd composite number?", answer: "\\(9\\)", method: "1 is not composite; 3, 5, 7 are prime" },
        { prompt: "How many trailing digits does the 16-test need?", answer: "Four" },
      ],
      pyqExampleId: "3fd0b391-78f7-4edb-9c94-4b219954611f", // 2020 — divisible by the smallest odd composite number
      traps: [
        {
          title: "The smallest odd composite number is 9, not 1, 3 or 15",
          body:
            "CDS hides the divisor behind a description. \\(1\\) is neither prime nor composite, and \\(3, 5, 7\\) are all prime — so the smallest odd composite is \\(9\\). Get that wrong and you run a perfectly correct digit-sum test against the wrong divisor.",
        },
        {
          title: "For a composite divisor, split into COPRIME parts",
          body:
            "To test 12, use 4 and 3 — not 2 and 6. The parts must be coprime and must multiply to the divisor, otherwise you lose a factor: 18 passes the 2-test and the 6-test yet is not divisible by 12. Same trap for 8 (use 8 directly, not 2 and 4).",
        },
      ],
    },

    // C2 — running a test backwards
    {
      kind: "formula" as const,
      slug: "cdsns-missing-digit",
      name: "Recovering a hidden digit from a divisibility condition",
      intuition:
        "A test that turns a number into a digit sum can be run in reverse: if the sum must be a multiple of 9 and you know all the digits but one, the missing digit is forced. The only subtlety is that sometimes **two** values of the digit work, and the question expects you to notice.",
      definition:
        "Procedure for a hidden digit \\(P\\) under a 3- or 9-condition:\n" +
        "- Add the known digits to get a partial sum \\(s\\).\n" +
        "- Require \\(s + P \\equiv 0\\) modulo 3 or 9, so \\(P \\equiv -s\\).\n" +
        "- Solve within \\(0 \\le P \\le 9\\) and list **every** solution; modulo 3 there are usually three, modulo 9 usually one or two.\n" +
        "With **two** hidden digits \\(A\\) and \\(B\\), the condition fixes only \\(A+B\\), so the answer is a count of digit pairs — and any extra condition (B is odd, \\(A+B \\le 5\\)) prunes that list.",
      formula: {
        label: "Hidden-digit condition",
        latex: "P \\equiv -\\!\\!\\sum(\\text{known digits}) \\pmod{9}, \\qquad 0 \\le P \\le 9",
      },
      authoredExample: {
        prompt:
          "The number \\(58P41\\) is divisible by 9. Find \\(P\\).",
        steps: [
          "Known digits sum to \\(5+8+4+1 = 18\\).",
          "We need \\(18 + P \\equiv 0 \\pmod 9\\), and \\(18 \\equiv 0\\), so \\(P \\equiv 0 \\pmod 9\\).",
          "Within \\(0 \\le P \\le 9\\) that gives \\(P = 0\\) or \\(P = 9\\).",
          "Both genuinely work: \\(58041 = 9 \\times 6449\\) and \\(58941 = 9\\times 6549\\).",
        ],
        answer: "\\(P = 0\\) or \\(P = 9\\) — two valid digits.",
      },
      selfCheckExample: {
        prompt:
          "How many pairs \\((A,B)\\) make \\(3714AB\\) divisible by 9 if \\(A\\) is even?",
        steps: [
          "Known digits sum to \\(3+7+1+4 = 15\\), so we need \\(15+A+B \\equiv 0 \\pmod 9\\), i.e. \\(A+B \\equiv 3 \\pmod 9\\).",
          "Two digits sum to at most 18, so the achievable totals congruent to 3 are \\(A+B = 3\\) and \\(A+B = 12\\); the next one, 21, is out of range.",
          "\\(A+B=3\\) with \\(A\\) even: \\(A \\in \\{0,2\\}\\) giving \\((0,3),(2,1)\\) — 2 pairs.",
          "\\(A+B=12\\) with \\(A\\) even: \\(A \\in \\{4,6,8\\}\\) giving \\((4,8),(6,6),(8,4)\\); also \\(A=2\\) would need \\(B=10\\), invalid. That is 3 pairs.",
        ],
        answer: "Five pairs in all.",
      },
      practiceSet: [
        { prompt: "\\(2P4\\) divisible by 3. Smallest \\(P\\)?", answer: "\\(0\\)", method: "Sum \\(6+P\\)" },
        { prompt: "\\(41P\\) divisible by 9. Find \\(P\\).", answer: "\\(4\\)", method: "\\(5+P\\equiv0 \\pmod 9\\)" },
        { prompt: "How many digits satisfy a mod-3 condition, typically?", answer: "Three" },
        { prompt: "\\(7P\\) divisible by 11. Find \\(P\\).", answer: "\\(7\\)", method: "Alternating sum \\(P-7=0\\)" },
      ],
      pyqExampleId: "b2cdee20-dada-4ebd-accf-62d3d498aafb", // 2019 — pairs (A,B) in 479865AB divisible by 9, last digit odd
      traps: [
        {
          title: "A mod-9 condition often has TWO digit solutions, not one",
          body:
            "If the required residue is \\(0\\), both \\(P=0\\) and \\(P=9\\) satisfy it. A question asking \"the value of \\(P\\)\" when two exist is asking you to notice; one asking for a **count** is counting both. Always solve the congruence and then enumerate the range rather than stopping at the first hit.",
        },
        {
          title: "With two hidden digits the condition fixes only their SUM",
          body:
            "\\(9 \\mid N\\) pins \\(A+B\\) to a residue, never \\(A\\) and \\(B\\) individually — so the answer is a count of pairs. Remember that \\(A+B=0\\) is a legitimate total (both digits zero) and is divisible by 9, which is the case students drop.",
        },
      ],
    },

    // C3 — tests that read only the tail
    {
      kind: "formula" as const,
      slug: "cdsns-tail-only-tests",
      name: "Divisors for which only the tail of the number matters",
      intuition:
        "\\(1000\\) is a multiple of 8, so every digit above the hundreds place contributes nothing to divisibility by 8. The same logic scales: to test \\(2^k\\) or \\(5^k\\) you may delete all but the last \\(k\\) digits, however monstrous the number is. A 190-digit number can be settled by looking at four digits.",
      definition:
        "Because \\(10^k = 2^k 5^k\\), we have \\(10^k \\equiv 0\\) modulo \\(2^k\\) and modulo \\(5^k\\). So for these divisors, \\(N\\) and its last \\(k\\) digits leave the **same** remainder:\n" +
        "- \\(4\\) and \\(25\\): last **two** digits;\n" +
        "- \\(8\\) and \\(125\\): last **three** digits;\n" +
        "- \\(16\\) and \\(625\\): last **four** digits.\n" +
        "This works for **remainders**, not just for a yes-or-no answer — the remainder of \\(N\\) on division by 16 equals the remainder of its last four digits.",
      formula: {
        label: "Tail rule",
        latex: "N \\equiv \\left(N \\bmod 10^{k}\\right) \\pmod{2^{k}} \\quad\\text{and}\\quad \\pmod{5^{k}}",
      },
      authoredExample: {
        prompt:
          "What is the remainder when the 9-digit number \\(473816952\\) is divided by 8?",
        steps: [
          "Since \\(1000\\) is a multiple of 8, only the last three digits matter.",
          "The last three digits are \\(952\\).",
          "Divide: \\(952 = 8 \\times 119\\) exactly.",
          "So the remainder is \\(0\\) — and we never touched the leading six digits.",
        ],
        answer: "\\(0\\).",
      },
      selfCheckExample: {
        prompt:
          "What is the remainder when the number formed by writing the integers 1 to 30 in order (123456789101112 ... 2930) is divided by 16?",
        steps: [
          "\\(10^4\\) is a multiple of 16, so only the last four digits of the long number matter.",
          "The concatenation ends \\(\\ldots 27\\,28\\,29\\,30\\), so its final four digits are \\(2930\\).",
          "Divide: \\(2930 = 16 \\times 183 + 2\\).",
          "So the remainder is 2. The other fifty-odd digits are irrelevant.",
        ],
        answer: "\\(2\\).",
      },
      practiceSet: [
        { prompt: "How many trailing digits for a test by 8?", answer: "Three" },
        { prompt: "Remainder of \\(...7645\\) on division by 25?", answer: "\\(20\\)", method: "Last two digits \\(45\\)" },
        { prompt: "Is \\(999\\,8320\\) divisible by 16?", answer: "Yes", method: "\\(8320 = 16\\times 520\\)" },
        { prompt: "Does the tail rule work for 12?", answer: "No", method: "12 has a factor of 3" },
      ],
      pyqExampleId: "ba1d1307-9720-4f20-a458-025cb3aeba72", // 2024 — concatenation of 1..100 divided by 16
      traps: [
        {
          title: "The tail rule works only for divisors built from 2s and 5s",
          body:
            "It fails the moment a factor of 3 or 7 appears, because \\(10^k\\) is then not a multiple of the divisor. There is no \"last two digits\" test for 12 or 24. If the divisor is \\(2^a 5^b m\\) with \\(m>1\\), split it: handle \\(2^a5^b\\) by the tail and \\(m\\) by its own rule.",
        },
        {
          title: "Reading the tail of a described number is where this goes wrong",
          body:
            "When the number is described rather than printed — \"write 1 to 100 in order\" — the hard part is working out what the last four digits actually are. The string ends \\(\\ldots 99\\,100\\), so the final four characters are \\(9100\\), not \\(0099\\) or \\(9910\\). Write out the tail explicitly before dividing.",
        },
      ],
    },

    // C4 — no clean rule
    {
      kind: "formula" as const,
      slug: "cdsns-no-clean-rule",
      name: "What to do when the divisor has no usable test",
      intuition:
        "There is no digit-sum test for 7 or 13 worth memorising, and CDS knows it. When one of those turns up with a hidden digit, the intended method is not a clever rule — it is **structured trial**: reduce the problem to one unknown digit and test at most ten candidates, or exploit a structural factorisation instead.",
      definition:
        "Two workable routes when the divisor is awkward:\n" +
        "- **Bounded trial.** If the condition leaves a single unknown digit, testing \\(0\\) through \\(9\\) is only ten divisions and the answer is unique. This is a legitimate exam method, not a fallback.\n" +
        "- **Structural factorisation.** Rewrite the number in a form whose factors you can see. \\(1001 = 7\\times 11 \\times 13\\) is the most useful such fact: any six-digit repeated block is automatically divisible by 7 and 13, and grouping digits in threes reduces a long number modulo 7, 11 and 13 at once.\n" +
        "For a counting question over a whole range, look for the **constraint that shrinks the search** before enumerating.",
      formula: {
        label: "The 1001 grouping fact",
        latex: "1001 = 7 \\times 11 \\times 13",
      },
      authoredExample: {
        prompt:
          "Is \\(861\\) divisible by 7, and use the 1001 fact to decide whether \\(861861\\) is divisible by 13.",
        steps: [
          "Direct division for the short number: \\(861 = 7 \\times 123\\), so yes, 7 divides 861.",
          "For the six-digit number, \\(861861 = 861 \\times 1001\\) by the repeated-block identity.",
          "Since \\(1001 = 7\\times 11\\times 13\\), the number is divisible by 13 whatever the block is.",
          "So \\(861861\\) is divisible by 7, 11 and 13 — no long division needed.",
        ],
        answer:
          "\\(861 = 7\\times 123\\), and \\(861861 = 861\\times 1001\\) is divisible by 13.",
      },
      selfCheckExample: {
        prompt:
          "How many two-digit numbers are divisible by 7 and remain divisible by 7 when their digits are reversed?",
        steps: [
          "Two-digit multiples of 7: 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98.",
          "Reverse each and test: 41, 12, 82, 53, 24, 94, 65, 36, 07, 77, 48, 19, 89.",
          "Of these reversals only \\(77 \\to 77\\) is a multiple of 7 (and 70 reverses to 07, which is not a two-digit number).",
          "So there is exactly one such two-digit number.",
        ],
        answer: "One: \\(77\\).",
      },
      practiceSet: [
        { prompt: "Is there a useful digit-sum test for 7?", answer: "No" },
        { prompt: "Factorise 1001.", answer: "\\(7\\times11\\times13\\)" },
        { prompt: "How many candidates does one hidden digit give?", answer: "Ten, \\(0\\) to \\(9\\)" },
        { prompt: "Is 123123 divisible by 7?", answer: "Yes", method: "\\(123\\times1001\\)" },
      ],
      pyqExampleId: "f807f33e-886a-455a-8feb-bb0e163ec873", // 2021 — 413283P759387 divisible by 13, find P
      traps: [
        {
          title: "Trial is the intended method here, so do not hunt for a rule",
          body:
            "On a 13-divisibility question with one hidden digit, students lose two or three minutes trying to recall a test that does not exist. Ten divisions is faster and certain. The exam-craft point is recognising **immediately** that there is no rule to recall, which is why 7 and 13 have a row of their own in the table above.",
        },
      ],
    },
  ],
  related: [
    { label: "Place value and digit problems", href: "/notes/cds-maths/number-system/cds-ns-place-value" },
    { label: "Division, parity and consecutive integers", href: "/notes/cds-maths/number-system/cds-ns-foundations" },
  ],
};
