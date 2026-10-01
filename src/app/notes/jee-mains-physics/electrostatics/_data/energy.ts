import type { SubtopicNote } from "@/app/notes/_types";

export const ENERGY_ES_NOTE: SubtopicNote = {
  subtopicName: "Energy Stored and Charge Sharing in Capacitors",
  title: "Energy Stored and Charge Sharing in Capacitors",
  oneLineDefinition:
    "A capacitor stores ½CV² = Q²/2C; first ask what stays fixed, V while the battery is connected or Q once it is removed, and when two capacitors share charge, the charge is kept but some energy is lost.",
  whyItMatters:
    "Twenty-three PYQs, twelve of them multiple choice and eleven asking for a number, and two from 2026. Eight find the stored energy and how it changes when a slab goes in, with the battery connected or removed. Fifteen join a charged capacitor to another one and ask for the common potential, the charge that moves or the energy lost.",
  concepts: [
    // C1 — stored energy and what stays fixed
    {
      kind: "formula" as const,
      slug: "jpes-cap-energy",
      name: "Stored energy: battery connected or removed",
      intuition:
        "Charging a capacitor is work done against the growing voltage, and it is stored as ½CV². When something changes C, the answer depends on what is held fixed. With the battery connected, V stays the same, so more C means more charge and more energy. With the battery removed, Q is trapped on the plates, so more C means less voltage and less energy.",
      definition:
        "- \\(U = \\tfrac{1}{2}CV^{2} = \\dfrac{Q^{2}}{2C} = \\tfrac{1}{2}QV\\). Energy per unit volume: \\(\\tfrac{1}{2}K\\varepsilon_0E^{2}\\).\n" +
        "- Battery connected (V fixed), slab K fills the gap: C, Q and U all grow K times. Extra charge \\((K - 1)CV\\), extra energy \\(\\tfrac{1}{2}(K - 1)CV^{2}\\). The battery does \\((K - 1)CV^{2}\\) of work, twice the energy gained.\n" +
        "- Battery removed (Q fixed), slab K fills the gap: V, E and U all fall K times. Energy lost \\(\\tfrac{1}{2}CV^{2}\\left(1 - \\dfrac{1}{K}\\right)\\); the field pulls the slab in.\n" +
        "- Plates pulled apart: with V fixed, U falls; with Q fixed, U grows.\n" +
        "- The same supply across a group: \\(\\dfrac{U_{\\text{parallel}}}{U_{\\text{series}}} = \\dfrac{C_{\\text{parallel}}}{C_{\\text{series}}}\\).",
      formula: {
        label: "Stored energy",
        latex: "U = \\tfrac{1}{2}CV^{2} = \\frac{Q^{2}}{2C}, \\qquad V\\ \\text{fixed: } U \\to KU, \\qquad Q\\ \\text{fixed: } U \\to \\frac{U}{K}",
      },
      authoredExample: {
        prompt:
          "A \\(10\\ \\mu\\text{F}\\) capacitor is charged to 300 V and the battery is removed. A slab with K = 4 then fills the gap. Find the new voltage and energy, and the change in energy.",
        steps: [
          "Before: \\(U = \\tfrac{1}{2} \\times 10^{-5} \\times 300^{2} = 0.45\\) J.",
          "Q is fixed and C becomes 4 times larger, so \\(V = \\dfrac{300}{4} = 75\\) V.",
          "\\(U' = \\dfrac{0.45}{4} = 0.1125\\) J, a fall of 0.3375 J.",
        ],
        answer: "75 V; 0.1125 J; the energy falls by 0.3375 J.",
      },
      selfCheckExample: {
        prompt:
          "The charge on a capacitor is increased by 10%. By what percentage does its stored energy increase?",
        steps: [
          "\\(U \\propto Q^{2}\\), so \\(U' = 1.1^{2}U = 1.21U\\).",
        ],
        answer: "21%",
      },
      practiceSet: [
        { prompt: "Energy in a \\(2\\ \\mu\\text{F}\\) capacitor at 50 V?", answer: "2.5 mJ" },
        { prompt: "A capacitor stores U with the battery connected. A slab with K = 3 fills the gap. New energy?", answer: "3U" },
        { prompt: "Two \\(4\\ \\mu\\text{F}\\) capacitors go across one supply, first in parallel, then in series. Ratio of stored energies?", answer: "4 : 1" },
        { prompt: "Energy per unit volume in a field of \\(10^{6}\\) V/m in air?", answer: "About 4.4 J/m³" },
      ],
      pyqExampleId: "a4755bc2-607e-4156-a1da-30e1d115fba1", // 2025: 40 μF at 100 V, K = 2 inserted with supply on, 4 mC and 0.2 J
      traps: [
        {
          title: "Decide what is fixed first",
          body: "Battery connected: V fixed, use ½CV². Battery removed: Q fixed, use Q²/2C. Using the other form gives the change in the wrong direction.",
        },
        {
          title: "The battery supplies twice the gain",
          body: "With V fixed, the battery's work (K − 1)CV² is twice the rise in stored energy. The other half goes into pulling the slab in.",
        },
        {
          title: "Percentages are squared",
          body: "Energy goes as Q² or V². A 10% rise in charge is a 21% rise in energy, not 10%.",
        },
      ],
    },

    // C2 — sharing charge
    {
      kind: "formula" as const,
      slug: "jpes-common-potential",
      name: "Charge sharing and common potential",
      intuition:
        "Join two charged capacitors and charge flows until both are at the same voltage. The total charge cannot change, so the common voltage is the total charge over the total capacitance. Energy, though, is not kept: some is lost as heat and radiation in the connecting wires while the charge flows. The loss is zero only if both were already at the same voltage.",
      definition:
        "- Like plates joined (+ to +): \\(V = \\dfrac{C_1V_1 + C_2V_2}{C_1 + C_2}\\). Unlike plates (+ to −): \\(V = \\dfrac{|C_1V_1 - C_2V_2|}{C_1 + C_2}\\).\n" +
        "- Charge after joining: \\(Q_i = C_iV\\) on each.\n" +
        "- Energy lost: \\(\\Delta U = \\dfrac{C_1C_2}{2(C_1 + C_2)}(V_1 - V_2)^{2}\\) for like plates; use \\((V_1 + V_2)^{2}\\) for unlike plates.\n" +
        "- Identical capacitors, one uncharged: the voltage halves and half the stored energy is lost.\n" +
        "- A slab put into one of two joined capacitors after the battery is removed: the total Q stays, so the new common V is \\(\\dfrac{Q_{\\text{total}}}{KC_1 + C_2}\\).\n" +
        "- Spheres joined by a wire follow the same rule, with \\(C = 4\\pi\\varepsilon_0 R\\).",
      formula: {
        label: "Common potential and energy lost",
        latex: "V = \\frac{C_1V_1 + C_2V_2}{C_1 + C_2}, \\qquad \\Delta U = \\frac{C_1C_2}{2(C_1 + C_2)}(V_1 - V_2)^{2}",
      },
      authoredExample: {
        prompt:
          "A \\(4\\ \\mu\\text{F}\\) capacitor at 100 V is joined, like plates together, to a \\(6\\ \\mu\\text{F}\\) capacitor at 50 V. Find the common voltage, the final charges and the energy lost.",
        steps: [
          "Total charge: \\(400 + 300 = 700\\ \\mu\\text{C}\\) on \\(10\\ \\mu\\text{F}\\), so \\(V = 70\\) V.",
          "Charges: \\(4 \\times 70 = 280\\ \\mu\\text{C}\\) and \\(6 \\times 70 = 420\\ \\mu\\text{C}\\).",
          "\\(\\Delta U = \\dfrac{4 \\times 6}{2 \\times 10} \\times 50^{2}\\ \\mu\\text{J} = 1.2 \\times 2500 = 3000\\ \\mu\\text{J}\\).",
          "Check: before, \\(0.02 + 0.0075 = 0.0275\\) J; after, \\(\\tfrac{1}{2} \\times 10^{-5} \\times 4900 = 0.0245\\) J.",
        ],
        answer: "70 V; \\(280\\ \\mu\\text{C}\\) and \\(420\\ \\mu\\text{C}\\); 3 mJ lost.",
      },
      selfCheckExample: {
        prompt:
          "The same two capacitors (\\(4\\ \\mu\\text{F}\\) at 100 V, \\(6\\ \\mu\\text{F}\\) at 50 V) are instead joined positive plate to negative plate. Common voltage and energy lost?",
        steps: [
          "Net charge: \\(400 - 300 = 100\\ \\mu\\text{C}\\) on \\(10\\ \\mu\\text{F}\\), so \\(V = 10\\) V.",
          "\\(\\Delta U = \\dfrac{4 \\times 6}{2 \\times 10} \\times 150^{2}\\ \\mu\\text{J} = 1.2 \\times 22500\\ \\mu\\text{J} = 0.027\\) J.",
        ],
        answer: "10 V; 0.027 J lost.",
      },
      practiceSet: [
        { prompt: "A \\(3\\ \\mu\\text{F}\\) capacitor at 60 V is joined to an uncharged \\(6\\ \\mu\\text{F}\\). Common voltage?", answer: "20 V" },
        { prompt: "A capacitor storing energy U is joined to an identical uncharged one. Energy lost?", answer: "U/2" },
        { prompt: "Two \\(5\\ \\mu\\text{F}\\) capacitors in parallel are charged to 20 V and the battery removed. A slab with K = 3 then fills one of them. New common voltage?", answer: "10 V" },
        { prompt: "A sphere of radius 3 cm at 400 V is joined by a long wire to an uncharged sphere of radius 1 cm. Common potential?", answer: "300 V" },
      ],
      pyqExampleId: "90c2600c-0ece-4cf3-80e4-9e638b2d5395", // 2024: identical C at V and 2V, like plates joined, loss CV²/4
      traps: [
        {
          title: "Unlike plates subtract",
          body: "Joining positive to negative cancels part of the charge first. Adding C₁V₁ and C₂V₂ here gives a common voltage that is far too high.",
        },
        {
          title: "Charge is kept, energy is not",
          body: "The final energy is always less, unless the two voltages were already equal. Setting the energies equal before and after gives a wrong voltage.",
        },
        {
          title: "Each capacitor's share is CV",
          body: "After joining, each capacitor holds its own C times the common V. The charge splits equally only when the capacitances are equal.",
        },
      ],
    },
  ],
};
