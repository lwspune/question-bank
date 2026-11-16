import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_EI_FARADAY_NOTE: SubtopicNote = {
  subtopicName: "Induced EMF and Lenz's Law",
  title: "Induced EMF and Lenz's Law",
  oneLineDefinition:
    "Magnetic flux Φ = BA cos θ, the emf ε = −N dΦ/dt induced when that flux changes, Lenz's law for its direction and eddy currents, the emf Blv of a moving rod, and the emf NBAω sin ωt of a rotating coil.",
  whyItMatters:
    "Six NEET questions from 2022 to 2026: two each from 2022, 2024 and 2026. Two use flux and Faraday's law (the flux through a square loop in 2022, the power in a loop whose area changes with time in Re-NEET 2026), two use Lenz's law (the current in two solenoids as a magnet moves between them, and which sheets near a magnet pole need a force, both in 2024), one asks for the emf across the cut in a loop leaving a field (2026) and one for the peak current in a rotating coil (2022).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphei-flux",
      name: "Magnetic flux and Faraday's law",
      intuition:
        "Magnetic flux counts how much field passes through a loop: the field times the area, times the cosine of the angle between the field and the loop's normal. A steady flux, however large, does nothing. When the flux changes, an emf appears in the loop, and the faster the change, the bigger the emf. The flux can change because the field changes, because the area changes, or because the loop turns.",
      definition:
        "- Flux: \\(\\Phi = BA\\cos\\theta\\), with \\(\\theta\\) the angle between \\(\\vec B\\) and the normal to the loop. SI unit: the weber, \\(1\\ \\text{Wb} = 1\\ \\text{T m}^{2}\\).\n" +
        "- Plane of the loop perpendicular to B: \\(\\theta = 0\\) and \\(\\Phi = BA\\). Plane parallel to B: \\(\\Phi = 0\\).\n" +
        "- **Faraday's law**: \\(\\varepsilon = -\\dfrac{d\\Phi}{dt}\\); for a coil of N turns, \\(\\varepsilon = -N\\dfrac{d\\Phi}{dt}\\). Over a finite change, the average emf is \\(N\\,\\Delta\\Phi/\\Delta t\\).\n" +
        "- The flux changes if B, A or \\(\\theta\\) changes. Field changing, area fixed and normal to B: \\(\\varepsilon = NA\\,\\dfrac{dB}{dt}\\).\n" +
        "- In a closed loop of resistance R: current \\(I = \\varepsilon/R\\) and power \\(P = \\varepsilon^{2}/R\\).",
      formula: {
        label: "Flux and Faraday's law",
        latex: "\\Phi = BA\\cos\\theta, \\qquad \\varepsilon = -N\\frac{d\\Phi}{dt}, \\qquad P = \\frac{\\varepsilon^{2}}{R}",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle between the field and the normal to the loop" },
          { symbol: "\\(N\\)", meaning: "number of turns" },
          { symbol: "\\(R\\)", meaning: "resistance of the closed loop" },
        ],
      },
      authoredExample: {
        prompt:
          "A coil of 200 turns and area \\(0.02\\ \\text{m}^{2}\\) has its plane perpendicular to a uniform field. The field falls steadily from 0.5 T to 0.1 T in 0.4 s. The coil's resistance is 4 Ω. Find the induced emf, the current and the power.",
        steps: [
          "Only B changes: \\(\\dfrac{\\Delta B}{\\Delta t} = \\dfrac{0.5 - 0.1}{0.4} = 1\\ \\text{T/s}\\).",
          "\\(\\varepsilon = NA\\,\\dfrac{\\Delta B}{\\Delta t} = 200 \\times 0.02 \\times 1 = 4\\ \\text{V}\\).",
          "\\(I = \\dfrac{4}{4} = 1\\ \\text{A}\\), and \\(P = \\dfrac{\\varepsilon^{2}}{R} = \\dfrac{16}{4} = 4\\ \\text{W}\\).",
        ],
        answer: "4 V, 1 A, 4 W",
      },
      selfCheckExample: {
        prompt:
          "The flux through a single loop is \\(\\Phi = (3t^{2} + 2t)\\ \\text{Wb}\\), with t in seconds. Find the size of the induced emf at \\(t = 2\\ \\text{s}\\).",
        steps: [
          "\\(\\dfrac{d\\Phi}{dt} = 6t + 2\\).",
          "At \\(t = 2\\): \\(6 \\times 2 + 2 = 14\\), so \\(|\\varepsilon| = 14\\ \\text{V}\\).",
        ],
        answer: "14 V",
      },
      practiceSet: [
        { prompt: "What is the SI unit of magnetic flux, and how is it related to the tesla?", answer: "The weber: \\(1\\ \\text{Wb} = 1\\ \\text{T m}^{2}\\)" },
        { prompt: "A loop lies with its plane parallel to a uniform magnetic field. What is the flux through it?", answer: "Zero" },
        { prompt: "An induced emf of 2 V drives a current round a closed loop of resistance 4 Ω. What power is dissipated in the loop?", answer: "1 W", method: "\\(P = \\varepsilon^{2}/R = 4/4\\)." },
        { prompt: "Name the three quantities whose change can change the magnetic flux through a coil.", answer: "The field B, the area A and the angle \\(\\theta\\) between the field and the normal" },
      ],
      pyqExampleId: "28471427-2584-45eb-9b99-cdd56a6c5acd",
      traps: [
        {
          title: "The angle is measured from the normal",
          body: "In \\(\\Phi = BA\\cos\\theta\\) the angle is between the field and the NORMAL to the loop. A loop whose plane is perpendicular to the field has \\(\\theta = 0\\) and the full flux BA, not zero.",
        },
        {
          title: "Emf comes from a change, not from the flux",
          body: "A large flux that stays constant induces no emf at all. A small flux that changes quickly can induce a large one. The emf is \\(d\\Phi/dt\\), not \\(\\Phi\\).",
        },
        {
          title: "Power is never negative",
          body: "The power in the loop is \\(\\varepsilon^{2}/R\\). If the emf varies as \\(\\cos t\\), the power varies as \\(\\cos^{2} t\\): it falls to zero where the emf is zero and is positive everywhere else.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nphei-lenz",
      name: "Lenz's law and eddy currents",
      intuition:
        "The induced current always makes a field that fights the change in flux. Push a magnet towards a coil and the coil pushes back; pull it away and the coil pulls it back. This is energy conservation at work: you must do work against that opposing force, and the work turns into electrical energy. The same opposition acts inside a solid piece of metal, where the induced currents swirl round in loops called eddy currents.",
      definition:
        "- **Lenz's law**: the induced emf drives a current that opposes the change in magnetic flux that produced it. It is the minus sign in \\(\\varepsilon = -d\\Phi/dt\\), and it follows from conservation of energy.\n" +
        "- Looking at one face of a coil: an anticlockwise current makes that face a north pole, a clockwise current a south pole.\n" +
        "- Steps for a direction: which way does the flux point, is it growing or falling, the induced field points against a growth and along a fall, then the right-hand rule gives the current.\n" +
        "- **Eddy currents** are induced in a bulk piece of conductor when the flux through it changes. They oppose the motion that causes them and heat the metal.\n" +
        "- Cutting slots in a metal plate, or building a core from thin insulated sheets, breaks up the eddy-current paths and makes them smaller.\n" +
        "- Uses of eddy currents: electromagnetic damping (a swinging metal plate between magnet poles soon stops), magnetic braking in some trains, and induction furnaces that melt metals.",
      table: {
        columns: ["Situation", "What the flux does", "What happens"],
        rows: [
          { cells: ["North pole pushed towards a coil", "Flux through the coil grows", "Near face becomes a north pole; the magnet is repelled"] },
          { cells: ["North pole pulled away from a coil", "Flux through the coil falls", "Near face becomes a south pole; the magnet is attracted back"] },
          { cells: ["South pole pushed towards a coil", "Flux through the coil grows", "Near face becomes a south pole; the magnet is repelled"] },
          { cells: ["Magnet held at rest near a coil", "Stays the same", "No emf and no current"] },
          {
            cells: ["Conducting sheet moved near a strong magnet pole", "Changes in parts of the sheet", "Eddy currents oppose the motion, so a force is needed even to move it at steady speed"],
            pyqExampleId: "79dabdd3-9c37-410d-8637-5479f6c60420",
            noteAmber: "NEET 2024: of four sheets near a strong pole, a force is needed to hold a magnetic one and to move a conducting one at uniform speed.",
          },
          { cells: ["Non-conducting, non-magnetic sheet near a magnet", "No current can flow in it", "No eddy currents and no magnetic force"] },
          { cells: ["Metal plate swinging between magnet poles", "Changes as the plate swings", "Eddy currents damp it quickly; a slotted plate swings much longer"] },
        ],
        caption: "The induced current opposes the change in flux, never the flux itself.",
      },
      selfCheckExample: {
        prompt:
          "A light copper ring hangs from a thread. The north pole of a bar magnet, held close to the ring, is pulled quickly away along the ring's axis. Which way does the ring move, and why?",
        steps: [
          "The flux from the magnet through the ring falls.",
          "The ring's current opposes the fall, so the face nearest the magnet becomes a south pole.",
          "A south pole is attracted to the magnet's north pole.",
        ],
        answer: "It moves after the magnet, because the near face of the ring becomes a south pole",
      },
      practiceSet: [
        { prompt: "The north pole of a bar magnet is pushed towards a closed coil. Is the magnet attracted or repelled by the coil?", answer: "Repelled" },
        { prompt: "Which conservation law does Lenz's law follow from?", answer: "Conservation of energy" },
        { prompt: "A solid metal plate and a slotted plate of the same metal swing between the poles of a magnet. Which one stops first?", answer: "The solid plate", method: "Slots break up the eddy-current paths, so the slotted plate is damped less." },
        { prompt: "Looking at one face of a coil, the current flows anticlockwise. Which pole is that face?", answer: "A north pole" },
      ],
      pyqExampleId: "79dabdd3-9c37-410d-8637-5479f6c60420",
      traps: [
        {
          title: "Opposing the change, not the flux",
          body: "When the flux is growing, the induced field points against it. When the flux is falling, the induced field points the SAME way as the outside field, to keep it up.",
        },
        {
          title: "Holding a sheet still is not induction",
          body: "A magnet attracts an iron sheet, so a force is needed to hold it, but nothing is changing and no current is induced. Induction needs a change of flux, so it acts on a conducting sheet only while it moves.",
        },
        {
          title: "Eddy currents need a conductor",
          body: "An insulator carries no eddy currents, so it feels no magnetic braking. Only a conducting body is slowed by its own induced currents.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphei-motional",
      name: "Motional emf of a moving rod",
      intuition:
        "Move a straight conductor across a magnetic field and the field pushes the free charges inside it along its length. Charges pile up at the ends, so the rod becomes a small cell of emf Blv. If the rod is part of a closed circuit, a current flows, and the field then pushes on that current in the direction that opposes the motion. You have to keep pulling to keep it moving.",
      definition:
        "- A rod of length l moving with speed v, with B, l and v all perpendicular to one another: \\(\\varepsilon = Blv\\).\n" +
        "- If the rod moves along its own length, no emf appears between its ends.\n" +
        "- Rod sliding on rails, circuit resistance R: \\(I = \\dfrac{Blv}{R}\\). The field pushes on the current with \\(F = BIl = \\dfrac{B^{2}l^{2}v}{R}\\), opposite to the motion. Power to keep it moving: \\(Fv = \\dfrac{B^{2}l^{2}v^{2}}{R}\\).\n" +
        "- A loop moving out of (or into) a field: only the side that cuts the field lines matters, so l is the side perpendicular to the velocity.\n" +
        "- A closed loop moving wholly inside a uniform field keeps the same flux, so it has no net emf.",
      formula: {
        label: "Motional emf",
        latex: "\\varepsilon = Blv, \\qquad I = \\frac{Blv}{R}, \\qquad F = \\frac{B^{2}l^{2}v}{R}",
        symbols: [
          { symbol: "\\(l\\)", meaning: "length of the conductor that cuts the field, perpendicular to v" },
          { symbol: "\\(v\\)", meaning: "speed of the conductor" },
        ],
      },
      authoredExample: {
        prompt:
          "A straight rod 40 cm long moves at 10 m/s, at right angles to itself and to a uniform field of 0.25 T. Find the emf between its ends. If its ends are joined by a wire so that the whole circuit has resistance 5 Ω, what current flows?",
        steps: [
          "\\(\\varepsilon = Blv = 0.25 \\times 0.4 \\times 10 = 1\\ \\text{V}\\).",
          "\\(I = \\dfrac{\\varepsilon}{R} = \\dfrac{1}{5} = 0.2\\ \\text{A}\\).",
        ],
        answer: "1 V and 0.2 A",
      },
      selfCheckExample: {
        prompt:
          "A rod 20 cm long slides at a steady 5 m/s along two rails in a field of 0.5 T perpendicular to the plane of the rails. The circuit has resistance 0.25 Ω. What power must be supplied to keep the rod moving?",
        steps: [
          "\\(\\varepsilon = 0.5 \\times 0.2 \\times 5 = 0.5\\ \\text{V}\\), so \\(I = 0.5/0.25 = 2\\ \\text{A}\\).",
          "Opposing force \\(F = BIl = 0.5 \\times 2 \\times 0.2 = 0.2\\ \\text{N}\\).",
          "\\(P = Fv = 0.2 \\times 5 = 1\\ \\text{W}\\). Check: \\(\\varepsilon^{2}/R = 0.25/0.25 = 1\\ \\text{W}\\).",
        ],
        answer: "1 W",
      },
      practiceSet: [
        { prompt: "A rod 0.5 m long moves at 2 m/s at right angles to itself and to a field of 0.1 T. What emf is induced between its ends?", answer: "0.1 V" },
        { prompt: "A rod moves along its own length through a uniform magnetic field. What emf appears between its ends?", answer: "Zero" },
        { prompt: "A closed wire loop moves at a steady speed while staying wholly inside a uniform magnetic field. Is a current induced in it?", answer: "No: the flux through it does not change" },
        { prompt: "A rod slides on rails in a fixed field, with the same circuit, at twice the speed. By what factor does the opposing magnetic force change?", answer: "2 times", method: "\\(F = B^{2}l^{2}v/R\\), so \\(F \\propto v\\)." },
      ],
      pyqExampleId: "8fd77ec6-cf55-4dbe-8738-b86913052108",
      traps: [
        {
          title: "Using the wrong side of the loop",
          body: "For a rectangular loop leaving a field, the emf is Blv with l the side that cuts the field lines, the one perpendicular to the velocity. The sides moving along their own length add nothing.",
        },
        {
          title: "A loop wholly inside the field",
          body: "Each side of a loop moving inside a uniform field has its own Blv, but the two cancel round the loop. The flux does not change, so no current flows.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphei-generator",
      name: "Emf of a rotating coil (AC generator)",
      intuition:
        "Turn a coil in a steady magnetic field and the angle between the field and its normal keeps changing, so the flux keeps changing. The emf swings up and down as a sine wave: this is how an AC generator works. The emf is largest when the coil's plane lies along the field, the moment the flux through it is zero but changing fastest.",
      definition:
        "- A coil of N turns and area A turning at angular speed \\(\\omega\\) in a field B, about an axis perpendicular to B: \\(\\Phi = NBA\\cos\\omega t\\).\n" +
        "- Emf: \\(\\varepsilon = NBA\\omega\\sin\\omega t\\), with peak value \\(\\varepsilon_0 = NBA\\omega\\). Peak current \\(I_0 = \\varepsilon_0/R\\).\n" +
        "- Emf is zero when the plane of the coil is perpendicular to B (flux largest), and largest when the plane is parallel to B (flux zero).\n" +
        "- \\(\\omega = 2\\pi\\nu\\), where \\(\\nu\\) is the number of turns per second.\n" +
        "- Only the component of B perpendicular to the axis of rotation changes the flux.",
      formula: {
        label: "AC generator",
        latex: "\\varepsilon = NBA\\omega\\sin\\omega t, \\qquad \\varepsilon_0 = NBA\\omega, \\qquad \\omega = 2\\pi\\nu",
        symbols: [
          { symbol: "\\(\\omega\\)", meaning: "angular speed of the coil" },
          { symbol: "\\(\\nu\\)", meaning: "revolutions per second" },
        ],
      },
      authoredExample: {
        prompt:
          "A coil of 100 turns and area \\(0.05\\ \\text{m}^{2}\\) turns at 50 revolutions per second about an axis perpendicular to a field of 0.1 T. Find the peak emf, and the emf when the coil's normal has turned \\(30^{\\circ}\\) from the field.",
        steps: [
          "\\(\\omega = 2\\pi \\times 50 = 100\\pi\\ \\text{rad/s}\\).",
          "\\(\\varepsilon_0 = NBA\\omega = 100 \\times 0.1 \\times 0.05 \\times 100\\pi = 50\\pi \\approx 157\\ \\text{V}\\).",
          "\\(\\varepsilon = \\varepsilon_0\\sin 30^{\\circ} = 25\\pi \\approx 78.5\\ \\text{V}\\).",
        ],
        answer: "About 157 V, and about 78.5 V",
      },
      selfCheckExample: {
        prompt:
          "The flux through each turn of a 20-turn rotating coil is \\(\\Phi = 0.01\\cos(100t)\\ \\text{Wb}\\). What is the peak emf?",
        steps: [
          "\\(\\varepsilon = -N\\dfrac{d\\Phi}{dt} = 20 \\times 0.01 \\times 100\\sin(100t)\\).",
          "The peak is \\(20 \\times 0.01 \\times 100 = 20\\ \\text{V}\\).",
        ],
        answer: "20 V",
      },
      practiceSet: [
        { prompt: "A generator coil is turned twice as fast, with nothing else changed. By what factor does its peak emf change?", answer: "2 times" },
        { prompt: "At the instant a rotating coil's emf is largest, what is the flux through it?", answer: "Zero" },
        { prompt: "A coil turns at 50 revolutions per second. What is its angular speed?", answer: "\\(100\\pi \\approx 314\\ \\text{rad/s}\\)" },
        { prompt: "Write the emf of a coil of N turns and area A turning at angular speed ω in a field B, timed from the moment its plane is perpendicular to B.", answer: "\\(\\varepsilon = NBA\\omega\\sin\\omega t\\)" },
      ],
      pyqExampleId: "055bf9e3-09cd-49f8-9dbd-684d991efcdc",
      traps: [
        {
          title: "Largest emf at zero flux",
          body: "The emf is largest when the coil's plane lies along the field, where the flux is zero. When the flux is largest, it is momentarily not changing and the emf is zero.",
        },
        {
          title: "Revolutions per second are not radians per second",
          body: "Convert a rate in revolutions per second with \\(\\omega = 2\\pi\\nu\\) before using \\(NBA\\omega\\). Putting \\(\\nu\\) in place of \\(\\omega\\) makes the emf \\(2\\pi\\) times too small.",
        },
        {
          title: "Only the field across the axis counts",
          body: "The part of the field along the axis of rotation never changes the flux. For a coil spun about a vertical axis in the earth's field, only the horizontal component induces an emf.",
        },
      ],
    },
  ],
};
