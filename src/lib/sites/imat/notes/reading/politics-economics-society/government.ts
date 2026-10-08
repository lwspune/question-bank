import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_PES_GOVERNMENT_NOTE: SubtopicNote = {
  subtopicName: "Forms of State and Government",
  title: "Forms of State and Government, and the Separation of Powers",
  oneLineDefinition:
    "Monarchy or republic, unitary or federal, parliamentary or presidential: the words used to describe how a state is organised, and who holds which power.",
  whyItMatters:
    "The 2023 ministry paper asked about the role of the President in a parliamentary system. The Cambridge papers asked for the three separated powers, the meaning of perfect bicameralism and which European countries have a state religion.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-pes-forms-of-state",
      name: "Monarchy and republic, unitary and federal states",
      intuition:
        "Two separate questions describe any state. Who is the head of state: a hereditary monarch or an elected president? And where does power sit: in one central government, or shared by the constitution with regions or member states? The answers combine freely, so the UK is a unitary monarchy and Germany a federal republic.",
      definition:
        "- **Monarchy**: the head of state inherits the position. In a **constitutional** (parliamentary) monarchy the monarch reigns but elected bodies govern.\n" +
        "- **Republic**: the head of state is chosen, directly or indirectly, for a fixed term.\n" +
        "- **Unitary state**: sovereignty is held centrally; regions have only the powers the centre gives them.\n" +
        "- **Federal state**: the constitution divides powers between the federal government and member states, which have their own parliaments.",
      table: {
        columns: ["Form", "Meaning", "Examples"],
        rows: [
          { cells: ["Absolute monarchy", "The monarch holds all power, with no binding constitution", "France under Louis XIV; Saudi Arabia and Vatican City today"] },
          { cells: ["Constitutional (parliamentary) monarchy", "Hereditary head of state; power lies with parliament and government", "United Kingdom, Spain, Netherlands, Belgium, Sweden, Denmark, Norway, Japan"] },
          { cells: ["Republic", "Elected head of state for a fixed term", "Italy, France, Germany, USA"] },
          { cells: ["Unitary state", "Power held centrally, regions with delegated powers", "France, Portugal, Greece; Italy (with strong regions)"] },
          { cells: ["Federal state", "Powers divided by the constitution with member states", "USA, Germany (Länder), Austria, Switzerland (cantons), Belgium, Canada, India"] },
          { cells: ["City-state", "A single city that is a sovereign state", "Ancient Athens; today Vatican City, Monaco, Singapore"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of these countries is a federal state?",
        options: ["France", "Portugal", "Germany", "Greece", "Ireland"],
        steps: [
          "Germany is a federal republic of 16 Länder, each with its own parliament and government.",
          "France, Portugal, Greece and Ireland are unitary states: their regions have only the powers the central state delegates.",
        ],
        answer: "(C) Germany",
      },
      practiceSet: [
        { prompt: "What are the member states of Switzerland called?", answer: "Cantons" },
        { prompt: "Is Spain a monarchy or a republic?", answer: "A parliamentary (constitutional) monarchy" },
        { prompt: "What is the difference between a unitary and a federal state?", answer: "In a federal state the constitution guarantees powers to member states; in a unitary state power is held centrally" },
      ],
      traps: [
        {
          title: "Switzerland is called a confederation but is a federal state",
          body: "Its official name is the Swiss Confederation, for historical reasons. Since 1848 it has been a federal state with a central government and 26 cantons. A true confederation is a looser union of sovereign states.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-systems-of-government",
      name: "Parliamentary, presidential and semi-presidential systems",
      intuition:
        "The key question is whether the government depends on parliament. In a parliamentary system it does: parliament can remove it with a no-confidence vote, and the head of state is a separate, mostly ceremonial figure. In a presidential system the elected president is both head of state and head of government, and parliament cannot dismiss them for political reasons.",
      definition:
        "- **Head of State**: represents the nation (a monarch or a president).\n" +
        "- **Head of Government**: leads the executive (a prime minister, chancellor or, in a presidential system, the president).\n" +
        "- In a **parliamentary republic** the President is **Head of State but not Head of Government**.\n" +
        "- In a **presidential republic** one person is both.",
      table: {
        columns: ["System", "Head of State", "Head of Government", "Examples"],
        rows: [
          { cells: ["Parliamentary republic", "President, often elected by parliament; mainly a guarantor", "Prime minister, who needs parliament's confidence", "Italy, Germany, Austria, Greece, India"] },
          { cells: ["Parliamentary monarchy", "King or queen", "Prime minister, who needs parliament's confidence", "United Kingdom, Spain, Sweden, Netherlands"] },
          { cells: ["Presidential republic", "President, elected by the people", "The same president; no confidence vote", "USA, Brazil, Mexico, Argentina"] },
          { cells: ["Semi-presidential republic", "President, elected by the people, with real powers", "Prime minister appointed by the president but answerable to parliament", "France (Fifth Republic, 1958), Portugal, Romania"] },
          { cells: ["Directorial system", "A collective body", "The seven-member Federal Council", "Switzerland"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which country is the classic example of a presidential republic?",
        options: ["The United States", "Italy", "Germany", "The United Kingdom", "Spain"],
        steps: [
          "In the USA the president is elected separately from Congress and is both head of state and head of government; Congress cannot remove the president by a confidence vote.",
          "Italy and Germany are parliamentary republics; the United Kingdom and Spain are parliamentary monarchies.",
        ],
        answer: "(A) The United States",
      },
      practiceSet: [
        { prompt: "Who is the head of government in Germany?", answer: "The Federal Chancellor" },
        { prompt: "Which European country is the standard example of a semi-presidential system?", answer: "France" },
        { prompt: "In a parliamentary monarchy, who leads the government?", answer: "The prime minister, not the monarch" },
      ],
      traps: [
        {
          title: "Head of State and Head of Government are different jobs",
          body: "In Italy and Germany the President is Head of State and the Prime Minister (or Chancellor) is Head of Government. Only in a presidential system, as in the USA, does one person hold both roles. Neither role includes leading the judges.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-separation-of-powers",
      name: "The separation of powers and how parliaments are built",
      intuition:
        "If the same people make the laws, carry them out and judge disputes about them, nothing stops them abusing power. Montesquieu (1748) argued for giving each function to a different body so that each checks the others. Almost every modern constitution follows this idea.",
      definition:
        "- The three powers are **legislative** (makes laws), **executive** (carries them out) and **judicial** (applies them in courts).\n" +
        "- A parliament with one chamber is **unicameral**; with two, **bicameral**.\n" +
        "- **Perfect (symmetric) bicameralism**: both chambers have identical powers; a bill must be approved by both in the same text. Italy is the classic example.\n" +
        "- **Imperfect bicameralism**: one chamber is stronger (the UK House of Commons over the Lords).",
      table: {
        columns: ["Term", "Meaning", "Example"],
        rows: [
          { cells: ["Legislative power", "Makes laws", "Italian Parliament: Chamber of Deputies and Senate"] },
          { cells: ["Executive power", "Governs and carries out laws", "Italian Government: the Council of Ministers"] },
          { cells: ["Judicial power", "Applies laws and judges disputes", "Independent judges (magistrates)"] },
          { cells: ["Perfect bicameralism", "Two chambers with identical powers", "Italy: both chambers pass every law and both give confidence to the Government"] },
          { cells: ["Imperfect bicameralism", "One chamber has more power", "United Kingdom; Germany (Bundestag over Bundesrat)"] },
          { cells: ["Unicameral parliament", "A single chamber", "Portugal, Greece, Sweden, Denmark"] },
          { cells: ["Vote of no confidence", "Parliament removes the government", "Exists in parliamentary systems, not in presidential ones"] },
        ],
      },
      selfCheckExample: {
        prompt: "In a parliamentary system, which body can remove the government through a vote of no confidence?",
        options: ["The judiciary", "The head of state acting alone", "The constitutional court", "The central bank", "The parliament"],
        steps: [
          "In a parliamentary system the government needs the confidence of parliament (the legislative power), which can withdraw it by vote.",
          "Judges and the constitutional court check legality, not political confidence; the head of state appoints the government but does not vote it out; the central bank has no such role.",
        ],
        answer: "(E) The parliament",
      },
      practiceSet: [
        { prompt: "Which thinker is most associated with the separation of powers?", answer: "Montesquieu (The Spirit of the Laws, 1748)" },
        { prompt: "What is a parliament with a single chamber called?", answer: "Unicameral" },
        { prompt: "Which power do courts and judges exercise?", answer: "The judicial power" },
      ],
      traps: [
        {
          title: "Elections are not a separate power",
          body: "The classic three are legislative, executive and judicial. Electing representatives is how the legislative power is filled, not a fourth power. Lists that swap one of the three for an invented power are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-church-state",
      name: "Religion and the state in European countries",
      intuition:
        "European states handle religion in three ways. Some have an established church written into law; some are neutral but keep agreements with churches; a few, like France, insist on strict separation. Italy had Catholicism as its state religion until 1984 and now belongs to the neutral group.",
      definition:
        "- An **established** (state) **church** has a special legal position recognised by the state.\n" +
        "- A **secular** or **non-confessional** state has no official religion.\n" +
        "- **Laïcité** is France's strict separation of church and state (law of 1905).\n" +
        "- Italy's relations with the Catholic Church rest on the **Lateran Pacts** (1929), revised in **1984**, when Catholicism stopped being the state religion.",
      table: {
        columns: ["Country", "Status of religion", "Fact to remember"],
        rows: [
          { cells: ["England", "Established Church of England", "The monarch is its Supreme Governor (since Henry VIII)"] },
          { cells: ["Denmark", "State church: the Evangelical Lutheran Church", "Written into the constitution"] },
          { cells: ["Greece", "Eastern Orthodoxy is the \"prevailing religion\" in the constitution", "The Church of Greece has a special legal status"] },
          { cells: ["Malta", "Roman Catholicism is the religion of the state", "Stated in the constitution"] },
          { cells: ["Vatican City", "Theocracy: the Pope is head of state", "Independent since the Lateran Pacts of 1929"] },
          { cells: ["Italy", "No state religion since the 1984 revision of the Lateran Pacts", "Constitution articles 7 and 8 regulate relations with the churches"] },
          { cells: ["Spain", "Non-confessional state (1978 constitution)", "No faith has a state character"] },
          { cells: ["France", "Strict secularism (laïcité)", "Law separating churches and state, 1905"] },
          { cells: ["Sweden", "Church of Sweden separated from the state", "Since 2000"] },
        ],
      },
      selfCheckExample: {
        prompt: "In which year did Catholicism stop being the state religion of Italy?",
        options: ["1929", "1984", "1948", "1946", "1861"],
        steps: [
          "The 1984 revision of the Lateran Pacts (the Villa Madama agreement) ended Catholicism's status as state religion.",
          "1929 is the year of the original Lateran Pacts, which confirmed it as state religion; 1946 and 1948 are the referendum and the Constitution, which kept the Pacts; 1861 is unification.",
        ],
        answer: "(B) 1984",
      },
      practiceSet: [
        { prompt: "Who is the Supreme Governor of the Church of England?", answer: "The British monarch" },
        { prompt: "What is the French principle of strict separation of church and state called?", answer: "Laïcité (law of 1905)" },
        { prompt: "Which 1929 agreements created the Vatican City State?", answer: "The Lateran Pacts" },
      ],
      traps: [
        {
          title: "A Catholic country is not necessarily a Catholic state",
          body: "Spain and Italy have large Catholic majorities, but neither has a state religion today (Spain since 1978, Italy since 1984). Malta does: its constitution names Roman Catholicism as the religion of the state.",
        },
      ],
    },
  ],
};
