import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_CSM_TRANSPORT_NOTE: SubtopicNote = {
  subtopicName: "Transport Across Membranes",
  title: "Diffusion, Osmosis and Active Transport",
  oneLineDefinition:
    "Substances cross membranes down their gradient for free, through the bilayer or through proteins, or against it using carrier pumps and ATP.",
  whyItMatters:
    "The 2024 and 2026 ministry papers asked what carrier proteins and channel proteins do. The older papers asked which mechanisms need both a protein and ATP, and gave concentration data to judge which way each substance moves.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-csm-diffusion",
      name: "Simple and facilitated diffusion: channels and carriers",
      intuition:
        "Molecules move about at random all the time. Where there are more of them, more wander away than wander in, so there is a net drift from high concentration to low until the two sides are equal. No energy from the cell is needed. Small non-polar molecules slip straight through the bilayer; ions and polar molecules need a protein doorway.",
      definition:
        "**Diffusion** is the net movement of particles from a region of higher concentration to one of lower concentration, down a **concentration gradient**. It is **passive**: no ATP.\n" +
        "- **Simple diffusion**: straight through the bilayer. Small non-polar molecules: \\(\\mathrm{O_2}\\), \\(\\mathrm{CO_2}\\), steroids, fat-soluble vitamins.\n" +
        "- **Facilitated diffusion**: through a membrane protein, still down the gradient. **Channel proteins** form water-filled pores that let specific ions or water (aquaporins) through; many can open and close (gated). **Carrier proteins** bind a specific molecule, such as glucose, and change shape to release it on the other side.\n" +
        "- Carriers can be **saturated**: when all are busy, a higher concentration no longer speeds things up.\n" +
        "- Rate rises with a steeper gradient, a larger surface, a thinner membrane and a higher temperature.\n" +
        "- Each substance moves down **its own** gradient, whatever the others do.\n" +
        "- At equilibrium molecules still cross in both directions, but at equal rates, so there is no **net** movement.",
      table: {
        columns: ["Mechanism", "Example of what crosses", "Membrane protein?", "ATP?", "Direction"],
        rows: [
          { cells: ["Simple diffusion", "\\(\\mathrm{O_2}\\), \\(\\mathrm{CO_2}\\), steroid hormones", "No", "No", "Down the gradient"] },
          { cells: ["Facilitated diffusion by channel", "\\(\\mathrm{Na^+}\\), \\(\\mathrm{K^+}\\), \\(\\mathrm{Cl^-}\\), water through aquaporins", "Yes, channel", "No", "Down the gradient"] },
          { cells: ["Facilitated diffusion by carrier", "Glucose into red blood cells", "Yes, carrier", "No", "Down the gradient"] },
          { cells: ["Active transport", "\\(\\mathrm{Na^+}\\) out and \\(\\mathrm{K^+}\\) in by the pump", "Yes, carrier (pump)", "Yes", "Against the gradient"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about facilitated diffusion is correct?",
        options: [
          "It needs ATP from the cell.",
          "It can move a substance against its concentration gradient.",
          "Its rate keeps rising in proportion to the concentration, however high the concentration gets.",
          "It uses membrane proteins and moves a substance down its concentration gradient.",
          "It is how oxygen enters red blood cells.",
        ],
        steps: [
          "Facilitated diffusion is passive and goes down the gradient, through a channel or a carrier: D.",
          "A and B describe active transport. C is wrong because carriers saturate. E is wrong because oxygen is small and non-polar, so it crosses by simple diffusion.",
        ],
        answer: "(D) It uses membrane proteins and moves a substance down its concentration gradient.",
      },
      practiceSet: [
        { prompt: "Which crosses the bilayer by simple diffusion: carbon dioxide or a chloride ion?", answer: "Carbon dioxide" },
        { prompt: "When the concentrations on both sides become equal, do molecules stop crossing?", answer: "No: they cross both ways at equal rates, so the net movement is zero" },
        { prompt: "A membrane between two solutions lets every solute through. Side 1 has more urea, side 2 has more glucose. Which way does each move?", answer: "Urea from 1 to 2; glucose from 2 to 1", method: "Each solute follows its own gradient" },
        { prompt: "What is the name of the channel proteins that let water through?", answer: "Aquaporins" },
      ],
      traps: [
        {
          title: "\"Uses a carrier protein\" does not mean \"active\"",
          body: "Carrier proteins work in both facilitated diffusion and active transport. The difference is the direction and the energy: facilitated diffusion goes down the gradient without ATP, active transport goes up it using ATP. Only active transport needs both a protein and ATP.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-csm-osmosis",
      name: "Osmosis, osmolarity and tonicity",
      intuition:
        "Water molecules diffuse too. Dissolved particles hold some water around them, so the side with more solute has fewer free water molecules. Water therefore moves across a membrane toward the side with more dissolved particles. What counts is the number of particles, not their kind, so a salt that splits into two ions counts twice.",
      definition:
        "**Osmosis** is the net movement of water across a partially permeable membrane, from a solution with a lower solute concentration to one with a higher solute concentration (from higher to lower **water potential**).\n" +
        "- **Osmolarity** counts all dissolved particles: concentration times the number of particles each unit gives in solution (\\(i = 1\\) for glucose or sucrose, 2 for NaCl, 3 for \\(\\mathrm{CaCl_2}\\)).\n" +
        "- Human cells and plasma are about 0.3 osmol/L. Physiological saline, 0.9% NaCl (about 0.15 mol/L), matches it.\n" +
        "- **Tonicity** compares a solution with a cell, for solutes that cannot cross the membrane. **Hypotonic**: lower than the cell, water enters. **Isotonic**: equal, no net movement. **Hypertonic**: higher, water leaves.\n" +
        "- Animal cells in hypotonic solution swell and may burst (**haemolysis** for red blood cells); in hypertonic solution they shrink (**crenation**).\n" +
        "- Plant cells in hypotonic solution become **turgid** and do not burst, because the cell wall resists. In hypertonic solution the membrane pulls away from the wall (**plasmolysis**).",
      formula: {
        label: "Osmolarity of a solution",
        latex: "\\text{osmolarity} = i \\times c",
        symbols: [
          { symbol: "\\(i\\)", meaning: "number of particles one formula unit gives when dissolved" },
          { symbol: "\\(c\\)", meaning: "molar concentration, in mol/L" },
        ],
      },
      authoredExample: {
        prompt:
          "Red blood cells (contents about 0.30 osmol/L) are placed in three solutions: 0.15 mol/L NaCl, 0.20 mol/L \\(\\mathrm{CaCl_2}\\) and 0.10 mol/L sucrose. None of these solutes can cross the membrane. Predict what happens in each.",
        steps: [
          "NaCl gives 2 ions: \\(2 \\times 0.15 = 0.30\\ \\text{osmol/L}\\). Isotonic, so the cells keep their shape.",
          "\\(\\mathrm{CaCl_2}\\) gives 3 ions: \\(3 \\times 0.20 = 0.60\\ \\text{osmol/L}\\). Hypertonic, so water leaves and the cells shrink.",
          "Sucrose stays as one particle: 0.10 osmol/L. Hypotonic, so water enters, the cells swell and many burst.",
        ],
        answer: "No change; shrinking (crenation); swelling and bursting (haemolysis)",
      },
      selfCheckExample: {
        prompt:
          "The contents of a cell are 0.24 osmol/L. Which solution is isotonic to the cell, if none of the solutes can cross its membrane?",
        options: [
          "0.24 mol/L NaCl",
          "0.12 mol/L NaCl",
          "0.12 mol/L sucrose",
          "0.12 mol/L \\(\\mathrm{CaCl_2}\\)",
          "0.48 mol/L sucrose",
        ],
        steps: [
          "Work out each osmolarity: A \\(0.48\\), B \\(2 \\times 0.12 = 0.24\\), C \\(0.12\\), D \\(3 \\times 0.12 = 0.36\\), E \\(0.48\\).",
          "Only B matches 0.24 osmol/L.",
          "A forgets that NaCl splits into two ions; C forgets that sucrose does not.",
        ],
        answer: "(B) 0.12 mol/L NaCl",
      },
      practiceSet: [
        { prompt: "What is the osmolarity of 0.20 mol/L KCl?", answer: "0.40 osmol/L", method: "\\(2 \\times 0.20\\)" },
        { prompt: "What happens to a red blood cell placed in pure water?", answer: "It swells and bursts (haemolysis)" },
        { prompt: "Why does a plant cell in pure water not burst?", answer: "The cell wall resists the swelling, so the cell becomes turgid" },
        { prompt: "In which direction does water move: toward the side with more solute or less?", answer: "Toward the side with more solute" },
      ],
      traps: [
        {
          title: "Water moves toward the higher solute concentration",
          body: "In osmosis water goes from the dilute solution to the concentrated one, which is the side with less free water. Saying water moves \"from high concentration to low\" is only right if you mean the concentration of water. IMAT options often reverse this.",
        },
        {
          title: "Count particles, not moles",
          body: "0.1 mol/L NaCl gives 0.2 osmol/L because each unit splits into two ions; 0.1 mol/L glucose gives only 0.1 osmol/L. Comparing solutions by molar concentration alone gives the wrong tonicity.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-csm-active-transport",
      name: "Active transport and the sodium potassium pump",
      intuition:
        "Sometimes a cell needs more of a substance inside than outside, or less. Moving it uphill, against its gradient, takes energy, just as pumping water up a hill does. A carrier protein called a pump uses ATP to change shape and push the substance across. The most important pump keeps sodium out and potassium in.",
      definition:
        "**Active transport** moves a substance against its concentration gradient using a **carrier protein** (a pump) and energy.\n" +
        "- **Primary** active transport uses ATP directly. The **\\(\\mathrm{Na^+/K^+}\\) pump** (\\(\\mathrm{Na^+/K^+}\\) ATPase) moves **3 \\(\\mathrm{Na^+}\\) out** and **2 \\(\\mathrm{K^+}\\) in** for each ATP split. It keeps \\(\\mathrm{Na^+}\\) high outside and \\(\\mathrm{K^+}\\) high inside, and helps make the inside of the cell negative (about \\(-70\\ \\text{mV}\\) in a resting neuron).\n" +
        "- **Secondary** active transport (cotransport) uses the \\(\\mathrm{Na^+}\\) gradient the pump built. In the gut and kidney, \\(\\mathrm{Na^+}\\) flowing in drags glucose in with it, up glucose's gradient. No ATP is used at that carrier, but it stops if the pump stops.\n" +
        "- Carriers moving one substance are uniports; two in the same direction, symports; two in opposite directions, antiports (the \\(\\mathrm{Na^+/K^+}\\) pump is an antiport).\n" +
        "- Poisons that stop ATP production, such as cyanide, stop active transport but not diffusion.",
      formula: {
        label: "One cycle of the sodium potassium pump",
        latex: "3\\,\\mathrm{Na^+_{in}} + 2\\,\\mathrm{K^+_{out}} + \\mathrm{ATP} \\rightarrow 3\\,\\mathrm{Na^+_{out}} + 2\\,\\mathrm{K^+_{in}} + \\mathrm{ADP} + \\mathrm{P_i}",
        symbols: [
          { symbol: "\\(\\mathrm{P_i}\\)", meaning: "inorganic phosphate released when ATP is split" },
        ],
      },
      authoredExample: {
        prompt:
          "One \\(\\mathrm{Na^+/K^+}\\) pump completes 150 cycles per second. Each second, how many sodium ions does it move out, how many potassium ions in, how many ATP does it use, and what net charge does it move?",
        steps: [
          "Sodium out: \\(3 \\times 150 = 450\\).",
          "Potassium in: \\(2 \\times 150 = 300\\).",
          "ATP used: one per cycle, so 150.",
          "Net charge: 450 positive charges out and 300 in, so 150 positive charges leave each second. This is why the pump makes the inside more negative.",
        ],
        answer: "450 \\(\\mathrm{Na^+}\\) out, 300 \\(\\mathrm{K^+}\\) in, 150 ATP, net 150 positive charges out",
      },
      selfCheckExample: {
        prompt:
          "A cell splits \\(6.0 \\times 10^6\\) ATP molecules per second to run its \\(\\mathrm{Na^+/K^+}\\) pumps. How many potassium ions do the pumps bring into the cell each second?",
        options: [
          "\\(2.0 \\times 10^6\\)",
          "\\(3.0 \\times 10^6\\)",
          "\\(1.2 \\times 10^7\\)",
          "\\(1.8 \\times 10^7\\)",
          "\\(6.0 \\times 10^6\\)",
        ],
        steps: [
          "Each ATP brings in 2 \\(\\mathrm{K^+}\\): \\(2 \\times 6.0 \\times 10^6 = 1.2 \\times 10^7\\).",
          "D is the number of \\(\\mathrm{Na^+}\\) pushed out (3 per ATP). E assumes one ion per ATP. A and B divide instead of multiplying.",
        ],
        answer: "(C) \\(1.2 \\times 10^7\\)",
      },
      practiceSet: [
        { prompt: "How many sodium ions does the pump move out per ATP?", answer: "3" },
        { prompt: "Is the potassium concentration higher inside or outside a resting cell?", answer: "Inside" },
        { prompt: "Cyanide stops ATP production. Which stops: oxygen entry or potassium uptake by the pump?", answer: "Potassium uptake by the pump", method: "Diffusion needs no ATP" },
        { prompt: "Glucose is absorbed from the gut together with sodium ions. What kind of transport is this?", answer: "Secondary active transport (cotransport)" },
      ],
      traps: [
        {
          title: "Secondary active transport still depends on ATP",
          body: "The sodium glucose cotransporter uses no ATP itself, but the sodium gradient it runs on is built by the ATP-driven pump. Stop the pump and glucose uptake stops too. It is active transport, not facilitated diffusion, because glucose moves against its gradient.",
        },
      ],
    },
  ],
};
