import type { SubtopicNote } from "@/app/notes/_types";

export const VISCOSITY_FLUID_NOTE: SubtopicNote = {
  subtopicName: "Viscosity, Stokes' Law and Reynolds Number",
  title: "Viscosity, Stokes' Law and Reynolds Number",
  oneLineDefinition:
    "Viscosity is a fluid's internal friction: the force between layers is ηA times the rate at which the speed changes across them, a small sphere moving slowly feels a drag of 6πηrv, and the Reynolds number ρvd/η says whether a flow stays smooth.",
  whyItMatters:
    "Twelve PYQs, eight of them multiple choice, and none from 2026. Five use Newton's law of viscosity, the Reynolds number or the facts of viscous flow, such as how viscosity changes with temperature; seven ask for the viscous force on a ball falling at constant velocity, and three of those are the same question set in three different years.",
  concepts: [
    // C1 — Newton's law of viscosity + Reynolds number
    {
      kind: "formula" as const,
      slug: "jpfluid-viscosity-law",
      name: "Newton's law of viscosity and the Reynolds number",
      intuition:
        "In a flowing liquid each layer drags on the next. The drag grows with the area of contact and with how quickly the speed changes from one layer to the next. In a thin film between a still surface and a moving plate, the speed goes from 0 to v across the thickness d, so the rate of change is v/d. The Reynolds number compares the push of the moving fluid with this drag: when it is large, the flow breaks up into turbulence.",
      definition:
        "- \\(F = \\eta A \\dfrac{dv}{dz}\\). For a film or a layer of depth d: \\(F = \\eta A\\dfrac{v}{d}\\), and the shear stress is \\(\\dfrac{F}{A} = \\eta\\dfrac{v}{d}\\).\n" +
        "- Unit of η: Pa s. 1 Pa s = 10 poise.\n" +
        "- Liquids: η FALLS as the temperature rises. Gases: η RISES with temperature. Gases are far less viscous than liquids.\n" +
        "- \\(R_e = \\dfrac{\\rho v d}{\\eta}\\), with d the DIAMETER of the pipe. NCERT's bands: below about 1000 the flow is streamline, between 1000 and 2000 it is unsteady, above 2000 it is turbulent.\n" +
        "- Flow from a tap: \\(v = \\dfrac{Q}{\\pi r^{2}}\\), with Q in m³/s (1 L/min = \\(\\tfrac{1}{60} \\times 10^{-3}\\ \\text{m}^{3}/\\text{s}\\)).\n" +
        "- In steady flow two streamlines never cross.",
      formula: {
        label: "Viscous force and Reynolds number",
        latex: "F = \\eta A\\frac{v}{d}, \\qquad R_e = \\frac{\\rho v d}{\\eta}",
      },
      authoredExample: {
        prompt:
          "A plate of area \\(0.5\\ \\text{m}^{2}\\) slides at 0.4 m/s over a film of oil 1 mm thick on a fixed table. The oil's viscosity is 0.2 Pa s. What force keeps the plate moving at this speed?",
        steps: [
          "Speed gradient: \\(\\dfrac{v}{d} = \\dfrac{0.4}{10^{-3}} = 400\\ \\text{s}^{-1}\\).",
          "\\(F = \\eta A\\dfrac{v}{d} = 0.2 \\times 0.5 \\times 400 = 40\\) N.",
          "At constant speed this applied force just balances the viscous drag.",
        ],
        answer: "40 N",
      },
      selfCheckExample: {
        prompt:
          "Water (\\(\\rho = 1000\\ \\text{kg/m}^{3}\\), \\(\\eta = 10^{-3}\\) Pa s) flows through a pipe of diameter 2 cm. Find the Reynolds number at 0.04 m/s and at 0.12 m/s, and name each flow.",
        steps: [
          "At 0.04 m/s: \\(R_e = \\dfrac{1000 \\times 0.04 \\times 0.02}{10^{-3}} = 800\\), below 1000: streamline.",
          "At 0.12 m/s: \\(R_e = 3 \\times 800 = 2400\\), above 2000: turbulent.",
        ],
        answer: "800, streamline; 2400, turbulent.",
      },
      practiceSet: [
        { prompt: "A river's surface moves at 4 m/s over a still bed 2 m below. \\(\\eta = 10^{-3}\\) Pa s. Shear stress?", answer: "\\(2 \\times 10^{-3}\\) Pa" },
        { prompt: "Convert 1.5 Pa s to poise.", answer: "15 poise" },
        { prompt: "A gas is heated. Does its viscosity rise or fall?", answer: "It rises (a liquid's falls)." },
        { prompt: "In \\(R_e = \\rho v d/\\eta\\), what is d?", answer: "The diameter of the pipe" },
      ],
      pyqExampleId: "2b9ec362-e4e3-41d4-ba17-eeda65aeb31e", // 2022: river surface speed and shear stress give the depth
      traps: [
        {
          title: "Liquids and gases go opposite ways with temperature",
          body: "Heating a liquid lowers its viscosity, so hot water flows faster. Heating a gas raises its viscosity. A statement that says viscosity rises with temperature is true only for a gas.",
        },
        {
          title: "Convert km/h and poise first",
          body: "72 km/h is 20 m/s, and 1 poise is 0.1 Pa s. A stem that mixes units gives an answer off by a power of ten.",
        },
      ],
    },

    // C2 — Stokes' law and the force at constant velocity
    {
      kind: "formula" as const,
      slug: "jpfluid-viscous-force",
      name: "Stokes' law and the viscous force at constant velocity",
      intuition:
        "A small sphere moving slowly through a fluid feels a drag of \\(6\\pi\\eta r v\\). When a ball falls at constant velocity, nothing accelerates it, so the forces on it balance. The drag is then whatever is left of the weight after buoyancy. That gives the viscous force without knowing η or v.",
      definition:
        "- Stokes' law: \\(F = 6\\pi\\eta r v\\), for a small sphere in slow streamline flow.\n" +
        "- At constant velocity: \\(F_v = mg - F_B\\). The ball's volume is \\(m/\\rho\\), so \\(F_B = \\dfrac{m}{\\rho}\\rho_0 g\\) and \\(F_v = mg\\left(1 - \\dfrac{\\rho_0}{\\rho}\\right)\\).\n" +
        "- If the ball is twice as dense as the liquid, \\(F_v = mg/2\\). If buoyancy is neglected, \\(F_v = mg\\).\n" +
        "- From the radius and densities: \\(F_v = \\tfrac{4}{3}\\pi r^{3}(\\rho - \\rho_0)g\\).",
      formula: {
        label: "Viscous force at constant velocity",
        latex: "F_v = mg\\left(1 - \\frac{\\rho_0}{\\rho}\\right) = \\tfrac{4}{3}\\pi r^{3}(\\rho - \\rho_0)g",
      },
      authoredExample: {
        prompt:
          "A steel ball of mass 4 g and density \\(7500\\ \\text{kg/m}^{3}\\) falls at constant velocity through oil of density \\(1500\\ \\text{kg/m}^{3}\\). Find the viscous force on it. (\\(g = 10\\ \\text{m/s}^{2}\\))",
        steps: [
          "Weight: \\(mg = 0.004 \\times 10 = 0.04\\) N.",
          "\\(1 - \\dfrac{\\rho_0}{\\rho} = 1 - \\dfrac{1500}{7500} = 0.8\\).",
          "\\(F_v = 0.04 \\times 0.8 = 0.032\\) N. The other 0.008 N is the buoyancy.",
        ],
        answer: "0.032 N",
      },
      selfCheckExample: {
        prompt:
          "A ball of radius 2 mm and density \\(6000\\ \\text{kg/m}^{3}\\) falls at constant velocity through a liquid of density \\(1500\\ \\text{kg/m}^{3}\\). Find the viscous force. (\\(\\pi = 3.14\\), \\(g = 10\\ \\text{m/s}^{2}\\))",
        steps: [
          "\\(F_v = \\tfrac{4}{3}\\pi r^{3}(\\rho - \\rho_0)g\\), with \\(r^{3} = 8 \\times 10^{-9}\\ \\text{m}^{3}\\).",
          "\\(\\tfrac{4}{3} \\times 3.14 \\times 8 \\times 10^{-9} = 3.35 \\times 10^{-8}\\ \\text{m}^{3}\\).",
          "\\(F_v = 3.35 \\times 10^{-8} \\times 4500 \\times 10 = 1.5 \\times 10^{-3}\\) N.",
        ],
        answer: "\\(1.5 \\times 10^{-3}\\) N",
      },
      practiceSet: [
        { prompt: "A ball is twice as dense as the liquid it falls through. Viscous force at constant velocity, in terms of its weight W?", answer: "W/2" },
        { prompt: "Buoyancy neglected: viscous force on a drop falling at constant velocity?", answer: "Its weight, mg" },
        { prompt: "Stokes' drag on a sphere of radius r moving at speed v through a fluid of viscosity η?", answer: "\\(6\\pi\\eta r v\\)" },
        { prompt: "A ball is three times as dense as the liquid. Viscous force as a fraction of its weight?", answer: "2/3" },
      ],
      pyqExampleId: "f63d31ad-fa01-4666-aa7e-513da3687996", // 2024: viscous force mg(1 − ρ₀/ρ)
      traps: [
        {
          title: "Buoyancy is subtracted, not added",
          body: "Weight = buoyancy + viscous drag, so the drag is the weight MINUS the buoyancy. Adding them gives a force bigger than the weight.",
        },
        {
          title: "The ball's density goes in the denominator",
          body: "F = mg(1 − ρ_liquid/ρ_ball). The option mg(ρ_liquid/ρ_ball − 1) is negative for any ball that sinks.",
        },
      ],
    },
  ],
};
