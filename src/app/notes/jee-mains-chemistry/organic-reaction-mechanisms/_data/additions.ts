import type { SubtopicNote } from "@/app/notes/_types";

export const ADDITIONS_ORM_NOTE: SubtopicNote = {
  subtopicName: "Carbocations, Rearrangements and Addition Regiochemistry",
  title: "Carbocations, Rearrangements and Addition Regiochemistry",
  oneLineDefinition:
    "A carbocation forms faster the more stable it is, moves a hydrogen or a methyl group from the next carbon when that makes it more stable, and decides where H and X or OH land when a reagent adds across a C=C or C≡C bond.",
  whyItMatters:
    "Eleven PYQs, one of them asking for a number, and two from 2026. Five turn on a carbocation: which one forms faster, which reactions rearrange by a hydride or methyl shift, and when a ring next to the cation grows by one carbon. Six are addition steps inside a longer scheme: Markovnikov with HX or Hg²⁺ and H₂SO₄, anti-Markovnikov with B₂H₆ then alkaline H₂O₂, and a bromonium ion opened by the molecule's own carboxylate.",
  concepts: [
    // C1 — carbocation stability and 1,2-shifts
    {
      kind: "formula" as const,
      slug: "jcorm-carbocation-shifts",
      name: "Carbocation stability and 1,2-shifts",
      intuition:
        "A carbocation is a carbon with only six electrons around it. Alkyl groups next to it push electron density towards it, by the inductive effect and by hyperconjugation, so the more alkyl groups it carries, the more stable it is. A cation next to a benzene ring or a C=C spreads its charge by resonance. If a hydrogen or a methyl group on the NEXT carbon can move over, with its bond pair, and leave behind a more stable cation, it does. The product then comes from the new cation, not the first one.",
      definition:
        "- Stability: \\(3^\\circ > 2^\\circ > 1^\\circ > \\mathrm{CH_3^+}\\). A benzylic or allylic cation is resonance-stabilised and ranks with the secondary and tertiary ones.\n" +
        "- The more stable cation also forms FASTER: the transition state leading to a cation looks like the cation. This is why HX adds by Markovnikov's rule.\n" +
        "- **1,2-hydride shift**: an H on the next carbon moves with its bond pair to the cation carbon; the charge moves to the carbon the H left.\n" +
        "- **1,2-methyl shift**: when the next carbon has no H but carries \\(\\mathrm{CH_3}\\) groups (a quaternary carbon), a methyl group moves instead.\n" +
        "- A shift happens only if it gives a MORE stable cation. A cation that is already tertiary does not rearrange.\n" +
        "- Where shifts show up: Friedel-Crafts alkylation with a primary halide, acid dehydration and \\(\\mathrm{S_N1}\\) reactions of alcohols, HX addition to an alkene, and isomerisation of an n-alkane by anhydrous \\(\\mathrm{AlCl_3}\\) and HCl.\n" +
        "- **Ring expansion**: a cation on a carbon attached to a cyclobutane or cyclopentane ring moves one ring C–C bond; the ring grows from 4 to 5 or from 5 to 6 carbons and loses strain.",
      formula: {
        label: "Carbocation stability order",
        latex: "3^\\circ > 2^\\circ > 1^\\circ > \\mathrm{CH_3^+} \\qquad \\text{benzylic and allylic cations: resonance-stabilised}",
      },
      authoredExample: {
        prompt:
          "3,3-Dimethylbutan-2-ol, \\(\\mathrm{(CH_3)_3C{-}CH(OH)CH_3}\\), is heated with concentrated \\(\\mathrm{H_2SO_4}\\). Find the major alkene.",
        steps: [
          "Protonation of the OH and loss of water gives the secondary cation \\(\\mathrm{(CH_3)_3C{-}\\overset{+}{C}H{-}CH_3}\\).",
          "The next carbon is quaternary: it has no H but three \\(\\mathrm{CH_3}\\) groups. A 1,2-methyl shift moves one \\(\\mathrm{CH_3}\\) across and leaves the tertiary cation \\(\\mathrm{(CH_3)_2\\overset{+}{C}{-}CH(CH_3)_2}\\).",
          "Loss of a proton from the neighbouring CH gives the most substituted alkene (Saytzeff): \\(\\mathrm{(CH_3)_2C{=}C(CH_3)_2}\\).",
        ],
        answer: "2,3-Dimethylbut-2-ene, \\(\\mathrm{(CH_3)_2C{=}C(CH_3)_2}\\), formed after a 1,2-methyl shift.",
      },
      selfCheckExample: {
        prompt:
          "3-Methylbut-1-ene, \\(\\mathrm{CH_2{=}CH{-}CH(CH_3)_2}\\), reacts with HCl. What is the major product, and why is it not 2-chloro-3-methylbutane?",
        steps: [
          "\\(\\mathrm{H^+}\\) adds to the terminal \\(\\mathrm{CH_2}\\) and gives the secondary cation \\(\\mathrm{CH_3{-}\\overset{+}{C}H{-}CH(CH_3)_2}\\).",
          "The next carbon carries an H, and moving it gives the tertiary cation \\(\\mathrm{CH_3CH_2{-}\\overset{+}{C}(CH_3)_2}\\): a 1,2-hydride shift.",
          "Chloride adds to the tertiary cation.",
        ],
        answer:
          "2-Chloro-2-methylbutane, \\(\\mathrm{CH_3CH_2CCl(CH_3)_2}\\). 2-Chloro-3-methylbutane would need the chloride to trap the secondary cation before it rearranges.",
      },
      practiceSet: [
        {
          prompt: "Rank from most to least stable: \\(\\mathrm{CH_3CH_2^+}\\), \\(\\mathrm{(CH_3)_3C^+}\\), \\(\\mathrm{CH_3^+}\\), \\(\\mathrm{(CH_3)_2CH^+}\\).",
          answer: "\\(\\mathrm{(CH_3)_3C^+ > (CH_3)_2CH^+ > CH_3CH_2^+ > CH_3^+}\\)",
        },
        {
          prompt: "Benzene reacts with 1-chlorobutane and anhydrous \\(\\mathrm{AlCl_3}\\). What is the major product?",
          answer: "sec-Butylbenzene (2-phenylbutane), after a 1,2-hydride shift from the primary to the secondary cation",
        },
        {
          prompt: "Does 2-methylbutan-2-ol rearrange when it is dehydrated with acid?",
          answer: "No. Its cation is already tertiary; it gives 2-methylbut-2-ene directly",
        },
        {
          prompt: "Cyclobutylmethanol is heated with concentrated \\(\\mathrm{H_2SO_4}\\). Which alkene forms?",
          answer: "Cyclopentene: the primary cation expands the four-membered ring to a cyclopentyl cation",
        },
      ],
      pyqExampleId: "2a3851fa-913d-4b38-a4ed-a6467c9ef22b", // 2026 — which of four reactions does NOT rearrange
      traps: [
        {
          title: "A primary halide in Friedel-Crafts alkylation gives the branched product",
          body: "The primary cation (or its complex with \\(\\mathrm{AlCl_3}\\)) rearranges before it attacks the ring. 1-Chloropropane gives isopropylbenzene, not n-propylbenzene. To put a straight chain on a ring, acylate and then reduce the C=O.",
        },
        {
          title: "No shift without a better cation at the end",
          body: "A 1,2-shift happens only when the new cation is more stable. A tertiary cation, or a benzylic one next to a ring, has nothing better to reach, so its product is not rearranged.",
        },
        {
          title: "Stability and rate go together",
          body: "The more stable carbocation is also the one formed faster, because the transition state resembles the cation. An option that pairs 'more stable' with 'formed more slowly' is wrong.",
        },
      ],
    },

    // C2 — addition regiochemistry by reagent
    {
      kind: "reference" as const,
      slug: "jcorm-addition-regiochem",
      name: "Addition regiochemistry by reagent",
      intuition:
        "When a reagent adds across a C=C or C≡C bond, two questions decide the product: which carbon the new group lands on, and whether a carbocation forms on the way. Reagents that go through a cation (HX, acid and water, Hg²⁺ with an alkyne) put H on the carbon that already has more H, so the cation sits on the more substituted carbon. Hydroboration goes through no cation, so boron, and later OH, lands on the LESS substituted carbon and nothing rearranges.",
      definition:
        "- **Markovnikov**: in HX or \\(\\mathrm{H_2O/H^+}\\) addition, H goes to the carbon with more H; the more stable cation carries the X or OH.\n" +
        "- **Anti-Markovnikov, HBr with a peroxide**: a free-radical chain; only HBr does this, not HCl or HI.\n" +
        "- **Hydroboration-oxidation** (\\(\\mathrm{B_2H_6}\\), then \\(\\mathrm{H_2O_2/OH^-}\\)): boron adds to the less hindered carbon, H and OH add to the same face (syn), and the OH replaces B. No cation, so no rearrangement.\n" +
        "- **Alkyne hydration** (\\(\\mathrm{Hg^{2+}/H_2SO_4}\\)): Markovnikov; the enol changes to the ketone, so a terminal alkyne gives a methyl ketone. Ethyne alone gives ethanal.\n" +
        "- **Hydroboration of a terminal alkyne** puts OH on the end carbon; the enol changes to an ALDEHYDE.\n" +
        "- **\\(\\mathrm{Br_2}\\)** adds through a cyclic bromonium ion, opened from the back: anti addition. If the molecule carries its own carboxylate (acid plus \\(\\mathrm{NaHCO_3}\\)), the carboxylate opens the ion and closes a lactone ring, a five-membered ring when it can.",
      table: {
        columns: ["Reagent", "Where the new group goes", "Why", "Example"],
        rows: [
          { cells: ["HBr (no peroxide)", "Br on the more substituted carbon", "The more stable cation forms; it can rearrange", "\\(\\mathrm{(CH_3)_2C{=}CH_2 \\to (CH_3)_3CBr}\\)"] },
          { cells: ["HBr with a peroxide", "Br on the less substituted carbon", "Free-radical chain; works for HBr only", "\\(\\mathrm{(CH_3)_2C{=}CH_2 \\to (CH_3)_2CHCH_2Br}\\)"] },
          { cells: ["\\(\\mathrm{H_2O}\\), dilute \\(\\mathrm{H_2SO_4}\\)", "OH on the more substituted carbon", "Through a cation; it can rearrange", "\\(\\mathrm{(CH_3)_2C{=}CH_2 \\to (CH_3)_3COH}\\)"] },
          { cells: ["\\(\\mathrm{B_2H_6}\\), then \\(\\mathrm{H_2O_2/OH^-}\\)", "OH on the less substituted carbon", "No cation: syn addition, no rearrangement", "\\(\\mathrm{(CH_3)_2C{=}CH_2 \\to (CH_3)_2CHCH_2OH}\\)"] },
          { cells: ["\\(\\mathrm{H_2O}\\), \\(\\mathrm{Hg^{2+}/H_2SO_4}\\) on an alkyne", "O on the inner carbon; a ketone", "Markovnikov enol changes to the keto form", "\\(\\mathrm{CH_3CH_2C{\\equiv}CH \\to CH_3CH_2COCH_3}\\)"], noteAmber: "Only ethyne gives an aldehyde (ethanal) this way." },
          { cells: ["\\(\\mathrm{B_2H_6}\\), then \\(\\mathrm{H_2O_2/OH^-}\\) on a terminal alkyne", "O on the end carbon; an aldehyde", "Anti-Markovnikov enol changes to the aldehyde", "\\(\\mathrm{CH_3CH_2C{\\equiv}CH \\to CH_3CH_2CH_2CHO}\\)"] },
          { cells: ["\\(\\mathrm{Br_2}\\) in \\(\\mathrm{CCl_4}\\)", "One Br on each carbon, on opposite faces", "Cyclic bromonium ion opened from the back", "Cyclohexene gives trans-1,2-dibromocyclohexane"] },
          { cells: ["\\(\\mathrm{Br_2}\\), \\(\\mathrm{NaHCO_3}\\) on an unsaturated acid", "Ring O on the inner carbon, Br outside the ring", "The molecule's carboxylate opens the bromonium ion", "An alkenoic acid gives a bromo-lactone, a five-membered ring when possible"] },
        ],
        caption: "Through a cation: Markovnikov, and a shift is possible. Through boron or a radical: the other carbon, and no shift.",
      },
      selfCheckExample: {
        prompt:
          "1-Methylcyclohexene is treated with \\(\\mathrm{B_2H_6}\\), then \\(\\mathrm{H_2O_2/NaOH}\\), and the product with PCC. Name both products. What would PCC do if the first step had been dilute \\(\\mathrm{H_2SO_4}\\) instead?",
        steps: [
          "Hydroboration puts OH on the ring CH carbon, not on the carbon carrying the methyl group: 2-methylcyclohexan-1-ol (trans, from syn addition).",
          "PCC oxidises this secondary alcohol to the ketone 2-methylcyclohexan-1-one.",
          "Acid hydration is Markovnikov: OH goes to the carbon with the methyl group, giving 1-methylcyclohexan-1-ol, a tertiary alcohol. PCC cannot oxidise a tertiary alcohol.",
        ],
        answer:
          "2-Methylcyclohexan-1-ol, then 2-methylcyclohexan-1-one. By the acid route the alcohol is tertiary and PCC leaves it unchanged.",
      },
      practiceSet: [
        { prompt: "But-1-yne is treated with \\(\\mathrm{H_2O}\\), \\(\\mathrm{HgSO_4}\\) and \\(\\mathrm{H_2SO_4}\\). What forms?", answer: "Butan-2-one, \\(\\mathrm{CH_3COCH_2CH_3}\\)" },
        { prompt: "But-1-yne is treated with \\(\\mathrm{B_2H_6}\\), then alkaline \\(\\mathrm{H_2O_2}\\). What forms?", answer: "Butanal, \\(\\mathrm{CH_3CH_2CH_2CHO}\\)" },
        { prompt: "2-Methylpropene reacts with HBr in the presence of a peroxide. What forms?", answer: "1-Bromo-2-methylpropane, \\(\\mathrm{(CH_3)_2CHCH_2Br}\\)" },
        { prompt: "Which reagent adds water across a C=C bond with no chance of a carbocation rearrangement?", answer: "\\(\\mathrm{B_2H_6}\\), then \\(\\mathrm{H_2O_2/OH^-}\\) (hydroboration-oxidation)" },
      ],
      pyqExampleId: "c9c50f77-46d8-4b06-96a5-080ef7cc8dcd", // 2023 — hydroboration, PCC, then a Grignard
      traps: [
        {
          title: "Hydroboration puts OH on the less substituted carbon",
          body: "\\(\\mathrm{B_2H_6}\\) followed by alkaline \\(\\mathrm{H_2O_2}\\) is anti-Markovnikov: a terminal alkene gives a primary alcohol, which PCC can then take to an aldehyde. Acid hydration of the same alkene gives the secondary or tertiary alcohol.",
        },
        {
          title: "The peroxide effect works for HBr only",
          body: "With a peroxide, HBr adds anti-Markovnikov by a radical chain. HCl and HI still add by Markovnikov's rule with or without a peroxide.",
        },
        {
          title: "Alkyne hydration ends at a carbonyl",
          body: "The first product is an enol, which changes to its keto form at once. With \\(\\mathrm{Hg^{2+}/H_2SO_4}\\) a terminal alkyne gives a methyl ketone; by hydroboration it gives an aldehyde. Neither route stops at an alcohol.",
        },
      ],
    },
  ],
};
