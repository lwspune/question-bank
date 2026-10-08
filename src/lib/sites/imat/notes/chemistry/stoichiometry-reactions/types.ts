import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_STO_TYPES_NOTE: SubtopicNote = {
  subtopicName: "Types of Reaction",
  title: "Types of Reaction, Displacement and Precipitates",
  oneLineDefinition:
    "Most reactions fit a few patterns (joining, splitting, swapping partners, burning, neutralising), and the pattern tells you what the products will be.",
  whyItMatters:
    "Classifying reactions was asked in 2012, as a type missing from a list of equations. The products of a reactive metal with water came up in 2020, and a metal displacing another from its salt sits behind a 2014 yield calculation.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-sto-reaction-types",
      name: "The main types of chemical reaction",
      intuition:
        "Rather than memorise every reaction, learn the patterns. Two substances joining, one splitting, an element pushing another out of a compound, or two compounds swapping partners: once you see the pattern you can predict the products and balance the equation.",
      definition:
        "- **Synthesis** (combination): two or more substances form one product.\n" +
        "- **Decomposition**: one substance breaks into two or more, usually on heating (**thermal decomposition**) or by electricity (**electrolysis**).\n" +
        "- **Single displacement**: an element takes the place of another element in a compound. It is always a redox reaction.\n" +
        "- **Double displacement** (metathesis): two ionic compounds swap partners. **Precipitation** and **neutralisation** are double displacements.\n" +
        "- **Combustion**: a substance burns in oxygen, giving out heat.\n" +
        "- One reaction can belong to two types. Substitution, addition and elimination are the names used for organic reactions (see Organic Chemistry).",
      table: {
        columns: ["Type", "Pattern", "Example", "How to spot it"],
        rows: [
          { cells: ["Synthesis", "A + B → AB", "\\(2\\mathrm{Mg} + \\mathrm{O_2} \\rightarrow 2\\mathrm{MgO}\\)", "Several reactants, one product"] },
          { cells: ["Decomposition", "AB → A + B", "\\(\\mathrm{CaCO_3} \\rightarrow \\mathrm{CaO} + \\mathrm{CO_2}\\) (heated)", "One reactant, several products"] },
          { cells: ["Single displacement", "A + BC → AC + B", "\\(\\mathrm{Fe} + \\mathrm{CuSO_4} \\rightarrow \\mathrm{FeSO_4} + \\mathrm{Cu}\\)", "An element in, a different element out"] },
          { cells: ["Double displacement", "AB + CD → AD + CB", "\\(\\mathrm{AgNO_3} + \\mathrm{NaCl} \\rightarrow \\mathrm{AgCl} + \\mathrm{NaNO_3}\\)", "Two compounds swap ions"] },
          { cells: ["Precipitation", "ions (aq) → insoluble solid", "\\(\\mathrm{Fe^{3+}} + 3\\mathrm{OH^-} \\rightarrow \\mathrm{Fe(OH)_3(s)}\\)", "A solid appears when two solutions mix"] },
          { cells: ["Neutralisation", "acid + base → salt + water", "\\(\\mathrm{HCl} + \\mathrm{NaOH} \\rightarrow \\mathrm{NaCl} + \\mathrm{H_2O}\\)", "Net change is \\(\\mathrm{H^+} + \\mathrm{OH^-} \\rightarrow \\mathrm{H_2O}\\)"] },
          { cells: ["Combustion", "fuel + oxygen → oxides", "\\(\\mathrm{CH_4} + 2\\mathrm{O_2} \\rightarrow \\mathrm{CO_2} + 2\\mathrm{H_2O}\\)", "Oxygen is a reactant; heat is given out"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of the following equations shows a decomposition reaction?",
        options: [
          "\\(\\mathrm{N_2} + 3\\mathrm{H_2} \\rightarrow 2\\mathrm{NH_3}\\)",
          "\\(\\mathrm{Mg} + 2\\mathrm{HCl} \\rightarrow \\mathrm{MgCl_2} + \\mathrm{H_2}\\)",
          "\\(\\mathrm{KOH} + \\mathrm{HNO_3} \\rightarrow \\mathrm{KNO_3} + \\mathrm{H_2O}\\)",
          "\\(\\mathrm{C_3H_8} + 5\\mathrm{O_2} \\rightarrow 3\\mathrm{CO_2} + 4\\mathrm{H_2O}\\)",
          "\\(2\\mathrm{H_2O_2} \\rightarrow 2\\mathrm{H_2O} + \\mathrm{O_2}\\)",
        ],
        steps: [
          "Decomposition has a single reactant: only E fits.",
          "A is synthesis, B is single displacement (magnesium pushes hydrogen out of the acid), C is neutralisation and D is combustion.",
        ],
        answer: "(E) \\(2\\mathrm{H_2O_2} \\rightarrow 2\\mathrm{H_2O} + \\mathrm{O_2}\\)",
      },
      practiceSet: [
        { prompt: "Classify: \\(\\mathrm{Cl_2} + 2\\mathrm{KBr} \\rightarrow 2\\mathrm{KCl} + \\mathrm{Br_2}\\)", answer: "Single displacement" },
        { prompt: "Classify: \\(2\\mathrm{KClO_3} \\rightarrow 2\\mathrm{KCl} + 3\\mathrm{O_2}\\)", answer: "Decomposition" },
        { prompt: "Classify: \\(\\mathrm{H_2SO_4} + 2\\mathrm{NaOH} \\rightarrow \\mathrm{Na_2SO_4} + 2\\mathrm{H_2O}\\)", answer: "Neutralisation (a double displacement)" },
        { prompt: "Classify: \\(\\mathrm{S} + \\mathrm{O_2} \\rightarrow \\mathrm{SO_2}\\)", answer: "Synthesis, and also combustion" },
      ],
      traps: [
        {
          title: "A reaction can have more than one label",
          body: "Burning magnesium is both synthesis and combustion; neutralisation is also a double displacement; every single displacement is also a redox reaction. An option is not wrong just because another label also fits.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-sto-displacement",
      name: "Displacement reactions and the reactivity series",
      intuition:
        "Metals differ in how readily they give away electrons. A more reactive metal can take the place of a less reactive one in its compounds, but never the other way round. The same ranking decides which metals react with water or acids and what they make.",
      definition:
        "- **Reactivity series** (most to least reactive): K > Na > Ca > Mg > Al > Zn > Fe > Pb > (H) > Cu > Ag > Au.\n" +
        "- A metal displaces any metal **below** it from a solution of its salt.\n" +
        "- Metals above hydrogen release **hydrogen gas** from dilute acids; copper, silver and gold do not.\n" +
        "- With **cold water**, the most reactive metals give the **hydroxide** and hydrogen. With **steam**, less reactive metals give the **oxide** and hydrogen.\n" +
        "- Among the halogens, a more reactive halogen displaces a less reactive one from its salt: \\(\\mathrm{F_2} > \\mathrm{Cl_2} > \\mathrm{Br_2} > \\mathrm{I_2}\\).",
      table: {
        columns: ["Reaction", "General result", "Example"],
        rows: [
          { cells: ["Group 1 metal or calcium + cold water", "hydroxide + hydrogen", "\\(2\\mathrm{Na} + 2\\mathrm{H_2O} \\rightarrow 2\\mathrm{NaOH} + \\mathrm{H_2}\\)"], noteAmber: "Magnesium reacts the same way with cold water, but only very slowly." },
          { cells: ["Magnesium, zinc or iron + steam", "oxide + hydrogen", "\\(\\mathrm{Mg} + \\mathrm{H_2O(g)} \\rightarrow \\mathrm{MgO} + \\mathrm{H_2}\\)"] },
          { cells: ["Metal above hydrogen + dilute acid", "salt + hydrogen", "\\(\\mathrm{Zn} + 2\\mathrm{HCl} \\rightarrow \\mathrm{ZnCl_2} + \\mathrm{H_2}\\)"] },
          { cells: ["Metal + salt solution of a less reactive metal", "the less reactive metal is deposited", "\\(\\mathrm{Fe} + \\mathrm{CuSO_4} \\rightarrow \\mathrm{FeSO_4} + \\mathrm{Cu}\\)"] },
          { cells: ["Halogen + salt of a less reactive halogen", "the less reactive halogen is released", "\\(\\mathrm{Cl_2} + 2\\mathrm{NaBr} \\rightarrow 2\\mathrm{NaCl} + \\mathrm{Br_2}\\)"] },
        ],
        caption: "The formula of each product follows the ion charges: \\(\\mathrm{Mg^{2+}}\\) with \\(\\mathrm{OH^-}\\) gives \\(\\mathrm{Mg(OH)_2}\\), never MgOH.",
      },
      selfCheckExample: {
        prompt: "In which of the following mixtures does a displacement reaction take place?",
        options: [
          "Zinc powder added to copper(II) sulfate solution",
          "Copper turnings added to dilute hydrochloric acid",
          "Silver wire placed in copper(II) nitrate solution",
          "Bromine water added to sodium chloride solution",
          "Iron filings added to magnesium sulfate solution",
        ],
        steps: [
          "Zinc is above copper in the series, so it displaces copper: \\(\\mathrm{Zn} + \\mathrm{CuSO_4} \\rightarrow \\mathrm{ZnSO_4} + \\mathrm{Cu}\\).",
          "B: copper is below hydrogen. C: silver is below copper. D: bromine is less reactive than chlorine. E: iron is below magnesium. None of these react.",
        ],
        answer: "(A) Zinc powder added to copper(II) sulfate solution",
      },
      practiceSet: [
        { prompt: "What are the products when calcium reacts with cold water?", answer: "Calcium hydroxide and hydrogen" },
        { prompt: "Will copper displace silver from silver nitrate solution?", answer: "Yes", method: "Copper is above silver" },
        { prompt: "Will iodine displace chlorine from sodium chloride solution?", answer: "No", method: "Iodine is less reactive than chlorine" },
        { prompt: "Which gas forms when zinc reacts with dilute sulfuric acid?", answer: "Hydrogen" },
      ],
      traps: [
        {
          title: "Cold water gives a hydroxide, steam gives an oxide",
          body: "A reactive metal in cold water makes the metal hydroxide and hydrogen. The oxide forms when a less reactive metal is heated in steam. An option pairing cold water with an oxide is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-sto-solubility-rules",
      name: "Solubility rules for predicting a precipitate",
      intuition:
        "A precipitate forms when two solutions mix and one possible pairing of their ions is insoluble. A handful of rules tells you which salts dissolve, so you can predict whether a solid appears and what it is.",
      definition:
        "- A **precipitate** is an insoluble solid formed when two solutions are mixed.\n" +
        "- To predict one, swap the partners of the two compounds and check whether either new pairing is insoluble.\n" +
        "- Salts of **sodium, potassium and ammonium**, and all **nitrates**, are soluble. So these ions are never in the precipitate.\n" +
        "- The colour of some precipitates identifies the ion: \\(\\mathrm{AgCl}\\) white, \\(\\mathrm{AgI}\\) and \\(\\mathrm{PbI_2}\\) yellow, \\(\\mathrm{Cu(OH)_2}\\) blue, \\(\\mathrm{Fe(OH)_3}\\) red-brown.",
      table: {
        columns: ["Compounds of", "Usually", "Main exceptions"],
        rows: [
          { cells: ["Sodium, potassium, ammonium", "Soluble", "None at this level"] },
          { cells: ["Nitrates", "Soluble", "None at this level"] },
          { cells: ["Chlorides, bromides, iodides", "Soluble", "Silver and lead(II) salts are insoluble"] },
          { cells: ["Sulfates", "Soluble", "Barium and lead(II) insoluble; calcium only slightly soluble"] },
          { cells: ["Carbonates", "Insoluble", "Sodium, potassium and ammonium carbonates dissolve"] },
          { cells: ["Hydroxides", "Insoluble", "Group 1 hydroxides dissolve; calcium hydroxide slightly"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which pair of solutions forms a precipitate when mixed?",
        options: [
          "Potassium nitrate and sodium chloride",
          "Sodium sulfate and magnesium chloride",
          "Silver nitrate and potassium bromide",
          "Hydrochloric acid and potassium hydroxide",
          "Ammonium chloride and sodium nitrate",
        ],
        steps: [
          "Swap partners in C: silver bromide and potassium nitrate. Silver bromide is insoluble, so it precipitates.",
          "A, B and E only give soluble pairings (magnesium sulfate dissolves). D is a neutralisation: it makes water and a soluble salt, with no solid.",
        ],
        answer: "(C) Silver nitrate and potassium bromide",
      },
      practiceSet: [
        { prompt: "Name the precipitate formed from barium nitrate and potassium sulfate solutions.", answer: "Barium sulfate" },
        { prompt: "Is lead(II) nitrate soluble in water?", answer: "Yes", method: "All nitrates are soluble" },
        { prompt: "What precipitate forms when sodium hydroxide solution is added to copper(II) sulfate solution, and what colour is it?", answer: "Copper(II) hydroxide, blue" },
        { prompt: "Is sodium carbonate soluble in water?", answer: "Yes", method: "Sodium compounds are soluble" },
      ],
      traps: [
        {
          title: "The precipitate never contains sodium, potassium or nitrate",
          body: "Their compounds all dissolve, so they stay in solution as spectator ions. An option showing sodium chloride or potassium nitrate as the solid formed is wrong.",
        },
      ],
    },
  ],
};
