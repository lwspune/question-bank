import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_EC_CORROSION_NOTE: SubtopicNote = {
  subtopicName: "Corrosion",
  title: "Corrosion: Rusting as a Galvanic Cell",
  oneLineDefinition:
    "Rusting of iron as an electrochemical process, with anodic and cathodic spots on the same piece of iron, and the ways corrosion is prevented, including the sacrificial electrode.",
  whyItMatters:
    "3 questions, two of them from the 2023 board paper: corrosion of iron is an electrochemical process (an MCQ), and which of two metals, given their E° values, better protects iron. The board asks corrosion on other pages too: the same choice of coating metal in 2025, why a galvanised pipe does not rust when its zinc is scratched (2025), why magnesium blocks are fixed to iron pipelines (2026) and a definition of corrosion (2024). The textbook adds how rusting sets up an electrochemical cell.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcec-rusting",
      name: "Rusting of iron as an electrochemical cell",
      intuition:
        "A rusting iron object is covered with countless tiny galvanic cells. At one spot iron gives up electrons and dissolves: that spot is the anode. The electrons travel through the metal to another spot, where oxygen from the air takes them in the presence of H⁺ from the moisture: that spot is the cathode. The water film is the electrolyte.",
      definition:
        "- **Corrosion** slowly coats the surface of a metal with its oxides or other salts. Examples: rusting of iron, tarnishing of silver, the green coating on copper and bronze.\n" +
        "- In corrosion a metal is oxidised by loss of electrons to oxygen. Rusting of iron needs both water and air, and is an **electrochemical** process.\n" +
        "- Anodic spot: \\(2\\text{Fe(s)} \\rightarrow 2\\text{Fe}^{2+} + 4e^{-}\\), \\(E^{\\circ}_{(\\text{Fe}^{2+}/\\text{Fe})} = -0.44\\) V.\n" +
        "- The electrons move through the metal to another spot (the cathode), where oxygen is reduced in the presence of H⁺: \\(\\text{O}_2(g) + 4\\text{H}^{+}(aq) + 4e^{-} \\rightarrow 2\\text{H}_2\\text{O(l)}\\), \\(E^{\\circ} = 1.23\\) V.\n" +
        "- The H⁺ comes from H₂CO₃ formed when CO₂ from the air dissolves in water, or from other acidic oxides in the air.\n" +
        "- Overall: \\(2\\text{Fe(s)} + \\text{O}_2(g) + 4\\text{H}^{+}(aq) \\rightarrow 2\\text{Fe}^{2+}(aq) + 2\\text{H}_2\\text{O(l)}\\), \\(E^{\\circ}_{(cell)} = 1.67\\) V.\n" +
        "- Fe²⁺ is oxidised further by air to Fe³⁺, which comes out as rust, hydrated ferric oxide (Fe₂O₃·xH₂O).",
      formula: {
        label: "Rusting cell",
        latex: "2\\text{Fe(s)} + \\text{O}_2(g) + 4\\text{H}^{+}(aq) \\rightarrow 2\\text{Fe}^{2+}(aq) + 2\\text{H}_2\\text{O(l)}",
      },
      authoredExample: {
        prompt: "Write the anode and cathode reactions for the rusting of iron and calculate the standard potential of this cell. E° of Fe²⁺|Fe = −0.44 V; E° of the H⁺|O₂|H₂O electrode = 1.23 V.",
        steps: [
          "Anode (oxidation, at one spot): \\(2\\text{Fe(s)} \\rightarrow 2\\text{Fe}^{2+} + 4e^{-}\\).",
          "Cathode (reduction, at another spot): \\(\\text{O}_2(g) + 4\\text{H}^{+}(aq) + 4e^{-} \\rightarrow 2\\text{H}_2\\text{O(l)}\\).",
          "Formula: \\(E^{\\circ}_{cell} = E^{\\circ}_{cathode} - E^{\\circ}_{anode}\\).",
          "Substitution: \\(E^{\\circ}_{cell} = 1.23 - (-0.44) = 1.67\\) V.",
          "It is positive, so rusting is spontaneous.",
        ],
        answer: "E°cell = 1.67 V",
      },
      selfCheckExample: {
        prompt: "Where do the H⁺ ions needed at the cathodic spot of a rusting iron object come from?",
        steps: ["Carbon dioxide from the air dissolves in the water film.", "It forms H₂CO₃, which gives H⁺; other acidic oxides from the air can also give H⁺."],
        answer: "From H₂CO₃ (and other acidic oxides) dissolved in the water film",
      },
      practiceSet: [
        { prompt: "Give the formula of rust.", answer: "Fe₂O₃·xH₂O, hydrated ferric oxide" },
        { prompt: "Give two examples of corrosion other than rusting.", answer: "Tarnishing of silver; the green coating on copper and bronze" },
        { prompt: "In rusting, is the spot where iron dissolves the anode or the cathode?", answer: "The anode, because oxidation happens there" },
      ],
      pyqExampleId: "eddb7cc8-54b3-45d8-9a43-ab2a79a2dbf1",
      traps: [
        {
          title: "Calling rusting a simple reaction with oxygen",
          body: "Rusting is electrochemical: an anodic spot, a cathodic spot, electrons moving through the metal and the water film as electrolyte. Answers that leave out the cell lose the explanation marks.",
        },
        {
          title: "Saying iron is reduced",
          body: "Iron is oxidised (Fe to Fe²⁺, then to Fe³⁺ in rust); oxygen is reduced. An MCQ that calls corrosion a reduction process is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcec-corrosion-prevention",
      name: "Preventing corrosion",
      intuition:
        "There are two ways to stop iron rusting. Keep air and water away from it with a cover, or give the corrosion something easier to eat. A metal that is oxidised more easily than iron (a more negative E°) will dissolve first and save the iron, even where the iron shows through.",
      definition:
        "- **Barrier:** stop the surface touching the atmosphere, by paint or by chemicals such as bisphenol.\n" +
        "- **Covering with another metal** such as Sn or Zn, which is inert or reacts to save the object.\n" +
        "- **Sacrificial electrode:** an electrochemical method. A block of a more reactive metal such as Mg or Zn is joined to the iron; it corrodes itself and saves the object.\n" +
        "- A metal can protect iron this way only if its E° is **more negative** than that of iron (−0.44 V), so that it, not iron, is oxidised.",
      table: {
        columns: ["Method", "How it works", "Example"],
        rows: [
          { cells: ["Paint or chemical coating", "Keeps air and moisture away from the surface", "Paint; bisphenol"] },
          {
            cells: ["Coating with zinc (galvanising)", "Zinc has a lower E° than iron, so it is oxidised first even where the coat is broken", "Galvanised iron pipes"],
            noteAmber: "Board 2023 and 2025 gave E° values for two metals and asked which better protects iron: the one with the more negative E°.",
          },
          { cells: ["Sacrificial electrode", "A block of a more reactive metal corrodes itself and saves the object", "Magnesium or zinc blocks joined to iron pipelines"] },
        ],
      },
      practiceSet: [
        { prompt: "Why are magnesium blocks fixed to iron pipelines that carry water?", answer: "Magnesium has a more negative E° than iron, so it is oxidised in preference and the iron is saved: a sacrificial electrode" },
        { prompt: "Name two metals used as sacrificial electrodes for iron.", answer: "Magnesium and zinc" },
        { prompt: "Name a chemical used to cover a metal surface against corrosion.", answer: "Bisphenol" },
      ],
      pyqExampleId: "c4179ee0-23ca-4179-86c8-ba089d1ee487",
      traps: [
        {
          title: "Choosing the metal with the less negative E°",
          body: "A coating metal with a higher E° than iron only works as a cover. Once it is scratched, the exposed iron is oxidised in its place. The protecting metal must have the more negative E°.",
        },
        {
          title: "\"Zinc is a cover\" as the whole answer",
          body: "For a galvanised pipe whose coat is broken, the mark is for the E° reason: zinc is more easily oxidised than iron, so it corrodes instead of the iron.",
        },
      ],
    },
  ],
};
