import type { SubtopicNote } from "@/app/notes/_types";

export const COULOMB_ES_NOTE: SubtopicNote = {
  subtopicName: "Coulomb's Law and Equilibrium of Charges",
  title: "Coulomb's Law and Equilibrium of Charges",
  oneLineDefinition:
    "Two point charges push or pull along the line joining them with F = kq₁q₂/r²; with several charges, add the forces as vectors, and a charge at rest has the electric force balanced by the others.",
  whyItMatters:
    "Twenty-two PYQs, fourteen of them multiple choice, and two from 2026. Nine use the force law itself: in a medium, in vector form, from a charged wire or ring, or set against gravity. Six touch identical spheres together or split a charge into two parts. Seven hold charges still: balls hanging from threads, a charge on an incline or a rough table, and a third charge placed where the forces cancel.",
  concepts: [
    // C1 — the force law and superposition
    {
      kind: "formula" as const,
      slug: "jpes-coulomb-force",
      name: "Coulomb's law and adding forces",
      intuition:
        "Two point charges act along the line joining them: like charges repel, unlike charges attract. The force falls as the square of the distance. In a medium the force is smaller by the dielectric constant K, because the medium's own charges partly screen each charge. With many charges, each pair acts as if the others were not there, and the forces add as vectors.",
      definition:
        "- \\(F = \\dfrac{kq_1q_2}{r^{2}}\\), with \\(k = \\dfrac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^{9}\\ \\text{N m}^{2}\\,\\text{C}^{-2}\\).\n" +
        "- In a medium of dielectric constant K: \\(F_m = F/K\\). A separation r in the medium gives the same force as \\(r\\sqrt{K}\\) in vacuum.\n" +
        "- Vector form, force on \\(q_2\\) due to \\(q_1\\): \\(\\vec F = \\dfrac{kq_1q_2}{|\\vec r_2 - \\vec r_1|^{3}}(\\vec r_2 - \\vec r_1)\\). Keep the signs of the charges; they set the direction.\n" +
        "- Several charges: add the forces as vectors. Two forces at right angles combine by Pythagoras.\n" +
        "- A rod of length L and charge Q, with q on its line at distance a from the near end: \\(F = \\dfrac{kqQ}{a(a + L)}\\).\n" +
        "- A ring of charge Q and radius R with q at its centre: the ring is stretched, with tension \\(T = \\dfrac{kqQ}{2\\pi R^{2}}\\).\n" +
        "- Electric and gravitational forces both fall as \\(1/r^{2}\\), so their ratio for two particles does not depend on the distance.",
      formula: {
        label: "Coulomb's law in vector form",
        latex: "\\vec F_{21} = \\frac{kq_1q_2}{|\\vec r_2 - \\vec r_1|^{3}}\\,(\\vec r_2 - \\vec r_1), \\qquad F_{\\text{medium}} = \\frac{F}{K}",
      },
      authoredExample: {
        prompt:
          "A charge of \\(2\\ \\mu\\text{C}\\) sits at \\((1, 0, 2)\\) m and a charge of \\(5\\ \\mu\\text{C}\\) at \\((3, 2, 3)\\) m. Find the force on the \\(5\\ \\mu\\text{C}\\) charge.",
        steps: [
          "\\(\\vec r_2 - \\vec r_1 = 2\\hat i + 2\\hat j + \\hat k\\), so the distance is \\(\\sqrt{4 + 4 + 1} = 3\\) m.",
          "\\(kq_1q_2 = 9 \\times 10^{9} \\times 2 \\times 10^{-6} \\times 5 \\times 10^{-6} = 0.09\\ \\text{N m}^{2}\\).",
          "\\(\\vec F = \\dfrac{0.09}{27}(2\\hat i + 2\\hat j + \\hat k) = \\dfrac{1}{300}(2\\hat i + 2\\hat j + \\hat k)\\) N.",
          "Both charges are positive, so the force points away from the first charge. Its size is \\(\\dfrac{3}{300} = 0.01\\) N.",
        ],
        answer: "\\(\\dfrac{1}{300}(2\\hat i + 2\\hat j + \\hat k)\\) N, of size 0.01 N.",
      },
      selfCheckExample: {
        prompt:
          "A \\(1\\ \\mu\\text{C}\\) charge sits at the origin. A \\(3\\ \\mu\\text{C}\\) charge is at \\((0.3, 0)\\) m and a \\(4\\ \\mu\\text{C}\\) charge at \\((0, 0.3)\\) m. Find the net force on the charge at the origin.",
        steps: [
          "From the \\(3\\ \\mu\\text{C}\\) charge: \\(\\dfrac{9 \\times 10^{9} \\times 3 \\times 10^{-12}}{0.09} = 0.3\\) N, along \\(-x\\).",
          "From the \\(4\\ \\mu\\text{C}\\) charge: 0.4 N, along \\(-y\\).",
          "At right angles: \\(\\sqrt{0.3^{2} + 0.4^{2}} = 0.5\\) N.",
        ],
        answer: "0.5 N, pointing away from both charges.",
      },
      practiceSet: [
        { prompt: "Two charges repel with 18 N in air. The same charges at the same distance are put in oil of K = 3. New force?", answer: "6 N" },
        { prompt: "Two charges 2 cm apart in a medium of K = 4. At what distance in vacuum is the force the same?", answer: "4 cm" },
        { prompt: "A rod 20 cm long carries \\(8\\ \\mu\\text{C}\\). A \\(1\\ \\mu\\text{C}\\) charge lies on its line, 5 cm from the near end. Force?", answer: "5.76 N", method: "\\(kqQ/[a(a + L)] = 0.072/(0.05 \\times 0.25)\\)" },
        { prompt: "A ring of radius 0.1 m carries \\(2\\ \\mu\\text{C}\\), with \\(1\\ \\mu\\text{C}\\) at its centre. Tension in the ring?", answer: "About 0.29 N" },
      ],
      pyqExampleId: "60febb60-d3b4-45c3-9f27-e64af319db5a", // 2026: 3 μC and −4 μC at given points, force on q₂ in vector form
      traps: [
        {
          title: "The vector points from the source to the target",
          body: "The force on q₂ uses r₂ − r₁. Using r₁ − r₂ gives the force on q₁, which is the same size and points the other way. That reversed vector is usually among the options.",
        },
        {
          title: "K divides the force; √K scales the distance",
          body: "A medium cuts the force by K. To get the same force in vacuum, the charges must be √K times farther apart, not K times.",
        },
        {
          title: "Forces add as vectors",
          body: "Two forces at right angles of 3 N and 4 N give 5 N, not 7 N. Draw each force on the charge first, then add.",
        },
      ],
    },

    // C2 — sharing charge by contact
    {
      kind: "formula" as const,
      slug: "jpes-contact-sharing",
      name: "Sharing charge by contact",
      intuition:
        "Touch two identical conductors and they end at the same potential, so they hold equal charges. The total charge, with signs, does not change. If the charges are unlike, they first cancel in part, then the rest is shared. For a fixed total Q split into two parts, the force is greatest when the parts are equal.",
      definition:
        "- Two identical spheres touched: each ends with \\(\\dfrac{q_1 + q_2}{2}\\), signs included.\n" +
        "- An uncharged identical sphere touched to one holding q takes \\(q/2\\).\n" +
        "- A sphere touched to several others in turn: track its charge after every contact, then use Coulomb's law on the final pair.\n" +
        "- Splitting a total Q into q and \\(Q - q\\) at a fixed distance: \\(F \\propto q(Q - q)\\), greatest at \\(q = Q/2\\).\n" +
        "- Spheres of different sizes touched end at the same potential, so they share in proportion to their radii, not equally.",
      formula: {
        label: "Sharing and the largest force",
        latex: "q' = \\frac{q_1 + q_2}{2}, \\qquad F \\propto q(Q - q) \\ \\text{is largest at}\\ q = \\frac{Q}{2}",
      },
      authoredExample: {
        prompt:
          "Two identical small spheres carry \\(+6\\ \\mu\\text{C}\\) and \\(-2\\ \\mu\\text{C}\\) and attract with a force F. They are touched together and put back in place. Find the new force in terms of F.",
        steps: [
          "Before: \\(F = \\dfrac{k(6)(2)}{r^{2}} = \\dfrac{12k}{r^{2}}\\) (in \\(\\mu\\text{C}^{2}\\)), attractive.",
          "Total charge \\(+4\\ \\mu\\text{C}\\), so each sphere holds \\(+2\\ \\mu\\text{C}\\).",
          "After: \\(F' = \\dfrac{4k}{r^{2}} = \\dfrac{F}{3}\\), now repulsive.",
        ],
        answer: "F/3, and the spheres now repel.",
      },
      selfCheckExample: {
        prompt:
          "Identical spheres A and B carry \\(+12\\ \\mu\\text{C}\\) and \\(+4\\ \\mu\\text{C}\\) and repel with force F. A neutral identical sphere C touches A, then B, and is taken away. New force between A and B?",
        steps: [
          "C touches A: each holds \\(6\\ \\mu\\text{C}\\).",
          "C touches B: \\(\\dfrac{6 + 4}{2} = 5\\ \\mu\\text{C}\\) each.",
          "The product of charges goes from \\(12 \\times 4 = 48\\) to \\(6 \\times 5 = 30\\), so the force is \\(\\dfrac{30}{48}F\\).",
        ],
        answer: "5F/8",
      },
      practiceSet: [
        { prompt: "Identical spheres with \\(+5\\ \\mu\\text{C}\\) and \\(-3\\ \\mu\\text{C}\\) are touched. Charge on each?", answer: "\\(+1\\ \\mu\\text{C}\\)" },
        { prompt: "A charge of \\(12\\ \\mu\\text{C}\\) is split in two to give the largest repulsion at a fixed distance. The two parts?", answer: "\\(6\\ \\mu\\text{C}\\) each" },
        { prompt: "Identical spheres with q and 5q repel with force F. They are touched and returned to the same places. New force?", answer: "9F/5", method: "Each holds 3q; product 9q² against 5q²." },
        { prompt: "A neutral sphere touches an identical sphere holding 8 nC, then touches a third, neutral identical sphere. Final charges on the three?", answer: "4 nC, 2 nC and 2 nC" },
      ],
      pyqExampleId: "e7d15391-e8f4-4fb9-a785-8d0ee56518b0", // 2022: third sphere touches A then B, placed midway: 3F/4
      traps: [
        {
          title: "Add the signs before halving",
          body: "Spheres with +6 and −2 share +4, so each gets +2. Halving 6 + 2 = 8 gives the wrong charge and the wrong direction of force.",
        },
        {
          title: "Order of contact matters",
          body: "A sphere carries what it picked up into the next contact. Touching A then B gives a different result from B then A whenever A and B differ.",
        },
        {
          title: "Equal sharing needs identical spheres",
          body: "Two spheres of different radii end at a common potential, so the larger one takes more charge, in proportion to its radius.",
        },
      ],
    },

    // C3 — equilibrium of charged bodies
    {
      kind: "formula" as const,
      slug: "jpes-charge-equilibrium",
      name: "Charged bodies at rest",
      intuition:
        "A charge at rest has no net force on it. A charged ball hanging from a thread has three forces: weight down, tension along the thread, and the electric push sideways. They close into a triangle, so the thread's angle from the vertical tells you the ratio of the electric force to the weight. On a line between two fixed charges, a third charge rests only where the two forces point opposite ways and match in size.",
      definition:
        "- Hanging ball with the thread at θ to the vertical: \\(\\tan\\theta = \\dfrac{F_e}{mg}\\), and \\(T = \\sqrt{(mg)^{2} + F_e^{2}}\\).\n" +
        "- Two equal balls on threads of length l, each at θ from the vertical, are \\(2l\\sin\\theta\\) apart. For small angles, \\(x^{3} = \\dfrac{q^{2}l}{2\\pi\\varepsilon_0 mg}\\), so \\(x \\propto q^{2/3}\\).\n" +
        "- In a liquid of density σ, the force falls by K and the weight by buoyancy. The angle stays the same only if \\(K = \\dfrac{\\rho}{\\rho - \\sigma}\\), with ρ the density of the balls.\n" +
        "- On a smooth incline: \\(\\dfrac{kq^{2}}{r^{2}} = mg\\sin\\theta\\). On a rough table at the point of slipping: \\(\\dfrac{kq^{2}}{r^{2}} = \\mu mg\\).\n" +
        "- Third charge on the line of two fixed charges: like charges, it rests between them, nearer the smaller, at \\(x = \\dfrac{r}{1 + \\sqrt{q_2/q_1}}\\) from \\(q_1\\). Unlike charges, it rests outside, beyond the smaller one.",
      formula: {
        label: "Hanging balls and the liquid condition",
        latex: "\\tan\\theta = \\frac{F_e}{mg}, \\qquad K = \\frac{\\rho}{\\rho - \\sigma}",
      },
      authoredExample: {
        prompt:
          "Two identical balls of mass 30 g hang from one point on silk threads 50 cm long. They carry equal charges q, and each thread makes an angle θ with the vertical, where \\(\\sin\\theta = 0.6\\). Find q. (g = 10 m/s²)",
        steps: [
          "Separation: \\(2l\\sin\\theta = 2 \\times 0.5 \\times 0.6 = 0.6\\) m.",
          "\\(\\tan\\theta = 0.75\\), so \\(F_e = mg\\tan\\theta = 0.3 \\times 0.75 = 0.225\\) N.",
          "\\(q^{2} = \\dfrac{F_e x^{2}}{k} = \\dfrac{0.225 \\times 0.36}{9 \\times 10^{9}} = 9 \\times 10^{-12}\\).",
          "\\(q = 3 \\times 10^{-6}\\) C.",
        ],
        answer: "\\(3\\ \\mu\\text{C}\\)",
      },
      selfCheckExample: {
        prompt:
          "Two charged balls of density 2.4 g/cm³ hang at some angle in air. Dipped in a liquid of density 0.8 g/cm³, the angle does not change. Dielectric constant of the liquid?",
        steps: [
          "The force falls by K; the effective weight falls by the factor \\(\\dfrac{\\rho - \\sigma}{\\rho} = \\dfrac{1.6}{2.4}\\).",
          "Same angle: \\(K = \\dfrac{2.4}{1.6} = 1.5\\).",
        ],
        answer: "1.5",
      },
      practiceSet: [
        { prompt: "Charges +q and +4q are 9 cm apart. Where can a third charge rest on the line joining them?", answer: "3 cm from +q, between them" },
        { prompt: "Charges +q and −4q are 6 cm apart. Where can a third charge rest?", answer: "6 cm beyond +q, on the side away from −4q" },
        { prompt: "Two 10 g particles with \\(1\\ \\mu\\text{C}\\) each sit on a table with μ = 0.25. Least separation at which they stay at rest? (g = 10 m/s²)", answer: "0.6 m" },
        { prompt: "Two small hanging balls are a distance x apart. The charge on each is doubled. New separation?", answer: "\\(2^{2/3}x \\approx 1.59x\\)" },
      ],
      pyqExampleId: "62d32d6a-448f-49a5-bc68-487a6b248a70", // 2024: same angle in a liquid of half the density, K = 2
      traps: [
        {
          title: "Angle from the vertical, not between the threads",
          body: "If the threads make an angle 2θ with each other, each makes θ with the vertical. Use θ in tan θ = F/mg.",
        },
        {
          title: "A liquid changes two forces",
          body: "The electric force falls by K and the weight falls by the buoyancy. Changing only one of them gives the wrong K.",
        },
        {
          title: "The net force on a ball at rest is zero",
          body: "When a question asks for the force on a ball in equilibrium, it means the electric force. The net force is zero by definition.",
        },
      ],
    },
  ],
};
