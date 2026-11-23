import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SAC_HERITAGE_NOTE: SubtopicNote = {
  subtopicName: "Art, Architecture and Heritage",
  title: "Art, Architecture and Heritage",
  oneLineDefinition:
    "The World Heritage sites SSC has asked, famous temples, monasteries and churches, the six seasons of the Indian calendar and the martial arts of India.",
  whyItMatters:
    "Ten questions in the bank, six of them from the 2025 shifts. They range wide (a mountain railway, Mumbai's buildings, a fort's water bodies, the six seasons, a flexible sword), so learn each as one firm fact with its place.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsachr-sites",
      name: "World Heritage sites SSC has asked",
      intuition:
        "A World Heritage question asks a year, a place or one feature of the site. Each site below carries one feature SSC has used.",
      definition:
        "- **Mountain Railways of India:** the Darjeeling Himalayan Railway (1999), the **Nilgiri Mountain Railway** (2005) and the Kalka-Shimla Railway (2008). The Nilgiri line, Mettupalayam to Ooty, is India's only **rack railway**: a toothed rail helps it up the steep part.\n" +
        "- **Victorian Gothic and Art Deco Ensembles of Mumbai** (2018): the Victorian Gothic buildings are 19th century; the **Art Deco** buildings came in the **20th century** (1920s and 1930s). The **Oval Maidan** lies between the two rows.\n" +
        "- **Hill Forts of Rajasthan** (2013): Chittorgarh, Kumbhalgarh, Ranthambore, Gagron, Amber and Jaisalmer. **Chittorgarh** once had **84** water bodies; about **22** survive.",
      table: {
        columns: ["Site", "Year listed", "Remember for"],
        rows: [
          { cells: ["Nilgiri Mountain Railway", "2005", "India's only rack railway"], pyqExampleId: "7817e277-885e-40ea-b2ff-e344bb703c01" },
          { cells: ["Darjeeling Himalayan Railway", "1999", "The first of the Mountain Railways"] },
          { cells: ["Kalka-Shimla Railway", "2008", "The third of the Mountain Railways"] },
          { cells: ["Victorian Gothic and Art Deco Ensembles, Mumbai", "2018", "Oval Maidan between the two styles"] },
          { cells: ["Hill Forts of Rajasthan", "2013", "Chittorgarh: 84 water bodies once, about 22 now"], pyqExampleId: "750d8112-7efe-4615-a0e4-71a98517625e" },
        ],
      },
      pyqExampleId: "68fc7bbd-13f4-4d93-85eb-28971fe328d9",
      selfCheckExample: {
        prompt: "Which railway is India's only rack railway?",
        steps: ["Of the three Mountain Railways, only one uses a toothed rail on its steep section.", "That is the Nilgiri Mountain Railway, listed in 2005."],
        answer: "The Nilgiri Mountain Railway",
      },
      practiceSet: [
        { prompt: "In which year were the Hill Forts of Rajasthan made a World Heritage Site?", answer: "2013" },
        { prompt: "In which year was the Kalka-Shimla Railway added to the Mountain Railways of India?", answer: "2008" },
        { prompt: "In which century were Mumbai's Art Deco buildings built?", answer: "The 20th century" },
        { prompt: "About how many water bodies did Chittorgarh Fort once have?", answer: "84" },
      ],
      traps: [
        {
          title: "Art Deco is 20th century",
          body: "Mumbai's Victorian Gothic buildings are 19th century, but its Art Deco buildings came in the 1920s and 1930s. A statement dating Art Deco to the 19th century is false.",
        },
        {
          title: "84 is the old count, 22 the surviving one",
          body: "Chittorgarh had about 84 water bodies; about 22 survive. Asked for the original number, 22 is the trap.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsachr-worship",
      name: "Temples, monasteries and churches",
      intuition:
        "A place of worship question asks who is worshipped there, which is the largest, or what its building looks like. Fix one fact for each place.",
      definition:
        "- **Jagannath Temple, Puri** (Odisha): its wooden images are **Jagannath**, his elder brother **Balabhadra** and his sister **Subhadra**, drawn through the town in the yearly **Rath Yatra**.\n" +
        "- **Rumtek Monastery**, near Gangtok: the **largest** monastery in Sikkim, seat of the Karmapa of the **Karma Kagyu** school, known for its murals and mask dances. **Pemayangtse** and **Tashiding** are among the oldest; **Enchey** is a smaller one in Gangtok.\n" +
        "- **Notre Dame des Anges**, Puducherry: a church built in **1855** in the Greco-Roman style, with an open, light interior on piers.\n" +
        "- A church never has a shikhara with an amalaka (a Nagara temple tower) or a minaret (a mosque tower); use that to strike options.",
      table: {
        columns: ["Place", "Where", "Remember for"],
        rows: [
          { cells: ["Jagannath Temple", "Puri, Odisha", "Jagannath, Balabhadra, Subhadra; Rath Yatra"], pyqExampleId: "426d2541-7b60-4da0-b4e7-d0210b019e95" },
          { cells: ["Rumtek Monastery", "Near Gangtok, Sikkim", "Largest in Sikkim; Karma Kagyu"] },
          { cells: ["Pemayangtse Monastery", "Sikkim", "One of the oldest in Sikkim"] },
          { cells: ["Notre Dame des Anges", "Puducherry", "Greco-Roman church of 1855"], pyqExampleId: "faaabb79-cb56-440c-a554-b2b690c42f3b" },
        ],
      },
      pyqExampleId: "a764e90a-60a5-4184-983e-7d8373e70cdb",
      selfCheckExample: {
        prompt: "Whose images are worshipped in the Jagannath Temple at Puri?",
        steps: ["The temple's three wooden images are a family.", "They are Jagannath, his brother Balabhadra and his sister Subhadra."],
        answer: "Jagannath, Balabhadra and Subhadra",
      },
      practiceSet: [
        { prompt: "In which Indian union territory is the church of Notre Dame des Anges?", answer: "Puducherry" },
        { prompt: "Which school of Buddhism is Rumtek Monastery the seat of?", answer: "The Karma Kagyu school" },
        { prompt: "Balabhadra is worshipped in which temple of Odisha?", answer: "The Jagannath Temple, Puri" },
        { prompt: "In which year was Notre Dame des Anges built?", answer: "1855" },
      ],
      traps: [
        {
          title: "Largest is not oldest",
          body: "Rumtek is the largest monastery in Sikkim. Pemayangtse and Tashiding are among the oldest. Read whether the stem asks largest or oldest.",
        },
        {
          title: "Temple features do not belong to a church",
          body: "A shikhara with an amalaka is a Hindu temple tower and a minaret belongs to a mosque. In a question about a church, strike both first.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsachr-seasons",
      name: "The six seasons of the Indian calendar",
      intuition:
        "The Indian calendar has six seasons (ritus), each two months long, in a fixed order from spring. Learn the order once and any season's months follow.",
      definition:
        "The six ritus start with spring, and each takes two months in order:\n" +
        "- **Vasanta** (spring): Chaitra and Vaishakha.\n" +
        "- **Grishma** (summer): Jyeshtha and Ashadha.\n" +
        "- **Varsha** (rains): Shravana and Bhadrapada.\n" +
        "- **Sharad** (autumn): Ashvina and Kartika.\n" +
        "- **Hemanta** (pre-winter): Margashirsha and Pausha.\n" +
        "- **Shishira** (winter): Magha and Phalguna.",
      table: {
        columns: ["Season", "Months"],
        rows: [
          { cells: ["Vasanta (spring)", "Chaitra, Vaishakha"], pyqExampleId: "996ce163-1212-4576-8ea2-34ee8142f44c" },
          { cells: ["Grishma (summer)", "Jyeshtha, Ashadha"] },
          { cells: ["Varsha (rains)", "Shravana, Bhadrapada"] },
          { cells: ["Sharad (autumn)", "Ashvina, Kartika"] },
          { cells: ["Hemanta (pre-winter)", "Margashirsha, Pausha"] },
          { cells: ["Shishira (winter)", "Magha, Phalguna"] },
        ],
      },
      pyqExampleId: "695b2789-591b-4de1-ada2-66ad5c22b0c5",
      selfCheckExample: {
        prompt: "In which months does the Varsha season fall?",
        steps: ["Varsha is the third season: Vasanta and Grishma take the first four months.", "So Varsha is the fifth and sixth months, Shravana and Bhadrapada."],
        answer: "Shravana and Bhadrapada",
      },
      practiceSet: [
        { prompt: "Which season falls in Magha and Phalguna?", answer: "Shishira" },
        { prompt: "In which months does Grishma fall?", answer: "Jyeshtha and Ashadha" },
        { prompt: "Which season falls in Ashvina and Kartika?", answer: "Sharad" },
        { prompt: "How many seasons does the Indian calendar have?", answer: "Six" },
      ],
      traps: [
        {
          title: "Hemanta is pre-winter, not spring",
          body: "Hemanta takes Margashirsha and Pausha. Spring (Vasanta) takes Chaitra and Vaishakha, the first two months of the year.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsachr-martial",
      name: "Martial arts of India",
      intuition:
        "Each Indian martial art has a state and a weapon. SSC names the weapon and asks the art, or names the art and asks the state.",
      definition:
        "- **Kalaripayattu**, Kerala: its weapons include the **urumi**, a long, flexible, whip-like sword.\n" +
        "- **Silambam**, Tamil Nadu: fighting with a staff.\n" +
        "- **Gatka**, Punjab: the Sikh martial art with sticks and swords.\n" +
        "- **Thang-Ta**, Manipur: the sword (thang) and the spear (ta).\n" +
        "- **Thoda**, Himachal Pradesh: archery.",
      table: {
        columns: ["Martial art", "State", "Weapon"],
        rows: [
          { cells: ["Kalaripayattu", "Kerala", "Urumi, the flexible sword"] },
          { cells: ["Silambam", "Tamil Nadu", "Staff"] },
          { cells: ["Gatka", "Punjab", "Sticks and swords"] },
          { cells: ["Thang-Ta", "Manipur", "Sword and spear"] },
          { cells: ["Thoda", "Himachal Pradesh", "Bow and arrow"] },
        ],
      },
      pyqExampleId: "2d1e0e34-fa8a-41dc-ba9f-42320afe7ab5",
      selfCheckExample: {
        prompt: "Silambam is a martial art of which state?",
        steps: ["Silambam is fought with a staff.", "It belongs to Tamil Nadu."],
        answer: "Tamil Nadu",
      },
      practiceSet: [
        { prompt: "Gatka is the martial art of which community?", answer: "The Sikhs (Punjab)" },
        { prompt: "Which Manipuri martial art uses the sword and the spear?", answer: "Thang-Ta" },
        { prompt: "With which weapon is Silambam fought?", answer: "A staff" },
        { prompt: "Kalaripayattu belongs to which state?", answer: "Kerala" },
      ],
      traps: [
        {
          title: "Urumi is Kerala's",
          body: "The urumi belongs to Kalaripayattu of Kerala. Silambam (Tamil Nadu) uses a staff, so it is the trap for a south Indian sword.",
        },
      ],
    },
  ],
};
