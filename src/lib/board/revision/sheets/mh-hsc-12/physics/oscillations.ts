import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Physics, Ch. 5 Oscillations. Statements checked against the
 * Balbharati text (definitions are the book's own); most-asked years from the
 * 35 board past-paper questions in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Oscillations",
  chapterSlug: "oscillations",
  source: "Balbharati Physics Std XII (Maharashtra State Board), Chapter 5",
  keyPoints: [
    {
      term: "Periodic and oscillatory motion",
      text: "Motion repeated after a definite interval of time is periodic. To and fro motion along the same path is oscillatory. Every oscillatory motion is periodic, but every periodic motion need not be oscillatory (circular motion is periodic, not oscillatory).",
    },
    {
      term: "Linear S.H.M.",
      text: "To and fro motion along a straight line in which the force (or acceleration) is always directed towards the mean position and its magnitude is directly proportional to the displacement from the mean position: \\(f = -kx\\).",
    },
    {
      term: "Amplitude, period and frequency",
      text: "**Amplitude**: the maximum displacement from the mean position. **Period**: the time taken to complete one oscillation. **Frequency**: the number of oscillations per unit time, \\(n = \\frac{1}{T}\\).",
    },
    {
      term: "Phase",
      text: "The state of oscillation: the position, the direction of velocity and the oscillation number. Phase angle \\(\\theta = \\omega t + \\phi\\); \\(\\phi\\) is the initial phase (epoch).",
    },
    {
      term: "S.H.M. as a projection of U.C.M.",
      text: "The projection of a uniform circular motion on any diameter is a linear S.H.M. The radius of the reference circle is the amplitude, and the angular velocity of the circular motion is the angular frequency \\(\\omega\\) of the S.H.M.",
    },
    {
      term: "Velocity and acceleration at mean and extreme",
      text: "At the mean position the speed is maximum (\\(A\\omega\\)) and the acceleration is zero. At the extreme positions the velocity is zero and the acceleration is maximum (\\(\\omega^2 A\\)).",
    },
    {
      term: "Phase differences in S.H.M.",
      text: "Displacement and velocity differ in phase by \\(\\frac{\\pi}{2}\\), velocity and acceleration by \\(\\frac{\\pi}{2}\\), and displacement and acceleration by \\(\\pi\\).",
    },
    {
      term: "Energy in S.H.M.",
      text: "The total energy is constant, independent of \\(x\\) and \\(t\\); it keeps changing between kinetic and potential. At the mean position it is entirely kinetic; at the extreme positions it is entirely potential.",
    },
    {
      term: "Composition of two S.H.M.s",
      text: "Two linear S.H.M.s of the same period along the same path combine into an S.H.M. of the same period, with a new amplitude \\(R\\) and initial phase \\(\\delta\\).",
    },
    {
      term: "Simple pendulum",
      text: "An ideal simple pendulum is a heavy particle suspended by a massless, inextensible, flexible string from a rigid support. It performs S.H.M. only for small amplitude (less than about 20°).",
    },
    {
      term: "Second's pendulum",
      text: "A simple pendulum whose period is two seconds. Its length \\(L_s = \\frac{g}{\\pi^2}\\), about 1 m.",
    },
    {
      term: "Angular S.H.M.",
      text: "The oscillatory motion of a body in which the torque for angular acceleration is directly proportional to the angular displacement and its direction is opposite to that of the angular displacement.",
    },
    {
      term: "Damped oscillations",
      text: "Periodic oscillations of gradually decreasing amplitude. The damping force \\(F_d = -bv\\) is proportional to the speed. Damping decreases the amplitude (exponentially) and increases the period.",
    },
    {
      term: "Free and forced oscillations, resonance",
      text: "**Free**: an object oscillating on its own does so with its natural frequency. **Forced**: a periodic force makes it oscillate with the driver's frequency. **Resonance**: when the driver's frequency equals the natural frequency, the body absorbs maximum energy and its amplitude is largest.",
    },
  ],
  formulas: [
    { label: "Differential equation of linear S.H.M.", latex: "\\frac{d^2x}{dt^2} + \\omega^2 x = 0 \\qquad \\omega^2 = \\frac{k}{m}" },
    { label: "Displacement", latex: "x = A\\sin(\\omega t + \\phi)" },
    { label: "Velocity", latex: "v = \\pm\\,\\omega\\sqrt{A^2 - x^2} \\qquad v_{max} = A\\omega" },
    { label: "Acceleration", latex: "a = -\\omega^2 x \\qquad a_{max} = \\omega^2 A" },
    {
      label: "Period and frequency",
      latex: "T = \\frac{2\\pi}{\\omega} = 2\\pi\\sqrt{\\frac{m}{k}} \\qquad n = \\frac{1}{T} = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}}",
    },
    { label: "Springs in series and in parallel", latex: "\\frac{1}{k_s} = \\frac{1}{k_1} + \\frac{1}{k_2} \\qquad k_p = k_1 + k_2" },
    {
      label: "Energy in S.H.M.",
      latex: "E_k = \\frac{1}{2}m\\omega^2(A^2 - x^2) \\qquad E_p = \\frac{1}{2}m\\omega^2 x^2 \\qquad E = \\frac{1}{2}m\\omega^2 A^2 = \\frac{1}{2}kA^2",
    },
    {
      label: "Composition of two S.H.M.s",
      latex: "R = \\sqrt{A_1^2 + A_2^2 + 2A_1A_2\\cos(\\phi_1 - \\phi_2)} \\qquad \\tan\\delta = \\frac{A_1\\sin\\phi_1 + A_2\\sin\\phi_2}{A_1\\cos\\phi_1 + A_2\\cos\\phi_2}",
    },
    { label: "Simple pendulum and second's pendulum", latex: "T = 2\\pi\\sqrt{\\frac{L}{g}} \\qquad L_s = \\frac{g}{\\pi^2}" },
    { label: "Angular S.H.M.", latex: "\\frac{d^2\\theta}{dt^2} + \\frac{c}{I}\\theta = 0 \\qquad T = 2\\pi\\sqrt{\\frac{I}{c}}" },
    {
      label: "Magnet in a uniform magnetic field",
      latex: "T = 2\\pi\\sqrt{\\frac{I}{\\mu B}}",
      symbols: [
        { symbol: "μ", meaning: "magnetic dipole moment" },
        { symbol: "I", meaning: "moment of inertia of the magnet" },
      ],
    },
    {
      label: "Damped oscillations",
      latex: "x = Ae^{-bt/2m}\\cos(\\omega' t + \\phi) \\qquad \\omega' = \\sqrt{\\frac{k}{m} - \\left(\\frac{b}{2m}\\right)^2}",
    },
  ],
  derivations: [
    {
      title: "Differential equation of linear S.H.M.",
      steps: [
        "In linear S.H.M. the restoring force is \\(f = -kx\\), where \\(k\\) is the force constant.",
        "Newton's second law: \\(ma = -kx\\), with \\(a = \\frac{d^2x}{dt^2}\\).",
        "So \\(\\frac{d^2x}{dt^2} + \\frac{k}{m}x = 0\\). Put \\(\\frac{k}{m} = \\omega^2\\): \\(\\frac{d^2x}{dt^2} + \\omega^2 x = 0\\).",
      ],
    },
    {
      title: "From the differential equation, obtain acceleration, velocity and displacement in S.H.M.",
      steps: [
        "Acceleration: \\(a = \\frac{d^2x}{dt^2} = -\\omega^2 x\\).",
        "Write \\(a = v\\frac{dv}{dx}\\): \\(v\\,dv = -\\omega^2 x\\,dx\\). Integrate: \\(v^2 = -\\omega^2 x^2 + C\\).",
        "At the extreme, \\(x = A\\) and \\(v = 0\\), so \\(C = \\omega^2 A^2\\) and \\(v = \\pm\\,\\omega\\sqrt{A^2 - x^2}\\).",
        "Put \\(v = \\frac{dx}{dt}\\): \\(\\frac{dx}{\\sqrt{A^2 - x^2}} = \\omega\\,dt\\). Integrate: \\(\\sin^{-1}\\frac{x}{A} = \\omega t + \\phi\\).",
        "So \\(x = A\\sin(\\omega t + \\phi)\\).",
      ],
    },
    {
      title: "Energy of a particle in S.H.M.: show that the total energy is conserved",
      steps: [
        "Kinetic energy: \\(E_k = \\frac{1}{2}mv^2 = \\frac{1}{2}m\\omega^2(A^2 - x^2)\\).",
        "Potential energy = work done against \\(f = -kx\\): \\(E_p = \\int_0^x kx\\,dx = \\frac{1}{2}kx^2 = \\frac{1}{2}m\\omega^2 x^2\\).",
        "Total: \\(E = E_k + E_p = \\frac{1}{2}m\\omega^2 A^2\\), independent of \\(x\\) and \\(t\\).",
        "At the mean position \\(E = E_k\\); at the extreme \\(E = E_p\\). They are equal at \\(x = \\pm\\frac{A}{\\sqrt{2}}\\).",
      ],
    },
    {
      title: "Show that linear S.H.M. is the projection of a U.C.M. on any diameter",
      steps: [
        "A particle P moves on a circle of radius \\(A\\) with uniform angular velocity \\(\\omega\\); at \\(t = 0\\) its reference angle is \\(\\phi\\).",
        "At time \\(t\\) the angle is \\(\\omega t + \\phi\\); its projection M on the diameter is at \\(x = A\\sin(\\omega t + \\phi)\\).",
        "Projection of the velocity \\(A\\omega\\): \\(v = A\\omega\\cos(\\omega t + \\phi)\\).",
        "Projection of the centripetal acceleration \\(A\\omega^2\\): \\(a = -\\omega^2 x\\). So M performs linear S.H.M.",
      ],
    },
    {
      title: "Period of a simple pendulum; length of a second's pendulum",
      steps: [
        "Displace the bob by a small angle \\(\\theta\\): the restoring force is \\(F = -mg\\sin\\theta \\approx -mg\\theta\\).",
        "With \\(\\theta = \\frac{x}{L}\\): \\(F = -\\frac{mg}{L}x\\), so \\(a = -\\frac{g}{L}x\\): S.H.M. with \\(\\omega^2 = \\frac{g}{L}\\).",
        "\\(T = \\frac{2\\pi}{\\omega} = 2\\pi\\sqrt{\\frac{L}{g}}\\).",
        "Second's pendulum: \\(T = 2\\) s, so \\(2 = 2\\pi\\sqrt{\\frac{L_s}{g}}\\) and \\(L_s = \\frac{g}{\\pi^2}\\).",
      ],
    },
    {
      title: "Period of a bar magnet vibrating in a uniform magnetic field",
      steps: [
        "Displace the magnet (moment \\(\\mu\\)) by a small angle \\(\\theta\\) from the field \\(B\\): restoring torque \\(\\tau = -\\mu B\\sin\\theta \\approx -\\mu B\\theta\\).",
        "\\(I\\alpha = -\\mu B\\theta\\), so \\(\\alpha = -\\frac{\\mu B}{I}\\theta\\): \\(\\alpha\\) is proportional to \\(\\theta\\) and opposite to it, so the motion is angular S.H.M.",
        "Comparing with \\(\\alpha = -\\omega^2\\theta\\): \\(\\omega = \\sqrt{\\frac{\\mu B}{I}}\\), so \\(T = 2\\pi\\sqrt{\\frac{I}{\\mu B}}\\).",
      ],
    },
    {
      title: "Composition of two S.H.M.s of the same period along the same path",
      steps: [
        "\\(x_1 = A_1\\sin(\\omega t + \\phi_1)\\), \\(x_2 = A_2\\sin(\\omega t + \\phi_2)\\); resultant \\(x = x_1 + x_2\\).",
        "Put \\(R\\cos\\delta = A_1\\cos\\phi_1 + A_2\\cos\\phi_2\\) and \\(R\\sin\\delta = A_1\\sin\\phi_1 + A_2\\sin\\phi_2\\): \\(x = R\\sin(\\omega t + \\delta)\\).",
        "Squaring and adding: \\(R^2 = A_1^2 + A_2^2 + 2A_1A_2\\cos(\\phi_1 - \\phi_2)\\).",
        "In phase: \\(R = A_1 + A_2\\). Opposite phase: \\(R = |A_1 - A_2|\\). Phase difference \\(\\frac{\\pi}{2}\\): \\(R = \\sqrt{A_1^2 + A_2^2}\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Spring mass oscillator",
      labels: ["rigid wall, spring and block on a smooth surface", "mean (equilibrium) position", "both extreme positions", "restoring force towards the mean position"],
    },
    {
      title: "S.H.M. as a projection of U.C.M.",
      labels: ["reference circle of radius A, centre O", "particle P at angle ωt + φ", "projection M on the diameter", "velocity Aω and acceleration Aω² of P"],
    },
    {
      title: "Graphs of displacement, velocity and acceleration against time",
      labels: ["x: sine curve", "v: cosine curve", "a: negative sine curve", "time axis marked T/4, T/2, 3T/4, T"],
    },
    {
      title: "Energy in S.H.M. against displacement",
      labels: ["potential energy parabola from the mean position", "kinetic energy inverted parabola", "total energy: horizontal line", "displacement axis from −A to +A"],
    },
    {
      title: "Simple pendulum",
      labels: ["rigid support and string of length L", "angle θ with the vertical", "tension T′ along the string", "weight mg and its components mg cos θ, mg sin θ"],
    },
    {
      title: "Magnet vibrating in a uniform magnetic field",
      labels: ["direction of the field B", "magnetic moment μ along the magnet", "angular displacement θ", "restoring couple (torque)"],
    },
  ],
  mostAsked: [
    { topic: "Energy in S.H.M.: kinetic, potential and total energy, with the graph against displacement", years: [2025, 2024, 2020, 2019, 2017, 2016] },
    {
      topic: "Differential equation of linear S.H.M., and the expressions for acceleration, velocity and displacement from it",
      years: [2026, 2025, 2024, 2023, 2020, 2019, 2017],
    },
    { topic: "Velocity and acceleration in S.H.M.: numericals on maximum and instantaneous values", years: [2026, 2025, 2024, 2023, 2018, 2016] },
    { topic: "Second's pendulum: define it, derive its length, or a numerical", years: [2026, 2022, 2019] },
    { topic: "Restoring force and force constant: period or frequency of a body on a spring", years: [2025, 2024, 2019] },
    { topic: "Free and forced oscillations; damped oscillations", years: [2026, 2023, 2017] },
    { topic: "Linear S.H.M. as a projection of U.C.M.; phase; composition of two S.H.M.s", years: [2026, 2018, 2016] },
    { topic: "Angular S.H.M.: its differential equation; period of a magnet vibrating in a uniform magnetic field", years: [2026, 2022] },
  ],
  mistakes: [
    {
      title: "Taking the path length as the amplitude",
      body: "The path length is \\(2A\\). A particle moving over a path of 20 cm has amplitude 10 cm. Convert cm to m before using \\(F = kx\\) or energy formulas.",
    },
    {
      title: "Mixing up \\(\\omega\\), \\(n\\) and \\(T\\)",
      body: "\\(\\omega = 2\\pi n = \\frac{2\\pi}{T}\\). From \\(\\frac{d^2x}{dt^2} = -36x\\), \\(\\omega^2 = 36\\), so \\(\\omega = 6\\) rad/s and \\(n = \\frac{6}{2\\pi}\\) Hz, not 6 Hz.",
    },
    {
      title: "Using the wrong starting phase",
      body: "From the mean position \\(x = A\\sin\\omega t\\); from the positive extreme \\(x = A\\cos\\omega t\\) (\\(\\phi = \\frac{\\pi}{2}\\)). It is the observer who starts counting time, not the particle that starts moving.",
    },
    {
      title: "Placing \\(E_k = E_p\\) at \\(x = \\frac{A}{2}\\)",
      body: "They are equal at \\(x = \\frac{A}{\\sqrt{2}}\\). At \\(x = \\frac{A}{2}\\), \\(E_k = 3E_p\\). The energy is purely potential at the extreme positions, purely kinetic at the mean position.",
    },
    {
      title: "Giving a second's pendulum a period of 1 s",
      body: "Its period is 2 s (1 s for each swing). \\(T = 2\\pi\\sqrt{\\frac{L}{g}}\\) holds only for small amplitude; quadrupling \\(L\\) doubles \\(T\\).",
    },
    {
      title: "Saying damping changes only the amplitude",
      body: "Damping decreases the amplitude exponentially and also increases the period (slows the motion). The motion is still periodic.",
    },
  ],
};

export default sheet;
