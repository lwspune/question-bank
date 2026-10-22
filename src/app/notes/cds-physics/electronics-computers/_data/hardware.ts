import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_EL_HARDWARE_NOTE: SubtopicNote = {
  subtopicName: "Electronics, Hardware and Data",
  title: "Electronics, Hardware and Data",
  oneLineDefinition:
    "Semiconductors and the transistor, the five computer generations with quantum computing and AI, memory types and file sizes, and binary numbers with logic operators.",
  whyItMatters:
    "Nine CDS questions from 2016 (II) to 2026 (I), five of them EASY, and seven of the nine from 2025 and 2026. One asks about the transistor; the rest ask about computer generations, qubits and AI, memory and file sizes, and binary logic.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsphel-transistor",
      name: "Semiconductors, diodes and transistors",
      intuition:
        "A semiconductor such as silicon conducts better than an insulator but far worse than a metal. Adding a tiny amount of another element (doping) makes it conduct much better. Join a p-type piece to an n-type piece and you get a diode, which lets current pass one way only. Make a thin slice of one type between two pieces of the other and you get a transistor, which can amplify a weak signal or work as a switch.",
      definition:
        "What to know:\n" +
        "- **Semiconductors**: silicon and germanium. Unlike a metal, a semiconductor conducts **better when heated**.\n" +
        "- **n-type**: doped with a five-valence-electron element (phosphorus, arsenic); extra **electrons** carry the current.\n" +
        "- **p-type**: doped with a three-valence-electron element (boron, aluminium, gallium); **holes** carry the current.\n" +
        "- **p-n junction diode**: current flows one way only, so it **rectifies** AC into DC. An **LED** is a diode that gives out light.\n" +
        "- **Bipolar junction transistor** (n-p-n or p-n-p): three regions, the emitter, the base and the collector. Used as an **amplifier** and a **switch**.",
      table: {
        columns: ["Region of a transistor", "Doping", "Size"],
        rows: [
          { cells: ["Emitter", "Heavy (the most impurity): it supplies the charge carriers", "Medium"] },
          {
            cells: ["Base", "Light (the least impurity)", "Very thin, so carriers cross it without being lost"],
            noteAmber: "CDS 2016 (II): in a bipolar junction transistor the base has the least impurity.",
            pyqExampleId: "71997291-97ec-46b5-93e5-5e0d8ccc9b51",
          },
          { cells: ["Collector", "Moderate", "The largest, so it can get rid of heat"] },
        ],
      },
      pyqExampleId: "71997291-97ec-46b5-93e5-5e0d8ccc9b51",
      selfCheckExample: {
        prompt: "Pure silicon is doped with a little boron. Is the result p-type or n-type, and what carries most of the current?",
        steps: [
          "Boron has three valence electrons, one fewer than silicon.",
          "Each boron atom leaves a missing electron, a hole, in the crystal.",
        ],
        answer: "p-type; holes carry most of the current.",
      },
      practiceSet: [
        { prompt: "Which impurity makes n-type silicon: boron or phosphorus?", answer: "Phosphorus (it has five valence electrons)" },
        { prompt: "What does a p-n junction diode do to an alternating current?", answer: "It lets current through in one direction only, so it changes AC into DC" },
        { prompt: "How does the conductivity of a pure semiconductor change when it is heated?", answer: "It increases, the opposite of a metal" },
        { prompt: "Name two uses of a transistor.", answer: "As an amplifier and as a switch" },
      ],
      traps: [
        {
          title: "The base is thin and lightly doped",
          body: "In a transistor the **emitter** is the most heavily doped, the **collector** is the largest, and the **base** is the **thinnest** and the **least doped**.",
        },
        {
          title: "A hot semiconductor conducts better",
          body: "Heating a **metal** raises its resistance. Heating a **semiconductor** frees more charge carriers, so its resistance **falls**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphel-generations",
      name: "Computer generations and new kinds of computing",
      intuition:
        "Computers are grouped into generations by the main part they were built from. Each new part made them smaller, faster and cheaper: vacuum tubes, then transistors, then integrated circuits, then the microprocessor, a whole processor on one chip. Two newer ideas now appear in the paper: quantum computers, which work with qubits, and artificial intelligence, machines that make decisions the way people do.",
      definition:
        "What to know:\n" +
        "- The first microprocessor, the **Intel 4004**, came in **1971**; it began the fourth generation.\n" +
        "- A **qubit** is the unit of information in a **quantum computer**. A bit is either 0 or 1; a qubit can be in a mix (superposition) of 0 and 1 at the same time.\n" +
        "- **Artificial intelligence (AI)**: a machine doing tasks that need human intelligence, above all **reasoning and making decisions**. Voice assistants, face unlock and chatbots are examples.\n" +
        "- Merely **storing** data is not intelligence: that is what a database does.",
      table: {
        columns: ["Generation", "Main hardware", "Roughly when"],
        rows: [
          { cells: ["First", "Vacuum tubes", "1940s to mid 1950s"] },
          { cells: ["Second", "Transistors", "Late 1950s to mid 1960s"] },
          { cells: ["Third", "Integrated circuits (ICs)", "Mid 1960s to early 1970s"] },
          {
            cells: ["Fourth", "Microprocessors (very large scale integration)", "From 1971"],
            noteAmber: "CDS 2026 (I): the fourth generation used microprocessors.",
            pyqExampleId: "127da852-a3c2-429d-9b99-8eded22c4d56",
          },
          { cells: ["Fifth", "Artificial intelligence and parallel processing", "Still developing"] },
        ],
      },
      pyqExampleId: "127da852-a3c2-429d-9b99-8eded22c4d56",
      selfCheckExample: {
        prompt: "In what way can a qubit hold more than an ordinary bit?",
        steps: [
          "An ordinary bit is always either 0 or 1.",
          "A qubit can be in a superposition, a mix of 0 and 1 at the same time, until it is measured.",
        ],
        answer: "A bit is 0 or 1; a qubit can be a mix of both at once.",
      },
      practiceSet: [
        { prompt: "Which kind of computer works with qubits?", answer: "A quantum computer" },
        { prompt: "Which company made the first microprocessor, and in which year?", answer: "Intel (the 4004), in 1971" },
        { prompt: "Give one everyday example of artificial intelligence.", answer: "A voice assistant, face unlock on a phone, or a chatbot" },
        { prompt: "Is a program that only stores students' marks an example of artificial intelligence?", answer: "No. Storing data is what a database does; AI makes decisions" },
      ],
      traps: [
        {
          title: "Integrated circuits are the third generation, microprocessors the fourth",
          body: "The order is **vacuum tubes**, **transistors**, **integrated circuits**, then **microprocessors**. Do not move the microprocessor back to the third generation.",
        },
        {
          title: "A qubit belongs to quantum computers",
          body: "The **qubit** is the two-valued unit of a **quantum computer**, not of an ordinary (classical) computer or of a laser.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphel-memory",
      name: "Memory, storage and file sizes",
      intuition:
        "Some memory forgets everything when the power goes off, and some keeps it. The kinds that keep data differ in how they are wiped and rewritten. File sizes come from a simple rule: a sound or video file stores a fixed number of bits every second, so the size is that rate times the playing time, divided by 8 to turn bits into bytes. Compression formats such as MP3 store far fewer bits per second than raw sound.",
      definition:
        "What to know:\n" +
        "- **RAM** is **volatile**: it loses its data without power. **ROM** is **non-volatile**.\n" +
        "- **PROM** is written once. **EPROM** is erased by **ultraviolet light**. **EEPROM** is erased **electrically**.\n" +
        "- **Flash memory** is a kind of EEPROM: electrically erasable and non-volatile (pen drives, memory cards, phone storage, SSDs).\n" +
        "- **8 bits = 1 byte**. Computer memory counts 1 KB = 1024 bytes, 1 MB = 1024 KB, 1 GB = 1024 MB; makers of drives often use 1000 instead.\n" +
        "- Bit rates are in kilobits per second (kbps). **MP3 at 128 kbps is about 1 MB a minute**; uncompressed CD sound (1411 kbps) is about 10 MB a minute.\n" +
        "- **Multimedia** mixes text, graphics, audio, video and images that the user can interact with. JPEG and PNG are image formats, MP3 is audio, MP4 is video.",
      formula: {
        label: "Size of a sound or video file",
        latex: "\\text{size in bytes} = \\dfrac{\\text{bit rate (bits per second)} \\times \\text{time (seconds)}}{8}",
        symbols: [
          { symbol: "bit rate", meaning: "bits stored for each second of playing time" },
          { symbol: "8", meaning: "bits in one byte" },
        ],
      },
      authoredExample: {
        prompt:
          "A 4-minute song is stored as MP3 at 192 kbps. About how many megabytes does it need? How much would the same song need as uncompressed CD sound at 1411 kbps? (Take 1 MB = 1,000,000 bytes.)",
        steps: [
          "Time: 4 minutes = 240 s.",
          "MP3: \\(\\dfrac{192000 \\times 240}{8} = 5{,}760{,}000\\) bytes, about 5.8 MB.",
          "CD sound: \\(\\dfrac{1411000 \\times 240}{8} = 42{,}330{,}000\\) bytes, about 42 MB.",
          "The MP3 file is about 7 times smaller.",
        ],
        answer: "About 5.8 MB as MP3, against about 42 MB uncompressed.",
      },
      selfCheckExample: {
        prompt: "How many bits are there in 2 KB, taking 1 KB = 1024 bytes?",
        steps: ["\\(2 \\times 1024 = 2048\\) bytes.", "\\(2048 \\times 8 = 16384\\) bits."],
        answer: "16384 bits",
      },
      pyqExampleId: "d72c87ef-a1fa-4370-928b-87632e7c3a35",
      practiceSet: [
        { prompt: "Which memory loses its contents when the power is switched off: RAM or ROM?", answer: "RAM" },
        { prompt: "A voice recording uses 64 kbps. How many kilobytes does 10 seconds of it need? (Take 1 kB = 1000 bytes.)", answer: "80 kB", method: "\\(64000 \\times 10 \\div 8 = 80000\\) bytes" },
        { prompt: "Name one image file format and one audio file format.", answer: "JPEG or PNG for images; MP3 for audio" },
        { prompt: "Is the storage in a pen drive volatile or non-volatile?", answer: "Non-volatile: it is flash memory" },
      ],
      traps: [
        {
          title: "Flash is erased electrically, not by ultraviolet light",
          body: "**EPROM** is wiped by **ultraviolet light** through a window in the chip. **Flash** memory is a kind of **EEPROM**: it is wiped **electrically** and keeps its data without power.",
        },
        {
          title: "Bits are not bytes",
          body: "A bit rate in **kbps** counts **bits**. Divide by **8** to get bytes before you compare with a size in MB.",
        },
        {
          title: "Two sizes of megabyte",
          body: "Memory counts **1 MB = 1024 × 1024 bytes**; drive makers and bit-rate sums often use **1,000,000 bytes**. The answers differ by about 5%, so pick the option nearest to yours.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphel-binary",
      name: "Binary numbers and logic operators",
      intuition:
        "A computer stores everything as 0s and 1s. Each place in a binary number is worth twice the place to its right: 1, 2, 4, 8 and so on. Logic operators work on true (1) and false (0): AND needs both inputs true, OR needs at least one, and NOT flips the input. Arithmetic signs such as plus and division work on numbers, not on true and false. To subtract, a computer adds the 2's complement of the number instead.",
      definition:
        "The rules:\n" +
        "- Binary place values from the right: 1, 2, 4, 8, 16, ... So \\(1011_2 = 8 + 0 + 2 + 1 = 11\\).\n" +
        "- **AND**: 1 only if both inputs are 1. **OR**: 1 if at least one input is 1. **NOT**: turns 1 into 0 and 0 into 1. NAND, NOR and XOR are also logic operators.\n" +
        "- **Arithmetic operators** (+, −, ×, ÷) are not logic operators.\n" +
        "- **2's complement** of a number: flip every bit, then add 1.\n" +
        "- To find \\(A - B\\): add \\(A\\) and the 2's complement of \\(B\\). On an \\(n\\)-bit machine only \\(n\\) bits are kept, so the carry out of the left end falls away.",
      formula: {
        label: "Subtraction by 2's complement",
        latex: "A - B = A + (\\overline{B} + 1) \\quad \\text{(keep only } n \\text{ bits)}",
        symbols: [
          { symbol: "\\(\\overline{B}\\)", meaning: "B with every bit flipped (1's complement)" },
          { symbol: "n", meaning: "number of bits the machine holds" },
        ],
      },
      authoredExample: {
        prompt: "On a 4-bit machine, work out 6 − 2 using the 2's complement.",
        steps: [
          "6 = 0110 and 2 = 0010.",
          "2's complement of 0010: flip to 1101, add 1 to get 1110.",
          "Add: \\(0110 + 1110 = 10100\\).",
          "Only 4 bits are kept, so the carry falls away: 0100, which is 4.",
        ],
        answer: "0100, that is 4.",
      },
      selfCheckExample: {
        prompt: "Write 13 in binary.",
        steps: ["13 = 8 + 4 + 1.", "Places 8, 4, 2, 1 hold 1, 1, 0, 1."],
        answer: "1101",
      },
      pyqExampleId: "e29ac8c8-5129-4a3b-a9e9-a527f3ba4a4c",
      practiceSet: [
        { prompt: "What is 1 AND 0?", answer: "0" },
        { prompt: "What is 1 OR 0?", answer: "1" },
        { prompt: "Convert binary 1010 to decimal.", answer: "10" },
        { prompt: "In 4 bits, what is the 2's complement of 0101?", answer: "1011", method: "Flip to 1010, then add 1" },
      ],
      traps: [
        {
          title: "AND needs both, OR needs one",
          body: "**AND** gives 1 only when **both** inputs are 1. **OR** gives 1 when **at least one** is 1. Mixing them up reverses a truth table.",
        },
        {
          title: "Flip, then add 1",
          body: "The **2's complement** is the flipped number **plus 1**. Flipping alone gives the 1's complement, which is one less.",
        },
      ],
    },
  ],
};
