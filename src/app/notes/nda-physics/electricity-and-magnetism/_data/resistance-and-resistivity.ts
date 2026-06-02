import type { SubtopicNote } from "@/app/notes/_types";

export const RESISTANCE_AND_RESISTIVITY_NOTE: SubtopicNote = {
  subtopicName: "Resistance and Resistivity",
  title: "Resistance and Resistivity",
  oneLineDefinition:
    "Resistance opposes current and depends on the wire's material AND shape (R = ρL/A); resistivity is the material's intrinsic opposition, independent of size — so stretching or cutting a wire changes R but never ρ.",
  whyItMatters:
    "Six PYQs, and the launch pad for the chapter's hardest networks. The recurring tests are: which quantities affect R (length, area, material, temperature — never the current), the difference between resistance and resistivity, the SI unit Ω·m, and the geometry tricks — stretching a wire (R ∝ L²) and cutting it into equal pieces.",
  concepts: [
    // 1 — resistance and its factors
    {
      kind: "formula" as const,
      slug: "resistance-and-its-factors",
      name: "Resistance and what controls it",
      intuition:
        "A long, thin wire of a poorly conducting material resists current most. Resistance grows with LENGTH (more obstacles to push charge through), falls with cross-section AREA (a wider pipe), and depends on the MATERIAL through its resistivity. It does NOT depend on the current you push through it.",
      definition:
        "**Resistance** \\(R = \\rho L / A\\) measures opposition to current (unit: ohm, Ω). It depends on:\n" +
        "- **Length** \\(L\\) — directly (R ∝ L).\n" +
        "- **Cross-sectional area** \\(A\\) — inversely (R ∝ 1/A).\n" +
        "- **Material** — through the resistivity \\(\\rho\\).\n" +
        "- **Temperature** — for metals, R rises with temperature.\n" +
        "It does **not** depend on the current or voltage (for an ohmic conductor).",
      visualizationSlug: "resistance-wire-geometry",
      formula: {
        label: "Resistance of a uniform wire",
        latex: "R = \\rho\\,\\dfrac{L}{A}",
        symbols: [
          { symbol: "R", meaning: "resistance (Ω)" },
          { symbol: "\\rho", meaning: "resistivity of the material (Ω·m)" },
          { symbol: "L", meaning: "length of the wire (m)" },
          { symbol: "A", meaning: "cross-sectional area (m²)" },
        ],
      },
      authoredExample: {
        prompt:
          "Two wires are made of the same material. Wire B is twice as long as wire A but has the same thickness. How do their resistances compare?",
        steps: [
          "Same material ⟹ same \\(\\rho\\); same thickness ⟹ same \\(A\\).",
          "\\(R = \\rho L/A\\), so R ∝ L when \\(\\rho\\) and \\(A\\) are fixed.",
          "Doubling the length doubles the resistance.",
        ],
        answer: "Wire B has twice the resistance of wire A.",
      },
      selfCheckExample: {
        prompt:
          "A cylindrical resistor's resistance is quoted. Which of these would change it: (i) the current through it, (ii) its length, (iii) its cross-sectional area, (iv) the material? ",
        steps: [
          "R = ρL/A depends on length, area, and material (via ρ).",
          "(ii) length — yes; (iii) area — yes; (iv) material — yes.",
          "(i) current — NO. For an ohmic resistor R is fixed regardless of the current.",
        ],
        answer: "Length, area, and material change R; the current does not.",
      },
      practiceSet: [
        { prompt: "R is directly proportional to which dimension of a wire?", answer: "Its length" },
        { prompt: "Does the current flowing through a resistor change its resistance?", answer: "No (ohmic)" },
        { prompt: "Doubling a wire's cross-sectional area does what to R?", answer: "Halves it", method: "R ∝ 1/A" },
      ],
      pyqExampleId: "1979f9c0-2e56-405f-ab5a-e946dc59c367", // 2017 — current does NOT affect R
      traps: [
        {
          title: "Current does not affect resistance",
          body:
            "R is a property of the conductor (material + geometry), set before any current flows. The trap option 'the current through it' is exactly what does NOT change R for an ohmic resistor.",
        },
      ],
    },

    // 2 — resistivity
    {
      kind: "formula" as const,
      slug: "resistivity",
      name: "Resistivity — the material's own property",
      intuition:
        "Resistivity is the resistance built into the material itself, independent of how you cut or stretch it. Copper has a low resistivity (good conductor); nichrome a high one (good heater). Change the shape all you like — the resistivity stays the same; only the resistance changes.",
      definition:
        "**Resistivity** \\(\\rho\\) is an intrinsic property of the material: it depends on the **material and its temperature**, but NOT on the length, area, or shape of a particular sample. " +
        "Its SI unit is the **ohm-metre (Ω·m)** (from \\(\\rho = RA/L\\)). " +
        "Two wires of the same material at the same temperature have the same \\(\\rho\\) even if their resistances differ wildly.",
      authoredExample: {
        prompt:
          "A copper wire is cut into two unequal pieces. How do the resistivities of the two pieces compare with each other and with the original?",
        steps: [
          "Resistivity is set by the MATERIAL (and temperature), not the size.",
          "Both pieces are still copper at the same temperature.",
          "So both pieces — and the original — have identical resistivity (only their resistances differ).",
        ],
        answer: "All three have the same resistivity; cutting changes resistance, not resistivity.",
      },
      selfCheckExample: {
        prompt:
          "Which of these statements are correct? (1) Both resistance and resistivity depend on the area of cross-section. (2) Both depend on temperature. (3) Resistance is directly proportional to resistivity. (4) Resistivity is directly proportional to length.",
        steps: [
          "(1) Resistance depends on area, but resistivity does NOT → statement 1 is wrong.",
          "(2) Both R and ρ change with temperature → correct.",
          "(3) R = ρL/A ⟹ R ∝ ρ → correct.",
          "(4) ρ is independent of length → statement 4 is wrong.",
        ],
        answer: "Statements 2 and 3 are correct.",
      },
      practiceSet: [
        { prompt: "SI unit of resistivity?", answer: "Ω·m (ohm-metre)" },
        { prompt: "If a wire's length is doubled, its resistivity becomes…", answer: "The same", method: "ρ is intrinsic to the material" },
        { prompt: "Resistivity depends on which two things?", answer: "Material and temperature" },
      ],
      pyqExampleId: "25f7b342-3a89-4bf0-bb03-403b35522a72", // 2025 — length doubled ⟹ resistivity same
      traps: [
        {
          title: "Stretching changes R, not ρ",
          body:
            "A wire stretched longer has more resistance, but its resistivity is unchanged — same material, same temperature. The distractors 'doubled/halved' tempt you to treat ρ like R. ρ is intrinsic; it doesn't care about shape.",
        },
      ],
    },

    // 3 — stretching & cutting
    {
      kind: "formula" as const,
      slug: "stretching-and-cutting-wires",
      name: "Stretching and cutting a wire",
      intuition:
        "When you stretch a wire its volume stays the same: it gets longer AND thinner together. Length up by a factor k means area down by k, so R = ρL/A jumps by k². Cutting a wire into n equal pieces gives each piece 1/n of the original resistance.",
      definition:
        "**Stretching** (volume \\(V = LA\\) constant): if length becomes \\(k\\) times, area becomes \\(1/k\\) times, so\n" +
        "**resistance scales as \\(k^2\\)** — \\(R \\propto L^2\\) (equivalently \\(R \\propto 1/A^2\\)). Doubling the length quadruples R.\n" +
        "**Cutting** into \\(n\\) equal pieces: each piece has length \\(L/n\\), same area, so each has resistance \\(R/n\\).",
      formula: {
        label: "Stretched wire (constant volume)",
        latex: "R' = k^2 R \\quad\\text{when length}\\to kL,\\ \\text{area}\\to A/k",
        symbols: [
          { symbol: "k", meaning: "factor by which the length increases" },
          { symbol: "R'", meaning: "new resistance after stretching" },
          { symbol: "R", meaning: "original resistance" },
        ],
      },
      authoredExample: {
        prompt:
          "A wire of resistance 5 Ω is stretched until it is three times its original length (volume constant). What is its new resistance?",
        steps: [
          "Stretching keeps volume constant: length ×3 ⟹ area ×1/3.",
          "\\(R \\propto L^2\\), so new R = \\(3^2 \\times 5 = 9 \\times 5\\).",
          "New R = 45 Ω.",
        ],
        answer: "45 Ω.",
      },
      selfCheckExample: {
        prompt:
          "A 10 Ω wire is stretched to double its length. If it then stays in the same circuit at the same voltage, what happens to the current through it?",
        steps: [
          "Stretching to double length: R ∝ L², so R becomes \\(2^2 = 4\\) times → 40 Ω.",
          "At the same voltage, \\(I = V/R\\), so current scales as 1/R.",
          "R went up ×4, so current drops to 1/4 of its original value.",
        ],
        answer: "The current falls to one-quarter of its original value.",
      },
      practiceSet: [
        { prompt: "A wire stretched to double its length has its resistance multiplied by…", answer: "4", method: "R ∝ L² at constant volume" },
        { prompt: "A 50 Ω wire cut into 5 equal pieces — resistance of each piece?", answer: "10 Ω", method: "each piece is L/5, so R/5" },
        { prompt: "Stretching a wire to 3× its length multiplies R by…", answer: "9" },
      ],
      pyqExampleId: "2a3d5fc1-80e5-4f8b-9cb3-7b9926ae6964", // 2023 — stretch to double ⟹ current 1/4
      traps: [
        {
          title: "Stretching is R ∝ L², not R ∝ L",
          body:
            "Forgetting that the wire also gets THINNER is the classic error. Volume is fixed, so doubling length halves area, and R = ρL/A picks up BOTH factors: ×2 from length and ×2 from area = ×4 overall. Use R ∝ L².",
        },
      ],
    },
  ],
};
