import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_AK_NONCHORDATES_NOTE: SubtopicNote = {
  subtopicName: "Non-Chordate Phyla",
  title: "Non-Chordate Phyla",
  oneLineDefinition:
    "The ten non-chordate phyla from Porifera to Hemichordata: each one's body plan, its signature feature and the example animals NCERT names.",
  whyItMatters:
    "Seven NEET questions from 2021 to 2026, three of them in NEET 2021. Six of the seven are match-the-columns or pick-the-correct-statements items that mix several phyla, so each phylum's signature feature and its named examples must be ready.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzoak-lower-phyla",
      name: "Porifera to Aschelminthes",
      intuition:
        "These five phyla are the simpler animals. Sponges are little more than a mass of cells with water running through them. Coelenterates and comb jellies have two germ layers and radial symmetry. Flatworms and roundworms are the first with three germ layers and a left and right side, but they still have no true coelom. Each phylum has one signature feature that NEET pairs with its name.",
      definition:
        "- **Porifera (sponges):** mostly marine and asymmetrical, at the cellular level. Water enters through tiny pores, the **ostia**, into a central cavity, the **spongocoel**, and leaves through the **osculum**. This **water transport or canal system** helps in food gathering, respiratory exchange and removal of waste. **Choanocytes (collar cells)** line the spongocoel and canals. Digestion is intracellular. The skeleton is of **spicules or spongin fibres**. Sexes are not separate (hermaphrodite). Fertilisation is internal and development indirect.\n" +
        "- **Coelenterata (Cnidaria):** aquatic, mostly marine, radially symmetrical, diploblastic, at the tissue level. Named after the **cnidoblasts (cnidocytes)** on the tentacles and body, which hold stinging capsules (**nematocysts**) used for anchorage, defence and capturing prey. One opening, the mouth on the hypostome, leads into the gastro-vascular cavity. Corals have a skeleton of calcium carbonate. Two body forms: the sessile **polyp** (*Hydra*, *Adamsia*) and the free-swimming **medusa** (*Aurelia*). Where both occur there is **metagenesis**: polyps produce medusae asexually and medusae form polyps sexually (*Obelia*).\n" +
        "- **Ctenophora (sea walnuts, comb jellies):** exclusively marine, radial, diploblastic, tissue level. **Eight external rows of ciliated comb plates help in locomotion.** Bioluminescence is well marked. Sexes are not separate; reproduction is only sexual; fertilisation external; development indirect.\n" +
        "- **Platyhelminthes (flatworms):** dorso-ventrally flattened, mostly endoparasites, bilateral, triploblastic, acoelomate, organ level. Parasites have **hooks and suckers**; some absorb food through the body surface. **Flame cells** help in osmoregulation and excretion. Sexes are not separate; fertilisation internal; many larval stages. *Planaria* has a high power of regeneration.\n" +
        "- **Aschelminthes (roundworms):** circular in cross-section; free-living or parasitic; **organ-system level**, bilateral, triploblastic, **pseudocoelomate**. The alimentary canal is complete, with a muscular pharynx. An excretory tube removes wastes through the excretory pore. Sexes are separate, and **females are often longer than males**.",
      table: {
        columns: ["Phylum", "Body plan", "Signature features", "Examples"],
        rows: [
          { cells: ["Porifera", "Cellular level; mostly asymmetrical; no body cavity", "Water canal system (ostia, spongocoel, osculum); choanocytes; spicules or spongin", "Sycon, Spongilla, Euspongia"] },
          {
            cells: ["Coelenterata", "Tissue level; radial; diploblastic", "Cnidoblasts with nematocysts; polyp and medusa; metagenesis in Obelia", "Physalia, Adamsia, Pennatula, Gorgonia, Meandrina"],
            noteAmber: "NEET 2021: metagenesis belongs to the cnidarians, so a statement giving it to helminths was false.",
            pyqExampleId: "a6006b6c-79af-458f-964a-2183f519f999",
          },
          { cells: ["Ctenophora", "Tissue level; radial; diploblastic; only marine", "Eight rows of ciliated comb plates for locomotion; bioluminescence", "Pleurobrachia, Ctenoplana"] },
          {
            cells: ["Platyhelminthes", "Organ level; bilateral; triploblastic; acoelomate; flattened", "Hooks and suckers; flame cells; incomplete gut", "Taenia, Fasciola"],
            noteAmber: "NEET 2026: an incomplete gut in Platyhelminthes and a pseudocoelom in Aschelminthes were both correct statements.",
            pyqExampleId: "479f35cb-a56e-4f64-8b7d-9cb7e5d0a51c",
          },
          { cells: ["Aschelminthes", "Organ-system level; bilateral; triploblastic; pseudocoelomate", "Complete gut with muscular pharynx; excretory pore; sexes separate", "Ascaris, Wuchereria, Ancylostoma"] },
        ],
      },
      pyqExampleId: "ddbcbd46-6032-49ff-9590-4d7a534baa51",
      selfCheckExample: {
        prompt: "Trace the path of water through the canal system of a sponge, naming the openings and the cavity it passes through.",
        steps: [
          "Water enters through the many minute pores in the body wall, the ostia.",
          "It flows into the central cavity, the spongocoel, lined with choanocytes.",
          "It leaves through the osculum.",
        ],
        answer: "Ostia, then the spongocoel, then out through the osculum.",
      },
      practiceSet: [
        { prompt: "Which cells line the spongocoel and the canals of a sponge?", answer: "Choanocytes, or collar cells" },
        { prompt: "What are the stinging capsules inside the cnidoblasts of a coelenterate called?", answer: "Nematocysts" },
        { prompt: "In metagenesis, which body form produces the other asexually, and which NCERT example shows it?", answer: "The polyp produces medusae asexually; Obelia" },
        { prompt: "Which specialised cells help flatworms in osmoregulation and excretion?", answer: "Flame cells" },
        { prompt: "Give the genus names of the hookworm and the filaria worm.", answer: "Ancylostoma and Wuchereria" },
      ],
      traps: [
        {
          title: "Comb plates are for locomotion",
          body: "The eight rows of ciliated **comb plates** of ctenophores help in **locomotion**, not digestion.",
        },
        {
          title: "Metagenesis is a cnidarian feature",
          body: "Alternation of the **polyp** (asexual) and **medusa** (sexual) generations is **metagenesis**, shown by coelenterates such as *Obelia*. It is not a feature of helminths.",
        },
        {
          title: "Ctenophores reproduce only sexually",
          body: "Sponges reproduce asexually by fragmentation as well as sexually, but **ctenophores reproduce only sexually**, with external fertilisation.",
        },
        {
          title: "Roundworms are organ-system level with a complete gut",
          body: "**Aschelminthes** have an **organ-system** level body and a **complete** alimentary canal. The incomplete gut belongs to **Platyhelminthes**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoak-higher-phyla",
      name: "Annelida to Hemichordata",
      intuition:
        "These five phyla all have three germ layers, a true coelom and organ systems. What sets them apart is one striking feature each: rings of segments in annelids, jointed legs and a chitin coat in arthropods, a shell and a rasping tongue in molluscs, a water-filled tube system in echinoderms, and a proboscis, collar and trunk in hemichordates.",
      definition:
        "- **Annelida:** aquatic or terrestrial; **metamerically segmented** (Latin *annulus*, little ring), coelomate, bilateral. Longitudinal and circular muscles help in locomotion. *Nereis* has lateral appendages, **parapodia**, for swimming. **Closed circulatory system.** **Nephridia** help in osmoregulation and excretion. Paired ganglia are joined by lateral nerves to a **double ventral nerve cord**. *Nereis* is dioecious, but **earthworms and leeches are monoecious**.\n" +
        "- **Arthropoda:** the **largest phylum**; over two-thirds of all named species are arthropods. A **chitinous exoskeleton**, a body of head, thorax and abdomen, and **jointed appendages**. Respiration by gills, book gills, book lungs or a tracheal system. **Open circulatory system.** Sense organs: antennae, compound and simple eyes, statocysts (balancing organs). Excretion by **Malpighian tubules**. Mostly dioecious and oviparous.\n" +
        "- **Mollusca:** the **second largest phylum**. Unsegmented, with a **calcareous shell**, a distinct head, a muscular foot and a visceral hump. A soft spongy **mantle** covers the hump; feather-like gills in the mantle cavity have respiratory and excretory functions. The mouth has a file-like rasping organ, the **radula**. Usually dioecious and oviparous, with indirect development.\n" +
        "- **Echinodermata:** spiny-bodied, with an endoskeleton of **calcareous ossicles**; **all marine**. Adults radial, larvae bilateral. The gut is complete, with the **mouth on the lower (ventral) side and the anus on the upper (dorsal) side**. The **water vascular system** helps in **locomotion, capture and transport of food and respiration**. **An excretory system is absent.** Sexes separate; fertilisation usually external; indirect development with a free-swimming larva.\n" +
        "- **Hemichordata:** once a subphylum of Chordata, now a **separate phylum under non-chordata**. Small, worm-like, marine; body of a **proboscis, a collar and a long trunk**. A rudimentary structure in the collar, the **stomochord**, is similar to a notochord. **Open circulatory system**; respiration by gills; excretion by the **proboscis gland**. Sexes separate; fertilisation external; indirect development.",
      table: {
        columns: ["Phylum", "Body plan", "Signature features", "Examples"],
        rows: [
          { cells: ["Annelida", "Metamerically segmented; coelomate; bilateral", "Parapodia in Nereis; closed circulation; nephridia; double ventral nerve cord", "Nereis, Pheretima, Hirudinaria"] },
          {
            cells: ["Arthropoda", "Largest phylum; chitinous exoskeleton; jointed appendages", "Open circulation; gills, book gills, book lungs or tracheae; Malpighian tubules", "Apis, Bombyx, Laccifer, Anopheles, Culex, Aedes, Locusta, Limulus"],
            noteAmber: "Re-NEET 2024: Anopheles, Limax and Limulus all have an open circulatory system; Nereis, Hirudinaria and Pheretima do not.",
            pyqExampleId: "43088605-0ebf-47ac-94e7-3192f41aa226",
          },
          {
            cells: ["Mollusca", "Second largest phylum; unsegmented; calcareous shell; head, foot, visceral hump", "Mantle and mantle cavity with gills; radula", "Pila, Pinctada, Sepia, Loligo, Octopus, Aplysia, Dentalium, Chaetopleura"],
            noteAmber: "NEET 2024: the radula goes with Mollusca, the stomochord with Hemichordata and Pleurobrachia with Ctenophora.",
            pyqExampleId: "b6320340-fee7-42fe-ae91-136afe10d021",
          },
          { cells: ["Echinodermata", "All marine; calcareous ossicles; adult radial, larva bilateral", "Water vascular system; no excretory system", "Asterias, Echinus, Antedon, Cucumaria, Ophiura"] },
          { cells: ["Hemichordata", "Worm-like, marine; proboscis, collar and trunk", "Stomochord in the collar; open circulation; proboscis gland", "Balanoglossus, Saccoglossus"] },
        ],
      },
      pyqExampleId: "b12d550c-184a-4544-bcb0-17240c897560",
      selfCheckExample: {
        prompt: "Which organ does Balanoglossus use for excretion, and which structure in its collar resembles a notochord?",
        steps: [
          "Balanoglossus is a hemichordate.",
          "Hemichordates excrete through the proboscis gland.",
          "Their collar has a rudimentary stomochord, similar to a notochord.",
        ],
        answer: "The proboscis gland; the stomochord.",
      },
      practiceSet: [
        { prompt: "What are the lateral appendages of Nereis called, and what do they help in?", answer: "Parapodia; swimming" },
        { prompt: "Through which structures do arthropods excrete?", answer: "Malpighian tubules" },
        { prompt: "Name the file-like rasping organ in the mouth of a mollusc.", answer: "The radula" },
        { prompt: "In an echinoderm, which side carries the mouth and which carries the anus?", answer: "The mouth is on the lower (ventral) side and the anus on the upper (dorsal) side" },
        { prompt: "Which is the largest animal phylum, and which is the second largest?", answer: "Arthropoda; Mollusca" },
      ],
      traps: [
        {
          title: "Echinoderms have no excretory system",
          body: "The water vascular system does **locomotion, capture and transport of food and respiration**. It does not do excretion or digestion: **echinoderms have no excretory system** at all.",
        },
        {
          title: "Annelids are closed, arthropods and hemichordates open",
          body: "**Annelids** such as *Nereis*, *Pheretima* and *Hirudinaria* have a **closed** circulatory system. **Arthropods** and **hemichordates** have an **open** one.",
        },
        {
          title: "Earthworms and leeches are monoecious",
          body: "*Nereis* is **dioecious**, but **earthworms and leeches are monoecious**. Do not take one annelid's sexes for the whole phylum.",
        },
        {
          title: "The stomochord is not a notochord",
          body: "Hemichordates have a **stomochord**, a structure only **similar** to a notochord, and NCERT now places them as a separate phylum under **non-chordata**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoak-invertebrate-names",
      name: "Example animals of the non-chordate phyla",
      intuition:
        "NEET often hands you a list of genus names and asks you to match each with its common name or its phylum. The names are not hard once you have seen them sorted by phylum. Learn them as NCERT lists them, and watch for the ones whose common names mislead, like the devil fish and the cuttlefish, which are not fish at all.",
      definition:
        "NCERT's examples, phylum by phylum:\n" +
        "- **Porifera:** *Sycon* (*Scypha*), *Spongilla* (fresh water sponge), *Euspongia* (bath sponge).\n" +
        "- **Coelenterata:** *Physalia* (Portuguese man-of-war), *Adamsia* (sea anemone), *Pennatula* (sea-pen), *Gorgonia* (sea-fan), *Meandrina* (brain coral), *Aurelia* (a medusa, jelly fish).\n" +
        "- **Ctenophora:** *Pleurobrachia*, *Ctenoplana* (comb jellies).\n" +
        "- **Platyhelminthes:** *Taenia* (tapeworm), *Fasciola* (liver fluke).\n" +
        "- **Aschelminthes:** *Ascaris* (roundworm), *Wuchereria* (filaria worm), *Ancylostoma* (hookworm).\n" +
        "- **Annelida:** *Nereis*, *Pheretima* (earthworm), *Hirudinaria* (blood-sucking leech).\n" +
        "- **Arthropoda:** useful insects *Apis* (honey bee), *Bombyx* (silkworm), *Laccifer* (lac insect); vectors *Anopheles*, *Culex* and *Aedes* (mosquitoes); gregarious pest *Locusta* (locust); living fossil *Limulus* (king crab).\n" +
        "- **Mollusca:** *Pila* (apple snail), *Pinctada* (pearl oyster), *Sepia* (cuttlefish), *Loligo* (squid), *Octopus* (devil fish), *Aplysia* (sea-hare), *Dentalium* (tusk shell), *Chaetopleura* (chiton).\n" +
        "- **Echinodermata:** *Asterias* (star fish), *Echinus* (sea urchin), *Antedon* (sea lily), *Cucumaria* (sea cucumber), *Ophiura* (brittle star).\n" +
        "- **Hemichordata:** *Balanoglossus*, *Saccoglossus*.",
      table: {
        columns: ["Genus", "Common name", "Phylum"],
        rows: [
          { cells: ["Euspongia", "Bath sponge", "Porifera"] },
          { cells: ["Physalia", "Portuguese man-of-war", "Coelenterata"] },
          { cells: ["Adamsia", "Sea anemone", "Coelenterata"] },
          { cells: ["Meandrina", "Brain coral", "Coelenterata"] },
          { cells: ["Pleurobrachia", "Comb jelly", "Ctenophora"] },
          { cells: ["Taenia", "Tapeworm", "Platyhelminthes"] },
          { cells: ["Fasciola", "Liver fluke", "Platyhelminthes"] },
          { cells: ["Wuchereria", "Filaria worm", "Aschelminthes"] },
          { cells: ["Ancylostoma", "Hookworm", "Aschelminthes"] },
          { cells: ["Hirudinaria", "Blood-sucking leech", "Annelida"] },
          { cells: ["Laccifer", "Lac insect", "Arthropoda"] },
          { cells: ["Limulus", "King crab, a living fossil", "Arthropoda"] },
          { cells: ["Pinctada", "Pearl oyster", "Mollusca"] },
          { cells: ["Octopus", "Devil fish", "Mollusca"] },
          { cells: ["Sepia", "Cuttlefish", "Mollusca"] },
          { cells: ["Antedon", "Sea lily", "Echinodermata"] },
          { cells: ["Ophiura", "Brittle star", "Echinodermata"] },
        ],
      },
      pyqExampleId: "a7aafaef-474c-493a-93b9-b13a151af1c0",
      selfCheckExample: {
        prompt: "Which phylum do the apple snail, the squid and the tusk shell belong to, and what are their genus names?",
        steps: [
          "All three have a soft body with a shell or a muscular foot, the mollusc plan.",
          "NCERT lists Pila (apple snail), Loligo (squid) and Dentalium (tusk shell) under Mollusca.",
        ],
        answer: "Mollusca: Pila, Loligo and Dentalium.",
      },
      practiceSet: [
        { prompt: "What is Euspongia commonly called?", answer: "The bath sponge" },
        { prompt: "What is the common name of Fasciola, and to which phylum does it belong?", answer: "The liver fluke; Platyhelminthes" },
        { prompt: "Which arthropod does NCERT name as a gregarious pest?", answer: "Locusta, the locust" },
        { prompt: "Which echinoderm is called the sea lily?", answer: "Antedon" },
        { prompt: "Name the three mosquito genera NCERT lists as vectors.", answer: "Anopheles, Culex and Aedes" },
      ],
      traps: [
        {
          title: "Devil fish and cuttlefish are molluscs",
          body: "The **devil fish** is *Octopus* and the **cuttlefish** is *Sepia*: both are **molluscs**, not fish. The **star fish**, *Asterias*, is an **echinoderm**.",
        },
        {
          title: "Limulus is an arthropod",
          body: "*Limulus*, the **king crab**, is the arthropod NCERT calls a **living fossil**.",
        },
        {
          title: "Physalia is the Portuguese man-of-war",
          body: "*Physalia* is the **Portuguese man-of-war**, a coelenterate; the **sea anemone** is *Adamsia*.",
        },
      ],
    },
  ],
};
