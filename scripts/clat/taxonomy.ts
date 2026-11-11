/**
 * CLAT UG taxonomy. One SUBJECT per paper section (the section names the
 * Consortium prints), chapters by the kind of work a question asks for.
 *
 * The Consortium publishes no topic syllabus beyond the five sections, and every
 * question hangs off a passage, so chapters are cut the way a candidate prepares:
 * English by question type, Current Affairs by theme, Legal Reasoning by area of
 * law, Logical Reasoning by kind of argument or puzzle, Quantitative Techniques by
 * the arithmetic used. The solver picks a chapter and subtopic per question,
 * VERBATIM from here; assemble() refuses anything else.
 */
export type ClatChapter = { name: string; subtopics: readonly string[] };
export type ClatSubject = { name: string; chapters: readonly ClatChapter[] };

export const CLAT_TAXONOMY: readonly ClatSubject[] = [
  {
    name: "English Language",
    chapters: [
      { name: "Main Idea and Purpose", subtopics: ["Central idea", "Author's purpose", "Title and summary"] },
      { name: "Inference and Detail", subtopics: ["Inference", "Stated detail", "Assumption and implication"] },
      { name: "Tone, Style and Devices", subtopics: ["Tone and attitude", "Literary devices", "Narrative and style"] },
      { name: "Vocabulary and Usage", subtopics: ["Word meaning in context", "Idioms and phrases", "Grammar and usage"] },
    ],
  },
  {
    name: "Current Affairs including General Knowledge",
    chapters: [
      { name: "Polity and Governance", subtopics: ["Constitution and Parliament", "Government schemes and policy", "Courts and law in the news"] },
      { name: "International Affairs", subtopics: ["International organisations and summits", "India and the world", "Conflicts and global events"] },
      { name: "Economy and Business", subtopics: ["Economy and finance", "Trade, business and industry"] },
      { name: "Science, Technology and Environment", subtopics: ["Science and technology", "Space and defence technology", "Environment and climate"] },
      { name: "Awards, Sports and Personalities", subtopics: ["Awards and honours", "Sports", "Persons in the news"] },
      { name: "History, Geography and Culture", subtopics: ["History", "Geography", "Art, culture and heritage"] },
    ],
  },
  {
    name: "Legal Reasoning",
    chapters: [
      { name: "Constitutional Law", subtopics: ["Fundamental rights", "Constitutional bodies and governance", "Elections and federalism"] },
      { name: "Law of Torts", subtopics: ["Negligence", "Nuisance, trespass and defamation", "Strict and vicarious liability"] },
      { name: "Law of Contract", subtopics: ["Offer, acceptance and consideration", "Validity and consent", "Breach and remedies"] },
      {
        name: "Criminal Law",
        subtopics: ["General principles and defences", "Offences against the body", "Offences against property", "Criminal procedure and evidence"],
      },
      { name: "Family and Personal Law", subtopics: ["Marriage and divorce", "Succession, adoption and maintenance"] },
      { name: "International Law", subtopics: ["Treaties and international organisations", "Human rights and humanitarian law"] },
      {
        name: "Other Statutes and Legal Principles",
        subtopics: ["Consumer protection", "Intellectual property", "Environmental law", "Data, technology and media law", "Other statutes"],
      },
    ],
  },
  {
    name: "Logical Reasoning",
    chapters: [
      {
        name: "Critical Reasoning",
        subtopics: ["Assumption", "Inference and conclusion", "Strengthening and weakening", "Argument structure and flaws", "Principle and application"],
      },
      {
        name: "Analytical Reasoning",
        subtopics: ["Arrangements and ordering", "Blood relations and directions", "Syllogisms and logical deduction", "Series, analogy and coding"],
      },
    ],
  },
  {
    name: "Quantitative Techniques",
    chapters: [
      { name: "Arithmetic", subtopics: ["Percentages", "Ratio and proportion", "Averages and mixtures", "Profit, loss and interest", "Time, speed and work"] },
      { name: "Data Interpretation", subtopics: ["Tables and data sets"] },
      { name: "Algebra, Geometry and Counting", subtopics: ["Equations and numbers", "Mensuration and geometry", "Counting and probability"] },
    ],
  },
];

export const SUBJECTS = CLAT_TAXONOMY.map((s) => s.name);
