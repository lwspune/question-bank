import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/mechanical-properties-of-fluids";

export const SURFACE_TENSION_NOTE: SubtopicNote = {
  subtopicName: "Surface Tension and Surface Energy",
  title: "Surface Tension, Surface Energy, and Drops that Split or Merge",
  oneLineDefinition:
    "Surface tension is the force per unit length along a liquid surface, and equally the energy stored per unit area of surface; so stretching a film or a bubble costs T times the new area (both faces of a film), splitting a drop into many costs energy because the total surface grows, and merging drops releases it.",
  whyItMatters:
    "42 PYQs, 12 HARD — the largest page in the chapter. Nineteen are drops splitting or merging (the work done, the final surface energy, the energy released and even the speed it gives the big drop); ten are work on films and bubbles, including the heated soap solution; six are forces along a line of contact — a coin, a paper disc with a hole, a drop leaving a tube, two plates squeezing a drop; seven are molecular and temperature facts. " +
    "Four cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-fl-contact-line-force",
      name: "Surface Tension as a Force Along a Line",
      intuition:
        "Surface tension T pulls along every line where the liquid surface meets a solid, with force T per metre of line. So count the lengths of contact: a coin's rim is 2πR; a paper disc with a hole has an outer rim 2πR and an inner rim 2πr, pulling together; a drop about to leave a tube hangs on the bore's circumference 2πr. A thin film between two glass plates is different: its curved edge makes a pressure deficit 2T/t across the whole area A, so the plates cling with F = 2TA/t, and with t = V/A that is 2TA²/V.",
      definition:
        "- **Force** = \\(T \\times\\) (length of contact line).\n" +
        "- **Floating coin** of radius R, thickness d, density ρ: \\(2\\pi RT = \\pi R^2 d\\rho g \\Rightarrow R = \\dfrac{2T}{\\rho g d}\\).\n" +
        "- **Disc with a hole**: \\(2\\pi T(R + r)\\) — both rims.\n" +
        "- **Drop leaving a tube** of bore radius r (zero contact angle): weight \\(w = 2\\pi rT\\).\n" +
        "- **Drop squeezed between plates** into a film of area A, thickness \\(t = V/A\\): \\(F = \\dfrac{2TA}{t} = \\dfrac{2TA^2}{V}\\), so \\(T = \\dfrac{FV}{2A^2}\\).\n" +
        "- **Drop floating half immersed** (density ρ in liquid d): weight = upthrust + \\(2\\pi rT\\) gives diameter \\(\\sqrt{\\dfrac{12T}{g(2\\rho - d)}}\\).",
      formula: {
        label: "Film between two plates",
        latex: "F = \\frac{2TA}{t} = \\frac{2TA^2}{V}",
      },
      authoredExample: {
        prompt: "0.02 cm³ of water (T = 0.07 N/m) is squeezed between glass plates into 20 cm². Force to pull them apart?",
        steps: [
          "t = 0.02/20 = 10⁻³ cm = 10⁻⁵ m; A = 2 × 10⁻³ m².",
          "F = 2TA/t = 2 × 0.07 × 2 × 10⁻³ / 10⁻⁵ = 28 N.",
        ],
        answer: "28 N",
      },
      selfCheckExample: {
        prompt: "A steel coin of thickness d and density ρ floats on water of surface tension T. Its radius?",
        steps: ["Rim force 2πRT balances weight πR²dρg."],
        answer: "2T/(ρgd)",
      },
      practiceSet: [
        { prompt: "Force of surface tension on a paper disc of radius R with a hole of radius r?", answer: "2πT(R + r)" },
        { prompt: "Weight of a drop falling from a tube of bore radius r (contact angle 0)?", answer: "2πrT" },
      ],
      pyqExampleId: "2ba39ffc-3cfb-4947-b119-e134049f71ff",
      traps: [
        {
          title: "Counting only the outer rim of a ring",
          body:
            "A disc with a hole touches the liquid along two circles. Both pull: 2πT(R + r), not 2πT(R − r).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-fl-film-bubble-work",
      name: "Work on Films and Soap Bubbles",
      intuition:
        "Surface energy per unit area is T, so work = T × (new surface). A soap film and a soap bubble have TWO surfaces, front and back — double the area. A bubble of radius R therefore holds 8πR²T; growing it from diameter d to D costs 2π(D² − d²)T. Warming the solution lowers T, so a bubble twice as wide needs a little less than four times the work. And since area goes as volume to the 2/3, doubling a bubble's volume multiplies the work by 4^(1/3).",
      definition:
        "- **Film** (two faces): \\(W = 2T\\,\\Delta A\\), where \\(\\Delta A\\) is the growth of ONE face. Two wires of length l moved apart by x: \\(W = 2Tlx\\).\n" +
        "- **Soap bubble** (two faces): \\(W = 8\\pi R^2 T\\); diameter d → D: \\(W = 2\\pi(D^2 - d^2)T\\).\n" +
        "- **Heated solution**: T falls, so radius 2R needs slightly **less** than \\(4W\\).\n" +
        "- **Volume doubled**: \\(W \\propto R^2 \\propto V^{2/3}\\), so \\(W' = 4^{1/3}W\\).",
      formula: {
        label: "Soap bubble",
        latex: "W = 2 \\times 4\\pi R^2\\,T = 8\\pi R^2 T",
      },
      authoredExample: {
        prompt: "A soap film on a frame grows from 4 cm × 4 cm to 6 cm × 6 cm; T = 0.03 N/m. Work done?",
        steps: ["ΔA = 36 − 16 = 20 cm² = 2 × 10⁻³ m².", "W = 2TΔA = 2 × 0.03 × 2 × 10⁻³ = 1.2 × 10⁻⁴ J."],
        answer: "1.2 × 10⁻⁴ J",
      },
      selfCheckExample: {
        prompt: "Work to blow a soap bubble of volume V is W. For volume 2V?",
        steps: ["W ∝ V^(2/3); 2^(2/3) = 4^(1/3)."],
        answer: "4^(1/3) W",
      },
      practiceSet: [
        { prompt: "Work to grow a soap bubble from diameter d to D?", answer: "2π(D² − d²)T" },
        { prompt: "Bubble of radius R at room temperature takes W₁; from heated solution, radius 2R takes W₂. Relation?", answer: "W₂ < 4W₁" },
      ],
      pyqExampleId: "e369f996-8dac-4642-ae35-11ffd27c2524",
      traps: [
        {
          title: "Forgetting the second surface",
          body:
            "A soap film or bubble has two faces. A liquid DROP has one. Using 4πR²T for a bubble halves the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-fl-drops-split-merge",
      name: "Drops that Split or Merge",
      intuition:
        "Volume is conserved, surface is not. Split one drop of radius R into n equal droplets: each has radius R/n^(1/3), and the total surface grows n^(1/3) times. So the work done is 4πR²T(n^(1/3) − 1), and the final surface energy is n^(1/3) times the first — 512 droplets give 8E, 729 give 9E, 1000 give 10E. Run it backwards and n droplets merging release energy E(n − n^(2/3)) where E is one droplet's surface energy. If that released energy all becomes kinetic energy of the big drop, v = √[(6T/ρ)(1/r − 1/R)].",
      definition:
        "- **Radius**: n droplets of radius r make one of \\(R = n^{1/3}r\\) (general: \\(R^3 = R_1^3 + R_2^3 + \\dots\\)).\n" +
        "- **Split** R into n: \\(W = 4\\pi R^2T\\left(n^{1/3} - 1\\right) = 4\\pi TR^2\\left(\\dfrac{R}{r} - 1\\right)\\). n = 8 → \\(4\\pi R^2T\\); 64 → \\(12\\pi R^2T\\); 1000 → \\(36\\pi R^2T\\).\n" +
        "- **Surface energy ratio** (droplets : big) \\(= n^{1/3} : 1\\); final : initial for merging 1000 = 1 : 10; eight mercury drops before : after = 2 : 1.\n" +
        "- **Merge** n droplets each of energy E: released \\(E\\left(n - n^{2/3}\\right)\\).\n" +
        "- **Energy lost = 3E** (E the big drop's): \\(n = \\dfrac{4R^2}{r^2}\\).\n" +
        "- **Speed of the big drop** (all released energy → KE): \\(v = \\sqrt{\\dfrac{6T}{\\rho}\\left(\\dfrac{1}{r} - \\dfrac{1}{R}\\right)}\\).",
      formula: {
        label: "Splitting a drop",
        latex: "W = 4\\pi R^2 T\\left(n^{1/3} - 1\\right), \\qquad \\frac{E_{\\text{droplets}}}{E_{\\text{drop}}} = n^{1/3}",
      },
      authoredExample: {
        prompt: "A drop of radius R splits into 27 equal droplets. Work done, in terms of T and R?",
        steps: ["n^(1/3) = 3: the surface triples.", "W = 4πR²T(3 − 1) = 8πR²T."],
        answer: "8πR²T",
      },
      selfCheckExample: {
        prompt: "A drop of surface energy E is sprayed into 512 equal droplets. Final surface energy?",
        steps: ["512^(1/3) = 8."],
        answer: "8E",
      },
      practiceSet: [
        { prompt: "Work to split a drop of radius R into 64 droplets?", answer: "12πR²T" },
        { prompt: "Ratio of surface energy of n droplets to the big drop they form?", answer: "n^(1/3) : 1" },
        { prompt: "Three mercury drops of radii R₁, R₂, R₃ merge. Radius of the result?", answer: "(R₁³ + R₂³ + R₃³)^(1/3)" },
      ],
      pyqExampleId: "1014a55d-1373-4a9f-928a-9a84a0580704",
      traps: [
        {
          title: "Using n^(2/3) for the total surface",
          body:
            "Each droplet's area scales as n^(−2/3), and there are n of them: n × n^(−2/3) = n^(1/3). The factor n^(2/3) is the surface of the MERGED drop measured in droplet units, which is where E(n − n^(2/3)) comes from.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetp-fl-st-molecular-temperature",
      name: "Surface Molecules, Temperature and Impurities",
      intuition:
        "A molecule on the surface has neighbours on one side only, so it is pulled inward and has MORE potential energy than one inside; bringing molecules to the surface costs energy, which is why the surface tends to shrink. Heating weakens the attraction, so surface tension falls with temperature and vanishes at the critical temperature. A soluble impurity like soap lowers surface tension — easier spraying, smaller contact angle.",
      definition:
        "- Surface molecules have **maximum (larger) potential energy** than molecules inside.\n" +
        "- **Temperature up → surface tension down**; at the critical temperature it is **zero**.\n" +
        "- **Soap or detergent** lowers surface tension, so water sprays more easily; a soluble impurity **decreases** the angle of contact.",
      table: {
        columns: ["Change", "Surface tension", "Angle of contact"],
        rows: [
          { cells: ["Temperature rises", "decreases", "—"] },
          { cells: ["Critical temperature", "zero", "—"] },
          { cells: ["Soap / soluble impurity added", "decreases", "decreases"], noteAmber: "A highly soluble salt can raise T slightly; the paper's answer is 'decreases' for soap and detergents." },
        ],
        caption: "Surface energy per unit area = surface tension.",
      },
      selfCheckExample: {
        prompt: "Why is it easier to spray water with soap added?",
        steps: ["Soap lowers the energy needed per unit of new surface."],
        answer: "Soap decreases the surface tension",
      },
      practiceSet: [
        { prompt: "Surface tension at the critical temperature?", answer: "Zero" },
        { prompt: "Potential energy of a surface molecule compared with one inside?", answer: "Larger" },
        { prompt: "Effect of a soluble impurity on the angle of contact?", answer: "Decreases" },
      ],
      pyqExampleId: "7db7ca5a-e200-4540-9193-3d81c8764ad7",
      traps: [
        {
          title: "Thinking surface molecules have LESS energy",
          body:
            "They have fewer neighbours, so fewer attractive bonds holding them down — their potential energy is higher, not lower.",
        },
      ],
    },
  ],
  related: [
    { label: "Excess Pressure — the same T inside a curved surface", href: `${BASE}/cetp-fl-excess-pressure` },
    { label: "Pressure and Buoyancy", href: `${BASE}/cetp-fl-pressure` },
  ],
};
