import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_EM_FARADAY_NOTE: SubtopicNote = {
  subtopicName: "Faraday's Laws and Magnetic Flux",
  title: "Faraday's Laws and Magnetic Flux",
  oneLineDefinition:
    "Faraday's two laws of electromagnetic induction, magnetic flux and flux linkage, and how to find the e.m.f. induced when the flux through a coil changes.",
  whyItMatters:
    "11 questions. Five were set in board papers: prove the relation between the induced e.m.f. and the rate of change of flux (2018), state Faraday's laws (2025), find the e.m.f. from a flux given as a function of time (2017), the flux linked with a coil of many turns (2023) and the e.m.f. in a search coil pulled out of a field (2024). The textbook adds a square coil in a growing field, a loop whose field is reduced and the electric field set up by a changing field.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpem-faraday-laws",
      name: "Faraday's two laws of induction",
      intuition:
        "Hold a magnet still beside a coil and nothing happens. Move it, and the galvanometer kicks. What matters is not how much flux passes through the coil but how fast that flux is changing. Move the magnet faster and the kick is bigger; stop it and the e.m.f. vanishes at once, however strong the field.",
      definition:
        "- **First law:** whenever the magnetic flux linked with a closed circuit changes, an e.m.f. is induced in the circuit. Also, if a conductor cuts magnetic field lines, an e.m.f. is induced between its ends. The e.m.f. lasts only while the flux is changing. This is a qualitative law.\n" +
        "- **Second law:** the magnitude of the induced e.m.f. is directly proportional to the rate of change of magnetic flux linked with the circuit, \\(e \\propto \\dfrac{d\\phi}{dt}\\). In SI units the constant is 1. This is a quantitative law.\n" +
        "- Joined with Lenz's law, \\(e = -\\dfrac{d\\phi}{dt}\\); for a coil of N turns with flux \\(\\phi'\\) through each turn, \\(e = -N\\dfrac{d\\phi'}{dt}\\). The textbook calls this the flux rule. One weber per second is one volt.\n" +
        "- **Proof that \\(e = d\\phi/dt\\) (the board asks you to prove it):** draw a C-shaped frame ABCD in a uniform field \\(B\\) normal to its plane, with a wire BC of length \\(l\\) sliding on it.\n" +
        "- Step 1: when BC is at distance \\(x\\), the area is \\(lx\\), so \\(\\phi = Blx\\) and \\(\\dfrac{d\\phi}{dt} = Bl\\dfrac{dx}{dt} = Blv\\).\n" +
        "- Step 2: a charge \\(q\\) in BC moves with velocity \\(v\\), so the Lorentz force \\(F = qvB\\) acts along the wire.\n" +
        "- Step 3: the work done carrying \\(q\\) along BC is \\(W = Fl = qvBl\\), so the e.m.f. is \\(e = W/q = Blv\\).\n" +
        "- Step 4: comparing, \\(e = \\dfrac{d\\phi}{dt}\\) in magnitude; with Lenz's law and N turns, \\(e = -N\\dfrac{d\\phi}{dt}\\).\n" +
        "- A changing field also sets up an electric field round any closed path, \\(\\oint \\vec{E}\\cdot\\vec{dl} = -\\dfrac{d\\phi_m}{dt}\\) (textbook Exercise Q.17). Inside a circular region of changing field, at radius \\(r\\), this gives \\(E = \\dfrac{r}{2}\\left|\\dfrac{dB}{dt}\\right|\\).",
      formula: {
        label: "Faraday's law with Lenz's sign",
        latex: "e = -N\\frac{d\\phi}{dt}",
        symbols: [
          { symbol: "\\(e\\)", meaning: "induced e.m.f., in volt" },
          { symbol: "\\(N\\)", meaning: "number of turns of the coil" },
          { symbol: "\\(\\dfrac{d\\phi}{dt}\\)", meaning: "rate of change of flux through one turn, in weber per second" },
        ],
      },
      authoredExample: {
        prompt:
          "The magnetic flux through a single loop varies with time as \\(\\phi = (3t^2 + 4t)\\) mWb, where t is in second. Find the magnitude of the e.m.f. induced in the loop at t = 2 s.",
        steps: [
          "Given: \\(\\phi = (3t^2 + 4t)\\) mWb, \\(N = 1\\), \\(t = 2\\) s.",
          "Formula: \\(|e| = \\dfrac{d\\phi}{dt}\\).",
          "Substitution: \\(\\dfrac{d\\phi}{dt} = 6t + 4\\). At \\(t = 2\\) s, \\(\\dfrac{d\\phi}{dt} = 6(2) + 4 = 16\\) mWb/s.",
          "Since 1 Wb/s = 1 V, \\(|e| = 16\\) mV \\(= 0.016\\) V.",
        ],
        answer: "16 mV (0.016 V)",
      },
      selfCheckExample: {
        prompt:
          "The flux through each turn of a 200-turn coil changes at a steady rate of 0.5 mWb per second. Find the magnitude of the induced e.m.f.",
        steps: [
          "\\(|e| = N\\dfrac{d\\phi}{dt} = 200 \\times 0.5 \\times 10^{-3}\\).",
          "\\(|e| = 0.1\\) V.",
        ],
        answer: "0.1 V",
      },
      practiceSet: [
        { prompt: "Which of Faraday's two laws is called the quantitative law, and why?", answer: "The second law, because it gives the magnitude of the induced e.m.f." },
        { prompt: "Show that one weber per second is one volt.", answer: "From \\(e = d\\phi/dt\\), the unit of e.m.f. (volt) equals the unit of flux divided by time, Wb/s" },
        { prompt: "The flux through a loop is \\(\\phi = 2t^3\\) mWb, with t in second. Find the magnitude of the induced e.m.f. at t = 1 s.", answer: "\\(d\\phi/dt = 6t^2 = 6\\) mWb/s, so 6 mV" },
        { prompt: "In the proof of \\(e = d\\phi/dt\\) with a sliding wire, what force drives the free charges along the wire?", answer: "The magnetic (Lorentz) force \\(qvB\\) on the moving charges" },
      ],
      pyqExampleId: "818b8641-890e-4304-a4c2-29827f88f90f",
      traps: [
        {
          title: "Flux instead of change of flux",
          body: "A coil can sit in a very strong field and have no e.m.f. at all. Write 'change of magnetic flux' in the first law. Writing only 'magnetic flux' loses the mark.",
        },
        {
          title: "The proof without its diagram",
          body: "The 'prove theoretically' answer needs the frame ABCD drawn with \\(B\\), \\(v\\), \\(l\\) and \\(x\\) marked. Without the diagram the steps \\(\\phi = Blx\\) and \\(W = qvBl\\) have nothing to refer to.",
        },
        {
          title: "Leaving out the turns",
          body: "Each turn of a coil adds its own e.m.f., so the e.m.f. of a coil is N times that of one turn. Dropping N is the commonest wrong answer in a calculation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpem-flux",
      name: "Magnetic flux and flux linkage",
      intuition:
        "Flux counts how much of a magnetic field passes through an area. Face a loop square on to the field and it catches the most; turn it edge on and it catches none. A coil of many turns catches the same flux in every turn, so the coil as a whole is linked with N times the flux of one turn.",
      definition:
        "- The flux through a small area \\(da\\) is \\(d\\phi = \\vec{B}\\cdot\\vec{da} = B\\,da\\cos\\theta\\), where \\(\\theta\\) is the angle between the field and the normal to the area.\n" +
        "- For a uniform field and a flat area A: \\(\\phi = BA\\cos\\theta\\). If the field is not the same everywhere, the area is split into small pieces and the flux is added (integrated) over them.\n" +
        "- SI unit: the **weber** (Wb), with 1 Wb = 1 T m².\n" +
        "- Field along the normal (the coil's plane perpendicular to the field): \\(\\theta = 0\\), \\(\\phi = BA\\). Field lying in the plane of the coil: \\(\\theta = 90^\\circ\\), \\(\\phi = 0\\).\n" +
        "- **Flux linkage** of a closely wound coil of N turns: \\(N\\phi\\). The induced e.m.f. depends on how this changes.\n" +
        "- Flux can be changed by changing B, the area A, or the angle \\(\\theta\\).",
      formula: {
        label: "Flux and flux linkage",
        latex: "\\phi = BA\\cos\\theta, \\qquad N\\phi = NBA\\cos\\theta",
      },
      authoredExample: {
        prompt:
          "A rectangular coil of 40 turns measures 10 cm by 5 cm and lies in a uniform magnetic field of 0.2 T. The normal to its plane makes an angle of 60° with the field. Find the flux through one turn and the flux linkage of the coil.",
        steps: [
          "Given: \\(N = 40\\), \\(A = 0.10 \\times 0.05 = 5 \\times 10^{-3}\\) m², \\(B = 0.2\\) T, \\(\\theta = 60^\\circ\\).",
          "Formula: \\(\\phi = BA\\cos\\theta\\).",
          "Substitution: \\(\\phi = 0.2 \\times 5 \\times 10^{-3} \\times 0.5 = 5 \\times 10^{-4}\\) Wb.",
          "Flux linkage: \\(N\\phi = 40 \\times 5 \\times 10^{-4} = 0.02\\) Wb.",
        ],
        answer: "\\(5 \\times 10^{-4}\\) Wb through one turn; flux linkage 0.02 Wb",
      },
      selfCheckExample: {
        prompt:
          "A circular loop of radius 10 cm lies with its normal along a uniform field of 0.5 T. Find the flux through it.",
        steps: [
          "\\(A = \\pi r^2 = \\pi (0.1)^2 = 0.0314\\) m²; \\(\\theta = 0\\).",
          "\\(\\phi = BA = 0.5 \\times 0.0314 = 0.0157\\) Wb.",
        ],
        answer: "0.0157 Wb",
      },
      practiceSet: [
        { prompt: "What is the flux through a loop whose plane is parallel to the magnetic field?", answer: "Zero, since \\(\\theta = 90^\\circ\\) and \\(\\cos 90^\\circ = 0\\)" },
        { prompt: "Express one weber in terms of the tesla and the metre.", answer: "1 Wb = 1 T m²" },
        { prompt: "Each turn of a 20-turn coil carries a flux of 3 mWb. Find the flux linkage of the coil.", answer: "\\(20 \\times 3 \\times 10^{-3} = 0.06\\) Wb" },
      ],
      pyqExampleId: "f2c81365-3354-4849-b031-1647a107210c",
      traps: [
        {
          title: "Measuring the angle from the plane",
          body: "In \\(\\phi = BA\\cos\\theta\\), \\(\\theta\\) is measured from the normal to the coil, not from its plane. A field 'perpendicular to the plane' means \\(\\theta = 0\\) and the largest flux.",
        },
        {
          title: "Flux when the question asks for flux linkage",
          body: "Flux is for one turn; flux linkage multiplies it by the number of turns. Read which one the question asks for before you write the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpem-average-emf",
      name: "Average e.m.f. from a change of flux",
      intuition:
        "Many board numericals give a flux at the start and at the end and the time taken. Then you do not need calculus: the average e.m.f. is the change in flux linkage divided by the time. Pulling a coil out of a field takes its flux to zero; turning it over takes the flux to minus its value, which is twice the change.",
      definition:
        "- Average e.m.f.: \\(|e| = \\dfrac{N|\\Delta\\phi|}{\\Delta t} = \\dfrac{N|\\phi_{final} - \\phi_{initial}|}{\\Delta t}\\).\n" +
        "- Area fixed, field changing: \\(|e| = NA\\dfrac{\\Delta B}{\\Delta t}\\).\n" +
        "- Coil pulled right out of the field (or field switched off): \\(\\phi_{final} = 0\\), so \\(N|\\Delta\\phi| = NBA\\).\n" +
        "- Coil turned over, or field reversed: the flux goes from \\(+\\phi\\) to \\(-\\phi\\), so \\(N|\\Delta\\phi| = 2NBA\\).\n" +
        "- Change every area to m² first: 1 cm² = \\(10^{-4}\\) m².",
      formula: {
        label: "Average induced e.m.f.",
        latex: "|e| = \\frac{N|\\Delta\\phi|}{\\Delta t}",
      },
      authoredExample: {
        prompt:
          "A coil of 500 turns, each of area 4 cm², lies with its plane perpendicular to a uniform field of 0.25 T. The field is reduced uniformly to zero in 0.05 s. Find the average e.m.f. induced in the coil.",
        steps: [
          "Given: \\(N = 500\\), \\(A = 4 \\times 10^{-4}\\) m², \\(B\\) falls from 0.25 T to 0, \\(\\Delta t = 0.05\\) s.",
          "Formula: \\(|e| = \\dfrac{NA\\,\\Delta B}{\\Delta t}\\).",
          "Substitution: \\(|e| = \\dfrac{500 \\times 4 \\times 10^{-4} \\times 0.25}{0.05} = \\dfrac{0.05}{0.05}\\).",
          "\\(|e| = 1\\) V.",
        ],
        answer: "1 V",
      },
      selfCheckExample: {
        prompt:
          "A coil of 100 turns and area 50 cm² lies with its plane perpendicular to a field of 0.4 T. It is turned over (through 180°) in 0.1 s. Find the average e.m.f.",
        steps: [
          "The flux goes from \\(+BA\\) to \\(-BA\\), so \\(N|\\Delta\\phi| = 2NBA = 2 \\times 100 \\times 0.4 \\times 50 \\times 10^{-4} = 0.4\\) Wb.",
          "\\(|e| = \\dfrac{0.4}{0.1} = 4\\) V.",
        ],
        answer: "4 V",
      },
      practiceSet: [
        { prompt: "A loop of area 0.5 m² lies normal to a field that rises from 0.2 T to 0.6 T in 2 s. Find the average e.m.f.", answer: "\\(0.5 \\times 0.4 / 2 = 0.1\\) V" },
        { prompt: "A circular coil of 50 turns and area 0.01 m² lies normal to a field that rises uniformly from 0 to 0.4 T in 0.5 s. Find the e.m.f.", answer: "\\(50 \\times 0.01 \\times 0.4 / 0.5 = 0.4\\) V" },
        { prompt: "Why does turning a coil over in a field induce twice the average e.m.f. of pulling it out of the field in the same time?", answer: "The flux changes from \\(+BA\\) to \\(-BA\\), a change of \\(2BA\\), not \\(BA\\)" },
      ],
      pyqExampleId: "ce34c42f-c50c-4849-8d8d-ee560b295e15",
      traps: [
        {
          title: "Area left in cm²",
          body: "An area in cm² must be multiplied by \\(10^{-4}\\) to get m². Leaving it in cm² makes the e.m.f. ten thousand times too large.",
        },
        {
          title: "Forgetting the reversal doubles the change",
          body: "When a field or a current is reversed, the flux does not go to zero; it goes to minus its old value. The change is twice the starting flux.",
        },
      ],
    },
  ],
};
