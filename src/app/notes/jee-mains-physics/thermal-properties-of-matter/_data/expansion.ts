import type { SubtopicNote } from "@/app/notes/_types";

export const EXPANSION_TH_NOTE: SubtopicNote = {
  subtopicName: "Temperature Scales, Expansion and Thermal Stress",
  title: "Temperature Scales, Expansion and Thermal Stress",
  oneLineDefinition:
    "Any two linear temperature scales agree on the fraction of the way from the ice point to the steam point; a heated solid grows by ΔL = LαΔT in each direction, and a solid that is not allowed to grow carries a stress YαΔT instead.",
  whyItMatters:
    "Twenty-three PYQs, six of them asking for a number, and four from 2026. Five convert a reading between temperature scales, twelve find how much a length, an area or a volume grows, and six find the stress, force or stored energy in a rod that is held so it cannot grow. Most need one line of arithmetic once the right coefficient, α, 2α or 3α, is chosen.",
  concepts: [
    // C1 — temperature scales
    {
      kind: "formula" as const,
      slug: "jpthermal-scales",
      name: "Converting between linear temperature scales",
      intuition:
        "Every linear thermometer scale is fixed by two points: the reading in melting ice and the reading in steam. A temperature sits a certain fraction of the way between those two points, and that fraction is the same on every scale. So to convert, find the fraction on one scale and put it into the other. A faulty thermometer is just another linear scale with its own two fixed points.",
      definition:
        "- Any two linear scales: \\(\\dfrac{X - X_{ice}}{X_{steam} - X_{ice}}\\) has the same value on both.\n" +
        "- Celsius, Fahrenheit, kelvin: \\(\\dfrac{C}{100} = \\dfrac{F - 32}{180} = \\dfrac{K - 273}{100}\\), so \\(\\dfrac{C}{5} = \\dfrac{F - 32}{9}\\).\n" +
        "- A CHANGE carries no offset: \\(\\Delta F = 1.8\\,\\Delta C\\) and \\(\\Delta K = \\Delta C\\).\n" +
        "- Celsius against Fahrenheit is a straight line: \\(C = \\tfrac{5}{9}F - \\tfrac{160}{9}\\), slope \\(\\tfrac{5}{9}\\), crossing the F-axis at 32 and the C-axis below the origin.\n" +
        "- The two scales read the same number at −40.\n" +
        "- A scale with 150 divisions between its fixed points has divisions \\(\\tfrac{100}{150}\\) of a Celsius degree.",
      formula: {
        label: "Two linear scales",
        latex:
          "\\frac{X - X_{ice}}{X_{steam} - X_{ice}} = \\frac{C}{100} = \\frac{F - 32}{180} = \\frac{K - 273}{100}",
      },
      authoredExample: {
        prompt:
          "A temperature scale Y reads \\(20^{\\circ}Y\\) at the ice point and \\(220^{\\circ}Y\\) at the steam point. What is \\(70^{\\circ}Y\\) in degrees Celsius and in degrees Fahrenheit?",
        steps: [
          "Fraction of the way up: \\(\\dfrac{70 - 20}{220 - 20} = \\dfrac{50}{200} = \\dfrac{1}{4}\\).",
          "Celsius: \\(C = \\tfrac{1}{4} \\times 100 = 25^{\\circ}C\\).",
          "Fahrenheit: \\(F = 32 + \\tfrac{1}{4} \\times 180 = 77^{\\circ}F\\).",
        ],
        answer: "\\(25^{\\circ}C\\), \\(77^{\\circ}F\\)",
      },
      selfCheckExample: {
        prompt:
          "A faulty thermometer reads \\(4^{\\circ}\\) in melting ice and \\(84^{\\circ}\\) in steam. When it reads \\(44^{\\circ}\\), what is the true temperature in kelvin?",
        steps: [
          "Its own fixed points span \\(84 - 4 = 80\\) divisions.",
          "Fraction: \\(\\dfrac{44 - 4}{80} = \\dfrac{1}{2}\\), so the true temperature is \\(50^{\\circ}C\\).",
          "\\(T = 50 + 273 = 323\\ \\text{K}\\).",
        ],
        answer: "323 K",
      },
      practiceSet: [
        { prompt: "A body warms by \\(25^{\\circ}C\\). By how many Fahrenheit degrees does it warm?", answer: "45 F°", method: "\\(\\Delta F = 1.8 \\times 25\\); no 32 in a change." },
        { prompt: "At what temperature do the Celsius and Fahrenheit scales show the same number?", answer: "−40", method: "\\(\\tfrac{C}{5} = \\tfrac{C - 32}{9}\\) gives \\(4C = -160\\)." },
        { prompt: "Convert 300 K to degrees Fahrenheit.", answer: "\\(80.6^{\\circ}F\\)", method: "\\(27^{\\circ}C\\), then \\(32 + 1.8 \\times 27\\)." },
        { prompt: "On a graph of Celsius (up) against Fahrenheit (across), where does the line cut the Celsius axis?", answer: "At \\(-\\tfrac{160}{9} \\approx -17.8\\), below the origin" },
      ],
      pyqExampleId: "2b195a68-3e0e-4833-9842-f4ac1b08e416", // 11 Apr 2023: X scale, boiling 65, freezing −15
      traps: [
        {
          title: "Adding 32 to a temperature change",
          body: "The 32 shifts a reading, not a difference. A rise of 25 Celsius degrees is a rise of 45 Fahrenheit degrees, not 77.",
        },
        {
          title: "Using 0 and 100 for a faulty thermometer",
          body: "A faulty thermometer has its own ice and steam readings. Measure the fraction between those readings, then put it on the true scale.",
        },
      ],
    },

    // C2 — linear, area and volume expansion
    {
      kind: "formula" as const,
      slug: "jpthermal-expansion",
      name: "Linear, area and volume expansion of solids and gases",
      intuition:
        "Heat a solid and every length in it grows by the same fraction, αΔT. An area has two lengths, so it grows by about 2αΔT; a volume has three, so about 3αΔT. A hole grows too, exactly as the piece of metal that would fill it. For a gas the volume coefficient comes from the gas law: at constant pressure V is proportional to T, so the fraction it grows per kelvin is 1/T.",
      definition:
        "- Length: \\(\\Delta L = L\\alpha\\Delta T\\). Area: \\(\\Delta A = A(2\\alpha)\\Delta T\\). Volume: \\(\\Delta V = V(3\\alpha)\\Delta T\\).\n" +
        "- A hole, or a gap in a ring, expands as if it were filled with the same material.\n" +
        "- Rods joined end to end: add each piece's own \\(L\\alpha\\Delta T\\).\n" +
        "- A second rise in temperature starts from the longer length \\(L_0 + \\Delta L_1\\), not from \\(L_0\\).\n" +
        "- Two rods whose difference in length never changes: \\(L_1\\alpha_1 = L_2\\alpha_2\\).\n" +
        "- If the heat supplied is given, find \\(\\Delta T = Q/(ms)\\) first.\n" +
        "- A bimetallic strip bends with the larger-α metal on the outside when heated, and on the inside when cooled.\n" +
        "- Ideal gas: \\(\\gamma = \\dfrac{1}{V}\\dfrac{dV}{dT}\\). At constant pressure \\(\\gamma = 1/T\\). If \\(PT^{n}\\) is constant, \\(V \\propto T^{n+1}\\) and \\(\\gamma = (n + 1)/T\\).",
      formula: {
        label: "Thermal expansion",
        latex:
          "\\Delta L = L\\alpha\\Delta T \\qquad \\Delta A = A(2\\alpha)\\Delta T \\qquad \\Delta V = V(3\\alpha)\\Delta T \\qquad \\gamma_{gas} = \\frac{1}{V}\\frac{dV}{dT}",
      },
      authoredExample: {
        prompt:
          "A brass plate has a circular hole of diameter 4.00 cm at \\(20^{\\circ}C\\). The plate is heated to \\(220^{\\circ}C\\). Find the new diameter of the hole and the percentage increase in its area. (\\(\\alpha_{brass} = 1.9 \\times 10^{-5}\\ ^{\\circ}C^{-1}\\))",
        steps: [
          "The hole grows like a brass disc: \\(\\Delta D = D\\alpha\\Delta T = 4.00 \\times 1.9 \\times 10^{-5} \\times 200 = 0.0152\\ \\text{cm}\\).",
          "New diameter \\(= 4.0152\\ \\text{cm}\\). The hole gets larger, not smaller.",
          "Area grows by \\(2\\alpha\\Delta T = 2 \\times 1.9 \\times 10^{-5} \\times 200 = 7.6 \\times 10^{-3}\\), that is 0.76%.",
        ],
        answer: "4.0152 cm; the area grows by 0.76%",
      },
      selfCheckExample: {
        prompt:
          "An aluminium block of mass 0.5 kg and volume \\(2 \\times 10^{-4}\\ \\text{m}^{3}\\) is given 9000 J of heat. By how much does its volume increase? (Specific heat 900 J kg⁻¹ K⁻¹, \\(\\alpha = 2.4 \\times 10^{-5}\\ \\text{K}^{-1}\\))",
        steps: [
          "\\(\\Delta T = \\dfrac{Q}{ms} = \\dfrac{9000}{0.5 \\times 900} = 20\\ \\text{K}\\).",
          "\\(\\gamma = 3\\alpha = 7.2 \\times 10^{-5}\\ \\text{K}^{-1}\\).",
          "\\(\\Delta V = 2 \\times 10^{-4} \\times 7.2 \\times 10^{-5} \\times 20 = 2.88 \\times 10^{-7}\\ \\text{m}^{3} = 0.288\\ \\text{cm}^{3}\\).",
        ],
        answer: "\\(2.88 \\times 10^{-7}\\ \\text{m}^{3}\\)",
      },
      practiceSet: [
        { prompt: "Steel has \\(\\alpha = 1.1 \\times 10^{-5}\\ \\text{K}^{-1}\\) and copper \\(1.7 \\times 10^{-5}\\ \\text{K}^{-1}\\). The steel rod is 34 cm long. How long must the copper rod be for the difference in their lengths to stay the same at all temperatures?", answer: "22 cm", method: "\\(34 \\times 1.1 = L \\times 1.7\\)." },
        { prompt: "An ideal gas is heated so that \\(P^{2}T\\) stays constant. What is its coefficient of volume expansion?", answer: "\\(\\dfrac{3}{2T}\\)", method: "\\(P \\propto T^{-1/2}\\), so \\(V \\propto T^{3/2}\\)." },
        { prompt: "A bimetallic strip of brass (larger α) and steel is cooled. Which metal ends on the inside of the curve?", answer: "Brass: it shrinks more" },
        { prompt: "A metal has \\(\\alpha = 2 \\times 10^{-5}\\ \\text{K}^{-1}\\). By what percentage does a cube of it grow in volume when heated by 50 K?", answer: "0.3%" },
      ],
      pyqExampleId: "82b85d37-e324-4e25-b2ed-947b9608b9ed", // 21 Jan 2026 Shift 1: aluminium–steel composite rod
      traps: [
        {
          title: "Using α for an area or a volume",
          body: "An area grows by 2αΔT and a volume by 3αΔT. Using α alone gives an answer two or three times too small, and that value is usually an option.",
        },
        {
          title: "Thinking a hole shrinks when the plate is heated",
          body: "A hole grows exactly as a disc of the same metal would. The metal around it expands outward, carrying the edge of the hole with it.",
        },
        {
          title: "Reporting the rise instead of the final temperature",
          body: "ΔL = LαΔT gives the rise ΔT. If the question asks for the temperature to heat to, add the starting temperature. Options often include both.",
        },
      ],
    },

    // C3 — thermal stress
    {
      kind: "formula" as const,
      slug: "jpthermal-stress",
      name: "Thermal stress in a rod that cannot expand",
      intuition:
        "A rod lying free simply grows when heated and feels no stress. Clamp its ends and it cannot grow, so the supports squeeze it back by exactly the strain it wanted, αΔT. Hooke's law then gives the stress, Y times that strain. A wire held taut between supports and then cooled is the same story the other way: it wants to shrink, cannot, and is pulled into tension.",
      definition:
        "- Forced strain \\(= \\alpha\\Delta T\\); thermal stress \\(\\sigma = Y\\alpha\\Delta T\\); force \\(F = YA\\alpha\\Delta T\\).\n" +
        "- The length of the rod cancels: the force does not depend on it.\n" +
        "- Heating a clamped rod gives compression; cooling a clamped wire gives tension.\n" +
        "- The force is proportional to the temperature change measured from the stress-free state.\n" +
        "- A hanging rod cooled by ΔT is stretched back to its old length by a load \\(Mg = YA\\alpha\\Delta T\\).\n" +
        "- Stored elastic energy: per unit volume \\(\\tfrac{1}{2}Y(\\alpha\\Delta T)^{2}\\); per unit length multiply by A.\n" +
        "- A rod free to expand has no thermal stress at all.",
      formula: {
        label: "Thermal stress",
        latex:
          "\\sigma = Y\\alpha\\Delta T \\qquad F = YA\\alpha\\Delta T \\qquad u = \\tfrac{1}{2}Y(\\alpha\\Delta T)^{2}",
      },
      authoredExample: {
        prompt:
          "A steel rod of cross-section \\(2\\ \\text{cm}^{2}\\) is clamped between rigid walls and heated by \\(50^{\\circ}C\\). Find the stress, the force on the walls and the elastic energy stored per unit volume. (\\(Y = 2 \\times 10^{11}\\ \\text{N m}^{-2}\\), \\(\\alpha = 1.2 \\times 10^{-5}\\ ^{\\circ}C^{-1}\\))",
        steps: [
          "Forced strain: \\(\\alpha\\Delta T = 1.2 \\times 10^{-5} \\times 50 = 6 \\times 10^{-4}\\).",
          "Stress: \\(\\sigma = 2 \\times 10^{11} \\times 6 \\times 10^{-4} = 1.2 \\times 10^{8}\\ \\text{N m}^{-2}\\) (compressive).",
          "Force: \\(F = \\sigma A = 1.2 \\times 10^{8} \\times 2 \\times 10^{-4} = 2.4 \\times 10^{4}\\ \\text{N}\\).",
          "Energy per unit volume: \\(\\tfrac{1}{2}\\sigma \\times \\text{strain} = \\tfrac{1}{2} \\times 1.2 \\times 10^{8} \\times 6 \\times 10^{-4} = 3.6 \\times 10^{4}\\ \\text{J m}^{-3}\\).",
        ],
        answer: "\\(1.2 \\times 10^{8}\\ \\text{N m}^{-2}\\); \\(2.4 \\times 10^{4}\\ \\text{N}\\); \\(3.6 \\times 10^{4}\\ \\text{J m}^{-3}\\)",
      },
      selfCheckExample: {
        prompt:
          "A rod 1.5 m long with cross-section \\(2 \\times 10^{-6}\\ \\text{m}^{2}\\) hangs from one end and is cooled by 50 K. What mass hung from its lower end brings it back to its original length? (\\(Y = 1.5 \\times 10^{11}\\ \\text{N m}^{-2}\\), \\(\\alpha = 1.6 \\times 10^{-5}\\ \\text{K}^{-1}\\), \\(g = 10\\ \\text{m s}^{-2}\\))",
        steps: [
          "The load must produce the strain the cooling removed: \\(\\dfrac{Mg}{AY} = \\alpha\\Delta T\\).",
          "\\(Mg = 1.5 \\times 10^{11} \\times 2 \\times 10^{-6} \\times 1.6 \\times 10^{-5} \\times 50 = 240\\ \\text{N}\\).",
          "\\(M = 24\\ \\text{kg}\\). The 1.5 m length never enters.",
        ],
        answer: "24 kg",
      },
      practiceSet: [
        { prompt: "A wire is just taut, with no tension, at \\(30^{\\circ}C\\) between rigid supports. Cooled to \\(10^{\\circ}C\\) its tension is T. To what temperature must it be cooled for a tension of 2T?", answer: "\\(-10^{\\circ}C\\)", method: "Tension ∝ cooling from \\(30^{\\circ}C\\): 20 degrees gives T, 40 degrees gives 2T." },
        { prompt: "Two clamped rods of the same material are heated by the same amount. One is twice as long as the other. Ratio of the forces they exert?", answer: "1 : 1 (length cancels)" },
        { prompt: "A clamped rail has \\(Y = 2 \\times 10^{11}\\ \\text{N m}^{-2}\\), \\(A = 10^{-4}\\ \\text{m}^{2}\\) and thermal strain \\(10^{-4}\\). Elastic energy per unit length?", answer: "0.1 J/m", method: "\\(\\tfrac{1}{2}YA(\\alpha\\Delta T)^{2} = \\tfrac{1}{2}(2 \\times 10^{11})(10^{-4})(10^{-8})\\)." },
        { prompt: "A rod lying freely on a table is heated by 100 K. What thermal stress develops in it?", answer: "None: nothing stops it expanding" },
      ],
      pyqExampleId: "daa39950-4183-4ed2-8b40-8401a1495681", // 24 Jan 2026 Shift 1: brass wire between rigid supports, cooled further
      traps: [
        {
          title: "Measuring the temperature change from the wrong state",
          body: "Thermal tension is proportional to the change from the stress-free temperature, not from the last temperature mentioned. To raise the tension by 40%, the total cooling from the stress-free state must rise by 40%.",
        },
        {
          title: "Putting the length into the force",
          body: "Force = YAαΔT. The length appears in both the forced extension and the strain, and cancels. A rod twice as long pushes on its clamps with the same force.",
        },
      ],
    },
  ],
};
