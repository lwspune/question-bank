import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HMO_ACTS_NOTE: SubtopicNote = {
  subtopicName: "British Administration, Acts and Legislation",
  title: "British Administration, Acts and Legislation",
  oneLineDefinition:
    "The Acts that set up and changed British rule from 1773 to 1935, what each Governor-General or Viceroy is remembered for, and the milestones of colonial education.",
  whyItMatters:
    "Forty-two questions in the bank, the most of any page in this chapter: 13 from the 2023 shifts, 11 from the 2024 shifts and 18 from the 2025 shifts. The 2025 papers went deeper into the Acts themselves, asking what the Regulating Act and Pitt's India Act changed rather than only their years, so learn each Act's three or four main provisions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschmoac-company",
      name: "Acts of the Company era (1765 to 1858)",
      intuition:
        "Parliament controlled the Company step by step: first a Governor-General and a court (1773), then a Board in London over its politics (1784), then the end of its trade (1813, 1833), and finally the end of the Company itself (1858). Each Act takes one more power away.",
      definition:
        "In time order:\n" +
        "- **Dual Government of Bengal (1765 to 1772)**: **Clive**. The Company held the **Diwani** (revenue), the Nawab kept the **Nizamat** (administration). **Warren Hastings** ended it in 1772.\n" +
        "- **Regulating Act, 1773**: the first step by Parliament to control the Company. The Governor of Bengal became **Governor-General of Bengal** (Warren Hastings) with a **council of four**; Bombay and Madras came under him; a **Supreme Court** was set up at Calcutta. It changed both the Company's constitution at home and its government in India.\n" +
        "- **Pitt's India Act, 1784**: a **Board of Control** of six members in London took charge of the Company's **civil, military and revenue** affairs, while the Court of Directors kept trade (the **double government**). The Governor-General in Council could not **declare war or make treaties** without approval, and was made supreme over the Bombay and Madras Presidencies.\n" +
        "- **Charter Act, 1813**: ended the Company's trade monopoly in India (except tea and the China trade) and set aside **one lakh rupees a year for education**.\n" +
        "- **Charter Act, 1833**: the Governor-General of Bengal became **Governor-General of India** (William Bentinck); it provided for a **Law Commission** (Macaulay's, 1834) to codify Indian laws.\n" +
        "- **Government of India Act, 1858**: Company rule **ended**; power passed to the **Crown**. The Board of Control and Court of Directors were abolished; a **Secretary of State for India** took charge, **advised** by a 15-member **Council of India**.",
      table: {
        columns: ["Act", "Year", "Main change"],
        rows: [
          { cells: ["Regulating Act", "1773", "Governor-General of Bengal with a council of four; Supreme Court at Calcutta"], pyqExampleId: "c4220f10-cb8c-41e4-be1b-d66c8533350a" },
          { cells: ["Pitt's India Act", "1784", "Board of Control in London; double government"], pyqExampleId: "25dca909-2a53-4092-931e-4ecaa509f441" },
          { cells: ["Charter Act", "1813", "Trade monopoly ended; one lakh rupees a year for education"] },
          { cells: ["Charter Act", "1833", "Governor-General of India; Law Commission"], pyqExampleId: "8f07e653-9860-440c-928d-a16a9469cac3" },
          { cells: ["Government of India Act", "1858", "Crown rule; Secretary of State with the Council of India"], pyqExampleId: "68cf94db-409d-4d5c-b9e8-db006e4c2268" },
        ],
      },
      pyqExampleId: "3c99b0da-98f0-4075-9dc5-63f9be158596",
      selfCheckExample: {
        prompt: "Which Act abolished the Board of Control, and what replaced it?",
        steps: [
          "The Board of Control was created by Pitt's India Act of 1784.",
          "The Government of India Act of 1858 abolished it, with the Court of Directors, and put a Secretary of State for India in charge.",
        ],
        answer: "The Government of India Act, 1858; a Secretary of State for India, advised by the Council of India.",
      },
      practiceSet: [
        { prompt: "Which Act first set up a Supreme Court at Calcutta?", answer: "The Regulating Act, 1773" },
        { prompt: "Which Act created the Board of Control?", answer: "Pitt's India Act, 1784" },
        { prompt: "Under which Act was a Law Commission first provided for, to codify Indian laws?", answer: "The Charter Act, 1833" },
        { prompt: "What was the role of the Council of India created in 1858?", answer: "To advise the Secretary of State for India" },
        { prompt: "Who set up the Dual Government of Bengal in 1765?", answer: "Robert Clive" },
      ],
      traps: [
        {
          title: "1857 is the revolt, 1858 is the Act",
          body: "Company rule ended under the **Government of India Act, 1858**. An option of **1857** is the year of the revolt, not of the Act.",
        },
        {
          title: "The Board of Control did not end the Court of Directors",
          body: "Under **Pitt's India Act** both bodies existed side by side: that is the **double government**. Both were abolished only in **1858**.",
        },
        {
          title: "Governor-General of Bengal, then of India",
          body: "The **1773** Act made a Governor-General **of Bengal**. The title became Governor-General **of India** only in **1833**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmoac-crown",
      name: "Acts under the Crown (1861 to 1935)",
      intuition:
        "After 1858 the Acts slowly let Indians into government: a few seats on councils, then elections with separate electorates, then dyarchy in the provinces, and finally provincial autonomy. SSC pairs each step with its Act.",
      definition:
        "In time order:\n" +
        "- **Indian High Courts Act, 1861**: High Courts at **Calcutta, Bombay and Madras** replaced the old Supreme Courts and Sadar Adalats.\n" +
        "- **Factory Act, 1881** (Ripon): limited the working hours of **children**. The **1891** Act limited women's hours too.\n" +
        "- **Age of Consent Act, 1891**: raised the age of consent for girls from **10 to 12**.\n" +
        "- **Indian Councils Act, 1909 (Morley-Minto Reforms)**: enlarged the legislative councils and gave **separate electorates to Muslims**.\n" +
        "- **Government of India Act, 1919 (Montagu-Chelmsford Reforms)**: **dyarchy in the provinces**; a **bicameral** central legislature of the **Council of State** and the **Central Legislative Assembly**.\n" +
        "- **Government of India Act, 1935**: ended provincial dyarchy and gave **provincial autonomy**; proposed an **All-India Federation** and dyarchy at the **Centre**. It gave neither independence nor dominion status.",
      table: {
        columns: ["Act", "Year", "Remember it for"],
        rows: [
          { cells: ["Indian High Courts Act", "1861", "High Courts at Calcutta, Bombay, Madras"], pyqExampleId: "7e4a8b9e-a2d8-4672-bdda-dcc8988d2f3a" },
          { cells: ["Age of Consent Act", "1891", "Girls' age of consent raised from 10 to 12"], pyqExampleId: "951bba67-d845-46b5-b5dc-ba1b35b98af9" },
          { cells: ["Indian Councils Act (Morley-Minto)", "1909", "Separate electorates for Muslims"], pyqExampleId: "67eb6f10-59c9-4690-bdcd-f0a048a74518" },
          { cells: ["Government of India Act (Montagu-Chelmsford)", "1919", "Dyarchy in the provinces; two-house central legislature"], pyqExampleId: "e70fbaf5-15ee-4de5-8ca5-89fc3087cdd4" },
          { cells: ["Government of India Act", "1935", "Provincial autonomy; federation proposed"], pyqExampleId: "731c7b35-fdb2-4ca7-8f0f-530dfc9409c5" },
        ],
      },
      pyqExampleId: "f7a44a9c-9d11-490c-9036-82ec653ff9f4",
      selfCheckExample: {
        prompt: "Dyarchy was brought into the provinces by one Act and taken out of them by another. Name both.",
        steps: [
          "The Government of India Act, 1919 (Montagu-Chelmsford) introduced dyarchy in the provinces.",
          "The Government of India Act, 1935 ended it there and gave the provinces autonomy, moving dyarchy to the Centre.",
        ],
        answer: "In by the 1919 Act, out by the 1935 Act.",
      },
      practiceSet: [
        { prompt: "Which reforms gave separate electorates to Muslims?", answer: "The Morley-Minto Reforms (Indian Councils Act, 1909)" },
        { prompt: "Which two houses made up the central legislature under the 1919 Act?", answer: "The Council of State and the Central Legislative Assembly" },
        { prompt: "In which year did the Indian High Courts Act set up High Courts in the three presidency towns?", answer: "1861" },
        { prompt: "To what age did the Age of Consent Act of 1891 raise the age of consent for girls?", answer: "12 (from 10)" },
      ],
      traps: [
        {
          title: "1919 brought dyarchy, 1935 ended it in the provinces",
          body: "**Provincial autonomy** is the **1935** Act. **Dyarchy in the provinces** is the **1919** Act. The two are asked as each other's wrong option.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmoac-governors",
      name: "Governors-General and Viceroys: what each did",
      intuition:
        "SSC asks 'who did this' about a dozen rulers of British India. Learn one line for each, and remember that a Viceroy is just the Governor-General's title after 1858.",
      definition:
        "One line each, in time order:\n" +
        "- **Cornwallis (1786 to 1793)**: Permanent Settlement; the **Cornwallis Code (1793)**, which **separated revenue from judicial work** and brought the rule of written law; districts split into **thanas under a daroga** (1792).\n" +
        "- **Mountstuart Elphinstone**: Governor of **Bombay**, 1819 to 1827.\n" +
        "- **William Bentinck**: **banned sati** in **1829** (Regulation XVII).\n" +
        "- **Mayo**: the **first census, 1872**; financial decentralisation (1870).\n" +
        "- **Lytton**: the **Vernacular Press Act, 1878**.\n" +
        "- **Ripon**: repealed the Press Act (1882); the **resolution on local self-government (1882)**; the **Ilbert Bill (1883)**, drafted by law member **C. P. Ilbert**, to let **Indian judges try Europeans**.\n" +
        "- **Curzon (1899 to 1905)**: **partition of Bengal (1905)**; the **Ancient Monuments Preservation Act (1904)**; the **Police Commission** and the **CID**; the Universities Act (1904).\n\n" +
        "**Satyendranath Tagore** was the first Indian to enter the covenanted civil service (the ICS), in **1863**.",
      table: {
        columns: ["Governor-General or Viceroy", "Remember for"],
        rows: [
          { cells: ["Cornwallis", "Cornwallis Code (1793); darogas and thanas"], pyqExampleId: "36d69134-0a47-474c-848e-8e027d402b1c" },
          { cells: ["William Bentinck", "Sati banned, 1829"], pyqExampleId: "a9b75dc7-0ef3-4459-9363-74a6f4c7795e" },
          { cells: ["Mayo", "First census, 1872"], pyqExampleId: "291fd50b-4499-4da3-9dbf-5a75f7472b73" },
          { cells: ["Lytton", "Vernacular Press Act, 1878"], pyqExampleId: "c8bafc07-21cc-403d-922a-8b2d258c767c" },
          { cells: ["Ripon", "Local self-government, 1882; Ilbert Bill, 1883"], pyqExampleId: "e17f12c7-fa8a-41cb-81f1-00c41e9d853b" },
          { cells: ["Curzon", "Monuments Act 1904; Police Commission and CID"], pyqExampleId: "ec895b05-acc7-40a5-bbae-027f3fa7ab7d" },
        ],
      },
      pyqExampleId: "5bdc548b-5a42-4e26-b4b1-025359a98d74",
      selfCheckExample: {
        prompt: "One Viceroy passed the Vernacular Press Act and the next repealed it. Who were they?",
        steps: ["Lord Lytton passed it in 1878 to curb the Indian-language press.", "Lord Ripon repealed it in 1882."],
        answer: "Passed by Lytton (1878), repealed by Ripon (1882).",
      },
      practiceSet: [
        { prompt: "Which Viceroy is called the father of local self-government in India?", answer: "Lord Ripon" },
        { prompt: "Under which Viceroy was the first census of India taken in 1872?", answer: "Lord Mayo" },
        { prompt: "What did the Cornwallis Code of 1793 separate?", answer: "Revenue administration from judicial administration" },
        { prompt: "Who was the first Indian to enter the covenanted civil service?", answer: "Satyendranath Tagore (1863)" },
        { prompt: "Which Viceroy passed the Ancient Monuments Preservation Act of 1904?", answer: "Lord Curzon" },
      ],
      traps: [
        {
          title: "Mayo's census was the first, Ripon's the first synchronous",
          body: "The **first** census was in **1872** under **Mayo**. The first **synchronous** one, taken all over India on the same day, was in **1881** under **Ripon**.",
        },
        {
          title: "Ripon's resolution was about political education",
          body: "Mayo's resolution of **1870** decentralised **finance**. Ripon's of **1882** was meant for the **political education** of the people through local bodies.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmoac-education",
      name: "Education policy and institutions",
      intuition:
        "Colonial education began with colleges for Persian, Arabic and Sanskrit learning, then swung to English. Each institution has a founder and a year, and the despatches and minutes have a year each.",
      definition:
        "In time order:\n" +
        "- **Calcutta Madrasa (1781)**: **Warren Hastings**, for Arabic, Persian and Islamic law.\n" +
        "- **Asiatic Society of Bengal (1784)**: **Sir William Jones**.\n" +
        "- **Sanskrit College, Benaras (1791)**: **Jonathan Duncan**.\n" +
        "- **Fort William College (1800)**: **Lord Wellesley**, to train Company officials.\n" +
        "- **Charter Act (1813)**: one lakh rupees a year for education.\n" +
        "- **Macaulay's Minute (1835)**: favoured **English** education over Sanskrit and Arabic learning.\n" +
        "- **Wood's Despatch (1854)**: **Sir Charles Wood**; a graded system from primary schools to universities, called the **Magna Carta of English education in India**. It led to the universities of **Calcutta, Bombay and Madras (1857)**.\n" +
        "- **Hunter Commission (1882)**: on primary and secondary education.",
      table: {
        columns: ["Institution or policy", "Year", "Founder or author"],
        rows: [
          { cells: ["Calcutta Madrasa", "1781", "Warren Hastings"], pyqExampleId: "7924b98d-56ce-4845-9f6f-8b46a63b2fe6" },
          { cells: ["Asiatic Society of Bengal", "1784", "Sir William Jones"], pyqExampleId: "d0eb3ebc-816a-436b-82f3-819120fee383" },
          { cells: ["Sanskrit College, Benaras", "1791", "Jonathan Duncan"] },
          { cells: ["Fort William College", "1800", "Lord Wellesley"] },
          { cells: ["Macaulay's Minute", "1835", "Thomas Babington Macaulay"] },
          { cells: ["Wood's Despatch", "1854", "Sir Charles Wood"], pyqExampleId: "379b0cd0-5f4b-43c6-9935-6102a0dea421" },
        ],
      },
      pyqExampleId: "5bc13a36-d539-4c43-a84e-98c6532845e9",
      selfCheckExample: {
        prompt: "Put these in order: Wood's Despatch, Macaulay's Minute, the Charter Act grant for education.",
        steps: ["The Charter Act grant of one lakh rupees came in 1813.", "Macaulay's Minute came in 1835.", "Wood's Despatch came in 1854."],
        answer: "Charter Act grant (1813), Macaulay's Minute (1835), Wood's Despatch (1854).",
      },
      practiceSet: [
        { prompt: "Who founded the Sanskrit College at Benaras in 1791?", answer: "Jonathan Duncan" },
        { prompt: "Which Governor-General set up Fort William College in 1800?", answer: "Lord Wellesley" },
        { prompt: "Which three universities were set up in 1857?", answer: "Calcutta, Bombay and Madras" },
        { prompt: "Which Act of 1813 set aside one lakh rupees a year for education?", answer: "The Charter Act of 1813" },
      ],
      traps: [
        {
          title: "Macaulay favoured English, not Sanskrit",
          body: "**Macaulay's Minute (1835)** argued **for English** education and against spending on Sanskrit and Arabic learning. A pair that says it emphasised Sanskrit is wrong.",
        },
      ],
    },
  ],
};
