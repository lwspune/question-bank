import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/aromatic-compounds";

export const EAS_NOTE: SubtopicNote = {
  subtopicName: "Electrophilic Aromatic Substitution",
  title: "Electrophilic Substitution: the Reactions and Where the Group Goes",
  oneLineDefinition:
    "Benzene keeps its aromatic ring by substituting rather than adding: an electrophile (Cl⁺, NO₂⁺, R⁺, RCO⁺, HCO⁺) replaces a ring H, and a group already on the ring decides whether the new one goes ortho/para or meta.",
  whyItMatters:
    "12 PYQs, none HARD. Seven are about direction — which group is ortho/para directing, which starting compound gives a stated o/p pair, how much para product forms; five are about the reactions and their reagents — Gattermann–Koch, iodination, hexachlorobenzene. " +
    "Two cards.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetarom-eas-reactions",
      name: "The Substitution Reactions and Their Reagents",
      intuition:
        "Every reaction here is the same three steps: make an electrophile with a Lewis acid, let it attack the ring to form a σ-complex, lose H⁺ to get the ring back. So the thing to learn for each is the reagent pair that makes the electrophile.",
      definition:
        "- **Halogenation**: X₂ / FeX₃ or anhydrous AlCl₃. Excess Cl₂ gives **hexachlorobenzene, C₆Cl₆**.\n" +
        "- **Iodination is reversible** — the HI formed reduces iodobenzene back — so it is not done directly.\n" +
        "- **Nitration**: conc. HNO₃ + conc. H₂SO₄ (NO₂⁺).\n" +
        "- **Friedel–Crafts**: RCl or RCOCl with **anhydrous AlCl₃**.\n" +
        "- **Gattermann–Koch**: **CO + HCl, anhydrous AlCl₃**, pressure → **benzaldehyde**.",
      table: {
        columns: ["Reaction", "Reagent", "Product from benzene"],
        rows: [
          { cells: ["Gattermann–Koch formylation", "**CO, HCl / anhyd. AlCl₃**", "C₆H₅CHO"], pyqExampleId: "38225600-b71e-401f-8071-8dfe92b8107d" },
          { cells: ["Exhaustive chlorination", "Excess Cl₂ / AlCl₃", "**C₆Cl₆**"], pyqExampleId: "5068fc49-2767-4000-b781-6b63642f0719" },
          { cells: ["Iodination", "I₂", "**Not possible** — reversible"], pyqExampleId: "d2f85109-6a38-4dc8-a6df-a81b4460db3b" },
          { cells: ["Friedel–Crafts alkylation", "CH₃Cl / anhyd. AlCl₃", "Toluene"] },
          { cells: ["Nitration", "conc. HNO₃ + conc. H₂SO₄", "Nitrobenzene"] },
        ],
      },
      selfCheckExample: {
        prompt: "Benzene with CO and HCl over anhydrous AlCl₃ under pressure gives?",
        steps: ["Gattermann–Koch: formyl group onto the ring."],
        answer: "Benzaldehyde, C₆H₅CHO",
      },
      practiceSet: [
        { prompt: "Molecular formula of hexachlorobenzene?", answer: "C₆Cl₆" },
        { prompt: "Which halogenation of benzene is not possible directly because it is reversible?", answer: "Iodination" },
      ],
      pyqExampleId: "b391109d-adb0-4a1e-9a1e-762b7b49b068",
      traps: [
        {
          title: "Hexachlorobenzene as C₆H₆Cl₆",
          body: "C₆H₆Cl₆ is benzene hexachloride (BHC), made by ADDITION of Cl₂ in UV light. Hexachlorobenzene is SUBSTITUTION of all six H: C₆Cl₆.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetarom-directing-effects",
      name: "Directing Effects: Ortho/Para or Meta",
      intuition:
        "A group that pushes electrons into the ring (–OH, –OCH₃, –NH₂, –CH₃, and the halogens through their lone pairs) makes the ortho and para positions richest, so the new group goes there — with para usually the major product because it is less crowded. A group that pulls electrons out (–NO₂, –CHO, –COOH, –CN) leaves meta the least deactivated.",
      definition:
        "- **o/p directors**: –OH, –OCH₃, –NH₂, –R, **–X** (halogens deactivate but still direct o/p).\n" +
        "- **m directors**: –NO₂, –CHO, –COOH, –COR, –CN, –SO₃H.\n" +
        "- **Para is the major product**: chlorobenzene + Cl₂ → **1,4-dichlorobenzene**; anisole + Br₂/AcOH → **p-bromoanisole ~90%**.\n" +
        "- **Working backwards**: 2- and 4-substituted products from CH₃Cl or CH₃COCl → the start was **chlorobenzene**.\n" +
        "- **Phenol + conc. HNO₃/H₂SO₄** → **2,4,6-trinitrophenol** (picric acid) — –OH activates all three positions.",
      table: {
        columns: ["Start", "Reagent", "Major product"],
        rows: [
          { cells: ["Chlorobenzene", "Cl₂ / AlCl₃", "**1,4-dichlorobenzene**"], pyqExampleId: "c602dce1-b9d4-4013-a0f4-b669d9ae66f7" },
          { cells: ["Anisole", "Br₂ in acetic acid", "**p-bromoanisole (90%)**"], pyqExampleId: "a67a66e8-b91c-49e0-bcd6-22a20bcedb27" },
          { cells: ["Chlorobenzene", "CH₃Cl / anhyd. AlCl₃", "2- and 4-chlorotoluene"], pyqExampleId: "ea1e4728-2454-4f66-bdcf-431c07756ef6" },
          { cells: ["Chlorobenzene", "CH₃COCl / anhyd. AlCl₃", "2- and 4-chloroacetophenone"], pyqExampleId: "56f1f5be-1590-444a-87cc-51707dde3333" },
          { cells: ["Phenol", "conc. HNO₃ / conc. H₂SO₄", "**2,4,6-trinitrophenol**"], pyqExampleId: "3343d5aa-ab9a-4727-b048-2b050daeec7e" },
        ],
      },
      selfCheckExample: {
        prompt: "Which is ortho/para directing: –NO₂, –OH, –COOH, –CHO?",
        steps: ["–OH donates its lone pair into the ring; the other three withdraw electrons."],
        answer: "–OH",
      },
      practiceSet: [
        { prompt: "A + CH₃Cl (anhyd. AlCl₃) → 2-chlorotoluene + 4-chlorotoluene. A?", answer: "Chlorobenzene" },
        { prompt: "Phenol with conc. HNO₃ and conc. H₂SO₄ gives?", answer: "2,4,6-Trinitrophenol (picric acid)" },
      ],
      pyqExampleId: "8ee7ee22-f780-495b-8750-f52d961abd09",
      traps: [
        {
          title: "Toluene as the starting compound",
          body: "Toluene with CH₃Cl gives xylenes, and with anything it cannot give a CHLORO product. The chlorine in both products must have been on the ring already — the start is chlorobenzene.",
        },
        {
          title: "Mononitration of phenol",
          body: "Dilute HNO₃ gives o- and p-nitrophenol. With CONCENTRATED HNO₃ and H₂SO₄ all three activated positions are nitrated.",
        },
      ],
    },
  ],
  related: [
    { label: "Aromaticity and the classes", href: `${BASE}/cetarom-structure` },
    { label: "Side-chain oxidation and other reactions", href: `${BASE}/cetarom-transformations` },
  ],
};
