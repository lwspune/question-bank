import type { SubtopicNote } from "@/app/notes/_types";

export const EAS_AMINE_NOTE: SubtopicNote = {
  subtopicName: "Electrophilic Substitution in Aniline",
  title: "Electrophilic Substitution in Aniline",
  oneLineDefinition:
    "The amino group makes the ring so reactive, and so basic, that aniline over-brominates, gives meta product on nitration and fails Friedel–Crafts; acetylation tames it.",
  whyItMatters:
    "Twenty-four PYQs, two numerical, three from 2026. Eight test bromination, from tribromoaniline yields to the protection and blocking needed for one bromine; ten test nitration and nitrosation, above all why the meta product appears; six test Friedel–Crafts failure, sulphonation to sulphanilic acid and oxidation.",
  concepts: [
    // C1 — bromination and protection
    {
      kind: "formula" as const,
      slug: "jcamine-eas-bromination",
      name: "Bromination of aniline and protection by acetylation",
      intuition:
        "The nitrogen lone pair feeds the ring and makes the ortho and para carbons very rich in electrons. Bromine water therefore substitutes at all three of them at once, and the reaction cannot be stopped at one bromine. To get one bromine, first turn the amine into an amide: the lone pair is then shared with the carbonyl group, the ring is only moderately activated, and the bulky group favours para.",
      definition:
        "- With bromine water at room temperature aniline gives **2,4,6-tribromoaniline**, a white precipitate, in one step.\n" +
        "- Only ortho and para attack lets the nitrogen share the positive charge of the σ-complex (an iminium form); a meta σ-complex gets no such help and is not involved.\n" +
        "- **Protection**: acetylate (\\(\\mathrm{(CH_3CO)_2O}\\), pyridine) to acetanilide, brominate (mainly para), then hydrolyse the amide with acid or base to free the \\(\\mathrm{NH_2}\\).\n" +
        "- To get an ortho product, block para first (for example by sulphonation), then remove the blocking group.\n" +
        "- Molar masses for yield problems: aniline 93, 2,4,6-tribromoaniline 330 g/mol.",
      formula: {
        label: "Bromination of aniline with bromine water",
        latex: "\\mathrm{C_6H_5NH_2 + 3Br_2 \\xrightarrow{H_2O} 2,4,6{-}Br_3C_6H_2NH_2\\downarrow + 3HBr}",
      },
      authoredExample: {
        prompt: "Give a route from aniline to 4-bromoaniline as the main product.",
        steps: [
          "Bromine water on aniline itself would give 2,4,6-tribromoaniline, so the activation must be reduced first.",
          "Acetylate: \\(\\mathrm{C_6H_5NH_2 + (CH_3CO)_2O \\to C_6H_5NHCOCH_3}\\) (acetanilide).",
          "Brominate with \\(\\mathrm{Br_2}\\) in ethanoic acid: the amide group directs ortho and para, and its bulk favours para, giving 4-bromoacetanilide.",
          "Hydrolyse the amide (aqueous acid or alkali, heat) to release the free amine.",
        ],
        answer: "(i) \\(\\mathrm{(CH_3CO)_2O}\\), pyridine; (ii) \\(\\mathrm{Br_2/CH_3COOH}\\); (iii) \\(\\mathrm{H_3O^+}\\) or \\(\\mathrm{OH^-}\\), heat",
      },
      selfCheckExample: {
        prompt:
          "4.65 g of aniline is shaken with excess bromine water and gives 14.85 g of dry white precipitate. What is the percentage yield?",
        steps: [
          "4.65/93 = 0.050 mol of aniline.",
          "Each mole gives one mole of 2,4,6-tribromoaniline (M = 330): theoretical mass 0.050 × 330 = 16.5 g.",
          "Yield = 14.85/16.5 × 100.",
        ],
        answer: "90%",
      },
      practiceSet: [
        { prompt: "What does aniline give with bromine water at room temperature?", answer: "2,4,6-Tribromoaniline, a white precipitate" },
        { prompt: "Why is the meta σ-complex not formed in the bromination of aniline?", answer: "Only ortho and para attack let the nitrogen lone pair share the positive charge" },
        { prompt: "Why does acetylation reduce the activating effect of \\(\\mathrm{NH_2}\\)?", answer: "The nitrogen lone pair is also delocalised onto the carbonyl oxygen, so less of it reaches the ring" },
        { prompt: "How is the free amine recovered after brominating acetanilide?", answer: "By hydrolysing the amide with aqueous acid or alkali" },
      ],
      pyqExampleId: "240233ce-b470-48a6-85bb-666fb99942a8", // 2024 — percentage yield of tribromoaniline
      traps: [
        {
          title: "Bromine water cannot stop at one bromine",
          body: "The amino group activates all three ortho and para positions. With bromine water they are all substituted at once; monobromination needs the amine protected as its acetyl derivative.",
        },
        {
          title: "The protecting group must come off",
          body: "Bromination of acetanilide gives 4-bromoacetanilide. The last step, hydrolysis, is what turns it into 4-bromoaniline; a sequence without it ends at the amide.",
        },
      ],
    },

    // C2 — nitration and nitrosation
    {
      kind: "formula" as const,
      slug: "jcamine-eas-nitration",
      name: "Nitration of aniline: the anilinium ion and meta product",
      intuition:
        "The nitrating mixture is a strong acid, and aniline is a base. Much of the aniline is protonated to the anilinium ion, \\(\\mathrm{C_6H_5NH_3^+}\\), whose positive nitrogen withdraws electrons and directs meta. So nitration of aniline gives a large share of meta product, besides oxidation tars. Protecting the amine as acetanilide keeps it unprotonated and gives mainly the para product.",
      definition:
        "- Direct nitration (\\(\\mathrm{HNO_3/H_2SO_4}\\), 288 K) gives about 51% para, 47% meta and 2% ortho nitroaniline.\n" +
        "- In the mixture \\(\\mathrm{H_2SO_4}\\) is the acid and \\(\\mathrm{HNO_3}\\) accepts a proton (acts as a base) to form \\(\\mathrm{NO_2^+}\\).\n" +
        "- The meta product comes from the anilinium ion, not from \\(\\mathrm{NH_2}\\) being a meta director.\n" +
        "- Route to 4-nitroaniline: acetylate, nitrate, hydrolyse.\n" +
        "- In benzanilide, \\(\\mathrm{C_6H_5CONHC_6H_5}\\), the ring on nitrogen is activated and is substituted para to NH; the ring on the carbonyl is deactivated.\n" +
        "- N,N-Dimethylaniline with \\(\\mathrm{NaNO_2/HCl}\\) at low temperature is nitrosated at the para position by \\(\\mathrm{NO^+}\\).",
      formula: {
        label: "Product distribution in the direct nitration of aniline",
        latex:
          "\\mathrm{C_6H_5NH_2 \\xrightarrow{HNO_3,\\ H_2SO_4,\\ 288\\ K}}\\ p\\ (51\\%) + m\\ (47\\%) + o\\ (2\\%)",
      },
      authoredExample: {
        prompt: "Give a route from aniline to 4-nitroaniline that avoids the meta product.",
        steps: [
          "Acetylate first: acetanilide is not protonated by the nitrating mixture, and its amide group directs ortho and para.",
          "Nitrate with \\(\\mathrm{HNO_3/H_2SO_4}\\): the bulky acetamido group gives mainly 4-nitroacetanilide.",
          "Hydrolyse the amide to free the amine.",
        ],
        answer: "(i) \\(\\mathrm{(CH_3CO)_2O}\\); (ii) \\(\\mathrm{HNO_3/H_2SO_4}\\); (iii) \\(\\mathrm{H_3O^+}\\) or \\(\\mathrm{OH^-}\\), heat",
      },
      selfCheckExample: {
        prompt:
          "What is the percentage of nitrogen in 4-nitroacetanilide, \\(\\mathrm{C_8H_8N_2O_3}\\)? (H = 1, C = 12, N = 14, O = 16)",
        steps: [
          "M = 8 × 12 + 8 × 1 + 2 × 14 + 3 × 16 = 180.",
          "Mass of nitrogen = 28.",
          "28/180 × 100 = 15.6.",
        ],
        answer: "15.6%",
      },
      practiceSet: [
        { prompt: "Why does the direct nitration of aniline give a large amount of the meta product?", answer: "The acid mixture protonates aniline to the anilinium ion, which is meta-directing" },
        { prompt: "What role does \\(\\mathrm{HNO_3}\\) play in the nitrating mixture?", answer: "It acts as a base, accepting a proton from \\(\\mathrm{H_2SO_4}\\) to form \\(\\mathrm{NO_2^+}\\)" },
        { prompt: "Which ring of benzanilide, \\(\\mathrm{C_6H_5CONHC_6H_5}\\), is attacked by an electrophile?", answer: "The ring bonded to nitrogen, mainly para to the NH" },
        { prompt: "What is the electrophile when N,N-dimethylaniline reacts with \\(\\mathrm{NaNO_2/HCl}\\) at low temperature?", answer: "The nitrosonium ion, \\(\\mathrm{NO^+}\\)" },
      ],
      pyqExampleId: "d6c7ba42-9262-4e03-80a1-030065264b47", // 2022 — ortho, meta and para products because the mixture is acidic
      traps: [
        {
          title: "NH₂ is not meta-directing",
          body: "The amino group directs ortho and para. The meta product in nitration comes from the anilinium ion formed in the acid, whose positive nitrogen directs meta.",
        },
        {
          title: "Para is still slightly ahead of meta",
          body: "Direct nitration gives about 51% para and 47% meta, with only 2% ortho. A statement that meta exceeds ortho is true; one that meta is the only product is false.",
        },
      ],
    },

    // C3 — Friedel–Crafts, sulphonation, oxidation
    {
      kind: "reference" as const,
      slug: "jcamine-eas-fc-sulphonation",
      name: "Friedel–Crafts failure, sulphonation and oxidation of aniline",
      intuition:
        "Aniline's lone pair makes it a Lewis base as well as an activated ring. A Lewis acid such as \\(\\mathrm{AlCl_3}\\) bonds to the nitrogen instead of generating an electrophile, and the positive nitrogen then deactivates the ring. Strong acid does the same at first, which is why sulphonation needs a high temperature. The electron-rich ring is also easily oxidised.",
      definition:
        "- Friedel–Crafts alkylation and acylation fail: aniline forms a salt with \\(\\mathrm{AlCl_3}\\), putting a positive charge on nitrogen, and no ring product forms.\n" +
        "- Sulphonation: concentrated \\(\\mathrm{H_2SO_4}\\) first gives anilinium hydrogensulphate; heating at 453–473 K gives **sulphanilic acid** (4-aminobenzenesulphonic acid), which exists as a zwitterion.\n" +
        "- Sulphanilic acid contains N and S, so its Lassaigne extract gives a blood-red colour with \\(\\mathrm{Fe^{3+}}\\) (thiocyanate).\n" +
        "- Oxidation: acidified \\(\\mathrm{K_2Cr_2O_7}\\) gives p-benzoquinone; air slowly gives coloured products.",
      table: {
        columns: ["Reaction of aniline", "Reagent and conditions", "Result", "Reason"],
        rows: [
          { cells: ["Friedel–Crafts alkylation or acylation", "RCl or RCOCl with anhydrous \\(\\mathrm{AlCl_3}\\)", "No ring substitution; N–\\(\\mathrm{AlCl_3}\\) complex", "Nitrogen is a Lewis base; the complex deactivates the ring"] },
          { cells: ["Sulphonation", "Conc. \\(\\mathrm{H_2SO_4}\\), then 453–473 K", "Sulphanilic acid, \\(\\mathrm{H_3N^+C_6H_4SO_3^-}\\)", "Anilinium hydrogensulphate rearranges on heating"] },
          { cells: ["Oxidation", "Acidified \\(\\mathrm{K_2Cr_2O_7}\\)", "p-Benzoquinone", "The ring is very electron-rich"] },
          { cells: ["Nitration", "\\(\\mathrm{HNO_3/H_2SO_4}\\), 288 K", "Mixture of para, meta and ortho nitroanilines", "Partial protonation to the anilinium ion"] },
          { cells: ["Bromination", "Bromine water", "2,4,6-Tribromoaniline", "Strong activation by \\(\\mathrm{NH_2}\\)"] },
        ],
        caption: "Wherever aniline meets an acid, think of the protonated or complexed nitrogen first.",
      },
      selfCheckExample: {
        prompt:
          "Aniline is heated with concentrated sulphuric acid at 453–473 K. Name the product and explain why it has a high melting point and does not dissolve in organic solvents.",
        steps: [
          "The first product, anilinium hydrogensulphate, rearranges on heating to 4-aminobenzenesulphonic acid (sulphanilic acid).",
          "Its acidic \\(\\mathrm{SO_3H}\\) protonates its own basic \\(\\mathrm{NH_2}\\), giving a dipolar ion.",
        ],
        answer: "Sulphanilic acid; it exists as the zwitterion \\(\\mathrm{H_3N^+C_6H_4SO_3^-}\\), with ionic forces between molecules",
      },
      practiceSet: [
        { prompt: "Why does aniline not undergo Friedel–Crafts reactions?", answer: "It forms a salt with \\(\\mathrm{AlCl_3}\\); the positive nitrogen deactivates the ring" },
        { prompt: "What does aniline give with acidified potassium dichromate?", answer: "p-Benzoquinone" },
        { prompt: "What colour does the Lassaigne extract of a compound with both N and S give with \\(\\mathrm{FeCl_3}\\)?", answer: "Blood red" },
        { prompt: "In what form does sulphanilic acid exist in the solid?", answer: "As a zwitterion, \\(\\mathrm{H_3N^+C_6H_4SO_3^-}\\)" },
      ],
      pyqExampleId: "86c9033d-9d41-4442-86bc-492b4608cae0", // 2022 — Friedel–Crafts alkylation gives a positively charged nitrogen
      traps: [
        {
          title: "Friedel–Crafts on aniline gives no ring product at all",
          body: "The \\(\\mathrm{AlCl_3}\\) is tied up by the nitrogen. Do not predict ortho, para or meta alkylanilines; the ring is not alkylated or acylated.",
        },
        {
          title: "A strongly activated ring is also easily oxidised",
          body: "Aniline darkens in air and is oxidised to p-benzoquinone by dichromate. Oxidising agents in a sequence can destroy the amine before any intended step.",
        },
      ],
    },
  ],
};
