import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Chemistry, Ch. 15 Introduction to Polymer Chemistry. Statements
 * checked against the Balbharati text; most-asked years from the 33 board
 * past-paper questions in the bank, 2014-2026 (Dextron, detergents and food
 * antioxidants are no longer taught).
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Introduction to Polymer Chemistry",
  chapterSlug: "introduction-to-polymer-chemistry",
  source: "Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 15",
  keyPoints: [
    {
      term: "Polymer and monomer",
      text: "Polymers are complex, giant macromolecules made from repeating units derived from small molecules called **monomers** (Greek poly, many; mer, part). **Degree of polymerization** (DP) is the number of monomer units in a polymer molecule.",
    },
    {
      term: "Classification by source",
      text: "**Natural**: from plants (cotton, natural rubber) or animals (wool, silk). **Synthetic**: man-made, e.g. nylon, terylene, neoprene. **Semisynthetic**: derived from natural polymers, also called regenerated fibres (cellulose acetate rayon, viscose rayon).",
    },
    {
      term: "Classification by structure",
      text: "**Linear**: monomers joined in a straight chain (PVC, HDP). **Branched**: from monomers with 3 functional groups or side chains (LDP). **Cross-linked** (network): cross links between chains, from polyfunctional monomers (bakelite, melamine).",
    },
    {
      term: "Addition polymerization",
      text: "Formation of polymers by addition of monomers without loss of any small molecules; the repeating unit has the same elemental composition as the monomer. Shown by compounds with a double bond (vinyl polymerization). Free radical chain: initiation, propagation, termination.",
    },
    {
      term: "Condensation polymerization",
      text: "Formation of polymers from polyfunctional monomers with elimination of small molecules such as water, HCl, methanol or ammonia. Chain growth is a series of condensation steps, so it is also called step growth polymerization (nylon 6,6, terylene).",
    },
    {
      term: "Ring opening polymerization",
      text: "Cyclic compounds such as lactams, cyclic ethers and lactones polymerize by opening the ring, catalysed by strong acid or base. Example: ε-caprolactam gives nylon 6.",
    },
    {
      term: "Classification by intermolecular forces",
      text: "**Elastomers**: weak van der Waals forces, a few cross links (rubber). **Fibres**: strong forces (hydrogen bonds), crystalline, high tensile strength (nylon 6,6, terylene). **Thermoplastics**: soften on heating, harden on cooling, repeatedly (polythene, polystyrene). **Thermosetting**: extensively cross-linked, cannot be remoulded (bakelite).",
    },
    {
      term: "Homopolymers and copolymers",
      text: "**Homopolymers** have only one type of repeating unit (polythene, PAN, nylon 6, nylon 6,6). **Copolymers** have two or more types of repeating units, from different monomers polymerized in presence of each other (Buna-S, Buna-N).",
    },
    {
      term: "Natural rubber",
      text: "A linear polymer of **isoprene** (2-methyl-1,3-butadiene), \\(\\ce{CH2=C(CH3)-CH=CH2}\\). Polyisoprene has **cis** C=C, chains held by weak van der Waals forces and a coiled structure, so it stretches like a spring.",
    },
    {
      term: "Vulcanization",
      text: "The process by which a network of cross links is introduced into an elastomer. Raw rubber is heated with sulfur and an accelerator (ZBX) at about 150 °C; sulfur cross-links polyisoprene chains, raising tensile strength, stiffness and elasticity. 40-45% sulfur gives ebonite.",
    },
    {
      term: "Polythene: LDP and HDP",
      text: "**LDP**: ethylene at 1000-2000 atm with traces of \\(\\ce{O2}\\) or peroxide; branched, flexible; used for pipes, cable insulation, packaging films. **HDP**: ethene with Ziegler-Natta catalyst (triethyl aluminium + \\(\\ce{TiCl4}\\)) at 333-343 K, 6-7 atm; linear, stiff; used for buckets, bottles, toys.",
    },
    {
      term: "Teflon and polyacrylonitrile",
      text: "**Teflon** is polytetrafluoroethylene, from tetrafluoroethylene \\(\\ce{CF2=CF2}\\); tough, chemically inert (non-stick cookware, gaskets). **Polyacrylonitrile** (orlon, acrilan) is from acrylonitrile \\(\\ce{CH2=CHCN}\\) with a peroxide initiator; a wool substitute.",
    },
    {
      term: "Nylons and polyesters",
      text: "**Polyamides** (nylons) have \\(\\ce{-CO-NH-}\\) links: nylon 6,6 (adipic acid + hexamethylenediamine), nylon 6 (caprolactam). **Polyesters** have ester links: terylene or dacron (ethylene glycol + terephthalic acid). PET is the most common thermoplastic polyester.",
    },
    {
      term: "Biodegradable polymers",
      text: "Most synthetic polymers are not affected by microbes: **non-biodegradable** (polythene). Biodegradable polymers carry polar linkages like biopolymers: **PHBV** (3-hydroxybutanoic + 3-hydroxypentanoic acids, a polyester) and **nylon 2-nylon 6** (glycine + ε-amino caproic acid).",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Preparation of LDP and HDP from ethylene",
      steps: [
        "LDP: \\(\\ce{nCH2=CH2 ->[O2 or peroxide][1000-2000 atm] (-CH2-CH2-)_n}\\); free radical addition with H-atom abstraction gives branching.",
        "HDP: the same monomer with Ziegler-Natta catalyst (\\(\\ce{(C2H5)3Al + TiCl4}\\)) at 333-343 K and 6-7 atm gives a linear, closely packed chain.",
      ],
    },
    {
      title: "Preparation of Teflon",
      steps: [
        "Monomer: tetrafluoroethylene, a gas, with a free radical initiator (hydrogen peroxide or ammonium persulphate) at high pressure.",
        "\\(\\ce{nCF2=CF2 ->[peroxide] (-CF2-CF2-)_n}\\)",
      ],
    },
    {
      title: "Preparation of polyacrylonitrile",
      steps: [
        "Addition polymerization of acrylonitrile with a peroxide initiator.",
        "\\(\\ce{nCH2=CHCN ->[peroxide] (-CH2-CH(CN)-)_n}\\)",
      ],
    },
    {
      title: "Preparation of nylon 6,6",
      steps: [
        "Adipic acid and hexamethylenediamine form nylon salt (hexamethylene diammonium adipate).",
        "Condensation at high temperature and pressure: \\(\\ce{nHOOC(CH2)4COOH + nH2N(CH2)6NH2 -> (-OC(CH2)4CO-NH(CH2)6NH-)_n} + (2n-1)\\,\\ce{H2O}\\)",
        "6,6: six carbons in each of the two monomers. Uses: bristles, surgical sutures, textile fabrics.",
      ],
    },
    {
      title: "Preparation of nylon 6",
      steps: [
        "ε-Caprolactam is heated with water at high temperature: ring opening polymerization.",
        "\\(n\\ \\text{caprolactam} \\ce{->[H2O][heat] (-NH-(CH2)5-CO-)_n}\\)",
        "6: six carbons in the monomer unit. Uses: tyre cords, fabrics, ropes.",
      ],
    },
    {
      title: "Preparation of terylene (dacron)",
      steps: [
        "Condensation of ethylene glycol and terephthalic acid with zinc acetate-antimony trioxide catalyst at 420-460 K.",
        "\\(\\ce{nHO-CH2CH2-OH + nHOOC-C6H4-COOH -> (-O-CH2CH2-O-CO-C6H4-CO-)_n} + (2n-1)\\,\\ce{H2O}\\)",
        "Uses: wrinkle free fabrics blended with cotton (terycot) or wool (terywool), safety helmets.",
      ],
    },
    {
      title: "Natural rubber and neoprene from their monomers",
      steps: [
        "Natural rubber: \\(\\ce{nCH2=C(CH3)-CH=CH2 -> (-CH2-C(CH3)=CH-CH2-)_n}\\) (cis-polyisoprene).",
        "Neoprene: chloroprene (2-chloro-1,3-butadiene) polymerizes in presence of oxygen: \\(\\ce{nCH2=C(Cl)-CH=CH2 -> (-CH2-C(Cl)=CH-CH2-)_n}\\). It is vulcanized with MgO.",
      ],
    },
    {
      title: "Buna-S (SBR) from butadiene and styrene",
      steps: [
        "75 parts of 1,3-butadiene and 25 parts of styrene, addition copolymerization by the action of sodium.",
        "\\(\\ce{nCH2=CH-CH=CH2 + nC6H5CH=CH2 -> (-CH2-CH=CH-CH2-CH2-CH(C6H5)-)_n}\\); used in the tyre industry.",
      ],
    },
    {
      title: "Preparation of bakelite",
      steps: [
        "Phenol and formaldehyde react with an acid or base catalyst: o- and p-hydroxymethylphenols, then the linear novolac (moulding powder).",
        "Novolac heated in moulds forms many cross links: rigid, infusible thermosetting bakelite (telephone instruments, kitchenware, electric insulators).",
      ],
    },
    {
      title: "Nylon 2-nylon 6, a biodegradable copolymer",
      steps: [
        "Condensation copolymer of glycine \\(\\ce{H2N-CH2-COOH}\\) and ε-amino caproic acid \\(\\ce{H2N-(CH2)5-COOH}\\).",
        "\\(\\ce{nH2N-CH2-COOH + nH2N-(CH2)5-COOH -> (-NH-CH2-CO-NH-(CH2)5-CO-)_n} + (2n-1)\\,\\ce{H2O}\\). The numbers 2 and 6 are the carbons in each amino acid.",
      ],
    },
  ],
  diagrams: [
    { title: "Chain configurations of polymers", labels: ["linear chain", "branched chain", "cross-linked network"] },
    { title: "Tree diagram of the classification of polymers", labels: ["source", "structure", "mode of polymerization", "intermolecular forces", "type of monomers", "biodegradability"] },
    { title: "Vulcanization of natural rubber", labels: ["polyisoprene chains", "sulfur cross links", "opened double bond"] },
  ],
  mostAsked: [
    { topic: "Rubber: monomer of natural rubber (isoprene), vulcanization, neoprene and Buna-S", years: [2026, 2025, 2024, 2023, 2016, 2014] },
    { topic: "Nylon 6 and nylon 6,6: monomers, reactions of preparation and uses", years: [2026, 2025, 2024, 2023, 2019] },
    { topic: "Polythene (LDP, HDP) and Teflon: preparation, catalyst, monomer and uses", years: [2026, 2025, 2024, 2019, 2016] },
    { topic: "Classification by structure, by source and by type of monomers (linear, branched, synthetic, homopolymer, copolymer)", years: [2022, 2020, 2017, 2016, 2015] },
    { topic: "Classification by intermolecular forces: elastomers, fibres, thermoplastics", years: [2026, 2025, 2017, 2014] },
    { topic: "Biodegradable and non-biodegradable polymers; nylon 2-nylon 6", years: [2020, 2018, 2015] },
    { topic: "Other polymers: polyacrylonitrile, bakelite, thermocol, polymers in paints", years: [2024, 2018, 2014] },
    { topic: "Polyesters: preparation of terylene, PET", years: [2026, 2020] },
  ],
  mistakes: [
    {
      title: "Calling nylon 6,6 a copolymer",
      body: "Its two monomers form one salt and one kind of repeating unit, so nylon 6,6 is a **homopolymer**. Buna-S, Buna-N, PHBV and nylon 2-nylon 6 are copolymers.",
    },
    {
      title: "Writing nylon 6 as a condensation of two monomers",
      body: "Nylon 6 has one monomer, caprolactam, and forms by **ring opening** polymerization on heating with water.",
    },
    {
      title: "Swapping the catalysts for LDP and HDP",
      body: "LDP: traces of oxygen or peroxide at very high pressure. HDP: Ziegler-Natta catalyst (triethyl aluminium with titanium tetrachloride) at low pressure.",
    },
    {
      title: "Wrong name of isoprene",
      body: "Isoprene is **2-methyl-1,3-butadiene**; chloroprene (neoprene's monomer) is 2-chloro-1,3-butadiene.",
    },
    {
      title: "Leaving out water in a condensation equation",
      body: "Nylon 6,6, terylene and nylon 2-nylon 6 all eliminate water. Addition polymers (polythene, Teflon, PAN) lose nothing.",
    },
  ],
};

export default sheet;
