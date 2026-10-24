import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_WO_UN_NOTE: SubtopicNote = {
  subtopicName: "The United Nations",
  title: "The United Nations",
  oneLineDefinition:
    "The six principal organs and how they vote, the agencies with their headquarters and Nobel prizes, how peacekeeping works, and the Sustainable Development Goals.",
  whyItMatters:
    "Fourteen CDS questions: four EASY, seven MODERATE and three HARD. The Nobel Peace Prize list came up three times in a row (CDS 2024 (I), 2024 (II) and 2025 (I)), and peacekeeping three times, so those two tables pay off most.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolwo-charter",
      name: "The Charter and the six principal organs",
      intuition:
        "The UN Charter sets up six main organs. The General Assembly is where every member has one vote; the Security Council is the small body that can act on war and peace; the Court settles disputes between States. Most questions ask how one of them is made up or how it votes.",
      definition:
        "The basics:\n" +
        "- The **UN Charter** was signed at **San Francisco on 26 June 1945** and came into force on **24 October 1945**, now **UN Day**. The UN has **193 members** and its headquarters is in **New York**.\n" +
        "- **General Assembly**: every member, **one vote each**. **Important questions** need a **two-thirds majority of members present and voting** (Article 18): among them the **admission of new members**, the election of the **non-permanent Security Council members** and the election of **ECOSOC members**.\n" +
        "- **Security Council**: **15 members**. **Five permanent** with a veto: **China, France, Russia, the United Kingdom and the United States**. **Ten non-permanent**, elected for **two years**.\n" +
        "- **International Court of Justice** at **The Hague**: **15 judges** for **nine-year** terms, **no two from the same State**. The General Assembly and the Security Council vote **independently of one another**, and a candidate needs an absolute majority in both.\n" +
        "- The other three organs: the **Economic and Social Council** (54 members), the **Trusteeship Council** (its work suspended since 1994, when the last trust territory, Palau, became independent) and the **Secretariat**, headed by the **Secretary-General**.",
      table: {
        columns: ["Organ", "Seat", "Key fact"],
        rows: [
          { cells: ["General Assembly", "New York", "All 193 members, one vote each; important questions need two-thirds of those present and voting"] },
          {
            cells: ["Security Council", "New York", "15 members: 5 permanent with veto, 10 elected for two years"],
            noteAmber: "CDS 2023 (II): Japan is not a permanent member.",
            pyqExampleId: "5f0681b1-64e3-4960-9038-b20ddd4fd719",
          },
          { cells: ["Economic and Social Council", "New York", "54 members elected by the General Assembly"] },
          { cells: ["Trusteeship Council", "New York", "Work suspended in 1994 after Palau became independent"] },
          {
            cells: ["International Court of Justice", "The Hague", "15 judges, nine-year terms, no two of one nationality; elected by the Assembly and Council voting separately"],
            pyqExampleId: "dff9c09a-bef4-46b1-ac9e-dda23d9ffe9a",
          },
          { cells: ["Secretariat", "New York", "Headed by the Secretary-General"] },
        ],
      },
      pyqExampleId: "b00ee836-31a4-4176-a028-7c90450e6dea",
      selfCheckExample: {
        prompt: "How is the Secretary-General of the UN chosen?",
        steps: [
          "The Security Council recommends a candidate; the veto applies at this stage.",
          "The General Assembly then makes the appointment.",
        ],
        answer: "Appointed by the General Assembly on the recommendation of the Security Council.",
      },
      practiceSet: [
        { prompt: "Name the five permanent members of the Security Council.", answer: "China, France, Russia, the United Kingdom and the United States" },
        { prompt: "For how long is a non-permanent Security Council member elected?", answer: "Two years" },
        { prompt: "How many judges sit on the International Court of Justice, and for how long?", answer: "Fifteen, for nine-year terms" },
        { prompt: "Why is 24 October kept as UN Day?", answer: "The UN Charter came into force on 24 October 1945" },
      ],
      traps: [
        {
          title: "Two-thirds is of those present and voting",
          body: "An important question in the General Assembly needs two-thirds of the members **present and voting**, not two-thirds of all 193 members.",
        },
        {
          title: "The ICJ sits at The Hague, not New York",
          body: "Five of the six principal organs sit in New York. The **International Court of Justice** is the exception, at The Hague in the Netherlands.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolwo-agencies",
      name: "Agencies, headquarters and Nobel prizes",
      intuition:
        "Two lists do most of the work here: where each body sits, and which ones won the Nobel Peace Prize. UNHCR is the one UN body that has won it twice; UNESCO has never won it.",
      definition:
        "Points to fix:\n" +
        "- **UNHCR** (refugees): Nobel Peace Prize **twice, 1954 and 1981**.\n" +
        "- Once each: **UNICEF 1965**, **ILO 1969**, **IAEA 2005**, **IPCC 2007**, **WFP 2020**. The UN itself won in 2001 and its peacekeeping forces in 1988.\n" +
        "- **UNESCO** has **never** won it. Its Constitution (1945) opens: **\"Since wars begin in the minds of men, it is in the minds of men that the defences of peace must be constructed.\"**\n" +
        "- **ESCAP**, the UN's regional commission for Asia and the Pacific, is in **Bangkok**.\n" +
        "- The **International Tropical Timber Organization** is not a UN agency: it was set up under the International Tropical Timber Agreement of 1983 and sits in **Yokohama**, Japan.",
      table: {
        columns: ["Body", "Headquarters", "Remember"],
        rows: [
          {
            cells: ["UNHCR", "Geneva", "Nobel Peace Prize twice: 1954 and 1981"],
            noteAmber: "CDS 2024 (I) and CDS 2025 (I) both asked which UN body won the Nobel more than once.",
            pyqExampleId: "11834b3c-353a-447d-bfdb-30c8dcfba014",
          },
          { cells: ["UNICEF", "New York", "Nobel Peace Prize 1965"] },
          { cells: ["ILO", "Geneva", "Nobel Peace Prize 1969"] },
          { cells: ["IAEA", "Vienna", "Nobel Peace Prize 2005"] },
          { cells: ["WFP", "Rome", "Nobel Peace Prize 2020"] },
          {
            cells: ["UNESCO", "Paris", "No Nobel; its Constitution says wars begin in the minds of men"],
            noteAmber: "CDS 2024 (II): set beside WFP, ILO and UNHCR, UNESCO was the one never awarded.",
            pyqExampleId: "3c4f0c57-7057-4e92-bb0b-26a4eb04591c",
          },
          {
            cells: ["ESCAP", "Bangkok", "UN regional commission for Asia and the Pacific"],
            pyqExampleId: "51427c8c-4494-47be-a70f-5649357fc348",
          },
          {
            cells: ["ITTO", "Yokohama", "Not a UN agency; set up under the 1983 timber agreement"],
            pyqExampleId: "edb8fbe9-c9a0-4ce0-a534-7e4e413e7820",
          },
        ],
      },
      pyqExampleId: "a22cbb85-3737-41e8-9bb2-e077e73efd5f",
      selfCheckExample: {
        prompt: "Which UN body won the Nobel Peace Prize in 2020, and for what work?",
        steps: [
          "The 2020 prize went to a UN body that fights hunger.",
          "That body is based in Rome.",
        ],
        answer: "The World Food Programme, for its work against hunger.",
      },
      practiceSet: [
        { prompt: "In which city does ESCAP have its headquarters?", answer: "Bangkok" },
        { prompt: "Which UN body has won the Nobel Peace Prize twice, and in which years?", answer: "UNHCR, in 1954 and 1981" },
        { prompt: "In which city is the International Tropical Timber Organization based?", answer: "Yokohama, Japan" },
        { prompt: "In which year did the ILO win the Nobel Peace Prize?", answer: "1969" },
      ],
      traps: [
        {
          title: "UNICEF and WFP won only once",
          body: "Only **UNHCR** among UN bodies has won the Nobel Peace Prize twice (1954, 1981). UNICEF (1965), the ILO (1969) and the WFP (2020) won it once each.",
        },
        {
          title: "Wars begin in the minds of men is UNESCO",
          body: "The line opens UNESCO's Constitution, because education, science and culture are its tools for peace. It is not from the UN Charter or the WHO.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolwo-peacekeeping",
      name: "UN peacekeeping",
      intuition:
        "Peacekeepers are not an army sent to win a war. They go in, with the warring sides' agreement, to hold a ceasefire and help a country rebuild. So they must stay neutral and use force only to defend themselves or their mandate.",
      definition:
        "How it works:\n" +
        "- A peacekeeping operation is **authorised by the Security Council**.\n" +
        "- **Three principles**: the **consent of the main parties**, **impartiality**, and **no use of force** except in self-defence and defence of the mandate.\n" +
        "- **Multidimensional** operations go beyond a ceasefire: they **stabilise** a country after conflict, **consolidate peace**, support the political process and help restore State authority.\n" +
        "- Peacekeepers are called the **Blue Helmets**, from their light blue helmets and berets.\n" +
        "- The first armed force was **UNEF (1956)**, sent after the Suez crisis. UN peacekeeping forces won the **Nobel Peace Prize in 1988**.",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          {
            cells: ["Who authorises", "The Security Council"],
            pyqExampleId: "1c6b7817-3d84-4b68-b19b-7a51b7258702",
          },
          { cells: ["Three principles", "Consent of the parties, impartiality, force only in self-defence or defence of the mandate"] },
          {
            cells: ["Multidimensional tasks", "Stabilisation, peace consolidation, support for the political process"],
            noteAmber: "CDS 2019 (I): supporting a State that is losing a war is not one of them.",
            pyqExampleId: "0bb540de-de61-46b0-9e40-d2ae70f1f08d",
          },
          {
            cells: ["Popular name", "Blue Helmets"],
            pyqExampleId: "a33c1123-3257-465e-ad9f-100b0df48ed9",
          },
          { cells: ["First armed force", "UNEF, 1956, after the Suez crisis"] },
          { cells: ["Nobel Peace Prize", "1988"] },
        ],
      },
      pyqExampleId: "1c6b7817-3d84-4b68-b19b-7a51b7258702",
      selfCheckExample: {
        prompt: "A UN force keeps a ceasefire after a civil war. One side asks it to help defeat the other. Which principle of peacekeeping makes it refuse?",
        steps: [
          "Taking one side would end the force's neutrality.",
          "Neutrality between the parties is a core principle.",
        ],
        answer: "Impartiality.",
      },
      practiceSet: [
        { prompt: "Why are UN peacekeepers called the Blue Helmets?", answer: "They wear light blue helmets and berets" },
        { prompt: "In which year did UN peacekeeping forces win the Nobel Peace Prize?", answer: "1988" },
        { prompt: "Name two core tasks of a multidimensional peacekeeping operation.", answer: "Stabilisation and peace consolidation" },
        { prompt: "Which crisis led to the first armed UN peacekeeping force in 1956?", answer: "The Suez crisis (the force was UNEF)" },
      ],
      traps: [
        {
          title: "Peacekeeping is a Security Council decision",
          body: "The power to authorise an operation lies with the **Security Council**, not the General Assembly.",
        },
        {
          title: "Peacekeepers never take sides",
          body: "Helping a State that is losing a war would break impartiality. Operations stabilise and rebuild; they do not fight for one party.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolwo-sdgs",
      name: "The Sustainable Development Goals",
      intuition:
        "In 2015 the UN set 17 goals for the whole world to reach in fifteen years. They took over from the eight Millennium Development Goals, which ran from 2000 to 2015.",
      definition:
        "The facts:\n" +
        "- Adopted in **September 2015** as the **2030 Agenda for Sustainable Development**.\n" +
        "- **17 goals** and **169 targets**, to be met by **2030**.\n" +
        "- They replaced the **8 Millennium Development Goals** (2000 to 2015).",
      table: {
        columns: ["Goal", "Name"],
        rows: [
          { cells: ["1", "No poverty"] },
          { cells: ["2", "Zero hunger"] },
          { cells: ["4", "Quality education"] },
          { cells: ["5", "Gender equality"] },
          {
            cells: ["8", "Decent work and economic growth"],
            noteAmber: "CDS 2023 (II): Goals 8, 12 and 16 were all offered, and all three are SDGs.",
            pyqExampleId: "19b0057e-f218-4dd4-a80b-264b3e874c12",
          },
          { cells: ["12", "Responsible consumption and production"] },
          { cells: ["13", "Climate action"] },
          { cells: ["16", "Peace, justice and strong institutions"] },
          { cells: ["17", "Partnerships for the goals"] },
        ],
      },
      pyqExampleId: "f98a1f6e-fdb1-48af-8d2f-96f2c5b64562",
      selfCheckExample: {
        prompt: "How many goals did the Millennium Development Goals have, and how many do the Sustainable Development Goals have?",
        steps: ["The MDGs ran from 2000 to 2015 with eight goals.", "The SDGs widened the list in 2015."],
        answer: "8 MDGs; 17 SDGs.",
      },
      practiceSet: [
        { prompt: "Which SDG number is Climate Action?", answer: "13" },
        { prompt: "What is SDG 5?", answer: "Gender equality" },
        { prompt: "How many targets do the SDGs carry?", answer: "169" },
        { prompt: "In which year were the SDGs adopted?", answer: "2015" },
      ],
      traps: [
        {
          title: "The SDGs run to 2030, the MDGs ran to 2015",
          body: "The MDGs had eight goals for 2000 to 2015. The SDGs, adopted in 2015, have 17 goals for **2030**.",
        },
      ],
    },
  ],
};
