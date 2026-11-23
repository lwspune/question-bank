import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SFD_NORTHEAST_NOTE: SubtopicNote = {
  subtopicName: "Festivals of North-East India",
  title: "Festivals of North-East India",
  oneLineDefinition:
    "The tribe-first method for the north-east, then the festivals of Assam, of Arunachal Pradesh's tribes, and of Tripura, Meghalaya, Mizoram and Nagaland.",
  whyItMatters:
    "17 questions in the bank, 9 of them from the 2025 shifts. Bihu alone was asked three times, and the rest each ask one detail of a single festival: its tribe, its god, its priest, its drink or what its name means. Learn which tribe lives in which state and half the work is done before you read the options.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscsfdne-tribe",
      name: "Tribe first, then the state",
      intuition:
        "Almost every north-eastern festival belongs to one tribe, and almost every tribe lives in one state. So a festival question is really a tribe question: name the tribe, place the tribe, and the state follows.",
      definition:
        "- **Step 1:** find the tribe in the stem or recall it from the festival (Wangala: Garo; Solung: Adi; Me-Dam-Me-Phi: Ahom).\n" +
        "- **Step 2:** place the tribe:\n" +
        "- **Arunachal Pradesh**: Adi, Apatani, Galo, Nyishi, Mishmi, Nocte, Tutsa, Khamti, Monpa.\n" +
        "- **Assam**: Ahom, Bodo, Karbi, Mising.\n" +
        "- **Meghalaya**: Garo, Khasi, Jaintia.\n" +
        "- **Nagaland**: Ao, Angami, Sumi and the other Naga tribes. **Mizoram**: Mizo. **Tripura**: the Tripuri and other tribes. **Manipur**: Meitei.\n" +
        "- **Step 3:** strike every option outside that state.\n\n" +
        "The rule needs care where a tribe spills over a border: the Garo also live in Assam, and the Naga tribes in Manipur and Arunachal. Then take the state where the tribe's homeland lies (Garo Hills: Meghalaya).",
      authoredExample: {
        prompt: "Moatsu is a festival of the Ao tribe. In which state is it celebrated? (a) Assam (b) Nagaland (c) Tripura (d) Mizoram",
        steps: [
          "The Ao are one of the Naga tribes.",
          "The Naga homeland is Nagaland, so Assam, Tripura and Mizoram fall.",
        ],
        answer: "(b) Nagaland",
      },
      selfCheckExample: {
        prompt: "Dree is a festival of the Apatani tribe. In which state is it celebrated?",
        steps: ["The Apatani live in the Ziro valley.", "Ziro is in Arunachal Pradesh."],
        answer: "Arunachal Pradesh",
      },
      practiceSet: [
        { prompt: "The Garo tribe's homeland is in which state?", answer: "Meghalaya" },
        { prompt: "The Ahom community belongs to which state?", answer: "Assam" },
        { prompt: "The Nyishi tribe lives in which state?", answer: "Arunachal Pradesh" },
        { prompt: "The Khasi and Jaintia tribes live in which state?", answer: "Meghalaya" },
      ],
      traps: [
        {
          title: "Do not stop at \"north-east\"",
          body: "Knowing a festival is north-eastern rules out only distant states. SSC's options are often three north-eastern states, so you still need the **tribe's** state.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfdne-assam",
      name: "Assam",
      intuition:
        "Assam's calendar is built around Bihu, which comes three times a year with the farming seasons. Its other festivals belong to its communities: the Ahom, the Vaishnavite satras, the Shakta shrine of Kamakhya.",
      definition:
        "The facts:\n" +
        "- **Bihu** is Assam's main festival, celebrated **three times** a year: **Rongali (Bohag) Bihu** in **April**, the Assamese new year; **Kongali (Kati) Bihu** in **October**, when lamps are lit in the paddy fields; and **Bhogali (Magh) Bihu** in **January**, the harvest feast at Makar Sankranti.\n" +
        "- The **Ambubachi Mela** is held every **June** at the **Kamakhya** temple on Nilachal Hill, **Guwahati**: it marks the goddess's yearly menstruation.\n" +
        "- **Me-Dam-Me-Phi**, on **31 January**, is the ancestor-worship festival of the **Ahom** community.\n" +
        "- **Doljatra**, Assam's Holi, is celebrated mainly by **Vaishnavites**, especially in the satras of **Barpeta**.\n" +
        "- **Ali-Ai-Ligang** is the sowing festival of the **Mising**; **Baishagu** the spring festival of the **Bodo**; **Rongker** a festival of the **Karbi**.",
      table: {
        columns: ["Festival", "When or where", "Who and why"],
        rows: [
          { cells: ["Rongali (Bohag) Bihu", "April", "Assamese new year; spring"] },
          { cells: ["Kongali (Kati) Bihu", "October", "Lamps in the paddy fields"] },
          { cells: ["Bhogali (Magh) Bihu", "January", "Harvest feast"] },
          { cells: ["Ambubachi Mela", "June, Kamakhya temple, Guwahati", "The goddess's yearly menstruation"] },
          { cells: ["Me-Dam-Me-Phi", "31 January", "Ahom ancestor worship"] },
          { cells: ["Doljatra", "Spring, at Holi", "Vaishnavites; Barpeta satras"] },
          { cells: ["Ali-Ai-Ligang", "February", "Mising sowing festival"] },
          { cells: ["Baishagu", "Spring", "Bodo festival"] },
        ],
      },
      pyqExampleId: "412db7b8-2d4d-4849-8d6d-86b3c7961fe3",
      selfCheckExample: {
        prompt: "Which Bihu is the Assamese new year, and in which month does it fall?",
        steps: ["Of the three Bihus, the spring one opens the Assamese year.", "That is Rongali (Bohag) Bihu, in April."],
        answer: "Rongali (Bohag) Bihu, in April",
      },
      practiceSet: [
        { prompt: "How many times a year is Bihu celebrated?", answer: "Three" },
        { prompt: "At which temple is the Ambubachi Mela held?", answer: "Kamakhya, Guwahati" },
        { prompt: "Me-Dam-Me-Phi is a festival of which community?", answer: "The Ahom" },
        { prompt: "On which date is Me-Dam-Me-Phi observed?", answer: "31 January" },
        { prompt: "Doljatra in Assam is celebrated mainly by which followers?", answer: "Vaishnavites" },
      ],
      traps: [
        {
          title: "Three Bihus, three months",
          body: "**Rongali** is April, **Kongali** is October, **Bhogali** is January. Kongali is the quiet, lean one; Bhogali is the feast.",
        },
        {
          title: "Ambubachi is Shakta, Doljatra is Vaishnavite",
          body: "The **Ambubachi Mela** belongs to the goddess **Kamakhya**. The Vaishnavite festival is **Doljatra**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfdne-arunachal",
      name: "Arunachal Pradesh's tribes",
      intuition:
        "Arunachal has more than twenty major tribes, and nearly each has its own festival. Learn the festival with its tribe; SSC often asks a second fact too, such as a drink, a god or what the name means.",
      definition:
        "The facts:\n" +
        "- **Solung** is the agricultural festival of the **Adi**; **apong**, a rice beer, is shared at it.\n" +
        "- **Nyokum** is the festival of the **Nyishi**: \"Nyo\" means land and \"Kum\" means **collectiveness**, so the name means the people of the land coming together.\n" +
        "- **Sangken** is the **Theravada Buddhist** new year water festival of the **Khamti**, Singpho and Tikhak, in April.\n" +
        "- **Tamladu** is held in March by the **Digaru Mishmi**, who pray to the earth and water gods for protection.\n" +
        "- **Pongtu**, held in April by the **Tutsa**, offers prayers to their supreme god **Rangkhothak** for a good millet harvest.\n" +
        "- **Loku** is the three-day festival of the **Nocte** of Tirap. SSC's key: on its second day, **Chamkatja**, prayers are held at the Chaatam, the Chamwangbong is danced and guns are fired at the chief's house.\n" +
        "- **Dree** belongs to the **Apatani**, **Mopin** to the **Galo**, and **Losar** to the **Monpa** of Tawang.",
      table: {
        columns: ["Festival", "Tribe", "One fact"],
        rows: [
          { cells: ["Solung", "Adi", "Farming festival; apong rice beer"] },
          { cells: ["Nyokum", "Nyishi", "Kum means collectiveness"] },
          { cells: ["Sangken", "Khamti, Singpho, Tikhak", "Buddhist new year water festival, April"] },
          { cells: ["Tamladu", "Digaru Mishmi", "Prayers to the earth and water gods, March"] },
          { cells: ["Pongtu", "Tutsa", "Prayers to Rangkhothak before the millet harvest"] },
          { cells: ["Loku", "Nocte", "Three days; Chamkatja is the second"] },
          { cells: ["Dree", "Apatani", "Farming festival"] },
          { cells: ["Mopin", "Galo", "Spring festival"] },
          { cells: ["Losar", "Monpa", "Tibetan New Year, Tawang"] },
        ],
      },
      pyqExampleId: "c37a4937-aef3-4733-bb1b-eebe6d657d6a",
      selfCheckExample: {
        prompt: "Sangken, a water festival of Arunachal Pradesh, belongs to which religion?",
        steps: ["Sangken is the new year of the Khamti and their neighbours.", "They follow Theravada Buddhism."],
        answer: "Buddhism",
      },
      practiceSet: [
        { prompt: "Nyokum is the festival of which tribe?", answer: "The Nyishi" },
        { prompt: "What does Kum in Nyokum mean?", answer: "Collectiveness" },
        { prompt: "Which tribe celebrates Tamladu?", answer: "The Digaru Mishmi" },
        { prompt: "To which god do the Tutsa pray at Pongtu?", answer: "Rangkhothak" },
        { prompt: "Which tribe celebrates Loku?", answer: "The Nocte" },
      ],
      traps: [
        {
          title: "Apong is not chhang",
          body: "**Apong** is the rice beer of the **Adi**. **Chhang** is the barley beer of Ladakh and Sikkim; **thukpa** is a noodle soup.",
        },
        {
          title: "Tamladu is not a Buddhist festival",
          body: "The **Digaru Mishmi** pray to the earth and water gods at **Tamladu**. Arunachal's Buddhist festivals are **Sangken** and **Losar**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfdne-hills",
      name: "Tripura, Meghalaya, Mizoram and Nagaland",
      intuition:
        "In these hill states a festival marks a stage of the farming year or a set of tribal gods. The main Mizo festivals end in Kut; Tripura's are Pujas to tribal deities; Meghalaya's are named by its three tribes.",
      definition:
        "The facts:\n" +
        "- **Kharchi Puja**, held in July at **Agartala**, **Tripura**, is the worship of the **fourteen deities** (Chaturdasha Devata), rooted in the region's tribal traditions.\n" +
        "- **Garia Puja** of Tripura worships Baba Garia under the **Ochai**, the traditional tribal priest.\n" +
        "- **Wangala**, the **Garo** harvest festival of **Meghalaya** (and Assam), honours the sun god **Saljong**. **Shad Suk Mynsiem** is the dance festival of the **Khasi**, **Behdienkhlam** that of the **Jaintia** at Jowai.\n" +
        "- **Mizoram**: **Chapchar Kut** is the spring festival after the jungle is cleared; **Mim Kut** comes after the **maize** harvest (\"mim\" means maize) and offers the last of it to the **departed**.\n" +
        "- **Nagaland**: **Moatsu** belongs to the **Ao**, **Sekrenyi** to the **Angami**. **Manipur**: **Lai Haraoba** is the Meitei festival of the old gods.",
      table: {
        columns: ["Festival", "State", "One fact"],
        rows: [
          { cells: ["Kharchi Puja", "Tripura", "Fourteen deities; July, Agartala"] },
          { cells: ["Garia Puja", "Tripura", "Baba Garia; led by the Ochai priest"] },
          { cells: ["Wangala", "Meghalaya", "Garo harvest festival; sun god Saljong"] },
          { cells: ["Shad Suk Mynsiem", "Meghalaya", "Khasi dance festival"] },
          { cells: ["Behdienkhlam", "Meghalaya", "Jaintia festival at Jowai"] },
          { cells: ["Chapchar Kut", "Mizoram", "Spring, after the jungle is cleared"] },
          { cells: ["Mim Kut", "Mizoram", "After the maize harvest; for the departed"] },
          { cells: ["Moatsu", "Nagaland", "Ao tribe"] },
          { cells: ["Sekrenyi", "Nagaland", "Angami tribe"] },
          { cells: ["Lai Haraoba", "Manipur", "Meitei festival of the old gods"] },
        ],
      },
      pyqExampleId: "82308a5d-692b-4fe9-9592-23d15d2713a6",
      selfCheckExample: {
        prompt: "How many deities are worshipped at the Kharchi Puja of Tripura?",
        steps: ["Kharchi Puja worships the Chaturdasha Devata.", "Chaturdasha means fourteen."],
        answer: "Fourteen",
      },
      practiceSet: [
        { prompt: "Which god does the Wangala festival honour?", answer: "Saljong, the sun god" },
        { prompt: "What does mim mean in the name Mim Kut?", answer: "Maize" },
        { prompt: "Who leads the rituals of Garia Puja in Tripura?", answer: "The Ochai, the tribal priest" },
        { prompt: "Sekrenyi is the festival of which Naga tribe?", answer: "The Angami" },
        { prompt: "Behdienkhlam is celebrated at which town of Meghalaya?", answer: "Jowai" },
      ],
      traps: [
        {
          title: "An Ochai is not an Ojha",
          body: "Tripura's tribal priest is the **Ochai**. An **Ojha** is a folk healer and a **Lama** a Buddhist monk.",
        },
        {
          title: "Kharchi is for tribal gods",
          body: "**Kharchi Puja** honours the **fourteen deities** of Tripura's tribal tradition. It is not about Jagannath, the Yamuna or Tripura's statehood day.",
        },
      ],
    },
  ],
};
