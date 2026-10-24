import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_DF_COMMAND_NOTE: SubtopicNote = {
  subtopicName: "Command, Wars and Traditions",
  title: "Command, Wars and Traditions",
  oneLineDefinition:
    "Who commands India's armed forces and how the Ministry of Defence is organised, the chiefs and operations of India's wars, and the days, mottos, academies and firsts of the three services.",
  whyItMatters:
    "Eight questions in the bank, four EASY and four MODERATE, one of them from the 2022 paper. They ask who heads what, who led the Army in a given war, which operation took Siachen, when the Air Force was founded, the Navy's motto and the first woman Air Marshal. These facts do not change, so a table learnt once keeps paying.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spidfco-command",
      name: "Supreme command, the CDS and the Ministry of Defence",
      intuition:
        "In a democracy the armed forces answer to elected government. So the President holds supreme command, the Defence Minister runs the Ministry, and the uniformed chiefs command their own services.",
      definition:
        "- The **supreme command** of the armed forces is vested in the **President of India** (Article 53).\n" +
        "- The **Chief of Defence Staff (CDS)** is a four-star officer and the permanent chairman of the Chiefs of Staff Committee. The first CDS, General Bipin Rawat, took office on 1 January 2020.\n" +
        "- The **Department of Military Affairs**, created in 2020, is headed by the **CDS**. The **Department of Defence** is headed by the **Defence Secretary**, a civil servant.\n" +
        "- Each service has its own chief: the **Chief of the Army Staff**, the **Chief of the Naval Staff** and the **Chief of the Air Staff**. All three headquarters are in **New Delhi**.",
      table: {
        columns: ["Post or body", "Who or what"],
        rows: [
          { cells: ["Supreme Commander", "The **President** of India"] },
          { cells: ["Chief of Defence Staff", "Four-star officer; chairs the Chiefs of Staff Committee"] },
          { cells: ["Department of Military Affairs", "Headed by the **CDS** (since 2020)"] },
          { cells: ["Department of Defence", "Headed by the Defence Secretary"] },
          { cells: ["First CDS", "General Bipin Rawat, from 1 January 2020"] },
        ],
      },
      selfCheckExample: {
        prompt: "Who heads the Department of Defence in the Ministry of Defence?",
        steps: ["The Ministry has a department run by the CDS and another run by a civil servant.", "The Department of Defence is the civil servant's."],
        answer: "The Defence Secretary",
      },
      practiceSet: [
        { prompt: "In whom is the supreme command of India's armed forces vested?", answer: "The President of India" },
        { prompt: "Who was India's first Chief of Defence Staff?", answer: "General Bipin Rawat" },
        { prompt: "In which year was the Department of Military Affairs created?", answer: "2020" },
        { prompt: "Which committee does the CDS chair permanently?", answer: "The Chiefs of Staff Committee" },
      ],
      pyqExampleId: "792d2b27-3139-4d8f-bfbe-655279e5bd90",
      traps: [
        {
          title: "The President, not the Prime Minister",
          body:
            "The Prime Minister and the Defence Minister take the decisions of government, but the Constitution vests the supreme command of the armed forces in the President.",
        },
        {
          title: "CDS for military affairs, Secretary for defence",
          body:
            "The Department of Military Affairs is headed by the CDS. The Defence Secretary heads the Department of Defence. The Army chief (COAS) heads neither.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spidfco-wars",
      name: "Chiefs in India's wars and named operations",
      intuition:
        "Each war is asked by its Army chief, and each operation by what it did. Put them on one timeline and the four wars and their chiefs fall into place.",
      definition:
        "- **1962** (China): General **P.N. Thapar**. **1965** (Pakistan): General **J.N. Chaudhuri**, with Air Marshal Arjan Singh leading the Air Force.\n" +
        "- **1971** (Pakistan, the liberation of Bangladesh): General **Sam Manekshaw**, later India's first Field Marshal. Admiral S.M. Nanda led the Navy and Air Chief Marshal P.C. Lal the Air Force.\n" +
        "- **1999** (Kargil): General **V.P. Malik**; the Army's operation was **Operation Vijay**.\n" +
        "- **K.M. Cariappa** became the first Indian Commander-in-Chief of the Army on **15 January 1949**, now **Army Day**.",
      table: {
        columns: ["Operation", "Year", "What it did"],
        rows: [
          { cells: ["Operation Vijay", "1961", "Liberated Goa"] },
          { cells: ["Operation Trident", "1971", "The Navy's attack on Karachi; Navy Day is 4 December"] },
          { cells: ["**Operation Meghdoot**", "1984", "Secured the **Siachen Glacier**"] },
          { cells: ["Operation Blue Star", "1984", "The Golden Temple, Amritsar"] },
          { cells: ["Operation Pawan", "1987", "The Indian Peace Keeping Force in Sri Lanka"] },
          { cells: ["Operation Cactus", "1988", "Stopped a coup in the Maldives"] },
          { cells: ["Operation Vijay", "1999", "Kargil war (the Air Force's part was Operation Safed Sagar)"] },
          { cells: ["Operation Black Tornado", "2008", "The NSG against the attackers in Mumbai"] },
        ],
        caption: "Army chiefs: 1962 Thapar, 1965 Chaudhuri, 1971 Manekshaw, 1999 Malik.",
      },
      selfCheckExample: {
        prompt: "Who was the Chief of the Army Staff during the Kargil war of 1999?",
        steps: ["Kargil is the 1999 war.", "The Army chief then was General V.P. Malik."],
        answer: "General V.P. Malik",
      },
      practiceSet: [
        { prompt: "Who led the Indian Army in the 1971 war?", answer: "General Sam Manekshaw" },
        { prompt: "Which operation of 1984 secured the Siachen Glacier?", answer: "Operation Meghdoot" },
        { prompt: "Which operation of 1988 stopped a coup in the Maldives?", answer: "Operation Cactus" },
        { prompt: "What was the Air Force's operation in the Kargil war called?", answer: "Operation Safed Sagar" },
        { prompt: "Who was the Army chief during the 1962 war with China?", answer: "General P.N. Thapar" },
        { prompt: "Why is 15 January celebrated as Army Day?", answer: "K.M. Cariappa became the first Indian Commander-in-Chief of the Army on 15 January 1949" },
      ],
      pyqExampleId: "9f0bed42-7328-4c7f-8312-8ce7c8206912",
      traps: [
        {
          title: "Two Operation Vijays",
          body:
            "Operation Vijay was the name for the liberation of Goa in 1961 and again for the Kargil war in 1999. Siachen was Operation Meghdoot.",
        },
        {
          title: "Manekshaw is 1971, not 1965",
          body:
            "General J.N. Chaudhuri led the Army in 1965. Sam Manekshaw led it in 1971, and P.N. Thapar in 1962.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spidfco-traditions",
      name: "Days, mottos, academies and firsts",
      intuition:
        "Each service has a day it celebrates, a motto in Sanskrit or English, and academies that train its officers. These are stable facts, asked again and again.",
      definition:
        "- **Army Day** is 15 January, **Navy Day** 4 December, and **Air Force Day** 8 October: the Indian Air Force was set up on **8 October 1932**.\n" +
        "- Mottos: the **Navy** \"Sham No Varunah\" (may the Lord of the Waters be good to us); the **Air Force** \"Nabhah Sparsham Deeptam\" (touch the sky with glory).\n" +
        "- Academies: the **National Defence Academy** at Khadakwasla, Pune; the **Indian Military Academy** at Dehradun (motto \"Valour and Wisdom\"); the **Indian Naval Academy** at Ezhimala, Kerala; the **Air Force Academy** at Dundigal, Hyderabad.\n" +
        "- Firsts: **Padma Bandopadhyay** became the first woman **Air Marshal** in 2004; **Harita Kaur Deol** was the first woman to fly solo in the Air Force (1994); **Avani Chaturvedi, Bhawana Kanth and Mohana Singh** became the first women fighter pilots in 2016.",
      table: {
        columns: ["Service or body", "Day", "Motto or note"],
        rows: [
          { cells: ["Indian Army", "15 January", "Army Day: Cariappa took command in 1949"] },
          { cells: ["Indian Navy", "4 December", "**Sham No Varunah**"] },
          { cells: ["Indian Air Force", "**8 October** (founded 1932)", "Nabhah Sparsham Deeptam"] },
          { cells: ["Indian Military Academy, Dehradun", "Founded 1932", "Valour and Wisdom"] },
        ],
      },
      selfCheckExample: {
        prompt: "What is the motto of the Indian Air Force?",
        steps: ["The motto is Sanskrit and is about the sky.", "It is Nabhah Sparsham Deeptam, touch the sky with glory."],
        answer: "Nabhah Sparsham Deeptam",
      },
      practiceSet: [
        { prompt: "On which date was the Indian Air Force established?", answer: "8 October 1932" },
        { prompt: "Who was the first woman Air Marshal of the Indian Air Force?", answer: "Padma Bandopadhyay" },
        { prompt: "Where is the National Defence Academy?", answer: "Khadakwasla, Pune" },
        { prompt: "What is the motto of the Indian Military Academy?", answer: "Valour and Wisdom" },
        { prompt: "On which day is Navy Day celebrated?", answer: "4 December" },
        { prompt: "Where is the Indian Naval Academy?", answer: "Ezhimala, Kerala" },
      ],
      pyqExampleId: "4fd01e51-8190-454d-ab9e-22ab194d274a",
      traps: [
        {
          title: "Navy water, Air Force sky",
          body:
            "Sham No Varunah calls on Varuna, the lord of the waters, so it is the Navy's. Nabhah Sparsham Deeptam is about the sky, so it is the Air Force's. Valour and Wisdom belongs to the Indian Military Academy.",
        },
        {
          title: "First woman Air Marshal, not first pilot",
          body:
            "Padma Bandopadhyay, a medical officer, was the first woman Air Marshal. Harita Kaur Deol was the first woman to fly solo, and Avani Chaturvedi was among the first women fighter pilots.",
        },
      ],
    },
  ],
};
