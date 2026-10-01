import type { SubtopicNote } from "@/app/notes/_types";

export const CAPILLARITY_FLUID_NOTE: SubtopicNote = {
  subtopicName: "Excess Pressure and Capillary Rise",
  title: "Excess Pressure and Capillary Rise",
  oneLineDefinition:
    "A curved liquid surface has a higher pressure on its concave side, 2T/r for one surface and 4T/r for a soap bubble, and the same curvature lifts a liquid up a narrow tube to a height h = 2T cos θ/ρgr.",
  whyItMatters:
    "Twenty-four PYQs, six of them numeric, and two from 2026. Eleven are excess pressure: an air bubble at a depth, ratios of soap bubbles, a liquid column that balances one, and two bubbles in contact or one inside another; six use surface tension to hold up a liquid, in straight, tilted and U-shaped tubes and for a drop floating half-immersed; seven are statement questions on contact angle, the shape of the meniscus, and what heat and soap do to the rise.",
  concepts: [
    // C1 — excess pressure
    {
      kind: "formula" as const,
      slug: "jpfluid-excess-pressure",
      name: "Excess pressure inside drops and bubbles",
      intuition:
        "A curved surface under tension squeezes what is inside it, like a stretched balloon. So the pressure inside is higher than outside, and the smaller the radius, the larger the difference. A drop, or an air bubble inside a liquid, has one surface: \\(2T/r\\). A soap bubble in air has two: \\(4T/r\\).",
      definition:
        "- One surface (a drop; an air bubble in a liquid): \\(\\Delta P = \\dfrac{2T}{r}\\). Two surfaces (a soap bubble in air): \\(\\Delta P = \\dfrac{4T}{r}\\).\n" +
        "- Air bubble at depth h in a liquid: \\(P_{\\text{in}} - P_0 = \\rho g h + \\dfrac{2T}{r}\\).\n" +
        "- \\(\\Delta P \\propto 1/r\\): if A's excess pressure is \\(1/k\\) of B's, then \\(r_A = k\\,r_B\\) and \\(V_A = k^{3}V_B\\).\n" +
        "- A liquid column balancing a soap bubble: \\(\\rho g h = \\dfrac{4T}{r}\\).\n" +
        "- Two soap bubbles in contact: the common surface has radius \\(\\dfrac{r_1 r_2}{r_2 - r_1}\\) and bulges into the larger bubble.\n" +
        "- A bubble inside a bubble: the excess pressures add, \\(\\dfrac{4T}{r_1} + \\dfrac{4T}{r_2}\\) for the inner one.\n" +
        "- Two bubbles merging at constant temperature, the atmosphere neglected: \\(R^{2} = R_1^{2} + R_2^{2}\\).",
      formula: {
        label: "Excess pressure",
        latex: "\\Delta P = \\frac{2T}{r}\\ \\text{(one surface)}, \\qquad \\Delta P = \\frac{4T}{r}\\ \\text{(soap bubble)}",
      },
      authoredExample: {
        prompt:
          "An air bubble of radius 0.5 mm is 15 cm below the surface of water. Surface tension is 0.072 N/m. By how much does the pressure inside the bubble exceed atmospheric pressure? (\\(\\rho = 1000\\ \\text{kg/m}^{3}\\), \\(g = 10\\ \\text{m/s}^{2}\\))",
        steps: [
          "The water outside the bubble is at \\(P_0 + \\rho g h\\): \\(\\rho g h = 1000 \\times 10 \\times 0.15 = 1500\\) Pa.",
          "An air bubble in water has one surface: \\(\\dfrac{2T}{r} = \\dfrac{2 \\times 0.072}{5 \\times 10^{-4}} = 288\\) Pa.",
          "Total: \\(1500 + 288 = 1788\\) Pa.",
        ],
        answer: "1788 Pa",
      },
      selfCheckExample: {
        prompt:
          "Two soap bubbles of radii 4 cm and 12 cm touch each other. Find the radius of their common surface, and say which way it bulges.",
        steps: [
          "\\(r = \\dfrac{r_1 r_2}{r_2 - r_1} = \\dfrac{4 \\times 12}{12 - 4} = \\dfrac{48}{8}\\).",
          "The smaller bubble has the higher pressure, so the common surface bulges into the larger one.",
        ],
        answer: "6 cm, bulging into the 12 cm bubble.",
      },
      practiceSet: [
        { prompt: "Excess pressure inside a soap bubble of radius R and surface tension S?", answer: "\\(4S/R\\)" },
        { prompt: "Bubble A's excess pressure is a quarter of bubble B's. Ratio of their volumes, \\(V_A : V_B\\)?", answer: "64 : 1" },
        { prompt: "A soap bubble of radius 2 cm sits inside one of radius 5 cm. Radius of a single bubble with the same inside pressure as the inner one?", answer: "\\(10/7\\) cm" },
        { prompt: "Surface tension 0.03 N/m. Excess pressure in a soap bubble of radius 1 cm?", answer: "12 Pa" },
      ],
      pyqExampleId: "43ceff3e-cf9c-4a87-9512-c574c80b86b3", // 2025: air bubble at a depth, one surface, 2T/r + ρgh
      traps: [
        {
          title: "An air bubble in a liquid has ONE surface",
          body: "Only a soap bubble in air has a film with two faces. An air bubble under water is bounded by water on one side only, so its excess pressure is 2T/r, not 4T/r.",
        },
        {
          title: "Add the depth term",
          body: "At depth h, the liquid just outside the bubble is already at P₀ + ρgh. The pressure inside exceeds atmospheric by ρgh + 2T/r.",
        },
        {
          title: "The common surface uses the difference of the radii",
          body: "It is r₁r₂/(r₂ − r₁). The sum r₁r₂/(r₁ + r₂) looks like a parallel-resistor formula and is a common wrong option.",
        },
      ],
    },

    // C2 — capillary rise
    {
      kind: "formula" as const,
      slug: "jpfluid-capillary-rise",
      name: "Capillary rise",
      intuition:
        "In a narrow glass tube water clings to the glass and its surface curves up. Just under a curved surface the pressure is lower, so the liquid climbs until the weight of the column makes up the difference. A narrower tube curves the surface more and lifts the liquid higher.",
      definition:
        "- \\(h = \\dfrac{2T\\cos\\theta}{\\rho g r}\\). For water on clean glass \\(\\theta \\approx 0\\), so \\(h = \\dfrac{2T}{\\rho g r}\\).\n" +
        "- \\(h \\propto \\dfrac{T}{\\rho r}\\). Doubling both T and ρ leaves h unchanged. Small changes: \\(\\dfrac{\\Delta h}{h} = \\dfrac{\\Delta T}{T} - \\dfrac{\\Delta\\rho}{\\rho} - \\dfrac{\\Delta r}{r}\\).\n" +
        "- Tilted tube: the vertical height stays h. The length of liquid along the tube is \\(\\dfrac{h}{\\cos\\alpha}\\), with α the tilt from the vertical.\n" +
        "- U-tube with limbs of radii \\(r_1 < r_2\\): the narrow limb stands higher by \\(\\Delta h = \\dfrac{2T}{\\rho g}\\left(\\dfrac{1}{r_1} - \\dfrac{1}{r_2}\\right)\\).\n" +
        "- Hot water rises less than cold, because surface tension falls as the temperature rises.\n" +
        "- Surface tension as a force along a line of contact: \\(F = T \\times\\) length. A drop of radius R floating half-immersed is held up by \\(2\\pi R T\\) as well as by the upthrust.",
      formula: {
        label: "Capillary rise",
        latex: "h = \\frac{2T\\cos\\theta}{\\rho g r}",
      },
      authoredExample: {
        prompt:
          "Water (surface tension 0.07 N/m, contact angle 0, \\(\\rho = 1000\\ \\text{kg/m}^{3}\\)) stands in a glass capillary of radius 0.2 mm. How high does it rise? How long is the column if the tube is tilted at 60° to the vertical? (\\(g = 10\\ \\text{m/s}^{2}\\))",
        steps: [
          "\\(h = \\dfrac{2 \\times 0.07}{1000 \\times 10 \\times 2 \\times 10^{-4}} = \\dfrac{0.14}{2} = 0.07\\) m = 7 cm.",
          "Tilted: the vertical height is still 7 cm, so the length is \\(\\dfrac{7}{\\cos 60^{\\circ}} = 14\\) cm.",
        ],
        answer: "7 cm vertically; a column 14 cm long when tilted.",
      },
      selfCheckExample: {
        prompt:
          "A U-tube has limbs of radii 1 mm and 2 mm and holds water (surface tension 0.07 N/m, contact angle 0, \\(\\rho = 1000\\ \\text{kg/m}^{3}\\)). Find the difference between the levels in the two limbs. (\\(g = 10\\ \\text{m/s}^{2}\\))",
        steps: [
          "\\(\\dfrac{2T}{\\rho g} = \\dfrac{0.14}{10^{4}} = 1.4 \\times 10^{-5}\\ \\text{m}^{2}\\).",
          "\\(\\dfrac{1}{r_1} - \\dfrac{1}{r_2} = 1000 - 500 = 500\\ \\text{m}^{-1}\\).",
          "\\(\\Delta h = 1.4 \\times 10^{-5} \\times 500 = 7 \\times 10^{-3}\\) m, higher in the narrow limb.",
        ],
        answer: "7 mm",
      },
      practiceSet: [
        { prompt: "The radius of a capillary is halved. The rise?", answer: "Doubles" },
        { prompt: "Liquid B has twice the surface tension and twice the density of liquid A. Rise of B in the same tube, compared with A?", answer: "The same" },
        { prompt: "Water rises 3 cm in a vertical tube. Length of the column when the tube is tilted 60° from the vertical?", answer: "6 cm" },
        { prompt: "One tube is dipped in cold water, then in hot water. Where is the rise smaller?", answer: "In hot water" },
      ],
      pyqExampleId: "d8901df7-e449-4a4a-98ff-4f8eb42a66f7", // 2021: U-tube of two bores, level difference
      traps: [
        {
          title: "Bores are often given as diameters",
          body: "Halve each diameter before using 1/r₁ − 1/r₂. Using diameters halves the answer.",
        },
        {
          title: "A tilted tube keeps the vertical height",
          body: "The liquid still rises to the same vertical height h; only the length along the tube grows, to h/cos α.",
        },
      ],
    },

    // C3 — contact angle (reference)
    {
      kind: "reference" as const,
      slug: "jpfluid-contact-angle",
      name: "Contact angle, meniscus shape and surface-tension facts",
      intuition:
        "The contact angle is the angle, inside the liquid, between the solid and the liquid surface where they meet. It is set by a contest: cohesion holds the liquid together, adhesion pulls it onto the solid. So it belongs to the pair of materials, not to the liquid alone, and its cosine decides whether the liquid rises or falls in a tube.",
      definition:
        "- Acute angle: adhesion wins, the meniscus is concave and the liquid rises.\n" +
        "- Obtuse angle: cohesion wins, the meniscus is convex and the liquid falls.\n" +
        "- Exactly 90°: \\(\\cos\\theta = 0\\), the surface is flat and the liquid neither rises nor falls.\n" +
        "- Surface tension comes from the extra energy of the molecules AT THE SURFACE compared with those inside.\n" +
        "- Soap and detergent LOWER the surface tension of water.\n" +
        "- Heating lowers surface tension, so the capillary rise is smaller in hot water. Heating also lowers a liquid's viscosity, so hot water flows faster.",
      table: {
        columns: ["Case", "Contact angle", "Meniscus and capillary"],
        rows: [
          { cells: ["Water on clean glass", "About 0°, acute", "Concave; the water rises"] },
          { cells: ["Mercury on glass", "About 140°, obtuse", "Convex; the mercury falls below the outside level"] },
          { cells: ["Water on grease or wax", "Obtuse", "Water forms beads and does not wet the surface, so washing with water alone cannot remove a grease stain"] },
          { cells: ["Soapy water on grease", "Made acute by the detergent", "The water spreads and wets the grease; detergent lowers T"] },
          { cells: ["Adhesion and cohesion in balance", "90°", "Flat surface; no rise and no fall"], noteAmber: "A liquid that neither rises nor falls has a contact angle of 90°, not 0°." },
        ],
        caption: "In \\(h = 2T\\cos\\theta/\\rho g r\\), the sign of \\(\\cos\\theta\\) gives the direction: positive for an acute angle (rise), zero at 90°, negative for an obtuse angle (fall).",
      },
      selfCheckExample: {
        prompt:
          "Liquid A makes a contact angle of 30° with a glass tube and liquid B makes 120°. Describe each meniscus, say what each liquid does in the tube, and find \\(\\cos\\theta_A/\\cos\\theta_B\\).",
        steps: [
          "A: 30° is acute, so the meniscus is concave and A rises.",
          "B: 120° is obtuse, so the meniscus is convex and B falls.",
          "\\(\\dfrac{\\cos 30^{\\circ}}{\\cos 120^{\\circ}} = \\dfrac{0.866}{-0.5} = -\\sqrt{3}\\). A negative ratio always means one rises and one falls.",
        ],
        answer: "A: concave, rises. B: convex, falls. The ratio is \\(-\\sqrt{3}\\).",
      },
      practiceSet: [
        { prompt: "Contact angle at which a liquid neither rises nor falls in a capillary?", answer: "90°" },
        { prompt: "Mercury in a glass capillary: shape of the meniscus and level?", answer: "Convex; below the outside level" },
        { prompt: "Does soap raise or lower the surface tension of water?", answer: "It lowers it." },
        { prompt: "Surface tension arises from extra energy of molecules where: at the surface or in the interior?", answer: "At the surface" },
      ],
      pyqExampleId: "c3d34313-8e66-42a2-973a-5d5d80f8ca1b", // 2024: contact angle is a property of both materials; rise depends on radius
      traps: [
        {
          title: "The contact angle belongs to the pair",
          body: "The same water makes about 0° with clean glass and an obtuse angle with wax. A statement that it depends on the liquid alone, or on the solid alone, is false.",
        },
        {
          title: "Soap water has LOWER surface tension",
          body: "Detergents are added to water because they lower its surface tension. A statement that soap water has the higher surface tension is false.",
        },
        {
          title: "Gases are less viscous than liquids",
          body: "Statement pairs here often slip in a viscosity fact. The viscosity of a gas is far smaller than that of a liquid, so a statement saying the opposite is false.",
        },
      ],
    },
  ],
};
