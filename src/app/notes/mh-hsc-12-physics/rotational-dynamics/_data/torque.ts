import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_RD_TORQUE_NOTE: SubtopicNote = {
  subtopicName: "Angular Momentum and Torque",
  title: "Angular Momentum, Torque, Work and Power",
  oneLineDefinition:
    "Angular momentum L = Iω, torque τ = Iα as the rotational form of Newton's second law, and the work done and power delivered by a torque.",
  whyItMatters:
    "11 questions, eight of them from board papers from 2017 to 2026. The board asks you to derive the torque on a body rotating with constant angular acceleration (2017, 2025), say what must be zero when the angular acceleration is zero (2017), find a frictional torque (2019) or a moment of inertia from τ = Iα (2024), and calculate the work done by a torque (2025) and the power of a ceiling fan (2025, 2026). The textbook adds the derivation of L = Iω.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscprd-angular-momentum",
      name: "Angular momentum of a rigid body",
      intuition:
        "Linear momentum is mass times velocity. For a spinning body, take each particle's momentum about the axis (its moment of momentum) and add them up. The sum comes out as moment of inertia times angular velocity, the rotational copy of p = mv.",
      definition:
        "- The angular momentum of a particle about an axis is the moment of its linear momentum, \\(\\vec{L} = \\vec{r} \\times \\vec{p}\\). For a particle moving on a circle its size is \\(L = mvr\\).\n" +
        "- In a rigid body every particle has the same \\(\\omega\\), so particle i has \\(v_i = r_i\\omega\\) and \\(L_i = m_i v_i r_i = m_i r_i^2\\omega\\).\n" +
        "- Adding for all particles: \\(L = \\left(\\sum m_i r_i^2\\right)\\omega = I\\omega\\).\n" +
        "- SI unit kg m²/s; dimensions \\([M^1L^2T^{-1}]\\).",
      formula: {
        label: "Angular momentum",
        latex: "L = I\\omega",
      },
      authoredExample: {
        prompt: "A disc of moment of inertia 0.5 kg m² spins at 120 r.p.m. Find its angular momentum.",
        steps: [
          "Given: \\(I = 0.5\\) kg m², \\(n = 120\\) r.p.m. \\(= 2\\) rev/s.",
          "Formula: \\(L = I\\omega\\) with \\(\\omega = 2\\pi n\\).",
          "Substitution: \\(\\omega = 4\\pi = 12.57\\) rad/s; \\(L = 0.5 \\times 12.57 = 6.28\\) kg m²/s.",
        ],
        answer: "6.28 kg m²/s",
      },
      selfCheckExample: {
        prompt: "A particle of mass 0.2 kg moves on a circle of radius 0.5 m at 4 m/s. Find its angular momentum about the centre.",
        steps: ["\\(L = mvr = 0.2 \\times 4 \\times 0.5\\)."],
        answer: "0.4 kg m²/s",
      },
      practiceSet: [
        { prompt: "Give the dimensions of angular momentum.", answer: "\\([M^1L^2T^{-1}]\\)" },
        { prompt: "A wheel has an angular momentum of 20 kg m²/s at 10 rad/s. Find its moment of inertia.", answer: "2 kg m²" },
      ],
      pyqExampleId: "3c603f38-b304-4b89-b8fb-1ab78eec8b7f",
      traps: [
        {
          title: "ω left in r.p.m.",
          body: "In \\(L = I\\omega\\), \\(\\omega\\) must be in rad/s. Multiply revolutions per second by \\(2\\pi\\) first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscprd-torque-ialpha",
      name: "Torque and angular acceleration",
      intuition:
        "A force makes a mass speed up; a torque makes a body's spin speed up or slow down. The larger the moment of inertia, the smaller the angular acceleration a given torque can produce.",
      definition:
        "- In a rigid body every particle has the same angular acceleration \\(\\alpha\\), so particle i has tangential acceleration \\(a_i = r_i\\alpha\\).\n" +
        "- The force on it is \\(f_i = m_i a_i = m_i r_i\\alpha\\), and its torque about the axis is \\(\\tau_i = f_i r_i = m_i r_i^2\\alpha\\).\n" +
        "- Adding: \\(\\tau = \\left(\\sum m_i r_i^2\\right)\\alpha = I\\alpha\\). This is the rotational form of \\(F = ma\\).\n" +
        "- SI unit N m; dimensions \\([M^1L^2T^{-2}]\\). Torque has the same dimensions as energy but is never written in joule.\n" +
        "- Torque is also the rate of change of angular momentum: \\(\\tau = \\dfrac{dL}{dt}\\).\n" +
        "- If \\(\\alpha = 0\\) the torque is zero, though the body may still spin at a constant \\(\\omega\\) with a definite angular momentum.",
      formula: {
        label: "Torque",
        latex: "\\tau = I\\alpha = \\frac{dL}{dt}",
      },
      authoredExample: {
        prompt:
          "A wheel of moment of inertia 0.8 kg m² is at rest. A constant torque of 4 N m acts on it. Find its angular acceleration and its angular speed after 5 s.",
        steps: [
          "Given: \\(I = 0.8\\) kg m², \\(\\tau = 4\\) N m, \\(\\omega_0 = 0\\), \\(t = 5\\) s.",
          "Formula: \\(\\alpha = \\dfrac{\\tau}{I}\\) and \\(\\omega = \\omega_0 + \\alpha t\\).",
          "Substitution: \\(\\alpha = \\dfrac{4}{0.8} = 5\\) rad/s².",
          "\\(\\omega = 0 + 5 \\times 5 = 25\\) rad/s.",
        ],
        answer: "5 rad/s²; 25 rad/s",
      },
      selfCheckExample: {
        prompt:
          "A flywheel of moment of inertia 2 kg m² turning at 40 rad/s is brought to rest by friction in 20 s. Find the frictional torque.",
        steps: [
          "\\(\\alpha = \\dfrac{0 - 40}{20} = -2\\) rad/s².",
          "\\(\\tau = I\\alpha = 2 \\times (-2) = -4\\) N m; the minus sign means it opposes the rotation.",
        ],
        answer: "4 N m, opposing the rotation",
      },
      practiceSet: [
        { prompt: "A torque of 6 N m gives a body an angular acceleration of 3 rad/s². Find its moment of inertia.", answer: "2 kg m²" },
        { prompt: "A body spins at a steady 50 rad/s. What is the net torque on it?", answer: "Zero" },
        { prompt: "State the SI unit of torque.", answer: "The newton metre (N m)" },
      ],
      pyqExampleId: "a58631d6-e01d-4adc-a9b0-81291aab2547",
      traps: [
        {
          title: "Torque in joule",
          body: "Write the unit of torque as N m. Although N m has the dimensions of a joule, torque is not energy.",
        },
        {
          title: "Using the mass for I",
          body: "\\(\\tau = I\\alpha\\) needs the moment of inertia. A mass given in the question may be there only to test whether you know it is not needed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscprd-work-power",
      name: "Work and power in rotation",
      intuition:
        "A force does work when it moves its point of action through a distance; a torque does work when it turns a body through an angle. Power, the rate of doing work, becomes torque times angular speed.",
      definition:
        "- Work done by a constant torque through an angle \\(\\theta\\) (in radian): \\(W = \\tau\\theta\\).\n" +
        "- Power: \\(P = \\dfrac{dW}{dt} = \\tau\\dfrac{d\\theta}{dt} = \\tau\\omega\\), the partner of \\(P = Fv\\).\n" +
        "- The work done equals the gain in rotational kinetic energy: \\(\\tau\\theta = \\tfrac{1}{2}I\\omega^2 - \\tfrac{1}{2}I\\omega_0^2\\).",
      formula: {
        label: "Work and power",
        latex: "W = \\tau\\theta, \\qquad P = \\tau\\omega",
      },
      authoredExample: {
        prompt:
          "A motor applies a constant torque of 50 N m to a wheel and turns it through 10 revolutions. Find the work done. Then find the power it delivers when the wheel turns at 300 r.p.m.",
        steps: [
          "Given: \\(\\tau = 50\\) N m, \\(\\theta = 10\\) rev \\(= 20\\pi\\) rad, \\(n = 300\\) r.p.m. \\(= 5\\) rev/s.",
          "Formula: \\(W = \\tau\\theta\\), \\(P = \\tau\\omega\\).",
          "Substitution: \\(W = 50 \\times 20\\pi = 1000\\pi = 3142\\) J.",
          "\\(\\omega = 2\\pi \\times 5 = 10\\pi\\) rad/s, so \\(P = 50 \\times 10\\pi = 500\\pi = 1571\\) W.",
        ],
        answer: "Work 3142 J; power 1571 W",
      },
      selfCheckExample: {
        prompt: "A grinding wheel needs 200 W to keep it turning at 20 rad/s. Find the torque the motor must supply.",
        steps: ["\\(\\tau = \\dfrac{P}{\\omega} = \\dfrac{200}{20}\\)."],
        answer: "10 N m",
      },
      practiceSet: [
        { prompt: "What is the rotational partner of \\(P = Fv\\)?", answer: "\\(P = \\tau\\omega\\)" },
        { prompt: "A torque of 5 N m turns a disc through 4 revolutions. Find the work done.", answer: "\\(40\\pi = 125.7\\) J" },
        { prompt: "Find the power when a torque of 3 N m keeps a shaft turning at 10 rad/s.", answer: "30 W" },
      ],
      pyqExampleId: "d6aa9b02-a2c4-4d77-a07d-1047ac54c1de",
      traps: [
        {
          title: "θ in revolutions",
          body: "\\(W = \\tau\\theta\\) needs \\(\\theta\\) in radian. Four revolutions is \\(8\\pi\\) rad, not 4.",
        },
        {
          title: "Power from α",
          body: "\\(P = \\tau\\omega\\) uses the angular speed at that moment. Work out \\(\\omega\\) first if the question gives only the acceleration and the time.",
        },
      ],
    },
  ],
};
