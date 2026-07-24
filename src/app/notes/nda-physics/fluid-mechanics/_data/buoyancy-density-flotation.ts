import type { SubtopicNote } from "@/app/notes/_types";

export const BUOYANCY_DENSITY_FLOTATION_NOTE: SubtopicNote = {
  subtopicName: "Buoyancy, Density and Flotation",
  title: "Buoyancy, Density and Flotation",
  oneLineDefinition:
    "Density (mass per unit volume) decides everything here: a body floats when its average density is less than the fluid's, and Archimedes' principle says the upward buoyant force equals the weight of the fluid the body displaces.",
  whyItMatters:
    "Sixteen PYQs — the largest and hardest pool in the chapter, with five HARD problems. The recurring tests are: density and relative density, Archimedes' upthrust (= weight of displaced fluid), the float-or-sink rule (compare densities), apparent weight loss when submerged, combining densities by mixing equal volumes versus equal masses, and the stability of a floating body (centre of gravity below the metacentre). Build the density foundation first — almost every hard problem here is a density comparison in disguise.",
  concepts: [
    // 1 — FOUNDATION: density and relative density
    {
      kind: "formula" as const,
      slug: "flu-density-relative-density",
      name: "Density and relative density",
      intuition:
        "Density tells you how tightly mass is packed into a volume. A kilogram of lead takes up far less space than a kilogram of cotton, so lead is denser. Relative density just compares a substance's density with water's — it is a pure number with no units.",
      definition:
        "**Density** is mass per unit volume: \\(\\rho = m/V\\) (SI unit kg/m³).\n" +
        "- Water has density **1000 kg/m³** (= 1 g/cm³), greatest near **4 °C**.\n" +
        "- **Relative density** (specific gravity) \\(= \\rho_{\\text{substance}} / \\rho_{\\text{water}}\\) — a unitless ratio. RD = 0.8 means the substance is 0.8 times as dense as water.\n" +
        "- A substance with **RD < 1 floats** on water; **RD > 1 sinks**.",
      formula: {
        label: "Density and relative density",
        latex: "\\rho = \\dfrac{m}{V}, \\qquad \\text{RD} = \\dfrac{\\rho_{\\text{substance}}}{\\rho_{\\text{water}}}",
        symbols: [
          { symbol: "\\(\\rho\\)", meaning: "density (kg/m³)" },
          { symbol: "m", meaning: "mass (kg)" },
          { symbol: "V", meaning: "volume (m³)" },
          { symbol: "\\(\\text{RD}\\)", meaning: "relative density (no unit)" },
        ],
      },
      authoredExample: {
        prompt:
          "A pumpkin weighs 7.5 N. When fully submerged it displaces 0.75 litre of water. Find its density (g = 10 m/s², water = 1000 kg/m³).",
        steps: [
          "Mass = weight / g = \\(7.5 / 10 = 0.75\\,\\text{kg}\\).",
          "Volume displaced = body volume = \\(0.75\\,\\text{L} = 0.75 \\times 10^{-3}\\,\\text{m}^3\\).",
          "\\(\\rho = m/V = 0.75 / (0.75 \\times 10^{-3}) = 1000\\,\\text{kg/m}^3\\).",
        ],
        answer: "1000 kg/m³ (the same as water — it would just barely float).",
      },
      selfCheckExample: {
        prompt:
          "A metal block has mass 540 g and volume 200 cm³. Find its density and its relative density (water = 1 g/cm³).",
        steps: [
          "\\(\\rho = m/V = 540 / 200 = 2.7\\,\\text{g/cm}^3\\).",
          "RD = \\(\\rho_{\\text{metal}} / \\rho_{\\text{water}} = 2.7 / 1 = 2.7\\).",
          "RD > 1, so the block sinks.",
        ],
        answer: "Density 2.7 g/cm³; relative density 2.7 (it sinks).",
      },
      practiceSet: [
        { prompt: "Density of water at 4 °C?", answer: "1000 kg/m³ (1 g/cm³)" },
        { prompt: "Unit of relative density?", answer: "None (it is a ratio)" },
        { prompt: "A substance of RD 0.7 in water — floats or sinks?", answer: "Floats", method: "RD < 1" },
      ],
      pyqExampleId: "360c504a-5f42-44cd-8997-4a20c6d37663", // 2024 — pumpkin density = 1000 kg/m³
      traps: [
        {
          title: "Relative density has no unit",
          body:
            "RD is a ratio of two densities, so the units cancel — it is a pure number. An option that quotes RD 'in kg/m³' is wrong. Also remember water peaks in density near 4 °C, not at 0 °C.",
        },
      ],
    },

    // 2 — combining densities (mixtures)
    {
      kind: "formula" as const,
      slug: "flu-combining-densities",
      name: "Combining densities — equal volumes vs equal masses",
      intuition:
        "Mix two liquids and the result's density depends on HOW you mix them. Equal VOLUMES gives the plain average of the two densities. Equal MASSES gives the harmonic-style average — always smaller — because the lighter liquid takes up more room.",
      definition:
        "Mixing two substances of densities \\(\\rho_1\\) and \\(\\rho_2\\):\n" +
        "- **Equal volumes** (\\(V\\) each): average density \\(= \\dfrac{\\rho_1 + \\rho_2}{2}\\) (the arithmetic mean).\n" +
        "- **Equal masses** (\\(m\\) each): average density \\(= \\dfrac{2\\rho_1\\rho_2}{\\rho_1 + \\rho_2}\\) (the harmonic mean of the two).\n" +
        "Average density is always total mass divided by total volume.",
      formula: {
        label: "Mixture density (equal masses)",
        latex: "\\rho_{\\text{eq.mass}} = \\dfrac{2\\rho_1\\rho_2}{\\rho_1 + \\rho_2}",
        symbols: [
          { symbol: "\\(\\rho_1, \\rho_2\\)", meaning: "densities of the two components" },
          { symbol: "\\(\\rho_{\\text{eq.mass}}\\)", meaning: "density of an equal-mass mixture" },
        ],
      },
      authoredExample: {
        prompt:
          "Two substances of densities rho1 and rho2 are mixed in equal volumes giving relative density 4, and in equal masses giving relative density 3. Find rho1 and rho2.",
        steps: [
          "Equal volumes: \\((\\rho_1+\\rho_2)/2 = 4 \\Rightarrow \\rho_1+\\rho_2 = 8\\).",
          "Equal masses: \\(2\\rho_1\\rho_2/(\\rho_1+\\rho_2) = 3 \\Rightarrow 2\\rho_1\\rho_2/8 = 3 \\Rightarrow \\rho_1\\rho_2 = 12\\).",
          "Solve \\(\\rho_1+\\rho_2=8\\), \\(\\rho_1\\rho_2=12\\): the roots are 6 and 2.",
        ],
        answer: "rho1 = 6 and rho2 = 2 (in units of water's density).",
      },
      selfCheckExample: {
        prompt:
          "An object is built from two equal VOLUMES, one of density rho0 and the other of density 2 rho0. Find its average density.",
        steps: [
          "Average density = total mass / total volume.",
          "Mass = \\(\\rho_0 V + 2\\rho_0 V = 3\\rho_0 V\\); total volume = \\(2V\\).",
          "Average = \\(3\\rho_0 V / 2V = \\tfrac{3}{2}\\rho_0\\).",
        ],
        answer: "(3/2) rho0.",
      },
      practiceSet: [
        { prompt: "Equal-volume mix of densities 2 and 6 — average density?", answer: "4", method: "arithmetic mean (rho1+rho2)/2" },
        { prompt: "Average density formula in general?", answer: "Total mass / total volume" },
        { prompt: "Equal-mass mixing gives which kind of mean?", answer: "Harmonic mean (always the smaller average)" },
      ],
      pyqExampleId: "c51396be-7a8e-4af0-a7ca-bf629d942b50", // 2019 — equal vol RD 4, equal mass RD 3 -> 6, 2
      traps: [
        {
          title: "Equal volumes vs equal masses give DIFFERENT averages",
          body:
            "Equal volumes means the simple average (rho1+rho2)/2. Equal masses means 2 rho1 rho2 / (rho1+rho2), which is smaller. Read the question carefully — using the wrong one is the classic mistake on this HARD favourite.",
        },
      ],
    },

    // 3 — Archimedes' principle / buoyant force
    {
      kind: "formula" as const,
      slug: "flu-archimedes-buoyancy",
      name: "Archimedes' principle and the buoyant force",
      intuition:
        "Lower an object into water and the water pushes up on it. Archimedes saw that this upthrust equals the weight of the water the object shoves aside. Displace more fluid and you get more lift — that is the whole principle.",
      definition:
        "**Buoyancy (upthrust)** is the upward force a fluid exerts on a body immersed in it.\n" +
        "**Archimedes' principle:** the buoyant force equals the **weight of the fluid displaced** by the body: \\(F_b = \\rho_{\\text{fluid}}\\, V_{\\text{disp}}\\, g\\).\n" +
        "- It acts **upward**, through the centre of the displaced fluid (the centre of buoyancy).\n" +
        "- It equals the weight of displaced fluid — **not** the mass or weight of the body itself.",
      visualizationSlug: "archimedes-floating-block",
      formula: {
        label: "Buoyant force (Archimedes)",
        latex: "F_b = \\rho_{\\text{fluid}}\\, V_{\\text{disp}}\\, g",
        symbols: [
          { symbol: "F_b", meaning: "buoyant force / upthrust (N)" },
          { symbol: "\\(\\rho_{\\text{fluid}}\\)", meaning: "density of the fluid (kg/m³)" },
          { symbol: "\\(V_{\\text{disp}}\\)", meaning: "volume of fluid displaced (m³)" },
          { symbol: "g", meaning: "acceleration due to gravity (m/s²)" },
        ],
      },
      authoredExample: {
        prompt:
          "A stone of volume 200 cm³ is fully submerged in water (1000 kg/m³, g = 10 m/s²). Find the buoyant force on it.",
        steps: [
          "Volume displaced = 200 cm³ = \\(200 \\times 10^{-6}\\,\\text{m}^3\\).",
          "\\(F_b = \\rho V_{\\text{disp}} g = 1000 \\times 200 \\times 10^{-6} \\times 10\\).",
          "\\(F_b = 2\\,\\text{N}\\) — independent of the stone's own weight.",
        ],
        answer: "2 N upward.",
      },
      selfCheckExample: {
        prompt:
          "When a body is immersed in a fluid the upthrust equals (1) the mass of the body, or (2) the weight of the fluid displaced by the body. Which is correct?",
        steps: [
          "Archimedes' principle: upthrust = weight of displaced fluid.",
          "It does NOT equal the mass of the body (mass is not even a force).",
          "So statement 2 is correct, statement 1 is wrong.",
        ],
        answer: "Statement 2 only — the weight of the displaced fluid.",
      },
      practiceSet: [
        { prompt: "Buoyant force equals the weight of the ___?", answer: "Fluid displaced by the body" },
        { prompt: "Direction of the buoyant force?", answer: "Upward" },
        { prompt: "Submerge the SAME body deeper (fully immersed already) — does buoyant force change?", answer: "No", method: "displaced volume is unchanged once fully immersed" },
      ],
      pyqExampleId: "d421cdf0-c283-4d2e-883b-c1afa244cc04", // 2025 — upthrust = weight of displaced fluid
      traps: [
        {
          title: "Upthrust = weight of displaced FLUID, not of the body",
          body:
            "The buoyant force depends on the fluid's density and the displaced volume — never on the body's own mass or weight. An option claiming the upthrust equals 'the mass of the body' is wrong on two counts: it is the fluid's weight, and a mass is not a force.",
        },
      ],
    },

    // 4 — apparent weight loss when submerged
    {
      kind: "formula" as const,
      slug: "flu-apparent-weight-loss",
      name: "Apparent weight loss on submersion",
      intuition:
        "Lift a rock under water and it feels lighter — because the water pushes up on it. The scale reading drops by exactly the buoyant force, which is the weight of the water the rock displaces. The rock has not lost any mass; it has gained an upward helper.",
      definition:
        "A body submerged in a fluid weighs **less** on a scale because of the upthrust:\n" +
        "**Apparent weight = true weight − buoyant force** = \\(W - \\rho_{\\text{fluid}} V_{\\text{disp}} g\\).\n" +
        "- The 'loss of weight' equals the buoyant force = weight of displaced fluid.\n" +
        "- The body's true weight (and mass) is unchanged — only the SCALE reading falls.",
      formula: {
        label: "Apparent weight in a fluid",
        latex: "W_{\\text{app}} = W - F_b",
        symbols: [
          { symbol: "\\(W_{\\text{app}}\\)", meaning: "apparent (scale) weight in the fluid (N)" },
          { symbol: "W", meaning: "true weight in air (N)" },
          { symbol: "F_b", meaning: "buoyant force = weight of displaced fluid (N)" },
        ],
      },
      authoredExample: {
        prompt:
          "A metal block weighs 50 N in air. Fully submerged in water it experiences a buoyant force of 8 N. What is its apparent weight in water?",
        steps: [
          "Apparent weight = true weight − buoyant force.",
          "\\(W_{\\text{app}} = 50 - 8 = 42\\,\\text{N}\\).",
          "The block FEELS lighter by 8 N (the weight of water it displaced).",
        ],
        answer: "42 N.",
      },
      selfCheckExample: {
        prompt:
          "An object is weighed in air and then while fully submerged in water. How does its measured weight in water compare with its weight in air?",
        steps: [
          "Under water the upthrust pushes up on the object.",
          "So the scale reads less: apparent weight = true weight − buoyant force.",
          "The measured weight DECREASES.",
        ],
        answer: "It decreases (by the weight of the water displaced).",
      },
      practiceSet: [
        { prompt: "Why does a body weigh less under water?", answer: "Buoyant force pushes up, reducing the scale reading" },
        { prompt: "Loss in weight on submersion equals…", answer: "The weight of fluid displaced (= the buoyant force)" },
        { prompt: "Does the body's true mass change under water?", answer: "No (only the apparent weight)" },
      ],
      pyqExampleId: "4e3212de-4b5f-4102-aa3e-14971785df98", // 2017 — weight decreases when submerged
      traps: [
        {
          title: "Mass is unchanged; only apparent weight drops",
          body:
            "A submerged body does not lose mass or true weight — it only reads lighter on a scale because of the upthrust. The 'loss of weight' is exactly the buoyant force, equal to the weight of the displaced fluid.",
        },
      ],
    },

    // 5 — flotation vs sinking (density comparison)
    {
      kind: "formula" as const,
      slug: "flu-flotation-sinking",
      name: "Float or sink — the density comparison",
      intuition:
        "Whether something floats comes down to one comparison: average density of the body versus density of the fluid. Lighter-per-volume than the fluid, it floats; heavier, it sinks. A solid iron nail sinks, yet an iron ship floats — because the ship's hull traps air, dropping its AVERAGE density below water's.",
      definition:
        "Compare the body's average density \\(\\rho_b\\) with the fluid's density \\(\\rho_f\\):\n" +
        "- \\(\\rho_b < \\rho_f\\) -> the body **floats** (part stays above the surface).\n" +
        "- \\(\\rho_b > \\rho_f\\) -> the body **sinks**.\n" +
        "- \\(\\rho_b = \\rho_f\\) -> it stays in **neutral equilibrium** (just submerged).\n" +
        "For a floating body, **fraction submerged \\(= \\rho_b / \\rho_f\\)** — and the weight of fluid displaced equals the body's full weight.",
      formula: {
        label: "Fraction submerged of a floating body",
        latex: "\\dfrac{V_{\\text{submerged}}}{V_{\\text{total}}} = \\dfrac{\\rho_{\\text{body}}}{\\rho_{\\text{fluid}}}",
        symbols: [
          { symbol: "\\(V_{\\text{submerged}}\\)", meaning: "submerged volume (m³)" },
          { symbol: "\\(V_{\\text{total}}\\)", meaning: "total volume of the body (m³)" },
          { symbol: "\\(\\rho_{\\text{body}}\\)", meaning: "average density of the body" },
          { symbol: "\\(\\rho_{\\text{fluid}}\\)", meaning: "density of the fluid" },
        ],
      },
      authoredExample: {
        prompt:
          "A sealed packet has volume 1 litre and mass 800 g. Will it float or sink in water (1 g/cm³) and in a liquid of density 1.5 g/cm³?",
        steps: [
          "Packet density = \\(800\\,\\text{g} / 1000\\,\\text{cm}^3 = 0.8\\,\\text{g/cm}^3\\).",
          "Water (1.0) and the liquid (1.5) are BOTH denser than 0.8.",
          "A body floats whenever the fluid is denser than the body, so it floats in both.",
        ],
        answer: "It floats in water and in the 1.5 g/cm³ liquid (its 0.8 g/cm³ is less than both).",
      },
      selfCheckExample: {
        prompt:
          "An iron nail sinks in water but an iron ship floats. Which statements are correct? (i) average density of the nail > water; (ii) average density of the ship < water.",
        steps: [
          "The nail is solid iron, density > water, so it sinks — (i) correct.",
          "The ship's hull encloses air, so its AVERAGE density < water, and it floats — (ii) correct.",
          "Both statements are correct.",
        ],
        answer: "Both (i) and (ii) are correct — same metal, different average density.",
      },
      practiceSet: [
        { prompt: "A body sinks when its density is ___ the fluid's.", answer: "Greater than", method: "rho_body > rho_fluid" },
        { prompt: "Float-or-sink depends on what difference?", answer: "Difference in densities of the body and the fluid" },
        { prompt: "A block of RD 0.6 floats in water — what fraction is submerged?", answer: "0.6 (60%)", method: "fraction = rho_body/rho_fluid" },
      ],
      pyqExampleId: "07afef44-bb3d-409f-b537-d8dd3e1d8d8a", // 2022 — packet 0.8 g/cm³ floats in both
      traps: [
        {
          title: "It is AVERAGE density that decides flotation",
          body:
            "Iron sinks, yet an iron ship floats — because the hull traps air and lowers the SHIP's average density below water's. Never reason from the material alone; compare the body's average density with the fluid's.",
        },
      ],
    },

    // 6 — stability of a floating body
    {
      kind: "formula" as const,
      slug: "flu-floating-stability",
      name: "Stability of a floating body — the metacentre",
      intuition:
        "A floating ship can be tilted a little and still right itself — if its 'metacentre' sits above its centre of gravity. When the ship tilts, the centre of buoyancy shifts; the point where the new upthrust line crosses the ship's axis is the metacentre. Above the centre of gravity, the body is stable.",
      definition:
        "Three points govern floating stability:\n" +
        "- **Centre of gravity (G)** — where the body's weight acts.\n" +
        "- **Centre of buoyancy (B)** — the centre of the displaced fluid; the upthrust acts here.\n" +
        "- **Metacentre (M)** — where the upthrust's line meets the body's axis after a small tilt.\n" +
        "**Stable equilibrium** requires the **metacentre to lie ABOVE the centre of gravity** (M above G). It does not require G below B — a tall ship can have G above B and still be stable, as long as M stays above G.",
      authoredExample: {
        prompt:
          "A floating body is in stable equilibrium. What is the correct relationship between its centre of gravity and its metacentre?",
        steps: [
          "Stability is decided by the metacentre M relative to the centre of gravity G.",
          "For a restoring torque on a small tilt, M must lie ABOVE G.",
          "So the centre of gravity is below the metacentre.",
        ],
        answer: "The centre of gravity lies below the metacentre (M above G).",
      },
      selfCheckExample: {
        prompt:
          "A ship is loaded so that its centre of gravity rises above the metacentre after a small tilt. Is its equilibrium stable or unstable?",
        steps: [
          "If G is ABOVE M, a tilt produces a torque that tips it further.",
          "That is the condition for UNSTABLE equilibrium (the ship would capsize).",
          "Stability needs M above G — here it is reversed.",
        ],
        answer: "Unstable — it would tend to capsize.",
      },
      practiceSet: [
        { prompt: "Condition for a floating body to be in stable equilibrium?", answer: "Metacentre above the centre of gravity (M above G)" },
        { prompt: "At which point does the buoyant force act?", answer: "The centre of buoyancy" },
        { prompt: "If the metacentre is below the centre of gravity, the float is…", answer: "Unstable" },
      ],
      pyqExampleId: "8469ec8b-208e-4d7e-bf26-752bb5aaba82", // 2026 — stable: G below the metacentre
      traps: [
        {
          title: "Stability is about M above G, not G below B",
          body:
            "The trap options compare the centre of gravity with the centre of BUOYANCY. Stability is actually decided by the METACENTRE: M must be above G. A floating body can have G above B and still be perfectly stable.",
        },
      ],
    },
  ],
};
