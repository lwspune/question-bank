import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_CHW_HW_NOTE: SubtopicNote = {
  subtopicName: "CPU, Memory, Ports and Devices",
  title: "CPU, Memory, Ports and Devices",
  oneLineDefinition:
    "What the CPU's parts and registers do, how the kinds of memory and storage differ, and which ports and devices do what.",
  whyItMatters:
    "44 questions in the Tier II bank, 30 EASY, 11 MODERATE and 3 HARD. 21 of them are on memory, and several ask which statement is incorrect, so knowing each memory's speed and whether it keeps data without power answers many at once.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssc2chwhw-cpu",
      name: "The CPU and its registers",
      intuition:
        "The CPU has a control unit (directs the work), an arithmetic logic unit (does the calculating) and registers (tiny, very fast stores inside it). Each register has one job in the cycle of fetching, decoding and running an instruction.",
      definition:
        "Key facts:\n" +
        "- **CU** controls and times the steps; **ALU** does arithmetic and logic.\n" +
        "- **Registers** hold data for the instruction being worked on.\n" +
        "- **Buses** are groups of wires carrying bits in parallel between parts.\n" +
        "- **Microprogrammed control** is easier to change than a hardwired one.",
      table: {
        columns: ["Part", "What it does", "Asked in"],
        rows: [
          { cells: ["Memory Address Register (MAR)", "Holds the address of the memory location in use", "2022, 2023"] },
          { cells: ["Instruction Register (IR)", "Holds the instruction being decoded and run", "2022, 2025"] },
          { cells: ["Instruction Buffer Register (IBR)", "Holds an instruction not to be run at once", "2022"] },
          { cells: ["Registers", "High-speed stores used during processing", "2022"] },
          { cells: ["Bus", "A path of parallel wires between devices", "2022"] },
          { cells: ["Single-core CPU", "The oldest type of CPU", "2022"] },
          { cells: ["Control unit", "Controls the timing and execution of instructions", "2024"] },
          { cells: ["Microprogrammed control unit", "Instruction set is easy to update", "2025"] },
        ],
      },
      pyqExampleId: "fc929608-133b-40b2-93e2-edb7041dec39",
      selfCheckExample: {
        prompt: "Which part of the CPU performs addition and comparison? (a) Control unit (b) ALU (c) MAR (d) Bus",
        steps: ["Arithmetic (addition) and logic (comparison) are the ALU's work."],
        answer: "(b) ALU",
      },
      practiceSet: [
        { prompt: "Which register holds the instruction currently being decoded?", answer: "Instruction Register (IR)" },
        { prompt: "Which part of the CPU directs and times the other parts?", answer: "Control unit" },
        { prompt: "Is cache memory one of the CPU's three main units?", answer: "No: the three are CU, ALU and registers (memory unit)" },
      ],
      traps: [
        {
          title: "Mixing up MAR and IR",
          body: "The MAR holds an ADDRESS (where in memory); the IR holds an INSTRUCTION (what to do). Read which one the question asks for.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2chwhw-memory",
      name: "Memory and storage",
      intuition:
        "Memory is a ladder: registers and cache are fastest and smallest, then main memory (RAM), then storage (disks, drives). RAM forgets when power goes off; ROM and storage keep their data.",
      definition:
        "Key facts:\n" +
        "- **Cache** sits between the CPU and RAM, holding frequently used data; it is FASTER than main memory.\n" +
        "- **RAM** is volatile (loses data without power); **ROM** keeps firmware such as the BIOS.\n" +
        "- **DRAM** must be refreshed because its capacitors leak charge.\n" +
        "- **EEPROM** can be erased electrically and rewritten many times.\n" +
        "- **Secondary memory** (disks) is non-volatile.\n" +
        "- **Address lines:** 2 to the power n locations need n lines (4K = 4,096 = 2 to the 12, so 12 lines).",
      table: {
        columns: ["Device or term", "Fact asked", "Asked in"],
        rows: [
          { cells: ["Cache memory", "Speeds processing; faster than main memory", "2022, 2023"] },
          { cells: ["Main memory", "Communicates directly with the CPU", "2022"] },
          { cells: ["Solid-state drive", "Also called an electronic disk", "2022"] },
          { cells: ["Pen drive", "Also called a flash drive", "2022"] },
          { cells: ["DVD, memory card", "Not magnetic storage", "2022"] },
          { cells: ["Network Attached Storage (NAS)", "Shared disk storage over Ethernet", "2022"] },
          { cells: ["ROM", "Stores the BIOS or firmware", "2024"] },
          { cells: ["EEPROM", "ROM erased and rewritten electrically", "2024"] },
          { cells: ["DRAM refresh", "Recharges the capacitors holding bits", "2024"] },
          { cells: ["Tape drive", "Full backups, slow to restore", "2023"] },
          { cells: ["Copy-on-write snapshot", "Stores pointers until blocks change", "2025"] },
        ],
      },
      pyqExampleId: "9095e188-faf0-4178-96c8-a20711dea91d",
      selfCheckExample: {
        prompt: "Which memory loses its contents when the power is switched off? (a) ROM (b) Hard disk (c) RAM (d) Pen drive",
        steps: ["Only RAM is volatile among these."],
        answer: "(c) RAM",
      },
      practiceSet: [
        { prompt: "Where does cache memory sit?", answer: "Between the CPU and main memory" },
        { prompt: "Is secondary memory volatile?", answer: "No: it keeps data without power" },
        { prompt: "How many address lines does a memory of 1,024 bytes need?", answer: "10 (2 to the 10 = 1,024)" },
      ],
      traps: [
        {
          title: "Calling cache slower than RAM",
          body: "Cache is faster than main memory; that is its whole purpose. A statement saying it is slower is the incorrect one.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2chwhw-io",
      name: "Ports and input and output devices",
      intuition:
        "A port is where a device plugs in, and many have second names SSC likes to ask. A serial port sends bits one after another; a parallel port sends several at once.",
      definition:
        "Key facts:\n" +
        "- **Serial port:** one bit at a time; slow data over long distances.\n" +
        "- **Parallel port:** several bits at once; also called the line printer port.\n" +
        "- **VGA connector:** 15 holes, monitor to video card.\n" +
        "- **Input devices** send data in (touchscreen, keyboard); **output devices** show it (monitor, printer).",
      table: {
        columns: ["Port or device", "Fact asked", "Asked in"],
        rows: [
          { cells: ["Parallel port", "Line printer port", "2022"] },
          { cells: ["PS/2 port", "Mouse port", "2022"] },
          { cells: ["Serial port", "One bit at a time, long distances", "2022"] },
          { cells: ["VGA connector", "15 holes", "2022"] },
          { cells: ["Monitor", "Visual Display Unit (VDU)", "2022"] },
          { cells: ["OCR", "Reads printed text character by character", "2022"] },
          { cells: ["Touchscreen", "An input device", "2023"] },
          { cells: ["Hardware handshaking (RTS/CTS)", "Prevents buffer overflow and data loss", "2025"] },
          { cells: ["DisplayPort", "Daisy chaining of monitors (MST)", "2025"] },
        ],
      },
      pyqExampleId: "140a06ff-c753-4745-b57a-00f76154cac8",
      selfCheckExample: {
        prompt: "Which port is also called the line printer port? (a) Serial (b) USB (c) Parallel (d) HDMI",
        steps: ["Printers were connected through the parallel port, hence its second name."],
        answer: "(c) Parallel",
      },
      practiceSet: [
        { prompt: "Which device is also known as the VDU?", answer: "Monitor" },
        { prompt: "How many holes does a VGA connector have?", answer: "15" },
        { prompt: "Which reads printed text by scanning it character by character?", answer: "Optical Character Reader (OCR)" },
      ],
      traps: [
        {
          title: "Swapping serial and parallel",
          body: "Serial sends one bit after another (slow, long distance); parallel sends several bits side by side (printer port).",
        },
      ],
    },
  ],
};
