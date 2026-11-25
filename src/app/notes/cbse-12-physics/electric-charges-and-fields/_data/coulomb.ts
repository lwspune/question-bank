import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EF_COULOMB_NOTE: SubtopicNote = {
  subtopicName: "Coulomb's Law and Forces Between Multiple Charges",
  title: "Coulomb's Law and Forces Between Many Charges",
  oneLineDefinition:
    "Coulomb's law for the force between two point charges, in words and in vector form, the superposition principle for the force from many charges, and a charge moving in a circle round another.",
  whyItMatters:
    "21 questions, twelve of them from board papers. The board asks you to state Coulomb's law in vector form (2023), find the radius or the kinetic energy of a charge going round another (2023), read charges off graphs of F against 1/r² (2024, 2025), find the net force at the centre of a square of charges (2024), find the force after two balls touch (2026) and find the direction of the net force when an outside field also acts (2025). The textbook adds Coulomb's law numericals and a comparison with gravity.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpef-coulomb-law",
      name: "Coulomb's law",
      intuition:
        "Two point charges push or pull each other along the line joining them. Double either charge and the force doubles; double the distance and the force falls to a quarter. Like charges repel and unlike charges attract, and the forces on the two charges are equal and opposite.",
      definition:
        "- **Statement:** the force between two stationary point charges is directly proportional to the product of their magnitudes, inversely proportional to the square of the distance between them, and acts along the line joining them.\n" +
        "- In vacuum or air: \\(F = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{|q_1 q_2|}{r^2}\\), with \\(\\dfrac{1}{4\\pi\\varepsilon_0} \\approx 9 \\times 10^9\\) N m² C⁻². Here \\(\\varepsilon_0 = 8.854 \\times 10^{-12}\\) C² N⁻¹ m⁻² is the permittivity of free space.\n" +
        "- **Vector form:** \\(\\vec{F}_{21} = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1 q_2}{r_{21}^2}\\hat{r}_{21}\\) is the force on \\(q_2\\) due to \\(q_1\\), where \\(\\hat{r}_{21}\\) is the unit vector from \\(q_1\\) to \\(q_2\\). Swapping the labels gives \\(\\vec{F}_{12} = -\\vec{F}_{21}\\).\n" +
        "- **1 coulomb** is the charge that, placed 1 m from an equal charge in vacuum, repels it with a force of \\(9 \\times 10^9\\) N.\n" +
        "- A graph of F against \\(1/r^2\\) is a straight line through the origin with slope \\(\\dfrac{q_1 q_2}{4\\pi\\varepsilon_0}\\).\n" +
        "- Between an electron and a proton the electric force is about \\(10^{39}\\) times the gravitational force.",
      formula: {
        label: "Coulomb's law in vector form",
        latex: "\\vec{F}_{21} = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{q_1 q_2}{r_{21}^{2}}\\,\\hat{r}_{21}",
        symbols: [
          { symbol: "\\(\\vec{F}_{21}\\)", meaning: "force on charge 2 due to charge 1" },
          { symbol: "\\(\\hat{r}_{21}\\)", meaning: "unit vector pointing from charge 1 to charge 2" },
          { symbol: "\\(\\varepsilon_0\\)", meaning: "permittivity of free space" },
        ],
      },
      authoredExample: {
        prompt:
          "Two point charges of \\(+4\\ \\mu\\text{C}\\) and \\(-5\\ \\mu\\text{C}\\) are 60 cm apart in air. Find the force between them and say whether it is attractive or repulsive.",
        steps: [
          "Given: \\(q_1 = 4 \\times 10^{-6}\\) C, \\(q_2 = -5 \\times 10^{-6}\\) C, \\(r = 0.60\\) m.",
          "Formula: \\(F = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{|q_1 q_2|}{r^2}\\).",
          "\\(F = \\dfrac{9 \\times 10^9 \\times 4 \\times 10^{-6} \\times 5 \\times 10^{-6}}{(0.60)^2} = \\dfrac{0.18}{0.36}\\).",
          "\\(F = 0.5\\) N. The charges have opposite signs, so the force is attractive.",
        ],
        answer: "0.5 N, attractive",
      },
      selfCheckExample: {
        prompt:
          "The force between two point charges is 12 N. What does it become if one charge is tripled and the distance between them is doubled?",
        steps: ["\\(F \\propto \\dfrac{q_1 q_2}{r^2}\\), so the new force is \\(12 \\times \\dfrac{3}{2^2}\\).", "\\(12 \\times 0.75 = 9\\) N."],
        answer: "9 N",
      },
      practiceSet: [
        { prompt: "What is the SI unit of \\(\\varepsilon_0\\)?", answer: "C² N⁻¹ m⁻²" },
        { prompt: "Two charges repel with a force of 8 N. The distance between them is halved. Find the new force.", answer: "32 N" },
        {
          prompt: "A graph of F against \\(1/r^2\\) for a pair of charges is a straight line through the origin. What does a steeper line tell you?",
          answer: "A larger product of the two charges, since the slope is \\(\\dfrac{q_1 q_2}{4\\pi\\varepsilon_0}\\)",
        },
      ],
      pyqExampleId: "5386aab6-91cf-4a1d-9892-05747dd1a5dd",
      traps: [
        {
          title: "Vector form without the unit vector",
          body: "Say what \\(\\hat{r}_{21}\\) is: the unit vector from \\(q_1\\) to \\(q_2\\). A vector form with no note on its direction loses its mark.",
        },
        {
          title: "Distance left in centimetres",
          body: "Convert r to metres before squaring. 20 cm is 0.20 m, so \\(r^2 = 0.04\\) m², not 400.",
        },
        {
          title: "Using Coulomb's law for large bodies close together",
          body: "The law is for point charges. Two charged spheres may be treated as points only when their sizes are small compared with the distance between them.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpef-superposition",
      name: "Force from several charges: superposition",
      intuition:
        "When many charges act on one, find the force from each as if the others were not there, then add these forces as vectors. Symmetry often does most of the work: equal charges at equal distances on opposite sides cancel each other.",
      definition:
        "- **Principle of superposition:** the force on a charge due to several charges is the vector sum of the forces due to each charge taken one at a time: \\(\\vec{F}_1 = \\vec{F}_{12} + \\vec{F}_{13} + \\dots + \\vec{F}_{1n}\\). The force of one charge on another is not changed by the presence of other charges.\n" +
        "- Draw each force first: away from a like charge, towards an unlike charge.\n" +
        "- Two forces at right angles add to \\(\\sqrt{F_a^2 + F_b^2}\\), at an angle \\(\\tan^{-1}(F_b/F_a)\\) to \\(F_a\\). Two forces at an angle θ add to \\(\\sqrt{F_a^2 + F_b^2 + 2F_aF_b\\cos\\theta}\\).\n" +
        "- **Symmetry:** equal charges at the corners of an equilateral triangle exert no net force on a charge at its centroid.\n" +
        "- A charge between two LIKE charges feels no net force at one point on the line joining them, nearer the smaller charge.",
      formula: {
        label: "Superposition of forces",
        latex: "\\vec{F}_{1} = \\vec{F}_{12} + \\vec{F}_{13} + \\dots + \\vec{F}_{1n}",
      },
      authoredExample: {
        prompt:
          "A charge of \\(+5\\ \\mu\\text{C}\\) is at the origin. A charge of \\(+9\\ \\mu\\text{C}\\) is at (0.9 m, 0) and a charge of \\(-12\\ \\mu\\text{C}\\) is at (0, 0.6 m). Find the net force on the charge at the origin.",
        steps: [
          "Force from the \\(+9\\ \\mu\\text{C}\\) charge (repulsion, along \\(-x\\)): \\(F_1 = \\dfrac{9 \\times 10^9 \\times 9 \\times 10^{-6} \\times 5 \\times 10^{-6}}{(0.9)^2} = \\dfrac{0.405}{0.81} = 0.5\\) N.",
          "Force from the \\(-12\\ \\mu\\text{C}\\) charge (attraction, along \\(+y\\)): \\(F_2 = \\dfrac{9 \\times 10^9 \\times 12 \\times 10^{-6} \\times 5 \\times 10^{-6}}{(0.6)^2} = \\dfrac{0.54}{0.36} = 1.5\\) N.",
          "In vector form: \\(\\vec{F} = (-0.5\\,\\hat{i} + 1.5\\,\\hat{j})\\) N.",
          "Size: \\(F = \\sqrt{0.5^2 + 1.5^2} = \\sqrt{2.5} = 1.58\\) N, at \\(\\tan^{-1}(0.5/1.5) = 18.4^\\circ\\) from the +y axis, towards \\(-x\\).",
        ],
        answer: "\\(\\vec{F} = (-0.5\\,\\hat{i} + 1.5\\,\\hat{j})\\) N, of size 1.58 N",
      },
      selfCheckExample: {
        prompt:
          "A charge of \\(+9\\) nC is at x = 0 and a charge of \\(+25\\) nC is at x = 1.6 m. Where on the line between them does a third charge feel no force?",
        steps: [
          "Between two like charges the two forces on a third charge point opposite ways, so they can cancel.",
          "\\(\\dfrac{9}{x^2} = \\dfrac{25}{(1.6 - x)^2}\\), so \\(\\dfrac{1.6 - x}{x} = \\dfrac{5}{3}\\).",
          "\\(4.8 - 3x = 5x\\), so \\(x = 0.6\\) m.",
        ],
        answer: "At x = 0.6 m, nearer the smaller charge",
      },
      practiceSet: [
        { prompt: "Two forces of 6 N and 8 N act on a charge at right angles to each other. Find the net force.", answer: "10 N" },
        {
          prompt: "Does the force between two charges change when a third charge is brought near them?",
          answer: "No. The force of each pair stays the same; only the total force on each charge changes",
        },
        { prompt: "Two equal forces act on a charge at 120° to each other. How big is the net force?", answer: "Equal to either force" },
      ],
      pyqExampleId: "2765efc7-24fc-40e8-ab49-4144752ba3ff",
      traps: [
        {
          title: "Adding the sizes instead of the vectors",
          body: "Forces from different charges point different ways. Add them as vectors, using components or the parallelogram law, never by adding their sizes.",
        },
        {
          title: "One arrow the wrong way",
          body: "Most wrong answers have one force reversed. Before any arithmetic, draw each force away from a like charge and towards an unlike charge.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpef-orbit",
      name: "A charge moving in a circle round another",
      intuition:
        "A charge can circle a fixed unlike charge the way a planet circles the Sun. The Coulomb attraction supplies the centripetal force. Setting the two equal gives the speed, the radius of the circle and the kinetic energy.",
      definition:
        "- For a charge \\(q\\) of mass \\(m\\) moving with speed \\(v\\) in a circle of radius \\(r\\) round a fixed unlike charge \\(Q\\): \\(\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{qQ}{r^2} = \\dfrac{mv^2}{r}\\) (sizes only).\n" +
        "- So \\(mv^2 = \\dfrac{qQ}{4\\pi\\varepsilon_0 r}\\), and the kinetic energy is \\(K = \\dfrac{1}{2}mv^2 = \\dfrac{qQ}{8\\pi\\varepsilon_0 r}\\).\n" +
        "- Solving for the radius: \\(r = \\dfrac{qQ}{4\\pi\\varepsilon_0 m v^2}\\).\n" +
        "- A charge cannot circle a fixed LIKE charge: the force then points outwards and cannot be a centripetal force.",
      formula: {
        label: "Charge in a circular orbit",
        latex: "\\frac{1}{4\\pi\\varepsilon_0}\\frac{qQ}{r^{2}} = \\frac{mv^{2}}{r} \\;\\Rightarrow\\; K = \\frac{qQ}{8\\pi\\varepsilon_0 r}",
      },
      authoredExample: {
        prompt:
          "In a simple model of the hydrogen atom, an electron goes round the proton in a circle of radius \\(5.3 \\times 10^{-11}\\) m. Find the force on the electron and its kinetic energy.",
        steps: [
          "Given: \\(q = Q = 1.6 \\times 10^{-19}\\) C (sizes), \\(r = 5.3 \\times 10^{-11}\\) m.",
          "Force: \\(F = \\dfrac{9 \\times 10^9 \\times (1.6 \\times 10^{-19})^2}{(5.3 \\times 10^{-11})^2} = \\dfrac{2.304 \\times 10^{-28}}{2.809 \\times 10^{-21}} = 8.2 \\times 10^{-8}\\) N, towards the proton.",
          "This force is the centripetal force: \\(\\dfrac{mv^2}{r} = F\\), so \\(mv^2 = Fr\\).",
          "\\(K = \\dfrac{1}{2}Fr = \\dfrac{1}{2} \\times 8.2 \\times 10^{-8} \\times 5.3 \\times 10^{-11} = 2.17 \\times 10^{-18}\\) J.",
        ],
        answer: "\\(8.2 \\times 10^{-8}\\) N towards the proton; \\(2.17 \\times 10^{-18}\\) J",
      },
      selfCheckExample: {
        prompt: "A charge goes round a fixed unlike charge in a circle. What must the radius become for its kinetic energy to be halved?",
        steps: ["\\(K = \\dfrac{qQ}{8\\pi\\varepsilon_0 r}\\), so \\(K \\propto \\dfrac{1}{r}\\).", "Halving K needs the radius to be doubled."],
        answer: "Twice the radius",
      },
      practiceSet: [
        { prompt: "What supplies the centripetal force when a charge circles a fixed unlike charge?", answer: "The Coulomb attraction between the two charges" },
        { prompt: "Why can a charge not move in a circle round a fixed like charge?", answer: "Like charges repel, so the force points outwards and cannot act as a centripetal force" },
        { prompt: "In the orbit formula, if the speed of the moving charge is doubled, what happens to the radius?", answer: "It becomes a quarter, since \\(r \\propto 1/v^2\\)" },
      ],
      pyqExampleId: "ced8152d-6159-4c08-a9b5-2275107eb663",
      traps: [
        {
          title: "Dropping the half in kinetic energy",
          body: "\\(mv^2 = \\dfrac{qQ}{4\\pi\\varepsilon_0 r}\\) is not the kinetic energy. K is half of it, \\(\\dfrac{qQ}{8\\pi\\varepsilon_0 r}\\).",
        },
        {
          title: "Keeping r squared",
          body: "One power of r cancels between \\(1/r^2\\) and \\(mv^2/r\\). So K depends on \\(1/r\\), not on \\(1/r^2\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpef-contact",
      name: "Force after two charged balls touch",
      intuition:
        "Many questions change the charges by letting two balls touch, then change the distance, and ask for the new force. Work in two steps: first find each ball's new charge by sharing, then compare the new force with the old one as a ratio, so the constants cancel.",
      definition:
        "- Two identical conducting balls that touch end with equal charges, each half the total: \\(q' = \\dfrac{q_1 + q_2}{2}\\).\n" +
        "- If the total is zero, both end uncharged and the force vanishes. If the charges had opposite signs, attraction can turn into repulsion.\n" +
        "- Ratio method: \\(\\dfrac{F'}{F} = \\dfrac{|q_1' q_2'|}{|q_1 q_2|} \\times \\left(\\dfrac{r}{r'}\\right)^2\\).\n" +
        "- A charged ball touched by an identical uncharged ball keeps half its charge.",
      formula: {
        label: "New force after a change",
        latex: "\\frac{F'}{F} = \\frac{|q_1' q_2'|}{|q_1 q_2|}\\left(\\frac{r}{r'}\\right)^{2}",
      },
      authoredExample: {
        prompt:
          "Two identical metal balls carry \\(+7q\\) and \\(-q\\) and attract each other with a force F when a distance r apart. They are touched together and then placed a distance 3r apart. Find the new force in terms of F.",
        steps: [
          "Before: \\(F = k\\dfrac{7q \\times q}{r^2} = \\dfrac{7kq^2}{r^2}\\), attractive.",
          "After touching: total charge \\(7q - q = 6q\\), so each ball has \\(3q\\).",
          "After: \\(F' = k\\dfrac{3q \\times 3q}{(3r)^2} = \\dfrac{9kq^2}{9r^2} = \\dfrac{kq^2}{r^2}\\).",
          "So \\(F' = \\dfrac{F}{7}\\). Both balls now have the same sign, so the force is repulsive.",
        ],
        answer: "F/7, repulsive",
      },
      selfCheckExample: {
        prompt: "Two identical balls carrying \\(+8\\) nC and \\(-8\\) nC are touched together and then separated. What force do they exert on each other now?",
        steps: ["Total charge: \\(8 - 8 = 0\\).", "Each ball is left uncharged, so there is no force."],
        answer: "Zero",
      },
      practiceSet: [
        { prompt: "A charged ball is touched by an identical uncharged ball. What fraction of its charge is left on it?", answer: "Half" },
        { prompt: "The force between two charges is 36 N. Both charges are halved and the distance is kept the same. Find the new force.", answer: "9 N" },
      ],
      pyqExampleId: "10179216-6e31-4222-b732-a7c8e0cd1ce2",
      traps: [
        {
          title: "Using the old charges after contact",
          body: "Find the shared charge first. Using the charges from before the contact gives the wrong size and often the wrong type of force.",
        },
        {
          title: "Not saying attract or repel",
          body: "After contact both balls have the same sign, so they repel even if they attracted before. The board gives a mark for the nature of the force.",
        },
      ],
    },
  ],
};
