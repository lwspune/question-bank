import type { SubtopicNote } from "@/app/notes/_types";

export const NERVOUS_NOTE: SubtopicNote = {
  subtopicName: "Nervous System and Sense Organs",
  title: "Nervous System and Sense Organs",
  oneLineDefinition:
    "Nerve cells carry electrical signals using sodium and potassium ions; the reflex arc and brain coordinate responses; and the eye converts light into images.",
  whyItMatters:
    "8 PYQs — the joint-largest cluster in the chapter. Three blocks: the nerve impulse (sodium and potassium ions), the reflex arc plus the brain's hindbrain role, and eye anatomy (cornea, retina, rods vs cones). The eye is heavily tested.",
  concepts: [
    // nerve impulse (FORMULA)
    {
      kind: "formula" as const,
      slug: "nerve-impulse",
      name: "The nerve impulse — sodium and potassium",
      intuition:
        "A neuron sends a signal as a wave of electrical change along its membrane. Two ions do the work: sodium (Na⁺) rushes IN to fire the signal (depolarisation), and potassium (K⁺) flows OUT to reset it (repolarisation). Both are essential — it is not one ion alone.",
      definition:
        "How the electrical signal travels:\n" +
        "- At rest, the neuron is more negative inside, with a **sodium–potassium pump** holding the gradient.\n" +
        "- **Depolarisation** — **sodium (Na⁺)** ions flow IN, flipping the charge: this is the impulse.\n" +
        "- **Repolarisation** — **potassium (K⁺)** ions flow OUT, restoring the resting state.\n" +
        "- So nerve signal transmission needs **both sodium and potassium**.",
      authoredExample: {
        prompt:
          "A nerve fibre is bathed in a fluid with no potassium ions. Even if sodium is plentiful, why does signalling fail?",
        steps: [
          "Sodium influx can still depolarise the membrane and start an impulse.",
          "But potassium outflow is what repolarises (resets) the membrane afterwards.",
          "Without potassium, the neuron cannot return to its resting state to fire again.",
          "So reliable signalling needs both ions.",
        ],
        answer: "Both Na⁺ and K⁺ are needed — Na⁺ fires the impulse, K⁺ resets the membrane.",
      },
      selfCheckExample: {
        prompt:
          "Which single element from this list is essential for nerve signalling: lithium, sodium, rubidium, caesium?",
        steps: [
          "Nerve impulses depend on sodium (and potassium) ions.",
          "Lithium, rubidium and caesium are other alkali metals but are not the body's nerve-signal ions.",
          "So the answer is sodium.",
        ],
        answer: "Sodium.",
      },
      practiceSet: [
        { prompt: "Which two ions enable the nerve impulse?", answer: "Sodium (Na⁺) and potassium (K⁺)" },
        { prompt: "Which ion flows in during depolarisation?", answer: "Sodium (Na⁺)" },
        { prompt: "Which ion flows out during repolarisation?", answer: "Potassium (K⁺)" },
      ],
      pyqExampleId: "8da3deb5-99f9-47e9-945e-55ca3e5953dd", // sodium AND potassium
      traps: [
        {
          title: "Both ions — not just sodium",
          body:
            "A question may offer 'sodium' alone and 'sodium and potassium' as separate options. The complete answer for impulse transmission is **sodium AND potassium** — sodium fires it, potassium resets it.",
        },
      ],
    },

    // reflex arc & brain (FORMULA + diagram)
    {
      kind: "formula" as const,
      slug: "reflex-arc-brain",
      name: "The reflex arc and brain regions",
      intuition:
        "A reflex (like jerking your hand off a hot plate) is fast because it does not wait for the brain — the signal loops through the spinal cord. " +
        "The brain itself is divided into regions; the hindbrain quietly runs the involuntary jobs that keep you alive.",
      definition:
        "The reflex pathway and brain division:\n" +
        "- **Reflex arc**: **receptor → sensory neuron → spinal cord → motor neuron → effector**. The spinal cord (not the brain) processes the reflex.\n" +
        "- **Forebrain (cerebrum)** — thinking, voluntary movement, sensation.\n" +
        "- **Hindbrain (medulla + cerebellum)** — **involuntary** actions: blood pressure, heartbeat, salivation, vomiting, balance.",
      visualizationSlug: "hp-reflex-arc",
      authoredExample: {
        prompt:
          "Put the reflex arc in order: spinal cord, receptor, effector, motor neuron, sensory neuron.",
        steps: [
          "A stimulus is detected by a **receptor**.",
          "A **sensory neuron** carries the signal to the **spinal cord**.",
          "The spinal cord relays it to a **motor neuron**.",
          "The motor neuron triggers the **effector** (muscle/gland) — all without the brain.",
        ],
        answer: "Receptor → sensory neuron → spinal cord → motor neuron → effector.",
      },
      selfCheckExample: {
        prompt:
          "Which brain region controls involuntary actions such as blood pressure, salivation and vomiting?",
        steps: [
          "Voluntary thought and movement are the forebrain's job.",
          "Automatic, life-sustaining functions are run by the hindbrain (medulla oblongata).",
          "Blood pressure, salivation and vomiting are involuntary → hindbrain.",
        ],
        answer: "The hindbrain (medulla oblongata).",
      },
      practiceSet: [
        { prompt: "Give the reflex arc sequence.", answer: "Receptor → sensory neuron → spinal cord → motor neuron → effector" },
        { prompt: "Which part processes a reflex — brain or spinal cord?", answer: "Spinal cord" },
        { prompt: "Which brain region controls heartbeat and blood pressure?", answer: "Hindbrain (medulla)" },
      ],
      pyqExampleId: "30e48e00-37ac-4182-9791-63c542ec6962", // reflex arc circuit
      traps: [
        {
          title: "A reflex does not go through the brain",
          body:
            "The correct reflex arc passes through the **spinal cord**, not the brain — that is why reflexes are fast. An option routing the reflex 'receptor → sensory → brain → motor → effector' is wrong for a spinal reflex.",
        },
      ],
    },

    // the eye (REFERENCE + diagram)
    {
      kind: "reference" as const,
      slug: "the-eye",
      name: "The eye — parts and photoreceptors",
      intuition:
        "Light enters the eye through the clear cornea, passes the pupil and lens, and forms an image on the retina at the back. The retina holds two photoreceptors: rods for dim light and cones for colour. " +
        "The cornea is a recall trap — it is transparent, has NO blood vessels, and is made of proteins and cells.",
      definition:
        "Eye parts in the path of light, plus the photoreceptors:\n" +
        "- **Cornea** — transparent front membrane where light **enters**; **avascular** (no blood vessels); made of proteins (collagen) and cells; NOT light-sensitive.\n" +
        "- **Iris / pupil** — the iris (coloured) controls the **pupil** (the aperture letting light in).\n" +
        "- **Lens** — focuses light onto the retina.\n" +
        "- **Retina** — the light-sensitive screen at the back where the **image forms**.\n" +
        "- **Rods** (dim light) and **cones** (colour vision) — the retina's photoreceptors.",
      visualizationSlug: "hp-eye-cross-section",
      table: {
        columns: ["Part", "Role"],
        rows: [
          {
            cells: ["**Cornea**", "Transparent front; light ENTERS here; avascular, proteins + cells"],
            noteAmber: "NDA 2021 — the cornea is composed of proteins and cells; it is NOT light-sensitive and has NO blood vessels.",
          },
          { cells: ["Iris / Pupil", "Iris controls the pupil — the light aperture"] },
          { cells: ["Lens", "Focuses light onto the retina"] },
          { cells: ["**Retina**", "Light-sensitive screen; IMAGE forms here"] },
          { cells: ["**Cones / Rods**", "Cones = colour vision; rods = dim-light vision"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Two facts: where does light first enter the eye, and which photoreceptor gives colour vision?",
        steps: [
          "Light first passes through the transparent **cornea** at the front.",
          "It is focused onto the retina, where photoreceptors respond.",
          "**Cones** detect colour (in bright light); rods handle dim light.",
        ],
        answer: "Light enters through the cornea; cones give colour vision.",
      },
      practiceSet: [
        { prompt: "Through which part does light enter the eye?", answer: "Cornea" },
        { prompt: "On which part is the image formed?", answer: "Retina" },
        { prompt: "Which photoreceptor is responsible for colour vision?", answer: "Cones" },
        { prompt: "Does the cornea have blood vessels?", answer: "No", method: "it is avascular; made of proteins and cells" },
      ],
      pyqExampleId: "f38e51e1-d942-4fc3-b4ad-be78baf43c00", // cornea proteins/cells (MOD)
      traps: [
        {
          title: "Cornea vs retina — entry vs image",
          body:
            "Light **enters** through the cornea; the image **forms** on the retina. The cornea is transparent and avascular (no blood vessels) and is NOT the light-sensitive part — that is the retina.",
        },
        {
          title: "Rods vs cones",
          body:
            "**Cones** = colour vision, work in bright light. **Rods** = dim-light / night vision, no colour. The bank tests this pair directly.",
        },
      ],
    },
  ],
};
