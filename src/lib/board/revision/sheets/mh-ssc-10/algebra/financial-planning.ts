import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Algebra, Ch. 4 Financial Planning. Every rate rule checked against
 * the Balbharati Mathematics Part I text (GST slabs, CGST = SGST, 15-character
 * GSTIN, 18% GST on brokerage, dividend on FV, brokerage on MV); formulas
 * rebuilt; most-asked years and marks from the board past-paper questions in
 * the bank, 2019-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Algebra",
  subjectRoute: "algebra",
  chapterName: "Financial Planning",
  chapterSlug: "financial-planning",
  source: "Balbharati Mathematics Part I Std X (Maharashtra State Board), Chapter 4",
  keyPoints: [
    {
      term: "GST",
      text: "Goods and Service Tax, in effect from 1st July 2017. Many earlier taxes are subsumed in it: **One nation, One tax, One market**. It is an **indirect tax**: the customer finally pays it.",
    },
    {
      term: "CGST and SGST",
      text: "For trading within a state, GST has two equal halves: CGST (paid to the central government) and SGST (paid to the state government). In a tax invoice the CGST amount always equals the SGST amount.",
    },
    {
      term: "Rates of GST",
      text: "0%, 5%, 12%, 18% and 28%, fixed by the government. Essential commodities (food grains, fruits, vegetables, milk, salt) are at **0%**. Brokerage services are at **18%**.",
    },
    {
      term: "Types of GST",
      text: "Within a state: CGST + SGST (in a Union Territory, CGST + UTGST). **IGST**: levied by the central government for inter-state trading.",
    },
    {
      term: "GSTIN",
      text: "Goods and Service Tax Identification Number, **15 alphanumerals**, including the dealer's 10-character PAN. The first two digits are the state code (27 for Maharashtra).",
    },
    {
      term: "HSN and SAC",
      text: "Goods carry an HSN code (Harmonized System of Nomenclature); services carry a SAC (Service Accounting Code). The code is quoted in the tax invoice.",
    },
    {
      term: "Taxable value and total value",
      text: "The value of goods on which GST is levied is the **taxable value**. Total value (invoice value) = taxable value + GST. If not mentioned, take the selling price as the taxable value.",
    },
    {
      term: "Input tax credit (ITC)",
      text: "GST paid at purchase is **input tax**; GST collected at sale is **output tax**. A trader takes the input tax as credit and pays only the rest: GST payable = output tax - ITC.",
    },
    {
      term: "B2B and B2C",
      text: "Trading between GSTIN holders is Business to Business (B2B). Trading between a GSTIN holder and a consumer is Business to Consumer (B2C), the last link in the trading chain.",
    },
    {
      term: "Share, FV and MV",
      text: "A share is the smallest unit of a company's capital. **Face value (FV)**: the value printed on the share certificate. **Market value (MV)**: the price at which it is bought or sold in the stock market.",
    },
    {
      term: "Premium, par, discount",
      text: "MV > FV: the share is at a **premium**. MV = FV: at **par**. MV < FV: at a **discount**.",
    },
    {
      term: "Dividend",
      text: "The part of the annual profit distributed per share among shareholders. Whatever the market value, the dividend is always reckoned on the **face value**.",
    },
    {
      term: "Brokerage",
      text: "The broker's charge for buying or selling shares. Brokerage is always calculated on the **market value**, and GST at **18%** is charged on the brokerage (9% CGST + 9% SGST).",
    },
    {
      term: "Mutual fund and NAV",
      text: "In a mutual fund you get **units**; the market value of a unit is its NAV (Net Asset Value). NAV × number of units = total fund value. SIP: investing small amounts at regular intervals.",
    },
  ],
  formulas: [
    { label: "GST, CGST and SGST", latex: "\\text{GST} = \\frac{\\text{rate}}{100} \\times \\text{taxable value} \\qquad \\text{CGST} = \\text{SGST} = \\frac{\\text{GST}}{2}" },
    { label: "Total value", latex: "\\text{Total value} = \\text{taxable value} + \\text{GST}" },
    { label: "Taxable value from total value", latex: "\\text{Taxable value} = \\text{total value} \\times \\frac{100}{100 + \\text{rate of GST}}" },
    { label: "Rate of GST", latex: "\\text{Rate} = \\frac{\\text{total GST}}{\\text{taxable value}} \\times 100" },
    { label: "GST payable", latex: "\\text{GST payable} = \\text{output tax} - \\text{ITC}" },
    { label: "Market value", latex: "\\text{MV} = \\text{FV} + \\text{premium} \\qquad \\text{MV} = \\text{FV} - \\text{discount}" },
    { label: "Sum invested", latex: "\\text{Sum invested} = \\text{number of shares} \\times \\text{MV}" },
    { label: "Dividend per share", latex: "\\text{Dividend} = \\frac{\\text{rate of dividend}}{100} \\times \\text{FV}" },
    { label: "Rate of return", latex: "\\text{Rate of return} = \\frac{\\text{dividend income}}{\\text{sum invested}} \\times 100" },
    { label: "Brokerage and its GST", latex: "\\text{Brokerage} = \\frac{\\text{rate}}{100} \\times \\text{MV} \\qquad \\text{GST} = \\frac{18}{100} \\times \\text{brokerage}" },
    {
      label: "Buying and selling one share",
      latex: "\\text{Buy: MV} + \\text{brokerage} + \\text{GST} \\qquad \\text{Sell: MV} - \\text{brokerage} - \\text{GST}",
    },
    { label: "Mutual fund units", latex: "\\text{Number of units} = \\frac{\\text{sum invested}}{\\text{NAV}}" },
  ],
  derivations: [
    {
      title: "Find the taxable value when the price with GST is given (method)",
      steps: [
        "With GST at 18%, a taxable value of ₹100 has a total value of ₹118.",
        "So taxable value = total value \\(\\times \\frac{100}{118}\\). For ₹2360: \\(2360 \\times \\frac{100}{118} = 2000\\), so ₹2000.",
        "GST = 2360 - 2000 = ₹360, so CGST = SGST = ₹180.",
      ],
    },
    {
      title: "Find the GST payable at each stage of a trading chain (method)",
      steps: [
        "Output tax of each trader = rate × his selling (taxable) value.",
        "His ITC = the GST he paid on purchase (the previous trader's output tax).",
        "GST payable = output tax - ITC; then CGST payable = SGST payable = half of it.",
      ],
    },
    {
      title: "Find the total cost of buying shares with brokerage and GST (method)",
      steps: [
        "Value of shares = number of shares × MV.",
        "Brokerage = rate × value of shares; GST = 18% of the brokerage.",
        "Amount paid = value of shares + brokerage + GST (on selling, subtract both instead).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Tax invoice (goods)",
      labels: ["supplier's name, address, GSTIN", "invoice number and date", "HSN code", "taxable amount", "CGST rate and amount", "SGST rate and amount, total"],
    },
    {
      title: "Contract note for buying shares",
      labels: ["number of shares", "MV of a share", "total value", "brokerage at its rate", "CGST 9% and SGST 9% on brokerage", "total amount"],
    },
  ],
  mostAsked: [
    { topic: "Face value, market value, premium, discount: MV, sum invested or number of shares", marks: 2, years: [2026, 2025, 2024, 2023, 2019] },
    { topic: "Rate of GST, CGST or SGST (and GST on brokerage, essential goods)", marks: 1, years: [2026, 2023, 2020] },
    { topic: "Find CGST and SGST, the price with GST, the taxable value or the rate of GST", years: [2026, 2025, 2024, 2023] },
    { topic: "Brokerage and GST on brokerage: cost of buying or amount received on selling", years: [2026, 2025, 2024] },
    { topic: "GSTIN format, types of GST, or fill a tax invoice", marks: 1, years: [2025, 2024, 2023, 2020, 2019] },
    { topic: "Dividend and rate of return on shares", marks: 3, years: [2025, 2024, 2020] },
    { topic: "Input tax credit (ITC) and GST payable", marks: 3, years: [2026, 2019] },
  ],
  mistakes: [
    {
      title: "Dividend on the market value",
      body: "Dividend is always on the **face value**. 7% dividend on a ₹100 share is ₹7, even if you paid ₹120 for it.",
    },
    {
      title: "Brokerage on the face value",
      body: "Brokerage is on the **market value**. And the 18% GST is on the brokerage only, never on the share price.",
    },
    {
      title: "Taking 18% of the total value",
      body: "If the price **with** GST is given, the taxable value is total × 100/118, not total minus 18% of total.",
    },
    {
      title: "Writing CGST rate = GST rate",
      body: "CGST and SGST are each **half** the GST rate: 12% GST is 6% CGST + 6% SGST; 9% CGST means 18% GST.",
    },
    {
      title: "Adding brokerage when selling",
      body: "On buying, brokerage and its GST are added to the MV. On selling, they are **subtracted** from the MV.",
    },
  ],
};

export default sheet;
