import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AM_BASICITY_NOTE: SubtopicNote = {
  subtopicName: "Basicity of Amines",
  title: "Basic Strength of Amines",
  oneLineDefinition:
    "Why amines are bases, how pKb measures their strength, why secondary amines are the strongest aliphatic bases in water, and why aniline and other arylamines are much weaker.",
  whyItMatters:
    "8 questions. Three were set in board papers: the weakest base among four substituted anilines (2014), why amines are basic and which of dimethylamine and diethylamine is stronger (2024), and the order of basic strength of amines and ammonia (2026). The textbook adds pKb orders, why primary amines beat ammonia, and the order expected from the +I effect alone.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccam-basic-nature",
      name: "Why amines are basic, and pKb",
      intuition:
        "The nitrogen of every amine keeps one lone pair of electrons, the same lone pair that makes ammonia a base. It can share that pair with anything short of electrons, or use it to pick up a proton from water and leave OH⁻ behind. The more easily the amine takes the proton, the stronger the base, the larger its Kb and the smaller its pKb.",
      definition:
        "- The basic nature of amines is due to the **lone pair of electrons on the nitrogen atom**.\n" +
        "- **Lewis base:** the amine shares its lone pair with an electron deficient species, as trimethylamine does with boron trifluoride: \\((\\text{CH}_3)_3\\text{N:} + \\text{BF}_3 \\rightarrow (\\text{CH}_3)_3\\text{N}^+\\text{-BF}_3^-\\).\n" +
        "- **Lowry-Bronsted base:** the amine accepts \\(\\text{H}^+\\) from water: \\(\\text{R-NH}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{R-NH}_3^+ + \\text{OH}^-\\).\n" +
        "- Basic strength is given by Kb or pKb. For a stronger base the equilibrium lies further right: **larger Kb, smaller pKb**.\n" +
        "- **Laboratory test:** an aqueous solution of a water soluble amine turns red litmus blue. A water insoluble amine dissolves in aqueous HCl as a soluble substituted ammonium chloride, and excess aqueous NaOH gives back the amine.\n" +
        "- **Zwitter ion:** sulfanilic acid, \\(\\text{H}_2\\text{N-C}_6\\text{H}_4\\text{-SO}_3\\text{H}\\), carries an acidic and a basic group in one molecule. The acid protonates the amine, so it exists as the dipolar ion \\(^+\\text{H}_3\\text{N-C}_6\\text{H}_4\\text{-SO}_3^-\\), called a zwitter ion (textbook section 13.9).",
      formula: {
        label: "Amine as a Lowry-Bronsted base",
        latex: "\\text{R-NH}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{R-NH}_3^+ + \\text{OH}^-, \\qquad \\text{stronger base} \\Rightarrow \\text{larger } K_b,\\ \\text{smaller p}K_b",
      },
      authoredExample: {
        prompt:
          "Explain, with an equation, why ethylamine is a Lowry-Bronsted base. Which is the stronger base, ethylamine (pKb 3.29) or ammonia (pKb 4.75)?",
        steps: [
          "The nitrogen of ethylamine has a lone pair, which accepts a proton from water:",
          "\\(\\text{C}_2\\text{H}_5\\text{NH}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{C}_2\\text{H}_5\\text{NH}_3^+ + \\text{OH}^-\\)",
          "It accepts \\(\\text{H}^+\\), so it is a Lowry-Bronsted base, and the \\(\\text{OH}^-\\) formed makes the solution basic.",
          "The smaller the pKb, the stronger the base: \\(3.29 < 4.75\\).",
        ],
        answer: "Ethylamine is the stronger base (smaller pKb, 3.29)",
      },
      selfCheckExample: {
        prompt: "Aniline does not dissolve in water but does dissolve in dilute HCl. Explain with an equation, and say how the aniline is got back.",
        steps: [
          "Aniline is a base, so it takes a proton from HCl and forms a salt that is soluble in water:",
          "\\(\\text{C}_6\\text{H}_5\\text{NH}_2 + \\text{HCl} \\rightarrow \\text{C}_6\\text{H}_5\\text{NH}_3^+\\text{Cl}^-\\) (anilinium chloride)",
          "Adding excess aqueous NaOH removes the proton and the insoluble aniline separates again.",
        ],
        answer: "It forms water soluble anilinium chloride; excess NaOH regenerates aniline",
      },
      practiceSet: [
        { prompt: "What feature of an amine molecule makes it basic?", answer: "The lone pair of electrons on the nitrogen atom" },
        { prompt: "Does a smaller pKb mean a stronger or a weaker base?", answer: "A stronger base" },
        { prompt: "What does an aqueous solution of methylamine do to red litmus?", answer: "Turns it blue" },
        { prompt: "What is a zwitter ion?", answer: "A dipolar ion carrying a positive and a negative charge, formed when the acidic and basic groups of one molecule react" },
      ],
      pyqExampleId: "8c959f2c-07ad-46ac-b539-4db037472805",
      traps: [
        {
          title: "Reading pKb as strength",
          body: "A LARGER pKb means a WEAKER base. Aniline (pKb 9.38) is far weaker than methylamine (pKb 3.38), not stronger.",
        },
        {
          title: "Naming only one theory",
          body: "When asked why amines are basic, give the lone pair and show it at work: one Lewis example (with \\(\\text{BF}_3\\)) or the Lowry-Bronsted equation with water. A sentence with no equation is half an answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccam-aliphatic-order",
      name: "Basic strength of aliphatic amines: +I effect and solvation",
      intuition:
        "Two effects pull in opposite directions. Each alkyl group pushes electrons towards nitrogen and steadies the positive charge of the protonated amine, which makes the amine more basic. But water also steadies that ion, by hydrogen bonding to the H atoms on its nitrogen, and each alkyl group takes one of those H atoms away. Up to two alkyl groups the push wins; with three, the lost solvation wins.",
      definition:
        "- The more stable the conjugate acid (the protonated amine), the further right the equilibrium lies and the stronger the base.\n" +
        "- **+I effect:** alkyl groups release electrons and stabilise the positive charge on nitrogen. On this alone the order would be \\(\\text{NH}_4^+ < \\text{R-NH}_3^+ < \\text{R}_2\\text{NH}_2^+ < \\text{R}_3\\text{NH}^+\\) in stability, giving the **expected order** \\(\\text{NH}_3 < \\text{R-NH}_2 < \\text{R}_2\\text{NH} < \\text{R}_3\\text{N}\\).\n" +
        "- **Solvation:** water stabilises the conjugate acid by hydrogen bonding through the H atoms on nitrogen. These fall from 4 in \\(\\text{NH}_4^+\\) to 1 in \\(\\text{R}_3\\text{NH}^+\\), so solvation is best for \\(\\text{NH}_4^+\\) and very poor for \\(\\text{R}_3\\text{NH}^+\\).\n" +
        "- **Combined:** the two effects act in opposite directions. Basic strength rises from \\(\\text{NH}_3\\) to \\(\\text{R-NH}_2\\) to \\(\\text{R}_2\\text{NH}\\), but a 3° amine is weaker than a 2° amine because its conjugate acid is poorly solvated. **Observed order: \\(\\text{NH}_3 < \\text{R-NH}_2 < \\text{R}_2\\text{NH} > \\text{R}_3\\text{N}\\)**, so secondary amines are the strongest.\n" +
        "- pKb values in water (textbook Table 13.4): ammonia 4.75; methanamine 3.38, N-methylmethanamine 3.27, N,N-dimethylmethanamine 4.22; ethanamine 3.29, N-ethylethanamine 3.00, N,N-diethylethanamine 3.25.",
      formula: {
        label: "Observed order of basic strength in water",
        latex: "\\text{NH}_3 < \\text{R-NH}_2 < \\text{R}_2\\text{NH} > \\text{R}_3\\text{N}",
      },
      authoredExample: {
        prompt:
          "Using pKb values, arrange ammonia (4.75), ethylamine (3.29), diethylamine (3.00) and triethylamine (3.25) in increasing order of basic strength, and explain the position of triethylamine.",
        steps: [
          "Smaller pKb means stronger base, so arrange by decreasing pKb: \\(4.75 > 3.29 > 3.25 > 3.00\\).",
          "Order: \\(\\text{NH}_3 < \\text{C}_2\\text{H}_5\\text{NH}_2 < (\\text{C}_2\\text{H}_5)_3\\text{N} < (\\text{C}_2\\text{H}_5)_2\\text{NH}\\).",
          "Triethylamine has the largest +I effect, but its conjugate acid \\((\\text{C}_2\\text{H}_5)_3\\text{NH}^+\\) has only one H on nitrogen for hydrogen bonding with water, so it is poorly solvated.",
          "The two effects work against each other, so the tertiary amine ends up weaker than the secondary one.",
        ],
        answer: "\\(\\text{NH}_3 < \\text{C}_2\\text{H}_5\\text{NH}_2 < (\\text{C}_2\\text{H}_5)_3\\text{N} < (\\text{C}_2\\text{H}_5)_2\\text{NH}\\)",
      },
      selfCheckExample: {
        prompt: "Which is the stronger base, trimethylamine (pKb 4.22) or methylamine (pKb 3.38)? Give the reason in one line.",
        steps: [
          "\\(3.38 < 4.22\\), so methylamine has the smaller pKb.",
          "The conjugate acid of trimethylamine has only one N-H for hydrogen bonding with water, so it is poorly solvated.",
        ],
        answer: "Methylamine",
      },
      practiceSet: [
        { prompt: "Write the order of basic strength expected from the +I effect alone.", answer: "\\(\\text{NH}_3 < \\text{R-NH}_2 < \\text{R}_2\\text{NH} < \\text{R}_3\\text{N}\\)" },
        { prompt: "How many H atoms on nitrogen can hydrogen bond with water in \\(\\text{NH}_4^+\\) and in \\(\\text{R}_3\\text{NH}^+\\)?", answer: "Four and one" },
        { prompt: "Which class of aliphatic amine is the strongest base in water?", answer: "Secondary" },
        { prompt: "Which is the stronger base, propan-2-amine (pKb 3.40) or ammonia (pKb 4.75)?", answer: "Propan-2-amine" },
      ],
      pyqExampleId: "10c9de5f-a89f-4e14-9c32-14affed31b9b",
      traps: [
        {
          title: "Putting the tertiary amine on top",
          body: "The +I effect alone predicts 3° > 2° > 1°, but in water solvation reverses the last step. Secondary amines are the strongest; write the observed order, not the expected one, unless asked for the effect alone.",
        },
        {
          title: "Naming one effect only",
          body: "An explanation of the order needs both effects and the fact that they act in opposite directions. With the +I effect alone, the position of the tertiary amine cannot be explained.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccam-arylamines",
      name: "Why arylamines are weaker bases",
      intuition:
        "In aniline the lone pair on nitrogen does not just sit there: it spreads into the benzene ring and takes part in its resonance. Once it is shared with the ring, it is less free to grab a proton. And picking up a proton costs aniline that resonance, so it would rather stay as it is. Anything on the ring that pushes electrons back towards nitrogen helps; anything that pulls them away makes the base weaker still.",
      definition:
        "- From pKb values, **arylamines are weaker bases than ammonia and aliphatic amines**: aniline 9.38, N-methylaniline 9.30, N,N-dimethylaniline 8.92, against 4.75 for ammonia and 3.38 for methanamine.\n" +
        "- In arylamines the \\(\\text{-NH}_2\\) group is attached directly to the ring. The lone pair on nitrogen is **conjugated with the aromatic ring** and is less available for protonation.\n" +
        "- Aniline is stabilised by five resonance structures. The anilinium ion has no lone pair on nitrogen, so it has only two, and is less stabilised than aniline.\n" +
        "- So the equilibrium \\(\\text{C}_6\\text{H}_5\\text{NH}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{C}_6\\text{H}_5\\text{NH}_3^+ + \\text{OH}^-\\) lies to the left.\n" +
        "- **Groups on the ring** (asked by the board and the exercises; the textbook gives no values): an electron releasing group such as \\(\\text{-CH}_3\\), \\(\\text{-OCH}_3\\) or \\(\\text{-NH}_2\\) makes the lone pair more available and the base stronger; an electron withdrawing group such as \\(\\text{-NO}_2\\) or \\(\\text{-COOH}\\) makes it less available and the base weaker.",
      formula: {
        label: "pKb values in water",
        latex: "\\text{CH}_3\\text{NH}_2\\ (3.38) < \\text{NH}_3\\ (4.75) < \\text{C}_6\\text{H}_5\\text{NH}_2\\ (9.38)",
      },
      authoredExample: {
        prompt:
          "Arrange aniline (pKb 9.38), methanamine (pKb 3.38) and ammonia (pKb 4.75) in increasing order of basic strength. Explain why aniline comes first.",
        steps: [
          "Larger pKb means weaker base, so the order of increasing strength is the order of decreasing pKb: \\(9.38 > 4.75 > 3.38\\).",
          "Order: \\(\\text{C}_6\\text{H}_5\\text{NH}_2 < \\text{NH}_3 < \\text{CH}_3\\text{NH}_2\\).",
          "In aniline the lone pair on nitrogen is conjugated with the benzene ring, so it is less available for a proton.",
          "Aniline has five resonance structures and the anilinium ion only two, so protonation costs stability and the equilibrium lies to the left.",
        ],
        answer: "\\(\\text{C}_6\\text{H}_5\\text{NH}_2 < \\text{NH}_3 < \\text{CH}_3\\text{NH}_2\\)",
      },
      selfCheckExample: {
        prompt: "Which is the stronger base, p-toluidine (4-methylaniline) or aniline? Give the reason.",
        steps: [
          "The \\(\\text{-CH}_3\\) group releases electrons (+I effect) into the ring.",
          "That pushes electron density back towards nitrogen, so its lone pair is more available for a proton.",
        ],
        answer: "p-Toluidine is the stronger base",
      },
      practiceSet: [
        { prompt: "How many resonance structures does the textbook give for aniline, and how many for the anilinium ion?", answer: "Five for aniline, two for the anilinium ion" },
        { prompt: "Which is the stronger base, N,N-dimethylaniline (pKb 8.92) or aniline (pKb 9.38)?", answer: "N,N-Dimethylaniline" },
        { prompt: "Does a \\(\\text{-COOH}\\) group para to \\(\\text{-NH}_2\\) make the amine a stronger or a weaker base?", answer: "Weaker: it withdraws electrons, so the lone pair is less available" },
        { prompt: "Why is the lone pair of aniline less available for protonation than that of methylamine?", answer: "It is conjugated with the aromatic ring" },
      ],
      pyqExampleId: "094da3f6-9099-4bfd-a6a9-47576aa37211",
      traps: [
        {
          title: "Treating aniline like an aliphatic amine",
          body: "Aniline is weaker than ammonia, not stronger. Its phenyl group draws the lone pair into the ring; it does not release electrons the way an alkyl group does.",
        },
        {
          title: "Reasoning from the wrong side",
          body: "Explain basic strength through the lone pair's availability (or the conjugate acid's stability). Saying 'the ring is big' or 'benzene is stable' gives no reason and earns nothing.",
        },
      ],
    },
  ],
};
