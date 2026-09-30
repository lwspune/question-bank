import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/jee-mains-chemistry/d-and-f-block-elements";

export const QUALITATIVE_DFB_NOTE: SubtopicNote = {
  subtopicName: "Qualitative Analysis of Ions",
  title: "Qualitative Analysis of Ions",
  oneLineDefinition:
    "Cations are separated into groups by a sequence of group reagents and then confirmed by a coloured precipitate or complex, while borax beads, the brown ring and a few named anion tests cover the rest of the salt-analysis scheme.",
  whyItMatters:
    "Thirty-five PYQs, the largest page, twenty-nine of them multiple choice, and one from 2026. Nine place a cation in its analytical group by the group reagent; sixteen are confirmatory tests and the colour of each product, led by potassium ferrocyanide, dimethylglyoxime and Nessler's reagent; ten are borax beads, anion tests such as the brown ring, and the preparation of Mohr's salt. It is almost all recall: the three tables below are the page.",
  concepts: [
    // C1 — group reagents
    {
      kind: "reference" as const,
      slug: "jcdfb-group-reagents",
      name: "Cation groups and their group reagents",
      intuition:
        "The scheme precipitates cations a group at a time, from the least soluble compounds to the most. Hydrogen sulphide in acid gives only a trace of sulphide ion, enough to bring down only the very insoluble group II sulphides. In ammonia the sulphide ion concentration is far higher, and the group IV sulphides come down too. Ammonium chloride is the brake that keeps each group clean.",
      definition:
        "- **Group I**: dilute HCl precipitates \\(\\mathrm{PbCl_2}\\).\n" +
        "- **Group II**: \\(\\mathrm{H_2S}\\) in dilute HCl. IIA (copper group): \\(\\mathrm{Pb^{2+}}\\), \\(\\mathrm{Cu^{2+}}\\), \\(\\mathrm{Cd^{2+}}\\), \\(\\mathrm{Hg^{2+}}\\), \\(\\mathrm{Bi^{3+}}\\). IIB (arsenic group): \\(\\mathrm{As^{3+}}\\), \\(\\mathrm{Sb^{3+}}\\), \\(\\mathrm{Sn^{2+}}\\).\n" +
        "- **Group III**: \\(\\mathrm{NH_4OH}\\) with \\(\\mathrm{NH_4Cl}\\) precipitates hydroxides of \\(\\mathrm{Fe^{3+}}\\), \\(\\mathrm{Al^{3+}}\\), \\(\\mathrm{Cr^{3+}}\\). \\(\\mathrm{NH_4Cl}\\) suppresses the \\(\\mathrm{OH^{-}}\\) concentration by the common-ion effect, so group IV and V hydroxides stay in solution.\n" +
        "- **Group IV**: \\(\\mathrm{H_2S}\\) in \\(\\mathrm{NH_4OH}\\) precipitates the sulphides of \\(\\mathrm{Zn^{2+}}\\), \\(\\mathrm{Mn^{2+}}\\), \\(\\mathrm{Co^{2+}}\\), \\(\\mathrm{Ni^{2+}}\\).\n" +
        "- **Group V**: \\(\\mathrm{(NH_4)_2CO_3}\\) in \\(\\mathrm{NH_4OH}\\) precipitates the carbonates of \\(\\mathrm{Ba^{2+}}\\), \\(\\mathrm{Sr^{2+}}\\), \\(\\mathrm{Ca^{2+}}\\).\n" +
        "- **Group VI**: \\(\\mathrm{Mg^{2+}}\\), tested with ammonium or disodium phosphate as white \\(\\mathrm{MgNH_4PO_4}\\).\n" +
        "- \\(\\mathrm{NH_4^{+}}\\) (group zero) is tested on the original salt.",
      table: {
        columns: ["Group", "Cations", "Group reagent", "Precipitated as"],
        rows: [
          { cells: ["Zero", "\\(\\mathrm{NH_4^{+}}\\)", "No group reagent; heat with NaOH", "Ammonia gas, confirmed with Nessler's reagent"] },
          { cells: ["I", "\\(\\mathrm{Pb^{2+}}\\)", "Dilute HCl", "White \\(\\mathrm{PbCl_2}\\)"] },
          { cells: ["II", "\\(\\mathrm{Pb^{2+}}\\), \\(\\mathrm{Cu^{2+}}\\), \\(\\mathrm{Cd^{2+}}\\), \\(\\mathrm{As^{3+}}\\)", "\\(\\mathrm{H_2S}\\) in dilute HCl", "Sulphides: PbS and CuS black, CdS and \\(\\mathrm{As_2S_3}\\) yellow"], noteAmber: "Pb²⁺ shows up in group I and again in group II, because PbCl₂ is partly soluble." },
          { cells: ["III", "\\(\\mathrm{Fe^{3+}}\\), \\(\\mathrm{Al^{3+}}\\), \\(\\mathrm{Cr^{3+}}\\)", "\\(\\mathrm{NH_4OH}\\) with \\(\\mathrm{NH_4Cl}\\)", "Hydroxides: \\(\\mathrm{Fe(OH)_3}\\) reddish-brown, \\(\\mathrm{Al(OH)_3}\\) white, \\(\\mathrm{Cr(OH)_3}\\) green"] },
          { cells: ["IV", "\\(\\mathrm{Zn^{2+}}\\), \\(\\mathrm{Mn^{2+}}\\), \\(\\mathrm{Co^{2+}}\\), \\(\\mathrm{Ni^{2+}}\\)", "\\(\\mathrm{H_2S}\\) in \\(\\mathrm{NH_4OH}\\)", "Sulphides: ZnS white, MnS buff, CoS and NiS black"] },
          { cells: ["V", "\\(\\mathrm{Ba^{2+}}\\), \\(\\mathrm{Sr^{2+}}\\), \\(\\mathrm{Ca^{2+}}\\)", "\\(\\mathrm{(NH_4)_2CO_3}\\) in \\(\\mathrm{NH_4OH}\\)", "White carbonates"] },
          { cells: ["VI", "\\(\\mathrm{Mg^{2+}}\\)", "No group reagent; ammonium phosphate", "White \\(\\mathrm{MgNH_4PO_4}\\)"] },
        ],
        caption: "Acidic H₂S catches only group II; alkaline H₂S catches group IV as well, which is why group II must be removed first.",
      },
      selfCheckExample: {
        prompt:
          "A solution holds \\(\\mathrm{Al^{3+}}\\), \\(\\mathrm{Ni^{2+}}\\) and \\(\\mathrm{Ba^{2+}}\\). In which group, and with which reagent, does each one come down?",
        steps: [
          "\\(\\mathrm{Al^{3+}}\\) forms an insoluble hydroxide: group III, \\(\\mathrm{NH_4OH}\\) with \\(\\mathrm{NH_4Cl}\\).",
          "\\(\\mathrm{Ni^{2+}}\\) needs alkaline \\(\\mathrm{H_2S}\\): group IV, black NiS.",
          "\\(\\mathrm{Ba^{2+}}\\) comes down as a carbonate: group V, ammonium carbonate.",
        ],
        answer: "Al³⁺ in III, Ni²⁺ in IV, Ba²⁺ in V.",
      },
      practiceSet: [
        { prompt: "Why is \\(\\mathrm{NH_4Cl}\\) added before \\(\\mathrm{NH_4OH}\\) in group III?", answer: "To lower the \\(\\mathrm{OH^{-}}\\) concentration (common-ion effect)" },
        { prompt: "Group of \\(\\mathrm{Cd^{2+}}\\)?", answer: "Group II (IIA)" },
        { prompt: "Is \\(\\mathrm{Fe^{3+}}\\) a group IV cation?", answer: "No, group III" },
        { prompt: "Which of \\(\\mathrm{Al^{3+}}\\), \\(\\mathrm{Zn^{2+}}\\), \\(\\mathrm{Cu^{2+}}\\), \\(\\mathrm{Ca^{2+}}\\) precipitates with \\(\\mathrm{H_2S}\\) in HCl?", answer: "\\(\\mathrm{Cu^{2+}}\\) only" },
        { prompt: "Group of \\(\\mathrm{As^{3+}}\\)?", answer: "Group II (IIB)" },
      ],
      pyqExampleId: "2419f6af-c80a-4d6d-9f78-7128aec85f26", // 2026 — Mn2+ comes down in group IV; Mn's highest state +7
      traps: [
        {
          title: "Mn²⁺ is group IV, Fe³⁺ is group III",
          body: "Both are d⁵ ions, but \\(\\mathrm{Fe(OH)_3}\\) precipitates in group III while \\(\\mathrm{Mn^{2+}}\\) waits for alkaline \\(\\mathrm{H_2S}\\) as MnS. Do not group transition metal ions by their configuration.",
        },
        {
          title: "Acid decides which sulphides come down",
          body: "In dilute HCl the sulphide ion concentration is tiny, so only group II sulphides precipitate. Adding a group IV cation to that step catches nothing; it needs the ammonia step.",
        },
      ],
    },

    // C2 — confirmatory tests
    {
      kind: "reference" as const,
      slug: "jcdfb-confirmatory",
      name: "Confirmatory tests and the colours they give",
      intuition:
        "Once a group is isolated, each cation is proved by one reagent that gives it a unique colour. Most of these products are coordination compounds of d-block ions, which is why they sit in this chapter. Learn each test as a triple: ion, reagent, colour.",
      definition:
        "- **Potassium ferrocyanide**, \\(\\mathrm{K_4[Fe(CN)_6]}\\): \\(\\mathrm{Cu^{2+}}\\) chocolate-brown \\(\\mathrm{Cu_2[Fe(CN)_6]}\\); \\(\\mathrm{Fe^{3+}}\\) Prussian blue \\(\\mathrm{Fe_4[Fe(CN)_6]_3}\\); \\(\\mathrm{Zn^{2+}}\\) white or bluish-white zinc ferrocyanide.\n" +
        "- With EXCESS ferrocyanide, \\(\\mathrm{Fe^{3+}}\\) gives the soluble, colloidal Prussian blue \\(\\mathrm{KFe[Fe(CN)_6]}\\).\n" +
        "- **Dimethylglyoxime** in ammonia: \\(\\mathrm{Ni^{2+}}\\) gives a brilliant red precipitate, \\(\\mathrm{[Ni(dmg)_2]}\\), with two five-membered chelate rings.\n" +
        "- **Potassium nitrite** in acetic acid: \\(\\mathrm{Co^{2+}}\\) gives yellow \\(\\mathrm{K_3[Co(NO_2)_6]}\\); cobalt is +3, low spin, 0 BM.\n" +
        "- **Thiocyanate**: \\(\\mathrm{Fe^{3+}}\\) gives a blood-red \\(\\mathrm{[Fe(SCN)]^{2+}}\\).\n" +
        "- **Nessler's reagent** \\(\\mathrm{K_2[HgI_4]}\\) in KOH: \\(\\mathrm{NH_4^{+}}\\) gives a brown precipitate. The reagent contains K, Hg, I, O and H, but no N.\n" +
        "- **Ammonium molybdate** in nitric acid: phosphate gives canary-yellow \\(\\mathrm{(NH_4)_3PO_4 \\cdot 12MoO_3}\\).\n" +
        "- **Sodium nitroprusside**: sulphide gives a violet \\(\\mathrm{[Fe(CN)_5NOS]^{4-}}\\).",
      table: {
        columns: ["Ion", "Reagent", "Observation", "Product"],
        rows: [
          { cells: ["\\(\\mathrm{Cu^{2+}}\\)", "\\(\\mathrm{K_4[Fe(CN)_6]}\\) in acetic acid", "Chocolate-brown precipitate", "\\(\\mathrm{Cu_2[Fe(CN)_6]}\\)"] },
          { cells: ["\\(\\mathrm{Fe^{3+}}\\)", "\\(\\mathrm{K_4[Fe(CN)_6]}\\)", "Prussian blue precipitate", "\\(\\mathrm{Fe_4[Fe(CN)_6]_3}\\)"] },
          { cells: ["\\(\\mathrm{Fe^{3+}}\\)", "KSCN", "Blood-red colour", "\\(\\mathrm{[Fe(SCN)]^{2+}}\\)"] },
          { cells: ["\\(\\mathrm{Zn^{2+}}\\)", "\\(\\mathrm{K_4[Fe(CN)_6]}\\), after neutralising", "White or bluish-white precipitate", "\\(\\mathrm{K_2Zn_3[Fe(CN)_6]_2}\\)"] },
          { cells: ["\\(\\mathrm{Ni^{2+}}\\)", "Dimethylglyoxime in \\(\\mathrm{NH_4OH}\\)", "Brilliant red precipitate", "\\(\\mathrm{[Ni(dmg)_2]}\\), five-membered chelate rings"] },
          { cells: ["\\(\\mathrm{Co^{2+}}\\)", "\\(\\mathrm{KNO_2}\\) in acetic acid", "Yellow precipitate", "\\(\\mathrm{K_3[Co(NO_2)_6]}\\)"] },
          { cells: ["\\(\\mathrm{Mn^{2+}}\\)", "NaOH, then left in air", "White precipitate turning brown", "\\(\\mathrm{MnO(OH)_2}\\)"] },
          { cells: ["\\(\\mathrm{Mg^{2+}}\\)", "Ammonium phosphate in \\(\\mathrm{NH_4OH}\\)", "White crystalline precipitate", "\\(\\mathrm{MgNH_4PO_4}\\)"] },
          { cells: ["\\(\\mathrm{NH_4^{+}}\\)", "Nessler's reagent, \\(\\mathrm{K_2[HgI_4]}\\) in KOH", "Brown precipitate", "Iodide of Millon's base"] },
          { cells: ["\\(\\mathrm{PO_4^{3-}}\\)", "Ammonium molybdate in \\(\\mathrm{HNO_3}\\)", "Canary-yellow precipitate", "\\(\\mathrm{(NH_4)_3PO_4 \\cdot 12MoO_3}\\)"] },
          { cells: ["\\(\\mathrm{S^{2-}}\\)", "Sodium nitroprusside", "Violet colour", "\\(\\mathrm{Na_4[Fe(CN)_5NOS]}\\)"] },
        ],
        caption: "Ferrocyanide alone confirms three cations: brown for copper, blue for iron(III), white for zinc.",
      },
      selfCheckExample: {
        prompt:
          "A green salt solution, made alkaline with ammonia, gives a brilliant red precipitate with dimethylglyoxime. Name the metal ion and give the spin-only moment of the precipitate, which is square planar.",
        steps: [
          "A brilliant red dimethylglyoxime precipitate is the test for \\(\\mathrm{Ni^{2+}}\\) (green in water, d⁸).",
          "In the square planar complex the eight d electrons pair up: no unpaired electron.",
        ],
        answer: "\\(\\mathrm{Ni^{2+}}\\); the precipitate is diamagnetic, 0 BM.",
      },
      practiceSet: [
        { prompt: "Formula of Nessler's reagent?", answer: "\\(\\mathrm{K_2[HgI_4]}\\) in KOH" },
        { prompt: "Formula of insoluble Prussian blue?", answer: "\\(\\mathrm{Fe_4[Fe(CN)_6]_3}\\)" },
        { prompt: "Colour of \\(\\mathrm{K_3[Co(NO_2)_6]}\\)?", answer: "Yellow" },
        { prompt: "Colour of \\(\\mathrm{MgNH_4PO_4}\\)?", answer: "White" },
        { prompt: "Size of the chelate rings in nickel dimethylglyoximate?", answer: "Five-membered" },
      ],
      pyqExampleId: "4c43fba9-32dd-413b-99a3-4868ae443998", // 2025 — K4[Fe(CN)6] tests for Cu2+, Fe3+ and Zn2+
      traps: [
        {
          title: "The dimethylglyoxime rings are five-membered",
          body: "Each glyoxime binds nickel through two nitrogens, closing a five-membered Ni–N–C–C–N ring. A statement calling it a six-membered chelate is false.",
        },
        {
          title: "Nessler's reagent has no nitrogen",
          body: "The reagent is \\(\\mathrm{K_2[HgI_4]}\\) in KOH: potassium, mercury, iodine, and oxygen and hydrogen from the alkali. It detects nitrogen as \\(\\mathrm{NH_4^{+}}\\); it does not contain any.",
        },
      ],
    },

    // C3 — dry tests, anion tests, Mohr's salt
    {
      kind: "reference" as const,
      slug: "jcdfb-dry-anion-tests",
      name: "Borax beads, anion tests and Mohr's salt",
      intuition:
        "A borax bead is a glassy bead of sodium metaborate and boric anhydride. Fused with a trace of a coloured salt, it forms that metal's metaborate, whose colour depends on the metal and on whether the oxidising (outer) or reducing (inner) part of the flame was used. The anion tests work the same way: one reagent, one colour, and a reason behind it.",
      definition:
        "- **Borax bead**: \\(\\mathrm{Na_2B_4O_7 \\cdot 10H_2O \\rightarrow Na_2B_4O_7 \\rightarrow 2NaBO_2 + B_2O_3}\\); \\(\\mathrm{B_2O_3}\\) plus the metal oxide gives a coloured metaborate.\n" +
        "- **Brown ring** (nitrate): add freshly prepared \\(\\mathrm{FeSO_4}\\), then pour concentrated \\(\\mathrm{H_2SO_4}\\) down the side. \\(\\mathrm{NO_3^{-}}\\) is reduced to NO, which forms \\(\\mathrm{[Fe(H_2O)_5(NO)]^{2+}}\\) (nitrosoferrous sulphate). NO bonds as \\(\\mathrm{NO^{+}}\\), so iron is +1.\n" +
        "- **Acetate**: neutral \\(\\mathrm{FeCl_3}\\) gives a deep red colour; on boiling a brown-red basic ferric acetate precipitates.\n" +
        "- **Chloride**: \\(\\mathrm{AgNO_3}\\) in dilute \\(\\mathrm{HNO_3}\\) gives curdy white AgCl, which dissolves in \\(\\mathrm{NH_4OH}\\) as \\(\\mathrm{[Ag(NH_3)_2]Cl}\\).\n" +
        "- **Mohr's salt**, \\(\\mathrm{FeSO_4 \\cdot (NH_4)_2SO_4 \\cdot 6H_2O}\\): dilute \\(\\mathrm{H_2SO_4}\\) is added to stop \\(\\mathrm{FeSO_4}\\) hydrolysing, and prolonged heating is avoided so that \\(\\mathrm{Fe^{2+}}\\) is not oxidised to \\(\\mathrm{Fe^{3+}}\\).",
      table: {
        columns: ["Test", "Conditions", "Observation", "Reason"],
        rows: [
          { cells: ["Borax bead: Cu", "Oxidising flame", "Green when hot, blue when cold", "Copper metaborate; red and opaque in the reducing flame"] },
          { cells: ["Borax bead: Fe", "Oxidising and reducing flame", "Yellowish-brown hot, yellow cold (oxidising); green (reducing)", "Iron(III) metaborate; iron(II) in the reducing flame"] },
          { cells: ["Borax bead: Ni", "Oxidising flame", "Violet when hot, reddish-brown when cold", "Nickel metaborate"] },
          { cells: ["Borax bead: Mn", "Oxidising flame", "Violet (amethyst), hot and cold", "Manganese metaborate; colourless in the reducing flame"] },
          { cells: ["Borax bead: Co", "Either flame", "Blue, hot and cold", "Cobalt metaborate"] },
          { cells: ["Borax bead: Cr", "Either flame", "Green, hot and cold", "Chromium metaborate"] },
          { cells: ["Brown ring (\\(\\mathrm{NO_3^{-}}\\))", "Fresh \\(\\mathrm{FeSO_4}\\), then conc. \\(\\mathrm{H_2SO_4}\\) down the side", "Brown ring where the layers meet", "\\(\\mathrm{[Fe(H_2O)_5(NO)]^{2+}}\\), Fe +1"], noteAmber: "The complex is nitrosoferrous sulphate." },
          { cells: ["Acetate (\\(\\mathrm{CH_3COO^{-}}\\))", "Neutral \\(\\mathrm{FeCl_3}\\), then boil", "Deep red colour, then a brown-red precipitate", "Basic ferric acetate, Fe +3"] },
          { cells: ["Chloride (\\(\\mathrm{Cl^{-}}\\))", "\\(\\mathrm{AgNO_3}\\) in dilute \\(\\mathrm{HNO_3}\\), then \\(\\mathrm{NH_4OH}\\)", "Curdy white precipitate that dissolves", "AgCl, then \\(\\mathrm{[Ag(NH_3)_2]Cl}\\)"] },
          { cells: ["Mohr's salt preparation", "Dilute \\(\\mathrm{H_2SO_4}\\) added; no prolonged heating", "Pale green crystals", "Acid stops hydrolysis; heating would oxidise \\(\\mathrm{Fe^{2+}}\\)"] },
        ],
        caption: "The bead colour depends on the metal AND on the part of the flame used.",
      },
      selfCheckExample: {
        prompt:
          "A borax bead is green while hot and blue when cold in the oxidising flame, and red and opaque in the reducing flame. Which metal is present?",
        steps: [
          "Green hot and blue cold in the oxidising flame is copper(II) metaborate.",
          "In the reducing flame the copper is reduced to the metal, which makes the bead red and opaque.",
        ],
        answer: "Copper.",
      },
      practiceSet: [
        { prompt: "Oxidation state of iron in the brown-ring complex?", answer: "+1" },
        { prompt: "Borax bead colour of cobalt?", answer: "Blue in both flames" },
        { prompt: "Why is dilute \\(\\mathrm{H_2SO_4}\\) added while making Mohr's salt?", answer: "To prevent hydrolysis of \\(\\mathrm{FeSO_4}\\)" },
        { prompt: "Which silver halide is curdy white and soluble in ammonia?", answer: "AgCl" },
        { prompt: "Which metal gives a violet bead when hot in the oxidising flame and a reddish-brown one when cold?", answer: "Nickel" },
      ],
      pyqExampleId: "2f2db1ac-959a-44d2-84e7-2683c50fe09a", // 2023 — brown ring and red colour with neutral FeCl3: nitrate and acetate
      traps: [
        {
          title: "Iron in the brown ring is +1",
          body: "The ring is \\(\\mathrm{[Fe(H_2O)_5(NO)]^{2+}}\\). NO bonds as \\(\\mathrm{NO^{+}}\\), so \\(x + 1 = +2\\) and \\(x = +1\\). Treating NO as neutral gives +2, which is the common wrong option.",
        },
        {
          title: "The acetate test needs NEUTRAL ferric chloride",
          body: "Acid destroys the red iron acetate complex. The red colour, and the brown-red precipitate on boiling, appear only with neutral \\(\\mathrm{FeCl_3}\\).",
        },
      ],
    },
  ],
  related: [
    { label: "Magnetic Moment and Colour — the colours of the aqueous ions", href: `${BASE}/jch-dfb-magnetic` },
    { label: "Potassium Dichromate and Chromium Compounds — the chromyl chloride test for chloride", href: `${BASE}/jch-dfb-dichromate` },
  ],
};
