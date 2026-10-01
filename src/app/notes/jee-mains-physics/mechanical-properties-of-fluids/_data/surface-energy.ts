import type { SubtopicNote } from "@/app/notes/_types";

export const SURFACE_ENERGY_FLUID_NOTE: SubtopicNote = {
  subtopicName: "Surface Energy of Drops and Bubbles",
  title: "Surface Energy of Drops and Bubbles",
  oneLineDefinition:
    "A liquid surface stores energy T for every unit of area, so making new surface costs T × ΔA: splitting a drop needs work, merging drops releases energy, and blowing a soap bubble pays for two surfaces.",
  whyItMatters:
    "Twenty PYQs, seven of them numeric, and five from 2026. Fourteen are drops that merge or split: the energy released or needed, the ratio of the surface energies before and after, and the heat this gives; six are the work to blow a soap bubble bigger, where both surfaces of the film count.",
  concepts: [
    // C1 — drops that merge or split
    {
      kind: "formula" as const,
      slug: "jpfluid-drops",
      name: "Drops that merge or split",
      intuition:
        "Volume is kept, surface is not. Split one drop into n equal droplets: each has radius \\(R/n^{1/3}\\), and together they have \\(n^{1/3}\\) times the surface of the drop, so work must be done. Merge n droplets into one and the surface shrinks by the same factor, so energy is released, mostly as heat.",
      definition:
        "- n droplets of radius r and one drop of radius R hold the same volume: \\(R = n^{1/3}r\\).\n" +
        "- A drop has one surface: \\(E = 4\\pi r^{2}T\\).\n" +
        "- \\(\\dfrac{E_{\\text{droplets}}}{E_{\\text{drop}}} = n^{1/3}\\). For 1000 droplets this is 10.\n" +
        "- Splitting one drop of radius R into n: \\(W = 4\\pi R^{2}T\\left(n^{1/3} - 1\\right)\\).\n" +
        "- Merging n droplets of radius r: energy released \\(= 4\\pi r^{2}T\\left(n - n^{2/3}\\right)\\).\n" +
        "- Heat per unit volume on merging: \\(\\dfrac{3T}{J}\\left(\\dfrac{1}{r} - \\dfrac{1}{R}\\right)\\), J the mechanical equivalent of heat.",
      formula: {
        label: "Splitting a drop into n",
        latex: "W = 4\\pi R^{2}T\\left(n^{1/3} - 1\\right)",
      },
      authoredExample: {
        prompt:
          "A water drop of radius 3 mm splits into 27 equal droplets. The surface tension is 0.07 N/m. Find the work needed. (\\(\\pi = 22/7\\))",
        steps: [
          "\\(n^{1/3} = 3\\), so each droplet has radius 1 mm and the total surface triples.",
          "Surface energy of the drop: \\(4\\pi R^{2}T = 4 \\times \\dfrac{22}{7} \\times 9 \\times 10^{-6} \\times 0.07 = 7.92 \\times 10^{-6}\\) J.",
          "\\(W = 7.92 \\times 10^{-6} \\times (3 - 1) = 1.58 \\times 10^{-5}\\) J.",
        ],
        answer: "\\(1.58 \\times 10^{-5}\\) J",
      },
      selfCheckExample: {
        prompt:
          "Sixty-four equal mercury droplets of radius 1 mm merge into one drop. The surface tension of mercury is 0.5 N/m. Find the energy released. (\\(\\pi = 3.14\\))",
        steps: [
          "One droplet: \\(4\\pi r^{2}T = 4 \\times 3.14 \\times 10^{-6} \\times 0.5 = 6.28 \\times 10^{-6}\\) J.",
          "\\(R = 4r\\), so the big drop has the surface of 16 droplets: \\(n - n^{2/3} = 64 - 16 = 48\\).",
          "Released: \\(48 \\times 6.28 \\times 10^{-6} = 3.0 \\times 10^{-4}\\) J.",
        ],
        answer: "\\(3.0 \\times 10^{-4}\\) J",
      },
      practiceSet: [
        { prompt: "125 equal droplets merge into one drop. Ratio of their total surface energy to the drop's?", answer: "5 : 1" },
        { prompt: "A drop splits into 8 equal droplets. Total surface energy after, divided by before?", answer: "2" },
        { prompt: "Two equal drops of radius r merge. Radius of the new drop?", answer: "\\(2^{1/3}r\\)" },
        { prompt: "When droplets merge, is energy needed or released?", answer: "Released" },
      ],
      pyqExampleId: "30add9eb-7318-4124-86d9-f0ebeb8369f0", // 2026: drop of diameter 2 mm into 512 droplets
      traps: [
        {
          title: "A diameter in the stem",
          body: "A drop of diameter 2 mm has radius 1 mm. Squaring the diameter makes every energy four times too big.",
        },
        {
          title: "The ratio of energies is n^(1/3), not n",
          body: "1000 droplets have 10 times the surface energy of the drop they form, not 1000 times. Each droplet is smaller, so the surfaces do not simply add up n-fold.",
        },
        {
          title: "Comparing two splittings uses n^(1/3) − 1",
          body: "Splitting one drop into 64 instead of 27 needs (4 − 1)/(3 − 1) = 3/2 times the work, not 64/27 times.",
        },
      ],
    },

    // C2 — soap bubble work
    {
      kind: "formula" as const,
      slug: "jpfluid-bubble-work",
      name: "Work to blow a soap bubble",
      intuition:
        "A soap film has two faces, the inside and the outside, and each has surface tension T. Blowing a bubble from radius \\(r_1\\) to \\(r_2\\) adds \\(4\\pi(r_2^{2} - r_1^{2})\\) of area to EACH face, so the work is twice T times that.",
      definition:
        "- Soap bubble (two surfaces): \\(W = 2T \\times 4\\pi\\left(r_2^{2} - r_1^{2}\\right) = 8\\pi T\\left(r_2^{2} - r_1^{2}\\right)\\).\n" +
        "- A drop, or an air bubble inside a liquid, has ONE surface: \\(W = 4\\pi T\\left(r_2^{2} - r_1^{2}\\right)\\).\n" +
        "- Read the stem for diameter or radius: diameters of 2 cm and 6 cm are radii of 1 cm and 3 cm.\n" +
        "- CGS units: 1 dyne/cm = \\(10^{-3}\\) N/m, and 1 erg = \\(10^{-7}\\) J.",
      formula: {
        label: "Soap bubble",
        latex: "W = 8\\pi T\\left(r_2^{2} - r_1^{2}\\right)",
      },
      authoredExample: {
        prompt:
          "A soap solution has surface tension 0.025 N/m. Find the work to blow a bubble of it from radius 2 cm to radius 4 cm. (\\(\\pi = 3.14\\))",
        steps: [
          "\\(r_2^{2} - r_1^{2} = (16 - 4) \\times 10^{-4} = 1.2 \\times 10^{-3}\\ \\text{m}^{2}\\).",
          "Two surfaces: \\(W = 8\\pi T(r_2^{2} - r_1^{2}) = 8 \\times 3.14 \\times 0.025 \\times 1.2 \\times 10^{-3}\\).",
          "\\(W = 0.628 \\times 1.2 \\times 10^{-3} = 7.5 \\times 10^{-4}\\) J.",
        ],
        answer: "\\(7.5 \\times 10^{-4}\\) J",
      },
      selfCheckExample: {
        prompt:
          "Surface tension is 0.04 N/m. Find the work to blow a soap bubble of radius 5 cm from nothing, and the work to make a single drop surface of the same radius. (\\(\\pi = 3.14\\))",
        steps: [
          "Soap bubble: \\(8\\pi T r^{2} = 8 \\times 3.14 \\times 0.04 \\times 25 \\times 10^{-4} = 2.5 \\times 10^{-3}\\) J.",
          "One surface needs half as much: \\(1.26 \\times 10^{-3}\\) J.",
        ],
        answer: "\\(2.5 \\times 10^{-3}\\) J for the bubble; \\(1.26 \\times 10^{-3}\\) J for one surface.",
      },
      practiceSet: [
        { prompt: "A soap bubble's radius grows from r to 2r. Work, in terms of T and r?", answer: "\\(24\\pi r^{2}T\\)" },
        { prompt: "40 dyne/cm in N/m?", answer: "0.04 N/m" },
        { prompt: "How many surfaces has a soap bubble? A water drop?", answer: "Two; one." },
        { prompt: "A bubble's diameter grows from 4 cm to 8 cm. Its radii?", answer: "2 cm and 4 cm" },
      ],
      pyqExampleId: "cc46f393-7040-4835-b702-aa33f922560d", // 2026: soap bubble, diameter 2 cm to 6 cm
      traps: [
        {
          title: "Count both faces of a soap film",
          body: "A soap bubble needs 8πT(r₂² − r₁²). The 4π form is for a single surface and gives half the answer, which is always one of the options.",
        },
        {
          title: "Diameters in the stem",
          body: "Halve diameters before squaring. Using diameters as radii makes the work four times too big.",
        },
      ],
    },
  ],
};
