import type { SubtopicNote } from "@/app/notes/_types";

export const MOI_ROT_NOTE: SubtopicNote = {
  subtopicName: "Moment of Inertia and Radius of Gyration",
  title: "Moment of Inertia and Radius of Gyration",
  oneLineDefinition:
    "Moment of inertia, I = Σmr², measures how hard a body is to spin about an axis; the radius of gyration k is the distance at which all the mass would give the same I, so I = Mk².",
  whyItMatters:
    "Eighteen PYQs, twelve of them asking for a number, and three from 2026. Ten use the standard results directly: compare bodies of the same mass and radius, or find a radius of gyration. Eight change the body first: the same material at a new radius or thickness, a piece carved out, a rod bent into a ring, a sphere remoulded into new shapes.",
  concepts: [
    // C1 — the standard table
    {
      kind: "reference" as const,
      slug: "jprot-moi-standard",
      name: "Moments of inertia of standard bodies",
      intuition:
        "Moment of inertia adds up each bit of mass times the square of its distance from the axis. Mass far from the axis counts for a lot. That is why a ring, with all its mass on the rim, has the largest I for a given mass and radius, and a solid sphere, with mass packed near the centre, has one of the smallest.",
      definition:
        "- \\(I = \\sum m_ir_i^{2}\\), with \\(r_i\\) the perpendicular distance from the AXIS (not from a point).\n" +
        "- Radius of gyration: \\(I = Mk^{2}\\), so \\(k = \\sqrt{I/M}\\).\n" +
        "- Same mass and radius: ring about its axis \\(MR^{2}\\) > hollow sphere \\(\\tfrac{2}{3}MR^{2}\\) > disc or solid cylinder about the axis \\(\\tfrac{1}{2}MR^{2}\\) (equal to a ring about a diameter) > solid sphere \\(\\tfrac{2}{5}MR^{2}\\).\n" +
        "- A disc has three symmetry axes through its centre, but k about a diameter is R/2 and about the normal axis R/√2: k depends on the axis.\n" +
        "- A semicircular ring about the normal axis through its centre has all its mass at R, so I = MR², the same as a full ring of that mass.\n" +
        "- A body with a large I keeps turning: a fan switched off slows only gradually.",
      table: {
        columns: ["Body", "Axis", "Moment of inertia", "Radius of gyration"],
        rows: [
          { cells: ["Thin ring, radius R", "Through the centre, normal to the plane", "\\(MR^{2}\\)", "\\(R\\)"] },
          { cells: ["Thin ring, radius R", "A diameter", "\\(\\tfrac{1}{2}MR^{2}\\)", "\\(R/\\sqrt{2}\\)"] },
          { cells: ["Disc, radius R", "Through the centre, normal to the plane", "\\(\\tfrac{1}{2}MR^{2}\\)", "\\(R/\\sqrt{2}\\)"] },
          { cells: ["Disc, radius R", "A diameter", "\\(\\tfrac{1}{4}MR^{2}\\)", "\\(R/2\\)"], noteAmber: "Half the normal-axis value, by the perpendicular-axis theorem." },
          { cells: ["Solid cylinder, radius R", "Its own axis", "\\(\\tfrac{1}{2}MR^{2}\\)", "\\(R/\\sqrt{2}\\)"] },
          { cells: ["Thin-walled hollow cylinder, radius R", "Its own axis", "\\(MR^{2}\\)", "\\(R\\)"] },
          { cells: ["Solid cylinder, radius R, length L", "Through the centre, normal to its axis", "\\(M\\left(\\tfrac{R^{2}}{4} + \\tfrac{L^{2}}{12}\\right)\\)", "\\(\\sqrt{\\tfrac{R^{2}}{4} + \\tfrac{L^{2}}{12}}\\)"] },
          { cells: ["Solid sphere, radius R", "A diameter", "\\(\\tfrac{2}{5}MR^{2}\\)", "\\(\\sqrt{2/5}\\,R\\)"] },
          { cells: ["Thin hollow sphere, radius R", "A diameter", "\\(\\tfrac{2}{3}MR^{2}\\)", "\\(\\sqrt{2/3}\\,R\\)"] },
          { cells: ["Thin rod, length L", "Through the centre, normal to the rod", "\\(\\tfrac{1}{12}ML^{2}\\)", "\\(L/(2\\sqrt{3})\\)"] },
          { cells: ["Thin rod, length L", "Through one end, normal to the rod", "\\(\\tfrac{1}{3}ML^{2}\\)", "\\(L/\\sqrt{3}\\)"] },
          { cells: ["Rectangular plate, sides a and b", "Through the centre, normal to the plate", "\\(\\tfrac{1}{12}M(a^{2} + b^{2})\\)", "\\(\\sqrt{(a^{2} + b^{2})/12}\\)"] },
          { cells: ["Semicircular ring, radius R", "Through the centre, normal to the plane", "\\(MR^{2}\\)", "\\(R\\)"] },
        ],
        caption: "M is the body's mass. Every value is about an axis through the centre of mass, except the rod about its end.",
      },
      selfCheckExample: {
        prompt:
          "A ring and a disc have the same mass, and the same moment of inertia about their own normal axes. Find the ratio of their radii, ring : disc.",
        steps: [
          "\\(MR_{\\text{ring}}^{2} = \\tfrac{1}{2}MR_{\\text{disc}}^{2}\\).",
          "\\(\\dfrac{R_{\\text{ring}}}{R_{\\text{disc}}} = \\dfrac{1}{\\sqrt{2}}\\).",
        ],
        answer: "\\(1 : \\sqrt{2}\\)",
      },
      practiceSet: [
        { prompt: "The radius of gyration of a thin rod 1.2 m long about a normal axis through its centre?", answer: "\\(0.2\\sqrt{3}\\) m, about 0.35 m" },
        { prompt: "Same mass and radius. Rank by moment of inertia: ring (axis), disc (axis), solid sphere (diameter), hollow sphere (diameter).", answer: "Ring > hollow sphere > disc > solid sphere" },
        { prompt: "Same mass and radius: k of a solid sphere (diameter) over k of a solid cylinder (own axis)?", answer: "\\(2/\\sqrt{5}\\)" },
        { prompt: "A disc of radius R: radius of gyration about a diameter, and about its normal axis?", answer: "R/2 and \\(R/\\sqrt{2}\\)" },
      ],
      pyqExampleId: "f597c3ae-e1c5-4a6e-bc0b-520bf3fd2380", // 2022: four bodies of mass M and radius 2R, find x
      traps: [
        {
          title: "Disc about a diameter is not MR²/2",
          body: "MR²/2 is a disc about its normal axis. About a diameter it is MR²/4. A ring about a diameter is MR²/2, which is easy to confuse with the disc.",
        },
        {
          title: "The radius of gyration is squared in I",
          body: "I = Mk², so k = √(I/M). A ratio of radii of gyration is the square root of a ratio of moments of inertia (for equal masses), not the ratio itself.",
        },
        {
          title: "Read the radius off the stem",
          body: "If the bodies have radius 2R, every I picks up a factor of 4. A stem that gives a diameter needs halving before it goes into MR².",
        },
      ],
    },

    // C2 — scaling and reshaping
    {
      kind: "formula" as const,
      slug: "jprot-moi-scaling",
      name: "Moment of inertia when a body is resized or reshaped",
      intuition:
        "A moment of inertia is a shape factor times mass times a length squared. When the size or the material changes, the mass changes too: mass is density times volume. So write the mass in terms of density and dimensions first, then put it into the standard formula.",
      definition:
        "- Mass \\(= \\rho \\times\\) volume. A disc: \\(M = \\rho\\pi R^{2}t\\), so \\(I = \\tfrac{1}{2}MR^{2} = \\tfrac{1}{2}\\rho\\pi R^{4}t\\).\n" +
        "- Same material and thickness: \\(I \\propto R^{4}\\). Same material, equal I: \\(R_1^{4}t_1 = R_2^{4}t_2\\).\n" +
        "- Same MASS: \\(I \\propto R^{2}\\), whatever the material.\n" +
        "- A coaxial cylinder of radius R/3 and length L/2 carved from a cylinder of mass M has mass \\(M \\times \\tfrac{1}{9} \\times \\tfrac{1}{2} = M/18\\) and \\(I = \\tfrac{1}{2}(M/18)(R/3)^{2} = MR^{2}/324\\), so the original's I is 162 times the carved piece's.\n" +
        "- A rod of length L bent into a ring: \\(2\\pi R = L\\), so \\(R = L/2\\pi\\) and \\(I = ML^{2}/4\\pi^{2}\\).\n" +
        "- Remoulding keeps volume: a sphere of an eighth of the mass has half the radius.",
      formula: {
        label: "Disc in terms of density, and mass from volume",
        latex: "I_{\\text{disc}} = \\tfrac{1}{2}MR^{2} = \\tfrac{1}{2}\\rho\\pi R^{4}t \\qquad M = \\rho V",
      },
      authoredExample: {
        prompt:
          "A disc of radius 10 cm and thickness 4 mm has moment of inertia I about its axis. A disc of the same material has radius 20 cm and thickness 1 mm. Find its moment of inertia about its axis.",
        steps: [
          "Same material: \\(I \\propto R^{4}t\\).",
          "\\(\\dfrac{I'}{I} = \\left(\\dfrac{20}{10}\\right)^{4} \\times \\dfrac{1}{4} = 16 \\times \\dfrac{1}{4} = 4\\).",
        ],
        answer: "\\(4I\\)",
      },
      selfCheckExample: {
        prompt:
          "A uniform rod of mass M and length L is bent into a circular ring. Find the ratio of the ring's moment of inertia about its normal axis to the rod's moment of inertia about a normal axis through its centre.",
        steps: [
          "Ring: \\(R = \\dfrac{L}{2\\pi}\\), so \\(I_{\\text{ring}} = M\\dfrac{L^{2}}{4\\pi^{2}}\\).",
          "Rod: \\(I_{\\text{rod}} = \\dfrac{ML^{2}}{12}\\).",
          "\\(\\dfrac{I_{\\text{ring}}}{I_{\\text{rod}}} = \\dfrac{12}{4\\pi^{2}} = \\dfrac{3}{\\pi^{2}}\\).",
        ],
        answer: "\\(3/\\pi^{2}\\)",
      },
      practiceSet: [
        { prompt: "Two discs of the same material and thickness; one has twice the radius. Ratio of I, large : small?", answer: "16 : 1" },
        { prompt: "A sphere of radius R is melted into 8 equal spheres. The radius of each?", answer: "R/2" },
        { prompt: "A coaxial cylinder of radius R/2 and the same length is carved from a solid cylinder of mass M. Its mass?", answer: "M/4" },
        { prompt: "Two discs of equal mass have radii R and 2R. Ratio of their I about the axis?", answer: "1 : 4" },
      ],
      pyqExampleId: "862bbce6-16ae-4835-a6c2-154a26a04471", // 2026: sphere split into a small sphere and a disc of radius 2R
      traps: [
        {
          title: "The new piece keeps the old mass",
          body: "A piece cut or remoulded from a body has its own mass, found from its volume. Putting the original M into the new piece's formula is the usual wrong answer.",
        },
        {
          title: "I ∝ R⁴ only for the same material and thickness",
          body: "For equal masses, I goes as R². The fourth power appears only when the mass itself grows with R², as for discs cut from the same sheet.",
        },
      ],
    },
  ],
};
