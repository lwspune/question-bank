import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HME_ARCHITECTURE_NOTE: SubtopicNote = {
  subtopicName: "Temple and Monument Architecture",
  title: "Temple and Monument Architecture",
  oneLineDefinition:
    "The great regional temples of Odisha, Gujarat and Tamil Nadu, the forts and cities of the Sultans and Rajputs, and Mughal buildings from Humayun's Tomb to the Red Fort.",
  whyItMatters:
    "Twenty questions in the bank, and 17 of them come from the 2025 shifts alone, against three from the 2023 shifts. Those papers asked about features rather than builders: the Konark chariot's wheels and horses, Golconda's gate spikes, Purana Qila's stone, the plan of Akbar's tomb. Learn each monument with the one feature that makes it famous.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschmear-temples",
      name: "Temples of the regional kingdoms",
      intuition:
        "Between the 11th and 13th centuries the regional kings built their greatest temples. Each has one feature SSC asks about: a chariot, a tank, a tower, a gateway.",
      definition:
        "The temples:\n" +
        "- **Sun Temple, Konark** (Odisha, 13th century, Eastern Ganga king **Narasimhadeva I**): built as the **chariot of Surya** with **24 wheels (12 pairs)** drawn by **seven horses**. The wheels stand for **divisions of time**, and their spokes work as sundials.\n" +
        "- **Jagannath Temple, Puri** (12th century): the **Kalinga** style, Odisha's form of **Nagara**.\n" +
        "- **Sun Temple, Modhera** (Gujarat, Solanki, 1026 to 1027): famous for its **stepped tank**, the Surya Kund.\n" +
        "- **Meenakshi Temple, Madurai**: **Dravida** style, known for its **gigantic gopurams** (gateway towers).",
      table: {
        columns: ["Temple", "Style or dynasty", "Famous for"],
        rows: [
          { cells: ["Konark Sun Temple", "Eastern Ganga", "Chariot: 24 wheels, 7 horses"], pyqExampleId: "6886fbbe-b8fb-414c-b512-7a881bf0c692" },
          { cells: ["Jagannath, Puri", "Kalinga (Nagara)", "Tall curved tower"], pyqExampleId: "ca643a6f-c782-4bae-857c-73ac9476d118" },
          { cells: ["Modhera Sun Temple", "Solanki", "Stepped tank"], pyqExampleId: "2456a940-260d-481e-8a85-17415c1c8387" },
          { cells: ["Meenakshi, Madurai", "Dravida", "Gigantic gopurams"], pyqExampleId: "9e7e1d62-6a30-4526-a99e-1674b7902e03" },
        ],
      },
      pyqExampleId: "169d77e6-a9af-414d-8bc5-ca8ca50a7198",
      selfCheckExample: {
        prompt: "What do the Konark temple's 24 wheels stand for, and how many pairs are there?",
        steps: ["The wheels stand for divisions of time, and their spokes work as sundials.", "24 wheels make 12 pairs, often read as the 12 months."],
        answer: "Divisions of time; 12 pairs.",
      },
      practiceSet: [
        { prompt: "In which style is the Jagannath Temple at Puri built?", answer: "The Kalinga style, a form of Nagara" },
        { prompt: "What is the Modhera Sun Temple famous for?", answer: "Its stepped tank, the Surya Kund" },
        { prompt: "Which king built the Konark Sun Temple?", answer: "Narasimhadeva I of the Eastern Gangas" },
        { prompt: "What feature is the Meenakshi Temple in Madurai known for?", answer: "Its gigantic gopurams (gateway towers)" },
      ],
      traps: [
        {
          title: "Gopurams and vimanas are southern",
          body: "A **stepped tank** is the answer for **Modhera**, a northern temple. **Gopuram** and **vimana** are features of **Dravida** temples, so they are decoys there.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmear-forts",
      name: "Sultanate and Rajput forts and cities",
      intuition:
        "Delhi was rebuilt as a new city by one ruler after another, and the Deccan and Rajput kings built forts to stop armies and elephants. SSC asks who built which city and what protected each fort.",
      definition:
        "Delhi's early buildings and cities:\n" +
        "- **Quwwat-ul-Islam mosque**, in the Qutb complex, **Delhi**: begun by Qutbuddin Aibak in the 1190s. (Its sister mosque at Ajmer is the Adhai Din ka Jhonpra.)\n" +
        "- **Siri**: **Alauddin Khalji's** capital (about 1303). **Dinpanah**: Humayun's city.\n" +
        "- **Purana Qila**: built under Humayun and Sher Shah, of **red sandstone** with white and black marble; its gates are **double-storeyed**.\n\n" +
        "Forts:\n" +
        "- **Golconda**: its gates carry long **iron spikes** to stop **war elephants**.\n" +
        "- **Chittorgarh**: holds the **Vijay Stambh** (Rana Kumbha) and the **Kirti Stambh**.\n" +
        "- **Kangra**, Himachal Pradesh: a stone fort entered through a series of arched gateways.",
      table: {
        columns: ["Building", "Built by or for", "Remember for"],
        rows: [
          { cells: ["Quwwat-ul-Islam mosque", "Qutbuddin Aibak", "In Delhi's Qutb complex"], pyqExampleId: "bbf8fcbb-1c2f-4a89-9695-63b578242b45" },
          { cells: ["Siri", "Alauddin Khalji", "His capital city"], pyqExampleId: "7a96f8ea-743e-44fc-b96d-ab5e33feae65" },
          { cells: ["Purana Qila", "Humayun and Sher Shah", "Red sandstone; double-storeyed gates"], pyqExampleId: "1fd2d556-bc8b-4643-8a7f-4cd340592066" },
          { cells: ["Chittorgarh", "Rajputs of Mewar", "Vijay Stambh and Kirti Stambh"] },
        ],
      },
      pyqExampleId: "3a9343ba-80fe-4ee9-b910-fb4faddc4d4b",
      selfCheckExample: {
        prompt: "Name the cities built by Alauddin Khalji and by Humayun in Delhi.",
        steps: ["Alauddin Khalji built Siri as his capital, about 1303.", "Humayun built Dinpanah, around which the Purana Qila stands."],
        answer: "Alauddin Khalji: Siri. Humayun: Dinpanah.",
      },
      practiceSet: [
        { prompt: "In which city is the Quwwat-ul-Islam mosque?", answer: "Delhi" },
        { prompt: "Which Sultan built Siri as his capital?", answer: "Alauddin Khalji" },
        { prompt: "What colour is the sandstone of the Purana Qila's gates?", answer: "Red" },
        { prompt: "Which two towers stand in Chittorgarh fort?", answer: "The Vijay Stambh and the Kirti Stambh" },
      ],
      traps: [
        {
          title: "Ajmer's mosque has another name",
          body: "The **Quwwat-ul-Islam** mosque is in **Delhi**. The mosque Aibak's age built at **Ajmer** is the **Adhai Din ka Jhonpra**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmear-mughal",
      name: "Mughal buildings",
      intuition:
        "Mughal building runs from Humayun's Tomb, the first garden tomb, to Shah Jahan's marble. SSC asks the order of the buildings, who built which, and which one broke the pattern.",
      definition:
        "The buildings, in order:\n" +
        "- **Humayun's Tomb**, Delhi (finished 1572): the **first garden tomb**, set in a **charbagh** with a **double dome**. It was the model for the **Taj Mahal**.\n" +
        "- **Agra Fort**, rebuilt by **Akbar** (about 1565 to 1573).\n" +
        "- **Jahangir Mahal, Orchha** (about 1605), built by Bir Singh Deo for Jahangir's visit.\n" +
        "- **Akbar's Tomb, Sikandra**: five storeys of terraces with **no central dome**, breaking the usual Mughal plan of a domed square tomb.\n" +
        "- **Red Fort, Delhi**: **Shah Jahan** (1638 to 1648).\n\n" +
        "Mughal building blended **Persian, Turkish and Indian** styles in **red sandstone and white marble**. **Pietra dura**, the inlay of coloured stones in marble, first appeared under Jahangir but became popular under **Shah Jahan**, along with the double dome.",
      table: {
        columns: ["Building", "Built by", "Remember for"],
        rows: [
          { cells: ["Humayun's Tomb", "Under Humayun's widow, 1572", "First garden tomb; model for the Taj"] },
          { cells: ["Agra Fort", "Akbar", "Finished about 1573"], pyqExampleId: "42fd7c9d-28df-49d1-b406-dd5792677e48" },
          { cells: ["Akbar's Tomb, Sikandra", "Completed under Jahangir", "Terraced, no central dome"], pyqExampleId: "52c954cb-911a-475b-bd44-83c918e74768" },
          { cells: ["Red Fort, Delhi", "Shah Jahan", "Finished 1648"], pyqExampleId: "55943e5d-f4e3-44bc-ae54-c5cb3caa9c69" },
          { cells: ["Pietra dura made popular", "Shah Jahan", "Inlay of coloured stones in marble"], pyqExampleId: "ad2ed1a0-2ade-45d4-ac63-a594b1b7cce1" },
        ],
      },
      pyqExampleId: "b8e95a3f-4d5d-4306-8827-9221701a4780",
      selfCheckExample: {
        prompt: "Put these in order of completion: the Red Fort in Delhi, Akbar's Agra Fort, the Jahangir Mahal at Orchha.",
        steps: ["Akbar's Agra Fort was finished about 1573.", "The Jahangir Mahal followed around 1605, and the Red Fort in 1648."],
        answer: "Agra Fort, Jahangir Mahal, Red Fort.",
      },
      practiceSet: [
        { prompt: "Which emperor built the Red Fort in Delhi?", answer: "Shah Jahan" },
        { prompt: "In whose reign did pietra dura become popular?", answer: "Shah Jahan's" },
        { prompt: "Which Mughal tomb has no central dome?", answer: "Akbar's Tomb at Sikandra" },
        { prompt: "What were the two main materials of Mughal buildings?", answer: "Red sandstone and white marble" },
      ],
      traps: [
        {
          title: "Pietra dura began under Jahangir",
          body: "The first Mughal pietra dura is at **Itimad-ud-Daulah's** tomb, under **Jahangir**. It became **popular** under **Shah Jahan**, which is what SSC asks.",
        },
      ],
    },
  ],
};
