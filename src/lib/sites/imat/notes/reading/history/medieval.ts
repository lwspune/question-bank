import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_HIS_MEDIEVAL_NOTE: SubtopicNote = {
  subtopicName: "Middle Ages and Renaissance",
  title: "Middle Ages, Renaissance and the Age of Exploration",
  oneLineDefinition:
    "From the fall of Rome to the voyages of Columbus: feudal Europe, the Crusades and the plague, then printing, the Renaissance, the Reformation and new sea routes.",
  whyItMatters:
    "The 2024 ministry paper asked which kingdoms fought the Hundred Years' War, and an older paper asked which of several events was the most recent, an ordering question that needs dates. Learn one date per event.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-his-middle-ages",
      name: "Key events of the Middle Ages",
      intuition:
        "The Middle Ages run for about a thousand years, from the end of the Western Roman Empire (476) to the fall of Constantinople (1453) or Columbus (1492). Power was spread out: kings granted land to nobles in exchange for loyalty and soldiers, and the Church was the one institution present everywhere. A handful of dated events gives you a frame for the whole period.",
      definition:
        "- **Feudalism**: a lord gave land (a **fief**) to a **vassal** in return for loyalty and military service; **serfs** worked the land and could not leave it.\n" +
        "- **Holy Roman Empire**: begun with Charlemagne's coronation (800) and refounded under Otto I (962); it lasted until 1806.\n" +
        "- **Crusades**: Christian military expeditions to take the Holy Land from Muslim rulers.\n" +
        "- The **Hundred Years' War** was fought between the kingdoms of **England and France**; despite its name it lasted 116 years.",
      table: {
        columns: ["Date", "Event", "Fact to remember"],
        rows: [
          { cells: ["622", "Muhammad moves from Mecca to Medina (the Hijra)", "Year 1 of the Islamic calendar"] },
          { cells: ["800", "Charlemagne, king of the Franks, crowned emperor in Rome on Christmas Day", "Crowned by Pope Leo III"] },
          { cells: ["1054", "Great Schism", "Split between the Catholic Church (Rome) and the Orthodox Church (Constantinople)"] },
          { cells: ["1066", "Norman conquest of England", "William the Conqueror wins the battle of Hastings"] },
          { cells: ["1096 to 1291", "The Crusades", "The First Crusade took Jerusalem in 1099"] },
          { cells: ["1215", "Magna Carta", "King John of England accepts that the king is under the law"] },
          { cells: ["1337 to 1453", "Hundred Years' War", "England against France; Joan of Arc; France wins and England keeps only Calais"] },
          { cells: ["1347 to 1351", "Black Death", "Bubonic plague kills between a third and a half of Europe's people"] },
          { cells: ["1453", "Ottoman Turks capture Constantinople", "End of the Byzantine Empire; often used as the end of the Middle Ages"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which event took place in the year 800?",
        options: [
          "The Norman conquest of England",
          "The coronation of Charlemagne as emperor",
          "The signing of Magna Carta",
          "The Great Schism between Rome and Constantinople",
          "The start of the First Crusade",
        ],
        steps: [
          "Charlemagne was crowned in Rome on Christmas Day 800.",
          "The others are later: the Great Schism 1054, the Norman conquest 1066, the First Crusade 1096, Magna Carta 1215.",
        ],
        answer: "(B) The coronation of Charlemagne as emperor",
      },
      practiceSet: [
        { prompt: "Which French peasant girl led French troops in the Hundred Years' War?", answer: "Joan of Arc" },
        { prompt: "Which English king accepted Magna Carta?", answer: "King John (1215)" },
        { prompt: "When did the Black Death reach Europe?", answer: "1347, spreading until about 1351" },
        { prompt: "Which empire captured Constantinople in 1453?", answer: "The Ottoman Empire" },
      ],
      traps: [
        {
          title: "The Hundred Years' War did not involve Spain or Portugal",
          body: "It was a dynastic war between the kingdoms of England and France over the French crown and English lands in France, 1337 to 1453. Options with Aragon, Castile or Portugal are wrong, and the war lasted 116 years, not exactly a hundred.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-his-renaissance-reformation",
      name: "Renaissance and Reformation",
      intuition:
        "The Renaissance (\"rebirth\") began in the rich Italian cities of the 1400s, where scholars and artists turned back to Greek and Roman models and put human beings at the centre. The printing press then spread new ideas fast, which is why one German monk's protest in 1517 could split Western Christianity within a few years.",
      definition:
        "- **Humanism**: the study of classical texts and a belief in human dignity and ability (Petrarch, Erasmus).\n" +
        "- The **Renaissance** started in **Florence**, helped by patrons such as the **Medici** family.\n" +
        "- The **Reformation** created the **Protestant** churches (Lutheran, Calvinist, Anglican).\n" +
        "- The **Counter-Reformation** was the Catholic response, organised at the **Council of Trent**.",
      table: {
        columns: ["Date", "Person or event", "Fact to remember"],
        rows: [
          { cells: ["About 1450", "Johannes Gutenberg in Mainz", "Printing with movable metal type; the Gutenberg Bible, about 1455"] },
          { cells: ["1469 to 1492", "Lorenzo de' Medici (il Magnifico) rules Florence", "Patron of Botticelli and the young Michelangelo"] },
          { cells: ["About 1495 to 1519", "Leonardo da Vinci", "The Last Supper (Milan), the Mona Lisa, anatomical drawings"] },
          { cells: ["1508 to 1512", "Michelangelo paints the Sistine Chapel ceiling", "Also the marble David (1504)"] },
          { cells: ["1513", "Machiavelli writes The Prince", "Published in 1532, after his death"] },
          { cells: ["1517", "Martin Luther's 95 Theses, Wittenberg", "Against the sale of indulgences; start of the Reformation"] },
          { cells: ["1534", "Act of Supremacy", "Henry VIII makes himself head of the Church of England"] },
          { cells: ["1545 to 1563", "Council of Trent", "Catholic Counter-Reformation"] },
          { cells: ["1618 to 1648", "Thirty Years' War", "Religious and political war in Germany; ended by the Peace of Westphalia (1648)"] },
        ],
      },
      selfCheckExample: {
        prompt: "In which year did Martin Luther publish his 95 Theses?",
        options: ["1453", "1492", "1534", "1517", "1648"],
        steps: [
          "Luther's 95 Theses date from 1517 and mark the start of the Reformation.",
          "1453 is the fall of Constantinople, 1492 Columbus, 1534 Henry VIII's Act of Supremacy, 1648 the Peace of Westphalia.",
        ],
        answer: "(D) 1517",
      },
      practiceSet: [
        { prompt: "In which city did the Renaissance begin?", answer: "Florence" },
        { prompt: "Who invented printing with movable metal type in Europe?", answer: "Johannes Gutenberg" },
        { prompt: "Which council organised the Catholic Counter-Reformation?", answer: "The Council of Trent (1545 to 1563)" },
      ],
      traps: [
        {
          title: "Henry VIII broke with Rome for political reasons, not Lutheran doctrine",
          body: "The Church of England split from Rome in 1534 because the Pope would not annul Henry VIII's marriage. Luther's Reformation began in Germany in 1517; Henry had earlier written against Luther. Both are Protestant breaks, but they had different causes.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-his-exploration",
      name: "The age of exploration and the conquest of the Americas",
      intuition:
        "Portugal and Spain wanted a sea route to the spices of Asia that avoided Ottoman and Venetian middlemen. Portugal went south around Africa; Spain went west and found a continent in the way. The two then divided the newly found lands between them.",
      definition:
        "- **Portugal** sailed around Africa (Dias, da Gama) and reached **Brazil** (Cabral).\n" +
        "- **Spain** sponsored **Columbus** (an Italian from Genoa) and **Magellan** (a Portuguese).\n" +
        "- The **Treaty of Tordesillas** (1494) drew a line through the Atlantic: lands west to Spain, east to Portugal. That is why Brazil speaks Portuguese.\n" +
        "- **America** is named after the Florentine **Amerigo Vespucci**, who argued the new lands were a separate continent.",
      table: {
        columns: ["Date", "Explorer or event", "Achievement"],
        rows: [
          { cells: ["1488", "Bartolomeu Dias (Portugal)", "First to sail round the Cape of Good Hope"] },
          { cells: ["1492", "Christopher Columbus (for Spain)", "Reached the Caribbean (the Bahamas, then Cuba and Hispaniola)"] },
          { cells: ["1494", "Treaty of Tordesillas", "Divided new lands between Spain and Portugal"] },
          { cells: ["1498", "Vasco da Gama (Portugal)", "First sea voyage from Europe to India, round Africa"] },
          { cells: ["1500", "Pedro Álvares Cabral (Portugal)", "Reached Brazil"] },
          { cells: ["1519 to 1522", "Ferdinand Magellan's expedition (for Spain)", "First circumnavigation of the globe; Magellan was killed in the Philippines and Elcano finished the voyage"] },
          { cells: ["1521 and 1532", "Hernán Cortés and Francisco Pizarro", "Spanish conquest of the Aztec and Inca empires"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which explorer opened the first sea route from Europe to India?",
        options: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "Amerigo Vespucci", "Hernán Cortés"],
        steps: [
          "Vasco da Gama sailed round Africa and reached India in 1498.",
          "Columbus was also looking for Asia but reached the Caribbean; Magellan's expedition went round the world; Vespucci gave his name to America; Cortés conquered Mexico.",
        ],
        answer: "(A) Vasco da Gama",
      },
      practiceSet: [
        { prompt: "For which country did Columbus sail in 1492?", answer: "Spain (Ferdinand and Isabella)" },
        { prompt: "Why is Portuguese spoken in Brazil?", answer: "The Treaty of Tordesillas gave Portugal the eastern part of South America, reached by Cabral in 1500" },
        { prompt: "Who completed Magellan's voyage round the world?", answer: "Juan Sebastián Elcano (1522)" },
      ],
      traps: [
        {
          title: "Magellan did not complete his own circumnavigation",
          body: "Magellan led the expedition but was killed in the Philippines in 1521. One ship, commanded by Elcano, returned to Spain in 1522 and completed the first voyage round the world.",
        },
      ],
    },
  ],
};
