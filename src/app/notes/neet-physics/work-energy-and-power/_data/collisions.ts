import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_WE_COLLISIONS_NOTE: SubtopicNote = {
  subtopicName: "Collisions",
  title: "Collisions",
  oneLineDefinition:
    "Momentum conserved in every collision, kinetic energy only in an elastic one, the link K = p²/2m, sticking collisions, head-on elastic collisions, and the energy a bouncing ball loses at the ground.",
  whyItMatters:
    "Three NEET questions, all from 2024 or later. NEET 2024 asked for the speed after two equal masses stick together, Re-NEET 2024 for the height a ball rebounds to after losing half its kinetic energy at the ground, and Re-NEET 2026 for how high a hanging bob rises after an equal mass hits it elastically.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphwe-inelastic",
      name: "Momentum, kinetic energy and sticking collisions",
      visualizationSlug: "imat-collision-momentum",
      intuition:
        "When two bodies collide, the large forces between them are internal to the pair, equal and opposite. So the total momentum just before and just after the collision is the same, in every kind of collision. Kinetic energy is a different story: some of it usually turns into heat, sound and the bending of the bodies. When the bodies stick together, they move off with one common velocity and the most kinetic energy is lost.",
      definition:
        "- Momentum \\(p = mv\\). Kinetic energy in terms of momentum: \\(K = \\dfrac{p^{2}}{2m}\\), so \\(p = \\sqrt{2mK}\\).\n" +
        "- Equal momenta: the lighter body has more kinetic energy. Equal kinetic energies: the heavier body has more momentum (\\(p \\propto \\sqrt{m}\\)).\n" +
        "- Momentum is conserved in every collision. Kinetic energy is conserved only in an **elastic** collision; in an **inelastic** one some is lost.\n" +
        "- **Perfectly inelastic** (the bodies stick): \\(m_1u_1 + m_2u_2 = (m_1 + m_2)v\\).\n" +
        "- \\(m_1\\) moving at u onto \\(m_2\\) at rest, sticking: \\(v = \\dfrac{m_1u}{m_1 + m_2}\\), and the kinetic energy lost is \\(\\dfrac{m_1m_2u^{2}}{2(m_1 + m_2)}\\).",
      formula: {
        label: "Sticking collision",
        latex: "m_1u_1 + m_2u_2 = (m_1 + m_2)v, \\qquad K = \\frac{p^{2}}{2m}",
      },
      authoredExample: {
        prompt:
          "A 20 g bullet moving at 300 m/s hits a 2.98 kg block at rest on a smooth floor and stays inside it. Find their common speed and the kinetic energy lost.",
        steps: [
          "Momentum: \\(0.02 \\times 300 = (0.02 + 2.98)v\\), so \\(v = \\dfrac{6}{3} = 2\\) m/s.",
          "Before: \\(\\tfrac{1}{2}(0.02)(300)^{2} = 900\\) J. After: \\(\\tfrac{1}{2}(3)(2)^{2} = 6\\) J.",
          "Lost: \\(900 - 6 = 894\\) J, almost all of it.",
        ],
        answer: "2 m/s; 894 J lost",
      },
      selfCheckExample: {
        prompt: "Two bodies of masses 1 kg and 4 kg have equal kinetic energies. What is the ratio of their momenta?",
        steps: [
          "\\(p = \\sqrt{2mK}\\), and K is the same for both, so \\(p \\propto \\sqrt{m}\\).",
          "\\(\\dfrac{p_1}{p_2} = \\sqrt{\\dfrac{1}{4}} = \\dfrac{1}{2}\\).",
        ],
        answer: "1 : 2",
      },
      practiceSet: [
        { prompt: "The momentum of a body is doubled. By what factor does its kinetic energy change?", answer: "It becomes 4 times" },
        { prompt: "Bodies of masses 2 kg and 6 kg have equal momenta. What is the ratio of their kinetic energies, lighter to heavier?", answer: "3 : 1" },
        { prompt: "In an inelastic collision, which is conserved: momentum, kinetic energy, or both?", answer: "Momentum only" },
        { prompt: "A 3 kg ball moving at 4 m/s meets a 1 kg ball moving at 6 m/s in the opposite direction, and they stick. What is their velocity afterwards?", answer: "1.5 m/s in the 3 kg ball's original direction" },
      ],
      pyqExampleId: "2000c2e6-5d38-43f1-9102-ed26f34864ef",
      traps: [
        {
          title: "Momentum is kept even when kinetic energy is not",
          body: "In a sticking collision kinetic energy is lost, but momentum is still conserved. Always find the speed after the collision from momentum, never from kinetic energy.",
        },
        {
          title: "Equal momenta do not mean equal kinetic energies",
          body: "With \\(K = p^{2}/2m\\), two bodies with the same momentum have kinetic energies in the inverse ratio of their masses: the lighter one has more.",
        },
        {
          title: "Directions carry signs",
          body: "When two bodies move towards each other, give one velocity a minus sign before adding momenta. Adding the speeds as if both moved the same way gives a wrong answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphwe-elastic",
      name: "Elastic collisions in one dimension",
      intuition:
        "In an elastic collision no kinetic energy is lost, so two laws hold at once: momentum and kinetic energy are both conserved. For a head-on collision with the second body at rest, these two equations fix both final velocities. The striking result is for equal masses: the moving body stops dead and the one at rest moves off with the full speed, as if they swapped velocities.",
      definition:
        "- Momentum and kinetic energy are both conserved.\n" +
        "- Head-on, with \\(m_2\\) at rest: \\(v_1 = \\dfrac{(m_1 - m_2)u_1}{m_1 + m_2}\\) and \\(v_2 = \\dfrac{2m_1u_1}{m_1 + m_2}\\).\n" +
        "- Equal masses: \\(v_1 = 0\\), \\(v_2 = u_1\\). The bodies exchange velocities.\n" +
        "- A light body hitting a very heavy one at rest bounces back with almost the same speed. A very heavy body hitting a light one at rest sends it off at almost \\(2u_1\\).\n" +
        "- If \\(m_1 < m_2\\), \\(v_1\\) comes out negative: the first body bounces back.\n" +
        "- A collision is quick: use momentum for the impact, then energy conservation for any motion after it, such as a struck bob rising \\(h = \\dfrac{v^{2}}{2g}\\).",
      formula: {
        label: "Elastic collision with the target at rest",
        latex: "v_1 = \\frac{(m_1 - m_2)u_1}{m_1 + m_2}, \\qquad v_2 = \\frac{2m_1u_1}{m_1 + m_2}",
      },
      authoredExample: {
        prompt:
          "A 1 kg ball moving at 6 m/s hits a 2 kg ball at rest, head-on and elastically. Find both velocities after the collision.",
        steps: [
          "\\(v_1 = \\dfrac{(1 - 2) \\times 6}{3} = -2\\) m/s: the 1 kg ball bounces back at 2 m/s.",
          "\\(v_2 = \\dfrac{2 \\times 1 \\times 6}{3} = 4\\) m/s.",
          "Check the kinetic energy: before \\(\\tfrac{1}{2}(1)(36) = 18\\) J; after \\(\\tfrac{1}{2}(1)(4) + \\tfrac{1}{2}(2)(16) = 2 + 16 = 18\\) J.",
        ],
        answer: "2 m/s backwards and 4 m/s forwards",
      },
      selfCheckExample: {
        prompt:
          "A 4 kg ball moving at 3 m/s hits a 1 kg ball at rest, head-on and elastically. What is the speed of the 1 kg ball afterwards?",
        steps: [
          "\\(v_2 = \\dfrac{2m_1u_1}{m_1 + m_2} = \\dfrac{2 \\times 4 \\times 3}{5}\\).",
          "\\(v_2 = \\dfrac{24}{5} = 4.8\\) m/s.",
        ],
        answer: "4.8 m/s",
      },
      practiceSet: [
        { prompt: "In a perfectly elastic collision, which quantities are conserved?", answer: "Both momentum and kinetic energy" },
        { prompt: "A small ball hits a very heavy wall head-on and elastically at 5 m/s. What is its velocity afterwards?", answer: "5 m/s, back the way it came" },
        { prompt: "A 3 kg ball moving at 4 m/s hits a 1 kg ball at rest, head-on and elastically. What is the velocity of the 3 kg ball afterwards?", answer: "2 m/s, in its original direction" },
        { prompt: "A body of mass m moving at u hits a body of mass 2m at rest, head-on and elastically. What fraction of its kinetic energy does the first body keep?", answer: "\\(\\tfrac{1}{9}\\)" },
      ],
      pyqExampleId: "c5d50ab7-e355-4c39-97ae-99f64797c7ab",
      traps: [
        {
          title: "Velocities swap only in an elastic collision",
          body: "Equal masses exchange velocities only when the collision is elastic. If they stick together, they share the momentum and move off at half the speed.",
        },
        {
          title: "Watch the sign of the first body's velocity",
          body: "When the striking body is lighter, \\((m_1 - m_2)\\) is negative and it bounces back. Reporting the size alone loses the direction.",
        },
        {
          title: "Momentum for the impact, energy for the swing",
          body: "A collision happens too fast for the string or gravity to matter, so use momentum (and kinetic energy if it is elastic) for the impact. Only after it does energy conservation give the height a bob rises.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphwe-bounce",
      name: "Bouncing and kinetic energy lost on impact",
      intuition:
        "A ball dropped from a height reaches the ground with all its potential energy turned into kinetic energy. The impact takes some of that away as heat, sound and squashing. The ball leaves the ground with what is left and climbs until that kinetic energy is potential energy again. So the rebound height is in the same ratio to the drop height as the kinetic energy kept is to the kinetic energy it arrived with.",
      definition:
        "- Speed on reaching the ground after falling h from rest: \\(v = \\sqrt{2gh}\\). Kinetic energy then: mgh.\n" +
        "- A ball that keeps a fraction f of its kinetic energy at the bounce rises to \\(h_2 = f\\,h_1\\).\n" +
        "- Speeds go as the square root of the heights: \\(\\dfrac{v_2}{v_1} = \\sqrt{\\dfrac{h_2}{h_1}}\\).\n" +
        "- A ball that leaves with a fraction s of its striking speed keeps \\(s^{2}\\) of its kinetic energy, so it rises to \\(s^{2}h_1\\).\n" +
        "- With no energy lost at the bounce, it rises back to the height it fell from.",
      formula: {
        label: "Rebound height",
        latex: "v = \\sqrt{2gh}, \\qquad \\frac{h_2}{h_1} = \\frac{K_{\\text{after}}}{K_{\\text{before}}} = \\left(\\frac{v_2}{v_1}\\right)^{2}",
      },
      authoredExample: {
        prompt:
          "A ball dropped from 20 m leaves the ground with half the speed it hit it with. How high does it rise? (g = 10 m/s²)",
        steps: [
          "Striking speed: \\(v_1 = \\sqrt{2 \\times 10 \\times 20} = 20\\) m/s, so it leaves at 10 m/s.",
          "Rebound height: \\(h_2 = \\dfrac{v_2^{2}}{2g} = \\dfrac{100}{20} = 5\\) m.",
          "Half the speed means a quarter of the kinetic energy, and a quarter of the height.",
        ],
        answer: "5 m",
      },
      selfCheckExample: {
        prompt:
          "A ball dropped from 5 m rebounds to 1.8 m. Find its speed just before and just after the bounce. (g = 10 m/s²)",
        steps: [
          "Before: \\(v_1 = \\sqrt{2 \\times 10 \\times 5} = 10\\) m/s.",
          "After: \\(v_2 = \\sqrt{2 \\times 10 \\times 1.8} = \\sqrt{36} = 6\\) m/s.",
        ],
        answer: "10 m/s and 6 m/s",
      },
      practiceSet: [
        { prompt: "A ball hits the floor at 8 m/s and leaves it at 6 m/s. What fraction of its kinetic energy does it keep?", answer: "\\(\\tfrac{9}{16}\\)" },
        { prompt: "A ball that loses no kinetic energy at the bounce is dropped from 3 m. How high does it rise?", answer: "3 m" },
        { prompt: "A ball rises 1.25 m after a bounce. At what speed did it leave the floor? (g = 10 m/s²)", answer: "5 m/s" },
        { prompt: "Why does a dropped ball never rise back quite to the height it fell from?", answer: "Some kinetic energy turns into heat, sound and deformation at each bounce" },
      ],
      pyqExampleId: "6523d0cd-4f5d-4258-9605-90e9f637649b",
      traps: [
        {
          title: "Half the energy is not half the speed",
          body: "A ball that loses 50% of its kinetic energy leaves at \\(\\tfrac{1}{\\sqrt{2}}\\), about 0.71, of its striking speed, and rises to half the height.",
        },
        {
          title: "Height follows energy, not speed",
          body: "Rebound height is proportional to the kinetic energy kept, which goes as the square of the speed. Half the speed gives a quarter of the height, not half.",
        },
      ],
    },
  ],
};
