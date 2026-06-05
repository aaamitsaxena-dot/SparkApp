-- ============================================================
-- SEED: Fort Bend Grade 8 Science AAC 2024-2025
-- Run AFTER schema.sql in Supabase SQL Editor
-- Based on Fort Bend ISD AAC Public Overview 2024-2025
-- TEKS-aligned units: Matter & Energy, Force & Motion,
--                     Earth & Space, Organisms & Environments
-- ============================================================

DO $$
DECLARE
  prog_id uuid;
  day1 uuid; day2 uuid; day3 uuid; day4 uuid; day5 uuid; day6 uuid;
  day7 uuid; day8 uuid; day9 uuid; day10 uuid; day11 uuid; day12 uuid;
  day13 uuid; day14 uuid; day15 uuid; day16 uuid; day17 uuid; day18 uuid;
  day19 uuid; day20 uuid; day21 uuid; day22 uuid; day23 uuid; day24 uuid;
  day25 uuid; day26 uuid; day27 uuid; day28 uuid; day29 uuid; day30 uuid;
BEGIN

-- ============================================================
-- Program
-- ============================================================
INSERT INTO programs (name, subject, grade, state, county, district, description, source_url, is_published)
VALUES (
  'Grade 8 Science AAC',
  'Science',
  'Grade 8',
  'Texas',
  'Fort Bend County',
  'Fort Bend ISD',
  'Accelerated, fast-track 30-day program covering all four units of Fort Bend ISD Grade 8 Science AAC: Matter & Energy, Force & Motion, Earth & Space, and Organisms & Environments. TEKS-aligned with free resources, hands-on experiments, and quizzes.',
  'https://www.fortbendisd.com/cms/lib/TX01917858/Centricity/domain/74/1.%20teaching%20and%20learning/24-25%20public%20overviews/Grade%208%20Science%20AAC%20Public%20Overview%202024-2025.pdf',
  true
)
RETURNING id INTO prog_id;

-- ============================================================
-- Achievement Levels
-- ============================================================
INSERT INTO achievement_levels (program_id, name, min_points, badge_icon, description) VALUES
  (prog_id, 'Rookie',          0,   '🌱', 'Just getting started on your science journey!'),
  (prog_id, 'Explorer',        101, '🔭', 'Exploring the world of science'),
  (prog_id, 'Achiever',        301, '⚡', 'Building real scientific understanding'),
  (prog_id, 'Champion',        601, '🏅', 'Almost a science champion!'),
  (prog_id, 'Super-Achiever',  901, '🏆', 'Completed the full Grade 8 Science AAC program!');

-- ============================================================
-- WEEK 1 — Unit 1: Matter & Energy (Days 1-6)
-- ============================================================

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,1,1,'Introduction to Matter','Physical and Chemical Properties of Matter',
'Matter is everything around us that has mass and takes up space. In this lesson, you will explore the difference between physical properties (color, density, melting point) and chemical properties (reactivity, flammability). Understanding how matter behaves lays the foundation for all of chemistry and physics.',
'["Physical properties: observable without changing substance", "Chemical properties: describe ability to change into new substance", "Density = mass ÷ volume", "Melting point and boiling point are physical properties", "Flammability and reactivity are chemical properties"]',
'["Distinguish between physical and chemical properties", "Calculate density given mass and volume", "Give examples of each property type", "Explain why density is an intensive property"]')
RETURNING id INTO day1;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,2,1,'Physical and Chemical Changes','How Matter Changes',
'Matter can undergo physical changes (ice melting, paper tearing) where no new substance is formed, or chemical changes (burning, rusting) where new substances are produced. Learning to identify these changes is a key science skill.',
'["Physical change: same substance, different form", "Chemical change: new substances formed", "Signs of chemical change: gas, precipitate, color change, energy change", "Law of Conservation of Mass", "Examples: cooking, burning, dissolving"]',
'["Distinguish physical from chemical changes with evidence", "Apply the Law of Conservation of Mass", "Identify signs that a chemical change has occurred", "Explain why dissolving sugar is physical, not chemical"]')
RETURNING id INTO day2;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,3,1,'Atomic Structure','Atoms, Elements, and the Periodic Table',
'All matter is made of atoms. Atoms contain a nucleus (protons and neutrons) surrounded by electrons. The number of protons defines the element. The periodic table organizes elements by atomic number and groups elements with similar properties.',
'["Proton: positive charge, defines element", "Neutron: no charge, adds to mass", "Electron: negative charge, in energy levels", "Atomic number = number of protons", "Mass number = protons + neutrons", "Periodic table: periods (rows) and groups (columns)"]',
'["Describe the structure of an atom", "Identify atomic number and mass number from periodic table", "Explain how protons, neutrons, and electrons differ", "Locate metals, nonmetals, and metalloids on the periodic table"]')
RETURNING id INTO day3;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,4,1,'Elements, Compounds, and Mixtures','Classifying Matter',
'Pure substances are either elements (one type of atom) or compounds (two or more elements chemically combined). Mixtures can be homogeneous (uniform) or heterogeneous (non-uniform). This classification system is fundamental to chemistry.',
'["Element: one type of atom (e.g., gold, oxygen)", "Compound: two+ elements chemically bonded (e.g., H₂O, NaCl)", "Homogeneous mixture: uniform composition (e.g., saltwater)", "Heterogeneous mixture: non-uniform (e.g., trail mix)", "Separation methods: filtration, distillation, evaporation"]',
'["Classify matter as element, compound, or mixture", "Distinguish homogeneous from heterogeneous mixtures", "Explain why water is a compound, not a mixture", "Describe methods to separate mixtures"]')
RETURNING id INTO day4;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,5,1,'Energy Transformations','Types of Energy and Transformations',
'Energy exists in many forms — kinetic (motion), potential (stored), thermal, chemical, electrical, light, and sound. Energy can transform from one type to another but is never created or destroyed (Law of Conservation of Energy).',
'["Kinetic energy: energy of motion (KE = ½mv²)", "Potential energy: stored energy (gravitational PE = mgh)", "Thermal energy: total kinetic energy of particles", "Law of Conservation of Energy", "Energy transformation examples: roller coaster, photosynthesis"]',
'["Identify types of energy in everyday situations", "Describe energy transformations in a system", "Apply the Law of Conservation of Energy", "Distinguish between kinetic and potential energy"]')
RETURNING id INTO day5;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,6,1,'Heat Transfer','Conduction, Convection, and Radiation',
'Heat always moves from warmer to cooler objects. It can travel by conduction (direct contact), convection (fluid movement), or radiation (electromagnetic waves). Understanding heat transfer explains how we stay warm, how ovens work, and why the Earth receives energy from the Sun.',
'["Conduction: heat transfer through direct contact", "Convection: heat transfer through fluid movement", "Radiation: heat transfer through electromagnetic waves (no medium needed)", "Thermal equilibrium: no net heat flow", "Insulators vs conductors"]',
'["Distinguish among conduction, convection, and radiation", "Give real-world examples of each heat transfer method", "Explain why radiation can travel through a vacuum", "Describe how a thermos uses multiple heat transfer concepts"]')
RETURNING id INTO day6;

-- ============================================================
-- WEEK 2 — Unit 2: Force & Motion (Days 7-12)
-- ============================================================

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,7,2,'Speed, Velocity, and Acceleration','Describing Motion',
'Motion is a change in position over time. Speed is how fast an object moves. Velocity includes direction. Acceleration is the rate of change of velocity. Reading and interpreting distance-time and velocity-time graphs is a key skill.',
'["Speed = distance ÷ time", "Velocity = speed + direction (vector)", "Acceleration = change in velocity ÷ time", "Distance-time graph: slope = speed", "Velocity-time graph: slope = acceleration", "Average vs instantaneous speed"]',
'["Calculate speed, velocity, and acceleration", "Interpret distance-time and velocity-time graphs", "Explain the difference between speed and velocity", "Identify acceleration from a velocity-time graph slope"]')
RETURNING id INTO day7;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,8,2,'Newton''s First Law','Inertia and the Law of Inertia',
'Newton''s First Law states that an object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an unbalanced force. This property of matter is called inertia.',
'["Inertia: tendency to resist change in motion", "Balanced forces: no change in motion", "Unbalanced forces: change in motion", "Net force determines acceleration direction", "Mass and inertia are directly related"]',
'["State and apply Newton''s First Law", "Explain inertia using real-world examples", "Distinguish balanced from unbalanced forces", "Predict the motion of objects given force diagrams"]')
RETURNING id INTO day8;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,9,2,'Newton''s Second Law','Force, Mass, and Acceleration',
'Newton''s Second Law: Force = mass × acceleration (F = ma). A larger force produces greater acceleration; greater mass requires more force to achieve the same acceleration. This law is the mathematical heart of classical mechanics.',
'["F = ma (Force = mass × acceleration)", "Force measured in Newtons (N)", "Larger mass → less acceleration for same force", "Net force determines acceleration", "Free body diagrams show all forces on an object"]',
'["Use F = ma to solve problems", "Draw and interpret free body diagrams", "Explain how mass affects acceleration", "Calculate net force from multiple forces"]')
RETURNING id INTO day9;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,10,2,'Newton''s Third Law','Action and Reaction Forces',
'For every action force, there is an equal and opposite reaction force. These forces act on different objects, which is why they don''t cancel. Rockets, swimming, and walking all rely on Newton''s Third Law.',
'["Action-reaction force pairs", "Forces act on different objects", "Equal in magnitude, opposite in direction", "Momentum: p = mv", "Conservation of Momentum in collisions"]',
'["State and apply Newton''s Third Law", "Identify action-reaction pairs in situations", "Explain why a rocket moves forward when exhaust goes backward", "Calculate momentum and apply conservation of momentum"]')
RETURNING id INTO day10;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,11,2,'Gravity and Weight','Gravitational Force',
'Gravity is a force of attraction between masses. Weight is the gravitational force on an object (W = mg). Gravity varies by planet. Projectile motion combines horizontal (constant speed) and vertical (accelerating due to gravity) motion.',
'["Gravitational force: F = Gm₁m₂/d²", "Weight = mass × gravitational acceleration (W = mg)", "g = 9.8 m/s² on Earth surface", "Weight varies by location; mass does not", "Projectile motion: independent horizontal and vertical components"]',
'["Distinguish mass from weight", "Calculate weight using W = mg", "Explain how gravity changes with distance and mass", "Describe projectile motion in terms of two independent components"]')
RETURNING id INTO day11;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,12,2,'Friction and Simple Machines','Applied Forces and Work',
'Friction is a force that opposes motion. Simple machines (lever, pulley, inclined plane, wheel and axle, wedge, screw) change the magnitude or direction of a force. Work = force × distance. Machines make work easier but don''t reduce the amount of work.',
'["Friction: opposes relative motion between surfaces", "Static friction > kinetic friction", "Work = force × distance (W = Fd)", "Mechanical advantage: output force ÷ input force", "Six types of simple machines", "Efficiency = useful output ÷ total input"]',
'["Explain how friction affects motion", "Calculate work and mechanical advantage", "Identify and classify simple machines", "Explain why simple machines don''t reduce work but reduce force"]')
RETURNING id INTO day12;

-- ============================================================
-- WEEK 3 — Unit 3: Earth & Space (Days 13-18)
-- ============================================================

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,13,3,'Layers of the Earth','Earth''s Interior Structure',
'Earth has four main layers: inner core (solid iron-nickel), outer core (liquid iron-nickel), mantle (hot rock/magma), and crust (thin solid rock). Seismic waves give us evidence of Earth''s interior. The lithosphere (crust + upper mantle) is divided into tectonic plates.',
'["Crust: thin outer layer, 5-70 km", "Mantle: largest layer, solid but flows slowly", "Outer core: liquid iron-nickel, creates magnetic field", "Inner core: solid iron-nickel, hottest part", "Lithosphere: crust + rigid upper mantle", "Seismic waves: P-waves and S-waves as evidence"]',
'["Describe the layers of Earth and their properties", "Explain how scientists use seismic waves to study Earth''s interior", "Distinguish between the lithosphere, asthenosphere, and other layers", "Describe the source of Earth''s magnetic field"]')
RETURNING id INTO day13;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,14,3,'Plate Tectonics','Tectonic Plates and Plate Boundaries',
'Earth''s lithosphere is broken into tectonic plates that float on the asthenosphere. Plates move due to convection currents in the mantle. At boundaries, plates converge (collide), diverge (separate), or transform (slide past). These movements cause earthquakes, volcanoes, and mountain formation.',
'["Plate tectonic theory", "Convection currents drive plate movement", "Convergent boundary: plates collide (mountains, subduction)", "Divergent boundary: plates separate (mid-ocean ridges)", "Transform boundary: plates slide past (earthquakes)", "Continental drift: Wegener''s evidence"]',
'["Describe the three types of plate boundaries", "Explain what happens at each boundary type", "Apply convection currents to plate movement", "Evaluate Wegener''s evidence for continental drift"]')
RETURNING id INTO day14;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,15,3,'Earthquakes and Volcanoes','Geologic Hazards',
'Earthquakes occur when stress builds up along faults and is suddenly released as seismic energy. Volcanoes form at convergent boundaries (where oceanic plate subducts) and divergent boundaries (mid-ocean ridges) and at hot spots. The Richter scale and moment magnitude scale measure earthquake intensity.',
'["Fault: fracture in Earth''s crust where movement occurs", "Focus (hypocenter): where earthquake originates", "Epicenter: point on surface above focus", "Seismograph measures seismic waves", "Volcanic eruption types depend on magma viscosity", "Ring of Fire: Pacific Ocean boundary zone"]',
'["Explain how earthquakes and volcanic eruptions occur", "Describe the relationship between plate boundaries and geologic hazards", "Interpret seismograph data", "Explain why the Pacific Ring of Fire has high seismic activity"]')
RETURNING id INTO day15;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,16,3,'The Rock Cycle','Types of Rocks and Their Formation',
'Rocks are classified as igneous (formed from cooled magma), sedimentary (formed from compacted sediments), or metamorphic (changed by heat and pressure). The rock cycle describes how rocks transform from one type to another over millions of years.',
'["Igneous rocks: intrusive (slow cooling) vs extrusive (fast cooling)", "Sedimentary rocks: clastic, chemical, organic", "Metamorphic rocks: foliated vs non-foliated", "Rock cycle: continuous transformation process", "Weathering, erosion, deposition, compaction, cementation, melting, crystallization"]',
'["Classify rocks as igneous, sedimentary, or metamorphic", "Describe how each rock type forms", "Trace a rock through multiple pathways in the rock cycle", "Distinguish intrusive from extrusive igneous rocks"]')
RETURNING id INTO day16;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,17,3,'Earth''s Moon and Tides','The Moon''s Influence on Earth',
'The Moon orbits Earth and influences tides through gravitational pull. The Moon''s phases result from its position relative to Earth and the Sun. Solar and lunar eclipses occur when Earth, Moon, and Sun align. The Moon''s surface shows impact craters from meteorites.',
'["Moon phases: new, waxing crescent, first quarter, waxing gibbous, full, waning gibbous, third quarter, waning crescent", "Spring tides (stronger): new and full moon alignment", "Neap tides (weaker): quarter moon", "Solar eclipse: Moon blocks Sun (new moon)", "Lunar eclipse: Earth''s shadow on Moon (full moon)", "Tidal forces: gravitational differential"]',
'["Explain the cause of Moon phases", "Distinguish between spring and neap tides", "Describe the conditions for solar and lunar eclipses", "Explain how the Moon''s gravity causes tides"]')
RETURNING id INTO day17;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,18,3,'The Solar System and Universe','Sun, Planets, Stars, and Galaxies',
'Our solar system has 8 planets orbiting the Sun. Inner planets are rocky; outer planets are gas giants. The Sun is a medium-sized star. Stars have life cycles. Our galaxy, the Milky Way, contains billions of stars, and the observable universe contains billions of galaxies.',
'["Inner planets: Mercury, Venus, Earth, Mars (rocky, denser)", "Outer planets: Jupiter, Saturn, Uranus, Neptune (gas/ice giants)", "Astronomical unit (AU): distance from Earth to Sun", "Light year: distance light travels in one year", "Star life cycle: nebula → main sequence → red giant → white dwarf/supernova", "Big Bang Theory: origin of universe"]',
'["Describe characteristics of inner and outer planets", "Explain the life cycle of a star", "Use the H-R diagram to classify stars", "Explain the evidence for the Big Bang Theory"]')
RETURNING id INTO day18;

-- ============================================================
-- WEEK 4 — Unit 4: Organisms & Environments (Days 19-24)
-- ============================================================

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,19,4,'Cell Structure and Function','Cells: The Basic Unit of Life',
'All living things are made of cells. Prokaryotic cells (bacteria) have no nucleus; eukaryotic cells (plants, animals, fungi) have a nucleus. Cell organelles each have specific functions. Plant cells have cell walls and chloroplasts; animal cells do not.',
'["Cell theory: all organisms made of cells, cells from existing cells", "Prokaryote: no membrane-bound nucleus (bacteria)", "Eukaryote: has nucleus and organelles", "Organelles: nucleus (DNA), mitochondria (energy), ribosome (proteins), ER, Golgi apparatus, vacuole, lysosome", "Plant-specific: cell wall, chloroplast, large central vacuole", "Cell membrane: phospholipid bilayer"]',
'["Compare prokaryotic and eukaryotic cells", "Identify organelles and describe their functions", "Explain why plant and animal cells differ", "Describe the structure and function of the cell membrane"]')
RETURNING id INTO day19;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,20,4,'Photosynthesis and Cellular Respiration','Energy in Living Systems',
'Plants capture light energy and convert it to chemical energy (glucose) through photosynthesis. All cells release energy from glucose through cellular respiration. These two processes are complementary: photosynthesis stores energy, respiration releases it.',
'["Photosynthesis: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂", "Occurs in chloroplasts (thylakoids and stroma)", "Cellular respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP energy", "Aerobic respiration (with oxygen) vs anaerobic (without)", "ATP: energy currency of cells", "Photosynthesis and respiration are reverse reactions"]',
'["Write and balance the equations for photosynthesis and respiration", "Identify where each process occurs in the cell", "Explain how photosynthesis and respiration are complementary", "Distinguish aerobic from anaerobic respiration"]')
RETURNING id INTO day20;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,21,4,'DNA and Heredity','Genetics and Inheritance',
'DNA (deoxyribonucleic acid) contains the genetic information of living organisms. Genes are segments of DNA that code for proteins. Traits are inherited from parents through dominant and recessive alleles. Punnett squares predict the probability of trait inheritance.',
'["DNA structure: double helix, base pairs (A-T, G-C)", "Gene: segment of DNA coding for a protein", "Chromosome: packaged DNA", "Allele: version of a gene (dominant vs recessive)", "Genotype vs phenotype", "Punnett square: predicts trait probability", "Law of Segregation: alleles separate during gamete formation"]',
'["Describe the structure of DNA", "Use a Punnett square to predict offspring genotypes and phenotypes", "Distinguish dominant from recessive traits", "Explain the relationship between DNA, genes, chromosomes, and traits"]')
RETURNING id INTO day21;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,22,4,'Natural Selection and Evolution','How Species Change Over Time',
'Charles Darwin''s theory of natural selection explains how populations change over time. Individuals with favorable traits survive and reproduce more (survival of the fittest). Over generations, these traits become more common. Evidence includes fossils, homologous structures, and DNA comparisons.',
'["Natural selection: individuals with favorable traits survive and reproduce", "Variation: individuals differ within a population", "Adaptation: heritable trait that increases fitness", "Evolution: change in allele frequency over generations", "Evidence for evolution: fossil record, comparative anatomy, embryology, molecular biology", "Speciation: new species formation"]',
'["Explain Darwin''s mechanism of natural selection", "Identify the four requirements for natural selection", "Describe evidence supporting evolution", "Explain how adaptations arise through natural selection"]')
RETURNING id INTO day22;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,23,4,'Ecosystems and Energy Flow','Food Webs and Energy Pyramids',
'An ecosystem includes all living (biotic) and nonliving (abiotic) components of an environment. Energy flows from producers (plants) to consumers (animals) to decomposers. Only about 10% of energy transfers between trophic levels. Matter cycles through ecosystems (carbon, nitrogen, water cycles).',
'["Biotic factors: living components", "Abiotic factors: nonliving components (temperature, water, sunlight)", "Producer → primary consumer → secondary consumer → tertiary consumer", "Decomposers: break down dead matter", "Energy pyramid: 10% rule", "Food web: multiple interconnected food chains", "Carbon cycle, water cycle, nitrogen cycle"]',
'["Construct and interpret a food web", "Explain energy flow through trophic levels using the 10% rule", "Distinguish biotic from abiotic factors", "Trace carbon or nitrogen through a biogeochemical cycle"]')
RETURNING id INTO day23;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,24,4,'Population Dynamics','How Populations Change',
'A population''s size is affected by biotic and abiotic factors. Limiting factors prevent unlimited growth. Predator-prey relationships, disease, competition, and resource availability all regulate populations. Human activities are a major driver of population change.',
'["Biotic potential: maximum reproduction rate", "Carrying capacity (K): max population environment can support", "Limiting factors: food, water, space, predators, disease", "Exponential growth (J-curve) vs logistic growth (S-curve)", "Predator-prey cycles", "Invasive species: lack natural predators, disrupt ecosystems"]',
'["Distinguish exponential from logistic population growth", "Identify limiting factors for a population", "Interpret predator-prey population graphs", "Explain how invasive species affect native populations"]')
RETURNING id INTO day24;

-- ============================================================
-- WEEK 5 — Review, Connections & Application (Days 25-30)
-- ============================================================

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,25,5,'Climate and Weather','Atmosphere and Climate Systems',
'Weather is short-term atmospheric conditions; climate is long-term patterns. The atmosphere has layers (troposphere, stratosphere, mesosphere, thermosphere, exosphere). Greenhouse gases trap heat. Climate change is driven by human release of CO₂ and other greenhouse gases.',
'["Troposphere: weather occurs here", "Stratosphere: contains ozone layer", "Greenhouse effect: natural warming mechanism", "Enhanced greenhouse effect: human-caused warming", "Climate vs weather", "Ocean currents influence climate", "El Niño and La Niña: Pacific Ocean climate patterns"]',
'["Identify the layers of the atmosphere and their features", "Explain the natural greenhouse effect", "Distinguish climate from weather", "Describe how human activities are enhancing the greenhouse effect"]')
RETURNING id INTO day25;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,26,5,'Human Impact on Earth','Environmental Science',
'Human activities have significantly altered Earth''s systems. Deforestation, pollution, fossil fuel burning, and habitat destruction affect biodiversity and climate. Sustainable practices can reduce negative impacts. Conservation biology works to protect endangered species and ecosystems.',
'["Biodiversity: variety of species in an area", "Habitat destruction: largest cause of species extinction", "Pollution types: air, water, soil", "Greenhouse gas emissions from fossil fuels", "Sustainability: meeting needs without depleting resources", "Conservation strategies: protected areas, captive breeding, reforestation"]',
'["Describe human impacts on biodiversity and ecosystems", "Explain the causes and effects of habitat destruction", "Evaluate sustainable practices to reduce environmental impact", "Explain why biodiversity is important to ecosystem stability"]')
RETURNING id INTO day26;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,27,5,'Waves and Sound','Wave Properties and Sound',
'Waves transfer energy without transferring matter. Transverse waves (light) oscillate perpendicular to motion; longitudinal waves (sound) oscillate parallel to motion. Sound requires a medium. Wave properties include wavelength, frequency, amplitude, and wave speed.',
'["Transverse wave: oscillation perpendicular to propagation", "Longitudinal wave: oscillation parallel to propagation (compression/rarefaction)", "Wavelength (λ): distance between crests", "Frequency (f): waves per second (Hz)", "Amplitude: height of wave (determines energy)", "Wave speed = wavelength × frequency (v = λf)", "Sound: longitudinal wave needing medium"]',
'["Distinguish transverse from longitudinal waves", "Calculate wave speed using v = λf", "Describe how amplitude and frequency relate to loudness and pitch", "Explain why sound cannot travel through a vacuum"]')
RETURNING id INTO day27;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,28,5,'Light and Electromagnetic Spectrum','Electromagnetic Waves',
'Light is an electromagnetic wave that can travel through a vacuum. The electromagnetic spectrum ranges from radio waves (longest) to gamma rays (shortest). Visible light is a small portion. Light can be reflected, refracted, absorbed, or transmitted. Lenses and mirrors use these properties.',
'["Electromagnetic spectrum: radio, microwave, infrared, visible, UV, X-ray, gamma", "Higher frequency = higher energy = shorter wavelength", "Reflection: bouncing off surface (law: angle of incidence = angle of reflection)", "Refraction: bending at medium boundary", "Concave vs convex lenses and mirrors", "ROYGBIV: visible light spectrum"]',
'["Identify regions of the electromagnetic spectrum by wavelength/frequency", "Explain reflection and refraction", "Distinguish between concave and convex lenses/mirrors", "Apply the wave equation to electromagnetic waves"]')
RETURNING id INTO day28;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,29,5,'Science Connections and STAAR Review','Cross-Unit Concepts and Test Strategies',
'This review day connects key ideas across all four units and builds test-taking strategies for STAAR. Practice applying concepts from Matter & Energy, Force & Motion, Earth & Space, and Organisms & Environments in integrated scenarios.',
'["Energy connects all four units", "Scientific method: observation, hypothesis, experiment, analysis, conclusion", "Data analysis: mean, median, mode, range, graphing", "Experimental design: independent variable, dependent variable, control", "STAAR format: multiple choice and short answer", "Common misconceptions and how to avoid them"]',
'["Connect concepts across all four units", "Apply scientific method to novel scenarios", "Analyze graphs and data tables", "Identify and avoid common test-taking errors"]')
RETURNING id INTO day29;

INSERT INTO study_days (program_id,day_number,week_number,title,topic,overview,key_concepts,learning_objectives)
VALUES (prog_id,30,5,'Final Review and Celebration','Mastery Check — All Units',
'Congratulations on reaching Day 30! Today is your final review. You will revisit the most important concepts from all units, complete your mastery check quiz, and celebrate your achievement. Completing this program puts you well ahead of your peers!',
'["Unit 1: Matter & Energy — properties, changes, atomic structure, energy", "Unit 2: Force & Motion — Newton''s laws, velocity, acceleration", "Unit 3: Earth & Space — plate tectonics, rock cycle, solar system", "Unit 4: Organisms & Environments — cells, genetics, ecosystems, evolution", "Science practices: experimental design, data analysis, graphing"]',
'["Demonstrate mastery across all four units", "Solve multi-step problems requiring cross-unit thinking", "Reflect on your learning journey through the 30-day program", "Identify areas for continued growth"]')
RETURNING id INTO day30;

-- ============================================================
-- RESOURCES (3-5 per day)
-- ============================================================

-- Day 1 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day1,'Physical vs Chemical Properties','https://www.khanacademy.org/science/ms-chemistry-states-of-matter/x962c27e4/x962c27e4/v/physical-and-chemical-properties-of-matter','video','Khan Academy','Clear video explanation of physical and chemical properties with examples',0),
  (day1,'Physical and Chemical Properties','https://www.ck12.org/physical-science/physical-and-chemical-properties-of-matter/lesson/Physical-and-Chemical-Properties-of-Matter-MS-PS/','article','CK-12','Interactive lesson with practice problems and simulations',1),
  (day1,'Density Simulation','https://phet.colorado.edu/en/simulations/density','interactive','PhET Colorado','Simulate density experiments with different materials',2),
  (day1,'Properties of Matter — Crash Course','https://www.youtube.com/watch?v=IV7qPyFzOO8','video','Crash Course','Entertaining 10-minute overview of matter properties',3);

-- Day 2 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day2,'Physical vs Chemical Changes','https://www.khanacademy.org/science/ms-chemistry-states-of-matter/x962c27e4/x962c27e4/v/physical-and-chemical-changes','video','Khan Academy','Explains changes with many real-world examples',0),
  (day2,'Conservation of Mass','https://phet.colorado.edu/en/simulations/reactants-products-and-leftovers','interactive','PhET Colorado','Visualize conservation of mass in chemical reactions',1),
  (day2,'Chemical vs Physical Changes','https://www.ck12.org/physical-science/physical-and-chemical-changes/lesson/Physical-and-Chemical-Changes-MS-PS/','article','CK-12','Detailed reading with practice questions',2);

-- Day 3 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day3,'Atomic Structure','https://www.khanacademy.org/science/ap-chemistry-beta/x2eef969c74e0d802:atomic-structure-and-properties/x2eef969c74e0d802:the-atom/v/protons-neutrons-and-electrons','video','Khan Academy','Protons, neutrons, and electrons clearly explained',0),
  (day3,'Atom Simulator','https://phet.colorado.edu/en/simulations/build-an-atom','interactive','PhET Colorado','Build atoms and see how atomic number and mass number work',1),
  (day3,'Periodic Table of Elements','https://ptable.com/','interactive','Ptable.com','Interactive periodic table with all element properties',2),
  (day3,'Introduction to the Periodic Table','https://www.ck12.org/physical-science/periodic-table/lesson/The-Periodic-Table-MS-PS/','article','CK-12','Comprehensive lesson on periodic table organization',3);

-- Day 4 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day4,'Classifying Matter','https://www.khanacademy.org/science/ms-chemistry-states-of-matter/x962c27e4/x962c27e4/v/elements-and-atoms','video','Khan Academy','Elements, compounds, and mixtures explained',0),
  (day4,'Pure Substances vs Mixtures','https://www.ck12.org/physical-science/pure-substances-and-mixtures/lesson/Pure-Substances-vs-Mixtures-MS-PS/','article','CK-12','Clear classification of matter with diagrams',1),
  (day4,'Separating Mixtures','https://www.youtube.com/watch?v=eRikPfzNrgQ','video','Science with Hazel','Demonstrates filtration, evaporation, and distillation',2);

-- Day 5 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day5,'Introduction to Energy','https://www.khanacademy.org/science/physics/work-and-energy/work-and-energy-tutorial/v/introduction-to-work-and-energy','video','Khan Academy','Kinetic and potential energy clearly explained',0),
  (day5,'Energy Skate Park','https://phet.colorado.edu/en/simulations/energy-skate-park','interactive','PhET Colorado','Visualize energy transformations with a skateboarder',1),
  (day5,'Forms of Energy','https://www.ck12.org/physical-science/forms-of-energy/lesson/Forms-of-Energy-MS-PS/','article','CK-12','Overview of all energy types with examples',2),
  (day5,'Law of Conservation of Energy','https://www.youtube.com/watch?v=KNhJQpTdkFg','video','Crash Course','Fun overview of conservation of energy',3);

-- Day 6 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day6,'Heat Transfer Methods','https://www.khanacademy.org/science/ms-physics/x804bf4b8a9c25a9c:heat/x804bf4b8a9c25a9c:temperature-and-heat/v/heat-transfer','video','Khan Academy','Conduction, convection, and radiation explained',0),
  (day6,'Conduction, Convection, Radiation','https://www.ck12.org/physical-science/conduction-convection-radiation/lesson/Conduction-Convection-and-Radiation-MS-PS/','article','CK-12','Detailed lesson with practice problems',1),
  (day6,'How Heat Moves','https://www.youtube.com/watch?v=8BMpRBiFHcI','video','SciShow Kids','Engaging video showing all three heat transfer methods',2);

-- Day 7 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day7,'Speed and Velocity','https://www.khanacademy.org/science/physics/one-dimensional-motion/displacement-velocity-time/v/introduction-to-kinematics','video','Khan Academy','Introduction to motion and graphing',0),
  (day7,'Motion Graphs','https://phet.colorado.edu/en/simulations/moving-man','interactive','PhET Colorado','Create distance-time and velocity-time graphs interactively',1),
  (day7,'Speed, Velocity, Acceleration','https://www.ck12.org/physical-science/speed-velocity-and-acceleration/lesson/Speed-Velocity-and-Acceleration-MS-PS/','article','CK-12','Clear reading with practice problems',2);

-- Day 8 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day8,'Newton''s First Law','https://www.khanacademy.org/science/physics/forces-newtons-laws/newtons-laws-of-motion/v/newton-s-first-law-of-motion','video','Khan Academy','First Law explained with great examples',0),
  (day8,'Forces and Motion: Basics','https://phet.colorado.edu/en/simulations/forces-and-motion-basics','interactive','PhET Colorado','Explore balanced and unbalanced forces',1),
  (day8,'Inertia and Newton''s First Law','https://www.ck12.org/physical-science/newtons-first-law-of-motion/lesson/Newtons-First-Law-MS-PS/','article','CK-12','Comprehensive reading on inertia',2);

-- Day 9 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day9,'Newton''s Second Law F=ma','https://www.khanacademy.org/science/physics/forces-newtons-laws/newtons-laws-of-motion/v/newton-s-second-law-of-motion','video','Khan Academy','F=ma derived and applied with examples',0),
  (day9,'Forces and Motion Simulation','https://phet.colorado.edu/en/simulations/forces-and-motion-basics','interactive','PhET Colorado','Apply forces and observe acceleration changes',1),
  (day9,'Second Law Practice Problems','https://www.ck12.org/physical-science/newtons-second-law-of-motion/lesson/Newtons-Second-Law-MS-PS/','article','CK-12','Practice problems with F=ma',2);

-- Day 10 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day10,'Newton''s Third Law','https://www.khanacademy.org/science/physics/forces-newtons-laws/newtons-laws-of-motion/v/newton-s-third-law-of-motion','video','Khan Academy','Action-reaction explained with rocket example',0),
  (day10,'Momentum Conservation','https://phet.colorado.edu/en/simulations/collision-lab','interactive','PhET Colorado','Explore momentum in collisions',1),
  (day10,'Third Law and Momentum','https://www.ck12.org/physical-science/newtons-third-law-of-motion/lesson/Newtons-Third-Law-MS-PS/','article','CK-12','Reading on Third Law with real-world applications',2);

-- Day 11 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day11,'Gravity and Falling Objects','https://www.khanacademy.org/science/physics/forces-newtons-laws/newtons-law-of-gravitation/v/gravity-and-mass','video','Khan Academy','Mass, weight, and gravity explained clearly',0),
  (day11,'Gravity Force Lab','https://phet.colorado.edu/en/simulations/gravity-force-lab','interactive','PhET Colorado','Explore gravitational force between masses',1),
  (day11,'Projectile Motion','https://phet.colorado.edu/en/simulations/projectile-motion','interactive','PhET Colorado','Launch projectiles and see independent motion components',2);

-- Day 12 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day12,'Simple Machines','https://www.khanacademy.org/science/physics/work-and-energy/mechanical-advantage/v/introduction-to-mechanical-advantage','video','Khan Academy','How simple machines change force',0),
  (day12,'Simple Machines Interactive','https://www.ck12.org/physical-science/simple-machines/lesson/Simple-Machines-MS-PS/','interactive','CK-12','Learn about all six types of simple machines',1),
  (day12,'Friction','https://phet.colorado.edu/en/simulations/friction','interactive','PhET Colorado','Explore how friction works at the atomic level',2);

-- Day 13 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day13,'Structure of the Earth','https://www.khanacademy.org/science/ms-earth-science/x54b673cf:earths-structure/x54b673cf:intro-to-earths-structure/v/layers-of-the-earth','video','Khan Academy','Clear overview of Earth''s layers',0),
  (day13,'Earth''s Interior','https://www.ck12.org/earth-science/earths-layers/lesson/Earths-Layers-MS-ESS/','article','CK-12','Detailed lesson on each layer''s properties',1),
  (day13,'Seismic Waves','https://www.iris.edu/hq/inclass/animation/seismic_wave_propagation','interactive','IRIS Seismology','Watch seismic waves travel through Earth',2),
  (day13,'Journey to the Center of the Earth','https://www.youtube.com/watch?v=XiAoUDfrar0','video','National Geographic','Documentary-style video on Earth''s structure',3);

-- Day 14 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day14,'Plate Tectonics','https://www.khanacademy.org/science/ms-earth-science/x54b673cf:plate-tectonics/x54b673cf:intro-to-plate-tectonics/v/plate-tectonics-an-introduction','video','Khan Academy','Comprehensive intro to plate tectonics',0),
  (day14,'This Dynamic Earth','https://pubs.usgs.gov/gip/dynamic/dynamic.html','website','USGS','Official USGS guide to plate tectonics',1),
  (day14,'Plate Boundaries Simulation','https://www.ck12.org/earth-science/plate-boundaries/lesson/Types-of-Plate-Boundaries-MS-ESS/','interactive','CK-12','Interactive exploration of all three boundary types',2);

-- Day 15 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day15,'Earthquakes 101','https://www.youtube.com/watch?v=ldNm8UoVCdA','video','National Geographic','Complete overview of earthquake causes',0),
  (day15,'Volcano Explorer','https://www.ck12.org/earth-science/volcanoes/lesson/Volcanoes-MS-ESS/','article','CK-12','Types of volcanoes and eruption mechanics',1),
  (day15,'USGS Earthquake Hazards','https://earthquake.usgs.gov/learn/kids/','website','USGS','Kid-friendly USGS resource on earthquakes',2);

-- Day 16 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day16,'The Rock Cycle','https://www.khanacademy.org/science/ms-earth-science/x54b673cf:rocks-and-minerals/x54b673cf:rock-cycle/v/rock-cycle','video','Khan Academy','How rocks transform between types',0),
  (day16,'Rock Cycle Interactive','https://www.ck12.org/earth-science/rock-cycle/lesson/The-Rock-Cycle-MS-ESS/','interactive','CK-12','Explore the rock cycle with simulations',1),
  (day16,'Types of Rocks','https://www.usgs.gov/faqs/what-are-three-types-rocks','website','USGS','USGS explanation of igneous, sedimentary, metamorphic rocks',2);

-- Day 17 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day17,'Moon Phases','https://moon.nasa.gov/moon-in-motion/phases-eclipses-supermoons/moon-phases/','website','NASA','Official NASA resource on Moon phases',0),
  (day17,'Tides Explained','https://oceanservice.noaa.gov/facts/tides.html','website','NOAA','NOAA explains tidal forces and spring/neap tides',1),
  (day17,'Eclipses','https://science.nasa.gov/eclipses/','website','NASA','NASA eclipse science resource',2),
  (day17,'Moon Phases Simulation','https://www.ck12.org/earth-science/the-moon/lesson/The-Moon-MS-ESS/','interactive','CK-12','Interactive Moon phases and eclipses',3);

-- Day 18 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day18,'Our Solar System','https://solarsystem.nasa.gov/solar-system/our-solar-system/overview/','website','NASA','Complete NASA guide to the solar system',0),
  (day18,'Star Life Cycle','https://www.khanacademy.org/science/cosmology-and-astronomy/stellar-evolution-topic/stellar-evolution/v/lifecycle-of-stars','video','Khan Academy','Star life cycle from nebula to remnants',1),
  (day18,'Scale of the Universe','https://www.htwins.net/scale2/','interactive','HTwins','Interactive visualization of scale from quantum to cosmic',2);

-- Day 19 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day19,'Cell Structure','https://www.khanacademy.org/science/ap-biology/cell-structure-and-function/cell-structures-overview/v/plant-vs-animal-cells','video','Khan Academy','Compare plant and animal cell organelles',0),
  (day19,'Cell Explorer','https://www.ck12.org/life-science/cells/lesson/Prokaryotic-and-Eukaryotic-Cells-MS-LS/','interactive','CK-12','Explore cell types with labeled diagrams',1),
  (day19,'3D Cell Viewer','https://www.cellsalive.com/cells/cell_model.htm','interactive','Cells Alive','Interactive 3D model of animal and plant cells',2);

-- Day 20 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day20,'Photosynthesis','https://www.khanacademy.org/science/ap-biology/cellular-energetics/photosynthesis/v/photosynthesis-light-reactions-1','video','Khan Academy','Detailed explanation of photosynthesis reactions',0),
  (day20,'Respiration','https://www.khanacademy.org/science/ap-biology/cellular-energetics/cellular-respiration-ap/v/introduction-to-cellular-respiration','video','Khan Academy','Cellular respiration step by step',1),
  (day20,'Photosynthesis & Respiration','https://phet.colorado.edu/en/simulations/photosynthesis','interactive','PhET Colorado','Simulate photosynthesis and see oxygen production',2);

-- Day 21 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day21,'DNA Structure','https://www.khanacademy.org/science/ap-biology/gene-expression-and-regulation/transcription-and-rna-processing/v/dna-structure-and-replication-review','video','Khan Academy','DNA structure and base pairing clearly explained',0),
  (day21,'Genetics and Punnett Squares','https://www.khanacademy.org/science/ap-biology/heredity/mendels-law-of-segregation/v/introduction-to-heredity','video','Khan Academy','Mendel''s laws and Punnett squares',1),
  (day21,'Punnett Square Practice','https://www.ck12.org/life-science/punnett-squares/lesson/Punnett-Squares-MS-LS/','interactive','CK-12','Practice Punnett square problems',2);

-- Day 22 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day22,'Natural Selection','https://www.khanacademy.org/science/ap-biology/natural-selection/natural-selection-ap/v/natural-selection-and-the-owl-butterfly','video','Khan Academy','Natural selection explained with great examples',0),
  (day22,'Evidence for Evolution','https://www.ck12.org/life-science/evidence-of-evolution/lesson/Evidence-of-Evolution-MS-LS/','article','CK-12','Fossil record, anatomy, and molecular evidence',1),
  (day22,'Natural Selection Simulation','https://phet.colorado.edu/en/simulations/natural-selection','interactive','PhET Colorado','Watch natural selection happen in a bunny population',2);

-- Day 23 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day23,'Food Webs','https://www.khanacademy.org/science/ap-biology/ecology-ap/energy-flow-through-ecosystems/v/food-chains-and-food-webs','video','Khan Academy','Energy flow through ecosystems',0),
  (day23,'Energy Pyramid','https://www.ck12.org/life-science/energy-pyramids/lesson/Energy-Pyramids-MS-LS/','article','CK-12','The 10% energy transfer rule explained',1),
  (day23,'Carbon Cycle','https://climate.nasa.gov/climate_resources/10/video-the-carbon-cycle/','video','NASA','NASA''s carbon cycle animation and explanation',2);

-- Day 24 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day24,'Population Dynamics','https://www.khanacademy.org/science/ap-biology/ecology-ap/population-ecology-ap/v/population-size','video','Khan Academy','Carrying capacity and population growth curves',0),
  (day24,'Predator-Prey Simulation','https://www.ck12.org/life-science/predator-prey-relationships/lesson/Predator-Prey-Relationships-MS-LS/','interactive','CK-12','Explore predator-prey population cycles',1),
  (day24,'Invasive Species','https://www.nationalgeographic.com/environment/article/invasive-species','article','National Geographic','Case studies on invasive species impacts',2);

-- Day 25 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day25,'Layers of the Atmosphere','https://scijinks.gov/atmosphere/','website','NOAA SciJinks','Kid-friendly guide to atmospheric layers',0),
  (day25,'Greenhouse Effect','https://climate.nasa.gov/causes/','website','NASA Climate','NASA''s explanation of greenhouse gases and climate change',1),
  (day25,'Climate vs Weather','https://www.khanacademy.org/science/ms-earth-science/x54b673cf:weather-and-climate/x54b673cf:overview-of-weather-and-climate/v/weather-and-climate','video','Khan Academy','Clear distinction between climate and weather',2);

-- Day 26 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day26,'Human Impact on Ecosystems','https://www.khanacademy.org/science/ap-biology/ecology-ap/human-impacts-on-ecosystems/v/human-impacts-on-biodiversity','video','Khan Academy','Deforestation, pollution, and biodiversity loss',0),
  (day26,'Biodiversity','https://www.nationalgeographic.com/environment/article/reference/biodiversity','article','National Geographic','Importance of biodiversity explained',1),
  (day26,'Sustainability Solutions','https://www.ck12.org/earth-science/human-impact-on-earth/lesson/Human-Impact-on-Earth-MS-ESS/','article','CK-12','Human impacts and sustainable solutions',2);

-- Day 27 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day27,'Properties of Waves','https://www.khanacademy.org/science/physics/mechanical-waves-and-sound/mechanical-waves/v/introduction-to-waves','video','Khan Academy','Wavelength, frequency, amplitude explained',0),
  (day27,'Wave on a String','https://phet.colorado.edu/en/simulations/wave-on-a-string','interactive','PhET Colorado','Visualize wave properties interactively',1),
  (day27,'Sound Waves','https://www.ck12.org/physical-science/sound-waves/lesson/Sound-Waves-MS-PS/','article','CK-12','How sound waves work',2);

-- Day 28 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day28,'Electromagnetic Spectrum','https://science.nasa.gov/ems/','website','NASA','NASA''s complete guide to the EM spectrum',0),
  (day28,'Light Refraction','https://phet.colorado.edu/en/simulations/bending-light','interactive','PhET Colorado','Explore reflection and refraction of light',1),
  (day28,'Visible Light and Color','https://www.khanacademy.org/science/physics/light-waves/introduction-to-light-waves/v/the-visible-light-spectrum','video','Khan Academy','The visible light spectrum and color',2);

-- Day 29 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day29,'Scientific Method','https://www.khanacademy.org/science/high-school-biology/hs-biology-foundations/hs-biology-and-the-scientific-method/v/the-scientific-method','video','Khan Academy','Review of scientific method for STAAR prep',0),
  (day29,'STAAR Science Resources','https://tea.texas.gov/student-assessment/testing/staar/staar-science','website','Texas Education Agency','Official TEA STAAR science practice resources',1),
  (day29,'Data Analysis Practice','https://www.ck12.org/physical-science/scientific-method/lesson/The-Scientific-Method-MS-PS/','article','CK-12','Scientific method and data analysis practice',2);

-- Day 30 Resources
INSERT INTO resources (study_day_id,title,url,resource_type,source,description,order_index) VALUES
  (day30,'Grade 8 Science Review','https://www.khanacademy.org/science/ms-physics','website','Khan Academy','Full Khan Academy 8th grade science course review',0),
  (day30,'CK-12 Grade 8 Science','https://www.ck12.org/student/','website','CK-12','Browse all 8th grade science topics',1),
  (day30,'8th Grade Science STAAR Review','https://www.youtube.com/watch?v=8aU6n3QbPPs','video','Science Tutor','30-minute STAAR science review video',2);

-- ============================================================
-- QUIZ QUESTIONS (3-4 per day)
-- ============================================================

-- Day 1 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day1,'Which of the following is a PHYSICAL property of matter?',
   'single',
   '[{"id":"a","text":"Flammability"},{"id":"b","text":"Reactivity with acid"},{"id":"c","text":"Density"},{"id":"d","text":"Ability to rust"}]',
   '"c"',
   'Density is a physical property because it can be measured without changing the substance. Flammability, reactivity, and ability to rust are chemical properties.',10,0),
  (day1,'A substance has a mass of 20 g and a volume of 4 cm³. What is its density?',
   'single',
   '[{"id":"a","text":"80 g/cm³"},{"id":"b","text":"0.2 g/cm³"},{"id":"c","text":"5 g/cm³"},{"id":"d","text":"16 g/cm³"}]',
   '"c"',
   'Density = mass ÷ volume = 20 g ÷ 4 cm³ = 5 g/cm³',10,1),
  (day1,'True or False: Chemical properties can be observed without changing the chemical identity of a substance.',
   'true_false','[]','"False"',
   'False. Chemical properties describe HOW a substance CAN change. To observe a chemical property, the substance must undergo a chemical change.',10,2);

-- Day 2 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day2,'Which observation is the BEST evidence that a chemical change has occurred?',
   'single',
   '[{"id":"a","text":"A substance changes shape"},{"id":"b","text":"A substance changes from solid to liquid"},{"id":"c","text":"A new gas is produced and a color change occurs"},{"id":"d","text":"A substance is cut into smaller pieces"}]',
   '"c"',
   'Producing a new gas and a color change are signs that new substances formed — indicating a chemical change. Changing shape or phase are physical changes.',10,0),
  (day2,'True or False: When wood burns, the total mass of the products equals the mass of the original wood.',
   'true_false','[]','"True"',
   'True. The Law of Conservation of Mass states that mass is neither created nor destroyed. The gaseous products (CO₂, water vapor) have the same total mass as the original wood plus the oxygen used.',10,1),
  (day2,'Which of the following are signs of a chemical change? (Select all that apply)',
   'mcq',
   '[{"id":"a","text":"Formation of a precipitate"},{"id":"b","text":"Change in shape"},{"id":"c","text":"Release of light and heat"},{"id":"d","text":"Production of a gas"}]',
   '["a","c","d"]',
   'Precipitate formation, energy release (light/heat), and gas production all indicate new substances forming. A change in shape is a physical change.',10,2);

-- Day 3 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day3,'An element has an atomic number of 8 and a mass number of 16. How many neutrons does it have?',
   'single',
   '[{"id":"a","text":"8"},{"id":"b","text":"16"},{"id":"c","text":"24"},{"id":"d","text":"4"}]',
   '"a"',
   'Neutrons = mass number − atomic number = 16 − 8 = 8 neutrons. This element is oxygen.',10,0),
  (day3,'Which particle determines which element an atom is?',
   'single',
   '[{"id":"a","text":"Neutron"},{"id":"b","text":"Electron"},{"id":"c","text":"Proton"},{"id":"d","text":"Nucleus"}]',
   '"c"',
   'The number of protons (atomic number) defines which element an atom is. Change the number of protons and you have a different element.',10,1),
  (day3,'True or False: Electrons have a positive charge.',
   'true_false','[]','"False"',
   'False. Electrons have a negative charge. Protons are positively charged and neutrons have no charge.',10,2);

-- Day 4 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day4,'Which of the following is a COMPOUND?',
   'single',
   '[{"id":"a","text":"Gold (Au)"},{"id":"b","text":"Oxygen (O₂)"},{"id":"c","text":"Water (H₂O)"},{"id":"d","text":"Saltwater"}]',
   '"c"',
   'Water (H₂O) is a compound because it contains two different elements (hydrogen and oxygen) chemically bonded. Gold and oxygen are elements; saltwater is a mixture.',10,0),
  (day4,'True or False: A homogeneous mixture has the same composition throughout.',
   'true_false','[]','"True"',
   'True. In a homogeneous mixture like saltwater, the solute is uniformly distributed and the composition is the same everywhere.',10,1),
  (day4,'Which method would best separate sand from water?',
   'single',
   '[{"id":"a","text":"Distillation"},{"id":"b","text":"Filtration"},{"id":"c","text":"Evaporation"},{"id":"d","text":"Chromatography"}]',
   '"b"',
   'Filtration uses a filter to separate an insoluble solid (sand) from a liquid (water). Distillation separates dissolved substances; evaporation removes liquid.',10,2);

-- Day 5 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day5,'A ball at the top of a hill has the most ________ energy.',
   'single',
   '[{"id":"a","text":"Kinetic"},{"id":"b","text":"Thermal"},{"id":"c","text":"Gravitational potential"},{"id":"d","text":"Chemical"}]',
   '"c"',
   'At the top of the hill, the ball is not moving (no kinetic energy) but has maximum height, so it has maximum gravitational potential energy.',10,0),
  (day5,'True or False: Energy can be created from nothing.',
   'true_false','[]','"False"',
   'False. The Law of Conservation of Energy states that energy cannot be created or destroyed, only transformed from one form to another.',10,1),
  (day5,'Which of the following are examples of energy transformations? (Select all that apply)',
   'mcq',
   '[{"id":"a","text":"A plant converting sunlight to glucose"},{"id":"b","text":"A rock sitting on a shelf"},{"id":"c","text":"A car engine burning gasoline to move"},{"id":"d","text":"A battery powering a flashlight"}]',
   '["a","c","d"]',
   'All three involve energy changing from one form to another: light→chemical, chemical→mechanical, chemical→light. A rock on a shelf has potential energy but no transformation is occurring.',10,2);

-- Day 6 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day6,'How does heat from the Sun reach Earth?',
   'single',
   '[{"id":"a","text":"Conduction through space"},{"id":"b","text":"Convection through space"},{"id":"c","text":"Radiation through space"},{"id":"d","text":"Conduction through the atmosphere"}]',
   '"c"',
   'Radiation is the only heat transfer method that does not require a medium. Since space is a vacuum, the Sun''s energy reaches Earth via radiation (electromagnetic waves).',10,0),
  (day6,'What type of heat transfer occurs when you touch a hot pan?',
   'single',
   '[{"id":"a","text":"Radiation"},{"id":"b","text":"Convection"},{"id":"c","text":"Conduction"},{"id":"d","text":"Insulation"}]',
   '"c"',
   'Conduction is heat transfer through direct contact between objects. When you touch the hot pan, heat transfers directly from the pan to your hand.',10,1),
  (day6,'True or False: Convection can occur in solids.',
   'true_false','[]','"False"',
   'False. Convection requires a fluid (liquid or gas) to carry heat through the movement of particles. Solids cannot undergo convection because their particles cannot flow freely.',10,2);

-- Day 7 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day7,'A car travels 150 km in 3 hours. What is its average speed?',
   'single',
   '[{"id":"a","text":"450 km/h"},{"id":"b","text":"50 km/h"},{"id":"c","text":"153 km/h"},{"id":"d","text":"147 km/h"}]',
   '"b"',
   'Speed = distance ÷ time = 150 km ÷ 3 h = 50 km/h',10,0),
  (day7,'How does velocity differ from speed?',
   'single',
   '[{"id":"a","text":"Velocity is always larger than speed"},{"id":"b","text":"Velocity includes direction; speed does not"},{"id":"c","text":"Speed includes direction; velocity does not"},{"id":"d","text":"They are identical"}]',
   '"b"',
   'Velocity is a vector quantity — it includes both magnitude (how fast) and direction. Speed is a scalar that only measures how fast.',10,1),
  (day7,'True or False: A flat horizontal line on a velocity-time graph means the object is accelerating.',
   'true_false','[]','"False"',
   'False. A flat horizontal line on a velocity-time graph means constant velocity — no change in velocity means no acceleration. The slope of a velocity-time graph equals acceleration.',10,2);

-- Day 8 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day8,'According to Newton''s First Law, what will happen to a moving object if no forces act on it?',
   'single',
   '[{"id":"a","text":"It will slow down and stop"},{"id":"b","text":"It will continue moving at the same speed and direction"},{"id":"c","text":"It will accelerate"},{"id":"d","text":"It will change direction"}]',
   '"b"',
   'Newton''s First Law (Inertia): objects in motion stay in motion with the same velocity unless acted upon by an unbalanced force. Without friction, a moving object would continue indefinitely.',10,0),
  (day8,'True or False: A heavier object has less inertia than a lighter object.',
   'true_false','[]','"False"',
   'False. Inertia is directly proportional to mass. A heavier (more massive) object has MORE inertia — it is harder to start moving and harder to stop.',10,1),
  (day8,'Which of the following are examples of inertia? (Select all that apply)',
   'mcq',
   '[{"id":"a","text":"Passengers lean forward when a car brakes suddenly"},{"id":"b","text":"A ball speeds up when pushed"},{"id":"c","text":"A spacecraft continues moving in space with no engine"},{"id":"d","text":"A book stays on a table until pushed"}]',
   '["a","c","d"]',
   'Leaning forward when braking, continuing in space, and staying at rest are all examples of objects resisting changes to their motion (inertia). Speeding up when pushed involves an applied force, not inertia.',10,2);

-- Day 9 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day9,'A 10 kg box is pushed with a net force of 30 N. What is its acceleration?',
   'single',
   '[{"id":"a","text":"300 m/s²"},{"id":"b","text":"0.33 m/s²"},{"id":"c","text":"3 m/s²"},{"id":"d","text":"20 m/s²"}]',
   '"c"',
   'F = ma, so a = F ÷ m = 30 N ÷ 10 kg = 3 m/s²',10,0),
  (day9,'If you double the force on an object while keeping mass constant, what happens to acceleration?',
   'single',
   '[{"id":"a","text":"Acceleration is halved"},{"id":"b","text":"Acceleration doubles"},{"id":"c","text":"Acceleration stays the same"},{"id":"d","text":"Acceleration quadruples"}]',
   '"b"',
   'By F = ma, acceleration is directly proportional to force. If force doubles and mass stays constant, acceleration doubles.',10,1),
  (day9,'True or False: Force is measured in kilograms.',
   'true_false','[]','"False"',
   'False. Force is measured in Newtons (N). Kilograms measure mass. One Newton equals 1 kg·m/s².',10,2);

-- Day 10 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day10,'When you push against a wall, Newton''s Third Law says the wall:',
   'single',
   '[{"id":"a","text":"Absorbs your force"},{"id":"b","text":"Pushes back on you with equal and opposite force"},{"id":"c","text":"Falls down because of your force"},{"id":"d","text":"Has no effect on you"}]',
   '"b"',
   'Newton''s Third Law: for every action force, there is an equal and opposite reaction force. The wall pushes back on you with the same magnitude of force you apply.',10,0),
  (day10,'A 2 kg object moving at 3 m/s has what momentum?',
   'single',
   '[{"id":"a","text":"1.5 kg·m/s"},{"id":"b","text":"6 kg·m/s"},{"id":"c","text":"1.5 m/s"},{"id":"d","text":"5 kg·m/s"}]',
   '"b"',
   'Momentum (p) = mass × velocity = 2 kg × 3 m/s = 6 kg·m/s',10,1),
  (day10,'True or False: Action and reaction forces act on the same object.',
   'true_false','[]','"False"',
   'False. Action-reaction force pairs always act on DIFFERENT objects. This is why they don''t cancel each other out.',10,2);

-- Day 11 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day11,'What is the weight of a 5 kg object on Earth (g = 9.8 m/s²)?',
   'single',
   '[{"id":"a","text":"5 N"},{"id":"b","text":"49 N"},{"id":"c","text":"9.8 N"},{"id":"d","text":"0.51 N"}]',
   '"b"',
   'Weight = mass × g = 5 kg × 9.8 m/s² = 49 N',10,0),
  (day11,'True or False: Your mass would change if you traveled to the Moon.',
   'true_false','[]','"False"',
   'False. Mass measures the amount of matter in an object and does not change with location. Your WEIGHT would decrease on the Moon because of its weaker gravity.',10,1),
  (day11,'How does gravitational force change as two objects move farther apart?',
   'single',
   '[{"id":"a","text":"It increases"},{"id":"b","text":"It stays the same"},{"id":"c","text":"It decreases"},{"id":"d","text":"It becomes zero immediately"}]',
   '"c"',
   'According to Newton''s law of gravitation, gravitational force decreases as distance increases (inverse square relationship). The farther apart two objects are, the weaker the gravitational pull.',10,2);

-- Day 12 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day12,'How much work is done when a 50 N force moves an object 4 meters?',
   'single',
   '[{"id":"a","text":"12.5 J"},{"id":"b","text":"54 J"},{"id":"c","text":"200 J"},{"id":"d","text":"46 J"}]',
   '"c"',
   'Work = Force × distance = 50 N × 4 m = 200 J (Joules)',10,0),
  (day12,'A ramp is an example of which simple machine?',
   'single',
   '[{"id":"a","text":"Lever"},{"id":"b","text":"Pulley"},{"id":"c","text":"Wheel and axle"},{"id":"d","text":"Inclined plane"}]',
   '"d"',
   'A ramp is an inclined plane — it reduces the force needed to lift an object by increasing the distance over which the force is applied.',10,1),
  (day12,'True or False: Simple machines reduce the total amount of work needed.',
   'true_false','[]','"False"',
   'False. Simple machines do NOT reduce the total work done — they change the force required or the direction of force. A machine with 100% efficiency does the same total work regardless.',10,2);

-- Day 13 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day13,'Which layer of Earth generates the planet''s magnetic field?',
   'single',
   '[{"id":"a","text":"Inner core"},{"id":"b","text":"Outer core"},{"id":"c","text":"Mantle"},{"id":"d","text":"Crust"}]',
   '"b"',
   'Earth''s magnetic field is generated by convection of liquid iron-nickel in the outer core, creating electrical currents that produce a magnetic field.',10,0),
  (day13,'True or False: Seismic P-waves can travel through both liquids and solids.',
   'true_false','[]','"True"',
   'True. P-waves (compressional/primary waves) can travel through all states of matter. S-waves (shear waves) can only travel through solids.',10,1),
  (day13,'Which layer of Earth is the thickest?',
   'single',
   '[{"id":"a","text":"Crust"},{"id":"b","text":"Inner core"},{"id":"c","text":"Outer core"},{"id":"d","text":"Mantle"}]',
   '"d"',
   'The mantle is the largest and thickest layer of Earth, making up about 84% of Earth''s volume.',10,2);

-- Day 14 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day14,'At a convergent boundary where oceanic crust meets continental crust, what typically happens?',
   'single',
   '[{"id":"a","text":"Both plates are destroyed equally"},{"id":"b","text":"Oceanic crust subducts under continental crust"},{"id":"c","text":"Continental crust subducts under oceanic crust"},{"id":"d","text":"A rift valley forms"}]',
   '"b"',
   'Oceanic crust is denser than continental crust, so it sinks (subducts) beneath the continental plate at convergent boundaries, forming deep-ocean trenches and volcanic mountain chains.',10,0),
  (day14,'What drives the movement of tectonic plates?',
   'single',
   '[{"id":"a","text":"Earth''s rotation"},{"id":"b","text":"Ocean waves"},{"id":"c","text":"Convection currents in the mantle"},{"id":"d","text":"Solar winds"}]',
   '"c"',
   'Convection currents in the mantle, driven by heat from Earth''s interior, create circulation that drags tectonic plates across the asthenosphere.',10,1),
  (day14,'True or False: Mid-ocean ridges form at divergent plate boundaries.',
   'true_false','[]','"True"',
   'True. At divergent boundaries, plates move apart and magma wells up to fill the gap, creating mid-ocean ridges and new ocean crust.',10,2);

-- Day 15 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day15,'What is the difference between the focus and epicenter of an earthquake?',
   'single',
   '[{"id":"a","text":"They are the same point"},{"id":"b","text":"Focus is on the surface; epicenter is underground"},{"id":"c","text":"Focus is underground where the earthquake originates; epicenter is on the surface directly above"},{"id":"d","text":"Epicenter is where shaking is felt most; focus is where damage occurs"}]',
   '"c"',
   'The focus (hypocenter) is the underground point where the earthquake actually begins. The epicenter is the point on Earth''s surface directly above the focus.',10,0),
  (day15,'True or False: Volcanoes only form at plate boundaries.',
   'true_false','[]','"False"',
   'False. Volcanoes can form at convergent boundaries, divergent boundaries, AND at hot spots (like Hawaii), which are not at plate boundaries.',10,1),
  (day15,'Why does the Pacific Ring of Fire have so many earthquakes and volcanoes?',
   'single',
   '[{"id":"a","text":"It is closest to the Sun"},{"id":"b","text":"It has the most plate boundaries"},{"id":"c","text":"The Pacific Ocean is the deepest"},{"id":"d","text":"It has the most continental crust"}]',
   '"b"',
   'The Ring of Fire outlines the boundaries of the Pacific Plate and several smaller plates. These plate boundaries are sites of frequent seismic and volcanic activity.',10,2);

-- Day 16 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day16,'Obsidian is a glassy volcanic rock that cooled very quickly. It is an example of:',
   'single',
   '[{"id":"a","text":"Intrusive igneous rock"},{"id":"b","text":"Extrusive igneous rock"},{"id":"c","text":"Sedimentary rock"},{"id":"d","text":"Metamorphic rock"}]',
   '"b"',
   'Extrusive igneous rocks form when magma reaches the surface (lava) and cools quickly, resulting in small crystals or glassy texture. Obsidian is a classic example.',10,0),
  (day16,'True or False: Sedimentary rock can be transformed into metamorphic rock through heat and pressure.',
   'true_false','[]','"True"',
   'True. This is a key pathway in the rock cycle. When sedimentary rocks are buried deep and exposed to intense heat and pressure, they can metamorphose into metamorphic rocks.',10,1),
  (day16,'Which of the following are sedimentary rocks? (Select all that apply)',
   'mcq',
   '[{"id":"a","text":"Sandstone"},{"id":"b","text":"Granite"},{"id":"c","text":"Limestone"},{"id":"d","text":"Marble"}]',
   '["a","c"]',
   'Sandstone and limestone are sedimentary rocks. Granite is intrusive igneous rock. Marble is metamorphic rock (formed from limestone under heat and pressure).',10,2);

-- Day 17 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day17,'During which Moon phase do spring tides occur?',
   'single',
   '[{"id":"a","text":"First quarter and third quarter"},{"id":"b","text":"New moon and full moon"},{"id":"c","text":"New moon only"},{"id":"d","text":"Full moon only"}]',
   '"b"',
   'Spring tides (the strongest tides) occur when the Sun, Earth, and Moon are aligned — during new moon AND full moon phases, when gravitational forces combine.',10,0),
  (day17,'True or False: A lunar eclipse can only occur during a full moon.',
   'true_false','[]','"True"',
   'True. A lunar eclipse occurs when Earth moves between the Sun and Moon, casting its shadow on the Moon. This alignment can only happen during a full moon.',10,1),
  (day17,'What causes the Moon''s phases as seen from Earth?',
   'single',
   '[{"id":"a","text":"Earth''s shadow on the Moon"},{"id":"b","text":"The Moon''s own light changing"},{"id":"c","text":"The changing angle between the Sun, Moon, and Earth"},{"id":"d","text":"The Moon rotating on its axis"}]',
   '"c"',
   'Moon phases result from the changing angle between the Sun, Moon, and Earth as the Moon orbits Earth. The Sun always illuminates half the Moon; we see different portions of that illuminated half.',10,2);

-- Day 18 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day18,'Which of the following correctly lists the planets from closest to farthest from the Sun?',
   'single',
   '[{"id":"a","text":"Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune"},{"id":"b","text":"Mercury, Earth, Venus, Mars, Jupiter, Saturn, Uranus, Neptune"},{"id":"c","text":"Venus, Mercury, Earth, Mars, Saturn, Jupiter, Neptune, Uranus"},{"id":"d","text":"Mercury, Venus, Earth, Jupiter, Mars, Saturn, Uranus, Neptune"}]',
   '"a"',
   'The correct order from the Sun: Mercury, Venus, Earth, Mars (inner/rocky), then Jupiter, Saturn, Uranus, Neptune (outer/gas or ice giants).',10,0),
  (day18,'True or False: A light year measures time.',
   'true_false','[]','"False"',
   'False. A light year is a unit of DISTANCE — the distance light travels in one year (about 9.46 × 10¹² km). It is used to measure vast distances in space.',10,1),
  (day18,'What happens to a star like our Sun after it becomes a red giant?',
   'single',
   '[{"id":"a","text":"It becomes a neutron star"},{"id":"b","text":"It explodes as a supernova"},{"id":"c","text":"It collapses into a white dwarf"},{"id":"d","text":"It becomes a black hole"}]',
   '"c"',
   'Medium-mass stars like the Sun expand into red giants, then shed their outer layers as a planetary nebula, leaving behind a dense white dwarf. Only massive stars end as supernovae → neutron stars or black holes.',10,2);

-- Day 19 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day19,'Which organelle is known as the "powerhouse of the cell"?',
   'single',
   '[{"id":"a","text":"Nucleus"},{"id":"b","text":"Ribosome"},{"id":"c","text":"Mitochondria"},{"id":"d","text":"Vacuole"}]',
   '"c"',
   'Mitochondria produce ATP (cellular energy) through cellular respiration, earning them the nickname "powerhouse of the cell."',10,0),
  (day19,'True or False: Prokaryotic cells have a membrane-bound nucleus.',
   'true_false','[]','"False"',
   'False. Prokaryotic cells (like bacteria) do NOT have a membrane-bound nucleus. Their genetic material floats freely in the cytoplasm. Eukaryotic cells have a defined nucleus.',10,1),
  (day19,'Which organelles are found in plant cells but NOT in animal cells? (Select all that apply)',
   'mcq',
   '[{"id":"a","text":"Mitochondria"},{"id":"b","text":"Cell wall"},{"id":"c","text":"Chloroplast"},{"id":"d","text":"Ribosome"}]',
   '["b","c"]',
   'Plant cells have a rigid cell wall (made of cellulose) and chloroplasts (for photosynthesis) that animal cells lack. Mitochondria and ribosomes are found in both.',10,2);

-- Day 20 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day20,'In which organelle does photosynthesis take place?',
   'single',
   '[{"id":"a","text":"Mitochondria"},{"id":"b","text":"Ribosome"},{"id":"c","text":"Chloroplast"},{"id":"d","text":"Nucleus"}]',
   '"c"',
   'Photosynthesis occurs in the chloroplasts of plant cells. The thylakoid membranes capture light energy, and the stroma is where carbon fixation occurs.',10,0),
  (day20,'True or False: Cellular respiration only occurs in animals.',
   'true_false','[]','"False"',
   'False. Cellular respiration occurs in ALL living organisms — plants, animals, and fungi all use cellular respiration to extract energy from glucose.',10,1),
  (day20,'What are the products of aerobic cellular respiration?',
   'single',
   '[{"id":"a","text":"Glucose and oxygen"},{"id":"b","text":"Carbon dioxide, water, and ATP"},{"id":"c","text":"Carbon dioxide and glucose"},{"id":"d","text":"Oxygen and ATP only"}]',
   '"b"',
   'Aerobic respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP. The products are carbon dioxide, water, and ATP energy.',10,2);

-- Day 21 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day21,'In DNA, which base pairs with adenine (A)?',
   'single',
   '[{"id":"a","text":"Guanine (G)"},{"id":"b","text":"Cytosine (C)"},{"id":"c","text":"Thymine (T)"},{"id":"d","text":"Adenine (A)"}]',
   '"c"',
   'In DNA, A pairs with T (adenine-thymine), and G pairs with C (guanine-cytosine). These specific base pairings hold the double helix together.',10,0),
  (day21,'A Punnett square cross between Bb × Bb (where B is dominant) gives what probability of homozygous recessive (bb)?',
   'single',
   '[{"id":"a","text":"25%"},{"id":"b","text":"50%"},{"id":"c","text":"75%"},{"id":"d","text":"100%"}]',
   '"a"',
   'Bb × Bb produces BB (25%), Bb (50%), bb (25%). Homozygous recessive (bb) = 25% probability.',10,1),
  (day21,'True or False: Phenotype refers to the genetic makeup of an organism.',
   'true_false','[]','"False"',
   'False. Genotype is the genetic makeup (e.g., Bb). Phenotype is the observable physical trait (e.g., brown hair). Same phenotype can result from different genotypes.',10,2);

-- Day 22 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day22,'What is the primary mechanism of natural selection?',
   'single',
   '[{"id":"a","text":"Organisms intentionally change to survive"},{"id":"b","text":"Individuals with favorable traits are more likely to survive and reproduce"},{"id":"c","text":"All individuals in a species evolve equally"},{"id":"d","text":"Mutations always make organisms better adapted"}]',
   '"b"',
   'Natural selection acts on existing variation. Individuals with traits better suited to their environment survive and reproduce more, passing those traits to offspring.',10,0),
  (day22,'True or False: Darwin''s theory of evolution states that individual organisms change during their lifetime.',
   'true_false','[]','"False"',
   'False. Darwin''s theory states that POPULATIONS change over generations through natural selection. Individual organisms do not evolve; populations do.',10,1),
  (day22,'Which of the following are types of evidence for evolution? (Select all that apply)',
   'mcq',
   '[{"id":"a","text":"Fossil record"},{"id":"b","text":"Homologous structures"},{"id":"c","text":"DNA comparisons"},{"id":"d","text":"Astrology"}]',
   '["a","b","c"]',
   'Fossil record, homologous structures (similar anatomy from common ancestors), and DNA comparisons all provide evidence for evolution. Astrology is not science.',10,2);

-- Day 23 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day23,'If a grassland ecosystem receives 10,000 J of energy at the producer level, how much energy is available to primary consumers?',
   'single',
   '[{"id":"a","text":"10,000 J"},{"id":"b","text":"5,000 J"},{"id":"c","text":"1,000 J"},{"id":"d","text":"100 J"}]',
   '"c"',
   'The 10% rule states that only 10% of energy transfers between trophic levels. 10% of 10,000 J = 1,000 J available to primary consumers.',10,0),
  (day23,'True or False: Decomposers are consumers that eat dead organisms.',
   'true_false','[]','"True"',
   'True. Decomposers (fungi, bacteria) break down dead organisms and organic waste, recycling nutrients back into the ecosystem.',10,1),
  (day23,'Which of the following are abiotic factors in an ecosystem? (Select all that apply)',
   'mcq',
   '[{"id":"a","text":"Temperature"},{"id":"b","text":"Bacteria in the soil"},{"id":"c","text":"Sunlight intensity"},{"id":"d","text":"Amount of rainfall"}]',
   '["a","c","d"]',
   'Abiotic factors are nonliving components: temperature, sunlight, and rainfall. Bacteria are living organisms (biotic factors).',10,2);

-- Day 24 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day24,'The maximum population size an environment can sustain is called:',
   'single',
   '[{"id":"a","text":"Biotic potential"},{"id":"b","text":"Population density"},{"id":"c","text":"Carrying capacity"},{"id":"d","text":"Exponential growth"}]',
   '"c"',
   'Carrying capacity (K) is the maximum population size an environment can support given available resources like food, water, and shelter.',10,0),
  (day24,'True or False: Exponential population growth can continue indefinitely in nature.',
   'true_false','[]','"False"',
   'False. Exponential growth (J-curve) is limited by carrying capacity and limiting factors. In nature, populations eventually level off in an S-shaped (logistic) growth curve.',10,1),
  (day24,'An invasive species is likely to grow exponentially because:',
   'single',
   '[{"id":"a","text":"It has more offspring than native species"},{"id":"b","text":"It lacks natural predators and competitors in its new environment"},{"id":"c","text":"It is always larger than native species"},{"id":"d","text":"It can photosynthesize more efficiently"}]',
   '"b"',
   'Invasive species thrive because they are introduced to environments where natural checks (predators, parasites, competitors) that limit their population in their native habitat are absent.',10,2);

-- Day 25 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day25,'Which layer of the atmosphere contains the ozone layer?',
   'single',
   '[{"id":"a","text":"Troposphere"},{"id":"b","text":"Mesosphere"},{"id":"c","text":"Stratosphere"},{"id":"d","text":"Thermosphere"}]',
   '"c"',
   'The ozone layer is located in the stratosphere, approximately 15-35 km above Earth''s surface. It absorbs most of the Sun''s harmful ultraviolet radiation.',10,0),
  (day25,'True or False: Weather refers to long-term atmospheric conditions of a region.',
   'true_false','[]','"False"',
   'False. Weather refers to SHORT-TERM atmospheric conditions (daily changes). Climate refers to LONG-TERM patterns of temperature and precipitation in a region.',10,1),
  (day25,'How does burning fossil fuels enhance the greenhouse effect?',
   'single',
   '[{"id":"a","text":"It depletes the ozone layer directly"},{"id":"b","text":"It adds CO₂ and other greenhouse gases to the atmosphere, trapping more heat"},{"id":"c","text":"It creates acid rain that cools the atmosphere"},{"id":"d","text":"It reduces sunlight reaching Earth"}]',
   '"b"',
   'Burning fossil fuels releases CO₂ and other greenhouse gases. These gases trap more infrared radiation in the atmosphere, enhancing the greenhouse effect and warming the planet.',10,2);

-- Day 26 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day26,'What is the leading cause of species extinction today?',
   'single',
   '[{"id":"a","text":"Asteroid impacts"},{"id":"b","text":"Disease"},{"id":"c","text":"Habitat destruction"},{"id":"d","text":"Predation"}]',
   '"c"',
   'Habitat destruction (deforestation, urbanization, wetland draining) is the single largest cause of biodiversity loss and species extinction today.',10,0),
  (day26,'True or False: Higher biodiversity generally makes an ecosystem more stable and resilient.',
   'true_false','[]','"True"',
   'True. Diverse ecosystems have more species filling ecological roles. If one species declines, others can compensate, making the ecosystem more resistant to disruption.',10,1),
  (day26,'Which of the following are sustainable practices? (Select all that apply)',
   'mcq',
   '[{"id":"a","text":"Reforestation"},{"id":"b","text":"Overfishing"},{"id":"c","text":"Using renewable energy"},{"id":"d","text":"Reducing single-use plastics"}]',
   '["a","c","d"]',
   'Reforestation, renewable energy, and reducing plastics are sustainable practices. Overfishing depletes fish populations beyond their ability to recover.',10,2);

-- Day 27 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day27,'A wave has a wavelength of 2 m and a frequency of 5 Hz. What is its wave speed?',
   'single',
   '[{"id":"a","text":"2.5 m/s"},{"id":"b","text":"10 m/s"},{"id":"c","text":"7 m/s"},{"id":"d","text":"0.4 m/s"}]',
   '"b"',
   'Wave speed = wavelength × frequency = 2 m × 5 Hz = 10 m/s',10,0),
  (day27,'True or False: Sound can travel through a vacuum.',
   'true_false','[]','"False"',
   'False. Sound is a mechanical (longitudinal) wave that requires a medium (solid, liquid, or gas) to travel. In the vacuum of space, there is no medium, so sound cannot propagate.',10,1),
  (day27,'Which property of a sound wave determines its loudness?',
   'single',
   '[{"id":"a","text":"Frequency"},{"id":"b","text":"Wavelength"},{"id":"c","text":"Wave speed"},{"id":"d","text":"Amplitude"}]',
   '"d"',
   'Amplitude determines the loudness (volume) of a sound. Larger amplitude means more energy and louder sound. Frequency determines pitch.',10,2);

-- Day 28 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day28,'Which region of the electromagnetic spectrum has the shortest wavelength and highest energy?',
   'single',
   '[{"id":"a","text":"Radio waves"},{"id":"b","text":"Visible light"},{"id":"c","text":"Infrared"},{"id":"d","text":"Gamma rays"}]',
   '"d"',
   'Gamma rays have the shortest wavelength and highest frequency, therefore the highest energy. Radio waves have the longest wavelength and lowest energy.',10,0),
  (day28,'True or False: Light slows down when it passes from air into glass.',
   'true_false','[]','"True"',
   'True. Light slows when entering a denser medium (like glass). This change in speed causes refraction — the bending of light at the boundary between media.',10,1),
  (day28,'What is the law of reflection?',
   'single',
   '[{"id":"a","text":"The angle of incidence equals the angle of refraction"},{"id":"b","text":"Light always bends toward the normal"},{"id":"c","text":"The angle of incidence equals the angle of reflection"},{"id":"d","text":"Light always travels in a straight line"}]',
   '"c"',
   'The law of reflection states that the angle of incidence (incoming ray relative to normal) equals the angle of reflection (outgoing ray relative to normal).',10,2);

-- Day 29 Quiz
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day29,'In an experiment, the variable that the scientist deliberately changes is called the:',
   'single',
   '[{"id":"a","text":"Dependent variable"},{"id":"b","text":"Control variable"},{"id":"c","text":"Constant"},{"id":"d","text":"Independent variable"}]',
   '"d"',
   'The independent variable is deliberately manipulated by the scientist. The dependent variable is what is measured in response. Constants are kept the same.',10,0),
  (day29,'Which unit connects Matter & Energy AND Force & Motion concepts?',
   'single',
   '[{"id":"a","text":"Photosynthesis"},{"id":"b","text":"Energy — potential and kinetic energy transfer relates to force and motion"},{"id":"c","text":"The rock cycle"},{"id":"d","text":"DNA structure"}]',
   '"b"',
   'Energy is a unifying concept: potential energy converts to kinetic energy (Matter & Energy), and kinetic energy is directly linked to motion and force (Force & Motion).',10,1),
  (day29,'True or False: A hypothesis must be testable and falsifiable to be scientific.',
   'true_false','[]','"True"',
   'True. A scientific hypothesis must be testable (you can design an experiment) and falsifiable (it is possible to prove it wrong). This distinguishes science from non-science.',10,2);

-- Day 30 Quiz (Final Review — mixed question types)
INSERT INTO quiz_questions (study_day_id,question,question_type,options,correct_answer,explanation,points,order_index) VALUES
  (day30,'Which of the following correctly describes the Law of Conservation of Energy?',
   'single',
   '[{"id":"a","text":"Energy can be created but not destroyed"},{"id":"b","text":"Energy cannot be created or destroyed, only transformed"},{"id":"c","text":"Energy is always lost as heat"},{"id":"d","text":"Energy is destroyed when matter is used up"}]',
   '"b"',
   'The Law of Conservation of Energy states energy cannot be created or destroyed, only converted from one form to another.',10,0),
  (day30,'Which of the following are Newton''s Three Laws of Motion? (Select all that apply)',
   'mcq',
   '[{"id":"a","text":"Objects at rest stay at rest unless acted on by a net force"},{"id":"b","text":"Force equals mass times acceleration (F=ma)"},{"id":"c","text":"For every action there is an equal and opposite reaction"},{"id":"d","text":"Gravity decreases with the square of distance"}]',
   '["a","b","c"]',
   'The three Newton laws are: 1st (inertia), 2nd (F=ma), 3rd (action-reaction). The inverse square of distance describes the law of gravitation, not a law of motion.',10,1),
  (day30,'True or False: Plate tectonics, the rock cycle, and Earth''s magnetic field are all connected to Earth''s internal heat.',
   'true_false','[]','"True"',
   'True. Earth''s internal heat drives mantle convection (plate tectonics), melts and recrystallizes rock (rock cycle), and keeps the outer core liquid (magnetic field generation).',10,2),
  (day30,'In the process of photosynthesis, plants convert:',
   'single',
   '[{"id":"a","text":"Chemical energy into light energy"},{"id":"b","text":"Light energy into chemical energy stored in glucose"},{"id":"c","text":"Glucose into carbon dioxide and water"},{"id":"d","text":"Oxygen into carbon dioxide"}]',
   '"b"',
   'Photosynthesis converts light energy (solar) into chemical energy stored in glucose (C₆H₁₂O₆). This is the opposite of cellular respiration.',10,3);

-- ============================================================
-- EXPERIMENTS (1 per day, selected days shown — key days)
-- ============================================================

INSERT INTO experiments (study_day_id,title,description,materials,steps,safety_notes,bonus_points) VALUES
  (day1,'Density Column','Create a colorful liquid density column to visualize how different substances have different densities.',
   '["Tall clear glass or cylinder","Honey","Dish soap (colored)","Water (add food coloring)","Vegetable oil","Isopropyl alcohol (colored differently)","Small objects (grape, raisin, wooden bead)"]',
   '["Pour honey into the glass first (it is most dense)","Slowly pour dish soap down the side of the glass","Gently add colored water","Slowly pour vegetable oil","Add colored isopropyl alcohol last (least dense)","Observe the layers that form","Carefully drop small objects in and observe where they settle"]',
   'Adult supervision recommended when using alcohol. Do not consume the mixture.',25),

  (day2,'Baking Soda and Vinegar Reaction','Observe a chemical change and verify the Law of Conservation of Mass.',
   '["Baking soda (sodium bicarbonate)","White vinegar","Ziplock bag","Kitchen scale","Measuring spoons"]',
   '["Measure and record the mass of 1 tsp baking soda in a small paper cup","Measure and record the mass of 3 tbsp vinegar in the ziplock bag","Add the baking soda cup (without spilling) into the bag and seal it tightly","Shake to mix — observe the reaction","Measure the total mass of the sealed bag after the reaction","Compare: does mass before = mass after?"]',
   'The reaction produces CO₂ gas. Keep the bag sealed to capture all products.',25),

  (day5,'Rubber Band Energy Conversion','Demonstrate the conversion between potential and kinetic energy using a rubber band-powered car.',
   '["Cardboard","4 bottle caps (wheels)","2 wooden skewers (axles)","Rubber band","Tape","Straw pieces"]',
   '["Cut a rectangular piece of cardboard for the car body","Poke skewers through straw pieces as axles","Attach bottle caps as wheels","Thread a rubber band through the car body and attach to the rear axle","Wind the rubber band by rolling the car backward","Release and observe the car move forward","Compare how many winds affects distance traveled"]',
   'Be careful with skewer points. Adult help recommended for younger students.',25),

  (day7,'Motion Graph Experiment','Create your own distance-time and velocity-time graphs by walking at different speeds.',
   '["Measuring tape or meter stick","Stopwatch or phone timer","Chalk or tape markers","Graph paper or graphing app","Helper to time"]',
   '["Mark a start line and distance markers every 1 meter for 10 meters","Walk at a constant slow speed from start to 10m while a partner times each meter","Record time at each meter mark","Walk at constant fast speed and record again","Walk: slow for 5m, stop for 3 seconds, fast for 5m — record","Plot all three trials on a distance-time graph","Discuss what each graph shape means"]',
   'Do this in a safe open space. Watch for obstacles.',25),

  (day9,'Newton''s Second Law Cart Experiment','Investigate how force and mass affect acceleration.',
   '["Toy car or wheeled cart","String","Small weights (coins or washers)","Paper cup","Smooth flat surface (table or floor)","Tape measure","Stopwatch"]',
   '["Set up a flat surface with a string hanging off the edge attached to the cart","Add 1 weight (coin) to the hanging cup — time how long the cart takes to travel 50 cm","Add 2 weights, then 3 weights — record time each trial","Now keep 3 weights constant but add mass to the CART — record times","Calculate which has greater acceleration: more force or less mass","Graph your results"]',
   'Ensure the cart won''t fall off the table. Catch it before it reaches the edge.',25),

  (day13,'Seismic Wave Model','Model how S-waves and P-waves travel through Earth using a Slinky.',
   '["Slinky (metal preferred)","Open floor space (4-5 meters)","Tape to mark positions","Ruler"]',
   '["Stretch the Slinky on the floor between two people about 3 meters apart","P-wave: push-pull the Slinky in the direction it is stretched — observe compression waves","S-wave: shake the Slinky side-to-side perpendicular to its length — observe transverse waves","Notice which travels faster (P-wave — compression — is faster)","Put a book under part of the Slinky to model a denser layer — observe wave behavior change","Draw diagrams of each wave type"]',
   'Ensure the Slinky doesn''t get tangled. Work in a clear open area.',25),

  (day19,'Onion Cell Microscopy','Observe real plant cells under a microscope and identify organelles.',
   '["Onion","Microscope (school or home microscope)","Glass slides and coverslips","Iodine stain solution","Tweezers","Dropper","Paper towels"]',
   '["Peel back one layer of onion and remove the thin transparent inner skin","Place the skin flat on a glass slide","Add one drop of water and one drop of iodine stain","Lower the coverslip carefully at an angle to avoid bubbles","Place under microscope — start with lowest magnification","Observe and sketch what you see — identify cell wall, nucleus (stained dark), and vacuole","Compare to an animal cell image online"]',
   'Iodine stain can stain clothing and skin. Handle microscope slides carefully to avoid breakage.',25),

  (day22,'Natural Selection Simulation','Simulate natural selection using paper and different colored candies.',
   '["M&Ms or Skittles (mixed colors)","Green construction paper","Stopwatch","Cup or bowl","10 participants (or do multiple rounds alone)"]',
   '["Spread 50 mixed-color candies randomly on the green paper","Set a timer for 10 seconds — ''predators'' (students) pick up as many candies as possible in 10 seconds using only two fingers","Count surviving candies by color","''Reproduce'': add 2 candies of each surviving color back","Repeat for 3-5 generations","Graph population of each color over time","Discuss: which color has selective advantage on green background?"]',
   'No eating the experiment unless instructed by an adult supervisor.',25),

  (day27,'Wave Properties with Water','Observe wave properties using a simple water ripple tank.',
   '["Large shallow baking dish or storage bin","Water","Food coloring (optional)","Pencil or ruler","Flashlight or lamp","White paper"]',
   '["Fill the dish with about 2 cm of water","Place the dish over white paper with a light source shining through","Tap the water surface once with a pencil tip — observe circular ripples","Tap rhythmically at different speeds — observe frequency change","Use two pencils to create two wave sources — observe interference patterns","Try tapping at the edge — observe reflection","Sketch wave patterns you observe"]',
   'Clean up any water spills immediately. Keep electronic devices away from water.',25),

  (day30,'Science Scrapbook','Create a visual summary of what you learned in all four units.',
   '["Paper or notebook","Colored pencils or markers","Old magazines to cut (optional)","Glue or tape","Pen"]',
   '["Create a title page: ''My Grade 8 Science Journal — 30 Day Achievement''","Unit 1 page: Draw and label an atom, draw an energy transformation diagram","Unit 2 page: Draw a free body diagram, write F=ma with an example","Unit 3 page: Sketch Earth''s layers, draw a tectonic plate boundary type","Unit 4 page: Draw a food web from your local area, draw a cell","Final page: Write 3 things you learned that surprised you most","Add the achievement levels and mark your level achieved"]',
   'This is a creative project — there are no wrong answers. Express your understanding your way!',25);

END $$;
