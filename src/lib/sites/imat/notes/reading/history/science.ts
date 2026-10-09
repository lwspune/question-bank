import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_HIS_SCIENCE_NOTE: SubtopicNote = {
  subtopicName: "History of Science and Medicine",
  title: "History of Science, Medicine and Great Prizes",
  oneLineDefinition:
    "Who discovered what, and when: the doctors, astronomers and physicists a medical student is expected to know, plus the Nobel Prizes and other famous awards.",
  whyItMatters:
    "This is the single biggest theme in the chapter's past questions: the father of medicine, Harvey and the circulation, Galileo, Ptolemy, the Curies, Einstein, Gauss, a scientist-discovery pairing, the Fields Medal and the Nobel Prizes all appear in the Cambridge papers.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-his-medicine",
      name: "Milestones in the history of medicine",
      intuition:
        "Medicine moved from ideas inherited from authority to knowledge tested by observation. Greek doctors first looked for natural causes of disease; Renaissance anatomists cut open bodies to check the old books; 19th-century scientists proved that germs cause infection. Each name below is linked to one breakthrough.",
      definition:
        "- **Hippocrates** is the \"father of Western medicine\": disease has natural causes, not divine ones. The **Hippocratic Oath** is named after him.\n" +
        "- **Galen**'s anatomy, based largely on animal dissection, ruled medicine for about 1,400 years until **Vesalius** corrected it from human dissection.\n" +
        "- **Germ theory** (Pasteur, Koch): specific microorganisms cause specific diseases. It led to antisepsis (Lister) and vaccines.",
      table: {
        columns: ["Person", "Place and date", "Contribution"],
        rows: [
          { cells: ["Hippocrates", "Kos, Greece, about 460 to 370 BC", "Father of Western medicine; the Hippocratic Oath"] },
          { cells: ["Galen", "Greek doctor in Rome, 2nd century AD", "Anatomy and physiology from animal dissection; the theory of the four humours"] },
          { cells: ["Avicenna (Ibn Sina)", "Persia, about 1025", "The Canon of Medicine, a standard textbook in Europe for centuries"] },
          { cells: ["Andreas Vesalius", "Padua, 1543", "De humani corporis fabrica: modern human anatomy"] },
          { cells: ["William Harvey", "England, 1628", "De Motu Cordis: the heart pumps blood round a closed circulation"] },
          { cells: ["Edward Jenner", "England, 1796", "First vaccine, against smallpox, using cowpox"] },
          { cells: ["Ignaz Semmelweis", "Vienna, 1847", "Handwashing by doctors cut deaths from childbed fever"] },
          { cells: ["Louis Pasteur", "France, 1860s to 1885", "Germ theory, pasteurisation, rabies vaccine"] },
          { cells: ["Joseph Lister", "Britain, 1867", "Antiseptic surgery using carbolic acid"] },
          { cells: ["Robert Koch", "Germany, 1882", "Identified the tuberculosis bacterium; Koch's postulates"] },
          { cells: ["Alexander Fleming", "London, 1928", "Discovered penicillin, the first antibiotic"] },
          { cells: ["James Watson and Francis Crick", "Cambridge, 1953", "Double-helix structure of DNA, using Rosalind Franklin's X-ray images"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which scientist is credited with developing the first vaccine?",
        options: ["Louis Pasteur", "Edward Jenner", "Robert Koch", "Joseph Lister", "Alexander Fleming"],
        steps: [
          "Edward Jenner vaccinated against smallpox with cowpox in 1796; the word vaccine comes from the Latin vacca, cow.",
          "Pasteur made later vaccines (rabies, 1885), Koch identified the TB bacterium, Lister introduced antiseptic surgery, and Fleming discovered penicillin, an antibiotic.",
        ],
        answer: "(B) Edward Jenner",
      },
      practiceSet: [
        { prompt: "In which year did William Harvey publish his account of the circulation of the blood?", answer: "1628" },
        { prompt: "Which disease did Robert Koch's 1882 discovery concern?", answer: "Tuberculosis" },
        { prompt: "Which oath, still recited by new doctors in some form, is named after a Greek physician?", answer: "The Hippocratic Oath" },
        { prompt: "In which university city did Vesalius teach anatomy?", answer: "Padua" },
      ],
      traps: [
        {
          title: "Philosophers are not the father of medicine",
          body: "Options often place a famous philosopher next to Hippocrates. Aristotle did important biology, but the title \"father of Western medicine\" belongs to Hippocrates of Kos, a practising physician.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-his-scientific-revolution",
      name: "Astronomy and the Scientific Revolution, Ptolemy to Newton",
      intuition:
        "For 1,400 years Europe accepted Ptolemy's picture of the Earth at the centre of the universe. Between Copernicus (1543) and Newton (1687) that picture was replaced by a Sun-centred system explained by one law of gravity. This change, and the new habit of testing ideas by experiment, is called the Scientific Revolution.",
      definition:
        "- **Geocentric** model: Earth at the centre (Ptolemy). **Heliocentric** model: Sun at the centre (Copernicus).\n" +
        "- **Galileo** used the telescope to support Copernicus and was condemned by the Inquisition in 1633. He also studied the pendulum and falling bodies and built an early thermometer (the thermoscope).\n" +
        "- **Newton** unified the motion of planets and falling objects in his law of universal gravitation.",
      table: {
        columns: ["Scientist", "Place and date", "Contribution"],
        rows: [
          { cells: ["Claudius Ptolemy", "Alexandria, 2nd century AD", "The Almagest: an Earth-centred model of the universe"] },
          { cells: ["Nicolaus Copernicus", "Poland, 1543", "De revolutionibus: a Sun-centred model"] },
          { cells: ["Galileo Galilei", "Pisa and Padua, 1609 to 1610", "Improved the telescope; discovered four moons of Jupiter; regular swing of the pendulum"] },
          { cells: ["Johannes Kepler", "Germany and Prague, 1609 to 1619", "Three laws of planetary motion: orbits are ellipses"] },
          { cells: ["Evangelista Torricelli", "Florence, 1643", "Mercury barometer"] },
          { cells: ["Isaac Newton", "England, 1687", "Principia: three laws of motion and universal gravitation; also calculus and optics"] },
          { cells: ["Carl Friedrich Gauss", "Germany, early 1800s", "The normal (Gaussian) distribution; number theory"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which astronomer first showed that the planets move in elliptical orbits?",
        options: ["Ptolemy", "Copernicus", "Galileo", "Kepler", "Newton"],
        steps: [
          "Kepler's first law (1609) states that each planet moves in an ellipse with the Sun at one focus.",
          "Ptolemy put the Earth at the centre; Copernicus put the Sun at the centre but kept circular orbits; Galileo observed with the telescope; Newton later explained Kepler's ellipses with gravity.",
        ],
        answer: "(D) Kepler",
      },
      practiceSet: [
        { prompt: "Which Italian invented the mercury barometer?", answer: "Evangelista Torricelli (1643)" },
        { prompt: "What did Kepler discover about the shape of planetary orbits?", answer: "They are ellipses" },
        { prompt: "What is the name of Newton's 1687 book?", answer: "Philosophiae Naturalis Principia Mathematica (the Principia)" },
      ],
      traps: [
        {
          title: "Galileo did not invent the battery or discover gravity's law",
          body: "Galileo improved the telescope, studied the pendulum and falling bodies, and built an early thermoscope. The electric battery is Volta's (1800), and the law of universal gravitation is Newton's (1687).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-his-modern-science",
      name: "Physics, chemistry and biology from Volta to Einstein",
      intuition:
        "In the 1800s and early 1900s science split into modern disciplines and produced most of the laws in your textbooks. Each discovery is tied to one person and usually one year. The pairs below are the ones exam options mix up.",
      definition:
        "- **Radioactivity** was discovered by **Becquerel** (1896); **Marie and Pierre Curie** then discovered the elements **polonium** (named after Poland, Marie's homeland) and **radium** (1898).\n" +
        "- **Einstein** published special relativity in **1905** and presented general relativity to the Prussian Academy in Berlin in **November 1915**.\n" +
        "- **Evolution by natural selection** was proposed by **Darwin** (and independently Wallace).",
      table: {
        columns: ["Scientist", "Date", "Discovery or invention"],
        rows: [
          { cells: ["Alessandro Volta", "1800", "Electric battery (the voltaic pile)"] },
          { cells: ["Michael Faraday", "1831", "Electromagnetic induction, the basis of generators"] },
          { cells: ["Charles Darwin", "1859", "On the Origin of Species: evolution by natural selection"] },
          { cells: ["Gregor Mendel", "1866", "Laws of inheritance, from pea plants"] },
          { cells: ["Dmitri Mendeleev", "1869", "Periodic table of the elements"] },
          { cells: ["Wilhelm Röntgen", "1895", "X-rays; first Nobel Prize in Physics (1901)"] },
          { cells: ["Henri Becquerel", "1896", "Radioactivity, from uranium salts"] },
          { cells: ["Marie and Pierre Curie", "1898", "Polonium and radium; study of radioactivity"] },
          { cells: ["Albert Einstein", "1905 and 1915", "Special and general relativity; E = mc²; the photoelectric effect"] },
          { cells: ["Hans Geiger", "1908 to 1928", "Radiation detector (the Geiger counter, with Müller)"] },
          { cells: ["Niels Bohr", "1913", "Model of the atom with electrons in fixed orbits"] },
          { cells: ["Ernst Ruska and Max Knoll", "1931", "The electron microscope"] },
        ],
      },
      selfCheckExample: {
        prompt: "Who discovered radioactivity, in 1896?",
        options: ["Henri Becquerel", "Wilhelm Röntgen", "Marie Curie", "Ernest Rutherford", "Niels Bohr"],
        steps: [
          "Becquerel found in 1896 that uranium salts give off radiation that darkens a photographic plate.",
          "Röntgen discovered X-rays a year earlier, a different kind of radiation. Marie Curie named and studied radioactivity after Becquerel's discovery, sharing the 1903 Nobel with him. Rutherford and Bohr worked on the structure of the atom later.",
        ],
        answer: "(A) Henri Becquerel",
      },
      practiceSet: [
        { prompt: "Which element is named after Marie Curie's home country?", answer: "Polonium (Poland)" },
        { prompt: "Who published On the Origin of Species, and when?", answer: "Charles Darwin, 1859" },
        { prompt: "Who invented the electric battery?", answer: "Alessandro Volta (1800)" },
      ],
      traps: [
        {
          title: "Uranium was not discovered by the Curies",
          body: "Uranium was identified in 1789 (by Klaproth); Becquerel found that its salts are radioactive in 1896. The Curies' new elements were polonium and radium. Hydrogen, nitrogen and boron were all known long before.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-his-prizes-firsts",
      name: "Nobel Prizes, other great awards and famous firsts",
      intuition:
        "Alfred Nobel, the Swedish inventor of dynamite, left his fortune to reward the people who most benefit humankind. His prizes became the best-known awards in the world, and other fields created their own versions. Learn which prize covers which field, and a few laureates the exam likes.",
      definition:
        "- **Nobel Prizes** (first awarded **1901**): Physics, Chemistry, Physiology or Medicine, Literature and Peace. The prize in **Economic Sciences** was added in **1969** by Sweden's central bank.\n" +
        "- They are presented in **Stockholm**, except the **Peace Prize**, presented in **Oslo**.\n" +
        "- There is **no Nobel Prize in mathematics**: the top awards there are the **Fields Medal** and the **Abel Prize**.",
      table: {
        columns: ["Prize or person", "Field or achievement", "Remember"],
        rows: [
          { cells: ["Marie Curie", "Nobel in Physics (1903) and Chemistry (1911)", "First woman to win a Nobel; only person with Nobels in two different sciences"] },
          { cells: ["Fields Medal", "Mathematics", "Every four years, to mathematicians under 40"] },
          { cells: ["Pulitzer Prize", "US journalism, fiction, drama and music", "Since 1917, run by Columbia University in New York"] },
          { cells: ["Turing Award", "Computer science", "Named after Alan Turing"] },
          { cells: ["Mahatma Gandhi", "Leader of India's non-violent independence movement", "Nominated several times but never awarded the Nobel Peace Prize"] },
          { cells: ["Nobel Peace laureates often asked", "Martin Luther King (1964), Willy Brandt (1971), Aung San Suu Kyi (1991), Nelson Mandela (1993), Malala Yousafzai (2014)", "Malala was 17: the youngest laureate"] },
          { cells: ["Rita Levi-Montalcini", "Nobel in Physiology or Medicine (1986)", "Italian neurologist; discovered nerve growth factor"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which Nobel Prize is presented in Oslo rather than in Stockholm?",
        options: [
          "The Nobel Prize in Literature",
          "The Nobel Prize in Chemistry",
          "The Nobel Peace Prize",
          "The Nobel Prize in Physiology or Medicine",
          "The Nobel Prize in Economic Sciences",
        ],
        steps: [
          "Nobel's will gave the Peace Prize to a committee chosen by the Norwegian parliament, so it is presented in Oslo.",
          "All the other prizes, including the later Economics prize, are presented in Stockholm.",
        ],
        answer: "(C) The Nobel Peace Prize",
      },
      practiceSet: [
        { prompt: "In which city is the Nobel Peace Prize presented?", answer: "Oslo" },
        { prompt: "In which two sciences did Marie Curie win Nobel Prizes?", answer: "Physics (1903) and Chemistry (1911)" },
        { prompt: "In which year was the Nobel Prize in Economic Sciences first awarded?", answer: "1969" },
      ],
      traps: [
        {
          title: "Famous peacemaker is not the same as Nobel laureate",
          body: "Gandhi never won the Nobel Peace Prize, though he was nominated several times. Martin Luther King, Nelson Mandela, Willy Brandt and Aung San Suu Kyi did. Exam options use Gandhi as the exception.",
        },
      ],
    },
  ],
};
