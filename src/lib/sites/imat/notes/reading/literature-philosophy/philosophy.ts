import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_LIT_PHILOSOPHY_NOTE: SubtopicNote = {
  subtopicName: "Philosophers and Thinkers",
  title: "Philosophy from the Presocratics to the 20th Century, and the World's Religions",
  oneLineDefinition:
    "The central idea of each major philosopher, the founders of the human sciences, and the origins and sacred texts of the main world religions.",
  whyItMatters:
    "The Cambridge papers asked twice which scholar was paired with the wrong field, once who founded analytic philosophy, and once which religion has no single founder. A medical student is expected to know the ethics of Hans Jonas and the main schools of psychology.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-lit-ancient-philosophy",
      name: "Ancient philosophy: the Presocratics, Socrates, Plato and Aristotle",
      intuition:
        "Greek philosophy began when thinkers in the 6th century BC asked what the world is made of and answered with nature, not myths. Socrates then turned the questions to how we should live. His pupil Plato and Plato's pupil Aristotle built the two systems that shaped European thought for two thousand years.",
      definition:
        "- **Presocratics**: the philosophers before Socrates, who looked for the **arche**, the first principle of everything.\n" +
        "- **Socrates** wrote nothing; we know him through Plato's dialogues. His method was questioning (the **Socratic method**).\n" +
        "- **Plato** taught that the true reality is a world of perfect **Forms** (Ideas); the **allegory of the cave** in The Republic illustrates it.\n" +
        "- **Aristotle** grounded knowledge in observation, invented formal **logic** (the syllogism) and wrote on biology, ethics and politics.",
      table: {
        columns: ["Philosopher", "Place and period", "Central idea or work"],
        rows: [
          { cells: ["Thales", "Miletus, about 600 BC", "The first principle of all things is water"] },
          { cells: ["Pythagoras", "Samos and Croton, 6th century BC", "Numbers are the basis of reality"] },
          { cells: ["Heraclitus", "Ephesus, about 500 BC", "Everything flows (panta rhei); reality is constant change"] },
          { cells: ["Parmenides", "Elea, southern Italy, about 500 BC", "Being is one and unchanging; change is an illusion"] },
          { cells: ["Democritus", "Abdera, about 400 BC", "Everything is made of indivisible atoms moving in the void"] },
          { cells: ["Socrates", "Athens, 470 to 399 BC", "Questioning method; \"I know that I know nothing\"; sentenced to death"] },
          { cells: ["Plato", "Athens, about 428 to 348 BC", "Theory of Forms; The Republic; founded the Academy"] },
          { cells: ["Aristotle", "Born in Stagira, worked in Athens, 384 to 322 BC", "Logic, biology, Nicomachean Ethics, Politics; founded the Lyceum; tutor of Alexander"] },
          { cells: ["Epicurus", "Athens, about 300 BC", "Happiness is calm pleasure and freedom from fear of death"] },
          { cells: ["The Stoics (Zeno of Citium, Seneca, Marcus Aurelius)", "300 BC to AD 180", "Live by reason; accept calmly what you cannot control"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which early Greek thinker taught that everything is made of indivisible atoms moving in the void?",
        options: ["Democritus", "Thales", "Heraclitus", "Parmenides", "Pythagoras"],
        steps: [
          "Atomism belongs to Democritus (and his teacher Leucippus); \"atomos\" means uncuttable.",
          "Thales said water, Heraclitus stressed constant change, Parmenides denied change, and Pythagoras put numbers at the base of reality.",
        ],
        answer: "(A) Democritus",
      },
      practiceSet: [
        { prompt: "Who founded the Academy in Athens?", answer: "Plato" },
        { prompt: "Which philosopher was tutor to Alexander the Great?", answer: "Aristotle" },
        { prompt: "Which Presocratic said that everything flows?", answer: "Heraclitus" },
      ],
      traps: [
        {
          title: "Socrates wrote nothing",
          body: "Everything we know of Socrates comes from others, mostly from Plato's dialogues. Works such as The Republic are Plato's. An option crediting a book to Socrates is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-lit-early-modern-philosophy",
      name: "Medieval and early modern philosophy, Augustine to Kant",
      intuition:
        "Medieval thinkers tried to fit Greek philosophy to Christian faith. From the 1600s, philosophers asked how we can know anything at all: by reason (the rationalists) or by experience (the empiricists). Kant, at the end of the 1700s, combined the two answers.",
      definition:
        "- **Scholasticism**: medieval philosophy taught in the universities, uniting faith and reason (**Thomas Aquinas**).\n" +
        "- **Rationalism**: knowledge comes mainly from reason (**Descartes**, **Spinoza**, **Leibniz**).\n" +
        "- **Empiricism**: knowledge comes from sense experience (**Bacon**, **Locke**, **Hume**).\n" +
        "- **Kant**: knowledge needs both experience and the mind's own structures; in ethics, the **categorical imperative** (act only on rules you could will to be universal laws).",
      table: {
        columns: ["Philosopher", "Country and date", "Central idea or work"],
        rows: [
          { cells: ["Augustine of Hippo", "North Africa, about 400", "Confessions; The City of God"] },
          { cells: ["Thomas Aquinas", "Italy, 13th century", "Summa Theologiae: Aristotle's philosophy joined to Christian faith"] },
          { cells: ["Francis Bacon", "England, 1620", "Novum Organum: knowledge by experiment and induction"] },
          { cells: ["René Descartes", "France, 1637", "Discourse on the Method: \"I think, therefore I am\"; mind and body as separate substances"] },
          { cells: ["Thomas Hobbes", "England, 1651", "Leviathan: without a strong state, life is \"nasty, brutish and short\""] },
          { cells: ["Baruch Spinoza", "Netherlands, 1677", "Ethics: God and Nature are one substance"] },
          { cells: ["John Locke", "England, 1689", "The mind at birth is a blank slate (tabula rasa)"] },
          { cells: ["Gottfried Wilhelm Leibniz", "Germany, about 1700", "Monads; this is the best of all possible worlds; calculus, independently of Newton"] },
          { cells: ["David Hume", "Scotland, 1739", "Scepticism: we never observe causation itself, only one event following another"] },
          { cells: ["Immanuel Kant", "Prussia, 1781", "Critique of Pure Reason; the categorical imperative"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which philosopher began from the certainty \"I think, therefore I am\"?",
        options: ["John Locke", "David Hume", "René Descartes", "Immanuel Kant", "Thomas Hobbes"],
        steps: [
          "\"Cogito, ergo sum\" is the starting point of Descartes, the founder of modern rationalism.",
          "Locke and Hume are empiricists who start from experience; Kant came later and joined the two traditions; Hobbes is known for Leviathan.",
        ],
        answer: "(C) René Descartes",
      },
      practiceSet: [
        { prompt: "Who wrote Leviathan?", answer: "Thomas Hobbes (1651)" },
        { prompt: "Which philosopher described the newborn mind as a blank slate?", answer: "John Locke" },
        { prompt: "Who wrote the Summa Theologiae?", answer: "Thomas Aquinas" },
      ],
      traps: [
        {
          title: "Rationalists and empiricists are not interchangeable",
          body: "Descartes, Spinoza and Leibniz are rationalists (reason first). Bacon, Locke and Hume are empiricists (experience first). Options often mix a name into the wrong group.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-lit-modern-philosophy",
      name: "Philosophy of the 19th and 20th centuries",
      intuition:
        "After Kant, philosophy split into many paths: Hegel's system of history, Marx's theory of class struggle, Nietzsche's attack on traditional morality, existentialism's focus on individual freedom. In the English-speaking world, analytic philosophy turned to logic and language. Pair each thinker with one book and one slogan.",
      definition:
        "- **Utilitarianism** (Bentham, **Mill**): the right action produces the greatest happiness for the greatest number.\n" +
        "- **Existentialism** (Kierkegaard as forerunner; **Sartre**, **de Beauvoir**): human beings have no fixed nature and must create themselves by their choices.\n" +
        "- **Analytic philosophy** (**Frege**, **Bertrand Russell**, **Wittgenstein**): clarify problems through logic and the analysis of language.\n" +
        "- **Hans Jonas**: an ethics of **responsibility** for technology and future generations, influential in bioethics.",
      table: {
        columns: ["Thinker", "Country and date", "Central idea or work"],
        rows: [
          { cells: ["G. W. F. Hegel", "Germany, 1807", "Phenomenology of Spirit; history moves by dialectic"] },
          { cells: ["Arthur Schopenhauer", "Germany, 1818", "The World as Will and Representation; pessimism"] },
          { cells: ["Søren Kierkegaard", "Denmark, 1840s", "The individual facing choice and anxiety; a forerunner of existentialism"] },
          { cells: ["John Stuart Mill", "England, 1859 and 1863", "On Liberty; Utilitarianism"] },
          { cells: ["Karl Marx", "Germany, 1848 and 1867", "The Communist Manifesto (with Engels); Capital; class struggle"] },
          { cells: ["Friedrich Nietzsche", "Germany, 1880s", "Thus Spoke Zarathustra; Beyond Good and Evil; \"God is dead\"; the Übermensch"] },
          { cells: ["Bertrand Russell", "United Kingdom, 1900s to 1910s", "A founder of analytic philosophy; Principia Mathematica (with Whitehead)"] },
          { cells: ["Ludwig Wittgenstein", "Austria and Cambridge, 1921 and 1953", "Tractatus Logico-Philosophicus; Philosophical Investigations"] },
          { cells: ["Martin Heidegger", "Germany, 1927", "Being and Time"] },
          { cells: ["Karl Popper", "Austria and United Kingdom, 1934", "Falsifiability: a scientific theory must be testable and could be proved wrong"] },
          { cells: ["Jean-Paul Sartre", "France, 1943", "Being and Nothingness: \"existence precedes essence\""] },
          { cells: ["Simone de Beauvoir", "France, 1949", "The Second Sex: \"one is not born, but becomes, a woman\""] },
          { cells: ["Hannah Arendt", "Germany and USA, 1951 and 1963", "The Origins of Totalitarianism; the \"banality of evil\""] },
          { cells: ["Hans Jonas", "Germany and USA, 1979", "The Imperative of Responsibility: ethics for the technological age"] },
          { cells: ["Michel Foucault", "France, 1960s to 1970s", "Power and knowledge; Discipline and Punish; history of madness and of the clinic"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which thinker summed up existentialism as \"existence precedes essence\"?",
        options: ["Friedrich Nietzsche", "G. W. F. Hegel", "Karl Marx", "Søren Kierkegaard", "Jean-Paul Sartre"],
        steps: [
          "The phrase is Sartre's (1940s): we exist first and define ourselves afterwards by our choices.",
          "Kierkegaard is a 19th-century forerunner of existentialism but not the author of the phrase. Nietzsche, Hegel and Marx belong to other traditions.",
        ],
        answer: "(E) Jean-Paul Sartre",
      },
      practiceSet: [
        { prompt: "Who proposed falsifiability as the mark of a scientific theory?", answer: "Karl Popper" },
        { prompt: "Who wrote Beyond Good and Evil?", answer: "Friedrich Nietzsche" },
        { prompt: "Who wrote The Second Sex?", answer: "Simone de Beauvoir (1949)" },
      ],
      traps: [
        {
          title: "Hans Jonas was a philosopher, not a physician",
          body: "Hans Jonas wrote about the ethics of technology and medicine, so his name appears in bioethics. But his field was philosophy. Options that list him as a doctor or a scientist are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-lit-thinkers-fields",
      name: "Founders of the human sciences and their fields",
      intuition:
        "Psychology, sociology, education, ethology and economics each have a few founding names. Questions give a list of person-field pairs and ask for the wrong one. Learn one field and one idea per person.",
      definition:
        "- **Psychology**: Freud (psychoanalysis), Pavlov (classical conditioning), Skinner (behaviourism), Piaget (child development).\n" +
        "- **Sociology**: Durkheim and Max Weber.\n" +
        "- **Ethology** (animal behaviour in the wild): Konrad Lorenz.\n" +
        "- **Pedagogy** (the science of teaching): Maria Montessori.",
      table: {
        columns: ["Name", "Field", "Known for"],
        rows: [
          { cells: ["Sigmund Freud", "Psychoanalysis", "The unconscious; The Interpretation of Dreams (1899)"] },
          { cells: ["Carl Gustav Jung", "Analytical psychology", "Archetypes and the collective unconscious"] },
          { cells: ["Ivan Pavlov", "Physiology", "Classical conditioning in dogs; Nobel 1904"] },
          { cells: ["B. F. Skinner", "Psychology (behaviourism)", "Operant conditioning: behaviour shaped by reward"] },
          { cells: ["Jean Piaget", "Developmental psychology", "Stages of children's thinking"] },
          { cells: ["Maria Montessori", "Pedagogy", "Child-centred teaching method; among Italy's first women doctors (1896)"] },
          { cells: ["Émile Durkheim", "Sociology", "Suicide (1897); social facts"] },
          { cells: ["Max Weber", "Sociology", "The Protestant Ethic and the Spirit of Capitalism (1905); bureaucracy"] },
          { cells: ["Konrad Lorenz", "Ethology", "Imprinting in young geese; Nobel 1973"] },
          { cells: ["Claude Lévi-Strauss", "Anthropology", "Structuralism"] },
          { cells: ["Noam Chomsky", "Linguistics", "Universal grammar"] },
          { cells: ["Max Planck", "Physics", "Quantum theory (1900)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Jean Piaget is best known for his work in which field?",
        options: ["Sociology", "Developmental psychology", "Economics", "Linguistics", "Anthropology"],
        steps: [
          "Piaget studied how children's thinking develops through stages.",
          "Sociology is Durkheim's and Weber's field, linguistics Chomsky's, anthropology Lévi-Strauss's; Piaget was not an economist.",
        ],
        answer: "(B) Developmental psychology",
      },
      practiceSet: [
        { prompt: "Who founded psychoanalysis?", answer: "Sigmund Freud" },
        { prompt: "What is the scientific study of animal behaviour in natural conditions called?", answer: "Ethology" },
        { prompt: "Who wrote The Protestant Ethic and the Spirit of Capitalism?", answer: "Max Weber" },
      ],
      traps: [
        {
          title: "Max Weber is a sociologist, Montessori the educator",
          body: "Max Weber founded modern sociology (the Protestant ethic, bureaucracy). Pedagogy belongs to Maria Montessori. When a pairing question lists famous names, check each person's real field rather than the one that sounds plausible.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-lit-religions",
      name: "World religions: founders, sacred texts and origins",
      intuition:
        "Most world religions trace their origin to one founding figure, but some grew slowly over centuries without one. Each has a sacred text you should be able to name. The three Abrahamic religions share a belief in one God and the figure of Abraham.",
      definition:
        "- **Abrahamic** (monotheistic) religions: **Judaism**, **Christianity**, **Islam**.\n" +
        "- Religions from **India**: **Hinduism** (no single founder), **Buddhism**, **Jainism**, **Sikhism**.\n" +
        "- Traditions from **China**: **Confucianism** and **Taoism**; from **Japan**: **Shinto** (no founder).",
      table: {
        columns: ["Religion", "Founder or origin", "Sacred text", "Fact to remember"],
        rows: [
          { cells: ["Judaism", "Abraham and Moses, by tradition; Middle East", "Hebrew Bible (the Torah is its first part)", "Oldest of the Abrahamic religions"] },
          { cells: ["Christianity", "Jesus of Nazareth, 1st century AD", "The Bible (Old and New Testaments)", "Largest religion in the world"] },
          { cells: ["Islam", "The Prophet Muhammad, 7th century AD, Arabia", "The Quran", "Five Pillars; pilgrimage to Mecca"] },
          { cells: ["Hinduism", "No single founder; grew over millennia in India", "Vedas, Upanishads, Bhagavad Gita", "Among the oldest living religions"] },
          { cells: ["Buddhism", "Siddhartha Gautama, the Buddha, about 5th century BC, India and Nepal", "Pali Canon (Tripitaka)", "Four Noble Truths; the Eightfold Path"] },
          { cells: ["Confucianism", "Confucius, China, about 500 BC", "The Analects", "An ethical system of family duty and social harmony"] },
          { cells: ["Taoism", "Laozi, by tradition; China", "Tao Te Ching", "Living in harmony with the Tao (the Way)"] },
          { cells: ["Sikhism", "Guru Nanak, Punjab, about 1500", "Guru Granth Sahib", "The Golden Temple at Amritsar"] },
          { cells: ["Shinto", "No founder; native religion of Japan", "Kojiki (ancient chronicles)", "Worship of kami (spirits) at shrines"] },
        ],
      },
      selfCheckExample: {
        prompt: "The Tao Te Ching is the central text of which tradition?",
        options: ["Confucianism", "Buddhism", "Shinto", "Taoism", "Hinduism"],
        steps: [
          "The Tao Te Ching, traditionally attributed to Laozi, is the founding text of Taoism.",
          "Confucianism's text is the Analects; Buddhism's the Pali Canon; Shinto's chronicles are the Kojiki; Hinduism's scriptures include the Vedas and Bhagavad Gita.",
        ],
        answer: "(D) Taoism",
      },
      practiceSet: [
        { prompt: "What is the sacred book of Islam?", answer: "The Quran" },
        { prompt: "Which religion was founded by Guru Nanak?", answer: "Sikhism" },
        { prompt: "Which Indian-born religion teaches the Four Noble Truths?", answer: "Buddhism" },
      ],
      traps: [
        {
          title: "Not every religion has a founder",
          body: "Christianity (Jesus), Islam (Muhammad), Buddhism (the Buddha), Confucianism (Confucius) and Sikhism (Guru Nanak) each trace back to one person. Hinduism and Shinto grew gradually from ancient traditions and have no single founder.",
        },
      ],
    },
  ],
};
