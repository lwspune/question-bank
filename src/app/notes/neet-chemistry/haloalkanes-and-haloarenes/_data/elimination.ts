import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_HA_ELIMINATION_NOTE: SubtopicNote = {
  subtopicName: "Elimination and Haloarenes",
  title: "Elimination and Haloarenes",
  oneLineDefinition:
    "How alcoholic KOH removes HX from a haloalkane to give the more substituted alkene (Saytzeff rule), how the reagent decides between substitution and elimination, what haloalkanes do with metals, and how haloarenes are made and why they react so differently.",
  whyItMatters:
    "Six NEET questions from 2021 to 2026. Two are on the Saytzeff rule: naming the rule behind pent-2-ene from 2-bromopentane (2021) and the alkene from 2-methylcyclohexan-1-ol after PBr₃ and alcoholic KOH (2024). Two follow a propyl chain through alcoholic KOH and HBr: 1-bromopropane to propan-2-ol with aqueous KOH at the end (Re-NEET 2024), and propan-1-ol through PCl₅ and then HBr with a peroxide (2026). Two ask how haloarenes are made: chlorobenzene from benzene (2022) and the halogen that cannot be put on toluene with iron in the dark (Re-NEET 2024).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchha-saytzeff",
      name: "Dehydrohalogenation and the Saytzeff rule",
      intuition:
        "The carbon that holds the halogen is the α-carbon; the carbons next to it are β-carbons. Alcoholic KOH pulls off a hydrogen from a β-carbon while the halogen leaves from the α-carbon, and a double bond forms between them. When there is more than one kind of β-hydrogen, more than one alkene can form, and the one with more alkyl groups on its double bond wins.",
      definition:
        "- A haloalkane with a **β-hydrogen**, heated with **alcoholic KOH**, loses H from the β-carbon and X from the α-carbon to give an alkene. This is **dehydrohalogenation**, a **β-elimination**.\n" +
        "- **Saytzeff rule:** when more than one alkene can form, the preferred product is the alkene with the **greater number of alkyl groups** attached to the doubly bonded carbon atoms.\n" +
        "- 2-Bromopentane gives pent-2-ene (81%) as the major product and pent-1-ene (19%) as the minor one.\n" +
        "- A haloalkane with no β-hydrogen, such as \\(\\text{CH}_3\\text{Cl}\\), cannot undergo this elimination.",
      formula: {
        label: "Dehydrohalogenation with alcoholic KOH",
        latex: "\\text{R-CH}_2\\text{-CH}_2\\text{-X} + \\text{KOH (alc)} \\xrightarrow{\\Delta} \\text{R-CH=CH}_2 + \\text{KX} + \\text{H}_2\\text{O}",
        symbols: [
          { symbol: "\\(\\text{X}\\)", meaning: "the halogen, lost from the α-carbon" },
          { symbol: "\\(\\text{KOH (alc)}\\)", meaning: "potassium hydroxide in alcohol, acting as a base" },
        ],
      },
      authoredExample: {
        prompt: "2-Bromobutane, CH₃CHBrCH₂CH₃, is heated with alcoholic KOH. Name the major and the minor alkene.",
        steps: [
          "The α-carbon is C-2. Its β-carbons are C-1 and C-3, and both carry hydrogens.",
          "Losing H from C-3 gives \\(\\text{CH}_3\\text{CH=CHCH}_3\\), but-2-ene, with two alkyl groups on the double bond carbons.",
          "Losing H from C-1 gives \\(\\text{CH}_2\\text{=CHCH}_2\\text{CH}_3\\), but-1-ene, with one alkyl group on the double bond carbons.",
          "By the Saytzeff rule the alkene with more alkyl groups on the double bond is preferred.",
        ],
        answer: "Major: but-2-ene; minor: but-1-ene",
      },
      selfCheckExample: {
        prompt: "2-Bromo-2-methylbutane, (CH₃)₂CBrCH₂CH₃, is heated with alcoholic KOH. Which alkene is the major product?",
        steps: [
          "Losing H from C-3 gives \\((\\text{CH}_3)_2\\text{C=CHCH}_3\\), 2-methylbut-2-ene, with three alkyl groups on the double bond carbons.",
          "Losing H from a \\(\\text{CH}_3\\) on C-2 gives \\(\\text{CH}_2\\text{=C(CH}_3)\\text{CH}_2\\text{CH}_3\\), 2-methylbut-1-ene, with two.",
          "The Saytzeff rule picks the alkene with more alkyl groups.",
        ],
        answer: "2-Methylbut-2-ene",
      },
      practiceSet: [
        { prompt: "How many different alkenes can 2-chloro-2-methylpropane, (CH₃)₃CCl, give on dehydrohalogenation?", answer: "One, 2-methylpropene: all its β-hydrogens are equivalent" },
        { prompt: "Why is dehydrohalogenation called a β-elimination?", answer: "The hydrogen is removed from the β-carbon, the carbon next to the one that holds the halogen" },
        { prompt: "Can chloromethane, CH₃Cl, undergo dehydrohalogenation?", answer: "No: it has no β-carbon, so no β-hydrogen" },
        { prompt: "Name the alkene formed when 3-bromopentane, CH₃CH₂CHBrCH₂CH₃, is heated with alcoholic KOH.", answer: "Pent-2-ene: both β-carbons are alike, so only one alkene structure forms" },
      ],
      pyqExampleId: "61814716-525a-475e-9cff-cdf8b10a306c",
      traps: [
        {
          title: "Count alkyl groups on the double bond, not hydrogens removed",
          body: "The Saytzeff product is the alkene whose two doubly bonded carbons carry more alkyl groups in total. It is not the alkene formed by removing the more numerous hydrogens.",
        },
        {
          title: "No β-hydrogen, no elimination",
          body: "Dehydrohalogenation needs a hydrogen on a carbon next to the one that holds X. A halide such as \\(\\text{CH}_3\\text{Cl}\\) has none, so it cannot give an alkene this way.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchha-sub-or-elim",
      name: "Substitution or elimination, and reactions with metals",
      intuition:
        "The same haloalkane can give an alcohol or an alkene, and the reagent decides which. In water, hydroxide acts as a nucleophile and replaces the halogen. In alcohol, with heat, it acts as a base and pulls off a β-hydrogen instead. In a chain of reactions, read the reagent on every arrow before you decide what forms.",
      definition:
        "- **Aqueous KOH** substitutes: the haloalkane gives an **alcohol**.\n" +
        "- **Alcoholic KOH** with heat eliminates: the haloalkane gives an **alkene**.\n" +
        "- Substitution and elimination compete. Primary halides prefer SN2; tertiary halides react by SN1 or elimination. A bulkier nucleophile prefers to act as a base and remove a proton.\n" +
        "- An alkene made this way can take up HBr again: by Markovnikov's rule without a peroxide, the other way round with a peroxide.\n" +
        "- **Grignard reagent:** a haloalkane with magnesium in dry ether gives R-MgX. Any source of protons, even water, turns it into the hydrocarbon R-H, so it is made under dry conditions.\n" +
        "- **Wurtz reaction:** a haloalkane with sodium in dry ether gives an alkane with double the carbons: \\(2\\,\\text{R-X} + 2\\,\\text{Na} \\rightarrow \\text{R-R} + 2\\,\\text{NaX}\\).",
      table: {
        columns: ["Reagent on 1-bromopropane", "What happens", "Product"],
        rows: [
          { cells: ["Aqueous KOH", "Substitution of Br by OH", "Propan-1-ol, \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{OH}\\)"] },
          { cells: ["Alcoholic KOH, heat", "Elimination of HBr", "Propene, \\(\\text{CH}_3\\text{CH=CH}_2\\)"], pyqExampleId: "35c081e8-00ad-408e-a4e4-ec0d2bf36e9f", noteAmber: "Re-NEET 2024: alcoholic KOH, then HBr, then aqueous KOH turned 1-bromopropane into propan-2-ol." },
          { cells: ["KCN", "Substitution of Br by CN", "Butanenitrile, \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CN}\\)"] },
          { cells: ["Mg in dry ether", "Grignard reagent forms", "\\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{MgBr}\\)"] },
          { cells: ["Na in dry ether", "Wurtz coupling", "Hexane, \\(\\text{CH}_3(\\text{CH}_2)_4\\text{CH}_3\\)"] },
        ],
        caption: "Aqueous KOH substitutes; alcoholic KOH eliminates.",
      },
      pyqExampleId: "35c081e8-00ad-408e-a4e4-ec0d2bf36e9f",
      selfCheckExample: {
        prompt: "1-Bromobutane is heated with aqueous KOH in one flask and with alcoholic KOH in another. Name the two organic products.",
        steps: [
          "Aqueous KOH replaces Br by OH: \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{OH}\\).",
          "Alcoholic KOH removes H from C-2 and Br from C-1: \\(\\text{CH}_3\\text{CH}_2\\text{CH=CH}_2\\).",
        ],
        answer: "Butan-1-ol with aqueous KOH; but-1-ene with alcoholic KOH",
      },
      practiceSet: [
        { prompt: "What does ethylmagnesium bromide, CH₃CH₂MgBr, give with water?", answer: "Ethane, \\(\\text{CH}_3\\text{CH}_3\\)" },
        { prompt: "What does bromoethane give with sodium in dry ether?", answer: "Butane (Wurtz reaction)" },
        { prompt: "Why must a Grignard reagent be prepared under dry conditions?", answer: "Water, or any source of protons, turns it into a hydrocarbon" },
        { prompt: "Which prefers SN2 substitution: a primary or a tertiary alkyl halide?", answer: "A primary alkyl halide" },
      ],
      traps: [
        {
          title: "Aqueous KOH substitutes, alcoholic KOH eliminates",
          body: "With aqueous KOH a haloalkane gives an alcohol. With alcoholic KOH and heat it gives an alkene. The word in front of KOH decides the product.",
        },
        {
          title: "Read the condition under HBr",
          body: "HBr adds to propene by Markovnikov's rule to give 2-bromopropane. With a peroxide such as benzoyl peroxide written on the arrow it adds the other way, giving 1-bromopropane.",
        },
        {
          title: "Water destroys a Grignard reagent",
          body: "R-MgX reacts with water to give the hydrocarbon R-H. A Grignard reagent cannot be made or kept in water.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchha-haloarenes",
      name: "Making haloarenes and how they react",
      intuition:
        "On a benzene ring the halogen shares a lone pair with the ring. That gives the C-X bond some double bond character, so it is shorter and harder to break, and a nucleophile pushes it out only under harsh conditions. The same lone pair makes the ring richer in electrons at the ortho and para positions, so electrophiles go there, though more slowly than on benzene.",
      definition:
        "- **Making aryl chlorides and bromides:** an arene with \\(\\text{Cl}_2\\) or \\(\\text{Br}_2\\) and a Lewis acid (iron or \\(\\text{FeCl}_3\\)) in the dark. Toluene gives the ortho and para isomers.\n" +
        "- Iodination is reversible and needs an oxidising agent such as \\(\\text{HNO}_3\\) or \\(\\text{HIO}_4\\). **Fluoroarenes are not made this way**, because fluorine is too reactive.\n" +
        "- A diazonium salt with \\(\\text{Cu}_2\\text{Cl}_2\\) or \\(\\text{Cu}_2\\text{Br}_2\\) gives the aryl chloride or bromide (Sandmeyer reaction); with KI it gives the aryl iodide.\n" +
        "- **Haloarenes resist nucleophilic substitution**: resonance gives the C-X bond partial double bond character; the \\(sp^2\\) carbon makes the bond shorter (C-Cl 169 pm in chlorobenzene, 177 pm in a haloalkane) and stronger; the phenyl cation is not stabilised by resonance, so SN1 cannot happen; and the electron-rich ring repels the nucleophile.\n" +
        "- Chlorobenzene gives phenol only with NaOH at 623 K and 300 atm. A **nitro group at the ortho or para position** makes this much easier; at the meta position it has no such effect.\n" +
        "- **Electrophilic substitution:** the halogen slightly **deactivates** the ring but directs incoming groups **ortho and para**.\n" +
        "- **Wurtz-Fittig:** ArX + RX + Na in dry ether gives Ar-R. **Fittig:** two ArX with Na give Ar-Ar.",
      table: {
        columns: ["Reaction", "Reagents", "Product"],
        rows: [
          { cells: ["Chlorination of benzene", "\\(\\text{Cl}_2\\), anhydrous \\(\\text{FeCl}_3\\), dark", "Chlorobenzene"], pyqExampleId: "0856cb79-e2f5-4f9e-be18-c47c36de45c0", noteAmber: "NEET 2022: benzene with Cl₂ and anhydrous FeCl₃ was the route to chlorobenzene." },
          { cells: ["Halogenation of toluene", "\\(\\text{Cl}_2\\) or \\(\\text{Br}_2\\), Fe, dark", "2-Halotoluene and 4-halotoluene; not used for fluorine"], pyqExampleId: "582d4c39-f79d-4531-8a2d-d26f15dc305f", noteAmber: "Re-NEET 2024: the method fails for X = F, because fluorine is too reactive." },
          { cells: ["Sandmeyer reaction", "Benzenediazonium chloride with \\(\\text{Cu}_2\\text{Cl}_2\\)", "Chlorobenzene"] },
          { cells: ["Replacement by OH", "Chlorobenzene with NaOH, 623 K, 300 atm, then acid", "Phenol"] },
          { cells: ["Chlorination of chlorobenzene", "\\(\\text{Cl}_2\\), anhydrous \\(\\text{FeCl}_3\\)", "1,2-Dichlorobenzene and 1,4-dichlorobenzene (major)"] },
          { cells: ["Nitration of chlorobenzene", "Concentrated \\(\\text{HNO}_3\\) and concentrated \\(\\text{H}_2\\text{SO}_4\\)", "1-Chloro-2-nitrobenzene and 1-chloro-4-nitrobenzene (major)"] },
          { cells: ["Friedel-Crafts alkylation", "Chlorobenzene with \\(\\text{CH}_3\\text{Cl}\\), anhydrous \\(\\text{AlCl}_3\\)", "1-Chloro-2-methylbenzene and 1-chloro-4-methylbenzene"] },
          { cells: ["Wurtz-Fittig reaction", "Chlorobenzene with \\(\\text{CH}_3\\text{Cl}\\) and Na in dry ether", "Toluene"] },
          { cells: ["Fittig reaction", "Chlorobenzene with Na in dry ether", "Biphenyl"] },
        ],
        caption: "On the ring the halogen is hard to replace, and it sends new groups to the ortho and para positions.",
      },
      pyqExampleId: "582d4c39-f79d-4531-8a2d-d26f15dc305f",
      selfCheckExample: {
        prompt: "Chlorobenzene needs NaOH at 623 K and 300 atm to give phenol, but 1-chloro-4-nitrobenzene reacts far more easily. Why?",
        steps: [
          "In chlorobenzene the C-Cl bond has partial double bond character and the ring repels the nucleophile, so the substitution is very hard.",
          "A nitro group at the para position pulls electrons out of the ring, which makes the attack of \\(\\text{OH}^-\\) easier.",
          "This help comes only from a nitro group at the ortho or para position.",
        ],
        answer: "The para nitro group withdraws electrons from the ring and makes nucleophilic substitution easier",
      },
      practiceSet: [
        { prompt: "Does a chlorine atom on a benzene ring direct an incoming electrophile to the ortho and para positions or to the meta position?", answer: "Ortho and para, even though it slightly deactivates the ring" },
        { prompt: "What does chlorobenzene give with methyl chloride and sodium in dry ether?", answer: "Toluene (Wurtz-Fittig reaction)" },
        { prompt: "Which C-Cl bond is shorter: the one in chlorobenzene or the one in a haloalkane?", answer: "The one in chlorobenzene: 169 pm against 177 pm" },
        { prompt: "What are the products when chlorobenzene is nitrated with concentrated HNO₃ and H₂SO₄?", answer: "1-Chloro-2-nitrobenzene and 1-chloro-4-nitrobenzene, the para isomer being major" },
      ],
      traps: [
        {
          title: "Iodine and fluorine do not go on like chlorine and bromine",
          body: "Ring iodination is reversible and needs an oxidising agent to remove HI. Fluorine reacts too violently, so fluoroarenes are not made by direct halogenation with a Lewis acid.",
        },
        {
          title: "Deactivating, yet ortho and para directing",
          body: "A halogen on the ring makes electrophilic substitution slower than in benzene, but the groups that do enter go to the ortho and para positions, not meta.",
        },
        {
          title: "A nitro group helps only at ortho or para",
          body: "A nitro group at the ortho or para position makes a haloarene much easier to substitute with \\(\\text{OH}^-\\). At the meta position it has no such effect.",
        },
        {
          title: "Aryl halides do not react by SN1",
          body: "Losing the halide would leave a phenyl cation, which is not stabilised by resonance. So aryl halides do not ionise the way tertiary, allylic and benzylic halides do.",
        },
      ],
    },
  ],
};
