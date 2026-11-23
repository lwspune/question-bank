import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GN_PRINCIPLES_NOTE: SubtopicNote = {
  subtopicName: "Principles of Green Chemistry",
  title: "The Twelve Principles and Atom Economy",
  oneLineDefinition:
    "The twelve principles of green chemistry with the textbook's illustration of each, and percentage atom economy, the one principle you calculate.",
  whyItMatters:
    "14 questions. Five were set in board papers: write two principles (2024), the formula for percentage atom economy (2025 and 2026), what atom economy is (2025), and the names of four principles (2026). The textbook adds explaining any three principles, atom economy with an example, the gamma isomer of BHC, safer solvents, minimization of steps, catalysts and who coined green chemistry.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccgn-principles",
      name: "The twelve principles of green chemistry",
      intuition:
        "Every principle is one way of not making waste or harm in the first place: waste you never make needs no clean-up, a safe chemical needs no protection, energy you never use needs no fuel. Learn the twelve names in order, then one line for what each says.",
      definition:
        "- The twelve principles were enunciated by **Paul Anastas**.\n" +
        "- A board answer names the principle, then states it in one sentence. 'Explain' questions also want the textbook's illustration (next card).\n" +
        "- Principle 8, **reduce derivatives**, is also called **minimization of steps**.",
      table: {
        columns: ["No.", "Principle", "What it says"],
        rows: [
          {
            cells: ["1", "Prevention of waste or by-products", "Give priority to preventing waste rather than cleaning up and treating waste after it has been created."],
            pyqExampleId: "50465bc7-667f-44c6-8bd8-c3bbd27399e8",
            noteAmber: "Board 2024 asked you to write any two principles; prevention of waste and atom economy are the easiest to state well.",
          },
          { cells: ["2", "Atom economy", "Design reactions so that most of the atoms of the reactants end up in the desired product, with only small amounts of unwanted by-products."] },
          { cells: ["3", "Less hazardous chemical synthesis", "Design reactions and synthetic routes to be as safe as possible, so that hazardous waste is not formed."] },
          { cells: ["4", "Designing safer chemicals", "Develop products that are less toxic, or that need less toxic raw materials."] },
          {
            cells: ["5", "Use safer solvents and auxiliaries", "Choose the safest solvent for each step and keep the total amount of solvents and auxiliary substances to a minimum."],
            pyqExampleId: "4bec11a0-c380-41ae-bad0-041034511378",
            noteAmber: "Board 2026 asked for the names of four principles.",
          },
          { cells: ["6", "Design for energy efficiency", "Design syntheses to use as little energy as possible, best at room temperature and pressure."] },
          { cells: ["7", "Use of renewable feedstocks", "Use chemicals made from renewable (plant based) sources rather than from crude oil."] },
          { cells: ["8", "Reduce derivatives (minimization of steps)", "Avoid unnecessary protection and deprotection steps, since they need extra reagents and make waste."] },
          { cells: ["9", "Use of catalysis", "Use catalysts: they speed up reactions, increase selectivity, minimize waste and cut reaction times and energy demands."] },
          { cells: ["10", "Design for degradation", "Design chemicals that break down after use into products that are not toxic, bioaccumulative or persistent."] },
          { cells: ["11", "Real-time analysis for pollution prevention", "Develop analytical methods that monitor and control a process continuously, before hazardous substances form."] },
          { cells: ["12", "Safer chemistry for accident prevention", "Develop processes that keep the risk of accidents, explosions, fire and emissions low."] },
        ],
      },
      selfCheckExample: {
        prompt: "A chemist uses glucose from plants, instead of a chemical made from crude oil, as a starting material. Which principle does this follow?",
        steps: ["Plants are a renewable source; crude oil is not."],
        answer: "Use of renewable feedstocks (principle 7)",
      },
      practiceSet: [
        { prompt: "Which principle of green chemistry is also called minimization of steps?", answer: "Reduce derivatives (principle 8)" },
        { prompt: "Which principle says reactions are best carried out at room temperature and pressure?", answer: "Design for energy efficiency (principle 6)" },
        { prompt: "Which principle prefers biodegradable polymers and pesticides?", answer: "Design for degradation (principle 10)" },
        { prompt: "Which principle calls for continuous monitoring of a manufacturing unit before hazardous substances form?", answer: "Real-time analysis for pollution prevention (principle 11)" },
      ],
      pyqExampleId: "50465bc7-667f-44c6-8bd8-c3bbd27399e8",
      traps: [
        {
          title: "A name with no statement",
          body: "For 'write two principles', a bare name such as 'atom economy' earns half the mark. Add the one-line statement after each name.",
        },
        {
          title: "Prevention is not clean-up",
          body: "Principle 1 is about not making waste at all. An answer about treating waste after it forms states the opposite of the principle.",
        },
        {
          title: "Who coined green chemistry",
          body: "Paul T. Anastas coined green chemistry. Richard Feynman and Nario Taniguchi belong to the history of nanotechnology, and 'Born Haber' is a cycle, not a person.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccgn-atom-economy",
      name: "Percentage atom economy",
      intuition:
        "Atom economy asks: of all the mass you feed into a reaction, how much ends up in the product you want? The rest leaves as by-products, which is waste. An addition reaction puts every atom of the reactants into one product, so it scores 100%. A reaction that throws out water or a salt scores less, however good its yield.",
      definition:
        "- **Atom economy** is a measure of the amount of atoms from the starting materials that are present in the useful products at the end of a chemical process.\n" +
        "- **Good atom economy** means most atoms of the reactants are incorporated in the desired product and only small amounts of unwanted by-products form, so there are fewer problems of waste disposal.\n" +
        "- Add the formula weights of **all** the reactants, including the reagents that end up in the by-products.\n" +
        "- The textbook's example, butan-1-ol to 1-bromobutane with NaBr and H₂SO₄, gives only about 50%: nearly half the mass leaves as NaHSO₄ and water.\n" +
        "- Atomic masses used: C = 12, H = 1, O = 16, Na = 23, S = 32, Cl = 35.5, Br = 80.",
      formula: {
        label: "Percentage atom economy",
        latex: "\\%\\ \\text{atom economy} = \\dfrac{\\text{formula weight of the desired product}}{\\text{sum of formula weights of all the reactants used}} \\times 100",
      },
      authoredExample: {
        prompt:
          "Bromoethane is made from ethanol and hydrogen bromide: \\(\\text{C}_2\\text{H}_5\\text{OH} + \\text{HBr} \\longrightarrow \\text{C}_2\\text{H}_5\\text{Br} + \\text{H}_2\\text{O}\\). Calculate the percentage atom economy. (C = 12, H = 1, O = 16, Br = 80)",
        steps: [
          "Given: desired product \\(\\text{C}_2\\text{H}_5\\text{Br}\\); reactants \\(\\text{C}_2\\text{H}_5\\text{OH}\\) and \\(\\text{HBr}\\).",
          "Formula: \\(\\%\\ \\text{atom economy} = \\dfrac{\\text{formula weight of desired product}}{\\text{sum of formula weights of reactants}} \\times 100\\).",
          "Desired product: \\(\\text{C}_2\\text{H}_5\\text{Br} = 2(12) + 5(1) + 80 = 109\\ \\text{u}\\).",
          "Reactants: \\(\\text{C}_2\\text{H}_5\\text{OH} = 2(12) + 6(1) + 16 = 46\\ \\text{u}\\); \\(\\text{HBr} = 1 + 80 = 81\\ \\text{u}\\); sum \\(= 127\\ \\text{u}\\).",
          "Substitution: \\(\\%\\ \\text{atom economy} = \\dfrac{109\\ \\text{u}}{127\\ \\text{u}} \\times 100 = 85.83\\ \\%\\).",
        ],
        answer: "85.83%",
      },
      selfCheckExample: {
        prompt:
          "Find the percentage atom economy of \\(\\text{CH}_2{=}\\text{CH}_2 + \\text{Br}_2 \\longrightarrow \\text{BrCH}_2\\text{CH}_2\\text{Br}\\). (C = 12, H = 1, Br = 80)",
        steps: [
          "Product: \\(2(12) + 4(1) + 2(80) = 188\\ \\text{u}\\).",
          "Reactants: \\(28 + 160 = 188\\ \\text{u}\\).",
          "\\(\\dfrac{188}{188} \\times 100 = 100\\ \\%\\): an addition reaction wastes no atoms.",
        ],
        answer: "100%",
      },
      practiceSet: [
        {
          prompt: "Calculate the percentage atom economy for making chloromethane: \\(\\text{CH}_4 + \\text{Cl}_2 \\longrightarrow \\text{CH}_3\\text{Cl} + \\text{HCl}\\). (C = 12, H = 1, Cl = 35.5)",
          answer: "\\(\\dfrac{50.5}{16 + 71} \\times 100 = 58.05\\ \\%\\)",
        },
        { prompt: "Which type of reaction always has an atom economy of 100%?", answer: "An addition reaction, in which all the reactants combine into one product" },
        { prompt: "A reaction gives a 100% yield. Must its atom economy also be 100%?", answer: "No. Yield counts the product formed; atom economy counts the mass lost as by-products, which a perfect yield can still have" },
        { prompt: "Why does good atom economy mean fewer problems of waste disposal?", answer: "Most atoms of the reactants end up in the desired product, so only small amounts of unwanted by-products are formed" },
      ],
      pyqExampleId: "62e402ba-3051-4a56-bd27-d68fa0a71dca",
      traps: [
        {
          title: "Leaving a reactant out of the sum",
          body: "Every reactant goes in the denominator, even one such as \\(\\text{H}_2\\text{SO}_4\\) that ends up only in a by-product. Missing it makes the atom economy look far better than it is.",
        },
        {
          title: "Putting the by-products on top",
          body: "Only the **desired** product goes in the numerator. Adding the mass of water or a salt formed alongside it gives 100% for every balanced equation.",
        },
        {
          title: "Atom economy is not percentage yield",
          body: "Do not use the actual mass of product obtained. Atom economy is worked out from the balanced equation and formula weights alone.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccgn-illustrations",
      name: "Illustrating a principle: the textbook's examples",
      intuition:
        "'Explain a principle' and 'how will you illustrate' questions want two things: the statement, and the textbook's own example. The examples are short and fixed, so learn one per principle.",
      definition:
        "- **Answer shape:** name of the principle, its statement, then the illustration.\n" +
        "- **Minimization of steps, the book's example:** to make m-hydroxybenzoic acid from m-hydroxybenzaldehyde, the -OH group is first protected with benzyl chloride, \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{Cl}\\); then the -CHO group is oxidised, [O], to -COOH; then the -OH group is deprotected. Steps 1 and 3 only put a group on and take it off again, using reagents and making waste, so the atom economy is also less. Biocatalytic reactions often need no protection at all.\n" +
        "- **Catalyst:** a substance that changes the rate of a reaction and remains chemically unchanged at the end. The chapter's examples are Pd and Pt nanoparticles (hydrogenation) and TiO₂ and ZnO (photocatalysis).",
      table: {
        columns: ["Principle", "The textbook's illustration"],
        rows: [
          { cells: ["Prevention of waste", "Zero waste technology: the waste of one system is the raw material of another. Bottom ash of a thermal power station is used by the cement and brick industry; effluent from cleaning machinery parts is used as coolant water."] },
          {
            cells: ["Less hazardous chemical synthesis", "DDT controlled typhoid and malaria carrying mosquitoes but was found harmful to living things. Benzene hexachloride (BHC) is used now; its gamma isomer is called gammexane or lindane."],
            pyqExampleId: "ec9ca5ea-6b8d-4d53-bf2d-304810ec0064",
          },
          { cells: ["Designing safer chemicals", "Adipic acid for the polymer industry was made from benzene, which is carcinogenic and a volatile organic compound. Draths and Frost made it enzymatically from glucose."] },
          {
            cells: ["Use safer solvents and auxiliaries", "Use green solvents such as water and supercritical CO₂ in place of volatile halogenated solvents such as CH₂Cl₂, CHCl₃ and CCl₄. Water is safe; dichloromethane is hazardous."],
            pyqExampleId: "aacd8308-e2a4-4cc4-b658-a15573cb80d8",
          },
          { cells: ["Design for energy efficiency", "A biocatalyst works at ambient conditions; better heating, such as microwave heating, saves energy."] },
          { cells: ["Use of renewable feedstocks", "Agricultural or biological products are shared with future generations and are generally biodegradable; overusing nonrenewable feedstocks deprives them."] },
          {
            cells: ["Reduce derivatives", "Protection of -OH, oxidation of -CHO, then deprotection, in making m-hydroxybenzoic acid from m-hydroxybenzaldehyde (see above)."],
            pyqExampleId: "e335dd75-129a-4f69-baf2-0a0098538a02",
          },
          {
            cells: ["Use of catalysis", "A catalyst speeds up a reaction, increases selectivity and cuts waste, time and energy. Nanoparticle catalysts: Pd and Pt for hydrogenation, TiO₂ and ZnO for photocatalysis."],
            pyqExampleId: "6a047345-a3a9-428c-a18e-b5ff9408cbd4",
          },
          { cells: ["Design for degradation", "Biodegradable polymers and pesticides are preferred; an international recycle mark (1 to 7) is printed on plastic items to help sorting."] },
          { cells: ["Real-time analysis", "Continuous monitoring of manufacturing and processing units, important for chemical industries and nuclear reactors."] },
          { cells: ["Accident prevention", "A process that works with gases runs a higher risk of explosion than one with nonvolatile liquids and solids, so choose substances accordingly."] },
        ],
      },
      practiceSet: [
        { prompt: "Which insecticide was replaced by BHC, and why?", answer: "DDT, because it was found to be harmful to living things" },
        { prompt: "From what did Draths and Frost make adipic acid enzymatically?", answer: "Glucose" },
        { prompt: "Give one example of zero waste technology from the textbook.", answer: "Bottom ash of a thermal power station used as raw material for the cement and brick industry" },
        { prompt: "In the synthesis of m-hydroxybenzoic acid from m-hydroxybenzaldehyde, which reagent protects the -OH group?", answer: "Benzyl chloride, \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{Cl}\\)" },
      ],
      pyqExampleId: "aacd8308-e2a4-4cc4-b658-a15573cb80d8",
      traps: [
        {
          title: "Lindane is the gamma isomer of BHC",
          body: "The textbook prints the Greek letter wrongly as a capital upsilon, but it means gamma. Gammexane and lindane are two names for the same gamma isomer of benzene hexachloride; DDT is a different compound.",
        },
        {
          title: "Chlorinated solvents are not green",
          body: "CH₂Cl₂, CHCl₃ and CCl₄ are the solvents the principle wants replaced. Water and supercritical CO₂ are the green ones.",
        },
        {
          title: "An 'explain' answer with no illustration",
          body: "A statement alone answers 'name' or 'state'. For 'explain' or 'illustrate', add the book's example, or the answer is marked incomplete.",
        },
      ],
    },
  ],
};
