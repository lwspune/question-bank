import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_WO_POLARISATION_NOTE: SubtopicNote = {
  subtopicName: "Polarisation",
  title: "Polarisation, Polaroids and Malus' Law",
  oneLineDefinition:
    "Why only transverse waves can be polarised, how a polaroid turns unpolarised light into polarised light and halves its intensity, and Malus' law for light passing through two or more polaroids.",
  whyItMatters:
    "1 question, NCERT's worked example on a polaroid turned between two crossed polaroids. No board paper from 2022 to 2026 set a question on polarisation, but the present NCERT chapter still teaches polaroids and Malus' law, so a one-mark item or a case-study part can come from here. It is a short page: learn the two rules and the angles at which the light is brightest and darkest.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpwo-malus",
      name: "Polaroids and Malus' law",
      intuition:
        "Shake a rope up and down through a slot in a fence and the wave passes. Turn the slot sideways and the wave stops. Light behaves the same way because its electric field vibrates across the direction of travel. A polaroid is a slot for light: it lets through only the part of the vibration along its pass axis.",
      definition:
        "- Light is a **transverse** wave: its electric field is always at right angles to the direction of travel. Polarisation happens only for transverse waves.\n" +
        "- In **unpolarised** light (from the sun or a lamp) the electric field takes all directions across the beam, changing rapidly and at random.\n" +
        "- A **polaroid** has long-chain molecules lined up in one direction. The electric field along the molecules is absorbed, so the light that comes out vibrates in one direction only, perpendicular to the molecules: the **pass axis**. This light is **linearly (plane) polarised**.\n" +
        "- Unpolarised light through one polaroid: the intensity is halved, and turning the polaroid makes no difference.\n" +
        "- **Malus' law:** polarised light of intensity \\(I_0\\) falls on a polaroid whose pass axis is at an angle \\(\\theta\\) to the plane of the light. The component \\(E\\cos\\theta\\) passes, so \\(I = I_0\\cos^2\\theta\\).\n" +
        "- Two polaroids with parallel pass axes let through everything that leaves the first; with crossed axes (90°) they let through nothing.\n" +
        "- Polaroids are used to control intensity in sunglasses and window panes, and in photographic and 3D movie cameras.",
      formula: {
        label: "Malus' law",
        latex: "I = I_0 \\cos^2\\theta",
        symbols: [
          { symbol: "\\(I_0\\)", meaning: "intensity of the polarised light reaching the polaroid" },
          { symbol: "\\(\\theta\\)", meaning: "angle between the pass axes of the two polaroids" },
        ],
      },
      authoredExample: {
        prompt: "Unpolarised light of intensity 32 W/m² falls on two polaroids whose pass axes are at 60° to each other. Find the intensity after each polaroid.",
        steps: [
          "Given: unpolarised intensity 32 W/m², \\(\\theta = 60^{\\circ}\\).",
          "First polaroid halves unpolarised light: \\(I_1 = \\dfrac{32}{2} = 16\\) W/m².",
          "Second polaroid, by Malus' law: \\(I_2 = I_1 \\cos^2 60^{\\circ} = 16 \\times \\dfrac{1}{4} = 4\\) W/m².",
        ],
        answer: "16 W/m² after the first, 4 W/m² after the second",
      },
      selfCheckExample: {
        prompt: "Polarised light falls on a polaroid whose pass axis is at 30° to the plane of the light. What fraction of the intensity gets through?",
        steps: ["\\(\\cos^2 30^{\\circ} = \\left(\\dfrac{\\sqrt{3}}{2}\\right)^2 = \\dfrac{3}{4}\\)."],
        answer: "Three quarters",
      },
      practiceSet: [
        { prompt: "Unpolarised light falls on a single polaroid. What fraction of its intensity comes out?", answer: "Half" },
        { prompt: "Two polaroids have their pass axes at 90° to each other. How much light comes through both?", answer: "None" },
        { prompt: "At what angle between the pass axes is polarised light cut to half its intensity by the second polaroid?", answer: "45°" },
      ],
      pyqExampleId: "23369ef3-47a2-4bda-a1f8-1ac8f7e77eb2",
      traps: [
        {
          title: "Halving light that is already polarised",
          body: "The factor one half applies only to unpolarised light at the first polaroid. After that, every polaroid follows \\(I = I_0\\cos^2\\theta\\).",
        },
        {
          title: "Using cos θ instead of cos² θ",
          body: "The amplitude passed is \\(E\\cos\\theta\\), and intensity goes as amplitude squared, so the intensity carries \\(\\cos^2\\theta\\).",
        },
      ],
    },
  ],
};
