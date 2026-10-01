import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_AT_PARTICLES_NOTE: SubtopicNote = {
  subtopicName: "Atomic Number, Isotopes and Isobars",
  title: "Atomic Number, Isotopes and Isobars",
  oneLineDefinition:
    "Counting protons, neutrons and electrons from Z, A and the charge, and telling isotopes, isobars and isoelectronic species apart.",
  whyItMatters:
    "Eight CDS questions, all EASY or MODERATE. The isotope–isobar swap is the favourite trap: four questions turn on which of the two shares the mass number.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdschat-counting",
      name: "Counting protons, neutrons and electrons",
      intuition:
        "The atomic number Z is the number of protons, and it fixes which element you have. The mass number A counts protons plus neutrons. A neutral atom has as many electrons as protons; each positive charge removes one electron and each negative charge adds one.",
      definition:
        "The rules:\n" +
        "- **Atomic number Z** = number of **protons**. It defines the element.\n" +
        "- **Mass number A** = protons + neutrons = number of **nucleons**.\n" +
        "- **Neutrons** = A − Z.\n" +
        "- **Electrons** = Z for a neutral atom; Z − q for an ion of charge +q, Z + q for charge −q.\n" +
        "- For a molecule or molecular ion, add the electrons of every atom, then adjust for the charge.",
      formula: {
        label: "Mass number and electron count",
        latex: "A = Z + N \\qquad e^{-} = Z - q",
        symbols: [
          { symbol: "\\(A\\)", meaning: "mass number (protons + neutrons)" },
          { symbol: "\\(Z\\)", meaning: "atomic number (protons)" },
          { symbol: "\\(N\\)", meaning: "number of neutrons" },
          { symbol: "\\(q\\)", meaning: "charge on the ion (+ or −)" },
        ],
      },
      authoredExample: {
        prompt: "A sodium ion is written \\(^{23}_{11}\\mathrm{Na^{+}}\\). How many protons, neutrons and electrons does it have?",
        steps: [
          "Protons = Z = 11.",
          "Neutrons = A − Z = 23 − 11 = 12.",
          "Electrons = Z − q = 11 − 1 = 10.",
        ],
        answer: "11 protons, 12 neutrons, 10 electrons.",
      },
      selfCheckExample: {
        prompt: "How many electrons are there in the nitrate ion, NO₃⁻? (N: Z = 7, O: Z = 8)",
        steps: [
          "Neutral NO₃ has 7 + 3 × 8 = 31 electrons.",
          "The charge is −1, so add one electron.",
        ],
        answer: "32 electrons.",
      },
      pyqExampleId: "cc2085dd-b9bd-4b69-acad-dc7dc8fb7c00",
      practiceSet: [
        { prompt: "An atom has Z = 17 and A = 35. How many neutrons does it have?", answer: "18" },
        { prompt: "How many electrons does Mg²⁺ have? (Mg: Z = 12)", answer: "10" },
        { prompt: "What does the mass number count?", answer: "The nucleons: protons plus neutrons" },
        { prompt: "How many electrons does the H₂ molecule have?", answer: "2" },
      ],
      traps: [
        {
          title: "A positive ion has FEWER electrons",
          body: "A charge of +q means q electrons have been **lost**. O₂⁺ has 16 − 1 = 15 electrons, not 17.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschat-isotopes-isobars",
      name: "Isotopes and isobars",
      intuition:
        "Isotopes are the same element with different weights: same Z, different A. Isobars are different elements that happen to weigh the same: same A, different Z. Keep the letters straight and these questions answer themselves.",
      definition:
        "The two terms:\n" +
        "- **Isotopes**: same **atomic number**, different **mass number** (different neutrons). Same element, same chemistry, same place in the periodic table.\n" +
        "- **Isobars**: same **mass number**, different **atomic number**. Different elements.\n" +
        "- Hydrogen has three isotopes: **protium** (¹H), **deuterium** (²H) and **tritium** (³H). Only **tritium is radioactive**.\n" +
        "- Chlorine has two stable isotopes, **³⁵Cl** and **³⁷Cl**, both with Z = 17.",
      table: {
        columns: ["Term", "Same", "Different", "Example"],
        rows: [
          {
            cells: ["Isotopes", "Atomic number Z", "Mass number A", "³⁵Cl and ³⁷Cl (both Z = 17)"],
            pyqExampleId: "bbfbd863-ad08-45b3-97a9-10bbd561e0ff",
          },
          {
            cells: ["Isobars", "Mass number A", "Atomic number Z", "⁴⁰Ar (Z = 18) and ⁴⁰Ca (Z = 20)"],
            noteAmber: "CDS 2019 (II): 'isobars have the same atomic number' was the incorrect statement.",
            pyqExampleId: "c1f5977e-2a0e-4952-80f2-000544df0eac",
          },
          {
            cells: ["Hydrogen isotopes", "Z = 1", "A = 1, 2, 3", "Protium, deuterium, tritium; tritium is radioactive"],
            pyqExampleId: "fa8caeeb-0716-481b-8695-13c5739c8d44",
          },
        ],
      },
      pyqExampleId: "91f39cd6-d37f-49cb-bb21-75a1355f5e58",
      selfCheckExample: {
        prompt: "Which pair are isobars: (a) ¹²C and ¹⁴C (b) ¹⁴C and ¹⁴N (c) ¹H and ²H (d) ³⁵Cl and ³⁷Cl?",
        steps: [
          "Isobars share the mass number and differ in Z.",
          "(a), (c) and (d) share Z and differ in A, so they are isotopes.",
          "¹⁴C (Z = 6) and ¹⁴N (Z = 7) both have A = 14.",
        ],
        answer: "(b) ¹⁴C and ¹⁴N.",
      },
      practiceSet: [
        { prompt: "Isotopes of an element share which number?", answer: "The atomic number" },
        { prompt: "Isobars share which number?", answer: "The mass number" },
        { prompt: "Which isotope of hydrogen is radioactive?", answer: "Tritium" },
        { prompt: "Do the two isotopes of chlorine sit in the same place in the periodic table?", answer: "Yes — same atomic number, same position" },
      ],
      traps: [
        {
          title: "Isobars share A, not Z",
          body: "Isobars have the **same mass number** and **different atomic numbers**. 'Same atomic number, different mass number' describes **isotopes**. CDS has used this swap as the wrong statement more than once.",
        },
        {
          title: "Hydronium is not an isotope",
          body: "H₃O⁺ is an ion. The isotopes of hydrogen are protium, deuterium and tritium.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschat-isoelectronic",
      name: "Isoelectronic species",
      intuition:
        "Isoelectronic species have the same number of electrons, even though they are different atoms or ions. Count the electrons in each and group them.",
      definition:
        "How to check:\n" +
        "- Electrons = Z − charge for each species.\n" +
        "- The **18-electron** set: P³⁻, S²⁻, Cl⁻, Ar, K⁺, Ca²⁺.\n" +
        "- The **10-electron** set: N³⁻, O²⁻, F⁻, Ne, Na⁺, Mg²⁺, Al³⁺.",
      table: {
        columns: ["Electrons", "Species"],
        rows: [
          { cells: ["10", "N³⁻, O²⁻, F⁻, Ne, Na⁺, Mg²⁺, Al³⁺"] },
          {
            cells: ["18", "P³⁻, S²⁻, Cl⁻, Ar, K⁺, Ca²⁺"],
            noteAmber: "CDS 2022 (II): Cl⁻ is not isoelectronic with Mg²⁺, which has only 10 electrons.",
            pyqExampleId: "b245af04-9ab1-435c-b93a-1da3e54d9d6b",
          },
        ],
      },
      pyqExampleId: "b245af04-9ab1-435c-b93a-1da3e54d9d6b",
      practiceSet: [
        { prompt: "How many electrons does F⁻ have? (F: Z = 9)", answer: "10" },
        { prompt: "Is K⁺ isoelectronic with Ar?", answer: "Yes — both have 18 electrons" },
        { prompt: "Which of Na⁺, Cl⁻, Ca²⁺ is isoelectronic with neon?", answer: "Na⁺" },
      ],
    },
  ],
};
