import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/jee-mains-chemistry/d-and-f-block-elements";

export const CONFIG_DFB_NOTE: SubtopicNote = {
  subtopicName: "Electronic Configuration and General Properties",
  title: "Electronic Configuration and General Properties",
  oneLineDefinition:
    "The d-block fills the (n−1)d subshell after ns, its ions lose the ns electrons first, and the half-filled and filled d shells explain the odd configurations, the kinks in ionisation enthalpy and the soft, low-melting zinc group.",
  whyItMatters:
    "Twenty-four PYQs, twenty-one of them multiple choice, and six from 2026. Seven write a configuration for an atom or an ion, including the 4d exceptions; seven compare ionisation enthalpies across chromium, manganese and iron; ten test melting points, atomisation enthalpy, density, catalysts and interstitial compounds. Everything on the page starts from one skill: counting d electrons correctly.",
  concepts: [
    // C1 — configurations of atoms and ions
    {
      kind: "formula" as const,
      slug: "jcdfb-configuration",
      name: "Configurations of d-block atoms and ions",
      intuition:
        "The 4s subshell fills before 3d, but once the 3d electrons are in place they sit lower in energy. So an atom is written 3dⁿ4s², and an ion loses its 4s electrons first. Two atoms break the pattern in the 3d series: chromium and copper move one 4s electron into 3d to reach a half-filled 3d⁵ or a filled 3d¹⁰.",
      definition:
        "- **3d atoms**: \\([\\mathrm{Ar}]\\,3d^{n}4s^{2}\\), except \\(\\mathrm{Cr}\\ [\\mathrm{Ar}]\\,3d^{5}4s^{1}\\) and \\(\\mathrm{Cu}\\ [\\mathrm{Ar}]\\,3d^{10}4s^{1}\\).\n" +
        "- **4d exceptions**: \\(\\mathrm{Nb}\\ 4d^{4}5s^{1}\\), \\(\\mathrm{Mo}\\ 4d^{5}5s^{1}\\), \\(\\mathrm{Ru}\\ 4d^{7}5s^{1}\\), \\(\\mathrm{Rh}\\ 4d^{8}5s^{1}\\), \\(\\mathrm{Pd}\\ 4d^{10}5s^{0}\\), \\(\\mathrm{Ag}\\ 4d^{10}5s^{1}\\).\n" +
        "- **5d**: \\(\\mathrm{Pt}\\ [\\mathrm{Xe}]\\,4f^{14}5d^{9}6s^{1}\\), \\(\\mathrm{Au}\\ [\\mathrm{Xe}]\\,4f^{14}5d^{10}6s^{1}\\).\n" +
        "- **Ions**: remove the 4s electrons first, one at a time, then 3d. So \\(\\mathrm{Mn^{+}} = 3d^{5}4s^{1}\\) but \\(\\mathrm{Cr^{+}} = 3d^{5}\\).\n" +
        "- For a 3d ion with charge 2+ or more, the d count is \\(Z - 18 - n\\).\n" +
        "- Unpaired electrons in the atoms: Sc 1, Ti 2, V 3, Cr 6, Mn 5, Fe 4, Co 3, Ni 2, Cu 1, Zn 0.\n" +
        "- A full d subshell (d¹⁰) in the atom: Cu, Zn, Pd, Ag, Cd, Au, Hg.",
      formula: {
        label: "d electrons in a 3d ion",
        latex: "n_d(\\mathrm{M^{n+}}) = Z - 18 - n \\qquad (n \\ge 2)",
      },
      authoredExample: {
        prompt:
          "Write the configurations of \\(\\mathrm{Co^{2+}}\\) (Z = 27) and \\(\\mathrm{Cu^{+}}\\) (Z = 29), and say which has more unpaired electrons.",
        steps: [
          "Co is \\([\\mathrm{Ar}]\\,3d^{7}4s^{2}\\). Remove the two 4s electrons: \\(\\mathrm{Co^{2+}} = [\\mathrm{Ar}]\\,3d^{7}\\). Check: \\(27 - 18 - 2 = 7\\).",
          "In 3d⁷ five electrons go in singly and two pair up, so 3 are unpaired.",
          "Cu is \\([\\mathrm{Ar}]\\,3d^{10}4s^{1}\\). Remove the 4s electron: \\(\\mathrm{Cu^{+}} = [\\mathrm{Ar}]\\,3d^{10}\\), with no unpaired electron.",
        ],
        answer: "\\(\\mathrm{Co^{2+}}\\ [\\mathrm{Ar}]\\,3d^{7}\\) with 3 unpaired; \\(\\mathrm{Cu^{+}}\\ [\\mathrm{Ar}]\\,3d^{10}\\) with none. Co²⁺ has more.",
      },
      selfCheckExample: {
        prompt:
          "How many electrons are in the 4d subshell of molybdenum (Z = 42) and of palladium (Z = 46)?",
        steps: [
          "Mo sits below Cr and copies its half-filled shell: \\([\\mathrm{Kr}]\\,4d^{5}5s^{1}\\), so 5.",
          "Pd fills 4d completely and keeps no 5s electron: \\([\\mathrm{Kr}]\\,4d^{10}\\), so 10.",
        ],
        answer: "Mo has 5 and Pd has 10; together 15.",
      },
      practiceSet: [
        { prompt: "Configuration of Cr (Z = 24)?", answer: "\\([\\mathrm{Ar}]\\,3d^{5}4s^{1}\\)" },
        { prompt: "How many 3d electrons does \\(\\mathrm{Ni^{2+}}\\) (Z = 28) have?", answer: "8" },
        { prompt: "Which +3 ion of the 3d series is \\([\\mathrm{Ar}]\\,3d^{3}\\)?", answer: "\\(\\mathrm{Cr^{3+}}\\)" },
        { prompt: "Configuration of \\(\\mathrm{V^{+}}\\) by the 4s-first rule?", answer: "\\([\\mathrm{Ar}]\\,3d^{3}4s^{1}\\)" },
        { prompt: "Which 4d element has no 5s electron in its atom?", answer: "Palladium, \\(4d^{10}5s^{0}\\)" },
      ],
      pyqExampleId: "dcf14537-938f-4aa9-b123-2cbbce694dff", // 2025 — 4d electrons in Nb and Ru, x + y
      traps: [
        {
          title: "Ions lose 4s before 3d",
          body: "\\(\\mathrm{Fe^{2+}}\\) is \\([\\mathrm{Ar}]\\,3d^{6}\\), not \\([\\mathrm{Ar}]\\,3d^{4}4s^{2}\\). The 4s electrons fill first but leave first too. Writing the ion as the atom minus 3d electrons gives the wrong count of unpaired electrons and the wrong magnetic moment.",
        },
        {
          title: "The 4d series has more exceptions than the 3d",
          body: "In 3d only Cr and Cu take a single s electron. In 4d, Nb, Mo, Ru, Rh and Ag all do, and Pd has none at all. Do not copy the 3d pattern down the group: Nb is \\(4d^{4}5s^{1}\\) although V above it is \\(3d^{3}4s^{2}\\).",
        },
      ],
    },

    // C2 — ionisation enthalpy
    {
      kind: "reference" as const,
      slug: "jcdfb-ionisation",
      name: "Ionisation enthalpies across the 3d series",
      intuition:
        "Ionisation enthalpy rises slowly across the series, because each extra proton is only partly shielded by the new 3d electron. The kinks come from stable shells. Removing an electron is hard when it breaks a 3d⁵ or 3d¹⁰ shell, and easy when it leaves one behind.",
      definition:
        "- **First IE**: Cr (653) is lower than Mn (717). Cr loses its lone 4s electron; Mn must break a paired 4s².\n" +
        "- **Second IE**: Cr is the highest from Sc to Fe (1592), because \\(\\mathrm{Cr^{+}}\\) is 3d⁵. Cu is higher still (1958), because \\(\\mathrm{Cu^{+}}\\) is 3d¹⁰.\n" +
        "- **Third IE**: Mn is very high, because \\(\\mathrm{Mn^{2+}}\\) is 3d⁵. Fe is low, because \\(\\mathrm{Fe^{2+}}\\) (3d⁶) reaches 3d⁵ by losing one electron.\n" +
        "- So Mn²⁺ is hard to oxidise and Fe²⁺ is easy: this is why \\(\\mathrm{Fe^{3+}}\\) is common and \\(\\mathrm{Mn^{3+}}\\) is an oxidant.\n" +
        "- Zinc has the highest first IE of the series (906), because it loses an electron from a filled 4s² above a filled 3d¹⁰.",
      table: {
        columns: ["Metal", "First IE (kJ/mol)", "Second IE (kJ/mol)", "Third IE (kJ/mol)", "What it shows"],
        rows: [
          { cells: ["Sc", "631", "1235", "2389", "Sc³⁺ is d⁰, so +3 is easy and is its only state"] },
          { cells: ["Ti", "656", "1309", "2652", "A steady rise with the nuclear charge"] },
          { cells: ["V", "650", "1414", "2828", "A steady rise with the nuclear charge"] },
          { cells: ["Cr", "653", "1592", "2987", "Low first IE (lone 4s); high second IE (breaks 3d⁵)"], noteAmber: "Highest second IE from Sc to Fe, but its third IE is below Mn's." },
          { cells: ["Mn", "717", "1509", "3248", "High third IE: Mn²⁺ is 3d⁵"] },
          { cells: ["Fe", "762", "1561", "2957", "Low third IE: Fe²⁺ loses one electron to reach 3d⁵"] },
          { cells: ["Co", "758", "1644", "3232", "Rises again after the dip at Fe"] },
          { cells: ["Ni", "736", "1752", "3393", "Rises again after the dip at Fe"] },
          { cells: ["Cu", "745", "1958", "3554", "Highest second IE of the series: Cu⁺ is 3d¹⁰"] },
          { cells: ["Zn", "906", "1734", "3833", "Highest first IE: a filled 4s² over a filled 3d¹⁰"] },
        ],
        caption: "Values rounded to the nearest kJ/mol. The kinks, not the exact numbers, decide the questions.",
      },
      selfCheckExample: {
        prompt:
          "Which has the higher third ionisation enthalpy, iron or manganese? Give the reason in terms of the ions' configurations.",
        steps: [
          "The third electron is removed from the 2+ ion.",
          "\\(\\mathrm{Mn^{2+}}\\) is 3d⁵; taking an electron breaks a half-filled shell.",
          "\\(\\mathrm{Fe^{2+}}\\) is 3d⁶; losing one electron gives the stable 3d⁵ of \\(\\mathrm{Fe^{3+}}\\).",
        ],
        answer: "Manganese (about 3248 against 2957 kJ/mol).",
      },
      practiceSet: [
        { prompt: "Which is lower, the first IE of Cr or of Mn?", answer: "Cr" },
        { prompt: "Among Sc, Ti, V, Cr, Mn and Fe, which has the highest second IE?", answer: "Cr" },
        { prompt: "Which 3d metal has the highest third IE among Cr, Mn and Fe?", answer: "Mn" },
        { prompt: "True or false: the third IE of Fe is higher than that of Mn.", answer: "False" },
        { prompt: "Which 3d metal has the highest first IE?", answer: "Zn" },
      ],
      pyqExampleId: "cd01201d-fd5c-401a-985b-9ed90efbdb16", // 2026 — IE1 Cr < Mn true; IE2 and IE3 of Cr both higher false
      traps: [
        {
          title: "Cr beats Mn on the second IE only",
          body: "Cr's second IE is higher than Mn's, but its third IE is lower. A statement that 'the second and third IEs of Cr are both higher than those of Mn' is false, because \\(\\mathrm{Mn^{2+}}\\) is the 3d⁵ ion at the third step.",
        },
        {
          title: "Cr is not the highest second IE of the whole series",
          body: "Cr has the highest second IE only up to Fe. Copper's second IE (1958) is higher, because it breaks a filled 3d¹⁰. Read which metals the question lists before answering.",
        },
      ],
    },

    // C3 — physical properties, catalysts, interstitial compounds
    {
      kind: "reference" as const,
      slug: "jcdfb-physical",
      name: "Melting points, atomisation, density, catalysts and interstitial compounds",
      intuition:
        "Transition metals are strong, dense and high-melting because both their ns and their unpaired (n−1)d electrons join the metallic bonding. The more unpaired d electrons, the stronger the bonding, so the enthalpy of atomisation peaks near the middle of each series. Manganese and zinc are the weak points: Mn's 3d⁵ holds its electrons back, and Zn's 3d¹⁰ gives none.",
      definition:
        "- **Atomisation enthalpy** peaks at V (515 kJ/mol) and dips at Mn (281). Zn (126) is the lowest, so Zn, Cd and Hg are soft and low-melting.\n" +
        "- **4d and 5d metals** have higher atomisation enthalpies than 3d metals, so they form more metal–metal bonds.\n" +
        "- **Melting points** (°C): Mn 1246 < Fe 1538; Tc 2157 < Ru 2334; but Re 3186 > Os 3033. W (3422) is the highest of all.\n" +
        "- **Density** rises across the series: Zn 7.14 < Cr 7.19 < Fe 7.87 < Co 8.90 < Cu 8.96 g/cm³.\n" +
        "- **Catalysts**: \\(\\mathrm{V_2O_5}\\) (contact process), Fe (Haber process), Ni (hydrogenation), \\(\\mathrm{TiCl_4}\\) with \\(\\mathrm{Al(C_2H_5)_3}\\) (Ziegler–Natta), \\(\\mathrm{PdCl_2}\\) (Wacker process, ethene to ethanal).\n" +
        "- A catalyst surface bonds reactants using BOTH 3d and 4s electrons. This raises their concentration at the surface and WEAKENS their bonds, lowering the activation energy.\n" +
        "- **Interstitial compounds** (TiC, \\(\\mathrm{Mn_4N}\\), \\(\\mathrm{Fe_3H}\\), \\(\\mathrm{TiH_{1.7}}\\)): small atoms trapped in the metal lattice. They are non-stoichiometric, very hard, higher-melting than the metal, still conduct, and are chemically inert.\n" +
        "- **Zn, Cd, Hg**: full d subshell, so they are not typical transition metals. Zn and Cd show only +2; Hg shows +1 (as \\(\\mathrm{Hg_2^{2+}}\\)) and +2. Their compounds are white and diamagnetic.",
      table: {
        columns: ["Metal", "Atomisation enthalpy (kJ/mol)", "Metallic radius (pm)", "Density (g/cm³)", "Point tested"],
        rows: [
          { cells: ["Sc", "326", "164", "2.99", "Largest atom of the series"] },
          { cells: ["Ti", "473", "147", "4.51", "Ti⁴⁺ in TiCl₄ is d⁰: the Ziegler–Natta catalyst is diamagnetic"] },
          { cells: ["V", "515", "135", "6.11", "Highest atomisation enthalpy of the 3d series"] },
          { cells: ["Cr", "397", "129", "7.19", "Smallest radius among Sc, Ti, V, Cr, Mn and Zn"] },
          { cells: ["Mn", "281", "137", "7.21", "A dip: 3d⁵ holds its d electrons out of the bonding"] },
          { cells: ["Fe", "416", "126", "7.87", "Catalyst of the Haber process"] },
          { cells: ["Co", "425", "125", "8.90", "Dense, high-melting"] },
          { cells: ["Ni", "430", "125", "8.91", "Catalyst for hydrogenating oils"] },
          { cells: ["Cu", "339", "128", "8.96", "Densest of the listed 3d metals"] },
          { cells: ["Zn", "126", "137", "7.14", "Lowest atomisation enthalpy: soft, low-melting"], noteAmber: "Zn, Cd and Hg have filled d subshells; they are the soft end of each series." },
        ],
        caption: "The atomisation enthalpy tracks the number of unpaired d electrons that join the metallic bond.",
      },
      selfCheckExample: {
        prompt:
          "Among Ti, V, Cr and Mn, which has the highest enthalpy of atomisation and which the lowest?",
        steps: [
          "The value peaks where the most d electrons join the metallic bonding, in the early-middle of the series.",
          "V is 515 kJ/mol, Ti 473, Cr 397, Mn 281.",
        ],
        answer: "Highest: V. Lowest: Mn.",
      },
      practiceSet: [
        { prompt: "Metal with the lowest enthalpy of atomisation in the 3d series?", answer: "Zn" },
        { prompt: "Catalyst used in the Wacker process?", answer: "\\(\\mathrm{PdCl_2}\\)" },
        { prompt: "Spin-only moment of the titanium halide in the Ziegler–Natta catalyst?", answer: "0 BM (\\(\\mathrm{TiCl_4}\\), Ti⁴⁺ is d⁰)" },
        { prompt: "Are interstitial compounds soft and ionic?", answer: "No: hard, high-melting, metallic in conduction and inert" },
        { prompt: "Which melts higher, Re or Os?", answer: "Re" },
      ],
      pyqExampleId: "6fb6b924-7f3f-48bd-8bfb-f136ea7f1eb9", // 2025 — melting points Mn < Fe, Tc < Ru, Os < Re
      traps: [
        {
          title: "A catalyst weakens bonds and uses 4s electrons too",
          body: "Two false statements recur: that first-row catalysts use only their 3d electrons, and that adsorption strengthens the reactant bonds. The surface bonds through 3d AND 4s electrons, and adsorption weakens the reactant bonds, which is why the activation energy falls.",
        },
        {
          title: "The group-7/group-8 order flips in the 5d series",
          body: "Mn melts below Fe and Tc below Ru, but Re melts above Os. Do not extend the 3d and 4d pattern to the 5d pair.",
        },
      ],
    },
  ],
  related: [
    { label: "Magnetic Moment and Colour — from a d count to a value in BM", href: `${BASE}/jch-dfb-magnetic` },
    { label: "Oxidation States and Electrode Potentials — what the stable shells do in water", href: `${BASE}/jch-dfb-oxstates` },
  ],
};
