import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_CIE_NET_NOTE: SubtopicNote = {
  subtopicName: "E-mail, Browsers and Internet Protocols",
  title: "E-mail, Browsers and Internet Protocols",
  oneLineDefinition:
    "How e-mail is written, sent and stored, how browsers show pages and use cookies, and which protocols carry data across the Internet.",
  whyItMatters:
    "22 questions in the Tier II bank, 15 EASY, 6 MODERATE and 1 HARD. Many are one-word answers (Trash, Compose, Reply), and the cookie names are a favourite.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssc2ciene-email",
      name: "E-mail",
      intuition:
        "An e-mail account has folders (Inbox, Outbox, Sent, Trash) and actions (Compose, Reply, Forward). Each one has a single job, and SSC asks which does what.",
      definition:
        "Key facts:\n" +
        "- **Compose** starts a new message; **Reply** answers the sender only; **Forward** sends a received mail on to someone new.\n" +
        "- **Outbox** holds mail not yet sent, which can still be edited.\n" +
        "- **Trash** holds deleted mail.\n" +
        "- **Providers:** Outlook, Gmail and Yandex are all e-mail services.\n" +
        "- **Multipart messages:** a boundary marks where each part starts and ends.",
      table: {
        columns: ["Item", "What it does", "Asked in"],
        rows: [
          { cells: ["Compose", "Creates a new message", "2022"] },
          { cells: ["Reply", "Answers the original sender only", "2022"] },
          { cells: ["Trash", "Stores deleted mail", "2022"] },
          { cells: ["Forward", "Sends a received mail to another person", "2024"] },
          { cells: ["Outbox", "Unsent mail that can still be edited", "2024"] },
          { cells: ["User agents", "Two are needed when sender and receiver share a system", "2023"] },
          { cells: ["Netscape", "A GUI-based e-mail user agent", "2023"] },
          { cells: ["Boundary parameter", "Separates the parts of a multipart mail", "2024"] },
        ],
      },
      pyqExampleId: "67e7a355-e513-4c0e-9b40-98e67bc5cc11",
      selfCheckExample: {
        prompt: "You received a mail and want to send it to a friend while keeping the original. What do you use? (a) Reply (b) Forward (c) Compose (d) Delete",
        steps: ["Forward sends a received mail on to someone new; the original stays in your inbox."],
        answer: "(b) Forward",
      },
      practiceSet: [
        { prompt: "Where does a mail go while it waits to be sent?", answer: "Outbox" },
        { prompt: "Which button starts a new message in Gmail?", answer: "Compose" },
        { prompt: "Which action answers only the original sender?", answer: "Reply" },
      ],
      traps: [
        {
          title: "Mixing Reply and Forward",
          body: "Reply goes back to the sender. Forward goes to someone new with the original message attached.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2ciene-browse",
      name: "Browsers and cookies",
      intuition:
        "A browser fetches pages and draws them on screen with its rendering engine. Cookies are small files websites leave in it; some are harmless, others follow you or come back after deletion.",
      definition:
        "Key facts:\n" +
        "- **Rendering engine:** the part of a browser that displays pages.\n" +
        "- **Third-party cookies** track you across sites.\n" +
        "- **Zombie cookies** recreate themselves after deletion.\n" +
        "- **Browsers:** Edge (Microsoft), Chrome, Firefox; Facebook is a social network, not a browser.\n" +
        "- **ISP:** the company that connects you to the Internet.",
      table: {
        columns: ["Term", "Fact asked", "Asked in"],
        rows: [
          { cells: ["Third-party cookies", "Track you and expose privacy", "2022"] },
          { cells: ["Zombie cookies", "Come back after being deleted", "2022"] },
          { cells: ["Mosaic", "First browser to show images inline with text", "2022"] },
          { cells: ["Rendering engine", "Displays the web page", "2022"] },
          { cells: ["Edge", "Microsoft's browser", "2022"] },
          { cells: ["Internet Service Provider", "Connects subscribers to the Internet", "2023"] },
          { cells: ["Facebook", "Not a web browser", "2023"] },
        ],
      },
      pyqExampleId: "a1f2218e-e0fb-4741-8743-080380345e7b",
      selfCheckExample: {
        prompt: "Which of these is NOT a web browser? (a) Chrome (b) Firefox (c) Instagram (d) Safari",
        steps: ["Chrome, Firefox and Safari display web pages.", "Instagram is a social media app."],
        answer: "(c) Instagram",
      },
      practiceSet: [
        { prompt: "Which part of a browser draws the page on the screen?", answer: "The rendering engine" },
        { prompt: "Which company makes the Edge browser?", answer: "Microsoft" },
        { prompt: "Which cookies follow you across different websites?", answer: "Third-party cookies" },
      ],
      traps: [
        {
          title: "Calling any app a browser",
          body: "Apps like Facebook show web content but are not browsers. A browser opens any website by its address.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2ciene-protocol",
      name: "Protocols, uploading and downloading",
      visualizationSlug: "ssc-t2-upload-download",
      intuition:
        "Protocols are the rules for moving data. TCP breaks data into packets and checks they arrive; uploading sends files from your machine to a server, downloading brings them back.",
      definition:
        "Key facts:\n" +
        "- **TCP** says how data is exchanged and split into IP packets.\n" +
        "- **WebRTC** allows voice and video calls inside a browser with nothing extra installed.\n" +
        "- **Uploading:** your machine to the server. **Downloading:** server to your machine.\n" +
        "- **Compression** before uploading reduces size and saves storage.",
      table: {
        columns: ["Term", "Fact asked", "Asked in"],
        rows: [
          { cells: ["TCP", "Splits data into packets for the Internet", "2022"] },
          { cells: ["Uploading", "Data moves from user to server", "2022"] },
          { cells: ["WebRTC", "Browser calls with no extra software", "2024"] },
          { cells: ["Compression", "Smaller files before upload", "2025"] },
        ],
      },
      pyqExampleId: "3e82d3a2-a1f0-463b-8a70-72c325213290",
      selfCheckExample: {
        prompt: "When you save a photo from a website to your phone, are you uploading or downloading?",
        steps: ["Data moves from the server to your device."],
        answer: "Downloading",
      },
      practiceSet: [
        { prompt: "Sending a file from your computer to cloud storage is called what?", answer: "Uploading" },
        { prompt: "Which protocol lets a browser make video calls with nothing installed?", answer: "WebRTC" },
        { prompt: "Why compress a file before uploading?", answer: "To reduce its size and save storage" },
      ],
      traps: [
        {
          title: "Reversing upload and download",
          body: "Up goes to the server; down comes to you. A form you submit is uploaded; a page you open is downloaded.",
        },
      ],
    },
  ],
};
