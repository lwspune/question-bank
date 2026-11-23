import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_PO_POLYMERS_NOTE: SubtopicNote = {
  subtopicName: "Some Important Polymers",
  title: "Some Important Polymers: Monomers, Preparation and Uses",
  oneLineDefinition:
    "Natural rubber and vulcanization, the synthetic rubbers, polythene, teflon and other addition polymers, the nylons, and terylene, bakelite and other condensation polymers: each with its monomers, its preparation and its uses.",
  whyItMatters:
    "53 questions, and twenty-three of them were set in board papers, more than on the other two pages together. Nylon 6 or its monomer came in 2019, 2024, 2025 and 2026, teflon in the same four years, natural rubber or isoprene every year from 2023 to 2026, and nylon 6,6 in 2023 and 2026. The board has also asked about Buna-S and bakelite (2014), polythene and neoprene (2016), glyptal and nylon 2-nylon 6 (2018), terylene (2020), vulcanization (2023), thermocol and polyacrylonitrile (2024), HDP (2025, 2026) and the trade name of PET (2026). The textbook adds the structures of rubbers, LDP against HDP, and matching polymers to their monomers.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccpo-natural-rubber",
      name: "Natural rubber and vulcanization",
      intuition:
        "Natural rubber is a long chain of isoprene units, each still holding one double bond. The double bonds are all cis, so the chains coil up and hold each other only weakly: the rubber stretches, but it is soft and weak. Vulcanization ties neighbouring chains together with sulfur bridges at those double bonds, and the rubber becomes strong and properly elastic.",
      definition:
        "- Elastomers are popularly known as **rubbers**: balloons, shoe soles, tyres, surgeon's gloves and garden hose are made of them.\n" +
        "- **Monomer:** isoprene, 2-methyl-1,3-butadiene, \\(\\text{CH}_2{=}\\text{C(CH}_3){-}\\text{CH}{=}\\text{CH}_2\\) (its IUPAC name is 2-methylbuta-1,3-diene).\n" +
        "- Natural rubber is a high molecular mass **linear polymer of isoprene**, formed by addition polymerization. Its molecular mass is 130,000 u to 340,000 u (2000 to 5000 monomer units).\n" +
        "- **Properties:** the C=C double bond of polyisoprene has the **cis configuration**; the chains are held by weak van der Waals forces and have a coiled structure; it can be stretched like a spring and is elastic.\n" +
        "- Latex is collected from cuts in the bark of a mature Hevea tree; adding a coagulant such as acetic acid gives the rubber as an amorphous solid.\n" +
        "- **Vulcanization** (Charles Goodyear, 1839): the process by which a network of cross links is introduced into an elastomer. Raw rubber is heated with **sulfur powder** and accelerators (most commonly ZBX, zinc butyl xanthate) at about **150 °C**. One or more sulfur atoms cross-link two polyisoprene chains by opening a double bond, giving three dimensional vulcanized rubber.\n" +
        "- Vulcanization improves tensile strength, stiffness, elasticity and toughness. With **40 to 45% sulfur** a hard, non-elastic material, **ebonite**, is obtained.\n" +
        "- Another natural polymer of this section: **cellulose**, a linear polymer of glucose units, \\((\\text{C}_6\\text{H}_{10}\\text{O}_5)_n\\), is pure cotton and wood pulp; viscose rayon is regenerated cellulose, a semisynthetic fibre.",
      formula: {
        label: "Natural rubber from isoprene",
        latex:
          "n\\,\\text{CH}_2{=}\\text{C(CH}_3){-}\\text{CH}{=}\\text{CH}_2 \\longrightarrow {-}[\\text{CH}_2{-}\\text{C(CH}_3){=}\\text{CH}{-}\\text{CH}_2]_n{-}",
      },
      authoredExample: {
        prompt: "Explain the vulcanization of natural rubber. Name the reagent and the conditions, and state how the properties of the rubber change.",
        steps: [
          "Definition: vulcanization is the process by which a network of cross links is introduced into an elastomer.",
          "Reagent and conditions: raw rubber is heated with sulfur powder in presence of accelerators (commonly ZBX, zinc butyl xanthate) at about 150 °C.",
          "What happens: a double bond of a polyisoprene chain opens, and one or more sulfur atoms bridge two neighbouring chains, giving a three dimensional network.",
          "Result: tensile strength, stiffness, elasticity and toughness all increase. With 40 to 45% sulfur the product is ebonite, hard and non-elastic.",
        ],
        answer: "Heating rubber with sulfur and an accelerator at about 150 °C cross-links the chains and makes the rubber stronger, stiffer, tougher and more elastic",
      },
      selfCheckExample: {
        prompt: "Write the repeating unit of natural rubber. How many carbon atoms and how many double bonds does it contain?",
        steps: ["Repeating unit: \\({-}\\text{CH}_2{-}\\text{C(CH}_3){=}\\text{CH}{-}\\text{CH}_2{-}\\).", "Four chain carbons plus the methyl carbon make 5; one C=C remains in each unit."],
        answer: "Five carbon atoms and one double bond in each isoprene unit",
      },
      practiceSet: [
        { prompt: "What configuration does the C=C bond have in natural rubber?", answer: "Cis" },
        { prompt: "Which accelerator is most commonly used in vulcanization?", answer: "ZBX, zinc butyl xanthate" },
        { prompt: "What is obtained when rubber is vulcanized with 40 to 45% sulfur?", answer: "Ebonite, a hard non-elastic material" },
        { prompt: "Why are the forces between natural rubber chains weak?", answer: "The cis double bonds give coiled chains that cannot pack closely, so only weak van der Waals forces act" },
      ],
      pyqExampleId: "cb4eae45-0d44-4905-8bd1-fcb5ad71c97c",
      traps: [
        {
          title: "Losing the double bond in the repeating unit",
          body: "Both double bonds of isoprene take part, and a new C=C forms between the middle two carbons: \\({-}\\text{CH}_2{-}\\text{C(CH}_3){=}\\text{CH}{-}\\text{CH}_2{-}\\). Drawing the unit fully saturated is wrong, and it is that double bond which vulcanization uses.",
        },
        {
          title: "Vulcanization numbers",
          body: "The textbook gives about 150 °C, sulfur with an accelerator, and 40 to 45% sulfur for ebonite. Learn these figures; other books quote different ones.",
        },
        {
          title: "Defining vulcanization as 'adding sulfur'",
          body: "The definition the book gives is about structure: a network of cross links is introduced into an elastomer. Add sulfur and heat as the method, not as the definition.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccpo-synthetic-rubbers",
      name: "Buna-S, neoprene and Buna-N",
      intuition:
        "Synthetic rubbers are built from dienes, like natural rubber, but chemists choose the monomers to get a property they need. Add styrene to butadiene and the rubber wears less, which suits tyres. Put a chlorine on the diene and the rubber stands up to petrol and oil.",
      definition:
        "- **Buna-S** (trade name SBR, styrene-butadiene rubber): an elastomer that is a **copolymer** of 1,3-butadiene \\(\\text{CH}_2{=}\\text{CH}{-}\\text{CH}{=}\\text{CH}_2\\) and styrene \\(\\text{C}_6\\text{H}_5{-}\\text{CH}{=}\\text{CH}_2\\). Usually 75 parts of butadiene and 25 parts of styrene undergo addition polymerization by the action of sodium. It is vulcanized with sulfur.\n" +
        "- Buna-S is superior to natural rubber in mechanical strength and has abrasion resistance, so it is used in the tyre industry.\n" +
        "- **Neoprene:** a synthetic rubber, the addition polymer of **chloroprene** (2-chloro-1,3-butadiene), which polymerizes rapidly in presence of oxygen: \\(n\\,\\text{CH}_2{=}\\text{C(Cl)}{-}\\text{CH}{=}\\text{CH}_2 \\to {-}[\\text{CH}_2{-}\\text{C(Cl)}{=}\\text{CH}{-}\\text{CH}_2]_n{-}\\). It is vulcanized in presence of **magnesium oxide**.\n" +
        "- Neoprene is particularly resistant to petroleum, vegetable oils, light and heat: hose pipes for gasoline, gaskets, insulator cable jackets, belts for power transmission and conveying.\n" +
        "- **Buna-N:** a copolymer of butadiene and acrylonitrile, \\([\\text{CH}_2{-}\\text{CH}{=}\\text{CH}{-}\\text{CH}_2{-}\\text{CH}_2{-}\\text{CH(CN)}]_n\\): adhesives, rubber belts, shoe soles, O-rings, gaskets.",
      table: {
        columns: ["Rubber", "Monomers", "Made or vulcanized with", "Special property and uses"],
        rows: [
          { cells: ["Buna-S (SBR)", "1,3-Butadiene and styrene (75 : 25 parts)", "Addition polymerization by sodium; vulcanized with sulfur", "Mechanical strength and abrasion resistance: tyres"] },
          { cells: ["Neoprene", "Chloroprene (2-chloro-1,3-butadiene)", "Polymerizes rapidly with oxygen; vulcanized with magnesium oxide", "Resists petroleum, oils, light and heat: gasoline hose, gaskets, cable jackets, belts"] },
          { cells: ["Buna-N", "Butadiene and acrylonitrile", "Copolymerization", "Adhesives, rubber belts, shoe soles, O-rings, gaskets"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which synthetic rubber would you choose for a hose pipe that carries petrol, and why?",
        steps: ["Petrol attacks ordinary rubber.", "Neoprene is particularly resistant to petroleum and oils."],
        answer: "Neoprene, because it resists petroleum and oils",
      },
      practiceSet: [
        { prompt: "With what is neoprene vulcanized?", answer: "Magnesium oxide" },
        { prompt: "Name the monomer of neoprene.", answer: "Chloroprene, 2-chloro-1,3-butadiene" },
        { prompt: "In what respect is Buna-S better than natural rubber?", answer: "Mechanical strength and abrasion resistance" },
        { prompt: "What does the trade name SBR stand for?", answer: "Styrene-butadiene rubber, that is, Buna-S" },
      ],
      pyqExampleId: "f85c45be-4280-494a-b752-cdfd8221b9bb",
      traps: [
        {
          title: "Vulcanizing neoprene with sulfur",
          body: "Natural rubber and Buna-S are vulcanized with sulfur; neoprene is vulcanized with magnesium oxide. Swapping them is a common lost mark.",
        },
        {
          title: "Naming one monomer of a copolymer",
          body: "Buna-S and Buna-N each have two monomers. 'Monomers of Buna-S' needs both names and both formulae: 1,3-butadiene and styrene.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccpo-addition-polymers",
      name: "Polythene, teflon, polyacrylonitrile and other addition polymers",
      intuition:
        "Each of these polymers comes from one small molecule with a C=C double bond. Open the double bond and the units join into a long chain with nothing lost, so the polymer's formula is the monomer's formula written n times. What changes from one to the next is the group on the carbon: H for polythene, F for teflon, CN for polyacrylonitrile, Cl for PVC, a benzene ring for polystyrene.",
      definition:
        "- **Polythene** \\([\\text{CH}_2{-}\\text{CH}_2]_n\\) is the simplest and most commonly used hydrocarbon thermoplastic, made from ethylene: \\(n\\,\\text{CH}_2{=}\\text{CH}_2 \\to [\\text{CH}_2{-}\\text{CH}_2]_n\\). It is of two kinds.\n" +
        "- **Low density polythene (LDP):** ethylene under high pressure (1000 to 2000 atm) and temperature (350 to 570 K) with traces of O₂ or a peroxide as initiator. Free radical addition with **H-atom abstraction** gives branching, so the chains are loosely held and the density is low. LDP films are extremely flexible but tough, chemically inert, moisture resistant and a poor conductor of electricity (melting point 110 °C).\n" +
        "- **High density polythene (HDP):** ethene with a **Ziegler-Natta catalyst** (triethyl aluminium with titanium tetrachloride) at 333 to 343 K and 6 to 7 atm. It is essentially **linear**, crystalline (melting point 144 to 150 °C), much stiffer than LDP, with high tensile strength and hardness, and more resistant to chemicals.\n" +
        "- **Teflon** is chemically polytetrafluoroethylene. Its monomer, tetrafluoroethylene \\(\\text{CF}_2{=}\\text{CF}_2\\), a gas at room temperature, is polymerized with free radical initiators such as hydrogen peroxide or ammonium persulphate at high pressure: \\(n\\,\\text{CF}_2{=}\\text{CF}_2 \\to [\\text{CF}_2{-}\\text{CF}_2]_n\\). It is tough, chemically inert and resistant to heat and corrosive reagents, because the C-F bond is very difficult to break.\n" +
        "- **Polyacrylonitrile** is made by addition polymerization of acrylonitrile with a peroxide initiator: \\(n\\,\\text{CH}_2{=}\\text{CH}{-}\\text{CN} \\to [\\text{CH}_2{-}\\text{CH(CN)}]_n\\). It resembles wool and is used as a wool substitute, and for making orlon or acrilan (blankets, shawls, sweat shirts, sweaters).\n" +
        "- From Table 15.1: **PVC** from vinyl chloride \\(\\text{CH}_2{=}\\text{CHCl}\\); **thermocol**, made from air-filled thin-walled beads of polystyrene, whose monomer is styrene \\(\\text{C}_6\\text{H}_5{-}\\text{CH}{=}\\text{CH}_2\\); perspex (acrylic glass) from methyl methacrylate; polyacrylamide from acrylamide.",
      table: {
        columns: ["Polymer", "Monomer", "How it is made", "Uses and facts"],
        rows: [
          {
            cells: ["LDP", "Ethylene, \\(\\text{CH}_2{=}\\text{CH}_2\\)", "1000 to 2000 atm, 350 to 570 K, traces of O₂ or peroxide; branched", "Pipes for agriculture, irrigation and domestic water lines; insulation of electric and submarine cables; films, squeeze bottles"],
            pyqExampleId: "4d80d48f-ec00-4ced-9b9d-e7feae4314a5",
            noteAmber: "Board 2016 asked how polythene and neoprene are prepared.",
          },
          {
            cells: ["HDP", "Ethene, \\(\\text{CH}_2{=}\\text{CH}_2\\)", "Ziegler-Natta catalyst, 333 to 343 K, 6 to 7 atm; linear", "Toys, buckets, dustbins, bottles, pipes; laboratory ware and objects needing high tensile strength and stiffness"],
            pyqExampleId: "c38c587a-a7af-4d94-9456-f43a07845247",
            noteAmber: "Board 2026 asked the catalyst used for HDP; Board 2025 asked two of its uses.",
          },
          {
            cells: ["Teflon (polytetrafluoroethylene)", "Tetrafluoroethylene, \\(\\text{CF}_2{=}\\text{CF}_2\\)", "Free radical initiator (hydrogen peroxide or ammonium persulphate), high pressure", "Non-stick cookware, oil seals, gaskets"],
            pyqExampleId: "a894cfb3-29d0-409e-9ecb-5923a69d3638",
            noteAmber: "Board 2026 asked its chemical name; 2024 asked its monomer; 2019 and 2025 its preparation.",
          },
          { cells: ["Polyacrylonitrile", "Acrylonitrile, \\(\\text{CH}_2{=}\\text{CH}{-}\\text{CN}\\)", "Peroxide initiator", "Wool substitute; orlon and acrilan for blankets, shawls, sweaters"] },
          { cells: ["PVC", "Vinyl chloride, \\(\\text{CH}_2{=}\\text{CHCl}\\)", "Addition polymerization", "Water pipes, raincoats, flooring"] },
          {
            cells: ["Polystyrene (thermocol)", "Styrene, \\(\\text{C}_6\\text{H}_5{-}\\text{CH}{=}\\text{CH}_2\\)", "Addition polymerization; thermocol is air-filled beads of polystyrene", "Thermocol is non-biodegradable, and styrene can leach out when it is heated"],
            pyqExampleId: "b15bd6a6-41ce-445d-8c47-6d9e6d390ed2",
            noteAmber: "Board 2024 asked the monomer of thermocol.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which kind of polythene is made with a Ziegler-Natta catalyst, and why is it the denser kind?",
        steps: ["The Ziegler-Natta catalyst at 6 to 7 atm gives high density polythene.", "There is no H-atom abstraction, so the chains are linear and pack closely."],
        answer: "HDP; its linear chains pack closely, so its density is high",
      },
      practiceSet: [
        { prompt: "Why is teflon chemically inert?", answer: "The C-F bond is very difficult to break" },
        { prompt: "What causes branching in low density polythene?", answer: "H-atom abstraction during the free radical polymerization" },
        { prompt: "Give two uses of PVC.", answer: "Any two of water pipes, raincoats and flooring" },
        { prompt: "Write the repeating unit of teflon.", answer: "\\({-}\\text{CF}_2{-}\\text{CF}_2{-}\\)" },
      ],
      pyqExampleId: "f5759882-18cd-44a3-80d2-c487b5cf905f",
      traps: [
        {
          title: "Swapping the uses of LDP and HDP",
          body: "Cable insulation, irrigation pipes and squeeze bottles are LDP uses (flexible, a poor conductor). Buckets, dustbins, toys and laboratory ware are HDP uses (stiff and strong).",
        },
        {
          title: "Conditions on the wrong kind of polythene",
          body: "Very high pressure with O₂ or a peroxide gives LDP; a low pressure with the Ziegler-Natta catalyst gives HDP. Quote the conditions with the right kind.",
        },
        {
          title: "Leaving n off one side",
          body: "A polymerization equation has n molecules of monomer on the left and the repeating unit in brackets with subscript n on the right. An equation without n on both sides is incomplete.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccpo-nylons",
      name: "Nylon 6,6, nylon 6 and nylon 2-nylon 6",
      intuition:
        "All nylons are chains held together by amide links, CO-NH, the same link that holds a protein together. The numbers in the name count carbon atoms. Nylon 6,6 joins two different six-carbon molecules, an acid and an amine, and throws out water at each link. Nylon 6 starts from one six-carbon ring that simply opens and adds on.",
      definition:
        "- **Polyamides** (nylons) contain \\({-}\\text{CO}{-}\\text{NH}{-}\\) groups as the inter-unit linkages. Nylon is the generic name of synthetic linear polyamides made by condensation of dicarboxylic acids with diamines, by self condensation of an amino acid, or by ring opening polymerization of lactams.\n" +
        "- A **lactam** is the cyclic amide formed when an amino group and a carboxyl group in the same molecule react intramolecularly. (A cyclic ester formed the same way from OH and COOH is a **lactone**.)\n" +
        "- **Nylon 6,6:** adipic acid \\(\\text{HOOC}{-}(\\text{CH}_2)_4{-}\\text{COOH}\\) and hexamethylenediamine \\(\\text{H}_2\\text{N}{-}(\\text{CH}_2)_6{-}\\text{NH}_2\\) on mixing form the **nylon salt** (hexamethylene diammonium adipate), which on condensation polymerization at high temperature and pressure gives the polyamide fibre nylon 6,6. The numerals 6,6 are the numbers of carbon atoms in the two bifunctional monomers.\n" +
        "- Nylon 6,6 is a high molecular mass (12,000 to 50,000 u) linear condensation polymer, of high tensile strength, that does not soak in water: sheets, bristles for brushes, surgical sutures, textile fabrics.\n" +
        "- **Nylon 6:** ε-caprolactam heated with water at 533 to 543 K undergoes **ring opening polymerization** to the polyamide \\([\\text{NH}{-}(\\text{CH}_2)_5{-}\\text{CO}]_n\\). The 6 is the six carbon atoms in the monomer unit. Its high tensile strength and lustre make nylon 6 fibres useful for tyre cords, fabrics and ropes.\n" +
        "- **Nylon 2-nylon 6:** a polyamide copolymer of glycine \\(\\text{H}_2\\text{N}{-}\\text{CH}_2{-}\\text{COOH}\\) and ε-amino caproic acid \\(\\text{H}_2\\text{N}{-}(\\text{CH}_2)_5{-}\\text{COOH}\\), repeating unit \\([\\text{NH}{-}\\text{CH}_2{-}\\text{CO}{-}\\text{NH}{-}(\\text{CH}_2)_5{-}\\text{CO}]_n\\). It is **biodegradable**.\n" +
        "- Board 2019 also asked for **Dextron**, a biodegradable polymer that the present textbook does not cover: give it less time.",
      formula: {
        label: "Formation of nylon 6,6",
        latex:
          "n\\,\\text{HOOC}{-}(\\text{CH}_2)_4{-}\\text{COOH} + n\\,\\text{H}_2\\text{N}{-}(\\text{CH}_2)_6{-}\\text{NH}_2 \\xrightarrow[-\\,\\text{H}_2\\text{O}]{553\\ \\text{K},\\ \\text{high pressure}} [\\text{CO}{-}(\\text{CH}_2)_4{-}\\text{CO}{-}\\text{NH}{-}(\\text{CH}_2)_6{-}\\text{NH}]_n",
      },
      authoredExample: {
        prompt: "Write the preparation of nylon 6, explain its name, and give two of its uses.",
        steps: [
          "Monomer: ε-caprolactam, a cyclic amide (lactam).",
          "Preparation: heated with water at 533 to 543 K, the ring opens and the units add on one at a time (ring opening polymerization):",
          "\\(n\\,(\\varepsilon\\text{-caprolactam}) \\xrightarrow[533 \\text{ to } 543\\ \\text{K}]{\\text{H}_2\\text{O}} [\\text{NH}{-}(\\text{CH}_2)_5{-}\\text{CO}]_n\\)",
          "Name: the monomer unit contains six carbon atoms, hence nylon 6.",
          "Uses: tyre cords and ropes (high tensile strength), and fabrics (lustre).",
        ],
        answer: "Nylon 6 is made by ring opening polymerization of ε-caprolactam with water at 533 to 543 K; it is used for tyre cords, fabrics and ropes",
      },
      selfCheckExample: {
        prompt: "Write the repeating unit of nylon 2-nylon 6 and explain the numbers 2 and 6 in its name.",
        steps: [
          "Repeating unit: \\([\\text{NH}{-}\\text{CH}_2{-}\\text{CO}{-}\\text{NH}{-}(\\text{CH}_2)_5{-}\\text{CO}]_n\\).",
          "The NH-CH₂-CO part comes from glycine, with 2 carbon atoms; the NH-(CH₂)₅-CO part comes from ε-amino caproic acid, with 6.",
        ],
        answer: "2 counts the carbons of glycine and 6 those of ε-amino caproic acid",
      },
      practiceSet: [
        { prompt: "What is a lactam?", answer: "A cyclic amide formed when an amino group and a carboxyl group in the same molecule react intramolecularly" },
        { prompt: "Name the salt formed in the first step of making nylon 6,6.", answer: "Nylon salt, hexamethylene diammonium adipate" },
        { prompt: "Give two uses of nylon 6,6.", answer: "Any two of sheets, bristles for brushes, surgical sutures and textile fabrics" },
        { prompt: "Which nylon named in the textbook is biodegradable?", answer: "Nylon 2-nylon 6" },
      ],
      pyqExampleId: "090b14f5-684e-4906-a077-aa1387f2fd55",
      traps: [
        {
          title: "One monomer or two",
          body: "Nylon 6 comes from one monomer, ε-caprolactam, by ring opening. Nylon 6,6 comes from two, adipic acid and hexamethylenediamine, by condensation. Writing caprolactam for nylon 6,6 is a common slip.",
        },
        {
          title: "Leaving out the nylon salt",
          body: "When the board asks for the 'reactions' of nylon 6,6, write both: the two monomers forming the nylon salt, then the salt condensing to the polymer with loss of water.",
        },
        {
          title: "Counting the carbons of caprolactam",
          body: "The ring of ε-caprolactam holds six carbon atoms (five CH₂ groups and one C=O) and one nitrogen: seven ring atoms, but six carbons.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccpo-polyesters-resins",
      name: "Terylene, glyptal, bakelite and other condensation polymers",
      intuition:
        "A diol and a diacid can join end to end, losing water each time and leaving an ester link: that gives polyesters such as terylene and glyptal. Phenol and formaldehyde join too, through CH₂ bridges, but phenol can link in several directions, so in a hot mould the chains tie into one rigid network: bakelite.",
      definition:
        "- **Polyesters** have the **ester linkage** \\({-}\\text{CO}{-}\\text{O}{-}\\) joining the repeating units.\n" +
        "- **Terylene** (also called dacron), the most important polyester fibre, is made by condensation polymerization of ethylene glycol and terephthalic acid with a zinc acetate-antimony trioxide catalyst at 420 to 460 K. It has a high melting point (265 °C) and resists chemicals and water: wrinkle-free fabrics blended with cotton (terycot) and wool (terywool), and glass reinforcing material in safety helmets.\n" +
        "- **PET**, polyethylene terephthalate, is another trade name of this polyester and is the most common thermoplastic: bottles and packaging containers.\n" +
        "- **Glyptal:** from ethylene glycol and phthalic acid; used in paints and lacquers. **Polycarbonates** (from bisphenol and phosgene) are also polyesters, high melting thermosetting resins.\n" +
        "- **Bakelite**, the oldest synthetic polymer, is the thermosetting polymer of **phenol and formaldehyde**. Stages 1 and 2: with an acid or base catalyst they give hydroxymethyl phenols, which condense through \\({-}\\text{CH}_2{-}\\) bridges to a moulding powder, **novolac**. Stage 3: novolac is heated in moulds at 138 to 176 °C and high pressure; many cross links form, giving rigid, insoluble, infusible bakelite of high tensile strength.\n" +
        "- Bakelite can serve as a substitute for glass: telephone instruments, kitchenware, electric insulators.\n" +
        "- **Melamine-formaldehyde resin:** condensation of melamine and formaldehyde gives a cross-linked, heat and moisture resistant thermosetting plastic: formica table tops, plastic dinner-ware. **Urea-formaldehyde resin:** unbreakable dinner-ware, decorative laminates.",
      formula: {
        label: "Formation of terylene",
        latex:
          "n\\,\\text{HO}{-}\\text{CH}_2{-}\\text{CH}_2{-}\\text{OH} + n\\,\\text{HOOC}{-}\\text{C}_6\\text{H}_4{-}\\text{COOH} \\xrightarrow[420 \\text{ to } 460\\ \\text{K};\\ -\\,\\text{H}_2\\text{O}]{\\text{Zn acetate, Sb}_2\\text{O}_3} [\\text{O}{-}\\text{CH}_2{-}\\text{CH}_2{-}\\text{O}{-}\\text{CO}{-}\\text{C}_6\\text{H}_4{-}\\text{CO}]_n",
      },
      authoredExample: {
        prompt: "Name the raw materials of bakelite and describe the three stages of its preparation.",
        steps: [
          "Raw materials: phenol, \\(\\text{C}_6\\text{H}_5\\text{OH}\\), and formaldehyde, \\(\\text{HCHO}\\).",
          "Stage 1: with an acid or base catalyst they react to give hydroxymethyl phenols: \\(\\text{C}_6\\text{H}_5\\text{OH} + \\text{HCHO} \\xrightarrow{\\text{acid or base}} \\text{HO}{-}\\text{C}_6\\text{H}_4{-}\\text{CH}_2\\text{OH}\\).",
          "Stage 2: these condense, losing water, and the rings link through \\({-}\\text{CH}_2{-}\\) bridges to the linear moulding powder novolac.",
          "Stage 3: novolac is heated in a mould at 138 to 176 °C and high pressure; cross links form and give rigid, insoluble, infusible bakelite.",
        ],
        answer: "Phenol and formaldehyde give novolac in two stages; heating novolac in a mould cross-links it to bakelite",
      },
      selfCheckExample: {
        prompt: "Name the monomers of glyptal and give its use.",
        steps: ["Glyptal is a polyester of ethylene glycol and phthalic acid.", "Its use is in paints and lacquers."],
        answer: "Ethylene glycol and phthalic acid; paints and lacquers",
      },
      practiceSet: [
        { prompt: "Name the type of polymer that contains the linkage \\({-}\\text{CO}{-}\\text{O}{-}\\).", answer: "A polyester" },
        { prompt: "What is novolac?", answer: "The linear moulding powder formed from phenol and formaldehyde in the first two stages of making bakelite" },
        { prompt: "Give one use of melamine-formaldehyde resin.", answer: "Formica table tops or plastic dinner-ware" },
        { prompt: "Why can bakelite not be softened again by heating?", answer: "It is cross linked into a rigid three dimensional network, so it is infusible" },
      ],
      pyqExampleId: "7b671131-dfc1-4699-9c98-fbedb98810e1",
      traps: [
        {
          title: "Wrong aldehyde or wrong alcohol for bakelite",
          body: "Bakelite needs phenol and formaldehyde. Benzaldehyde, acetaldehyde or benzyl alcohol cannot give the CH₂ bridges and the cross-linked network.",
        },
        {
          title: "Three names, one polymer",
          body: "Terylene, dacron and PET are the same polyester, polyethylene terephthalate. A question on any one of the names wants the same monomers.",
        },
        {
          title: "Phthalic or terephthalic acid",
          body: "Terylene is made from terephthalic acid; glyptal from phthalic acid. Both use ethylene glycol, so the acid is what tells them apart.",
        },
      ],
    },
  ],
};
