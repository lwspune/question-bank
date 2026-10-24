import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAR_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Equations from Word Problems",
  title: "Equations from Word Problems",
  oneLineDefinition:
    "Turn each fact in the question into an equation in one or two unknowns, solve, and check the answer against every fact, or put the options straight into the facts.",
  whyItMatters:
    "Fifteen questions in the bank, twelve EASY and three MODERATE, all from the 2025 shifts. Six give two facts about two numbers, two ask which relation follows from two equations, two are about ages, and five share a fixed total among a new number of people or ask for a simple average.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrareq-two-numbers",
      name: "Two facts about two numbers",
      intuition:
        "Two unknowns need two facts. Write each fact as an equation, and the pair settles both numbers. Several kinds come up so often that a one-line route exists for each.",
      definition:
        "- **Sum S and difference D:** larger \\(= \\frac{S + D}{2}\\), smaller \\(= \\frac{S - D}{2}\\).\n" +
        "- **Consecutive numbers:** call the middle one \\(x\\). Three consecutive even (or odd) numbers are \\(x - 2\\), \\(x\\), \\(x + 2\\), and the middle one is the sum divided by 3.\n" +
        "- **A two-digit number** with tens digit \\(a\\) and units digit \\(b\\) is \\(10a + b\\). Reversing the digits changes it by \\(9(b - a)\\).\n" +
        "- **Heads and legs:** pretend every animal has 2 legs. The legs left over, divided by 2, give the number of 4-legged animals.\n" +
        "- **Option test (fast route):** put each option into both facts and keep the one that fits both. It is safe when the options are the unknowns themselves; when the question asks for something built from them (a product, a sum of squares), find the numbers first.",
      formula: {
        label: "Two numbers from their sum and difference",
        latex: "\\text{Larger} = \\frac{S + D}{2} \\qquad \\text{Smaller} = \\frac{S - D}{2}",
        symbols: [
          { symbol: "S", meaning: "the sum of the two numbers" },
          { symbol: "D", meaning: "their difference" },
        ],
      },
      authoredExample: {
        prompt: "A farmer has hens and goats: 30 heads and 84 legs in all. How many goats are there?",
        steps: [
          "Full method: \\(h + g = 30\\) and \\(2h + 4g = 84\\). Doubling the first gives \\(2h + 2g = 60\\); subtracting, \\(2g = 24\\), so \\(g = 12\\).",
          "Fast route: if all 30 were hens there would be 60 legs. The other 24 legs come 2 at a time from goats, so there are 12 goats.",
          "Check: 18 hens and 12 goats give \\(36 + 48 = 84\\) legs.",
        ],
        answer: "12 goats",
      },
      selfCheckExample: {
        prompt: "The sum of two numbers is 70 and their difference is 18. What is the larger number?",
        steps: [
          "Larger \\(= \\frac{70 + 18}{2} = 44\\).",
          "Check: the smaller is 26, and \\(44 + 26 = 70\\), \\(44 - 26 = 18\\).",
        ],
        answer: "44",
      },
      practiceSet: [
        {
          prompt: "The sum of three consecutive odd numbers is 57. What is the smallest of them?",
          answer: "17",
          method: "Middle \\(= 57 \\div 3 = 19\\), so 17, 19, 21.",
        },
        { prompt: "If \\(a + b = 11\\) and \\(a - b = 3\\), find \\(a\\).", answer: "7" },
        {
          prompt: "The digits of a two-digit number add up to 9. Reversing the digits makes the number 27 larger. What is the number?",
          answer: "36",
          method: "\\(9(b - a) = 27\\) gives \\(b - a = 3\\); with \\(a + b = 9\\), \\(a = 3\\) and \\(b = 6\\).",
        },
        { prompt: "Two pens and a notebook cost ₹46. A pen costs ₹8. What does the notebook cost?", answer: "₹30" },
      ],
      pyqExampleId: "2b4dac51-a205-4cde-b271-75b92e71fa81",
      traps: [
        {
          title: "Stopping at the middle number",
          body:
            "When the question asks for the largest of three consecutive even numbers, the sum divided by 3 gives the middle one. Add 2 to answer what was asked.",
        },
        {
          title: "Taking the digit difference as the change",
          body:
            "Reversing a two-digit number changes it by 9 times the difference of its digits, not by the difference itself. A change of 36 means the digits differ by 4.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrareq-combine",
      name: "Which relation follows from two equations",
      intuition:
        "You are not asked to solve for each letter, only to find a relation that must be true. Adding or subtracting the two equations usually cancels the letters you do not need.",
      definition:
        "- Add the two equations, or subtract one from the other, then cancel any letter that appears on both sides.\n" +
        "- Rearrange what is left and compare it with each option.\n" +
        "- **Number test (fast route):** choose values for two letters, use the given equations to work out the rest, and test every option. An option that fails is out.\n" +
        "- The number test can only rule options out. If two options survive, try a second set of numbers, or prove the survivor by adding the equations.",
      authoredExample: {
        prompt:
          "If \\(P - Q = R\\) and \\(R + S = 2P\\), which of these must be true: \\(S = P + Q\\), \\(S = P - Q\\), \\(Q = P + S\\), \\(R = S\\)?",
        steps: [
          "Add the equations: \\(P - Q + R + S = R + 2P\\).",
          "Cancel \\(R\\), and take \\(P\\) from both sides: \\(S - Q = P\\), so \\(S = P + Q\\).",
          "Number test: take \\(P = 5\\), \\(Q = 2\\). Then \\(R = 3\\) and \\(S = 10 - 3 = 7\\). Only \\(S = P + Q = 7\\) holds; \\(P - Q = 3\\), \\(P + S = 12\\) and \\(R = 3\\) all fail.",
        ],
        answer: "\\(S = P + Q\\)",
      },
      selfCheckExample: {
        prompt: "If \\(a + b = 2c\\) and \\(b + c = 2a\\), what is \\(a + b + c\\) in terms of \\(a\\)?",
        steps: [
          "Subtract the second equation from the first: \\(a - c = 2c - 2a\\), so \\(3a = 3c\\) and \\(c = a\\).",
          "Then \\(a + b = 2a\\), so \\(b = a\\). The sum is \\(a + a + a = 3a\\).",
        ],
        answer: "\\(3a\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(M + N = 2K\\) and \\(M - N = 2L\\), what is \\(M\\) in terms of \\(K\\) and \\(L\\)?",
          answer: "\\(M = K + L\\)",
          method: "Add: \\(2M = 2K + 2L\\).",
        },
        { prompt: "If \\(a = b + 3\\) and \\(c = b - 3\\), what is \\(a - c\\)?", answer: "6" },
        { prompt: "If \\(p + q = 7\\) and \\(q + r = 5\\), what is \\(p - r\\)?", answer: "2", method: "Subtract the second from the first." },
        { prompt: "If \\(x + y = 2z\\), what is \\(x + y + z\\) in terms of \\(z\\)?", answer: "\\(3z\\)" },
      ],
      pyqExampleId: "2e4ec42f-313a-4c2a-ae4e-f98d6e223db5",
      traps: [
        {
          title: "Trusting one number test",
          body:
            "One set of numbers can let a wrong option pass by chance. Use numbers to rule options out, then confirm the last one by adding or subtracting the equations.",
        },
        {
          title: "Picking numbers that break the given equations",
          body:
            "Choose only two letters freely and work out the others from the equations. Numbers that do not satisfy the given equations prove nothing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrareq-ages",
      name: "Ages: the gap never changes",
      intuition:
        "Everyone grows older at the same rate, so the difference between two people's ages is the same in every year. Write each age in terms of one unknown and move it forward or back by the same number of years for everyone.",
      definition:
        "- Call the present age \\(x\\). Then \\(t\\) years ago it was \\(x - t\\), and in \\(t\\) years it will be \\(x + t\\).\n" +
        "- In \\(t\\) years **both** people are \\(t\\) years older.\n" +
        "- The age gap stays fixed; the ratio of the ages changes.\n" +
        "- **\"Now k times what it was t years ago\":** \\(x = k(x - t)\\).\n" +
        "- **Option test:** ages are small whole numbers, so trying each option in both statements is often the fastest route.",
      formula: {
        label: "An age now and an age t years ago",
        latex: "x = k(x - t)",
        symbols: [
          { symbol: "x", meaning: "the present age" },
          { symbol: "t", meaning: "the number of years ago" },
          { symbol: "k", meaning: "how many times the old age the present age is" },
        ],
      },
      authoredExample: {
        prompt: "A father is 24 years older than his son. In 6 years he will be three times as old as his son. How old is the son now?",
        steps: [
          "Son \\(= s\\), father \\(= s + 24\\).",
          "In 6 years: \\(s + 30 = 3(s + 6) = 3s + 18\\), so \\(2s = 12\\) and \\(s = 6\\).",
          "Check: now 6 and 30; in 6 years 12 and 36, and 36 is three times 12. The gap is still 24.",
        ],
        answer: "6 years",
      },
      selfCheckExample: {
        prompt: "A girl's age now is three times what it was 8 years ago. How old is she now?",
        steps: [
          "\\(x = 3(x - 8)\\) gives \\(x = 3x - 24\\), so \\(x = 12\\).",
          "Check: 8 years ago she was 4, and 12 is three times 4.",
        ],
        answer: "12 years",
      },
      practiceSet: [
        { prompt: "A's age now is twice what it was 15 years ago. What is A's age now?", answer: "30 years" },
        { prompt: "Ravi is 7 years older than Sita. How much older than Sita will he be in 10 years?", answer: "7 years" },
        { prompt: "The ages of two brothers add up to 26 and differ by 4. How old is the elder brother?", answer: "15 years" },
        {
          prompt: "A man is 45 and his son is 12. After how many years will the man be twice as old as his son?",
          answer: "21 years",
          method: "\\(45 + t = 2(12 + t)\\).",
        },
      ],
      pyqExampleId: "1c5ebd71-5fdb-49cb-801a-3f29b45ef765",
      traps: [
        {
          title: "Ageing only one person",
          body:
            "\"In 20 years\" adds 20 to every age in the question. Adding it to the father's age only breaks the equation.",
        },
        {
          title: "Keeping the ratio fixed",
          body:
            "A mother three times her son's age now will not be three times his age later. The difference stays the same; the ratio shrinks towards 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrareq-shares",
      name: "Fixed totals and equal shares",
      intuition:
        "When people drop out of a shared bill, the bill does not shrink: the same total is split among fewer people. Find the total first, then divide it by the new count.",
      definition:
        "- **Total \\(=\\) number of people \\(\\times\\) share.** When people leave or join and the total stays the same, the new share is the total divided by the new count.\n" +
        "- **Fast route:** the share scales by old count over new count. With 12 people becoming 8, each pays \\(\\frac{12}{8} = 1.5\\) times as much.\n" +
        "- **Average of two numbers:** their sum divided by 2.\n" +
        "- **Evenly spaced numbers** (consecutive, consecutive odd, consecutive even): the average is the middle term, or (first \\(+\\) last) \\(\\div 2\\).\n" +
        "- The last of \\(n\\) consecutive odd numbers starting at \\(a\\) is \\(a + 2(n - 1)\\).",
      formula: {
        label: "New share and the average of evenly spaced numbers",
        latex:
          "\\text{New share} = \\frac{\\text{Old count} \\times \\text{Old share}}{\\text{New count}} \\qquad \\text{Average} = \\frac{\\text{First} + \\text{Last}}{2}",
      },
      authoredExample: {
        prompt: "Twelve people agree to pay ₹30 each for a gift. Four of them drop out. How much must each of the others pay so that the gift can still be bought?",
        steps: [
          "Total \\(= 12 \\times 30 = 360\\) rupees.",
          "8 people remain: \\(360 \\div 8 = 45\\) rupees each.",
          "Fast route: the share grows by \\(\\frac{12}{8} = 1.5\\), and \\(30 \\times 1.5 = 45\\).",
        ],
        answer: "₹45",
      },
      selfCheckExample: {
        prompt: "What is the average of 7 consecutive even numbers starting from 20?",
        steps: [
          "The numbers are 20, 22, 24, 26, 28, 30, 32. The middle one is 26.",
          "Check: \\(\\frac{20 + 32}{2} = 26\\).",
        ],
        answer: "26",
      },
      practiceSet: [
        { prompt: "₹900 is shared equally by 15 people. Then 3 more people join. What is the new share?", answer: "₹50" },
        { prompt: "What is the average of 14 and 30?", answer: "22" },
        { prompt: "What is the average of 5 consecutive odd numbers starting from 31?", answer: "35" },
        {
          prompt: "Five people pay ₹60 each for a trip. One more person joins and the total cost stays the same. What does each pay now?",
          answer: "₹50",
        },
      ],
      pyqExampleId: "cc3dbe24-90cf-4769-a93e-9a8b4a9cb707",
      traps: [
        {
          title: "Dividing the old share instead of the total",
          body:
            "When people leave, first rebuild the total (count times share), then divide by the people who remain. Dividing the old share by anything gives a smaller amount, which cannot be right.",
        },
        {
          title: "Finding the last term by adding the count",
          body:
            "Five consecutive odd numbers starting at 15 end at \\(15 + 2 \\times 4 = 23\\), not \\(15 + 5 = 20\\). Their average is the middle one, 19.",
        },
      ],
    },
  ],
};
