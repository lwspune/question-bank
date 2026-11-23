import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_RD_MOI_NOTE: SubtopicNote = {
  subtopicName: "Moment of Inertia and Radius of Gyration",
  title: "Moment of Inertia, Radius of Gyration and Rotational Energy",
  oneLineDefinition:
    "Moment of inertia as the rotational partner of mass, its value for a ring and a disc, the radius of gyration, and the kinetic energy of a rotating body.",
  whyItMatters:
    "18 questions. Thirteen were set in board papers from 2016 to 2026, more than on any other page of this chapter. The board asks you to define moment of inertia with its unit and dimensions (2018, 2022), define radius of gyration and give its significance (2019), derive the moment of inertia of a disc (2025) and the kinetic energy of a rotating body (2022), recall or calculate the moment of inertia of a ring or a disc (2018, 2022, 2024, 2026) and find a radius of gyration (2024, 2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscprd-moi-definition",
      name: "Moment of inertia",
      intuition:
        "Mass tells you how hard it is to change a body's straight line motion. For rotation, what matters is not only how much mass there is but how far it sits from the axis. Moment of inertia measures exactly that, and mass far from the axis counts much more, as the square of its distance.",
      definition:
        "- **Definition:** the moment of inertia of a body about a given axis is the sum of the products of the mass of each particle and the square of its perpendicular distance from the axis: \\(I = \\sum m_i r_i^2\\). For a continuous body, \\(I = \\int r^2\\,dm\\).\n" +
        "- **SI unit:** kg m². **Dimensions:** \\([M^1L^2T^0]\\).\n" +
        "- **Physical significance:** it measures the opposition a body offers to a change in its rotational motion. It plays the part in rotation that mass plays in translation.\n" +
        "- It depends on the mass of the body, how that mass is distributed, and the position and orientation of the axis.",
      formula: {
        label: "Moment of inertia",
        latex: "I = \\sum m_i r_i^2",
      },
      authoredExample: {
        prompt:
          "Three particles of mass 1 kg, 2 kg and 3 kg lie at perpendicular distances of 0.1 m, 0.2 m and 0.3 m from an axis. Find the moment of inertia of the system about that axis.",
        steps: [
          "Given: \\(m_1 = 1\\) kg, \\(r_1 = 0.1\\) m; \\(m_2 = 2\\) kg, \\(r_2 = 0.2\\) m; \\(m_3 = 3\\) kg, \\(r_3 = 0.3\\) m.",
          "Formula: \\(I = m_1 r_1^2 + m_2 r_2^2 + m_3 r_3^2\\).",
          "Substitution: \\(I = 1(0.01) + 2(0.04) + 3(0.09) = 0.01 + 0.08 + 0.27\\).",
          "\\(I = 0.36\\) kg m².",
        ],
        answer: "0.36 kg m²",
      },
      selfCheckExample: {
        prompt:
          "Two particles, each of mass 0.5 kg, are fixed at the ends of a light rod 1 m long. Find the moment of inertia about an axis through the middle of the rod, perpendicular to it.",
        steps: ["Each particle is 0.5 m from the axis.", "\\(I = 2 \\times 0.5 \\times (0.5)^2 = 0.25\\) kg m²."],
        answer: "0.25 kg m²",
      },
      practiceSet: [
        { prompt: "Does the moment of inertia of a body depend on the axis chosen?", answer: "Yes, on its position and its orientation" },
        { prompt: "A particle of mass 2 kg is 3 m from an axis. Find its moment of inertia about that axis.", answer: "18 kg m²" },
        { prompt: "Which quantity plays the part in rotation that mass plays in translation?", answer: "Moment of inertia" },
      ],
      pyqExampleId: "bc3adb4c-3f14-42b8-a053-65e3b233d4e1",
      traps: [
        {
          title: "The distance, not its square",
          body: "Each particle adds \\(mr^2\\). Doubling a particle's distance from the axis makes its share four times as large.",
        },
        {
          title: "A definition with no axis",
          body: "Say 'about a given axis' and 'perpendicular distance from the axis'. Without them the definition is incomplete.",
        },
        {
          title: "Time in the dimensions",
          body: "Moment of inertia is \\([M^1L^2T^0]\\). It has no time in it; \\([M^1L^2T^{-2}]\\) is torque.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscprd-ring-disc",
      name: "Moment of inertia of a ring and a disc",
      intuition:
        "In a thin ring every bit of mass is at the same distance R from the central axis, so its moment of inertia is simply MR². A disc has its mass spread from the centre to the rim, much of it close in, so its value is only half of that.",
      definition:
        "- **Ring** about its central axis (through the centre, perpendicular to its plane): every element is at distance R, so \\(I = \\sum m_i R^2 = MR^2\\).\n" +
        "- **Disc** about its central axis: the derivation takes the four steps below.\n" +
        "- Mass per unit area \\(\\sigma = \\dfrac{M}{\\pi R^2}\\).\n" +
        "- Take a thin ring of radius x and width dx. Its area is \\(2\\pi x\\,dx\\), so its mass is \\(dm = \\dfrac{M}{\\pi R^2}(2\\pi x\\,dx) = \\dfrac{2M}{R^2}x\\,dx\\).\n" +
        "- Every part of this ring is at distance x, so \\(dI = x^2\\,dm = \\dfrac{2M}{R^2}x^3\\,dx\\).\n" +
        "- Integrate from 0 to R: \\(I = \\dfrac{2M}{R^2}\\left[\\dfrac{x^4}{4}\\right]_0^R = \\dfrac{2M}{R^2} \\cdot \\dfrac{R^4}{4} = \\dfrac{1}{2}MR^2\\).\n" +
        "- Other results worth knowing: solid cylinder about its axis \\(\\tfrac{1}{2}MR^2\\); thin walled hollow cylinder \\(MR^2\\); solid sphere about a diameter \\(\\tfrac{2}{5}MR^2\\); thin hollow sphere \\(\\tfrac{2}{3}MR^2\\); thin rod about a transverse axis through its centre \\(\\tfrac{1}{12}ML^2\\).",
      formula: {
        label: "Ring and disc about the central axis",
        latex: "I_{ring} = MR^2, \\qquad I_{disc} = \\tfrac{1}{2}MR^2",
      },
      authoredExample: {
        prompt:
          "A thin ring and a uniform disc each have a mass of 2 kg and a radius of 0.3 m. Find the moment of inertia of each about its central axis.",
        steps: [
          "Given: \\(M = 2\\) kg, \\(R = 0.3\\) m, so \\(R^2 = 0.09\\) m².",
          "Formula: \\(I_{ring} = MR^2\\), \\(I_{disc} = \\tfrac{1}{2}MR^2\\).",
          "Substitution: \\(I_{ring} = 2 \\times 0.09 = 0.18\\) kg m².",
          "\\(I_{disc} = \\tfrac{1}{2} \\times 2 \\times 0.09 = 0.09\\) kg m².",
        ],
        answer: "Ring 0.18 kg m²; disc 0.09 kg m²",
      },
      selfCheckExample: {
        prompt: "A solid sphere of mass 5 kg and radius 0.2 m spins about a diameter. Find its moment of inertia.",
        steps: ["\\(I = \\tfrac{2}{5}MR^2 = \\tfrac{2}{5} \\times 5 \\times 0.04\\)."],
        answer: "0.08 kg m²",
      },
      practiceSet: [
        { prompt: "A ring of mass 0.5 kg and radius 0.2 m turns about its central axis. Find its moment of inertia.", answer: "0.02 kg m²" },
        { prompt: "Why is the moment of inertia of a disc less than that of a ring of the same mass and radius?", answer: "Much of the disc's mass lies closer to the axis" },
        { prompt: "Which has a moment of inertia of \\(\\tfrac{1}{2}MR^2\\) about its central axis: a thin ring or a uniform disc?", answer: "The uniform disc" },
      ],
      pyqExampleId: "21d92bb4-dca3-4a0e-83b2-7cf56c872ebc",
      traps: [
        {
          title: "Ring and disc swapped",
          body: "\\(MR^2\\) is the ring and \\(\\tfrac{1}{2}MR^2\\) is the disc, both about the central axis. The board has set this as a one mark question in several years.",
        },
        {
          title: "Radius from a diameter, in centimetres",
          body: "Halve a diameter and change centimetres to metres before squaring. 60 cm is 0.6 m, and \\(R^2 = 0.36\\) m², not 3600.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscprd-radius-gyration",
      name: "Radius of gyration",
      intuition:
        "Imagine squeezing all of a body's mass into one point and placing it at the distance from the axis where it gives the same moment of inertia as the real body. That distance is the radius of gyration. It sums up, in one length, how the mass is spread about the axis.",
      definition:
        "- **Definition:** the radius of gyration K of a body about an axis is the distance from the axis at which, if the whole mass of the body were concentrated, its moment of inertia would equal the actual moment of inertia of the body about that axis: \\(I = MK^2\\), \\(K = \\sqrt{\\dfrac{I}{M}}\\).\n" +
        "- **SI unit:** metre. **Dimensions:** \\([M^0L^1T^0]\\).\n" +
        "- **Significance:** it shows how the mass is distributed about the axis. A larger K means the mass lies farther from the axis.\n" +
        "- It depends on the shape and size of the body and on the axis. It does not depend on the mass.\n" +
        "- Values: ring about its central axis \\(K = R\\); disc about its central axis \\(K = \\dfrac{R}{\\sqrt{2}}\\); solid sphere about a diameter \\(K = \\sqrt{\\tfrac{2}{5}}\\,R = 0.632R\\).",
      formula: {
        label: "Radius of gyration",
        latex: "I = MK^2, \\qquad K = \\sqrt{\\frac{I}{M}}",
      },
      authoredExample: {
        prompt: "A flywheel of mass 20 kg has a moment of inertia of 1.8 kg m² about its axis. Find its radius of gyration.",
        steps: [
          "Given: \\(M = 20\\) kg, \\(I = 1.8\\) kg m².",
          "Formula: \\(K = \\sqrt{\\dfrac{I}{M}}\\).",
          "Substitution: \\(K = \\sqrt{\\dfrac{1.8}{20}} = \\sqrt{0.09} = 0.3\\) m.",
        ],
        answer: "0.3 m",
      },
      selfCheckExample: {
        prompt: "A uniform disc has a radius of 40 cm. Find its radius of gyration about its central axis.",
        steps: ["\\(K = \\dfrac{R}{\\sqrt{2}} = \\dfrac{40}{1.414}\\)."],
        answer: "28.3 cm",
      },
      practiceSet: [
        { prompt: "Does the radius of gyration of a body depend on its mass?", answer: "No" },
        { prompt: "What is the radius of gyration of a thin ring of radius 15 cm about its central axis?", answer: "15 cm" },
        { prompt: "Give the SI unit of radius of gyration.", answer: "The metre" },
      ],
      pyqExampleId: "971aa613-a79d-434f-87c2-bb16a703a3c0",
      traps: [
        {
          title: "Leaving out 'the whole mass'",
          body: "The definition needs: if the whole mass were concentrated at that distance, the moment of inertia would be unchanged. Writing only \\(K = \\sqrt{I/M}\\) is a formula, not a definition.",
        },
        {
          title: "K = R for every body",
          body: "Only a ring about its central axis has \\(K = R\\). A disc has \\(R/\\sqrt{2}\\) and a solid sphere \\(0.632R\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscprd-rotational-ke",
      name: "Kinetic energy of rotation",
      intuition:
        "Every particle of a spinning body is moving, so the body has kinetic energy even though it stays in one place. Particles far from the axis move faster, so once again it is the moment of inertia that decides how much energy a given spin carries.",
      definition:
        "- Particle i at distance \\(r_i\\) moves with \\(v_i = r_i\\omega\\); every particle has the same \\(\\omega\\).\n" +
        "- Its kinetic energy is \\(\\tfrac{1}{2}m_i v_i^2 = \\tfrac{1}{2}m_i r_i^2\\omega^2\\).\n" +
        "- Adding for all particles: \\(E = \\tfrac{1}{2}\\left(\\sum m_i r_i^2\\right)\\omega^2 = \\tfrac{1}{2}I\\omega^2\\).\n" +
        "- With \\(I = MK^2\\): \\(E = \\tfrac{1}{2}MK^2\\omega^2\\). It is the rotational partner of \\(\\tfrac{1}{2}mv^2\\).\n" +
        "- The work done to change the spin equals the change in rotational kinetic energy: \\(W = \\tfrac{1}{2}I(\\omega_2^2 - \\omega_1^2)\\).",
      formula: {
        label: "Rotational kinetic energy",
        latex: "E = \\tfrac{1}{2}I\\omega^2",
      },
      authoredExample: {
        prompt: "A wheel of moment of inertia 2 kg m² spins at 600 r.p.m. Find its rotational kinetic energy.",
        steps: [
          "Given: \\(I = 2\\) kg m², \\(n = 600\\) r.p.m. \\(= 10\\) rev/s.",
          "Formula: \\(E = \\tfrac{1}{2}I\\omega^2\\) with \\(\\omega = 2\\pi n\\).",
          "Substitution: \\(\\omega = 20\\pi\\) rad/s, \\(\\omega^2 = 400\\pi^2 = 3947.8\\) rad²/s².",
          "\\(E = \\tfrac{1}{2} \\times 2 \\times 3947.8 = 3947.8\\) J.",
        ],
        answer: "About 3948 J (3.95 kJ)",
      },
      selfCheckExample: {
        prompt:
          "How much work must be done to raise the angular speed of a wheel of moment of inertia 0.5 kg m² from 10 rad/s to 20 rad/s?",
        steps: ["\\(W = \\tfrac{1}{2}I(\\omega_2^2 - \\omega_1^2) = \\tfrac{1}{2} \\times 0.5 \\times (400 - 100)\\)."],
        answer: "75 J",
      },
      practiceSet: [
        { prompt: "A body of moment of inertia 4 kg m² rotates at 5 rad/s. Find its kinetic energy.", answer: "50 J" },
        { prompt: "The angular speed of a wheel is doubled. By what factor does its rotational kinetic energy change?", answer: "It becomes four times as large" },
        { prompt: "A uniform disc of mass 2 kg and radius 0.5 m spins at 4 rad/s about its central axis. Find its kinetic energy.", answer: "2 J" },
      ],
      pyqExampleId: "8d016a9c-76b8-4a69-94bd-8d9812eed7af",
      traps: [
        {
          title: "Putting r.p.m. in for ω",
          body: "Change the frequency to rad/s with \\(\\omega = 2\\pi n\\), n in revolutions per second, before squaring.",
        },
        {
          title: "Forgetting the half",
          body: "Rotational kinetic energy is \\(\\tfrac{1}{2}I\\omega^2\\), not \\(I\\omega^2\\).",
        },
      ],
    },
  ],
};
