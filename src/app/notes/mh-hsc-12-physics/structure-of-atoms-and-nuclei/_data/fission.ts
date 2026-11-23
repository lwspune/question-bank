import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_AN_FISSION_NOTE: SubtopicNote = {
  subtopicName: "Nuclear Fission and Fusion",
  title: "Nuclear Energy: Fission and Fusion",
  oneLineDefinition:
    "How splitting a heavy nucleus (fission) and joining two light nuclei (fusion) both release energy, the chain reaction and the nuclear reactor, and how to find the energy released in a nuclear reaction.",
  whyItMatters:
    "6 questions, all from the textbook's exercises and solved examples; no board paper in the bank has asked this section yet. They explain fission and fusion with an example of each, describe the principles of a nuclear reactor and how it differs from a bomb, and find the energy released in fission and fusion reactions and the uranium a 3000 MW reactor uses in a day.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpan-fission",
      name: "Nuclear fission and the nuclear reactor",
      intuition:
        "A heavy nucleus such as uranium is not as tightly bound, per nucleon, as the middle-weight nuclei it can break into. So when it splits, the two pieces together weigh less than the parent, and the lost mass comes out as a large amount of energy. Each split also frees two or three neutrons, which can split more nuclei. Let that run freely and you get a bomb; hold it to a steady rate and you get a power station.",
      definition:
        "- **Fission:** a heavy nucleus (A around 230) breaks into two lighter nuclei (A between 50 and 150) with the release of energy, because the products have a higher binding energy per nucleon.\n" +
        "- **Fuel:** \\(^{235}_{92}\\text{U}\\) absorbs a **slow** neutron and becomes \\(^{236}_{92}\\text{U}\\), which splits, for example \\(^{236}_{92}\\text{U} \\to {}^{140}_{56}\\text{Ba} + {}^{94}_{36}\\text{Kr} + 2n\\). More than 99% of natural uranium is \\(^{238}_{92}\\text{U}\\), less than 1% is \\(^{235}_{92}\\text{U}\\).\n" +
        "- **Energy released:** \\(Q = [m_{\\text{parent}} - \\sum m_{\\text{products}}]c^2\\), about 200 MeV per fission. It appears as kinetic energy of the products, that is, as heat.\n" +
        "- **Chain reaction:** each fission gives 2 to 4 neutrons, 2.7 on average; these cause further fissions, and the number of fissions grows rapidly.\n" +
        "- **Nuclear reactor:** fission is carried out in a **controlled** way, so energy is produced at a steady rate. The heat is carried away and converted to electricity with turbines.\n" +
        "- **Nuclear bomb:** the chain reaction is **uncontrolled**, so an extremely large energy is released in a very short time, an explosion.",
      formula: {
        label: "Energy released in fission",
        latex: "Q = \\left[m_{\\text{parent}} - \\sum m_{\\text{products}}\\right]c^2, \\qquad \\text{Power} = (\\text{fissions per second}) \\times (\\text{energy per fission})",
      },
      authoredExample: {
        prompt:
          "In a reactor \\(10^{19}\\) fissions take place each second, each releasing 200 MeV. Find the power produced. (1 MeV = \\(1.6 \\times 10^{-13}\\) J)",
        steps: [
          "Given: \\(10^{19}\\) fissions per second; 200 MeV \\(= 200 \\times 1.6 \\times 10^{-13} = 3.2 \\times 10^{-11}\\) J per fission.",
          "Formula: Power = fissions per second \\(\\times\\) energy per fission.",
          "Substitution: \\(P = 10^{19} \\times 3.2 \\times 10^{-11}\\).",
          "\\(P = 3.2 \\times 10^8\\) W = 320 MW.",
        ],
        answer: "\\(3.2 \\times 10^8\\) W (320 MW)",
      },
      selfCheckExample: {
        prompt: "In a fission reaction the products together are 0.2 u lighter than the reactants. Find the energy released. (1 u = 931.5 MeV)",
        steps: ["\\(Q = 0.2 \\times 931.5\\) MeV.", "\\(Q = 186.3\\) MeV."],
        answer: "186.3 MeV",
      },
      practiceSet: [
        { prompt: "On average, how many neutrons does one fission of uranium-236 release?", answer: "About 2.7" },
        { prompt: "Which uranium nucleus actually splits in a uranium reactor, and how is it made?", answer: "\\(^{236}_{92}\\text{U}\\), made when \\(^{235}_{92}\\text{U}\\) absorbs a slow neutron" },
        { prompt: "State the main difference between a nuclear reactor and a nuclear bomb.", answer: "In a reactor the chain reaction is controlled; in a bomb it is uncontrolled" },
      ],
      pyqExampleId: "edfeb113-8d94-4c38-8cc9-0507a88c5158",
      traps: [
        {
          title: "Saying fast neutrons cause fission of uranium-235",
          body: "Uranium-235 is bombarded with **slow** neutrons to form uranium-236, which then splits.",
        },
        {
          title: "Leaving the neutrons out of the mass balance",
          body: "In \\(Q = [m_{\\text{parent}} - \\sum m_{\\text{products}}]c^2\\), the products include every neutron released. Forgetting \\(2m_n\\) adds about 1880 MeV to a 200 MeV answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpan-fusion",
      name: "Nuclear fusion",
      intuition:
        "Light nuclei sit low on the binding energy curve, so when two of them join, the product is more tightly bound and a little mass is turned into energy. The difficulty is getting them close: both are positive and repel each other. Only at very high temperatures, as at the centre of the Sun, do they move fast enough to come within about 1 fm, where the nuclear force takes over.",
      definition:
        "- **Fusion:** two light nuclei (A less than 40) come within about 1 fm of each other and join to form a heavier nucleus, releasing energy of the order of MeV.\n" +
        "- The nuclei must be heated to a very high temperature so they have enough kinetic energy to overcome their electrostatic repulsion. The larger the charge (Z), the higher the temperature needed.\n" +
        "- **In the Sun** (centre about \\(10^7\\) K): four protons fuse into a helium nucleus, \\(4p \\to \\alpha + 2e^+ +\\) neutrinos.\n" +
        "- Fusion in stars can only build nuclei lighter than iron (A = 56), since iron has the highest binding energy per nucleon.\n" +
        "- **Energy released:** \\(Q = [\\sum m_{\\text{reactants}} - \\sum m_{\\text{products}}]c^2\\).",
      formula: {
        label: "Energy released in fusion",
        latex: "Q = \\left[\\sum m_{\\text{reactants}} - \\sum m_{\\text{products}}\\right]c^2",
      },
      authoredExample: {
        prompt:
          "Find the energy released in the fusion reaction \\(^{2}_{1}\\text{H} + {}^{3}_{1}\\text{H} \\to {}^{4}_{2}\\text{He} + n\\). Atomic masses: \\(^{2}\\text{H}\\) 2.014102 u, \\(^{3}\\text{H}\\) 3.016049 u, \\(^{4}\\text{He}\\) 4.002603 u; \\(m_n = 1.00866\\) u; 1 u = 931.5 MeV.",
        steps: [
          "Given: reactants \\(2.014102 + 3.016049 = 5.030151\\) u; products \\(4.002603 + 1.00866 = 5.011263\\) u. The electrons balance (2 on each side).",
          "Formula: \\(Q = [\\sum m_{\\text{reactants}} - \\sum m_{\\text{products}}]c^2\\).",
          "Substitution: \\(Q = (5.030151 - 5.011263) \\times 931.5 = 0.018888 \\times 931.5\\).",
          "\\(Q = 17.59\\) MeV.",
        ],
        answer: "17.59 MeV",
      },
      selfCheckExample: {
        prompt: "Which needs the higher temperature to fuse: two hydrogen nuclei or two carbon nuclei? Give the reason.",
        steps: [
          "A carbon nucleus carries charge 6e against 1e for hydrogen, so two carbon nuclei repel each other far more strongly.",
          "They need much more kinetic energy to come within about 1 fm, so a higher temperature.",
        ],
        answer: "Two carbon nuclei, because their larger charge means a larger repulsion to overcome",
      },
      practiceSet: [
        { prompt: "Why must a gas be heated to a very high temperature for fusion to take place?", answer: "The nuclei need large kinetic energy to overcome their electrostatic repulsion and come within about 1 fm" },
        { prompt: "About what is the temperature at the centre of the Sun?", answer: "About \\(10^7\\) K" },
        { prompt: "Why can stars not release energy by fusing iron into heavier nuclei?", answer: "Iron has the highest binding energy per nucleon, so a heavier product would be less tightly bound and energy would have to be supplied" },
      ],
      pyqExampleId: "43ce24ef-b56b-44a8-bf5f-548a3541e16c",
      traps: [
        {
          title: "Thinking any two nuclei release energy when they fuse",
          body: "Fusion releases energy only for light nuclei, below iron. Beyond iron, joining nuclei needs energy instead.",
        },
        {
          title: "Leaving out the electron masses in the Sun's reaction",
          body: "In \\(4p \\to \\alpha + 2e^+ +\\) neutrinos, the two positrons have mass. Subtract \\(2m_e\\) along with the alpha particle's mass.",
        },
      ],
    },
  ],
};
