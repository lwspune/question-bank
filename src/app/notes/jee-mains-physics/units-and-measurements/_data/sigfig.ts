import type { SubtopicNote } from "@/app/notes/_types";

export const SIGFIG_UNIT_NOTE: SubtopicNote = {
  subtopicName: "Units, Significant Figures and Order of Magnitude",
  title: "Units, Significant Figures and Order of Magnitude",
  oneLineDefinition:
    "A result keeps the fewest decimal places of its terms when they are added and the fewest significant figures of its factors when they are multiplied; very large distances are given in astronomical units, light years and parsecs.",
  whyItMatters:
    "Ten PYQs, all multiple choice, and two from 2026. Five apply the significant-figure rules to a sum, a product or a mean, or count the significant figures in a number; five are about astronomical distances, angles in seconds of arc and the order of magnitude of a number. Each one is a single rule, so the marks go to knowing the rule exactly.",
  concepts: [
    // C1 — significant figures
    {
      kind: "formula" as const,
      slug: "jpunit-sig-figs",
      name: "Significant figures in sums, products and means",
      intuition:
        "A measured number shows how precisely it was read. A sum cannot be more precise than its roughest term, so it keeps the fewest DECIMAL PLACES. A product or a quotient cannot be more precise than its least precise factor, so it keeps the fewest SIGNIFICANT FIGURES. The two rules look alike and the options are built to catch a mix-up.",
      definition:
        "- **Counting**: every non-zero digit counts; zeros between non-zero digits count; leading zeros never count (0.0042 has 2); trailing zeros count only when there is a decimal point (4.200 has 4, 4200 is ambiguous; write 4.2 × 10³ for 2).\n" +
        "- **Adding or subtracting**: round the answer to the fewest decimal places among the terms.\n" +
        "- **Multiplying or dividing**: round the answer to the fewest significant figures among the factors.\n" +
        "- **A mean** of readings is reported to the decimal place of the least precise reading.\n" +
        "- **Rounding**: above 5, round up; below 5, round down; exactly 5 followed by nothing, round to the even digit (2.745 → 2.74, 2.735 → 2.74).\n" +
        "- Exact numbers (a count, the 2 in 2πr) have unlimited significant figures and never limit the answer.",
      formula: {
        label: "Rounding rules",
        latex:
          "\\text{sum or difference: fewest decimal places} \\qquad \\text{product or quotient: fewest significant figures}",
      },
      authoredExample: {
        prompt:
          "Report, to the correct significant figures, (a) the sum of 12.11 g, 3.2 g and 0.456 g, and (b) the product 4.52 cm × 2.1 cm.",
        steps: [
          "(a) The raw sum is \\(15.766\\) g. The term 3.2 g has one decimal place, the fewest, so the sum keeps one decimal place.",
          "\\(15.766 \\to 15.8\\) g.",
          "(b) The raw product is \\(9.492\\ \\text{cm}^2\\). The factor 2.1 has two significant figures, the fewest, so the product keeps two.",
          "\\(9.492 \\to 9.5\\ \\text{cm}^2\\).",
        ],
        answer: "(a) \\(15.8\\) g; (b) \\(9.5\\ \\text{cm}^2\\).",
      },
      selfCheckExample: {
        prompt:
          "All digits are significant. Report \\(y = \\dfrac{2.53 \\times 3.1}{1.25}\\) to the correct number of significant figures.",
        steps: [
          "\\(2.53 \\times 3.1 = 7.843\\), and \\(7.843 / 1.25 = 6.2744\\).",
          "The factors have 3, 2 and 3 significant figures; the fewest is 2.",
          "\\(6.2744 \\to 6.3\\).",
        ],
        answer: "\\(y = 6.3\\)",
      },
      practiceSet: [
        { prompt: "How many significant figures does 0.004060 have?", answer: "4", method: "Leading zeros do not count; the zero between 4 and 6 and the trailing zero after the decimal point do." },
        { prompt: "How many significant figures does \\(7.00 \\times 10^{3}\\) have?", answer: "3" },
        { prompt: "Report \\(10.2 - 3.457\\) to the correct significant figures.", answer: "\\(6.7\\)", method: "Raw value 6.743; one decimal place, set by 10.2." },
        { prompt: "Round 2.745 to three significant figures by the round-half-to-even rule.", answer: "\\(2.74\\)" },
      ],
      pyqExampleId: "8880cde5-8935-4009-8948-842ae5fb1984", // 2026: sum of three lengths, kept to one decimal place
      traps: [
        {
          title: "A sum is rounded by decimal places, not by significant figures",
          body: "When numbers are added, the answer keeps the fewest decimal places, even if that leaves it with more significant figures than some term. 101.1 + 0.25 = 101.35, reported as 101.4 with four significant figures, although 0.25 has only two.",
        },
        {
          title: "Leading zeros never count",
          body: "In 0.0010010 the first three zeros only place the decimal point. The significant figures are 1, 0, 0, 1, 0 — five of them. The trailing zero counts because the number has a decimal point.",
        },
      ],
    },

    // C2 — astronomical distances and order of magnitude
    {
      kind: "reference" as const,
      slug: "jpunit-magnitudes",
      name: "Astronomical units of length, seconds of arc and order of magnitude",
      intuition:
        "Distances in astronomy are too large for metres, so three bigger units are used. In increasing size: the astronomical unit (Earth to Sun), the light year (the distance light covers in a year) and the parsec. A distant object's size is found from the small angle it subtends: size = angle in radians × distance.",
      definition:
        "- \\(1\\ \\text{AU} < 1\\ \\text{ly} < 1\\ \\text{pc}\\).\n" +
        "- One second of arc: \\(1'' = \\dfrac{1}{3600}\\) degree \\(= 4.85 \\times 10^{-6}\\) rad.\n" +
        "- Small angle: \\(d = \\theta D\\), with \\(\\theta\\) in radians.\n" +
        "- A parsec is the distance at which 1 AU subtends 1″.\n" +
        "- **Order of magnitude** of \\(a \\times 10^{b}\\) (with \\(1 \\le a < 10\\)): \\(b\\) if \\(a \\le 5\\), and \\(b + 1\\) if \\(a > 5\\).",
      table: {
        columns: ["Unit or quantity", "Value", "How it is defined"],
        rows: [
          { cells: ["Astronomical unit (AU)", "\\(1.496 \\times 10^{11}\\) m", "Mean distance from the Earth to the Sun"] },
          { cells: ["Light year (ly)", "\\(9.46 \\times 10^{15}\\) m", "Distance light travels in one year"] },
          { cells: ["Parsec (pc)", "\\(3.08 \\times 10^{16}\\) m", "Distance at which 1 AU subtends one second of arc"], noteAmber: "The parsec is the largest of the three, about 3.26 light years." },
          { cells: ["Light second", "\\(3.0 \\times 10^{8}\\) m", "Distance light travels in one second"] },
          { cells: ["One second of arc (1″)", "\\(4.85 \\times 10^{-6}\\) rad", "One 3600th of a degree"] },
          { cells: ["One degree", "\\(1.745 \\times 10^{-2}\\) rad", "\\(\\pi/180\\) radian"] },
        ],
        caption: "In increasing size: astronomical unit, light year, parsec.",
      },
      selfCheckExample: {
        prompt:
          "The Moon is \\(3.84 \\times 10^{8}\\) m from the Earth and its angular diameter is 1800″. Find its diameter and the order of magnitude of that diameter.",
        steps: [
          "\\(\\theta = 1800 \\times 4.85 \\times 10^{-6} = 8.73 \\times 10^{-3}\\) rad.",
          "\\(d = \\theta D = 8.73 \\times 10^{-3} \\times 3.84 \\times 10^{8} = 3.35 \\times 10^{6}\\) m.",
          "Here \\(a = 3.35 \\le 5\\), so the order of magnitude is 6.",
        ],
        answer: "About \\(3.35 \\times 10^{6}\\) m; order of magnitude 6.",
      },
      practiceSet: [
        { prompt: "Put in increasing order: parsec, astronomical unit, light year.", answer: "Astronomical unit < light year < parsec" },
        { prompt: "What is the order of magnitude of \\(7.2 \\times 10^{4}\\)?", answer: "5" },
        { prompt: "How many metres does light travel in 100 s?", answer: "\\(3.0 \\times 10^{10}\\) m" },
        { prompt: "Convert 2″ to radians.", answer: "\\(9.7 \\times 10^{-6}\\) rad" },
      ],
      pyqExampleId: "40ec4a63-1084-40b7-a375-d6893fbd094b", // 2023: AU, parsec and light year in order
      traps: [
        {
          title: "The parsec is bigger than the light year",
          body: "A parsec is about 3.26 light years. The order is AU < light year < parsec. A statement that puts the parsec between the AU and the light year is false.",
        },
        {
          title: "Convert the angle to radians first",
          body: "In d = θD the angle must be in radians. Seconds of arc are multiplied by 4.85 × 10⁻⁶; leaving the angle in seconds or degrees gives a size wrong by a factor of thousands.",
        },
      ],
    },
  ],
};
