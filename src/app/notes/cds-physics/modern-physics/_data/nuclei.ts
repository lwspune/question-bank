import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_MO_NUCLEI_NOTE: SubtopicNote = {
  subtopicName: "Atoms and Nuclei",
  title: "Atoms and Nuclei",
  oneLineDefinition:
    "The particles inside and beyond the atom, the three kinds of radioactive decay and the fallout isotopes, and how fission and fusion release energy in reactors, bombs and the Sun.",
  whyItMatters:
    "Eight CDS questions from 2016 (II) to 2024 (I). Three ask about particles (the neutron, the muon and the Higgs boson), two about radioactive decay and fallout, and three about fission and fusion. The Higgs boson question of 2024 (I) is the chapter's one HARD question.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsphmo-particles",
      name: "Subatomic particles",
      intuition:
        "An atom has a tiny heavy nucleus of protons and neutrons, with electrons moving round it. Any particle smaller than an atom is called subatomic: the three that build atoms, and others such as the muon from cosmic rays and the Higgs boson found in a giant collider.",
      definition:
        "What to know:\n" +
        "- The **nucleus** holds **protons** and **neutrons** (together called nucleons). **Electrons** move round the nucleus.\n" +
        "- **Atomic number** \\(Z\\) = number of protons. **Mass number** \\(A\\) = protons + neutrons. Neutrons = \\(A - Z\\).\n" +
        "- The neutron is slightly heavier than the proton; the electron is about 1836 times lighter than the proton.\n" +
        "- Protons and neutrons are themselves made of **quarks**.\n" +
        "- Mass is often given as energy: 1 u is about 931.5 MeV, and 1 GeV = 1000 MeV.",
      table: {
        columns: ["Particle", "Charge", "Mass and where it is found"],
        rows: [
          { cells: ["Electron", "Negative (−1)", "About 1/1836 of a proton; moves round the nucleus"] },
          { cells: ["Proton", "Positive (+1)", "About 1 u (938 MeV); in the nucleus"] },
          {
            cells: ["Neutron", "None", "Slightly more than a proton; in the nucleus"],
            noteAmber: "CDS 2020 (II): neutrons are inside the nucleus; it is electrons that move round it.",
            pyqExampleId: "37272a46-454f-469d-ae5a-8c12d7eb0dd4",
          },
          {
            cells: ["Muon", "Negative (−1)", "About 207 times an electron; made by cosmic rays, lives about 2 millionths of a second"],
            noteAmber: "CDS 2024 (I): the electron, proton, neutron and muon are all subatomic particles.",
            pyqExampleId: "f0b5f4a3-7518-425e-9872-457981f4c1ed",
          },
          { cells: ["Photon", "None", "No rest mass; carries light and all electromagnetic radiation"] },
          {
            cells: ["Higgs boson", "None", "About 125 GeV; found at CERN's Large Hadron Collider in 2012"],
            noteAmber: "CDS 2024 (I): of 0.5 MeV, 900 MeV, 100 GeV and 1000 GeV, the closest to its mass is 100 GeV.",
            pyqExampleId: "cda16466-4a9b-4171-8baf-68a82e2d2281",
          },
        ],
      },
      pyqExampleId: "37272a46-454f-469d-ae5a-8c12d7eb0dd4",
      selfCheckExample: {
        prompt: "How many protons, neutrons and electrons are there in a neutral atom of sodium-23 (atomic number 11)?",
        steps: [
          "Protons = atomic number = 11.",
          "Neutrons = mass number − atomic number = 23 − 11 = 12.",
          "A neutral atom has as many electrons as protons: 11.",
        ],
        answer: "11 protons, 12 neutrons, 11 electrons.",
      },
      practiceSet: [
        { prompt: "Of the electron, the proton and the neutron, which has the least mass?", answer: "The electron" },
        { prompt: "Where was the Higgs boson found, and in which year?", answer: "At CERN's Large Hadron Collider, in 2012" },
        { prompt: "Is a muon heavier or lighter than an electron?", answer: "Heavier, about 207 times" },
        { prompt: "Which particles are protons and neutrons made of?", answer: "Quarks" },
      ],
      traps: [
        {
          title: "Neutrons stay in the nucleus",
          body: "Only **electrons** move round the nucleus. **Neutrons** and **protons** are packed inside it.",
        },
        {
          title: "The Higgs boson is about 125 GeV, not MeV",
          body: "Its mass is about **125 GeV**, more than 100 times a proton's (about 0.94 GeV). Do not pick an MeV value because the number looks familiar.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphmo-radioactivity",
      name: "Radioactive decay and fallout",
      intuition:
        "An unstable nucleus settles down by throwing something out. If it throws out an alpha particle, it loses two protons and two neutrons. If it throws out a beta particle, a neutron has turned into a proton. If it gives out a gamma ray, it only sheds extra energy: nothing in it is counted differently. Radioactive dust from a nuclear blast or accident gets into plants and animals, and from them into us.",
      definition:
        "What to know:\n" +
        "- **Alpha** stops in a sheet of paper; **beta** in a few millimetres of aluminium; **gamma** needs thick lead or concrete. Alpha ionises the most, gamma the least.\n" +
        "- **Half-life**: the time for half the nuclei of a sample to decay.\n" +
        "- Fallout isotopes enter the body through the **food chain**: **strontium-90** settles in **bones** (it behaves like calcium), **iodine-131** in the **thyroid** (often through milk), **caesium-137** in **soft tissue** (it behaves like potassium).\n" +
        "- Useful isotopes: cobalt-60 for cancer treatment, iodine-131 for thyroid disease, carbon-14 for dating old wood and bones (half-life about 5730 years).",
      table: {
        columns: ["Decay", "What leaves the nucleus", "Change in Z and A"],
        rows: [
          { cells: ["Alpha", "A helium nucleus (2 protons and 2 neutrons)", "Z falls by 2, A falls by 4"] },
          { cells: ["Beta (minus)", "An electron, made when a neutron turns into a proton", "Z rises by 1, A unchanged"] },
          {
            cells: ["Gamma", "A high-energy photon", "No change in Z or A"],
            noteAmber: "CDS 2016 (II): in gamma decay neither the mass number nor the atomic number changes.",
            pyqExampleId: "2b2328c6-efd3-4f03-b299-daa7cda13f21",
          },
        ],
      },
      pyqExampleId: "2b2328c6-efd3-4f03-b299-daa7cda13f21",
      selfCheckExample: {
        prompt: "Uranium-238 (atomic number 92) gives out one alpha particle. What are the atomic number and the mass number of the new nucleus?",
        steps: [
          "An alpha particle takes away 2 protons and 2 neutrons.",
          "Atomic number: 92 − 2 = 90. Mass number: 238 − 4 = 234.",
        ],
        answer: "Atomic number 90, mass number 234 (thorium-234).",
      },
      practiceSet: [
        { prompt: "Which radiation goes through matter most easily: alpha, beta or gamma?", answer: "Gamma" },
        { prompt: "Which fallout isotope settles in the bones because it behaves like calcium?", answer: "Strontium-90" },
        { prompt: "A nucleus gives out a beta particle. What happens to its atomic number?", answer: "It rises by 1" },
        { prompt: "Which isotope is used to find the age of old wood and bones?", answer: "Carbon-14" },
      ],
      traps: [
        {
          title: "Gamma changes no count",
          body: "A gamma ray is a **photon**: no charge, no mass. The nucleus only loses energy, so **Z and A stay the same**.",
        },
        {
          title: "Beta decay raises the atomic number",
          body: "In beta decay a **neutron becomes a proton** and an electron leaves. So **Z goes up by 1** while A is unchanged. It does not go down.",
        },
        {
          title: "All three fallout isotopes travel through food",
          body: "Strontium-90, iodine-131 and caesium-137 **all** enter the body through the food chain, each settling where a similar element normally goes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphmo-fission-fusion",
      name: "Fission, fusion and nuclear energy",
      intuition:
        "Splitting a very heavy nucleus (fission) and joining two very light ones (fusion) both release energy, because in each case the pieces at the end weigh a little less than what you started with. That missing mass becomes energy by Einstein's \\(E = mc^{2}\\), and because \\(c^{2}\\) is huge, a tiny loss of mass gives a vast amount of energy.",
      definition:
        "The rules:\n" +
        "- **Fission**: a heavy nucleus such as uranium-235, hit by a slow neutron, splits into two middle-sized nuclei and 2 or 3 neutrons, giving about 200 MeV. Those neutrons split more nuclei: a **chain reaction**.\n" +
        "- **Nuclear reactor**: the chain reaction is **controlled**. A **moderator** (heavy water or graphite) slows the neutrons; **control rods** (cadmium or boron) absorb spare neutrons; a coolant carries the heat away.\n" +
        "- **Atom bomb** (uranium or plutonium): the fission chain reaction is **uncontrolled**.\n" +
        "- **Fusion**: light nuclei (isotopes of hydrogen) join to make helium. It needs millions of degrees, so it is called **thermonuclear**. It powers the **Sun** and the **hydrogen bomb**.\n" +
        "- Energy from lost mass: \\(E = \\Delta m\\,c^{2}\\); a loss of 1 u gives about 931.5 MeV.\n" +
        "- In biology, **fission** also means an organism such as amoeba splitting into two (binary fission).",
      formula: {
        label: "Mass and energy",
        latex: "E = \\Delta m\\,c^{2} \\qquad 1\\ \\text{u} \\equiv 931.5\\ \\text{MeV}",
        symbols: [
          { symbol: "Δm", meaning: "mass lost in the reaction (mass defect)" },
          { symbol: "c", meaning: "speed of light, 3 × 10⁸ m/s" },
        ],
      },
      authoredExample: {
        prompt:
          "When a deuterium nucleus and a tritium nucleus fuse into helium-4 and a neutron, the mass lost is 0.0189 u. How much energy is released? How much energy would 1 g of mass give if it were turned completely into energy?",
        steps: [
          "\\(E = 0.0189 \\times 931.5 \\approx 17.6\\) MeV.",
          "For 1 g: \\(E = mc^{2} = 10^{-3} \\times (3 \\times 10^{8})^{2} = 9 \\times 10^{13}\\) J.",
        ],
        answer: "About 17.6 MeV per fusion; \\(9 \\times 10^{13}\\) J from 1 g.",
      },
      selfCheckExample: {
        prompt: "How much energy is released if 1 mg of mass is turned completely into energy?",
        steps: ["\\(1\\ \\text{mg} = 10^{-6}\\) kg.", "\\(E = 10^{-6} \\times 9 \\times 10^{16} = 9 \\times 10^{10}\\) J."],
        answer: "\\(9 \\times 10^{10}\\) J",
      },
      pyqExampleId: "e9c545c4-6ea1-4706-b030-8b0e7f057136",
      practiceSet: [
        { prompt: "What does the moderator in a nuclear reactor do?", answer: "It slows the neutrons down so that they cause more fission" },
        { prompt: "Name one material used in the control rods of a reactor.", answer: "Cadmium or boron" },
        { prompt: "Which process gives the Sun its energy: fission or fusion?", answer: "Fusion" },
        { prompt: "What does the word fission mean in biology?", answer: "An organism such as amoeba splitting into two (binary fission)" },
      ],
      traps: [
        {
          title: "Fission splits, fusion joins",
          body: "**Fission** breaks a **heavy** nucleus into lighter ones. **Fusion** joins **light** nuclei into a heavier one. Joining two nuclei is never fission.",
        },
        {
          title: "A reactor has a chain reaction too, kept under control",
          body: "Both a reactor and an atom bomb run a fission **chain reaction**. The reactor keeps it **controlled** with a moderator and control rods; the bomb lets it run away.",
        },
        {
          title: "Moderator slows, control rods absorb",
          body: "The **moderator** (heavy water, graphite) **slows** neutrons so they can split uranium-235. The **control rods** (cadmium, boron) **absorb** neutrons to keep the rate steady. Do not swap them.",
        },
      ],
    },
  ],
};
