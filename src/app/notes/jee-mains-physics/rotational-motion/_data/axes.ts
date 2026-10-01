import type { SubtopicNote } from "@/app/notes/_types";

export const AXES_ROT_NOTE: SubtopicNote = {
  subtopicName: "Parallel and Perpendicular Axes and Composite Bodies",
  title: "Parallel and Perpendicular Axes and Composite Bodies",
  oneLineDefinition:
    "The parallel-axis theorem moves an axis away from the centre of mass, I = I_cm + Md²; the perpendicular-axis theorem links three axes of a flat body; a system's moment of inertia is the sum of its parts about the same axis.",
  whyItMatters:
    "Twenty-nine PYQs, sixteen of them asking for a number, and seven from 2026: the largest page in the chapter. Twelve move one body's axis with the parallel- or perpendicular-axis theorem, often to a tangent. Seventeen add the moments of inertia of several parts, or subtract a piece that has been cut out.",
  concepts: [
    // C1 — the two axis theorems
    {
      kind: "formula" as const,
      slug: "jprot-parallel-axis",
      name: "Parallel-axis and perpendicular-axis theorems",
      intuition:
        "The standard table gives I about axes through the centre of mass. To use any other axis parallel to one of those, add Md²: the whole mass, moved a distance d, adds its own point-mass term. For a flat body, the moment of inertia about the axis normal to it equals the sum about two perpendicular axes lying in its plane.",
      definition:
        "- Parallel axis: \\(I = I_{cm} + Md^{2}\\), where d is the distance between the new axis and a PARALLEL axis through the centre of mass.\n" +
        "- In radii of gyration: \\(k^{2} = k_{cm}^{2} + d^{2}\\).\n" +
        "- Perpendicular axis, flat bodies only: \\(I_z = I_x + I_y\\), with x and y in the plane and z normal to it, all through one point. A disc: \\(I_{\\text{diameter}} = \\tfrac{1}{2}I_{\\text{normal}} = \\tfrac{1}{4}MR^{2}\\).\n" +
        "- Tangents: solid sphere \\(\\tfrac{7}{5}MR^{2}\\); hollow sphere \\(\\tfrac{5}{3}MR^{2}\\); disc, tangent in its plane \\(\\tfrac{5}{4}MR^{2}\\); disc, normal axis at the rim \\(\\tfrac{3}{2}MR^{2}\\); ring, tangent in its plane \\(\\tfrac{3}{2}MR^{2}\\); ring, normal axis at the rim \\(2MR^{2}\\).\n" +
        "- Square plate of side l about a normal axis through a corner: \\(\\tfrac{1}{6}Ml^{2} + M\\tfrac{l^{2}}{2} = \\tfrac{2}{3}Ml^{2}\\).",
      formula: {
        label: "Axis theorems",
        latex: "I = I_{cm} + Md^{2} \\qquad I_z = I_x + I_y \\qquad k^{2} = k_{cm}^{2} + d^{2}",
      },
      authoredExample: {
        prompt:
          "A uniform disc has mass 2 kg and radius 0.3 m. Find its moment of inertia about a tangent lying in its plane.",
        steps: [
          "About a diameter (through the centre, in the plane): \\(\\tfrac{1}{4}MR^{2} = \\tfrac{1}{4}(2)(0.09) = 0.045\\) kg m².",
          "The tangent is parallel to that diameter, a distance R away: add \\(MR^{2} = 2 \\times 0.09 = 0.18\\) kg m².",
          "\\(I = 0.045 + 0.18 = 0.225\\) kg m², which is \\(\\tfrac{5}{4}MR^{2}\\).",
        ],
        answer: "0.225 kg m²",
      },
      selfCheckExample: {
        prompt:
          "Find the radius of gyration of a thin rod 60 cm long about an axis normal to the rod, 10 cm from its centre.",
        steps: [
          "\\(k_{cm}^{2} = \\dfrac{L^{2}}{12} = \\dfrac{3600}{12} = 300\\) cm².",
          "\\(k^{2} = 300 + 10^{2} = 400\\) cm².",
        ],
        answer: "20 cm",
      },
      practiceSet: [
        { prompt: "Moment of inertia of a solid sphere about a tangent?", answer: "\\(\\tfrac{7}{5}MR^{2}\\)" },
        { prompt: "Moment of inertia of a thin ring about a tangent in its plane?", answer: "\\(\\tfrac{3}{2}MR^{2}\\)" },
        { prompt: "A disc has I = 0.5 kg m² about a diameter. Its I about the normal axis through the centre?", answer: "1.0 kg m²" },
        { prompt: "A square plate of side l and mass M: I about a normal axis through its centre?", answer: "\\(\\tfrac{1}{6}Ml^{2}\\)" },
      ],
      pyqExampleId: "0274e0dc-93bf-4c53-9a9f-152462b20c62", // 2026: solid sphere, axis 15 cm from the centre, k = √n
      traps: [
        {
          title: "The parallel-axis theorem starts at the centre of mass",
          body: "I = I_cm + Md² holds only when one of the two axes passes through the centre of mass. To move between two other axes, go back to the centre-of-mass axis first, then out again.",
        },
        {
          title: "The perpendicular-axis theorem is for flat bodies",
          body: "I_z = I_x + I_y works for a disc, a ring or a plate. It fails for a sphere or a cylinder: a sphere's three diameters all give 2MR²/5, not 4MR²/5 for one of them.",
        },
        {
          title: "A diameter given in place of a radius",
          body: "A ring 'of diameter r' has radius r/2. Its tangent in the plane gives (3/2)M(r/2)² = 3Mr²/8, not 3Mr²/2.",
        },
      ],
    },

    // C2 — composite bodies and cut-outs
    {
      kind: "formula" as const,
      slug: "jprot-composite",
      name: "Composite bodies and bodies with a piece removed",
      intuition:
        "Moments of inertia about the SAME axis simply add. So break a system into parts you know, find each part's I about the given axis (moving the axis with the parallel-axis theorem where needed), and add. A hole is a part with negative mass: take the full body and subtract the piece that is missing.",
      definition:
        "- \\(I_{\\text{system}} = \\sum I_{\\text{part}}\\), every part about the same axis.\n" +
        "- Point masses: \\(\\sum mr^{2}\\), with r the perpendicular distance from the axis. A mass on the axis adds nothing.\n" +
        "- Two spheres (m, R) on a light rod, centres a distance d from the axis: \\(2\\left(\\tfrac{2}{5}mR^{2} + md^{2}\\right)\\).\n" +
        "- A cylinder whose own axis is normal to the rotation axis, centre a distance d away: \\(M\\left(\\tfrac{R^{2}}{4} + \\tfrac{L^{2}}{12}\\right) + Md^{2}\\).\n" +
        "- A cut-out: \\(I_{\\text{rest}} = I_{\\text{full}} - \\left(I_{\\text{hole, own centre}} + m_{\\text{hole}}d^{2}\\right)\\), with the hole's mass in proportion to its area.\n" +
        "- A disc with a hole of radius R/2 touching its rim: \\(\\tfrac{1}{2}MR^{2} - \\left[\\tfrac{1}{2}\\tfrac{M}{4}\\tfrac{R^{2}}{4} + \\tfrac{M}{4}\\tfrac{R^{2}}{4}\\right] = \\tfrac{13}{32}MR^{2}\\).",
      formula: {
        label: "Adding parts and removing a hole",
        latex:
          "I_{\\text{system}} = \\sum I_{\\text{part}} \\qquad I_{\\text{rest}} = I_{\\text{full}} - \\left(I_{\\text{hole}} + m_{\\text{hole}}d^{2}\\right)",
      },
      authoredExample: {
        prompt:
          "Four particles of 2 kg each sit at the corners of a square of side 1 m. Find the moment of inertia (a) about an axis through the centre, normal to the square, and (b) about one diagonal.",
        steps: [
          "(a) Each particle is half a diagonal from the centre: \\(r^{2} = \\left(\\tfrac{\\sqrt{2}}{2}\\right)^{2} = 0.5\\) m². \\(I = 4 \\times 2 \\times 0.5 = 4\\) kg m².",
          "(b) Two particles lie on the diagonal and add nothing. The other two are 0.5 m² away in \\(r^{2}\\): \\(I = 2 \\times 2 \\times 0.5 = 2\\) kg m².",
          "Check with the perpendicular-axis theorem: the two diagonals give \\(2 + 2 = 4\\), the normal-axis value.",
        ],
        answer: "(a) 4 kg m²; (b) 2 kg m²",
      },
      selfCheckExample: {
        prompt:
          "A uniform disc of mass 9 kg and radius 0.3 m has a circular piece of radius 0.1 m cut out, centred 0.2 m from the disc's centre. Find the moment of inertia of the rest about the normal axis through the disc's original centre.",
        steps: [
          "The hole has \\((0.1/0.3)^{2} = \\tfrac{1}{9}\\) of the area, so mass 1 kg.",
          "\\(I_{\\text{full}} = \\tfrac{1}{2}(9)(0.09) = 0.405\\) kg m².",
          "\\(I_{\\text{hole}} = \\tfrac{1}{2}(1)(0.01) + 1 \\times 0.2^{2} = 0.005 + 0.04 = 0.045\\) kg m².",
          "\\(I_{\\text{rest}} = 0.405 - 0.045 = 0.36\\) kg m².",
        ],
        answer: "0.36 kg m²",
      },
      practiceSet: [
        { prompt: "Two spheres, each of mass m and radius r, sit on a light rod with their centres a distance d either side of the axis (normal to the rod). Total I?", answer: "\\(2\\left(\\tfrac{2}{5}mr^{2} + md^{2}\\right)\\)" },
        { prompt: "Three particles of mass m sit at the corners of an equilateral triangle of side a. I about one side?", answer: "\\(\\tfrac{3}{4}ma^{2}\\)", method: "Only the opposite vertex counts, at height \\(\\tfrac{\\sqrt{3}}{2}a\\)." },
        { prompt: "A rod (M, L) carries a point mass m at each end. I about the normal axis through its centre?", answer: "\\(\\tfrac{1}{12}ML^{2} + \\tfrac{1}{2}mL^{2}\\)" },
        { prompt: "A disc (M, R) has a hole of radius R/2 whose edge touches the rim. I of the rest about the normal axis through the centre?", answer: "\\(\\tfrac{13}{32}MR^{2}\\)" },
      ],
      pyqExampleId: "a5d32f39-03b8-4be3-9e4c-c4d87325d967", // 2026: square loop of four cylinders, axis through mid-points of opposite sides
      traps: [
        {
          title: "Parts about different axes",
          body: "Each part's I must be about the system's axis before they are added. Adding each sphere's 2mR²/5 about its own centre leaves out the md² that usually dominates.",
        },
        {
          title: "The removed piece has its own moment of inertia",
          body: "Subtracting only m_hole·d² treats the hole as a point. Its own (1/2)m_hole·r² about its centre must go too.",
        },
        {
          title: "Distance from the axis, not from the origin",
          body: "For a point mass, r is the perpendicular distance to the axis. A mass on the axis contributes nothing, however far it is from the origin.",
        },
      ],
    },
  ],
};
