import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_SO_FROG_NOTE: SubtopicNote = {
  subtopicName: "Frog",
  title: "Frog",
  oneLineDefinition:
    "The frog's outer body and the difference between male and female, then its digestion, breathing, heart and portal systems, excretion, brain and nerves, sense organs and reproduction.",
  whyItMatters:
    "Eight NEET questions, all from NEET 2025, NEET 2026 and Re-NEET 2026. Three facts came back twice each: the copulatory pad on the first digit of the male's fore limb, the ten pairs of cranial nerves, and the hepatic and renal portal systems. Re-NEET 2026 also asked what a frog breathes with in water: its skin.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzoso-frog-morphology",
      name: "Frog: the outer body and the two sexes",
      intuition:
        "A frog lives on land and in water and changes with its surroundings. Its skin stays moist and slippery, it never drinks but soaks up water through its skin, and it has no neck and no tail. A male carries two extra things a female lacks: a vocal sac for calling, and a rough pad on the first finger of each fore limb for holding the female.",
      definition:
        "NCERT names *Rana tigrina* as the most common Indian frog.\n" +
        "- Frogs are **cold-blooded (poikilotherms)**: their body temperature varies with the surroundings. They can **change colour** to hide from enemies (camouflage). They escape summer heat and winter cold by **aestivation** (summer sleep) and **hibernation** (winter sleep).\n" +
        "- The skin is **smooth and slippery** because of mucus and is always kept moist. The dorsal side is **olive green with dark irregular spots**; the ventral side is **uniformly pale yellow**. A frog **never drinks water** but **absorbs it through the skin**.\n" +
        "- The body is divided into **head and trunk**; there is **no neck and no tail**.\n" +
        "- Above the mouth are a pair of **nostrils**. The **eyes bulge** and are covered by a **nictitating membrane** that protects them in water. On either side of the eyes is a membranous **tympanum** (ear) that receives sound.\n" +
        "- **Fore limbs end in four digits; hind limbs end in five** and are larger and more muscular. The feet have **webbed digits** for swimming.\n" +
        "- **Sexual dimorphism:** males have sound-producing **vocal sacs** and a **copulatory pad on the first digit of the fore limbs**; both are absent in females.",
      table: {
        columns: ["Feature", "Male", "Female"],
        rows: [
          { cells: ["Vocal sacs", "Present", "Absent"] },
          {
            cells: ["Copulatory pad on the first digit of the fore limb", "Present", "Absent"],
            noteAmber: "NEET 2025: the male's copulatory pad is on the first digit of the fore limb.",
            pyqExampleId: "f8ae9c6f-7138-4557-85d2-1005d14a675e",
          },
          { cells: ["Bulging eyes with a nictitating membrane", "Present", "Present"] },
          { cells: ["Webbed digits in the feet", "Present", "Present"] },
          { cells: ["Olive green skin with dark irregular spots on the back", "Present", "Present"] },
          { cells: ["Digits on the fore limb and the hind limb", "Four and five", "Four and five"] },
        ],
      },
      pyqExampleId: "3c682623-0b46-47d3-9802-84977b3a5f82",
      selfCheckExample: {
        prompt: "A frog has no neck and no tail. Into which two parts is its body divided?",
        steps: [
          "With no neck, the head joins the body directly.",
          "NCERT divides the frog's body into the head and the trunk.",
        ],
        answer: "The head and the trunk.",
      },
      practiceSet: [
        { prompt: "How many digits end the fore limb of a frog, and how many end the hind limb?", answer: "Four on the fore limb and five on the hind limb" },
        { prompt: "Which membrane protects the eyes of a frog while it is in water?", answer: "The nictitating membrane" },
        { prompt: "What are the summer sleep and the winter sleep of a frog called?", answer: "Aestivation (summer) and hibernation (winter)" },
        { prompt: "How does a frog take in water, since it never drinks?", answer: "It absorbs water through its skin" },
        { prompt: "What colour is the ventral side of a frog?", answer: "Uniformly pale yellow" },
      ],
      traps: [
        {
          title: "The copulatory pad is on the fore limb",
          body: "The male's **copulatory pad** is on the **first digit of the fore limb**, not on the hind limb and not on the second digit.",
        },
        {
          title: "Some features are shared by both sexes",
          body: "**Bulging eyes, webbed feet and olive green spotted skin** are found in **both** male and female frogs. Only the **vocal sacs** and the **copulatory pad** mark the male.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoso-frog-systems",
      name: "Frog: digestion, breathing, blood and excretion",
      intuition:
        "Inside, the frog has a short gut because it eats meat. It breathes through its skin in water, and through its skin, mouth cavity and lungs on land. Its heart has three chambers, and two special veins carry blood from one organ to another before it returns to the heart. Its kidneys make urea.",
      definition:
        "Digestion:\n" +
        "- The alimentary canal is **short** because frogs are **carnivores**, so the intestine is reduced. Mouth, buccal cavity, pharynx, oesophagus, stomach, intestine, rectum and finally the **cloaca**.\n" +
        "- Food is caught by the **bilobed tongue**. The stomach walls secrete **HCl and gastric juices**; the partly digested **chyme** passes to the **duodenum**, which gets **bile** from the gall bladder and **pancreatic juice** through a **common bile duct**. Digested food is absorbed by the **villi and microvilli** of the intestine.\n\n" +
        "Respiration:\n" +
        "- **In water**, the **skin** alone is the respiratory organ (**cutaneous respiration**); dissolved oxygen is exchanged by diffusion.\n" +
        "- **On land**, the **buccal cavity, skin and lungs** all act as respiratory organs. Breathing by lungs is **pulmonary respiration**; the lungs are a pair of elongated, pink, sac-like structures in the upper trunk (thorax).\n" +
        "- During **aestivation and hibernation**, gas exchange is through the **skin**.\n\n" +
        "Circulation:\n" +
        "- **Closed** type, and frogs also have a **lymphatic system** (lymph, lymph channels and lymph nodes).\n" +
        "- The heart has **three chambers, two atria and one ventricle**, covered by the **pericardium**. A triangular **sinus venosus** joins the **right atrium** and receives blood through the major veins, the **vena cava**. The ventricle opens into a sac-like **conus arteriosus** on the ventral side.\n" +
        "- Special venous links: the **hepatic portal system** joins the **liver and intestine**; the **renal portal system** joins the **kidney and the lower parts of the body**.\n" +
        "- Frog **RBCs are nucleated** and contain haemoglobin. Lymph lacks a few proteins and the RBCs.\n\n" +
        "Excretion:\n" +
        "- A pair of compact, dark red, bean-like **kidneys**, with **ureters, cloaca and urinary bladder**. Each kidney is made of **uriniferous tubules (nephrons)**.\n" +
        "- In **males**, the ureters act as **urinogenital ducts** opening into the cloaca. In **females**, the **ureters and oviducts open separately** into the cloaca.\n" +
        "- The frog excretes **urea**, so it is **ureotelic**.",
      table: {
        columns: ["System", "Key NCERT fact"],
        rows: [
          { cells: ["Gut", "Short, because the frog is a carnivore; ends in the cloaca"] },
          {
            cells: ["Respiration in water", "Skin only (cutaneous)"],
            noteAmber: "NEET 2025: 'in water by skin and buccal cavity' was false; on land the skin, buccal cavity and lungs is true.",
            pyqExampleId: "497c11a3-536c-46cc-874a-31ae2b054701",
          },
          { cells: ["Respiration on land", "Skin, buccal cavity and lungs"] },
          {
            cells: ["Heart", "Two atria, one ventricle; sinus venosus joins the right atrium and receives the vena cava"],
            noteAmber: "NEET 2025: the vena cava carries deoxygenated blood from the body to the heart.",
            pyqExampleId: "3a45525c-663a-4bcb-812c-a848563ff4b3",
          },
          { cells: ["Hepatic portal system", "Joins the liver and the intestine"] },
          { cells: ["Renal portal system", "Joins the kidney and the lower parts of the body"] },
          { cells: ["Excretion", "Kidneys of nephrons; urea, so ureotelic"] },
        ],
      },
      pyqExampleId: "07053347-9bf6-4f43-80fd-5d07e5275a42",
      selfCheckExample: {
        prompt: "During hibernation a frog is buried and still. How does it exchange gases then?",
        steps: [
          "During aestivation and hibernation the lungs are not used for breathing.",
          "NCERT says gaseous exchange then takes place through the skin.",
        ],
        answer: "Through its skin.",
      },
      practiceSet: [
        { prompt: "Why is the alimentary canal of a frog short?", answer: "Because frogs are carnivores, so the intestine is reduced" },
        { prompt: "What nitrogenous waste does a frog excrete, and what does that make it?", answer: "Urea; it is ureotelic" },
        { prompt: "Into which sac-like structure does the ventricle of a frog open?", answer: "The conus arteriosus, on the ventral side of the heart" },
        { prompt: "Are the red blood cells of a frog nucleated?", answer: "Yes" },
        { prompt: "In a male frog, what do the ureters act as?", answer: "Urinogenital ducts, opening into the cloaca" },
      ],
      traps: [
        {
          title: "In water, the frog breathes by skin alone",
          body: "Only **on land** do the **buccal cavity and lungs** join the skin. In water, respiration is **cutaneous** only.",
        },
        {
          title: "Renal portal is kidney and lower body",
          body: "The **hepatic portal system** links the **liver and intestine**. The **renal portal system** links the **kidney and the lower parts of the body**, not the liver.",
        },
        {
          title: "The sinus venosus joins the right atrium",
          body: "The triangular **sinus venosus** opens into the **right** atrium. The ventricle opens into the **conus arteriosus**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoso-frog-control",
      name: "Frog: nerves, sense organs and reproduction",
      intuition:
        "The frog's brain sits in a bony box and has three parts, each with set lobes. Ten pairs of nerves leave the brain. Its sense organs are simple except for the eyes and the inner ears. Male and female organs both empty into the cloaca, and the eggs are fertilised outside the body, in water.",
      definition:
        "Control and coordination:\n" +
        "- Both the **neural system** and **endocrine glands** are well developed. The endocrine glands are the **pituitary, thyroid, parathyroid, thymus, pineal body, pancreatic islets, adrenals and gonads**.\n" +
        "- The nervous system has a **central** part (brain and spinal cord), a **peripheral** part (cranial and spinal nerves) and an **autonomic** part (sympathetic and parasympathetic).\n" +
        "- **Ten pairs of cranial nerves** arise from the brain.\n" +
        "- The brain is enclosed in a bony **brain box (cranium)** and has three parts. The **forebrain** has the **olfactory lobes**, the paired **cerebral hemispheres** and the unpaired **diencephalon**. The **midbrain** has a pair of **optic lobes**. The **hindbrain** has the **cerebellum and medulla oblongata**. The medulla passes out through the **foramen magnum** and continues as the spinal cord.\n\n" +
        "Sense organs:\n" +
        "- Touch (**sensory papillae**), taste (**taste buds**), smell (**nasal epithelium**), vision (**eyes**) and hearing (**tympanum with internal ears**). Only the **eyes and internal ears** are well organised; the rest are cell clusters around nerve endings.\n" +
        "- The eyes are a pair of spherical **simple eyes** in the orbits of the skull. There is **no external ear**; only the tympanum shows. The ear works for **hearing and balance**.\n\n" +
        "Reproduction:\n" +
        "- **Male:** a pair of yellowish, ovoid **testes** held to the upper part of the kidneys by a double fold of peritoneum, the **mesorchium**. **10 to 12 vasa efferentia** arise from the testes, enter the kidneys and open into **Bidder's canal**, which leads to the urinogenital duct and the cloaca. The **cloaca** passes faeces, urine and sperms out.\n" +
        "- **Female:** a pair of **ovaries** near the kidneys with **no functional connection** to them. A pair of **oviducts** opens **separately** into the cloaca. A mature female lays **2500 to 3000 ova** at a time.\n" +
        "- **Fertilisation is external**, in water. Development has a larval stage, the **tadpole**, which undergoes **metamorphosis** into the adult.",
      table: {
        columns: ["Part", "What it holds or does"],
        rows: [
          {
            cells: ["Cranial nerves", "Ten pairs arise from the brain"],
            noteAmber: "Re-NEET 2026: frogs have ten pairs of cranial nerves.",
            pyqExampleId: "7afb1600-4584-48f0-8210-df55c662e627",
          },
          { cells: ["Forebrain", "Olfactory lobes, paired cerebral hemispheres, unpaired diencephalon"] },
          { cells: ["Midbrain", "A pair of optic lobes"] },
          { cells: ["Hindbrain", "Cerebellum and medulla oblongata"] },
          { cells: ["Ear", "No external ear; tympanum and internal ear; hearing and balance"] },
          { cells: ["Testes", "Held to the kidneys by the mesorchium; 10 to 12 vasa efferentia open into Bidder's canal"] },
          { cells: ["Ovaries and oviducts", "No functional link with the kidneys; oviducts open separately into the cloaca"] },
        ],
      },
      pyqExampleId: "dab01c6b-495a-4b1e-927b-a745f5a17268",
      selfCheckExample: {
        prompt: "Looking at a frog's head, you see a tympanum but no ear flap. Why, and what two jobs does the frog's ear do?",
        steps: [
          "The frog has no external ear, so only the membranous tympanum shows on the surface.",
          "NCERT says the ear is an organ of hearing as well as of balancing (equilibrium).",
        ],
        answer: "The external ear is absent; the ear serves hearing and balance.",
      },
      practiceSet: [
        { prompt: "Name the three parts of the forebrain of a frog.", answer: "The olfactory lobes, the paired cerebral hemispheres and the unpaired diencephalon" },
        { prompt: "What holds the testes of a frog to its kidneys?", answer: "The mesorchium, a double fold of peritoneum" },
        { prompt: "How many vasa efferentia arise from the testes of a frog, and into which canal do they open?", answer: "10 to 12, opening into Bidder's canal" },
        { prompt: "How many ova can a mature female frog lay at a time?", answer: "2500 to 3000" },
        { prompt: "What is the larval stage of a frog called?", answer: "The tadpole" },
      ],
      traps: [
        {
          title: "Ten pairs of cranial nerves, not twelve",
          body: "The frog has **ten pairs** of cranial nerves arising from its brain. A statement giving twelve pairs for the frog is false.",
        },
        {
          title: "Optic lobes are in the midbrain",
          body: "The **optic lobes** form the **midbrain**. The **hindbrain** is only the **cerebellum and medulla oblongata**.",
        },
        {
          title: "Female ducts open separately",
          body: "In **females**, the **ureters and oviducts open separately** into the cloaca. Only in **males** do the ureters serve as urinogenital ducts.",
        },
      ],
    },
  ],
};
