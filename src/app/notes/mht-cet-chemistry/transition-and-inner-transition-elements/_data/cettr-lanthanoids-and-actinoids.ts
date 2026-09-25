import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/transition-and-inner-transition-elements";

export const LANTHANOIDS_AND_ACTINOIDS_NOTE: SubtopicNote = {
  subtopicName: "Inner Transition Elements, Lanthanoids and Actinoids",
  title: "Lanthanoids and Actinoids: Membership, 4f Configurations and the Lanthanoid Contraction",
  oneLineDefinition:
    "The inner transition elements fill the 4f subshell (lanthanoids, La to Lu) or the 5f subshell (actinoids, Ac to Lr); their stable state is +3, the empty, half-filled and filled 4f subshells explain the extra +2 and +4 states, and the steady shrinking of the Ln³⁺ ion from La to Lu — the lanthanoid contraction — makes the hydroxides less basic along the series.",
  whyItMatters:
    "26 PYQs, 2 HARD. Seven ask which element is a lanthanoid, an actinoid or a rare earth, the last lanthanoid, or the one used in fibre amplifiers; seven are 4f configurations — Ce⁴⁺ f⁰, Tb⁴⁺ f⁷, Lu³⁺ with no unpaired electrons, the filled 4f of Yb and Lu, the half-filled 4f of Gd, and La³⁺ with no moment; seven are the lanthanoid contraction — the largest and smallest Ln³⁺, the weakest base, and the two HARD ionisation enthalpies (Yb); five are compounds and properties — Ln(OH)₃ twice, LnC₂, and two 'NOT true' statements. " +
    "Four cards.",
  concepts: [
    // 1 — which element belongs where
    {
      kind: "reference" as const,
      slug: "cettr-f-block-membership",
      name: "Which Element Is a Lanthanoid, Which an Actinoid",
      intuition:
        "Lanthanoids are the fifteen elements from lanthanum (57) to lutetium (71), in period 6; they and the actinoids are the rare earths. Actinoids run from actinium (89) to lawrencium (103), in period 7, and all are radioactive. A question gives four symbols and asks for one kind, so the fastest route is to know the two rows as lists and check which symbol sits in which.",
      definition:
        "- **Lanthanoids (4f, Z 57–71)**: La, Ce, Pr, Nd, Pm, Sm, Eu, Gd, Tb, Dy, Ho, Er, Tm, Yb, **Lu** (the last). Also called rare earth elements.\n" +
        "- **Actinoids (5f, Z 89–103)**: Ac, Th, Pa, U, Np, Pu, Am, **Cm**, Bk, Cf, Es, Fm, Md, **No**, Lr.\n" +
        "- Lookalikes that are NOT f-block: Mo, Co, Hg, Zn, W, Cd (d-block).\n" +
        "- **Erbium** is doped into optical fibres to make fibre amplifiers (erbium-doped fibre amplifiers).",
      table: {
        columns: ["Series", "Z", "Members to recognise"],
        rows: [
          { cells: ["Lanthanoids (4f)", "57–71", "La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu"] },
          { cells: ["Actinoids (5f)", "89–103", "Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr"], noteAmber: "All actinoids are radioactive." },
        ],
        caption: "Tm, Pm, Sm are lanthanoids; Cm, Am, Np are actinoids — the look-alike pairs the options use.",
      },
      selfCheckExample: {
        prompt: "Which is an actinoid: No, Mo, Co, Ce?",
        steps: [
          "Nobelium (102) is in the 5f row; Ce is a lanthanoid, Mo and Co are d-block.",
        ],
        answer: "No",
      },
      practiceSet: [
        { prompt: "Lanthanoid element: Er, Am, Np, Lr?", answer: "Er" },
        { prompt: "Belongs to the actinoids: Cm, Pm, Tm, Sm?", answer: "Cm" },
        { prompt: "Last element of the lanthanoid series?", answer: "Lu" },
        { prompt: "Element doped into fibres for optical amplifiers?", answer: "Er" },
      ],
      pyqExampleId: "f63ed9e4-9b32-488d-852e-be85c04d7de9",
      traps: [
        {
          title: "Matching by the ending of the name",
          body:
            "Promethium, thulium and samarium are lanthanoids; americium, curium and neptunium are actinoids. The names do not sort them — the lists do.",
        },
      ],
    },

    // 2 — 4f configurations
    {
      kind: "formula" as const,
      slug: "cettr-f-configurations",
      name: "4f Configurations and the +2 and +4 States",
      intuition:
        "The stable state is +3. An extra state appears where it reaches an empty (f⁰), half-filled (f⁷) or filled (f¹⁴) 4f subshell. Cerium is 4f¹ 5d¹ 6s²; losing four electrons gives Ce⁴⁺ with f⁰. Terbium is 4f⁹ 6s²; losing four gives Tb⁴⁺ with f⁷. Europium (f⁷) and ytterbium (f¹⁴) show +2 for the same reason. For Ln³⁺, count f electrons as Z − 57: La³⁺ f⁰ and Lu³⁺ f¹⁴ have no unpaired electrons and no magnetic moment, Gd³⁺ f⁷ has seven.",
      definition:
        "- **+4 state**: \\(\\text{Ce}^{4+}\\) **f⁰**; \\(\\text{Tb}^{4+}\\) **f⁷**. **+2 state**: \\(\\text{Eu}^{2+}\\) f⁷, \\(\\text{Yb}^{2+}\\) f¹⁴.\n" +
        "- **Filled 4f**: Yb [Xe]4f¹⁴ 6s² (expected ground state); Lu [Xe]4f¹⁴ 5d¹ 6s² (expected AND observed).\n" +
        "- **Half-filled 4f**: Gd [Xe]4f⁷ 5d¹ 6s² (observed); Eu 4f⁷ 6s².\n" +
        "- **\\(\\text{Ln}^{3+}\\) f electrons** = Z − 57. \\(\\text{La}^{3+}\\) f⁰ and \\(\\text{Lu}^{3+}\\) f¹⁴ → **0** unpaired, no magnetic moment.",
      formula: {
        label: "f electrons in Ln³⁺",
        latex: "n_f(\\text{Ln}^{3+}) = Z - 57;\\quad \\text{unpaired} = \\begin{cases} n_f & n_f \\le 7 \\\\ 14 - n_f & n_f > 7 \\end{cases}",
      },
      authoredExample: {
        prompt: "How many unpaired electrons does Dy³⁺ have (Z = 66)?",
        steps: [
          "n_f = 66 − 57 = 9, more than seven, so 14 − 9 = 5 unpaired.",
        ],
        answer: "5",
      },
      selfCheckExample: {
        prompt: "Which lanthanoid shows +4 with an f⁰ configuration: Eu, Tb, Ce, Lu?",
        steps: [
          "Ce (4f¹ 5d¹ 6s²) loses four electrons to reach [Xe].",
        ],
        answer: "Ce",
      },
      practiceSet: [
        { prompt: "Lanthanoid showing +4 with an f⁷ configuration?", answer: "Tb" },
        { prompt: "Unpaired f electrons in Lu³⁺?", answer: "0" },
        { prompt: "Half-filled 4f in the observed ground state: Gd, Sm, Nd, Ho?", answer: "Gd" },
        { prompt: "No effective magnetic moment in the +3 state: Ce, La, Gd, Eu?", answer: "La" },
      ],
      pyqExampleId: "88e9de74-9e1f-47b2-b432-23b6696b8b9a",
      traps: [
        {
          title: "Expecting f⁷ at +3 for europium",
          body:
            "Eu is already 4f⁷ as an atom, so Eu³⁺ is f⁶; it is Eu²⁺ that keeps the half-filled shell. The f⁷ ion at +3 is Gd³⁺, and the f⁷ ion at +4 is Tb⁴⁺.",
        },
      ],
    },

    // 3 — lanthanoid contraction
    {
      kind: "formula" as const,
      slug: "cettr-lanthanoid-contraction",
      name: "The Lanthanoid Contraction: Size, Basicity and Ionisation Enthalpy",
      intuition:
        "Across the lanthanoids each step adds a proton and a 4f electron, and 4f electrons shield each other poorly. The effective nuclear charge rises, so the Ln³⁺ ion shrinks steadily from La³⁺ (largest) to Lu³⁺ (smallest). A smaller cation holds OH⁻ more tightly and gives it up less, so the hydroxides grow LESS basic: La(OH)₃ is the strongest base and Lu(OH)₃ the weakest. First ionisation enthalpies are low and close together, but a filled 4f¹⁴ subshell stands out: ytterbium has the highest of the options it appears with.",
      definition:
        "- **Ionic radius of \\(\\text{Ln}^{3+}\\)** decreases La → Lu: largest **La³⁺**, smallest **Lu³⁺**.\n" +
        "- **Basicity of \\(\\text{Ln(OH)}_3\\)** decreases La → Lu: weakest base **\\(\\text{Lu(OH)}_3\\)**.\n" +
        "- **First ionisation enthalpy (kJ mol⁻¹)**: Nd 533, Ce 534, La 538, Dy 573, Gd 593, Tm 597, **Yb 603** — Yb (4f¹⁴ 6s²) is highest of these.\n" +
        "- Consequence: 4d and 5d elements of the same group are almost the same size (Zr and Hf).",
      formula: {
        label: "Trends along the lanthanoids",
        latex: "r(\\text{La}^{3+}) > \\ldots > r(\\text{Lu}^{3+});\\quad \\text{La(OH)}_3 > \\ldots > \\text{Lu(OH)}_3\\ \\text{(basicity)}",
      },
      authoredExample: {
        prompt: "Arrange Sm³⁺, La³⁺ and Er³⁺ in decreasing ionic radius, and name the weakest base among their hydroxides.",
        steps: [
          "Radius falls with Z: La (57) > Sm (62) > Er (68).",
          "Smallest cation, least basic hydroxide: Er(OH)₃.",
        ],
        answer: "La³⁺ > Sm³⁺ > Er³⁺; Er(OH)₃",
      },
      selfCheckExample: {
        prompt: "Which element has the smallest ionic size in the +3 state: Lu, La, Dy, Nd?",
        steps: [
          "Lu is the last lanthanoid.",
        ],
        answer: "Lu",
      },
      practiceSet: [
        { prompt: "Largest ionic size in the +3 state: Pr, Sm, La, Yb?", answer: "La" },
        { prompt: "Weakest base: Eu(OH)₃, La(OH)₃, Lu(OH)₃, Gd(OH)₃?", answer: "Lu(OH)₃" },
        { prompt: "Highest first ionisation enthalpy: Tm, Dy, Nd, Yb?", answer: "Yb" },
        { prompt: "Highest first ionisation enthalpy: Ce, La, Gd, Yb?", answer: "Yb" },
      ],
      pyqExampleId: "892cbac5-3573-4179-bf97-5d43cb213cdf",
      traps: [
        {
          title: "Picking Yb as the smallest ion",
          body:
            "Yb is near the end but Lu is after it: when both appear, the smallest Ln³⁺ is Lu³⁺. Yb wins only the ionisation-enthalpy question.",
        },
      ],
    },

    // 4 — compounds and general properties
    {
      kind: "formula" as const,
      slug: "cettr-lanthanoid-compounds-and-properties",
      name: "Lanthanoid Compounds and General Properties",
      intuition:
        "Because the common state is +3, lanthanoid compounds follow the Ln³⁺ formula: the hydroxide is Ln(OH)₃, the oxide Ln₂O₃, the halide LnX₃. Heated with carbon at about 2773 K they give carbides LnC₂. The metals are soft, silvery and good conductors; their compounds are strongly paramagnetic (except f⁰ and f¹⁴); their large ions take coordination numbers above six. Not all are stable nuclei: promethium is radioactive.",
      definition:
        "- **Formulas**: hydroxide **\\(\\text{Ln(OH)}_3\\)**; oxide \\(\\text{Ln}_2\\text{O}_3\\); halide \\(\\text{LnX}_3\\); carbide (with C at high temperature) **\\(\\text{LnC}_2\\)**; with water → \\(\\text{Ln(OH)}_3 + \\text{H}_2\\); with \\(\\text{N}_2\\) → LnN.\n" +
        "- **True**: soft metals; **good** conductors of heat and electricity; coordination number usually greater than six; strongly paramagnetic.\n" +
        "- **NOT true**: 'bad conductors'; 'all are non-radioactive' (promethium, Pm, is radioactive).",
      formula: {
        label: "Common lanthanoid compounds",
        latex: "\\text{Ln}^{3+}:\\ \\text{Ln(OH)}_3,\\ \\text{Ln}_2\\text{O}_3,\\ \\text{LnX}_3;\\quad \\text{Ln} + 2\\text{C} \\xrightarrow{\\Delta} \\text{LnC}_2",
      },
      authoredExample: {
        prompt: "Write the formulas of the oxide and the chloride of gadolinium.",
        steps: [
          "Gd is +3: two Gd³⁺ balance three O²⁻, and one Gd³⁺ balances three Cl⁻.",
        ],
        answer: "Gd₂O₃; GdCl₃",
      },
      selfCheckExample: {
        prompt: "What is the general formula of a lanthanoid hydroxide?",
        steps: [
          "The common state is +3.",
        ],
        answer: "Ln(OH)₃",
      },
      practiceSet: [
        { prompt: "General formula of the compound of Ln with carbon at high temperature?", answer: "LnC₂" },
        { prompt: "NOT true of lanthanoids: bad conductors, soft, CN > 6, strongly paramagnetic?", answer: "Bad conductors" },
        { prompt: "NOT true: good conductors, all non-radioactive, CN > 6, paramagnetic?", answer: "All non-radioactive" },
      ],
      pyqExampleId: "e4dca490-997e-4d4f-890b-d490b28e5341",
      traps: [
        {
          title: "Assuming every lanthanoid is stable",
          body:
            "Promethium (Z = 61) has no stable isotope. 'All lanthanoids are non-radioactive' is the false statement the paper keys.",
        },
      ],
    },
  ],
  related: [
    { label: "Position and Configuration — the d-block series the lanthanoids interrupt", href: `${BASE}/cettr-position-and-configuration` },
    { label: "Colour and Magnetism — the same unpaired-electron count for d ions", href: `${BASE}/cettr-colour-and-magnetism` },
  ],
};
