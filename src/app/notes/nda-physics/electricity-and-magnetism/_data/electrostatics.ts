import type { SubtopicNote } from "@/app/notes/_types";

export const ELECTROSTATICS_NOTE: SubtopicNote = {
  subtopicName: "Electrostatics",
  title: "Electrostatics: Charges at Rest",
  oneLineDefinition:
    "Electric charge is a conserved, quantised property of matter; charges at rest exert forces (Coulomb's law), set up an electric field and potential, and arrange themselves on conductor surfaces so the inside stays field-free.",
  whyItMatters:
    "Electrostatics opens the chapter — 13 PYQs, mostly EASY/MODERATE, and the conceptual bedrock for everything that follows. " +
    "Three families dominate: (1) properties of charge + how things get charged (friction, induction), " +
    "(2) the field/potential pair — field lines point away from +charge, V = W/q, " +
    "(3) conductor behaviour — why the inside of a metal shell is field-free, and why a lightning rod is pointed. " +
    "The questions reward clean definitions, not heavy maths.",
  concepts: [
    // 1 — charge & properties
    {
      kind: "formula" as const,
      slug: "charge-and-properties",
      name: "Electric charge and its three properties",
      intuition:
        "Charge is the property of matter that makes it feel electric force. It comes in two signs (positive, negative), and at the everyday level it behaves like a bookkeeping quantity: you can move it around, but you can never make it appear from nothing or vanish into nothing.",
      definition:
        "Electric charge has three NDA-tested properties:\n" +
        "- **Quantised** — charge is always an integer multiple of the elementary charge \\(e = 1.6\\times10^{-19}\\) C, so \\(q = ne\\). You cannot have half an electron's worth of charge.\n" +
        "- **Conserved** — the total charge of an isolated system never changes. Charging is always TRANSFER, never creation.\n" +
        "- **Additive** — the net charge of a body is the algebraic sum (with sign) of all the charges on it.",
      authoredExample: {
        prompt:
          "A body carries a charge of \\(-3.2\\times10^{-19}\\) C. How many excess electrons does it hold?",
        steps: [
          "Charge is quantised: \\(q = ne\\), so \\(n = q/e\\).",
          "\\(n = \\dfrac{3.2\\times10^{-19}}{1.6\\times10^{-19}} = 2\\).",
          "The negative sign means the EXCESS particles are electrons (not a fractional or positive count).",
        ],
        answer: "2 excess electrons.",
      },
      selfCheckExample: {
        prompt:
          "Two identical metal spheres carry +6 C and −2 C. They are touched together and separated. What charge does each now carry, and which property guarantees it?",
        steps: [
          "Conservation: total charge before = \\(+6 + (-2) = +4\\) C, and total after must also be +4 C.",
          "Identical spheres share the total equally: each gets \\(+4/2 = +2\\) C.",
          "Additivity set the total; conservation fixed it across the contact.",
        ],
        answer: "Each sphere carries +2 C. Conservation of charge guarantees the total stays +4 C.",
      },
      practiceSet: [
        { prompt: "Charge on a body is always an integer multiple of what?", answer: "The electronic charge e = 1.6×10⁻¹⁹ C", method: "quantisation: q = ne" },
        { prompt: "Can charge be created or destroyed in an isolated system?", answer: "No", method: "conservation — only transferred" },
        { prompt: "A body has 5 excess electrons. What is its charge?", answer: "−8×10⁻¹⁹ C", method: "q = ne = 5 × (−1.6×10⁻¹⁹)" },
      ],
      pyqExampleId: "0d18c10b-3188-47d7-b1e2-512c43ccf1b6", // 2025 — NOT a property (charges created/destroyed)
      traps: [
        {
          title: "\"Charges can be created and destroyed\" is the WRONG option",
          body:
            "Conservation forbids it — charge is only ever transferred. NDA phrases the question as \"which is NOT a property of charge\", and the create/destroy line is the answer. Don't confuse charging (transfer) with creation.",
        },
      ],
    },

    // 2 — charging by friction / induction
    {
      kind: "formula" as const,
      slug: "charging-friction-induction",
      name: "How objects get charged — friction and induction",
      intuition:
        "Rubbing two insulators transfers electrons from one to the other: the body that GAINS electrons becomes negative, the one that LOSES them becomes positive. No protons move — only the light, mobile electrons. Induction charges a body without contact by letting a nearby charge rearrange its electrons.",
      definition:
        "- **Charging by friction** — rubbing transfers electrons. The material with weaker hold on electrons loses them (turns +); the other gains them (turns −). Equal and opposite charge appears, conserving total charge.\n" +
        "- **Charging by induction** — bringing a charge near a conductor (without touching) pulls opposite charge to the near face and pushes like charge to the far face; grounding the far face then leaves a net charge.\n" +
        "- **Insulators hold static charge** — charge sprayed onto an insulator stays put (electrons can't flow away), which is exactly why static electricity is an insulator phenomenon.",
      authoredExample: {
        prompt:
          "A glass rod is rubbed with silk and becomes positively charged. What happened to the electrons, and what is the silk's charge?",
        steps: [
          "Charging by friction transfers electrons, never protons.",
          "Glass turned positive ⟹ glass LOST electrons.",
          "By conservation, those electrons went onto the silk ⟹ silk gained electrons ⟹ silk is negative.",
        ],
        answer: "Electrons moved from glass to silk; the silk is negatively charged.",
      },
      selfCheckExample: {
        prompt:
          "A positively charged rod is brought near (but not touching) an isolated metal sphere. Describe the charge on the near and far faces of the sphere while the rod is held there.",
        steps: [
          "The rod's +charge attracts the sphere's free electrons toward the near face.",
          "Near face: electron-rich ⟹ NEGATIVE.",
          "Far face: electron-deficient ⟹ POSITIVE.",
          "This is induction — the sphere's net charge is still zero until it is grounded.",
        ],
        answer: "Near face negative, far face positive; net charge zero (induction).",
      },
      practiceSet: [
        { prompt: "A rod rubbed with wool becomes negative. Which way did electrons move?", answer: "From wool to rod", method: "the body that gains electrons turns negative" },
        { prompt: "What kind of material can hold static charge?", answer: "An insulator", method: "electrons can't flow away" },
        { prompt: "In charging by friction, do protons ever transfer?", answer: "No — only electrons move" },
      ],
      pyqExampleId: "7d3df517-1c47-41fb-a5ee-9aca790d3dbb", // 2017 — rod negative, electrons wool→rod
      traps: [
        {
          title: "Only electrons move — never protons",
          body:
            "Protons are locked in the nucleus. A body turns positive by LOSING electrons, not by gaining protons. Options that say \"positive charges transferred\" are wrong unless they're describing the net effect, not the actual carriers.",
        },
      ],
    },

    // 3 — Coulomb's law
    {
      kind: "formula" as const,
      slug: "coulombs-law",
      name: "Coulomb's law — force between two charges",
      intuition:
        "Two charges push or pull along the line joining them. Like signs repel, unlike signs attract, and the force weakens fast with distance — quartering when you double the separation (inverse-square).",
      definition:
        "The electrostatic force between two point charges is\n" +
        "**like charges repel, unlike charges attract**, directed along the line joining them. " +
        "Doubling the distance cuts the force to a quarter (inverse-square). A \"positive\" (repulsive) force means the two charges have the SAME sign.",
      formula: {
        label: "Coulomb's law",
        latex: "F = \\dfrac{1}{4\\pi\\varepsilon_0}\\,\\dfrac{q_1 q_2}{r^2} = k\\,\\dfrac{q_1 q_2}{r^2}",
        symbols: [
          { symbol: "F", meaning: "force between the charges (N)" },
          { symbol: "q_1, q_2", meaning: "the two charges (C)" },
          { symbol: "r", meaning: "separation between them (m)" },
          { symbol: "k", meaning: "Coulomb constant \\(\\approx 9\\times10^9\\) N·m²/C²" },
        ],
      },
      authoredExample: {
        prompt:
          "Two charges repel with force \\(F\\). Without changing the charges, the distance between them is doubled. What is the new force?",
        steps: [
          "Coulomb's law: \\(F \\propto 1/r^2\\) at fixed charges.",
          "Doubling \\(r\\) makes \\(r^2\\) four times larger.",
          "So the force becomes \\(F/4\\).",
        ],
        answer: "F/4 — the force is still repulsive (same signs), just one-quarter as strong.",
      },
      selfCheckExample: {
        prompt:
          "Charge A repels charge B, and B repels charge C. What can you say about the signs of A and C?",
        steps: [
          "Repulsion means same sign: A and B share a sign.",
          "B and C repel ⟹ B and C share a sign.",
          "So A, B, C all share the same sign ⟹ A and C have the same sign and would repel each other too.",
        ],
        answer: "A and C have the same sign (they would repel).",
      },
      practiceSet: [
        { prompt: "Two like charges experience what kind of force?", answer: "Repulsive" },
        { prompt: "If the distance between two fixed charges is halved, the force becomes…", answer: "4× larger", method: "F ∝ 1/r²" },
        { prompt: "A 'positive' (repulsive) force tells you the two charges are…", answer: "The same sign (both + or both −)" },
      ],
      pyqExampleId: "25d979b1-3039-4ff8-980d-d65e12dbefce", // 2022 — positive force ⟹ both + or both −
      traps: [
        {
          title: "\"Positive force\" = repulsion = like charges",
          body:
            "The bank uses \"positive force\" to mean repulsion. That happens for BOTH-positive AND BOTH-negative pairs (statements 1 and 2), not for opposite charges. The opposite-charge case gives an attractive (negative) force.",
        },
      ],
    },

    // 4 — electric field & field lines
    {
      kind: "formula" as const,
      slug: "electric-field-and-lines",
      name: "Electric field and field lines",
      intuition:
        "Every charge fills the space around it with an electric field — a force-per-unit-charge that a test charge would feel. We draw the field as lines: they start on positive charge and end on negative charge, and the arrow shows the force on a positive test charge.",
      definition:
        "The **electric field** \\(E = F/q\\) is the force per unit positive test charge (N/C). Field-line rules:\n" +
        "- Lines start on **positive** charge, end on **negative** charge; they never cross.\n" +
        "- At a **conductor surface** the field is **perpendicular** to the surface (any parallel component would push the surface charges until it vanished).\n" +
        "- Around an isolated positively charged sphere the lines are **radial and outward**; for a negative sphere, radial and inward.",
      visualizationSlug: "field-lines-charge",
      formula: {
        label: "Electric field (definition)",
        latex: "E = \\dfrac{F}{q}",
        symbols: [
          { symbol: "E", meaning: "electric field (N/C or V/m)" },
          { symbol: "F", meaning: "force on the test charge (N)" },
          { symbol: "q", meaning: "small positive test charge (C)" },
        ],
      },
      authoredExample: {
        prompt:
          "A test charge of \\(2\\times10^{-6}\\) C placed at a point feels a force of \\(4\\times10^{-3}\\) N. What is the electric field there?",
        steps: [
          "Field is force per unit charge: \\(E = F/q\\).",
          "\\(E = \\dfrac{4\\times10^{-3}}{2\\times10^{-6}} = 2\\times10^{3}\\) N/C.",
          "It points along the force (the test charge is positive).",
        ],
        answer: "E = 2×10³ N/C, directed along the force.",
      },
      selfCheckExample: {
        prompt:
          "Why must electric field lines meet the surface of a charged conductor at right angles?",
        steps: [
          "Suppose a line met the surface at a slant — it would have a component PARALLEL to the surface.",
          "A parallel field would push the free surface charges sideways, i.e. a current would flow.",
          "In electrostatics (charges at rest) nothing flows, so the parallel component must be zero.",
          "That leaves only the perpendicular component ⟹ lines meet the surface at 90°.",
        ],
        answer: "Any parallel component would move surface charges; at rest it must be zero, so the field is purely perpendicular.",
      },
      practiceSet: [
        { prompt: "Field lines start on which charge and end on which?", answer: "Start on positive, end on negative" },
        { prompt: "Field lines from an isolated positive sphere point…", answer: "Radially outward" },
        { prompt: "At a conductor's surface, the electrostatic field is…", answer: "Perpendicular to the surface" },
        { prompt: "Can two electric field lines cross?", answer: "No", method: "the field has one direction at each point" },
      ],
      pyqExampleId: "1b4c54e7-b5e3-45f0-a79c-286e4049c582", // 2022 — field lines from + sphere: perpendicular & outward
      traps: [
        {
          title: "Outward AND perpendicular — both words matter",
          body:
            "For a positive conducting sphere the distractors offer \"tangential\" (wrong — must be perpendicular) and \"towards the centre\" (wrong direction — that's a negative sphere). The right answer is perpendicular to the surface AND directed outward.",
        },
      ],
    },

    // 5 — electric potential
    {
      kind: "formula" as const,
      slug: "electric-potential",
      name: "Electric potential and potential difference",
      intuition:
        "Potential is electrical 'height' — the work needed to bring one unit of positive charge to a point. Potential DIFFERENCE between two points is the work per unit charge to move between them; that is exactly what a voltmeter reads.",
      definition:
        "**Potential difference** \\(V = W/q\\) is the work done per unit charge in moving a charge between two points (unit: volt = joule/coulomb). " +
        "Moving a charge \\(q\\) through a PD \\(V\\) changes its energy by \\(W = qV\\). " +
        "The **electron-volt (eV)** is the energy an electron gains across 1 volt: \\(1\\text{ eV} = 1.6\\times10^{-19}\\) J.",
      formula: {
        label: "Potential difference / work",
        latex: "V = \\dfrac{W}{q} \\quad\\Longleftrightarrow\\quad W = qV",
        symbols: [
          { symbol: "V", meaning: "potential difference (volt)" },
          { symbol: "W", meaning: "work done / energy transferred (joule)" },
          { symbol: "q", meaning: "charge moved (coulomb)" },
        ],
      },
      authoredExample: {
        prompt:
          "Moving a charge of 5 C between two points takes 100 J of work. What is the potential difference between the points?",
        steps: [
          "Potential difference is work per unit charge: \\(V = W/q\\).",
          "\\(V = \\dfrac{100}{5} = 20\\) V.",
        ],
        answer: "20 V.",
      },
      selfCheckExample: {
        prompt:
          "An electron is accelerated through a potential difference of 500 V. How much energy (in joules) does it gain?",
        steps: [
          "Energy gained \\(W = qV\\), with \\(q = e = 1.6\\times10^{-19}\\) C.",
          "\\(W = 1.6\\times10^{-19} \\times 500 = 8\\times10^{-17}\\) J.",
          "Equivalently, 500 eV.",
        ],
        answer: "8×10⁻¹⁷ J (= 500 eV).",
      },
      practiceSet: [
        { prompt: "What is the SI unit of potential difference?", answer: "Volt (= joule per coulomb)" },
        { prompt: "Work to move 2 C through 6 V?", answer: "12 J", method: "W = qV" },
        { prompt: "Energy gained by an electron crossing 1 kV, in joules?", answer: "1.6×10⁻¹⁶ J", method: "W = eV = 1.6×10⁻¹⁹ × 1000" },
      ],
      pyqExampleId: "05c213bb-b2f9-4b36-98b5-3fa610109fed", // 2025 — V = W/q = 24/2 = 12 V
      traps: [
        {
          title: "Divide work by charge — don't multiply",
          body:
            "For \"work W to move charge q, find PD\", the answer is \\(V = W/q\\). The distractor multiplies (W×q) or inverts the ratio. Units settle it: volts = joules ÷ coulombs.",
        },
      ],
    },

    // 6 — conductors & shielding
    {
      kind: "formula" as const,
      slug: "conductors-and-shielding",
      name: "Conductors in electrostatics — field-free interior",
      intuition:
        "Give a conductor some charge and its free electrons rearrange in an instant until no field is left inside the metal. All the excess charge sits on the OUTER surface, and the cavity inside a hollow conductor is completely shielded from outside fields — the principle behind a Faraday cage.",
      definition:
        "In static equilibrium on a conductor:\n" +
        "- The electric field **inside the conducting material is zero** — free charges move until it is.\n" +
        "- All excess charge resides on the **outer surface**.\n" +
        "- A hollow conductor **shields its cavity** from external fields (Faraday cage / electrostatic shielding).\n" +
        "For a charge \\(+q\\) at the centre of a hollow metal shell (inner radius \\(a\\), outer \\(b\\)): the field is non-zero for \\(r<a\\), **zero within the metal** \\(a<r<b\\), and non-zero again outside.",
      authoredExample: {
        prompt:
          "Why does a car act as a relatively safe place during a lightning strike, even though the body is metal?",
        steps: [
          "A car body is a (roughly) closed conductor.",
          "Charge from a strike spreads over the OUTER metal surface.",
          "The electric field inside the conducting shell stays zero — the cavity is shielded.",
          "So the occupants inside are protected — this is electrostatic shielding (a Faraday cage).",
        ],
        answer: "The metal shell carries the charge on its outside and keeps the interior field-free (Faraday-cage shielding).",
      },
      selfCheckExample: {
        prompt:
          "A solid metal sphere is given a charge Q. Where does the charge sit, and what is the field deep inside the metal?",
        steps: [
          "Free charges repel and move as far apart as possible — onto the outer surface.",
          "No charge remains in the bulk of the metal.",
          "With charges at rest and none inside, the field inside the conductor is zero.",
        ],
        answer: "All of Q sits on the outer surface; the field inside the metal is zero.",
      },
      practiceSet: [
        { prompt: "Electric field inside the material of a charged conductor?", answer: "Zero" },
        { prompt: "Where does excess charge on a conductor reside?", answer: "On the outer surface" },
        { prompt: "What protects the cavity of a hollow conductor from outside fields?", answer: "Electrostatic shielding (Faraday cage)" },
      ],
      pyqExampleId: "cc210213-f79b-46dc-985d-489918be740b", // 2017 — E = 0 for a<r<b (inside the metal)
      traps: [
        {
          title: "Field is zero INSIDE THE METAL (a<r<b), not everywhere",
          body:
            "For a central charge in a hollow shell, the field is zero only within the conducting material \\(a<r<b\\). Between the charge and the inner wall (\\(r<a\\)) and outside the shell (\\(r>b\\)) the field is non-zero. Don't over-extend the 'field is zero' rule.",
        },
      ],
    },

    // 7 — sharp points & lightning (REFERENCE)
    {
      kind: "reference" as const,
      slug: "sharp-points-and-lightning",
      name: "Sharp points, corona discharge and lightning protection",
      intuition:
        "Charge crowds onto the sharpest parts of a conductor, making the field there enormous. That intense field ionises the surrounding air into a 'corona' that quietly bleeds charge away — which is exactly why a lightning rod is pointed and why aircraft tyres are made conducting.",
      definition:
        "Charge density (and hence field) is **largest where a conductor is most sharply curved** — a pointed tip. The strong field there drives **corona discharge**, continuously leaking charge to/from the air. This is the recall cluster the bank tests as applications.",
      table: {
        columns: ["Situation", "Reason"],
        rows: [
          {
            cells: [
              "**Lightning rod has a pointed tip**",
              "Sharp point ⟹ very high field ⟹ continuous corona discharge that neutralises charge before a strike builds",
            ],
            pyqExampleId: "7467eab7-eb45-4c9f-b953-c029420b1bd4",
          },
          {
            cells: [
              "**Lightning itself**",
              "Flow of charge between oppositely charged regions of cloud/ground once the field exceeds air's breakdown",
            ],
            pyqExampleId: "b57a5bb0-02ec-4ba2-8c48-4d3b7e68b806",
          },
          {
            cells: [
              "**Aircraft tyres made of conducting rubber**",
              "Lets charge built up in flight (by friction with air, by onboard electronics) drain harmlessly to ground on landing",
            ],
            pyqExampleId: "c135adfc-4a5a-4c7f-b38f-9c333225c08e",
          },
          {
            cells: [
              "**Why pointed, not spherical/flat**",
              "A pointed top concentrates the most charge ⟹ strongest discharge action; a sphere or flat block would not",
            ],
            noteAmber: "NDA 2026 Apr — a sharp tip works by ENHANCING the local field to promote corona discharge, not by reducing it.",
            pyqExampleId: "d1b7477c-0d0c-4da2-8c2e-4e8afc39bd29",
          },
        ],
        caption:
          "All four reduce to one idea: charge concentrates at sharp points, raising the field enough to discharge through the air.",
      },
      selfCheckExample: {
        prompt:
          "Two identical conductors carry the same charge — one is a smooth sphere, the other has a sharp spike. Near which does the air break down (spark) first, and why?",
        steps: [
          "Charge density is highest where curvature is sharpest.",
          "The spike has a far smaller radius of curvature than the sphere ⟹ much higher local charge density.",
          "Field ∝ charge density, so the field at the spike is largest.",
          "Air breaks down where the field is strongest ⟹ at the spike.",
        ],
        answer: "Near the sharp spike — the concentrated charge there gives the strongest field, breaking down the air first.",
      },
      practiceSet: [
        { prompt: "Best shape for the tip of a lightning conductor?", answer: "Pointed / conical" },
        { prompt: "What is the discharge of charge from a sharp point into the air called?", answer: "Corona discharge" },
        { prompt: "Why are aircraft tyres made of conducting rubber?", answer: "To drain accumulated static charge to ground on landing" },
      ],
      pyqExampleId: "7467eab7-eb45-4c9f-b953-c029420b1bd4", // 2024 — best shape: pointed/conical
      traps: [
        {
          title: "A sharp tip ENHANCES the field — it doesn't reduce it",
          body:
            "The 2026 question offers \"the sharp tip reduces the local field\" as a distractor. Backwards. A sharp point INTENSIFIES the field, which is what drives the protective corona discharge.",
        },
      ],
    },
  ],
};
