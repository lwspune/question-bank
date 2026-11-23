import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_WE_KINETIC_NOTE: SubtopicNote = {
  subtopicName: "Kinetic Energy",
  title: "Kinetic Energy",
  oneLineDefinition:
    "Kinetic energy is the energy a body has because it moves: it equals ½mv², so it grows with the mass and with the square of the speed, and it can also be written as ½pv or p²/2m using the momentum p = mv.",
  whyItMatters:
    "The busiest page of the chapter: eight questions, two EASY and six MODERATE. Four compare kinetic energies when the mass and the speed change (two bodies drawn side by side, a ratio, a table of four balls, a quarter of the mass at twice the speed). The other four tie kinetic energy to momentum: KE = ½pv, a light and a heavy body with the same momentum, the speed at which the kinetic energy is a set multiple of the momentum, and which factors kinetic energy depends on.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9weke-kinetic",
      name: "Kinetic energy: ½mv²",
      intuition:
        "A slow cricket ball barely stings your hand; a fast one hurts. A loaded truck at the same speed as a scooter does far more damage. Kinetic energy grows with mass and grows very fast with speed: double the speed and the energy becomes four times as much. The kinetic energy of a body is the work it can do before it stops.",
      definition:
        "- **Kinetic energy** is the energy of a moving body: \\(E_k = \\frac{1}{2}mv^2\\), in joules.\n" +
        "- It is **directly proportional to the mass**: double the mass, double the energy.\n" +
        "- It is **proportional to the square of the speed**: double the speed, four times the energy; three times the speed, nine times the energy.\n" +
        "- A moving body can do work equal to its kinetic energy, so comparing the **work two bodies can do** means comparing \\(\\frac{1}{2}mv^2\\).\n" +
        "- **Ratios**: if masses are in the ratio \\(m_1 : m_2\\) and speeds \\(v_1 : v_2\\), the kinetic energies are in the ratio \\(m_1 v_1^2 : m_2 v_2^2\\).\n" +
        "- A body at rest has **no** kinetic energy.",
      formula: {
        label: "Kinetic energy",
        latex: "E_k = \\frac{1}{2}mv^2 \\qquad \\frac{E_1}{E_2} = \\frac{m_1}{m_2} \\times \\left(\\frac{v_1}{v_2}\\right)^2",
        symbols: [
          { symbol: "Ek", meaning: "kinetic energy, in joules (J)" },
          { symbol: "m", meaning: "mass, in kg" },
          { symbol: "v", meaning: "speed, in m/s" },
        ],
      },
      authoredExample: {
        prompt: "A car of mass 1500 kg moves at 20 m/s. Find its kinetic energy. What would it be if the car went twice as fast?",
        steps: [
          "\\(E_k = \\frac{1}{2} \\times 1500 \\times 20^2 = \\frac{1}{2} \\times 1500 \\times 400 = 300000\\) J = 300 kJ.",
          "At twice the speed the energy is \\(2^2 = 4\\) times as much: \\(4 \\times 300 = 1200\\) kJ.",
        ],
        answer: "300 kJ, and 1200 kJ at twice the speed",
      },
      selfCheckExample: {
        prompt: "A ball of mass 0.5 kg moves at 6 m/s. What is its kinetic energy?",
        steps: ["\\(E_k = \\frac{1}{2} \\times 0.5 \\times 6^2 = \\frac{1}{2} \\times 0.5 \\times 36 = 9\\) J."],
        answer: "9 J",
      },
      practiceSet: [
        { prompt: "The speed of a cyclist doubles. By what factor does the cyclist's kinetic energy change?", answer: "It becomes 4 times as much" },
        { prompt: "The mass of a moving trolley is halved and its speed stays the same. What happens to its kinetic energy?", answer: "It becomes half" },
        { prompt: "Two bodies have masses in the ratio 1 : 2 and speeds in the ratio 2 : 1. Find the ratio of their kinetic energies.", answer: "\\(1 \\times 2^2 : 2 \\times 1^2 = 4 : 2\\), so 2 : 1" },
        { prompt: "A body of mass 4 kg has 50 J of kinetic energy. What is its speed?", answer: "\\(v^2 = \\frac{2 \\times 50}{4} = 25\\), so \\(v = 5\\) m/s" },
      ],
      pyqExampleId: "639081cc-64ec-4463-8ab5-455b0a38b404",
      traps: [
        {
          title: "Forgetting to square the speed",
          body: "Kinetic energy goes as \\(v^2\\). Doubling the speed makes it four times, not twice, as large.",
        },
        {
          title: "Thinking the heavier body always has more kinetic energy",
          body: "Speed counts twice. A 1 kg ball at 6 m/s has 18 J, more than a 2 kg ball at 4 m/s, which has 16 J.",
        },
        {
          title: "Leaving out the half",
          body: "Kinetic energy is \\(\\frac{1}{2}mv^2\\), not \\(mv^2\\). A 2 kg body at 3 m/s has 9 J, not 18 J.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9weke-momentum",
      name: "Kinetic energy and momentum",
      intuition:
        "Momentum is mass times velocity, p = mv. Kinetic energy is ½mv², which is ½ × (mv) × v, so it is half the momentum times the speed. Give a light body and a heavy body the same momentum: the light one must move much faster, and because speed counts twice in kinetic energy, the light body carries more energy.",
      definition:
        "- **Momentum**: \\(p = mv\\), in **kg m/s**.\n" +
        "- Kinetic energy in terms of momentum: \\(E_k = \\frac{1}{2}pv\\) and \\(E_k = \\frac{p^2}{2m}\\).\n" +
        "- For the **same momentum**, the **lighter** body has **more** kinetic energy (\\(E_k\\) goes as \\(\\frac{1}{m}\\)).\n" +
        "- For the **same mass**, doubling the momentum makes the kinetic energy **four times**.\n" +
        "- Kinetic energy depends on the **mass** and the **velocity**; written as \\(\\frac{p^2}{2m}\\) it can also be expressed through the momentum.\n" +
        "- When \\(E_k\\) is a number k times p (in their units), \\(\\frac{1}{2}mv^2 = k\\,mv\\), so \\(v = 2k\\).",
      formula: {
        label: "Kinetic energy and momentum",
        latex: "p = mv \\qquad E_k = \\frac{1}{2}pv \\qquad E_k = \\frac{p^2}{2m}",
        symbols: [
          { symbol: "p", meaning: "momentum, in kg m/s" },
          { symbol: "Ek", meaning: "kinetic energy, in joules" },
          { symbol: "m", meaning: "mass, in kg" },
          { symbol: "v", meaning: "velocity, in m/s" },
        ],
      },
      authoredExample: {
        prompt: "A body of mass 2 kg has a momentum of 10 kg m/s. Find its speed and its kinetic energy.",
        steps: [
          "Speed: \\(v = \\frac{p}{m} = \\frac{10}{2} = 5\\) m/s.",
          "Kinetic energy: \\(E_k = \\frac{1}{2}pv = \\frac{1}{2} \\times 10 \\times 5 = 25\\) J.",
          "Check: \\(\\frac{p^2}{2m} = \\frac{100}{4} = 25\\) J.",
        ],
        answer: "5 m/s and 25 J",
      },
      selfCheckExample: {
        prompt: "A body of mass 3 kg moves at 4 m/s. Find its momentum and its kinetic energy.",
        steps: ["\\(p = 3 \\times 4 = 12\\) kg m/s.", "\\(E_k = \\frac{1}{2} \\times 12 \\times 4 = 24\\) J."],
        answer: "12 kg m/s and 24 J",
      },
      practiceSet: [
        { prompt: "Two bodies of mass 1 kg and 4 kg have the same momentum. Which has more kinetic energy, and how many times as much?", answer: "The 1 kg body, 4 times as much, since \\(E_k = \\frac{p^2}{2m}\\)" },
        { prompt: "What is the SI unit of momentum?", answer: "kg m/s" },
        { prompt: "A body moving at 6 m/s has a momentum of 20 kg m/s. What is its kinetic energy?", answer: "\\(\\frac{1}{2} \\times 20 \\times 6 = 60\\) J" },
        { prompt: "The momentum of a body is doubled while its mass stays the same. What happens to its kinetic energy?", answer: "It becomes 4 times as much" },
      ],
      pyqExampleId: "ca750084-57ba-4c51-b83c-38e4dfa29e83",
      traps: [
        {
          title: "Thinking equal momentum means equal kinetic energy",
          body: "With the same momentum, the lighter body moves faster and has more kinetic energy, because \\(E_k = \\frac{p^2}{2m}\\).",
        },
        {
          title: "Writing kinetic energy as pv",
          body: "Kinetic energy is half of momentum times speed: \\(E_k = \\frac{1}{2}pv\\).",
        },
        {
          title: "Mixing up the units",
          body: "Momentum is measured in kg m/s and kinetic energy in joules. They are different quantities even when their numbers are compared.",
        },
      ],
    },
  ],
};
