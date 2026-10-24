import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_MO_NONCOOP_NOTE: SubtopicNote = {
  subtopicName: "Gandhi and Non-Cooperation",
  title: "Gandhi and Non-Cooperation",
  oneLineDefinition:
    "Gandhi's road from South Africa to the Rowlatt satyagraha, the programme of the Non-Cooperation Movement, and how it played out among the peasants, workers and students of each province.",
  whyItMatters:
    "Fourteen CDS questions from 2018 to 2026, six of them HARD. The five on the provinces are all HARD and all from 2018 and 2019: they test detail such as the Eka movement and the Oudh Kisan Sabha. The rest ask the order of Gandhi's early campaigns and what Non-Cooperation did and did not include.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshimo-gandhi-early",
      name: "Gandhi from South Africa to 1919",
      intuition:
        "Gandhi learnt satyagraha in South Africa. Back in India in 1915, he spent a year watching and listening, then took up local struggles one by one: indigo farmers, mill workers, peasants. By 1919 he was ready to lead all of India against the Rowlatt Bills.",
      definition:
        "The steps in order:\n" +
        "- **Phoenix Settlement (1904)**, near **Durban**: a self-supporting farm Gandhi founded in South Africa.\n" +
        "- He returned to India in **January 1915**. In **May 1915** he called **Gopal Krishna Gokhale** his political guru.\n" +
        "- His first major public appearance was his speech at the **opening of Banaras Hindu University (February 1916)**, where he criticised the princes.\n" +
        "- **Champaran (1917)**, Bihar: for the peasants forced to grow **indigo**.\n" +
        "- **Ahmedabad mill strike (1918)**, then **Kheda (1918)**.\n" +
        "- **Satyagraha Sabha (February 1919)** against the **Rowlatt Bills**, then the **Jallianwala Bagh** massacre (**13 April 1919**).\n" +
        "- Gandhi wrote that a sound body is one that bends itself to the spirit and is always a ready instrument at its service.",
      table: {
        columns: ["Event", "Date", "Fact"],
        rows: [
          {
            cells: ["Phoenix Settlement", "1904", "Founded by Gandhi near Durban"],
            pyqExampleId: "36a8eda0-b1e3-47e5-8682-b347771da996",
          },
          {
            cells: ["Gokhale named his political guru", "May 1915", "Not Tilak, not Naoroji"],
            pyqExampleId: "205d3bbc-4db3-4603-859d-a0c3befd0a77",
          },
          {
            cells: ["Speech at the opening of BHU", "February 1916", "First major public appearance in India"],
            pyqExampleId: "4996bff1-ccd6-4b46-b179-36f25e6fe178",
          },
          { cells: ["Champaran satyagraha", "1917", "Indigo peasants of Bihar"] },
          { cells: ["Ahmedabad mill strike", "Early 1918", "Mill workers' wages"] },
          { cells: ["Kheda satyagraha", "1918", "Peasants seeking remission of revenue"] },
          { cells: ["Satyagraha Sabha", "February 1919", "Against the Rowlatt Bills"] },
          { cells: ["Jallianwala Bagh massacre", "13 April 1919", "Amritsar"] },
        ],
      },
      pyqExampleId: "19ea0f5b-3020-42d8-b70b-0de6a853cefb",
      selfCheckExample: {
        prompt: "Why is Gandhi's speech at Banaras Hindu University in 1916 remembered?",
        steps: [
          "It came a year after his return, before any of his Indian campaigns.",
          "He used it to criticise the jewelled princes on the stage and to speak for the poor.",
        ],
        answer: "It was his first major public appearance in India, and he spoke for the poor against the princes.",
      },
      practiceSet: [
        { prompt: "In which year did Gandhi return to India from South Africa?", answer: "1915" },
        { prompt: "Near which city did Gandhi found the Phoenix Settlement?", answer: "Durban" },
        { prompt: "What grievance brought Gandhi to Champaran in 1917?", answer: "Peasants forced to grow indigo by the planters" },
        { prompt: "Against which bills was the Satyagraha Sabha founded in 1919?", answer: "The Rowlatt Bills" },
      ],
      traps: [
        {
          title: "BHU before Champaran",
          body: "Gandhi's **first major public appearance** was the **BHU opening speech (1916)**. Champaran (1917), Kheda (1918) and the Rowlatt satyagraha (1919) all came after it.",
        },
        {
          title: "Gokhale, not Tilak",
          body: "Gandhi called **Gokhale** his political guru. Tilak led the Extremists, whose methods Gandhi did not follow.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-ncm-programme",
      name: "The Non-Cooperation programme",
      intuition:
        "Non-Cooperation did not break laws. It simply withdrew: give back your titles, leave government schools and courts, burn foreign cloth, spin your own. " +
        "If Indians stopped cooperating, Gandhi argued, British rule could not run.",
      definition:
        "The movement:\n" +
        "- Adopted by the Congress in **1920** (Calcutta special session, then Nagpur). It meant the **renunciation of all voluntary association** with the government.\n" +
        "- **Programme**: surrender of **titles and honours**; boycott of government **schools and colleges**, **courts**, **councils** and **foreign cloth**; the Congress organised down to the **village and mohalla**.\n" +
        "- **Seizing the state's law and order machinery** was **never** part of it.\n" +
        "- The **AICC at Bezwada (1921)** set targets: a crore of members, a crore of rupees for the **Tilak Swaraj Fund**, and **20 lakh charkhas**.\n" +
        "- In **September 1921**, on his tour of **South India**, Gandhi took up the **loincloth** at **Madurai**.\n" +
        "- After the violence at **Chauri Chaura (February 1922)** Gandhi **called the movement off**.",
      table: {
        columns: ["Step", "When", "Fact"],
        rows: [
          {
            cells: ["Programme adopted", "1920", "Titles surrendered; schools, courts, councils and foreign cloth boycotted"],
            pyqExampleId: "845a4f74-af7c-4bff-8b63-30e76d6e3fc5",
          },
          {
            cells: ["AICC at Bezwada", "1921", "Targets: a crore members, a crore rupees, 20 lakh charkhas"],
            pyqExampleId: "31cf2a3d-0165-43ba-ac28-f3e878a88ff0",
          },
          {
            cells: ["Gandhi adopts the loincloth", "September 1921", "Madurai, on his South India tour"],
            pyqExampleId: "96ee8de9-4f03-4529-8108-2b6e0011aaee",
          },
          { cells: ["Chauri Chaura", "February 1922", "Movement called off"] },
        ],
      },
      pyqExampleId: "39d8a79d-5b5e-4432-99c0-65292f02e3f9",
      selfCheckExample: {
        prompt: "Name three things the Non-Cooperation programme asked Indians to give up or boycott.",
        steps: [
          "Titles and honours from the government.",
          "Government schools and colleges, and the law courts.",
          "The councils and foreign cloth.",
        ],
        answer: "Any three of: titles, government schools, courts, councils, foreign cloth.",
      },
      practiceSet: [
        { prompt: "Which incident of February 1922 made Gandhi call off Non-Cooperation?", answer: "Chauri Chaura" },
        { prompt: "Which fund did the Bezwada AICC of 1921 set out to raise?", answer: "The Tilak Swaraj Fund" },
        { prompt: "In which town did Gandhi first wear only a loincloth in 1921?", answer: "Madurai" },
      ],
      traps: [
        {
          title: "Withdrawal, not takeover",
          body: "Taking control of the **law and order machinery** was **not** part of Non-Cooperation. Its programme was to withdraw cooperation, not to run the state.",
        },
        {
          title: "It stopped after Chauri Chaura",
          body: "Gandhi **suspended** the movement after Chauri Chaura. 'He continued it on a much smaller scale' is **false**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-ncm-regions",
      name: "Non-Cooperation in the provinces",
      intuition:
        "Non-Cooperation looked different in every province. Peasants in Awadh had their own grievances, Punjab had its Sikh gurdwara struggle, workers struck in Assam and Madras. " +
        "Sometimes local leaders took the movement further than the Congress wanted.",
      definition:
        "Province by province:\n" +
        "- **Awadh**: the **Oudh Kisan Sabha (October 1920)** brought more than **300** village sabhas under it within a month. It asked peasants **not to till bedakhli land** (land from which tenants had been evicted) and **not to give hari and begar** (unpaid labour).\n" +
        "- **Awadh, end of 1921**: the **Eka (unity) movement** began under Congress and Khilafat leaders, but its leadership passed to **Madari Pasi**, who did not accept non-violence.\n" +
        "- **Punjab**: Non-Cooperation began with a **student movement** inspired by **Lala Lajpat Rai** in January 1921. The **Akali** movement for control of the gurdwaras stirred the Sikh countryside alongside it.\n" +
        "- **United Provinces**: became one of the **strongest bases** of the Congress. In **Bengal**, the literary output was thin compared with the Swadeshi days.\n" +
        "- **Karnataka**: notable **peasant** participation.\n" +
        "- **Labour unrest** was **widespread**: the exodus from the **Assam tea gardens**, the Assam-Bengal Railway strike, mill strikes in **Madras**.\n" +
        "- The **non-Brahmin** movements of **Madras and Maharashtra** stayed largely **outside** the movement.",
      table: {
        columns: ["Region", "What happened", "Who"],
        rows: [
          { cells: ["Awadh, 1920", "Oudh Kisan Sabha: no tilling of bedakhli land, no hari or begar", "Peasants led by Baba Ramchandra"] },
          {
            cells: ["Awadh, 1921 to 1922", "Eka movement", "Peasants led by Madari Pasi"],
            pyqExampleId: "7977c9db-1407-4b62-a4b3-041b02191c94",
          },
          {
            cells: ["Punjab, January 1921", "Student movement; Akali upsurge alongside", "Students inspired by Lala Lajpat Rai"],
            pyqExampleId: "e777fa23-675d-46b3-9475-657dc7f38260",
          },
          {
            cells: ["United Provinces", "One of the strongest Congress bases", "Kisan sabhas and Congress volunteers"],
            pyqExampleId: "45bb6f6a-56b2-4b24-99f4-95a00b250630",
          },
          {
            cells: ["Karnataka", "Significant participation", "Peasants"],
            pyqExampleId: "8da69a2e-b535-48c0-9f21-fbd0d3ffb7c7",
          },
          { cells: ["Assam", "Exodus from the plantations; railway strike", "Tea-garden and railway workers"] },
        ],
      },
      pyqExampleId: "7c0f09bc-1367-4ea9-adb9-2d6f87ae29e9",
      selfCheckExample: {
        prompt: "Did the non-Brahmin movements of Madras and Maharashtra join the Non-Cooperation Movement in strength?",
        steps: [
          "In Madras the non-Brahmin Justice Party stood apart from the Congress.",
          "Its Maharashtrian counterpart also kept largely outside the Congress-led agitation.",
        ],
        answer: "No. They stayed largely outside it.",
      },
      practiceSet: [
        { prompt: "Who took over the leadership of the Eka movement in Awadh?", answer: "Madari Pasi" },
        { prompt: "Which leader inspired the student movement that opened Non-Cooperation in Punjab?", answer: "Lala Lajpat Rai" },
        { prompt: "Give one example of labour unrest during Non-Cooperation.", answer: "The exodus of Assam tea-garden workers (or the Assam-Bengal Railway strike, or the Madras mill strikes)" },
      ],
      traps: [
        {
          title: "There was plenty of labour unrest",
          body: "'Non-Cooperation was marked by the lack of labour unrest in Assam, Bengal and Madras' is **false**. Those were exactly the places where workers struck.",
        },
        {
          title: "True, but not the reason",
          body: "In Punjab the student movement and the Akali upsurge were both real, but one did not cause the other. Judge whether II explains I separately from whether each is true.",
        },
      ],
    },
  ],
};
