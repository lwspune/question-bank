import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_WO_RESOLVING_NOTE: SubtopicNote = {
  subtopicName: "Resolving Power",
  title: "Resolving Power of a Microscope and a Telescope",
  oneLineDefinition:
    "What limit of resolution and resolving power mean, Rayleigh's criterion for two objects to be just resolved, and the formulas for a microscope and a telescope.",
  whyItMatters:
    "6 questions, two of them from board papers: both ask for the angular resolution of a telescope from the wavelength and the diameter of its objective (2024, 2026). The textbook adds Rayleigh's criterion for a telescope and a microscope, and the least distance a microscope can resolve.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpwo-rayleigh-microscope",
      name: "Rayleigh's criterion and the microscope",
      intuition:
        "A lens never makes a point image of a point object: diffraction at its aperture spreads each point into a small bright disc with rings round it. Two nearby objects give two such discs. If the discs overlap too much they blur into one. Rayleigh drew the line where the centre of one disc falls on the first dark ring of the other: at that spacing you can just tell there are two.",
      definition:
        "- **Resolving power:** the ability of an optical instrument to show two physically separated objects as two distinct objects.\n" +
        "- **Limit of resolution:** the minimum visual angle (or distance) between two objects that the instrument can resolve. **Resolving power is the reciprocal of the limit of resolution.** It depends on the aperture and on the wavelength.\n" +
        "- **Rayleigh's criterion:** two objects are just resolved when the first minimum of the diffraction pattern of one coincides with the central maximum of the diffraction pattern of the other, and vice versa.\n" +
        "- **Microscope:** let \\(\\alpha\\) be the half angle the objective subtends at the object and n the refractive index of the medium between them. \\(n\\sin\\alpha\\) is the numerical aperture (N.A.).\n" +
        "- Self-luminous point objects: \\(a = \\dfrac{1.22\\lambda}{2n\\sin\\alpha} = \\dfrac{0.61\\lambda}{n\\sin\\alpha}\\).\n" +
        "- Non-luminous objects lit from outside: \\(a = \\dfrac{\\lambda}{2n\\sin\\alpha} = \\dfrac{\\lambda}{2\\,\\text{N.A.}}\\), resolving power \\(\\dfrac{2\\,\\text{N.A.}}{\\lambda}\\).\n" +
        "- For better resolution a should be small: use an oil-immersion objective (higher n) or a shorter wavelength.",
      formula: {
        label: "Least separation resolved by a microscope",
        latex: "a = \\frac{0.61\\lambda}{n\\sin\\alpha} \\ (\\text{self-luminous}), \\qquad a = \\frac{\\lambda}{2\\,n\\sin\\alpha} \\ (\\text{non-luminous})",
        symbols: [
          { symbol: "\\(a\\)", meaning: "least distance between two objects that are just resolved" },
          { symbol: "\\(\\alpha\\)", meaning: "half the angle the objective subtends at the object" },
          { symbol: "\\(n\\sin\\alpha\\)", meaning: "numerical aperture (N.A.)" },
        ],
      },
      authoredExample: {
        prompt:
          "The objective of a microscope subtends a half angle of 60° at two self-luminous point objects in air, which emit light of wavelength 550 nm. Find the least separation it can resolve. What does it become with oil of refractive index 1.5 between the objects and the objective?",
        steps: [
          "Given: \\(\\lambda = 5.5 \\times 10^{-7}\\) m, \\(\\alpha = 60^\\circ\\), \\(n = 1\\) (air), then \\(n = 1.5\\).",
          "Formula: \\(a = \\dfrac{0.61\\lambda}{n\\sin\\alpha}\\).",
          "In air: \\(a = \\dfrac{0.61 \\times 5.5 \\times 10^{-7}}{1 \\times 0.866} = 3.87 \\times 10^{-7}\\) m.",
          "In oil: \\(a = \\dfrac{3.87 \\times 10^{-7}}{1.5} = 2.58 \\times 10^{-7}\\) m.",
        ],
        answer: "3.87 × 10⁻⁷ m in air; 2.58 × 10⁻⁷ m with oil",
      },
      selfCheckExample: {
        prompt:
          "A microscope objective has a numerical aperture of 1.2. Non-luminous objects are lit with light of wavelength 600 nm. Find the least separation it can resolve.",
        steps: ["\\(a = \\dfrac{\\lambda}{2\\,\\text{N.A.}} = \\dfrac{6 \\times 10^{-7}}{2 \\times 1.2}\\).", "\\(a = 2.5 \\times 10^{-7}\\) m."],
        answer: "2.5 × 10⁻⁷ m",
      },
      practiceSet: [
        { prompt: "Resolving power is the reciprocal of which quantity?", answer: "The limit of resolution" },
        { prompt: "How does an oil-immersion objective improve the resolution of a microscope?", answer: "Oil raises n, so the numerical aperture n sin α is larger and the least resolvable distance is smaller" },
        { prompt: "Will blue light or red light let a microscope resolve finer detail?", answer: "Blue light, because its wavelength is shorter" },
      ],
      pyqExampleId: "438d6c8a-2c3f-4c58-bcc8-085e083cea4a",
      traps: [
        {
          title: "Thinking a bigger limit means better resolution",
          body: "The limit of resolution should be SMALL. Resolving power is its reciprocal, so a smaller limit means a larger resolving power.",
        },
        {
          title: "Rayleigh's criterion stated halfway",
          body: "Name both parts of the two patterns: the FIRST MINIMUM of one falls on the CENTRAL MAXIMUM of the other, and vice versa. 'The images just touch' earns nothing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpwo-telescope",
      name: "Resolving power of a telescope",
      intuition:
        "Stars are so far away that only the angle between two of them matters, not the distance. The wider the objective, the smaller the diffraction disc of each star and the closer together two stars can be and still look separate. That is why big telescopes are built: not only to gather light but to resolve.",
      definition:
        "- Two distant point objects (stars) send parallel beams at an angle \\(\\theta\\) to the objective of diameter D. The path difference between the extreme rays at the first dark ring is \\(1.22\\lambda\\), and it equals \\(D\\theta\\).\n" +
        "- **Limit of resolution:** \\(\\theta = \\dfrac{1.22\\lambda}{D}\\), in radian.\n" +
        "- **Resolving power:** \\(R = \\dfrac{1}{\\theta} = \\dfrac{D}{1.22\\lambda}\\).\n" +
        "- To raise the resolving power at a given wavelength, make the objective (aperture) as large as possible.",
      formula: {
        label: "Telescope",
        latex: "\\theta = \\frac{1.22\\lambda}{D}, \\qquad R = \\frac{D}{1.22\\lambda}",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "least angle between two objects that are just resolved, in radian" },
          { symbol: "\\(D\\)", meaning: "diameter of the objective" },
        ],
      },
      authoredExample: {
        prompt:
          "Two stars are \\(6 \\times 10^{-7}\\) rad apart and are observed in light of wavelength 5500 Å. What is the smallest diameter of objective that will just resolve them?",
        steps: [
          "Given: \\(\\theta = 6 \\times 10^{-7}\\) rad, \\(\\lambda = 5500\\) Å \\(= 5.5 \\times 10^{-7}\\) m.",
          "Formula: \\(\\theta = \\dfrac{1.22\\lambda}{D}\\), so \\(D = \\dfrac{1.22\\lambda}{\\theta}\\).",
          "Substitution: \\(D = \\dfrac{1.22 \\times 5.5 \\times 10^{-7}}{6 \\times 10^{-7}} = 1.12\\) m.",
        ],
        answer: "D = 1.12 m",
      },
      selfCheckExample: {
        prompt:
          "Telescope A has an objective 2 m across and telescope B one 0.5 m across. Both observe at the same wavelength. Which resolves better, and by what factor?",
        steps: ["\\(R \\propto D\\) at a fixed wavelength.", "\\(\\dfrac{R_A}{R_B} = \\dfrac{2}{0.5} = 4\\)."],
        answer: "A, with four times the resolving power",
      },
      practiceSet: [
        { prompt: "The diameter of a telescope objective is doubled. What happens to its limit of resolution?", answer: "It is halved" },
        { prompt: "A telescope is used at 4000 Å instead of 6000 Å. Does its resolving power go up or down, and by what factor?", answer: "Up, by a factor of 1.5" },
        { prompt: "Write the resolving power of a telescope in terms of the aperture D and the wavelength λ.", answer: "\\(R = \\dfrac{D}{1.22\\lambda}\\)" },
      ],
      pyqExampleId: "ffc7a90e-1435-419a-b939-bdd9682ab508",
      traps: [
        {
          title: "Leaving the wavelength in ångström",
          body: "Convert λ to metres (1 Å = \\(10^{-10}\\) m) and D to metres before dividing; the answer is then in radian.",
        },
        {
          title: "Mixing up the telescope and microscope answers",
          body: "A telescope's limit is an ANGLE (radian), improved by a bigger objective. A microscope's limit is a DISTANCE (metre), improved by a bigger numerical aperture or a shorter wavelength.",
        },
      ],
    },
  ],
};
