import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_IC_HARDWARE_NOTE: SubtopicNote = {
  subtopicName: "Computer Generations and Memory",
  title: "Computer Generations and Memory",
  oneLineDefinition:
    "Computers grew smaller and used less electricity as valves gave way to transistors, integrated circuits and microprocessors; inside, RAM is the working memory that forgets when the power goes off, while storage devices keep data.",
  whyItMatters:
    "Five questions in the bank, two EASY, two MODERATE and one HARD. Two are on the generations of computers (which part the third generation used, and matching valves, transistors and ICs with size and electricity use), one asks how small the parts of a microchip are, and two are on memory: what RAM stands for, and RAM as the odd one out among storage devices.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9ichw-generations",
      name: "Generations of computers",
      intuition:
        "The first computers filled whole rooms, because each switch inside was a glass valve as big as a bulb, and thousands of them got hot and used a lot of electricity. Each new generation found a smaller switch: first the transistor, then many transistors made together on one chip, then a whole processor on one chip. So computers kept getting smaller, cheaper and less hungry for power.",
      definition:
        "- **First generation**: **vacuum tubes (valves)**. Very large, used a lot of electricity and gave out much heat.\n" +
        "- **Second generation**: **transistors**. Medium in size, used less electricity.\n" +
        "- **Third generation (1964 to 1971)**: **integrated circuits (ICs)**, many transistors and other parts made together on one small chip of silicon. Small, used little electricity.\n" +
        "- **Fourth generation (from 1971)**: **microprocessors**, the whole processing unit on one chip. Personal computers belong here.\n" +
        "- **Fifth generation**: computers built around **artificial intelligence**.\n" +
        "- The parts on a microchip are **less than a micrometre** wide (a micrometre, µm, is a thousandth of a millimetre).",
      table: {
        columns: ["Generation", "Main component", "Size", "Electricity used"],
        rows: [
          { cells: ["First", "Vacuum tubes (valves)", "Very large", "Large"] },
          { cells: ["Second", "Transistors", "Medium", "Medium"] },
          { cells: ["Third (1964 to 1971)", "Integrated circuits", "Small", "Very small"] },
          { cells: ["Fourth (from 1971)", "Microprocessors", "Smaller still: desktops and laptops", "Very small"] },
        ],
        caption: "Each generation is smaller and uses less electricity than the one before.",
      },
      selfCheckExample: {
        prompt: "A computer is built from thousands of separate transistors, without any chips. To which generation does it belong?",
        steps: ["Valves mark the first generation.", "Separate transistors mark the second; ICs come only in the third."],
        answer: "The second generation",
      },
      practiceSet: [
        { prompt: "Which electronic component did first-generation computers use?", answer: "Vacuum tubes (valves)" },
        { prompt: "In which generation of computers did the microprocessor first appear?", answer: "The fourth generation" },
        { prompt: "Why did first-generation computers need large, cooled rooms?", answer: "Their many valves were large, used a lot of electricity and gave out much heat" },
        { prompt: "What is an integrated circuit?", answer: "Many transistors and other parts made together on one small chip of silicon" },
      ],
      pyqExampleId: "c9bdf118-8798-410f-a9c3-f7ab21213eec",
      traps: [
        {
          title: "Giving the third generation microprocessors",
          body: "The third generation (1964 to 1971) used integrated circuits. Microprocessors came with the fourth generation.",
        },
        {
          title: "Thinking transistor computers were the largest",
          body: "Valve computers of the first generation were the largest and used the most electricity. Transistor computers were medium in size.",
        },
        {
          title: "Thinking newer computers use more electricity",
          body: "Every new generation has been smaller and has used less electricity, even while doing more work.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9ichw-memory",
      name: "Memory and storage devices",
      intuition:
        "RAM is like the top of your study table: you spread out what you are working on now, and it is cleared when you leave. Storage devices are like your cupboard: things stay there until you take them out. That is why unsaved work is lost when the power fails, but a file saved on a pen drive is still there tomorrow.",
      definition:
        "- **RAM (Random Access Memory)** is the **primary (main) memory**, the working memory of the computer. It is **volatile**: it loses its data when the power is switched off.\n" +
        "- **ROM (Read Only Memory)** is also primary memory, but keeps its data without power. It holds the instructions that start the computer.\n" +
        "- **Secondary storage** keeps data without power: **hard disk**, **CD**, **DVD**, **pen drive** and memory card.\n" +
        "- Memory is counted in **bits** and **bytes**: a bit is a 0 or a 1, and **1 byte = 8 bits**. 1 KB = 1024 bytes, then MB, GB and TB.",
      table: {
        columns: ["Device", "Kind of memory", "Keeps data when the power is off?"],
        rows: [
          { cells: ["RAM", "Primary (main, working) memory", "No"] },
          { cells: ["ROM", "Primary memory", "Yes"] },
          { cells: ["Hard disk", "Secondary storage", "Yes"] },
          { cells: ["CD and DVD", "Secondary storage (read by a laser)", "Yes"] },
          { cells: ["Pen drive and memory card", "Secondary storage (flash memory)", "Yes"] },
        ],
        caption: "In a list of storage devices, RAM is usually the odd one out.",
      },
      selfCheckExample: {
        prompt: "Which of these loses everything it holds when the computer is switched off: a hard disk, RAM or a DVD?",
        steps: ["A hard disk and a DVD are secondary storage and keep data without power.", "RAM is volatile working memory."],
        answer: "RAM",
      },
      practiceSet: [
        { prompt: "What does ROM stand for?", answer: "Read Only Memory" },
        { prompt: "How many bits make one byte?", answer: "8 bits" },
        { prompt: "Is a pen drive primary memory or secondary storage?", answer: "Secondary storage" },
        { prompt: "Why is unsaved work lost when the power fails?", answer: "It is held only in RAM, which loses its data when the power goes off" },
      ],
      pyqExampleId: "8f330729-4ded-4c04-adbd-e3039e224777",
      traps: [
        {
          title: "Thinking RAM keeps data after switching off",
          body: "RAM is volatile: it is cleared when the power goes off. ROM and storage devices such as a hard disk or pen drive keep their data.",
        },
        {
          title: "Reading RAM as Read Access Memory",
          body: "RAM is Random Access Memory. The word Read belongs to ROM, Read Only Memory.",
        },
        {
          title: "Calling a CD or pen drive main memory",
          body: "CDs, DVDs and pen drives are secondary storage. The main (primary) memory is RAM.",
        },
      ],
    },
  ],
};
