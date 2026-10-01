import type { SubtopicNote } from "@/app/notes/_types";

export const DYNAMICS_ROT_NOTE: SubtopicNote = {
  subtopicName: "Torque, Angular Acceleration and Rotational Energy",
  title: "Torque, Angular Acceleration and Rotational Energy",
  oneLineDefinition:
    "About a fixed axis, torque gives angular acceleration through τ = Iα, and a spinning body stores kinetic energy ½Iω², which energy conservation trades with height and with the motion of attached blocks.",
  whyItMatters:
    "Twenty PYQs, eleven of them asking for a number, and seven from 2026. Eleven use τ = Iα: a string pulled off a wheel, a heavy pulley between two blocks, a torque that brings a spinning body to rest. Nine use energy: a falling block spins a flywheel, a rod falls about a pivot, two wheels share a belt.",
  concepts: [
    // C1 — τ = Iα
    {
      kind: "formula" as const,
      slug: "jprot-torque-alpha",
      name: "Torque and angular acceleration about a fixed axis",
      intuition:
        "τ = Iα is Newton's second law for rotation: torque plays the part of force and moment of inertia the part of mass. When a string runs over a wheel, the wheel and the string are tied together: the string's acceleration is Rα. Write one equation for each body, then link them with a = Rα.",
      definition:
        "- \\(\\tau = I\\alpha\\) about a fixed axis. A string pulled off a rim with force F gives \\(\\tau = FR\\).\n" +
        "- A string that does not slip: \\(a = R\\alpha\\).\n" +
        "- Block m hanging from a string wound on a disc pulley M: \\(mg - T = ma\\) and \\(TR = \\tfrac{1}{2}MR^{2}\\dfrac{a}{R}\\), so \\(T = \\tfrac{1}{2}Ma\\) and \\(a = \\dfrac{mg}{m + M/2}\\).\n" +
        "- Two blocks over a pulley with moment of inertia I: \\(a = \\dfrac{(m_1 - m_2)g}{m_1 + m_2 + I/R^{2}}\\). The tensions on the two sides are NOT equal; their difference turns the pulley.\n" +
        "- Rod hung level from strings at its ends, one string cut: about the other end, \\(\\alpha = \\dfrac{mg(L/2)}{mL^{2}/3} = \\dfrac{3g}{2L}\\), so \\(a_{cm} = \\tfrac{3}{4}g\\) and the remaining tension is \\(mg/4\\).\n" +
        "- Stopping a spinning body in time t: \\(\\tau = I\\omega_0/t\\). Work done by a torque \\(= \\tau\\theta\\); power \\(P = \\tau\\omega\\).",
      formula: {
        label: "Rotational second law, heavy pulley, and power",
        latex:
          "\\tau = I\\alpha \\qquad a = \\frac{(m_1 - m_2)g}{m_1 + m_2 + I/R^{2}} \\qquad P = \\tau\\omega",
      },
      authoredExample: {
        prompt:
          "A 1 kg block hangs from a light string wound round a uniform disc pulley of mass 6 kg and radius 0.2 m, free to turn on a fixed axle. Find the block's acceleration, the tension, and the pulley's angular acceleration (g = 10 m/s²).",
        steps: [
          "Block: \\(10 - T = 1 \\times a\\). Pulley: \\(TR = \\tfrac{1}{2}MR^{2}\\dfrac{a}{R}\\), so \\(T = \\tfrac{1}{2}(6)a = 3a\\).",
          "\\(10 - 3a = a\\), so \\(a = 2.5\\) m/s².",
          "\\(T = 3 \\times 2.5 = 7.5\\) N, less than the block's weight, as it must be.",
          "\\(\\alpha = a/R = 2.5/0.2 = 12.5\\) rad/s².",
        ],
        answer: "2.5 m/s²; 7.5 N; 12.5 rad/s²",
      },
      selfCheckExample: {
        prompt:
          "A flywheel with moment of inertia 2 kg m² spins at 30 rad/s. A constant brake stops it in 6 s. Find the braking torque and the angle the wheel turns while stopping.",
        steps: [
          "\\(\\alpha = 30/6 = 5\\) rad/s², so \\(\\tau = I\\alpha = 2 \\times 5 = 10\\) N m.",
          "\\(\\theta = \\tfrac{1}{2}(30 + 0)(6) = 90\\) rad.",
        ],
        answer: "10 N m; 90 rad",
      },
      practiceSet: [
        { prompt: "A thin ring of mass 2 kg and radius 0.5 m, free to turn about its axis, is pulled by a 4 N force along a string on its rim. Angular acceleration?", answer: "4 rad/s²", method: "\\(I = 0.5\\) kg m², \\(\\tau = 2\\) N m" },
        { prompt: "Blocks of 3 kg and 2 kg hang over a pulley with \\(I/R^{2} = 1\\) kg (g = 10). Their acceleration?", answer: "\\(\\tfrac{5}{3}\\) m/s²" },
        { prompt: "A motor exerts a torque of 5 N m on a shaft turning at 20 rad/s. Power?", answer: "100 W" },
        { prompt: "A uniform rod hangs level from two vertical strings at its ends. One is cut. Tension in the other just after?", answer: "mg/4" },
      ],
      pyqExampleId: "485fce68-51ef-40d4-9f84-24e4d542efb5", // 2026: sphere at 1200 rpm stopped in 10 s; torque and rotations
      traps: [
        {
          title: "T = mg for an accelerating block",
          body: "If the block accelerates downward, the string pulls with less than its weight: T = m(g − a). Using T = mg makes the pulley's acceleration too large.",
        },
        {
          title: "Equal tensions over a heavy pulley",
          body: "Equal tensions on both sides give zero net torque, so a pulley with mass could never start turning. With a massive pulley the tensions differ, and I/R² joins the masses in the denominator.",
        },
        {
          title: "Angular speed in rpm",
          body: "τ = Iω₀/t needs ω₀ in rad/s. 1200 rpm is 40π rad/s; leaving it as 1200, or as 20 revolutions a second, gives a torque off by a factor of 2π/60 or of 2π.",
        },
      ],
    },

    // C2 — rotational kinetic energy
    {
      kind: "formula" as const,
      slug: "jprot-rot-energy",
      name: "Rotational kinetic energy and energy conservation",
      intuition:
        "A spinning body stores ½Iω², the rotational twin of ½mv². When a block falls and spins a wheel through a string, the height it loses is shared between its own kinetic energy and the wheel's. When a rod swings about a pivot, only its centre of mass rises or falls, and the energy goes into ½Iω² about the pivot.",
      definition:
        "- \\(K_{\\text{rot}} = \\tfrac{1}{2}I\\omega^{2}\\).\n" +
        "- Block on a string wound on a wheel: \\(mgh = \\tfrac{1}{2}mv^{2} + \\tfrac{1}{2}I\\omega^{2}\\), with \\(v = \\omega R\\). Count EVERY moving body.\n" +
        "- A force F pulling a cord a length l off a wheel does work \\(Fl = \\tfrac{1}{2}I\\omega^{2}\\).\n" +
        "- A rod about a pivot: \\(mg \\times (\\text{drop of the centre of mass}) = \\tfrac{1}{2}I_{\\text{pivot}}\\omega^{2}\\). Hinged at its foot and falling from upright to flat: \\(\\omega = \\sqrt{3g/L}\\). Clamped at its foot and falling all the way to hang straight down, the centre of mass drops L: the free end moves at \\(\\sqrt{6gL}\\).\n" +
        "- Wheels joined by a belt share the same rim speed, \\(\\omega_1R_1 = \\omega_2R_2\\). Equal kinetic energies then need \\(I_1/I_2 = (R_1/R_2)^{2}\\).",
      formula: {
        label: "Rotational kinetic energy, and energy for a block on a wheel",
        latex: "K_{\\text{rot}} = \\tfrac{1}{2}I\\omega^{2} \\qquad mgh = \\tfrac{1}{2}mv^{2} + \\tfrac{1}{2}I\\omega^{2},\\ v = \\omega R",
      },
      authoredExample: {
        prompt:
          "A 1 kg block hangs from a string wound on a flywheel that is a uniform disc of mass 2 kg and radius 0.5 m. The block falls 1.8 m from rest. Find its speed and the flywheel's kinetic energy (g = 10 m/s²).",
        steps: [
          "Energy released: \\(mgh = 1 \\times 10 \\times 1.8 = 18\\) J.",
          "Flywheel: \\(\\tfrac{1}{2}\\left(\\tfrac{1}{2}MR^{2}\\right)\\left(\\dfrac{v}{R}\\right)^{2} = \\tfrac{1}{4}Mv^{2} = \\tfrac{1}{2}v^{2}\\). Block: \\(\\tfrac{1}{2}(1)v^{2}\\).",
          "\\(18 = \\tfrac{1}{2}v^{2} + \\tfrac{1}{2}v^{2} = v^{2}\\), so \\(v = \\sqrt{18} = 3\\sqrt{2} \\approx 4.24\\) m/s.",
          "Flywheel's share: \\(\\tfrac{1}{2} \\times 18 = 9\\) J.",
        ],
        answer: "\\(3\\sqrt{2}\\) m/s; 9 J",
      },
      selfCheckExample: {
        prompt:
          "A uniform rod 0.6 m long stands upright on a hinge at its lower end and falls over. Find its angular speed when it is horizontal (g = 10 m/s²).",
        steps: [
          "The centre of mass drops \\(L/2\\): \\(mg\\dfrac{L}{2} = \\dfrac{1}{2}\\cdot\\dfrac{mL^{2}}{3}\\omega^{2}\\).",
          "\\(\\omega^{2} = \\dfrac{3g}{L} = \\dfrac{30}{0.6} = 50\\).",
        ],
        answer: "\\(\\sqrt{50} = 5\\sqrt{2} \\approx 7.07\\) rad/s",
      },
      practiceSet: [
        { prompt: "A flywheel with I = 0.2 kg m² spins at 10 rad/s. Its kinetic energy?", answer: "10 J" },
        { prompt: "A 20 N pull unwinds 1.5 m of cord from a wheel at rest with I = 0.6 kg m². Its angular speed?", answer: "10 rad/s" },
        { prompt: "Two wheels share a belt; P's radius is three times Q's. For equal rotational kinetic energy, \\(I_P/I_Q\\)?", answer: "9" },
        { prompt: "A rod pivoted at one end is released from horizontal. Speed of its free end at the lowest point?", answer: "\\(\\sqrt{3gL}\\)" },
      ],
      pyqExampleId: "b0fc2141-f2aa-4e7f-ba3b-9b9b1d524e09", // 2026: 3 kg flywheel of radius 5 m and a 3 kg mass falling 3 m
      traps: [
        {
          title: "Leaving out the block's kinetic energy",
          body: "The falling block is moving too. mgh = ½Iω² alone gives the wheel all the energy; the block's ½mv² must be on the same side.",
        },
        {
          title: "A rod's centre of mass falls half as far",
          body: "A rod falling from upright to flat about its foot lowers its centre of mass by L/2, not L. Using L gives √(6g/L) in place of √(3g/L).",
        },
        {
          title: "Moment of inertia about the pivot",
          body: "A rod turning about its end has I = mL²/3 about that end. Using mL²/12, the value about its centre, ignores the motion of the centre of mass.",
        },
      ],
    },
  ],
};
