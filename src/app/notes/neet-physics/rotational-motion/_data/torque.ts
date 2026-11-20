import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_RM_TORQUE_NOTE: SubtopicNote = {
  subtopicName: "Torque and Equilibrium",
  title: "Torque and Equilibrium",
  oneLineDefinition:
    "Torque as the turning effect of a force, found with the vector product, and the two conditions a rigid body must meet to stay at rest.",
  whyItMatters:
    "Two NEET questions, both HARD: a rod balanced on a wedge with two masses hung from it (2021), and the friction on a rod leaning against a smooth wall (2025). Both come down to one move: take moments about a well-chosen point.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphrm-torque",
      name: "Torque and the moment of a force",
      visualizationSlug: "torque-moment",
      intuition:
        "A door opens easily when you push far from the hinges and at right angles to the door. Push near the hinges, or along the door towards them, and nothing turns. Torque measures this turning effect: the force times how far its line of action passes from the turning point.",
      definition:
        "- Torque about a point: \\(\\vec{\\tau} = \\vec{r} \\times \\vec{F}\\), with \\(\\vec{r}\\) drawn from that point to where the force acts. Unit N m.\n" +
        "- Size: \\(\\tau = rF\\sin\\theta = F \\times d_{\\perp}\\), where \\(d_{\\perp}\\) is the perpendicular distance from the point to the line of the force (the lever arm).\n" +
        "- Direction: perpendicular to both \\(\\vec{r}\\) and \\(\\vec{F}\\), by the right-hand rule. So \\(\\vec{r} \\cdot \\vec{\\tau} = 0\\) and \\(\\vec{F} \\cdot \\vec{\\tau} = 0\\).\n" +
        "- Vector product: \\(\\vec{A} \\times \\vec{B} = -\\vec{B} \\times \\vec{A}\\). \\(\\hat{i} \\times \\hat{j} = \\hat{k}\\), \\(\\hat{j} \\times \\hat{k} = \\hat{i}\\), \\(\\hat{k} \\times \\hat{i} = \\hat{j}\\), and \\(\\hat{i} \\times \\hat{i} = 0\\).\n" +
        "- In the xy plane: \\(\\tau_z = xF_y - yF_x\\).\n" +
        "- **Couple**: two equal and opposite forces whose lines are a distance d apart. Net force zero, torque \\(Fd\\) about any point.\n" +
        "- **Principle of moments**: a lever at rest has anticlockwise moments equal to clockwise moments about its pivot.",
      formula: {
        label: "Torque",
        latex: "\\vec{\\tau} = \\vec{r} \\times \\vec{F}, \\qquad \\tau = rF\\sin\\theta = F\\,d_{\\perp}",
        symbols: [
          { symbol: "\\(\\vec{r}\\)", meaning: "position of the point where the force acts, from the chosen point" },
          { symbol: "\\(\\theta\\)", meaning: "angle between r and F" },
          { symbol: "\\(d_{\\perp}\\)", meaning: "lever arm: perpendicular distance to the line of the force" },
        ],
      },
      authoredExample: {
        prompt:
          "A force \\(\\vec{F} = (\\hat{i} + 3\\hat{j})\\) N acts at the point \\(\\vec{r} = (2\\hat{i} + \\hat{j})\\) m. Find its torque about the origin.",
        steps: [
          "Both vectors lie in the xy plane, so the torque is along z: \\(\\tau_z = xF_y - yF_x\\).",
          "\\(\\tau_z = 2(3) - 1(1) = 5\\).",
        ],
        answer: "\\(5\\hat{k}\\) N m",
      },
      selfCheckExample: {
        prompt:
          "Two forces of 5 N, equal and opposite, act on a wheel along parallel lines 0.4 m apart. What are the net force and the torque on the wheel?",
        steps: [
          "The forces cancel, so the net force is zero.",
          "They form a couple: \\(\\tau = Fd = 5 \\times 0.4 = 2\\) N m.",
        ],
        answer: "Zero net force, torque 2 N m",
      },
      practiceSet: [
        { prompt: "A 10 N force acts at right angles to a spanner, 0.25 m from the bolt. What torque does it give?", answer: "2.5 N m" },
        { prompt: "A force acts along a line that passes through the pivot. What torque does it give about the pivot?", answer: "Zero" },
        { prompt: "Write \\(\\hat{j} \\times \\hat{i}\\).", answer: "\\(-\\hat{k}\\)" },
        { prompt: "Is the torque \\(\\vec{r} \\times \\vec{F}\\) along r, along F, or perpendicular to both?", answer: "Perpendicular to both" },
      ],
      pyqExampleId: "d459fa62-2f06-4c48-bef1-1f50604a9174",
      traps: [
        {
          title: "The lever arm is a perpendicular distance",
          body: "Use the perpendicular distance from the pivot to the line of the force, not the distance to the point where it acts. A force along the line through the pivot gives no torque at all.",
        },
        {
          title: "Order matters in the cross product",
          body: "Torque is \\(\\vec{r} \\times \\vec{F}\\). Working out \\(\\vec{F} \\times \\vec{r}\\) gives the same size but every component with the wrong sign.",
        },
        {
          title: "A couple turns but does not push",
          body: "Two equal and opposite forces on different lines give zero net force yet a torque Fd, so a body can spin up with its centre of mass at rest.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphrm-equilibrium",
      name: "Equilibrium of a rigid body",
      visualizationSlug: "imat-moments-seesaw",
      intuition:
        "A body stays at rest only if nothing pushes it along and nothing turns it. So the forces must add to zero and the torques must add to zero. Since the torques add to zero about every point, you are free to take moments about the point where an unknown force acts, and that force drops out.",
      definition:
        "- Translational equilibrium: \\(\\sum \\vec{F} = 0\\) (both components).\n" +
        "- Rotational equilibrium: \\(\\sum \\vec{\\tau} = 0\\) about any point.\n" +
        "- The weight of a body acts at its centre of gravity. In a uniform field this is the centre of mass: the midpoint of a uniform rod.\n" +
        "- A smooth surface pushes only at right angles to itself (no friction). A rough floor gives a normal force and a friction force along it.\n" +
        "- Choose the turning point at the place with the most unknown forces; their torques are then zero.",
      formula: {
        label: "Conditions for equilibrium",
        latex: "\\sum \\vec{F} = 0, \\qquad \\sum \\vec{\\tau} = 0",
      },
      authoredExample: {
        prompt:
          "A uniform plank 4 m long and of weight 200 N rests on two supports at its ends. A 400 N person stands 1 m from the left end. Find the force from each support.",
        steps: [
          "Moments about the left support: \\(R_{\\text{right}} \\times 4 = 200 \\times 2 + 400 \\times 1 = 800\\), so \\(R_{\\text{right}} = 200\\) N.",
          "Forces: \\(R_{\\text{left}} + R_{\\text{right}} = 600\\), so \\(R_{\\text{left}} = 400\\) N.",
        ],
        answer: "400 N at the left end, 200 N at the right end",
      },
      selfCheckExample: {
        prompt:
          "A uniform beam of weight 100 N is hinged to a wall at one end and held level by a vertical rope at the other end. Find the tension in the rope.",
        steps: [
          "Take moments about the hinge, so the hinge force drops out.",
          "\\(T \\times L = 100 \\times \\dfrac{L}{2}\\), so \\(T = 50\\) N.",
        ],
        answer: "50 N",
      },
      practiceSet: [
        { prompt: "Is a body with zero net force always in equilibrium?", answer: "No; the net torque must also be zero" },
        { prompt: "A see-saw balances with a 30 kg child 2 m from the pivot. How far from the pivot must a 40 kg child sit on the other side?", answer: "1.5 m" },
        { prompt: "In which direction does a smooth vertical wall push on a rod leaning against it?", answer: "Horizontally, at right angles to the wall" },
        { prompt: "Where does the weight of a uniform rod act?", answer: "At its midpoint" },
      ],
      pyqExampleId: "a8844c65-dbca-4ba7-abb0-029ccc0cfa4f",
      traps: [
        {
          title: "Pick the point that kills the unknowns",
          body: "Taking moments about the point where an unknown force acts removes it from the torque equation. Taking them about the middle of the body usually leaves two unknowns.",
        },
        {
          title: "Smooth means no friction",
          body: "A smooth wall or peg pushes only at right angles to its surface. Any friction a problem needs must come from the rough surface.",
        },
        {
          title: "Angle with the wall or with the floor",
          body: "A rod making 60° with a vertical wall makes 30° with the floor. Read which angle is given before you resolve the forces.",
        },
      ],
    },
  ],
};
