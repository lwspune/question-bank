import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_NS_HCF_LCM_APPLICATIONS_NOTE: SubtopicNote = {
  subtopicName: "HCF and LCM Applications and Remainder Recipes",
  title: "HCF & LCM — Applications and Remainder Recipes",
  oneLineDefinition:
    "Deciding which of HCF and LCM a word problem wants, and the three standard remainder recipes: same remainder means take the HCF of the differences, a common remainder means LCM plus r, and a constant shortfall means LCM minus d.",
  whyItMatters:
    "Twenty PYQs and not one HARD — this is the most mechanical unit in the chapter, and the marks are there for anyone who can classify the question in ten seconds. Seven of the twenty were filed under Divisibility in the bank because they are phrased as remainder problems; they are HCF and LCM questions in disguise, and that is exactly why they are taught here.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsns-hcf-applications",
      name: "When the answer is the HCF: the largest common measure",
      intuition:
        "If a single size has to fit exactly into several given quantities, that size must divide all of them — so the **largest** such size is their HCF. Cutting, tiling, and \"greatest speed so the times are whole numbers\" are all this one question.",
      definition:
        "Use the HCF when the question asks for the **largest** quantity that divides several given quantities exactly:\n" +
        "- the largest square tile that paves a floor with no cutting;\n" +
        "- the greatest length that measures several lengths exactly;\n" +
        "- the greatest speed making each journey take a whole number of hours.\n" +
        "**Convert to a common unit first** — centimetres, paise, tenths of a kilometre — so the HCF is taken over integers. For a tiling count, divide each side by the HCF and multiply.",
      formula: {
        label: "Tile count from the HCF",
        latex: "\\text{tiles}=\\frac{L}{\\mathrm{HCF}}\\times\\frac{W}{\\mathrm{HCF}}",
      },
      authoredExample: {
        prompt:
          "A floor 6 m by 4.5 m is to be paved with identical square tiles, as large as possible and with no cutting. How many tiles are needed?",
        steps: [
          "Convert to centimetres: \\(600\\) cm by \\(450\\) cm.",
          "The tile side must divide both, so take \\(\\mathrm{HCF}(600,450)\\). Since \\(600=2^3\\cdot3\\cdot5^2\\) and \\(450=2\\cdot3^2\\cdot5^2\\), the HCF is \\(2\\cdot3\\cdot5^2=150\\) cm.",
          "Tiles along the length: \\(600/150 = 4\\). Along the width: \\(450/150 = 3\\).",
          "Total \\(4\\times 3 = 12\\) tiles.",
        ],
        answer: "\\(12\\) tiles of side \\(150\\) cm.",
      },
      selfCheckExample: {
        prompt:
          "What is the greatest length that can measure both 7 m and 3.85 m exactly?",
        steps: [
          "In centimetres the lengths are \\(700\\) and \\(385\\).",
          "Use the subtraction property: \\(\\gcd(700,385)=\\gcd(385,315)=\\gcd(315,70)=\\gcd(70,35)=35\\).",
          "So the greatest measure is \\(35\\) cm.",
          "Check: \\(700/35=20\\) and \\(385/35=11\\), both whole.",
        ],
        answer: "\\(35\\) cm.",
      },
      practiceSet: [
        { prompt: "Largest square tile for 12 m by 8 m?", answer: "\\(4\\) m" },
        { prompt: "Greatest speed for 12 km and 18 km in whole hours?", answer: "\\(6\\) km/h" },
        { prompt: "Why convert to centimetres first?", answer: "So the HCF is taken over integers" },
        { prompt: "Tiles for 600 cm by 450 cm at side 150 cm?", answer: "\\(12\\)" },
      ],
      pyqExampleId: "e6246195-2182-4aae-bccc-fdc1afd734af", // 2023 — floor 30 m 60 cm by 23 m 40 cm, minimum tiles
      traps: [
        {
          title: "Largest tile and minimum number of tiles are the same question",
          body:
            "A question asking for the **minimum** number of tiles still wants the **largest** tile, because bigger tiles means fewer of them. Both phrasings point at the HCF. Do not switch to the LCM because the word \"minimum\" appeared.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-lcm-applications",
      name: "When the answer is the LCM: things coinciding again",
      intuition:
        "If several cycles start together and you want the next moment they align, that moment must be a multiple of each cycle length — so the first one is their LCM. Bells, runners on a track and repeating schedules are all this.",
      definition:
        "Use the LCM when the question asks for the **first** time several repeating events coincide:\n" +
        "- bells ringing at different intervals, next ringing together;\n" +
        "- runners with different lap times, next meeting at the start;\n" +
        "- the least amount that is a whole number of two different units.\n" +
        "Then convert the LCM into the requested units, and if the question asks **how many times** within a window, divide the window by the LCM and take the floor.",
      formula: {
        label: "Coincidences within a window",
        latex: "\\text{count}=\\left\\lfloor \\frac{\\text{window}}{\\mathrm{LCM}}\\right\\rfloor",
      },
      authoredExample: {
        prompt:
          "Three bells ring at intervals of 6, 9 and 15 minutes. They ring together at 10:00 am. When do they next ring together?",
        steps: [
          "The next coincidence is at \\(\\mathrm{LCM}(6,9,15)\\) minutes.",
          "\\(6=2\\cdot3\\), \\(9=3^2\\), \\(15=3\\cdot5\\), so \\(\\mathrm{LCM}=2\\cdot3^2\\cdot5=90\\) minutes.",
          "90 minutes is 1 hour 30 minutes.",
          "So they next ring together at 11:30 am.",
        ],
        answer: "\\(11{:}30\\) am.",
      },
      selfCheckExample: {
        prompt:
          "Three runners complete a lap in 12, 18 and 24 minutes. They start together. After how long do all three meet at the start again?",
        steps: [
          "Take \\(\\mathrm{LCM}(12,18,24)\\).",
          "\\(12=2^2\\cdot3\\), \\(18=2\\cdot3^2\\), \\(24=2^3\\cdot3\\).",
          "Highest power of each prime: \\(2^3\\cdot 3^2 = 72\\).",
          "So they meet again after 72 minutes, that is 1 hour 12 minutes.",
        ],
        answer: "\\(72\\) minutes.",
      },
      practiceSet: [
        { prompt: "LCM of 20, 30, 35 in minutes?", answer: "\\(420\\)", method: "\\(7\\) hours" },
        { prompt: "How many times does a 90-minute cycle repeat in 6 hours?", answer: "\\(4\\)" },
        { prompt: "Bells at 4 and 6 min ring together after?", answer: "\\(12\\) min" },
        { prompt: "Least number of days to save a whole number of rupees at Rs 4.65/day?", answer: "\\(20\\)", method: "\\(100 \\mid 465n\\)" },
      ],
      pyqExampleId: "e37faeec-0a89-4e64-a3d0-41e8b5e7073c", // 2019 — laps of 252, 308, 198 seconds
      traps: [
        {
          title: "How many MORE times excludes the start",
          body:
            "If they ring together at 9 am and you are asked how many more times in the next 72 hours, count the multiples of the LCM **inside** the window and do not count the 9 am ring itself. With an LCM of 1575 minutes in 4320 minutes, only 1575 and 3150 fit — the answer is 2, not 3.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-lcm-in-a-range",
      name: "Largest, smallest and how many multiples in a range",
      intuition:
        "A number divisible by several given numbers is exactly a multiple of their LCM. So \"largest four-digit\", \"smallest five-digit\" and \"how many between A and B\" all reduce to arithmetic on one number — the LCM.",
      definition:
        "Let \\(L\\) be the LCM of the given divisors.\n" +
        "- **Largest** \\(k\\)-digit multiple: \\(L\\times\\left\\lfloor \\frac{\\text{largest }k\\text{-digit}}{L}\\right\\rfloor\\).\n" +
        "- **Smallest** \\(k\\)-digit multiple: \\(L\\times\\left\\lceil \\frac{\\text{smallest }k\\text{-digit}}{L}\\right\\rceil\\).\n" +
        "- **Count** of multiples up to \\(N\\): \\(\\left\\lfloor N/L \\right\\rfloor\\).\n" +
        "For a **least perfect square** divisible by the given numbers, take the LCM and then raise each prime exponent to the next even number.",
      formula: {
        label: "Multiples in a range",
        latex: "\\#\\{\\text{multiples of } L \\le N\\}=\\left\\lfloor \\frac{N}{L}\\right\\rfloor",
      },
      authoredExample: {
        prompt:
          "What is the largest three-digit number divisible by each of 8, 12 and 20?",
        steps: [
          "\\(8=2^3\\), \\(12=2^2\\cdot3\\), \\(20=2^2\\cdot5\\), so \\(\\mathrm{LCM}=2^3\\cdot3\\cdot5=120\\).",
          "Largest three-digit number is 999, and \\(\\lfloor 999/120\\rfloor = 8\\).",
          "So the answer is \\(120\\times 8 = 960\\).",
          "Check: \\(960/8=120\\), \\(960/12=80\\), \\(960/20=48\\), all whole.",
        ],
        answer: "\\(960\\).",
      },
      selfCheckExample: {
        prompt:
          "How many numbers from 1 to 500 are divisible by both 6 and 8?",
        steps: [
          "Divisible by both means divisible by \\(\\mathrm{LCM}(6,8)\\).",
          "\\(6=2\\cdot3\\) and \\(8=2^3\\), so \\(\\mathrm{LCM}=2^3\\cdot3=24\\).",
          "Count the multiples of 24 up to 500: \\(\\lfloor 500/24\\rfloor = 20\\).",
          "So there are 20 such numbers, the largest being \\(480\\).",
        ],
        answer: "\\(20\\).",
      },
      practiceSet: [
        { prompt: "LCM of 16, 36, 45, 48?", answer: "\\(720\\)" },
        { prompt: "Largest 4-digit multiple of 720?", answer: "\\(9360\\)" },
        { prompt: "Multiples of 13 between 500 and 1000?", answer: "\\(38\\)" },
        { prompt: "Least perfect square divisible by 3, 4, 5, 6, 7?", answer: "\\(44100\\)", method: "LCM 420, then even out exponents" },
      ],
      pyqExampleId: "2b544c6f-ec1c-44ca-8f02-af0c5ad73a54", // 2018 — highest four-digit number divisible by 16, 36, 45, 48
      traps: [
        {
          title: "An LCM multiple need not be a perfect square",
          body:
            "For the least perfect square divisible by 3, 4, 5, 6 and 7, the LCM is \\(420 = 2^2\\cdot3\\cdot5\\cdot7\\) — but 420 is not a square, because three of its exponents are odd. Raise each to the next even value: \\(2^2\\cdot3^2\\cdot5^2\\cdot7^2 = 44100\\). Stopping at the LCM, or at a multiple like 17640 that is divisible by everything but is not square, are both offered as options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-same-remainder-hcf",
      name: "Recipe 1: same unknown remainder means take the HCF of the differences",
      intuition:
        "If a divisor leaves the **same** remainder on several numbers, then it divides their differences exactly — the remainders cancel when you subtract. So the greatest such divisor is the HCF of the pairwise differences, and you never need to know the remainder.",
      definition:
        "If \\(N\\) leaves the same remainder on dividing \\(a\\), \\(b\\), \\(c\\), then \\(N\\) divides each of \\(b-a\\), \\(c-b\\) and \\(c-a\\). The **greatest** such \\(N\\) is\n" +
        "\\[\\mathrm{HCF}(b-a,\\; c-b,\\; c-a).\\]\n" +
        "- The two independent differences suffice; the third is their sum and adds nothing.\n" +
        "- If instead the remainder is **stated** — \"leaves remainder 5 in each case\" — subtract it from every number first and take the HCF of the results.",
      formula: {
        label: "Same-remainder recipe",
        latex: "N_{\\max}=\\mathrm{HCF}\\big(b-a,\\;c-b\\big)",
      },
      authoredExample: {
        prompt:
          "What is the greatest number that divides 43, 91 and 183 leaving the same remainder in each case?",
        steps: [
          "Take the differences: \\(91-43 = 48\\) and \\(183-91 = 92\\).",
          "\\(\\mathrm{HCF}(48,92)\\): \\(48=2^4\\cdot3\\), \\(92=2^2\\cdot23\\), so the HCF is \\(4\\).",
          "So the greatest such number is 4.",
          "Check the common remainder: \\(43 = 4\\times10+3\\), \\(91=4\\times22+3\\), \\(183=4\\times45+3\\) — remainder 3 each time.",
        ],
        answer: "\\(4\\), with common remainder \\(3\\).",
      },
      selfCheckExample: {
        prompt:
          "What is the greatest number that divides 245 and 1029 leaving remainder 5 in each case?",
        steps: [
          "Here the remainder is **given**, so subtract it first: \\(245-5 = 240\\) and \\(1029-5 = 1024\\).",
          "Now the number must divide both exactly, so take \\(\\mathrm{HCF}(240,1024)\\).",
          "\\(240 = 2^4\\cdot3\\cdot5\\) and \\(1024 = 2^{10}\\), so the HCF is \\(2^4 = 16\\).",
          "Check: \\(245 = 16\\times15+5\\) and \\(1029 = 16\\times64+5\\).",
        ],
        answer: "\\(16\\).",
      },
      practiceSet: [
        { prompt: "Same remainder on 12, 20, 32. Greatest divisor?", answer: "\\(4\\)", method: "HCF(8,12)" },
        { prompt: "Why do the remainders cancel?", answer: "They are equal, so subtracting removes them" },
        { prompt: "Remainder 3 on 15 and 27. Greatest divisor?", answer: "\\(12\\)", method: "HCF(12,24)" },
        { prompt: "How many differences do you need?", answer: "Two" },
      ],
      pyqExampleId: "d7bc1fb3-120c-4fbc-9c05-0e9c506ee817", // 2026 — greatest N dividing 600, 631, 724 leaving the same remainder
      traps: [
        {
          title: "Unknown remainder means differences; known remainder means subtract it",
          body:
            "These are two different recipes and using the wrong one is the commonest error here. \"Leaves the same remainder\" (unspecified) means take the HCF of the **differences**. \"Leaves remainder 5 in each case\" means **subtract 5** from each number first and take the HCF of those. Taking differences when the remainder is given still works, but subtracting a remainder that was never given does not.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-common-remainder-lcm",
      name: "Recipe 2: the same remainder from every divisor means LCM times k, plus r",
      intuition:
        "If \\(N\\) leaves remainder \\(r\\) on dividing by several numbers, then \\(N - r\\) is divisible by all of them — so \\(N - r\\) is a multiple of their LCM. That single sentence converts the whole family of questions into arithmetic on the LCM.",
      definition:
        "If \\(N \\equiv r\\) modulo each of \\(d_1,\\ldots,d_k\\) (with \\(r\\) less than every \\(d_i\\)), then\n" +
        "\\[N = \\mathrm{LCM}(d_1,\\ldots,d_k)\\cdot k + r.\\]\n" +
        "- For the **smallest** such \\(N\\) with a digit condition, find the least \\(k\\) making \\(N\\) large enough.\n" +
        "- For the **largest** \\(k\\)-digit such \\(N\\), take \\(\\lfloor(\\text{max} - r)/L\\rfloor\\) then multiply back and add \\(r\\).\n" +
        "- For divisors that are successive **powers** of one prime, the LCM is just the highest power.",
      formula: {
        label: "Common-remainder recipe",
        latex: "N = L\\,k + r, \\qquad L=\\mathrm{LCM}(d_1,\\dots,d_k)",
      },
      authoredExample: {
        prompt:
          "What is the smallest number greater than 1 that leaves remainder 1 when divided by 4, 5 and 6?",
        steps: [
          "\\(N-1\\) must be divisible by 4, 5 and 6, so by their LCM.",
          "\\(\\mathrm{LCM}(4,5,6)=60\\).",
          "So \\(N = 60k+1\\).",
          "The smallest value above 1 takes \\(k=1\\), giving \\(N = 61\\). Check: \\(61 = 4(15)+1 = 5(12)+1 = 6(10)+1\\).",
        ],
        answer: "\\(61\\).",
      },
      selfCheckExample: {
        prompt:
          "What is the largest four-digit number that leaves remainder 2 when divided by 6, 9 and 12?",
        steps: [
          "\\(\\mathrm{LCM}(6,9,12)\\): \\(6=2\\cdot3\\), \\(9=3^2\\), \\(12=2^2\\cdot3\\), so \\(\\mathrm{LCM}=2^2\\cdot3^2=36\\).",
          "So \\(N = 36k+2\\), and we need \\(N \\le 9999\\), i.e. \\(36k \\le 9997\\).",
          "\\(\\lfloor 9997/36\\rfloor = 277\\), and \\(36\\times 277 = 9972\\).",
          "So \\(N = 9974\\). Check \\(9972\\) is divisible by 6, 9 and 12, so each division leaves 2.",
        ],
        answer: "\\(9974\\).",
      },
      practiceSet: [
        { prompt: "Remainder 3 from 4, 6, 7, 9. Form of \\(N\\)?", answer: "\\(252k+3\\)" },
        { prompt: "Smallest 4-digit \\(N\\) of the form \\(252k+3\\)?", answer: "\\(1011\\)" },
        { prompt: "LCM of \\(2,2^2,\\dots,2^{10}\\)?", answer: "\\(2^{10}\\)" },
        { prompt: "Remainder 7 from both 18 and 11. Form?", answer: "\\(198k+7\\)" },
      ],
      pyqExampleId: "0b79a604-037d-471c-a287-f009f888de83", // 2025 — remainder 3 on division by 4, 6, 7, 9; smallest 4-digit
      traps: [
        {
          title: "The stated remainder must be smaller than every divisor",
          body:
            "\"Remainder 7 on division by 18 as well as 11\" is legitimate because \\(7<11\\). If a question offered remainder 9 with a divisor of 8 it would be inconsistent. Check the smallest divisor against \\(r\\) before applying the recipe — it is a one-second sanity test that occasionally is the question.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-constant-deficit-lcm",
      name: "Recipe 3: a constant shortfall means LCM times k, minus d",
      intuition:
        "When the remainders differ but each falls short of its divisor by the **same** amount, add that amount and everything becomes exact. So \\(N + d\\) is a multiple of the LCM, and \\(N = Lk - d\\). Spotting the constant shortfall is the whole skill.",
      definition:
        "If \\(N\\) leaves remainder \\(d_i - d\\) on dividing by \\(d_i\\), for every \\(i\\) and a fixed \\(d\\), then \\(N+d\\) is divisible by every \\(d_i\\), so\n" +
        "\\[N = \\mathrm{LCM}(d_1,\\ldots,d_k)\\cdot k - d.\\]\n" +
        "- The classic signature is remainders one less than the divisors: remainders \\(1,2,3,4,5\\) for divisors \\(2,3,4,5,6\\) means \\(d=1\\).\n" +
        "- Always **compute divisor minus remainder for each pair** and check the value is the same before using this. If the shortfalls differ, no single recipe applies.",
      formula: {
        label: "Constant-shortfall recipe",
        latex: "N = L\\,k - d, \\qquad d = d_i - r_i \\ \\text{(the same for every } i)",
      },
      authoredExample: {
        prompt:
          "Find the smallest positive number leaving remainders 3, 4 and 5 when divided by 4, 5 and 6 respectively.",
        steps: [
          "Compute divisor minus remainder for each: \\(4-3=1\\), \\(5-4=1\\), \\(6-5=1\\). The shortfall is a constant 1.",
          "So \\(N+1\\) is divisible by 4, 5 and 6, hence by \\(\\mathrm{LCM}=60\\).",
          "So \\(N = 60k-1\\).",
          "The smallest positive value is \\(k=1\\), giving \\(N=59\\). Check \\(59 = 4(14)+3 = 5(11)+4 = 6(9)+5\\).",
        ],
        answer: "\\(59\\).",
      },
      selfCheckExample: {
        prompt:
          "Find the smallest positive number leaving remainders 5, 7 and 9 when divided by 6, 8 and 10 respectively.",
        steps: [
          "Shortfalls: \\(6-5=1\\), \\(8-7=1\\), \\(10-9=1\\) — constant, so the recipe applies with \\(d=1\\).",
          "\\(\\mathrm{LCM}(6,8,10)\\): \\(6=2\\cdot3\\), \\(8=2^3\\), \\(10=2\\cdot5\\), so \\(\\mathrm{LCM}=2^3\\cdot3\\cdot5=120\\).",
          "So \\(N = 120k-1\\), and the smallest positive is \\(119\\).",
          "Check: \\(119 = 6(19)+5 = 8(14)+7 = 10(11)+9\\).",
        ],
        answer: "\\(119\\).",
      },
      practiceSet: [
        { prompt: "Remainders 1,2,3,4 for 2,3,4,5. Shortfall?", answer: "\\(1\\)" },
        { prompt: "Smallest such number?", answer: "\\(59\\)", method: "\\(\\mathrm{LCM}=60\\), so \\(60-1\\)" },
        { prompt: "Remainders 2, 8, 11, 20 for 6, 12, 15, 24. Shortfall?", answer: "\\(4\\)" },
        { prompt: "Form of that number?", answer: "\\(120k-4\\)" },
      ],
      pyqExampleId: "e22f4c7d-12d2-425b-a902-7766cbed9c67", // 2016 — remainders 1..5 for divisors 2..6, count between 0 and 100
      traps: [
        {
          title: "Check the shortfall is really constant before reaching for this",
          body:
            "Remainders 2, 8, 11, 20 for divisors 6, 12, 15, 24 look unrelated, but each is exactly 4 short — so \\(N = 120k-4\\). Conversely, if the shortfalls come out unequal, neither this recipe nor recipe 2 applies and you must solve the congruences directly. Compute all the differences first; it takes seconds and decides the whole method.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-layered-remainder-conditions",
      name: "Layering an extra condition on a remainder recipe",
      intuition:
        "Sometimes a recipe gives you a family — \\(N = Lk + r\\) — and the question adds one more demand, such as being a multiple of 11. Substitute the family into the extra condition and you are left with a small congruence in \\(k\\), which you can solve by testing a few values.",
      definition:
        "Procedure:\n" +
        "- Apply the appropriate recipe to get the family \\(N = Lk + r\\).\n" +
        "- Substitute into the extra condition. If \\(N\\) must be divisible by \\(m\\), reduce \\(L\\) and \\(r\\) modulo \\(m\\) and solve \\(Lk + r \\equiv 0 \\pmod m\\) for \\(k\\).\n" +
        "- Take the least non-negative \\(k\\) that works, then compute \\(N\\).\n" +
        "For **two different remainders** with no common pattern, listing one family and testing it against the other condition is faster than any formula.",
      formula: {
        label: "Layered condition",
        latex: "m \\mid (Lk+r) \\;\\Longrightarrow\\; Lk \\equiv -r \\pmod m",
      },
      authoredExample: {
        prompt:
          "Find the least positive number that leaves remainder 2 on division by 3, 4 and 5, and is also divisible by 7.",
        steps: [
          "Recipe 2 gives \\(N = 60k+2\\), since \\(\\mathrm{LCM}(3,4,5)=60\\).",
          "Now impose \\(7 \\mid N\\). Reduce modulo 7: \\(60 \\equiv 4\\), so we need \\(4k+2 \\equiv 0 \\pmod 7\\), i.e. \\(4k \\equiv 5 \\pmod 7\\).",
          "Since \\(4\\times 2 = 8 \\equiv 1\\), the inverse of 4 is 2, so \\(k \\equiv 2\\times 5 = 10 \\equiv 3 \\pmod 7\\).",
          "Least \\(k=3\\), giving \\(N = 182\\). Check: \\(182 = 3(60)+2 = 4(45)+2 = 5(36)+2\\) and \\(182 = 7\\times 26\\).",
        ],
        answer: "\\(182\\).",
      },
      selfCheckExample: {
        prompt:
          "Find the smallest positive integer that leaves remainder 3 on division by 10 and remainder 1 on division by 7.",
        steps: [
          "The first condition gives the family \\(x = 10k+3\\): 3, 13, 23, 33, 43, ...",
          "Test each against the second condition, reducing modulo 7: \\(3 \\to 3\\), \\(13 \\to 6\\), \\(23 \\to 2\\), \\(33 \\to 5\\), \\(43 \\to 1\\).",
          "So \\(x = 43\\) is the first to work.",
          "Check: \\(43 = 10(4)+3\\) and \\(43 = 7(6)+1\\).",
        ],
        answer: "\\(43\\).",
      },
      practiceSet: [
        { prompt: "\\(N=60k+2\\) and \\(7\\mid N\\). Least \\(k\\)?", answer: "\\(3\\)" },
        { prompt: "Family for remainder 5 from 6, 12, 15, 18?", answer: "\\(180k+5\\)" },
        { prompt: "Inverse of 4 modulo 7?", answer: "\\(2\\)" },
        { prompt: "Fastest route for two unrelated remainders?", answer: "List one family, test the other condition" },
      ],
      pyqExampleId: "f583cb25-8fe8-43c1-9d4c-349635de2adc", // 2024 — least multiple of 11 leaving remainder 5 on 6, 12, 15, 18
      traps: [
        {
          title: "Do not stop at the family — the extra condition is the question",
          body:
            "\\(N = 180k+5\\) is only the first half of the 2024 question; the answer must also be a multiple of 11, which forces \\(k \\equiv 7 \\pmod{11}\\) and gives \\(N = 1265\\). An option list built around the family alone will contain several values satisfying the remainder conditions and failing the divisibility one.",
        },
      ],
    },
  ],
  related: [
    { label: "HCF and LCM laws and fractions", href: "/notes/cds-maths/number-system/cds-ns-hcf-lcm-laws" },
    { label: "Remainders by congruence and cyclicity", href: "/notes/cds-maths/number-system/cds-ns-congruences" },
  ],
};
