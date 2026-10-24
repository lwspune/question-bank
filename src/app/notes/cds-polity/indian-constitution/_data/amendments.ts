import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_CO_AMENDMENTS_NOTE: SubtopicNote = {
  subtopicName: "Amending the Constitution",
  title: "Amending the Constitution",
  oneLineDefinition:
    "How Article 368 amends the Constitution, the basic structure that no amendment may destroy, and the amendments CDS names by number and year.",
  whyItMatters:
    "Sixteen CDS questions, six of them HARD. Three ask how an amendment Bill passes, in 2021 (II), 2022 (I) and 2026 (I), and the rest give a change and ask its number, or a number and ask its change. Learn the procedure as four rules and the amendments as one table in number order.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolco-procedure",
      name: "Article 368: how an amendment passes",
      intuition:
        "The Constitution is harder to change than an ordinary law, but India has no separate body for it: Parliament itself amends the Constitution, using a stricter procedure. " +
        "For the parts that hold the federation together, the States must agree as well.",
      definition:
        "The rules of **Article 368** (Part XX):\n" +
        "- An amendment Bill can be introduced **only in Parliament**, in **either House**, by a minister or a private member. **No prior sanction of the President** is needed. A State legislature **cannot** start an amendment.\n" +
        "- Each House must pass it **separately** by a **special majority**: a majority of its **total membership** and **two-thirds of the members present and voting**.\n" +
        "- There is **no joint sitting** for an amendment Bill; the joint sitting under Article 108 is only for ordinary Bills.\n" +
        "- Amendments touching the **federal structure** (election of the President, the Supreme Court and High Courts, the division of powers, representation of States in Parliament, Article 368 itself) also need **ratification by half the State legislatures**. Other amendments do not.\n" +
        "- The President **must give assent** (24th Amendment, 1971).\n" +
        "- Some provisions, such as forming new States under Article 3, change by a **simple majority** and do not count as amendments at all.",
      table: {
        columns: ["Kind of change", "Majority needed", "State ratification"],
        rows: [
          { cells: ["New States, names, boundaries (Articles 2 to 4)", "Simple majority", "Not needed"] },
          {
            cells: ["Most of the Constitution, for example Fundamental Rights or the First Schedule", "Special majority in each House", "Not needed"],
            noteAmber: "CDS 2016 (II): the 2015 land transfer to Bangladesh used Parliament's amending power alone, with no State ratification.",
            pyqExampleId: "d73bad4e-e65c-43cd-a3e2-8b964c519c9f",
          },
          { cells: ["Federal provisions, for example the Supreme Court or the Lists", "Special majority in each House", "Half the States"] },
        ],
      },
      pyqExampleId: "c10ea4b1-7421-43e7-9a7f-25915895af10",
      selfCheckExample: {
        prompt: "The Lok Sabha passes a Constitution Amendment Bill but the Rajya Sabha rejects it. Can the President call a joint sitting to pass it?",
        steps: [
          "A joint sitting under Article 108 is available only for ordinary Bills.",
          "An amendment Bill must pass each House separately by the special majority.",
        ],
        answer: "No. The Bill fails; there is no joint sitting for a Constitution Amendment Bill.",
      },
      practiceSet: [
        { prompt: "Can a State legislature introduce a Bill to amend the Constitution?", answer: "No. Only Parliament can" },
        { prompt: "Is the President's prior recommendation needed to introduce a Constitution Amendment Bill?", answer: "No" },
        { prompt: "In which Part of the Constitution is Article 368?", answer: "Part XX" },
        { prompt: "Can the President refuse assent to a Constitution Amendment Bill passed under Article 368?", answer: "No. Since the 24th Amendment, 1971, the President must give assent" },
      ],
      traps: [
        {
          title: "Not every amendment needs the States",
          body: "Only amendments to the **federal provisions** need ratification by **half the States**. The 100th Amendment of 2015 changed the First Schedule without it.",
        },
        {
          title: "Ceding territory is an amendment; forming a State is not",
          body: "Giving territory to **another country** needs an amendment under **Article 368**. Forming or reshaping a State inside India is an ordinary law under **Article 3**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolco-basic-structure",
      name: "The basic structure",
      intuition:
        "Parliament can amend any part of the Constitution, but it cannot use that power to destroy the Constitution's core. " +
        "The Supreme Court reached this limit in steps, and the step in 1973 is the one CDS asks about.",
      definition:
        "The cases in order:\n" +
        "- **Shankari Prasad (1951)**: Parliament can amend Fundamental Rights.\n" +
        "- **Golaknath (1967)**: Parliament **cannot** amend Fundamental Rights at all.\n" +
        "- **24th Amendment (1971)**: Parliament replied that it can amend any part of the Constitution.\n" +
        "- **Kesavananda Bharati (1973)**: Parliament can amend any part, but **not the basic structure**. This is the **basic structure doctrine**, a **limit on Article 368**, enforced by **judicial review**.\n" +
        "- **Minerva Mills (1980)**: a limited amending power is itself part of the basic structure.\n" +
        "- Judicial review, the supremacy of the Constitution, secularism, federalism and free and fair elections are among the features the courts have held basic.",
      table: {
        columns: ["Case or law", "Year", "Held"],
        rows: [
          { cells: ["Shankari Prasad", "1951", "Fundamental Rights can be amended"] },
          { cells: ["Golaknath", "1967", "Fundamental Rights cannot be amended"] },
          { cells: ["24th Amendment", "1971", "Parliament may amend any part"] },
          {
            cells: ["Kesavananda Bharati", "1973", "Any part may be amended, but not the basic structure"],
            pyqExampleId: "5e62c584-1581-410d-a80c-1fac0c84afd6",
          },
          { cells: ["Minerva Mills", "1980", "Limited amending power is a basic feature"] },
        ],
      },
      pyqExampleId: "ca2f89e8-d866-45a6-a3c8-af42eaf3952f",
      selfCheckExample: {
        prompt: "Which 1967 case held that Parliament could not amend the Fundamental Rights at all?",
        steps: ["Shankari Prasad (1951) had allowed such amendments.", "The 1967 ruling reversed it, and Kesavananda later replaced it."],
        answer: "Golaknath.",
      },
      practiceSet: [
        { prompt: "Which amendment of 1971 asserted that Parliament may amend any part of the Constitution?", answer: "The 24th Amendment" },
        { prompt: "Which 1980 case held that a limited amending power is part of the basic structure?", answer: "Minerva Mills" },
        { prompt: "Can Parliament amend the Fundamental Rights today?", answer: "Yes, as long as the basic structure is not destroyed" },
      ],
      traps: [
        {
          title: "Basic structure is Kesavananda, not Golaknath",
          body: "**Golaknath (1967)** said Fundamental Rights could not be amended at all. The **basic structure** doctrine came in **Kesavananda Bharati (1973)**, which allowed amendment but set a limit.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolco-early-amendments",
      name: "Amendments from 1951 to 1992",
      intuition:
        "The early amendments built the map of India (new States and Union Territories) and, in the 1970s, fought over Parliament's power. " +
        "Two of them, the 42nd and the 44th, changed so much that they are worth learning line by line.",
      definition:
        "The ones CDS names:\n" +
        "- **42nd (1976)**: added socialist, secular and integrity to the Preamble, added the **Fundamental Duties** (Article 51A), and moved five subjects to the Concurrent List.\n" +
        "- **44th (1978)**: removed the **Right to Property** from the Fundamental Rights (it is now a legal right under **Article 300A**), replaced 'internal disturbance' with **'armed rebellion'** as a ground for national emergency, and protected Articles 20 and 21 during an emergency.\n" +
        "- **Sikkim**: the **35th (1974)** made it an associate State; the **36th (1975)** made it a full State (Article 371F).\n" +
        "- **New States**: Nagaland's special provision came by the **13th (1962)**, Mizoram by the **53rd (1986)**, Arunachal Pradesh by the **55th (1986)**, Goa by the **56th (1987)**.",
      table: {
        columns: ["Amendment", "Year", "Change"],
        rows: [
          { cells: ["1st", "1951", "Ninth Schedule and Article 31B"] },
          { cells: ["7th", "1956", "States reorganised on linguistic lines"] },
          {
            cells: ["13th", "1962", "Nagaland: Article 371A"],
            noteAmber: "CDS 2026 (II): pairing Nagaland with the 14th Amendment was the mismatch.",
            pyqExampleId: "656cb936-140c-4935-b618-6382d096edc9",
          },
          { cells: ["14th", "1962", "Puducherry made a Union Territory; legislatures for Union Territories"] },
          { cells: ["21st", "1967", "Sindhi added to the Eighth Schedule"] },
          { cells: ["35th", "1974", "Sikkim an associate State"] },
          { cells: ["36th", "1975", "Sikkim a full State"] },
          { cells: ["42nd", "1976", "Socialist, secular, integrity; Fundamental Duties"] },
          {
            cells: ["44th", "1978", "Right to Property removed from Part III"],
            pyqExampleId: "87397706-c2a8-4f8f-b0ce-d33e4117b106",
          },
          { cells: ["52nd", "1985", "Anti-defection law (Tenth Schedule)"] },
          { cells: ["53rd", "1986", "Mizoram becomes a State"] },
          { cells: ["55th", "1986", "Arunachal Pradesh becomes a State"] },
          { cells: ["56th", "1987", "Goa becomes a State"] },
          { cells: ["61st", "1988", "Voting age lowered from 21 to 18"] },
          { cells: ["73rd and 74th", "1992", "Panchayats and Municipalities"] },
        ],
      },
      pyqExampleId: "65ef0b11-73bd-480c-b0e8-a3814c59ec1f",
      selfCheckExample: {
        prompt: "Which amendment lowered the voting age from 21 to 18?",
        steps: ["The change came in the late 1980s.", "It was the 61st Amendment, 1988."],
        answer: "The 61st Amendment.",
      },
      practiceSet: [
        { prompt: "Which amendment added the Fundamental Duties to the Constitution?", answer: "The 42nd Amendment, 1976" },
        { prompt: "Under which Article is the right to property now a legal right?", answer: "Article 300A" },
        { prompt: "Which amendment made Arunachal Pradesh a State?", answer: "The 55th Amendment, 1986" },
        { prompt: "Which amendment brought in the anti-defection law?", answer: "The 52nd Amendment, 1985" },
      ],
      traps: [
        {
          title: "35th associated Sikkim, 36th admitted it",
          body: "The **35th Amendment (1974)** made Sikkim an associate State. Only the **36th (1975)** made it a full State of the Union.",
        },
        {
          title: "Property is still a right, just not a Fundamental one",
          body: "The 44th Amendment took the Right to Property out of Part III. It survives as a **constitutional legal right** under **Article 300A**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolco-recent-amendments",
      name: "Amendments since 2000",
      intuition:
        "The recent amendments are about rights, taxes and reservations. " +
        "CDS gives the change and four nearby numbers, so tie each number to one headline.",
      definition:
        "The ones CDS names:\n" +
        "- **86th (2002)**: **Article 21A**, free and compulsory education for children of **6 to 14** as a Fundamental Right.\n" +
        "- **91st (2003)**: the Council of Ministers capped at **15 per cent** of the Lok Sabha or the State Assembly.\n" +
        "- **101st (2016)**: **GST**. It added **Article 246A**, letting the Union and the States tax the same supply together, and Article 269A for GST on **inter-State** trade. An amendment was needed because **Article 246** had split taxes between them and had no room for one tax levied by both.\n" +
        "- **102nd (2018)**: constitutional status for the **National Commission for Backward Classes**, and **Article 342A**.\n" +
        "- **103rd (2019)**: **10 per cent** reservation for the **Economically Weaker Sections**.\n" +
        "- **105th (2021)**: under Article 342A the President notifies a **Central List** of backward classes for each State, and every **State may keep its own list**, which can differ.\n" +
        "- **106th (2023)**: one-third of seats for **women** in the **Lok Sabha**, the **State Legislative Assemblies** and the Delhi Assembly; **not** the Rajya Sabha or the Legislative Councils. Women already had one-third of seats in **Panchayats** (Article 243D, 1992).",
      table: {
        columns: ["Amendment", "Year", "Change"],
        rows: [
          {
            cells: ["86th", "2002", "Right to Education, Article 21A"],
            pyqExampleId: "5f7f7854-6c19-4589-bcf5-46f57545dce8",
          },
          {
            cells: ["91st", "2003", "Council of Ministers capped at 15 per cent"],
            pyqExampleId: "e261bdfc-d333-4d0c-8aef-009029fa1528",
          },
          { cells: ["92nd", "2003", "Bodo, Dogri, Maithili, Santhali in the Eighth Schedule"] },
          { cells: ["100th", "2015", "Land Boundary Agreement with Bangladesh"] },
          {
            cells: ["101st", "2016", "Goods and Services Tax (Articles 246A, 269A)"],
            pyqExampleId: "18707145-a39e-4a57-b53c-bb8228d64094",
          },
          { cells: ["102nd", "2018", "National Commission for Backward Classes"] },
          { cells: ["103rd", "2019", "Reservation for the Economically Weaker Sections"] },
          {
            cells: ["105th", "2021", "States may keep their own backward class lists"],
            pyqExampleId: "109846dc-2cef-44a4-8d41-13b8dfa9ff6d",
          },
          {
            cells: ["106th", "2023", "One-third of seats for women in the Lok Sabha and State Assemblies"],
            noteAmber: "CDS 2025 (II): the 106th covers neither the Rajya Sabha nor the Legislative Councils.",
            pyqExampleId: "b0d594e3-e9d6-49ec-bd1d-28dec6573139",
          },
        ],
      },
      pyqExampleId: "7e7e41ff-4a7a-4777-9e15-4812048880e2",
      selfCheckExample: {
        prompt: "Why did India need a constitutional amendment, and not just a law, to bring in GST?",
        steps: [
          "Article 246 and the Seventh Schedule gave some indirect taxes to the Union and others to the States.",
          "A single tax levied by both at once needed a new Article, 246A, which only an amendment could add.",
        ],
        answer: "Because Article 246 had no room for a tax levied by the Union and the States together.",
      },
      practiceSet: [
        { prompt: "Which amendment made education a Fundamental Right for children of 6 to 14?", answer: "The 86th Amendment, 2002" },
        { prompt: "Which amendment gave constitutional status to the National Commission for Backward Classes?", answer: "The 102nd Amendment, 2018" },
        { prompt: "Does the 106th Amendment reserve seats for women in the Rajya Sabha?", answer: "No. Only in the Lok Sabha, the State Assemblies and the Delhi Assembly" },
        { prompt: "Which Article reserves one-third of Panchayat seats for women?", answer: "Article 243D" },
      ],
      traps: [
        {
          title: "101st is GST, 102nd is backward classes",
          body: "The **101st (2016)** brought in **GST**. The **102nd (2018)** gave the National Commission for Backward Classes its constitutional status. The **103rd (2019)** is the EWS reservation.",
        },
        {
          title: "Women's reservation leaves out the upper Houses",
          body: "The **106th Amendment** reserves seats only in the **Lok Sabha**, the **State Legislative Assemblies** and the Delhi Assembly. The Rajya Sabha and the Legislative Councils are not covered.",
        },
      ],
    },
  ],
};
