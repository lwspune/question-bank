import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Mathematics (Part I), Ch. 1 Mathematical Logic. Definitions are the
 * Balbharati text's own, trimmed; every law re-checked by truth table; most-asked
 * years from the 42 board past-paper questions in the bank, 2015-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Mathematical Logic",
  chapterSlug: "mathematical-logic",
  source: "Balbharati Mathematics and Statistics Part I Std XII (Maharashtra State Board), Chapter 1",
  keyPoints: [
    {
      term: "Statement",
      text: "A declarative (assertive) sentence which is either true or false, but not both simultaneously. Its truth value is T or F. Questions, commands, exclamations and open sentences (\"x + 6 = 9\", \"He is tall\") are **not** statements.",
    },
    {
      term: "Simple and compound statements",
      text: "A statement which cannot be split further into two or more statements is simple. A combination of two or more simple statements, joined by connectives (and, or, if ... then, if and only if, not), is compound.",
    },
    {
      term: "Conjunction and disjunction",
      text: "\\(p \\wedge q\\) is true if and only if both \\(p\\) and \\(q\\) are true. \\(p \\vee q\\) is false if and only if both \\(p\\) and \\(q\\) are false.",
    },
    {
      term: "Conditional (implication)",
      text: "\\(p \\rightarrow q\\) is false only if \\(p\\) is true and \\(q\\) is false; otherwise it is true. \\(p\\) is the antecedent, \\(q\\) the consequent. \"p only if q\", \"p is sufficient for q\" and \"q is necessary for p\" all mean \\(p \\rightarrow q\\).",
    },
    {
      term: "Biconditional and negation",
      text: "\\(p \\leftrightarrow q\\) is true if \\(p\\) and \\(q\\) have the same truth values, otherwise false. The negation \\(\\sim p\\) is true when \\(p\\) is false, and false when \\(p\\) is true.",
    },
    {
      term: "Statement pattern and truth table",
      text: "A proper combination of statement letters and connectives is a statement pattern. Its truth table lists its truth value for every combination of truth values of its prime components: \\(2^n\\) rows for \\(n\\) letters.",
    },
    {
      term: "Logical equivalence",
      text: "Two statement patterns are equivalent if their truth tables are identical (the final columns match row by row). We write \\(A \\equiv B\\).",
    },
    {
      term: "Tautology, contradiction, contingency",
      text: "**Tautology** (t): true for all combinations, e.g. \\(p \\vee \\sim p\\). **Contradiction** (c): false for all combinations, e.g. \\(p \\wedge \\sim p\\). **Contingency**: neither, e.g. \\(p \\wedge q\\).",
    },
    {
      term: "Quantifiers",
      text: "\"For all\" (\\(\\forall\\)) is the universal quantifier: true if all objects in the collection satisfy the condition. \"There exists\" (\\(\\exists\\)) is the existential quantifier: true if at least one object satisfies it.",
    },
    {
      term: "Dual",
      text: "Obtained by interchanging \\(\\wedge\\) with \\(\\vee\\) and \\(t\\) with \\(c\\). The letters and \\(\\sim\\) stay as they are. The dual of \\(t \\vee (p \\vee q)\\) is \\(c \\wedge (p \\wedge q)\\).",
    },
    {
      term: "Converse, inverse, contrapositive",
      text: "Of \\(p \\rightarrow q\\): converse \\(q \\rightarrow p\\), inverse \\(\\sim p \\rightarrow \\sim q\\), contrapositive \\(\\sim q \\rightarrow \\sim p\\). Only the contrapositive is equivalent to the original.",
    },
    {
      term: "Switch",
      text: "A two state device used to control the flow of current in a circuit. On (closed) is 1, off (open) is 0. Switches with the same state share a letter (equivalent switches); \\(S\\) and \\(S'\\) have opposite states (complementary), shown as \\(p\\) and \\(\\sim p\\).",
    },
    {
      term: "Series and parallel",
      text: "Switches in **series** correspond to \\(p \\wedge q\\): the lamp glows only when both are on. Switches in **parallel** correspond to \\(p \\vee q\\): the lamp glows when at least one is on.",
    },
  ],
  formulas: [
    { label: "Conditional law", latex: "p \\rightarrow q \\equiv \\sim p \\vee q" },
    {
      label: "Biconditional law",
      latex: "p \\leftrightarrow q \\equiv (p \\rightarrow q) \\wedge (q \\rightarrow p) \\equiv (p \\wedge q) \\vee (\\sim p \\wedge \\sim q)",
    },
    { label: "Contrapositive and converse", latex: "p \\rightarrow q \\equiv \\sim q \\rightarrow \\sim p \\qquad q \\rightarrow p \\equiv \\sim p \\rightarrow \\sim q" },
    { label: "De Morgan's laws", latex: "\\sim(p \\wedge q) \\equiv \\sim p \\vee \\sim q \\qquad \\sim(p \\vee q) \\equiv \\sim p \\wedge \\sim q" },
    { label: "Negation of a conditional", latex: "\\sim(p \\rightarrow q) \\equiv p \\wedge \\sim q" },
    { label: "Negation of a biconditional", latex: "\\sim(p \\leftrightarrow q) \\equiv (p \\wedge \\sim q) \\vee (q \\wedge \\sim p)" },
    { label: "Double negation", latex: "\\sim(\\sim p) \\equiv p" },
    {
      label: "Distributive laws",
      latex: "p \\wedge (q \\vee r) \\equiv (p \\wedge q) \\vee (p \\wedge r) \\qquad p \\vee (q \\wedge r) \\equiv (p \\vee q) \\wedge (p \\vee r)",
    },
    { label: "Identity laws", latex: "p \\wedge t \\equiv p \\quad p \\vee c \\equiv p \\quad p \\vee t \\equiv t \\quad p \\wedge c \\equiv c" },
    { label: "Complement laws", latex: "p \\vee \\sim p \\equiv t \\qquad p \\wedge \\sim p \\equiv c \\qquad \\sim t \\equiv c" },
    { label: "Absorption laws", latex: "p \\vee (p \\wedge q) \\equiv p \\qquad p \\wedge (p \\vee q) \\equiv p" },
    {
      label: "Negation of quantified statements",
      latex: "\\sim(\\forall x,\\ P(x)) \\equiv \\exists x \\text{ such that } \\sim P(x) \\qquad \\sim(\\exists x,\\ P(x)) \\equiv \\forall x,\\ \\sim P(x)",
    },
  ],
  derivations: [
    {
      title: "Using truth table, examine whether a statement pattern is a tautology, a contradiction or a contingency",
      steps: [
        "List the prime components; write all \\(2^n\\) combinations of T and F (4 rows for \\(p, q\\); 8 rows for \\(p, q, r\\)).",
        "Add one column per sub-pattern, inside out (for example \\(p \\rightarrow q\\), then \\((p \\rightarrow q) \\wedge q\\), then the whole pattern).",
        "Last column all T: tautology. All F: contradiction. Both T and F: contingency. State the conclusion in words.",
      ],
    },
    {
      title: "Using truth table, prove that two statement patterns are logically equivalent",
      steps: [
        "Build one truth table with columns for both patterns, over the same rows of the prime components.",
        "Compare the two final columns row by row.",
        "Identical columns: the patterns are equivalent, \\(A \\equiv B\\). Name the column numbers in the conclusion.",
      ],
    },
    {
      title: "Without using truth table, prove an equivalence (algebra of statements)",
      steps: [
        "Start from one side; rewrite \\(\\rightarrow\\) and \\(\\leftrightarrow\\) with the conditional and biconditional laws.",
        "Apply one law per line and name it in brackets: De Morgan, distributive, complement, identity, absorption.",
        "Example: \\((p \\wedge q) \\vee (\\sim p \\wedge q) \\equiv (p \\vee \\sim p) \\wedge q \\equiv t \\wedge q \\equiv q\\).",
        "Then \\(q \\vee (p \\wedge \\sim q) \\equiv (q \\vee p) \\wedge (q \\vee \\sim q) \\equiv (q \\vee p) \\wedge t \\equiv p \\vee q\\).",
      ],
    },
    {
      title: "Write the negation of a compound or quantified statement",
      steps: [
        "Write the statement symbolically with letters \\(p, q, r\\).",
        "Negate with the rules: De Morgan, \\(\\sim(p \\rightarrow q) \\equiv p \\wedge \\sim q\\), \\(\\sim(p \\leftrightarrow q) \\equiv (p \\wedge \\sim q) \\vee (q \\wedge \\sim p)\\).",
        "For a quantified statement, replace \"all\" by \"some\" (\\(\\forall\\) by \\(\\exists\\)) and vice versa, and negate the condition.",
        "Translate back into words.",
      ],
    },
    {
      title: "Write the converse, inverse and contrapositive of a conditional statement",
      steps: [
        "Identify the antecedent \\(p\\) (after if) and the consequent \\(q\\) (after then).",
        "Converse: if \\(q\\) then \\(p\\). Inverse: if \\(\\sim p\\) then \\(\\sim q\\). Contrapositive: if \\(\\sim q\\) then \\(\\sim p\\).",
        "Write each as a full sentence, negating each part correctly (e.g. \\(x < y\\) becomes \\(x \\ge y\\)).",
      ],
    },
    {
      title: "Express a switching circuit in symbolic form, construct its switching table and interpret it",
      steps: [
        "Let \\(p\\): switch \\(S_1\\), \\(q\\): switch \\(S_2\\), \\(r\\): switch \\(S_3\\); a complementary switch \\(S_1'\\) is \\(\\sim p\\).",
        "Series branches give \\(\\wedge\\), parallel branches give \\(\\vee\\); write the expression for the whole circuit.",
        "Switching table: all combinations of 1 and 0 for the switches, a column per sub-expression.",
        "Interpret the last column: all 1, the lamp always glows; all 0, it never glows; otherwise state when it glows.",
      ],
    },
    {
      title: "Construct the switching circuit of a statement pattern",
      steps: [
        "Assign a switch to each letter: \\(p\\) is \\(S_1\\), \\(\\sim p\\) is \\(S_1'\\), and so on.",
        "Each \\(\\wedge\\) is a series connection, each \\(\\vee\\) a parallel connection; build from the innermost brackets.",
        "Draw the network with the lamp L and the battery in one loop, and label every switch.",
      ],
    },
    {
      title: "Simplify a circuit so that the new circuit has minimum switches",
      steps: [
        "Write the logical expression of the given circuit.",
        "Simplify with the laws, naming each (distributive, complement, identity, absorption).",
        "Draw the circuit of the simplified expression; if it reduces to \\(c\\), the lamp will not glow irrespective of the switches.",
      ],
    },
  ],
  diagrams: [
    { title: "Two switches in series", labels: ["switches S1 and S2 one after the other", "lamp L", "battery", "pattern p ∧ q"] },
    { title: "Two switches in parallel", labels: ["switches S1 and S2 on separate branches", "lamp L", "battery", "pattern p ∨ q"] },
  ],
  mostAsked: [
    {
      topic: "Switching circuits: construct one for a statement pattern, or write a given circuit in symbolic form, make its switching table and simplify it",
      years: [2026, 2025, 2024, 2023, 2020, 2019, 2017, 2015],
    },
    {
      topic: "Using truth table, examine whether a statement pattern is a tautology, contradiction or contingency",
      years: [2026, 2024, 2017, 2016, 2015],
    },
    {
      topic: "Prove a logical equivalence, using truth table or without it",
      years: [2025, 2022, 2020, 2018],
    },
    {
      topic: "Converse, inverse and contrapositive of a conditional statement",
      years: [2026, 2025, 2023, 2020, 2018, 2015],
    },
    {
      topic: "Truth values of compound statements, or writing a statement symbolically",
      years: [2024, 2023, 2019],
    },
    {
      topic: "Negation of a compound or quantified statement",
      years: [2025, 2022, 2016],
    },
    { topic: "Write the dual of a statement pattern", years: [2026, 2024] },
    { topic: "Quantifiers: truth value of a statement over a given set", years: [2026, 2025] },
  ],
  mistakes: [
    {
      title: "Writing \\(\\sim p \\rightarrow \\sim q\\) as the negation of \\(p \\rightarrow q\\)",
      body: "That is the inverse, not the negation. The negation of \"if p then q\" is \"p and not q\": \\(\\sim(p \\rightarrow q) \\equiv p \\wedge \\sim q\\).",
    },
    {
      title: "Treating the converse as equivalent to the statement",
      body: "Only the contrapositive \\(\\sim q \\rightarrow \\sim p\\) has the same truth table as \\(p \\rightarrow q\\). The converse is equivalent to the inverse, not to the original.",
    },
    {
      title: "Changing the letters while taking a dual",
      body: "In a dual, swap only \\(\\wedge \\leftrightarrow \\vee\\) and \\(t \\leftrightarrow c\\). Keep \\(p\\), \\(q\\) and every \\(\\sim\\) as they are, and keep the brackets.",
    },
    {
      title: "Mixing up series and parallel",
      body: "Series is \\(\\wedge\\) (both switches needed), parallel is \\(\\vee\\) (either switch is enough). A complementary switch \\(S'\\) is \\(\\sim p\\), not a new letter.",
    },
    {
      title: "Negating only the quantifier",
      body: "The negation of \"\\(\\exists n \\in N\\) such that \\(n + 8 > 11\\)\" is \"\\(\\forall n \\in N,\\ n + 8 \\le 11\\)\": change the quantifier **and** negate the condition.",
    },
    {
      title: "Stopping at the truth table",
      body: "After the table, write the conclusion: tautology, contradiction or contingency, or \"columns ... are identical, hence equivalent\". For a switching table, interpret when the lamp glows.",
    },
  ],
};

export default sheet;
