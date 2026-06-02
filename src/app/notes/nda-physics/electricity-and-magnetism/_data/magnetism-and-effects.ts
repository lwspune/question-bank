import type { SubtopicNote } from "@/app/notes/_types";

export const MAGNETISM_AND_EFFECTS_NOTE: SubtopicNote = {
  subtopicName: "Magnetism and Magnetic Effects of Current",
  title: "Magnetism and Magnetic Effects of Current",
  oneLineDefinition:
    "Magnets and the Earth set up magnetic fields drawn as closed field lines; an electric current does the same — a straight wire makes circular field lines (B ∝ I/r), a solenoid makes a uniform interior field (B = μ₀nI), and a coil concentrates the field at its centre.",
  whyItMatters:
    "Sixteen PYQs — the chapter's joint-largest subtopic. The bank rewards a handful of facts drilled to reflex: magnetic field lines are closed and never cross, the Earth's field is horizontal at the magnetic equator, which materials a magnet attracts, the field of a straight wire (∝ I/r) and the right-hand grip rule for its direction, the solenoid field B = μ₀nI, and the centre-of-coil field B ∝ NI/R.",
  concepts: [
    // 1 — magnets & field lines
    {
      kind: "formula" as const,
      slug: "magnets-and-field-lines",
      name: "Magnets and magnetic field lines",
      intuition:
        "Every magnet has two poles (north and south) that can't be separated — break a magnet and each piece grows its own pair. We picture the field with lines that leave the north pole, loop around to the south pole OUTSIDE, and continue from south to north INSIDE, forming closed loops that never cross.",
      definition:
        "Key facts about a magnet's field lines:\n" +
        "- They are **closed curves** — outside the magnet they run N→S, and they continue S→N **inside** the magnet (so field lines DO exist within a bar magnet).\n" +
        "- They **never cross** (the field has one definite direction at each point).\n" +
        "- They are **denser where the field is stronger** (near the poles).\n" +
        "- A magnetic field is a **vector** (magnitude and direction).\n" +
        "A bar magnet in a UNIFORM field feels equal and opposite pole forces — so **zero net force**, only a torque that aligns it.",
      authoredExample: {
        prompt:
          "Can two magnetic field lines ever cross each other? Explain.",
        steps: [
          "A field line's tangent gives the field direction at that point.",
          "If two lines crossed, the field would point in two different directions at the crossing point.",
          "The field has only ONE direction at each point — a contradiction.",
          "Therefore field lines never cross.",
        ],
        answer: "No — crossing would mean two field directions at one point, which is impossible.",
      },
      selfCheckExample: {
        prompt:
          "Is the statement \"there are no magnetic field lines within a bar magnet\" correct? Why or why not?",
        steps: [
          "Magnetic field lines are CLOSED loops.",
          "Outside, they go from N to S; to close the loop they must continue from S back to N.",
          "That return path runs THROUGH the magnet's interior.",
          "So field lines certainly exist inside a bar magnet — the statement is incorrect.",
        ],
        answer: "Incorrect — field lines run S→N inside the magnet to close the loops.",
      },
      practiceSet: [
        { prompt: "Are magnetic field lines open or closed curves?", answer: "Closed" },
        { prompt: "Net force on a bar magnet in a uniform magnetic field?", answer: "Zero (only a torque)" },
        { prompt: "Which instrument detects the presence of a magnetic field?", answer: "A magnetic needle (compass)" },
        { prompt: "Can magnetic field lines cross?", answer: "No" },
      ],
      pyqExampleId: "7be1aa6e-4192-4648-ad03-05f3f3264d83", // 2020 — field lines are closed, not open
      traps: [
        {
          title: "Field lines are CLOSED and exist INSIDE the magnet",
          body:
            "Two favourite false statements: 'magnetic field lines are open curves' (wrong — they're closed) and 'there are no field lines within a bar magnet' (wrong — they run S→N inside). Both are the answers to 'which is NOT correct'.",
        },
      ],
    },

    // 2 — Earth's magnetism
    {
      kind: "formula" as const,
      slug: "earths-magnetism",
      name: "The Earth's magnetic field",
      intuition:
        "The Earth behaves like a giant bar magnet tilted slightly from its spin axis. A compass needle dips down at the poles and lies flat at the magnetic equator — that's where the field is purely horizontal.",
      definition:
        "The Earth's magnetic field resembles that of a bar magnet at its centre. The angle the field makes with the horizontal is the **dip (inclination)**: it is **90° (vertical) at the magnetic poles** and **0° (horizontal) at the magnetic equator**. " +
        "So the Earth's field becomes **horizontal at the magnetic equator**.",
      authoredExample: {
        prompt:
          "Where on Earth does a freely suspended magnetic needle (free to dip) rest exactly horizontal?",
        steps: [
          "A dip needle aligns with the Earth's field, tilting by the local angle of dip.",
          "Dip is 0° where the field is horizontal.",
          "That happens at the magnetic equator.",
        ],
        answer: "At the magnetic equator (angle of dip = 0°).",
      },
      practiceSet: [
        { prompt: "Where is the Earth's magnetic field horizontal?", answer: "At the magnetic equator" },
        { prompt: "Angle of dip at the magnetic poles?", answer: "90° (vertical field)" },
        { prompt: "The Earth's magnetic field resembles that of what?", answer: "A bar magnet (magnetic dipole)" },
      ],
      pyqExampleId: "b8fcdf30-c8e8-4a44-9a38-f5d8cc37e820", // 2017 — horizontal at magnetic equator
      traps: [
        {
          title: "Magnetic EQUATOR, not magnetic meridian",
          body:
            "The field is horizontal at the magnetic equator. 'Magnetic meridian' (the vertical plane containing the needle) and 'geographic pole' are distractors — the equator is where dip = 0.",
        },
      ],
    },

    // 3 — magnetic materials (REFERENCE)
    {
      kind: "reference" as const,
      slug: "magnetic-materials",
      name: "Magnetic materials — what a magnet attracts",
      intuition:
        "Only a few materials are strongly attracted to a magnet — iron, nickel, cobalt, and steels containing them. Most everyday materials (plastic, carbon, copper, glass) are not. A handful, like aluminium, are weakly affected.",
      definition:
        "Materials fall into three magnetic classes by how they respond to a magnet:",
      table: {
        columns: ["Class", "Behaviour", "Examples"],
        rows: [
          {
            cells: [
              "**Ferromagnetic**",
              "Strongly attracted; can be magnetised",
              "Iron, nickel, cobalt, steel (incl. many stainless steels)",
            ],
          },
          {
            cells: [
              "**Paramagnetic**",
              "Very weakly attracted",
              "Aluminium, platinum, manganese",
            ],
          },
          {
            cells: [
              "**Diamagnetic / non-magnetic**",
              "Not attracted (very weakly repelled)",
              "Plastic, carbon, copper, glass, water",
            ],
          },
        ],
        caption:
          "A magnet strongly attracts only ferromagnetic materials; plastic and carbon are non-magnetic.",
      },
      selfCheckExample: {
        prompt:
          "Of plastic, carbon, aluminium and stainless steel, how many are attracted by a magnet?",
        steps: [
          "Plastic — non-magnetic, not attracted.",
          "Carbon — non-magnetic, not attracted.",
          "Aluminium — paramagnetic, weakly attracted.",
          "Stainless steel — ferromagnetic grades are strongly attracted.",
        ],
        answer: "Two — aluminium (weakly) and stainless steel.",
      },
      practiceSet: [
        { prompt: "Name three strongly magnetic (ferromagnetic) metals.", answer: "Iron, nickel, cobalt" },
        { prompt: "Is plastic attracted by a magnet?", answer: "No (non-magnetic)" },
        { prompt: "Which class can be permanently magnetised?", answer: "Ferromagnetic" },
      ],
      pyqExampleId: "28ff6893-a9ba-436b-830b-2ace7e722647", // 2023 — how many attracted (answer 2)
      traps: [
        {
          title: "Stainless steel is (usually) magnetic; aluminium is only weakly so",
          body:
            "Common stainless steels contain iron and ARE attracted by a magnet. Aluminium is paramagnetic — weakly attracted, which the bank counts as 'attracted'. Plastic and carbon are not. That gives 2 of the 4.",
        },
      ],
    },

    // 4 — field of a current (straight wire)
    {
      kind: "formula" as const,
      slug: "field-of-a-current",
      name: "Magnetic field of a current-carrying straight wire",
      intuition:
        "A current makes a magnetic field that wraps around the wire in circles. The bigger the current and the closer you are, the stronger the field — it grows with current and falls off as 1/distance. Point your right thumb along the current and your curled fingers show which way the field circles.",
      definition:
        "A straight current-carrying wire produces **circular magnetic field lines** centred on the wire. Its strength is\n" +
        "**\\(B = \\dfrac{\\mu_0 I}{2\\pi r}\\)** — proportional to the current \\(I\\), inversely proportional to the distance \\(r\\). It does NOT depend on the wire's own radius. " +
        "**Right-hand grip (thumb) rule**: point the right thumb along the conventional current; the curled fingers give the field's circulation direction.",
      visualizationSlug: "magnetic-field-around-wire",
      formula: {
        label: "Field of a straight wire",
        latex: "B = \\dfrac{\\mu_0 I}{2\\pi r}",
        symbols: [
          { symbol: "B", meaning: "magnetic field (tesla)" },
          { symbol: "I", meaning: "current in the wire (A)" },
          { symbol: "r", meaning: "perpendicular distance from the wire (m)" },
          { symbol: "\\mu_0", meaning: "permeability of free space" },
        ],
      },
      authoredExample: {
        prompt:
          "At a fixed point near a long straight wire the field is B. If the current is doubled and the point stays put, what is the new field?",
        steps: [
          "\\(B = \\mu_0 I / (2\\pi r)\\) — at fixed \\(r\\), \\(B \\propto I\\).",
          "Doubling the current doubles the field.",
        ],
        answer: "2B.",
      },
      selfCheckExample: {
        prompt:
          "How does the magnetic field of a long straight wire change as you move twice as far from it (current unchanged)?",
        steps: [
          "\\(B \\propto 1/r\\) at fixed current.",
          "Doubling \\(r\\) halves \\(B\\).",
        ],
        answer: "The field is halved (B ∝ 1/distance).",
      },
      practiceSet: [
        { prompt: "How does a straight wire's magnetic field depend on distance r?", answer: "Inversely (B ∝ 1/r)" },
        { prompt: "Which rule gives the direction of a wire's magnetic field?", answer: "Right-hand grip (thumb) rule" },
        { prompt: "Field lines around a straight current-carrying wire are…", answer: "Concentric circles around the wire" },
      ],
      pyqExampleId: "dfa5e77e-b1e1-4355-a12d-beed39351bb1", // 2022 — B depends inversely on distance
      traps: [
        {
          title: "Depends on current and distance — not on the wire's radius",
          body:
            "The field outside a straight wire depends on the current and your distance from the axis, NOT on the wire's own thickness or the surrounding temperature. B ∝ I and B ∝ 1/r.",
        },
      ],
    },

    // 5 — solenoid field
    {
      kind: "formula" as const,
      slug: "solenoid-field",
      name: "Magnetic field of a solenoid",
      intuition:
        "Wind a wire into a tight coil (a solenoid) and the fields of all the turns add up inside to give a strong, UNIFORM field — just like a bar magnet's. Pack in more turns per metre or push more current and the field grows in proportion. Slip a soft-iron core inside and it grows much more.",
      definition:
        "Inside a long solenoid the field is **uniform** and given by\n" +
        "**\\(B = \\mu_0 n I\\)** — proportional to the **turns per unit length \\(n\\)** and the **current \\(I\\)**. " +
        "It does NOT depend on the solenoid's diameter. Inserting a **soft-iron core** greatly increases the field. A current-carrying solenoid behaves like a bar magnet.",
      formula: {
        label: "Field inside a solenoid",
        latex: "B = \\mu_0 n I",
        symbols: [
          { symbol: "B", meaning: "field inside the solenoid (T)" },
          { symbol: "n", meaning: "turns per unit length (per m)" },
          { symbol: "I", meaning: "current (A)" },
        ],
      },
      authoredExample: {
        prompt:
          "A solenoid carries current I with n turns per unit length, giving a field B. If the turns per unit length are doubled to 2n (current unchanged), what is the new field?",
        steps: [
          "\\(B = \\mu_0 n I\\) — at fixed current, \\(B \\propto n\\).",
          "Doubling n doubles the field.",
        ],
        answer: "2B.",
      },
      selfCheckExample: {
        prompt:
          "Which of these change the field inside a long solenoid: (1) turns per unit length, (2) the current, (3) the solenoid's diameter?",
        steps: [
          "\\(B = \\mu_0 n I\\) contains n and I — so (1) and (2) matter.",
          "The diameter does not appear in the formula — (3) does not matter.",
        ],
        answer: "Only (1) turns per unit length and (2) current — not the diameter.",
      },
      practiceSet: [
        { prompt: "Field inside a long solenoid is uniform or non-uniform?", answer: "Uniform" },
        { prompt: "Formula for the field inside a solenoid?", answer: "B = μ₀nI" },
        { prompt: "Inserting a soft-iron core into a solenoid does what to the field?", answer: "Greatly increases it" },
      ],
      pyqExampleId: "08ff36d3-a8ff-43e0-8d06-07fd59ea03c2", // 2017 — n → 2n gives 2B
      traps: [
        {
          title: "Field depends on turns-per-length and current, not diameter",
          body:
            "B = μ₀nI: only n and I matter. A common false statement is 'inserting a soft-iron bar leaves the field unchanged' — wrong, the core boosts it sharply. Another distractor adds the diameter as a dependence — it isn't one.",
        },
      ],
    },

    // 6 — circular coil field
    {
      kind: "formula" as const,
      slug: "circular-coil-field",
      name: "Magnetic field at the centre of a circular coil",
      intuition:
        "Bend the wire into a circular loop and the field is strongest right at the centre. Stack N turns and the field multiplies by N; shrink the radius and the field grows (it goes as 1/R). So more turns and a smaller loop both intensify the centre field.",
      definition:
        "At the centre of a circular coil of \\(N\\) turns, radius \\(R\\), carrying current \\(I\\):\n" +
        "**\\(B = \\dfrac{\\mu_0 N I}{2R}\\)** — proportional to \\(N\\) and \\(I\\), inversely proportional to \\(R\\).",
      formula: {
        label: "Field at centre of a coil",
        latex: "B = \\dfrac{\\mu_0 N I}{2R}",
        symbols: [
          { symbol: "N", meaning: "number of turns" },
          { symbol: "I", meaning: "current (A)" },
          { symbol: "R", meaning: "radius of the coil (m)" },
        ],
      },
      authoredExample: {
        prompt:
          "A circular coil produces a field B at its centre. The number of turns is doubled and the radius is halved (current unchanged). What is the new centre field?",
        steps: [
          "\\(B = \\mu_0 N I/(2R)\\), so \\(B \\propto N/R\\).",
          "N doubles (×2) and R halves (÷½ = ×2 in the field).",
          "Combined factor: \\(2 \\times 2 = 4\\).",
          "New field = 4B.",
        ],
        answer: "4B.",
      },
      selfCheckExample: {
        prompt:
          "A single-turn coil gives 0.1 T at its centre. The turns are doubled and the radius halved. What is the new field?",
        steps: [
          "Field at centre ∝ N/R.",
          "N → 2N (×2), R → R/2 (×2 more).",
          "So field → \\(4 \\times 0.1 = 0.4\\) T.",
        ],
        answer: "0.4 T.",
      },
      practiceSet: [
        { prompt: "Field at the centre of a coil is proportional to which two quantities?", answer: "N and I (and 1/R)" },
        { prompt: "Doubling the number of turns does what to the centre field?", answer: "Doubles it" },
        { prompt: "Halving the radius (all else fixed) does what to the centre field?", answer: "Doubles it", method: "B ∝ 1/R" },
      ],
      pyqExampleId: "b4ba2027-0f7c-42b1-9e72-9049ed71bd7e", // 2018 — N×2, R÷2 ⟹ 0.4 T
      traps: [
        {
          title: "Combine the factors: N up AND R down both raise B",
          body:
            "B ∝ N/R. Doubling N gives ×2; halving R gives another ×2; together ×4. Forgetting one factor (answering 0.2 T) is the dominant trap.",
        },
      ],
    },
  ],
};
