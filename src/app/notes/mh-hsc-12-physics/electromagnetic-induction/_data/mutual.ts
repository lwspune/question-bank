import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_EM_MUTUAL_NOTE: SubtopicNote = {
  subtopicName: "Mutual Inductance",
  title: "Mutual Inductance and the Transformer",
  oneLineDefinition:
    "Mutual induction between two coils, the mutual inductance and the coefficient of coupling, and the transformer that works on it: principle, construction, working and the turns-ratio equation.",
  whyItMatters:
    "19 questions. Eleven were set in board papers, and four of those ask for the transformer: its principle, construction, working and equation, with a diagram (2016, twice in 2024, and 2026). The rest ask you to define mutual inductance (2025), find it from an induced e.m.f. (2022, 2026), find the e.m.f. when a current is cut off (2016), find it from the coefficient of coupling (2025), find the turns of a step-up transformer (2025) and distinguish step-up from step-down transformers (2020).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpem-mutual-inductance",
      name: "Mutual induction and mutual inductance",
      intuition:
        "Two coils sit side by side, not touching. Change the current in one and its changing field threads the other, which then gets an e.m.f. of its own. The two coils are joined only by the magnetic field between them. Mutual inductance measures how well that field links them.",
      definition:
        "- **Mutual induction:** the production of an induced e.m.f. in a coil because of a change of current in a neighbouring coil. The coil with the source is the primary; the other is the secondary.\n" +
        "- The flux linked with the secondary is proportional to the current in the primary: \\(\\phi_s = M I_p\\).\n" +
        "- **Definition 1:** \\(M = \\dfrac{\\phi_s}{I_p}\\), the magnetic flux linked with the secondary per unit current in the primary.\n" +
        "- **Definition 2:** from \\(e_s = -M\\dfrac{dI_p}{dt}\\), M is the e.m.f. induced in the secondary per unit rate of change of current in the primary.\n" +
        "- By symmetry \\(M_{12} = M_{21} = M\\). Unit: the henry; two coils have M = 1 H when a current changing at 1 A/s in one induces 1 V in the other.\n" +
        "- **Solenoid with a coil round its centre:** a long solenoid of \\(N_1\\) turns, length l and area A has \\(B = \\mu_0 N_1 I/l\\); a coil of \\(N_2\\) turns round its middle links \\(N_2 BA\\), so \\(M = \\dfrac{\\mu_0 N_1 N_2 A}{l}\\).",
      formula: {
        label: "Mutual inductance",
        latex: "\\phi_s = M I_p, \\qquad e_s = -M\\frac{dI_p}{dt}",
      },
      authoredExample: {
        prompt:
          "When the current in one coil falls steadily from 6 A to 2 A in 0.05 s, an e.m.f. of 4 V is induced in a nearby coil. Find the mutual inductance of the pair.",
        steps: [
          "Given: \\(\\Delta I = 6 - 2 = 4\\) A, \\(\\Delta t = 0.05\\) s, \\(|e| = 4\\) V.",
          "Formula: \\(M = \\dfrac{|e|}{dI/dt}\\).",
          "Substitution: \\(\\dfrac{dI}{dt} = \\dfrac{4}{0.05} = 80\\) A/s, so \\(M = \\dfrac{4}{80} = 0.05\\) H.",
        ],
        answer: "0.05 H (50 mH)",
      },
      selfCheckExample: {
        prompt:
          "Two coils have a mutual inductance of 0.2 H. The current in the first coil rises steadily from 0 to 3 A. Find the change in the flux linked with the second coil.",
        steps: ["\\(\\Delta\\phi_s = M\\,\\Delta I_p = 0.2 \\times 3\\).", "\\(\\Delta\\phi_s = 0.6\\) Wb."],
        answer: "0.6 Wb",
      },
      practiceSet: [
        { prompt: "A long solenoid of 1000 turns, length 0.5 m and area 10 cm² has a coil of 100 turns wound round its middle. Find their mutual inductance.", answer: "\\(\\dfrac{4\\pi \\times 10^{-7} \\times 1000 \\times 100 \\times 10^{-3}}{0.5} = 2.5 \\times 10^{-4}\\) H" },
        { prompt: "Define one henry of mutual inductance.", answer: "Two coils have a mutual inductance of 1 H when a current changing at 1 A/s in one induces an e.m.f. of 1 V in the other" },
        { prompt: "Write the relation between the flux linked with the secondary and the current in the primary.", answer: "\\(\\phi_s = M I_p\\)" },
      ],
      pyqExampleId: "29e7b528-af58-4171-8eb3-cce92ed9a0f4",
      traps: [
        {
          title: "A sudden cut-off is still a rate",
          body: "When a current is cut off, the change in current is its whole value and the time is the time taken. A very short time gives a very large e.m.f.; that is correct, not a mistake.",
        },
        {
          title: "mV and mH not converted",
          body: "Change mV to V and mH to H before dividing, or give the answer in the matching unit. Mixing them makes M a thousand times wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpem-coupling",
      name: "Coefficient of coupling",
      intuition:
        "Not all the flux of one coil reaches the other; some leaks into the space around. The coefficient of coupling is the share that gets through. Wind both coils on one iron core and nearly all of it does; set them far apart or at right angles and very little does.",
      definition:
        "- The coefficient of coupling K measures the portion of the flux of one coil that reaches the other.\n" +
        "- \\(M = K\\sqrt{L_1 L_2}\\), so \\(K = \\dfrac{M}{\\sqrt{L_1 L_2}}\\). K is usually less than 1.\n" +
        "- K = 1: the coils are perfectly coupled and \\(M = \\sqrt{L_1 L_2}\\).\n" +
        "- K > 0.5: tightly coupled. K < 0.5: loosely coupled.\n" +
        "- K is largest when the axes of the coils are parallel and in line, and smallest when the axes are at right angles.\n" +
        "- A large M is wanted in a transformer, but not in home appliances, where it could induce a dangerous e.m.f.",
      formula: {
        label: "Coefficient of coupling",
        latex: "M = K\\sqrt{L_1 L_2}",
      },
      authoredExample: {
        prompt:
          "Two coils of self inductance 40 mH and 90 mH have a mutual inductance of 48 mH. Find the coefficient of coupling, and say whether the coils are tightly or loosely coupled.",
        steps: [
          "Given: \\(L_1 = 40\\) mH, \\(L_2 = 90\\) mH, \\(M = 48\\) mH.",
          "Formula: \\(K = \\dfrac{M}{\\sqrt{L_1 L_2}}\\).",
          "Substitution: \\(\\sqrt{40 \\times 90} = \\sqrt{3600} = 60\\) mH, so \\(K = \\dfrac{48}{60} = 0.8\\).",
          "K is more than 0.5, so the coils are tightly coupled.",
        ],
        answer: "K = 0.8 (80%); tightly coupled",
      },
      selfCheckExample: {
        prompt:
          "Two perfectly coupled coils have a mutual inductance of 30 mH. One coil has a self inductance of 45 mH. Find the self inductance of the other.",
        steps: ["With K = 1, \\(M^2 = L_1 L_2\\).", "\\(L_2 = \\dfrac{30^2}{45} = \\dfrac{900}{45} = 20\\) mH."],
        answer: "20 mH",
      },
      practiceSet: [
        { prompt: "What is the largest value the coefficient of coupling can have?", answer: "1, for perfectly coupled coils" },
        { prompt: "How should two coils be placed to make their coupling as small as possible?", answer: "With their axes at right angles" },
        { prompt: "For a pair of coils K = 0.3. Are they tightly or loosely coupled?", answer: "Loosely, since K is less than 0.5" },
      ],
      pyqExampleId: "893c3d9b-0d57-4a2a-9ec6-7d4747e5ead0",
      traps: [
        {
          title: "A coupling greater than 1",
          body: "If your K comes out more than 1, or M more than \\(\\sqrt{L_1 L_2}\\), a unit or a figure has gone wrong. Check that \\(L_1\\), \\(L_2\\) and M are all in the same unit.",
        },
        {
          title: "Forgetting the square root",
          body: "M is K times the square root of the product \\(L_1 L_2\\), not K times the product itself.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpem-transformer",
      name: "The transformer",
      intuition:
        "A transformer is two coils on one iron core. The alternating current in the primary sends a changing flux round the core, and the same flux threads every turn of the secondary. Each turn gets the same e.m.f., so the coil with more turns gets the larger e.m.f. Energy is not made, so if the voltage goes up, the current comes down.",
      definition:
        "- **Principle:** mutual induction. A transformer changes an alternating voltage from a low value to a high value or the reverse.\n" +
        "- **Construction:** two coils, the primary (input) and the secondary (output), insulated from each other and wound on a common soft-iron core. Board model answers also say the core is laminated (thin insulated sheets) to cut down eddy currents; the present textbook's figure shows only a soft-iron core.\n" +
        "- **Working:** an a.c. voltage on the primary makes its current, and so the flux in the core, change sinusoidally. This changing flux links both coils and induces an e.m.f. in each. A steady d.c. gives no change of flux, so a transformer does not work on d.c.\n" +
        "- **Derivation:** let \\(\\phi\\) be the flux per turn. Then \\(\\phi_p = N_p\\phi\\) and \\(\\phi_s = N_s\\phi\\).\n" +
        "- \\(e_p = -N_p\\dfrac{d\\phi}{dt}\\) and \\(e_s = -N_s\\dfrac{d\\phi}{dt}\\), so \\(\\dfrac{e_s}{e_p} = \\dfrac{N_s}{N_p}\\). \\(N_s/N_p\\) is the turns ratio; this is the equation for the transformer.\n" +
        "- Ideal transformer: input power = output power, \\(e_p i_p = e_s i_s\\), so \\(\\dfrac{e_s}{e_p} = \\dfrac{N_s}{N_p} = \\dfrac{i_p}{i_s}\\).\n" +
        "- **Diagram:** a closed core with the primary on one limb (a.c. input) and the secondary on the other (output); label \\(N_p\\), \\(N_s\\) and the core.",
      formula: {
        label: "Transformer equation",
        latex: "\\frac{e_s}{e_p} = \\frac{N_s}{N_p} = \\frac{i_p}{i_s}",
      },
      authoredExample: {
        prompt:
          "An ideal transformer has 200 turns on its primary and 50 turns on its secondary. The primary is connected to a 240 V a.c. supply and draws 0.5 A. Find the secondary voltage and current, and name the type of transformer.",
        steps: [
          "Given: \\(N_p = 200\\), \\(N_s = 50\\), \\(e_p = 240\\) V, \\(i_p = 0.5\\) A.",
          "Formula: \\(\\dfrac{e_s}{e_p} = \\dfrac{N_s}{N_p} = \\dfrac{i_p}{i_s}\\).",
          "\\(e_s = 240 \\times \\dfrac{50}{200} = 60\\) V.",
          "\\(i_s = i_p \\times \\dfrac{N_p}{N_s} = 0.5 \\times \\dfrac{200}{50} = 2\\) A. The voltage is lowered, so it is a step-down transformer.",
        ],
        answer: "60 V and 2 A; a step-down transformer",
      },
      selfCheckExample: {
        prompt:
          "An ideal transformer gives 10 A at 22 V from a 220 V supply. Find the current in the primary and the turns ratio \\(N_s/N_p\\).",
        steps: ["\\(e_p i_p = e_s i_s\\): \\(i_p = \\dfrac{22 \\times 10}{220} = 1\\) A.", "\\(\\dfrac{N_s}{N_p} = \\dfrac{e_s}{e_p} = \\dfrac{22}{220} = 0.1\\)."],
        answer: "1 A; turns ratio 0.1",
      },
      practiceSet: [
        { prompt: "Why does a transformer not work on steady d.c.?", answer: "A steady current gives a steady flux, and an unchanging flux induces no e.m.f. in the secondary" },
        { prompt: "Why is the core of a transformer made of soft iron?", answer: "So that nearly all the flux of the primary is carried through the secondary" },
        { prompt: "A transformer raises 110 V to 440 V. Its secondary has 2000 turns. Find the number of turns on the primary.", answer: "\\(2000 \\times 110/440 = 500\\)" },
      ],
      pyqExampleId: "294af9ee-363b-496e-bc56-93851f48414b",
      traps: [
        {
          title: "No diagram in a 'construction and working' answer",
          body: "This question carries marks for a labelled diagram: core, primary, secondary, input and output. Draw it even when the question does not say 'with a diagram'.",
        },
        {
          title: "Saying a transformer raises power",
          body: "A step-up transformer raises the voltage and lowers the current in the same ratio. The power stays the same in an ideal transformer.",
        },
        {
          title: "Turns ratio upside down",
          body: "The voltages go as the turns, \\(e_s/e_p = N_s/N_p\\), but the currents go the other way, \\(i_s/i_p = N_p/N_s\\). Write the full equation before you substitute.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpem-step-up-down",
      name: "Step-up and step-down transformers",
      intuition:
        "The two kinds are the same device wound differently. Whichever coil has more turns has the higher voltage and the smaller current.",
      definition:
        "- The board asks this as 'distinguish between'. Write each point for both transformers in the same row.\n" +
        "- Both work on mutual induction, and in both an ideal transformer keeps the power the same.",
      table: {
        columns: ["Point", "Step-up transformer", "Step-down transformer"],
        rows: [
          {
            cells: ["Turns", "More turns on the secondary than on the primary", "Fewer turns on the secondary than on the primary"],
            pyqExampleId: "b5215c75-7531-4b76-a61d-d4ed52364bb4",
            noteAmber: "Board 2020 asked you to distinguish the two.",
          },
          { cells: ["Turns ratio Ns/Np", "More than 1", "Less than 1"] },
          { cells: ["Output voltage", "Higher than the input voltage", "Lower than the input voltage"] },
          { cells: ["Current", "Secondary current is less than the primary current", "Secondary current is more than the primary current"] },
        ],
      },
      practiceSet: [
        { prompt: "In a step-up transformer, which coil carries the larger current?", answer: "The primary" },
        { prompt: "A transformer has 500 turns on its primary and 100 on its secondary. Is it step-up or step-down?", answer: "Step-down, since the secondary has fewer turns" },
        { prompt: "Does a step-up transformer increase the power delivered?", answer: "No. In an ideal transformer the output power equals the input power" },
      ],
      traps: [
        {
          title: "One-sided points",
          body: "Each point must compare both transformers on the same feature. 'A step-up transformer has more secondary turns', with nothing about the step-down one, earns half the mark.",
        },
      ],
    },
  ],
};
