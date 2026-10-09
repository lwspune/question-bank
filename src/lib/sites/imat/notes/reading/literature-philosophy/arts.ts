import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_LIT_ARTS_NOTE: SubtopicNote = {
  subtopicName: "Art, Music and Cinema",
  title: "Painting, Music, Opera Houses, Dance and Film",
  oneLineDefinition:
    "The art movements and their painters, the great composers and opera houses, world dance traditions, and the film directors the exam names most.",
  whyItMatters:
    "This chapter's Cambridge questions often left the page for the other arts: an Impressionist pair of painters, an opera by an Italian composer, a theatre matched with its city, a dance matched with its country, and three questions on film directors.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-lit-painting",
      name: "Art movements and their painters",
      intuition:
        "Each art movement answered the question \"what should a painting do?\" in a new way: show perfect balance (Renaissance), drama (Baroque), the passing light of a moment (Impressionism), many viewpoints at once (Cubism), dreams (Surrealism). Learn two names and one hallmark per movement.",
      definition:
        "- **Impressionism** took its name from Monet's painting **Impression, Sunrise**; the group first exhibited in Paris in **1874**.\n" +
        "- **Pointillism** (Seurat, Signac) builds images from small dots of pure colour.\n" +
        "- **Futurism** was an Italian movement launched by **Marinetti**'s manifesto (1909).\n" +
        "- **Cubism** was created by **Picasso** and **Braque** from about 1907.",
      table: {
        columns: ["Movement", "Period", "Artists", "Hallmark"],
        rows: [
          { cells: ["Renaissance", "1400s to 1500s, Italy", "Botticelli, Leonardo, Michelangelo, Raphael, Titian", "Perspective, classical balance"] },
          { cells: ["Baroque", "1600s", "Caravaggio, Bernini, Rubens, Rembrandt, Velázquez", "Drama, movement, strong light and shadow"] },
          { cells: ["Neoclassicism", "About 1760 to 1830", "Jacques-Louis David, Antonio Canova", "Calm forms modelled on Greece and Rome"] },
          { cells: ["Romanticism", "About 1800 to 1850", "Delacroix (Liberty Leading the People), Goya, Turner, Friedrich", "Emotion, nature, revolt"] },
          { cells: ["Impressionism", "From 1874, France", "Monet, Renoir, Degas, Pissarro, Morisot", "Outdoor light and visible quick brushstrokes"] },
          { cells: ["Post-Impressionism", "1880s to 1900s", "Van Gogh, Cézanne, Gauguin; Seurat (pointillism)", "Strong colour and structure"] },
          { cells: ["Fauvism", "1905 to 1908", "Henri Matisse, André Derain", "Wild, unnatural colour"] },
          { cells: ["Cubism", "From about 1907", "Pablo Picasso, Georges Braque", "Objects broken into geometric planes seen from many sides"] },
          { cells: ["Futurism", "From 1909, Italy", "Marinetti, Umberto Boccioni, Giacomo Balla", "Speed, machines and the modern city"] },
          { cells: ["Surrealism", "From 1924", "Salvador Dalí, René Magritte, Max Ernst", "Dreams and the unconscious"] },
          { cells: ["Abstract Expressionism", "1940s to 1950s, New York", "Jackson Pollock, Mark Rothko", "Large abstract canvases, drip painting"] },
          { cells: ["Pop Art", "1950s to 1960s", "Andy Warhol, Roy Lichtenstein", "Images from advertising and comics"] },
        ],
      },
      selfCheckExample: {
        prompt: "Pablo Picasso and Georges Braque are the founders of which movement?",
        options: ["Cubism", "Impressionism", "Futurism", "Surrealism", "Fauvism"],
        steps: [
          "Picasso and Braque created Cubism from about 1907, breaking objects into geometric planes.",
          "Impressionism is Monet and Renoir, Futurism Marinetti and Boccioni, Surrealism Dalí and Magritte, Fauvism Matisse.",
        ],
        answer: "(A) Cubism",
      },
      practiceSet: [
        { prompt: "Which painting gave Impressionism its name?", answer: "Monet's Impression, Sunrise" },
        { prompt: "Which Italian movement celebrated speed and machines?", answer: "Futurism (1909)" },
        { prompt: "Which Baroque Italian painter is famous for dramatic light and shadow?", answer: "Caravaggio" },
      ],
      traps: [
        {
          title: "Pointillism is not Impressionism",
          body: "Seurat and Signac built pictures from dots of pure colour: Pointillism, a Post-Impressionist style of the 1880s. Monet and Renoir are Impressionists, with loose brushstrokes. Abstract Expressionism (Pollock) is American and far later.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-lit-composers",
      name: "Composers and their famous works",
      intuition:
        "Opera was invented in Italy around 1600, and Italian composers dominated it for three centuries. Learn each composer with his country and two works; operas often name their heroine or their setting, which helps.",
      definition:
        "- **Baroque** (about 1600 to 1750): Monteverdi, Vivaldi, Bach.\n" +
        "- **Classical** (about 1750 to 1820): Mozart, early Beethoven.\n" +
        "- **Romantic** and Italian **opera** (1800s): Rossini, Verdi, Wagner, Bizet, Puccini.\n" +
        "- Beethoven's Ninth Symphony ends with the **Ode to Joy**, now the **anthem of the European Union**.",
      table: {
        columns: ["Composer", "Country", "Period", "Famous works"],
        rows: [
          { cells: ["Claudio Monteverdi", "Italy", "Early Baroque", "L'Orfeo (1607), one of the first operas"] },
          { cells: ["Antonio Vivaldi", "Italy (Venice)", "Baroque", "The Four Seasons"] },
          { cells: ["Johann Sebastian Bach", "Germany", "Baroque", "Brandenburg Concertos; St Matthew Passion"] },
          { cells: ["Wolfgang Amadeus Mozart", "Austria (Salzburg)", "Classical", "The Marriage of Figaro; Don Giovanni; The Magic Flute"] },
          { cells: ["Ludwig van Beethoven", "Germany, worked in Vienna", "Classical to Romantic", "Nine symphonies; Fidelio"] },
          { cells: ["Gioachino Rossini", "Italy (Pesaro)", "19th-century opera", "The Barber of Seville; William Tell"] },
          { cells: ["Giuseppe Verdi", "Italy (near Parma)", "19th-century opera", "Nabucco; Rigoletto; La traviata; Aida"] },
          { cells: ["Richard Wagner", "Germany", "19th-century opera", "The Ring of the Nibelung; Tristan und Isolde"] },
          { cells: ["Georges Bizet", "France", "19th-century opera", "Carmen, set in Seville"] },
          { cells: ["Pyotr Ilyich Tchaikovsky", "Russia", "Romantic", "Swan Lake; The Nutcracker"] },
          { cells: ["Giacomo Puccini", "Italy (Lucca)", "Late Romantic opera", "La bohème; Tosca; Madama Butterfly (set in Nagasaki); Turandot"] },
        ],
      },
      selfCheckExample: {
        prompt: "Who composed The Four Seasons?",
        options: ["Johann Sebastian Bach", "Wolfgang Amadeus Mozart", "Antonio Vivaldi", "Giuseppe Verdi", "Gioachino Rossini"],
        steps: [
          "The Four Seasons is a set of four violin concertos by the Venetian Baroque composer Antonio Vivaldi.",
          "Bach is German Baroque but did not write it; Mozart is Classical; Verdi and Rossini are 19th-century opera composers.",
        ],
        answer: "(C) Antonio Vivaldi",
      },
      practiceSet: [
        { prompt: "Which composer wrote Aida and La traviata?", answer: "Giuseppe Verdi" },
        { prompt: "Which opera by Bizet is set in Seville?", answer: "Carmen" },
        { prompt: "Which piece of music is the anthem of the European Union?", answer: "The Ode to Joy from Beethoven's Ninth Symphony" },
      ],
      traps: [
        {
          title: "Puccini, Verdi, Rossini: three Italians, different operas",
          body: "Rossini wrote The Barber of Seville, Verdi wrote Rigoletto, La traviata and Aida, and Puccini wrote La bohème, Tosca, Madama Butterfly and Turandot. Bizet (Carmen) is French and Wagner (the Ring) German.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-lit-venues-dance",
      name: "Opera houses and dance traditions of the world",
      intuition:
        "Famous theatres are tied to their cities, and many famous dances are tied to one country or even one region. A question gives several pairs and only one is right, so learn each pair exactly.",
      definition:
        "- Italy's three most famous opera houses: **La Scala** (Milan), **La Fenice** (Venice), **San Carlo** (Naples).\n" +
        "- Russia's two great ballet and opera houses: the **Bolshoi** (Moscow) and the **Mariinsky** (Saint Petersburg).\n" +
        "- **Flamenco** is from **Andalusia** in southern Spain; **tango** from the **Río de la Plata** (Buenos Aires and Montevideo).",
      table: {
        columns: ["Name", "Type", "Place"],
        rows: [
          { cells: ["Teatro alla Scala", "Opera house (1778)", "Milan"] },
          { cells: ["La Fenice", "Opera house (1792)", "Venice"] },
          { cells: ["Teatro di San Carlo", "Opera house (1737), the oldest still in use in Europe", "Naples"] },
          { cells: ["Bolshoi Theatre", "Opera and ballet", "Moscow"] },
          { cells: ["Mariinsky Theatre", "Opera and ballet", "Saint Petersburg"] },
          { cells: ["Palais Garnier", "Opera house (1875)", "Paris"] },
          { cells: ["Metropolitan Opera", "Opera house", "New York"] },
          { cells: ["Flamenco", "Dance and song", "Andalusia, Spain"] },
          { cells: ["Tango", "Dance", "Argentina and Uruguay"] },
          { cells: ["Samba", "Dance", "Brazil"] },
          { cells: ["Mambo and salsa", "Dance", "Cuba (salsa developed further in New York)"] },
          { cells: ["Haka", "Māori ceremonial dance", "New Zealand"] },
          { cells: ["Bharatanatyam", "Classical dance", "Tamil Nadu, India"] },
          { cells: ["Tarantella", "Folk dance", "Southern Italy"] },
          { cells: ["Waltz", "Ballroom dance", "Austria and southern Germany (Vienna)"] },
        ],
      },
      selfCheckExample: {
        prompt: "In which part of the world did the tango originate?",
        options: ["Andalusia, Spain", "Cuba", "Brazil", "Portugal", "Argentina and Uruguay"],
        steps: [
          "The tango was born in the late 1800s in the port cities of the Río de la Plata: Buenos Aires and Montevideo.",
          "Andalusia gave flamenco, Cuba the mambo, Brazil the samba; Portugal is known for fado, a song form, not the tango.",
        ],
        answer: "(E) Argentina and Uruguay",
      },
      practiceSet: [
        { prompt: "In which city is La Fenice?", answer: "Venice" },
        { prompt: "In which city is the Bolshoi Theatre?", answer: "Moscow" },
        { prompt: "Which country is the haka from?", answer: "New Zealand (Māori)" },
      ],
      traps: [
        {
          title: "Flamenco is Spanish, the tango is South American",
          body: "Both are passionate dances with a Spanish-speaking connection, so they get swapped. Flamenco comes from Andalusia in Spain; the tango from Buenos Aires and Montevideo.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-lit-film",
      name: "Film directors and their best-known films",
      intuition:
        "Italian cinema has a golden age the ministry is proud of: neorealism after the war, then Fellini and the spaghetti western. Hollywood directors complete the list. Learn each director with two titles and their country.",
      definition:
        "- **Neorealism** (1940s): real locations, non-professional actors, post-war poverty (**Rossellini**, **De Sica**).\n" +
        "- **Federico Fellini** (Rimini, 1920 to 1993): dreamlike, autobiographical films; Amarcord recalls his Rimini youth.\n" +
        "- **Spaghetti westerns**: westerns made by Italian directors, above all **Sergio Leone**.\n" +
        "- The **Venice Film Festival** (since 1932) is the oldest in the world; **Cannes** gives the Palme d'Or.",
      table: {
        columns: ["Director", "Country", "Famous films"],
        rows: [
          { cells: ["Roberto Rossellini", "Italy", "Rome, Open City (1945)"] },
          { cells: ["Vittorio De Sica", "Italy", "Bicycle Thieves (1948)"] },
          { cells: ["Federico Fellini", "Italy", "La strada; La dolce vita; 8½; Amarcord"] },
          { cells: ["Michelangelo Antonioni", "Italy", "L'avventura; Blow-Up"] },
          { cells: ["Sergio Leone", "Italy", "The Good, the Bad and the Ugly; Once Upon a Time in the West"] },
          { cells: ["Roberto Benigni", "Italy", "Life Is Beautiful (1997, three Oscars)"] },
          { cells: ["Paolo Sorrentino", "Italy", "The Great Beauty (Oscar 2014)"] },
          { cells: ["Matteo Garrone", "Italy", "Gomorrah (2008)"] },
          { cells: ["Alfred Hitchcock", "United Kingdom, then USA", "Psycho; Vertigo; Rear Window"] },
          { cells: ["Stanley Kubrick", "USA, worked in the UK", "2001: A Space Odyssey; A Clockwork Orange; The Shining"] },
          { cells: ["Francis Ford Coppola", "USA", "The Godfather trilogy; Apocalypse Now"] },
          { cells: ["Martin Scorsese", "USA", "Taxi Driver; Goodfellas"] },
          { cells: ["Steven Spielberg", "USA", "Jaws; E.T.; Schindler's List"] },
          { cells: ["François Truffaut", "France", "The 400 Blows (French New Wave)"] },
          { cells: ["Ingmar Bergman", "Sweden", "The Seventh Seal"] },
          { cells: ["Akira Kurosawa", "Japan", "Rashomon; Seven Samurai"] },
        ],
      },
      selfCheckExample: {
        prompt: "Who directed the neorealist film Bicycle Thieves (1948)?",
        options: ["Roberto Rossellini", "Vittorio De Sica", "Federico Fellini", "Sergio Leone", "Michelangelo Antonioni"],
        steps: [
          "Bicycle Thieves is Vittorio De Sica's masterpiece of neorealism.",
          "Rossellini is the other great neorealist (Rome, Open City), but this film is not his. Fellini, Leone and Antonioni made their name later, in different styles.",
        ],
        answer: "(B) Vittorio De Sica",
      },
      practiceSet: [
        { prompt: "Which Italian director is most associated with the spaghetti western?", answer: "Sergio Leone" },
        { prompt: "Who directed Psycho?", answer: "Alfred Hitchcock" },
        { prompt: "Which is the oldest film festival in the world?", answer: "The Venice Film Festival (1932)" },
      ],
      traps: [
        {
          title: "Italian-American is not Italian",
          body: "Coppola and Scorsese are American directors of Italian descent who made gangster films (The Godfather, Goodfellas). Leone, Fellini and Garrone are Italian directors. Options mix the two groups.",
        },
      ],
    },
  ],
};
