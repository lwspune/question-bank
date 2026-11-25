import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EI_INDUCTANCE_NOTE: SubtopicNote = {
  subtopicName: "Inductance",
  title: "Mutual Inductance, Self-Inductance and Energy in an Inductor",
  oneLineDefinition:
    "Flux linkage and inductance, the mutual inductance of two coaxial solenoids and of two concentric coils, the self-inductance of a long solenoid, and the energy stored in an inductor.",
  whyItMatters:
    "37 questions, thirty-three of them from board papers, more than any other page of the chapter. The board asks you to define mutual inductance with its unit and derive it for two coaxial solenoids or a coil round a solenoid (2023, 2024, 2025, 2026), define self-inductance and derive it for a long solenoid (2023, 2025, 2026), find the mutual inductance of two concentric coils (2023, 2025, 2026), work out an emf or an inductance from a rate of change of current (2024, 2025, 2026), and show that the energy stored is ½LI² (2025). The textbook adds the energy density of a magnetic field.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpei-mutual-solenoids",
      name: "Mutual inductance of two long coaxial solenoids",
      intuition:
        "When a current flows in one coil, some of its flux threads a nearby coil. The flux linkage of the second coil is proportional to the current in the first, and the constant is the mutual inductance. It depends only on the coils themselves: their turns, sizes, separation, orientation and core, never on the current.",
      definition:
        "- **Flux linkage** of a closely wound coil of N turns is \\(N\\Phi\\), since the same flux threads every turn.\n" +
        "- **Mutual inductance:** \\(N_1\\Phi_1 = M_{12}I_2\\). It is the flux linkage with one coil per unit current in the other; equally, the emf induced in one coil per unit rate of change of current in the other, since \\(\\varepsilon_1 = -M\\dfrac{dI_2}{dt}\\). SI unit: the **henry** (H). Dimensions \\([\\text{M L}^2\\text{T}^{-2}\\text{A}^{-2}]\\).\n" +
        "- **Derivation** (inner solenoid \\(S_1\\) of radius \\(r_1\\) with \\(n_1\\) turns per unit length; outer \\(S_2\\) of radius \\(r_2\\) with \\(n_2\\); both of length l):\n" +
        "- Pass \\(I_2\\) through the outer solenoid: \\(B_2 = \\mu_0 n_2 I_2\\), uniform inside it.\n" +
        "- Flux linkage with \\(S_1\\): \\(N_1\\Phi_1 = (n_1 l)(\\pi r_1^2)(\\mu_0 n_2 I_2)\\). The area is \\(\\pi r_1^2\\), the inner solenoid's own.\n" +
        "- So \\(M_{12} = \\mu_0 n_1 n_2 \\pi r_1^2 l\\).\n" +
        "- Reverse case: pass \\(I_1\\) through \\(S_1\\). Its field \\(\\mu_0 n_1 I_1\\) stays inside \\(S_1\\), so each turn of \\(S_2\\) links \\(\\mu_0 n_1 I_1 \\pi r_1^2\\), and \\(M_{21} = \\mu_0 n_1 n_2 \\pi r_1^2 l\\). Hence \\(M_{12} = M_{21} = M\\).\n" +
        "- With a core of relative permeability \\(\\mu_r\\): \\(M = \\mu_r\\mu_0 n_1 n_2 \\pi r_1^2 l\\). M also depends on the separation and relative orientation of the coils.",
      formula: {
        label: "Two long coaxial solenoids",
        latex: "M = \\mu_0 n_1 n_2 \\pi r_1^2 l = \\frac{\\mu_0 N_1 N_2 \\pi r_1^2}{l}",
        symbols: [
          { symbol: "\\(r_1\\)", meaning: "radius of the inner solenoid" },
          { symbol: "\\(n_1, n_2\\)", meaning: "turns per unit length of the inner and outer solenoids" },
        ],
      },
      authoredExample: {
        prompt:
          "Two long coaxial solenoids are each 50 cm long. The inner one has a radius of 2 cm and 400 turns; the outer one has a radius of 3 cm and 1000 turns. Find their mutual inductance.",
        steps: [
          "Given: \\(l = 0.5\\) m, \\(r_1 = 0.02\\) m, \\(N_1 = 400\\), \\(N_2 = 1000\\). The outer radius is not needed.",
          "Formula: \\(M = \\dfrac{\\mu_0 N_1 N_2 \\pi r_1^2}{l}\\).",
          "Substitution: \\(M = \\dfrac{4\\pi \\times 10^{-7} \\times 400 \\times 1000 \\times \\pi \\times (0.02)^2}{0.5}\\).",
          "Answer: \\(M = 1.26 \\times 10^{-3}\\) H.",
        ],
        answer: "\\(1.26 \\times 10^{-3}\\) H (1.26 mH)",
      },
      selfCheckExample: {
        prompt:
          "A long solenoid has 2000 turns per metre and a radius of 2 cm. A coil of 50 turns is wound tightly round its middle. Find their mutual inductance.",
        steps: [
          "The coil links the solenoid's flux, which fills only the solenoid's own cross-section.",
          "\\(M = \\mu_0 n N \\pi r^2 = 4\\pi \\times 10^{-7} \\times 2000 \\times 50 \\times \\pi \\times (0.02)^2 = 1.58 \\times 10^{-4}\\) H.",
        ],
        answer: "\\(1.58 \\times 10^{-4}\\) H",
      },
      practiceSet: [
        { prompt: "Name the SI unit of mutual inductance.", answer: "The henry (H)" },
        { prompt: "Give two factors on which the mutual inductance of two coils depends.", answer: "Any two of: the turns and sizes of the coils, their separation, their relative orientation and the core material" },
        { prompt: "Does the mutual inductance of two coils depend on the currents in them?", answer: "No. It depends only on the coils and the medium" },
        { prompt: "An iron core of relative permeability 500 fills two coaxial solenoids whose mutual inductance in air is 2 mH. Find the new mutual inductance.", answer: "1 H" },
      ],
      pyqExampleId: "bff457ec-6c6a-411e-9fd8-5916e41993b4",
      traps: [
        {
          title: "Using the larger radius",
          body: "The flux through the inner solenoid uses its own area, \\(\\pi r_1^2\\). When a coil is wound round a solenoid, use the solenoid's area too, because the field outside a long solenoid is nearly zero.",
        },
        {
          title: "A definition with no unit",
          body: "When the board says 'define and write its SI unit', the henry is a mark of its own. Write it.",
        },
        {
          title: "Mixing n and N",
          body: "n is turns per unit length and N = nl is the total. \\(\\mu_0 n_1 n_2 \\pi r_1^2 l\\) and \\(\\mu_0 N_1 N_2 \\pi r_1^2 / l\\) are the same thing; do not mix the two.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpei-mutual-coils",
      name: "Two concentric coils and the emf of mutual induction",
      intuition:
        "For a small loop at the centre of a big one, send the current through the big loop. Its field at the centre is easy to write, and over the small loop it is nearly uniform. Because \\(M_{12} = M_{21}\\), that one answer serves both ways round. Once M is known, a changing current in one coil gives an emf \\(M\\,dI/dt\\) in the other.",
      definition:
        "- Small coil of radius \\(r_1\\) at the centre of a large coaxial coil of radius \\(r_2\\), with \\(r_1 \\ll r_2\\):\n" +
        "- Field at the centre of the large coil: \\(B_2 = \\dfrac{\\mu_0 I_2}{2r_2}\\), taken as uniform over the small coil.\n" +
        "- Flux through the small coil: \\(\\Phi_1 = \\pi r_1^2 B_2 = \\dfrac{\\mu_0\\pi r_1^2}{2r_2}I_2\\), so \\(M = \\dfrac{\\mu_0\\pi r_1^2}{2r_2}\\).\n" +
        "- With \\(N_1\\) and \\(N_2\\) turns: \\(M = \\dfrac{\\mu_0 N_1 N_2 \\pi r_1^2}{2r_2}\\).\n" +
        "- **Emf of mutual induction:** \\(\\varepsilon_2 = -M\\dfrac{dI_1}{dt}\\). For a current \\(I_0\\sin\\omega t\\), the peak emf is \\(M\\omega I_0\\).\n" +
        "- A graph of flux in one coil against current in the other is a straight line through the origin; its slope is M.",
      formula: {
        label: "Concentric coils and mutual induction",
        latex: "M = \\frac{\\mu_0 N_1 N_2 \\pi r_1^2}{2 r_2}, \\qquad |\\varepsilon_2| = M\\frac{dI_1}{dt}",
      },
      authoredExample: {
        prompt:
          "A coil of 20 turns and radius 1 cm sits at the centre of a coaxial coil of 100 turns and radius 20 cm. Find their mutual inductance, and the emf in the small coil when the current in the large coil changes at 40 A/s.",
        steps: [
          "Given: \\(N_1 = 20\\), \\(r_1 = 0.01\\) m, \\(N_2 = 100\\), \\(r_2 = 0.20\\) m. Since \\(r_1 \\ll r_2\\), the large coil's field is uniform over the small one.",
          "Formula: \\(M = \\dfrac{\\mu_0 N_1 N_2 \\pi r_1^2}{2r_2}\\).",
          "Substitution: \\(M = \\dfrac{4\\pi \\times 10^{-7} \\times 20 \\times 100 \\times \\pi \\times (0.01)^2}{2 \\times 0.20} = 1.97 \\times 10^{-6}\\) H.",
          "Emf: \\(|\\varepsilon| = M\\dfrac{dI}{dt} = 1.97 \\times 10^{-6} \\times 40 = 7.9 \\times 10^{-5}\\) V.",
        ],
        answer: "\\(M = 1.97 \\times 10^{-6}\\) H; emf \\(7.9 \\times 10^{-5}\\) V",
      },
      selfCheckExample: {
        prompt: "The current in one coil changes at 12 A/s and induces an emf of 9 mV in a nearby coil. Find their mutual inductance.",
        steps: ["\\(M = \\dfrac{|\\varepsilon|}{dI/dt} = \\dfrac{9 \\times 10^{-3}}{12}\\).", "\\(M = 7.5 \\times 10^{-4}\\) H."],
        answer: "0.75 mH",
      },
      practiceSet: [
        { prompt: "Why is the field of the large coil taken as uniform over the small coil?", answer: "The small coil's radius is tiny compared with the large coil's, so the field hardly changes across it" },
        { prompt: "Two coils have a mutual inductance of 30 mH. The current in one falls from 6 A to zero in 0.2 s. Find the average emf in the other.", answer: "0.9 V" },
        { prompt: "A graph of flux in coil 2 against current in coil 1 is a straight line through the origin. What does its slope give?", answer: "The mutual inductance" },
      ],
      pyqExampleId: "7fa5a51d-491e-4c8c-a711-f49a8506f602",
      traps: [
        {
          title: "Sending the current through the small coil",
          body: "Pass the current through the LARGE coil: its field at the centre is known and uniform over the small one. The small coil's field over the large one is not uniform and has no simple answer. Then use \\(M_{12} = M_{21}\\).",
        },
        {
          title: "Forgetting milli",
          body: "20 mH is 0.02 H. Leaving it as 20 makes the emf a thousand times too large.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpei-self",
      name: "Self-inductance of a long solenoid",
      intuition:
        "A coil's own changing current changes its own flux, so it induces an emf in itself. This back emf always opposes the change: it fights a rising current and tries to keep a falling one going. Self-inductance plays the part of inertia, as mass does in mechanics.",
      definition:
        "- **Self-inductance:** \\(N\\Phi_B = LI\\). It is the flux linkage with a coil per unit current in it; equally, the magnitude of the emf induced when its current changes at 1 A/s, since \\(\\varepsilon = -L\\dfrac{dI}{dt}\\). SI unit: henry. Dimensions \\([\\text{M L}^2\\text{T}^{-2}\\text{A}^{-2}]\\).\n" +
        "- **Derivation** (long solenoid of area A and length l, with n turns per unit length, so N = nl):\n" +
        "- Field inside, neglecting edge effects: \\(B = \\mu_0 n I\\).\n" +
        "- Flux linkage: \\(N\\Phi_B = (nl)(\\mu_0 n I)(A) = \\mu_0 n^2 A l\\,I\\).\n" +
        "- So \\(L = \\mu_0 n^2 A l = \\dfrac{\\mu_0 N^2 A}{l}\\).\n" +
        "- With a core of relative permeability \\(\\mu_r\\), such as soft iron: \\(L = \\mu_r\\mu_0 n^2 A l\\). L depends on the geometry and the core, not on the current.\n" +
        "- A graph of induced emf against rate of change of current is a straight line through the origin; its slope is L, so the steeper line is the iron-cored coil.\n" +
        "- Board 2023 asked for L from a coil's ac and dc readings: the dc readings give R, the ac readings give the impedance Z, and \\(\\omega L = \\sqrt{Z^2 - R^2}\\) (from the Alternating Current chapter).",
      formula: {
        label: "Long solenoid",
        latex: "L = \\mu_0 n^2 A l = \\frac{\\mu_0 N^2 A}{l}, \\qquad |\\varepsilon| = L\\frac{dI}{dt}",
      },
      authoredExample: {
        prompt:
          "An air-cored solenoid 40 cm long has 800 turns and an area of cross-section of 5 cm². Find its self-inductance, and the average emf induced when its current falls steadily from 3 A to 1 A in 20 ms.",
        steps: [
          "Given: \\(l = 0.40\\) m, \\(N = 800\\), \\(A = 5 \\times 10^{-4}\\ \\text{m}^2\\).",
          "Formula: \\(L = \\dfrac{\\mu_0 N^2 A}{l} = \\dfrac{4\\pi \\times 10^{-7} \\times 800^2 \\times 5 \\times 10^{-4}}{0.40} = 1.0 \\times 10^{-3}\\) H.",
          "Rate of change of current: \\(\\dfrac{3 - 1}{20 \\times 10^{-3}} = 100\\ \\text{A s}^{-1}\\).",
          "Emf: \\(|\\varepsilon| = L\\dfrac{dI}{dt} = 1.0 \\times 10^{-3} \\times 100 = 0.1\\) V.",
        ],
        answer: "\\(L = 1.0 \\times 10^{-3}\\) H; emf 0.1 V",
      },
      selfCheckExample: {
        prompt: "The current in a coil of inductance 40 mH rises steadily from 1 A to 4 A in 0.06 s. Find the induced emf.",
        steps: ["\\(\\dfrac{dI}{dt} = \\dfrac{3}{0.06} = 50\\ \\text{A s}^{-1}\\).", "\\(|\\varepsilon| = 0.04 \\times 50 = 2\\) V."],
        answer: "2 V",
      },
      practiceSet: [
        { prompt: "The number of turns of a solenoid is doubled, its length and area kept the same. What happens to L?", answer: "It becomes four times as large" },
        { prompt: "Write the dimensions of self-inductance.", answer: "\\([\\text{M L}^2\\text{T}^{-2}\\text{A}^{-2}]\\)" },
        { prompt: "Which has the larger self-inductance: an iron-cored or an air-cored solenoid of the same size?", answer: "The iron-cored one, because the relative permeability of iron is large" },
        { prompt: "Why is the self-induced emf also called the back emf?", answer: "It opposes any change in the current in the circuit" },
      ],
      pyqExampleId: "03d3ec99-31e8-4912-af09-100a60f8de44",
      traps: [
        {
          title: "N once instead of twice",
          body: "N enters twice: once in the field \\(\\mu_0 N I/l\\) and once in the flux linkage. So \\(L \\propto N^2\\), not N.",
        },
        {
          title: "Milliseconds left as seconds",
          body: "A change in 5 ms is a change in \\(5 \\times 10^{-3}\\) s. Using 5 s makes the rate of change, and so the emf, a thousand times too small.",
        },
        {
          title: "Definition without 'unit current'",
          body: "Say 'the flux linked with the coil when unit current flows through it', or 'the emf induced when the current changes at unit rate'. 'The flux in a coil' alone does not earn the mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpei-energy",
      name: "Energy stored in an inductor and magnetic energy density",
      intuition:
        "To build up a current in a coil, the source must push against the back emf the whole time the current is rising. That work is not lost: it is stored in the magnetic field, and it comes back when the current is switched off. It is the electrical twin of kinetic energy, with L in place of m.",
      definition:
        "- **Derivation of the energy:**\n" +
        "- While the current grows, the back emf is \\(|\\varepsilon| = L\\dfrac{dI}{dt}\\).\n" +
        "- Rate of doing work against it: \\(\\dfrac{dW}{dt} = |\\varepsilon| I = LI\\dfrac{dI}{dt}\\), so \\(dW = LI\\,dI\\).\n" +
        "- Total work: \\(W = \\displaystyle\\int_0^I LI\\,dI = \\dfrac{1}{2}LI^2\\). This is the energy stored.\n" +
        "- **Energy density** (long air-cored solenoid): put \\(I = \\dfrac{B}{\\mu_0 n}\\) and \\(L = \\mu_0 n^2 A l\\) into \\(\\frac{1}{2}LI^2\\) to get \\(U_B = \\dfrac{B^2}{2\\mu_0}Al\\). Dividing by the volume Al gives \\(u_B = \\dfrac{B^2}{2\\mu_0}\\).\n" +
        "- Compare the electric field, \\(u_E = \\frac{1}{2}\\varepsilon_0 E^2\\): in both cases the energy density is proportional to the square of the field.\n" +
        "- Graphs: energy against current is a parabola, steeper for the larger L; induced emf against rate of change of current is a straight line through the origin, steeper for the larger L.",
      formula: {
        label: "Energy in an inductor",
        latex: "U = \\frac{1}{2}LI^2, \\qquad u_B = \\frac{B^2}{2\\mu_0}",
      },
      authoredExample: {
        prompt:
          "A coil of inductance 0.2 H carries a current that rises from zero to 3 A. Find the energy stored. What current would store four times as much energy?",
        steps: [
          "Given: \\(L = 0.2\\) H, \\(I = 3\\) A.",
          "Formula: \\(U = \\dfrac{1}{2}LI^2\\).",
          "Substitution: \\(U = \\dfrac{1}{2} \\times 0.2 \\times 3^2 = 0.9\\) J.",
          "U is proportional to \\(I^2\\), so four times the energy needs twice the current: 6 A.",
        ],
        answer: "0.9 J; 6 A",
      },
      selfCheckExample: {
        prompt: "Find the magnetic energy density in a field of 0.5 T in air.",
        steps: ["\\(u_B = \\dfrac{B^2}{2\\mu_0} = \\dfrac{(0.5)^2}{2 \\times 4\\pi \\times 10^{-7}}\\).", "\\(u_B = 9.9 \\times 10^{4}\\ \\text{J m}^{-3}\\)."],
        answer: "About \\(1.0 \\times 10^{5}\\ \\text{J m}^{-3}\\)",
      },
      practiceSet: [
        { prompt: "Inductors of 5 mH and 15 mH carry the same current. Which stores more energy, and by what factor?", answer: "The 15 mH inductor, three times as much" },
        { prompt: "The current in an inductor is doubled. What happens to the energy stored?", answer: "It becomes four times as large" },
        { prompt: "Self-inductance is the electrical analogue of which mechanical quantity?", answer: "Mass (inertia)" },
      ],
      pyqExampleId: "4fa79e4c-e098-478f-bbb0-85b0e8da14ea",
      traps: [
        {
          title: "Dropping the half",
          body: "Integrating \\(LI\\,dI\\) from 0 to I gives \\(\\frac{1}{2}LI^2\\). Writing \\(LI^2\\) loses the result mark.",
        },
        {
          title: "Graphs with no labels",
          body: "For 'draw graphs', label both axes and mark which line or curve belongs to which inductor. The graph itself carries the marks.",
        },
      ],
    },
  ],
};
