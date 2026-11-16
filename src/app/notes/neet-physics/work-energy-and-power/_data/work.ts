import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_WE_WORK_NOTE: SubtopicNote = {
  subtopicName: "Work and the Work-Energy Theorem",
  title: "Work and the Work-Energy Theorem",
  oneLineDefinition:
    "Work as the dot product W = F·d, work by a force that changes with position as the area under its graph, and the work-energy theorem: the net work on a body equals its change in kinetic energy.",
  whyItMatters:
    "Three NEET questions, all from 2024 or later. One finds the kinetic energy left after a force with a sideways part does work (Re-NEET 2024), one compares two cars' braking forces from their kinetic energies and stopping distances (NEET 2025), and one finds the work done by friction whose coefficient falls steadily along the path (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphwe-work",
      name: "Work done by a constant and a variable force",
      intuition:
        "A force does work when the body it acts on moves. Only the part of the force along the motion counts: a force at right angles to the motion does no work at all, however large it is. A force that helps the motion does positive work, one that opposes it, like friction, does negative work. When the force changes as the body moves, cut the path into tiny steps, find the work on each, and add them up. That sum is the area under the force-position graph.",
      definition:
        "- Constant force: \\(W = \\vec{F}\\cdot\\vec{d} = Fd\\cos\\theta\\), where \\(\\theta\\) is the angle between the force and the displacement. Work is a scalar, measured in joules (1 J = 1 N m).\n" +
        "- \\(\\theta < 90^{\\circ}\\): positive work. \\(\\theta = 90^{\\circ}\\): zero work. \\(\\theta > 90^{\\circ}\\): negative work.\n" +
        "- In components: \\(W = F_xd_x + F_yd_y + F_zd_z\\), with the displacement \\(\\vec{d} = \\vec{r}_{\\text{final}} - \\vec{r}_{\\text{initial}}\\).\n" +
        "- No displacement, no work: pushing a wall that does not move does no work on it.\n" +
        "- **Variable force** along x: \\(W = \\displaystyle\\int_{x_1}^{x_2} F\\,dx\\), the area under the F-x graph. Area below the x-axis counts as negative.",
      formula: {
        label: "Work",
        latex: "W = \\vec{F}\\cdot\\vec{d} = Fd\\cos\\theta, \\qquad W = \\int_{x_1}^{x_2} F\\,dx",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle between the force and the displacement" },
          { symbol: "\\(\\vec{d}\\)", meaning: "displacement, final position minus initial position" },
        ],
      },
      authoredExample: {
        prompt:
          "A constant force \\(\\vec{F} = (3\\hat{i} + 4\\hat{j})\\) N moves a body from the point (1 m, 2 m) to the point (4 m, 1 m). Find the work done by the force.",
        steps: [
          "Displacement: \\(\\vec{d} = (4 - 1)\\hat{i} + (1 - 2)\\hat{j} = 3\\hat{i} - \\hat{j}\\) m.",
          "\\(W = \\vec{F}\\cdot\\vec{d} = (3)(3) + (4)(-1) = 9 - 4 = 5\\) J.",
        ],
        answer: "5 J",
      },
      selfCheckExample: {
        prompt:
          "A force along the x-axis is 6 N from x = 0 to x = 2 m, then \\(-2\\) N from x = 2 m to x = 5 m. Find the net work it does as a body moves from x = 0 to x = 5 m.",
        steps: [
          "Area above the axis: \\(6 \\times 2 = 12\\) J.",
          "Area below the axis: \\(2 \\times 3 = 6\\) J, counted as \\(-6\\) J.",
          "Net work: \\(12 - 6 = 6\\) J.",
        ],
        answer: "6 J",
      },
      practiceSet: [
        { prompt: "A box is dragged 5 m along a floor by a 20 N force at 60° to the floor. How much work does the force do?", answer: "50 J" },
        { prompt: "A man holds a 10 kg bag still for 5 minutes. How much work does he do on the bag?", answer: "Zero: the bag does not move" },
        { prompt: "A 0.5 kg ball rises 4 m. How much work does gravity do on it? (g = 10 m/s²)", answer: "\\(-20\\) J" },
        { prompt: "A force \\(F = 3x^{2}\\) N acts along the x-axis. How much work does it do as a body moves from x = 0 to x = 2 m?", answer: "8 J" },
      ],
      pyqExampleId: "113003d8-b1a5-4ef7-b5ba-0f7453795ac2",
      traps: [
        {
          title: "Only the part along the motion does work",
          body: "A force with a part at right angles to the displacement does no work through that part. Use \\(W = \\vec{F}\\cdot\\vec{d}\\), never the product of the two magnitudes.",
        },
        {
          title: "Displacement is final minus initial position",
          body: "When a body moves from \\(\\vec{r}_1\\) to \\(\\vec{r}_2\\), the work is \\(\\vec{F}\\cdot(\\vec{r}_2 - \\vec{r}_1)\\). Taking the dot product with \\(\\vec{r}_2\\) alone gives a wrong answer.",
        },
        {
          title: "Area below the axis is negative work",
          body: "On an F-x graph, the parts where the force is negative subtract from the total. Adding every area as positive overstates the work.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphwe-work-energy",
      name: "The work-energy theorem",
      intuition:
        "Kinetic energy is the energy a body has because it is moving. Every force on the body either adds to it (positive work) or takes from it (negative work). Add up the work of all the forces together and you get exactly the change in kinetic energy. So if you know the work, you know the new speed, and if you know the speeds, you know the work, without ever finding the acceleration.",
      definition:
        "- Kinetic energy: \\(K = \\tfrac{1}{2}mv^{2}\\). It is never negative, and it goes as the square of the speed.\n" +
        "- **Work-energy theorem:** \\(W_{\\text{net}} = K_f - K_i\\), where \\(W_{\\text{net}}\\) is the work done by ALL the forces: applied force, friction, gravity and the rest.\n" +
        "- It holds for a variable force too, so it works with an F-x graph or an integral.\n" +
        "- A constant retarding force F stops a body of kinetic energy K in a distance \\(s = \\dfrac{K}{F}\\), because \\(Fs = K\\).\n" +
        "- Zero net work means the speed at the end equals the speed at the start.",
      formula: {
        label: "Work-energy theorem",
        latex: "W_{\\text{net}} = K_f - K_i, \\qquad K = \\tfrac{1}{2}mv^{2}",
      },
      authoredExample: {
        prompt:
          "A 2 kg block at rest is pulled 4 m along a rough floor by a horizontal force of 13 N. Friction on it is 4 N. Find its speed at the end.",
        steps: [
          "Net work: \\((13 - 4) \\times 4 = 36\\) J.",
          "It starts at rest, so \\(\\tfrac{1}{2}(2)v^{2} = 36\\), giving \\(v^{2} = 36\\).",
          "\\(v = 6\\) m/s.",
        ],
        answer: "6 m/s",
      },
      selfCheckExample: {
        prompt:
          "A 0.1 kg ball is thrown straight up at 20 m/s. Use the work-energy theorem to find how high it rises. (g = 10 m/s²)",
        steps: [
          "Only gravity does work on the way up: \\(-mgh\\).",
          "\\(-mgh = 0 - \\tfrac{1}{2}mv^{2}\\), so \\(h = \\dfrac{v^{2}}{2g} = \\dfrac{400}{20}\\).",
          "\\(h = 20\\) m. The mass cancels.",
        ],
        answer: "20 m",
      },
      practiceSet: [
        { prompt: "The speed of a 4 kg body rises from 2 m/s to 4 m/s. How much net work is done on it?", answer: "24 J" },
        { prompt: "The speed of a body is doubled. By what factor does its kinetic energy change?", answer: "It becomes 4 times" },
        { prompt: "A 5 kg block sliding on a level floor slows from 6 m/s to rest. How much work does friction do on it?", answer: "\\(-90\\) J" },
        { prompt: "The net work done on a moving body is zero. How does its final speed compare with its starting speed?", answer: "They are equal" },
      ],
      pyqExampleId: "872ef245-f810-473b-95b6-5b7ba49243d8",
      traps: [
        {
          title: "Count the work of every force",
          body: "The theorem uses the net work. Leaving out friction or gravity and using only the applied force gives too large a change in kinetic energy.",
        },
        {
          title: "Kinetic energy goes as the square of the speed",
          body: "Doubling the speed makes the kinetic energy four times, not two times. Halving the speed leaves one quarter.",
        },
        {
          title: "Stopping distance grows with kinetic energy",
          body: "For the same braking force, \\(s = K/F\\). A car at twice the speed has four times the kinetic energy, so it needs four times the distance to stop.",
        },
      ],
    },
  ],
};
