import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_EL_SOFTWARE_NOTE: SubtopicNote = {
  subtopicName: "Software and Networks",
  title: "Software and Networks",
  oneLineDefinition:
    "System and application software and the jobs of an operating system, machine, assembly, high-level and markup languages, the layers and ports of the internet, and firewalls and malware.",
  whyItMatters:
    "Fourteen CDS questions, all from 2025 (I) to 2026 (II): six from 2025 and eight from 2026. Five are about software and the operating system, three about programming and markup languages, three about networks and three about firewalls and malware.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsphel-software",
      name: "System software, application software and the operating system",
      intuition:
        "Software comes in two kinds. System software runs the computer itself: the operating system, and the tools that turn a program into something the machine can run. Application software does a job for the user, such as a spreadsheet or a drawing program. The operating system is the manager: it shares out memory, moves data to and from devices, keeps the files and gives the user a screen to work with.",
      definition:
        "What to know:\n" +
        "- **System software**: the operating system, compilers, interpreters, assemblers, **linkers**, loaders and device drivers.\n" +
        "- **Application software**: word processors, spreadsheets, presentation programs (MS PowerPoint), AutoCAD, web browsers, games.\n" +
        "- **Jobs of the operating system**: allocating memory, managing devices and data transfer to and from them, managing files, running programs in turn, giving a user interface.\n" +
        "- A **linker** joins a program's compiled code with the library routines (subroutines) it calls, making a file that can run. That is the linker's job, not the operating system's.\n" +
        "- **UNIX** (Bell Labs, 1970s): written mostly in **C**, so it can be moved to many kinds of computer; **multi-user** and **time-sharing**.\n" +
        "- **MS-DOS** (and Windows up to the late 1990s) read **CONFIG.SYS** at start-up to load drivers and settings, then ran **AUTOEXEC.BAT**, a list of commands. **COMMAND.COM** is the program that reads and runs typed commands.",
      table: {
        columns: ["Software", "Kind", "What it does"],
        rows: [
          { cells: ["Windows, Linux, UNIX", "System (operating system)", "Manages memory, files, devices and the user interface"] },
          {
            cells: ["Linker", "System", "Joins compiled code with the subroutines it calls"],
            noteAmber: "CDS 2026 (II): linking a program with its subroutines is not a job of the operating system.",
            pyqExampleId: "a5a42c72-90d0-4090-84da-e98df915449d",
          },
          { cells: ["Compiler, interpreter, assembler", "System", "Turn a program into machine code"] },
          { cells: ["Spreadsheet, MS PowerPoint, AutoCAD", "Application", "Do a task for the user"] },
          {
            cells: ["UNIX", "System (operating system)", "Written in C; portable, multi-user and time-shared"],
            noteAmber: "CDS 2026 (I): UNIX can be time-shared by several users.",
            pyqExampleId: "274d93c7-2ccc-4f55-9ecb-84407e362225",
          },
          {
            cells: ["AUTOEXEC.BAT", "Start-up file (MS-DOS)", "A list of commands run automatically when the computer starts"],
            noteAmber: "CDS 2026 (II): AUTOEXEC.BAT holds the commands run at start-up.",
            pyqExampleId: "88ee68a3-035f-4298-b45f-3b7cc3b95d46",
          },
        ],
      },
      pyqExampleId: "0394fc82-f598-4600-994b-8af954d82f3c",
      selfCheckExample: {
        prompt:
          "A student fills in a form in a web browser while a music player runs, and the computer shares its memory between the two. Which of these is application software, and which part does the sharing of memory?",
        steps: [
          "The browser and the music player each do a job for the user, so both are application software.",
          "Sharing out memory between running programs is a job of the operating system.",
        ],
        answer: "The browser and music player are application software; the operating system shares the memory.",
      },
      practiceSet: [
        { prompt: "What does COMMAND.COM do in MS-DOS?", answer: "It reads and runs the commands the user types" },
        { prompt: "Name three jobs of an operating system.", answer: "Allocating memory, managing devices and files, and giving a user interface" },
        { prompt: "Which MS-DOS file loads device drivers and settings at start-up?", answer: "CONFIG.SYS" },
        { prompt: "In which programming language was most of UNIX written?", answer: "C" },
      ],
      traps: [
        {
          title: "Linking is the linker's job",
          body: "A **linker** is system software, but it is a separate program. Joining a program with its subroutines is **not** one of the operating system's own jobs, and the linker is **not** application software either.",
        },
        {
          title: "AUTOEXEC.BAT runs commands; CONFIG.SYS loads drivers",
          body: "At start-up MS-DOS reads **CONFIG.SYS** for drivers and settings, then runs the **commands** listed in **AUTOEXEC.BAT**. COMMAND.COM is the interpreter, not a list of commands.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphel-languages",
      name: "Machine, assembly, high-level and markup languages",
      intuition:
        "A processor understands only its own codes of 0s and 1s, its machine language. Assembly language writes each of those codes as a short word such as ADD or MOV, so it is still tied to one family of processors. High-level languages read almost like English and run on any computer that has a translator for them. Markup languages are different again: they do not give orders, they label the parts of a document.",
      definition:
        "What to know:\n" +
        "- **Machine language**: binary codes the processor runs directly.\n" +
        "- **Assembly language**: a symbol (mnemonic) for each machine code, so it belongs to **one processor family** (x86, MIPS, ARM). An **assembler** turns it into machine code.\n" +
        "- **High-level languages** (Python, Java, C): independent of the processor. A **compiler** translates the whole program first; an **interpreter** translates and runs it a line at a time.\n" +
        "- **Markup languages** describe a document's structure with tags. **SGML** (an ISO standard of 1986) is an open standard that does not depend on the hardware or the operating system and defines document types; **HTML** and **XML** grew out of it.",
      table: {
        columns: ["Level", "What it looks like", "Examples"],
        rows: [
          { cells: ["Machine language", "0s and 1s run directly by the processor", "The processor's own instruction codes"] },
          {
            cells: ["Assembly language", "Short words (mnemonics), one for each machine code", "x86 assembly, MIPS assembly"],
            noteAmber: "CDS 2026 (I): of Python, Java, x86 and MIPS, the assembly languages are x86 and MIPS.",
            pyqExampleId: "9a5f5165-6a1c-441d-8e20-cfb2c71580c9",
          },
          { cells: ["High-level language", "Close to English; runs on many processors", "Python, Java, C"] },
          {
            cells: ["Markup language", "Tags that label the parts of a document", "SGML, HTML, XML"],
            noteAmber: "CDS 2026 (II): SGML is an open standard that does not depend on a computer's hardware.",
            pyqExampleId: "4933336d-b4e0-4f7e-bfe1-35f35b32ef6e",
          },
        ],
      },
      pyqExampleId: "29c17758-97d9-47d8-bfc2-0339bb3ad73f",
      selfCheckExample: {
        prompt:
          "A program written in x86 assembly is copied to a computer whose processor is of a different family. Will it run? Would the same program written in Python run there?",
        steps: [
          "Assembly language is a symbol for each code of one processor family, so a different processor does not understand it.",
          "Python is a high-level language; any computer with a Python interpreter can run it.",
        ],
        answer: "The assembly program will not run; the Python program will, given an interpreter.",
      },
      practiceSet: [
        { prompt: "Which program turns assembly language into machine code?", answer: "An assembler" },
        { prompt: "How does an interpreter differ from a compiler?", answer: "An interpreter translates and runs one line at a time; a compiler translates the whole program first" },
        { prompt: "Is Java a high-level language or an assembly language?", answer: "A high-level language" },
        { prompt: "In which markup language are web pages written?", answer: "HTML" },
      ],
      traps: [
        {
          title: "Assembly belongs to one processor family",
          body: "Each assembly language matches one processor's instruction set, so it is **not portable**. Python and Java are **high-level** and run on many processors.",
        },
        {
          title: "A markup language does not depend on the machine",
          body: "SGML, HTML and XML only **label** the parts of a document. They are independent of the **hardware** and of the **operating system**, which is the whole point of them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphel-networks",
      name: "Networks, protocols and mobile communication",
      intuition:
        "The internet is built in layers. The bottom layers move bits and packets from machine to machine; the top layer holds the services people use, such as web pages, email and file transfer. Many services can run on one computer at the same time, so each is given a port number, the way flats in one building have door numbers.",
      definition:
        "What to know:\n" +
        "- **TCP/IP layers**, top down: **application** (HTTP, FTP, SMTP, TELNET, DNS), **transport** (TCP, UDP), **internet** (IP) and **link** (Ethernet, Wi-Fi).\n" +
        "- **Go-back-N** is a method of resending lost frames (error control), not an application protocol.\n" +
        "- **Software (logical) ports** are numbers that point a connection to the right service: HTTP 80, HTTPS 443, FTP 21, SMTP 25, TELNET 23, SSH 22.\n" +
        "- **Hardware ports** are the sockets that join devices such as cameras and scanners: USB, HDMI.\n" +
        "- **CDMA** (Code Division Multiple Access) lets many mobile callers share one band of frequencies by giving each a different code. It ran many 2G and 3G **mobile phone** networks; 4G and 5G networks use a different method (OFDMA).",
      table: {
        columns: ["TCP/IP layer", "What it does", "Examples"],
        rows: [
          { cells: ["Application", "The services users' programs call on", "HTTP, FTP, SMTP, TELNET, DNS"] },
          { cells: ["Transport", "Delivers data between programs on two machines", "TCP, UDP"] },
          { cells: ["Internet", "Gives addresses and routes packets", "IP"] },
          { cells: ["Link", "Sends bits over the local connection", "Ethernet, Wi-Fi"] },
        ],
      },
      pyqExampleId: "b6cac64b-54f0-458d-a25d-70ec70cdd0e9",
      selfCheckExample: {
        prompt:
          "One computer is sending an email and downloading a web page at the same time. How does it keep the two streams of data apart?",
        steps: [
          "Each service is given its own software port number.",
          "Email goes out through the SMTP port (25) and the web page comes in through the HTTP or HTTPS port (80 or 443).",
        ],
        answer: "By port numbers: each service has its own.",
      },
      practiceSet: [
        { prompt: "Which port number does FTP (file transfer) use?", answer: "21" },
        { prompt: "Which port number does a web server normally use for HTTPS?", answer: "443" },
        { prompt: "Is a USB socket a hardware port or a software port?", answer: "A hardware port" },
        { prompt: "What does CDMA let many mobile callers do?", answer: "Share the same band of frequencies, each with its own code" },
      ],
      traps: [
        {
          title: "TCP and IP are not application protocols",
          body: "**TCP** works at the **transport** layer and **IP** at the **internet** layer. The application layer holds the user services: HTTP, FTP, SMTP, TELNET.",
        },
        {
          title: "Software ports are numbers, not sockets",
          body: "A **software port** is a number that picks out a service (25 for email, 21 for file transfer). The sockets on the side of a computer, such as USB, are **hardware ports**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphel-security",
      name: "Firewalls and malware",
      intuition:
        "A firewall is a guard at the gate: it looks at every packet coming in from the internet or going out, and lets through only what its rules allow. Antivirus software is the cleaner inside: it finds and removes harmful programs already on the computer. Malware is any program written to do harm.",
      definition:
        "What to know:\n" +
        "- **Firewall** (hardware or software): examines each packet, **prevents unauthorised access** and **blocks suspicious activity**. It does not connect telephones and does not remove viruses.\n" +
        "- **Antivirus**: scans for malware and removes it.\n" +
        "- **Malware** is software. **Hacking** and **password cracking** are activities, and **phishing** is a trick, not a program.",
      table: {
        columns: ["Term", "What it is"],
        rows: [
          {
            cells: ["Firewall", "Checks every packet against rules and blocks what is not allowed"],
            noteAmber: "CDS 2025 (II): a firewall examines packets, prevents unauthorised access and blocks suspicious activity.",
            pyqExampleId: "4518860b-8ac6-4aa8-8183-4d7d48669278",
          },
          { cells: ["Virus", "Malware that attaches to a file and spreads when that file is run"] },
          { cells: ["Worm", "Malware that spreads by itself across a network"] },
          {
            cells: ["Trojan horse", "Malware that looks like useful software but carries a harmful part"],
            noteAmber: "CDS 2025 (I): the Trojan horse is the malicious software among hacking, password cracking and a firewall.",
            pyqExampleId: "75a526d7-1d91-43db-ad25-379b9ff86c9d",
          },
          { cells: ["Ransomware", "Malware that locks the user's files and demands money"] },
          { cells: ["Spyware", "Malware that secretly records what the user does"] },
          { cells: ["Phishing", "A fake message or website that tricks a user into giving passwords"] },
        ],
      },
      pyqExampleId: "75a526d7-1d91-43db-ad25-379b9ff86c9d",
      selfCheckExample: {
        prompt: "A school computer already has a firewall. Does it still need antivirus software? Why?",
        steps: [
          "The firewall only controls traffic between the computer and the network.",
          "Malware can still arrive another way, for example on a pen drive, and only antivirus software finds and removes it.",
        ],
        answer: "Yes. A firewall guards the network connection; antivirus removes malware already on the machine.",
      },
      practiceSet: [
        { prompt: "How does a worm differ from a virus?", answer: "A worm spreads by itself across a network; a virus needs an infected file to be run" },
        { prompt: "Is phishing a kind of software?", answer: "No. It is a trick to make a user give away passwords or other details" },
        { prompt: "Which malware locks a user's files and demands money?", answer: "Ransomware" },
        { prompt: "What does a firewall look at to decide what to block?", answer: "Each packet coming in or going out, checked against a set of rules" },
      ],
      traps: [
        {
          title: "A firewall is not antivirus",
          body: "A **firewall** blocks unauthorised **network** traffic. Finding and removing **viruses** already on the computer is the job of **antivirus** software.",
        },
        {
          title: "Hacking is not software",
          body: "**Hacking** and **password cracking** are things people do. Malware is a **program**: a virus, worm, Trojan horse, ransomware or spyware.",
        },
      ],
    },
  ],
};
