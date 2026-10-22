import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_GR_LAW_NOTE: SubtopicNote = {
  subtopicName: "Gravitation and Weight",
  title: "Gravitation and Weight",
  oneLineDefinition:
    "Newton's inverse-square law of gravitation, how the force changes with mass and distance, and weight as the pull of a planet that depends on its g.",
  whyItMatters:
    "Eight CDS questions from 2020 (II) to 2025 (I), six of them EASY. Three ask how the force changes when a mass or the distance changes, and four are about weight and g.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsphgr-inverse-square",
      name: "Newton's law of gravitation",
      intuition:
        "Every body in the universe pulls every other body. The pull grows with each of the two masses and weakens quickly with distance: double the distance and the pull drops to a quarter, because the distance is squared. So to see how the force changes, multiply by each mass factor and divide by the square of the distance factor.",
      definition:
        "The law and how to use it:\n" +
        "- \\(F = \\dfrac{Gm_1m_2}{r^{2}}\\): proportional to **each mass**, inversely proportional to the **square of the distance** between their centres.\n" +
        "- \\(G = 6.67 \\times 10^{-11}\\ \\text{N m}^{2}\\,\\text{kg}^{-2}\\), the **universal** gravitational constant, the same everywhere.\n" +
        "- The force is **always attractive**, and the two bodies pull each other with **equal** force (third law).\n" +
        "- **Scaling**: new force = old force × (mass factors) ÷ (distance factor)².\n" +
        "- The law of gravitation is a **separate law** found from observation (Newton used the Moon and the planets). It does **not** follow from the three laws of motion, which say how a body responds to a force but not what the force is.",
      formula: {
        label: "Universal law of gravitation",
        latex: "F = \\dfrac{Gm_1m_2}{r^{2}} \\qquad F' = F \\times \\dfrac{(\\text{mass factors})}{(\\text{distance factor})^{2}}",
        symbols: [
          { symbol: "m₁, m₂", meaning: "the two masses" },
          { symbol: "r", meaning: "distance between their centres" },
          { symbol: "G", meaning: "universal gravitational constant" },
        ],
      },
      authoredExample: {
        prompt: "Both masses of a pair are doubled and the distance between them is halved. How many times larger is the gravitational force?",
        steps: [
          "Mass factors: \\(2 \\times 2 = 4\\).",
          "Distance factor \\(\\tfrac{1}{2}\\), squared \\(\\tfrac{1}{4}\\); dividing by \\(\\tfrac{1}{4}\\) multiplies by 4.",
          "New force: \\(4 \\times 4 = 16\\) times the old one.",
        ],
        answer: "16 times.",
      },
      selfCheckExample: {
        prompt: "The distance between two bodies is made three times as large and their masses are unchanged. What happens to the force between them?",
        steps: [
          "Distance factor 3, squared 9.",
          "The force is divided by 9.",
        ],
        answer: "It becomes one ninth of its value.",
      },
      pyqExampleId: "f789b899-8cfb-4bb2-a922-9f987cdba972",
      practiceSet: [
        { prompt: "Both masses are doubled and the distance stays the same. How does the gravitational force change?", answer: "It becomes four times" },
        { prompt: "The distance between two bodies is made one third. How does the force change?", answer: "It becomes nine times" },
        { prompt: "Is the gravitational force between two masses ever repulsive?", answer: "No, it is always attractive" },
        { prompt: "What is the value of the universal gravitational constant G?", answer: "\\(6.67 \\times 10^{-11}\\ \\text{N m}^{2}\\,\\text{kg}^{-2}\\)" },
      ],
      traps: [
        {
          title: "The distance is squared",
          body: "Doubling the distance makes the force **one quarter**, not one half. Halving it makes the force **four times**. Always square the distance factor before dividing.",
        },
        {
          title: "Gravitation is its own law",
          body: "Newton's law of gravitation does **not** follow from the laws of motion. A statement claiming it does is the false one.",
        },
        {
          title: "G is not g",
          body: "**G** is the universal constant, the same everywhere. **g** is the acceleration due to gravity at a place, about 9.8 m/s² on the earth's surface, and it changes from place to place and planet to planet.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphgr-weight",
      name: "Weight, mass and g",
      intuition:
        "Mass is how much matter a body has, and it is the same anywhere. Weight is the force with which a planet pulls that body, so it depends on where you are. On the Moon your mass is unchanged, but your weight is about one sixth of your earth weight. A planet's surface gravity g depends on both its mass and its radius.",
      definition:
        "Weight and g:\n" +
        "- **Weight** is the **force with which the earth (or a planet) attracts a body**: \\(W = mg\\), measured in **newtons**.\n" +
        "- **Mass** is the amount of matter, measured in **kilograms**, and does not change from place to place.\n" +
        "- At the surface, \\(g = \\dfrac{GM}{R^{2}}\\): it depends on **both** the planet's mass \\(M\\) and its radius \\(R\\).\n" +
        "- So if g is k times larger, the weight is k times larger, with the same mass.\n" +
        "- g is about 9.8 m/s² on the earth, about one sixth of that on the Moon, and **zero at the centre of the earth**.",
      formula: {
        label: "Weight and surface gravity",
        latex: "W = mg \\qquad g = \\dfrac{GM}{R^{2}}",
        symbols: [
          { symbol: "W", meaning: "weight, in newtons" },
          { symbol: "m", meaning: "mass of the body, in kilograms" },
          { symbol: "M, R", meaning: "mass and radius of the planet" },
        ],
      },
      authoredExample: {
        prompt: "An astronaut has a mass of 60 kg. Find her mass and her weight on the earth (\\(g = 10\\) m/s²) and on the Moon, where g is one sixth as large.",
        steps: [
          "Mass does not change: 60 kg on both.",
          "Earth: \\(W = 60 \\times 10 = 600\\) N.",
          "Moon: \\(g = 10/6\\) m/s², so \\(W = 60 \\times \\tfrac{10}{6} = 100\\) N.",
        ],
        answer: "Mass 60 kg on both; weight 600 N on the earth and 100 N on the Moon.",
      },
      selfCheckExample: {
        prompt: "A planet has the same mass as the earth but half its radius. How does the weight of a body there compare with its weight on the earth?",
        steps: [
          "\\(g = GM/R^{2}\\): same \\(M\\), radius factor \\(\\tfrac{1}{2}\\), squared \\(\\tfrac{1}{4}\\).",
          "Dividing by \\(\\tfrac{1}{4}\\) makes g four times larger, and \\(W = mg\\) follows g.",
        ],
        answer: "Four times its weight on the earth.",
      },
      pyqExampleId: "5290863f-557c-427a-a010-3723e6b6bd67",
      practiceSet: [
        { prompt: "In which unit is weight measured, and in which unit is mass measured?", answer: "Weight in newtons, mass in kilograms" },
        { prompt: "What is the value of g at the centre of the earth?", answer: "Zero" },
        { prompt: "A body weighs 49 N on the earth, where g is 9.8 m/s². What is its mass?", answer: "5 kg", method: "\\(m = W/g\\)" },
        { prompt: "Does the mass of a body change when it is taken to the Moon?", answer: "No, only its weight changes" },
      ],
      traps: [
        {
          title: "Weight is a force, mass is not",
          body: "**Weight** is the earth's pull on a body, in newtons, and it changes with g. **Mass** is the amount of matter, in kilograms, and stays fixed. Options like 'mass' or 'density' for the earth's pull are wrong.",
        },
        {
          title: "g needs both mass and radius",
          body: "\\(g = GM/R^{2}\\) contains the planet's **mass** and its **radius**. Neither alone fixes g.",
        },
        {
          title: "Weight scales with g, not with its square",
          body: "With the mass fixed, \\(W = mg\\): if g becomes 5 times, the weight becomes 5 times. No squaring is needed here; the square belongs to the radius inside g.",
        },
      ],
    },
  ],
};
