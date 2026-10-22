import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_ME_KINGDOMS_NOTE: SubtopicNote = {
  subtopicName: "Early Medieval Kingdoms",
  title: "Early Medieval Kingdoms: Cholas to Kakatiyas",
  oneLineDefinition:
    "The kingdoms of about 700 to 1300: Chola villages and temples, the Pratiharas, Kashmir, Odisha and the Kakatiyas, and the land grants, guilds and learning of the age.",
  whyItMatters:
    "Thirteen CDS questions, ten of them HARD and seven since 2023. Nearly all come from inscriptions and old texts: what a Chola sabha asked of its members, which queens ruled Odisha, what Manigramam was. Learn each fact with its dynasty.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshime-cholas",
      name: "The Cholas: sabhas, temples and land",
      intuition:
        "The Cholas ruled the Tamil country from about 850 to 1279. They carved long records on temple walls, so we know how their villages were run. " +
        "A village given to Brahmanas had an assembly called the sabha, and an inscription at Uttaramerur lists who could sit in it.",
      definition:
        "- The **Uttaramerur** inscriptions (reign of Parantaka I) set rules for members of the **sabha**: they must own **land from which revenue is collected**, have **their own house**, and be **between 35 and 70 years old**. Names were written on palm leaves and drawn by lot.\n" +
        "- Chola records sort land into **nancai** (wet, irrigated fields), **puncai** (dry fields) and **tottakal** (garden land).\n" +
        "- **Rajaraja I** (985 to 1014) built the Brihadishvara temple at Thanjavur and let the **Shailendra** king of **Srivijaya** build a Buddhist monastery, the **Chudamani Vihara**, at **Nagapattinam**. A Chola village was granted for its upkeep.\n" +
        "- **Rajendra I** (1014 to 1044) built a new capital, **Gangaikonda Cholapuram**.\n" +
        "- Thanjavur, Gangaikonda Cholapuram and Chidambaram are **Shiva** temples. **Srirangam** is the great **Vishnu** temple (Vishnu as Ranganatha).",
      table: {
        columns: ["Time", "Record or building", "What to remember"],
        rows: [
          {
            cells: ["Parantaka I (907 to 955)", "Uttaramerur inscriptions", "Sabha members own land and a house, aged 35 to 70"],
            noteAmber: "CDS 2026 (II): owning a house and land is a rule; an age limit of 30 to 60 is not.",
            pyqExampleId: "0a480d65-f5bd-40fe-86a1-b65eb8e90757",
          },
          {
            cells: ["Chola period", "Land classes in inscriptions", "Nancai wet land, puncai dry land, tottakal garden land"],
            pyqExampleId: "bc415618-5557-4ebb-8e8c-3fd515f7c770",
          },
          { cells: ["Rajaraja I (985 to 1014)", "Brihadishvara temple, Thanjavur", "A Shiva temple"] },
          {
            cells: ["Rajaraja I", "Chudamani Vihara, Nagapattinam", "Built by the Shailendra king of Srivijaya with Chola support"],
            noteAmber: "CDS 2024 (I): the Chola king who encouraged it was Rajaraja I.",
            pyqExampleId: "073db387-fff2-450d-b045-031fe7147913",
          },
          { cells: ["Rajendra I (1014 to 1044)", "Gangaikonda Cholapuram", "His new capital, with a Shiva temple"] },
          {
            cells: ["Tamil country", "Srirangam temple", "Vishnu as Ranganatha: a Vaishnava temple"],
            noteAmber: "CDS 2021 (II): Srirangam is the Vaishnava temple in a list of Shiva temples.",
            pyqExampleId: "6e55ba86-2efd-49ad-a879-5c9782137a89",
          },
        ],
      },
      pyqExampleId: "0a480d65-f5bd-40fe-86a1-b65eb8e90757",
      selfCheckExample: {
        prompt: "A Chola inscription calls one field puncai and another nancai. Which of the two was irrigated?",
        steps: ["Nancai is the Chola word for wet land, watered by tanks or canals.", "Puncai is dry land that depends on rain."],
        answer: "The nancai field",
      },
      practiceSet: [
        { prompt: "Which Chola king let the Shailendra ruler of Srivijaya build a monastery at Nagapattinam?", answer: "Rajaraja I" },
        { prompt: "To which god is the Srirangam temple dedicated?", answer: "Vishnu, as Ranganatha" },
        { prompt: "Which Chola king built Gangaikonda Cholapuram?", answer: "Rajendra I" },
        { prompt: "In Chola land records, what kind of land is tottakal?", answer: "Garden land" },
      ],
      traps: [
        {
          title: "Srirangam is the one Vishnu temple",
          body: "Thanjavur, Gangaikonda Cholapuram and Chidambaram are all Shiva temples. In a list of famous Tamil temples, **Srirangam** is the Vaishnava one.",
        },
        {
          title: "Rajaraja began the vihara, Rajendra renewed it",
          body: "The Chudamani Vihara at Nagapattinam was built in the reign of **Rajaraja I**. Rajendra I and Kulottunga I only confirmed the grant later, so an option naming them is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshime-regional",
      name: "Kingdoms of the north, Kashmir, Odisha and the Deccan",
      intuition:
        "While the Cholas ruled the south, many other kingdoms rose and fell. CDS asks one striking fact about each: a queen, a canal, a title, a praise poem. " +
        "Tie each fact to its dynasty and its region, and the options sort themselves.",
      definition:
        "- **Bhauma-Karas** of **Odisha** (8th to 10th century): when there was no male heir, queens ruled in their own right, among them **Prithivimahadevi, Dharmamahadevi, Dandimahadevi and Valkulamahadevi**.\n" +
        "- **Gurjara-Pratiharas** of Kannauj: the **Gwalior prashasti** praises **Mihira Bhoja** (9th century). It was composed by the poet **Baladitya**.\n" +
        "- **Utpala dynasty** of **Kashmir**: founded by **Avantivarman** (9th century), who worked for his subjects' welfare. His engineer-minister **Suyya** controlled the **Vitasta** (Jhelum) and drained flooded land, so grain output rose and prices fell. **Kalhana's Rajatarangini** records this.\n" +
        "- **Kakatiyas** of **Warangal** (12th to 14th century): their rulers carried titles such as **Rayagajakesari**, a lion to the elephants that are rival kings.",
      table: {
        columns: ["Dynasty", "Region and time", "Fact asked"],
        rows: [
          {
            cells: ["Bhauma-Karas", "Odisha, 8th to 10th century", "Queens such as Prithivimahadevi and Dandimahadevi ruled when there was no male heir"],
            noteAmber: "CDS 2026 (II): the four queens belonged to the Bhauma-Kara dynasty.",
            pyqExampleId: "5556f5a8-f3f2-4219-8d10-df3bef350560",
          },
          {
            cells: ["Gurjara-Pratiharas", "Kannauj, 9th century", "Gwalior prashasti of Mihira Bhoja, by the poet Baladitya"],
            pyqExampleId: "bb3a6a21-f727-419f-9c26-95d35badbaec",
          },
          {
            cells: ["Utpalas", "Kashmir, 9th century", "Founder Avantivarman; minister Suyya's works on the Vitasta"],
            noteAmber: "CDS 2024 (II): both statements about Avantivarman and Suyya were correct.",
            pyqExampleId: "ba6169d6-afc5-4d1e-b2e6-f9ce02c7a81f",
          },
          {
            cells: ["Kakatiyas", "Warangal, 12th to 14th century", "Titles such as Rayagajakesari"],
            pyqExampleId: "f5b63d08-ab07-436d-bd36-71f5c1ecb970",
          },
        ],
      },
      pyqExampleId: "5556f5a8-f3f2-4219-8d10-df3bef350560",
      selfCheckExample: {
        prompt: "Why did grain become cheap in Kashmir in the reign of Avantivarman?",
        steps: [
          "His minister Suyya controlled the course of the Vitasta and drained land that used to flood.",
          "More land could be farmed, so much more grain was grown.",
        ],
        answer: "Suyya's river works raised grain output, so prices fell",
      },
      practiceSet: [
        { prompt: "To which dynasty of Kashmir did Avantivarman belong?", answer: "The Utpala dynasty (he founded it)" },
        { prompt: "Which inscription praises the Pratihara king Mihira Bhoja?", answer: "The Gwalior prashasti" },
        { prompt: "What was the capital of the Kakatiyas?", answer: "Warangal" },
        { prompt: "Which chronicle records Suyya's work in Kashmir?", answer: "Kalhana's Rajatarangini" },
      ],
      traps: [
        {
          title: "Suyya was a minister, not a king",
          body: "The river works of 9th century Kashmir are credited to **Suyya**, the engineer-minister. The king was **Avantivarman**, founder of the Utpala dynasty.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshime-grants",
      name: "Land grants, guilds and learning",
      intuition:
        "In these centuries kings gave land to Brahmanas, merchants formed powerful guilds, and scholars wrote digests of older texts. " +
        "CDS asks what each word meant, so learn them as a small dictionary.",
      definition:
        "- A **brahmadeya** was land granted to Brahmanas. By creating one, the state **gave up revenue** it collected or could have collected. A grant could be **a small plot or several villages**.\n" +
        "- **Manigramam** and **Nanadesi** were **guilds of merchants** in south India, trading as far as Southeast Asia.\n" +
        "- Sanskrit texts and inscriptions of the 8th to 14th centuries named Muslims by where they came from: **Turushka** (Turks), **Tajika** (Tajiks) and **Parashika** (Persians). **Kardamaka** is an older Shaka ruling family, not such a term.\n" +
        "- **Lakshmidhara** (12th century), minister of the Gahadavala king Govindachandra of Kannauj, compiled the **Krityakalpataru**, the first great **nibandha** (digest) of epic and Puranic texts.\n" +
        "- **Apabhramsha** was a literary language that had taken shape by about the **6th century**, from regional speech mixed with the Prakrits and Sanskrit.",
      table: {
        columns: ["Term or work", "Meaning"],
        rows: [
          {
            cells: ["Apabhramsha", "Literary language formed by about the 6th century from regional speech, Prakrit and Sanskrit"],
            pyqExampleId: "4e0b0478-c530-4737-b648-d48cf65a207c",
          },
          {
            cells: ["Brahmadeya", "Land granted to Brahmanas; the state gave up its revenue from it"],
            pyqExampleId: "dc722faa-0934-41da-8392-7bb5eee07fbc",
          },
          {
            cells: ["Manigramam, Nanadesi", "Merchant guilds of south India"],
            noteAmber: "CDS 2022 (II): these were guilds of Indian merchants.",
            pyqExampleId: "b5dc67cb-6977-49cc-b0d5-744c4864a3e1",
          },
          {
            cells: ["Turushka, Tajika, Parashika", "Sanskrit names for Muslims: Turks, Tajiks, Persians"],
            noteAmber: "CDS 2022 (II): Kardamaka was the odd one out.",
            pyqExampleId: "7097c108-f22f-4dad-8add-5c99b467f607",
          },
          {
            cells: ["Krityakalpataru (12th century)", "Lakshmidhara's digest (nibandha) of epic and Puranic texts"],
            pyqExampleId: "a6373edc-e0a5-46d8-9d17-e24f0ec16b52",
          },
        ],
      },
      pyqExampleId: "b5dc67cb-6977-49cc-b0d5-744c4864a3e1",
      selfCheckExample: {
        prompt: "A king turns three villages into a brahmadeya. What does his treasury lose?",
        steps: ["A brahmadeya hands the right to the land's revenue to the Brahmana donees.", "So the state no longer collects that revenue."],
        answer: "The revenue from those three villages",
      },
      practiceSet: [
        { prompt: "Who compiled the Krityakalpataru?", answer: "Lakshmidhara, minister of the Gahadavala king Govindachandra" },
        { prompt: "Which Sanskrit word was used for the Turks?", answer: "Turushka" },
        { prompt: "By about which century had Apabhramsha taken a recognisable literary form?", answer: "The 6th century" },
        { prompt: "How large could a brahmadeya grant be?", answer: "Anything from a small plot to several villages" },
      ],
      traps: [
        {
          title: "Kardamaka is a dynasty, not a name for Muslims",
          body: "Turushka, Tajika and Parashika all named Muslims by their homeland. **Kardamaka** was a Shaka ruling family of a much earlier time.",
        },
        {
          title: "Manigramam was a guild, not a village",
          body: "The word looks like 'grama', a village, but **Manigramam** and **Nanadesi** were **merchant guilds**. They were not groups of villages or village councils.",
        },
      ],
    },
  ],
};
