import type { SubtopicNote } from "@/app/notes/_types";

export const RELATIVE_PLANE_NOTE: SubtopicNote = {
  subtopicName: "Velocity in a Plane and Relative Velocity",
  title: "Velocity in a Plane and Relative Velocity",
  oneLineDefinition:
    "Velocity and acceleration in a plane are the time derivatives of the position vector, taken one component at a time; the velocity of A as seen from B is v_A − v_B, which settles river crossings, rain and umbrellas, and anything watched from a moving vehicle.",
  whyItMatters:
    "Nineteen PYQs, fourteen of them multiple choice, and four from 2026. Ten give a position or a force as a function of time and ask for a velocity, a direction or the shape of the path. Four are river crossings and five change the frame: rain seen by a runner, a bomb seen from its plane, a ball thrown from a moving boat. Every one of them is component-by-component work; say which axis an angle is measured from before you write it.",
  concepts: [
    // C1 — r(t), v(t), a(t)
    {
      kind: "formula" as const,
      slug: "jpplane-position-velocity",
      name: "Position, velocity and acceleration vectors",
      intuition:
        "Motion in a plane is two straight-line motions running side by side, one along x and one along y. Differentiate each coordinate on its own to get the velocity components, and again to get the acceleration. The direction of motion is the direction of the velocity, and the net force always points along the acceleration, which need not be the direction of motion.",
      definition:
        "- \\(\\vec{v} = \\dfrac{d\\vec{r}}{dt}\\), \\(\\vec{a} = \\dfrac{d\\vec{v}}{dt}\\), component by component.\n" +
        "- Speed \\(|\\vec{v}| = \\sqrt{v_x^{2} + v_y^{2}}\\); direction \\(\\tan\\theta = v_y/v_x\\) from the x-axis. From the y-axis it is \\(\\tan^{-1}(v_x/v_y)\\).\n" +
        "- Constant acceleration: \\(\\vec{v} = \\vec{u} + \\vec{a}t\\), \\(\\vec{r} = \\vec{r}_0 + \\vec{u}t + \\tfrac{1}{2}\\vec{a}t^{2}\\), and \\(v_x^{2} = u_x^{2} + 2a_x x\\) along each axis.\n" +
        "- Net force is along \\(\\vec{a}\\): \\(\\vec{F} = m\\vec{a}\\). A force that varies with time is integrated, starting from the stated initial velocity and position.\n" +
        "- Shape of the path: eliminate t. One coordinate linear and the other quadratic in t gives a parabola; \\(x = a\\cos\\omega t\\), \\(y = a\\sin\\omega t\\) gives a circle of radius a.",
      formula: {
        label: "Motion in two dimensions",
        latex:
          "\\vec{v} = \\frac{d\\vec{r}}{dt},\\ \\vec{a} = \\frac{d\\vec{v}}{dt} \\qquad \\vec{r} = \\vec{r}_0 + \\vec{u}t + \\tfrac{1}{2}\\vec{a}t^{2} \\qquad \\tan\\theta = \\frac{v_y}{v_x}",
      },
      authoredExample: {
        prompt:
          "A particle's position is \\(\\vec{r} = (t^{3}\\hat{i} + 6t\\hat{j})\\) m. Find its speed and direction of motion at t = 2 s, and the direction of the net force on it.",
        steps: [
          "\\(\\vec{v} = 3t^{2}\\hat{i} + 6\\hat{j}\\); at t = 2 s, \\(\\vec{v} = 12\\hat{i} + 6\\hat{j}\\ \\text{m/s}\\).",
          "Speed \\(= \\sqrt{144 + 36} = 6\\sqrt{5} \\approx 13.4\\ \\text{m/s}\\), at \\(\\tan^{-1}\\tfrac{1}{2}\\) above +x.",
          "\\(\\vec{a} = 6t\\hat{i}\\), so the net force is along +x, not along the motion.",
        ],
        answer: "\\(6\\sqrt{5}\\ \\text{m/s}\\) at \\(\\tan^{-1}(1/2)\\) to +x; force along +x",
      },
      selfCheckExample: {
        prompt:
          "A particle leaves the origin with velocity \\(4\\hat{j}\\) m/s and has a constant acceleration \\(2\\hat{i}\\ \\text{m/s}^{2}\\). Find its position and velocity at t = 3 s, and the shape of its path.",
        steps: [
          "\\(x = \\tfrac{1}{2}(2)(3)^{2} = 9\\ \\text{m}\\), \\(y = 4(3) = 12\\ \\text{m}\\); \\(\\vec{v} = 6\\hat{i} + 4\\hat{j}\\ \\text{m/s}\\).",
          "\\(x = t^{2}\\), \\(y = 4t\\), so \\(y^{2} = 16x\\): a parabola.",
        ],
        answer: "\\(9\\hat{i} + 12\\hat{j}\\) m, \\(6\\hat{i} + 4\\hat{j}\\) m/s; a parabola",
      },
      practiceSet: [
        { prompt: "\\(x = 3\\cos 2t\\), \\(y = 3\\sin 2t\\) (metres, seconds). Shape of the path and speed?", answer: "A circle of radius 3 m, at 6 m/s" },
        { prompt: "\\(\\vec{r} = 2t\\hat{i} + 5t^{2}\\hat{j}\\). Direction of the net force?", answer: "Along +y", method: "\\(\\vec{a} = 10\\hat{j}\\), constant." },
        { prompt: "\\(x = 2t\\), \\(y = 4t\\). What kind of motion?", answer: "Uniform motion along the straight line y = 2x" },
        { prompt: "\\(\\vec{v} = 3\\hat{i} - 4\\hat{j}\\) m/s. Speed, and angle with the −y axis?", answer: "5 m/s, at \\(\\tan^{-1}(3/4)\\)" },
      ],
      pyqExampleId: "d62063c2-add4-4ba7-a2e5-8f374f8a3e73", // 24 Jan 2025: speed and direction from r(t)
      traps: [
        {
          title: "Quoting an angle without its axis",
          body: "A velocity 4i − j m/s is at tan⁻¹(1/4) below the +x axis and at tan⁻¹ 4 from the −y axis. Options often give the right number against the wrong axis.",
        },
        {
          title: "Force along the motion",
          body: "The net force points along the acceleration. For r = 2t i + t² j the particle moves diagonally, but the force is along +y only.",
        },
      ],
    },

    // C2 — river crossing
    {
      kind: "formula" as const,
      slug: "jpplane-river",
      name: "Crossing a river",
      intuition:
        "The boat's velocity relative to the water and the river's velocity add as vectors. Only the part of the boat's own velocity that points across the river carries it to the far bank, so that part alone fixes the crossing time. Whatever along-river velocity is left over, the river's plus the boat's own, carries it downstream for that time.",
      definition:
        "- River width d, flow u, boat speed v in still water.\n" +
        "- Heading straight across: least time \\(t = d/v\\); drift downstream \\(= ut\\).\n" +
        "- Heading at angle θ to the flow: across speed \\(v\\sin\\theta\\), so \\(t = \\dfrac{d}{v\\sin\\theta}\\); along-river speed \\(u + v\\cos\\theta\\).\n" +
        "- To land directly opposite (shortest path), head upstream at α from straight across with \\(\\sin\\alpha = u/v\\); then \\(t = \\dfrac{d}{\\sqrt{v^{2} - u^{2}}}\\). This needs \\(v > u\\).\n" +
        "- Swimmer as fast as the river: the resultant bisects the angle between the heading and the flow.\n" +
        "- A round trip is two crossings, and the drift adds up over both.",
      formula: {
        label: "Crossing time and drift",
        latex:
          "t_{\\min} = \\frac{d}{v} \\qquad x_{drift} = \\frac{ud}{v} \\qquad \\sin\\alpha = \\frac{u}{v},\\ t = \\frac{d}{\\sqrt{v^{2} - u^{2}}}",
      },
      authoredExample: {
        prompt:
          "A river 120 m wide flows at 3 m/s. A boat moves at 5 m/s in still water. (a) It heads straight across: how long does it take and how far downstream does it land? (b) Which way must it head to land directly opposite, and how long does that take?",
        steps: [
          "(a) \\(t = \\dfrac{120}{5} = 24\\ \\text{s}\\); drift \\(= 3 \\times 24 = 72\\ \\text{m}\\).",
          "(b) \\(\\sin\\alpha = \\dfrac{3}{5}\\), so head \\(37^{\\circ}\\) upstream of straight across.",
          "Across speed \\(\\sqrt{25 - 9} = 4\\ \\text{m/s}\\), so \\(t = \\dfrac{120}{4} = 30\\ \\text{s}\\).",
        ],
        answer: "(a) 24 s, 72 m downstream; (b) \\(37^{\\circ}\\) upstream of straight across, 30 s",
      },
      selfCheckExample: {
        prompt:
          "A swimmer moves at 2 m/s in still water and heads at \\(120^{\\circ}\\) to the direction of flow of a river 60 m wide that flows at 1 m/s. How long does the crossing take, and where does the swimmer land?",
        steps: [
          "Across: \\(2\\sin 120^{\\circ} = \\sqrt{3}\\ \\text{m/s}\\), so \\(t = \\dfrac{60}{\\sqrt{3}} = 20\\sqrt{3} \\approx 34.6\\ \\text{s}\\).",
          "Along the river: \\(1 + 2\\cos 120^{\\circ} = 1 - 1 = 0\\).",
        ],
        answer: "\\(20\\sqrt{3}\\) s, landing directly opposite",
      },
      practiceSet: [
        { prompt: "River 1 km wide, flow 3 km/h, swimmer 5 km/h heading straight across. Time and drift?", answer: "12 minutes, 600 m downstream" },
        { prompt: "A boat at 2 m/s in still water, a river at 3 m/s. Can it land directly opposite?", answer: "No: that needs the boat to be faster than the river" },
        { prompt: "River 80 m wide, boat 5 m/s, flow 4 m/s, shortest path. Time taken?", answer: "\\(80/3 \\approx 26.7\\ \\text{s}\\)" },
      ],
      pyqExampleId: "04094ee5-0a83-4470-88df-c6fc257d2adf", // 21 Jan 2026 Shift 2: round trip, minimum time
      traps: [
        {
          title: "Dividing the width by the resultant speed",
          body: "The crossing time is the width divided by the ACROSS component of the boat's own velocity. The river's flow is along the banks, so it never shortens or lengthens the crossing.",
        },
        {
          title: "Least time is not shortest path",
          body: "Heading straight across gives the least time but lands downstream. Landing directly opposite needs an upstream heading and always takes longer.",
        },
      ],
    },

    // C3 — relative velocity and change of frame
    {
      kind: "formula" as const,
      slug: "jpplane-relative-frames",
      name: "Relative velocity and change of frame",
      intuition:
        "What an observer sees is the object's velocity minus the observer's own. Rain falling straight down looks slanted to a runner because the runner's velocity is subtracted from it. A bomb released from a plane keeps the plane's horizontal speed, so the pilot sees it fall straight down. Work out the motion in whichever frame makes it simplest, then subtract or add the frame's velocity.",
      definition:
        "- \\(\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B\\): velocity of A as seen from B.\n" +
        "- Rain and umbrella: \\(\\vec{v}_{rain,man} = \\vec{v}_{rain} - \\vec{v}_{man}\\); hold the umbrella along this relative velocity, tilted towards it.\n" +
        "- Rain that appears vertical: the man's velocity equals the rain's horizontal component.\n" +
        "- A body released from a moving vehicle starts with the vehicle's velocity. Seen from the vehicle (no acceleration of its own), it falls straight down.\n" +
        "- A ball thrown straight up from a cart moving at V lands back in the cart; seen from the ground it moves sideways at V for its whole time in the air, \\(2u/g\\) for an upward throw at u, so it lands \\(2uV/g\\) from where it was thrown.\n" +
        "- To hit a plane flying overhead at speed V, a shell of speed u needs \\(u\\cos\\theta = V\\), so both cover the same horizontal distance.",
      formula: {
        label: "Relative velocity",
        latex: "\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B \\qquad \\tan\\theta_{umbrella} = \\frac{v_{man}}{v_{rain}}\\ (\\text{vertical rain})",
      },
      authoredExample: {
        prompt:
          "Rain falls vertically at 8 m/s. A man walks east at 6 m/s. Find the speed of the rain relative to the man and how he should hold his umbrella.",
        steps: [
          "\\(\\vec{v}_{rain} = -8\\hat{j}\\), \\(\\vec{v}_{man} = 6\\hat{i}\\), so \\(\\vec{v}_{rain,man} = -6\\hat{i} - 8\\hat{j}\\).",
          "Speed \\(= \\sqrt{36 + 64} = 10\\ \\text{m/s}\\).",
          "The rain comes at him from the east, at \\(\\tan^{-1}\\tfrac{6}{8} = 37^{\\circ}\\) to the vertical; he tilts the umbrella forward by \\(37^{\\circ}\\).",
        ],
        answer: "10 m/s; umbrella tilted forward (east) at \\(37^{\\circ}\\) to the vertical",
      },
      selfCheckExample: {
        prompt:
          "A man walking east at 3 m/s finds the rain falling vertically. When he walks east at 6 m/s, it appears to fall at \\(45^{\\circ}\\) to the vertical. Find the actual velocity of the rain.",
        steps: [
          "Let \\(\\vec{v}_{rain} = a\\hat{i} - b\\hat{j}\\). Vertical at 3 m/s means \\(a - 3 = 0\\), so \\(a = 3\\).",
          "At 6 m/s the relative velocity is \\(-3\\hat{i} - b\\hat{j}\\); \\(45^{\\circ}\\) means \\(b = 3\\).",
        ],
        answer: "\\(3\\hat{i} - 3\\hat{j}\\) m/s: \\(3\\sqrt{2}\\) m/s at \\(45^{\\circ}\\) to the vertical, towards the east",
      },
      practiceSet: [
        { prompt: "Car A goes north at 30 m/s, car B south at 20 m/s. Speed of A as seen from B?", answer: "50 m/s, northwards" },
        { prompt: "A plane flying level drops a packet. Path of the packet as seen by the pilot (no air drag)?", answer: "A vertical straight line" },
        { prompt: "A plane flies overhead at 180 m/s. A shell fired at 300 m/s should be aimed at what angle to the horizontal to hit it?", answer: "\\(\\cos\\theta = 0.6\\), so \\(\\theta \\approx 53^{\\circ}\\)" },
        { prompt: "A ball is thrown straight up at 5 m/s from a cart moving at 4 m/s \\((g = 10)\\). Horizontal distance it covers, seen from the ground?", answer: "4 m", method: "Time of flight 1 s." },
      ],
      pyqExampleId: "9b0b46b6-5cf5-43ea-b07d-a03faa6a0197", // 27 Jun 2022: umbrella at 45°, then rain appears vertical
      traps: [
        {
          title: "Subtracting in the wrong order",
          body: "The rain's velocity relative to the man is v_rain − v_man. Reversing it gives the man's velocity relative to the rain, which points the other way.",
        },
        {
          title: "Taking a released object to start from rest",
          body: "An object let go from a moving plane, boat or balloon starts with that vehicle's velocity. Taking it to start from rest gives the wrong range and the wrong path.",
        },
      ],
    },
  ],
};
