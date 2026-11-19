import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SAC_MUSIC_NOTE: SubtopicNote = {
  subtopicName: "Hindustani and Carnatic Music",
  title: "Hindustani and Carnatic Music",
  oneLineDefinition:
    "The vocal gharanas and their singers, the pioneers and composers of both traditions, the forms of a concert, and the counting rules of notes, ragas and talas.",
  whyItMatters:
    "36 questions in the bank, 19 of them from the 2025 shifts. Those papers asked theory as often as names: where the khali falls in Teentaal, how many notes a Shadav raga has, which form fills a Carnatic concert. So this page teaches the gharanas and singers first, then the forms, then the numbers.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsacmu-gharanas",
      name: "Vocal gharanas and their singers",
      intuition:
        "A gharana is a family school of singing, passed from teacher to pupil. SSC names a singer and asks the gharana, or names a founder and asks what he founded.",
      definition:
        "- **Gwalior:** the **oldest khayal gharana**, founded by the brothers **Hassu Khan** and **Haddu Khan** (with Nathan Pir Bakhsh). Vishnu Digambar Paluskar trained in it.\n" +
        "- **Agra:** grew out of the **dhrupad-dhamar** tradition and still opens a khayal with a dhrupad-style nom-tom alap. Faiyaz Khan was its great singer.\n" +
        "- **Kirana:** founded by **Abdul Karim Khan**. Its singers: **Sawai Gandharva**, **Bhimsen Joshi**, **Gangubai Hangal**, **Prabha Atre**.\n" +
        "- **Patiala:** founded by Ali Baksh Khan and Fateh Ali Khan. **Bade Ghulam Ali Khan**, called the **Tansen of the 20th century**, was its star.\n" +
        "- **Mewati:** the gharana of **Pandit Jasraj**.\n" +
        "- **Jaipur-Atrauli:** founded by **Alladiya Khan**; known for intricate rhythm. Kishori Amonkar sang in it.\n" +
        "- **Banaras:** the home of thumri; **Girija Devi**, the \"Queen of Thumri\", was born in Varanasi, Uttar Pradesh.",
      table: {
        columns: ["Gharana", "Founder or mark", "Singers to remember"],
        rows: [
          { cells: ["Gwalior", "Hassu Khan and Haddu Khan; oldest khayal gharana", "Vishnu Digambar Paluskar"], pyqExampleId: "359273ab-6460-4565-b3fd-de6002f1676b" },
          { cells: ["Agra", "Shaped by dhrupad", "Faiyaz Khan"], pyqExampleId: "9b4e8d4d-59c4-4a7a-888b-1367a8c4d23a" },
          { cells: ["Kirana", "Abdul Karim Khan", "Sawai Gandharva, Bhimsen Joshi, Gangubai Hangal, Prabha Atre"], pyqExampleId: "b565a062-3359-486d-8d66-2fc246fefdad" },
          { cells: ["Patiala", "Ali Baksh Khan and Fateh Ali Khan", "Bade Ghulam Ali Khan"], pyqExampleId: "03e9cb06-0d7f-4cd6-bce0-513ac4eaf55e" },
          { cells: ["Mewati", "Known through its great singer", "Pandit Jasraj"] },
          { cells: ["Jaipur-Atrauli", "Alladiya Khan", "Kishori Amonkar"] },
          { cells: ["Banaras", "Home of thumri", "Girija Devi"] },
        ],
      },
      pyqExampleId: "6945b8c1-b015-49e2-8931-fb16dc8b6513",
      selfCheckExample: {
        prompt: "To which gharana did Bhimsen Joshi belong?",
        steps: ["Bhimsen Joshi learnt from Sawai Gandharva.", "Sawai Gandharva was a pupil of Abdul Karim Khan, founder of the Kirana gharana."],
        answer: "The Kirana gharana",
      },
      practiceSet: [
        { prompt: "Who is called the Tansen of the 20th century?", answer: "Ustad Bade Ghulam Ali Khan" },
        { prompt: "Which is the oldest khayal gharana?", answer: "The Gwalior gharana" },
        { prompt: "Which gharana did Kishori Amonkar sing in?", answer: "The Jaipur-Atrauli gharana" },
        { prompt: "Girija Devi was called the queen of which form?", answer: "Thumri" },
        { prompt: "Which gharana was most directly shaped by dhrupad?", answer: "The Agra gharana" },
      ],
      traps: [
        {
          title: "Gangubai, Bhimsen and Prabha Atre are all Kirana",
          body: "Gangubai Hangal, Bhimsen Joshi and Prabha Atre were all Kirana singers. Gwalior, Agra and Banaras are the usual wrong options.",
        },
        {
          title: "Girija Devi sang thumri",
          body: "Girija Devi of the Banaras gharana was the queen of thumri, a light classical form. She was born in Varanasi, Uttar Pradesh.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsacmu-musicians",
      name: "Singers, composers and pioneers",
      intuition:
        "Many questions only ask which tradition a person belongs to: Hindustani (the north) or Carnatic (the south). Others ask what a pioneer founded or who his teacher was.",
      definition:
        "**Hindustani:**\n" +
        "- **Vishnu Digambar Paluskar** opened the first **Gandharva Mahavidyalaya** at **Lahore** in **1901**; **Omkarnath Thakur** was his pupil.\n" +
        "- **Vinay Chandra Maudgalya** founded the Gandharva Mahavidyalaya in **New Delhi** in **1939**.\n" +
        "- **Vishnu Narayan Bhatkhande**, a musicologist, set out the **thaat** system of grouping ragas.\n" +
        "- **Kumar Gandharva** was born **Shivaputra Siddharamayya Komkalimath**; the title was given to him as a child prodigy.\n" +
        "- Pandit Jasraj and Bhimsen Joshi are Hindustani vocalists.\n\n" +
        "**Carnatic:**\n" +
        "- **M. S. Subbulakshmi**, vocalist, the first musician to receive the **Bharat Ratna** (1998).\n" +
        "- **Papanasam Sivan**, composer of many Tamil kritis, called the **Tamil Thyagaraja**.\n" +
        "- **M. Balamuralikrishna** devised new talas such as Trimukhi, Panchamukhi, Saptamukhi and Navamukhi.\n" +
        "- Aruna Sairam, T. M. Krishna and Gayathri Girish are Carnatic vocalists; Kalyani Varadarajan was a Carnatic composer.\n\n" +
        "**Film and folk:** **Manna Dey** sang in both the Bengali and the Marathi versions of **Amar Bhupali** (1952). **Sulochana Chavan** was the queen of **Lavani**.",
      table: {
        columns: ["Name", "Tradition", "Remember for"],
        rows: [
          { cells: ["Vishnu Digambar Paluskar", "Hindustani", "First Gandharva Mahavidyalaya, Lahore, 1901; taught Omkarnath Thakur"], pyqExampleId: "f819c595-a75b-4b5b-918f-ca816fc12170" },
          { cells: ["Vinay Chandra Maudgalya", "Hindustani", "Gandharva Mahavidyalaya, New Delhi, 1939"], pyqExampleId: "bc300047-fd72-4e64-aa64-19df8ae198e0" },
          { cells: ["Vishnu Narayan Bhatkhande", "Hindustani", "The thaat system"], pyqExampleId: "fdd5fdf8-e698-4892-8284-6077b8cc4fd0" },
          { cells: ["Kumar Gandharva", "Hindustani", "Born Shivaputra Siddharamayya Komkalimath"], pyqExampleId: "5706c794-d6f2-4c9f-b350-98b5ca025133" },
          { cells: ["Pandit Jasraj, Bhimsen Joshi", "Hindustani", "Vocalists"], pyqExampleId: "2e845471-72cd-4c8a-abe6-16da7b39fda2" },
          { cells: ["M. S. Subbulakshmi", "Carnatic", "First musician with the Bharat Ratna, 1998"], pyqExampleId: "df866df9-3657-4ffd-bff0-c2a83bded0c1" },
          { cells: ["Papanasam Sivan", "Carnatic", "Composer; the Tamil Thyagaraja"] },
          { cells: ["M. Balamuralikrishna", "Carnatic", "New talas such as Trimukhi"], pyqExampleId: "e86687c6-2213-4d64-b1a1-6fce30decade" },
          { cells: ["Aruna Sairam, T. M. Krishna", "Carnatic", "Vocalists"], pyqExampleId: "4f8675e0-20b7-4679-a229-04198c2ca956" },
          { cells: ["Manna Dey", "Film", "Amar Bhupali, 1952, in Bengali and Marathi"], pyqExampleId: "b48e8296-0a96-43c8-9bbe-80812acee682" },
          { cells: ["Sulochana Chavan", "Marathi folk", "Queen of Lavani"], pyqExampleId: "7fb68805-5113-4d75-91b7-7fd2352fd4ed" },
        ],
      },
      pyqExampleId: "58405b80-5b2e-4a88-a0fd-4e8c6d94a80c",
      selfCheckExample: {
        prompt: "Was M. S. Subbulakshmi a Hindustani or a Carnatic singer?",
        steps: ["She sang the music of south India.", "South Indian classical music is Carnatic."],
        answer: "Carnatic",
      },
      practiceSet: [
        { prompt: "Who set out the thaat system of Hindustani music?", answer: "Vishnu Narayan Bhatkhande" },
        { prompt: "Omkarnath Thakur was the pupil of which musician?", answer: "Vishnu Digambar Paluskar" },
        { prompt: "Who is called the queen of Lavani?", answer: "Sulochana Chavan" },
        { prompt: "In which city is the Gandharva Mahavidyalaya founded by Vinay Chandra Maudgalya?", answer: "New Delhi" },
        { prompt: "Which Carnatic singer devised the Trimukhi tala?", answer: "M. Balamuralikrishna" },
      ],
      traps: [
        {
          title: "Bhatkhande is Hindustani",
          body: "In a \"who is NOT Carnatic\" question, Vishnu Narayan Bhatkhande is the answer: he was a Hindustani musicologist. M. S. Subbulakshmi and Kalyani Varadarajan are Carnatic.",
        },
        {
          title: "Two Gandharva Mahavidyalayas",
          body: "Paluskar's first one was at Lahore in 1901. Maudgalya's, founded in 1939, is in New Delhi. Pune, Mumbai and Kolkata are wrong for both.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsacmu-forms",
      name: "Forms and compositions",
      intuition:
        "A form question gives a description (grave, light, fixed, improvised, the opening piece) and asks the name. Keep the Hindustani and Carnatic names apart; SSC mixes them in the options.",
      definition:
        "**Hindustani forms:**\n" +
        "- **Dhrupad:** the oldest surviving vocal form; grave in mood, strong on rhythm, sung with the pakhawaj.\n" +
        "- **Khayal:** more ornate and improvised. **Thumri:** light and romantic. **Tappa:** quick and playful.\n" +
        "- **Bandish:** a fixed composition set to a raga and a tala.\n\n" +
        "**Carnatic forms:**\n" +
        "- **Kriti:** the fixed composition that fills most of a concert, perfected by the Trinity (**Tyagaraja, Muthuswami Dikshitar, Syama Sastri**).\n" +
        "- **Varnam** usually opens a concert; **tillana** usually closes it.\n" +
        "- **Svarajati:** a vocal form later taken into Bharatanatyam.\n" +
        "- **Svaravalis:** the first exercises a pupil learns, built on the seven notes; set by **Purandara Dasa**.\n\n" +
        "**Folk song forms:** Haryana's folk songs are popularly called **Ragani**, though they have nothing to do with ragas. **Domkach** is a folk song and dance of Jharkhand, sung by women at weddings. Rajasthan's folk music, carried by the **Manganiyars** and **Langas**, sings of nature, desert life and old stories. **Hafiz Nagma** is a Kashmiri dance by a woman to Sufiana music.",
      table: {
        columns: ["Form", "Tradition", "What it is"],
        rows: [
          { cells: ["Dhrupad", "Hindustani", "Oldest vocal form; grave; rhythm"], pyqExampleId: "fda46264-7013-41c6-adbb-0ef8b7534581" },
          { cells: ["Bandish", "Hindustani", "Fixed composition in a raga and tala"], pyqExampleId: "020b87a0-547d-470e-8118-1d37cc79f9fb" },
          { cells: ["Thumri", "Hindustani", "Light, romantic"], pyqExampleId: "ec411a42-c9f4-4d1b-a709-beb297a0b8c0" },
          { cells: ["Kriti", "Carnatic", "Main fixed composition of a concert"] },
          { cells: ["Varnam", "Carnatic", "Usual opening piece"] },
          { cells: ["Svarajati", "Carnatic", "Vocal form later danced in Bharatanatyam"], pyqExampleId: "cf51b5a9-8ff0-4d2c-8737-41bffb3daf65" },
          { cells: ["Svaravalis", "Carnatic", "First exercises on the seven notes"], pyqExampleId: "75772b0b-18c0-4200-9667-2995dabbe391" },
          { cells: ["Ragani", "Haryana folk", "Folk songs with no link to ragas"], pyqExampleId: "67796984-0449-425d-9b6f-a68a79bdf609" },
          { cells: ["Domkach", "Jharkhand folk", "Women's wedding song and dance"], pyqExampleId: "ab8bf385-01bc-4c99-b481-53d58b71e856" },
          { cells: ["Hafiz Nagma", "Kashmir", "Dance to Sufiana music"], pyqExampleId: "b2ae1d56-4b63-4ec9-9376-b913bc51dfa6" },
        ],
      },
      pyqExampleId: "2a96be43-1a1d-410d-91a4-611950240b55",
      selfCheckExample: {
        prompt: "Which Hindustani vocal form is the oldest surviving one and grave in mood?",
        steps: ["Khayal is ornate, thumri light and tappa quick, so none of them fits.", "The grave, rhythm-heavy oldest form is dhrupad."],
        answer: "Dhrupad",
      },
      practiceSet: [
        { prompt: "Who set the svaravalis, the first exercises of Carnatic music?", answer: "Purandara Dasa" },
        { prompt: "Domkach is a folk song form of which state?", answer: "Jharkhand" },
        { prompt: "What are Haryana's folk songs popularly called?", answer: "Ragani" },
        { prompt: "Which Carnatic vocal form was later taken into Bharatanatyam?", answer: "The svarajati" },
        { prompt: "Which Carnatic piece usually closes a concert?", answer: "The tillana" },
      ],
      traps: [
        {
          title: "Kriti is Carnatic; bandish is Hindustani",
          body: "Both are fixed compositions. Asked about Hindustani music, the answer is bandish; asked about a Carnatic concert, it is kriti.",
        },
        {
          title: "A sonata is not raga music",
          body: "Thumri, dhrupad and prabandha are sung in ragas. A sonata is a Western classical form, so it is the odd one out.",
        },
        {
          title: "Ragani has no link to ragas",
          body: "Ragani is only the popular name of Haryana's folk songs. It is not a classical raga-ragini form.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsacmu-theory",
      name: "Notes, ragas and talas by number",
      intuition:
        "Theory questions are counting questions: how many notes, how many beats, which beat. A short table of numbers answers almost all of them.",
      definition:
        "- **Notes:** the seven swaras are Sa Re Ga Ma Pa Dha Ni. **Sa** and **Pa** are **achal** (fixed); the other five are **chal**: Re, Ga, Dha and Ni have **komal** (flat) forms and Ma has a **teevra** (sharp) form.\n" +
        "- **Raga jaati by number of notes:** Audav 5, **Shadav 6**, Sampoorna 7.\n" +
        "- **History:** ragas grew out of the **jatis** of the Natya Shastra. **Venkatamakhi** set out the **72 melakarta** scheme in the 17th century. Ancient texts split music into **Margi** (sacred, from the **Vedic** chanting of the Samaveda) and **Desi** (regional and folk).\n" +
        "- **Hindustani talas:** **Teentaal 16** beats (four parts of 4): the sam is beat 1, claps fall on 5 and 13, and the **khali** (wave) is on **beat 9**. Jhaptaal 10, Keharwa 8, Roopak 7, Dadra 6.\n" +
        "- **Carnatic laghu jatis:** Tishra 3, Chaturashra 4, **Khanda 5**, Mishra 7, Sankeerna 9.",
      table: {
        columns: ["Term", "Number or rule"],
        rows: [
          { cells: ["Achal swaras", "Sa and Pa (fixed)"], pyqExampleId: "e113c36e-535b-4216-b2b6-497aeadbe94b" },
          { cells: ["Audav, Shadav, Sampoorna", "5, 6 and 7 notes"], pyqExampleId: "47c536de-d3f9-436f-b35e-9ef5cbd0f10f" },
          { cells: ["72 melakarta scheme", "Venkatamakhi; ragas grew from jatis"], pyqExampleId: "a5010a01-1cd7-41f4-92c0-21ea077d1c54" },
          { cells: ["Margi music", "Rooted in Vedic chanting"], pyqExampleId: "d2166006-5592-457f-a215-21e9726e581e" },
          { cells: ["Teentaal", "16 beats; khali on beat 9"], pyqExampleId: "477fa71a-be71-4f10-9e01-bbeea48439b1" },
          { cells: ["Jhaptaal, Keharwa, Roopak, Dadra", "10, 8, 7 and 6 beats"] },
          { cells: ["Tishra, Chaturashra, Khanda, Mishra, Sankeerna", "3, 4, 5, 7 and 9 beats"], pyqExampleId: "4fae9971-f514-4269-9090-18468e79e3c8" },
        ],
      },
      pyqExampleId: "ac67585c-4189-454c-bd81-477af358b96c",
      selfCheckExample: {
        prompt: "How many beats are there in Jhaptaal?",
        steps: ["Teentaal has 16 and Keharwa 8.", "Jhaptaal has 10."],
        answer: "10",
      },
      practiceSet: [
        { prompt: "A raga with five notes belongs to which jaati?", answer: "Audav" },
        { prompt: "How many beats does a Khanda laghu have?", answer: "5" },
        { prompt: "Who set out the 72 melakarta scheme?", answer: "Venkatamakhi" },
        { prompt: "Margi music was rooted in which tradition?", answer: "The Vedic tradition" },
        { prompt: "Which two swaras have no komal or teevra form?", answer: "Sa and Pa" },
      ],
      traps: [
        {
          title: "Tishra is a tala word, not a raga jaati",
          body: "Raga jaatis count notes: Audav, Shadav, Sampoorna. Tishra counts beats in a Carnatic laghu, so it never answers a raga question.",
        },
        {
          title: "The khali is beat 9, not beat 1",
          body: "In Teentaal the sam, the stressed first beat, is 1. The khali, the wave of the hand, is beat 9.",
        },
        {
          title: "Bharata did not make the 72 melas",
          body: "The 72 melakarta scheme is Venkatamakhi's, from the 17th century. Bharata's Natya Shastra is far older and describes jatis.",
        },
      ],
    },
  ],
};
