import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/aromatic-compounds";

export const STRUCTURE_NOTE: SubtopicNote = {
  subtopicName: "Structure, Aromaticity and Identification",
  title: "Aromaticity, Classes of Aromatic Compounds and Natural Sources",
  oneLineDefinition:
    "An aromatic compound has a planar, cyclic, fully conjugated ring with 4n + 2 π electrons; it may be benzenoid (built on a benzene ring) or non-benzenoid (tropone), carbocyclic or heterocyclic (pyrrole, furan, thiophene).",
  whyItMatters:
    "8 PYQs, mostly EASY. Five ask you to classify — which compound is non-benzenoid, which ring holds nitrogen, which drawing is a haloarene, what a drawn salt is called; three ask where a natural aromatic compound comes from. " +
    "Two cards.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetarom-aromaticity-and-classes",
      name: "Aromaticity and the Classes of Aromatic Compounds",
      intuition:
        "Hückel's rule decides aromaticity: a flat ring, every atom conjugated, and 4n + 2 π electrons (6 for benzene). Tropone has no benzene ring but meets the rule, so it is aromatic and non-benzenoid. A lone pair on a ring heteroatom can count towards the six — that is why pyrrole, furan and thiophene are aromatic.",
      definition:
        "- **Hückel's rule**: planar, cyclic, fully conjugated, **(4n + 2) π electrons**.\n" +
        "- **Benzenoid**: contains a benzene ring (aniline, phenol, naphthalene). **Non-benzenoid**: aromatic without one — **tropone**, azulene.\n" +
        "- **Heterocycles** (five-membered): **pyrrole — N**, furan — O, thiophene — S. THF (tetrahydrofuran) is saturated, not aromatic.\n" +
        "- **Haloarene**: halogen bonded **directly to a ring carbon**. X on a CH₂ beside the ring is a benzylic halide; X on a carbon beside a C=C is allylic.\n" +
        "- **C₆H₅SO₃⁻Na⁺** is **sodium benzene sulphonate**.",
      table: {
        columns: ["Compound", "Class"],
        rows: [
          { cells: ["Tropone", "**Non-benzenoid** aromatic"], pyqExampleId: "6e8b1e9c-af1e-4659-bc7a-7215f1f5a015" },
          { cells: ["Aniline, phenol, naphthalene", "Benzenoid aromatic"], pyqExampleId: "22b63e9c-9106-44eb-8bd9-cfbe05872fd5" },
          { cells: ["Pyrrole", "Heterocycle with **N** in the ring"], pyqExampleId: "3827e129-26bb-426c-a9ba-8a0892861680" },
          { cells: ["Halogen on a ring carbon", "**Haloarene**"], pyqExampleId: "86662562-cb13-44fd-b783-a9719de49abb" },
          { cells: ["C₆H₅SO₃Na", "**Sodium benzene sulphonate**"], pyqExampleId: "7dc284be-b814-4155-a0f5-27e7468dd621" },
        ],
      },
      selfCheckExample: {
        prompt: "Which of furan, thiophene, THF and pyrrole has a nitrogen atom in its ring?",
        steps: ["Furan has O, thiophene S, THF O. Pyrrole's ring holds NH."],
        answer: "Pyrrole",
      },
      practiceSet: [
        { prompt: "Which is non-benzenoid aromatic: aniline, tropone, naphthalene, phenol?", answer: "Tropone" },
        { prompt: "C₆H₅CH₂Cl — haloarene or benzylic halide?", answer: "Benzylic halide" },
      ],
      pyqExampleId: "6e8b1e9c-af1e-4659-bc7a-7215f1f5a015",
      traps: [
        {
          title: "Naphthalene as non-benzenoid",
          body: "Naphthalene is two FUSED benzene rings, so it is benzenoid. Non-benzenoid means aromatic with no benzene ring at all — tropone is the paper's answer both times.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetarom-natural-aromatics",
      name: "Aromatic Compounds from Nature",
      intuition: "A recall table: the compound, its natural source, and its use.",
      definition:
        "- **Salicylic acid** — **willow** bark (the parent of aspirin).\n" +
        "- **Eugenol** — **clove** oil.\n" +
        "- **Thymol** — thyme; an **antiseptic**.\n" +
        "- Methyl salicylate — wintergreen; cinnamaldehyde — cinnamon.",
      table: {
        columns: ["Compound", "Source", "Use"],
        rows: [
          { cells: ["Salicylic acid", "**Willow**", "Aspirin"], pyqExampleId: "5f28e6cb-d697-4e07-8cee-750439de25de" },
          { cells: ["Eugenol", "**Clove**", "Flavour, dental analgesic"], pyqExampleId: "3f0cbe9f-4b1c-40d0-a39b-0f8cab7e1832" },
          { cells: ["Thymol", "Thyme", "**Antiseptic**"], pyqExampleId: "e1cd1a89-7c31-4bb2-bdb1-99698474b7c4" },
          { cells: ["Methyl salicylate", "Wintergreen", "Pain-relief rub"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which is an antiseptic: salvarsan, thymol, sulphanilamide, chloramphenicol?",
        steps: ["Salvarsan, sulphanilamide and chloramphenicol are drugs that act inside the body; thymol is applied to kill germs."],
        answer: "Thymol",
      },
      pyqExampleId: "5f28e6cb-d697-4e07-8cee-750439de25de",
    },
  ],
  related: [
    { label: "Substitution on the benzene ring", href: `${BASE}/cetarom-eas` },
  ],
};
