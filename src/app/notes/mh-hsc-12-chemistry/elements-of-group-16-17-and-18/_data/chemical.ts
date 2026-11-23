import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GP_CHEMICAL_NOTE: SubtopicNote = {
  subtopicName: "Chemical Properties of the Elements",
  title: "Chemical Properties of Groups 16, 17 and 18",
  oneLineDefinition:
    "The oxidation states the three groups show, the acidity and stability of their hydrides, and how the elements react with metals, oxygen and halogens.",
  whyItMatters:
    "12 questions. Three were set in board papers: two uses each of sulfur and chlorine (2017), increasing order of the acid strength of the chlorine oxoacids, the ionic character of metal halides and the thermal stability of the hydrogen halides (2024), and the product of selenium with magnesium (2026). The textbook adds oxidation states, the acidity and stability of the group 16 hydrides, and the uses of ClO₂.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccgp-oxidation-states",
      name: "Oxidation states of groups 16, 17 and 18",
      intuition:
        "An atom reaches a noble gas configuration by gaining, losing or sharing electrons, and its oxidation state records how. Group 16 gains or shares two, so −2 is natural. To go positive, an atom must unpair its electrons into empty d orbitals, which oxygen and fluorine do not have. That is why sulfur reaches +6 and chlorine +7, but oxygen stops at +2 and fluorine at −1.",
      definition:
        "- **Group 16:** gain two electrons (\\(\\text{E}^{2-}\\)) or share two, so \\(-2\\) and \\(+2\\). Oxygen is \\(-2\\) except in \\(\\text{OF}_2\\) (\\(+2\\)) and peroxides (\\(-1\\)). Sulfur, selenium and tellurium also show \\(+4\\) and \\(+6\\), these two being more common. Down the group the \\(+6\\) state becomes less stable and \\(+4\\) more stable, because of the inert pair effect.\n" +
        "- **Group 17:** all show \\(-1\\). Chlorine, bromine and iodine also show \\(+1\\), \\(+3\\), \\(+5\\) and \\(+7\\), because they are less electronegative than fluorine and have empty d orbitals in the valence shell, so they can expand the octet. \\(+4\\) and \\(+6\\) occur in oxides and oxoacids of chlorine and bromine. Fluorine, with no d orbitals and the highest electronegativity, shows only \\(-1\\).\n" +
        "- **Group 18:** mostly zero valent. Xenon, a large atom with a lower ionisation enthalpy, can promote electrons into empty d orbitals and shows \\(+2\\), \\(+4\\) and \\(+6\\) in \\(\\text{XeF}_2\\), \\(\\text{XeF}_4\\), \\(\\text{XeF}_6\\), \\(\\text{XeO}_3\\) and \\(\\text{XeOF}_4\\).\n" +
        "- **Working it out:** take H as \\(+1\\), O as \\(-2\\) (a peroxide O as \\(-1\\)) and F as \\(-1\\); the oxidation states add up to the charge on the species, zero for a molecule.",
      formula: {
        label: "Finding an oxidation state",
        latex: "\\sum (\\text{oxidation states of all atoms}) = \\text{charge on the species}",
      },
      authoredExample: {
        prompt: "Find the oxidation state of selenium in selenic acid, H₂SeO₄, and in selenium dioxide, SeO₂.",
        steps: [
          "Rule: H is \\(+1\\), O is \\(-2\\), and the sum is zero for a neutral molecule. Let selenium be \\(x\\).",
          "\\(\\text{H}_2\\text{SeO}_4\\): \\(2(+1) + x + 4(-2) = 0\\), so \\(x = 8 - 2 = +6\\).",
          "\\(\\text{SeO}_2\\): \\(x + 2(-2) = 0\\), so \\(x = +4\\).",
          "Both are among the common states \\(+4\\) and \\(+6\\) of selenium.",
        ],
        answer: "+6 in H₂SeO₄ and +4 in SeO₂",
      },
      selfCheckExample: {
        prompt: "What is the oxidation state of oxygen in OF₂, and why is it positive?",
        steps: ["F is \\(-1\\): \\(x + 2(-1) = 0\\), so \\(x = +2\\).", "Fluorine is more electronegative than oxygen, so oxygen is the positive partner."],
        answer: "+2; fluorine is more electronegative than oxygen",
      },
      practiceSet: [
        { prompt: "Give the oxidation state of oxygen in Na₂O₂.", answer: "\\(-1\\) (a peroxide)" },
        { prompt: "Give the oxidation state of tellurium in telluric acid, H₆TeO₆.", answer: "\\(+6\\), since \\(6 + x - 12 = 0\\)" },
        { prompt: "Why does the stability of the +6 state decrease down group 16?", answer: "The inert pair effect: the lower +4 state becomes more stable down the group" },
        { prompt: "Which oxidation states does xenon show in its fluorides?", answer: "\\(+2\\), \\(+4\\) and \\(+6\\)" },
      ],
      pyqExampleId: "a2b4f50e-0874-4d16-96e8-0a46e32088b7",
      traps: [
        {
          title: "Peroxide oxygen is not -2",
          body: "In \\(\\text{H}_2\\text{O}_2\\) and \\(\\text{Na}_2\\text{O}_2\\) each oxygen is \\(-1\\). Treating it as \\(-2\\) gives impossible answers for peroxo compounds.",
        },
        {
          title: "Both reasons for the halogens",
          body: "Chlorine, bromine and iodine show positive states for two reasons: they are less electronegative than fluorine and they have empty d orbitals. Give both; one reason is half the answer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccgp-hydrides",
      name: "Hydrides: acid strength and thermal stability",
      intuition:
        "Everything about these hydrides comes from one bond, the bond from hydrogen to the other atom. Down the group that atom grows, the bond lengthens and weakens. A weak bond lets go of H⁺ easily, so the acid gets stronger. The same weak bond breaks easily on heating, so the hydride gets less stable. Acid strength and thermal stability therefore run in opposite directions.",
      definition:
        "- **Group 16 hydrides** \\(\\text{H}_2\\text{E}\\) are angular, with the central atom \\(sp^3\\) hybridised. They are weakly acidic. Acid character increases and thermal stability decreases from \\(\\text{H}_2\\text{O}\\) to \\(\\text{H}_2\\text{Te}\\), because the H-E bond dissociation enthalpy decreases down the group. All except water are reducing, increasing \\(\\text{H}_2\\text{S} < \\text{H}_2\\text{Se} < \\text{H}_2\\text{Te}\\).\n" +
        "- **Group 17 hydrides** HX: acid strength \\(\\text{HF} < \\text{HCl} < \\text{HBr} < \\text{HI}\\); thermal stability \\(\\text{HF} > \\text{HCl} > \\text{HBr} > \\text{HI}\\); both follow the H-X bond dissociation enthalpy \\(\\text{HF} > \\text{HCl} > \\text{HBr} > \\text{HI}\\).\n" +
        "- **Ionic character of metal halides** decreases \\(\\text{MF} > \\text{MCl} > \\text{MBr} > \\text{MI}\\) for a monovalent metal M. A metal in a higher oxidation state forms a more covalent halide: \\(\\text{SnCl}_4\\) is more covalent than \\(\\text{SnCl}_2\\).\n" +
        "- A smaller \\(\\text{p}K_a\\) means a stronger acid.",
      table: {
        columns: ["Property", "Group 16: H₂O, H₂S, H₂Se, H₂Te", "Group 17: HF, HCl, HBr, HI"],
        rows: [
          { cells: ["Bond dissociation enthalpy (kJ/mol)", "463, 347, 276, 238", "574, 432, 363, 295"] },
          {
            cells: ["Acid strength", "Increases; \\(\\text{p}K_a\\) 14.0, 7.0, 3.8, 2.6", "Increases; \\(\\text{p}K_a\\) 3.2, \\(-7.0\\), \\(-9.5\\), \\(-10.0\\)"],
            pyqExampleId: "12804cec-fd83-421b-8527-dcbf3a2c39ba",
          },
          {
            cells: ["Thermal stability", "Decreases from \\(\\text{H}_2\\text{O}\\) to \\(\\text{H}_2\\text{Te}\\)", "Decreases from HF to HI"],
            pyqExampleId: "f2e0b811-bd33-4d07-8d8b-60ef0b5bf031",
            noteAmber: "Board 2024 asked this order for the hydrogen halides, with ionic character and oxoacid strength.",
          },
          { cells: ["Physical state at room temperature", "Water a liquid; the rest gases", "HF a liquid; the rest gases"] },
        ],
      },
      practiceSet: [
        { prompt: "Which is the stronger acid, H₂S or H₂Se?", answer: "\\(\\text{H}_2\\text{Se}\\): its H-Se bond is weaker" },
        { prompt: "Which hydride of group 16 has no reducing property?", answer: "Water, \\(\\text{H}_2\\text{O}\\)" },
        { prompt: "Which is more covalent, SnCl₂ or SnCl₄?", answer: "\\(\\text{SnCl}_4\\): tin is in the higher oxidation state" },
        { prompt: "What is the shape of the H₂S molecule?", answer: "Angular, with sulfur \\(sp^3\\) hybridised" },
      ],
      pyqExampleId: "f2e0b811-bd33-4d07-8d8b-60ef0b5bf031",
      traps: [
        {
          title: "Strongest acid is the least stable",
          body: "HI is the strongest halogen acid and the least stable to heat. Both come from its weak H-I bond, so the two orders are reverses of each other.",
        },
        {
          title: "Reading pKa the wrong way",
          body: "A more negative \\(\\text{p}K_a\\) means a stronger acid: \\(-10.0\\) for HI beats \\(-7.0\\) for HCl.",
        },
        {
          title: "'Increasing order' means weakest first",
          body: "When the board says 'arrange in increasing order', start with the smallest. Writing the right sequence backwards scores zero.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccgp-reactivity",
      name: "Reactions with metals, oxygen and halogens",
      intuition:
        "Group 16 and 17 elements are hungry for electrons, so a metal readily hands its electrons over: oxygen gives oxides, sulfur sulfides, selenium selenides, and the halogens react instantly to give halides. Noble gases, with full shells, do not react directly with metals or oxygen at all.",
      definition:
        "- **With metals:** \\(4\\text{Al} + 3\\text{O}_2 \\longrightarrow 2\\text{Al}_2\\text{O}_3\\); \\(\\text{Cu} + \\text{S} \\longrightarrow \\text{CuS}\\); selenium gives magnesium selenide with magnesium. Tellurium even combines with gold: \\(2\\text{Au} + 3\\text{Te} \\longrightarrow \\text{Au}_2\\text{Te}_3\\). Halogens react instantly: \\(2\\text{Na} + \\text{Cl}_2 \\longrightarrow 2\\text{NaCl}\\).\n" +
        "- **With oxygen:** group 16 forms \\(\\text{EO}_2\\) and \\(\\text{EO}_3\\), both acidic: \\(\\text{SeO}_2 + \\text{H}_2\\text{O} \\longrightarrow \\text{H}_2\\text{SeO}_3\\) (selenious acid). \\(\\text{SO}_2\\) is reducing while \\(\\text{TeO}_2\\) is oxidising. Halogen oxides: \\(\\text{OF}_2\\) and \\(\\text{O}_2\\text{F}_2\\); \\(\\text{Cl}_2\\text{O}\\), \\(\\text{ClO}_2\\), \\(\\text{Cl}_2\\text{O}_6\\), \\(\\text{Cl}_2\\text{O}_7\\) are highly reactive oxidising agents. \\(\\text{ClO}_2\\) bleaches paper pulp and textiles and is used in water treatment.\n" +
        "- **With halogens:** group 16 forms \\(\\text{EX}_6\\), \\(\\text{EX}_4\\) and \\(\\text{EX}_2\\); \\(\\text{SF}_6\\) is exceptionally stable. Stability falls fluorides \\(>\\) chlorides \\(>\\) bromides \\(>\\) iodides. Halogens combine among themselves to give interhalogen compounds.\n" +
        "- **Uses of sulfur:** board 2017 asked two. The present textbook gives no list for sulfur; the two standard answers are the manufacture of sulfuric acid (the contact process begins by burning sulfur) and the vulcanisation of rubber. Uses of chlorine are on the chlorine page.",
      formula: {
        label: "A halogen with a metal",
        latex: "2\\text{M} + \\text{X}_2 \\longrightarrow 2\\text{MX} \\quad (\\text{M a monovalent metal, X a halogen})",
      },
      authoredExample: {
        prompt: "Show that the oxides SeO₂ and TeO₃ are acidic by writing their reactions with water. Name the acids formed.",
        steps: [
          "An acidic oxide dissolves in water to give an acid.",
          "\\(\\text{SeO}_2 + \\text{H}_2\\text{O} \\longrightarrow \\text{H}_2\\text{SeO}_3\\), selenious acid. Check: 1 Se, 2 H, 3 O on each side.",
          "\\(\\text{TeO}_3 + 3\\text{H}_2\\text{O} \\longrightarrow \\text{H}_6\\text{TeO}_6\\), telluric acid. Check: 1 Te, 6 H, 6 O on each side.",
        ],
        answer: "SeO₂ gives selenious acid, H₂SeO₃; TeO₃ gives telluric acid, H₆TeO₆",
      },
      selfCheckExample: {
        prompt: "Write the balanced equation for the reaction of sodium with chlorine and name the product.",
        steps: ["Halogens react instantly with metals: \\(2\\text{Na} + \\text{Cl}_2 \\longrightarrow 2\\text{NaCl}\\).", "Check: 2 Na and 2 Cl on each side."],
        answer: "Sodium chloride, NaCl",
      },
      practiceSet: [
        { prompt: "Name two oxides of chlorine that are highly reactive oxidising agents.", answer: "Any two of \\(\\text{Cl}_2\\text{O}\\), \\(\\text{ClO}_2\\), \\(\\text{Cl}_2\\text{O}_6\\) and \\(\\text{Cl}_2\\text{O}_7\\)" },
        { prompt: "Which hexafluoride of group 16 is exceptionally stable?", answer: "\\(\\text{SF}_6\\)" },
        { prompt: "Which of SO₂ and TeO₂ is an oxidising agent?", answer: "\\(\\text{TeO}_2\\)" },
        { prompt: "Do noble gases react directly with metals?", answer: "No" },
      ],
      pyqExampleId: "899a572b-5265-4684-aca8-82bbb63f0a06",
      traps: [
        {
          title: "Uses of the element against uses of its compound",
          body: "Uses of sulfur are not uses of sulfur dioxide or sulfuric acid. Read which substance the question names before you write.",
        },
        {
          title: "Reducing power of the dioxides",
          body: "Reducing power falls from \\(\\text{SO}_2\\) to \\(\\text{TeO}_2\\): sulfur dioxide is a reducing agent, but tellurium dioxide acts as an oxidising agent.",
        },
      ],
    },
  ],
};
