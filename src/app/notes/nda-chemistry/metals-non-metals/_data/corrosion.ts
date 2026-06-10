import type { SubtopicNote } from "@/app/notes/_types";

export const CORROSION_NOTE: SubtopicNote = {
  subtopicName: "Corrosion and Its Prevention",
  title: "Corrosion and Its Prevention",
  oneLineDefinition:
    "Why metals are eaten away by air and moisture — iron rusting, copper turning green — and how galvanization and sacrificial protection stop it.",
  whyItMatters:
    "A steady pocket — about 5 PYQs, one of the chapter's denser subtopics. " +
    "The bank tests which metal corrodes fastest, what the green coat on copper is, and the chemistry behind galvanization (why zinc protects iron even when scratched). " +
    "Most of it is one-line recall once you know zinc is the sacrificial protector.",
  concepts: [
    // what corrosion is + which metals corrode (reference)
    {
      kind: "reference" as const,
      slug: "corrosion-products",
      name: "Corrosion of common metals",
      intuition:
        "Corrosion is the slow eating-away of a metal by air, moisture and gases. Iron rusts fastest of the common metals, forming reddish-brown hydrated iron oxide; copper develops a green coat of basic copper carbonate. Knowing the product and colour for each metal answers most questions here.",
      definition:
        "What forms on each metal:\n" +
        "- **Iron** corrodes (rusts) **rapidly** in moist air to give **hydrated iron(III) oxide** (Fe₂O₃·xH₂O), a reddish-brown flaky layer that does not protect the metal beneath.\n" +
        "- **Copper** in moist air slowly gains a **green coat** of **basic copper carbonate** (a malachite-like patina), not rust.\n" +
        "- **Aluminium** forms a thin, **protective** oxide layer that stops further corrosion (it does not flake off like rust).\n" +
        "- **Silver** tarnishes black (silver sulphide) in air containing sulphur compounds.",
      table: {
        columns: ["Metal", "Corrosion product", "Colour / behaviour"],
        rows: [
          {
            cells: ["Iron", "Hydrated iron(III) oxide (rust)", "Reddish-brown; flakes off — corrodes rapidly"],
            noteAmber: "Of the common metals, iron corrodes the fastest — its rust flakes away and exposes fresh metal.",
          },
          {
            cells: ["Copper", "Basic copper carbonate", "Green coat (patina) in moist air"],
            noteAmber: "The green coat on old copper is basic copper carbonate, NOT copper oxide.",
          },
          { cells: ["Aluminium", "Aluminium oxide", "Thin, protective layer — stops further attack"] },
          { cells: ["Silver", "Silver sulphide", "Black tarnish in sulphur-containing air"] },
        ],
        caption: "Iron rusts (reddish-brown) fastest; copper goes green (basic carbonate); aluminium self-protects.",
      },
      pyqExampleId: "394fcdbe-2c10-4833-80de-cc3fb069f7dd", // which corrodes rapidly — iron
      selfCheckExample: {
        prompt: "An old copper statue has turned green. Name the compound responsible and state whether this is the same process as iron rusting.",
        steps: [
          "The green patina on copper is basic copper carbonate, formed with moist air and carbon dioxide.",
          "Iron rusting forms hydrated iron(III) oxide, a different (reddish-brown) product.",
          "Both are corrosion, but the products and colours differ.",
        ],
        answer: "Basic copper carbonate (a green patina); it is corrosion, but a different product from iron's reddish-brown rust.",
      },
      practiceSet: [
        { prompt: "Which common metal corrodes most rapidly?", answer: "Iron" },
        { prompt: "What is the green coat on copper?", answer: "Basic copper carbonate" },
        { prompt: "What is rust chemically?", answer: "Hydrated iron(III) oxide (Fe₂O₃·xH₂O)" },
        { prompt: "Why does aluminium resist corrosion?", answer: "It forms a thin protective oxide layer" },
      ],
      traps: [
        {
          title: "Copper goes green, iron goes brown",
          body:
            "The **green** coat belongs to **copper** (basic copper carbonate); the reddish-brown flaky layer is **iron** rust. Don't swap the colours or the products.",
        },
      ],
    },

    // prevention — galvanization, sacrificial protection (reference)
    {
      kind: "reference" as const,
      slug: "corrosion-prevention",
      name: "Preventing corrosion — galvanization and sacrificial protection",
      intuition:
        "The standard way to protect iron is to coat it with a more reactive metal, zinc — this is galvanization. Zinc works even when the coating is scratched because it is more electropositive than iron, so it corrodes first and is sacrificed to save the iron underneath. The bank tests both the method name and the reason.",
      definition:
        "How protection works:\n" +
        "- **Galvanization** = coating iron or steel with a **thin layer of zinc** to stop rusting.\n" +
        "- Zinc protects iron because zinc is **more electropositive (more reactive) than iron** — it acts as a **sacrificial anode**, corroding in place of the iron even if the layer is broken.\n" +
        "- Other methods: **painting, oiling/greasing, electroplating** with tin or chromium, and **alloying** (e.g. stainless steel).\n" +
        "- The general rule: connect or coat the object with a metal **higher in the reactivity series** so that metal corrodes first.",
      table: {
        columns: ["Method", "What is applied", "Why it works"],
        rows: [
          {
            cells: ["Galvanization", "Thin layer of zinc", "Zinc is more reactive — sacrifices itself to protect iron"],
            noteAmber: "Zinc protects iron even when scratched because it is more electropositive than iron (sacrificial protection).",
          },
          { cells: ["Painting / oiling", "Paint or grease film", "Keeps air and moisture off the metal"] },
          { cells: ["Electroplating", "Tin or chromium layer", "Inert coating barrier"] },
          { cells: ["Alloying", "Mix with Cr, Ni (stainless steel)", "Forms a corrosion-resistant alloy"] },
        ],
        caption: "Galvanization (zinc coat) is the headline method; zinc works as a sacrificial anode because it is more reactive than iron.",
      },
      pyqExampleId: "34ac9676-7d7f-496f-b2a2-ba711290e42b", // zinc protects iron because more electropositive
      selfCheckExample: {
        prompt: "A galvanized iron sheet gets a deep scratch exposing the iron. Does the iron now rust at the scratch? Explain.",
        steps: [
          "Galvanization coats iron with zinc, which is more reactive (more electropositive) than iron.",
          "At the scratch, zinc still corrodes preferentially, acting as a sacrificial anode.",
          "So the iron is protected even though it is exposed.",
        ],
        answer: "No — the zinc corrodes first (sacrificial protection), so the exposed iron is still protected.",
      },
      practiceSet: [
        { prompt: "What metal is coated on iron during galvanization?", answer: "Zinc" },
        { prompt: "Why does zinc protect iron?", answer: "Zinc is more electropositive (more reactive), so it corrodes first" },
        { prompt: "Name one corrosion-prevention method besides galvanization.", answer: "Painting, oiling, electroplating or alloying" },
        { prompt: "Galvanization protects iron by coating it with a thin layer of which metal?", answer: "Zinc" },
      ],
      traps: [
        {
          title: "Zinc protects because it is MORE reactive",
          body:
            "Zinc does not protect iron by being cheaper or a good conductor — it protects because it is **more electropositive (more reactive) than iron** and is sacrificed first. That is the answer the bank wants.",
        },
      ],
    },
  ],
};
