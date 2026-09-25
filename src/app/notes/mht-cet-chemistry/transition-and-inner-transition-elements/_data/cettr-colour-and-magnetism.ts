import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/transition-and-inner-transition-elements";

export const COLOUR_AND_MAGNETISM_NOTE: SubtopicNote = {
  subtopicName: "Colour, Magnetic Properties and Spin-Only Formula",
  title: "Colour and Magnetism of Transition Metal Ions",
  oneLineDefinition:
    "A transition metal ion is coloured when it has unpaired d electrons that can be promoted from one d level to another by visible light, so d⁰ and d¹⁰ ions are colourless; the same unpaired electrons make it paramagnetic, with a spin-only moment of √(n(n+2)) Bohr magnetons, and iron, cobalt and nickel are also ferromagnetic.",
  whyItMatters:
    "18 PYQs, none HARD. Four ask which ion is coloured or colourless (Sc³⁺, Zn²⁺ and Cu⁺ are the colourless ones); fourteen are magnetism — the spin-only value for Cu²⁺ (1.73 BM, twice), Zn²⁺ (0) and Cr²⁺ (4.90 BM), the ion with the highest or lowest moment, the ion with none, the pair with equal unpaired electrons, the formula itself, and the metal that is not ferromagnetic. " +
    "Two cards.",
  concepts: [
    // 1 — colour
    {
      kind: "formula" as const,
      slug: "cettr-colour-of-ions",
      name: "Coloured and Colourless Ions",
      intuition:
        "Colour comes from a d–d transition: the ion absorbs part of visible light to lift an electron to a higher d level, and we see the rest. That needs at least one electron in the d subshell AND a vacancy to move into. A d⁰ ion (Sc³⁺, Ti⁴⁺) has nothing to promote; a d¹⁰ ion (Zn²⁺, Cu⁺) has nowhere to put it. Both are colourless. Anything in between — Ti³⁺ d¹, V³⁺ d², Cr³⁺ d³, Fe²⁺ d⁶, Cu²⁺ d⁹ — is coloured.",
      definition:
        "- **Colourless**: d⁰ — \\(\\text{Sc}^{3+}\\), \\(\\text{Ti}^{4+}\\); d¹⁰ — \\(\\text{Zn}^{2+}\\), \\(\\text{Cu}^{+}\\), \\(\\text{Cd}^{2+}\\).\n" +
        "- **Coloured** (d¹–d⁹): \\(\\text{Ti}^{3+}\\) purple, \\(\\text{V}^{3+}\\) green, \\(\\text{Cr}^{3+}\\) violet, \\(\\text{Mn}^{2+}\\) pale pink, \\(\\text{Fe}^{2+}\\) pale green, \\(\\text{Fe}^{3+}\\) yellow, \\(\\text{Co}^{2+}\\) pink, \\(\\text{Ni}^{2+}\\) green, \\(\\text{Cu}^{2+}\\) blue.",
      formula: {
        label: "Colour condition",
        latex: "\\text{coloured} \\iff 1 \\le n_d \\le 9;\\quad d^0,\\ d^{10} \\Rightarrow \\text{colourless}",
      },
      authoredExample: {
        prompt: "Which of Ti⁴⁺, Ni²⁺, Cu⁺ and Sc³⁺ gives a coloured solution?",
        steps: [
          "Ti⁴⁺ d⁰, Sc³⁺ d⁰, Cu⁺ d¹⁰ are colourless. Ni²⁺ is d⁸.",
        ],
        answer: "Ni²⁺",
      },
      selfCheckExample: {
        prompt: "Which cation gives a colourless aqueous solution: Fe³⁺, Fe²⁺, Cu²⁺, Cu⁺?",
        steps: [
          "Cu⁺ is 3d¹⁰.",
        ],
        answer: "Cu⁺",
      },
      practiceSet: [
        { prompt: "Coloured compound in its state: Sc³⁺, Ti⁴⁺, Zn²⁺, Cr³⁺?", answer: "Cr³⁺" },
        { prompt: "Colourless solution: Ti³⁺, V³⁺, Sc³⁺, Cu²⁺?", answer: "Sc³⁺" },
        { prompt: "Coloured: Zn²⁺, Fe²⁺, Cu⁺, Sc³⁺?", answer: "Fe²⁺" },
      ],
      pyqExampleId: "1547628d-529b-432b-9f0a-0d076f3cea0c",
      traps: [
        {
          title: "Treating copper as always coloured",
          body:
            "Cu²⁺ (d⁹) is blue, but Cu⁺ (d¹⁰) is colourless. Count the d electrons of the ION, not the element.",
        },
      ],
    },

    // 2 — magnetism
    {
      kind: "formula" as const,
      slug: "cettr-spin-only-moment",
      name: "Unpaired Electrons and the Spin-Only Magnetic Moment",
      intuition:
        "Each unpaired electron adds to the magnetic moment; paired electrons cancel. Count the unpaired electrons n from the ion's d configuration (n for d¹–d⁵, 10 − n for d⁶–d¹⁰), then μ = √(n(n+2)) BM. The largest moment among 3d ions belongs to d⁵ (Mn²⁺, Fe³⁺: five unpaired, 5.92 BM); d⁰ and d¹⁰ ions (Sc³⁺, Zn²⁺) have none. Ions with the same d count have the same moment, whatever the element. Iron, cobalt and nickel go further — ferromagnetic, keeping their magnetism without a field; chromium does not.",
      definition:
        "- \\(\\mu = \\sqrt{n(n+2)}\\) BM: n = 0 → **0**; 1 → **1.73**; 2 → 2.83; 3 → 3.87; 4 → **4.90**; 5 → **5.92**.\n" +
        "- Unpaired: \\(\\text{Ti}^{3+}\\) 1, \\(\\text{V}^{3+}\\) 2, \\(\\text{Cr}^{3+}\\) 3, \\(\\text{Cr}^{2+}\\) 4, \\(\\text{Mn}^{2+}\\) 5, \\(\\text{Fe}^{3+}\\) 5, \\(\\text{Fe}^{2+}\\) 4, \\(\\text{Co}^{2+}\\) 3, \\(\\text{Ni}^{2+}\\) 2, \\(\\text{Cu}^{2+}\\) 1, \\(\\text{Sc}^{3+}\\) and \\(\\text{Zn}^{2+}\\) 0.\n" +
        "- Same number of unpaired electrons: \\(\\text{Fe}^{3+}\\) and \\(\\text{Mn}^{2+}\\) (both d⁵).\n" +
        "- **Ferromagnetic**: Fe, Co, Ni. **Cr is not.**",
      formula: {
        label: "Spin-only magnetic moment",
        latex: "\\mu = \\sqrt{n(n+2)}\\ \\text{BM}",
      },
      authoredExample: {
        prompt: "Find the spin-only moment of Fe²⁺ (Z = 26).",
        steps: [
          "26 − 18 − 2 = 6 d electrons, so 10 − 6 = 4 unpaired.",
          "μ = √(4 × 6) = √24 = 4.90 BM.",
        ],
        answer: "4.90 BM",
      },
      selfCheckExample: {
        prompt: "Which ion has the lowest spin-only moment: V³⁺, Cr³⁺, Mn²⁺, Fe²⁺?",
        steps: [
          "Unpaired: V³⁺ 2, Cr³⁺ 3, Mn²⁺ 5, Fe²⁺ 4.",
        ],
        answer: "V³⁺",
      },
      practiceSet: [
        { prompt: "Spin-only moment of Cu²⁺?", answer: "1.73 BM" },
        { prompt: "Spin-only moment of Cr²⁺?", answer: "4.90 BM" },
        { prompt: "Highest moment in the +2 state: Fe, Cr, Mn, Ni?", answer: "Mn" },
        { prompt: "No magnetic moment in the +3 state: Cr, V, Ti, Sc?", answer: "Sc" },
        { prompt: "Not ferromagnetic: Cr, Fe, Co, Ni?", answer: "Cr" },
      ],
      pyqExampleId: "553c9072-e75d-495a-866a-5fab0f80500d",
      traps: [
        {
          title: "Counting all the d electrons as unpaired",
          body:
            "Beyond d⁵ the electrons pair: Cu²⁺ (d⁹) has one unpaired electron, not nine, and Zn²⁺ (d¹⁰) has none.",
        },
        {
          title: "Calling every paramagnetic metal ferromagnetic",
          body:
            "Chromium has unpaired electrons and is paramagnetic, but only iron, cobalt and nickel are ferromagnetic — they stay magnetised when the field is removed.",
        },
      ],
    },
  ],
  related: [
    { label: "Position and Configuration — counting d electrons in an ion", href: `${BASE}/cettr-position-and-configuration` },
    { label: "Coordination Compounds — how ligands pair electrons", href: "/notes/mht-cet-chemistry/coordination-compounds/cetcc-bonding-and-stability" },
  ],
};
