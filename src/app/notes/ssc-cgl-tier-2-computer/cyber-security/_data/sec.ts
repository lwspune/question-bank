import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_CCS_SEC_NOTE: SubtopicNote = {
  subtopicName: "Malware and How to Stay Protected",
  title: "Malware and How to Stay Protected",
  oneLineDefinition:
    "The kinds of malicious software and what each one does, and the tools (firewalls, encryption, hashing, updates) that keep a computer and its data safe.",
  whyItMatters:
    "20 questions in the Tier II bank, all EASY. The Trojan alone was asked four times, so the difference between a Trojan and a virus is the single most useful fact here.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssc2ccssc-malware",
      name: "Kinds of malware",
      intuition:
        "Name a malware by what it does. A virus attaches to a program and copies itself when the program runs; a Trojan looks like useful software but does not copy itself; a keylogger records your typing; ransomware locks your files for money.",
      definition:
        "Key facts:\n" +
        "- **Virus:** attaches to software and reproduces when it runs.\n" +
        "- **Resident virus:** lives in memory, so it can return after the original is deleted.\n" +
        "- **Boot sector virus:** infects the boot sector or Master Boot Record.\n" +
        "- **Trojan:** disguised as legitimate software; steals or deletes files, opens a backdoor; does NOT self-replicate.\n" +
        "- **Signs of infection:** unusual slowness and unexpected errors.",
      table: {
        columns: ["Malware", "What it does", "Asked in"],
        rows: [
          { cells: ["Virus", "Attaches to software and copies itself when run", "2022"] },
          { cells: ["Resident virus", "Hides in memory and reactivates", "2022"] },
          { cells: ["Trojan", "Disguised as real software; opens a backdoor", "2022, 2023, 2025"] },
          { cells: ["Keylogger", "Records keystrokes to steal passwords", "2022"] },
          { cells: ["Ransomware (CryptoLocker)", "Locks files and demands payment", "2022"] },
          { cells: ["Adware", "Shows ads, earns per click", "2022"] },
          { cells: ["Boot sector virus", "Infects the boot sector or MBR", "2024"] },
        ],
      },
      pyqExampleId: "cc761a78-a655-4531-bca7-33aa3f468945",
      selfCheckExample: {
        prompt: "Which malware records every key you press to steal passwords? (a) Adware (b) Keylogger (c) Worm (d) Firewall",
        steps: ["Recording keystrokes is a keylogger's job."],
        answer: "(b) Keylogger",
      },
      practiceSet: [
        { prompt: "Does a Trojan copy itself to other files?", answer: "No: that is what a virus does" },
        { prompt: "Which malware shows unwanted advertisements?", answer: "Adware" },
        { prompt: "Which virus can come back after the original is deleted because it lives in memory?", answer: "Resident virus" },
      ],
      traps: [
        {
          title: "Saying a Trojan self-replicates",
          body: "A Trojan relies on the user running it; it does not copy itself. A statement that it self-replicates is the incorrect one.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2ccssc-protect",
      name: "Protection tools",
      intuition:
        "Each tool guards one thing: a firewall guards the network door, encryption keeps data unreadable on its way, hashing proves data has not changed, and updates close known holes.",
      definition:
        "Key facts:\n" +
        "- **Firewall:** filters and controls network traffic.\n" +
        "- **Encryption in transit** (SSL) makes data unreadable to anyone who intercepts it.\n" +
        "- **Hashing** checks that data has not been altered.\n" +
        "- **Symmetric encryption's weakness:** the shared key must be distributed safely.\n" +
        "- **Patch management** installs updates without the user's help.",
      table: {
        columns: ["Tool", "What it does", "Asked in"],
        rows: [
          { cells: ["Firewall", "Filters network traffic", "2023"] },
          { cells: ["Patch management software", "Installs updates automatically", "2024"] },
          { cells: ["Passwords on a PC", "An extra layer of security", "2024"] },
          { cells: ["SSL", "Protects data during transmission", "2024"] },
          { cells: ["Hashing", "Verifies data integrity", "2024"] },
          { cells: ["S/MIME", "Encrypts e-mail", "2025"] },
          { cells: ["Symmetric encryption", "Hard to share the key safely", "2025"] },
          { cells: ["Encryption in transit", "Data unreadable to attackers", "2025"] },
        ],
      },
      pyqExampleId: "cfbfd917-c182-4740-a7f3-c2cb88475e2a",
      selfCheckExample: {
        prompt: "What filters the traffic coming into and leaving a network? (a) Hashing (b) Firewall (c) Adware (d) Compression",
        steps: ["Filtering traffic is a firewall's job."],
        answer: "(b) Firewall",
      },
      practiceSet: [
        { prompt: "Which protocol protects data sent between a browser and a website?", answer: "SSL (now TLS)" },
        { prompt: "What is the main difficulty with symmetric encryption?", answer: "Sharing the key safely" },
        { prompt: "Which method secures the content of e-mails?", answer: "S/MIME" },
      ],
      traps: [
        {
          title: "Mixing encryption and hashing",
          body: "Encryption hides data so only the key holder can read it. Hashing does not hide anything; it produces a fingerprint that shows whether data changed.",
        },
      ],
    },
  ],
};
