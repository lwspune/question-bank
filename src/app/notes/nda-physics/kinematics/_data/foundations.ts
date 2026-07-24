import type { SubtopicNote } from "@/app/notes/_types";

export const FOUNDATIONS_NOTE: SubtopicNote = {
  subtopicName: "Vectors and Position",
  title: "Foundations: Vectors, Distance, Displacement, and Position",
  oneLineDefinition:
    "Motion is described with scalars (magnitude only — distance, speed) and vectors (magnitude and direction — displacement, velocity, acceleration); the position vector r(t) packages where a particle is at every instant.",
  whyItMatters:
    "Start here. Almost every wrong answer in this chapter comes from confusing a quantity with its magnitude: distance with displacement, speed with velocity, the position vector with its length. " +
    "Three PYQs sit directly here — the scalar/vector classification, the position-vector r(t) (HARD), and a two-leg net-displacement problem (HARD) — and the distinction underpins the round-trip and average-velocity questions in the next subtopic. " +
    "Get the definitions watertight and the rest of kinematics becomes arithmetic.",
  concepts: [
    // 1 — scalars vs vectors (REFERENCE)
    {
      kind: "reference" as const,
      slug: "scalars-vs-vectors",
      name: "Scalars vs vectors",
      intuition:
        "A scalar is fully described by a number and a unit — how much. A vector also needs a direction — how much and which way. " +
        "Distance is a scalar (5 km); displacement is a vector (5 km north). Speed is a scalar (30 m/s); velocity is a vector (30 m/s east). This single split decides most of the chapter's true/false options.",
      definition:
        "- A **scalar** has magnitude only: distance, speed, time, mass, energy, temperature.\n" +
        "- A **vector** has magnitude AND direction: displacement, velocity, acceleration, force, momentum.\n" +
        "Two vectors are equal only if both their magnitude and direction match. A scalar can never equal a vector.",
      table: {
        columns: ["Quantity", "Type", "Why"],
        rows: [
          { cells: ["Distance", "Scalar", "Total path length — no direction"] },
          {
            cells: ["Displacement", "Vector", "Straight-line change in position, with direction"],
          },
          {
            cells: ["Speed", "Scalar", "Rate of distance — magnitude only"],
            noteAmber: "NDA 2022 — speed is scalar, velocity is vector. The single most-tested line of this subtopic.",
            pyqExampleId: "f9fc4068-fe22-416d-acf0-70a114eeeb50",
          },
          { cells: ["Velocity", "Vector", "Rate of displacement — has direction"] },
          { cells: ["Acceleration", "Vector", "Rate of change of velocity — has direction"] },
        ],
        caption:
          "Pair each scalar with its vector cousin: distance/displacement, speed/velocity. The vector member always carries a direction.",
      },
      selfCheckExample: {
        prompt:
          "Classify each as scalar or vector: (i) the reading on a car's speedometer, (ii) a 3 km walk that ends back where it started, measured as displacement, (iii) the temperature of a room.",
        steps: [
          "(i) A speedometer shows SPEED — magnitude of velocity, no direction → scalar.",
          "(ii) Displacement is a vector; here the start and end coincide so its magnitude is 0, but it is still a vector quantity.",
          "(iii) Temperature has magnitude only → scalar.",
        ],
        answer: "(i) scalar, (ii) vector (magnitude 0), (iii) scalar.",
      },
      practiceSet: [
        { prompt: "Is speed a scalar or a vector?", answer: "Scalar" },
        { prompt: "Is velocity a scalar or a vector?", answer: "Vector" },
        { prompt: "Is distance a scalar or a vector?", answer: "Scalar" },
        { prompt: "Is displacement a scalar or a vector?", answer: "Vector" },
      ],
      pyqExampleId: "f9fc4068-fe22-416d-acf0-70a114eeeb50", // 2022 — speed scalar, velocity vector
      traps: [
        {
          title: "Speed is the scalar; velocity is the vector",
          body:
            "The dominant distractor swaps them or calls both vectors. Speed is the magnitude of velocity (no direction); velocity carries a direction. A change in direction alone changes the velocity even when the speed is unchanged.",
        },
      ],
    },

    // 2 — distance vs displacement
    {
      kind: "formula" as const,
      slug: "distance-vs-displacement",
      name: "Distance vs displacement",
      intuition:
        "Distance is how far you actually travelled — the full length of the path, never negative, never decreasing. Displacement is the straight arrow from start to finish — it has a direction and can be zero even after a long trip if you return to the start.",
      definition:
        "**Distance** is the total path length covered (a scalar, always \\(\\geq 0\\)). " +
        "**Displacement** is the straight-line vector from the initial to the final position; its magnitude \\(\\leq\\) distance, with equality only for motion in a single straight line without reversal. " +
        "For any closed loop (return to start), displacement \\(= 0\\) while distance \\(=\\) the path length.",
      formula: {
        label: "Distance and displacement",
        latex: "|\\vec{s}| \\leq d \\qquad \\vec{s}_{\\text{round trip}} = 0",
        symbols: [
          { symbol: "d", meaning: "distance (total path length, scalar)" },
          { symbol: "\\(\\vec{s}\\)", meaning: "displacement (start → finish, vector)" },
        ],
      },
      authoredExample: {
        prompt:
          "A runner goes 300 m east, then 400 m north. Find the total distance and the magnitude of the displacement.",
        steps: [
          "Distance = total path = \\(300 + 400 = 700\\) m.",
          "Displacement is the straight line from start to finish — the two legs are perpendicular, so use Pythagoras.",
          "\\(|\\vec{s}| = \\sqrt{300^2 + 400^2} = \\sqrt{90000 + 160000} = \\sqrt{250000} = 500\\) m.",
        ],
        answer: "Distance 700 m; displacement 500 m (north-east of the start).",
      },
      selfCheckExample: {
        prompt:
          "A cyclist rides 2 km north then 2 km south back to the start. Find the distance and the displacement.",
        steps: [
          "Distance = total path = \\(2 + 2 = 4\\) km.",
          "Start and finish are the same point, so the displacement is 0.",
        ],
        answer: "Distance 4 km; displacement 0.",
      },
      practiceSet: [
        { prompt: "A particle moves 6 m right then 8 m up. Magnitude of displacement?", answer: "10 m", method: "√(6² + 8²)" },
        { prompt: "You walk once around a 400 m track and stop at the start. Displacement?", answer: "0" },
        { prompt: "Can displacement ever exceed distance?", answer: "No — distance ≥ |displacement| always" },
        { prompt: "When are distance and displacement magnitude equal?", answer: "Straight-line motion with no reversal" },
      ],
      pyqExampleId: "eb413fdf-d6b2-4981-8d2c-dd342b82a89f", // 2019 — round trip, avg velocity 0
      traps: [
        {
          title: "Round trip: distance is non-zero, displacement is zero",
          body:
            "On any out-and-back trip the displacement is 0, so the average VELOCITY is 0 — but the distance and the average SPEED are not. The 50 km out-and-back PYQ tests exactly this: average velocity = 0, average speed = total distance / time.",
        },
      ],
    },

    // 3 — speed vs velocity & averages
    {
      kind: "formula" as const,
      slug: "speed-vs-velocity",
      name: "Speed, velocity, and their averages",
      intuition:
        "Average speed divides total path by total time; average velocity divides the displacement vector by total time. On a round trip the average velocity is zero (no net displacement) while the average speed is not. Mixing the two is the classic trap.",
      definition:
        "**Average speed** \\(= \\dfrac{\\text{total distance}}{\\text{total time}}\\) (scalar). " +
        "**Average velocity** \\(= \\dfrac{\\text{displacement}}{\\text{total time}}\\) (vector). " +
        "Speed is the magnitude of instantaneous velocity. The two averages coincide only for straight-line motion without reversal.",
      formula: {
        label: "Average speed and velocity",
        latex: "\\bar{v}_{\\text{speed}} = \\dfrac{d}{t} \\qquad \\bar{v}_{\\text{velocity}} = \\dfrac{\\vec{s}}{t}",
        symbols: [
          { symbol: "d", meaning: "total distance" },
          { symbol: "\\(\\vec{s}\\)", meaning: "total displacement" },
          { symbol: "t", meaning: "total time" },
        ],
      },
      authoredExample: {
        prompt:
          "A car covers 120 km in 2 hours along a straight road in one direction. Find its average speed and the magnitude of its average velocity.",
        steps: [
          "Straight-line motion, no reversal — distance = displacement magnitude = 120 km.",
          "Average speed = \\(120 / 2 = 60\\) km/h.",
          "Average velocity magnitude = displacement / time = \\(120 / 2 = 60\\) km/h.",
          "They are equal here because the path is a single straight line.",
        ],
        answer: "Average speed 60 km/h; average velocity 60 km/h (equal, straight-line motion).",
      },
      selfCheckExample: {
        prompt:
          "A car drives 50 km south, turns around, and returns to the start, the whole round trip taking 2 hours. Find the magnitude of its average velocity and its average speed.",
        steps: [
          "Round trip → displacement = 0 → average velocity = \\(0 / 2 = 0\\).",
          "Distance = \\(50 + 50 = 100\\) km → average speed = \\(100 / 2 = 50\\) km/h.",
        ],
        answer: "Average velocity 0; average speed 50 km/h.",
      },
      practiceSet: [
        { prompt: "Odometer reads 2000 km then 2400 km after 8 h. Average speed?", answer: "50 km/h", method: "(2400−2000)/8" },
        { prompt: "Round-trip average velocity is always what?", answer: "0", method: "net displacement is 0" },
        { prompt: "Speed is the magnitude of what vector?", answer: "Velocity" },
      ],
      pyqExampleId: "5632c345-0425-4069-b90f-8be366c98781", // 2023 — odometer avg speed 50 km/h
      traps: [
        {
          title: "Average speed is NOT |average velocity| in general",
          body:
            "Average speed uses total distance; average velocity uses displacement. They match only for straight-line, no-reversal motion. Whenever a path curves or reverses, average speed > |average velocity|.",
        },
      ],
    },

    // 4 — position vector & net displacement
    {
      kind: "formula" as const,
      slug: "position-vector-and-net-displacement",
      name: "Position vector r(t) and net displacement",
      intuition:
        "The position vector r(t) lists a particle's x, y, z coordinates as functions of time, all in one expression. Differentiate it once to get velocity, again to get acceleration. When motion happens in two perpendicular legs, combine the legs with Pythagoras to get the net displacement.",
      definition:
        "The **position vector** \\(\\vec{r}(t) = x(t)\\hat{i} + y(t)\\hat{j} + z(t)\\hat{k}\\) gives the location at time \\(t\\). " +
        "Velocity is its time derivative, \\(\\vec{v} = \\dfrac{d\\vec{r}}{dt}\\); acceleration is \\(\\vec{a} = \\dfrac{d\\vec{v}}{dt}\\). " +
        "For two perpendicular displacement legs, the net displacement magnitude is \\(\\sqrt{s_x^2 + s_y^2}\\).",
      formula: {
        label: "Position vector and its derivatives",
        latex: "\\vec{v} = \\dfrac{d\\vec{r}}{dt}, \\quad \\vec{a} = \\dfrac{d\\vec{v}}{dt}, \\quad |\\vec{s}_{\\text{net}}| = \\sqrt{s_x^2 + s_y^2}",
        symbols: [
          { symbol: "\\(\\vec{r}\\)", meaning: "position vector" },
          { symbol: "\\(\\vec{v}\\)", meaning: "velocity vector" },
          { symbol: "\\(\\vec{a}\\)", meaning: "acceleration vector" },
        ],
      },
      authoredExample: {
        prompt:
          "A particle has \\(\\vec{r}(t) = 3t^2\\hat{i} + 4t\\hat{j}\\) (metres, seconds). Find its velocity and acceleration at \\(t = 2\\) s.",
        steps: [
          "Differentiate once: \\(\\vec{v} = \\dfrac{d\\vec{r}}{dt} = 6t\\,\\hat{i} + 4\\,\\hat{j}\\).",
          "At \\(t = 2\\): \\(\\vec{v} = 12\\,\\hat{i} + 4\\,\\hat{j}\\) m/s.",
          "Differentiate again: \\(\\vec{a} = \\dfrac{d\\vec{v}}{dt} = 6\\,\\hat{i}\\) m/s\\(^2\\) (constant).",
        ],
        answer: "\\(\\vec{v} = 12\\,\\hat{i} + 4\\,\\hat{j}\\) m/s; \\(\\vec{a} = 6\\,\\hat{i}\\) m/s\\(^2\\).",
      },
      selfCheckExample: {
        prompt:
          "A vehicle starts from rest, accelerates at 2 m/s² east for 10 s, stops, then accelerates at \\(4\\sqrt{2}\\) m/s² south for 10 s. Find the magnitude of its net displacement.",
        steps: [
          "East leg: \\(s_E = \\tfrac{1}{2}(2)(10)^2 = 100\\) m.",
          "South leg: \\(s_S = \\tfrac{1}{2}(4\\sqrt{2})(10)^2 = 200\\sqrt{2}\\) m.",
          "Legs are perpendicular: \\(|\\vec{s}| = \\sqrt{100^2 + (200\\sqrt{2})^2} = \\sqrt{10000 + 80000} = \\sqrt{90000} = 300\\) m.",
        ],
        answer: "300 m.",
      },
      practiceSet: [
        { prompt: "Given \\(\\vec{r} = 5t\\,\\hat{i}\\), what is the acceleration?", answer: "0", method: "v = 5î constant → a = 0" },
        { prompt: "Legs of 30 m east and 40 m north. Net displacement?", answer: "50 m", method: "√(30² + 40²)" },
        { prompt: "Velocity is the derivative of which quantity?", answer: "Position vector r(t)" },
      ],
      pyqExampleId: "92b8e7f0-566e-475a-b1df-102ad078bcf0", // 2024 HARD — net displacement 300 m
      traps: [
        {
          title: "Add perpendicular legs as vectors, not as numbers",
          body:
            "A common error sums the two leg distances arithmetically (100 + 200√2 ≈ 383 m). Perpendicular displacements must be combined with Pythagoras: √(100² + (200√2)²) = 300 m. Only collinear legs add directly.",
        },
        {
          title: "Force ∥ momentum needs both vectors checked",
          body:
            "For \\(\\vec{r} = \\sqrt{3}t^2\\hat{i} + \\sqrt{2}t\\hat{j} + \\sqrt{5}\\hat{k}\\), the force is \\(m\\vec{a} = 2\\sqrt{3}m\\,\\hat{i}\\) (pure \\(\\hat{i}\\)) while at \\(t=0\\) the momentum is \\(m\\sqrt{2}\\,\\hat{j}\\) (pure \\(\\hat{j}\\)). They are perpendicular at that instant — differentiate twice and compare directions, do not assume force is along motion.",
        },
      ],
    },
  ],
};
