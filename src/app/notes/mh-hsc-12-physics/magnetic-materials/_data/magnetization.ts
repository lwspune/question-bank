import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MM_MAGNETIZATION_NOTE: SubtopicNote = {
  subtopicName: "Magnetization and Magnetic Intensity",
  title: "Magnetization, Magnetic Intensity and Susceptibility",
  oneLineDefinition:
    "The quantities that describe a material in a magnetic field: magnetization M, magnetic intensity H, susceptibility χ and permeability μ, and the relations B = μ0(H + M) and μr = 1 + χ.",
  whyItMatters:
    "13 questions. Nine were set in board papers, and six of those ask you to define magnetization, most with its unit and dimensions and some with H and χ as well (2018, 2022, 2023, 2024, 2025, 2026). The others ask for the relation between permeability and susceptibility (2026), the rise in field when lithium fills a toroid (2024), a magnet's length from its magnetization (2026) and a Curie's law sum (2026). The textbook adds sums on B, μr, χ and M for a rod and a plate.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmm-magnetization",
      name: "Magnetization: definition, unit and dimensions",
      intuition:
        "Each atom of a material is a tiny magnet. If their moments point every which way, the material as a whole is not a magnet. Magnetization measures how much net magnet you get from each cubic metre: add up all the atomic moments and divide by the volume.",
      definition:
        "- **Magnetization** is the net magnetic dipole moment per unit volume of a material: \\(M = \\dfrac{m_{net}}{V}\\).\n" +
        "- It is a **vector**, along the net dipole moment.\n" +
        "- **SI unit:** \\(\\dfrac{\\text{A m}^2}{\\text{m}^3}\\) = A m⁻¹ (ampere per metre).\n" +
        "- **Dimensions:** \\([L^{-1}A]\\), written in full as \\([M^0L^{-1}T^0A^1]\\).\n" +
        "- For a bar of length l and cross section A: \\(V = Al\\), so \\(m_{net} = M \\times A \\times l\\).",
      formula: {
        label: "Magnetization",
        latex: "M = \\frac{m_{net}}{V}",
        symbols: [
          { symbol: "\\(m_{net}\\)", meaning: "net magnetic dipole moment, in A m²" },
          { symbol: "\\(V\\)", meaning: "volume of the material, in m³" },
        ],
      },
      authoredExample: {
        prompt:
          "An iron rod 5 cm long with a cross section of 1 cm² acquires a net magnetic moment of 2 A m² in a field. Find its magnetization.",
        steps: [
          "Given: \\(l = 5\\) cm \\(= 0.05\\) m, \\(A = 1\\) cm² \\(= 1 \\times 10^{-4}\\) m², \\(m_{net} = 2\\) A m².",
          "Volume: \\(V = Al = 1 \\times 10^{-4} \\times 0.05 = 5 \\times 10^{-6}\\) m³.",
          "Formula: \\(M = \\dfrac{m_{net}}{V} = \\dfrac{2}{5 \\times 10^{-6}}\\).",
          "\\(M = 4 \\times 10^{5}\\) A m⁻¹.",
        ],
        answer: "\\(4 \\times 10^{5}\\) A m⁻¹",
      },
      selfCheckExample: {
        prompt: "A sample of volume \\(2 \\times 10^{-6}\\) m³ has a magnetization of \\(8 \\times 10^{5}\\) A m⁻¹. Find its net magnetic moment.",
        steps: ["\\(m_{net} = MV = 8 \\times 10^{5} \\times 2 \\times 10^{-6}\\).", "\\(m_{net} = 1.6\\) A m²."],
        answer: "1.6 A m²",
      },
      practiceSet: [
        { prompt: "Is magnetization a scalar or a vector?", answer: "A vector" },
        { prompt: "A cube of side 2 cm has a net magnetic moment of 0.4 A m². Find its magnetization.", answer: "\\(5 \\times 10^{4}\\) A m⁻¹" },
        { prompt: "Which other quantity of this chapter is measured in the same unit as magnetization?", answer: "Magnetic intensity H, also in A m⁻¹" },
      ],
      pyqExampleId: "db62cc77-1f04-425b-8764-c3ffcaa32c25",
      traps: [
        {
          title: "Per unit mass instead of per unit volume",
          body: "Magnetization is moment per unit VOLUME. Dividing by mass gives a different quantity with the wrong unit.",
        },
        {
          title: "Unit given as A m²",
          body: "A m² is the unit of magnetic moment. Divide by m³ and the unit of magnetization is A m⁻¹. Write the working, not just the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmm-intensity-susceptibility",
      name: "Magnetic intensity H and magnetic susceptibility χ",
      intuition:
        "Put a rod inside a solenoid. Part of the field inside comes from the current in the winding; the rest comes from the rod itself once it is magnetized. H is the winding's share, set by the current alone. Susceptibility says how strongly a material answers H: how much magnetization you get for each unit of H.",
      definition:
        "- A solenoid with n turns per metre and current I gives \\(B_0 = \\mu_0 nI\\). The magnetized rod adds \\(B_m = \\mu_0 M\\).\n" +
        "- **Magnetic intensity:** \\(H = nI\\). It does not depend on the material inside. Unit A m⁻¹, the same as M.\n" +
        "- Net field in the rod: \\(B = \\mu_0(H + M)\\).\n" +
        "- If H is not too strong, \\(M\\) is proportional to \\(H\\): \\(M = \\chi H\\). The constant \\(\\chi\\) is the **magnetic susceptibility**.\n" +
        "- \\(\\chi\\) is a ratio of two quantities with the same unit, so it has **no unit and no dimensions**.\n" +
        "- \\(\\chi\\) is negative when the atomic moments oppose the field, positive when they align with it. It is large for soft iron (over 1000).",
      formula: {
        label: "H, B and M",
        latex: "H = nI, \\qquad B = \\mu_0(H + M), \\qquad M = \\chi H",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of turns per unit length of the solenoid" },
          { symbol: "\\(\\mu_0\\)", meaning: "permeability of free space, \\(4\\pi \\times 10^{-7}\\) T m A⁻¹" },
          { symbol: "\\(\\chi\\)", meaning: "magnetic susceptibility, a pure number" },
        ],
      },
      authoredExample: {
        prompt:
          "A solenoid of 1000 turns per metre carries a current of 2 A. Its core is a rod of susceptibility 500. Find H, the magnetization of the rod and the field B inside it.",
        steps: [
          "Given: \\(n = 1000\\) per m, \\(I = 2\\) A, \\(\\chi = 500\\).",
          "\\(H = nI = 1000 \\times 2 = 2000\\) A m⁻¹.",
          "\\(M = \\chi H = 500 \\times 2000 = 1 \\times 10^{6}\\) A m⁻¹.",
          "\\(B = \\mu_0(H + M) = 4\\pi \\times 10^{-7} \\times (2000 + 1 \\times 10^{6}) = 4\\pi \\times 10^{-7} \\times 1.002 \\times 10^{6} = 1.26\\) T.",
        ],
        answer: "H = 2000 A m⁻¹, M = \\(1 \\times 10^{6}\\) A m⁻¹, B = 1.26 T",
      },
      selfCheckExample: {
        prompt: "A magnetising field of 3000 A m⁻¹ produces a magnetization of \\(6 \\times 10^{5}\\) A m⁻¹ in a rod. Find the susceptibility of the rod.",
        steps: ["\\(\\chi = \\dfrac{M}{H} = \\dfrac{6 \\times 10^{5}}{3000}\\).", "\\(\\chi = 200\\), with no unit."],
        answer: "200",
      },
      practiceSet: [
        { prompt: "A solenoid of 500 turns per metre carries 4 A. Find the magnetic intensity inside it.", answer: "2000 A m⁻¹" },
        { prompt: "Does the magnetic intensity H inside a solenoid depend on the rod placed in it?", answer: "No. \\(H = nI\\) depends only on the winding and the current" },
        { prompt: "What is the sign of the susceptibility of a material whose atomic moments oppose the applied field?", answer: "Negative" },
        { prompt: "Write the dimensions of magnetic susceptibility.", answer: "It is dimensionless, \\([M^0L^0T^0A^0]\\)" },
      ],
      pyqExampleId: "e13e88ff-4cca-4056-ae4c-b46e84121a9c",
      traps: [
        {
          title: "Giving χ a unit",
          body: "M and H are both in A m⁻¹, so \\(\\chi = M/H\\) is a pure number. Writing a unit for it costs the mark.",
        },
        {
          title: "Dropping H from B = μ0(H + M)",
          body: "Keep both terms. For a weakly magnetic material H is the larger part, and leaving it out gives a field far too small.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmm-permeability",
      name: "Permeability and the relation μr = 1 + χ",
      intuition:
        "Permeability tells you how many field lines a material lets through compared with empty space. A material that helps the field (positive χ) has a relative permeability a little or a lot above 1; one that opposes it has a value just below 1. Filling a coil with a material multiplies its field by μr.",
      definition:
        "Board derivation of the relation (asked 2026):\n" +
        "- \\(B = \\mu_0(H + M)\\) and \\(M = \\chi H\\), so \\(B = \\mu_0(1 + \\chi)H\\).\n" +
        "- Writing \\(B = \\mu H\\): the **permeability** of the material is \\(\\mu = \\mu_0(1 + \\chi)\\), unit T m A⁻¹.\n" +
        "- **Relative permeability:** \\(\\mu_r = \\dfrac{\\mu}{\\mu_0} = 1 + \\chi\\), a pure number.\n" +
        "- Filling a coil with a material: \\(\\dfrac{B - B_0}{B_0} = \\dfrac{\\mu - \\mu_0}{\\mu_0} = \\chi\\), so the **percentage increase** in the field is \\(\\chi \\times 100\\).\n" +
        "- For a superconductor \\(\\chi = -1\\), so \\(\\mu = 0\\): no field lines pass through it.",
      formula: {
        label: "Permeability",
        latex: "B = \\mu H, \\qquad \\mu = \\mu_0(1 + \\chi), \\qquad \\mu_r = \\frac{\\mu}{\\mu_0} = 1 + \\chi",
        symbols: [
          { symbol: "\\(\\mu\\)", meaning: "permeability of the material, in T m A⁻¹" },
          { symbol: "\\(\\mu_r\\)", meaning: "relative permeability, a pure number" },
        ],
      },
      authoredExample: {
        prompt:
          "A magnetising field of 1500 A m⁻¹ produces a magnetic field of 0.6 T in a rod. Find the permeability, the relative permeability and the susceptibility of the rod.",
        steps: [
          "Given: \\(H = 1500\\) A m⁻¹, \\(B = 0.6\\) T, \\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m A⁻¹.",
          "\\(\\mu = \\dfrac{B}{H} = \\dfrac{0.6}{1500} = 4 \\times 10^{-4}\\) T m A⁻¹.",
          "\\(\\mu_r = \\dfrac{\\mu}{\\mu_0} = \\dfrac{4 \\times 10^{-4}}{4\\pi \\times 10^{-7}} = 318.3\\).",
          "\\(\\chi = \\mu_r - 1 = 317.3\\).",
        ],
        answer: "μ = \\(4 \\times 10^{-4}\\) T m A⁻¹, μr ≈ 318, χ ≈ 317",
      },
      selfCheckExample: {
        prompt: "A material has a relative permeability of 1.00002. Find its susceptibility and say whether it is diamagnetic, paramagnetic or ferromagnetic.",
        steps: ["\\(\\chi = \\mu_r - 1 = 0.00002 = 2 \\times 10^{-5}\\).", "Small and positive, so the material is paramagnetic."],
        answer: "\\(\\chi = 2 \\times 10^{-5}\\); paramagnetic",
      },
      practiceSet: [
        { prompt: "A material has susceptibility 999. Find its permeability.", answer: "\\(1000\\mu_0 = 1.26 \\times 10^{-3}\\) T m A⁻¹" },
        { prompt: "What is the relative permeability of a superconductor?", answer: "Zero, since \\(\\chi = -1\\)" },
        { prompt: "What is the SI unit of permeability?", answer: "T m A⁻¹" },
      ],
      pyqExampleId: "1a5a1b48-efcd-44c7-a197-952550eb3ad6",
      traps: [
        {
          title: "Forgetting the factor of 100",
          body: "\\((B - B_0)/B_0 = \\chi\\) is a fraction. The percentage is \\(\\chi \\times 100\\). Writing \\(\\chi\\) itself as the percentage is the commonest slip.",
        },
        {
          title: "Confusing μ with μr",
          body: "\\(\\mu = B/H\\) has the unit T m A⁻¹. \\(\\mu_r = \\mu/\\mu_0\\) is a pure number. Name which one you have found.",
        },
      ],
    },
  ],
};
