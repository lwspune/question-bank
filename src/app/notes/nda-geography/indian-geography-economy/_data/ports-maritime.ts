import type { SubtopicNote } from "@/app/notes/_types";

export const PORTS_MARITIME_NOTE: SubtopicNote = {
  subtopicName: "Ports and Maritime Infrastructure",
  title: "Ports and Maritime Infrastructure",
  oneLineDefinition:
    "India's major ports — their old names, their coast and state, their natural-vs-artificial character, and the satellite terminals built to relieve them.",
  whyItMatters:
    "About 8 PYQs, almost all MODERATE recall. The reliable earners are the renamed ports (Deendayal = old Kandla, Kamarajar = old Ennore), each port's coast/state, and the natural-vs-artificial descriptions used in 'identify the port' questions. Memorise the old-name pairs and the signature description of each major port.",
  concepts: [
    // 1. FOUNDATION — port renamings + state (reference)
    {
      kind: "reference" as const,
      slug: "port-names-states",
      name: "Major ports — old names, states and coasts",
      intuition:
        "Two recurring threads: the RENAMINGS and the COAST/STATE. Deendayal Port is the old Kandla Port (Gujarat, west coast). Kamarajar Port is the old Ennore Port (Tamil Nadu, east coast) — built to handle Chennai's thermal coal, and a corporatized public company (an artificial, not a natural, port). Knowing the old name and the home state answers most port questions outright.",
      definition:
        "- **Deendayal Port** = formerly **Kandla Port**, in **Gujarat** (west coast).\n" +
        "- **Kamarajar Port** = formerly **Ennore Port**, in **Tamil Nadu** (east coast); built for Chennai's thermal coal; a **corporatized public company** and an **artificial** port (NOT natural).\n" +
        "- **Mumbai (JNPT)** lies on the west coast; **Visakhapatnam, Chennai, Paradip, Kolkata** on the east.",
      table: {
        columns: ["Port (new name)", "Old name", "State / coast"],
        rows: [
          {
            cells: ["**Deendayal**", "Kandla", "Gujarat, west coast"],
            noteAmber: "NDA 2023 — Deendayal Port was earlier Kandla.",
          },
          {
            cells: ["**Kamarajar**", "Ennore", "Tamil Nadu, east coast"],
            noteAmber: "NDA 2026 — Kamarajar is corporatized + ex-Ennore, but NOT a natural port.",
          },
          { cells: ["Jawaharlal Nehru (JNPT)", "Nhava Sheva", "Maharashtra, west coast"] },
        ],
      },
      selfCheckExample: {
        prompt: "Kamarajar Port, built for Chennai's thermal coal, lies on which coast and in which state?",
        steps: [
          "Kamarajar (formerly Ennore) serves the Chennai region.",
          "Chennai is in Tamil Nadu on the eastern (Coromandel) coast.",
        ],
        answer: "The east coast, in Tamil Nadu.",
      },
      practiceSet: [
        { prompt: "Deendayal Port is in which state?", answer: "Gujarat" },
        { prompt: "Kamarajar Port was earlier called?", answer: "Ennore Port" },
        { prompt: "On which coast is Kamarajar Port?", answer: "East coast (Tamil Nadu)" },
      ],
      pyqExampleId: "0478860e-0426-4bed-8e69-5023c0133afc", // Deendayal earlier Kandla
      traps: [
        {
          title: "Kamarajar is artificial, not natural",
          body:
            "In multi-statement Kamarajar questions, 'it is a corporatized public company' and 'earlier known as Ennore' are both correct, but 'it is a natural port' is the FALSE clause — Kamarajar/Ennore is an artificial port.",
        },
      ],
    },

    // 2. port character + identification (reference)
    {
      kind: "reference" as const,
      slug: "port-character",
      name: "Identifying ports by their character",
      intuition:
        "'Identify the port' questions hand you a description; each major port has a signature. COCHIN — a natural harbour on the west coast, protected by a breakwater and a mole, with a deep ~14 m draft channel. MUMBAI — the biggest port. VISAKHAPATNAM — a land-locked (natural inner) harbour, oldest on the east coast. KOLKATA — a riverine (riverside) port; MORMUGAO — at the entrance of an estuary; PARADIP — in the delta region. Match the description to the signature.",
      definition:
        "- **Cochin** — natural harbour on the **west coast**, protected by a **breakwater + mole**, deep ~14 m draft channel.\n" +
        "- **Mumbai** — the biggest port of India; also called the 'Queen of the Arabian Sea'.\n" +
        "- **Visakhapatnam** — a **land-locked** (sheltered inner) harbour, oldest on the east coast.\n" +
        "- **Kolkata** — a **riverside** (riverine) port; **Mormugao** — at the **entrance of an estuary**; **Paradip** — in the **delta region**.\n" +
        "- **Vadinar** offshore terminal was developed to relieve **Kandla (Deendayal)** Port.",
      table: {
        columns: ["Port", "Signature description"],
        rows: [
          {
            cells: ["**Cochin**", "West-coast natural harbour; breakwater + mole; ~14 m draft"],
            noteAmber: "NDA 2024 — this description identifies Cochin Port.",
          },
          { cells: ["Mumbai", "Biggest port; Queen of the Arabian Sea"] },
          { cells: ["Visakhapatnam", "Land-locked harbour; oldest on east coast"] },
          {
            cells: ["Vadinar terminal relieves", "Kandla (Deendayal) Port"],
            noteAmber: "NDA 2025 — Vadinar reduces pressure on Kandla.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "The Vadinar offshore terminal was developed to reduce pressure on which major Indian port?",
        steps: [
          "Vadinar lies on the Gulf of Kutch in Gujarat.",
          "It relieves the nearby Kandla (Deendayal) Port.",
        ],
        answer: "Kandla (Deendayal) Port.",
      },
      practiceSet: [
        { prompt: "Which is the biggest port of India?", answer: "Mumbai" },
        { prompt: "Vadinar offshore terminal relieves which port?", answer: "Kandla (Deendayal)" },
        { prompt: "Which port is the oldest on the east coast (land-locked harbour)?", answer: "Visakhapatnam" },
      ],
      pyqExampleId: "53131cf8-ad64-49db-9ed9-5127148ec6eb", // west-coast natural harbour = Cochin
    },
  ],
};
