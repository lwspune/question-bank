import type { SubtopicNote } from "@/app/notes/_types";

export const SUMS_STAT_NOTE: SubtopicNote = {
  subtopicName: "Variance from Sums and Shifts",
  title: "Variance from Sums and Shifts",
  oneLineDefinition:
    "Getting the mean and variance from given sums — of the values, of shifted squares or of pairwise products — and from a shift or scale of the data.",
  whyItMatters:
    "Seventeen PYQs, ten of them multiple choice, and three from 2026. Nine turn given sums, such as Σ(x − a) and Σ(x − b)² or the pairwise products, into the mean and variance; eight shift or scale the data, or need the variance of an arithmetic progression. Two ideas cover the page.",
  concepts: [
    // C1 — mean and variance from sums
    {
      kind: "formula" as const,
      slug: "jstat-sums",
      name: "Mean and variance from sums",
      intuition:
        "Everything here comes from three numbers: \\(n\\), \\(\\sum x_i\\) and \\(\\sum x_i^2\\). Any given sum, such as \\(\\sum(x_i-a)\\) or \\(\\sum(x_i-a)^2\\), expands into those two sums. A shift by \\(a\\) does not change the variance, so you can also work with \\(d_i=x_i-a\\) directly. Pairwise products come in through the square of the total.",
      definition:
        "- \\(\\bar x=\\frac{1}{n}\\sum x_i\\), \\(\\sigma^2=\\frac{1}{n}\\sum x_i^2-\\bar x^2\\).\n" +
        "- \\(\\sum(x_i-a)=\\sum x_i-na\\).\n" +
        "- \\(\\sum(x_i-a)^2=\\sum x_i^2-2a\\sum x_i+na^2\\).\n" +
        "- With \\(d_i=x_i-a\\): \\(\\sigma^2=\\frac{1}{n}\\sum d_i^2-\\bar d^{\\,2}\\).\n" +
        "- \\(\\left(\\sum x_i\\right)^2=\\sum x_i^2+2\\sum_{i<j}x_ix_j\\).",
      formula: {
        label: "Variance from sums",
        latex: "\\sigma^2=\\frac{\\sum x_i^2}{n}-\\left(\\frac{\\sum x_i}{n}\\right)^2",
      },
      authoredExample: {
        prompt: "For 10 observations, \\(\\sum(x_i-3)=20\\) and \\(\\sum(x_i-3)^2=90\\). Find the mean and variance.",
        steps: [
          "With \\(d_i=x_i-3\\): \\(\\bar d=\\frac{20}{10}=2\\), so \\(\\bar x=3+2=5\\).",
          "The shift does not change the variance: \\(\\sigma^2=\\frac{90}{10}-2^2=5\\).",
        ],
        answer: "Mean \\(5\\), variance \\(5\\).",
      },
      selfCheckExample: {
        prompt: "Five observations have \\(\\sum x_i=20\\) and \\(\\sum_{i<j}x_ix_j=150\\). Find their variance.",
        steps: [
          "\\(\\sum x_i^2=20^2-2(150)=100\\).",
          "\\(\\sigma^2=\\frac{100}{5}-4^2=4\\).",
        ],
        answer: "\\(4\\).",
      },
      practiceSet: [
        { prompt: "\\(n=5\\), \\(\\sum x=15\\), \\(\\sum x^2=65\\): variance?", answer: "\\(4\\)" },
        { prompt: "\\(\\sum(x_i-2)=0\\) for 8 values: mean?", answer: "\\(2\\)" },
        { prompt: "Mean 4, variance 3, \\(n=10\\): \\(\\sum x_i^2\\)?", answer: "\\(190\\)" },
        { prompt: "\\(\\sum(x_i+1)^2-\\sum(x_i-1)^2\\) equals?", answer: "\\(4\\sum x_i\\)" },
      ],
      pyqExampleId: "1a48be9f-cf32-4329-a50a-511d258c59f9", // 2026 — ratio of mean to SD from sums of (x+5)^2 and (x-5)^2
      traps: [
        {
          title: "Squares about a is not the variance",
          body: "\\(\\frac{1}{n}\\sum(x_i-a)^2\\) is the variance only when \\(a\\) is the mean. For any other \\(a\\), subtract \\(\\left(\\frac{1}{n}\\sum(x_i-a)\\right)^2\\).",
        },
      ],
    },

    // C2 — shifts, scales and arithmetic progressions
    {
      kind: "formula" as const,
      slug: "jstat-transform",
      name: "Shifts, scales and arithmetic progressions",
      intuition:
        "Adding \\(b\\) to every value moves the mean by \\(b\\) and leaves the spread alone. Multiplying by \\(a\\) multiplies the mean by \\(a\\), the standard deviation by \\(|a|\\) and the variance by \\(a^2\\). Values in an A.P. are a scaled and shifted copy of \\(1,2,\\ldots,n\\), so their variance has a closed form.",
      definition:
        "- \\(y_i=ax_i+b\\): \\(\\bar y=a\\bar x+b\\), \\(\\sigma_y=|a|\\,\\sigma_x\\).\n" +
        "- Adding a constant: the variance does not change.\n" +
        "- \\(1,2,\\ldots,n\\): \\(\\sigma^2=\\frac{n^2-1}{12}\\).\n" +
        "- An A.P. of \\(n\\) terms with difference \\(d\\): \\(\\sigma^2=\\frac{d^2(n^2-1)}{12}\\).",
      formula: {
        label: "Linear change of data",
        latex: "y_i=ax_i+b\\ \\Rightarrow\\ \\bar y=a\\bar x+b,\\quad \\sigma_y^2=a^2\\sigma_x^2",
      },
      authoredExample: {
        prompt: "Each of the values \\(1,2,\\ldots,9\\) is changed to \\(3x-2\\). Find the mean and variance of the new values.",
        steps: [
          "For \\(1,\\ldots,9\\): \\(\\bar x=5\\) and \\(\\sigma^2=\\frac{81-1}{12}=\\frac{20}{3}\\).",
          "Then \\(\\bar y=3(5)-2=13\\) and \\(\\sigma_y^2=9\\cdot\\frac{20}{3}=60\\).",
        ],
        answer: "Mean \\(13\\), variance \\(60\\).",
      },
      selfCheckExample: {
        prompt: "Find the variance of \\(5,9,13,\\ldots,41\\).",
        steps: [
          "\\(n=\\frac{41-5}{4}+1=10\\) terms with \\(d=4\\).",
          "\\(\\sigma^2=\\frac{16(100-1)}{12}=132\\).",
        ],
        answer: "\\(132\\).",
      },
      practiceSet: [
        { prompt: "SD of \\(x\\) is 3. SD of \\(5-2x\\)?", answer: "\\(6\\)" },
        { prompt: "Variance of \\(1,2,\\ldots,7\\)?", answer: "\\(4\\)" },
        { prompt: "Add 10 to every value: the variance?", answer: "Unchanged" },
        { prompt: "Mean 6, variance 4. Mean and variance of \\(3x+1\\)?", answer: "\\(19\\) and \\(36\\)" },
      ],
      pyqExampleId: "96b24deb-93e3-47b5-80df-b95374228658", // 2026 — Y = aX + b on 1..19, two possible values of b
      traps: [
        {
          title: "The sign of a is lost",
          body: "The variance is multiplied by \\(a^2\\), so \\(a\\) and \\(-a\\) give the same spread. A question that fixes the variance usually has two values of \\(a\\), and so two values of \\(b\\).",
        },
      ],
    },
  ],
};
