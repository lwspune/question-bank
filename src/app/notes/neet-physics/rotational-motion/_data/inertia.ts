import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_RM_INERTIA_NOTE: SubtopicNote = {
  subtopicName: "Moment of Inertia",
  title: "Moment of Inertia",
  oneLineDefinition:
    "Moment of inertia as the rotational version of mass, the standard values for rings, discs, rods and spheres, the radius of gyration, and the parallel and perpendicular axis theorems.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2026, at least one every year. Two use a standard value directly (a ring with a quarter cut away in 2021, a rod's length from its moment of inertia in 2024), two compare radii of gyration (a disc about two axes in 2022, two spheres in 2023), and four use the parallel axis theorem: a sphere about a tangent (Re-NEET 2024), a sphere cut out of a larger one (2025), a ring about a tangent (2026) and two joined spheres (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphrm-inertia",
      name: "Moment of inertia of standard bodies",
      intuition:
        "Mass tells you how hard it is to change a body's straight-line motion. Moment of inertia does the same job for turning. It depends not only on the mass but on how far that mass sits from the axis, and the distance counts squared. A ring, with all its mass on the rim, is harder to spin than a disc of the same mass and radius.",
      definition:
        "- \\(I = \\sum m_ir_i^{2}\\), where \\(r_i\\) is the perpendicular distance of each mass from the AXIS. Unit kg m².\n" +
        "- I depends on the mass, how the mass is spread, and the axis. The same body has different values about different axes.\n" +
        "- Thin ring, radius R: about its axis \\(MR^{2}\\); about a diameter \\(\\tfrac{1}{2}MR^{2}\\).\n" +
        "- Disc, radius R: about its axis \\(\\tfrac{1}{2}MR^{2}\\); about a diameter \\(\\tfrac{1}{4}MR^{2}\\).\n" +
        "- Thin rod, length L: about a perpendicular axis through its midpoint \\(\\tfrac{1}{12}ML^{2}\\).\n" +
        "- Hollow cylinder about its axis \\(MR^{2}\\); solid cylinder about its axis \\(\\tfrac{1}{2}MR^{2}\\).\n" +
        "- Solid sphere about a diameter \\(\\tfrac{2}{5}MR^{2}\\); thin hollow sphere about a diameter \\(\\tfrac{2}{3}MR^{2}\\).\n" +
        "- Every bit of a thin ring is R from its axis, so any piece of the ring of mass m adds \\(mR^{2}\\), whatever its shape.",
      formula: {
        label: "Moment of inertia",
        latex: "I = \\sum m_i r_i^{2}, \\qquad I_{\\text{ring}} = MR^{2}, \\quad I_{\\text{disc}} = \\tfrac{1}{2}MR^{2}, \\quad I_{\\text{rod}} = \\tfrac{1}{12}ML^{2}, \\quad I_{\\text{sphere}} = \\tfrac{2}{5}MR^{2}",
        symbols: [
          { symbol: "\\(r_i\\)", meaning: "perpendicular distance of a mass from the axis" },
          { symbol: "\\(M\\)", meaning: "mass of the body" },
        ],
      },
      authoredExample: {
        prompt:
          "A uniform disc has mass 2 kg and radius 0.1 m. Find its moment of inertia about its own axis and about a diameter.",
        steps: [
          "About its axis: \\(\\tfrac{1}{2}MR^{2} = \\tfrac{1}{2} \\times 2 \\times 0.01 = 0.01\\ \\text{kg m}^{2}\\).",
          "About a diameter: \\(\\tfrac{1}{4}MR^{2} = 0.005\\ \\text{kg m}^{2}\\), half the first value.",
        ],
        answer: "0.01 kg m² about its axis, 0.005 kg m² about a diameter",
      },
      selfCheckExample: {
        prompt:
          "Point masses of 1 kg, 2 kg and 3 kg sit 1 m, 2 m and 3 m from an axis. Find their moment of inertia about it.",
        steps: [
          "\\(I = 1(1)^{2} + 2(2)^{2} + 3(3)^{2}\\).",
          "\\(I = 1 + 8 + 27 = 36\\ \\text{kg m}^{2}\\).",
        ],
        answer: "36 kg m²",
      },
      practiceSet: [
        { prompt: "A thin rod has mass 3 kg and length 2 m. Find its moment of inertia about a perpendicular axis through its midpoint.", answer: "1 kg m²" },
        { prompt: "A ring and a disc have the same mass and radius. Which has the larger moment of inertia about its own axis?", answer: "The ring (MR² against MR²/2)" },
        { prompt: "Write the moment of inertia of a solid sphere of mass M and radius R about a diameter.", answer: "\\(\\tfrac{2}{5}MR^{2}\\)" },
        { prompt: "Two 2 kg point masses are fixed to the ends of a light rod 1 m long. Find the moment of inertia about a perpendicular axis through the rod's midpoint.", answer: "1 kg m²" },
      ],
      pyqExampleId: "6c432993-2fd8-4c90-9429-1a06820ef403",
      traps: [
        {
          title: "Distance from the axis, not from a point",
          body: "In \\(I = \\sum mr^{2}\\) each r is the perpendicular distance to the axis line. A mass lying on the axis adds nothing, however far along the axis it is.",
        },
        {
          title: "Name the axis every time",
          body: "A disc has \\(\\tfrac{1}{2}MR^{2}\\) about its axis but \\(\\tfrac{1}{4}MR^{2}\\) about a diameter. A value with no axis named is not an answer.",
        },
        {
          title: "Cutting a body cuts its mass",
          body: "When part of a body is removed, the mass that is left, not the original M, goes into the formula. The radius may stay the same while the mass does not.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphrm-gyration",
      name: "Radius of gyration",
      intuition:
        "Imagine squeezing all the mass of a body onto a thin ring around the axis, sized so the moment of inertia comes out the same. The radius of that ring is the radius of gyration. It describes how far out the mass is spread, in one length.",
      definition:
        "- \\(I = Mk^{2}\\), so \\(k = \\sqrt{\\dfrac{I}{M}}\\).\n" +
        "- k depends on the axis, like I does.\n" +
        "- Ring about its axis: \\(k = R\\). Disc about its axis: \\(\\dfrac{R}{\\sqrt{2}}\\); about a diameter: \\(\\dfrac{R}{2}\\).\n" +
        "- Thin rod about its midpoint: \\(\\dfrac{L}{\\sqrt{12}} = \\dfrac{L}{2\\sqrt{3}}\\).\n" +
        "- Solid sphere about a diameter: \\(\\sqrt{\\tfrac{2}{5}}\\,R\\). Thin hollow sphere: \\(\\sqrt{\\tfrac{2}{3}}\\,R\\).\n" +
        "- For equal masses, the ratio of the k values is the SQUARE ROOT of the ratio of the I values.",
      formula: {
        label: "Radius of gyration",
        latex: "I = Mk^{2}, \\qquad k = \\sqrt{\\frac{I}{M}}",
        symbols: [{ symbol: "\\(k\\)", meaning: "radius of gyration about the chosen axis" }],
      },
      authoredExample: {
        prompt: "A flywheel of mass 20 kg has a moment of inertia of 5 kg m² about its axis. Find its radius of gyration.",
        steps: [
          "\\(k = \\sqrt{\\dfrac{I}{M}} = \\sqrt{\\dfrac{5}{20}}\\).",
          "\\(k = \\sqrt{0.25} = 0.5\\) m.",
        ],
        answer: "0.5 m",
      },
      selfCheckExample: {
        prompt:
          "A ring about its own axis and a solid sphere about a diameter have the same mass and radius. Find the ratio of their radii of gyration, ring to sphere.",
        steps: [
          "Ring: \\(k = R\\). Solid sphere: \\(k = \\sqrt{\\tfrac{2}{5}}\\,R\\).",
          "Ratio: \\(1 : \\sqrt{\\tfrac{2}{5}} = \\sqrt{5} : \\sqrt{2}\\).",
        ],
        answer: "\\(\\sqrt{5} : \\sqrt{2}\\)",
      },
      practiceSet: [
        { prompt: "What is the radius of gyration of a thin rod of length L about a perpendicular axis through its midpoint?", answer: "\\(\\dfrac{L}{2\\sqrt{3}}\\)" },
        { prompt: "A body of mass 4 kg has a radius of gyration of 0.5 m about an axis. Find its moment of inertia about that axis.", answer: "1 kg m²" },
        { prompt: "Does the radius of gyration of a body depend on the axis chosen?", answer: "Yes" },
        { prompt: "Two bodies of equal mass have radii of gyration in the ratio 2 : 1. What is the ratio of their moments of inertia?", answer: "4 : 1" },
      ],
      pyqExampleId: "839a1213-9354-450e-aa4c-020445c93abe",
      traps: [
        {
          title: "Take the square root",
          body: "Since \\(k = \\sqrt{I/M}\\), moments of inertia in the ratio 3 : 5 give radii of gyration in the ratio \\(\\sqrt{3} : \\sqrt{5}\\), not 3 : 5.",
        },
        {
          title: "k is not the radius of the body",
          body: "A disc of radius R has \\(k = R/\\sqrt{2}\\) about its axis. Only a thin ring about its own axis has k equal to its radius.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphrm-axis-theorems",
      name: "Parallel and perpendicular axis theorems",
      visualizationSlug: "jee-parallel-axis",
      intuition:
        "The table gives I only about axes through the centre. The parallel axis theorem moves the axis sideways: the body now also swings its whole mass round a circle of radius d, which adds \\(Md^{2}\\). The perpendicular axis theorem works only for a flat body: the axis normal to the plane is the sum of two perpendicular axes lying in the plane.",
      definition:
        "- **Parallel axis**: \\(I = I_{cm} + Md^{2}\\), where the two axes are parallel, one passes through the centre of mass, and d is the distance between them.\n" +
        "- **Perpendicular axis** (flat bodies only): \\(I_z = I_x + I_y\\), with x and y in the plane, z normal to it, all three through one point.\n" +
        "- Rod about one end: \\(\\tfrac{1}{12}ML^{2} + M\\left(\\tfrac{L}{2}\\right)^{2} = \\tfrac{1}{3}ML^{2}\\).\n" +
        "- Solid sphere about a tangent: \\(\\tfrac{2}{5}MR^{2} + MR^{2} = \\tfrac{7}{5}MR^{2}\\).\n" +
        "- Disc about a diameter: \\(I_z = 2I_d\\), so \\(I_d = \\tfrac{1}{4}MR^{2}\\). A ring about a diameter: \\(\\tfrac{1}{2}MR^{2}\\).\n" +
        "- A body with a piece removed: \\(I_{\\text{rest}} = I_{\\text{whole}} - I_{\\text{piece}}\\), both about the SAME axis (move the piece's I with the parallel axis theorem first).\n" +
        "- Joined bodies: add each one's I about the same axis.",
      formula: {
        label: "Axis theorems",
        latex: "I = I_{cm} + Md^{2}, \\qquad I_z = I_x + I_y",
        symbols: [
          { symbol: "\\(I_{cm}\\)", meaning: "moment of inertia about a parallel axis through the centre of mass" },
          { symbol: "\\(d\\)", meaning: "distance between the two parallel axes" },
        ],
      },
      authoredExample: {
        prompt:
          "A thin rod has mass 0.6 kg and length 1 m. Find its moment of inertia about a perpendicular axis through one end.",
        steps: [
          "About the midpoint: \\(\\tfrac{1}{12}ML^{2} = \\tfrac{0.6}{12} = 0.05\\ \\text{kg m}^{2}\\).",
          "The end is \\(\\tfrac{L}{2} = 0.5\\) m away: \\(I = 0.05 + 0.6(0.5)^{2} = 0.05 + 0.15 = 0.2\\ \\text{kg m}^{2}\\).",
          "Check: \\(\\tfrac{1}{3}ML^{2} = 0.2\\).",
        ],
        answer: "0.2 kg m²",
      },
      selfCheckExample: {
        prompt:
          "A disc has mass M and radius R. Use the perpendicular axis theorem to find its moment of inertia about a diameter.",
        steps: [
          "Two perpendicular diameters lie in the plane, and by symmetry they have the same I, call it \\(I_d\\).",
          "\\(I_z = I_d + I_d\\), and \\(I_z = \\tfrac{1}{2}MR^{2}\\), so \\(I_d = \\tfrac{1}{4}MR^{2}\\).",
        ],
        answer: "\\(\\tfrac{1}{4}MR^{2}\\)",
      },
      practiceSet: [
        { prompt: "Find the moment of inertia of a solid sphere of mass M and radius R about a tangent.", answer: "\\(\\tfrac{7}{5}MR^{2}\\)" },
        { prompt: "Find the moment of inertia of a thin ring of mass M and radius R about a diameter.", answer: "\\(\\tfrac{1}{2}MR^{2}\\)" },
        { prompt: "To which bodies does the perpendicular axis theorem apply?", answer: "Flat (plane) bodies only" },
        { prompt: "A disc of mass 2 kg and radius 0.2 m. Find its moment of inertia about an axis normal to it through a point on its rim.", answer: "0.12 kg m²" },
      ],
      pyqExampleId: "7b7d58cd-113c-4987-81f5-1ffea2596f49",
      traps: [
        {
          title: "One axis must pass through the centre of mass",
          body: "\\(I = I_{cm} + Md^{2}\\) only works from an axis through the centre of mass. To go between two other parallel axes, step back to the centre-of-mass axis first.",
        },
        {
          title: "Flat bodies only",
          body: "The perpendicular axis theorem holds for a plane body such as a disc, ring or plate. For a sphere or a cylinder it gives wrong answers.",
        },
        {
          title: "Subtract about the same axis",
          body: "For a body with a hole, the piece's moment of inertia must be taken about the same axis as the whole body before subtracting, using \\(I_{cm} + md^{2}\\) for the piece.",
        },
      ],
    },
  ],
};
