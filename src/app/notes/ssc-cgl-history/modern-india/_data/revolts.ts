import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HMO_REVOLTS_NOTE: SubtopicNote = {
  subtopicName: "Revolt of 1857 and Popular Uprisings",
  title: "Revolt of 1857 and Popular Uprisings",
  oneLineDefinition:
    "The great revolt of 1857 with its dates, centres and leaders, the tribal and peasant risings before and after it, and the resistance in Manipur and the Naga hills.",
  whyItMatters:
    "Eighteen questions in the bank, and half of them (nine) come from the 2025 shifts alone, against five from the 2023 shifts and four from the 2024 shifts. The 2025 papers turned to tribal and North-East leaders such as Budhu Bhagat, Tikendrajit Singh and Rani Gaidinliu, so a leader-and-place table is the whole page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschmorv-1857",
      name: "The revolt of 1857: dates and leaders",
      intuition:
        "The revolt began as a mutiny in one cantonment and spread to a dozen towns, each with its own leader. SSC asks two things: the date and place it began, and who led which town.",
      definition:
        "The dates:\n" +
        "- **29 March 1857**: **Mangal Pandey** attacked his officers at **Barrackpore**.\n" +
        "- **10 May 1857**: the sepoys at **Meerut** rose and set out for **Delhi** the same night, reaching it on **11 May**.\n" +
        "- The rebels proclaimed **Bahadur Shah II (Bahadur Shah Zafar)**, the last Mughal emperor, their leader. After the revolt he was exiled to **Rangoon**.\n\n" +
        "Who led where is in the table. **Nana Sahib** was the adopted son of the last Peshwa, **Baji Rao II**; the British refused to continue Baji Rao's pension to him.",
      table: {
        columns: ["Centre", "Leader"],
        rows: [
          { cells: ["Delhi", "Bahadur Shah II, with Bakht Khan leading the sepoys"], pyqExampleId: "e3944a5d-66c2-4944-b899-e40adc00dc4c" },
          { cells: ["Kanpur", "Nana Sahib, with Tantia Tope; Azimullah was his adviser"], pyqExampleId: "96ef3a50-4d17-4d9e-a234-29393ff2ae07" },
          { cells: ["Lucknow", "Begum Hazrat Mahal"] },
          { cells: ["Jhansi", "Rani Lakshmibai"] },
          { cells: ["Bareilly", "Khan Bahadur Khan"], pyqExampleId: "e4033830-40b4-44f5-83ee-a88739f3314f" },
          { cells: ["Bihar (Jagdishpur, near Arrah)", "Kunwar Singh"], pyqExampleId: "ae3570c2-c941-4da4-aab5-6ab2419bbf3c" },
          { cells: ["Faizabad", "Maulvi Ahmadullah"] },
        ],
      },
      pyqExampleId: "f30474ed-d487-4e0c-b4cb-614c073f3400",
      selfCheckExample: {
        prompt: "Put these in order: the sepoys reach Delhi, Mangal Pandey's attack, the rising at Meerut.",
        steps: [
          "Mangal Pandey attacked his officers at Barrackpore on 29 March 1857.",
          "The Meerut sepoys rose on 10 May 1857 and reached Delhi on 11 May.",
        ],
        answer: "Mangal Pandey (29 March), Meerut (10 May), Delhi (11 May).",
      },
      practiceSet: [
        { prompt: "From which cantonment did the revolt of May 1857 begin?", answer: "Meerut" },
        { prompt: "Who led the revolt of 1857 at Lucknow?", answer: "Begum Hazrat Mahal" },
        { prompt: "Whose adopted son was Nana Sahib?", answer: "The last Peshwa, Baji Rao II" },
        { prompt: "To which city was Bahadur Shah II exiled after the revolt?", answer: "Rangoon" },
        { prompt: "Who led the revolt of 1857 at Bareilly?", answer: "Khan Bahadur Khan" },
      ],
      traps: [
        {
          title: "Bahadur Shah II, not Bahadur Shah I",
          body: "The emperor of 1857 is **Bahadur Shah II (Zafar)**. **Bahadur Shah I** ruled 150 years earlier, after Aurangzeb.",
        },
        {
          title: "Two leaders in Bihar",
          body: "**Kunwar Singh** led from **Jagdishpur** near Arrah; **Peer Ali Khan**, a bookseller, organised the rising in **Patna**. Both count as Bihar.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmorv-tribal",
      name: "Tribal and peasant risings",
      intuition:
        "Company rule took tribal land, let in moneylenders and closed the forests. Each tribe rose in its own region under its own leader, and SSC asks the leader, the tribe or the state.",
      definition:
        "In time order:\n" +
        "- **Paika rebellion (1817)**: at **Khurda** in **Odisha**, led by **Bakshi Jagabandhu**.\n" +
        "- **Kol revolt (1831 to 1832)**: in **Chotanagpur**, led by **Budhu Bhagat**.\n" +
        "- **Santhal Hul (1855 to 1856)**: in the **Rajmahal hills**, led by the brothers **Sido and Kanhu Murmu** against moneylenders, zamindars and the British.\n" +
        "- **Moplah (Mappila) risings**: Muslim peasants of **Malabar (Kerala)** against landlords, through the 19th century and again in **1921**.\n" +
        "- **Munda Ulgulan (1899 to 1900)**: around **Ranchi** in present Jharkhand, led by **Birsa Munda**.\n" +
        "- **Rampa rebellion (1922 to 1924)**: in the Godavari hills, now **Andhra Pradesh**, led by **Alluri Sitarama Raju**.",
      table: {
        columns: ["Rising", "Years", "Region", "Leader"],
        rows: [
          { cells: ["Paika rebellion", "1817", "Khurda, Odisha", "Bakshi Jagabandhu"], pyqExampleId: "24edd21a-1eda-4b6d-9cc8-b0e6208edc3a" },
          { cells: ["Kol revolt", "1831 to 1832", "Chotanagpur", "Budhu Bhagat"], pyqExampleId: "da102b7d-2e9b-4f88-9d3d-0594111764c8" },
          { cells: ["Santhal Hul", "1855 to 1856", "Rajmahal hills", "Sido and Kanhu Murmu"], pyqExampleId: "c789c721-cf48-4825-8e8a-2547b2f7d387" },
          { cells: ["Malabar (Moplah) rising", "1921", "Malabar, Kerala", "Mappila peasants"], pyqExampleId: "5d9d554c-6bb4-47d6-993e-a2feeed91ba3" },
          { cells: ["Munda Ulgulan", "1899 to 1900", "Ranchi, Jharkhand", "Birsa Munda"] },
          { cells: ["Rampa rebellion", "1922 to 1924", "Andhra Pradesh", "Alluri Sitarama Raju"], pyqExampleId: "169fac82-923e-4afb-a97c-28d2a90f6f0f" },
        ],
      },
      pyqExampleId: "2cfe447f-57a8-4d96-958b-8b8eedb06636",
      selfCheckExample: {
        prompt: "Three risings were in the Jharkhand region. Name each with its leader.",
        steps: [
          "The Kol revolt of 1831 to 1832 in Chotanagpur: Budhu Bhagat.",
          "The Santhal Hul of 1855 to 1856 in the Rajmahal hills: Sido and Kanhu Murmu.",
          "The Munda Ulgulan of 1899 to 1900 around Ranchi: Birsa Munda.",
        ],
        answer: "Kol (Budhu Bhagat), Santhal (Sido and Kanhu), Munda (Birsa Munda).",
      },
      practiceSet: [
        { prompt: "In which state did the Paika rebellion of 1817 take place?", answer: "Odisha (at Khurda)" },
        { prompt: "Which brothers led the Santhal rebellion of 1855?", answer: "Sido and Kanhu Murmu" },
        { prompt: "In which present state did Alluri Sitarama Raju lead the Rampa rebellion?", answer: "Andhra Pradesh" },
        { prompt: "Who led the Kol revolt of 1831 to 1832?", answer: "Budhu Bhagat" },
        { prompt: "In which region did the Moplah peasants rise?", answer: "Malabar, in Kerala" },
      ],
      traps: [
        {
          title: "Santhal and Munda are different risings",
          body: "**Sido and Kanhu** led the **Santhals (1855)**; **Birsa Munda** led the **Mundas (1899)**. SSC lists each as a wrong option for the other.",
        },
        {
          title: "Two Rampa risings",
          body: "**Alluri Sitarama Raju's** Rampa rebellion is **1922 to 1924**. An earlier Rampa rising of 1879 had other leaders, so do not tie Alluri to the 1870s.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmorv-northeast",
      name: "Resistance in Manipur and the Naga hills",
      intuition:
        "The North-East came under British rule late, and its resistance came late too: a war in Manipur in 1891 and a Naga faith movement in the 1930s. The 2025 shifts asked about both.",
      definition:
        "The facts:\n" +
        "- **Anglo-Manipur War (1891)**: **Tikendrajit Singh**, the Senapati (army chief) of Manipur, led the resistance. Its decisive battle was at **Khongjom**. He was publicly **hanged at Imphal**.\n" +
        "- **Heraka movement**: begun by **Haipou Jadonang** among the **Zeliangrong Nagas** to revive their own faith against British rule and missionary conversion. After the British hanged him in **1931**, his young cousin **Rani Gaidinliu** led it.\n" +
        "- Gaidinliu came from **Manipur** (Tamenglong). She was jailed from **1932 to 1947**, and **Nehru** called her **Rani** of the Nagas.",
      table: {
        columns: ["Leader", "Movement or war", "Fact"],
        rows: [
          { cells: ["Tikendrajit Singh", "Anglo-Manipur War, 1891", "Fought at Khongjom; hanged at Imphal"], pyqExampleId: "600ba9ff-1c0b-4ebb-80ad-36abfbed88f4" },
          { cells: ["Haipou Jadonang", "Heraka movement", "Founded it; hanged by the British in 1931"] },
          { cells: ["Rani Gaidinliu", "Heraka movement", "Led it after 1931; jailed 1932 to 1947"], pyqExampleId: "bca50759-7ebb-4ac0-aa24-2a59238ea9b3" },
        ],
      },
      pyqExampleId: "6c150cca-0178-46b9-8052-f085860aa2d7",
      selfCheckExample: {
        prompt: "Who founded the Heraka movement, and who led it after him?",
        steps: ["Haipou Jadonang founded it among the Zeliangrong Nagas.", "After the British hanged him in 1931, Rani Gaidinliu led it."],
        answer: "Founded by Haipou Jadonang; led after 1931 by Rani Gaidinliu.",
      },
      practiceSet: [
        { prompt: "Which battle decided the Anglo-Manipur War of 1891?", answer: "Khongjom" },
        { prompt: "Who called Gaidinliu Rani?", answer: "Jawaharlal Nehru" },
        { prompt: "From which present state did Rani Gaidinliu come?", answer: "Manipur" },
        { prompt: "What did the Heraka movement seek to revive?", answer: "The Zeliangrong Nagas' own faith, against British rule and missionary conversion" },
      ],
      traps: [
        {
          title: "Heraka was a faith and a revolt, not a literacy drive",
          body: "The Heraka movement revived the **Naga faith** and became a **revolt against British rule**. A reason that calls it a literacy campaign is false.",
        },
      ],
    },
  ],
};
