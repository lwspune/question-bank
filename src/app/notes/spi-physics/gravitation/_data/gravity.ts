import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_GV_GRAVITY_NOTE: SubtopicNote = {
  subtopicName: "Gravitational Force, g and Satellites",
  title: "Gravitational Force, g and Satellites",
  oneLineDefinition:
    "Every two masses pull on each other with a force that grows with their masses and falls with the square of the distance between them; near the Earth that pull gives every body the same acceleration g.",
  whyItMatters:
    "Five questions in the bank, three of them from the 2022 paper: the mass of the Sun from the Earth's pull, why g is larger at the poles, where g is least, the period of a geostationary satellite and the Earth's escape velocity. Three are EASY and two MODERATE. The escape velocity question turns on a unit (km/s or m/s), so learn the numbers with their units.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spigvgr-law",
      name: "Newton's law of gravitation",
      intuition:
        "The pull between two bodies gets stronger if either is heavier, and much weaker as they move apart: twice as far means a quarter of the pull. That is why the Sun, though huge, pulls you far less than the Earth under your feet.",
      definition:
        "- Every two bodies attract each other. The force is **proportional to the product of their masses** and **inversely proportional to the square of the distance** between their centres.\n" +
        "- **G** is the universal gravitational constant, \\(6.67 \\times 10^{-11}\\ \\text{N m}^2/\\text{kg}^2\\). It is the same everywhere in the universe.\n" +
        "- Double the distance and the force becomes \\(\\frac{1}{4}\\); triple it and it becomes \\(\\frac{1}{9}\\).\n" +
        "- To find an unknown mass, rearrange: \\(M = \\dfrac{F r^2}{G m}\\).",
      formula: {
        label: "Universal law of gravitation",
        latex: "F = \\frac{G m_1 m_2}{r^2} \\qquad G = 6.67 \\times 10^{-11}\\ \\text{N m}^2\\,\\text{kg}^{-2}",
        symbols: [
          { symbol: "m₁, m₂", meaning: "the two masses, in kg" },
          { symbol: "r", meaning: "distance between their centres, in metres" },
        ],
      },
      authoredExample: {
        prompt: "Two bodies of masses 100 kg and 60 kg are 2 m apart. Find the gravitational force between them.",
        steps: [
          "\\(F = \\frac{6.67 \\times 10^{-11} \\times 100 \\times 60}{2^2}\\).",
          "\\(= \\frac{6.67 \\times 10^{-11} \\times 6000}{4} = 1.0 \\times 10^{-7}\\) N (to two figures).",
        ],
        answer: "About \\(1.0 \\times 10^{-7}\\) N",
      },
      selfCheckExample: {
        prompt: "Two equal masses 1 m apart attract each other with a force of \\(6.67 \\times 10^{-9}\\) N. Find each mass.",
        steps: [
          "\\(m^2 = \\frac{F r^2}{G} = \\frac{6.67 \\times 10^{-9} \\times 1}{6.67 \\times 10^{-11}} = 100\\).",
          "\\(m = 10\\) kg.",
        ],
        answer: "10 kg each",
      },
      practiceSet: [
        { prompt: "Two bodies 3 m apart attract with a force F. What is the force when they are 1 m apart?", answer: "9F" },
        { prompt: "Both masses are doubled and the distance stays the same. What happens to the gravitational force?", answer: "It becomes 4 times as large." },
        { prompt: "What is the value of the universal gravitational constant G?", answer: "\\(6.67 \\times 10^{-11}\\ \\text{N m}^2\\,\\text{kg}^{-2}\\)" },
      ],
      pyqExampleId: "b3ee95ef-171e-491f-b1a7-b7c24bc5836b",
      traps: [
        {
          title: "Halving the force when the distance doubles",
          body: "The force goes with the square of the distance. Twice the distance gives a quarter of the force, not half.",
        },
        {
          title: "Forgetting to square the distance",
          body: "In \\(F = \\frac{G m_1 m_2}{r^2}\\) the distance is squared. A distance of \\(3 \\times 10^{5}\\) m becomes \\(9 \\times 10^{10}\\) in the formula.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spigvgr-g",
      name: "The value of g and how it changes over the Earth",
      intuition:
        "g is the Earth's pull on each kilogram. Stand nearer the Earth's centre and the pull is stronger. The Earth is not a perfect ball: it is a little flattened at the poles, so the poles are nearer the centre than the equator is.",
      definition:
        "- Near the Earth's surface every falling body speeds up at \\(g \\approx 9.8\\ \\text{m/s}^2\\), whatever its mass.\n" +
        "- From the law of gravitation, \\(g = \\dfrac{GM}{R^2}\\), where M and R are the Earth's mass and radius. A smaller R gives a larger g.\n" +
        "- The Earth **bulges at the equator** and is flattened at the poles. So g is **greatest at the poles** and **least at the equator**, and it decreases from pole to equator. The Earth's spin also lowers g most at the equator.\n" +
        "- g also **decreases as you go up** (height) and **as you go down** a mine (depth). At the Earth's centre g is **zero**.\n" +
        "- **Weight** \\(= mg\\) changes from place to place; **mass** stays the same everywhere. On the Moon g is about one sixth of the Earth's.",
      formula: {
        label: "Acceleration due to gravity",
        latex: "g = \\frac{GM}{R^2} \\approx 9.8\\ \\text{m/s}^2 \\qquad W = mg",
      },
      authoredExample: {
        prompt: "A planet has the same mass as the Earth but half its radius. How does g on the planet compare with g on the Earth?",
        steps: [
          "\\(g = \\frac{GM}{R^2}\\), with M the same.",
          "Halving R makes \\(R^2\\) a quarter, so g becomes 4 times as large.",
        ],
        answer: "4 times the Earth's g",
      },
      selfCheckExample: {
        prompt: "A boy has a mass of 60 kg. Find his weight on the Earth (\\(g = 9.8\\ \\text{m/s}^2\\)) and on the Moon, where g is one sixth as much.",
        steps: [
          "On the Earth: \\(W = 60 \\times 9.8 = 588\\) N.",
          "On the Moon: \\(\\frac{588}{6} = 98\\) N. His mass is still 60 kg.",
        ],
        answer: "588 N on the Earth, 98 N on the Moon",
      },
      practiceSet: [
        { prompt: "Where on the Earth's surface is g greatest?", answer: "At the poles" },
        { prompt: "What is the value of g at the centre of the Earth?", answer: "Zero" },
        { prompt: "Does a body's mass change when it is taken to the Moon?", answer: "No, only its weight changes." },
        { prompt: "Does g increase or decrease as a body goes down into a deep mine?", answer: "It decreases." },
      ],
      pyqExampleId: "7533b5af-736e-4914-be9c-4daa9c36fc6a",
      traps: [
        {
          title: "Putting the largest g at the equator",
          body:
            "The equator is farther from the Earth's centre than the poles, because of the bulge. So g is least at the equator and greatest at the poles.",
        },
        {
          title: "Giving a reason that has nothing to do with gravity",
          body:
            "Sunlight, ice cover and the Earth's magnetism do not change g. The reasons are the Earth's shape (distance from the centre) and its spin.",
        },
        {
          title: "Saying mass changes on the Moon",
          body: "Weight changes with g; mass, the amount of matter, does not. A 60 kg body is 60 kg on the Moon too.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spigvgr-satellites",
      name: "Satellites and escape velocity",
      intuition:
        "Throw a ball faster and it lands farther away. Throw it fast enough and the ground curves away as fast as the ball falls, so it keeps going round: that is a satellite. Throw it faster still and it never comes back: that is escape velocity.",
      definition:
        "- A **satellite** is a body that goes round a planet. The **Moon** is the Earth's natural satellite and takes about **27 days** to go round once.\n" +
        "- A **geostationary satellite** goes round above the equator, from west to east, once every **24 hours**, the same time the Earth takes to turn once. So it stays above the same place on the Earth. It is about **36,000 km** up and is used for **communication** (TV, telephone).\n" +
        "- **Escape velocity** is the least speed a body needs at the surface to leave the planet for good: \\(v_e = \\sqrt{2gR}\\).\n" +
        "- For the Earth, \\(v_e \\approx 11.2\\) **km/s**, which is **11,200 m/s**. Watch the unit.",
      formula: {
        label: "Escape velocity",
        latex: "v_e = \\sqrt{2gR} \\approx 11.2\\ \\text{km/s} = 11200\\ \\text{m/s} \\text{ for the Earth}",
      },
      authoredExample: {
        prompt: "Find the Earth's escape velocity. Take \\(g = 9.8\\ \\text{m/s}^2\\) and \\(R = 6.4 \\times 10^{6}\\) m.",
        steps: [
          "\\(2gR = 2 \\times 9.8 \\times 6.4 \\times 10^{6} = 1.2544 \\times 10^{8}\\).",
          "\\(v_e = \\sqrt{1.2544 \\times 10^{8}} = 1.12 \\times 10^{4}\\) m/s.",
          "That is 11,200 m/s, or 11.2 km/s.",
        ],
        answer: "11.2 km/s (11,200 m/s)",
      },
      selfCheckExample: {
        prompt: "A planet has \\(g = 10\\ \\text{m/s}^2\\) and radius \\(5 \\times 10^{6}\\) m. Find its escape velocity in km/s.",
        steps: [
          "\\(2gR = 2 \\times 10 \\times 5 \\times 10^{6} = 10^{8}\\).",
          "\\(v_e = \\sqrt{10^{8}} = 10^{4}\\) m/s \\(= 10\\) km/s.",
        ],
        answer: "10 km/s",
      },
      practiceSet: [
        { prompt: "Write the Earth's escape velocity of 11.2 km/s in m/s.", answer: "11,200 m/s" },
        { prompt: "Above which line on the Earth does a geostationary satellite go round?", answer: "The equator" },
        { prompt: "Roughly how long does the Moon take to go round the Earth once?", answer: "About 27 days" },
        { prompt: "What are geostationary satellites mainly used for?", answer: "Communication (TV and telephone)" },
      ],
      pyqExampleId: "57506442-b2c1-4c18-b4a6-84d4adbb74bb",
      traps: [
        {
          title: "Reading 11.2 as m/s",
          body:
            "The Earth's escape velocity is 11.2 km/s. In m/s it is 11,200. If a question asks in m/s, 11.2 is a thousand times too small.",
        },
        {
          title: "Matching a geostationary satellite to a year",
          body:
            "A geostationary satellite keeps pace with the Earth's spin, which takes a day, so its period is 24 hours. 365 days is the time the Earth takes to go round the Sun.",
        },
      ],
    },
  ],
};
