import type { SubtopicNote } from "@/app/notes/_types";

export const UNIT_CELLS_NOTE: SubtopicNote = {
  subtopicName: "Unit Cells, Edge Length and Atomic Radius",
  title: "Unit Cells, Edge Length and Atomic Radius",
  oneLineDefinition:
    "The three cubic unit cells hold 1, 2 and 4 particles, and in each the atoms touch along one line — the edge, the body diagonal or the face diagonal — which fixes the edge length in terms of the atomic radius.",
  whyItMatters:
    "30 PYQs, none HARD — the most-asked calculation in the chapter. Nearly every one is 'given r find a' or 'given a find r' for a named cell, with the answer wanted in cm; the rest count particles per cell or coordination numbers. " +
    "Three relations and one unit conversion (1 pm = 10⁻¹⁰ cm) cover the page.",
  concepts: [
    // 1 — particles per cell and coordination number
    {
      kind: "formula" as const,
      slug: "cetss-particles-per-cell-and-coordination",
      name: "Particles Per Unit Cell and Coordination Number",
      intuition:
        "A corner particle is shared by 8 cells, a face particle by 2, an edge particle by 4, a body-centre particle by none. Add the fractions and the three cubic cells hold 1, 2 and 4 particles. Coordination number is how many nearest neighbours one particle touches: 6 in simple cubic, 8 in bcc, 12 in fcc and hcp.",
      definition:
        "- **Simple cubic**: \\(8 \\times \\tfrac{1}{8} = 1\\) particle. Coordination number 6. Polonium.\n" +
        "- **Body-centred cubic (bcc)**: \\(8 \\times \\tfrac{1}{8} + 1 = 2\\). Coordination number 8. Na, K, Fe, Cr.\n" +
        "- **Face-centred cubic (fcc = ccp)**: \\(8 \\times \\tfrac{1}{8} + 6 \\times \\tfrac{1}{2} = 4\\). Coordination number 12. Cu, Ag, Au, Al, Ni.\n" +
        "- **Base-centred**: \\(8 \\times \\tfrac{1}{8} + 2 \\times \\tfrac{1}{2} = 2\\).\n" +
        "- **hcp** also has coordination number 12 (6 in the layer, 3 above, 3 below). Zn, Mg, Cd.",
      formula: {
        label: "Sharing fractions",
        latex:
          "n = \\tfrac{1}{8}\\,n_{\\text{corner}} + \\tfrac{1}{2}\\,n_{\\text{face}} + \\tfrac{1}{4}\\,n_{\\text{edge}} + n_{\\text{body}}",
      },
      authoredExample: {
        prompt: "A cubic cell has particles at every corner and at the centre of every edge. How many particles does it hold?",
        steps: [
          "Corners: \\(8 \\times \\tfrac{1}{8} = 1\\). Edges: 12 edges, each shared by 4 cells: \\(12 \\times \\tfrac{1}{4} = 3\\).",
        ],
        answer: "\\(4\\)",
      },
      selfCheckExample: {
        prompt: "How many unit cells share one corner particle of a bcc cell, and what is the coordination number of a particle in hcp?",
        steps: [
          "Any corner of a cubic cell is shared by 8 cells (contribution \\(\\tfrac{1}{8}\\)).",
          "hcp, like fcc, is close packed: 12 nearest neighbours.",
        ],
        answer: "8; 12",
      },
      practiceSet: [
        { prompt: "Particles in a bcc unit cell?", answer: "2" },
        { prompt: "Particles in an fcc unit cell?", answer: "4" },
        { prompt: "Coordination number in simple cubic?", answer: "6" },
        { prompt: "Which metal has ccp structure: Cu, Zn, Mg or Po?", answer: "Cu" },
      ],
      pyqExampleId: "8e386ebe-785f-4b17-ae05-c70defc944ec",
      traps: [
        {
          title: "Counting the eight corners as eight particles",
          body:
            "Each corner particle belongs to eight cells, so the eight corners together contribute ONE. A simple cubic cell has 1 particle, not 8.",
        },
      ],
    },

    // 2 — edge length and radius
    {
      kind: "formula" as const,
      slug: "cetss-edge-length-and-radius",
      name: "Edge Length From Radius: Where the Atoms Touch",
      intuition:
        "In each cell the atoms are in contact along exactly one line. Simple cubic: along the edge, so \\(a = 2r\\). bcc: along the body diagonal of length \\(\\sqrt{3}a\\), which holds four radii. fcc: along the face diagonal of length \\(\\sqrt{2}a\\), which also holds four radii.",
      definition:
        "- Simple cubic: \\(a = 2r\\), \\(r = a/2\\).\n" +
        "- bcc: \\(\\sqrt{3}\\,a = 4r\\), so \\(a = \\dfrac{4r}{\\sqrt{3}} = 2.309\\,r\\) and \\(r = \\dfrac{\\sqrt{3}}{4}a = 0.433\\,a\\).\n" +
        "- fcc: \\(\\sqrt{2}\\,a = 4r\\), so \\(a = 2\\sqrt{2}\\,r = 2.828\\,r\\) and \\(r = \\dfrac{a}{2\\sqrt{2}} = 0.3535\\,a\\).\n" +
        "- Units: \\(1\\ \\text{pm} = 10^{-10}\\ \\text{cm}\\), \\(1\\ \\text{Å} = 100\\ \\text{pm} = 10^{-8}\\ \\text{cm}\\). The options are usually in cm — convert at the end.",
      formula: {
        label: "Edge–radius relations",
        latex:
          "a_{\\text{sc}} = 2r,\\qquad a_{\\text{bcc}} = \\frac{4r}{\\sqrt{3}},\\qquad a_{\\text{fcc}} = 2\\sqrt{2}\\,r",
      },
      authoredExample: {
        prompt: "A metal with atomic radius 160 pm forms a bcc lattice. Find the edge length in cm.",
        steps: [
          "\\(a = \\dfrac{4 \\times 160}{1.732} = 369.5\\) pm.",
          "\\(369.5\\ \\text{pm} = 3.695 \\times 10^{-8}\\ \\text{cm}\\).",
        ],
        answer: "\\(\\approx 3.70 \\times 10^{-8}\\ \\text{cm}\\)",
      },
      selfCheckExample: {
        prompt: "An fcc metal has edge length 361 pm. Find the atomic radius.",
        steps: [
          "\\(r = \\dfrac{a}{2\\sqrt{2}} = \\dfrac{361}{2.828} = 127.6\\) pm.",
        ],
        answer: "\\(\\approx 128\\ \\text{pm}\\)",
      },
      practiceSet: [
        { prompt: "Simple cubic, \\(a = 380\\) pm: \\(r\\)?", answer: "190 pm" },
        { prompt: "bcc, \\(r = 227\\) pm: \\(a\\) in cm?", answer: "\\(5.24 \\times 10^{-8}\\) cm" },
        { prompt: "fcc, \\(a = 405\\) pm: \\(r\\)?", answer: "143.2 pm" },
        { prompt: "Which relation is bcc: \\(a = 4r/\\sqrt{3}\\) or \\(a = \\sqrt{3}r/4\\)?", answer: "\\(a = 4r/\\sqrt{3}\\)" },
      ],
      pyqExampleId: "c1711f86-ef76-4a18-b176-8237ba879353",
      traps: [
        {
          title: "Inverting the bcc relation",
          body:
            "\\(a = \\sqrt{3}r/4\\) and \\(a = \\sqrt{3}/4 \\cdot r\\) are both offered beside the right \\(a = 4r/\\sqrt{3}\\). Check the size: \\(a\\) must be LARGER than \\(r\\) (about 2.3 times), so any option that makes \\(a\\) smaller than \\(r\\) is wrong.",
        },
      ],
    },

    // 3 — unit cell volume and the volume of the atoms in it
    {
      kind: "formula" as const,
      slug: "cetss-unit-cell-volume",
      name: "Unit Cell Volume and the Volume of Its Atoms",
      intuition:
        "Once the edge is known the cell volume is just \\(a^3\\); the volume the atoms occupy is \\(n \\times \\tfrac{4}{3}\\pi r^3\\). Substituting the edge–radius relation turns that into a multiple of \\(a^3\\) — for bcc, one atom is \\(\\sqrt{3}\\pi a^3/16\\) and both atoms are \\(\\sqrt{3}\\pi a^3/8\\).",
      definition:
        "- \\(V_{\\text{cell}} = a^3\\). Convert the edge to cm FIRST: \\(a = 400\\ \\text{pm} = 4 \\times 10^{-8}\\ \\text{cm}\\), so \\(a^3 = 6.4 \\times 10^{-23}\\ \\text{cm}^3\\).\n" +
        "- Volume of one atom \\(= \\tfrac{4}{3}\\pi r^3\\); volume of all atoms in the cell \\(= n \\cdot \\tfrac{4}{3}\\pi r^3\\).\n" +
        "- bcc in terms of \\(a\\) (\\(r = \\sqrt{3}a/4\\)): one atom \\(= \\dfrac{\\sqrt{3}\\pi a^3}{16}\\), two atoms \\(= \\dfrac{\\sqrt{3}\\pi a^3}{8}\\).\n" +
        "- fcc (\\(r = a/2\\sqrt{2}\\)): four atoms \\(= \\dfrac{\\pi a^3}{3\\sqrt{2}}\\). Simple cubic (\\(r = a/2\\)): one atom \\(= \\dfrac{\\pi a^3}{6}\\).\n" +
        "- Handy: \\(141.4\\ \\text{pm} \\approx 100\\sqrt{2}\\), so an fcc metal with \\(r = 141.4\\) pm has \\(a = 400\\) pm exactly.",
      formula: {
        label: "Cell volume and atom volume",
        latex:
          "V_{\\text{cell}} = a^3,\\qquad V_{\\text{atoms}} = n \\cdot \\tfrac{4}{3}\\pi r^3",
      },
      authoredExample: {
        prompt: "An fcc metal has atomic radius 106.05 pm. Find the unit cell volume in cm³.",
        steps: [
          "\\(a = 2\\sqrt{2} \\times 106.05 = 300\\) pm \\(= 3.0 \\times 10^{-8}\\) cm.",
          "\\(V = (3.0 \\times 10^{-8})^3 = 2.7 \\times 10^{-23}\\ \\text{cm}^3\\).",
        ],
        answer: "\\(2.7 \\times 10^{-23}\\ \\text{cm}^3\\)",
      },
      selfCheckExample: {
        prompt: "Express the total volume of the atoms in a bcc unit cell in terms of the edge \\(a\\).",
        steps: [
          "\\(r = \\sqrt{3}a/4\\), so \\(\\tfrac{4}{3}\\pi r^3 = \\tfrac{4}{3}\\pi \\cdot \\dfrac{3\\sqrt{3}a^3}{64} = \\dfrac{\\sqrt{3}\\pi a^3}{16}\\) per atom.",
          "Two atoms: \\(\\dfrac{\\sqrt{3}\\pi a^3}{8}\\).",
        ],
        answer: "\\(\\dfrac{\\sqrt{3}\\pi a^3}{8}\\)",
      },
      practiceSet: [
        { prompt: "Simple cubic, \\(r = 400\\) pm: cell volume?", answer: "\\(5.12 \\times 10^{-22}\\ \\text{cm}^3\\)" },
        { prompt: "Volume of ONE atom in bcc in terms of \\(a\\)?", answer: "\\(\\sqrt{3}\\pi a^3/16\\)" },
        { prompt: "Simple cubic, \\(r = 3 \\times 10^{-8}\\) cm: volume of the atom?", answer: "\\(1.13 \\times 10^{-22}\\ \\text{cm}^3\\)" },
        { prompt: "\\(a = 300\\) pm: \\(a^3\\) in cm³?", answer: "\\(2.7 \\times 10^{-23}\\)" },
      ],
      pyqExampleId: "7542b233-e406-48dd-99af-a143d7787e3e",
      traps: [
        {
          title: "Cubing the picometres",
          body:
            "\\(400^3\\ \\text{pm}^3\\) is not a number any option shows. Convert to cm before cubing: \\((4 \\times 10^{-8})^3 = 6.4 \\times 10^{-23}\\); cubing \\(10^{-8}\\) gives \\(10^{-24}\\), and the mantissa's cube moves the exponent up.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Packing Efficiency and Voids — how much of the cell the atoms fill",
      href: "/notes/mht-cet-chemistry/solid-state/cetss-packing-and-voids",
    },
    {
      label: "Density — the formula that uses n and a³ together",
      href: "/notes/mht-cet-chemistry/solid-state/cetss-density",
    },
  ],
};
