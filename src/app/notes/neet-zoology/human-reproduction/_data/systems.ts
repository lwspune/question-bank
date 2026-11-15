import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_HR_SYSTEMS_NOTE: SubtopicNote = {
  subtopicName: "Reproductive Systems",
  title: "Reproductive Systems",
  oneLineDefinition:
    "The organs of the human male and female reproductive systems in NCERT order: the testes and their ducts and glands, the ovaries, oviducts, uterus and external genitalia, and the mammary glands.",
  whyItMatters:
    "Six NEET questions from 2023 to 2026, five of them from 2024 or later. Re-NEET 2024 alone asked two: the female external genitalia as a match-the-columns and the route milk takes out of the mammary gland.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzohr-male-system",
      name: "The male reproductive system",
      intuition:
        "Think of the male system as a factory and a delivery line. The testes make the sperms inside tiny coiled tubes. A chain of ducts then stores the sperms and carries them out, and three kinds of glands add the fluid they swim in. Learn the ducts in the exact order a sperm passes through them.",
      definition:
        "The testes:\n" +
        "- The testes lie **outside the abdominal cavity** in a pouch called the **scrotum**, which keeps them about **2 to 2.5 °C lower** than the internal body temperature. This lower temperature is needed for sperm formation.\n" +
        "- An adult testis is oval, about **4 to 5 cm long and 2 to 3 cm wide**. It has about **250 compartments called testicular lobules**, and each lobule holds **one to three** highly coiled **seminiferous tubules**, where sperms are made.\n" +
        "- Each seminiferous tubule is lined by **male germ cells (spermatogonia)**, which form sperms, and **Sertoli cells**, which nourish the germ cells.\n" +
        "- The **interstitial spaces** outside the tubules hold blood vessels and the **Leydig (interstitial) cells**, which make the male hormones, the **androgens**.\n\n" +
        "Ducts, glands and the penis:\n" +
        "- Sperms leave by **seminiferous tubules, rete testis, vasa efferentia, epididymis, vas deferens, ejaculatory duct and urethra**. The epididymis lies along the back of each testis. The **vas deferens** loops over the urinary bladder, **receives a duct from the seminal vesicle** and opens into the urethra as the **ejaculatory duct**.\n" +
        "- The urethra runs from the urinary bladder through the penis to its opening, the **urethral meatus**. The enlarged tip of the penis is the **glans penis**, covered by a loose fold of skin, the **foreskin**.\n" +
        "- The accessory glands are the **paired seminal vesicles**, **one prostate** and the **paired bulbourethral glands**. Their secretions form the **seminal plasma**, rich in **fructose, calcium and some enzymes**. The bulbourethral glands also help lubricate the penis.",
      table: {
        columns: ["Part", "What it is", "Job"],
        rows: [
          { cells: ["Scrotum", "Skin pouch outside the abdomen", "Keeps the testes 2 to 2.5 °C cooler than the body"] },
          { cells: ["Seminiferous tubules", "One to three coiled tubules in each of about 250 lobules", "Sperm formation"] },
          { cells: ["Sertoli cells", "Lining cells inside the seminiferous tubules", "Nourish the germ cells"] },
          { cells: ["Leydig cells", "Interstitial cells outside the tubules", "Make androgens"] },
          {
            cells: ["Rete testis, vasa efferentia, epididymis", "The first ducts after the tubules, in that order", "Store and carry sperms"],
            noteAmber: "Re-NEET 2026: rete testis, epididymis and vasa efferentia are male parts; the infundibulum is part of the female oviduct.",
          },
          {
            cells: ["Vas deferens", "Duct that loops over the urinary bladder", "Joins the duct of the seminal vesicle and opens into the urethra as the ejaculatory duct"],
          },
          { cells: ["Seminal vesicles (paired), prostate (single), bulbourethral glands (paired)", "Male accessory glands", "Make seminal plasma, rich in fructose, calcium and enzymes"] },
        ],
      },
      pyqExampleId: "27221dde-d609-45bb-8470-b676a6367648",
      selfCheckExample: {
        prompt: "Put these in the order a sperm passes through them: vas deferens, rete testis, epididymis, vasa efferentia.",
        steps: [
          "Sperms leave the seminiferous tubules through the rete testis.",
          "The rete testis opens into the vasa efferentia, which open into the epididymis.",
          "The epididymis leads into the vas deferens.",
        ],
        answer: "Rete testis, vasa efferentia, epididymis, vas deferens.",
      },
      practiceSet: [
        { prompt: "Which cells of the testis make androgens, and where do they lie?", answer: "The Leydig (interstitial) cells, in the interstitial spaces outside the seminiferous tubules" },
        { prompt: "About how many testicular lobules does a human testis have, and how many seminiferous tubules does each hold?", answer: "About 250 lobules, each with one to three seminiferous tubules" },
        { prompt: "Name the three kinds of male accessory glands and say which of them are paired.", answer: "Seminal vesicles (paired), prostate (single) and bulbourethral glands (paired)" },
        { prompt: "Why do the human testes lie in the scrotum, outside the abdominal cavity?", answer: "The scrotum keeps them 2 to 2.5 °C below the internal body temperature, which sperm formation needs" },
        { prompt: "What is the opening of the urethra at the tip of the penis called?", answer: "The urethral meatus" },
      ],
      traps: [
        {
          title: "Sertoli cells nourish, Leydig cells make hormones",
          body: "**Sertoli cells** are inside the seminiferous tubules and **nourish the germ cells**. **Leydig cells** are outside the tubules, in the interstitial spaces, and **secrete androgens**.",
        },
        {
          title: "The infundibulum is female",
          body: "**Rete testis, vasa efferentia, epididymis and vas deferens** are the male ducts. The **infundibulum** is the funnel-shaped end of the **female oviduct** near the ovary.",
        },
        {
          title: "The vas deferens does not open straight into the urethra",
          body: "The vas deferens first **receives the duct of the seminal vesicle**; the joined duct, the **ejaculatory duct**, opens into the urethra.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzohr-female-system",
      name: "The female reproductive system",
      intuition:
        "The ovary makes the egg, the oviduct catches it and carries it, and the uterus is where a baby grows. NEET asks for the parts of each: the four parts of the oviduct from the ovary end, the three layers of the uterine wall, and the five parts of the external genitalia with what each one looks like.",
      definition:
        "Ovaries and oviducts:\n" +
        "- The **ovaries** are the primary female sex organs. They make the **ovum** and several steroid hormones. Each is **2 to 4 cm** long and is held to the pelvic wall and the uterus by **ligaments**. Inside, the ovarian stroma has an outer **cortex** and an inner **medulla**.\n" +
        "- Each **oviduct (fallopian tube)** is **10 to 12 cm** long. From the ovary end its parts are: the funnel-shaped **infundibulum**, whose edges carry finger-like **fimbriae** that **collect the ovum after ovulation**; the wider **ampulla**; and the last, narrow **isthmus**, which joins the uterus.\n\n" +
        "Uterus, cervix and vagina:\n" +
        "- The **uterus (womb)** is single and shaped like an **inverted pear**. It opens into the vagina through the narrow **cervix**. The cavity of the cervix, the **cervical canal**, together with the **vagina** forms the **birth canal**.\n" +
        "- The uterine wall has three layers: the thin outer **perimetrium**, the thick middle **myometrium** of smooth muscle, which **contracts strongly during delivery**, and the inner glandular **endometrium**, which **changes in a cycle during the menstrual cycle**.\n\n" +
        "External genitalia:\n" +
        "- **Mons pubis:** a cushion of fatty tissue covered by skin and pubic hair.\n" +
        "- **Labia majora:** fleshy folds of tissue that extend down from the mons pubis and surround the vaginal opening. **Labia minora:** paired folds under the labia majora.\n" +
        "- **Hymen:** a membrane that often partly covers the opening of the vagina.\n" +
        "- **Clitoris:** a tiny finger-like structure at the upper junction of the two labia minora, above the urethral opening.\n" +
        "- The hymen is often torn during the first coitus, but it can also break from a sudden fall or jolt, a vaginal tampon, or sports such as horse riding and cycling, and in some women it stays even after coitus. So **its presence or absence is not a reliable sign of virginity**.",
      table: {
        columns: ["Part", "Feature NCERT gives", "Note"],
        rows: [
          {
            cells: ["Infundibulum", "Funnel-shaped part of the oviduct nearest the ovary", "Its fimbriae collect the ovum after ovulation"],
          },
          { cells: ["Ampulla", "Wider part of the oviduct after the infundibulum", "Part of the oviduct"] },
          {
            cells: ["Isthmus", "Last, narrow part of the oviduct", "Joins the uterus"],
            noteAmber: "NEET 2024: infundibulum, ampulla and isthmus are parts of the fallopian tube; the uterine fundus is not.",
            pyqExampleId: "d9c2fbda-489d-415a-9bc5-2d18f036bf71",
          },
          { cells: ["Myometrium", "Thick middle layer of smooth muscle in the uterine wall", "Contracts strongly during delivery"] },
          { cells: ["Endometrium", "Inner glandular layer lining the uterine cavity", "Changes in a cycle during the menstrual cycle"] },
          { cells: ["Mons pubis", "Cushion of fatty tissue covered by skin and pubic hair", "External genitalia"] },
          { cells: ["Labia majora", "Fleshy folds from the mons pubis that surround the vaginal opening", "External genitalia"] },
          { cells: ["Clitoris", "Tiny finger-like structure at the upper junction of the labia minora", "Lies above the urethral opening"] },
          { cells: ["Hymen", "Membrane partly covering the vaginal opening", "Not a reliable sign of virginity"] },
        ],
      },
      pyqExampleId: "b4cb9376-8007-44dd-99f0-be2f32f188c5",
      selfCheckExample: {
        prompt: "Name the three layers of the wall of the human uterus from outside to inside, and say which one contracts during delivery.",
        steps: [
          "The outer layer is the thin, membranous perimetrium.",
          "The middle layer is the thick muscular myometrium; the inner layer is the glandular endometrium.",
          "The myometrium is the smooth muscle layer, so it gives the strong contractions of delivery.",
        ],
        answer: "Perimetrium, myometrium, endometrium; the myometrium contracts during delivery.",
      },
      practiceSet: [
        { prompt: "Which finger-like projections of the oviduct help collect the ovum after ovulation?", answer: "The fimbriae, on the edges of the infundibulum" },
        { prompt: "What two parts together form the birth canal?", answer: "The cervical canal and the vagina" },
        { prompt: "How long is each human fallopian tube, according to NCERT?", answer: "10 to 12 cm" },
        { prompt: "Which layer of the uterine wall undergoes cyclical changes during the menstrual cycle?", answer: "The endometrium" },
        { prompt: "What are the paired folds of tissue lying under the labia majora called?", answer: "The labia minora" },
      ],
      traps: [
        {
          title: "The fundus belongs to the uterus",
          body: "The oviduct has the **infundibulum, ampulla and isthmus**. The **fundus** is the dome-shaped top of the **uterus**, not part of the fallopian tube.",
        },
        {
          title: "The isthmus, not the ampulla, joins the uterus",
          body: "Going from the ovary: infundibulum, then the **wider ampulla**, then the **narrow isthmus**, which joins the uterus.",
        },
        {
          title: "The hymen proves nothing",
          body: "A torn hymen does not mean coitus, and an intact one does not rule it out. NCERT says **the hymen is not a reliable indicator of virginity**, so a statement that it tears only during the first coitus is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzohr-mammary",
      name: "The mammary gland",
      intuition:
        "Milk is made in tiny sacs and then flows out through tubes that keep joining into wider ones, like small streams joining into a river. Learn the five names in the order the milk meets them.",
      definition:
        "- The mammary glands are **paired** and hold glandular tissue and a variable amount of fat.\n" +
        "- The glandular tissue of each breast is divided into **15 to 20 mammary lobes**, each holding clusters of cells called **alveoli**.\n" +
        "- The cells of the alveoli **secrete milk**, which is stored in the cavities (lumens) of the alveoli.\n" +
        "- The milk route: **mammary alveolus, mammary tubule, mammary duct, mammary ampulla, lactiferous duct**. The alveoli open into **mammary tubules**; the tubules of each lobe join to form a **mammary duct**; several mammary ducts join to form a wider **mammary ampulla**, which is connected to the **lactiferous duct** through which milk is sucked out.",
      table: {
        columns: ["Step", "Structure", "What happens there"],
        rows: [
          { cells: ["1", "Mammary alveolus", "Cells secrete milk, stored in the lumen"] },
          { cells: ["2", "Mammary tubule", "The alveoli open into these"] },
          { cells: ["3", "Mammary duct", "Formed by the tubules of one lobe joining"] },
          { cells: ["4", "Mammary ampulla", "Wider part formed by several mammary ducts joining"] },
          { cells: ["5", "Lactiferous duct", "Milk is sucked out through it"] },
        ],
      },
      pyqExampleId: "a70f4521-e170-45f7-9f90-14e3d5176ba1",
      selfCheckExample: {
        prompt: "Into how many mammary lobes is the glandular tissue of each human breast divided, and what clusters of cells does each lobe hold?",
        steps: [
          "NCERT divides the glandular tissue of each breast into 15 to 20 mammary lobes.",
          "Each lobe holds clusters of cells called alveoli, which secrete milk.",
        ],
        answer: "15 to 20 lobes, each with clusters of alveoli.",
      },
      practiceSet: [
        { prompt: "Which mammary structure is formed when several mammary ducts join?", answer: "The mammary ampulla" },
        { prompt: "Through which duct is milk finally sucked out of the breast?", answer: "The lactiferous duct" },
        { prompt: "Where is milk stored right after the alveolar cells secrete it?", answer: "In the cavities (lumens) of the alveoli" },
      ],
      traps: [
        {
          title: "The ampulla comes before the lactiferous duct",
          body: "Milk goes from the **mammary ampulla** into the **lactiferous duct**, which is the last part of the route. The order is alveolus, tubule, duct, ampulla, lactiferous duct.",
        },
        {
          title: "Tubules come before the duct",
          body: "The alveoli open into **mammary tubules**, and the tubules join to form the **mammary duct**. A route that puts the duct before the tubules is reversed.",
        },
      ],
    },
  ],
};
