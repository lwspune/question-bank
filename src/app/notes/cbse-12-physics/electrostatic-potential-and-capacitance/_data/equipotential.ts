import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EP_EQUIPOTENTIAL_NOTE: SubtopicNote = {
  subtopicName: "Equipotential Surfaces",
  title: "Equipotential Surfaces and the Field from the Potential",
  oneLineDefinition:
    "Surfaces of constant potential, their shapes and properties, how the field follows from the way the potential changes, and the uniform field between two charged plates.",
  whyItMatters:
    "14 questions, thirteen of them from board papers. The board asks you to draw field lines and equipotential surfaces for a dipole and for two equal positive charges and explain why the field is normal to the surface (2026), find the field from a given potential such as V = 10 − 50x (2026), compare the work done along paths drawn across equipotentials (2025), hold a charged particle still between two plates (2025), and answer a case study on pairs of charged plates (2024).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpep-surfaces",
      name: "Equipotential surfaces: shapes and properties",
      intuition:
        "Equipotential surfaces are like the contour lines on a map of a hill: every point on one line is at the same height. Field lines cross them at right angles and point downhill, from higher to lower potential. Where the surfaces crowd together, the potential changes fast and the field is strong.",
      definition:
        "- An **equipotential surface** has the same potential at every point on it.\n" +
        "- **No work** is done in moving a charge from one point to another on it.\n" +
        "- The field is **normal** to it at every point. If the field had a component along the surface, moving a charge along the surface would need work, but the potential does not change there, so the work must be zero.\n" +
        "- Two equipotential surfaces **never intersect**: a point on both would have two values of potential.\n" +
        "- For equal steps of potential, the surfaces are **closer together where the field is stronger**.\n" +
        "- In a drawing, show field lines with arrows and equipotential surfaces as dashed lines crossing them at right angles. The labelled diagram carries the marks.",
      table: {
        columns: ["Charge system", "Shape of the equipotential surfaces", "What the drawing must show"],
        rows: [
          { cells: ["Single point charge", "Concentric spheres centred on the charge", "Radial field lines meeting every sphere at right angles"] },
          { cells: ["Uniform field along the x axis", "Planes normal to the x axis, parallel to the y-z plane", "Equally spaced parallel planes crossed by straight parallel field lines"] },
          {
            cells: ["Dipole, +q and −q", "Closed surfaces round each charge; the plane bisecting the dipole is at zero potential", "Field lines curving from +q to −q, crossed at right angles by the equipotentials"],
            noteAmber: "Board 2026 asked for this drawing and why the field must be normal to the surface.",
          },
          {
            cells: ["Two equal positive charges", "Closed surfaces round each charge that join into one surface further out", "Field lines bending away from each other, with zero field at the midpoint"],
            pyqExampleId: "463f473e-5770-4239-ba49-c26fed61166f",
            noteAmber: "Board 2026 asked for this drawing, then why the field need not be the same at every point of an equipotential.",
          },
          {
            cells: ["Any group of charges with a total charge not zero, seen from far away", "Nearly spheres", "The group looks like one point charge at large distance"],
            pyqExampleId: "2f682d6a-9182-45a1-ba70-c0e6e6ca69ed",
            noteAmber: "Board 2024 asked this as a one-mark question.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "In a region, flat equipotential surfaces are 0.1 m apart and each is 5 V lower than the one before it. Find the size and direction of the electric field.",
        steps: ["\\(E = \\dfrac{\\Delta V}{\\Delta l} = \\dfrac{5}{0.1} = 50\\) V/m.", "It is normal to the surfaces, pointing towards the lower potential."],
        answer: "50 V/m, normal to the surfaces, towards lower potential",
      },
      practiceSet: [
        { prompt: "Why can two equipotential surfaces never cross each other?", answer: "At the crossing point the potential would have two different values" },
        { prompt: "How much work is done in moving a 5 µC charge 2 m along an equipotential surface?", answer: "Zero" },
        { prompt: "What is the shape of the equipotential surfaces of a single point charge?", answer: "Concentric spheres centred on the charge" },
      ],
      pyqExampleId: "9e932c96-a74d-4745-8cc5-0d2241232497",
      traps: [
        {
          title: "A field along the surface",
          body: "The field can never have a component along an equipotential surface. Always draw the field lines crossing the surfaces at \\(90^\\circ\\).",
        },
        {
          title: "Same potential is not the same field",
          body: "On an equipotential of two equal positive charges the surfaces are closer in some places than others, so the field changes from point to point even though the potential does not.",
        },
        {
          title: "A drawing with no labels",
          body: "Mark the charges, put arrows on the field lines and draw the equipotentials dashed. An unlabelled sketch loses most of the marks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpep-gradient",
      name: "The field from the potential",
      intuition:
        "The field is the slope of the potential, taken with a minus sign. Where the potential drops fast, the field is strong; where the potential is flat, there is no field. The field always points in the direction in which the potential falls most steeply.",
      definition:
        "- \\(E = -\\dfrac{dV}{dr}\\): the size of the field is the fall in potential per unit distance, measured normal to the equipotential surface.\n" +
        "- The field points in the direction in which the potential **decreases steepest**.\n" +
        "- In two dimensions: \\(E_x = -\\dfrac{\\partial V}{\\partial x}\\) and \\(E_y = -\\dfrac{\\partial V}{\\partial y}\\).\n" +
        "- On a graph of V against x, the field is minus the slope. A charge feels the largest force where the graph is steepest, and no force where it is flat.\n" +
        "- A constant added to V gives no field: only the change in V matters.",
      formula: {
        label: "Field from potential",
        latex: "E = -\\frac{dV}{dr}, \\qquad E_x = -\\frac{\\partial V}{\\partial x}, \\quad E_y = -\\frac{\\partial V}{\\partial y}",
      },
      authoredExample: {
        prompt:
          "The potential along the x axis is \\(V = 4x^2 - 24x\\) volt, with x in metres. Find the electric field at \\(x = 1\\) m and at \\(x = 5\\) m, and the point where the field is zero.",
        steps: [
          "Formula: \\(E_x = -\\dfrac{dV}{dx}\\).",
          "\\(\\dfrac{dV}{dx} = 8x - 24\\), so \\(E_x = 24 - 8x\\).",
          "At \\(x = 1\\) m: \\(E_x = 24 - 8 = 16\\) V/m, along \\(+x\\).",
          "At \\(x = 5\\) m: \\(E_x = 24 - 40 = -16\\) V/m, that is 16 V/m along \\(-x\\).",
          "\\(E_x = 0\\) when \\(24 - 8x = 0\\), at \\(x = 3\\) m.",
        ],
        answer: "16 V/m along +x; 16 V/m along −x; zero at x = 3 m",
      },
      selfCheckExample: {
        prompt:
          "On a graph of V against x, the potential rises steadily from 0 to 12 V between x = 0 and x = 0.3 m, then stays at 12 V. Find the field in each part.",
        steps: [
          "First part: slope \\(= \\dfrac{12}{0.3} = 40\\) V/m, so \\(E_x = -40\\) V/m, that is 40 V/m along \\(-x\\).",
          "Second part: the graph is flat, so \\(E = 0\\).",
        ],
        answer: "40 V/m along −x, then zero",
      },
      practiceSet: [
        { prompt: "Where on a graph of potential against position does a charge feel the largest force?", answer: "Where the graph is steepest" },
        { prompt: "The potential is 6 V at every point of a region. What is the electric field there?", answer: "Zero" },
        { prompt: "In which direction does the electric field point, compared with the potential?", answer: "In the direction in which the potential decreases fastest" },
      ],
      pyqExampleId: "4a1f7a5b-6099-4721-b82c-9cc60c890c87",
      traps: [
        {
          title: "Dropping the minus sign",
          body: "\\(E = -dV/dx\\). Without the minus sign the field comes out pointing the wrong way, and the direction is usually what the options test.",
        },
        {
          title: "Looking for the highest potential",
          body: "The force is largest where the potential changes fastest, not where it is highest. A high but flat part of a V graph has no field at all.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpep-plates",
      name: "Uniform field between two charged plates",
      intuition:
        "Between two large parallel plates held at a potential difference, the field is the same everywhere and points from the plate at higher potential to the one at lower potential. So the potential falls in a straight line from one plate to the other, and a charge between them feels a steady force.",
      definition:
        "- \\(E = \\dfrac{V}{d}\\), uniform, from the plate at **higher** potential to the plate at **lower** potential.\n" +
        "- The potential varies **linearly** with distance: \\(V = V_0 - Ex\\).\n" +
        "- Force on a charge q: \\(F = qE\\). A positive charge accelerates towards the lower-potential plate; an electron towards the higher-potential plate.\n" +
        "- A charged particle stays at rest when the electric force balances its weight: \\(qE = mg\\), so \\(V = \\dfrac{mgd}{q}\\).\n" +
        "- A charge q moving through a potential difference V changes its kinetic energy by \\(qV\\).",
      formula: {
        label: "Parallel plates",
        latex: "E = \\frac{V}{d}, \\qquad F = qE, \\qquad \\Delta K = qV",
      },
      authoredExample: {
        prompt:
          "Two parallel plates 5 mm apart are held at a potential difference of 300 V. A proton is released from rest at the positive plate. Find the field between the plates and the kinetic energy of the proton when it reaches the negative plate. (Charge of a proton \\(= 1.6 \\times 10^{-19}\\) C.)",
        steps: [
          "Given: \\(V = 300\\) V, \\(d = 5\\) mm \\(= 5 \\times 10^{-3}\\) m.",
          "Field: \\(E = \\dfrac{V}{d} = \\dfrac{300}{5 \\times 10^{-3}} = 6 \\times 10^{4}\\) V/m.",
          "Kinetic energy gained: \\(\\Delta K = qV = 1.6 \\times 10^{-19} \\times 300\\).",
          "\\(\\Delta K = 4.8 \\times 10^{-17}\\) J, which is 300 eV.",
        ],
        answer: "6 × 10⁴ V/m; 4.8 × 10⁻¹⁷ J",
      },
      selfCheckExample: {
        prompt:
          "Two parallel plates 2 cm apart are at potentials of 40 V and −60 V. Find the size and direction of the field between them.",
        steps: ["Potential difference \\(= 40 - (-60) = 100\\) V.", "\\(E = \\dfrac{100}{0.02} = 5000\\) V/m, from the 40 V plate towards the −60 V plate."],
        answer: "5000 V/m, from the 40 V plate to the −60 V plate",
      },
      practiceSet: [
        { prompt: "An electron is released between two charged parallel plates. Towards which plate does it move?", answer: "Towards the plate at higher potential" },
        { prompt: "Two plates 4 mm apart have a potential difference of 12 V. Find the field between them.", answer: "3000 V/m" },
        { prompt: "How does the potential change with distance between two charged parallel plates?", answer: "Linearly" },
      ],
      pyqExampleId: "f88b3219-f918-49ae-92f9-4bfa630bd21a",
      traps: [
        {
          title: "Units not changed to SI",
          body: "Mass in mg, charge in nC and distance in cm must all go into kg, C and m before you substitute. Most wrong answers here come from one missed power of ten.",
        },
        {
          title: "An electron moving with the field",
          body: "The field points from high to low potential, but an electron is pushed the other way, towards the higher potential.",
        },
      ],
    },
  ],
};
