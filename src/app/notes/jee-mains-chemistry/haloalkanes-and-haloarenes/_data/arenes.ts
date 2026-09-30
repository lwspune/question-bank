import type { SubtopicNote } from "@/app/notes/_types";

export const ARENES_HALO_NOTE: SubtopicNote = {
  subtopicName: "Haloarenes and Reactions with Metals",
  title: "Haloarenes and Reactions with Metals",
  oneLineDefinition:
    "A haloarene resists nucleophiles until nitro groups ortho or para to the halogen stabilise the intermediate anion, while its halogen slows electrophilic substitution yet directs it ortho and para; with magnesium an organic halide gives a Grignard reagent, and with sodium it couples.",
  whyItMatters:
    "Ten PYQs, all multiple choice, none from 2026. Seven are about the ring: how nitro groups speed up nucleophilic substitution, which halogen is replaced, and where an electrophile goes on chlorobenzene; three put a halide through magnesium or sodium.",
  concepts: [
    // C1 — substitution on the haloarene ring
    {
      kind: "formula" as const,
      slug: "jchalo-snar",
      name: "Substitution on the haloarene ring: nucleophilic and electrophilic",
      intuition:
        "A nucleophile cannot push out the halogen of chlorobenzene by SN1 or SN2. It can, however, add to the ring carbon if the negative charge that builds up has somewhere to go. A nitro group ortho or para to the halogen takes that charge onto its oxygens (the Meisenheimer intermediate), and then the halide leaves. Each extra ortho or para nitro group makes this easier. Electrophiles are a different story: the halogen withdraws electrons and slows them, but its lone pair still steers them ortho and para.",
      definition:
        "- Aryl halides are unreactive to ordinary substitution because the C–X bond has partial double-bond character, the carbon is sp², a phenyl cation is very unstable, and the electron-rich ring repels an incoming nucleophile.\n" +
        "- Chlorobenzene with NaOH needs 623 K and 300 atm (Dow process). One nitro para to Cl lowers this to 443 K; nitro groups at 2 and 4 to 368 K; at 2, 4 and 6 warm water is enough.\n" +
        "- A meta nitro group cannot take the charge by resonance and helps only a little, through its −I effect. Donors such as \\(\\mathrm{OCH_3}\\) and \\(\\mathrm{CH_3}\\) slow the reaction further.\n" +
        "- When a ring carries two halogens, the one ortho or para to the nitro group is the one replaced.\n" +
        "- **Electrophilic substitution**: halogens deactivate the ring (−I) but direct ortho and para (+R), with para usually major. Chlorobenzene gives mainly 1-chloro-4-nitrobenzene on nitration, 4-chlorobenzenesulphonic acid on sulphonation, 1-chloro-4-methylbenzene with \\(\\mathrm{CH_3Cl/AlCl_3}\\), and 4-chloroacetophenone with \\(\\mathrm{CH_3COCl/AlCl_3}\\).",
      formula: {
        label: "Chlorobenzene to phenol (Dow process)",
        latex:
          "\\mathrm{C_6H_5Cl \\xrightarrow[\\text{(ii) } H^+]{\\text{(i) NaOH, 623 K, 300 atm}} C_6H_5OH}",
      },
      authoredExample: {
        prompt: "1,4-Dichloro-2-nitrobenzene is heated with sodium methoxide. Which chlorine is replaced? Name the product.",
        steps: [
          "The nitro group is on C-2. The chlorine on C-1 is ortho to it; the chlorine on C-4 is meta to it.",
          "Methoxide adds to C-1, and the negative charge of the intermediate reaches the nitro group by resonance. Attack at C-4 would put the charge only on carbons that do not carry the nitro group.",
          "So the C-1 chlorine is replaced by \\(\\mathrm{OCH_3}\\).",
        ],
        answer: "The chlorine ortho to the nitro group; the product is 4-chloro-1-methoxy-2-nitrobenzene.",
      },
      selfCheckExample: {
        prompt: "Arrange for reaction with aqueous NaOH: 1-bromo-3-nitrobenzene, 1-bromo-2-nitrobenzene and 4-bromotoluene.",
        steps: [
          "An ortho nitro group stabilises the anionic intermediate by resonance: fastest.",
          "A meta nitro group helps only through −I: slower.",
          "A methyl group donates electrons and makes the intermediate less stable: slowest.",
        ],
        answer: "1-Bromo-2-nitrobenzene > 1-bromo-3-nitrobenzene > 4-bromotoluene",
      },
      practiceSet: [
        { prompt: "What is the major product of chlorobenzene with \\(\\mathrm{CH_3Cl}\\) and anhydrous \\(\\mathrm{AlCl_3}\\)?", answer: "1-Chloro-4-methylbenzene" },
        { prompt: "Does chlorobenzene undergo nitration faster or slower than benzene?", answer: "Slower: chlorine deactivates the ring by its −I effect" },
        { prompt: "Why does a meta nitro group barely help nucleophilic substitution of an aryl halide?", answer: "The negative charge of the intermediate cannot reach the meta position by resonance" },
        { prompt: "What does 1-fluoro-4-nitrobenzene give with sodium methoxide?", answer: "1-Methoxy-4-nitrobenzene (4-nitroanisole)" },
      ],
      pyqExampleId: "88f309dd-bed9-4603-a7ed-363c7007c2a2", // 2021 — chlorobenzene with 0 to 3 nitro groups
      traps: [
        {
          title: "Halogens deactivate yet direct ortho and para",
          body: "A halogen on benzene makes electrophilic substitution slower than on benzene itself (−I), but its lone pair places the new group ortho or para (+R). Deactivating does not mean meta-directing here.",
        },
        {
          title: "Aryl substitution is neither SN1 nor SN2",
          body: "The nucleophile adds to the ring to give an anionic intermediate and the halide then leaves. There is no backside attack and no aryl cation.",
        },
      ],
    },

    // C2 — reactions with metals
    {
      kind: "reference" as const,
      slug: "jchalo-metals",
      name: "Reactions of organic halides with magnesium and sodium",
      intuition:
        "Magnesium slips into the C–X bond in dry ether and turns the carbon into a strong nucleophile and base: a Grignard reagent. Any acidic hydrogen, even from water, then replaces the magnesium, so the ether must be dry. Sodium does something else: it joins two carbon groups together, which is the Wurtz family of couplings.",
      definition:
        "- \\(\\mathrm{R{-}X + Mg \\xrightarrow{\\text{dry ether}} R{-}MgX}\\). Vinylic and aryl bromides also form Grignard reagents.\n" +
        "- \\(\\mathrm{R{-}MgX + H_2O \\to R{-}H + Mg(OH)X}\\); with \\(\\mathrm{D_2O}\\) the product is R–D, with D on the carbon that held X.\n" +
        "- Excess magnesium reacts at every C–X bond, so a dibromide gives a di-Grignard reagent in the first step.\n" +
        "- **Wurtz**: \\(\\mathrm{2R{-}X + 2Na \\to R{-}R + 2NaX}\\) in dry ether. Two different alkyl halides give a mixture of three alkanes.\n" +
        "- A 1,3-dihalide with Na or Zn closes a ring and gives a cyclopropane.\n" +
        "- **Wurtz-Fittig** (ArX + RX → Ar–R) and **Fittig** (2 ArX → Ar–Ar) use sodium in dry ether as well.",
      table: {
        columns: ["Reactants", "Conditions", "Product", "Name"],
        rows: [
          { cells: ["R–X + Mg", "Dry ether", "R–MgX", "Grignard reagent"] },
          { cells: ["R–MgX + \\(\\mathrm{H_2O}\\)", "Any trace of water", "R–H + Mg(OH)X", "Hydrolysis: the reason the ether must be dry"] },
          { cells: ["R–MgX + \\(\\mathrm{D_2O}\\)", "Heavy water", "R–D", "Deuterium labelling at the old C–X carbon"] },
          { cells: ["A dibromide + excess Mg", "Dry ether", "Both C–Br become C–MgBr", "Di-Grignard reagent"] },
          { cells: ["2 R–X + 2 Na", "Dry ether", "R–R", "Wurtz reaction"] },
          { cells: ["\\(\\mathrm{BrCH_2CH_2CH_2Br}\\) + Zn or Na", "Heat", "Cyclopropane", "Ring closure (intramolecular Wurtz)"] },
          { cells: ["ArX + RX + 2 Na", "Dry ether", "Ar–R", "Wurtz-Fittig reaction"] },
          { cells: ["2 ArX + 2 Na", "Dry ether", "Ar–Ar", "Fittig reaction"] },
        ],
        caption: "Magnesium makes a carbon nucleophile; sodium joins two carbon groups.",
      },
      selfCheckExample: {
        prompt: "Bromobenzene is converted to its Grignard reagent, which is then shaken with \\(\\mathrm{D_2O}\\). What is the product?",
        steps: [
          "Mg in dry ether gives \\(\\mathrm{C_6H_5MgBr}\\).",
          "\\(\\mathrm{D_2O}\\) supplies D to the carbon that held magnesium.",
        ],
        answer: "\\(\\mathrm{C_6H_5D}\\) (deuteriobenzene)",
      },
      practiceSet: [
        { prompt: "What does \\(\\mathrm{CH_3CH_2MgBr}\\) give with water?", answer: "Ethane" },
        { prompt: "What does 1-bromopropane give with sodium in dry ether?", answer: "Hexane" },
        { prompt: "Why must the ether be dry when a Grignard reagent is made?", answer: "Water converts R–MgX to R–H" },
        { prompt: "What does chlorobenzene give with methyl chloride and sodium in dry ether?", answer: "Toluene (Wurtz-Fittig)" },
      ],
      pyqExampleId: "1f7786c3-d84d-433d-ad4f-7b1914b0cc9e", // 2021 — first step of a dibromide with excess Mg
      traps: [
        {
          title: "Two different halides give a mixture in the Wurtz reaction",
          body: "\\(\\mathrm{CH_3Br}\\) and \\(\\mathrm{C_2H_5Br}\\) with sodium give ethane, propane and butane together. The Wurtz reaction is useful only for symmetric alkanes.",
        },
        {
          title: "Water is not the only thing that destroys a Grignard reagent",
          body: "Any compound with an acidic hydrogen, such as an alcohol, an amine or water, converts R–MgX into R–H. A Grignard reagent cannot be made from a halide that also carries an OH or NH₂ group.",
        },
      ],
    },
  ],
};
