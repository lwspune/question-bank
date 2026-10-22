import type { SubtopicNote } from "@/app/notes/_types";

export const AF_DF_CONVERT_NOTE: SubtopicNote = {
  subtopicName: "Decimal and Fraction Conversion",
  title: "Place Value, and Moving Between Fractions and Decimals",
  oneLineDefinition:
    "Each place after the point is a tenth of the one before it, so every terminating decimal is a fraction over 10, 100 or 1000, and every such fraction is a decimal.",
  whyItMatters:
    "Almost every question here is one step: name a place, read a decimal in words, or turn a fraction into a decimal and back. The marks go on counting places (six hundredths against six tenths) and on stopping before lowest terms when the options carry the unreduced fraction as well.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "afdf-place-value",
      name: "Place value after the decimal point",
      intuition:
        "Moving one place to the right of the point divides by 10. So the first place counts tenths, the second hundredths, the third thousandths, and a digit is worth its own value times its place.",
      definition:
        "The value of a digit is the digit times its place. Every zero after the point still holds a place, so count each one. Between any two decimals there are infinitely many more: between \\(0.3\\) and \\(0.4\\) lie \\(0.31\\), \\(0.311\\), \\(0.3111\\) and so on.",
      table: {
        columns: ["Place after the point", "Worth", "In 6.2817"],
        rows: [
          { cells: ["1st: tenths", "\\(\\tfrac{1}{10} = 0.1\\)", "the 2 is worth \\(\\tfrac{2}{10} = 0.2\\)"] },
          { cells: ["2nd: hundredths", "\\(\\tfrac{1}{100} = 0.01\\)", "the 8 is worth \\(\\tfrac{8}{100} = 0.08\\)"] },
          { cells: ["3rd: thousandths", "\\(\\tfrac{1}{1000} = 0.001\\)", "the 1 is worth \\(\\tfrac{1}{1000} = 0.001\\)"] },
          {
            cells: ["4th: ten-thousandths", "\\(\\tfrac{1}{10000} = 0.0001\\)", "the 7 is worth \\(\\tfrac{7}{10000} = 0.0007\\)"],
          },
        ],
      },
      selfCheckExample: {
        prompt: "What is the place value of the 9 in \\(15.0294\\)?",
        steps: [
          "The places after the point hold 0 (tenths), 2 (hundredths), 9 (thousandths) and 4 (ten-thousandths).",
          "So the 9 is worth \\(\\tfrac{9}{1000}\\).",
        ],
        answer: "\\(\\tfrac{9}{1000} = 0.009\\).",
      },
      practiceSet: [
        { prompt: "Which digit of \\(8.7362\\) is in the thousandths place?", answer: "\\(6\\)" },
        { prompt: "What is the value of the 5 in \\(0.0058\\)?", answer: "\\(\\tfrac{5}{1000}\\)" },
        { prompt: "Write 4 tenths and 6 thousandths as one decimal.", answer: "\\(0.406\\)" },
        { prompt: "How many decimals lie between \\(0.7\\) and \\(0.8\\)?", answer: "Infinitely many" },
      ],
      pyqExampleId: "62c3be2f-b366-4dc2-adc8-627a81950413",
      traps: [
        {
          title: "A zero holds a place",
          body: "In \\(0.07\\) the 7 is in the hundredths place, worth \\(\\tfrac{7}{100}\\). Skipping the zero and calling it tenths makes it ten times too big.",
        },
        {
          title: "Places are counted from the point",
          body: "The tenths digit of \\(52.81\\) is 8, the first digit after the point, not the 5 or the 2 in front of it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-decimal-words",
      name: "Reading and writing decimals in words",
      intuition:
        "Read the digits after the point as one whole number, then name the place of the last digit. \\(0.47\\) ends in the hundredths place, so it is forty-seven hundredths.",
      definition:
        "- Decimal to words: the digits after the point, then the place of the **last** digit (\\(0.0091\\) is ninety-one ten-thousandths).\n" +
        "- Words to decimal: the place name says how many digits go after the point (tenths 1, hundredths 2, thousandths 3, ten-thousandths 4). Fill the front with zeros.\n" +
        "- Spoken digit by digit, \\(0.47\\) is 'point four seven'. That is not its name in place value.",
      formula: {
        label: "A decimal with n places",
        latex: "\\text{decimal} = \\dfrac{\\text{the digits after the point}}{10^n} \\quad (n = \\text{number of places})",
      },
      authoredExample: {
        prompt: "Write \\(0.0612\\) in words. Then write 'three hundred five thousandths' as a decimal.",
        steps: [
          "\\(0.0612\\) has four places, so it is \\(\\tfrac{612}{10000}\\): six hundred twelve ten-thousandths.",
          "Thousandths means three places: \\(\\tfrac{305}{1000} = 0.305\\).",
        ],
        answer: "Six hundred twelve ten-thousandths; \\(0.305\\).",
      },
      selfCheckExample: {
        prompt: "Write 'eighty-one ten-thousandths' as a decimal.",
        steps: ["Ten-thousandths means four places.", "81 fills only two of them, so put two zeros in front: \\(0.0081\\)."],
        answer: "\\(0.0081\\).",
      },
      practiceSet: [
        { prompt: "Write \\(0.09\\) in words.", answer: "Nine hundredths" },
        { prompt: "Write 'sixty-two thousandths' as a decimal.", answer: "\\(0.062\\)" },
        { prompt: "Write 'four hundred seven thousandths' as a decimal.", answer: "\\(0.407\\)" },
        { prompt: "How is \\(0.019\\) read?", answer: "Nineteen thousandths" },
      ],
      pyqExampleId: "7ff356ca-a1fb-4823-aaba-8d6dd9523125",
      traps: [
        {
          title: "Count places, not digits",
          body: "Sixty-two thousandths needs three places, so it is \\(0.062\\). Writing \\(0.62\\) gives sixty-two hundredths, ten times as much.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-fraction-to-decimal",
      name: "Writing a fraction as a decimal",
      intuition:
        "If the denominator can be made 10, 100 or 1000, the numerator read off is the decimal. Otherwise divide the numerator by the denominator.",
      definition:
        "- Multiply top and bottom by the number that turns the denominator into 10, 100 or 1000: \\(\\tfrac{3}{25} = \\tfrac{12}{100} = 0.12\\).\n" +
        "- Halves, quarters and fifths are worth knowing by heart: \\(\\tfrac12 = 0.5\\), \\(\\tfrac14 = 0.25\\), \\(\\tfrac34 = 0.75\\), \\(\\tfrac15 = 0.2\\).\n" +
        "- Eighths have three places: \\(\\tfrac18 = 0.125\\), and each further eighth adds \\(0.125\\).\n" +
        "- A fraction larger than 1 gives a whole part: \\(\\tfrac74 = 1.75\\).",
      formula: {
        label: "Fraction to decimal",
        latex: "\\dfrac ab = \\dfrac{a \\times k}{b \\times k} \\quad \\text{with } b \\times k = 10, 100, 1000, \\dots",
      },
      authoredExample: {
        prompt: "Write \\(\\tfrac38\\) and \\(\\tfrac{9}{20}\\) as decimals.",
        steps: [
          "\\(8 \\times 125 = 1000\\), so \\(\\tfrac38 = \\tfrac{375}{1000} = 0.375\\).",
          "\\(20 \\times 5 = 100\\), so \\(\\tfrac{9}{20} = \\tfrac{45}{100} = 0.45\\).",
        ],
        answer: "\\(0.375\\) and \\(0.45\\).",
      },
      selfCheckExample: {
        prompt: "Write \\(\\tfrac{13}{25}\\) as a decimal.",
        steps: ["\\(25 \\times 4 = 100\\), so \\(\\tfrac{13}{25} = \\tfrac{52}{100}\\)."],
        answer: "\\(0.52\\).",
      },
      practiceSet: [
        { prompt: "Write \\(\\tfrac35\\) as a decimal.", answer: "\\(0.6\\)" },
        { prompt: "Write \\(\\tfrac{11}{40}\\) as a decimal.", answer: "\\(0.275\\)", method: "\\(40 \\times 25 = 1000\\)." },
        { prompt: "Write \\(\\tfrac{7}{4}\\) as a decimal.", answer: "\\(1.75\\)" },
        { prompt: "Write \\(\\tfrac{3}{50}\\) as a decimal.", answer: "\\(0.06\\)" },
      ],
      pyqExampleId: "1f64a46c-3581-4e9f-82c5-4006813276bd",
      traps: [
        {
          title: "The digits of the fraction are not the decimal",
          body: "\\(\\tfrac34\\) is \\(0.75\\), not \\(0.34\\), and \\(\\tfrac25\\) is \\(0.4\\), not \\(0.25\\). Options are often built from the fraction's own digits.",
        },
        {
          title: "Eighths need three places",
          body: "\\(\\tfrac18\\) is \\(0.125\\). Rounding it to \\(0.12\\) or reading it as \\(0.18\\) gives a wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-decimal-to-fraction",
      name: "Writing a decimal as a fraction in lowest terms",
      intuition:
        "A decimal with two places is a number of hundredths, so write it over 100. Then cancel the common factor until none is left.",
      definition:
        "- Write the digits after the point over 1 followed by as many zeros as there are places: \\(0.36 = \\tfrac{36}{100}\\).\n" +
        "- Divide top and bottom by their HCF to reach **lowest terms** (\\(\\tfrac{36}{100}\\), HCF 4, is \\(\\tfrac{9}{25}\\)).\n" +
        "- A whole part stays: \\(2.5 = \\tfrac{25}{10} = \\tfrac52\\).\n" +
        "- A **vulgar fraction** is just an ordinary fraction \\(\\tfrac ab\\), as opposed to a decimal fraction.",
      formula: {
        label: "Decimal to fraction",
        latex: "0.d_1 d_2 \\dots d_n = \\dfrac{d_1 d_2 \\dots d_n}{10^n}, \\text{ then cancel the HCF}",
      },
      authoredExample: {
        prompt: "Write \\(0.36\\) and \\(0.144\\) as fractions in lowest terms.",
        steps: [
          "\\(0.36 = \\tfrac{36}{100}\\). The HCF of 36 and 100 is 4, so it is \\(\\tfrac{9}{25}\\).",
          "\\(0.144 = \\tfrac{144}{1000}\\). The HCF is 8, so it is \\(\\tfrac{18}{125}\\).",
        ],
        answer: "\\(\\tfrac{9}{25}\\) and \\(\\tfrac{18}{125}\\).",
      },
      selfCheckExample: {
        prompt: "Write \\(0.85\\) as a fraction in lowest terms.",
        steps: ["\\(0.85 = \\tfrac{85}{100}\\).", "Divide both by 5."],
        answer: "\\(\\tfrac{17}{20}\\).",
      },
      practiceSet: [
        { prompt: "Write \\(0.4\\) as a fraction in lowest terms.", answer: "\\(\\tfrac25\\)" },
        { prompt: "Write \\(0.24\\) as a fraction in lowest terms.", answer: "\\(\\tfrac{6}{25}\\)" },
        { prompt: "Write \\(0.075\\) as a fraction in lowest terms.", answer: "\\(\\tfrac{3}{40}\\)", method: "\\(\\tfrac{75}{1000}\\), HCF 25." },
        { prompt: "Write \\(1.6\\) as a fraction in lowest terms.", answer: "\\(\\tfrac85\\)" },
      ],
      pyqExampleId: "bfc4e5da-afd5-481a-b5de-d6da0b3fecf3",
      traps: [
        {
          title: "Lowest terms means no common factor left",
          body: "\\(0.5 = \\tfrac{5}{10}\\) is true, but it is not in lowest terms. When the question asks for simplest form and the options carry both \\(\\tfrac{5}{10}\\) and \\(\\tfrac12\\), only \\(\\tfrac12\\) is right.",
        },
        {
          title: "One zero in the denominator per place",
          body: "\\(0.05\\) has two places, so it is \\(\\tfrac{5}{100} = \\tfrac{1}{20}\\), not \\(\\tfrac{5}{10}\\).",
        },
      ],
    },
  ],
};
