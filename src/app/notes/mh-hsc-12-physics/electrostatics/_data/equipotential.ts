import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_ES_EQUIPOTENTIAL_NOTE: SubtopicNote = {
  subtopicName: "Equipotential Surfaces",
  title: "Equipotential Surfaces and Their Properties",
  oneLineDefinition:
    "Surfaces on which the potential is the same everywhere: why no work is done along them, why the field always meets them at right angles, and their shapes for common charges.",
  whyItMatters:
    "1 question, from the textbook: find the direction of the field and the torque on a dipole when the equipotential surfaces are planes. No board paper in this bank has set this section, but its properties are short answers that are easy to learn and easy to lose marks on.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpes-equipotential",
      name: "Equipotential surfaces and the electric field",
      intuition:
        "Think of the contour lines on a hill map: walk along one and your height does not change. An equipotential surface is a contour of potential. Moving a charge along it takes no work, so the field can have no part along the surface: it must cross the surface at right angles, pointing from higher to lower potential.",
      definition:
        "- **Equipotential surface:** a surface at every point of which the electric potential is the same.\n" +
        "- **No work along it:** for P and Q on the surface, \\(V_P = V_Q\\), so \\(W_{QP} = q_0(V_P - V_Q) = 0\\).\n" +
        "- **Field is normal to it:** for a small step dx along the surface, \\(dW = E\\,dx\\cos\\theta = 0\\), so \\(\\cos\\theta = 0\\) and \\(\\theta = 90°\\). If the field had a part along the surface, work would be needed to move a charge along it.\n" +
        "- **Two equipotential surfaces never intersect:** at the crossing point the field would have two directions, which is impossible.\n" +
        "- Like lines of force, equipotential surfaces show both the direction and the strength of the field: they crowd together where the field is strong.\n" +
        "- **Shapes:** point charge: concentric spheres centred on the charge. Line charge: coaxial cylinders. Uniform field: parallel planes at right angles to the field. Dipole: the equatorial plane is the zero-potential surface.",
      formula: {
        label: "Work along an equipotential surface",
        latex: "W_{QP} = q_0(V_P - V_Q) = 0 \\quad \\text{when } V_P = V_Q",
      },
      authoredExample: {
        prompt:
          "A charge of 5 µC is first carried 20 cm along an equipotential surface at 300 V, and then moved to a second equipotential surface at 500 V. Find the work done in each part.",
        steps: [
          "Given: \\(q_0 = 5 \\times 10^{-6}\\) C; first surface 300 V, second 500 V.",
          "Formula: \\(W = q_0 (V_{\\text{final}} - V_{\\text{initial}})\\).",
          "Along the 300 V surface the potential does not change, so W = 0, whatever the distance moved.",
          "To the 500 V surface: \\(W = 5 \\times 10^{-6} \\times (500 - 300) = 1 \\times 10^{-3}\\) J.",
        ],
        answer: "Zero along the surface; 1 × 10⁻³ J to reach the 500 V surface",
      },
      selfCheckExample: {
        prompt: "Why can two equipotential surfaces never cut each other?",
        steps: [
          "The field at a point is normal to the equipotential surface through that point.",
          "At a crossing point there would be two surfaces, hence two normal directions, so the field would have two directions at one point, which is impossible.",
        ],
        answer: "Because the field at the crossing point would have two directions",
      },
      practiceSet: [
        { prompt: "How much work is done in moving a charge of 2 µC through 50 cm along an equipotential surface?", answer: "Zero" },
        { prompt: "What is the angle between the electric field and an equipotential surface?", answer: "90°" },
        { prompt: "What is the shape of the equipotential surfaces of a single point charge?", answer: "Concentric spheres centred on the charge" },
        { prompt: "In a uniform field of 200 V/m, how far apart are two equipotential planes that differ by 10 V?", answer: "5 cm (0.05 m)" },
      ],
      pyqExampleId: "9305d125-f58f-423a-a8f6-f385b1d33487",
      traps: [
        {
          title: "Spheres for a line charge",
          body: "Only a point charge has spherical equipotentials. A long line charge has coaxial cylinders, and a uniform field has flat planes at right angles to the field.",
        },
        {
          title: "Drawing the field along the surface",
          body: "Field lines must meet every equipotential surface at 90°, pointing from the higher-potential surface to the lower one. A diagram with lines running along a surface loses the mark.",
        },
        {
          title: "A property without its reason",
          body: "When asked why surfaces cannot intersect or why the field is normal, the reason earns the mark: give the \\(dW = E\\,dx\\cos\\theta = 0\\) argument, or the two-directions argument.",
        },
      ],
    },
  ],
};
