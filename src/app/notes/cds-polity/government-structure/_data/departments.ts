import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_GV_DEPARTMENTS_NOTE: SubtopicNote = {
  subtopicName: "Ministries, NITI Aayog and Schemes",
  title: "Ministries, NITI Aayog and Schemes",
  oneLineDefinition:
    "How NITI Aayog is made up and what it does, which ministry or department runs which body, the training academies and institutes CDS names, and a few schemes.",
  whyItMatters:
    "Twenty-three CDS questions from 2018 to 2026: 12 MODERATE and 11 HARD, the largest share of HARD items in this chapter. Eleven ask which ministry or department a body belongs to, and NITI Aayog alone was asked three times (2021, 2023 and 2025). These facts change when ministries are reorganised, so this page gives the year a fact holds for.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolgv-niti",
      name: "NITI Aayog",
      intuition:
        "NITI Aayog replaced the Planning Commission in 2015. The Planning Commission handed out money to States from the top; NITI Aayog is meant to be a think tank that works with the States. That is why every Chief Minister sits on its Governing Council.",
      definition:
        "NITI Aayog (National Institution for Transforming India):\n" +
        "- Set up by a **Cabinet resolution of 1 January 2015**, replacing the **Planning Commission**. It is neither constitutional nor statutory.\n" +
        "- **Chairperson**: the **Prime Minister**. A **Vice-Chairperson** and a **Chief Executive Officer** are appointed by the Prime Minister. Up to **four Union Ministers** are ex officio members, nominated by the Prime Minister.\n" +
        "- **Governing Council**: the Prime Minister (chair), the **Chief Ministers of all States** and of Union Territories with a legislature, and the **Lieutenant Governors** of the other Union Territories.\n" +
        "- Its jobs: give **strategic and directional input** to development, act as a **think tank**, **monitor and evaluate** programmes, and offer a platform to settle **inter-sectoral and inter-departmental** issues.\n" +
        "- It does **not** settle disputes between States: that is for the **Inter-State Council** (Article 263).",
      table: {
        columns: ["Part of NITI Aayog", "Who"],
        rows: [
          { cells: ["Chairperson", "The Prime Minister"] },
          {
            cells: ["Governing Council", "Chief Ministers of all States and of Union Territories with a legislature; Lieutenant Governors of the other Union Territories"],
            noteAmber: "CDS 2025 (I): the Lieutenant Governor of Ladakh is a member of the Governing Council.",
            pyqExampleId: "4e7ec79c-2154-4190-8a71-d4dcc0fecc18",
          },
          { cells: ["Vice-Chairperson", "Appointed by the Prime Minister"] },
          { cells: ["Chief Executive Officer", "Appointed by the Prime Minister"] },
          { cells: ["Ex officio members", "Up to four Union Ministers nominated by the Prime Minister"] },
        ],
      },
      pyqExampleId: "1bef6a02-a971-4404-991d-9b34af6159f9",
      selfCheckExample: {
        prompt: "Two States quarrel over a policy that affects both of them, and want a central forum to inquire and advise. Is NITI Aayog that forum? If not, which body is?",
        steps: [
          "NITI Aayog's charter covers inter-sectoral and inter-departmental issues, not disputes between States.",
          "Article 263 provides an Inter-State Council to inquire into and advise on disputes between States.",
        ],
        answer: "No. The Inter-State Council under Article 263.",
      },
      practiceSet: [
        { prompt: "On what date was NITI Aayog set up?", answer: "1 January 2015" },
        { prompt: "Which body did NITI Aayog replace?", answer: "The Planning Commission" },
        { prompt: "Which Article provides for an Inter-State Council?", answer: "Article 263" },
        { prompt: "Is NITI Aayog a constitutional body?", answer: "No, it was set up by a Cabinet resolution" },
      ],
      traps: [
        {
          title: "No inter-state disputes",
          body: "NITI Aayog settles **inter-sectoral and inter-departmental** issues. Resolving **inter-state** conflicts is not one of its objectives.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-ministries",
      name: "Which ministry runs what",
      intuition:
        "Each ministry is split into departments, and many bodies sit under one of them. CDS picks a body and asks where it belongs, so the trick is to link each body to the job of its ministry: borders and official language are internal matters, so the Home Ministry; patents are about industry, so Commerce and Industry.",
      definition:
        "The ministries:\n" +
        "- **Ministry of Home Affairs**: Departments of **Internal Security**, **States**, **Home**, **Jammu, Kashmir and Ladakh Affairs**, **Border Management** and **Official Language**. The **National Disaster Management Authority** also works under it.\n" +
        "- **Ministry of Finance**: Departments of **Economic Affairs** (advice on the economy, including **foreign exchange management**), **Expenditure**, **Revenue**, **Investment and Public Asset Management**, **Financial Services** and, **since July 2021**, **Public Enterprises**. The **Controller General of Accounts** (under Expenditure) runs the **Public Financial Management System**.\n" +
        "- Until July 2021 the **Ministry of Heavy Industries and Public Enterprises** had two departments, **Heavy Industry** and **Public Enterprises**. Public Enterprises then moved to Finance and the ministry became the **Ministry of Heavy Industries**.\n" +
        "- **Ministry of Law and Justice**: the Department of **Legal Affairs**.\n" +
        "- **Cabinet Secretariat**: the **National Authority, Chemical Weapons Convention**.",
      table: {
        columns: ["Body or task", "Belongs to"],
        rows: [
          {
            cells: ["National Authority, Chemical Weapons Convention", "The Cabinet Secretariat"],
            noteAmber: "CDS 2023 (I): it is the one not under the Ministry of Home Affairs.",
            pyqExampleId: "b3d46db5-4a42-415a-810a-5affc0888bda",
          },
          {
            cells: ["Department of Public Enterprises", "Ministry of Heavy Industries and Public Enterprises until July 2021; Ministry of Finance since"],
            noteAmber: "CDS 2020 (I) asked the old two-department ministry; CDS 2021 (II) asked the new home, the Ministry of Finance.",
            pyqExampleId: "b2be1560-a0e9-4ce7-9105-50970764ec10",
          },
          { cells: ["Policy on Intellectual Property Rights", "Department for Promotion of Industry and Internal Trade (Ministry of Commerce and Industry)"] },
          { cells: ["Nodal agency for the UN Environment Programme", "Ministry of Environment, Forest and Climate Change"] },
          { cells: ["National Dope Testing Laboratory", "Ministry of Youth Affairs and Sports"] },
          { cells: ["Prime Minister's National Relief Fund", "The Prime Minister's Office"] },
          { cells: ["Public Financial Management System", "Controller General of Accounts"] },
          { cells: ["Implementing telecom policy", "The Digital Communications Commission (Department of Telecommunications)"] },
        ],
      },
      pyqExampleId: "fdf71514-9b72-4309-a9ee-3779585bfb95",
      selfCheckExample: {
        prompt: "A 2020 question asks which two departments make up the Ministry of Heavy Industries and Public Enterprises. What is the answer for 2020, and why would the answer differ after July 2021?",
        steps: [
          "In 2020 the ministry had the Department of Heavy Industry and the Department of Public Enterprises.",
          "In July 2021 Public Enterprises moved to the Ministry of Finance, and the old ministry was renamed the Ministry of Heavy Industries.",
        ],
        answer: "Heavy Industry and Public Enterprises in 2020; after July 2021 Public Enterprises sits in the Ministry of Finance.",
      },
      practiceSet: [
        { prompt: "Which department frames India's policy on Intellectual Property Rights?", answer: "The Department for Promotion of Industry and Internal Trade" },
        { prompt: "Who operates the Prime Minister's National Relief Fund?", answer: "The Prime Minister's Office" },
        { prompt: "Under which ministry does the National Dope Testing Laboratory function?", answer: "The Ministry of Youth Affairs and Sports" },
        { prompt: "Which department of the Finance Ministry advises on foreign exchange management?", answer: "The Department of Economic Affairs" },
      ],
      traps: [
        {
          title: "Legal Affairs is not a Home department",
          body: "The Department of **Legal Affairs** belongs to the **Ministry of Law and Justice**. Official Language, Border Management and Jammu, Kashmir and Ladakh Affairs are Home Ministry departments.",
        },
        {
          title: "TRAI regulates, it does not implement",
          body: "The body that **implements** the government's telecom policy is the **Digital Communications Commission** (the Telecom Commission until 2018). TRAI is the independent **regulator**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-institutions",
      name: "Training academies and government institutions",
      intuition:
        "Each civil service trains its officers at its own academy, often in a hill town. CDS gives four academies and four places to match. A few other institutions come up too, and for each the question is either where it is or which ministry it belongs to.",
      definition:
        "The institutions:\n" +
        "- **Lal Bahadur Shastri National Academy of Administration** (IAS): **Mussoorie**.\n" +
        "- **National Academy of Audit and Accounts** (Indian Audit and Accounts Service): **Shimla**.\n" +
        "- **National Academy of Customs, Indirect Taxes and Narcotics**: new campus at **Palasamudram**, Andhra Pradesh.\n" +
        "- **All India Institute of Local Self Government**: **Mumbai**.\n" +
        "- **National Water Academy**: **Khadakwasla, Pune**, under the **Central Water Commission**; trains in-service engineers in water resources.\n" +
        "- **National Centre for Good Governance** (2014): under the **Department of Administrative Reforms and Public Grievances** (Ministry of Personnel). It took in the **National Institute of Administrative Research** of the Mussoorie academy, and its Governing Body is chaired by the **Cabinet Secretary**.\n" +
        "- **Bureau of Pharma PSUs of India**: the implementing agency of the **Pradhan Mantri Bhartiya Janaushadhi Pariyojana**; a registered **society**.\n" +
        "- **National Recruitment Agency**: approved in **2020** to hold a **Common Eligibility Test** for **Group B and Group C** (non-gazetted) posts.",
      table: {
        columns: ["Institution", "Place"],
        rows: [
          { cells: ["Lal Bahadur Shastri National Academy of Administration", "Mussoorie"] },
          { cells: ["National Academy of Audit and Accounts", "Shimla"] },
          { cells: ["National Academy of Customs, Indirect Taxes and Narcotics", "Palasamudram (Andhra Pradesh)"] },
          { cells: ["All India Institute of Local Self Government", "Mumbai"] },
          {
            cells: ["National Water Academy", "Khadakwasla, Pune"],
            noteAmber: "CDS 2018 (I): it trains in-service engineers, but it is in Pune, not New Delhi.",
            pyqExampleId: "476b3ece-9e84-483d-a174-5ef0855da7ca",
          },
        ],
      },
      pyqExampleId: "3e882872-f2de-4894-8dbf-f9198eafdf7d",
      selfCheckExample: {
        prompt: "A statement says the National Centre for Good Governance was set up by the Sardar Vallabhbhai Patel National Police Academy and works under the Home Ministry. Correct both parts.",
        steps: [
          "The Centre grew out of the National Institute of Administrative Research, which was part of the Lal Bahadur Shastri academy at Mussoorie, not the police academy.",
          "It works under the Department of Administrative Reforms and Public Grievances in the Ministry of Personnel, not the Home Ministry.",
        ],
        answer: "It came from the Mussoorie academy's research institute and works under the Ministry of Personnel.",
      },
      practiceSet: [
        { prompt: "Where is the National Water Academy?", answer: "Khadakwasla, Pune" },
        { prompt: "Who chairs the Governing Body of the National Centre for Good Governance?", answer: "The Cabinet Secretary" },
        { prompt: "Which scheme does the Bureau of Pharma PSUs of India implement?", answer: "The Pradhan Mantri Bhartiya Janaushadhi Pariyojana" },
        { prompt: "What test does the National Recruitment Agency conduct?", answer: "A Common Eligibility Test for Group B and Group C posts" },
      ],
      traps: [
        {
          title: "The National Recruitment Agency is recent and not constitutional",
          body: "The National Recruitment Agency was approved in **2020**, not 2014, and it has **no constitutional status**. Its job is a Common Eligibility Test for Group B and C posts, not private-sector jobs.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-schemes",
      name: "Schemes for MPs and villages",
      intuition:
        "Several schemes link MPs to development work. The key idea is that an MP chooses or adopts, but does not spend: the district administration sanctions and carries out the work. The rural livelihood schemes, in turn, work through women's self-help groups.",
      definition:
        "The schemes:\n" +
        "- **MPLADS** (Members of Parliament Local Area Development Scheme): an MP **recommends** works; the **district authority sanctions, executes and completes** them. It is **fully funded by the Centre**, **Rs 5 crore** per MP a year. **Nominated** MPs may recommend works **anywhere in India**.\n" +
        "- **Saansad Adarsh Gram Yojana**: launched on **11 October 2014**, **Jayaprakash Narayan's** birth anniversary; inspired by **Gandhi's Gram Swaraj**; run by the **Ministry of Rural Development**. Each MP adopts and develops a village.\n" +
        "- **DAY-NRLM** (Deendayal Antyodaya Yojana, National Rural Livelihoods Mission): creates income for rural women through **self-help groups**.\n" +
        "- **Start-up Village Entrepreneurship Programme**: a part of DAY-NRLM that helps rural people, self-help group members among them, start small businesses.\n" +
        "- **Skill Training of Rural Youth**: trains rural youth in **agriculture** and allied subjects.",
      table: {
        columns: ["Scheme", "Run by", "Key point"],
        rows: [
          {
            cells: ["MPLADS", "Ministry of Statistics and Programme Implementation", "MPs recommend; the district authority sanctions and executes"],
            noteAmber: "CDS 2020 (I): the false statement was that MPs sanction, execute and complete the works.",
            pyqExampleId: "48e362cf-88a4-4cf3-9c76-c0903221f1e1",
          },
          { cells: ["Saansad Adarsh Gram Yojana", "Ministry of Rural Development", "Launched 11 October 2014"] },
          {
            cells: ["DAY-NRLM", "Ministry of Rural Development", "Income for women's self-help groups"],
            noteAmber: "CDS 2026 (I): STRY and DAY-NRLM were described correctly; SVEP does not exclude self-help group members.",
            pyqExampleId: "b8f8105f-33aa-4304-82b8-c164bb6af9f7",
          },
          { cells: ["Start-up Village Entrepreneurship Programme", "Ministry of Rural Development (under DAY-NRLM)", "Rural small businesses"] },
          { cells: ["Skill Training of Rural Youth", "Ministry of Agriculture and Farmers Welfare", "Skills in farming and allied themes"] },
        ],
      },
      pyqExampleId: "473995e0-156c-42f1-8bf4-4734a2593afa",
      selfCheckExample: {
        prompt: "A nominated member of the Rajya Sabha wants MPLADS money spent on a school in a State other than the one she lives in. Is that allowed, and who will actually build it?",
        steps: [
          "Nominated MPs may recommend MPLADS works anywhere in the country.",
          "Under MPLADS the MP only recommends; the district authority sanctions and executes the work.",
        ],
        answer: "Yes. She recommends it; the district authority of that place sanctions and builds it.",
      },
      practiceSet: [
        { prompt: "How much MPLADS money does each MP get in a year?", answer: "Rs 5 crore" },
        { prompt: "Who sanctions and executes works under MPLADS?", answer: "The district authority" },
        { prompt: "Which mission creates income for rural women through self-help groups?", answer: "DAY-NRLM (National Rural Livelihoods Mission)" },
        { prompt: "Which ministry runs Skill Training of Rural Youth?", answer: "The Ministry of Agriculture and Farmers Welfare" },
      ],
      traps: [
        {
          title: "MPs recommend, they do not spend",
          body: "Under MPLADS the MP **recommends** works. The **district authority** sanctions, executes and completes them; the MP never handles the money.",
        },
        {
          title: "SAGY is a Rural Development scheme",
          body: "Saansad Adarsh Gram Yojana is run by the **Ministry of Rural Development**, not the Ministry of Parliamentary Affairs, even though MPs adopt the villages.",
        },
      ],
    },
  ],
};
