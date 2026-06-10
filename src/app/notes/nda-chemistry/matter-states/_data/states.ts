import type { SubtopicNote } from "@/app/notes/_types";

export const STATES_NOTE: SubtopicNote = {
  subtopicName: "States of Matter, Phase Changes and Diffusion",
  title: "States of Matter, Phase Changes and Diffusion",
  oneLineDefinition:
    "Matter exists as solid, liquid or gas depending on how tightly its particles are held; adding or removing heat moves it between these states through six named phase changes, and particles spread on their own by diffusion.",
  whyItMatters:
    "The foundation subtopic and a reliable scorer — 7 PYQs, almost every year. " +
    "The bank tests three things: the properties of the three states (and which elements are liquid at room temperature), the names of the six phase changes (deposition and sublimation are the favourites), and the meaning of diffusion. Dry ice as a sublimation example shows up almost every other year. Learn the phase-change hexagon and the dry-ice fact and most of this subtopic is automatic.",
  concepts: [
    // FOUNDATION — the three states (reference)
    {
      kind: "reference" as const,
      slug: "three-states-of-matter",
      name: "The three states of matter",
      intuition:
        "Everything around you is one of three states. The difference is only how tightly the particles are packed and how freely they move: locked in place (solid), touching but sliding (liquid), or far apart and flying free (gas). Heating loosens the packing; cooling tightens it.",
      definition:
        "The three states and their particle picture:\n" +
        "- **Solid** — particles packed close in a fixed pattern, vibrating in place. **Fixed shape and fixed volume**; nearly incompressible.\n" +
        "- **Liquid** — particles close but free to move past one another. **Fixed volume but no fixed shape** (takes the shape of its container); nearly incompressible.\n" +
        "- **Gas** — particles far apart, moving fast and randomly. **No fixed shape and no fixed volume** (fills the container); highly compressible.\n" +
        "- At room temperature (about 25 °C) and normal pressure, only **two elements are liquid**: **mercury (Hg)** and **bromine (Br₂)**. Gallium (melts at 30 °C) and caesium (melts at 28 °C) are solids at 25 °C but melt in a warm hand.",
      table: {
        columns: ["State", "Shape", "Volume", "Compressibility"],
        rows: [
          { cells: ["Solid", "Fixed", "Fixed", "Almost none"] },
          { cells: ["Liquid", "Takes container's shape", "Fixed", "Almost none"] },
          { cells: ["Gas", "Takes container's shape", "Fills container", "High"] },
          {
            cells: ["Liquid elements at 25 °C", "—", "—", "—"],
            noteAmber: "Only mercury (Hg) and bromine (Br₂) are liquid at room temperature and normal pressure. Gallium and caesium are solids at 25 °C (they melt only just above it).",
          },
        ],
        caption: "Solid = fixed shape + fixed volume; Liquid = fixed volume only; Gas = neither.",
      },
      pyqExampleId: "af7ca3ec-bdc4-46f1-9461-4e7cb42e5e45", // mercury and bromine liquid at room temp
      selfCheckExample: {
        prompt: "Which two elements are liquid at room temperature (about 25 °C) and normal pressure?",
        steps: [
          "Mercury (Hg) melts at about −39 °C, so it is liquid at 25 °C.",
          "Bromine (Br₂) melts at about −7 °C, so it is liquid at 25 °C.",
          "Gallium melts at 30 °C and caesium at 28 °C — both are solid at 25 °C.",
        ],
        answer: "Mercury and bromine.",
      },
      practiceSet: [
        { prompt: "Which state of matter has a fixed volume but no fixed shape?", answer: "Liquid" },
        { prompt: "Which state of matter is highly compressible?", answer: "Gas" },
        { prompt: "Name the only two elements that are liquid at room temperature.", answer: "Mercury and bromine" },
        { prompt: "Does a gas have a fixed volume?", answer: "No", method: "a gas fills its container completely" },
      ],
      traps: [
        {
          title: "Gallium is a solid at room temperature",
          body:
            "Gallium feels like it should be liquid (it melts in your hand at 30 °C), but at room temperature (25 °C) it is a **solid**. The only elements liquid at 25 °C are **mercury and bromine**.",
        },
      ],
    },

    // phase changes (reference)
    {
      kind: "reference" as const,
      slug: "phase-changes",
      name: "The six phase changes",
      intuition:
        "Heating and cooling move matter between the three states. There are six named transitions — one each way between every pair of states. The two that students forget are the direct solid↔gas pair: sublimation (solid → gas) and deposition (gas → solid).",
      definition:
        "The six interconversions of state:\n" +
        "- **Melting (fusion)** — solid → liquid (add heat).\n" +
        "- **Freezing (solidification)** — liquid → solid (remove heat).\n" +
        "- **Vaporisation (boiling/evaporation)** — liquid → gas (add heat).\n" +
        "- **Condensation** — gas → liquid (remove heat).\n" +
        "- **Sublimation** — solid → gas **directly**, skipping liquid (e.g. dry ice, camphor, naphthalene, iodine, anthracene).\n" +
        "- **Deposition** — gas → solid **directly**, skipping liquid (e.g. sulphur vapour forming a crust on rocks; frost forming on a cold surface).\n\n" +
        "Two sub-points the bank loves:\n" +
        "- **Boiling is a bulk phenomenon** (happens throughout the liquid at the boiling point), but **evaporation is a surface phenomenon** (happens only at the surface, at any temperature).\n" +
        "- All phase changes between states of the same substance are **physical changes** — no new substance forms.",
      table: {
        columns: ["Phase change", "Direction", "Heat", "Example"],
        rows: [
          { cells: ["Melting", "Solid → liquid", "Absorbed", "Ice → water"] },
          { cells: ["Freezing", "Liquid → solid", "Released", "Water → ice"] },
          { cells: ["Vaporisation", "Liquid → gas", "Absorbed", "Water → steam"] },
          { cells: ["Condensation", "Gas → liquid", "Released", "Steam → water droplets"] },
          {
            cells: ["Sublimation", "Solid → gas", "Absorbed", "Dry ice → CO₂ gas; camphor"],
            noteAmber: "Sublimation skips the liquid state entirely — solid goes straight to gas.",
          },
          {
            cells: ["Deposition", "Gas → solid", "Released", "Sulphur vapour → solid crust; frost"],
            noteAmber: "Deposition is the reverse of sublimation: gas straight to solid, no liquid.",
          },
        ],
        caption: "Sublimation and deposition are the direct solid↔gas pair, skipping liquid.",
      },
      pyqExampleId: "5fa39f26-42b3-4792-964f-8aba0edbc6d3", // sulphur crust = deposition
      selfCheckExample: {
        prompt:
          "Vapours of sulphur escaping from a volcano form a solid crust on the rocks. Name the phase change, and state how it differs from condensation.",
        steps: [
          "The sulphur goes from gas straight to solid, with no liquid stage.",
          "Gas → solid directly is deposition.",
          "Condensation is gas → liquid, so it is different: deposition skips the liquid state.",
        ],
        answer: "Deposition (gas → solid directly). Condensation, by contrast, is gas → liquid.",
      },
      practiceSet: [
        { prompt: "Name the phase change from solid directly to gas.", answer: "Sublimation" },
        { prompt: "Name the phase change from gas directly to solid.", answer: "Deposition" },
        { prompt: "Is boiling a surface or a bulk phenomenon?", answer: "Bulk", method: "it happens throughout the liquid; evaporation is the surface one" },
        { prompt: "Liquid → solid is called?", answer: "Freezing (solidification)" },
        { prompt: "Frost forming on a cold window is which phase change?", answer: "Deposition" },
      ],
      traps: [
        {
          title: "Boiling is bulk, evaporation is surface",
          body:
            "The correct statement is: **boiling is a bulk phenomenon** (throughout the liquid, only at the boiling point) but **evaporation is a surface phenomenon** (only at the surface, at any temperature). Any statement that swaps these two, or calls both 'surface' or both 'bulk', is wrong.",
        },
        {
          title: "Deposition ≠ condensation",
          body:
            "A gas turning into a **solid** directly is **deposition**, not condensation. Condensation is gas → **liquid**. The sulphur-crust and frost examples are deposition.",
        },
      ],
    },

    // dry ice (reference)
    {
      kind: "reference" as const,
      slug: "dry-ice",
      name: "Dry ice — solid carbon dioxide",
      intuition:
        "'Dry ice' is the bank's single most-repeated fact in this chapter. It is solid carbon dioxide, not frozen water — and it is 'dry' because it sublimes (solid → gas) with no wet liquid stage in between.",
      definition:
        "Everything the bank asks about dry ice:\n" +
        "- **Dry ice is solid carbon dioxide (CO₂)** — NOT frozen water.\n" +
        "- It **sublimes**: solid CO₂ → CO₂ gas directly, leaving no liquid (hence 'dry').\n" +
        "- Used as a **refrigerant** and to make **stage mist**: the cold CO₂ gas chills the air, condensing atmospheric water vapour into a visible fog. (The dry ice itself sublimes; the visible mist is water vapour condensing.)",
      table: {
        columns: ["Question asked", "Answer"],
        rows: [
          { cells: ["What is dry ice?", "Solid carbon dioxide (CO₂)"] },
          { cells: ["Is dry ice frozen water?", "No — it is solid CO₂"] },
          {
            cells: ["Phase change when dry ice 'disappears'", "Sublimation (solid → gas)"],
            noteAmber: "Dry ice never melts to a liquid at normal pressure — it sublimes straight to gas.",
          },
          { cells: ["Why mist forms on a stage", "Cold CO₂ gas condenses atmospheric water vapour"] },
        ],
      },
      pyqExampleId: "83c7ea7a-f030-46ac-bc97-b33251e8d8d7", // dry ice on stage = sublimation
      practiceSet: [
        { prompt: "Dry ice is the solid form of which compound?", answer: "Carbon dioxide (CO₂)" },
        { prompt: "What phase change does dry ice undergo at normal pressure?", answer: "Sublimation (solid → gas)" },
        { prompt: "Is dry ice frozen water?", answer: "No", method: "it is solid carbon dioxide" },
      ],
      traps: [
        {
          title: "Dry ice is CO₂, not ice",
          body:
            "Dry ice is solid **carbon dioxide**, not frozen water. It sublimes (solid → gas) with no liquid stage — that is why it is called 'dry'.",
        },
      ],
    },

    // diffusion (reference)
    {
      kind: "reference" as const,
      slug: "diffusion",
      name: "Diffusion",
      intuition:
        "Particles are always moving, so two substances placed together mix on their own without any stirring — a smell spreading across a room, a drop of ink colouring a glass of water. That spontaneous intermixing is diffusion.",
      definition:
        "Key facts about diffusion:\n" +
        "- **Diffusion** is the **spontaneous intermixing of the particles of two different types of matter** on their own (no stirring needed).\n" +
        "- It happens because particles are in **constant random motion**.\n" +
        "- **Rate of diffusion: gas > liquid > solid** — faster where particles move more freely. (Solids barely diffuse at all.)\n" +
        "- Diffusion is **faster at higher temperature** (particles move faster).",
      table: {
        columns: ["State", "Diffusion rate", "Everyday example"],
        rows: [
          { cells: ["Gas", "Fastest", "Perfume smell spreading across a room"] },
          { cells: ["Liquid", "Moderate", "Ink drop colouring water"] },
          {
            cells: ["Solid", "Slowest (negligible)", "Two metals welded together over years"],
            noteAmber: "Solids diffuse extremely slowly because their particles are locked in place.",
          },
        ],
        caption: "Diffusion is fastest in gases, slowest in solids, and faster when hotter.",
      },
      pyqExampleId: "7a2596bc-1745-4e9a-9793-47c945622356", // intermixing of particles = diffusion
      practiceSet: [
        { prompt: "What is the spontaneous intermixing of particles of two substances called?", answer: "Diffusion" },
        { prompt: "In which state is diffusion fastest?", answer: "Gas" },
        { prompt: "Does diffusion get faster or slower at higher temperature?", answer: "Faster", method: "particles move faster when hotter" },
      ],
    },
  ],
};
