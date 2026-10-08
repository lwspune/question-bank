import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_HIS_TWENTIETH_NOTE: SubtopicNote = {
  subtopicName: "The Twentieth Century",
  title: "The World Wars, the Cold War and European Integration",
  oneLineDefinition:
    "Two world wars, the Russian Revolution, a long Cold War between the USA and the USSR, the end of the colonial empires and the building of the European Union.",
  whyItMatters:
    "The Cambridge papers asked which treaty created the European Coal and Steel Community, when the October Revolution happened relative to older events, and who first orbited the Earth. Dates and treaties are the usual shape.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-his-first-world-war",
      name: "The First World War and the Russian Revolution",
      intuition:
        "A single assassination in Sarajevo pulled Europe's alliance system into a war that killed about ten million soldiers. The strain of the war brought down four empires: the German, Austro-Hungarian, Russian and Ottoman. In Russia it led to the first communist state.",
      definition:
        "- **Allies** (Entente): France, Britain, Russia, later **Italy** (1915) and the **USA** (1917).\n" +
        "- **Central Powers**: Germany, Austria-Hungary, the Ottoman Empire, Bulgaria.\n" +
        "- Italy was allied with Germany and Austria before the war but stayed neutral in 1914, then joined the Allies after the secret Treaty of London (1915).\n" +
        "- **Russian Revolution, 1917**: in **February** the tsar abdicated; in **October** Lenin's **Bolsheviks** seized power. Russia then used the old Julian calendar, so the October Revolution fell on 7 November by the Western calendar.",
      table: {
        columns: ["Date", "Event", "Fact to remember"],
        rows: [
          { cells: ["28 June 1914", "Archduke Franz Ferdinand of Austria assassinated in Sarajevo", "The trigger of the war"] },
          { cells: ["1914 to 1918", "First World War", "Trench warfare on the Western Front"] },
          { cells: ["24 May 1915", "Italy enters the war against Austria", "Defeat at Caporetto (1917); victory at Vittorio Veneto (1918)"] },
          { cells: ["1917", "February and October Revolutions in Russia", "Lenin and the Bolsheviks take power; the USSR is formed in 1922"] },
          { cells: ["1917", "USA enters the war", "President Woodrow Wilson"] },
          { cells: ["11 November 1918", "Armistice ends the fighting", "Germany signs in a railway carriage at Compiègne"] },
          { cells: ["1919", "Treaty of Versailles", "Germany loses land and pays reparations; League of Nations founded (1920)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of these countries fought on the side of the Central Powers in the First World War?",
        options: ["Italy", "Russia", "The United States", "The Ottoman Empire", "Serbia"],
        steps: [
          "The Central Powers were Germany, Austria-Hungary, the Ottoman Empire and Bulgaria.",
          "Italy joined the Allies in 1915 despite its earlier alliance with Germany and Austria; Russia, the USA and Serbia were all on the Allied side.",
        ],
        answer: "(D) The Ottoman Empire",
      },
      practiceSet: [
        { prompt: "In which city was Franz Ferdinand assassinated?", answer: "Sarajevo" },
        { prompt: "Who led the Bolsheviks in the October Revolution?", answer: "Vladimir Lenin" },
        { prompt: "Which treaty ended the First World War with Germany?", answer: "The Treaty of Versailles (1919)" },
      ],
      traps: [
        {
          title: "The October Revolution happened in November",
          body: "Russia still used the Julian calendar in 1917, which was 13 days behind the Western one. The Bolshevik seizure of power on 25 October (Julian) was 7 November (Western). Both names refer to the same 1917 event.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-his-second-world-war",
      name: "Between the wars and the Second World War",
      intuition:
        "Economic crisis and resentment after 1918 helped dictators rise in Italy and Germany. Hitler's expansion led to a second, even larger war, fought from Europe to the Pacific. Italy's story has its own dates: Mussolini's fall in 1943, the armistice, the Resistance and liberation in 1945.",
      definition:
        "- **Fascism** (Mussolini, Italy) and **Nazism** (Hitler, Germany) were one-party, nationalist dictatorships.\n" +
        "- **Axis**: Germany, Italy, Japan. **Allies**: Britain, France, then the USSR and the USA (both from 1941), and others.\n" +
        "- The **Holocaust**: Nazi Germany murdered about six million Jews, along with Roma, disabled people and others.",
      table: {
        columns: ["Date", "Event", "Fact to remember"],
        rows: [
          { cells: ["October 1922", "March on Rome", "Mussolini becomes prime minister; dictatorship from 1925"] },
          { cells: ["October 1929", "Wall Street Crash", "Start of the Great Depression"] },
          { cells: ["January 1933", "Hitler becomes chancellor of Germany", "Nazi dictatorship follows within months"] },
          { cells: ["1 September 1939", "Germany invades Poland", "Britain and France declare war on 3 September"] },
          { cells: ["10 June 1940", "Italy enters the war", "France falls the same month"] },
          { cells: ["1941", "Germany invades the USSR (June); Japan attacks Pearl Harbor (7 December)", "The USSR and the USA enter the war"] },
          { cells: ["1943", "Allies land in Sicily; Mussolini removed on 25 July; armistice announced on 8 September", "Germany occupies northern and central Italy; the Resistance begins"] },
          { cells: ["6 June 1944", "D-Day: Allied landings in Normandy", "Opens the Western front in France"] },
          { cells: ["1945", "Liberation of Italy (25 April); German surrender (8 May); atomic bombs on Hiroshima (6 August) and Nagasaki (9 August); Japan surrenders (2 September)", "End of the war; the United Nations founded"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which event brought the United States into the Second World War?",
        options: [
          "The Japanese attack on Pearl Harbor",
          "The German invasion of Poland",
          "The fall of France",
          "The Allied landings in Sicily",
          "The German invasion of the Soviet Union",
        ],
        steps: [
          "The USA entered the war after Japan attacked the US naval base at Pearl Harbor, Hawaii, on 7 December 1941.",
          "The invasion of Poland (1939) brought in Britain and France; the invasion of the USSR (June 1941) brought in the Soviet Union; the Sicily landings (1943) came after the USA was already fighting.",
        ],
        answer: "(A) The Japanese attack on Pearl Harbor",
      },
      practiceSet: [
        { prompt: "What is celebrated in Italy on 25 April?", answer: "Liberation Day (1945)" },
        { prompt: "On which two Japanese cities were atomic bombs dropped?", answer: "Hiroshima and Nagasaki (August 1945)" },
        { prompt: "Which country did Germany invade on 1 September 1939?", answer: "Poland" },
      ],
      traps: [
        {
          title: "The war in Europe and the war in the Pacific ended at different times",
          body: "Germany surrendered on 8 May 1945. Japan surrendered only after the atomic bombs, formally on 2 September 1945. So \"the end of the Second World War\" is 1945 either way, but the month depends on which war is meant.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-his-cold-war",
      name: "The Cold War, the space race and decolonisation",
      intuition:
        "After 1945 the USA and the USSR were the two superpowers, with rival systems: capitalist democracy and communist one-party rule. They never fought each other directly; they competed through alliances, an arms race and a space race. At the same time the European empires in Asia and Africa broke up into new independent states.",
      definition:
        "- **Cold War**: about **1947 to 1991**. Europe was divided by the \"Iron Curtain\"; Germany was split into the Federal Republic (West) and the Democratic Republic (East) in 1949.\n" +
        "- Alliances: **NATO** (1949, West) and the **Warsaw Pact** (1955, East).\n" +
        "- **Decolonisation**: India (1947, after Gandhi's non-violent campaign), much of Africa around **1960** (the \"Year of Africa\", 17 new states), Algeria from France (1962).\n" +
        "- The Cold War ended with the fall of the Berlin Wall (1989) and the break-up of the USSR (December 1991).",
      table: {
        columns: ["Date", "Event", "Fact to remember"],
        rows: [
          { cells: ["1947", "India and Pakistan become independent", "Gandhi is assassinated in January 1948"] },
          { cells: ["1949", "NATO founded; Germany divided; People's Republic of China proclaimed by Mao", "The Cold War takes shape"] },
          { cells: ["October 1957", "USSR launches Sputnik 1", "First artificial satellite; start of the space race"] },
          { cells: ["12 April 1961", "Yuri Gagarin orbits the Earth", "First human in space (USSR)"] },
          { cells: ["August 1961", "Berlin Wall built", "Divides East and West Berlin"] },
          { cells: ["October 1962", "Cuban Missile Crisis", "Closest the superpowers came to nuclear war"] },
          { cells: ["20 July 1969", "Apollo 11: Neil Armstrong walks on the Moon", "First humans on the Moon (USA)"] },
          { cells: ["9 November 1989", "Fall of the Berlin Wall", "Germany reunited on 3 October 1990"] },
          { cells: ["December 1991", "USSR dissolved", "End of the Cold War"] },
          { cells: ["1994", "Nelson Mandela elected president of South Africa", "End of apartheid"] },
        ],
      },
      selfCheckExample: {
        prompt: "In which year was the Berlin Wall built?",
        options: ["1945", "1949", "1961", "1989", "1991"],
        steps: [
          "The East German government built the wall in August 1961 to stop people leaving for the West.",
          "1945 is the end of the war, 1949 the division of Germany into two states, 1989 the fall of the wall and 1991 the end of the USSR.",
        ],
        answer: "(C) 1961",
      },
      practiceSet: [
        { prompt: "What was the first artificial satellite, and which country launched it?", answer: "Sputnik 1, the USSR (1957)" },
        { prompt: "On what date was Germany reunified?", answer: "3 October 1990" },
        { prompt: "Which Eastern alliance was the rival of NATO?", answer: "The Warsaw Pact (1955)" },
      ],
      traps: [
        {
          title: "First in orbit, first on the Moon, first woman: three different people",
          body: "Yuri Gagarin (USSR) was the first human in space and in orbit (1961). Valentina Tereshkova (USSR) was the first woman in space (1963). Neil Armstrong (USA) was the first person on the Moon (1969). John Glenn was the first American to orbit the Earth (1962).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-his-eu-history",
      name: "How the European Union was built, treaty by treaty",
      intuition:
        "European integration began with coal and steel, the raw materials of war: if France and Germany shared them, a new war between them would be almost impossible. Each later treaty added more shared policies and more members. Learn each treaty with the city where it was signed and the one thing it created.",
      definition:
        "- **Founding six** (1951): Belgium, France, West Germany, Italy, Luxembourg, the Netherlands.\n" +
        "- \"Founding fathers\" include **Robert Schuman** and **Jean Monnet** (France), **Konrad Adenauer** (Germany), **Alcide De Gasperi** and **Altiero Spinelli** (Italy). Spinelli's Ventotene Manifesto (1941) called for a federal Europe.\n" +
        "- 9 May, the date of the Schuman Declaration, is **Europe Day**.",
      table: {
        columns: ["Year", "Treaty or step", "What it did"],
        rows: [
          { cells: ["1951", "Treaty of Paris", "Created the European Coal and Steel Community (ECSC)"] },
          { cells: ["1957", "Treaties of Rome", "Created the European Economic Community (EEC) and Euratom"] },
          { cells: ["1973", "First enlargement", "United Kingdom, Ireland and Denmark join"] },
          { cells: ["1979", "First direct elections to the European Parliament", "Citizens vote for MEPs"] },
          { cells: ["1985", "Schengen Agreement", "Removal of internal border checks (in force from 1995)"] },
          { cells: ["1992", "Treaty of Maastricht (in force 1993)", "Created the European Union and planned the euro"] },
          { cells: ["1999 and 2002", "Euro launched", "Electronic money in 1999; notes and coins on 1 January 2002"] },
          { cells: ["2004", "Largest enlargement", "Ten countries join, mostly from Central and Eastern Europe"] },
          { cells: ["2007 (in force 2009)", "Treaty of Lisbon", "Current rules of the EU; a permanent President of the European Council"] },
          { cells: ["31 January 2020", "Brexit", "The United Kingdom leaves; 27 members remain"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which treaty created the European Union itself?",
        options: ["The Treaty of Paris", "The Treaties of Rome", "The Treaty of Lisbon", "The Schengen Agreement", "The Treaty of Maastricht"],
        steps: [
          "The European Union was created by the Treaty of Maastricht, signed in 1992 and in force in 1993.",
          "Paris (1951) created the ECSC, Rome (1957) the EEC; Lisbon (2007) reformed the existing EU; Schengen is about border checks.",
        ],
        answer: "(E) The Treaty of Maastricht",
      },
      practiceSet: [
        { prompt: "Which six countries founded the ECSC?", answer: "Belgium, France, West Germany, Italy, Luxembourg, the Netherlands" },
        { prompt: "In which year was the European Parliament first directly elected?", answer: "1979" },
        { prompt: "What did the Treaties of Rome (1957) create?", answer: "The European Economic Community and Euratom" },
      ],
      traps: [
        {
          title: "Paris made the ECSC, Rome made the EEC",
          body: "The two founding treaties are often swapped. The Treaty of Paris (1951) set up the Coal and Steel Community; the Treaties of Rome (1957) set up the Economic Community and Euratom. Maastricht (1992) created the EU, and Lisbon (2007) is the most recent reform.",
        },
      ],
    },
  ],
};
