import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EF_GAUSS_NOTE: SubtopicNote = {
  subtopicName: "Electric Flux and Gauss's Law",
  title: "Electric Flux and Gauss's Law",
  oneLineDefinition:
    "Electric flux through a surface, Gauss's law for a closed surface, sharing flux by symmetry, and finding the flux and the charge inside for a cube or cylinder in a given field.",
  whyItMatters:
    "13 questions, five of them from board papers. The board asks you to define electric flux and give its dimensions (2024), find the flux through one face of a cube with a charge at its centre (2023), find the flux and the charge inside a cube or a cylinder in a field that varies or changes direction (2024, 2025), and use Gauss's law for charges inside and between two shells (2025). The textbook adds the flux through a tilted square and the charge inside a black box.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpef-flux",
      name: "Electric flux",
      intuition:
        "Flux measures how much field passes through a surface. Think of field lines as rain falling on a sheet: held flat across the rain it catches the most, held edge-on it catches none. So flux is field times area times the cosine of the angle between the field and the normal to the surface.",
      definition:
        "- **Area vector** \\(\\Delta\\vec{S}\\): its size is the area and its direction is along the normal to the surface. For a closed surface it points along the **outward** normal.\n" +
        "- **Electric flux** through a small area: \\(\\Delta\\phi = \\vec{E}\\cdot\\Delta\\vec{S} = E\\,\\Delta S\\cos\\theta\\), where θ is the angle between \\(\\vec{E}\\) and the normal. For a uniform field and a flat surface, \\(\\phi = EA\\cos\\theta\\).\n" +
        "- Flux is a scalar. It is proportional to the number of field lines crossing the surface.\n" +
        "- SI unit: N m² C⁻¹. Dimensions: [M L³ T⁻³ A⁻¹].\n" +
        "- Through a closed surface, flux going out is positive and flux coming in is negative.",
      formula: {
        label: "Electric flux",
        latex: "\\phi = \\vec{E}\\cdot\\vec{A} = EA\\cos\\theta",
      },
      authoredExample: {
        prompt:
          "A uniform field of \\(5 \\times 10^3\\) N/C passes through a flat disc of radius 4 cm. Find the flux through the disc when its normal makes 60° with the field, and when the disc is turned edge-on to the field.",
        steps: [
          "Given: \\(E = 5 \\times 10^3\\) N/C, \\(r = 0.04\\) m, so \\(A = \\pi r^2 = 5.03 \\times 10^{-3}\\) m².",
          "Formula: \\(\\phi = EA\\cos\\theta\\).",
          "At 60°: \\(\\phi = 5 \\times 10^3 \\times 5.03 \\times 10^{-3} \\times 0.5 = 12.6\\) N m² C⁻¹.",
          "Edge-on, the normal is at 90° to the field: \\(\\phi = 0\\).",
        ],
        answer: "12.6 N m² C⁻¹ at 60°; zero when edge-on",
      },
      selfCheckExample: {
        prompt:
          "A flat surface of area 0.25 m² is in a uniform field of 400 N/C, and the flux through it is 86.6 N m² C⁻¹. Find the angle between the field and the normal to the surface.",
        steps: ["\\(\\cos\\theta = \\dfrac{\\phi}{EA} = \\dfrac{86.6}{400 \\times 0.25} = 0.866\\).", "\\(\\theta = 30^\\circ\\)."],
        answer: "30°",
      },
      practiceSet: [
        { prompt: "What is the SI unit of electric flux?", answer: "N m² C⁻¹" },
        { prompt: "Is electric flux a vector or a scalar?", answer: "A scalar" },
        { prompt: "Which way does the area vector of each part of a closed surface point?", answer: "Along the outward normal" },
      ],
      pyqExampleId: "f5b4ded6-4c21-4b7e-a3a4-38f06ffdb43f",
      traps: [
        {
          title: "Angle with the surface instead of the normal",
          body: "θ in \\(EA\\cos\\theta\\) is the angle between \\(\\vec{E}\\) and the NORMAL. If a question gives the angle with the surface itself, use 90° minus that angle.",
        },
        {
          title: "Area left in square centimetres",
          body: "Convert the area to m² first. A square of side 5 cm has an area of \\(25 \\times 10^{-4}\\) m², not 25.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpef-gauss-law",
      name: "Gauss's law",
      intuition:
        "Surround some charges with any closed surface. The total flux out of it depends only on the charge inside: not on the shape or size of the surface, and not on charges outside. A charge outside sends as many field lines in as it sends out, so it adds nothing to the total.",
      definition:
        "- **Statement:** the electric flux through any closed surface S is \\(1/\\varepsilon_0\\) times the total charge q enclosed by S: \\(\\oint \\vec{E}\\cdot d\\vec{S} = \\dfrac{q}{\\varepsilon_0}\\).\n" +
        "- It holds for a closed surface of any shape or size. If no charge is enclosed, the total flux is zero.\n" +
        "- The field \\(\\vec{E}\\) on the surface is due to all charges, inside and outside, but q counts only the charge inside.\n" +
        "- The closed surface chosen is called a **Gaussian surface**. It must not pass through a point charge.\n" +
        "- **Agreement with Coulomb's law:** for a point charge q and a sphere of radius r centred on it, \\(E \\times 4\\pi r^2 = q/\\varepsilon_0\\), so \\(E = \\dfrac{q}{4\\pi\\varepsilon_0 r^2}\\). Gauss's law rests on the inverse-square law; any departure from \\(1/r^2\\) would break it.\n" +
        "- An **open** surface has an edge and encloses no volume, like a disc; a **closed** surface encloses a volume, like a sphere. Gauss's law is for closed surfaces only.",
      formula: {
        label: "Gauss's law",
        latex: "\\oint \\vec{E}\\cdot d\\vec{S} = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}",
      },
      authoredExample: {
        prompt:
          "A closed surface encloses charges of \\(+6\\ \\mu\\text{C}\\), \\(-8\\ \\mu\\text{C}\\) and \\(+7\\ \\mu\\text{C}\\). A charge of \\(+11\\ \\mu\\text{C}\\) lies just outside it. Find the net flux through the surface.",
        steps: [
          "Charge enclosed: \\(6 - 8 + 7 = +5\\ \\mu\\text{C} = 5 \\times 10^{-6}\\) C. The charge outside adds nothing to the total flux.",
          "Formula: \\(\\phi = \\dfrac{q}{\\varepsilon_0}\\).",
          "\\(\\phi = \\dfrac{5 \\times 10^{-6}}{8.854 \\times 10^{-12}} = 5.65 \\times 10^{5}\\) N m² C⁻¹, outward.",
        ],
        answer: "\\(5.65 \\times 10^{5}\\) N m² C⁻¹, outward",
      },
      selfCheckExample: {
        prompt: "The net outward flux through a closed box is \\(-1.77 \\times 10^{3}\\) N m² C⁻¹. Find the net charge inside the box.",
        steps: ["\\(q = \\varepsilon_0\\phi = 8.854 \\times 10^{-12} \\times (-1.77 \\times 10^{3})\\).", "\\(q = -1.57 \\times 10^{-8}\\) C."],
        answer: "\\(-1.57 \\times 10^{-8}\\) C",
      },
      practiceSet: [
        { prompt: "A closed sphere round a point charge is made twice as large. How does the flux through it change?", answer: "It does not change" },
        { prompt: "If the net flux out of a closed surface is zero, must there be no charge inside?", answer: "No; the charges inside may add up to zero" },
        {
          prompt: "Why does a charge outside a closed surface add nothing to the total flux through it?",
          answer: "Every field line it sends into the surface also leaves it, so the inward and outward flux cancel",
        },
      ],
      pyqExampleId: "330f7d91-81e2-46e7-98ee-f1905ad92cd9",
      traps: [
        {
          title: "Counting charges outside",
          body: "Only the charge INSIDE the Gaussian surface goes on the right-hand side. A charge outside does change \\(\\vec{E}\\) on the surface, but not the total flux.",
        },
        {
          title: "A statement that does not say what q is",
          body: "State that q is the total charge enclosed by the closed surface. The law written with an unexplained q is incomplete.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpef-flux-symmetry",
      name: "Sharing flux by symmetry",
      intuition:
        "Gauss's law gives the total flux through a closed surface, not the flux through one part of it. When a charge sits at the centre of a cube, all six faces are alike, so each gets one sixth. If you are given only one square face, imagine the cube that square belongs to.",
      definition:
        "- Charge q at the centre of a cube: total flux \\(q/\\varepsilon_0\\), and flux through each face \\(\\dfrac{q}{6\\varepsilon_0}\\).\n" +
        "- A charge a distance d above the centre of a square of side 2d is at the centre of a cube that has this square as one face, so the flux through the square is \\(\\dfrac{q}{6\\varepsilon_0}\\).\n" +
        "- A point charge at the centre of a sphere sends half its flux through each half of the sphere.\n" +
        "- Equal shares need every part to be alike. Move the charge off-centre and the shares change, though the total stays \\(q/\\varepsilon_0\\).",
      formula: {
        label: "Flux through one face of a cube with the charge at its centre",
        latex: "\\phi_{\\text{face}} = \\frac{q}{6\\varepsilon_0}",
      },
      authoredExample: {
        prompt:
          "A point charge of \\(+8.85\\) nC is at the centre of a sphere. Find the flux through the whole sphere and through one half of it. Take \\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) C² N⁻¹ m⁻².",
        steps: [
          "Total flux: \\(\\phi = \\dfrac{q}{\\varepsilon_0} = \\dfrac{8.85 \\times 10^{-9}}{8.85 \\times 10^{-12}} = 1000\\) N m² C⁻¹.",
          "The two halves of the sphere are alike, so each gets half.",
          "Flux through one half: 500 N m² C⁻¹.",
        ],
        answer: "1000 N m² C⁻¹ through the sphere; 500 N m² C⁻¹ through one half",
      },
      selfCheckExample: {
        prompt: "A point charge is 3 cm directly above the centre of a square of side 6 cm. What fraction of its total flux passes through the square?",
        steps: [
          "The square is one face of a cube of side 6 cm with the charge at its centre.",
          "All six faces of that cube are alike, so each gets the same share.",
        ],
        answer: "One sixth",
      },
      practiceSet: [
        {
          prompt: "A charge at the centre of a cube is moved off-centre but stays inside. Does the total flux through the cube change?",
          answer: "No; only the share through each face changes",
        },
        { prompt: "A cube round a charge is replaced by a sphere round the same charge. Does the total flux change?", answer: "No" },
      ],
      pyqExampleId: "857c4d4a-99de-4884-9c0f-6305a6829059",
      traps: [
        {
          title: "Putting the whole flux through one face",
          body: "\\(q/\\varepsilon_0\\) is the flux through the whole closed surface. With the charge at the centre of a cube, one face gets one sixth of it.",
        },
        {
          title: "Equal shares when the charge is off-centre",
          body: "Faces share the flux equally only when the charge is at the exact centre. Off-centre, nearer faces get more.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpef-flux-cube",
      name: "Flux through a cube or cylinder in a given field",
      intuition:
        "When the field points along x only, flux goes through just the two faces at right angles to x; the other faces lie along the field. Use the outward normal on each face: flux into one face is negative, out of the other is positive. If the field is stronger where it leaves than where it enters, the net flux is positive and there is charge inside.",
      definition:
        "- For \\(\\vec{E} = E_x(x)\\,\\hat{i}\\), the faces parallel to the x-axis carry no flux, since \\(\\vec{E}\\) lies along them.\n" +
        "- Face at \\(x_1\\) with outward normal \\(-\\hat{i}\\): \\(\\phi_1 = -E_x(x_1)A\\). Face at \\(x_2\\) with outward normal \\(+\\hat{i}\\): \\(\\phi_2 = +E_x(x_2)A\\).\n" +
        "- Net flux \\(\\phi = [E_x(x_2) - E_x(x_1)]A\\), and the charge inside is \\(q = \\varepsilon_0\\phi\\).\n" +
        "- A uniform field gives zero net flux through any closed surface, so a constant part of \\(E_x\\) always cancels.\n" +
        "- When the field points away from the origin on both sides, flux leaves through both flat faces, so both are positive.\n" +
        "- Read the positions of the faces from the figure: the answer depends on where the cube sits.",
      formula: {
        label: "Net flux for a field along x",
        latex: "\\phi = \\left[E_x(x_2) - E_x(x_1)\\right]A, \\qquad q = \\varepsilon_0\\,\\phi",
      },
      authoredExample: {
        prompt:
          "A cube of side 0.2 m has its faces parallel to the coordinate planes, with one face at x = 0.2 m and the opposite face at x = 0.4 m. The field is \\(\\vec{E} = 300x\\,\\hat{i}\\) N/C, with x in metres. Find the net flux through the cube and the charge inside it.",
        steps: [
          "Area of each face: \\(A = (0.2)^2 = 0.04\\) m². Only the faces at x = 0.2 m and x = 0.4 m carry flux.",
          "Field at the two faces: \\(E_1 = 300 \\times 0.2 = 60\\) N/C and \\(E_2 = 300 \\times 0.4 = 120\\) N/C.",
          "Net flux: \\(\\phi = (120 - 60) \\times 0.04 = 2.4\\) N m² C⁻¹.",
          "Charge inside: \\(q = \\varepsilon_0\\phi = 8.854 \\times 10^{-12} \\times 2.4 = 2.1 \\times 10^{-11}\\) C.",
        ],
        answer: "2.4 N m² C⁻¹; \\(2.1 \\times 10^{-11}\\) C",
      },
      selfCheckExample: {
        prompt: "A uniform field of 700 N/C points along +x. Find the net flux through a cube of side 0.3 m whose faces are parallel to the coordinate planes.",
        steps: ["Flux in through one face is \\(-EA\\) and out through the opposite face is \\(+EA\\).", "They cancel, and the other four faces carry none."],
        answer: "Zero",
      },
      practiceSet: [
        { prompt: "When \\(\\vec{E}\\) points along x only, which faces of a cube carry flux?", answer: "Only the two faces at right angles to the x-axis" },
        {
          prompt: "If \\(E_x = 6x + 9\\) N/C, which part of the field decides the net flux through a cube?",
          answer: "Only the 6x part; the constant 9 cancels between the two faces",
        },
      ],
      pyqExampleId: "247001fc-d78b-4f75-bc6f-3e9b275fc3b5",
      traps: [
        {
          title: "Ignoring the outward normal",
          body: "On the face nearer the origin the outward normal is \\(-\\hat{i}\\), so the flux there is negative when \\(\\vec{E}\\) points along +x. Taking both faces as positive gives a wrong net flux.",
        },
        {
          title: "Forgetting the charge part",
          body: "After the flux, Gauss's law gives the charge inside as \\(q = \\varepsilon_0\\phi\\). Questions usually ask for both, with units.",
        },
      ],
    },
  ],
};
