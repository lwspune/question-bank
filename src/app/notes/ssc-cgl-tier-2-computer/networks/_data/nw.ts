import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_CNW_NW_NOTE: SubtopicNote = {
  subtopicName: "Network Devices, Layers and Media",
  title: "Network Devices, Layers and Media",
  oneLineDefinition:
    "What switches, gateways and other devices do in a network, which OSI layer handles what, and the basic terms: bandwidth, protocol and transmission media.",
  whyItMatters:
    "11 questions in the Tier II bank, 9 EASY and 2 MODERATE. The switch has been asked five times, so its job (forwarding data inside a LAN by MAC address) is the one fact to be sure of.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssc2cnwnw-device",
      name: "Network devices",
      intuition:
        "A switch connects computers within one network and sends each piece of data only to the computer it is meant for. A gateway connects two different networks that may use different rules, translating between them.",
      definition:
        "Key facts:\n" +
        "- **Switch:** connects devices in a LAN; filters traffic; forwards by MAC address (OSI layer 2).\n" +
        "- **Layer 3 switch:** a switch that can also route between networks.\n" +
        "- **Gateway:** joins networks using different models; also called a protocol converter.\n" +
        "- **Hub:** sends everything to every port (no filtering).\n" +
        "- **Router:** sends packets between networks by IP address.",
      table: {
        columns: ["Device", "Fact asked", "Asked in"],
        rows: [
          { cells: ["Switch", "Filters traffic between connected devices", "2022"] },
          { cells: ["Gateway", "Connects networks on different models", "2022"] },
          { cells: ["Gateway", "Also called a protocol converter", "2022"] },
          { cells: ["Switch", "Layer 2, forwards by MAC address", "2023"] },
          { cells: ["Switch", "Connects computers within a LAN", "2024"] },
          { cells: ["Layer 3 switch", "Forwards packets to the right device in a LAN", "2024"] },
        ],
      },
      pyqExampleId: "a93df1ff-d1ec-49b4-b842-2746204343e4",
      selfCheckExample: {
        prompt: "Which device sends incoming data to every connected port without filtering? (a) Switch (b) Hub (c) Gateway (d) Router",
        steps: ["A switch filters; a hub does not.", "The hub repeats data to every port."],
        answer: "(b) Hub",
      },
      practiceSet: [
        { prompt: "Which device connects computers inside a LAN and forwards by MAC address?", answer: "Switch" },
        { prompt: "Which device joins two networks that use different protocols?", answer: "Gateway" },
        { prompt: "Which device moves packets between networks by IP address?", answer: "Router" },
      ],
      traps: [
        {
          title: "Mixing up a hub and a switch",
          body: "Both connect computers in a LAN, but only the switch filters traffic and sends data to the one device it is meant for.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2cnwnw-basics",
      name: "Layers, protocols and media",
      intuition:
        "Networks follow rules (protocols) at several levels, organised in the OSI model's seven layers. Bandwidth is how much data a link can carry each second, and the cable or signal used is the medium.",
      definition:
        "Key facts:\n" +
        "- **Protocol:** a set of rules at a level of a connection.\n" +
        "- **Bandwidth:** data capacity in bits per second.\n" +
        "- **OSI network layer (layer 3):** routes packets between networks by logical (IP) address.\n" +
        "- **OSI data link layer (layer 2):** moves frames by MAC address.\n" +
        "- **WAN media:** fibre optic cable is the common choice.",
      table: {
        columns: ["Term", "Fact asked", "Asked in"],
        rows: [
          { cells: ["Bandwidth", "Capacity in bits per second", "2022"] },
          { cells: ["Protocol", "Rules at several levels of a connection", "2022"] },
          { cells: ["Fibre optic cable", "Common medium for WANs", "2024"] },
          { cells: ["Network layer", "Routes packets by logical address", "2025"] },
        ],
      },
      pyqExampleId: "3030f2d6-2c70-40c5-b927-66f75829a38c",
      selfCheckExample: {
        prompt: "Which OSI layer moves frames using MAC addresses? (a) Physical (b) Data link (c) Network (d) Transport",
        steps: ["MAC addresses belong to layer 2, the data link layer."],
        answer: "(b) Data link",
      },
      practiceSet: [
        { prompt: "What is bandwidth measured in?", answer: "Bits per second" },
        { prompt: "How many layers does the OSI model have?", answer: "Seven" },
        { prompt: "Which medium carries most long-distance WAN traffic?", answer: "Fibre optic cable" },
      ],
      traps: [
        {
          title: "Confusing the network and data link layers",
          body: "The network layer (3) uses IP addresses to route between networks; the data link layer (2) uses MAC addresses inside one network.",
        },
      ],
    },
  ],
};
