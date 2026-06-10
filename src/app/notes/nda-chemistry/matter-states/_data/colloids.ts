import type { SubtopicNote } from "@/app/notes/_types";

export const COLLOIDS_NOTE: SubtopicNote = {
  subtopicName: "Colloids and Suspensions",
  title: "Colloids and Suspensions",
  oneLineDefinition:
    "Between true solutions (tiny dissolved particles) and suspensions (large settling particles) sit colloids — particles big enough to scatter light (the Tyndall effect) but small enough not to settle; soap in water is a colloid of micelles.",
  whyItMatters:
    "Five PYQs, ranging EASY to HARD — the hardest in the chapter. The bank tests the particle-size ladder (solution → colloid → suspension), the defining properties of a colloid (heterogeneous, Tyndall effect, does not settle, particles invisible to the naked eye), and soap chemistry (micelles, cleansing action, why soap is a carboxylate not an ammonium salt). " +
    "Get the 'colloids are heterogeneous, not homogeneous' fact and the micelle picture, and even the HARD lyotropic-liquid-crystal question follows.",
  concepts: [
    // FOUNDATION — the particle-size ladder + colloid properties (reference)
    {
      kind: "reference" as const,
      slug: "colloid-suspension-properties",
      name: "True solution, colloid and suspension",
      visualizationSlug: "matt-colloid-tyndall",
      intuition:
        "Three mixtures, sorted by particle size. A true solution has particles so small they dissolve and never settle. A suspension has particles so big they settle and can be seen. A colloid is in between — invisible to the eye, never settles on standing, but big enough to scatter a light beam (the Tyndall effect).",
      definition:
        "The particle-size ladder and what distinguishes a colloid:\n" +
        "- **True solution** — particle size **< 1 nm**; **homogeneous**; transparent; **no Tyndall effect**; particles never settle and pass through filter paper (e.g. salt water, copper sulphate solution).\n" +
        "- **Colloid** — particle size **1–1000 nm**; **heterogeneous** (appears uniform but is not); **shows the Tyndall effect** (scatters light); particles **do not settle** on standing but **can be separated by centrifugation**; particles **cannot be seen by the naked eye** (e.g. milk, fog, soap solution).\n" +
        "- **Suspension** — particle size **> 1000 nm**; **heterogeneous**; particles are **visible to the naked eye**, **settle** on standing, and are stopped by filter paper (e.g. muddy water, chalk in water).\n" +
        "- A colloid is **NOT homogeneous** — that is the bank's favourite false statement. Only a true solution is homogeneous.\n" +
        "- **Tyndall effect** = scattering of a light beam by colloidal particles (you see the beam, as with a torch in fog or sunlight through trees). A true solution like copper sulphate shows **no** Tyndall effect; milk does.",
      table: {
        columns: ["Property", "True solution", "Colloid", "Suspension"],
        rows: [
          { cells: ["Particle size", "< 1 nm", "1–1000 nm", "> 1000 nm"] },
          { cells: ["Appearance", "Homogeneous", "Heterogeneous", "Heterogeneous"] },
          { cells: ["Tyndall effect", "No", "Yes", "Yes (if not settled)"] },
          {
            cells: ["Settle on standing?", "No", "No (needs centrifuge)", "Yes"],
            noteAmber: "Colloid particles do NOT settle on their own — but centrifugation can separate them.",
          },
          {
            cells: ["Visible to naked eye?", "No", "No", "Yes"],
            noteAmber: "Colloidal particles cannot be seen by the naked eye — only suspension particles can.",
          },
          { cells: ["Example", "Salt water, CuSO₄ solution", "Milk, fog, soap solution", "Muddy water, chalk in water"] },
        ],
        caption: "Sorted by particle size: solution < colloid < suspension. Only the true solution is homogeneous.",
      },
      pyqExampleId: "4210163a-994e-4297-8eb0-662f03d6ba1c", // colloid NOT true: homogeneous
      selfCheckExample: {
        prompt:
          "Consider: I. Colloids and suspensions are heterogeneous. II. Colloids can be separated by centrifugation. III. Particles of colloids and suspensions can be seen by the naked eye. IV. Copper sulphate solution shows no Tyndall effect but milk does. Which are correct?",
        steps: [
          "I — both colloids and suspensions are heterogeneous: correct.",
          "II — centrifugation separates colloidal particles: correct.",
          "III — colloidal particles CANNOT be seen by the naked eye (only suspension particles can): incorrect.",
          "IV — CuSO₄ is a true solution (no Tyndall); milk is a colloid (Tyndall): correct.",
        ],
        answer: "I, II and IV are correct (III is false).",
      },
      practiceSet: [
        { prompt: "Is a colloid homogeneous or heterogeneous?", answer: "Heterogeneous", method: "only a true solution is homogeneous" },
        { prompt: "What effect lets you tell a colloid from a true solution?", answer: "The Tyndall effect (scattering of light)" },
        { prompt: "Can colloidal particles be seen by the naked eye?", answer: "No" },
        { prompt: "Do colloidal particles settle on standing?", answer: "No", method: "they need centrifugation to separate" },
        { prompt: "Does copper sulphate solution show the Tyndall effect?", answer: "No", method: "it is a true solution; milk (a colloid) does" },
      ],
      traps: [
        {
          title: "A colloid is NOT homogeneous",
          body:
            "The statement 'a colloidal solution is homogeneous in nature' is **false**. Colloids are **heterogeneous** — they only appear uniform. Only a **true solution** is homogeneous.",
        },
        {
          title: "Colloid particles are invisible to the eye",
          body:
            "Colloidal particles **cannot** be seen with the naked eye (they are 1–1000 nm). Only **suspension** particles (> 1000 nm) are visible. Don't accept 'particles of colloids and suspensions can be seen by the naked eye'.",
        },
      ],
    },

    // soaps and micelles (reference)
    {
      kind: "reference" as const,
      slug: "soaps-and-micelles",
      name: "Soaps, micelles and cleansing action",
      intuition:
        "A soap molecule has a water-loving head and an oil-loving tail. In water the tails huddle inward around a drop of dirt and the heads point out — a tiny ball called a micelle. The dirt is trapped inside and washes away. That is the whole cleansing action.",
      definition:
        "Soap chemistry the bank tests:\n" +
        "- A **soap** is the **sodium or potassium salt of a long-chain carboxylic acid** (a carboxylate) — NOT an ammonium salt.\n" +
        "- In water, soap molecules cluster into **micelles**: hydrophobic (oil-loving) tails point inward toward the dirt/oil, hydrophilic (water-loving) heads point outward toward the water.\n" +
        "- **Cleansing action**: oil and dirt are collected in the **centre of the micelle**; the micelle stays suspended and rinses away. Soap works by **lowering the surface tension** of water (and emulsifying oil), letting it wet and lift dirt.\n" +
        "- A soap micelle scatters light (it is colloidal), so soap solution shows the **Tyndall effect**.\n" +
        "- In **hard water**, soap forms an **insoluble precipitate (scum)** with the **Ca²⁺ and Mg²⁺ ions** — which is why soap lathers poorly in hard water.\n" +
        "- (HARD) Soap with water forms a **lyotropic liquid crystal** — an ordered micellar phase whose order depends on **concentration** (solvent), not temperature; the temperature-driven kind is *thermotropic*.",
      table: {
        columns: ["Question asked", "Answer"],
        rows: [
          {
            cells: ["What kind of salt is a soap?", "Sodium/potassium salt of a long-chain carboxylic acid"],
            noteAmber: "A soap is a carboxylate (Na/K salt), NOT an ammonium salt — that is the bank's trap statement.",
          },
          { cells: ["Where does dirt collect?", "In the centre of the micelle"] },
          { cells: ["Principle of cleansing", "Lowering surface tension (and emulsifying oil)"] },
          { cells: ["Does soap solution scatter light?", "Yes — it is colloidal (Tyndall effect)"] },
          { cells: ["What forms in hard water?", "Insoluble precipitate (scum) with Ca²⁺ and Mg²⁺"] },
          {
            cells: ["Soap with water forms…", "A lyotropic liquid crystal"],
            noteAmber: "Lyotropic = order set by concentration/solvent. Thermotropic = order set by temperature. Soap micelles are lyotropic.",
          },
        ],
      },
      pyqExampleId: "6f709094-ea99-419b-9860-e5f0bd8521be", // cleansing action NOT true: ammonium salt
      selfCheckExample: {
        prompt:
          "Which statement about the cleansing action of soap is NOT true? (a) Oil and dirt collect in the centre of the micelle (b) Soap micelles scatter light (c) Soaps are ammonium salts of long-chain carboxylic acids (d) Soap forms an insoluble precipitate with Ca²⁺/Mg²⁺ in hard water.",
        steps: [
          "Dirt does collect in the micelle centre — (a) is true.",
          "Soap micelles are colloidal and scatter light — (b) is true.",
          "Soaps are sodium/potassium (carboxylate) salts, NOT ammonium salts — (c) is the false statement.",
          "Soap does form scum with Ca²⁺/Mg²⁺ in hard water — (d) is true.",
        ],
        answer: "Statement (c) — soaps are sodium/potassium salts of carboxylic acids, not ammonium salts.",
      },
      practiceSet: [
        { prompt: "Soap cleans surfaces based on which principle?", answer: "Surface tension (it lowers the surface tension of water)" },
        { prompt: "A soap is the salt of which acid?", answer: "A long-chain carboxylic acid (a Na/K carboxylate)" },
        { prompt: "Where is oil and dirt collected during washing?", answer: "In the centre of the micelle" },
        { prompt: "What does soap form with Ca²⁺/Mg²⁺ ions in hard water?", answer: "An insoluble precipitate (scum)" },
        { prompt: "Soap with water forms which type of liquid crystal?", answer: "Lyotropic", method: "concentration-driven order, not temperature-driven" },
      ],
      traps: [
        {
          title: "Soap is a carboxylate, not an ammonium salt",
          body:
            "Soaps are **sodium or potassium salts of long-chain carboxylic acids**. The statement that 'soaps are ammonium salts of long-chain carboxylic acids' is the **NOT true** one.",
        },
        {
          title: "Lyotropic, not thermotropic",
          body:
            "Soap in water forms a **lyotropic** liquid crystal — its order depends on **concentration** (the solvent). A **thermotropic** liquid crystal's order depends on temperature; that is the wrong choice for soap.",
        },
      ],
    },
  ],
};
