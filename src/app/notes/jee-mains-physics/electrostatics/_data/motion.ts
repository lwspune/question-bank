import type { SubtopicNote } from "@/app/notes/_types";

export const MOTION_ES_NOTE: SubtopicNote = {
  subtopicName: "Charges Moving in Electric Fields",
  title: "Charges Moving in Electric Fields",
  oneLineDefinition:
    "A charge in a field feels qE, so its acceleration is qE/m; in a uniform field it moves like a projectile, and where the field balances gravity or pulls towards a centre, the usual mechanics finishes the job.",
  whyItMatters:
    "Twenty-five PYQs, twenty of them multiple choice, and four from 2026. Eleven send a charge through a uniform field: stopping distances, deflection between plates and the work the field does. Ten hold or swing a charged body against gravity: drops held still, pendulums in a field, and small oscillations between fixed charges. Four put a charge in orbit round a line charge or a charged cylinder.",
  concepts: [
    // C1 — motion in a uniform field
    {
      kind: "formula" as const,
      slug: "jpes-uniform-field-motion",
      name: "Motion in a uniform field",
      intuition:
        "A uniform field gives a constant force qE, so a charge moves exactly as a ball does under gravity, with qE/m in place of g. A charge entering between plates along them keeps its speed along the plates and gains speed across them: its path is a parabola. A positive charge speeds up along the field, a negative one against it.",
      definition:
        "- \\(a = \\dfrac{qE}{m}\\), constant. Use the equations of uniform acceleration.\n" +
        "- Fired against the field, a charge stops after \\(s = \\dfrac{mu^{2}}{2qE}\\).\n" +
        "- Between plates of length L, entering along them at speed v: time \\(t = L/v\\), sideways shift \\(y = \\dfrac{qEL^{2}}{2mv^{2}}\\), exit angle \\(\\tan\\theta = \\dfrac{qEL}{mv^{2}}\\).\n" +
        "- The velocity part perpendicular to the field never changes.\n" +
        "- Work done by the field: \\(qE \\times\\) (displacement along E). Between plates a distance d apart: \\(V = Ed\\).\n" +
        "- A magnetic force is always perpendicular to the velocity, so it does no work: any change of speed comes from the electric field.",
      formula: {
        label: "Deflection between plates",
        latex: "y = \\frac{qEL^{2}}{2mv^{2}}, \\qquad \\tan\\theta = \\frac{qEL}{mv^{2}}",
      },
      authoredExample: {
        prompt:
          "Particles with \\(q/m = 5 \\times 10^{7}\\) C/kg enter at \\(2 \\times 10^{5}\\) m/s along plates 4 cm long. The field between the plates is 1000 V/m. Find the sideways shift and the exit angle.",
        steps: [
          "\\(a = \\dfrac{q}{m}E = 5 \\times 10^{10}\\ \\text{m/s}^{2}\\); \\(t = \\dfrac{0.04}{2 \\times 10^{5}} = 2 \\times 10^{-7}\\) s.",
          "\\(y = \\tfrac{1}{2}at^{2} = \\tfrac{1}{2} \\times 5 \\times 10^{10} \\times 4 \\times 10^{-14} = 10^{-3}\\) m.",
          "\\(v_y = at = 10^{4}\\) m/s, so \\(\\tan\\theta = \\dfrac{10^{4}}{2 \\times 10^{5}} = 0.05\\).",
        ],
        answer: "1 mm; \\(\\tan\\theta = 0.05\\).",
      },
      selfCheckExample: {
        prompt:
          "A 2 g particle with charge \\(4\\ \\mu\\text{C}\\) is thrown at 6 m/s against a uniform field of \\(3 \\times 10^{3}\\) N/C. Ignoring gravity, how far does it go before stopping?",
        steps: [
          "Force \\(= 4 \\times 10^{-6} \\times 3 \\times 10^{3} = 0.012\\) N; deceleration \\(= \\dfrac{0.012}{0.002} = 6\\ \\text{m/s}^{2}\\).",
          "\\(s = \\dfrac{u^{2}}{2a} = \\dfrac{36}{12} = 3\\) m.",
        ],
        answer: "3 m",
      },
      practiceSet: [
        { prompt: "Plates 5 cm apart have 100 V across them. Field between them?", answer: "2000 V/m" },
        { prompt: "A \\(3\\ \\mu\\text{C}\\) charge moves 0.2 m along a uniform 500 N/C field. Work done by the field?", answer: "\\(3 \\times 10^{-4}\\) J" },
        { prompt: "The entry speed of a charge between plates is doubled. By what factor does its sideways shift change?", answer: "It falls to a quarter." },
        { prompt: "Can a magnetic field change a moving charge's kinetic energy?", answer: "No: the magnetic force is perpendicular to the velocity." },
      ],
      pyqExampleId: "f81be19e-8971-4672-8a6b-15a776a2e47c", // 2023: q/m = 2 × 10¹¹, 3 × 10⁷ m/s, 1.8 kV/m over 10 cm, 2 mm
      traps: [
        {
          title: "Convert the field's units",
          body: "A field in V/cm is 100 times larger in V/m, and kV/m is 1000 V/m. Most wrong options here come from a missed power of ten.",
        },
        {
          title: "Only one velocity part changes",
          body: "The part along the plates stays the same. Using the full speed for the time between the plates is right only when the charge enters along them.",
        },
        {
          title: "Electrons go against the field",
          body: "A negative charge accelerates opposite to E. Check the sign before deciding which plate it bends towards.",
        },
      ],
    },

    // C2 — balance, swinging and oscillation
    {
      kind: "formula" as const,
      slug: "jpes-balance",
      name: "Holding and swinging charged bodies",
      intuition:
        "A drop hangs still when the upward electric force equals its weight. A charged bob in a sideways field settles at an angle, as if gravity were tilted and made stronger. A charge between two fixed equal charges is pushed back towards the middle when moved along the line, so it oscillates, and the restoring force sets the period just as a spring constant would.",
      definition:
        "- Drop held still: \\(qE = mg\\), so the number of extra electrons is \\(n = \\dfrac{mg}{eE}\\). A drop's mass is \\(\\tfrac{4}{3}\\pi r^{3}\\rho\\).\n" +
        "- A positive drop needs E pointing up: the lower plate at the higher potential.\n" +
        "- Bob in a horizontal field: \\(\\tan\\theta = \\dfrac{qE}{mg}\\), \\(T = \\sqrt{(mg)^{2} + (qE)^{2}}\\). A pendulum then swings with \\(g_{\\text{eff}} = \\sqrt{g^{2} + (qE/m)^{2}}\\).\n" +
        "- Energy: the work by the field plus the work by gravity equals the gain in kinetic energy.\n" +
        "- Charge \\(q_0\\) between two fixed equal charges Q a distance 2a apart, moved along the line: \\(\\omega^{2} = \\dfrac{4kQq_0}{ma^{3}}\\). Moved across the line, when the fixed charges attract it: \\(\\omega^{2} = \\dfrac{2kQq_0}{ma^{3}}\\).",
      formula: {
        label: "Balance and small oscillations",
        latex: "qE = mg, \\qquad \\omega^{2} = \\frac{4kQq_0}{ma^{3}}",
      },
      authoredExample: {
        prompt:
          "An oil drop of mass \\(3.2 \\times 10^{-15}\\) kg is held still between horizontal plates 1 cm apart, with 500 V across them. How many extra electrons does it carry, and which plate is positive? (g = 10 m/s², e = 1.6 × 10⁻¹⁹ C)",
        steps: [
          "\\(E = \\dfrac{500}{0.01} = 5 \\times 10^{4}\\) V/m.",
          "\\(q = \\dfrac{mg}{E} = \\dfrac{3.2 \\times 10^{-14}}{5 \\times 10^{4}} = 6.4 \\times 10^{-19}\\) C, which is 4e.",
          "The drop carries extra electrons, so the force must point up while E points down: the upper plate is positive.",
        ],
        answer: "4 electrons; the upper plate is positive.",
      },
      selfCheckExample: {
        prompt:
          "A 10 g bob with charge \\(2.5\\ \\mu\\text{C}\\) hangs in a horizontal field of \\(4 \\times 10^{4}\\) N/C. Find the string's angle with the vertical and its tension. (g = 10 m/s²)",
        steps: [
          "\\(qE = 2.5 \\times 10^{-6} \\times 4 \\times 10^{4} = 0.1\\) N, and \\(mg = 0.1\\) N.",
          "\\(\\tan\\theta = 1\\), so \\(\\theta = 45^{\\circ}\\); \\(T = 0.1\\sqrt 2 \\approx 0.14\\) N.",
        ],
        answer: "\\(45^{\\circ}\\); about 0.14 N.",
      },
      practiceSet: [
        { prompt: "A drop of mass \\(1.6 \\times 10^{-14}\\) kg carries 5 extra electrons. Field needed to hold it still? (g = 10 m/s²)", answer: "\\(2 \\times 10^{5}\\) N/C, pointing down" },
        { prompt: "A 1 m pendulum's bob feels a horizontal electric force equal to its weight. Period? (g = 10 m/s²)", answer: "About 1.67 s", method: "\\(g_{\\text{eff}} = 10\\sqrt 2\\)." },
        { prompt: "A charge oscillates along the line between two fixed equal charges. Their separation is doubled. New period?", answer: "\\(2\\sqrt 2\\) times the old one" },
        { prompt: "A positively charged drop is held still. Which plate is at the higher potential?", answer: "The lower plate" },
      ],
      pyqExampleId: "b4f04acf-07f7-4f6b-82b8-5e2faa4254b9", // 2022: q₀ between two fixed Q, 2a apart, period of SHM along the line
      traps: [
        {
          title: "Which way must E point?",
          body: "The force on a positive drop is along E, on a negative drop against it. The force must point up in both cases, so the field's direction depends on the sign.",
        },
        {
          title: "Densities in SI units",
          body: "A density in g/cm³ is 1000 times larger in kg/m³. Find the drop's mass in kilograms before comparing qE with mg.",
        },
        {
          title: "Not every direction is stable",
          body: "Between two like charges, a charge moved along the line is pushed back, but one moved across the line is pushed further away. Check that the force restores before writing ω².",
        },
      ],
    },

    // C3 — orbits round line charges
    {
      kind: "formula" as const,
      slug: "jpes-orbits",
      name: "Orbits round a line charge",
      intuition:
        "A long line charge pulls an opposite charge towards it with a force that falls as 1/r. For a circular orbit, that force supplies mv²/r, and the r cancels: every orbit has the same speed. A wider orbit is longer to go round at that speed, so its period grows in proportion to the radius.",
      definition:
        "- Charge −q of mass m circling a line charge +λ at radius r: \\(q\\dfrac{2k\\lambda}{r} = \\dfrac{mv^{2}}{r}\\), so \\(mv^{2} = 2k\\lambda q\\).\n" +
        "- The speed and the kinetic energy (kλq) do not depend on r.\n" +
        "- Period \\(T = \\dfrac{2\\pi r}{v} = 2\\pi r\\sqrt{\\dfrac{m}{2k\\lambda q}}\\), so \\(T \\propto r\\).\n" +
        "- Outside a long charged cylinder of radius R and density ρ, the field is that of a line charge \\(\\lambda = \\rho\\pi R^{2}\\).\n" +
        "- Compare a point charge Q: \\(v^{2} = \\dfrac{kQq}{mr}\\) and \\(T \\propto r^{3/2}\\).",
      formula: {
        label: "Orbit round a line charge",
        latex: "mv^{2} = 2k\\lambda q, \\qquad T = 2\\pi r\\sqrt{\\frac{m}{2k\\lambda q}}",
      },
      authoredExample: {
        prompt:
          "A particle of mass \\(3.6 \\times 10^{-6}\\) kg and charge \\(-1\\ \\mu\\text{C}\\) circles a long line with \\(\\lambda = +2\\ \\mu\\text{C/m}\\) at radius 0.5 m. Find its speed and period.",
        steps: [
          "\\(2k\\lambda q = 2 \\times 9 \\times 10^{9} \\times 2 \\times 10^{-6} \\times 10^{-6} = 0.036\\) J.",
          "\\(v^{2} = \\dfrac{0.036}{3.6 \\times 10^{-6}} = 10^{4}\\), so \\(v = 100\\) m/s.",
          "\\(T = \\dfrac{2\\pi \\times 0.5}{100} \\approx 0.031\\) s.",
        ],
        answer: "100 m/s; about 0.031 s.",
      },
      selfCheckExample: {
        prompt:
          "A charge circles a line charge at radius r with period T. The radius is doubled. New speed and period?",
        steps: [
          "\\(mv^{2} = 2k\\lambda q\\) has no r in it, so the speed is unchanged.",
          "The path is twice as long, so the period is 2T.",
        ],
        answer: "Same speed; period 2T.",
      },
      practiceSet: [
        { prompt: "Kinetic energy of a charge −q circling a line charge +λ?", answer: "kλq, whatever the radius" },
        { prompt: "The orbit radius round a line charge is tripled. Period?", answer: "Three times as long" },
        { prompt: "A charge orbits a point charge instead. How does the period depend on r?", answer: "\\(T \\propto r^{3/2}\\)" },
        { prompt: "A long cylinder of radius R carries uniform density ρ. Equivalent line charge for points outside?", answer: "\\(\\lambda = \\rho\\pi R^{2}\\)" },
      ],
      pyqExampleId: "ea74c256-e97c-4aff-b33b-b0553f55b387", // 2024: −q circling a line charge +λ, T = 2πr√(m/2kλq)
      traps: [
        {
          title: "A line charge's field is 2kλ/r",
          body: "Using kλ/r², as for a point charge, makes the speed depend on r. The 1/r field is what makes every orbit's speed the same.",
        },
        {
          title: "Same speed, different period",
          body: "The speed does not depend on r, but the period does: it grows in proportion to r.",
        },
        {
          title: "A cylinder acts through its charge per length",
          body: "Outside a charged cylinder, use λ = ρπR², the charge on one metre of it. Putting ρ in place of λ gives the wrong units.",
        },
      ],
    },
  ],
};
