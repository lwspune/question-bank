import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_PB_BUOYANCY_NOTE: SubtopicNote = {
  subtopicName: "Buoyant Force and Floating",
  title: "Buoyant Force and Floating",
  oneLineDefinition:
    "A liquid pushes up on anything in it with a buoyant force equal to the weight of liquid pushed aside, F = Vρg; a body floats when this upthrust balances its weight.",
  whyItMatters:
    "Six questions in the bank, one EASY, four MODERATE and one HARD. Three ask what the buoyant force, or the loss of weight in a liquid, depends on. Three are about floating: why we float easily in the Dead Sea, where Plimsoll lines are painted, and the force on the base of a vessel holding a floating, hanging or sunken object.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9pbbu-upthrust",
      name: "Buoyant force and Archimedes' principle",
      intuition:
        "A bucket of water feels light while it is still under the water in a well and heavy once it comes out. The water was pushing up on it. This upward push is the buoyant force. It comes from the water the bucket pushes aside: the more water a body pushes aside, the bigger the push.",
      definition:
        "- A liquid (or gas) pushes **upwards** on a body placed in it. This force is the **buoyant force** or **upthrust**.\n" +
        "- **Archimedes' principle**: the buoyant force on a body wholly or partly immersed in a fluid equals the **weight of the fluid it displaces**.\n" +
        "- So \\(F = V\\rho g\\), where V is the volume of the body that is under the liquid and ρ is the density of the **liquid**.\n" +
        "- The body seems to **lose weight** in the liquid. The loss of weight equals the buoyant force.\n" +
        "- It depends on the **immersed volume**, the **density of the liquid** and **g**. It does **not** depend on the body's own mass or density, on the amount of liquid in the vessel, or on how deep a fully immersed body is.",
      formula: {
        label: "Buoyant force",
        latex: "F = V\\rho g \\qquad \\text{apparent weight} = W - F",
        symbols: [
          { symbol: "F", meaning: "buoyant force (upthrust), in newtons" },
          { symbol: "V", meaning: "volume of the body under the liquid, in m³" },
          { symbol: "ρ", meaning: "density of the liquid, in kg/m³" },
          { symbol: "g", meaning: "acceleration due to gravity, in m/s²" },
          { symbol: "W", meaning: "weight of the body in air, in newtons" },
        ],
      },
      authoredExample: {
        prompt: "A stone of volume 200 cm³ weighs 5 N in air. Find the buoyant force on it when it is fully under water, and its weight in water. Take the density of water as 1000 kg/m³ and g as 10 m/s².",
        steps: [
          "Volume: \\(200\\) cm³ \\(= 200 \\times 10^{-6} = 2 \\times 10^{-4}\\) m³.",
          "Buoyant force: \\(F = V\\rho g = 2 \\times 10^{-4} \\times 1000 \\times 10 = 2\\) N.",
          "Weight in water: \\(5 - 2 = 3\\) N.",
        ],
        answer: "Buoyant force 2 N; the stone weighs 3 N in water",
      },
      selfCheckExample: {
        prompt: "A copper ball and a glass ball have the same volume and are both held fully under water. Which one feels the larger buoyant force?",
        steps: ["The buoyant force depends on the volume of water pushed aside, not on what the body is made of.", "Equal volumes push aside equal water."],
        answer: "Neither: the buoyant forces are equal",
      },
      practiceSet: [
        { prompt: "State Archimedes' principle.", answer: "A body wholly or partly immersed in a fluid feels an upward force equal to the weight of the fluid it displaces" },
        { prompt: "A body loses 4 N of weight when it is fully immersed in water. What is the weight of the water it displaces?", answer: "4 N" },
        { prompt: "A stone fully under water sinks from a depth of 1 m to a depth of 3 m. Does the buoyant force on it change?", answer: "No: its volume and the liquid are the same, so the buoyant force is the same" },
        { prompt: "A body of volume 0.001 m³ is fully immersed in oil of density 800 kg/m³. Find the buoyant force, taking g as 10 m/s².", answer: "\\(0.001 \\times 800 \\times 10 = 8\\) N" },
      ],
      pyqExampleId: "68e0942a-7a9a-41e7-be19-0d70e3c29251",
      traps: [
        {
          title: "Making the buoyant force depend on the body's mass",
          body: "The upthrust is the weight of liquid pushed aside, so it depends on the body's volume, not its mass. A heavy and a light ball of the same size feel the same upthrust.",
        },
        {
          title: "Using the body's density in F = Vρg",
          body: "The ρ in the formula is the density of the liquid. The body's own density decides only whether it floats or sinks.",
        },
        {
          title: "Thinking more liquid in the vessel gives more upthrust",
          body: "The amount of liquid in the vessel and the depth of a fully immersed body make no difference. Only the immersed volume, the liquid's density and g matter.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9pbbu-floating",
      name: "Floating, sinking and Plimsoll lines",
      intuition:
        "Two forces act on a body in water: its weight pulls it down and the upthrust pushes it up. If the weight wins, it sinks. A floating body sinks only until it has pushed aside water equal to its own weight; then the two forces balance and it stays. In very salty water each litre pushed aside weighs more, so you need to sink less to balance your weight.",
      definition:
        "- **Sinks**: weight greater than the upthrust, or the body is **denser** than the liquid.\n" +
        "- **Floats**: the upthrust **balances** the weight. A floating body displaces liquid equal to its **own weight**.\n" +
        "- A body as dense as the liquid stays **fully under at any depth**, neither rising nor sinking.\n" +
        "- A **denser liquid** gives more upthrust for the same volume. That is why we float easily in the very salty **Dead Sea**, and why a ship rides **higher** in sea water than in river water.\n" +
        "- **Plimsoll lines** (load lines) are marks painted on the **hull of a ship**. They show how deep the ship may safely sit when loaded, in waters of different density.\n" +
        "- Whether a body floats, stays under the surface by itself or rests on the bottom, the **base of the vessel** finally carries the weight of the water **and** of the body.",
      table: {
        columns: ["Body compared with the liquid", "What happens", "Example"],
        rows: [
          { cells: ["Less dense", "Floats, with part of it above the surface", "Wood or ice in water"] },
          { cells: ["Equally dense", "Stays fully under at whatever depth it is left", "An egg in water with just enough salt dissolved in it"] },
          { cells: ["Denser", "Sinks to the bottom", "A stone or an iron nail in water"] },
          { cells: ["Same body, denser liquid", "Floats higher, more of it above the surface", "A person in the Dead Sea; a ship in sea water"] },
        ],
        caption: "An iron ship floats because its hollow shape pushes aside a large volume of water, whose weight equals the ship's weight.",
      },
      selfCheckExample: {
        prompt: "A solid of density 800 kg/m³ is dropped into water (density 1000 kg/m³) and into an oil of density 700 kg/m³. Where does it float and where does it sink?",
        steps: ["In water the solid is less dense than the liquid, so it floats.", "In the oil the solid is denser than the liquid, so it sinks."],
        answer: "It floats in water and sinks in the oil",
      },
      practiceSet: [
        { prompt: "Where on a ship are Plimsoll lines painted?", answer: "On the outside of its hull" },
        { prompt: "Why does an iron nail sink while an iron ship floats?", answer: "The hollow ship pushes aside water equal to its own weight; the small solid nail cannot push aside enough water" },
        { prompt: "Why is it easier to float in sea water than in river water?", answer: "Sea water is denser, so the same volume pushed aside gives more upthrust" },
        { prompt: "A wooden block floats on water and weighs 12 N. What is the weight of the water it displaces?", answer: "12 N, equal to its own weight" },
      ],
      pyqExampleId: "0396bc43-a97d-46ee-8433-d0794e128709",
      traps: [
        {
          title: "Thinking a floating body weighs more than the water it displaces",
          body: "A floating body displaces exactly its own weight of liquid. If it weighed more than the water it could push aside, it would sink.",
        },
        {
          title: "Thinking a ship sinks deeper in sea water",
          body: "Sea water is denser than river water, so a ship needs to push aside less of it. It rides higher in the sea, which is why Plimsoll lines differ for each kind of water.",
        },
        {
          title: "Thinking a floating body takes its weight off the vessel",
          body: "The floating body's weight is passed to the water, and the water passes it to the base. Bodies of the same mass that float, stay under the surface by themselves, or rest on the bottom all add the same force on the base.",
        },
      ],
    },
  ],
};
