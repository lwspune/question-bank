import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_AN_MAURYAS_NOTE: SubtopicNote = {
  subtopicName: "Mahajanapadas and the Mauryas",
  title: "Mahajanapadas and the Mauryas",
  oneLineDefinition:
    "The Mahajanapadas and the rise of Magadha, the Mauryan state as the Arthashastra describes it, Ashoka's turn to Buddhism, and where his edicts stand.",
  whyItMatters:
    "Fifteen questions, the largest page in this chapter. Eight of them are about Ashoka and his inscriptions, so the edict sites and the stories of his conversion are worth learning name by name.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshian-mahajanapadas",
      name: "Mahajanapadas and the rise of Magadha",
      intuition:
        "In the sixth century BCE north India had sixteen big states. Most were ruled by kings, a few by assemblies of many rulers. " +
        "Magadha beat them all because its land gave it food, iron and elephants.",
      definition:
        "- Buddhist texts such as the **Anguttara Nikaya** list **sixteen Mahajanapadas**.\n" +
        "- Most were **monarchies**, such as **Magadha**, **Kosala** and **Avanti**. Some were **ganas or sanghas**, ruled by many people together; the best known is the **Vajji** confederacy, centred on **Vaishali**.\n" +
        "- **Magadha rose** because of **fertile farmland** in the middle Ganga plain, **iron mines** nearby, **elephants** from the forests for its army, and rivers for transport.\n" +
        "- Magadha's capital moved from **Rajagaha** to **Pataliputra**. Avanti's capital was **Ujjayini**; Kosala's was **Shravasti**.\n" +
        "- The ancient city of **Mahishmati** stood on the **Narmada**, near modern Maheshwar.",
      table: {
        columns: ["State or city", "Fact"],
        rows: [
          {
            cells: ["Vajji", "A gana (rule by many), centred on Vaishali"],
            noteAmber: "CDS 2022 (I): Vajji was the oligarchy; Magadha, Avanti and Kosala were monarchies.",
            pyqExampleId: "5e7a273d-6cba-40f8-822e-fb16851754de",
          },
          { cells: ["Magadha", "Capitals Rajagaha, then Pataliputra"] },
          { cells: ["Avanti", "Capital Ujjayini"] },
          { cells: ["Kosala", "Capital Shravasti"] },
          {
            cells: ["Mahishmati", "On the Narmada, near Maheshwar"],
            pyqExampleId: "c38a7c43-7370-4867-b99d-f4eb818fcd56",
          },
        ],
      },
      pyqExampleId: "d164af74-e99e-4936-b7f1-480552361aae",
      selfCheckExample: {
        prompt: "Which of the Mahajanapadas Magadha, Vajji, Avanti and Kosala was a gana, and what does gana mean?",
        steps: [
          "Magadha, Avanti and Kosala were ruled by kings.",
          "In a gana, power was shared by many rulers together.",
        ],
        answer: "Vajji; a gana is a state ruled by many people together, not by one king.",
      },
      practiceSet: [
        { prompt: "What was the capital of Avanti?", answer: "Ujjayini" },
        { prompt: "On which river was the ancient city of Mahishmati?", answer: "The Narmada" },
        { prompt: "Where did Magadha move its capital from Rajagaha?", answer: "Pataliputra" },
        { prompt: "Which Buddhist text lists the sixteen Mahajanapadas?", answer: "The Anguttara Nikaya" },
      ],
      traps: [
        {
          title: "All three reasons for Magadha",
          body: "Magadha's rise rested on fertile farmland, iron and elephants together. An option that keeps only one or two of them is incomplete.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-mauryan-state",
      name: "The Mauryan state and the Arthashastra",
      intuition:
        "Kautilya's Arthashastra is a handbook on running a state. It names the parts of a kingdom, the officers who ran it, " +
        "and even what to do with forest peoples and famines.",
      definition:
        "- The **saptanga** (seven limbs) of the state: **swami** (king), **amatya** (ministers), **janapada** (territory and people), **durga** (fort), **kosha** (treasury), **danda** (army or force) and **mitra** (ally).\n" +
        "- Officers: the **samahartri** collected revenue; the **samnidhatri** kept the treasury and stores; the **akshapatala** kept records and accounts; the **dauvarika** headed the palace guard; the **senapati** led the army.\n" +
        "- Forest peoples (**atavikas**) were brought under control and used as **soldiers, spies and assassins**. The state claimed forest wealth for itself and punished the burning of forests.\n" +
        "- In a famine the Arthashastra tells the king to give people **work on forts and irrigation in return for food**.\n" +
        "- Ashoka's empire reached **Baluchistan** and **Kashmir** and took in **north Bengal**, but the **Brahmaputra valley** of Assam lay outside it.",
      table: {
        columns: ["Office or term", "Meaning"],
        rows: [
          {
            cells: ["Samahartri", "Chief collector of revenue"],
            noteAmber: "CDS 2024 (II): the Dauvarika paired with the army was the wrong match.",
            pyqExampleId: "28f3c8da-b890-4d38-a3a2-73936916142d",
          },
          { cells: ["Samnidhatri", "Treasurer and keeper of stores"] },
          { cells: ["Akshapatala", "Office of records and accounts"] },
          { cells: ["Dauvarika", "Chief of the palace guard"] },
          { cells: ["Senapati", "Head of the army"] },
          {
            cells: ["Atavikas", "Forest peoples; used as soldiers, spies and assassins"],
            pyqExampleId: "178199e1-c09b-4aa1-8367-f2324301a770",
          },
        ],
      },
      pyqExampleId: "a4e72172-59bc-4f61-8be5-72dfeca736f6",
      selfCheckExample: {
        prompt: "How did the Arthashastra tell a king to help his people in a famine?",
        steps: [
          "Free grain alone empties the treasury.",
          "Instead, the king starts building works such as forts and irrigation and pays the workers in food.",
        ],
        answer: "By giving them work on forts and irrigation in return for food.",
      },
      practiceSet: [
        { prompt: "Which Mauryan officer collected the revenue?", answer: "The samahartri" },
        { prompt: "Which Mauryan officer headed the palace guard?", answer: "The dauvarika" },
        { prompt: "Was the Brahmaputra valley of Assam part of Ashoka's empire?", answer: "No" },
        { prompt: "How did the Mauryan state use forest peoples?", answer: "As soldiers, spies and assassins" },
      ],
      traps: [
        {
          title: "Dhamma is not a limb of the state",
          body: "Dhamma is Ashoka's word for his moral teaching. Kautilya's seven limbs are swami, amatya, janapada, durga, kosha, danda and mitra.",
        },
        {
          title: "Dauvarika guarded the palace",
          body: "The dauvarika was chief of the palace guard. The army was led by the senapati.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-ashoka-faith",
      name: "Ashoka's turn to Buddhism",
      intuition:
        "The Kalinga war filled Ashoka with remorse and he became a Buddhist. His own edicts and the later Buddhist chronicles tell the story, " +
        "but the chronicles do not agree on who first drew him to the faith.",
      definition:
        "- After the **Kalinga war** Ashoka felt deep **remorse** (Rock Edict XIII) and became a **Buddhist**.\n" +
        "- He did **not** disband his army or abolish the death penalty: a pillar edict gives condemned prisoners **three days' respite**.\n" +
        "- The Sri Lankan chronicles **Mahavamsa** and **Dipavamsa** say the young monk **Nigrodha**, his nephew, turned him to the dhamma. The north Indian **Divyavadana** gives the credit to **Samudra**, a merchant turned monk.\n" +
        "- **Minor Rock Edict I** shows a **gradual** deepening of his faith over more than two and a half years, not a sudden change.\n" +
        "- The **Rummindei** pillar marks his visit to **Lumbini**, the Buddha's birthplace. The **Nigali Sagar** pillar records that he enlarged the stupa of an earlier Buddha, **Konakamana**.",
      table: {
        columns: ["Source", "What it says"],
        rows: [
          { cells: ["Rock Edict XIII", "Remorse after the Kalinga war"] },
          {
            cells: ["Mahavamsa", "Sri Lankan chronicle of Ashoka's reign; Nigrodha turns him to the dhamma"],
            pyqExampleId: "8bd4fe37-9970-46c7-9971-11cb74a4b6f6",
          },
          {
            cells: ["Divyavadana", "Samudra, a merchant turned monk, draws him to the Buddha's teaching"],
            noteAmber: "CDS 2019 (II): the Dipavamsa does not tell the Samudra story.",
            pyqExampleId: "1934f352-8929-44ec-b6ef-e46869b435c5",
          },
          {
            cells: ["Minor Rock Edict I", "A gradual deepening of faith, not a sudden change"],
            pyqExampleId: "bdbf6823-c4b0-4452-a34b-6bbf9e42afca",
          },
          { cells: ["Rummindei pillar", "His visit to Lumbini, the Buddha's birthplace"] },
          { cells: ["Nigali Sagar pillar", "He enlarged the stupa of the earlier Buddha Konakamana"] },
        ],
      },
      pyqExampleId: "a6963b3f-eb89-4647-a0b1-ea348915086a",
      selfCheckExample: {
        prompt: "According to the Divyavadana, who drew Ashoka to the Buddha's teaching?",
        steps: [
          "The Sri Lankan chronicles name Nigrodha.",
          "The Divyavadana, a north Indian text, tells a different story.",
        ],
        answer: "Samudra, a merchant turned monk.",
      },
      practiceSet: [
        { prompt: "Which Ashokan pillar records his visit to the Buddha's birthplace?", answer: "The Rummindei pillar" },
        { prompt: "Which Sri Lankan chronicle tells the story of Ashoka's reign?", answer: "The Mahavamsa" },
        { prompt: "Which pillar inscription mentions the stupa of Konakamana?", answer: "The Nigali Sagar pillar" },
        { prompt: "Does Minor Rock Edict I describe a sudden or a gradual change in Ashoka's faith?", answer: "A gradual change" },
      ],
      traps: [
        {
          title: "Ashoka kept his army and the death penalty",
          body: "Remorse after Kalinga did not make Ashoka disband his army or end capital punishment. His own edict gives prisoners sentenced to death three days' respite.",
        },
        {
          title: "Nigrodha in Sri Lanka, Samudra in the north",
          body: "The Mahavamsa and Dipavamsa credit Nigrodha; only the Divyavadana credits Samudra. A statement putting Samudra in the Dipavamsa is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-edicts",
      name: "Reading and placing Ashoka's edicts",
      intuition:
        "Ashoka's edicts were carved across his empire, mostly in Prakrit in the Brahmi script. For centuries nobody could read them, " +
        "until a British mint officer cracked the script in the 1830s.",
      definition:
        "- **James Prinsep** deciphered **Brahmi** and **Kharoshthi** in the 1830s. In the edicts Ashoka calls himself **Devanampiya Piyadassi**.\n" +
        "- Most edicts are in **Prakrit** in the **Brahmi** script; in the north-west they use **Kharoshthi**, and in Afghanistan **Greek** and **Aramaic**. **None is in Sanskrit**.\n" +
        "- **Major Rock Edicts** stand at **Kalsi** (Uttarakhand), **Girnar** (Gujarat), and **Dhauli** and **Jaugada** (Odisha), among others. Dhauli and Jaugada, inside Kalinga, leave out Rock Edict XIII on the war and carry two **Separate Kalinga Edicts** instead.\n" +
        "- **Minor Rock Edicts** stand at **Sasaram** (Bihar), **Maski** (Karnataka), **Bahapur** (Delhi) and **Rajula-Mandagiri** (Kurnool district, Andhra Pradesh), among others.",
      table: {
        columns: ["Site", "Where", "Edict"],
        rows: [
          {
            cells: ["Kalsi", "Dehradun district, Uttarakhand", "Major Rock Edicts"],
            noteAmber: "CDS 2025 (I): Kalsi was the correct statement.",
            pyqExampleId: "fd128c18-e8ee-4475-bcef-b32ebad8762e",
          },
          { cells: ["Girnar", "Junagadh, Gujarat", "Major Rock Edicts"] },
          { cells: ["Dhauli and Jaugada", "Odisha", "Major Rock Edicts, with the Separate Kalinga Edicts"] },
          { cells: ["Sasaram", "Bihar", "Minor Rock Edict"] },
          { cells: ["Maski", "Karnataka", "Minor Rock Edict that names Ashoka"] },
          { cells: ["Bahapur", "Delhi", "Minor Rock Edict"] },
          { cells: ["Rajula-Mandagiri", "Kurnool district, Andhra Pradesh", "Minor Rock Edict"] },
        ],
      },
      pyqExampleId: "de0dfa9d-2e32-48bc-b72c-9875579deeca",
      selfCheckExample: {
        prompt: "Why does the Dhauli inscription not describe the Kalinga war?",
        steps: [
          "Dhauli stands inside Kalinga, the land Ashoka had conquered.",
          "There Rock Edict XIII, the one about the war, was left out and two Separate Kalinga Edicts were carved instead.",
        ],
        answer: "Because Rock Edict XIII was left out in Kalinga and replaced by the Separate Kalinga Edicts.",
      },
      practiceSet: [
        { prompt: "Who deciphered the Brahmi script?", answer: "James Prinsep" },
        { prompt: "What name does Ashoka use for himself in most of his edicts?", answer: "Devanampiya Piyadassi" },
        { prompt: "In which language are most of Ashoka's inscriptions?", answer: "Prakrit" },
        { prompt: "Which Ashokan site in Bihar has a Minor Rock Edict?", answer: "Sasaram" },
      ],
      traps: [
        {
          title: "No Ashokan edict is in Sanskrit",
          body: "Ashoka wrote in Prakrit, in Brahmi script, with Kharoshthi in the north-west and Greek and Aramaic in Afghanistan. A Sanskrit edict is a false option.",
        },
        {
          title: "Jaugada is in Odisha",
          body: "Jaugada is one of the two Kalinga sites in Odisha, beside Dhauli. An option placing it in Karnataka is wrong.",
        },
      ],
    },
  ],
};
