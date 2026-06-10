import type { SubtopicNote } from "@/app/notes/_types";

export const ATOMIC_STRUCTURE_NOTE: SubtopicNote = {
  subtopicName: "Atomic Structure",
  title: "Atomic Structure: Models, Shells, and Energy",
  oneLineDefinition:
    "The atom is a tiny dense nucleus (protons + neutrons) surrounded by electrons in fixed energy shells; a sequence of experiments — cathode rays, Rutherford scattering, Bohr's orbits — revealed this picture.",
  whyItMatters:
    "This is the densest recall block in the chapter — six PYQs, all EASY. " +
    "The NDA wants you to match each landmark experiment to what it discovered (Rutherford found the nucleus; cathode rays are electrons from the cathode; Bohr proposed stable orbits) and to recall fixed numbers (M-shell holds 18 electrons; hydrogen's ionisation energy is 13.6 eV). " +
    "These are near-free marks if you have the table memorised.",
  concepts: [
    // Concept 1 — cathode rays
    {
      kind: "reference" as const,
      slug: "cathode-rays",
      name: "Cathode rays — the discovery of the electron",
      intuition:
        "In a discharge tube at low pressure, a glowing stream travels from the negative electrode (cathode) to the positive one (anode). " +
        "These cathode rays turned out to be fast-moving electrons — the discovery that the atom contains negatively charged particles. " +
        "The exam loves to test their properties, especially the direction (cathode to anode) and what they actually are.",
      definition:
        "**Cathode rays** are streams of electrons emitted from the cathode (negative electrode) in a discharge tube.\n" +
        "- They travel **from cathode to anode** (negative to positive electrode).\n" +
        "- They are **negatively charged**, travel in **straight lines**, and are **deflected by electric and magnetic fields**.\n" +
        "- Their discovery (J. J. Thomson) revealed the **electron**.",
      table: {
        columns: ["Property of cathode rays", "Correct statement"],
        rows: [
          { cells: ["What they are", "A stream of electrons"], pyqExampleId: "dc3c7c25-095c-44a0-b6e4-c38d02c15388" },
          {
            cells: ["Direction of travel", "From cathode to anode (negative to positive)"],
            noteAmber: "NDA 2019 — the FALSE statement was \"cathode ray particles start from the anode and move towards the cathode.\" They go cathode to anode.",
          },
          { cells: ["Charge", "Negative"] },
          { cells: ["Path", "Straight line; deflected by electric and magnetic fields"] },
        ],
        caption:
          "The most common trap reverses the direction: cathode rays start at the CATHODE, not the anode.",
      },
      selfCheckExample: {
        prompt:
          "Which statement about cathode rays is NOT correct: (i) they are electrons, (ii) they travel from anode to cathode, (iii) they are negatively charged?",
        steps: [
          "Cathode rays are electrons — (i) is correct.",
          "They travel from cathode to anode, so \"anode to cathode\" is reversed — (ii) is the incorrect statement.",
          "They carry negative charge — (iii) is correct.",
        ],
        answer: "Statement (ii) is incorrect — cathode rays travel from cathode to anode, not anode to cathode.",
      },
      practiceSet: [
        { prompt: "Cathode rays are a stream of which particles?", answer: "Electrons" },
        { prompt: "In which direction do cathode rays travel?", answer: "From cathode to anode" },
        { prompt: "What is the charge on cathode rays?", answer: "Negative" },
        { prompt: "Discovery of cathode rays revealed which subatomic particle?", answer: "The electron" },
      ],
      pyqExampleId: "dc3c7c25-095c-44a0-b6e4-c38d02c15388", // 2019 — cathode rays not-correct
      traps: [
        {
          title: "Cathode to anode, never anode to cathode",
          body:
            "The single most-tested cathode-ray trap is the direction. Rays start at the CATHODE (the negative electrode) and move to the anode. Any option saying \"from anode to cathode\" is the false statement.",
        },
      ],
    },

    // Concept 2 — Rutherford scattering
    {
      kind: "reference" as const,
      slug: "rutherford-nucleus",
      name: "Rutherford's alpha-scattering — the nucleus",
      intuition:
        "Rutherford fired alpha particles at a thin gold foil. Most passed straight through, but a tiny fraction bounced almost straight back. " +
        "The only way to explain the rare big deflections was a tiny, dense, positively charged centre — the nucleus. " +
        "This overturned the earlier \"plum-pudding\" model where charge was spread out evenly.",
      definition:
        "**Rutherford's alpha-particle scattering experiment** discovered the **atomic nucleus**: a tiny, dense, positively charged core that contains almost all the atom's mass, with electrons around it.\n" +
        "- Most alpha particles passed undeflected (atom is mostly empty space).\n" +
        "- A few bounced back sharply (a concentrated positive nucleus).",
      table: {
        columns: ["Observation", "Conclusion"],
        rows: [
          { cells: ["Most alpha particles pass straight through", "Atom is mostly empty space"] },
          {
            cells: ["A few alpha particles deflect at large angles / rebound", "A tiny, dense, positively charged nucleus exists"],
            noteAmber: "NDA 2021 — Rutherford's alpha-scattering experiment discovered the atomic NUCLEUS.",
          },
          { cells: ["Almost all mass concentrated centrally", "Nucleus holds the protons (and neutrons)"] },
        ],
        caption:
          "Rutherford = nucleus. Do not confuse with Chadwick (neutron) or Thomson (electron).",
      },
      selfCheckExample: {
        prompt:
          "Rutherford's alpha-scattering experiment was responsible for the discovery of which part of the atom?",
        steps: [
          "Most alpha particles passing through showed the atom is mostly empty.",
          "The rare large-angle deflections required a tiny, dense, positive core.",
          "That core is the atomic nucleus.",
        ],
        answer: "The atomic nucleus.",
      },
      practiceSet: [
        { prompt: "Rutherford's alpha-scattering experiment discovered what?", answer: "The atomic nucleus" },
        { prompt: "Most alpha particles passing straight through showed the atom is mostly what?", answer: "Empty space" },
        { prompt: "Who discovered the neutron (not Rutherford)?", answer: "James Chadwick" },
        { prompt: "What charge does the nucleus carry?", answer: "Positive" },
      ],
      pyqExampleId: "8c9dc0a9-8a64-4b51-a32e-6cdc68a1a002", // 2021 — Rutherford discovered nucleus
      traps: [
        {
          title: "Rutherford found the nucleus, not the neutron",
          body:
            "Rutherford's scattering experiment discovered the NUCLEUS. The NEUTRON was discovered later by James Chadwick. Distractors swap these two.",
        },
      ],
    },

    // Concept 3 — Bohr's stable orbits
    {
      kind: "formula" as const,
      slug: "bohr-stable-orbits",
      name: "Bohr's model — electrons in stable orbits without radiating",
      intuition:
        "Classical physics said an orbiting electron should continuously radiate energy and spiral into the nucleus — but atoms are stable. " +
        "Niels Bohr fixed this by postulating that electrons can occupy only certain special orbits in which they do NOT radiate energy. " +
        "An electron only emits or absorbs energy when it jumps between these allowed orbits.",
      definition:
        "**Bohr's model** of the atom postulates that:\n" +
        "- Electrons revolve in certain **stable (allowed) orbits without emitting radiation**.\n" +
        "- Each orbit has a fixed energy; energy is **quantised**.\n" +
        "- Energy is emitted or absorbed only when an electron **jumps between orbits** (emits a photon dropping down, absorbs one going up).",
      formula: {
        label: "Bohr energy levels of hydrogen",
        latex: "E_n = -\\dfrac{13.6}{n^2}\\ \\text{eV}",
        symbols: [
          { symbol: "E_n", meaning: "energy of the n-th orbit (eV)" },
          { symbol: "n", meaning: "orbit number (1, 2, 3, ...)" },
          { symbol: "13.6 eV", meaning: "magnitude of the ground-state (n=1) energy of hydrogen" },
        ],
      },
      visualizationSlug: "mp-bohr-energy-levels",
      authoredExample: {
        prompt:
          "Which scientist proposed that an electron in an atom can revolve in certain stable orbits without emitting radiant energy?",
        steps: [
          "Classical theory predicted a radiating, spiralling electron — but atoms are stable.",
          "Niels Bohr resolved this by postulating special stable orbits in which the electron does not radiate.",
        ],
        answer: "Niels Bohr.",
      },
      selfCheckExample: {
        prompt:
          "Using \\(E_n = -13.6/n^2\\) eV, find the energy of hydrogen's second orbit (n = 2).",
        steps: [
          "Substitute \\(n = 2\\): \\(E_2 = -13.6 / 2^2\\).",
          "\\(2^2 = 4\\), so \\(E_2 = -13.6/4 = -3.4\\) eV.",
        ],
        answer: "\\(E_2 = -3.4\\) eV.",
      },
      practiceSet: [
        { prompt: "Who proposed electrons revolve in stable orbits without radiating?", answer: "Niels Bohr" },
        { prompt: "In Bohr's model, when does an electron emit a photon?", answer: "When it jumps to a lower orbit" },
        { prompt: "Is energy in Bohr's atom continuous or quantised?", answer: "Quantised" },
        { prompt: "Ground-state energy of the hydrogen atom?", answer: "\\(-13.6\\) eV" },
      ],
      pyqExampleId: "516d40d9-37b7-419c-a0de-7488f1264106", // 2024 — Bohr stable orbits
      traps: [
        {
          title: "Bohr's electrons radiate only when they JUMP",
          body:
            "An electron sitting in an allowed orbit does NOT radiate. Radiation (a photon) appears only during a transition between orbits — emitted when dropping down, absorbed when moving up.",
        },
      ],
    },

    // Concept 4 — shells and ionisation energy (REFERENCE)
    {
      kind: "reference" as const,
      slug: "shells-and-ionisation-energy",
      name: "Electron shells and ionisation energy — the fixed numbers",
      intuition:
        "Electrons fill shells labelled K, L, M, N (n = 1, 2, 3, 4). Each shell holds a maximum of \\(2n^2\\) electrons. " +
        "Ionisation energy is the energy needed to pull the outermost electron completely free of the atom. " +
        "For hydrogen this is exactly the depth of the ground state, 13.6 eV. These are pure recall facts the NDA repeats.",
      definition:
        "Key fixed numbers for atomic structure:\n" +
        "- **Maximum electrons in a shell** = \\(2n^2\\): K (n=1) holds 2, L (n=2) holds 8, **M (n=3) holds 18**, N (n=4) holds 32.\n" +
        "- **Ionisation energy of hydrogen** (ground state) = **13.6 eV** — the energy to remove its single electron.\n" +
        "- Energy stored in the bonds (links) between atoms is **chemical energy**.",
      table: {
        columns: ["Quantity", "Value", "How to get it"],
        rows: [
          { cells: ["K-shell (n=1) capacity", "2 electrons", "\\(2n^2 = 2(1)^2 = 2\\)"] },
          { cells: ["L-shell (n=2) capacity", "8 electrons", "\\(2n^2 = 2(2)^2 = 8\\)"] },
          {
            cells: ["M-shell (n=3) capacity", "18 electrons", "\\(2n^2 = 2(3)^2 = 18\\)"],
            noteAmber: "NDA 2021 — the M-shell holds a maximum of 18 electrons.",
          },
          { cells: ["N-shell (n=4) capacity", "32 electrons", "\\(2n^2 = 2(4)^2 = 32\\)"] },
          {
            cells: ["Hydrogen ionisation energy", "13.6 eV", "Depth of the n=1 ground state"],
            pyqExampleId: "dea80817-7c6d-4b8a-99a5-44eafbbd7c2b",
          },
          {
            cells: ["Energy in atomic bonds", "Chemical energy", "Stored in the links between atoms"],
            pyqExampleId: "08315c2c-a972-4e3c-bd24-3e657eab2421",
          },
        ],
        caption:
          "Shell capacity is 2n². Hydrogen ionisation energy 13.6 eV is the single most-repeated number in the chapter.",
      },
      selfCheckExample: {
        prompt:
          "What is the maximum number of electrons that the M-shell can hold?",
        steps: [
          "The M-shell is the third shell, so \\(n = 3\\).",
          "Maximum electrons = \\(2n^2 = 2 \\times 3^2 = 2 \\times 9 = 18\\).",
        ],
        answer: "18 electrons.",
      },
      practiceSet: [
        { prompt: "Maximum electrons in the M-shell?", answer: "18", method: "\\(2n^2\\) with \\(n=3\\)" },
        { prompt: "Ionisation energy of the hydrogen atom in its ground state?", answer: "13.6 eV" },
        { prompt: "Energy stored in the links/bonds between atoms is called what?", answer: "Chemical energy" },
        { prompt: "Maximum electrons in the L-shell?", answer: "8", method: "\\(2n^2\\) with \\(n=2\\)" },
      ],
      pyqExampleId: "acb7d495-1cd4-4d5b-95d0-7fe6037e628f", // 2021 — M-shell 18 electrons
      traps: [
        {
          title: "Shell capacity is 2n², not a fixed 8",
          body:
            "The \"octet\" of 8 is only the L-shell. The general rule is \\(2n^2\\): M (n=3) holds 18, N (n=4) holds 32. Do not cap every shell at 8.",
        },
        {
          title: "Hydrogen ionisation energy = 13.6 eV (positive energy IN)",
          body:
            "The ground-state energy is \\(-13.6\\) eV; the ionisation energy (the energy you must supply to free the electron) is \\(+13.6\\) eV. The exam answer is 13.6 eV.",
        },
      ],
    },
  ],
};
