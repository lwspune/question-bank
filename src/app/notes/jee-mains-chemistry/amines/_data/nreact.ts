import type { SubtopicNote } from "@/app/notes/_types";

export const NREACT_AMINE_NOTE: SubtopicNote = {
  subtopicName: "Acylation, Nitrous Acid and Hofmann Elimination",
  title: "Acylation, Nitrous Acid and Hofmann Elimination",
  oneLineDefinition:
    "Reactions at the amine nitrogen: acylation puts an acyl group on it, nitrous acid drives it off as nitrogen gas, and Hofmann elimination removes it as trimethylamine to leave an alkene.",
  whyItMatters:
    "Fourteen PYQs, six numerical, three from 2026. Eight are acylation, most of them mass and yield problems; four test nitrous acid on primary aliphatic amines, usually through the volume of nitrogen released; one tests an amine salt and one a Hofmann elimination.",
  concepts: [
    // C1 — acylation
    {
      kind: "formula" as const,
      slug: "jcamine-acylation",
      name: "Acylation of amines: products, stoichiometry and yield",
      intuition:
        "A primary or secondary amine attacks an acid chloride or anhydride and swaps one N–H for an acyl group. The product is an amide, one to one with the amine. Each acetyl group replaces one hydrogen, so the molar mass rises by exactly 42 per acetylation. A tertiary amine has no N–H and cannot be acylated.",
      definition:
        "- Reagents: acetic anhydride or acetyl chloride, with pyridine to take up the acid and push the equilibrium forward.\n" +
        "- Benzoylation with \\(\\mathrm{C_6H_5COCl}\\) in aqueous NaOH is the **Schotten–Baumann** reaction; aniline gives benzanilide, \\(\\mathrm{C_6H_5NHCOC_6H_5}\\) (M = 197).\n" +
        "- Acetylation of aniline gives acetanilide, \\(\\mathrm{C_6H_5NHCOCH_3}\\) (M = 135). One mole of amine gives one mole of amide.\n" +
        "- Each acetylation adds \\(\\mathrm{C_2H_2O}\\) = 42 g/mol; the number of acetylated groups = (product M − starting M)/42.\n" +
        "- With two groups competing, the more nucleophilic one reacts first: an alkyl \\(\\mathrm{NH_2}\\) before an aryl or amide nitrogen, and \\(\\mathrm{NH_2}\\) before a phenolic OH.\n" +
        "- The amide nitrogen is much less basic and less activating than the amine, which is why acetylation is used to protect aniline.",
      formula: {
        label: "Acetylation of an amine and the mass it adds",
        latex:
          "\\mathrm{RNH_2 + (CH_3CO)_2O \\to RNHCOCH_3 + CH_3COOH} \\qquad \\Delta M = +42\\ \\mathrm{g\\,mol^{-1}}\\ \\text{per acetyl group}",
      },
      authoredExample: {
        prompt:
          "9.0 g of ethanamine is acetylated completely with acetic anhydride. What mass of N-ethylacetamide forms?",
        steps: [
          "\\(M(\\mathrm{C_2H_5NH_2}) = 45\\ \\mathrm{g\\,mol^{-1}}\\), so 9.0 g is 0.20 mol.",
          "The product \\(\\mathrm{CH_3CONHC_2H_5}\\) forms one to one: 0.20 mol.",
          "\\(M(\\mathrm{C_4H_9NO}) = 45 + 42 = 87\\ \\mathrm{g\\,mol^{-1}}\\).",
          "Mass = 0.20 × 87 = 17.4 g.",
        ],
        answer: "17.4 g",
      },
      selfCheckExample: {
        prompt:
          "Ethane-1,2-diamine (M = 60 g/mol) is acetylated with excess acetic anhydride, one acetyl group on each nitrogen. What is the molar mass of the product?",
        steps: [
          "Each \\(\\mathrm{NH_2}\\) takes one acetyl group, adding 42 each.",
          "60 + 2 × 42 = 144.",
          "Check: \\(\\mathrm{CH_3CONHCH_2CH_2NHCOCH_3}\\) is \\(\\mathrm{C_6H_{12}N_2O_2}\\) = 144.",
        ],
        answer: "144 g/mol",
      },
      practiceSet: [
        { prompt: "By how much does the molar mass rise when one N–H of an amine is acetylated?", answer: "42 g/mol" },
        { prompt: "Why is pyridine added when an amine is acetylated with acetyl chloride?", answer: "It removes the HCl formed and shifts the equilibrium to the amide" },
        { prompt: "Which of \\(\\mathrm{(CH_3)_3N}\\) and \\(\\mathrm{(CH_3)_2NH}\\) cannot be acetylated?", answer: "\\(\\mathrm{(CH_3)_3N}\\): it has no N–H" },
        { prompt: "0.050 mol of aniline gives 5.4 g of acetanilide (M = 135). What is the percentage yield?", answer: "80%", method: "Theoretical mass = 0.050 × 135 = 6.75 g; 5.4/6.75 = 0.80" },
      ],
      pyqExampleId: "3aa44cdd-ee15-4786-a392-6bace400b902", // 2024 — mass of acetanilide from aniline
      traps: [
        {
          title: "Acylation is one to one per nitrogen",
          body: "One mole of aniline gives one mole of acetanilide, whatever the excess of anhydride. The excess reagent does not add a second acetyl group to the amide nitrogen under normal conditions.",
        },
        {
          title: "The better nucleophile is acylated first",
          body: "In a molecule with an alkyl \\(\\mathrm{NH_2}\\) and an amide or aryl nitrogen, one equivalent of anhydride acylates the alkyl \\(\\mathrm{NH_2}\\). In 4-aminophenol it acylates the \\(\\mathrm{NH_2}\\), not the OH.",
        },
      ],
    },

    // C2 — nitrous acid, amine salts and Hofmann elimination (1fc3d168 merged here)
    {
      kind: "formula" as const,
      slug: "jcamine-nitrous-aliphatic",
      name: "Amine salts, nitrous acid on primary aliphatic amines, and Hofmann elimination",
      intuition:
        "Three reactions change what is on the nitrogen. An acid simply protonates it to a salt, and alkali gives the amine back. Nitrous acid turns a primary aliphatic amine into a diazonium ion so unstable that it loses nitrogen gas at once, leaving an alcohol; the gas is released mole for mole, which makes these reactions easy to count. Exhaustive methylation turns the nitrogen into a good leaving group, \\(\\mathrm{N(CH_3)_3}\\), and heating with base eliminates it to give an alkene.",
      definition:
        "- **Salts**: \\(\\mathrm{RNH_2 + HCl \\to RNH_3^+Cl^-}\\). The salt dissolves in water and its solution is acidic; NaOH liberates the amine as a separate layer.\n" +
        "- **Nitrous acid** (\\(\\mathrm{NaNO_2 + HCl}\\), cold) on a **primary aliphatic** amine gives an alkyldiazonium ion that decomposes: one mole of \\(\\mathrm{N_2}\\) per mole of amine, plus the alcohol. At STP, 1 mol of \\(\\mathrm{N_2}\\) occupies 22.4 L.\n" +
        "- The alcohol can be identified further: propan-2-amine gives propan-2-ol, which oxidises to acetone and gives the iodoform test.\n" +
        "- A primary **aromatic** amine gives a stable diazonium salt at 273–278 K instead (see the diazonium pages).\n" +
        "- **Hofmann elimination**: excess \\(\\mathrm{CH_3I}\\) converts the amine to \\(\\mathrm{R{-}N^+(CH_3)_3}\\); moist \\(\\mathrm{Ag_2O}\\) gives the hydroxide, and heating (or a strong base such as \\(\\mathrm{C_2H_5O^-}\\)) eliminates \\(\\mathrm{(CH_3)_3N}\\).\n" +
        "- The **less substituted** alkene is major (Hofmann rule): the bulky, positively charged leaving group makes the base take the most accessible, most acidic β-hydrogen.",
      formula: {
        label: "Nitrous acid on a primary aliphatic amine",
        latex:
          "\\mathrm{RNH_2 \\xrightarrow{NaNO_2,\\ HCl,\\ cold} [RN_2^+Cl^-] \\xrightarrow{H_2O} ROH + N_2 + HCl} \\qquad n(\\mathrm{N_2}) = n(\\mathrm{RNH_2})",
      },
      authoredExample: {
        prompt:
          "1.18 g of propan-1-amine is treated with \\(\\mathrm{NaNO_2}\\) and dilute HCl in the cold, then warmed. What volume of nitrogen is released at STP?",
        steps: [
          "\\(M(\\mathrm{C_3H_7NH_2}) = 36 + 9 + 14 = 59\\ \\mathrm{g\\,mol^{-1}}\\), so 1.18 g is 0.020 mol.",
          "A primary aliphatic amine releases one mole of \\(\\mathrm{N_2}\\) per mole: 0.020 mol \\(\\mathrm{N_2}\\).",
          "Volume = 0.020 × 22.4 L = 0.448 L.",
        ],
        answer: "448 mL of \\(\\mathrm{N_2}\\) (the organic product is mainly propan-1-ol)",
      },
      selfCheckExample: {
        prompt:
          "Butan-2-yltrimethylammonium hydroxide, \\(\\mathrm{CH_3CH_2CH(CH_3){-}N^+(CH_3)_3\\ OH^-}\\), is heated. Which alkene is the major product?",
        steps: [
          "The β-hydrogens are on the terminal \\(\\mathrm{CH_3}\\) and on the internal \\(\\mathrm{CH_2}\\).",
          "With the bulky \\(\\mathrm{N^+(CH_3)_3}\\) leaving group, the base removes a hydrogen from the less hindered \\(\\mathrm{CH_3}\\) (Hofmann rule).",
          "That gives the less substituted alkene; \\(\\mathrm{(CH_3)_3N}\\) and water are the other products.",
        ],
        answer: "But-1-ene, \\(\\mathrm{CH_3CH_2CH{=}CH_2}\\) (but-2-ene is the minor product)",
      },
      practiceSet: [
        { prompt: "Which class of aliphatic amine gives nitrogen gas with nitrous acid in the cold?", answer: "Primary" },
        { prompt: "What volume of \\(\\mathrm{N_2}\\) at STP comes from 0.050 mol of a primary aliphatic amine with nitrous acid?", answer: "1.12 L" },
        { prompt: "An aqueous solution of anilinium chloride is warmed with NaOH. What separates?", answer: "Aniline, as an oily layer" },
        { prompt: "Why is the less substituted alkene the major product of Hofmann elimination?", answer: "The bulky, positively charged \\(\\mathrm{N^+(CH_3)_3}\\) group makes the base remove the most accessible and most acidic β-hydrogen" },
      ],
      pyqExampleId: "468acd3b-94f9-43f9-86e8-3449b0fd31dd", // 2024 — ethylamine mass from the volume of N2
      traps: [
        {
          title: "Aliphatic and aromatic primary amines differ with nitrous acid",
          body: "A primary aliphatic amine loses \\(\\mathrm{N_2}\\) at once and gives an alcohol. A primary aromatic amine at 273–278 K gives a diazonium salt that stays in solution; it loses \\(\\mathrm{N_2}\\) only on warming.",
        },
        {
          title: "Hofmann elimination is not Saytzeff elimination",
          body: "Dehydrohalogenation of an alkyl halide usually gives the more substituted alkene. Elimination from a quaternary ammonium salt gives the less substituted alkene as the major product.",
        },
      ],
    },
  ],
};
