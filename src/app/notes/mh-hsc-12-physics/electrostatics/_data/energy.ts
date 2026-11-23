import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_ES_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Energy Stored in a Capacitor",
  title: "Energy Stored in a Capacitor",
  oneLineDefinition:
    "Deriving the energy stored in a charged capacitor, the energy lost when a charged capacitor shares its charge, and the energy stored per unit volume of an electric field.",
  whyItMatters:
    "7 questions. Three were set in board papers: derive the energy stored in a charged capacitor (2024), find the energy when the charge is doubled (2017) and the energy held in a marble cube placed in a field (2017). The textbook adds the energy lost when a charged capacitor is joined to an uncharged one, the energy change when a slab is taken out, and the ratio of stored to wasted energy.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpes-stored-energy",
      name: "Energy stored in a charged capacitor",
      intuition:
        "Charging a capacitor means dragging charge from one plate to the other against a growing opposition: the more charge already moved, the harder the next bit is to move. The work done is stored in the field between the plates and comes back when the capacitor discharges. Because the voltage grows from zero, the average is half the final voltage, which is where the ½ comes from.",
      definition:
        "**Derivation (textbook labelling):**\n" +
        "- A capacitor C is being charged. At some stage it carries charge q′, so the potential difference is \\(V = \\dfrac{q'}{C}\\).\n" +
        "- Moving a further small charge dq takes work \\(dW = V\\,dq = \\dfrac{q'}{C}\\,dq\\).\n" +
        "- Total work to charge it from 0 to Q: \\(W = \\displaystyle\\int_0^Q \\dfrac{q'}{C}\\,dq' = \\dfrac{1}{C}\\left[\\dfrac{q'^2}{2}\\right]_0^Q = \\dfrac{Q^2}{2C}\\).\n" +
        "- This work is stored as electrostatic potential energy: \\(U = \\dfrac{Q^2}{2C} = \\dfrac{1}{2}CV^2 = \\dfrac{1}{2}QV\\), using Q = CV.\n" +
        "- The battery supplies QV, but only \\(\\dfrac{1}{2}QV\\) is stored; the other half is lost as heat in the wires and the battery.",
      formula: {
        label: "Energy stored",
        latex: "U = \\frac{Q^2}{2C} = \\frac{1}{2}CV^2 = \\frac{1}{2}QV",
      },
      authoredExample: {
        prompt:
          "A 20 µF capacitor is charged by a 200 V battery. Find the energy stored in it, the energy supplied by the battery and the energy lost as heat.",
        steps: [
          "Given: \\(C = 20 \\times 10^{-6}\\) F, V = 200 V.",
          "Formula: \\(U = \\dfrac{1}{2}CV^2\\); battery supplies QV with Q = CV.",
          "Substitution: \\(U = \\dfrac{1}{2} \\times 20 \\times 10^{-6} \\times (200)^2 = 0.4\\) J.",
          "\\(Q = 20 \\times 10^{-6} \\times 200 = 4 \\times 10^{-3}\\) C, so the battery supplies \\(QV = 4 \\times 10^{-3} \\times 200 = 0.8\\) J.",
          "Heat lost: 0.8 − 0.4 = 0.4 J.",
        ],
        answer: "Stored 0.4 J; supplied 0.8 J; lost 0.4 J",
      },
      selfCheckExample: {
        prompt: "An 8 µF capacitor stores 0.04 J of energy. Find the potential difference across it.",
        steps: [
          "\\(U = \\dfrac{1}{2}CV^2\\), so \\(V = \\sqrt{\\dfrac{2U}{C}} = \\sqrt{\\dfrac{2 \\times 0.04}{8 \\times 10^{-6}}} = \\sqrt{10^{4}}\\).",
          "V = 100 V.",
        ],
        answer: "100 V",
      },
      practiceSet: [
        { prompt: "The potential difference across a capacitor is doubled. What happens to the energy stored?", answer: "It becomes four times" },
        { prompt: "What fraction of the energy supplied by the battery is stored when a capacitor is charged?", answer: "One half" },
        { prompt: "A capacitor holds 3 µC at 10 V. Find the energy stored.", answer: "\\(1.5 \\times 10^{-5}\\) J (15 µJ)" },
      ],
      pyqExampleId: "40f7722c-a309-4059-8c63-30cfb843271d",
      traps: [
        {
          title: "Writing QV for the stored energy",
          body: "QV is what the battery supplies. The capacitor stores \\(\\dfrac{1}{2}QV\\). Missing the ½ doubles the answer and loses the calculation marks.",
        },
        {
          title: "Picking the wrong form",
          body: "When the charge is fixed (an isolated capacitor) use \\(Q^2/2C\\); when the voltage is fixed (battery connected) use \\(\\frac{1}{2}CV^2\\). Using the other form with the old value of the fixed quantity gives a wrong change in energy.",
        },
        {
          title: "Derivation without the integral",
          body: "The derivation needs the small step \\(dW = (q'/C)\\,dq\\) and the integral from 0 to Q. Writing \\(W = QV\\) and halving it without reason does not earn the marks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpes-charge-sharing",
      name: "Joining a charged capacitor to another",
      intuition:
        "Join a charged capacitor to an uncharged one and charge flows until both sit at the same potential. No charge is lost, but energy is: some always turns into heat in the wires (and electromagnetic radiation) while the charge rushes across. However small the resistance of the wires, the loss is the same.",
      definition:
        "- Two capacitors \\(C_1\\) at \\(V_1\\) and \\(C_2\\) at \\(V_2\\) are joined, like plates together. **Charge is conserved:** \\(C_1 V_1 + C_2 V_2 = (C_1 + C_2)V\\).\n" +
        "- Common potential: \\(V = \\dfrac{C_1 V_1 + C_2 V_2}{C_1 + C_2}\\).\n" +
        "- Energy before: \\(\\dfrac{1}{2}C_1 V_1^2 + \\dfrac{1}{2}C_2 V_2^2\\). Energy after: \\(\\dfrac{1}{2}(C_1 + C_2)V^2\\). The difference is the energy lost.\n" +
        "- Energy is NOT conserved in the capacitors; charge is.",
      formula: {
        label: "Common potential",
        latex: "V = \\frac{C_1 V_1 + C_2 V_2}{C_1 + C_2}",
      },
      authoredExample: {
        prompt:
          "A 4 µF capacitor charged to 100 V is disconnected and joined to an identical uncharged 4 µF capacitor. Find the common potential and the energy lost.",
        steps: [
          "Given: \\(C_1 = C_2 = 4\\) µF, \\(V_1 = 100\\) V, \\(V_2 = 0\\).",
          "Common potential: \\(V = \\dfrac{4 \\times 100 + 0}{4 + 4} = 50\\) V.",
          "Energy before: \\(\\dfrac{1}{2} \\times 4 \\times 10^{-6} \\times (100)^2 = 0.02\\) J.",
          "Energy after: \\(\\dfrac{1}{2} \\times 8 \\times 10^{-6} \\times (50)^2 = 0.01\\) J.",
          "Energy lost: 0.02 − 0.01 = 0.01 J, half of what was stored.",
        ],
        answer: "50 V; 0.01 J lost",
      },
      selfCheckExample: {
        prompt: "A 2 µF capacitor at 120 V is joined, like plates together, to a 4 µF capacitor at 30 V. Find the common potential.",
        steps: ["\\(V = \\dfrac{2 \\times 120 + 4 \\times 30}{2 + 4} = \\dfrac{240 + 120}{6}\\).", "V = 60 V."],
        answer: "60 V",
      },
      practiceSet: [
        { prompt: "When a charged capacitor is joined to an uncharged one, which is conserved: charge or energy?", answer: "Charge" },
        { prompt: "A charged capacitor is joined to an identical uncharged one. What fraction of its energy is lost?", answer: "One half" },
      ],
      pyqExampleId: "439f838d-0a0f-4ba7-9e7e-d50d46e3fd9b",
      traps: [
        {
          title: "Assuming energy is shared",
          body: "Only the CHARGE is shared and conserved. Splitting the energy between the two capacitors gives the wrong common potential and hides the loss.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpes-energy-density",
      name: "Energy stored per unit volume of a field",
      intuition:
        "The energy of a charged capacitor lives in the field between its plates. Divide it by the volume of that space and you get the energy per cubic metre, which depends only on the strength of the field and the medium. So any region with a field holds energy, capacitor or not.",
      definition:
        "- For a parallel plate capacitor filled with a medium of dielectric constant k: \\(C = \\dfrac{kA\\varepsilon_0}{d}\\) and \\(V = Ed\\).\n" +
        "- \\(U = \\dfrac{1}{2}CV^2 = \\dfrac{1}{2} \\cdot \\dfrac{kA\\varepsilon_0}{d} \\cdot E^2 d^2 = \\dfrac{1}{2}k\\varepsilon_0 E^2 (Ad)\\).\n" +
        "- Ad is the volume between the plates, so the energy per unit volume is \\(u = \\dfrac{1}{2}k\\varepsilon_0 E^2\\); in air, \\(u = \\dfrac{1}{2}\\varepsilon_0 E^2\\). Unit: J/m³.\n" +
        "- Energy in a volume V of the field: U = uV.\n" +
        "- The board asked for this in 2017, before the present textbook. The present book does not teach energy density, so give this concept less time than the energy stored in a capacitor.",
      formula: {
        label: "Energy density",
        latex: "u = \\frac{1}{2}k\\varepsilon_0 E^2",
      },
      authoredExample: {
        prompt:
          "The field between the plates of an air capacitor is \\(2 \\times 10^{5}\\) V/m and the space between the plates has a volume of \\(5 \\times 10^{-5}\\) m³. Find the energy density and the energy stored. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) SI units)",
        steps: [
          "Given: \\(E = 2 \\times 10^{5}\\) V/m, k = 1, volume \\(5 \\times 10^{-5}\\) m³.",
          "Formula: \\(u = \\dfrac{1}{2}\\varepsilon_0 E^2\\), U = u × volume.",
          "Substitution: \\(u = \\dfrac{1}{2} \\times 8.85 \\times 10^{-12} \\times (2 \\times 10^{5})^2 = 0.177\\) J/m³.",
          "\\(U = 0.177 \\times 5 \\times 10^{-5} = 8.85 \\times 10^{-6}\\) J.",
        ],
        answer: "u = 0.177 J/m³; U = 8.85 × 10⁻⁶ J",
      },
      selfCheckExample: {
        prompt: "Find the energy density of an electric field of \\(10^{6}\\) V/m in air. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) SI units)",
        steps: ["\\(u = \\dfrac{1}{2} \\times 8.85 \\times 10^{-12} \\times (10^{6})^2\\).", "u = 4.43 J/m³."],
        answer: "4.43 J/m³",
      },
      practiceSet: [
        { prompt: "The electric field in a region is doubled. What happens to the energy density?", answer: "It becomes four times" },
        { prompt: "For the same field, by what factor is the energy density in a medium of dielectric constant 3 greater than in air?", answer: "Three times" },
      ],
      pyqExampleId: "e1217092-8286-4159-a232-38f0fb2ee974",
      traps: [
        {
          title: "Leaving out k",
          body: "In a medium, \\(u = \\frac{1}{2}k\\varepsilon_0 E^2\\). Using the air formula for a dielectric gives an answer k times too small.",
        },
        {
          title: "Volume in cm³",
          body: "1 cm³ = \\(10^{-6}\\) m³. Convert the volume before multiplying by the energy density in J/m³.",
        },
      ],
    },
  ],
};
