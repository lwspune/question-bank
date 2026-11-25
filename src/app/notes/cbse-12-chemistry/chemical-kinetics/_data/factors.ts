import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_CK_FACTORS_NOTE: SubtopicNote = {
  subtopicName: "Factors Influencing Rate of a Reaction",
  title: "Rate Law, Order, Rate Constant and Molecularity",
  oneLineDefinition:
    "How the rate depends on concentration through the rate law, the order of a reaction and how to find it from data, the rate constant and its units, what a catalyst changes, and how molecularity differs from order.",
  whyItMatters:
    "81 questions, sixty-eight of them from board papers, more than any other page of the chapter. Every year from 2022 to 2026 the board links a change in concentration to a change in rate, either the new rate for a given order or the order from the change, and it asks the overall order of a rate law with fractional powers (2022, 2023, 2026). It sets order from 'the rate rises sixteen times when the concentration rises four times' (2023, 2024), orders and the rate constant from a table of initial rates (two in 2023, 2024, two in 2025), the units of k and the order read from units (three in 2025), and what a catalyst changes (2023, two in 2024, 2025). The heaviest topic is order against molecularity: definitions and differences every year, a mechanism with a slow step (2024, 2026), and thirteen assertion-reason items from 2023 to 2026, seven of them in 2026. The textbook adds rate laws, orders and units of k from its examples and exercises.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcck-rate-law",
      name: "Rate law and order of a reaction",
      intuition:
        "The rate law says how sensitive the rate is to each concentration. If a reactant enters to the power 2, doubling its concentration makes the reaction four times faster; if it enters to the power 0, its concentration does not matter at all. These powers are found by experiment, not read from the balanced equation, because most reactions do not happen in one step.",
      definition:
        "- **Rate law (rate expression):** for \\(a\\text{A} + b\\text{B} \\rightarrow c\\text{C} + d\\text{D}\\), rate \\(= k[\\text{A}]^x[\\text{B}]^y\\). In differential form, \\(-\\dfrac{d[\\text{R}]}{dt} = k[\\text{A}]^x[\\text{B}]^y\\).\n" +
        "- The powers x and y **may or may not equal** the coefficients a and b. They are found experimentally. Book example:\\(\\text{CHCl}_3 + \\text{Cl}_2 \\rightarrow \\text{CCl}_4 + \\text{HCl}\\) has rate \\(= k[\\text{CHCl}_3][\\text{Cl}_2]^{1/2}\\).\n" +
        "- **Order:** the sum of the powers of the concentrations in the rate law, \\(x + y\\). x is the order with respect to A, y with respect to B.\n" +
        "- Order can be 0, 1, 2, 3 or even a fraction. **Zero order** means the rate does not depend on the concentration of the reactants.\n" +
        "- **Changing a concentration:** if \\([\\text{A}]\\) is multiplied by m, the rate is multiplied by \\(m^x\\). If every concentration is multiplied by m (for example the volume is cut to \\(1/m\\)), the rate is multiplied by \\(m^{x+y}\\). The order itself does not change.\n" +
        "- When a reaction is stated to take place **in one step** (elementary), its rate law uses the coefficients as powers.\n" +
        "- If one reactant is taken in large excess, its concentration hardly changes and the observed order drops (pseudo first order, taught on the Integrated Rate Equations page).\n" +
        "- Board 2023 asked the order of the photochemical reaction of H₂ with Cl₂ (zero). The present NCERT book does not teach photochemical reactions, so give it little time.",
      formula: {
        label: "Rate law and order",
        latex: "\\text{rate} = k[\\text{A}]^x[\\text{B}]^y, \\qquad \\text{order} = x + y, \\qquad \\frac{r_2}{r_1} = \\left(\\frac{[\\text{A}]_2}{[\\text{A}]_1}\\right)^{x}\\left(\\frac{[\\text{B}]_2}{[\\text{B}]_1}\\right)^{y}",
      },
      authoredExample: {
        prompt:
          "For a reaction the rate law is rate \\(= k[\\text{A}]^2[\\text{B}]\\). (a) Write the order with respect to A, to B, and the overall order. (b) How does the rate change if \\([\\text{A}]\\) is halved and \\([\\text{B}]\\) is made four times? (c) How does it change if only \\([\\text{A}]\\) is made 1.5 times?",
        steps: [
          "(a) Order with respect to A = 2, with respect to B = 1; overall order = 2 + 1 = 3.",
          "(b) \\(\\dfrac{r_2}{r_1} = \\left(\\dfrac{1}{2}\\right)^2 \\times 4^1 = \\dfrac{1}{4} \\times 4 = 1\\).",
          "So the rate does not change.",
          "(c) \\(\\dfrac{r_2}{r_1} = (1.5)^2 = 2.25\\), so the rate becomes 2.25 times.",
        ],
        answer: "(a) 2, 1, overall 3; (b) the rate is unchanged; (c) 2.25 times",
      },
      selfCheckExample: {
        prompt:
          "When the concentration of the only reactant is made 16 times, the rate of a reaction becomes 4 times. Find the order of the reaction.",
        steps: ["\\(4 = 16^{\\,n}\\).", "Since \\(16^{1/2} = 4\\), \\(n = \\dfrac{1}{2}\\)."],
        answer: "Order = 1/2",
      },
      practiceSet: [
        { prompt: "Find the overall order for rate \\(= k[\\text{P}]^2[\\text{Q}]^{-1}\\).", answer: "\\(2 + (-1) = 1\\)" },
        { prompt: "A reaction is second order in A. How does the rate change when \\([\\text{A}]\\) is reduced to one third?", answer: "It becomes \\(\\dfrac{1}{9}\\) of the original" },
        { prompt: "Can the order of a reaction be found from its balanced chemical equation alone?", answer: "No. Order is found experimentally (unless the reaction is known to take place in one step)" },
        { prompt: "For rate \\(= k[\\text{A}][\\text{B}]\\), the volume of the vessel is halved at the same temperature. How do the rate and the order change?", answer: "Both concentrations double, so the rate becomes 4 times; the order stays 2" },
      ],
      pyqExampleId: "c9d5eaa9-0833-4edf-8f9e-6dcb9ca79846",
      traps: [
        {
          title: "Using the coefficients as the powers",
          body: "For \\(\\text{A} + 2\\text{B} \\rightarrow\\) products, the order is not 3 just because the coefficients add to 3. Read the powers from the rate law given in the question. An MCQ option built on the coefficients is always there.",
        },
        {
          title: "Changing one factor and forgetting the other",
          body: "When two concentrations change together, raise each factor to its own power and multiply. Squaring only the reactant you noticed first gives a wrong ratio.",
        },
        {
          title: "Thinking the order changes with concentration",
          body: "Compressing a gas or adding more reactant changes the rate, not the order and not k. The board asks this as the second half of a two-mark question.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcck-initial-rates",
      name: "Order and rate constant from initial rate data",
      intuition:
        "To find how the rate depends on one reactant, change only that reactant and watch the rate. Pick two experiments in which the other concentration stays the same; the ratio of the rates then tells you the power of the one that changed.",
      definition:
        "- Write the rate law with unknown powers: rate \\(= k[\\text{A}]^x[\\text{B}]^y\\).\n" +
        "- **Order in A:** pick two experiments with the same \\([\\text{B}]\\). Then \\(\\dfrac{r_2}{r_1} = \\left(\\dfrac{[\\text{A}]_2}{[\\text{A}]_1}\\right)^{x}\\).\n" +
        "- **Order in B:** pick two experiments with the same \\([\\text{A}]\\) and do the same.\n" +
        "- If no pair keeps one concentration fixed, divide out the part you already know.\n" +
        "- A rate that does not change when a concentration changes means that reactant enters to the power **zero**.\n" +
        "- **Rate constant:** put any one experiment into the rate law and solve for k. Give its unit, which depends on the overall order.\n" +
        "- Book example (Table 3.2), \\(2\\text{NO} + \\text{O}_2 \\rightarrow 2\\text{NO}_2\\): rate \\(= k[\\text{NO}]^2[\\text{O}_2]\\).",
      formula: {
        label: "Order from two experiments",
        latex: "\\frac{r_2}{r_1} = \\left(\\frac{[\\text{A}]_2}{[\\text{A}]_1}\\right)^{x} \\quad (\\text{other concentrations fixed})",
      },
      authoredExample: {
        prompt:
          "For \\(2\\text{NO(g)} + \\text{O}_2(\\text{g}) \\rightarrow 2\\text{NO}_2(\\text{g})\\), the initial rates of formation of NO₂ are: experiment 1, [NO] = 0.30 and [O₂] = 0.30 mol L⁻¹, rate 0.096 mol L⁻¹ s⁻¹; experiment 2, [NO] = 0.60, [O₂] = 0.30, rate 0.384; experiment 3, [NO] = 0.30, [O₂] = 0.60, rate 0.192. Find the rate law and the rate constant.",
        steps: [
          "Let rate \\(= k[\\text{NO}]^x[\\text{O}_2]^y\\).",
          "Experiments 1 and 2 ([O₂] fixed): \\(\\dfrac{0.384}{0.096} = 4 = 2^x\\), so \\(x = 2\\).",
          "Experiments 1 and 3 ([NO] fixed): \\(\\dfrac{0.192}{0.096} = 2 = 2^y\\), so \\(y = 1\\).",
          "Rate law: rate \\(= k[\\text{NO}]^2[\\text{O}_2]\\), overall order 3.",
          "From experiment 1: \\(k = \\dfrac{0.096}{(0.30)^2(0.30)} = \\dfrac{0.096}{0.027} = 3.56\\) mol⁻² L² s⁻¹.",
        ],
        answer: "Rate = k[NO]²[O₂]; k = 3.56 mol⁻² L² s⁻¹",
      },
      selfCheckExample: {
        prompt:
          "For A + B → products: with [B] fixed, raising [A] from 0.10 to 0.20 mol L⁻¹ raises the rate from 2.0 × 10⁻³ to 8.0 × 10⁻³ mol L⁻¹ s⁻¹. With [A] fixed, doubling [B] leaves the rate unchanged. Write the rate law.",
        steps: ["\\(\\dfrac{8.0 \\times 10^{-3}}{2.0 \\times 10^{-3}} = 4 = 2^x\\), so \\(x = 2\\).", "The rate does not change with [B], so \\(y = 0\\)."],
        answer: "Rate = k[A]²",
      },
      practiceSet: [
        { prompt: "Doubling [A] with [B] fixed makes the rate 2.83 times. What is the order with respect to A?", answer: "1.5, since \\(2^{1.5} = 2.83\\)" },
        { prompt: "What is the unit of k for a reaction whose overall order is 3?", answer: "mol⁻² L² s⁻¹" },
        { prompt: "In two experiments [A] doubles and [B] doubles, and the rate rises 8 times. The reaction is first order in A. What is the order in B?", answer: "2, since \\(2 \\times 2^y = 8\\)" },
      ],
      pyqExampleId: "42197634-33ca-402e-bad0-ec2b123c1879",
      traps: [
        {
          title: "Comparing two experiments where both concentrations change",
          body: "Choose a pair in which only one concentration changes. If you must use a pair where both change, divide out the effect of the reactant whose order you already know.",
        },
        {
          title: "Rate constant without its unit",
          body: "The value of k carries marks only with its unit, and the unit comes from the overall order: mol⁻² L² s⁻¹ for third order, L mol⁻¹ s⁻¹ for second order.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcck-rate-constant",
      name: "The rate constant: its units and what changes it",
      intuition:
        "The rate constant k is the part of the rate law that does not depend on how much reactant you have. Add more reactant and the rate goes up, but k stays the same. Only a change of temperature, or a catalyst that opens an easier path, changes k.",
      definition:
        "- **Rate constant k:** the proportionality constant in the rate law. It equals the rate when every concentration is 1 mol L⁻¹.\n" +
        "- **Units of k** for order n: \\(k = \\dfrac{\\text{rate}}{[\\text{A}]^n}\\), so the unit is \\((\\text{mol L}^{-1})^{1-n}\\ \\text{s}^{-1}\\).\n" +
        "- Zero order: mol L⁻¹ s⁻¹ (the same as the rate). First order: s⁻¹. Second order: mol⁻¹ L s⁻¹ (written L mol⁻¹ s⁻¹ too).\n" +
        "- So the unit of k tells you the order, and the rate and k have the same unit only for a zero order reaction.\n" +
        "- **Factors that affect the rate:** concentration of reactants (pressure for gases), temperature and a catalyst. Concentration changes the rate but **not k**; temperature and a catalyst change k.\n" +
        "- **Catalyst:** increases the rate without itself undergoing any permanent chemical change, by giving an alternate path of **lower activation energy**. It does not change ΔG of the reaction or the equilibrium constant. It speeds the forward and backward reactions to the same extent, so equilibrium is reached sooner. It catalyses spontaneous reactions only. A substance that slows a reaction is an inhibitor, not a catalyst.",
      formula: {
        label: "Units of the rate constant for order n",
        latex: "k = \\frac{\\text{rate}}{[\\text{A}]^n} \\;\\Rightarrow\\; \\text{unit of } k = (\\text{mol L}^{-1})^{1-n}\\,\\text{s}^{-1}",
      },
      authoredExample: {
        prompt:
          "(a) Work out the unit of the rate constant for a third order reaction, with concentration in mol L⁻¹ and time in s. (b) A gas reaction is followed by pressure in atm, so its rate is in atm s⁻¹. Work out the unit of k if the reaction is second order.",
        steps: [
          "(a) \\(k = \\dfrac{\\text{rate}}{[\\text{A}]^3} = \\dfrac{\\text{mol L}^{-1}\\,\\text{s}^{-1}}{(\\text{mol L}^{-1})^3}\\).",
          "\\(= (\\text{mol L}^{-1})^{-2}\\,\\text{s}^{-1} = \\text{mol}^{-2}\\,\\text{L}^{2}\\,\\text{s}^{-1}\\).",
          "(b) \\(k = \\dfrac{\\text{rate}}{p^2} = \\dfrac{\\text{atm s}^{-1}}{\\text{atm}^2} = \\text{atm}^{-1}\\,\\text{s}^{-1}\\).",
        ],
        answer: "(a) mol⁻² L² s⁻¹; (b) atm⁻¹ s⁻¹",
      },
      selfCheckExample: {
        prompt:
          "A first order reaction has a rate of 2.0 × 10⁻⁴ mol L⁻¹ s⁻¹ when the concentration of the reactant is 0.25 mol L⁻¹. Find k with its unit.",
        steps: ["Rate = k[A], so \\(k = \\dfrac{2.0 \\times 10^{-4}}{0.25}\\).", "\\(k = 8.0 \\times 10^{-4}\\ \\text{s}^{-1}\\)."],
        answer: "8.0 × 10⁻⁴ s⁻¹",
      },
      practiceSet: [
        { prompt: "Write the unit of k for a zero order reaction and for a first order reaction.", answer: "mol L⁻¹ s⁻¹ and s⁻¹" },
        { prompt: "More of one reactant is added to a reaction vessel at the same temperature. What happens to the rate and to k?", answer: "The rate increases; k stays the same" },
        { prompt: "Which of these does a catalyst change: ΔG, the equilibrium constant, the activation energy?", answer: "Only the activation energy" },
        { prompt: "Name the three factors the book lists as influencing the rate of a reaction.", answer: "Concentration of reactants (pressure for gases), temperature, and a catalyst" },
      ],
      pyqExampleId: "7b1c31a2-1db4-4634-8d96-60ebe10ae62c",
      traps: [
        {
          title: "Saying k rises when more reactant is added",
          body: "Concentration moves the rate; it does not move k. At a fixed temperature k is fixed, and only a catalyst can change it there.",
        },
        {
          title: "Saying a catalyst changes ΔH, ΔG or K",
          body: "A catalyst lowers the activation energy and nothing else. ΔH, ΔG and the equilibrium constant depend only on the reactants and products, so they stay the same.",
        },
        {
          title: "Two ways of writing one unit",
          body: "L mol⁻¹ s⁻¹ and mol⁻¹ L s⁻¹ are the same unit, both second order. Do not reject an MCQ option because the symbols are written in another order.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcck-molecularity",
      name: "Molecularity, order and the slowest step",
      intuition:
        "A balanced equation shows only where a reaction starts and ends. Most reactions go there in several small steps, like a relay team whose speed is set by its slowest runner. Molecularity counts the molecules that meet in one step; order is what the experiment measures for the whole reaction, and it comes from the slowest step.",
      definition:
        "- **Elementary reaction:** takes place in one step. **Complex reaction:** takes place through a sequence of elementary steps (its mechanism).\n" +
        "- **Molecularity:** the number of reacting species (atoms, ions or molecules) taking part in an elementary reaction, which must collide simultaneously to bring about the reaction.\n" +
        "- Unimolecular: \\(\\text{NH}_4\\text{NO}_2 \\rightarrow \\text{N}_2 + 2\\text{H}_2\\text{O}\\). Bimolecular: \\(2\\text{HI} \\rightarrow \\text{H}_2 + \\text{I}_2\\). Termolecular: \\(2\\text{NO} + \\text{O}_2 \\rightarrow 2\\text{NO}_2\\). Three molecules colliding at once is rare, so molecularity three is rare and slow.\n" +
        "- **Rate determining step:** the slowest step of a mechanism. It controls the overall rate, so the rate law and the order come from it.\n" +
        "- Book example: \\(2\\text{H}_2\\text{O}_2 \\xrightarrow{\\text{I}^-,\\ \\text{alkaline medium}} 2\\text{H}_2\\text{O} + \\text{O}_2\\). Step 1 (slow): \\(\\text{H}_2\\text{O}_2 + \\text{I}^- \\rightarrow \\text{H}_2\\text{O} + \\text{IO}^-\\). Step 2 (fast): \\(\\text{H}_2\\text{O}_2 + \\text{IO}^- \\rightarrow \\text{H}_2\\text{O} + \\text{I}^- + \\text{O}_2\\). Rate \\(= k[\\text{H}_2\\text{O}_2][\\text{I}^-]\\); both steps are bimolecular; IO⁻ is an intermediate.\n" +
        "- For an elementary reaction, order and molecularity are the same. A fractional order shows the reaction cannot be elementary.\n" +
        "- **Assertion-reason codes** in these papers: (A) both true and R explains A; (B) both true but R does not explain A; (C) A true, R false; (D) A false, R true.",
      table: {
        columns: ["Point", "Order", "Molecularity"],
        rows: [
          { cells: ["What it is", "Sum of the powers of the concentrations in the rate law", "Number of species colliding simultaneously in an elementary reaction"] },
          { cells: ["How it is found", "Experimentally, from the measured rate law", "From the elementary step itself, so it is a theoretical number"] },
          {
            cells: ["Values", "0, 1, 2, 3 or even a fraction", "Only 1, 2 or 3; never zero or a fraction"],
            noteAmber: "Board 2025 and 2026 MCQs ask which statement about molecularity is false or correct.",
            pyqExampleId: "2b180cd7-9952-45ef-a997-3532cefed6c8",
          },
          { cells: ["Applies to", "Elementary and complex reactions", "Elementary reactions only; no meaning for a complex reaction"] },
          { cells: ["For a complex reaction", "Given by the slowest step", "Of the slowest step equals the order of the overall reaction"] },
          {
            cells: ["H₂O₂ with I⁻ catalyst", "Rate = k[H₂O₂][I⁻], order 2", "Each step is bimolecular, molecularity 2"],
            noteAmber: "Board 2026 printed this mechanism and asked the rate law, the orders and the molecularity of step II.",
            pyqExampleId: "dec516d6-0744-45fb-8dd7-37d6c197c90f",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "The reaction \\(2\\text{NO}_2 + \\text{F}_2 \\rightarrow 2\\text{NO}_2\\text{F}\\) goes in two steps: \\(\\text{NO}_2 + \\text{F}_2 \\rightarrow \\text{NO}_2\\text{F} + \\text{F}\\) (slow), then \\(\\text{NO}_2 + \\text{F} \\rightarrow \\text{NO}_2\\text{F}\\) (fast). Write the rate law, the overall order and the molecularity of the slow step.",
        steps: ["The slow step decides the rate: rate \\(= k[\\text{NO}_2][\\text{F}_2]\\).", "Overall order = 1 + 1 = 2. The slow step has two colliding species, so its molecularity is 2."],
        answer: "Rate = k[NO₂][F₂]; order 2; molecularity of the slow step 2",
      },
      practiceSet: [
        { prompt: "What is the molecularity of \\(\\text{NH}_4\\text{NO}_2 \\rightarrow \\text{N}_2 + 2\\text{H}_2\\text{O}\\)?", answer: "1 (unimolecular)" },
        { prompt: "Rate \\(= k[\\text{A}][\\text{B}]^{1/2}\\). Can this reaction be elementary?", answer: "No. Its order is 1.5, and an elementary reaction has order equal to its molecularity, a whole number" },
        { prompt: "Which step of a mechanism decides the order of a complex reaction?", answer: "The slowest step (rate determining step)" },
        { prompt: "\\(\\text{KClO}_3 + 6\\text{FeSO}_4 + 3\\text{H}_2\\text{SO}_4 \\rightarrow\\) products looks tenth order. What is its actual order and what does that show?", answer: "Second order; it takes place in several steps" },
      ],
      pyqExampleId: "a227564e-b6b0-4cc7-b0c5-66bbd545f66f",
      traps: [
        {
          title: "Saying molecularity is found by experiment",
          body: "Order is the experimental quantity. Molecularity is a count of colliding species in one elementary step. The board has set this swap as an assertion more than once.",
        },
        {
          title: "Taking the order from the fast step",
          body: "A fast step that follows the slow one cannot speed up the whole reaction. The rate law comes from the slowest step.",
        },
        {
          title: "A difference that covers one side only",
          body: "In 'write two differences', give both sides of each point: what order is and what molecularity is. A sentence about order alone earns half the mark.",
        },
        {
          title: "Reading the assertion-reason code",
          body: "In these papers code (D) is 'A false, R true'. When the assertion is false, check whether the reason is true before choosing (D); when both are true, ask whether the reason actually explains the assertion before choosing (A) over (B).",
        },
      ],
    },
  ],
};
