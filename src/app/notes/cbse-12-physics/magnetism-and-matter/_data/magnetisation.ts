import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_MM_MAGNETISATION_NOTE: SubtopicNote = {
  subtopicName: "Magnetisation and Magnetic Intensity",
  title: "Magnetisation and Magnetic Intensity",
  oneLineDefinition:
    "The quantities that describe a material in a magnetic field: magnetisation M, magnetic intensity H, magnetic susceptibility χ, relative permeability μᵣ and permeability μ, and how they give the field B inside a filled solenoid.",
  whyItMatters:
    "1 question: the NCERT worked example on a solenoid with a core, which asks for H, M, B and the magnetising current. None of the board questions in this bank sits on this page, but every question on the next page, magnetic properties of materials, is answered with the susceptibility and the relative permeability defined here.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpmm-intensity",
      name: "Magnetisation and magnetic intensity",
      intuition:
        "Fill a solenoid with a material and the field inside changes. Split the field into two parts: H, set by the current in the windings alone, and M, the material's own contribution. H tells you what you put in; M tells you how the material answered.",
      definition:
        "- **Magnetisation** \\(M\\): the net magnetic moment per unit volume, \\(M = \\dfrac{m_{net}}{V}\\). Unit \\(\\text{A m}^{-1}\\).\n" +
        "- Field inside an empty long solenoid of \\(n\\) turns per unit length carrying current \\(I\\): \\(B_0 = \\mu_0 nI\\).\n" +
        "- With a core, \\(B = B_0 + B_m\\), where the core adds \\(B_m = \\mu_0 M\\).\n" +
        "- **Magnetic intensity** \\(H = \\dfrac{B}{\\mu_0} - M\\), unit \\(\\text{A m}^{-1}\\). So \\(B = \\mu_0(H + M)\\).\n" +
        "- In a solenoid \\(H = nI\\): it depends only on the current and the winding, **not on the core**.\n" +
        "- The **magnetising current** \\(I_M\\) is the extra current that would give the same B with no core: \\(B = \\mu_0 n(I + I_M)\\).",
      formula: {
        label: "Magnetisation and magnetic intensity",
        latex: "M = \\frac{m_{net}}{V}, \\qquad H = nI, \\qquad B = \\mu_0(H + M) = \\mu_0\\mu_r H",
      },
      authoredExample: {
        prompt:
          "A long solenoid has 1500 turns per metre and carries a current of 3 A. Its core has relative permeability 250. Find (a) H, (b) M, (c) B inside the core. \\((\\mu_0 = 4\\pi \\times 10^{-7}\\ \\text{T m A}^{-1})\\)",
        steps: [
          "Given: \\(n = 1500\\ \\text{m}^{-1}\\), \\(I = 3\\ \\text{A}\\), \\(\\mu_r = 250\\).",
          "(a) \\(H = nI = 1500 \\times 3 = 4.5 \\times 10^{3}\\ \\text{A m}^{-1}\\). The core does not change H.",
          "(b) \\(\\chi = \\mu_r - 1 = 249\\), so \\(M = \\chi H = 249 \\times 4.5 \\times 10^{3} = 1.12 \\times 10^{6}\\ \\text{A m}^{-1}\\).",
          "(c) \\(B = \\mu_0\\mu_r H = 4\\pi \\times 10^{-7} \\times 250 \\times 4.5 \\times 10^{3} = 1.41\\ \\text{T}\\).",
        ],
        answer: "(a) \\(4.5 \\times 10^{3}\\ \\text{A m}^{-1}\\); (b) \\(1.12 \\times 10^{6}\\ \\text{A m}^{-1}\\); (c) 1.41 T",
      },
      selfCheckExample: {
        prompt:
          "A magnetised iron rod of volume \\(5 \\times 10^{-5}\\ \\text{m}^3\\) has a net magnetic moment of \\(3\\ \\text{A m}^2\\). Find its magnetisation.",
        steps: ["\\(M = \\dfrac{m_{net}}{V} = \\dfrac{3}{5 \\times 10^{-5}}\\).", "\\(M = 6 \\times 10^{4}\\ \\text{A m}^{-1}\\)."],
        answer: "\\(6 \\times 10^{4}\\ \\text{A m}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "What is the SI unit of magnetic intensity H?", answer: "\\(\\text{A m}^{-1}\\)" },
        { prompt: "What is the SI unit of magnetisation M?", answer: "\\(\\text{A m}^{-1}\\), the same as H" },
        { prompt: "A solenoid's empty core is filled with iron at the same current. Does H inside change?", answer: "No. \\(H = nI\\) does not depend on the core" },
        { prompt: "Find B inside an empty long solenoid of 2000 turns per metre carrying 0.5 A.", answer: "\\(1.26 \\times 10^{-3}\\) T" },
      ],
      pyqExampleId: "f9bab09d-bb4f-4316-bb0a-f178ab4332e7",
      traps: [
        {
          title: "Thinking H depends on the core",
          body: "H is set by the current and the winding alone, \\(H = nI\\). The core changes M and B, never H.",
        },
        {
          title: "Using μᵣ where μ₀ belongs",
          body: "\\(B = \\mu_0 n(I + I_M)\\). The relative permeability is a pure number and cannot stand in for \\(\\mu_0\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmm-susceptibility",
      name: "Susceptibility and relative permeability",
      intuition:
        "Susceptibility says how strongly a material magnetises for a given H, and its sign says which way. Relative permeability says how many times the field grows when the material fills the space. The two carry the same information and differ by exactly one.",
      definition:
        "- **Magnetic susceptibility** \\(\\chi\\): \\(M = \\chi H\\). It has no unit.\n" +
        "- \\(\\chi\\) small and positive: **paramagnetic**. \\(\\chi\\) small and negative: **diamagnetic**, with M opposite to H. \\(\\chi\\) large and positive: **ferromagnetic**.\n" +
        "- Then \\(B = \\mu_0(1 + \\chi)H = \\mu_0\\mu_r H = \\mu H\\).\n" +
        "- **Relative permeability** \\(\\mu_r = 1 + \\chi\\), a pure number, the analog of the dielectric constant.\n" +
        "- **Permeability** \\(\\mu = \\mu_0\\mu_r\\), with the same unit as \\(\\mu_0\\) (\\(\\text{T m A}^{-1}\\)).\n" +
        "- Only one of \\(\\chi\\), \\(\\mu_r\\) and \\(\\mu\\) is independent: given one, you can find the other two.",
      formula: {
        label: "Susceptibility and permeability",
        latex: "M = \\chi H, \\qquad \\mu_r = 1 + \\chi, \\qquad \\mu = \\mu_0\\mu_r",
      },
      authoredExample: {
        prompt:
          "A material placed in a magnetic intensity of \\(5000\\ \\text{A m}^{-1}\\) gets a magnetisation of \\(-0.1\\ \\text{A m}^{-1}\\). Find its susceptibility and relative permeability, and name its class.",
        steps: [
          "\\(\\chi = \\dfrac{M}{H} = \\dfrac{-0.1}{5000} = -2 \\times 10^{-5}\\).",
          "\\(\\mu_r = 1 + \\chi = 1 - 0.00002 = 0.99998\\).",
          "\\(\\chi\\) is small and negative (M is opposite to H), so the material is diamagnetic.",
        ],
        answer: "\\(\\chi = -2 \\times 10^{-5}\\), \\(\\mu_r = 0.99998\\); diamagnetic",
      },
      selfCheckExample: {
        prompt:
          "The permeability of a material is \\(4\\pi \\times 10^{-4}\\ \\text{T m A}^{-1}\\). Find its relative permeability and its susceptibility. \\((\\mu_0 = 4\\pi \\times 10^{-7}\\ \\text{T m A}^{-1})\\)",
        steps: ["\\(\\mu_r = \\dfrac{\\mu}{\\mu_0} = \\dfrac{4\\pi \\times 10^{-4}}{4\\pi \\times 10^{-7}} = 1000\\).", "\\(\\chi = \\mu_r - 1 = 999\\)."],
        answer: "\\(\\mu_r = 1000\\), \\(\\chi = 999\\) (a ferromagnetic material)",
      },
      practiceSet: [
        { prompt: "A material has susceptibility \\(3 \\times 10^{-4}\\). Find its relative permeability.", answer: "1.0003" },
        { prompt: "Which of χ, μᵣ and μ has a unit, and what is it?", answer: "μ, in \\(\\text{T m A}^{-1}\\)" },
        { prompt: "What are the susceptibility and the relative permeability of a vacuum?", answer: "\\(\\chi = 0\\), \\(\\mu_r = 1\\)" },
      ],
      traps: [
        {
          title: "Mixing up μᵣ and χ",
          body: "\\(\\mu_r = 1 + \\chi\\). For a weakly magnetic material \\(\\chi\\) is close to zero while \\(\\mu_r\\) is close to one, so swapping them gives a wildly wrong answer.",
        },
        {
          title: "Reading a negative χ as an error",
          body: "A negative susceptibility is a real result: M points opposite to H, and the material is diamagnetic.",
        },
      ],
    },
  ],
};
