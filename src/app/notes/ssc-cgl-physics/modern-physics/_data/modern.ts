import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_FMP_MODERN_NOTE: SubtopicNote = {
  subtopicName: "Radioactivity and Quantum Physics",
  title: "Radioactivity and Quantum Physics",
  oneLineDefinition:
    "What alpha, beta-minus, beta-plus and gamma decay do to a nucleus, the photoelectric effect and Bohr's energy levels, and the physicists SSC pairs with their discoveries.",
  whyItMatters:
    "Thirteen questions in the bank: six from the 2023 shifts and seven from the 2025 shifts, none from 2024. The 2025 shifts asked mostly about decay, so the decay table is worth learning cold.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscfmpmo-decay",
      name: "Radioactive decay",
      intuition:
        "Each decay changes the atomic number Z and the mass number A in a fixed way. Learn the change for each, and you can answer any 'which decay' question.",
      definition:
        "The decays:\n" +
        "- **Alpha**: emits a **helium-4 nucleus**; Z falls by **2**, A by **4**.\n" +
        "- **Beta-minus**: a neutron becomes a proton; Z **rises by 1**, A unchanged.\n" +
        "- **Beta-plus**: a proton becomes a neutron; Z **falls by 1**, A unchanged.\n" +
        "- **Gamma**: no change in Z or A; only energy leaves.\n\n" +
        "Facts:\n" +
        "- Most of Earth's argon is argon-40 from the decay of **potassium-40** in rocks (the basis of K-Ar dating).\n" +
        "- **Geiger-Nuttall law** (1911): alpha emitters with shorter half-lives give more energetic alpha particles.",
      table: {
        columns: ["Decay", "Change in Z", "Change in A"],
        rows: [
          { cells: ["Alpha", "Minus 2", "Minus 4"], pyqExampleId: "fbd35332-1d61-4cda-bbc5-4ba94be5b8a1" },
          { cells: ["Beta-minus", "Plus 1", "None"], pyqExampleId: "7fbc1db5-20ce-4267-ac25-af80c1f6bfd0" },
          { cells: ["Beta-plus", "Minus 1", "None"], pyqExampleId: "8e17aa29-7a80-4bd6-bd26-03e48e5a1c83" },
          { cells: ["Gamma", "None", "None"] },
        ],
      },
      pyqExampleId: "4e5f6edd-1fed-49bb-8940-9a1bb23d92bf",
      selfCheckExample: {
        prompt: "Uranium-238 (Z = 92) emits one alpha particle. What are the new atomic and mass numbers?",
        steps: ["Alpha decay lowers Z by 2 and A by 4.", "92 minus 2 = 90; 238 minus 4 = 234."],
        answer: "Z = 90, A = 234 (thorium-234).",
      },
      practiceSet: [
        { prompt: "What is an alpha particle?", answer: "A helium-4 nucleus" },
        { prompt: "Which decay changes neither Z nor A?", answer: "Gamma decay" },
        { prompt: "Argon in the crust comes mainly from the decay of which isotope?", answer: "Potassium-40" },
      ],
      traps: [
        {
          title: "Beta-plus lowers Z",
          body: "**Beta-minus** raises Z by 1; **beta-plus** lowers it by 1. Options give beta-plus the beta-minus change.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscfmpmo-quantum",
      name: "Quantum ideas and the physicists",
      intuition:
        "Light comes in packets, and an atom's energy comes in steps. The rest of this concept pairs physicists with what they found.",
      definition:
        "Ideas:\n" +
        "- **Photoelectric effect**: light acts as **particles** (photons). Below a **threshold frequency** no electron leaves, however bright the light. Brighter light gives **more** electrons, not **faster** ones; their energy depends on frequency.\n" +
        "- **Bohr model**: E = minus 13.6 / n squared eV, so the gaps between levels **shrink** as n grows.\n\n" +
        "Physicists:\n" +
        "- **Victor Hess**: **cosmic rays**. **C. T. R. Wilson**: the **cloud chamber** (Nobel 1927, with Compton).\n" +
        "- **Cornell and Wieman**: the first **Bose-Einstein condensate** (1995).\n" +
        "- **Marconi**: radio signals over kilometres in the 1890s.\n" +
        "- **Bardeen**: superconductivity theory. **de Broglie**: wave nature of matter. **Dirac**: antimatter (not liquid helium).",
      table: {
        columns: ["Physicist", "Known for"],
        rows: [
          { cells: ["Victor Hess", "Cosmic rays"], pyqExampleId: "bba2b7c3-9e2b-46db-b39f-363b04fc2373" },
          { cells: ["C. T. R. Wilson", "Cloud chamber"], pyqExampleId: "1f3dbb9b-26f6-4150-b043-ab75c6f75067" },
          { cells: ["Cornell and Wieman", "Bose-Einstein condensate"], pyqExampleId: "5844ce4a-3fb4-41b9-adf4-f9b67e8d5cf4" },
          { cells: ["Marconi", "Radio signals"], pyqExampleId: "a52bbb38-6961-4a68-89aa-055015aacc35" },
          { cells: ["Paul Dirac", "Antimatter, not liquid helium"], pyqExampleId: "ebdc058f-3ecf-454f-92e1-11b32813aa1c" },
        ],
      },
      pyqExampleId: "beebe019-2348-4639-83b1-c4bcaffac729",
      selfCheckExample: {
        prompt: "In Bohr's hydrogen atom, is the gap between levels 3 and 4 bigger or smaller than between 1 and 2?",
        steps: ["E2 minus E1 = 10.2 eV.", "E4 minus E3 is about 0.66 eV: the gaps shrink as n grows."],
        answer: "Smaller.",
      },
      practiceSet: [
        { prompt: "Does brighter light give photoelectrons more energy?", answer: "No; it gives more electrons" },
        { prompt: "Who discovered cosmic rays?", answer: "Victor Hess" },
        { prompt: "Who gave the wave nature of matter?", answer: "Louis de Broglie" },
      ],
      traps: [
        {
          title: "Intensity changes the count, not the energy",
          body: "A statement that photoelectron energy rises with light **intensity** is false. Energy depends on **frequency**.",
        },
      ],
    },
  ],
};
