import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_AK_PREP_NOTE: SubtopicNote = {
  subtopicName: "Preparation and Physical Properties",
  title: "Preparation and Physical Properties",
  oneLineDefinition:
    "How aldehydes and ketones are made from alcohols, alkenes, alkynes, acid chlorides, nitriles and esters, the routes to aromatic aldehydes and ketones, and why their boiling points sit between those of hydrocarbons and alcohols.",
  whyItMatters:
    "Six NEET questions from 2021 to 2026. Two are on the Etard reaction: the chromium complex formed on the way (2021), and what else is true of its product benzaldehyde (Re-NEET 2026). One matches four conversions to their reagents (2024), one picks DIBAL-H to turn an ester into an aldehyde (2025), one tests why aldehydes and ketones boil where they do (2022), and one ranks an ether, a ketone, an alcohol and an acid by polarity (Re-NEET 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchak-carbonyl-prep",
      name: "Preparing aldehydes and ketones",
      intuition:
        "There are two ways to reach a C=O group. Go up from an alcohol, alkene or alkyne by oxidation, ozonolysis or hydration. Or come down from a compound that is already more oxidised, such as an acid chloride, a nitrile or an ester, using a reducing agent gentle enough to stop at the aldehyde. Each method has its own named reagent, and NEET asks you to match them.",
      definition:
        "- **Oxidation of alcohols:** a primary alcohol gives an aldehyde, a secondary alcohol a ketone. \\(\\text{CrO}_3\\) does this; for a primary alcohol it must be in an anhydrous medium, or use PCC, so that the aldehyde is not oxidised on to the acid.\n" +
        "- **Dehydrogenation:** alcohol vapour passed over Cu or Ag at 573 K.\n" +
        "- **Ozonolysis** of an alkene, then Zn and water, gives aldehydes, ketones or both.\n" +
        "- **Hydration of an alkyne** with dilute \\(\\text{H}_2\\text{SO}_4\\) and \\(\\text{HgSO}_4\\): ethyne gives ethanal, other alkynes give ketones.\n" +
        "- **From acid derivatives:** an acid chloride with \\(\\text{H}_2\\) over Pd on \\(\\text{BaSO}_4\\) gives an aldehyde (Rosenmund reduction). A nitrile with \\(\\text{SnCl}_2\\) and HCl, then water, gives an aldehyde (Stephen reaction). DIBAL-H reduces a nitrile or an ester to an aldehyde.\n" +
        "- **Ketones only:** a nitrile with a Grignard reagent, then hydrolysis; an acid chloride with a dialkylcadmium.",
      table: {
        columns: ["Starting compound", "Reagent", "Product"],
        rows: [
          { cells: ["Primary alcohol", "\\(\\text{CrO}_3\\) (anhydrous) or PCC", "Aldehyde"] },
          { cells: ["Secondary alcohol", "\\(\\text{CrO}_3\\)", "Ketone"], pyqExampleId: "bf7819f0-7432-4d98-b043-30aed72b768d", noteAmber: "NEET 2024: cyclohexanol to cyclohexanone was matched with CrO₃, and an alkene to two ketones with O₃ then Zn and water." },
          { cells: ["Alkene", "\\(\\text{O}_3\\), then Zn and \\(\\text{H}_2\\text{O}\\)", "Aldehydes, ketones or both"] },
          { cells: ["Ethyne", "\\(\\text{H}_2\\text{O}\\), dilute \\(\\text{H}_2\\text{SO}_4\\), \\(\\text{HgSO}_4\\)", "Ethanal"] },
          { cells: ["Acid chloride", "\\(\\text{H}_2\\), Pd on \\(\\text{BaSO}_4\\) (Rosenmund)", "Aldehyde"] },
          { cells: ["Nitrile", "\\(\\text{SnCl}_2\\), HCl, then \\(\\text{H}_3\\text{O}^+\\) (Stephen)", "Aldehyde"] },
          { cells: ["Nitrile or ester", "DIBAL-H, \\(\\text{AlH(iBu)}_2\\), then \\(\\text{H}_2\\text{O}\\)", "Aldehyde"], pyqExampleId: "d92802a9-be4e-44d8-866c-c706240efe2a", noteAmber: "NEET 2025: methyl benzoate to benzaldehyde needs DIBAL-H, not LiAlH₄ or NaBH₄." },
          { cells: ["Nitrile", "Grignard reagent RMgX, then \\(\\text{H}_3\\text{O}^+\\)", "Ketone"] },
          { cells: ["Acid chloride", "Dialkylcadmium \\(\\text{R}_2\\text{Cd}\\)", "Ketone"] },
        ],
      },
      pyqExampleId: "d92802a9-be4e-44d8-866c-c706240efe2a",
      selfCheckExample: {
        prompt: "Ethanenitrile, CH₃CN, is treated in one flask with SnCl₂ and HCl followed by water, and in another with CH₃MgBr followed by dilute acid. Name the two products.",
        steps: [
          "\\(\\text{SnCl}_2\\) and HCl reduce the nitrile to an imine, which water hydrolyses to an aldehyde with the same carbons: ethanal, \\(\\text{CH}_3\\text{CHO}\\) (Stephen reaction).",
          "The Grignard reagent adds a \\(\\text{CH}_3\\) group to the nitrile carbon; hydrolysis then gives a ketone: \\(\\text{CH}_3\\text{COCH}_3\\).",
        ],
        answer: "Ethanal in the first flask, propanone in the second",
      },
      practiceSet: [
        { prompt: "Which reagent turns benzoyl chloride into benzaldehyde?", answer: "\\(\\text{H}_2\\) over Pd on \\(\\text{BaSO}_4\\) (Rosenmund reduction)" },
        { prompt: "What does but-2-ene give on ozonolysis followed by Zn and water?", answer: "Two molecules of ethanal" },
        { prompt: "What does ethyne give with water in the presence of HgSO₄ and dilute H₂SO₄?", answer: "Ethanal" },
        { prompt: "What does propan-2-ol give on oxidation with CrO₃?", answer: "Propanone" },
      ],
      traps: [
        {
          title: "LiAlH₄ goes past the aldehyde",
          body: "LiAlH₄ reduces an ester all the way to a primary alcohol. To stop at the aldehyde stage, the reagent is DIBAL-H followed by water.",
        },
        {
          title: "Rosenmund starts from an acid chloride",
          body: "Hydrogen over Pd on \\(\\text{BaSO}_4\\) turns an acid chloride (RCOCl) into an aldehyde. It is not used on an acid or an ester.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchak-aromatic-prep",
      name: "Aromatic aldehydes and ketones",
      intuition:
        "Benzaldehyde is made either by oxidising the methyl group of toluene gently, so that it stops at CHO, or by putting a CHO group straight onto benzene. Aromatic ketones are made by putting an acyl group onto the ring. Each toluene route passes through its own intermediate, and NEET asks for those intermediates by name.",
      definition:
        "- **Etard reaction:** toluene with chromyl chloride, \\(\\text{CrO}_2\\text{Cl}_2\\), in \\(\\text{CS}_2\\) gives a chromium complex, \\(\\text{C}_6\\text{H}_5\\text{CH(OCrOHCl}_2)_2\\), which water and acid hydrolyse to benzaldehyde.\n" +
        "- **Chromic oxide in acetic anhydride:** toluene gives benzylidene diacetate, \\(\\text{C}_6\\text{H}_5\\text{CH(OCOCH}_3)_2\\), which hydrolyses to benzaldehyde.\n" +
        "- **Side-chain chlorination:** toluene with \\(\\text{Cl}_2\\) in light gives benzal chloride, \\(\\text{C}_6\\text{H}_5\\text{CHCl}_2\\), which water at 373 K hydrolyses to benzaldehyde. This is how benzaldehyde is made commercially.\n" +
        "- **Gattermann-Koch reaction:** benzene with CO and HCl, anhydrous \\(\\text{AlCl}_3\\) and CuCl, gives benzaldehyde.\n" +
        "- **Friedel-Crafts acylation:** benzene with an acid chloride and anhydrous \\(\\text{AlCl}_3\\) gives an aryl ketone, such as acetophenone or benzophenone.",
      table: {
        columns: ["Name", "Start and reagent", "Intermediate", "Product"],
        rows: [
          { cells: ["Etard reaction", "Toluene, \\(\\text{CrO}_2\\text{Cl}_2\\) in \\(\\text{CS}_2\\)", "Chromium complex \\(\\text{C}_6\\text{H}_5\\text{CH(OCrOHCl}_2)_2\\)", "Benzaldehyde"], pyqExampleId: "30020e66-7a5d-458e-86f1-9c48c262db6c", noteAmber: "NEET 2021: the intermediate X is the chromium complex, not benzylidene diacetate or benzal chloride." },
          { cells: ["Chromic oxide route", "Toluene, \\(\\text{CrO}_3\\) in acetic anhydride", "Benzylidene diacetate \\(\\text{C}_6\\text{H}_5\\text{CH(OCOCH}_3)_2\\)", "Benzaldehyde"] },
          { cells: ["Side-chain chlorination", "Toluene, \\(\\text{Cl}_2\\) and light, then water at 373 K", "Benzal chloride \\(\\text{C}_6\\text{H}_5\\text{CHCl}_2\\)", "Benzaldehyde"] },
          { cells: ["Gattermann-Koch", "Benzene, CO and HCl, anhydrous \\(\\text{AlCl}_3\\) and CuCl", "No isolated intermediate", "Benzaldehyde"] },
          { cells: ["Friedel-Crafts acylation", "Benzene, RCOCl and anhydrous \\(\\text{AlCl}_3\\)", "No isolated intermediate", "Aryl ketone such as \\(\\text{C}_6\\text{H}_5\\text{COCH}_3\\)"] },
        ],
      },
      pyqExampleId: "30020e66-7a5d-458e-86f1-9c48c262db6c",
      selfCheckExample: {
        prompt: "Toluene is treated with Cl₂ in sunlight to give C₆H₅CHCl₂, and this is heated with water at 373 K. Name the final product and the intermediate.",
        steps: [
          "Chlorine in light replaces hydrogens of the side chain, not of the ring. Two of them gives benzal chloride, \\(\\text{C}_6\\text{H}_5\\text{CHCl}_2\\).",
          "Hydrolysis turns the \\(\\text{CHCl}_2\\) group into CHO.",
        ],
        answer: "Benzaldehyde, through benzal chloride",
      },
      practiceSet: [
        { prompt: "Which reagent turns benzene into acetophenone?", answer: "\\(\\text{CH}_3\\text{COCl}\\) with anhydrous \\(\\text{AlCl}_3\\) (Friedel-Crafts acylation)" },
        { prompt: "Name the reaction that makes benzaldehyde from benzene, CO and HCl.", answer: "Gattermann-Koch reaction" },
        { prompt: "What does toluene form with CrO₃ in acetic anhydride before hydrolysis?", answer: "Benzylidene diacetate, \\(\\text{C}_6\\text{H}_5\\text{CH(OCOCH}_3)_2\\)" },
        { prompt: "Is benzene or toluene the starting compound of the Etard reaction?", answer: "Toluene" },
      ],
      traps: [
        {
          title: "Three toluene routes, three intermediates",
          body: "Chromyl chloride gives the chromium complex, \\(\\text{CrO}_3\\) in acetic anhydride gives benzylidene diacetate, and chlorine in light gives benzal chloride. Each is hydrolysed to benzaldehyde, so match the intermediate to the reagent.",
        },
        {
          title: "Friedel-Crafts gives a ketone, Gattermann-Koch an aldehyde",
          body: "An acid chloride with \\(\\text{AlCl}_3\\) puts an acyl group on benzene, giving a ketone such as acetophenone. CO and HCl put on a CHO group, giving benzaldehyde.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchak-physical",
      name: "Boiling points and solubility",
      intuition:
        "The C=O bond is polar, so aldehyde and ketone molecules attract each other through dipole-dipole forces. That is stronger than the attraction between hydrocarbon or ether molecules, but weaker than the hydrogen bonds between alcohol molecules, since an aldehyde or ketone has no O-H. So for molecules of about the same mass, their boiling points fall in between.",
      definition:
        "- Methanal is a gas at room temperature, ethanal a volatile liquid, and the other aldehydes and ketones are liquids or solids.\n" +
        "- Their boiling points are **higher** than those of hydrocarbons and ethers of comparable mass, because of weak association through **dipole-dipole** interactions.\n" +
        "- They are **lower** than those of alcohols of comparable mass, because aldehydes and ketones cannot form hydrogen bonds with each other.\n" +
        "- Methanal, ethanal and propanone mix with water in all proportions, because they form hydrogen bonds with water. Solubility falls as the alkyl chain grows.\n" +
        "- Carboxylic acids boil higher still, even above alcohols of comparable mass, because their hydrogen bonding is more extensive. Most exist as hydrogen-bonded dimers in the vapour phase.",
      table: {
        columns: ["Compound", "Molar mass", "Boiling point", "Main attraction"],
        rows: [
          { cells: ["n-Butane", "58", "273 K", "Weak van der Waals forces"] },
          { cells: ["Methoxyethane", "60", "281 K", "Weak dipole-dipole forces"] },
          { cells: ["Propanal", "58", "322 K", "Dipole-dipole forces"], pyqExampleId: "e7985585-3d0b-4cc4-bb97-28b041baf8c4", noteAmber: "NEET 2022: both statements were true. Dipole-dipole forces lift aldehydes and ketones above hydrocarbons; no hydrogen bonding keeps them below alcohols." },
          { cells: ["Acetone", "58", "329 K", "Dipole-dipole forces"] },
          { cells: ["Propan-1-ol", "60", "370 K", "Hydrogen bonds"] },
        ],
      },
      pyqExampleId: "e7985585-3d0b-4cc4-bb97-28b041baf8c4",
      selfCheckExample: {
        prompt: "Arrange propanal, propan-1-ol and n-butane in order of increasing boiling point, and give the reason.",
        steps: [
          "n-Butane has only weak van der Waals forces between its molecules.",
          "Propanal adds dipole-dipole attraction from its polar C=O bond.",
          "Propan-1-ol forms hydrogen bonds between its molecules, the strongest of the three.",
        ],
        answer: "n-Butane < propanal < propan-1-ol",
      },
      practiceSet: [
        { prompt: "Which is a gas at room temperature: methanal or ethanal?", answer: "Methanal" },
        { prompt: "Why does propanone mix with water in all proportions?", answer: "It forms hydrogen bonds with water molecules" },
        { prompt: "Which has the higher boiling point: acetone or methoxyethane?", answer: "Acetone (329 K against 281 K)" },
        { prompt: "In what form do most carboxylic acids exist in the vapour phase?", answer: "As hydrogen-bonded dimers" },
      ],
      traps: [
        {
          title: "Aldehyde molecules do not hydrogen bond to each other",
          body: "An aldehyde or ketone has no hydrogen on oxygen, so its molecules attract by dipole-dipole forces only. Hydrogen bonds form only with a partner that has an O-H, such as water.",
        },
        {
          title: "Acids boil above alcohols",
          body: "For comparable molar mass the order of boiling point is hydrocarbon < ether < aldehyde or ketone < alcohol < carboxylic acid. The acid is highest because of its more extensive hydrogen bonding.",
        },
      ],
    },
  ],
};
