import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M3_SCALING_NOTE: SubtopicNote = {
  subtopicName: "Scaling and Comparing Solids",
  title: "Scaling & Comparing Solids",
  oneLineDefinition:
    "How volume and surface change when a solid is scaled, how the ratio of two cones or cylinders follows from their radii and heights, and what equal volume or equal surface forces.",
  whyItMatters:
    "Easy marks when the rule is clear, and the most common source of wrong answers when it is not. A third of the page is HARD, all of it in the equal-surface and equal-volume comparisons.",
  concepts: [
    // C1 — similar solids
    {
      kind: "formula" as const,
      slug: "cdsm3-similar-solids",
      name: "Similar solids: lengths, squares, cubes",
      intuition:
        "Scale every length of a solid by \\(k\\): surfaces grow by \\(k^2\\), volumes by \\(k^3\\). Go the other way with roots — a volume ratio needs a cube root to become a length ratio.",
      definition:
        "- Lengths \\(\\times k\\) ⇒ surface \\(\\times k^2\\), volume \\(\\times k^3\\).\n" +
        "- Surface ratio \\(a : b\\) ⇒ length ratio \\(\\sqrt a : \\sqrt b\\) ⇒ volume ratio \\(a^{3/2} : b^{3/2}\\).\n" +
        "- A \\(p\\%\\) increase in surface ⇒ lengths \\(\\times\\sqrt{1 + \\tfrac{p}{100}}\\).\n" +
        "- Different stretches on each edge (cuboid): multiply the factors.",
      formula: {
        label: "Scale factor k",
        latex: "\\frac{S_1}{S_2} = k^2, \\qquad \\frac{V_1}{V_2} = k^3",
      },
      authoredExample: {
        prompt: "The volume of a sphere is increased by \\(237.5\\%\\). By what percentage does its surface area increase?",
        steps: [
          "The new volume is \\(3.375 = 1.5^3\\) times the old, so the radius is \\(\\times 1.5\\).",
          "Surface \\(\\times 1.5^2 = 2.25\\): an increase of \\(125\\%\\).",
        ],
        answer: "\\(125\\%\\).",
      },
      selfCheckExample: {
        prompt: "Two spheres have surface areas in the ratio \\(9 : 16\\). Find the ratio of their volumes.",
        steps: [
          "Radii \\(3 : 4\\).",
          "Volumes \\(27 : 64\\).",
        ],
        answer: "\\(27 : 64\\).",
      },
      practiceSet: [
        { prompt: "Radius doubled: volume multiplied by?", answer: "\\(8\\)" },
        { prompt: "Surface reduced to \\(\\tfrac14\\): radius becomes?", answer: "\\(\\tfrac12\\)" },
        { prompt: "Edges up \\(10\\%\\), \\(10\\%\\), \\(10\\%\\): volume up by?", answer: "\\(33.1\\%\\)" },
        { prompt: "Surface up \\(44\\%\\): edge up by?", answer: "\\(20\\%\\)" },
      ],
      pyqExampleId: "caa10210-19a8-4b84-a123-a4dbc413d2be", // 2019 (II) — balloon volume up 700%
      traps: [
        {
          title: "An increase of p% is a factor of 1 + p/100",
          body:
            "\\(300\\%\\) more is \\(4\\) times, not \\(3\\). Convert the percentage to a factor before taking roots.",
        },
      ],
    },

    // C2 — ratios of cones and cylinders
    {
      kind: "formula" as const,
      slug: "cdsm3-ratio-r2h",
      name: "Ratios of cones and cylinders",
      intuition:
        "For both cones and cylinders the volume is a constant times \\(r^2h\\). So a ratio question never needs \\(\\pi\\) or the \\(\\dfrac13\\): compare \\(r^2h\\) directly.",
      definition:
        "- \\(\\dfrac{V_1}{V_2} = \\dfrac{r_1^2 h_1}{r_2^2 h_2}\\) for two cones, or two cylinders.\n" +
        "- Equal volumes: \\(\\dfrac{r_1^2}{r_2^2} = \\dfrac{h_2}{h_1}\\).\n" +
        "- Radius up \\(p\\%\\) at the same height: volume up \\(\\left(1 + \\tfrac{p}{100}\\right)^2 - 1\\), i.e. \\(p\\left(2 + \\tfrac{p}{100}\\right)\\%\\).",
      formula: {
        label: "Cones or cylinders",
        latex: "\\frac{V_1}{V_2} = \\frac{r_1^2 h_1}{r_2^2 h_2}",
      },
      authoredExample: {
        prompt: "Two cylinders have radii in the ratio \\(2 : 3\\) and heights in the ratio \\(5 : 4\\). Find the ratio of their volumes.",
        steps: [
          "\\(\\dfrac{4\\times 5}{9\\times 4} = \\dfrac{20}{36}\\).",
          "Ratio \\(5 : 9\\).",
        ],
        answer: "\\(5 : 9\\).",
      },
      selfCheckExample: {
        prompt: "Two cones have equal volumes and their radii are in the ratio \\(1 : 2\\). Find the ratio of their heights.",
        steps: [
          "\\(r_1^2h_1 = r_2^2h_2\\): \\(1\\cdot h_1 = 4h_2\\).",
          "Heights \\(4 : 1\\).",
        ],
        answer: "\\(4 : 1\\).",
      },
      practiceSet: [
        { prompt: "Cones, radii \\(2 : 1\\), heights \\(1 : 2\\): volumes?", answer: "\\(2 : 1\\)" },
        { prompt: "Radius up \\(10\\%\\), same height: volume up by?", answer: "\\(21\\%\\)" },
        { prompt: "Cylinders of equal volume, heights \\(1 : 4\\): radii?", answer: "\\(2 : 1\\)" },
        { prompt: "Volumes \\(1 : 2\\), radii \\(1 : 1\\): heights?", answer: "\\(1 : 2\\)" },
      ],
      pyqExampleId: "69a1d6ca-5698-4e1c-b624-a648163e553c", // 2020 (II) — cones, volumes 1 : 4, diameters 4 : 5
    },

    // C3 — equal volume or equal surface
    {
      kind: "formula" as const,
      slug: "cdsm3-equal-volume-surface",
      name: "Equal volume or equal surface",
      intuition:
        "Set the two expressions equal and read off the relation. The facts worth knowing by heart: a cone and a hemisphere on the same base have equal volume when the cone is twice as tall; for a given surface the sphere holds the most.",
      definition:
        "- Cone and hemisphere, same base, equal volume: \\(h = 2r\\).\n" +
        "- Cone, hemisphere and cylinder of radius and height \\(r\\): volumes \\(1 : 2 : 3\\).\n" +
        "- Cube and sphere with equal surface: the sphere has the larger volume; \\(x^2 : y^2 = \\pi : 6\\) for cube : sphere volumes.\n" +
        "- A cuboid recast into a cube has LESS surface: the cube minimises surface among cuboids of a given volume.",
      formula: {
        label: "Cone : hemisphere : cylinder (radius r, height r)",
        latex: "\\tfrac13\\pi r^3 : \\tfrac23\\pi r^3 : \\pi r^3 = 1 : 2 : 3",
      },
      authoredExample: {
        prompt: "A cone, a hemisphere and a cylinder stand on equal bases of radius \\(r\\) with equal heights. Their total volume equals that of a sphere of radius \\(R\\). Find \\(R\\) in terms of \\(r\\).",
        steps: [
          "The hemisphere's height is \\(r\\), so all three have height \\(r\\): total \\(\\dfrac13 + \\dfrac23 + 1 = 2\\) units of \\(\\pi r^3\\).",
          "\\(\\dfrac43\\pi R^3 = 2\\pi r^3\\), so \\(R^3 = 1.5r^3\\) and \\(R = r\\sqrt[3]{1.5}\\).",
        ],
        answer: "\\(R = r\\sqrt[3]{1.5}\\).",
      },
      selfCheckExample: {
        prompt: "A cube and a sphere have the same surface area \\(S\\). Which has the larger volume?",
        steps: [
          "Cube: \\(a = \\sqrt{S/6}\\), \\(V = (S/6)^{3/2} \\approx 0.068S^{3/2}\\).",
          "Sphere: \\(r = \\sqrt{S/4\\pi}\\), \\(V = \\dfrac43\\pi(S/4\\pi)^{3/2} \\approx 0.094S^{3/2}\\).",
          "The sphere holds more.",
        ],
        answer: "The sphere.",
      },
      practiceSet: [
        { prompt: "Cone and hemisphere, same base and volume: \\(h : r\\)?", answer: "\\(2 : 1\\)" },
        { prompt: "Cone : cylinder, same base and height: volumes?", answer: "\\(1 : 3\\)" },
        { prompt: "Equal surface: cube's or sphere's volume larger?", answer: "Sphere's" },
        { prompt: "Cube and sphere, equal surface: \\(x^2 : y^2\\) (cube : sphere volumes)?", answer: "\\(\\pi : 6\\)" },
      ],
      pyqExampleId: "33ff31f5-1134-41af-b892-219a74f0bdd0", // 2021 (I) — cone and hemisphere, equal bases and volumes
    },
  ],
};
