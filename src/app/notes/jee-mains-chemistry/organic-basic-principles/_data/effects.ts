import type { SubtopicNote } from "@/app/notes/_types";

export const EFFECTS_GOC_NOTE: SubtopicNote = {
  subtopicName: "Electronic Effects, Resonance and Acidity",
  title: "Electronic Effects, Resonance and Acidity",
  oneLineDefinition:
    "Electrons in a molecule shift through σ bonds (the inductive effect), through π systems (resonance), on demand when a reagent attacks (the electromeric effect) and from C–H bonds into a neighbouring empty or π orbital (hyperconjugation); these shifts rank resonance structures and set the strength of acids and bases.",
  whyItMatters:
    "Twenty-four PYQs, one of them asking for a number, and four from 2026. Ten name or compare the four electronic effects: which ones are permanent, the order of electron-withdrawing groups, the number of hyperconjugating hydrogens. Nine rank resonance structures, or use resonance to explain a dipole moment or a bond length. Five rank acids, conjugate bases or the acidity of marked hydrogens.",
  concepts: [
    // C1 — the four electronic effects
    {
      kind: "reference" as const,
      slug: "jcgoc-effects",
      name: "Inductive, resonance, electromeric and hyperconjugation effects",
      intuition:
        "There are four ways electrons shift inside a molecule. Three of them are permanent features of the molecule: the inductive effect, resonance and hyperconjugation. Only the electromeric effect is temporary: it appears when a reagent approaches a multiple bond and disappears when the reagent is removed.",
      definition:
        "- **−I order**: \\(\\mathrm{-NO_2 > -CN > -COOH > -F > -Cl > -Br > -I}\\). **+I groups** are alkyl groups: \\(\\mathrm{(CH_3)_3C{-} > (CH_3)_2CH{-} > CH_3CH_2{-} > CH_3{-}}\\). The inductive effect weakens quickly with distance.\n" +
        "- **−R groups** have a multiple bond to a more electronegative atom: \\(\\mathrm{-NO_2}\\), –CN, –CHO, –COOH, >C=O. **+R groups** carry a lone pair on the atom joined to the π system: –OH, –OR, \\(\\mathrm{-NH_2}\\), –X.\n" +
        "- **Electromeric effect**: +E when the π electrons move towards the atom the reagent attacks (\\(\\mathrm{H^+}\\) adding to a C=C); −E when they move away from the atom the reagent attacks (\\(\\mathrm{CN^-}\\) adding to the carbon of C=O). When it opposes the inductive effect, the electromeric effect wins.\n" +
        "- **Hyperconjugation**: a C–H σ bond on the carbon next to a carbocation, a radical or a C=C overlaps the empty p orbital or the π orbital. The number of hyperconjugating hydrogens equals the number of α-hydrogens: \\(\\mathrm{CH_3^+}\\) has none, \\(\\mathrm{CH_3CH_2^+}\\) three and \\(\\mathrm{(CH_3)_3C^+}\\) nine.\n" +
        "- More alkyl groups on a C=C give more hyperconjugation, a more stable alkene and a LOWER heat of hydrogenation.",
      table: {
        columns: ["Effect", "Electrons move through", "Permanent or temporary", "Typical example"],
        rows: [
          { cells: ["Inductive (I)", "σ bonds, weakening with distance", "Permanent", "Cl pulls electrons along the chain in \\(\\mathrm{ClCH_2COOH}\\)"] },
          { cells: ["Resonance (R or M)", "π bonds and lone pairs on adjacent atoms", "Permanent", "\\(\\mathrm{-NH_2}\\) pushes its lone pair into the ring of aniline"] },
          {
            cells: ["Electromeric (E)", "One π bond, shifted completely to one atom", "Temporary; only while the reagent is present", "The C=O of propanone as \\(\\mathrm{CN^-}\\) attacks"],
            noteAmber: "The only one of the four that disappears when the reagent is taken away.",
          },
          { cells: ["Hyperconjugation", "A C–H σ bond into an adjacent empty p or π orbital", "Permanent", "The three C–H bonds of the \\(\\mathrm{CH_3}\\) group stabilise the C=C of propene"] },
        ],
        caption: "Resonance and the electromeric effect need a π system; the inductive effect needs only σ bonds.",
      },
      selfCheckExample: {
        prompt: "Arrange –F, –Br, \\(\\mathrm{-NO_2}\\) and –Cl in decreasing order of their −I effect.",
        steps: [
          "The nitro group carries a positive nitrogen bonded to two oxygens: it is the strongest withdrawing group of the four.",
          "Among the halogens the −I effect follows electronegativity: F > Cl > Br.",
        ],
        answer: "\\(\\mathrm{-NO_2 > -F > -Cl > -Br}\\).",
      },
      practiceSet: [
        { prompt: "Which electronic effect appears only when an attacking reagent is present?", answer: "The electromeric effect" },
        { prompt: "How many hyperconjugating hydrogens does the isopropyl cation, \\(\\mathrm{(CH_3)_2CH^+}\\), have?", answer: "6" },
        { prompt: "Does –OCH₃ attached to a benzene ring show +R or −R?", answer: "+R (a lone pair on oxygen)" },
        { prompt: "Which has the lower heat of hydrogenation, but-1-ene or trans-but-2-ene?", answer: "trans-But-2-ene (6 α-hydrogens against 2)" },
      ],
      pyqExampleId: "46122dc7-0748-41df-b363-34a3981f05d5", // 2026 — increasing electron-withdrawing power of -CN, -COOH, -NO2, -I
      traps: [
        {
          title: "Hyperconjugation is a permanent effect",
          body: "Hyperconjugation needs no reagent: it is present in the ground state of every molecule with an α-C–H next to an empty or π orbital. A statement calling it temporary is false.",
        },
        {
          title: "H⁺ shows a +E effect, not −E",
          body: "When \\(\\mathrm{H^+}\\) attacks a C=C, the π electrons move towards the carbon it bonds to. That is the +E effect. The −E effect goes with a nucleophile such as \\(\\mathrm{CN^-}\\).",
        },
        {
          title: "Iodine is the weakest −I group of the halogens",
          body: "The −I effect of a halogen follows its electronegativity, so –I withdraws least. It also withdraws less than –COOH, –CN and \\(\\mathrm{-NO_2}\\).",
        },
      ],
    },

    // C2 — stability of resonance structures
    {
      kind: "reference" as const,
      slug: "jcgoc-resonance",
      name: "Rules for the stability of resonance structures",
      intuition:
        "Resonance structures are drawings of one molecule that differ only in where π electrons and lone pairs sit; the atoms stay where they are. The real molecule is a blend of them, weighted towards the most stable drawings. So ranking the structures is a checklist, applied in order.",
      definition:
        "- Only electrons move. No atom moves, and the number of unpaired electrons stays the same.\n" +
        "- No second-period atom may exceed an octet: never five bonds to C, N or O.\n" +
        "- **Resonance energy** = energy of the most stable contributing structure − energy of the actual molecule. The actual molecule is always lower in energy than any single structure.\n" +
        "- Conjugation (a C=C next to a C=O) lets charge separate along the chain. This raises the dipole moment, and it gives the single bond between the two double bonds partial double-bond character, so that bond is SHORTER.\n" +
        "- A conjugated diketone has its two C=O groups joined through a C=C: O=C–C=C–C=O, as in p-benzoquinone.",
      table: {
        columns: ["Rule", "More stable contributor", "Less stable contributor"],
        rows: [
          { cells: ["Neutral beats charge-separated", "\\(\\mathrm{CH_2{=}CH{-}Cl}\\)", "\\(\\mathrm{^-CH_2{-}CH{=}\\overset{+}{Cl}}\\)"] },
          { cells: ["Every atom with a complete octet", "\\(\\mathrm{CH_3{-}\\overset{+}{O}{=}CH_2}\\)", "\\(\\mathrm{CH_3{-}O{-}\\overset{+}{C}H_2}\\) (carbon with a sextet)"] },
          { cells: ["Negative charge on the more electronegative atom", "\\(\\mathrm{CH_2{=}CH{-}O^-}\\)", "\\(\\mathrm{^-CH_2{-}CH{=}O}\\)"] },
          { cells: ["Opposite charges close, like charges apart", "Unlike charges on neighbouring atoms", "Like charges on neighbouring atoms (the worst case)"] },
          {
            cells: ["No atom beyond an octet", "Nitrogen with four bonds and a + charge, as in \\(\\mathrm{-\\overset{+}{N}({=}O)O^-}\\)", "Nitrogen with five bonds: not a valid structure"],
            noteAmber: "A 'resonance structure' with five bonds to N or C is simply wrong, however it is charged.",
          },
        ],
        caption: "Apply the rules from the top; the first rule that separates two structures decides.",
      },
      selfCheckExample: {
        prompt:
          "Rank the contributing structures of propenal: (I) \\(\\mathrm{CH_2{=}CH{-}CH{=}O}\\), (II) \\(\\mathrm{\\overset{+}{C}H_2{-}CH{=}CH{-}O^-}\\) and (III) \\(\\mathrm{^-CH_2{-}CH{=}CH{-}\\overset{+}{O}}\\).",
        steps: [
          "(I) is neutral with every octet complete: most stable.",
          "(II) separates charge but puts the negative charge on oxygen, the more electronegative atom.",
          "(III) puts the positive charge on oxygen, which is left with only six electrons, and the negative charge on carbon: least stable.",
        ],
        answer: "I > II > III.",
      },
      practiceSet: [
        { prompt: "Do resonance structures differ in the positions of atoms?", answer: "No; only electrons move" },
        { prompt: "Is the real molecule higher or lower in energy than its most stable contributor?", answer: "Lower; the difference is the resonance energy" },
        { prompt: "In the enolate ion of ethanal, is the negative charge better placed on O or on C?", answer: "On O, the more electronegative atom" },
        { prompt: "Give an example of a conjugated diketone.", answer: "p-Benzoquinone" },
      ],
      pyqExampleId: "f9ed45c7-7eca-48a7-9856-8df47796acf4", // 2025 — dipole moment and C1-C2 bond length of but-2-enal vs butanal
      traps: [
        {
          title: "Five bonds to nitrogen is never allowed",
          body: "In a nitro group the nitrogen has four bonds and a positive charge. A drawing that gives it five bonds breaks the octet rule and is not a resonance structure at all.",
        },
        {
          title: "Charge separation costs stability",
          body: "Among valid structures, the one without separated charges is the most stable. A charge-separated structure contributes less, even though it explains the dipole moment.",
        },
        {
          title: "Conjugation shortens the single bond",
          body: "In a conjugated enal, resonance gives the C–C bond between C=C and C=O some double-bond character. That bond is shorter than the same bond in the saturated aldehyde, not longer.",
        },
      ],
    },

    // C3 — acid strength and conjugate bases
    {
      kind: "formula" as const,
      slug: "jcgoc-acidity",
      name: "Acid strength from conjugate-base stability",
      intuition:
        "An acid is only as strong as its anion is stable. Anything that spreads or holds the negative charge makes the acid stronger: an electronegative atom, resonance, more s-character, an electron-withdrawing group. And the more stable the anion, the weaker it is as a base.",
      definition:
        "- A stronger acid has a more stable conjugate base, and that conjugate base is a weaker base.\n" +
        "- Order of common acids: sulphonic acid > carboxylic acid > phenol > water > alcohol > terminal alkyne. Their conjugate bases run the other way: \\(\\mathrm{RC{\\equiv}C^- > RO^- > OH^- > C_6H_5O^- > RCOO^- > RSO_3^-}\\).\n" +
        "- **s-character**: an sp C–H (50% s) is more acidic than an sp² C–H (33%), which is more acidic than an sp³ C–H (25%).\n" +
        "- **Resonance**: a C–H next to a C=O (an α-hydrogen), or on a benzylic carbon, is far more acidic than an ordinary alkane C–H; next to two C=O groups it is more acidic still.\n" +
        "- **Inductive effect**: −I groups raise acidity (\\(\\mathrm{ClCH_2COOH > CH_3COOH}\\)); +I alkyl groups lower it, so a tertiary C–H is the least acidic sp³ C–H.",
      formula: {
        label: "Acid strength and conjugate base",
        latex:
          "\\mathrm{HA \\rightleftharpoons H^+ + A^-}\\qquad \\text{more stable } \\mathrm{A^-} \\;\\Rightarrow\\; \\text{larger } K_a,\\ \\text{smaller } \\mathrm{p}K_a,\\ \\text{weaker base } \\mathrm{A^-}",
      },
      authoredExample: {
        prompt: "Arrange ethanoic acid, phenol, ethanol and ethyne in decreasing order of acid strength.",
        steps: [
          "Ethanoate, \\(\\mathrm{CH_3COO^-}\\): the charge is shared equally by two oxygens through resonance. Most stable anion.",
          "Phenoxide: the charge spreads into the ring by resonance, but onto carbons, which hold it less well than oxygen.",
          "Ethoxide: the charge sits on one oxygen, and the +I ethyl group pushes more electron density onto it.",
          "Ethynide, \\(\\mathrm{HC{\\equiv}C^-}\\): the charge is on an sp carbon, which is still less electronegative than oxygen. Least stable anion.",
        ],
        answer: "Ethanoic acid > phenol > ethanol > ethyne.",
      },
      selfCheckExample: {
        prompt:
          "Arrange \\(\\mathrm{HC{\\equiv}C^-}\\), \\(\\mathrm{CH_2{=}CH^-}\\) and \\(\\mathrm{CH_3CH_2^-}\\) in decreasing order of basic strength.",
        steps: [
          "The parent acids are ethyne (sp C–H), ethene (sp²) and ethane (sp³). Acidity falls as the s-character falls: ethyne > ethene > ethane.",
          "Basic strength of the conjugate bases runs the opposite way.",
        ],
        answer: "\\(\\mathrm{CH_3CH_2^- > CH_2{=}CH^- > HC{\\equiv}C^-}\\).",
      },
      practiceSet: [
        { prompt: "Which is the stronger acid, chloroethanoic acid or ethanoic acid?", answer: "Chloroethanoic acid (−I effect of Cl)" },
        { prompt: "Which is the stronger base, \\(\\mathrm{CH_3O^-}\\) or \\(\\mathrm{C_6H_5O^-}\\)?", answer: "\\(\\mathrm{CH_3O^-}\\)" },
        { prompt: "Which C–H is more acidic: one in ethane or one in the \\(\\mathrm{CH_3}\\) group of propanone?", answer: "The propanone C–H (its anion is resonance-stabilised by C=O)" },
        { prompt: "Which is the stronger acid, benzenesulphonic acid or benzoic acid?", answer: "Benzenesulphonic acid" },
      ],
      pyqExampleId: "c5d0e4e5-7bd8-4c5c-aed4-f9630ffc1267", // 2024 — basic strength of OH-, RO-, CH3COO-, Cl-
      traps: [
        {
          title: "Basicity runs opposite to acidity",
          body: "The anion of the strongest acid is the weakest base. Chloride, from the strong acid HCl, is a far weaker base than ethanoate, which is weaker than hydroxide.",
        },
        {
          title: "An alkoxide is a stronger base than hydroxide",
          body: "An alcohol is a slightly weaker acid than water because the +I alkyl group destabilises the alkoxide. So \\(\\mathrm{RO^-}\\) is a stronger base than \\(\\mathrm{OH^-}\\).",
        },
        {
          title: "Rank C–H acidity by s-character first",
          body: "A C–H on an sp carbon is more acidic than one on an sp² carbon, whatever the size of the molecule. Only among sp³ C–H bonds do resonance and the inductive effect decide.",
        },
      ],
    },
  ],
};
