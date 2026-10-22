import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_WO_WATER_NOTE: SubtopicNote = {
  subtopicName: "Seas, Straits and Rivers",
  title: "Seas, Straits and Rivers",
  oneLineDefinition:
    "Which straits join which seas, the kinds of port and the fishing banks CDS asks about, where the big rivers of Europe and South America end, and the cities on the Great Lakes.",
  whyItMatters:
    "Twelve CDS questions from 2016 to 2025: 1 EASY, 10 MODERATE, 1 HARD. Two are four-pair strait match lists, four ask where a river flows or which city stands on it, and the 2016 (II) paper alone asked three of the twelve.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgewo-straits",
      name: "Straits and the waters they join",
      intuition:
        "A strait is a narrow sea passage between two pieces of land, so every strait has two answers: the waters it joins and the lands it separates. CDS asks both, usually as a match list of four. Learn each strait with its pair of lands and its pair of waters.",
      definition:
        "Straits on the routes to and from Asia:\n" +
        "- **Hormuz**: the outlet of the **Persian Gulf**, between Iran and Oman.\n" +
        "- **Bab-el-Mandeb**: joins the **Red Sea** to the Gulf of Aden, between Yemen and Africa.\n" +
        "- **Malacca**: between the Malay Peninsula and Sumatra; it opens west into the **Andaman Sea**.\n" +
        "- **Sunda**: between Java and Sumatra, joining the **Java Sea** to the Indian Ocean.\n" +
        "Straits between two countries or an island and its mainland:\n" +
        "- **Bass**: Australia and **Tasmania**. **Davis**: Canada and **Greenland**.\n" +
        "- **Dover**: England and **France**. **Florida**: the United States and **Cuba**.\n" +
        "- **Kerch**: joins the **Sea of Azov** to the **Black Sea**. The Sea of Azov is a shallow arm of the Black Sea.",
      table: {
        columns: ["Strait", "Lands on either side", "Waters it joins"],
        rows: [
          {
            cells: ["Hormuz", "Iran and Oman", "Persian Gulf and Gulf of Oman"],
            noteAmber: "CDS 2016 (II) match: Hormuz to the Persian Gulf, Bab-el-Mandeb to the Red Sea, Malacca to the Andaman Sea, Sunda to the Java Sea.",
            pyqExampleId: "9b75b95e-e4e9-4c6c-a31d-688776ddd0f6",
          },
          { cells: ["Bab-el-Mandeb", "Yemen and Djibouti", "Red Sea and Gulf of Aden"] },
          { cells: ["Malacca", "Malay Peninsula and Sumatra", "Andaman Sea and South China Sea"] },
          { cells: ["Sunda", "Java and Sumatra", "Java Sea and Indian Ocean"] },
          { cells: ["Bass", "Australian mainland and Tasmania", "Tasman Sea and Indian Ocean"] },
          { cells: ["Davis", "Canada (Baffin Island) and Greenland", "Baffin Bay and Labrador Sea"] },
          { cells: ["Dover", "England and France", "English Channel and North Sea"] },
          { cells: ["Florida", "United States (Florida) and Cuba", "Gulf of Mexico and Atlantic Ocean"] },
          {
            cells: ["Kerch", "Crimea and the Taman peninsula", "Sea of Azov and Black Sea"],
            noteAmber: "CDS 2020 (II): the Sea of Azov is connected to the Black Sea.",
            pyqExampleId: "62161c88-1640-4ed3-af10-6e911e286d05",
          },
        ],
      },
      pyqExampleId: "c25ca16e-7178-4af7-8cba-c385e944b0b8",
      selfCheckExample: {
        prompt: "A tanker leaves the Red Sea for the Arabian Sea. Through which strait must it pass first, and into which gulf does that strait open?",
        steps: [
          "The Red Sea has one southern outlet, between Yemen and Africa.",
          "That outlet is Bab-el-Mandeb, and on its far side lies the Gulf of Aden, which opens into the Arabian Sea.",
        ],
        answer: "Bab-el-Mandeb, opening into the Gulf of Aden.",
      },
      practiceSet: [
        { prompt: "Which strait separates the Malay Peninsula from Sumatra?", answer: "The Strait of Malacca" },
        { prompt: "Which strait separates Java from Sumatra?", answer: "The Sunda Strait" },
        { prompt: "Which strait is the outlet of the Persian Gulf?", answer: "The Strait of Hormuz" },
        { prompt: "To which sea is the Sea of Azov joined by the Strait of Kerch?", answer: "The Black Sea" },
      ],
      traps: [
        {
          title: "Hormuz is the Gulf, Bab-el-Mandeb is the Red Sea",
          body: "Both straits guard Arabia, which is why they get swapped. **Hormuz** is the mouth of the **Persian Gulf**; **Bab-el-Mandeb** is the mouth of the **Red Sea**.",
        },
        {
          title: "Malacca opens on the Andaman Sea",
          body: "In a match list the **Strait of Malacca** pairs with the **Andaman Sea**, not the Java Sea. The Java Sea goes with the **Sunda** Strait.",
        },
        {
          title: "Azov belongs to the Black Sea",
          body: "The **Sea of Azov** is a shallow arm of the **Black Sea**, joined to it by the Strait of Kerch. It has no link to the Baltic or the Caspian.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgewo-ports",
      name: "Kinds of port, and fishing banks",
      intuition:
        "NCERT sorts ports by the job they do. A port of call is a stop on a main sea route; an entrepot collects goods to send them on; a naval port serves warships; a packet station runs short ferry crossings; an out port takes the big ships that cannot reach the main port. One port can do two jobs at once. Fishing banks are shallow parts of the sea where fish gather, so learn each with its coast.",
      definition:
        "Kinds of port (NCERT Class 12):\n" +
        "- **Port of call**: a stop for fuel, water and food on a main sea route. **Singapore**, Aden, Honolulu.\n" +
        "- **Entrepot**: collects goods from many countries and ships them on. **Singapore** for Asia, **Rotterdam** for Europe, Copenhagen for the Baltic.\n" +
        "- **Naval port**: serves warships. **Kochi** and **Karwar** in India.\n" +
        "- **Packet station** (ferry port): short crossings for passengers and mail. **Dover** and **Calais** across the English Channel.\n" +
        "- **Out port**: a deep-water port built away from the main port, for ships too big to reach it. **Piraeus** for Athens.\n" +
        "Ports and banks CDS asked by name:\n" +
        "- **Hambantota**: a deep-water port on the southern coast of **Sri Lanka**, built with Chinese loans and leased to a Chinese company in 2017.\n" +
        "- **Dogger Bank**: in the **North Sea**, off the east coast of England. The **Grand Banks** lie off **Newfoundland**, Canada.",
      table: {
        columns: ["Kind of port", "What it does", "Examples"],
        rows: [
          { cells: ["Port of call", "A stop on a main sea route", "Singapore, Aden, Honolulu"] },
          { cells: ["Entrepot", "Collects goods and ships them on", "Singapore, Rotterdam, Copenhagen"] },
          { cells: ["Naval port", "Serves warships", "Kochi, Karwar"] },
          { cells: ["Packet station", "Short ferry crossings for passengers and mail", "Dover, Calais"] },
          { cells: ["Out port", "Takes ships too big for the main port", "Piraeus (for Athens)"] },
          {
            cells: ["Deep-water port (Sri Lanka)", "On the southern coast, leased to a Chinese company in 2017", "Hambantota"],
            noteAmber: "CDS 2018 (I): Hambantota is in Sri Lanka.",
            pyqExampleId: "a96d269f-d086-4982-9d8e-706c4b8bffd6",
          },
          {
            cells: ["Fishing bank off the United Kingdom", "Shallow North Sea ground off England's east coast", "Dogger Bank"],
            noteAmber: "CDS 2016 (II): Dogger Bank, not the Grand Banks or Reed Bank.",
            pyqExampleId: "75a64ae4-722e-4c94-b338-3f52266147ac",
          },
          { cells: ["Fishing bank off Canada", "Shallow Atlantic ground off Newfoundland", "Grand Banks"] },
        ],
      },
      pyqExampleId: "04e26889-274d-47c8-bee9-ebc877755f4a",
      selfCheckExample: {
        prompt: "Large ships bound for Athens dock at Piraeus, a deep-water harbour built a few kilometres away. What kind of port is Piraeus?",
        steps: [
          "Piraeus serves a parent city by taking the ships too big for it, at a site with deep water.",
          "NCERT calls such a port an out port.",
        ],
        answer: "An out port.",
      },
      practiceSet: [
        { prompt: "Which fishing bank lies off the coast of Newfoundland?", answer: "The Grand Banks" },
        { prompt: "Which port is the entrepot for Europe?", answer: "Rotterdam" },
        { prompt: "On which country's coast is Hambantota port?", answer: "Sri Lanka" },
      ],
      traps: [
        {
          title: "Dover is a packet station",
          body: "**Dover** runs short ferry crossings to Calais, so NCERT calls it a **packet station** (ferry port). The example of an **out port** is **Piraeus**, for Athens.",
        },
        {
          title: "Dogger is British, Grand Banks is Canadian",
          body: "**Dogger Bank** is in the North Sea off England. The **Grand Banks** are off Newfoundland, across the Atlantic. Both are famous fishing grounds, which is why they are offered together.",
        },
        {
          title: "One port, two jobs",
          body: "**Singapore** is both a **port of call** and an **entrepot**. A statement giving a port two kinds is not wrong for that reason alone.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgewo-rivers",
      name: "Rivers of Europe and South America",
      intuition:
        "For a river, CDS asks where it ends and which cities stand on it. Learn each river with its sea and its capitals. The trap is always a river that looks as if it belongs with the others but ends somewhere else.",
      definition:
        "Rivers of eastern Europe:\n" +
        "- The **Danube** ends in the **Black Sea**. It flows through four capitals: **Vienna, Bratislava, Budapest and Belgrade**.\n" +
        "- The **Dnieper** (through Kyiv) also ends in the Black Sea, and the **Don** reaches it through the Sea of Azov.\n" +
        "- The **Volga**, Europe's longest river, ends in the **Caspian Sea**, not the Black Sea.\n" +
        "- **Prague** stands on the **Vltava**, which joins the Elbe and so drains to the North Sea.\n" +
        "Rivers of western Europe and South America:\n" +
        "- The **Rhine** carries the traffic of Germany's Ruhr industrial belt and meets the North Sea in the Netherlands, where **Rotterdam** stands at its mouth.\n" +
        "- The **Rio de la Plata** (River Plate) is the wide estuary of the Parana and Uruguay rivers. **Buenos Aires** is on its south shore and **Montevideo** on its north.",
      table: {
        columns: ["River", "Where it ends", "Cities and facts"],
        rows: [
          { cells: ["Danube", "Black Sea", "Vienna, Bratislava, Budapest, Belgrade"] },
          { cells: ["Dnieper", "Black Sea", "Kyiv"] },
          { cells: ["Don", "Sea of Azov, an arm of the Black Sea", "Rostov-on-Don"] },
          {
            cells: ["Volga", "Caspian Sea", "Europe's longest river"],
            noteAmber: "CDS 2020 (I): the Volga is the one that does not drain into the Black Sea.",
            pyqExampleId: "56d4089f-3743-4047-9223-9c448ce7cff9",
          },
          { cells: ["Vltava", "Joins the Elbe, which reaches the North Sea", "Prague"] },
          { cells: ["Rhine", "North Sea, through the Netherlands", "Rotterdam at its mouth; the Ruhr joins it"] },
          {
            cells: ["Rio de la Plata (River Plate)", "Atlantic Ocean", "Buenos Aires (south shore), Montevideo (north shore)"],
            noteAmber: "CDS 2020 (II): Buenos Aires and Montevideo face each other across the River Plate.",
            pyqExampleId: "2a362a9a-9936-431e-89b8-355dcaf34bf0",
          },
        ],
      },
      pyqExampleId: "fe839dbd-8e1b-4628-8124-68063c0df480",
      selfCheckExample: {
        prompt: "The Don and the Dnieper both rise in Russia. Into which sea does the water of each one finally reach?",
        steps: [
          "The Dnieper flows south through Ukraine and empties straight into the Black Sea.",
          "The Don empties into the Sea of Azov, and the Sea of Azov is an arm of the Black Sea.",
        ],
        answer: "Both reach the Black Sea, the Don by way of the Sea of Azov.",
      },
      practiceSet: [
        { prompt: "Into which sea does the Volga flow?", answer: "The Caspian Sea" },
        { prompt: "Which port stands at the mouth of the Rhine?", answer: "Rotterdam" },
        { prompt: "Which two capitals face each other across the River Plate?", answer: "Buenos Aires and Montevideo" },
      ],
      traps: [
        {
          title: "The Volga goes to the Caspian",
          body: "The **Volga** is the river that does **not** reach the Black Sea: it ends in the **Caspian Sea**, a closed inland sea. The Danube, Dnieper and Don all reach the Black Sea.",
        },
        {
          title: "Prague is not a Danube city",
          body: "**Prague** stands on the **Vltava**, which joins the Elbe. The Danube's capitals are **Vienna, Bratislava, Budapest and Belgrade**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgewo-great-lakes",
      name: "The Great Lakes of North America",
      intuition:
        "The five Great Lakes form one chain of water from Superior in the west down to Ontario in the east, and the water leaves through the St Lawrence. Learn the chain in order, then hang one city on each lake.",
      definition:
        "From west to east along the chain:\n" +
        "- **Superior**: the largest and highest. Its chief port is **Duluth**. The **Soo Canal** at Sault Ste Marie lifts ships past the rapids between **Superior and Huron**.\n" +
        "- **Michigan**: the only one wholly inside the United States. **Chicago** and **Milwaukee** stand on it.\n" +
        "- **Huron**: joined to Michigan at the Straits of Mackinac.\n" +
        "- **Erie**: **Buffalo** and Cleveland stand on it. **Detroit** is on the Detroit River, which flows into Erie.\n" +
        "- **Ontario**: the lowest. **Toronto** stands on it, and the water flows out through the St Lawrence.",
      table: {
        columns: ["Lake", "City on it", "Remember"],
        rows: [
          {
            cells: ["Superior", "Duluth", "Largest; joined to Huron by the Soo Canal"],
            noteAmber: "CDS 2016 (II): the Soo Canal connects Superior and Huron.",
            pyqExampleId: "5dfe8f48-51f8-4776-be9f-d09b339b632d",
          },
          { cells: ["Michigan", "Chicago, Milwaukee", "The only one wholly inside the United States"] },
          { cells: ["Huron", "Goderich (Canada)", "Second largest of the five"] },
          { cells: ["Erie", "Buffalo, Cleveland", "Detroit is on the river flowing into it"] },
          { cells: ["Ontario", "Toronto", "The lowest; drains to the St Lawrence"] },
        ],
      },
      pyqExampleId: "970d6861-dc49-40aa-a96b-53bd9f674243",
      selfCheckExample: {
        prompt: "A ship sails from Duluth to Toronto through the Great Lakes. Name the lakes it crosses, in order.",
        steps: [
          "Duluth is on Lake Superior, at the western end of the chain.",
          "From Superior the ship passes the Soo Canal into Huron, then goes down to Erie.",
          "From Erie it reaches Ontario, where Toronto stands. Michigan is a side lake it never enters.",
        ],
        answer: "Superior, Huron, Erie, Ontario.",
      },
      practiceSet: [
        { prompt: "Which is the largest of the Great Lakes?", answer: "Lake Superior" },
        { prompt: "On which Great Lake does Chicago stand?", answer: "Lake Michigan" },
        { prompt: "Which canal lets ships pass between Lake Superior and Lake Huron?", answer: "The Soo Canal" },
      ],
      traps: [
        {
          title: "Detroit is on the Erie side",
          body: "**Detroit** stands on the Detroit River, which flows into **Lake Erie**. It is nowhere near Lake **Superior**, whose port is **Duluth**.",
        },
        {
          title: "The Soo Canal is Superior to Huron",
          body: "The **Soo Canal** joins **Superior** and **Huron**, not Superior and Michigan. Michigan meets Huron at the Straits of Mackinac, with no canal needed.",
        },
      ],
    },
  ],
};
