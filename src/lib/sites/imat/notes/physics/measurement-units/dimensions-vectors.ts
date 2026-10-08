import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_MU_DIMENSIONS_NOTE: SubtopicNote = {
  subtopicName: "Dimensions and Vectors",
  title: "Dimensional Analysis, Scalars and Vectors",
  oneLineDefinition:
    "Both sides of a true equation, and every term in a sum, carry the same units; some quantities also carry a direction, and those add by geometry, not arithmetic.",
  whyItMatters:
    "Four of the five past questions in this chapter are on this page. The 2013, 2015 and 2021 papers asked which expressions or equations have consistent units, and the 2012 paper asked which quantity in a list is not a vector.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-mu-dimensional",
      name: "Dimensional analysis: checking units in an equation",
      intuition:
        "You cannot add 3 metres to 2 seconds. In the same way, a correct physics equation can only add, subtract or equate things measured in the same units. Breaking every unit down to kilograms, metres, seconds and amperes lets you test an equation, or name the quantity an expression gives, without knowing any numbers.",
      definition:
        "**Dimensional analysis** checks units by writing every quantity in SI base units.\n" +
        "- Quantities can be **added, subtracted or set equal** only if they have the **same units**.\n" +
        "- So every term of a sum must have the same units as the left-hand side.\n" +
        "- Pure numbers (\\(\\tfrac{1}{2}\\), \\(2\\pi\\)) have no units, so a units check can never show a missing factor of \\(\\tfrac{1}{2}\\).\n" +
        "- Useful chains: energy = force × distance = power × time; power = force × velocity; charge = current × time; \\(V = IR\\) and \\(P = VI = V^2/R\\).",
      formula: {
        label: "Working a unit down to base units",
        latex: "\\text{J} = \\text{N m} = (\\text{kg m s}^{-2})(\\text{m}) = \\text{kg m}^2\\,\\text{s}^{-2}",
        symbols: [
          { symbol: "\\(\\text{J}\\)", meaning: "joule, the unit of energy and work" },
          { symbol: "\\(\\text{N}\\)", meaning: "newton, the unit of force" },
        ],
      },
      authoredExample: {
        prompt:
          "\\(P\\) is a power, \\(t\\) a time and \\(F\\) a force. Show that \\(\\dfrac{Pt}{F}\\) has the units of a length. Then check whether \\(s = ut + \\tfrac{1}{2}at^2\\) has consistent units.",
        steps: [
          "\\(P\\) is in \\(\\text{kg m}^2\\text{ s}^{-3}\\), so \\(Pt\\) is in \\(\\text{kg m}^2\\text{ s}^{-2}\\) (an energy).",
          "Divide by \\(F\\) in \\(\\text{kg m s}^{-2}\\): \\(\\dfrac{\\text{kg m}^2\\text{ s}^{-2}}{\\text{kg m s}^{-2}} = \\text{m}\\). It is a length: energy divided by force is a distance.",
          "For \\(s = ut + \\tfrac{1}{2}at^2\\): \\(ut\\) is \\((\\text{m s}^{-1})(\\text{s}) = \\text{m}\\), and \\(at^2\\) is \\((\\text{m s}^{-2})(\\text{s}^2) = \\text{m}\\). Every term is in metres, so the units are consistent.",
        ],
        answer: "\\(Pt/F\\) is in metres; the equation is consistent",
      },
      selfCheckExample: {
        prompt: "Which one of the following products has the same SI units as momentum?",
        options: [
          "force × distance",
          "mass × acceleration",
          "force × time",
          "power × time",
          "mass × velocity²",
        ],
        steps: [
          "Momentum is mass × velocity: \\(\\text{kg m s}^{-1}\\).",
          "Force × time: \\((\\text{kg m s}^{-2})(\\text{s}) = \\text{kg m s}^{-1}\\). This matches, which is why impulse is measured in N s.",
          "A, D and E are all energies (\\(\\text{kg m}^2\\text{ s}^{-2}\\)); B is a force.",
        ],
        answer: "(C) force × time",
      },
      practiceSet: [
        { prompt: "Does \\(v^2 = u^2 + 2as\\) have consistent units?", answer: "Yes", method: "Each term is in \\(\\text{m}^2\\text{ s}^{-2}\\)" },
        { prompt: "Write the watt in SI base units.", answer: "\\(\\text{kg m}^2\\text{ s}^{-3}\\)", method: "J/s" },
        { prompt: "Which unit is one watt per ampere?", answer: "The volt", method: "\\(P = VI\\), so \\(V = P/I\\)" },
        { prompt: "Which has the units of power: force × velocity or force × distance?", answer: "Force × velocity", method: "\\(\\text{N} \\times \\text{m/s} = \\text{J/s}\\)" },
      ],
      traps: [
        {
          title: "Consistent units do not prove an equation is right",
          body: "\\(s = ut + at^2\\) has consistent units but is wrong: the factor \\(\\tfrac{1}{2}\\) is missing. A units check can rule an equation out, but it can never confirm a numerical factor.",
        },
        {
          title: "A resistance and its reciprocal cannot be added",
          body: "\\(1/R\\) is measured in \\(\\Omega^{-1}\\), so an expression like \\(R_1 + 1/R_2\\) mixes units and cannot be right. The same goes for any sum that mixes, say, an energy and a power.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mu-scalars-vectors",
      name: "Scalars and vectors: which quantities have a direction",
      intuition:
        "Some quantities are fully described by a size: 5 kg of flour is 5 kg in any direction. Others make no sense without a direction: a velocity of 20 m/s could be north or south, and that changes everything. The test is simple: ask whether turning the quantity around would change its meaning.",
      definition:
        "- A **scalar** has a size (magnitude) only. Scalars add like ordinary numbers.\n" +
        "- A **vector** has a size and a direction. Vectors add by geometry (next concept).\n" +
        "- A **negative sign** on a scalar (a charge of \\(-2\\ \\mu\\text{C}\\), a temperature of \\(-5\\) °C) is not a direction.\n" +
        "- Every **force** is a vector, so **weight** (a force) is a vector, but **mass** is a scalar.",
      table: {
        columns: ["Quantity", "Scalar or vector", "Note"],
        rows: [
          { cells: ["Distance", "scalar", "length of the path travelled"] },
          { cells: ["Displacement", "vector", "straight-line change of position"] },
          { cells: ["Speed", "scalar", "distance per unit time"] },
          { cells: ["Velocity", "vector", "displacement per unit time"] },
          { cells: ["Acceleration", "vector", "change of velocity per unit time"] },
          { cells: ["Mass", "scalar", "amount of matter"] },
          { cells: ["Weight, any force", "vector", "weight points towards the centre of the Earth"] },
          { cells: ["Momentum", "vector", "same direction as the velocity"] },
          { cells: ["Energy, work, power", "scalar", "no direction, even though forces cause them"] },
          { cells: ["Pressure", "scalar", "the force it makes on a surface is a vector"] },
          { cells: ["Temperature", "scalar", "a minus sign is not a direction"] },
          { cells: ["Electric charge", "scalar", "positive or negative, never a direction"] },
          { cells: ["Electric field", "vector", "direction of the force on a positive charge"] },
          { cells: ["Electric current", "scalar", "currents at a junction add as numbers"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which one of the following quantities is a vector?",
        options: ["energy", "power", "temperature", "electric charge", "momentum"],
        steps: [
          "Momentum is mass × velocity, and velocity has a direction, so momentum is a vector.",
          "Energy and power have no direction even when they come from a force. Charge and temperature can be negative, but a sign is not a direction.",
        ],
        answer: "(E) momentum",
      },
      practiceSet: [
        { prompt: "Is weight a scalar or a vector?", answer: "A vector", method: "It is a force, pointing down" },
        { prompt: "Is kinetic energy a scalar or a vector?", answer: "A scalar", method: "Energy has no direction" },
        { prompt: "A runner completes one full lap of a 400 m track. Give the distance and the displacement.", answer: "Distance 400 m; displacement zero", method: "She ends where she started" },
      ],
      traps: [
        {
          title: "Mass is a scalar, weight is a vector",
          body: "Weight is the gravitational force on a mass, so it has a direction (down). Mass has none. An option listing weight as a scalar confuses the two.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mu-vector-add",
      name: "Adding vectors and splitting them into components",
      intuition:
        "Walk 5 m east and then 12 m north: you are not 17 m from the start, because the two steps point in different directions. Vectors add tip to tail, and the result is the arrow from the first tail to the last tip. When two vectors are at right angles, Pythagoras gives its length. Any vector can also be split into two perpendicular parts, which is how most problems are solved.",
      definition:
        "- **Resultant**: the single vector with the same effect as several vectors together (draw them tip to tail).\n" +
        "- Two perpendicular vectors \\(a\\) and \\(b\\): resultant \\(\\sqrt{a^2 + b^2}\\), at angle \\(\\tan^{-1}(b/a)\\) to \\(a\\).\n" +
        "- Two vectors at any angle: the resultant lies between \\(|a - b|\\) (opposite) and \\(a + b\\) (same direction).\n" +
        "- **Components** of a vector \\(F\\) at angle \\(\\theta\\) to the horizontal: \\(F\\cos\\theta\\) horizontally and \\(F\\sin\\theta\\) vertically.\n" +
        "- To add many vectors, add all horizontal components, add all vertical components, then combine the two totals with Pythagoras.",
      formula: {
        label: "Components and the resultant",
        latex: "F_x = F\\cos\\theta, \\quad F_y = F\\sin\\theta, \\quad R = \\sqrt{F_x^2 + F_y^2}",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle between the vector and the horizontal" },
          { symbol: "\\(F_x, F_y\\)", meaning: "horizontal and vertical components" },
          { symbol: "\\(R\\)", meaning: "size of the resultant" },
        ],
      },
      authoredExample: {
        prompt:
          "Two forces act on a point: 5.0 N towards the east and 12 N towards the north. Find the size and direction of the resultant.",
        steps: [
          "The forces are perpendicular, so \\(R = \\sqrt{5.0^2 + 12^2} = \\sqrt{169} = 13\\ \\text{N}\\).",
          "Direction: \\(\\tan\\theta = 12/5.0 = 2.4\\), so \\(\\theta \\approx 67^\\circ\\) north of east.",
          "Adding the sizes (17 N) would be right only if both forces pointed the same way.",
        ],
        answer: "13 N, about 67° north of east",
      },
      selfCheckExample: {
        prompt:
          "A rope pulls a sledge with a force of 20 N at 60° above the horizontal. What is the horizontal component of the force?",
        options: ["10 N", "17 N", "20 N", "23 N", "40 N"],
        steps: [
          "The horizontal component is next to the 60° angle: \\(20 \\cos 60^\\circ = 20 \\times 0.5 = 10\\ \\text{N}\\).",
          "Option B is \\(20 \\sin 60^\\circ\\), the vertical component. C forgets to resolve. D and E divide by a cosine instead of multiplying.",
        ],
        answer: "(A) 10 N",
      },
      practiceSet: [
        { prompt: "Forces of 3 N and 4 N act on a point in any directions. What range of resultants is possible?", answer: "From 1 N to 7 N", method: "\\(|a - b|\\) to \\(a + b\\)" },
        { prompt: "Find the resultant of 9 N and 12 N at right angles.", answer: "15 N", method: "\\(\\sqrt{81 + 144}\\)" },
        { prompt: "What is the vertical component of 50 N acting at 30° above the horizontal?", answer: "25 N", method: "\\(50 \\sin 30^\\circ\\)" },
      ],
      traps: [
        {
          title: "Vector sizes add only when the vectors are parallel",
          body: "3 N and 4 N give 7 N only if they point the same way. At right angles they give 5 N, and in opposite directions 1 N. The resultant is always between the difference and the sum of the sizes.",
        },
      ],
    },
  ],
};
