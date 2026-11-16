import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_DF_COMPOUNDS_NOTE: SubtopicNote = {
  subtopicName: "Potassium Permanganate and Dichromate",
  title: "Potassium Permanganate and Dichromate",
  oneLineDefinition:
    "How K₂Cr₂O₇ and KMnO₄ are made from their ores, the chromate and dichromate change with pH, the shapes of the oxoanions, and how both compounds act as oxidising agents in acid and in neutral solution.",
  whyItMatters:
    "Four NEET questions from 2022 to 2026, all on manganese or on an iron(II) salt used with these oxidants. One asks the change in manganese's oxidation state when permanganate oxidises iodide in neutral solution (2022), one the states Mn does not show when manganate disproportionates (Re-NEET 2024), one the green product of heating KMnO₄ at 513 K (Re-NEET 2026), and one the acid added when making Mohr's salt (NEET 2024). None has yet asked about dichromate itself.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchdf-preparation",
      name: "Making K₂Cr₂O₇ and KMnO₄",
      intuition:
        "Both compounds are made in the same three moves. Heat the ore with an alkali in air to get a metal oxoanion (yellow chromate, green manganate). Change it into the final ion (orange dichromate by adding acid, purple permanganate by oxidation). Then bring in potassium. Each colour tells you the oxidation state, so learn the colours with the states.",
      definition:
        "- **Potassium dichromate:** chromite ore is fused with sodium carbonate in plenty of air: \\(4\\text{FeCr}_2\\text{O}_4 + 8\\text{Na}_2\\text{CO}_3 + 7\\text{O}_2 \\rightarrow 8\\text{Na}_2\\text{CrO}_4 + 2\\text{Fe}_2\\text{O}_3 + 8\\text{CO}_2\\). The yellow sodium chromate is acidified with sulphuric acid to give orange sodium dichromate. Sodium dichromate is more soluble than potassium dichromate, so adding KCl crystallises \\(\\text{K}_2\\text{Cr}_2\\text{O}_7\\).\n" +
        "- Chromate and dichromate change into each other with pH: \\(2\\text{CrO}_4^{2-} + 2\\text{H}^+ \\rightarrow \\text{Cr}_2\\text{O}_7^{2-} + \\text{H}_2\\text{O}\\) and \\(\\text{Cr}_2\\text{O}_7^{2-} + 2\\text{OH}^- \\rightarrow 2\\text{CrO}_4^{2-} + \\text{H}_2\\text{O}\\).\n" +
        "- Chromate is tetrahedral. Dichromate is two tetrahedra sharing one corner oxygen, with a Cr-O-Cr bond angle of 126°.\n" +
        "- **Potassium permanganate:** \\(\\text{MnO}_2\\) is fused with KOH and an oxidising agent such as \\(\\text{KNO}_3\\) to give dark green \\(\\text{K}_2\\text{MnO}_4\\). Manganate disproportionates in a neutral or acid solution: \\(3\\text{MnO}_4^{2-} + 4\\text{H}^+ \\rightarrow 2\\text{MnO}_4^- + \\text{MnO}_2 + 2\\text{H}_2\\text{O}\\). Commercially, the manganate is oxidised electrolytically.\n" +
        "- On heating, KMnO₄ decomposes at 513 K: \\(2\\text{KMnO}_4 \\rightarrow \\text{K}_2\\text{MnO}_4 + \\text{MnO}_2 + \\text{O}_2\\).\n" +
        "- Manganate and permanganate are both tetrahedral; their π bonds form by overlap of oxygen p orbitals with manganese d orbitals.",
      table: {
        columns: ["Ion", "Oxidation state of the metal", "Colour", "Structure or magnetism"],
        rows: [
          { cells: ["\\(\\text{CrO}_4^{2-}\\), chromate", "+6", "Yellow", "Tetrahedral"] },
          { cells: ["\\(\\text{Cr}_2\\text{O}_7^{2-}\\), dichromate", "+6", "Orange", "Two tetrahedra sharing one oxygen"] },
          { cells: ["\\(\\text{MnO}_4^{2-}\\), manganate", "+6", "Green", "Tetrahedral; paramagnetic, one unpaired electron"], noteAmber: "Re-NEET 2026: heating KMnO₄ at 513 K gives the green, paramagnetic K₂MnO₄." },
          { cells: ["\\(\\text{MnO}_4^-\\), permanganate", "+7", "Purple", "Tetrahedral; diamagnetic"], noteAmber: "Re-NEET 2024 asked which states Mn does not show in the disproportionation of manganate (it shows +6, +7 and +4)." },
        ],
      },
      pyqExampleId: "61c6df1a-cb62-4902-a256-5f20bf4e360f",
      selfCheckExample: {
        prompt: "Write the equation for chromate changing into dichromate when acid is added, and say what colour change you would see.",
        steps: [
          "Two chromate ions join and lose one oxygen as water: \\(2\\text{CrO}_4^{2-} + 2\\text{H}^+ \\rightarrow \\text{Cr}_2\\text{O}_7^{2-} + \\text{H}_2\\text{O}\\).",
          "Check: Cr 2 = 2, O 8 = 7 + 1, H 2 = 2, charge \\(-4 + 2 = -2\\).",
          "Chromate is yellow and dichromate is orange.",
        ],
        answer: "\\(2\\text{CrO}_4^{2-} + 2\\text{H}^+ \\rightarrow \\text{Cr}_2\\text{O}_7^{2-} + \\text{H}_2\\text{O}\\); yellow turns orange",
      },
      practiceSet: [
        { prompt: "Name the ore from which potassium dichromate is made.", answer: "Chromite, \\(\\text{FeCr}_2\\text{O}_4\\)" },
        { prompt: "Why is KCl added to a solution of sodium dichromate?", answer: "Potassium dichromate is less soluble, so it crystallises out" },
        { prompt: "What colour does an orange dichromate solution turn when alkali is added, and why?", answer: "Yellow: dichromate changes into chromate" },
        { prompt: "How many oxygen atoms link the two chromium atoms in the dichromate ion?", answer: "One (a single Cr-O-Cr bridge)" },
      ],
      traps: [
        {
          title: "Manganate is green, permanganate is purple",
          body: "\\(\\text{K}_2\\text{MnO}_4\\) (Mn +6) is green and paramagnetic. \\(\\text{KMnO}_4\\) (Mn +7) is purple and diamagnetic. Do not swap the names.",
        },
        {
          title: "Purple does not mean paramagnetic",
          body: "In permanganate manganese is +7 and has no d electrons left, so the ion is diamagnetic even though its colour is so deep.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchdf-oxidising",
      name: "Oxidising action in acid and in neutral solution",
      intuition:
        "Permanganate and dichromate are strong oxidising agents because the metal sits in a very high oxidation state and wants electrons. How many it takes depends on the solution. In acid, permanganate goes all the way down to Mn²⁺ and takes 5 electrons. In a neutral or faintly alkaline solution it stops at MnO₂ and takes only 3. Count the electrons each side gives and takes, and every mole question becomes a ratio.",
      definition:
        "- **Permanganate in acid:** Mn +7 to +2, 5 electrons. It oxidises \\(\\text{I}^-\\) to \\(\\text{I}_2\\), \\(\\text{Fe}^{2+}\\) to \\(\\text{Fe}^{3+}\\), oxalate to \\(\\text{CO}_2\\) (at 333 K), \\(\\text{H}_2\\text{S}\\) to S, \\(\\text{SO}_3^{2-}\\) to \\(\\text{SO}_4^{2-}\\) and \\(\\text{NO}_2^-\\) to \\(\\text{NO}_3^-\\).\n" +
        "- **Permanganate in neutral or faintly alkaline solution:** \\(\\text{MnO}_4^- + 2\\text{H}_2\\text{O} + 3e^- \\rightarrow \\text{MnO}_2 + 4\\text{OH}^-\\), Mn +7 to +4. It oxidises \\(\\text{I}^-\\) to iodate \\(\\text{IO}_3^-\\), thiosulphate to sulphate, and \\(\\text{Mn}^{2+}\\) to \\(\\text{MnO}_2\\).\n" +
        "- **Dichromate in acid:** \\(\\text{Cr}_2\\text{O}_7^{2-} + 14\\text{H}^+ + 6e^- \\rightarrow 2\\text{Cr}^{3+} + 7\\text{H}_2\\text{O}\\), Cr +6 to +3. It oxidises \\(\\text{I}^-\\) to \\(\\text{I}_2\\), \\(\\text{Fe}^{2+}\\) to \\(\\text{Fe}^{3+}\\), \\(\\text{Sn}^{2+}\\) to \\(\\text{Sn}^{4+}\\) and \\(\\text{H}_2\\text{S}\\) to S. \\(\\text{K}_2\\text{Cr}_2\\text{O}_7\\) is a primary standard in volumetric analysis.\n" +
        "- Titrations are acidified with dilute \\(\\text{H}_2\\text{SO}_4\\): HCl is not used because permanganate would oxidise the chloride to chlorine.\n" +
        "- The iron(II) salt titrated against them is often **Mohr's salt**, ferrous ammonium sulphate. When it is made, a little dilute sulphuric acid is added to stop the \\(\\text{Fe}^{2+}\\) ion from hydrolysing.",
      formula: {
        label: "Permanganate in acid",
        latex: "\\text{MnO}_4^- + 8\\text{H}^+ + 5e^- \\rightarrow \\text{Mn}^{2+} + 4\\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "How many moles of \\(\\text{KMnO}_4\\) are needed to oxidise 1 mole of \\(\\text{FeSO}_4\\) in acid solution?",
        steps: [
          "Each \\(\\text{Fe}^{2+}\\) gives 1 electron when it becomes \\(\\text{Fe}^{3+}\\), so 1 mole of \\(\\text{FeSO}_4\\) gives 1 mole of electrons.",
          "In acid each \\(\\text{MnO}_4^-\\) takes 5 electrons.",
          "Moles of \\(\\text{KMnO}_4\\) = \\(\\tfrac{1}{5} = 0.2\\). The full equation is \\(\\text{MnO}_4^- + 5\\text{Fe}^{2+} + 8\\text{H}^+ \\rightarrow \\text{Mn}^{2+} + 5\\text{Fe}^{3+} + 4\\text{H}_2\\text{O}\\).",
        ],
        answer: "0.2 mol",
      },
      selfCheckExample: {
        prompt: "In acid solution, how many moles of \\(\\text{K}_2\\text{Cr}_2\\text{O}_7\\) oxidise 6 moles of \\(\\text{Fe}^{2+}\\) to \\(\\text{Fe}^{3+}\\)?",
        steps: [
          "6 moles of \\(\\text{Fe}^{2+}\\) give 6 moles of electrons.",
          "One \\(\\text{Cr}_2\\text{O}_7^{2-}\\) takes 6 electrons (two Cr atoms, each +6 to +3).",
          "Moles of dichromate = \\(6 / 6 = 1\\).",
        ],
        answer: "1 mol",
      },
      practiceSet: [
        { prompt: "In acid, to what does permanganate oxidise oxalate ions?", answer: "Carbon dioxide, \\(\\text{CO}_2\\)" },
        { prompt: "How many electrons does one dichromate ion take when it is reduced to \\(\\text{Cr}^{3+}\\) in acid?", answer: "6" },
        { prompt: "Why is dilute \\(\\text{H}_2\\text{SO}_4\\), not HCl, used to acidify \\(\\text{KMnO}_4\\) in a titration?", answer: "Permanganate would oxidise HCl to chlorine" },
        { prompt: "To what does acidified dichromate oxidise hydrogen sulphide?", answer: "Sulphur" },
      ],
      pyqExampleId: "e5f58272-3f48-45b6-924e-ec24d4fb3563",
      traps: [
        {
          title: "The solution decides the product",
          body: "In acid permanganate gives \\(\\text{Mn}^{2+}\\) and takes 5 electrons. In a neutral or faintly alkaline solution it gives \\(\\text{MnO}_2\\) and takes 3. Using 5 for a neutral reaction gives every mole ratio wrong.",
        },
        {
          title: "Iodide gives iodine in acid but iodate in neutral solution",
          body: "Acidified permanganate oxidises \\(\\text{I}^-\\) to \\(\\text{I}_2\\). In a neutral or faintly alkaline solution it oxidises \\(\\text{I}^-\\) further, to \\(\\text{IO}_3^-\\).",
        },
        {
          title: "Dichromate has two chromium atoms",
          body: "Each Cr goes from +6 to +3, so one \\(\\text{Cr}_2\\text{O}_7^{2-}\\) takes 6 electrons, not 3.",
        },
      ],
    },
  ],
};
