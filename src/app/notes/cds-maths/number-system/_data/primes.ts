import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_NS_PRIMES_NOTE: SubtopicNote = {
  subtopicName: "Prime Numbers and Primality",
  title: "Prime Numbers & Primality",
  oneLineDefinition:
    "What a prime is, how to test one by trial division up to the square root, why a question about primes summing to something odd almost always forces one of them to be 2, and which plausible prime-generating forms are traps.",
  whyItMatters:
    "Twenty-two PYQs and not one of them rated HARD — this is the most reliable unit in the chapter. Almost every question is recall or a single structural argument. The one argument to own is the parity move that pins a prime to 2: it appears in five of the twenty-two and turns a search into a one-line deduction.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsns-prime-definitions",
      name: "Primes, composites, and the numbers that are neither",
      intuition:
        "A prime has exactly **two** positive divisors, itself and 1. Counting divisors rather than reciting a definition settles the awkward cases immediately: 1 has only one divisor so it is not prime, and it is not composite either.",
      definition:
        "A positive integer \\(n>1\\) is **prime** if its only positive divisors are 1 and \\(n\\); otherwise it is **composite**.\n" +
        "- \\(1\\) is **neither** prime nor composite — it has exactly one divisor.\n" +
        "- \\(2\\) is the only **even** prime, which is why parity arguments are so powerful here.\n" +
        "- There are **25** primes below 100, and **15** below 50.\n" +
        "- Two numbers are **coprime** (relatively prime) when their HCF is 1; neither needs to be prime.",
      table: {
        columns: ["Claim", "Verdict", "Why"],
        rows: [
          { cells: ["1 is prime", "False", "It has one divisor, not two"] },
          { cells: ["1 is composite", "False", "It is neither"] },
          { cells: ["2 is prime", "True", "Divisors 1 and 2 only"] },
          {
            cells: ["Every prime is odd", "False", "2 is even"],
            noteAmber:
              "This is the single most useful exception in the chapter — it is what lets you force one prime to be 2.",
          },
          { cells: ["Number of primes below 100", "25", "2, 3, 5, ..., 89, 97"] },
          { cells: ["Number of primes below 50", "15", "So 10 lie between 50 and 100"] },
          { cells: ["Possible unit digits of a prime", "1, 2, 3, 5, 7, 9", "Six digits; 0, 4, 6, 8 give an even number above 2"] },
          { cells: ["Smallest odd composite", "9", "1 is neither; 3, 5, 7 are prime"] },
          { cells: ["A product of two composites can be coprime", "True", "4 and 9 share no prime factor"] },
        ],
        caption:
          "Nine rows CDS asks about directly. The 25-below-100 count and the six possible unit digits are pure recall.",
      },
      selfCheckExample: {
        prompt:
          "How many primes lie strictly between 50 and 100, and what is that count subtracted from the number of primes below 50?",
        steps: [
          "Primes below 100 number 25; primes below 50 number 15.",
          "So primes between 50 and 100 number \\(25-15 = 10\\): 53, 59, 61, 67, 71, 73, 79, 83, 89, 97.",
          "The requested difference is \\(15-10 = 5\\).",
        ],
        answer: "Ten primes between 50 and 100, and the difference is \\(5\\).",
      },
      practiceSet: [
        { prompt: "Is 1 prime, composite, or neither?", answer: "Neither" },
        { prompt: "How many primes are below 100?", answer: "\\(25\\)" },
        { prompt: "The only even prime?", answer: "\\(2\\)" },
        { prompt: "Can two composite numbers be coprime?", answer: "Yes", method: "e.g. 4 and 9" },
      ],
      pyqExampleId: "29d48dc0-a2d5-41ff-b673-a3d6b029b4c0", // 2017 — number of primes less than 100
      traps: [
        {
          title: "Coprime does not mean prime",
          body:
            "\\(4\\) and \\(9\\) are coprime and both composite; \\(3\\) and \\(4\\) are coprime with one of each. \"Relatively prime\" is a statement about the **pair**, not about either number, so every combination of prime and composite is possible — which is exactly what the 2019 and 2016 statement questions test.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-primality-testing",
      name: "Testing a number for primality by trial division",
      intuition:
        "To check whether \\(n\\) is prime you only need to try prime divisors up to \\(\\sqrt{n}\\). If \\(n=ab\\) with both factors above \\(\\sqrt{n}\\), their product would exceed \\(n\\) — so one factor must be at or below the square root.",
      definition:
        "To test \\(n\\): divide by each **prime** \\(p\\) with \\(p \\le \\sqrt{n}\\). If none divides \\(n\\), then \\(n\\) is prime.\n" +
        "- Only primes need testing, since any composite divisor carries a smaller prime one.\n" +
        "- Useful square-root landmarks: \\(\\sqrt{400}=20\\), \\(\\sqrt{900}=30\\), \\(\\sqrt{1600}=40\\), \\(\\sqrt{2500}=50\\).\n" +
        "So a three-digit number needs primes only up to 31, and a number below 2500 only up to 47.",
      formula: {
        label: "Trial-division bound",
        latex: "n \\text{ is prime} \\iff p \\nmid n \\ \\text{ for every prime } p \\le \\sqrt{n}",
      },
      authoredExample: {
        prompt: "Is 391 prime?",
        steps: [
          "\\(\\sqrt{391} \\approx 19.8\\), so test the primes up to 19: 2, 3, 5, 7, 11, 13, 17, 19.",
          "391 is odd (not 2), digit sum 13 (not 3), does not end in 0 or 5 (not 5).",
          "\\(391/7 = 55.86\\), \\(391/11 = 35.5\\), \\(391/13 = 30.1\\) — none exact.",
          "\\(391/17 = 23\\) exactly. So \\(391 = 17\\times 23\\).",
        ],
        answer: "Not prime: \\(391 = 17 \\times 23\\).",
      },
      selfCheckExample: {
        prompt: "Is 211 prime?",
        steps: [
          "\\(\\sqrt{211} \\approx 14.5\\), so test 2, 3, 5, 7, 11, 13 only.",
          "211 is odd; digit sum \\(2+1+1=4\\) is not a multiple of 3; it does not end in 0 or 5.",
          "\\(211/7 = 30.14\\), \\(211/11 = 19.18\\), \\(211/13 = 16.23\\) — none exact.",
          "Every prime up to the bound has failed, so 211 is prime.",
        ],
        answer: "Yes, 211 is prime.",
      },
      practiceSet: [
        { prompt: "Highest prime you must test for \\(n=500\\)?", answer: "\\(19\\)", method: "\\(\\sqrt{500}\\approx 22.4\\), so up to 19" },
        { prompt: "Is 143 prime?", answer: "No", method: "\\(11\\times 13\\)" },
        { prompt: "Is 97 prime?", answer: "Yes" },
        { prompt: "Why test only primes, not all integers?", answer: "A composite divisor carries a smaller prime one" },
      ],
      pyqExampleId: "0b1f17b8-2db4-402b-a757-4370cda1b569", // 2023 — how many of 437, 797, 1073 are prime
      traps: [
        {
          title: "Numbers near 400 or 1000 look prime and often are not",
          body:
            "\\(437 = 19\\times 23\\) and \\(1073 = 29\\times 37\\) both survive every easy test — odd, not a multiple of 3, not ending in 5 — and fail only at a two-digit prime. Push the trial division all the way to \\(\\sqrt{n}\\); stopping at 13 because \"nothing small worked\" is how both of those get called prime.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-one-must-be-two",
      name: "Forcing a prime to be 2 with a parity argument",
      intuition:
        "Every prime except 2 is odd. So the moment a question's arithmetic demands an even value where only odd primes are available, one of the primes has to be 2 — and that usually pins the whole problem down in a line.",
      definition:
        "The argument in its usual forms:\n" +
        "- **Odd total.** A sum of two primes is odd only if one of them is even, i.e. equals 2.\n" +
        "- **Odd count.** Three odd primes sum to an odd number; if the target is even, one prime is 2.\n" +
        "- **Even product.** If a product of primes is even, one factor is 2.\n" +
        "- **Both sum and difference prime.** If \\(x\\) and \\(y\\) are odd primes then \\(x+y\\) and \\(x-y\\) are both even, and they cannot both be 2 — so one of \\(x, y\\) is 2.",
      formula: {
        label: "The forcing rule",
        latex: "p+q \\text{ odd (with } p,q \\text{ prime)} \\;\\Longrightarrow\\; \\{p,q\\} \\ni 2",
      },
      authoredExample: {
        prompt: "The sum of two primes is 45. Find them.",
        steps: [
          "45 is odd. A sum of two odd numbers is even, so the two primes cannot both be odd.",
          "The only even prime is 2, so one of them is 2.",
          "The other is \\(45-2 = 43\\), and 43 is prime (test up to \\(\\sqrt{43}\\approx 6.6\\): not divisible by 2, 3 or 5).",
        ],
        answer: "\\(2\\) and \\(43\\).",
      },
      selfCheckExample: {
        prompt:
          "For which primes \\(p\\) are \\(p\\), \\(p+2\\) and \\(p+4\\) all prime?",
        steps: [
          "Among any three integers spaced 2 apart, one is a multiple of 3 — because \\(p, p+2, p+4\\) cover all three residues modulo 3.",
          "So one of them is divisible by 3, and to still be prime it must **equal** 3.",
          "Taking \\(p=3\\) gives 3, 5, 7 — all prime. Taking \\(p+2=3\\) or \\(p+4=3\\) forces \\(p\\le 1\\), impossible.",
          "So \\(p=3\\) is the only case.",
        ],
        answer: "Only \\(p=3\\), giving the triple \\(3, 5, 7\\).",
      },
      practiceSet: [
        { prompt: "Sum of two primes is 21. Find them.", answer: "\\(2\\) and \\(19\\)" },
        { prompt: "If \\(pq\\) is even and both are prime, what is one of them?", answer: "\\(2\\)" },
        { prompt: "Can two odd primes differ by 2 and sum to an odd number?", answer: "No", method: "odd + odd is even" },
        { prompt: "Sum of three primes is 100. Which prime must be present?", answer: "\\(2\\)", method: "Three odds sum to odd" },
      ],
      pyqExampleId: "10dcf016-4c41-4aa2-b881-fc6208b8c56c", // 2019 — sum of three primes is 100, one exceeds another by 36
      traps: [
        {
          title: "Having forced the 2, still check the survivor is prime",
          body:
            "The parity step tells you one prime is 2; it does not tell you the rest works. For a sum of 45 you still verify 43 is prime. And when the answer options list values that never occur — as in the 2019 question whose three primes are 2, 31 and 67 while the options offer 17, 29 and 43 — \"none of these\" is the intended answer, not a sign you slipped.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-coprimality",
      name: "Coprimality and Euclid's lemma",
      intuition:
        "Two numbers are coprime when they share no prime factor. That single idea does a lot of work: consecutive integers are always coprime, and a prime dividing a product must divide one of the factors.",
      definition:
        "\\(a\\) and \\(b\\) are **coprime** when \\(\\gcd(a,b)=1\\).\n" +
        "- **Consecutive integers** are always coprime: any common divisor divides their difference, which is 1.\n" +
        "- If \\(p\\) is coprime to both \\(q\\) and \\(r\\), it is coprime to \\(qr\\) — no new prime factor appears in a product.\n" +
        "- **Euclid's lemma:** if a **prime** \\(p\\) divides \\(qr\\) then \\(p \\mid q\\) or \\(p \\mid r\\). This needs \\(p\\) prime: \\(4 \\mid 2\\times 6\\) but \\(4\\) divides neither.\n" +
        "- If \\(a \\mid cd\\) and \\(\\gcd(a,c)=1\\), then \\(a \\mid d\\).",
      formula: {
        label: "Coprimality via the difference",
        latex: "\\gcd(n,\\,n+1)=1 \\quad\\text{for every integer } n",
      },
      authoredExample: {
        prompt: "Show that \\(n\\) and \\(2n+1\\) are coprime for every positive integer \\(n\\).",
        steps: [
          "Let \\(d\\) divide both \\(n\\) and \\(2n+1\\).",
          "Then \\(d\\) divides \\(2n\\) (twice the first), so it divides \\((2n+1)-2n = 1\\).",
          "The only positive divisor of 1 is 1, so \\(d=1\\).",
          "Hence \\(\\gcd(n,\\,2n+1)=1\\) always. Check \\(n=4\\): \\(\\gcd(4,9)=1\\).",
        ],
        answer: "They are always coprime.",
      },
      selfCheckExample: {
        prompt:
          "If \\(p\\) divides \\(qr\\) and \\(p\\) divides \\(q\\), must \\(p\\) divide \\(r\\)?",
        steps: [
          "No. The hypothesis gives no reason for \\(r\\) to carry any factor of \\(p\\).",
          "Counterexample: \\(p=2\\), \\(q=2\\), \\(r=3\\). Then \\(p \\mid qr = 6\\) and \\(p \\mid q\\), yet \\(2 \\nmid 3\\).",
          "Euclid's lemma says the prime divides **at least one** factor — it is already satisfied by \\(q\\), so nothing follows about \\(r\\).",
        ],
        answer: "No — \\(p=2,\\ q=2,\\ r=3\\) is a counterexample.",
      },
      practiceSet: [
        { prompt: "\\(\\gcd(15,16)\\)?", answer: "\\(1\\)" },
        { prompt: "Are 21 and 22 coprime?", answer: "Yes", method: "Consecutive" },
        { prompt: "Does Euclid's lemma hold for \\(p=4\\)?", answer: "No", method: "\\(4\\mid 2\\times 6\\) but divides neither" },
        { prompt: "\\(a\\mid cd\\), \\(\\gcd(a,c)=1\\). What follows?", answer: "\\(a \\mid d\\)" },
      ],
      pyqExampleId: "e76d669f-ccd3-4656-ad11-4ca7d5eb08aa", // 2019 — statements on relatively prime p, q, r
      traps: [
        {
          title: "Euclid's lemma needs the divisor to be PRIME",
          body:
            "\"If \\(p \\mid qr\\) then \\(p\\mid q\\) or \\(p \\mid r\\)\" is false for composite \\(p\\): \\(4\\) divides \\(2\\times 6 = 12\\) but divides neither 2 nor 6. CDS plants exactly this by dropping the word prime from the statement.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsns-prime-forms-and-gaps",
      name: "Forms that look like they generate primes but do not",
      intuition:
        "Several formulas produce long runs of primes and then fail. CDS sets these as \"which statement is not true\" questions, so the examinable content is the **counterexample**, not the pattern. Memorise the first failure of each form.",
      definition:
        "The distinction that matters is direction:\n" +
        "- Every prime greater than 3 **is** of the form \\(6n\\pm1\\) — that direction is true.\n" +
        "- But a number of the form \\(6n\\pm1\\) **need not** be prime. The converse fails, and confusing the two directions is the whole trap.\n" +
        "Twin primes are pairs differing by 2; a prime **triple** spaced by 2 exists only once, as \\(3,5,7\\).",
      table: {
        columns: ["Form or claim", "Always prime?", "First failure"],
        rows: [
          { cells: ["\\(6n-1\\)", "No", "\\(n=6\\) gives \\(35=5\\times 7\\)"] },
          { cells: ["\\(6n+1\\)", "No", "\\(n=4\\) gives \\(25=5^2\\)"] },
          {
            cells: ["Every prime \\(>3\\) is \\(6n\\pm1\\)", "True", "This is the valid direction"],
            noteAmber:
              "True one way, false the other. The question always tests the false direction.",
          },
          { cells: ["\\(2^n-1\\) (Mersenne)", "No", "\\(n=11\\) gives \\(2047=23\\times 89\\)"] },
          { cells: ["\\(n^2+n+41\\)", "No", "\\(n=40\\) gives \\(1681=41^2\\)"] },
          {
            cells: ["Product of first \\(n\\) primes, plus 1", "No", "\\(n=6\\) gives \\(30031=59\\times 509\\)"],
            noteAmber:
              "It is prime for \\(n=1\\) to \\(5\\) — 3, 7, 31, 211, 2311 — which is why the statement looks safe.",
          },
          { cells: ["Prime triples spaced by 2", "Only once", "\\(3,5,7\\); one of any such triple is a multiple of 3"] },
          { cells: ["Difference of two primes \\(>2\\)", "Always even", "Both are odd"] },
        ],
        caption:
          "Learn the failure, not the pattern. Each right-hand entry is a complete answer to a statement question.",
      },
      selfCheckExample: {
        prompt:
          "How many numbers of the form \\(2^n-1\\) below 100 are prime?",
        steps: [
          "\\(2^n-1 < 100\\) needs \\(n \\le 6\\), since \\(2^7-1 = 127\\).",
          "The values are \\(1, 3, 7, 15, 31, 63\\) for \\(n = 1,\\dots,6\\).",
          "Discard 1 (neither), 15 \\(=3\\times5\\) and 63 \\(=7\\times9\\).",
          "That leaves 3, 7 and 31 — three primes.",
        ],
        answer: "Three: \\(3\\), \\(7\\) and \\(31\\).",
      },
      practiceSet: [
        { prompt: "Is \\(6n+1\\) always prime?", answer: "No", method: "\\(n=4\\) gives 25" },
        { prompt: "Is every prime above 3 of the form \\(6n\\pm1\\)?", answer: "Yes" },
        { prompt: "First composite Mersenne number \\(2^n-1\\)?", answer: "\\(2047\\)", method: "\\(n=11\\)" },
        { prompt: "How many prime triples are spaced by 2?", answer: "One", method: "\\(3,5,7\\)" },
      ],
      pyqExampleId: "8403820d-e972-45f3-9480-2b85d9212986", // 2019 — which statement is not true (6n-1)
      traps: [
        {
          title: "The converse of a true statement about primes is usually false",
          body:
            "Every prime above 3 has the form \\(6n\\pm1\\), so it is tempting to accept \"\\(6n-1\\) is always prime\". It is not — \\(35\\) settles it. Whenever a statement about primes reads like a generating rule, look for the first small counterexample rather than checking a few cases that work.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-prime-factorisation-by-trial",
      name: "Breaking a number into its prime factors",
      intuition:
        "Divide out the small primes in order, and stop as soon as the remaining quotient is below the square of your current divisor — at that point the quotient is itself prime. Working upwards in order is what keeps this fast and complete.",
      definition:
        "Every integer above 1 factorises into primes in exactly one way (the fundamental theorem of arithmetic).\n" +
        "Procedure: try \\(2, 3, 5, 7, 11, 13, \\ldots\\) in turn, dividing out each prime as many times as it goes, and **stop when the remaining quotient is less than the square of the next prime** — the quotient is then prime.\n" +
        "The alternating-sum test for 11 is worth having ready here, because 11 is the first divisor that no other quick rule catches.",
      formula: {
        label: "Unique factorisation",
        latex: "N = p_1^{a_1} p_2^{a_2}\\cdots p_k^{a_k} \\quad\\text{uniquely}",
      },
      authoredExample: {
        prompt: "Find the distinct prime factors of 2431.",
        steps: [
          "Not even; digit sum \\(2+4+3+1=10\\) so not a multiple of 3; does not end in 0 or 5.",
          "Test 7: \\(2431/7 = 347.28\\ldots\\), no. Test 11 by alternating sum from the units digit: \\(1-3+4-2 = 0\\), a multiple of 11 — so 11 divides it.",
          "\\(2431/11 = 221\\). Now factor 221: not 2, 3, 5, 7, 11, 13? \\(221/13 = 17\\) exactly.",
          "So \\(2431 = 11 \\times 13 \\times 17\\), and since \\(17^2 = 289 > 17\\) we are done.",
        ],
        answer: "\\(11\\), \\(13\\) and \\(17\\).",
      },
      selfCheckExample: {
        prompt: "Factorise 1729 into primes.",
        steps: [
          "Odd; digit sum 19, so not a multiple of 3; does not end in 0 or 5.",
          "Test 7: \\(1729/7 = 247\\) exactly.",
          "Factor 247: alternating sum \\(7-4+2 = 5\\) so not 11; \\(247/13 = 19\\) exactly.",
          "So \\(1729 = 7\\times 13\\times 19\\). (This is also the famous \\(1^3+12^3 = 9^3+10^3\\).)",
        ],
        answer: "\\(1729 = 7 \\times 13 \\times 19\\).",
      },
      practiceSet: [
        { prompt: "Factorise 360.", answer: "\\(2^3\\times 3^2\\times 5\\)" },
        { prompt: "Factorise 1001.", answer: "\\(7\\times 11\\times 13\\)" },
        { prompt: "11-test on 2431?", answer: "Divisible", method: "Alternating sum \\(=0\\)" },
        { prompt: "Factorise 2231.", answer: "\\(23\\times 97\\)" },
      ],
      pyqExampleId: "8ba3c305-dfbe-4c87-a67e-36b4bb554c75", // 2021 — distinct prime factors of 26381
      traps: [
        {
          title: "The LCM of two distinct primes is their product",
          body:
            "Given \"the LCM of two primes is 2231\", do not search: two distinct primes share no factor, so their LCM **is** \\(pq\\). Factorising \\(2231 = 23\\times 97\\) answers the question immediately. If the two primes were equal the LCM would be the prime itself, so a composite LCM guarantees they are distinct.",
        },
      ],
    },
  ],
  related: [
    { label: "Factors, divisor counting and trailing zeros", href: "/notes/cds-maths/number-system/cds-ns-factors-divisors" },
    { label: "HCF and LCM laws and fractions", href: "/notes/cds-maths/number-system/cds-ns-hcf-lcm-laws" },
  ],
};
