import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_MI_REVOLT_NOTE: SubtopicNote = {
  subtopicName: "Company Rule and the Revolt of 1857",
  title: "Company Rule and the Revolt of 1857",
  oneLineDefinition:
    "How the East India Company took power from the Nawabs, Rajas and the Mughal emperor, and how the revolt of 1857 spread from Meerut before the British crushed it.",
  whyItMatters:
    "Six questions in the bank, three EASY and three MODERATE. They ask for a place, a leader or a year: where the revolt began, who led it at Kanpur, when the British regained control, and what became of the last Mughal emperor. Each year has a different event, so mixing up 1857, 1858 and 1859 costs the mark.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spimire-company",
      name: "The Company, the Nawabs and the last Mughal",
      intuition:
        "The East India Company came to trade and stayed to rule. It won battles, took over the right to collect revenue, and then used treaties and new rules to swallow kingdom after kingdom. " +
        "The Nawabs and Rajas kept their titles but lost their power, and the Mughal emperor became a name with no authority.",
      definition:
        "- From the middle of the 18th century the **Nawabs and Rajas lost their authority and honour**. The Company placed **Residents** at their courts to watch and control them.\n" +
        "- Under **subsidiary alliance** (Lord Wellesley, 1798) a ruler could not keep his own army and had to pay for Company troops.\n" +
        "- Under the **doctrine of lapse** (Lord Dalhousie) a kingdom passed to the Company if its ruler died without a male heir: Satara (1848) and Jhansi (1854) went this way.\n" +
        "- **Awadh** was annexed in 1856 on the charge of bad government, not under the doctrine of lapse.\n" +
        "- In **1849** Dalhousie announced that after **Bahadur Shah Zafar's** death his family would be moved out of the Red Fort. In **1856** Lord Canning said Zafar would be the last Mughal king.\n" +
        "- After 1857 Zafar was tried, sent to prison in **Rangoon** in 1858, and died in the Rangoon jail in **1862**.",
      table: {
        columns: ["Event", "Year", "What it did"],
        rows: [
          { cells: ["Battle of Plassey", "1757", "Robert Clive defeated Sirajuddaulah, Nawab of Bengal"] },
          { cells: ["Battle of Buxar", "1764", "The Company defeated Mir Qasim of Bengal, the Nawab of Awadh and the Mughal emperor together"] },
          { cells: ["Diwani of Bengal", "1765", "The Mughal emperor gave the Company the right to collect revenue in Bengal"] },
          { cells: ["Subsidiary alliance", "1798", "Lord Wellesley: allies disbanded their armies and paid for Company troops"] },
          { cells: ["Doctrine of lapse", "1848 to 1856", "Lord Dalhousie: a kingdom with no male heir passed to the Company"] },
          { cells: ["Annexation of Awadh", "1856", "Taken over on the charge of misgovernment"] },
          { cells: ["Zafar's family to leave the Red Fort", "1849", "Dalhousie's announcement, for after **Bahadur Shah Zafar's** death"] },
          { cells: ["Zafar to be the last Mughal king", "1856", "Lord Canning's decision"] },
          { cells: ["Zafar's death", "1862", "Died in the **Rangoon jail**, in exile"] },
        ],
      },
      selfCheckExample: {
        prompt: "Under which policy did Jhansi pass to the East India Company in 1854?",
        steps: [
          "Jhansi's ruler died without a male heir of his own.",
          "Lord Dalhousie's rule said such a kingdom passed to the Company.",
        ],
        answer: "The doctrine of lapse",
      },
      practiceSet: [
        { prompt: "Which Governor-General brought in the doctrine of lapse?", answer: "Lord Dalhousie" },
        { prompt: "Which Governor-General is linked with the subsidiary alliance?", answer: "Lord Wellesley" },
        { prompt: "On what charge did the British annex Awadh in 1856?", answer: "Misgovernment (bad rule), not the doctrine of lapse" },
        { prompt: "Who won the Battle of Plassey in 1757 for the East India Company?", answer: "Robert Clive" },
        { prompt: "Who was the last Mughal emperor?", answer: "Bahadur Shah Zafar" },
      ],
      pyqExampleId: "bae121a5-67ba-4478-88c4-06ba1dc7f4c8",
      traps: [
        {
          title: "Awadh was not taken by the doctrine of lapse",
          body:
            "Satara and Jhansi were taken because their rulers had no male heir. Awadh had a ruler, Wajid Ali Shah, and was annexed in 1856 on the charge of misgovernment.",
        },
        {
          title: "In 1849 Zafar was alive",
          body:
            "Dalhousie's 1849 announcement was about what would happen after Bahadur Shah Zafar's death. Zafar lived until 1862 and died in exile in Rangoon.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spimire-revolt",
      name: "The revolt of 1857: where it began and who led it",
      intuition:
        "The revolt started as a mutiny of sepoys and grew into a rising of soldiers, rulers and peasants across north India. " +
        "Learn it as a map: each centre has one leader, and the story runs from Meerut to Delhi and then out to Kanpur, Lucknow and Jhansi.",
      definition:
        "- Before the Meerut rising, the sepoy **Mangal Pandey** was hanged for attacking his officers at **Barrackpore**.\n" +
        "- On **10 May 1857** the sepoys at **Meerut** rose, freed their jailed comrades and marched to **Delhi**, where they proclaimed **Bahadur Shah Zafar** their leader.\n" +
        "- The British recaptured Delhi in **September 1857**.\n" +
        "- **Tantia Tope**, Nana Saheb's general, fought on in central India until he was captured and killed in 1859. By the **end of 1859** the British had regained control of the country.\n" +
        "- The **Government of India Act of 1858** passed power from the Company to the **British Crown**. The Governor-General was now called the **Viceroy**.",
      table: {
        columns: ["Centre", "Leader"],
        rows: [
          { cells: ["Barrackpore", "Mangal Pandey, hanged before the Meerut rising"] },
          { cells: ["Meerut", "The sepoys rose first, on 10 May 1857"] },
          { cells: ["Delhi", "Bahadur Shah Zafar, proclaimed leader; Bakht Khan led the soldiers"] },
          { cells: ["Kanpur", "**Nana Saheb**, adopted son of the last Peshwa Baji Rao II"] },
          { cells: ["Lucknow", "**Begum Hazrat Mahal**"] },
          { cells: ["Jhansi", "**Rani Lakshmibai**"] },
          { cells: ["Arrah, Bihar", "**Kunwar Singh**"] },
          { cells: ["Central India", "**Tantia Tope**, Nana Saheb's general"] },
        ],
        caption: "The years to keep apart: 1857 the outbreak, 1858 the Crown takes over, 1859 the British regain control.",
      },
      selfCheckExample: {
        prompt: "Which Act of 1858 passed the government of India from the East India Company to the British Crown?",
        steps: [
          "The British Parliament acted after the revolt.",
          "The 1858 Act ended Company rule and gave power to the Crown.",
        ],
        answer: "The Government of India Act, 1858",
      },
      practiceSet: [
        { prompt: "Who led the revolt of 1857 at Lucknow?", answer: "Begum Hazrat Mahal" },
        { prompt: "Who led the revolt of 1857 in Jhansi?", answer: "Rani Lakshmibai" },
        { prompt: "Which leader of 1857 fought from Arrah in Bihar?", answer: "Kunwar Singh" },
        { prompt: "Where was Mangal Pandey hanged for attacking his officers in 1857?", answer: "Barrackpore" },
        { prompt: "After 1858, what was the Governor-General of India also called?", answer: "The Viceroy" },
        { prompt: "By the end of which year had the British regained control of the country after the revolt?", answer: "1859" },
      ],
      pyqExampleId: "1f4186a2-a215-458a-870b-9de0461fd8bf",
      traps: [
        {
          title: "Barrackpore is not where the revolt began",
          body:
            "Mangal Pandey's act at Barrackpore came first, but it stayed one man's protest. The revolt itself began at Meerut on 10 May 1857.",
        },
        {
          title: "Three years, three events",
          body:
            "1857 is the outbreak, 1858 is the year the Crown took over from the Company, and 1859 is the year the British regained control of the country.",
        },
        {
          title: "Nana Saheb at Kanpur, the Begum at Lucknow",
          body:
            "Nana Saheb led at Kanpur and Begum Hazrat Mahal at Lucknow. Lucknow was the capital of Awadh, so Awadh is not a separate leader's centre from Lucknow.",
        },
      ],
    },
  ],
};
