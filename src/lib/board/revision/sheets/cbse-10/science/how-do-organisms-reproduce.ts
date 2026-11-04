import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 10 Science, Ch. 7 How do Organisms Reproduce? Statements checked
 * against the NCERT text (definitions in the book's own words). Most-asked
 * years and marks from all 144 CBSE board past-paper questions in the bank,
 * 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Science",
  subjectRoute: "science",
  chapterName: "How do Organisms Reproduce?",
  chapterSlug: "how-do-organisms-reproduce",
  source: "NCERT Science (CBSE Class 10), Chapter 7",
  keyPoints: [
    {
      term: "DNA copying and variation",
      text: "Reproduction copies the DNA, but the copying is not absolutely accurate, so small variations arise. Consistent copying keeps the body design that suits the organism to its niche. This inbuilt tendency for variation is the basis for evolution.",
    },
    {
      term: "Importance of variation",
      text: "If the niche changes (temperature of the water rises), a population whose members are all alike may be wiped out. If a few individuals carry a variation that suits the new conditions, they survive. Variation is thus useful for the survival of species over time.",
    },
    {
      term: "Fission",
      text: "**Binary fission:** one cell splits into two (Amoeba, bacteria; Leishmania splits in a definite orientation because of its whip-like structure). **Multiple fission:** one cell divides into many daughter cells at once (Plasmodium, the malarial parasite).",
    },
    {
      term: "Fragmentation and regeneration",
      text: "**Fragmentation:** a mature organism breaks into pieces that each grow into a new individual (Spirogyra). **Regeneration:** a cut body part grows into a complete organism, by specialised cells (Planaria, Hydra). Regeneration is not the same as reproduction, since organisms do not normally depend on being cut up.",
    },
    {
      term: "Budding",
      text: "Hydra uses regenerative cells: a bud grows out at one spot, develops into a tiny individual and detaches when mature. Yeast also buds. Hydra can reproduce by both budding and regeneration.",
    },
    {
      term: "Vegetative propagation",
      text: "New plants from roots, stems or leaves (Bryophyllum buds on leaf notches; sugarcane, roses, grapes by layering or grafting; banana, orange, rose, jasmine which have lost the capacity to produce seeds). Advantages: flowers and fruits come earlier than from seeds, and all plants are genetically similar to the parent.",
    },
    {
      term: "Spore formation",
      text: "In bread mould (Rhizopus), thread-like hyphae carry blob-like **sporangia** on stalks. Sporangia contain spores, covered by thick walls that protect them until they reach a moist surface, where they grow into new Rhizopus.",
    },
    {
      term: "Germ-cells and chromosome number",
      text: "Germ-cells (gametes) have **half** the number of chromosomes and half the DNA of body cells, made by a special division. When two gametes fuse, the zygote gets the full number again, so the DNA content stays stable from one generation to the next. Sexual reproduction mixes DNA from two parents, giving more variation.",
    },
    {
      term: "Parts of a flower",
      text: "Sepals, petals, stamens and pistil. Stamens (male: anther with pollen, filament) and pistil (female: stigma, style, ovary with ovules) are the reproductive parts. **Unisexual** flowers have either stamens or pistil (papaya, watermelon); **bisexual** flowers have both (Hibiscus, mustard). Petals attract insects.",
    },
    {
      term: "Pollination",
      text: "Transfer of pollen from the stamen to the stigma. Within the same flower: **self-pollination**; from one flower to another: **cross-pollination**, by wind, water or animals. Then a pollen tube grows out of the pollen grain, through the style, to the ovule in the ovary.",
    },
    {
      term: "Fertilisation and after",
      text: "The male germ-cell from the pollen fuses with the egg cell in the ovule: fertilisation gives the zygote. The zygote divides to form an embryo; the ovule becomes a seed; the ovary becomes a fruit; petals, sepals, stamens, style and stigma shrivel and fall off. A seed has the embryo (plumule: future shoot, radicle: future root) and cotyledons (food store).",
    },
    {
      term: "Male reproductive system and puberty",
      text: "Testes make sperms and testosterone; they lie outside the abdomen in the scrotum because sperm formation needs a lower temperature. Vas deferens carries sperms; the prostate and seminal vesicles add fluid for transport and nutrition. Puberty: the period of sexual maturation in adolescence (new hair growth, voice changes in boys).",
    },
    {
      term: "Female reproductive system",
      text: "Ovaries make eggs and hormones; an egg goes through the oviduct (fallopian tube), where fertilisation occurs, to the uterus. The embryo is implanted in the thick, spongy uterine lining, and gets nutrition from the mother's blood through the **placenta**. If the egg is not fertilised, the lining breaks down and comes out as blood and mucus: **menstruation**, about every month.",
    },
    {
      term: "Reproductive health",
      text: "Sexually transmitted diseases: bacterial (gonorrhoea, syphilis) and viral (warts, HIV-AIDS); a condom prevents many. Contraception: barriers (condom), hormonal pills, a loop or copper-T in the uterus, and surgery (vas deferens or fallopian tube blocked). Prenatal sex determination is banned by law, as female foeticide is reducing the number of girls.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Longitudinal section of flower (Figure 7.7)",
      labels: ["sepal, petal", "stamen: anther, filament", "pistil: stigma, style, ovary", "ovule"],
    },
    {
      title: "Germination of pollen on stigma (Figure 7.8)",
      labels: ["pollen grain on stigma", "pollen tube through the style", "ovary", "ovule with female germ-cell (egg)"],
    },
    {
      title: "Budding in Hydra (Figure 7.4)",
      labels: ["parent Hydra", "bud growing out", "tentacles on the bud", "bud detaching as a new Hydra"],
    },
    {
      title: "Spore formation in Rhizopus (Figure 7.6)",
      labels: ["hyphae (non-reproductive)", "sporangium (reproductive)", "spores", "bread surface"],
    },
    {
      title: "Human male reproductive system (Figure 7.10)",
      labels: ["testis in scrotum", "vas deferens", "seminal vesicle, prostate gland", "urethra, penis", "urinary bladder, ureter"],
    },
    {
      title: "Human female reproductive system (Figure 7.11)",
      labels: ["ovary", "oviduct (fallopian tube)", "funnel of oviduct", "uterus", "cervix, vagina"],
    },
  ],
  mostAsked: [
    {
      topic: "Asexual reproduction: fission (Amoeba, Leishmania, Plasmodium), fragmentation, regeneration (Planaria), budding (Hydra, yeast), spores (Rhizopus)",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Flower, pollination and fertilisation: parts and functions, unisexual and bisexual, self and cross pollination, pollen tube, changes after fertilisation, seed",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Human reproductive systems: parts and functions, testes in the scrotum, puberty, fertilisation in the oviduct, placenta, if the egg is not fertilised",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Variation and DNA: why variation helps a species survive, stability of DNA and chromosome number in sexual reproduction, gamete and zygote",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Vegetative propagation: Bryophyllum, sugarcane, rose, banana; its advantages",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Reproductive health: contraceptive methods, sexually transmitted diseases, why prenatal sex determination is banned",
      marks: 5,
      years: [2026, 2024, 2023, 2022],
    },
  ],
  mistakes: [
    {
      title: "Regeneration and fragmentation mixed up",
      body: "Fragmentation: the organism breaks up on its own on maturing (Spirogyra). Regeneration: a cut piece grows into a whole organism using specialised cells (Planaria). Planaria and Hydra regenerate; Spirogyra fragments.",
    },
    {
      title: "Pollination and fertilisation used as one",
      body: "Pollination is the **transfer** of pollen to the stigma. Fertilisation is the **fusion** of the male germ-cell with the egg inside the ovule. Pollination comes first; without it fertilisation cannot happen.",
    },
    {
      title: "Where fertilisation and implantation happen",
      body: "Human fertilisation takes place in the **oviduct** (fallopian tube); the embryo is implanted in the **uterus** wall. Eggs are made in the ovary.",
    },
    {
      title: "Chromosome number of gametes",
      body: "A gamete has half the chromosomes of a body cell (23 in humans, against 46); the zygote has the full 46. Offspring of sexual reproduction have the same number as the parents.",
    },
    {
      title: "Fate of each part after fertilisation",
      body: "Zygote to embryo, ovule to seed, ovary to fruit. Petals, sepals, stamens, style and stigma shrivel and fall off.",
    },
  ],
};

export default sheet;
