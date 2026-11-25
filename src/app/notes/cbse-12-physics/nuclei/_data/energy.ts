import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_NU_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Nuclear Energy",
  title: "Nuclear Energy",
  oneLineDefinition:
    "Why fission of heavy nuclei and fusion of light nuclei both release energy, how much one event releases (from binding energies or from masses), how much a given mass of fuel gives, and how the Sun makes its energy.",
  whyItMatters:
    "22 questions, seventeen of them from board papers. The board asks you to differentiate fission and fusion, usually with an example of each, every year from 2022 to 2026; in 2026 two sets printed the same question. It asks the energy released in one event from binding energies per nucleon (2023, 2026) or from masses (two papers in 2022, three in 2025), the energy in a given mass of fuel and how long it can light a bulb (2022, 2024 twice), how energy is produced in the Sun and the stars (2023, 2025), and how the binding energy curve explains fission (2023). Several repeat textbook exercises: the fission of iron-56 into two aluminium nuclei (2022, with the same data), plutonium fission (2024, 1 g in place of 1 kg) and the deuterium lamp (2022 and 2024, with other masses and bulbs). The textbook adds the Coulomb barrier between two deuterons and why nuclear equations balance protons and neutrons separately.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpnu-fission-fusion",
      name: "Fission and fusion",
      intuition:
        "Middle-sized nuclei hold their nucleons most tightly. A heavy nucleus that splits, or two light nuclei that join, end up nearer the middle of the binding energy curve, with their nucleons more tightly bound. The extra binding comes out as energy, a million times more than any chemical reaction gives for the same fuel.",
      definition:
        "- **Why energy is released:** binding energy per nucleon is nearly constant (about 8 MeV) for \\(30 < A < 170\\) and less for \\(A < 30\\) and \\(A > 170\\). When nuclei with less total binding energy change into nuclei with more, the products have less mass and the difference is released as energy.\n" +
        "- **Fission:** a heavy nucleus breaks into two intermediate-mass nuclei. Example: \\({}^{1}_{0}\\text{n} + {}^{235}_{92}\\text{U} \\rightarrow {}^{236}_{92}\\text{U} \\rightarrow {}^{144}_{56}\\text{Ba} + {}^{89}_{36}\\text{Kr} + 3\\,{}^{1}_{0}\\text{n}\\). The fragments are radioactive and emit beta particles. About 200 MeV is released per fission, first as kinetic energy of the fragments and neutrons, then as heat. Nuclear reactors use controlled fission; an atom bomb is uncontrolled fission.\n" +
        "- **Fusion:** two light nuclei join to form a heavier one. Examples: \\({}^{2}_{1}\\text{H} + {}^{2}_{1}\\text{H} \\rightarrow {}^{3}_{2}\\text{He} + \\text{n} + 3.27\\ \\text{MeV}\\) and \\({}^{2}_{1}\\text{H} + {}^{2}_{1}\\text{H} \\rightarrow {}^{3}_{1}\\text{H} + {}^{1}_{1}\\text{H} + 4.03\\ \\text{MeV}\\).\n" +
        "- **Coulomb barrier:** both nuclei are positive and repel, so they must come close enough for the short-range nuclear force to act. Fusion by raising the temperature so that nuclei have enough kinetic energy is **thermonuclear fusion**.\n" +
        "- **Energy in the Sun** (core about \\(1.5 \\times 10^{7}\\) K) comes from the **proton-proton cycle**. Step 1: \\({}^{1}_{1}\\text{H} + {}^{1}_{1}\\text{H} \\rightarrow {}^{2}_{1}\\text{H} + e^{+} + \\nu + 0.42\\ \\text{MeV}\\). Then the positron meets an electron (1.02 MeV as two gamma rays), a deuteron and a proton make \\({}^{3}_{2}\\text{He}\\) (5.49 MeV), and two \\({}^{3}_{2}\\text{He}\\) make \\({}^{4}_{2}\\text{He}\\) and two protons (12.86 MeV).\n" +
        "- **Net effect of the cycle:** \\(4\\,{}^{1}_{1}\\text{H} + 2e^{-} \\rightarrow {}^{4}_{2}\\text{He} + 2\\nu + 6\\gamma + 26.7\\ \\text{MeV}\\). When the core's hydrogen runs low, the core heats to about \\(10^{8}\\) K and helium fuses into carbon. Elements beyond the peak of the binding energy curve cannot be made this way.\n" +
        "- **Controlled fusion:** fuel is heated to about \\(10^{8}\\) K, where it is a plasma; the challenge is to hold the plasma, since no container can stand that temperature.\n" +
        "- **Nuclear and chemical energy:** chemical reactions release energies of a few eV, nuclear reactions MeV. Fission of 1 kg of uranium gives about \\(10^{14}\\) J; burning 1 kg of coal gives about \\(10^{7}\\) J.\n" +
        "- In a nuclear reaction the numbers of protons and of neutrons are each the same on both sides. Mass changes into energy because the total binding energy of the nuclei changes.",
      table: {
        columns: ["Point", "Nuclear fission", "Nuclear fusion"],
        rows: [
          { cells: ["What happens", "A heavy nucleus splits into two nuclei of intermediate mass", "Two light nuclei join to form a heavier nucleus"] },
          { cells: ["Nuclei taking part", "Heavy (A > 170), such as uranium-235", "Light (A < 30), such as hydrogen and its isotopes"] },
          { cells: ["How it is started", "Absorbing a neutron, which has no charge and is not repelled", "Very high temperature, so the nuclei can overcome their Coulomb repulsion"] },
          {
            cells: ["Example", "\\({}^{1}_{0}\\text{n} + {}^{235}_{92}\\text{U} \\rightarrow {}^{144}_{56}\\text{Ba} + {}^{89}_{36}\\text{Kr} + 3\\,{}^{1}_{0}\\text{n}\\)", "\\({}^{2}_{1}\\text{H} + {}^{2}_{1}\\text{H} \\rightarrow {}^{3}_{2}\\text{He} + {}^{1}_{0}\\text{n} + 3.27\\ \\text{MeV}\\)"],
            pyqExampleId: "8b13f5d6-b243-468a-b72d-256e6b322626",
            noteAmber: "Board 2023 asked to distinguish fission and fusion with an example of each, then explain both from the binding energy curve.",
          },
          { cells: ["Energy per event", "About 200 MeV", "A few MeV per reaction; 26.7 MeV for the whole proton-proton cycle"] },
          {
            cells: ["Where it happens", "Nuclear reactors (controlled) and the atom bomb (uncontrolled)", "The Sun and the stars, by the proton-proton cycle; controlled fusion reactors are still being developed"],
            pyqExampleId: "55aee3a4-c0ee-4c9d-92c8-74578075e1cd",
            noteAmber: "Board 2023 asked the steps by which the Sun makes its energy; 2025 asked how stars make energy, with two reactions.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Why is a neutron, and not a proton, used to start the fission of uranium-235?", answer: "A neutron has no charge, so the nucleus does not repel it and even a slow neutron can enter" },
        { prompt: "Why does fusion need a temperature of millions of kelvin?", answer: "The nuclei are both positive and repel; only at very high temperature do they move fast enough to come within range of the nuclear force" },
        { prompt: "Can fusion inside a star make elements beyond the peak of the binding energy curve? Give the reason.", answer: "No. Beyond the peak, a heavier nucleus is less tightly bound per nucleon, so fusing into it would not release energy" },
      ],
      pyqExampleId: "d5df54d7-e529-4483-ae32-eabcf5bae377",
      traps: [
        {
          title: "A difference that covers one process only",
          body: "Describing fission alone does not differentiate it from fusion. Give each point for BOTH processes, side by side, and one example of each.",
        },
        {
          title: "An example equation that does not balance",
          body: "Check that the mass numbers and the atomic numbers add up the same on both sides, and count every neutron. In the uranium example, \\(1 + 235 = 144 + 89 + 3\\) and \\(92 = 56 + 36\\).",
        },
        {
          title: "Saying nucleons are destroyed",
          body: "The numbers of protons and of neutrons are the same before and after. The energy comes from the change in total binding energy, which shows up as a change in the mass of the nuclei.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpnu-energy-from-be",
      name: "Energy released from binding energies",
      intuition:
        "Total binding energy is binding energy per nucleon times the number of nucleons. If the products together are more tightly bound than what you started with, the difference is the energy released. Find each total, then subtract.",
      definition:
        "- Total binding energy of a nucleus: \\(E_b = A \\times E_{bn}\\).\n" +
        "- Energy released = total binding energy of the products minus total binding energy of the reactants.\n" +
        "- **Fission estimate from the curve:** a nucleus with \\(A = 240\\) has \\(E_{bn} \\approx 7.6\\) MeV; two fragments with \\(A = 120\\) have about 8.5 MeV. The gain is about 0.9 MeV for each of 240 nucleons, about 216 MeV. That is why a fission gives about 200 MeV.\n" +
        "- **Using the graph to explain fission:** a heavy nucleus sits on the slowly falling part of the curve; its fragments sit near the flat top, with a higher binding energy per nucleon. More tightly bound means less mass, and that mass is released as energy.\n" +
        "- **For fusion:** very light nuclei sit low on the steep rising part; the product sits higher, so energy is released.",
      formula: {
        label: "Energy released from binding energy per nucleon",
        latex: "Q = \\sum (A\\,E_{bn})_{\\text{products}} - \\sum (A\\,E_{bn})_{\\text{reactants}}",
        symbols: [
          { symbol: "\\(A\\)", meaning: "mass number of each nucleus" },
          { symbol: "\\(E_{bn}\\)", meaning: "binding energy per nucleon of that nucleus, in MeV" },
          { symbol: "\\(Q\\)", meaning: "energy released, in MeV" },
        ],
      },
      authoredExample: {
        prompt:
          "Two deuterons, each with binding energy per nucleon 1.1 MeV, fuse to form a helium-4 nucleus with binding energy per nucleon 7.0 MeV. Find the energy released.",
        steps: [
          "Given: each \\({}^{2}_{1}\\text{H}\\) has \\(A = 2\\), \\(E_{bn} = 1.1\\) MeV; \\({}^{4}_{2}\\text{He}\\) has \\(A = 4\\), \\(E_{bn} = 7.0\\) MeV.",
          "Formula: \\(Q = \\sum (A\\,E_{bn})_{\\text{products}} - \\sum (A\\,E_{bn})_{\\text{reactants}}\\).",
          "Reactants: \\(2 \\times (2 \\times 1.1) = 4.4\\) MeV.",
          "Product: \\(4 \\times 7.0 = 28.0\\) MeV.",
          "\\(Q = 28.0 - 4.4 = 23.6\\) MeV.",
        ],
        answer: "23.6 MeV released",
      },
      selfCheckExample: {
        prompt:
          "A nucleus of mass number 220, with binding energy per nucleon 7.7 MeV, splits into two fragments and releases 176 MeV. Find the average binding energy per nucleon of the fragments.",
        steps: [
          "Binding energy of the parent: \\(220 \\times 7.7 = 1694\\) MeV.",
          "The fragments hold 176 MeV more: \\(1694 + 176 = 1870\\) MeV, shared by the same 220 nucleons.",
          "Average: \\(\\dfrac{1870}{220} = 8.5\\) MeV per nucleon.",
        ],
        answer: "8.5 MeV per nucleon",
      },
      practiceSet: [
        { prompt: "Find the total binding energy of a nucleus with A = 50 and binding energy per nucleon 8.7 MeV.", answer: "\\(50 \\times 8.7 = 435\\) MeV" },
        { prompt: "In a nuclear change the products have a lower total binding energy than the reactants. Is energy released or absorbed?", answer: "Absorbed: the products are less tightly bound, so they have more mass" },
        { prompt: "Why does splitting a nucleus near A = 56 into two smaller nuclei not release energy?", answer: "Nuclei near A = 56 are at the peak of the curve; the smaller fragments would have a lower binding energy per nucleon, so energy would have to be supplied" },
      ],
      pyqExampleId: "ec54562b-470d-4b81-bab4-ffb2a4c1a107",
      traps: [
        {
          title: "Subtracting the per-nucleon values only",
          body: "Multiply each binding energy per nucleon by that nucleus's A first. Subtracting one binding energy per nucleon from another gives a gain per nucleon, not the energy released, unless you then multiply by the number of nucleons.",
        },
        {
          title: "Products and reactants the wrong way round",
          body: "Energy released = binding energy of the PRODUCTS minus that of the reactants. This is the opposite order to the mass calculation, where you take reactants minus products.",
        },
        {
          title: "Explaining fission with no reference to the curve",
          body: "When asked to use the graph, say where the parent sits (on the falling part, A > 170), where the fragments sit (near the top), and that their higher binding energy per nucleon means energy is released.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpnu-energy-from-mass",
      name: "Energy of a fission or fusion event from masses",
      intuition:
        "Write the full equation, add the masses on each side, and subtract. Whatever mass has gone missing has turned into energy. If the products come out heavier, the event cannot happen on its own.",
      definition:
        "- **Energy released:** \\(Q = [\\text{mass of reactants} - \\text{mass of products}] \\times 931.5\\ \\text{MeV}\\), with masses in u. Use 931 MeV if the question gives it.\n" +
        "- Write the full equation first and count **every** neutron: the one that starts a fission, and all the ones that come out.\n" +
        "- A neutron on both sides cancels; cancel it before substituting.\n" +
        "- If Q comes out negative, the products are heavier: the event is **not energetically possible** on its own and that much energy would have to be supplied.",
      formula: {
        label: "Energy of an event from masses",
        latex: "Q = \\left[\\sum m_{\\text{reactants}} - \\sum m_{\\text{products}}\\right] \\times 931.5\\ \\text{MeV/u}",
        symbols: [
          { symbol: "\\(m\\)", meaning: "mass of each nucleus or neutron, in u" },
          { symbol: "\\(Q\\)", meaning: "energy released (positive) or needed (negative)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the energy released in the fusion \\({}^{2}_{1}\\text{H} + {}^{2}_{1}\\text{H} \\rightarrow {}^{3}_{1}\\text{H} + {}^{1}_{1}\\text{H}\\). Masses: \\({}^{2}_{1}\\text{H}\\) 2.014102 u, \\({}^{3}_{1}\\text{H}\\) 3.016049 u, \\({}^{1}_{1}\\text{H}\\) 1.007825 u; 1 u = 931.5 MeV/\\(c^2\\).",
        steps: [
          "Check: mass numbers \\(2 + 2 = 3 + 1\\); atomic numbers \\(1 + 1 = 1 + 1\\).",
          "Mass of reactants: \\(2 \\times 2.014102 = 4.028204\\) u.",
          "Mass of products: \\(3.016049 + 1.007825 = 4.023874\\) u.",
          "\\(\\Delta m = 4.028204 - 4.023874 = 0.004330\\) u.",
          "\\(Q = 0.004330 \\times 931.5 = 4.03\\) MeV.",
        ],
        answer: "4.03 MeV released",
      },
      selfCheckExample: {
        prompt:
          "Can a helium-4 nucleus split by itself into two deuterons? Masses: \\({}^{4}_{2}\\text{He}\\) 4.002603 u, \\({}^{2}_{1}\\text{H}\\) 2.014102 u; 1 u = 931.5 MeV/\\(c^2\\).",
        steps: [
          "\\(\\Delta m = 4.002603 - 2 \\times 2.014102 = 4.002603 - 4.028204 = -0.025601\\) u.",
          "\\(Q = -0.025601 \\times 931.5 = -23.85\\) MeV.",
          "Q is negative, so the products are heavier than the parent.",
        ],
        answer: "No: Q = \\(-23.85\\) MeV, so 23.85 MeV would have to be supplied",
      },
      practiceSet: [
        { prompt: "In a fission the reactants have a total mass of 236.0526 u and the products 235.8666 u. Find the energy released.", answer: "\\(0.1860 \\times 931.5 = 173.3\\) MeV" },
        { prompt: "A proposed break-up gives products heavier than the parent by 0.01 u. Can it happen by itself? How much energy would have to be supplied?", answer: "No; \\(0.01 \\times 931.5 = 9.315\\) MeV" },
        { prompt: "In a fission equation one neutron is absorbed and three come out. How many neutron masses remain on the product side after cancelling?", answer: "Two" },
      ],
      pyqExampleId: "b21cecd8-42e4-43a7-a41a-5bcb08d766d7",
      traps: [
        {
          title: "Losing a neutron",
          body: "Count the neutron that starts the fission on the left, and every neutron that comes out on the right. Dropping one changes the answer by about 940 MeV, which is absurd for a fission.",
        },
        {
          title: "A negative Q reported as energy released",
          body: "A negative Q means the products are heavier: the event cannot happen by itself. Say so in words, as the verdict carries a mark.",
        },
        {
          title: "Swapping 931 and 931.5",
          body: "Use the conversion printed in the question, whether it gives 931 or 931.5 MeV per u. The two answers differ in the last figure, and the marks follow the printed value.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpnu-fuel-energy",
      name: "Energy from a mass of fuel",
      intuition:
        "One fission or fusion gives only a few MeV or a few hundred MeV, but a gram of fuel holds about \\(10^{21}\\) to \\(10^{23}\\) nuclei. Count the nuclei, count the events, multiply by the energy per event, and then divide by the power to find how long it lasts.",
      definition:
        "- **Number of nuclei:** \\(N = \\dfrac{m}{M} \\times N_A\\), with \\(m\\) the mass in grams, \\(M\\) the molar mass (about A grams) and \\(N_A = 6.023 \\times 10^{23}\\) per mole.\n" +
        "- **Number of events:** divide N by the number of fuel nuclei one event uses. Each \\({}^{2}_{1}\\text{H} + {}^{2}_{1}\\text{H}\\) fusion uses TWO deuterons, so the number of reactions is \\(N/2\\).\n" +
        "- **Energy:** \\(E = (\\text{number of events}) \\times (\\text{energy per event})\\), then \\(1\\ \\text{MeV} = 1.6 \\times 10^{-13}\\) J.\n" +
        "- **Time:** \\(t = \\dfrac{E}{P}\\) in seconds; one year is about \\(3.15 \\times 10^{7}\\) s.",
      formula: {
        label: "Energy from a mass of fuel and how long it lasts",
        latex: "E = \\frac{m}{M} N_A \\times \\frac{Q}{k}, \\qquad t = \\frac{E}{P}",
        symbols: [
          { symbol: "\\(m, M\\)", meaning: "mass of fuel and its molar mass, both in grams" },
          { symbol: "\\(N_A\\)", meaning: "Avogadro number, 6.023 × 10²³ per mole" },
          { symbol: "\\(Q\\)", meaning: "energy released per event" },
          { symbol: "\\(k\\)", meaning: "number of fuel nuclei one event uses (1 for fission, 2 for D-D fusion)" },
          { symbol: "\\(P\\)", meaning: "power of the lamp or device, in watts" },
        ],
      },
      authoredExample: {
        prompt:
          "A reactor gives out \\(10^{9}\\) W (1000 MW) from the fission of uranium-235, at 200 MeV per fission. What mass of uranium-235 undergoes fission in one day?",
        steps: [
          "Given: \\(P = 10^{9}\\) W, \\(t = 1\\) day \\(= 86400\\) s, \\(Q = 200\\) MeV, \\(M = 235\\) g per mole.",
          "Energy in one day: \\(E = Pt = 10^{9} \\times 86400 = 8.64 \\times 10^{13}\\) J.",
          "Energy per fission: \\(200 \\times 1.6 \\times 10^{-13} = 3.2 \\times 10^{-11}\\) J.",
          "Number of fissions: \\(\\dfrac{8.64 \\times 10^{13}}{3.2 \\times 10^{-11}} = 2.7 \\times 10^{24}\\).",
          "Moles: \\(\\dfrac{2.7 \\times 10^{24}}{6.023 \\times 10^{23}} = 4.48\\); mass \\(= 4.48 \\times 235 = 1053\\) g.",
        ],
        answer: "About 1.05 kg of uranium-235 a day",
      },
      selfCheckExample: {
        prompt:
          "In the Sun, four hydrogen nuclei become one helium-4 nucleus with the release of 26.7 MeV. How much energy, in joules, is released when 1 g of hydrogen is turned into helium?",
        steps: [
          "1 g of hydrogen holds \\(6.023 \\times 10^{23}\\) nuclei.",
          "Each cycle uses 4 of them: \\(\\dfrac{6.023 \\times 10^{23}}{4} = 1.506 \\times 10^{23}\\) cycles.",
          "\\(E = 1.506 \\times 10^{23} \\times 26.7 = 4.02 \\times 10^{24}\\) MeV.",
          "\\(E = 4.02 \\times 10^{24} \\times 1.6 \\times 10^{-13} = 6.43 \\times 10^{11}\\) J.",
        ],
        answer: "About \\(6.4 \\times 10^{11}\\) J",
      },
      practiceSet: [
        { prompt: "How many atoms are there in 1 g of uranium-235?", answer: "\\(\\dfrac{6.023 \\times 10^{23}}{235} = 2.56 \\times 10^{21}\\)" },
        { prompt: "Convert 17.6 MeV, the energy of one D-T fusion, into joules.", answer: "\\(17.6 \\times 1.6 \\times 10^{-13} = 2.82 \\times 10^{-12}\\) J" },
        { prompt: "A store of \\(3.6 \\times 10^{6}\\) J runs a 100 W lamp. For how long does it last?", answer: "\\(3.6 \\times 10^{4}\\) s, which is 10 hours" },
      ],
      pyqExampleId: "e7d33247-2cc4-4c34-a7f5-554c54cee672",
      traps: [
        {
          title: "Not halving for D-D fusion",
          body: "Each D-D reaction uses two deuterons. Multiplying the number of deuterons by the energy per reaction doubles the answer; divide by 2 first.",
        },
        {
          title: "Grams and kilograms",
          body: "The molar mass is in grams per mole (about A grams for a nuclide of mass number A). A question that gives the fuel in kilograms needs the mass changed to grams before dividing by the molar mass.",
        },
        {
          title: "Stopping in MeV",
          body: "Power is in watts, so change MeV to joules (\\(1\\ \\text{MeV} = 1.6 \\times 10^{-13}\\) J) before dividing by P, and give the time with its unit.",
        },
      ],
    },
  ],
};
