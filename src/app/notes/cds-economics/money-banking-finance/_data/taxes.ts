import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_MB_TAXES_NOTE: SubtopicNote = {
  subtopicName: "Taxes, GST and Finance Commission",
  title: "Taxes, GST and the Finance Commission",
  oneLineDefinition:
    "The principles of a good tax and who really pays it, how GST works and what it leaves out, and how the Finance Commission shares the Union's taxes with the States.",
  whyItMatters:
    "Thirteen CDS questions, six of them HARD. GST came up in five different papers from 2021 (II) to 2026 (II), and the Fourteenth Finance Commission's weights in 2017 (II) and 2018 (II), so these two topics carry most of the page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsecmb-tax-principles",
      name: "Canons of taxation and the Union's tax mix",
      intuition:
        "Adam Smith asked what makes a tax fair and workable. His answer was four rules: people should pay by their ability, know what they owe, pay at a convenient time, and the tax should cost little to collect. Later writers added more rules, such as raising enough money for the state.",
      definition:
        "The canons:\n" +
        "- **Adam Smith's four canons** (Wealth of Nations, 1776): **equality**, **certainty**, **convenience** and **economy**.\n" +
        "- Later writers added **productivity**, **elasticity**, **fiscal adequacy**, simplicity and diversity.\n" +
        "- **Direct tax**: paid by the person it is levied on (income tax, corporation tax). **Indirect tax**: can be passed on to buyers (GST, customs, excise).\n" +
        "- **The Union's biggest taxes change places.** In the 2019-20 Budget Estimates the order was corporation tax, then GST, then personal income tax, then Union excise. In most years since 2020-21 personal income tax has been larger than corporation tax, and in the 2025-26 Budget Estimates it was the largest.",
      table: {
        columns: ["Canon", "Meaning"],
        rows: [
          { cells: ["Equality", "Tax in proportion to ability to pay"] },
          { cells: ["Certainty", "The amount, time and manner of payment are clear"] },
          { cells: ["Convenience", "Collected at a time and in a way convenient to the taxpayer"] },
          { cells: ["Economy", "Cost of collection is small"] },
          { cells: ["Fiscal adequacy (later writers)", "Tax raises enough revenue for the state"] },
        ],
      },
      pyqExampleId: "265d0ed1-b7d2-4efd-9029-1a3b271aad2f",
      practiceSet: [
        { prompt: "Name Adam Smith's canon by which a tax should cost little to collect.", answer: "The canon of economy" },
        { prompt: "Is income tax a direct or an indirect tax?", answer: "A direct tax" },
        { prompt: "In the 2019-20 Budget Estimates, which was the largest of the Union's tax receipts?", answer: "Corporation tax" },
        { prompt: "In which book did Adam Smith set out his canons of taxation?", answer: "The Wealth of Nations (1776)" },
      ],
      traps: [
        {
          title: "Fiscal adequacy is not one of Adam Smith's four",
          body: "Smith's canons are **equality, certainty, convenience and economy**. **Productivity, elasticity and fiscal adequacy** were added by later writers.",
        },
        {
          title: "The order of tax receipts depends on the year",
          body: "Corporation tax led in **2019-20**; personal income tax led in the **2025-26** Budget Estimates. Read which Budget the question names before ranking the taxes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsecmb-incidence",
      name: "Who bears a tax: incidence",
      intuition:
        "A tax is collected from one person but may be paid, in the end, by another. A seller taxed ₹10 a packet will try to raise the price. If buyers must have the good whatever its price, the seller can pass on almost all of it. If buyers walk away at the first rise, the seller has to absorb it. The side that cannot escape pays.",
      definition:
        "The rules:\n" +
        "- **Impact**: who the tax is legally collected from. **Incidence**: who finally bears it.\n" +
        "- The burden falls more on the **less elastic** side of the market.\n" +
        "- **Demand more inelastic than supply**: the tax is **shifted forward** to consumers through a higher price.\n" +
        "- **Supply more inelastic than demand**: the tax is **shifted backward** to producers through a lower price received.\n" +
        "- Equal elasticities: the burden is shared equally.",
      formula: {
        label: "Share of a tax borne by buyers",
        latex: "\\text{Buyers' share} = \\dfrac{e_s}{e_s + e_d}",
        symbols: [
          { symbol: "\\(e_s\\)", meaning: "price elasticity of supply" },
          { symbol: "\\(e_d\\)", meaning: "price elasticity of demand (without its minus sign)" },
        ],
      },
      authoredExample: {
        prompt: "A tax of ₹10 is put on each unit of a good. The elasticity of supply is 2 and the elasticity of demand is 0.5. How much of the tax do buyers bear?",
        steps: [
          "Buyers' share = 2 ÷ (2 + 0.5) = 2 ÷ 2.5 = 0.8.",
          "Buyers bear 0.8 × ₹10 = ₹8; sellers bear the other ₹2.",
          "Demand is the less elastic side, so buyers bear more.",
        ],
        answer: "Buyers bear ₹8 of the ₹10 tax.",
      },
      selfCheckExample: {
        prompt: "The elasticity of demand for a good is 3 and the elasticity of supply is 1. What fraction of a new tax falls on sellers?",
        steps: [
          "Buyers' share = 1 ÷ (1 + 3) = 1/4.",
          "Sellers bear the rest: 1 − 1/4.",
        ],
        answer: "Three-quarters falls on sellers, because supply is the less elastic side.",
      },
      pyqExampleId: "9e918813-f33a-4caa-abc6-16a62e201b63",
      practiceSet: [
        { prompt: "What is the difference between the impact and the incidence of a tax?", answer: "Impact is who it is collected from; incidence is who finally bears it" },
        { prompt: "If demand and supply are equally elastic, how is a tax shared?", answer: "Equally between buyers and sellers" },
        { prompt: "A tax of ₹10 a unit is levied. The elasticity of supply is 4 and of demand is 1. How much do buyers bear?", answer: "₹8", method: "4 ÷ (4 + 1) × ₹10" },
      ],
      traps: [
        {
          title: "The less elastic side pays",
          body: "Students often think the side with more market power pays less. The rule is about **elasticity**: whichever side **responds less** to price bears **more** of the tax.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecmb-gst",
      name: "Goods and Services Tax",
      intuition:
        "Before 2017 a good was taxed many times over: excise by the Centre, VAT by the State, entry tax at the border, service tax on the side. GST replaced most of these with one tax on each supply, shared by the Centre and the States. A few items were kept out, and taxes on imports stayed separate.",
      definition:
        "The structure:\n" +
        "- **Constitution (101st Amendment) Act, 2016**; GST began on **1 July 2017**. The **GST Council** (Article 279A) recommends rates.\n" +
        "- **Acts of Parliament (2017)**: the **Central GST**, **Integrated GST**, **Union Territory GST** and **GST (Compensation to States)** Acts. Each **State GST Act** is passed by that **State's own legislature**.\n" +
        "- **Inter-State supply** (Article **269A**): GST is **levied and collected by the Government of India**, not by the States, and is then **apportioned** between the Union and the States.\n" +
        "- **Subsumed**: central excise duty (most of it), service tax, State VAT and entry tax. **Not subsumed**: **basic customs duty** on imports.\n" +
        "- **Outside GST**: **alcohol for human consumption** (by the Constitution) and **five petroleum products** (crude, petrol, diesel, aviation turbine fuel, natural gas) until the GST Council notifies a date.\n" +
        "- **Special rates**: **gold, silver and other precious metals 3%**; **rough (unworked) diamonds 0.25%**.\n" +
        "- **Slabs (a figure that changed)**: 5%, 12%, 18% and 28% from 2017. From **22 September 2025** the main slabs became **5% and 18%**, with **40%** on luxury and sin goods.",
      table: {
        columns: ["Item", "Status under GST"],
        rows: [
          {
            cells: ["Petrol and diesel", "Not yet taxed under GST"],
            noteAmber: "CDS 2022 (I): petrol is the item not covered.",
            pyqExampleId: "039792da-ba78-4c5c-a030-d7bd8ee6b696",
          },
          { cells: ["Alcohol for human consumption", "Kept outside by the Constitution"] },
          { cells: ["Basic customs duty", "Not subsumed; still levied on imports"] },
          {
            cells: ["Precious metals", "Taxed at 3%, not 1%"],
            noteAmber: "CDS 2024 (I), a HARD question.",
            pyqExampleId: "5ad8b3db-a10e-4d74-bd27-bd1acf90348d",
          },
          { cells: ["Rough (unworked) diamonds", "Taxed at 0.25%"] },
          {
            cells: ["Inter-State supply", "Levied by the Union under Article 269A and shared with the States"],
            noteAmber: "CDS 2026 (II): all three statements were correct (UPSC's provisional key).",
            pyqExampleId: "aa2530f0-8b45-49a9-ab6a-ff5a971bdbf9",
          },
        ],
      },
      pyqExampleId: "859ee231-3137-4232-93b7-80ff849e907c",
      practiceSet: [
        { prompt: "Which Article of the Constitution governs GST on inter-State trade?", answer: "Article 269A" },
        { prompt: "At what rate are gold and silver taxed under GST?", answer: "3%" },
        { prompt: "Which constitutional amendment introduced GST?", answer: "The 101st Amendment Act, 2016" },
        { prompt: "From 22 September 2025, what are the two main GST slabs?", answer: "5% and 18%" },
      ],
      traps: [
        {
          title: "The State GST Act is not Parliament's",
          body: "Parliament passed the **Central, Integrated and Union Territory** GST Acts and the **Compensation** Act. Each **State GST Act** is passed by the State legislature.",
        },
        {
          title: "Inter-State GST is collected by the Centre",
          body: "On supplies between States, GST is **levied and collected by the Government of India** (Article 269A) and only then apportioned. A State cannot levy it.",
        },
        {
          title: "Know which year's slabs a question means",
          body: "The four slabs of 5, 12, 18 and 28% applied from 2017. Since **22 September 2025** the main slabs are **5% and 18%**, with 40% for luxury and sin goods.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecmb-finance-commission",
      name: "Finance Commission and the divisible pool",
      intuition:
        "The Centre collects most of the big taxes, but the States do most of the spending on schools, hospitals and police. Every five years a Finance Commission decides how much of the Centre's tax money goes to the States, and how that share is split among them. Poorer States get more, because they are further from the richest State's income.",
      definition:
        "The rules:\n" +
        "- **Finance Commission**: set up every five years under **Article 280**.\n" +
        "- **Divisible pool**: central taxes shared with States. **Cesses and surcharges** are **excluded** (Articles 270 and 271), so the Union keeps them in full.\n" +
        "- On **petroleum**: the **basic excise duty** is shared; the **additional excise duty** (road and infrastructure cess) and the **special additional excise duty** are **not**.\n" +
        "- **14th Finance Commission** (2015-20): **42%** of the pool to States. Weights: **income distance 50%**, population of 1971 17.5%, **area 15%**, demographic change 10%, forest cover 7.5%.\n" +
        "- **15th Finance Commission** (2021-26): **41%**. Weights: income distance 45%, population of 2011 15%, area 15%, forest and ecology 10%, demographic performance 12.5%, tax and fiscal effort 2.5%.\n" +
        "- The **16th Finance Commission**, chaired by Arvind Panagariya, covers 2026-31.",
      table: {
        columns: ["14th FC criterion", "Weight"],
        rows: [
          {
            cells: ["Income distance", "50%"],
            noteAmber: "Asked twice: CDS 2017 (II) wanted the highest weight, CDS 2018 (II) the descending order.",
            pyqExampleId: "5a7f7206-7a83-44fa-a342-2e1a53dc95ec",
          },
          { cells: ["Population (1971)", "17.5%"] },
          { cells: ["Area", "15%"] },
          { cells: ["Demographic change", "10%"] },
          { cells: ["Forest cover", "7.5%"] },
        ],
      },
      pyqExampleId: "915f029a-2f8e-471a-bda8-c7a6dc3affbc",
      practiceSet: [
        { prompt: "Under which Article of the Constitution is the Finance Commission set up?", answer: "Article 280" },
        { prompt: "Which criterion carried the highest weight in the 14th Finance Commission's formula?", answer: "Income distance (50%)" },
        { prompt: "Which Finance Commission covers 2026-31, and who chairs it?", answer: "The 16th Finance Commission, chaired by Arvind Panagariya" },
        { prompt: "What share of the divisible pool did the 15th Finance Commission give the States?", answer: "41%" },
      ],
      traps: [
        {
          title: "Cesses and surcharges stay with the Centre",
          body: "Income tax, corporation tax and basic excise duty go into the divisible pool. **Cesses and surcharges** do not, which is why the Centre's road cess on petrol is not shared.",
        },
        {
          title: "14th and 15th Commission weights differ",
          body: "Income distance was **50%** under the 14th and **45%** under the 15th Commission, and the 15th used the **2011** population instead of 1971. Check which Commission the question names.",
        },
      ],
    },
  ],
};
