import type { SubtopicNote } from "@/app/notes/_types";

export const AXIS_THEOREMS_NOTE: SubtopicNote = {
  subtopicName: "Parallel and Perpendicular Axis Theorems",
  title: "Parallel and Perpendicular Axis Theorems",
  oneLineDefinition:
    "Two theorems carry a known moment of inertia to a new axis: shift it parallel by d and add Md²; for a flat body, the axis perpendicular to the plane has the sum of the two in-plane ones.",
  whyItMatters:
    "25 PYQs, twelve HARD — the HARDEST page in the chapter. Two in three of the HARD ones are a composite body (seven discs, a square of rods, spheres on a rod, a disc with a hole) " +
    "added up piece by piece with the parallel-axis theorem. Two further questions ask where a centre of mass lies.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-parallel-axis",
      name: "The Parallel-Axis Theorem",
      intuition:
        "The centre of mass is the axis of least resistance. Move the axis a distance d away, parallel to itself, and every bit of mass is on average d further out — the moment of inertia grows by exactly Md². The theorem only works FROM the centre-of-mass axis.",
      definition:
        "- \\(I = I_{\\text{cm}} + Md^2\\), \\(d\\) measured from the centre of mass.\n" +
        "- Rod about an end: \\(\\dfrac{ML^2}{12} + M\\left(\\dfrac{L}{2}\\right)^2 = \\dfrac{ML^2}{3}\\).\n" +
        "- Disc, perpendicular axis through the rim: \\(\\dfrac{3}{2}MR^2\\); tangent in its plane: \\(\\dfrac{5}{4}MR^2\\).\n" +
        "- Ring, tangent in its plane: \\(\\dfrac{3}{2}MR^2\\); solid sphere, tangent: \\(\\dfrac{7}{5}MR^2\\).\n" +
        "- Square plate, perpendicular axis at a corner: \\(\\dfrac{Ma^2}{6} + M\\dfrac{a^2}{2} = \\dfrac{2}{3}Ma^2\\).\n" +
        "- The largest I for a family of parallel axes is at the point FURTHEST from the centre of mass.",
      formula: {
        label: "Parallel-axis theorem",
        latex: "I = I_{\\text{cm}} + Md^2",
      },
      authoredExample: {
        prompt: "A disc of mass M and radius R. Moment of inertia about a perpendicular axis through a point halfway from the centre to the rim?",
        steps: ["\\(I = \\dfrac{MR^2}{2} + M\\left(\\dfrac{R}{2}\\right)^2 = \\dfrac{3}{4}MR^2\\)."],
        answer: "\\(\\dfrac{3}{4}MR^2\\)",
      },
      selfCheckExample: {
        prompt: "Moment of inertia of a solid sphere about a tangent, in terms of its I about a diameter?",
        steps: ["\\(I_{\\tan} = I + MR^2 = I + \\dfrac{5}{2}I\\)."],
        answer: "3.5 I",
      },
      practiceSet: [
        { prompt: "Ring about a tangent in its plane?", answer: "\\(\\dfrac{3}{2}MR^2\\)" },
        { prompt: "Disc about a diameter: ratio to a ring about a tangent in its plane (same M, R)?", answer: "1 : 6" },
        { prompt: "Sphere (2/5 MR²) recast into a disc whose I about its rim is the same. Disc radius?", answer: "\\(\\dfrac{2R}{\\sqrt{15}}\\)" },
      ],
      pyqExampleId: "482c1aa7-fd53-429b-9ffa-3a4b4b21adde",
      traps: [
        {
          title: "Shifting from an axis that is not through the centre of mass",
          body:
            "From an edge to a point midway you cannot add \\(M(\\frac{R}{2})^2\\). Go back to the centre-of-mass axis first, then out to the new one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-perpendicular-axis",
      name: "The Perpendicular-Axis Theorem",
      intuition:
        "For a flat body, the distance of a point from the axis perpendicular to the plane satisfies r² = x² + y², so its moment of inertia is the sum of those about two perpendicular axes lying in the plane and crossing it. It is how a disc's diameter value, MR²/4, comes from its axis value MR²/2.",
      definition:
        "- Plane lamina only: \\(I_z = I_x + I_y\\), with \\(x\\) and \\(y\\) in the plane, meeting on the \\(z\\) axis.\n" +
        "- Ring: \\(I_z = MR^2\\) ⇒ diameter \\(\\dfrac{MR^2}{2}\\). Disc: \\(\\dfrac{MR^2}{2}\\) ⇒ diameter \\(\\dfrac{MR^2}{4}\\).\n" +
        "- Square plate: by symmetry every in-plane axis through the centre has the same I, so \\(I_z = 2I_{\\text{in-plane}}\\) — diagonal and midline alike.\n" +
        "- Rods along x, y and z from the origin, each \\(\\dfrac{ML^2}{3}\\) about an end: about the z axis only the x and y rods count.",
      formula: {
        label: "Perpendicular-axis theorem (lamina)",
        latex: "I_z = I_x + I_y",
      },
      authoredExample: {
        prompt: "A square plate has \\(I = \\dfrac{Ma^2}{6}\\) about the perpendicular axis through its centre. About a diagonal?",
        steps: ["Both diagonals are in-plane axes through the centre, equal by symmetry: \\(2I_d = \\dfrac{Ma^2}{6}\\)."],
        answer: "\\(\\dfrac{Ma^2}{12}\\)",
      },
      selfCheckExample: {
        prompt: "A ring has I about its axis. Moment of inertia about a diameter?",
        steps: ["\\(I = I_d + I_d\\)."],
        answer: "\\(\\dfrac{I}{2}\\)",
      },
      practiceSet: [
        { prompt: "Three rods (mass M, length L) along x, y, z from the origin. I about the z axis?", answer: "\\(\\dfrac{2ML^2}{3}\\)" },
        { prompt: "Does the perpendicular-axis theorem apply to a solid sphere?", answer: "No — only to plane bodies" },
      ],
      pyqExampleId: "da8727f1-fa5c-4c89-acfb-8564503e37a7",
      traps: [
        {
          title: "Using it on a three-dimensional body",
          body:
            "\\(I_z = I_x + I_y\\) needs every bit of mass to lie in the x–y plane. For a sphere or a cylinder it gives nonsense; use the standard results instead.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-composite-bodies",
      name: "Composite Bodies: Add the Parts, Subtract the Holes",
      intuition:
        "Moments of inertia about the SAME axis simply add. Break the body into pieces whose own I you know, shift each to the common axis with Md², and add. A hole is a piece with negative mass: compute the whole, then subtract the part cut away.",
      definition:
        "- Four rods welded into a square, axis through its centre: each \\(\\dfrac{ML^2}{12} + M\\left(\\dfrac{L}{2}\\right)^2 = \\dfrac{ML^2}{3}\\); total \\(\\dfrac{4ML^2}{3}\\).\n" +
        "- Seven touching discs in a hexagon: centre \\(\\dfrac{MR^2}{2}\\), each outer one \\(\\dfrac{MR^2}{2} + M(2R)^2\\); total \\(\\dfrac{55}{2}MR^2\\).\n" +
        "- Disc with a hole of diameter \\(R\\) touching the centre: removed mass \\(\\dfrac{M}{4}\\), its I about the centre \\(\\dfrac{3}{32}MR^2\\); left \\(\\dfrac{13}{32}MR^2\\).\n" +
        "- Spheres in a row, axis through one centre: each adds \\(\\dfrac{2}{5}MR^2 + Md^2\\), \\(d\\) = its centre's distance.\n" +
        "- Point masses: just \\(\\sum mr^2\\) — three at an equilateral triangle's vertices, axis through one vertex parallel to the opposite side: \\(2m\\left(\\dfrac{\\sqrt{3}}{2}L\\right)^2 = \\dfrac{3}{2}mL^2\\).",
      formula: {
        label: "Adding about one axis",
        latex: "I = \\sum_{\\text{parts}} \\left(I_{\\text{cm},i} + m_i d_i^2\\right) \\;-\\; I_{\\text{removed}}",
      },
      authoredExample: {
        prompt: "A disc (mass M, radius R) carries a small particle of mass m on its rim. I about the disc's axis?",
        steps: ["Disc \\(\\dfrac{MR^2}{2}\\), particle \\(mR^2\\); they add."],
        answer: "\\(\\left(\\dfrac{M}{2} + m\\right)R^2\\)",
      },
      selfCheckExample: {
        prompt: "Two solid spheres (mass M, radius R) have centres 5R apart. I about an axis through one centre, perpendicular to the line joining them?",
        steps: ["\\(\\dfrac{2}{5}MR^2 + \\dfrac{2}{5}MR^2 + M(5R)^2 = \\dfrac{129}{5}MR^2\\)."],
        answer: "\\(\\dfrac{129}{5}MR^2\\)",
      },
      practiceSet: [
        { prompt: "Letter H of three rods (mass M, length l), axis along one side?", answer: "\\(\\dfrac{4Ml^2}{3}\\)" },
        { prompt: "Four equal spheres touch in a row. Is the whole set's I larger about a perpendicular axis through an END sphere's centre or a MIDDLE one's?", answer: "An end one" },
      ],
      pyqExampleId: "298f37c7-466a-45e6-b025-33e678848ce9",
      traps: [
        {
          title: "Forgetting a sphere's own moment of inertia",
          body:
            "A sphere on the axis still has \\(\\frac{2}{5}MR^2\\) about it; a sphere off the axis has that PLUS \\(Md^2\\). Treating either as a point mass drops a term and misses every option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-centre-of-mass",
      name: "Where the Centre of Mass Lies",
      intuition:
        "The centre of mass is the mass-weighted average position. It sits closer to the heavier body, and for equal masses arranged symmetrically it sits at the centre of the symmetry.",
      definition:
        "- \\(x_{\\text{cm}} = \\dfrac{m_1x_1 + m_2x_2 + \\cdots}{m_1 + m_2 + \\cdots}\\).\n" +
        "- Two masses a distance \\(d\\) apart: \\(\\dfrac{m_2}{m_1 + m_2}d\\) from \\(m_1\\).\n" +
        "- Equal masses at the vertices of an equilateral triangle: at the centroid, where the medians meet.",
      formula: {
        label: "Centre of mass",
        latex: "x_{\\text{cm}} = \\frac{\\sum m_ix_i}{\\sum m_i}",
      },
      authoredExample: {
        prompt: "3 kg at x = 0 and 1 kg at x = 8 m. Centre of mass?",
        steps: ["\\(x = \\dfrac{3 \\times 0 + 1 \\times 8}{4} = 2\\) m."],
        answer: "2 m from the 3 kg mass",
      },
      selfCheckExample: {
        prompt: "Three identical balls with centres at the corners of an equilateral triangle. Where is their centre of mass?",
        steps: ["Equal masses, symmetric arrangement."],
        answer: "At the centroid (intersection of the medians)",
      },
      practiceSet: [
        { prompt: "1 kg and 4 kg are 10 m apart. Centre of mass from the 1 kg?", answer: "8 m" },
      ],
      pyqExampleId: "035dc6fc-2a95-4675-8805-284426e243d6",
      traps: [
        {
          title: "Measuring from the wrong end",
          body:
            "The centre of mass is nearer the HEAVIER mass. 2 kg and 4 kg on a 9 m bar: 6 m from the 2 kg, which is 3 m from the 4 kg — the options offer both ends.",
        },
      ],
    },
  ],
  related: [
    { label: "Moment of Inertia and Radius of Gyration — the standard results", href: "/notes/mht-cet-physics/rotational-dynamics/cetp-moment-of-inertia" },
    { label: "Angular Momentum and Torque", href: "/notes/mht-cet-physics/rotational-dynamics/cetp-angular-momentum" },
  ],
};
