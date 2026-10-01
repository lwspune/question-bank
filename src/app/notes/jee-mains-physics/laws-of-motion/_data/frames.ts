import type { SubtopicNote } from "@/app/notes/_types";

export const FRAMES_LOM_NOTE: SubtopicNote = {
  subtopicName: "Lifts, Pseudo Forces and Circular Motion",
  title: "Lifts, Pseudo Forces and Circular Motion",
  oneLineDefinition:
    "In an accelerating frame, add a pseudo force −ma₀ to every body and solve as if the frame were at rest; in circular motion, the real forces must supply mv²/r toward the centre.",
  whyItMatters:
    "Eighteen PYQs, fifteen of them multiple choice, and five from 2026. Seven are about apparent weight, in a lift or on a platform that sinks. Five work in an accelerating frame: a wedge pulled sideways, a bob in a car accelerating up a slope, a block held against the side of a moving cube. Six are circular motion: a pendulum in a turning car, a banked road, a coin on a turntable, a rotor drum.",
  concepts: [
    // C1 — apparent weight
    {
      kind: "reference" as const,
      slug: "jplom-lifts",
      name: "Apparent weight in a lift",
      intuition:
        "A weighing scale reads the normal reaction, the push of the floor on your feet. If the lift accelerates upward, the floor must push harder than your weight to speed you up with it; if it accelerates downward, it pushes less. Only the direction of the acceleration matters. A lift moving at constant speed, up or down, reads your true weight.",
      definition:
        "- The reading is the normal reaction N.\n" +
        "- Acceleration up: \\(N = m(g + a)\\). Acceleration down: \\(N = m(g - a)\\). Constant velocity: \\(N = mg\\). Free fall: \\(N = 0\\).\n" +
        "- Speeding up while going down, or slowing down while going up, is a downward acceleration.\n" +
        "- Every body on a platform accelerating down at a feels an effective gravity \\(g - a\\); a stack presses on what is below it with its mass times \\(g - a\\).\n" +
        "- A lift moving at constant velocity is an inertial frame: an incline inside it behaves exactly as on the ground.",
      table: {
        columns: ["Lift's motion", "Acceleration", "Scale reading", "For 50 kg, a = 2 m/s², g = 10 m/s²"],
        rows: [
          { cells: ["At rest", "Zero", "\\(mg\\)", "500 N"] },
          { cells: ["Moving up or down at constant speed", "Zero", "\\(mg\\)", "500 N"] },
          { cells: ["Starting upward, speeding up", "Upward", "\\(m(g + a)\\)", "600 N"] },
          { cells: ["Moving down and slowing to a stop", "Upward", "\\(m(g + a)\\)", "600 N"], noteAmber: "Moving down, yet the reading goes UP: the acceleration points up." },
          { cells: ["Starting downward, speeding up", "Downward", "\\(m(g - a)\\)", "400 N"] },
          { cells: ["Moving up and slowing to a stop", "Downward", "\\(m(g - a)\\)", "400 N"] },
          { cells: ["Cable snaps (free fall)", "Downward, equal to g", "Zero", "0 N"] },
        ],
        caption: "The reading depends only on the direction of the acceleration, never on the direction of motion.",
      },
      selfCheckExample: {
        prompt:
          "A 45 kg girl stands on a scale in a lift moving up and slowing down at \\(2.5\\ \\text{m/s}^{2}\\). What does the scale read? (g = 10 m/s²)",
        steps: [
          "Slowing on the way up means the acceleration points down.",
          "\\(N = 45(10 - 2.5) = 337.5\\) N.",
        ],
        answer: "337.5 N",
      },
      practiceSet: [
        { prompt: "A scale in a lift reads 80% of a man's weight. Acceleration of the lift? (g = 10 m/s²)", answer: "\\(2\\ \\text{m/s}^{2}\\) downward" },
        { prompt: "A lift rises at constant speed. A block slides down a smooth \\(30^{\\circ}\\) incline inside it. Acceleration along the incline? (g = 10 m/s²)", answer: "\\(5\\ \\text{m/s}^{2}\\)" },
        { prompt: "A 5 kg block rests on a 10 kg block on a platform accelerating down at \\(3\\ \\text{m/s}^{2}\\). Force between the blocks? (g = 10 m/s²)", answer: "35 N" },
        { prompt: "What does a scale read in a freely falling lift?", answer: "Zero" },
      ],
      pyqExampleId: "1b1e446e-86c6-45d4-872d-d6cf7e273a47", // 2021: 60 kg on a spring balance, lift descends at 1.8 m/s², 492 N
      traps: [
        {
          title: "Velocity does not decide the reading",
          body: "A lift moving down can read more than your weight, if it is slowing down. Ask which way the acceleration points, then add or subtract a.",
        },
        {
          title: "A lift at constant velocity changes nothing",
          body: "Uniform motion adds no pseudo force. An incline or a pendulum inside such a lift behaves exactly as on the ground, so time and acceleration are the ground values.",
        },
      ],
    },

    // C2 — pseudo forces
    {
      kind: "formula" as const,
      slug: "jplom-pseudo",
      name: "Pseudo force in an accelerating frame",
      intuition:
        "Inside an accelerating car, a hanging bob swings back as if pushed. In the car's frame that push is the pseudo force, −ma₀, opposite to the car's acceleration. Add it to every body, and the problem becomes ordinary statics or an ordinary incline problem. Use it only in the accelerating frame; in the ground frame it does not exist.",
      definition:
        "- In a frame accelerating at \\(\\vec a_0\\), add \\(-m\\vec a_0\\) to every body.\n" +
        "- Bob in a vehicle accelerating at a on a level road: the string makes \\(\\tan\\theta = a/g\\) with the vertical, and \\(T = m\\sqrt{g^{2} + a^{2}}\\).\n" +
        "- Block on a smooth wedge accelerating horizontally at \\(a_0\\): along the slope \\(a_{\\text{rel}} = g\\sin\\theta \\mp a_0\\cos\\theta\\) (minus when the pseudo force points up the slope). It stays at rest when \\(a_0 = g\\tan\\theta\\).\n" +
        "- A free wedge on a smooth floor recoils as the block slides: solve the block and the wedge together; their momentum along the floor is conserved.\n" +
        "- A block pressed on the front face of an accelerating body: \\(N = ma_0\\), and it does not slip if \\(\\mu ma_0 \\ge mg\\).",
      formula: {
        label: "Pseudo force",
        latex: "\\vec F_{\\text{pseudo}} = -m\\vec a_0, \\qquad \\tan\\theta = \\frac{a_0}{g}",
      },
      authoredExample: {
        prompt:
          "A van accelerates at \\(5\\ \\text{m/s}^{2}\\) on a level road. A 0.2 kg bob hangs from its roof. Find the angle of the string with the vertical and its tension. (g = 10 m/s²)",
        steps: [
          "In the van's frame the bob feels mg down and a pseudo force \\(ma_0\\) backward.",
          "\\(\\tan\\theta = a_0/g = 0.5\\), so \\(\\theta \\approx 26.6^{\\circ}\\), swung back.",
          "\\(T = m\\sqrt{g^{2} + a_0^{2}} = 0.2\\sqrt{125} \\approx 2.24\\) N.",
        ],
        answer: "\\(\\tan^{-1}(0.5) \\approx 26.6^{\\circ}\\); about 2.24 N.",
      },
      selfCheckExample: {
        prompt:
          "A smooth wedge has a \\(37^{\\circ}\\) slope (\\(\\tan 37^{\\circ} = 0.75\\)). With what horizontal acceleration must it be pushed so that a block on the slope does not slide? (g = 10 m/s²)",
        steps: [
          "In the wedge frame the pseudo force must cancel the weight's pull along the slope: \\(ma_0\\cos\\theta = mg\\sin\\theta\\).",
          "\\(a_0 = g\\tan 37^{\\circ} = 7.5\\ \\text{m/s}^{2}\\), pushed so the slope presses into the block.",
        ],
        answer: "\\(7.5\\ \\text{m/s}^{2}\\)",
      },
      practiceSet: [
        { prompt: "A bob hangs in a train accelerating at \\(g/\\sqrt{3}\\). Angle of the string with the vertical?", answer: "\\(30^{\\circ}\\)" },
        { prompt: "In a freely falling lift, what pseudo force acts on a 2 kg body, and what does it weigh there? (g = 10 m/s²)", answer: "20 N upward; it weighs nothing" },
        { prompt: "A block is pressed on the front face of a cart by the cart's acceleration; μ = 0.5. Least acceleration that keeps it from falling? (g = 10 m/s²)", answer: "\\(20\\ \\text{m/s}^{2}\\)" },
      ],
      pyqExampleId: "da0908e7-a26f-43e6-9fb3-ffc7cb05fa9d", // 2021: bob in a car accelerating up a 30° incline, 30°
      traps: [
        {
          title: "The pseudo force points against the acceleration",
          body: "A bob in a car speeding up forward swings BACK. Putting −ma₀ along the acceleration instead of against it reverses the answer, often to the other sign choice among the options.",
        },
        {
          title: "Use it in one frame only",
          body: "Either work from the ground with the real acceleration, or from the accelerating frame with the pseudo force. Doing both counts ma₀ twice.",
        },
      ],
    },

    // C3 — circular motion
    {
      kind: "formula" as const,
      slug: "jplom-circular",
      name: "Forces in circular motion",
      intuition:
        "Moving in a circle needs a net force toward the centre, mv²/r. It is not a new force: friction, the normal reaction or a tension supplies it. On a flat road friction does all of it; on a banked road the tilted normal reaction does part of it. In the rotating frame the same balance appears as a centrifugal force, mω²r outward.",
      definition:
        "- Net inward force \\(= \\dfrac{mv^{2}}{r} = m\\omega^{2}r\\), supplied by real forces.\n" +
        "- Flat road: \\(\\mu mg \\ge \\dfrac{mv^{2}}{r}\\), so \\(v_{\\max} = \\sqrt{\\mu rg}\\).\n" +
        "- Banked road, no friction: \\(v^{2} = rg\\tan\\theta\\). With friction: \\(v_{\\max}^{2} = rg\\,\\dfrac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta}\\).\n" +
        "- Pendulum in a turning car: \\(\\tan\\theta = \\dfrac{v^{2}}{rg}\\) with the vertical.\n" +
        "- Coin on a turntable: slips beyond \\(r = \\dfrac{\\mu g}{\\omega^{2}}\\). Rotor drum of radius R: needs \\(\\mu \\ge \\dfrac{g}{\\omega^{2}R}\\).\n" +
        "- Rotating frame: add the centrifugal force \\(m\\omega^{2}r\\) outward. A ball in a smooth radial groove: \\(v^{2} = \\omega^{2}(r_2^{2} - r_1^{2})\\).",
      formula: {
        label: "Banked road with friction",
        latex: "v_{\\max}^{2} = rg\\,\\frac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta}",
      },
      authoredExample: {
        prompt:
          "A road of radius 100 m is banked at \\(37^{\\circ}\\) (\\(\\tan 37^{\\circ} = 0.75\\)) and the coefficient of friction is 0.5. Find the maximum safe speed, and the speed at which no friction is needed. (g = 10 m/s²)",
        steps: [
          "\\(v_{\\max}^{2} = 100 \\times 10 \\times \\dfrac{0.75 + 0.5}{1 - 0.5 \\times 0.75} = 1000 \\times \\dfrac{1.25}{0.625} = 2000\\).",
          "\\(v_{\\max} = \\sqrt{2000} \\approx 44.7\\) m/s.",
          "No friction: \\(v^{2} = rg\\tan\\theta = 750\\), \\(v \\approx 27.4\\) m/s.",
        ],
        answer: "About 44.7 m/s; about 27.4 m/s without friction.",
      },
      selfCheckExample: {
        prompt:
          "A rotor drum of radius 2 m spins about its vertical axis. The coefficient of friction between a rider and the wall is 0.5. Least angular speed that keeps the rider from sliding down? (g = 10 m/s²)",
        steps: [
          "The wall's normal reaction supplies the inward force: \\(N = m\\omega^{2}R\\).",
          "Friction holds the weight: \\(\\mu m\\omega^{2}R \\ge mg\\), so \\(\\omega^{2} \\ge \\dfrac{g}{\\mu R} = \\dfrac{10}{1} = 10\\).",
        ],
        answer: "\\(\\sqrt{10} \\approx 3.2\\) rad/s",
      },
      practiceSet: [
        { prompt: "A car takes a 20 m turn at 36 km/h. tan of the angle a hanging pendulum makes with the vertical? (g = 10 m/s²)", answer: "0.5" },
        { prompt: "Maximum speed on a flat road of radius 40 m with μ = 0.4? (g = 10 m/s²)", answer: "\\(\\sqrt{160} \\approx 12.6\\) m/s" },
        { prompt: "A coin just slips at 2 cm from the centre of a turntable. The angular speed is doubled. Where does it now just slip?", answer: "0.5 cm" },
        { prompt: "Centrifugal force on a 2 kg body 3 m from the axis of a platform turning at 2 rad/s?", answer: "24 N" },
      ],
      pyqExampleId: "91689a67-08b3-4b36-bf51-d96a28970534", // 2025: banked road, μ from the maximum speed v₀
      traps: [
        {
          title: "μ = v²/(rg) only on a flat road",
          body: "On a banked road the normal reaction supplies part of the inward force, so friction needs to supply less. Using the flat-road formula overstates μ.",
        },
        {
          title: "Convert km/h before squaring",
          body: "54 km/h is 15 m/s (multiply by 5/18). Squaring 54 instead gives an answer about 13 times too large.",
        },
        {
          title: "Centrifugal force belongs to the rotating frame",
          body: "From the ground, a body in a circle has an unbalanced inward force and no outward one. Add mω²r outward only when working in the rotating frame.",
        },
      ],
    },
  ],
};
