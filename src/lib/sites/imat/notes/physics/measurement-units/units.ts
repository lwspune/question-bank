import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_MU_UNITS_NOTE: SubtopicNote = {
  subtopicName: "SI Units and Notation",
  title: "SI Units, Prefixes and Significant Figures",
  oneLineDefinition:
    "Every quantity is a number times a unit; SI builds all units from seven base units, and prefixes and powers of ten keep the numbers readable.",
  whyItMatters:
    "The 2018 paper asked students to put three tiny lengths in order when each was written with a different prefix. Every other physics question also needs SI units and powers of ten handled without slips.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-mu-si-units",
      name: "SI base units and the common derived units",
      intuition:
        "Scientists agreed on seven base units, and every other unit is built by multiplying and dividing them. A newton is not a new idea: it is the force that gives 1 kg an acceleration of 1 m/s², so it is a kilogram metre per second squared. Knowing what each derived unit is made of lets you check any formula.",
      definition:
        "The **SI base units** are the metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol) and candela (cd).\n" +
        "- Every other SI unit is a **derived unit**, a product or quotient of base units.\n" +
        "- The base unit of mass is the **kilogram**, not the gram.\n" +
        "- Temperature in SI is in **kelvin**: \\(T = t + 273\\), with \\(T\\) in kelvin and \\(t\\) in degrees Celsius.",
      table: {
        columns: ["Quantity", "Unit", "Symbol", "In SI base units"],
        rows: [
          { cells: ["Length", "metre", "m", "base unit"] },
          { cells: ["Mass", "kilogram", "kg", "base unit"] },
          { cells: ["Time", "second", "s", "base unit"] },
          { cells: ["Electric current", "ampere", "A", "base unit"] },
          { cells: ["Temperature", "kelvin", "K", "base unit"] },
          { cells: ["Amount of substance", "mole", "mol", "base unit"] },
          { cells: ["Force", "newton", "N", "\\(\\text{kg m s}^{-2}\\)"] },
          { cells: ["Energy, work", "joule", "J = N m", "\\(\\text{kg m}^2\\text{ s}^{-2}\\)"] },
          { cells: ["Power", "watt", "W = J/s", "\\(\\text{kg m}^2\\text{ s}^{-3}\\)"] },
          { cells: ["Pressure", "pascal", "Pa = N/m²", "\\(\\text{kg m}^{-1}\\text{ s}^{-2}\\)"] },
          { cells: ["Charge", "coulomb", "C = A s", "\\(\\text{A s}\\)"] },
          { cells: ["Potential difference", "volt", "V = J/C", "\\(\\text{kg m}^2\\text{ s}^{-3}\\text{ A}^{-1}\\)"] },
          { cells: ["Resistance", "ohm", "Ω = V/A", "\\(\\text{kg m}^2\\text{ s}^{-3}\\text{ A}^{-2}\\)"] },
          { cells: ["Frequency", "hertz", "Hz", "\\(\\text{s}^{-1}\\)"] },
        ],
        caption: "The last column is what you reach when you break a derived unit all the way down.",
      },
      selfCheckExample: {
        prompt: "Which one of the following is NOT an SI base unit?",
        options: ["kilogram", "newton", "ampere", "kelvin", "mole"],
        steps: [
          "The seven base units include the kilogram, the ampere, the kelvin and the mole.",
          "The newton is derived: \\(1\\ \\text{N} = 1\\ \\text{kg m s}^{-2}\\).",
          "Students who think the gram is the base unit sometimes pick the kilogram, but the kilogram is the base unit of mass.",
        ],
        answer: "(B) newton",
      },
      practiceSet: [
        { prompt: "Write the joule in SI base units.", answer: "\\(\\text{kg m}^2\\text{ s}^{-2}\\)", method: "J = N m, and N = kg m s⁻²" },
        { prompt: "Which unit is equal to one joule per second?", answer: "The watt", method: "Power is energy per unit time" },
        { prompt: "Write a temperature of 27 °C in kelvin.", answer: "300 K", method: "Add 273" },
        { prompt: "Which base units make up the coulomb?", answer: "Ampere and second (A s)", method: "Charge is current times time" },
      ],
      traps: [
        {
          title: "The base unit of mass is the kilogram",
          body: "The kilogram is the only base unit with a prefix in its name. A density in g/cm³ or an energy worked out with a mass in grams is not in SI, and an answer computed that way is out by a factor of 1000.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mu-prefixes",
      name: "Prefixes, powers of ten and scientific notation",
      intuition:
        "Physics deals with sizes from atoms to planets, so we write numbers as a value between 1 and 10 times a power of ten. A prefix is just a short name for one of those powers. To compare two quantities, first write both in the same unit; then compare the powers of ten before the leading numbers.",
      definition:
        "**Scientific notation** writes a number as \\(a \\times 10^n\\) with \\(1 \\le a < 10\\) and \\(n\\) a whole number.\n" +
        "- Large prefixes: kilo (k) \\(10^3\\), mega (M) \\(10^6\\), giga (G) \\(10^9\\), tera (T) \\(10^{12}\\).\n" +
        "- Small prefixes: centi (c) \\(10^{-2}\\), milli (m) \\(10^{-3}\\), micro (\\(\\mu\\)) \\(10^{-6}\\), nano (n) \\(10^{-9}\\), pico (p) \\(10^{-12}\\).\n" +
        "- A prefix on a squared or cubed unit is squared or cubed too: \\(1\\ \\text{cm}^3 = (10^{-2}\\ \\text{m})^3 = 10^{-6}\\ \\text{m}^3\\).\n" +
        "- Volume: \\(1\\ \\text{L} = 1\\ \\text{dm}^3 = 10^{-3}\\ \\text{m}^3\\), and \\(1\\ \\text{mL} = 1\\ \\text{cm}^3\\).",
      formula: {
        label: "Changing a prefix",
        latex: "1\\ \\text{nm} = 10^{-9}\\ \\text{m} = 10^{-3}\\ \\mu\\text{m} = 10^{3}\\ \\text{pm}",
        symbols: [
          { symbol: "\\(\\text{nm}\\)", meaning: "nanometre, \\(10^{-9}\\) m" },
          { symbol: "\\(\\mu\\text{m}\\)", meaning: "micrometre, \\(10^{-6}\\) m" },
          { symbol: "\\(\\text{pm}\\)", meaning: "picometre, \\(10^{-12}\\) m" },
        ],
      },
      authoredExample: {
        prompt:
          "A red blood cell is about 7.5 \\(\\mu\\)m across and a virus is about 90 nm across. Write both sizes in metres in scientific notation, and find roughly how many times wider the cell is.",
        steps: [
          "Cell: \\(7.5\\ \\mu\\text{m} = 7.5 \\times 10^{-6}\\ \\text{m}\\).",
          "Virus: \\(90\\ \\text{nm} = 90 \\times 10^{-9}\\ \\text{m} = 9.0 \\times 10^{-8}\\ \\text{m}\\).",
          "Ratio: \\(\\dfrac{7.5 \\times 10^{-6}}{9.0 \\times 10^{-8}} = 0.83 \\times 10^{2} \\approx 83\\).",
        ],
        answer: "\\(7.5 \\times 10^{-6}\\ \\text{m}\\) and \\(9.0 \\times 10^{-8}\\ \\text{m}\\); the cell is about 83 times wider",
      },
      selfCheckExample: {
        prompt: "A drop of liquid has a volume of 0.050 cm³. What is this volume in m³?",
        options: [
          "\\(5.0 \\times 10^{-4}\\ \\text{m}^3\\)",
          "\\(5.0 \\times 10^{-5}\\ \\text{m}^3\\)",
          "\\(5.0 \\times 10^{-6}\\ \\text{m}^3\\)",
          "\\(5.0 \\times 10^{-8}\\ \\text{m}^3\\)",
          "\\(5.0 \\times 10^{-11}\\ \\text{m}^3\\)",
        ],
        steps: [
          "\\(1\\ \\text{cm} = 10^{-2}\\ \\text{m}\\), so \\(1\\ \\text{cm}^3 = (10^{-2})^3 = 10^{-6}\\ \\text{m}^3\\).",
          "\\(0.050 \\times 10^{-6} = 5.0 \\times 10^{-8}\\ \\text{m}^3\\).",
          "Option A uses \\(10^{-2}\\) without cubing; C squares instead of cubing; B is the volume in litres, not m³; E treats cm³ as if it were mm³.",
        ],
        answer: "(D) \\(5.0 \\times 10^{-8}\\ \\text{m}^3\\)",
      },
      practiceSet: [
        { prompt: "Write 2.5 GHz in hertz.", answer: "\\(2.5 \\times 10^9\\ \\text{Hz}\\)", method: "giga is \\(10^9\\)" },
        { prompt: "Write 0.000062 in scientific notation.", answer: "\\(6.2 \\times 10^{-5}\\)", method: "Move the point five places right" },
        { prompt: "Put in order, shortest first: 0.4 ms, 350 \\(\\mu\\)s, \\(3 \\times 10^{-5}\\) s.", answer: "\\(3 \\times 10^{-5}\\) s, 350 \\(\\mu\\)s, 0.4 ms", method: "In microseconds: 30, 350, 400" },
        { prompt: "How many cubic metres is 1 litre?", answer: "\\(10^{-3}\\ \\text{m}^3\\)", method: "1 L = 1 dm³ = \\((10^{-1})^3\\) m³" },
      ],
      traps: [
        {
          title: "A prefix on a squared or cubed unit is raised to that power",
          body: "\\(1\\ \\text{cm}^3\\) is \\(10^{-6}\\ \\text{m}^3\\), not \\(10^{-2}\\ \\text{m}^3\\), and \\(1\\ \\text{mm}^2\\) is \\(10^{-6}\\ \\text{m}^2\\), not \\(10^{-3}\\ \\text{m}^2\\). Convert the length first, then square or cube the whole factor.",
        },
        {
          title: "Milli and micro are a thousand apart",
          body: "milli (m) is \\(10^{-3}\\) and micro (\\(\\mu\\)) is \\(10^{-6}\\). A list of sizes in mm, \\(\\mu\\)m, nm and pm is easiest to order after rewriting every value with the same prefix.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mu-sig-figs",
      name: "Significant figures and rounding a result",
      intuition:
        "A measurement is only as precise as the instrument that made it. Significant figures are the digits that carry real information. A calculated answer cannot be more precise than the least precise value that went into it, so you round the result to match.",
      definition:
        "Counting **significant figures**:\n" +
        "- All non-zero digits count, and so do zeros between them (4005 has 4).\n" +
        "- **Leading zeros** never count (0.0072 has 2).\n" +
        "- **Trailing zeros after a decimal point** count (2.50 has 3).\n" +
        "- Trailing zeros in a whole number are unclear (1500 could be 2, 3 or 4); scientific notation removes the doubt: \\(1.50 \\times 10^3\\) has 3.\n" +
        "Rounding a result:\n" +
        "- **Multiplying or dividing**: keep as many significant figures as the value with the fewest.\n" +
        "- **Adding or subtracting**: keep as many decimal places as the value with the fewest.",
      authoredExample: {
        prompt:
          "Give each result to the right precision: (a) \\(4.52 \\times 2.1\\); (b) \\(12.11 + 0.3\\).",
        steps: [
          "(a) The calculator gives 9.492. The value 2.1 has only 2 significant figures, so round to 2: 9.5.",
          "(b) The calculator gives 12.41. The value 0.3 has only one decimal place, so round to one decimal place: 12.4.",
          "Notice the two rules differ: products follow significant figures, sums follow decimal places.",
        ],
        answer: "(a) 9.5; (b) 12.4",
      },
      selfCheckExample: {
        prompt: "How many significant figures does the measurement 0.004050 kg have?",
        options: ["4", "3", "6", "7", "2"],
        steps: [
          "The leading zeros in 0.00 only place the decimal point, so they do not count.",
          "Count from the 4: the digits 4, 0, 5 and the final 0 all count. The zero between 4 and 5 is sandwiched; the final zero follows the decimal point and was written on purpose.",
          "Option B drops the final zero; C counts every digit after the point; D counts every digit written.",
        ],
        answer: "(A) 4",
      },
      practiceSet: [
        { prompt: "How many significant figures does \\(3.00 \\times 10^2\\) have?", answer: "3", method: "Trailing zeros after the decimal point count" },
        { prompt: "Give \\(2.4 \\times 3.46\\) to the right number of significant figures.", answer: "8.3", method: "8.304, rounded to 2 significant figures" },
        { prompt: "Give \\(15.2 + 0.36\\) to the right precision.", answer: "15.6", method: "15.56, rounded to one decimal place" },
      ],
      traps: [
        {
          title: "Leading zeros are not significant",
          body: "In 0.0072 the zeros only show where the decimal point is; the value has 2 significant figures. Writing it as \\(7.2 \\times 10^{-3}\\) makes this obvious.",
        },
      ],
    },
  ],
};
