import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_BF_HEART_NOTE: SubtopicNote = {
  subtopicName: "Heart and Circulation",
  title: "Heart and Circulation",
  oneLineDefinition:
    "Open and closed circulation, the chambers and valves of the human heart, the nodal tissue that sets its rhythm, the cardiac cycle with its sounds and output, and what each wave of an ECG shows.",
  whyItMatters:
    "Eight NEET questions from 2022 to 2026, six of them from 2024 or later. The ECG waves were matched twice (NEET 2023 and NEET 2024), and the nodal tissue was asked three times (NEET 2024, NEET 2025 and Re-NEET 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzobf-heart-structure",
      name: "Circulatory pathways and the human heart",
      intuition:
        "Some animals let blood flow out of vessels into open spaces; others keep it inside a closed set of tubes. In vertebrates the heart gains chambers as we go from fish to mammals, until the oxygen-rich and oxygen-poor blood are kept fully apart. The human heart is two pumps side by side, each with an atrium above a ventricle, and valves that let blood go one way only.",
      definition:
        "Circulatory pathways:\n" +
        "- **Open** circulation: blood pumped by the heart passes through large vessels into open spaces or body cavities called sinuses. Found in **arthropods and molluscs**.\n" +
        "- **Closed** circulation: blood is always circulated through a closed network of vessels. Found in **annelids and chordates**. It is more advantageous, as the flow of fluid can be more precisely regulated.\n" +
        "- All vertebrates have a muscular chambered heart. **Fishes** have a **2-chambered** heart (one atrium, one ventricle). **Amphibians and reptiles (except crocodiles)** have a **3-chambered** heart (two atria, one ventricle). **Crocodiles, birds and mammals** have a **4-chambered** heart (two atria, two ventricles).\n" +
        "- Fishes have **single circulation**. Amphibians and reptiles have **incomplete double circulation**, as the single ventricle mixes oxygenated and deoxygenated blood. Birds and mammals have **double circulation**: oxygenated and deoxygenated blood stay fully apart.\n\n" +
        "The human heart:\n" +
        "- Of **mesodermal** origin. It sits in the **thoracic cavity, between the two lungs, slightly tilted to the left**, and is about the size of a clenched fist.\n" +
        "- It is protected by a double-walled membranous bag, the **pericardium**, which encloses the **pericardial fluid**.\n" +
        "- Four chambers: two small upper **atria** and two larger lower **ventricles**. A thin muscular **inter-atrial septum** separates the atria; a thick-walled **inter-ventricular septum** separates the ventricles; the **atrio-ventricular septum** separates the atrium and ventricle of the same side.\n" +
        "- The opening between the **right atrium and right ventricle** is guarded by the **tricuspid valve** (three muscular flaps or cusps). The **left atrium and left ventricle** are guarded by the **bicuspid or mitral valve**. The openings of the right and left ventricles into the **pulmonary artery and the aorta** are guarded by the **semilunar valves**. The valves allow flow in **one direction only**.\n" +
        "- The whole heart is made of cardiac muscles. The walls of the ventricles are much **thicker** than those of the atria.\n\n" +
        "Double circulation in humans:\n" +
        "- **Pulmonary circulation:** the right ventricle pumps deoxygenated blood into the **pulmonary artery** to the lungs; oxygenated blood returns by the **pulmonary veins** to the **left atrium**.\n" +
        "- **Systemic circulation:** the left ventricle pumps oxygenated blood into the **aorta** to the tissues; deoxygenated blood is collected by the veins and returned to the **right atrium**.\n" +
        "- The **hepatic portal vein** carries blood from the **intestine to the liver** before it is delivered to the systemic circulation (the hepatic portal system). A special **coronary system** of vessels serves the heart muscle alone.",
      table: {
        columns: ["Opening", "Guarded by", "Note"],
        rows: [
          {
            cells: ["Right atrium to right ventricle", "Tricuspid valve", "Three muscular flaps or cusps"],
            noteAmber: "Re-NEET 2026: the opening between the right atrium and right ventricle is guarded by the tricuspid valve.",
          },
          { cells: ["Left atrium to left ventricle", "Bicuspid (mitral) valve", "Two flaps"] },
          { cells: ["Right ventricle to pulmonary artery", "Semilunar valve", "Sends deoxygenated blood to the lungs"] },
          { cells: ["Left ventricle to aorta", "Semilunar valve", "Sends oxygenated blood to the body"] },
        ],
      },
      pyqExampleId: "1fe5936d-79e1-4b2b-973b-165d39ff1ba6",
      selfCheckExample: {
        prompt: "Frogs and lizards have incomplete double circulation, but birds have complete double circulation. What in the heart makes the difference?",
        steps: [
          "Amphibians and most reptiles have a 3-chambered heart: two atria and one ventricle.",
          "Oxygenated and deoxygenated blood mix in that single ventricle.",
          "Birds have a 4-chambered heart, so the two kinds of blood stay apart.",
        ],
        answer: "The single ventricle of the 3-chambered heart mixes the two kinds of blood; the 4-chambered bird heart keeps them separate.",
      },
      practiceSet: [
        { prompt: "Which two animal groups named by NCERT have an open circulatory system?", answer: "Arthropods and molluscs" },
        { prompt: "Which reptiles have a 4-chambered heart?", answer: "Crocodiles" },
        { prompt: "Which valve guards the opening between the left atrium and the left ventricle?", answer: "The bicuspid (mitral) valve" },
        { prompt: "Which chamber of the heart receives oxygenated blood from the pulmonary veins?", answer: "The left atrium" },
        { prompt: "What does the hepatic portal vein carry, and to where?", answer: "Blood from the intestine to the liver" },
      ],
      traps: [
        {
          title: "Tricuspid on the right, bicuspid on the left",
          body: "The **tricuspid** valve guards the **right** atrio-ventricular opening and the **bicuspid (mitral)** valve the **left**. The semilunar valves guard the exits into the arteries.",
        },
        {
          title: "Arthropods have open circulation",
          body: "**Arthropods and molluscs** have an **open** system; **annelids and chordates** have a **closed** one.",
        },
        {
          title: "Crocodiles are the reptile exception",
          body: "Most reptiles have a **3-chambered** heart, but **crocodiles** have a **4-chambered** heart like birds and mammals.",
        },
        {
          title: "Pulmonary veins carry oxygenated blood",
          body: "The **pulmonary veins** bring **oxygenated** blood from the lungs to the left atrium, and the **pulmonary artery** takes **deoxygenated** blood to the lungs.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobf-nodal-tissue",
      name: "Nodal tissue and the control of the heartbeat",
      intuition:
        "The heart starts its own beat. A patch of special muscle in the right atrium fires an electrical signal about 72 times a minute, and a chain of special fibres carries it down to the ventricles. That is why the heart is called myogenic. The brain and some hormones can only speed it up or slow it down.",
      definition:
        "Nodal tissue:\n" +
        "- A specialised cardiac musculature, the **nodal tissue**, is spread through the heart.\n" +
        "- The **sino-atrial node (SAN)** lies in the **right upper corner of the right atrium**. The **atrio-ventricular node (AVN)** lies in the **lower left corner of the right atrium**, close to the atrio-ventricular septum.\n" +
        "- A bundle of nodal fibres, the **atrio-ventricular bundle (AV bundle)**, continues from the AVN. It passes through the atrio-ventricular septa to emerge on top of the inter-ventricular septum, and immediately divides into a **right and a left bundle**.\n" +
        "- These branches give rise to minute fibres throughout the ventricular musculature of their side, the **Purkinje fibres**. The Purkinje fibres along with the right and left bundles are known as the **bundle of His**.\n" +
        "- The nodal musculature can generate action potentials **without any external stimuli**: it is **autoexcitable**. The number generated per minute varies in different parts. The **SAN generates the maximum, 70 to 75 per minute**, and so starts and keeps up the rhythm of the heart. It is called the **pacemaker**. The normal heart rate is **72 beats per minute**.\n\n" +
        "Regulation of cardiac activity:\n" +
        "- Normal activities of the heart are regulated **intrinsically**, that is auto regulated by the nodal tissue, so the heart is called **myogenic**.\n" +
        "- A special **neural centre in the medulla oblongata** can moderate cardiac function through the **autonomic nervous system**.\n" +
        "- **Sympathetic** nerves can **increase** the rate of heartbeat, the strength of ventricular contraction and so the cardiac output.\n" +
        "- **Parasympathetic** signals **decrease** the rate of heartbeat, the speed of conduction of the action potential and so the cardiac output.\n" +
        "- **Adrenal medullary hormones** can also **increase** the cardiac output.",
      table: {
        columns: ["Part", "Where it is", "Role"],
        rows: [
          {
            cells: ["SA node", "Right upper corner of the right atrium", "Pacemaker: 70 to 75 action potentials per minute, the most of any part"],
            noteAmber: "Re-NEET 2026: the SAN generates 70 to 75 action potentials per minute.",
            pyqExampleId: "f858030a-7ee5-4646-aae6-5599f8f7c365",
          },
          { cells: ["AV node", "Lower left corner of the right atrium, near the AV septum", "Passes the signal from the atria towards the ventricles"] },
          { cells: ["AV bundle", "Through the AV septa to the top of the inter-ventricular septum", "Carries the signal down and splits into right and left bundles"] },
          { cells: ["Right and left bundles", "Along the inter-ventricular septum", "Carry the signal to each ventricle"] },
          { cells: ["Purkinje fibres", "Throughout the ventricular muscle", "Spread the signal through the ventricles"] },
          {
            cells: ["Medulla oblongata centre", "Brain", "Moderates the heart through sympathetic (speeds up) and parasympathetic (slows) nerves"],
            noteAmber: "NEET 2025: the heart is regulated by nodal tissue, the medulla centre and adrenal medullary hormones; adrenal cortical hormones were the wrong choice.",
            pyqExampleId: "7f1fd0db-9e1a-4643-95c2-bedae50692c4",
          },
        ],
      },
      pyqExampleId: "97f12784-c7eb-4ea0-9131-d4ae5e4070cf",
      selfCheckExample: {
        prompt: "Why is the human heart called myogenic?",
        steps: [
          "Its normal activity is regulated intrinsically by the nodal tissue.",
          "The nodal tissue is autoexcitable: it fires action potentials without any outside stimulus.",
        ],
        answer: "Because its beat starts in its own specialised muscle, the nodal tissue, not in a nerve.",
      },
      practiceSet: [
        { prompt: "Where in the heart does the sino-atrial node lie?", answer: "In the right upper corner of the right atrium" },
        { prompt: "Which part of the nodal tissue is called the pacemaker?", answer: "The sino-atrial node (SAN)" },
        { prompt: "What is the normal human heart rate per minute?", answer: "72 beats per minute" },
        { prompt: "Which division of the autonomic nervous system slows the heartbeat?", answer: "The parasympathetic" },
        { prompt: "Which fibres, together with the right and left bundles, are known as the bundle of His?", answer: "The Purkinje fibres" },
      ],
      traps: [
        {
          title: "The AV node is in the right atrium too",
          body: "Both nodes sit in the **right atrium**: the **SAN** in its **upper right** corner and the **AVN** in its **lower left** corner, near the AV septum. Neither node lies in a ventricle.",
        },
        {
          title: "The SAN, not the AVN, starts the beat",
          body: "The **SAN** fires the most action potentials (70 to 75 per minute) and is the **pacemaker**. The AVN only relays the signal to the ventricles.",
        },
        {
          title: "Medullary, not cortical, hormones speed the heart",
          body: "NCERT says **adrenal medullary hormones** can increase cardiac output. Adrenal **cortical** hormones are not listed as regulators of the heartbeat.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nzobf-cardiac-cycle",
      name: "The cardiac cycle, heart sounds and cardiac output",
      intuition:
        "One heartbeat is one cardiac cycle: the atria squeeze, then the ventricles squeeze, then everything rests. The valves open and shut as the pressure changes, and two of those shutting moments make the lub and dub you hear. How much blood the heart sends out each minute is just how much it pumps per beat times how many beats it makes.",
      definition:
        "The events of the cardiac cycle, in order:\n" +
        "- **Joint diastole:** all four chambers are relaxed. The **tricuspid and bicuspid valves are open**, so blood from the pulmonary veins and the vena cava flows through the atria into the ventricles. The **semilunar valves are closed**.\n" +
        "- **Atrial systole:** the SAN fires and both atria contract. This **increases the flow of blood into the ventricles by about 30 per cent**.\n" +
        "- **Ventricular systole:** the signal passes by the AVN and AV bundle, and the bundle of His carries it through the ventricles, which contract. The atria relax at the same time. The rising ventricular pressure **closes the tricuspid and bicuspid valves**, stopping backflow into the atria. As pressure rises further, the **semilunar valves are forced open** and blood flows into the pulmonary artery and aorta.\n" +
        "- **Ventricular diastole:** the ventricles relax and their pressure falls, **closing the semilunar valves**. As it falls further, the tricuspid and bicuspid valves are **pushed open by the pressure in the atria**, from blood emptied into them by the veins. Blood moves freely into the ventricles again: back to joint diastole.\n\n" +
        "Numbers to know:\n" +
        "- The **cardiac cycle** is the sequence of events in the heart that repeats with each beat. With **72 beats per minute**, one cycle lasts about **0.8 seconds**.\n" +
        "- Each ventricle pumps out about **70 mL** of blood per cycle: the **stroke volume**.\n" +
        "- **Cardiac output** is the volume of blood pumped out by **each ventricle per minute**: stroke volume times heart rate, averaging **5000 mL (5 litres)** in a healthy person. The body can change the stroke volume and the heart rate, and so the output; the cardiac output of an **athlete is much higher** than that of an ordinary man.\n\n" +
        "Heart sounds:\n" +
        "- The **first sound, lub**, comes from the **closure of the tricuspid and bicuspid valves**.\n" +
        "- The **second sound, dub**, comes from the **closure of the semilunar valves**.\n" +
        "- These sounds are of clinical diagnostic importance.",
      formula: {
        label: "Cardiac output",
        latex: "\\text{Cardiac output} = \\text{stroke volume} \\times \\text{heart rate}",
        symbols: [
          { symbol: "stroke volume", meaning: "blood pumped out by each ventricle in one cardiac cycle, about 70 mL" },
          { symbol: "heart rate", meaning: "beats per minute, normally 72" },
          { symbol: "cardiac output", meaning: "blood pumped out by each ventricle per minute, about 5000 mL" },
        ],
      },
      authoredExample: {
        prompt: "A healthy person has a stroke volume of 70 mL and a heart rate of 72 beats per minute. Find the cardiac output and the length of one cardiac cycle.",
        steps: [
          "Cardiac output is stroke volume times heart rate: \\(70 \\times 72 = 5040\\) mL per minute, about 5 litres.",
          "72 cycles take 60 seconds, so one cycle lasts \\(60 \\div 72 \\approx 0.83\\) seconds, which NCERT rounds to 0.8 seconds.",
        ],
        answer: "About 5040 mL (5 litres) per minute, and about 0.8 seconds per cycle.",
      },
      pyqExampleId: "8a156546-a391-4206-a6db-f2cd6eae3ba4",
      selfCheckExample: {
        prompt: "An athlete's heart pumps 6000 mL per minute while beating 60 times a minute. What is the stroke volume?",
        steps: [
          "Stroke volume is cardiac output divided by heart rate.",
          "\\(6000 \\div 60 = 100\\) mL.",
        ],
        answer: "100 mL per beat.",
      },
      practiceSet: [
        { prompt: "A heart beats 75 times a minute with a stroke volume of 80 mL. What is the cardiac output?", answer: "6000 mL (6 litres) per minute", method: "\\(80 \\times 75\\)" },
        { prompt: "A heart beats 60 times a minute. How long is one cardiac cycle?", answer: "1 second", method: "\\(60 \\div 60\\)" },
        { prompt: "By about what share does atrial contraction increase the flow of blood into the ventricles?", answer: "About 30 per cent" },
        { prompt: "Which valves close to produce the second heart sound, dub?", answer: "The semilunar valves" },
        { prompt: "During ventricular systole, what forces the semilunar valves open?", answer: "The rising pressure in the ventricles" },
      ],
      traps: [
        {
          title: "Heart sounds come from valves closing",
          body: "**Lub** is the **closing of the tricuspid and bicuspid valves** and **dub** the **closing of the semilunar valves**. Valves opening make no heart sound.",
        },
        {
          title: "Falling pressure closes the semilunar valves",
          body: "The semilunar valves close when **ventricular pressure falls** at the start of ventricular diastole. A rise in ventricular pressure **opens** them.",
        },
        {
          title: "Atrial contraction only tops up the ventricles",
          body: "Most of the ventricular filling happens in **joint diastole**, with the AV valves open. **Atrial systole** adds only about **30 per cent** more.",
        },
        {
          title: "Cardiac output is per ventricle, per minute",
          body: "**Cardiac output** is the blood pumped by **each ventricle per minute** (about 5 litres). The **stroke volume** is per beat (about 70 mL).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobf-ecg",
      name: "The electrocardiogram and disorders of circulation",
      intuition:
        "Every heartbeat sends a small electrical wave across the chest. An ECG machine draws that wave as a line with peaks, each named by a letter. The P wave belongs to the atria, the QRS complex and the T wave to the ventricles. A doctor reads the shape and the spacing to spot trouble.",
      definition:
        "The ECG:\n" +
        "- The **electrocardiogram (ECG)** is a graph of the electrical activity of the heart during a cardiac cycle. It is obtained with an **electrocardiograph**.\n" +
        "- For a standard ECG the patient is connected to the machine with **three electrical leads**: one to **each wrist** and one to the **left ankle**.\n" +
        "- Each peak is named by a letter from **P to T**, matching a particular electrical activity of the heart.\n" +
        "- Counting the number of QRS complexes in a given time gives the **heartbeat rate**. Any deviation from the normal shape points to a possible abnormality or disease, so the ECG is of great clinical importance.\n\n" +
        "Disorders of the circulatory system:\n" +
        "- **High blood pressure (hypertension):** blood pressure higher than normal (**120/80** mm Hg). A repeated reading of **140/90** or higher shows hypertension. It leads to heart diseases and also affects the brain and kidney.\n" +
        "- **Coronary artery disease (CAD),** often called **atherosclerosis**, affects the vessels that supply blood to the heart muscle. Deposits of calcium, fat, cholesterol and fibrous tissue narrow the lumen of the arteries.\n" +
        "- **Angina (angina pectoris):** acute chest pain when not enough oxygen reaches the heart muscle. It occurs more often in middle-aged and elderly people.\n" +
        "- **Heart failure:** the heart is not pumping blood well enough to meet the needs of the body. It is sometimes called congestive heart failure, because congestion of the lungs is one of its main symptoms. It is **not the same as cardiac arrest** (the heart stops beating) or a **heart attack** (the heart muscle is suddenly damaged by an inadequate blood supply).",
      table: {
        columns: ["Part of the ECG", "What it shows"],
        rows: [
          { cells: ["P wave", "Electrical excitation (depolarisation) of the atria, which leads to contraction of both atria"] },
          { cells: ["QRS complex", "Depolarisation of the ventricles, which starts ventricular contraction"] },
          { cells: ["Q wave", "Contraction starts shortly after Q, so it marks the beginning of systole"] },
          { cells: ["T wave", "Return of the ventricles from the excited to the normal state (repolarisation); the end of the T wave marks the end of systole"] },
          {
            cells: ["T-P gap", "The stretch from the end of T to the next P, when the heart muscle is electrically silent"],
            noteAmber: "NEET 2024: P is atrial depolarisation, QRS ventricular depolarisation, T ventricular repolarisation, and the T-P gap is electrically silent.",
            pyqExampleId: "0bd8cc4a-bff9-4495-b350-a82547ed0ad9",
          },
        ],
      },
      pyqExampleId: "34606e28-25d2-4c96-b78d-6bd6f593df9e",
      selfCheckExample: {
        prompt: "In a 15-second stretch of a normal ECG, 18 QRS complexes are counted. What is the heart rate?",
        steps: [
          "Each QRS complex is one ventricular beat.",
          "18 beats in 15 seconds is \\(18 \\times 4 = 72\\) beats in 60 seconds.",
        ],
        answer: "72 beats per minute.",
      },
      practiceSet: [
        { prompt: "For a standard ECG, where are the three leads attached?", answer: "One to each wrist and one to the left ankle" },
        { prompt: "What does the end of the T wave mark in the cardiac cycle?", answer: "The end of systole" },
        { prompt: "What blood pressure reading, repeated, shows hypertension?", answer: "140/90 mm Hg or higher" },
        { prompt: "What is acute chest pain from too little oxygen reaching the heart muscle called?", answer: "Angina (angina pectoris)" },
        { prompt: "Which disorder is often called atherosclerosis?", answer: "Coronary artery disease (CAD)" },
      ],
      traps: [
        {
          title: "The P wave is the atria; QRS and T are the ventricles",
          body: "**P** is atrial depolarisation. **QRS** is ventricular **depolarisation** and **T** is ventricular **repolarisation**. NCERT names no separate wave for atrial repolarisation.",
        },
        {
          title: "Systole begins just after Q",
          body: "Ventricular contraction starts **shortly after the Q wave**, so Q marks the **beginning of systole**, and the **end of the T wave** marks its end.",
        },
        {
          title: "Heart failure is not cardiac arrest",
          body: "In **heart failure** the heart pumps too weakly for the body's needs. **Cardiac arrest** is when the heart stops beating, and a **heart attack** is sudden damage to the heart muscle from a poor blood supply.",
        },
      ],
    },
  ],
};
