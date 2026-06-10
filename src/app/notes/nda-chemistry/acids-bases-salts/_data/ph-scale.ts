import type { SubtopicNote } from "@/app/notes/_types";

export const PH_SCALE_NOTE: SubtopicNote = {
  subtopicName: "pH Scale and Common Substances",
  title: "The pH Scale and Common Substances",
  oneLineDefinition:
    "What pH measures (hydrogen-ion concentration), the 0–14 range, and the pH values of everyday solutions — from gastric juice to milk of magnesia.",
  whyItMatters:
    "Eight PYQs, split between two ideas: how the pH scale works (lower pH = more H+ = more acidic) and the memorised pH values of common substances. " +
    "The single most-tested trap is the inverse relationship — higher H+ means LOWER pH, not higher.",
  concepts: [
    // pH definition and the inverse relationship (formula variant)
    {
      kind: "formula" as const,
      slug: "ph-definition",
      name: "What the pH scale measures",
      intuition:
        "pH is a number from 0 to 14 that says how acidic or basic a solution is. The key relationship is inverse: the more hydrogen ions (H+) a solution has, the LOWER its pH. Below 7 is acidic, exactly 7 is neutral, above 7 is basic.",
      definition:
        "The pH scale, defined:\n" +
        "- **pH** measures the **hydrogen-ion (H+) concentration** of a solution; the 'p' stands for the German 'potenz' (power).\n" +
        "- The scale runs from **0 to 14**: **pH < 7 acidic**, **pH = 7 neutral**, **pH > 7 basic (alkaline)**.\n" +
        "- The relationship is **inverse** — the **higher** the H+ concentration, the **lower** the pH.\n" +
        "- pH is defined as the negative logarithm (base 10) of the H+ concentration.",
      formula: {
        label: "Definition of pH",
        latex: "\\text{pH} = -\\log_{10}[\\text{H}^{+}]",
        symbols: [
          { symbol: "[\\text{H}^{+}]", meaning: "hydrogen-ion concentration (mol/L)" },
        ],
      },
      pyqExampleId: "75928834-14aa-432f-8b70-8fdcbc4a5b1a", // higher H+ -> higher pH is NOT correct
      authoredExample: {
        prompt: "Solution X has a higher hydrogen-ion concentration than solution Y. Which has the lower pH, and which is more acidic?",
        steps: [
          "pH falls as H+ concentration rises (the relationship is inverse).",
          "Solution X has more H+, so it has the lower pH.",
          "Lower pH means more acidic.",
        ],
        answer: "Solution X has the lower pH and is the more acidic of the two.",
      },
      practiceSet: [
        { prompt: "A solution of pH 3 — is it acidic, neutral or basic?", answer: "Acidic", method: "pH below 7 is acidic" },
        { prompt: "If hydrogen-ion concentration increases, does pH rise or fall?", answer: "Falls (inverse relationship)" },
        { prompt: "What is the pH of a neutral solution?", answer: "7" },
        { prompt: "What does the 'p' in pH stand for?", answer: "Potenz (German for 'power')" },
        { prompt: "What is the range of the pH scale?", answer: "0 to 14" },
      ],
      traps: [
        {
          title: "Higher H+ means LOWER pH",
          body:
            "The statement 'the higher the hydrogen-ion concentration, the higher its pH' is **NOT correct** — it is the **inverse**. More H+ means a **lower** pH and a more acidic solution.",
        },
      ],
    },

    // pH of common substances (reference)
    {
      kind: "reference" as const,
      slug: "ph-of-common-substances",
      name: "pH values of common substances",
      intuition:
        "The bank asks you to recall or rank the pH of everyday solutions. Gastric juice is strongly acidic (about pH 1.5), pure water is 7, milk of magnesia is basic (about pH 10). Learn the landmarks.",
      definition:
        "The pH landmarks the bank tests:\n" +
        "- **Gastric juice** ≈ **1.5–2** — strongly acidic; the **highest H+ concentration** of common body/household fluids.\n" +
        "- **Lemon juice** ≈ 2–3; **vinegar** ≈ 3 — acidic.\n" +
        "- **Pure water** = **7** — neutral.\n" +
        "- **Human blood / body** works in the narrow range **7.0–7.8** (slightly basic).\n" +
        "- **Milk of magnesia** ≈ **10** — basic (an antacid).\n" +
        "- **Sodium hydroxide solution** ≈ 13–14 — strongly basic.\n" +
        "- **Acid rain** is rain with **pH below 5.6** (normal rain is about 5.6 due to dissolved CO2).",
      table: {
        columns: ["Substance", "Approx. pH", "Nature"],
        rows: [
          {
            cells: ["Gastric juice", "1.5–2", "Strongly acidic — highest H+"],
            noteAmber: "Gastric juice has the lowest pH and therefore the highest H+ concentration of the common options.",
          },
          { cells: ["Lemon juice", "2–3", "Acidic"] },
          { cells: ["Pure water", "7", "Neutral"] },
          {
            cells: ["Human body / blood", "7.0–7.8", "Slightly basic (narrow range)"],
            noteAmber: "The human body operates in the pH range 7.0–7.8 — the bank's answer.",
          },
          {
            cells: ["Milk of magnesia", "10", "Basic (antacid)"],
            noteAmber: "Milk of magnesia (magnesium hydroxide) has pH about 10.",
          },
          { cells: ["Sodium hydroxide solution", "13–14", "Strongly basic"] },
          {
            cells: ["Acid rain", "below 5.6", "Acidic — rain turns acidic below pH 5.6"],
            noteAmber: "For rain to be called 'acid rain', its pH must fall below 5.6.",
          },
        ],
      },
      pyqExampleId: "8685553b-32ee-4e1a-9b30-0931ddbff6c0", // gastric juice = highest H+
      selfCheckExample: {
        prompt: "Among sodium hydroxide solution, milk of magnesia, lemon juice and gastric juice, which gives the highest amount of hydrogen ions?",
        steps: [
          "Highest H+ means lowest pH.",
          "Gastric juice (pH ~1.5) is the most acidic of the four.",
          "NaOH solution and milk of magnesia are basic (high pH, low H+); lemon juice is acidic but less so than gastric juice.",
        ],
        answer: "Gastric juice — it has the lowest pH and therefore the highest H+ concentration.",
      },
      practiceSet: [
        { prompt: "Which gives the highest H+ concentration: NaOH solution, milk of magnesia, lemon juice or gastric juice?", answer: "Gastric juice" },
        { prompt: "Approximate pH of milk of magnesia?", answer: "10" },
        { prompt: "The human body works in which pH range?", answer: "7.0 to 7.8" },
        { prompt: "Below what pH is rain called acid rain?", answer: "5.6" },
        { prompt: "Approximate pH of pure water?", answer: "7" },
      ],
      traps: [
        {
          title: "Acid rain threshold is pH 5.6, not 7",
          body:
            "Normal rain is already slightly acidic (about pH 5.6) from dissolved CO2. Rain is only called **acid rain when its pH falls BELOW 5.6** — not below 7.",
        },
      ],
    },

    // indicators: pH of household items, turmeric, toothpaste (reference)
    {
      kind: "reference" as const,
      slug: "indicators-and-household-ph",
      name: "Indicators and the acid-base nature of household items",
      intuition:
        "Some natural dyes change colour with pH — turmeric is the classic. The bank also asks whether everyday items are acidic or basic: toothpaste is basic (to neutralise mouth acid), and a salt like FeCl3 makes an acidic solution by hydrolysis.",
      definition:
        "Indicator and household-pH facts:\n" +
        "- **Turmeric** is a natural indicator: **yellow** in neutral/acidic, **reddish-brown** in alkaline (soap). A turmeric stain scrubbed with soap then washed runs **yellow → reddish-brown → yellow**.\n" +
        "- **Toothpaste is basic** — it neutralises the acid produced by mouth bacteria.\n" +
        "- **FeCl3** in water gives a solution with **pH < 7 (acidic)** — it is the salt of a strong acid (HCl) and a weak base (Fe(OH)3), so it hydrolyses to give an acidic solution.\n" +
        "- Neutral salts like **NaCl** and **KCl** give pH ≈ 7; **NaOH** gives a basic solution.",
      table: {
        columns: ["Item / indicator", "Behaviour"],
        rows: [
          {
            cells: ["Turmeric stain + soap then water", "Yellow → reddish-brown → yellow"],
            noteAmber: "Turmeric goes reddish-brown in alkaline soap and back to yellow when the soap is washed away.",
          },
          { cells: ["Toothpaste", "Basic (neutralises mouth acid)"] },
          {
            cells: ["FeCl3 solution", "pH < 7 (acidic, by hydrolysis)"],
            noteAmber: "FeCl3 = strong-acid + weak-base salt, so it hydrolyses to an acidic solution (pH < 7).",
          },
          { cells: ["NaCl, KCl solution", "pH ≈ 7 (neutral)"] },
          { cells: ["NaOH solution", "Basic (pH > 7)"] },
        ],
      },
      pyqExampleId: "57e4fce5-89d7-4be6-b6c9-b807dedb274d", // FeCl3 -> pH < 7
      practiceSet: [
        { prompt: "Is toothpaste acidic, neutral or basic?", answer: "Basic" },
        { prompt: "Colour sequence when a turmeric stain is scrubbed with soap and then washed with water?", answer: "Yellow → reddish-brown → yellow" },
        { prompt: "Which has pH less than 7: NaOH, KCl, FeCl3 or NaCl?", answer: "FeCl3", method: "salt of strong acid + weak base, hydrolyses to acidic" },
        { prompt: "Is a sodium chloride solution acidic, neutral or basic?", answer: "Neutral (pH ≈ 7)" },
      ],
      traps: [
        {
          title: "FeCl3 is acidic, not neutral",
          body:
            "FeCl3 looks like a simple chloride salt but its solution is **acidic (pH < 7)** — it is the salt of strong acid HCl and weak base Fe(OH)3, so it hydrolyses. NaCl and KCl, in contrast, are neutral.",
        },
      ],
    },
  ],
};
