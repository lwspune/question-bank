import type { SubtopicNote } from "@/app/notes/_types";

export const CELL_OSMOSIS_TONICITY_NOTE: SubtopicNote = {
  subtopicName: "Osmosis and Tonicity",
  title: "Osmosis and Tonicity — Water Across the Membrane",
  oneLineDefinition:
    "Osmosis is the net movement of water across a selectively permeable membrane from a dilute (high-water) solution to a concentrated (low-water) one; tonicity decides whether a cell swells, shrinks or bursts.",
  whyItMatters:
    "A 4-PYQ cluster — the only part of the chapter that asks you to REASON about a process, not just recall a name (including the chapter's one HARD question). " +
    "The key skills: define osmosis precisely (dilute → concentrated, through a semi-permeable membrane), and predict the outcome — plasmolysis in a hypertonic plant cell, water loss / haemolysis in animal cells. " +
    "EASY to HARD.",
  concepts: [
    // foundation — osmosis direction (formula, no PYQ)
    {
      kind: "formula" as const,
      slug: "cell-osmosis-direction",
      name: "Osmosis — the direction water moves",
      intuition:
        "Water always moves to even out concentration. Across a membrane that lets water through but not solute, water flows from the side with MORE water (dilute) to the side with LESS water (concentrated). Thinking in 'water concentration' avoids every tonicity trap.",
      definition:
        "**Osmosis** is the net movement of **water** across a **selectively (semi-) permeable membrane**, from a region of **higher water concentration** (dilute / lower solute) to **lower water concentration** (concentrated / higher solute).\n" +
        "- It is a special case of diffusion — but of water, through a membrane.\n" +
        "- 'Lower concentration of water' outside = the surrounding solution is **hypertonic** (more solute) → water leaves the cell.\n" +
        "- 'Higher concentration of water' outside = the solution is **hypotonic** → water enters the cell.",
      formula: {
        label: "Osmosis — direction of water flow",
        latex: "\\text{water: high water conc.} \\;\\longrightarrow\\; \\text{low water conc. (across a semi-permeable membrane)}",
      },
      authoredExample: {
        prompt:
          "A cell's interior has a higher water concentration than the fluid surrounding it. Which way does water move, and what happens to the cell?",
        steps: [
          "Water moves from high water concentration to low water concentration.",
          "Inside is high-water, outside is low-water, so water flows OUT of the cell.",
          "Losing water, the cell shrinks (and in an animal cell may crenate).",
        ],
        answer: "Water moves out of the cell; the cell loses water and shrinks.",
      },
      practiceSet: [
        { prompt: "Across a membrane, water moves from a ___ solution to a ___ solution.", answer: "Dilute to concentrated", method: "high water conc. to low water conc." },
        { prompt: "If the medium has a LOWER water concentration than the cell, water moves ___.", answer: "Out of the cell" },
        { prompt: "Osmosis requires which kind of membrane?", answer: "A selectively (semi-) permeable membrane" },
      ],
    },

    // defining osmosis (PYQ 613154ca, and 7da584f6 outcome)
    {
      kind: "reference" as const,
      slug: "cell-osmosis-definition",
      name: "Naming the water-movement processes",
      intuition:
        "The bank often gives a one-line description and asks you to name the process. The trick is the membrane: water moving across a semi-permeable membrane to a concentrated solution is OSMOSIS specifically, not plain diffusion.",
      definition:
        "Process names you must distinguish:\n" +
        "- **Osmosis** — net water movement across a semi-permeable membrane, dilute → concentrated.\n" +
        "- **Diffusion** — movement of any particles from high to low concentration (no membrane required).\n" +
        "- **Absorption / dispersion** — distractor terms, not the membrane-water process.\n" +
        "- When a cell is in a medium with LOWER water concentration (hypertonic), water leaves and the cell loses water.",
      table: {
        columns: ["Description", "Process"],
        rows: [
          {
            cells: ["Water moves dilute → concentrated through a semi-permeable membrane", "**Osmosis**"],
            noteAmber: "Membrane + water = osmosis, not plain diffusion.",
          },
          { cells: ["Particles spread from high to low concentration (no membrane)", "Diffusion"] },
          { cells: ["Animal cell in lower-water (hypertonic) medium", "Cell loses water"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "What is the name for the net movement of water from a dilute to a concentrated solution through a selectively permeable membrane?",
        steps: [
          "Movement of particles high → low without a membrane would be diffusion.",
          "But here it is WATER, across a selectively permeable membrane, dilute → concentrated.",
          "That specific process is osmosis.",
        ],
        answer: "Osmosis.",
      },
      practiceSet: [
        { prompt: "Name the net movement of water across a semi-permeable membrane.", answer: "Osmosis" },
        { prompt: "An animal cell sits in a medium with lower water concentration. What happens?", answer: "The cell loses water" },
        { prompt: "Is osmosis the movement of water or of solute?", answer: "Water" },
      ],
      pyqExampleId: "613154ca-c798-460e-94be-31735cacfae4",
      traps: [
        {
          title: "Osmosis vs diffusion — the membrane is the tell",
          body:
            "Diffusion needs no membrane and can be any particle; osmosis is specifically WATER across a selectively permeable membrane. If a semi-permeable membrane is mentioned, the answer is osmosis.",
        },
      ],
    },

    // outcomes: plasmolysis + haemolysis (PYQs 4beab92c, 116f1f51) — also tag 7da584f6 here
    {
      kind: "reference" as const,
      slug: "cell-tonicity-outcomes",
      name: "Tonicity outcomes — plasmolysis and haemolysis",
      intuition:
        "Put a cell in the wrong solution and it changes. In a hypertonic solution water leaves, so a plant cell's membrane pulls away from the wall (plasmolysis). In a hypotonic solution — or one that wrecks the membrane — water rushes in and an animal cell swells and bursts (haemolysis).",
      definition:
        "What happens to a cell by surrounding solution:\n" +
        "- **Hypertonic** (more solute outside) — water leaves; an animal cell shrinks, a **plant** cell undergoes **plasmolysis** (membrane pulls away from the wall).\n" +
        "- **Hypotonic** (more water outside) — water enters; the cell swells. An **animal** cell (no wall) can **swell and burst**; a **plant** cell becomes turgid (wall stops bursting).\n" +
        "- A **detergent solution** dissolves the RBC's lipid membrane, so the cell takes in water and **swells and bursts** (haemolysis).",
      visualizationSlug: "cell-osmosis-tonicity",
      table: {
        columns: ["Surrounding solution", "Plant cell", "Animal cell"],
        rows: [
          {
            cells: ["Hypertonic (water leaves)", "**Plasmolysis** (membrane shrinks from wall)", "Shrinks / crenates"],
            noteAmber: "Epidermal leaf peel in a hypertonic solution → plasmolysis.",
          },
          {
            cells: ["Hypotonic (water enters)", "Becomes turgid (wall holds)", "Swells and may **burst** (haemolysis)"],
            noteAmber: "RBC in 2% detergent → membrane disrupted → swells and bursts.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "A student soaks an epidermal leaf peel in a hypertonic solution and views it under a microscope. What does she see?",
        steps: [
          "A hypertonic solution has more solute (less water) than the cell.",
          "Water leaves the plant cells by osmosis.",
          "The cell membrane shrinks away from the rigid cell wall — this is plasmolysis.",
        ],
        answer: "The cells are plasmolysed.",
      },
      practiceSet: [
        { prompt: "A plant cell in a hypertonic solution undergoes ___.", answer: "Plasmolysis", method: "membrane pulls away from the wall" },
        { prompt: "What happens to RBCs placed in a 2% detergent solution?", answer: "They swell and burst", method: "the detergent dissolves the lipid membrane" },
        { prompt: "What is bursting of red blood cells called?", answer: "Haemolysis" },
        { prompt: "In a hypotonic solution, does a cell gain or lose water?", answer: "Gain water" },
      ],
      pyqExampleId: "4beab92c-d74c-4ab1-bef7-c051a709c882",
      traps: [
        {
          title: "Plasmolysis is a PLANT-cell word",
          body:
            "Plasmolysis = the membrane shrinking away from the cell WALL, so it applies to walled (plant) cells in a hypertonic solution. An animal cell, with no wall, simply shrinks (crenates) or in extreme cases the opposite — bursts in hypotonic solution (haemolysis).",
        },
        {
          title: "Detergent bursts the RBC — it doesn't shrink it",
          body:
            "A 2% detergent solution dissolves the RBC's lipid bilayer, so water floods in and the cell SWELLS and BURSTS. The trap answer 'the RBC will shrink' describes a hypertonic salt solution, not a detergent.",
        },
      ],
    },
  ],
};
