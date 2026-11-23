import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_TD_PROCESSES_NOTE: SubtopicNote = {
  subtopicName: "Thermodynamic Processes",
  title: "Isothermal, Adiabatic, Isobaric, Isochoric and Cyclic Processes",
  oneLineDefinition:
    "The thermodynamic processes, each holding one quantity fixed, the work done in an isothermal and an adiabatic change, and why a cyclic process turns all its net heat into work.",
  whyItMatters:
    "23 questions, fourteen of them from board papers from 2017 to 2026, the most of any page. The board asks you to define the isothermal process (2020) and derive its work (2023, 2024, 2025), calculate that work for 0.5 mol of gas (2025, 2026), explain the cyclic process with a p-V diagram (2024, 2026), explain the adiabatic process and find γ for a rigid diatomic gas (2025), and find the pressure ratio after an adiabatic compression (2023). The textbook adds isobaric work, an adiabatic compression to 1/15 of the volume and the work along each side of a rectangle on a p-V diagram.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscptd-isothermal",
      name: "Isothermal process and its work",
      intuition:
        "In an isothermal change the temperature never changes. That needs a gas in good contact with its surroundings and a very slow change, so heat can flow in as fast as the gas uses it. With T fixed, the internal energy of an ideal gas stays fixed too, so every joule of heat taken in comes out as work.",
      definition:
        "- **Definition:** a process in which the pressure and volume of a system change at constant temperature, \\(\\Delta T = 0\\). It needs good thermal contact with the surroundings and a very slow change.\n" +
        "- For an ideal gas \\(pV\\) = constant (Boyle's law), so \\(p_iV_i = p_fV_f\\). The p-V curve is a rectangular hyperbola, called an isotherm.\n" +
        "- \\(\\Delta U = 0\\), so the first law gives \\(Q = W\\). Examples: melting of ice, boiling of water.\n" +
        "- **Derivation of work.** Take n moles of an ideal gas at temperature T in a cylinder with a frictionless, massless piston, expanding from \\(V_i\\) to \\(V_f\\).\n" +
        "- For a small expansion dV the work done is \\(dW = p\\,dV\\), so \\(W = \\int_{V_i}^{V_f} p\\,dV\\).\n" +
        "- From \\(pV = nRT\\), \\(p = \\dfrac{nRT}{V}\\), so \\(W = \\int_{V_i}^{V_f} \\dfrac{nRT}{V}\\,dV\\).\n" +
        "- T is constant, so \\(W = nRT\\int_{V_i}^{V_f}\\dfrac{dV}{V} = nRT\\big[\\ln V\\big]_{V_i}^{V_f}\\).\n" +
        "- Hence \\(W = nRT\\ln\\dfrac{V_f}{V_i} = 2.303\\,nRT\\log_{10}\\dfrac{V_f}{V_i}\\), and \\(Q = W\\).",
      formula: {
        label: "Isothermal work",
        latex: "W = nRT\\ln\\frac{V_f}{V_i} = 2.303\\,nRT\\log_{10}\\frac{V_f}{V_i}",
      },
      authoredExample: {
        prompt:
          "2 mol of an ideal gas at 400 K is compressed isothermally from 10 litres to 5 litres. Find the work done by the gas and the heat exchanged. Take \\(R = 8.314\\) J mol\\(^{-1}\\) K\\(^{-1}\\).",
        steps: [
          "Given: \\(n = 2\\) mol, \\(T = 400\\) K, \\(V_i = 10\\) L, \\(V_f = 5\\) L. Only the ratio of volumes is needed, so litres are fine.",
          "Formula: \\(W = nRT\\ln\\dfrac{V_f}{V_i}\\).",
          "Substitution: \\(W = 2 \\times 8.314 \\times 400 \\times \\ln 0.5 = 6651.2 \\times (-0.6931) = -4610\\) J.",
          "\\(\\Delta U = 0\\), so \\(Q = W = -4610\\) J: the gas gives out 4.61 kJ of heat.",
        ],
        answer: "\\(W = -4.61\\) kJ (work done on the gas); \\(Q = -4.61\\) kJ (heat given out)",
      },
      selfCheckExample: {
        prompt: "The pressure of an ideal gas is halved at constant temperature. What happens to its volume?",
        steps: ["\\(pV\\) = constant, so halving p doubles V."],
        answer: "The volume doubles",
      },
      practiceSet: [
        { prompt: "An ideal gas does 750 J of work in an isothermal expansion. How much heat does it absorb?", answer: "750 J" },
        { prompt: "What is the shape of an isotherm on a p-V diagram?", answer: "A rectangular hyperbola" },
        { prompt: "1 mol of an ideal gas at 300 K expands isothermally to 10 times its volume. Find the work done by it. Take \\(R = 8.314\\) J mol\\(^{-1}\\) K\\(^{-1}\\).", answer: "\\(W = 2.303 \\times 8.314 \\times 300 \\times 1\\), about \\(5.74 \\times 10^{3}\\) J" },
      ],
      pyqExampleId: "3c354349-051a-4ffb-acca-bd509b9ecb6d",
      traps: [
        {
          title: "Saying Q = 0 in an isothermal process",
          body: "In an isothermal change it is \\(\\Delta U\\) that is zero, not Q. Heat does flow in, equal to the work done.",
        },
        {
          title: "Turning the volume ratio upside down",
          body: "The final volume goes on top: \\(\\ln(V_f/V_i)\\). An expansion must give positive work; if yours is negative, check the ratio.",
        },
        {
          title: "Using °C for T",
          body: "The T in \\(nRT\\) is in kelvin. 27 °C is 300 K.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscptd-adiabatic",
      name: "Adiabatic process",
      intuition:
        "In an adiabatic change no heat crosses the boundary, either because the system is insulated or because the change is too quick for heat to flow. So any work comes out of the gas's own internal energy. Expand it suddenly and it cools; squash it suddenly and it heats up, which is how a diesel engine lights its fuel without a spark plug.",
      definition:
        "- **Definition:** a process in which no heat is exchanged between the system and its surroundings, \\(Q = 0\\). It needs a thermally insulated system or a very quick change.\n" +
        "- First law: \\(\\Delta U = -W\\). An expansion (W positive) lowers U and T; a compression raises them.\n" +
        "- For an ideal gas \\(pV^{\\gamma}\\) = constant and \\(TV^{\\gamma - 1}\\) = constant, where \\(\\gamma = C_p/C_v\\).\n" +
        "- \\(\\gamma = 5/3\\) for a monatomic gas. A rigid diatomic molecule has 5 degrees of freedom (3 translational, 2 rotational), so \\(C_v = \\tfrac{5}{2}R\\), \\(C_p = C_v + R = \\tfrac{7}{2}R\\) and \\(\\gamma = 7/5 = 1.4\\).\n" +
        "- Work done by the gas: \\(W = \\dfrac{p_iV_i - p_fV_f}{\\gamma - 1}\\).\n" +
        "- Examples: a tyre or balloon bursting (the air cools), the compression stroke of a diesel engine (the air heats up).",
      formula: {
        label: "Adiabatic relations",
        latex: "pV^{\\gamma} = \\text{constant}, \\qquad TV^{\\gamma - 1} = \\text{constant}, \\qquad W = \\frac{p_iV_i - p_fV_f}{\\gamma - 1}",
      },
      authoredExample: {
        prompt:
          "Air (\\(\\gamma = 1.4\\)) at 300 K and \\(1.0 \\times 10^{5}\\) Pa is compressed adiabatically to 1/32 of its volume. Find its final temperature and final pressure.",
        steps: [
          "Given: \\(T_i = 300\\) K, \\(p_i = 1.0 \\times 10^{5}\\) Pa, \\(V_i/V_f = 32\\), \\(\\gamma = 1.4\\).",
          "Temperature: \\(T_f = T_i\\left(\\dfrac{V_i}{V_f}\\right)^{\\gamma - 1} = 300 \\times 32^{0.4} = 300 \\times 4 = 1200\\) K.",
          "Pressure: \\(p_f = p_i\\left(\\dfrac{V_i}{V_f}\\right)^{\\gamma} = 1.0 \\times 10^{5} \\times 32^{1.4} = 1.0 \\times 10^{5} \\times 128\\).",
          "\\(p_f = 1.28 \\times 10^{7}\\) Pa.",
        ],
        answer: "\\(T_f = 1200\\) K; \\(p_f = 1.28 \\times 10^{7}\\) Pa",
      },
      selfCheckExample: {
        prompt: "A monatomic gas (\\(\\gamma = 5/3\\)) expands adiabatically to 8 times its volume. By what factor does its pressure fall?",
        steps: ["\\(p_f/p_i = (1/8)^{5/3} = 1/32\\)."],
        answer: "It falls to 1/32 of its value",
      },
      practiceSet: [
        { prompt: "In an adiabatic process, which term of the first law is zero?", answer: "Q" },
        { prompt: "A gas expands adiabatically. Does its temperature rise or fall?", answer: "It falls" },
        { prompt: "For a monatomic gas \\(C_v = \\tfrac{3}{2}R\\). Find \\(\\gamma\\).", answer: "\\(C_p = \\tfrac{5}{2}R\\), so \\(\\gamma = 5/3\\)" },
      ],
      pyqExampleId: "3d65f157-7c75-46d6-8046-8c38320fa17c",
      traps: [
        {
          title: "Taking 'no heat' to mean 'no change in temperature'",
          body: "In an adiabatic change \\(Q = 0\\) but the temperature changes, because work changes the internal energy. Constant temperature is the isothermal process.",
        },
        {
          title: "Using γ in the temperature relation",
          body: "Pressure goes with \\(V^{\\gamma}\\) but temperature with \\(V^{\\gamma - 1}\\). Using γ for the temperature gives far too large a rise.",
        },
        {
          title: "Treating a sudden change as isothermal",
          body: "A sudden compression or a bursting tyre has no time to exchange heat, so treat it as adiabatic, not isothermal.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscptd-isobaric-isochoric",
      name: "The four types of process: isobaric and isochoric",
      intuition:
        "Fix the pressure and you get an isobaric change: the gas expands as it warms, so part of the heat goes into work. Fix the volume and you get an isochoric change: the gas cannot push anything, so all the heat goes into internal energy. With the isothermal and adiabatic processes, these are the four types the board asks you to name.",
      definition:
        "- A **thermodynamic process** changes two or more of the state variables p, V and T, taking a system from one state to another. Usually one quantity is held fixed.\n" +
        "- **Isothermal:** T constant. **Adiabatic:** no heat exchanged. **Isobaric:** p constant. **Isochoric:** V constant.\n" +
        "- **Isobaric:** \\(W = p\\,(V_f - V_i) = nR\\,(T_f - T_i)\\) and \\(Q = \\Delta U + W\\). A horizontal line on a p-V diagram.\n" +
        "- **Isochoric:** \\(W = 0\\), so \\(Q = \\Delta U\\). A vertical line on a p-V diagram.",
      formula: {
        label: "Isobaric work",
        latex: "W = p\\,(V_f - V_i) = nR\\,(T_f - T_i)",
      },
      authoredExample: {
        prompt:
          "2 mol of an ideal gas is heated at constant pressure from 300 K to 350 K. Find the work done by the gas. Take \\(R = 8.314\\) J mol\\(^{-1}\\) K\\(^{-1}\\).",
        steps: [
          "Given: \\(n = 2\\) mol, \\(T_i = 300\\) K, \\(T_f = 350\\) K.",
          "Formula: at constant pressure \\(W = nR\\,(T_f - T_i)\\).",
          "Substitution: \\(W = 2 \\times 8.314 \\times 50 = 831.4\\) J.",
        ],
        answer: "\\(W = 831.4\\) J",
      },
      selfCheckExample: {
        prompt: "A gas kept at constant volume receives 500 J of heat. Find the work done by it and the change in its internal energy.",
        steps: ["Constant volume, so \\(W = 0\\).", "\\(\\Delta U = Q - W = 500\\) J."],
        answer: "W = 0; ΔU = 500 J",
      },
      practiceSet: [
        { prompt: "Which process is a horizontal straight line on a p-V diagram?", answer: "Isobaric" },
        { prompt: "Which process is a vertical straight line on a p-V diagram?", answer: "Isochoric" },
        { prompt: "A gas expands at a constant pressure of \\(2 \\times 10^{5}\\) Pa from 3 litres to 5 litres. Find the work done by it.", answer: "400 J" },
      ],
      pyqExampleId: "c2e26de5-6a38-4af2-92fa-437de7290d0e",
      traps: [
        {
          title: "Mixing up isobaric and isochoric",
          body: "Isobaric means the same pressure; isochoric means the same volume. The isochoric process is the one that does no work.",
        },
        {
          title: "Naming types without their conditions",
          body: "Writing 'isothermal and adiabatic' is not enough for the marks. State what is held fixed in each and give its equation, \\(pV\\) = constant or \\(pV^{\\gamma}\\) = constant.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscptd-cyclic",
      name: "Cyclic process",
      intuition:
        "In a cyclic process the gas goes on a round trip and comes back to its starting state. Internal energy depends only on the state, so after one full round it is back where it began. Whatever net heat went in must have come out as net work, and that work is the area inside the loop.",
      definition:
        "- **Definition:** a process in which a system passes through a series of changes and returns to its initial state, so its initial and final p, V and T are the same.\n" +
        "- On a p-V diagram it is a **closed curve**. Expansion along the upper path does positive work (the area under it); compression along the lower path does negative work. Net work = area enclosed.\n" +
        "- U is a state function, so \\(\\Delta U = 0\\) and the first law gives \\(Q = W\\).\n" +
        "- A clockwise loop does positive net work (a heat engine). An anticlockwise loop does negative net work (a refrigerator).",
      formula: {
        label: "Cyclic process",
        latex: "\\Delta U = 0, \\qquad Q = W = \\text{area enclosed by the loop}",
      },
      authoredExample: {
        prompt:
          "In one cycle a gas absorbs 900 J of heat and gives out 600 J of heat. Find the change in its internal energy and the net work done by it in one cycle.",
        steps: [
          "Given: heat in \\(= 900\\) J, heat out \\(= 600\\) J, so net \\(Q = 900 - 600 = 300\\) J.",
          "Cyclic process, so \\(\\Delta U = 0\\).",
          "First law: \\(W = Q - \\Delta U = 300\\) J.",
        ],
        answer: "ΔU = 0; W = 300 J per cycle",
      },
      selfCheckExample: {
        prompt:
          "A cycle is traced anticlockwise on a p-V diagram and encloses an area of 250 J. Find the net work done by the gas and the net heat it exchanges.",
        steps: ["Anticlockwise, so \\(W = -250\\) J.", "\\(\\Delta U = 0\\), so \\(Q = W = -250\\) J."],
        answer: "\\(W = -250\\) J; 250 J of heat is given out",
      },
      practiceSet: [
        { prompt: "What is the change in internal energy of a gas over one complete cycle?", answer: "Zero" },
        { prompt: "Does a clockwise cycle on a p-V diagram represent a heat engine or a refrigerator?", answer: "A heat engine" },
        { prompt: "A gas does 400 J of net work in one cycle. How much net heat does it absorb?", answer: "400 J" },
      ],
      pyqExampleId: "afd71953-e05d-4698-a8e6-bc32dae3b0a5",
      traps: [
        {
          title: "Drawing an open curve",
          body: "A cyclic process must be a closed loop with arrows showing its direction. Label the axes p and V and mark the states, such as A and B.",
        },
        {
          title: "Saying Q = 0 in a cycle",
          body: "Over a cycle \\(\\Delta U = 0\\), not Q. Heat does flow; the net heat equals the net work.",
        },
      ],
    },
  ],
};
