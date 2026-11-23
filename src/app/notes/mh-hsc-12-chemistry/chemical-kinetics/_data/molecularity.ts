import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_CK_MOLECULARITY_NOTE: SubtopicNote = {
  subtopicName: "Molecularity of Elementary Reactions",
  title: "Elementary Reactions, Molecularity and the Rate Determining Step",
  oneLineDefinition:
    "Elementary and complex reactions, the molecularity of an elementary step, how order differs from molecularity, and how the slowest step of a mechanism fixes the rate law and reveals the reaction intermediate.",
  whyItMatters:
    "9 questions. Three were set in board papers: explain elementary and complex reactions (2017), distinguish between order and molecularity (2025) and define molecularity (2026). The textbook adds two-step mechanisms in which you write the overall reaction, the rate law from the slow step, the intermediate and the molecularity of each step.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccck-elementary-molecularity",
      name: "Elementary reactions and molecularity",
      intuition:
        "Some reactions happen in one go: the molecules meet and the products form in a single step. Others go through a chain of such steps. Molecularity is simply a head count of the reactant molecules in one single step, so it only makes sense for an elementary reaction.",
      definition:
        "- **Elementary reaction:** a reaction that occurs in a single step and cannot be broken down into simpler reactions.\n" +
        "- **Complex reaction:** a reaction made of a series of elementary reactions. The sequence of elementary steps is the **mechanism** of the reaction.\n" +
        "- **Molecularity:** the number of reactant molecules taking part in an elementary reaction. One molecule: **unimolecular**; two molecules: **bimolecular**.\n" +
        "- Molecularity is always a whole number, because it counts molecules.\n" +
        "- For an elementary reaction, the rate law can be written from its equation, so its order and molecularity are often the same; in general they may or may not be the same.",
      table: {
        columns: ["Elementary reaction", "Molecularity", "Rate law and order"],
        rows: [
          { cells: ["\\(\\text{O}_3(\\text{g}) \\to \\text{O}_2(\\text{g}) + \\text{O}(\\text{g})\\)", "One (unimolecular)", "One reactant molecule in the single step"] },
          { cells: ["\\(\\text{C}_2\\text{H}_5\\text{I}(\\text{g}) \\to \\text{C}_2\\text{H}_4(\\text{g}) + \\text{HI}(\\text{g})\\)", "One (unimolecular)", "rate \\(= k[\\text{C}_2\\text{H}_5\\text{I}]\\), first order"] },
          {
            cells: ["\\(\\text{O}_3(\\text{g}) + \\text{O}(\\text{g}) \\to 2\\text{O}_2(\\text{g})\\)", "Two (bimolecular)", "rate \\(= k[\\text{O}_3][\\text{O}]\\), second order"],
            pyqExampleId: "43d3bcaa-59fe-4207-9308-197c11d9069c",
          },
          { cells: ["\\(2\\text{NO}_2(\\text{g}) \\to 2\\text{NO}(\\text{g}) + \\text{O}_2(\\text{g})\\)", "Two (bimolecular)", "rate \\(= k[\\text{NO}_2]^2\\), second order"] },
          {
            cells: ["\\(2\\text{NO}_2\\text{Cl}(\\text{g}) \\to 2\\text{NO}_2(\\text{g}) + \\text{Cl}_2(\\text{g})\\) (complex, two steps)", "Not defined for the overall reaction", "rate \\(= k[\\text{NO}_2\\text{Cl}]\\), first order, set by the slow first step"],
            pyqExampleId: "c85cc646-54d8-4a2c-bec7-d762564a20a1",
            noteAmber: "Board 2017 asked you to explain elementary and complex reactions for a first order reaction: use C₂H₅I as the elementary one and NO₂Cl as the complex one.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "The elementary reaction \\(2\\text{HI}(\\text{g}) \\to \\text{H}_2(\\text{g}) + \\text{I}_2(\\text{g})\\) takes place in one step. State its molecularity and write its rate law.",
        steps: ["Two HI molecules take part in the single step, so it is bimolecular.", "For an elementary reaction the rate law follows the equation: rate \\(= k[\\text{HI}]^2\\)."],
        answer: "Bimolecular; rate = k[HI]², second order",
      },
      practiceSet: [
        { prompt: "Can the molecularity of a reaction be zero or 1.5?", answer: "No. It counts the molecules in an elementary step, so it is always a whole number" },
        { prompt: "What is a complex reaction?", answer: "A reaction that takes place as a series of elementary reactions" },
        { prompt: "What is the molecularity of \\(\\text{O}_3(\\text{g}) \\to \\text{O}_2(\\text{g}) + \\text{O}(\\text{g})\\)?", answer: "One (unimolecular)" },
      ],
      pyqExampleId: "79dd2908-7d42-485c-8a20-2a11a0b2feb5",
      traps: [
        {
          title: "Molecularity of an overall complex reaction",
          body: "Molecularity belongs to one elementary step. For a complex reaction you give the molecularity of each step, not of the overall equation.",
        },
        {
          title: "Leaving 'elementary' out of the definition",
          body: "A full definition says: the number of reactant molecules taking part in an **elementary** reaction. Without that word the definition loses its mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccck-order-vs-molecularity",
      name: "Order and molecularity: the distinction",
      intuition:
        "Order is what the experiment tells you; molecularity is what the proposed single step tells you. They agree for many elementary reactions, but they are different ideas, found in different ways.",
      definition:
        "- **Order:** the sum of the powers of the concentration terms in the experimentally determined rate law.\n" +
        "- **Molecularity:** the number of reactant molecules taking part in an elementary reaction.\n" +
        "- For the elementary reaction \\(2\\text{NO}_2 \\to 2\\text{NO} + \\text{O}_2\\), rate \\(= k[\\text{NO}_2]^2\\): order 2 and molecularity 2.\n" +
        "- In a 'distinguish' answer, write each point as a matched pair: the same feature for order and for molecularity, side by side.",
      table: {
        columns: ["Point of difference", "Order", "Molecularity"],
        rows: [
          { cells: ["How it is found", "Experimentally determined property", "Theoretical entity"] },
          { cells: ["What it is", "Sum of the powers of the concentration terms of the reactants in the rate equation", "Number of reactant molecules taking part in an elementary reaction"] },
          { cells: ["Possible values", "May be an integer, a fraction or zero", "Always an integer"] },
          { cells: ["Applies to", "An overall reaction, simple or complex", "An elementary reaction, or one step of a mechanism"] },
        ],
      },
      practiceSet: [
        { prompt: "Which of the two, order or molecularity, can be fractional?", answer: "Order" },
        { prompt: "The decomposition of NO₂Cl is first order but its equation shows two NO₂Cl molecules. Why is it not bimolecular overall?", answer: "It is a complex reaction; molecularity applies only to each elementary step, and the order comes from the slow step" },
        { prompt: "Which is found by experiment and which is theoretical?", answer: "Order is experimental; molecularity is theoretical" },
      ],
      pyqExampleId: "e5355bb8-b4ca-4539-a1ba-29de56692f46",
      traps: [
        {
          title: "A one-sided 'distinguish' answer",
          body: "Writing three facts about order and then three facts about molecularity, unmatched, loses marks. Each row of a distinction table must compare the same feature for both.",
        },
        {
          title: "Saying order always equals molecularity",
          body: "Order and molecularity may or may not be the same. They coincide for many elementary reactions; for a complex reaction molecularity is not even defined for the overall equation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccck-rate-determining-step",
      name: "Rate determining step and reaction intermediate",
      intuition:
        "A queue moves at the pace of its slowest counter. In a mechanism, the slowest step is that counter: however fast the other steps are, products cannot appear faster than this step allows. So the rate law of the whole reaction is the rate law of its slow step.",
      definition:
        "- **Rate determining step:** in a complex reaction, the slowest elementary step. It determines the rate of the overall reaction.\n" +
        "- Because the slow step is elementary, its rate law is written from its own equation, and this is the rate law of the overall reaction.\n" +
        "- **Reaction intermediate:** a species formed in one step and consumed in a later step. It does not appear in the overall equation, and its concentration does not appear in the rate law.\n" +
        "- **Method for a two-step mechanism:**\n" +
        "- Add the steps and cancel any species that appears on both sides: this gives the overall reaction.\n" +
        "- The species cancelled (formed in one step, used in the next) is the intermediate.\n" +
        "- Write the rate law from the reactants of the slow step.\n" +
        "- Count the reactant molecules in each step for its molecularity.\n" +
        "- Book example: \\(\\text{NO}_2\\text{Cl} \\to \\text{NO}_2 + \\text{Cl}\\) (slow), then \\(\\text{NO}_2\\text{Cl} + \\text{Cl} \\to \\text{NO}_2 + \\text{Cl}_2\\) (fast). Overall \\(2\\text{NO}_2\\text{Cl} \\to 2\\text{NO}_2 + \\text{Cl}_2\\); rate \\(= k[\\text{NO}_2\\text{Cl}]\\), first order; Cl is the intermediate.",
      formula: {
        label: "Rate law of a complex reaction",
        latex: "\\text{rate (overall)} = \\text{rate law of the slowest step}",
      },
      authoredExample: {
        prompt:
          "A reaction takes place in two steps: (i) \\(\\text{NO}(\\text{g}) + \\text{Br}_2(\\text{g}) \\to \\text{NOBr}_2(\\text{g})\\) (slow); (ii) \\(\\text{NOBr}_2(\\text{g}) + \\text{NO}(\\text{g}) \\to 2\\text{NOBr}(\\text{g})\\) (fast). Write the overall reaction, the rate law and the intermediate, and give the molecularity of each step.",
        steps: [
          "Adding the steps: \\(\\text{NO} + \\text{Br}_2 + \\text{NOBr}_2 + \\text{NO} \\to \\text{NOBr}_2 + 2\\text{NOBr}\\). Cancelling NOBr₂: \\(2\\text{NO}(\\text{g}) + \\text{Br}_2(\\text{g}) \\to 2\\text{NOBr}(\\text{g})\\).",
          "Step (i) is slow, so it is the rate determining step: rate \\(= k[\\text{NO}][\\text{Br}_2]\\), second order.",
          "NOBr₂ is formed in step (i) and consumed in step (ii): it is the reaction intermediate.",
          "Step (i) has two reactant molecules (NO and Br₂) and step (ii) has two (NOBr₂ and NO): both are bimolecular.",
        ],
        answer: "2NO + Br₂ → 2NOBr; rate = k[NO][Br₂]; intermediate NOBr₂; both steps bimolecular",
      },
      selfCheckExample: {
        prompt: "A reaction occurs in two steps: (i) \\(\\text{A} + \\text{B} \\to \\text{C}\\) (slow); (ii) \\(\\text{C} + \\text{A} \\to \\text{D}\\) (fast). Write the overall reaction, the rate law and the intermediate.",
        steps: ["Adding and cancelling C: \\(2\\text{A} + \\text{B} \\to \\text{D}\\).", "Slow step (i): rate \\(= k[\\text{A}][\\text{B}]\\).", "C is formed in (i) and used in (ii): it is the intermediate."],
        answer: "2A + B → D; rate = k[A][B]; intermediate C",
      },
      practiceSet: [
        { prompt: "A complex reaction takes place as (i) \\(\\text{NO} + \\text{O}_3 \\to \\text{NO}_3 + \\text{O}\\) and (ii) \\(\\text{NO}_3 + \\text{O} \\to \\text{NO}_2 + \\text{O}_2\\). The rate law is rate \\(= k[\\text{NO}][\\text{O}_3]\\). Which is the rate determining step?", answer: "Step (i), because the rate law matches its reactants" },
        { prompt: "For the same two steps, write the overall reaction and name the intermediates.", answer: "\\(\\text{NO} + \\text{O}_3 \\to \\text{NO}_2 + \\text{O}_2\\); NO₃ and O are formed in step (i) and used in step (ii)" },
        { prompt: "Does the concentration of a reaction intermediate appear in the rate law?", answer: "No" },
      ],
      pyqExampleId: "4468c309-e290-40c2-92e3-d24220c75dc4",
      traps: [
        {
          title: "Rate law from the overall equation",
          body: "\\(2\\text{NO}_2\\text{Cl} \\to 2\\text{NO}_2 + \\text{Cl}_2\\) is first order, not second. Write the rate law from the slow step, never from the overall coefficients.",
        },
        {
          title: "Naming a product as the intermediate",
          body: "A product of the overall reaction stays in the final equation. The intermediate is the species that is formed and then used up, so it cancels when the steps are added.",
        },
        {
          title: "Rate law taken from the fast step",
          body: "Check which step is marked slow before writing the rate law. Using the fast step gives a rate law containing the intermediate, which a rate law never does.",
        },
      ],
    },
  ],
};
