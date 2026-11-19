import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_AB_STRENGTH_NOTE: SubtopicNote = {
  subtopicName: "Strength, Basicity and Ionisation",
  title: "Strength, Basicity and Ionisation",
  oneLineDefinition:
    "In water an acid gives H⁺ ions and a base gives OH⁻ ions; a strong one breaks up almost completely and a weak one only partly, and basicity counts the H⁺ ions one molecule of an acid can give.",
  whyItMatters:
    "Ten questions in the bank, one EASY, seven MODERATE and two HARD. Four ask whether an acid or base is strong or weak (or which solutions light a bulb), three count the basicity of an acid or the acidity of a base, and three ask what happens when an acid is added to water.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9abst-strength",
      name: "Strong and weak acids and bases",
      intuition:
        "Drop an acid into water and its molecules break up into ions. In hydrochloric acid almost every molecule breaks up, so there are many H⁺ ions: a strong acid. In acetic acid only a few molecules break up: a weak acid. Ions carry electric current, so the strong solution conducts far better.",
      definition:
        "- An **acid** gives \\(\\mathrm{H^+}\\) ions in water; a **base** gives \\(\\mathrm{OH^-}\\) ions. A base that dissolves in water is an **alkali**.\n" +
        "- **Strong** acids and bases **dissociate (ionise) almost completely** in water. **Weak** ones dissociate **only partly**.\n" +
        "- Strong acids: \\(\\mathrm{HCl}\\), \\(\\mathrm{H_2SO_4}\\), \\(\\mathrm{HNO_3}\\). Strong bases: \\(\\mathrm{NaOH}\\), \\(\\mathrm{KOH}\\).\n" +
        "- Weak acids: acetic acid, formic acid \\(\\mathrm{HCOOH}\\), carbonic acid and the fruit acids. Weak bases: ammonia, ammonium hydroxide \\(\\mathrm{NH_4OH}\\), methyl amine.\n" +
        "- Solutions of acids, bases and salts contain **ions**, so they **conduct electricity** and light a bulb. Sugar and alcohol solutions have no ions and do not.",
      table: {
        columns: ["Substance", "Acid or base", "Strong or weak"],
        rows: [
          { cells: ["Hydrochloric acid, \\(\\mathrm{HCl}\\)", "Acid", "Strong"] },
          { cells: ["Sulphuric acid, \\(\\mathrm{H_2SO_4}\\)", "Acid", "Strong"] },
          { cells: ["Nitric acid, \\(\\mathrm{HNO_3}\\)", "Acid", "Strong"] },
          { cells: ["Acetic acid, \\(\\mathrm{CH_3COOH}\\)", "Acid", "Weak"] },
          { cells: ["Formic acid, \\(\\mathrm{HCOOH}\\)", "Acid", "Weak"] },
          { cells: ["Carbonic acid, \\(\\mathrm{H_2CO_3}\\)", "Acid", "Weak"] },
          { cells: ["Sodium hydroxide, \\(\\mathrm{NaOH}\\)", "Base", "Strong"] },
          { cells: ["Potassium hydroxide, \\(\\mathrm{KOH}\\)", "Base", "Strong"] },
          { cells: ["Ammonia and ammonium hydroxide, \\(\\mathrm{NH_4OH}\\)", "Base", "Weak"] },
          { cells: ["Methyl amine", "Base", "Weak"] },
        ],
        caption: "Strong or weak is about how much of the substance breaks into ions, not about how much of it is in the bottle.",
      },
      selfCheckExample: {
        prompt: "Find the odd one out by how far each one dissociates in water: HCl, HNO₃, CH₃COOH, NaOH.",
        steps: ["HCl, HNO₃ and NaOH break up almost completely: they are strong.", "Acetic acid breaks up only partly: it is weak."],
        answer: "CH₃COOH (acetic acid)",
      },
      practiceSet: [
        { prompt: "Is ammonium hydroxide a strong base or a weak base?", answer: "A weak base" },
        { prompt: "Which ion does an acid give in water?", answer: "The hydrogen ion, H⁺" },
        { prompt: "A bulb is wired through a beaker of sugar solution in one set-up and through a beaker of dilute sulphuric acid in another. In which set-up does the bulb glow?", answer: "The one with dilute sulphuric acid, because it contains ions; the sugar solution has none" },
        { prompt: "Is formic acid a strong acid or a weak acid?", answer: "A weak acid" },
      ],
      pyqExampleId: "cb9ab03b-28a3-419e-94ea-2ba8a76e4b46",
      traps: [
        {
          title: "Mixing up strong and concentrated",
          body: "A strong acid breaks up almost completely into ions. A concentrated acid simply has a lot of acid in little water. Dilute hydrochloric acid is still a strong acid.",
        },
        {
          title: "Thinking any dissolved substance conducts",
          body: "Only solutions with ions conduct. Sugar and alcohol dissolve in water but give no ions, so the bulb stays dark.",
        },
        {
          title: "Calling ammonia a strong base because it smells sharp",
          body: "Ammonia and ammonium hydroxide ionise only partly in water, so they are weak bases.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9abst-basicity",
      name: "Basicity of an acid and acidity of a base",
      intuition:
        "Count what one molecule can give away. One molecule of sulphuric acid can give two H⁺ ions, so its basicity is 2. One molecule of calcium hydroxide can give two OH⁻ ions, so its acidity is 2. Only hydrogen that can leave as H⁺ is counted, not every hydrogen in the formula.",
      definition:
        "- **Basicity of an acid**: the number of \\(\\mathrm{H^+}\\) ions one molecule can give (its replaceable hydrogen atoms). 1 = **monobasic**, 2 = **dibasic**, 3 = **tribasic**.\n" +
        "- **Acidity of a base**: the number of \\(\\mathrm{OH^-}\\) ions one molecule can give. 1 = **monoacidic**, 2 = **diacidic**, 3 = **triacidic**.\n" +
        "- Count only the hydrogen that can leave. In acetic acid, \\(\\mathrm{CH_3COOH}\\), only the H of the COOH group is replaceable, so it is **monobasic**.\n" +
        "- In phosphorous acid, \\(\\mathrm{H_3PO_3}\\), one H is joined straight to the phosphorus atom and cannot leave, so it is **dibasic**. Phosphoric acid, \\(\\mathrm{H_3PO_4}\\), is **tribasic**.",
      table: {
        columns: ["Acid or base", "Formula", "Basicity or acidity"],
        rows: [
          { cells: ["Hydrochloric acid", "\\(\\mathrm{HCl}\\)", "1 (monobasic)"] },
          { cells: ["Acetic acid", "\\(\\mathrm{CH_3COOH}\\)", "1 (monobasic)"], noteAmber: "Four H atoms in the formula, only one replaceable." },
          { cells: ["Sulphuric acid", "\\(\\mathrm{H_2SO_4}\\)", "2 (dibasic)"] },
          { cells: ["Carbonic acid", "\\(\\mathrm{H_2CO_3}\\)", "2 (dibasic)"] },
          { cells: ["Phosphorous acid", "\\(\\mathrm{H_3PO_3}\\)", "2 (dibasic)"] },
          { cells: ["Phosphoric acid", "\\(\\mathrm{H_3PO_4}\\)", "3 (tribasic)"] },
          { cells: ["Citric acid", "\\(\\mathrm{C_6H_8O_7}\\)", "3 (tribasic)"] },
          { cells: ["Sodium hydroxide", "\\(\\mathrm{NaOH}\\)", "1 (monoacidic)"] },
          { cells: ["Calcium hydroxide", "\\(\\mathrm{Ca(OH)_2}\\)", "2 (diacidic)"] },
          { cells: ["Ferric hydroxide", "\\(\\mathrm{Fe(OH)_3}\\)", "3 (triacidic)"] },
          { cells: ["Aluminium hydroxide", "\\(\\mathrm{Al(OH)_3}\\)", "3 (triacidic)"] },
        ],
        caption: "For a metal hydroxide, the acidity is simply the number of OH groups in the formula.",
      },
      selfCheckExample: {
        prompt: "What is the acidity of magnesium hydroxide, Mg(OH)₂, and what is the basicity of nitric acid, HNO₃?",
        steps: ["Mg(OH)₂ has two OH groups, so it can give two OH⁻ ions.", "HNO₃ has one replaceable hydrogen."],
        answer: "Mg(OH)₂ is diacidic (2); HNO₃ is monobasic (1).",
      },
      practiceSet: [
        { prompt: "What is the basicity of sulphuric acid?", answer: "2 (dibasic)" },
        { prompt: "Name a tribasic acid.", answer: "Phosphoric acid (or citric acid)" },
        { prompt: "What is the acidity of aluminium hydroxide?", answer: "3 (triacidic)" },
        { prompt: "Why is acetic acid monobasic even though its formula has four hydrogen atoms?", answer: "Only the hydrogen of its COOH group can be given away as H⁺" },
      ],
      pyqExampleId: "624839b0-e0ad-4afa-b75f-79fca6bc7bfd",
      traps: [
        {
          title: "Counting every hydrogen in the formula",
          body: "Basicity counts only the hydrogen that can leave as H⁺. Phosphorous acid, H₃PO₃, has three H atoms but a basicity of 2.",
        },
        {
          title: "Mixing up basicity and acidity",
          body: "Basicity belongs to an acid (H⁺ ions it gives). Acidity belongs to a base (OH⁻ ions it gives). Ferric hydroxide is triacidic, not tribasic.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9abst-dilution",
      name: "Ionisation and dilution of an acid in water",
      intuition:
        "An acid shows its acid properties only in water. There its molecules break up and each H⁺ ion joins a water molecule to make a hydronium ion, H₃O⁺. Adding more water does not remove these ions; it only spreads them through a bigger volume, so each spoonful holds fewer of them.",
      definition:
        "- In water an acid **ionises**: \\(\\mathrm{HCl \\rightarrow H^+ + Cl^-}\\). The \\(\\mathrm{H^+}\\) joins water to form the **hydronium ion**, \\(\\mathrm{H_3O^+}\\).\n" +
        "- Adding water to an acid is **dilution**: the **concentration** of \\(\\mathrm{H_3O^+}\\) ions per unit volume **decreases**.\n" +
        "- With water alone there is no base, so there is **no neutralisation** and **no salt** is formed.\n" +
        "- Mixing an acid with water gives out a lot of **heat**. Always add the **acid to water, slowly, with stirring**, never water to acid.\n" +
        "- When sulphuric acid and water mix, their particles attract each other and pack closer, so the final volume is **slightly less** than the two volumes added together.",
      table: {
        columns: ["When acid is added to water", "What happens"],
        rows: [
          { cells: ["Ionisation", "Yes: the acid breaks into ions and gives \\(\\mathrm{H_3O^+}\\)"] },
          { cells: ["Dilution", "Yes: the concentration of \\(\\mathrm{H_3O^+}\\) ions falls"] },
          { cells: ["Neutralisation", "No: there is no base"] },
          { cells: ["Salt formation", "No: a salt needs an acid and a base"] },
          { cells: ["Heat", "Given out; adding water to the acid can make it splash"] },
          { cells: ["Total volume", "A little less than the sum of the two volumes"] },
        ],
        caption: "Ionisation and dilution happen together; neutralisation needs a base.",
      },
      selfCheckExample: {
        prompt: "Why is a student told to pour concentrated sulphuric acid slowly into water and never water into the acid?",
        steps: ["Mixing gives out a lot of heat.", "Water poured onto the acid can boil at once and throw the acid out."],
        answer: "The mixing is strongly heat-giving; adding the acid slowly to a lot of water keeps the heat spread out and safe.",
      },
      practiceSet: [
        { prompt: "Which ion is formed when H⁺ from an acid joins a water molecule?", answer: "The hydronium ion, H₃O⁺" },
        { prompt: "What happens to the concentration of H₃O⁺ ions when an acid solution is diluted with water?", answer: "It decreases" },
        { prompt: "Is a salt formed when a little hydrochloric acid is added to pure water?", answer: "No: a salt forms only when an acid reacts with a base" },
        { prompt: "50 ml of sulphuric acid is mixed with 50 ml of water. Is the volume of the mixture more than, less than or equal to 100 ml?", answer: "Slightly less than 100 ml" },
      ],
      pyqExampleId: "80b4c99b-8707-4d92-85f2-2094ababb0c9",
      traps: [
        {
          title: "Thinking dilution removes ions",
          body: "Dilution keeps the same number of H₃O⁺ ions but spreads them through more water. Only their concentration falls.",
        },
        {
          title: "Adding volumes as if nothing happens",
          body: "Sulphuric acid and water particles attract and pack closer, so 10 ml of the acid and 10 ml of water make a little less than 20 ml.",
        },
        {
          title: "Pouring water into acid",
          body: "The heat given out can make the mixture boil and splash. Always add the acid to water, slowly.",
        },
      ],
    },
  ],
};
