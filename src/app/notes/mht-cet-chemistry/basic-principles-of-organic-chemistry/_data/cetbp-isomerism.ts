import type { SubtopicNote } from "@/app/notes/_types";

export const ISOMERISM_NOTE: SubtopicNote = {
  subtopicName: "Isomerism and Stereochemistry",
  title: "Isomerism and Stereochemistry",
  oneLineDefinition:
    "Isomers share a molecular formula: structural isomers differ in connectivity (chain, position, functional group, metamerism), stereoisomers in arrangement — and a carbon with four different groups makes a molecule chiral, giving a pair of non-superimposable mirror-image enantiomers.",
  whyItMatters:
    "9 PYQs, 1 HARD. Three ask which statement about enantiomers is false (the planted one says they are superimposable), one names the Fischer projection from a drawing, three ask which molecule is chiral or how many chiral carbons it has, and two ask for the kind of structural isomerism a pair shows. " +
    "Learn to spot the carbon with four different groups and the page is done.",
  concepts: [
    // 1 — structural isomerism
    {
      kind: "formula" as const,
      slug: "cetbp-structural-isomerism",
      name: "Structural Isomerism: Chain, Position, Functional, Metamerism",
      intuition:
        "Same atoms, different wiring. Change the carbon skeleton — chain isomers; move the functional group along the same skeleton — position isomers; change the functional group itself — functional isomers; keep the group and shuffle the alkyls on either side of it — metamers.",
      definition:
        "- **Chain**: n-butane and 2-methylpropane; but-1-ene and but-2-ene are POSITION isomers (same chain, C=C moved).\n" +
        "- **Position**: butan-1-ol and butan-2-ol; 1-methoxypropane and 2-methoxypropane.\n" +
        "- **Functional**: same formula, different group — butan-1-ol (alcohol) and 1-methoxypropane (ether), both \\(\\text{C}_4\\text{H}_{10}\\text{O}\\); dimethyl ether and ethanol; aldehyde and ketone; acid and ester.\n" +
        "- **Metamerism**: same functional group, different alkyls around it — ethoxyethane \\(\\text{C}_2\\text{H}_5\\text{OC}_2\\text{H}_5\\) and methoxypropane \\(\\text{CH}_3\\text{OC}_3\\text{H}_7\\), both \\(\\text{C}_4\\text{H}_{10}\\text{O}\\). Seen in ethers, amines, ketones.\n" +
        "- Tautomerism (keto–enol) is a special functional isomerism with a mobile hydrogen.",
      formula: {
        label: "Kinds of structural isomerism",
        latex:
          "\\text{chain} \\;|\\; \\text{position} \\;|\\; \\text{functional group} \\;|\\; \\text{metamerism (alkyls about the group)}",
      },
      authoredExample: {
        prompt: "Classify the pairs: (i) propanal and propanone; (ii) pentan-2-one and pentan-3-one; (iii) diethylamine and methylpropylamine.",
        steps: [
          "(i) Aldehyde against ketone: functional isomers. (ii) C=O moved along the chain: position isomers. (iii) Same secondary amine, alkyls redistributed: metamers.",
        ],
        answer: "Functional; position; metamerism",
      },
      selfCheckExample: {
        prompt: "Which pair are functional isomers: butan-2-ol and 2-methylpropan-1-ol, or butan-1-ol and 1-methoxypropane?",
        steps: [
          "The first pair are both alcohols (chain/position). The second is an alcohol against an ether.",
        ],
        answer: "Butan-1-ol and 1-methoxypropane",
      },
      practiceSet: [
        { prompt: "Ethoxyethane and methoxypropane show?", answer: "Metamerism" },
        { prompt: "Dimethyl ether and ethanol are?", answer: "Functional isomers" },
        { prompt: "n-Butane and 2-methylpropane are?", answer: "Chain isomers" },
        { prompt: "But-1-ene and but-2-ene are?", answer: "Position isomers" },
      ],
      pyqExampleId: "eebf474c-ef58-457c-8f4d-ac248198e612",
      traps: [
        {
          title: "Calling ether-versus-alcohol pairs metamers",
          body:
            "Metamers keep the SAME functional group. Dimethyl ether and ethanol have different groups — functional isomers. Metamerism is two ethers (or two amines) with the alkyls redistributed.",
        },
      ],
    },

    // 2 — chirality
    {
      kind: "formula" as const,
      slug: "cetbp-chirality-and-optical-activity",
      name: "Chiral Carbons and Optical Activity",
      intuition:
        "A carbon bonded to four DIFFERENT groups is a stereocentre; a molecule with one is chiral and rotates plane-polarised light. Check every candidate carbon: two identical substituents (two methyls, two ethyls, two hydrogens) kill it. Count the carbons that pass.",
      definition:
        "- Chiral (asymmetric) carbon: four different groups. Test each carbon that carries a halogen or OH first, then the branch points.\n" +
        "- 2-Bromopropane: C2 has two CH₃ — achiral. 2-Bromo-2-methylbutane: two CH₃ — achiral. 3-Bromopentane: two ethyls — achiral. **2-Bromo-3-methylbutane**: C2 has H, Br, CH₃, isopropyl — chiral.\n" +
        "- 2-Chloro-2-methylbutane is optically INACTIVE (two methyls on C2); 3-chlorohexane, 2-chloropentane, 2-chloro-3-methylbutane are active.\n" +
        "- 3,4-Dibromohexane \\(\\text{CH}_3\\text{CH}_2\\text{-CHBr-CHBr-CH}_2\\text{CH}_3\\): C3 and C4 each carry H, Br, ethyl and the other half — **2** chiral carbons.\n" +
        "- Optical activity needs chirality; a molecule with no stereocentre (and no other chiral element) is optically inactive.",
      formula: {
        label: "Chirality test",
        latex:
          "\\text{C}abcd \\text{ with } a \\neq b \\neq c \\neq d \\Rightarrow \\text{chiral centre}",
      },
      authoredExample: {
        prompt: "How many chiral carbons are in 2,3-dichlorobutane and in 2,2-dichlorobutane?",
        steps: [
          "2,3-Dichlorobutane: C2 (H, Cl, CH₃, CHClCH₃) and C3 (the mirror set) — two. 2,2-Dichlorobutane: C2 has two Cl — none.",
        ],
        answer: "2; 0",
      },
      selfCheckExample: {
        prompt: "Which is optically active: 2-methylbutan-2-ol or butan-2-ol?",
        steps: [
          "Butan-2-ol's C2 carries H, OH, CH₃ and C₂H₅ — chiral. 2-Methylbutan-2-ol has two methyls on C2.",
        ],
        answer: "Butan-2-ol",
      },
      practiceSet: [
        { prompt: "Chiral: 2-bromopropane, 2-bromo-2-methylbutane, 2-bromo-3-methylbutane or 3-bromopentane?", answer: "2-Bromo-3-methylbutane" },
        { prompt: "Chiral carbons in 3,4-dibromohexane?", answer: "2" },
        { prompt: "Optically inactive: 3-chlorohexane, 2-chloro-2-methylbutane, 2-chloropentane?", answer: "2-Chloro-2-methylbutane" },
        { prompt: "How many different groups must a chiral carbon carry?", answer: "Four" },
      ],
      pyqExampleId: "257f8e3c-2530-4744-b3c3-f1e5aaaeef40",
      traps: [
        {
          title: "Checking only the carbon that carries the halogen",
          body:
            "In 2-bromo-3-methylbutane the halogen carbon IS the chiral one, but in general the stereocentre can be elsewhere. Check C2 for two identical groups, then walk the chain.",
        },
      ],
    },

    // 3 — enantiomers and representations
    {
      kind: "formula" as const,
      slug: "cetbp-enantiomers-and-projections",
      name: "Enantiomers and the Fischer Projection",
      intuition:
        "Enantiomers are non-superimposable mirror images. They match in every scalar property — melting point, density, refractive index, chemical behaviour — and differ only in the SIGN of their optical rotation. A Fischer projection draws the stereocentre as a cross: vertical bonds go back, horizontal bonds come forward.",
      definition:
        "- Enantiomers: **non-superimposable** mirror images; identical m.p., b.p., density, refractive index, solubility; same chemical properties (towards achiral reagents); equal and OPPOSITE optical rotation. 'Superimposable mirror images' is always the false statement.\n" +
        "- A 1:1 mixture (racemic) is optically inactive by external compensation.\n" +
        "- **Fischer projection**: chiral carbon at the crossing point, main chain vertical (COOH at top, CH₃ at bottom for lactic acid), horizontal groups (H, OH) towards the viewer. **Wedge–dash**: solid wedge forward, hashed wedge back. **Sawhorse** and **Newman** show conformations about a C–C bond, not a single stereocentre.",
      formula: {
        label: "Fischer convention",
        latex:
          "\\text{vertical bonds away from the viewer;}\\quad \\text{horizontal bonds towards the viewer}",
      },
      authoredExample: {
        prompt: "Two samples of 2-butanol have identical boiling points and refractive indices but rotate light +13.5° and −13.5°. What are they, and what is a 1:1 mixture called?",
        steps: [
          "Equal, opposite rotation with identical scalar properties: enantiomers. The 1:1 mixture is a racemic mixture, optically inactive.",
        ],
        answer: "Enantiomers; a racemic mixture",
      },
      selfCheckExample: {
        prompt: "Which representation shows a molecule as a cross with the chain vertical, and which shows the view down a C–C bond as a circle?",
        steps: [
          "The cross is a Fischer projection; the circle is a Newman projection.",
        ],
        answer: "Fischer; Newman",
      },
      practiceSet: [
        { prompt: "Property NOT identical for enantiomers?", answer: "Sign of optical rotation" },
        { prompt: "Are enantiomers superimposable on their mirror images?", answer: "No" },
        { prompt: "Projection with vertical chain and horizontal groups towards the viewer?", answer: "Fischer" },
        { prompt: "Projection viewed along a C–C bond?", answer: "Newman" },
      ],
      pyqExampleId: "3a128fbd-ebe6-4b21-89be-f797be2fdaa0",
      traps: [
        {
          title: "Marking 'same chemical properties' as the false statement",
          body:
            "Enantiomers DO react alike with ordinary reagents. The false claim is 'superimposable mirror images' — a superimposable mirror image is the same molecule, and the pair would not exist.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Nomenclature — the names the isomers are told apart by",
      href: "/notes/mht-cet-chemistry/basic-principles-of-organic-chemistry/cetbp-nomenclature-and-functional-groups",
    },
    {
      label: "Electronic Effects — hybridisation and the shapes behind stereochemistry",
      href: "/notes/mht-cet-chemistry/basic-principles-of-organic-chemistry/cetbp-electronic-effects",
    },
  ],
};
