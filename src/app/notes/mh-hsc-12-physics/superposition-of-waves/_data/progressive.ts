import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_SW_PROGRESSIVE_NOTE: SubtopicNote = {
  subtopicName: "Progressive Waves",
  title: "Progressive Waves and the Wave Equation",
  oneLineDefinition:
    "A wave that carries a disturbance forward through a medium: its equation y = A sin(ωt − kx), how to read the frequency, wavelength, speed and direction from it, phase difference, and the features every progressive wave shares.",
  whyItMatters:
    "10 questions. Four were set in board papers: the minimum distance between two particles that always have the same speed (2017), the Doppler effect and two of its uses (2020), the speed of a wave read from its equation (2022), and the equation of a wave travelling along the negative X direction (2025). The textbook adds the characteristics of progressive waves, reading wavelength, frequency and amplitude from an equation, and phase difference in space and in time.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpsw-wave-equation",
      name: "The equation of a progressive wave",
      intuition:
        "In a progressive wave every particle of the medium performs simple harmonic motion about its own mean position, and each particle starts a little later than the one before it. The equation gives the displacement y of the particle at position x at time t. Everything you need is in two numbers: the one multiplying t is ω, the one multiplying x is k. Their ratio is the speed, and the signs of the two terms give the direction.",
      definition:
        "- A simple harmonic progressive wave travelling along the positive X direction: \\(y = A\\sin(\\omega t - kx) = A\\sin 2\\pi\\left(\\dfrac{t}{T} - \\dfrac{x}{\\lambda}\\right) = A\\sin 2\\pi\\left(nt - \\dfrac{x}{\\lambda}\\right)\\).\n" +
        "- Here \\(A\\) is the amplitude, \\(\\omega = 2\\pi n = \\dfrac{2\\pi}{T}\\) and \\(k = \\dfrac{2\\pi}{\\lambda}\\).\n" +
        "- Speed of the wave: \\(v = n\\lambda = \\dfrac{\\omega}{k}\\).\n" +
        "- **Direction:** if the t term and the x term have opposite signs, as in \\(\\sin(\\omega t - kx)\\) or \\(\\sin(kx - \\omega t)\\), the wave travels along \\(+x\\). If they have the same sign, as in \\(\\sin(kx + \\omega t)\\), it travels along \\(-x\\).\n" +
        "- A wave travelling along the Y axis has \\(ky\\) and \\(\\omega t\\) together inside one sine, for example \\(x = A\\sin(ky - \\omega t)\\).",
      formula: {
        label: "Progressive wave",
        latex: "y = A\\sin(\\omega t - kx), \\qquad v = n\\lambda = \\frac{\\omega}{k}",
        symbols: [
          { symbol: "\\(\\omega\\)", meaning: "angular frequency, 2π times the frequency" },
          { symbol: "\\(k\\)", meaning: "2π divided by the wavelength" },
          { symbol: "\\(n\\)", meaning: "frequency" },
        ],
      },
      authoredExample: {
        prompt:
          "A wave on a string is given by \\(y = 0.05\\sin(100\\pi t - 2\\pi x)\\), with x and y in metres and t in seconds. Find its amplitude, frequency, wavelength, speed and direction of travel.",
        steps: [
          "Given: compare with \\(y = A\\sin(\\omega t - kx)\\): \\(A = 0.05\\) m, \\(\\omega = 100\\pi\\) rad/s, \\(k = 2\\pi\\) rad/m.",
          "Frequency: \\(n = \\dfrac{\\omega}{2\\pi} = \\dfrac{100\\pi}{2\\pi} = 50\\) Hz.",
          "Wavelength: \\(\\lambda = \\dfrac{2\\pi}{k} = \\dfrac{2\\pi}{2\\pi} = 1\\) m.",
          "Speed: \\(v = n\\lambda = 50 \\times 1 = 50\\) m/s.",
          "The t and x terms have opposite signs, so the wave travels along \\(+x\\).",
        ],
        answer: "Amplitude 0.05 m, frequency 50 Hz, wavelength 1 m, speed 50 m/s along +x",
      },
      selfCheckExample: {
        prompt:
          "A wave is given by \\(y = 0.2\\sin 2\\pi\\left(\\dfrac{t}{0.04} - \\dfrac{x}{2}\\right)\\) in SI units. Find its period, wavelength and speed.",
        steps: [
          "Compare with \\(y = A\\sin 2\\pi\\left(\\dfrac{t}{T} - \\dfrac{x}{\\lambda}\\right)\\): \\(T = 0.04\\) s, \\(\\lambda = 2\\) m.",
          "\\(n = \\dfrac{1}{T} = 25\\) Hz, so \\(v = n\\lambda = 25 \\times 2 = 50\\) m/s.",
        ],
        answer: "T = 0.04 s, λ = 2 m, v = 50 m/s",
      },
      practiceSet: [
        { prompt: "A sound wave of frequency 500 Hz has a wavelength of 0.68 m. Find its speed.", answer: "340 m/s" },
        { prompt: "In \\(y = A\\sin(\\omega t - kx)\\), write \\(\\omega\\) in terms of the period T and k in terms of the wavelength \\(\\lambda\\).", answer: "\\(\\omega = \\dfrac{2\\pi}{T}\\), \\(k = \\dfrac{2\\pi}{\\lambda}\\)" },
        { prompt: "A wave has \\(\\omega = 600\\) rad/s and \\(k = 3\\) rad/m. Find its speed.", answer: "200 m/s" },
        { prompt: "The frequency of a wave is 25 Hz. Find its period.", answer: "0.04 s" },
      ],
      pyqExampleId: "31d0a214-d9ed-4442-80af-7dbd52d15fb4",
      traps: [
        {
          title: "Taking k or ω as the speed",
          body: "Neither number by itself is the speed. The speed is \\(\\dfrac{\\omega}{k}\\), the coefficient of t divided by the coefficient of x.",
        },
        {
          title: "Dropping the π",
          body: "In \\(\\sin(100\\pi t - 2\\pi x)\\), \\(\\omega = 100\\pi\\), so \\(n = 50\\) Hz. Reading \\(\\omega = 100\\) gives 15.9 Hz, which is wrong.",
        },
        {
          title: "Judging direction by one sign",
          body: "Look at the signs of the t term and the x term together. \\(\\sin(kx - \\omega t)\\) and \\(\\sin(\\omega t - kx)\\) both travel along \\(+x\\); only the same sign on both terms means \\(-x\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsw-phase",
      name: "Phase difference in space and in time",
      intuition:
        "Moving one whole wavelength along a wave brings you to a particle in exactly the same state, so one wavelength of distance is a full cycle, 2π, of phase. In the same way, waiting one period at a single point brings the particle back to the same state. Any distance or time converts to phase by the fraction of a wavelength or a period it covers.",
      definition:
        "- Two points \\(\\Delta x\\) apart on the wave at the same instant: \\(\\Delta\\phi = \\dfrac{2\\pi}{\\lambda}\\Delta x\\).\n" +
        "- One point at two instants \\(\\Delta t\\) apart: \\(\\Delta\\phi = \\dfrac{2\\pi}{T}\\Delta t = 2\\pi n\\Delta t\\).\n" +
        "- Points \\(\\lambda\\) apart are in phase. Points \\(\\dfrac{\\lambda}{2}\\) apart are in opposite phase: they have equal speeds but move in opposite directions.\n" +
        "- Two neighbouring particles that are both at their mean positions are \\(\\dfrac{\\lambda}{2}\\) apart, because one moves up while the other moves down.\n" +
        "- A particle takes \\(\\dfrac{T}{4}\\) to go from its mean position to an extreme position.",
      formula: {
        label: "Phase difference",
        latex: "\\Delta\\phi = \\frac{2\\pi}{\\lambda}\\,\\Delta x, \\qquad \\Delta\\phi = \\frac{2\\pi}{T}\\,\\Delta t",
      },
      authoredExample: {
        prompt:
          "A wave of frequency 400 Hz travels at 320 m/s. Find (a) the phase difference between two points 0.2 m apart at one instant, and (b) the phase difference at one point between two instants 0.5 ms apart.",
        steps: [
          "Given: \\(n = 400\\) Hz, \\(v = 320\\) m/s. Wavelength \\(\\lambda = \\dfrac{v}{n} = \\dfrac{320}{400} = 0.8\\) m; period \\(T = \\dfrac{1}{400}\\) s \\(= 2.5\\) ms.",
          "(a) \\(\\Delta\\phi = \\dfrac{2\\pi}{\\lambda}\\Delta x = \\dfrac{2\\pi}{0.8} \\times 0.2 = \\dfrac{\\pi}{2}\\) rad.",
          "(b) \\(\\Delta\\phi = \\dfrac{2\\pi}{T}\\Delta t = 2\\pi \\times \\dfrac{0.5}{2.5} = 0.4\\pi\\) rad \\(= 72^\\circ\\).",
        ],
        answer: "(a) π/2 rad; (b) 0.4π rad (72°)",
      },
      selfCheckExample: {
        prompt: "Two points on a wave of wavelength 1.2 m are 0.4 m apart. Find their phase difference in degrees.",
        steps: ["\\(\\Delta\\phi = \\dfrac{\\Delta x}{\\lambda} \\times 360^\\circ = \\dfrac{0.4}{1.2} \\times 360^\\circ = 120^\\circ\\)."],
        answer: "120°",
      },
      practiceSet: [
        { prompt: "Two points on a wave of wavelength 0.6 m are \\(60^\\circ\\) out of phase. How far apart are they?", answer: "0.1 m" },
        { prompt: "What is the phase difference between two points of a wave one wavelength apart?", answer: "\\(2\\pi\\) rad: they are in phase" },
        { prompt: "A particle of a medium takes 5 ms to go from its mean position to an extreme position. Find the frequency of the wave.", answer: "T = 20 ms, so 50 Hz" },
      ],
      pyqExampleId: "d79c9cfd-d34c-47df-a581-17497c9b5034",
      traps: [
        {
          title: "Degrees in the radian formula",
          body: "\\(\\Delta x = \\dfrac{\\lambda}{2\\pi}\\Delta\\phi\\) needs \\(\\Delta\\phi\\) in radians. With degrees, use \\(\\Delta x = \\dfrac{\\Delta\\phi}{360^\\circ}\\lambda\\).",
        },
        {
          title: "Two particles at their mean positions are not λ apart",
          body: "Neighbouring particles at their mean positions move in opposite directions, so they are \\(\\dfrac{\\lambda}{2}\\) apart. The wavelength is twice that distance.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpsw-progressive-features",
      name: "Characteristics of progressive waves",
      intuition:
        "Only the disturbance travels; the particles of the medium stay where they are and vibrate about their mean positions. Each row below follows from that one picture.",
      definition:
        "- The board and the textbook ask you to 'state the characteristics'. Write four or five clear points, each a full sentence.\n" +
        "- Progressive waves are transverse (particles vibrate at right angles to the direction of travel, forming crests and troughs) or longitudinal (particles vibrate along the direction of travel, forming compressions and rarefactions).",
      table: {
        columns: ["Feature", "In a progressive wave"],
        rows: [
          { cells: ["Motion of particles", "Each particle performs simple harmonic motion about its mean position; only the disturbance travels"] },
          { cells: ["Amplitude, period, frequency", "The same for every particle"] },
          { cells: ["Phase", "Changes continuously from one particle to the next"] },
          { cells: ["Rest", "No particle is permanently at rest; each stops only for an instant at its extreme positions"] },
          { cells: ["Particle velocity", "Largest as the particle passes through its mean position"] },
          { cells: ["What is transferred", "Energy, along the direction of the wave; there is no transfer of matter"] },
          { cells: ["Speed of the wave", "Fixed by the properties of the medium"] },
        ],
      },
      selfCheckExample: {
        prompt: "State two ways in which all the particles of a medium carrying a progressive wave behave alike.",
        steps: ["Every particle vibrates with the same amplitude.", "Every particle vibrates with the same period and frequency."],
        answer: "Same amplitude; same period and frequency",
      },
      practiceSet: [
        { prompt: "Is any particle permanently at rest in a progressive wave?", answer: "No. Each is at rest only for an instant, at its extreme positions" },
        { prompt: "What does a progressive wave carry through a medium: matter or energy?", answer: "Energy only" },
        { prompt: "Where in its vibration does a particle of a progressive wave move fastest?", answer: "At its mean position" },
      ],
      pyqExampleId: "2d0fb2c1-dc16-4ac7-b1b1-36082680d164",
      traps: [
        {
          title: "Saying the particles travel with the wave",
          body: "The particles only vibrate about their mean positions. Write that the disturbance and energy travel, not the medium.",
        },
        {
          title: "Mixing up with stationary waves",
          body: "In a progressive wave every particle has the same amplitude and none is permanently at rest. Permanent rest points (nodes) belong to stationary waves.",
        },
      ],
    },
  ],
};
