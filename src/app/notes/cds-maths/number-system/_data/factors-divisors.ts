import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_NS_FACTORS_DIVISORS_NOTE: SubtopicNote = {
  subtopicName: "Factors, Divisor Counting and Trailing Zeros",
  title: "Factors, Divisor Counting & Trailing Zeros",
  oneLineDefinition:
    "Everything you can read off a number's prime factorisation — how many divisors it has, what they sum to, how many are odd, and how many zeros a factorial or a big product ends in.",
  whyItMatters:
    "Twenty PYQs, four HARD. The whole unit runs on one move: write the number as a product of prime powers, then read the answer off the exponents. Counting the fives in a factorial appears six times across the chapter and is the most reliably tested single technique here.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsns-prime-factorisation-form",
      name: "Canonical prime-power form",
      intuition:
        "Before you can count anything about a number's divisors you must see it as prime powers. Everything downstream — divisor count, divisor sum, trailing zeros — is a function of the **exponents** alone, so getting the factorisation right is the whole job.",
      definition:
        "Write \\(N = p_1^{a_1}p_2^{a_2}\\cdots p_k^{a_k}\\) with distinct primes \\(p_i\\).\n" +
        "- A **divisor** of \\(N\\) is exactly a product \\(p_1^{b_1}\\cdots p_k^{b_k}\\) with \\(0 \\le b_i \\le a_i\\).\n" +
        "- **Evaluate before factorising** when the number is given as an expression: compute the value first, then factorise it, because an expression's terms rarely share the factorisation of their difference.\n" +
        "- Collect repeated primes: \\(12^6 = (2^2\\cdot3)^6 = 2^{12}3^{6}\\), which then merges with any other power of 3.",
      formula: {
        label: "Canonical form",
        latex: "N = p_1^{a_1}\\,p_2^{a_2}\\cdots p_k^{a_k}",
      },
      authoredExample: {
        prompt: "Write 1800 in canonical prime-power form.",
        steps: [
          "Divide out 2s: \\(1800 = 2\\times 900 = 4\\times 450 = 8\\times 225\\), so \\(2^3\\) comes out.",
          "Now factor 225: \\(225 = 9\\times 25\\).",
          "So \\(1800 = 2^3\\times 3^2\\times 5^2\\).",
          "Check: \\(8\\times 9\\times 25 = 1800\\).",
        ],
        answer: "\\(1800 = 2^3\\cdot 3^2\\cdot 5^2\\).",
      },
      selfCheckExample: {
        prompt: "Put \\(N = 12^{6}\\times 3^{8}\\times 5^{3}\\) into canonical form.",
        steps: [
          "Expand the composite base: \\(12 = 2^2\\cdot 3\\), so \\(12^6 = 2^{12}\\cdot 3^{6}\\).",
          "Now gather the threes: \\(3^{6}\\cdot 3^{8} = 3^{14}\\).",
          "So \\(N = 2^{12}\\cdot 3^{14}\\cdot 5^{3}\\).",
          "Note that leaving \\(12^6\\) unexpanded would hide the twos entirely and make every later count wrong.",
        ],
        answer: "\\(N = 2^{12}\\cdot 3^{14}\\cdot 5^{3}\\).",
      },
      practiceSet: [
        { prompt: "Canonical form of 96?", answer: "\\(2^5\\cdot 3\\)" },
        { prompt: "Canonical form of \\(6^4\\)?", answer: "\\(2^4\\cdot 3^4\\)" },
        { prompt: "Canonical form of 9216?", answer: "\\(2^{10}\\cdot 3^2\\)" },
        { prompt: "Canonical form of 210?", answer: "\\(2\\cdot 3\\cdot 5\\cdot 7\\)" },
      ],
      pyqExampleId: "8df1ab56-1925-4753-9997-781212f0037b", // 2025 — number of factors of 24^3 - 16^3 - 8^3
      traps: [
        {
          title: "Evaluate the expression before you factorise it",
          body:
            "For \\(24^3-16^3-8^3\\) there is no shortcut identity — compute \\(13824-4096-512 = 9216\\) and factorise that as \\(2^{10}\\cdot 3^2\\). Students who try to factor term by term and subtract exponents get nonsense, because exponents do not subtract across a difference.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-divisor-count",
      name: "Counting the divisors of a number",
      intuition:
        "Building a divisor means choosing an exponent for each prime, independently. For \\(p^a\\) there are \\(a+1\\) choices (0 up to \\(a\\)), so the total count is the product of all the \\((a_i+1)\\).",
      definition:
        "If \\(N = p_1^{a_1}\\cdots p_k^{a_k}\\) then the number of positive divisors is\n" +
        "\\[d(N) = (a_1+1)(a_2+1)\\cdots(a_k+1).\\]\n" +
        "- The count **includes** 1 and \\(N\\); subtract 2 when the question excludes them.\n" +
        "- \\(d\\) is **multiplicative** on coprime parts: \\(d(mn)=d(m)d(n)\\) when \\(\\gcd(m,n)=1\\).\n" +
        "- \\(d(N)\\) is **odd** exactly when \\(N\\) is a perfect square, since every exponent is then even.",
      formula: {
        label: "Divisor count",
        latex: "d(N)=\\prod_{i=1}^{k}(a_i+1)",
        symbols: [{ symbol: "a_i", meaning: "the exponent of the i-th prime in N" }],
      },
      authoredExample: {
        prompt: "How many positive divisors does 720 have?",
        steps: [
          "Factorise: \\(720 = 16\\times 45 = 2^4\\cdot 3^2\\cdot 5\\).",
          "The exponents are 4, 2 and 1.",
          "Apply the formula: \\(d = (4+1)(2+1)(1+1) = 5\\times 3\\times 2\\).",
          "So \\(d(720) = 30\\).",
        ],
        answer: "\\(30\\) divisors.",
      },
      selfCheckExample: {
        prompt: "How many divisors does 196 have, and why is that count odd?",
        steps: [
          "\\(196 = 4\\times 49 = 2^2\\cdot 7^2\\).",
          "So \\(d(196) = (2+1)(2+1) = 9\\).",
          "The count is odd because every exponent is even, which is exactly the condition for \\(N\\) to be a perfect square — and \\(196 = 14^2\\).",
          "The unpaired divisor is the square root, 14, which pairs with itself.",
        ],
        answer: "\\(9\\) divisors; odd because 196 is a perfect square.",
      },
      practiceSet: [
        { prompt: "\\(d(2^5\\cdot 3)\\)?", answer: "\\(12\\)" },
        { prompt: "\\(d(1000)\\)?", answer: "\\(16\\)", method: "\\(2^3\\cdot5^3\\)" },
        { prompt: "\\(d(p)\\) for a prime \\(p\\)?", answer: "\\(2\\)" },
        { prompt: "For which \\(N\\) is \\(d(N)\\) odd?", answer: "Perfect squares" },
      ],
      pyqExampleId: "10675be7-8e57-4aa9-991a-1731c1821b89", // 2018 — divisors of 38808 excluding 1 and itself
      traps: [
        {
          title: "Read whether 1 and N are to be excluded",
          body:
            "\\(d(38808)=72\\), but the question asks for divisors \"exclusive of 1 and itself\", so the answer is 70. The same trap runs on 1000: \\(d=16\\), answer 14. The formula always counts both ends — the subtraction is yours to do.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-divisor-sum",
      name: "Summing the divisors of a number",
      intuition:
        "Expanding the product \\((1+p+p^2+\\cdots)(1+q+q^2+\\cdots)\\) generates every divisor exactly once, so the product of those geometric sums **is** the sum of the divisors.",
      definition:
        "For \\(N = p_1^{a_1}\\cdots p_k^{a_k}\\),\n" +
        "\\[\\sigma(N) = \\prod_{i=1}^{k}\\left(1+p_i+p_i^{2}+\\cdots+p_i^{a_i}\\right) = \\prod_{i=1}^{k}\\frac{p_i^{a_i+1}-1}{p_i-1}.\\]\n" +
        "- For a single prime power the sum is a geometric series, so \\(\\sigma(2^n)=2^{n+1}-1\\).\n" +
        "- Like \\(d\\), \\(\\sigma\\) is multiplicative on coprime parts.",
      formula: {
        label: "Divisor sum",
        latex: "\\sigma(N)=\\prod_{i=1}^{k}\\frac{p_i^{a_i+1}-1}{p_i-1}",
      },
      authoredExample: {
        prompt: "What is the sum of all divisors of 60?",
        steps: [
          "\\(60 = 2^2\\cdot 3\\cdot 5\\).",
          "Build one bracket per prime: \\((1+2+4)\\), \\((1+3)\\), \\((1+5)\\).",
          "Multiply: \\(7\\times 4\\times 6 = 168\\).",
          "Sanity check by listing: \\(1+2+3+4+5+6+10+12+15+20+30+60 = 168\\).",
        ],
        answer: "\\(168\\).",
      },
      selfCheckExample: {
        prompt: "What is the sum of all divisors of 81?",
        steps: [
          "\\(81 = 3^4\\), a single prime power.",
          "So \\(\\sigma = 1+3+9+27+81\\).",
          "That totals 121.",
          "Or use the closed form: \\(\\frac{3^{5}-1}{3-1} = \\frac{242}{2} = 121\\).",
        ],
        answer: "\\(121\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sigma(2^8)\\)?", answer: "\\(511\\)", method: "\\(2^9-1\\)" },
        { prompt: "\\(\\sigma(360)\\)?", answer: "\\(1170\\)", method: "\\(15\\times13\\times6\\)" },
        { prompt: "\\(\\sigma(p)\\) for a prime?", answer: "\\(p+1\\)" },
        { prompt: "\\(\\sigma(2\\cdot 3)\\)?", answer: "\\(12\\)", method: "\\(3\\times 4\\)" },
      ],
      pyqExampleId: "3f451b4f-5d77-4a70-baa3-a16fdf0c87b8", // 2026 — sum of all divisors of 256
      traps: [
        {
          title: "The divisor sum is a product of sums, not a sum of products",
          body:
            "For \\(2^2\\cdot 3\\cdot 5\\) the answer is \\((1+2+4)(1+3)(1+5)\\), not \\((1+2+4)+(1+3)+(1+5)\\). Multiplying the brackets is what generates each divisor once; adding them counts almost nothing correctly.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-divisor-count-variants",
      name: "Odd divisors, divisors of a square, and working backwards",
      intuition:
        "Once the exponent formula is in hand, the variants are all small edits to it: drop the prime 2 to count odd divisors, double every exponent to count divisors of \\(N^2\\), and factorise the divisor **count** to work backwards to the shape of \\(N\\).",
      definition:
        "From \\(N = 2^{a}m\\) with \\(m\\) odd:\n" +
        "- **Odd** divisors: \\(d(m)\\) — ignore the power of 2 entirely.\n" +
        "- **Even** divisors: \\(d(N) - d(m)\\).\n" +
        "- Divisors of \\(N^{2}\\): every exponent doubles, so \\(d(N^2)=\\prod(2a_i+1)\\), always odd.\n" +
        "- **Backwards:** a given \\(d(N)\\) factorises into the \\((a_i+1)\\) terms, so \\(d(N)=15=15\\) or \\(3\\times5\\) means \\(N=p^{14}\\) or \\(N=p^{4}q^{2}\\). Size constraints then pick the shape.\n" +
        "- **Ordered triples** with \\(abc=N\\): distribute each prime power among the three slots independently.",
      formula: {
        label: "Divisors of a square",
        latex: "d(N^{2})=\\prod_{i=1}^{k}(2a_i+1)",
      },
      authoredExample: {
        prompt: "How many odd divisors does 480 have, and how many even?",
        steps: [
          "\\(480 = 2^5\\cdot 3\\cdot 5\\).",
          "Odd divisors use no factor of 2, so count only the odd part \\(3\\cdot 5\\): \\((1+1)(1+1) = 4\\). They are 1, 3, 5, 15.",
          "Total divisors: \\((5+1)(1+1)(1+1) = 24\\).",
          "So the even divisors number \\(24-4 = 20\\).",
        ],
        answer: "\\(4\\) odd and \\(20\\) even.",
      },
      selfCheckExample: {
        prompt:
          "A number \\(N\\) has exactly 6 divisors. How many divisors does \\(N^2\\) have?",
        steps: [
          "Factorise the count: \\(6 = 6\\) or \\(6 = 2\\times 3\\). So \\(N=p^{5}\\) or \\(N=p^{2}q\\).",
          "If \\(N=p^5\\) then \\(N^2=p^{10}\\) and \\(d=11\\).",
          "If \\(N=p^2q\\) then \\(N^2=p^4q^2\\) and \\(d=5\\times 3=15\\).",
          "So the answer is **not unique** — it is 11 or 15 depending on the shape, and the question would need a further constraint (such as a digit count) to settle it.",
        ],
        answer: "Either \\(11\\) or \\(15\\) — the divisor count alone does not fix it.",
      },
      practiceSet: [
        { prompt: "Odd divisors of \\(2^4\\cdot 5^2\\)?", answer: "\\(3\\)" },
        { prompt: "\\(d(N^2)\\) if \\(N=p^3\\)?", answer: "\\(7\\)" },
        { prompt: "Is \\(d(N^2)\\) ever even?", answer: "No", method: "\\(N^2\\) is always a square" },
        { prompt: "Ordered triples with \\(abc=30\\)?", answer: "\\(27\\)", method: "Three primes, \\(3^3\\) choices" },
      ],
      pyqExampleId: "9edd697d-2b05-4fae-af89-855759e6aabf", // 2022 — odd and even factors of N = 12^6 x 3^8 x 5^3
      traps: [
        {
          title: "Working backwards from a divisor count usually leaves several shapes",
          body:
            "\\(d(N)=15\\) admits \\(p^{14}\\) and \\(p^{4}q^{2}\\). What eliminates the first is the **size** clue: the smallest \\(p^{14}\\) is \\(2^{14}=16384\\), which has five digits, so a four-digit \\(N\\) must be \\(p^4q^2\\). Always list every factorisation of the count, then use the stated size to cut.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-legendre-trailing-zeros",
      name: "Counting the zeros at the end of a factorial",
      intuition:
        "A trailing zero needs a factor of 10, that is a 2 paired with a 5. In a factorial the twos hugely outnumber the fives, so the number of trailing zeros is just **how many fives** the factorial contains — and multiples of 25 contribute two fives, not one.",
      definition:
        "The number of trailing zeros of \\(n!\\) is\n" +
        "\\[\\left\\lfloor \\frac{n}{5}\\right\\rfloor + \\left\\lfloor \\frac{n}{25}\\right\\rfloor + \\left\\lfloor \\frac{n}{125}\\right\\rfloor + \\cdots\\]\n" +
        "- Each term counts the numbers up to \\(n\\) carrying **at least** that many fives, so the powers add up correctly without double counting.\n" +
        "- Stop when the divisor exceeds \\(n\\).\n" +
        "- The same sum with 5 replaced by any prime \\(p\\) gives the exponent of \\(p\\) in \\(n!\\), which is how you handle a divisor like \\(100^{n}=2^{2n}5^{2n}\\).",
      formula: {
        label: "Zeros at the end of n factorial",
        latex: "Z(n!)=\\sum_{i\\ge 1}\\left\\lfloor \\frac{n}{5^{i}}\\right\\rfloor",
      },
      authoredExample: {
        prompt: "How many zeros does \\(50!\\) end in?",
        steps: [
          "Count multiples of 5 up to 50: \\(\\lfloor 50/5\\rfloor = 10\\).",
          "Add the extra five carried by multiples of 25: \\(\\lfloor 50/25\\rfloor = 2\\).",
          "\\(125 > 50\\), so stop.",
          "Total \\(10+2 = 12\\).",
        ],
        answer: "\\(12\\) trailing zeros.",
      },
      selfCheckExample: {
        prompt:
          "What is the largest \\(n\\) for which \\(100^{n}\\) divides \\(100!\\)?",
        steps: [
          "\\(100 = 2^2\\cdot 5^2\\), so \\(100^{n} = 2^{2n}\\cdot 5^{2n}\\) — we need \\(2n\\) fives **and** \\(2n\\) twos.",
          "Fives in \\(100!\\): \\(\\lfloor 100/5\\rfloor + \\lfloor 100/25\\rfloor = 20+4 = 24\\) (and \\(125>100\\)).",
          "Twos are far more plentiful (97 of them), so the fives bind.",
          "So \\(2n \\le 24\\), giving \\(n = 12\\).",
        ],
        answer: "\\(n = 12\\).",
      },
      practiceSet: [
        { prompt: "Trailing zeros of \\(25!\\)?", answer: "\\(6\\)", method: "\\(5+1\\)" },
        { prompt: "Trailing zeros of \\(29!\\)?", answer: "\\(6\\)" },
        { prompt: "Trailing zeros of \\(10!\\)?", answer: "\\(2\\)" },
        { prompt: "Why does 25 contribute two fives?", answer: "\\(25=5^2\\)" },
      ],
      pyqExampleId: "66ef3ff9-660e-474d-9c17-3b96dc4652a5", // 2018 — largest power of 10 dividing 25!
      traps: [
        {
          title: "Counting only the multiples of 5 undercounts",
          body:
            "For \\(25!\\) the multiples of 5 number 5, which tempts the answer \\(10^5\\). But 25 itself carries **two** fives, so the true count is \\(5+1=6\\). Every term \\(\\lfloor n/25\\rfloor\\), \\(\\lfloor n/125\\rfloor\\) is a real contribution, not a refinement you can skip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-min-of-two-primes",
      name: "Trailing zeros of a general product: the scarcer prime wins",
      intuition:
        "Away from factorials the twos are not guaranteed to outnumber the fives, so you must count **both** and take the smaller. Each factor of 10 needs one of each, so the scarcer prime caps the number of zeros.",
      definition:
        "For any product \\(P\\), the largest \\(n\\) with \\(10^{n} \\mid P\\) is\n" +
        "\\[n = \\min\\big(v_2(P),\\; v_5(P)\\big),\\]\n" +
        "where \\(v_p\\) is the total exponent of \\(p\\) in \\(P\\).\n" +
        "- Expand every composite base first: \\(75^9 = (3\\cdot 5^2)^9 = 3^9 5^{18}\\).\n" +
        "- In a **weighted** product like \\(1^{50}\\times 2^{49}\\times\\cdots\\times 50^{1}\\), each term's exponent multiplies its contribution.\n" +
        "- **Parity is a shortcut worth trying first:** a sum or difference that is odd has no trailing zero at all, whatever its factors look like.",
      formula: {
        label: "Zeros of a general product",
        latex: "n=\\min\\big(v_2(P),\\,v_5(P)\\big)",
      },
      authoredExample: {
        prompt:
          "What is the largest \\(n\\) such that \\(10^{n}\\) divides \\(2^{8}\\times 5^{3}\\times 7\\)?",
        steps: [
          "Count the twos: \\(v_2 = 8\\).",
          "Count the fives: \\(v_5 = 3\\).",
          "Each factor of 10 needs one of each, so the scarcer prime caps it.",
          "\\(n = \\min(8,3) = 3\\). Here — unlike in a factorial — it is the **fives** that are short, and that will not always be so.",
        ],
        answer: "\\(n = 3\\).",
      },
      selfCheckExample: {
        prompt: "How many zeros does \\(15\\times 24\\times 35\\) end in?",
        steps: [
          "Factorise each: \\(15 = 3\\cdot 5\\), \\(24 = 2^3\\cdot 3\\), \\(35 = 5\\cdot 7\\).",
          "Total twos: \\(v_2 = 3\\). Total fives: \\(v_5 = 2\\).",
          "So \\(n = \\min(3,2) = 2\\).",
          "Check: \\(15\\times 24\\times 35 = 12600\\), which indeed ends in two zeros.",
        ],
        answer: "Two zeros.",
      },
      practiceSet: [
        { prompt: "Zeros of \\(2^3\\cdot5^7\\)?", answer: "\\(3\\)" },
        { prompt: "\\(v_5(75^2)\\)?", answer: "\\(4\\)", method: "\\(75=3\\cdot5^2\\)" },
        { prompt: "Zeros of \\(4\\times 25\\)?", answer: "\\(2\\)", method: "\\(v_2=2,\\ v_5=2\\)" },
        { prompt: "Can an odd number end in a zero?", answer: "No" },
      ],
      pyqExampleId: "9e6a33da-1ad6-4a33-a1ff-6e3ef908bca4", // 2019 — largest n with 10^n dividing 6^23 x 75^9 x 105^2
      traps: [
        {
          title: "Outside a factorial, do not assume the fives are the scarce prime",
          body:
            "In \\(n!\\) the twos always outnumber the fives, so counting fives suffices. In \\(2^{8}\\cdot 5^{3}\\cdot 7\\) it is the other way round, and in \\(6^{23}\\cdot75^{9}\\cdot105^{2}\\) the counts are 23 twos against 20 fives — close enough that guessing loses the mark. Count both, every time.",
        },
        {
          title: "Check the parity of a SUM before counting any factors",
          body:
            "For \\(P+Q\\) where \\(P\\) is a product of odd numbers and \\(Q\\) of even ones, the sum is odd, so it ends in no zero at all — and no amount of counting fives inside \\(P\\) and \\(Q\\) is relevant. The 2026 question is exactly this shape, and the factor-counting route wastes minutes before failing.",
        },
      ],
    },
  ],
  related: [
    { label: "Prime numbers and primality", href: "/notes/cds-maths/number-system/cds-ns-primes" },
    { label: "HCF and LCM laws and fractions", href: "/notes/cds-maths/number-system/cds-ns-hcf-lcm-laws" },
  ],
};
