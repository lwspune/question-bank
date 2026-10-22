import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_WO_REGIONAL_NOTE: SubtopicNote = {
  subtopicName: "Foreign Policy and Regional Groupings",
  title: "Foreign Policy and Regional Groupings",
  oneLineDefinition:
    "India's foreign policy from Nehru's non-alignment to the Gujral Doctrine, and the regional groups CDS asks about: SAARC, BIMSTEC, Mekong-Ganga Cooperation, ASEAN, BRICS, the SCO and the OIC.",
  whyItMatters:
    "Thirteen CDS questions: three EASY, nine MODERATE and one HARD. Most ask who the members are, where a group was founded or sits, or when it was formed. SAARC came up twice (CDS 2019 (II) and 2026 (I)). Membership changes, so every list here says the year it holds for.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolwo-nonalignment",
      name: "Non-alignment, Panchsheel and the Gujral Doctrine",
      intuition:
        "Newly free India chose not to join either Cold War bloc. Nehru built friendships with the other new nations of Asia and Africa instead, and that idea grew into the Non-Aligned Movement. Later prime ministers kept the aim of good relations, and Gujral turned it towards the neighbours.",
      definition:
        "In time order:\n" +
        "- **1947**: Nehru hosts the **Asian Relations Conference** in New Delhi. **Afro-Asian solidarity** becomes a founding idea of India's foreign policy.\n" +
        "- **1954**: **Panchsheel**, the five principles in the India and China agreement: mutual respect for each other's **territorial integrity and sovereignty**, mutual **non-aggression**, **non-interference** in internal affairs, **equality and mutual benefit**, and **peaceful co-existence**.\n" +
        "- **1955**: the Afro-Asian conference at **Bandung**, Indonesia.\n" +
        "- **1961**: the first **Non-Aligned Movement** summit at **Belgrade**. Its founding leaders: **Nehru** (India), **Nasser** (Egypt), **Tito** (Yugoslavia), **Sukarno** (Indonesia) and **Nkrumah** (Ghana). **Fidel Castro** became prominent later; Cuba hosted the 1979 summit.\n" +
        "- **1996**: the **Gujral Doctrine** of I. K. Gujral: India gives to its smaller South Asian neighbours **without asking for an equal return** (non-reciprocity), to **build trust** in the region.",
      table: {
        columns: ["Year", "Event", "Leader"],
        rows: [
          {
            cells: ["1947", "Asian Relations Conference, New Delhi", "Jawaharlal Nehru"],
            noteAmber: "CDS 2019 (I): Afro-Asian solidarity in India's foreign policy began with Nehru.",
            pyqExampleId: "8e3738d0-a2d4-4509-a26e-4930f7b8e007",
          },
          { cells: ["1954", "Panchsheel agreement with China", "Nehru and Zhou Enlai"] },
          { cells: ["1955", "Afro-Asian conference, Bandung", "Asian and African leaders"] },
          { cells: ["1961", "First NAM summit, Belgrade", "Nehru, Nasser, Tito, Sukarno, Nkrumah"] },
          { cells: ["1979", "NAM summit, Havana", "Fidel Castro"] },
          {
            cells: ["1996", "Gujral Doctrine", "I. K. Gujral"],
            pyqExampleId: "fdc690fd-9731-4f6b-8922-49834b67b28b",
          },
        ],
      },
      pyqExampleId: "aaa72fc2-6a0b-428e-9023-695bd5645275",
      selfCheckExample: {
        prompt: "Name the five principles of Panchsheel.",
        steps: [
          "Two are about respecting the other side: its territory and sovereignty, and its internal affairs.",
          "The others are non-aggression, equality with mutual benefit, and living together in peace.",
        ],
        answer: "Mutual respect for territorial integrity and sovereignty, non-aggression, non-interference in internal affairs, equality and mutual benefit, peaceful co-existence.",
      },
      practiceSet: [
        { prompt: "Which Indian prime minister made Afro-Asian solidarity central to India's foreign policy?", answer: "Jawaharlal Nehru" },
        { prompt: "What is the core idea of the Gujral Doctrine?", answer: "Non-reciprocity: India helps its smaller neighbours without asking for an equal return, to build trust" },
        { prompt: "Where was the Afro-Asian conference of 1955 held?", answer: "Bandung, Indonesia" },
        { prompt: "Between which two countries was the Panchsheel agreement of 1954 signed?", answer: "India and China" },
      ],
      traps: [
        {
          title: "Castro was not a founder of NAM",
          body: "The founding leaders at Belgrade in 1961 were Nehru, Nasser, Tito, Sukarno and Nkrumah. Fidel Castro led the movement later, when Cuba hosted the 1979 summit.",
        },
        {
          title: "The Gujral Doctrine is about neighbours",
          body: "It is a foreign policy idea: be generous to smaller neighbours to build trust. It has nothing to do with insurgent groups or food security at home.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolwo-south-asia",
      name: "SAARC, BIMSTEC and Mekong-Ganga Cooperation",
      intuition:
        "India belongs to three neighbourhood groups that overlap. SAARC is South Asia, Pakistan included. BIMSTEC joins the Bay of Bengal countries, with Myanmar and Thailand but without Pakistan. Mekong-Ganga links India to the five Mekong river countries.",
      definition:
        "The three groups (members as of 2026):\n" +
        "- **SAARC**: founded at **Dhaka on 8 December 1985** by **seven** States: **Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan and Sri Lanka**. **Afghanistan** joined in **2007** as the eighth. Its **Secretariat is at Kathmandu**.\n" +
        "- **BIMSTEC**: set up by the Bangkok Declaration of **1997**. **Seven** members: **Bangladesh, Bhutan, India, Myanmar, Nepal, Sri Lanka and Thailand**; **Pakistan is not one**. Its **Secretariat is at Dhaka**. Under its 2022 Charter each member leads a sector: **India leads security**, **Thailand leads connectivity**.\n" +
        "- **Mekong-Ganga Cooperation** (MGC): launched at Vientiane in **2000**. **India** with **Cambodia, Lao PDR, Myanmar, Thailand and Vietnam**.",
      table: {
        columns: ["Group", "Founded", "Members", "Remember"],
        rows: [
          {
            cells: ["SAARC", "Dhaka, 1985", "8: the 7 founders plus Afghanistan (2007)", "Secretariat at Kathmandu"],
            noteAmber: "CDS 2019 (II): SAARC was founded at Dhaka; Kathmandu is only its Secretariat.",
            pyqExampleId: "8ee45048-ccf6-4b00-8712-4debfdf48005",
          },
          {
            cells: ["BIMSTEC", "Bangkok, 1997", "7: Bangladesh, Bhutan, India, Myanmar, Nepal, Sri Lanka, Thailand", "Secretariat at Dhaka; Pakistan is not a member"],
            noteAmber: "CDS 2026 (I): a list that put Pakistan among the members was the wrong statement.",
            pyqExampleId: "52512c0f-fc9e-41d4-946a-11ab2f4939a0",
          },
          {
            cells: ["Mekong-Ganga Cooperation", "Vientiane, 2000", "6: India, Cambodia, Lao PDR, Myanmar, Thailand, Vietnam", "Named after the Mekong and the Ganga"],
            pyqExampleId: "1df0f5ac-8f07-4278-ad1f-dab145a50f85",
          },
        ],
      },
      pyqExampleId: "0c58ab5f-961a-4a5c-972d-b5dc1c3ba717",
      selfCheckExample: {
        prompt: "Which two members of BIMSTEC are not South Asian countries?",
        steps: ["Five members are in South Asia: Bangladesh, Bhutan, India, Nepal and Sri Lanka.", "The other two lie in South-East Asia."],
        answer: "Myanmar and Thailand.",
      },
      practiceSet: [
        { prompt: "In which city is the SAARC Secretariat?", answer: "Kathmandu" },
        { prompt: "In which city is the BIMSTEC Secretariat?", answer: "Dhaka" },
        { prompt: "Which five countries join India in the Mekong-Ganga Cooperation?", answer: "Cambodia, Lao PDR, Myanmar, Thailand and Vietnam" },
        { prompt: "Which BIMSTEC sector does India lead?", answer: "Security" },
      ],
      traps: [
        {
          title: "Founded at Dhaka, run from Kathmandu",
          body: "SAARC's Charter was adopted at the Dhaka summit of 1985. Kathmandu is where its Secretariat sits, not where it was founded.",
        },
        {
          title: "Pakistan is in SAARC, not in BIMSTEC",
          body: "BIMSTEC's seven members are Bangladesh, Bhutan, India, Myanmar, Nepal, Sri Lanka and Thailand. Leaving out Pakistan is one reason India has leaned on it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolwo-groupings",
      name: "ASEAN, BRICS, the SCO, the OIC and other blocs",
      intuition:
        "For each bloc CDS wants one or two hard facts: who started it, where it sits, when it began, and who has joined since. Learn the founding year and the latest change for each.",
      definition:
        "The blocs:\n" +
        "- **ASEAN**: founded by the **Bangkok Declaration of 8 August 1967** (kept as **ASEAN Day**). Motto: **One Vision, One Identity, One Community**. The **chair rotates every year** in the **alphabetical order** of members' English names; there is no vote. Secretariat at **Jakarta**. Ten members until **Timor-Leste** joined as the eleventh in **2025**.\n" +
        "- **BRICS**: **Brazil, Russia, India, China** (first summit 2009) and **South Africa** (joined 2010): five **major emerging economies**. From **January 2024** Egypt, Ethiopia, Iran and the UAE joined, and **Indonesia** in **January 2025**.\n" +
        "- **New Development Bank**: set up by the five BRICS countries (agreement of **2014**), headquarters at **Shanghai**.\n" +
        "- **Shanghai Cooperation Organisation (SCO)**: founded **2001**. **India and Pakistan** became members in **2017**, **Iran** in **July 2023** and **Belarus** in **2024**. Its Charter aims at a **new democratic, fair and rational international political and economic order**.\n" +
        "- **Organisation of Islamic Cooperation (OIC)**: founded **1969**, **57** members, Secretariat at **Jeddah**. It is the **second largest** intergovernmental body after the **UN**, and has consultative relations with the UN.\n" +
        "- Founding years: **APEC 1989** (Canberra), **European Union 1993** (Maastricht Treaty), **Free Trade Area of the Americas 1994** (proposed at Miami; never completed).",
      table: {
        columns: ["Group", "Founded", "Remember"],
        rows: [
          { cells: ["ASEAN", "1967, Bangkok", "Chair rotates alphabetically; Secretariat Jakarta; 11 members since 2025"] },
          {
            cells: ["APEC", "1989, Canberra", "Asia-Pacific Economic Cooperation"],
            noteAmber: "CDS 2025 (II): matched with EU 1993, ASEAN 1967 and FTAA 1994.",
            pyqExampleId: "47e8e215-b008-479f-aad2-9a84b09655d5",
          },
          { cells: ["European Union", "1993, Maastricht Treaty", "Created when the treaty took effect"] },
          {
            cells: ["BRICS", "2009 (as BRIC)", "Five emerging economies until it grew in 2024 and 2025"],
            noteAmber: "CDS 2022 (I): 'a group of five major emerging economies', true when asked.",
            pyqExampleId: "65b5e68a-8275-4cda-945b-f1666f2f33e7",
          },
          {
            cells: ["New Development Bank", "2014 agreement", "Founded by the five BRICS; headquarters Shanghai"],
            pyqExampleId: "8f46f207-9ee1-4b94-a8aa-e5482220ce25",
          },
          {
            cells: ["SCO", "2001, Shanghai", "India and Pakistan 2017, Iran 2023, Belarus 2024"],
            pyqExampleId: "4bc60cc1-0a6f-4be3-bb35-3949f6486137",
          },
          {
            cells: ["OIC", "1969", "57 members; Secretariat Jeddah; second largest after the UN"],
            noteAmber: "CDS 2019 (II): calling it the largest intergovernmental body was the wrong statement.",
            pyqExampleId: "2aab165f-bf15-42b8-a7eb-bf59c22ebf27",
          },
        ],
      },
      pyqExampleId: "9c6f8b57-887b-4f54-ac64-7fcd232a39e4",
      selfCheckExample: {
        prompt: "BRICS began as BRIC. Which country's entry added the S, and in which year did it join?",
        steps: ["The first four were Brazil, Russia, India and China.", "The fifth member came from Africa."],
        answer: "South Africa, in 2010.",
      },
      practiceSet: [
        { prompt: "In which city is the New Development Bank based?", answer: "Shanghai" },
        { prompt: "Which two countries became full members of the SCO in 2017?", answer: "India and Pakistan" },
        { prompt: "Which treaty created the European Union, and when did it take effect?", answer: "The Maastricht Treaty, in 1993" },
        { prompt: "How many member States does the OIC have?", answer: "57" },
      ],
      traps: [
        {
          title: "The OIC is second largest, not largest",
          body: "With 57 members the OIC is the largest intergovernmental body after the **United Nations**, which has 193.",
        },
        {
          title: "ASEAN Day is 8 August",
          body: "The Bangkok Declaration was signed on **8 August 1967**, so that is ASEAN Day. 12 August is International Youth Day.",
        },
        {
          title: "BRICS is no longer five",
          body: "It was five from 2010 to 2023. Four countries joined in January 2024 and Indonesia in January 2025, so an older question's 'group of five' was true only for its year.",
        },
      ],
    },
  ],
};
