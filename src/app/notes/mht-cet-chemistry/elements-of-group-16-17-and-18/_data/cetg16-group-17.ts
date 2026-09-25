import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/elements-of-group-16-17-and-18";

export const GROUP_17_NOTE: SubtopicNote = {
  subtopicName: "Group 17 Halogens, Interhalogens and Oxoacids",
  title: "Group 17: Halogens, Their Oxoacids and Interhalogen Compounds",
  oneLineDefinition:
    "The halogens F, Cl, Br, I and the radioactive At (ns² np⁵) change from gases to a liquid to a solid down the group, form less stable hydrogen halides as the atom grows, and give oxoacids HOX, HXO₂, HXO₃ and HXO₄ whose strength rises with the oxidation state; two different halogens combine as interhalogens XX′ₙ with n always odd.",
  whyItMatters:
    "21 PYQs, 1 HARD. Seven are halogen properties — the ns² np⁵ configuration, bromine the liquid, fluorine's false statement, ionic character of metal halides, the least stable hydride, boiling points of HX, and chlorine with hot NaOH; six are oxoacids — the strongest, its oxygen count and bonds, the halous acid, fluorine's only oxoacid, and the halogen with most oxoacids; eight are interhalogens — thermal stability (the HARD order), physical state at 25 °C (three times), shape of BrF₅, the oxidation state of iodine in I₂Cl₆, and the false statement about n. " +
    "Three cards.",
  concepts: [
    // 1 — halogen properties
    {
      kind: "formula" as const,
      slug: "cetg16-halogen-properties",
      name: "Halogen Properties and the Hydrogen Halides",
      intuition:
        "Every halogen is one electron short of a noble gas, ns² np⁵. Down the group the molecules get heavier, so F₂ and Cl₂ are gases, Br₂ the only liquid and I₂ a solid. Fluorine is the exception in several ways: the most electronegative element, it shows only −1 and forms only one oxoacid, but its F–F bond is WEAKER than Cl–Cl because the small atoms' lone pairs repel. Down the group the H–X bond weakens, so HF is the most stable and HI the least; HF also has the highest boiling point because it hydrogen-bonds, and the rest follow size: HI > HBr > HCl. Chlorine with NaOH disproportionates: cold and dilute gives hypochlorite, hot and concentrated gives chlorate.",
      definition:
        "- **Configuration** \\(ns^2np^5\\): F, Cl, Br, **I**, At (radioactive).\n" +
        "- **State at room temperature**: F₂, Cl₂ gases; **Br₂ liquid**; I₂ solid.\n" +
        "- **Fluorine**: most electronegative, only −1, only one oxoacid — but bond dissociation enthalpy is **not** the highest (Cl₂ > Br₂ > F₂ > I₂).\n" +
        "- **Metal halides**: ionic character MF > MCl > MBr > MI; **fluorine** gives the most ionic.\n" +
        "- **H–X**: thermal stability HF > HCl > HBr > **HI** (lowest); boiling point **HF > HI > HBr > HCl**.\n" +
        "- **Cl₂ + NaOH**: cold, dilute → NaCl + NaOCl + H₂O; hot, concentrated → \\(3\\text{Cl}_2 + 6\\text{NaOH} \\to 5\\text{NaCl} + \\text{NaClO}_3 + 3\\text{H}_2\\text{O}\\).",
      formula: {
        label: "Chlorine with hot concentrated NaOH",
        latex: "3\\text{Cl}_2 + 6\\text{NaOH} \\xrightarrow{\\text{hot, conc.}} 5\\text{NaCl} + \\text{NaClO}_3 + 3\\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Arrange HF, HCl and HBr by boiling point and by thermal stability.",
        steps: [
          "Boiling point: HF hydrogen-bonds, then size decides — HF > HBr > HCl.",
          "Stability follows bond strength — HF > HCl > HBr.",
        ],
        answer: "b.p. HF > HBr > HCl; stability HF > HCl > HBr",
      },
      selfCheckExample: {
        prompt: "Which is false about fluorine: most electronegative, only −1, highest bond dissociation enthalpy among halogens, only one oxoacid?",
        steps: [
          "The F–F bond is weaker than Cl–Cl.",
        ],
        answer: "Highest bond dissociation enthalpy",
      },
      practiceSet: [
        { prompt: "Element liquid at room temperature: Se, Br, I, S?", answer: "Br" },
        { prompt: "Halogen forming the most ionic metal halides?", answer: "Fluorine" },
        { prompt: "Decreasing boiling point of the hydrogen halides?", answer: "HF > HI > HBr > HCl" },
        { prompt: "Products of Cl₂ with hot, concentrated NaOH?", answer: "NaClO₃, NaCl and H₂O" },
      ],
      pyqExampleId: "f83f4a87-2be0-45b8-807a-7828ca29d960",
      traps: [
        {
          title: "Putting HI above HF in boiling point",
          body:
            "Without hydrogen bonding HI would boil highest, but HF's hydrogen bonds put it on top: HF > HI > HBr > HCl.",
        },
      ],
    },

    // 2 — oxoacids
    {
      kind: "reference" as const,
      slug: "cetg16-halogen-oxoacids",
      name: "Oxoacids of the Halogens",
      intuition:
        "Name the oxoacid by the halogen's oxidation state: +1 hypohalous HOX, +3 halous HXO₂, +5 halic HXO₃, +7 perhalic HXO₄. The more oxygens pulling electrons off the O–H, the stronger the acid, so perchloric acid HClO₄ is the strongest; its Cl has three Cl=O bonds and one Cl–OH. Chlorine forms all four; fluorine, which cannot take a positive state, forms only HOF.",
      definition:
        "- **Series**: hypochlorous HOCl (+1), **chlorous HClO₂ (+3)**, chloric HClO₃ (+5), **perchloric HClO₄ (+7)**.\n" +
        "- **Strongest**: **HClO₄** — acid strength rises with oxidation state; Cl is bonded to **4** O atoms: **3 double + 1 single** (the Cl–OH).\n" +
        "- **Fluorine**: only **HOF** (hypofluorous acid). **Chlorine** forms the most oxoacids (four).",
      table: {
        columns: ["Name", "Formula", "O.S. of Cl", "Cl–O bonds"],
        rows: [
          { cells: ["Hypochlorous", "HOCl", "+1", "1 single"] },
          { cells: ["Chlorous", "HClO₂", "+3", "1 single, 1 double"] },
          { cells: ["Chloric", "HClO₃", "+5", "1 single, 2 double"] },
          { cells: ["Perchloric", "HClO₄", "+7", "1 single, 3 double"], noteAmber: "The strongest oxoacid." },
        ],
        caption: "Halous = +3, not +1; 'hypo-' is +1.",
      },
      selfCheckExample: {
        prompt: "What is the formula of the halous acid of chlorine?",
        steps: [
          "Halous means +3.",
        ],
        answer: "HClO₂",
      },
      practiceSet: [
        { prompt: "Strongest oxoacid: hypochlorous, chlorous, chloric, perchloric?", answer: "Perchloric acid" },
        { prompt: "Number of O atoms bonded to Cl in its strongest oxoacid?", answer: "4" },
        { prompt: "Bonds from Cl to O in perchloric acid?", answer: "1 single and 3 double" },
        { prompt: "The existing oxoacid of fluorine?", answer: "HOF" },
        { prompt: "Halogen forming the maximum number of oxoacids?", answer: "Cl" },
      ],
      pyqExampleId: "8af12316-4e4a-4dcd-8a8b-f7124f1bd5c7",
      traps: [
        {
          title: "Reading 'halous' as the lowest acid",
          body:
            "Hypohalous (HOX) is the lowest, +1. Halous is the next one up, HXO₂ at +3.",
        },
      ],
    },

    // 3 — interhalogens
    {
      kind: "formula" as const,
      slug: "cetg16-interhalogens",
      name: "Interhalogen Compounds",
      intuition:
        "An interhalogen XX′ₙ joins a larger halogen X to n smaller ones X′, and n is always ODD — 1, 3, 5 or 7 — so that all electrons pair. They are covalent and diamagnetic, and more reactive than the parent halogens (the X–X′ bond is weaker), fluorine excepted. The shape follows the electron pairs on X: XX′ linear, XX′₃ T-shaped, XX′₅ square pyramidal (one lone pair), IF₇ pentagonal bipyramidal. Thermal stability is highest where the bond is most polar and strong, ClF, and the paper's order is ClF > ICl > IBr > BrCl. Most are gases or volatile liquids; the iodine ones are solids except IF₅ (liquid) and IF₇ (gas).",
      definition:
        "- **Formula** \\(\\text{XX}'_n\\), **n = 1, 3, 5, 7 (always odd)**; covalent, diamagnetic, more reactive than halogens (except F₂).\n" +
        "- **Shapes**: XX′ linear; XX′₃ T-shaped (\\(sp^3d\\)); XX′₅ **square pyramidal** (\\(sp^3d^2\\), e.g. BrF₅, ClF₅); IF₇ pentagonal bipyramidal (\\(sp^3d^3\\)).\n" +
        "- **Thermal stability**: **ClF > ICl > IBr > BrCl** (> BrF).\n" +
        "- **State at 25 °C**: gases — ClF, BrF, ClF₃, IF₇ (ClF, ClF₃ and IF₇ colourless); liquid — IF₅ (colourless); solids — ICl (red), IBr (black), **IF₃ (yellow)**.\n" +
        "- \\(\\text{I}_2\\text{Cl}_6\\): each I bonded to 3 Cl, so I is **+3**.",
      formula: {
        label: "Interhalogen stoichiometry",
        latex: "\\text{XX}'_n,\\ n \\in \\{1, 3, 5, 7\\};\\quad \\text{ClF} > \\text{ICl} > \\text{IBr} > \\text{BrCl}\\ \\text{(thermal stability)}",
      },
      authoredExample: {
        prompt: "Predict the shape of ClF₃ and the oxidation state of Cl in it.",
        steps: [
          "Cl has 7 valence electrons: 3 bond pairs + 2 lone pairs = 5 pairs, sp³d; the lone pairs take equatorial positions — T-shaped.",
          "x + 3(−1) = 0, so Cl is +3.",
        ],
        answer: "T-shaped; +3",
      },
      selfCheckExample: {
        prompt: "What is the shape of bromine pentafluoride?",
        steps: [
          "Five bond pairs and one lone pair on Br: octahedral electron geometry with one corner empty.",
        ],
        answer: "Square pyramidal",
      },
      practiceSet: [
        { prompt: "Highest thermal stability: ICl, BrCl, BrF, ClF?", answer: "ClF" },
        { prompt: "NOT a colourless gas: ClF₃, ClF, IF₇, IF₃?", answer: "IF₃ (yellow solid)" },
        { prompt: "NOT solid at 25 °C: ICl, IBr, IF₃, IF₅?", answer: "IF₅" },
        { prompt: "Oxidation state of iodine in I₂Cl₆?", answer: "+3" },
        { prompt: "False about XX′ₙ: covalent, diamagnetic, more reactive, n always even?", answer: "n always even — it is always odd" },
      ],
      pyqExampleId: "c7562ded-60f9-4bdd-b8d0-9beaa4489054",
      traps: [
        {
          title: "Assuming the iodine interhalogens are all solids",
          body:
            "ICl, IBr and IF₃ are solids, but IF₅ is a liquid and IF₇ a gas at 25 °C — more fluorines, weaker intermolecular attraction.",
        },
      ],
    },
  ],
  related: [
    { label: "Group 16 — the chalcogens and their hydrides", href: `${BASE}/cetg16-group-16` },
    { label: "Group 18 — xenon compounds with interhalogen shapes", href: `${BASE}/cetg16-group-18` },
  ],
};
