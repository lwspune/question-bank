import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_NU_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Nuclear Energy",
  title: "Nuclear Energy",
  oneLineDefinition:
    "The Q value of a nuclear reaction from the mass it loses, the same energy from binding energies per nucleon, and how fission, fusion and a nuclear reactor release it.",
  whyItMatters:
    "Two NEET questions, from 2021 and Re-NEET 2026. One finds the gain in binding energy when a nucleus with A = 240 splits into two nuclei with A = 120 (2021); the other finds the Q value, in keV, of the alpha decay of uranium-238 from the masses (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphnu-q-value",
      name: "Q value from masses",
      intuition:
        "Add up the masses before a nuclear reaction and the masses after. If some mass has gone, it has turned into energy, mostly the kinetic energy of the products. That energy is the Q value. Multiply the lost mass in u by 931.5 to get it in MeV.",
      definition:
        "- \\(Q = \\left(\\sum m_{\\text{before}} - \\sum m_{\\text{after}}\\right)c^{2}\\). With masses in u, \\(Q = \\Delta m \\times 931.5\\) MeV.\n" +
        "- \\(Q > 0\\): energy is released. \\(Q < 0\\): energy must be supplied for the reaction to happen.\n" +
        "- In every nuclear reaction the total mass number A and the total charge Z are the same on both sides. Use this to find a missing nucleus or the number of neutrons.\n" +
        "- Mass turned into energy at a steady rate: power \\(P = \\dfrac{\\Delta m}{t}\\,c^{2}\\).\n" +
        "- \\(1\\ \\text{MeV} = 1000\\ \\text{keV} = 1.6 \\times 10^{-13}\\) J.",
      formula: {
        label: "Q value",
        latex: "Q = \\left(\\sum m_{\\text{before}} - \\sum m_{\\text{after}}\\right)c^{2}, \\qquad 1\\ \\text{u}\\,c^{2} = 931.5\\ \\text{MeV}",
      },
      authoredExample: {
        prompt:
          "\\(^{2}\\text{H} + {}^{2}\\text{H} \\rightarrow {}^{3}\\text{He} + n\\). Masses: \\(^{2}\\text{H}\\) 2.014102 u, \\(^{3}\\text{He}\\) 3.016029 u, n 1.008665 u. Find the Q value. (1 u = 931.5 MeV/\\(c^{2}\\))",
        steps: [
          "Before: \\(2 \\times 2.014102 = 4.028204\\) u.",
          "After: \\(3.016029 + 1.008665 = 4.024694\\) u.",
          "\\(\\Delta m = 4.028204 - 4.024694 = 0.003510\\) u.",
          "\\(Q = 0.003510 \\times 931.5 = 3.27\\) MeV, released.",
        ],
        answer: "About 3.27 MeV",
      },
      selfCheckExample: {
        prompt:
          "\\(^{4}\\text{He} + {}^{14}\\text{N} \\rightarrow {}^{17}\\text{O} + {}^{1}\\text{H}\\). Masses: \\(^{4}\\text{He}\\) 4.002603 u, \\(^{14}\\text{N}\\) 14.003074 u, \\(^{17}\\text{O}\\) 16.999132 u, \\(^{1}\\text{H}\\) 1.007825 u. Is energy released or must it be supplied, and how much? (1 u = 931.5 MeV/\\(c^{2}\\))",
        steps: [
          "Before: \\(4.002603 + 14.003074 = 18.005677\\) u.",
          "After: \\(16.999132 + 1.007825 = 18.006957\\) u.",
          "\\(\\Delta m = 18.005677 - 18.006957 = -0.001280\\) u, so \\(Q = -0.001280 \\times 931.5 = -1.19\\) MeV.",
        ],
        answer: "It must be supplied: about 1.19 MeV",
      },
      practiceSet: [
        { prompt: "A nuclear reaction loses 0.01 u of mass. How much energy is released, in MeV?", answer: "9.315 MeV" },
        { prompt: "The Q value of a reaction is negative. Is energy released, or must it be supplied?", answer: "It must be supplied" },
        { prompt: "A star turns \\(4 \\times 10^{9}\\) kg of mass into radiation every second. What is its power output?", answer: "\\(3.6 \\times 10^{26}\\) W" },
        { prompt: "How much energy, in MeV, is equivalent to 1 u of mass?", answer: "931.5 MeV" },
      ],
      pyqExampleId: "388a3a36-8804-4fa8-9a1b-dd61319ca75e",
      traps: [
        {
          title: "Before minus after, for masses",
          body: "Mass that is lost is energy that is released, so Q = (masses before) minus (masses after). Subtracting the other way flips the sign.",
        },
        {
          title: "Subtract first, round later",
          body: "Nuclear masses differ only in the third or fourth decimal place. Rounding the masses before subtracting can wipe out the whole difference.",
        },
        {
          title: "Read the unit the answer wants",
          body: "1 MeV is 1000 keV. A Q value of 3.726 MeV is 3726 keV; giving 3.726 when keV is asked is wrong by a thousand.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphnu-fission-fusion",
      name: "Fission, fusion and the nuclear reactor",
      visualizationSlug: "jee-binding-energy-curve",
      intuition:
        "Any change that moves nuclei higher on the binding-energy curve releases energy. A heavy nucleus near the bottom of the falling end can split into two middle nuclei, which are bound more tightly: that is fission. Two very light nuclei can join into one that is bound more tightly: that is fusion. In both, the products together have less mass than what you started with.",
      definition:
        "- From binding energies: total binding energy of a nucleus = \\(A \\times E_{bn}\\), and \\(Q = \\sum (A\\,E_{bn})_{\\text{after}} - \\sum (A\\,E_{bn})_{\\text{before}}\\). A free neutron or proton has zero binding energy.\n" +
        "- **Fission:** \\(^{235}_{92}\\text{U}\\) absorbs a slow neutron and splits into two middle-mass nuclei and 2 or 3 neutrons, for example \\(^{235}_{92}\\text{U} + n \\rightarrow {}^{144}_{56}\\text{Ba} + {}^{89}_{36}\\text{Kr} + 3n\\). About 200 MeV is released per fission.\n" +
        "- The neutrons set off more fissions: a chain reaction. In a reactor a **moderator** (water, heavy water or graphite) slows the fast neutrons, since slow neutrons cause fission of \\(^{235}\\text{U}\\) far more readily, and **control rods** (cadmium) absorb neutrons.\n" +
        "- The multiplication factor K is the ratio of neutrons in one generation to the one before. K = 1: steady (critical). K > 1: the reaction grows. K < 1: it dies out.\n" +
        "- **Fusion:** light nuclei join into a heavier one. They are positively charged and repel, so they must be very hot to get close: fusion happens only at very high temperatures, as in the core of the Sun. The Sun and stars shine by fusing hydrogen into helium, about 26.7 MeV for every helium nucleus made.\n" +
        "- Fissions per second in a reactor = power ÷ energy per fission, with the energy in joules.",
      formula: {
        label: "Energy from binding energies",
        latex: "Q = \\sum_{\\text{after}} A\\,E_{bn} - \\sum_{\\text{before}} A\\,E_{bn}, \\qquad \\text{fissions per second} = \\frac{P}{E_{\\text{fission}}}",
        symbols: [{ symbol: "\\(E_{bn}\\)", meaning: "binding energy per nucleon of that nucleus" }],
      },
      authoredExample: {
        prompt:
          "Two deuterons (binding energy 1.1 MeV per nucleon) fuse to make a \\(^{4}\\text{He}\\) nucleus (7.07 MeV per nucleon). How much energy is released?",
        steps: [
          "Before: two deuterons, 4 nucleons in all: \\(4 \\times 1.1 = 4.4\\) MeV.",
          "After: \\(4 \\times 7.07 = 28.28\\) MeV.",
          "\\(Q = 28.28 - 4.4 = 23.88\\) MeV, released.",
        ],
        answer: "About 23.9 MeV",
      },
      selfCheckExample: {
        prompt:
          "A reactor runs at 3.2 MW, and each fission of \\(^{235}\\text{U}\\) releases 200 MeV. How many fissions take place each second? (1 MeV = \\(1.6 \\times 10^{-13}\\) J)",
        steps: [
          "Energy per fission: \\(200 \\times 1.6 \\times 10^{-13} = 3.2 \\times 10^{-11}\\) J.",
          "Fissions per second: \\(\\dfrac{3.2 \\times 10^{6}}{3.2 \\times 10^{-11}} = 10^{17}\\).",
        ],
        answer: "\\(10^{17}\\) per second",
      },
      practiceSet: [
        { prompt: "In \\(^{235}_{92}\\text{U} + n \\rightarrow {}^{141}_{56}\\text{Ba} + {}^{92}_{36}\\text{Kr} + x\\,n\\), find x.", answer: "x = 3" },
        { prompt: "What does the moderator in a nuclear reactor do?", answer: "It slows down fast neutrons so that they cause fission" },
        { prompt: "A nuclear reactor is running steadily (critical). What is its multiplication factor K?", answer: "K = 1" },
        { prompt: "Which process gives the Sun its energy: fission or fusion?", answer: "Fusion of hydrogen into helium" },
      ],
      pyqExampleId: "a738375d-5d00-4bfb-a017-5d9b4db804dc",
      traps: [
        {
          title: "Multiply by A before subtracting",
          body: "The difference of two binding energies per nucleon is a per-nucleon figure, not the answer. Multiply each by its own mass number first, then subtract the totals.",
        },
        {
          title: "Slow neutrons, not fast ones",
          body: "Slow neutrons cause fission of \\(^{235}\\text{U}\\) more readily than fast ones. That is why a reactor needs a moderator to slow them down.",
        },
        {
          title: "Stars run on fusion",
          body: "The energy of the Sun and stars comes from fusing light nuclei, not from splitting heavy ones. Fission is the process used in nuclear reactors.",
        },
        {
          title: "Fusion needs great heat",
          body: "Light nuclei are positively charged and repel each other, so at ordinary temperatures they never get close enough to fuse. Only at very high temperatures do they move fast enough.",
        },
      ],
    },
  ],
};
