import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_ES_DIELECTRIC_NOTE: SubtopicNote = {
  subtopicName: "Parallel Plate Capacitor with a Dielectric",
  title: "The Parallel Plate Capacitor, Dielectric Slabs and Displacement Current",
  oneLineDefinition:
    "The capacitance of a parallel plate capacitor with air and with a dielectric slab, what changes when the battery stays connected or is removed, and the displacement current between the plates.",
  whyItMatters:
    "11 questions. Five were set in board papers: explain the parallel plate capacitor and two of its applications (2020), find the capacitance of an air capacitor (2022), find the new capacity when the gap is doubled or a slab is put in (2018), find the capacity once the dielectric is taken out (2020), and calculate a displacement current (2025). The textbook adds slabs that fill part of the gap, layered dielectrics and the effect of keeping the battery connected.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpes-parallel-plate",
      name: "Capacitance of a parallel plate capacitor",
      intuition:
        "Two flat plates close together: the bigger the plates, the more charge they hold; the closer they are, the more the opposite charges hold each other in place and the lower the voltage for the same charge. So capacitance grows with area and falls with separation.",
      definition:
        "**Derivation (textbook labelling):**\n" +
        "- Two plates, each of area A, are a distance d apart. One carries +Q, the other (earthed) −Q. Surface charge density \\(\\sigma = \\dfrac{Q}{A}\\).\n" +
        "- Each plate alone gives a field \\(\\dfrac{\\sigma}{2\\varepsilon_0}\\). Outside the plates the two fields cancel: \\(\\dfrac{\\sigma}{2\\varepsilon_0} - \\dfrac{\\sigma}{2\\varepsilon_0} = 0\\).\n" +
        "- Between the plates they add: \\(E = \\dfrac{\\sigma}{\\varepsilon_0} = \\dfrac{Q}{A\\varepsilon_0}\\), directed from the positive to the negative plate.\n" +
        "- The field is uniform, so \\(V = Ed = \\dfrac{Qd}{A\\varepsilon_0}\\).\n" +
        "- \\(C = \\dfrac{Q}{V} = \\dfrac{A\\varepsilon_0}{d}\\).\n" +
        "- With n parallel plates joined alternately there are (n − 1) capacitors, so \\(C = \\dfrac{(n - 1)A\\varepsilon_0}{d}\\).",
      formula: {
        label: "Parallel plate capacitor",
        latex: "C = \\frac{A\\varepsilon_0}{d}",
      },
      authoredExample: {
        prompt:
          "An air capacitor has plates of area 0.05 m², 2 mm apart. Find its capacitance and the charge on each plate when it is joined to a 100 V supply. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^2/\\text{N m}^2\\))",
        steps: [
          "Given: A = 0.05 m², \\(d = 2 \\times 10^{-3}\\) m, V = 100 V.",
          "Formula: \\(C = \\dfrac{A\\varepsilon_0}{d}\\), Q = CV.",
          "Substitution: \\(C = \\dfrac{8.85 \\times 10^{-12} \\times 0.05}{2 \\times 10^{-3}} = 2.21 \\times 10^{-10}\\) F.",
          "\\(Q = 2.21 \\times 10^{-10} \\times 100 = 2.21 \\times 10^{-8}\\) C.",
        ],
        answer: "C = 2.21 × 10⁻¹⁰ F (221 pF); Q = 2.21 × 10⁻⁸ C",
      },
      selfCheckExample: {
        prompt: "What plate area would an air capacitor need for a capacitance of 1 F, with its plates 1 mm apart? (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) SI units)",
        steps: [
          "\\(A = \\dfrac{Cd}{\\varepsilon_0} = \\dfrac{1 \\times 10^{-3}}{8.85 \\times 10^{-12}}\\).",
          "\\(A = 1.13 \\times 10^{8}\\) m², about 11 km on a side: this is why the farad is called a big unit.",
        ],
        answer: "1.13 × 10⁸ m²",
      },
      practiceSet: [
        { prompt: "The separation of the plates of a parallel plate capacitor is halved. What happens to its capacitance?", answer: "It doubles" },
        { prompt: "Both the plate area and the separation are doubled. What happens to the capacitance?", answer: "It stays the same" },
        { prompt: "Five parallel plates of area A, a distance d apart, are joined alternately. Find the capacitance.", answer: "\\(4A\\varepsilon_0/d\\)" },
      ],
      pyqExampleId: "2002feb0-079a-49e5-a7ef-2960eba59736",
      traps: [
        {
          title: "Leaving the area in cm²",
          body: "1 cm² = \\(10^{-4}\\) m², not \\(10^{-2}\\) m². Converting the area wrongly is the commonest reason a capacitance comes out a hundred times too big.",
        },
        {
          title: "Half the field between the plates",
          body: "Between the plates the two fields add to \\(\\sigma/\\varepsilon_0\\). The value \\(\\sigma/2\\varepsilon_0\\) is the field of ONE plate.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpes-dielectric-slab",
      name: "Effect of a dielectric slab",
      intuition:
        "Put a slab of dielectric between the plates and it polarises: its surfaces gain charges that weaken the field inside it by the factor k. A weaker field means a smaller potential difference for the same charge, so the capacitance goes up. Fill the whole gap and the capacitance rises k times.",
      definition:
        "**Derivation (textbook labelling):**\n" +
        "- Plates of area A are d apart; without a dielectric, \\(C_0 = \\dfrac{A\\varepsilon_0}{d}\\) and the field is \\(E_0 = \\dfrac{\\sigma}{\\varepsilon_0}\\).\n" +
        "- A slab of thickness t (t < d) is put in. Its induced charges set up a field \\(E_p\\) opposite to \\(E_0\\), so inside the slab \\(E = E_0 - E_p = \\dfrac{E_0}{k}\\), where k is the dielectric constant.\n" +
        "- The field \\(E_0\\) acts over the air gap (d − t) and \\(E_0/k\\) over the slab t: \\(V = E_0(d - t) + \\dfrac{E_0}{k}t = \\dfrac{Q}{A\\varepsilon_0}\\left(d - t + \\dfrac{t}{k}\\right)\\).\n" +
        "- \\(C = \\dfrac{Q}{V} = \\dfrac{A\\varepsilon_0}{d - t + \\dfrac{t}{k}}\\).\n" +
        "**Special cases:**\n" +
        "- Slab fills the gap (t = d): \\(C = kC_0\\).\n" +
        "- Slabs of thickness \\(t_1, t_2, \\dots\\) stacked across the gap act in series: \\(C = \\dfrac{A\\varepsilon_0}{t_1/k_1 + t_2/k_2 + \\dots}\\).\n" +
        "- n slabs side by side, each of area A/n and filling the gap, act in parallel: \\(C = \\dfrac{A\\varepsilon_0}{nd}(k_1 + k_2 + \\dots + k_n)\\).\n" +
        "- A metal slab (k infinite): \\(C = \\dfrac{A\\varepsilon_0}{d - t}\\).",
      formula: {
        label: "Capacitor with a dielectric slab",
        latex: "C = \\frac{A\\varepsilon_0}{d - t + \\frac{t}{k}}, \\qquad C = kC_0 \\ (t = d)",
      },
      authoredExample: {
        prompt:
          "An air capacitor with plates 3 mm apart has a capacitance of 12 pF. A slab of dielectric constant 4 and thickness 2 mm is placed between the plates. Find the new capacitance.",
        steps: [
          "Given: \\(C_0 = 12\\) pF, d = 3 mm, t = 2 mm, k = 4.",
          "Formula: \\(C = \\dfrac{A\\varepsilon_0}{d - t + t/k}\\), and \\(C_0 = \\dfrac{A\\varepsilon_0}{d}\\), so \\(C = C_0 \\times \\dfrac{d}{d - t + t/k}\\).",
          "Substitution: \\(d - t + \\dfrac{t}{k} = 3 - 2 + \\dfrac{2}{4} = 1.5\\) mm.",
          "\\(C = 12 \\times \\dfrac{3}{1.5} = 24\\) pF.",
        ],
        answer: "24 pF",
      },
      selfCheckExample: {
        prompt:
          "The gap d of a capacitor of air capacitance \\(C_0\\) is filled with two layers, each d/2 thick, of dielectric constants 2 and 6. Find the new capacitance in terms of \\(C_0\\).",
        steps: [
          "Layers across the gap: \\(C = \\dfrac{A\\varepsilon_0}{\\frac{d/2}{2} + \\frac{d/2}{6}} = \\dfrac{A\\varepsilon_0}{d/4 + d/12} = \\dfrac{A\\varepsilon_0}{d/3}\\).",
          "\\(C = 3C_0\\).",
        ],
        answer: "3C₀",
      },
      practiceSet: [
        { prompt: "Write the dielectric constant k in terms of the field without the dielectric, \\(E_0\\), and the field inside it, E.", answer: "\\(k = E_0/E\\)" },
        { prompt: "A slab of dielectric constant 3 fills half the gap between the plates (t = d/2). Find the new capacitance in terms of \\(C_0\\).", answer: "\\(1.5C_0\\)" },
        { prompt: "Why does a dielectric slab raise the capacitance?", answer: "Its polarisation field weakens the field between the plates, so the same charge gives a smaller potential difference" },
      ],
      pyqExampleId: "76efab5d-c2a3-4ebe-b819-bc92311ea5de",
      traps: [
        {
          title: "Dividing the whole gap by k",
          body: "Only the part of the gap filled by the slab is divided by k: the denominator is \\(d - t + t/k\\), not \\(d/k\\), unless the slab fills the whole gap.",
        },
        {
          title: "Multiplying when the slab comes out",
          body: "Taking a dielectric out DIVIDES the capacitance by k. Putting it in multiplies by k. Check that your answer moves the right way.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpes-battery",
      name: "Battery kept connected or disconnected",
      intuition:
        "Ask one question first: what is held fixed? If the battery stays connected, it holds the voltage fixed and charge flows on or off. If the battery is removed first, the charge is trapped on the plates and the voltage is free to change. Everything else follows from Q = CV.",
      definition:
        "- Battery connected: V is constant. Battery disconnected: Q is constant.\n" +
        "- Use \\(U = \\dfrac{1}{2}CV^2\\) when V is fixed and \\(U = \\dfrac{Q^2}{2C}\\) when Q is fixed.\n" +
        "- The table is for a slab of dielectric constant k slid in to fill the gap. Taking it out reverses every change.",
      table: {
        columns: ["Quantity", "Battery kept connected", "Battery disconnected first"],
        rows: [
          { cells: ["Capacitance C", "Becomes kC₀", "Becomes kC₀"] },
          { cells: ["Charge Q", "Becomes kQ₀ (more charge flows on)", "Stays Q₀"] },
          { cells: ["Potential difference V", "Stays V₀", "Falls to V₀/k"] },
          { cells: ["Field between the plates", "Stays E₀", "Falls to E₀/k"] },
          {
            cells: ["Energy stored U", "Becomes kU₀", "Falls to U₀/k"],
            pyqExampleId: "02062770-2c21-4e20-b83a-9fd7b8c8ea30",
            noteAmber: "The textbook exercise removes the slab after disconnecting: then C falls, V, the field and the energy rise, and Q stays the same.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "A 10 µF air capacitor stays connected to a 100 V supply while a slab of dielectric constant 5 is slid in to fill the gap. Find the new charge and the new energy stored.",
        steps: [
          "C becomes \\(5 \\times 10 = 50\\) µF; V stays 100 V.",
          "\\(Q = CV = 50 \\times 10^{-6} \\times 100 = 5 \\times 10^{-3}\\) C.",
          "\\(U = \\dfrac{1}{2}CV^2 = \\dfrac{1}{2} \\times 50 \\times 10^{-6} \\times 100^2 = 0.25\\) J.",
        ],
        answer: "Q = 5 × 10⁻³ C; U = 0.25 J",
      },
      practiceSet: [
        { prompt: "A charged capacitor is disconnected from its battery. Which quantity can no longer change?", answer: "The charge on its plates" },
        { prompt: "With the battery disconnected, a slab of dielectric constant 4 is slid in to fill the gap. What happens to the potential difference?", answer: "It falls to one quarter" },
      ],
      traps: [
        {
          title: "Keeping the charge fixed with the battery on",
          body: "While the battery is connected the VOLTAGE is fixed, so the charge changes. Only an isolated capacitor keeps its charge.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpes-displacement",
      name: "Displacement current",
      intuition:
        "While a capacitor charges, current flows in the wires, yet no free electrons cross the gap between the plates. What carries the current across the gap? The changing field. As the field grows it shifts the bound charges of the dielectric, and this shifting counts as a current, the displacement current, equal to the current in the wires.",
      definition:
        "- In the wires the conduction current \\(i_c\\) is carried by free electrons. Between the plates there are no free electrons, but the field there grows as the capacitor charges and polarises the dielectric.\n" +
        "- The current due to the bound charges is the **displacement current** \\(i_d\\).\n" +
        "- From \\(q = Ak\\varepsilon_0 E\\): \\(i_c = \\dfrac{dq}{dt} = Ak\\varepsilon_0 \\dfrac{dE}{dt}\\), so the rate of change of field is proportional to the current in the circuit.\n" +
        "- \\(i_d = Ak\\varepsilon_0 \\dfrac{dE}{dt}\\); for air or vacuum (k = 1), \\(i_d = A\\varepsilon_0 \\dfrac{dE}{dt}\\).\n" +
        "- A displacement current exists wherever the electric field changes with time, not only between capacitor plates.",
      formula: {
        label: "Displacement current",
        latex: "i_d = Ak\\varepsilon_0 \\frac{dE}{dt}",
      },
      authoredExample: {
        prompt:
          "The field between the plates of an air capacitor, each of area 10 cm², is changing at \\(5 \\times 10^{12}\\) V m⁻¹ s⁻¹. Find the displacement current. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) SI units)",
        steps: [
          "Given: \\(A = 10 \\times 10^{-4} = 10^{-3}\\) m², k = 1, \\(\\dfrac{dE}{dt} = 5 \\times 10^{12}\\) V m⁻¹ s⁻¹.",
          "Formula: \\(i_d = A\\varepsilon_0 \\dfrac{dE}{dt}\\).",
          "Substitution: \\(i_d = 10^{-3} \\times 8.85 \\times 10^{-12} \\times 5 \\times 10^{12}\\).",
          "\\(i_d = 4.43 \\times 10^{-2}\\) A, about 44 mA.",
        ],
        answer: "4.43 × 10⁻² A (about 44 mA)",
      },
      selfCheckExample: {
        prompt:
          "A capacitor with plates of area \\(2 \\times 10^{-3}\\) m² is filled with a dielectric of constant 5. The field in it changes at \\(10^{10}\\) V m⁻¹ s⁻¹. Find the displacement current.",
        steps: [
          "\\(i_d = Ak\\varepsilon_0 \\dfrac{dE}{dt} = 2 \\times 10^{-3} \\times 5 \\times 8.85 \\times 10^{-12} \\times 10^{10}\\).",
          "\\(i_d = 8.85 \\times 10^{-4}\\) A.",
        ],
        answer: "8.85 × 10⁻⁴ A",
      },
      practiceSet: [
        { prompt: "Is there a displacement current between the plates once the field there stops changing?", answer: "No. It needs a changing field" },
        { prompt: "Which charges are responsible for the displacement current in a dielectric?", answer: "Bound charges" },
        { prompt: "While a capacitor charges, how does the displacement current between its plates compare with the conduction current in the wires?", answer: "They are equal" },
      ],
      pyqExampleId: "d9bc3333-0ded-4e49-8d16-f97fa1ea969d",
      traps: [
        {
          title: "Forgetting k with a dielectric",
          body: "With a dielectric between the plates, \\(i_d = Ak\\varepsilon_0\\,dE/dt\\). Dropping k gives the air value, k times too small.",
        },
        {
          title: "Using the field instead of its rate of change",
          body: "The formula needs \\(dE/dt\\), in V m⁻¹ s⁻¹. If you are given a field set up in a time t, divide by t first.",
        },
      ],
    },
  ],
};
