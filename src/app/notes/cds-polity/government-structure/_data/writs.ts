import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_GV_WRITS_NOTE: SubtopicNote = {
  subtopicName: "Writs and Landmark Cases",
  title: "Writs and Landmark Cases",
  oneLineDefinition:
    "The five writs and when each one lies, which courts can issue them, the Latin maxims of natural justice, and the court cases CDS names.",
  whyItMatters:
    "Twelve CDS questions from 2016 to 2024: 4 EASY, 3 MODERATE and 5 HARD. Habeas corpus was asked twice (2016 and 2017) and the Section 377 case twice (2022 and 2024). The HARD ones ask the exact conditions for a writ, so learn each writ's 'when' as well as its name.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolgv-five-writs",
      name: "The five writs and natural justice",
      intuition:
        "A writ is a written order from a higher court. Each of the five has a Latin name that says what it does: 'have the body' brings a detained person before the court, 'we command' makes an official do his duty, 'by what authority' asks a person to justify holding a public post. Learn the meaning and the use follows.",
      definition:
        "The writs (Articles 32 and 226):\n" +
        "- **Habeas corpus** ('you may have the body'): orders a detaining authority to produce a detained person in court; the person is **released** if the detention is **unlawful**. Lies against public authorities and private persons.\n" +
        "- **Mandamus** ('we command'): orders a **public official** or body to perform a **public duty** it has failed to do. Not against the President, a Governor or a private person.\n" +
        "- **Prohibition**: a higher court **stops** a lower court or tribunal from going beyond its jurisdiction, **before** it decides.\n" +
        "- **Certiorari** ('to be certified'): a higher court **quashes** an order already made by a lower court or tribunal that had **legal authority** to decide rights, had a **duty to act judicially**, and acted **without or beyond jurisdiction**.\n" +
        "- **Quo warranto** ('by what authority'): asks a person holding a **substantive public office created by law** to justify it, where the appointment **broke the Constitution or a statute**.\n\n" +
        "Natural justice: **audi alteram partem**, 'hear the other side', means no one is condemned unheard. **Nemo judex in causa sua** means no one judges his own case. **Autrefois acquit**, **autrefois convict** and **non bis in idem** are pleas against being **tried twice** for the same offence (double jeopardy).",
      table: {
        columns: ["Writ", "Meaning", "Used when"],
        rows: [
          {
            cells: ["Habeas corpus", "You may have the body", "A person is detained unlawfully"],
            noteAmber: "Asked twice, CDS 2016 (II) and 2017 (II): the writ for freedom after unlawful arrest is habeas corpus.",
            pyqExampleId: "47167410-fc34-4761-9349-da4b398b25e5",
          },
          { cells: ["Mandamus", "We command", "A public official fails to do a public duty"] },
          { cells: ["Prohibition", "To forbid", "A lower court or tribunal is about to exceed its jurisdiction"] },
          {
            cells: ["Certiorari", "To be certified", "A lower court or tribunal has decided without or beyond jurisdiction"],
            noteAmber: "CDS 2023 (I): both conditions are needed: a body with legal authority and a duty to act judicially, which acted without jurisdiction.",
            pyqExampleId: "c252b896-32d9-44ad-af83-94015bd2ed93",
          },
          { cells: ["Quo warranto", "By what authority", "Someone holds a public office created by law without the right to it"] },
        ],
      },
      pyqExampleId: "b2b07acf-1b87-47c6-a535-807d1d749e64",
      selfCheckExample: {
        prompt: "A tribunal has started hearing a dispute that the law does not allow it to hear, and has not yet given any decision. Which writ should a higher court issue to stop it?",
        steps: [
          "The tribunal is acting beyond its jurisdiction.",
          "It has not decided yet, so there is no order to quash; the need is to stop it.",
          "Stopping a lower body before it decides is the work of prohibition. Certiorari would come after a decision.",
        ],
        answer: "Prohibition.",
      },
      practiceSet: [
        { prompt: "What does 'habeas corpus' literally mean?", answer: "You may have the body" },
        { prompt: "Which writ orders a public official to perform a public duty?", answer: "Mandamus" },
        { prompt: "Can a writ of mandamus be issued against the President of India?", answer: "No" },
        { prompt: "Which maxim means that no one should be condemned unheard?", answer: "Audi alteram partem" },
      ],
      traps: [
        {
          title: "Prohibition before, certiorari after",
          body: "**Prohibition** stops a lower court or tribunal **while** a case is pending. **Certiorari** quashes an order it **has already made**. Both are about acting beyond jurisdiction.",
        },
        {
          title: "Quo warranto needs a broken rule",
          body: "Quo warranto lies only for a **substantive public office created by law**, and only when the appointment **contravened** the Constitution or a statute. An appointment that follows the statute gives no ground for it.",
        },
        {
          title: "Double jeopardy is not natural justice",
          body: "Autrefois acquit, autrefois convict and non bis in idem are about **not being tried twice**. The rule that no one is condemned unheard is **audi alteram partem**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-who-issues",
      name: "Which courts issue writs",
      intuition:
        "Only the two highest levels of courts can issue writs. The Supreme Court does it only to protect Fundamental Rights, because Article 32 is itself a remedy for those rights. A High Court can also use writs to protect any other legal right, so its writ power is the wider of the two.",
      definition:
        "Writ jurisdiction:\n" +
        "- **Supreme Court, Article 32**: writs **only** to enforce **Fundamental Rights**. The right to move the Supreme Court is itself a Fundamental Right; Ambedkar called Article 32 the **heart and soul** of the Constitution.\n" +
        "- So the Supreme Court **refuses** relief under Article 32 where **no Fundamental Right** has been infringed.\n" +
        "- **High Courts, Article 226**: writs for Fundamental Rights **and for any other legal right**, so their writ power is **wider**.\n" +
        "- **Subordinate courts cannot issue writs.** Article 32(3) lets Parliament empower other courts, but it has not done so.",
      table: {
        columns: ["Court", "Article", "Writs for"],
        rows: [
          {
            cells: ["Supreme Court", "32", "Fundamental Rights only"],
            noteAmber: "CDS 2020 (I): the Supreme Court can refuse relief under Article 32 when no fundamental right has been infringed.",
            pyqExampleId: "52607220-b6d7-469c-801b-beb53d90aab7",
          },
          { cells: ["High Courts", "226", "Fundamental Rights and other legal rights"] },
          { cells: ["District and other lower courts", "None", "Cannot issue writs"] },
        ],
      },
      pyqExampleId: "af6bf7a7-4097-451d-bd35-3e815f5ea81c",
      selfCheckExample: {
        prompt: "A trader's shop licence is cancelled under a municipal rule, and no Fundamental Right is involved. He files a petition in the Supreme Court under Article 32. What will happen, and where should he go instead?",
        steps: [
          "Article 32 is a remedy only for Fundamental Rights.",
          "With no Fundamental Right infringed, the Supreme Court will refuse relief under it.",
          "Article 226 lets a High Court issue writs for other legal rights too.",
        ],
        answer: "The Supreme Court will refuse it; he should petition the High Court under Article 226.",
      },
      practiceSet: [
        { prompt: "Is the right to move the Supreme Court under Article 32 itself a Fundamental Right?", answer: "Yes" },
        { prompt: "Who called Article 32 the heart and soul of the Constitution?", answer: "B. R. Ambedkar" },
        { prompt: "Whose writ jurisdiction is wider, the Supreme Court's or a High Court's?", answer: "A High Court's" },
        { prompt: "Which clause of Article 32 lets Parliament empower other courts to issue writs?", answer: "Article 32(3)" },
      ],
      traps: [
        {
          title: "No writs from lower courts",
          body: "Writs are issued by the **Supreme Court and the High Courts only**. A district court cannot issue one, since Parliament has not used its power under Article 32(3).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-cases",
      name: "Landmark cases CDS names",
      intuition:
        "Some judgments changed the law so much that they are known by the name of the case. CDS asks either what a case was about or who brought it. Learn each case as a pair: the name and the one thing it decided.",
      definition:
        "How these cases work:\n" +
        "- A case is often named after the **petitioner**, the person or group who went to court. **K. S. Puttaswamy**, a retired judge of the Karnataka High Court, filed the petition that led to the **right to privacy** judgment (2017, a nine-judge bench, privacy part of **Article 21**).\n" +
        "- A case can pass through several courts. The challenge to **Section 377** of the Indian Penal Code was filed by the **Naz Foundation (India) Trust**. The **Delhi High Court** read the section down in **2009**; the Supreme Court reversed that in **Suresh Kumar Koushal (2013)**; and in **Navtej Singh Johar (2018)** it finally decriminalised consensual acts between adults.\n" +
        "- **Vishaka v. State of Rajasthan (1997)** laid down guidelines against **sexual harassment at the workplace**, later replaced by the Act of 2013.",
      table: {
        columns: ["Case", "Year", "What it decided"],
        rows: [
          { cells: ["Kesavananda Bharati", "1973", "Parliament cannot change the basic structure of the Constitution"] },
          {
            cells: ["Vishaka v. State of Rajasthan", "1997", "Guidelines against sexual harassment at the workplace"],
            noteAmber: "CDS 2018 (I): the Vishaka judgment pertains to sexual harassment at the workplace.",
            pyqExampleId: "88b5e465-f88d-44d1-a418-1d6c44736028",
          },
          {
            cells: ["Naz Foundation v. Government of NCT of Delhi", "2009 (Delhi High Court)", "Section 377 tested against Articles 14, 15 and 21 and read down"],
            noteAmber: "CDS 2022 (I) and 2024 (II): the Section 377 challenge is the Naz Foundation case, brought by the Naz Foundation (India) Trust.",
            pyqExampleId: "416de592-7a3c-4948-a6d3-1956c16bcc46",
          },
          { cells: ["Shreya Singhal v. Union of India", "2015", "Struck down Section 66A of the IT Act (online speech)"] },
          { cells: ["Shayara Bano v. Union of India", "2017", "Instant triple talaq is invalid"] },
          { cells: ["K. S. Puttaswamy v. Union of India", "2017", "Privacy is a Fundamental Right"] },
          { cells: ["Navtej Singh Johar v. Union of India", "2018", "Consensual same-sex relations between adults are no crime"] },
        ],
      },
      pyqExampleId: "4a473aaa-1d00-48b3-86be-969513a2bfc9",
      selfCheckExample: {
        prompt: "The Section 377 challenge went through three judgments: 2009, 2013 and 2018. Which court gave each, and which way did each go?",
        steps: [
          "2009: the Delhi High Court, in Naz Foundation, read Section 377 down for consensual acts between adults.",
          "2013: the Supreme Court, in Suresh Kumar Koushal, reversed that and restored the section.",
          "2018: the Supreme Court, in Navtej Singh Johar, decriminalised consensual acts between adults.",
        ],
        answer: "Delhi High Court for (2009), Supreme Court against (2013), Supreme Court for (2018).",
      },
      practiceSet: [
        { prompt: "Which case struck down Section 66A of the Information Technology Act?", answer: "Shreya Singhal v. Union of India (2015)" },
        { prompt: "Which 1997 case laid down guidelines against sexual harassment at the workplace?", answer: "Vishaka v. State of Rajasthan" },
        { prompt: "Which case held instant triple talaq invalid?", answer: "Shayara Bano v. Union of India (2017)" },
        { prompt: "Which case laid down that Parliament cannot change the basic structure of the Constitution?", answer: "Kesavananda Bharati (1973)" },
      ],
      traps: [
        {
          title: "Naz Foundation was a High Court case",
          body: "The 2009 Naz Foundation judgment came from the **Delhi High Court**. The Supreme Court's final word on Section 377 was **Navtej Singh Johar (2018)**.",
        },
        {
          title: "Puttaswamy brought the case",
          body: "Justice **K. S. Puttaswamy** was the **petitioner**, a retired High Court judge, not a member of the bench that decided it.",
        },
      ],
    },
  ],
};
