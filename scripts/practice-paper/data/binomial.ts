import type { Spec } from "../types";

export const BINOMIAL: Spec[] = [
  // ===== P(X = k) for a specific k (5) =====
  {
    chapter: "Binomial Distribution",
    subtopic: "P(X = k)",
    difficulty: "EASY",
    stem: "A fair coin is tossed \\(5\\) times. What is the probability of getting exactly \\(3\\) heads?",
    correct: "\\(\\dfrac{5}{16}\\)",
    distractors: ["\\(\\dfrac{3}{16}\\)", "\\(\\dfrac{1}{2}\\)", "\\(\\dfrac{10}{16}\\)"],
    solution:
      "Here \\(n=5,\\ p=\\dfrac{1}{2},\\ q=\\dfrac{1}{2}\\). Then \\(P(X=3)=\\binom{5}{3}\\left(\\dfrac{1}{2}\\right)^3\\left(\\dfrac{1}{2}\\right)^2=10\\cdot\\dfrac{1}{32}=\\dfrac{10}{32}=\\dfrac{5}{16}\\).",
  },
  {
    chapter: "Binomial Distribution",
    subtopic: "P(X = k)",
    difficulty: "EASY",
    stem: "A die is thrown \\(4\\) times. What is the probability of getting exactly two sixes?",
    correct: "\\(\\dfrac{25}{216}\\)",
    distractors: ["\\(\\dfrac{1}{36}\\)", "\\(\\dfrac{25}{1296}\\)", "\\(\\dfrac{5}{216}\\)"],
    solution:
      "Here \\(n=4,\\ p=\\dfrac{1}{6},\\ q=\\dfrac{5}{6}\\). Then \\(P(X=2)=\\binom{4}{2}\\left(\\dfrac{1}{6}\\right)^2\\left(\\dfrac{5}{6}\\right)^2=6\\cdot\\dfrac{1}{36}\\cdot\\dfrac{25}{36}=\\dfrac{150}{1296}=\\dfrac{25}{216}\\).",
  },
  {
    chapter: "Binomial Distribution",
    subtopic: "P(X = k)",
    difficulty: "MODERATE",
    stem: "In a box \\(20\\%\\) of the bulbs are defective. If \\(5\\) bulbs are drawn at random (with replacement), what is the probability that exactly \\(2\\) are defective?",
    correct: "\\(\\binom{5}{2}\\left(\\dfrac{1}{5}\\right)^2\\left(\\dfrac{4}{5}\\right)^3\\)",
    distractors: [
      "\\(\\binom{5}{2}\\left(\\dfrac{4}{5}\\right)^2\\left(\\dfrac{1}{5}\\right)^3\\)",
      "\\(\\left(\\dfrac{1}{5}\\right)^2\\left(\\dfrac{4}{5}\\right)^3\\)",
      "\\(\\binom{5}{2}\\left(\\dfrac{1}{5}\\right)^2\\)",
    ],
    solution:
      "Probability defective \\(p=0.2=\\dfrac{1}{5}\\), so \\(q=\\dfrac{4}{5}\\), with \\(n=5\\). Then \\(P(X=2)=\\binom{5}{2}\\left(\\dfrac{1}{5}\\right)^2\\left(\\dfrac{4}{5}\\right)^3\\), which is the required form.",
  },
  {
    chapter: "Binomial Distribution",
    subtopic: "P(X = k)",
    difficulty: "MODERATE",
    stem: "A marksman hits a target with probability \\(\\dfrac{3}{4}\\). If he fires \\(4\\) shots, what is the probability that he hits the target exactly \\(3\\) times?",
    correct: "\\(\\dfrac{27}{64}\\)",
    distractors: ["\\(\\dfrac{9}{64}\\)", "\\(\\dfrac{81}{256}\\)", "\\(\\dfrac{27}{256}\\)"],
    solution:
      "Here \\(n=4,\\ p=\\dfrac{3}{4},\\ q=\\dfrac{1}{4}\\). Then \\(P(X=3)=\\binom{4}{3}\\left(\\dfrac{3}{4}\\right)^3\\left(\\dfrac{1}{4}\\right)^1=4\\cdot\\dfrac{27}{64}\\cdot\\dfrac{1}{4}=\\dfrac{108}{256}=\\dfrac{27}{64}\\).",
  },
  {
    chapter: "Binomial Distribution",
    subtopic: "P(X = k)",
    difficulty: "HARD",
    stem: "The probability that a seed germinates is \\(0.6\\). If \\(6\\) seeds are sown, what is the probability that exactly \\(4\\) germinate?",
    correct: "\\(\\dfrac{4860}{15625}\\)",
    distractors: ["\\(\\dfrac{3240}{15625}\\)", "\\(\\dfrac{4860}{46875}\\)", "\\(\\dfrac{1296}{15625}\\)"],
    solution:
      "Here \\(n=6,\\ p=\\dfrac{3}{5},\\ q=\\dfrac{2}{5}\\). Then \\(P(X=4)=\\binom{6}{4}\\left(\\dfrac{3}{5}\\right)^4\\left(\\dfrac{2}{5}\\right)^2=15\\cdot\\dfrac{81}{625}\\cdot\\dfrac{4}{25}=\\dfrac{15\\times 324}{15625}=\\dfrac{4860}{15625}\\).",
  },

  // ===== Mean / Variance (5) =====
  {
    chapter: "Binomial Distribution",
    subtopic: "Mean and Variance",
    difficulty: "EASY",
    stem: "A fair die is thrown \\(18\\) times. What is the mean number of sixes obtained?",
    correct: "\\(3\\)",
    distractors: ["\\(6\\)", "\\(\\dfrac{5}{2}\\)", "\\(9\\)"],
    solution:
      "Here \\(n=18,\\ p=\\dfrac{1}{6}\\). Mean \\(=np=18\\times\\dfrac{1}{6}=3\\).",
  },
  {
    chapter: "Binomial Distribution",
    subtopic: "Mean and Variance",
    difficulty: "EASY",
    stem: "For a binomial distribution with \\(n=12\\) and \\(p=\\dfrac{1}{4}\\), what is the variance?",
    correct: "\\(\\dfrac{9}{4}\\)",
    distractors: ["\\(3\\)", "\\(\\dfrac{3}{4}\\)", "\\(\\dfrac{27}{16}\\)"],
    solution:
      "Variance \\(=npq=12\\times\\dfrac{1}{4}\\times\\dfrac{3}{4}=\\dfrac{36}{16}=\\dfrac{9}{4}\\).",
  },
  {
    chapter: "Binomial Distribution",
    subtopic: "Mean and Variance",
    difficulty: "MODERATE",
    stem: "In a binomial distribution the mean is \\(4\\) and the variance is \\(\\dfrac{4}{3}\\). What is the number of trials \\(n\\)?",
    correct: "\\(6\\)",
    distractors: ["\\(4\\)", "\\(8\\)", "\\(12\\)"],
    solution:
      "Mean \\(np=4\\) and variance \\(npq=\\dfrac{4}{3}\\). Dividing, \\(q=\\dfrac{npq}{np}=\\dfrac{4/3}{4}=\\dfrac{1}{3}\\), so \\(p=\\dfrac{2}{3}\\). Then \\(n=\\dfrac{4}{p}=\\dfrac{4}{2/3}=6\\).",
  },
  {
    chapter: "Binomial Distribution",
    subtopic: "Mean and Variance",
    difficulty: "MODERATE",
    stem: "The mean and variance of a binomial distribution are \\(6\\) and \\(4\\) respectively. What is the value of \\(p\\)?",
    correct: "\\(\\dfrac{1}{3}\\)",
    distractors: ["\\(\\dfrac{2}{3}\\)", "\\(\\dfrac{1}{2}\\)", "\\(\\dfrac{1}{6}\\)"],
    solution:
      "Mean \\(np=6\\), variance \\(npq=4\\). Then \\(q=\\dfrac{npq}{np}=\\dfrac{4}{6}=\\dfrac{2}{3}\\), so \\(p=1-q=\\dfrac{1}{3}\\).",
  },
  {
    chapter: "Binomial Distribution",
    subtopic: "Mean and Variance",
    difficulty: "HARD",
    stem: "For a binomial distribution the mean is \\(20\\) and the standard deviation is \\(4\\). What is the number of trials \\(n\\)?",
    correct: "\\(100\\)",
    distractors: ["\\(80\\)", "\\(25\\)", "\\(50\\)"],
    solution:
      "Mean \\(np=20\\) and variance \\(npq=\\sigma^2=4^2=16\\). Dividing, \\(q=\\dfrac{npq}{np}=\\dfrac{16}{20}=\\dfrac{4}{5}\\), so \\(p=\\dfrac{1}{5}\\). Then \\(n=\\dfrac{20}{p}=\\dfrac{20}{1/5}=100\\).",
  },

  // ===== At least / at most (4) =====
  {
    chapter: "Binomial Distribution",
    subtopic: "At least / At most",
    difficulty: "MODERATE",
    stem: "A die is thrown \\(4\\) times. What is the probability of getting at least one six?",
    correct: "\\(\\dfrac{671}{1296}\\)",
    distractors: ["\\(\\dfrac{625}{1296}\\)", "\\(\\dfrac{1}{6}\\)", "\\(\\dfrac{4}{6}\\)"],
    solution:
      "Here \\(n=4,\\ p=\\dfrac{1}{6},\\ q=\\dfrac{5}{6}\\). \\(P(\\text{at least one six})=1-P(X=0)=1-\\left(\\dfrac{5}{6}\\right)^4=1-\\dfrac{625}{1296}=\\dfrac{671}{1296}\\).",
  },
  {
    chapter: "Binomial Distribution",
    subtopic: "At least / At most",
    difficulty: "EASY",
    stem: "A fair coin is tossed \\(3\\) times. What is the probability of getting at least one head?",
    correct: "\\(\\dfrac{7}{8}\\)",
    distractors: ["\\(\\dfrac{1}{8}\\)", "\\(\\dfrac{3}{8}\\)", "\\(\\dfrac{1}{2}\\)"],
    solution:
      "Here \\(n=3,\\ p=\\dfrac{1}{2}\\). \\(P(\\text{at least one head})=1-P(X=0)=1-\\left(\\dfrac{1}{2}\\right)^3=1-\\dfrac{1}{8}=\\dfrac{7}{8}\\).",
  },
  {
    chapter: "Binomial Distribution",
    subtopic: "At least / At most",
    difficulty: "MODERATE",
    stem: "The probability that a bulb is defective is \\(\\dfrac{1}{10}\\). In a sample of \\(3\\) bulbs, what is the probability that at most one is defective?",
    correct: "\\(\\dfrac{972}{1000}\\)",
    distractors: ["\\(\\dfrac{729}{1000}\\)", "\\(\\dfrac{243}{1000}\\)", "\\(\\dfrac{28}{1000}\\)"],
    solution:
      "Here \\(n=3,\\ p=\\dfrac{1}{10},\\ q=\\dfrac{9}{10}\\). \\(P(X\\le 1)=P(X=0)+P(X=1)=\\left(\\dfrac{9}{10}\\right)^3+\\binom{3}{1}\\left(\\dfrac{1}{10}\\right)\\left(\\dfrac{9}{10}\\right)^2=\\dfrac{729}{1000}+3\\cdot\\dfrac{81}{1000}=\\dfrac{729+243}{1000}=\\dfrac{972}{1000}\\).",
  },
  {
    chapter: "Binomial Distribution",
    subtopic: "At least / At most",
    difficulty: "HARD",
    stem: "A marksman hits a target with probability \\(\\dfrac{1}{3}\\). If he fires \\(5\\) shots, what is the probability that he hits the target at least twice?",
    correct: "\\(\\dfrac{131}{243}\\)",
    distractors: ["\\(\\dfrac{112}{243}\\)", "\\(\\dfrac{32}{243}\\)", "\\(\\dfrac{80}{243}\\)"],
    solution:
      "Here \\(n=5,\\ p=\\dfrac{1}{3},\\ q=\\dfrac{2}{3}\\). \\(P(X\\ge 2)=1-P(X=0)-P(X=1)=1-\\left(\\dfrac{2}{3}\\right)^5-\\binom{5}{1}\\left(\\dfrac{1}{3}\\right)\\left(\\dfrac{2}{3}\\right)^4=1-\\dfrac{32}{243}-5\\cdot\\dfrac{16}{243}=1-\\dfrac{32}{243}-\\dfrac{80}{243}=\\dfrac{243-112}{243}=\\dfrac{131}{243}\\).",
  },

  // ===== Mode / most probable number (3) =====
  {
    chapter: "Binomial Distribution",
    subtopic: "Mode",
    difficulty: "MODERATE",
    stem: "A fair coin is tossed \\(7\\) times. What is the most probable number of heads?",
    correct: "\\(3\\) or \\(4\\)",
    distractors: ["\\(4\\) only", "\\(3\\) only", "\\(2\\) or \\(5\\)"],
    solution:
      "Here \\(n=7,\\ p=\\dfrac{1}{2}\\). The mode lies in \\((n+1)p-1\\le m\\le (n+1)p\\), i.e. \\(8\\cdot\\dfrac{1}{2}-1=3\\le m\\le 4\\). Since \\((n+1)p=4\\) is an integer, both \\(3\\) and \\(4\\) are most probable.",
  },
  {
    chapter: "Binomial Distribution",
    subtopic: "Mode",
    difficulty: "MODERATE",
    stem: "A die is thrown \\(10\\) times. What is the most probable number of sixes?",
    correct: "\\(1\\)",
    distractors: ["\\(2\\)", "\\(0\\)", "\\(3\\)"],
    solution:
      "Here \\(n=10,\\ p=\\dfrac{1}{6}\\). The mode satisfies \\((n+1)p-1\\le m\\le (n+1)p\\), i.e. \\(11\\cdot\\dfrac{1}{6}-1\\le m\\le 11\\cdot\\dfrac{1}{6}\\), that is \\(0.833\\le m\\le 1.833\\). The only integer in this range is \\(m=1\\).",
  },
  {
    chapter: "Binomial Distribution",
    subtopic: "Mode",
    difficulty: "HARD",
    stem: "For a binomial distribution with \\(n=9\\) and \\(p=\\dfrac{1}{3}\\), what is the most probable number of successes?",
    correct: "\\(3\\)",
    distractors: ["\\(2\\)", "\\(4\\)", "\\(2\\) or \\(3\\)"],
    solution:
      "Here \\(n=9,\\ p=\\dfrac{1}{3}\\). The mode satisfies \\((n+1)p-1\\le m\\le (n+1)p\\), i.e. \\(10\\cdot\\dfrac{1}{3}-1\\le m\\le 10\\cdot\\dfrac{1}{3}\\), that is \\(2.33\\le m\\le 3.33\\). The only integer is \\(m=3\\).",
  },

  // ===== Miscellaneous (3) =====
  {
    chapter: "Binomial Distribution",
    subtopic: "Smallest n",
    difficulty: "HARD",
    stem: "What is the least number of times a fair coin must be tossed so that the probability of getting at least one head exceeds \\(0.9\\)?",
    correct: "\\(4\\)",
    distractors: ["\\(3\\)", "\\(5\\)", "\\(10\\)"],
    solution:
      "We need \\(1-\\left(\\dfrac{1}{2}\\right)^n>0.9\\), i.e. \\(\\left(\\dfrac{1}{2}\\right)^n<0.1\\). For \\(n=3\\), \\(\\dfrac{1}{8}=0.125>0.1\\); for \\(n=4\\), \\(\\dfrac{1}{16}=0.0625<0.1\\). Hence the least value is \\(n=4\\).",
  },
  {
    chapter: "Binomial Distribution",
    subtopic: "Ratio of terms",
    difficulty: "MODERATE",
    stem: "For a binomial distribution with \\(n=6\\) and \\(p=\\dfrac{1}{3}\\), what is the ratio \\(\\dfrac{P(X=2)}{P(X=1)}\\)?",
    correct: "\\(\\dfrac{5}{4}\\)",
    distractors: ["\\(\\dfrac{4}{5}\\)", "\\(\\dfrac{5}{2}\\)", "\\(\\dfrac{15}{8}\\)"],
    solution:
      "Here \\(p=\\dfrac{1}{3},\\ q=\\dfrac{2}{3}\\). The ratio of consecutive terms is \\(\\dfrac{P(X=2)}{P(X=1)}=\\dfrac{n-k+1}{k}\\cdot\\dfrac{p}{q}\\) with \\(k=2\\): \\(\\dfrac{6-2+1}{2}\\cdot\\dfrac{1/3}{2/3}=\\dfrac{5}{2}\\cdot\\dfrac{1}{2}=\\dfrac{5}{4}\\).",
  },
  {
    chapter: "Binomial Distribution",
    subtopic: "Distribution form",
    difficulty: "EASY",
    stem: "If \\(X\\) follows a binomial distribution with \\(n=4\\) and \\(p=\\dfrac{1}{2}\\), what is \\(P(X=0)+P(X=4)\\)?",
    correct: "\\(\\dfrac{1}{8}\\)",
    distractors: ["\\(\\dfrac{1}{16}\\)", "\\(\\dfrac{1}{4}\\)", "\\(\\dfrac{1}{2}\\)"],
    solution:
      "Here \\(n=4,\\ p=q=\\dfrac{1}{2}\\). \\(P(X=0)=\\left(\\dfrac{1}{2}\\right)^4=\\dfrac{1}{16}\\) and \\(P(X=4)=\\left(\\dfrac{1}{2}\\right)^4=\\dfrac{1}{16}\\). Sum \\(=\\dfrac{2}{16}=\\dfrac{1}{8}\\).",
  },
];
