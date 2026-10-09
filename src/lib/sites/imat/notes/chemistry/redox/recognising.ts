import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_RDX_RECOGNISING_NOTE: SubtopicNote = {
  subtopicName: "Redox Reactions and Agents",
  title: "Recognising Redox: Oxidation, Reduction and the Agents",
  oneLineDefinition:
    "In a redox reaction one species loses electrons (its oxidation number rises) and another gains them; the species that takes electrons is the oxidising agent, the one that gives them is the reducing agent.",
  whyItMatters:
    "The ministry papers asked for the reducing agent in a metal extraction (2023) and when zinc reacts with nitric acid (2024). The older papers asked which reaction in a list is or is not redox, and which species act as oxidising or reducing agents.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-rdx-oxred-def",
      name: "Oxidation and reduction as electron loss and gain",
      intuition:
        "Electrons cannot vanish: if one atom loses them, another must take them. So oxidation and reduction always happen together, which is why the reaction is called redox. Losing negative electrons makes an atom more positive, so oxidation raises the oxidation number and reduction lowers it.",
      definition:
        "- **Oxidation** is **loss of electrons**, an **increase** in oxidation number. **Reduction** is **gain of electrons**, a **decrease** in oxidation number. Memory aid: OIL RIG (Oxidation Is Loss, Reduction Is Gain).\n" +
        "- Older definitions still appear: oxidation as gain of oxygen or loss of hydrogen, reduction as loss of oxygen or gain of hydrogen.\n" +
        "- **Electrons lost = electrons gained** in every complete redox equation.\n" +
        "- A **half-equation** shows one side of the transfer with the electrons written in.",
      formula: {
        label: "Two half-equations, one transfer",
        latex: "\\underbrace{\\mathrm{Zn \\rightarrow Zn^{2+} + 2e^-}}_{\\text{oxidation}} \\qquad \\underbrace{\\mathrm{Cu^{2+} + 2e^- \\rightarrow Cu}}_{\\text{reduction}}",
        symbols: [
          { symbol: "\\(\\mathrm{e^-}\\)", meaning: "an electron; on the right in oxidation, on the left in reduction" },
        ],
      },
      authoredExample: {
        prompt:
          "In the thermite reaction, \\(\\mathrm{2Al + Fe_2O_3 \\rightarrow Al_2O_3 + 2Fe}\\), what is oxidised, what is reduced, and how many electrons move per equation as written?",
        steps: [
          "Aluminium: 0 in Al, +3 in \\(\\mathrm{Al_2O_3}\\). It rises, so Al is oxidised.",
          "Iron: +3 in \\(\\mathrm{Fe_2O_3}\\), 0 in Fe. It falls, so the iron(III) is reduced.",
          "Oxygen stays at −2 throughout and is not involved in the transfer.",
          "Two Al atoms each lose 3 electrons: 6 lost. Two Fe atoms each gain 3: 6 gained.",
        ],
        answer: "Al is oxidised, \\(\\mathrm{Fe^{3+}}\\) is reduced; 6 electrons per equation",
      },
      selfCheckExample: {
        prompt: "Magnesium burns in carbon dioxide: \\(\\mathrm{2Mg + CO_2 \\rightarrow 2MgO + C}\\). Which species is reduced?",
        options: [
          "The carbon in \\(\\mathrm{CO_2}\\)",
          "Magnesium",
          "The oxygen in \\(\\mathrm{CO_2}\\)",
          "Magnesium oxide",
          "Nothing: this is not a redox reaction",
        ],
        steps: [
          "Carbon goes from +4 in \\(\\mathrm{CO_2}\\) to 0 in C: its oxidation number falls, so it is reduced.",
          "Magnesium goes from 0 to +2: oxidised, not reduced.",
          "Oxygen is −2 on both sides, so C is wrong. D is a product, not something that is reduced.",
        ],
        answer: "(A) The carbon in \\(\\mathrm{CO_2}\\)",
      },
      practiceSet: [
        { prompt: "Is \\(\\mathrm{Fe^{2+} \\rightarrow Fe^{3+} + e^-}\\) oxidation or reduction?", answer: "Oxidation", method: "An electron is lost; +2 rises to +3" },
        { prompt: "Write the half-equation for chlorine becoming chloride ions.", answer: "\\(\\mathrm{Cl_2 + 2e^- \\rightarrow 2Cl^-}\\)", method: "Each Cl gains one electron" },
        { prompt: "In \\(\\mathrm{CuO + H_2 \\rightarrow Cu + H_2O}\\), which substance is oxidised?", answer: "Hydrogen, \\(\\mathrm{H_2}\\)", method: "0 rises to +1; copper falls from +2 to 0" },
      ],
      traps: [
        {
          title: "Oxidation raises the oxidation number",
          body: "Losing electrons, which are negative, makes an atom more positive. So oxidation is an INCREASE in oxidation number and reduction is a DECREASE. Mixing up the direction reverses every later answer about agents.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-rdx-spot",
      name: "Telling redox reactions from non-redox reactions",
      intuition:
        "The only sure test is to look for a change in oxidation number. Many reactions just swap partners or pass protons around without moving any electrons: precipitations, neutralisations and acid-base reactions. Those are not redox, however dramatic they look.",
      definition:
        "- Assign oxidation numbers to every element on both sides. **Any change means redox**; no change anywhere means not redox.\n" +
        "- A reaction with an uncombined element on one side and the same element combined on the other is redox (the change from 0 is unavoidable). Converting one form of an element to another, such as \\(\\mathrm{O_2}\\) to \\(\\mathrm{O_3}\\), is not.\n" +
        "- **Usually not redox**: neutralisation, acid-base proton transfer, precipitation, double exchange of ions (a salt with an acid), formation of complexes, combining two oxides.\n" +
        "- **Decomposition can go either way**: \\(\\mathrm{CaCO_3 \\rightarrow CaO + CO_2}\\) is not redox; \\(\\mathrm{2KClO_3 \\rightarrow 2KCl + 3O_2}\\) is.",
      authoredExample: {
        prompt:
          "Decide which of these are redox: (1) \\(\\mathrm{CaCO_3 \\rightarrow CaO + CO_2}\\); (2) \\(\\mathrm{2H_2O_2 \\rightarrow 2H_2O + O_2}\\); (3) \\(\\mathrm{AgNO_3 + NaCl \\rightarrow AgCl + NaNO_3}\\).",
        steps: [
          "(1) Ca +2, C +4, O −2 on both sides: no change, not redox.",
          "(2) O is −1 in \\(\\mathrm{H_2O_2}\\), −2 in \\(\\mathrm{H_2O}\\) and 0 in \\(\\mathrm{O_2}\\): changes, so redox.",
          "(3) Ag +1, N +5, O −2, Na +1, Cl −1 on both sides: a precipitation, not redox.",
        ],
        answer: "Only reaction (2) is redox",
      },
      selfCheckExample: {
        prompt: "Which of these is a redox reaction?",
        options: [
          "\\(\\mathrm{BaCl_2 + Na_2SO_4 \\rightarrow BaSO_4 + 2NaCl}\\)",
          "\\(\\mathrm{SO_3 + H_2O \\rightarrow H_2SO_4}\\)",
          "\\(\\mathrm{MgO + 2HCl \\rightarrow MgCl_2 + H_2O}\\)",
          "\\(\\mathrm{2NO_2 \\rightarrow N_2O_4}\\)",
          "\\(\\mathrm{Cu + 2Ag^+ \\rightarrow Cu^{2+} + 2Ag}\\)",
        ],
        steps: [
          "E: Cu goes 0 to +2 and Ag goes +1 to 0. Electrons move, so it is redox.",
          "A is a precipitation and C a neutralisation: no changes. B: S stays +6.",
          "D looks like a change, but N is +4 in both \\(\\mathrm{NO_2}\\) and \\(\\mathrm{N_2O_4}\\): two molecules simply join.",
        ],
        answer: "(E) \\(\\mathrm{Cu + 2Ag^+ \\rightarrow Cu^{2+} + 2Ag}\\)",
      },
      practiceSet: [
        { prompt: "Is \\(\\mathrm{NaOH + HNO_3 \\rightarrow NaNO_3 + H_2O}\\) a redox reaction?", answer: "No", method: "Neutralisation; no oxidation number changes" },
        { prompt: "Is \\(\\mathrm{2Na + Cl_2 \\rightarrow 2NaCl}\\) a redox reaction?", answer: "Yes", method: "Na 0 to +1, Cl 0 to −1" },
        { prompt: "Is \\(\\mathrm{CuSO_4 + 4NH_3 \\rightarrow [Cu(NH_3)_4]SO_4}\\) a redox reaction?", answer: "No", method: "Complex formation; Cu stays +2" },
      ],
      traps: [
        {
          title: "No free element does not mean no redox",
          body: "A reaction can be redox with compounds on both sides: in \\(\\mathrm{2FeCl_3 + SnCl_2 \\rightarrow 2FeCl_2 + SnCl_4}\\), iron falls from +3 to +2 and tin rises from +2 to +4. Always check the oxidation numbers rather than looking for an element.",
        },
        {
          title: "A decomposition is not automatically redox",
          body: "Breaking a carbonate into an oxide and carbon dioxide changes no oxidation numbers. Breaking a chlorate into a chloride and oxygen does. Decide by the numbers, not by the reaction type.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-rdx-agents",
      name: "Identifying the oxidising agent and the reducing agent",
      intuition:
        "An oxidising agent makes something else oxidised by taking its electrons, so the oxidising agent itself gains electrons and is reduced. The reducing agent does the opposite. The names describe what the substance does to its partner, not what happens to itself.",
      definition:
        "- The **oxidising agent** (oxidant) accepts electrons: it is **reduced**, and contains the atom whose oxidation number **falls**.\n" +
        "- The **reducing agent** (reductant) gives electrons: it is **oxidised**, and contains the atom whose oxidation number **rises**.\n" +
        "- Name the whole species as it appears among the **reactants**: \\(\\mathrm{Zn(s)}\\), not \\(\\mathrm{Zn^{2+}}\\); \\(\\mathrm{HNO_3}\\), not \\(\\mathrm{NO}\\).\n" +
        "- A reagent can play two roles at once: some of it is reduced while the rest only supplies ions or acts as an acid.",
      authoredExample: {
        prompt:
          "Copper dissolves in hot concentrated sulfuric acid: \\(\\mathrm{Cu + 2H_2SO_4 \\rightarrow CuSO_4 + SO_2 + 2H_2O}\\). Name the oxidising agent and the reducing agent.",
        steps: [
          "Copper: 0 to +2. It is oxidised, so Cu is the reducing agent.",
          "Sulfur: +6 in \\(\\mathrm{H_2SO_4}\\) to +4 in \\(\\mathrm{SO_2}\\). It is reduced, so \\(\\mathrm{H_2SO_4}\\) is the oxidising agent.",
          "Only one of the two \\(\\mathrm{H_2SO_4}\\) is reduced; the other supplies the sulfate in \\(\\mathrm{CuSO_4}\\) and keeps S at +6.",
        ],
        answer: "Oxidising agent \\(\\mathrm{H_2SO_4}\\); reducing agent Cu",
      },
      selfCheckExample: {
        prompt: "In the reaction \\(\\mathrm{3H_2S + 2HNO_3 \\rightarrow 3S + 2NO + 4H_2O}\\), which species is the reducing agent?",
        options: [
          "\\(\\mathrm{HNO_3}\\)",
          "\\(\\mathrm{H_2S}\\)",
          "S",
          "NO",
          "\\(\\mathrm{H_2O}\\)",
        ],
        steps: [
          "Sulfur rises from −2 in \\(\\mathrm{H_2S}\\) to 0 in S: \\(\\mathrm{H_2S}\\) is oxidised, so it is the reducing agent.",
          "Nitrogen falls from +5 to +2, so \\(\\mathrm{HNO_3}\\) is the oxidising agent (A).",
          "C and D are products; an agent is always named among the reactants. H and O do not change.",
        ],
        answer: "(B) \\(\\mathrm{H_2S}\\)",
      },
      practiceSet: [
        { prompt: "In \\(\\mathrm{Fe_2O_3 + 3CO \\rightarrow 2Fe + 3CO_2}\\), what is the reducing agent?", answer: "CO", method: "C rises from +2 to +4" },
        { prompt: "In \\(\\mathrm{Cl_2 + 2Fe^{2+} \\rightarrow 2Cl^- + 2Fe^{3+}}\\), what is the oxidising agent?", answer: "\\(\\mathrm{Cl_2}\\)", method: "Cl falls from 0 to −1" },
        { prompt: "Is the oxidising agent itself oxidised or reduced?", answer: "Reduced", method: "It takes electrons" },
      ],
      traps: [
        {
          title: "The oxidising agent is the one that is reduced",
          body: "The name says what it does to the OTHER substance. An oxidising agent takes electrons, so its own oxidation number goes down. Picking the species that is oxidised as the oxidising agent is the classic slip.",
        },
        {
          title: "Name the reactant, not the product",
          body: "When zinc reacts and becomes \\(\\mathrm{Zn^{2+}}\\), the reducing agent is zinc metal, not the zinc ion it turns into. Options often list both forms of the same element.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-rdx-common-agents",
      name: "Common oxidising and reducing agents",
      intuition:
        "A substance whose key atom is already at its highest oxidation number can only go down, so it can only oxidise others. One at its lowest can only go up, so it can only reduce. Species in between can do either, depending on the partner.",
      definition:
        "- **Highest** oxidation state: oxidising agent only (\\(\\mathrm{MnO_4^-}\\) with Mn +7, \\(\\mathrm{Cr_2O_7^{2-}}\\) with Cr +6, \\(\\mathrm{HNO_3}\\) with N +5).\n" +
        "- **Lowest** oxidation state: reducing agent only (metals at 0, \\(\\mathrm{I^-}\\), \\(\\mathrm{S^{2-}}\\), \\(\\mathrm{H^-}\\)).\n" +
        "- **In between**: can do both (\\(\\mathrm{H_2O_2}\\), \\(\\mathrm{SO_2}\\), \\(\\mathrm{Fe^{2+}}\\), \\(\\mathrm{NO_2^-}\\)).\n" +
        "- Electronegative non-metals (\\(\\mathrm{F_2}\\), \\(\\mathrm{O_2}\\), \\(\\mathrm{Cl_2}\\)) are oxidising agents; reactive metals, carbon, carbon monoxide and hydrogen are reducing agents.",
      table: {
        columns: ["Agent", "Acts as", "Becomes (in acid)", "Electrons per particle"],
        rows: [
          { cells: ["Permanganate \\(\\mathrm{MnO_4^-}\\) (purple)", "Oxidising agent", "\\(\\mathrm{Mn^{2+}}\\) (almost colourless)", "5 gained"] },
          { cells: ["Dichromate \\(\\mathrm{Cr_2O_7^{2-}}\\) (orange)", "Oxidising agent", "\\(\\mathrm{Cr^{3+}}\\) (green)", "6 gained (3 per Cr)"] },
          { cells: ["Chlorine \\(\\mathrm{Cl_2}\\)", "Oxidising agent", "\\(\\mathrm{Cl^-}\\)", "2 gained"] },
          { cells: ["Concentrated \\(\\mathrm{HNO_3}\\)", "Oxidising agent", "\\(\\mathrm{NO_2}\\) (dilute acid gives NO)", "1 gained (3 for NO)"] },
          { cells: ["Hydrogen peroxide \\(\\mathrm{H_2O_2}\\)", "Either", "\\(\\mathrm{H_2O}\\) as oxidant; \\(\\mathrm{O_2}\\) as reductant", "2"] },
          { cells: ["Reactive metals (Mg, Zn, Fe)", "Reducing agent", "Metal ions", "Equal to the ion's charge, lost"] },
          { cells: ["Carbon, CO, \\(\\mathrm{H_2}\\)", "Reducing agent", "\\(\\mathrm{CO_2}\\), \\(\\mathrm{H_2O}\\)", "Used to extract metals from oxides"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of these species can act ONLY as a reducing agent?",
        options: [
          "\\(\\mathrm{Fe^{2+}}\\)",
          "\\(\\mathrm{H_2O_2}\\)",
          "Sodium metal, Na",
          "\\(\\mathrm{Cl_2}\\)",
          "\\(\\mathrm{MnO_4^-}\\)",
        ],
        steps: [
          "Sodium metal is at 0, its lowest possible state: it can only lose electrons, so it can only reduce.",
          "\\(\\mathrm{Fe^{2+}}\\) can go up to +3 or down to 0, and \\(\\mathrm{H_2O_2}\\) can go to \\(\\mathrm{O_2}\\) or \\(\\mathrm{H_2O}\\): both can do either job.",
          "\\(\\mathrm{Cl_2}\\) is usually an oxidising agent. \\(\\mathrm{MnO_4^-}\\) has Mn at +7, its highest state, so it can only oxidise.",
        ],
        answer: "(C) Sodium metal, Na",
      },
      practiceSet: [
        { prompt: "Acidified potassium permanganate is added to a reducing agent. What colour change is seen?", answer: "Purple to almost colourless", method: "\\(\\mathrm{MnO_4^-}\\) is reduced to \\(\\mathrm{Mn^{2+}}\\)" },
        { prompt: "Can nitrate in \\(\\mathrm{HNO_3}\\) act as a reducing agent?", answer: "No", method: "N is already at +5, its highest state" },
        { prompt: "In the blast furnace, what reduces iron(III) oxide to iron?", answer: "Carbon monoxide", method: "CO is oxidised to \\(\\mathrm{CO_2}\\)" },
      ],
      traps: [
        {
          title: "Hydrogen peroxide can be either agent",
          body: "With oxygen at −1, between 0 and −2, \\(\\mathrm{H_2O_2}\\) oxidises iodide ions (becoming water) but reduces permanganate (becoming oxygen gas). Options that call it only an oxidising agent are incomplete.",
        },
      ],
    },
  ],
};
