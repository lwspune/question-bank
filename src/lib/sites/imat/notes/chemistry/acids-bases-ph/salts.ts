import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ABP_SALTS_NOTE: SubtopicNote = {
  subtopicName: "Salt Hydrolysis",
  title: "Salt Solutions: Neutral, Acidic or Basic",
  oneLineDefinition:
    "A dissolved salt is neutral only if neither of its ions reacts with water; the ion from a weak acid makes the solution basic, and the ion from a weak base makes it acidic.",
  whyItMatters:
    "This is one of the two topics the ministry papers have asked most often in this chapter: three questions in 2025 and 2026 asked whether a dissolved salt gives a neutral, acidic or basic solution. Two older questions asked which salt solution is alkaline.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-abp-salt-types",
      name: "Predicting the pH of a salt solution from its parent acid and base",
      intuition:
        "Think of every salt as made from an acid and a base. The ion that came from a strong acid or strong base is a spectator: it has no pull on protons. The ion that came from a weak partner does react with water. An anion of a weak acid takes \\(\\mathrm{H^+}\\) from water and leaves \\(\\mathrm{OH^-}\\); a cation of a weak base gives \\(\\mathrm{H^+}\\) to water.",
      definition:
        "**Salt hydrolysis** is the reaction of a salt's ions with water that shifts the pH away from 7.\n" +
        "- Spectator ions (no effect): \\(\\mathrm{Na^+}\\), \\(\\mathrm{K^+}\\), \\(\\mathrm{Li^+}\\), \\(\\mathrm{Ca^{2+}}\\), \\(\\mathrm{Ba^{2+}}\\), \\(\\mathrm{Cl^-}\\), \\(\\mathrm{Br^-}\\), \\(\\mathrm{I^-}\\), \\(\\mathrm{NO_3^-}\\), \\(\\mathrm{ClO_4^-}\\).\n" +
        "- Basic anion: \\(\\mathrm{CH_3COO^- + H_2O \\rightleftharpoons CH_3COOH + OH^-}\\).\n" +
        "- Acidic cation: \\(\\mathrm{NH_4^+ + H_2O \\rightleftharpoons NH_3 + H_3O^+}\\).\n" +
        "- The effect is weak: a 0.1 mol/L salt solution is usually only mildly acidic or basic, never as extreme as a strong acid or base of the same concentration.",
      table: {
        columns: ["Parent acid and base", "Ion that reacts with water", "Solution", "Examples"],
        rows: [
          { cells: ["Strong acid + strong base", "Neither ion", "Neutral, pH 7", "\\(\\mathrm{NaCl}\\), \\(\\mathrm{KNO_3}\\), \\(\\mathrm{KI}\\), \\(\\mathrm{LiBr}\\)"] },
          { cells: ["Strong acid + weak base", "The cation gives \\(\\mathrm{H^+}\\)", "Acidic, pH below 7", "\\(\\mathrm{NH_4Cl}\\), \\(\\mathrm{NH_4NO_3}\\), \\(\\mathrm{(NH_4)_2SO_4}\\)"] },
          { cells: ["Weak acid + strong base", "The anion takes \\(\\mathrm{H^+}\\), leaving \\(\\mathrm{OH^-}\\)", "Basic, pH above 7", "\\(\\mathrm{CH_3COONa}\\), \\(\\mathrm{Na_2CO_3}\\), \\(\\mathrm{KF}\\), \\(\\mathrm{Na_3PO_4}\\)"] },
          {
            cells: ["Weak acid + weak base", "Both ions", "Depends on Ka against Kb", "\\(\\mathrm{CH_3COONH_4}\\) is close to pH 7"],
            noteAmber: "Ka of the ammonium ion and Kb of the ethanoate ion are almost equal, so their effects cancel.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which of these 0.1 mol/L aqueous solutions has a pH below 7 at 25 °C?",
        options: [
          "\\(\\mathrm{KNO_3}\\)",
          "\\(\\mathrm{Na_2CO_3}\\)",
          "\\(\\mathrm{KF}\\)",
          "\\(\\mathrm{NH_4NO_3}\\)",
          "\\(\\mathrm{CH_3COOK}\\)",
        ],
        steps: [
          "\\(\\mathrm{NH_4NO_3}\\) comes from nitric acid (strong) and ammonia (weak), so \\(\\mathrm{NH_4^+}\\) donates protons: acidic.",
          "\\(\\mathrm{KNO_3}\\) is strong acid with strong base: neutral.",
          "B, C and E each contain the anion of a weak acid (carbonic, hydrofluoric, ethanoic) with a strong-base cation, so they are basic.",
        ],
        answer: "(D) \\(\\mathrm{NH_4NO_3}\\)",
      },
      practiceSet: [
        { prompt: "Is a solution of potassium carbonate acidic, neutral or basic?", answer: "Basic", method: "Carbonate is the anion of a weak acid" },
        { prompt: "Is a solution of ammonium bromide acidic, neutral or basic?", answer: "Acidic", method: "\\(\\mathrm{NH_4^+}\\) from a weak base; \\(\\mathrm{Br^-}\\) a spectator" },
        { prompt: "Is a solution of lithium nitrate acidic, neutral or basic?", answer: "Neutral", method: "Both ions come from strong partners" },
        { prompt: "Which ion makes sodium methanoate solution basic?", answer: "The methanoate ion, \\(\\mathrm{HCOO^-}\\)", method: "It takes \\(\\mathrm{H^+}\\) from water" },
      ],
      traps: [
        {
          title: "Neutralisation does not always give a neutral solution",
          body: "A salt is neutral only when both its acid and its base were strong. Sodium ethanoate, made from a weak acid and a strong base, gives a basic solution; ammonium chloride gives an acidic one. Do not choose pH 7 just because the substance is called a salt.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-abp-salt-special",
      name: "Acid salts and salts of small, highly charged metal ions",
      intuition:
        "Some salts still carry a proton from their parent acid. Whether the solution ends up acidic or basic depends on which is stronger: that ion's urge to give the proton away or its urge to take another one. Small metal ions with a high charge, such as \\(\\mathrm{Al^{3+}}\\) and \\(\\mathrm{Fe^{3+}}\\), pull so hard on the water molecules around them that those waters release protons.",
      definition:
        "- An **acid salt** contains an anion with an acidic H: \\(\\mathrm{NaHSO_4}\\), \\(\\mathrm{NaHCO_3}\\), \\(\\mathrm{NaH_2PO_4}\\), \\(\\mathrm{Na_2HPO_4}\\). Despite the name, its solution can be acidic or basic.\n" +
        "- \\(\\mathrm{HSO_4^-}\\) comes from a strong acid and is itself a fairly strong acid, so \\(\\mathrm{NaHSO_4}\\) solution is clearly acidic.\n" +
        "- \\(\\mathrm{HCO_3^-}\\) is a better base than acid, so \\(\\mathrm{NaHCO_3}\\) solution is slightly basic (about pH 8.3).\n" +
        "- Hydrated metal ions act as acids: \\(\\mathrm{[Al(H_2O)_6]^{3+} \\rightleftharpoons [Al(H_2O)_5(OH)]^{2+} + H^+}\\). Solutions of \\(\\mathrm{AlCl_3}\\), \\(\\mathrm{FeCl_3}\\) and \\(\\mathrm{AlBr_3}\\) are acidic.",
      table: {
        columns: ["Salt", "Ion that reacts", "Solution", "Why"],
        rows: [
          { cells: ["\\(\\mathrm{NaHSO_4}\\)", "\\(\\mathrm{HSO_4^-}\\)", "Acidic (about pH 1.5 at 0.1 mol/L)", "Gives \\(\\mathrm{H^+}\\) easily; almost no pull on protons"] },
          { cells: ["\\(\\mathrm{NaHCO_3}\\)", "\\(\\mathrm{HCO_3^-}\\)", "Slightly basic", "Takes \\(\\mathrm{H^+}\\) more readily than it gives one"] },
          { cells: ["\\(\\mathrm{NaH_2PO_4}\\)", "\\(\\mathrm{H_2PO_4^-}\\)", "Slightly acidic", "Gives \\(\\mathrm{H^+}\\) more readily than it takes one"] },
          { cells: ["\\(\\mathrm{Na_2CO_3}\\)", "\\(\\mathrm{CO_3^{2-}}\\)", "Clearly basic (about pH 11 to 12)", "Anion of a weak acid, no H to give"] },
          { cells: ["\\(\\mathrm{AlCl_3}\\), \\(\\mathrm{FeCl_3}\\)", "The hydrated metal ion", "Acidic", "The small 3+ ion makes its water ligands release \\(\\mathrm{H^+}\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Each of these sodium salts is dissolved in water. Which one gives an acidic solution?",
        options: [
          "\\(\\mathrm{NaHCO_3}\\)",
          "\\(\\mathrm{Na_2CO_3}\\)",
          "\\(\\mathrm{NaCl}\\)",
          "\\(\\mathrm{CH_3COONa}\\)",
          "\\(\\mathrm{NaHSO_4}\\)",
        ],
        steps: [
          "\\(\\mathrm{HSO_4^-}\\) is a fairly strong acid, so \\(\\mathrm{NaHSO_4}\\) solution is acidic.",
          "A also contains an H, but \\(\\mathrm{HCO_3^-}\\) acts mainly as a base: slightly basic. B and D contain anions of weak acids: basic. C is neutral.",
        ],
        answer: "(E) \\(\\mathrm{NaHSO_4}\\)",
      },
      practiceSet: [
        { prompt: "Is a solution of iron(III) chloride acidic, neutral or basic?", answer: "Acidic", method: "The hydrated \\(\\mathrm{Fe^{3+}}\\) ion releases \\(\\mathrm{H^+}\\)" },
        { prompt: "Baking soda is \\(\\mathrm{NaHCO_3}\\). Is its solution acidic or basic?", answer: "Slightly basic", method: "Hydrogencarbonate acts mainly as a base" },
        { prompt: "Which is more basic at the same concentration: \\(\\mathrm{Na_2CO_3}\\) or \\(\\mathrm{NaHCO_3}\\)?", answer: "\\(\\mathrm{Na_2CO_3}\\)", method: "Carbonate is the stronger base" },
      ],
      traps: [
        {
          title: "A hydrogen salt is not automatically acidic",
          body: "Having an H in the anion does not decide the pH. \\(\\mathrm{NaHSO_4}\\) is acidic, but \\(\\mathrm{NaHCO_3}\\) is slightly basic. Ask whether the anion gives up its proton more easily than it takes another one.",
        },
        {
          title: "Some chlorides are acidic",
          body: "A chloride ion is a spectator, but the metal ion may not be. Aluminium and iron(III) salts give acidic solutions, while sodium and potassium chlorides are neutral.",
        },
      ],
    },
  ],
};
