import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_UM_UNITS_NOTE: SubtopicNote = {
  subtopicName: "Units and Significant Figures",
  title: "Units and Significant Figures",
  oneLineDefinition:
    "A measurement is a number times a unit: the SI base units, how the number changes when the unit changes, and how many digits of a result you are allowed to keep.",
  whyItMatters:
    "Three NEET questions, two of them from NEET 2026. One sets up a new unit of length in which the speed of light is 1 (2026), and two round a calculated result to the right number of significant figures: the area of a field (2022) and the density of a cube (2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphum-si-units",
      name: "SI units and changing the unit",
      intuition:
        "To measure a length you compare it with a chosen standard, the unit, and count how many units fit. The answer is always a number times a unit. If you choose a bigger unit, fewer of them fit, so the number gets smaller. The quantity itself does not change.",
      definition:
        "- The SI has seven **base quantities**: length (metre, m), mass (kilogram, kg), time (second, s), electric current (ampere, A), thermodynamic temperature (kelvin, K), amount of substance (mole, mol) and luminous intensity (candela, cd).\n" +
        "- Every other unit is a **derived unit**, built from the base units: speed in m/s, force in kg m s⁻², called the newton.\n" +
        "- Plane angle \\(d\\theta = \\dfrac{ds}{r}\\) is measured in radian (rad) and solid angle \\(d\\Omega = \\dfrac{dA}{r^{2}}\\) in steradian (sr).\n" +
        "- A measured value is \\(Q = nu\\): n is the numerical value and u the unit. Q is fixed, so \\(n_1u_1 = n_2u_2\\) and \\(n \\propto \\dfrac{1}{u}\\).\n" +
        "- To change the unit, write the old unit in terms of the new one and multiply.",
      formula: {
        label: "Changing the unit",
        latex: "Q = n_1u_1 = n_2u_2, \\qquad n \\propto \\frac{1}{u}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "numerical value" },
          { symbol: "\\(u\\)", meaning: "size of the unit" },
        ],
      },
      authoredExample: {
        prompt: "A new unit of mass is chosen equal to 10 g. What is the numerical value of a mass of 2.5 kg in this unit?",
        steps: [
          "Write the mass in grams: \\(2.5\\ \\text{kg} = 2500\\ \\text{g}\\).",
          "Each new unit is 10 g, so \\(n = \\dfrac{2500}{10} = 250\\).",
        ],
        answer: "250 units",
      },
      selfCheckExample: {
        prompt: "A car moves at 72 km/h. What is its speed in m/s?",
        steps: [
          "\\(1\\ \\text{km} = 1000\\ \\text{m}\\) and \\(1\\ \\text{h} = 3600\\ \\text{s}\\).",
          "\\(72 \\times \\dfrac{1000}{3600} = 20\\ \\text{m/s}\\).",
        ],
        answer: "20 m/s",
      },
      practiceSet: [
        { prompt: "How many base quantities does the SI system have?", answer: "Seven" },
        { prompt: "What is the SI unit of luminous intensity?", answer: "The candela (cd)" },
        { prompt: "A length is measured first in metres and then in centimetres. How does the numerical value change?", answer: "It becomes 100 times larger" },
        { prompt: "What is the SI unit of solid angle?", answer: "The steradian (sr)" },
      ],
      pyqExampleId: "197b434a-1062-4683-8155-be48ca14d0c7",
      traps: [
        {
          title: "A bigger unit gives a smaller number",
          body: "Since \\(nu\\) stays fixed, the numerical value goes down when the unit goes up. A distance of 3 km is 3000 in metres, not 0.003.",
        },
        {
          title: "The kilogram is the base unit of mass",
          body: "The SI base unit of mass is the kilogram, not the gram. It is the only base unit whose name carries a prefix.",
        },
        {
          title: "Temperature is in kelvin",
          body: "The SI unit of thermodynamic temperature is the kelvin. The degree Celsius is not a base unit.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphum-sigfig",
      name: "Significant figures",
      intuition:
        "The digits you write down tell the reader how carefully you measured. The significant figures are the digits you are sure of plus the first doubtful one. A calculated answer can never be more certain than the least certain measurement that went into it, so you round it back.",
      definition:
        "- All non-zero digits are significant. Zeros between two non-zero digits are significant: 2.308 has four.\n" +
        "- Zeros before the first non-zero digit are not significant: 0.0052 has two.\n" +
        "- Trailing zeros after a decimal point are significant: 4.700 has four. Trailing zeros in a number without a decimal point are not: 1500 has two.\n" +
        "- The power of ten does not count: \\(6.20 \\times 10^{3}\\) has three.\n" +
        "- **Multiplying or dividing:** keep as many significant figures as the factor with the fewest.\n" +
        "- **Adding or subtracting:** keep as many decimal places as the term with the fewest decimal places.\n" +
        "- **Rounding:** if the dropped digit is more than 5, raise the digit before it by 1; if less than 5, leave it. If it is exactly 5, leave an even digit before it and raise an odd one.",
      authoredExample: {
        prompt: "Add 3.256 m, 2.1 m and 0.45 m and give the result to the correct significant figures.",
        steps: [
          "\\(3.256 + 2.1 + 0.45 = 5.806\\ \\text{m}\\).",
          "This is a sum, so count decimal places. 2.1 has only one decimal place.",
          "Round to one decimal place: \\(5.806 \\to 5.8\\ \\text{m}\\).",
        ],
        answer: "5.8 m",
      },
      selfCheckExample: {
        prompt: "How many significant figures does 0.05040 have?",
        steps: [
          "The two zeros before the 5 are not significant.",
          "The 5, the 0 between 5 and 4, the 4 and the trailing 0 after the decimal point all count.",
        ],
        answer: "Four",
      },
      practiceSet: [
        { prompt: "How many significant figures does 0.00340 have?", answer: "Three" },
        { prompt: "A body covers 4.237 m in 2.0 s. Give its speed to the correct significant figures.", answer: "2.1 m/s" },
        { prompt: "How many significant figures does \\(6.20 \\times 10^{3}\\) have?", answer: "Three" },
        { prompt: "Round 2.735 to three significant figures.", answer: "2.74 (the digit before the 5 is odd, so it is raised)" },
      ],
      pyqExampleId: "75ed4765-5fa6-41a0-b14c-1067ba4bfa84",
      traps: [
        {
          title: "Sums go by decimal places",
          body: "For addition and subtraction you match the fewest decimal places, not the fewest significant figures. 10.99 m + 10.0099 m is 21.00 m.",
        },
        {
          title: "Products go by significant figures",
          body: "For multiplication and division the answer keeps the significant figures of the least precise factor. 12.6 × 3.2 = 40.32 is written \\(4.0 \\times 10^{1}\\), two figures, because 3.2 has two.",
        },
        {
          title: "Leading zeros never count",
          body: "Zeros in front of the first non-zero digit only place the decimal point. 0.0025 has two significant figures, not four.",
        },
      ],
    },
  ],
};
