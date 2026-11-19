import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SFD_FAITH_NOTE: SubtopicNote = {
  subtopicName: "Religious Festivals and Important Days",
  title: "Religious Festivals and Important Days",
  oneLineDefinition:
    "The festivals of each faith, the Hindu festivals with their months and deities, Makar Sankranti's names across India, and the national and UN days with their dates.",
  whyItMatters:
    "26 questions in the bank: 9 ask which faith a festival belongs to, 7 ask a Hindu festival's month, deity or ritual, 5 are on Makar Sankranti and 5 on a national or UN day. Almost all are EASY, so these are marks to bank quickly, provided you do not mix up the neighbours in the options.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsfdfa-faiths",
      name: "Festivals of each faith",
      intuition:
        "A faith question names a festival and offers four religions. Most festivals carry their faith in the event they mark: a Guru points to Sikhism, a Tirthankara to Jainism, Jesus to Christianity, an Islamic month to Islam.",
      definition:
        "The facts:\n" +
        "- **Christian**: **Christmas** marks the birth of Jesus, **Good Friday** his crucifixion, **Easter** Sunday his **resurrection**. Holy (Maundy) Thursday recalls the Last Supper.\n" +
        "- **Muslim**: **Ramadan** is the **ninth** month of the Islamic (Hijri) calendar, the month of fasting and of charity (zakat). **Eid al-Fitr** ends the fast. **Shab-e-Barat**, the night of forgiveness, falls on the 15th of Shaban. **Muharram** is the first month.\n" +
        "- **Sikh**: **Gurpurab** (Guru Nanak Jayanti) is Guru Nanak's birth anniversary, on **Kartik Purnima**. **Baisakhi** marks the founding of the **Khalsa** (1699). **Hola Mohalla**, started by **Guru Gobind Singh**, comes the **day after Holi** at **Anandpur Sahib**. **Bandi Chhor Divas**, Guru Hargobind's release from **Gwalior Fort**, falls on the same day as **Diwali**.\n" +
        "- **Jain**: **Paryushana**, the yearly festival of fasting and reflection, ends with **Samvatsari**, the day of asking forgiveness. **Mahavir Jayanti** marks Mahavira's birth.\n" +
        "- **Buddhist**: **Buddha Purnima** marks the Buddha's birth, enlightenment and death. **Parsi**: **Navroz** is the new year.",
      table: {
        columns: ["Festival", "Faith", "What it marks"],
        rows: [
          { cells: ["Christmas", "Christian", "Birth of Jesus, 25 December"] },
          { cells: ["Good Friday", "Christian", "Crucifixion of Jesus"] },
          { cells: ["Easter", "Christian", "Resurrection of Jesus"] },
          { cells: ["Ramadan", "Muslim", "Ninth month of the Islamic calendar; the month of fasting"] },
          { cells: ["Eid al-Fitr", "Muslim", "End of the Ramadan fast"] },
          { cells: ["Shab-e-Barat", "Muslim", "Night of forgiveness, 15th of Shaban"] },
          { cells: ["Gurpurab", "Sikh", "Guru Nanak's birth anniversary, Kartik Purnima"] },
          { cells: ["Baisakhi", "Sikh (and a harvest festival)", "Founding of the Khalsa, 1699"] },
          { cells: ["Hola Mohalla", "Sikh", "Day after Holi; martial displays at Anandpur Sahib"] },
          { cells: ["Bandi Chhor Divas", "Sikh", "Guru Hargobind's release from Gwalior Fort; on Diwali"] },
          { cells: ["Paryushana", "Jain", "Fasting and reflection; ends with Samvatsari"] },
          { cells: ["Mahavir Jayanti", "Jain", "Birth of Mahavira"] },
          { cells: ["Buddha Purnima", "Buddhist", "Birth, enlightenment and death of the Buddha"] },
          { cells: ["Navroz", "Parsi", "Parsi new year"] },
        ],
      },
      pyqExampleId: "52d731ff-958a-4560-bb73-8b4c16e7d281",
      selfCheckExample: {
        prompt: "Which Christian day marks the crucifixion of Jesus?",
        steps: ["Christmas is his birth and Easter his resurrection.", "The crucifixion is remembered on the Friday before Easter."],
        answer: "Good Friday",
      },
      practiceSet: [
        { prompt: "Which month of the Islamic calendar is Muharram?", answer: "The first" },
        { prompt: "Which festival ends the Ramadan fast?", answer: "Eid al-Fitr" },
        { prompt: "Which festival marks the founding of the Khalsa in 1699?", answer: "Baisakhi" },
        { prompt: "Which day of asking forgiveness ends the Jain festival of Paryushana?", answer: "Samvatsari" },
        { prompt: "Shab-e-Barat is observed by which community?", answer: "Muslims" },
        { prompt: "On which full-moon day is Guru Nanak's birth anniversary (Gurpurab) celebrated?", answer: "Kartik Purnima" },
      ],
      traps: [
        {
          title: "Easter is the resurrection, not the crucifixion",
          body: "**Good Friday** is the crucifixion; **Easter** Sunday, two days later, is the **resurrection**.",
        },
        {
          title: "Hola Mohalla is not on Holi",
          body: "**Hola Mohalla** falls on the **day after Holi**. It is a **Sikh** festival of martial skill, not a harvest festival.",
        },
        {
          title: "Ramadan is the ninth month",
          body: "**Ramadan** is the **ninth** month of the Islamic calendar. **Muharram** is the first; **Shaban**, the month of Shab-e-Barat, is the eighth.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfdfa-hindu",
      name: "Hindu festivals: month, deity and ritual",
      intuition:
        "Hindu festivals are fixed by the lunar calendar, so SSC asks the month, the deity or the ritual. Learn the twelve months in order once; then each festival needs only its month and one ritual.",
      definition:
        "The facts:\n" +
        "- The **twelve Hindu months**, in order: Chaitra, Vaishakha, Jyeshtha, Ashadha, Shravana, Bhadrapada, Ashvin, Kartika, Margashirsha, Pausha, Magha, Phalguna. **Sharad** is a **season** (early autumn), not a month.\n" +
        "- **Nag Panchami** (snake worship) and **Raksha Bandhan** fall in **Shravan**. Raksha Bandhan means the **bond of protection**: a sister ties a rakhi and her brother promises to protect her.\n" +
        "- **Navratri**, in Ashvin, honours **Goddess Durga** in her nine forms and ends with **Vijayadashami** (Dussehra). In Gujarat its nights are danced as **Garba**.\n" +
        "- **Diwali** falls on the new moon of **Kartika**.\n" +
        "- **Janmashtami** is Krishna's birthday. Its **Dahi Handi** custom has a **human pyramid** break a pot of curd or buttermilk hung high.\n" +
        "- **Teej**, in Shravan, celebrates the union of **Shiva and Parvati**. SSC's key says its name comes from a small **red insect** that appears in the monsoon.\n" +
        "- **Holi** falls on the full moon of **Phalguna**, after the bonfire of **Holika Dahan**.",
      table: {
        columns: ["Festival", "Month", "Deity or ritual"],
        rows: [
          { cells: ["Nag Panchami", "Shravan", "Snakes are worshipped"] },
          { cells: ["Raksha Bandhan", "Shravan (full moon)", "The bond of protection; the rakhi"] },
          { cells: ["Teej", "Shravan", "Union of Shiva and Parvati; women, swings"] },
          { cells: ["Janmashtami", "August or September", "Krishna's birthday; Dahi Handi"] },
          { cells: ["Ganesh Chaturthi", "Bhadrapada", "Lord Ganesha"] },
          { cells: ["Navratri", "Ashvin", "Goddess Durga in nine forms; Garba in Gujarat"] },
          { cells: ["Dussehra (Vijayadashami)", "Ashvin", "Rama's victory over Ravana; Durga's over Mahishasura"] },
          { cells: ["Diwali", "Kartika (new moon)", "Lamps; Goddess Lakshmi"] },
          { cells: ["Holi", "Phalguna (full moon)", "Colours; Holika Dahan the night before"] },
        ],
      },
      pyqExampleId: "9c97edbb-0de4-4703-98c9-0356fac5d63b",
      selfCheckExample: {
        prompt: "In which Hindu month does Ganesh Chaturthi fall?",
        steps: ["Shravan holds Nag Panchami and Raksha Bandhan.", "The next month, Bhadrapada, holds Ganesh Chaturthi."],
        answer: "Bhadrapada",
      },
      practiceSet: [
        { prompt: "Which festival's name means the bond of protection?", answer: "Raksha Bandhan" },
        { prompt: "In which Hindu month is Nag Panchami celebrated?", answer: "Shravan" },
        { prompt: "To which goddess is Navratri dedicated?", answer: "Goddess Durga" },
        { prompt: "In which Hindu month is Diwali celebrated?", answer: "Kartika" },
        { prompt: "Which dance of Gujarat is performed on the nights of Navratri?", answer: "Garba" },
        { prompt: "Is Sharad a Hindu month or a season?", answer: "A season" },
      ],
      traps: [
        {
          title: "Sharad is a season",
          body: "**Sharad** is the early-autumn **season**, not a month. When it sits among Shravan, Kartik and Ashadha, strike it first.",
        },
        {
          title: "Dahi Handi belongs to Janmashtami",
          body: "The **human pyramid** that breaks a hanging pot is **Dahi Handi**, part of **Janmashtami**, Krishna's birthday, not Holi or Dussehra.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfdfa-sankranti",
      name: "Makar Sankranti and its many names",
      intuition:
        "Makar Sankranti, usually on 14 January, is the day the Sun enters Makara (Capricorn), so it belongs to Surya, the Sun god. Every region calls it by its own name, and SSC asks which name goes with which state.",
      definition:
        "The facts:\n" +
        "- Makar Sankranti is dedicated to **Surya**. It is one of the few Hindu festivals fixed by the **solar** calendar, so it falls on about **14 January** every year.\n" +
        "- **Pongal** (Tamil Nadu) takes its name from the Tamil word for **boiling over**: new rice is boiled with milk and jaggery until it spills. It runs four days: Bhogi, Thai Pongal, **Mattu Pongal** (for cattle) and Kaanum Pongal.\n" +
        "- In **Andhra Pradesh and Telangana** it is a three-day Sankranti: **Bhogi** (the bonfire), **Sankranti**, and **Kanuma**, when farmers wash, decorate and worship their **cattle**.\n" +
        "- **Assam**: **Magh (Bhogali) Bihu**. **Punjab**: **Lohri** on the night before, then **Maghi**. **Gujarat**: **Uttarayan**, with kites. **Himachal Pradesh**: **Magha Saaji**. **Uttarakhand**: **Uttarayani** or **Ghughutiya**. **Uttar Pradesh and Bihar**: **Khichdi**.",
      table: {
        columns: ["State", "Name of the festival", "One fact"],
        rows: [
          { cells: ["Tamil Nadu", "Pongal", "Name means boiling over; four days"] },
          { cells: ["Andhra Pradesh and Telangana", "Sankranti", "Bhogi, Sankranti, then Kanuma for cattle"] },
          { cells: ["Assam", "Magh Bihu (Bhogali Bihu)", "Harvest feast"] },
          { cells: ["Punjab", "Lohri and Maghi", "Lohri's bonfire is on the night before"] },
          { cells: ["Gujarat", "Uttarayan", "Kite flying"] },
          { cells: ["Himachal Pradesh", "Magha Saaji", "Saaji means the start of a new month"] },
          { cells: ["Uttarakhand", "Uttarayani or Ghughutiya", "Sweets called ghughute are offered to crows"] },
          { cells: ["Uttar Pradesh and Bihar", "Khichdi", "Khichdi is cooked and given away"] },
        ],
      },
      pyqExampleId: "7b7392b7-467a-4c37-8869-2a6c7402ed41",
      selfCheckExample: {
        prompt: "By what name is Makar Sankranti celebrated in Gujarat?",
        steps: ["Gujarat marks the day by flying kites.", "Its name there is Uttarayan, the Sun's northward journey."],
        answer: "Uttarayan",
      },
      practiceSet: [
        { prompt: "Which god is Makar Sankranti dedicated to?", answer: "Surya, the Sun god" },
        { prompt: "What does the word Pongal mean?", answer: "Boiling over" },
        { prompt: "What is Makar Sankranti called in Himachal Pradesh?", answer: "Magha Saaji" },
        { prompt: "What is Makar Sankranti called in Assam?", answer: "Magh Bihu (Bhogali Bihu)" },
        { prompt: "Which festival of Punjab is held with a bonfire on the night before Makar Sankranti?", answer: "Lohri" },
      ],
      traps: [
        {
          title: "Bhogi is the bonfire, Kanuma the cattle",
          body: "In Andhra Pradesh the bonfire is on **Bhogi**, the first day. **Kanuma**, the third day, honours the **cattle**.",
        },
        {
          title: "Pongal is not Onam",
          body: "**Pongal**, the boiling-over harvest festival, is **Tamil Nadu's**. **Onam** is Kerala's harvest festival, months later.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfdfa-days",
      name: "National and international days",
      intuition:
        "Most of India's national days are a famous person's birthday. Learn each day as a date and a person; the UN days are dates alone.",
      definition:
        "The facts:\n" +
        "- **Teachers' Day**, **5 September**, is the birthday of **Dr Sarvepalli Radhakrishnan** (born 1888), India's second President; it has been kept since 1962.\n" +
        "- **Janjatiya Gaurav Divas**, **15 November**, declared in 2021, is the birthday of **Birsa Munda** (born 1875). The same date is Jharkhand's foundation day (2000).\n" +
        "- The **International Day of Yoga**, **21 June**, was proposed by Narendra Modi at the UN General Assembly in **September 2014**; the UN adopted it in December 2014 and the first was held in **2015**.\n" +
        "- UN days in October: **1 October**, International Day of **Older Persons**; **2 October**, International Day of **Non-Violence** (Gandhi's birthday); **11 October**, International Day of the **Girl Child** (since 2012).",
      table: {
        columns: ["Day", "Date", "Honours or marks"],
        rows: [
          { cells: ["National Youth Day", "12 January", "Swami Vivekananda's birthday"] },
          { cells: ["Parakram Diwas", "23 January", "Subhas Chandra Bose's birthday"] },
          { cells: ["National Science Day", "28 February", "C. V. Raman's discovery of the Raman effect"] },
          { cells: ["International Day of Yoga", "21 June", "Proposed by India at the UN, 2014"] },
          { cells: ["National Sports Day", "29 August", "Dhyan Chand's birthday"] },
          { cells: ["Teachers' Day", "5 September", "Sarvepalli Radhakrishnan's birthday"] },
          { cells: ["International Day of Older Persons", "1 October", "UN day"] },
          { cells: ["International Day of Non-Violence", "2 October", "Gandhi's birthday"] },
          { cells: ["International Day of the Girl Child", "11 October", "UN day"] },
          { cells: ["Rashtriya Ekta Diwas", "31 October", "Vallabhbhai Patel's birthday"] },
          { cells: ["Children's Day", "14 November", "Jawaharlal Nehru's birthday"] },
          { cells: ["Janjatiya Gaurav Divas", "15 November", "Birsa Munda's birthday"] },
          { cells: ["National Mathematics Day", "22 December", "Srinivasa Ramanujan's birthday"] },
          { cells: ["Good Governance Day", "25 December", "Atal Bihari Vajpayee's birthday"] },
        ],
      },
      pyqExampleId: "167f5c17-16c6-40c0-a709-4bb315717c61",
      selfCheckExample: {
        prompt: "Whose birthday is celebrated as National Youth Day on 12 January?",
        steps: ["12 January is not a UN day; it is a person's birthday.", "It is the birthday of Swami Vivekananda."],
        answer: "Swami Vivekananda",
      },
      practiceSet: [
        { prompt: "On which date is Teachers' Day celebrated in India?", answer: "5 September" },
        { prompt: "On which date is the International Day of the Girl Child observed?", answer: "11 October" },
        { prompt: "On which date is the International Day of Older Persons observed?", answer: "1 October" },
        { prompt: "On which date is the International Day of Yoga observed?", answer: "21 June" },
        { prompt: "Whose birthday is National Sports Day?", answer: "Dhyan Chand's" },
        { prompt: "Whose birthday is National Mathematics Day?", answer: "Srinivasa Ramanujan's" },
      ],
      traps: [
        {
          title: "Proposed in 2014, first held in 2015",
          body: "Narendra Modi **proposed** the International Day of Yoga at the UN in **2014**. The **first** Yoga Day was held on 21 June **2015**.",
        },
        {
          title: "1, 2 and 11 October are three different days",
          body: "**1 October**: older persons. **2 October**: non-violence. **11 October**: the girl child.",
        },
        {
          title: "Teachers' Day is Radhakrishnan's, not Kalam's",
          body: "**5 September** is **Sarvepalli Radhakrishnan's** birthday. A. P. J. Abdul Kalam's birthday is not Teachers' Day.",
        },
      ],
    },
  ],
};
