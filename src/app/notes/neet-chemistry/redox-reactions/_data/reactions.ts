import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_RR_REACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Types and Balancing of Redox Reactions",
  title: "Types and Balancing of Redox Reactions",
  oneLineDefinition:
    "The types of redox reaction (combination, decomposition, displacement, disproportionation and its reverse), balancing a redox equation by the half-reaction and oxidation number methods in acid and in base, and using the electron balance in a redox titration.",
  whyItMatters:
    "Three NEET questions from 2021 to 2026. One picks the metal displacement reaction out of four (2021), one balances dichromate with sulphite in acid to find three coefficients (2023), and one finds the molarity of a KMnO₄ solution from its titration with oxalic acid (Re-NEET 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchrr-types",
      name: "Types of redox reactions",
      intuition:
        "Most redox reactions fit one of a few patterns. Things join (combination), a compound breaks up (decomposition), a free element pushes another element out of a compound (displacement), or one element in a single oxidation state goes both up and down at once (disproportionation). To name the pattern, write the oxidation numbers over each element and see which ones change, and how.",
      definition:
        "- **Combination:** two or more substances join into one, and at least one of them is a free element.\n" +
        "- **Decomposition:** a compound breaks into parts, at least one of which is a free element. Not every decomposition is redox: in \\(\\text{CaCO}_3 \\rightarrow \\text{CaO} + \\text{CO}_2\\), no oxidation number changes.\n" +
        "- **Metal displacement:** a metal in a compound is replaced by another metal set free. A more reactive metal pushes out a less reactive one; which metal displaces which follows the electrochemical series, taught in the Electrochemistry notes.\n" +
        "- **Non-metal displacement:** hydrogen or a halogen is set free. A reactive metal sets hydrogen free from an acid or from water, and a halogen sets free a less reactive halogen from its salt.\n" +
        "- **Disproportionation:** one element, in one oxidation state, is oxidised and reduced in the same reaction. The element must be able to take at least three oxidation states. Fluorine cannot do this, because it never takes a positive oxidation number, and \\(\\text{ClO}_4^-\\) cannot, because chlorine there is already at its highest state, +7.\n" +
        "- **Comproportionation:** the reverse of disproportionation. The same element in two different states ends up in one state between them.",
      table: {
        columns: ["Type", "What happens", "Example"],
        rows: [
          { cells: ["Combination", "Substances join; at least one is an element", "3Mg + N₂ → Mg₃N₂"] },
          { cells: ["Decomposition", "A compound breaks up; at least one part is an element", "2KClO₃ → 2KCl + 3O₂"] },
          { cells: ["Metal displacement", "A metal sets free another metal from its compound", "Cr₂O₃ + 2Al → Al₂O₃ + 2Cr"], noteAmber: "NEET 2021: Cr₂O₃ + 2Al → Al₂O₃ + 2Cr is the metal displacement. Fe + 2HCl → FeCl₂ + H₂ sets free hydrogen, a non-metal." },
          { cells: ["Hydrogen displacement", "A metal sets free hydrogen from an acid or water", "Fe + 2HCl → FeCl₂ + H₂"] },
          { cells: ["Halogen displacement", "A halogen sets free a less reactive halogen", "Cl₂ + 2KBr → 2KCl + Br₂"] },
          { cells: ["Disproportionation", "One element in one state goes both up and down", "2H₂O₂ → 2H₂O + O₂ (O: −1 to −2 and 0)"] },
          { cells: ["Comproportionation", "One element in two states meets in a middle state", "2H₂S + SO₂ → 3S + 2H₂O (S: −2 and +4 to 0)"] },
        ],
      },
      pyqExampleId: "50121179-649b-43a1-9533-c43d3e60fe04",
      selfCheckExample: {
        prompt:
          "Name the type of \\(\\text{Cl}_2 + 2\\text{OH}^- \\rightarrow \\text{Cl}^- + \\text{ClO}^- + \\text{H}_2\\text{O}\\) and give the oxidation numbers of chlorine.",
        steps: [
          "Chlorine starts at 0 in \\(\\text{Cl}_2\\).",
          "It ends at \\(-1\\) in \\(\\text{Cl}^-\\) and at +1 in \\(\\text{ClO}^-\\).",
          "One element in one state is both reduced and oxidised.",
        ],
        answer: "Disproportionation: chlorine goes from 0 to \\(-1\\) and to +1",
      },
      practiceSet: [
        { prompt: "Is \\(\\text{CaCO}_3 \\rightarrow \\text{CaO} + \\text{CO}_2\\) a redox reaction?", answer: "No: calcium stays +2, carbon +4 and oxygen \\(-2\\)" },
        { prompt: "Name the type of redox reaction: \\(\\text{Cl}_2 + 2\\text{KI} \\rightarrow 2\\text{KCl} + \\text{I}_2\\).", answer: "Non-metal (halogen) displacement" },
        { prompt: "Name the type of redox reaction: \\(\\text{C} + \\text{O}_2 \\rightarrow \\text{CO}_2\\).", answer: "Combination" },
        { prompt: "Why does fluorine not undergo disproportionation?", answer: "It never takes a positive oxidation number, so it cannot be oxidised and reduced at once" },
      ],
      traps: [
        {
          title: "Setting hydrogen free is non-metal displacement",
          body: "In \\(\\text{Fe} + 2\\text{HCl} \\rightarrow \\text{FeCl}_2 + \\text{H}_2\\), a metal reacts, but the element set free is hydrogen, a non-metal. A metal displacement sets free a metal, as in \\(\\text{Cr}_2\\text{O}_3 + 2\\text{Al} \\rightarrow \\text{Al}_2\\text{O}_3 + 2\\text{Cr}\\).",
        },
        {
          title: "Disproportionation needs the same element going both ways",
          body: "In \\(2\\text{KClO}_3 \\rightarrow 2\\text{KCl} + 3\\text{O}_2\\), chlorine is reduced (+5 to \\(-1\\)) and oxygen is oxidised (\\(-2\\) to 0). Two different elements change, so it is a decomposition, not a disproportionation.",
        },
        {
          title: "Not every decomposition is redox",
          body: "\\(\\text{CaCO}_3 \\rightarrow \\text{CaO} + \\text{CO}_2\\) is a decomposition, but every element keeps its oxidation number, so it is not a redox reaction.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchrr-balancing",
      name: "Balancing redox equations",
      intuition:
        "In a balanced redox equation the electrons given up by the reducing agent are exactly the electrons taken by the oxidising agent. Both balancing methods rest on this. The half-reaction method writes the oxidation and the reduction separately, balances each, then multiplies them so their electrons match. The oxidation number method counts the rise and the fall in oxidation number and makes them equal.",
      definition:
        "**Half-reaction method, in acid:**\n" +
        "- Split the reaction into an oxidation half and a reduction half.\n" +
        "- In each half, balance the atoms other than O and H.\n" +
        "- Balance O by adding \\(\\text{H}_2\\text{O}\\), then balance H by adding \\(\\text{H}^+\\).\n" +
        "- Balance the charge by adding electrons.\n" +
        "- Multiply the halves so the electrons lost equal the electrons gained, add them, and cancel what appears on both sides.\n" +
        "- **In base:** after balancing as in acid, add as many \\(\\text{OH}^-\\) as there are \\(\\text{H}^+\\) to both sides. Each \\(\\text{H}^+\\) and \\(\\text{OH}^-\\) pair makes one \\(\\text{H}_2\\text{O}\\).\n" +
        "- **Oxidation number method:** find the atoms whose oxidation numbers change, multiply so the total rise equals the total fall, then balance O, H and charge the same way.\n" +
        "- Check at the end that every atom and the total charge balance.",
      formula: {
        label: "Electron balance",
        latex: "\\text{electrons lost in oxidation} = \\text{electrons gained in reduction}, \\qquad e^- \\text{ in a half-reaction} = \\Delta(\\text{oxidation number}) \\times \\text{atoms that change}",
        symbols: [
          { symbol: "\\(e^-\\)", meaning: "electrons written in a half-reaction" },
          { symbol: "\\(\\Delta\\)", meaning: "the change in oxidation number of one atom" },
        ],
      },
      authoredExample: {
        prompt: "Balance \\(\\text{MnO}_4^- + \\text{Fe}^{2+} \\rightarrow \\text{Mn}^{2+} + \\text{Fe}^{3+}\\) in acid.",
        steps: [
          "Reduction: manganese falls from +7 to +2. \\(\\text{MnO}_4^- + 8\\text{H}^+ + 5e^- \\rightarrow \\text{Mn}^{2+} + 4\\text{H}_2\\text{O}\\).",
          "Oxidation: \\(\\text{Fe}^{2+} \\rightarrow \\text{Fe}^{3+} + e^-\\). Multiply by 5 to give 5 electrons.",
          "Add: \\(\\text{MnO}_4^- + 5\\text{Fe}^{2+} + 8\\text{H}^+ \\rightarrow \\text{Mn}^{2+} + 5\\text{Fe}^{3+} + 4\\text{H}_2\\text{O}\\).",
          "Check the charge: left \\(-1 + 10 + 8 = +17\\), right \\(+2 + 15 = +17\\).",
        ],
        answer: "\\(\\text{MnO}_4^- + 5\\text{Fe}^{2+} + 8\\text{H}^+ \\rightarrow \\text{Mn}^{2+} + 5\\text{Fe}^{3+} + 4\\text{H}_2\\text{O}\\)",
      },
      selfCheckExample: {
        prompt:
          "Balance \\(\\text{MnO}_4^- + \\text{I}^- \\rightarrow \\text{MnO}_2 + \\text{IO}_3^-\\) in basic solution.",
        steps: [
          "Manganese falls from +7 to +4 (gains 3 electrons). Iodine rises from \\(-1\\) to +5 (loses 6). So two \\(\\text{MnO}_4^-\\) are needed for each \\(\\text{I}^-\\).",
          "\\(2\\text{MnO}_4^- + \\text{I}^- \\rightarrow 2\\text{MnO}_2 + \\text{IO}_3^-\\). Charge: left \\(-3\\), right \\(-1\\).",
          "In base, add 2 \\(\\text{OH}^-\\) on the right to make the charges equal, then 1 \\(\\text{H}_2\\text{O}\\) on the left to balance H and O.",
          "\\(2\\text{MnO}_4^- + \\text{I}^- + \\text{H}_2\\text{O} \\rightarrow 2\\text{MnO}_2 + \\text{IO}_3^- + 2\\text{OH}^-\\). Oxygen: 9 on each side.",
        ],
        answer: "\\(2\\text{MnO}_4^- + \\text{I}^- + \\text{H}_2\\text{O} \\rightarrow 2\\text{MnO}_2 + \\text{IO}_3^- + 2\\text{OH}^-\\)",
      },
      practiceSet: [
        { prompt: "Balance the half-reaction \\(\\text{NO}_3^- \\rightarrow \\text{NO}\\) in acid. How many electrons does it take?", answer: "3: \\(\\text{NO}_3^- + 4\\text{H}^+ + 3e^- \\rightarrow \\text{NO} + 2\\text{H}_2\\text{O}\\)" },
        { prompt: "Balance \\(\\text{Cu} + \\text{NO}_3^- \\rightarrow \\text{Cu}^{2+} + \\text{NO}\\) in acid. What is the coefficient of \\(\\text{H}^+\\)?", answer: "8: \\(3\\text{Cu} + 2\\text{NO}_3^- + 8\\text{H}^+ \\rightarrow 3\\text{Cu}^{2+} + 2\\text{NO} + 4\\text{H}_2\\text{O}\\)" },
        { prompt: "Balance \\(\\text{Fe}^{2+} + \\text{H}_2\\text{O}_2 \\rightarrow \\text{Fe}^{3+} + \\text{H}_2\\text{O}\\) in acid. How many \\(\\text{Fe}^{2+}\\) react with one \\(\\text{H}_2\\text{O}_2\\)?", answer: "2: \\(2\\text{Fe}^{2+} + \\text{H}_2\\text{O}_2 + 2\\text{H}^+ \\rightarrow 2\\text{Fe}^{3+} + 2\\text{H}_2\\text{O}\\)" },
        { prompt: "In basic solution, \\(\\text{Cl}_2\\) changes to \\(\\text{Cl}^-\\) and \\(\\text{ClO}_3^-\\). In the balanced equation, what is the ratio of \\(\\text{Cl}^-\\) to \\(\\text{ClO}_3^-\\)?", answer: "5 : 1, from \\(3\\text{Cl}_2 + 6\\text{OH}^- \\rightarrow 5\\text{Cl}^- + \\text{ClO}_3^- + 3\\text{H}_2\\text{O}\\)" },
      ],
      pyqExampleId: "1387bcb2-e8bb-430f-bee9-ec781fbd2ea5",
      traps: [
        {
          title: "Balance oxygen with water, not with oxygen gas",
          body: "In a half-reaction, missing oxygen atoms are made up with \\(\\text{H}_2\\text{O}\\), and the hydrogen this brings is then balanced with \\(\\text{H}^+\\) (or, in base, finished off with \\(\\text{OH}^-\\)). Writing \\(\\text{O}_2\\) adds a substance that is not in the reaction.",
        },
        {
          title: "Match the electrons before adding",
          body: "\\(\\text{Fe}^{2+} \\rightarrow \\text{Fe}^{3+}\\) gives 1 electron and \\(\\text{MnO}_4^- \\rightarrow \\text{Mn}^{2+}\\) takes 5, so the iron half must be multiplied by 5 before the halves are added.",
        },
        {
          title: "No H+ in a basic-medium answer",
          body: "In basic solution the final equation carries \\(\\text{OH}^-\\) and \\(\\text{H}_2\\text{O}\\), never \\(\\text{H}^+\\). Convert each \\(\\text{H}^+\\) by adding the same number of \\(\\text{OH}^-\\) to both sides.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchrr-titration",
      name: "Redox titrations",
      intuition:
        "In a redox titration an oxidising agent is added from the burette until it has used up a reducing agent, or the other way round. At the end point the electrons given equal the electrons taken. So the useful number for each substance is how many electrons one formula unit gives or takes, often called its n-factor. Multiply it by the moles used, set the two sides equal, and the unknown falls out.",
      definition:
        "- At the end point: (electrons per formula unit) × molarity × volume is the same for both solutions.\n" +
        "- \\(\\text{KMnO}_4\\) in acid: \\(\\text{MnO}_4^- \\rightarrow \\text{Mn}^{2+}\\), manganese falls from +7 to +2, so **n = 5**. In basic solution it stops at \\(\\text{MnO}_2\\) (+4), so n = 3.\n" +
        "- \\(\\text{K}_2\\text{Cr}_2\\text{O}_7\\) in acid: \\(\\text{Cr}_2\\text{O}_7^{2-} \\rightarrow 2\\text{Cr}^{3+}\\), two chromiums each fall by 3, so **n = 6**.\n" +
        "- Oxalic acid or the oxalate ion: \\(\\text{C}_2\\text{O}_4^{2-} \\rightarrow 2\\text{CO}_2\\), two carbons each rise from +3 to +4, so **n = 2**.\n" +
        "- \\(\\text{Fe}^{2+} \\rightarrow \\text{Fe}^{3+}\\): **n = 1**. \\(\\text{H}_2\\text{O}_2 \\rightarrow \\text{O}_2\\): two oxygens each rise from \\(-1\\) to 0, so **n = 2**.\n" +
        "- \\(\\text{KMnO}_4\\) is its own indicator: its purple colour vanishes as it reacts, and the first drop in excess leaves a lasting pale pink. Dichromate is not, so an indicator such as diphenylamine is added, which turns an intense blue just after the end point.",
      formula: {
        label: "Electron balance in a titration",
        latex: "n_1 M_1 V_1 = n_2 M_2 V_2",
        symbols: [
          { symbol: "\\(n\\)", meaning: "electrons given or taken by one formula unit (the n-factor)" },
          { symbol: "\\(M\\)", meaning: "molarity of the solution" },
          { symbol: "\\(V\\)", meaning: "volume of the solution used" },
        ],
      },
      authoredExample: {
        prompt:
          "20 mL of 0.1 M \\(\\text{FeSO}_4\\) is titrated in acid with 0.02 M \\(\\text{KMnO}_4\\). What volume of \\(\\text{KMnO}_4\\) is needed?",
        steps: [
          "For \\(\\text{Fe}^{2+}\\), n = 1. For \\(\\text{KMnO}_4\\) in acid, n = 5.",
          "\\(1 \\times 0.1 \\times 20 = 5 \\times 0.02 \\times V\\), so \\(2 = 0.1V\\) and \\(V = 20\\) mL.",
          "Check by moles: 2 mmol of \\(\\text{Fe}^{2+}\\) need \\(\\tfrac{2}{5} = 0.4\\) mmol of \\(\\text{MnO}_4^-\\), which is \\(0.4 / 0.02 = 20\\) mL.",
        ],
        answer: "20 mL",
      },
      selfCheckExample: {
        prompt:
          "What volume of 0.1 M \\(\\text{K}_2\\text{Cr}_2\\text{O}_7\\) oxidises 30 mL of 0.2 M \\(\\text{Fe}^{2+}\\) in acid?",
        steps: [
          "For dichromate, n = 6. For \\(\\text{Fe}^{2+}\\), n = 1.",
          "\\(6 \\times 0.1 \\times V = 1 \\times 0.2 \\times 30\\), so \\(0.6V = 6\\) and \\(V = 10\\) mL.",
        ],
        answer: "10 mL",
      },
      practiceSet: [
        { prompt: "What is the n-factor of \\(\\text{K}_2\\text{Cr}_2\\text{O}_7\\) when it is reduced to \\(\\text{Cr}^{3+}\\) in acid?", answer: "6" },
        { prompt: "What is the n-factor of \\(\\text{KMnO}_4\\) in basic solution, where it is reduced to \\(\\text{MnO}_2\\)?", answer: "3" },
        { prompt: "How many electrons does one \\(\\text{H}_2\\text{O}_2\\) molecule give when it is oxidised to \\(\\text{O}_2\\)?", answer: "2" },
        { prompt: "Why does a titration with \\(\\text{KMnO}_4\\) in acid need no separate indicator?", answer: "Its purple colour disappears as it reacts, and the first drop in excess leaves a lasting pale pink" },
      ],
      pyqExampleId: "7d451a6b-170a-47e7-85cf-6238aedb5e86",
      traps: [
        {
          title: "Equal volumes do not mean equal molarities",
          body: "Electrons balance, not moles. With equal volumes, \\(n_1 M_1 = n_2 M_2\\), so the solution whose formula unit gives or takes more electrons has the lower molarity.",
        },
        {
          title: "Dichromate takes six electrons, not three",
          body: "Each chromium in \\(\\text{Cr}_2\\text{O}_7^{2-}\\) falls by 3, from +6 to +3, but there are two of them, so one dichromate ion takes 6 electrons.",
        },
        {
          title: "The n-factor of permanganate depends on the medium",
          body: "In acid \\(\\text{MnO}_4^-\\) becomes \\(\\text{Mn}^{2+}\\) and takes 5 electrons. In basic solution it becomes \\(\\text{MnO}_2\\) and takes only 3.",
        },
      ],
    },
  ],
};
