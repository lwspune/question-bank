import type { SubtopicNote } from "@/app/notes/_types";

export const ANGULAR_MOMENTUM_NOTE: SubtopicNote = {
  subtopicName: "Angular Momentum, Torque, and Conservation",
  title: "Torque, Angular Momentum and Its Conservation",
  oneLineDefinition:
    "Torque τ = r × F is the turning effect of a force and changes angular momentum L = Iω; with no external torque L stays fixed, so a body that pulls its mass in spins faster.",
  whyItMatters:
    "22 PYQs, only one HARD — a page of steady marks. Three shapes: a torque from a force or from a change in spin, " +
    "the links between L, ω, I and kinetic energy, and a second disc or ring dropped onto a spinning one (or a skater folding their arms), where L is conserved and kinetic energy is not.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-torque",
      name: "Torque: From a Force, and From a Change in Spin",
      intuition:
        "A force turns a body more the further from the axis it acts and the more squarely it pushes: τ = rF sin θ. That torque is the rotational version of force: it produces angular acceleration, τ = Iα, and spinning a body up or down in a known time tells you the torque that did it.",
      definition:
        "- \\(\\vec\\tau = \\vec r \\times \\vec F\\) — ORDER matters: \\(\\vec F \\times \\vec r\\) has the opposite sign.\n" +
        "- \\(\\tau = I\\alpha\\); average torque \\(= \\dfrac{I(\\omega_2 - \\omega_1)}{t}\\) (use \\(\\omega = 2\\pi n\\)).\n" +
        "- A force on the rim: \\(F = \\dfrac{\\tau}{R}\\). Door: the same torque at a third of the width needs three times the force.\n" +
        "- Rod pivoted at an end, at angle \\(\\theta\\) to the vertical: \\(\\tau = mg\\dfrac{L}{2}\\sin\\theta\\), \\(\\alpha = \\dfrac{3g\\sin\\theta}{2L}\\).\n" +
        "- Power: \\(P = \\tau\\omega = I\\alpha\\omega\\).\n" +
        "- Vector forms: \\(\\vec v = \\vec\\omega \\times \\vec r\\), \\(\\vec L = \\vec r \\times \\vec p\\), \\(\\vec\\tau = \\vec r \\times \\vec F\\).",
      formula: {
        label: "Torque",
        latex: "\\vec\\tau = \\vec r \\times \\vec F, \\qquad \\tau = I\\alpha",
      },
      authoredExample: {
        prompt: "A force \\(\\vec F = 2\\hat i + \\hat k\\) acts at \\(\\vec r = \\hat i + 3\\hat j\\). Torque about the origin?",
        steps: [
          "\\(\\vec r \\times \\vec F = \\hat i(3 \\cdot 1 - 0) - \\hat j(1 \\cdot 1 - 0) + \\hat k(0 - 3 \\cdot 2)\\).",
        ],
        answer: "\\(3\\hat i - \\hat j - 6\\hat k\\)",
      },
      selfCheckExample: {
        prompt: "A flywheel of I = 2 kg m² at 600 rpm is braked to rest in 10 s. Average torque?",
        steps: ["\\(\\omega = 20\\pi\\) rad/s, \\(\\alpha = 2\\pi\\) rad/s², \\(\\tau = I\\alpha = 4\\pi\\) N m."],
        answer: "\\(4\\pi\\) N m",
      },
      practiceSet: [
        { prompt: "1 N opens a door at its edge. Force needed at a third of the width from the hinge?", answer: "3 N" },
        { prompt: "A rod pivoted at one end, held horizontal and released. Its angular acceleration?", answer: "\\(\\dfrac{3g}{2L}\\)" },
        { prompt: "Power P drives a body of moment of inertia I at angular acceleration α. Its ω?", answer: "\\(\\dfrac{P}{I\\alpha}\\)" },
      ],
      pyqExampleId: "e7bac573-74ef-4207-a9d8-25c9e8c440aa",
      traps: [
        {
          title: "Writing F × r",
          body:
            "Torque is \\(\\vec r \\times \\vec F\\) and angular momentum \\(\\vec r \\times \\vec p\\). The options swap the order in one term to reverse its sign.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-angular-momentum-relations",
      name: "Angular Momentum and Its Links to Energy and Force",
      intuition:
        "L = Iω for a spinning body, and L = mvr for a particle on a circle. Rotational kinetic energy can be written through L as L²/2I, which is the form every 'equal kinetic energies' or 'equal angular momenta' question wants.",
      definition:
        "- \\(L = I\\omega\\); particle on a circle \\(L = mvr = mr^2\\omega\\).\n" +
        "- \\(K = \\dfrac{1}{2}I\\omega^2 = \\dfrac{L^2}{2I} = \\dfrac{1}{2}L\\omega\\), so \\(I = \\dfrac{L^2}{2K}\\).\n" +
        "- Equal \\(K\\): \\(L \\propto \\sqrt{I}\\). Equal \\(L\\): \\(K \\propto \\dfrac{1}{I}\\).\n" +
        "- Particle on a circle: \\(K = \\dfrac{L^2}{2mr^2}\\) and centripetal force \\(F = \\dfrac{L^2}{mr^3}\\).\n" +
        "- A particle moving in a straight line keeps a constant \\(L\\) about any point (its perpendicular distance never changes); on a circle at changing speed only the DIRECTION of \\(L\\) stays fixed.\n" +
        "- The Earth: \\(L = \\dfrac{2}{5}MR^2\\cdot\\dfrac{2\\pi}{T}\\).",
      formula: {
        label: "Angular momentum and energy",
        latex: "L = I\\omega, \\qquad K = \\frac{L^2}{2I}",
      },
      authoredExample: {
        prompt: "A wheel of I = 0.5 kg m² spins at 4 rad/s. Its angular momentum and kinetic energy?",
        steps: ["\\(L = 0.5 \\times 4 = 2\\) kg m²/s.", "\\(K = \\dfrac{L^2}{2I} = \\dfrac{4}{1} = 4\\) J (check: \\(\\dfrac{1}{2} \\times 0.5 \\times 16 = 4\\))."],
        answer: "2 kg m²/s; 4 J",
      },
      selfCheckExample: {
        prompt: "Two bodies have equal angular momenta and moments of inertia in the ratio 1 : 4. Ratio of their kinetic energies?",
        steps: ["\\(K \\propto \\dfrac{1}{I}\\)."],
        answer: "4 : 1",
      },
      practiceSet: [
        { prompt: "Frequency doubled and kinetic energy halved. New angular momentum?", answer: "\\(\\dfrac{L}{4}\\)" },
        { prompt: "Rotational KE x and angular momentum y. Moment of inertia?", answer: "\\(\\dfrac{y^2}{2x}\\)" },
        { prompt: "A mass moves at constant velocity parallel to the x-axis. Its angular momentum about the origin?", answer: "Constant" },
      ],
      pyqExampleId: "31d1ba48-d654-4619-82b2-4f1a2cc2ab70",
      traps: [
        {
          title: "Equal energy means equal L",
          body:
            "At equal kinetic energy, \\(L = \\sqrt{2IK} \\propto \\sqrt{I}\\): moments of inertia I and 2I give \\(1 : \\sqrt{2}\\), not 1 : 2.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-conservation-of-l",
      name: "Conservation of Angular Momentum",
      intuition:
        "With no outside torque, I ω stays the same. Drop a second disc onto a spinning one and I rises, so ω falls; fold your arms on a turntable and I falls, so ω rises. Kinetic energy is not conserved in either: it is lost when the discs grab each other, and supplied by your muscles when you pull in.",
      definition:
        "- \\(I_1\\omega_1 = I_2\\omega_2\\) when no external torque acts.\n" +
        "- Disc \\(M\\) with a coaxial disc \\(\\dfrac{M}{3}\\) placed on it: \\(\\omega' = \\dfrac{3}{4}\\omega\\); with \\(\\dfrac{M}{2}\\): \\(\\dfrac{2}{3}\\omega\\).\n" +
        "- Two discs brought together: \\(\\omega = \\dfrac{I_1\\omega_1 + I_2\\omega_2}{I_1 + I_2}\\), \\(K = \\dfrac{(I_1\\omega_1 + I_2\\omega_2)^2}{2(I_1 + I_2)}\\).\n" +
        "- At fixed \\(L\\), \\(K = \\dfrac{L^2}{2I}\\): I down to 75% ⇒ K up by a third (33.3%).",
      formula: {
        label: "No external torque",
        latex: "I_1\\omega_1 = I_2\\omega_2, \\qquad K \\propto \\frac{1}{I}\\ \\text{at fixed } L",
      },
      authoredExample: {
        prompt: "A disc of I = 0.2 kg m² spins at 30 rad/s. A second disc of I = 0.1 kg m² is dropped on it coaxially. New ω, and the kinetic energy lost?",
        steps: [
          "\\(\\omega' = \\dfrac{0.2 \\times 30}{0.3} = 20\\) rad/s.",
          "\\(K\\): \\(\\dfrac{1}{2} \\times 0.2 \\times 900 = 90\\) J before, \\(\\dfrac{1}{2} \\times 0.3 \\times 400 = 60\\) J after.",
        ],
        answer: "20 rad/s; 30 J lost",
      },
      selfCheckExample: {
        prompt: "A skater pulls in their arms and their moment of inertia falls to 80%. By what percentage does their kinetic energy change?",
        steps: ["\\(K \\propto \\dfrac{1}{I}\\): \\(\\dfrac{1}{0.8} = 1.25\\)."],
        answer: "+25%",
      },
      practiceSet: [
        { prompt: "An identical ring is placed gently on a spinning ring (I, ω). Kinetic energy lost?", answer: "\\(\\dfrac{I\\omega^2}{4}\\)" },
        { prompt: "Is kinetic energy conserved when two spinning discs are pressed together?", answer: "No — only angular momentum is" },
      ],
      pyqExampleId: "b0a2af62-1d15-407b-91b8-d0cdbb93eb53",
      traps: [
        {
          title: "Conserving kinetic energy",
          body:
            "Setting \\(\\frac{1}{2}I_1\\omega_1^2 = \\frac{1}{2}I_2\\omega_2^2\\) gives \\(\\omega\\) changing as \\(\\sqrt{I}\\), which matches a planted option. The conserved quantity is \\(I\\omega\\).",
        },
      ],
    },
  ],
  related: [
    { label: "Rotational Kinetic Energy and Rolling", href: "/notes/mht-cet-physics/rotational-dynamics/cetp-rolling" },
    { label: "Moment of Inertia and Radius of Gyration", href: "/notes/mht-cet-physics/rotational-dynamics/cetp-moment-of-inertia" },
  ],
};
