import type { SubtopicNote } from "@/app/notes/_types";

export const G14_PB_NOTE: SubtopicNote = {
  subtopicName: "Group 14: Carbon, Silicon, Tin and Lead",
  title: "Group 14: Carbon, Silicon, Tin and Lead",
  oneLineDefinition:
    "Carbon, silicon, germanium, tin and lead (ns² np²): carbon alone forms strong multiple bonds and long chains, silicon and the heavier elements use d orbitals, and the inert pair makes Sn²⁺ a reducing agent and Pb⁴⁺ an oxidising agent.",
  whyItMatters:
    "Sixteen PYQs, all multiple choice, and two from 2026. Six test carbon, silicon and the group trends: the structure of C₆₀, silicones, which hexahalide ions exist and the nature of the oxides; four ask which tin and lead ions oxidise and which reduce; six are the lead tests of salt analysis.",
  concepts: [
    // C1 — group trends, carbon and silicon
    {
      kind: "reference" as const,
      slug: "jcpb-carbon-silicon",
      name: "Group 14 trends, carbon's allotropes and silicones",
      intuition:
        "Carbon is small, has no d orbitals and forms strong pπ–pπ multiple bonds with itself. Those two gifts, catenation and multiple bonding, give it allotropes such as graphite and the fullerenes. From silicon down, the atoms are too big for pπ–pπ bonds but have d orbitals, so they can take more than four groups: silicon forms \\(\\mathrm{[SiF_6]^{2-}}\\). Silicon's chemistry also gives silicones, chains and sheets of alternating Si and O, and the number of OH groups on the starting silicon decides how far the chain can grow.",
      definition:
        "- **Covalent radius rises** from C to Pb; electronegativity falls from C (2.5) to Si, then stays near 1.8–1.9.\n" +
        "- **First ionisation enthalpy** of each group 14 element is higher than that of the group 13 element in the same period.\n" +
        "- **Maximum covalency of carbon is 4;** Si, Ge, Sn and Pb can exceed 4 using d orbitals. Heavier elements do not form \\(p\\pi\\)–\\(p\\pi\\) bonds. Carbon also shows negative oxidation states.\n" +
        "- **Hexahalide ions:** \\(\\mathrm{[SiF_6]^{2-}}\\), \\(\\mathrm{[GeCl_6]^{2-}}\\) and \\(\\mathrm{[Sn(OH)_6]^{2-}}\\) exist; \\(\\mathrm{[SiCl_6]^{2-}}\\) does not, because six large chlorides cannot fit round small silicon.\n" +
        "- **Oxides:** \\(\\mathrm{CO_2}\\), \\(\\mathrm{SiO_2}\\) and \\(\\mathrm{GeO_2}\\) acidic; \\(\\mathrm{SnO}\\), \\(\\mathrm{SnO_2}\\), \\(\\mathrm{PbO}\\) and \\(\\mathrm{PbO_2}\\) amphoteric.\n" +
        "- **\\(\\mathrm{C_{60}}\\):** 20 six-membered and 12 five-membered rings; every carbon \\(sp^2\\) with three σ bonds; a five-membered ring is fused only to six-membered rings.\n" +
        "- **Silicones by number of OH on Si:** \\(\\mathrm{R_3SiOH}\\) gives a dimer, \\(\\mathrm{R_2Si(OH)_2}\\) a linear chain, \\(\\mathrm{RSi(OH)_3}\\) a cross-linked (2D) silicone; \\(\\mathrm{R_4Si}\\) has no OH and stays a silane.",
      table: {
        columns: ["Element", "Covalent radius (pm)", "First ionisation enthalpy (kJ/mol)", "Electronegativity", "What sets it apart"],
        rows: [
          { cells: ["C", "77", "1086", "2.5", "Catenation and \\(p\\pi\\)–\\(p\\pi\\) bonds; maximum covalency 4; allotropes"] },
          { cells: ["Si", "118", "786", "1.8", "Uses d orbitals: \\(\\mathrm{[SiF_6]^{2-}}\\) exists; \\(\\mathrm{SiO_2}\\) is acidic; forms silicones"] },
          { cells: ["Ge", "122", "761", "1.8", "\\(\\mathrm{GeO_2}\\) acidic; \\(\\mathrm{[GeCl_6]^{2-}}\\) exists"] },
          { cells: ["Sn", "140", "708", "1.8", "+4 more stable than +2; oxides amphoteric"] },
          { cells: ["Pb", "146", "715", "1.9", "+2 more stable than +4; oxides amphoteric"], noteAmber: "Lead's ionisation enthalpy is a little HIGHER than tin's: poor shielding by 4f and 5d electrons." },
        ],
        caption: "The ionisation enthalpy falls from C to Sn, then rises slightly at Pb.",
      },
      selfCheckExample: {
        prompt: "How many five-membered and six-membered rings does buckminsterfullerene have, and what is the hybridisation of each carbon?",
        steps: [
          "Buckminsterfullerene has 60 carbon atoms arranged like a football.",
          "Its surface is made of 12 five-membered rings and 20 six-membered rings.",
          "Each carbon forms three σ bonds and one delocalised π bond.",
        ],
        answer: "12 five-membered, 20 six-membered; every carbon \\(sp^2\\).",
      },
      practiceSet: [
        { prompt: "What kind of silicone forms from \\(\\mathrm{(CH_3)_2Si(OH)_2}\\)?", answer: "A linear chain silicone" },
        { prompt: "Which does not exist: \\(\\mathrm{[SiF_6]^{2-}}\\) or \\(\\mathrm{[SiCl_6]^{2-}}\\)?", answer: "\\(\\mathrm{[SiCl_6]^{2-}}\\)" },
        { prompt: "Is \\(\\mathrm{GeO_2}\\) acidic, basic or amphoteric?", answer: "Acidic" },
        { prompt: "Can silicon form \\(p\\pi\\)–\\(p\\pi\\) double bonds as carbon does?", answer: "No; only carbon in group 14 forms them" },
      ],
      pyqExampleId: "25d7af4d-5ec1-4532-94ab-c3e904138d03", // 27 Jun 2022 — silicone type from the number of OH on Si
      traps: [
        {
          title: "Carbon's allotropy comes from pπ–pπ bonds, not pπ–dπ",
          body: "Carbon has no d orbitals. Its allotropes arise from catenation and its ability to form \\(p\\pi\\)–\\(p\\pi\\) multiple bonds with itself.",
        },
        {
          title: "C₆₀ has 20 six-membered and 12 five-membered rings",
          body: "It is easy to swap the numbers. Buckminsterfullerene has twelve pentagons, each surrounded only by hexagons, and twenty hexagons.",
        },
        {
          title: "Covalent radius increases down group 14",
          body: "From C to Pb each element adds a shell, so the covalent radius increases. A statement that it decreases in a regular manner is false.",
        },
      ],
    },

    // C2 — tin and lead, inert pair
    {
      kind: "reference" as const,
      slug: "jcpb-tin-lead",
      name: "Inert pair effect in tin and lead: which ions oxidise and which reduce",
      intuition:
        "Tin prefers +4, so \\(\\mathrm{Sn^{2+}}\\) readily gives up two electrons and is a reducing agent. Lead prefers +2 because its 6s pair is held tightly (the inert pair effect), so \\(\\mathrm{Pb^{4+}}\\) readily takes two electrons back and is a strong oxidising agent. The rule works across groups: the ion that is NOT in the element's preferred state is the reactive one.",
      definition:
        "- **Tin:** +4 more stable, so \\(\\mathrm{Sn^{2+}}\\) is reducing. \\(\\mathrm{SnCl_2}\\) reduces \\(\\mathrm{HgCl_2}\\).\n" +
        "- **Lead:** +2 more stable, so \\(\\mathrm{Pb^{4+}}\\) is strongly oxidising; \\(\\mathrm{E^\\circ(Pb^{4+}/Pb^{2+}) = +1.67\\ V}\\).\n" +
        "- **\\(\\mathrm{PbO_2}\\)** is a strong oxidising agent, is amphoteric and is the cathode material of the lead storage battery; it oxidises HCl to chlorine: \\(\\mathrm{PbO_2 + 4HCl \\rightarrow PbCl_2 + Cl_2 + 2H_2O}\\).\n" +
        "- **Across groups 13 and 14,** the oxidising ions are the ones above the preferred state: \\(\\mathrm{Tl^{3+}}\\) and \\(\\mathrm{Pb^{4+}}\\).",
      table: {
        columns: ["Ion", "Preferred state of the element", "Behaves as", "Evidence"],
        rows: [
          { cells: ["\\(\\mathrm{Sn^{2+}}\\)", "+4", "Reducing agent", "\\(\\mathrm{E^\\circ(Sn^{4+}/Sn^{2+}) = +0.15\\ V}\\): \\(\\mathrm{Sn^{2+}}\\) is easily oxidised"] },
          { cells: ["\\(\\mathrm{Sn^{4+}}\\)", "+4", "Stable; a very weak oxidant at most", "Same small potential, \\(+0.15\\ V\\)"] },
          { cells: ["\\(\\mathrm{Pb^{2+}}\\)", "+2", "Stable", "The 6s pair stays out of bonding"] },
          { cells: ["\\(\\mathrm{Pb^{4+}}\\)", "+2", "Strong oxidising agent", "\\(\\mathrm{E^\\circ(Pb^{4+}/Pb^{2+}) = +1.67\\ V}\\), the most positive here"], noteAmber: "The strongest oxidant among these p-block ions." },
          { cells: ["\\(\\mathrm{Tl^{3+}}\\)", "+1", "Strong oxidising agent", "\\(\\mathrm{Tl^{3+}}\\) reduced to \\(\\mathrm{Tl^{+}}\\): \\(+1.26\\ V\\)"] },
          { cells: ["\\(\\mathrm{Tl^{+}}\\)", "+1", "Stable", "The 6s pair stays out of bonding"] },
        ],
        caption: "The more positive the reduction potential, the stronger the oxidising agent.",
      },
      selfCheckExample: {
        prompt: "Which is the stronger oxidising agent, \\(\\mathrm{PbO_2}\\) or \\(\\mathrm{SnO_2}\\)? Which is the better reducing agent, \\(\\mathrm{SnCl_2}\\) or \\(\\mathrm{PbCl_2}\\)?",
        steps: [
          "Lead prefers +2, so lead in +4 (\\(\\mathrm{PbO_2}\\)) wants electrons; tin is happy in +4.",
          "Tin prefers +4, so tin in +2 (\\(\\mathrm{SnCl_2}\\)) gives electrons away; lead is happy in +2.",
        ],
        answer: "\\(\\mathrm{PbO_2}\\) is the stronger oxidant; \\(\\mathrm{SnCl_2}\\) is the better reductant.",
      },
      practiceSet: [
        { prompt: "Which lead oxide is the cathode material of a lead storage battery?", answer: "\\(\\mathrm{PbO_2}\\)" },
        { prompt: "Is \\(\\mathrm{PbO_2}\\) acidic, basic or amphoteric?", answer: "Amphoteric" },
        { prompt: "Which of \\(\\mathrm{Sn^{2+}}\\) and \\(\\mathrm{Pb^{2+}}\\) is a reducing agent?", answer: "\\(\\mathrm{Sn^{2+}}\\)" },
        { prompt: "What gas does \\(\\mathrm{PbO_2}\\) give with concentrated HCl?", answer: "Chlorine" },
      ],
      pyqExampleId: "a5c7e5a8-dde0-4f0d-ae92-5d20f6f6c2a8", // 7 Apr 2025 — identify Sn and Pb from ionisation enthalpies, then A²⁺ and B⁴⁺
      traps: [
        {
          title: "The lower state is not always the reducing one",
          body: "\\(\\mathrm{Sn^{2+}}\\) is a reducing agent but \\(\\mathrm{Pb^{2+}}\\) is not. What matters is each element's preferred state: +4 for tin, +2 for lead.",
        },
        {
          title: "Pb⁴⁺ is not stable like Sn⁴⁺",
          body: "Both are +4, but lead's 6s pair resists bonding, so \\(\\mathrm{Pb^{4+}}\\) is a strong oxidising agent while \\(\\mathrm{Sn^{4+}}\\) is stable.",
        },
      ],
    },

    // C3 — lead in salt analysis
    {
      kind: "reference" as const,
      slug: "jcpb-lead-tests",
      name: "Tests for the lead ion in salt analysis",
      intuition:
        "Lead salts are identified by a chain of precipitates. Lead chloride is only slightly soluble in cold water but dissolves in hot water, which separates it from silver chloride. The coloured tests confirm it: yellow lead chromate, yellow lead iodide and white lead sulphate. Two of these dissolve again in a second reagent, and the product is asked often: lead chromate in sodium hydroxide, because lead is amphoteric, and lead sulphate in ammonium acetate.",
      definition:
        "- **Lead chloride** is white, sparingly soluble in cold water, soluble in hot water.\n" +
        "- **Lead sulphide** is black; it dissolves in hot dilute nitric acid: \\(\\mathrm{3PbS + 8HNO_3 \\rightarrow 3Pb(NO_3)_2 + 2NO + 3S + 4H_2O}\\).\n" +
        "- **Lead chromate** is yellow and dissolves in NaOH: \\(\\mathrm{PbCrO_4 + 4NaOH \\rightarrow Na_2[Pb(OH)_4] + Na_2CrO_4}\\). The product is a dianionic complex with coordination number 4.\n" +
        "- **Lead sulphate** is white and dissolves in ammonium acetate as soluble lead acetate; JEE writes it as the complex \\(\\mathrm{(NH_4)_2[Pb(CH_3COO)_4]}\\).\n" +
        "- **Lead nitrate** is soluble, so it is never a confirmatory precipitate.",
      table: {
        columns: ["Reagent added to Pb²⁺", "Product", "Colour", "What happens next"],
        rows: [
          { cells: ["Dilute HCl", "\\(\\mathrm{PbCl_2}\\)", "White", "Dissolves on heating the water"] },
          { cells: ["\\(\\mathrm{H_2S}\\)", "\\(\\mathrm{PbS}\\)", "Black", "Dissolves in hot dilute \\(\\mathrm{HNO_3}\\) to give \\(\\mathrm{Pb(NO_3)_2}\\)"] },
          { cells: ["\\(\\mathrm{K_2CrO_4}\\)", "\\(\\mathrm{PbCrO_4}\\)", "Yellow", "Dissolves in NaOH as \\(\\mathrm{Na_2[Pb(OH)_4]}\\)"], noteAmber: "Charge 2−, four OH groups: coordination number 4." },
          { cells: ["KI", "\\(\\mathrm{PbI_2}\\)", "Yellow", "Dissolves in hot water and returns as golden spangles on cooling"] },
          { cells: ["Dilute \\(\\mathrm{H_2SO_4}\\)", "\\(\\mathrm{PbSO_4}\\)", "White", "Dissolves in ammonium acetate solution"] },
        ],
        caption: "Chloride, sulphate and nitrate of lead are the white or colourless ones; chromate and iodide are yellow; sulphide is black.",
      },
      selfCheckExample: {
        prompt: "A white chloride precipitate dissolves when the test tube is heated in water, and the hot solution gives a yellow precipitate with potassium iodide. Which cation is present, and what is the yellow solid?",
        steps: [
          "A chloride that dissolves in hot water is lead chloride; silver chloride would not dissolve.",
          "Lead ions with iodide give yellow lead iodide.",
        ],
        answer: "\\(\\mathrm{Pb^{2+}}\\); the yellow solid is \\(\\mathrm{PbI_2}\\).",
      },
      practiceSet: [
        { prompt: "What colour is lead sulphate?", answer: "White" },
        { prompt: "Which lead compound dissolves in hot water: \\(\\mathrm{PbCl_2}\\) or \\(\\mathrm{PbSO_4}\\)?", answer: "\\(\\mathrm{PbCl_2}\\)" },
        { prompt: "What is the coordination number of lead in the product of lead chromate with NaOH?", answer: "4, in \\(\\mathrm{[Pb(OH)_4]^{2-}}\\)" },
        { prompt: "Which of copper(II) chloride, silver chloride and lead chloride is freely soluble in cold water?", answer: "Copper(II) chloride" },
      ],
      pyqExampleId: "d546b128-33d5-4325-b588-43ef67bcf9ea", // 21 Jan 2026 S1 — lead chromate, plumbite and the acetate complex
      traps: [
        {
          title: "Lead chromate in NaOH gives a 2− complex with four OH",
          body: "The product is \\(\\mathrm{Na_2[Pb(OH)_4]}\\): lead(II) with four hydroxide groups, coordination number 4, overall charge 2−. It is not neutral and not six-coordinate.",
        },
        {
          title: "Lead nitrate is not a confirmatory test",
          body: "Every confirmatory test for \\(\\mathrm{Pb^{2+}}\\) makes an insoluble salt: chromate, iodide or sulphate. Lead nitrate is soluble, so its formation confirms nothing.",
        },
      ],
    },
  ],
};
