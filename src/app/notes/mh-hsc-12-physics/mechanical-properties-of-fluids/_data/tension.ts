import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MF_TENSION_NOTE: SubtopicNote = {
  subtopicName: "Surface Tension and Surface Energy",
  title: "Surface Tension and Surface Energy",
  oneLineDefinition:
    "Why a liquid surface behaves like a stretched skin, how surface tension equals surface energy per unit area, the work done on films, bubbles and drops, and how the angle of contact, impurities and temperature change it.",
  whyItMatters:
    "29 questions, the largest page of the chapter. Nineteen were set in board papers, more than on any other page: the relation between surface energy and surface tension (2023, and twice in 2024), the work done in blowing a soap bubble (2018, 2023), the size of a drop from its surface energy (2016, 2017), droplets that merge (2022, 2026), the molecular theory and its terms (2024, 2025, 2026), the angle of contact (2017, 2023), and the effect of impurities and temperature (2019, 2024, 2025). The textbook adds soap films on frames and drops that split.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmf-molecular",
      name: "Molecular theory and the definition of surface tension",
      intuition:
        "Every molecule of a liquid pulls on the molecules close to it. Deep inside, it is pulled equally from all sides, so the pulls cancel. A molecule at the surface has liquid below it but almost nothing above, so it is pulled inward. To bring a molecule up to the surface you must work against this pull, so surface molecules carry extra potential energy. The liquid lowers its energy by keeping its surface as small as it can, and the surface behaves like a stretched skin. That is why a free drop is round.",
      definition:
        "- **Cohesive force:** the force of attraction between molecules of the same substance. **Adhesive force:** the force of attraction between molecules of different substances.\n" +
        "- **Range of molecular force:** the greatest distance up to which a molecule attracts other molecules appreciably.\n" +
        "- **Sphere of influence:** an imaginary sphere with the molecule at its centre and the range of molecular force as its radius.\n" +
        "- A molecule well inside the liquid has its whole sphere of influence in the liquid, so the net force on it is zero. A molecule at the surface has part of its sphere in the vapour, so it feels a **net inward force**.\n" +
        "- Work is done to bring a molecule to the surface, so surface molecules have **more potential energy** than those inside. The surface tends to contract to the least area.\n" +
        "- **Surface tension:** the force per unit length acting at right angles to an imaginary line drawn on the free surface of a liquid, in the plane of the surface, \\(T = F/L\\). SI unit N/m; dimensions \\([L^{0}M^{1}T^{-2}]\\).",
      formula: {
        label: "Surface tension",
        latex: "T = \\frac{F}{L}",
        symbols: [
          { symbol: "\\(F\\)", meaning: "force acting on one side of the line" },
          { symbol: "\\(L\\)", meaning: "length of the imaginary line on the surface" },
        ],
      },
      authoredExample: {
        prompt:
          "A straight thin wire 4 cm long lies on the surface of water. Find the force of surface tension on the wire from the water on one side of it. (Surface tension of water \\(= 0.072\\) N/m)",
        steps: [
          "Given: \\(L = 4\\) cm \\(= 0.04\\) m, \\(T = 0.072\\) N/m.",
          "Formula: \\(T = \\dfrac{F}{L}\\), so \\(F = TL\\).",
          "Substitution: \\(F = 0.072 \\times 0.04 = 2.88 \\times 10^{-3}\\) N.",
        ],
        answer: "2.88 × 10⁻³ N",
      },
      selfCheckExample: {
        prompt: "The surface tension of a liquid is 72 dyne/cm. Express it in N/m.",
        steps: ["1 dyne \\(= 10^{-5}\\) N and 1 cm \\(= 10^{-2}\\) m, so 1 dyne/cm \\(= 10^{-3}\\) N/m.", "\\(72 \\times 10^{-3} = 0.072\\) N/m."],
        answer: "0.072 N/m",
      },
      practiceSet: [
        {
          prompt: "Define the sphere of influence of a molecule.",
          answer: "An imaginary sphere with the molecule at its centre and the range of molecular force as its radius",
        },
        { prompt: "Why does a free liquid drop take a spherical shape?", answer: "A sphere has the least surface area for a given volume, so its surface energy is least" },
        { prompt: "Write the SI unit of surface tension.", answer: "N/m" },
        { prompt: "Is the attraction between water and glass cohesive or adhesive?", answer: "Adhesive, because the molecules are of different substances" },
      ],
      pyqExampleId: "5adbfb7c-978e-420e-89f9-725f4eb6a50e",
      traps: [
        {
          title: "The net force on a surface molecule points inward",
          body: "A surface molecule is pulled into the liquid, at right angles to the surface. Saying it is pulled upward, or along the surface, loses the mark.",
        },
        {
          title: "A definition of surface tension without its conditions",
          body: "Say 'force per unit length', 'at right angles to an imaginary line' and 'in the plane of the surface'. 'Force on the surface' alone is not a definition.",
        },
        {
          title: "Kinetic energy is not what makes surface molecules special",
          body: "Surface molecules have more potential energy than those inside. Their kinetic energy depends on the temperature and is the same throughout the liquid.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmf-surface-energy",
      name: "Surface energy and work done on films and bubbles",
      intuition:
        "Making new surface means dragging molecules up from inside, and that takes work. The work is stored in the surface as surface energy. Stretch a soap film by a small area and the work you do, divided by that area, is exactly the surface tension. So the number in N/m is also an energy per unit area in J/m². The only thing to watch is how many surfaces there are: a drop has one, a soap bubble or a soap film has two.",
      definition:
        "- **Surface energy:** the extra potential energy of the molecules in the surface layer compared with molecules inside the liquid. Per unit area it is measured in J/m².\n" +
        "- **Relation with surface tension** (a wire frame with a sliding wire of length \\(l\\) carrying a soap film):\n" +
        "- The film has two surfaces, so surface tension pulls the wire inward with \\(F = 2Tl\\).\n" +
        "- Pull the wire out slowly through \\(dx\\) at constant temperature. Work done \\(dW = F\\,dx = 2Tl\\,dx\\).\n" +
        "- Increase in area of the two surfaces: \\(dA = 2l\\,dx\\). So \\(dW = T\\,dA\\).\n" +
        "- This work is stored as surface energy, so \\(T = \\dfrac{dW}{dA}\\): surface tension equals surface energy per unit area.\n" +
        "- **Work done** in increasing the area: \\(W = T \\times \\Delta A\\). A drop of radius \\(r\\) has one surface, area \\(4\\pi r^2\\). A soap bubble in air has two, area \\(8\\pi r^2\\). A film on a frame has two.",
      formula: {
        label: "Surface energy",
        latex: "W = T\\,\\Delta A; \\qquad \\text{drop: } A = 4\\pi r^2, \\qquad \\text{soap bubble: } A = 2 \\times 4\\pi r^2 = 8\\pi r^2",
        symbols: [
          { symbol: "\\(W\\)", meaning: "work done, stored as surface energy" },
          { symbol: "\\(\\Delta A\\)", meaning: "increase in total surface area, counting every surface" },
        ],
      },
      authoredExample: {
        prompt: "Calculate the work done in blowing a soap bubble of radius 5 cm. Surface tension of the soap solution \\(= 0.03\\) N/m.",
        steps: [
          "Given: \\(r = 5\\) cm \\(= 0.05\\) m, \\(T = 0.03\\) N/m. The bubble is blown from nothing, so the whole area is new.",
          "Formula: a soap bubble has two surfaces, so \\(\\Delta A = 8\\pi r^2\\) and \\(W = T \\times 8\\pi r^2\\).",
          "\\(\\Delta A = 8 \\times 3.142 \\times (0.05)^2 = 6.284 \\times 10^{-2}\\) m².",
          "\\(W = 0.03 \\times 6.284 \\times 10^{-2} = 1.885 \\times 10^{-3}\\) J.",
        ],
        answer: "1.885 × 10⁻³ J",
      },
      selfCheckExample: {
        prompt: "Find the surface energy of a water drop of radius 1 mm. (Surface tension of water \\(= 0.072\\) N/m)",
        steps: [
          "A drop has one surface: \\(A = 4\\pi r^2 = 4 \\times 3.142 \\times (10^{-3})^2 = 1.257 \\times 10^{-5}\\) m².",
          "\\(E = TA = 0.072 \\times 1.257 \\times 10^{-5} = 9.05 \\times 10^{-7}\\) J.",
        ],
        answer: "9.05 × 10⁻⁷ J",
      },
      practiceSet: [
        { prompt: "Show that N/m and J/m² are the same unit.", answer: "J/m² = N m/m² = N/m" },
        {
          prompt: "A soap film on a frame measures 5 cm × 4 cm. How much work is needed to stretch it to 5 cm × 6 cm? (\\(T = 0.03\\) N/m)",
          answer: "\\(\\Delta A = 2 \\times 0.05 \\times 0.02 = 2 \\times 10^{-3}\\) m², so \\(W = 6 \\times 10^{-5}\\) J",
        },
        { prompt: "The radius of a soap bubble is doubled. By what factor does its surface energy increase?", answer: "Four times, since the area goes as \\(r^2\\)" },
        { prompt: "Why is the area of a soap bubble taken as \\(8\\pi r^2\\) and not \\(4\\pi r^2\\)?", answer: "A soap bubble has two surfaces, an inner one and an outer one" },
      ],
      pyqExampleId: "2ecce4f8-b861-459c-a45b-de383bbfb84e",
      traps: [
        {
          title: "One surface or two",
          body: "A liquid drop and an air bubble inside a liquid have one surface. A soap bubble in air and a soap film on a frame have two. Forgetting the second surface halves the answer.",
        },
        {
          title: "Increase of radius is not increase of area",
          body: "When a bubble grows from \\(r_1\\) to \\(r_2\\), the new area is \\(8\\pi(r_2^2 - r_1^2)\\), not \\(8\\pi(r_2 - r_1)^2\\).",
        },
        {
          title: "dyne/cm left unconverted",
          body: "1 dyne/cm \\(= 10^{-3}\\) N/m. Mixing dyne/cm with lengths in metres gives an answer that is wrong by a power of ten.",
        },
        {
          title: "The derivation without the factor 2",
          body: "In the frame derivation the force on the wire is \\(2Tl\\) because the film has two surfaces, and the new area is \\(2l\\,dx\\). Show both, or the relation does not follow.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmf-drops",
      name: "Drops that merge or split",
      intuition:
        "When small drops join into one big drop, no liquid is lost, so the volume stays the same. But one big sphere has less surface than many small ones holding the same liquid. Less surface means less surface energy, so energy is given out, as a little heat. Breaking a drop into droplets does the opposite: new surface is made, and work must be done on the liquid.",
      definition:
        "- Volume is conserved: \\(n\\) drops of radius \\(r\\) make one drop of radius \\(R\\), with \\(\\frac{4}{3}\\pi R^3 = n \\times \\frac{4}{3}\\pi r^3\\), so \\(R = n^{1/3} r\\).\n" +
        "- Area before merging \\(= n \\times 4\\pi r^2\\); area after \\(= 4\\pi R^2 = n^{2/3} \\times 4\\pi r^2\\). Since \\(n^{2/3} < n\\), the area **decreases**.\n" +
        "- **Merging:** surface energy \\(T \\times 4\\pi(nr^2 - R^2)\\) is released, mostly as heat.\n" +
        "- **Splitting** one drop into \\(n\\) droplets: the area increases, and work \\(T \\times 4\\pi(nr^2 - R^2)\\) must be done on the liquid.",
      formula: {
        label: "Merging or splitting drops",
        latex: "R = n^{1/3} r, \\qquad \\Delta E = T \\times 4\\pi\\left(n r^2 - R^2\\right)",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of small drops" },
          { symbol: "\\(r, R\\)", meaning: "radius of each small drop, radius of the big drop" },
        ],
      },
      authoredExample: {
        prompt:
          "A water drop of radius 1 mm is broken into 1000 identical droplets. Find the work done. (Surface tension of water \\(= 0.072\\) N/m)",
        steps: [
          "Given: \\(R = 1\\) mm \\(= 10^{-3}\\) m, \\(n = 1000\\), \\(T = 0.072\\) N/m.",
          "Radius of each droplet: \\(r = \\dfrac{R}{n^{1/3}} = \\dfrac{10^{-3}}{10} = 10^{-4}\\) m.",
          "Increase in area: \\(\\Delta A = 4\\pi(nr^2 - R^2) = 4\\pi(1000 \\times 10^{-8} - 10^{-6}) = 4\\pi \\times 9 \\times 10^{-6} = 1.131 \\times 10^{-4}\\) m².",
          "Work done: \\(W = T\\,\\Delta A = 0.072 \\times 1.131 \\times 10^{-4} = 8.14 \\times 10^{-6}\\) J.",
        ],
        answer: "8.14 × 10⁻⁶ J, done on the water",
      },
      selfCheckExample: {
        prompt: "A mercury drop of radius 3 mm is split into 27 identical droplets. Find the radius of each droplet, and say whether work is done on the mercury or energy is given out.",
        steps: ["\\(r = \\dfrac{R}{27^{1/3}} = \\dfrac{3}{3} = 1\\) mm.", "The total area increases, so work must be done on the mercury."],
        answer: "1 mm; work is done on the mercury",
      },
      practiceSet: [
        { prompt: "A drop of radius R splits into 64 identical droplets. What is the radius of each droplet?", answer: "\\(R/4\\)" },
        { prompt: "When small drops merge into one drop, is energy given out or taken in?", answer: "Given out, because the surface area decreases" },
        { prompt: "A drop splits into 27 identical droplets. By what factor does the total surface area increase?", answer: "3 times (\\(n^{1/3}\\))" },
      ],
      pyqExampleId: "c68048dc-67eb-49de-91ba-6668b1f73b02",
      traps: [
        {
          title: "The radius does not grow n times",
          body: "Equal volumes give \\(R = n^{1/3}r\\). Twenty-seven drops make a drop of three times the radius, not 27 times.",
        },
        {
          title: "Energy released or work needed",
          body: "Merging lowers the area and releases energy. Splitting raises the area and needs work. State which, because the sign is part of the answer.",
        },
        {
          title: "Using the bubble formula for drops",
          body: "A drop has one surface, \\(4\\pi r^2\\). The factor 2 belongs to a soap bubble, not to a drop of water or mercury.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpmf-contact-angle",
      name: "Angle of contact, impurities and temperature",
      intuition:
        "Where a liquid meets a solid, two pulls compete: cohesion holds the liquid together, adhesion pulls it onto the solid. If adhesion wins, the liquid spreads and wets the solid; if cohesion wins, it gathers into drops. Anything that weakens the pull between surface molecules, such as soap or heat, lowers the surface tension and helps the liquid spread.",
      definition:
        "- **Angle of contact:** the angle between the tangent to the liquid surface at the point of contact and the surface of the solid, measured **inside the liquid**.\n" +
        "- At the point of contact the surface tensions of the solid-air (\\(T_2\\)), solid-liquid (\\(T_1\\)) and liquid-air (\\(T_3\\)) boundaries balance: \\(T_2 = T_1 + T_3\\cos\\theta\\), so \\(\\cos\\theta = \\dfrac{T_2 - T_1}{T_3}\\).\n" +
        "- Surface tension falls as the temperature rises and becomes **zero at the critical temperature**.\n" +
        "- When the board asks for a diagram of the angle of contact, label the solid, the liquid, the air, the tangent at the point of contact and the angle \\(\\theta\\) inside the liquid.",
      table: {
        columns: ["Case", "What happens", "Example"],
        rows: [
          {
            cells: ["Adhesion stronger than cohesion", "The liquid wets the solid; concave meniscus; acute angle of contact", "Water on clean glass"],
          },
          { cells: ["Cohesion stronger than adhesion", "The liquid does not wet the solid; convex meniscus; obtuse angle of contact", "Mercury on glass"] },
          {
            cells: ["Liquid wets the solid completely", "The angle of contact is zero", "Pure water on very clean glass"],
            pyqExampleId: "6c5c1d61-a014-4b66-b7e9-071690adbfe9",
            noteAmber: "Board 2023 asked for the angle of contact of a liquid that wets completely.",
          },
          {
            cells: ["Highly soluble impurity dissolved", "Surface tension increases", "Common salt in water"],
            pyqExampleId: "310d676e-abb9-457c-ac6c-f6bc6de3f3b1",
            noteAmber: "Board 2025 asked for the effect of impurities on surface tension.",
          },
          {
            cells: ["Sparingly soluble impurity dissolved", "Surface tension decreases", "Alcohol, phenol, soap or detergent in water"],
            pyqExampleId: "48d9f1dc-d36e-421a-bdff-e78ccef605e2",
            noteAmber: "Board 2019 asked what alcohol does to the surface tension of water.",
          },
          {
            cells: ["Detergent in washing water", "Lower surface tension lets the water wet greasy cloth and enter the fine gaps of the fibres", "Washing clothes"],
            pyqExampleId: "836058cc-5410-4f80-a5ce-8eece8fa3928",
            noteAmber: "Board 2024 asked why detergent is mixed with water.",
          },
          { cells: ["Liquid of low surface tension", "Small angle of contact, so it spreads into a thin even film", "Paints and lubricating oils"] },
          {
            cells: ["Temperature rises", "Surface tension decreases and is zero at the critical temperature", "Any liquid"],
            pyqExampleId: "7c04b0c0-6ea9-4474-a22e-45f140a8986d",
            noteAmber: "Board 2025 asked at what temperature surface tension becomes zero.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Is the meniscus of water in a clean glass tube concave or convex?", answer: "Concave" },
        { prompt: "Is the angle of contact of mercury with glass acute or obtuse?", answer: "Obtuse" },
        { prompt: "Does dissolving soap in water raise or lower its surface tension?", answer: "It lowers it" },
      ],
      traps: [
        {
          title: "Measuring the angle outside the liquid",
          body: "The angle of contact is measured inside the liquid, from the solid surface to the tangent. Measured on the air side it gives the wrong angle.",
        },
        {
          title: "A diagram without labels",
          body: "A sketch of a drop earns little. Name the solid, liquid and air, draw the tangent at the point of contact, and mark \\(\\theta\\) inside the liquid.",
        },
        {
          title: "Every impurity lowers surface tension",
          body: "Not so. A highly soluble substance such as common salt raises it; a sparingly soluble one such as soap or alcohol lowers it.",
        },
      ],
    },
  ],
};
