/**
 * UGC NET Paper 1 (General Paper on Teaching and Research Aptitude): NTA's ten
 * syllabus units, in syllabus order, each with its own sub-heads as subtopics.
 * Chapter and subtopic names are what /browse and /questions show, so they
 * follow the syllabus wording, shortened only where it ran past a line.
 */
export type Chapter = { name: string; subtopics: string[] };

export const UGC_NET_TAXONOMY: readonly Chapter[] = [
  {
    name: "Teaching Aptitude",
    subtopics: [
      "Concept, objectives and levels of teaching",
      "Learners' characteristics",
      "Factors affecting teaching",
      "Methods of teaching",
      "Teaching support systems",
      "Evaluation systems",
    ],
  },
  {
    name: "Research Aptitude",
    subtopics: [
      "Meaning, types and characteristics of research",
      "Methods of research",
      "Steps of research",
      "Thesis and article writing",
      "ICT in research",
      "Research ethics",
    ],
  },
  { name: "Comprehension", subtopics: ["Reading comprehension"] },
  {
    name: "Communication",
    subtopics: [
      "Meaning, types and characteristics of communication",
      "Effective communication",
      "Barriers to communication",
      "Mass media and society",
    ],
  },
  {
    name: "Mathematical Reasoning and Aptitude",
    subtopics: [
      "Series and coding",
      "Relationships",
      "Fractions and ratio",
      "Percentage, profit and loss",
      "Interest and discounting",
      "Averages",
      "Time and distance",
    ],
  },
  {
    name: "Logical Reasoning",
    subtopics: [
      "Structure of arguments",
      "Deductive and inductive reasoning",
      "Analogies",
      "Venn diagrams",
      "Indian logic: pramanas",
      "Anumana and hetvabhasas",
    ],
  },
  {
    name: "Data Interpretation",
    subtopics: [
      "Sources and classification of data",
      "Quantitative and qualitative data",
      "Graphical representation of data",
      "Data interpretation",
      "Data and governance",
    ],
  },
  {
    name: "Information and Communication Technology",
    subtopics: [
      "ICT abbreviations and terminology",
      "Internet, intranet, e-mail and conferencing",
      "Digital initiatives in higher education",
      "ICT and governance",
    ],
  },
  {
    name: "People, Development and Environment",
    subtopics: [
      "Development and environment: MDGs and SDGs",
      "Human and environment interaction",
      "Environmental issues and pollution",
      "Natural and energy resources",
      "Natural hazards and disasters",
      "Environmental laws and agreements",
    ],
  },
  {
    name: "Higher Education System",
    subtopics: [
      "Higher learning in ancient India",
      // Not a syllabus sub-head, but asked every shift (Wood's Despatch, Hunter, Sadler,
      // the first universities); added 2026-11-10 when agents had nowhere to put them.
      "Higher education in colonial India",
      "Higher education after independence",
      "Conventional and non-conventional learning",
      "Professional, technical and skill education",
      "Value and environmental education",
      "Policies, governance and administration",
    ],
  },
];
