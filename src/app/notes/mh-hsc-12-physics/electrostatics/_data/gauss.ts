import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_ES_GAUSS_NOTE: SubtopicNote = {
  subtopicName: "Applications of Gauss' Law",
  title: "Gauss' Law: Fields of a Shell, a Wire and a Sheet",
  oneLineDefinition:
    "Using Gauss' law with a well-chosen Gaussian surface to find the electric field of a charged spherical shell, a long charged wire, a charged plane sheet and a charged conductor.",
  whyItMatters:
    "11 questions. Seven were set in board papers: derive the field outside a charged spherical shell (2025) and state its formula (2026), find the field near a charged plane sheet (2025), find the field just outside a charged conductor (2016), and three multiple-choice questions on the field of a charged sphere and of a long cylinder (2016, 2018, 2019). The textbook adds a charged sphere, a long wire, a plane sheet and the flux through a sphere.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpes-gauss-law",
      name: "Gauss' law and the field near a charged conductor",
      intuition:
        "Gauss' law counts charge by counting field lines. Draw any closed surface: the total flux coming out of it depends only on the charge inside, never on charges outside or on the shape of the surface. So we pick a surface that matches the symmetry of the charge, where the field has the same size everywhere on it, and the field drops straight out of the equation.",
      definition:
        "- **Gauss' law:** the total electric flux through a closed surface is \\(\\dfrac{1}{\\varepsilon_0}\\) times the total charge enclosed, \\(\\phi = \\oint \\vec{E} \\cdot d\\vec{s} = \\dfrac{q}{\\varepsilon_0}\\). In a medium of dielectric constant k, \\(\\varepsilon_0\\) becomes \\(\\varepsilon_0 k\\).\n" +
        "- **Steps the textbook uses:** identify the charge distribution (spherical, cylindrical or plane); choose a Gaussian surface with the same symmetry; write the flux from Gauss' law; write the flux again from the geometry with E unknown; equate the two and solve for E.\n" +
        "- Charges outside the surface change the field at points on it, but add nothing to the net flux.\n" +
        "- **Charged conductor:** the field inside is zero and the field just outside is perpendicular to the surface, of size \\(E = \\dfrac{\\sigma}{\\varepsilon_0}\\), where \\(\\sigma\\) is the surface charge density.",
      formula: {
        label: "Gauss' law",
        latex: "\\phi = \\oint \\vec{E} \\cdot d\\vec{s} = \\frac{q}{\\varepsilon_0}",
      },
      authoredExample: {
        prompt:
          "A closed surface in air encloses charges of +3 µC and −1 µC. A third charge of +5 µC lies outside it. Find the total electric flux through the surface. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^2/\\text{N m}^2\\))",
        steps: [
          "Given: charges inside +3 µC and −1 µC; the +5 µC charge is outside, so it adds no net flux.",
          "Formula: \\(\\phi = \\dfrac{q}{\\varepsilon_0}\\), with q the charge enclosed.",
          "Charge enclosed: \\(q = 3 - 1 = 2\\ \\mu\\text{C} = 2 \\times 10^{-6}\\) C.",
          "Substitution: \\(\\phi = \\dfrac{2 \\times 10^{-6}}{8.85 \\times 10^{-12}} = 2.26 \\times 10^{5}\\ \\text{N m}^2/\\text{C}\\).",
        ],
        answer: "2.26 × 10⁵ N m²/C, coming out of the surface",
      },
      selfCheckExample: {
        prompt:
          "A sphere of radius 2a has its centre at the origin. A charge +Q sits at (a, 0) and a charge −3Q sits at (3a, 0). Find the electric flux through the sphere.",
        steps: [
          "+Q is at distance a, which is less than 2a, so it is inside.",
          "−3Q is at distance 3a, which is more than 2a, so it is outside and adds no net flux.",
          "\\(\\phi = \\dfrac{Q}{\\varepsilon_0}\\).",
        ],
        answer: "Q/ε₀, outward",
      },
      practiceSet: [
        { prompt: "A closed surface encloses no charge. What is the net flux through it?", answer: "Zero" },
        { prompt: "What is the electric field inside a charged conductor in electrostatics?", answer: "Zero" },
        { prompt: "In which direction is the field just outside a charged conductor?", answer: "Perpendicular to its surface at every point" },
      ],
      pyqExampleId: "aced58e1-3b01-4986-ada3-c09165948135",
      traps: [
        {
          title: "Counting charges that sit outside",
          body: "Only the charge enclosed goes into \\(\\phi = q/\\varepsilon_0\\). A charge outside the Gaussian surface sends in as many field lines as it takes out, so its net flux is zero.",
        },
        {
          title: "Conductor or thin sheet",
          body: "Just outside a charged conductor the field is \\(\\sigma/\\varepsilon_0\\), because all the flux leaves through one face. For a thin charged sheet it is \\(\\sigma/2\\varepsilon_0\\), because the flux leaves through both faces.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpes-shell",
      name: "Field of a uniformly charged spherical shell",
      intuition:
        "Outside a charged shell, the field looks exactly as if all the charge sat at the centre, so it falls off as the square of the distance. Inside the shell a Gaussian sphere encloses no charge at all, so the field there is zero. The field is largest just at the surface.",
      definition:
        "**Derivation (textbook labelling):**\n" +
        "- A sphere of radius R, centre O, carries a uniform surface charge density \\(\\sigma\\), so its total charge is \\(q = \\sigma \\times 4\\pi R^2\\).\n" +
        "- To find E at a point P distant r from O, imagine a concentric Gaussian sphere of radius r through P.\n" +
        "- By symmetry E has the same size at every point of this sphere and points radially outward, so the angle between \\(\\vec{E}\\) and \\(d\\vec{s}\\) is zero and \\(\\vec{E} \\cdot d\\vec{s} = E\\,ds\\).\n" +
        "- Total flux: \\(\\phi = \\oint E\\,ds = E \\times 4\\pi r^2\\).\n" +
        "- By Gauss' law, \\(\\phi = \\dfrac{q}{\\varepsilon_0}\\). So \\(E \\times 4\\pi r^2 = \\dfrac{q}{\\varepsilon_0}\\), giving \\(E = \\dfrac{q}{4\\pi\\varepsilon_0 r^2} = \\dfrac{\\sigma R^2}{\\varepsilon_0 r^2}\\).\n" +
        "- **On the surface** (r = R): \\(E = \\dfrac{\\sigma}{\\varepsilon_0}\\). **Inside** (r < R): no charge is enclosed, so E = 0.\n" +
        "- In a medium of dielectric constant k, replace \\(\\varepsilon_0\\) by \\(\\varepsilon_0 k\\).",
      formula: {
        label: "Field outside a charged shell",
        latex: "E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r^2} = \\frac{\\sigma R^2}{\\varepsilon_0 r^2} \\quad (r > R), \\qquad E = 0 \\quad (r < R)",
      },
      authoredExample: {
        prompt:
          "A thin spherical shell of radius 20 cm carries a charge of 4 µC spread uniformly. Find the electric field (i) 40 cm from its centre, (ii) on its surface, (iii) 10 cm from its centre. (\\(\\dfrac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^{9}\\) SI units)",
        steps: [
          "Given: \\(q = 4 \\times 10^{-6}\\) C, R = 0.20 m.",
          "Formula: \\(E = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q}{r^2}\\) for r ≥ R; E = 0 for r < R.",
          "(i) r = 0.40 m: \\(E = \\dfrac{9 \\times 10^{9} \\times 4 \\times 10^{-6}}{(0.40)^2} = \\dfrac{36\\,000}{0.16} = 2.25 \\times 10^{5}\\) N/C.",
          "(ii) r = R = 0.20 m: \\(E = \\dfrac{36\\,000}{0.04} = 9 \\times 10^{5}\\) N/C.",
          "(iii) r = 0.10 m is inside the shell, so E = 0.",
        ],
        answer: "2.25 × 10⁵ N/C; 9 × 10⁵ N/C; zero",
      },
      selfCheckExample: {
        prompt:
          "A charged conducting sphere of radius 10 cm in air has a surface charge density of 8.85 µC/m². Find the field 20 cm from its centre. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) SI units)",
        steps: [
          "\\(E = \\dfrac{\\sigma R^2}{\\varepsilon_0 r^2} = \\dfrac{8.85 \\times 10^{-6}}{8.85 \\times 10^{-12}} \\times \\left(\\dfrac{0.10}{0.20}\\right)^2\\).",
          "\\(E = 10^{6} \\times 0.25 = 2.5 \\times 10^{5}\\) N/C.",
        ],
        answer: "2.5 × 10⁵ N/C",
      },
      practiceSet: [
        { prompt: "The distance of a point from the centre of a charged sphere (point outside) is doubled. What happens to the field?", answer: "It becomes one quarter" },
        { prompt: "What is the electric field at the centre of a charged hollow sphere?", answer: "Zero" },
        { prompt: "A charged sphere is moved from air into oil of dielectric constant 2. What happens to the field at a point outside it?", answer: "It is halved" },
      ],
      pyqExampleId: "825891a4-3e62-41a3-b9e8-5bab14348793",
      traps: [
        {
          title: "Skipping the Gaussian surface in a derivation",
          body: "The marks are in the steps: name the Gaussian sphere of radius r, say why E is the same everywhere on it and along \\(d\\vec{s}\\), write \\(\\phi = E \\times 4\\pi r^2\\), then use Gauss' law. Writing only the final formula earns one mark at most.",
        },
        {
          title: "Using the outside formula inside the shell",
          body: "For r < R the Gaussian sphere encloses no charge, so E = 0. Putting a small r into \\(q/4\\pi\\varepsilon_0 r^2\\) gives a huge field that does not exist.",
        },
        {
          title: "Forgetting the medium",
          body: "When the sphere is in a medium of dielectric constant k, the field is \\(\\dfrac{q}{4\\pi\\varepsilon_0 k r^2}\\). A larger k means a smaller field.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpes-wire-sheet",
      name: "Field of a long charged wire and of a plane sheet",
      intuition:
        "A long wire spreads its field lines out over a cylinder, whose area grows only as r, so the field falls as 1/r. A large flat sheet sends its field lines straight out on both sides and they never spread, so its field is the same at every distance near it.",
      definition:
        "**Infinitely long wire** (linear charge density \\(\\lambda\\)):\n" +
        "- Take a coaxial Gaussian cylinder of radius r and length l through P, closed by flat caps.\n" +
        "- On the curved surface E is the same everywhere and along \\(d\\vec{s}\\); on the caps E is at 90° to \\(d\\vec{s}\\), so the caps add no flux. Flux \\(= E \\times 2\\pi r l\\).\n" +
        "- Charge enclosed \\(q = \\lambda l\\). Gauss' law: \\(E \\times 2\\pi r l = \\dfrac{\\lambda l}{\\varepsilon_0}\\), so \\(E = \\dfrac{\\lambda}{2\\pi\\varepsilon_0 r}\\), outward if \\(\\lambda\\) is positive.\n" +
        "**Infinite plane sheet** (surface charge density \\(\\sigma\\)):\n" +
        "- Take a Gaussian cylinder that pierces the sheet, with caps of area A on both sides.\n" +
        "- E is at right angles to the caps and away from the sheet; the curved surface adds no flux. Flux \\(= 2EA\\).\n" +
        "- Charge enclosed \\(q = \\sigma A\\). Gauss' law: \\(2EA = \\dfrac{\\sigma A}{\\varepsilon_0}\\), so \\(E = \\dfrac{\\sigma}{2\\varepsilon_0}\\), the same at every distance.",
      formula: {
        label: "Wire and sheet",
        latex: "E_{\\text{wire}} = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}, \\qquad E_{\\text{sheet}} = \\frac{\\sigma}{2\\varepsilon_0}",
      },
      authoredExample: {
        prompt:
          "A very long straight wire carries a uniform charge of 2 µC per metre. Find the electric field at a point 30 cm from the wire. (\\(\\dfrac{1}{2\\pi\\varepsilon_0} = 1.8 \\times 10^{10}\\) SI units)",
        steps: [
          "Given: \\(\\lambda = 2 \\times 10^{-6}\\) C/m, r = 0.30 m.",
          "Formula: \\(E = \\dfrac{\\lambda}{2\\pi\\varepsilon_0 r}\\).",
          "Substitution: \\(E = \\dfrac{1.8 \\times 10^{10} \\times 2 \\times 10^{-6}}{0.30} = \\dfrac{36\\,000}{0.30}\\).",
          "\\(E = 1.2 \\times 10^{5}\\) N/C, directed away from the wire.",
        ],
        answer: "1.2 × 10⁵ N/C",
      },
      selfCheckExample: {
        prompt:
          "A long charged wire produces a field of 9 × 10⁴ N/C at a point 20 cm from it. Find its linear charge density. (\\(\\dfrac{1}{2\\pi\\varepsilon_0} = 1.8 \\times 10^{10}\\) SI units)",
        steps: [
          "\\(\\lambda = \\dfrac{E r}{1.8 \\times 10^{10}} = \\dfrac{9 \\times 10^{4} \\times 0.20}{1.8 \\times 10^{10}}\\).",
          "\\(\\lambda = 1 \\times 10^{-6}\\) C/m.",
        ],
        answer: "1 µC/m",
      },
      practiceSet: [
        { prompt: "How does the field of a long charged wire vary with the distance r from it?", answer: "As \\(1/r\\)" },
        { prompt: "A point near a large charged sheet moves twice as far from it. What happens to the field?", answer: "It stays the same" },
        { prompt: "Why do the flat caps of the Gaussian cylinder around a charged wire add no flux?", answer: "The field is parallel to the caps, at 90° to their area vectors" },
      ],
      pyqExampleId: "fb4ab60d-8f49-48a4-bde4-14856f4e2af7",
      traps: [
        {
          title: "Writing 1/r² for a wire",
          body: "The field of a long wire falls as \\(1/r\\), not \\(1/r^2\\). The \\(1/r^2\\) law belongs to a point charge or a charged sphere.",
        },
        {
          title: "Dropping the 2 for a sheet",
          body: "A charged plane sheet gives \\(\\sigma/2\\varepsilon_0\\). Writing \\(\\sigma/\\varepsilon_0\\) doubles the answer and loses the calculation marks.",
        },
      ],
    },
  ],
};
