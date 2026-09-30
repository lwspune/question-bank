import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/jee-mains-chemistry/d-and-f-block-elements";

export const LANTHANOIDS_DFB_NOTE: SubtopicNote = {
  subtopicName: "Lanthanoids and Actinoids",
  title: "Lanthanoids and Actinoids",
  oneLineDefinition:
    "The lanthanoids Ce to Lu fill the buried 4f subshell and are almost all +3, with Ce⁴⁺ and Tb⁴⁺ as oxidants and Eu²⁺ and Yb²⁺ as reductants; the actinoids fill 5f, which is less buried, so they bond more and show more oxidation states.",
  whyItMatters:
    "Thirty-one PYQs, twenty-nine of them multiple choice, and two from 2026. Thirteen write a lanthanoid configuration or count the 4f electrons of an ion, often to decide its colour or magnetism; thirteen ask which ions leave the +3 state and whether that makes them oxidants or reductants; five compare the actinoids with the lanthanoids. Nearly every answer is one 4f count away.",
  concepts: [
    // C1 — configurations
    {
      kind: "reference" as const,
      slug: "jcdfb-ln-config",
      name: "Lanthanoid configurations and 4f counts",
      intuition:
        "Across the lanthanoids the new electron goes into 4f, deep inside the atom. Most atoms are [Xe]4fⁿ6s². Gadolinium and lutetium keep one 5d electron, because that leaves a half-filled 4f⁷ and a full 4f¹⁴. Forming the +3 ion always removes the two 6s electrons and then one more, so every Ln³⁺ is simply [Xe]4fⁿ with n = Z − 57.",
      definition:
        "- The lanthanoids are the 14 elements Ce (58) to Lu (71). La (57) is the reference element, and actinoids such as Cm are not lanthanoids.\n" +
        "- **Atoms**: [Xe]4fⁿ6s², except Ce 4f¹5d¹6s², Gd 4f⁷5d¹6s², Lu 4f¹⁴5d¹6s² (La is 5d¹6s²).\n" +
        "- **Ln³⁺**: 4f electrons \\(= Z - 57\\). So Gd³⁺ is 4f⁷ and Lu³⁺ is 4f¹⁴.\n" +
        "- **Half-filled 4f⁷**: the atoms Eu and Gd; the ions Eu²⁺, Gd³⁺ and Tb⁴⁺.\n" +
        "- **Colourless and diamagnetic**: 4f⁰ (La³⁺, Ce⁴⁺) and 4f¹⁴ (Lu³⁺, Yb²⁺). Other Ln³⁺ ions are coloured by f–f transitions.\n" +
        "- **Isoelectronic ions** have the same value of Z minus the charge: Eu³⁺ and Sm²⁺ both have 60 electrons, so they are isoelectronic.\n" +
        "- Spin-only moments of f ions: Gd³⁺ (7 unpaired) 7.94 BM, Eu³⁺ (6) 6.93 BM, Ce⁴⁺ 0.",
      table: {
        columns: ["Element (Z)", "Atom", "M³⁺ ion", "Other common ion"],
        rows: [
          { cells: ["La (57)", "[Xe]5d¹6s²", "4f⁰, colourless", "Shows only +3"] },
          { cells: ["Ce (58)", "[Xe]4f¹5d¹6s²", "4f¹", "Ce⁴⁺, 4f⁰"] },
          { cells: ["Pr (59)", "[Xe]4f³6s²", "4f²", "Pr⁴⁺, 4f¹"] },
          { cells: ["Nd (60)", "[Xe]4f⁴6s²", "4f³", "Nd²⁺ 4f⁴; Nd⁴⁺ 4f²"] },
          { cells: ["Pm (61)", "[Xe]4f⁵6s²", "4f⁴", "Shows only +3"] },
          { cells: ["Sm (62)", "[Xe]4f⁶6s²", "4f⁵", "Sm²⁺, 4f⁶"] },
          { cells: ["Eu (63)", "[Xe]4f⁷6s²", "4f⁶", "Eu²⁺, 4f⁷"], noteAmber: "Eu²⁺ and Gd³⁺ are the two 4f⁷ ions." },
          { cells: ["Gd (64)", "[Xe]4f⁷5d¹6s²", "4f⁷", "Shows only +3"] },
          { cells: ["Tb (65)", "[Xe]4f⁹6s²", "4f⁸", "Tb⁴⁺, 4f⁷"] },
          { cells: ["Dy (66)", "[Xe]4f¹⁰6s²", "4f⁹", "Dy⁴⁺, 4f⁸"] },
          { cells: ["Ho (67)", "[Xe]4f¹¹6s²", "4f¹⁰", "Shows only +3"] },
          { cells: ["Er (68)", "[Xe]4f¹²6s²", "4f¹¹", "Shows only +3"] },
          { cells: ["Tm (69)", "[Xe]4f¹³6s²", "4f¹²", "Tm²⁺, 4f¹³"] },
          { cells: ["Yb (70)", "[Xe]4f¹⁴6s²", "4f¹³", "Yb²⁺, 4f¹⁴"] },
          { cells: ["Lu (71)", "[Xe]4f¹⁴5d¹6s²", "4f¹⁴, colourless", "Shows only +3"] },
        ],
        caption: "The +3 ion always has Z − 57 electrons in 4f; the ions in the last column reach 4f⁰, 4f⁷ or 4f¹⁴, or come close.",
      },
      selfCheckExample: {
        prompt:
          "How many 4f electrons does \\(\\mathrm{Dy^{3+}}\\) (Z = 66) have? Is the ion coloured, and what is its spin-only moment?",
        steps: [
          "\\(66 - 57 = 9\\), so the ion is 4f⁹.",
          "Seven f orbitals: seven electrons go in singly and two pair up, leaving 5 unpaired.",
          "A partly filled 4f shell gives colour; \\(\\mu = \\sqrt{5 \\times 7} = 5.92\\) BM.",
        ],
        answer: "4f⁹; coloured; 5.92 BM.",
      },
      practiceSet: [
        { prompt: "4f electrons in \\(\\mathrm{Er^{3+}}\\) (Z = 68)?", answer: "11" },
        { prompt: "Configuration of Gd (Z = 64)?", answer: "[Xe]4f⁷5d¹6s²" },
        { prompt: "Colourless: \\(\\mathrm{Nd^{3+}}\\), \\(\\mathrm{Lu^{3+}}\\), \\(\\mathrm{Sm^{3+}}\\) or \\(\\mathrm{Pr^{3+}}\\)?", answer: "\\(\\mathrm{Lu^{3+}}\\) (4f¹⁴)" },
        { prompt: "Which lanthanoid +2 ion is diamagnetic?", answer: "\\(\\mathrm{Yb^{2+}}\\) (4f¹⁴)" },
        { prompt: "Spin-only moment of \\(\\mathrm{Gd^{3+}}\\)?", answer: "7.94 BM" },
      ],
      pyqExampleId: "9799e4de-e9d3-41c2-9672-f41cc5faf311", // 2025 — 4f7 ions: Eu2+ and Gd3+
      traps: [
        {
          title: "The 5d electron in Gd and Lu does not change the ion",
          body: "Gd is 4f⁷5d¹6s², but Gd³⁺ is still 4f⁷: the three electrons lost are 6s², 5d¹. Use Z − 57 for every +3 ion and the atom's quirks drop out.",
        },
        {
          title: "Isoelectronic means the same total, Z minus charge",
          body: "Compare Z − charge, not the charge. \\(\\mathrm{Tb^{2+}}\\) has 63 electrons and \\(\\mathrm{Tm^{4+}}\\) has 65, so they are not isoelectronic even though both look like 'lanthanoid ions near 4f⁷'.",
        },
      ],
    },

    // C2 — oxidation states other than +3
    {
      kind: "reference" as const,
      slug: "jcdfb-ln-oxstates",
      name: "Lanthanoid ions outside the +3 state",
      intuition:
        "+3 is the home state of every lanthanoid. An ion in another state exists because it reaches, or nearly reaches, 4f⁰, 4f⁷ or 4f¹⁴. But reaching a tidy shell does not make it stable in water: the ion still wants to return to +3. So a +4 ion takes an electron and is an oxidant, and a +2 ion gives one away and is a reductant.",
      definition:
        "- **+3** is the most common and most stable state for all lanthanoids.\n" +
        "- **+4** (oxidants): Ce⁴⁺ (4f⁰) and Tb⁴⁺ (4f⁷). E°(Ce⁴⁺/Ce³⁺) = +1.74 V: it could oxidise water, but slowly, so Ce(IV) is a good analytical reagent. Tb⁴⁺ is an even stronger oxidant.\n" +
        "- Pr, Nd, Tb and Dy also show +4, but only in solid oxides \\(\\mathrm{MO_2}\\) (with Ce, which forms \\(\\mathrm{CeO_2}\\)). Yb forms no \\(\\mathrm{MO_2}\\).\n" +
        "- **+2** (reductants): Eu²⁺ (4f⁷) and Yb²⁺ (4f¹⁴); also Sm²⁺. Aqueous \\(\\mathrm{EuSO_4}\\) is a strong reducing agent.\n" +
        "- Eu and Yb have the highest third ionisation enthalpies: their third electron would come out of 4f⁷ or 4f¹⁴. So they are the easiest to hold at +2.\n" +
        "- Ce leaves the +3 state most easily (to +4).\n" +
        "- \\(\\mathrm{CeO_2}\\) is used as an oxidant in organic chemistry, for example on aldehydes and ketones.",
      table: {
        columns: ["Ion", "4f configuration", "Why it exists", "Behaviour"],
        rows: [
          { cells: ["Ce⁴⁺", "4f⁰", "Noble-gas (Xe) core", "Strong oxidant; E° = +1.74 V back to Ce³⁺"], noteAmber: "The noble-gas core favours forming Ce⁴⁺, but Ce³⁺ is still the more stable state in water." },
          { cells: ["Tb⁴⁺", "4f⁷", "Half-filled 4f", "Stronger oxidant than Ce⁴⁺; found in \\(\\mathrm{TbO_2}\\)"] },
          { cells: ["Pr⁴⁺, Nd⁴⁺, Dy⁴⁺", "4f¹, 4f², 4f⁸", "Stabilised only in the solid oxide", "Found only as \\(\\mathrm{MO_2}\\); oxidants"] },
          { cells: ["Eu²⁺", "4f⁷", "Half-filled 4f after losing 6s²", "Strong reductant; turns into Eu³⁺"] },
          { cells: ["Yb²⁺", "4f¹⁴", "Full 4f after losing 6s²", "Reductant; diamagnetic"] },
          { cells: ["Sm²⁺", "4f⁶", "Close to 4f⁷", "Reductant"] },
          { cells: ["Ln³⁺ (all)", "4f¹ to 4f¹⁴", "Loss of 6s² and one more electron", "The stable state of every lanthanoid"] },
        ],
        caption: "+4 ions are oxidants and +2 ions are reductants, because each tends to return to +3.",
      },
      selfCheckExample: {
        prompt:
          "Of \\(\\mathrm{Tb^{4+}}\\) and \\(\\mathrm{Yb^{2+}}\\), which is an oxidising agent and which a reducing agent? Give the reason for each.",
        steps: [
          "Both ions tend to return to the common +3 state.",
          "\\(\\mathrm{Tb^{4+}}\\) must GAIN an electron to reach Tb³⁺, so it oxidises.",
          "\\(\\mathrm{Yb^{2+}}\\) must LOSE an electron to reach Yb³⁺, so it reduces.",
        ],
        answer: "\\(\\mathrm{Tb^{4+}}\\) is the oxidant; \\(\\mathrm{Yb^{2+}}\\) is the reductant.",
      },
      practiceSet: [
        { prompt: "Most common oxidation state of the lanthanoids?", answer: "+3" },
        { prompt: "E° of the \\(\\mathrm{Ce^{4+}/Ce^{3+}}\\) couple?", answer: "+1.74 V" },
        { prompt: "Which of Pr, Yb, Nd and Dy does not form \\(\\mathrm{MO_2}\\)?", answer: "Yb" },
        { prompt: "Pair with high third ionisation enthalpies: Eu and Yb, or La and Ce?", answer: "Eu and Yb" },
        { prompt: "Is aqueous \\(\\mathrm{EuSO_4}\\) oxidising or reducing?", answer: "Reducing" },
      ],
      pyqExampleId: "d4b31b10-d73e-4080-ad50-fbfce535c435", // 2023 — strong reductant Eu2+, strong oxidant Ce4+
      traps: [
        {
          title: "A noble-gas core does not make Ce⁴⁺ the stable state",
          body: "The Xe core favours FORMING Ce⁴⁺, but in water Ce⁴⁺ returns to Ce³⁺, which is why it is an oxidant. 'Ce is more stable as Ce⁴⁺ than as Ce³⁺' is false.",
        },
        {
          title: "4f⁷ does not stop Eu²⁺ reducing",
          body: "Eu²⁺ has a half-filled 4f⁷, yet it is a strong reductant. The +3 state is still preferred, so the special configuration does not protect it.",
        },
      ],
    },

    // C3 — actinoids
    {
      kind: "reference" as const,
      slug: "jcdfb-actinoids",
      name: "Actinoids compared with lanthanoids",
      intuition:
        "The actinoids fill 5f instead of 4f. The 5f orbitals reach further out and are shielded less, so their electrons take part in bonding. That gives the actinoids many more oxidation states and a richer chemistry. The poor shielding by 5f electrons also makes the actinoid contraction larger, element to element, than the lanthanoid contraction.",
      definition:
        "- The actinoids are Th (90) to Lr (103). All are radioactive.\n" +
        "- 5f, 6d and 7s are close in energy, so configurations are irregular: Np \\([\\mathrm{Rn}]\\,5f^{4}6d^{1}7s^{2}\\), Am \\(5f^{7}7s^{2}\\), Cm \\(5f^{7}6d^{1}7s^{2}\\), Es \\(5f^{11}7s^{2}\\).\n" +
        "- Unpaired electrons: Am 7, Cm 8 (seven in 5f and one in 6d).\n" +
        "- Oxidation states: +3 is common, but the early actinoids go higher, up to +7 for Np.\n" +
        "- **Actinoid contraction**: the size of M³⁺ falls along the series, by more per element than in the lanthanoids. So \\(\\mathrm{Bk^{3+}}\\) is smaller than \\(\\mathrm{Np^{3+}}\\).",
      table: {
        columns: ["Property", "Lanthanoids", "Actinoids"],
        rows: [
          { cells: ["Subshell being filled", "4f, deeply buried", "5f, less buried, reaches further out"] },
          { cells: ["f electrons in bonding", "Very little", "To a far greater extent"] },
          { cells: ["Oxidation states", "Mostly +3; a few +2 and +4", "+3 common; up to +7 (Np) in the first half"] },
          { cells: ["Contraction along the series", "Lanthanoid contraction", "Actinoid contraction: larger from element to element"] },
          { cells: ["Radioactivity", "Only Pm", "All of them"] },
          { cells: ["Example configuration", "Gd [Xe]4f⁷5d¹6s²", "Cm [Rn]5f⁷6d¹7s²"] },
        ],
        caption: "Almost every actinoid difference traces back to 5f orbitals being less buried than 4f.",
      },
      selfCheckExample: {
        prompt:
          "How many unpaired electrons do the atoms of americium (Z = 95) and curium (Z = 96) have?",
        steps: [
          "Am is \\([\\mathrm{Rn}]\\,5f^{7}7s^{2}\\): seven unpaired electrons in 5f, and the 7s pair adds none.",
          "Cm is \\([\\mathrm{Rn}]\\,5f^{7}6d^{1}7s^{2}\\): seven in 5f plus one in 6d.",
        ],
        answer: "Am has 7; Cm has 8.",
      },
      practiceSet: [
        { prompt: "Which is smaller, \\(\\mathrm{Bk^{3+}}\\) or \\(\\mathrm{Np^{3+}}\\)?", answer: "\\(\\mathrm{Bk^{3+}}\\)" },
        { prompt: "Configuration of Np (Z = 93)?", answer: "\\([\\mathrm{Rn}]\\,5f^{4}6d^{1}7s^{2}\\)" },
        { prompt: "Is the contraction per element larger in the actinoids or the lanthanoids?", answer: "The actinoids" },
        { prompt: "Highest oxidation state shown by neptunium?", answer: "+7" },
        { prompt: "Configuration of Es (Z = 99)?", answer: "\\([\\mathrm{Rn}]\\,5f^{11}7s^{2}\\)" },
      ],
      pyqExampleId: "1a155ce5-4cf9-438b-822e-09dfc241a741", // 2023 — 5f less buried than 4f, so 5f electrons bond more
      traps: [
        {
          title: "Name the right contraction",
          body: "The shrinking of \\(\\mathrm{M^{3+}}\\) across Th to Lr is the ACTINOID contraction. A reason that calls it the lanthanoid contraction is wrong for actinoid ions such as \\(\\mathrm{Bk^{3+}}\\) and \\(\\mathrm{Np^{3+}}\\).",
        },
        {
          title: "Cm has eight unpaired electrons",
          body: "Am and Cm both have 5f⁷, but curium adds a 6d electron. 'Cm and Am have seven unpaired electrons' is false.",
        },
      ],
    },
  ],
  related: [
    { label: "Magnetic Moment and Colour — the same counting for d ions", href: `${BASE}/jch-dfb-magnetic` },
    { label: "Oxidation States and Electrode Potentials — the d-block comparison", href: `${BASE}/jch-dfb-oxstates` },
  ],
};
