import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EP_STORED_NOTE: SubtopicNote = {
  subtopicName: "Energy Stored in a Capacitor",
  title: "Energy Stored in a Capacitor",
  oneLineDefinition:
    "The work done in charging a capacitor, stored as energy in the field between its plates, and the energy lost when a charged capacitor shares its charge with another.",
  whyItMatters:
    "10 questions. Seven were set in board papers: the energy before and after a charged capacitor is joined to an uncharged one (2023, 2025), the work done in pulling the plates apart at fixed charge (2024), the energy stored by capacitors joined in parallel (2024), what an inserted dielectric does to the energy of an isolated capacitor (2024), and the energy in terms of the field and the volume between the plates (2025). In 2025 the board also asked why a capacitor can hold only so much charge.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpep-stored-energy",
      name: "Energy stored and energy density",
      intuition:
        "Charging a capacitor means moving charge from one plate to the other against a growing potential difference. The first bit of charge is easy to move, the last bit is hardest. All that work is stored, and you can think of it as sitting in the electric field between the plates.",
      definition:
        "Derivation (NCERT):\n" +
        "- When the capacitor already holds a charge \\(Q'\\), the potential difference is \\(V' = Q'/C\\).\n" +
        "- Moving a further small charge \\(dQ'\\) needs work \\(dW = V'\\,dQ' = \\dfrac{Q'}{C}dQ'\\).\n" +
        "- Adding up from 0 to Q: \\(W = \\displaystyle\\int_0^Q \\dfrac{Q'}{C}dQ' = \\dfrac{Q^2}{2C}\\).\n" +
        "- So \\(U = \\dfrac{Q^2}{2C} = \\dfrac{1}{2}CV^2 = \\dfrac{1}{2}QV\\), whatever way the capacitor was charged.\n" +
        "- For a parallel plate capacitor, \\(U = \\dfrac{1}{2}\\varepsilon_0E^2 \\times Ad\\), and Ad is the volume between the plates. **Energy density** \\(u = \\dfrac{1}{2}\\varepsilon_0E^2\\), energy per unit volume.\n" +
        "- Pick the form that uses what stays fixed: \\(Q^2/2C\\) when Q is fixed (battery removed), \\(\\frac{1}{2}CV^2\\) when V is fixed (battery connected).\n" +
        "- There is a limit to the charge, and so to the energy, a capacitor can hold. The field between the plates grows with the charge, and above the medium's dielectric strength (about \\(3 \\times 10^{6}\\) V/m for air) the medium breaks down and conducts.",
      formula: {
        label: "Energy stored",
        latex: "U = \\frac{Q^2}{2C} = \\frac{1}{2}CV^2 = \\frac{1}{2}QV, \\qquad u = \\frac{1}{2}\\varepsilon_0E^2",
      },
      authoredExample: {
        prompt:
          "A 40 µF parallel plate capacitor is charged to 200 V. Its plates are 2 mm apart. Find the energy stored and the energy density between the plates. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^2\\,\\text{N}^{-1}\\,\\text{m}^{-2}\\).)",
        steps: [
          "Given: \\(C = 40 \\times 10^{-6}\\) F, \\(V = 200\\) V, \\(d = 2 \\times 10^{-3}\\) m.",
          "\\(U = \\dfrac{1}{2}CV^2 = \\dfrac{1}{2} \\times 40 \\times 10^{-6} \\times (200)^2 = 0.8\\) J.",
          "Field: \\(E = \\dfrac{V}{d} = \\dfrac{200}{2 \\times 10^{-3}} = 1 \\times 10^{5}\\) V/m.",
          "\\(u = \\dfrac{1}{2}\\varepsilon_0E^2 = \\dfrac{1}{2} \\times 8.85 \\times 10^{-12} \\times 10^{10} = 0.044\\ \\text{J m}^{-3}\\).",
        ],
        answer: "0.8 J; 0.044 J m⁻³",
      },
      selfCheckExample: {
        prompt: "A 2 µF capacitor carries a charge of 40 µC. Find the energy stored in it.",
        steps: ["\\(U = \\dfrac{Q^2}{2C} = \\dfrac{(40 \\times 10^{-6})^2}{2 \\times 2 \\times 10^{-6}}\\).", "\\(U = \\dfrac{1.6 \\times 10^{-9}}{4 \\times 10^{-6}} = 4 \\times 10^{-4}\\) J."],
        answer: "4 × 10⁻⁴ J",
      },
      practiceSet: [
        { prompt: "What is the energy density of an electric field E in vacuum?", answer: "\\(\\dfrac{1}{2}\\varepsilon_0E^2\\)" },
        { prompt: "The potential difference across a capacitor is doubled. What happens to the energy stored?", answer: "It becomes four times as large" },
        { prompt: "A dielectric of constant K is slid into an isolated charged capacitor. Does the stored energy rise or fall?", answer: "It falls, to 1/K of its value" },
        { prompt: "Why is there a limit to the charge a capacitor can hold?", answer: "The field grows with the charge, and above its dielectric strength the medium breaks down and starts to conduct" },
      ],
      pyqExampleId: "de045c4d-041f-48bf-9acb-f635825c6e71",
      traps: [
        {
          title: "Leaving out the half",
          body: "The energy is \\(\\frac{1}{2}CV^2\\), not \\(CV^2\\). The half comes from the potential difference growing from zero while the capacitor charges.",
        },
        {
          title: "Pulling plates apart at fixed charge",
          body: "With Q fixed, C falls, so \\(U = Q^2/2C\\) rises. The work you do in pulling the plates apart is the gain in stored energy.",
        },
        {
          title: "Energy density given as energy",
          body: "\\(\\frac{1}{2}\\varepsilon_0E^2\\) is energy per unit volume. Multiply by the volume between the plates to get the energy stored.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpep-sharing",
      name: "Sharing charge between capacitors",
      intuition:
        "Join a charged capacitor to an uncharged one and charge flows until both have the same potential difference. No charge is lost, but some energy always is: while the charge rushes across, a current flows in the connecting wires, which heats them and sends out a little electromagnetic radiation.",
      definition:
        "- The two capacitors end up in parallel at a **common potential**: \\(V = \\dfrac{C_1V_1}{C_1 + C_2}\\) (charge is conserved).\n" +
        "- Energy afterwards: \\(U_f = \\dfrac{1}{2}(C_1 + C_2)V^2\\), always less than \\(U_i = \\dfrac{1}{2}C_1V_1^2\\).\n" +
        "- Energy lost: \\(\\Delta U = \\dfrac{1}{2}\\dfrac{C_1C_2}{C_1 + C_2}V_1^2\\), given out as heat and electromagnetic radiation.\n" +
        "- Two identical capacitors: the voltage halves and exactly half the energy is lost.",
      formula: {
        label: "Charge sharing",
        latex: "V = \\frac{C_1V_1}{C_1 + C_2}, \\qquad \\Delta U = \\frac{1}{2}\\frac{C_1C_2}{C_1 + C_2}V_1^2",
      },
      authoredExample: {
        prompt:
          "A 6 µF capacitor charged to 50 V is disconnected from the supply and joined to an uncharged 3 µF capacitor. Find the common potential, the energy before and after, and the energy lost.",
        steps: [
          "Charge: \\(Q = C_1V_1 = 6 \\times 10^{-6} \\times 50 = 3 \\times 10^{-4}\\) C, conserved.",
          "Common potential: \\(V = \\dfrac{Q}{C_1 + C_2} = \\dfrac{3 \\times 10^{-4}}{9 \\times 10^{-6}} = 33.3\\) V.",
          "Before: \\(U_i = \\dfrac{1}{2} \\times 6 \\times 10^{-6} \\times (50)^2 = 7.5 \\times 10^{-3}\\) J.",
          "After: \\(U_f = \\dfrac{Q^2}{2(C_1 + C_2)} = \\dfrac{(3 \\times 10^{-4})^2}{2 \\times 9 \\times 10^{-6}} = 5.0 \\times 10^{-3}\\) J.",
          "Energy lost \\(= 7.5 \\times 10^{-3} - 5.0 \\times 10^{-3} = 2.5 \\times 10^{-3}\\) J, as heat and radiation.",
        ],
        answer: "33.3 V; 7.5 mJ before, 5.0 mJ after; 2.5 mJ lost",
      },
      selfCheckExample: {
        prompt: "A capacitor charged to 60 V is joined to an identical uncharged capacitor. Find the final potential difference and the fraction of the energy that is left.",
        steps: ["Charge spreads over twice the capacitance: \\(V = \\dfrac{60}{2} = 30\\) V.", "\\(U_f = \\dfrac{1}{2}(2C)(30)^2\\) against \\(U_i = \\dfrac{1}{2}C(60)^2\\): the ratio is \\(\\dfrac{1800C}{3600C} = \\dfrac{1}{2}\\)."],
        answer: "30 V; half the energy is left",
      },
      practiceSet: [
        { prompt: "Where does the energy lost in sharing charge between two capacitors go?", answer: "Into heat in the connecting wires, and electromagnetic radiation" },
        { prompt: "Is charge conserved when two capacitors share charge?", answer: "Yes" },
        { prompt: "A capacitor C charged to V is joined to an uncharged capacitor 2C. What is the ratio of the final energy to the initial energy?", answer: "1 : 3" },
      ],
      pyqExampleId: "c24571aa-c437-424e-a694-3f441d9f5c71",
      traps: [
        {
          title: "Treating energy as conserved",
          body: "Charge is conserved when capacitors share; energy is not. Find the common potential from the charge, never by equating energies.",
        },
        {
          title: "Using the old voltage afterwards",
          body: "After sharing, both capacitors are at the new common potential. Put that value, not the starting voltage, into \\(\\frac{1}{2}CV^2\\).",
        },
      ],
    },
  ],
};
