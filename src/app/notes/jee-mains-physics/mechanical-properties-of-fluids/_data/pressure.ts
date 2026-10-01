import type { SubtopicNote } from "@/app/notes/_types";

export const PRESSURE_FLUID_NOTE: SubtopicNote = {
  subtopicName: "Pressure, Pascal's Law and Buoyancy",
  title: "Pressure, Pascal's Law and Buoyancy",
  oneLineDefinition:
    "Pressure in a still liquid grows with depth as P = P₀ + ρgh, a pressure added anywhere in an enclosed liquid reaches every point of it, and a floating body sinks until it displaces its own weight of liquid.",
  whyItMatters:
    "Fifteen PYQs, eleven of them multiple choice, and three from 2026. Six use pressure at a depth: an absolute pressure, a force on a base or a door, the work gravity does when two vessels share their water, and whether pressure exists inside a still fluid at all; four are Pascal's law and the hydraulic lift; five are floating bodies, from the submerged height of a block to a cube resting across two liquids.",
  concepts: [
    // C1 — pressure at a depth
    {
      kind: "formula" as const,
      slug: "jpfluid-pressure-depth",
      name: "Pressure at a depth, absolute and gauge",
      intuition:
        "The liquid above a point presses down on it with its weight: a column of height h and density ρ adds \\(\\rho g h\\). The air above the surface adds \\(P_0\\) on top of that. A gauge reads only the part due to the liquid. Pressure acts in every direction at every point inside the liquid, not only on the walls, and at one level in one connected still liquid it is the same everywhere.",
      definition:
        "- Absolute pressure: \\(P = P_0 + \\rho g h\\). Gauge pressure: \\(P - P_0 = \\rho g h\\).\n" +
        "- Same level in one connected still liquid: same pressure, whatever the shape of the vessel.\n" +
        "- Doubling the depth doubles \\(\\rho g h\\), not \\(P\\): the pressure goes from \\(P_0 + \\rho g h\\) to \\(P_0 + 2\\rho g h\\).\n" +
        "- Force on a flat base: \\(F = P \\times A\\). Include \\(P_0\\) when the stem gives it.\n" +
        "- A window in a partition with a liquid on each side: \\(P_0\\) acts on both sides and cancels, so the net force is \\((\\rho_1 - \\rho_2) g h A\\) at the window's depth h.\n" +
        "- Two vessels joined at the bottom settle to a common level. A column of height h and base area A has potential energy \\(\\rho A g h^{2}/2\\); gravity's work is the loss in this energy.",
      formula: {
        label: "Pressure at depth h",
        latex: "P = P_0 + \\rho g h",
      },
      authoredExample: {
        prompt:
          "A diver feels an absolute pressure of \\(2.5 \\times 10^{5}\\) Pa. Atmospheric pressure is \\(1.0 \\times 10^{5}\\) Pa. The diver goes three times as deep. Find the new absolute pressure and its percentage increase.",
        steps: [
          "The water alone gives \\(\\rho g h = 2.5 \\times 10^{5} - 1.0 \\times 10^{5} = 1.5 \\times 10^{5}\\) Pa.",
          "Three times the depth: \\(\\rho g (3h) = 4.5 \\times 10^{5}\\) Pa.",
          "New pressure: \\(P = 1.0 \\times 10^{5} + 4.5 \\times 10^{5} = 5.5 \\times 10^{5}\\) Pa.",
          "Increase: \\(\\dfrac{5.5 - 2.5}{2.5} \\times 100 = 120\\%\\), not 200%, because the atmosphere does not triple.",
        ],
        answer: "\\(5.5 \\times 10^{5}\\) Pa, an increase of \\(120\\%\\).",
      },
      selfCheckExample: {
        prompt:
          "Two identical cylinders of base area \\(0.5\\ \\text{m}^{2}\\) hold water to heights 4 m and 2 m. They are joined at the bottom. Find the work done by gravity. (\\(\\rho = 1000\\ \\text{kg/m}^{3}\\), \\(g = 10\\ \\text{m/s}^{2}\\))",
        steps: [
          "Equal areas, so the common level is \\((4 + 2)/2 = 3\\) m.",
          "Energy before: \\(\\dfrac{\\rho A g}{2}(4^{2} + 2^{2}) = \\dfrac{1000 \\times 0.5 \\times 10}{2} \\times 20 = 5.0 \\times 10^{4}\\) J.",
          "Energy after: \\(2500 \\times (3^{2} + 3^{2}) = 4.5 \\times 10^{4}\\) J.",
          "Gravity's work \\(= 5.0 \\times 10^{4} - 4.5 \\times 10^{4} = 5.0 \\times 10^{3}\\) J. Check with \\(\\rho A g (h_1 - h_2)^{2}/4 = 5000 \\times 4/4\\).",
        ],
        answer: "\\(5.0 \\times 10^{3}\\) J",
      },
      practiceSet: [
        { prompt: "Gauge pressure 5 m below the surface of water? (\\(\\rho = 1000\\ \\text{kg/m}^{3}\\), \\(g = 10\\ \\text{m/s}^{2}\\))", answer: "\\(5 \\times 10^{4}\\) Pa" },
        { prompt: "Water stands 2 m deep on a base of \\(3\\ \\text{m}^{2}\\). Force of the water alone on the base?", answer: "\\(6 \\times 10^{4}\\) N" },
        { prompt: "A door of area \\(0.02\\ \\text{m}^{2}\\) at depth 2 m has water (1000 kg/m³) on one side and oil (800 kg/m³) on the other, both filled to the top. Net force on the door?", answer: "80 N, pushing from the water side" },
        { prompt: "True or false: pressure in a still liquid acts only on the walls of its vessel.", answer: "False. It acts in every direction at every point." },
      ],
      pyqExampleId: "c9fbbb7e-6506-420e-9109-0381da8be148", // 2021: submarine at double depth, atmosphere in the absolute pressure
      traps: [
        {
          title: "Doubling the depth does not double the pressure",
          body: "Only ρgh doubles. The atmosphere's share stays the same, so the absolute pressure grows by less than 100%. Doubling the whole of P counts the atmosphere twice.",
        },
        {
          title: "Keep P₀ in a force on a base when the stem gives it",
          body: "For the force a liquid exerts on the bottom of a tube open to the air, JEE has keyed (P₀ + ρgh) × A when it gives P₀. The smaller option, ρgh × A, leaves the atmosphere out.",
        },
        {
          title: "Across a partition, the atmosphere cancels",
          body: "Air presses on both free surfaces, so only the difference of the liquid pressures pushes on a door in the partition: (ρ₁ − ρ₂)ghA.",
        },
      ],
    },

    // C2 — Pascal's law
    {
      kind: "formula" as const,
      slug: "jpfluid-pascal",
      name: "Pascal's law and the hydraulic lift",
      intuition:
        "A push on an enclosed liquid raises the pressure everywhere in it by the same amount. A small force on a small piston therefore makes the same pressure under a large piston, and there it gives a large force. Energy is not created: the small piston has to move farther, by the ratio of the areas.",
      definition:
        "- Pascal's law: a change in pressure applied to an enclosed incompressible fluid reaches every point of the fluid and the walls undiminished.\n" +
        "- Hydraulic lift: \\(\\dfrac{F_1}{A_1} = \\dfrac{F_2}{A_2}\\), so \\(F_2 = F_1\\dfrac{A_2}{A_1}\\).\n" +
        "- The same volume moves on both sides: \\(A_1 d_1 = A_2 d_2\\). So \\(F_1 d_1 = F_2 d_2\\): work in equals work out.\n" +
        "- The pressure under the small piston equals the load divided by the LARGE area, \\(Mg/A_2\\).\n" +
        "- Squeezing a toothpaste tube, hydraulic brakes and hydraulic presses all use Pascal's law.",
      formula: {
        label: "Hydraulic lift",
        latex: "\\frac{F_1}{A_1} = \\frac{F_2}{A_2}, \\qquad F_1 d_1 = F_2 d_2",
      },
      authoredExample: {
        prompt:
          "A hydraulic press has pistons of area \\(10\\ \\text{cm}^{2}\\) and \\(400\\ \\text{cm}^{2}\\). A 50 N push moves the small piston down 8 cm. Find the force on the large piston, how far it rises and the work done.",
        steps: [
          "Area ratio \\(= 400/10 = 40\\), so \\(F_2 = 50 \\times 40 = 2000\\) N.",
          "Equal volumes: \\(d_2 = 8 \\times \\dfrac{10}{400} = 0.2\\) cm.",
          "Work in: \\(50 \\times 0.08 = 4\\) J. Work out: \\(2000 \\times 0.002 = 4\\) J, the same.",
        ],
        answer: "2000 N; it rises 0.2 cm; 4 J.",
      },
      selfCheckExample: {
        prompt:
          "A hydraulic lift's load piston has area \\(0.04\\ \\text{m}^{2}\\) and carries a 1200 kg car. Find the fluid pressure and the force needed on an input piston of area \\(10\\ \\text{cm}^{2}\\). (\\(g = 10\\ \\text{m/s}^{2}\\))",
        steps: [
          "\\(P = \\dfrac{1200 \\times 10}{0.04} = 3 \\times 10^{5}\\) Pa.",
          "The input piston feels the same pressure: \\(F_1 = 3 \\times 10^{5} \\times 10 \\times 10^{-4} = 300\\) N.",
        ],
        answer: "\\(3 \\times 10^{5}\\) Pa; 300 N.",
      },
      practiceSet: [
        { prompt: "Pistons of area \\(2\\ \\text{cm}^{2}\\) and \\(200\\ \\text{cm}^{2}\\). Force on the large piston for 30 N on the small one?", answer: "3000 N" },
        { prompt: "In the same lift the large piston rises 1 cm. How far does the small piston move?", answer: "100 cm" },
        { prompt: "An 800 kg load rests on a piston of area \\(0.1\\ \\text{m}^{2}\\). Pressure in the fluid? (\\(g = 10\\ \\text{m/s}^{2}\\))", answer: "\\(8 \\times 10^{4}\\) Pa" },
        { prompt: "Which law explains toothpaste coming out when the tube is squeezed at the far end?", answer: "Pascal's law" },
      ],
      pyqExampleId: "5a4eaca4-3d85-47f8-a121-869c3a498ee7", // 2025: hydraulic lift, work done in kJ
      traps: [
        {
          title: "The small piston carries the same pressure",
          body: "Pressure is the same throughout the enclosed fluid. The small piston has a smaller FORCE on it, but the pressure on it is still the load divided by the large area.",
        },
        {
          title: "A lift multiplies force, not work",
          body: "The force gain A₂/A₁ is paid for in distance: the small piston moves A₂/A₁ times farther. Work out equals work in.",
        },
      ],
    },

    // C3 — floating
    {
      kind: "formula" as const,
      slug: "jpfluid-floating",
      name: "Floating bodies and Archimedes' principle",
      intuition:
        "A floating body sinks until the liquid it pushes aside weighs as much as it does. So the fraction under the surface is its density divided by the liquid's. Put a load on it and it sinks further, by just enough extra liquid to carry the load.",
      definition:
        "- Archimedes' principle: upthrust = weight of liquid displaced = \\(\\rho_l V_{\\text{sub}} g\\).\n" +
        "- Floating: \\(\\rho_b V = \\rho_l V_{\\text{sub}}\\), so \\(\\dfrac{V_{\\text{sub}}}{V} = \\dfrac{\\rho_b}{\\rho_l}\\). For a block of height H the submerged height is \\(h = H\\dfrac{\\rho_b}{\\rho_l}\\).\n" +
        "- A load of mass m displaces an extra \\(m/\\rho_l\\) of liquid. A block of base area A sinks a further \\(\\Delta h = \\dfrac{m}{\\rho_l A}\\).\n" +
        "- Hollow sphere (outer diameter D, cavity d, material of relative density σ) that just floats: \\(\\sigma(D^{3} - d^{3}) = D^{3}\\), so \\(\\dfrac{D}{d} = \\left(\\dfrac{\\sigma}{\\sigma - 1}\\right)^{1/3}\\).\n" +
        "- A body floating across two liquids: \\(V_1\\rho_1 + V_2\\rho_2 = (V_1 + V_2)\\rho_b\\).",
      formula: {
        label: "Submerged fraction",
        latex: "\\frac{V_{\\text{sub}}}{V} = \\frac{\\rho_b}{\\rho_l}",
      },
      authoredExample: {
        prompt:
          "A wooden cylinder of height 12 cm and density \\(750\\ \\text{kg/m}^{3}\\) floats upright in water (\\(1000\\ \\text{kg/m}^{3}\\)). How much of its height is under water? How much would be under in oil of density \\(900\\ \\text{kg/m}^{3}\\)?",
        steps: [
          "In water: \\(h = 12 \\times \\dfrac{750}{1000} = 9\\) cm, so 3 cm stands above.",
          "In oil: \\(h = 12 \\times \\dfrac{750}{900} = 10\\) cm.",
          "The lighter the liquid, the deeper the body sinks.",
        ],
        answer: "9 cm in water; 10 cm in the oil.",
      },
      selfCheckExample: {
        prompt:
          "A wooden block with a base of 20 cm × 20 cm floats in water. A 600 g stone is placed on top. How much further does the block sink? (water: \\(1\\ \\text{g/cm}^{3}\\))",
        steps: [
          "Extra water to displace: \\(600\\ \\text{cm}^{3}\\).",
          "Base area \\(= 400\\ \\text{cm}^{2}\\), so \\(\\Delta h = 600/400 = 1.5\\) cm. The wood's density does not enter.",
        ],
        answer: "1.5 cm",
      },
      practiceSet: [
        { prompt: "Ice of density \\(0.9\\ \\text{g/cm}^{3}\\) floats in water. What fraction is under water?", answer: "Nine tenths" },
        { prompt: "A 300 g block of volume \\(500\\ \\text{cm}^{3}\\) floats in water. Volume above the water?", answer: "\\(200\\ \\text{cm}^{3}\\)" },
        { prompt: "A block of density 920 kg/m³ floats across a layer of oil (800 kg/m³) on water (1000 kg/m³). Ratio of its volume in water to its volume in oil?", answer: "3 : 2" },
        { prompt: "A hollow sphere of material with relative density 2 just floats in water. Ratio D/d?", answer: "\\(2^{1/3}\\)" },
      ],
      pyqExampleId: "54fe8f73-33e1-4df3-ad7a-893b43b7bbf0", // 2026: cubical block, submerged height
      traps: [
        {
          title: "Body over liquid, not liquid over body",
          body: "The submerged height is H × ρ_body/ρ_liquid, which is less than H. Inverting the ratio gives a height bigger than the block itself.",
        },
        {
          title: "A load adds displaced liquid, not displaced wood",
          body: "The extra depth is m/(ρ_liquid × A). The density of the floating block plays no part in it.",
        },
      ],
    },
  ],
};
