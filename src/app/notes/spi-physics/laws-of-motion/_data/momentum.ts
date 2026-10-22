import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_LM_MOMENTUM_NOTE: SubtopicNote = {
  subtopicName: "Momentum and Force",
  title: "Momentum and Force",
  oneLineDefinition:
    "Momentum is mass times velocity; a force is what changes it, and the force equals how fast the momentum changes, while the total momentum of bodies that only push on each other stays the same.",
  whyItMatters:
    "Three questions in the bank, one EASY and two MODERATE, one of them from the 2022 paper: the force from a change of momentum in a short time, the force needed to hold a machine gun steady, and two cars that stick together after a head-on crash. All three use one idea, momentum, so learn it with its direction.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spilmmo-laws",
      name: "Newton's three laws of motion",
      intuition:
        "A ball on the floor stays put until you kick it, and a kick on a heavy ball moves it less than the same kick on a light one. When you kick, the ball pushes back on your foot. Those three everyday facts are Newton's three laws.",
      definition:
        "- **First law (inertia):** a body stays at rest, or keeps moving in a straight line at the same speed, unless a force acts on it.\n" +
        "- **Second law:** the force on a body equals its mass times its acceleration, \\(F = ma\\). The unit of force is the **newton**: 1 N gives 1 kg an acceleration of 1 m/s².\n" +
        "- **Third law:** to every action there is an **equal and opposite reaction**. The two forces act on **different** bodies, so they do not cancel.\n" +
        "- A gun **recoils** when it fires: it pushes the bullet forward and the bullet pushes it back.",
      formula: {
        label: "Newton's second law",
        latex: "F = ma",
      },
      authoredExample: {
        prompt: "A force acts on a 2 kg trolley and gives it an acceleration of 3 m/s². Find the force.",
        steps: ["\\(F = ma = 2 \\times 3 = 6\\) N."],
        answer: "6 N",
      },
      practiceSet: [
        { prompt: "Which of Newton's laws explains why passengers fall forward when a bus stops suddenly?", answer: "The first law (inertia)" },
        { prompt: "What force gives a 5 kg body an acceleration of 4 m/s²?", answer: "20 N" },
        { prompt: "Why do action and reaction not cancel each other?", answer: "They act on two different bodies." },
      ],
      traps: [
        {
          title: "Cancelling action against reaction",
          body:
            "Forces cancel only when they act on the same body. Action and reaction act on two different bodies (the gun and the bullet), so each body still moves.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spilmmo-momentum",
      name: "Momentum and force as its rate of change",
      intuition:
        "A slow truck and a fast cricket ball are both hard to stop: one has a large mass, the other a large speed. Momentum puts the two together. Stopping it quickly needs a big force; stopping it slowly needs a small one.",
      definition:
        "- **Momentum** \\(p = mv\\). Its unit is kg m/s, and it has a direction, the direction of the velocity.\n" +
        "- **Force** \\(=\\) change in momentum \\(\\div\\) time taken. The same change of momentum in a **shorter** time needs a **larger** force.\n" +
        "- That is why a fielder draws his hands back while catching: the catch takes longer, so the force on his hands is smaller.\n" +
        "- For a gun firing a stream of bullets, the force needed to hold it steady \\(=\\) (bullets fired per **second**) \\(\\times\\) (momentum of one bullet). The gun's own mass does not come into it.",
      formula: {
        label: "Momentum and force",
        latex: "p = mv \\qquad F = \\frac{\\Delta p}{\\Delta t} \\qquad F = n \\times m v \\text{ for } n \\text{ bullets each second}",
      },
      authoredExample: {
        prompt: "A ball of mass 0.2 kg moving at 10 m/s is stopped by a fielder in 0.05 s. Find the force on his hands.",
        steps: [
          "Change in momentum \\(= 0.2 \\times 10 - 0 = 2\\) kg m/s.",
          "\\(F = \\frac{2}{0.05} = 40\\) N.",
        ],
        answer: "40 N",
      },
      selfCheckExample: {
        prompt: "A gun fires 120 bullets a minute, each of mass 20 g, at 300 m/s. What force is needed to hold it in place?",
        steps: [
          "Bullets per second \\(= \\frac{120}{60} = 2\\).",
          "Momentum of one bullet \\(= 0.02 \\times 300 = 6\\) kg m/s.",
          "Force \\(= 2 \\times 6 = 12\\) N.",
        ],
        answer: "12 N",
      },
      practiceSet: [
        { prompt: "What is the momentum of a 5 kg body moving at 4 m/s?", answer: "20 kg m/s" },
        { prompt: "A force changes a body's momentum by 30 kg m/s in 0.5 s. What is the force?", answer: "60 N" },
        { prompt: "Why does a fielder pull his hands back while catching a fast ball?", answer: "It makes the catch last longer, so the force on his hands is smaller." },
        { prompt: "What is the SI unit of momentum?", answer: "kg m/s" },
      ],
      pyqExampleId: "dfd53a32-b839-4a8a-a53f-69708d485e35",
      traps: [
        {
          title: "Using bullets per minute",
          body:
            "Force is momentum per SECOND. If the rate is given per minute, divide by 60 first: 90 bullets a minute is 1.5 a second.",
        },
        {
          title: "Bringing the gun's mass into the force",
          body:
            "The force to hold a firing gun steady is the momentum given to the bullets each second. The gun's mass is extra information here.",
        },
        {
          title: "Leaving grams in the momentum",
          body: "Mass must be in kilograms: a 30 g bullet is 0.03 kg. Using 30 makes the momentum a thousand times too large.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spilmmo-conservation",
      name: "Conservation of momentum in collisions and recoil",
      intuition:
        "When two bodies collide, each pushes the other equally hard for the same time, in opposite directions. So whatever momentum one gains, the other loses. Add up the momentum before and after, with directions, and the two totals match.",
      definition:
        "- If no outside force acts, the **total momentum** of a group of bodies stays the **same** before and after they collide, explode or push apart.\n" +
        "- Momentum has direction. Pick one direction as **positive**; momentum the other way is **negative**.\n" +
        "- Two bodies moving **towards each other**: subtract their momenta. The joined bodies move in the direction of the **larger** one.\n" +
        "- A gun and bullet at rest have zero total momentum, so after firing \\(m_{\\text{gun}} v_{\\text{gun}} = m_{\\text{bullet}} v_{\\text{bullet}}\\), in opposite directions: that is **recoil**.",
      formula: {
        label: "Conservation of momentum",
        latex: "m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2",
      },
      authoredExample: {
        prompt: "A 5 kg gun fires a 25 g bullet at 300 m/s. Find the speed with which the gun recoils.",
        steps: [
          "Before firing the total momentum is 0.",
          "Bullet's momentum \\(= 0.025 \\times 300 = 7.5\\) kg m/s forward.",
          "The gun must have 7.5 kg m/s backwards: \\(v = \\frac{7.5}{5} = 1.5\\) m/s.",
        ],
        answer: "1.5 m/s, backwards",
      },
      selfCheckExample: {
        prompt: "A 2 kg trolley moving at 3 m/s hits a 1 kg trolley at rest, and they move off together. Find their common speed.",
        steps: [
          "Momentum before \\(= 2 \\times 3 + 0 = 6\\) kg m/s.",
          "After, the total mass is 3 kg: \\(v = \\frac{6}{3} = 2\\) m/s.",
        ],
        answer: "2 m/s",
      },
      practiceSet: [
        { prompt: "Two bodies with momenta 40 kg m/s and 15 kg m/s move towards each other and stick together. What is their momentum afterwards?", answer: "25 kg m/s, in the direction of the first body" },
        { prompt: "A gun and its bullet are at rest. What is their total momentum just after firing?", answer: "Zero" },
        { prompt: "Why does a gun move backwards when it is fired?", answer: "Momentum is conserved: the bullet's forward momentum is balanced by the gun's backward momentum." },
      ],
      pyqExampleId: "31dc8fba-628e-41f1-93f7-738d6620f83f",
      traps: [
        {
          title: "Adding momenta that point opposite ways",
          body:
            "Bodies moving towards each other have momenta in opposite directions. Subtract them; adding gives a total that is too large.",
        },
        {
          title: "Forgetting the direction of the answer",
          body: "After two bodies stick, they move in the direction of the one that had the larger momentum.",
        },
      ],
    },
  ],
};
