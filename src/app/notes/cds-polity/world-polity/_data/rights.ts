import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_WO_RIGHTS_NOTE: SubtopicNote = {
  subtopicName: "Human Rights and the Law of the Sea",
  title: "Human Rights and the Law of the Sea",
  oneLineDefinition:
    "The Universal Declaration and the treaties that followed it, the Human Rights Council, and the sea zones a coastal State controls under UNCLOS.",
  whyItMatters:
    "Seven CDS questions: one EASY, four MODERATE and two HARD. The human rights items turn on what a document actually says or whether it binds anyone, and the sea items on distances and who may do what in which zone.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolwo-udhr",
      name: "The Universal Declaration of Human Rights",
      intuition:
        "After the Second World War the UN wrote down, in one list, the rights every person has. That list is the Universal Declaration. It is a declaration, not a treaty, but most later human rights law and many national constitutions, India's included, borrow from it.",
      definition:
        "The facts:\n" +
        "- Adopted by the **UN General Assembly** at **Paris on 10 December 1948**; the date is kept as **Human Rights Day**. It has **30 articles**.\n" +
        "- The drafting commission was chaired by **Eleanor Roosevelt**. India's **Hansa Mehta** had \"all men are born free and equal\" changed to \"**all human beings** are born free and equal\".\n" +
        "- It is a **declaration**, not a treaty, so it does not bind States by itself. Many of India's **Fundamental Rights** are close to its articles.\n" +
        "- **Article 14**: the right to **seek and enjoy asylum** from persecution in other countries, except for prosecutions that arise from **non-political crimes**.\n" +
        "- **Article 15**: the right to a **nationality**; no one may be arbitrarily deprived of it **or denied the right to change it**.\n" +
        "- **Article 17**: the right to **own property**, alone or with others; no one may be arbitrarily deprived of it.",
      table: {
        columns: ["Article", "Right"],
        rows: [
          { cells: ["1", "All human beings are born free and equal in dignity and rights"] },
          { cells: ["14", "To seek asylum from persecution (not for non-political crimes)"] },
          {
            cells: ["15", "To a nationality, and to change it; no arbitrary deprivation"],
            noteAmber: "CDS 2024 (I): the right to change nationality is protected, not an exception.",
            pyqExampleId: "122ac236-f205-42dc-8fe1-d440afd0ce60",
          },
          { cells: ["17", "To own property"] },
          { cells: ["19", "Freedom of opinion and expression"] },
          { cells: ["26", "To education"] },
        ],
      },
      pyqExampleId: "ca61a173-4155-4e0a-bdd1-46243f857ddf",
      selfCheckExample: {
        prompt: "A man flees his country after being charged with ordinary theft and asks another country for asylum. Does the Universal Declaration's right of asylum cover him?",
        steps: [
          "Article 14 protects people fleeing persecution.",
          "It cannot be used for prosecutions that arise from non-political crimes, and theft is one.",
        ],
        answer: "No. The right of asylum does not cover prosecution for a non-political crime.",
      },
      practiceSet: [
        { prompt: "Who chaired the commission that drafted the Universal Declaration?", answer: "Eleanor Roosevelt" },
        { prompt: "Which Indian delegate had 'all men' changed to 'all human beings' in the Declaration?", answer: "Hansa Mehta" },
        { prompt: "Which article of the Declaration protects freedom of opinion and expression?", answer: "Article 19" },
        { prompt: "Is the Universal Declaration a treaty that binds States?", answer: "No. It is a General Assembly declaration" },
      ],
      traps: [
        {
          title: "Property IS in the Universal Declaration",
          body: "Article 17 protects the right to own property. India removed property from its Fundamental Rights in 1978 (44th Amendment), but the Declaration still has it.",
        },
        {
          title: "Changing nationality is a right, not an exception",
          body: "Article 15 says no one shall be arbitrarily deprived of nationality **nor denied the right to change** it. Both halves are protected.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolwo-treaties",
      name: "Human rights treaties and the Human Rights Council",
      intuition:
        "A declaration states ideals; a treaty binds the States that join it. So the question 'is this a treaty?' comes down to the word in its name: covenants and conventions bind, declarations do not.",
      definition:
        "The main instruments:\n" +
        "- **International Covenant on Civil and Political Rights** (ICCPR) and **International Covenant on Economic, Social and Cultural Rights** (ICESCR): adopted **1966**, in force **1976**. India acceded to both in **1979**.\n" +
        "- The Universal Declaration and the two Covenants together form the **International Bill of Human Rights**.\n" +
        "- Core treaties also include **CEDAW** (women, **1979**), the **Convention on the Rights of the Child** (1989) and the **Convention on the Rights of Persons with Disabilities** (**2006**).\n" +
        "- The **Declaration on the Right to Development** (**1986**) is a General Assembly **declaration**, not a treaty.\n" +
        "- The **Human Rights Council** (**2006**, Geneva) is a UN body, not a treaty. It has **47 member States elected by the General Assembly** for three-year terms, and it **replaced the Commission on Human Rights**.",
      table: {
        columns: ["Instrument or body", "Year", "What it is"],
        rows: [
          { cells: ["ICCPR and ICESCR", "1966", "Binding covenants, in force from 1976"] },
          { cells: ["CEDAW", "1979", "Binding treaty on discrimination against women"] },
          { cells: ["Convention on the Rights of Persons with Disabilities", "2006", "Binding treaty"] },
          {
            cells: ["Declaration on the Right to Development", "1986", "A General Assembly declaration, not a treaty"],
            pyqExampleId: "ad779e53-9f46-4457-90d8-29124fa1b1ea",
          },
          { cells: ["Human Rights Council", "2006", "UN body of 47 elected States; replaced the Commission on Human Rights"] },
        ],
      },
      pyqExampleId: "16816686-bbb5-430a-b63d-71d56c33b366",
      selfCheckExample: {
        prompt: "What name is given to the Universal Declaration of Human Rights and the two 1966 Covenants taken together?",
        steps: ["The Declaration states the rights; the two Covenants make them binding.", "Together they are treated as one bill of rights for the world."],
        answer: "The International Bill of Human Rights.",
      },
      practiceSet: [
        { prompt: "Which convention protects women against discrimination, and in which year was it adopted?", answer: "CEDAW, 1979" },
        { prompt: "In which year did the two 1966 Covenants come into force?", answer: "1976" },
        { prompt: "In which city does the Human Rights Council meet?", answer: "Geneva" },
        { prompt: "Is a declaration of the General Assembly binding like a treaty?", answer: "No. Only treaties such as covenants and conventions bind the States that join them" },
      ],
      traps: [
        {
          title: "The Council is 47 States, not every member",
          body: "The General Assembly includes all UN members. The **Human Rights Council** has only **47** members, elected by the Assembly.",
        },
        {
          title: "A declaration is not a treaty",
          body: "The Declaration on the Right to Development (1986) and the Universal Declaration (1948) are not treaties. Covenants and conventions are.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolwo-sea",
      name: "Sea zones under UNCLOS",
      intuition:
        "The sea next to a country is cut into belts measured from the coast's baseline. The nearer the belt, the more the coastal State controls. Far out, in the EEZ, it owns the resources but cannot stop other ships passing.",
      definition:
        "The UN Convention on the Law of the Sea (**UNCLOS**) was signed in **1982** and came into force in **1994**. India's own law is the Maritime Zones Act of **1976**. One **nautical mile** is about **1.852 km**.\n" +
        "- **Territorial sea**: up to **12 nautical miles**. Full sovereignty, but foreign ships keep the right of **innocent passage**.\n" +
        "- **Contiguous zone**: up to **24 nautical miles**. The State can enforce **customs, tax, immigration and sanitary** laws.\n" +
        "- **Exclusive Economic Zone (EEZ)**: up to **200 nautical miles**. **Sovereign rights over resources**: exploring, exploiting, conserving and managing fish, minerals and energy. Other States keep the **freedom of navigation, overflight and laying submarine cables and pipelines**.\n" +
        "- Beyond the EEZ lie the **high seas**, open to all.",
      table: {
        columns: ["Zone", "Width from the baseline", "What the coastal State controls"],
        rows: [
          {
            cells: ["Territorial sea", "12 nautical miles", "Full sovereignty; foreign ships have innocent passage"],
            pyqExampleId: "721e528f-20de-463d-b430-186e40ffbba7",
          },
          { cells: ["Contiguous zone", "24 nautical miles", "Customs, tax, immigration and sanitary laws"] },
          { cells: ["Exclusive Economic Zone", "200 nautical miles", "Resources only; navigation and cables stay free for all"] },
          { cells: ["High seas", "Beyond the EEZ", "No single State; open to all"] },
        ],
      },
      pyqExampleId: "19f38e09-d125-49ad-826b-76fb7045f977",
      selfCheckExample: {
        prompt: "How far from the baseline does a coastal State's contiguous zone reach, and which laws can it enforce there?",
        steps: ["The contiguous zone runs on from the territorial sea.", "It is limited to a few kinds of law."],
        answer: "24 nautical miles; customs, tax, immigration and sanitary laws.",
      },
      practiceSet: [
        { prompt: "About how many kilometres is one nautical mile?", answer: "About 1.852 km" },
        { prompt: "In which year was UNCLOS signed?", answer: "1982" },
        { prompt: "How far does an Exclusive Economic Zone reach from the baseline?", answer: "200 nautical miles" },
        { prompt: "What right do foreign ships keep in a State's territorial sea?", answer: "Innocent passage" },
      ],
      traps: [
        {
          title: "The EEZ gives resources, not the sea lanes",
          body: "In its EEZ a coastal State alone may fish, mine and draw energy. Navigation and laying submarine cables stay **free for every State**.",
        },
        {
          title: "Territorial sea is 12, not 24",
          body: "**12 nautical miles** is the territorial sea. 24 is where the contiguous zone ends, and 200 is the EEZ.",
        },
      ],
    },
  ],
};
