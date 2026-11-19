import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SFD_NORTH_NOTE: SubtopicNote = {
  subtopicName: "Festivals of the Himalayas and North India",
  title: "Festivals of the Himalayas and North India",
  oneLineDefinition:
    "The Buddhist monastery festivals of Ladakh and Bhutan, the hill festivals of Himachal Pradesh and Uttarakhand, and the fairs and festivals of Uttar Pradesh.",
  whyItMatters:
    "16 questions in the bank, and the Hemis festival alone was asked four times: its religion, its place (twice) and what its masks stand for. The hill festivals of Uttarakhand and Himachal Pradesh came up six times, half of them as \"which state?\", so the region is half the answer.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsfdno-ladakh",
      name: "Ladakh and the Buddhist Himalaya",
      intuition:
        "A festival held at a monastery, with masked dances by monks, is a Tibetan Buddhist festival of the high Himalaya: Ladakh, Sikkim or Bhutan. Knowing that alone settles a religion question.",
      definition:
        "The facts:\n" +
        "- The **Hemis festival** is held at **Hemis Monastery** near Leh, **Ladakh** (a Union Territory since 2019). It marks the birth anniversary of **Guru Padmasambhava**, who took Buddhism to Tibet, and is a **Tibetan Buddhist** festival.\n" +
        "- At Hemis the monks perform **cham**, sacred **masked dances**. Hemis is the leading monastery of the **Drukpa** order in Ladakh.\n" +
        "- **Losar** is the **Tibetan New Year**. In Ladakh it comes at the **end of the harvest**, around December and January; homes set out **dough figures of the ibex** with the sun and moon.\n" +
        "- **Dosmoche** (Leh), **Matho Nagrang** (Matho) and **Yuru Kabgyat** (Lamayuru) are other monastery festivals of Ladakh.\n" +
        "- **Paro Tshechu** is a spring festival of masked dances at **Paro** in **Bhutan**.\n" +
        "- In **Sikkim**, **Losoong** is the Bhutia new year and harvest festival, and **Saga Dawa** marks the Buddha's birth, enlightenment and death.",
      table: {
        columns: ["Festival", "Where", "One fact"],
        rows: [
          { cells: ["Hemis festival", "Hemis Monastery, Ladakh", "Birth of Guru Padmasambhava; masked cham dances"] },
          { cells: ["Losar", "Ladakh (and Tibetan Buddhists elsewhere)", "Tibetan New Year; ibex figures of dough"] },
          { cells: ["Dosmoche", "Leh, Ladakh", "Monastery festival"] },
          { cells: ["Matho Nagrang", "Matho Monastery, Ladakh", "Monastery festival"] },
          { cells: ["Yuru Kabgyat", "Lamayuru Monastery, Ladakh", "Monastery festival"] },
          { cells: ["Paro Tshechu", "Paro, Bhutan", "Spring masked dances"] },
          { cells: ["Losoong", "Sikkim", "Bhutia new year and harvest"] },
          { cells: ["Saga Dawa", "Sikkim", "Buddha's birth, enlightenment and death"] },
        ],
      },
      pyqExampleId: "dc0345c7-f463-4809-8fed-5d689d409abe",
      selfCheckExample: {
        prompt: "Losar, celebrated in Ladakh after the harvest, is the new year of which calendar?",
        steps: ["Ladakh's festivals follow its Tibetan Buddhist traditions.", "Losar is the Tibetan New Year."],
        answer: "The Tibetan calendar (Tibetan New Year)",
      },
      practiceSet: [
        { prompt: "Whose birth anniversary does the Hemis festival mark?", answer: "Guru Padmasambhava" },
        { prompt: "Paro Tshechu is a festival of which country?", answer: "Bhutan" },
        { prompt: "Which animal's figure is made of dough for Losar in Ladakh?", answer: "The ibex" },
        { prompt: "At which monastery is the Yuru Kabgyat festival held?", answer: "Lamayuru" },
        { prompt: "Losoong is a festival of which state?", answer: "Sikkim" },
      ],
      traps: [
        {
          title: "Ladakh is a Union Territory",
          body: "The Hemis festival is in **Ladakh**, a **Union Territory** since 2019. Pick it even when the stem says \"state\"; Sikkim and Arunachal also have monasteries, but not Hemis.",
        },
        {
          title: "Paro Tshechu is not in India",
          body: "**Paro Tshechu** is in **Bhutan**. Its masked dances look like Hemis, but the country is different.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfdno-hills",
      name: "Himachal Pradesh and Uttarakhand",
      intuition:
        "The hill festivals follow the farming year: flowers at spring, saplings at the monsoon, thanks after the harvest. A place name in the stem (Kumaon, Kullu, Lahaul, Chakrata) points straight to the state.",
      definition:
        "The facts:\n" +
        "- **Doongri** (Dhungri) is held in May at the **Hadimba Devi** temple in Manali, **Himachal Pradesh**: a **Hindu** festival of the goddess Hadimba.\n" +
        "- **Kullu Dussehra** (Himachal Pradesh) begins on Vijayadashami, the day the rest of India ends Dussehra.\n" +
        "- **Fagli** (Kus) is held in Lahaul's **Pattan Valley** (Himachal Pradesh) while the fields are under snow. SSC's key: on its first day, **Punha**, ploughing is acted out **indoors with willow sticks**.\n" +
        "- **Phool Dei** is the spring festival of **Uttarakhand** (Kumaon and Garhwal), on the first day of **Chaitra**: children put **flowers** and rice on the doorsteps.\n" +
        "- **Harela**, in the **Kumaon** region of Uttarakhand, is a festival of **greenery**: saplings are planted in July as the monsoon begins.\n" +
        "- **Bissu Mela** is the harvest fair of the **Jaunsari** tribe around **Chakrata** (Dehradun district, Uttarakhand), in mid-April, honouring **Santoora Devi**, a form of Durga.\n" +
        "- **Nanda Devi Raj Jat** is Uttarakhand's long pilgrimage, held about once in 12 years.",
      table: {
        columns: ["Festival", "State", "One fact"],
        rows: [
          { cells: ["Doongri", "Himachal Pradesh", "Hadimba Devi temple, Manali; May"] },
          { cells: ["Kullu Dussehra", "Himachal Pradesh", "Begins on Vijayadashami"] },
          { cells: ["Fagli (Kus)", "Himachal Pradesh", "Pattan Valley, Lahaul; ploughing acted out indoors"] },
          { cells: ["Phool Dei", "Uttarakhand", "First day of Chaitra; children put flowers on doorsteps"] },
          { cells: ["Harela", "Uttarakhand", "Kumaon; greenery, saplings in July"] },
          { cells: ["Bissu Mela", "Uttarakhand", "Jaunsari harvest fair at Chakrata; Santoora Devi"] },
          { cells: ["Nanda Devi Raj Jat", "Uttarakhand", "Pilgrimage about once in 12 years"] },
        ],
      },
      pyqExampleId: "a41c4e85-a31b-431b-9855-32ef65c1ed19",
      selfCheckExample: {
        prompt: "Harela, a festival of planting saplings, belongs to which state?",
        steps: ["Harela is celebrated in the Kumaon region.", "Kumaon is in Uttarakhand."],
        answer: "Uttarakhand",
      },
      practiceSet: [
        { prompt: "At which temple in Manali is the Doongri festival held?", answer: "The Hadimba Devi temple" },
        { prompt: "Which tribe holds the Bissu Mela at Chakrata?", answer: "The Jaunsari" },
        { prompt: "Fagli is held in which valley of Lahaul?", answer: "The Pattan Valley" },
        { prompt: "On the first day of which Hindu month is Phool Dei celebrated?", answer: "Chaitra" },
        { prompt: "Kullu Dussehra is held in which state?", answer: "Himachal Pradesh" },
      ],
      traps: [
        {
          title: "Kumaon means Uttarakhand",
          body: "**Kumaon** and **Garhwal** are the two regions of **Uttarakhand**. A festival tied to either one (Phool Dei, Harela) is not from Himachal Pradesh.",
        },
        {
          title: "Doongri is a Hindu festival",
          body: "Though Himachal has Buddhist areas, **Doongri** honours the goddess **Hadimba** at Manali: it is a **Hindu** festival.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfdno-plains",
      name: "Uttar Pradesh",
      intuition:
        "Uttar Pradesh's festivals are tied to famous places: Braj for Holi, Mirzapur for monsoon songs, Prayagraj for the Kumbh. Learn the place and the festival together.",
      definition:
        "The facts:\n" +
        "- **Lathmar Holi** is played at **Barsana** and **Nandgaon** in the **Braj** region (Mathura district): women playfully beat men with sticks (lathis).\n" +
        "- **Kajari**, the monsoon folk song of eastern Uttar Pradesh, is celebrated above all at **Mirzapur**, where the **Kajari Mahotsav** is held.\n" +
        "- The **Sardhana Christian fair** is held at Sardhana in **Meerut** district, home of the Basilica of Our Lady of Graces built by **Begum Samru**.\n" +
        "- The **Kumbh Mela** is held at **Prayagraj**, Haridwar, Ujjain and Nashik; UNESCO listed it as intangible heritage in **2017**.\n" +
        "- **Dev Deepawali** lights the ghats of **Varanasi** on Kartik Purnima.",
      table: {
        columns: ["Festival", "Place", "One fact"],
        rows: [
          { cells: ["Lathmar Holi", "Barsana and Nandgaon, Mathura", "Women beat men with sticks in play"] },
          { cells: ["Kajari Mahotsav", "Mirzapur", "Monsoon folk songs"] },
          { cells: ["Sardhana Christian fair", "Sardhana, Meerut district", "Basilica built by Begum Samru"] },
          { cells: ["Kumbh Mela", "Prayagraj (also Haridwar, Ujjain, Nashik)", "UNESCO intangible heritage, 2017"] },
          { cells: ["Dev Deepawali", "Varanasi", "Lamps on the ghats, Kartik Purnima"] },
        ],
      },
      pyqExampleId: "363dc4bb-cf70-42d8-afe9-9941a3ee3695",
      selfCheckExample: {
        prompt: "In which district of Uttar Pradesh is the Sardhana Christian fair held?",
        steps: ["Sardhana is a town in western Uttar Pradesh.", "It lies in Meerut district."],
        answer: "Meerut",
      },
      practiceSet: [
        { prompt: "In which district of Uttar Pradesh is the Kajari Mahotsav chiefly held?", answer: "Mirzapur" },
        { prompt: "Which city lights its ghats for Dev Deepawali?", answer: "Varanasi" },
        { prompt: "Who built the basilica at Sardhana?", answer: "Begum Samru" },
        { prompt: "In which year did UNESCO list the Kumbh Mela as intangible heritage?", answer: "2017" },
      ],
      traps: [
        {
          title: "Kajari's home is Mirzapur",
          body: "The **Kajari Mahotsav** belongs to **Mirzapur** in eastern Uttar Pradesh. Braj towns like Barsana belong to **Holi**, not to Kajari.",
        },
      ],
    },
  ],
};
