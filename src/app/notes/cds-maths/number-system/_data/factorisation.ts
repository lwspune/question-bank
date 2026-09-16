import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_NS_FACTORISATION_NOTE: SubtopicNote = {
  subtopicName: "Divisibility by Factorisation",
  title: "Divisibility by Factorisation",
  oneLineDefinition:
    "Proving what divides a huge expression by factorising it instead of evaluating it — pulling the smallest power out of a sum of like powers, and using the standard a-to-the-n plus-or-minus-b-to-the-n identities.",
  whyItMatters:
    "Sixteen PYQs and 38% of them HARD — the densest HARD unit in the chapter. But the difficulty is entirely in recognising the shape: every question here is a one-line factorisation followed by reading off a prime factor. The power-sum extraction alone appears six times across the chapter and is the signature CDS pattern in this topic.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsns-common-factor-extraction",
      name: "Pulling the smallest power out of a sum of like powers",
      intuition:
        "When several terms share a base, factor out the **lowest** power. What remains is a small integer you can factorise by hand, and that integer carries every odd prime divisor of the whole expression. A thirty-digit number becomes a two-digit one.",
      definition:
        "For terms with a common base \\(a\\),\n" +
        "\\[a^{m}+a^{m+1}+\\cdots+a^{m+k} = a^{m}\\left(1+a+a^{2}+\\cdots+a^{k}\\right).\\]\n" +
        "- The bracket is a short geometric sum — compute it as an ordinary number and factorise it.\n" +
        "- The power \\(a^{m}\\) contributes only the primes already in \\(a\\), so any **new** prime divisor must come from the bracket.\n" +
        "- Subtraction works the same way: signs just change the bracket, as in \\(3^{81}-3^{80}-3^{79} = 3^{79}(9-3-1) = 5\\cdot 3^{79}\\).",
      formula: {
        label: "Power-sum extraction",
        latex: "a^{m}+a^{m+1}+\\cdots+a^{m+k}=a^{m}\\!\\left(1+a+\\cdots+a^{k}\\right)",
      },
      authoredExample: {
        prompt: "\\(7^{20}+7^{21}+7^{22}\\) is divisible by which numbers?",
        steps: [
          "Factor out the lowest power: \\(7^{20}\\left(1+7+49\\right)\\).",
          "The bracket is \\(57\\).",
          "Factorise it: \\(57 = 3\\times 19\\).",
          "So the expression is \\(7^{20}\\cdot 3\\cdot 19\\), divisible by 3, 19, 57 and every power of 7 up to \\(7^{20}\\) — but by no other new prime.",
        ],
        answer: "Divisible by \\(3\\), \\(19\\) and \\(57\\) (and by powers of 7).",
      },
      selfCheckExample: {
        prompt: "\\(2^{10}+2^{11}+2^{12}+2^{13}\\) is divisible by which odd number?",
        steps: [
          "Factor out \\(2^{10}\\): \\(2^{10}\\left(1+2+4+8\\right)\\).",
          "The bracket is \\(15\\).",
          "So the expression equals \\(2^{10}\\times 15 = 2^{10}\\cdot 3\\cdot 5\\).",
          "Since \\(2^{10}\\) contributes no odd factor, the odd divisors come entirely from 15 — so 3, 5 and 15.",
        ],
        answer: "\\(15\\) (and hence 3 and 5).",
      },
      practiceSet: [
        { prompt: "\\(5^{17}+5^{18}+5^{19}+5^{20}\\): the bracket?", answer: "\\(156\\)", method: "\\(1+5+25+125\\)" },
        { prompt: "Factorise 156.", answer: "\\(2^2\\cdot3\\cdot13\\)" },
        { prompt: "\\(4^{61}+\\cdots+4^{64}\\): the bracket?", answer: "\\(85=5\\times17\\)" },
        { prompt: "\\(3^{x}+3^{x+1}+3^{x+2}\\) equals?", answer: "\\(13\\cdot 3^{x}\\)" },
      ],
      pyqExampleId: "99e6dd13-39a4-4b9a-8797-2bdc3a7f5521", // 2018 — 5^17 + 5^18 + 5^19 + 5^20 is divisible by
      traps: [
        {
          title: "A new prime can only come from the bracket",
          body:
            "\\(2^{122}+2^{124}+2^{126}+2^{128}+2^{130} = 2^{122}\\times 341\\), and \\(341 = 11\\times 31\\). The answer is 11 — the power of 2 cannot supply an odd factor, so checking the bracket alone is both necessary and sufficient. Students who try to test the whole number for divisibility by 11 get nowhere.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-an-minus-bn",
      name: "The a-to-the-n minus b-to-the-n identity",
      intuition:
        "\\(a^{n}-b^{n}\\) always has \\(a-b\\) as a factor, whatever \\(n\\) is. And when \\(n\\) is **even** it also has \\(a+b\\), because you can view it as a difference of squares. So two divisors come for free.",
      definition:
        "For all positive integers \\(n\\),\n" +
        "\\[(a-b) \\mid \\left(a^{n}-b^{n}\\right).\\]\n" +
        "- If \\(n\\) is **even**, then \\(a^{n}-b^{n} = (a^{2})^{n/2}-(b^{2})^{n/2}\\) is also divisible by \\(a^{2}-b^{2}\\), hence by \\(a+b\\).\n" +
        "- More generally \\(a^{m}-b^{m}\\) divides \\(a^{n}-b^{n}\\) whenever \\(m \\mid n\\).\n" +
        "- **Rewrite to expose the shape:** \\(5^{2n}-2^{3n} = 25^{n}-8^{n}\\), so the free factor is \\(25-8=17\\).",
      formula: {
        label: "Difference of like powers",
        latex: "a^{n}-b^{n}=(a-b)\\left(a^{n-1}+a^{n-2}b+\\cdots+b^{n-1}\\right)",
      },
      authoredExample: {
        prompt: "Show that \\(6^{10}-4^{10}\\) is divisible by both 2 and 10.",
        steps: [
          "The identity gives \\((a-b) = 6-4 = 2\\) as a factor immediately.",
          "The exponent 10 is even, so \\(6^{10}-4^{10} = (6^2)^5-(4^2)^5\\) is divisible by \\(6^2-4^2 = 20\\), and hence by \\(a+b = 10\\).",
          "So both 2 and 10 divide it.",
          "Quick check on the last digit: \\(6^{10}\\) ends in 6 and \\(4^{10}\\) ends in 6, so the difference ends in 0 — consistent with divisibility by 10.",
        ],
        answer: "Yes to both: \\(a-b=2\\) always, and \\(a+b=10\\) because the exponent is even.",
      },
      selfCheckExample: {
        prompt: "Is \\(9^{15}-4^{15}\\) divisible by 5? Is it divisible by 13?",
        steps: [
          "\\(a-b = 9-4 = 5\\), so 5 divides it for any exponent.",
          "For 13 we would need \\(a+b = 13\\) to be a factor, which requires the exponent to be **even**. Here 15 is odd, so that route is unavailable.",
          "Test it: \\(9^{15}\\) ends in 9 (odd power of 9) and \\(4^{15}\\) ends in 4, so the difference ends in 5 — not enough to settle 13, but the identity gives no reason for it.",
          "In fact \\(a+b\\) divides \\(a^{n}-b^{n}\\) only for even \\(n\\), so 13 is not guaranteed.",
        ],
        answer: "Divisible by 5 always; not guaranteed for 13, since 15 is odd.",
      },
      practiceSet: [
        { prompt: "Free factor of \\(97^{30}-14^{30}\\) from \\(a-b\\)?", answer: "\\(83\\)" },
        { prompt: "Does \\(a+b\\) divide \\(a^{30}-b^{30}\\)?", answer: "Yes", method: "30 is even" },
        { prompt: "Rewrite \\(5^{2n}-2^{3n}\\).", answer: "\\(25^{n}-8^{n}\\)" },
        { prompt: "\\(5^{2n}-1\\) is always divisible by?", answer: "\\(24\\)", method: "\\(25^n-1\\)" },
      ],
      pyqExampleId: "7429272c-d3e5-4939-a8a7-0150e37f6f1d", // 2019 — 5^2n - 2^3n has a factor
      traps: [
        {
          title: "a plus b needs an EVEN exponent for a difference",
          body:
            "\\(97^{30}-14^{30}\\) is divisible by \\(97^2-14^2 = 9213 = 3\\times37\\times83\\) precisely because 30 is even — which is how 37 and 83 both appear. For an odd exponent only \\(a-b\\) is available. Check the parity before claiming \\(a+b\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-an-plus-bn",
      name: "The a-to-the-n plus b-to-the-n identity",
      intuition:
        "A **sum** of like powers factorises only when the exponent is odd, and then \\(a+b\\) is a factor. This is the mirror image of the difference rule and the parity condition is reversed, which is the whole trap.",
      definition:
        "For **odd** \\(n\\),\n" +
        "\\[(a+b) \\mid \\left(a^{n}+b^{n}\\right).\\]\n" +
        "- For **even** \\(n\\) this fails: \\(a^{2}+b^{2}\\) has no such factorisation over the integers.\n" +
        "- The quick way to spot it: add the two bases and see whether the result is one of the options. \\(41+43 = 84\\); \\(67+33 = 100\\); \\(327+173 = 500\\).\n" +
        "- Both terms being odd also makes the sum **even**, which is a separate free divisor of 2.",
      formula: {
        label: "Sum of like powers, odd exponent",
        latex: "a^{n}+b^{n}=(a+b)\\left(a^{n-1}-a^{n-2}b+\\cdots+b^{n-1}\\right) \\quad (n \\text{ odd})",
      },
      authoredExample: {
        prompt: "Show that \\(13^{11}+12^{11}\\) is divisible by 25.",
        steps: [
          "The exponent 11 is odd, so the identity applies.",
          "Add the bases: \\(13+12 = 25\\).",
          "Hence \\(25 \\mid 13^{11}+12^{11}\\).",
          "Note that nothing about the size of the number entered — only the parity of the exponent and the sum of the bases.",
        ],
        answer: "Because \\(a+b = 25\\) and the exponent is odd.",
      },
      selfCheckExample: {
        prompt: "Is \\(7^{9}+3^{9}\\) divisible by 10? Would \\(7^{8}+3^{8}\\) be?",
        steps: [
          "For the first: 9 is odd and \\(7+3 = 10\\), so yes, 10 divides \\(7^{9}+3^{9}\\).",
          "Confirm by unit digits: \\(7^{9}\\) ends in 7 (since \\(9\\equiv1 \\bmod 4\\)) and \\(3^{9}\\) ends in 3, so the sum ends in 0.",
          "For the second the exponent 8 is even, so the identity does not apply.",
          "Check: \\(7^{8}\\) ends in 1 and \\(3^{8}\\) ends in 1, so \\(7^{8}+3^{8}\\) ends in 2 — not divisible by 10.",
        ],
        answer:
          "Yes for the odd exponent; no for the even one, which ends in 2.",
      },
      practiceSet: [
        { prompt: "\\(41^{43}+43^{43}\\) is divisible by?", answer: "\\(84\\)" },
        { prompt: "\\(67^{5}+33^{5}\\) is divisible by?", answer: "\\(100\\)" },
        { prompt: "Does \\(a+b\\) divide \\(a^{6}+b^{6}\\)?", answer: "No", method: "Exponent must be odd" },
        { prompt: "\\(327^{n}+173^{n}\\) divisible by 500 when?", answer: "\\(n\\) odd" },
      ],
      pyqExampleId: "1479cdc5-0a31-4be9-a832-bfd85d87a3fe", // 2022 — 41^43 + 43^43 is divisible by
      traps: [
        {
          title: "The parity conditions for a sum and a difference are opposite",
          body:
            "\\(a-b\\) divides a **difference** for every exponent; \\(a+b\\) divides a **sum** only for an **odd** exponent. Swapping these is the single commonest error in this unit. Write down which you have — sum or difference — then check the exponent's parity against the right rule.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-rewrite-to-common-base",
      name: "Rewriting mixed bases as powers of one number",
      intuition:
        "An expression mixing 2, 4 and 8, or 3, 9 and 27, is really a single-base expression in disguise. Convert everything to the smallest base first; the power-sum extraction then applies and the whole thing collapses.",
      definition:
        "Replace every composite base by a power of the common base: \\(4 = 2^2\\), \\(8 = 2^3\\), \\(9 = 3^2\\), \\(27 = 3^3\\), \\(25 = 5^2\\).\n" +
        "- Multiply the exponents: \\(4^{62} = \\left(2^{2}\\right)^{62} = 2^{124}\\).\n" +
        "- Then sort the terms by exponent and factor out the lowest.\n" +
        "- For bases that share a factor without being powers of each other (555 and 777, both multiples of 3 and 37), factor the **bases** instead and look for a common divisor.",
      formula: {
        label: "Rebasing",
        latex: "\\left(a^{j}\\right)^{k}=a^{jk}",
      },
      authoredExample: {
        prompt: "Simplify \\(4^{15}+8^{10}\\) to a single power of 2.",
        steps: [
          "Rebase: \\(4^{15} = \\left(2^{2}\\right)^{15} = 2^{30}\\).",
          "And \\(8^{10} = \\left(2^{3}\\right)^{10} = 2^{30}\\).",
          "So the sum is \\(2^{30}+2^{30} = 2\\cdot 2^{30}\\).",
          "That is \\(2^{31}\\) — the expression has no odd prime factor at all.",
        ],
        answer: "\\(2^{31}\\).",
      },
      selfCheckExample: {
        prompt: "Factorise \\(9^{8}+27^{5}\\).",
        steps: [
          "Rebase to powers of 3: \\(9^{8} = 3^{16}\\) and \\(27^{5} = 3^{15}\\).",
          "So the sum is \\(3^{16}+3^{15}\\).",
          "Factor out the lower power: \\(3^{15}(3+1) = 4\\cdot 3^{15}\\).",
          "So it is divisible by 4 and by every power of 3 up to \\(3^{15}\\), and by no other prime.",
        ],
        answer: "\\(4\\cdot 3^{15}\\).",
      },
      practiceSet: [
        { prompt: "\\(4^{62}\\) as a power of 2?", answer: "\\(2^{124}\\)" },
        { prompt: "\\(27^{27}\\) as a power of 3?", answer: "\\(3^{81}\\)" },
        { prompt: "\\(27^{5}+3^{13}\\) factorised?", answer: "\\(10\\cdot 3^{13}\\)" },
        { prompt: "Common factors of 555 and 777?", answer: "\\(3\\) and \\(37\\)" },
      ],
      pyqExampleId: "7917120d-2e25-4bea-a509-e5040607e444", // 2016 — 2^122 + 4^62 + 8^42 + 4^64 + 2^130
      traps: [
        {
          title: "Rebase before you sort, and sort before you factor",
          body:
            "\\(2^{122}+4^{62}+8^{42}+4^{64}+2^{130}\\) looks like five unrelated terms. Rebasing gives \\(2^{122},2^{124},2^{126},2^{128},2^{130}\\) — an evenly spaced run — and factoring out \\(2^{122}\\) leaves \\(1+4+16+64+256 = 341 = 11\\times31\\). Attempting to factor before rebasing gets nowhere.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-largest-always-divisor",
      name: "The largest number that ALWAYS divides an expression",
      intuition:
        "\"Always divides\" is a claim about every value of the variable — so the answer can be no larger than the value at the **smallest** admissible input. Compute that one case first; it caps the answer, and usually equals it.",
      definition:
        "To find the largest \\(d\\) dividing \\(f(n)\\) for **all** admissible \\(n\\):\n" +
        "- factor \\(f(n)\\) to get a guaranteed divisor;\n" +
        "- evaluate \\(f\\) at the smallest admissible \\(n\\) — the answer must divide that number, which caps it;\n" +
        "- confirm the cap is attained.\n" +
        "Watch the **domain**: \"natural number\" usually starts at 1, but \"whole number\" includes 0, and that single difference changes the answer.",
      formula: {
        label: "The cap from the smallest case",
        latex: "d \\mid f(n)\\ \\forall n \\;\\Longrightarrow\\; d \\mid f(n_{\\min})",
      },
      authoredExample: {
        prompt:
          "What is the largest number that always divides \\(5^{x}+5^{x+1}\\) for every natural number \\(x\\)?",
        steps: [
          "Factor: \\(5^{x}+5^{x+1} = 5^{x}(1+5) = 6\\cdot 5^{x}\\).",
          "For \\(x \\ge 1\\) this is divisible by \\(6\\times 5 = 30\\).",
          "Now cap it with the smallest case \\(x=1\\): the value is \\(5+25 = 30\\), so no number above 30 can always divide it.",
          "The cap is attained, so the answer is 30.",
        ],
        answer: "\\(30\\).",
      },
      selfCheckExample: {
        prompt:
          "What is the largest number that always divides \\(7^{n}-1\\) for every natural number \\(n\\)?",
        steps: [
          "The smallest case \\(n=1\\) gives \\(7-1 = 6\\), so the answer is at most 6.",
          "Does 6 always work? Since \\(7 \\equiv 1 \\pmod 6\\), we get \\(7^{n}\\equiv 1\\), so \\(6 \\mid 7^{n}-1\\) for every \\(n\\).",
          "The cap is attained.",
          "So the answer is 6 — even though \\(7^2-1 = 48\\) is divisible by much more.",
        ],
        answer: "\\(6\\).",
      },
      practiceSet: [
        { prompt: "Largest always dividing \\(3^{x}+3^{x+1}+3^{x+2}\\), \\(x\\ge1\\)?", answer: "\\(39\\)", method: "\\(13\\cdot 3^x\\), capped at \\(x=1\\)" },
        { prompt: "How many natural divisors does \\(5^{2n}-1\\) always have?", answer: "\\(8\\)", method: "It is always \\(24\\)-divisible, and equals 24 at \\(n=1\\)" },
        { prompt: "Does 'whole number' include 0?", answer: "Yes" },
        { prompt: "Largest always dividing \\(2^{n}-1\\)?", answer: "\\(1\\)", method: "\\(n=1\\) gives 1" },
      ],
      pyqExampleId: "cde1cf78-6b55-4b60-ba42-e95a6e5c04e6", // 2020 — largest divisor of 3^x + 3^(x+1) + 3^(x+2)
      traps: [
        {
          title: "Whole numbers include zero, and that can break the statement",
          body:
            "\\(5\\cdot 8^{m}+2^{3m} = 6\\cdot 8^{m}\\), which is divisible by 48 for every \\(m \\ge 1\\) — but at \\(m=0\\) it equals 6, and 6 is not divisible by 48. Since \"whole numbers\" include 0, the statement is false. Always test the smallest value the stated domain actually permits.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-polynomial-divisibility",
      name: "When a variable divides a polynomial in itself",
      intuition:
        "If every term of a polynomial except the constant already has a factor of \\(x\\), then \\(x\\) divides the whole thing exactly when \\(x\\) divides the **constant**. So the question collapses to listing the divisors of one small number.",
      definition:
        "For a polynomial with integer coefficients,\n" +
        "\\[x \\mid \\left(a_kx^{k}+\\cdots+a_1x+c\\right) \\iff x \\mid c.\\]\n" +
        "- Every term containing \\(x\\) is automatically divisible by \\(x\\); only the constant can obstruct.\n" +
        "- So the count of valid positive \\(x\\) is the number of **positive divisors of \\(c\\)**.\n" +
        "- The same reasoning read backwards handles \\(\\frac{f(m)+n}{m}\\): it is an integer exactly when \\(m \\mid n\\).",
      formula: {
        label: "Constant-term criterion",
        latex: "x \\mid \\left(a_kx^{k}+\\cdots+a_1x+c\\right) \\iff x \\mid c",
      },
      authoredExample: {
        prompt:
          "For how many positive integers \\(x\\) is \\(x^{2}+3x+12\\) exactly divisible by \\(x\\)?",
        steps: [
          "Both \\(x^{2}\\) and \\(3x\\) are divisible by \\(x\\) whatever \\(x\\) is.",
          "So \\(x \\mid x^{2}+3x+12\\) holds exactly when \\(x \\mid 12\\).",
          "The positive divisors of 12 are \\(1, 2, 3, 4, 6, 12\\).",
          "That is 6 values.",
        ],
        answer: "\\(6\\) values of \\(x\\).",
      },
      selfCheckExample: {
        prompt:
          "For how many positive integers \\(x\\) is \\(x^{3}+5x+20\\) exactly divisible by \\(x\\)?",
        steps: [
          "\\(x^{3}\\) and \\(5x\\) are always divisible by \\(x\\).",
          "So the condition reduces to \\(x \\mid 20\\).",
          "Positive divisors of 20: \\(1, 2, 4, 5, 10, 20\\).",
          "That is 6 values. (Note it is the constant, not the degree, that fixes the count.)",
        ],
        answer: "\\(6\\) values of \\(x\\).",
      },
      practiceSet: [
        { prompt: "\\(x \\mid x^3+x^2+16\\). How many positive \\(x\\)?", answer: "\\(5\\)", method: "Divisors of 16" },
        { prompt: "\\(x\\mid x^2+7\\). How many?", answer: "\\(2\\)", method: "Divisors of 7" },
        { prompt: "\\(\\frac{3m^3+2m^2+5m+n}{m}\\) is an integer iff?", answer: "\\(m \\mid n\\)" },
        { prompt: "Does the degree affect the count?", answer: "No" },
      ],
      pyqExampleId: "027223d8-4345-4678-8823-989a6efa484b", // 2020 — x^3 + x^2 + 16 divisible by x
      traps: [
        {
          title: "Count the divisors of the constant, not the values you happen to test",
          body:
            "For \\(x^{3}+x^{2}+16\\) the condition is \\(x\\mid 16\\), giving \\(1,2,4,8,16\\) — five values. Testing \\(x=1,2,3,\\ldots\\) by substitution finds the same answers much more slowly and risks stopping early. Reduce to the constant first, then count its divisors.",
        },
      ],
    },
  ],
  related: [
    { label: "Remainders by congruence and cyclicity", href: "/notes/cds-maths/number-system/cds-ns-congruences" },
    { label: "Divisibility rules and missing digits", href: "/notes/cds-maths/number-system/cds-ns-divisibility-rules" },
  ],
};
