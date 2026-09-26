import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/modern-periodic-table";

export const POSITION_NOTE: SubtopicNote = {
  subtopicName: "Position in Periodic Table and Electronic Configuration",
  title: "Locating an Element: Period, Group and Block from the Configuration",
  oneLineDefinition:
    "An element's period is the highest shell number in its configuration, its block is the subshell that receives the last electron, and its group follows from how many electrons sit in the outer s, p and (n−1)d subshells.",
  whyItMatters:
    "8 PYQs, all but one EASY. Four name an element from its group and period or give the position of one, four go from a configuration to a group or block. " +
    "Two cards.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetmpt-group-period-lookup",
      name: "Group and Period of an Element",
      intuition:
        "Group 1 and group 2 are easy to count down: Li, Na, K, Rb, Cs and Be, Mg, Ca, Sr, Ba, with period 2 at the top. For a d-block element add the (n−1)d and ns electrons: copper, 3d¹⁰4s¹, is period 4 and group 11.",
      definition:
        "- **Period = highest n** in the configuration.\n" +
        "- **s-block**: group = number of s electrons (1 or 2). **p-block**: group = 10 + (s + p electrons). **d-block**: group = (n−1)d + ns electrons.\n" +
        "- **Period 5**: Rb (group 1), **Sr (group 2)**; Cs and Ba are period 6.\n" +
        "- **Group 17**: F, Cl, Br, I, **At**. **Cu**: group 11, period 4.",
      table: {
        columns: ["Element", "Group", "Period"],
        rows: [
          { cells: ["Rubidium", "**1**", "**5**"], pyqExampleId: "c714b1b2-ed7f-478b-9130-9919d6a4941d" },
          { cells: ["Strontium", "**2**", "**5**"], pyqExampleId: "698148e5-b2be-496d-b0a4-29960acfb341" },
          { cells: ["Copper", "**11**", "**4**"], pyqExampleId: "2d238326-138e-44ae-a249-2b63f0242111" },
          { cells: ["Astatine", "**17**", "6"], pyqExampleId: "3bab3191-e079-43d5-8ce9-f08bdb3ea6ca" },
          { cells: ["Caesium, barium", "1, 2", "6"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which element is in group 2 and period 5: rubidium, strontium, caesium, barium?",
        steps: ["Group 2 down from Be: Be (2), Mg (3), Ca (4), Sr (5)."],
        answer: "Strontium",
      },
      pyqExampleId: "2d238326-138e-44ae-a249-2b63f0242111",
      traps: [
        {
          title: "Copper in period 3",
          body: "The d-block starts in period 4 (Sc to Zn). Copper, 3d¹⁰4s¹, has its highest shell n = 4, so it is period 4, group 11.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetmpt-configuration-to-block",
      name: "From a General Configuration to the Group or Block",
      intuition:
        "Read only the outer shell. ns¹ is group 1, ns²np⁴ group 16. An element that gains two electrons to reach a noble-gas configuration must have been two short — group 16. And the block is wherever the last electron went: (n−1)d means a d-block metal.",
      definition:
        "- **ns¹**: group 1 (Li … **Fr**). ns²: group 2.\n" +
        "- **ns²np⁴**: group 16 (O, S, **Se**, Te). ns²np⁵: group 17. ns²np⁶: group 18.\n" +
        "- **Gains 2 e⁻ to reach a noble-gas configuration**: **group 16**.\n" +
        "- **Last electron in (n−1)d**: d-block — **Ag** (4d¹⁰5s¹). **Dy, Pu, Pa** fill (n−2)f — f-block.",
      table: {
        columns: ["Configuration or clue", "Answer"],
        rows: [
          { cells: ["ns¹", "Group 1 — **Fr**"], pyqExampleId: "34e5d444-ae94-4c23-8f47-0c254eaa36e8" },
          { cells: ["ns²np⁴", "Group 16 — **Se**"], pyqExampleId: "71f45866-4788-4564-9e3c-f9eb7f4c7208" },
          { cells: ["Gains two electrons → noble gas", "**Group 16**"], pyqExampleId: "efef173d-3112-4db0-9dd5-c6cf3fac74df" },
          { cells: ["Last electron in (n−1)d", "**Ag**"], pyqExampleId: "d58c15bd-102c-42dd-9f3f-21979d554157" },
        ],
      },
      selfCheckExample: {
        prompt: "Which has the general configuration ns¹: Ca, Sr, Ba, Fr?",
        steps: ["Ca, Sr, Ba are group 2 (ns²). Francium is group 1."],
        answer: "Fr",
      },
      pyqExampleId: "d58c15bd-102c-42dd-9f3f-21979d554157",
      traps: [
        {
          title: "Picking Kr or Xe for ns²np⁴",
          body: "Noble gases end in np⁶. np⁴ is two short — the chalcogens, group 16.",
        },
      ],
    },
  ],
  related: [
    { label: "Periodic trends", href: `${BASE}/cetmpt-trends` },
    { label: "Transition elements — the d and f blocks", href: "/notes/mht-cet-chemistry/transition-and-inner-transition-elements" },
  ],
};
