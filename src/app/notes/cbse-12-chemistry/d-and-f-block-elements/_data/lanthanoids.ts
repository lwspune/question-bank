import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_DF_LANTHANOIDS_NOTE: SubtopicNote = {
  subtopicName: "The Lanthanoids",
  title: "The Lanthanoids and the Lanthanoid Contraction",
  oneLineDefinition:
    "The lanthanoid contraction, its cause and its consequences (Zr and Hf), the +3 state with the +2 and +4 exceptions of Ce, Eu, Tb and Yb, the general properties of the lanthanoids and mischmetall.",
  whyItMatters:
    "20 questions. Fourteen were set in board papers: what the lanthanoid contraction is, its cause and two consequences (three times in 2022 and three times in 2024), an MCQ on its cause (2023), three assertion-reason items on the radii and separation of Zr and Hf (2024), two MCQs picking the correct and the incorrect statement about lanthanoids (2025), the common oxidation state (2023) and why Ce⁴⁺ is a strong oxidising agent (2023). The NCERT exercises add the +2 and +4 states, the magnetic moment of Ce³⁺ and mischmetall.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcdf-ln-contraction",
      name: "Lanthanoid contraction: cause and consequences",
      intuition:
        "Across the lanthanoids each new electron goes into a deep 4f orbital, while the nucleus gains one more proton. A 4f electron is very poor at screening the other electrons from that extra charge, so the whole atom is pulled in a little at every step. Fourteen small steps add up to a big shrink.",
      definition:
        "- **Lanthanoid contraction:** the overall decrease in atomic and ionic radii from lanthanum to lutetium.\n" +
        "- **Cause:** imperfect shielding of one 4f electron by another, which is even poorer than the shielding of one d electron by another. As the nuclear charge increases along the series, the effective nuclear charge felt by the electrons rises and the size of the entire \\(4f^n\\) set decreases.\n" +
        "- The decrease is fairly regular in the M³⁺ ions but not quite regular in the atomic radii.\n" +
        "- **Consequences:** the radii of the third transition series (5d) are very similar to those of the second (4d), e.g. Zr 160 pm and Hf 159 pm, so these pairs have very similar physical and chemical properties. Zr and Hf occur together in nature and are difficult to separate. The lanthanoids themselves resemble one another very closely, which also makes them hard to separate.",
      table: {
        columns: ["Point", "What to write"],
        rows: [
          { cells: ["Definition", "Steady decrease in atomic and ionic radii from La to Lu with increasing atomic number"] },
          {
            cells: ["Cause", "Poor shielding by 4f electrons, so the effective nuclear charge increases along the series"],
            noteAmber: "Board 2023 MCQ: the contraction is due to the increase in effective nuclear charge, not in shielding or in atomic radius.",
            pyqExampleId: "cf52de69-bdb0-4281-b731-f04ad5df5452",
          },
          { cells: ["Effect on the transition series", "4d and 5d elements have almost the same radii (Zr 160 pm, Hf 159 pm), so they have very similar properties"] },
          {
            cells: ["Zr and Hf", "Occur together in nature and are difficult to separate"],
            noteAmber: "Board 2024: with \"Zr and Hf are radioactive\" as the reason, the reason is false (code C); with \"similar radii due to lanthanoid contraction\", it is code (A).",
            pyqExampleId: "72e45af0-ede5-4ade-b9f8-c5d98c3f6d34",
          },
          { cells: ["The lanthanoids themselves", "So alike in size and chemistry that they are hard to separate from one another"] },
        ],
        caption: "Ionic radii (pm): La³⁺ 106, Ce³⁺ 103, Gd³⁺ 94, Yb³⁺ 86.",
      },
      selfCheckExample: {
        prompt: "Arrange La³⁺, Gd³⁺ and Yb³⁺ in order of decreasing ionic radius and name the effect that sets the order.",
        steps: ["Atomic number rises La (57), Gd (64), Yb (70).", "Along the series the M³⁺ radius falls steadily because of the lanthanoid contraction."],
        answer: "La³⁺ > Gd³⁺ > Yb³⁺ (106, 94, 86 pm); lanthanoid contraction",
      },
      practiceSet: [
        { prompt: "What is the cause of the lanthanoid contraction?", answer: "Imperfect shielding of one 4f electron by another, so the effective nuclear charge rises along the series" },
        { prompt: "Does the ionic radius increase or decrease from La³⁺ to Lu³⁺?", answer: "It decreases" },
        { prompt: "Why do the lanthanoids resemble one another so closely?", answer: "Their sizes change only a little and almost all of them are in the +3 state" },
      ],
      pyqExampleId: "12f9e2e0-65e4-4ba9-81fb-998c9abe892a",
      traps: [
        {
          title: "Saying the 4f electrons shield well",
          body: "It is the POOR shielding by 4f electrons that causes the contraction. An MCQ option \"shielding by 4f electrons\" is the distractor; the answer is the increase in effective nuclear charge.",
        },
        {
          title: "Calling the lanthanoids radioactive",
          body: "The actinoids are the radioactive series. Board 2025 set \"lanthanoids are radioactive\" as the incorrect statement.",
        },
        {
          title: "Giving one consequence when two are asked",
          body: "Two consequences carry two marks: the near-equal radii of the 4d and 5d series (Zr and Hf), and the difficulty of separating Zr from Hf or the lanthanoids from one another.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcdf-ln-oxstates",
      name: "Oxidation states and properties of the lanthanoids",
      intuition:
        "Almost every lanthanoid settles at +3. The few that also show +2 or +4 do so because that charge leaves an empty, half-filled or full 4f set. Such an ion is still keen to get back to +3, so a +4 ion is an oxidising agent and a +2 ion a reducing agent.",
      definition:
        "- **+3 is the predominant state.** All Ln³⁺ ions have the configuration \\(4f^n\\) (n = 1 to 14).\n" +
        "- +2 and +4 appear when they give an empty (\\(f^0\\)), half-filled (\\(f^7\\)) or full (\\(f^{14}\\)) f subshell. Pr, Nd, Tb and Dy show +4 only in oxides, MO₂. Samarium, like europium, shows +2 and +3.\n" +
        "- **Ce⁴⁺** has the noble gas configuration but is a strong oxidant, reverting to +3. \\(E^\\circ(\\text{Ce}^{4+}/\\text{Ce}^{3+}) = +1.74\\) V, enough to oxidise water, but the reaction is very slow, so Ce(IV) is a good analytical reagent.\n" +
        "- **Eu²⁺** (\\(f^7\\)) and **Yb²⁺** (\\(f^{14}\\)) are reducing agents, changing to +3. **Tb⁴⁺** (\\(f^7\\)) is an oxidant.\n" +
        "- **General properties:** silvery white soft metals that tarnish in air; hardness rises with atomic number (samarium is steel hard). Many Ln³⁺ ions are coloured because of their f electrons; La³⁺ and Lu³⁺ are colourless. All except the \\(f^0\\) (La³⁺, Ce⁴⁺) and \\(f^{14}\\) (Yb²⁺, Lu³⁺) types are paramagnetic.\n" +
        "- Early members are reactive like calcium; later ones behave more like aluminium. \\(E^\\circ(\\text{Ln}^{3+}/\\text{Ln})\\) is −2.2 to −2.4 V (Eu −2.0 V).\n" +
        "- **Uses:** alloy steels for plates and pipes; **mischmetall** (about 95% lanthanoid metal, 5% iron, traces of S, C, Ca and Al) in a magnesium-based alloy for bullets, shells and lighter flint; mixed oxides as catalysts in petroleum cracking; some oxides as phosphors in television screens.",
      table: {
        columns: ["Ion", "Configuration", "Behaviour"],
        rows: [
          { cells: ["Ln³⁺ (all)", "4fⁿ", "The common and most stable state"] },
          {
            cells: ["Ce⁴⁺", "4f⁰ (noble gas core)", "Strong oxidising agent, returns to Ce³⁺"],
            noteAmber: "Board 2023 asked why Ce⁴⁺ is a strong oxidising agent; 2025 and 2026 asked it again on other pages of this chapter.",
          },
          { cells: ["Tb⁴⁺", "4f⁷ (half filled)", "Oxidising agent"] },
          { cells: ["Eu²⁺", "4f⁷ (half filled)", "Strong reducing agent, changes to Eu³⁺"] },
          { cells: ["Yb²⁺", "4f¹⁴ (full)", "Reducing agent"] },
        ],
      },
      selfCheckExample: {
        prompt: "Why is Eu²⁺ a strong reducing agent although it has a half-filled 4f subshell?",
        steps: [
          "Eu²⁺ forms by losing the two 6s electrons, and its f⁷ set explains why the ion forms at all.",
          "But +3 is the common state of the lanthanoids, and Eu²⁺ readily gives up an electron to reach it.",
        ],
        answer: "It changes easily to the common +3 state, giving away an electron",
      },
      practiceSet: [
        { prompt: "Name a lanthanoid that is well known to show the +4 state.", answer: "Cerium" },
        { prompt: "Calculate the spin-only magnetic moment of Ce³⁺ (4f¹).", answer: "One unpaired electron: \\(\\sqrt{1 \\times 3} = 1.73\\) BM" },
        { prompt: "What is mischmetall and give one use.", answer: "An alloy of about 95% lanthanoid metal and 5% iron; used in magnesium-based alloys for bullets, shells and lighter flint" },
        { prompt: "Which two Ln³⁺ ions are colourless?", answer: "La³⁺ and Lu³⁺" },
      ],
      pyqExampleId: "344346ce-f450-49d1-a199-137e8623884c",
      traps: [
        {
          title: "Calling Ce⁴⁺ a reducing agent",
          body: "Ce⁴⁺ goes DOWN to Ce³⁺, so it takes electrons: an oxidising agent. Eu²⁺ goes UP to Eu³⁺: a reducing agent.",
        },
        {
          title: "Writing Eu²⁺ as [Xe]4f⁷6s²",
          body: "That is the europium atom. Eu²⁺ has lost the two 6s electrons and is [Xe]4f⁷.",
        },
      ],
    },
  ],
};
