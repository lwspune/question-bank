import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_EC_MINERALS_NOTE: SubtopicNote = {
  subtopicName: "Minerals, Power and Industry",
  title: "Minerals, Power and Industry",
  oneLineDefinition:
    "The coal companies and the States that lead in key minerals, India's power plants and dams by State, and the places and companies behind its major industries.",
  whyItMatters:
    "Fifteen CDS questions from 2016 to 2026. Four are four-way matches of a plant, dam or company with its State or product. The same question on India's oldest government coal company came in 2022 (II) and again in 2026 (I).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeec-coal-minerals",
      name: "Coal companies and minerals",
      intuition:
        "Two coal companies are easy to mix up. Coal India is the giant, made in 1975 when the coal mines were nationalised. Singareni is much older, a government company since 1920. " +
        "For other minerals, CDS asks which State leads, and one or two States usually dominate.",
      definition:
        "- **Singareni Collieries Company Limited** (1920) is the **first and oldest government-owned coal company** in India. It mines the **Godavari valley coalfield** in **Telangana**.\n" +
        "- **Coal India Limited** (1975) has its **headquarters in Kolkata** and is the **largest coal-producing company in the world**. It works mines in **eight States**, through subsidiaries such as Mahanadi Coalfields and Eastern Coalfields.\n" +
        "- **Neyveli Lignite Corporation** (1956, now NLC India) mines **lignite** in **Tamil Nadu**.\n" +
        "- **Bauxite**: **Odisha** produces most of India's output (Koraput and Kalahandi). **Jharkhand** (Lohardaga, Gumla) is among the other producers.\n" +
        "- **Chrysotile asbestos**: India's largest deposits are in the **Cuddapah (Kadapa) belt of Andhra Pradesh**.",
      table: {
        columns: ["Company or mineral", "Key fact"],
        rows: [
          {
            cells: ["Singareni Collieries", "Oldest government coal company (1920); Godavari valley, Telangana"],
            noteAmber: "Asked twice: CDS 2022 (II) and 2026 (I).",
            pyqExampleId: "6b1a3e6d-b48c-4d90-9198-d8d9c98904e1",
          },
          {
            cells: ["Coal India Limited", "Formed 1975; headquarters Kolkata; world's largest coal producer; mines in eight States"],
            noteAmber: "CDS 2020 (I): its mines are spread over eight States, not twenty.",
            pyqExampleId: "2482736b-ae39-4e67-a016-7bcfdf256d27",
          },
          { cells: ["Neyveli Lignite Corporation", "Formed 1956; lignite mines in Tamil Nadu"] },
          {
            cells: ["Bauxite", "Odisha first by far; Jharkhand among the others"],
            noteAmber: "CDS 2025 (I), citing the Ministry of Mines report for 2023-24: Odisha and Jharkhand.",
            pyqExampleId: "94f67891-7108-4472-bf96-5c8381f1a45b",
          },
          {
            cells: ["Chrysotile asbestos", "Largest deposits in the Cuddapah belt, Andhra Pradesh"],
            noteAmber: "CDS 2022 (II): the State with chrysotile asbestos and the Neelam Sanjiva Reddy Sagar (Srisailam) project.",
            pyqExampleId: "512a9162-c3aa-4f31-8210-675a7b590470",
          },
        ],
      },
      pyqExampleId: "734beec8-0729-408a-9e22-4d6c7a23790b",
      selfCheckExample: {
        prompt: "A company was set up in 1975 to run India's nationalised coal mines and has its headquarters in Kolkata. Name it, and say how it ranks among the coal companies of the world.",
        steps: [
          "The coal mines were nationalised in the early 1970s and brought under one holding company in 1975.",
          "That company, headquartered in Kolkata, is Coal India Limited.",
        ],
        answer: "Coal India Limited, the largest coal-producing company in the world",
      },
      practiceSet: [
        { prompt: "In which State does Singareni Collieries mine coal?", answer: "Telangana (the Godavari valley coalfield)" },
        { prompt: "Which State produces most of India's bauxite?", answer: "Odisha" },
        { prompt: "What kind of coal does Neyveli in Tamil Nadu produce?", answer: "Lignite" },
        { prompt: "In which State are India's largest chrysotile asbestos deposits?", answer: "Andhra Pradesh (the Cuddapah belt)" },
      ],
      traps: [
        {
          title: "Oldest is not largest",
          body: "**Singareni** (1920) is the **oldest** government coal company. **Coal India** (1975) is the **largest**. Neyveli (1956) mines lignite, and Mahanadi and Eastern Coalfields are Coal India's subsidiaries.",
        },
        {
          title: "Eight States, not twenty",
          body: "Coal India is headquartered in Kolkata and is the world's largest coal producer, but its mines are in **eight** coal-bearing States. A figure of twenty States is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeec-power",
      name: "Power plants and dams",
      intuition:
        "CDS gives four power plants or dams and four States and asks you to pair them. The quickest route is the river: once you know which river a dam stands on, the State usually follows. " +
        "For power in general, remember that coal is still king, whatever the growth of solar and wind.",
      definition:
        "- **Thermal plants** (mostly coal) are India's **largest source of electricity**. In the mid-2010s they held about two-thirds of installed capacity; by the mid-2020s, after fast growth in solar and wind, they still held about half the capacity and produced about three-quarters of the electricity generated.\n" +
        "- **Geothermal energy** comes from hot springs: **Manikaran** in the Parvati valley of Himachal Pradesh and the **Puga valley** in Ladakh have experimental projects.\n" +
        "- Two dams on the **Kaveri**: **Krishnarajasagar** in Karnataka and, downstream, **Mettur** in Tamil Nadu.\n" +
        "- **Salal** and **Baglihar** are hydro projects on the **Chenab** in Jammu and Kashmir.",
      table: {
        columns: ["Plant or dam", "Type, river and State"],
        rows: [
          { cells: ["Satpura (Sarni)", "Thermal; Madhya Pradesh"] },
          { cells: ["Dhuvaran", "Thermal; Anand district, Gujarat"] },
          { cells: ["Tanakpur", "Hydro on the Sharda; Uttarakhand"] },
          { cells: ["Dabhol", "Gas-based; Ratnagiri, Maharashtra"] },
          {
            cells: ["Cheruthoni", "One of the three dams of the Idukki project; Kerala"],
            noteAmber: "CDS 2018 (II): a match of Cheruthoni, Indira Sagar, Krishnarajasagar and Mettur with their States.",
            pyqExampleId: "af1c16a4-4a54-48d5-bda5-2e57a3f0e35b",
          },
          { cells: ["Indira Sagar", "On the Narmada; Madhya Pradesh"] },
          { cells: ["Krishnarajasagar", "On the Kaveri; Karnataka"] },
          { cells: ["Mettur", "On the Kaveri; Tamil Nadu"] },
          {
            cells: ["Luhri", "Hydro on the Satluj; Himachal Pradesh"],
            noteAmber: "CDS 2021 (I): Luhri is on the Satluj, not the Beas.",
            pyqExampleId: "84b86ddf-4289-4ad3-bd71-c09c1f959ace",
          },
          {
            cells: ["Manikaran", "Geothermal (hot springs), Parvati valley; Himachal Pradesh"],
            pyqExampleId: "0b086e3d-9585-454c-b03c-59bc9d317171",
          },
          { cells: ["Salal and Baglihar", "Hydro on the Chenab; Jammu and Kashmir"] },
        ],
      },
      pyqExampleId: "67a257d8-aa5b-458a-821e-ee9e59a5370f",
      selfCheckExample: {
        prompt: "Two dams stand on the Kaveri, one in Karnataka and one further downstream in Tamil Nadu. Name them.",
        steps: [
          "The Kaveri rises in Karnataka, so its first big dam is there: Krishnarajasagar, near Mysuru.",
          "It then flows into Tamil Nadu, where it is dammed at Mettur.",
        ],
        answer: "Krishnarajasagar (Karnataka) and Mettur (Tamil Nadu)",
      },
      practiceSet: [
        { prompt: "On which river is the Indira Sagar dam?", answer: "The Narmada" },
        { prompt: "Which kind of power plant is India's largest source of electricity?", answer: "Thermal (mainly coal)" },
        { prompt: "In which district and State is the Dabhol power plant?", answer: "Ratnagiri, Maharashtra" },
        { prompt: "Name a place in Ladakh with hot springs studied for geothermal energy.", answer: "The Puga valley" },
      ],
      traps: [
        {
          title: "Tanakpur is in Uttarakhand",
          body: "**Tanakpur** stands on the Sharda in **Uttarakhand**, on the Nepal border. It is not in Uttar Pradesh or Madhya Pradesh.",
        },
        {
          title: "Cheruthoni is Kerala's",
          body: "**Cheruthoni** is part of the **Idukki** project in **Kerala**. Mettur, its usual swap in the options, is the Kaveri dam in **Tamil Nadu**.",
        },
        {
          title: "Renewables grew, coal still leads",
          body: "Solar and wind capacity has grown fast, but **thermal power** still produces most of India's electricity. A question on the largest source wants **thermal**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeec-industries",
      name: "Industries and where they stand",
      intuition:
        "Where a factory is built depends on its raw material. If the raw material loses a lot of weight in making the product (iron ore, sugarcane), the factory goes to the raw material. " +
        "If it loses none, like raw cotton, the factory can go to the market or to cheap labour and power instead. That is why cotton mills spread far beyond the cotton fields.",
      definition:
        "- **Weight-losing raw materials** (iron ore, coal, sugarcane) pull industry **close to the raw material**: steel plants in the Chota Nagpur region, sugar mills beside the cane fields.\n" +
        "- **Raw cotton is a pure raw material**: it does **not lose weight** in making cloth. So cotton mills are not tied to the cotton belt, and the industry **spread beyond Gujarat and Maharashtra** to markets and centres of labour and power across India.\n" +
        "- Tourism slogans: **Karnataka** is **'One State Many Worlds'**, **Kerala** is **'God's Own Country'**, and **Madhya Pradesh** is **'The Heart of Incredible India'**.",
      table: {
        columns: ["Place or company", "Industry"],
        rows: [
          {
            cells: ["Bongaigaon (Assam)", "Oil refinery and petrochemicals"],
            noteAmber: "CDS 2016 (II): a match of Bongaigaon, Koraput, Pinjore and Sirpur with their industries.",
            pyqExampleId: "50329795-4277-45f0-97eb-2d68b7779d24",
          },
          { cells: ["Koraput (Odisha)", "Aircraft engines (Hindustan Aeronautics, Sunabeda)"] },
          { cells: ["Pinjore (Haryana)", "Machine tools (HMT)"] },
          { cells: ["Sirpur (Telangana)", "Paper"] },
          {
            cells: ["TISCO (Jamshedpur)", "Iron and steel"],
            noteAmber: "CDS 2017 (II): a match of TISCO, BALCO, BPCL and BEL with their products.",
            pyqExampleId: "a3ef4783-18c7-42d0-9cdd-c2d9a9face32",
          },
          { cells: ["BALCO (Korba, Chhattisgarh)", "Aluminium"] },
          { cells: ["BPCL", "Petroleum refining and chemicals"] },
          { cells: ["BEL", "Electronics, mainly for defence"] },
        ],
      },
      pyqExampleId: "6f3034da-4992-4184-9dd1-91d15398628d",
      selfCheckExample: {
        prompt: "Sugarcane loses much of its weight when it is crushed, and it dries out within a day or two of cutting. Where should a sugar mill be built, and why?",
        steps: [
          "A weight-losing raw material is cheaper to process before it is carried far.",
          "Sugarcane also spoils fast, so it must be crushed soon after cutting.",
        ],
        answer: "Close to the cane fields, because the cane is weight-losing and perishable.",
      },
      practiceSet: [
        { prompt: "Where is BALCO's aluminium smelter?", answer: "Korba, Chhattisgarh" },
        { prompt: "What does the HMT factory at Pinjore make?", answer: "Machine tools" },
        { prompt: "Which State uses the tourism line 'God's Own Country'?", answer: "Kerala" },
        { prompt: "Why are iron and steel plants built close to iron ore and coal?", answer: "Because these raw materials are heavy and lose weight in making steel" },
      ],
      traps: [
        {
          title: "Koraput makes aircraft engines",
          body: "**Koraput** in Odisha has Hindustan Aeronautics' aero-engine division. **Sirpur** makes paper and **Pinjore** makes machine tools.",
        },
        {
          title: "Cotton does not lose weight",
          body: "Raw cotton is a **pure** raw material, so it is **not** weight-losing. That is why the cotton textile industry could spread away from the cotton-growing States.",
        },
      ],
    },
  ],
};
