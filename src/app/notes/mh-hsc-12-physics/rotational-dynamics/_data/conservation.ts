import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_RD_CONSERVATION_NOTE: SubtopicNote = {
  subtopicName: "Conservation of Angular Momentum",
  title: "Conservation of Angular Momentum",
  oneLineDefinition:
    "When no external torque acts, Iω stays constant: a body that pulls its mass in spins faster, and one that spreads it out spins slower.",
  whyItMatters:
    "6 questions. Twice the board asked you to state and prove the law of conservation of angular momentum (2018, 2025). The textbook adds its everyday illustrations, a planet in orbit, a leaking water balloon and a lump of clay that sticks to a potter's wheel.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscprd-conservation-law",
      name: "The law and its proof",
      intuition:
        "A spinning dancer pulls in her arms and spins faster; she stretches them out and slows down. Nothing outside her twists her, so her moment of inertia times her angular speed cannot change. If one goes down, the other must go up.",
      definition:
        "- **Statement:** the angular momentum of a body, or of a system of bodies, remains constant in magnitude and direction if the net external torque on it is zero.\n" +
        "- **Proof:** for a body rotating about a fixed axis, \\(L = I\\omega\\).\n" +
        "- Differentiating: \\(\\dfrac{dL}{dt} = I\\dfrac{d\\omega}{dt} = I\\alpha = \\tau\\).\n" +
        "- If the external torque \\(\\tau = 0\\), then \\(\\dfrac{dL}{dt} = 0\\), so L is constant: \\(I_1\\omega_1 = I_2\\omega_2\\).\n" +
        "- **Illustrations:** a ballet dancer or skater folding the arms spins faster; a diver curls up to turn faster in the air and stretches out before entering the water; a person on a freely turning stool holding weights spins faster on pulling them in.\n" +
        "- A planet's angular momentum about the Sun is constant, because gravity acts along the line joining them and so exerts no torque about the Sun.",
      formula: {
        label: "Conservation of angular momentum",
        latex: "\\tau = \\frac{dL}{dt} = 0 \\;\\Rightarrow\\; I_1\\omega_1 = I_2\\omega_2",
      },
      authoredExample: {
        prompt:
          "A dancer spins at 2 rev/s with her arms stretched out, when her moment of inertia is 6 kg m². She folds her arms and her moment of inertia falls to 4 kg m². Find her new frequency of rotation.",
        steps: [
          "Given: \\(I_1 = 6\\) kg m², \\(n_1 = 2\\) rev/s, \\(I_2 = 4\\) kg m².",
          "Formula: no external torque, so \\(I_1\\omega_1 = I_2\\omega_2\\), which gives \\(I_1 n_1 = I_2 n_2\\).",
          "Substitution: \\(n_2 = \\dfrac{6 \\times 2}{4} = 3\\) rev/s.",
        ],
        answer: "3 rev/s",
      },
      selfCheckExample: {
        prompt:
          "A student on a freely turning stool holds dumb-bells and turns at 1.5 rev/s, with a moment of inertia of 4 kg m². She stretches out her arms and the moment of inertia becomes 6 kg m². Find her new frequency.",
        steps: ["\\(n_2 = \\dfrac{I_1 n_1}{I_2} = \\dfrac{4 \\times 1.5}{6}\\)."],
        answer: "1 rev/s",
      },
      practiceSet: [
        { prompt: "A diver curls up in mid air. What happens to her angular speed, and why?", answer: "It increases, because her moment of inertia falls while Iω stays constant" },
        { prompt: "What must be true of the external torque for the angular momentum of a system to stay constant?", answer: "The net external torque must be zero" },
        { prompt: "A spinning body's moment of inertia is halved with no external torque. What happens to its angular speed?", answer: "It doubles" },
      ],
      pyqExampleId: "246c63a4-a79c-4051-b2d7-9a6eb98ef328",
      traps: [
        {
          title: "Leaving out 'external'",
          body: "Internal forces, such as a dancer's muscles folding her arms, change I but not L. The condition in the statement is zero net EXTERNAL torque.",
        },
        {
          title: "Saying kinetic energy is conserved too",
          body: "When I falls and \\(\\omega\\) rises with Iω fixed, the kinetic energy \\(\\tfrac{1}{2}I\\omega^2\\) increases. The dancer does work pulling her arms in.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscprd-conservation-numericals",
      name: "Using I₁ω₁ = I₂ω₂",
      intuition:
        "Every problem has a before and an after. Work out the moment of inertia in each state, then set the two angular momenta equal.",
      definition:
        "- Find \\(I_1\\) before and \\(I_2\\) after. A small mass m that lands and sticks at distance x from the axis adds \\(mx^2\\).\n" +
        "- Two discs on the same axis that end up turning together: \\(I_1\\omega_1 + I_2\\omega_2 = (I_1 + I_2)\\omega\\).\n" +
        "- Since \\(\\omega = 2\\pi n\\), \\(I_1 n_1 = I_2 n_2\\). Frequencies may stay in r.p.m. as long as both sides use the same unit.\n" +
        "- If a body's mass or size changes, work out how I changes: for a sphere, \\(I = \\tfrac{2}{5}mR^2\\), so I changes with both m and \\(R^2\\).",
      formula: {
        label: "Before and after",
        latex: "I_1\\omega_1 = I_2\\omega_2 \\quad\\text{or}\\quad I_1 n_1 = I_2 n_2",
      },
      authoredExample: {
        prompt:
          "A disc of moment of inertia 0.3 kg m² spins freely at 90 r.p.m. A second disc of moment of inertia 0.2 kg m², not spinning, is dropped gently onto it on the same axis, and the two turn together. Find their common speed.",
        steps: [
          "Given: \\(I_1 = 0.3\\) kg m², \\(n_1 = 90\\) r.p.m., \\(I_2 = 0.2\\) kg m² at rest.",
          "Formula: \\(I_1 n_1 = (I_1 + I_2)n\\).",
          "Substitution: \\(n = \\dfrac{0.3 \\times 90}{0.3 + 0.2} = \\dfrac{27}{0.5} = 54\\) r.p.m.",
        ],
        answer: "54 r.p.m.",
      },
      selfCheckExample: {
        prompt:
          "A solid sphere spinning freely at 1 rev/s shrinks until its radius is half, with no change in mass. Find its new frequency.",
        steps: [
          "\\(I \\propto R^2\\), so halving R makes I one quarter.",
          "\\(n_2 = \\dfrac{I_1}{I_2}n_1 = 4 \\times 1 = 4\\) rev/s.",
        ],
        answer: "4 rev/s",
      },
      practiceSet: [
        { prompt: "A spinning body's moment of inertia rises from 2 kg m² to 5 kg m² with no external torque. It was turning at 10 rad/s. Find its new angular speed.", answer: "4 rad/s" },
        { prompt: "In \\(I_1 n_1 = I_2 n_2\\), must the frequencies be changed to rad/s first?", answer: "No. Any unit will do if both sides use the same one, because \\(2\\pi\\) cancels" },
      ],
      pyqExampleId: "fd219e7c-8f89-407b-9100-1c157e360c53",
      traps: [
        {
          title: "Forgetting the old moment of inertia",
          body: "After a mass sticks to a wheel, \\(I_2 = I_1 + mx^2\\), not \\(mx^2\\) alone.",
        },
        {
          title: "Using it while a motor drives the wheel",
          body: "\\(I_1\\omega_1 = I_2\\omega_2\\) holds only when no external torque acts. A motor or a brake breaks it.",
        },
      ],
    },
  ],
};
