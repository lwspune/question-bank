import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_SYN_LAW_ACTION_NOTE: SubtopicNote = {
  subtopicName: "Synonyms: Law, Duty and Action",
  title: "Words for law, duty and action",
  oneLineDefinition:
    "The words CDS has tested for law, rules and duty, and the action verbs for starting, stopping, hiding and attacking.",
  whyItMatters:
    "Many CDS synonym sentences are about courts, officials and rules, so legal and official words come up often. The other half of this page is action verbs such as hindered and smothered, used in one exact sense that the sentence makes clear.",
  concepts: [
    // C1 — law, duty and blame
    {
      kind: "reference" as const,
      slug: "cdsensyn-law",
      name: "Law, duty and blame",
      intuition:
        "Legal and official words sound hard, but they sort into a few ideas: required by a rule, taking or blocking by authority, blaming, and work. Put the word in its group first.",
      definition:
        "Group them:\n" +
        "- **Required**: obligatory and mandatory (compulsory), statutory (fixed by law).\n" +
        "- **Courts and power**: impounded (confiscated), overrule (veto), circumscribed (limited), extradition (handing over).\n" +
        "- **Blame and cause**: impugned (challenged), implicate (incriminate), attributed (ascribed), ascertained (determined).\n" +
        "- **Work**: vocation (occupation), designation (position), patronized (supported), vendor (seller).\n" +
        "- **Obligatory** has been set twice and **mandatory** once; the answer was always compulsory or essential.",
      table: {
        columns: ["Word", "Meaning", "Nearest option", "Sitting"],
        rows: [
          { cells: ["impounded", "seized by order of the law", "confiscated", "2019 (II)"] },
          { cells: ["impugned", "attacked as wrong, called into question", "challenged", "2019 (II)"] },
          { cells: ["statutory", "fixed by law", "legal", "2020 (II)"] },
          { cells: ["obligatory", "required by a rule", "compulsory; essential", "2019 (II), 2023 (I)"] },
          { cells: ["mandatory", "required by law or rule", "compulsory", "2026 (II)"] },
          { cells: ["overrule", "reject by higher authority", "veto", "2021 (II)"] },
          { cells: ["implicate", "show that someone is involved in a crime", "incriminate", "2020 (II)"] },
          { cells: ["patronized", "supported, sponsored", "supported", "2020 (II)"] },
          { cells: ["vocation", "a calling, a career", "occupation", "2020 (I)"] },
          { cells: ["ascertained", "found out for sure", "determined", "2020 (I)"] },
          { cells: ["attributed", "said to be caused by", "ascribed", "2019 (II)"] },
          { cells: ["extradition", "handing a person over to another country for trial", "deportation", "2018 (II)"] },
          { cells: ["circumscribed", "limited, kept within bounds", "constrained", "2023 (I)"], noteAmber: "Not circumvented (got around)." },
          { cells: ["designation", "an official title or rank", "position", "2022 (I)"] },
          { cells: ["vendor", "a person who sells things", "one engaged in selling", "2018 (I)"] },
        ],
      },
      pyqExampleId: "d7e6c2ce-f579-4c4b-9cfc-7f69cde10627",
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: The letter could \\(\\underline{\\text{implicate}}\\) the minister in the scandal. (a) protect (b) involve (c) reward (d) inform",
        steps: [
          "To implicate is to show that someone is involved, usually in a crime.",
          "Protect and reward point the other way. Inform does not connect him to the scandal.",
          "Involve keeps the meaning.",
        ],
        answer: "(b) involve",
      },
      practiceSet: [
        {
          prompt: "Spot the wrong row: impounded = confiscated; overrule = veto; statutory = unlawful; vocation = occupation.",
          answer: "statutory = unlawful",
          method: "Statutory means fixed by law.",
        },
        {
          prompt: "To impugn someone's honesty is to: (a) praise it (b) challenge it (c) prove it (d) ignore it",
          answer: "(b) challenge it",
        },
        {
          prompt: "Handing an accused person over to another country for trial is called ___.",
          answer: "extradition",
        },
      ],
      traps: [
        {
          title: "Patronized here means supported",
          body: "In everyday speech, a patronizing person talks down to others. In 'poets were **patronized** by kings', it means **supported** or sponsored. Read the sentence.",
        },
        {
          title: "Attributed has nothing to do with tribute",
          body: "To **attribute** a problem to a cause is to say the cause produced it: **ascribed**. 'Tribute' only shares letters.",
        },
        {
          title: "Match the part of speech",
          body: "**Statutory** is an adjective: fixed by law. **Legislature** is a noun (the body that makes laws), so it cannot replace statutory even though both are about law.",
        },
        {
          title: "Impugn is not remove",
          body: "To **impugn** a person is to attack their conduct as wrong, to call it into question: **challenged**. It does not mean expelled or dismissed.",
        },
      ],
    },

    // C2 — verbs of action
    {
      kind: "reference" as const,
      slug: "cdsensyn-action",
      name: "Verbs of action: start, stop, hide, attack",
      intuition:
        "Action verbs are tested in one exact sense. Smothered a fire means put it out; masked her feelings means hid them; defused a situation means calmed it. Picture the action, then find the option that does the same thing.",
      definition:
        "Group them by what the action does:\n" +
        "- **Start and add**: initiated (began), incorporated (integrated), interspersed (mixed among), acquiring (obtaining).\n" +
        "- **Stop and block**: hindered and impede (obstruct), smothered (put out), defused (calmed), repulsed (drove back).\n" +
        "- **Hide and take**: masked (hid), stolen (taken), anonymously (without a name).\n" +
        "- **Others**: drowned, convulsed, decapitated, transpired (happened), served, save, admit, desired.",
      table: {
        columns: ["Word", "Meaning", "Nearest option", "Sitting"],
        rows: [
          { cells: ["repulsed", "drove back an attack", "repelled", "2018 (I)"] },
          { cells: ["stolen", "taken dishonestly", "embezzled", "2018 (I)"], noteAmber: "Embezzled is a special kind of stealing, of money held in trust. It was the only option meaning stole." },
          { cells: ["masked", "hid, covered up", "hid", "2018 (I)"] },
          { cells: ["smothered", "of a fire, put out by cutting off air", "doused", "2022 (I)"] },
          { cells: ["defused", "made a situation less tense", "mitigated", "2023 (II)"] },
          { cells: ["hindered", "got in the way of", "impeded", "2021 (II)"] },
          { cells: ["initiated", "began", "began", "2021 (II)"] },
          { cells: ["incorporated", "included as a part", "integrated", "2020 (I)"] },
          { cells: ["interspersed", "scattered among other things", "combined", "2026 (I)"] },
          { cells: ["drowned", "died under water", "submerged", "2021 (II)"] },
          { cells: ["convulsed", "shook violently", "shivered", "2023 (II)"], noteAmber: "Shivered is loose, but it was the only option about shaking." },
          { cells: ["admit", "let in, allow to enter", "receive", "2018 (I)"] },
          { cells: ["served", "of food, set before people", "offered", "2018 (I)"] },
          { cells: ["save", "keep from harm or death", "protect", "2018 (I)"] },
          { cells: ["acquiring", "getting, gaining", "obtain", "2019 (II)"] },
          { cells: ["desired", "wanted", "wish for", "2019 (II)"] },
          { cells: ["impede", "get in the way of, slow down", "hinder", "2018 (II)"] },
          { cells: ["decapitated", "had the head cut off", "beheaded", "2024 (I)"] },
          { cells: ["transpired", "happened; came to be known", "emerged", "2023 (II)"] },
          { cells: ["anonymously", "without giving one’s name", "incognito", "2019 (I)"] },
        ],
      },
      pyqExampleId: "548503cd-ac48-41e1-be60-10a9f3123ea8",
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: The teacher's joke \\(\\underline{\\text{defused}}\\) the quarrel. (a) started (b) calmed (c) explained (d) exploded",
        steps: [
          "To defuse is to take the danger out, as with a bomb. Of a quarrel, it means to make it less tense.",
          "Started and exploded point the other way. Explained does not reduce tension.",
          "Calmed keeps the meaning.",
        ],
        answer: "(b) calmed",
      },
      practiceSet: [
        {
          prompt: "Spot the wrong row: initiated = began; masked = flaunted; repulsed = repelled; incorporated = integrated.",
          answer: "masked = flaunted",
          method: "To flaunt is to show off: the opposite of mask.",
        },
        {
          prompt: "To smother a fire is to: (a) light it (b) put it out (c) spread it (d) watch it",
          answer: "(b) put it out",
        },
        {
          prompt: "A speech interspersed with jokes has jokes ___ through it.",
          answer: "scattered",
        },
      ],
      traps: [
        {
          title: "Defuse is not diffuse",
          body: "To **defuse** a bomb or a situation is to take the danger out of it, so **mitigated** (made less severe) is the match. To **diffuse** is to spread out.",
        },
        {
          title: "Repulsed an enemy means drove back",
          body: "**Repulsed** can mean disgusted, but soldiers who repulse the enemy drive them back: **repelled**. Defeated and destroyed go further than the word does.",
        },
        {
          title: "Interspersed means mixed in",
          body: "Lectures **interspersed** with demonstrations have demonstrations scattered among them, so they are **combined**. **Isolated** is the opposite.",
        },
      ],
    },
  ],
};
