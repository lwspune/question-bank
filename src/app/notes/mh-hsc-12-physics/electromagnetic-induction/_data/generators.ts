import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_EM_GENERATORS_NOTE: SubtopicNote = {
  subtopicName: "Generators, Back emf and Energy Transfer",
  title: "Generators, Back e.m.f. and Energy Transfer",
  oneLineDefinition:
    "How a coil turning in a field makes an alternating e.m.f., why a running motor sets up a back e.m.f., and how the work done in moving a loop through a field becomes heat.",
  whyItMatters:
    "2 questions, both from the textbook; none of the board papers in this bank set this section. They ask for the peak e.m.f. of a semicircular wire spun about its diameter and the e.m.f. of a generator's armature at one instant.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpem-ac-generator",
      name: "The a.c. generator",
      intuition:
        "A generator is a motor run backwards. Something turns the coil, its sides cut the field lines, and an e.m.f. appears. As the coil turns, the flux through it rises and falls, so the e.m.f. swings between plus and minus: alternating current. The e.m.f. is largest when the flux is zero, because that is where the flux is changing fastest.",
      definition:
        "- An electric generator is built like a motor, but its armature is turned by an outside agent.\n" +
        "- A coil of N turns and area A turns with angular velocity \\(\\omega\\) in a uniform field B. At time t the angle between B and the area vector is \\(\\theta = \\omega t\\), so the flux through one turn is \\(\\phi = BA\\cos\\omega t\\).\n" +
        "- By Faraday's law, \\(e = -N\\dfrac{d}{dt}(BA\\cos\\omega t) = NBA\\omega\\sin\\omega t\\).\n" +
        "- Peak value \\(e_0 = NBA\\omega\\), so \\(e = e_0\\sin\\omega t = e_0\\sin 2\\pi f t\\), with f the frequency of rotation.\n" +
        "- The e.m.f. is greatest at \\(\\theta = 90^\\circ\\) and \\(270^\\circ\\) (plane of the coil along the field) and zero at \\(0^\\circ\\) and \\(180^\\circ\\). Its polarity reverses every half turn: alternating current. Domestic supply is at 50 cycles per second.\n" +
        "- A commutator reverses the connections every half turn, so the output becomes pulsating d.c.",
      formula: {
        label: "E.m.f. of a rotating coil",
        latex: "e = NBA\\omega\\sin\\omega t, \\qquad e_0 = NBA\\omega",
      },
      authoredExample: {
        prompt:
          "A coil of 100 turns, each of area 0.02 m², rotates at 50 revolutions per second about an axis perpendicular to a uniform magnetic field of 0.1 T. Find the peak e.m.f.",
        steps: [
          "Given: \\(N = 100\\), \\(A = 0.02\\) m², \\(f = 50\\) rev/s, \\(B = 0.1\\) T.",
          "\\(\\omega = 2\\pi f = 2\\pi \\times 50 = 314.2\\) rad/s.",
          "Formula: \\(e_0 = NBA\\omega\\).",
          "Substitution: \\(e_0 = 100 \\times 0.1 \\times 0.02 \\times 314.2 = 62.8\\) V.",
        ],
        answer: "62.8 V",
      },
      selfCheckExample: {
        prompt:
          "A generator coil has a peak e.m.f. of 100 V. Find the e.m.f. at the instant the angle between the field and the coil's area vector is 30°.",
        steps: ["\\(e = e_0\\sin\\theta = 100 \\times \\sin 30^\\circ\\).", "\\(e = 50\\) V."],
        answer: "50 V",
      },
      practiceSet: [
        { prompt: "At what positions of a rotating coil is the induced e.m.f. greatest?", answer: "When the plane of the coil is along the field (\\(\\theta = 90^\\circ\\) or \\(270^\\circ\\)), where the flux changes fastest" },
        { prompt: "How does the peak e.m.f. of a generator change if the coil turns twice as fast?", answer: "It doubles, since \\(e_0 = NBA\\omega\\)" },
        { prompt: "Which part of a generator turns its output into pulsating d.c.?", answer: "The commutator" },
      ],
      pyqExampleId: "27b4396f-e3d4-4142-9397-c9b561935c3e",
      traps: [
        {
          title: "Largest e.m.f. at largest flux",
          body: "When the coil faces the field square on, the flux is largest but is not changing at that instant, so the e.m.f. is zero. The e.m.f. peaks when the flux is zero.",
        },
        {
          title: "Frequency used as ω",
          body: "The formula needs \\(\\omega = 2\\pi f\\) in radian per second. Putting f in its place makes the answer \\(2\\pi\\) times too small.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpem-back-emf",
      name: "Armature sides, back e.m.f. and energy transfer",
      intuition:
        "Each side of a turning armature is a rod moving through the field, so only the sides that cut field lines give an e.m.f. The same thing happens inside a running motor: its spinning coil also acts as a generator, and by Lenz's law that e.m.f. pushes back against the current. And whenever a loop is dragged through a field, the work you do turns up as heat in the loop.",
      definition:
        "- A side of an armature of length l moving with speed \\(v = \\omega r\\) has \\(e = Blv\\sin\\theta\\). Sides that move along their own length, or along the field, give no e.m.f.\n" +
        "- **Back e.m.f.:** a running motor cannot switch off its generator action. By Lenz's law, the e.m.f. it induces opposes the armature current. At start-up the armature is not turning, there is no back e.m.f. and the current is large; as the motor speeds up the back e.m.f. rises and the current falls.\n" +
        "- **Energy transfer:** a loop of width L and resistance R is pulled out of a field B at a steady speed v.\n" +
        "- Step 1: \\(e = BLv\\), so \\(i = \\dfrac{BLv}{R}\\).\n" +
        "- Step 2: the force on the side inside the field is \\(F = iLB = \\dfrac{B^2L^2v}{R}\\), and an equal outside force keeps v steady.\n" +
        "- Step 3: mechanical power \\(P = Fv = \\dfrac{B^2L^2v^2}{R}\\); heat produced per second \\(i^2R = \\dfrac{B^2L^2v^2}{R}\\). The two are equal: the work done appears as heat.",
      formula: {
        label: "Power to pull a loop through a field",
        latex: "P = Fv = \\frac{B^2L^2v^2}{R} = i^2R",
      },
      authoredExample: {
        prompt:
          "A rectangular loop of width 10 cm and resistance 0.5 Ω is pulled out of a uniform field of 0.8 T at a steady 2 m/s, with its plane perpendicular to the field. Find the e.m.f., the current, the force needed and the power supplied.",
        steps: [
          "Given: \\(L = 0.1\\) m, \\(R = 0.5\\ \\Omega\\), \\(B = 0.8\\) T, \\(v = 2\\) m/s.",
          "\\(e = BLv = 0.8 \\times 0.1 \\times 2 = 0.16\\) V; \\(i = \\dfrac{0.16}{0.5} = 0.32\\) A.",
          "\\(F = iLB = 0.32 \\times 0.1 \\times 0.8 = 0.0256\\) N.",
          "\\(P = Fv = 0.0256 \\times 2 = 0.0512\\) W. Check: \\(i^2R = (0.32)^2 \\times 0.5 = 0.0512\\) W.",
        ],
        answer: "0.16 V; 0.32 A; 0.0256 N; 0.0512 W",
      },
      selfCheckExample: {
        prompt: "Why does a motor draw its largest current just when it is switched on?",
        steps: [
          "At the start the armature is not turning, so there is no back e.m.f. to oppose the supply.",
          "As it speeds up, the back e.m.f. grows and the current falls.",
        ],
        answer: "There is no back e.m.f. at the start, so only the resistance limits the current",
      },
      practiceSet: [
        { prompt: "A loop is pulled out of a magnetic field twice as fast. By what factor does the power needed change?", answer: "It becomes four times, since \\(P \\propto v^2\\)" },
        { prompt: "Into what form is the work done in pulling a loop out of a magnetic field converted?", answer: "Heat in the loop" },
        { prompt: "What is the back e.m.f. of a motor?", answer: "The e.m.f. induced in the turning armature by its generator action, which opposes the current through it" },
      ],
      pyqExampleId: "d7866101-8f30-4285-ac4e-841fc35fd992",
      traps: [
        {
          title: "Counting every side of the armature",
          body: "Only the sides that cut field lines carry an e.m.f. A side moving along its own length or along the field adds nothing, and neither do the fixed lead wires.",
        },
        {
          title: "Back e.m.f. that helps the current",
          body: "By Lenz's law the back e.m.f. always opposes the current that drives the motor. That is why it reduces the current as the motor speeds up.",
        },
      ],
    },
  ],
};
