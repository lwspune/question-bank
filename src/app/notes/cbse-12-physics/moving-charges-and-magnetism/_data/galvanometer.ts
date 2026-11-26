import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_MC_GALVANOMETER_NOTE: SubtopicNote = {
  subtopicName: "The Moving Coil Galvanometer",
  title: "The Moving Coil Galvanometer, the Ammeter and the Voltmeter",
  oneLineDefinition:
    "How a moving coil galvanometer works, why its field is radial, its current and voltage sensitivity, and how it is turned into an ammeter with a shunt or into a voltmeter with a large series resistance.",
  whyItMatters:
    "31 questions, twenty-nine of them from board papers. The board asks you to explain the principle and working of a moving coil galvanometer and the purpose of its radial field and soft iron core (2023, 2025, 2026), define current sensitivity and explain why raising it need not raise the voltage sensitivity (2024, 2025), and convert a galvanometer into an ammeter or a voltmeter of a given range (every year from 2023 to 2026), and find the torque on a galvanometer coil from its current, turns, area and field (2025). The textbook adds a circuit read with a galvanometer and with an ammeter, and a comparison of two meters.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpmc-mcg-working",
      name: "Principle and working of a moving coil galvanometer",
      intuition:
        "A galvanometer is the current loop of the last page with a spring attached. The current turns the coil, the spring twists back, and the coil stops where the two torques balance. More current, more twist, a bigger reading.",
      definition:
        "- **Principle:** a current-carrying coil placed in a magnetic field feels a torque.\n" +
        "- **Parts (for the labelled diagram):** a coil of many turns, free to turn about a fixed axis, between the concave pole pieces of a permanent magnet; a cylindrical soft iron core inside the coil; a spring Sp that gives a counter torque; a pointer moving over a scale.\n" +
        "- **Working:** a current I in the coil gives a torque \\(\\tau = NIAB\\). The field is radial, so \\(\\sin\\theta = 1\\) at every position of the coil.\n" +
        "- The spring gives a restoring torque \\(k\\phi\\), where k is the torsional constant and φ the deflection. In equilibrium \\(k\\phi = NIAB\\), so \\(\\phi = \\left(\\dfrac{NAB}{k}\\right)I\\): the deflection is proportional to the current.\n" +
        "- **Radial field:** the plane of the coil always lies along the field lines, so the torque is NIAB whatever the deflection, and the scale is linear.\n" +
        "- **Soft iron core:** it not only makes the field radial but also increases its strength.\n" +
        "- **Why it cannot be used as an ammeter as such:** it is very sensitive, giving full-scale deflection for a current of the order of microamperes, and its large resistance, put in series, would change the current being measured.",
      formula: {
        label: "Deflection of a moving coil galvanometer",
        latex: "k\\phi = NIAB, \\qquad \\phi = \\left(\\frac{NAB}{k}\\right) I",
      },
      authoredExample: {
        prompt:
          "A galvanometer coil of 100 turns and area \\(2.5 \\times 10^{-4}\\) m² hangs in a radial field of 0.4 T. Its spring has a torsional constant of \\(1 \\times 10^{-6}\\) N m per radian. Find the deflecting torque and the deflection for a current of 50 µA.",
        steps: [
          "Given: N = 100, A = \\(2.5 \\times 10^{-4}\\) m², B = 0.4 T, k = \\(10^{-6}\\) N m/rad, I = \\(5 \\times 10^{-5}\\) A.",
          "Torque: \\(\\tau = NIAB = 100 \\times 5 \\times 10^{-5} \\times 2.5 \\times 10^{-4} \\times 0.4 = 5 \\times 10^{-7}\\) N m.",
          "Deflection: \\(\\phi = \\dfrac{\\tau}{k} = \\dfrac{5 \\times 10^{-7}}{10^{-6}} = 0.5\\) rad, about 29°.",
        ],
        answer: "\\(5 \\times 10^{-7}\\) N m; 0.5 rad (about 29°)",
      },
      selfCheckExample: {
        prompt: "A galvanometer deflects through 0.3 rad for a current of 30 µA. What is its deflection for 50 µA?",
        steps: ["φ is proportional to I.", "\\(\\phi = 0.3 \\times \\dfrac{50}{30} = 0.5\\) rad."],
        answer: "0.5 rad",
      },
      practiceSet: [
        { prompt: "What provides the restoring torque in a moving coil galvanometer?", answer: "The spring attached to the coil" },
        { prompt: "Find the torque on a galvanometer coil of 200 turns and area \\(10^{-4}\\) m² carrying 2 mA in a radial field of 0.5 T.", answer: "\\(2 \\times 10^{-5}\\) N m" },
        {
          prompt: "Why can a galvanometer not be used as such to measure the current in a circuit?",
          answer: "It gives full-scale deflection for a very small current, and its large resistance would change the current in the circuit",
        },
      ],
      pyqExampleId: "6cd61134-f8a9-4722-b1f7-a8b64f1a459a",
      traps: [
        {
          title: "An unlabelled diagram",
          body: "Label the coil, the concave pole pieces, the soft iron core, the spring and the pointer and scale. A diagram is often asked for and the labels carry the marks.",
        },
        {
          title: "Plane of the coil at right angles to the field",
          body: "In a radial field the plane of the coil always lies along the field lines; the normal is at right angles to the field. That is why sinθ = 1 at every deflection.",
        },
        {
          title: "Saying the core only makes the field radial",
          body: "The soft iron core does two jobs: it makes the field radial and it makes the field stronger. The board set an assertion on this in 2026.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmc-sensitivity",
      name: "Current sensitivity and voltage sensitivity",
      intuition:
        "A sensitive galvanometer gives a big deflection for a small current. Winding more turns helps, but more turns means a longer wire and more resistance, so the deflection for a given voltage may not improve at all.",
      definition:
        "- **Current sensitivity:** the deflection per unit current, \\(\\dfrac{\\phi}{I} = \\dfrac{NAB}{k}\\).\n" +
        "- It is increased by more turns N, a larger area A, a stronger field B, or a smaller torsional constant k. A convenient way for the maker is to increase N.\n" +
        "- **Voltage sensitivity:** the deflection per unit voltage, \\(\\dfrac{\\phi}{V} = \\dfrac{NAB}{k}\\,\\dfrac{1}{R}\\), where R is the resistance of the galvanometer.\n" +
        "- **Why more current sensitivity may not mean more voltage sensitivity:** doubling N doubles the current sensitivity, but the coil's resistance also roughly doubles because it is proportional to the length of wire. With N → 2N and R → 2R, the voltage sensitivity stays the same.\n" +
        "- Comparing two meters with the same spring: the ratio of current sensitivities is the ratio of NAB, and the ratio of voltage sensitivities is the ratio of NAB/R.",
      formula: {
        label: "Current and voltage sensitivity",
        latex: "\\frac{\\phi}{I} = \\frac{NAB}{k}, \\qquad \\frac{\\phi}{V} = \\frac{NAB}{kR}",
      },
      authoredExample: {
        prompt:
          "Meter P has N = 40, A = \\(3.0 \\times 10^{-4}\\) m², B = 0.2 T and R = 25 Ω. Meter Q has N = 80, A = \\(1.5 \\times 10^{-4}\\) m², B = 0.4 T and R = 50 Ω. Their springs are identical. Find the ratio of Q to P of (a) the current sensitivity and (b) the voltage sensitivity.",
        steps: [
          "NAB for P: \\(40 \\times 3.0 \\times 10^{-4} \\times 0.2 = 2.4 \\times 10^{-3}\\); for Q: \\(80 \\times 1.5 \\times 10^{-4} \\times 0.4 = 4.8 \\times 10^{-3}\\).",
          "(a) The springs are the same, so the current sensitivity ratio is \\(\\dfrac{4.8 \\times 10^{-3}}{2.4 \\times 10^{-3}} = 2\\).",
          "(b) Voltage sensitivity ratio \\(= 2 \\times \\dfrac{R_P}{R_Q} = 2 \\times \\dfrac{25}{50} = 1\\).",
        ],
        answer: "(a) 2 (b) 1",
      },
      selfCheckExample: {
        prompt:
          "A galvanometer of resistance 50 Ω deflects 30 divisions for a current of 3 mA. Find its current sensitivity and its voltage sensitivity.",
        steps: [
          "Current sensitivity: \\(\\dfrac{30}{3} = 10\\) divisions per mA.",
          "Voltage across it: \\(V = IR = 3 \\times 10^{-3} \\times 50 = 0.15\\) V. Voltage sensitivity: \\(\\dfrac{30}{0.15} = 200\\) divisions per volt.",
        ],
        answer: "10 divisions per mA; 200 divisions per volt",
      },
      practiceSet: [
        { prompt: "Write the formula for the voltage sensitivity of a galvanometer.", answer: "\\(\\dfrac{\\phi}{V} = \\dfrac{NAB}{kR}\\)" },
        { prompt: "How does using a stiffer spring (larger k) change the current sensitivity?", answer: "It lowers it" },
        { prompt: "Give the unit of current sensitivity.", answer: "Radian (or division) per ampere" },
      ],
      pyqExampleId: "48ccb0ca-81e4-4bc7-a60f-9ed5541aa165",
      traps: [
        {
          title: "Assuming more turns always helps both sensitivities",
          body: "More turns raise the current sensitivity, but the resistance rises in step, so the voltage sensitivity may not change. Say why: R is proportional to the length of wire.",
        },
        {
          title: "Putting k on top",
          body: "A stiffer spring twists less, so k goes in the denominator: \\(NAB/k\\), not \\(k/NAB\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmc-ammeter",
      name: "Converting a galvanometer into an ammeter",
      intuition:
        "An ammeter must carry a large current but the galvanometer can take only a tiny one. So you give most of the current a bypass: a small resistance placed across the galvanometer.",
      definition:
        "- Connect a **small resistance S (the shunt) in parallel** with the galvanometer of resistance G.\n" +
        "- At full scale, \\(I_g\\) goes through G and \\(I - I_g\\) through S. The two have the same potential difference: \\(I_g G = (I - I_g)S\\), so \\(S = \\dfrac{I_g G}{I - I_g}\\).\n" +
        "- **Resistance of the ammeter:** \\(\\dfrac{GS}{G + S}\\), which is close to S when G is much larger than S. It is small, so putting the ammeter in series hardly changes the current. An ideal ammeter has zero resistance.\n" +
        "- A smaller shunt gives a larger range.\n" +
        "- An ammeter is connected in series with the part of the circuit whose current is measured.",
      formula: {
        label: "Shunt for an ammeter",
        latex: "S = \\frac{I_g G}{I - I_g}",
      },
      authoredExample: {
        prompt:
          "A galvanometer of resistance 40 Ω gives full-scale deflection for 5 mA. How will you convert it into an ammeter of range 0 to 5 A? Find the resistance of the ammeter.",
        steps: [
          "Given: G = 40 Ω, \\(I_g = 5 \\times 10^{-3}\\) A, I = 5 A.",
          "Formula: \\(S = \\dfrac{I_g G}{I - I_g}\\).",
          "\\(S = \\dfrac{5 \\times 10^{-3} \\times 40}{5 - 0.005} = \\dfrac{0.2}{4.995} = 0.040\\) Ω, connected in parallel with the galvanometer.",
          "Resistance of the ammeter: \\(\\dfrac{GS}{G + S} = \\dfrac{40 \\times 0.040}{40.04} \\approx 0.040\\) Ω.",
        ],
        answer: "A shunt of 0.040 Ω in parallel; the ammeter's resistance is about 0.040 Ω",
      },
      selfCheckExample: {
        prompt: "A galvanometer of resistance G has a shunt of G/49 across it. What fraction of the total current passes through the galvanometer?",
        steps: ["\\(\\dfrac{I_g}{I} = \\dfrac{S}{G + S}\\).", "\\(\\dfrac{G/49}{G + G/49} = \\dfrac{1}{50}\\)."],
        answer: "One fiftieth",
      },
      practiceSet: [
        { prompt: "How is an ammeter connected in a circuit?", answer: "In series" },
        { prompt: "What is the resistance of an ideal ammeter?", answer: "Zero" },
        { prompt: "To increase the range of an ammeter, should its shunt be made larger or smaller?", answer: "Smaller" },
      ],
      pyqExampleId: "b68c9a3c-537e-47df-8318-e81aa44b580c",
      traps: [
        {
          title: "Putting the shunt in series",
          body: "A shunt is a small resistance in parallel. A resistance in series would raise the resistance and cut the current instead of carrying most of it.",
        },
        {
          title: "Using I in place of I − Ig",
          body: "The shunt carries \\(I - I_g\\), not the whole current. Using I gives a slightly wrong shunt, which can be the wrong option in an MCQ.",
        },
        {
          title: "Giving the shunt as the ammeter's resistance",
          body: "The ammeter's resistance is G and S in parallel, \\(GS/(G + S)\\). It is a little less than S; when asked for it, show the parallel combination.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmc-voltmeter",
      name: "Converting a galvanometer into a voltmeter",
      intuition:
        "A voltmeter must take almost no current from the circuit. So you put a large resistance in series with the galvanometer: a big voltage now drives just the small current that gives full-scale deflection.",
      definition:
        "- Connect a **large resistance R in series** with the galvanometer.\n" +
        "- At full scale the current is \\(I_g\\) through both: \\(V = I_g(G + R)\\), so \\(R = \\dfrac{V}{I_g} - G\\).\n" +
        "- **Resistance of the voltmeter:** G + R, which is large. An ideal voltmeter has infinite resistance.\n" +
        "- A voltmeter is connected in parallel with the part of the circuit whose potential difference is measured, and must draw very little current so that it does not disturb the circuit.\n" +
        "- **Two ranges with the same galvanometer:** \\(I_g\\) is the same, so divide the two equations to remove it. For example, if \\(R_1\\) gives range V and \\(R_2\\) gives 2V, then \\(2(G + R_1) = G + R_2\\) and \\(G = R_2 - 2R_1\\).",
      formula: {
        label: "Series resistance for a voltmeter",
        latex: "R = \\frac{V}{I_g} - G",
      },
      authoredExample: {
        prompt: "A galvanometer of resistance 30 Ω gives full-scale deflection for 2 mA. How will you convert it into a voltmeter of range 0 to 10 V?",
        steps: [
          "Given: G = 30 Ω, \\(I_g = 2 \\times 10^{-3}\\) A, V = 10 V.",
          "Formula: \\(R = \\dfrac{V}{I_g} - G\\).",
          "\\(R = \\dfrac{10}{2 \\times 10^{-3}} - 30 = 5000 - 30 = 4970\\) Ω.",
          "Connect 4970 Ω in series with the galvanometer.",
        ],
        answer: "A resistance of 4970 Ω in series",
      },
      selfCheckExample: {
        prompt:
          "A galvanometer of resistance 100 Ω reads up to 3 V when a resistance of 2000 Ω is in series with it. What series resistance makes it read up to 6 V?",
        steps: [
          "\\(I_g = \\dfrac{3}{100 + 2000} = \\dfrac{3}{2100}\\) A.",
          "For 6 V the total resistance must be \\(\\dfrac{6}{I_g} = 4200\\) Ω, so R = 4200 − 100 = 4100 Ω.",
        ],
        answer: "4100 Ω",
      },
      practiceSet: [
        { prompt: "What is the resistance of an ideal voltmeter?", answer: "Infinite" },
        { prompt: "How is a voltmeter connected in a circuit?", answer: "In parallel with the part whose potential difference is measured" },
        { prompt: "Why must a voltmeter have a large resistance?", answer: "So that it draws very little current and does not change the potential difference it measures" },
      ],
      pyqExampleId: "f808bb69-4bbb-4b5a-81b4-3996af784bc5",
      traps: [
        {
          title: "Forgetting to subtract G",
          body: "\\(V/I_g\\) is the total resistance the voltmeter needs. The galvanometer already supplies G of it, so the resistance to add is \\(V/I_g - G\\).",
        },
        {
          title: "Expecting the series resistance to double when the range doubles",
          body: "What doubles is the total, G + R. The added resistance more than doubles: \\(R_2 = 2R_1 + G\\).",
        },
      ],
    },
  ],
};
