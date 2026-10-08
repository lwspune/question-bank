import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_PES_INTERNATIONAL_NOTE: SubtopicNote = {
  subtopicName: "The EU and International Organisations",
  title: "The European Union, the Euro and International Organisations",
  oneLineDefinition:
    "Who does what in the EU, which countries use the euro, and the seats, roles and acronyms of the UN agencies, NATO, the financial institutions and the human rights bodies.",
  whyItMatters:
    "This is the most asked theme in the chapter's Cambridge papers: UN Security Council members, the UN's stated purposes, WHO's headquarters, the letters in OPEC and FAO, NATO's founders, UNESCO, the WTO, the euro and which EU body is directly elected.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-pes-eu-institutions",
      name: "The institutions of the European Union",
      intuition:
        "The EU has its own law-making system. The Commission proposes laws, and two bodies must agree to pass them: the Parliament, which represents citizens, and the Council of the EU, which represents national governments. The European Council of leaders sets the general direction but does not make laws.",
      definition:
        "- The **European Parliament** is the only EU institution **directly elected** by citizens (every 5 years, since 1979).\n" +
        "- The **European Commission** is the EU's executive: it proposes laws and enforces the treaties. One commissioner per member state.\n" +
        "- The **Council of the European Union** (ministers, by policy area) and the **European Council** (heads of state or government) are different bodies. The **Council of Europe** is not an EU body at all.\n" +
        "- The **ordinary legislative procedure**: Commission proposes, Parliament and Council adopt.",
      table: {
        columns: ["Institution", "Who sits in it", "How chosen", "Seat"],
        rows: [
          { cells: ["European Parliament", "Members of the European Parliament (720 elected in 2024)", "Direct election by citizens every 5 years", "Strasbourg (plenary sessions); also Brussels and Luxembourg"] },
          { cells: ["European Council", "Heads of state or government, its President and the Commission President", "Members by office; its President chosen for 2.5 years", "Brussels"] },
          { cells: ["Council of the European Union", "One minister per member state", "Members by office; the presidency rotates every 6 months", "Brussels"] },
          { cells: ["European Commission", "One commissioner per member state", "President proposed by the European Council and elected by Parliament; 5-year term", "Brussels"] },
          { cells: ["Court of Justice of the EU", "One judge per member state", "Appointed by the governments for 6 years", "Luxembourg"] },
          { cells: ["European Central Bank", "Executive Board and euro-area central bank governors", "Appointed", "Frankfurt"] },
        ],
      },
      selfCheckExample: {
        prompt: "In which city does the Court of Justice of the European Union sit?",
        options: ["Brussels", "Strasbourg", "Luxembourg", "The Hague", "Frankfurt"],
        steps: [
          "The Court of Justice of the EU is in Luxembourg.",
          "Brussels hosts the Commission and Councils, Strasbourg the Parliament's plenary sessions (and the Council of Europe's human rights court), The Hague the UN's International Court of Justice, Frankfurt the European Central Bank.",
        ],
        answer: "(C) Luxembourg",
      },
      practiceSet: [
        { prompt: "Which EU institution proposes new laws?", answer: "The European Commission" },
        { prompt: "How often are European Parliament elections held?", answer: "Every 5 years" },
        { prompt: "Where is the European Central Bank?", answer: "Frankfurt" },
      ],
      traps: [
        {
          title: "Three councils, only two of them in the EU",
          body: "The European Council (leaders) and the Council of the European Union (ministers) are both EU institutions. The Council of Europe, in Strasbourg, is a separate organisation of 46 states that runs the European Court of Human Rights.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-euro",
      name: "The euro and EU membership",
      intuition:
        "The euro is the currency of most, but not all, EU members. A country must meet economic tests to join, and two members have chosen to stay out. Knowing the original twelve and the later joiners answers most euro questions.",
      definition:
        "- The euro was launched for banks and markets on **1 January 1999**; notes and coins arrived on **1 January 2002** in **12 countries**.\n" +
        "- Monetary policy for the euro area is set by the **European Central Bank** in Frankfurt.\n" +
        "- **Maastricht convergence criteria**: government **deficit at most 3% of GDP**, **public debt at most 60% of GDP**, low inflation, low long-term interest rates and a stable exchange rate.\n" +
        "- **Denmark** has a legal opt-out from the euro; **Sweden** stays out by not joining the exchange-rate mechanism.",
      table: {
        columns: ["Group", "Countries", "Remember"],
        rows: [
          { cells: ["Euro notes and coins from 1 January 2002", "Austria, Belgium, Finland, France, Germany, Greece, Ireland, Italy, Luxembourg, Netherlands, Portugal, Spain", "Twelve countries; Greece had joined in 2001"] },
          { cells: ["Later members", "Slovenia 2007, Cyprus and Malta 2008, Slovakia 2009, Estonia 2011, Latvia 2014, Lithuania 2015, Croatia 2023, Bulgaria 2026", "21 euro countries in 2026"] },
          { cells: ["EU members outside the euro (2026)", "Czechia, Denmark, Hungary, Poland, Romania, Sweden", "Each keeps its own currency"] },
          { cells: ["Non-EU users of the euro", "Andorra, Monaco, San Marino and Vatican City by agreement; Montenegro and Kosovo on their own", "Not members of the euro area's decisions"] },
          { cells: ["EU membership", "27 states since the United Kingdom left on 31 January 2020", "Norway, Switzerland and Iceland are not EU members"] },
        ],
      },
      selfCheckExample: {
        prompt: "Under the Maastricht criteria, a government's annual deficit should not be above what share of GDP?",
        options: ["1%", "10%", "60%", "2%", "3%"],
        steps: [
          "The deficit limit is 3% of GDP.",
          "60% is the limit for total public debt, a different figure; 2% is the ECB's inflation target, not a deficit rule.",
        ],
        answer: "(E) 3%",
      },
      practiceSet: [
        { prompt: "On what date did euro notes and coins enter circulation?", answer: "1 January 2002" },
        { prompt: "Which EU member has a legal opt-out from the euro?", answer: "Denmark" },
        { prompt: "What is the Maastricht limit for public debt?", answer: "60% of GDP" },
      ],
      traps: [
        {
          title: "EU member does not mean euro user",
          body: "Sweden, Denmark, Poland, Hungary, Czechia and Romania are EU members with their own currencies (the krona, krone, złoty, forint, koruna and leu). Meanwhile some non-EU microstates use the euro. Check both lists.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-un",
      name: "The United Nations and its agencies",
      intuition:
        "The UN was founded in 1945 to prevent another world war. Its Security Council can take binding decisions on peace and war, but any of its five permanent members can block them with a veto. Around it sit specialised agencies, each with its own job and headquarters city.",
      definition:
        "- The **UN Charter** was signed in **San Francisco** in June 1945; the UN came into being on **24 October 1945**. Headquarters: **New York**. 193 member states.\n" +
        "- Its **purposes** (Charter, article 1): to maintain international **peace and security**; to develop **friendly relations** among nations; to achieve **international co-operation** on economic, social, cultural and humanitarian problems and human rights; to be a **centre for harmonizing** the actions of nations.\n" +
        "- **Security Council**: 15 members, of which **5 permanent with a veto**: China, France, Russia, the United Kingdom, the USA; 10 elected for two years.\n" +
        "- The **International Court of Justice** (The Hague) settles disputes between states.",
      table: {
        columns: ["Agency", "Full name", "Headquarters", "Role"],
        rows: [
          { cells: ["WHO", "World Health Organization (1948)", "Geneva", "International public health; World Health Day is 7 April"] },
          { cells: ["UNESCO", "UN Educational, Scientific and Cultural Organization", "Paris", "Education, science, culture; keeps the World Heritage List"] },
          { cells: ["UNICEF", "UN Children's Fund", "New York", "Children's health, education and rights"] },
          { cells: ["FAO", "Food and Agriculture Organization", "Rome", "Fights hunger; Rome also hosts the World Food Programme and IFAD"] },
          { cells: ["UNHCR", "UN High Commissioner for Refugees", "Geneva", "Protects refugees"] },
          { cells: ["ILO", "International Labour Organization (1919)", "Geneva", "Labour standards and workers' rights"] },
          { cells: ["IAEA", "International Atomic Energy Agency", "Vienna", "Peaceful use of nuclear energy"] },
        ],
      },
      selfCheckExample: {
        prompt: "How many permanent members does the UN Security Council have?",
        options: ["15", "10", "7", "5", "3"],
        steps: [
          "There are five permanent members with a veto: China, France, Russia, the United Kingdom and the United States.",
          "15 is the total membership of the Council, 10 the number of elected (non-permanent) members.",
        ],
        answer: "(D) 5",
      },
      practiceSet: [
        { prompt: "In which city is the UN headquarters?", answer: "New York" },
        { prompt: "Which UN agency is based in Paris?", answer: "UNESCO" },
        { prompt: "Where is the International Court of Justice?", answer: "The Hague" },
      ],
      traps: [
        {
          title: "Promoting trade is not one of the UN's stated purposes",
          body: "Article 1 of the Charter lists peace and security, friendly relations, international co-operation and harmonizing nations' actions. Rules of international trade belong to a separate organisation, the WTO.",
        },
        {
          title: "Big economies are not automatically permanent members",
          body: "The five permanent members are the main victors of 1945: China, France, Russia, the UK and the USA. Japan, Germany, India and Brazil are not permanent members, though they have campaigned for seats.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-other-organisations",
      name: "NATO, the Bretton Woods institutions and other organisations",
      intuition:
        "Most of these organisations were created between 1944 and 1961 to rebuild and protect the Western world after the war: a military alliance, institutions for money and development, and clubs of rich or oil-producing countries. Learn the acronym, the founding date and the seat.",
      definition:
        "- **Bretton Woods** (USA, 1944) created the **IMF** and the **World Bank**, both in **Washington DC**.\n" +
        "- **NATO**'s Article 5: an armed attack on one member is an attack on all.\n" +
        "- **NATO founders (1949)**: USA, Canada, United Kingdom, France, Italy, Belgium, Netherlands, Luxembourg, Denmark, Norway, Iceland, Portugal. West Germany joined in 1955; there were 32 members in 2024.\n" +
        "- **G7**: Canada, France, Germany, Italy, Japan, the UK and the USA.",
      table: {
        columns: ["Organisation", "Founded and seat", "Role"],
        rows: [
          { cells: ["NATO (North Atlantic Treaty Organization)", "1949; Brussels", "Military alliance for collective defence"] },
          { cells: ["IMF (International Monetary Fund)", "1944; Washington DC", "Short-term loans to countries in balance-of-payments crises; watches exchange rates"] },
          { cells: ["World Bank", "1944; Washington DC", "Long-term loans for development and reducing poverty"] },
          { cells: ["WTO (World Trade Organization)", "1995, replacing GATT (1947); Geneva", "Sets and enforces the rules of trade between nations; settles trade disputes"] },
          { cells: ["OECD (Organisation for Economic Co-operation and Development)", "1961; Paris", "Policy research among advanced economies; runs the PISA school tests"] },
          { cells: ["OPEC (Organization of the Petroleum Exporting Countries)", "1960 in Baghdad; Vienna", "Coordinates oil production among producers"] },
          { cells: ["Council of Europe", "1949; Strasbourg", "Human rights and democracy; not part of the EU"] },
        ],
      },
      selfCheckExample: {
        prompt: "In which city does NATO have its headquarters?",
        options: ["Brussels", "Washington DC", "Geneva", "Paris", "Vienna"],
        steps: [
          "NATO's headquarters are in Brussels.",
          "Its founding treaty was signed in Washington (1949), which tempts people; Geneva hosts the WTO and WHO, Paris the OECD, Vienna OPEC.",
        ],
        answer: "(A) Brussels",
      },
      practiceSet: [
        { prompt: "Which 1944 conference created the IMF and the World Bank?", answer: "Bretton Woods" },
        { prompt: "Which organisation runs the PISA tests?", answer: "The OECD" },
        { prompt: "In what year did West Germany join NATO?", answer: "1955" },
      ],
      traps: [
        {
          title: "IMF, World Bank and WTO do different jobs",
          body: "The IMF lends to stabilise a country's finances in a crisis; the World Bank lends for long-term development; the WTO makes and enforces trade rules and has no money to lend. Options swap the three.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-human-rights",
      name: "Human rights texts and non-governmental organisations",
      intuition:
        "After the Second World War, states wrote down the rights every person has, first as a declaration and then as binding treaties. Alongside governments, private non-governmental organisations (NGOs) campaign for those rights or deliver aid, and several have won the Nobel Peace Prize.",
      definition:
        "- The **Universal Declaration of Human Rights** (UDHR) was adopted by the UN General Assembly in Paris on **10 December 1948** (now Human Rights Day). It is a declaration, not a binding treaty.\n" +
        "- The **European Convention on Human Rights** (1950) is binding and enforced by the **European Court of Human Rights** in Strasbourg.\n" +
        "- An **NGO** is an organisation independent of government. **Amnesty International** opposes the death penalty in all cases, on human-rights grounds (the right to life, the ban on cruel punishment, the risk of executing the innocent), not religious ones.",
      table: {
        columns: ["Body or text", "Date and place", "What it is"],
        rows: [
          { cells: ["Universal Declaration of Human Rights", "10 December 1948, Paris", "30 articles of basic rights, adopted by the UN"] },
          { cells: ["European Convention on Human Rights", "1950, Council of Europe", "Binding treaty; enforced by the court in Strasbourg"] },
          { cells: ["International Committee of the Red Cross", "1863, Geneva; founder Henry Dunant", "Neutral help to victims of war; guardian of the Geneva Conventions; Dunant shared the first Nobel Peace Prize (1901)"] },
          { cells: ["Amnesty International", "1961, London", "Human rights campaigns; against torture and the death penalty"] },
          { cells: ["Médecins Sans Frontières", "1971, Paris", "Independent medical aid in wars and disasters; Nobel Peace Prize 1999"] },
          { cells: ["Greenpeace", "1971, Vancouver", "Environmental campaigns"] },
          { cells: ["Emergency", "1994, Milan; founder Gino Strada", "Free surgery and care for victims of war"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which court enforces the European Convention on Human Rights?",
        options: [
          "The Court of Justice of the EU, in Luxembourg",
          "The European Court of Human Rights, in Strasbourg",
          "The International Court of Justice, in The Hague",
          "The International Criminal Court, in The Hague",
          "The Italian Constitutional Court, in Rome",
        ],
        steps: [
          "The Convention belongs to the Council of Europe, and its court is the European Court of Human Rights in Strasbourg.",
          "The Luxembourg court applies EU law; the International Court of Justice settles disputes between states; the International Criminal Court tries individuals for war crimes.",
        ],
        answer: "(B) The European Court of Human Rights, in Strasbourg",
      },
      practiceSet: [
        { prompt: "On what date was the Universal Declaration of Human Rights adopted?", answer: "10 December 1948" },
        { prompt: "Who founded the Red Cross?", answer: "Henry Dunant (1863)" },
        { prompt: "What is the English name of Médecins Sans Frontières?", answer: "Doctors Without Borders" },
      ],
      traps: [
        {
          title: "The UDHR is a declaration, not a treaty",
          body: "The Universal Declaration of 1948 states rights but does not bind states by itself. Binding obligations come from later treaties such as the European Convention (1950) and the UN covenants of 1966.",
        },
      ],
    },
  ],
};
