import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_AN_DECAYS_NOTE: SubtopicNote = {
  subtopicName: "Radioactive Decays",
  title: "Alpha, Beta and Gamma Decay",
  oneLineDefinition:
    "The three ways an unstable nucleus changes: alpha decay, beta minus and beta plus decay, and gamma decay, how each changes A and Z, and the energy released in a decay (its Q value).",
  whyItMatters:
    "7 questions. One was set in a board paper: what is beta plus decay (2026). The textbook adds describing alpha, beta and gamma decays, completing decay equations, the energy released in an alpha decay, the largest kinetic energy of a positron, and the energy released in three reactions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpan-decay-types",
      name: "The three kinds of decay",
      intuition:
        "An unstable parent nucleus turns into a more stable daughter by throwing something out. A very heavy nucleus has too many protons pushing each other apart, so it throws out a whole helium nucleus. A nucleus with the wrong mix of protons and neutrons turns one into the other, sending out an electron or a positron. A nucleus left with spare energy simply gives it off as a gamma ray, like an atom giving off light, only with far more energy.",
      definition:
        "- **Radioactive decay:** an unstable parent nucleus changes into a daughter nucleus by emitting particles.\n" +
        "- **Alpha decay:** the nucleus emits an alpha particle (a helium nucleus), losing 2 protons and 2 neutrons: \\(^{A}_{Z}X \\to {}^{A-4}_{Z-2}Y + \\alpha\\). All nuclei with A greater than 210 undergo alpha decay, because the repulsion between their many protons is too large for the nuclear force.\n" +
        "- **Beta minus decay:** a neutron inside the nucleus becomes a proton, \\(n \\to p + e^- + \\bar{\\nu}\\) (antineutrino). A is unchanged, Z rises by 1.\n" +
        "- **Beta plus decay:** a proton inside the nucleus becomes a neutron, \\(p \\to n + e^+ + \\nu\\) (neutrino). A is unchanged, Z falls by 1. The positron is the antiparticle of the electron. A free proton cannot do this, as the neutron is heavier; inside a nucleus the extra energy comes from the rest of the nucleus.\n" +
        "- **Gamma decay:** a nucleus left in an excited state after an alpha or beta decay drops to a lower energy level and emits a gamma ray (a high-energy photon). A and Z do not change. Nuclear levels are keV to MeV apart, against a few eV in an atom.\n" +
        "- To complete a decay equation, balance A and Z separately on both sides.",
      table: {
        columns: ["Decay", "Emitted", "Change in A", "Change in Z", "Example"],
        rows: [
          { cells: ["Alpha", "Alpha particle (helium nucleus)", "Falls by 4", "Falls by 2", "\\(^{212}_{83}\\text{Bi} \\to {}^{208}_{81}\\text{Tl} + \\alpha\\)"] },
          { cells: ["Beta minus", "Electron and antineutrino", "Unchanged", "Rises by 1", "\\(^{60}_{27}\\text{Co} \\to {}^{60}_{28}\\text{Ni} + e^- + \\bar{\\nu}\\)"] },
          {
            cells: ["Beta plus", "Positron and neutrino", "Unchanged", "Falls by 1", "\\(^{22}_{11}\\text{Na} \\to {}^{22}_{10}\\text{Ne} + e^+ + \\nu\\)"],
            pyqExampleId: "355eec9e-f0e8-4739-8f1d-ad2a64dcb038",
            noteAmber: "Board 2026 asked what beta plus decay is.",
          },
          { cells: ["Gamma", "High-energy photon", "Unchanged", "Unchanged", "An excited nucleus drops to a lower level"] },
        ],
      },
      practiceSet: [
        { prompt: "Complete the decay: \\(^{238}_{92}\\text{U} \\to \\alpha + \\ ?\\)", answer: "\\(^{234}_{90}\\text{Th}\\)" },
        { prompt: "Which particle is emitted along with the positron in beta plus decay?", answer: "A neutrino" },
        { prompt: "Why can a free proton not undergo beta plus decay?", answer: "A neutron is heavier than a proton, so the energy is not available; inside a nucleus it comes from the rest of the nucleus" },
      ],
      traps: [
        {
          title: "Pairing the wrong neutrino",
          body: "Beta minus (an electron) comes with an antineutrino; beta plus (a positron) comes with a neutrino.",
        },
        {
          title: "Thinking the beta electron comes from the atom's orbits",
          body: "The electron of beta decay is made in the nucleus when a neutron turns into a proton. It is not one of the orbiting electrons.",
        },
        {
          title: "Defining beta plus decay without the equation",
          body: "For a 'what is' question, write the process \\(p \\to n + e^+ + \\nu\\) and the change \\(^{A}_{Z}X \\to {}^{A}_{Z-1}Y + e^+ + \\nu\\), and say that A stays the same while Z falls by 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpan-q-value",
      name: "Energy released in a decay: the Q value",
      intuition:
        "In every decay the products weigh a little less than the parent. That lost mass becomes the kinetic energy of the products, and its energy equivalent is called the Q value. The only care needed is with electrons: tables give the masses of whole atoms, electrons included, so count the electrons on both sides before you subtract.",
      definition:
        "- **Q value:** the energy equivalent of (mass before) minus (mass after); it appears as kinetic energy of the products. With masses in u, Q (MeV) = mass difference \\(\\times\\) 931.5.\n" +
        "- **Alpha decay**, atomic masses: \\(Q = [m_X - m_Y - m_{He}]c^2\\). The electrons balance, so atomic masses can be used directly.\n" +
        "- **Beta decay**, nuclear masses: \\(Q = [m_X - m_Y - m_e]c^2\\) (the neutrino's mass is negligible).\n" +
        "- With **atomic** masses: beta minus \\(Q = [m_X - m_Y]c^2\\) (the daughter atom already holds the extra electron); beta plus \\(Q = [m_X - m_Y - 2m_e]c^2\\).\n" +
        "- In beta decay Q is shared between the beta particle and the neutrino, so Q is the **largest** kinetic energy the beta particle can have.",
      formula: {
        label: "Q value",
        latex: "Q = \\left[m_X - m_Y - m_{He}\\right]c^2 \\ (\\alpha), \\qquad Q = \\left[m_X - m_Y - m_e\\right]c^2 \\ (\\beta,\\ \\text{nuclear masses})",
        symbols: [
          { symbol: "\\(m_X, m_Y\\)", meaning: "masses of the parent and the daughter" },
          { symbol: "\\(m_{He}\\)", meaning: "mass of a helium atom, 4.002603 u" },
          { symbol: "\\(m_e\\)", meaning: "mass of an electron, 0.00055 u" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the energy released in the beta minus decay \\(^{60}_{27}\\text{Co} \\to {}^{60}_{28}\\text{Ni} + e^- + \\bar{\\nu}\\). Atomic masses: Co 59.933817 u, Ni 59.930786 u; 1 u = 931.5 MeV.",
        steps: [
          "Given: \\(m_X = 59.933817\\) u, \\(m_Y = 59.930786\\) u, both ATOMIC masses.",
          "Count electrons: the cobalt atom has 27, the nickel atom 28, and the emitted electron makes up the difference. So with atomic masses, \\(Q = [m_X - m_Y]c^2\\).",
          "Substitution: \\(Q = (59.933817 - 59.930786) \\times 931.5 = 0.003031 \\times 931.5\\).",
          "\\(Q = 2.82\\) MeV.",
        ],
        answer: "2.82 MeV",
      },
      selfCheckExample: {
        prompt:
          "Find the energy released in the beta minus decay of tritium, \\(^{3}_{1}\\text{H} \\to {}^{3}_{2}\\text{He} + e^- + \\bar{\\nu}\\). Atomic masses: \\(^{3}\\text{H}\\) 3.016049 u, \\(^{3}\\text{He}\\) 3.016029 u.",
        steps: [
          "Atomic masses in beta minus decay: \\(Q = [m_X - m_Y]c^2 = 0.000020 \\times 931.5\\) MeV.",
          "\\(Q = 0.0186\\) MeV, that is 18.6 keV.",
        ],
        answer: "18.6 keV",
      },
      practiceSet: [
        { prompt: "A decay loses 0.005 u of mass. Find its Q value in MeV.", answer: "4.66 MeV" },
        { prompt: "In what form does the Q value of a decay appear?", answer: "As kinetic energy of the products" },
        { prompt: "With atomic masses, how many electron masses must be subtracted for a beta plus decay?", answer: "Two" },
      ],
      pyqExampleId: "97d1ed04-693f-4ecb-baf4-0f67dacd8a2c",
      traps: [
        {
          title: "One electron mass in beta plus decay with atomic masses",
          body: "The parent atom has one electron more than the daughter, and a positron is created too, so subtract \\(2m_e\\). The textbook's Example 15.8 subtracts only one and prints 2.33 MeV for sodium-22; the correct largest positron energy is 1.82 MeV.",
        },
        {
          title: "Subtracting products from products",
          body: "Q is parent minus products. If your Q comes out negative for a decay that happens on its own, a mass has gone on the wrong side.",
        },
      ],
    },
  ],
};
