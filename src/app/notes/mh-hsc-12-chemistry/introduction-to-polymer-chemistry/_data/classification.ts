import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_PO_CLASSIFICATION_NOTE: SubtopicNote = {
  subtopicName: "Classification of Polymers",
  title: "Classification of Polymers",
  oneLineDefinition:
    "The six ways the textbook sorts polymers: by source, by chain structure, by mode of polymerization, by intermolecular forces, by the number of kinds of monomer, and by biodegradability.",
  whyItMatters:
    "23 questions. Nine were set in board papers: thermoplastic polymers (2014), linear and branched polymers and biodegradable polymers (2015), picking the copolymer from four polymers (2016), homopolymers and elastomers (2017), picking the synthetic polymer (2020), classification by structure (2022), the four classes by intermolecular forces (2025) and the polymer that is not an elastomer (2026). The textbook adds the free radical mechanism, the three modes of polymerization and lists of polymers to sort into classes.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccpo-source",
      name: "Natural, synthetic and semisynthetic polymers",
      intuition:
        "The first question to ask about any polymer is where it comes from. Nature makes some of them ready for use, like cotton and silk. Chemists build others from small molecules in a plant, like nylon. And some sit in between: they start as a natural polymer such as cellulose and are changed chemically.",
      definition:
        "- **Polymers** are complex, giant macromolecules made from repeating units derived from small molecules called **monomers**. The word comes from the Greek poly (many) and mer (part or unit). Their molecular masses are high, \\(10^3\\) to \\(10^7\\) u.\n" +
        "- The textbook classifies polymers on six bases: source, structure, mode of polymerization, intermolecular forces, type of monomers and biodegradability (the tree diagram of Fig. 15.2).\n" +
        "- **Natural polymers** are obtained from natural sources. **Plant polymers:** cotton (cotton plant), linen (flax plant), natural rubber (latex from the bark of rubber trees). **Animal polymers:** wool (hair of sheep), silk (silkworm).\n" +
        "- **Synthetic polymers** are man-made, prepared by polymerization of one monomer or copolymerization of two or more monomers: nylon, terylene, neoprene. They are divided into three subtypes: fibres, synthetic rubbers and plastics.\n" +
        "- **Semisynthetic polymers** are derived from natural polymers and are also called **regenerated fibres**: cellulose acetate rayon, cellulose nitrate, viscose rayon, cuprammonium rayon. They are used for non-inflammable photographic films, cinema films and varnishes.",
      table: {
        columns: ["Class", "Where it comes from", "Examples"],
        rows: [
          { cells: ["Natural: plant polymers", "Obtained directly from plants", "Cotton, linen, natural rubber"] },
          { cells: ["Natural: animal polymers", "Obtained from animals", "Wool, silk"] },
          { cells: ["Synthetic", "Man-made by polymerizing one monomer or copolymerizing two or more", "Nylon, terylene, neoprene"] },
          { cells: ["Semisynthetic (regenerated fibres)", "Made by chemically changing a natural polymer, mostly cellulose", "Cellulose acetate rayon, cellulose nitrate, viscose rayon, cuprammonium rayon"] },
        ],
      },
      selfCheckExample: {
        prompt: "Name one plant polymer, one animal polymer and one semisynthetic polymer, and say where each comes from.",
        steps: [
          "Plant polymer: cotton, from the cotton plant.",
          "Animal polymer: wool, from the hair of sheep.",
          "Semisynthetic polymer: viscose rayon, made by chemically treating cellulose (wood pulp).",
        ],
        answer: "Cotton (cotton plant), wool (sheep), viscose rayon (from cellulose)",
      },
      practiceSet: [
        { prompt: "From which plant is linen obtained?", answer: "The flax plant" },
        { prompt: "Why is viscose rayon called a regenerated fibre?", answer: "It is derived from a natural polymer, cellulose, by chemical treatment, so it is semisynthetic" },
        { prompt: "Name the three subtypes of synthetic polymers.", answer: "Fibres, synthetic rubbers and plastics" },
        { prompt: "State the range of molecular masses of polymers.", answer: "\\(10^3\\) to \\(10^7\\) u" },
      ],
      pyqExampleId: "bc7684c3-d5da-479c-a379-a8483478cd02",
      traps: [
        {
          title: "Calling a semisynthetic polymer synthetic",
          body: "Rayons and cellulose nitrate are not built from monomers in a plant. They are natural cellulose changed chemically, so they are semisynthetic, a class of their own.",
        },
        {
          title: "Natural rubber is natural",
          body: "Natural rubber is processed from latex, but the polymer itself is made by the rubber tree, so it is a natural (plant) polymer. Neoprene and Buna-S are the synthetic rubbers.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccpo-structure",
      name: "Linear, branched and cross-linked polymers",
      intuition:
        "Picture the monomer units as beads. Join each bead to two others and you get a straight string. Let some beads carry a third link and side strings grow out of the main one. Tie neighbouring strings to each other and the whole mass becomes one net. How many links a monomer can make decides which of the three you get.",
      definition:
        "- On the basis of **structure** (chain configuration, that is, how the monomers are linked together), polymers are of three general types. The type depends on the nature and number of functional groups in the monomers.\n" +
        "- **Linear or straight chain polymers:** the monomer molecules are joined in a linear arrangement. They are obtained from **bifunctional monomers or alkenes**. Examples: PVC, high density polythene.\n" +
        "- **Branched chain polymers:** the second most common arrangement. Monomers having **three functional groups**, or monomers already having side chains, give branched chains. Example: low density polythene. The branches keep the chains loosely held, so the density is low.\n" +
        "- **Cross-linked (network) polymers:** cross links are produced between linear chains, giving a three dimensional network. Cross linking results from **polyfunctional monomers**. Examples: bakelite, melamine-formaldehyde resin.\n" +
        "- In a board answer draw the three sketches of Fig. 15.1: a single chain, a chain with side chains, and chains joined by cross links.",
      table: {
        columns: ["Type", "How the units are linked", "Monomer that gives it", "Example"],
        rows: [
          {
            cells: ["Linear (straight chain)", "In a single linear arrangement", "Bifunctional monomers or alkenes", "PVC, HDP"],
            pyqExampleId: "de7961c2-c58b-452b-9b31-8a3f0bcb67be",
            noteAmber: "Board 2015 asked you to explain linear and branched polymers with examples.",
          },
          { cells: ["Branched chain", "A main chain with side chains", "Monomers with three functional groups, or with side chains", "LDP"] },
          { cells: ["Cross-linked (network)", "Linear chains tied by cross links into a three dimensional network", "Polyfunctional monomers", "Bakelite, melamine-formaldehyde resin"] },
        ],
      },
      selfCheckExample: {
        prompt: "Classify high density polythene, low density polythene and melamine-formaldehyde resin on the basis of structure.",
        steps: ["HDP is essentially a linear polymer.", "LDP has branches made during its polymerization: branched chain.", "Melamine-formaldehyde resin is cross linked into a network."],
        answer: "HDP: linear; LDP: branched chain; melamine-formaldehyde resin: cross-linked",
      },
      practiceSet: [
        { prompt: "What kind of monomer gives a cross-linked polymer?", answer: "A polyfunctional monomer" },
        { prompt: "Why does branching give a polymer of low density?", answer: "The branches keep the chains apart, so they are loosely held and cannot pack closely" },
        { prompt: "On what does the type of chain configuration of a polymer depend?", answer: "On the nature and number of functional groups in its monomers" },
      ],
      pyqExampleId: "5b35fcf7-cec6-458b-bf8f-bcf437c5816b",
      traps: [
        {
          title: "A side group is not a branch",
          body: "The Cl atom in PVC or the CN group in polyacrylonitrile hangs on the chain but is not a growing chain. Both polymers are linear. A branch is a side chain of repeating units.",
        },
        {
          title: "An answer without examples or sketches",
          body: "A classification question carries a mark for an example of each type and often for the three sketches of Fig. 15.1. Give PVC or HDP, LDP, and bakelite.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccpo-modes",
      name: "Addition, condensation and ring opening polymerization",
      intuition:
        "There are three ways to join small molecules into a chain. A molecule with a double bond can open it and add on, losing nothing. Two molecules with reactive groups at both ends can join while throwing out a small molecule such as water each time. Or a ring can snap open and add itself to the chain. The test in every case: compare the repeating unit with the monomer.",
      definition:
        "- **Polymerization** is the process by which low molecular mass compounds are converted into high molecular mass compounds by linking repeating structural units with covalent bonds, using high temperature, pressure or a catalyst.\n" +
        "- **Addition (chain growth) polymerization:** monomers add without loss of any small molecule, so the repeating unit has the **same elemental composition** as the monomer. Compounds containing a **double bond** undergo it; it is also called vinyl polymerization because most monomers are vinyl compounds (vinyl chloride, acrylonitrile). Example: polyethylene from ethylene.\n" +
        "- **Condensation (step growth) polymerization:** polyfunctional monomers join with the **elimination of small molecules** such as water, HCl, methanol or ammonia; the chain grows by a series of condensation steps. The repeating unit does **not** have the same elemental composition as the monomer. Example: terylene, where an alcoholic OH of ethylene glycol condenses with a COOH of terephthalic acid and water is eliminated, forming an ester link.\n" +
        "- **Ring opening polymerization:** cyclic compounds such as lactams, cyclic ethers and lactones open and polymerize, catalysed by a strong acid or base. Example: ε-caprolactam gives nylon 6. The repeating unit has the same composition as the monomer, as in addition; but one monomer unit adds at a time, so it is step growth, as in condensation.\n" +
        "- **Free radical mechanism of addition polymerization** (three steps):\n" +
        "- **Step 1, chain initiation:** an initiator such as benzoyl peroxide, acetyl peroxide or tert-butyl peroxide gives a free radical. Acetyl peroxide gives \\(2\\,\\text{CH}_3\\text{COO}^{\\bullet}\\), each losing CO₂ to give \\(\\text{CH}_3^{\\bullet}\\). The radical adds to the vinyl monomer: \\(\\text{R}^{\\bullet} + \\text{CH}_2{=}\\text{CHY} \\to \\text{R}{-}\\text{CH}_2{-}\\text{CHY}^{\\bullet}\\).\n" +
        "- **Step 2, chain propagation:** the new radical adds another monomer molecule, again and again, very rapidly: \\(\\text{R}{-}\\text{CH}_2{-}\\text{CHY}^{\\bullet} + n\\,\\text{CH}_2{=}\\text{CHY} \\to \\text{R}{-}(\\text{CH}_2{-}\\text{CHY})_n{-}\\text{CH}_2{-}\\text{CHY}^{\\bullet}\\).\n" +
        "- **Step 3, chain termination:** for example two growing radicals combine: \\(2\\,\\text{R}{-}(\\text{CH}_2{-}\\text{CHY})_n{-}\\text{CH}_2{-}\\text{CHY}^{\\bullet} \\to \\text{R}{-}(\\text{CH}_2\\text{CHY})_{n+1}{-}(\\text{CHYCH}_2)_{n+1}{-}\\text{R}\\).",
      formula: {
        label: "Free radical addition polymerization",
        latex:
          "\\text{R}^{\\bullet} + \\text{CH}_2{=}\\text{CHY} \\longrightarrow \\text{R}{-}\\text{CH}_2{-}\\text{CHY}^{\\bullet} \\xrightarrow{n\\,\\text{CH}_2{=}\\text{CHY}} \\text{R}{-}(\\text{CH}_2{-}\\text{CHY})_n{-}\\text{CH}_2{-}\\text{CHY}^{\\bullet}",
      },
      authoredExample: {
        prompt:
          "Polyacrylonitrile and terylene are both used as fibres. State the mode of polymerization by which each is formed, giving a reason from its monomers and repeating unit.",
        steps: [
          "Polyacrylonitrile: the monomer acrylonitrile, \\(\\text{CH}_2{=}\\text{CH}{-}\\text{CN}\\), contains a C=C double bond.",
          "It adds on with no small molecule lost, so the repeating unit \\({-}\\text{CH}_2{-}\\text{CH(CN)}{-}\\) has the same elemental composition as the monomer. This is **addition polymerization**.",
          "Terylene: the monomers ethylene glycol and terephthalic acid are bifunctional (two OH groups; two COOH groups).",
          "Each ester link forms with the elimination of a water molecule, so the repeating unit does not have the composition of the monomers. This is **condensation polymerization**.",
        ],
        answer: "Polyacrylonitrile: addition polymerization; terylene: condensation polymerization",
      },
      selfCheckExample: {
        prompt:
          "ε-Caprolactam polymerizes to nylon 6. Name the mode of polymerization, and state whether the repeating unit has the same elemental composition as the monomer.",
        steps: ["ε-Caprolactam is a cyclic amide (a lactam); its ring opens and adds to the chain.", "Nothing is eliminated, so the composition stays the same."],
        answer: "Ring opening polymerization; yes, the repeating unit has the same composition as the monomer",
      },
      practiceSet: [
        { prompt: "Why is addition polymerization also called vinyl polymerization?", answer: "Most of its monomers belong to the vinyl category, for example vinyl chloride and acrylonitrile" },
        { prompt: "Name two small molecules that may be eliminated in condensation polymerization.", answer: "Any two of water, hydrochloric acid, methanol and ammonia" },
        { prompt: "Which mode of polymerization is also called step growth polymerization?", answer: "Condensation polymerization" },
        { prompt: "Name one initiator used to start free radical addition polymerization.", answer: "Benzoyl peroxide (or acetyl peroxide, or tert-butyl peroxide)" },
      ],
      pyqExampleId: "0aecb530-415f-4698-b4cd-9c0d42c3dade",
      traps: [
        {
          title: "Leaving out the condition in a definition",
          body: "Addition polymerization is defined by what does NOT happen: no small molecule is lost, so the repeating unit has the composition of the monomer. A definition without that line loses the mark.",
        },
        {
          title: "Writing two steps of the mechanism",
          body: "The free radical mechanism has three named steps: initiation, propagation and termination. Name the initiator and write an equation for each step.",
        },
        {
          title: "Calling ring opening a condensation",
          body: "When ε-caprolactam opens, nothing is eliminated. Ring opening polymerization is step growth like condensation, but its repeating unit has the same composition as the monomer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccpo-forces",
      name: "Elastomers, fibres, thermoplastics and thermosetting polymers",
      intuition:
        "How a polymer behaves in your hand depends on how strongly its chains hold each other. Weak forces and a few ties: it stretches and springs back, like rubber. Very strong forces: the chains line up into tough threads. Moderate forces: it softens when hot and can be reshaped. Chains welded together by covalent cross links: once set, heat cannot soften it again.",
      definition:
        "- Mechanical properties such as tensile strength, toughness and elasticity depend on the **intermolecular forces**, which give four classes.\n" +
        "- **Elastomers:** elasticity is the property by which a substance gets stretched by an external force and restores its original shape on release of that force. Elastomers have **weak van der Waals forces**, which permit stretching; **a few cross links** help the stretched polymer retract to its original position. Examples: vulcanized rubber, Buna-S, Buna-N, neoprene.\n" +
        "- **Fibres:** polymeric solids which form threads. They have **high tensile strength** (resistance to breaking under tension) because of **strong intermolecular forces** such as hydrogen bonding and strong dipole-dipole forces, and so they are crystalline. Examples: polyamides (nylon 6,6), polyesters (terylene).\n" +
        "- **Thermoplastic polymers:** plasticity is the property of being easily shaped or moulded. Thermoplastics are capable of **repeated softening on heating and hardening on cooling**. Their intermolecular forces are **moderately strong**, intermediate between elastomers and fibres. Examples: polythene, polystyrene, polyvinyls.\n" +
        "- **Thermosetting polymers:** rigid polymers. While being formed they can be shaped on heating, but they **harden while hot**; once hardened they are **infusible**, cannot be softened by heating and cannot be remoulded. This is due to **extensive cross linking by covalent bonds** formed in the moulds while hot. Examples: bakelite, urea-formaldehyde resin.",
      table: {
        columns: ["Class", "Intermolecular forces", "Behaviour", "Examples"],
        rows: [
          {
            cells: ["Elastomers", "Weakest: van der Waals, with a few cross links", "Stretch under a force and return to shape", "Vulcanized rubber, Buna-S, Buna-N, neoprene"],
            pyqExampleId: "d6a080d1-1375-4da7-aafb-120b4d60d384",
            noteAmber: "Board 2026 asked which of four polymers is NOT an elastomer.",
          },
          { cells: ["Fibres", "Strongest: hydrogen bonds and strong dipole-dipole forces", "Crystalline threads of high tensile strength", "Nylon 6,6, terylene"] },
          {
            cells: ["Thermoplastic polymers", "Moderately strong, between elastomers and fibres", "Soften on heating and harden on cooling, again and again", "Polythene, polystyrene, polyvinyls"],
            pyqExampleId: "ca0879ec-d0c6-4de0-8407-687617a69b4c",
            noteAmber: "Board 2014 asked what thermoplastic polymers are.",
          },
          { cells: ["Thermosetting polymers", "Extensive covalent cross links formed in the mould", "Harden while hot; infusible, cannot be remoulded", "Bakelite, urea-formaldehyde resin"] },
        ],
      },
      selfCheckExample: {
        prompt: "Classify neoprene, terylene, polystyrene and bakelite on the basis of intermolecular forces.",
        steps: ["Neoprene stretches and returns: elastomer.", "Terylene forms strong threads: fibre.", "Polystyrene can be softened and remoulded: thermoplastic.", "Bakelite is cross linked and infusible: thermosetting."],
        answer: "Neoprene: elastomer; terylene: fibre; polystyrene: thermoplastic; bakelite: thermosetting",
      },
      practiceSet: [
        { prompt: "Which class of polymers has the strongest intermolecular forces?", answer: "Fibres (hydrogen bonding and strong dipole-dipole forces)" },
        { prompt: "Why can a thermosetting polymer not be remoulded?", answer: "Extensive covalent cross links form in the mould while it is hot, so once hardened it is infusible" },
        { prompt: "What makes a stretched elastomer return to its original shape?", answer: "A few cross links between its chains" },
        { prompt: "Why are fibres crystalline?", answer: "Strong intermolecular forces hold their chains closely and regularly" },
      ],
      pyqExampleId: "dcde6496-f0c9-4a20-9190-9011ba5d6f90",
      traps: [
        {
          title: "Thermosetting does not mean softened by heat",
          body: "A thermosetting polymer sets hard while hot and can never be softened again. It is the thermoplastic that softens on heating and hardens on cooling, again and again.",
        },
        {
          title: "A distinction that covers one side",
          body: "In 'distinguish between thermoplastic and thermosetting polymers', write each point as a pair: forces or cross links, behaviour on heating, remoulding, and an example for each.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccpo-copolymers",
      name: "Homopolymers, copolymers and biodegradable polymers",
      intuition:
        "Count the kinds of repeating unit in the chain. One kind: a homopolymer. Two or more kinds, mixed at random: a copolymer. Then ask what happens to the polymer after it is thrown away. If soil microbes can break it down, it is biodegradable; most synthetic polymers they cannot touch.",
      definition:
        "- **Homopolymers** have only **one type of repeating unit**. Usually they are formed from a single monomer; in some cases the repeating unit is formed by condensation of two distinct monomers. Examples: polythene, polypropene, nylon 6, polyacrylonitrile, nylon 6,6.\n" +
        "- Nylon 6,6 is a homopolymer: hexamethylenediamine and adipic acid first form one salt, hexamethylene diammonium adipate, which condenses to give one kind of repeating unit.\n" +
        "- **Copolymers** have **two or more types of repeating unit**. They are formed by polymerization of two or more different monomers in presence of each other, and the units are **randomly sequenced**. Examples: Buna-S (butadiene and styrene), Buna-N (butadiene and acrylonitrile), PHBV, nylon 2-nylon 6.\n" +
        "- **Non-biodegradable polymers:** most synthetic polymers are not affected by microbes. Their waste stays in the environment for a very long time and poses pollution hazards. Most natural fibres, in contrast, are biodegradable.\n" +
        "- **Biodegradable polymers:** synthetic polymers developed to tackle this problem. They contain functional groups similar to those in biopolymers such as proteins; aliphatic polyesters and polyamides with a large proportion of polar linkages are an important class.\n" +
        "- **PHBV**, poly β-hydroxybutyrate-co-β-hydroxyvalerate: a copolymer of β-hydroxybutyric acid (3-hydroxybutanoic acid) and β-hydroxyvaleric acid (3-hydroxypentanoic acid). The OH of one monomer forms an ester link with the COOH of the other, so it is an aliphatic polyester; it is degraded by microbes.\n" +
        "- **Nylon 2-nylon 6:** a polyamide copolymer of glycine and ε-amino caproic acid; biodegradable.",
      table: {
        columns: ["Class", "What decides it", "Examples"],
        rows: [
          {
            cells: ["Homopolymer", "Only one type of repeating unit", "Polythene, polypropene, polyacrylonitrile, nylon 6, nylon 6,6"],
            pyqExampleId: "ecca1d92-191f-4f6f-9a30-02d1ebd59611",
            noteAmber: "Board 2017 asked you to explain homopolymers (together with elastomers).",
          },
          { cells: ["Copolymer", "Two or more types of repeating unit, randomly sequenced", "Buna-S, Buna-N, PHBV, nylon 2-nylon 6"] },
          { cells: ["Non-biodegradable", "Not affected by microbes; stays in the environment", "Most synthetic polymers, such as polythene"] },
          {
            cells: ["Biodegradable", "Broken down by microbes; polar ester or amide linkages like those in biopolymers", "PHBV, nylon 2-nylon 6"],
            pyqExampleId: "9e84ac59-efb6-4266-b412-d10dc833ece8",
            noteAmber: "Board 2015 asked for biodegradable and non-biodegradable polymers with one example each.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Nylon 6,6 is made from two compounds. Is it a homopolymer or a copolymer? Give the reason.",
        steps: [
          "Hexamethylenediamine and adipic acid first form one salt, hexamethylene diammonium adipate.",
          "The salt condenses to give a chain with only one type of repeating unit.",
        ],
        answer: "A homopolymer, because it has only one type of repeating unit",
      },
      practiceSet: [
        { prompt: "Name the two monomers of PHBV.", answer: "β-Hydroxybutyric acid and β-hydroxyvaleric acid" },
        { prompt: "Why do most synthetic polymers cause pollution?", answer: "They are not affected by microbes, so their waste stays in the environment for a very long time" },
        { prompt: "Which kind of linkage makes aliphatic polyesters and polyamides biodegradable?", answer: "Polar ester or amide linkages, similar to those in biopolymers such as proteins" },
        { prompt: "How are the units arranged in a copolymer chain?", answer: "The different monomer units are randomly sequenced" },
      ],
      pyqExampleId: "f5388509-013b-496b-8f07-e1845dab1671",
      traps: [
        {
          title: "Two monomers do not always make a copolymer",
          body: "Nylon 6,6 needs two monomers but has one kind of repeating unit, so it is a homopolymer. Count repeating units, not starting materials.",
        },
        {
          title: "Defining without an example",
          body: "Board questions on these classes ask for one example of each. Give a named polymer, such as polythene for non-biodegradable and PHBV for biodegradable.",
        },
      ],
    },
  ],
};
