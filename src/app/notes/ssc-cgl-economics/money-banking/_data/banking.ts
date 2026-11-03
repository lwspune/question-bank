import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_XMB_BANKING_NOTE: SubtopicNote = {
  subtopicName: "Banks, Microfinance and Financial Inclusion",
  title: "Banks, Microfinance and Financial Inclusion",
  oneLineDefinition:
    "India's development banks and NABARD with their years, the schemes that bring banking to the poor, and microfinance: self-help groups, the Malegam committee and the RBI's rules for microfinance lenders.",
  whyItMatters:
    "Twenty-eight questions in the bank: 16 from the 2023 shifts, ten from the 2024 shifts and two from the 2025 shifts. Microfinance alone gave 16 of them, nearly all in 2023, and the hard ones ask an exact RBI rule, so learn the rules table as written.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscxmbba-institutions",
      name: "Banks, development institutions and inclusion schemes",
      intuition:
        "Formal credit comes from regulated bodies, not moneylenders. SSC asks when each body was set up and what each inclusion scheme is for.",
      definition:
        "Institutions:\n" +
        "- **Institutional credit**: commercial banks, cooperatives, regional rural banks. Moneylenders, traders and commission agents are informal.\n" +
        "- Development banks in order: **IFCI 1948**, **ICICI 1955**, **IDBI 1964**.\n" +
        "- **Lead Bank Scheme**: **1969**, one bank in charge of each district.\n" +
        "- **NABARD**: **1982**, the apex body for farm and rural credit.\n" +
        "- **India Post Payments Bank**: banking at the door through **postmen**.\n" +
        "- **Bandhan Bank** is a **private** bank; Canara, UCO and Indian Overseas Bank are public sector. **BFSI** is Banking, Financial Services and **Insurance**.\n\n" +
        "Schemes:\n" +
        "- **PM Jan Dhan Yojana** (2014): the **National Mission for Financial Inclusion**, a basic account for every household.\n" +
        "- **Stand-Up India** (2016): bank loans for **SC, ST and women** entrepreneurs.\n" +
        "- **PM MUDRA Yojana** (2015): **collateral-free** loans through member lending institutions, up to **Rs 10 lakh** when the question was set. MUDRA is **Micro Units Development and Refinance Agency**.\n" +
        "- The **Factoring Regulation (Amendment) Bill, 2021** eased working capital for **MSMEs**.",
      table: {
        columns: ["Name", "Fact"],
        rows: [
          { cells: ["IFCI, ICICI, IDBI", "1948, 1955, 1964"], pyqExampleId: "18e082dc-2db8-4621-8103-17b126e272d9" },
          { cells: ["Lead Bank Scheme", "1969"], pyqExampleId: "6834722d-c816-431a-b1c2-d7ffb5065220" },
          { cells: ["India Post Payments Bank", "Banking through postmen"], pyqExampleId: "6a10a596-ee8f-4ebb-abc5-11a044d13b9b" },
          { cells: ["PM Jan Dhan Yojana", "Financial inclusion mission"], pyqExampleId: "d349c977-d336-422f-bc7e-c6fb80a61d3a" },
          { cells: ["Stand-Up India", "SC, ST and women entrepreneurs"], pyqExampleId: "9d51e8f4-9b67-4c87-8a7b-8c2cde5ba334" },
          { cells: ["PM MUDRA Yojana", "Collateral-free micro loans"], pyqExampleId: "a161736c-9d24-4386-9683-f5eb23d788ea" },
        ],
      },
      pyqExampleId: "cd78cb31-b950-4b99-b96d-09ee7f6d3679",
      selfCheckExample: {
        prompt: "Put these in the order they were set up: IDBI, IFCI, ICICI.",
        steps: ["IFCI came first, in 1948, and ICICI in 1955.", "IDBI followed in 1964."],
        answer: "IFCI, ICICI, IDBI.",
      },
      practiceSet: [
        { prompt: "Which of these is an institutional source of credit: commercial bank or moneylender?", answer: "Commercial bank" },
        { prompt: "What does the I in BFSI stand for?", answer: "Insurance" },
        { prompt: "Is Bandhan Bank in the public or private sector?", answer: "Private" },
      ],
      traps: [
        {
          title: "Jan Dhan is inclusion, not microfinance",
          body: "**PM Jan Dhan Yojana** opens basic bank accounts. It is not a **microfinance-sector** initiative, unlike E-Shakti, MUDRA and the India Micro Finance Equity Fund.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscxmbba-microfinance",
      name: "Microfinance and self-help groups",
      intuition:
        "Microfinance lends small sums to people banks would otherwise turn away. In India it runs through self-help groups linked to banks, and through registered microfinance lenders the RBI regulates.",
      definition:
        "Basics:\n" +
        "- **Microfinance**: small loans and other services for low-income people with **no access** to regular banking.\n" +
        "- The idea came from **Muhammad Yunus** and the **Grameen Bank** of Bangladesh (1970s).\n" +
        "- A **self-help group** has about **10 to 20** members who pool savings; the **members** decide loans and savings. An SHG is small and informal; an MFI is a larger, formal institution.\n" +
        "- **NABARD** began the **SHG-Bank Linkage Programme** in **1992-93**, and NGOs train the groups.\n\n" +
        "Regulation:\n" +
        "- The **RBI** regulates microfinance institutions.\n" +
        "- The **Malegam Committee** (set up **2010**, after the Andhra Pradesh crisis) proposed the **NBFC-MFI** category.\n" +
        "- RBI rules of **2022**: a microfinance loan is **collateral-free**, to a household earning up to **Rs 3 lakh** a year, and **not** tied to a lien on the borrower's deposit account. An NBFC-MFI must keep at least **75% of total assets** in such loans.\n" +
        "- **MFIN** (Microfinance Institutions Network) is the sector's **self-regulatory organisation**.",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          { cells: ["SHG-Bank Linkage", "NABARD, 1992-93"], pyqExampleId: "0777f090-7149-4b81-9e77-1a1681aecd17" },
          { cells: ["Regulator of MFIs", "RBI"], pyqExampleId: "40fa0d39-f040-4b47-a056-1804b5b86307" },
          { cells: ["Malegam Committee", "2010; NBFC-MFI category"], pyqExampleId: "fe5e97c4-f000-4819-b5b4-30e42f9ea5ec" },
          { cells: ["NBFC-MFI minimum", "75% of total assets"], pyqExampleId: "7f3daf63-c59c-45a5-969b-d2023c9fb0dc" },
          { cells: ["Self-regulatory body", "MFIN"], pyqExampleId: "f35ad828-9d19-408a-9379-c6354fde3188" },
        ],
      },
      pyqExampleId: "d6917322-b0fd-491a-bcde-69e651e323ad",
      selfCheckExample: {
        prompt: "A lender asks a microfinance borrower to put a lien on the borrower's savings account as security. Is that allowed under the 2022 rules?",
        steps: ["The 2022 rules make microfinance loans collateral-free.", "They say the loan must not be linked to a lien on the borrower's deposit account."],
        answer: "No.",
      },
      practiceSet: [
        { prompt: "Who decides loans in a self-help group?", answer: "The group's members" },
        { prompt: "Who founded the Grameen Bank?", answer: "Muhammad Yunus" },
        { prompt: "What is the household income limit for a microfinance loan?", answer: "Rs 3 lakh a year" },
      ],
      traps: [
        {
          title: "Total assets, not equity",
          body: "The NBFC-MFI rule is **75% of total assets** in microfinance loans. Options give 75% of equity or 90% of assets.",
        },
      ],
    },
  ],
};
