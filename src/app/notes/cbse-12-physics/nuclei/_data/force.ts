import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_NU_FORCE_NOTE: SubtopicNote = {
  subtopicName: "Nuclear Force",
  title: "Nuclear Force",
  oneLineDefinition:
    "The force that holds protons and neutrons together in a nucleus: why it must exist, its properties, and the curve of potential energy of a pair of nucleons against their separation.",
  whyItMatters:
    "12 questions, all from board papers of 2023 to 2026. The plot of potential energy of a pair of nucleons against their separation is the board's favourite figure in this chapter: it is set six times on this page (twice each in 2023, 2024 and 2026), and parts of other papers in 2022, 2023 and 2025 ask it again, so it has come every year from 2022 to 2026. The board also asks for two or three properties of the nuclear force (2024 twice, 2026), which statement about it is not true (2023), how the force compares for proton-proton, proton-neutron and neutron-neutron pairs (2025), the separation at which the potential energy is least (2024), and an assertion-reason item on whether the force is always attractive (2026). The 2023 papers set the plot with its attractive and repulsive regions in two sets.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpnu-force-properties",
      name: "Properties of the nuclear force",
      intuition:
        "Protons in a nucleus repel each other strongly, yet the nucleus holds together. So a much stronger attractive force must act between nucleons, but only when they are very close. It does not care about charge: two neutrons, two protons or a proton and a neutron feel the same pull.",
      definition:
        "- **Why it must exist:** the binding energy per nucleon of an average nucleus is about 8 MeV, far more than the binding energy of an electron in an atom. A strong attractive force of a totally different kind must hold the nucleons, strong enough to beat the repulsion between the protons.\n" +
        "- **Much stronger than the Coulomb force** between charges at nuclear distances, and the gravitational force is much weaker even than the Coulomb force.\n" +
        "- **Short range:** it falls rapidly to zero once two nucleons are more than a few femtometres apart. A nucleon inside a big nucleus feels only its near neighbours. This is the **saturation** of the nuclear force, and it is why the binding energy per nucleon is nearly constant for \\(30 < A < 170\\).\n" +
        "- **Charge independent:** the nuclear force between neutron and neutron, proton and neutron, and proton and proton is about the same.\n" +
        "- **Attractive and repulsive:** it is attractive for separations larger than about 0.8 fm and strongly repulsive for separations less than about 0.8 fm.\n" +
        "- It has **no simple mathematical form**, unlike Coulomb's law or Newton's law of gravitation.\n" +
        "- **Stability:** a stable nucleus needs enough neutrons. For light nuclei the ratio of neutrons to protons is about 1 : 1, rising to about 3 : 2 for heavy nuclei, because neutrons add nuclear attraction but no Coulomb repulsion.",
      table: {
        columns: ["Property", "What it means for the nucleus"],
        rows: [
          { cells: ["Very strong", "It beats the Coulomb repulsion between the protons and binds them with the neutrons in a tiny volume"] },
          { cells: ["Short range (a few fm)", "Each nucleon is held only by its near neighbours (saturation), so the binding energy per nucleon stays nearly constant for middle-sized nuclei"] },
          {
            cells: ["Charge independent", "The nuclear pull is the same for proton-proton, proton-neutron and neutron-neutron pairs at the same separation"],
            pyqExampleId: "574c33e0-b90d-46ca-980f-404ac879fac8",
            noteAmber: "Board 2025 asked how the nuclear forces between proton and proton, proton and neutron, and neutron and neutron compare: they are equal.",
          },
          { cells: ["Attractive beyond about 0.8 fm, repulsive inside it", "Nucleons are pulled together but cannot be squeezed closer than about 0.8 fm"] },
          { cells: ["No simple formula", "There is no law like \\(F \\propto 1/r^2\\) for it; its behaviour is read from the potential energy curve"] },
        ],
      },
      practiceSet: [
        { prompt: "Which property of the nuclear force makes the binding energy per nucleon nearly constant for nuclei with 30 < A < 170?", answer: "Its short range: a nucleon is held only by its near neighbours (saturation), so adding more nucleons does not change its binding" },
        { prompt: "Two protons in a nucleus feel two forces. Name them and say which one wins at a separation of about 1 fm.", answer: "The attractive nuclear force and the repulsive Coulomb force; the nuclear force is much stronger, so it wins" },
        { prompt: "Why is the gravitational attraction between two nucleons never used to explain why a nucleus holds together?", answer: "Gravity is much weaker even than the Coulomb force, so it is far too weak to beat the repulsion between the protons" },
      ],
      pyqExampleId: "0a391e1b-b164-46b5-9fb2-9157910d7a96",
      traps: [
        {
          title: "Calling the nuclear force always attractive",
          body: "It is attractive only beyond about 0.8 fm. Closer than that it is strongly repulsive. A statement that it is \"always attractive\" is false, in an MCQ or an assertion.",
        },
        {
          title: "Calling it a weak force",
          body: "The nuclear force is much stronger than the Coulomb force. An assertion-reason item that calls it \"weak\" has a false statement in it.",
        },
        {
          title: "Charge independence read as no repulsion",
          body: "Charge independence is about the NUCLEAR force alone. Two protons still repel each other by the Coulomb force as well; only their nuclear attraction is the same as for two neutrons.",
        },
        {
          title: "A property with no consequence",
          body: "When asked to \"discuss\" a property, add what it does: short range leads to saturation, and saturation keeps the binding energy per nucleon nearly constant. A bare name such as \"short range\" earns half the mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpnu-pe-curve",
      name: "Potential energy of a pair of nucleons",
      intuition:
        "Bring two nucleons together from far away. At first nothing happens. Within a few femtometres they start to pull on each other and their potential energy drops. At about 0.8 fm it is lowest; push them closer and it shoots up, because they now push each other apart. The force at any point is minus the slope of this curve.",
      definition:
        "**How to draw it** (the figure carries most of the marks; it cannot be drawn here, so learn it in words):\n" +
        "- Axes: potential energy \\(U\\) in MeV on the vertical axis, separation \\(r\\) in fm on the horizontal axis. Draw the line \\(U = 0\\).\n" +
        "- At large \\(r\\) (beyond a few fm) the curve lies along \\(U = 0\\).\n" +
        "- Coming in, \\(U\\) becomes negative and falls to a **minimum at \\(r_0 \\approx 0.8\\) fm**. Mark \\(r_0\\) on the \\(r\\) axis.\n" +
        "- For \\(r < r_0\\) the curve rises very steeply, through zero, to large positive values.\n" +
        "**Reading the force from the slope:** \\(F = -\\dfrac{dU}{dr}\\).\n" +
        "- For \\(r > r_0\\), \\(U\\) increases as \\(r\\) increases, so \\(F\\) is negative: it acts towards smaller \\(r\\), an **attractive** force.\n" +
        "- For \\(r < r_0\\), \\(U\\) decreases as \\(r\\) increases, so \\(F\\) is positive: it pushes the nucleons apart, a **repulsive** force.\n" +
        "- At \\(r = r_0\\) the slope is zero, so the force is zero: the separation of greatest stability.\n" +
        "**Two conclusions to write:** the force is attractive for \\(r > r_0\\) and strongly repulsive for \\(r < r_0\\); and it is short-ranged, becoming negligible beyond a few femtometres.",
      table: {
        columns: ["Region of the curve", "Slope of U against r", "Nuclear force"],
        rows: [
          { cells: ["\\(r < r_0\\) (closer than about 0.8 fm)", "Negative: U falls as r grows", "Strongly repulsive"] },
          { cells: ["\\(r = r_0 \\approx 0.8\\) fm (the minimum)", "Zero", "Zero; the most stable separation"] },
          { cells: ["\\(r > r_0\\), up to a few fm", "Positive: U rises towards zero as r grows", "Attractive"] },
          { cells: ["Beyond a few fm", "Zero: the curve lies along U = 0", "Negligible (short range)"] },
        ],
      },
      practiceSet: [
        { prompt: "At a separation of 1.5 fm, the potential energy of a pair of nucleons increases as the separation increases. Is the nuclear force there attractive or repulsive?", answer: "Attractive: \\(F = -\\dfrac{dU}{dr}\\) is negative, so the force acts towards smaller separation" },
        { prompt: "What is the nuclear force between two nucleons at the separation where their potential energy is least?", answer: "Zero, because the slope of the curve is zero there" },
        { prompt: "Why does the potential energy curve of two nucleons lie along U = 0 beyond a few femtometres?", answer: "The nuclear force is short-ranged: it falls to zero beyond a few femtometres, so there is no potential energy to gain or lose" },
      ],
      pyqExampleId: "f5139660-5122-4802-86d7-9dbb01e6cf49",
      traps: [
        {
          title: "A plot with no labels and no r₀",
          body: "Label the axes (potential energy in MeV, separation in fm), draw the zero line and mark \\(r_0 \\approx 0.8\\) fm at the minimum. The board marks the shape and these labels; an unlabelled curve loses the figure's marks.",
        },
        {
          title: "Reading the force from the sign of U",
          body: "Just inside \\(r_0\\), U is still negative, yet the force there is repulsive. Attraction or repulsion comes from the SLOPE, \\(F = -\\dfrac{dU}{dr}\\), never from whether U is positive or negative.",
        },
        {
          title: "Putting the minimum where the curve crosses zero",
          body: "The curve crosses \\(U = 0\\) at a separation smaller than \\(r_0\\). At \\(r_0\\) itself U is at its lowest, deep below zero. Draw the crossing to the left of the minimum.",
        },
        {
          title: "\"Justify\" answered without the slope",
          body: "When the question says justify, write \\(F = -\\dfrac{dU}{dr}\\) and say the sign of the slope on each side of \\(r_0\\). Naming the regions alone gets only part of the marks.",
        },
      ],
    },
  ],
};
