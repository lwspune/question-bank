import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_IN_DIFFERENCE_NOTE: SubtopicNote = {
  subtopicName: "Instalments and Difference of SI and CI",
  title: "CI Minus SI, and Instalments",
  oneLineDefinition:
    "Over two years compound interest exceeds simple interest by the interest on the first year's interest, P(r/100)²; instalments repay a loan when their values today add up to it.",
  whyItMatters:
    "Eight PYQs, one of them HARD. Six use the CI − SI gap, which for two years is P(r/100)², so the sum is read off in one line. The two instalment items discount each payment back to today and add.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsin-difference",
      name: "The gap between CI and SI",
      intuition:
        "In year one both methods earn the same. In year two, compound interest also earns interest on year one's interest: \\(P \\cdot \\tfrac r{100} \\cdot \\tfrac r{100}\\). That extra is the whole gap for two years.",
      definition:
        "- Two years: \\(\\text{CI} - \\text{SI} = P\\left(\\dfrac{r}{100}\\right)^2\\).\n" +
        "- Three years: \\(\\text{CI} - \\text{SI} = P\\left(\\dfrac{r}{100}\\right)^2\\left(3 + \\dfrac{r}{100}\\right)\\).\n" +
        "- Half-yearly compounding: work out CI with the adjusted rate and periods, then subtract the SI directly.",
      formula: {
        label: "Two-year gap",
        latex: "\\text{CI} - \\text{SI} = P\\left(\\dfrac{r}{100}\\right)^2",
      },
      authoredExample: {
        prompt: "The CI and SI on a sum for \\(2\\) years at \\(8\\%\\) differ by Rs. \\(32\\). Find the sum.",
        steps: ["\\(P \\times \\dfrac{64}{10{,}000} = 32\\)."],
        answer: "Rs. \\(5000\\).",
      },
      selfCheckExample: {
        prompt: "Find CI \\(-\\) SI on Rs. \\(1000\\) for \\(3\\) years at \\(10\\%\\).",
        steps: ["\\(1000 \\times 0.01 \\times 3.1\\)."],
        answer: "Rs. \\(31\\).",
      },
      practiceSet: [
        { prompt: "Gap Rs. \\(9\\) for \\(2\\) years at \\(3\\%\\). Sum?", answer: "Rs. \\(10{,}000\\)" },
        { prompt: "Rs. \\(2500\\) at \\(6\\%\\) for \\(2\\) years. Gap?", answer: "Rs. \\(9\\)" },
        { prompt: "Rs. \\(1000\\): CI at \\(10\\%\\) vs SI at \\(11\\%\\), \\(3\\) years. Difference?", answer: "Rs. \\(1\\)" },
        { prompt: "Is the gap ever negative for \\(r > 0\\), \\(n \\ge 2\\)?", answer: "No" },
      ],
      pyqExampleId: "60d16d1e-23b5-4ea0-8f52-adcb5b39da70", // 2017 (II) — gap Rs. 15 for 2 years at 5%
      traps: [
        {
          title: "The two-year formula is for two years only",
          body:
            "For three years the gap is \\(P(r/100)^2(3 + r/100)\\), not \\(P(r/100)^3\\) and not \\(P(r/100)^2\\). Use the formula for the years asked, or compute both interests.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsin-instalments",
      name: "Equal instalments",
      intuition:
        "A payment of \\(X\\) made after \\(k\\) years is worth only \\(\\dfrac{X}{(1 + r)^k}\\) today. Equal instalments repay the loan when those present values add up to the sum borrowed.",
      definition:
        "- Present value of \\(X\\) due in \\(k\\) years: \\(\\dfrac{X}{\\left(1 + \\frac r{100}\\right)^k}\\).\n" +
        "- \\(n\\) equal yearly instalments: \\(X\\sum_{k=1}^{n}\\dfrac{1}{\\left(1 + \\frac r{100}\\right)^k} = P\\).\n" +
        "- Two instalments at \\(10\\%\\): \\(X\\left(\\dfrac{10}{11} + \\dfrac{100}{121}\\right) = P\\).",
      formula: {
        label: "Two instalments",
        latex: "\\dfrac{X}{1 + r} + \\dfrac{X}{(1 + r)^2} = P",
      },
      authoredExample: {
        prompt: "A loan is repaid in two equal yearly instalments of Rs. \\(1210\\) at \\(10\\%\\) compound interest. How much was borrowed?",
        steps: ["\\(\\dfrac{1210}{1.1} + \\dfrac{1210}{1.21} = 1100 + 1000\\)."],
        answer: "Rs. \\(2100\\).",
      },
      selfCheckExample: {
        prompt: "Rs. \\(1050\\) is borrowed at \\(5\\%\\) compound interest and repaid in two equal yearly instalments. Find each.",
        steps: ["\\(X\\left(\\dfrac{20}{21} + \\dfrac{400}{441}\\right) = 1050\\), that is \\(X \\times \\dfrac{820}{441} = 1050\\)."],
        answer: "About Rs. \\(564.7\\).",
      },
      practiceSet: [
        { prompt: "Present value of Rs. \\(1210\\) due in \\(2\\) years at \\(10\\%\\)?", answer: "Rs. \\(1000\\)" },
        { prompt: "Present value of Rs. \\(1100\\) due in \\(1\\) year at \\(10\\%\\)?", answer: "Rs. \\(1000\\)" },
        { prompt: "Is each instalment more or less than \\(\\tfrac P2\\) for two instalments?", answer: "More" },
        { prompt: "\\(\\dfrac1{1.1} + \\dfrac1{1.21}\\) as a fraction?", answer: "\\(\\dfrac{210}{121}\\)" },
      ],
      pyqExampleId: "715ac322-f79b-4e39-a738-4925f43063a7", // 2017 (I) — Rs. 8,400 in two instalments at 10%
      traps: [
        {
          title: "Discount each payment separately",
          body:
            "The second instalment is discounted over TWO years, not one. Dividing the loan in half and adding a year's interest gives an option that is always offered and always wrong.",
        },
      ],
    },
  ],
};
