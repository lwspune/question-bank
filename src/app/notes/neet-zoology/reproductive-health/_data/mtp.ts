import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_RH_MTP_NOTE: SubtopicNote = {
  subtopicName: "MTP and Sexually Transmitted Infections",
  title: "MTP and Sexually Transmitted Infections",
  oneLineDefinition:
    "What medical termination of pregnancy is and the rules for it in India, why amniocentesis for sex determination is banned, and the sexually transmitted infections NCERT lists: which can be cured, how they spread, their signs and how to prevent them.",
  whyItMatters:
    "Five NEET questions from 2021 to 2026. Four are on sexually transmitted infections: which ones cannot be fully cured (NEET 2023 and Re-NEET 2024), how they spread (NEET 2021) and which disease is not an STI (Re-NEET 2026). NEET 2023 asked an assertion-reason on amniocentesis for sex determination. No question in the bank has asked the MTP law directly.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzorh-mtp",
      name: "Medical termination of pregnancy and the check on female foeticide",
      intuition:
        "Sometimes a pregnancy has to be ended on purpose, for medical or other serious reasons. The law allows this only with strict conditions, so that it is safe for the woman and is not misused. One misuse worries the law most: finding out the sex of the unborn child and ending the pregnancy if it is a girl. That is why using amniocentesis for sex determination is banned.",
      definition:
        "- **Medical termination of pregnancy (MTP)**, or **induced abortion**, is the intentional or voluntary ending of a pregnancy before full term.\n" +
        "- Nearly **45 to 50 million** MTPs are done in the world every year, about **one-fifth** of all pregnancies conceived in a year. MTP is not meant for it, but it plays a significant role in decreasing the population.\n" +
        "- The Government of India **legalised MTP in 1971**, with strict conditions to avoid misuse. The **MTP (Amendment) Act, 2017** aims to reduce illegal abortion and the maternal deaths and illness it causes.\n" +
        "- Under this Act, a pregnancy may be ended **within the first 12 weeks** on the opinion of **one registered medical practitioner**. Between **12 and 24 weeks**, **two registered medical practitioners** must agree, and only on grounds such as a risk to the life or health of the woman, or a serious abnormality in the child.\n" +
        "- MTP is used to end unwanted pregnancies after casual unprotected intercourse, failure of a contraceptive, or rape, and when continuing the pregnancy could harm or kill the mother, the foetus or both.\n" +
        "- MTPs are **relatively safe in the first trimester** (up to 12 weeks). **Second trimester** abortions are much riskier.\n" +
        "- Dangers: most MTPs are done **illegally by unqualified quacks**, which is unsafe and can be fatal. Another dangerous trend is the **misuse of amniocentesis to find the sex of the unborn child**, often followed by MTP if the foetus is female, which is illegal.\n" +
        "- So the **RCH programme** lists a **statutory ban on amniocentesis for sex determination**, to legally check the rising number of **female foeticides**.",
      table: {
        columns: ["Point", "NCERT fact"],
        rows: [
          { cells: ["Other name", "Induced abortion"] },
          { cells: ["Number in the world", "Nearly 45 to 50 million a year, about one-fifth of conceived pregnancies"] },
          { cells: ["Legalised in India", "1971, with strict conditions; amended by the MTP (Amendment) Act, 2017"] },
          { cells: ["Up to 12 weeks", "Opinion of one registered medical practitioner"] },
          { cells: ["12 to 24 weeks", "Opinion of two registered medical practitioners"] },
          { cells: ["Safest time", "First trimester, up to 12 weeks; second trimester abortions are much riskier"] },
          {
            cells: ["Amniocentesis for sex determination", "Banned by law, to check female foeticide; it is not a strategy of the RCH programme"],
            noteAmber: "NEET 2023: the assertion that amniocentesis for sex determination is an RCH strategy was false; the reason, that its ban checks female foeticide, was true.",
            pyqExampleId: "578c3f2b-b49e-4129-9c30-ce00f7d4ac30",
          },
        ],
      },
      pyqExampleId: "578c3f2b-b49e-4129-9c30-ce00f7d4ac30",
      selfCheckExample: {
        prompt: "A woman is 16 weeks pregnant and asks for an MTP. Under the MTP (Amendment) Act, 2017, how many registered medical practitioners must give their opinion?",
        steps: [
          "Up to 12 weeks, the opinion of one registered medical practitioner is enough.",
          "16 weeks lies between 12 and 24 weeks, where the Act needs two.",
        ],
        answer: "Two registered medical practitioners.",
      },
      practiceSet: [
        { prompt: "In which year did the Government of India legalise MTP?", answer: "1971" },
        { prompt: "About how many MTPs are done in the world each year, and what share of all conceived pregnancies is that?", answer: "Nearly 45 to 50 million, about one-fifth" },
        { prompt: "Up to how many weeks of pregnancy is MTP considered relatively safe?", answer: "Up to 12 weeks, the first trimester" },
        { prompt: "Who performs most illegal MTPs, according to NCERT, and why is that dangerous?", answer: "Unqualified quacks; it is unsafe and can be fatal" },
        { prompt: "What is another name for medical termination of pregnancy?", answer: "Induced abortion" },
      ],
      traps: [
        {
          title: "MTP is not a contraceptive",
          body: "MTP ends a pregnancy that has already begun. It helps lower the population, but NCERT says it is **not meant** for that purpose.",
        },
        {
          title: "Second trimester is the risky one",
          body: "MTP is **relatively safe up to 12 weeks** (the first trimester). Abortions in the **second trimester** are much more risky.",
        },
        {
          title: "The ban is on sex determination",
          body: "What the law bans is **amniocentesis for sex determination**. Using it to find the sex of the foetus is not an RCH strategy; the **ban** is.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzorh-sti-list",
      name: "The sexually transmitted infections and which can be cured",
      intuition:
        "An infection passed on through sexual contact is a sexually transmitted infection. NCERT names eight of them. Most can be cured completely if they are found early and treated properly. Three cannot: learn those three by heart, because NEET asks about them again and again.",
      definition:
        "- Infections or diseases passed on through **sexual intercourse** are **sexually transmitted infections (STIs)**, also called **venereal diseases (VD)** or **reproductive tract infections (RTI)**.\n" +
        "- NCERT lists eight: **gonorrhoea, syphilis, genital herpes, chlamydiasis, genital warts, trichomoniasis, hepatitis-B and HIV** (which leads to AIDS).\n" +
        "- **Except hepatitis-B, genital herpes and HIV infection**, all the others are **completely curable** if detected early and treated properly.\n" +
        "- A disease such as **tuberculosis** is not on this list: it is not sexually transmitted.",
      table: {
        columns: ["STI", "Completely curable if detected early?"],
        rows: [
          {
            cells: ["Gonorrhoea", "Yes"],
            noteAmber: "NEET 2023: gonorrhoea was the curable one among genital herpes, hepatitis-B and HIV.",
            pyqExampleId: "12861de8-8997-4e20-85fd-801010035b78",
          },
          {
            cells: ["Syphilis", "Yes"],
            noteAmber: "Re-NEET 2026: syphilis, gonorrhoea and genital warts are STIs; tuberculosis is not.",
            pyqExampleId: "e2ddf3cd-cdcf-4a2e-b1e0-eed0868fd0cb",
          },
          { cells: ["Chlamydiasis", "Yes"] },
          { cells: ["Genital warts", "Yes"] },
          { cells: ["Trichomoniasis", "Yes"] },
          { cells: ["Genital herpes", "No"] },
          { cells: ["Hepatitis-B", "No"] },
          { cells: ["HIV infection (leads to AIDS)", "No"] },
        ],
      },
      pyqExampleId: "01726d7e-f638-41db-abcd-b90ccf658bf3",
      selfCheckExample: {
        prompt: "Name the eight sexually transmitted infections that NCERT lists.",
        steps: [
          "NCERT gives the list in one sentence.",
          "It ends with HIV, which leads to AIDS.",
        ],
        answer: "Gonorrhoea, syphilis, genital herpes, chlamydiasis, genital warts, trichomoniasis, hepatitis-B and HIV.",
      },
      practiceSet: [
        { prompt: "What two other names does NCERT use for sexually transmitted infections?", answer: "Venereal diseases (VD) and reproductive tract infections (RTI)" },
        { prompt: "Which infection in NCERT's list of STIs leads to AIDS?", answer: "HIV infection" },
        { prompt: "Can chlamydiasis be completely cured if it is detected early and treated properly?", answer: "Yes" },
        { prompt: "Of gonorrhoea and hepatitis-B, which one cannot be completely cured even when detected early?", answer: "Hepatitis-B" },
      ],
      traps: [
        {
          title: "Genital warts can be cured; genital herpes cannot",
          body: "The two names sound alike. **Genital warts** are completely curable if found early. **Genital herpes** is one of the three that are not, with **hepatitis-B** and **HIV**.",
        },
        {
          title: "Hepatitis-B is an STI",
          body: "**Hepatitis-B** is in NCERT's list of STIs, and it is one of the three that are **not completely curable**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzorh-sti-spread",
      name: "How STIs spread, show and are prevented",
      intuition:
        "STIs mostly spread through sex, but some of them also travel in blood. Their early signs are mild, so many people do not get treated in time, and late complications can be serious, even infertility. Three simple rules prevent most of them.",
      definition:
        "- Some STIs, such as **hepatitis-B and HIV**, also spread by **sharing injection needles or surgical instruments** with infected persons, by **transfusion of blood**, or from an **infected mother to the foetus**.\n" +
        "- Anyone can get an STI, but they are very common in the **15 to 24 years** age group.\n" +
        "- **Early symptoms** are minor: itching, fluid discharge, slight pain and swellings in the genital region. **Infected females are often asymptomatic**, so the infection may stay undetected for long.\n" +
        "- Mild early symptoms and the **social stigma** keep people from timely detection and treatment. Later **complications** include **pelvic inflammatory diseases (PID), abortions, still births, ectopic pregnancies, infertility** or even **cancer of the reproductive tract**.\n" +
        "- **Prevention**, three simple principles: avoid sex with **unknown or multiple partners**; always try to **use condoms** during coitus; in case of doubt, go to a **qualified doctor** for early detection and complete treatment.",
      table: {
        columns: ["Point", "NCERT fact"],
        rows: [
          {
            cells: ["Ways besides sexual contact", "Sharing injection needles and surgical instruments, blood transfusion, infected mother to foetus"],
            noteAmber: "NEET 2021: blood transfusion and mother to foetus were the routes; sterile needles, kissing and inheritance were not.",
            pyqExampleId: "d1e49a24-8ad5-46b8-8157-79236649dc37",
          },
          { cells: ["Most affected age group", "15 to 24 years"] },
          { cells: ["Early symptoms", "Itching, fluid discharge, slight pain, swellings in the genital region"] },
          { cells: ["In females", "Often no symptoms, so the infection can stay undetected for long"] },
          { cells: ["Late complications", "PID, abortions, still births, ectopic pregnancies, infertility, cancer of the reproductive tract"] },
          { cells: ["Prevention", "Avoid unknown or multiple partners; use condoms; see a qualified doctor in case of doubt"] },
        ],
      },
      pyqExampleId: "d1e49a24-8ad5-46b8-8157-79236649dc37",
      selfCheckExample: {
        prompt: "Give two reasons NCERT gives for why many people with an STI do not get treated early.",
        steps: [
          "The early symptoms are minor, and infected females often have none at all.",
          "There is also a social stigma attached to these infections.",
        ],
        answer: "The early symptoms are absent or not significant, and the social stigma keeps people from going for detection and treatment.",
      },
      practiceSet: [
        { prompt: "In which age group are STIs reported to be very common?", answer: "15 to 24 years" },
        { prompt: "Name three early symptoms of an STI.", answer: "Any three of itching, fluid discharge, slight pain and swellings in the genital region" },
        { prompt: "Name three late complications of an untreated STI.", answer: "Any three of pelvic inflammatory disease, abortion, still birth, ectopic pregnancy, infertility and cancer of the reproductive tract" },
        { prompt: "What are the three simple principles NCERT gives to stay free of STIs?", answer: "Avoid sex with unknown or multiple partners, always try to use condoms during coitus, and see a qualified doctor in case of doubt" },
      ],
      traps: [
        {
          title: "No symptoms does not mean no infection",
          body: "**Infected females are often asymptomatic**. The infection can stay hidden for long and still lead to **PID, ectopic pregnancy or infertility** later.",
        },
        {
          title: "STIs are not inherited",
          body: "An STI passes from an **infected mother to the foetus** by infection, which is not inheritance. It also spreads through **shared needles and blood transfusion**, not through sterile needles.",
        },
      ],
    },
  ],
};
