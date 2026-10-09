import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_PTB_GROUPS_NOTE: SubtopicNote = {
  subtopicName: "Groups 1, 2, 17 and 18",
  title: "Alkali Metals, Alkaline Earth Metals, Halogens and Noble Gases",
  oneLineDefinition:
    "Each main group has a typical chemistry set by its valence electrons: group 1 and 2 metals lose them, halogens gain one, noble gases keep a full shell.",
  whyItMatters:
    "Group questions ask you to recognise a group or element from its chemistry: group 2 from its reaction with water and its oxide in 2019, iodine from its colours and its chloride in 2017, the properties of group 1 in 2018, and in 2011 which pair of elements reacts most vigorously.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-ptb-group-1",
      name: "Group 1: the alkali metals",
      intuition:
        "Every alkali metal has one electron alone in a new shell, held weakly. Giving it away is easy, so these metals react fast with water, oxygen and halogens, always forming 1+ ions. The further down the group, the further out that electron sits and the faster the reaction.",
      definition:
        "- One valence electron (\\(ns^1\\)); always the **+1** oxidation state, as \\(\\mathrm{M^+}\\) ions.\n" +
        "- Soft metals with low densities (lithium, sodium and potassium float on water) and low melting points that **fall** down the group.\n" +
        "- React with cold water to give hydrogen and an alkaline hydroxide: \\(\\mathrm{2M + 2H_2O \\rightarrow 2MOH + H_2}\\). The reaction is **more vigorous down the group**.\n" +
        "- Strong **reducing agents**: they reduce halogens to halide ions, e.g. \\(\\mathrm{2Na + I_2 \\rightarrow 2NaI}\\).\n" +
        "- With hydrogen they form ionic **hydrides** such as \\(\\mathrm{NaH}\\), in which hydrogen is **−1**.\n" +
        "- Metallic bonding: the valence electrons are delocalised in the solid and in the liquid, so the metals conduct in both. They are stored under oil because they react with air and water.",
      table: {
        columns: ["Metal", "Melting point (°C, approx.)", "Reaction with cold water", "Flame colour"],
        rows: [
          { cells: ["Lithium", "181", "Fizzes steadily", "Crimson red"] },
          { cells: ["Sodium", "98", "Melts into a ball and darts across the surface", "Yellow-orange"] },
          { cells: ["Potassium", "63", "Melts and the hydrogen catches fire", "Lilac"] },
          { cells: ["Rubidium", "39", "Violent", "Red-violet"] },
          { cells: ["Caesium", "28", "Explosive", "Blue-violet"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about the group 1 metals is correct?",
        options: [
          "Their melting points increase down the group",
          "Lithium reacts more vigorously with water than potassium does",
          "Their hydroxides are acidic",
          "They react with water to give hydrogen and an alkaline solution",
          "In their hydrides, the metal has an oxidation state of −1",
        ],
        steps: [
          "\\(\\mathrm{2M + 2H_2O \\rightarrow 2MOH + H_2}\\): hydrogen gas and a hydroxide solution, which is alkaline. D is correct.",
          "A and B reverse the trends: melting points fall and reactivity rises down the group. C is wrong: the hydroxides are strong bases.",
          "E reverses the hydride charges: the metal is +1 and hydrogen is −1.",
        ],
        answer: "(D) They react with water to give hydrogen and an alkaline solution",
      },
      practiceSet: [
        { prompt: "Write the equation for potassium reacting with water.", answer: "\\(\\mathrm{2K + 2H_2O \\rightarrow 2KOH + H_2}\\)" },
        { prompt: "What is the oxidation state of hydrogen in lithium hydride?", answer: "−1" },
        { prompt: "Why are the alkali metals stored under oil?", answer: "They react quickly with oxygen and water vapour in the air" },
      ],
      traps: [
        {
          title: "In a metal hydride, hydrogen is negative",
          body: "Hydrogen is +1 in water and acids, but in ionic hydrides of groups 1 and 2 it is the \\(\\mathrm{H^-}\\) ion, oxidation state −1. The metal is always positive.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ptb-group-2",
      name: "Group 2: the alkaline earth metals",
      intuition:
        "Group 2 metals have two valence electrons to lose instead of one, and a slightly stronger nuclear pull, so they are less reactive than their group 1 neighbours. They still react with water, faster further down the group. Their oxides are ionic solids that behave as bases.",
      definition:
        "- Two valence electrons (\\(ns^2\\)); the **+2** oxidation state, as \\(\\mathrm{M^{2+}}\\) ions.\n" +
        "- Oxides have the formula **MO**. They are ionic solids with high melting points, which do not conduct when solid, and are **basic**: they react with acids to give a salt and water.\n" +
        "- With water: \\(\\mathrm{M + 2H_2O \\rightarrow M(OH)_2 + H_2}\\), more vigorous down the group. Magnesium reacts only slowly with cold water but quickly with steam: \\(\\mathrm{Mg + H_2O \\rightarrow MgO + H_2}\\).\n" +
        "- Down the group, hydroxides become **more** soluble and sulfates **less** soluble.\n" +
        "- Less reactive than the group 1 metal in the same period.",
      table: {
        columns: ["Metal", "Reaction with water", "Hydroxide", "Note"],
        rows: [
          { cells: ["Beryllium", "No reaction, even with steam", "\\(\\mathrm{Be(OH)_2}\\), amphoteric", "Its oxide is amphoteric, unlike the rest"] },
          { cells: ["Magnesium", "Very slow with cold water; fast with steam, giving MgO", "\\(\\mathrm{Mg(OH)_2}\\), barely soluble", "Burns with a bright white flame"] },
          { cells: ["Calcium", "Steady fizzing with cold water", "\\(\\mathrm{Ca(OH)_2}\\), slightly soluble (limewater)", "Limewater turns milky with \\(\\mathrm{CO_2}\\)"] },
          { cells: ["Barium", "Vigorous with cold water", "\\(\\mathrm{Ba(OH)_2}\\), quite soluble", "\\(\\mathrm{BaSO_4}\\) is insoluble (used in X-ray imaging)"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Metal Q reacts only very slowly with cold water but quickly with steam, giving hydrogen. It burns in air with a bright white flame to form a white solid of formula QO. What is Q?",
        options: ["Sodium", "Magnesium", "Aluminium", "Iron", "Sulfur"],
        steps: [
          "An oxide of formula QO means a 2+ metal: group 2. Slow with cold water but fast with steam, and a bright white flame, is magnesium.",
          "Sodium reacts fast with cold water and its oxide is \\(\\mathrm{Na_2O}\\). Aluminium's oxide is \\(\\mathrm{Al_2O_3}\\).",
          "Iron does not burn with a white flame and its common oxides are not white. Sulfur is a non-metal whose oxide is a gas.",
        ],
        answer: "(B) Magnesium",
      },
      practiceSet: [
        { prompt: "Write the formula of calcium chloride.", answer: "\\(\\mathrm{CaCl_2}\\)" },
        { prompt: "Is magnesium oxide acidic or basic?", answer: "Basic" },
        { prompt: "Which is the least soluble group 2 sulfate?", answer: "Barium sulfate, \\(\\mathrm{BaSO_4}\\)" },
      ],
      traps: [
        {
          title: "The oxide formula gives the group away",
          body: "A metal oxide \\(\\mathrm{M_2O}\\) points to group 1, MO to group 2 and \\(\\mathrm{M_2O_3}\\) to group 13. A metal that reacts with water and forms an ionic, basic oxide MO belongs to group 2.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ptb-group-17",
      name: "Group 17: the halogens",
      intuition:
        "A halogen atom is one electron short of a full shell, so it grabs one from a metal or shares one in a covalent bond. The smaller the atom, the harder it grabs: fluorine is the most reactive. Going down the group the molecules get bigger, so the forces between them grow and the elements go from gas to liquid to solid.",
      definition:
        "- Seven valence electrons (\\(ns^2\\,np^5\\)); non-metals that exist as **diatomic molecules** \\(\\mathrm{X_2}\\).\n" +
        "- With metals they form **halide ions** \\(\\mathrm{X^-}\\) (oxidation state −1). Fluorine is only ever −1; chlorine, bromine and iodine also take positive states when bonded to oxygen or to a more electronegative halogen (iodine is +1 in ICl).\n" +
        "- **Down the group**: melting and boiling points **rise** and colours darken; reactivity, oxidising power, electronegativity and first ionisation energy **fall**.\n" +
        "- **Displacement**: a halogen oxidises the halide ions of any halogen below it. \\(\\mathrm{Cl_2 + 2KBr \\rightarrow 2KCl + Br_2}\\).\n" +
        "- Iodine dissolves poorly in water but well in potassium iodide solution, giving a brown solution, and turns starch blue-black.",
      table: {
        columns: ["Halogen", "State at room temperature", "Colour", "Oxidising power"],
        rows: [
          { cells: ["Fluorine, \\(\\mathrm{F_2}\\)", "Gas", "Pale yellow", "Strongest"] },
          { cells: ["Chlorine, \\(\\mathrm{Cl_2}\\)", "Gas", "Yellow-green", "Strong"] },
          { cells: ["Bromine, \\(\\mathrm{Br_2}\\)", "Liquid", "Red-brown", "Moderate"] },
          { cells: ["Iodine, \\(\\mathrm{I_2}\\)", "Solid", "Shiny grey-black solid; violet vapour when heated", "Weakest of the four"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which mixture reacts to form a new halogen?",
        options: [
          "\\(\\mathrm{I_2}\\) added to \\(\\mathrm{KCl(aq)}\\)",
          "\\(\\mathrm{Br_2}\\) added to \\(\\mathrm{KCl(aq)}\\)",
          "\\(\\mathrm{Cl_2}\\) added to \\(\\mathrm{KBr(aq)}\\)",
          "\\(\\mathrm{I_2}\\) added to \\(\\mathrm{KBr(aq)}\\)",
          "\\(\\mathrm{Br_2}\\) added to \\(\\mathrm{KF(aq)}\\)",
        ],
        steps: [
          "A halogen displaces only a halide that is BELOW it in the group.",
          "Chlorine is above bromine, so \\(\\mathrm{Cl_2 + 2KBr \\rightarrow 2KCl + Br_2}\\) happens: C.",
          "In A, B, D and E the halogen added is below the halide's element, so nothing happens.",
        ],
        answer: "(C) \\(\\mathrm{Cl_2}\\) added to \\(\\mathrm{KBr(aq)}\\)",
      },
      practiceSet: [
        { prompt: "Which halogen is a liquid at room temperature?", answer: "Bromine" },
        { prompt: "Chlorine water is added to colourless potassium iodide solution. What colour appears, and why?", answer: "Brown: chlorine displaces iodine", method: "\\(\\mathrm{Cl_2 + 2KI \\rightarrow 2KCl + I_2}\\)" },
        { prompt: "Why do the boiling points of the halogens rise down the group?", answer: "Bigger molecules with more electrons have stronger London forces between them" },
      ],
      traps: [
        {
          title: "Halogen reactivity falls down the group",
          body: "Fluorine is the most reactive halogen and iodine the least of the four common ones, the opposite of group 1. Electronegativity and first ionisation energy also fall down the group, while melting and boiling points rise.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ptb-group-18",
      name: "Group 18: the noble gases",
      intuition:
        "A noble gas atom already has a full outer shell, which is a very low-energy, stable arrangement. It has no electron to spare and no room for one more, so it hardly reacts at all and its atoms do not even pair up into molecules.",
      definition:
        "- Full outer shells: helium \\(1s^2\\) (2 electrons); the others \\(ns^2\\,np^6\\) (8 electrons).\n" +
        "- **Monatomic** gases: they exist as single atoms.\n" +
        "- Very unreactive, because each has the **highest first ionisation energy in its period** and gains no energy by accepting an electron.\n" +
        "- Boiling points **rise** down the group (stronger London forces between larger atoms); helium has the lowest boiling point of any substance.\n" +
        "- Not completely inert: xenon forms compounds with fluorine and oxygen, such as \\(\\mathrm{XeF_4}\\).",
      table: {
        columns: ["Gas", "Outer-shell electrons", "Typical use"],
        rows: [
          { cells: ["Helium", "2", "Balloons (light and non-flammable); cooling the magnets in MRI scanners"] },
          { cells: ["Neon", "8", "Advertising signs that glow red"] },
          { cells: ["Argon", "8", "Inert atmosphere for welding; filling light bulbs"] },
          { cells: ["Xenon", "8", "Bright lamps; forms compounds such as \\(\\mathrm{XeF_4}\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about the noble gases is NOT correct?",
        options: [
          "Every noble gas atom has eight electrons in its outer shell",
          "They exist as single atoms",
          "Their boiling points increase down the group",
          "Each has the highest first ionisation energy in its period",
          "Argon is used to keep oxygen away from hot metal during welding",
        ],
        steps: [
          "Helium has only two electrons, both in its first and only shell, so A is not true of every noble gas.",
          "B, C, D and E are all correct facts about the group.",
        ],
        answer: "(A) Every noble gas atom has eight electrons in its outer shell",
      },
      practiceSet: [
        { prompt: "Why are the noble gases so unreactive?", answer: "Their outer shells are full, and their ionisation energies are very high" },
        { prompt: "Which noble gas has the lowest boiling point?", answer: "Helium" },
        { prompt: "Name a compound of a noble gas.", answer: "Xenon tetrafluoride, \\(\\mathrm{XeF_4}\\)" },
      ],
    },
  ],
};
