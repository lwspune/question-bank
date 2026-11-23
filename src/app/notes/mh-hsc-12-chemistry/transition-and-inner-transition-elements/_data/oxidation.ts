import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_TR_OXIDATION_NOTE: SubtopicNote = {
  subtopicName: "Oxidation States of the First Transition Series",
  title: "Oxidation States of the First Transition Series",
  oneLineDefinition:
    "The oxidation states each 3d element shows, why the number of states rises towards the middle of the series, and why a half filled or completely filled d subshell makes one state more stable than another.",
  whyItMatters:
    "8 questions. Four were set in board papers: explain why Mn²⁺ is more stable than Mn³⁺ (2014), write the oxidation states of iron and say why +2 is the stable state of manganese (2017), the oxidation states of scandium (2019), and which of Sc, Fe, Cr and V shows the highest oxidation state (2022). The textbook adds the stable states of chromium and titanium, Fe²⁺ against Fe³⁺, and the stable states of plutonium, cerium, manganese and europium.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscctr-ox-states",
      name: "Oxidation states of the 3d elements",
      intuition:
        "A 3d element can give away its two 4s electrons and then, one by one, its unpaired 3d electrons. Each electron it gives away is one more oxidation state it can show. So the more unpaired 3d electrons an element has, the more states it shows, and the middle of the series, around manganese, shows the most.",
      definition:
        "- Loss of 4s and then 3d electrons gives the variety of oxidation states. Loss of the two 4s electrons gives +2; loss of the unpaired 3d electrons as well gives +3, +4 and so on.\n" +
        "- As the number of unpaired 3d electrons increases, the number of oxidation states also increases. Scandium, with one unpaired electron, shows three states; manganese, with five unpaired 3d electrons, shows six, from +2 to +7.\n" +
        "- The elements with the greatest number of states are in or near the **middle** of the series.\n" +
        "- The highest state of the first row is **+7** (manganese, as in \\(\\text{KMnO}_4\\)). The heavier series reach +8, as in \\(\\text{RuO}_4\\) and \\(\\text{OsO}_4\\).\n" +
        "- The highest state is not always the most stable one. Titanium is most stable at +4, where it is left with the argon configuration; manganese is most stable at +2.\n" +
        "- Board 2019 asked the oxidation states of scandium, and 2022 asked which of Sc, Fe, Cr and V shows the highest state (the key is chromium, +6).",
      table: {
        columns: ["Element", "Outer configuration", "Oxidation states (Table 8.3)"],
        rows: [
          { cells: ["Sc", "3d¹ 4s²", "+1, +2, +3"] },
          {
            cells: ["Ti", "3d² 4s²", "+2, +3, +4 (most stable +4)"],
            pyqExampleId: "4c326ac7-3926-460f-97c9-a8517258c277",
            noteAmber: "Textbook Exercise Q.1 asks the most stable oxidation state of titanium.",
          },
          { cells: ["V", "3d³ 4s²", "+2, +3, +4, +5"] },
          { cells: ["Cr", "3d⁵ 4s¹", "+2, +3, +4, +5, +6 (stable +3 and +6)"] },
          { cells: ["Mn", "3d⁵ 4s²", "+2, +3, +4, +5, +6, +7"] },
          { cells: ["Fe", "3d⁶ 4s²", "+2, +3, +4, +5, +6"] },
          { cells: ["Co", "3d⁷ 4s²", "+2, +3, +4, +5"] },
          { cells: ["Ni", "3d⁸ 4s²", "+2, +3, +4"] },
          { cells: ["Cu", "3d¹⁰ 4s¹", "+1, +2"] },
          { cells: ["Zn", "3d¹⁰ 4s²", "+2"] },
        ],
      },
      selfCheckExample: {
        prompt: "Find the oxidation state of chromium in K₂Cr₂O₇, and say whether it is the highest state chromium shows.",
        steps: [
          "Let the state of Cr be x. Potassium is +1 and oxygen is −2.",
          "\\(2(+1) + 2x + 7(-2) = 0\\), so \\(2x = 12\\) and \\(x = +6\\).",
          "Table 8.3 lists chromium from +2 to +6, so +6 is its highest state.",
        ],
        answer: "+6, the highest oxidation state of chromium",
      },
      practiceSet: [
        { prompt: "How many oxidation states does manganese show, and what are they?", answer: "Six: +2, +3, +4, +5, +6 and +7" },
        { prompt: "Which 3d element shows only the +2 state?", answer: "Zinc" },
        { prompt: "Which oxidation states does copper show?", answer: "+1 and +2" },
        { prompt: "Why can scandium not show a +4 state?", answer: "It has only three electrons outside the argon core (3d¹ 4s²)" },
      ],
      pyqExampleId: "4c326ac7-3926-460f-97c9-a8517258c277",
      traps: [
        {
          title: "Taking the highest state as the most stable",
          body: "Manganese reaches +7, but its most stable state is +2. For 'most stable', look for an empty, half filled or completely filled d subshell; for 'highest', count the 4s and unpaired 3d electrons.",
        },
        {
          title: "Counting only the 4s electrons",
          body: "Vanadium reaches +5 because it can give up both 4s electrons and all three 3d electrons. Counting 4s alone would stop every element at +2.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscctr-half-filled",
      name: "Stability from a half filled or filled d subshell",
      intuition:
        "Some arrangements of electrons are especially comfortable: one electron in each of the five d orbitals (half filled), or two in each (completely filled). An ion that has reached such an arrangement holds on to it, and an ion one electron away from it readily gains or loses that electron to reach it. That is how you decide which of two oxidation states is the more stable.",
      definition:
        "- The textbook's rule: **any subshell having a half filled or completely filled electronic configuration has extra stability.**\n" +
        "- For a d subshell this means \\(d^{5}\\) (one electron in each of the five orbitals, parallel spins) and \\(d^{10}\\).\n" +
        "- To compare two states: write the configuration of the atom, remove the 4s electrons first and then the 3d, and see which ion has \\(d^{5}\\) or \\(d^{10}\\).\n" +
        "- Manganese, \\([\\text{Ar}]\\,3d^{5}\\,4s^{2}\\): \\(\\text{Mn}^{2+}\\) is \\(3d^{5}\\), so +2 is its stable state, and \\(\\text{Mn}^{3+}\\) (\\(3d^{4}\\)) readily goes back to it.\n" +
        "- Iron, \\([\\text{Ar}]\\,3d^{6}\\,4s^{2}\\): \\(\\text{Fe}^{3+}\\) is \\(3d^{5}\\), so here the higher state is the more stable one.\n" +
        "- Write the answer in three lines: the configurations, which one is half filled or full, and the conclusion.",
      formula: {
        label: "Extra-stable d configurations",
        latex: "d^{5}\\ (\\text{half filled}), \\qquad d^{10}\\ (\\text{completely filled})",
      },
      authoredExample: {
        prompt:
          "Iron (Z = 26) shows the +2 and +3 oxidation states. Write the electronic configuration of each ion and say which is more stable, with the reason.",
        steps: [
          "Given: Z = 26, so Fe is \\([\\text{Ar}]\\,3d^{6}\\,4s^{2}\\).",
          "Remove the two 4s electrons: \\(\\text{Fe}^{2+} = [\\text{Ar}]\\,3d^{6}\\).",
          "Remove one 3d electron as well: \\(\\text{Fe}^{3+} = [\\text{Ar}]\\,3d^{5}\\).",
          "\\(3d^{5}\\) is exactly half filled, which has extra stability. \\(\\text{Fe}^{2+}\\) is one electron away from it, so it is readily oxidised to \\(\\text{Fe}^{3+}\\) (acidified KMnO₄ does this).",
        ],
        answer: "\\(\\text{Fe}^{3+}\\) (\\(3d^{5}\\), half filled) is more stable than \\(\\text{Fe}^{2+}\\) (\\(3d^{6}\\))",
      },
      selfCheckExample: {
        prompt: "Zinc (Z = 30) shows only the +2 oxidation state. Use its configuration to explain why.",
        steps: [
          "Zn is \\([\\text{Ar}]\\,3d^{10}\\,4s^{2}\\).",
          "Losing the two 4s electrons gives \\(\\text{Zn}^{2+} = [\\text{Ar}]\\,3d^{10}\\), a completely filled subshell.",
          "A third electron would have to come out of this extra-stable filled 3d subshell, so no higher state forms.",
        ],
        answer: "Zn²⁺ is 3d¹⁰, completely filled and extra stable, so zinc stops at +2",
      },
      practiceSet: [
        { prompt: "Which of Fe³⁺ and Co³⁺ (Z of Co = 27) has a half filled 3d subshell?", answer: "Fe³⁺ (3d⁵); Co³⁺ is 3d⁶" },
        { prompt: "Which copper ion has a completely filled 3d subshell?", answer: "Cu⁺ (\\([\\text{Ar}]\\,3d^{10}\\))" },
        { prompt: "Name the 3d ion with a +3 charge and the configuration \\([\\text{Ar}]\\,3d^{5}\\).", answer: "Fe³⁺" },
      ],
      pyqExampleId: "b5aa4073-1b0b-4b45-bac7-085f2503b420",
      traps: [
        {
          title: "Deciding by the size of the charge",
          body: "A higher charge is not automatically more stable. Fe³⁺ (3d⁵) is more stable than Fe²⁺, yet zinc never goes beyond Zn²⁺ (3d¹⁰). Decide from the configuration every time.",
        },
        {
          title: "Giving the reason without the configurations",
          body: "'Because it is half filled' earns little on its own. Write both configurations, name the half filled or full one, and then conclude.",
        },
      ],
    },
  ],
};
