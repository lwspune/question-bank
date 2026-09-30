import type { SubtopicNote } from "@/app/notes/_types";

export const BOHR_ATOM_NOTE: SubtopicNote = {
  subtopicName: "Bohr Model: Radius, Energy and Velocity",
  title: "Bohr Model: Radius, Energy and Velocity",
  oneLineDefinition:
    "In a one-electron atom or ion, Bohr's orbits have fixed radii, energies and speeds, and each scales with the orbit number n and the nuclear charge Z.",
  whyItMatters:
    "Twenty-five PYQs, nineteen of them multiple choice, and five from 2026 — the largest page in the chapter. Seven scale an orbit radius with n²/Z; thirteen use the orbit energy, its kinetic and potential parts, the speed or the ionisation energy; five test what the Thomson, Rutherford and Bohr models could and could not explain. Three ideas cover the page.",
  concepts: [
    // C1 — orbit radius
    {
      kind: "formula" as const,
      slug: "jcatom-bohr-radius",
      name: "Orbit radius and its scaling",
      intuition:
        "Bohr fixed the electron's angular momentum at whole multiples of \\(h/2\\pi\\). That allows only certain orbits. Their radius grows as \\(n^2\\), because outer orbits are much farther out. It shrinks as \\(Z\\) grows, because a larger nuclear charge pulls the electron in. Only one-electron species obey it: H, \\(\\mathrm{He^+}\\), \\(\\mathrm{Li^{2+}}\\), \\(\\mathrm{Be^{3+}}\\).",
      definition:
        "- \\(mvr=\\dfrac{nh}{2\\pi}\\), \\(n=1,2,3,\\ldots\\)\n" +
        "- \\(r_n=a_0\\dfrac{n^2}{Z}\\), with \\(a_0=52.9\\ \\mathrm{pm}=0.529\\ \\mathrm{\\mathring{A}}\\).\n" +
        "- Ratio of two orbits: \\(\\dfrac{r_1}{r_2}=\\dfrac{n_1^2/Z_1}{n_2^2/Z_2}\\).\n" +
        "- **Ground state** is \\(n=1\\); the **first excited state** is \\(n=2\\).",
      formula: {
        label: "Bohr radius",
        latex: "r_n=52.9\\,\\frac{n^2}{Z}\\ \\mathrm{pm}",
      },
      authoredExample: {
        prompt: "An orbit of \\(\\mathrm{He^+}\\) has radius 238.05 pm. Which orbit is it?",
        steps: [
          "\\(52.9\\times\\dfrac{n^2}{2}=238.05\\), so \\(n^2=\\dfrac{2\\times238.05}{52.9}=9\\).",
          "So \\(n=3\\).",
        ],
        answer: "The third orbit (\\(n=3\\)).",
      },
      selfCheckExample: {
        prompt:
          "Find the ratio of the radius of the second orbit of \\(\\mathrm{He^+}\\) to that of the third orbit of \\(\\mathrm{Li^{2+}}\\).",
        steps: [
          "\\(\\mathrm{He^+}\\), \\(n=2\\): \\(\\dfrac{n^2}{Z}=\\dfrac{4}{2}=2\\).",
          "\\(\\mathrm{Li^{2+}}\\), \\(n=3\\): \\(\\dfrac{n^2}{Z}=\\dfrac{9}{3}=3\\).",
        ],
        answer: "\\(2:3\\).",
      },
      practiceSet: [
        { prompt: "Radius of the first orbit of \\(\\mathrm{Li^{2+}}\\)?", answer: "\\(17.6\\ \\mathrm{pm}\\)", method: "\\(52.9/3\\)" },
        { prompt: "\\(r_5:r_2\\) for hydrogen?", answer: "\\(25:4\\)" },
        {
          prompt: "Which orbit of \\(\\mathrm{Be^{3+}}\\) has the same radius as the first orbit of H?",
          answer: "\\(n=2\\)",
          method: "\\(n^2/4=1\\)",
        },
        { prompt: "Radius of the first excited state of H?", answer: "\\(211.6\\ \\mathrm{pm}\\)" },
      ],
      pyqExampleId: "b862a1c4-cb47-4828-ae6f-89291db92dd4", // 2026 — identify species and n from a radius of 70.53 pm
      traps: [
        {
          title: "The radius goes as n², not n",
          body: "The sixth orbit of H is \\(\\dfrac{36}{16}=2.25\\) times the fourth, not \\(\\dfrac{6}{4}\\) times. Square the orbit numbers before you divide.",
        },
        {
          title: "First excited state is n = 2",
          body: "\"First excited\" is one step above the ground state, so \\(n=2\\). Using \\(n=1\\) or \\(n=3\\) is the common slip.",
        },
      ],
    },

    // C2 — orbit energy, KE, PE, speed
    {
      kind: "formula" as const,
      slug: "jcatom-bohr-energy",
      name: "Orbit energy, kinetic and potential energy, and speed",
      intuition:
        "A bound electron has negative total energy. Zero is the free electron at rest far away. The energy grows with \\(Z^2\\) and falls with \\(n^2\\), so inner orbits of heavier ions are much deeper. Kinetic energy is the size of the total energy, and potential energy is twice the total. The speed grows with \\(Z\\) and falls with \\(n\\).",
      definition:
        "- \\(E_n=-2.18\\times10^{-18}\\dfrac{Z^2}{n^2}\\ \\mathrm{J}=-13.6\\dfrac{Z^2}{n^2}\\ \\mathrm{eV}\\).\n" +
        "- \\(KE=-E_n\\), \\(PE=2E_n\\).\n" +
        "- Ionisation energy from the ground state: \\(13.6Z^2\\ \\mathrm{eV}\\).\n" +
        "- Energy to move between levels: \\(\\Delta E=13.6Z^2\\left(\\dfrac{1}{n_1^2}-\\dfrac{1}{n_2^2}\\right)\\ \\mathrm{eV}\\).\n" +
        "- \\(v_n=2.18\\times10^{6}\\dfrac{Z}{n}\\ \\mathrm{m\\,s^{-1}}\\).\n" +
        "- Other scalings: frequency of revolution \\(\\propto Z^2/n^3\\); Coulomb force \\(\\propto Z^3/n^4\\).",
      formula: {
        label: "Bohr energy",
        latex: "E_n=-13.6\\,\\frac{Z^2}{n^2}\\ \\mathrm{eV}",
      },
      authoredExample: {
        prompt: "Find the energy needed to excite the electron of \\(\\mathrm{He^+}\\) from \\(n=1\\) to \\(n=3\\), in J and in eV.",
        steps: [
          "\\(\\Delta E=2.18\\times10^{-18}\\times2^2\\left(1-\\dfrac{1}{9}\\right)=8.72\\times10^{-18}\\times\\dfrac{8}{9}\\).",
          "\\(\\Delta E=7.75\\times10^{-18}\\ \\mathrm{J}\\).",
          "In eV: \\(13.6\\times4\\times\\dfrac{8}{9}=48.4\\ \\mathrm{eV}\\).",
        ],
        answer: "\\(7.75\\times10^{-18}\\ \\mathrm{J}\\), about 48.4 eV.",
      },
      selfCheckExample: {
        prompt: "For the electron in the second orbit of \\(\\mathrm{Li^{2+}}\\), find the total, kinetic and potential energy in eV.",
        steps: [
          "\\(E=-13.6\\times\\dfrac{9}{4}=-30.6\\ \\mathrm{eV}\\).",
          "\\(KE=-E=30.6\\ \\mathrm{eV}\\).",
          "\\(PE=2E=-61.2\\ \\mathrm{eV}\\).",
        ],
        answer: "\\(-30.6\\), \\(+30.6\\) and \\(-61.2\\ \\mathrm{eV}\\).",
      },
      practiceSet: [
        { prompt: "Ionisation energy of \\(\\mathrm{He^+}\\) in its ground state?", answer: "\\(54.4\\ \\mathrm{eV}\\)" },
        { prompt: "Speed of the electron in the second orbit of H?", answer: "\\(1.09\\times10^{6}\\ \\mathrm{m\\,s^{-1}}\\)" },
        { prompt: "Energy of the third orbit of H?", answer: "\\(-1.51\\ \\mathrm{eV}\\)" },
        { prompt: "How does the frequency of revolution scale?", answer: "\\(\\propto Z^2/n^3\\)" },
      ],
      pyqExampleId: "9a5d1684-fe25-49fb-a32e-7afde2858161", // 2026 — which stationary-state energy is right (third orbit of Li2+)
      traps: [
        {
          title: "Every orbit energy is negative",
          body: "A bound electron always has \\(E_n<0\\). An option with a plus sign on an orbit energy is wrong before you do any arithmetic. Kinetic energy is the only positive one.",
        },
        {
          title: "KE is minus E, PE is twice E",
          body: "\\(KE=-E_n\\) and \\(PE=2E_n\\). So for \\(E=-3.4\\ \\mathrm{eV}\\), \\(KE=+3.4\\ \\mathrm{eV}\\) and \\(PE=-6.8\\ \\mathrm{eV}\\).",
        },
      ],
    },

    // C3 — atomic models (reference)
    {
      kind: "reference" as const,
      slug: "jcatom-atomic-models",
      name: "Thomson, Rutherford, Bohr and the quantum model",
      intuition:
        "Each model fixed what the last one could not explain. Thomson spread the positive charge out. Rutherford's scattering put it in a tiny nucleus. Bohr's fixed orbits explained hydrogen's lines. The quantum model kept Bohr's stationary states and photons, but dropped the definite circular path.",
      definition:
        "- **Thomson**: positive charge spread evenly, electrons embedded in it. It predicts only small deflections of \\(\\alpha\\)-particles.\n" +
        "- **Rutherford**: a tiny, dense, positive nucleus. It explains large-angle scattering. It cannot explain why the atom is stable or why its spectrum has lines.\n" +
        "- **Bohr**: fixed orbits with \\(mvr=nh/2\\pi\\). It works only for one-electron species. It fails for the Zeeman (magnetic) and Stark (electric) splitting of lines, and a definite orbit breaks the uncertainty principle.\n" +
        "- **Quantum model**: the electron is a wave, described by an orbital (a probability region). It keeps stationary states and \\(\\Delta E=h\\nu\\).",
      table: {
        columns: ["Model", "Picture of the atom", "What it explained", "Where it failed"],
        rows: [
          {
            cells: [
              "Thomson",
              "Uniform sphere of positive charge with electrons embedded",
              "The atom is neutral overall",
              "Predicts only small deflections, so cannot explain large-angle scattering",
            ],
            noteAmber: "If Thomson were right, α-particles would pass through gold foil with only small deflections.",
            pyqExampleId: "1d07ba84-1dba-425d-9e05-b5929afb718a",
          },
          {
            cells: [
              "Rutherford",
              "Tiny dense positive nucleus with electrons around it",
              "Large-angle scattering; a few α-particles bounce back",
              "An orbiting electron should radiate and spiral in; no line spectrum",
            ],
          },
          {
            cells: [
              "Bohr",
              "Electrons in fixed circular orbits, mvr = nh/2π",
              "Stability and line spectrum of H, He⁺, Li²⁺",
              "Many-electron atoms (even Li⁺), Zeeman and Stark splitting; a definite path breaks the uncertainty principle",
            ],
            noteAmber: "Li⁺ has two electrons, so Bohr's theory does not apply to it. Li²⁺ has one.",
            pyqExampleId: "2eca1680-e736-4dfd-9358-9ab10c6f3c62",
          },
          {
            cells: [
              "Quantum mechanical",
              "Electron as a wave; orbitals are regions of probability ψ²",
              "All atoms, including many-electron ones",
              "Keeps stationary states and ΔE = hν, but drops the definite orbit",
            ],
          },
        ],
        caption: "The one Bohr postulate the quantum model rejects: the electron moves in a definite circular orbit.",
      },
      selfCheckExample: {
        prompt: "Does Bohr's theory explain the line spectrum of \\(\\mathrm{Li^{+}}\\)? Of \\(\\mathrm{Li^{2+}}\\)?",
        steps: [
          "Lithium has \\(Z=3\\). \\(\\mathrm{Li^{+}}\\) has \\(3-1=2\\) electrons.",
          "\\(\\mathrm{Li^{2+}}\\) has \\(3-2=1\\) electron.",
          "Bohr's theory holds only for one-electron species.",
        ],
        answer: "Not for \\(\\mathrm{Li^{+}}\\); yes for \\(\\mathrm{Li^{2+}}\\).",
      },
      practiceSet: [
        { prompt: "Which model first placed the positive charge in a tiny nucleus?", answer: "Rutherford" },
        { prompt: "Which effect of a magnetic field on spectral lines did Bohr fail to explain?", answer: "The Zeeman effect (splitting of lines)" },
        { prompt: "Is the quantisation of angular momentum a Bohr postulate?", answer: "Yes: \\(mvr=nh/2\\pi\\)" },
        { prompt: "Why does a Bohr orbit clash with Heisenberg?", answer: "It fixes both the position and the momentum of the electron" },
      ],
      pyqExampleId: "aa5436b8-abc3-4118-b96d-693413a864c9", // 2025 — the Bohr postulate that disagrees with the quantum model
      traps: [
        {
          title: "Li⁺ is not a one-electron ion",
          body: "Count the electrons: \\(\\mathrm{Li^{+}}\\) has two. Only \\(\\mathrm{H}\\), \\(\\mathrm{He^+}\\), \\(\\mathrm{Li^{2+}}\\), \\(\\mathrm{Be^{3+}}\\) and so on are hydrogen-like.",
        },
      ],
    },
  ],
};
