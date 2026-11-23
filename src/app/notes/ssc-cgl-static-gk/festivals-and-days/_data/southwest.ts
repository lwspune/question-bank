import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SFD_SOUTHWEST_NOTE: SubtopicNote = {
  subtopicName: "Festivals of South and West India",
  title: "Festivals of South and West India",
  oneLineDefinition:
    "The temple festivals and new years of Tamil Nadu and Kerala, the festivals of Karnataka, Andhra Pradesh and Telangana, and the fairs of Maharashtra and Rajasthan.",
  whyItMatters:
    "14 questions in the bank, and 9 of them name a festival and ask its state. The four southern states are each other's favourite wrong options, so for every festival learn the one detail that pins it to its state: a temple town, a language, a deity.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsfdsw-tamil",
      name: "Tamil Nadu and Kerala",
      intuition:
        "Many festivals here are named after a Tamil or Malayalam month or a temple town. A Tamil month (Chithirai, Thai) points to Tamil Nadu; a Malayalam month (Chingam, Vrischikam) or a Kerala temple town (Thrissur, Guruvayur) points to Kerala.",
      definition:
        "The facts:\n" +
        "- **Puthandu**, the **Tamil New Year**, is the first day of the month **Chithirai**, usually **14 April**.\n" +
        "- The **Chithirai festival** of **Madurai** (April to May) celebrates the wedding of **Meenakshi and Sundareswarar**; its high point is **Lord Kallazhagar** riding a **golden horse** into the **Vaigai** river.\n" +
        "- **Mahamaham** is held at **Kumbakonam** once in 12 years. **Thaipusam** honours **Lord Murugan**. **Karthigai Deepam** lights the hill at **Tiruvannamalai**.\n" +
        "- **Onam**, in the month of **Chingam**, is Kerala's harvest festival, welcoming back King **Mahabali**.\n" +
        "- **Vishu**, in mid-April, is Kerala's spring new year, chiefly in **Kerala** and also in Kanyakumari (Tamil Nadu); the morning sight is the **Vishukkani**.\n" +
        "- **Thrissur Pooram** is held at the **Vadakkunnathan temple**, Thrissur; it was begun by **Sakthan Thampuran**, ruler of Cochin.\n" +
        "- **Guruvayur Ekadashi** is held at the Krishna temple of **Guruvayur** (Thrissur district) in the month of **Vrischikam**. **Attukal Pongala** in Thiruvananthapuram draws a huge gathering of women.",
      table: {
        columns: ["Festival", "State", "One fact"],
        rows: [
          { cells: ["Puthandu", "Tamil Nadu", "Tamil New Year, about 14 April"] },
          { cells: ["Chithirai festival", "Tamil Nadu", "Madurai; Meenakshi's wedding; Kallazhagar enters the Vaigai"] },
          { cells: ["Mahamaham", "Tamil Nadu", "Kumbakonam, once in 12 years"] },
          { cells: ["Thaipusam", "Tamil Nadu", "Lord Murugan"] },
          { cells: ["Karthigai Deepam", "Tamil Nadu", "Lamps on the hill at Tiruvannamalai"] },
          { cells: ["Onam", "Kerala", "Harvest; King Mahabali; month of Chingam"] },
          { cells: ["Vishu", "Kerala (also Kanyakumari)", "Spring new year in mid-April; Vishukkani"] },
          { cells: ["Thrissur Pooram", "Kerala", "Vadakkunnathan temple; begun by Sakthan Thampuran"] },
          { cells: ["Guruvayur Ekadashi", "Kerala", "Krishna temple at Guruvayur"] },
          { cells: ["Attukal Pongala", "Kerala", "Thiruvananthapuram; a vast gathering of women"] },
        ],
      },
      pyqExampleId: "3f2c955d-e92e-42da-88a6-16c80d7e604b",
      selfCheckExample: {
        prompt: "In which Kerala city is the Pooram held at the Vadakkunnathan temple?",
        steps: ["The Vadakkunnathan temple is the great Shiva temple of Thrissur.", "So this is the Thrissur Pooram."],
        answer: "Thrissur",
      },
      practiceSet: [
        { prompt: "What is the Tamil New Year called?", answer: "Puthandu" },
        { prompt: "At which town is the Mahamaham held once in 12 years?", answer: "Kumbakonam" },
        { prompt: "Which king's return does Onam welcome?", answer: "King Mahabali" },
        { prompt: "Which ruler of Cochin began the Thrissur Pooram?", answer: "Sakthan Thampuran" },
        { prompt: "Which god is honoured at Thaipusam?", answer: "Lord Murugan" },
      ],
      traps: [
        {
          title: "Puthandu is in April, Pongal in January",
          body: "**Puthandu** (Tamil New Year) is about **14 April**. **Pongal** is the **January** harvest festival. Both are Tamil, so the month decides.",
        },
        {
          title: "The Chithirai festival is not in Margazhi",
          body: "It takes its name from its month, **Chithirai** (April to May). **Margazhi** is the Tamil month of mid-December to mid-January.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfdsw-deccan",
      name: "Karnataka, Andhra Pradesh and Telangana",
      intuition:
        "These festivals are tied to a place or a custom that is easy to picture: buffaloes racing through mud, rotis swapped at a lake, pots of offerings carried to the goddess. Picture the custom and the state follows.",
      definition:
        "The facts:\n" +
        "- **Kambala** is the **buffalo race** of coastal **Karnataka** (Dakshina Kannada and Udupi), run by farming communities in slushy paddy fields.\n" +
        "- **Mysuru Dasara** is Karnataka's state festival.\n" +
        "- **Atla Taddi** is a festival of the women of **Andhra Pradesh** (and Telangana) in the month of Ashwayuja: they fast and pray for their husbands' well-being.\n" +
        "- **Rottela Panduga**, the roti festival, is held at the **Bara Shaheed Dargah** in **Nellore**, Andhra Pradesh, during Muharram: devotees swap rotis as they make wishes.\n" +
        "- **Bonalu**, in the month of Ashadha, is **Telangana's** festival of offerings (bonam) to **Goddess Mahakali**. Its origin is traced to a **plague** outbreak in Hyderabad.\n" +
        "- **Bathukamma** is Telangana's festival of flowers, celebrated by women.",
      table: {
        columns: ["Festival", "State", "One fact"],
        rows: [
          { cells: ["Kambala", "Karnataka", "Buffalo race in paddy fields, coastal districts"] },
          { cells: ["Mysuru Dasara", "Karnataka", "The state festival"] },
          { cells: ["Atla Taddi", "Andhra Pradesh", "Women fast for their husbands' well-being"] },
          { cells: ["Rottela Panduga", "Andhra Pradesh", "Roti festival at Nellore's Bara Shaheed Dargah"] },
          { cells: ["Bonalu", "Telangana", "Offerings to Goddess Mahakali; began after a plague"] },
          { cells: ["Bathukamma", "Telangana", "Women's festival of flowers"] },
        ],
      },
      pyqExampleId: "c8fc6e7e-5201-426e-8f73-f8a663934bb4",
      selfCheckExample: {
        prompt: "To which goddess are the offerings of the Bonalu festival made?",
        steps: ["Bonalu is Telangana's Ashadha festival.", "The pots of offerings (bonam) are carried to Goddess Mahakali."],
        answer: "Goddess Mahakali",
      },
      practiceSet: [
        { prompt: "Rottela Panduga is held in which city of Andhra Pradesh?", answer: "Nellore" },
        { prompt: "Bathukamma is a festival of which state?", answer: "Telangana" },
        { prompt: "Atla Taddi is celebrated by the women of which state?", answer: "Andhra Pradesh" },
        { prompt: "Which disease outbreak is the Bonalu festival traced to?", answer: "Plague" },
      ],
      traps: [
        {
          title: "Rottela Panduga is held at a dargah",
          body: "Though it sounds like a Hindu festival, **Rottela Panduga** is held at a **dargah** (the Bara Shaheed Dargah, Nellore) during **Muharram**, and people of every faith come.",
        },
        {
          title: "Bonalu and Bathukamma are both Telangana's",
          body: "**Bonalu** (offerings to Mahakali) and **Bathukamma** (flowers) are both **Telangana** festivals; neither is from Karnataka.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfdsw-west",
      name: "Maharashtra and Rajasthan",
      intuition:
        "Maharashtra's coast gives its sea festival, Rajasthan's desert its camel and cattle fairs. A fair of animals, a desert town or the Ajmer dargah points to Rajasthan.",
      definition:
        "The facts:\n" +
        "- **Narali Poornima**, the full moon of Shravan, is kept by the **Koli** fishing communities of coastal **Maharashtra**: they offer **coconuts to the sea** to mark the **end of the monsoon** and the start of the fishing season.\n" +
        "- **Gudi Padwa**, the first day of Chaitra, is the Marathi new year. **Bal Gangadhar Tilak** made **Ganesh Chaturthi** a public festival in 1893.\n" +
        "- **Rajasthan**: **Gangaur** (women's festival of Goddess Gauri), the **Pushkar** camel and cattle fair (Kartik Purnima), the **Nagaur** cattle fair, the **Urs** at **Ajmer Sharif** (the dargah of Khwaja Moinuddin Chishti) and the **Desert Festival** of **Jaisalmer**.\n" +
        "- The **Dol Mela** of **Baran** (Rajasthan) is held on **Jaljhulani Gyaras**: the deities **Shreeji** and **Raghunathji** are carried in decorated dols (palanquins), and traders come from several states.",
      table: {
        columns: ["Festival", "State", "One fact"],
        rows: [
          { cells: ["Narali Poornima", "Maharashtra", "Koli fishermen offer coconuts to the sea"] },
          { cells: ["Gudi Padwa", "Maharashtra", "Marathi new year, first day of Chaitra"] },
          { cells: ["Gangaur", "Rajasthan", "Women worship Goddess Gauri"] },
          { cells: ["Pushkar fair", "Rajasthan", "Camel and cattle fair at Kartik Purnima"] },
          { cells: ["Nagaur fair", "Rajasthan", "Cattle fair"] },
          { cells: ["Urs at Ajmer Sharif", "Rajasthan", "Dargah of Khwaja Moinuddin Chishti"] },
          { cells: ["Desert Festival", "Rajasthan", "Jaisalmer"] },
          { cells: ["Dol Mela", "Rajasthan", "Baran; Jaljhulani Gyaras; Shreeji and Raghunathji"] },
        ],
      },
      pyqExampleId: "6b23c261-bb6e-4eee-8608-a91d9d82b007",
      selfCheckExample: {
        prompt: "Which community of coastal Maharashtra offers coconuts to the sea on Narali Poornima?",
        steps: ["Narali Poornima opens the fishing season after the monsoon.", "It is kept by the Koli fishing community."],
        answer: "The Kolis",
      },
      practiceSet: [
        { prompt: "In which city is the Desert Festival held?", answer: "Jaisalmer" },
        { prompt: "What is the Marathi new year called?", answer: "Gudi Padwa" },
        { prompt: "In which town of Rajasthan is the Dol Mela held on Jaljhulani Gyaras?", answer: "Baran" },
        { prompt: "Who made Ganesh Chaturthi a public festival in 1893?", answer: "Bal Gangadhar Tilak" },
      ],
      traps: [
        {
          title: "Narali Poornima ends the monsoon",
          body: "**Narali Poornima** marks the **end** of the monsoon and the **start** of the fishing season, not the start of the rains.",
        },
        {
          title: "A cattle fair here is Rajasthan's",
          body: "**Pushkar** and **Nagaur** are Rajasthan's animal fairs. Bihar's big cattle fair is the Sonepur Mela, a different state.",
        },
      ],
    },
  ],
};
