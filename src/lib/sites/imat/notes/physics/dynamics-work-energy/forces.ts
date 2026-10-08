import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_DYN_FORCES_NOTE: SubtopicNote = {
  subtopicName: "Friction, Slopes and Gravitation",
  title: "Friction, Inclined Planes, Circular Motion and Gravitation",
  oneLineDefinition:
    "Newton's second law applied to the forces met most often: friction, the pull of gravity along a slope, the centre-seeking force on a body moving in a circle, and gravity between masses.",
  whyItMatters:
    "Four past questions sit here: the acceleration of a pushed book against friction (2014), the resultant force on a car on a circular track (2015), and gravitation in 2011 and 2025, the second asking what fraction of g acts at a height above the Earth.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-dyn-friction",
      name: "Static and kinetic friction",
      intuition:
        "Push gently on a heavy box and it does not move: friction pushes back exactly as hard as you push. Push harder and at some point the box breaks free; from then on a slightly smaller, steady friction acts while it slides. Friction grows with how hard the surfaces are pressed together, which on a level floor is the weight.",
      definition:
        "- **Friction** acts along the surface, opposing sliding (or the tendency to slide).\n" +
        "- **Static friction** adjusts to match the applied force, up to a maximum \\(\\mu_s N\\). Below that limit the body stays at rest.\n" +
        "- **Kinetic (dynamic) friction** acts while sliding: \\(f_k = \\mu_k N\\), usually a little smaller than the static maximum.\n" +
        "- \\(N\\) is the **normal reaction**, the surface's push at right angles to it. On a level surface with no other vertical forces, \\(N = mg\\).\n" +
        "- To a good approximation friction does not depend on the area of contact.",
      formula: {
        label: "Friction",
        latex: "f_s \\le \\mu_s N \\qquad f_k = \\mu_k N",
        symbols: [
          { symbol: "\\(\\mu_s, \\mu_k\\)", meaning: "coefficients of static and kinetic friction (no unit)" },
          { symbol: "\\(N\\)", meaning: "normal reaction force, in N" },
        ],
      },
      authoredExample: {
        prompt:
          "A 5.0 kg box is pushed across a level floor by a horizontal force of 30 N. The coefficient of kinetic friction is 0.40. Taking \\(g = 10\\ \\text{N/kg}\\), find its acceleration once it is sliding.",
        steps: [
          "\\(N = mg = 50\\ \\text{N}\\), so \\(f_k = 0.40 \\times 50 = 20\\ \\text{N}\\).",
          "Resultant: \\(30 - 20 = 10\\ \\text{N}\\).",
          "\\(a = 10/5.0 = 2.0\\ \\text{m/s}^2\\).",
        ],
        answer: "\\(2.0\\ \\text{m/s}^2\\)",
      },
      selfCheckExample: {
        prompt:
          "A 40 kg crate rests on a level floor. The coefficients of friction are \\(\\mu_s = 0.50\\) and \\(\\mu_k = 0.30\\). A worker pushes horizontally with 150 N. Taking \\(g = 10\\ \\text{N/kg}\\), what is the friction force on the crate?",
        options: ["200 N", "150 N", "120 N", "0 N", "50 N"],
        steps: [
          "Maximum static friction: \\(0.50 \\times 400 = 200\\ \\text{N}\\). The push of 150 N is less than this, so the crate does not move.",
          "At rest the resultant force is zero, so static friction is exactly 150 N.",
          "A is only the limit, reached when the push is 200 N. C is kinetic friction, which acts only while sliding.",
        ],
        answer: "(B) 150 N",
      },
      practiceSet: [
        { prompt: "What kinetic friction acts on a 2.0 kg block sliding on a level floor with \\(\\mu_k = 0.30\\)? Take \\(g = 10\\ \\text{N/kg}\\).", answer: "6.0 N", method: "\\(0.30 \\times 20\\)" },
        { prompt: "A puck slides to rest with friction as the only horizontal force; \\(\\mu_k = 0.25\\), \\(g = 10\\ \\text{N/kg}\\). What is its deceleration?", answer: "\\(2.5\\ \\text{m/s}^2\\)", method: "\\(a = \\mu_k g\\); the mass cancels" },
        { prompt: "Does turning a brick onto a smaller face change the sliding friction much?", answer: "No", method: "Friction depends on \\(N\\), not on the contact area" },
      ],
      traps: [
        {
          title: "Static friction is only as big as it needs to be",
          body: "\\(\\mu_s N\\) is the largest value static friction can reach, not its value. A body at rest under a small push feels a friction equal to that push. Use \\(\\mu N\\) only when the body is sliding or just about to slide.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-dyn-incline",
      name: "Forces on an inclined plane",
      intuition:
        "On a slope, gravity still pulls straight down, but only part of it tries to drag the body down the slope; the rest presses it into the surface. Splitting the weight into those two parts turns a slope problem into an ordinary straight-line problem. The steeper the slope, the bigger the part along it.",
      definition:
        "On a slope at angle \\(\\theta\\) to the horizontal:\n" +
        "- Weight component **down the slope**: \\(mg\\sin\\theta\\).\n" +
        "- Weight component **into the slope**: \\(mg\\cos\\theta\\), balanced by the normal reaction, so \\(N = mg\\cos\\theta\\) (less than \\(mg\\)).\n" +
        "- Frictionless slope: \\(a = g\\sin\\theta\\), whatever the mass.\n" +
        "- With kinetic friction, for a body sliding down: \\(a = g(\\sin\\theta - \\mu_k\\cos\\theta)\\).",
      formula: {
        label: "Sliding down a slope",
        latex: "N = mg\\cos\\theta \\qquad ma = mg\\sin\\theta - \\mu_k mg\\cos\\theta",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle of the slope to the horizontal" },
          { symbol: "\\(N\\)", meaning: "normal reaction from the slope" },
        ],
      },
      authoredExample: {
        prompt:
          "A 4.0 kg block sits on a smooth (frictionless) slope at 30° to the horizontal. Taking \\(g = 10\\ \\text{N/kg}\\), find the force along the slope, the normal reaction and the acceleration.",
        steps: [
          "Along the slope: \\(mg\\sin 30^\\circ = 40 \\times 0.50 = 20\\ \\text{N}\\).",
          "Normal reaction: \\(mg\\cos 30^\\circ = 40 \\times 0.866 \\approx 35\\ \\text{N}\\).",
          "\\(a = 20/4.0 = 5.0\\ \\text{m/s}^2\\) down the slope, which is \\(g\\sin 30^\\circ\\).",
        ],
        answer: "20 N; about 35 N; \\(5.0\\ \\text{m/s}^2\\)",
      },
      selfCheckExample: {
        prompt:
          "A block slides down a slope where \\(\\sin\\theta = 0.60\\) and \\(\\cos\\theta = 0.80\\). The coefficient of kinetic friction is 0.25. Taking \\(g = 10\\ \\text{m/s}^2\\), what is its acceleration?",
        options: [
          "\\(6.0\\ \\text{m/s}^2\\)",
          "\\(8.0\\ \\text{m/s}^2\\)",
          "\\(4.0\\ \\text{m/s}^2\\)",
          "\\(6.5\\ \\text{m/s}^2\\)",
          "\\(2.5\\ \\text{m/s}^2\\)",
        ],
        steps: [
          "\\(a = g(\\sin\\theta - \\mu_k\\cos\\theta) = 10(0.60 - 0.25 \\times 0.80) = 10 \\times 0.40 = 4.0\\ \\text{m/s}^2\\).",
          "A ignores friction. B adds friction instead of subtracting it. D swaps sine and cosine. E is \\(\\mu_k g\\), friction on a level floor.",
        ],
        answer: "(C) \\(4.0\\ \\text{m/s}^2\\)",
      },
      practiceSet: [
        { prompt: "What is the normal reaction on a 10 kg box on a 60° slope? Take \\(g = 10\\ \\text{N/kg}\\).", answer: "50 N", method: "\\(100 \\cos 60^\\circ\\)" },
        { prompt: "What is the acceleration down a frictionless 30° slope? Take \\(g = 10\\ \\text{m/s}^2\\).", answer: "\\(5.0\\ \\text{m/s}^2\\)", method: "\\(g\\sin 30^\\circ\\)" },
        { prompt: "On a frictionless slope, does a heavier block slide down faster?", answer: "No", method: "\\(a = g\\sin\\theta\\), no mass in it" },
      ],
      traps: [
        {
          title: "On a slope the normal reaction is less than the weight",
          body: "The surface only has to balance the part of the weight pressing into it, \\(mg\\cos\\theta\\). Using \\(N = mg\\) on a slope makes the friction too large.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-dyn-centripetal-force",
      name: "Centripetal force for motion in a circle",
      intuition:
        "A body moving in a circle accelerates towards the centre, so by the second law a resultant force must point towards the centre. That force is not a new kind of force: it is whatever real force does the job, such as the tension in a string, friction on a car's tyres, or gravity on a satellite. Cut it off and the body flies off along the tangent.",
      definition:
        "- **Centripetal force**: the resultant force towards the centre needed for circular motion, \\(F = mv^2/r = m\\omega^2 r\\).\n" +
        "- It is supplied by a real force: string tension, friction, gravity, a normal reaction.\n" +
        "- It is at right angles to the velocity, so it changes the direction but not the speed, and does no work.\n" +
        "- If it vanishes, the body moves off in a straight line along the tangent. There is no outward \"centrifugal\" force on the body in a free-body diagram.",
      formula: {
        label: "Centripetal force",
        latex: "F = \\frac{mv^2}{r} = m\\omega^2 r",
        symbols: [
          { symbol: "\\(m\\)", meaning: "mass, in kg" },
          { symbol: "\\(v\\)", meaning: "speed, in m/s" },
          { symbol: "\\(r\\)", meaning: "radius of the circle, in m" },
        ],
      },
      authoredExample: {
        prompt:
          "A 900 kg car rounds a flat bend of radius 75 m at a steady 15 m/s. What resultant force acts on it, and what provides it?",
        steps: [
          "\\(F = mv^2/r = 900 \\times 15^2 / 75 = 900 \\times 225 / 75 = 2700\\ \\text{N}\\).",
          "It points towards the centre of the bend and is provided by sideways friction between the tyres and the road.",
          "The speed is constant, but the resultant force is not zero.",
        ],
        answer: "2700 N towards the centre, from friction",
      },
      selfCheckExample: {
        prompt:
          "A 0.20 kg ball on a string 0.80 m long is whirled in a horizontal circle at 4.0 m/s. Ignoring gravity, what is the tension in the string?",
        options: ["1.0 N", "3.2 N", "2.0 N", "4.0 N", "0 N"],
        steps: [
          "The tension provides the centripetal force: \\(T = mv^2/r = 0.20 \\times 16 / 0.80 = 4.0\\ \\text{N}\\).",
          "A uses \\(mv/r\\) (forgets to square). B forgets to divide by the radius. C uses the diameter. E assumes constant speed means no resultant force.",
        ],
        answer: "(D) 4.0 N",
      },
      practiceSet: [
        { prompt: "With the radius fixed, the speed of a body in a circle doubles. What happens to the centripetal force?", answer: "It becomes four times as large", method: "\\(F \\propto v^2\\)" },
        { prompt: "What provides the centripetal force on a satellite orbiting the Earth?", answer: "The Earth's gravity", method: "Gravity points to the centre" },
        { prompt: "A ball whirled on a string is released. In which direction does it move?", answer: "Along the tangent to the circle", method: "No more force towards the centre" },
      ],
      traps: [
        {
          title: "Uniform circular motion has a non-zero resultant force",
          body: "The speed is constant, but the resultant force is \\(mv^2/r\\) towards the centre. An option giving zero resultant force, or a force along the direction of motion, is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-dyn-gravitation",
      name: "Newton's law of universal gravitation",
      intuition:
        "Every two masses attract each other. The pull grows with each mass and falls off quickly with distance: double the separation and the force drops to a quarter. The weight we feel is just this attraction between us and the Earth, measured from the Earth's centre.",
      definition:
        "- **Law of gravitation**: \\(F = Gm_1m_2/r^2\\), where \\(r\\) is the distance between the **centres** and \\(G \\approx 6.67 \\times 10^{-11}\\ \\text{N m}^2\\text{ kg}^{-2}\\).\n" +
        "- The force on each mass is the same size (a third-law pair).\n" +
        "- It is an **inverse-square** law: \\(F \\propto 1/r^2\\).\n" +
        "- At distance \\(r\\) from the centre of a planet of mass \\(M\\): \\(g = GM/r^2\\). At a height \\(h\\) above a planet of radius \\(R\\), \\(r = R + h\\), so \\(g_h = g\\,R^2/(R + h)^2\\).",
      formula: {
        label: "Gravitational force and field strength",
        latex: "F = \\frac{G m_1 m_2}{r^2} \\qquad g = \\frac{GM}{r^2}",
        symbols: [
          { symbol: "\\(G\\)", meaning: "gravitational constant, about 6.67 × 10⁻¹¹ N m² kg⁻²" },
          { symbol: "\\(m_1, m_2, M\\)", meaning: "masses, in kg" },
          { symbol: "\\(r\\)", meaning: "distance between centres, in m" },
        ],
      },
      authoredExample: {
        prompt:
          "Two lead spheres of 1000 kg each have their centres 2.0 m apart. Taking \\(G = 6.67 \\times 10^{-11}\\ \\text{N m}^2\\text{ kg}^{-2}\\), find the force between them. What would it be if they were 4.0 m apart?",
        steps: [
          "\\(F = \\dfrac{6.67 \\times 10^{-11} \\times 1000 \\times 1000}{2.0^2} = \\dfrac{6.67 \\times 10^{-5}}{4.0} \\approx 1.7 \\times 10^{-5}\\ \\text{N}\\).",
          "Doubling the distance divides the force by \\(2^2 = 4\\): about \\(4.2 \\times 10^{-6}\\ \\text{N}\\).",
          "Gravity between everyday objects is tiny; it matters when one mass is a planet.",
        ],
        answer: "About \\(1.7 \\times 10^{-5}\\ \\text{N}\\); a quarter of that at 4.0 m",
      },
      selfCheckExample: {
        prompt:
          "The Earth has radius \\(R\\). At what height above the Earth's surface is the gravitational field strength one quarter of its value at the surface?",
        options: ["\\(R\\)", "\\(2R\\)", "\\(3R\\)", "\\(4R\\)", "\\(R/2\\)"],
        steps: [
          "\\(g\\) falls as \\(1/r^2\\), with \\(r\\) measured from the Earth's centre. A quarter of \\(g\\) needs \\(r = 2R\\).",
          "The height above the surface is \\(2R - R = R\\).",
          "B is the distance from the centre, not the height. D treats \\(g\\) as falling with \\(1/r\\) instead of \\(1/r^2\\), and C is the height that same mistake gives.",
        ],
        answer: "(A) \\(R\\)",
      },
      practiceSet: [
        { prompt: "The distance between two bodies is tripled. By what factor does the force between them change?", answer: "It becomes one ninth", method: "\\(1/3^2\\)" },
        { prompt: "Both masses are doubled and the distance stays the same. What happens to the force?", answer: "It becomes four times as large", method: "\\(F \\propto m_1 m_2\\)" },
        { prompt: "The Earth pulls a satellite with 2000 N. How hard does the satellite pull the Earth?", answer: "2000 N", method: "Third-law pair" },
        { prompt: "Where is \\(r\\) measured from in \\(g = GM/r^2\\) for a planet?", answer: "From the planet's centre", method: "Not from the surface" },
      ],
      traps: [
        {
          title: "Measure r from the centre, not from the surface",
          body: "A body at a height equal to two Earth radii above the surface is three radii from the centre, so \\(g\\) there is \\(g/9\\), not \\(g/4\\). Add the radius to the height before squaring.",
        },
      ],
    },
  ],
};
