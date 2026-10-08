import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_KIN_PROJECTILE_CIRCULAR_NOTE: SubtopicNote = {
  subtopicName: "Projectiles and Circular Motion",
  title: "Projectile Motion and Uniform Circular Motion",
  oneLineDefinition:
    "A projectile moves steadily sideways while falling freely; a body going round a circle at constant speed is still accelerating, towards the centre.",
  whyItMatters:
    "The 2021 paper asked for the speed and acceleration of a ball whirled in a horizontal circle at a given angular velocity. Projectiles have not been asked yet, but they are on the syllabus and follow directly from free fall.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-kin-projectile",
      name: "Projectile motion: horizontal and vertical parts are independent",
      intuition:
        "Throw a ball sideways and drop another from the same height at the same moment: they land together. Gravity acts only downwards, so it changes the vertical motion and leaves the horizontal motion alone. Treat a projectile as two separate motions sharing one clock: steady speed across, free fall down.",
      definition:
        "Ignoring air resistance:\n" +
        "- **Horizontal**: no force, so the horizontal velocity \\(u_x\\) is **constant**: \\(x = u_x t\\).\n" +
        "- **Vertical**: acceleration \\(g\\) downwards, exactly as in free fall.\n" +
        "- The **time of flight** is set by the vertical motion alone.\n" +
        "- Launched at speed \\(u\\) and angle \\(\\theta\\): \\(u_x = u\\cos\\theta\\), \\(u_y = u\\sin\\theta\\).\n" +
        "- At the **highest point** the vertical velocity is zero, but the body still moves sideways at \\(u_x\\).\n" +
        "- On level ground the range is greatest at a launch angle of \\(45^\\circ\\).",
      formula: {
        label: "Launch from level ground",
        latex: "t_{\\text{flight}} = \\frac{2u_y}{g} \\qquad R = u_x\\, t_{\\text{flight}}",
        symbols: [
          { symbol: "\\(u_x, u_y\\)", meaning: "horizontal and vertical components of the launch velocity" },
          { symbol: "\\(R\\)", meaning: "horizontal range on level ground" },
        ],
      },
      authoredExample: {
        prompt:
          "A marble rolls off a table 0.80 m high at 3.0 m/s horizontally. Taking \\(g = 10\\ \\text{m/s}^2\\), how long is it in the air and how far from the table does it land?",
        steps: [
          "Vertically it starts with zero velocity: \\(0.80 = \\tfrac{1}{2} \\times 10 \\times t^2\\), so \\(t^2 = 0.16\\) and \\(t = 0.40\\ \\text{s}\\).",
          "Horizontally the speed stays 3.0 m/s: \\(x = 3.0 \\times 0.40 = 1.2\\ \\text{m}\\).",
        ],
        answer: "0.40 s; 1.2 m from the table",
      },
      selfCheckExample: {
        prompt:
          "A ball is kicked from level ground with a horizontal velocity component of 12 m/s and a vertical component of 16 m/s. Taking \\(g = 10\\ \\text{m/s}^2\\) and ignoring air resistance, how far away does it land?",
        options: ["19.2 m", "38.4 m", "40 m", "51.2 m", "64 m"],
        steps: [
          "Time of flight from the vertical part: \\(t = 2u_y/g = 2 \\times 16/10 = 3.2\\ \\text{s}\\).",
          "Range from the horizontal part: \\(R = 12 \\times 3.2 = 38.4\\ \\text{m}\\).",
          "A uses only the time to the top (1.6 s). C is the range for the same 20 m/s launched at 45°. D multiplies by the vertical component and E by the full speed.",
        ],
        answer: "(B) 38.4 m",
      },
      practiceSet: [
        { prompt: "What is a projectile's speed at the top of its path, if launched at 15 m/s horizontally and 8 m/s vertically?", answer: "15 m/s", method: "Only the horizontal part is left" },
        { prompt: "What is the acceleration of a projectile at the top of its path?", answer: "\\(g\\), downwards", method: "Gravity never switches off" },
        { prompt: "One ball is dropped and another fired horizontally from the same height at the same time. Which lands first?", answer: "They land together", method: "Same vertical motion" },
      ],
      traps: [
        {
          title: "At the top of its path a projectile is still moving",
          body: "Only the vertical velocity is zero at the highest point. The horizontal velocity is unchanged, so the speed there equals \\(u\\cos\\theta\\), not zero.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-kin-circular-quantities",
      name: "Period, frequency and angular velocity in circular motion",
      intuition:
        "A point on a spinning wheel repeats the same journey again and again. The period is the time for one turn and the frequency is how many turns happen each second. Angular velocity measures the angle swept per second; points further from the centre sweep the same angle but cover more distance, so they move faster.",
      definition:
        "For **uniform circular motion** (constant speed round a circle of radius \\(r\\)):\n" +
        "- **Period** \\(T\\): time for one revolution, in s. **Frequency** \\(f = 1/T\\), in hertz (revolutions per second).\n" +
        "- **Angular velocity** \\(\\omega\\): angle swept per second, in rad/s. One revolution is \\(2\\pi\\) rad, so \\(\\omega = 2\\pi/T = 2\\pi f\\).\n" +
        "- **Speed** along the circle: \\(v = 2\\pi r/T = \\omega r\\).\n" +
        "- Revolutions per minute (rpm): divide by 60 to get hertz.",
      formula: {
        label: "Circular motion quantities",
        latex: "f = \\frac{1}{T} \\qquad \\omega = \\frac{2\\pi}{T} = 2\\pi f \\qquad v = \\omega r",
        symbols: [
          { symbol: "\\(T\\)", meaning: "period, in s" },
          { symbol: "\\(f\\)", meaning: "frequency, in Hz" },
          { symbol: "\\(\\omega\\)", meaning: "angular velocity, in rad/s" },
          { symbol: "\\(r\\)", meaning: "radius of the circle, in m" },
        ],
      },
      authoredExample: {
        prompt:
          "A bicycle wheel of radius 0.30 m turns at 5.0 revolutions per second. Find its period, its angular velocity and the speed of a point on the rim.",
        steps: [
          "\\(T = 1/f = 1/5.0 = 0.20\\ \\text{s}\\).",
          "\\(\\omega = 2\\pi f = 2\\pi \\times 5.0 = 10\\pi \\approx 31\\ \\text{rad/s}\\).",
          "\\(v = \\omega r = 31.4 \\times 0.30 \\approx 9.4\\ \\text{m/s}\\).",
        ],
        answer: "0.20 s; about 31 rad/s; about 9.4 m/s",
      },
      selfCheckExample: {
        prompt:
          "A turntable spins at 120 revolutions per minute. What is the speed of a point 0.10 m from its centre?",
        options: ["12 m/s", "0.20 m/s", "0.63 m/s", "1.3 m/s", "75 m/s"],
        steps: [
          "\\(f = 120/60 = 2.0\\ \\text{Hz}\\), so \\(\\omega = 2\\pi \\times 2.0 \\approx 12.6\\ \\text{rad/s}\\).",
          "\\(v = \\omega r = 12.6 \\times 0.10 \\approx 1.3\\ \\text{m/s}\\).",
          "A multiplies rpm by the radius. B uses \\(f r\\) without the \\(2\\pi\\). C uses \\(\\pi\\) instead of \\(2\\pi\\). E forgets to change minutes into seconds.",
        ],
        answer: "(D) 1.3 m/s",
      },
      practiceSet: [
        { prompt: "What is the period of a fan turning at 4.0 Hz?", answer: "0.25 s", method: "\\(T = 1/f\\)" },
        { prompt: "What is the angular velocity of a body with a period of 2.0 s?", answer: "\\(\\pi\\) rad/s, about 3.1 rad/s", method: "\\(2\\pi/T\\)" },
        { prompt: "A motor spins at 3000 rpm. What is its frequency?", answer: "50 Hz", method: "\\(3000/60\\)" },
      ],
      traps: [
        {
          title: "Change rpm into hertz before using 2π",
          body: "Angular velocity in rad/s needs revolutions per SECOND. A value in revolutions per minute must be divided by 60 first, or the answer is 60 times too big.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-kin-centripetal-acc",
      name: "Centripetal acceleration: always towards the centre",
      intuition:
        "On a circle the speed can stay constant while the direction keeps turning. A change of direction is a change of velocity, so the body is accelerating. The change always points towards the centre, which is why this acceleration is called centripetal (centre-seeking).",
      definition:
        "- A body in **uniform circular motion** has constant speed but a changing velocity, so it **accelerates**.\n" +
        "- The **centripetal acceleration** points **towards the centre** of the circle, at right angles to the velocity.\n" +
        "- Its size is \\(a = v^2/r = \\omega^2 r\\).\n" +
        "- The velocity at any instant is along the **tangent** to the circle.",
      formula: {
        label: "Centripetal acceleration",
        latex: "a = \\frac{v^2}{r} = \\omega^2 r",
        symbols: [
          { symbol: "\\(v\\)", meaning: "speed along the circle, in m/s" },
          { symbol: "\\(r\\)", meaning: "radius, in m" },
          { symbol: "\\(\\omega\\)", meaning: "angular velocity, in rad/s" },
        ],
      },
      authoredExample: {
        prompt:
          "A car takes a flat circular bend of radius 80 m at a steady 20 m/s. Find the size and direction of its acceleration.",
        steps: [
          "\\(a = v^2/r = 20^2/80 = 400/80 = 5.0\\ \\text{m/s}^2\\).",
          "It points towards the centre of the bend. The speedometer reading does not change, yet the car accelerates because its direction changes.",
        ],
        answer: "\\(5.0\\ \\text{m/s}^2\\), towards the centre of the bend",
      },
      selfCheckExample: {
        prompt:
          "A car goes round the same bend twice, the second time at double the speed. What happens to its centripetal acceleration?",
        options: [
          "It becomes four times as large",
          "It doubles",
          "It stays the same, because the radius is the same",
          "It halves",
          "It becomes zero, because the speed is constant on each lap",
        ],
        steps: [
          "\\(a = v^2/r\\): with \\(r\\) fixed, \\(a\\) goes as \\(v^2\\), and \\(2^2 = 4\\).",
          "B treats \\(a\\) as proportional to \\(v\\). E forgets that a change of direction is an acceleration.",
        ],
        answer: "(A) It becomes four times as large",
      },
      practiceSet: [
        { prompt: "Find the centripetal acceleration of a body moving at 6.0 m/s in a circle of radius 2.0 m.", answer: "\\(18\\ \\text{m/s}^2\\)", method: "\\(36/2.0\\)" },
        { prompt: "Find the centripetal acceleration at 4.0 rad/s and radius 0.50 m.", answer: "\\(8.0\\ \\text{m/s}^2\\)", method: "\\(\\omega^2 r = 16 \\times 0.50\\)" },
        { prompt: "A centrifuge holds a sample 0.10 m from the axis at 100 rad/s. What is the sample's acceleration?", answer: "\\(1.0 \\times 10^3\\ \\text{m/s}^2\\)", method: "\\(\\omega^2 r = 10^4 \\times 0.10\\)" },
      ],
      traps: [
        {
          title: "Constant speed in a circle still means acceleration",
          body: "Uniform circular motion has a constant speed but not a constant velocity. The acceleration \\(v^2/r\\) points towards the centre. An option giving zero acceleration for a body moving steadily round a circle is wrong.",
        },
      ],
    },
  ],
};
