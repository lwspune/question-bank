import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_HIS_REVOLUTIONS_NOTE: SubtopicNote = {
  subtopicName: "Revolutions and Nation-States",
  title: "Enlightenment, Revolutions and the Unification of Italy and Germany",
  oneLineDefinition:
    "Enlightenment ideas fed the American and French revolutions, industry transformed Britain, and in the 1800s Italy and Germany became single nations.",
  whyItMatters:
    "An early Cambridge paper asked which description of the Enlightenment was wrong, a statement-checking shape that needs the movement's real features. The unification of Italy is standard Italian school knowledge and a natural ministry topic.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-his-enlightenment",
      name: "The Enlightenment: thinkers and ideas",
      intuition:
        "The Enlightenment was an 18th-century movement, strongest in France, that trusted reason and science over tradition, superstition and the unlimited power of kings and the Church. Its writers argued for natural rights, tolerance and divided power, and those ideas were written into the American and French revolutions.",
      definition:
        "- Period: roughly **1680 to 1800**, centred on **France** but Europe-wide; also called the **Age of Reason**.\n" +
        "- Core ideas: **reason** and **experience** as the source of knowledge, **religious tolerance**, **natural rights**, **separation of powers**, criticism of privilege.\n" +
        "- Some rulers adopted these ideas from above: the **enlightened despots** (Frederick II of Prussia, Catherine II of Russia, Joseph II of Austria).",
      table: {
        columns: ["Thinker", "Country", "Key idea or work"],
        rows: [
          { cells: ["John Locke", "England", "Natural rights to life, liberty and property; government needs the consent of the governed (Two Treatises of Government, 1689)"] },
          { cells: ["Montesquieu", "France", "Separation of legislative, executive and judicial powers (The Spirit of the Laws, 1748)"] },
          { cells: ["Voltaire", "France", "Religious tolerance and free speech; the satire Candide (1759)"] },
          { cells: ["Jean-Jacques Rousseau", "Born in Geneva, worked in France", "The Social Contract (1762): sovereignty belongs to the people and their \"general will\""] },
          { cells: ["Diderot and d'Alembert", "France", "The Encyclopédie (from 1751), a summary of all knowledge"] },
          { cells: ["Cesare Beccaria", "Milan", "On Crimes and Punishments (1764): against torture and the death penalty"] },
          { cells: ["Immanuel Kant", "Prussia", "Essay \"What is Enlightenment?\" (1784): \"Sapere aude\", dare to use your own reason"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which Enlightenment writer argued that state power should be divided between legislative, executive and judicial branches?",
        options: ["Voltaire", "Rousseau", "Montesquieu", "Kant", "Diderot"],
        steps: [
          "The separation of powers comes from Montesquieu's The Spirit of the Laws (1748).",
          "Voltaire is known for tolerance, Rousseau for the social contract and popular sovereignty, Kant for \"dare to know\", Diderot for the Encyclopédie.",
        ],
        answer: "(C) Montesquieu",
      },
      practiceSet: [
        { prompt: "Which Milanese writer argued against the death penalty in 1764?", answer: "Cesare Beccaria" },
        { prompt: "Who wrote The Social Contract?", answer: "Jean-Jacques Rousseau" },
        { prompt: "In which country was the Enlightenment strongest?", answer: "France" },
      ],
      traps: [
        {
          title: "Reason, not faith or feeling",
          body: "The Enlightenment put reason and evidence first. Romanticism, which came after it (about 1800 to 1850), stressed feeling, nature and the nation. Options that describe the Enlightenment as a movement of emotion or religious revival describe something else.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-his-age-of-revolutions",
      name: "The age of revolutions, 1688 to 1848",
      intuition:
        "In about 150 years, Europe and America moved from kings ruling by divine right to constitutions, parliaments and declarations of rights. At the same time Britain began making goods with machines powered by coal, which changed how people lived more than any war. Each revolution has one date and one document to remember.",
      definition:
        "- **American Revolution**: thirteen British colonies declared independence in **1776** and won it in **1783**.\n" +
        "- **French Revolution**: began in **1789**; abolished feudal privileges, executed the king, and ended with Napoleon's rise.\n" +
        "- **Industrial Revolution**: began in **Britain** in the second half of the 1700s: steam power, coal, iron, textile factories, railways (from the 1820s).",
      table: {
        columns: ["Date", "Event", "Fact to remember"],
        rows: [
          { cells: ["1688 to 1689", "Glorious Revolution, England", "Bill of Rights 1689: Parliament stands above the king"] },
          { cells: ["From about 1760", "Industrial Revolution begins in Britain", "James Watt's improved steam engine (patented 1769)"] },
          { cells: ["4 July 1776", "American Declaration of Independence", "Written mainly by Thomas Jefferson; US Constitution 1787; George Washington first president in 1789"] },
          { cells: ["14 July 1789", "Storming of the Bastille, Paris", "Start of the French Revolution; Declaration of the Rights of Man and of the Citizen in August 1789"] },
          { cells: ["1793 to 1794", "The Terror", "Louis XVI executed in January 1793; Robespierre's rule"] },
          { cells: ["1804", "Napoleon crowned Emperor of the French", "Napoleonic Civil Code the same year"] },
          { cells: ["1815", "Battle of Waterloo; Congress of Vienna (1814 to 1815)", "Napoleon exiled to Saint Helena; old monarchies restored"] },
          { cells: ["1848", "Revolutions across Europe (\"Springtime of the Peoples\")", "Marx and Engels publish The Communist Manifesto"] },
          { cells: ["1861 to 1865", "American Civil War", "Abraham Lincoln; slavery abolished in the USA in 1865"] },
        ],
      },
      selfCheckExample: {
        prompt: "Where and when was Napoleon finally defeated?",
        options: [
          "Trafalgar, 1805",
          "Austerlitz, 1805",
          "Leipzig, 1813",
          "Moscow, 1812",
          "Waterloo, 1815",
        ],
        steps: [
          "Napoleon's final defeat was at Waterloo (in modern Belgium) in 1815, after which he was exiled to Saint Helena.",
          "Austerlitz was a great Napoleonic victory; Trafalgar was a British naval victory but did not end his rule; Moscow and Leipzig were heavy losses before his first abdication, not the final defeat.",
        ],
        answer: "(E) Waterloo, 1815",
      },
      practiceSet: [
        { prompt: "On what date is the storming of the Bastille remembered?", answer: "14 July 1789" },
        { prompt: "In which country did the Industrial Revolution begin?", answer: "Great Britain" },
        { prompt: "Who mainly wrote the American Declaration of Independence?", answer: "Thomas Jefferson" },
      ],
      traps: [
        {
          title: "The American Revolution came before the French one",
          body: "The American Declaration of Independence (1776) came thirteen years before the French Revolution (1789), and French help in the American war helped bankrupt the French crown. Ordering questions often reverse the two.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-his-unification",
      name: "The unification of Italy and of Germany",
      intuition:
        "In 1815 Italy and Germany were patchworks of separate states. In each, one strong northern kingdom led unification by diplomacy and war: Piedmont-Sardinia in Italy and Prussia in Germany. Both were complete by 1871, which is the date to anchor everything else to.",
      definition:
        "- **Risorgimento** is the Italian movement for unification. Its four key figures: **Mazzini** (republican, founded Young Italy), **Cavour** (Piedmont's prime minister and diplomat), **Garibaldi** (military leader of the Thousand) and King **Victor Emmanuel II**.\n" +
        "- Italy's capital moved from **Turin** (1861) to **Florence** (1865) to **Rome** (1871).\n" +
        "- Germany was united by Prussia's chancellor **Otto von Bismarck** through three short wars. Austria was left out of the new Germany.",
      table: {
        columns: ["Date", "Event", "Key figure"],
        rows: [
          { cells: ["1848 to 1849", "First Italian War of Independence, lost to Austria", "Charles Albert, king of Piedmont-Sardinia"] },
          { cells: ["1859", "Second War of Independence: Lombardy won", "Cavour, allied with Napoleon III of France"] },
          { cells: ["1860", "Expedition of the Thousand conquers the Kingdom of the Two Sicilies", "Giuseppe Garibaldi"] },
          { cells: ["17 March 1861", "Kingdom of Italy proclaimed", "Victor Emmanuel II, first king of Italy"] },
          { cells: ["1866", "Third War of Independence: Venetia joins Italy", "Italy allied with Prussia against Austria"] },
          { cells: ["20 September 1870", "Rome taken (the breach of Porta Pia); capital from 1871", "End of the Pope's temporal power"] },
          { cells: ["1864 to 1871", "Prussian wars against Denmark, Austria and France", "Otto von Bismarck"] },
          { cells: ["18 January 1871", "German Empire proclaimed in the Hall of Mirrors at Versailles", "Wilhelm I of Prussia, first German Kaiser"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which city was the first capital of the Kingdom of Italy in 1861?",
        options: ["Rome", "Turin", "Florence", "Milan", "Naples"],
        steps: [
          "The kingdom was built around Piedmont-Sardinia, whose capital was Turin, so Turin was the first capital.",
          "Florence followed in 1865, and Rome only in 1871 after it was taken in 1870. Milan and Naples were never capitals of united Italy.",
        ],
        answer: "(B) Turin",
      },
      practiceSet: [
        { prompt: "Who led the Expedition of the Thousand?", answer: "Giuseppe Garibaldi (1860)" },
        { prompt: "Who was the first king of Italy?", answer: "Victor Emmanuel II" },
        { prompt: "Where was the German Empire proclaimed in 1871?", answer: "In the Hall of Mirrors at Versailles, France" },
        { prompt: "Which Italian patriot founded Young Italy?", answer: "Giuseppe Mazzini" },
      ],
      traps: [
        {
          title: "Italy was united as a monarchy, not a republic",
          body: "Mazzini wanted a republic, but unification produced the Kingdom of Italy under the House of Savoy in 1861. Italy only became a republic after the referendum of 2 June 1946.",
        },
      ],
    },
  ],
};
