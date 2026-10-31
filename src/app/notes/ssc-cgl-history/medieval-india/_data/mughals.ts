import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HME_MUGHALS_NOTE: SubtopicNote = {
  subtopicName: "Mughal Empire and Administration",
  title: "Mughal Empire and Administration",
  oneLineDefinition:
    "Babur's battles, Humayun's fall to Sher Shah and the Afghan interlude, Akbar's court, revenue and provinces, and the later Mughals, Marathas and Rajput rulers to 1761.",
  whyItMatters:
    "Twenty-three questions in the bank: five from the 2023 shifts, 11 from the 2024 shifts and seven from the 2025 shifts. Seven of them are about battles, from Babur's first raid in 1519 to Panipat in 1761, and most of the rest ask who held which post at Akbar's court, so the page is a battle line plus a list of Akbar's men and terms.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschmemu-babur",
      name: "Babur, Humayun and Sher Shah",
      intuition:
        "Babur won north India in four years of battles; his son Humayun lost it to an Afghan, Sher Shah, and won it back only months before he died. Learn the battles in order with the enemy in each.",
      definition:
        "**Babur** (full name **Zahiruddin Muhammad**):\n" +
        "- His first Indian conquest was **Bhira** (1519), on the Jhelum.\n" +
        "- **Panipat (1526)**: beat **Ibrahim Lodi**, ending the Sultanate.\n" +
        "- **Khanwa (1527)**: beat **Rana Sanga** of Mewar, whose allies included **Medini Rai** of Chanderi, Hasan Khan Mewati and Mahmud Lodi.\n" +
        "- **Chanderi (1528)**: beat **Medini Rai**.\n\n" +
        "**Humayun** succeeded him in 1530. By Timurid custom he shared power with his brothers: **Kamran** held **Kabul, Kandahar and Punjab**. **Sher Shah Suri** beat Humayun at **Chausa (1539)** and Kannauj (1540) and founded the **Sur dynasty**, the **Second Afghan Empire** (the Lodis were the first). Humayun regained Delhi in 1555 and died in **January 1556**.\n\n" +
        "**Sher Shah's system** (land survey and revenue, the rupiya coin, sarkars and parganas, the **Grand Trunk Road**) became the **model for Akbar**.",
      table: {
        columns: ["Battle", "Year", "Winner and loser"],
        rows: [
          { cells: ["Panipat (first)", "1526", "Babur beat Ibrahim Lodi"] },
          { cells: ["Khanwa", "1527", "Babur beat Rana Sanga"], pyqExampleId: "2cb705fd-b7cc-4179-800a-77fa666da30e" },
          { cells: ["Chanderi", "1528", "Babur beat Medini Rai"], pyqExampleId: "8f57d082-2abe-47c9-986e-688b98290d56" },
          { cells: ["Chausa", "1539", "Sher Shah beat Humayun"], pyqExampleId: "e846037d-4919-4b42-a5c9-46411dcdad94" },
          { cells: ["Kannauj", "1540", "Sher Shah drove Humayun out"], pyqExampleId: "bfd79c5e-ab4c-45f0-9d53-b455cdbde3a5" },
        ],
      },
      pyqExampleId: "e947a3f8-10ea-4ee2-9a60-6cc76a227d9a",
      selfCheckExample: {
        prompt: "Put these in order: Akbar's accession, the building of the Grand Trunk Road, Humayun's death.",
        steps: [
          "Sher Shah built the Grand Trunk Road during his reign, 1540 to 1545.",
          "Humayun died in January 1556, and Akbar was enthroned a few weeks later, in February 1556.",
        ],
        answer: "Grand Trunk Road, Humayun's death, Akbar's accession.",
      },
      practiceSet: [
        { prompt: "What was Babur's full name?", answer: "Zahiruddin Muhammad Babur" },
        { prompt: "Whom did Babur defeat at Khanwa in 1527?", answer: "Rana Sanga of Mewar" },
        { prompt: "Who succeeded Babur?", answer: "Humayun" },
        { prompt: "Which regions did Humayun's brother Kamran control?", answer: "Kabul, Kandahar and Punjab (Afghanistan and Punjab)" },
        { prompt: "Which dynasty did Sher Shah found?", answer: "The Sur dynasty, the Second Afghan Empire" },
      ],
      traps: [
        {
          title: "Khanwa against Sanga, Chanderi against Medini Rai",
          body: "**Medini Rai** fought beside Sanga at **Khanwa (1527)**, then lost his own fort at **Chanderi (1528)**. Each battle has its own main enemy.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmemu-akbar",
      name: "Akbar's empire and the later Mughals",
      intuition:
        "Akbar came to the throne at thirteen and built the system the empire ran on: his regent, his nine gems, his land classes and his provinces. After him SSC jumps to a few names: Mewar's surrender, the Maratha Peshwa, the last great battle of Panipat.",
      definition:
        "**Akbar**:\n" +
        "- Crowned in **1556** at **Kalanaur** in **Punjab**, aged 13. **Bairam Khan** was his regent and **Vakil**, with the title **Khan-i-Khanan**.\n" +
        "- His **Navratnas** (nine gems) included **Tansen** (musician, who played the **rabab**), **Birbal**, **Abul Fazl**, **Raja Man Singh** and **Raja Todar Mal**, his **revenue** minister.\n" +
        "- Land classes: **Polaj** (farmed every year), **Parauti** (fallow a year or two), **Chachar** (fallow **three or four years**), **Banjar** (fallow five years or more).\n" +
        "- His provinces (subahs) had capitals such as **Lahore, Allahabad and Ajmer**.\n\n" +
        "After Akbar:\n" +
        "- **Amar Singh** of Mewar, son of Maharana Pratap, accepted Mughal service under **Jahangir** (1615).\n" +
        "- **Sawai Jai Singh II** of Amber built **five observatories** (Jantar Mantar) at Delhi, Jaipur, Ujjain, Varanasi and Mathura.\n" +
        "- **Baji Rao I**, Peshwa from 1720 to 1740, is called **Baji Rao Ballal**.\n" +
        "- At the **third battle of Panipat (1761)**, between the Marathas and Ahmad Shah Abdali, the Mughal emperor was **Shah Alam II**.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          { cells: ["Polaj", "Land farmed every year"] },
          { cells: ["Parauti", "Left fallow a year or two"] },
          { cells: ["Chachar", "Left fallow three or four years"], pyqExampleId: "7de4123e-a809-4306-8495-a6c3530abd33" },
          { cells: ["Banjar", "Left fallow five years or more"] },
          { cells: ["Vakil (Khan-i-Khanan)", "Bairam Khan, Akbar's regent"], pyqExampleId: "f760a2b0-a399-4b46-8f79-d7ccb6405a77" },
          { cells: ["Revenue minister", "Raja Todar Mal"], pyqExampleId: "6b96dba5-6f42-4733-9a96-28ccbbedda15" },
        ],
      },
      pyqExampleId: "66a54a30-a66a-4bed-9a5f-e1aaa56e21df",
      selfCheckExample: {
        prompt: "Order Akbar's four land classes from the most often farmed to the longest fallow.",
        steps: [
          "Polaj was farmed every year, and Parauti rested a year or two.",
          "Chachar rested three or four years, and Banjar five years or more.",
        ],
        answer: "Polaj, Parauti, Chachar, Banjar.",
      },
      practiceSet: [
        { prompt: "Which instrument did Tansen play?", answer: "The rabab" },
        { prompt: "Who was Akbar's revenue minister?", answer: "Raja Todar Mal" },
        { prompt: "Under which emperor did Amar Singh of Mewar accept Mughal service?", answer: "Jahangir" },
        { prompt: "Who was the Mughal emperor at the third battle of Panipat?", answer: "Shah Alam II" },
        { prompt: "Who built five astronomical observatories in north India?", answer: "Sawai Jai Singh II of Amber" },
      ],
      traps: [
        {
          title: "Bidar was never a Mughal provincial capital",
          body: "**Lahore, Allahabad and Ajmer** were Mughal subah capitals. **Bidar** was a Bahmani and Barid Shahi capital.",
        },
        {
          title: "Baji Rao Ballal is Baji Rao I",
          body: "**Baji Rao I** is known as **Baji Rao Ballal**. **Balaji Rao** (Nanasaheb) was his son and the next Peshwa.",
        },
      ],
    },
  ],
};
