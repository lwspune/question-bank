import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_PES_ECONOMICS_NOTE: SubtopicNote = {
  subtopicName: "Basic Economics",
  title: "Basic Economics: Markets, Measures, Policy and Economists",
  oneLineDefinition:
    "How supply and demand set prices, what GDP, inflation and unemployment measure, how central banks and governments steer the economy, and which economist said what.",
  whyItMatters:
    "The Cambridge papers asked who introduced the invisible hand, which field studies the prisoner's dilemma, and which currency belongs to which country. Basic economic vocabulary also appears in reading passages, so it pays twice.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-pes-markets",
      name: "Supply, demand and market prices",
      intuition:
        "In a market, buyers want more of a good when it is cheap and sellers offer more when it is expensive. The price settles where the two amounts match: the equilibrium. Anything that shifts the buyers' or the sellers' plans moves that price, in a direction you can work out.",
      definition:
        "- **Law of demand**: as the price rises, the quantity demanded falls.\n" +
        "- **Law of supply**: as the price rises, the quantity supplied rises.\n" +
        "- **Equilibrium**: the price at which quantity demanded equals quantity supplied.\n" +
        "- **Market structures**: **perfect competition** (many sellers), **oligopoly** (a few), **monopoly** (one seller), **monopsony** (one buyer).",
      table: {
        columns: ["Change", "Effect on price", "Effect on quantity traded"],
        rows: [
          { cells: ["Demand rises (more buyers, higher incomes, a fashion)", "Rises", "Rises"] },
          { cells: ["Demand falls", "Falls", "Falls"] },
          { cells: ["Supply rises (cheaper inputs, better technology)", "Falls", "Rises"] },
          { cells: ["Supply falls (bad harvest, new tax on producers)", "Rises", "Falls"] },
          { cells: ["Maximum price set below equilibrium (price ceiling)", "Held down", "Shortage: buyers want more than sellers offer"] },
          { cells: ["Minimum price set above equilibrium (price floor)", "Held up", "Surplus: sellers offer more than buyers want"] },
        ],
      },
      selfCheckExample: {
        prompt: "A late frost destroys much of a country's grape harvest, while demand for grapes is unchanged. What happens in the grape market?",
        options: [
          "The price falls and the quantity sold rises",
          "The price falls and the quantity sold falls",
          "The price rises and the quantity sold rises",
          "The price rises and the quantity sold falls",
          "Neither the price nor the quantity changes",
        ],
        steps: [
          "The frost reduces supply: at every price, growers have fewer grapes to sell.",
          "With demand unchanged, less supply pushes the price up and the quantity traded down. Prices fall only when supply rises or demand falls.",
        ],
        answer: "(D) The price rises and the quantity sold falls",
      },
      practiceSet: [
        { prompt: "What is a market with only one seller called?", answer: "A monopoly" },
        { prompt: "A government sets a maximum rent below the market level. What tends to follow?", answer: "A shortage of homes to rent" },
        { prompt: "What happens to the price of a good when its demand rises and supply is unchanged?", answer: "It rises" },
      ],
      traps: [
        {
          title: "A price floor causes a surplus, a ceiling a shortage",
          body: "A minimum price above equilibrium keeps the price high, so sellers offer more than buyers want: a surplus. A maximum price below equilibrium keeps it low, so buyers want more than is offered: a shortage. Students often reverse them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-macro-measures",
      name: "GDP, inflation and unemployment",
      intuition:
        "Three numbers summarise how an economy is doing: how much it produces (GDP), how fast prices rise (inflation), and how many people who want work cannot find it (unemployment). Each has an exact definition, and exam options use the near-misses.",
      definition:
        "- **Gross Domestic Product (GDP)**: the market value of all final goods and services produced in a country in a year. **Real GDP** removes the effect of inflation. **GDP per capita** is GDP divided by the population.\n" +
        "- **Inflation**: a general, sustained rise in prices, measured by a **consumer price index**. **Deflation** is a general fall.\n" +
        "- **Unemployment rate**: the unemployed (without work and looking for it) divided by the **labour force** (employed plus unemployed).\n" +
        "- **Recession**: a fall in real GDP, often defined as two quarters in a row.",
      table: {
        columns: ["Measure", "Definition", "Note"],
        rows: [
          { cells: ["GDP", "Value of final goods and services produced within a country in a year", "Counts production inside the borders, whoever owns it"] },
          { cells: ["GNI (formerly GNP)", "Income earned by a country's residents, at home or abroad", "Adds income from abroad, subtracts income paid abroad"] },
          { cells: ["Inflation", "General rise in prices", "The ECB aims for 2% a year over the medium term"] },
          { cells: ["Stagflation", "High inflation with weak growth and high unemployment", "Seen after the oil shocks of the 1970s"] },
          { cells: ["Unemployment rate", "Unemployed divided by labour force", "People not looking for work are outside the labour force"] },
          { cells: ["Budget deficit and public debt", "Deficit: one year's spending above revenue; debt: total borrowing accumulated", "EU limits: 3% and 60% of GDP"] },
          { cells: ["Gini coefficient", "Measure of income inequality from 0 (all equal) to 1 (one person has everything)", "Higher means more unequal"] },
        ],
      },
      selfCheckExample: {
        prompt: "A country has 46 million people in work and 4 million unemployed people looking for work. What is its unemployment rate?",
        options: ["4%", "8.7%", "8%", "12.5%", "92%"],
        steps: [
          "The labour force is the employed plus the unemployed: 46 + 4 = 50 million.",
          "Unemployment rate = 4 / 50 = 0.08 = 8%. Dividing by the employed only (4 / 46) gives the 8.7% trap; 92% is the employment share.",
        ],
        answer: "(C) 8%",
      },
      practiceSet: [
        { prompt: "What does real GDP remove from the GDP figure?", answer: "The effect of price changes (inflation)" },
        { prompt: "What is a general fall in prices called?", answer: "Deflation" },
        { prompt: "Prices rise from 200 to 210 over a year. What is the inflation rate?", answer: "5%", method: "\\(10/200 = 0.05\\)" },
      ],
      traps: [
        {
          title: "Unemployed means looking for work",
          body: "A student, a retired person or someone who has stopped looking is not counted as unemployed; they are outside the labour force. The rate divides the unemployed by the labour force, not by the whole population.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-economic-policy",
      name: "Monetary policy, fiscal policy and central banks",
      intuition:
        "Two levers steer an economy. The central bank controls the price of money (interest rates); the government controls taxes and its own spending. Pull both towards more spending in a recession, and towards less when inflation is too high.",
      definition:
        "- **Monetary policy**: set by the **central bank**, mainly through **interest rates** and buying or selling bonds. In the euro area this is the **European Central Bank** (Frankfurt), whose main goal is **price stability**; the Bank of Italy is part of the Eurosystem.\n" +
        "- **Fiscal policy**: set by the **government and parliament** through **taxes** and **public spending** (the budget).\n" +
        "- **Expansionary** policy (lower rates, lower taxes, more spending) fights recession; **contractionary** policy fights inflation.\n" +
        "- Modern central banks are **independent** of government.",
      table: {
        columns: ["Term", "Who acts", "Tools or role"],
        rows: [
          { cells: ["Monetary policy", "Central bank", "Interest rates, bond purchases, money supply"] },
          { cells: ["Fiscal policy", "Government and parliament", "Taxes and public spending"] },
          { cells: ["Expansionary policy", "Either", "Cut rates, cut taxes or raise spending to boost demand"] },
          { cells: ["Contractionary policy", "Either", "Raise rates, raise taxes or cut spending to cool inflation"] },
          { cells: ["European Central Bank", "Euro area, Frankfurt (1998)", "Sets interest rates for the euro; inflation target 2%"] },
          { cells: ["Federal Reserve", "USA (1913)", "Central bank of the United States"] },
          { cells: ["Bank of England", "United Kingdom (1694)", "One of the oldest central banks"] },
        ],
      },
      selfCheckExample: {
        prompt: "To bring down high inflation, a central bank would most likely",
        options: [
          "cut interest rates",
          "buy large amounts of government bonds",
          "cut income taxes",
          "increase public spending",
          "raise interest rates",
        ],
        steps: [
          "Higher interest rates make borrowing dearer and saving more attractive, so spending and price pressure fall.",
          "Cutting rates and buying bonds do the opposite; cutting taxes and raising spending are fiscal tools of the government, not the central bank, and would also add to demand.",
        ],
        answer: "(E) raise interest rates",
      },
      practiceSet: [
        { prompt: "Who decides fiscal policy?", answer: "The government and parliament" },
        { prompt: "Where is the European Central Bank?", answer: "Frankfurt" },
        { prompt: "What is the ECB's inflation target?", answer: "2% a year over the medium term" },
      ],
      traps: [
        {
          title: "Taxes are fiscal, interest rates are monetary",
          body: "Central banks do not set taxes, and governments in the euro area do not set interest rates. Options that give the ECB power over tax rates, or a finance ministry power over the base rate, mix the two policies.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-economists",
      name: "Economists and their ideas",
      intuition:
        "Economic ideas are usually remembered by one phrase: the invisible hand, comparative advantage, creative destruction. Each phrase belongs to one thinker and one century. Learn the phrase, the name and the book.",
      definition:
        "- **Classical economics** (Smith, Ricardo, Malthus): markets left free tend to work well.\n" +
        "- **Keynesian economics**: in a slump, demand is too low, so the government should spend.\n" +
        "- **Monetarism** (Friedman): inflation comes from too much money.\n" +
        "- **Game theory**: the study of strategic decisions in which each player's best choice depends on the others'. Its best-known example is the **prisoner's dilemma**.",
      table: {
        columns: ["Economist", "Country and date", "Key idea or work"],
        rows: [
          { cells: ["Adam Smith", "Scotland, 1776", "The Wealth of Nations; the \"invisible hand\" of the market; division of labour"] },
          { cells: ["Thomas Malthus", "England, 1798", "Population grows faster than food supply"] },
          { cells: ["David Ricardo", "England, 1817", "Comparative advantage: countries gain by specialising and trading"] },
          { cells: ["Karl Marx", "Germany, 1867", "Capital: a critique of capitalism; class struggle"] },
          { cells: ["Vilfredo Pareto", "Italy, about 1900", "Pareto efficiency; the 80/20 principle"] },
          { cells: ["John Maynard Keynes", "England, 1936", "The General Theory: governments should spend to fight unemployment"] },
          { cells: ["Joseph Schumpeter", "Austria, 1942", "Creative destruction by innovation"] },
          { cells: ["Friedrich Hayek", "Austria, 1944", "The Road to Serfdom: against central planning"] },
          { cells: ["John Nash", "USA, 1950", "Nash equilibrium in game theory; Nobel 1994"] },
          { cells: ["Milton Friedman", "USA, 1960s", "Monetarism"] },
          { cells: ["Amartya Sen", "India, Nobel 1998", "Welfare economics, poverty and famine"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which economist developed the theory of comparative advantage?",
        options: ["Adam Smith", "David Ricardo", "Thomas Malthus", "Karl Marx", "John Maynard Keynes"],
        steps: [
          "David Ricardo set out comparative advantage in 1817: even a country better at everything gains by specialising.",
          "Smith is the invisible hand, Malthus population, Marx the critique of capitalism, Keynes government spending in a slump.",
        ],
        answer: "(B) David Ricardo",
      },
      practiceSet: [
        { prompt: "Which economist wrote The General Theory (1936)?", answer: "John Maynard Keynes" },
        { prompt: "Which Italian economist gave his name to an efficiency concept?", answer: "Vilfredo Pareto" },
        { prompt: "Which branch of economics studies strategic interaction between decision-makers?", answer: "Game theory" },
      ],
      traps: [
        {
          title: "The invisible hand is Smith's, not Marx's or Keynes's",
          body: "Adam Smith used the image of an invisible hand for the way self-interest in free markets can serve the common good. Marx criticised capitalism and Keynes argued that markets alone may not restore full employment, so neither is a natural owner of the phrase.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-currencies",
      name: "Currencies of the world",
      intuition:
        "Currency questions give a list of pairs and ask which is wrong. The usual trap is an EU member that does not use the euro, or a currency name shared by several countries (dollar, peso, rupee, krone).",
      definition:
        "- Several currencies have the same name in different countries: **dollar**, **peso**, **rupee**, **franc**, **krona/krone**.\n" +
        "- Six EU members keep their own currency (2026): **Sweden** (krona), **Denmark** (krone), **Poland** (złoty), **Hungary** (forint), **Czechia** (koruna), **Romania** (leu).\n" +
        "- Italy's own currency before the euro was the **lira**; Turkey's currency today is also called the lira.",
      table: {
        columns: ["Currency", "Where it is used"],
        rows: [
          { cells: ["Pound sterling", "United Kingdom"] },
          { cells: ["Swiss franc", "Switzerland and Liechtenstein"] },
          { cells: ["Krona or krone", "Sweden (krona); Denmark and Norway (krone); Iceland (króna)"] },
          { cells: ["Złoty", "Poland"] },
          { cells: ["Forint", "Hungary"] },
          { cells: ["Koruna", "Czech Republic"] },
          { cells: ["Leu", "Romania and Moldova"] },
          { cells: ["Rouble", "Russia"] },
          { cells: ["Yen", "Japan"] },
          { cells: ["Yuan (renminbi)", "China"] },
          { cells: ["Rupee", "India, Pakistan, Sri Lanka, Nepal"] },
          { cells: ["Real", "Brazil"] },
          { cells: ["Peso", "Argentina, Mexico, Chile, Colombia and others"] },
          { cells: ["Rand", "South Africa"] },
          { cells: ["Baht", "Thailand"] },
          { cells: ["Won", "South Korea"] },
          { cells: ["Lira", "Turkey (and Italy until 2002)"] },
        ],
      },
      selfCheckExample: {
        prompt: "The forint is the currency of which country?",
        options: ["Hungary", "Poland", "Czech Republic", "Romania", "Croatia"],
        steps: [
          "The forint is Hungary's currency, and Hungary has not adopted the euro.",
          "Poland uses the złoty, the Czech Republic the koruna, Romania the leu; Croatia adopted the euro in 2023.",
        ],
        answer: "(A) Hungary",
      },
      practiceSet: [
        { prompt: "What is the currency of Brazil?", answer: "The real" },
        { prompt: "Which EU member uses the złoty?", answer: "Poland" },
        { prompt: "What is the currency of Japan?", answer: "The yen" },
      ],
      traps: [
        {
          title: "EU membership does not mean the euro",
          body: "Hungary, Poland, Czechia, Romania, Sweden and Denmark are all in the EU but keep their own currencies. A pair such as \"euro: Poland\" is wrong; Poland pays in złoty.",
        },
      ],
    },
  ],
};
