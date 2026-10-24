import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_FL_MATTER_NOTE: SubtopicNote = {
  subtopicName: "Pressure, Buoyancy and Elasticity",
  title: "Pressure, Buoyancy and Elasticity",
  oneLineDefinition:
    "Pressure as force per area and how it grows with depth, the buoyant force and why bodies float, the density of a mixture, and Hooke's law for springs and wires.",
  whyItMatters:
    "Nine CDS questions from 2016 (II) to 2026 (II): four on buoyancy and floating, two on pressure, two on elasticity and springs, and one on the density of a mixture. The one HARD question compares a gold and a silver piece weighed in water.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsphfl-pressure",
      name: "Pressure and pressure at a depth",
      intuition:
        "Pressure is how concentrated a force is: the same push spread over a big area presses gently, squeezed onto a small area it presses hard. That is why a sharp knife cuts and why snow shoes are wide. In a liquid, the weight of the liquid above adds pressure, so the deeper you go the more it presses, by the same amount in every direction.",
      definition:
        "Pressure in solids and fluids:\n" +
        "- **Pressure** = force (thrust) ÷ area, \\(P = F/A\\), in pascals. Same force, smaller area, **greater** pressure.\n" +
        "- In a liquid of density \\(\\rho\\), the pressure at depth \\(h\\) is \\(P = P_0 + \\rho g h\\), where \\(P_0\\) is the pressure at the surface (often the atmosphere).\n" +
        "- So all points at the **same depth** in a liquid at rest have the **same pressure**, and pressure does not depend on the shape of the vessel.\n" +
        "- **Pascal's law**: pressure applied to an enclosed liquid is passed on **undiminished** to every part of it. This is the idea behind the hydraulic lift and brakes, and the \\(P_0\\) term above.\n" +
        "- **Bernoulli's principle** is about liquids in **motion**; **Archimedes' principle** is about the upward (buoyant) force.",
      formula: {
        label: "Pressure",
        latex: "P = \\dfrac{F}{A} \\qquad P = P_0 + \\rho g h",
        symbols: [
          { symbol: "F, A", meaning: "force and the area it acts on" },
          { symbol: "P₀", meaning: "pressure at the liquid's surface" },
          { symbol: "ρ", meaning: "density of the liquid" },
          { symbol: "h", meaning: "depth below the surface" },
        ],
      },
      authoredExample: {
        prompt: "A diver is 10 m below the surface of a lake. The atmospheric pressure is \\(1.0 \\times 10^{5}\\) Pa. Find the total pressure on the diver. (Water density 1000 kg/m³, \\(g = 10\\) m/s².)",
        steps: [
          "Pressure from the water: \\(\\rho g h = 1000 \\times 10 \\times 10 = 1.0 \\times 10^{5}\\) Pa.",
          "Add the surface pressure: \\(1.0 \\times 10^{5} + 1.0 \\times 10^{5} = 2.0 \\times 10^{5}\\) Pa.",
        ],
        answer: "\\(2.0 \\times 10^{5}\\) Pa, about twice the atmospheric pressure.",
      },
      selfCheckExample: {
        prompt: "A force of 300 N acts on an area of 0.5 m². The same force then acts on 0.05 m². Find the two pressures.",
        steps: [
          "\\(300 \\div 0.5 = 600\\) Pa.",
          "\\(300 \\div 0.05 = 6000\\) Pa: one tenth of the area, ten times the pressure.",
        ],
        answer: "600 Pa and 6000 Pa.",
      },
      pyqExampleId: "ce6cb6f9-0661-46f3-93ef-6dbe3d8bffe2",
      practiceSet: [
        { prompt: "Why does a sharp knife cut better than a blunt one?", answer: "The same force acts on a smaller area, so the pressure is greater" },
        { prompt: "What is the water pressure (leaving out the atmosphere) 5 m below the surface? (Water density 1000 kg/m³, \\(g = 10\\) m/s².)", answer: "\\(5 \\times 10^{4}\\) Pa" },
        { prompt: "Which law says that pressure on an enclosed liquid is passed on equally to every part of it?", answer: "Pascal's law" },
        { prompt: "Does the pressure at the bottom of a liquid depend on the shape of the vessel?", answer: "No, only on the depth, the density and g" },
      ],
      traps: [
        {
          title: "The weight stays the same; the area changes",
          body: "Standing or lying, a body presses down with the same **weight**. What changes is the **area** of contact, so the **pressure** is larger on the small area of the feet.",
        },
        {
          title: "Moving liquid is Bernoulli; still liquid is Pascal",
          body: "The depth rule \\(P = P_0 + \\rho g h\\) is about a liquid **at rest**, and goes with Pascal's law. Bernoulli's principle is for **flowing** liquids, and Archimedes' principle for the buoyant force.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphfl-buoyancy",
      name: "Buoyancy and flotation",
      intuition:
        "Push a ball under water and you feel the water push back up. That upward push is the buoyant force, and it equals the weight of the water the body pushes aside. A body floats when that push can match its weight before it is fully under. Since a floating body's weight and the buoyant force both contain g, g cancels: a body floats just as deep on the Moon as on the earth.",
      definition:
        "Archimedes' principle and floating:\n" +
        "- **Buoyant force** = weight of liquid displaced = \\(\\rho_{\\text{liquid}} V_{\\text{sub}} g\\). For a body fully under, \\(V_{\\text{sub}}\\) is its whole volume; **its own mass does not enter**.\n" +
        "- **Apparent weight** in a liquid = true weight − buoyant force.\n" +
        "- A body **floats** when the buoyant force **equals** its weight. It sinks if its density is greater than the liquid's.\n" +
        "- **Fraction submerged** of a floating body = \\(\\dfrac{\\rho_{\\text{body}}}{\\rho_{\\text{liquid}}}\\). g cancels, so this fraction is the same on the Moon.\n" +
        "- For pieces with the **same apparent weight** in water, the less dense one loses a larger fraction of its weight, so it must be **heavier in air**.",
      formula: {
        label: "Buoyant force and flotation",
        latex: "F_b = \\rho_{\\text{liquid}}\\,V_{\\text{sub}}\\,g \\qquad W_{\\text{apparent}} = W - F_b \\qquad \\dfrac{V_{\\text{sub}}}{V} = \\dfrac{\\rho_{\\text{body}}}{\\rho_{\\text{liquid}}}",
        symbols: [
          { symbol: "F_b", meaning: "buoyant (upthrust) force" },
          { symbol: "V_sub", meaning: "volume of the body under the liquid" },
          { symbol: "W", meaning: "true weight of the body" },
        ],
      },
      authoredExample: {
        prompt: "A block of wood of density 600 kg/m³ floats in water (density 1000 kg/m³). What fraction of its volume is under water? Would the fraction change on the Moon?",
        steps: [
          "Floating: weight = buoyant force, so \\(\\rho_{\\text{body}}Vg = \\rho_{\\text{water}}V_{\\text{sub}}g\\).",
          "g cancels: \\(\\dfrac{V_{\\text{sub}}}{V} = \\dfrac{600}{1000} = 0.6\\).",
          "No g is left in the answer, so the fraction is the same on the Moon.",
        ],
        answer: "0.6 (three fifths) of the volume, on the earth and on the Moon.",
      },
      selfCheckExample: {
        prompt: "A stone weighs 50 N in air and 30 N when fully under water. Find its volume and its density. (Water density 1000 kg/m³, \\(g = 10\\) m/s².)",
        steps: [
          "Buoyant force = loss of weight = \\(50 - 30 = 20\\) N.",
          "\\(20 = 1000 \\times V \\times 10\\), so \\(V = 2 \\times 10^{-3}\\) m³.",
          "Mass \\(= 50 \\div 10 = 5\\) kg, so density \\(= 5 \\div (2 \\times 10^{-3}) = 2500\\) kg/m³.",
        ],
        answer: "Volume \\(2 \\times 10^{-3}\\) m³; density 2500 kg/m³.",
      },
      pyqExampleId: "72110c6c-ef3f-472f-9080-2f0345e44e91",
      practiceSet: [
        { prompt: "A block of density 800 kg/m³ floats in water. What fraction of it is under water?", answer: "Four fifths" },
        { prompt: "Will a body of density 1200 kg/m³ float or sink in water?", answer: "Sink, since it is denser than water" },
        { prompt: "State Archimedes' principle.", answer: "A body in a liquid feels an upward force equal to the weight of the liquid it displaces" },
        { prompt: "Ice has a density of about 920 kg/m³ and sea water about 1030 kg/m³. Roughly what fraction of an iceberg is under water?", answer: "About nine tenths (0.89)" },
      ],
      traps: [
        {
          title: "The body's own mass does not set the buoyant force",
          body: "The buoyant force depends only on the **volume under the liquid** and the **liquid's** density. A heavy and a light ball of the same volume, fully under water, feel the same upthrust.",
        },
        {
          title: "Floating means equal, not greater",
          body: "A floating body is in equilibrium, so the buoyant force **equals** its weight. If it were greater, the body would rise further out of the liquid until they matched.",
        },
        {
          title: "g cancels in floating",
          body: "Weaker gravity reduces the weight **and** the buoyant force by the same factor, so a floating body sits at the **same** depth on the Moon.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphfl-density",
      name: "Density of a mixture",
      intuition:
        "Density is mass per volume. When two liquids are mixed, add the masses and add the volumes, then divide; never just average the densities without thinking. Equal volumes make the plain average come out right. Equal masses do not, because the lighter liquid then takes up more of the volume.",
      definition:
        "Density and mixtures:\n" +
        "- **Density** \\(\\rho = m/V\\); 1 g/cm³ = 1000 kg/m³.\n" +
        "- Mixture density = **total mass ÷ total volume** (for liquids that do not change volume on mixing).\n" +
        "- **Equal volumes** of densities \\(\\rho_1\\) and \\(\\rho_2\\): \\(\\rho = \\dfrac{\\rho_1 + \\rho_2}{2}\\).\n" +
        "- **Equal masses**: \\(\\rho = \\dfrac{2\\rho_1\\rho_2}{\\rho_1 + \\rho_2}\\), which is smaller.",
      formula: {
        label: "Density of a mixture",
        latex: "\\rho = \\dfrac{m_1 + m_2}{V_1 + V_2} \\qquad \\rho_{\\text{equal volumes}} = \\dfrac{\\rho_1 + \\rho_2}{2} \\qquad \\rho_{\\text{equal masses}} = \\dfrac{2\\rho_1\\rho_2}{\\rho_1 + \\rho_2}",
        symbols: [
          { symbol: "ρ₁, ρ₂", meaning: "densities of the two liquids" },
          { symbol: "m, V", meaning: "mass and volume of each part" },
        ],
      },
      authoredExample: {
        prompt: "Equal masses of two liquids of densities 600 kg/m³ and 900 kg/m³ are mixed. Find the density of the mixture.",
        steps: [
          "Equal masses, so use \\(\\dfrac{2\\rho_1\\rho_2}{\\rho_1 + \\rho_2}\\).",
          "\\(\\dfrac{2 \\times 600 \\times 900}{600 + 900} = \\dfrac{1080000}{1500} = 720\\) kg/m³.",
        ],
        answer: "720 kg/m³ (not the plain average, 750).",
      },
      selfCheckExample: {
        prompt: "2 litres of a liquid of density 1.2 g/cm³ are mixed with 3 litres of a liquid of density 0.8 g/cm³. Find the density of the mixture.",
        steps: [
          "Masses: \\(2000 \\times 1.2 = 2400\\) g and \\(3000 \\times 0.8 = 2400\\) g, total 4800 g.",
          "Total volume: 5000 cm³. Density: \\(4800 \\div 5000 = 0.96\\) g/cm³.",
        ],
        answer: "0.96 g/cm³.",
      },
      pyqExampleId: "ea8ccea0-3e0c-4191-b604-ce2b0d9dbb79",
      practiceSet: [
        { prompt: "A body has a mass of 500 g and a volume of 250 cm³. What is its density?", answer: "2 g/cm³" },
        { prompt: "Express a density of 1 g/cm³ in kg/m³.", answer: "1000 kg/m³" },
        { prompt: "Equal masses of liquids of densities 2 g/cm³ and 3 g/cm³ are mixed. What is the density of the mixture?", answer: "2.4 g/cm³" },
        { prompt: "A 2 kg block has a volume of 0.004 m³. What is its density?", answer: "500 kg/m³" },
      ],
      traps: [
        {
          title: "Equal volumes average, equal masses do not",
          body: "With **equal volumes** the mixture density is the plain average. With **equal masses** it is \\(\\dfrac{2\\rho_1\\rho_2}{\\rho_1 + \\rho_2}\\), always a little smaller. Read which one the question fixes.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphfl-elasticity",
      name: "Hooke's law and springs",
      intuition:
        "Stretch a wire a little and it springs back: it is elastic. For small stretches the stretch grows in step with the pull, so the graph of stress against strain is a straight line. That straight part is where Hooke's law holds. Pull harder and the line bends; harder still and the wire stays stretched for good.",
      definition:
        "The stress-strain curve and springs:\n" +
        "- **Stress** = force ÷ area (in Pa); **strain** = change in length ÷ original length (no unit).\n" +
        "- **Hooke's law**: stress is proportional to strain. It holds **only up to the proportional limit**, the straight part of the curve.\n" +
        "- Between the proportional limit and the **elastic limit**, the material still returns to its shape, but stress and strain are no longer proportional.\n" +
        "- Beyond the elastic limit the material is **plastic**: it keeps a permanent stretch, and later breaks.\n" +
        "- For a spring, \\(F = kx\\). The **spring constant** \\(k\\) depends on the **thickness of the wire**, the **diameter of the coils** and the **material**: thicker wire, smaller coils and a stiffer material give a larger \\(k\\).",
      table: {
        columns: ["Part of the stress-strain curve", "What happens"],
        rows: [
          {
            cells: ["Up to the proportional limit", "Straight line; Hooke's law holds"],
            noteAmber: "CDS 2019 (I): Hooke's law is valid only in the proportional region of the stress-strain curve.",
            pyqExampleId: "17f9582c-d9d2-49bb-acf2-31df8bb61a47",
          },
          { cells: ["Proportional limit to elastic limit", "Returns to shape, but not in proportion"] },
          { cells: ["Beyond the elastic limit", "Permanent stretch (plastic), then fracture"] },
          {
            cells: ["Spring constant k", "Set by wire thickness, coil diameter and material"],
            noteAmber: "CDS 2016 (II): the spring constant depends on the thickness, the diameter and the material.",
            pyqExampleId: "9f816987-3e04-4836-9de9-ae8b94c60c45",
          },
        ],
      },
      pyqExampleId: "17f9582c-d9d2-49bb-acf2-31df8bb61a47",
      selfCheckExample: {
        prompt: "A spring stretches by 2 cm under a load of 10 N. How far does it stretch under 25 N, if it stays within Hooke's law?",
        steps: [
          "Within Hooke's law, the stretch is proportional to the force: \\(k = 10 \\div 2 = 5\\) N per cm.",
          "\\(x = 25 \\div 5 = 5\\) cm.",
        ],
        answer: "5 cm.",
      },
      practiceSet: [
        { prompt: "What is the unit of strain?", answer: "It has no unit (it is a ratio of two lengths)" },
        { prompt: "What happens to a wire stretched beyond its elastic limit?", answer: "It keeps a permanent stretch and does not return to its length" },
        { prompt: "Two springs are made of the same material with the same coil size. One has a thicker wire. Which is stiffer?", answer: "The one with the thicker wire" },
        { prompt: "What is the unit of stress?", answer: "The pascal (N/m²)" },
      ],
      traps: [
        {
          title: "Proportional limit comes before elastic limit",
          body: "Hooke's law holds only on the **straight part** of the curve. A material can still be elastic a little beyond that, but there stress is no longer proportional to strain, so 'the entire elastic region' is too much.",
        },
        {
          title: "No single factor fixes the spring constant",
          body: "A spring's stiffness depends on the **wire thickness**, the **coil diameter** and the **material** together. An option naming only the length, or only the material, is incomplete.",
        },
      ],
    },
  ],
};
