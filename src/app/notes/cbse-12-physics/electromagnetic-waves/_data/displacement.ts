import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EW_DISPLACEMENT_NOTE: SubtopicNote = {
  subtopicName: "Displacement Current",
  title: "Displacement Current",
  oneLineDefinition:
    "Why Ampere's circuital law gives two answers for a charging capacitor, the displacement current Maxwell added to remove the contradiction, and how conduction and displacement currents together keep the current the same all round a circuit.",
  whyItMatters:
    "19 questions. Thirteen were set in board papers from 2023 to 2026: what displacement current is and how it differs from conduction current (every year from 2023 to 2026), show that it equals ε₀ times the rate of change of electric flux (2026), why the current stays continuous while a capacitor charges (2024, 2025, 2026), the displacement current from a changing field (2025), where a displacement current exists (2023, 2024), and which induced field is easier to observe (2023). The textbook adds two capacitor exercises: the displacement current across the plates, Kirchhoff's junction rule at a plate, and the magnetic field between the plates.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpew-displacement-current",
      name: "Displacement current and the Ampere-Maxwell law",
      intuition:
        "Wrap a loop round the wire that charges a capacitor. Ampere's law says the magnetic field on the loop depends on the current through a surface whose rim is the loop. A flat surface is crossed by the wire, so it gives a field. A pot-shaped surface with the same rim, whose bottom sits between the plates, is crossed by no charge at all, so it gives zero. One loop cannot have two fields. What does cross that second surface is a growing electric field, and Maxwell counted its rate of change as a current.",
      definition:
        "The board asks this as a derivation. Write it in these steps:\n" +
        "- Ampere's circuital law: \\(\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 i(t)\\). For a circular loop of radius r round the wire, a flat surface crossed by the wire gives \\(B(2\\pi r) = \\mu_0 i(t)\\).\n" +
        "- A pot-shaped surface with the same rim and its bottom between the plates is crossed by no current, so the same law gives \\(B = 0\\) at the same point. That is a contradiction.\n" +
        "- The electric field crosses that surface. With plate area A and charge Q, \\(E = \\dfrac{Q}{\\varepsilon_0 A}\\), so by Gauss's law the flux is \\(\\Phi_E = EA = \\dfrac{Q}{\\varepsilon_0}\\).\n" +
        "- As Q changes, \\(\\dfrac{d\\Phi_E}{dt} = \\dfrac{1}{\\varepsilon_0}\\dfrac{dQ}{dt}\\), so \\(\\varepsilon_0 \\dfrac{d\\Phi_E}{dt} = i\\). This is the missing term.\n" +
        "- **Displacement current:** \\(i_d = \\varepsilon_0 \\dfrac{d\\Phi_E}{dt}\\), a current due to an electric field changing with time.\n" +
        "- **Ampere-Maxwell law:** \\(\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 i_c + \\mu_0 \\varepsilon_0 \\dfrac{d\\Phi_E}{dt}\\). The displacement current is a source of magnetic field in exactly the same way as a conduction current.\n" +
        "- Where the field is steady, as in a conductor with a constant voltage across it, \\(d\\Phi_E/dt = 0\\) and the displacement current is zero.\n" +
        "- A changing magnetic field making an electric field (Faraday's law) and a changing electric field making a magnetic field are now a matching pair. The second is far harder to notice: in empty space its constant is \\(\\mu_0\\varepsilon_0 = 1/c^2\\), a very small number, so the field must change very fast to give a measurable B. The board asked in 2023 which of the two is more easily observed: the induced electric field.",
      formula: {
        label: "Displacement current and the Ampere-Maxwell law",
        latex:
          "i_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}, \\qquad \\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 i_c + \\mu_0\\varepsilon_0 \\frac{d\\Phi_E}{dt}",
      },
      authoredExample: {
        prompt:
          "Each plate of a parallel plate capacitor has an area of 0.05 m². While the capacitor charges, the electric field between the plates grows at \\(2 \\times 10^{8}\\ \\text{V m}^{-1}\\text{s}^{-1}\\). Find the displacement current between the plates. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^2\\text{N}^{-1}\\text{m}^{-2}\\))",
        steps: [
          "Given: \\(A = 0.05\\ \\text{m}^2\\), \\(\\dfrac{dE}{dt} = 2 \\times 10^{8}\\ \\text{V m}^{-1}\\text{s}^{-1}\\).",
          "Formula: \\(i_d = \\varepsilon_0 \\dfrac{d\\Phi_E}{dt}\\). The field is uniform over the fixed area A, so \\(\\Phi_E = EA\\) and \\(i_d = \\varepsilon_0 A \\dfrac{dE}{dt}\\).",
          "Substitution: \\(i_d = (8.85 \\times 10^{-12})(0.05)(2 \\times 10^{8})\\ \\text{A}\\).",
          "\\(0.05 \\times 2 \\times 10^{8} = 10^{7}\\), so \\(i_d = 8.85 \\times 10^{-5}\\ \\text{A}\\).",
        ],
        answer: "\\(i_d = 8.85 \\times 10^{-5}\\) A",
      },
      selfCheckExample: {
        prompt:
          "A battery charges a capacitor with a current of 2 A. Find the displacement current between the plates and the rate of change of electric flux there. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^2\\text{N}^{-1}\\text{m}^{-2}\\))",
        steps: [
          "Between the plates \\(\\varepsilon_0 \\dfrac{d\\Phi_E}{dt} = i\\), so \\(i_d = 2\\) A.",
          "\\(\\dfrac{d\\Phi_E}{dt} = \\dfrac{i_d}{\\varepsilon_0} = \\dfrac{2}{8.85 \\times 10^{-12}} = 2.26 \\times 10^{11}\\ \\text{V m s}^{-1}\\).",
        ],
        answer: "2 A; \\(2.26 \\times 10^{11}\\ \\text{V m s}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "What term did Maxwell add to Ampere's circuital law, and what is it due to?", answer: "The displacement current \\(\\varepsilon_0\\, d\\Phi_E/dt\\), due to an electric field changing with time" },
        { prompt: "Does a displacement current need charges to move?", answer: "No. It exists wherever the electric field changes with time, even in vacuum" },
        { prompt: "In one region \\(E_x = E_0\\cos kz\\); in another \\(E_x = E_0\\cos(kz - \\omega t)\\). In which region is there a displacement current?", answer: "Only in the second, because only its field changes with time" },
        { prompt: "What is the SI unit of displacement current?", answer: "The ampere" },
      ],
      pyqExampleId: "1a7b0bd8-1ad7-4f48-ae92-33e7efa0e189",
      traps: [
        {
          title: "Writing μ₀ in place of ε₀",
          body: "The displacement current is \\(\\varepsilon_0\\, d\\Phi_E/dt\\). The \\(\\mu_0\\) appears only in the Ampere-Maxwell law, where it multiplies both currents. The board sets this as an MCQ with both versions among the options.",
        },
        {
          title: "Changing in space is not changing in time",
          body: "A field such as \\(E_0 \\sin kz\\) varies from place to place but not with time, so it gives no displacement current. Look for t in the expression.",
        },
        {
          title: "Skipping the contradiction in the derivation",
          body: "A 'show that' answer must first show why Ampere's law fails: the flat surface and the pot-shaped surface with the same rim give different fields. Starting straight from \\(\\Phi_E = Q/\\varepsilon_0\\) loses the first step's mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpew-conduction-vs-displacement",
      name: "Conduction current and displacement current compared",
      intuition:
        "Both are currents in the sense that matters for magnetism: each makes a magnetic field round it. They differ in what causes them. A conduction current is charge actually moving through a wire. A displacement current is an electric field changing with time, and it needs no charge to move at all, which is why it can exist in the empty gap of a capacitor.",
      definition:
        "- The board asks 'differentiate between', 'how is it different' or 'one similarity and one dissimilarity'. Write each point for **both** currents.\n" +
        "- In a charging capacitor the conduction current flows in the connecting wires and the displacement current flows in the gap between the plates.",
      table: {
        columns: ["Point", "Conduction current", "Displacement current"],
        rows: [
          { cells: ["Cause", "Flow of charges (free electrons) through a conductor", "An electric field, so an electric flux, changing with time"] },
          { cells: ["Formula", "\\(i_c = \\dfrac{dq}{dt}\\)", "\\(i_d = \\varepsilon_0 \\dfrac{d\\Phi_E}{dt}\\)"] },
          { cells: ["Where it exists", "In conductors, such as the connecting wires", "Wherever the field changes: between capacitor plates, in a dielectric, even in vacuum"] },
          { cells: ["Movement of charge", "Charge is carried along", "No charge moves"] },
          {
            cells: ["Magnetic field", "Produces a magnetic field", "Produces a magnetic field in exactly the same way"],
            pyqExampleId: "7b0a940b-1298-4fab-bae1-8a44a5a67c61",
            noteAmber: "Board 2025 asked one similarity and one dissimilarity. This row is the similarity.",
          },
          { cells: ["With a steady (constant) voltage", "Flows steadily if the path conducts", "Zero, because the field does not change"] },
        ],
      },
      selfCheckExample: {
        prompt: "A battery charges a capacitor. Name the current in (a) the connecting wire and (b) the space between the plates.",
        steps: ["(a) Charge flows in the wire: conduction current.", "(b) No charge crosses the gap, but the field there is changing: displacement current."],
        answer: "(a) Conduction current; (b) displacement current only",
      },
      practiceSet: [
        { prompt: "State one similarity between conduction current and displacement current.", answer: "Both produce a magnetic field" },
        { prompt: "Which of the two currents needs a conducting medium?", answer: "The conduction current" },
        { prompt: "Can a displacement current exist in vacuum?", answer: "Yes, wherever the electric field changes with time" },
      ],
      pyqExampleId: "234c1ffe-3e48-4d55-81cd-1b88912ebbd8",
      traps: [
        {
          title: "Covering one side only",
          body: "'Conduction current is due to moving electrons' is half a point. Add the other side: displacement current is due to a changing electric field and needs no moving charge.",
        },
        {
          title: "Calling displacement current a flow of charge in the gap",
          body: "No charge crosses the gap between the plates. Writing that charges 'jump' or 'leak' across loses the mark: the current there is due only to the changing field.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpew-current-continuity",
      name: "Continuity of current in a charging capacitor",
      intuition:
        "Follow the current round a circuit with a capacitor in it. In the wires it is a flow of charge. At a plate the charge stops, but the field in the gap starts changing at exactly the rate that carries the same current on. So the total current never breaks: it is conduction current in the wires and an equal displacement current in the gap.",
      definition:
        "- Total current \\(i = i_c + i_d = i_c + \\varepsilon_0 \\dfrac{d\\Phi_E}{dt}\\).\n" +
        "- **Outside the plates** (in the wires): only conduction current, \\(i_c = i\\) and \\(i_d = 0\\).\n" +
        "- **Inside the capacitor** (in the gap): no conduction current, \\(i_c = 0\\), and only displacement current, \\(i_d = \\varepsilon_0 \\dfrac{d\\Phi_E}{dt} = \\dfrac{dQ}{dt} = i\\).\n" +
        "- So \\(i_c + i_d\\) has the same value at every point of the circuit. With this total in the Ampere-Maxwell law, every surface on the same loop gives the same B: the field at a point just outside the plates equals the field at a point just inside.\n" +
        "- This holds at every instant, so it holds for an ac source too: the conduction and displacement currents are equal at each moment, and so in rms value.\n" +
        "- **Kirchhoff's junction rule at a plate:** it holds if 'current' means the total. Conduction current arrives along the wire, and an equal displacement current leaves across the gap.\n" +
        "- **Field between circular plates** of radius R, at a distance r from the axis (r < R): a loop of radius r encloses the fraction \\(r^2/R^2\\) of the displacement current, so \\(B(2\\pi r) = \\mu_0 i_d \\dfrac{r^2}{R^2}\\) and \\(B = \\dfrac{\\mu_0 i_d r}{2\\pi R^2}\\).",
      formula: {
        label: "Total current",
        latex: "i = i_c + i_d = i_c + \\varepsilon_0 \\frac{d\\Phi_E}{dt}, \\qquad B = \\frac{\\mu_0 i_d\\, r}{2\\pi R^2}\\ (r < R)",
      },
      authoredExample: {
        prompt:
          "A capacitor of capacitance 20 pF is charged by a constant current of 0.4 A. Find the rate at which the potential difference across it rises, and the displacement current between its plates.",
        steps: [
          "Given: \\(C = 20\\ \\text{pF} = 20 \\times 10^{-12}\\ \\text{F}\\), \\(i = 0.4\\) A.",
          "Formula: \\(Q = CV\\), so \\(i = \\dfrac{dQ}{dt} = C\\dfrac{dV}{dt}\\) and \\(\\dfrac{dV}{dt} = \\dfrac{i}{C}\\).",
          "Substitution: \\(\\dfrac{dV}{dt} = \\dfrac{0.4}{20 \\times 10^{-12}} = 2 \\times 10^{10}\\ \\text{V s}^{-1}\\).",
          "Between the plates \\(i_d = \\varepsilon_0 \\dfrac{d\\Phi_E}{dt} = \\dfrac{dQ}{dt} = i = 0.4\\) A.",
        ],
        answer: "\\(2 \\times 10^{10}\\ \\text{V s}^{-1}\\); displacement current 0.4 A",
      },
      selfCheckExample: {
        prompt:
          "A capacitor has circular plates of radius 10 cm. The displacement current between them is 4 A. Find the magnetic field between the plates at a point 5 cm from the axis. (\\(\\mu_0/2\\pi = 2 \\times 10^{-7}\\ \\text{T m A}^{-1}\\))",
        steps: [
          "\\(B = \\dfrac{\\mu_0}{2\\pi}\\cdot\\dfrac{i_d\\, r}{R^2} = 2 \\times 10^{-7} \\times \\dfrac{4 \\times 0.05}{(0.10)^2}\\).",
          "\\(\\dfrac{0.2}{0.01} = 20\\), so \\(B = 2 \\times 10^{-7} \\times 20 = 4 \\times 10^{-6}\\) T.",
        ],
        answer: "\\(4 \\times 10^{-6}\\) T",
      },
      practiceSet: [
        { prompt: "In the connecting wires of a charging capacitor, which current flows and which is zero?", answer: "Conduction current flows; the displacement current is zero" },
        { prompt: "A capacitor in an ac circuit carries an rms conduction current of 3 mA. What is the rms displacement current between its plates?", answer: "3 mA" },
        { prompt: "Is Kirchhoff's junction rule valid at a capacitor plate?", answer: "Yes, if current means conduction current plus displacement current" },
      ],
      pyqExampleId: "01ef87be-d2fa-4de4-aa45-64d8ea69994a",
      traps: [
        {
          title: "Counting only the conduction current at a plate",
          body: "With conduction current alone, current seems to stop at the plate and the junction rule seems to fail. Count the displacement current leaving across the gap and the rule holds.",
        },
        {
          title: "Taking all of the displacement current for a small loop",
          body: "A loop of radius r inside plates of radius R encloses only the fraction \\(r^2/R^2\\) of the displacement current. Using the whole \\(i_d\\) gives too large a field.",
        },
      ],
    },
  ],
};
