import type { SubtopicNote } from "@/app/notes/_types";

export const SPECIAL_LENSES_RAY_NOTE: SubtopicNote = {
  subtopicName: "Lenses in a Medium, Cut Lenses and Silvered Lenses",
  title: "Lenses in a Medium, Cut Lenses and Silvered Lenses",
  oneLineDefinition:
    "In a medium a lens's power scales with μ(lens)/μ(medium) − 1; a lens cut through its axis keeps its focal length while one cut across it doubles it; a silvered lens is a mirror whose power is twice the lens's power plus that of the silvered face.",
  whyItMatters:
    "Eighteen PYQs, thirteen of them multiple choice, and two from 2026. Ten put a lens in water or another liquid, including a liquid denser than the glass and a liquid trapped between two lenses. Four cut a lens into pieces, along the axis or across it. Four silver one face of a lens, so that it acts as a mirror.",
  concepts: [
    // C1 — a lens in a medium
    {
      kind: "formula" as const,
      slug: "jpray-lens-in-medium",
      name: "A lens in a liquid",
      intuition:
        "A lens bends light because its glass is optically denser than its surroundings. In water the difference is smaller, so the lens is weaker and its focal length longer. In a liquid with the same index as the glass the lens vanishes optically. In a denser liquid a convex lens spreads light out and acts as a diverging lens.",
      definition:
        "- \\(\\dfrac{1}{f_m} = \\left(\\dfrac{\\mu_l}{\\mu_m} - 1\\right)\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)\\), with \\(\\mu_l\\) the lens and \\(\\mu_m\\) the medium.\n" +
        "- The radii do not change, so \\(\\dfrac{f_m}{f_{\\text{air}}} = \\dfrac{\\mu_l - 1}{\\mu_l/\\mu_m - 1}\\).\n" +
        "- \\(\\mu_m = \\mu_l\\): no refraction, f is infinite. \\(\\mu_m > \\mu_l\\): f changes sign, and a convex lens diverges.\n" +
        "- For a lens described in air, first find the curvature factor \\(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\) from the air data, then apply the new factor.\n" +
        "- A liquid filling the gap between two lenses is a third lens (concave, between two convex faces); add all three powers.",
      formula: {
        label: "Lens in a medium",
        latex: "\\frac{1}{f_m} = \\left(\\frac{\\mu_l}{\\mu_m} - 1\\right)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\qquad \\frac{f_m}{f_{\\text{air}}} = \\frac{\\mu_l - 1}{\\mu_l/\\mu_m - 1}",
      },
      authoredExample: {
        prompt:
          "A convex glass lens (\\(\\mu = 1.5\\)) has a focal length of 12 cm in air. Find its focal length (a) in water, \\(\\mu = 4/3\\), and (b) in a liquid of \\(\\mu = 1.75\\).",
        steps: [
          "In air: \\(\\dfrac{1}{12} = 0.5K\\), where \\(K = \\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\). So \\(K = \\dfrac{1}{6}\\ \\text{cm}^{-1}\\).",
          "(a) \\(\\dfrac{\\mu_l}{\\mu_m} - 1 = \\dfrac{1.5}{4/3} - 1 = \\dfrac{1}{8}\\). \\(\\dfrac{1}{f} = \\dfrac{1}{8} \\times \\dfrac{1}{6} = \\dfrac{1}{48}\\), so f = 48 cm.",
          "(b) \\(\\dfrac{1.5}{1.75} - 1 = -\\dfrac{1}{7}\\). \\(\\dfrac{1}{f} = -\\dfrac{1}{7} \\times \\dfrac{1}{6} = -\\dfrac{1}{42}\\), so f = −42 cm: the lens now diverges.",
        ],
        answer: "(a) 48 cm; (b) −42 cm, a diverging lens.",
      },
      selfCheckExample: {
        prompt:
          "A biconvex lens of refractive index 1.75, with both radii 15 cm, is placed in a liquid of refractive index 1.4. Find the ratio of its power in air to its power in the liquid.",
        steps: [
          "The radii are the same in both media, so they cancel in the ratio.",
          "Air: \\(\\mu - 1 = 0.75\\). Liquid: \\(\\dfrac{1.75}{1.4} - 1 = 0.25\\).",
          "Ratio \\(= \\dfrac{0.75}{0.25} = 3\\).",
        ],
        answer: "3 : 1",
      },
      practiceSet: [
        { prompt: "A glass lens of refractive index 1.5 is placed in a liquid of refractive index 1.5. Its focal length?", answer: "Infinite: the lens does not bend light" },
        { prompt: "A lens of refractive index 1.6 has a focal length of 10 cm in air. Its focal length in a liquid of refractive index 1.2?", answer: "18 cm" },
        { prompt: "A biconvex lens (\\(\\mu = 1.5\\)) with radii 20 cm and 30 cm has a power of 1 D in a liquid. Refractive index of the liquid?", answer: "About 1.34" },
        { prompt: "Two identical equiconvex glass lenses (\\(\\mu = 1.5\\), f = 20 cm each) touch, and the space between them is filled with water (\\(\\mu = 4/3\\)). Focal length of the set?", answer: "15 cm" },
      ],
      pyqExampleId: "b8acb957-78e8-4919-8776-02bf972a060a", // 2024: f = 20 cm (μ 1.5) in a liquid of 1.6 becomes −160 cm
      traps: [
        {
          title: "The radii stay; only the factor changes",
          body: "Immersing a lens does not change its shape. Find the curvature factor from the air data, then multiply it by the new μ(lens)/μ(medium) − 1.",
        },
        {
          title: "A convex lens can diverge",
          body: "If the liquid is optically denser than the glass, μ(lens)/μ(medium) − 1 is negative and the converging lens becomes a diverging one.",
        },
        {
          title: "Use the ratio of the factors",
          body: "The focal length in water is neither f(air) × μ(water) nor f(air)/μ(water). It follows from the ratio of the two (relative index − 1) factors.",
        },
      ],
    },

    // C2 — cut lenses
    {
      kind: "reference" as const,
      slug: "jpray-cut-lens",
      name: "Focal length of the pieces of a cut lens",
      intuition:
        "A cut that contains the principal axis leaves both curved faces as they were, only smaller, so each half has the full focal length. A cut across the axis, through the centre, splits a biconvex lens into two plano-convex lenses, each with one curved face, so each has half the power and twice the focal length. Put the pieces back together and the original lens returns.",
      definition:
        "- Focal length depends on the curvatures and μ, not on the size of the lens. A smaller aperture only makes the image dimmer.\n" +
        "- A plane containing the axis: each piece keeps f and P.\n" +
        "- A plane perpendicular to the axis, through the centre of an equiconvex lens: each piece is plano-convex with \\(f' = 2f\\) and \\(P' = P/2\\); the two in contact give back P.\n" +
        "- Cut both ways: apply the two rules in turn.",
      table: {
        columns: ["How the lens is cut", "Each piece is", "Focal length of a piece", "Power of a piece"],
        rows: [
          { cells: ["Along a plane containing the principal axis", "Half of the same lens, both curved faces kept", "\\(f\\)", "\\(P\\)"] },
          { cells: ["Across, perpendicular to the axis, through the centre", "A plano-convex lens", "\\(2f\\)", "\\(P/2\\)"] },
          { cells: ["Along the axis, then one half across it", "A plano-convex quarter", "\\(2f\\)", "\\(P/2\\)"] },
          { cells: ["Half the lens covered, not cut", "The whole lens, with less light", "\\(f\\)", "\\(P\\)"], noteAmber: "The image is complete, only dimmer." },
          { cells: ["Two plano-convex halves put back together", "The original lens", "\\(f\\)", "\\(P\\)"] },
        ],
        caption: "For an equiconvex lens of focal length f and power P. Only a cut across the axis changes the focal length.",
      },
      selfCheckExample: {
        prompt:
          "An equiconvex lens of power +6 D is cut across its axis into two equal plano-convex pieces. Find the focal length of one piece.",
        steps: [
          "Each piece keeps one curved face, so its power halves to 3 D.",
          "\\(f = \\dfrac{1}{3}\\) m \\(\\approx 33.3\\) cm.",
        ],
        answer: "About 33 cm (3 D)",
      },
      practiceSet: [
        { prompt: "A lens of focal length 30 cm is cut along a plane containing its principal axis. Focal length of each half?", answer: "30 cm" },
        { prompt: "An equiconvex lens of focal length 12 cm is cut across its axis through the centre. Focal length of each piece?", answer: "24 cm" },
        { prompt: "An equiconvex lens of power 8 D is cut across its axis, and the two pieces are put back together. Power of the pair?", answer: "8 D" },
        { prompt: "Half of a convex lens is covered with black paper. What happens to the image?", answer: "It is complete but less bright" },
      ],
      pyqExampleId: "28015790-75e5-4130-8cf5-9691962c6646", // 2023: f = 10 cm cut perpendicular to the axis, each piece 5 D
      traps: [
        {
          title: "A smaller lens is not a weaker lens",
          body: "Cutting along the axis halves the size, not the power. The focal length depends only on the curvatures and on μ.",
        },
        {
          title: "Across the axis, the power halves",
          body: "Each plano-convex piece has one curved face instead of two, so its power is half and its focal length twice the original.",
        },
      ],
    },

    // C3 — silvered lenses
    {
      kind: "formula" as const,
      slug: "jpray-silvered-lens",
      name: "A silvered lens as a mirror",
      intuition:
        "Silver one face of a lens and light enters, crosses the lens, reflects off the silver and crosses the lens again. So the system is a mirror. Its power is the lens's power twice, for the two passes, plus the power of the silvered face as a mirror. An object at the centre of curvature of this equivalent mirror is imaged onto itself.",
      definition:
        "- Take converging powers as positive. \\(P = 2P_L + P_M\\), where \\(P_L\\) is the lens's power and \\(P_M = 2/R\\) is the silvered face's power as a concave mirror seen from inside. The system is a concave mirror of focal length \\(F = 1/P\\).\n" +
        "- Plane face silvered: \\(P_M = 0\\), so \\(F = f_L/2\\).\n" +
        "- Equiconvex lens, both radii R, one face silvered: \\(P = \\dfrac{4(\\mu - 1)}{R} + \\dfrac{2}{R} = \\dfrac{2(2\\mu - 1)}{R}\\).\n" +
        "- Image on the object itself: place the object at the equivalent mirror's centre of curvature, a distance 2F from the lens.\n" +
        "- In a liquid, find the lens's power with \\(\\mu_l/\\mu_m - 1\\). A silvered plane face still adds nothing.",
      formula: {
        label: "Silvered lens",
        latex: "P = 2P_L + P_M, \\qquad F = \\frac{1}{P}, \\qquad F = \\frac{f_L}{2}\\ (\\text{plane face silvered})",
      },
      authoredExample: {
        prompt:
          "A plano-convex lens (\\(\\mu = 1.5\\)) has a curved face of radius 30 cm. Find the focal length of the equivalent mirror when (a) its plane face is silvered, and (b) its curved face is silvered instead.",
        steps: [
          "Lens alone: \\(f_L = \\dfrac{R}{\\mu - 1} = \\dfrac{30}{0.5} = 60\\) cm, so \\(P_L = \\dfrac{1}{60}\\ \\text{cm}^{-1}\\).",
          "(a) Plane face silvered: \\(P_M = 0\\). \\(P = 2 \\times \\dfrac{1}{60} = \\dfrac{1}{30}\\), so F = 30 cm, a concave mirror.",
          "(b) Curved face silvered: seen from inside it is a concave mirror of radius 30 cm, \\(P_M = \\dfrac{2}{30}\\). \\(P = \\dfrac{2}{60} + \\dfrac{2}{30} = \\dfrac{1}{10}\\), so F = 10 cm.",
          "An object 2F away is imaged onto itself: 60 cm away in case (a), 20 cm in case (b).",
        ],
        answer: "(a) 30 cm; (b) 10 cm. Both act as concave mirrors.",
      },
      selfCheckExample: {
        prompt:
          "An equiconvex lens of refractive index 1.6 has both radii 24 cm. One face is silvered. How far from the lens must an object be placed to be imaged onto itself?",
        steps: [
          "\\(P_L = (1.6 - 1)\\dfrac{2}{24} = \\dfrac{1}{20}\\ \\text{cm}^{-1}\\); \\(P_M = \\dfrac{2}{24} = \\dfrac{1}{12}\\ \\text{cm}^{-1}\\).",
          "\\(P = \\dfrac{2}{20} + \\dfrac{1}{12} = \\dfrac{6 + 5}{60} = \\dfrac{11}{60}\\), so \\(F = \\dfrac{60}{11} \\approx 5.45\\) cm.",
          "Image on the object: \\(2F = \\dfrac{120}{11} \\approx 10.9\\) cm from the lens.",
        ],
        answer: "About 10.9 cm",
      },
      practiceSet: [
        { prompt: "A plano-convex lens of focal length 40 cm has its plane face silvered. Focal length of the system?", answer: "20 cm" },
        { prompt: "A thin lens of power +2 D is placed against a concave mirror of focal length 25 cm. Power and focal length of the system?", answer: "8 D; 12.5 cm" },
        { prompt: "In a silvered lens the lens has power 3 D and the silvered face, as a mirror, has power 4 D. Focal length of the system?", answer: "10 cm" },
        { prompt: "A plano-convex lens (\\(\\mu = 1.5\\), R = 10 cm) with its plane face silvered is placed in a liquid of refractive index 1.25. Focal length of the system?", answer: "25 cm" },
      ],
      pyqExampleId: "77f62fe6-a1df-417c-8c38-dbba4d598488", // 2025: equiconvex lens, one side polished, object at R/(2μ − 1)
      traps: [
        {
          title: "The lens counts twice",
          body: "Light crosses the lens on the way in and again on the way out, so the lens's power enters as 2P(lens), not P(lens).",
        },
        {
          title: "A silvered plane face adds no power",
          body: "A plane mirror has zero power, so with the flat face silvered the system's focal length is just half the lens's.",
        },
        {
          title: "The silvered curved face is concave from inside",
          body: "Light inside the glass sees a silvered convex surface as a concave mirror of radius R, with power 2/R.",
        },
      ],
    },
  ],
};
