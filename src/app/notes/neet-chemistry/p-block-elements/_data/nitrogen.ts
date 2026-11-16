import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_PB_NITROGEN_NOTE: SubtopicNote = {
  subtopicName: "Nitrogen Family",
  title: "Nitrogen Family",
  oneLineDefinition:
    "Group 15: why nitrogen behaves differently from phosphorus and the heavier members, the hydrides, oxides and halides of the group with the structure of PCl₅, and nitric acid with the brown ring test and other tests for ions.",
  whyItMatters:
    "Six NEET questions from 2024 to 2026. Two ask what makes nitrogen different from phosphorus and arsenic (Re-NEET 2024 and NEET 2026). One checks the hydrides and pentoxides of the group (2025), one the bond lengths in PCl₅ (Re-NEET 2024), one matches four laboratory tests, among them the brown ring test for nitrate, to the ions they detect (Re-NEET 2024), and one matches four cations to their groups in salt analysis (2025).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchpb-nitrogen-anomaly",
      name: "How nitrogen differs from the rest of group 15",
      intuition:
        "Nitrogen is the smallest and most electronegative member of the group, and it has no d orbitals. Being small, it can overlap its p orbitals side on with another nitrogen and make a triple bond, so the element is the very stable gas N₂. Phosphorus cannot, so it makes single bonds and P₄ molecules instead. But the small size has a cost: in a single N-N bond the lone pairs sit close and repel, so that bond is weak. And with no d orbitals, nitrogen can never form more than four bonds.",
      definition:
        "- **Multiple bonds:** nitrogen forms \\(p\\pi\\)-\\(p\\pi\\) multiple bonds with itself, carbon and oxygen. \\(\\text{N}_2\\) has a triple bond with a bond enthalpy of 941.4 kJ/mol. The heavier members do not form \\(p\\pi\\)-\\(p\\pi\\) bonds; they exist as \\(\\text{P}_4\\), \\(\\text{As}_4\\) and \\(\\text{Sb}_4\\) with single bonds.\n" +
        "- **Single bonds:** the N-N single bond is weaker than the P-P single bond, because the non-bonding electrons on the two small nitrogen atoms repel strongly. So catenation is weaker in nitrogen than in phosphorus.\n" +
        "- **No d orbitals:** nitrogen's covalency is at most 4, and it cannot form \\(d\\pi\\)-\\(p\\pi\\) bonds. Phosphorus can, as in \\(\\text{R}_3\\text{P=O}\\).\n" +
        "- Phosphorus and arsenic also form \\(d\\pi\\)-\\(d\\pi\\) bonds with transition metals when compounds such as \\(\\text{P(C}_2\\text{H}_5)_3\\) and \\(\\text{As(C}_6\\text{H}_5)_3\\) act as ligands.\n" +
        "- Nitrogen has the highest ionisation enthalpy in the group.",
      table: {
        columns: ["Property", "Nitrogen", "Phosphorus and the heavier members"],
        rows: [
          { cells: ["Multiple bonds with itself", "pπ-pπ triple bond in N₂, very strong", "None; single bonds give P₄, As₄ and Sb₄"] },
          { cells: ["Form of the element", "Diatomic gas, N₂", "Polyatomic solids"] },
          { cells: ["d orbitals", "None: covalency at most 4, no dπ-pπ bonds", "Vacant d orbitals: dπ-pπ bonds and dπ-dπ bonds with transition metals"], pyqExampleId: "f890a597-bb5b-40ac-b441-008d12e62cbf", noteAmber: "NEET 2026: the incorrect statement was that nitrogen can form a dπ-pπ bond with oxygen." },
          { cells: ["Single E-E bond", "N-N is weak: lone pairs on small atoms repel", "P-P is stronger, so phosphorus catenates more"] },
        ],
      },
      pyqExampleId: "f890a597-bb5b-40ac-b441-008d12e62cbf",
      selfCheckExample: {
        prompt: "Why is the N-N single bond weaker than the P-P single bond, even though nitrogen atoms are smaller?",
        steps: [
          "The N-N bond is short, so the lone pairs on the two nitrogen atoms are very close to each other.",
          "Their strong repulsion weakens the bond. The larger phosphorus atoms keep their lone pairs further apart.",
        ],
        answer: "Strong repulsion between the non-bonding electrons on the small nitrogen atoms",
      },
      practiceSet: [
        { prompt: "What is the maximum covalency of nitrogen?", answer: "4" },
        { prompt: "Give one compound in which phosphorus forms a dπ-pπ bond.", answer: "\\(\\text{R}_3\\text{P=O}\\) (a phosphine oxide)" },
        { prompt: "In what molecular form does white phosphorus exist?", answer: "\\(\\text{P}_4\\), with single P-P bonds" },
        { prompt: "Which group 15 element has the highest ionisation enthalpy?", answer: "Nitrogen" },
      ],
      traps: [
        {
          title: "Nitrogen's single bond is the weak one",
          body: "Nitrogen's triple bond is very strong, but its single N-N bond is weaker than the P-P bond. Do not carry the strength of N≡N over to N-N.",
        },
        {
          title: "No d orbitals, no dπ bonds",
          body: "Nitrogen has no d orbitals, so it forms neither \\(d\\pi\\)-\\(p\\pi\\) nor \\(d\\pi\\)-\\(d\\pi\\) bonds. Those belong to phosphorus, arsenic and the heavier members.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchpb-group15-compounds",
      name: "Hydrides, oxides and halides of group 15",
      intuition:
        "Every member of the group forms the same kinds of compound: a hydride EH₃, oxides E₂O₃ and E₂O₅, and halides EX₃ and EX₅. Then one rule runs down the group: the atom gets bigger and its bonds weaker. So the hydrides get less stable and less basic, and better at giving up hydrogen. Nitrogen is the exception for the pentahalide, because five bonds need d orbitals.",
      definition:
        "- **Hydrides:** all form \\(\\text{EH}_3\\): \\(\\text{NH}_3\\), \\(\\text{PH}_3\\), arsine \\(\\text{AsH}_3\\), \\(\\text{SbH}_3\\), \\(\\text{BiH}_3\\). Down the group the E-H bond enthalpy falls, so stability falls and reducing power rises. Basic strength falls: \\(\\text{NH}_3 > \\text{PH}_3 > \\text{AsH}_3 > \\text{SbH}_3 \\geq \\text{BiH}_3\\).\n" +
        "- **Oxides:** all five elements form \\(\\text{E}_2\\text{O}_3\\) and \\(\\text{E}_2\\text{O}_5\\), so antimony does form \\(\\text{Sb}_2\\text{O}_5\\). The oxide of the higher oxidation state is the more acidic. Acidic character falls down the group: the \\(\\text{E}_2\\text{O}_3\\) oxides of N and P are acidic, of As and Sb amphoteric, of Bi mainly basic.\n" +
        "- **Halides:** all form \\(\\text{EX}_3\\). Nitrogen forms no pentahalide, because it has no d orbitals.\n" +
        "- **\\(\\text{PCl}_3\\):** pyramidal, P is \\(sp^3\\).\n" +
        "- **\\(\\text{PCl}_5\\):** in the gas and liquid it is trigonal bipyramidal, P is \\(sp^3d\\). Three equatorial P-Cl bonds lie in one plane at 120°; two axial bonds sit above and below it at 90°. The axial bonds are longer, because they feel more repulsion from the equatorial bond pairs. Solid \\(\\text{PCl}_5\\) is ionic, \\([\\text{PCl}_4]^+[\\text{PCl}_6]^-\\).",
      table: {
        columns: ["Compound type", "Who forms it", "Trend or shape"],
        rows: [
          { cells: ["Hydrides EH₃", "All five, NH₃ to BiH₃", "Stability and basic strength fall down the group; reducing power rises"] },
          { cells: ["Oxides E₂O₃ and E₂O₅", "All five", "Higher oxide more acidic; acidity falls down the group"] },
          { cells: ["Trihalides EX₃", "All five", "Pyramidal, sp³, as in PCl₃"] },
          { cells: ["Pentahalides EX₅", "Phosphorus and below, never nitrogen", "Trigonal bipyramidal, sp³d, as in PCl₅; axial bonds longer"], pyqExampleId: "dcda07c8-07b1-4fe2-a7c4-9122e7d215fe", noteAmber: "Re-NEET 2024: the incorrect statement was that all five P-Cl bonds in PCl₅ are equal in length." },
        ],
      },
      pyqExampleId: "dcda07c8-07b1-4fe2-a7c4-9122e7d215fe",
      selfCheckExample: {
        prompt: "Arrange NH₃, PH₃, AsH₃ and SbH₃ in order of decreasing basic strength.",
        steps: [
          "Down the group the central atom grows larger, so its lone pair is spread over a bigger volume and is less available to a proton.",
          "So basic strength falls from nitrogen downwards.",
        ],
        answer: "NH₃ > PH₃ > AsH₃ > SbH₃",
      },
      practiceSet: [
        { prompt: "Which is the more acidic oxide, N₂O₃ or N₂O₅?", answer: "\\(\\text{N}_2\\text{O}_5\\)" },
        { prompt: "Why does nitrogen not form NCl₅?", answer: "It has no d orbitals, so it cannot form five bonds" },
        { prompt: "What is the shape of PCl₃?", answer: "Pyramidal" },
        { prompt: "In what form does solid PCl₅ exist?", answer: "As the ionic solid \\([\\text{PCl}_4]^+[\\text{PCl}_6]^-\\)" },
      ],
      traps: [
        {
          title: "The five P-Cl bonds are not equal",
          body: "In \\(\\text{PCl}_5\\) the two axial bonds are longer than the three equatorial ones, and there are two bond angles, 90° and 120°.",
        },
        {
          title: "Antimony does form a pentoxide",
          body: "Every group 15 element forms both \\(\\text{E}_2\\text{O}_3\\) and \\(\\text{E}_2\\text{O}_5\\). What changes down the group is how acidic the oxides are, not whether they exist.",
        },
        {
          title: "Basic strength falls, reducing power rises",
          body: "\\(\\text{NH}_3\\) is the strongest base of the hydrides but the weakest reducing agent; \\(\\text{BiH}_3\\) is the reverse.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchpb-nitric-acid",
      name: "Nitric acid, the brown ring test and tests for ions",
      intuition:
        "Nitric acid is a strong oxidising agent as well as an acid. When it attacks a metal such as copper, the nitrogen in it (+5) is reduced, and how far it is reduced depends on how concentrated the acid is. Concentrated acid stops at brown NO₂ (+4); dilute acid goes further, to colourless NO (+2). The nitrate ion is also the basis of a lab test: iron(II) and concentrated sulphuric acid turn it into a brown ring.",
      definition:
        "- **Ostwald process:** \\(4\\text{NH}_3 + 5\\text{O}_2 \\rightarrow 4\\text{NO} + 6\\text{H}_2\\text{O}\\) over a Pt/Rh gauze catalyst; NO is oxidised to \\(\\text{NO}_2\\), which dissolves in water to give \\(\\text{HNO}_3\\).\n" +
        "- **Copper:** dilute acid gives NO, concentrated acid gives \\(\\text{NO}_2\\).\n" +
        "- **Zinc:** dilute acid gives \\(\\text{N}_2\\text{O}\\), concentrated acid gives \\(\\text{NO}_2\\).\n" +
        "- Concentrated nitric acid makes chromium and aluminium passive, by forming a thin oxide film on the surface.\n" +
        "- **Brown ring test for nitrate:** add iron(II) sulphate solution to the nitrate solution, then pour concentrated \\(\\text{H}_2\\text{SO}_4\\) slowly down the side of the tube. A brown ring of \\([\\text{Fe(H}_2\\text{O)}_5(\\text{NO})]^{2+}\\) forms where the two layers meet.\n" +
        "- **Other tests for ions:** \\(\\text{NH}_4^+\\) gives a brown precipitate with Nessler's reagent; \\(\\text{Fe}^{3+}\\) gives a blood-red colour with potassium thiocyanate (sulphocyanide); \\(\\text{Al}^{3+}\\) gives the lake test, a blue precipitate of \\(\\text{Al(OH)}_3\\) that has adsorbed blue litmus, floating in a colourless solution.\n" +
        "- **Cation groups in salt analysis:** group zero \\(\\text{NH}_4^+\\); group I \\(\\text{Pb}^{2+}\\); group II \\(\\text{Cu}^{2+}\\), \\(\\text{As}^{3+}\\); group III \\(\\text{Al}^{3+}\\), \\(\\text{Fe}^{3+}\\); group IV \\(\\text{Co}^{2+}\\), \\(\\text{Ni}^{2+}\\), \\(\\text{Mn}^{2+}\\), \\(\\text{Zn}^{2+}\\); group V \\(\\text{Ba}^{2+}\\), \\(\\text{Sr}^{2+}\\), \\(\\text{Ca}^{2+}\\); group VI \\(\\text{Mg}^{2+}\\).",
      formula: {
        label: "Copper with nitric acid",
        latex:
          "3\\text{Cu} + 8\\text{HNO}_3\\,(\\text{dilute}) \\rightarrow 3\\text{Cu(NO}_3)_2 + 2\\text{NO} + 4\\text{H}_2\\text{O} \\qquad \\text{Cu} + 4\\text{HNO}_3\\,(\\text{conc.}) \\rightarrow \\text{Cu(NO}_3)_2 + 2\\text{NO}_2 + 2\\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt:
          "Copper turnings are dropped into concentrated nitric acid. Which gas comes off, and how is it different from the gas given by dilute acid?",
        steps: [
          "\\(\\text{Cu} + 4\\text{HNO}_3 \\rightarrow \\text{Cu(NO}_3)_2 + 2\\text{NO}_2 + 2\\text{H}_2\\text{O}\\).",
          "Check: Cu 1 = 1; H 4 = 4; N 4 = 2 + 2; O 12 = 6 + 4 + 2.",
          "In \\(\\text{NO}_2\\) nitrogen is +4, so it has been reduced by one step from +5. The gas is brown.",
          "With dilute acid the product is NO, with nitrogen at +2: reduced further, and colourless.",
        ],
        answer: "Brown NO₂ (N at +4); dilute acid gives colourless NO (N at +2)",
      },
      selfCheckExample: {
        prompt: "Which gas does zinc give with dilute nitric acid, and what is the oxidation state of nitrogen in it?",
        steps: [
          "\\(4\\text{Zn} + 10\\text{HNO}_3 \\rightarrow 4\\text{Zn(NO}_3)_2 + \\text{N}_2\\text{O} + 5\\text{H}_2\\text{O}\\).",
          "In \\(\\text{N}_2\\text{O}\\): \\(2x - 2 = 0\\), so \\(x = +1\\).",
        ],
        answer: "Nitrous oxide, N₂O, with nitrogen at +1",
      },
      practiceSet: [
        { prompt: "Name the catalyst used to oxidise ammonia in the Ostwald process.", answer: "A platinum-rhodium (Pt/Rh) gauze" },
        { prompt: "Which two metals are made passive by concentrated nitric acid?", answer: "Chromium and aluminium" },
        { prompt: "What is the oxidation state of nitrogen in NO₂?", answer: "+4" },
        { prompt: "Which complex ion forms the brown ring in the brown ring test?", answer: "\\([\\text{Fe(H}_2\\text{O)}_5(\\text{NO})]^{2+}\\)" },
      ],
      pyqExampleId: "ed92f2c0-04f8-40b5-b5e5-9714f3655ba3",
      traps: [
        {
          title: "Dilute and concentrated acid give different gases",
          body: "Copper with dilute nitric acid gives NO; with concentrated acid it gives \\(\\text{NO}_2\\). The dilute acid takes nitrogen further down, from +5 to +2.",
        },
        {
          title: "The brown ring is an iron complex",
          body: "The brown colour is \\([\\text{Fe(H}_2\\text{O)}_5(\\text{NO})]^{2+}\\), formed where the acid layer meets the solution. The test detects nitrate, \\(\\text{NO}_3^-\\).",
        },
        {
          title: "Match each test to its own ion",
          body: "Nessler's reagent detects \\(\\text{NH}_4^+\\), thiocyanate detects \\(\\text{Fe}^{3+}\\), and the lake test detects \\(\\text{Al}^{3+}\\).",
        },
      ],
    },
  ],
};
