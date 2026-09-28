import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M3_SPHERES_NOTE: SubtopicNote = {
  subtopicName: "Spheres, Hemispheres and Shells",
  title: "Spheres, Hemispheres & Shells",
  oneLineDefinition:
    "Volume and surface of a sphere and a hemisphere, hollow shells and their mass, and the circle in which a plane cuts a sphere.",
  whyItMatters:
    "A small page with two formulas to learn and two ideas to use: a shell is the outer sphere minus the inner one, and a plane cutting a sphere gives a right triangle between the centre, the cut and the rim.",
  concepts: [
    // C1 — sphere and hemisphere
    {
      kind: "formula" as const,
      slug: "cdsm3-sphere-basics",
      name: "Sphere and hemisphere",
      intuition:
        "A sphere's surface is four times the area of its great circle; its volume is a third of the radius times the surface. A hemisphere has half the volume, but its total surface adds the flat circle.",
      definition:
        "- Sphere: \\(V = \\dfrac43\\pi r^3\\), \\(S = 4\\pi r^2\\).\n" +
        "- Hemisphere: \\(V = \\dfrac23\\pi r^3\\); curved surface \\(2\\pi r^2\\); total \\(3\\pi r^2\\).\n" +
        "- Numerically equal surface and volume: \\(4\\pi r^2 = \\dfrac43\\pi r^3\\) gives \\(r = 3\\).\n" +
        "- A sphere cut into \\(n\\) equal wedges by planes through one diameter: each wedge has \\(\\dfrac1n\\) of the curved surface plus two flat semicircles.",
      formula: {
        label: "Sphere and hemisphere",
        latex: "V_{\\text{sphere}} = \\tfrac43\\pi r^3, \\quad S = 4\\pi r^2, \\quad V_{\\text{hemi}} = \\tfrac23\\pi r^3",
      },
      authoredExample: {
        prompt: "Find the total surface area of a solid hemisphere of radius \\(7\\) cm. \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "Total \\(= 2\\pi r^2 + \\pi r^2 = 3\\pi r^2\\).",
          "\\(3\\times\\dfrac{22}{7}\\times 49 = 462\\) cm\\(^2\\).",
        ],
        answer: "\\(462\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "A sphere of radius \\(r\\) is cut into four equal wedges by two perpendicular planes through a diameter. Find the surface area of one wedge.",
        steps: [
          "Curved part: \\(\\dfrac14\\times 4\\pi r^2 = \\pi r^2\\).",
          "Two flat semicircles: \\(2\\times\\dfrac{\\pi r^2}{2} = \\pi r^2\\).",
          "Total \\(= 2\\pi r^2\\).",
        ],
        answer: "\\(2\\pi r^2\\).",
      },
      practiceSet: [
        { prompt: "Sphere of radius \\(6\\): volume?", answer: "\\(288\\pi\\)" },
        { prompt: "Sphere of diameter \\(14\\): surface? \\((\\pi = \\tfrac{22}{7})\\)", answer: "\\(616\\)" },
        { prompt: "Hemisphere of radius \\(21\\): volume? \\((\\pi = \\tfrac{22}{7})\\)", answer: "\\(19404\\)" },
        { prompt: "Surface and volume numerically equal: radius?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "550ab222-0f2e-4c1c-b9ec-a2d4e419ab64", // 2019 (I) — hemisphere of volume 155232
    },

    // C2 — hollow shells
    {
      kind: "formula" as const,
      slug: "cdsm3-hollow-shell",
      name: "Hollow shells and their mass",
      intuition:
        "A shell is the outer sphere with the inner sphere removed. Its metal is \\(\\dfrac43\\pi(R^3 - r^3)\\); multiply by the density for the mass.",
      definition:
        "- Shell volume \\(= \\dfrac43\\pi(R^3 - r^3)\\), with \\(R\\) the outer and \\(r\\) the inner radius.\n" +
        "- Mass \\(= \\) volume \\(\\times\\) density. In g/cm\\(^3\\), the volume must be in cm\\(^3\\).\n" +
        "- Given diameters, halve them first.",
      formula: {
        label: "Spherical shell",
        latex: "V = \\tfrac43\\pi(R^3 - r^3)",
      },
      authoredExample: {
        prompt: "A hollow shell has inner radius \\(4\\) cm and outer radius \\(5\\) cm, made of metal of density \\(3\\) g/cm\\(^3\\). Find its mass. \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "\\(R^3 - r^3 = 125 - 64 = 61\\).",
          "Volume \\(= \\dfrac43\\times\\dfrac{22}{7}\\times 61 = \\dfrac{5368}{21} \\approx 255.6\\) cm\\(^3\\).",
          "Mass \\(\\approx 3\\times 255.6 = 766.9\\) g.",
        ],
        answer: "about \\(767\\) g.",
      },
      selfCheckExample: {
        prompt: "A shell has outer diameter \\(10\\) cm and inner diameter \\(8\\) cm. Find the volume of metal in terms of \\(\\pi\\).",
        steps: [
          "Radii \\(5\\) and \\(4\\): \\(R^3 - r^3 = 61\\).",
          "\\(V = \\dfrac{244\\pi}{3}\\) cm\\(^3\\).",
        ],
        answer: "\\(\\dfrac{244\\pi}{3}\\) cm\\(^3\\).",
      },
      practiceSet: [
        { prompt: "\\(R = 2\\), \\(r = 1\\): shell volume?", answer: "\\(\\dfrac{28\\pi}{3}\\)" },
        { prompt: "\\(R = 3\\), \\(r = 2\\): \\(R^3 - r^3\\)?", answer: "\\(19\\)" },
        { prompt: "Volume \\(50\\) cm\\(^3\\), density \\(8\\) g/cm\\(^3\\): mass?", answer: "\\(400\\) g" },
        { prompt: "\\(1\\) m\\(^3\\) in cm\\(^3\\)?", answer: "\\(10^6\\)" },
      ],
      pyqExampleId: "9d6b7b90-d6c3-4763-9546-e9c5c862b474", // 2021 (II) — shell of radii 3 and 6, density 7
    },

    // C3 — a cap cut from a sphere
    {
      kind: "formula" as const,
      slug: "cdsm3-sphere-cap",
      name: "A plane cutting a sphere",
      intuition:
        "A flat cut through a sphere is a circle. Its radius, its distance from the centre and the sphere's radius form a right triangle. Bowls, pots and water levels in a spherical vessel all use this one triangle.",
      definition:
        "- A plane at distance \\(d\\) from the centre of a sphere of radius \\(R\\) cuts a circle of radius \\(\\rho = \\sqrt{R^2 - d^2}\\).\n" +
        "- A bowl filled to depth \\(t\\): the water surface is \\(R - t\\) from the centre.\n" +
        "- A pot of height \\(H\\) cut from a sphere of radius \\(R\\) (with \\(H > R\\)): the cut is \\(H - R\\) above the centre.",
      formula: {
        label: "Circle of a cut",
        latex: "\\rho^2 + d^2 = R^2",
      },
      authoredExample: {
        prompt: "A spherical bowl of radius \\(13\\) cm holds water to a depth of \\(8\\) cm. Find the radius of the water surface.",
        steps: [
          "The surface is \\(13 - 8 = 5\\) cm from the centre.",
          "\\(\\rho = \\sqrt{169 - 25} = 12\\) cm.",
        ],
        answer: "\\(12\\) cm.",
      },
      selfCheckExample: {
        prompt: "Water in a spherical bowl stands \\(d\\) deep and its surface is a circle of radius \\(3d\\). Find the bowl's radius.",
        steps: [
          "\\((3d)^2 + (R - d)^2 = R^2\\), so \\(10d^2 - 2Rd = 0\\).",
          "\\(R = 5d\\).",
        ],
        answer: "\\(5d\\).",
      },
      practiceSet: [
        { prompt: "\\(R = 10\\), cut \\(6\\) from the centre: circle radius?", answer: "\\(8\\)" },
        { prompt: "\\(R = 5\\), circle radius \\(3\\): distance from centre?", answer: "\\(4\\)" },
        { prompt: "Pot of height \\(15\\) from a sphere of radius \\(10\\): cut above the centre by?", answer: "\\(5\\)" },
        { prompt: "Cut through the centre: circle radius?", answer: "\\(R\\)" },
      ],
      pyqExampleId: "7742e022-20ad-48e9-b23d-a74b8c120ed4", // 2025 (I) — pot of height 30 from a sphere of radius 20
    },
  ],
};
