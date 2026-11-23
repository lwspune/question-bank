import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GP_OCCURRENCE_NOTE: SubtopicNote = {
  subtopicName: "Occurrence and Electronic Configuration",
  title: "Occurrence and Electronic Configuration of Groups 16, 17 and 18",
  oneLineDefinition:
    "Where the oxygen family, the halogens and the noble gases are found, their valence shell configurations ns²np⁴, ns²np⁵ and ns²np⁶, and the uses of helium, neon and argon.",
  whyItMatters:
    "4 questions. Three were set in board papers: the electronic configurations of sulfur and krypton (2017), the names and configurations of the first two halogens (2022), and two uses of neon (2024). The textbook adds the uses of neon and argon together.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccgp-configuration",
      name: "Valence shell configurations and occurrence",
      intuition:
        "These three groups sit at the right end of the p-block. Moving from group 16 to group 18, each element has one more p electron than the one before it. An element of group 16 is two electrons short of the nearest noble gas, a halogen is one short, and a noble gas already has a complete octet. That one fact explains most of the chapter: halogens grab one electron greedily, the oxygen family takes two, and the noble gases hardly react at all.",
      definition:
        "- **Group 16 (oxygen family, chalcogens):** oxygen, sulfur, selenium, tellurium, polonium. Valence shell \\(ns^2np^4\\), two electrons short of a noble gas.\n" +
        "- **Group 17 (halogens, 'salt producing'):** fluorine, chlorine, bromine, iodine, astatine. Valence shell \\(ns^2np^5\\), one electron short.\n" +
        "- **Group 18 (noble gases):** helium, neon, argon, krypton, xenon, radon. Valence shell \\(ns^2np^6\\), a complete octet; helium is \\(1s^2\\).\n" +
        "- **Writing a configuration:** fill 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, ... in order and check that the electrons add up to Z. The condensed form puts the previous noble gas in brackets, so sulfur is \\([\\text{Ne}]3s^23p^4\\) and selenium is \\([\\text{Ar}]3d^{10}4s^24p^4\\).\n" +
        "- **Occurrence, group 16:** oxygen is the most abundant element on earth (20.95 % of air by volume, about 46.6 % of the earth's crust by mass). Sulfur occurs as sulfates such as gypsum \\(\\text{CaSO}_4 \\cdot 2\\text{H}_2\\text{O}\\) and epsom salt \\(\\text{MgSO}_4 \\cdot 7\\text{H}_2\\text{O}\\), and as sulfides such as galena \\(\\text{PbS}\\) and zinc blende \\(\\text{ZnS}\\). Polonium is radioactive.\n" +
        "- **Occurrence, group 17:** halogens are too reactive to occur free. Fluorine occurs as fluorspar \\(\\text{CaF}_2\\) and cryolite \\(\\text{Na}_3\\text{AlF}_6\\); sea water contains mainly sodium chloride (2.5 % by mass). Astatine is radioactive.\n" +
        "- **Occurrence, group 18:** all noble gases except radon occur in the atmosphere, about 1 % of dry air, mostly argon. Natural gas is the main commercial source of helium. Radon is a decay product of radium.",
      formula: {
        label: "Valence shell configurations",
        latex: "\\text{Group 16: } ns^2np^4, \\qquad \\text{Group 17: } ns^2np^5, \\qquad \\text{Group 18: } ns^2np^6",
      },
      authoredExample: {
        prompt:
          "Write the electronic configurations of selenium (Z = 34) and argon (Z = 18). Name the group of each and say how many electrons each is short of a noble gas configuration.",
        steps: [
          "Selenium: \\(1s^2\\ 2s^2\\ 2p^6\\ 3s^2\\ 3p^6\\ 3d^{10}\\ 4s^2\\ 4p^4\\), that is \\([\\text{Ar}]3d^{10}4s^24p^4\\).",
          "Check: \\(2 + 2 + 6 + 2 + 6 + 10 + 2 + 4 = 34\\).",
          "The valence shell is \\(4s^24p^4\\), the \\(ns^2np^4\\) pattern, so selenium is in group 16 and is two electrons short of krypton.",
          "Argon: \\(1s^2\\ 2s^2\\ 2p^6\\ 3s^2\\ 3p^6\\), that is \\([\\text{Ne}]3s^23p^6\\). Check: \\(2 + 2 + 6 + 2 + 6 = 18\\).",
          "The valence shell \\(3s^23p^6\\) is complete, so argon is a noble gas of group 18 and is short of nothing.",
        ],
        answer: "Se: [Ar]3d¹⁰4s²4p⁴, group 16, two electrons short; Ar: [Ne]3s²3p⁶, group 18, a complete octet",
      },
      selfCheckExample: {
        prompt: "Bromine has Z = 35. Write its condensed electronic configuration and say how many electrons it needs to reach a noble gas configuration.",
        steps: [
          "\\([\\text{Ar}]3d^{10}4s^24p^5\\). Check: \\(18 + 10 + 2 + 5 = 35\\).",
          "The valence shell \\(4s^24p^5\\) has seven electrons, so bromine needs one more.",
        ],
        answer: "[Ar]3d¹⁰4s²4p⁵; one electron",
      },
      practiceSet: [
        { prompt: "Write the general valence shell configuration of group 16 elements.", answer: "\\(ns^2np^4\\)" },
        { prompt: "Name the main commercial source of helium.", answer: "Natural gas" },
        { prompt: "Which noble gas does not occur in the atmosphere?", answer: "Radon, a decay product of radium" },
        { prompt: "Give the formula of cryolite, a mineral of fluorine.", answer: "\\(\\text{Na}_3\\text{AlF}_6\\)" },
      ],
      pyqExampleId: "3d6708c1-dd22-47cc-8391-cc1c92fe7b2a",
      traps: [
        {
          title: "Helium has no p electrons",
          body: "Helium is a noble gas with the configuration \\(1s^2\\) only. Writing it as \\(ns^2np^6\\) like the rest of group 18 is wrong.",
        },
        {
          title: "Forgetting the 3d electrons",
          body: "From selenium and bromine onwards the 3d subshell is full. Leave out \\(3d^{10}\\) and the electrons no longer add up to Z. Always check the total.",
        },
        {
          title: "Configuration without the name",
          body: "When the board asks for the names and configurations, write the element's name, its symbol and Z beside each configuration. A bare configuration loses the naming mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccgp-noble-uses",
      name: "Uses of helium, neon and argon",
      intuition:
        "Noble gases have complete valence shells, so they hardly react. That makes them useful wherever something must not react, such as a welding flame or a hot lamp filament. They also glow brightly when an electric discharge passes through them, which is why neon lights up signs.",
      definition:
        "- The board asks for two uses of a named noble gas. Give two **different** uses, each in a full phrase that names what the gas does.\n" +
        "- **Helium** is light and unreactive: helium mixed with oxygen is breathed by sea divers and by asthma patients; a mixture of 85 % helium and 15 % hydrogen fills balloons; helium gives an inert atmosphere for welding; liquid helium (b.p. 4.2 K, the lowest of any substance) gives very low temperatures for research; it is also used in magnetic resonance imaging.\n" +
        "- **Neon** glows in a discharge: neon discharge lamps and signs, seen from long distances and through mist or fog.\n" +
        "- **Argon** is the most plentiful noble gas in air and is used where an inert atmosphere is needed.",
      table: {
        columns: ["Gas", "Use (from the textbook)"],
        rows: [
          { cells: ["Helium", "Mixed with oxygen for breathing by sea divers and for artificial breathing of asthma patients"] },
          { cells: ["Helium", "Liquid helium for producing the very low temperatures needed in research"] },
          {
            cells: ["Neon", "Neon discharge lamps and signs, visible from long distances and also in mist or fog"],
            pyqExampleId: "3241c2b3-9fe3-496a-beb7-f080d83bd207",
            noteAmber: "Board 2024 asked for two uses of neon.",
          },
          { cells: ["Neon", "In fluorescent tubes, and a neon and helium mixture in voltage stabilizers and current rectifiers"] },
          { cells: ["Argon", "An inert atmosphere in welding and in steel production"] },
          { cells: ["Argon", "85 % argon with 15 % nitrogen is filled in electric bulbs to increase the life of the filament"] },
        ],
      },
      practiceSet: [
        { prompt: "Why is a mixture of 85 % argon and 15 % nitrogen filled in electric bulbs?", answer: "To increase the life of the filament" },
        { prompt: "Which gas, mixed with oxygen, is breathed by sea divers?", answer: "Helium" },
        { prompt: "Give one use of liquid helium.", answer: "Producing very low temperatures for research" },
        { prompt: "Name the noble gas used for an inert atmosphere in steel production.", answer: "Argon" },
      ],
      pyqExampleId: "3241c2b3-9fe3-496a-beb7-f080d83bd207",
      traps: [
        {
          title: "One use written twice",
          body: "'Used in neon lamps' and 'used in neon signs' read as one use. Give two different uses, for example signs and fluorescent tubes.",
        },
        {
          title: "Mixing up neon and argon",
          body: "Neon goes into signs and discharge lamps. Argon goes into electric bulbs and gives an inert atmosphere for welding. Swapping them costs both marks.",
        },
      ],
    },
  ],
};
