import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_EP_CAPACITANCE_NOTE: SubtopicNote = {
  subtopicName: "Capacitors and Dielectrics",
  title: "Capacitors and Dielectrics",
  oneLineDefinition:
    "Capacitance C = Q/V and what it depends on, the parallel plate capacitor C = ε₀A/d with a battery kept on or taken off, polar and non-polar molecules, and how a dielectric raises capacitance.",
  whyItMatters:
    "Four NEET questions from 2021 to 2025. Two are about what capacitance depends on: the geometry, not the charge or voltage (Re-NEET 2024), and what changes when the plates of a capacitor joined to a battery are moved closer (2024). Two are about dielectrics: what a polar molecule is (2021), and two slabs that double a capacitance (2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphep-capacitance",
      name: "Capacitance and the parallel plate capacitor",
      intuition:
        "A capacitor is two conductors holding equal and opposite charges, +Q and −Q. The more charge you put on, the larger the potential difference between them, in a fixed ratio. That ratio, C = Q/V, is the capacitance. It is set by the shape, size and spacing of the plates and by what fills the gap, never by how much charge happens to be on them.",
      definition:
        "- \\(C = \\dfrac{Q}{V}\\). Unit: farad, 1 F = 1 C/V. Practical sizes are μF and pF.\n" +
        "- Parallel plates of area A, gap d, vacuum between: \\(C = \\dfrac{\\varepsilon_0 A}{d}\\), with \\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{F/m}\\).\n" +
        "- Field between the plates: \\(E = \\dfrac{\\sigma}{\\varepsilon_0} = \\dfrac{Q}{\\varepsilon_0 A}\\), uniform, and \\(V = Ed\\).\n" +
        "- **Battery kept on:** V stays fixed. Change C and the charge changes, \\(Q = CV\\).\n" +
        "- **Battery taken off:** Q stays fixed. Change C and the voltage changes, \\(V = \\dfrac{Q}{C}\\).",
      formula: {
        label: "Parallel plate capacitor",
        latex: "C = \\frac{Q}{V}, \\qquad C = \\frac{\\varepsilon_0 A}{d}, \\qquad E = \\frac{\\sigma}{\\varepsilon_0}",
        symbols: [
          { symbol: "\\(A\\)", meaning: "area of each plate" },
          { symbol: "\\(d\\)", meaning: "gap between the plates" },
          { symbol: "\\(\\sigma\\)", meaning: "charge per unit area on a plate" },
        ],
      },
      authoredExample: {
        prompt:
          "Two plates, each of area 0.02 m², are 1 mm apart in air. Find the capacitance, and the charge it takes from a 100 V battery. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) F/m)",
        steps: [
          "\\(C = \\dfrac{8.85 \\times 10^{-12} \\times 0.02}{10^{-3}} = 1.77 \\times 10^{-10}\\) F = 177 pF.",
          "\\(Q = CV = 1.77 \\times 10^{-10} \\times 100 = 1.77 \\times 10^{-8}\\) C.",
        ],
        answer: "177 pF and \\(1.77 \\times 10^{-8}\\) C",
      },
      selfCheckExample: {
        prompt:
          "A capacitor is charged by a battery and the battery is then removed. The gap between its plates is now doubled. What happens to C, Q and V?",
        steps: [
          "\\(C \\propto \\dfrac{1}{d}\\), so C halves.",
          "With the battery gone the charge has nowhere to go: Q stays the same.",
          "\\(V = \\dfrac{Q}{C}\\), so V doubles.",
        ],
        answer: "C halves, Q is unchanged, V doubles",
      },
      practiceSet: [
        { prompt: "What is the SI unit of capacitance?", answer: "The farad, 1 F = 1 C/V" },
        { prompt: "The plate area of a parallel plate capacitor is doubled and its gap halved. By what factor does C change?", answer: "4 times" },
        { prompt: "The charge on a capacitor is doubled. Does its capacitance change?", answer: "No; only its voltage doubles" },
        { prompt: "What is the field between the plates of a parallel plate capacitor in vacuum, in terms of the surface charge density σ?", answer: "\\(\\sigma/\\varepsilon_0\\)" },
      ],
      pyqExampleId: "71314d65-b355-4eee-8da8-f44172e35a49",
      traps: [
        {
          title: "C does not depend on Q or V",
          body: "Capacitance depends on the plates, their gap and the medium. Doubling Q doubles V and leaves C the same.",
        },
        {
          title: "Ask first what stays fixed",
          body: "With the battery joined, V is fixed and Q follows C. With the battery removed, Q is fixed and V follows C. Mixing these up reverses the answer.",
        },
        {
          title: "Closer plates, larger capacitance",
          body: "\\(C = \\varepsilon_0 A/d\\), so bringing the plates closer raises C. With a battery joined, the charge and the stored energy both rise too.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphep-dielectric",
      name: "Dielectrics and dielectric constant",
      intuition:
        "A dielectric is an insulator. Put it in a field and its molecules line up a little as dipoles, leaving a thin layer of charge on each face that opposes the field. The field inside drops to E₀/K. Less field means less voltage for the same charge, so the capacitor holds more charge per volt: its capacitance rises.",
      definition:
        "- **Polar molecule:** the centres of positive and negative charge do not coincide, so it has a permanent dipole moment (water, HCl).\n" +
        "- **Non-polar molecule:** the centres coincide, so there is no dipole moment until a field pulls them apart and induces one (O₂, H₂).\n" +
        "- In a field a dielectric is **polarised**. The field inside falls to \\(\\dfrac{E_0}{K}\\), where K is the dielectric constant (K = 1 for vacuum, K > 1 for any dielectric).\n" +
        "- Gap filled completely: \\(C = \\dfrac{K\\varepsilon_0 A}{d} = KC_0\\).\n" +
        "- A slab of thickness t in a gap d: the field in the slab is \\(\\dfrac{E_0}{K}\\), so \\(V = E_0\\left(d - t + \\dfrac{t}{K}\\right)\\) and \\(C = \\dfrac{\\varepsilon_0 A}{d - t + \\dfrac{t}{K}}\\).\n" +
        "- Several layers across the gap: \\(C = \\dfrac{\\varepsilon_0 A}{\\sum \\dfrac{t_i}{K_i}}\\), counting any air layer with K = 1.",
      formula: {
        label: "Capacitor with a dielectric",
        latex: "C = KC_0 \\ \\text{(gap full)}, \\qquad C = \\frac{\\varepsilon_0 A}{d - t + t/K}, \\qquad C = \\frac{\\varepsilon_0 A}{\\sum t_i/K_i}",
        symbols: [
          { symbol: "\\(K\\)", meaning: "dielectric constant of the slab" },
          { symbol: "\\(t\\)", meaning: "thickness of the slab" },
          { symbol: "\\(C_0\\)", meaning: "capacitance with vacuum in the gap" },
        ],
      },
      authoredExample: {
        prompt:
          "The plates of a capacitor are 4 mm apart. A slab of dielectric constant 2 and thickness 2 mm is slid in. By what factor does the capacitance change?",
        steps: [
          "\\(\\dfrac{C}{C_0} = \\dfrac{d}{d - t + t/K}\\).",
          "\\(d - t + \\dfrac{t}{K} = 4 - 2 + \\dfrac{2}{2} = 3\\) mm.",
          "\\(\\dfrac{C}{C_0} = \\dfrac{4}{3}\\).",
        ],
        answer: "It becomes 4/3 times",
      },
      selfCheckExample: {
        prompt:
          "A 5 μF air capacitor stays joined to a 10 V battery while its gap is filled completely with a material of dielectric constant 4. Find the new charge.",
        steps: [
          "Gap full, so \\(C = KC_0 = 4 \\times 5 = 20\\) μF.",
          "Battery joined, so V stays 10 V: \\(Q = 20 \\times 10 = 200\\) μC.",
        ],
        answer: "200 μC",
      },
      practiceSet: [
        { prompt: "Is a water molecule polar or non-polar?", answer: "Polar" },
        { prompt: "The gap of a capacitor is filled completely with a dielectric of K = 3. By what factor does C change?", answer: "It becomes 3 times" },
        { prompt: "What is the dielectric constant of vacuum?", answer: "1" },
        { prompt: "A field \\(E_0\\) acts on a dielectric of constant K. What is the field inside it?", answer: "\\(E_0/K\\)" },
      ],
      pyqExampleId: "15d0282d-8427-4d20-84ec-fa1a9851aa13",
      traps: [
        {
          title: "Polar means a permanent dipole",
          body: "A polar molecule has a dipole moment of its own. A molecule that gets one only while a field acts is non-polar.",
        },
        {
          title: "A thin slab changes only its own thickness",
          body: "For a slab of thickness t, replace t by \\(t/K\\) and keep the rest of the gap as air. Multiplying the whole capacitance by K is right only when the slab fills the gap.",
        },
        {
          title: "Count the air gap that is left",
          body: "When slabs do not fill the gap, the leftover air layer is a term \\(t/1\\) in \\(\\sum t_i/K_i\\). Forgetting it gives too large a capacitance.",
        },
      ],
    },
  ],
};
