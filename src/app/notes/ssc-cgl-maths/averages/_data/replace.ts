import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_AV_REPLACE_NOTE: SubtopicNote = {
  subtopicName: "Replacements and Corrections",
  title: "Replacements and Corrections",
  oneLineDefinition:
    "When the number of members stays the same, the average moves only because the total moves, and the change in the total is the count times the change in the average.",
  whyItMatters:
    "Eight questions in the bank, all EASY: a person replaced, two people replaced, a mark misread, a constant added to every value. Each is one multiplication or one division once you see that the count has not changed.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscavre-replace",
      name: "Replacing members, or changing every value",
      intuition:
        "A replacement keeps the count fixed. If the average of n members rises by r, the total has risen by n times r, and all of that extra came from the swap: the new member brought it in.",
      definition:
        "- **One member replaced:** new member \\(=\\) old member \\(+ n \\times \\) rise. If the average falls, the rise is negative and the new member is lighter, younger or lower.\n" +
        "- **Several members replaced:** total of the new members \\(=\\) total of the old ones \\(+ n \\times \\) rise. Here \\(n\\) is the size of the whole group, not the number replaced.\n" +
        "- **Same number added to every value:** the average goes up by that number. Subtracting works the same way.\n" +
        "- **Every value multiplied by the same number:** the average is multiplied by it too.",
      formula: {
        label: "Replacement and shifts",
        latex: "\\text{New} = \\text{Old} + n \\times \\text{rise} \\qquad \\overline{x + c} = \\bar{x} + c \\qquad \\overline{cx} = c\\,\\bar{x}",
        symbols: [
          { symbol: "n", meaning: "the size of the group, which does not change" },
          { symbol: "c", meaning: "a number added to, or multiplied into, every value" },
        ],
      },
      authoredExample: {
        prompt: "The average weight of 8 men rises by 2.5 kg when a man weighing 65 kg is replaced by a new man. What does the new man weigh?",
        steps: [
          "Full method: the total rises by \\(8 \\times 2.5 = 20\\) kg, and all of it comes from the swap.",
          "New man \\(= 65 + 20 = 85\\) kg.",
          "Check with totals: if the old average was \\(A\\), then \\(8A - 65 + 85 = 8A + 20 = 8(A + 2.5)\\).",
        ],
        answer: "85 kg",
      },
      selfCheckExample: {
        prompt: "The average age of 12 workers falls by 1.5 years when two workers aged 50 and 46 are replaced by two new workers. What is the average age of the two new workers?",
        steps: [
          "The total falls by \\(12 \\times 1.5 = 18\\) years.",
          "The two new workers total \\(50 + 46 - 18 = 78\\) years, an average of \\(39\\) years.",
        ],
        answer: "39 years",
      },
      practiceSet: [
        { prompt: "The average of 20 numbers is 35. If 4 is subtracted from each number, what is the new average?", answer: "31" },
        { prompt: "The average of 10 numbers is 12. Each number is multiplied by 3. What is the new average?", answer: "36" },
        {
          prompt: "In a group of 6 girls, one girl weighing 40 kg is replaced by a new girl and the average weight falls by 1 kg. What does the new girl weigh?",
          answer: "34 kg",
          method: "\\(40 + 6 \\times (-1) = 34\\).",
        },
        { prompt: "The average of 5 numbers rises by 4 when one of them, 20, is replaced by a new number. What is the new number?", answer: "40" },
      ],
      pyqExampleId: "d2e261f1-57f6-41e1-a539-b6bd6183eb63",
      traps: [
        {
          title: "Using n + 1 for a replacement",
          body:
            "A replacement does not change the count, so the total changes by \\(n \\times\\) rise. The \\((n + 1)\\) form is only for a member who joins.",
        },
        {
          title: "Multiplying the rise by the number replaced",
          body:
            "If 2 members of a group of 9 are replaced and the average rises by 3, the total rises by \\(9 \\times 3 = 27\\), not \\(2 \\times 3 = 6\\): every member's share went up.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscavre-correction",
      name: "Correcting a wrong entry",
      intuition:
        "A misread value puts the total out by the difference between the true and the wrong value. The count is still right, so the average is out by that difference shared over the count.",
      definition:
        "- **Error** \\(=\\) correct value \\(-\\) wrong value. Keep the sign.\n" +
        "- **Correct average \\(=\\) wrong average \\(+\\) error \\(\\div n\\).**\n" +
        "- A correct value larger than the wrong one raises the average; a smaller one lowers it.\n" +
        "- Several wrong entries: add their errors, with signs, before dividing.\n" +
        "- Full method, when the numbers are awkward: wrong total \\(= n \\times\\) wrong average, fix the total, divide again.",
      formula: {
        label: "Correcting an average",
        latex: "\\text{Correct average} = \\text{Wrong average} + \\frac{\\text{Correct value} - \\text{Wrong value}}{n}",
      },
      authoredExample: {
        prompt: "The average of 25 numbers was found to be 40. Later it was found that 73 had been copied as 37. What is the correct average?",
        steps: [
          "Fast route: error \\(= 73 - 37 = +36\\), so the average rises by \\(\\frac{36}{25} = 1.44\\).",
          "Correct average \\(= 40 + 1.44 = 41.44\\).",
          "Full method check: \\(1000 - 37 + 73 = 1036\\) and \\(\\frac{1036}{25} = 41.44\\).",
        ],
        answer: "41.44",
      },
      selfCheckExample: {
        prompt: "The average marks of 50 students were 64. Two marks were entered as 45 and 81 instead of 54 and 18. What is the correct average?",
        steps: [
          "Errors: \\(54 - 45 = +9\\) and \\(18 - 81 = -63\\), a total of \\(-54\\).",
          "Correct average \\(= 64 - \\frac{54}{50} = 64 - 1.08 = 62.92\\).",
        ],
        answer: "62.92",
      },
      practiceSet: [
        { prompt: "The average of 10 numbers was 20, but one number was read as 32 instead of 23. What is the correct average?", answer: "19.1" },
        { prompt: "The average height of 16 plants was 50 cm. One height was recorded as 42 cm instead of 58 cm. What is the correct average?", answer: "51 cm" },
        { prompt: "A wrong entry made the average of 40 values 0.5 too high. By how much was the total too high?", answer: "20" },
        { prompt: "The average of 30 marks was 70. A mark of 90 was entered as 60. What is the correct average?", answer: "71" },
      ],
      pyqExampleId: "637799c7-548f-44d3-88e3-cc0730336de7",
      traps: [
        {
          title: "Subtracting the wrong way round",
          body:
            "The error is correct minus wrong. If 91 was misread as 19, the total was 72 too low, so the correct average is higher than the one found.",
        },
        {
          title: "Moving the average by the whole error",
          body:
            "The difference between the correct and wrong value is shared by all n values, so the average moves by the difference divided by n, not by the difference itself.",
        },
      ],
    },
  ],
};
