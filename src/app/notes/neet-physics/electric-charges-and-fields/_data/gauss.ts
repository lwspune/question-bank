import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_EF_GAUSS_NOTE: SubtopicNote = {
  subtopicName: "Gauss's Law and Conductors",
  title: "Gauss's Law and Conductors",
  oneLineDefinition:
    "Electric flux as the field lines through a surface, Gauss's law (flux out of a closed surface = enclosed charge ÷ ε₀) and the fields it gives for a line, a sheet and a shell, and the rules for the field in and around a conductor.",
  whyItMatters:
    "Three NEET questions, all from 2023 or later. One asks what a zero net flux through a closed surface tells you (2023), one checks five statements about charged conductors (NEET 2026) and one compares the fields inside the cavity of a conducting sphere and outside it, with a charge in the cavity (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphef-gauss",
      name: "Electric flux and Gauss's law",
      intuition:
        "Flux counts how many field lines pass through a surface. Take any closed surface, like a balloon. A field line from a charge outside enters the balloon and leaves it again, so it adds nothing to the net count. Only charge inside the balloon sends out lines that are not matched by lines coming in. Gauss's law turns that count into a rule: the net flux out depends only on the charge enclosed.",
      definition:
        "- **Flux through a flat area** in a uniform field: \\(\\phi = EA\\cos\\theta\\), where θ is the angle between \\(\\vec{E}\\) and the normal to the area. Unit N m² C⁻¹.\n" +
        "- **Gauss's law:** \\(\\oint \\vec{E}\\cdot d\\vec{A} = \\dfrac{q_{\\text{enc}}}{\\varepsilon_0}\\) for any closed surface.\n" +
        "- Charges outside give zero net flux. The flux does not depend on the shape or size of the surface, or on where the charge sits inside it.\n" +
        "- The field on the surface is caused by all charges, inside and outside. Only the net flux is fixed by the enclosed charge.\n" +
        "- A charge q at the centre of a cube sends \\(\\dfrac{q}{6\\varepsilon_0}\\) through each face.\n" +
        "- **Uses:** a long straight line of charge \\(E = \\dfrac{\\lambda}{2\\pi\\varepsilon_0 r}\\); a large plane sheet \\(E = \\dfrac{\\sigma}{2\\varepsilon_0}\\), the same at every distance; a thin charged spherical shell \\(E = \\dfrac{kq}{r^{2}}\\) outside it and zero inside it.",
      formula: {
        label: "Flux and Gauss's law",
        latex: "\\phi = EA\\cos\\theta, \\qquad \\oint \\vec{E}\\cdot d\\vec{A} = \\frac{q_{\\text{enc}}}{\\varepsilon_0}",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle between the field and the normal to the area" },
          { symbol: "\\(q_{\\text{enc}}\\)", meaning: "total charge inside the closed surface" },
        ],
      },
      authoredExample: {
        prompt:
          "A point charge of 8.85 nC sits at the centre of a cube. Find the flux through the whole cube and through one face. Take \\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^{2}\\,\\text{N}^{-1}\\,\\text{m}^{-2}\\).",
        steps: [
          "Whole cube: \\(\\phi = \\dfrac{q}{\\varepsilon_0} = \\dfrac{8.85 \\times 10^{-9}}{8.85 \\times 10^{-12}} = 1000\\ \\text{N m}^{2}\\,\\text{C}^{-1}\\).",
          "The six faces are alike, so each gets a sixth: \\(\\dfrac{1000}{6} \\approx 167\\ \\text{N m}^{2}\\,\\text{C}^{-1}\\).",
        ],
        answer: "1000 N m² C⁻¹ in all; about 167 N m² C⁻¹ through one face",
      },
      selfCheckExample: {
        prompt:
          "A large plane sheet carries a surface charge density of \\(1.77 \\times 10^{-6}\\) C/m². Find the field near it. Take \\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^{2}\\,\\text{N}^{-1}\\,\\text{m}^{-2}\\).",
        steps: [
          "\\(E = \\dfrac{\\sigma}{2\\varepsilon_0} = \\dfrac{1.77 \\times 10^{-6}}{2 \\times 8.85 \\times 10^{-12}}\\).",
          "\\(E = \\dfrac{1.77 \\times 10^{-6}}{1.77 \\times 10^{-11}} = 10^{5}\\ \\text{N/C}\\).",
        ],
        answer: "\\(10^{5}\\) N/C",
      },
      practiceSet: [
        { prompt: "A flat area of 0.2 m² sits in a uniform field of 50 N/C, with its normal at 60° to the field. Find the flux through it.", answer: "5 N m² C⁻¹" },
        { prompt: "A closed surface encloses charges of +5 μC and −2 μC. What is the net flux out of it?", answer: "\\(3 \\times 10^{-6}/\\varepsilon_0\\), about \\(3.4 \\times 10^{5}\\) N m² C⁻¹" },
        { prompt: "What is the electric field inside a thin, uniformly charged spherical shell?", answer: "Zero" },
        { prompt: "How does the field of a long straight line of charge change with the distance r from it?", answer: "As \\(1/r\\)" },
      ],
      pyqExampleId: "88a31224-43a0-4e3a-8fc2-527fcdacc65b",
      traps: [
        {
          title: "Zero flux does not mean zero field",
          body: "The net flux depends only on the enclosed charge, but the field on the surface comes from every charge, inside and outside. A surface with no charge inside can still have a strong field on it.",
        },
        {
          title: "Measure the angle from the normal",
          body: "In \\(\\phi = EA\\cos\\theta\\) the angle is between the field and the normal to the area. A field lying along the surface gives zero flux.",
        },
        {
          title: "A plane sheet's field does not fall with distance",
          body: "For a large plane sheet \\(E = \\dfrac{\\sigma}{2\\varepsilon_0}\\) at every distance. Only the line charge's field (as \\(1/r\\)) and the shell's field outside (as \\(1/r^{2}\\)) fall off.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphef-conductors",
      name: "Conductors in electrostatics",
      intuition:
        "A conductor is full of free electrons. If any field were left inside it, they would keep moving, so in the steady state they settle exactly where the field inside becomes zero. That one fact gives every other rule: the extra charge has to sit on the surface, the field just outside must stand straight out from the surface, and a hollow space inside a conductor is cut off from fields outside it.",
      definition:
        "- Inside a conductor in the static state, the electric field is zero.\n" +
        "- The interior has no excess charge; any extra charge sits on the surface.\n" +
        "- Just outside the surface the field is normal to the surface at every point, with size \\(E = \\dfrac{\\sigma}{\\varepsilon_0}\\).\n" +
        "- The potential is the same at every point of the conductor, inside and on the surface. It is constant, not necessarily zero.\n" +
        "- **Shielding:** inside an empty cavity of a conductor the field is zero, whatever charges and fields are outside.\n" +
        "- A charge q placed in a cavity draws −q onto the cavity wall and leaves +q on the outer surface. The field in the cavity is then not zero. For a conducting sphere the outer charge spreads evenly, so outside the field is \\(\\dfrac{kq}{r^{2}}\\) measured from the sphere's centre.",
      formula: {
        label: "Field of a conductor",
        latex: "E_{\\text{inside}} = 0, \\qquad E_{\\text{surface}} = \\frac{\\sigma}{\\varepsilon_0}\\ \\text{(normal to the surface)}",
        symbols: [
          { symbol: "\\(\\sigma\\)", meaning: "surface charge density at that point of the surface" },
        ],
      },
      authoredExample: {
        prompt:
          "A charged conductor has a surface charge density of \\(8.85 \\times 10^{-7}\\) C/m² at one point. Find the field just outside it there, and the field just inside. Take \\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^{2}\\,\\text{N}^{-1}\\,\\text{m}^{-2}\\).",
        steps: [
          "Just outside: \\(E = \\dfrac{\\sigma}{\\varepsilon_0} = \\dfrac{8.85 \\times 10^{-7}}{8.85 \\times 10^{-12}} = 10^{5}\\ \\text{N/C}\\), normal to the surface.",
          "Just inside, in the body of the conductor, the field is zero.",
        ],
        answer: "\\(10^{5}\\) N/C outside, normal to the surface; zero inside",
      },
      selfCheckExample: {
        prompt:
          "A charge of +2 μC is placed in a cavity inside an uncharged conductor. What charge appears on the cavity wall, and what on the outer surface?",
        steps: [
          "The field inside the body of the conductor must be zero, so the cavity wall carries −2 μC to cancel the field of the +2 μC charge.",
          "The conductor was uncharged, so +2 μC is left over, and it goes to the outer surface.",
        ],
        answer: "−2 μC on the cavity wall, +2 μC on the outer surface",
      },
      practiceSet: [
        { prompt: "What is the electric field inside an empty cavity of a conductor?", answer: "Zero" },
        { prompt: "The field just outside a charged conductor is \\(2 \\times 10^{4}\\) N/C. Find the surface charge density there.", answer: "\\(1.77 \\times 10^{-7}\\) C/m²" },
        { prompt: "Why is it safe to sit inside a closed car during a thunderstorm?", answer: "Its metal body shields the inside: the field in a cavity of a conductor is zero" },
        { prompt: "Where does the extra charge given to a conductor reside in the static state?", answer: "On its outer surface" },
      ],
      pyqExampleId: "93caa5ab-cd23-4755-b6ea-bf0b581199cf",
      traps: [
        {
          title: "Constant potential is not zero potential",
          body: "Inside a charged conductor the field is zero, so the potential is the same everywhere. That common value is usually not zero.",
        },
        {
          title: "Next to a conductor the field is σ/ε₀",
          body: "Just outside a conductor \\(E = \\dfrac{\\sigma}{\\varepsilon_0}\\), twice the \\(\\dfrac{\\sigma}{2\\varepsilon_0}\\) of an isolated plane sheet. The field does depend on the surface charge density.",
        },
        {
          title: "The surface field has no sideways part",
          body: "At the surface of a conductor at rest the field is normal to the surface. A sideways part would push charges along the surface, and they would not be at rest.",
        },
        {
          title: "Shielding works only for an empty cavity",
          body: "The field is zero in a cavity with no charge in it. Put a charge inside the cavity and there is a field in the cavity, from that charge and the charge it draws onto the wall.",
        },
      ],
    },
  ],
};
