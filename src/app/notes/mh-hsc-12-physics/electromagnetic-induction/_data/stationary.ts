import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_EM_STATIONARY_NOTE: SubtopicNote = {
  subtopicName: "Induced emf in a Stationary Coil",
  title: "Induced e.m.f. in a Stationary Coil",
  oneLineDefinition:
    "A coil that does not move still gets an e.m.f. when the field through it changes: a magnet swinging through it, or a solenoid whose current is switched off or reversed.",
  whyItMatters:
    "3 questions. One was set in a board paper: what is induced in a coil kept still in a uniform magnetic field (2020, an MCQ). The textbook adds a coil wound round a solenoid whose current is reversed, and a coil inside a solenoid whose current falls to zero.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpem-flux-must-change",
      name: "Only a changing flux induces an e.m.f.",
      intuition:
        "Being inside a magnetic field does nothing to a coil. Something must change: the field, the area of the coil, or its angle to the field. The textbook shows this with a magnet swinging on an arc through a coil of many turns. The e.m.f. comes in two short pulses, one as the magnet comes in and one as it goes out.",
      definition:
        "- Since \\(\\phi = BA\\cos\\theta\\), an e.m.f. appears only if B, A or \\(\\theta\\) changes with time.\n" +
        "- **Magnet and coil (textbook):** a bar magnet swings through a fixed coil. The flux rises as the magnet approaches, stays nearly steady while it is inside, and falls as it leaves.\n" +
        "- The e.m.f. is proportional to \\(d\\phi/dt\\), the slope of the flux and time graph, so it is largest where the flux changes fastest.\n" +
        "- By Lenz's sign \\(e = -d\\phi/dt\\), the e.m.f. is negative while the flux increases and positive while it decreases: one negative and one positive pulse in each half swing.\n" +
        "- In a stationary coil the charges are driven by the electric field that a changing magnetic field creates.",
      table: {
        columns: ["Situation", "Does the flux change?", "Is an e.m.f. induced?"],
        rows: [
          {
            cells: ["Coil kept still in a uniform, steady field", "No", "No, and so no current either"],
            pyqExampleId: "2a101899-72aa-4cf0-96e5-2e7fa296881b",
            noteAmber: "Board 2020 asked this as an MCQ.",
          },
          { cells: ["Coil slid sideways inside a uniform field, without turning", "No", "No"] },
          { cells: ["Coil turned about an axis in a field", "Yes, the angle changes", "Yes"] },
          { cells: ["Field through a still coil switched on or off", "Yes, B changes", "Yes, only while it changes"] },
          { cells: ["Magnet swinging through a still coil", "Yes, rises then falls", "Yes, two pulses of opposite sign"] },
        ],
      },
      practiceSet: [
        { prompt: "A coil lies still in a magnetic field whose strength is rising. Is an e.m.f. induced in the coil?", answer: "Yes, because the flux through it is changing" },
        { prompt: "A magnet passes once through a coil. When is the induced e.m.f. largest?", answer: "When the flux changes fastest, as the magnet enters and as it leaves" },
        { prompt: "Why are the two pulses of e.m.f. opposite in sign as a magnet passes through a coil?", answer: "The flux increases as the magnet enters and decreases as it leaves, so \\(d\\phi/dt\\) changes sign" },
      ],
      traps: [
        {
          title: "Field present means e.m.f. present",
          body: "A strong field alone induces nothing. Only a change of flux does, so a coil at rest in a steady field has neither e.m.f. nor current.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpem-solenoid-coil",
      name: "A coil wound on a solenoid",
      intuition:
        "Wind a small coil round the middle of a long solenoid. Nothing moves, but when the solenoid's current changes, its field changes, and so does the flux through every turn of the small coil. This is induction with no motion at all.",
      definition:
        "- Field inside a long solenoid with n turns per metre carrying current i: \\(B = \\mu_0 n i\\).\n" +
        "- A coil of \\(N_c\\) turns round the middle of the solenoid links flux \\(N_c\\phi = N_c B A\\), with A the area the field actually fills inside the coil (for a small coil placed inside a wider solenoid, the coil's own area).\n" +
        "- Average e.m.f. when the current changes: \\(|e| = \\dfrac{N_c|\\Delta\\phi|}{\\Delta t} = N_c\\mu_0 n A\\dfrac{|\\Delta i|}{\\Delta t}\\).\n" +
        "- Current switched off: the change of flux equals the starting flux. Current **reversed**: the change is twice the starting flux.\n" +
        "- Change turns per cm to turns per m (multiply by 100) and cm² to m² (multiply by \\(10^{-4}\\)).",
      formula: {
        label: "Coil on a solenoid",
        latex: "B = \\mu_0 n i, \\qquad |e| = N_c\\mu_0 n A\\frac{|\\Delta i|}{\\Delta t}",
      },
      authoredExample: {
        prompt:
          "A long solenoid has 1000 turns per metre and carries a current of 2 A. A coil of 50 turns and area 10 cm² is wound tightly round its middle. The current is switched off in 0.01 s. Find the field inside the solenoid, the flux linkage of the coil and the average e.m.f. induced in it.",
        steps: [
          "Given: \\(n = 1000\\) per m, \\(i = 2\\) A, \\(N_c = 50\\), \\(A = 10 \\times 10^{-4}\\) m², \\(\\Delta t = 0.01\\) s.",
          "Field: \\(B = \\mu_0 n i = 4\\pi \\times 10^{-7} \\times 1000 \\times 2 = 2.51 \\times 10^{-3}\\) T.",
          "Flux linkage: \\(N_c BA = 50 \\times 2.51 \\times 10^{-3} \\times 10^{-3} = 1.26 \\times 10^{-4}\\) Wb.",
          "The linkage falls to zero, so \\(|e| = \\dfrac{1.26 \\times 10^{-4}}{0.01} = 1.26 \\times 10^{-2}\\) V.",
        ],
        answer: "\\(B = 2.51 \\times 10^{-3}\\) T; flux linkage \\(1.26 \\times 10^{-4}\\) Wb; e.m.f. 12.6 mV",
      },
      selfCheckExample: {
        prompt:
          "Each turn of a 50-turn coil wound on a solenoid links a flux of \\(2 \\times 10^{-4}\\) Wb. The solenoid current is reversed in 0.02 s. Find the average e.m.f. induced in the coil.",
        steps: [
          "The linkage goes from \\(+N\\phi\\) to \\(-N\\phi\\): change \\(= 2 \\times 50 \\times 2 \\times 10^{-4} = 0.02\\) Wb.",
          "\\(|e| = \\dfrac{0.02}{0.02} = 1\\) V.",
        ],
        answer: "1 V",
      },
      practiceSet: [
        { prompt: "Write the magnetic field inside a long solenoid of n turns per metre carrying a current i.", answer: "\\(B = \\mu_0 n i\\)" },
        { prompt: "The current in a solenoid is doubled. What happens to the flux linked with a coil wound round its middle?", answer: "It doubles, since \\(B \\propto i\\)" },
        { prompt: "A solenoid has 30 turns per cm. How many turns does it have per metre?", answer: "3000" },
      ],
      pyqExampleId: "8e791ab8-894a-4ef1-9092-175e3df53416",
      traps: [
        {
          title: "Reversing treated as switching off",
          body: "When the current is reversed, the flux goes from a value to minus that value. Using only the starting flux halves the e.m.f.",
        },
        {
          title: "Turns per cm used as turns per m",
          body: "In \\(B = \\mu_0 n i\\), n is turns per metre. A figure given per cm must be multiplied by 100 first.",
        },
      ],
    },
  ],
};
