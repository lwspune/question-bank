import type { SubtopicNote } from "@/app/notes/_types";

export const SALT_HYDROLYSIS_NOTE: SubtopicNote = {
  subtopicName: "Salt Hydrolysis",
  title: "Salt Hydrolysis",
  oneLineDefinition:
    "When a salt dissolves, the ion coming from the weaker parent (weak acid or weak base) reacts with water, so the solution turns acidic, basic or neutral depending on which parent was weak.",
  whyItMatters:
    "This is one of the most repeated Ionic Equilibria subtopics: almost every year a paper asks 'which salt turns litmus red/blue', 'which forms an acidic/basic solution', or 'which is NOT hydrolysed'. " +
    "Nearly all of the PYQs are pure classification — decide the strong/weak nature of the parent acid and base and read off the result. " +
    "A handful go further to the highest-pH comparison and the weak-acid/weak-base Ka-vs-Kb case, and the numeric formulas (Kh, degree of hydrolysis, pH) round out the theory a computation question can be built on.",
  concepts: [
    // Concept 1 — the four salt types and their pH (reference)
    {
      kind: "reference" as const,
      slug: "cetie-sh-four-salt-types",
      name: "The four salt types and their solution pH",
      intuition:
        "Every salt is the product of an acid and a base. Sort each parent as strong or weak, and the solution's pH follows a fixed rule: only the ion from the WEAKER parent reacts with water and shifts the pH. If both parents are strong, nothing hydrolyses and the solution stays neutral.",
      definition:
        "Classify by the strength of the parent acid and base:\n" +
        "- **Strong acid + strong base** (e.g. \\(\\text{NaCl}\\), \\(\\text{KNO}_3\\), \\(\\text{Na}_2\\text{SO}_4\\)): no hydrolysis, solution is **neutral**, \\(\\text{pH} = 7\\).\n" +
        "- **Strong acid + weak base** (e.g. \\(\\text{NH}_4\\text{Cl}\\), \\(\\text{CuSO}_4\\), \\(\\text{CuCl}_2\\)): the **cation** hydrolyses, solution is **acidic**, \\(\\text{pH} < 7\\).\n" +
        "- **Weak acid + strong base** (e.g. \\(\\text{CH}_3\\text{COONa}\\), \\(\\text{Na}_2\\text{CO}_3\\), \\(\\text{KCN}\\)): the **anion** hydrolyses, solution is **basic**, \\(\\text{pH} > 7\\).\n" +
        "- **Weak acid + weak base** (e.g. \\(\\text{CH}_3\\text{COONH}_4\\), \\(\\text{NH}_4\\text{CN}\\), \\(\\text{NH}_4\\text{F}\\)): BOTH ions hydrolyse; the pH **depends on \\(K_a\\) vs \\(K_b\\)** — acidic if \\(K_a > K_b\\), basic if \\(K_b > K_a\\), neutral if \\(K_a = K_b\\).",
      table: {
        columns: ["Salt type", "Example salt", "Ion that hydrolyses", "Solution / pH"],
        rows: [
          {
            cells: [
              "Strong acid + strong base",
              "\\(\\text{NaCl}\\), \\(\\text{KNO}_3\\)",
              "None",
              "Neutral, \\(\\text{pH} = 7\\)",
            ],
            noteAmber: "These salts are NOT hydrolysed — both ions come from strong parents and do not react with water.",
          },
          {
            cells: [
              "Strong acid + weak base",
              "\\(\\text{NH}_4\\text{Cl}\\), \\(\\text{CuSO}_4\\)",
              "Cation",
              "Acidic, \\(\\text{pH} < 7\\)",
            ],
          },
          {
            cells: [
              "Weak acid + strong base",
              "\\(\\text{CH}_3\\text{COONa}\\), \\(\\text{Na}_2\\text{CO}_3\\)",
              "Anion",
              "Basic, \\(\\text{pH} > 7\\)",
            ],
          },
          {
            cells: [
              "Weak acid + weak base",
              "\\(\\text{CH}_3\\text{COONH}_4\\), \\(\\text{NH}_4\\text{CN}\\)",
              "Both ions",
              "Depends on \\(K_a\\) vs \\(K_b\\)",
            ],
            noteAmber:
              "\\(\\text{NH}_4\\text{CN}\\) is basic because HCN (\\(K_a \\approx 4\\times10^{-10}\\)) is a much weaker acid than \\(\\text{NH}_4\\text{OH}\\) (\\(K_b \\approx 1.8\\times10^{-5}\\)) is a base, so \\(K_b > K_a\\).",
          },
        ],
        caption: "The pH is set by the WEAKER parent: weak base → acidic, weak acid → basic, both strong → neutral.",
      },
      pyqExampleId: "f8a719b3-0775-49d0-8ade-fc17f957d7c0", // Na2CO3 forms basic solution (weak acid + strong base)
      selfCheckExample: {
        prompt:
          "Among \\(\\text{Na}_2\\text{CO}_3\\), \\(\\text{NH}_4\\text{Cl}\\), \\(\\text{NaCl}\\) and \\(\\text{CH}_3\\text{COONH}_4\\), which aqueous solution has the highest pH?",
        steps: [
          "\\(\\text{Na}_2\\text{CO}_3\\) = weak acid (\\(\\text{H}_2\\text{CO}_3\\)) + strong base (NaOH) → strongly basic.",
          "\\(\\text{NH}_4\\text{Cl}\\) = strong acid + weak base → acidic (low pH).",
          "\\(\\text{NaCl}\\) = strong acid + strong base → neutral (\\(\\text{pH} = 7\\)).",
          "\\(\\text{CH}_3\\text{COONH}_4\\) = weak acid + weak base with \\(K_a \\approx K_b\\) → nearly neutral.",
          "Only \\(\\text{Na}_2\\text{CO}_3\\) is strongly basic, so it has the highest pH.",
        ],
        answer: "\\(\\text{Na}_2\\text{CO}_3\\) has the highest pH.",
      },
      practiceSet: [
        { prompt: "A salt of a strong acid and a strong base gives a solution of what pH?", answer: "Neutral, \\(\\text{pH} = 7\\)" },
        { prompt: "A salt of a strong acid and a weak base gives which type of solution?", answer: "Acidic (\\(\\text{pH} < 7\\)); the cation hydrolyses" },
        { prompt: "A salt of a weak acid and a strong base gives which type of solution?", answer: "Basic (\\(\\text{pH} > 7\\)); the anion hydrolyses" },
        { prompt: "For a weak-acid + weak-base salt, what decides whether it is acidic or basic?", answer: "The relative sizes of \\(K_a\\) and \\(K_b\\): acidic if \\(K_a > K_b\\), basic if \\(K_b > K_a\\)" },
        { prompt: "Give one salt whose aqueous solution is NOT hydrolysed.", answer: "\\(\\text{KNO}_3\\) (or NaCl, \\(\\text{Na}_2\\text{SO}_4\\)) — strong acid + strong base" },
      ],
      traps: [
        {
          title: "A strong-acid + strong-base salt does NOT hydrolyse",
          body:
            "Salts like \\(\\text{NaCl}\\), \\(\\text{KNO}_3\\) and \\(\\text{Na}_2\\text{SO}_4\\) come from a strong acid AND a strong base, so neither ion reacts with water. The solution stays **neutral** — there is no hydrolysis at all. In a 'which is NOT hydrolysed' question, this is the answer.",
        },
        {
          title: "Match the salt to the RIGHT parents",
          body:
            "\\(\\text{Na}_2\\text{SO}_4\\) is a favourite distractor in 'salt of strong acid and weak base' questions: it is actually strong acid (\\(\\text{H}_2\\text{SO}_4\\)) + strong base (NaOH), so it is neutral, NOT acidic. Always write out both parents before classifying.",
        },
      ],
    },

    // Concept 2 — which ion hydrolyses / classify a given salt (reference)
    {
      kind: "reference" as const,
      slug: "cetie-sh-which-ion-hydrolyses",
      name: "Which ion hydrolyses — classifying a given salt",
      intuition:
        "Litmus and pH questions all reduce to one skill: name the parent acid and base of the salt, spot the weak one, and let its conjugate ion react with water. The ion from the strong parent is a spectator; the ion from the weak parent is the one that shifts the pH.",
      definition:
        "The classify-a-salt routine:\n" +
        "- Split the salt into its **cation** (from a base) and **anion** (from an acid).\n" +
        "- The ion from a **weak** parent hydrolyses; the ion from a **strong** parent does not.\n" +
        "- **Cation of a weak base** (e.g. \\(\\text{NH}_4^{+}\\), \\(\\text{Cu}^{2+}\\)) hydrolyses → releases \\(\\text{H}^{+}\\) → **acidic**, turns **blue litmus red**.\n" +
        "- **Anion of a weak acid** (e.g. \\(\\text{CH}_3\\text{COO}^{-}\\), \\(\\text{CN}^{-}\\), \\(\\text{CO}_3^{2-}\\)) hydrolyses → releases \\(\\text{OH}^{-}\\) → **basic**, turns **red litmus blue**.\n" +
        "- If both ions come from strong parents, neither hydrolyses → neutral, no litmus change.",
      table: {
        columns: ["Salt", "Weak parent", "Ion that hydrolyses", "Litmus effect"],
        rows: [
          {
            cells: [
              "\\(\\text{CuCl}_2\\)",
              "Weak base \\(\\text{Cu(OH)}_2\\)",
              "\\(\\text{Cu}^{2+}\\) (cation)",
              "Acidic — blue litmus turns red",
            ],
          },
          {
            cells: [
              "\\(\\text{NH}_4\\text{NO}_3\\)",
              "Weak base \\(\\text{NH}_4\\text{OH}\\)",
              "\\(\\text{NH}_4^{+}\\) (cation)",
              "Acidic — blue litmus turns red",
            ],
          },
          {
            cells: [
              "\\(\\text{CH}_3\\text{COONa}\\)",
              "Weak acid \\(\\text{CH}_3\\text{COOH}\\)",
              "\\(\\text{CH}_3\\text{COO}^{-}\\) (anion)",
              "Basic — red litmus turns blue",
            ],
          },
          {
            cells: [
              "\\(\\text{KCN}\\)",
              "Weak acid HCN",
              "\\(\\text{CN}^{-}\\) (anion)",
              "Basic — red litmus turns blue",
            ],
          },
          {
            cells: [
              "\\(\\text{NaNO}_3\\)",
              "None (both strong)",
              "Neither ion",
              "Neutral — no litmus change",
            ],
            noteAmber: "\\(\\text{NaNO}_3\\), NaCl and KCl are neutral — they are classic 'no change' distractors in litmus questions.",
          },
        ],
        caption: "Weak-base cation → acidic (blue→red); weak-acid anion → basic (red→blue).",
      },
      pyqExampleId: "ba286c0a-7252-413f-8ae5-85b972af7704", // CuCl2 turns blue litmus red (weak base cation)
      selfCheckExample: {
        prompt:
          "Which salt turns red litmus blue in aqueous solution: \\(\\text{Na}_2\\text{SO}_4\\), \\(\\text{CH}_3\\text{COONa}\\), \\(\\text{NH}_4\\text{NO}_3\\) or \\(\\text{CuCl}_2\\)?",
        steps: [
          "Red litmus turns blue only in a **basic** solution — look for a weak-acid + strong-base salt.",
          "\\(\\text{Na}_2\\text{SO}_4\\) = strong + strong → neutral.",
          "\\(\\text{CH}_3\\text{COONa}\\) = weak acid (\\(\\text{CH}_3\\text{COOH}\\)) + strong base (NaOH) → basic; the acetate anion hydrolyses.",
          "\\(\\text{NH}_4\\text{NO}_3\\) and \\(\\text{CuCl}_2\\) are acidic (weak-base cations).",
        ],
        answer: "\\(\\text{CH}_3\\text{COONa}\\) turns red litmus blue.",
      },
      practiceSet: [
        { prompt: "In \\(\\text{NH}_4\\text{Cl}\\), which ion hydrolyses and what is the effect?", answer: "\\(\\text{NH}_4^{+}\\) hydrolyses → acidic (blue litmus turns red)" },
        { prompt: "In \\(\\text{CH}_3\\text{COONa}\\), which ion hydrolyses?", answer: "The acetate anion \\(\\text{CH}_3\\text{COO}^{-}\\) → basic solution" },
        { prompt: "A salt turns blue litmus red. What kind of salt is it?", answer: "Salt of a strong acid and a weak base (acidic; cation hydrolyses)" },
        { prompt: "Does \\(\\text{NaNO}_3\\) change litmus colour?", answer: "No — it is neutral (strong acid + strong base)" },
        { prompt: "Which ion in \\(\\text{CuSO}_4\\) is responsible for its acidity?", answer: "The \\(\\text{Cu}^{2+}\\) cation (from weak base \\(\\text{Cu(OH)}_2\\))" },
      ],
      traps: [
        {
          title: "Only the ion of the WEAKER partner hydrolyses",
          body:
            "The spectator ion (from the strong parent) does nothing. In \\(\\text{CH}_3\\text{COONa}\\) the \\(\\text{Na}^{+}\\) is inert; it is the acetate anion (from weak \\(\\text{CH}_3\\text{COOH}\\)) that grabs \\(\\text{H}^{+}\\) from water and leaves \\(\\text{OH}^{-}\\) behind. Never let the strong-parent ion drive the pH.",
        },
        {
          title: "Weak-base cation → acidic, not basic",
          body:
            "Students sometimes assume an ammonium or copper salt is basic 'because it came from a base'. The opposite is true: a cation from a **weak base** (\\(\\text{NH}_4^{+}\\), \\(\\text{Cu}^{2+}\\)) hydrolyses to give \\(\\text{H}^{+}\\), so the solution is **acidic** and turns blue litmus red.",
        },
      ],
    },

    // Concept 3 — hydrolysis constant, degree, and pH formulas (formula)
    {
      kind: "formula" as const,
      slug: "cetie-sh-hydrolysis-constant-ph",
      name: "Hydrolysis constant, degree of hydrolysis and pH",
      intuition:
        "The classification tells you the DIRECTION of the pH shift; these formulas tell you the SIZE of it. The hydrolysis constant is built from the water constant divided by the weak parent's ionisation constant, the degree of hydrolysis is how much of the ion actually reacts, and the pH follows from a compact half-formula.",
      definition:
        "For a salt of concentration \\(c\\):\n" +
        "- **Hydrolysis constant** for a weak-acid/strong-base salt: \\(K_h = \\dfrac{K_w}{K_a}\\); for a strong-acid/weak-base salt: \\(K_h = \\dfrac{K_w}{K_b}\\).\n" +
        "- **Degree of hydrolysis**: \\(h = \\sqrt{\\dfrac{K_h}{c}} = \\sqrt{\\dfrac{K_w}{K_a\\,c}}\\) — the fraction of the ion that has reacted with water.\n" +
        "- **pH of a weak-acid + strong-base salt** (basic): \\(\\text{pH} = 7 + \\tfrac{1}{2}\\left(pK_a + \\log c\\right)\\).\n" +
        "- **pH of a strong-acid + weak-base salt** (acidic): \\(\\text{pH} = 7 - \\tfrac{1}{2}\\left(pK_b + \\log c\\right)\\).\n" +
        "- For a **weak-acid + weak-base** salt the pH is concentration-independent: \\(\\text{pH} = 7 + \\tfrac{1}{2}\\left(pK_a - pK_b\\right)\\).",
      formula: {
        label: "Hydrolysis constant, degree and salt pH",
        latex:
          "K_h = \\dfrac{K_w}{K_a}\\qquad h = \\sqrt{\\dfrac{K_h}{c}}\\qquad \\text{pH} = 7 + \\tfrac{1}{2}\\left(pK_a + \\log c\\right)",
        symbols: [
          { symbol: "K_h", meaning: "hydrolysis constant of the salt" },
          { symbol: "K_w", meaning: "ionic product of water (\\(10^{-14}\\) at 298 K)" },
          { symbol: "K_a", meaning: "ionisation constant of the weak parent acid" },
          { symbol: "K_b", meaning: "ionisation constant of the weak parent base" },
          { symbol: "h", meaning: "degree of hydrolysis (fraction hydrolysed)" },
          { symbol: "c", meaning: "molar concentration of the salt" },
        ],
      },
      pyqExampleId: "304d704d-486e-496f-9dd0-836177ff6158", // highest pH -> Na2CO3 (weak acid + strong base, basic salt)
      authoredExample: {
        prompt:
          "The dissociation constant of acetic acid is \\(K_a = 1.0\\times10^{-5}\\). Find the degree of hydrolysis of \\(0.1\\,\\text{M}\\) sodium acetate. (\\(K_w = 1.0\\times10^{-14}\\))",
        steps: [
          "Sodium acetate is a weak-acid + strong-base salt, so \\(K_h = \\dfrac{K_w}{K_a}\\).",
          "\\(K_h = \\dfrac{1.0\\times10^{-14}}{1.0\\times10^{-5}} = 1.0\\times10^{-9}\\).",
          "Degree of hydrolysis \\(h = \\sqrt{\\dfrac{K_h}{c}} = \\sqrt{\\dfrac{1.0\\times10^{-9}}{0.1}} = \\sqrt{1.0\\times10^{-8}}\\).",
          "\\(\\sqrt{1.0\\times10^{-8}} = 1.0\\times10^{-4}\\).",
        ],
        answer: "\\(h = 1.0\\times10^{-4}\\) (about \\(0.01\\%\\) of the acetate is hydrolysed).",
      },
      selfCheckExample: {
        prompt:
          "A weak-acid + strong-base salt of concentration \\(0.01\\,\\text{M}\\) is made from an acid with \\(pK_a = 5\\). Find the pH of the solution.",
        steps: [
          "Use \\(\\text{pH} = 7 + \\tfrac{1}{2}\\left(pK_a + \\log c\\right)\\).",
          "Here \\(pK_a = 5\\) and \\(\\log c = \\log(0.01) = -2\\).",
          "\\(\\text{pH} = 7 + \\tfrac{1}{2}(5 + (-2)) = 7 + \\tfrac{1}{2}(3)\\).",
          "\\(\\text{pH} = 7 + 1.5 = 8.5\\).",
        ],
        answer: "\\(\\text{pH} = 8.5\\) (basic, as expected for this salt type).",
      },
      practiceSet: [
        { prompt: "Write the hydrolysis constant of a weak-acid + strong-base salt in terms of \\(K_w\\) and \\(K_a\\).", answer: "\\(K_h = \\dfrac{K_w}{K_a}\\)" },
        { prompt: "If \\(K_h = 10^{-8}\\) and \\(c = 0.01\\,\\text{M}\\), find the degree of hydrolysis.", answer: "\\(h = \\sqrt{K_h/c} = \\sqrt{10^{-8}/10^{-2}} = 10^{-3}\\)" },
        { prompt: "For a weak-acid + strong-base salt, does pH rise or fall as concentration falls?", answer: "It falls toward 7 — as \\(\\log c\\) becomes more negative, pH decreases" },
        { prompt: "A weak-acid + weak-base salt has \\(pK_a = pK_b\\). What is its pH?", answer: "\\(\\text{pH} = 7\\) (neutral), from \\(7 + \\tfrac{1}{2}(pK_a - pK_b)\\)" },
      ],
      traps: [
        {
          title: "Divide \\(K_w\\) by the WEAK parent's constant",
          body:
            "For a weak-acid salt use \\(K_h = K_w/K_a\\); for a weak-base salt use \\(K_h = K_w/K_b\\). Picking the wrong constant (or using the salt's own 'K') gives a wrong \\(K_h\\) and hence a wrong \\(h\\). A smaller \\(K_a\\) (weaker acid) means a LARGER \\(K_h\\) and more hydrolysis.",
        },
        {
          title: "The degree of hydrolysis carries a square root",
          body:
            "\\(h = \\sqrt{K_h/c}\\), not \\(K_h/c\\). If \\(K_h/c = 10^{-8}\\), then \\(h = 10^{-4}\\), not \\(10^{-8}\\). Take the square root at the end, exactly as in weak-acid degree-of-dissociation problems.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Salts and Common Compounds (NDA Chemistry)",
      href: "/notes/nda-chemistry/acids-bases-salts",
    },
  ],
};
