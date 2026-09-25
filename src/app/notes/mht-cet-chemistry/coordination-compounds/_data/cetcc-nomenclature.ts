import type { SubtopicNote } from "@/app/notes/_types";

export const NOMENCLATURE_NOTE: SubtopicNote = {
  subtopicName: "Oxidation State, Coordination Number and IUPAC Nomenclature",
  title: "Oxidation State, Coordination Number, Werner's Counter Ions and IUPAC Names",
  oneLineDefinition:
    "The oxidation state of the central metal is what is left after the ligand charges are subtracted from the sphere charge, its coordination number is the number of donor atoms bonded to it, only the ions outside the square bracket ionise in solution, and an IUPAC name lists the ligands alphabetically before the metal, gives the metal's oxidation state in Roman numerals and ends in -ate when the sphere is an anion.",
  whyItMatters:
    "15 PYQs, none HARD. Eight are oxidation state and coordination number — Pt in [PtCl₆]²⁻, Fe in hexacyanoferrate, Cr in Cr(CO)₆, the coordination number of an octahedral complex, of cisplatin and of trioxalatoferrate, and one on Stock notation; two count the chloride that precipitates with silver nitrate; five turn a name into a formula or a formula into a name. " +
    "Three cards.",
  concepts: [
    // 1 — oxidation state and coordination number
    {
      kind: "formula" as const,
      slug: "cetcc-oxidation-state-and-coordination-number",
      name: "Oxidation State and Coordination Number",
      intuition:
        "Two numbers, two different counts. The OXIDATION STATE comes from charge balance: sphere charge = metal oxidation state + the sum of ligand charges, so in [PtCl₆]²⁻, x + 6(−1) = −2 and x = +4; in [Fe(CN)₆]⁴⁻, x − 6 = −4 and x = +2; in Cr(CO)₆ every ligand is neutral, so Cr is 0 and has lost no electrons. The COORDINATION NUMBER counts donor atoms, not ligands: six monodentate ligands give 6, but three bidentate oxalates also give 6, and cisplatin's two NH₃ and two Cl⁻ give 4. Geometry follows the coordination number: 6 is octahedral, 4 is tetrahedral or square planar, 2 is linear.",
      definition:
        "- **Oxidation state**: \\(x + \\sum(\\text{ligand charges}) = \\text{sphere charge}\\). \\([\\text{PtCl}_6]^{2-}\\) → **+4**; \\([\\text{Fe(CN)}_6]^{4-}\\) → **+2**; \\(\\text{Cr(CO)}_6\\), \\(\\text{Ni(CO)}_4\\), \\(\\text{Fe(CO)}_5\\) → **0** (no electrons lost).\n" +
        "- **Coordination number** = number of donor atoms bonded to the metal. \\([\\text{Fe(C}_2\\text{O}_4)_3]^{3-}\\) → 3 × 2 = **6**; cisplatin \\([\\text{Pt(NH}_3)_2\\text{Cl}_2]\\) → **4**; \\([\\text{Ag(CN)}_2]^-\\) → 2.\n" +
        "- **Geometry by coordination number**: 6 → octahedral (\\(d^2sp^3\\) or \\(sp^3d^2\\)); 4 → tetrahedral (\\(sp^3\\)) or square planar (\\(dsp^2\\)); 2 → linear.\n" +
        "- **Stock notation** writes the oxidation state in Roman numerals after the element: aurous chloride is Au(I)Cl, auric chloride Au(III)Cl₃; mercurous chloride \\(\\text{Hg}_2\\text{(I)Cl}_2\\) is the reduced form of mercuric Hg(II)Cl₂. The notation shows at a glance whether a species is in its oxidised or reduced form.",
      formula: {
        label: "Oxidation state and coordination number",
        latex:
          "x + \\sum q_{\\text{ligand}} = q_{\\text{sphere}};\\qquad \\text{CN} = \\sum (\\text{ligands} \\times \\text{denticity})",
      },
      authoredExample: {
        prompt: "Give the oxidation state and the coordination number of the metal in K₃[Cr(C₂O₄)₃] and in [Co(en)₂Cl₂]Cl.",
        steps: [
          "[Cr(C₂O₄)₃]³⁻: x + 3(−2) = −3, so Cr is +3; three bidentate oxalates give CN 6.",
          "[Co(en)₂Cl₂]⁺: en is neutral, so x + 2(−1) = +1 and Co is +3; two en give 4 donor atoms and two Cl⁻ give 2, so CN is 6.",
        ],
        answer: "Cr +3, CN 6; Co +3, CN 6",
      },
      selfCheckExample: {
        prompt: "What is the oxidation state of Ni in [Ni(CN)₄]²⁻, and its coordination number?",
        steps: [
          "x + 4(−1) = −2 gives x = +2. Four monodentate cyanides give CN 4.",
        ],
        answer: "+2; 4",
      },
      practiceSet: [
        { prompt: "Oxidation number of Pt in [PtCl₆]²⁻?", answer: "+4" },
        { prompt: "Coordination number of the metal in an octahedral complex?", answer: "6" },
        { prompt: "Electrons lost by Cr in Cr(CO)₆?", answer: "0 — CO is neutral, so Cr is in the 0 state" },
        { prompt: "Which is written wrongly in Stock notation: Hg₂(I)Cl₂, Hg(II)Cl₂, aurous chloride as Au(III)Cl₃?", answer: "Aurous chloride — it is Au(I)Cl" },
      ],
      pyqExampleId: "104f4c8e-6ef2-4359-a036-7f06d1532907",
      traps: [
        {
          title: "Counting ligands instead of donor atoms",
          body:
            "[Fe(C₂O₄)₃]³⁻ has three ligands but six donor atoms, so its coordination number is 6, not 3. The coordination number counts bonds to the metal.",
        },
        {
          title: "Reading -ous and -ic backwards",
          body:
            "-ous is the LOWER oxidation state (aurous Au⁺, cuprous Cu⁺, ferrous Fe²⁺, mercurous Hg₂²⁺), -ic the higher (auric Au³⁺, cupric Cu²⁺, ferric Fe³⁺, mercuric Hg²⁺).",
        },
      ],
    },

    // 2 — Werner: ionisable counter ions
    {
      kind: "formula" as const,
      slug: "cetcc-ionisable-counter-ions",
      name: "Counter Ions: What Precipitates with Silver Nitrate",
      intuition:
        "Werner's test. Only the ions OUTSIDE the square bracket are free in solution; a chloride inside is bonded to the metal and does not react with Ag⁺. So excess AgNO₃ precipitates one AgCl for every chloride written after the bracket. [Co(NH₃)₅CO₃]Cl has one outer chloride — 1 mol AgCl per mol. Run it backwards: a complex that gives 2 mol AgCl has 2 ionisable chlorides. The same outer ions set the number of ions the complex gives in water, and so its molar conductivity.",
      definition:
        "- **Moles of AgCl** per mole of complex = number of Cl⁻ **outside** the coordination sphere.\n" +
        "- Werner's cobalt ammines: \\(\\text{CoCl}_3\\cdot6\\text{NH}_3 = [\\text{Co(NH}_3)_6]\\text{Cl}_3\\) → 3 AgCl, 4 ions; \\(\\text{CoCl}_3\\cdot5\\text{NH}_3 = [\\text{Co(NH}_3)_5\\text{Cl}]\\text{Cl}_2\\) → 2 AgCl, 3 ions; \\(\\text{CoCl}_3\\cdot4\\text{NH}_3 = [\\text{Co(NH}_3)_4\\text{Cl}_2]\\text{Cl}\\) → 1 AgCl, 2 ions.\n" +
        "- \\([\\text{Co(NH}_3)_5\\text{CO}_3]\\text{Cl}\\) (pentaamminecarbonatocobalt(III) chloride) → **1** mol AgCl: carbonato is inside, one chloride outside.\n" +
        "- The metal's valencies in Werner's terms: the **primary** valency is the oxidation state (satisfied by the counter ions and anionic ligands), the **secondary** valency is the coordination number.",
      formula: {
        label: "Werner's precipitation count",
        latex:
          "n(\\text{AgCl}) = n(\\text{Cl}^- \\text{ outside } [\\ ])\\ \\text{per mole of complex}",
      },
      authoredExample: {
        prompt: "One mole of a complex CrCl₃·5H₂O gives 2 mol of AgCl with excess silver nitrate. Write its formula.",
        steps: [
          "Two chlorides are outside the sphere; the third is inside. Cr(III) keeps coordination number 6 with five waters and that chloride.",
        ],
        answer: "[Cr(H₂O)₅Cl]Cl₂",
      },
      selfCheckExample: {
        prompt: "How many moles of AgCl form when excess AgNO₃ is added to 1 mol of [Co(NH₃)₄Cl₂]Cl?",
        steps: [
          "One chloride outside the bracket.",
        ],
        answer: "1",
      },
      practiceSet: [
        { prompt: "Moles of AgCl from 1 mol pentaamminecarbonatocobalt(III) chloride with excess AgNO₃?", answer: "1" },
        { prompt: "A complex gives 2 mol AgCl per mole. How many ionisable Cl⁻ does it have?", answer: "2" },
        { prompt: "Number of ions from [Co(NH₃)₆]Cl₃ in water?", answer: "4" },
      ],
      pyqExampleId: "b5227809-485b-48b1-9625-4d1befcd8c84",
      traps: [
        {
          title: "Counting every chlorine in the formula",
          body:
            "[Co(NH₃)₅Cl]Cl₂ has three chlorines but gives only 2 AgCl — the chloro ligand inside the bracket is held by the metal and never meets the Ag⁺.",
        },
      ],
    },

    // 3 — IUPAC name <-> formula
    {
      kind: "formula" as const,
      slug: "cetcc-iupac-name-and-formula",
      name: "From Name to Formula and Back",
      intuition:
        "A name is built in a fixed order: cation first, then anion; inside the complex, ligands in ALPHABETICAL order (ignoring di-, tri-, tetra-) before the metal; the metal's oxidation state in Roman numerals; and -ate on the metal when the sphere is an anion (cobaltate, ferrate, aluminate, platinate, argentate for Ag, cuprate for Cu). To go from a name to a formula, read off the ligands and the oxidation state, add the charges to get the sphere charge, and put enough counter ions outside to make the salt neutral. Isothiocyanato means the N end binds, so it is written NCS; nitro is N-bound NO₂, nitrito the O-bound ONO.",
      definition:
        "- **Order in the name**: cation before anion. Ligands alphabetically (ammine before aqua before chloro), multiplying prefixes ignored; metal last; oxidation state as (II), (III)… Examples: \\([\\text{Co(H}_2\\text{O)}_2(\\text{NH}_3)_4]\\text{Cl}_3\\) → **tetraamminediaquacobalt(III) chloride**.\n" +
        "- **-ate** for an anionic sphere: \\(\\text{Na}_3[\\text{Co(NO}_2)_6]\\) sodium hexanitrocobaltate(III); \\(\\text{Na}_3[\\text{AlF}_6]\\) sodium hexafluoroaluminate(III); \\(\\text{K}_3[\\text{Al(C}_2\\text{O}_4)_3]\\) potassium trioxalatoaluminate(III); \\(\\text{K}_4[\\text{Fe(CN)}_6]\\) potassium hexacyanoferrate(II).\n" +
        "- **Name → formula**: sphere charge = oxidation state + ligand charges, then counter ions to neutralise. Pentaaquaisothiocyanatoiron(III): +3 + 5(0) + (−1) = **+2** → \\([\\text{Fe(H}_2\\text{O)}_5(\\text{NCS})]^{2+}\\).\n" +
        "- A neutral salt carries no charge on its formula: \\(\\text{K}_3[\\text{Al(C}_2\\text{O}_4)_3]\\) is right; \\(\\text{K}_3[\\ldots]^{2-}\\) is impossible, and potassium never goes inside the bracket.",
      formula: {
        label: "Name to formula",
        latex:
          "q_{\\text{sphere}} = \\text{(Roman numeral)} + \\sum q_{\\text{ligand}};\\quad \\text{counter ions} \\times \\text{their charge} = -q_{\\text{sphere}}",
      },
      authoredExample: {
        prompt: "Write the formula of potassium hexacyanoferrate(III) and name [Pt(NH₃)₄Cl₂]Cl₂.",
        steps: [
          "Fe(III) with six CN⁻: +3 − 6 = −3, so three K⁺ outside: K₃[Fe(CN)₆].",
          "Pt: x + 2(−1) = +2 gives Pt(IV); ligands alphabetically ammine then chloro: tetraamminedichloroplatinum(IV) chloride.",
        ],
        answer: "K₃[Fe(CN)₆]; tetraamminedichloroplatinum(IV) chloride",
      },
      selfCheckExample: {
        prompt: "Which is the formula of sodium hexanitrocobaltate(III): Na₃[Co(NO₂)₆], Na₂[Co(NO₂)₆], Na₃[Co(ONO)₆]?",
        steps: [
          "Co(III) + 6(−1) = −3 needs three Na⁺; nitro is N-bound NO₂, not ONO.",
        ],
        answer: "Na₃[Co(NO₂)₆]",
      },
      practiceSet: [
        { prompt: "Formula of sodium hexafluoroaluminate(III)?", answer: "Na₃[AlF₆]" },
        { prompt: "Formula of potassium trioxalatoaluminate(III)?", answer: "K₃[Al(C₂O₄)₃]" },
        { prompt: "IUPAC name of [Co(H₂O)₂(NH₃)₄]Cl₃?", answer: "Tetraamminediaquacobalt(III) chloride" },
        { prompt: "Charge on the pentaaquaisothiocyanatoiron(III) ion?", answer: "+2" },
      ],
      pyqExampleId: "ed69c92c-b796-4eec-952d-40b6220bf01b",
      traps: [
        {
          title: "Ordering ligands by charge or by prefix",
          body:
            "Ligands go alphabetically by the ligand name alone: tetraammine before diaqua because 'ammine' precedes 'aqua' — the tetra- and di- do not count. Neutral-before-anionic is the formula-writing habit, not the naming rule.",
        },
        {
          title: "Dropping the -ate or the oxidation state",
          body:
            "An anionic sphere always ends in -ate (hexacyanoferrate, not hexacyanoiron), and the oxidation state is the metal's, not the sphere's charge: [Fe(CN)₆]⁴⁻ is ferrate(II), not ferrate(IV).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Complex Types — the sphere charge the name encodes",
      href: "/notes/mht-cet-chemistry/coordination-compounds/cetcc-complex-types",
    },
    {
      label: "Ligands — names, charges and denticity",
      href: "/notes/mht-cet-chemistry/coordination-compounds/cetcc-ligands",
    },
  ],
};
