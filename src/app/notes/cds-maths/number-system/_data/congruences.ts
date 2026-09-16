import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_NS_CONGRUENCES_NOTE: SubtopicNote = {
  subtopicName: "Remainders by Congruence and Cyclicity",
  title: "Remainders by Congruence & Cyclicity",
  oneLineDefinition:
    "Finding the remainder of an astronomically large power by replacing the base with its own remainder, then exploiting the fact that powers cycle — with the special case of a base congruent to minus one, and Fermat's little theorem for a prime modulus.",
  whyItMatters:
    "Twenty-six PYQs, seven of them HARD — this is the densest HARD unit in the chapter after Factorisation, and CDS asks it every single year. The good news is that almost all of it is one of four moves. The base-congruent-to-minus-one trick alone accounts for six questions, and Fermat's little theorem for four.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsns-congruence-basics",
      name: "Replacing a number by its remainder",
      intuition:
        "Remainders survive addition, subtraction and multiplication. So before doing anything with a huge number, replace it by its remainder on division by the modulus — the answer is unaffected and the arithmetic becomes trivial.",
      definition:
        "Write \\(a \\equiv b \\pmod n\\) to mean \\(n \\mid (a-b)\\), that is \\(a\\) and \\(b\\) leave the same remainder.\n" +
        "- If \\(a\\equiv a'\\) and \\(b\\equiv b'\\) then \\(a+b\\equiv a'+b'\\), \\(a-b\\equiv a'-b'\\) and \\(ab\\equiv a'b'\\).\n" +
        "- In particular \\(a^{k} \\equiv (a')^{k}\\), which is what licenses reducing the base first.\n" +
        "- **Division is NOT allowed** in general — you may not cancel a factor from both sides without checking it is coprime to the modulus.\n" +
        "- The final answer must be brought into the range \\(0\\) to \\(n-1\\).",
      formula: {
        label: "Reduce the base first",
        latex: "a \\equiv r \\pmod n \\;\\Longrightarrow\\; a^{k} \\equiv r^{k} \\pmod n",
      },
      authoredExample: {
        prompt: "What is the remainder when \\(43^{1000}\\) is divided by 7?",
        steps: [
          "Reduce the base: \\(43 = 7\\times 6 + 1\\), so \\(43 \\equiv 1 \\pmod 7\\).",
          "Therefore \\(43^{1000} \\equiv 1^{1000} \\pmod 7\\).",
          "\\(1^{1000} = 1\\).",
          "So the remainder is 1 — the exponent never mattered once the base reduced to 1.",
        ],
        answer: "\\(1\\).",
      },
      selfCheckExample: {
        prompt:
          "What is the remainder when \\(1234 + 5678\\) is divided by 9?",
        steps: [
          "Modulo 9 a number is congruent to its digit sum. For 1234: \\(1+2+3+4=10 \\equiv 1\\).",
          "For 5678: \\(5+6+7+8=26 \\equiv 8\\).",
          "So the sum is \\(\\equiv 1+8 = 9 \\equiv 0 \\pmod 9\\).",
          "Check directly: \\(1234+5678 = 6912\\), whose digit sum is 18 — a multiple of 9.",
        ],
        answer: "\\(0\\).",
      },
      practiceSet: [
        { prompt: "\\(100 \\bmod 9\\)?", answer: "\\(1\\)" },
        { prompt: "\\(37^{5} \\bmod 9\\)?", answer: "\\(1\\)", method: "\\(37\\equiv 1\\)" },
        { prompt: "Can you cancel a common factor in a congruence freely?", answer: "No" },
        { prompt: "\\(4444 \\bmod 9\\)?", answer: "\\(7\\)", method: "Digit sum 16" },
      ],
      pyqExampleId: "e6e3e710-591f-4ba4-87e7-742473ad46e9", // 2021 — remainder of 37^1000 by 9
      traps: [
        {
          title: "A remainder must land in 0 to n minus 1",
          body:
            "If your working produces \\(-1\\) modulo 18, the remainder is 17, not \\(-1\\). And a remainder on division by 9 can never be 9 — CDS puts exactly that value in the option list for the \\(37^{1000}\\) question. Normalise before you answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-base-congruent-minus-one",
      name: "When the base is one less than the modulus",
      intuition:
        "If \\(a \\equiv -1\\), then \\(a^{n}\\) alternates: \\(-1\\) for odd \\(n\\), \\(+1\\) for even \\(n\\). Spotting that the base is one **below** the modulus is the single most productive observation in this unit, and it takes one glance.",
      definition:
        "If \\(a \\equiv -1 \\pmod n\\) — that is, \\(a = n-1\\) or any number one less than a multiple of \\(n\\) — then\n" +
        "\\[a^{k} \\equiv (-1)^{k} = \\begin{cases}1 & k \\text{ even}\\\\ -1 \\equiv n-1 & k \\text{ odd.}\\end{cases}\\]\n" +
        "- Look for it whenever the base is just under the modulus (17 and 18, 65 and 11 since \\(65 = 66-1\\), \\(p\\) and \\(p+1\\)).\n" +
        "- It pairs beautifully with a **sum**: if \\(a\\equiv-1\\) and \\(b\\equiv+1\\), then \\(a^{k}+b^{k}\\equiv 0\\) for odd \\(k\\).\n" +
        "- Also check \\(a \\equiv +1\\), which is even simpler: every power is 1.",
      formula: {
        label: "Alternating powers",
        latex: "a\\equiv -1 \\pmod n \\;\\Longrightarrow\\; a^{k}\\equiv(-1)^{k}\\pmod n",
      },
      authoredExample: {
        prompt: "What is the remainder when \\(29^{101}\\) is divided by 30?",
        steps: [
          "Note \\(29 = 30-1\\), so \\(29 \\equiv -1 \\pmod{30}\\).",
          "Hence \\(29^{101} \\equiv (-1)^{101} = -1 \\pmod{30}\\).",
          "Bring it into range: \\(-1 \\equiv 29 \\pmod{30}\\).",
          "So the remainder is 29.",
        ],
        answer: "\\(29\\).",
      },
      selfCheckExample: {
        prompt:
          "What is the remainder when \\(15^{50} + 17^{50}\\) is divided by 16?",
        steps: [
          "\\(15 = 16-1\\), so \\(15 \\equiv -1\\); and \\(17 = 16+1\\), so \\(17 \\equiv 1\\).",
          "The exponent 50 is even, so \\(15^{50} \\equiv (-1)^{50} = 1\\) and \\(17^{50} \\equiv 1\\).",
          "Adding, the sum is \\(\\equiv 1+1 = 2 \\pmod{16}\\).",
          "So the remainder is 2. (Had the exponent been odd, the two would have cancelled to 0.)",
        ],
        answer: "\\(2\\).",
      },
      practiceSet: [
        { prompt: "\\(17^{2020} \\bmod 18\\)?", answer: "\\(1\\)", method: "Even power of \\(-1\\)" },
        { prompt: "\\(65^{99} \\bmod 11\\)?", answer: "\\(10\\)", method: "\\(65\\equiv-1\\), odd power" },
        { prompt: "\\(p^{n} \\bmod (p+1)\\) for even \\(n\\)?", answer: "\\(1\\)" },
        { prompt: "\\((17^{29}+19^{29}) \\bmod 18\\)?", answer: "\\(0\\)", method: "\\(-1+1\\), odd power" },
      ],
      pyqExampleId: "9f99dd41-6fd8-4e50-ab54-3fac01096bcf", // 2020 — 17^2020 divided by 18
      traps: [
        {
          title: "Odd power of minus one is the modulus minus one, not minus one",
          body:
            "\\(65^{99} \\equiv -1 \\pmod{11}\\) means the remainder is 10. Writing \\(-1\\) or \\(1\\) are the two wrong answers offered. Similarly \\(7^{84}\\) modulo 344 uses \\(343 \\equiv -1\\) with an **even** exponent, giving 1 — the parity of the exponent is doing all the work, so read it carefully.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-power-cycle-mod-n",
      name: "Finding the cycle of powers modulo n",
      intuition:
        "Powers of a fixed base repeat modulo \\(n\\). Compute them until you hit 1 (or repeat an earlier value) — the length of that loop is the cycle, and then only the exponent's remainder modulo the cycle length matters. This is the general tool when neither the minus-one trick nor Fermat applies directly.",
      definition:
        "Compute \\(a^{1}, a^{2}, a^{3},\\ldots\\) modulo \\(n\\) until a value repeats. If \\(a^{t}\\equiv 1\\), the cycle length is \\(t\\) and\n" +
        "\\[a^{k} \\equiv a^{\\,k \\bmod t} \\pmod n,\\]\n" +
        "with the convention that a remainder of 0 means \\(a^{t}\\equiv 1\\).\n" +
        "- Look for a **small** power that is \\(\\pm 1\\); that shortcut usually appears within four or five steps (\\(3^3 = 27 \\equiv -1 \\bmod 28\\), \\(2^3 = 8 \\equiv 1 \\bmod 7\\)).\n" +
        "- Finding \\(a^{t}\\equiv -1\\) is just as useful: the cycle is then \\(2t\\).",
      formula: {
        label: "Cycle reduction",
        latex: "a^{t}\\equiv 1 \\pmod n \\;\\Longrightarrow\\; a^{k}\\equiv a^{\\,k \\bmod t} \\pmod n",
      },
      authoredExample: {
        prompt: "What is the remainder when \\(2^{50}\\) is divided by 9?",
        steps: [
          "Compute powers of 2 modulo 9: \\(2, 4, 8, 16\\equiv7, 14\\equiv5, 10\\equiv1\\).",
          "So \\(2^{6}\\equiv 1\\) and the cycle length is 6.",
          "Reduce the exponent: \\(50 = 6\\times 8 + 2\\), so \\(50 \\bmod 6 = 2\\).",
          "Hence \\(2^{50}\\equiv 2^{2} = 4 \\pmod 9\\).",
        ],
        answer: "\\(4\\).",
      },
      selfCheckExample: {
        prompt: "What is the remainder when \\(7^{100}\\) is divided by 10?",
        steps: [
          "Powers of 7 modulo 10: \\(7, 49\\equiv 9, 63\\equiv 3, 21\\equiv 1\\).",
          "So \\(7^{4}\\equiv 1\\) and the cycle length is 4.",
          "\\(100 = 4\\times 25\\), so the exponent reduces to 0, meaning we are at the **end** of a cycle.",
          "Hence \\(7^{100}\\equiv 7^{4} \\equiv 1 \\pmod{10}\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "Cycle length of 2 modulo 7?", answer: "\\(3\\)", method: "\\(2^3=8\\equiv1\\)" },
        { prompt: "\\(2^{1000000} \\bmod 7\\)?", answer: "\\(2\\)", method: "\\(10^6 \\equiv 1 \\bmod 3\\)" },
        { prompt: "\\(3^{3} \\bmod 28\\)?", answer: "\\(27\\)", method: "That is \\(-1\\)" },
        { prompt: "\\(3^{521} \\bmod 8\\)?", answer: "\\(3\\)", method: "\\(3^2\\equiv1\\), odd exponent" },
      ],
      pyqExampleId: "41833184-279a-49a5-8e50-f9acf8cefed3", // 2021 — 2^1000000 divided by 7
      traps: [
        {
          title: "Reduce the exponent modulo the CYCLE, not modulo the divisor",
          body:
            "For \\(2^{50}\\) modulo 9 the cycle is 6, so reduce 50 modulo 6 — not modulo 9. Mixing the two moduli is the standard error and produces a plausible wrong answer. The divisor sets the arithmetic; the cycle length sets the exponent reduction.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-fermat-little-theorem",
      name: "Fermat's little theorem",
      intuition:
        "For a **prime** modulus \\(p\\), any base not divisible by \\(p\\) satisfies \\(a^{p-1}\\equiv 1\\). So the cycle length always divides \\(p-1\\), and you get the answer without hunting for the cycle at all. CDS names this theorem directly in one question and uses it in three more.",
      definition:
        "**Fermat's little theorem.** If \\(p\\) is prime and \\(p \\nmid a\\), then\n" +
        "\\[a^{p-1}\\equiv 1 \\pmod p.\\]\n" +
        "- Multiplying by \\(a\\) gives the companion form \\(a^{p}\\equiv a \\pmod p\\), valid for **every** \\(a\\) including multiples of \\(p\\).\n" +
        "- It **requires the modulus to be prime**: \\(3^{3}-1 = 26\\) is not a multiple of 4, so the statement fails at \\(p=4\\).\n" +
        "- It explains why \\(n^{5}-n\\) is always divisible by 5, and \\(n^{p}-n\\) by \\(p\\).",
      formula: {
        label: "Fermat's little theorem",
        latex: "a^{p-1}\\equiv 1 \\pmod p \\quad (p \\text{ prime},\\ p \\nmid a)",
      },
      authoredExample: {
        prompt: "What is the remainder when \\(3^{16}\\) is divided by 17?",
        steps: [
          "17 is prime and does not divide 3, so Fermat applies with \\(p=17\\).",
          "The theorem gives \\(3^{17-1} = 3^{16} \\equiv 1 \\pmod{17}\\).",
          "So the remainder is 1, with no cycle-hunting needed.",
          "Note the exponent matched \\(p-1\\) exactly, which is the case to look for.",
        ],
        answer: "\\(1\\).",
      },
      selfCheckExample: {
        prompt:
          "What is the remainder when \\(2^{p}-1\\) is divided by \\(p\\), for a prime \\(p>2\\)?",
        steps: [
          "Use the companion form \\(a^{p}\\equiv a \\pmod p\\) with \\(a=2\\): \\(2^{p}\\equiv 2\\).",
          "Subtract 1 from both sides: \\(2^{p}-1 \\equiv 1 \\pmod p\\).",
          "So the remainder is 1, whatever the prime is.",
          "Check \\(p=7\\): \\(2^{7}-1 = 127 = 7\\times 18 + 1\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "\\(2^{100} \\bmod 101\\)?", answer: "\\(1\\)" },
        { prompt: "\\(2^{101} \\bmod 101\\)?", answer: "\\(2\\)", method: "\\(a^p\\equiv a\\)" },
        { prompt: "Does Fermat hold for a composite modulus?", answer: "No" },
        { prompt: "\\(3^{6} \\bmod 7\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "e45d77d9-dc8e-4228-bf43-398f5075f17c", // 2016 — remainder when 2^100 divided by 101
      traps: [
        {
          title: "The exponent p minus one gives 1; the exponent p gives the base back",
          body:
            "\\(2^{100} \\bmod 101 = 1\\) but \\(2^{101} \\bmod 101 = 2\\). CDS has set both, one year apart, and the option lists overlap. Check whether the exponent is \\(p-1\\) or \\(p\\) before answering, and remember the theorem needs the modulus **prime** — which is exactly what the 2017 statement question tests.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-pairing-to-zero",
      name: "Pairing terms that cancel modulo n",
      intuition:
        "In a sum of several powers, look for pairs whose bases add to the modulus. Each such pair is \\(a^{k} + (-a)^{k}\\), which vanishes when \\(k\\) is odd. A four-term sum can collapse to zero in one line.",
      definition:
        "If \\(a+b \\equiv 0 \\pmod n\\) — that is, \\(b \\equiv -a\\) — then for **odd** \\(k\\),\n" +
        "\\[a^{k}+b^{k} \\equiv a^{k}+(-a)^{k} = 0 \\pmod n.\\]\n" +
        "- Scan the bases for pairs summing to \\(n\\) (or to a multiple of \\(n\\)).\n" +
        "- The exponent **must be odd**; for even \\(k\\) the pair doubles instead of cancelling.\n" +
        "- More generally, reduce every base and look for any structure — equal residues in a difference cancel too, which is why \\(27^{27}-15^{27}\\) is 0 modulo 6.",
      formula: {
        label: "Cancelling pair",
        latex: "a+b\\equiv 0 \\pmod n,\\ k \\text{ odd} \\;\\Longrightarrow\\; a^{k}+b^{k}\\equiv 0",
      },
      authoredExample: {
        prompt: "What is the remainder when \\(11^{7} + 12^{7}\\) is divided by 23?",
        steps: [
          "The bases add to \\(11+12 = 23\\), which is the modulus, so \\(12 \\equiv -11 \\pmod{23}\\).",
          "The exponent 7 is odd, so \\(12^{7} \\equiv (-11)^{7} = -11^{7}\\).",
          "Adding, \\(11^{7} + 12^{7} \\equiv 11^{7} - 11^{7} = 0\\).",
          "So the remainder is 0 — no large number was ever computed.",
        ],
        answer: "\\(0\\).",
      },
      selfCheckExample: {
        prompt:
          "What is the remainder when \\(8^{9} + 15^{9}\\) is divided by 23?",
        steps: [
          "\\(8+15 = 23\\), so \\(15 \\equiv -8 \\pmod{23}\\).",
          "The exponent 9 is odd, so \\(15^{9}\\equiv(-8)^{9} = -8^{9}\\).",
          "The two terms cancel, leaving 0.",
          "Had the exponent been even, the sum would have been \\(2\\times 8^{k}\\) instead — the parity is the whole argument.",
        ],
        answer: "\\(0\\).",
      },
      practiceSet: [
        { prompt: "\\(13^{5}+16^{5} \\bmod 29\\)?", answer: "\\(0\\)", method: "\\(13+16=29\\), odd power" },
        { prompt: "\\(a^{4}+b^{4}\\) with \\(a+b=n\\). Remainder?", answer: "\\(2a^{4} \\bmod n\\)", method: "Even power does not cancel" },
        { prompt: "\\(27^{27}-15^{27} \\bmod 6\\)?", answer: "\\(0\\)", method: "Both bases \\(\\equiv 3\\)" },
        { prompt: "Which parity of exponent makes a pair cancel?", answer: "Odd" },
      ],
      pyqExampleId: "c33df10e-4e99-4804-9da0-6b316d008f8b", // 2016 — 13^5+14^5+15^5+16^5 divided by 29
      traps: [
        {
          title: "Pair the bases before reducing them individually",
          body:
            "In \\(13^5+14^5+15^5+16^5\\) modulo 29 the structure is two pairs: \\(13+16=29\\) and \\(14+15=29\\). Reducing each base on its own gives four unhelpful residues and a long computation; noticing the pairing gives 0 immediately. Always add the outermost bases together first to check for this.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-remainder-of-combinations",
      name: "Remainders of sums, differences and products of given remainders",
      intuition:
        "If you know each number's remainder, you know the remainder of any sum, difference or product — just combine the remainders and reduce. The only care needed is with a difference, which can come out negative.",
      definition:
        "Given \\(m \\equiv r_1\\) and \\(n \\equiv r_2 \\pmod d\\):\n" +
        "- \\(m+n \\equiv r_1+r_2\\);\n" +
        "- \\(m-n \\equiv r_1-r_2\\), and if that is negative **add \\(d\\)**;\n" +
        "- \\(mn \\equiv r_1 r_2\\);\n" +
        "then reduce into \\(0\\) to \\(d-1\\).\n" +
        "Note that \\(m>n\\) does **not** imply \\(r_1>r_2\\) — the difference's remainder is determined by the residues, not by which number is bigger.",
      formula: {
        label: "Combining remainders",
        latex: "m\\equiv r_1,\\ n\\equiv r_2 \\pmod d \\;\\Longrightarrow\\; m\\pm n\\equiv r_1\\pm r_2,\\ \\ mn\\equiv r_1r_2",
      },
      authoredExample: {
        prompt:
          "Two numbers leave remainders 5 and 7 on division by 9. What remainders do their sum and their product leave?",
        steps: [
          "Sum: \\(5+7 = 12 \\equiv 3 \\pmod 9\\).",
          "Product: \\(5\\times 7 = 35\\), and \\(35 = 9\\times 3 + 8\\), so \\(\\equiv 8\\).",
          "Check with actual numbers \\(14\\) and \\(16\\): sum \\(30 = 9(3)+3\\) and product \\(224 = 9(24)+8\\).",
          "The particular numbers never mattered — only their residues.",
        ],
        answer: "Sum leaves \\(3\\); product leaves \\(8\\).",
      },
      selfCheckExample: {
        prompt:
          "\\(m\\) leaves remainder 3 and \\(n\\) leaves remainder 6 on division by 8, with \\(m>n\\). What remainder does \\(m-n\\) leave?",
        steps: [
          "Combine the residues: \\(3-6 = -3\\).",
          "That is negative, so add the modulus: \\(-3+8 = 5\\).",
          "So \\(m-n \\equiv 5 \\pmod 8\\).",
          "Check with \\(m=19\\) and \\(n=14\\): \\(m-n = 5\\). And with \\(m=27, n=14\\): \\(13 = 8+5\\). The condition \\(m>n\\) only guarantees the difference is positive; it does not change the residue.",
        ],
        answer: "\\(5\\).",
      },
      practiceSet: [
        { prompt: "\\(r_1=4, r_2=6, d=12\\). Remainder of the sum?", answer: "\\(10\\)" },
        { prompt: "Same data: remainder of \\(m-n\\)?", answer: "\\(10\\)", method: "\\(-2+12\\)" },
        { prompt: "\\(x\\equiv2, y\\equiv3 \\pmod 6\\). \\((x-y) \\bmod 6\\)?", answer: "\\(5\\)" },
        { prompt: "\\(r_1=3,r_2=5,d=7\\). Product's remainder?", answer: "\\(1\\)", method: "\\(15 \\bmod 7\\)" },
      ],
      pyqExampleId: "25a4d9e5-f00b-4449-b67a-7662e7f9a47d", // 2025 — m ≡ 4, n ≡ 6 mod 12, remainders of sum and difference
      traps: [
        {
          title: "m greater than n does not mean its remainder is greater",
          body:
            "With \\(m\\equiv 4\\) and \\(n\\equiv 6\\) modulo 12 and \\(m>n\\), the difference is \\(4-6=-2\\equiv 10\\) — the same as the sum's remainder, which is why the 2025 question can truthfully say both are 10. Students who assume \\(r_1>r_2\\) because \\(m>n\\) compute \\(6-4=2\\) and get it wrong.",
        },
      ],
    },
  ],
  related: [
    { label: "Divisibility by factorisation", href: "/notes/cds-maths/number-system/cds-ns-factorisation" },
    { label: "HCF and LCM applications and remainder recipes", href: "/notes/cds-maths/number-system/cds-ns-hcf-lcm-applications" },
  ],
};
