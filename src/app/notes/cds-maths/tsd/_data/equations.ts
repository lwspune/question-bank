import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TD_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Speed Changes and Equations",
  title: "Speed Changes and Equations",
  oneLineDefinition:
    "'Had the speed been x faster, it would have taken y less' gives d/v − d/(v + x) = y, a quadratic in the speed.",
  whyItMatters:
    "Nine PYQs, a quarter of them HARD. They all share one equation shape; the only choices are which unknown to call v and remembering to convert minutes to hours. Checking the answer by plugging it back takes seconds.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdstd-speed-change-equation",
      name: "Faster speed, less time",
      intuition:
        "The distance is fixed, so two speeds give two times whose difference is known. That difference, written out, is an equation in the speed.",
      definition:
        "- \\(\\dfrac dv - \\dfrac{d}{v + x} = y\\) simplifies to \\(dx = y\\,v(v + x)\\).\n" +
        "- Convert the time difference to hours before substituting (\\(30\\) minutes \\(= \\dfrac12\\)).\n" +
        "- Keep the positive root; check it in the original statement.\n" +
        "- The general answer: distance \\(= \\dfrac{x\\,t(t - y)}{y}\\) when the original time is \\(t\\).",
      formula: {
        label: "Speed change",
        latex: "\\dfrac dv - \\dfrac{d}{v + x} = y \\;\\Rightarrow\\; v(v + x) = \\dfrac{dx}{y}",
      },
      authoredExample: {
        prompt: "A bus takes \\(1\\) hour less for a \\(240\\) km trip if its speed is raised by \\(20\\) km/hr. Find its usual speed.",
        steps: ["\\(v(v + 20) = \\dfrac{240\\times 20}{1} = 4800\\).", "\\(v^2 + 20v - 4800 = (v - 60)(v + 80) = 0\\)."],
        answer: "\\(60\\) km/hr.",
      },
      selfCheckExample: {
        prompt: "Walking \\(1\\) km/hr faster, a man saves \\(10\\) minutes on a \\(5\\) km walk. Find his usual speed.",
        steps: ["\\(v(v + 1) = \\dfrac{5\\times 1}{1/6} = 30\\)."],
        answer: "\\(5\\) km/hr.",
      },
      practiceSet: [
        { prompt: "\\(v(v + 10) = 2000\\). \\(v\\)?", answer: "\\(40\\)" },
        { prompt: "\\(45\\) minutes in hours?", answer: "\\(\\dfrac34\\)" },
        { prompt: "\\(d = 120\\), \\(x = 10\\), \\(y = 1\\). \\(v(v + 10)\\)?", answer: "\\(1200\\)" },
        { prompt: "Roots \\(30\\) and \\(-40\\). Which is the speed?", answer: "\\(30\\)" },
      ],
      pyqExampleId: "6afa9cdb-682c-4a32-b6a8-0402dcaa5cb8", // 2022 (II) — 2800 km flight, 100 km/hr slower, 30 minutes more
      traps: [
        {
          title: "Slower means more time",
          body:
            "If the speed is REDUCED, the new time is longer: write \\(\\dfrac{d}{v - x} - \\dfrac dv = y\\). Reversing the order gives a negative time difference and nonsense roots.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdstd-two-conditions",
      name: "Two conditions, two unknowns",
      intuition:
        "When a journey is split between two modes, or two people's times are compared twice, each condition gives an equation in the reciprocals of the speeds. Treat \\(\\dfrac1a\\) and \\(\\dfrac1b\\) as the unknowns and the system is linear.",
      definition:
        "- Write each condition as time = distance ÷ speed, summed over the legs.\n" +
        "- Substitute \\(p = \\dfrac1a\\), \\(q = \\dfrac1b\\): the equations become linear in \\(p\\) and \\(q\\).\n" +
        "- Subtract one equation from the other to eliminate one unknown.",
      formula: {
        label: "Linear in reciprocals",
        latex: "\\dfrac{d_1}{a} + \\dfrac{d_2}{b} = T_1, \\quad \\dfrac{e_1}{a} + \\dfrac{e_2}{b} = T_2",
      },
      authoredExample: {
        prompt: "A trip of \\(300\\) km takes \\(5\\) hours with \\(100\\) km by train and the rest by car, and \\(4\\) hours with \\(200\\) km by train and the rest by car. Find both speeds.",
        steps: [
          "With \\(p = \\dfrac{1}{\\text{train}}\\), \\(q = \\dfrac{1}{\\text{car}}\\): \\(100p + 200q = 5\\) and \\(200p + 100q = 4\\).",
          "Adding: \\(p + q = 0.03\\). Subtracting: \\(q - p = 0.01\\). So \\(q = 0.02\\), \\(p = 0.01\\).",
        ],
        answer: "Train \\(100\\) km/hr, car \\(50\\) km/hr.",
      },
      selfCheckExample: {
        prompt: "X takes \\(1\\) hour longer than Y to walk \\(12\\) km; if X doubles his speed he takes \\(2\\) hours less than Y. Find X's speed.",
        steps: ["\\(\\dfrac{12}{x} = \\dfrac{12}{y} + 1\\) and \\(\\dfrac{6}{x} = \\dfrac{12}{y} - 2\\).", "Subtract: \\(\\dfrac6x = 3\\)."],
        answer: "\\(2\\) km/hr.",
      },
      practiceSet: [
        { prompt: "\\(2p + q = 7\\), \\(p + 2q = 8\\). \\(p\\)?", answer: "\\(2\\)" },
        { prompt: "Speed from \\(p = \\dfrac1{40}\\)?", answer: "\\(40\\)" },
        { prompt: "\\(\\dfrac{60}{a} = 1.5\\). \\(a\\)?", answer: "\\(40\\)" },
        { prompt: "Car \\(60\\), train \\(40\\) km/hr. Car : train?", answer: "\\(3 : 2\\)" },
      ],
      pyqExampleId: "264f87b2-b2e5-477a-8468-62574d993c73", // 2019 (I) — 600 km, 120 then 200 km by train
      traps: [
        {
          title: "Solve for the reciprocals",
          body:
            "The equations are linear in \\(\\dfrac1a\\) and \\(\\dfrac1b\\), not in \\(a\\) and \\(b\\). Clearing denominators first produces a messy quadratic system that is easy to get wrong.",
        },
      ],
    },
  ],
};
