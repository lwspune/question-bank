import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_RD_KINEMATICS_NOTE: SubtopicNote = {
  subtopicName: "Kinematics and Dynamics of Circular Motion",
  title: "Circular Motion: Angular Quantities and Centripetal Force",
  oneLineDefinition:
    "Angular displacement, velocity and acceleration, how they link to linear velocity and acceleration, and the centripetal force that keeps a body moving on a circle.",
  whyItMatters:
    "12 questions, nine of them from board papers from 2016 to 2024. The board asks you to prove v = ω × r (2016), explain or define centripetal force (2017, 2024), distinguish centripetal from centrifugal force (2018), give the tangential acceleration in uniform circular motion (2019), define uniform circular motion and relate linear and angular acceleration (2020). The textbook adds a fan slowing down to rest and the directions of angular velocity and acceleration.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscprd-angular-velocity",
      name: "Angular velocity and linear velocity",
      intuition:
        "When a rigid body turns about an axis, every particle turns through the same angle in the same time, so they all share one angular velocity. A particle farther from the axis goes round a bigger circle in that time, so it moves faster. That is the whole idea behind v = rω.",
      definition:
        "- **Angular displacement** \\(\\theta\\): the angle turned by the radius vector, in radian. One revolution is \\(2\\pi\\) rad.\n" +
        "- **Angular velocity** \\(\\omega = \\dfrac{d\\theta}{dt}\\), in rad/s. For a frequency of n revolutions per second, \\(\\omega = 2\\pi n\\). Its direction is along the axis, given by the right hand rule: curl the fingers along the rotation and the thumb points along \\(\\vec{\\omega}\\).\n" +
        "- **Angular acceleration** \\(\\alpha = \\dfrac{d\\omega}{dt}\\), in rad/s². It points along \\(\\vec{\\omega}\\) when the rotation speeds up and opposite to it when it slows down.\n" +
        "- **Proof of \\(\\vec{v} = \\vec{\\omega} \\times \\vec{r}\\):** in a small time \\(dt\\) the radius vector turns through \\(d\\theta = \\omega\\,dt\\) and the particle moves an arc \\(ds = r\\,d\\theta\\).\n" +
        "- So \\(v = \\dfrac{ds}{dt} = r\\dfrac{d\\theta}{dt} = r\\omega\\).\n" +
        "- \\(\\vec{\\omega}\\) is along the axis, perpendicular to \\(\\vec{r}\\), so \\(|\\vec{\\omega} \\times \\vec{r}| = \\omega r \\sin 90^\\circ = r\\omega = v\\).\n" +
        "- \\(\\vec{\\omega} \\times \\vec{r}\\) is perpendicular to both \\(\\vec{\\omega}\\) and \\(\\vec{r}\\), so it lies along the tangent, in the direction of motion. Same magnitude and same direction, hence \\(\\vec{v} = \\vec{\\omega} \\times \\vec{r}\\).\n" +
        "- Differentiating \\(v = r\\omega\\) with r constant gives the tangential acceleration \\(a_T = r\\alpha\\).",
      formula: {
        label: "Linear and angular velocity",
        latex: "\\vec{v} = \\vec{\\omega} \\times \\vec{r}, \\qquad v = r\\omega, \\qquad a_T = r\\alpha",
      },
      authoredExample: {
        prompt:
          "A wheel of radius 0.4 m turns at 300 r.p.m. Find its angular velocity and the linear speed of a point on its rim.",
        steps: [
          "Given: \\(r = 0.4\\) m, \\(n = 300\\) r.p.m. \\(= \\dfrac{300}{60} = 5\\) rev/s.",
          "Formula: \\(\\omega = 2\\pi n\\) and \\(v = r\\omega\\).",
          "Substitution: \\(\\omega = 2\\pi \\times 5 = 10\\pi = 31.42\\) rad/s.",
          "\\(v = 0.4 \\times 31.42 = 12.57\\) m/s.",
        ],
        answer: "Angular velocity 31.42 rad/s; rim speed 12.57 m/s",
      },
      selfCheckExample: {
        prompt:
          "A particle moves on a circle of radius 2 m. Its angular speed rises steadily from 4 rad/s to 10 rad/s in 3 s. Find its tangential acceleration.",
        steps: [
          "\\(\\alpha = \\dfrac{10 - 4}{3} = 2\\) rad/s².",
          "\\(a_T = r\\alpha = 2 \\times 2 = 4\\) m/s².",
        ],
        answer: "4 m/s²",
      },
      practiceSet: [
        { prompt: "A ceiling fan seen from below turns clockwise. Which way does its angular velocity point?", answer: "Vertically upwards" },
        { prompt: "Express 120 r.p.m. in rad/s.", answer: "\\(4\\pi = 12.57\\) rad/s" },
        { prompt: "A point on a disc 5 cm from the axis moves at 0.5 m/s. Find the angular speed of the disc.", answer: "10 rad/s" },
        { prompt: "A fan is slowing down. Is its angular acceleration along its angular velocity or opposite to it?", answer: "Opposite to it" },
      ],
      pyqExampleId: "b2916e6a-c4ae-448d-9d21-3a93b86c9ff3",
      traps: [
        {
          title: "Using r.p.m. directly as ω",
          body: "Convert first: \\(\\omega = 2\\pi n\\) with n in revolutions per second. For example, 90 r.p.m. is 1.5 rev/s, which is \\(3\\pi\\) rad/s.",
        },
        {
          title: "Proving only the magnitude",
          body: "To prove \\(\\vec{v} = \\vec{\\omega} \\times \\vec{r}\\) you must show that the two sides agree in magnitude AND in direction. Showing \\(v = r\\omega\\) alone earns only part of the marks.",
        },
        {
          title: "A diameter in place of the radius",
          body: "\\(v = r\\omega\\) uses the radius. When a question gives the diameter of the circle, halve it first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscprd-centripetal",
      name: "Uniform circular motion and centripetal force",
      intuition:
        "In uniform circular motion the speed stays the same, but the direction of motion keeps turning. A change in direction is a change in velocity, so the body is accelerating, and the acceleration points to the centre. By Newton's second law something must pull the body towards the centre. Take that pull away and the body flies off along the tangent.",
      definition:
        "- **Uniform circular motion (U.C.M.):** the motion of a particle along a circle with constant speed. It covers equal arcs in equal times, so \\(\\omega\\) is constant and the period is \\(T = \\dfrac{2\\pi}{\\omega}\\).\n" +
        "- U.C.M. is accelerated motion because the direction of the velocity changes. Its tangential acceleration is zero (constant speed), so the whole acceleration is **centripetal**: \\(a = \\dfrac{v^2}{r} = \\omega^2 r\\), directed towards the centre.\n" +
        "- **Centripetal force:** the force acting on a body in circular motion, directed along the radius towards the centre of the circle, \\(F = \\dfrac{mv^2}{r} = m\\omega^2 r\\).\n" +
        "- It is not a new kind of force. Some real force plays its part: tension for a stone on a string, gravity for a satellite, friction for a car on a level turn.",
      formula: {
        label: "Centripetal acceleration and force",
        latex: "a = \\frac{v^2}{r} = \\omega^2 r, \\qquad F = \\frac{mv^2}{r} = m\\omega^2 r",
      },
      authoredExample: {
        prompt:
          "A body of mass 2 kg moves on a horizontal circle of radius 0.5 m, making 2 revolutions per second. Find the centripetal force on it.",
        steps: [
          "Given: \\(m = 2\\) kg, \\(r = 0.5\\) m, \\(n = 2\\) rev/s.",
          "Formula: \\(F = m\\omega^2 r\\) with \\(\\omega = 2\\pi n\\).",
          "Substitution: \\(\\omega = 2\\pi \\times 2 = 4\\pi\\) rad/s, so \\(\\omega^2 = 16\\pi^2 = 157.9\\) rad²/s².",
          "\\(F = 2 \\times 157.9 \\times 0.5 = 157.9\\) N.",
        ],
        answer: "157.9 N, towards the centre",
      },
      selfCheckExample: {
        prompt:
          "A particle in uniform circular motion has a speed of 6 m/s on a circle of radius 3 m. Find its tangential acceleration and its centripetal acceleration.",
        steps: [
          "The speed is constant, so the tangential acceleration is zero.",
          "Centripetal acceleration \\(= \\dfrac{v^2}{r} = \\dfrac{36}{3} = 12\\) m/s².",
        ],
        answer: "Tangential 0; centripetal 12 m/s², towards the centre",
      },
      practiceSet: [
        { prompt: "In uniform circular motion, which stays constant: the velocity or the speed?", answer: "The speed. The velocity changes because its direction changes" },
        { prompt: "What supplies the centripetal force on the Moon as it goes round the Earth?", answer: "The gravitational pull of the Earth" },
        { prompt: "A body's speed on a circle is doubled at the same radius. By what factor does the centripetal force change?", answer: "It becomes four times as large" },
      ],
      pyqExampleId: "f444ca7d-1c52-421d-a336-de79da7c0cf1",
      traps: [
        {
          title: "Calling uniform circular motion unaccelerated",
          body: "The speed is constant but the velocity is not. A body in U.C.M. always has a centripetal acceleration \\(v^2/r\\).",
        },
        {
          title: "A definition without the direction",
          body: "Centripetal force must be defined as acting along the radius, towards the centre. Leaving out the direction loses the mark.",
        },
        {
          title: "Drawing an extra centripetal arrow",
          body: "In a force diagram, do not add a separate 'centripetal force'. It is the net of the real forces (tension, friction, normal reaction, weight) towards the centre.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscprd-centrifugal",
      name: "Centripetal and centrifugal force compared",
      intuition:
        "Watched from the roadside, a car turning a corner needs a real inward pull from friction. Sitting inside the car, you feel pushed outwards. That outward push is the centrifugal force: a pseudo force that appears only because your frame of reference is turning with you.",
      definition:
        "- **Centrifugal force** is a pseudo force of size \\(\\dfrac{mv^2}{r}\\), directed away from the centre, used only in a rotating (non-inertial) frame of reference.\n" +
        "- The two forces are equal in size and opposite in direction, but they are not an action and reaction pair. They are described in different frames, and only centripetal force is real.\n" +
        "- The board asks you to distinguish them for two marks: give matching points from both sides.",
      table: {
        columns: ["Point", "Centripetal force", "Centrifugal force"],
        rows: [
          {
            cells: ["Nature", "A real force, with an agency such as tension, friction or gravity", "A pseudo force, with no agency"],
            pyqExampleId: "1a0fac7f-9dc6-43f1-a505-57554facea46",
            noteAmber: "Board 2018 asked you to distinguish the two.",
          },
          { cells: ["Frame of reference", "Seen in an inertial frame", "Felt only in a rotating, non-inertial frame"] },
          { cells: ["Direction", "Along the radius, towards the centre", "Along the radius, away from the centre"] },
          { cells: ["Example", "The tension in a string that whirls a stone", "The outward push felt by a passenger in a car taking a turn"] },
        ],
      },
      practiceSet: [
        { prompt: "Is centrifugal force a real force?", answer: "No. It is a pseudo force" },
        { prompt: "In which kind of frame of reference is centrifugal force used?", answer: "A rotating (non-inertial) frame" },
        { prompt: "What is the size of the centrifugal force on a body of mass m moving at speed v on a circle of radius r?", answer: "\\(\\dfrac{mv^2}{r}\\), the same as the centripetal force" },
      ],
      traps: [
        {
          title: "Calling them action and reaction",
          body: "An action and reaction pair are two real forces acting on two different bodies. Centrifugal force is not real, so it cannot be the reaction to centripetal force.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscprd-angular-kinematics",
      name: "Equations of rotational motion",
      intuition:
        "With a constant angular acceleration, rotation follows the same three equations as straight line motion with constant acceleration. Swap s for θ, u for ω₀, v for ω and a for α, and everything you know carries over.",
      definition:
        "- For a constant angular acceleration \\(\\alpha\\): \\(\\omega = \\omega_0 + \\alpha t\\), \\(\\theta = \\omega_0 t + \\tfrac{1}{2}\\alpha t^2\\), \\(\\omega^2 = \\omega_0^2 + 2\\alpha\\theta\\).\n" +
        "- Use \\(\\theta\\) in radian (N revolutions \\(= 2\\pi N\\) rad) and \\(\\omega\\) in rad/s. When the data and the answer are all in revolutions, you may use revolutions throughout and \\(\\pi\\) drops out.\n" +
        "- A body that is slowing down has a negative \\(\\alpha\\) (angular retardation).",
      formula: {
        label: "Equations of rotational motion",
        latex: "\\omega = \\omega_0 + \\alpha t, \\quad \\theta = \\omega_0 t + \\tfrac{1}{2}\\alpha t^2, \\quad \\omega^2 = \\omega_0^2 + 2\\alpha\\theta",
      },
      authoredExample: {
        prompt:
          "A wheel starts from rest and reaches an angular speed of 20 rad/s in 5 s with uniform angular acceleration. Find the angular acceleration and the number of revolutions it makes in these 5 s.",
        steps: [
          "Given: \\(\\omega_0 = 0\\), \\(\\omega = 20\\) rad/s, \\(t = 5\\) s.",
          "Formula: \\(\\alpha = \\dfrac{\\omega - \\omega_0}{t}\\) and \\(\\theta = \\omega_0 t + \\tfrac{1}{2}\\alpha t^2\\).",
          "Substitution: \\(\\alpha = \\dfrac{20 - 0}{5} = 4\\) rad/s².",
          "\\(\\theta = 0 + \\tfrac{1}{2} \\times 4 \\times 5^2 = 50\\) rad, so \\(N = \\dfrac{50}{2\\pi} = 7.96\\) revolutions.",
        ],
        answer: "4 rad/s²; about 8 revolutions (7.96)",
      },
      selfCheckExample: {
        prompt: "A disc turning at 10 rad/s slows down uniformly and stops in 4 s. Through what angle does it turn while stopping?",
        steps: [
          "With uniform retardation, the average angular speed is \\(\\dfrac{10 + 0}{2} = 5\\) rad/s.",
          "\\(\\theta = 5 \\times 4 = 20\\) rad.",
        ],
        answer: "20 rad",
      },
      practiceSet: [
        { prompt: "A wheel's angular speed rises uniformly from 2 rad/s to 8 rad/s in 3 s. Find its angular acceleration.", answer: "2 rad/s²" },
        { prompt: "How many radian are there in 5 revolutions?", answer: "\\(10\\pi = 31.4\\) rad" },
        { prompt: "A body starts from rest with an angular acceleration of 3 rad/s². Find its angular speed after 4 s.", answer: "12 rad/s" },
      ],
      pyqExampleId: "29c1f77b-ca23-43f9-8fe3-4fb7c73aae0d",
      traps: [
        {
          title: "Mixing revolutions and radian",
          body: "Keep one unit of angle in an equation. Either radian throughout (\\(\\theta = 2\\pi N\\), \\(\\omega = 2\\pi n\\)) or revolutions throughout, never both.",
        },
        {
          title: "Forgetting the sign of a retardation",
          body: "For a body slowing down, \\(\\alpha\\) is negative. Putting it in as positive makes the stopping time or angle come out wrong.",
        },
      ],
    },
  ],
};
