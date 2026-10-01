import type { SubtopicNote } from "@/app/notes/_types";

export const GAUSS_ES_NOTE: SubtopicNote = {
  subtopicName: "Electric Flux and Gauss's Law",
  title: "Electric Flux and Gauss's Law",
  oneLineDefinition:
    "Flux counts the field through a surface, E·A; through any closed surface it equals the charge inside divided by ε₀, which gives flux by symmetry and, for symmetric charge, the field itself.",
  whyItMatters:
    "Thirty-five PYQs, twenty-five of them multiple choice, and four from 2026. Eight ask for the flux through a flat surface, or through a cube in a field that changes with position. Sixteen find the enclosed charge, or share a charge's flux among the faces of a cube by symmetry. Eleven use Gauss's law for the field of a sphere, a shell or a cylinder, sometimes starting from a given potential.",
  concepts: [
    // C1 — flux through surfaces and cubes
    {
      kind: "formula" as const,
      slug: "jpes-flux",
      name: "Flux through a surface and through a cube",
      intuition:
        "Flux measures how much field passes through a surface. Only the part of the field along the surface's normal counts, so a surface edge-on to the field carries none. For a cube in a field that points along x and changes with x, only the two faces facing the field carry flux. The net flux is what leaves through the far face minus what enters through the near one.",
      definition:
        "- \\(\\phi = \\vec E \\cdot \\vec A = EA\\cos\\theta\\), with \\(\\vec A\\) along the normal. Unit: N m² C⁻¹ (= V m).\n" +
        "- A surface in the yz-plane has \\(\\vec A\\) along \\(\\hat i\\); one parallel to the xz-plane, along \\(\\hat j\\); one in the xy-plane, along \\(\\hat k\\).\n" +
        "- Field \\(\\vec E = f(x)\\,\\hat i\\) through a cube of face area A between \\(x_1\\) and \\(x_2\\): \\(\\phi_{\\text{net}} = [f(x_2) - f(x_1)]A\\). The four faces parallel to the field carry nothing.\n" +
        "- A uniform field gives zero net flux through any closed surface.\n" +
        "- Enclosed charge from the net flux: \\(q = \\varepsilon_0\\phi_{\\text{net}}\\).",
      formula: {
        label: "Flux and Gauss's law",
        latex: "\\phi = \\vec E \\cdot \\vec A, \\qquad \\phi_{\\text{net}} = \\oint \\vec E \\cdot d\\vec A = \\frac{q_{\\text{enc}}}{\\varepsilon_0}",
      },
      authoredExample: {
        prompt:
          "The field in a region is \\(\\vec E = (5 + 2x)\\,\\hat i\\) N/C, with x in metres. A cube of side 0.5 m has its faces at \\(x = 1\\) m and \\(x = 1.5\\) m. Find the net flux and the charge inside. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\))",
        steps: [
          "Face area \\(A = 0.25\\ \\text{m}^{2}\\). Only the faces at x = 1 and x = 1.5 carry flux.",
          "Out through x = 1.5: \\(8 \\times 0.25 = 2\\). In through x = 1: \\(7 \\times 0.25 = 1.75\\).",
          "\\(\\phi_{\\text{net}} = 0.25\\ \\text{N m}^{2}\\,\\text{C}^{-1}\\). The constant part, 5, cancels.",
          "\\(q = 8.85 \\times 10^{-12} \\times 0.25 \\approx 2.2 \\times 10^{-12}\\) C.",
        ],
        answer: "0.25 N m² C⁻¹; about \\(2.2 \\times 10^{-12}\\) C.",
      },
      selfCheckExample: {
        prompt:
          "A uniform field \\(\\vec E = (3\\hat i + 4\\hat j + 5\\hat k)\\) N/C crosses a flat 2 m² square lying in the xz-plane. Flux through it?",
        steps: [
          "A square in the xz-plane has its normal along \\(\\hat j\\).",
          "\\(\\phi = E_y A = 4 \\times 2 = 8\\ \\text{N m}^{2}\\,\\text{C}^{-1}\\).",
        ],
        answer: "8 N m² C⁻¹",
      },
      practiceSet: [
        { prompt: "A 200 N/C field makes \\(60^{\\circ}\\) with the normal of a 0.5 m² surface. Flux?", answer: "50 N m² C⁻¹" },
        { prompt: "Net flux of a uniform field through a closed cube?", answer: "Zero" },
        { prompt: "\\(\\vec E = 6x^{2}\\,\\hat i\\) N/C. A cube of side 1 m runs from x = 0 to x = 1. Net flux?", answer: "6 N m² C⁻¹" },
        { prompt: "The net outward flux from a closed surface is \\(2 \\times 10^{3}\\) N m² C⁻¹. Charge inside? (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\))", answer: "\\(1.77 \\times 10^{-8}\\) C" },
      ],
      pyqExampleId: "d719b789-f78c-4963-90b7-123f5b9fbf21", // 2023: cube 0 ≤ x ≤ a in E = E₀x î, charge 288 × 10⁻¹⁴ C
      traps: [
        {
          title: "Name the normal, not the plane",
          body: "A surface 'in the yz-plane' or 'parallel to the yz-plane' has its normal along x. Taking the field's y-part for it gives the wrong flux.",
        },
        {
          title: "Only faces facing the field count",
          body: "When E points along x, the four faces parallel to x carry no flux. Do not multiply the field by the total area of the cube.",
        },
        {
          title: "Inward flux is negative",
          body: "Net flux is flux out minus flux in. Adding the two sizes gives a charge that is far too large.",
        },
      ],
    },

    // C2 — enclosed charge and symmetry
    {
      kind: "reference" as const,
      slug: "jpes-enclosed-charge",
      name: "Enclosed charge and sharing flux by symmetry",
      intuition:
        "The net flux through a closed surface depends only on the charge inside, never on the surface's size or shape or on charges outside. When a charge sits on the surface, imagine copies of the box stacked round it until the charge is at the centre of a larger symmetric shape. Its flux then shares equally among the identical faces, and your box gets its fraction.",
      definition:
        "- \\(\\phi = \\dfrac{q_{\\text{enc}}}{\\varepsilon_0}\\), whatever the shape or size of the surface.\n" +
        "- Charges outside change the field on the surface but add nothing to the net flux.\n" +
        "- A dipole, or any group with zero net charge, inside a surface gives zero net flux.\n" +
        "- A charge on the surface counts by the fraction of space the surface wraps round it: half on a flat face, a quarter on an edge, an eighth at a corner of a cube.\n" +
        "- A face that contains the charge carries no flux: the charge's field runs along that face.\n" +
        "- A line charge partly inside: only the length inside counts.",
      table: {
        columns: ["Charge q placed at", "Flux through the whole cube", "Flux through single faces", "How to see it"],
        rows: [
          { cells: ["Centre of the cube", "\\(q/\\varepsilon_0\\)", "\\(q/6\\varepsilon_0\\) through each face", "Six identical faces share it equally"] },
          { cells: ["Centre of one face", "\\(q/2\\varepsilon_0\\)", "Zero through the face it sits on", "A second cube on the other side takes the other half"] },
          { cells: ["Middle of an edge", "\\(q/4\\varepsilon_0\\)", "Zero through the two faces meeting at that edge", "Four cubes share the edge"] },
          { cells: ["A corner", "\\(q/8\\varepsilon_0\\)", "\\(q/24\\varepsilon_0\\) through each of the three far faces; zero through the three faces at the corner", "Eight cubes meet at the corner"], noteAmber: "The far faces get q/24ε₀ each, not q/8ε₀: three faces share the cube's eighth." },
          { cells: ["On the axis of a square of side a, at distance a/2", "\\(q/\\varepsilon_0\\) through the imagined cube of side a", "\\(q/6\\varepsilon_0\\) through the square", "The square is one face of a cube centred on q"] },
          { cells: ["Outside the cube", "Zero", "Inward on some faces, outward on others", "What enters also leaves"] },
        ],
        caption: "Stack copies of the box round the charge until it sits at a centre of symmetry, then divide.",
      },
      selfCheckExample: {
        prompt:
          "Charges \\(+3\\ \\mu\\text{C}\\) and \\(-5\\ \\mu\\text{C}\\) lie inside a closed surface, and \\(+7\\ \\mu\\text{C}\\) lies just outside. Net flux through the surface? (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\))",
        steps: [
          "Only the charges inside count: \\(3 - 5 = -2\\ \\mu\\text{C}\\).",
          "\\(\\phi = \\dfrac{-2 \\times 10^{-6}}{8.85 \\times 10^{-12}} \\approx -2.26 \\times 10^{5}\\ \\text{N m}^{2}\\,\\text{C}^{-1}\\).",
        ],
        answer: "About \\(-2.26 \\times 10^{5}\\) N m² C⁻¹ (net flux inward).",
      },
      practiceSet: [
        { prompt: "A charge q sits at the centre of a cube. Flux through two opposite faces together?", answer: "\\(q/3\\varepsilon_0\\)" },
        { prompt: "A charge q sits at a corner of a cube. Total flux through the cube?", answer: "\\(q/8\\varepsilon_0\\)" },
        { prompt: "A charge is enclosed by a sphere. The sphere's radius is doubled. Flux?", answer: "Unchanged" },
        { prompt: "A charge 2q sits at the centre of a cube and −q at the centre of one face. Net flux through the cube?", answer: "\\(3q/2\\varepsilon_0\\)", method: "The face charge counts half: \\(2q - q/2\\)." },
      ],
      pyqExampleId: "d72f5d73-5c9c-433f-98fc-fd8f32845843", // 2023: q at centre of the 2L × 2L face of a cuboid, flux through the opposite face q/6ε₀
      traps: [
        {
          title: "A charge on the surface counts in part",
          body: "A charge on a flat face is half inside the box. Counting all of it doubles the flux.",
        },
        {
          title: "Outside charges do not change the net flux",
          body: "They change the field at every point of the surface, so the flux through one face can change. The net flux through the closed surface stays q_enc/ε₀.",
        },
        {
          title: "The flat face of a hemisphere",
          body: "With the charge at the centre of the flat face, the field runs along that face and its flux is zero. The q/2ε₀ goes through the curved part.",
        },
      ],
    },

    // C3 — symmetric charge distributions
    {
      kind: "formula" as const,
      slug: "jpes-symmetric-gauss",
      name: "Gauss's law for spheres, shells and cylinders",
      intuition:
        "When charge is arranged with full symmetry, the field has the same size everywhere on a matching surface: a sphere for a sphere, a cylinder for a long line. Gauss's law then reduces to field times area equals enclosed charge over ε₀. Inside a uniformly charged solid sphere, only the charge closer to the centre counts, so the field grows with r and peaks at the surface.",
      definition:
        "- Uniform solid sphere (insulating), charge Q, radius R: \\(E = \\dfrac{kQr}{R^{3}} = \\dfrac{\\rho r}{3\\varepsilon_0}\\) inside, \\(\\dfrac{kQ}{r^{2}}\\) outside, largest at r = R.\n" +
        "- Thin shell or conducting sphere: zero inside, \\(\\dfrac{kQ}{r^{2}}\\) outside, \\(\\dfrac{\\sigma}{\\varepsilon_0}\\) just outside the surface.\n" +
        "- Long cylinder of uniform ρ and radius R: \\(E = \\dfrac{\\rho r}{2\\varepsilon_0}\\) inside, \\(\\dfrac{\\rho R^{2}}{2\\varepsilon_0 r}\\) outside.\n" +
        "- Density that varies with r: \\(q_{\\text{enc}} = \\displaystyle\\int_0^{r} \\rho(r')\\,4\\pi r'^{2}\\,dr'\\), then \\(E\\,4\\pi r^{2} = q_{\\text{enc}}/\\varepsilon_0\\).\n" +
        "- Given V(r): \\(E = -\\dfrac{dV}{dr}\\), then Gauss's law gives \\(q_{\\text{enc}}\\), or \\(\\rho = \\dfrac{\\varepsilon_0}{r^{2}}\\dfrac{d}{dr}(r^{2}E)\\).\n" +
        "- Conductors: zero field in the metal and in an empty cavity; excess charge sits on the surface. A charge q inside a neutral conducting shell induces −q on the inner surface and +q on the outer.",
      formula: {
        label: "Fields from Gauss's law",
        latex: "E_{\\text{sphere, in}} = \\frac{\\rho r}{3\\varepsilon_0}, \\qquad E_{\\text{cylinder, in}} = \\frac{\\rho r}{2\\varepsilon_0}, \\qquad E_{\\text{out}} = \\frac{kQ}{r^{2}}",
      },
      authoredExample: {
        prompt:
          "An insulating sphere of radius 10 cm carries \\(2\\ \\mu\\text{C}\\) spread uniformly through its volume. Find the field at 5 cm, at the surface and at 20 cm from the centre.",
        steps: [
          "\\(kQ = 9 \\times 10^{9} \\times 2 \\times 10^{-6} = 1.8 \\times 10^{4}\\ \\text{N m}^{2}\\,\\text{C}^{-1}\\).",
          "Inside, at 5 cm: \\(E = \\dfrac{kQr}{R^{3}} = \\dfrac{1.8 \\times 10^{4} \\times 0.05}{10^{-3}} = 9 \\times 10^{5}\\) N/C.",
          "At the surface: \\(\\dfrac{1.8 \\times 10^{4}}{0.01} = 1.8 \\times 10^{6}\\) N/C, the largest value.",
          "At 20 cm: \\(\\dfrac{1.8 \\times 10^{4}}{0.04} = 4.5 \\times 10^{5}\\) N/C.",
        ],
        answer: "\\(9 \\times 10^{5}\\), \\(1.8 \\times 10^{6}\\) and \\(4.5 \\times 10^{5}\\) N/C.",
      },
      selfCheckExample: {
        prompt:
          "A sphere of radius R has charge density \\(\\rho = \\rho_0 r/R\\). Find the field inside at radius r.",
        steps: [
          "\\(q_{\\text{enc}} = \\displaystyle\\int_0^{r} \\frac{\\rho_0 r'}{R}\\,4\\pi r'^{2}\\,dr' = \\frac{\\pi\\rho_0 r^{4}}{R}\\).",
          "\\(E \\cdot 4\\pi r^{2} = \\dfrac{\\pi\\rho_0 r^{4}}{R\\varepsilon_0}\\), so \\(E = \\dfrac{\\rho_0 r^{2}}{4\\varepsilon_0 R}\\).",
        ],
        answer: "\\(\\dfrac{\\rho_0 r^{2}}{4\\varepsilon_0 R}\\)",
      },
      practiceSet: [
        { prompt: "Field inside a charged conducting spherical shell?", answer: "Zero" },
        { prompt: "A long cylinder of radius R has uniform density ρ. Field at R/2 from the axis?", answer: "\\(\\rho R/4\\varepsilon_0\\)" },
        { prompt: "Inside a charged sphere, \\(V = 4 - 2r^{2}\\) (volts, r in metres). Field at r = 0.5 m?", answer: "2 V/m, outward" },
        { prompt: "A charge q is at the centre of a neutral thick conducting shell. Charge on the shell's outer surface?", answer: "+q" },
      ],
      pyqExampleId: "68c9e43d-e0b8-4b17-be93-d7e855906a54", // 2023: V = 2ar² + b inside a ball, ρ = −12aε
      traps: [
        {
          title: "Inside a solid sphere the field grows",
          body: "For a uniformly charged insulating sphere, E rises linearly from zero at the centre to its peak at the surface. Only outside does it fall as 1/r².",
        },
        {
          title: "'On the surface' of a shell",
          body: "Just outside a shell the field is σ/ε₀; just inside it is zero. Read which side the question means.",
        },
        {
          title: "Varying density needs an integral",
          body: "When ρ changes with r, the enclosed charge is ∫ρ 4πr² dr. Multiplying ρ(r) by the volume gives the wrong power of r.",
        },
      ],
    },
  ],
};
