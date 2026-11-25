import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_CC_APPLICATIONS_NOTE: SubtopicNote = {
  subtopicName: "Importance and Applications of Coordination Compounds",
  title: "Importance and Applications of Coordination Compounds",
  oneLineDefinition:
    "Where coordination compounds are used: chemical analysis and the hardness of water, extraction and purification of metals, biological systems, industrial catalysis, electroplating, photography and medicine.",
  whyItMatters:
    "3 questions, two of them from the 2026 board paper: the chelating ligand used to treat lead poisoning (an MCQ) and two coordination compounds important in biological systems. The NCERT exercise asks the role of complexes in biology, medicine, analysis and metallurgy, and a 2026 question on another page asks the formula and use of Wilkinson's catalyst. These are quick recall marks: learn one example, with its metal, for each use.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbccc-uses",
      name: "Uses of coordination compounds",
      intuition:
        "A ligand that grips a metal ion tightly can find it, hold it, carry it or pull it out. Chemists use that to detect and measure metal ions, to dissolve gold out of rock, to plate silver evenly and to wash poison metals out of the body. Living things use it too: the metal at the heart of chlorophyll and of haemoglobin is held by a ring of donor atoms.",
      definition:
        "- **Analysis:** colour reactions with ligands (EDTA, DMG (dimethylglyoxime), α-nitroso-β-naphthol, cupron) detect and estimate metal ions. **Hardness of water** is estimated by titration with \\(\\text{Na}_2\\text{EDTA}\\): \\(\\text{Ca}^{2+}\\) and \\(\\text{Mg}^{2+}\\) form stable complexes with EDTA.\n" +
        "- **Extraction:** gold combines with cyanide in the presence of oxygen and water to form \\([\\text{Au}(\\text{CN})_2]^{-}\\); adding zinc gives back the metal. **Purification:** impure nickel is converted to \\([\\text{Ni}(\\text{CO})_4]\\), which is decomposed to give pure nickel.\n" +
        "- **Biology:** chlorophyll is a complex of **magnesium**; haemoglobin, the oxygen carrier of blood, of **iron**; vitamin \\(\\text{B}_{12}\\) (cyanocobalamine) of **cobalt**. Enzymes such as carboxypeptidase A and carbonic anhydrase contain coordinated metal ions.\n" +
        "- **Catalysis:** Wilkinson catalyst, \\([(\\text{Ph}_3\\text{P})_3\\text{RhCl}]\\), a rhodium complex, is used for the hydrogenation of alkenes.\n" +
        "- **Electroplating:** silver and gold plate more smoothly and evenly from \\([\\text{Ag}(\\text{CN})_2]^{-}\\) and \\([\\text{Au}(\\text{CN})_2]^{-}\\) than from simple metal ions.\n" +
        "- **Photography:** hypo dissolves the undecomposed AgBr of the developed film as \\([\\text{Ag}(\\text{S}_2\\text{O}_3)_2]^{3-}\\).\n" +
        "- **Medicine (chelate therapy):** excess copper and iron are removed by D-penicillamine and desferrioxime B; **EDTA is used in the treatment of lead poisoning**; cis-platin and related platinum compounds inhibit the growth of tumours.",
      table: {
        columns: ["Area", "Coordination compound or ligand", "Use"],
        rows: [
          { cells: ["Analysis", "Na₂EDTA", "Estimating hardness of water (Ca²⁺, Mg²⁺)"] },
          { cells: ["Metallurgy", "[Au(CN)₂]⁻; [Ni(CO)₄]", "Extraction of gold; purification of nickel"] },
          { cells: ["Biology", "Chlorophyll, haemoglobin, vitamin B₁₂", "Complexes of Mg, Fe and Co"] },
          { cells: ["Industry", "Wilkinson catalyst [(Ph₃P)₃RhCl]", "Hydrogenation of alkenes"] },
          { cells: ["Electroplating", "[Ag(CN)₂]⁻, [Au(CN)₂]⁻", "Smooth, even silver and gold plating"] },
          { cells: ["Photography", "[Ag(S₂O₃)₂]³⁻", "Fixing the film with hypo"] },
          { cells: ["Medicine", "EDTA; D-penicillamine, desferrioxime B; cis-platin", "Lead poisoning; excess copper and iron; tumours"] },
        ],
      },
      selfCheckExample: {
        prompt: "In black and white photography, how does hypo fix the developed film? Write the complex formed.",
        steps: [
          "Hypo dissolves the silver bromide that was not decomposed by light.",
          "It does so by forming a soluble complex ion with \\(\\text{Ag}^{+}\\).",
        ],
        answer: "AgBr dissolves as \\([\\text{Ag}(\\text{S}_2\\text{O}_3)_2]^{3-}\\)",
      },
      practiceSet: [
        { prompt: "Which metal is present in chlorophyll, and which in haemoglobin?", answer: "Magnesium in chlorophyll; iron in haemoglobin" },
        { prompt: "Write the formula of Wilkinson catalyst and give its use.", answer: "\\([(\\text{Ph}_3\\text{P})_3\\text{RhCl}]\\); hydrogenation of alkenes" },
        { prompt: "How is the hardness of water estimated using a complex?", answer: "By titration with \\(\\text{Na}_2\\text{EDTA}\\): \\(\\text{Ca}^{2+}\\) and \\(\\text{Mg}^{2+}\\) form stable complexes with EDTA" },
      ],
      pyqExampleId: "94db516e-046d-46dd-b59a-a36d11481260",
      traps: [
        {
          title: "Mixing up the metals of biology",
          body: "Chlorophyll is magnesium, haemoglobin is iron, vitamin B₁₂ is cobalt. Name the compound and its metal: \"haemoglobin\" alone may not earn the mark if the question asks for the metal too.",
        },
        {
          title: "EDTA is not the anticancer drug",
          body: "EDTA treats lead poisoning. The platinum complex cis-platin inhibits tumours. D-penicillamine and desferrioxime B remove excess copper and iron.",
        },
      ],
    },
  ],
};
