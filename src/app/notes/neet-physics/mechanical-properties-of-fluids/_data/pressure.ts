import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_FL_PRESSURE_NOTE: SubtopicNote = {
  subtopicName: "Pressure and Fluid Flow",
  title: "Pressure and Fluid Flow",
  oneLineDefinition:
    "Pressure in a fluid at rest, P = P₀ + ρgh, Pascal's law and floating, then moving fluids: the equation of continuity Av = constant and Bernoulli's principle.",
  whyItMatters:
    "Four NEET questions from 2023 to 2026, three of them from 2024 or later. One asks how deep a submarine can go for a given absolute pressure (2026). Three are about moving water: the principle a venturi meter works on (2023), which end of a tube has the larger kinetic energy per unit volume (Re-NEET 2024), and a flow rate found from a pressure difference and two areas (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphfl-pressure",
      name: "Pressure at a depth and Pascal's law",
      intuition:
        "A liquid at rest presses on everything it touches. The deeper you go, the more liquid sits above you, so the pressure grows with depth. On top of that, the air above the liquid presses down too. Pascal noticed something useful: a pressure added at one place in an enclosed liquid reaches every other place equally. That is how a small push on a narrow piston lifts a car on a wide one.",
      definition:
        "- Pressure is force per unit area: \\(P = \\dfrac{F}{A}\\), in pascal (Pa). 1 atm is about \\(1.013 \\times 10^{5}\\) Pa.\n" +
        "- At a depth h in a liquid of density \\(\\rho\\) open to the air: \\(P = P_0 + \\rho g h\\), where \\(P_0\\) is the atmospheric pressure. This is the **absolute** pressure.\n" +
        "- **Gauge pressure** is the part above the atmosphere: \\(P - P_0 = \\rho g h\\).\n" +
        "- Points at the same depth in the same liquid at rest have the same pressure, whatever the shape of the vessel.\n" +
        "- **Pascal's law**: a change of pressure at one point of an enclosed fluid is passed on equally to every point. Hydraulic lift: \\(\\dfrac{F_1}{A_1} = \\dfrac{F_2}{A_2}\\).\n" +
        "- Archimedes' principle: the upthrust on a body in a fluid equals the weight of the fluid it pushes aside. A floating body has the fraction \\(\\dfrac{\\rho_{body}}{\\rho_{liquid}}\\) of its volume under the surface.",
      formula: {
        label: "Pressure at a depth",
        latex: "P = P_0 + \\rho g h, \\qquad P_{\\text{gauge}} = \\rho g h, \\qquad \\frac{F_1}{A_1} = \\frac{F_2}{A_2}",
        symbols: [
          { symbol: "\\(P_0\\)", meaning: "atmospheric pressure at the surface" },
          { symbol: "\\(\\rho\\)", meaning: "density of the liquid" },
          { symbol: "\\(h\\)", meaning: "depth below the surface" },
        ],
      },
      authoredExample: {
        prompt:
          "An open tank holds water 5 m deep. Find the gauge pressure and the absolute pressure at its bottom. (\\(\\rho = 1000\\ \\text{kg m}^{-3}\\), g = 10 m/s², 1 atm = \\(10^{5}\\) Pa)",
        steps: [
          "Gauge pressure: \\(\\rho g h = 1000 \\times 10 \\times 5 = 5 \\times 10^{4}\\) Pa.",
          "Absolute pressure: \\(P_0 + \\rho g h = 10^{5} + 5 \\times 10^{4} = 1.5 \\times 10^{5}\\) Pa, that is 1.5 atm.",
        ],
        answer: "Gauge \\(5 \\times 10^{4}\\) Pa; absolute \\(1.5 \\times 10^{5}\\) Pa",
      },
      selfCheckExample: {
        prompt:
          "In a hydraulic lift the small piston has an area of 10 cm² and the large one 500 cm². What force on the small piston holds up a car of mass 1000 kg on the large one? (g = 10 m/s²)",
        steps: [
          "The car's weight is \\(1000 \\times 10 = 10^{4}\\) N.",
          "Pascal's law: \\(F_1 = F_2 \\times \\dfrac{A_1}{A_2} = 10^{4} \\times \\dfrac{10}{500} = 200\\) N.",
        ],
        answer: "200 N",
      },
      practiceSet: [
        { prompt: "Find the gauge pressure 4 m below the surface of an oil of density 800 kg/m³ (g = 10 m/s²).", answer: "\\(3.2 \\times 10^{4}\\) Pa" },
        { prompt: "The pistons of a hydraulic lift have radii in the ratio 1 : 5. What is the ratio of the forces on them?", answer: "1 : 25" },
        { prompt: "A wooden block of density 600 kg/m³ floats in water. What fraction of its volume is under water?", answer: "0.6" },
        { prompt: "A tall narrow jar and a wide tub are filled with water to the same depth. Compare the pressures at their bases.", answer: "They are equal" },
      ],
      pyqExampleId: "995baa47-8304-46fc-ac6c-a1255ff87122",
      traps: [
        {
          title: "Absolute pressure includes the air above",
          body: "A gauge or a design limit given as absolute pressure already contains the 1 atm at the surface. Subtract \\(P_0\\) before you use \\(\\rho g h\\), or the depth comes out too large.",
        },
        {
          title: "Pistons scale by radius squared",
          body: "A hydraulic lift multiplies force by the ratio of the AREAS. A piston with 4 times the radius has 16 times the area, so it gives 16 times the force, not 4 times.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphfl-continuity",
      name: "Streamline flow and the equation of continuity",
      intuition:
        "In smooth, steady flow every bit of liquid that passes a point follows the same path, called a streamline. A liquid like water hardly squeezes, so whatever volume enters a pipe each second must leave it each second. Where the pipe is narrow, the same volume has to get through a smaller opening, so the water moves faster.",
      definition:
        "- **Streamline flow**: the velocity at any given point stays the same in time. Each particle passing that point follows the same path.\n" +
        "- Two streamlines never cross: at a crossing a particle would have two velocities at once. Where streamlines crowd together the flow is faster.\n" +
        "- **Equation of continuity** for an incompressible liquid: \\(A_1 v_1 = A_2 v_2\\). The volume flow rate \\(Q = Av\\) is the same all along the pipe.\n" +
        "- For a round pipe \\(A = \\pi r^{2}\\), so \\(v \\propto \\dfrac{1}{r^{2}}\\).\n" +
        "- Units: Q is in m³/s. Change cm² to m² by multiplying by \\(10^{-4}\\); 1 m³ is \\(10^{6}\\) cm³ and 1000 L.",
      formula: {
        label: "Equation of continuity",
        latex: "A_1 v_1 = A_2 v_2 = Q",
        symbols: [
          { symbol: "\\(A\\)", meaning: "area of cross-section of the pipe" },
          { symbol: "\\(v\\)", meaning: "speed of the liquid there" },
          { symbol: "\\(Q\\)", meaning: "volume of liquid passing per second" },
        ],
      },
      authoredExample: {
        prompt:
          "Water flows at 2 m/s in a pipe of cross-section 4 cm². The pipe narrows to 1 cm². Find the speed in the narrow part and the volume flow rate.",
        steps: [
          "\\(v_2 = \\dfrac{A_1 v_1}{A_2} = \\dfrac{4 \\times 2}{1} = 8\\) m/s.",
          "\\(Q = A_1 v_1 = 4 \\times 10^{-4} \\times 2 = 8 \\times 10^{-4}\\ \\text{m}^{3}/\\text{s}\\), that is 0.8 L each second.",
        ],
        answer: "8 m/s; \\(8 \\times 10^{-4}\\ \\text{m}^{3}/\\text{s}\\)",
      },
      selfCheckExample: {
        prompt:
          "A tap fills a 10 L bucket in 20 s. The pipe feeding it has a cross-section of 2 cm². How fast does the water move in the pipe?",
        steps: [
          "\\(Q = \\dfrac{10 \\times 10^{-3}}{20} = 5 \\times 10^{-4}\\ \\text{m}^{3}/\\text{s}\\).",
          "\\(v = \\dfrac{Q}{A} = \\dfrac{5 \\times 10^{-4}}{2 \\times 10^{-4}} = 2.5\\) m/s.",
        ],
        answer: "2.5 m/s",
      },
      practiceSet: [
        { prompt: "The radius of a pipe carrying water halves. By what factor does the speed of the water change?", answer: "It becomes 4 times" },
        { prompt: "Why can two streamlines never cross?", answer: "At the crossing a particle would have two velocities at once" },
        { prompt: "Water moves at 3 m/s through a pipe of cross-section 6 cm². Find the flow rate in cm³/s.", answer: "1800 cm³/s" },
        { prompt: "Where streamlines in a flow come closer together, is the liquid faster or slower there?", answer: "Faster" },
      ],
      pyqExampleId: "6dde963b-fef5-4104-8883-846c246b02d7",
      traps: [
        {
          title: "The narrow part is the fast part",
          body: "The same volume passes every section each second, so a smaller area means a larger speed. Speed goes as \\(1/r^{2}\\), so halving the radius makes the flow four times as fast.",
        },
        {
          title: "Convert the area before multiplying",
          body: "Areas are often given in cm². Multiply by \\(10^{-4}\\) to get m² before you find a flow rate in m³/s, then multiply by \\(10^{6}\\) if the answer is wanted in cm³/s.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphfl-bernoulli",
      name: "Bernoulli's principle, efflux and lift",
      intuition:
        "Bernoulli's principle is conservation of energy for a flowing liquid. Each cubic metre of liquid carries pressure energy, kinetic energy and potential energy, and their total stays the same along a streamline. So where the liquid speeds up, as in the narrow part of a pipe, its pressure must fall. That one idea explains a venturi meter, the lift on an aircraft wing and how fast water spurts from a hole in a tank.",
      definition:
        "- Along a streamline of steady flow of an incompressible, non-viscous liquid: \\(P + \\dfrac{1}{2}\\rho v^{2} + \\rho g h\\) is constant.\n" +
        "- Each term is an energy per unit volume: \\(\\dfrac{1}{2}\\rho v^{2}\\) is the kinetic energy per unit volume and \\(\\rho g h\\) the potential energy per unit volume.\n" +
        "- Horizontal flow: \\(P_1 - P_2 = \\dfrac{1}{2}\\rho\\left(v_2^{2} - v_1^{2}\\right)\\). Faster flow, lower pressure.\n" +
        "- **Torricelli's law**: liquid leaves a small hole a depth h below the open surface at \\(v = \\sqrt{2gh}\\), the speed of a body falling freely through h.\n" +
        "- A **venturi meter** finds the speed of flow from the pressure drop at a narrow throat; it works on Bernoulli's principle.\n" +
        "- **Dynamic lift**: air moves faster over the top of a wing, so the pressure there is lower. Lift force = pressure difference × wing area.",
      formula: {
        label: "Bernoulli's principle",
        latex: "P + \\frac{1}{2}\\rho v^{2} + \\rho g h = \\text{constant}, \\qquad v_{\\text{efflux}} = \\sqrt{2gh}",
      },
      authoredExample: {
        prompt:
          "Water flows through a horizontal pipe. Its speed is 2 m/s at a wide section and 4 m/s at a narrow section. Find the pressure difference between the two sections and say which has the higher pressure. (\\(\\rho = 1000\\ \\text{kg m}^{-3}\\))",
        steps: [
          "Horizontal, so the \\(\\rho g h\\) terms cancel: \\(P_1 - P_2 = \\dfrac{1}{2}\\rho\\left(v_2^{2} - v_1^{2}\\right)\\).",
          "\\(P_1 - P_2 = \\dfrac{1}{2} \\times 1000 \\times (16 - 4) = 6000\\) Pa.",
          "The slower, wide section has the higher pressure.",
        ],
        answer: "6000 Pa, higher at the wide section",
      },
      selfCheckExample: {
        prompt:
          "A small hole is made in the side of an open water tank, 1.8 m below the water surface. How fast does the water come out? (g = 10 m/s²)",
        steps: [
          "Torricelli's law: \\(v = \\sqrt{2gh}\\).",
          "\\(v = \\sqrt{2 \\times 10 \\times 1.8} = \\sqrt{36} = 6\\) m/s.",
        ],
        answer: "6 m/s",
      },
      practiceSet: [
        { prompt: "Air moves at 50 m/s over the top of a wing and 40 m/s under it. The wing area is 2 m² and the air density 1.2 kg/m³. Find the lift.", answer: "1080 N" },
        { prompt: "Bernoulli's principle follows from the conservation of which quantity?", answer: "Energy" },
        { prompt: "Water spurts from a small hole 20 m below the surface of a tank. Find its speed (g = 10 m/s²).", answer: "20 m/s" },
        { prompt: "In a horizontal pipe that narrows, is the pressure lower in the wide part or the narrow part?", answer: "The narrow part" },
      ],
      pyqExampleId: "44e9353b-f0e1-477a-8745-7737984a43ea",
      traps: [
        {
          title: "Faster flow means lower pressure",
          body: "In a horizontal pipe the pressure is highest where the liquid is slowest. A statement that the pressure is larger where the speed is larger is false.",
        },
        {
          title: "Efflux speed uses the depth below the surface",
          body: "In \\(v = \\sqrt{2gh}\\), h is measured down from the liquid surface to the hole, not up from the ground or the bottom of the tank.",
        },
        {
          title: "Height changes the balance too",
          body: "When the two points are at different heights, keep the \\(\\rho g h\\) terms. Liquid that rises loses kinetic energy or pressure to pay for the potential energy it gains.",
        },
      ],
    },
  ],
};
