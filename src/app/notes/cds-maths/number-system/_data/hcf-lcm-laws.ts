import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_NS_HCF_LCM_LAWS_NOTE: SubtopicNote = {
  subtopicName: "HCF and LCM Laws and Fractions",
  title: "HCF & LCM — Laws and Fractions",
  oneLineDefinition:
    "The algebra of highest common factors and lowest common multiples: the product law, the H-times-coprime form that solves almost every two-number puzzle, the subtraction property, the recipes for fractions and decimals, and the consistency checks that expose impossible data.",
  whyItMatters:
    "Twenty-nine PYQs, the largest unit in the chapter and six of them HARD. CDS asks these as data puzzles — you are given a product, a ratio or a sum and asked to recover the numbers — and nearly all of them fall to one move: write the pair as Ha and Hb with a and b coprime. Two of the twenty-nine carry data that cannot exist, which is itself an examinable skill.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsns-hcf-lcm-definitions",
      name: "HCF and LCM from the prime factorisations",
      intuition:
        "Line up the prime factorisations. The HCF takes the **lowest** power of each shared prime; the LCM takes the **highest** power of every prime that appears. Everything else in this unit follows from that picture.",
      definition:
        "For \\(a\\) and \\(b\\) written as prime powers:\n" +
        "- \\(\\mathrm{HCF}\\) takes \\(\\min\\) of each exponent (only primes in **both**);\n" +
        "- \\(\\mathrm{LCM}\\) takes \\(\\max\\) of each exponent (primes in **either**).\n" +
        "Consequences used constantly:\n" +
        "- \\(\\mathrm{HCF} \\mid a\\), \\(\\mathrm{HCF}\\mid b\\), and \\(\\mathrm{HCF} \\mid \\mathrm{LCM}\\);\n" +
        "- \\(a \\mid \\mathrm{LCM}\\) and \\(b \\mid \\mathrm{LCM}\\);\n" +
        "- the **Euclidean algorithm** computes the HCF by repeatedly replacing \\((a,b)\\) with \\((b,\\ a \\bmod b)\\) until the remainder is 0.",
      formula: {
        label: "HCF and LCM by exponents",
        latex: "\\mathrm{HCF}=\\prod p_i^{\\min(a_i,b_i)}, \\qquad \\mathrm{LCM}=\\prod p_i^{\\max(a_i,b_i)}",
      },
      authoredExample: {
        prompt: "Find the HCF and LCM of 12 and 18 from their factorisations.",
        steps: [
          "\\(12 = 2^2\\cdot 3\\) and \\(18 = 2\\cdot 3^2\\).",
          "HCF takes the lower power of each shared prime: \\(2^1\\cdot 3^1 = 6\\).",
          "LCM takes the higher power of each prime: \\(2^2\\cdot 3^2 = 36\\).",
          "Check against the product law: \\(6\\times 36 = 216 = 12\\times 18\\).",
        ],
        answer: "HCF \\(=6\\), LCM \\(=36\\).",
      },
      selfCheckExample: {
        prompt: "The HCF of two numbers is 8. Can their LCM be 60?",
        steps: [
          "The HCF always divides the LCM, because \\(\\min(a_i,b_i) \\le \\max(a_i,b_i)\\) for every prime.",
          "Here \\(60 = 2^2\\cdot 3\\cdot 5\\) carries only \\(2^2\\), so \\(8 = 2^3\\) does not divide it.",
          "So no such pair exists — the data is impossible.",
        ],
        answer: "No: 8 does not divide 60, and the HCF must divide the LCM.",
      },
      practiceSet: [
        { prompt: "HCF of \\(2^3\\cdot3\\) and \\(2\\cdot3^2\\)?", answer: "\\(6\\)" },
        { prompt: "LCM of 4 and 6?", answer: "\\(12\\)" },
        { prompt: "What does the Euclidean algorithm compute?", answer: "The HCF" },
        { prompt: "HCF of two coprime numbers?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "09800e2e-38cd-41f0-b975-16855e9041ff", // 2019 — HCF is 12, which can never be the LCM
      traps: [
        {
          title: "An LCM that is not a multiple of the HCF is impossible",
          body:
            "Given HCF 12, an LCM of 80 can never occur, because \\(12 \\nmid 80\\). This is the fastest elimination in the whole unit and CDS uses it directly. Check divisibility before doing any arithmetic.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-hcf-lcm-product",
      name: "The product law for two numbers",
      intuition:
        "Because HCF takes the minimum exponent and LCM the maximum, together they use each prime exactly as many times as \\(a\\) and \\(b\\) do between them. So multiplying HCF by LCM reproduces the product of the numbers — **for two numbers only**.",
      definition:
        "For any two positive integers,\n" +
        "\\[\\mathrm{HCF}(a,b)\\times \\mathrm{LCM}(a,b) = a\\times b.\\]\n" +
        "- This gives the fourth quantity whenever three are known.\n" +
        "- It **fails for three or more numbers**: \\(\\mathrm{HCF}\\times\\mathrm{LCM} \\ne abc\\) in general.\n" +
        "- Paired with \\(\\mathrm{LCM} = k\\cdot\\mathrm{HCF}\\) and a sum or difference of the two, it reduces most CDS puzzles to one linear equation.",
      formula: {
        label: "Product law (two numbers)",
        latex: "\\mathrm{HCF}(a,b)\\cdot\\mathrm{LCM}(a,b)=ab",
      },
      authoredExample: {
        prompt:
          "Two numbers have HCF 6 and LCM 84. One of them is 12. Find the other.",
        steps: [
          "By the product law the product of the numbers is \\(6\\times 84 = 504\\).",
          "So the other number is \\(504/12 = 42\\).",
          "Verify: \\(\\gcd(12,42)=6\\) and \\(\\mathrm{lcm}(12,42)=84\\).",
        ],
        answer: "\\(42\\).",
      },
      selfCheckExample: {
        prompt:
          "The LCM of two numbers is 12 times their HCF, and the HCF and LCM add to 169. If one number is 39, find the other.",
        steps: [
          "Let the HCF be \\(H\\). Then \\(\\mathrm{LCM}=12H\\) and \\(H+12H=169\\), so \\(13H=169\\) and \\(H=13\\).",
          "Hence \\(\\mathrm{LCM}=156\\).",
          "Product of the numbers \\(=13\\times 156 = 2028\\), so the other is \\(2028/39 = 52\\).",
          "Check: \\(\\gcd(39,52)=13\\) and \\(\\mathrm{lcm}(39,52)=156\\).",
        ],
        answer: "\\(52\\).",
      },
      practiceSet: [
        { prompt: "HCF 5, LCM 60, one number 15. Find the other.", answer: "\\(20\\)" },
        { prompt: "Product 96, HCF 4. Find the LCM.", answer: "\\(24\\)" },
        { prompt: "Does the product law hold for three numbers?", answer: "No" },
        { prompt: "HCF 9, LCM 90. What is the product?", answer: "\\(810\\)" },
      ],
      pyqExampleId: "d6cc1271-4a4b-48cb-badc-2db3efc6bbfc", // 2026 — HCF 44, LCM 4620, p/55 = 4, find q
      traps: [
        {
          title: "The product law is a TWO-number law",
          body:
            "For three numbers, HCF times LCM is not the product. The 2026 data-sufficiency question on three numbers with HCF 5 and LCM 30 has to be solved by listing the candidate triples, not by dividing — each number must be a multiple of 5 and a divisor of 30, which leaves only four triples to test.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-ha-hb-form",
      name: "Writing the pair as H times coprime parts",
      intuition:
        "If the HCF is \\(H\\), then both numbers are multiples of \\(H\\), and what is left over shares nothing. So write them as \\(Ha\\) and \\(Hb\\) with \\(a\\) and \\(b\\) coprime. This single substitution is the workhorse of the unit — it converts every constraint into a small equation in \\(a\\) and \\(b\\).",
      definition:
        "Put \\(x = Ha\\) and \\(y = Hb\\) with \\(\\gcd(a,b)=1\\). Then:\n" +
        "- \\(xy = H^{2}ab\\);\n" +
        "- \\(\\mathrm{LCM}(x,y) = Hab\\), so \\(\\dfrac{\\mathrm{LCM}}{\\mathrm{HCF}} = ab\\);\n" +
        "- \\(x+y = H(a+b)\\) and \\(x-y = H(a-b)\\).\n" +
        "Having reduced to \\(ab = m\\), list the **coprime** factor pairs of \\(m\\) only, then apply any size condition the question adds.",
      formula: {
        label: "The Ha, Hb substitution",
        latex: "x=Ha,\\; y=Hb,\\; \\gcd(a,b)=1 \\;\\Longrightarrow\\; \\frac{\\mathrm{LCM}}{\\mathrm{HCF}}=ab",
      },
      authoredExample: {
        prompt: "The product of two numbers is 432 and their HCF is 12. Find them.",
        steps: [
          "Write them as \\(12a\\) and \\(12b\\) with \\(\\gcd(a,b)=1\\).",
          "Then \\(144ab = 432\\), so \\(ab = 3\\).",
          "Coprime factor pairs of 3: only \\((1,3)\\).",
          "So the numbers are \\(12\\) and \\(36\\). Check \\(\\gcd(12,36)=12\\) and \\(12\\times 36=432\\).",
        ],
        answer: "\\(12\\) and \\(36\\).",
      },
      selfCheckExample: {
        prompt:
          "The product of two numbers is 3024 and their HCF is 12. If both exceed 30, find their sum.",
        steps: [
          "Write them as \\(12a, 12b\\) with \\(\\gcd(a,b)=1\\). Then \\(144ab = 3024\\), so \\(ab = 21\\).",
          "Coprime pairs with \\(ab=21\\): \\((1,21)\\) and \\((3,7)\\).",
          "These give the number pairs \\((12,252)\\) and \\((36,84)\\).",
          "Only \\((36,84)\\) has **both** above 30, so the sum is \\(120\\). Check \\(\\gcd(36,84)=12\\) and \\(36\\times84=3024\\).",
        ],
        answer: "\\(120\\).",
      },
      practiceSet: [
        { prompt: "Product 1620, HCF 18. Find the numbers.", answer: "\\(18\\) and \\(90\\)", method: "\\(ab=5\\)" },
        { prompt: "\\(\\mathrm{LCM}/\\mathrm{HCF}\\) equals what, in the Ha-Hb form?", answer: "\\(ab\\)" },
        { prompt: "Why must \\(a\\) and \\(b\\) be coprime?", answer: "Any shared factor would belong in H" },
        { prompt: "Coprime factor pairs of 15?", answer: "\\((1,15)\\) and \\((3,5)\\)" },
      ],
      pyqExampleId: "d156389a-888a-44c7-aad4-442a34f0ae20", // 2018 — product 7168, HCF 16, both > 60
      traps: [
        {
          title: "List only the COPRIME factor pairs, and expect more than one to survive",
          body:
            "With \\(ab=28\\) the pairs are \\((1,28)\\) and \\((4,7)\\) — \\((2,14)\\) is excluded because 2 and 14 share a factor, which would make the HCF larger than stated. And when two coprime pairs both satisfy every stated condition, the question genuinely has two answers; the 2022 question with HCF 9 and LCM 126 is exactly that case.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-hcf-subtraction-property",
      name: "The subtraction property and its consequences",
      intuition:
        "Any common divisor of two numbers also divides their sum and their difference. That is the engine inside the Euclidean algorithm, and on its own it collapses expressions like \\(\\gcd(n,\\,n+10)\\) to something tiny.",
      definition:
        "If \\(d \\mid x\\) and \\(d \\mid y\\) then \\(d \\mid (x\\pm y)\\). Hence:\n" +
        "- \\(\\mathrm{HCF}(p,\\,p+q) = \\mathrm{HCF}(p,\\,q)\\) and \\(\\mathrm{HCF}(p,\\,p-q) = \\mathrm{HCF}(p,\\,q)\\);\n" +
        "- \\(\\mathrm{HCF}(n,\\,n+k) = \\mathrm{HCF}(n,\\,k)\\), so it always divides \\(k\\);\n" +
        "- you may subtract any multiple of one argument from the other, which is how \\(\\gcd(12n+2,\\,8n+1)\\) reduces in two lines.\n" +
        "Related structural law: if \\(a=bc\\) with \\(\\gcd(b,c)=1\\) then \\(\\mathrm{HCF}(c,\\,bd)=\\mathrm{HCF}(c,\\,d)\\) — the coprime part \\(b\\) contributes nothing.",
      formula: {
        label: "Subtraction property",
        latex: "\\mathrm{HCF}(n,\\;n+k)=\\mathrm{HCF}(n,\\;k)",
      },
      authoredExample: {
        prompt: "What is \\(\\mathrm{HCF}(n,\\,n+15)\\) when \\(n=25\\), and in general?",
        steps: [
          "In general the subtraction property gives \\(\\mathrm{HCF}(n,\\,n+15)=\\mathrm{HCF}(n,\\,15)\\), so it always divides 15.",
          "With \\(n=25\\): \\(\\mathrm{HCF}(25,15)=5\\).",
          "Confirm directly: \\(\\gcd(25,40)=5\\).",
          "So the only possible values for any \\(n\\) are the divisors of 15: 1, 3, 5 and 15.",
        ],
        answer: "\\(5\\) at \\(n=25\\); in general a divisor of 15.",
      },
      selfCheckExample: {
        prompt: "Show that \\(2n+1\\) and \\(4n+3\\) are coprime for every integer \\(n\\).",
        steps: [
          "Let \\(d\\) divide both. Then \\(d\\) divides \\(2(2n+1) = 4n+2\\).",
          "Subtracting from \\(4n+3\\): \\(d \\mid (4n+3)-(4n+2) = 1\\).",
          "So \\(d=1\\) and the two are coprime.",
          "Check \\(n=3\\): \\(\\gcd(7,15)=1\\).",
        ],
        answer: "Their HCF is always 1.",
      },
      practiceSet: [
        { prompt: "\\(\\mathrm{HCF}(n,\\,n+1)\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\mathrm{HCF}(n,\\,n+6)\\) divides what?", answer: "\\(6\\)" },
        { prompt: "\\(\\mathrm{HCF}(18,\\,30)\\) using subtraction?", answer: "\\(6\\)", method: "\\(\\gcd(18,12)=\\gcd(6,12)=6\\)" },
        { prompt: "If \\(d\\mid x\\) and \\(d\\mid y\\), what else does \\(d\\) divide?", answer: "\\(x\\pm y\\)" },
      ],
      pyqExampleId: "579d99f3-6959-4fe0-b928-2fbd6db67900", // 2026 — HCF of p and (p+q), p and (p-q)
      traps: [
        {
          title: "The property transfers the HCF, it does not compute it",
          body:
            "\\(\\mathrm{HCF}(n,\\,n+10)=\\mathrm{HCF}(n,10)\\) tells you the answer divides 10 — not that it **is** 10. The 2024 question requiring \\(\\mathrm{HCF}(n,\\,n+10)=10\\) therefore forces \\(10 \\mid n\\), which is an extra condition you must impose before counting the possible LCMs.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-hcf-lcm-of-fractions",
      name: "HCF and LCM of fractions and decimals",
      intuition:
        "For fractions the two recipes are crossed over: the HCF takes the HCF of the numerators over the LCM of the denominators, and the LCM does the opposite. For decimals, scale everything to whole numbers first and scale the answer back.",
      definition:
        "With all fractions in **lowest terms**:\n" +
        "\\[\\mathrm{HCF}=\\frac{\\mathrm{HCF\\ of\\ numerators}}{\\mathrm{LCM\\ of\\ denominators}}, \\qquad \\mathrm{LCM}=\\frac{\\mathrm{LCM\\ of\\ numerators}}{\\mathrm{HCF\\ of\\ denominators}}.\\]\n" +
        "For **decimals**: multiply every value by the same power of 10 to clear the decimals, take the HCF or LCM of the integers, then divide back by that power.",
      formula: {
        label: "Fractions: the crossed recipes",
        latex: "\\mathrm{LCM}\\!\\left(\\frac{a_i}{b_i}\\right)=\\frac{\\mathrm{LCM}(a_i)}{\\mathrm{HCF}(b_i)}",
      },
      authoredExample: {
        prompt: "Find the LCM of \\(\\dfrac{2}{3}\\), \\(\\dfrac{4}{9}\\) and \\(\\dfrac{8}{27}\\).",
        steps: [
          "Numerators are 2, 4, 8 with \\(\\mathrm{LCM}=8\\).",
          "Denominators are 3, 9, 27 with \\(\\mathrm{HCF}=3\\).",
          "So the LCM of the fractions is \\(\\dfrac{8}{3}\\).",
          "Sanity check: \\(\\dfrac{8}{3} \\div \\dfrac{2}{3} = 4\\), an integer, and likewise for the others.",
        ],
        answer: "\\(\\dfrac{8}{3}\\).",
      },
      selfCheckExample: {
        prompt: "Find the HCF of \\(\\dfrac{3}{4}\\), \\(\\dfrac{9}{10}\\) and \\(\\dfrac{15}{8}\\).",
        steps: [
          "Numerators 3, 9, 15 have \\(\\mathrm{HCF}=3\\).",
          "Denominators 4, 10, 8 have \\(\\mathrm{LCM}\\): \\(4=2^2\\), \\(10=2\\cdot5\\), \\(8=2^3\\), so \\(\\mathrm{LCM}=2^3\\cdot5=40\\).",
          "So the HCF of the fractions is \\(\\dfrac{3}{40}\\).",
          "Check it divides each: \\(\\dfrac{3}{4}\\div\\dfrac{3}{40}=10\\), an integer.",
        ],
        answer: "\\(\\dfrac{3}{40}\\).",
      },
      practiceSet: [
        { prompt: "LCM of \\(\\frac{1}{2}\\) and \\(\\frac{3}{4}\\)?", answer: "\\(\\frac{3}{2}\\)" },
        { prompt: "HCF of \\(\\frac{2}{5}\\) and \\(\\frac{4}{15}\\)?", answer: "\\(\\frac{2}{15}\\)" },
        { prompt: "LCM of 0.6 and 0.9?", answer: "\\(1.8\\)", method: "LCM(6,9)=18, then divide by 10" },
        { prompt: "Which recipe uses the HCF of the denominators?", answer: "The LCM of the fractions" },
      ],
      pyqExampleId: "f1d66927-6393-4066-9f03-716024faf887", // 2019 — LCM of 1/3, 5/6, 2/9, 4/27
      traps: [
        {
          title: "The two fraction recipes are crossed — do not use the same one twice",
          body:
            "HCF of fractions uses HCF-over-LCM; LCM of fractions uses LCM-over-HCF. Applying the numerator rule to the denominators as well gives a value that is neither. A quick check catches it: the LCM must be **divisible** by each fraction, and the HCF must **divide** each.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-gcd-of-power-differences",
      name: "The HCF of two numbers of the form a to the n, minus one",
      intuition:
        "There is a clean identity for \\(\\gcd(a^{m}-1,\\ a^{n}-1)\\): the exponents' own HCF comes down into the exponent. So a question that looks impossible — the HCF of two astronomically large numbers — is one gcd of small exponents.",
      definition:
        "For an integer \\(a>1\\),\n" +
        "\\[\\gcd\\!\\left(a^{m}-1,\\ a^{n}-1\\right) = a^{\\gcd(m,n)}-1.\\]\n" +
        "- Take out any common constant factor **first**: \\(3^{29}-9 = 9\\!\\left(3^{27}-1\\right)\\), so the identity applies to the bracket and the 9 multiplies back at the end.\n" +
        "- The same shape works for a common factor of the whole expression, not for a constant added inside the power.",
      formula: {
        label: "HCF of power-minus-one",
        latex: "\\gcd\\!\\left(a^{m}-1,\\;a^{n}-1\\right)=a^{\\gcd(m,n)}-1",
      },
      authoredExample: {
        prompt: "Find the HCF of \\(2^{12}-1\\) and \\(2^{18}-1\\).",
        steps: [
          "Apply the identity: the answer is \\(2^{\\gcd(12,18)}-1\\).",
          "\\(\\gcd(12,18)=6\\).",
          "So the HCF is \\(2^{6}-1 = 63\\).",
          "Check plausibility: \\(2^{12}-1 = 4095 = 63\\times 65\\) and \\(2^{18}-1 = 262143 = 63\\times 4161\\).",
        ],
        answer: "\\(63\\).",
      },
      selfCheckExample: {
        prompt: "Find the HCF of \\(3^{20}-1\\) and \\(3^{30}-1\\).",
        steps: [
          "By the identity the HCF is \\(3^{\\gcd(20,30)}-1\\).",
          "\\(\\gcd(20,30)=10\\).",
          "So the HCF is \\(3^{10}-1\\).",
          "Numerically \\(3^{10}=59049\\), so the HCF is \\(59048\\).",
        ],
        answer: "\\(3^{10}-1 = 59048\\).",
      },
      practiceSet: [
        { prompt: "\\(\\gcd(2^{9}-1,\\,2^{6}-1)\\)?", answer: "\\(7\\)", method: "\\(2^{\\gcd(9,6)}-1=2^3-1\\)" },
        { prompt: "\\(\\gcd(2^{35}-1,\\,2^{91}-1)\\)?", answer: "\\(127\\)", method: "\\(\\gcd(35,91)=7\\)" },
        { prompt: "First step on \\(3^{29}-9\\)?", answer: "Factor out 9" },
        { prompt: "\\(\\gcd(5^{4}-1,\\,5^{6}-1)\\)?", answer: "\\(24\\)", method: "\\(5^2-1\\)" },
      ],
      pyqExampleId: "a9ffe28d-2a50-4499-a760-6f09e1f9ad93", // 2024 — HCF of 2^36 - 1 and 2^45 - 1
      traps: [
        {
          title: "Pull out the common constant before applying the identity",
          body:
            "\\(3^{29}-9\\) is not of the form \\(a^{n}-1\\). Rewrite it as \\(9(3^{27}-1)\\) and likewise \\(3^{38}-9 = 9(3^{36}-1)\\); then the identity gives \\(\\gcd = 9\\!\\left(3^{9}-1\\right) = 3^{11}-9\\). Applying the identity to the exponents 29 and 38 directly gives a near-miss answer that appears in the option list.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-inconsistent-hcf-lcm-data",
      name: "Spotting HCF and LCM data that cannot exist",
      intuition:
        "Three cheap checks catch impossible data before you waste time solving: the HCF must divide both numbers, the HCF must divide the LCM, and LCM divided by HCF must be a whole number. CDS sets questions that fail these, and recognising the failure is the intended skill.",
      definition:
        "Necessary conditions for a stated HCF \\(H\\) and LCM \\(L\\) of two numbers:\n" +
        "- \\(H \\mid L\\), and \\(L/H = ab\\) must be a **positive integer**;\n" +
        "- \\(H\\) must divide each number given;\n" +
        "- each given number must divide \\(L\\);\n" +
        "- \\(H \\le\\) each number \\(\\le L\\).\n" +
        "If any fails, no such pair exists. When that happens the honest answer is that the data is inconsistent — though the paper may still expect the value the intended arithmetic produces, so compute it and note the conflict.",
      formula: {
        label: "The ratio test",
        latex: "\\frac{\\mathrm{LCM}}{\\mathrm{HCF}} = ab \\in \\mathbb{Z}^{+}",
      },
      authoredExample: {
        prompt:
          "Can two numbers have HCF 6 and LCM 20? And can their LCM and HCF be in the ratio 4 : 3?",
        steps: [
          "First part: \\(H \\mid L\\) is required, but \\(6 \\nmid 20\\). So no such pair exists.",
          "Second part: \\(L/H = ab\\) must be a positive **integer**, and \\(4/3\\) is not.",
          "So a ratio of \\(4:3\\) is impossible for any pair of numbers.",
          "Note what the test rules out: any LCM-to-HCF ratio that is not a whole number.",
        ],
        answer: "Neither is possible.",
      },
      selfCheckExample: {
        prompt:
          "The sum of the LCM and HCF of two numbers is 176 and their difference is 160. If one number is 24, is the data consistent?",
        steps: [
          "From the sum and difference: \\(L = \\frac{176+160}{2} = 168\\) and \\(H = \\frac{176-160}{2} = 8\\).",
          "Check \\(H \\mid L\\): \\(8 \\mid 168\\) since \\(168 = 8\\times 21\\). Good.",
          "Check \\(H\\) divides the given number: \\(8 \\mid 24\\). Good.",
          "Check the given number divides \\(L\\): \\(24 \\mid 168\\) since \\(168 = 24\\times 7\\). Good. So the data is consistent, and the other number is \\(\\frac{8\\times168}{24} = 56\\) — verify \\(\\gcd(24,56)=8\\), \\(\\mathrm{lcm}(24,56)=168\\).",
        ],
        answer: "Consistent, and the other number is \\(56\\).",
      },
      practiceSet: [
        { prompt: "HCF 12, LCM 80. Possible?", answer: "No", method: "\\(12\\nmid 80\\)" },
        { prompt: "Can \\(L:H\\) be \\(3:2\\)?", answer: "No", method: "\\(L/H\\) must be an integer" },
        { prompt: "Must the HCF divide every one of the numbers?", answer: "Yes" },
        { prompt: "HCF 7, LCM 84. Possible?", answer: "Yes", method: "\\(84/7=12\\)" },
      ],
      pyqExampleId: "92d9a06c-2af2-4325-a615-091af2beafb6", // 2021 — LCM+HCF 536, difference 296, one number 104
      traps: [
        {
          title: "Some CDS questions carry data that cannot exist, and that is deliberate",
          body:
            "The 2021 question gives HCF 120 with one number 104 — but \\(120 \\nmid 104\\), so no such pair exists, and the 2023 question asks for an LCM-to-HCF ratio of \\(3:2\\), which no pair can have. Run the three checks, state the conflict, and give the value the intended arithmetic yields. Do not assume you have miscalculated: on this corpus the data is sometimes the thing that is wrong.",
        },
      ],
    },
  ],
  related: [
    { label: "HCF and LCM applications and remainder recipes", href: "/notes/cds-maths/number-system/cds-ns-hcf-lcm-applications" },
    { label: "Factors, divisor counting and trailing zeros", href: "/notes/cds-maths/number-system/cds-ns-factors-divisors" },
  ],
};
