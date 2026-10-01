import type { SubtopicNote } from "@/app/notes/_types";

export const SLABS_ES_NOTE: SubtopicNote = {
  subtopicName: "Dielectric Slabs and Partly Filled Capacitors",
  title: "Dielectric Slabs and Partly Filled Capacitors",
  oneLineDefinition:
    "A slab laid across the whole gap acts as capacitors in series, a slab placed side by side acts as capacitors in parallel; a slab of thickness t shortens the effective gap by t(1 − 1/K).",
  whyItMatters:
    "Twenty-five PYQs, eighteen of them multiple choice, and five from 2026. Eighteen put a slab or a metal sheet across the gap, or stack layers of different dielectrics, so the pieces are in series. Seven place dielectrics side by side, or use plates shaped like stairs, so the pieces are in parallel.",
  concepts: [
    // C1 — layers across the gap (series)
    {
      kind: "formula" as const,
      slug: "jpes-slab-series",
      name: "Slabs and layers across the gap",
      intuition:
        "A slab that covers the whole plate area but only part of the gap splits the capacitor into layers stacked one above the other. The same charge crosses every layer, so the layers are in series. Inside the slab the field is K times weaker, so a slab of thickness t acts like an air gap of only t/K. A metal sheet has no field inside at all: it simply removes its thickness from the gap.",
      definition:
        "- Slab of thickness t over the full area: \\(C = \\dfrac{\\varepsilon_0 A}{d - t + t/K}\\). Its position in the gap does not matter.\n" +
        "- Metal sheet (K very large): \\(C = \\dfrac{\\varepsilon_0 A}{d - t}\\).\n" +
        "- Several layers: \\(\\dfrac{1}{C} = \\sum \\dfrac{t_i}{K_i\\varepsilon_0 A}\\).\n" +
        "- To get the old C back after inserting a slab, move the plates apart by \\(t\\left(1 - \\dfrac{1}{K}\\right)\\).\n" +
        "- Field in the air: \\(E_0 = \\dfrac{V}{d - t + t/K}\\); in the slab: \\(E_0/K\\). Each layer's voltage is its field times its thickness.\n" +
        "- Permittivity that changes across the gap: \\(\\dfrac{1}{C} = \\dfrac{1}{A}\\displaystyle\\int_0^{d} \\frac{dx}{\\varepsilon(x)}\\).",
      formula: {
        label: "Slab across the gap",
        latex: "C = \\frac{\\varepsilon_0 A}{d - t + \\dfrac{t}{K}}, \\qquad \\frac{1}{C} = \\sum_i \\frac{t_i}{K_i\\varepsilon_0 A}",
      },
      authoredExample: {
        prompt:
          "An air capacitor with plates 6 mm apart has a capacitance of 12 pF. A slab 4 mm thick with K = 4 is slid in, covering the plates. Find the new capacitance, and the capacitance if a 4 mm metal sheet is used instead.",
        steps: [
          "Effective gap with the slab: \\(6 - 4 + \\dfrac{4}{4} = 3\\) mm, half the old gap, so C doubles to 24 pF.",
          "With the metal sheet: \\(6 - 4 = 2\\) mm, a third of the gap, so C is 36 pF.",
        ],
        answer: "24 pF with the slab; 36 pF with the metal sheet.",
      },
      selfCheckExample: {
        prompt:
          "Half the gap d of a capacitor \\(C_0\\) is filled by a slab of thickness d/2 and K = 3 covering the plates. New capacitance in terms of \\(C_0\\)?",
        steps: [
          "Effective gap: \\(\\dfrac{d}{2} + \\dfrac{d}{2 \\times 3} = \\dfrac{2d}{3}\\).",
          "\\(C = \\dfrac{\\varepsilon_0 A}{2d/3} = 1.5C_0\\).",
        ],
        answer: "\\(1.5C_0\\)",
      },
      practiceSet: [
        { prompt: "A metal sheet of thickness d/3 is placed in a gap d. New capacitance in terms of \\(C_0\\)?", answer: "\\(1.5C_0\\)" },
        { prompt: "Two layers, each d/2 thick, with K = 2 and K = 6, fill the gap. Capacitance in terms of \\(C_0\\)?", answer: "\\(3C_0\\)" },
        { prompt: "A slab 3 mm thick with K = 3 is inserted. How far must the plates be moved apart to restore the old capacitance?", answer: "2 mm" },
        { prompt: "A slab is slid in while the battery stays connected. Does the field in the air part grow or shrink?", answer: "It grows: the same V now acts across a smaller effective gap." },
      ],
      pyqExampleId: "bc5c9a32-e770-4c4b-bb0e-68f6172e39ad", // 2026: 5 mm gap, 2 mm mica sheet, 25% more charge, K = 2
      traps: [
        {
          title: "Across the gap means series",
          body: "A slab covering the whole plate area splits the gap into layers. Add their reciprocals; adding Kε₀A/d terms treats them as side by side.",
        },
        {
          title: "A metal sheet removes its thickness",
          body: "There is no field inside the metal, so the gap simply shrinks by t. Using t/K with some large K only approximates this.",
        },
        {
          title: "Thickness matters, position does not",
          body: "Moving a slab closer to one plate leaves C unchanged. Only its thickness and K enter the formula.",
        },
      ],
    },

    // C2 — side by side (parallel)
    {
      kind: "formula" as const,
      slug: "jpes-slab-parallel",
      name: "Dielectrics side by side and stair plates",
      intuition:
        "When dielectrics sit side by side, each filling the whole gap over part of the plate area, every part has the same voltage across it. The parts are capacitors in parallel, and their capacitances add, each with its own area. Plates shaped like stairs work the same way: each step is a separate strip with its own gap.",
      definition:
        "- Parts side by side, each the full thickness: \\(C = \\dfrac{\\varepsilon_0}{d}\\sum K_iA_i\\).\n" +
        "- Two dielectrics each over half the area: \\(C = \\dfrac{K_1 + K_2}{2}\\,C_0\\).\n" +
        "- Mixed arrangements: split the capacitor into side-by-side columns (in parallel); within each column, the layers are in series.\n" +
        "- Boundary between dielectrics parallel to the plates: series. Boundary perpendicular to the plates: parallel.\n" +
        "- Stair plates: each step is a strip of area \\(A_i\\) at gap \\(d_i\\), and \\(C = \\varepsilon_0\\sum \\dfrac{A_i}{d_i}\\).\n" +
        "- A full-thickness slab pushed a length x into plates of length l and width b: \\(C = \\dfrac{\\varepsilon_0 b}{d}[Kx + (l - x)]\\).",
      formula: {
        label: "Dielectrics side by side",
        latex: "C = \\frac{\\varepsilon_0}{d}\\sum_i K_iA_i",
      },
      authoredExample: {
        prompt:
          "Square plates of side 10 cm are 2 mm apart. The left half of the gap is filled, full thickness, with a dielectric of K = 3; the right half is air. Find C and the energy stored at 10 V. (Answer in terms of \\(\\varepsilon_0\\).)",
        steps: [
          "Each half has area \\(5 \\times 10^{-3}\\ \\text{m}^{2}\\).",
          "\\(C = \\dfrac{\\varepsilon_0}{2 \\times 10^{-3}}(3 \\times 5 \\times 10^{-3} + 5 \\times 10^{-3}) = \\dfrac{\\varepsilon_0 \\times 0.02}{0.002} = 10\\varepsilon_0\\).",
          "\\(U = \\tfrac{1}{2}CV^{2} = \\tfrac{1}{2} \\times 10\\varepsilon_0 \\times 100 = 500\\varepsilon_0\\) J.",
        ],
        answer: "\\(C = 10\\varepsilon_0\\) F; \\(U = 500\\varepsilon_0\\) J.",
      },
      selfCheckExample: {
        prompt:
          "A capacitor \\(C_0\\) (area A, gap d): the left half of the area is filled with K = 2 for the full gap. The right half has two layers, each d/2 thick, with K = 2 and K = 6. Find C.",
        steps: [
          "Left column: \\(\\dfrac{2\\varepsilon_0(A/2)}{d} = C_0\\).",
          "Right column: the layers give \\(\\dfrac{2\\varepsilon_0(A/2)}{d/2} = 2C_0\\) and \\(6C_0\\), in series: \\(\\dfrac{2 \\times 6}{8}C_0 = 1.5C_0\\).",
          "The columns are in parallel: \\(C_0 + 1.5C_0\\).",
        ],
        answer: "\\(2.5C_0\\)",
      },
      practiceSet: [
        { prompt: "Half the plate area has K = 4 for the full gap; the other half is air. C in terms of \\(C_0\\)?", answer: "\\(2.5C_0\\)" },
        { prompt: "A stair plate has two steps, each of area A/2, at gaps d and 2d from a flat plate. C in terms of \\(\\varepsilon_0 A/d\\)?", answer: "\\(0.75\\,\\varepsilon_0 A/d\\)" },
        { prompt: "A full-thickness slab with K = 5 is pushed a quarter of the way in. C in terms of \\(C_0\\)?", answer: "\\(2C_0\\)" },
        { prompt: "Two dielectrics K₁ and K₂ sit side by side, each over half the area. Equivalent dielectric constant?", answer: "\\((K_1 + K_2)/2\\)" },
      ],
      pyqExampleId: "107672f5-ebc3-4c8c-bc8f-738aceaf31be", // 2022: 4 cm × 8 cm plates, 4 mm gap, 20 V, slab K = 5 over 1 cm, U = 240ε₀ J
      traps: [
        {
          title: "Side by side means parallel",
          body: "Dielectrics that each span the whole gap share one voltage. Add their capacitances; adding reciprocals treats them as layers.",
        },
        {
          title: "Each part uses its own area",
          body: "A dielectric over half the plates contributes Kε₀(A/2)/d, not Kε₀A/d. Using the full area for every part counts the plates twice.",
        },
        {
          title: "Read the boundary",
          body: "If the surface between two dielectrics is parallel to the plates, they are in series; if it is perpendicular, they are in parallel. Look at the figure before choosing.",
        },
      ],
    },
  ],
};
