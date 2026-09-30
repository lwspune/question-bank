import type { SubtopicNote } from "@/app/notes/_types";

export const PHENOL_NAMED_ALC_NOTE: SubtopicNote = {
  subtopicName: "Preparation of Phenols and Named Reactions",
  title: "Preparation of Phenols and Named Reactions",
  oneLineDefinition:
    "Phenol is made from chlorobenzene, benzenesulphonic acid, a diazonium salt or cumene, and it is recognised by its named reactions: zinc dust gives benzene, chromic acid gives benzoquinone, Reimer–Tiemann gives salicylaldehyde and Kolbe gives salicylic acid.",
  whyItMatters:
    "Eighteen PYQs, sixteen of them multiple choice, and two from 2026. Seven ask how phenol is made, including a step-yield calculation and the cumene process with its hydroperoxide. Eleven test the named reactions: five on Reimer–Tiemann alone (its reagent, its intermediate, ortho against para), four are match lists of reagents and products, one is on zinc dust and one asks why HCl cannot replace the phenolic OH.",
  concepts: [
    // C1 — sources of phenol
    {
      kind: "reference" as const,
      slug: "jcalc-phenol-sources",
      name: "Four ways to make phenol",
      intuition:
        "An OH has to be put on a benzene ring. A chlorine or a sulphonic acid group can be pushed off by hydroxide, but only under harsh conditions. A diazonium group leaves easily as nitrogen gas. Cumene is oxidised by air to a hydroperoxide, which splits in acid into phenol and acetone.",
      definition:
        "- **From chlorobenzene (Dow)**: fuse with NaOH at 623 K and about 300 atm, then acidify. The C–Cl bond has partial double-bond character, hence the harsh conditions.\n" +
        "- **From benzenesulphonic acid**: benzene + oleum gives \\(\\mathrm{C_6H_5SO_3H}\\); fusion with NaOH and then acid gives phenol.\n" +
        "- **From a diazonium salt**: aniline with \\(\\mathrm{NaNO_2}\\)/HCl at 273–278 K gives \\(\\mathrm{C_6H_5N_2^+Cl^-}\\), which warm water hydrolyses to phenol.\n" +
        "- **From cumene**: air oxidises cumene to cumene hydroperoxide, \\(\\mathrm{C_6H_5C(CH_3)_2OOH}\\); dilute acid splits it into phenol and propanone.\n" +
        "- For a route of several steps, the overall yield is the product of the step yields.",
      table: {
        columns: ["Starting material", "Reagents", "Intermediate", "Products"],
        rows: [
          { cells: ["Chlorobenzene", "NaOH, 623 K, about 300 atm; then \\(\\mathrm{H^+}\\)", "Sodium phenoxide", "Phenol"] },
          { cells: ["Benzenesulphonic acid (benzene + oleum)", "Fused NaOH; then \\(\\mathrm{H^+}\\)", "Sodium phenoxide", "Phenol"] },
          { cells: ["Aniline", "\\(\\mathrm{NaNO_2}\\) + HCl at 273–278 K; then warm water", "Benzenediazonium chloride, \\(\\mathrm{C_6H_5N_2^+Cl^-}\\)", "Phenol, \\(\\mathrm{N_2}\\) and HCl"] },
          { cells: ["Cumene (isopropylbenzene)", "\\(\\mathrm{O_2}\\) (air); then dilute acid", "Cumene hydroperoxide, \\(\\mathrm{C_6H_5C(CH_3)_2OOH}\\)", "Phenol and propanone (acetone)"], noteAmber: "The intermediate is a hydroperoxide (O–O–H), not an alcohol or an ester; acetone is the by-product." },
        ],
        caption: "Carbolic acid is the old name for phenol.",
      },
      selfCheckExample: {
        prompt:
          "Aniline is converted into benzenediazonium chloride in 90% yield, and the salt is then hydrolysed to phenol in 70% yield. What is the overall yield of phenol?",
        steps: [
          "Overall yield = product of the step yields.",
          "\\(0.90 \\times 0.70 = 0.63\\).",
        ],
        answer: "63%.",
      },
      practiceSet: [
        { prompt: "What is carbolic acid?", answer: "Phenol" },
        { prompt: "What is the by-product of the cumene process?", answer: "Propanone (acetone)" },
        { prompt: "Why does chlorobenzene need 623 K and high pressure to give phenol?", answer: "Its C–Cl bond has partial double-bond character" },
        { prompt: "Name the intermediate formed when air oxidises cumene.", answer: "Cumene hydroperoxide" },
      ],
      pyqExampleId: "fcd000c9-d694-4fb4-a8ce-f9432e2ee5a1", // 2022 — hydrolysis of benzene diazonium chloride gives carbolic acid
      traps: [
        {
          title: "Hydrolysis of benzal chloride gives benzaldehyde",
          body: "\\(\\mathrm{C_6H_5CHCl_2}\\) with water gives \\(\\mathrm{C_6H_5CHO}\\), not phenol. Cumene does not hydrolyse at all; it must be oxidised to the hydroperoxide first.",
        },
        {
          title: "Multiply step yields, do not add them",
          body: "Two steps of 80% and 50% give 40% overall, not 65% or 130%.",
        },
      ],
    },

    // C2 — named reactions of phenol
    {
      kind: "reference" as const,
      slug: "jcalc-phenol-named-reactions",
      name: "Named reactions of phenol",
      intuition:
        "Most phenol reactions start from the phenoxide ion, whose ring is very electron-rich. A weak electrophile such as dichlorocarbene or carbon dioxide then attacks the ortho carbon. Other reactions remove the oxygen (zinc dust) or oxidise the ring (chromic acid).",
      definition:
        "- **Zinc dust**: heating phenol with Zn removes the oxygen as ZnO and gives benzene.\n" +
        "- **Oxidation** with \\(\\mathrm{Na_2Cr_2O_7/H_2SO_4}\\) gives benzo-p-quinone, a conjugated diketone.\n" +
        "- **Reimer–Tiemann**: \\(\\mathrm{CHCl_3}\\) + aqueous NaOH make dichlorocarbene, \\(\\mathrm{:CCl_2}\\). The phenoxide attacks it at the ortho carbon; the intermediate is a substituted benzal chloride, and hydrolysis then acid gives salicylaldehyde (ortho major, para minor).\n" +
        "- **Kolbe**: sodium phenoxide + \\(\\mathrm{CO_2}\\) at about 400 K and 4–7 atm, then \\(\\mathrm{H^+}\\), gives salicylic acid (2-hydroxybenzoic acid).\n" +
        "- **Acetylation**: phenol + acetic anhydride gives phenyl acetate; salicylic acid gives aspirin.\n" +
        "- Phenol does not give chlorobenzene with HCl: its C–O bond has partial double-bond character.",
      table: {
        columns: ["Reaction", "Reagents", "Product", "Key point"],
        rows: [
          { cells: ["Reduction by zinc dust", "Zn, heat", "Benzene", "Zinc takes the oxygen as ZnO"] },
          { cells: ["Oxidation", "\\(\\mathrm{Na_2Cr_2O_7/H_2SO_4}\\) (chromic acid)", "Benzo-p-quinone", "A conjugated diketone, O=C at C-1 and C-4"] },
          { cells: ["Reimer–Tiemann", "\\(\\mathrm{CHCl_3}\\) + aq. NaOH, then \\(\\mathrm{H^+}\\)", "Salicylaldehyde (2-hydroxybenzaldehyde), ortho major", "Electrophile \\(\\mathrm{:CCl_2}\\); intermediate is the o-(dichloromethyl)phenoxide, a substituted benzal chloride"] },
          { cells: ["Kolbe", "NaOH; \\(\\mathrm{CO_2}\\) at 400 K, 4–7 atm; then \\(\\mathrm{H^+}\\)", "Salicylic acid (2-hydroxybenzoic acid)", "\\(\\mathrm{CO_2}\\) is a weak electrophile, so the phenoxide ion is needed"] },
          { cells: ["Acetylation", "Acetic anhydride or \\(\\mathrm{CH_3COCl}\\)", "Phenyl acetate; salicylic acid gives aspirin", "Reaction at the O–H, not on the ring"] },
          { cells: ["Nitration with conc. \\(\\mathrm{HNO_3}\\)", "Conc. \\(\\mathrm{HNO_3}\\) (best via phenol-2,4-disulphonic acid)", "Picric acid (2,4,6-trinitrophenol)", "A yellow, strongly acidic solid"] },
          { cells: ["With HCl", "Conc. HCl", "No reaction: no chlorobenzene", "The phenolic C–O bond does not break"] },
        ],
        caption: "CHCl₃ puts in a CHO group, CO₂ puts in a COOH group; both go ortho to the OH.",
      },
      selfCheckExample: {
        prompt:
          "Phenol is treated with NaOH, then \\(\\mathrm{CO_2}\\) at 400 K and 4–7 atm, then acid, to give X. X is warmed with acetic anhydride to give Y. Name X and Y.",
        steps: [
          "The first sequence is the Kolbe reaction: X is salicylic acid.",
          "Acetic anhydride acetylates the phenolic OH of salicylic acid.",
        ],
        answer: "X is salicylic acid; Y is acetylsalicylic acid (aspirin).",
      },
      practiceSet: [
        { prompt: "What is the electrophile in the Reimer–Tiemann reaction?", answer: "Dichlorocarbene, \\(\\mathrm{:CCl_2}\\)" },
        { prompt: "What does phenol give when heated with zinc dust?", answer: "Benzene" },
        { prompt: "What does chromic acid oxidise phenol to?", answer: "Benzo-p-quinone" },
        { prompt: "Which isomer is the major Reimer–Tiemann product: ortho or para hydroxybenzaldehyde?", answer: "Ortho (salicylaldehyde)" },
      ],
      pyqExampleId: "a7946a1a-5c1c-496d-95b2-5233b9027b80", // 2024 — match Zn, Reimer–Tiemann, Kolbe, conc. HNO3 with products
      traps: [
        {
          title: "Reimer–Tiemann gives the ortho aldehyde as the major product",
          body: "The phenoxide oxygen guides \\(\\mathrm{:CCl_2}\\) to the ortho carbon. A statement that p-hydroxybenzaldehyde is the major product is false. The two isomers can be separated by steam distillation, because the ortho one is volatile.",
        },
        {
          title: "Chloroform gives the aldehyde, carbon dioxide gives the acid",
          body: "\\(\\mathrm{CHCl_3}\\)/NaOH makes salicylaldehyde; \\(\\mathrm{CO_2}\\)/NaOH makes salicylic acid. Swapping them is the usual wrong option in a match list.",
        },
      ],
    },
  ],
};
