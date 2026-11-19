import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_GR_LAW_NOTE: SubtopicNote = {
  subtopicName: "Law of Gravitation, g and Weight",
  title: "Law of Gravitation, g and Weight",
  oneLineDefinition:
    "Every two bodies attract each other with a force F = Gm₁m₂/r²; G is the same everywhere, but g, the acceleration it gives near the Earth, changes from place to place, and so does weight W = mg.",
  whyItMatters:
    "Six questions in the bank, three EASY, one MODERATE and two HARD. Two are about the law itself (what gravity does, and why the law rests on observation alone). Four are about g: that G stays the same while g changes (asked in 2010 and again in 2021), how g changes with height, depth and at the poles, and the weight of a body at the centre of the Earth.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9grla-law",
      name: "Newton's universal law of gravitation",
      intuition:
        "An apple falls to the ground and the Moon goes round the Earth for the same reason: the Earth pulls them. Newton saw that every body in the universe pulls every other body. The pull is stronger when the masses are bigger and gets weaker very fast as they move apart: double the distance and the pull drops to a quarter.",
      definition:
        "- Every two bodies in the universe **attract** each other. The force is **directly proportional to the product of their masses** and **inversely proportional to the square of the distance** between their centres.\n" +
        "- \\(F = G\\frac{m_1 m_2}{r^2}\\), where **G**, the **universal gravitational constant**, is \\(6.67 \\times 10^{-11}\\) N m²/kg².\n" +
        "- Gravity keeps the **Moon** going round the Earth and the **planets** going round the Sun, holds the atmosphere to the Earth and causes the **tides** (the Moon's pull).\n" +
        "- In **free fall**, gravity is the **only** force acting. **Buoyancy** also depends on gravity, since it equals the weight of the liquid pushed aside.\n" +
        "- The law was found from **observation** of falling bodies and of the planets. It cannot be derived from other laws, and G was measured by **experiment**.",
      formula: {
        label: "Universal law of gravitation",
        latex: "F = G\\frac{m_1 m_2}{r^2} \\qquad G = 6.67 \\times 10^{-11}\\ \\mathrm{N\\,m^2/kg^2}",
        symbols: [
          { symbol: "F", meaning: "gravitational force between the two bodies, in newtons" },
          { symbol: "m₁, m₂", meaning: "masses of the two bodies, in kg" },
          { symbol: "r", meaning: "distance between their centres, in metres" },
          { symbol: "G", meaning: "universal gravitational constant" },
        ],
      },
      authoredExample: {
        prompt: "Two bodies attract each other with a force F. The distance between them is doubled, and the mass of one of them is also doubled. What is the new force?",
        steps: [
          "Doubling the distance divides the force by \\(2^2 = 4\\).",
          "Doubling one mass multiplies the force by 2.",
          "New force \\(= F \\times \\frac{2}{4} = \\frac{F}{2}\\).",
        ],
        answer: "Half the old force, F/2",
      },
      selfCheckExample: {
        prompt: "The distance between two bodies is halved and their masses stay the same. What happens to the gravitational force between them?",
        steps: ["The force goes as \\(\\frac{1}{r^2}\\).", "Halving r multiplies the force by \\(2^2 = 4\\)."],
        answer: "It becomes four times as large",
      },
      practiceSet: [
        { prompt: "Which force keeps the planets moving round the Sun?", answer: "The gravitational force of the Sun" },
        { prompt: "The gravitational force between two bodies is 36 N. What does it become if the distance between them is made three times as large?", answer: "\\(\\frac{36}{3^2} = 4\\) N" },
        { prompt: "Find the gravitational force between two 1 kg masses placed 1 m apart.", answer: "\\(F = G = 6.67 \\times 10^{-11}\\) N" },
        { prompt: "What is the value of the universal gravitational constant G?", answer: "\\(6.67 \\times 10^{-11}\\) N m²/kg²" },
      ],
      pyqExampleId: "2e202e45-2cf3-4675-97b4-a9d4dab1ffde",
      traps: [
        {
          title: "Using the distance instead of its square",
          body: "The force goes as 1 divided by r². Tripling the distance makes the force one ninth, not one third.",
        },
        {
          title: "Thinking gravity stops acting in free fall",
          body: "A freely falling body is falling precisely because gravity acts on it. In free fall, gravity is the only force on the body.",
        },
        {
          title: "Thinking buoyancy has nothing to do with gravity",
          body: "The buoyant force equals the weight of the liquid pushed aside, and weight comes from gravity. Without gravity there would be no buoyancy.",
        },
        {
          title: "Thinking only huge bodies attract",
          body: "Every two bodies attract each other, even two books on a table. The force between small bodies is just too tiny to notice, because G is so small.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9grla-g",
      name: "Acceleration due to gravity g, and weight",
      intuition:
        "G is a fixed number for the whole universe, like the value of π. But g is the pull of one particular planet at one particular spot, so it changes as you move. Go up a mountain and you are further from the Earth's centre, so g falls. Dig down and less of the Earth is below you pulling, so g falls again, all the way to zero at the centre. Your mass never changes, but your weight, mg, follows g.",
      definition:
        "- **g** is the acceleration of a body falling under the Earth's gravity: \\(g = \\frac{GM}{R^2}\\). At the surface it is about **9.8 m/s²**. It does **not** depend on the mass of the falling body.\n" +
        "- **G is the same everywhere; g changes from place to place.**\n" +
        "- g is **largest at the poles** and smaller at the equator, because the Earth's radius is least at the poles.\n" +
        "- g **decreases with height**: \\(g_h = g\\left(1 - \\frac{2h}{R}\\right)\\) for a small height h.\n" +
        "- g **decreases with depth**: \\(g_d = g\\left(1 - \\frac{d}{R}\\right)\\), and becomes **zero at the centre** of the Earth.\n" +
        "- On the Moon, g is about **one sixth** of its value on the Earth.\n" +
        "- **Mass** (kg) is the amount of matter and is the same everywhere. **Weight** is the force of gravity on it, \\(W = mg\\), in newtons, and changes with g.",
      formula: {
        label: "g and weight",
        latex: "g = \\frac{GM}{R^2} \\qquad g_h = g\\left(1 - \\frac{2h}{R}\\right) \\qquad g_d = g\\left(1 - \\frac{d}{R}\\right) \\qquad W = mg",
        symbols: [
          { symbol: "g", meaning: "acceleration due to gravity at the Earth's surface, about 9.8 m/s²" },
          { symbol: "M, R", meaning: "mass and radius of the Earth" },
          { symbol: "h", meaning: "height above the surface (small compared with R)" },
          { symbol: "d", meaning: "depth below the surface" },
          { symbol: "W, m", meaning: "weight (in newtons) and mass (in kg) of a body" },
        ],
      },
      authoredExample: {
        prompt: "A box has a mass of 30 kg. Find its weight on the Earth's surface (g = 9.8 m/s²), on the Moon, and in a mine at a depth of one quarter of the Earth's radius.",
        steps: [
          "On the Earth: \\(W = mg = 30 \\times 9.8 = 294\\) N.",
          "On the Moon g is one sixth as large: \\(\\frac{294}{6} = 49\\) N.",
          "At depth \\(d = \\frac{R}{4}\\): \\(g_d = 9.8 \\times \\left(1 - \\frac{1}{4}\\right) = 7.35\\) m/s², so \\(W = 30 \\times 7.35 = 220.5\\) N.",
        ],
        answer: "294 N on the Earth, 49 N on the Moon, 220.5 N in the mine; the mass stays 30 kg throughout",
      },
      selfCheckExample: {
        prompt: "Where on the Earth's surface is g greatest: at the poles or at the equator?",
        steps: ["\\(g = \\frac{GM}{R^2}\\), so a smaller R gives a larger g.", "The Earth's radius is least at the poles."],
        answer: "At the poles",
      },
      practiceSet: [
        { prompt: "An astronaut has a mass of 50 kg on the Earth. What is the astronaut's mass on the Moon?", answer: "Still 50 kg: mass does not change" },
        { prompt: "What is the weight of a 12 kg bag at a place where g = 10 m/s²?", answer: "\\(12 \\times 10 = 120\\) N" },
        { prompt: "Find g at a height of 64 km above the Earth, taking R = 6400 km and g = 9.8 m/s² at the surface.", answer: "\\(9.8 \\times \\left(1 - \\frac{128}{6400}\\right) = 9.8 \\times 0.98 = 9.604\\) m/s²" },
        { prompt: "Does g increase or decrease as a climber goes up a high mountain?", answer: "It decreases, because the climber moves further from the Earth's centre" },
      ],
      pyqExampleId: "1866cbd7-3b13-400a-8dbc-2a56fa602856",
      traps: [
        {
          title: "Thinking G changes from place to place",
          body: "G is a universal constant, the same on the Earth, the Moon or anywhere. It is g, the acceleration near one planet, that changes.",
        },
        {
          title: "Mixing up mass and weight",
          body: "Mass is in kilograms and never changes. Weight, mg, is in newtons and changes with g: it is zero at the centre of the Earth, though the mass is not.",
        },
        {
          title: "Thinking g grows as you go deeper",
          body: "Inside the Earth, g falls with depth as \\(g\\left(1 - \\frac{d}{R}\\right)\\) and is zero at the centre.",
        },
        {
          title: "Swapping the height and depth formulas",
          body: "Height has 2h/R: \\(g\\left(1 - \\frac{2h}{R}\\right)\\). Depth has d/R with no 2: \\(g\\left(1 - \\frac{d}{R}\\right)\\).",
        },
        {
          title: "Thinking g is largest at the equator",
          body: "The Earth bulges at the equator, so a point there is further from the centre and g is smaller. g is largest at the poles.",
        },
      ],
    },
  ],
};
