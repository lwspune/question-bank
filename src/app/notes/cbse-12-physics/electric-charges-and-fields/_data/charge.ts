import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EF_CHARGE_NOTE: SubtopicNote = {
  subtopicName: "Electric Charge and its Basic Properties",
  title: "Electric Charge and its Basic Properties",
  oneLineDefinition:
    "What electric charge is, how bodies get charged by rubbing, conductors and insulators, and the three basic properties of charge: it adds like a number, it is conserved, and it comes only in whole multiples of e.",
  whyItMatters:
    "7 questions. Two were set in board papers: find the starting charge on a ball from the charge three identical balls share after touching (2024), and find how much the mass of a body changes when it is charged (2025). The textbook adds what quantisation means, how many electrons move when polythene is rubbed with wool, how rubbing agrees with conservation of charge, and how much charge a cup of water holds.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpef-quantisation",
      name: "Quantisation of charge",
      intuition:
        "Charge comes in tiny equal packets. A body is charged only by gaining or losing whole electrons, so its charge is always a whole number times the charge of one electron. That packet is so small that an ordinary charge holds billions of them, which is why charge seems smooth.",
      definition:
        "- **Quantisation:** the charge on any body is \\(q = ne\\), where \\(n\\) is an integer (positive, negative or zero) and \\(e = 1.6 \\times 10^{-19}\\) C. A proton carries \\(+e\\) and an electron \\(-e\\).\n" +
        "- In rubbing, only electrons move. A body becomes **positive by losing electrons** and **negative by gaining electrons**.\n" +
        "- Electrons have mass, so charging changes the mass very slightly: \\(\\Delta m = n m_e\\), with \\(m_e = 9.1 \\times 10^{-31}\\) kg.\n" +
        "- The SI unit of charge is the coulomb (C). About \\(6 \\times 10^{18}\\) electrons make up a charge of 1 C, so smaller units are used, such as 1 μC, which is \\(10^{-6}\\) C.\n" +
        "- **Why we can ignore it for large charges:** even 1 μC holds about \\(6 \\times 10^{12}\\) electrons, so a step of one \\(e\\) is far too small to notice and charge behaves as continuous.",
      formula: {
        label: "Quantisation of charge",
        latex: "q = ne, \\quad n = 0, \\pm 1, \\pm 2, \\dots \\qquad \\Delta m = n\\,m_e",
      },
      authoredExample: {
        prompt:
          "A glass rod rubbed with silk gets a charge of \\(+4.8 \\times 10^{-8}\\) C. How many electrons did it lose, and by how much did its mass change?",
        steps: [
          "Given: \\(q = 4.8 \\times 10^{-8}\\) C, \\(e = 1.6 \\times 10^{-19}\\) C, \\(m_e = 9.1 \\times 10^{-31}\\) kg.",
          "Formula: \\(n = \\dfrac{q}{e}\\) and \\(\\Delta m = n m_e\\).",
          "\\(n = \\dfrac{4.8 \\times 10^{-8}}{1.6 \\times 10^{-19}} = 3 \\times 10^{11}\\) electrons.",
          "\\(\\Delta m = 3 \\times 10^{11} \\times 9.1 \\times 10^{-31} = 2.73 \\times 10^{-19}\\) kg.",
          "The rod is positive, so it lost these electrons and its mass went down.",
        ],
        answer: "\\(3 \\times 10^{11}\\) electrons lost; the mass decreased by \\(2.73 \\times 10^{-19}\\) kg",
      },
      selfCheckExample: {
        prompt: "Can a body carry a charge of \\(2.4 \\times 10^{-19}\\) C? Give a reason.",
        steps: [
          "\\(n = \\dfrac{2.4 \\times 10^{-19}}{1.6 \\times 10^{-19}} = 1.5\\).",
          "\\(n\\) must be a whole number, and 1.5 is not.",
        ],
        answer: "No. That charge would be 1.5 e, and charge comes only in whole multiples of e",
      },
      practiceSet: [
        { prompt: "How many electrons make up a charge of \\(-3.2 \\times 10^{-18}\\) C?", answer: "20 electrons" },
        { prompt: "A body has 500 more protons than electrons. What is its charge?", answer: "\\(+8 \\times 10^{-17}\\) C" },
        { prompt: "Does a body become heavier or lighter when it is given a negative charge?", answer: "Slightly heavier, because it gains electrons" },
      ],
      pyqExampleId: "bd637912-cb43-49ff-8905-08faa71a3e0e",
      traps: [
        {
          title: "Thinking positive charge means protons were added",
          body: "In rubbing only electrons move. A body turns positive by LOSING electrons, so its mass goes down, not up.",
        },
        {
          title: "Using the wrong mass",
          body: "The mass change is the number of electrons times the electron's mass, \\(9.1 \\times 10^{-31}\\) kg. Using the proton's mass makes the answer about 1800 times too big.",
        },
        {
          title: "Saying rubbing creates charge",
          body: "Rubbing only moves electrons from one body to the other. No charge is made, and the two bodies get equal and opposite charges.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpef-conservation",
      name: "Additivity and conservation of charge",
      intuition:
        "Charges add like ordinary numbers, signs included. In an isolated system the total never changes: when bodies touch, charge only moves from one to another. Identical metal balls that touch share the total equally, because nothing makes one different from the other.",
      definition:
        "- **Additivity:** the total charge of a system is the algebraic sum \\(q_1 + q_2 + \\dots + q_n\\). Charge is a scalar, and unlike mass it can be negative.\n" +
        "- **Conservation:** the total charge of an isolated system stays the same. Charge can move between bodies, and charged particles are created only in equal and opposite pairs (a neutron turns into a proton and an electron).\n" +
        "- **Rubbing:** glass rubbed with silk loses electrons to the silk. The glass becomes positive and the silk equally negative, so the total is still zero.\n" +
        "- **Conductors and insulators:** in a conductor (metals, the human body, the earth) charge moves freely and spreads over the surface. On an insulator (glass, plastic, nylon) it stays where it is put.\n" +
        "- **Identical conductors in contact** share the total charge equally.",
      formula: {
        label: "Charge on each of n identical conductors after contact",
        latex: "q_{\\text{each}} = \\frac{q_1 + q_2 + \\dots + q_n}{n}",
      },
      authoredExample: {
        prompt:
          "Two identical metal spheres carry charges of \\(+15\\ \\mu\\text{C}\\) and \\(-5\\ \\mu\\text{C}\\). They are touched together and then separated. Find the charge on each, and how many electrons moved.",
        steps: [
          "Total charge: \\(15 + (-5) = +10\\ \\mu\\text{C}\\), and it is conserved.",
          "Identical spheres share it equally: \\(\\dfrac{10}{2} = +5\\ \\mu\\text{C}\\) each.",
          "The first sphere went from \\(+15\\) to \\(+5\\ \\mu\\text{C}\\), a change of \\(10\\ \\mu\\text{C} = 1 \\times 10^{-5}\\) C, so it gained electrons.",
          "Electrons moved: \\(n = \\dfrac{1 \\times 10^{-5}}{1.6 \\times 10^{-19}} = 6.25 \\times 10^{13}\\).",
        ],
        answer: "\\(+5\\ \\mu\\text{C}\\) on each; \\(6.25 \\times 10^{13}\\) electrons moved to the first sphere",
      },
      selfCheckExample: {
        prompt:
          "An isolated box holds charges of \\(+6\\ \\mu\\text{C}\\), \\(-9\\ \\mu\\text{C}\\) and \\(+8\\ \\mu\\text{C}\\). Find the total charge. If the charges later move around between the bodies inside the box, what is the total then?",
        steps: ["Add with signs: \\(6 - 9 + 8 = +5\\ \\mu\\text{C}\\).", "The box is isolated, so the total stays \\(+5\\ \\mu\\text{C}\\)."],
        answer: "\\(+5\\ \\mu\\text{C}\\) both times",
      },
      practiceSet: [
        {
          prompt: "Why does a metal spoon held in the hand show no charge when rubbed, while a plastic comb does?",
          answer: "The metal is a conductor, so its charge leaks through the body to the earth; the plastic is an insulator and keeps its charge",
        },
        {
          prompt: "When a neutron turns into a proton and an electron, is charge conserved?",
          answer: "Yes. The proton and the electron have equal and opposite charges, so the total stays zero",
        },
        { prompt: "Two identical metal balls carry \\(+11\\) nC and \\(-1\\) nC. They touch and are separated. What is the charge on each?", answer: "\\(+5\\) nC" },
      ],
      pyqExampleId: "282e9530-48f4-4c5d-8b3f-0109645c3225",
      traps: [
        {
          title: "Sharing equally when the bodies are not identical",
          body: "Only IDENTICAL conductors share charge equally. Bodies of different sizes do not end with equal charges, so check for the word identical before dividing.",
        },
        {
          title: "Adding sizes instead of signed charges",
          body: "Total charge is an algebraic sum. A charge of \\(+5\\) units and one of \\(-5\\) units make zero, not 10.",
        },
      ],
    },
  ],
};
