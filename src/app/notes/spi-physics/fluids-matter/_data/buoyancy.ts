import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_FL_BUOYANCY_NOTE: SubtopicNote = {
  subtopicName: "Density, Buoyancy and Flotation",
  title: "Density, Buoyancy and Flotation",
  oneLineDefinition:
    "A liquid pushes up on anything dipped in it with a force equal to the weight of the liquid pushed aside, and a body floats when that push can match its whole weight.",
  whyItMatters:
    "Four questions in the bank, one EASY, two MODERATE and one HARD (from the 2022 paper): the relative density of copper, a body weighed in air and in water on two balances, a cylinder lifted out of a liquid, and the luggage a wooden raft can carry. Each is one idea from Archimedes, applied in kilograms or newtons.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiflbu-density",
      name: "Density and relative density",
      intuition:
        "A kilogram of cotton and a kilogram of iron weigh the same, but the iron takes far less room. Density says how much mass is packed into each unit of volume, and relative density compares that with water.",
      definition:
        "- **Density** \\(=\\) mass \\(\\div\\) volume. Its SI unit is kg/m³; water's density is \\(1000\\ \\text{kg/m}^3\\) (1 g/cm³).\n" +
        "- **Relative density** \\(=\\) density of the substance \\(\\div\\) density of water.\n" +
        "- Relative density is a ratio of two densities, so it has **no unit**. It equals the density in g/cm³ as a plain number.\n" +
        "- A body with relative density **less than 1** floats in water; **more than 1**, it sinks.",
      formula: {
        label: "Density and relative density",
        latex: "\\rho = \\frac{m}{V} \\qquad \\text{relative density} = \\frac{\\rho_{\\text{substance}}}{\\rho_{\\text{water}}}",
      },
      authoredExample: {
        prompt: "A metal block has a mass of 540 g and a volume of 200 cm³. Find its density and its relative density.",
        steps: [
          "Density \\(= \\frac{540}{200} = 2.7\\) g/cm³, which is \\(2700\\ \\text{kg/m}^3\\).",
          "Relative density \\(= \\frac{2700}{1000} = 2.7\\), with no unit.",
        ],
        answer: "\\(2700\\ \\text{kg/m}^3\\) and 2.7",
      },
      selfCheckExample: {
        prompt: "A liquid has a density of \\(1200\\ \\text{kg/m}^3\\). Find its relative density.",
        steps: ["\\(\\frac{1200}{1000} = 1.2\\)."],
        answer: "1.2",
      },
      practiceSet: [
        { prompt: "Gold has a relative density of 19.3. What is its density in kg/m³?", answer: "\\(19.3 \\times 1000 = 19300\\ \\text{kg/m}^3\\)" },
        { prompt: "What is the unit of relative density?", answer: "It has no unit." },
        { prompt: "A wooden block has a relative density of 0.7. Does it float or sink in water?", answer: "It floats (relative density less than 1)." },
      ],
      pyqExampleId: "9c8880ef-378f-4bc7-ad87-f6565d99d4dc",
      traps: [
        {
          title: "Giving relative density a unit",
          body: "Relative density divides one density by another, so the units cancel. Writing kg/m³ after it is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiflbu-buoyant",
      name: "Buoyant force and the loss of weight in a liquid",
      intuition:
        "Lift a friend in a swimming pool and she feels light. The water is pushing up on her. That upward push is the buoyant force, and Archimedes found exactly how big it is.",
      definition:
        "- **Archimedes' principle:** a body wholly or partly in a liquid feels an upward force, the **buoyant force**, equal to the **weight of the liquid it displaces**.\n" +
        "- So the body seems lighter: **apparent weight** \\(=\\) true weight \\(-\\) buoyant force.\n" +
        "- The more of the body is under the liquid, the more liquid it displaces and the larger the buoyant force. As a body is lifted out, it feels heavier and heavier, until it is fully out and weighs its full weight.\n" +
        "- The liquid pushes up on the body, and the body pushes **down** on the liquid with an equal force (Newton's third law). So a vessel of water on a balance reads **more** by exactly the weight the body seems to lose.",
      formula: {
        label: "Archimedes' principle",
        latex:
          "F_B = \\text{weight of liquid displaced} = V \\rho_{\\text{liquid}} g \\qquad \\text{apparent weight} = W - F_B",
      },
      authoredExample: {
        prompt: "A metal piece weighs 12 N in air and has a volume of 0.0005 m³. Find its weight when it is fully under water. Take \\(\\rho = 1000\\ \\text{kg/m}^3\\) and \\(g = 10\\ \\text{m/s}^2\\).",
        steps: [
          "Buoyant force \\(= V\\rho g = 0.0005 \\times 1000 \\times 10 = 5\\) N.",
          "Apparent weight \\(= 12 - 5 = 7\\) N.",
        ],
        answer: "7 N",
      },
      selfCheckExample: {
        prompt: "A stone weighs 5 N in air and 3 N when fully under water. Find the buoyant force on it and the weight of water it displaces.",
        steps: ["Buoyant force \\(= 5 - 3 = 2\\) N.", "By Archimedes' principle, the water displaced also weighs 2 N."],
        answer: "2 N and 2 N",
      },
      practiceSet: [
        { prompt: "What is the buoyant force on a body equal to, by Archimedes' principle?", answer: "The weight of the liquid it displaces" },
        { prompt: "A bucket of water is pulled up through the water of a well. Does it feel heavier or lighter once it leaves the water?", answer: "Heavier: there is no buoyant force once it is out." },
        { prompt: "A beaker of water on a balance reads 2 kg. A stone hung on a thread is lowered fully into the water without touching the bottom, and it seems to lose 0.3 kg. What does the balance under the beaker read now?", answer: "\\(2 + 0.3 = 2.3\\) kg" },
      ],
      pyqExampleId: "2462c8a7-431e-4aad-b0c4-d6551eee2959",
      traps: [
        {
          title: "Forgetting the push back on the water",
          body:
            "When a hanging body is dipped in water, the water's balance reading goes UP by the weight the body loses. The total held by the two balances does not change.",
        },
        {
          title: "Thinking the buoyant force depends on the body's weight",
          body:
            "The buoyant force depends on the volume under the liquid and the liquid's density, not on how heavy the body is. Two bodies of the same volume, fully under water, get the same push.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiflbu-float",
      name: "Floating and the extra load a floating body can carry",
      intuition:
        "A raft can keep taking load until it is pushed right down to the water line. At that moment the water it displaces is as much as it can ever displace, and that sets the most it can hold up.",
      definition:
        "- A body **floats** when the buoyant force equals its weight, that is, when it displaces its own weight of liquid.\n" +
        "- For a floating body, the **fraction under the liquid** equals its density divided by the liquid's density. Ice, of density about 900 kg/m³, floats with nine tenths under water.\n" +
        "- The **most** a body can hold up is the weight of liquid equal to its whole volume. Mass of water it can displace \\(=\\) volume \\(\\times\\) 1000 kg/m³.\n" +
        "- So the **extra load** it can carry \\(=\\) (mass of water equal to its volume) \\(-\\) (its own mass). Subtract every load already on it to find what is left.\n" +
        "- An iron ship floats though iron is denser than water: its hollow shape displaces much more water than a solid lump of the same iron.",
      formula: {
        label: "Flotation",
        latex:
          "V = \\frac{m}{\\rho} \\qquad \\text{greatest load (in kg)} = V \\times 1000 - m \\qquad \\frac{\\text{volume under water}}{\\text{total volume}} = \\frac{\\rho_{\\text{body}}}{\\rho_{\\text{water}}}",
      },
      authoredExample: {
        prompt: "A wooden block of mass 30 kg has a density of 500 kg/m³. What is the greatest extra mass it can hold up in water without sinking?",
        steps: [
          "Volume \\(= \\frac{30}{500} = 0.06\\ \\text{m}^3\\).",
          "Fully under water it displaces \\(0.06 \\times 1000 = 60\\) kg of water.",
          "Extra load \\(= 60 - 30 = 30\\) kg.",
        ],
        answer: "30 kg",
      },
      selfCheckExample: {
        prompt: "A log of mass 80 kg and density 800 kg/m³ floats in water. What is the most extra load it can carry before it sinks?",
        steps: [
          "Volume \\(= \\frac{80}{800} = 0.1\\ \\text{m}^3\\), so it can displace at most 100 kg of water.",
          "Extra load \\(= 100 - 80 = 20\\) kg.",
        ],
        answer: "20 kg",
      },
      practiceSet: [
        { prompt: "What fraction of a block of density 750 kg/m³ is under water when it floats?", answer: "\\(\\frac{750}{1000} = \\frac{3}{4}\\)" },
        { prompt: "A boat of mass 200 kg can displace at most 500 kg of water. What is the greatest load it can carry?", answer: "300 kg" },
        { prompt: "Why does an iron ship float when an iron nail sinks?", answer: "The ship's hollow shape displaces more water than its own weight; the solid nail cannot." },
      ],
      pyqExampleId: "de9c8a65-523b-49a3-be09-60cbf0092756",
      traps: [
        {
          title: "Stopping at the total load",
          body:
            "The greatest load a raft can hold includes the people on it. If a person is already aboard, take his mass away too before giving the luggage he can bring.",
        },
        {
          title: "Using the body's density for the water",
          body:
            "The water displaced is the body's volume times the density of WATER, 1000 kg/m³. Multiplying the volume by the body's own density only gives its own mass back.",
        },
      ],
    },
  ],
};
