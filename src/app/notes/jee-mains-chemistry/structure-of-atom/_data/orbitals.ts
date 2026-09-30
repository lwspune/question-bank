import type { SubtopicNote } from "@/app/notes/_types";

export const ORBITALS_ATOM_NOTE: SubtopicNote = {
  subtopicName: "Orbitals: Nodes, Shapes and Probability Plots",
  title: "Orbitals: Nodes, Shapes and Probability Plots",
  oneLineDefinition:
    "An orbital is a region where the electron is likely to be found. Its nodes, its shape and its probability plots all follow from n and l.",
  whyItMatters:
    "Fifteen PYQs, twelve of them multiple choice. Seven count radial and angular nodes or find where a node sits from the wave function; eight read probability-density and radial-distribution plots, boundary surfaces and orbital shapes. Two ideas cover the page.",
  concepts: [
    // C1 — radial and angular nodes
    {
      kind: "formula" as const,
      slug: "jcatom-nodes",
      name: "Radial and angular nodes",
      intuition:
        "A node is where the wave function is zero, so the electron is never found there. An orbital has \\(n-1\\) nodes in all. \\(l\\) of them are angular: flat planes or cones through the nucleus. The rest, \\(n-l-1\\), are radial: spherical shells at a fixed distance. A radial node sits where the radial part of \\(\\psi\\) changes sign.",
      definition:
        "- Radial nodes \\(=n-l-1\\).\n" +
        "- Angular nodes (nodal planes) \\(=l\\).\n" +
        "- Total nodes \\(=n-1\\).\n" +
        "- s orbitals have no angular node; p have one plane; d have two.\n" +
        "- To locate a radial node, set the factor of \\(\\psi\\) that can change sign to zero. For hydrogen 2s, \\(\\psi\\propto\\left(2-\\dfrac{r}{a_0}\\right)e^{-r/2a_0}\\) gives \\(r=2a_0\\).",
      formula: {
        label: "Node counts",
        latex: "\\text{radial}=n-l-1,\\qquad \\text{angular}=l",
      },
      authoredExample: {
        prompt: "Find the radial and angular nodes of a 5f and a 6p orbital.",
        steps: [
          "5f: \\(n=5, l=3\\). Radial \\(=5-3-1=1\\); angular \\(=3\\).",
          "6p: \\(n=6, l=1\\). Radial \\(=6-1-1=4\\); angular \\(=1\\).",
        ],
        answer: "5f: 1 radial, 3 angular. 6p: 4 radial, 1 angular.",
      },
      selfCheckExample: {
        prompt: "Which orbital has three radial nodes and one angular node?",
        steps: [
          "Angular nodes \\(=l=1\\), so it is a p orbital.",
          "\\(n-1-1=3\\) gives \\(n=5\\).",
        ],
        answer: "5p.",
      },
      practiceSet: [
        { prompt: "Radial nodes of a 4s orbital?", answer: "3" },
        { prompt: "Angular nodes of a 3d orbital?", answer: "2" },
        { prompt: "Total nodes of a 4p orbital?", answer: "3" },
        {
          prompt: "A wave function contains the factor \\(\\left(3-\\dfrac{r}{a_0}\\right)\\). Where is the radial node?",
          answer: "\\(r=3a_0\\)",
        },
      ],
      pyqExampleId: "25e5992e-a0dd-4cea-a543-ced6b98e13e1", // 2026 — match 2s, 3s, 3p, 4d with radial nodes and nodal planes
      traps: [
        {
          title: "Radial nodes are n − l − 1",
          body: "Not \\(n-l\\) and not \\(n-2\\). A 3s orbital has \\(3-0-1=2\\) radial nodes; a 3p has 1.",
        },
        {
          title: "A nodal plane is an angular node",
          body: "Nodal planes count \\(l\\), not radial nodes. A 2s orbital has one radial node and no nodal plane.",
        },
      ],
    },

    // C2 — probability plots, boundary surfaces and shapes (reference)
    {
      kind: "reference" as const,
      slug: "jcatom-probability-plots",
      name: "Probability plots, boundary surfaces and shapes",
      intuition:
        "Two different plots describe an orbital. \\(\\psi^2\\) is the probability density at a point. The radial distribution \\(4\\pi r^2\\psi^2\\) is the probability of finding the electron in a thin shell at distance \\(r\\). For 1s, the density is highest at the nucleus, but the shell is most likely at \\(a_0\\), because a shell far out has more volume.",
      definition:
        "- \\(\\psi^2\\) is never negative; it can only touch zero at a node.\n" +
        "- s orbitals have \\(\\psi^2\\) greatest at the nucleus; p and d orbitals have \\(\\psi^2=0\\) there.\n" +
        "- For hydrogen 1s, \\(4\\pi r^2\\psi^2\\) peaks at \\(a_0\\). The electron can still be found at any distance.\n" +
        "- The radial distribution of an orbital has \\(n-l\\) peaks, one more than its radial nodes.\n" +
        "- A **boundary surface** encloses about 90% of the probability, not 100%.\n" +
        "- Lobes along the axes: \\(p_x, p_y, p_z, d_{x^2-y^2}, d_{z^2}\\). Between the axes: \\(d_{xy}, d_{yz}, d_{xz}\\).\n" +
        "- The \\(2p_x\\) nodal plane is the yz plane. The + and − signs on lobes are phases of \\(\\psi\\), not charges.\n" +
        "- An orbital is fixed by \\(n\\), \\(l\\) and \\(m_l\\); \\(m_s\\) labels the electron, not the orbital.",
      table: {
        columns: ["Orbital", "ψ² at the nucleus", "Radial nodes", "Peaks in 4πr²ψ²", "Shape"],
        rows: [
          {
            cells: ["1s", "Maximum", "0", "One, at a₀ for H", "Sphere"],
            noteAmber: "The density ψ² peaks at the nucleus; only the radial probability peaks at a₀.",
            pyqExampleId: "b7d1e2fa-c30e-4cd3-80b7-e637361dcb2f",
          },
          {
            cells: ["2s", "Maximum", "1, at 2a₀ for H", "Two, the outer one larger", "Sphere"],
            pyqExampleId: "0200acd6-dbfc-409a-950e-2d33e25aca92",
          },
          { cells: ["2p", "Zero", "0", "One, at 4a₀ for H", "Two lobes, one nodal plane"] },
          { cells: ["3s", "Maximum", "2", "Three", "Sphere"] },
          { cells: ["3p", "Zero", "1", "Two", "Two lobes, one nodal plane"] },
          { cells: ["3d", "Zero", "0", "One, at 9a₀ for H", "Four lobes (d z² has two lobes and a ring), two nodal surfaces"] },
        ],
        caption: "For hydrogen, an orbital with no radial node (l = n − 1) has its radial peak at \\(n^2a_0\\).",
      },
      selfCheckExample: {
        prompt: "How many of \\(p_x, d_{yz}, d_{x^2-y^2}, d_{xy}, p_z\\) have their lobes along the axes?",
        steps: [
          "\\(p_x\\) and \\(p_z\\) lie along their own axes.",
          "\\(d_{x^2-y^2}\\) lies along x and y.",
          "\\(d_{yz}\\) and \\(d_{xy}\\) lie between the axes.",
        ],
        answer: "3.",
      },
      practiceSet: [
        { prompt: "Nodal plane of a \\(2p_z\\) orbital?", answer: "The xy plane" },
        { prompt: "What share of the probability does a boundary surface enclose?", answer: "About 90%" },
        { prompt: "Where is \\(\\psi^2\\) of a 2p orbital zero?", answer: "At the nucleus and on its nodal plane" },
        { prompt: "Peaks in the radial distribution of a 4s orbital?", answer: "4" },
      ],
      pyqExampleId: "d9a5a886-e956-444f-892c-5f3aebee570f", // 2025 — the false statement about the H 1s electron
      traps: [
        {
          title: "Density is not radial probability",
          body: "For 1s, \\(\\psi^2\\) is largest at the nucleus, while \\(4\\pi r^2\\psi^2\\) is largest at \\(a_0\\). Read the axis label before you read the curve.",
        },
        {
          title: "Signs on lobes are not charges",
          body: "The + and − on a p or d orbital are the sign of the wave function. They matter for bonding, not for charge.",
        },
      ],
    },
  ],
};
