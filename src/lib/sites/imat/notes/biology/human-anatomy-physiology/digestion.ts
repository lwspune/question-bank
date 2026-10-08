import type { SubtopicNote } from "@/app/notes/_types";

const HCL = "\\(\\mathrm{HCl}\\)";
const HCO3 = "\\(\\mathrm{HCO_3^-}\\)";
const NA = "\\(\\mathrm{Na^+}\\)";

export const IMAT_BIO_HAP_DIGESTION_NOTE: SubtopicNote = {
  subtopicName: "Digestion and Nutrition",
  title: "The Digestive System, Enzymes and Absorption",
  oneLineDefinition:
    "The gut breaks large food molecules into small soluble ones by churning and by enzymes, then absorbs them, mostly in the small intestine.",
  whyItMatters:
    "The 2026 paper asked the main job of the stomach. The Cambridge papers came back to bile again and again (2016, 2020, 2021): where it is made and stored and what it does, often next to amylase. They also asked which organ makes a juice that raises gut pH (2018) and which organ lies below the diaphragm (2013).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-hap-gut",
      name: "Organs of the digestive system and what each one does",
      intuition:
        "Food travels along one long tube, and each part does one step: break up, digest, absorb, then reclaim water. Three organs outside the tube (the liver, gall bladder and pancreas) pour their juices into it through ducts.",
      definition:
        "**Digestion** is the **hydrolysis** of large, insoluble molecules into small, soluble ones that can be absorbed. **Mechanical** digestion (chewing, churning) increases the surface area; **chemical** digestion is done by enzymes.\n" +
        "- Food is pushed along by **peristalsis**: waves of smooth muscle contraction.\n" +
        "- The stomach absorbs very little: some water, alcohol and a few drugs. Most absorption is in the **small intestine** (duodenum, jejunum and ileum).\n" +
        "- The **liver** also stores glycogen, breaks down excess amino acids into urea (deamination), and removes toxins such as alcohol.\n" +
        "- Above the diaphragm (thorax): heart, lungs, oesophagus. Below it (abdomen): liver, stomach, pancreas, intestines, kidneys, spleen.",
      table: {
        columns: ["Organ", "Main job", "Secretes"],
        rows: [
          { cells: ["Mouth", "Chewing; starts starch digestion", "Saliva: salivary amylase and mucus"] },
          { cells: ["Oesophagus", "Moves food to the stomach by peristalsis", "Mucus"] },
          { cells: ["Stomach", "Stores and churns food, starts protein digestion, kills microbes", `${HCL}, pepsinogen, mucus; the hormone gastrin`] },
          { cells: ["Duodenum", "Receives bile and pancreatic juice; most chemical digestion", "Mucus, brush-border enzymes; hormones secretin and CCK"] },
          { cells: ["Ileum", "Absorbs the products of digestion", "Brush-border enzymes"] },
          { cells: ["Large intestine", "Absorbs water and ions; gut bacteria make vitamin K", "Mucus"] },
          { cells: ["Liver", "Makes bile; stores glycogen; makes urea", "Bile (into the bile duct)"] },
          { cells: ["Gall bladder", "Stores and concentrates bile", "Releases bile after a fatty meal"] },
          { cells: ["Pancreas", "Exocrine: digestive juice. Endocrine: insulin and glucagon", `Pancreatic juice with enzymes and ${HCO3}`] },
        ],
      },
      selfCheckExample: {
        prompt: "In which part of the gut are most of the products of digestion absorbed into the blood?",
        options: ["Stomach", "Large intestine", "Small intestine", "Oesophagus", "Gall bladder"],
        steps: [
          "The small intestine, especially the ileum, is long and lined with villi, giving a huge surface for absorbing sugars, amino acids and fats.",
          "The stomach mostly digests and stores (A). The large intestine mainly reclaims water (B). The oesophagus and gall bladder absorb no food (D, E).",
        ],
        answer: "(C) Small intestine",
      },
      practiceSet: [
        { prompt: "Which organ makes bile?", answer: "The liver" },
        { prompt: "What does the large intestine mainly absorb?", answer: "Water and mineral ions" },
        { prompt: "Name two organs found below the diaphragm.", answer: "Any two of: liver, stomach, pancreas, intestines, kidneys, spleen" },
        { prompt: "What is peristalsis?", answer: "Waves of smooth muscle contraction that push food along the gut" },
      ],
      traps: [
        {
          title: "The stomach digests; the small intestine absorbs",
          body: "The stomach's main digestive job is breaking food down with acid and pepsin, plus churning. It does not absorb nutrients to any real extent, filter toxins (the liver does that) or make bile.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-enzymes",
      name: "Digestive enzymes: source, substrate, product and best pH",
      intuition:
        "Each food type needs its own enzymes, and each enzyme works best at the pH of the place it works. That is why stomach enzymes like acid and intestinal enzymes like slightly alkaline conditions. Digestion of each food happens in steps, with a different enzyme for each step.",
      definition:
        "All digestive enzymes are **hydrolases**: they break bonds by adding water.\n" +
        "- Protein-digesting enzymes are made as **inactive precursors** (pepsinogen, trypsinogen), so they do not digest the cells that make them. Acid activates pepsinogen; the gut enzyme enterokinase activates trypsinogen.\n" +
        "- Starch is digested in two steps: amylase makes maltose, then maltase makes glucose.\n" +
        "- Brush-border enzymes are attached to the membranes of the cells lining the small intestine.\n" +
        "- People with **lactose intolerance** make too little lactase.",
      table: {
        columns: ["Enzyme", "Made by", "Substrate and product", "Best pH"],
        rows: [
          { cells: ["Salivary amylase", "Salivary glands", "Starch to maltose", "About 7"] },
          { cells: ["Pepsin", "Stomach wall, as pepsinogen", "Proteins to shorter polypeptides", "About 2"] },
          { cells: ["Pancreatic amylase", "Pancreas", "Starch to maltose", "Slightly alkaline"] },
          { cells: ["Trypsin", "Pancreas, as trypsinogen", "Proteins to peptides", "Slightly alkaline"] },
          { cells: ["Lipase", "Pancreas", "Triglycerides to fatty acids and monoglycerides (and glycerol)", "Slightly alkaline"] },
          { cells: ["Maltase", "Brush border of the small intestine", "Maltose to glucose", "Slightly alkaline"] },
          { cells: ["Lactase and sucrase", "Brush border", "Lactose to glucose and galactose; sucrose to glucose and fructose", "Slightly alkaline"] },
          { cells: ["Peptidases", "Brush border and pancreas", "Peptides to amino acids", "Slightly alkaline"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which enzyme acts on the product of amylase?",
        options: ["Pepsin", "Lipase", "Trypsin", "Maltase", "Lactase"],
        steps: [
          "Amylase turns starch into maltose. Maltase then splits maltose into two glucose molecules.",
          "Pepsin and trypsin digest proteins, lipase digests fats, and lactase digests the milk sugar lactose, not maltose.",
        ],
        answer: "(D) Maltase",
      },
      practiceSet: [
        { prompt: "What are the products of lipase?", answer: "Fatty acids and monoglycerides (some glycerol)" },
        { prompt: "Why is pepsin secreted as inactive pepsinogen?", answer: "So it does not digest the stomach cells that make it" },
        { prompt: "Which enzyme works best at about pH 2?", answer: "Pepsin" },
      ],
      traps: [
        {
          title: "Amylase makes maltose; it does not digest it",
          body: "Amylase breaks starch into maltose. Digesting maltose is maltase's job. Options saying amylase digests maltose, or that it produces glucose directly, are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-bile-pancreas",
      name: "Bile, pancreatic juice and the control of pH in the gut",
      intuition:
        "The stomach makes the food very acidic, but the enzymes of the small intestine need slightly alkaline conditions. So as food enters the duodenum, two juices arrive that neutralise the acid. One of them, bile, also breaks fat into tiny droplets so lipase can reach it.",
      definition:
        "- **Bile** is made in the **liver**, stored and concentrated in the **gall bladder**, and released into the duodenum through the bile duct.\n" +
        "- Bile contains bile salts, hydrogencarbonate, cholesterol and the pigment bilirubin (from broken-down haemoglobin). It contains **no enzymes**.\n" +
        "- **Emulsification**: bile salts break large fat globules into many small droplets. This is physical, not chemical: no bonds are broken and the activation energy of lipase does not change, but the surface area for lipase becomes much larger.\n" +
        `- **Pancreatic juice** carries ${HCO3}, which raises the pH, plus amylase, trypsinogen and lipase. It is the main juice that neutralises stomach acid.\n` +
        `- Bile also adds water, diluting the gut contents. Gastric juice (${HCL}) lowers the pH; only bile and pancreatic juice raise it.\n` +
        "- **Hormones**: gastrin (stomach) increases acid secretion; secretin (duodenum) triggers hydrogencarbonate from the pancreas; CCK (duodenum) makes the gall bladder contract and the pancreas release enzymes.",
      table: {
        columns: ["Secretion", "Made by", "Contains", "Effect"],
        rows: [
          { cells: ["Gastric juice", "Stomach wall", `${HCL}, pepsinogen, mucus`, "Lowers pH to about 2; starts protein digestion"] },
          { cells: ["Bile", "Liver (stored in the gall bladder)", "Bile salts, hydrogencarbonate, bilirubin; no enzymes", "Emulsifies fats; helps neutralise acid"] },
          { cells: ["Pancreatic juice", "Exocrine cells of the pancreas", "Hydrogencarbonate, amylase, trypsinogen, lipase", "Neutralises acid; digests all three food types"] },
          { cells: ["Intestinal secretions", "Lining of the small intestine", "Mucus and brush-border enzymes", "Finish digestion"] },
        ],
      },
      selfCheckExample: {
        prompt: "A patient has their gall bladder removed. Which change is most likely?",
        options: [
          "The liver stops making bile",
          "Fat is digested less efficiently after a large fatty meal",
          "Proteins can no longer be digested",
          "The stomach contents become more acidic",
          "Starch can no longer be digested",
        ],
        steps: [
          "The liver still makes bile and it trickles into the duodenum, but there is no store to release a large dose after a fatty meal. Less emulsification means slower fat digestion.",
          "The liver, not the gall bladder, makes bile (A). Proteins and starch are digested by pancreatic and intestinal enzymes (C, E). The stomach's acid is unaffected (D).",
        ],
        answer: "(B) Fat is digested less efficiently after a large fatty meal",
      },
      practiceSet: [
        { prompt: "Which ion in pancreatic juice raises the pH in the duodenum?", answer: "The hydrogencarbonate ion" },
        { prompt: "Which hormone makes the gall bladder contract?", answer: "CCK (cholecystokinin)" },
        { prompt: "Does bile contain digestive enzymes?", answer: "No" },
      ],
      traps: [
        {
          title: "Emulsifying is not digesting",
          body: "Bile salts split fat into smaller droplets but break no chemical bonds and do not lower lipase's activation energy. Bile makes digestion faster only by giving lipase more surface to work on.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-absorption",
      name: "Absorption in the small intestine and the main nutrients",
      intuition:
        "The inner wall of the small intestine is folded into villi, and each villus cell is folded again into microvilli, giving a surface the size of a room. Sugars and amino acids go into the blood; fats, which do not dissolve in water, take a side route through the lymph.",
      definition:
        "- **Villi** each contain a network of blood capillaries and a central lymph vessel, the **lacteal**. Their cells have **microvilli** and many mitochondria for active transport.\n" +
        `- Glucose and amino acids enter the cells by **co-transport with ${NA}** (secondary active transport) and go to the liver in the **hepatic portal vein**.\n` +
        "- Fatty acids and monoglycerides enter the cells, are rebuilt into triglycerides, packed into **chylomicrons** and enter the **lacteals**; the lymph later drains into the blood.\n" +
        "- **Fat-soluble vitamins** (A, D, E, K) are absorbed with the fats. Vitamin B12 is absorbed in the ileum with intrinsic factor from the stomach.\n" +
        "- Key nutrients: vitamin A (makes the retinal of rod cells; lack causes night blindness), vitamin C (collagen; lack causes scurvy), vitamin D (calcium absorption; lack causes rickets), vitamin K (clotting), iron (haemoglobin; lack causes anaemia), iodine (thyroxine).",
      table: {
        columns: ["Product", "How it enters the cells", "Where it goes next"],
        rows: [
          { cells: ["Glucose and galactose", "Co-transport with sodium ions", "Blood capillaries, then the hepatic portal vein to the liver"] },
          { cells: ["Fructose", "Facilitated diffusion", "Blood capillaries, then the hepatic portal vein"] },
          { cells: ["Amino acids", "Co-transport with sodium ions", "Blood capillaries, then the hepatic portal vein"] },
          { cells: ["Fatty acids and monoglycerides", "Diffusion through the membrane", "Rebuilt into fats, then into the lacteals (lymph)"] },
          { cells: ["Water", "Osmosis", "Blood (small and large intestine)"] },
        ],
      },
      selfCheckExample: {
        prompt: "A disease blocks the lacteals of the villi. Absorption of which substance would fall the most?",
        options: ["Glucose", "Amino acids", "Vitamin C", "Water", "Vitamin D"],
        steps: [
          "Lacteals carry absorbed fats in chylomicrons. Vitamin D is fat-soluble and travels with them.",
          "Glucose, amino acids, water-soluble vitamin C and water all enter the blood capillaries directly, so they are not affected.",
        ],
        answer: "(E) Vitamin D",
      },
      practiceSet: [
        { prompt: "Where does absorbed glucose go first?", answer: "To the liver, in the hepatic portal vein" },
        { prompt: "Which four vitamins are fat-soluble?", answer: "A, D, E and K" },
        { prompt: "What disease does a lack of vitamin C cause?", answer: "Scurvy" },
        { prompt: "What is the lymph vessel inside a villus called?", answer: "A lacteal" },
      ],
      traps: [
        {
          title: "Fats bypass the hepatic portal vein",
          body: "Sugars and amino acids go straight into the capillaries and to the liver. Fats leave the villus in the lacteals as chylomicrons and reach the blood later through the lymph system.",
        },
      ],
    },
  ],
};
