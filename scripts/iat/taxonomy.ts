/**
 * IAT chapter + subtopic catalog.
 *
 * The IAT syllabus (2026 Information Brochure, Part 4) is the NCERT Class XI
 * and XII books, chapter for chapter. So the chapters are the bank's existing
 * `cbse-11` + `cbse-12` chapters with their names copied VERBATIM (pulled from
 * the live taxonomy on 2026-11-08, book order, Class XI first), which keeps a
 * later cross-exam link a name match rather than a mapping table.
 *
 * Changes from that copy, each deliberate:
 *   - Maths "Relations and Functions" and "Probability" exist in BOTH books;
 *     here each is one chapter carrying both books' subtopics.
 *   - Chapters CBSE marks "[Outdated]" are left out (their subtopics moved:
 *     "Responses to Abiotic Factors and Adaptations" sits in Organisms and
 *     Populations; Adsorption and Colloids sit in the legacy Surface Chemistry).
 *   - A few subtopics the IAT syllabus or the older books name and the CBSE
 *     list lacks (Trigonometric Equations, Quadratic Equations, Arithmetic
 *     Progression, Sums of Special Series, transistors and logic gates, Animal
 *     Tissues, Doppler Effect, heat engines).
 *   - `legacy: true` chapters: NCERT chapters cut in the 2023 rationalisation.
 *     The 2017-2022 papers were set on the older books and ask them. A chapter
 *     is seeded only once a question lands in it, so an unused one costs nothing.
 */
import type { IatSubject } from "./config";

export type IatChapter = { name: string; subtopics: readonly string[]; legacy?: true };

export const IAT_TAXONOMY: Readonly<Record<IatSubject, readonly IatChapter[]>> = {
  Biology: [
    { name: "The Living World", subtopics: ["Diversity in the Living World", "Taxonomic Categories"] },
    { name: "Biological Classification", subtopics: ["Five Kingdom Classification", "Kingdom Monera", "Kingdom Protista", "Kingdom Fungi", "Kingdom Plantae and Animalia", "Viruses, Viroids and Lichens"] },
    { name: "Plant Kingdom", subtopics: ["Algae", "Bryophytes", "Pteridophytes", "Gymnosperms"] },
    { name: "Animal Kingdom", subtopics: ["Basis of Classification", "Porifera, Coelenterata and Ctenophora", "Platyhelminthes, Aschelminthes and Annelida", "Arthropoda, Mollusca and Echinodermata", "Hemichordata and Chordata"] },
    { name: "Morphology of Flowering Plants", subtopics: ["The Leaf", "The Inflorescence", "The Flower", "The Fruit and Seed", "Description of a Flowering Plant and Its Families"] },
    { name: "Anatomy of Flowering Plants", subtopics: ["The Tissue Systems", "Anatomy of Roots", "Anatomy of Stems", "Anatomy of Leaves"] },
    { name: "Structural Organisation in Animals", subtopics: ["Animal Tissues", "Morphology and Anatomy of Frog"] },
    { name: "Cell: The Unit of Life", subtopics: ["Cell and Cell Theory", "An Overview of Cell", "Prokaryotic Cells", "Cell Membrane and Cell Wall", "Endomembrane System", "Mitochondria, Plastids and Ribosomes", "Cytoskeleton, Cilia, Flagella and Centrioles", "Nucleus and Microbodies"] },
    { name: "Biomolecules", subtopics: ["Chemical Composition of Living Tissue", "Proteins", "Polysaccharides", "Enzymes"] },
    { name: "Cell Cycle and Cell Division", subtopics: ["Cell Cycle", "M Phase (Mitosis)", "Meiosis", "Significance of Mitosis and Meiosis"] },
    { name: "Transport in Plants", legacy: true, subtopics: ["Means of Transport", "Plant-Water Relations", "Long Distance Transport of Water", "Transpiration", "Uptake and Transport of Mineral Nutrients", "Phloem Transport"] },
    { name: "Mineral Nutrition", legacy: true, subtopics: ["Essential Mineral Elements", "Mechanism of Absorption of Elements", "Nitrogen Metabolism"] },
    { name: "Photosynthesis in Higher Plants", subtopics: ["Site of Photosynthesis and Pigments", "Light Reaction and Electron Transport", "The C4 Pathway", "Photorespiration", "Factors Affecting Photosynthesis"] },
    { name: "Respiration in Plants", subtopics: ["Do Plants Breathe?", "Glycolysis", "Fermentation", "Aerobic Respiration", "Respiratory Balance Sheet", "Amphibolic Pathway and Respiratory Quotient"] },
    { name: "Plant Growth and Development", subtopics: ["Growth", "Differentiation, Dedifferentiation and Redifferentiation", "Development", "Plant Growth Regulators"] },
    { name: "Digestion and Absorption", legacy: true, subtopics: ["Digestive System", "Digestion of Food", "Absorption of Digested Products", "Disorders of Digestive System"] },
    { name: "Breathing and Exchange of Gases", subtopics: ["Respiratory Organs", "Mechanism of Breathing", "Exchange of Gases", "Transport of Gases", "Regulation of Respiration"] },
    { name: "Body Fluids and Circulation", subtopics: ["Blood", "Lymph (Tissue Fluid)", "Circulatory Pathways", "Double Circulation", "Regulation of Cardiac Activity"] },
    { name: "Excretory Products and their Elimination", subtopics: ["Modes of Excretion", "Human Excretory System", "Urine Formation", "Function of the Tubules", "Mechanism of Concentration of the Filtrate", "Regulation of Kidney Function", "Micturition", "Role of Other Organs in Excretion", "Disorders of the Excretory System"] },
    { name: "Locomotion and Movement", subtopics: ["Types of Movement", "Muscle", "Skeletal System", "Joints"] },
    { name: "Neural Control and Coordination", subtopics: ["Neural System", "Human Neural System", "Neuron and Nerve Impulse", "Central Neural System"] },
    { name: "Chemical Coordination and Integration", subtopics: ["Endocrine Glands and Hormones", "Hypothalamus and Pituitary", "Pineal, Thyroid and Parathyroid", "Thymus, Adrenal, Pancreas and Gonads", "Hormones of Heart, Kidney and Gastrointestinal Tract", "Mechanism of Hormone Action"] },
    { name: "Reproduction in Organisms", legacy: true, subtopics: ["Asexual Reproduction", "Sexual Reproduction"] },
    { name: "Sexual Reproduction in Flowering Plants", subtopics: ["The Flower", "Stamen, Microsporangium and Pollen Grain", "Pistil, Megasporangium and Embryo Sac", "Pollination", "Double Fertilisation", "Post-fertilisation: Structures and Events", "Apomixis and Polyembryony"] },
    { name: "Human Reproduction", subtopics: ["The Male Reproductive System", "The Female Reproductive System", "Gametogenesis", "Menstrual Cycle", "Fertilisation and Implantation", "Pregnancy and Embryonic Development", "Parturition and Lactation"] },
    { name: "Reproductive Health", subtopics: ["Reproductive Health: Problems and Strategies", "Population Explosion and Birth Control", "Medical Termination of Pregnancy", "Sexually Transmitted Infections", "Infertility"] },
    { name: "Principles of Inheritance and Variation", subtopics: ["Mendel's Laws of Inheritance", "Inheritance of One Gene", "Inheritance of Two Genes", "Chromosomal Theory, Linkage and Recombination", "Sex Determination", "Mutation", "Genetic Disorders", "Polygenic Inheritance and Pleiotropy"] },
    { name: "Molecular Basis of Inheritance", subtopics: ["The DNA", "The Search for Genetic Material", "Replication", "Transcription", "Genetic Code", "Translation", "Regulation of Gene Expression", "Human Genome Project", "DNA Fingerprinting"] },
    { name: "Evolution", subtopics: ["Origin of Life", "Evidences for Evolution", "A Brief Account of Evolution", "Adaptive Radiation", "Biological Evolution", "Mechanism of Evolution", "Hardy-Weinberg Principle", "Origin and Evolution of Man"] },
    { name: "Human Health and Disease", subtopics: ["Common Diseases in Humans", "Immunity", "AIDS", "Cancer", "Drugs and Alcohol Abuse"] },
    { name: "Strategies for Enhancement in Food Production", legacy: true, subtopics: ["Animal Husbandry", "Plant Breeding", "Single Cell Proteins", "Tissue Culture"] },
    { name: "Microbes in Human Welfare", subtopics: ["Microbes in Household Products", "Microbes in Industrial Products", "Microbes in Sewage Treatment", "Microbes in Production of Biogas", "Microbes as Biofertilisers", "Microbes as Biocontrol Agents"] },
    { name: "Biotechnology: Principles and Processes", subtopics: ["Principles of Biotechnology", "Restriction Enzymes", "Cloning Vectors and Competent Host", "Isolation, Cutting and Amplification of DNA", "Insertion, Expression and Downstream Processing"] },
    { name: "Biotechnology and its Applications", subtopics: ["Biotechnological Applications in Agriculture", "Biotechnological Applications in Medicine", "Transgenic Animals", "Ethical Issues"] },
    { name: "Organisms and Populations", subtopics: ["Responses to Abiotic Factors and Adaptations", "Population Attributes", "Population Growth", "Life History Variation", "Population Interactions"] },
    { name: "Ecosystem", subtopics: ["Ecosystem: Structure and Function", "Productivity", "Decomposition", "Energy Flow", "Ecological Pyramids"] },
    { name: "Biodiversity and Conservation", subtopics: ["Species Numbers and Patterns of Biodiversity", "Importance of Species Diversity", "Loss of Biodiversity", "Biodiversity Conservation"] },
    { name: "Environmental Issues", legacy: true, subtopics: ["Air Pollution", "Water Pollution", "Solid Wastes", "Ozone Depletion", "Greenhouse Effect and Global Warming", "Deforestation"] },
  ],
  Chemistry: [
    { name: "Some Basic Concepts of Chemistry", subtopics: ["Properties of Matter and Their Measurement", "Uncertainty in Measurement", "Laws of Chemical Combinations", "Atomic and Molecular Masses", "Mole Concept and Molar Masses", "Percentage Composition", "Stoichiometry and Stoichiometric Calculations"] },
    { name: "Structure of Atom", subtopics: ["Discovery of Sub-atomic Particles", "Atomic Models", "Developments Leading to the Bohr’s Model of Atom", "Bohr’s Model for Hydrogen Atom", "Towards Quantum Mechanical Model of the Atom", "Quantum Mechanical Model of Atom"] },
    { name: "Classification of Elements and Periodicity in Properties", subtopics: ["Why Do We Need to Classify Elements ?", "Genesis of Periodic Classification", "Modern Periodic Law and the Present Form of the Periodic Table", "Nomenclature of Elements with Atomic Numbers > 100", "Electronic Configurations of Elements and the Periodic Table", "Electronic Configurations and Types of Elements: s-, p-, d-, f- Blocks", "Periodic Trends in Properties of Elements"] },
    { name: "Chemical Bonding and Molecular Structure", subtopics: ["Kössel-Lewis Approach to Chemical Bonding", "Ionic or Electrovalent Bond", "Bond Parameters", "The Valence Shell Electron Pair Repulsion (VSEPR) Theory", "Valence Bond Theory", "Hybridisation", "Molecular Orbital Theory", "Bonding in Some Homonuclear Diatomic Molecules", "Hydrogen Bonding"] },
    { name: "States of Matter", legacy: true, subtopics: ["Intermolecular Forces", "The Gas Laws", "Ideal Gas Equation", "Kinetic Molecular Theory and Real Gases", "Liquid State"] },
    { name: "Thermodynamics", subtopics: ["Thermodynamic Terms", "Applications", "Measurement of ΔU and ΔH: Calorimetry", "Enthalpy Change, ΔrH of a Reaction – Reaction Enthalpy", "Enthalpies for Different Types of Reactions", "Spontaneity", "Gibbs Energy Change and Equilibrium"] },
    { name: "Equilibrium", subtopics: ["Equilibrium in Physical Processes", "Law of Chemical Equilibrium and Equilibrium Constant", "Homogeneous Equilibria", "Heterogeneous Equilibria", "Applications of Equilibrium Constants", "Relationship Between Equilibrium Constant K, Reaction Quotient Q and Gibbs Energy G", "Factors Affecting Equilibria", "Acids, Bases and Salts", "Ionization of Acids and Bases", "Solubility Equilibria of Sparingly Soluble Salts"] },
    { name: "Redox Reactions", subtopics: ["Classical Idea of Redox Reactions – Oxidation and Reduction Reactions", "Redox Reactions in Terms of Electron Transfer Reactions", "Oxidation Number", "Redox Reactions and Electrode Processes"] },
    { name: "Hydrogen", legacy: true, subtopics: ["Position and Isotopes of Hydrogen", "Preparation and Properties of Dihydrogen", "Hydrides", "Water and Hydrogen Peroxide"] },
    { name: "The s-Block Elements", legacy: true, subtopics: ["Group 1 Elements: Alkali Metals", "Group 2 Elements: Alkaline Earth Metals", "Important Compounds of Sodium and Calcium", "Anomalous Properties of Lithium and Beryllium"] },
    { name: "Organic Chemistry – Some Basic Principles and Techniques", subtopics: ["Tetravalence of Carbon: Shapes of Organic Compounds", "Structural Representations of Organic Compounds", "Classification of Organic Compounds", "Nomenclature of Organic Compounds", "Isomerism", "Fundamental Concepts in Organic Reaction Mechanism", "Methods of Purification of Organic Compounds", "Qualitative Analysis of Organic Compounds", "Quantitative Analysis"] },
    { name: "Hydrocarbons", subtopics: ["Alkanes", "Alkenes", "Alkynes", "Aromatic Hydrocarbon"] },
    { name: "Environmental Chemistry", legacy: true, subtopics: ["Atmospheric Pollution", "Water and Soil Pollution", "Green Chemistry"] },
    { name: "The Solid State", legacy: true, subtopics: ["Classification of Solids", "Crystal Lattices and Unit Cells", "Packing Efficiency and Density", "Imperfections in Solids", "Electrical and Magnetic Properties"] },
    { name: "Solutions", subtopics: ["Types of Solutions", "Expressing Concentration of Solutions", "Solubility", "Vapour Pressure of Liquid Solutions", "Ideal and Non-ideal Solutions", "Colligative Properties and Determination of Molar Mass", "Abnormal Molar Masses"] },
    { name: "Electrochemistry", subtopics: ["Electrochemical Cells", "Galvanic Cells", "Nernst Equation", "Conductance of Electrolytic Solutions", "Electrolytic Cells and Electrolysis", "Batteries", "Fuel Cells", "Corrosion"] },
    { name: "Chemical Kinetics", subtopics: ["Rate of a Chemical Reaction", "Factors Influencing Rate of a Reaction", "Integrated Rate Equations", "Temperature Dependence of the Rate of a Reaction", "Collision Theory of Chemical Reactions"] },
    { name: "Surface Chemistry", legacy: true, subtopics: ["Adsorption", "Catalysis", "Colloids"] },
    { name: "General Principles and Processes of Isolation of Elements", legacy: true, subtopics: ["Concentration of Ores", "Extraction and Thermodynamic Principles", "Refining"] },
    { name: "The p-Block Elements", legacy: true, subtopics: ["Group 13 Elements", "Group 14 Elements", "Group 15 Elements", "Group 16 Elements", "Group 17 Elements", "Group 18 Elements"] },
    { name: "The d-and f-Block Elements", subtopics: ["Position in the Periodic Table", "Electronic Configurations of the d-Block Elements", "General Properties of the Transition Elements (d-Block)", "Some Important Compounds of Transition Elements", "The Lanthanoids", "The Actinoids"] },
    { name: "Coordination Compounds", subtopics: ["Werner’s Theory of Coordination Compounds", "Definitions of Some Important Terms Pertaining to Coordination Compounds", "Nomenclature of Coordination Compounds", "Isomerism in Coordination Compounds", "Bonding in Coordination Compounds", "Bonding in Metal Carbonyls", "Importance and Applications of Coordination Compounds"] },
    { name: "Haloalkanes and Haloarenes", subtopics: ["Classification", "Nomenclature", "Nature of C-X Bond", "Methods of Preparation of Haloalkanes", "Preparation of Haloarenes", "Physical Properties", "Chemical Reactions", "Polyhalogen Compounds"] },
    { name: "Alcohols, Phenols and Ethers", subtopics: ["Classification", "Nomenclature", "Alcohols and Phenols", "Ethers"] },
    { name: "Aldehydes, Ketones and Carboxylic Acids", subtopics: ["Nomenclature and Structure of Carbonyl Group", "Preparation of Aldehydes and Ketones", "Physical Properties of Aldehydes and Ketones", "Chemical Reactions of Aldehydes and Ketones", "Nomenclature and Structure of Carboxyl Group", "Methods of Preparation of Carboxylic Acids", "Physical Properties of Carboxylic Acids", "Chemical Reactions of Carboxylic Acids"] },
    { name: "Amines", subtopics: ["Classification", "Nomenclature", "Preparation of Amines", "Physical Properties of Amines", "Chemical Reactions of Amines", "Chemical Reactions of Diazonium Salts", "Importance of Diazonium Salts in Synthesis of Aromatic Compounds"] },
    { name: "Biomolecules", subtopics: ["Carbohydrates", "Proteins", "Enzymes", "Vitamins", "Nucleic Acids"] },
    { name: "Polymers", legacy: true, subtopics: ["Classification of Polymers", "Polymerisation Reactions", "Commercially Important Polymers"] },
    { name: "Chemistry in Everyday Life", legacy: true, subtopics: ["Drugs and their Classification", "Chemicals in Food", "Cleansing Agents"] },
  ],
  Mathematics: [
    { name: "Sets", subtopics: ["Sets and their Representations", "Types of Sets and Subsets", "Venn Diagrams and Operations on Sets", "Complement of a Set"] },
    { name: "Relations and Functions", subtopics: ["Cartesian Products of Sets", "Relations", "Functions and their Graphs", "Algebra of Real Functions", "Types of Relations", "Equivalence Relations and Classes", "One-One and Onto Functions", "Composition and Invertible Functions"] },
    { name: "Trigonometric Functions", subtopics: ["Angles and their Measurement", "Trigonometric Functions and their Signs", "Domain and Range of Trigonometric Functions", "Trigonometric Functions of Sum and Difference of Two Angles", "Trigonometric Equations"] },
    { name: "Principle of Mathematical Induction", legacy: true, subtopics: ["Principle of Mathematical Induction"] },
    { name: "Complex Numbers and Quadratic Equations", subtopics: ["Complex Numbers and the Imaginary Unit", "Algebra of Complex Numbers", "Modulus and Conjugate", "Argand Plane and Polar Representation", "Quadratic Equations"] },
    { name: "Linear Inequalities", subtopics: ["Inequalities", "Algebraic Solutions of Linear Inequalities in One Variable"] },
    { name: "Permutations and Combinations", subtopics: ["Fundamental Principle of Counting", "Permutations", "Permutations when Objects are Not Distinct", "Combinations"] },
    { name: "Binomial Theorem", subtopics: ["Binomial Theorem for Positive Integral Indices", "Special Cases and Applications"] },
    { name: "Sequences and Series", subtopics: ["Sequences and Series", "Arithmetic Progression", "Geometric Progression", "Geometric Mean and the A.M.–G.M. Relationship", "Sums of Special Series"] },
    { name: "Straight Lines", subtopics: ["Slope of a Line", "Various Forms of the Equation of a Line", "Angle Between Lines, Parallelism and Perpendicularity", "Distance of a Point From a Line"] },
    { name: "Conic Sections", subtopics: ["Circle", "Parabola", "Ellipse", "Hyperbola"] },
    { name: "Introduction to Three Dimensional Geometry", subtopics: ["Coordinate Axes and Planes in Space", "Coordinates of a Point in Space", "Distance Between Two Points"] },
    { name: "Limits and Derivatives", subtopics: ["Limits and the Algebra of Limits", "Limits of Polynomials and Rational Functions", "Limits of Trigonometric Functions", "Derivatives from First Principles", "Algebra of Derivatives and Standard Formulas"] },
    { name: "Mathematical Reasoning", legacy: true, subtopics: ["Statements and Logical Connectives", "Implications and Validating Statements"] },
    { name: "Statistics", subtopics: ["Mean Deviation for Ungrouped Data", "Mean Deviation for Grouped Data", "Variance and Standard Deviation", "Shortcut Method for Variance and Standard Deviation"] },
    { name: "Probability", subtopics: ["Random Experiments, Sample Space and Events", "Types of Events and the Algebra of Events", "Axiomatic Approach to Probability", "Probability of 'A or B' and 'not A'", "Conditional Probability", "Multiplication Theorem on Probability", "Independent Events", "Theorem of Total Probability", "Bayes' Theorem", "Random Variables and Probability Distributions"] },
    { name: "Inverse Trigonometric Functions", subtopics: ["Domains, Ranges and Principal Value Branches", "Evaluating Inverse Trigonometric Expressions", "Properties of Inverse Trigonometric Functions"] },
    { name: "Matrices", subtopics: ["Order and Types of Matrices", "Equality of Matrices", "Addition and Scalar Multiplication", "Multiplication of Matrices", "Transpose of a Matrix", "Symmetric and Skew-Symmetric Matrices", "Elementary Operations and Inverse of a Matrix"] },
    { name: "Determinants", subtopics: ["Determinant and its Properties", "Area of a Triangle", "Minors and Cofactors", "Adjoint and Inverse of a Matrix", "Solving System of Linear Equations"] },
    { name: "Continuity and Differentiability", subtopics: ["Continuity", "Differentiability and the Chain Rule", "Derivatives of Implicit and Inverse Trigonometric Functions", "Derivatives of Exponential and Logarithmic Functions", "Logarithmic Differentiation", "Derivatives of Functions in Parametric Form", "Second Order Derivatives"] },
    { name: "Application of Derivatives", subtopics: ["Rate of Change of Quantities", "Increasing and Decreasing Functions", "Maxima and Minima", "Absolute Maximum and Minimum on a Closed Interval"] },
    { name: "Integrals", subtopics: ["Integration as the Inverse of Differentiation", "Integration by Substitution", "Integration using Trigonometric Identities", "Integrals of Some Particular Functions", "Integration by Partial Fractions", "Integration by Parts", "Integrals of Special Forms", "Definite Integrals and the Fundamental Theorem", "Definite Integrals by Substitution", "Properties of Definite Integrals"] },
    { name: "Application of Integrals", subtopics: ["Area Under Simple Curves", "Area Bounded by a Curve and a Line"] },
    { name: "Differential Equations", subtopics: ["Order and Degree of a Differential Equation", "General and Particular Solutions", "Variables Separable", "Homogeneous Differential Equations", "Linear Differential Equations"] },
    { name: "Vector Algebra", subtopics: ["Types of Vectors", "Addition of Vectors", "Components and Direction Cosines", "Section Formula", "Scalar (Dot) Product and Projection", "Vector (Cross) Product"] },
    { name: "Three Dimensional Geometry", subtopics: ["Direction Cosines and Direction Ratios", "Equation of a Line in Space", "Angle Between Two Lines", "Shortest Distance Between Two Lines", "The Plane"] },
    { name: "Linear Programming", subtopics: ["Graphical Solution and the Feasible Region"] },
  ],
  Physics: [
    { name: "Units and Measurement", subtopics: ["Units and the SI System", "Significant Figures and Errors in Measurement", "Dimensions and Dimensional Analysis"] },
    { name: "Motion in a Straight Line", subtopics: ["Position, Path Length and Displacement", "Instantaneous Velocity and Speed", "Acceleration", "Kinematic Equations for Uniformly Accelerated Motion"] },
    { name: "Motion in a Plane", subtopics: ["Scalars and Vectors", "Addition, Subtraction and Resolution of Vectors", "Motion in a Plane with Constant Acceleration", "Projectile Motion", "Uniform Circular Motion"] },
    { name: "Laws of Motion", subtopics: ["The Law of Inertia and Newton's First Law", "Newton's Second Law of Motion", "Newton's Third Law and Conservation of Momentum", "Equilibrium of a Particle", "Common Forces in Mechanics and Friction", "Circular Motion"] },
    { name: "Work, Energy and Power", subtopics: ["Work and Kinetic Energy", "Work Done by a Variable Force", "Potential Energy and Conservation of Mechanical Energy", "Power", "Collisions"] },
    { name: "System of Particles and Rotational Motion", subtopics: ["Centre of Mass and its Motion", "Vector Product and Angular Velocity", "Torque and Angular Momentum", "Equilibrium of a Rigid Body", "Moment of Inertia", "Dynamics of Rotational Motion about a Fixed Axis"] },
    { name: "Gravitation", subtopics: ["Kepler's Laws", "Universal Law of Gravitation", "Acceleration due to Gravity", "Gravitational Potential Energy and Escape Speed", "Earth Satellites"] },
    { name: "Mechanical Properties of Solids", subtopics: ["Stress, Strain and Hooke's Law", "Young's Modulus", "Shear Modulus", "Bulk Modulus and Compressibility", "Applications of Elastic Behaviour"] },
    { name: "Mechanical Properties of Fluids", subtopics: ["Pressure in Fluids", "Streamline Flow", "Bernoulli's Principle", "Viscosity", "Surface Tension"] },
    { name: "Thermal Properties of Matter", subtopics: ["Temperature, Heat and Thermometry", "Thermal Expansion", "Specific Heat Capacity and Calorimetry", "Change of State and Latent Heat", "Heat Transfer", "Newton's Law of Cooling"] },
    { name: "Thermodynamics", subtopics: ["Thermal Equilibrium and the Zeroth Law", "Heat, Internal Energy and Work", "First Law of Thermodynamics", "Specific Heat Capacity", "Thermodynamic Processes", "Second Law, Heat Engines and Refrigerators"] },
    { name: "Kinetic Theory", subtopics: ["Behaviour of Gases", "Kinetic Theory of an Ideal Gas", "Specific Heat Capacity", "Mean Free Path"] },
    { name: "Oscillations", subtopics: ["Periodic and Oscillatory Motion", "Simple Harmonic Motion", "SHM and Uniform Circular Motion", "Velocity, Acceleration and Force Law in SHM", "Energy in Simple Harmonic Motion", "The Simple Pendulum"] },
    { name: "Waves", subtopics: ["Transverse and Longitudinal Waves", "Displacement Relation in a Progressive Wave", "The Speed of a Travelling Wave", "Superposition of Waves and Standing Waves", "Beats", "Doppler Effect"] },
    { name: "Electric Charges and Fields", subtopics: ["Electric Charge and its Basic Properties", "Coulomb's Law and Forces Between Multiple Charges", "Electric Field and Field Lines", "Electric Flux and Gauss's Law", "Electric Dipole and Dipole in a Uniform Field", "Applications of Gauss's Law"] },
    { name: "Electrostatic Potential and Capacitance", subtopics: ["Electrostatic Potential due to Charges and Dipoles", "Equipotential Surfaces", "Potential Energy of a System of Charges", "Electrostatics of Conductors and Dielectrics", "Capacitors, Capacitance and their Combinations", "Energy Stored in a Capacitor"] },
    { name: "Current Electricity", subtopics: ["Electric Current and Ohm's Law", "Drift of Electrons and Resistivity", "Temperature Dependence of Resistivity", "Electrical Energy and Power", "Combination of Resistors", "Cells, EMF and Internal Resistance", "Kirchhoff's Rules and Wheatstone Bridge"] },
    { name: "Moving Charges and Magnetism", subtopics: ["Magnetic Force and Motion in a Magnetic Field", "Biot-Savart Law and Field of a Circular Loop", "Ampere's Circuital Law and the Solenoid", "Force Between Parallel Currents", "Torque on a Current Loop and Magnetic Dipole", "The Moving Coil Galvanometer"] },
    { name: "Magnetism and Matter", subtopics: ["The Bar Magnet", "Magnetism and Gauss's Law", "Magnetisation and Magnetic Intensity", "Magnetic Properties of Materials"] },
    { name: "Electromagnetic Induction", subtopics: ["Magnetic Flux and Faraday's Law", "Lenz's Law and Conservation of Energy", "Motional Electromotive Force", "Inductance", "AC Generator"] },
    { name: "Alternating Current", subtopics: ["AC Voltage Applied to a Resistor", "AC Voltage Applied to an Inductor and a Capacitor", "Series LCR Circuit and Resonance", "Power in AC Circuits and the Power Factor", "Transformers"] },
    { name: "Electromagnetic Waves", subtopics: ["Displacement Current", "Electromagnetic Waves and their Properties", "Electromagnetic Spectrum"] },
    { name: "Ray Optics and Optical Instruments", subtopics: ["Reflection by Spherical Mirrors", "Refraction and Total Internal Reflection", "Refraction at Spherical Surfaces and by Lenses", "Refraction Through a Prism", "Optical Instruments"] },
    { name: "Wave Optics", subtopics: ["Huygens Principle", "Refraction and Reflection of Plane Waves", "Interference and Young's Experiment", "Diffraction", "Polarisation"] },
    { name: "Dual Nature of Radiation and Matter", subtopics: ["Electron Emission", "Photoelectric Effect and its Experimental Study", "Einstein's Photoelectric Equation and the Photon", "Wave Nature of Matter"] },
    { name: "Atoms", subtopics: ["Alpha-Particle Scattering and Rutherford's Model", "Atomic Spectra", "Bohr Model of the Hydrogen Atom", "Line Spectra of the Hydrogen Atom", "de Broglie's Explanation of Bohr's Postulate"] },
    { name: "Nuclei", subtopics: ["Atomic Masses and Composition of the Nucleus", "Size of the Nucleus", "Mass-Energy and Nuclear Binding Energy", "Nuclear Force", "Radioactivity", "Nuclear Energy"] },
    { name: "Semiconductor Electronics: Materials, Devices and Simple Circuits", subtopics: ["Classification of Metals, Conductors and Semiconductors", "Intrinsic and Extrinsic Semiconductors", "p-n Junction and the Semiconductor Diode", "Application of Junction Diode as a Rectifier", "Special Purpose p-n Junction Diodes", "Junction Transistor", "Digital Electronics and Logic Gates"] },
    { name: "Communication Systems", legacy: true, subtopics: ["Elements of a Communication System", "Propagation of Electromagnetic Waves", "Modulation"] },
  ],
};

export function chapterOf(subject: IatSubject, name: string): IatChapter | undefined {
  return IAT_TAXONOMY[subject].find((c) => c.name === name);
}
