import type { SubtopicNote } from "@/app/notes/_types";

export const PARTICLES_NOTE: SubtopicNote = {
  subtopicName: "Atomic Number, Mass Number and Subatomic Particles",
  title: "Atomic Number, Mass Number and Subatomic Particles",
  oneLineDefinition:
    "An atom is built from protons, neutrons and electrons; the atomic number counts the protons, the mass number counts protons plus neutrons, and from these two numbers everything else follows.",
  whyItMatters:
    "7 PYQs. Half are pure definition recall (mass of an electron, atomic mass = protons + neutrons) and half are short counts (electrons in an ion, formula mass of a compound). " +
    "Lock down the three particle properties and the two defining numbers, and the counting questions become one-line arithmetic.",
  concepts: [
    // FOUNDATION — the three particles (REFERENCE)
    {
      kind: "reference" as const,
      slug: "three-subatomic-particles",
      name: "The three subatomic particles — charge, mass and location",
      intuition:
        "Every atom is made of three particles. Protons (positive) and neutrons (neutral) sit in the nucleus and carry essentially all the mass; electrons (negative) orbit outside and are almost massless. " +
        "The one number the bank loves: an electron is about 1/1836 (roughly 1/2000) the mass of a proton.",
      definition:
        "The three particles and their properties:\n" +
        "- **Proton** — charge **+1**, mass ≈ **1 u**, located in the **nucleus**. Its count is the atomic number.\n" +
        "- **Neutron** — charge **0** (neutral), mass ≈ **1 u**, located in the **nucleus**. A neutron is its OWN particle — NOT a proton plus an electron stuck together.\n" +
        "- **Electron** — charge **−1**, mass ≈ **1/1836 ≈ 1/2000** of a proton (≈ 9.1 × 10⁻³¹ kg), located in **shells outside** the nucleus.\n" +
        "Protons and neutrons together are called **nucleons**.",
      table: {
        columns: ["Particle", "Charge", "Relative mass", "Location"],
        rows: [
          { cells: ["Proton", "+1", "≈ 1 u", "Nucleus"] },
          { cells: ["Neutron", "0 (neutral)", "≈ 1 u", "Nucleus"] },
          {
            cells: ["Electron", "−1", "≈ 1/2000 of a proton", "Shells outside the nucleus"],
            noteAmber: "NDA 2025 — the mass of an electron is about 1/2000 (precisely 1/1836) that of a proton.",
          },
        ],
        caption: "Protons + neutrons = nucleons, carrying nearly all the mass. Electrons are almost massless.",
      },
      pyqExampleId: "b29c88d5-a8e6-4335-8724-be110b6d8110", // electron mass ~1/2000 of proton
      selfCheckExample: {
        prompt: "True or false: a neutron is formed by combining a proton and an electron, which is why it is neutral. Justify in one line.",
        steps: [
          "A neutron is a fundamental particle in its own right, discovered by Chadwick.",
          "It is neutral because it simply carries no net charge — not because it is a proton-electron composite.",
          "Treating it as proton + electron is a common but wrong model.",
        ],
        answer: "False. A neutron is its own neutral particle, not a proton bonded to an electron.",
      },
      practiceSet: [
        { prompt: "Which subatomic particle has a charge of +1 and sits in the nucleus?", answer: "Proton" },
        { prompt: "About how many times heavier than an electron is a proton?", answer: "About 1836 (roughly 2000) times" },
        { prompt: "Where in the atom are electrons located?", answer: "In shells outside the nucleus" },
        { prompt: "What is the collective name for protons and neutrons together?", answer: "Nucleons" },
      ],
      traps: [
        {
          title: "A neutron is not a proton + electron",
          body:
            "'A neutron is formed by combination of an electron and a proton, therefore it is neutral' is **false**. The neutron is a distinct fundamental particle.",
        },
      ],
    },

    // atomic number, mass number, isobars/isotones (FORMULA)
    {
      kind: "formula" as const,
      slug: "atomic-and-mass-number",
      name: "Atomic number, mass number and counting nucleons",
      intuition:
        "Two numbers define a nuclide. The atomic number Z is the number of protons — and it is the single most fundamental property of an element, because it never changes for that element. The mass number A is protons plus neutrons (nucleons). " +
        "From these, you read off electrons, neutrons and even the charge.",
      definition:
        "The two defining counts and what flows from them:\n" +
        "- **Atomic number (Z)** = number of **protons**. It is the **most fundamental characteristic of an element** — it identifies the element.\n" +
        "- **Mass number (A)** = number of **protons + neutrons** (nucleons). The atomic mass is therefore the sum of **protons and neutrons only** (electrons are negligible).\n" +
        "- **Number of neutrons** = A − Z.\n" +
        "- In a neutral atom, **electrons = protons = Z**. For an ion, add electrons for a negative charge and subtract for a positive charge.\n" +
        "- For ⁳²₁₆S²⁻: nucleons (y) = A = **32**; electrons (x) = 16 + 2 = **18**.",
      formula: {
        label: "Mass number and neutron count",
        latex: "A = Z + N \\qquad N = A - Z \\qquad e^-_{\\text{(ion)}} = Z - (\\text{charge})",
        symbols: [
          { symbol: "A", meaning: "mass number (nucleons)" },
          { symbol: "Z", meaning: "atomic number (protons)" },
          { symbol: "N", meaning: "number of neutrons" },
        ],
      },
      pyqExampleId: "6b3584d0-8b25-46c7-a767-8230e1fd8c1a", // S2- electrons & nucleons
      authoredExample: {
        prompt:
          "For the sulphide ion \\(^{32}_{16}\\text{S}^{2-}\\), find the number of electrons and the number of nucleons.",
        steps: [
          "The atomic number Z = 16, so a neutral sulphur atom has 16 protons and 16 electrons.",
          "The 2− charge means it has gained 2 electrons: electrons = 16 + 2 = 18.",
          "Nucleons = mass number A = 32 (protons + neutrons), unaffected by charge.",
        ],
        answer: "18 electrons and 32 nucleons.",
      },
      selfCheckExample: {
        prompt: "An atom has atomic number 20 and mass number 40. How many neutrons does it contain?",
        steps: [
          "Atomic number Z = 20 = number of protons.",
          "Mass number A = 40 = protons + neutrons.",
          "Neutrons = A − Z = 40 − 20 = 20.",
        ],
        answer: "20 neutrons.",
      },
      practiceSet: [
        { prompt: "The atomic mass of an element equals the sum of the numbers of which particles?", answer: "Protons and neutrons only", method: "electrons are negligibly light" },
        { prompt: "What is the most fundamental characteristic of an element?", answer: "Its atomic number" },
        { prompt: "An atom of argon has mass number 40 and atomic number 18. How many electrons does the neutral atom have?", answer: "18", method: "neutral atom: electrons = protons = Z" },
        { prompt: "How many neutrons are in an atom with mass number 27 and atomic number 13?", answer: "14", method: "N = A − Z = 27 − 13" },
      ],
      traps: [
        {
          title: "Atomic mass = protons + neutrons, not + electrons",
          body:
            "The atomic mass is the sum of **protons and neutrons only**. Electrons are about 1/2000 the mass of a nucleon, so they contribute nothing — do not add electrons.",
        },
        {
          title: "Charge changes electrons, not nucleons",
          body:
            "A 2− or 3+ charge changes the **electron** count, never the proton or neutron count. The mass number (nucleons) of an ion equals that of its neutral atom.",
        },
      ],
    },

    // formula mass / valency from structure (FORMULA)
    {
      kind: "formula" as const,
      slug: "formula-mass-and-valency",
      name: "Formula mass and reading valency from the atom",
      intuition:
        "Once you know atomic masses, the formula mass of a compound is just the sum over every atom in the formula. And once you know the atomic number, you know the electron arrangement — which fixes the element's valency. " +
        "The bank pairs these: add up a compound's mass, or spot the one wrong statement about an element from its atomic and mass numbers.",
      definition:
        "Two skills the bank tests:\n" +
        "- **Formula mass** = sum of (atomic mass × number of atoms) for every element in the formula. Example — anhydrous sodium carbonate Na₂CO₃: 2(23) + 12 + 3(16) = 46 + 12 + 48 = **106 u**.\n" +
        "- **Valency from the atom** — work out the electron configuration from Z, then the valency is the electrons gained, lost or shared to reach an octet. Aluminium (Z = 13, config 2,8,3) loses 3 electrons → **valency 3**, NOT 2.",
      formula: {
        label: "Formula mass",
        latex: "\\text{Formula mass} = \\sum (\\text{atomic mass} \\times \\text{number of atoms})",
      },
      pyqExampleId: "a11a2351-f40d-4ad4-9a67-07f9990cd750", // formula mass Na2CO3 = 106
      authoredExample: {
        prompt:
          "Find the formula mass of calcium carbonate, CaCO₃. (Atomic masses: Ca = 40 u, C = 12 u, O = 16 u.)",
        steps: [
          "Calcium: 1 atom × 40 = 40 u.",
          "Carbon: 1 atom × 12 = 12 u.",
          "Oxygen: 3 atoms × 16 = 48 u.",
          "Add them: 40 + 12 + 48 = 100 u.",
        ],
        answer: "100 u.",
      },
      selfCheckExample: {
        prompt:
          "Aluminium has atomic number 13 and mass number 27. Which is the FALSE statement: (a) it has 13 protons, (b) it has 14 neutrons, (c) its valency is 2, (d) it has 13 electrons when neutral?",
        steps: [
          "Z = 13 → 13 protons and 13 electrons (neutral). Statements (a) and (d) are true.",
          "Neutrons = A − Z = 27 − 13 = 14. Statement (b) is true.",
          "Configuration 2,8,3 → aluminium loses 3 outer electrons → valency 3, not 2.",
        ],
        answer: "(c) is false — the valency of aluminium is 3, not 2.",
      },
      practiceSet: [
        { prompt: "Find the formula mass of water H₂O (H = 1 u, O = 16 u).", answer: "18 u", method: "2(1) + 16" },
        { prompt: "What is the valency of aluminium (atomic number 13)?", answer: "3", method: "config 2,8,3 → loses 3 electrons" },
        { prompt: "Formula mass of carbon dioxide CO₂ (C = 12, O = 16)?", answer: "44 u", method: "12 + 2(16)" },
      ],
      traps: [
        {
          title: "Aluminium's valency is 3, not 2",
          body:
            "From the configuration 2,8,3, aluminium loses **3** electrons to reach an octet — valency **3**. A statement claiming 'the valency of Al is 2' is the false one.",
        },
      ],
    },

    // average atomic mass from isotopes (FORMULA) — covers the oxygen-isotope mass question filed here
    {
      kind: "formula" as const,
      slug: "average-atomic-mass",
      name: "Average atomic mass from isotope proportions",
      intuition:
        "Most elements are a mixture of isotopes — same protons, different neutrons, so different masses. The atomic mass on the periodic table is the WEIGHTED average of those isotope masses, weighted by how common each one is. " +
        "The bank gives you the masses and the ratio and asks for the average.",
      definition:
        "The average atomic mass is the sum of (each isotope's mass × its fraction):\n" +
        "- Convert the ratio to fractions that add to 1 (e.g. a 3 : 1 ratio → 3/4 and 1/4).\n" +
        "- Multiply each isotope's mass by its fraction and add.\n" +
        "- Example — oxygen with masses 16 u and 18 u in the ratio 3 : 1: average = (3 × 16 + 1 × 18)/4 = 66/4 = 16.5 u.",
      formula: {
        label: "Weighted average atomic mass",
        latex: "\\bar{M} = \\frac{m_1 f_1 + m_2 f_2}{f_1 + f_2}",
        symbols: [
          { symbol: "m_1, m_2", meaning: "isotope masses" },
          { symbol: "f_1, f_2", meaning: "their proportions (parts of the ratio)" },
        ],
      },
      pyqExampleId: "19065b8b-9760-4faa-94ee-92af46c67366", // oxygen 16u/18u 3:1 → 16.5 u
      authoredExample: {
        prompt:
          "Chlorine occurs as two isotopes of masses 35 u and 37 u in the proportion 3 : 1. Find its average atomic mass.",
        steps: [
          "The ratio 3 : 1 has 4 total parts.",
          "Weighted sum = 3 × 35 + 1 × 37 = 105 + 37 = 142.",
          "Divide by total parts: 142 / 4 = 35.5 u.",
        ],
        answer: "35.5 u.",
      },
      selfCheckExample: {
        prompt: "An element has two isotopes of masses 10 u and 11 u present in equal amounts (1 : 1). What is its average atomic mass?",
        steps: [
          "Equal amounts means each fraction is 1/2.",
          "Weighted sum = (1 × 10 + 1 × 11) / 2.",
          "= 21 / 2 = 10.5 u.",
        ],
        answer: "10.5 u.",
      },
      practiceSet: [
        { prompt: "Two isotopes of mass 16 u and 18 u occur in the ratio 3 : 1. What is the average atomic mass?", answer: "16.5 u", method: "(3×16 + 1×18)/4" },
        { prompt: "Two isotopes of mass 12 u and 14 u occur in the ratio 1 : 1. What is the average atomic mass?", answer: "13 u" },
      ],
      traps: [
        {
          title: "Weight by proportion, don't just average the masses",
          body:
            "For a 3 : 1 mix of 16 u and 18 u the answer is **16.5 u**, not the plain mean 17 u. Always multiply each mass by its fraction (3/4 and 1/4) before adding.",
        },
      ],
    },
  ],
};
