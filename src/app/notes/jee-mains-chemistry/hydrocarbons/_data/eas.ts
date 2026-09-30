import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/jee-mains-chemistry/hydrocarbons";

export const EAS_HC_NOTE: SubtopicNote = {
  subtopicName: "Electrophilic Substitution: Reactivity and Directing Effects",
  title: "Electrophilic Substitution: Reactivity and Directing Effects",
  oneLineDefinition:
    "Benzene keeps its aromatic ring by swapping an H for an electrophile made by an acid or a Lewis acid; a group already on the ring speeds or slows that swap and sends the new group ortho and para or meta.",
  whyItMatters:
    "Nineteen PYQs, fifteen of them multiple choice, and three from 2026. Five are about the electrophile itself: how HNO₃ and H₂SO₄ make NO₂⁺, what the Lewis acid does, and which rings cannot undergo Friedel–Crafts reactions. Seven classify groups as activating or deactivating and as ortho-para or meta directing. Seven put substituted benzenes in order of reactivity. Four of the nineteen ask for a number.",
  concepts: [
    // C1 — making the electrophile
    {
      kind: "reference" as const,
      slug: "jchc-eas-electrophile",
      name: "Making the electrophile, and when Friedel–Crafts fails",
      intuition:
        "Benzene's π cloud is only weakly nucleophilic, so every aromatic substitution first builds a strong, positive electrophile. A proton acid or a Lewis acid does this. The electrophile then adds to the ring to give a carbocation (the arenium ion or σ-complex), and loss of H⁺ restores the aromatic ring. A Friedel–Crafts reaction fails when the ring is too electron-poor, or when a basic nitrogen on the ring grabs the Lewis acid.",
      definition:
        "- **Nitration**: \\(\\mathrm{HNO_3 + 2H_2SO_4 \\rightleftharpoons NO_2^+ + H_3O^+ + 2HSO_4^-}\\). H₂SO₄ is the acid; HNO₃ accepts a proton, acting as a base.\n" +
        "- **Halogenation**: \\(\\mathrm{Cl_2 + AlCl_3 \\rightarrow Cl^+ + AlCl_4^-}\\) (or FeCl₃, FeBr₃).\n" +
        "- **Sulphonation**: SO₃ from conc. H₂SO₄ or oleum.\n" +
        "- **Friedel–Crafts**: \\(\\mathrm{RCl + AlCl_3 \\rightarrow R^+ + AlCl_4^-}\\); \\(\\mathrm{RCOCl + AlCl_3 \\rightarrow RCO^+ + AlCl_4^-}\\). The catalyst is a Lewis ACID.\n" +
        "- Friedel–Crafts fails with strongly deactivated rings (–NO₂, –CN, –COR, –SO₃H on the ring) and with –NH₂, –NHR, –NR₂ (the N lone pair binds AlCl₃ and the ring becomes positively charged).",
      table: {
        columns: ["Reaction", "Reagents", "Electrophile", "Product from benzene"],
        rows: [
          { cells: ["Nitration", "Conc. HNO₃ + conc. H₂SO₄", "\\(\\mathrm{NO_2^+}\\) (nitronium)", "Nitrobenzene"] },
          { cells: ["Chlorination", "Cl₂ with anhydrous AlCl₃ or FeCl₃", "\\(\\mathrm{Cl^+}\\)", "Chlorobenzene"] },
          { cells: ["Sulphonation", "Fuming H₂SO₄ (oleum)", "\\(\\mathrm{SO_3}\\)", "Benzenesulphonic acid"] },
          { cells: ["Friedel–Crafts alkylation", "CH₃Cl with anhydrous AlCl₃", "\\(\\mathrm{CH_3^+}\\)", "Toluene"] },
          { cells: ["Friedel–Crafts acylation", "CH₃COCl with anhydrous AlCl₃", "\\(\\mathrm{CH_3CO^+}\\) (acylium)", "Acetophenone"] },
        ],
        caption: "Every electrophile is made by an acid or a Lewis acid; the ring then loses H⁺ to stay aromatic.",
      },
      selfCheckExample: {
        prompt: "What is the electrophile when benzene is heated with ethanoyl chloride and anhydrous AlCl₃?",
        steps: [
          "AlCl₃ takes Cl⁻ from \\(\\mathrm{CH_3COCl}\\), forming \\(\\mathrm{AlCl_4^-}\\).",
          "The cation left is \\(\\mathrm{CH_3{-}C{\\equiv}O^+}\\), stabilised by the oxygen lone pair.",
        ],
        answer: "The acylium ion, \\(\\mathrm{CH_3CO^+}\\)",
      },
      practiceSet: [
        { prompt: "In the nitrating mixture, which acid acts as a base?", answer: "HNO₃" },
        { prompt: "Why does aniline not undergo Friedel–Crafts alkylation?", answer: "Its NH₂ binds AlCl₃, making the ring strongly deactivated" },
        { prompt: "12.3 g of nitrobenzene (M 123) is nitrated completely. What mass of m-dinitrobenzene (M 168) forms?", answer: "16.8 g", method: "0.1 mol in, 0.1 mol out." },
        { prompt: "What intermediate forms when an electrophile adds to benzene?", answer: "The arenium ion (σ-complex), a carbocation" },
      ],
      pyqExampleId: "b8611787-607e-4f74-8179-f01fdfc4c905", // 2024 — how many compounds in a list cannot undergo Friedel–Crafts
      traps: [
        {
          title: "AlCl₃ is a Lewis acid, not a Lewis base",
          body: "AlCl₃ has an empty orbital and accepts Cl⁻. A statement calling the Friedel–Crafts catalyst a Lewis base is wrong.",
        },
        {
          title: "Chlorobenzene still reacts",
          body: "A halogen deactivates the ring only weakly, so chlorobenzene does undergo Friedel–Crafts reactions (para mainly). Only strongly deactivated rings and rings bearing an amino N fail.",
        },
      ],
    },

    // C2 — directing groups
    {
      kind: "reference" as const,
      slug: "jchc-directing-groups",
      name: "Activating, deactivating, ortho-para and meta directors",
      intuition:
        "A group that pushes electrons into the ring (by a lone pair, +R, or by alkyl groups, +I and hyperconjugation) makes the ring richer and the reaction faster, and the extra density sits at the ortho and para positions. A group that pulls electrons out (–R, –I) slows the reaction and leaves the meta position the least starved. Halogens are the one mixed case: they pull by –I, so they deactivate, but their lone pairs still send the electrophile ortho and para.",
      definition:
        "- **Activating, ortho-para**: –NH₂, –NHR, –NR₂, –OH, –OCH₃, –NHCOCH₃, –CH₃ and other alkyl groups.\n" +
        "- **Deactivating, ortho-para**: –F, –Cl, –Br, –I.\n" +
        "- **Deactivating, meta**: –NO₂, –CN, –CHO, –COR, –COOH, –COOR, –SO₃H, –CF₃, –NR₃⁺.\n" +
        "- With two groups, the stronger activator decides where the next group goes; nothing enters between two meta groups easily.\n" +
        "- –NO₂ deactivates the ring to ELECTROPHILES but activates it (at ortho and para) to NUCLEOPHILIC substitution.",
      table: {
        columns: ["Group", "Main electronic effect", "Rate compared with benzene", "Directs to"],
        rows: [
          { cells: ["–NH₂, –NR₂", "+R (strong)", "Much faster", "ortho and para"] },
          { cells: ["–OH, –OCH₃", "+R (strong)", "Much faster", "ortho and para"] },
          { cells: ["–NHCOCH₃", "+R (moderate; the lone pair is shared with C=O)", "Faster", "ortho and para"] },
          { cells: ["–CH₃, –C₂H₅", "+I and hyperconjugation", "Slightly faster", "ortho and para"] },
          { cells: ["–Cl, –Br", "–I stronger than +R", "Slightly slower", "ortho and para"] },
          { cells: ["–CHO, –COR, –COOH, –COOR", "–R and –I", "Slower", "meta"] },
          { cells: ["–CN, –SO₃H, –CF₃", "–R and –I (–CF₃ by –I only)", "Much slower", "meta"] },
          { cells: ["–NO₂", "–R and –I (strongest)", "Much slower", "meta"] },
        ],
        caption: "Every activator directs ortho and para; every meta director deactivates; halogens deactivate yet direct ortho and para.",
      },
      selfCheckExample: {
        prompt: "What is the major product when methyl benzoate is nitrated?",
        steps: [
          "The ester group –COOCH₃ withdraws electrons by –R.",
          "It deactivates the ring and directs the nitro group meta.",
        ],
        answer: "Methyl 3-nitrobenzoate",
      },
      practiceSet: [
        { prompt: "Is –CH₃ activating or deactivating?", answer: "Activating (ortho and para)" },
        { prompt: "Where does bromination of chlorobenzene mainly occur?", answer: "Para (and ortho) to Cl" },
        { prompt: "Classify –CHO.", answer: "Deactivating, meta directing" },
        { prompt: "p-Methylanisole is brominated. Where does Br go?", answer: "Ortho to –OCH₃ (the stronger activator)" },
      ],
      pyqExampleId: "120d2c81-9f5f-4de8-885c-9e0412521bc0", // 2025 — which statements on activating and directing groups are true
      traps: [
        {
          title: "Halogens deactivate but direct ortho and para",
          body: "A halogen is neither an activator nor a meta director. It slows the reaction (–I) but its lone pair steers the electrophile ortho and para.",
        },
        {
          title: "–OH and –OCH₃ are never meta directors",
          body: "Any group with a lone pair on the atom attached to the ring is ortho-para directing. –NHCOCH₃ is weaker than –NH₂ but is still activating.",
        },
        {
          title: "Nitro activates for the other kind of substitution",
          body: "–NO₂ makes the ring electron-poor. That hinders electrophiles but helps a nucleophile replace a halogen ortho or para to it.",
        },
      ],
    },

    // C3 — rate order
    {
      kind: "reference" as const,
      slug: "jchc-eas-rate",
      name: "Ranking rings by rate of electrophilic substitution",
      intuition:
        "The electron-richer the ring, the faster an electrophile attacks it. So rank each ring by its strongest group, then by how many groups it carries. Strong +R donors (–NR₂, –OH, –OR) come first, alkyl groups next (more alkyls, faster), plain benzene in the middle, halogens just below it, carbonyl groups lower, and nitro last.",
      definition:
        "- Order of the groups, fastest first: –NR₂ > –NH₂ > –OH > –OCH₃ > –NHCOCH₃ > –CH₃ > –H > –Cl, –Br > –CHO, –COR > –CN > –NO₂.\n" +
        "- More alkyl groups add up: 1,3,5-trimethylbenzene > xylene > toluene > benzene.\n" +
        "- Two strong withdrawing groups (m-dinitrobenzene) make the ring slower still.",
      table: {
        columns: ["Compound", "Group", "Effect on the ring", "Place in rate order"],
        rows: [
          { cells: ["N,N-Dimethylaniline", "–N(CH₃)₂", "Strong +R", "Fastest of this list"] },
          { cells: ["Anisole", "–OCH₃", "Strong +R", "Second"] },
          { cells: ["Toluene", "–CH₃", "+I and hyperconjugation", "Third"] },
          { cells: ["Benzene", "–H", "Reference", "Fourth"] },
          { cells: ["Chlorobenzene", "–Cl", "–I beats +R", "Fifth"] },
          { cells: ["Benzaldehyde", "–CHO", "–R and –I", "Sixth"] },
          { cells: ["Benzonitrile", "–CN", "–R and –I", "Seventh"] },
          { cells: ["Nitrobenzene", "–NO₂", "Strongest –R and –I", "Slowest of this list"] },
        ],
        caption: "Rank by the strongest group on each ring; alkyl groups add up, and each extra withdrawing group slows the ring further.",
      },
      selfCheckExample: {
        prompt: "Arrange in decreasing rate of electrophilic substitution: chlorobenzene, anisole, benzaldehyde, toluene.",
        steps: [
          "–OCH₃ is a strong +R donor; –CH₃ a weak donor.",
          "–Cl deactivates weakly; –CHO deactivates strongly.",
        ],
        answer: "Anisole > toluene > chlorobenzene > benzaldehyde",
      },
      practiceSet: [
        { prompt: "Which is nitrated faster, toluene or m-xylene?", answer: "m-Xylene (two methyl groups)" },
        { prompt: "Which is nitrated faster, phenol or benzene?", answer: "Phenol" },
        { prompt: "Which is slower, benzonitrile or chlorobenzene?", answer: "Benzonitrile" },
        { prompt: "Which is the least reactive: benzene, nitrobenzene, m-dinitrobenzene?", answer: "m-Dinitrobenzene" },
      ],
      pyqExampleId: "d113df26-2136-49bf-8ecf-d2b8e30bfff3", // 2022 — increasing reactivity to nitration of five arenes
      traps: [
        {
          title: "Halogenobenzenes are slower than benzene",
          body: "It is tempting to put chlorobenzene or bromobenzene above benzene because halogens direct ortho and para. They are still deactivating, so they come just below benzene.",
        },
        {
          title: "Count the alkyl groups",
          body: "Each methyl adds electron density, so a trimethylbenzene beats a dimethylbenzene, which beats toluene.",
        },
      ],
    },
  ],
  related: [
    { label: "Benzene and Aromaticity", href: `${BASE}/jch-hc-aromaticity` },
    { label: "Friedel-Crafts, Side-Chain Oxidation and Arene Synthesis — putting the rules to work", href: `${BASE}/jch-hc-synthesis` },
  ],
};
