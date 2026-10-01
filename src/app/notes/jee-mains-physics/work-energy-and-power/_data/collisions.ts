import type { SubtopicNote } from "@/app/notes/_types";

export const COLLISIONS_WEP_NOTE: SubtopicNote = {
  subtopicName: "Elastic Collisions and Coefficient of Restitution",
  title: "Elastic Collisions and Coefficient of Restitution",
  oneLineDefinition:
    "In an elastic collision both momentum and kinetic energy are conserved; the coefficient of restitution compares the speed of separation with the speed of approach.",
  whyItMatters:
    "Fifteen PYQs, twelve of them multiple choice, and one from 2026; five carry a figure. Eleven are elastic collisions: velocities after a head-on hit, equal masses exchanging velocities, the share of kinetic energy passed on, a spring squeezed at the common velocity, a pendulum bob striking a block; four use the coefficient of restitution for a ball bouncing on a floor. Two results, the velocities after a hit on a body at rest and the rebound height e²h, answer most of them.",
  concepts: [
    // C1 — elastic collisions
    {
      kind: "formula" as const,
      slug: "jpwep-elastic",
      name: "Head-on elastic collisions",
      intuition:
        "In an elastic collision no kinetic energy is lost, and momentum is conserved as always. For a head-on hit, the two conditions together say the bodies separate as fast as they approached. For a target at rest this gives two short formulas that answer most questions without solving a quadratic.",
      definition:
        "- Target at rest: \\(v_1 = \\dfrac{m_1 - m_2}{m_1 + m_2}\\,u\\) and \\(v_2 = \\dfrac{2m_1}{m_1 + m_2}\\,u\\).\n" +
        "- Equal masses exchange velocities. A very heavy body hitting a light one at rest sends it off at nearly 2u; a light body hitting a very heavy one bounces back at nearly u.\n" +
        "- Fraction of kinetic energy passed to the target: \\(\\dfrac{4m_1m_2}{(m_1 + m_2)^{2}}\\).\n" +
        "- General head-on case: momentum plus \\(u_1 - u_2 = v_2 - v_1\\).\n" +
        "- Two blocks with a spring between them: the spring is most compressed when both move at the common velocity, and then \\(\\tfrac12 kx^{2} = \\tfrac12\\dfrac{m_1m_2}{m_1 + m_2}u^{2}\\).\n" +
        "- Glancing elastic hit between equal masses, one at rest: they move off at 90° to each other. For both to leave at equal angles to the original line, \\(M/m\\) can be at most 3.",
      formula: {
        label: "Elastic collision with a target at rest",
        latex: "v_1 = \\frac{m_1 - m_2}{m_1 + m_2}\\,u \\qquad v_2 = \\frac{2m_1}{m_1 + m_2}\\,u \\qquad \\frac{K_2}{K_1} = \\frac{4m_1m_2}{(m_1 + m_2)^{2}}",
      },
      authoredExample: {
        prompt:
          "A 2 kg ball moving at 6 m/s hits a 4 kg ball at rest head-on, and the collision is elastic. Find both velocities after the collision and the fraction of kinetic energy passed to the 4 kg ball.",
        steps: [
          "\\(v_1 = \\dfrac{2 - 4}{6} \\times 6 = -2\\) m/s: the 2 kg ball bounces back.",
          "\\(v_2 = \\dfrac{2 \\times 2}{6} \\times 6 = 4\\) m/s.",
          "Check: kinetic energy \\(36\\) J before; \\(4 + 32 = 36\\) J after.",
          "Fraction passed on: \\(\\dfrac{4 \\times 2 \\times 4}{6^{2}} = \\dfrac{32}{36}\\).",
        ],
        answer: "−2 m/s and 4 m/s; 8/9 of the kinetic energy.",
      },
      selfCheckExample: {
        prompt:
          "A 1 kg block moving at 6 m/s on a smooth floor runs into a 2 kg block at rest, which carries a light spring of force constant 1200 N/m on the side facing it. Find the maximum compression of the spring.",
        steps: [
          "At maximum compression both move together: \\(v = \\dfrac{1 \\times 6}{3} = 2\\) m/s.",
          "Kinetic energy before: \\(18\\) J. At the common velocity: \\(\\tfrac12 (3)(2)^{2} = 6\\) J.",
          "\\(\\tfrac12 (1200)x^{2} = 12 \\Rightarrow x^{2} = 0.02\\).",
        ],
        answer: "\\(x \\approx 0.14\\) m",
      },
      practiceSet: [
        { prompt: "A ball at 5 m/s hits an equal ball at rest, head-on and elastically. Find both velocities after.", answer: "\\(0\\) and \\(5\\) m/s" },
        { prompt: "A very heavy ball at 3 m/s hits a very light ball at rest, head-on and elastically. Find the light ball's speed.", answer: "\\(6\\) m/s" },
        { prompt: "A body of mass m hits a body of mass 3m at rest, head-on and elastically. What fraction of its kinetic energy is passed on?", answer: "\\(\\tfrac{3}{4}\\)" },
        { prompt: "Two 1 kg balls move towards each other at 4 m/s and 2 m/s and collide head-on elastically. Find their velocities after.", answer: "They exchange velocities: the 4 m/s ball moves back at 2 m/s, and the 2 m/s ball moves back at 4 m/s." },
      ],
      pyqExampleId: "495cf658-621a-44a1-b3cc-6db6e630624a", // 25 Jan 2023: light body rebounds off a heavier one, find its initial speed
      traps: [
        {
          title: "Exchange of velocities happens one collision at a time",
          body: "With three identical balls in a line, apply the exchanges in the order the collisions happen. Swapping the first and last velocities at once skips the middle ball and gives the wrong final set.",
        },
        {
          title: "Maximum compression is at the common velocity",
          body: "Two blocks with a spring between them squeeze it most when they move at the same speed, not when one of them stops. At that instant the kinetic energy missing from the pair is stored in the spring.",
        },
        {
          title: "A light body bounces back from a heavy one",
          body: "When m₁ < m₂, v₁ = (m₁ − m₂)u/(m₁ + m₂) is negative: the light body reverses. Taking its speed as positive in the momentum equation gives a wrong starting speed.",
        },
      ],
    },

    // C2 — coefficient of restitution
    {
      kind: "formula" as const,
      slug: "jpwep-restitution",
      name: "Coefficient of restitution and bouncing balls",
      intuition:
        "The coefficient of restitution e says how springy a collision is: the speed at which the bodies separate divided by the speed at which they approached. For a ball on the floor, it leaves at e times the speed it arrived with. Height goes as speed squared, so each bounce rises to e² of the height before.",
      definition:
        "- \\(e = \\dfrac{v_2 - v_1}{u_1 - u_2}\\): 1 for elastic, 0 when the bodies stick, in between otherwise.\n" +
        "- Ball dropped from h: arrives at \\(\\sqrt{2gh}\\), leaves at \\(e\\sqrt{2gh}\\), rises to \\(e^{2}h\\).\n" +
        "- Fraction of kinetic energy kept per bounce: \\(e^{2}\\); fraction lost: \\(1 - e^{2}\\).\n" +
        "- Height after n bounces: \\(e^{2n}h\\).\n" +
        "- Bouncing until it stops: total distance \\(h\\,\\dfrac{1 + e^{2}}{1 - e^{2}}\\); total time \\(\\sqrt{\\dfrac{2h}{g}}\\,\\dfrac{1 + e}{1 - e}\\).\n" +
        "- e from two heights: \\(e = \\sqrt{h_2/h_1}\\); from two speeds: \\(e = v_2/v_1\\).",
      formula: {
        label: "Coefficient of restitution",
        latex: "e = \\frac{v_2 - v_1}{u_1 - u_2} \\qquad h' = e^{2}h \\qquad \\frac{K'}{K} = e^{2}",
      },
      authoredExample: {
        prompt:
          "A ball is dropped from 8 m onto a floor, and the coefficient of restitution is 0.75. Find the height of the first bounce and the percentage of kinetic energy lost in the impact.",
        steps: [
          "\\(e^{2} = 0.5625\\).",
          "First bounce: \\(h' = 0.5625 \\times 8 = 4.5\\) m.",
          "Kinetic energy kept: 56.25%, so lost: \\(100 - 56.25 = 43.75\\%\\).",
        ],
        answer: "4.5 m; 43.75%.",
      },
      selfCheckExample: {
        prompt:
          "A ball is dropped from 5 m onto a floor with coefficient of restitution 0.5 and bounces until it comes to rest. Find the total distance it travels and the total time it takes. (\\(g = 10\\) m/s²)",
        steps: [
          "Distance: \\(5 \\times \\dfrac{1 + 0.25}{1 - 0.25} = 5 \\times \\dfrac{1.25}{0.75} \\approx 8.33\\) m.",
          "First fall takes \\(\\sqrt{2 \\times 5/10} = 1\\) s.",
          "Total time: \\(1 \\times \\dfrac{1 + 0.5}{1 - 0.5} = 3\\) s.",
        ],
        answer: "About 8.33 m; 3 s.",
      },
      practiceSet: [
        { prompt: "A ball hits the floor at 10 m/s and leaves at 6 m/s. Find the coefficient of restitution.", answer: "\\(0.6\\)" },
        { prompt: "A ball dropped from 9 m rebounds to 4 m. Find the coefficient of restitution.", answer: "\\(\\tfrac{2}{3}\\)" },
        { prompt: "The coefficient of restitution between a ball and a floor is 0.8. What fraction of its kinetic energy does the ball keep in each bounce?", answer: "\\(0.64\\)" },
        { prompt: "A ball is dropped from height h onto a floor with coefficient of restitution e. How high does it rise after the second bounce?", answer: "\\(e^{4}h\\)" },
      ],
      pyqExampleId: "ccd335ff-c101-48b1-ba01-9a55de71d5c2", // 31 Jan 2023: dropped from a height with given e, rebound height
      traps: [
        {
          title: "Height goes with e², speed with e",
          body: "A ball that leaves the floor at e times its arrival speed rises to e² times its starting height. Using e for the height ratio gives a rebound that is too high.",
        },
        {
          title: "Every bounce is travelled twice",
          body: "After the first fall, each bounce goes up and comes back down. The total distance is h + 2e²h + 2e⁴h + …, which sums to h(1 + e²)/(1 − e²); counting each bounce once gives too little.",
        },
      ],
    },
  ],
};
