import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_GV_STATUTORY_NOTE: SubtopicNote = {
  subtopicName: "Statutory Bodies and Key Laws",
  title: "Statutory Bodies and Key Laws",
  oneLineDefinition:
    "Bodies set up by an Act of Parliament rather than the Constitution (human rights and women's commissions, the CVC, NGT, NDMA and others) and the laws CDS asks about by name and year.",
  whyItMatters:
    "Twenty-two CDS questions from 2016 to 2026: 12 MODERATE, 8 HARD and 2 EASY. The page is growing: five came in the two 2026 papers. The NHRC (2018, 2024, 2026) and the NDMA (2020, 2021, 2026) were each asked three times. A statutory body is created by an Act, so the first thing to know about each is the Act and its year.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolgv-rights-bodies",
      name: "Human rights and women's commissions",
      intuition:
        "Some watchdogs are created by an ordinary law of Parliament, not by the Constitution. They are 'statutory' bodies. The NHRC listens to complaints of rights violations, and can also act on its own when it reads of one. The NCW watches over the laws that protect women and advises the government on them.",
      definition:
        "The bodies:\n" +
        "- **National Human Rights Commission (NHRC)**: set up under the **Protection of Human Rights Act, 1993**. It can inquire into a violation **on its own initiative (suo motu)** or **on a victim's petition**, **intervene** in court proceedings with the court's approval, **visit jails** to study conditions, and **undertake and promote research** in human rights. Its chairperson is a former Chief Justice of India or, since 2019, a former Supreme Court judge.\n" +
        "- The same Act creates **State Human Rights Commissions** and **Human Rights Courts** (a Sessions Court in each district, for speedy trial). The **UN Human Rights Council** in Geneva has nothing to do with it.\n" +
        "- **National Commission for Women (NCW)**: a **statutory** body set up in **1992** under the **NCW Act, 1990**. It **reviews** the constitutional and legal **safeguards** for women and **advises** the government on policy affecting women.",
      table: {
        columns: ["Body", "Created by", "Key point"],
        rows: [
          {
            cells: ["National Human Rights Commission", "Protection of Human Rights Act, 1993", "Inquires suo motu or on petition; visits jails; promotes research"],
            noteAmber: "CDS 2018 (I): all four (suo motu inquiry, inquiry on petition, jail visits, research) are NHRC functions.",
            pyqExampleId: "514d2b20-81f6-41a4-b0f9-e96b93a91605",
          },
          { cells: ["State Human Rights Commission", "The same Act", "The same work at State level"] },
          {
            cells: ["Human Rights Courts", "The same Act", "A Sessions Court named in each district to try rights offences quickly"],
            noteAmber: "CDS 2024 (I): the Human Rights Council (a UN body) is the one not under the 1993 Act.",
            pyqExampleId: "25cfb3ce-f397-4123-ab4c-12c5a61a28a3",
          },
          {
            cells: ["National Commission for Women", "NCW Act, 1990 (set up 1992)", "Reviews safeguards for women; advises on policy"],
            noteAmber: "CDS 2017 (II) and 2025 (I): the NCW was created by an Act of Parliament and is a statutory body.",
            pyqExampleId: "736b6fe4-b33b-4efa-8b47-841c3d18bfb9",
          },
        ],
      },
      pyqExampleId: "8e2c9e90-b0e5-4254-b814-c0860ce7efa7",
      selfCheckExample: {
        prompt: "A newspaper reports that prisoners in a district jail are crowded into tiny cells. Can the NHRC go and see the jail for itself?",
        steps: [
          "The Protection of Human Rights Act lets the NHRC visit jails and other places of detention to study the living conditions of inmates.",
        ],
        answer: "Yes. Visiting jails to study inmates' conditions is one of its functions.",
      },
      practiceSet: [
        { prompt: "Under which Act was the National Human Rights Commission set up?", answer: "The Protection of Human Rights Act, 1993" },
        { prompt: "In which year did the National Commission for Women come into being?", answer: "1992" },
        { prompt: "Is the National Commission for Women a constitutional or a statutory body?", answer: "Statutory" },
        { prompt: "Who may chair the NHRC?", answer: "A former Chief Justice of India or a former Supreme Court judge" },
      ],
      traps: [
        {
          title: "The NHRC can act on its own",
          body: "The NHRC does **not** need a complaint: it can inquire **suo motu**. A statement that it cannot act on its own initiative is false.",
        },
        {
          title: "The NCW is statutory",
          body: "The NCW was created by an **Act of Parliament** (1990), not by a constitutional amendment, a Cabinet decision or a presidential order.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-regulators",
      name: "Vigilance, tribunals and other statutory bodies",
      intuition:
        "Tribunals and watchdogs are built to be faster and more expert than ordinary courts. So the law frees some of them from slow court procedure. But they cannot be put beyond the reach of the higher courts: the Supreme Court and the High Courts can always review them.",
      definition:
        "The bodies:\n" +
        "- **Central Vigilance Commission (CVC)**: set up in **1964** by an executive resolution and made **statutory** in **2003**. The Commissioner is appointed by the **President** on the recommendation of a committee of the **Prime Minister**, the **Union Home Minister** and the **Leader of the Opposition** in the Lok Sabha (or the leader of the **single largest opposition group** when there is no recognised Leader).\n" +
        "- **National Green Tribunal (NGT)**: set up in **2010** for quick disposal of **environment and forest** cases; it can award **relief and compensation**. It is **not bound by the Code of Civil Procedure** and is guided by **natural justice**.\n" +
        "- **Administrative Tribunals (Article 323A)**: Parliament may set them up for disputes on **recruitment and service conditions**; they may follow their own procedure. They **cannot** shut out the **Supreme Court's** special leave jurisdiction (Article 136), and the High Courts' review is part of the basic structure (L. Chandra Kumar, 1997).\n" +
        "- **Directorate of Enforcement (ED)**: under the **Department of Revenue**, Ministry of Finance; enforces **FEMA, 1999** and the **PMLA, 2002**. The Benami law is enforced by the **Income Tax Department**.\n" +
        "- **Zonal Councils**: five, set up under the **States Reorganisation Act, 1956**, each chaired by the **Union Home Minister**.",
      table: {
        columns: ["Body", "Set up", "Key point"],
        rows: [
          {
            cells: ["Central Vigilance Commission", "1964; statutory 2003", "Chosen by the Prime Minister, Home Minister and Leader of the Opposition"],
            noteAmber: "CDS 2025 (I): all three statements were correct, including the place for the leader of the largest opposition group.",
            pyqExampleId: "2507e643-6c18-4167-bdd5-0f4dfeff13f3",
          },
          { cells: ["National Green Tribunal", "2010", "Not bound by the Code of Civil Procedure"] },
          {
            cells: ["Administrative Tribunals", "Article 323A; Act of 1985", "Cannot exclude the Supreme Court's special leave jurisdiction"],
            noteAmber: "CDS 2019 (I): the false statement was that such tribunals can exclude the jurisdiction of all courts.",
            pyqExampleId: "82310f29-4dd0-4a1a-9308-f4aba2518db5",
          },
          { cells: ["Insolvency and Bankruptcy Board of India", "1 October 2016", "Regulator under the Insolvency and Bankruptcy Code, 2016"] },
          { cells: ["National Highways Authority of India", "Act of 1988", "Collects fees, regulates vehicles on its highways, offers consultancy in India and abroad"] },
          { cells: ["Directorate of Enforcement", "Department of Revenue", "Enforces FEMA and the PMLA"] },
          {
            cells: ["Northern Zonal Council", "States Reorganisation Act, 1956", "Haryana, Himachal Pradesh, Punjab, Rajasthan, Delhi, Chandigarh, Jammu and Kashmir, Ladakh"],
            noteAmber: "CDS 2023 (I): Uttar Pradesh and Uttarakhand are not in it; they belong to the Central Zonal Council.",
            pyqExampleId: "85933302-65b9-44b1-a90c-09e424847068",
          },
        ],
      },
      pyqExampleId: "ca6de0e4-a595-4a30-a4e6-bbcccaef5244",
      selfCheckExample: {
        prompt: "When the Central Vigilance Commissioner is to be chosen, the Lok Sabha has no recognised Leader of the Opposition. Who takes that seat on the selection committee?",
        steps: [
          "The committee is the Prime Minister, the Union Home Minister and the Leader of the Opposition in the Lok Sabha.",
          "The CVC Act says that where there is no recognised Leader of the Opposition, the leader of the single largest opposition group in the Lok Sabha takes the place.",
        ],
        answer: "The leader of the single largest opposition group in the Lok Sabha.",
      },
      practiceSet: [
        { prompt: "Who chairs each Zonal Council?", answer: "The Union Home Minister" },
        { prompt: "Which Article lets Parliament set up administrative tribunals for service matters?", answer: "Article 323A" },
        { prompt: "In which year was the Insolvency and Bankruptcy Board of India established?", answer: "2016" },
        { prompt: "Which two laws does the Directorate of Enforcement chiefly enforce?", answer: "FEMA (1999) and the PMLA (2002)" },
      ],
      traps: [
        {
          title: "The NGT follows natural justice, not the CPC",
          body: "The NGT is **not bound** by the Code of Civil Procedure, 1908. It is guided by the principles of natural justice, which is what lets it decide quickly.",
        },
        {
          title: "The ED does not enforce the Benami law",
          body: "The Directorate of Enforcement enforces **FEMA** and the **PMLA**. The **Benami** transactions law is enforced by the **Income Tax Department**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-disaster",
      name: "The National Disaster Management Authority",
      intuition:
        "Disasters need one body at the top that can command every ministry at once, so the Prime Minister heads it. The same pattern repeats below: the Chief Minister heads the State authority and the district's top officer the district one. The 2025 amendment added a city level, because cities face their own risks, such as floods and fires.",
      definition:
        "The structure:\n" +
        "- Set up under the **Disaster Management Act, 2005**.\n" +
        "- The **NDMA** is **chaired by the Prime Minister** and works under the **Ministry of Home Affairs**.\n" +
        "- Each **State Disaster Management Authority** is chaired by the **Chief Minister**; each **District** authority by the **District Collector** (or District Magistrate).\n" +
        "- The **Disaster Management (Amendment) Act, 2025** requires a **national disaster database** (and State ones), adds a provision on **urban disaster risk**, and allows an **Urban Disaster Management Authority** for **State capitals** and cities with a **Municipal Corporation** (Delhi and Chandigarh excepted).",
      table: {
        columns: ["Level", "Body", "Chaired by"],
        rows: [
          {
            cells: ["National", "National Disaster Management Authority", "The Prime Minister"],
            noteAmber: "CDS 2020 (II): the NDMA functions under the Ministry of Home Affairs.",
            pyqExampleId: "f6d2888b-536b-410d-ae09-31828b2c9628",
          },
          { cells: ["State", "State Disaster Management Authority", "The Chief Minister"] },
          { cells: ["District", "District Disaster Management Authority", "The District Collector or Magistrate"] },
          {
            cells: ["City (since 2025)", "Urban Disaster Management Authority", "The Municipal Commissioner"],
            noteAmber: "CDS 2026 (II): the 2025 amendment's national database, urban risk provision and city authorities were all correct.",
            pyqExampleId: "572308ab-3d36-475a-a5fa-0e5749329708",
          },
        ],
      },
      pyqExampleId: "7e0e3be8-d522-4245-a5ee-93bb12e74e47",
      selfCheckExample: {
        prompt: "A cyclone is about to hit coastal Odisha. Which disaster management authority is headed by Odisha's Chief Minister, and which by the Prime Minister?",
        steps: [
          "Under the Disaster Management Act, 2005, the State authority is chaired by the Chief Minister.",
          "The national authority, the NDMA, is chaired by the Prime Minister.",
        ],
        answer: "The Chief Minister heads the State Disaster Management Authority; the Prime Minister heads the NDMA.",
      },
      practiceSet: [
        { prompt: "Under which ministry does the NDMA function?", answer: "The Ministry of Home Affairs" },
        { prompt: "Which Act set up the National Disaster Management Authority?", answer: "The Disaster Management Act, 2005" },
        { prompt: "Who chairs a District Disaster Management Authority?", answer: "The District Collector (or District Magistrate)" },
        { prompt: "Which two cities are left out of the Urban Disaster Management Authorities under the 2025 amendment?", answer: "Delhi and Chandigarh" },
      ],
      traps: [
        {
          title: "The Prime Minister, not the Home Minister",
          body: "The NDMA works under the **Home Ministry**, but it is **chaired by the Prime Minister**, not the Home Minister or the President.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-laws",
      name: "Laws CDS names, with their years",
      intuition:
        "CDS often asks a law by its name and year, or what one of its sections does. The years are easier to keep if you group them: the rights laws of 2005 and 2006, the child and workplace laws of 2012 and 2013, and the new criminal and labour codes of the 2020s.",
      definition:
        "The laws:\n" +
        "- The **Indian Penal Code, 1860** was drafted by the **First Law Commission** under **Macaulay**. It was replaced by the **Bharatiya Nyaya Sanhita, 2023**, in force from **1 July 2024**.\n" +
        "- The **Information Technology Act, 2000** gives an **electronic signature** the same legal standing as a handwritten one; the **Central Government** makes the rules on electronic signatures.\n" +
        "- The **Protection of Women from Domestic Violence Act, 2005** gives **civil remedies**. Only an aggrieved **woman** can complain, wives and women in **relationships like marriage** are covered, and relief may be sought against the husband's or partner's **relatives** too.\n" +
        "- The **Sexual Harassment of Women at Workplace Act, 2013** covers **physical, verbal and non-verbal** conduct of a sexual nature.\n" +
        "- The **Occupational Safety, Health and Working Conditions Code, 2020** absorbed the **Factories Act, 1948**, the **Plantations Labour Act, 1951** and other laws on working conditions. The other three codes are on Wages (2019), Industrial Relations (2020) and Social Security (2020).\n" +
        "- The **Indian Ports Act, 2025** gives the **Maritime State Development Council** statutory standing and writes **green norms** and **disaster readiness** for ports into law.",
      table: {
        columns: ["Act", "Year"],
        rows: [
          { cells: ["Consumer Protection Act", "1986 (replaced by a new Act in 2019)"] },
          { cells: ["Information Technology Act", "2000"] },
          { cells: ["Right to Information Act", "2005"] },
          {
            cells: ["Protection of Women from Domestic Violence Act", "2005"],
            noteAmber: "CDS 2016 (II): the false statement was that relief can be sought only against the husband or male partner.",
            pyqExampleId: "4e648fe4-5b5a-43ef-9820-cfc8a9578f79",
          },
          { cells: ["Forest Rights Act (Scheduled Tribes and Other Traditional Forest Dwellers)", "2006"] },
          { cells: ["Protection of Children from Sexual Offences Act", "2012"] },
          {
            cells: ["Sexual Harassment of Women at Workplace Act", "2013"],
            noteAmber: "CDS 2026 (I): verbal, non-verbal and physical conduct of a sexual nature all count.",
            pyqExampleId: "27f47e08-53af-47ed-b0a2-a1e85a0c9608",
          },
          { cells: ["Bharatiya Nyaya Sanhita (replacing the Indian Penal Code)", "2023"] },
        ],
      },
      pyqExampleId: "59cc4e41-ad13-4889-b566-743b6895c392",
      selfCheckExample: {
        prompt: "A woman tells her office that a colleague keeps making sexually coloured remarks and gestures, though he has never touched her. Does the 2013 workplace harassment law cover this?",
        steps: [
          "The 2013 Act defines sexual harassment to include unwelcome verbal and non-verbal conduct of a sexual nature, not only physical contact.",
          "Remarks are verbal conduct and gestures are non-verbal conduct.",
        ],
        answer: "Yes. Both the remarks and the gestures are covered.",
      },
      practiceSet: [
        { prompt: "Which Law Commission drafted the Indian Penal Code?", answer: "The First Law Commission, under Macaulay" },
        { prompt: "Which law replaced the Indian Penal Code, and from what date?", answer: "The Bharatiya Nyaya Sanhita, 2023, from 1 July 2024" },
        { prompt: "Which labour code took in the Factories Act, 1948?", answer: "The Occupational Safety, Health and Working Conditions Code, 2020" },
        { prompt: "Under the Domestic Violence Act, who can file a complaint?", answer: "An aggrieved woman" },
      ],
      traps: [
        {
          title: "RTI is 2005, POCSO is 2012",
          body: "Options shift a year to catch a guess: the RTI Act is **2005** (not 2004), POCSO is **2012** (not 2010) and the Consumer Protection Act is **1986** and **2019** (not 2012).",
        },
        {
          title: "Domestic violence relief reaches relatives",
          body: "Relief under the 2005 Act is **not** limited to the husband or a male live-in partner. A complaint may also name the husband's or partner's relatives.",
        },
      ],
    },
  ],
};
