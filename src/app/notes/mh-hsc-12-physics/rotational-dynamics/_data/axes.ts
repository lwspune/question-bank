import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_RD_AXES_NOTE: SubtopicNote = {
  subtopicName: "Theorems of Parallel and Perpendicular Axes",
  title: "Theorems of Parallel and Perpendicular Axes",
  oneLineDefinition:
    "Two theorems that give a body's moment of inertia about a new axis from one you already know, and the conditions under which each one holds.",
  whyItMatters:
    "9 questions, five of them from board papers. The board asks you to state and prove the theorem of parallel axes (2016, 2020) and of perpendicular axes (2026), name the kind of body the perpendicular axes theorem applies to (2025) and find a radius of gyration about a parallel axis (2019). The textbook adds a flywheel, a dumb-bell, a disc about a tangent and the conditions for both theorems.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscprd-parallel-axes",
      name: "Theorem of parallel axes",
      intuition:
        "Moving the axis away from the centre of mass always makes a body harder to turn. The theorem says exactly how much harder: add the whole mass times the square of the distance the axis moved.",
      definition:
        "- **Statement:** the moment of inertia of a body about any axis equals its moment of inertia about a parallel axis through its centre of mass plus the product of its mass and the square of the distance between the two axes: \\(I_o = I_c + Mh^2\\).\n" +
        "- **Proof:** take an element dm at D, and drop the perpendicular DN on OC produced, where O is on the given axis, C is the centre of mass and \\(OC = h\\).\n" +
        "- By definition \\(I_o = \\int (DO)^2\\,dm\\) and \\(I_c = \\int (DC)^2\\,dm\\).\n" +
        "- \\((DO)^2 = (DN)^2 + (NC + CO)^2 = (DN)^2 + (NC)^2 + 2(NC)(CO) + (CO)^2 = (DC)^2 + 2h(NC) + h^2\\).\n" +
        "- Integrating: \\(I_o = I_c + 2h\\int (NC)\\,dm + Mh^2\\).\n" +
        "- \\(\\int (NC)\\,dm = 0\\), because the moments of the mass about the centre of mass add to zero. Hence \\(I_o = I_c + Mh^2\\).\n" +
        "- **Conditions:** it holds for any body, plane or solid. The two axes must be parallel, and one of them must pass through the centre of mass.\n" +
        "- In terms of radius of gyration: \\(K^2 = K_c^2 + h^2\\).",
      formula: {
        label: "Parallel axes",
        latex: "I_o = I_c + Mh^2",
      },
      authoredExample: {
        prompt:
          "A thin rod of mass 0.6 kg and length 1 m has a moment of inertia of \\(\\dfrac{ML^2}{12}\\) about a transverse axis through its centre. Find its moment of inertia about a parallel axis through one end.",
        steps: [
          "Given: \\(M = 0.6\\) kg, \\(L = 1\\) m, \\(h = \\dfrac{L}{2} = 0.5\\) m.",
          "Formula: \\(I_o = I_c + Mh^2\\).",
          "Substitution: \\(I_c = \\dfrac{0.6 \\times 1^2}{12} = 0.05\\) kg m²; \\(Mh^2 = 0.6 \\times 0.25 = 0.15\\) kg m².",
          "\\(I_o = 0.05 + 0.15 = 0.2\\) kg m², which is \\(\\dfrac{ML^2}{3}\\).",
        ],
        answer: "0.2 kg m²",
      },
      selfCheckExample: {
        prompt:
          "A body of mass 4 kg has a moment of inertia of 2 kg m² about an axis through its centre of mass. Find its moment of inertia about a parallel axis 0.5 m away.",
        steps: ["\\(I_o = I_c + Mh^2 = 2 + 4 \\times 0.25\\)."],
        answer: "3 kg m²",
      },
      practiceSet: [
        { prompt: "Must one of the two axes in the parallel axes theorem pass through the centre of mass?", answer: "Yes" },
        { prompt: "A body's radius of gyration about an axis through its centre of mass is 0.6 m. Find it about a parallel axis 0.8 m away.", answer: "1 m" },
        { prompt: "Does the parallel axes theorem hold only for plane bodies?", answer: "No. It holds for a body of any shape" },
      ],
      pyqExampleId: "a3f65e7d-9257-4645-9b1b-7385de882e9f",
      traps: [
        {
          title: "Two off-centre axes",
          body: "\\(I_c\\) must be about the axis through the centre of mass. To go between two axes that both miss the centre of mass, go through the centre of mass in two steps.",
        },
        {
          title: "Subtracting the wrong way",
          body: "The moment of inertia about the axis through the centre of mass is the smallest of all parallel axes. \\(I_o\\) is always the bigger one.",
        },
        {
          title: "Not saying why the middle term vanishes",
          body: "In the proof, write that \\(\\int (NC)\\,dm = 0\\) because C is the centre of mass. That line carries a mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscprd-perpendicular-axes",
      name: "Theorem of perpendicular axes",
      intuition:
        "For a flat body lying in a plane, each bit's distance from an axis standing straight up through the plane is fixed by its x and y distances: r² = x² + y². So the moments of inertia about two axes in the plane add up to the one about the perpendicular axis.",
      definition:
        "- **Statement:** the moment of inertia of a plane lamina about an axis perpendicular to its plane equals the sum of its moments of inertia about two mutually perpendicular axes in its plane, all three axes meeting at one point: \\(I_z = I_x + I_y\\).\n" +
        "- **Proof:** let the lamina lie in the xy plane. An element dm at (x, y) is at distance r from the z axis, with \\(r^2 = x^2 + y^2\\).\n" +
        "- \\(I_z = \\int r^2\\,dm = \\int (x^2 + y^2)\\,dm = \\int y^2\\,dm + \\int x^2\\,dm\\).\n" +
        "- y is the element's distance from the x axis and x its distance from the y axis, so \\(\\int y^2\\,dm = I_x\\) and \\(\\int x^2\\,dm = I_y\\). Hence \\(I_z = I_x + I_y\\).\n" +
        "- **Conditions:** it holds only for a plane lamina, because the proof needs every element to lie in the plane. The three axes must meet at one point.",
      formula: {
        label: "Perpendicular axes",
        latex: "I_z = I_x + I_y",
      },
      authoredExample: {
        prompt:
          "A uniform disc of mass 4 kg and radius 0.5 m has a moment of inertia of \\(\\tfrac{1}{2}MR^2\\) about its central axis. Use the theorem of perpendicular axes to find its moment of inertia about a diameter.",
        steps: [
          "Given: \\(M = 4\\) kg, \\(R = 0.5\\) m. \\(I_z = \\tfrac{1}{2} \\times 4 \\times 0.25 = 0.5\\) kg m².",
          "Formula: \\(I_z = I_x + I_y\\). Any two perpendicular diameters are alike, so \\(I_x = I_y = I_d\\) and \\(I_z = 2I_d\\).",
          "Substitution: \\(I_d = \\dfrac{0.5}{2} = 0.25\\) kg m², which is \\(\\tfrac{1}{4}MR^2\\).",
        ],
        answer: "0.25 kg m²",
      },
      selfCheckExample: {
        prompt: "A thin ring of mass 2 kg and radius 0.1 m. Find its moment of inertia about a diameter.",
        steps: ["\\(I_z = MR^2 = 2 \\times 0.01 = 0.02\\) kg m².", "\\(I_d = \\dfrac{I_z}{2} = 0.01\\) kg m²."],
        answer: "0.01 kg m²",
      },
      practiceSet: [
        { prompt: "Can the theorem of perpendicular axes be applied to a solid sphere?", answer: "No. It holds only for a plane lamina" },
        { prompt: "A square lamina has a moment of inertia of 0.2 kg m² about each of two perpendicular axes in its plane through its centre. Find its moment of inertia about the axis through the centre perpendicular to its plane.", answer: "0.4 kg m²" },
        { prompt: "What is the moment of inertia of a uniform disc about a diameter, in terms of M and R?", answer: "\\(\\tfrac{1}{4}MR^2\\)" },
      ],
      pyqExampleId: "72df68c2-2a08-4786-9830-7fe8a295f13e",
      traps: [
        {
          title: "Using it on a solid body",
          body: "A cylinder, a sphere or a cone is not a lamina, so the theorem of perpendicular axes does not apply to it.",
        },
        {
          title: "Axes that do not meet",
          body: "The two axes in the plane and the perpendicular axis must all pass through one point. Leave this out of the statement and it loses a mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscprd-diameter-tangent",
      name: "Using both theorems: diameter and tangent",
      intuition:
        "Start from the axis you know, the central axis. Use perpendicular axes to get the moment of inertia about a diameter, then parallel axes to slide the axis out to a tangent. Two steps, each with its own theorem.",
      definition:
        "- **Disc:** central axis \\(\\tfrac{1}{2}MR^2\\); diameter \\(\\tfrac{1}{4}MR^2\\); tangent in its plane \\(\\tfrac{1}{4}MR^2 + MR^2 = \\tfrac{5}{4}MR^2\\); tangent perpendicular to its plane \\(\\tfrac{1}{2}MR^2 + MR^2 = \\tfrac{3}{2}MR^2\\).\n" +
        "- **Ring:** central axis \\(MR^2\\); diameter \\(\\tfrac{1}{2}MR^2\\); tangent in its plane \\(\\tfrac{3}{2}MR^2\\); tangent perpendicular to its plane \\(2MR^2\\).\n" +
        "- **Solid sphere:** diameter \\(\\tfrac{2}{5}MR^2\\); tangent \\(\\tfrac{7}{5}MR^2\\), by parallel axes alone, since a sphere is not a lamina.\n" +
        "- A tangent in the plane is parallel to a diameter; a tangent perpendicular to the plane is parallel to the central axis. Name the theorem at each step: each step carries marks.",
      formula: {
        label: "Disc about a tangent in its plane",
        latex: "I_{tangent} = \\tfrac{1}{4}MR^2 + MR^2 = \\tfrac{5}{4}MR^2",
      },
      authoredExample: {
        prompt:
          "A uniform disc has a mass of 2 kg and a radius of 0.2 m. Find its moment of inertia about a tangent perpendicular to its plane.",
        steps: [
          "Given: \\(M = 2\\) kg, \\(R = 0.2\\) m, \\(R^2 = 0.04\\) m².",
          "This tangent is parallel to the central axis, at distance R. Formula (parallel axes): \\(I = I_c + MR^2\\), with \\(I_c = \\tfrac{1}{2}MR^2\\).",
          "Substitution: \\(I_c = \\tfrac{1}{2} \\times 2 \\times 0.04 = 0.04\\) kg m²; \\(MR^2 = 0.08\\) kg m².",
          "\\(I = 0.04 + 0.08 = 0.12\\) kg m².",
        ],
        answer: "0.12 kg m²",
      },
      selfCheckExample: {
        prompt: "A thin ring of mass 1 kg and radius 0.4 m. Find its moment of inertia about a tangent in its plane.",
        steps: [
          "Diameter (perpendicular axes): \\(\\tfrac{1}{2}MR^2 = 0.08\\) kg m².",
          "Tangent in the plane (parallel axes): \\(0.08 + 1 \\times 0.16 = 0.24\\) kg m².",
        ],
        answer: "0.24 kg m²",
      },
      practiceSet: [
        { prompt: "Find the moment of inertia of a solid sphere of mass 5 kg and radius 0.2 m about a tangent.", answer: "0.28 kg m²" },
        { prompt: "Which theorem gives a disc's moment of inertia about a diameter from that about its central axis?", answer: "The theorem of perpendicular axes" },
        { prompt: "What is the moment of inertia of a thin ring about a tangent perpendicular to its plane?", answer: "\\(2MR^2\\)" },
      ],
      pyqExampleId: "71f36389-74ec-4707-ab7c-80a989a85c60",
      traps: [
        {
          title: "Perpendicular axes on a sphere",
          body: "For the tangent to a sphere, use the theorem of parallel axes alone: \\(\\tfrac{2}{5}MR^2 + MR^2\\).",
        },
        {
          title: "Starting from the wrong axis",
          body: "A tangent in the plane must be reached from a diameter, and a tangent perpendicular to the plane from the central axis. Mixing them gives \\(\\tfrac{3}{2}MR^2\\) where \\(\\tfrac{5}{4}MR^2\\) is right for a disc.",
        },
      ],
    },
  ],
};
