import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_ELE_CHARGE_NOTE: SubtopicNote = {
  subtopicName: "Charge and Coulomb's Law",
  title: "Electric Charge, Conductors and Coulomb's Law",
  oneLineDefinition:
    "Charge comes in whole numbers of electron charges, is never created or destroyed, moves freely only in conductors, and pushes or pulls other charges with a force that falls as 1/r².",
  whyItMatters:
    "The 2019 paper asked how the force between two charges changes when the charges and the distance change. The 2023 and 2026 ministry papers asked plain facts: what happens to the charge when two insulating spheres touch, and the charge of a hydrogen atom.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-ele-charge-basics",
      name: "Electric charge: carried by particles, quantised and conserved",
      intuition:
        "Every atom holds positive protons in its nucleus and the same number of negative electrons around it, so a whole atom has no net charge. An object becomes charged only when electrons leave it or join it. Charge cannot appear from nothing: whatever one object gains, another object loses.",
      definition:
        "**Electric charge** is measured in **coulombs** (C).\n" +
        "- The **elementary charge** is \\(e = 1.6 \\times 10^{-19}\\ \\text{C}\\). A proton carries \\(+e\\), an electron \\(-e\\), a neutron \\(0\\).\n" +
        "- Charge is **quantised**: any charge is a whole number of elementary charges, \\(Q = ne\\).\n" +
        "- Charge is **conserved**: in any process the total charge stays the same. Rubbing a rod with a cloth moves electrons from one to the other; the rod and cloth end with equal and opposite charges.\n" +
        "- A **neutral atom** (hydrogen, or any other) has a net charge of exactly zero. An **ion** has gained or lost electrons.\n" +
        "- In solids only electrons move. A positive object has **lost electrons**; it has not gained protons.",
      formula: {
        label: "Charge as a count of elementary charges",
        latex: "Q = n e",
        symbols: [
          { symbol: "\\(Q\\)", meaning: "charge, in C" },
          { symbol: "\\(n\\)", meaning: "number of electrons gained or lost (a whole number)" },
          { symbol: "\\(e\\)", meaning: "elementary charge, \\(1.6 \\times 10^{-19}\\ \\text{C}\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "A plastic rod is rubbed with a wool cloth and gains \\(5.0 \\times 10^{11}\\) electrons from it. What are the charges on the rod and on the cloth afterwards?",
        steps: [
          "The rod gains electrons, so its charge is negative: \\(Q = ne = 5.0 \\times 10^{11} \\times 1.6 \\times 10^{-19} = 8.0 \\times 10^{-8}\\ \\text{C}\\), so \\(-8.0 \\times 10^{-8}\\ \\text{C}\\).",
          "Charge is conserved. Both started neutral, so the cloth must carry the opposite charge: \\(+8.0 \\times 10^{-8}\\ \\text{C}\\).",
          "No protons moved. The cloth is positive only because it lost electrons.",
        ],
        answer: "Rod \\(-8.0 \\times 10^{-8}\\ \\text{C}\\); cloth \\(+8.0 \\times 10^{-8}\\ \\text{C}\\)",
      },
      selfCheckExample: {
        prompt:
          "A neutral metal sphere is given a charge of \\(+4.8\\ \\text{nC}\\). Which change to its electrons produced this charge? (\\(e = 1.6 \\times 10^{-19}\\ \\text{C}\\))",
        options: [
          "\\(3.0 \\times 10^{10}\\) electrons were added",
          "\\(7.7 \\times 10^{-28}\\) electrons were removed",
          "\\(3.0 \\times 10^{19}\\) electrons were removed",
          "\\(3.0 \\times 10^{10}\\) electrons were removed",
          "\\(3.0 \\times 10^{7}\\) electrons were removed",
        ],
        steps: [
          "Positive means electrons were taken away, which rules out A.",
          "\\(n = Q/e = 4.8 \\times 10^{-9} / 1.6 \\times 10^{-19} = 3.0 \\times 10^{10}\\).",
          "B multiplies instead of dividing (and a number of electrons cannot be a tiny fraction). C forgets the nano (\\(10^{-9}\\)); E reads nano as pico (\\(10^{-12}\\)).",
        ],
        answer: "(D) \\(3.0 \\times 10^{10}\\) electrons were removed",
      },
      practiceSet: [
        { prompt: "What is the net charge of a neutral helium atom?", answer: "0 C", method: "2 protons and 2 electrons cancel" },
        { prompt: "How many electrons make a charge of \\(-1.0\\ \\text{C}\\)?", answer: "\\(6.25 \\times 10^{18}\\)", method: "\\(1 / 1.6 \\times 10^{-19}\\)" },
        { prompt: "Could an oil drop carry a charge of \\(2.4 \\times 10^{-19}\\ \\text{C}\\)?", answer: "No", method: "That is \\(1.5e\\); charge comes only in whole multiples of \\(e\\)" },
        { prompt: "An ion carries a charge of \\(+3.2 \\times 10^{-19}\\ \\text{C}\\). How many electrons has the atom lost?", answer: "2", method: "\\(3.2 \\times 10^{-19} / 1.6 \\times 10^{-19}\\)" },
      ],
      traps: [
        {
          title: "A neutral atom has zero charge, not a small one",
          body: "An atom has as many electrons as protons, so the charges cancel exactly. Its net charge is 0 C. Options giving a neutral atom a tiny charge in nC or pC are wrong; only an ion carries a net charge.",
        },
        {
          title: "Positive charge means electrons lost, not protons gained",
          body: "Protons are locked in nuclei and do not move from one solid to another. A body becomes positive by losing electrons and negative by gaining them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ele-conductors",
      name: "Conductors and insulators: where charge can move",
      intuition:
        "In a metal some electrons are not tied to any one atom, so they drift through the whole piece and carry charge with them. In an insulator every electron stays with its own atom, so a charge placed on it stays where it was put. That single difference decides what happens when charged objects touch.",
      definition:
        "- A **conductor** has charges free to move (electrons in metals, ions in solutions). Extra charge on an isolated conductor spreads out until it sits on the **outer surface**.\n" +
        "- An **insulator** has no free charges. Charge placed on it stays in place, and touching another body does not share it out.\n" +
        "- When two **identical metal spheres** touch, they share the total charge **equally**. Total charge before = total charge after.\n" +
        "- When two **insulating** bodies touch, each keeps (to a first approximation) its own charge.\n" +
        "- **Earthing** a conductor connects it to the ground, which can give or take any number of electrons, so the conductor ends up neutral.",
      table: {
        columns: ["Material", "Free charge carriers", "Charge placed on it", "Examples"],
        rows: [
          { cells: ["Metal (conductor)", "Electrons", "Spreads over the outer surface", "Copper, aluminium, gold"] },
          { cells: ["Electrolyte (conductor)", "Positive and negative ions", "Moves with the ions", "Salt water, blood plasma, acid solutions"] },
          { cells: ["Semiconductor", "A few electrons, more when warmer", "Moves slowly", "Silicon, germanium"] },
          { cells: ["Insulator", "None", "Stays where it was placed", "Glass, plastic, rubber, dry air, pure water (nearly)"] },
        ],
        caption: "Most metals conduct better when cold; semiconductors conduct better when warm.",
      },
      selfCheckExample: {
        prompt:
          "Two identical small metal spheres carry charges of \\(+6\\ \\text{nC}\\) and \\(-2\\ \\text{nC}\\). They are touched together and then separated. What is the charge on each?",
        options: [
          "\\(+4\\ \\text{nC}\\) each",
          "\\(+2\\ \\text{nC}\\) each",
          "\\(+3\\ \\text{nC}\\) and \\(-1\\ \\text{nC}\\)",
          "0 nC each",
          "\\(+6\\ \\text{nC}\\) and \\(-2\\ \\text{nC}\\), unchanged",
        ],
        steps: [
          "Total charge: \\(+6 + (-2) = +4\\ \\text{nC}\\). It is conserved.",
          "The spheres are identical conductors, so they share it equally: \\(+2\\ \\text{nC}\\) each.",
          "A adds the sizes and ignores the sign. E would be right for insulators, not for metals. D would need the charges to be equal and opposite.",
        ],
        answer: "(B) \\(+2\\ \\text{nC}\\) each",
      },
      practiceSet: [
        { prompt: "Two insulating plastic beads, one charged and one neutral, touch briefly. Does the charge spread evenly between them?", answer: "No", method: "In an insulator the charge cannot move" },
        { prompt: "A charged metal sphere is connected to the ground by a wire. What is its final charge?", answer: "Zero", method: "Earthing makes a conductor neutral" },
        { prompt: "Where does the extra charge sit on an isolated charged metal sphere?", answer: "On its outer surface", method: "Like charges in a conductor push each other as far apart as possible" },
      ],
      traps: [
        {
          title: "Insulators do not share charge on contact",
          body: "Sharing charge equally on contact is a property of conductors. If two insulating bodies touch, the charge cannot flow, so each keeps the charge it had. Options that average the charges by size or radius apply only to metals.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ele-coulomb",
      name: "Coulomb's law: the force between two point charges",
      intuition:
        "Like charges repel and unlike charges attract. The force grows with each charge and weakens quickly with distance: double the gap and the force drops to a quarter. Each charge pulls or pushes the other equally hard, even if one charge is much bigger.",
      definition:
        "**Coulomb's law**: two point charges \\(q_1\\) and \\(q_2\\) a distance \\(r\\) apart exert equal and opposite forces on each other, along the line joining them.\n" +
        "- The size is proportional to \\(q_1 q_2\\) and to \\(1/r^2\\) (an **inverse square law**).\n" +
        "- \\(k = \\dfrac{1}{4\\pi\\varepsilon_0} \\approx 9.0 \\times 10^9\\ \\text{N m}^2/\\text{C}^2\\) in a vacuum (or air).\n" +
        "- Like signs repel, opposite signs attract.\n" +
        "- For ratio questions, write the new force as a fraction of the old: multiply by each charge's factor and divide by the distance factor **squared**.",
      formula: {
        label: "Coulomb's law",
        latex: "F = k\\,\\frac{q_1 q_2}{r^2}",
        symbols: [
          { symbol: "\\(F\\)", meaning: "force on each charge, in N" },
          { symbol: "\\(q_1, q_2\\)", meaning: "the two charges, in C" },
          { symbol: "\\(r\\)", meaning: "distance between them, in m" },
          { symbol: "\\(k\\)", meaning: "\\(9.0 \\times 10^9\\ \\text{N m}^2/\\text{C}^2\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Charges of \\(+2.0\\ \\mu\\text{C}\\) and \\(-3.0\\ \\mu\\text{C}\\) are 0.30 m apart in air. Find the size of the force between them and say whether it attracts or repels.",
        steps: [
          "\\(F = 9.0 \\times 10^9 \\times \\dfrac{(2.0 \\times 10^{-6})(3.0 \\times 10^{-6})}{0.30^2}\\).",
          "Top: \\(9.0 \\times 10^9 \\times 6.0 \\times 10^{-12} = 0.054\\). Bottom: \\(0.090\\). So \\(F = 0.054 / 0.090 = 0.60\\ \\text{N}\\).",
          "The signs are opposite, so the force is attractive. The same 0.60 N acts on each charge.",
        ],
        answer: "0.60 N, attractive",
      },
      selfCheckExample: {
        prompt:
          "Two small charged spheres exert a force \\(F\\) on each other. The charge on each sphere is doubled and the distance between them is tripled. What is the new force?",
        options: [
          "\\(\\dfrac{4F}{3}\\)",
          "\\(\\dfrac{2F}{9}\\)",
          "\\(36F\\)",
          "\\(\\dfrac{2F}{3}\\)",
          "\\(\\dfrac{4F}{9}\\)",
        ],
        steps: [
          "Charges: \\(2 \\times 2 = 4\\) times larger.",
          "Distance tripled: divide by \\(3^2 = 9\\).",
          "New force \\(= 4F/9\\). A forgets to square the distance; B doubles only one charge; C multiplies by \\(r^2\\) instead of dividing.",
        ],
        answer: "(E) \\(\\dfrac{4F}{9}\\)",
      },
      practiceSet: [
        { prompt: "The distance between two charges is halved. What happens to the force?", answer: "It becomes 4 times larger", method: "\\(1/(1/2)^2 = 4\\)" },
        { prompt: "Find the force between two charges of \\(1.0\\ \\mu\\text{C}\\) each, 1.0 m apart.", answer: "\\(9.0 \\times 10^{-3}\\ \\text{N}\\)", method: "\\(9.0 \\times 10^9 \\times 10^{-12} / 1\\)" },
        { prompt: "A charge of \\(5\\ \\text{nC}\\) sits near a charge of \\(1\\ \\text{nC}\\). Which feels the larger force?", answer: "Neither; the forces are equal", method: "Newton's third law" },
      ],
      traps: [
        {
          title: "The bigger charge does not feel a bigger force",
          body: "The forces on the two charges are a Newton's third law pair: equal in size and opposite in direction, whatever the two charges are. Only the accelerations can differ, because the masses can differ.",
        },
        {
          title: "Distance enters squared",
          body: "Coulomb's law is an inverse square law. Tripling the distance divides the force by 9, not by 3. Options that divide by the distance factor alone are the usual distractor.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ele-field",
      name: "Electric field: force per unit charge, and field lines",
      intuition:
        "A charge changes the space around it, so that any other charge placed there feels a force. The electric field at a point is the force a +1 C test charge would feel there. Once you know the field, the force on any charge is just the charge times the field.",
      definition:
        "The **electric field** \\(E\\) at a point is the force per unit positive charge placed there: \\(E = F/q\\), in N/C (the same as V/m).\n" +
        "- Around a point charge \\(Q\\): \\(E = kQ/r^2\\), pointing **away** from a positive charge and **towards** a negative one.\n" +
        "- A positive charge is pushed **along** the field; a negative charge (an electron) is pushed **against** it.\n" +
        "- **Field lines** start on positive charges and end on negative ones. They never cross, and where they are closer together the field is stronger.\n" +
        "- Between two parallel charged plates the lines are straight, parallel and evenly spaced: a **uniform field**.",
      formula: {
        label: "Electric field",
        latex: "E = \\frac{F}{q} \\qquad E = k\\,\\frac{Q}{r^2}",
        symbols: [
          { symbol: "\\(E\\)", meaning: "electric field strength, in N/C" },
          { symbol: "\\(F\\)", meaning: "force on a charge \\(q\\) placed in the field, in N" },
          { symbol: "\\(Q\\)", meaning: "the charge that makes the field, in C" },
          { symbol: "\\(r\\)", meaning: "distance from \\(Q\\), in m" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the electric field 0.20 m from a charge of \\(+4.0\\ \\text{nC}\\). An electron is placed at that point: what force acts on it, and in which direction?",
        steps: [
          "\\(E = kQ/r^2 = 9.0 \\times 10^9 \\times 4.0 \\times 10^{-9} / 0.20^2 = 36 / 0.040 = 900\\ \\text{N/C}\\), pointing away from the charge.",
          "Force on the electron: \\(F = eE = 1.6 \\times 10^{-19} \\times 900 = 1.44 \\times 10^{-16}\\ \\text{N}\\).",
          "The electron is negative, so it is pushed against the field: towards the positive charge.",
        ],
        answer: "900 N/C; about \\(1.4 \\times 10^{-16}\\ \\text{N}\\) towards the charge",
      },
      selfCheckExample: {
        prompt:
          "A proton is in a uniform electric field of strength \\(5.0 \\times 10^3\\ \\text{N/C}\\). What force acts on it? (\\(e = 1.6 \\times 10^{-19}\\ \\text{C}\\))",
        options: [
          "\\(8.0 \\times 10^{-16}\\ \\text{N}\\), along the field",
          "\\(8.0 \\times 10^{-16}\\ \\text{N}\\), against the field",
          "\\(3.2 \\times 10^{-23}\\ \\text{N}\\), along the field",
          "\\(3.1 \\times 10^{22}\\ \\text{N}\\), along the field",
          "\\(8.0 \\times 10^{-13}\\ \\text{N}\\), along the field",
        ],
        steps: [
          "\\(F = qE = 1.6 \\times 10^{-19} \\times 5.0 \\times 10^3 = 8.0 \\times 10^{-16}\\ \\text{N}\\).",
          "A proton is positive, so the force is along the field. B is the direction for an electron.",
          "C divides \\(q\\) by \\(E\\); D divides \\(E\\) by \\(q\\); E slips a power of ten.",
        ],
        answer: "(A) \\(8.0 \\times 10^{-16}\\ \\text{N}\\), along the field",
      },
      practiceSet: [
        { prompt: "How does the field of a point charge change when you move three times as far away?", answer: "It falls to one ninth", method: "\\(E \\propto 1/r^2\\)" },
        { prompt: "Near a negative point charge, which way do the field lines point?", answer: "Towards the charge", method: "Lines end on negative charges" },
        { prompt: "A 2.0 μC charge feels a force of 0.010 N. What is the field there?", answer: "5000 N/C", method: "\\(0.010 / 2.0 \\times 10^{-6}\\)" },
      ],
      traps: [
        {
          title: "Electrons move against the field",
          body: "The field direction is defined by the force on a positive charge. An electron feels a force of the same size in the opposite direction. Options that send an electron along the field lines are wrong.",
        },
      ],
    },
  ],
};
