import type { SubtopicNote } from "@/app/notes/_types";

export const CURRENT_CE_NOTE: SubtopicNote = {
  subtopicName: "Current, Drift Velocity and Current Density",
  title: "Current, Drift Velocity and Current Density",
  oneLineDefinition:
    "Current is the rate at which charge crosses a section, I = dq/dt; inside a wire it is carried by free electrons drifting slowly against the field, so I = neAv, where v is the drift speed.",
  whyItMatters:
    "Eighteen PYQs, eleven of them multiple choice, and one from 2026. Seven are about charge: four integrate a current that changes with time, and the rest count electrons per second, find the least value of a current, or turn a battery's mAh rating into energy. Eleven are about the drift of electrons: drift speed from I = neAv, mobility, how drift speed depends on length, area and temperature, the current through part of a wire, and the field inside a wire from E = ρJ.",
  concepts: [
    // C1 — charge from a current
    {
      kind: "formula" as const,
      slug: "jpce-charge-flow",
      name: "Charge, current and the area under an I–t graph",
      intuition:
        "Current tells you how many coulombs pass a section each second. If the current changes with time, add up the small amounts \\(I\\,dt\\): that is an integral, or the area under the I–t graph. Going the other way, if the charge is given as a function of time, the current is its slope.",
      definition:
        "- \\(I = \\dfrac{dq}{dt}\\). For a steady current, \\(q = It\\).\n" +
        "- For a changing current, \\(q = \\displaystyle\\int_{t_1}^{t_2} I\\,dt\\), the area under the I–t graph between the two times asked.\n" +
        "- If \\(q(t)\\) is given, \\(I = dq/dt\\). The current is least where \\(dI/dt = 0\\) and \\(d^{2}I/dt^{2} > 0\\).\n" +
        "- Electrons per second: \\(n = I/e\\), with \\(e = 1.6 \\times 10^{-19}\\) C. For a device rated P at V, first find \\(I = P/V\\).\n" +
        "- Battery capacity: 1 mAh = \\(10^{-3} \\times 3600 = 3.6\\) C. Energy stored = charge × voltage.",
      formula: {
        label: "Charge and current",
        latex: "I = \\frac{dq}{dt}, \\qquad q = \\int_{t_1}^{t_2} I\\,dt, \\qquad n = \\frac{I}{e}",
      },
      authoredExample: {
        prompt:
          "The current in a wire is \\(I = (2 + 6t)\\) A, with t in seconds. Find the charge that passes a section between \\(t = 2\\) s and \\(t = 5\\) s.",
        steps: [
          "\\(q = \\displaystyle\\int_{2}^{5} (2 + 6t)\\,dt = \\left[2t + 3t^{2}\\right]_{2}^{5}\\).",
          "At \\(t = 5\\): \\(10 + 75 = 85\\). At \\(t = 2\\): \\(4 + 12 = 16\\).",
          "\\(q = 85 - 16 = 69\\) C.",
        ],
        answer: "69 C",
      },
      selfCheckExample: {
        prompt:
          "The charge through a conductor is \\(q = 2t^{3} - 9t^{2} + 15t\\) coulomb. When is the current least, and what is it?",
        steps: [
          "\\(I = dq/dt = 6t^{2} - 18t + 15\\).",
          "\\(dI/dt = 12t - 18 = 0\\) gives \\(t = 1.5\\) s, and \\(d^{2}I/dt^{2} = 12 > 0\\), so this is a minimum.",
          "\\(I = 6(2.25) - 27 + 15 = 1.5\\) A.",
        ],
        answer: "At t = 1.5 s, the current is 1.5 A.",
      },
      practiceSet: [
        { prompt: "A steady current of 3.2 A flows in a wire. How many electrons pass a section each second?", answer: "\\(2 \\times 10^{19}\\)" },
        { prompt: "A phone battery is rated 3.7 V, 3000 mAh. How much energy does it store?", answer: "About \\(4.0 \\times 10^{4}\\) J (10 800 C × 3.7 V)" },
        { prompt: "\\(I = (4 + 2t)\\) A. Charge that passes from \\(t = 0\\) to \\(t = 3\\) s?", answer: "21 C" },
        { prompt: "A current falls steadily from 6 A to zero in 4 s. Charge that passes?", answer: "12 C", method: "Area of the triangle under the I–t graph: \\(\\tfrac{1}{2} \\times 6 \\times 4\\)." },
      ],
      pyqExampleId: "3b3d5da2-4471-4f52-98ea-a210d0541fc0", // 2024: I = 3t² + 4t³ integrated from t = 1 s to t = 2 s
      traps: [
        {
          title: "Use the limits the question gives",
          body: "\"From t = 1 s to t = 2 s\" means the lower limit is 1, not 0. Integrating from zero adds the charge of the first second and lands on a wrong option.",
        },
        {
          title: "mAh is not coulombs",
          body: "Multiply mAh by 3.6 to get coulombs. Then energy = charge × voltage. Forgetting the 3600 s in an hour gives an answer smaller by a factor of 3600.",
        },
        {
          title: "Least current comes from dI/dt, not dq/dt",
          body: "When the charge is given as q(t), differentiate once to get I and once more to find where I is least. Setting dq/dt = 0 finds where the current is zero instead.",
        },
      ],
    },

    // C2 — drift velocity and current density
    {
      kind: "formula" as const,
      slug: "jpce-drift",
      name: "Drift velocity, mobility and current density",
      intuition:
        "Free electrons in a metal move fast and in random directions, colliding all the time. A field adds a small push between collisions, so on average they creep along the wire: that slow average is the drift velocity. Electrons are negative, so they drift against the field, from lower to higher potential, while conventional current flows the other way.",
      definition:
        "- \\(I = neAv_d\\), where n is the number of free electrons per m³. Current density \\(J = I/A = nev_d\\).\n" +
        "- \\(v_d = \\dfrac{eE\\tau}{m}\\), where \\(\\tau\\) is the mean time between collisions. Mobility \\(\\mu = v_d/E = e\\tau/m\\).\n" +
        "- Inside a wire of length l across a voltage V: \\(E = V/l\\). Also \\(J = \\sigma E\\), so \\(E = \\rho J\\), and the force on one electron is \\(eE\\).\n" +
        "- At a fixed voltage, \\(v_d = \\dfrac{e\\tau}{m}\\cdot\\dfrac{V}{l}\\): it does not depend on the area, and it falls as the length rises. At a fixed current, \\(v_d \\propto 1/A\\).\n" +
        "- A hotter metal has more collisions (smaller \\(\\tau\\)), so its drift speed at a given field falls.\n" +
        "- For part of a cross-section, current = J × that part's area (for uniform J), or \\(\\int J\\,dA\\) in general.",
      formula: {
        label: "Drift and current density",
        latex: "I = neAv_d, \\qquad v_d = \\frac{eE\\tau}{m} = \\mu E, \\qquad J = nev_d = \\sigma E",
      },
      authoredExample: {
        prompt:
          "A wire of cross-section 1 mm² carries 1.92 A. It has \\(6 \\times 10^{28}\\) free electrons per m³. Find the drift speed.",
        steps: [
          "Convert the area: \\(1\\ \\text{mm}^{2} = 10^{-6}\\ \\text{m}^{2}\\).",
          "\\(neA = 6 \\times 10^{28} \\times 1.6 \\times 10^{-19} \\times 10^{-6} = 9.6 \\times 10^{3}\\).",
          "\\(v_d = \\dfrac{I}{neA} = \\dfrac{1.92}{9.6 \\times 10^{3}} = 2 \\times 10^{-4}\\) m/s.",
        ],
        answer: "\\(2 \\times 10^{-4}\\) m/s, that is 0.2 mm/s",
      },
      selfCheckExample: {
        prompt:
          "A wire 2 m long with cross-section 0.5 mm² is joined across 4 V and carries 1.7 A. It has \\(8.5 \\times 10^{28}\\) free electrons per m³. Find the drift speed and the mobility.",
        steps: [
          "\\(v_d = \\dfrac{1.7}{8.5 \\times 10^{28} \\times 1.6 \\times 10^{-19} \\times 0.5 \\times 10^{-6}} = \\dfrac{1.7}{6.8 \\times 10^{3}} = 2.5 \\times 10^{-4}\\) m/s.",
          "\\(E = V/l = 4/2 = 2\\) V/m.",
          "\\(\\mu = v_d/E = 1.25 \\times 10^{-4}\\ \\text{m}^{2}\\,\\text{V}^{-1}\\text{s}^{-1}\\).",
        ],
        answer: "\\(2.5 \\times 10^{-4}\\) m/s; \\(1.25 \\times 10^{-4}\\ \\text{m}^{2}\\,\\text{V}^{-1}\\text{s}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "Uniform current density \\(2 \\times 10^{6}\\ \\text{A/m}^{2}\\) in a wire of radius 2 mm. Current through the inner part, from the axis out to 1 mm?", answer: "\\(2\\pi\\) A ≈ 6.3 A" },
        { prompt: "The same wire is kept across the same voltage, but its length is doubled. What happens to the drift speed?", answer: "It halves." },
        { prompt: "Resistivity \\(2 \\times 10^{-8}\\ \\Omega\\,\\text{m}\\), current density \\(5 \\times 10^{6}\\ \\text{A/m}^{2}\\). Force on each free electron?", answer: "\\(1.6 \\times 10^{-20}\\) N", method: "\\(E = \\rho J = 0.1\\) V/m, then \\(F = eE\\)." },
        { prompt: "\\(n = 5 \\times 10^{28}\\ \\text{m}^{-3}\\), area 2 mm², drift speed 0.25 mm/s. Current?", answer: "4 A" },
      ],
      pyqExampleId: "11e73a6b-b4c4-4c86-a292-4886cf2c3f59", // 2023: copper, n = 8 × 10²⁸, A = 2 × 10⁻⁶ m², 3.2 A
      traps: [
        {
          title: "mm² is 10⁻⁶ m²",
          body: "Areas are usually given in mm². Leaving them in mm² makes the drift speed a million times too small.",
        },
        {
          title: "Electrons drift towards higher potential",
          body: "Conventional current runs from high to low potential. Electrons are negative, so they drift the other way, against the field. A statement that electrons drift from higher to lower potential describes conventional current, not the electrons.",
        },
        {
          title: "At fixed voltage the area does not matter",
          body: "Doubling the area at the same voltage doubles the current but leaves the drift speed, (eτ/m)(V/l), unchanged. Only at a fixed current does a larger area mean a smaller drift speed.",
        },
      ],
    },
  ],
};
