import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_MO_FORMULAE_NOTE: SubtopicNote = {
  subtopicName: "Laws of Combination and Chemical Formulae",
  title: "Laws of Combination and Chemical Formulae",
  oneLineDefinition:
    "Elements combine in fixed proportions by mass, each element exists as molecules of a set number of atoms, and a correct formula balances the valencies of its parts.",
  whyItMatters:
    "Three questions in the bank, one EASY and two MODERATE: which law two copper oxide experiments show, the atomicity of chlorine and argon, and which of four formulae is written correctly. Each is a definition or a valency rule, and each wrong option is a near miss, such as CaCl for CaCl₂.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spimofo-laws",
      name: "The laws of chemical combination",
      intuition:
        "Water from a river and water made in a laboratory are the same compound, so they must be built the same way. Weigh the hydrogen and oxygen in any sample and the share of each never changes. That steadiness is what the laws of combination describe.",
      definition:
        "- **Law of conservation of mass:** in a chemical reaction, mass is neither created nor destroyed. Total mass of reactants \\(=\\) total mass of products.\n" +
        "- **Law of constant proportions:** a pure compound always contains the same elements combined in the **same proportion by mass**, however it is made. Check it by working out the **fraction** of one element in each sample.\n" +
        "- **Law of multiple proportions:** when two elements form **more than one** compound, the masses of one that combine with a fixed mass of the other are in a simple whole-number ratio (carbon gives CO and CO₂: 16 g and 32 g of oxygen with 12 g of carbon, ratio 1 : 2).\n" +
        "- So the same fraction in two samples of **one** compound means constant proportions; two **different** compounds of the same elements point to multiple proportions.",
      formula: {
        label: "Mass fraction of an element",
        latex: "\\text{fraction of element} = \\frac{\\text{mass of element}}{\\text{mass of compound}}",
      },
      authoredExample: {
        prompt: "One sample of water of mass 18 g contains 2 g of hydrogen. Another sample of mass 45 g contains 5 g of hydrogen. Which law do these show?",
        steps: [
          "Fraction of hydrogen in the first: \\(\\frac{2}{18} = \\frac{1}{9}\\).",
          "Fraction of hydrogen in the second: \\(\\frac{5}{45} = \\frac{1}{9}\\).",
          "The same compound has the same proportion by mass both times.",
        ],
        answer: "The law of constant proportions",
      },
      selfCheckExample: {
        prompt: "12 g of carbon burns completely in 32 g of oxygen, and carbon dioxide is the only product. What mass of carbon dioxide forms, and which law tells you?",
        steps: ["Mass is neither made nor lost in a reaction.", "\\(12 + 32 = 44\\) g of carbon dioxide."],
        answer: "44 g, by the law of conservation of mass",
      },
      practiceSet: [
        { prompt: "Which law says a pure compound always has the same elements in the same proportion by mass?", answer: "The law of constant proportions" },
        { prompt: "2.4 g of magnesium gives 4.0 g of magnesium oxide, and 4.8 g gives 8.0 g. What fraction of the oxide is magnesium each time?", answer: "\\(\\frac{2.4}{4.0} = \\frac{4.8}{8.0} = 0.6\\)" },
        { prompt: "With 12 g of carbon, carbon monoxide has 16 g of oxygen and carbon dioxide has 32 g. Which law does the ratio 1 : 2 show?", answer: "The law of multiple proportions" },
      ],
      pyqExampleId: "51ed336d-a632-4ea9-bb7a-133da3cd63db",
      traps: [
        {
          title: "Choosing multiple proportions for one compound",
          body:
            "Multiple proportions needs two different compounds of the same two elements. Two samples of the same oxide with the same fraction of metal show constant proportions.",
        },
        {
          title: "Comparing masses instead of fractions",
          body:
            "Two samples of a compound usually have different total masses. Divide the mass of one element by the mass of the sample before comparing.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spimofo-atomicity",
      name: "Atomicity: how many atoms in one molecule",
      intuition:
        "Some elements are happy as lone atoms; others pair up or form small clusters. The number of atoms joined in one molecule of the element is its atomicity, and a handful of them are worth knowing by heart.",
      definition:
        "- **Atomicity** is the number of atoms in one molecule of an element.\n" +
        "- **Noble gases** (helium, neon, argon) exist as single atoms: **monoatomic**.\n" +
        "- Hydrogen, oxygen, nitrogen and the halogens (fluorine, chlorine, bromine, iodine) form pairs: **diatomic**.\n" +
        "- Ozone \\(\\text{O}_3\\) is triatomic, phosphorus \\(\\text{P}_4\\) tetratomic and sulphur \\(\\text{S}_8\\) has eight atoms.",
      table: {
        columns: ["Atomicity", "Name", "Examples"],
        rows: [
          { cells: ["1", "Monoatomic", "Helium, neon, argon (noble gases); metals such as sodium"] },
          { cells: ["2", "Diatomic", "H₂, O₂, N₂, Cl₂, F₂, Br₂, I₂"] },
          { cells: ["3", "Triatomic", "O₃ (ozone)"] },
          { cells: ["4", "Tetratomic", "P₄ (phosphorus)"] },
          { cells: ["8", "Octatomic (polyatomic)", "S₈ (sulphur)"] },
        ],
        caption: "Oxygen is diatomic as O₂ but triatomic as ozone, O₃.",
      },
      selfCheckExample: {
        prompt: "What is the atomicity of nitrogen and of neon?",
        steps: ["Nitrogen exists as N₂ molecules: 2.", "Neon is a noble gas and exists as single atoms: 1."],
        answer: "Nitrogen 2 (diatomic), neon 1 (monoatomic)",
      },
      practiceSet: [
        { prompt: "What is the atomicity of ozone?", answer: "3" },
        { prompt: "Is helium monoatomic or diatomic?", answer: "Monoatomic (a noble gas)" },
        { prompt: "What is the atomicity of phosphorus?", answer: "4 (P₄)" },
        { prompt: "Is bromine monoatomic or diatomic?", answer: "Diatomic (Br₂)" },
      ],
      pyqExampleId: "100def28-e692-4664-82bc-e7d18f3d232e",
      traps: [
        {
          title: "Treating every gas as diatomic",
          body: "Hydrogen, oxygen, nitrogen and chlorine are diatomic, but the noble gases (helium, neon, argon) are monoatomic.",
        },
        {
          title: "Forgetting ozone",
          body: "Oxygen has two forms: ordinary oxygen O₂ (atomicity 2) and ozone O₃ (atomicity 3). Read which one the question names.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spimofo-valency",
      name: "Valency and writing a correct formula",
      intuition:
        "Think of valency as the number of hands an atom or group has to hold others. A formula is correct when every hand is held: the total valency on the positive side equals the total on the negative side.",
      definition:
        "- **Valency** is the combining capacity of an atom or a group of atoms (a radical).\n" +
        "- Valency 1: H, Na, K, Ag, NH₄ (ammonium); Cl, OH (hydroxide), NO₃ (nitrate).\n" +
        "- Valency 2: Mg, Ca, Zn, Cu; O, S (sulphide), SO₄ (sulphate), CO₃ (carbonate).\n" +
        "- Valency 3: Al, Fe (in iron(III) compounds), Bi; PO₄ (phosphate).\n" +
        "- **Criss-cross:** write the symbols, swap the valencies to become the subscripts, and cancel any common factor. Put a group in brackets when it needs a subscript more than 1.\n" +
        "- Equal valencies cancel to 1 : 1, so no subscripts are needed.",
      formula: {
        label: "Balanced formula",
        latex: "\\text{A}^{x}\\,\\text{B}^{y} \\;\\Rightarrow\\; \\text{A}_y\\text{B}_x \\quad (\\text{total valency of A} = \\text{total valency of B})",
      },
      authoredExample: {
        prompt: "Write the formula of aluminium sulphate.",
        steps: [
          "Aluminium has valency 3; sulphate (SO₄) has valency 2.",
          "Criss-cross: Al takes 2, SO₄ takes 3.",
          "Check: \\(2 \\times 3 = 6\\) and \\(3 \\times 2 = 6\\), so it balances.",
        ],
        answer: "\\(\\text{Al}_2(\\text{SO}_4)_3\\)",
      },
      selfCheckExample: {
        prompt: "Write the formula of calcium phosphate.",
        steps: ["Calcium has valency 2; phosphate (PO₄) has valency 3.", "Criss-cross: Ca takes 3, PO₄ takes 2."],
        answer: "\\(\\text{Ca}_3(\\text{PO}_4)_2\\)",
      },
      practiceSet: [
        { prompt: "Write the formula of sodium oxide.", answer: "\\(\\text{Na}_2\\text{O}\\)" },
        { prompt: "Write the formula of magnesium chloride.", answer: "\\(\\text{MgCl}_2\\)" },
        { prompt: "Write the formula of aluminium oxide.", answer: "\\(\\text{Al}_2\\text{O}_3\\)" },
        { prompt: "Write the formula of ammonium sulphate.", answer: "\\((\\text{NH}_4)_2\\text{SO}_4\\)" },
      ],
      pyqExampleId: "3609412a-2646-4dd5-bc2a-e5849e2db0f3",
      traps: [
        {
          title: "Writing one of each without checking valency",
          body:
            "Sodium (valency 1) and sulphur in a sulphide (valency 2) do not pair one to one: sodium sulphide is \\(\\text{Na}_2\\text{S}\\). Always balance the totals.",
        },
        {
          title: "Leaving out the brackets",
          body: "Two sulphate groups are written \\((\\text{SO}_4)_2\\), not \\(\\text{SO}_{42}\\). The bracket shows the whole group is doubled.",
        },
      ],
    },
  ],
};
