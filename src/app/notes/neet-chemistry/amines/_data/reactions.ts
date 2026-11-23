import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_AM_REACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Basicity and Reactions of Amines",
  title: "Basicity and Reactions of Amines",
  oneLineDefinition:
    "Why amines are bases and how their strength changes from aliphatic to aromatic amines, how the N-H hydrogen is acylated, the Hinsberg and carbylamine tests that tell primary, secondary and tertiary amines apart, and the substitution reactions of the aniline ring.",
  whyItMatters:
    "Six NEET questions from 2021 to 2026. Two rank basic strength: four amines by their pKb (2025), and the amine from reducing p-nitrotoluene against aniline (Re-NEET 2026). Two are tests: which amine gives a Hinsberg product that dissolves in alkali (2021), and the foul-smelling isocyanide reached from chloroethane and from propanamide (2026). One asks which compound gives the carbylamine test but no Friedel-Crafts alkylation (Re-NEET 2024), and one what a Grignard reagent does with a primary amine (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ncham-basicity",
      name: "Basic strength of amines",
      visualizationSlug: "neet-amine-basicity",
      intuition:
        "An amine is a base because the lone pair on its nitrogen can take a proton. Anything that makes that lone pair more available makes a stronger base. Alkyl groups push electrons onto nitrogen, so aliphatic amines are stronger bases than ammonia. In aniline the lone pair is spread into the benzene ring, so it is far less available, and aniline is a weaker base than ammonia.",
      definition:
        "- The smaller the \\(pK_b\\), the stronger the base. NCERT values: \\(\\text{NH}_3\\) 4.75; methanamine 3.38; N-methylmethanamine 3.27; N,N-dimethylmethanamine 4.22; ethanamine 3.29; N-ethylethanamine 3.00; N,N-diethylethanamine 3.25; benzenamine (aniline) 9.38; phenylmethanamine (benzylamine) 4.70; N-methylaniline 9.30.\n" +
        "- **Gas phase**, where only the electron push of alkyl groups counts: 3° > 2° > 1° > \\(\\text{NH}_3\\).\n" +
        "- **In water**, solvation of the ion by hydrogen bonding and crowding around nitrogen also count. Methyl series: \\(\\text{(CH}_3)_2\\text{NH} > \\text{CH}_3\\text{NH}_2 > \\text{(CH}_3)_3\\text{N} > \\text{NH}_3\\). Ethyl series: \\(\\text{(C}_2\\text{H}_5)_2\\text{NH} > \\text{(C}_2\\text{H}_5)_3\\text{N} > \\text{C}_2\\text{H}_5\\text{NH}_2 > \\text{NH}_3\\).\n" +
        "- **Aryl amines** are weaker bases than ammonia: the lone pair is in conjugation with the ring and less available for a proton.\n" +
        "- On the ring, electron releasing groups such as \\(\\text{-OCH}_3\\) and \\(\\text{-CH}_3\\) raise basic strength; electron withdrawing groups such as \\(\\text{-NO}_2\\), \\(\\text{-SO}_3\\text{H}\\), \\(\\text{-COOH}\\) and halogens lower it.",
      formula: {
        label: "Base dissociation of an amine",
        latex: "\\text{R-NH}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{R-NH}_3^+ + \\text{OH}^- \\qquad K_b = \\dfrac{[\\text{R-NH}_3^+][\\text{OH}^-]}{[\\text{R-NH}_2]} \\qquad pK_b = -\\log K_b",
        symbols: [
          { symbol: "\\(K_b\\)", meaning: "base dissociation constant: larger means a stronger base" },
          { symbol: "\\(pK_b\\)", meaning: "minus the log of the constant: smaller means a stronger base" },
        ],
      },
      authoredExample: {
        prompt: "Arrange NH₃, CH₃NH₂, (CH₃)₂NH and (CH₃)₃N in decreasing basic strength in water.",
        steps: [
          "All three methylamines are stronger than ammonia, because methyl groups push electrons onto nitrogen.",
          "In water, \\(\\text{(CH}_3)_2\\text{NH}\\) has two methyl groups and still an N-H to hydrogen bond its ion to water: strongest.",
          "\\(\\text{(CH}_3)_3\\text{N}\\) has no N-H for that hydrogen bonding and is crowded, so it falls below \\(\\text{CH}_3\\text{NH}_2\\).",
          "The \\(pK_b\\) values 3.27 < 3.38 < 4.22 < 4.75 agree.",
        ],
        answer: "\\(\\text{(CH}_3)_2\\text{NH} > \\text{CH}_3\\text{NH}_2 > \\text{(CH}_3)_3\\text{N} > \\text{NH}_3\\)",
      },
      selfCheckExample: {
        prompt: "Which is the stronger base, benzylamine (C₆H₅CH₂NH₂) or aniline (C₆H₅NH₂), and why?",
        steps: [
          "In benzylamine the \\(\\text{NH}_2\\) is on a \\(\\text{CH}_2\\) group, not on the ring, so its lone pair is not spread into the ring.",
          "In aniline the lone pair is in conjugation with the ring and less available.",
          "The \\(pK_b\\) values agree: 4.70 for benzylamine, 9.38 for aniline.",
        ],
        answer: "Benzylamine",
      },
      practiceSet: [
        { prompt: "In the gas phase, which is the strongest base: CH₃NH₂, (CH₃)₂NH or (CH₃)₃N?", answer: "\\(\\text{(CH}_3)_3\\text{N}\\): with no water, only the electron push of the alkyl groups counts" },
        { prompt: "Amine X has a pKb of 3.3 and amine Y a pKb of 9.4. Which is the stronger base?", answer: "X: a smaller \\(pK_b\\) means a stronger base" },
        { prompt: "Which is the weaker base: aniline or 4-nitroaniline?", answer: "4-Nitroaniline: the \\(\\text{NO}_2\\) group withdraws electrons" },
        { prompt: "Which is the stronger base: aniline or ammonia?", answer: "Ammonia (\\(pK_b\\) 4.75 against 9.38 for aniline)" },
      ],
      pyqExampleId: "fd8848b6-c1d9-42d5-b62e-19e28ae35033",
      traps: [
        {
          title: "Smaller pKb means a stronger base",
          body: "\\(pK_b\\) runs the opposite way to basic strength. N-ethylethanamine, \\(pK_b\\) 3.00, is a much stronger base than aniline, \\(pK_b\\) 9.38.",
        },
        {
          title: "The tertiary amine is not the strongest in water",
          body: "In the gas phase a tertiary amine is the strongest base. In water it has no N-H to hydrogen bond its ion and is crowded, so trimethylamine is weaker than methylamine and triethylamine is weaker than diethylamine.",
        },
        {
          title: "The methyl and ethyl orders differ",
          body: "In water the methyl series runs 2° > 1° > 3°, while the ethyl series runs 2° > 3° > 1°.",
        },
        {
          title: "Aniline is weaker than ammonia",
          body: "Aniline's lone pair is shared with the ring, so aniline (\\(pK_b\\) 9.38) is a weaker base than ammonia (\\(pK_b\\) 4.75), not a stronger one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ncham-acylation",
      name: "Salts, acylation and the N-H hydrogen",
      intuition:
        "The nitrogen of an amine does two jobs. Its lone pair takes a proton from an acid, giving a salt, or attacks an acid chloride or anhydride, giving an amide. And a hydrogen on that nitrogen is acidic enough to be pulled off by a very strong base such as a Grignard reagent. A tertiary amine has no N-H, so it cannot be acylated.",
      definition:
        "- **Salts:** amines react with acids to give ammonium salts, for example \\(\\text{C}_6\\text{H}_5\\text{NH}_2 + \\text{HCl} \\rightarrow \\text{C}_6\\text{H}_5\\text{NH}_3^+\\text{Cl}^-\\), anilinium chloride.\n" +
        "- **Acylation:** primary and secondary amines react with acid chlorides, anhydrides and esters. An acyl group replaces a hydrogen on the nitrogen and an amide forms.\n" +
        "- The reaction is run with a base stronger than the amine, such as **pyridine**, which removes the HCl formed and shifts the equilibrium to the right.\n" +
        "- **Benzoylation** is acylation with benzoyl chloride, \\(\\text{C}_6\\text{H}_5\\text{COCl}\\).\n" +
        "- **Grignard reagents** take a proton from any acidic hydrogen. Water, alcohols and amines are acidic enough, and the Grignard reagent becomes the hydrocarbon \\(\\text{R-H}\\).",
      formula: {
        label: "Acetylation of ethanamine",
        latex: "\\text{C}_2\\text{H}_5\\text{NH}_2 + \\text{CH}_3\\text{COCl} \\xrightarrow{\\text{pyridine}} \\text{C}_2\\text{H}_5\\text{NHCOCH}_3 + \\text{HCl}",
        symbols: [
          { symbol: "\\(\\text{CH}_3\\text{COCl}\\)", meaning: "ethanoyl chloride, the acylating agent" },
          { symbol: "\\(\\text{C}_2\\text{H}_5\\text{NHCOCH}_3\\)", meaning: "N-ethylethanamide, the amide formed" },
        ],
      },
      authoredExample: {
        prompt: "Aniline is treated with acetic anhydride, (CH₃CO)₂O. Name the products.",
        steps: [
          "The lone pair of the \\(\\text{NH}_2\\) group attacks the anhydride, and an acetyl group replaces one H on nitrogen.",
          "The amide formed is \\(\\text{C}_6\\text{H}_5\\text{NHCOCH}_3\\), acetanilide.",
          "The other half of the anhydride leaves as ethanoic acid, \\(\\text{CH}_3\\text{COOH}\\).",
        ],
        answer: "Acetanilide and ethanoic acid",
      },
      selfCheckExample: {
        prompt: "Which of CH₃NH₂, (CH₃)₂NH and (CH₃)₃N react with ethanoyl chloride to give an amide?",
        steps: [
          "Acylation replaces a hydrogen on the nitrogen, so the amine must have an N-H.",
          "\\(\\text{CH}_3\\text{NH}_2\\) has two and \\(\\text{(CH}_3)_2\\text{NH}\\) has one. \\(\\text{(CH}_3)_3\\text{N}\\) has none.",
        ],
        answer: "CH₃NH₂ and (CH₃)₂NH; the tertiary amine does not",
      },
      practiceSet: [
        { prompt: "Why is pyridine added when an amine is acylated with an acid chloride?", answer: "It is a stronger base than the amine and removes the HCl formed, shifting the equilibrium to the right" },
        { prompt: "What does methanamine give with benzoyl chloride?", answer: "N-methylbenzamide, \\(\\text{CH}_3\\text{NHCOC}_6\\text{H}_5\\), and HCl" },
        { prompt: "What salt forms when aniline dissolves in dilute HCl?", answer: "Anilinium chloride, \\(\\text{C}_6\\text{H}_5\\text{NH}_3^+\\text{Cl}^-\\)" },
        { prompt: "Why must a Grignard reagent be kept away from amines that have an N-H bond?", answer: "The N-H hydrogen is acidic enough to protonate it, and the Grignard reagent is turned into a hydrocarbon" },
      ],
      pyqExampleId: "f80de171-7023-4028-8903-8365d3ad1473",
      traps: [
        {
          title: "A tertiary amine is not acylated",
          body: "Acylation swaps a hydrogen on nitrogen for an acyl group. A tertiary amine such as \\(\\text{(C}_2\\text{H}_5)_3\\text{N}\\) has no N-H, so it gives no amide.",
        },
        {
          title: "A Grignard reagent and an amine give a hydrocarbon",
          body: "The Grignard reagent acts as a base and takes the N-H proton. Its alkyl group becomes an alkane. No new C-N or C-C bond forms.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ncham-tests",
      name: "Hinsberg and carbylamine tests",
      intuition:
        "Primary, secondary and tertiary amines differ in how many hydrogens sit on the nitrogen: two, one or none. Both tests read that number. The carbylamine test needs two N-H hydrogens, so only a primary amine passes. The Hinsberg test goes further: a primary amine's product keeps an acidic N-H and dissolves in alkali, a secondary amine's product has no N-H left and does not, and a tertiary amine does not react at all.",
      definition:
        "- **Hinsberg's reagent** is benzenesulphonyl chloride, \\(\\text{C}_6\\text{H}_5\\text{SO}_2\\text{Cl}\\). Today it is replaced by p-toluenesulphonyl chloride.\n" +
        "- A **primary** amine gives an N-alkylbenzenesulphonamide. The H left on its nitrogen is made acidic by the strongly electron withdrawing sulphonyl group, so the product **dissolves in alkali**.\n" +
        "- A **secondary** amine gives an N,N-dialkylbenzenesulphonamide with no H on nitrogen, which is **insoluble in alkali**.\n" +
        "- A **tertiary** amine does **not react**.\n" +
        "- **Carbylamine test:** aliphatic and aromatic **primary** amines heated with chloroform and ethanolic KOH give **isocyanides** (carbylamines), which smell foul. Secondary and tertiary amines do not.\n" +
        "- An isocyanide also forms when an alkyl halide reacts with AgCN; KCN gives the nitrile instead.",
      table: {
        columns: ["Test", "Reagent", "Primary amine", "Secondary amine", "Tertiary amine"],
        rows: [
          { cells: ["Hinsberg", "Benzenesulphonyl chloride", "Sulphonamide, soluble in alkali", "Sulphonamide, insoluble in alkali", "No reaction"], pyqExampleId: "c05b2679-3802-4fb1-9fd9-da6d3b7392f8", noteAmber: "NEET 2021: of a nitro compound and three amines, only ethanamine gave a solid that dissolves in alkali." },
          { cells: ["Carbylamine", "\\(\\text{CHCl}_3\\) and ethanolic KOH, heat", "Isocyanide, foul smell", "No reaction", "No reaction"], pyqExampleId: "10e8d528-229f-488d-81bb-8df7e94fbe75", noteAmber: "NEET 2026: chloroethane with AgCN, and propanamide through Hoffmann then the carbylamine reaction, both gave C₂H₅NC." },
        ],
      },
      pyqExampleId: "c05b2679-3802-4fb1-9fd9-da6d3b7392f8",
      selfCheckExample: {
        prompt: "Aniline and N-methylaniline are in two unlabelled bottles. How does the carbylamine test tell them apart?",
        steps: [
          "Aniline, \\(\\text{C}_6\\text{H}_5\\text{NH}_2\\), is a primary amine. Heated with \\(\\text{CHCl}_3\\) and ethanolic KOH it gives phenyl isocyanide, \\(\\text{C}_6\\text{H}_5\\text{NC}\\), with a foul smell.",
          "N-methylaniline, \\(\\text{C}_6\\text{H}_5\\text{NHCH}_3\\), is secondary and gives no isocyanide.",
        ],
        answer: "Aniline gives the foul smell of an isocyanide; N-methylaniline gives none",
      },
      practiceSet: [
        { prompt: "Why does the sulphonamide from a primary amine dissolve in alkali?", answer: "The H on its nitrogen is made acidic by the strongly electron withdrawing sulphonyl group" },
        { prompt: "Does N,N-dimethylaniline react with benzenesulphonyl chloride?", answer: "No: a tertiary amine has no H on nitrogen" },
        { prompt: "What forms when aniline is heated with chloroform and ethanolic KOH?", answer: "Phenyl isocyanide, \\(\\text{C}_6\\text{H}_5\\text{NC}\\), which smells foul" },
        { prompt: "Which reagent has replaced benzenesulphonyl chloride in the Hinsberg test today?", answer: "p-Toluenesulphonyl chloride" },
      ],
      traps: [
        {
          title: "Insoluble is not the same as no reaction",
          body: "A secondary amine does react with Hinsberg's reagent. Its product is insoluble in alkali. It is the tertiary amine that does not react at all.",
        },
        {
          title: "The carbylamine test is for primary amines only",
          body: "Both aliphatic and aromatic primary amines give the isocyanide. Secondary amines such as diphenylamine and tertiary amines such as triethylamine do not.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ncham-aniline-ring",
      name: "Substitution on the aniline ring",
      intuition:
        "The NH₂ group feeds its lone pair into the ring, so aniline is attacked by electrophiles very easily, at the ortho and para positions. That is often too easy: bromine water puts on three bromines at once, and strong acids turn the NH₂ into NH₃⁺, which behaves quite differently. Acetylating the NH₂ first tames it, and the acetyl group is hydrolysed off at the end.",
      definition:
        "- \\(\\text{-NH}_2\\) is a powerful **activating**, **ortho and para directing** group.\n" +
        "- **Bromination:** aniline with bromine water at room temperature gives a white precipitate of **2,4,6-tribromoaniline**.\n" +
        "- **Protection:** acetylation gives acetanilide. The nitrogen's lone pair is now also shared with the C=O, so the group activates the ring less, and one substituent goes in, mostly at para. Hydrolysis then gives back the free \\(\\text{NH}_2\\).\n" +
        "- **Nitration:** direct nitration gives tarry oxidation products and a large amount of the meta product, because in the strong acid aniline is protonated to the **anilinium ion**, which is meta directing. Protecting the \\(\\text{NH}_2\\) first gives the para product as the main one.\n" +
        "- **Sulphonation:** aniline with concentrated \\(\\text{H}_2\\text{SO}_4\\) gives anilinium hydrogensulphate, which on heating at 453 to 473 K gives **sulphanilic acid** (4-aminobenzenesulphonic acid).\n" +
        "- **No Friedel-Crafts reaction:** the nitrogen forms a salt with \\(\\text{AlCl}_3\\), the Lewis acid catalyst, and the positive nitrogen then deactivates the ring.",
      table: {
        columns: ["Reaction", "Reagent", "Main product"],
        rows: [
          { cells: ["Bromination", "Bromine water, room temperature", "2,4,6-Tribromoaniline, white precipitate"] },
          { cells: ["Bromination after protection", "Acetylate, then \\(\\text{Br}_2\\) in ethanoic acid, then hydrolyse", "4-Bromoaniline"] },
          { cells: ["Direct nitration", "Concentrated \\(\\text{HNO}_3\\) and \\(\\text{H}_2\\text{SO}_4\\)", "4-Nitroaniline 51%, 3-nitroaniline 47%, 2-nitroaniline 2%"] },
          { cells: ["Nitration after protection", "Acetylate, then nitrate, then hydrolyse", "4-Nitroaniline"] },
          { cells: ["Sulphonation", "Concentrated \\(\\text{H}_2\\text{SO}_4\\), 453 to 473 K", "Sulphanilic acid"] },
          { cells: ["Friedel-Crafts", "Alkyl or acyl chloride with anhydrous \\(\\text{AlCl}_3\\)", "No reaction: N forms a salt with \\(\\text{AlCl}_3\\)"], pyqExampleId: "56b4240e-28c8-41f8-819f-a0c2448cae06", noteAmber: "Re-NEET 2024: aniline gives the carbylamine test but no Friedel-Crafts alkylation; pyridine, N-methylaniline and triethylamine are not primary amines." },
        ],
      },
      pyqExampleId: "56b4240e-28c8-41f8-819f-a0c2448cae06",
      selfCheckExample: {
        prompt: "How is 4-bromoaniline made from aniline as the main product?",
        steps: [
          "Bromine water on aniline itself would put bromine at both ortho positions and the para position at once.",
          "So first acetylate the \\(\\text{NH}_2\\) with acetic anhydride, giving acetanilide, which activates the ring less.",
          "Bromine in ethanoic acid then gives mainly 4-bromoacetanilide, and hydrolysis removes the acetyl group.",
        ],
        answer: "Acetylate, brominate, then hydrolyse",
      },
      practiceSet: [
        { prompt: "What forms when aniline is shaken with bromine water at room temperature?", answer: "A white precipitate of 2,4,6-tribromoaniline" },
        { prompt: "Why does direct nitration of aniline give a large amount of 3-nitroaniline?", answer: "In the strong acid aniline is protonated to the anilinium ion, which is meta directing" },
        { prompt: "What is the main product when aniline is heated with concentrated H₂SO₄ at 453 to 473 K?", answer: "Sulphanilic acid, 4-aminobenzenesulphonic acid" },
        { prompt: "Why does the NHCOCH₃ group of acetanilide activate the ring less than the NH₂ group of aniline?", answer: "The nitrogen's lone pair is also shared with the C=O group by resonance, so less of it reaches the ring" },
      ],
      traps: [
        {
          title: "Bromine water does not stop at one bromine",
          body: "Aniline is so strongly activated that bromine water gives 2,4,6-tribromoaniline at once. A single bromine needs the \\(\\text{NH}_2\\) protected by acetylation first.",
        },
        {
          title: "Nitrating aniline gives a lot of meta product",
          body: "The \\(\\text{NH}_2\\) group directs ortho and para, but in the nitrating acid most of the aniline is the anilinium ion, which directs meta. Direct nitration gives 47% of 3-nitroaniline.",
        },
        {
          title: "Aniline fails Friedel-Crafts because of the catalyst",
          body: "The nitrogen of aniline gives its lone pair to \\(\\text{AlCl}_3\\) and forms a salt. The positive nitrogen deactivates the ring, so no alkylation or acylation occurs.",
        },
      ],
    },
  ],
};
