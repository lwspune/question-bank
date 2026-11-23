import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_TR_TRENDS_NOTE: SubtopicNote = {
  subtopicName: "Trends in Atomic Properties",
  title: "Radii, Ionisation, Magnetic Moment and Colour",
  oneLineDefinition:
    "How atomic and ionic radii and ionisation enthalpies change across the first transition series, the spin-only magnetic moment of an ion, and why most transition metal ions are coloured.",
  whyItMatters:
    "16 questions. Eight were set in board papers: the factors that decide the colour of an ion (2017), the spin-only magnetic moment of the divalent ion of the element with atomic number 24 (2019), 25 (2022) and 26 (2025), the moments of Mn²⁺ (2023) and Cr³⁺ (2024) as multiple-choice questions, why compounds of Ti⁴⁺ are colourless (2022 and 2024), and which 3d element has the highest first ionisation enthalpy (2026). The textbook adds the trends in radii and ionisation enthalpy, shielding, and examples of diamagnetic and paramagnetic metals.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscctr-radii-ie",
      name: "Atomic radii and ionisation enthalpy across the series",
      intuition:
        "Moving from one 3d element to the next, the nucleus gains one proton and the atom gains one electron. But that electron goes into the inner 3d subshell, and d electrons are poor at screening the outer electrons from the nucleus. So the outer 4s electrons feel a slightly stronger pull at each step: the atom shrinks a little and its ionisation enthalpy rises a little.",
      definition:
        "- **Shielding (screening):** the inner electrons repel an outer electron and so cancel part of the nuclear attraction on it. The pull the outer electron actually feels is the **effective nuclear charge**.\n" +
        "- d orbitals are less penetrating and more diffused, so d electrons offer a **smaller screening effect**. Across a transition series the effective nuclear charge therefore increases, and the atomic radius decreases gradually.\n" +
        "- The textbook says the minor variations of radius within a series are beyond its scope.\n" +
        "- The ionisation enthalpies of transition elements lie **between** those of the s-block and the p-block, so they are less electropositive than groups 1 and 2. In lower oxidation states they form ionic compounds, in higher states covalent ones.\n" +
        "- The third transition series has filled 4f orbitals, which shield poorly because of their diffused shape. Its valence electrons feel a greater nuclear attraction, so its ionisation enthalpies are **much higher** than those of the first and second series.",
      table: {
        columns: ["Property", "Trend", "Textbook data or reason"],
        rows: [
          { cells: ["Atomic radius across the 3d series", "Decreases gradually, then rises slightly at Cu and Zn", "Sc 164 pm, Co and Ni 125 pm, Cu 128 pm, Zn 137 pm (Table 8.5)"] },
          { cells: ["Ionic radius, same oxidation state", "Decreases as the nuclear charge increases", "Cr²⁺ 82 pm, Cu²⁺ 73 pm"] },
          { cells: ["Ionic radius, same element", "Decreases as the oxidation state rises (M²⁺ larger than M³⁺)", "Fe²⁺ 77 pm, Fe³⁺ 65 pm; the effective nuclear charge rises"] },
          {
            cells: ["First ionisation enthalpy across the series", "Rises only slightly and irregularly, with zinc the highest", "Sc 632, Cu 744, Zn 906 kJ/mol (Table 8.6); zinc's 3d and 4s are both completely filled"],
            pyqExampleId: "590a4957-b393-4d74-ae2e-0d7e1bbcd174",
            noteAmber: "Board 2026 asked which of Zn, Cu, Co and Sc has the highest first ionisation enthalpy.",
          },
          { cells: ["IE₁ to IE₃ of one element", "A substantial increase", "Mn: 717, 1513 and 3258 kJ/mol"] },
          { cells: ["Metallic character", "Typical metals", "Low ionisation enthalpies and vacant d orbitals favour metallic bonds"] },
          { cells: ["Melting point", "Rises up to the d⁵ configuration, then falls", "Cr, Mo and W are the highest in their series; Mn and Tc are anomalous"] },
        ],
      },
      selfCheckExample: {
        prompt: "Explain why the atomic radius decreases only gradually across the first transition series.",
        steps: [
          "Each step adds one proton to the nucleus and one electron to the inner 3d subshell, not to the outer shell.",
          "d electrons are diffused and screen poorly, so the effective nuclear charge on the outer 4s electrons increases.",
          "The outer shell is pulled in a little at each step, but the added inner electron still screens a little, so the fall is gradual.",
        ],
        answer: "The added electron enters the inner 3d subshell and screens poorly, so the effective nuclear charge rises slowly and the radius falls gradually",
      },
      practiceSet: [
        { prompt: "Which element of the 3d series has the largest atomic radius?", answer: "Scandium (164 pm)" },
        { prompt: "Which is smaller, Fe²⁺ or Fe³⁺, and why?", answer: "Fe³⁺ (65 pm against 77 pm): the higher oxidation state has a higher effective nuclear charge" },
        { prompt: "Why are the ionisation enthalpies of the 5d series much higher than those of the 3d series?", answer: "Their atoms have filled 4f orbitals, which shield poorly, so the valence electrons feel a greater nuclear attraction" },
        { prompt: "What is meant by shielding of electrons?", answer: "The inner electrons repel an outer electron and cancel part of the nuclear charge it feels" },
      ],
      pyqExampleId: "590a4957-b393-4d74-ae2e-0d7e1bbcd174",
      traps: [
        {
          title: "Saying the radius falls all the way to zinc",
          body: "The radius falls up to cobalt and nickel and then rises again at copper and zinc (Table 8.5). Say 'decreases gradually' and mention the rise at the end.",
        },
        {
          title: "Explaining the trend by a new shell",
          body: "All the 3d elements have the same outer shell. The trend comes from the effective nuclear charge rising because d electrons screen poorly, not from a change in the number of shells.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscctr-magnetic",
      name: "Spin-only magnetic moment",
      intuition:
        "Every unpaired electron acts like a tiny magnet. Paired electrons cancel each other, so only the unpaired ones count. An ion with unpaired electrons is pulled into a magnetic field (paramagnetic); one with all electrons paired is pushed out (diamagnetic). Count the unpaired electrons and one formula gives the size of the moment.",
      definition:
        "- **Paramagnetic:** attracted towards an applied magnetic field; caused by unpaired electrons. **Diamagnetic:** repelled by the field; all electron spins are paired. **Ferromagnetic:** attracted very strongly and can be magnetised; among transition metals, Fe, Co and Ni.\n" +
        "- Each unpaired electron gives a magnetic moment from its spin and its orbital angular momentum. In the first transition series the orbital contribution is **quenched**, so the **spin-only formula** is used.\n" +
        "- In the second and third series the orbital contribution is significant, so the spin-only formula is not useful there.\n" +
        "- Moments are measured in solution or in the solid, where the metal ion is hydrated or bound to ligands, so the measured value differs slightly from the calculated one (Table 8.7).\n" +
        "- Method: atomic number, then the configuration of the atom, then of the ion (4s electrons out first), then count unpaired electrons by Hund's rule, then the formula, with the unit BM.",
      formula: {
        label: "Spin-only magnetic moment",
        latex: "\\mu = \\sqrt{n(n+2)}\\ \\text{BM}",
        symbols: [
          { symbol: "\\(\\mu\\)", meaning: "magnetic moment, in Bohr magnetons (BM)" },
          { symbol: "\\(n\\)", meaning: "number of unpaired electrons" },
        ],
      },
      authoredExample: {
        prompt: "Calculate the spin-only magnetic moment of the divalent cation of the transition metal with atomic number 27.",
        steps: [
          "Given: Z = 27, which is cobalt, \\([\\text{Ar}]\\,3d^{7}\\,4s^{2}\\).",
          "Divalent cation: remove the two 4s electrons, \\(\\text{Co}^{2+} = [\\text{Ar}]\\,3d^{7}\\).",
          "Seven electrons in five d orbitals: five go in singly, two pair up, so \\(n = 3\\).",
          "Formula: \\(\\mu = \\sqrt{n(n+2)}\\).",
          "Substitution: \\(\\mu = \\sqrt{3(3+2)} = \\sqrt{15} = 3.87\\) BM.",
        ],
        answer: "\\(\\mu = 3.87\\) BM",
      },
      selfCheckExample: {
        prompt: "An ion of the first transition series has a magnetic moment of 2.84 BM. How many unpaired electrons does it have?",
        steps: [
          "\\(\\mu^2 = n(n+2)\\), so \\(n(n+2) = 2.84^2 = 8.07\\), about 8.",
          "\\(n = 2\\) gives \\(2 \\times 4 = 8\\).",
        ],
        answer: "2 unpaired electrons (for example V³⁺ or Ni²⁺)",
      },
      practiceSet: [
        { prompt: "Why can the orbital contribution to the magnetic moment be neglected for ions of the first transition series?", answer: "In the first series the orbital contribution is quenched, so only the spin counts" },
        { prompt: "Which of Sc³⁺, Cu²⁺ and Ni²⁺ is diamagnetic?", answer: "Sc³⁺ (3d⁰, no unpaired electron)" },
        { prompt: "What is the magnetic moment of a single unpaired electron?", answer: "1.73 BM" },
        { prompt: "Name the three ferromagnetic transition metals.", answer: "Iron, cobalt and nickel" },
      ],
      pyqExampleId: "cb28336e-a009-4a70-b62c-c6bdab098b13",
      traps: [
        {
          title: "Counting unpaired electrons in the atom, not the ion",
          body: "The question is about the ion. Remove the 4s electrons first and then count. Counting the atom's electrons gives the wrong n.",
        },
        {
          title: "Pairing electrons too early",
          body: "By Hund's rule the five d orbitals each take one electron before any pairs. \\(3d^{7}\\) has 3 unpaired electrons, not 1.",
        },
        {
          title: "Leaving out the unit",
          body: "Write the answer as so many BM (Bohr magnetons). A bare number loses the last mark.",
        },
        {
          title: "Using the spin-only formula for 4d and 5d ions",
          body: "The formula works for the first series because the orbital contribution is quenched. The textbook says it is not useful for the second and third series.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscctr-colour",
      name: "Colour of transition metal ions",
      intuition:
        "White light holds every colour. If an ion soaks up one colour, the light that passes through is missing it, and our eye sees the rest, the complementary colour. A transition metal ion can soak up visible light because one of its d electrons can jump to a slightly higher d orbital, and that small jump matches the energy of visible light.",
      definition:
        "- A substance is coloured if it absorbs a portion of visible light. In a free atom the five d orbitals have the same energy (degenerate). In a complex, the solvent molecules or ligands around the metal ion change their energies, so they are no longer the same.\n" +
        "- The d orbitals have the same principal quantum number, so the energy needed to move an electron from one d orbital to another (a **d-d transition**) is small and is supplied by **visible light**. The remaining light is transmitted, and the compound shows the **complementary colour** of the light absorbed.\n" +
        "- Ions with no unpaired d electron are colourless: Cu⁺ (3d¹⁰), and ions with 3d⁰ such as Sc³⁺.\n" +
        "- The textbook lists four factors: **1.** presence of unpaired d electrons, **2.** d-d transitions, **3.** nature of the ligands attached to the metal ion, **4.** geometry of the complex.\n" +
        "- Ligand and geometry: cobalt chloride gives a pink solution of octahedral \\([\\text{Co(H}_2\\text{O)}_6]^{2+}\\); with concentrated HCl it turns deep blue, forming tetrahedral \\([\\text{CoCl}_4]^{2-}\\).\n" +
        "- Colour can also come from **charge transfer**: in \\(\\text{MnO}_4^{-}\\) an electron moves for a moment from oxygen to manganese, changing its state from +7 to +6, which gives the intense purple colour.",
      table: {
        columns: ["Ion", "Outer configuration", "Unpaired electrons", "Colour (Table 8.8)"],
        rows: [
          { cells: ["Sc³⁺", "3d⁰", "0", "Colourless"] },
          { cells: ["Ti³⁺", "3d¹", "1", "Purple"] },
          {
            cells: ["Ti⁴⁺", "3d⁰", "0", "Colourless"],
            pyqExampleId: "6ceb489b-d6a5-4918-bc30-5f1be1655b7c",
            noteAmber: "Board 2024 asked why compounds of Ti⁴⁺ are colourless; 2022 asked it too.",
          },
          { cells: ["V³⁺", "3d²", "2", "Green"] },
          { cells: ["Cr³⁺", "3d³", "3", "Violet"] },
          { cells: ["Mn²⁺", "3d⁵", "5", "Light pink"] },
          { cells: ["Mn³⁺", "3d⁴", "4", "Violet"] },
          { cells: ["Fe²⁺", "3d⁶", "4", "Pale green"] },
          { cells: ["Fe³⁺", "3d⁵", "5", "Yellow"] },
          { cells: ["Co²⁺", "3d⁷", "3", "Pink"] },
          { cells: ["Ni²⁺", "3d⁸", "2", "Green"] },
          { cells: ["Cu²⁺", "3d⁹", "1", "Blue"] },
          { cells: ["Cu⁺", "3d¹⁰", "0", "Colourless"] },
          { cells: ["Zn²⁺", "3d¹⁰", "0", "Colourless"] },
        ],
      },
      selfCheckExample: {
        prompt: "Explain why the salts of Cu²⁺ (Z of Cu = 29) are coloured.",
        steps: [
          "Cu is \\([\\text{Ar}]\\,3d^{10}\\,4s^{1}\\), so \\(\\text{Cu}^{2+} = [\\text{Ar}]\\,3d^{9}\\), with one unpaired electron.",
          "The 3d subshell is partly filled, so an electron can move from a lower d orbital to a higher one (a d-d transition).",
          "The small energy needed is taken from visible light; the light left over gives the complementary colour, blue (Table 8.8).",
        ],
        answer: "Cu²⁺ is 3d⁹, partly filled, so a d-d transition absorbs visible light and the salt looks blue",
      },
      practiceSet: [
        { prompt: "State the colour of Fe³⁺ and its number of unpaired electrons.", answer: "Yellow, 5 unpaired electrons" },
        { prompt: "Pink cobalt chloride solution turns deep blue with concentrated HCl. Why?", answer: "Octahedral \\([\\text{Co(H}_2\\text{O)}_6]^{2+}\\) changes to tetrahedral \\([\\text{CoCl}_4]^{2-}\\): a different ligand and geometry" },
        { prompt: "Mn in \\(\\text{MnO}_4^{-}\\) has no d electrons, yet the ion is purple. What causes the colour?", answer: "Charge transfer: an electron moves for a moment from oxygen to manganese" },
        { prompt: "Name the four factors the textbook gives for the colour of a transition metal ion.", answer: "Unpaired d electrons, d-d transitions, the nature of the ligands, and the geometry of the complex" },
      ],
      pyqExampleId: "6ceb489b-d6a5-4918-bc30-5f1be1655b7c",
      traps: [
        {
          title: "Saying a 3d¹⁰ ion has no electrons to move",
          body: "Cu⁺ and Zn²⁺ have ten d electrons. They are colourless because the d subshell is FULL, so there is no empty place to jump into, not because there are no electrons.",
        },
        {
          title: "Listing two factors when the book prints four",
          body: "A 'factors' question wants all four: unpaired d electrons, d-d transitions, the ligands and the geometry, with the cobalt chloride example for the last two.",
        },
        {
          title: "Calling the colour of MnO₄⁻ a d-d transition",
          body: "Manganese in \\(\\text{MnO}_4^{-}\\) is +7 with no d electrons. Its colour comes from charge transfer, as the textbook explains.",
        },
      ],
    },
  ],
};
