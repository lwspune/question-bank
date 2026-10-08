import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_FLU_BUOYANCY_NOTE: SubtopicNote = {
  subtopicName: "Buoyancy and Flotation",
  title: "Upthrust, Floating and Sinking",
  oneLineDefinition:
    "A fluid pushes up on anything in it with a force equal to the weight of fluid pushed aside; comparing densities tells you whether it floats.",
  whyItMatters:
    "Four of the eight past questions in this chapter are about upthrust: its size on a submerged object, an object resting on the bottom, and a sphere that rises when the liquid around it cools.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-flu-archimedes",
      name: "Archimedes' principle: the size of the upthrust",
      intuition:
        "Before the object went in, the water in its place was held up perfectly by the water around it. Put the object there and the surrounding water pushes on it in exactly the same way. So the upward push equals the weight of the water the object has replaced, and it depends on the liquid's density, not the object's.",
      definition:
        "**Archimedes' principle**: a body wholly or partly in a fluid feels an upward force, the **upthrust** (buoyant force), equal to the weight of the fluid it displaces.\n" +
        "- Use the density of the **fluid** and the volume **below the surface**, never the object's density.\n" +
        "- Once a body is fully submerged in a liquid, going deeper does not change the upthrust.\n" +
        "- The **apparent weight** in the fluid is the true weight minus the upthrust.",
      formula: {
        label: "Upthrust",
        latex: "F_B = \\rho_{\\text{fluid}}\\, V_{\\text{sub}}\\, g",
        symbols: [
          { symbol: "\\(\\rho_{\\text{fluid}}\\)", meaning: "density of the fluid, in kg/m³" },
          { symbol: "\\(V_{\\text{sub}}\\)", meaning: "volume of the body below the surface, in m³" },
          { symbol: "\\(g\\)", meaning: "gravitational field strength, in N/kg" },
        ],
      },
      authoredExample: {
        prompt:
          "A metal block of volume 300 cm³ and mass 2.0 kg hangs from a spring balance, fully under brine of density 1.10 g/cm³. Taking \\(g = 10\\ \\text{N/kg}\\), find the upthrust and the balance reading.",
        steps: [
          "Mass of brine displaced: \\(1.10 \\times 300 = 330\\ \\text{g} = 0.330\\ \\text{kg}\\).",
          "Upthrust: \\(0.330 \\times 10 = 3.3\\ \\text{N}\\).",
          "True weight: \\(2.0 \\times 10 = 20\\ \\text{N}\\), so the balance reads \\(20 - 3.3 = 16.7\\ \\text{N}\\).",
        ],
        answer: "Upthrust 3.3 N; reading 16.7 N",
      },
      selfCheckExample: {
        prompt:
          "A sealed container of volume 0.020 m³ and mass 5.0 kg is held completely under water of density 1000 kg/m³. Taking \\(g = 10\\ \\text{N/kg}\\), what downward force is needed to hold it there?",
        options: ["200 N", "50 N", "250 N", "15 N", "150 N"],
        steps: [
          "Upthrust: \\(1000 \\times 0.020 \\times 10 = 200\\ \\text{N}\\).",
          "Weight: \\(5.0 \\times 10 = 50\\ \\text{N}\\).",
          "The holding force makes up the difference: \\(200 - 50 = 150\\ \\text{N}\\) downwards.",
        ],
        answer: "(E) 150 N",
      },
      practiceSet: [
        { prompt: "What is the upthrust on a 50 cm³ stone fully under water? Take \\(g = 10\\ \\text{N/kg}\\).", answer: "0.50 N", method: "50 g of water displaced weighs 0.50 N" },
        { prompt: "An object weighs 12 N in air and 9.0 N fully under water. What is the upthrust on it?", answer: "3.0 N", method: "Loss of apparent weight" },
        { prompt: "A fully submerged stone is lowered from 1 m to 3 m below the surface of a lake. What happens to the upthrust?", answer: "It stays the same", method: "Same displaced volume, same liquid" },
      ],
      traps: [
        {
          title: "The upthrust uses the liquid's density",
          body: "The upthrust on a fully submerged body is \\(\\rho_{\\text{fluid}} V g\\). Writing the object's own density there gives its weight, not the upthrust. An option of the form \\((\\rho_{\\text{fluid}} - \\rho_{\\text{object}}) V g\\) is the net force, not the upthrust.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-flu-floating",
      name: "Floating and sinking by comparing densities",
      intuition:
        "Push a fully submerged object down and let go. If it is less dense than the liquid, the upthrust beats its weight and it rises until just enough is under the surface for the two to balance. If it is denser, it sinks, and the bottom of the container takes the rest of its weight. Since a liquid's density changes with temperature, the same object can float in cold liquid and sink in warm.",
      definition:
        "Comparing the average density of an object with the density of the liquid:\n" +
        "- \\(\\rho_{\\text{object}} < \\rho_{\\text{liquid}}\\): it **floats**, partly submerged, with upthrust = weight.\n" +
        "- \\(\\rho_{\\text{object}} = \\rho_{\\text{liquid}}\\): it stays wherever it is put inside the liquid (it **just floats**).\n" +
        "- \\(\\rho_{\\text{object}} > \\rho_{\\text{liquid}}\\): it **sinks**. Resting on the bottom, it still feels the upthrust, and the bottom pushes up with \\(W - F_B\\).\n" +
        "- When floating, the **fraction submerged** equals \\(\\rho_{\\text{object}} / \\rho_{\\text{liquid}}\\).\n" +
        "- Most liquids get **denser as they cool**, so a sphere that sank in the warm liquid can rise when it cools (the Galileo thermometer).",
      formula: {
        label: "Fraction submerged when floating",
        latex: "\\frac{V_{\\text{sub}}}{V} = \\frac{\\rho_{\\text{object}}}{\\rho_{\\text{liquid}}}",
        symbols: [
          { symbol: "\\(V_{\\text{sub}}\\)", meaning: "volume below the surface" },
          { symbol: "\\(V\\)", meaning: "total volume of the object" },
        ],
      },
      authoredExample: {
        prompt:
          "Ice has a density of 920 kg/m³ and sea water 1025 kg/m³. What fraction of a floating iceberg is below the surface? What fraction would be below the surface in fresh water of density 1000 kg/m³?",
        steps: [
          "Floating, so the fraction submerged is the density ratio.",
          "Sea water: \\(920 / 1025 \\approx 0.90\\), so about 90% is below the surface.",
          "Fresh water: \\(920 / 1000 = 0.92\\), so 92%: a less dense liquid needs more volume displaced to give the same upthrust.",
        ],
        answer: "About 90% in sea water; 92% in fresh water",
      },
      selfCheckExample: {
        prompt:
          "A wooden block floats in water (1000 kg/m³) with 70% of its volume submerged. It is moved to oil of density 875 kg/m³. What fraction of its volume is now submerged?",
        options: ["61%", "70%", "80%", "87.5%", "None: it sinks"],
        steps: [
          "From the water: \\(\\rho_{\\text{block}} = 0.70 \\times 1000 = 700\\ \\text{kg/m}^3\\).",
          "700 is less than 875, so it still floats.",
          "In oil: \\(700 / 875 = 0.80\\), so 80% is submerged. Option A multiplies by the oil's density ratio instead of dividing.",
        ],
        answer: "(C) 80%",
      },
      practiceSet: [
        { prompt: "An object floats in water with three quarters of its volume submerged. What is its density?", answer: "750 kg/m³", method: "Fraction submerged times 1000" },
        { prompt: "Will a solid of density 1200 kg/m³ float or sink in water?", answer: "Sink", method: "Its density is greater than 1000 kg/m³" },
        { prompt: "A 0.50 kg object of volume 100 cm³ rests on the bottom of a tank of water. With \\(g = 10\\ \\text{N/kg}\\), how hard does the bottom push up on it?", answer: "4.0 N", method: "Weight 5.0 N minus upthrust 1.0 N" },
      ],
      traps: [
        {
          title: "A sunken object still feels upthrust",
          body: "An object lying on the bottom is still surrounded by liquid, so the upthrust still acts on it. The bottom pushes up only with the weight minus the upthrust. Answering with the full weight leaves the upthrust out.",
        },
        {
          title: "For a floating object, the upthrust equals the weight in every liquid",
          body: "Move a floating block from water to oil and the upthrust does not change; it still equals the weight. What changes is how much of the block is under the surface. Options saying the upthrust is smaller in the less dense liquid are wrong while the block still floats.",
        },
      ],
    },
  ],
};
