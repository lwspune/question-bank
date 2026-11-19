import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_HB_NERVES_NOTE: SubtopicNote = {
  subtopicName: "Nervous System and Sense Organs",
  title: "Nervous System and Sense Organs",
  oneLineDefinition:
    "Neurons pass messages across synapses with acetylcholine; the brain's cerebrum, cerebellum and medulla each control different work; and the ear turns sound into nerve signals in the cochlea.",
  whyItMatters:
    "Ten questions in the bank, four EASY, five MODERATE and one HARD. Four are about nerves (the synapse, acetylcholine, the autonomic system, the number of cranial nerves), three about parts of the brain (the right side, the medulla and its pyramids) and three about the ear and the tongue.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9hbne-neurons",
      name: "Neurons, synapses and the parts of the nervous system",
      intuition:
        "A nerve cell is a long wire. A message enters at its branches (dendrites), runs down the long axon and reaches the tip. There is a tiny gap before the next nerve cell, and a chemical carries the message across it. Some messages you control, like lifting a hand; others, like your heartbeat, run on their own.",
      definition:
        "- A **neuron** (nerve cell) has a **cell body (cyton)**, short branches called **dendrites**, and a long **axon** that carries the impulse away from the cell body.\n" +
        "- A **synapse** is the **junction of two nerve cells**: the axon ending of one neuron and the dendrites of the next.\n" +
        "- At the tip of the nerve fibre the chemical **acetylcholine** (a neurotransmitter) is released. It carries the impulse across the synapse.\n" +
        "- **Central nervous system (CNS)**: the **brain** and **spinal cord**.\n" +
        "- **Peripheral nervous system**: **12 pairs of cranial nerves** (24 nerves) from the brain and **31 pairs of spinal nerves** (62 nerves) from the spinal cord.\n" +
        "- **Autonomic nervous system**: controls the **involuntary organs**, such as the heart, lungs, stomach and intestines, without our will.",
      table: {
        columns: ["Part", "What it includes", "What it does"],
        rows: [
          { cells: ["Central nervous system", "Brain and spinal cord", "Thinking, memory and voluntary actions; the spinal cord also handles reflexes"] },
          { cells: ["Peripheral nervous system", "12 pairs of cranial nerves and 31 pairs of spinal nerves", "Carries messages between the brain or spinal cord and the body"] },
          { cells: ["Autonomic nervous system", "Nerves to the internal organs", "Controls involuntary organs: heart, lungs, stomach, intestines, glands"] },
        ],
        caption: "Count nerves, not pairs, when a question asks how many: 12 pairs make 24.",
      },
      selfCheckExample: {
        prompt: "How many spinal nerves arise from the human spinal cord in all?",
        steps: ["There are 31 pairs of spinal nerves.", "\\(31 \\times 2 = 62\\)."],
        answer: "62",
      },
      practiceSet: [
        { prompt: "What is the junction where one nerve cell meets the next called?", answer: "A synapse" },
        { prompt: "Which chemical carries a nerve impulse across a synapse?", answer: "Acetylcholine" },
        { prompt: "Which part of a neuron carries the impulse away from the cell body?", answer: "The axon" },
        { prompt: "How many cranial nerves does a human have in all?", answer: "24 (12 pairs)" },
      ],
      pyqExampleId: "5d8f22c1-361b-4f3a-a089-7b64b3b7fdb3",
      traps: [
        {
          title: "Counting pairs as nerves",
          body: "There are 12 pairs of cranial nerves, which is 24 nerves, and 31 pairs of spinal nerves, which is 62 nerves.",
        },
        {
          title: "Giving the heartbeat to the central nervous system",
          body: "Involuntary organs such as the heart and intestines are controlled by the autonomic nervous system, not by our will.",
        },
        {
          title: "Picking an acid as the neurotransmitter",
          body: "The chemical released at the tip of a nerve fibre is acetylcholine. Acetic acid and lactic acid have nothing to do with it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9hbne-brain",
      name: "Parts of the brain and what they control",
      intuition:
        "Think of the brain as three floors. The big folded top floor, the cerebrum, does your thinking. The small back part, the cerebellum, keeps you balanced. The bottom part, the medulla oblongata, joins the spinal cord and runs the jobs you never think about, like breathing and swallowing.",
      definition:
        "- **Cerebrum**: the largest part, with deep folds. It controls **thinking, memory, intelligence, speech** and **voluntary actions**.\n" +
        "- The cerebrum has a left and a right half. School books link the **left side** with **logical and analytical thinking** and the **right side** with **intuition, creativity and holistic thinking** (seeing things as a whole).\n" +
        "- **Cerebellum**: below the back of the cerebrum. It keeps the **balance** of the body and makes movements smooth and coordinated.\n" +
        "- **Medulla oblongata**: the **lowest part of the brain stem**, joining the spinal cord. It controls **involuntary actions**: heartbeat, breathing, swallowing, coughing, sneezing, vomiting and **producing saliva**.\n" +
        "- The front surface of the medulla carries two raised ridges called **pyramids**, made of nerve fibres running from the cerebrum to the spinal cord.\n" +
        "- The brain is protected by the skull, three membranes (meninges) and the cerebrospinal fluid.",
      table: {
        columns: ["Part of the brain", "Where it is", "What it controls"],
        rows: [
          { cells: ["Cerebrum", "The large, folded upper part", "Thinking, memory, intelligence, speech, voluntary actions"] },
          { cells: ["Cerebellum", "Below the back of the cerebrum", "Balance and smooth, coordinated movement"] },
          {
            cells: ["Medulla oblongata", "Lowest part of the brain stem, joining the spinal cord", "Heartbeat, breathing, swallowing, coughing, sneezing, saliva"],
            noteAmber: "Its front surface carries the pyramids.",
          },
        ],
        caption: "Will and thought: cerebrum. Balance: cerebellum. Automatic body work: medulla.",
      },
      selfCheckExample: {
        prompt: "After an injury at the back of the head, a man walks unsteadily and keeps losing his balance. Which part of his brain is most likely hurt?",
        steps: ["Balance and smooth movement are controlled by the cerebellum, which sits at the back below the cerebrum."],
        answer: "The cerebellum",
      },
      practiceSet: [
        { prompt: "Which part of the brain controls coughing and sneezing?", answer: "The medulla oblongata" },
        { prompt: "Which is the largest part of the human brain?", answer: "The cerebrum" },
        { prompt: "With which side of the brain do school books link logical and analytical thinking?", answer: "The left side" },
        { prompt: "Which part of the brain joins the spinal cord?", answer: "The medulla oblongata" },
      ],
      pyqExampleId: "cc17e2e4-b870-4fd5-a3ea-afa99846bdc3",
      traps: [
        {
          title: "Giving thinking to the cerebellum",
          body: "Thinking and memory belong to the cerebrum. The cerebellum looks after balance and smooth movement.",
        },
        {
          title: "Thinking we make saliva by will",
          body: "Producing saliva is an involuntary action, like swallowing and sneezing, so the medulla oblongata controls it.",
        },
        {
          title: "Placing the pyramids on the cerebrum",
          body: "The pyramids are two ridges on the front of the medulla oblongata, formed by fibres running down from the cerebrum.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9hbne-senses",
      name: "The ear and the tongue",
      intuition:
        "Sound enters the ear like a ball rolling down a tunnel. The pinna catches it, the ear canal leads it to the eardrum, which starts to vibrate. Three tiny bones pass the vibration on to the coiled cochlea, which turns it into nerve signals for the brain.",
      definition:
        "- **Outer ear**: the **pinna** and the **ear canal (auditory canal)**. The **eardrum (tympanic membrane)** sits at the inner end of the ear canal, **between the outer ear and the middle ear**.\n" +
        "- **Middle ear**: three tiny bones, the **hammer, anvil and stirrup**. The stirrup is the smallest bone in the body.\n" +
        "- **Inner ear**: the **cochlea** senses the **pitch and loudness** of sound and turns vibrations into nerve signals; the **semicircular canals** keep the body's balance.\n" +
        "- The **auditory nerve** carries the signals from the cochlea to the brain.\n" +
        "- The tongue carries **taste buds** for five tastes: **sweet, sour, salty, bitter** and **umami**. Every part of the tongue senses all of them; the old 'taste map' that gave each taste one zone (bitter at the back) is wrong.",
      table: {
        columns: ["Part of the ear", "Where it is", "Its job"],
        rows: [
          { cells: ["Pinna", "Outer ear, outside the head", "Collects sound"] },
          { cells: ["Ear canal", "Outer ear", "Leads sound to the eardrum"] },
          { cells: ["Eardrum", "End of the ear canal, between the outer and middle ear", "Vibrates when sound strikes it"] },
          { cells: ["Hammer, anvil, stirrup", "Middle ear", "Pass the vibrations on to the inner ear"] },
          { cells: ["Cochlea", "Inner ear", "Senses pitch and loudness, makes nerve signals"] },
          { cells: ["Semicircular canals", "Inner ear", "Balance of the body"] },
          { cells: ["Auditory nerve", "From the cochlea to the brain", "Carries the signals to the brain"] },
        ],
        caption: "Sound path: pinna, ear canal, eardrum, three bones, cochlea, auditory nerve, brain.",
      },
      selfCheckExample: {
        prompt: "Which part of the inner ear helps a cyclist keep her balance?",
        steps: ["The cochlea of the inner ear is for hearing; the semicircular canals beside it sense the body's position."],
        answer: "The semicircular canals",
      },
      practiceSet: [
        { prompt: "Which is the smallest bone in the human body, and where is it?", answer: "The stirrup, in the middle ear" },
        { prompt: "Which part of the ear senses pitch and turns vibrations into nerve signals?", answer: "The cochlea" },
        { prompt: "Name the five basic tastes.", answer: "Sweet, sour, salty, bitter and umami" },
        { prompt: "Which nerve carries signals from the ear to the brain?", answer: "The auditory nerve" },
      ],
      pyqExampleId: "296cff4c-5020-4cbc-bac5-e127ea20f5ce",
      traps: [
        {
          title: "Putting the eardrum inside the middle ear",
          body: "The eardrum is the wall at the end of the ear canal. It separates the outer ear from the middle ear; it is not inside the middle ear cavity.",
        },
        {
          title: "Letting the eardrum judge pitch",
          body: "The eardrum only vibrates. The cochlea in the inner ear senses pitch and loudness.",
        },
        {
          title: "Giving each taste one zone of the tongue",
          body: "Taste buds all over the tongue sense every taste. The old taste map, with bitter only at the back, is not correct.",
        },
      ],
    },
  ],
};
