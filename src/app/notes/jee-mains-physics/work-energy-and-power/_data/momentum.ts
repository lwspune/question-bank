import type { SubtopicNote } from "@/app/notes/_types";

export const MOMENTUM_WEP_NOTE: SubtopicNote = {
  subtopicName: "Impulse, Explosions and Perfectly Inelastic Collisions",
  title: "Impulse, Explosions and Perfectly Inelastic Collisions",
  oneLineDefinition:
    "Impulse is the change in momentum; in an explosion, a recoil or a collision where the bodies stick, total momentum is conserved but kinetic energy is not.",
  whyItMatters:
    "Twenty-one PYQs, sixteen of them multiple choice, and two from 2026. Seven are about impulse: a ball rebounding from the ground, a bat or a wall, the area under a force–time graph, and the average force over a contact time; nine conserve momentum in explosions, recoils, blocks that split and bodies that stick together; five fire a bullet into a pendulum bob and follow the swing. Momentum is a vector in every one of them, so a rebound or a sideways fragment changes the arithmetic.",
  concepts: [
    // C1 — impulse
    {
      kind: "formula" as const,
      slug: "jpwep-impulse",
      name: "Impulse and change in momentum",
      intuition:
        "Impulse is force multiplied by the time it acts, and it equals the change in momentum. Momentum is a vector, so a body that bounces straight back has its momentum reversed: the change is the sum of the two momenta, not their difference. The same change spread over a longer time needs a smaller force.",
      definition:
        "- \\(\\vec J = \\displaystyle\\int \\vec F\\,dt = \\Delta\\vec p = m(\\vec v - \\vec u)\\).\n" +
        "- Straight back from u to v: \\(|\\Delta p| = m(u + v)\\); with the same speed, \\(2mu\\).\n" +
        "- Dropped from \\(h_1\\), rebounding to \\(h_2\\): \\(|\\Delta p| = m\\left(\\sqrt{2gh_1} + \\sqrt{2gh_2}\\right)\\).\n" +
        "- Hitting a wall at angle θ to the normal and leaving at the same speed and angle: only the normal part reverses, \\(|\\Delta p| = 2mv\\cos\\theta\\), directed along the normal.\n" +
        "- Average force: \\(F_{\\text{avg}} = \\Delta p/\\Delta t\\); N bodies striking together give N times that.\n" +
        "- On an F–t graph the impulse is the area under the curve.",
      formula: {
        label: "Impulse",
        latex: "\\vec J = \\int \\vec F\\,dt = \\Delta\\vec p \\qquad F_{\\text{avg}} = \\frac{\\Delta p}{\\Delta t}",
      },
      authoredExample: {
        prompt:
          "A 0.2 kg ball is dropped from 5 m. It hits the floor and rebounds to 1.25 m. The contact lasts 0.01 s. Find the impulse from the floor and the average force, ignoring gravity during the contact. (\\(g = 10\\) m/s²)",
        steps: [
          "Speed just before: \\(\\sqrt{2 \\times 10 \\times 5} = 10\\) m/s down. Just after: \\(\\sqrt{2 \\times 10 \\times 1.25} = 5\\) m/s up.",
          "Taking up as positive: \\(\\Delta p = 0.2(5 - (-10)) = 3\\) N s.",
          "\\(F_{\\text{avg}} = 3 / 0.01 = 300\\) N.",
        ],
        answer: "3 N s upward; 300 N.",
      },
      selfCheckExample: {
        prompt:
          "A 0.25 kg ball hits a wall at 20 m/s, at 60° to the normal, and bounces off at the same speed and angle. Find the impulse given to the ball.",
        steps: [
          "The component along the wall does not change.",
          "The normal component, \\(20\\cos 60^{\\circ} = 10\\) m/s, reverses.",
          "\\(|\\Delta p| = 2 \\times 0.25 \\times 10\\).",
        ],
        answer: "5 N s, along the normal, away from the wall.",
      },
      practiceSet: [
        { prompt: "A 0.5 kg ball moving at 8 m/s is hit straight back at 8 m/s. Find the impulse.", answer: "\\(8\\) N s" },
        { prompt: "A change in momentum of 6 N s happens in 0.02 s in one case and in 0.06 s in another. Find the average forces.", answer: "\\(300\\) N and \\(100\\) N" },
        { prompt: "A force–time graph is a triangle with a peak of 50 N and a base of 0.04 s. Find the impulse.", answer: "\\(1\\) N s" },
        { prompt: "Twenty balls of 0.1 kg each hit a wall normally at 5 m/s and bounce back at 5 m/s, all within 2 s. Find the average force on the wall.", answer: "\\(10\\) N" },
      ],
      pyqExampleId: "27267228-8e5f-4059-8c5c-ede9a206f762", // 30 Jan 2024: dropped from a height, rebounds lower, impulse from ground
      traps: [
        {
          title: "A rebound adds the two speeds",
          body: "Momentum reverses on a rebound, so the change is m(u + v). Subtracting the speeds treats the ball as if it carried on in the same direction, and gives far too small an impulse.",
        },
        {
          title: "At an angle, only the normal part reverses",
          body: "A wall pushes only along its normal. A ball hitting at 45° to the normal has an impulse of 2mv cos 45°, which is 1/√2 of the impulse for a head-on hit at the same speed.",
        },
        {
          title: "Same impulse, smaller force",
          body: "A body brought to rest from the same speed always has the same impulse. A longer stopping time lowers the average force, not the impulse.",
        },
      ],
    },

    // C2 — momentum conservation
    {
      kind: "formula" as const,
      slug: "jpwep-momentum-conservation",
      name: "Conservation of momentum in explosions, recoil and sticking collisions",
      intuition:
        "With no outside force in a direction, the total momentum in that direction cannot change. A body at rest that explodes has pieces whose momenta add to zero as vectors. Two bodies that stick move off together with the total momentum, and some kinetic energy is lost as heat and sound.",
      definition:
        "- \\(\\sum m\\vec u = \\sum m\\vec v\\), added as vectors.\n" +
        "- From rest into two pieces: equal and opposite momenta, so \\(K_1 : K_2 = m_2 : m_1\\). A gun recoils at \\(V = mv/M\\).\n" +
        "- Three pieces from rest: the third piece's momentum cancels the vector sum of the other two. Two equal momenta p at right angles add to \\(\\sqrt2\\,p\\).\n" +
        "- Bodies that stick: \\(v = \\dfrac{m_1u_1 + m_2u_2}{m_1 + m_2}\\), with directions as signs.\n" +
        "- Kinetic energy lost: \\(\\tfrac12\\dfrac{m_1m_2}{m_1 + m_2}(u_1 - u_2)^{2}\\). As heat it can raise the temperature: \\(Q = (m_1 + m_2)\\,s\\,\\Delta T\\).\n" +
        "- A moving body that splits can GAIN kinetic energy: the extra comes from the internal energy released.",
      formula: {
        label: "Momentum conserved",
        latex: "m_1\\vec u_1 + m_2\\vec u_2 = m_1\\vec v_1 + m_2\\vec v_2 \\qquad \\Delta K_{\\text{lost}} = \\frac12\\frac{m_1m_2}{m_1 + m_2}\\left(u_1 - u_2\\right)^{2}",
      },
      authoredExample: {
        prompt:
          "A 6 kg shell at rest explodes into pieces of 1 kg, 2 kg and 3 kg. The 1 kg piece flies east at 24 m/s and the 2 kg piece flies north at 9 m/s. Find the velocity of the 3 kg piece.",
        steps: [
          "Momenta of the first two: 24 kg m/s east and 18 kg m/s north.",
          "Their sum has size \\(\\sqrt{24^{2} + 18^{2}} = 30\\) kg m/s.",
          "The 3 kg piece carries 30 kg m/s the opposite way: \\(v = 30/3 = 10\\) m/s.",
          "Direction: opposite to the sum, \\(\\tan^{-1}(18/24) \\approx 37^{\\circ}\\) south of west.",
        ],
        answer: "10 m/s, about 37° south of west.",
      },
      selfCheckExample: {
        prompt:
          "A 3 kg ball moving at 4 m/s meets a 1 kg ball moving at 2 m/s in the opposite direction, and they stick. Find their common velocity and the kinetic energy lost.",
        steps: [
          "\\(v = \\dfrac{3(4) + 1(-2)}{4} = \\dfrac{10}{4} = 2.5\\) m/s, in the 3 kg ball's direction.",
          "Before: \\(\\tfrac12 (3)(16) + \\tfrac12 (1)(4) = 26\\) J. After: \\(\\tfrac12 (4)(2.5)^{2} = 12.5\\) J.",
          "Check: \\(\\tfrac12 \\times \\tfrac{3}{4} \\times (4 + 2)^{2} = 13.5\\) J.",
        ],
        answer: "2.5 m/s; 13.5 J lost.",
      },
      practiceSet: [
        { prompt: "A 5 kg gun fires a 20 g bullet at 250 m/s. Find the gun's recoil speed.", answer: "\\(1\\) m/s" },
        { prompt: "A 2 kg block at 6 m/s hits a 4 kg block at rest and they stick. Find their common speed.", answer: "\\(2\\) m/s" },
        { prompt: "A body at rest explodes into pieces of 1 kg and 3 kg. Find the ratio of their kinetic energies, lighter to heavier.", answer: "\\(3 : 1\\)" },
        { prompt: "A 4 kg block moving at 10 m/s splits into two equal halves. One half moves on at 15 m/s in the same direction. Find the other half's velocity.", answer: "\\(5\\) m/s, same direction" },
      ],
      pyqExampleId: "da6d923d-e98c-4b60-9c8c-028f6cb8454c", // 23 Jan 2026 S2: body at rest explodes into three pieces
      traps: [
        {
          title: "Momenta add as vectors",
          body: "Two fragments with momentum p each, flying at right angles, have a total momentum of √2·p, not 2p. The third fragment must carry √2·p back the other way.",
        },
        {
          title: "Kinetic energy is not conserved when bodies stick",
          body: "Only momentum carries through a sticking collision. Writing ½m₁u₁² = ½(m₁ + m₂)v² gives a wrong common speed; the lost energy goes into heat, sound and deformation.",
        },
        {
          title: "An explosion can increase kinetic energy",
          body: "When a moving block splits, the pieces can together have more kinetic energy than the block had. Momentum is conserved; kinetic energy is not, in either direction.",
        },
      ],
    },

    // C3 — bullet and pendulum
    {
      kind: "formula" as const,
      slug: "jpwep-bullet-pendulum",
      name: "Bullet and pendulum: momentum in the impact, energy in the swing",
      intuition:
        "A bullet hitting a pendulum bob is two separate events. The impact is very short, so momentum is conserved but kinetic energy is not. The swing that follows is slow, the string does no work, and mechanical energy is conserved. Use one law for each stage, in order.",
      definition:
        "- Bullet embeds: \\(mu = (M + m)V\\). Then the swing: \\(V^{2} = 2gh\\). Together: \\(u = \\dfrac{M + m}{m}\\sqrt{2gh}\\).\n" +
        "- Bullet passes through and leaves at v: \\(mu = mv + MV\\).\n" +
        "- Bullet bounces back at v: \\(mu = -mv + MV\\), so the bob gets more momentum than the bullet brought.\n" +
        "- To take the bob round a full vertical circle on a string, it needs \\(V = \\sqrt{5gL}\\) at the bottom.\n" +
        "- Kinetic energy lost in an embedding impact: \\(\\tfrac12 mu^{2}\\cdot\\dfrac{M}{M + m}\\), nearly all of it when \\(M \\gg m\\).",
      formula: {
        label: "Ballistic pendulum",
        latex: "mu = (M + m)V \\qquad V = \\sqrt{2gh} \\qquad V_{\\text{full circle}} = \\sqrt{5gL}",
      },
      authoredExample: {
        prompt:
          "A 20 g bullet moving at 450 m/s embeds itself in a 2.98 kg block hanging on a long string. How high does the block rise? (\\(g = 10\\) m/s²)",
        steps: [
          "Impact, momentum: \\(0.02 \\times 450 = (2.98 + 0.02)V\\), so \\(V = 9/3 = 3\\) m/s.",
          "Swing, energy: \\(h = \\dfrac{V^{2}}{2g} = \\dfrac{9}{20}\\).",
        ],
        answer: "\\(0.45\\) m",
      },
      selfCheckExample: {
        prompt:
          "A 50 g bullet hits the 0.95 kg bob of a pendulum whose string is 0.4 m long, and stays in it. Find the least speed of the bullet for the bob to go round a full vertical circle. (\\(g = 10\\) m/s²)",
        steps: [
          "The bob plus bullet, 1 kg, needs \\(V = \\sqrt{5gL} = \\sqrt{5 \\times 10 \\times 0.4} = \\sqrt{20} \\approx 4.47\\) m/s at the bottom.",
          "Impact: \\(0.05\\,u = 1 \\times 4.47\\), so \\(u \\approx 89.4\\) m/s.",
        ],
        answer: "About 89 m/s",
      },
      practiceSet: [
        { prompt: "A 10 g bullet at 400 m/s embeds in a 3.99 kg block at rest. Find their common speed.", answer: "\\(1\\) m/s" },
        { prompt: "A block hanging on a string starts swinging at 1 m/s. How high does it rise? (\\(g = 10\\) m/s²)", answer: "\\(0.05\\) m" },
        { prompt: "A 10 g bullet at 400 m/s embeds in a 3.99 kg block at rest. How much kinetic energy is lost in the impact?", answer: "\\(798\\) J" },
        { prompt: "A bullet of mass m enters a bob of mass M at rest with speed u and leaves it with speed u/2. Find the bob's speed.", answer: "\\(\\dfrac{mu}{2M}\\)" },
      ],
      pyqExampleId: "d902c8cf-3079-45a9-a7c3-125211d93512", // 1 Feb 2024: bullet embeds in a pendulum bob, height of rise
      traps: [
        {
          title: "Do not conserve energy through the impact",
          body: "Setting ½mu² = (M + m)gh skips the impact and claims the bullet's kinetic energy all goes into the swing. Most of it becomes heat. Use momentum for the impact, then energy for the swing.",
        },
        {
          title: "A bullet that bounces back gives the bob extra momentum",
          body: "If the bullet recoils at v, the bob's momentum is MV = m(u + v), not m(u − v). The minus sign of the recoiling velocity turns into a plus.",
        },
      ],
    },
  ],
};
