import type { SubtopicNote } from "@/app/notes/_types";

export const G16_PB_NOTE: SubtopicNote = {
  subtopicName: "Group 16: Oxygen and Sulphur",
  title: "Group 16: Oxygen and Sulphur",
  oneLineDefinition:
    "Oxygen, sulphur, selenium, tellurium and polonium (ns² np⁴): oxygen is the small, anomalous member, the hydrides grow more acidic and more reducing down the group, and sulphur forms a family of oxoacids and a set of tests every salt analysis uses.",
  whyItMatters:
    "Thirty PYQs, twenty-six of them multiple choice, and two from 2026. Thirteen test the group trends: oxygen's anomalies, oxidation states, the hydrides, the oxides, ozone and sulphur's allotropes; eight ask about the structures of sulphur's oxoacids; nine are sulphur redox reactions and the tests for sulphide and sulphite.",
  concepts: [
    // C1 — group trends
    {
      kind: "reference" as const,
      slug: "jcpb-g16-trends",
      name: "Group 16 trends: oxygen's anomalies, hydrides and oxides",
      intuition:
        "Oxygen is small, highly electronegative and has no d orbitals, so it forms strong pπ–pπ double bonds and exists as O₂. Sulphur cannot do this well and bonds to itself with single bonds instead, giving S₈ rings. That difference in atomicity, not a small change in size, is why oxygen is a gas and sulphur a solid. Down the group the H–E bond grows longer and weaker, so the hydrides H₂E lose hydrogen more easily: they become stronger acids and stronger reducing agents from H₂O to H₂Te.",
      definition:
        "- **Oxygen is anomalous** because of its small size and high electronegativity. Its covalency is usually 2 and never more than 4.\n" +
        "- **Oxygen's oxidation states:** mostly −2, but −1 in \\(\\mathrm{H_2O_2}\\), +1 in \\(\\mathrm{O_2F_2}\\) and +2 in \\(\\mathrm{OF_2}\\).\n" +
        "- **S, Se, Te** show −2, +2, +4 and +6. Down the group +4 becomes more stable and +6 less stable (inert pair).\n" +
        "- **Chalcogens:** O, S, Se, Te, Po.\n" +
        "- **Sulphur allotropes:** rhombic (α) is stable at room temperature; above 369 K it changes to monoclinic (β), and the change reverses on slow cooling. Both are \\(\\mathrm{S_8}\\) rings.\n" +
        "- **Oxides:** \\(\\mathrm{EO_2}\\) and \\(\\mathrm{EO_3}\\) are formed by S, Se, Te and Po and are acidic. \\(\\mathrm{SO_2}\\) is mainly reducing (it can also oxidise, for example \\(\\mathrm{H_2S}\\)); \\(\\mathrm{TeO_2}\\) is oxidising.\n" +
        "- **Ozone** has 6 lone pairs in all: 1 on the central oxygen and 5 on the two end oxygens.",
      table: {
        columns: ["Hydride", "Melting point (K)", "H–E bond enthalpy (kJ/mol)", "H–E–H angle (°)", "Acid strength (Ka)"],
        rows: [
          { cells: ["\\(\\mathrm{H_2O}\\)", "273", "463", "104", "\\(1.8 \\times 10^{-16}\\)"], noteAmber: "Hydrogen bonding makes water melt highest, though it is the lightest." },
          { cells: ["\\(\\mathrm{H_2S}\\)", "188", "347", "92", "\\(1.3 \\times 10^{-7}\\)"] },
          { cells: ["\\(\\mathrm{H_2Se}\\)", "208", "276", "91", "\\(1.3 \\times 10^{-4}\\)"] },
          { cells: ["\\(\\mathrm{H_2Te}\\)", "222", "238", "90", "\\(2.3 \\times 10^{-3}\\)"] },
        ],
        caption: "The bond enthalpy falls down the group, so acid strength and reducing power rise: H₂Te is the strongest acid and strongest reducing agent of the four.",
      },
      selfCheckExample: {
        prompt: "Which is the stronger acid, \\(\\mathrm{H_2S}\\) or \\(\\mathrm{H_2Se}\\), and which is the stronger reducing agent?",
        steps: [
          "Selenium is larger, so the H–Se bond is longer and weaker than H–S.",
          "A weaker bond releases \\(\\mathrm{H^{+}}\\) more easily and gives up hydrogen more easily.",
        ],
        answer: "\\(\\mathrm{H_2Se}\\) is both the stronger acid and the stronger reducing agent.",
      },
      practiceSet: [
        { prompt: "What is the oxidation state of oxygen in \\(\\mathrm{OF_2}\\)?", answer: "+2" },
        { prompt: "Which form of sulphur is stable at room temperature?", answer: "Rhombic (α) sulphur" },
        { prompt: "Arrange the hydrides of O, S, Se, Te by melting point, lowest first.", answer: "\\(\\mathrm{H_2S < H_2Se < H_2Te < H_2O}\\)" },
        { prompt: "Which explains the large gap between the melting points of oxygen and sulphur: size or atomicity?", answer: "Atomicity: \\(\\mathrm{O_2}\\) molecules against \\(\\mathrm{S_8}\\) rings" },
      ],
      pyqExampleId: "e0a1b412-5ece-4089-b7db-e3ae139e9cfd", // 2 Apr 2025 — the nature of TeO₂ and of the tellurium hydride
      traps: [
        {
          title: "Oxygen does not show only −2",
          body: "Oxygen is −1 in peroxides, +1 in \\(\\mathrm{O_2F_2}\\) and +2 in \\(\\mathrm{OF_2}\\). A statement that it shows only −2 is false.",
        },
        {
          title: "Down group 16, +4 becomes MORE stable than +6",
          body: "The inert pair effect makes the lower state more stable for the heavier elements. So the stability of +6 falls and that of +4 rises from S to Po.",
        },
        {
          title: "Ozone has six lone pairs, not five",
          body: "In \\(\\mathrm{O_3}\\) the central oxygen has one lone pair and the two end oxygens have five between them (two on one, three on the other), six in all.",
        },
        {
          title: "Rhombic sulphur is the room-temperature form",
          body: "Monoclinic sulphur is stable only above 369 K. At room temperature the stable crystalline form is rhombic sulphur.",
        },
      ],
    },

    // C2 — oxoacids of sulphur
    {
      kind: "reference" as const,
      slug: "jcpb-sulphur-oxoacids",
      name: "Oxoacids of sulphur: structures, S=O bonds and oxidation states",
      intuition:
        "Every sulphur oxoacid is built from tetrahedral sulphur carrying S=O and S–OH groups. What changes is the link between units: an oxygen bridge S–O–S in pyrosulphuric acid, a peroxo O–O bridge in peroxodisulphuric acid, a direct S–S bond in dithionic acid, and a chain of sulphur atoms in the polythionic acids. Count π bonds by counting S=O: each double bond has one.",
      definition:
        "- **Oleum** (fuming sulphuric acid) is pyrosulphuric acid, \\(\\mathrm{H_2S_2O_7}\\): \\(\\mathrm{SO_3 + H_2SO_4 \\rightarrow H_2S_2O_7}\\). It has 7 oxygen atoms.\n" +
        "- **Marshall's acid,** \\(\\mathrm{H_2S_2O_8}\\), is made by electrolysing concentrated \\(\\mathrm{H_2SO_4}\\) (or a concentrated hydrogensulphate) at high current density: \\(\\mathrm{2HSO_4^{-} \\rightarrow HO_3SOOSO_3H + 2e^{-}}\\).\n" +
        "- **Peroxo link** (O–O): only in \\(\\mathrm{H_2S_2O_8}\\) among the common oxoacids.\n" +
        "- **S in two different states:** thiosulphuric acid, \\(\\mathrm{H_2S_2O_3}\\).\n" +
        "- **Polythionic acids** \\(\\mathrm{H_2S_xO_6}\\): the two end S are +5, the chain S are 0.",
      table: {
        columns: ["Acid", "Formula", "Oxidation state of S", "S=O bonds", "Link between units"],
        rows: [
          { cells: ["Sulphurous", "\\(\\mathrm{H_2SO_3}\\)", "+4", "1", "One unit; a lone pair on S"] },
          { cells: ["Sulphuric", "\\(\\mathrm{H_2SO_4}\\)", "+6", "2", "One unit, two S–OH"] },
          { cells: ["Thiosulphuric", "\\(\\mathrm{H_2S_2O_3}\\)", "Average +2; the two S differ", "1", "A terminal S doubly bonded to the central S, in place of one O"] },
          { cells: ["Dithionic", "\\(\\mathrm{H_2S_2O_6}\\)", "+5, both S alike", "4", "A direct S–S bond"] },
          { cells: ["Pyrosulphuric (oleum)", "\\(\\mathrm{H_2S_2O_7}\\)", "+6", "4", "One S–O–S bridge"] },
          { cells: ["Peroxodisulphuric (Marshall's)", "\\(\\mathrm{H_2S_2O_8}\\)", "+6", "4", "One O–O peroxo bridge"], noteAmber: "Still +6: the two peroxo oxygens are −1 each." },
          { cells: ["Polythionic", "\\(\\mathrm{H_2S_xO_6}\\)", "Ends +5, chain 0", "4", "A chain of S atoms between two \\(\\mathrm{SO_3H}\\) groups"] },
        ],
        caption: "Each S=O bond carries one π bond, so counting S=O counts the π bonds of every acid here except thiosulphuric, which also has an S=S.",
      },
      selfCheckExample: {
        prompt: "How many S=O bonds and how many S–OH groups does dithionic acid, \\(\\mathrm{H_2S_2O_6}\\), contain, and what is the oxidation state of each sulphur?",
        steps: [
          "The structure is \\(\\mathrm{HO_3S{-}SO_3H}\\): each S has two S=O and one S–OH, and the two S are bonded directly.",
          "S=O bonds: 2 + 2 = 4. S–OH groups: 2.",
          "Oxidation state: \\(2 + 2x - 12 = 0\\), so \\(x = +5\\).",
        ],
        answer: "Four S=O, two S–OH; each S is +5.",
      },
      practiceSet: [
        { prompt: "How many oxygen atoms are in the formula of oleum (pyrosulphuric acid)?", answer: "7" },
        { prompt: "Which of \\(\\mathrm{H_2SO_4}\\), \\(\\mathrm{H_2S_2O_7}\\) and \\(\\mathrm{H_2S_2O_8}\\) has a peroxo bond?", answer: "\\(\\mathrm{H_2S_2O_8}\\)" },
        { prompt: "How many S=O bonds does sulphurous acid have?", answer: "1" },
        { prompt: "What is electrolysed to make peroxodisulphuric acid?", answer: "Concentrated sulphuric acid" },
      ],
      pyqExampleId: "30cc526e-a252-4e37-9e3e-a510aa7d9451", // 24 Jan 2023 — sum of π bonds in H₂S₂O₈ and H₂S₂O₇
      traps: [
        {
          title: "Pyrosulphuric acid has an S–O–S bridge, not a peroxo bond",
          body: "\\(\\mathrm{H_2S_2O_7}\\) joins its two sulphurs through one oxygen. The O–O peroxo bond belongs to \\(\\mathrm{H_2S_2O_8}\\).",
        },
        {
          title: "Marshall's acid needs concentrated sulphuric acid",
          body: "Electrolysing dilute sulphuric acid or dilute sodium sulphate just splits water. Peroxodisulphuric acid forms at the anode only from a concentrated solution at high current density.",
        },
      ],
    },

    // C3 — sulphur redox and tests
    {
      kind: "formula" as const,
      slug: "jcpb-sulphur-redox-tests",
      name: "Redox reactions of sulphur compounds and the tests for sulphide and sulphite",
      intuition:
        "Sulphur spans −2 to +6, so its compounds are good at redox. Sulphur dioxide (+4) is usually a reducing agent: it turns orange dichromate green by reducing it to Cr³⁺. Elemental sulphur (0) sits in the middle, so in hot alkali it disproportionates to sulphide and thiosulphate. Thiosulphate is oxidised further by a strong oxidant than by a weak one: iodine stops it at tetrathionate, bromine takes it all the way to sulphate. These reactions are also the salt-analysis tests: hydrogen sulphide blackens lead acetate paper, and sulphur dioxide turns acidified dichromate paper green.",
      definition:
        "- **\\(\\mathrm{SO_2}\\) with acidified dichromate:** \\(\\mathrm{Cr_2O_7^{2-} + 3SO_2 + 2H^{+} \\rightarrow 2Cr^{3+} + 3SO_4^{2-} + H_2O}\\); the green product is chromium(III) sulphate.\n" +
        "- **Sulphur in alkali:** \\(\\mathrm{S_8 + 12OH^{-} \\rightarrow 4S^{2-} + 2S_2O_3^{2-} + 6H_2O}\\).\n" +
        "- **Thiosulphate:** \\(\\mathrm{2S_2O_3^{2-} + I_2 \\rightarrow S_4O_6^{2-} + 2I^{-}}\\), but \\(\\mathrm{S_2O_3^{2-} + 4Br_2 + 5H_2O \\rightarrow 2SO_4^{2-} + 8Br^{-} + 10H^{+}}\\), because bromine is the stronger oxidant.\n" +
        "- **Ozone and lead sulphide:** \\(\\mathrm{PbS + 4O_3 \\rightarrow PbSO_4 + 4O_2}\\).\n" +
        "- **Sulphide test:** dilute \\(\\mathrm{H_2SO_4}\\) releases \\(\\mathrm{H_2S}\\), which turns lead acetate paper black (PbS).\n" +
        "- **Sulphite test:** dilute \\(\\mathrm{H_2SO_4}\\) releases \\(\\mathrm{SO_2}\\), which turns acidified dichromate green.\n" +
        "- **Sulphide colours:** \\(\\mathrm{As_2S_3}\\) and \\(\\mathrm{As_2S_5}\\) yellow, ammonium sulphide solution yellow, PbS and CuS black.",
      formula: {
        label: "Sulphur redox reactions",
        latex:
          "\\mathrm{Cr_2O_7^{2-} + 3SO_2 + 2H^{+} \\rightarrow 2Cr^{3+} + 3SO_4^{2-} + H_2O} \\qquad \\mathrm{S_8 + 12OH^{-} \\rightarrow 4S^{2-} + 2S_2O_3^{2-} + 6H_2O} \\qquad \\mathrm{2S_2O_3^{2-} + I_2 \\rightarrow S_4O_6^{2-} + 2I^{-}}",
      },
      authoredExample: {
        prompt:
          "Solid sulphur is boiled with sodium hydroxide solution. Identify the two sulphur-containing products, give the oxidation state of sulphur in each, and name the type of reaction.",
        steps: [
          "\\(\\mathrm{S_8 + 12OH^{-} \\rightarrow 4S^{2-} + 2S_2O_3^{2-} + 6H_2O}\\).",
          "In sulphide, \\(\\mathrm{S^{2-}}\\), sulphur is −2.",
          "In thiosulphate, \\(\\mathrm{S_2O_3^{2-}}\\): \\(2x - 6 = -2\\), so the average is +2.",
          "Sulphur goes from 0 both down to −2 and up to +2: a disproportionation.",
        ],
        answer: "Sulphide (−2) and thiosulphate (average +2); disproportionation.",
      },
      selfCheckExample: {
        prompt: "A salt gives a gas with dilute sulphuric acid, and the gas blackens a paper soaked in lead acetate. Name the gas, the black compound and the anion in the salt.",
        steps: [
          "A gas that blackens lead acetate is hydrogen sulphide.",
          "\\(\\mathrm{Pb(CH_3COO)_2 + H_2S \\rightarrow PbS + 2CH_3COOH}\\): the black compound is lead sulphide.",
        ],
        answer: "\\(\\mathrm{H_2S}\\); PbS; the sulphide ion \\(\\mathrm{S^{2-}}\\).",
      },
      practiceSet: [
        { prompt: "What colour does \\(\\mathrm{SO_2}\\) turn acidified potassium dichromate?", answer: "Green" },
        { prompt: "What does iodine oxidise thiosulphate to?", answer: "Tetrathionate, \\(\\mathrm{S_4O_6^{2-}}\\)" },
        { prompt: "How many moles of \\(\\mathrm{O_2}\\) form when one mole of PbS is oxidised by ozone?", answer: "4" },
        { prompt: "Name a sulphide that is yellow.", answer: "\\(\\mathrm{As_2S_3}\\) (also \\(\\mathrm{As_2S_5}\\))" },
      ],
      pyqExampleId: "2c8cb55c-d51c-4303-b982-6c22ae0ddebd", // 5 Apr 2026 S2 — the paper that SO₂ turns green
      traps: [
        {
          title: "Lead acetate paper turns black from lead sulphide",
          body: "Hydrogen sulphide gives black PbS. Lead sulphite is white, so a statement that the black colour is lead sulphite is false.",
        },
        {
          title: "The green colour is chromium(III) sulphate, not Cr₂O₃",
          body: "In acidified solution, dichromate is reduced to \\(\\mathrm{Cr^{3+}}\\), which stays in solution as \\(\\mathrm{Cr_2(SO_4)_3}\\). \\(\\mathrm{Cr_2O_3}\\) is the green solid from heating ammonium dichromate.",
        },
        {
          title: "Bromine takes thiosulphate further than iodine",
          body: "Both oxidise thiosulphate. Iodine, the weaker oxidant, stops at \\(\\mathrm{S_4O_6^{2-}}\\); bromine, the stronger one, goes on to \\(\\mathrm{SO_4^{2-}}\\). Thiosulphate is oxidised in both cases, never reduced.",
        },
      ],
    },
  ],
};
