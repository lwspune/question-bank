import type { SubtopicNote } from "@/app/notes/_types";

export const LAB_ERRORS_UNIT_NOTE: SubtopicNote = {
  subtopicName: "Errors in Laboratory Experiments",
  title: "Errors in Laboratory Experiments",
  oneLineDefinition:
    "In a laboratory experiment each reading's error is the least count of the instrument that took it, a time is read over many oscillations to shrink its relative error, and the errors then combine by the power rule.",
  whyItMatters:
    "Sixteen PYQs, eleven of them multiple choice, and four from 2026. Five time a pendulum or a spring, four of them over many oscillations; eleven take each instrument's least count as the error of its reading, in Young's modulus, Ohm's law, a lens or mirror on an optical bench, a potentiometer or a travelling microscope. The physics is in deciding what the error of each reading is; the arithmetic after that is the power rule.",
  concepts: [
    // C1 — timing oscillations
    {
      kind: "formula" as const,
      slug: "jpunit-timing",
      name: "Timing many oscillations: pendulum and spring",
      intuition:
        "A stopwatch's resolution is the same whether it times one swing or fifty. Timing fifty swings and dividing by fifty spreads that error over all of them, so the relative error in the period equals the relative error in the TOTAL time. Then g or k follows from the power rule, with T squared.",
      definition:
        "- Period from n oscillations: \\(T = t/n\\), and \\(\\dfrac{\\Delta T}{T} = \\dfrac{\\Delta t}{t}\\), with \\(\\Delta t\\) the watch's resolution and t the total time.\n" +
        "- Pendulum, \\(g = \\dfrac{4\\pi^{2}l}{T^{2}}\\): \\(\\dfrac{\\Delta g}{g} = \\dfrac{\\Delta l}{l} + 2\\dfrac{\\Delta T}{T}\\).\n" +
        "- Spring, \\(T = 2\\pi\\sqrt{m/k}\\), so \\(k = \\dfrac{4\\pi^{2}m}{T^{2}}\\): \\(\\dfrac{\\Delta k}{k} = \\dfrac{\\Delta m}{m} + 2\\dfrac{\\Delta T}{T}\\).\n" +
        "- Length from a metre scale: \\(\\Delta l\\) = its least count, usually 1 mm.",
      formula: {
        label: "Pendulum error",
        latex: "\\frac{\\Delta g}{g} = \\frac{\\Delta l}{l} + 2\\frac{\\Delta t}{t} \\qquad (t = \\text{total time of } n \\text{ oscillations})",
      },
      authoredExample: {
        prompt:
          "A pendulum's length is 50.0 cm, measured to 1 mm. Twenty-five oscillations take 50 s on a watch of resolution 0.5 s. Find the percentage error in g.",
        steps: [
          "\\(\\dfrac{\\Delta l}{l} = \\dfrac{0.1}{50.0} = 0.2\\%\\).",
          "\\(\\dfrac{\\Delta T}{T} = \\dfrac{\\Delta t}{t} = \\dfrac{0.5}{50} = 1\\%\\), using the total time.",
          "\\(\\dfrac{\\Delta g}{g} = 0.2 + 2 \\times 1 = 2.2\\%\\).",
        ],
        answer: "\\(2.2\\%\\)",
      },
      selfCheckExample: {
        prompt:
          "A mass of \\((200 \\pm 2)\\) g on a spring makes 20 oscillations in 16 s, timed on a watch of resolution 0.2 s. Find the percentage error in the spring constant.",
        steps: [
          "\\(\\dfrac{\\Delta m}{m} = \\dfrac{2}{200} = 1\\%\\).",
          "\\(\\dfrac{\\Delta T}{T} = \\dfrac{0.2}{16} = 1.25\\%\\).",
          "\\(\\dfrac{\\Delta k}{k} = 1 + 2 \\times 1.25 = 3.5\\%\\).",
        ],
        answer: "\\(3.5\\%\\)",
      },
      practiceSet: [
        { prompt: "100 oscillations take 200 s on a watch of resolution 1 s. Percentage error in the period?", answer: "\\(0.5\\%\\)" },
        { prompt: "A length of 1.00 m is read on a scale of least count 1 mm. Percentage error?", answer: "\\(0.1\\%\\)" },
        { prompt: "Write Δg/g for g = 4π²l/T².", answer: "\\(\\dfrac{\\Delta l}{l} + 2\\dfrac{\\Delta T}{T}\\)" },
        { prompt: "Write Δk/k for a spring whose k = 4π²m/T².", answer: "\\(\\dfrac{\\Delta m}{m} + 2\\dfrac{\\Delta T}{T}\\)" },
      ],
      pyqExampleId: "5f163049-ee19-45f8-9c8c-86e226186886", // 2024: pendulum, 50 oscillations timed, accuracy of g
      traps: [
        {
          title: "Divide the resolution by the total time, not by the period",
          body: "If 40 oscillations take 80 s on a 1 s watch, ΔT/T is 1/80, not 1/2. The watch was read once over the whole run, so its error is shared by every oscillation.",
        },
        {
          title: "The period enters g squared",
          body: "In g = 4π²l/T² the period has power 2, so its relative error counts twice. Forgetting the 2 gives the 'length error + period error' distractor.",
        },
      ],
    },

    // C2 — least count as the error of a reading
    {
      kind: "formula" as const,
      slug: "jpunit-lc-as-error",
      name: "Least count as the error of each reading",
      intuition:
        "Every reading is uncertain by the smallest division its instrument can show. So in an experiment the error of a diameter is the screw gauge's least count, the error of a length is the scale's least count, and so on. When a distance is found as the DIFFERENCE of two positions on a scale, each position carries the least count, so the distance carries twice it.",
      definition:
        "- Error of one reading = least count of its instrument.\n" +
        "- A distance found from two scale positions (an optical bench, a travelling microscope): error = 2 × least count.\n" +
        "- Young's modulus \\(Y = \\dfrac{4FL}{\\pi d^{2}\\,\\Delta L}\\): \\(\\dfrac{\\Delta Y}{Y} = \\dfrac{\\Delta L}{L} + 2\\dfrac{\\Delta d}{d} + \\dfrac{\\Delta(\\Delta L)}{\\Delta L}\\); a known load carries no error.\n" +
        "- Ohm's law \\(R = V/I\\): \\(\\dfrac{\\Delta R}{R} = \\dfrac{\\Delta V}{V} + \\dfrac{\\Delta I}{I}\\), each Δ a meter's least count.\n" +
        "- Lens or mirror, \\(\\dfrac{1}{f} = \\dfrac{1}{v} \\pm \\dfrac{1}{u}\\): \\(\\dfrac{\\Delta f}{f^{2}} = \\dfrac{\\Delta u}{u^{2}} + \\dfrac{\\Delta v}{v^{2}}\\).\n" +
        "- Refractive index by travelling microscope \\(\\mu = \\dfrac{\\text{real depth}}{\\text{apparent depth}}\\); potentiometer \\(\\dfrac{E_1}{E_2} = \\dfrac{l_1}{l_2}\\): relative errors add.",
      formula: {
        label: "Errors from least counts",
        latex: "\\Delta x = \\text{LC} \\qquad \\Delta(x_2 - x_1) = 2\\,\\text{LC} \\qquad \\frac{\\Delta f}{f^{2}} = \\frac{\\Delta u}{u^{2}} + \\frac{\\Delta v}{v^{2}}",
      },
      authoredExample: {
        prompt:
          "On an optical bench of least count 0.1 cm, the object pin is at the 10.0 cm mark, a convex lens at 40.0 cm and the sharp image at 100.0 cm. Find the focal length and its error.",
        steps: [
          "\\(u = 30.0\\) cm and \\(v = 60.0\\) cm; \\(\\dfrac{1}{f} = \\dfrac{1}{60} + \\dfrac{1}{30}\\), so \\(f = 20.0\\) cm.",
          "Each distance is the difference of two positions: \\(\\Delta u = \\Delta v = 2 \\times 0.1 = 0.2\\) cm.",
          "\\(\\dfrac{\\Delta f}{f^{2}} = \\dfrac{0.2}{900} + \\dfrac{0.2}{3600} = 2.78 \\times 10^{-4}\\ \\text{cm}^{-1}\\).",
          "\\(\\Delta f = 400 \\times 2.78 \\times 10^{-4} = 0.11\\) cm.",
        ],
        answer: "\\(f = (20.0 \\pm 0.11)\\) cm, about \\(0.56\\%\\).",
      },
      selfCheckExample: {
        prompt:
          "In an Ohm's law experiment the voltmeter reads 6.0 V and the ammeter 2.0 A. Their least counts are 0.1 V and 0.05 A. Find the resistance and its error.",
        steps: [
          "\\(R = 6.0/2.0 = 3.0\\ \\Omega\\).",
          "\\(\\dfrac{\\Delta R}{R} = \\dfrac{0.1}{6.0} + \\dfrac{0.05}{2.0} = 0.0167 + 0.025 = 0.0417\\).",
          "\\(\\Delta R = 3.0 \\times 0.0417 = 0.125\\ \\Omega\\).",
        ],
        answer: "\\(R = (3.0 \\pm 0.125)\\ \\Omega\\)",
      },
      practiceSet: [
        { prompt: "A screw gauge of least count 0.01 mm reads a diameter of 0.50 mm. Percentage error?", answer: "\\(2\\%\\)" },
        { prompt: "On a bench of least count 0.1 cm, a lens at 50.0 cm and an image at 80.0 cm. Error in the image distance?", answer: "\\(0.2\\) cm" },
        { prompt: "Potentiometer lengths 300 cm and 250 cm on a scale of least count 1 cm. Percentage error in \\(E_1/E_2\\)?", answer: "About \\(0.73\\%\\)" },
        { prompt: "In Young's modulus with a known load, does the load add to the error?", answer: "No" },
      ],
      pyqExampleId: "e1b5821f-831e-439a-8e3c-acfd9bb6fa78", // 2026: Young's modulus from screw gauge, scale and micrometer least counts
      traps: [
        {
          title: "A distance read from two marks carries twice the least count",
          body: "On an optical bench the object distance is (lens mark − object mark). Each mark is uncertain by one least count, so the distance is uncertain by two. Using one least count halves the error.",
        },
        {
          title: "The diameter's error counts twice in Young's modulus",
          body: "Y = 4FL/(πd²ΔL) has d squared, so 2Δd/d enters. A fine screw gauge can still give the largest term because the diameter itself is so small.",
        },
      ],
    },
  ],
};
