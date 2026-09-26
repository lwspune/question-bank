import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/modern-periodic-table";

export const TRENDS_NOTE: SubtopicNote = {
  subtopicName: "Periodic Trends",
  title: "Periodic Trends: Radius, Ionisation Enthalpy, Electron Gain and Electronegativity",
  oneLineDefinition:
    "Across a period the nuclear charge grows and the shell stays the same, so atoms shrink and hold their electrons harder; down a group a new shell is added, so atoms grow and hold them less — every trend in the chapter follows from those two facts.",
  whyItMatters:
    "10 PYQs, two MODERATE. Six rank ionisation enthalpy, electron gain enthalpy or electronegativity; four rank atomic or ionic radius or name a diagonal pair. " +
    "Two cards.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetmpt-size-trends",
      name: "Atomic and Ionic Radius, and the Diagonal Relationship",
      intuition:
        "Size grows down a group because each period adds a shell, and falls across a period because more protons pull the same shell in. An element and the one diagonally below-right of it end up with similar size and charge density, so they behave alike.",
      definition:
        "- **Down a group: radius increases** — Li⁺ < Na⁺ < K⁺ < **Rb⁺**.\n" +
        "- **Across a period: radius decreases** — Mg < Na in period 3.\n" +
        "- Combining both: **Mg < Na < K < Rb**.\n" +
        "- A period-4 element is bigger than its period-3 neighbour: [Ar]3d¹⁰4s²4p⁴ (Se) > [Ne]3s²3p⁴ (S); in the same period, p⁴ > p⁵.\n" +
        "- **Diagonal pairs**: **Li–Mg**, Be–Al, B–Si.",
      table: {
        columns: ["Question", "Answer"],
        rows: [
          { cells: ["Largest of [Ne]3p⁴, [Ne]3p⁵, [Ar]4p⁴, [Ar]4p⁵", "**[Ar]3d¹⁰4s²4p⁴**"], pyqExampleId: "f6717b3a-e1b9-42bd-bfe8-fedb0b8a64c0" },
          { cells: ["Largest M⁺ of Rb, K, Na, Li", "**Rb⁺**"], pyqExampleId: "e3868eb6-f355-410e-ad7d-756944fddb5b" },
          { cells: ["Increasing radius of Na, K, Mg, Rb", "**Mg < Na < K < Rb**"], pyqExampleId: "ead075ba-ad41-4dbd-8cf2-cc5bc1cb818c" },
          { cells: ["Diagonal partner of Mg", "**Li**"], pyqExampleId: "1ad5eb82-e9f3-4e0a-b6ff-473a01146416" },
        ],
      },
      selfCheckExample: {
        prompt: "Which element in the +1 state has the largest ionic radius: Rb, K, Na, Li?",
        steps: ["Same group, same charge: the lowest one has the most shells."],
        answer: "Rb",
      },
      pyqExampleId: "f6717b3a-e1b9-42bd-bfe8-fedb0b8a64c0",
    },
    {
      kind: "reference" as const,
      slug: "cetmpt-energy-trends",
      name: "Ionisation Enthalpy, Electron Gain and Electronegativity",
      intuition:
        "All three measure how tightly an atom holds electrons, so all three rise across a period and fall down a group. The exceptions are about filled shells: a noble gas has the highest ionisation enthalpy in its period but will not accept an extra electron, so its electron gain enthalpy is positive.",
      definition:
        "- **Ionisation enthalpy**: increases across, decreases down. **He** is the highest of all. Ne > Ar (down the group), **Cl > S** (across).\n" +
        "- **Electron gain enthalpy**: noble gases **positive** (Ne, Ar …); halogens most negative.\n" +
        "- **Electronegativity**: increases across, decreases down. In group 1 **Li** is highest; among O, S, F, Cl, **S** is lowest.",
      table: {
        columns: ["Question", "Answer"],
        rows: [
          { cells: ["Highest ΔᵢH₁ of He, Ar, Cl, I", "**He**"], pyqExampleId: "47dc2361-049f-47d0-82c8-ad4a239d39ac" },
          { cells: ["Decreasing ΔᵢH of Ne, Ar, Cl, S", "**Ne > Ar > Cl > S**"], pyqExampleId: "c9c89ae6-5721-49dd-8a12-ff66c0fb4b2d" },
          { cells: ["Positive electron gain enthalpy", "**Ne**"], pyqExampleId: "e882006b-55ce-49f5-b9b0-9e590e410544" },
          { cells: ["Highest electronegativity in group 1", "**Li**"], pyqExampleId: "7b77b86a-4069-4acf-9293-f9600d581fb2" },
          { cells: ["Lowest electronegativity of O, S, F, Cl", "**S**"], pyqExampleId: "011bd4c1-8573-4c8f-b84d-f99ef3b67805" },
        ],
      },
      selfCheckExample: {
        prompt: "Put Ne, Ar, Cl, S in decreasing order of ionisation enthalpy.",
        steps: [
          "Noble gases first: Ne above Ar because Ne is smaller.",
          "Then Cl above S — across period 3, ionisation enthalpy rises.",
        ],
        answer: "Ne > Ar > Cl > S",
      },
      practiceSet: [
        { prompt: "Highest electronegativity: Li, Na, K, Rb?", answer: "Li" },
      ],
      pyqExampleId: "c9c89ae6-5721-49dd-8a12-ff66c0fb4b2d",
      traps: [
        {
          title: "Argon above neon",
          body: "Both are noble gases, but ionisation enthalpy falls down the group. Neon's outer electrons are closer to the nucleus: Ne > Ar.",
        },
      ],
    },
  ],
  related: [
    { label: "Position in the periodic table", href: `${BASE}/cetmpt-position` },
    { label: "Groups 1 and 2", href: "/notes/mht-cet-chemistry/elements-of-group-1-and-2" },
  ],
};
