import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_RH_CONTRACEPTION_NOTE: SubtopicNote = {
  subtopicName: "Reproductive Health and Contraception",
  title: "Reproductive Health and Contraception",
  oneLineDefinition:
    "What reproductive health means and how India works for it, the qualities of an ideal contraceptive, and every contraceptive method NCERT names: natural methods, barriers, IUDs, pills, injections and implants, emergency contraception and sterilisation.",
  whyItMatters:
    "Nine NEET questions from 2021 to 2026, half of the chapter. Six of them are match-the-columns. Named IUDs came up in five (NEET 2021, NEET 2022, NEET 2024, Re-NEET 2024 and NEET 2026): Lippes loop, the copper IUDs, LNG-20 and Progestasert. NEET 2024 asked which method is not a natural one.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzorh-natural",
      name: "Reproductive health, the ideal contraceptive and natural methods",
      intuition:
        "Reproductive health is not only about healthy organs. It means a person is well in body, mind, behaviour and social life in everything to do with reproduction. Contraception is one big part of it. NCERT sorts every method into a few kinds, and the easiest kind uses no device and no medicine at all: the natural methods. They have almost no side effects, but they fail often.",
      definition:
        "Reproductive health:\n" +
        "- The **WHO** defines reproductive health as total well-being in all aspects of reproduction: **physical, emotional, behavioural and social**.\n" +
        "- India was among the first countries to start national programmes for reproductive health. These **family planning** programmes began in **1951**. The improved programmes today are called **Reproductive and Child Health Care (RCH) programmes**.\n" +
        "- Strategies: awareness through **audio-visual and print media**; **sex education in schools**; information on reproductive organs, adolescence, safe and hygienic sexual practices, STIs and AIDS; teaching couples about birth control, care of pregnant mothers, post-natal care, breast feeding and **equal opportunities for the male and the female child**.\n" +
        "- Programmes that merit mention: a **statutory ban on amniocentesis for sex determination** (to check female foeticide) and **massive child immunisation**. Research is supported too: the pill **Saheli** was developed by scientists at the **Central Drug Research Institute (CDRI), Lucknow**.\n" +
        "- Signs of better reproductive health: more medically assisted deliveries and better post-natal care, so **lower maternal and infant mortality rates (MMR and IMR)**, more couples with small families, and better detection and cure of STIs.\n\n" +
        "Population and birth control:\n" +
        "- The population grew fast because of a **rapid fall in the death rate, MMR and IMR**, and a rise in the number of people of reproductive age.\n" +
        "- Steps taken: motivating smaller families with contraceptives, and raising the legal **marriageable age to 18 years for females and 21 years for males**.\n\n" +
        "The **ideal contraceptive** is user-friendly, easily available, effective and reversible, with no or least side effects, and it in no way interferes with the sexual drive, desire or the sexual act of the user.\n\n" +
        "Natural methods work on the principle of avoiding the meeting of ovum and sperm:\n" +
        "- **Periodic abstinence:** the couple avoids coitus from **day 10 to day 17** of the menstrual cycle, when ovulation is expected. This is the **fertile period**.\n" +
        "- **Withdrawal or coitus interruptus:** the male withdraws his penis from the vagina just before ejaculation, so that there is no insemination.\n" +
        "- **Lactational amenorrhoea:** during intense breast feeding after childbirth, ovulation and so the menstrual cycle do not occur. It works only up to a **maximum of six months** after parturition.\n" +
        "- No medicines or devices are used, so side effects are almost nil, but the **chances of failure are high**.",
      table: {
        columns: ["Kind of method", "NCERT examples", "How it prevents pregnancy"],
        rows: [
          { cells: ["Natural (traditional)", "Periodic abstinence, withdrawal (coitus interruptus), lactational amenorrhoea", "Keeps ovum and sperm from meeting, with no device or medicine"] },
          {
            cells: ["Barrier", "Condoms; diaphragms, cervical caps and vaults", "A physical barrier stops sperm reaching the ovum"],
            noteAmber: "NEET 2024: vaults were the one method in the list that is not natural.",
            pyqExampleId: "5b2cc94a-7c89-4c3f-8da3-567522410e9d",
          },
          { cells: ["Intra-uterine devices (IUDs)", "Lippes loop; CuT, Cu7, Multiload 375; Progestasert, LNG-20", "Placed in the uterus by a doctor or expert nurse"] },
          {
            cells: ["Oral", "Pills of progestogens or progestogen with estrogen; Saheli", "Stop ovulation and implantation and change the cervical mucus"],
            noteAmber: "NEET 2023: vasectomy, coitus interruptus, cervical caps and Saheli were matched to surgical, natural, barrier and oral.",
            pyqExampleId: "58ee108d-cb5a-4593-ae0b-4176d3f9ae7e",
          },
          { cells: ["Injections and implants", "Progestogens alone or with estrogen, under the skin", "Work like pills, but for a much longer period"] },
          { cells: ["Surgical (sterilisation)", "Vasectomy in males, tubectomy in females", "Blocks the transport of gametes; a terminal method"] },
        ],
      },
      pyqExampleId: "5b2cc94a-7c89-4c3f-8da3-567522410e9d",
      selfCheckExample: {
        prompt: "A couple uses periodic abstinence. Between which days of the menstrual cycle should they avoid coitus, and why those days?",
        steps: [
          "Ovulation is expected in the middle of the cycle.",
          "NCERT gives day 10 to day 17 as the time when the chance of fertilisation is very high, the fertile period.",
        ],
        answer: "From day 10 to day 17, because ovulation is expected then and it is the fertile period.",
      },
      practiceSet: [
        { prompt: "According to the WHO, reproductive health is total well-being in which four aspects of reproduction?", answer: "Physical, emotional, behavioural and social" },
        { prompt: "In which year did India start its national family planning programmes?", answer: "1951" },
        { prompt: "What are India's improved family planning programmes now called?", answer: "Reproductive and Child Health Care (RCH) programmes" },
        { prompt: "To what age did India raise the legal marriageable age of females and of males?", answer: "18 years for females and 21 years for males" },
        { prompt: "For at most how long after childbirth does lactational amenorrhoea work as a contraceptive?", answer: "Up to six months after parturition, during intense breast feeding" },
      ],
      traps: [
        {
          title: "Lactational amenorrhoea has a time limit",
          body: "It works only during **intense breast feeding** and only up to a **maximum of six months** after childbirth, not for as long as the mother feeds the baby.",
        },
        {
          title: "Few side effects, but many failures",
          body: "Natural methods use no medicine or device, so their side effects are **almost nil**. Their **chance of failure is high**, so they are not the most effective methods.",
        },
        {
          title: "Reproductive health is more than healthy organs",
          body: "The WHO definition covers **physical, emotional, behavioural and social** well-being. A statement that leaves out the behavioural or the social aspect is incomplete.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzorh-barrier-iuds",
      name: "Barriers and intra-uterine devices",
      intuition:
        "A barrier is a wall: it stops sperm before it can reach the ovum. An IUD is a small device a doctor places inside the uterus. NCERT puts IUDs into three groups by what they release: nothing, copper, or a hormone. NEET loves to give you a device name and ask which group it is in, so learn the names group by group.",
      definition:
        "Barrier methods:\n" +
        "- **Condoms** are made of thin **rubber or latex**. They cover the **penis** in the male, or the **vagina and cervix** in the female, just before coitus, so semen does not enter the female tract. **Nirodh** is a popular brand of condom for the **male**.\n" +
        "- Condoms also **protect the user from STIs and AIDS**, which is why their use has increased. Male and female condoms are **disposable**, can be **self-inserted** and give privacy to the user.\n" +
        "- **Diaphragms, cervical caps and vaults** are barriers made of **rubber**, inserted into the female tract to **cover the cervix** during coitus. They block the entry of sperms through the cervix. They are **reusable**.\n" +
        "- **Spermicidal creams, jellies and foams** are usually used along with these barriers to increase their contraceptive efficiency.\n\n" +
        "Intra-uterine devices (IUDs):\n" +
        "- Inserted by **doctors or expert nurses** into the **uterus through the vagina**.\n" +
        "- Three groups: **non-medicated** IUDs (**Lippes loop**), **copper releasing** IUDs (**CuT, Cu7, Multiload 375**) and **hormone releasing** IUDs (**Progestasert, LNG-20**).\n" +
        "- IUDs **increase phagocytosis of sperms** within the uterus. The **Cu ions** released **suppress sperm motility and the fertilising capacity** of sperms.\n" +
        "- Hormone releasing IUDs, in addition, make the **uterus unsuitable for implantation** and the **cervix hostile to the sperms**.\n" +
        "- IUDs are ideal for females who want to **delay pregnancy and/or space children**. It is one of the **most widely accepted** methods of contraception in India.",
      table: {
        columns: ["Device", "Group", "How it works"],
        rows: [
          { cells: ["Condom (Nirodh is a male brand)", "Barrier", "Thin rubber or latex sheath; stops semen entering the female tract and also protects against STIs and AIDS"] },
          { cells: ["Diaphragm, cervical cap, vault", "Barrier (rubber, reusable)", "Cover the cervix during coitus and block the entry of sperms"] },
          { cells: ["Spermicidal creams, jellies, foams", "Used with barriers", "Increase the contraceptive efficiency of the barrier"] },
          {
            cells: ["Lippes loop", "Non-medicated IUD", "Increases phagocytosis of sperms in the uterus"],
            noteAmber: "NEET 2022: Lippes loop is a non-medicated IUD, not a copper IUD or a barrier.",
            pyqExampleId: "b58f7181-46b9-4116-a902-7c420b904141",
          },
          {
            cells: ["CuT, Cu7, Multiload 375", "Copper releasing IUD", "Cu ions suppress sperm motility and fertilising capacity"],
            noteAmber: "NEET 2024: Lippes loop, Multiload 375, LNG-20 and implants were matched to non-medicated, copper, hormone and progestogens.",
            pyqExampleId: "b3a6610a-4795-427b-bc67-bb58e8c13ae1",
          },
          {
            cells: ["Progestasert, LNG-20", "Hormone releasing IUD", "Also make the uterus unsuitable for implantation and the cervix hostile to sperms"],
            noteAmber: "NEET 2021: LNG-20 was the hormone releasing IUD among CuT, Cu7 and Multiload 375.",
            pyqExampleId: "ff15f90f-7e26-4d75-99ad-64ed970e00a7",
          },
        ],
      },
      pyqExampleId: "af46535a-c543-4766-9ee2-71afd0088783",
      selfCheckExample: {
        prompt: "A copper releasing IUD and a hormone releasing IUD both sit in the uterus. Name the two extra effects that only the hormone releasing IUD has.",
        steps: [
          "All IUDs increase phagocytosis of sperms, and copper IUDs also release Cu ions that slow the sperms.",
          "NCERT adds that hormone releasing IUDs also act on the uterus and the cervix.",
        ],
        answer: "It makes the uterus unsuitable for implantation and makes the cervix hostile to the sperms.",
      },
      practiceSet: [
        { prompt: "Who inserts an IUD, and through which route into the uterus?", answer: "A doctor or an expert nurse, through the vagina" },
        { prompt: "What is a condom made of?", answer: "A thin sheath of rubber or latex" },
        { prompt: "What are spermicidal creams, jellies and foams used along with, and why?", answer: "With barriers such as diaphragms, cervical caps and vaults, to increase their contraceptive efficiency" },
        { prompt: "Which women are IUDs ideal for, according to NCERT?", answer: "Women who want to delay pregnancy and/or space their children" },
        { prompt: "Apart from preventing pregnancy, what extra protection does a condom give its user?", answer: "Protection from sexually transmitted infections and AIDS" },
      ],
      traps: [
        {
          title: "Lippes loop releases nothing",
          body: "**Lippes loop** is the **non-medicated** IUD. The **copper** IUDs are **CuT, Cu7 and Multiload 375**, and the **hormone** IUDs are **Progestasert and LNG-20**.",
        },
        {
          title: "Vaults are barriers, not IUDs",
          body: "**Diaphragms, cervical caps and vaults** are **rubber barriers** placed over the **cervix** during coitus. They are not put inside the uterus, and they are **reusable**.",
        },
        {
          title: "Nirodh is a male condom",
          body: "**Nirodh** is a popular brand of condom for the **male**. Female condoms exist, but Nirodh is not one.",
        },
        {
          title: "Only the hormone IUD acts on implantation",
          body: "Making the **uterus unsuitable for implantation** and the **cervix hostile to sperms** belongs to **hormone releasing** IUDs. Copper IUDs act by **suppressing sperm motility and fertilising capacity**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzorh-pills-surgery",
      name: "Pills, implants, emergency contraception and sterilisation",
      intuition:
        "The remaining methods work with hormones or with surgery. Pills, injections and implants carry small doses of hormones that stop the ovary from releasing an egg. Emergency methods are used after unprotected sex. Sterilisation cuts or ties the tube that carries the gametes, so it is almost permanent. NEET often mixes all of these into one match-the-columns question.",
      definition:
        "Oral pills:\n" +
        "- Contain **progestogens** alone or **progestogen with estrogen**, in small doses.\n" +
        "- Taken daily for **21 days**, starting preferably within the **first five days** of the menstrual cycle. After a **gap of 7 days** (when menstruation occurs), the same pattern is repeated.\n" +
        "- They **inhibit ovulation and implantation** and **alter the quality of cervical mucus** to prevent or slow the entry of sperms. They are very effective, have lesser side effects and are well accepted.\n" +
        "- **Saheli**, the new oral pill for females, contains a **non-steroidal** preparation. It is a **once a week** pill with very few side effects and high contraceptive value.\n\n" +
        "Injections and implants:\n" +
        "- **Progestogens** alone or with **estrogen**, given as injections or as **implants under the skin**. They work like pills, but their **effective period is much longer**.\n\n" +
        "Emergency contraception:\n" +
        "- **Progestogens**, or progestogen with estrogen, or **IUDs**, used **within 72 hours of coitus**. They avoid a possible pregnancy after rape or casual unprotected intercourse.\n\n" +
        "Surgical methods (sterilisation), a **terminal** method:\n" +
        "- They block the **transport of gametes**.\n" +
        "- **Vasectomy:** a small part of the **vas deferens** is removed or tied up through a small incision on the **scrotum**.\n" +
        "- **Tubectomy:** a small part of the **fallopian tube** is removed or tied up through a small incision in the **abdomen** or **through the vagina**.\n" +
        "- Highly effective, but **reversibility is very poor**.\n\n" +
        "A method should be chosen with qualified medical professionals. Possible ill effects of contraceptives include **nausea, abdominal pain, breakthrough bleeding, irregular menstrual bleeding or even breast cancer**.",
      table: {
        columns: ["Method", "What it is", "How it works"],
        rows: [
          {
            cells: ["Oral pills", "Progestogens, or progestogen with estrogen; 21 days, then a 7 day gap", "Inhibit ovulation and implantation; change cervical mucus"],
            noteAmber: "NEET 2022: pills were matched to inhibiting ovulation and implantation, and lactational amenorrhoea to no cycle after parturition.",
            pyqExampleId: "bfe8f851-d417-46e9-8753-4c06ef62c239",
          },
          {
            cells: ["Saheli", "Non-steroidal oral pill, once a week; from CDRI, Lucknow", "Very few side effects and high contraceptive value"],
            noteAmber: "NEET 2026: Progestasert, Multiload 375, diaphragm and Saheli were matched to hormone IUD, copper IUD, rubber barrier and oral pill.",
            pyqExampleId: "f16d13d0-46c9-491c-8a98-c231386a32e2",
          },
          { cells: ["Injections and implants", "Progestogens alone or with estrogen; implants go under the skin", "Like pills, but effective for a much longer period"] },
          { cells: ["Emergency contraception", "Progestogens, progestogen with estrogen, or IUDs", "Used within 72 hours of coitus"] },
          { cells: ["Vasectomy", "A small part of the vas deferens removed or tied, through a cut on the scrotum", "Sperm cannot be carried out; reversibility very poor"] },
          { cells: ["Tubectomy", "A small part of the fallopian tube removed or tied, through the abdomen or the vagina", "The ovum cannot pass down the tube; reversibility very poor"] },
        ],
      },
      pyqExampleId: "cdc6ef74-fd05-4b87-8cd3-c91a30726038",
      selfCheckExample: {
        prompt: "A woman starts oral contraceptive pills. For how many days does she take them, when should she start, and how long is the break before the next course?",
        steps: [
          "NCERT says pills are taken daily for 21 days.",
          "She should start preferably within the first five days of the menstrual cycle.",
          "A gap of 7 days follows, during which menstruation occurs, and then the pattern repeats.",
        ],
        answer: "21 days, starting within the first five days of the cycle, then a 7 day gap.",
      },
      practiceSet: [
        { prompt: "How often is the Saheli pill taken?", answer: "Once a week" },
        { prompt: "Within how many hours of coitus must emergency contraception be used?", answer: "Within 72 hours" },
        { prompt: "How do injections and implants differ from pills in how long they work?", answer: "They work the same way, but their effective period is much longer" },
        { prompt: "Why is sterilisation the last choice for many couples, even though it is highly effective?", answer: "Its reversibility is very poor" },
        { prompt: "Name three possible ill effects of contraceptives that NCERT lists.", answer: "Any three of nausea, abdominal pain, breakthrough bleeding, irregular menstrual bleeding and breast cancer" },
      ],
      traps: [
        {
          title: "Saheli is non-steroidal",
          body: "**Saheli** is a **non-steroidal** oral pill taken **once a week**. It is not a daily steroid pill and not an IUD.",
        },
        {
          title: "Tubectomy does not stop egg formation",
          body: "Tubectomy removes or ties a small part of the **fallopian tube**, so the ovum cannot meet the sperm. The **ovary still forms eggs**; only their transport is blocked.",
        },
        {
          title: "Emergency contraception includes IUDs",
          body: "Within **72 hours** of coitus, **IUDs** work as emergency contraceptives too, not only progestogen or progestogen with estrogen.",
        },
        {
          title: "Pills do more than stop ovulation",
          body: "Pills **inhibit ovulation and implantation** and also **alter the cervical mucus** to keep sperms out. Increasing **phagocytosis of sperms** is what IUDs do.",
        },
      ],
    },
  ],
};
