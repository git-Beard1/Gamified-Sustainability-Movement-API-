/*
    Name: Thiha Swan Htet

    File Name: initTables.js

    Last Modified: 26/12/2023
*/

const pool = require("../services/db");

const MYSQLSTATEMENT = `
DROP TABLE IF EXISTS TaskProgress;
DROP TABLE IF EXISTS Inventory;
DROP TABLE IF EXISTS PetBonds;
DROP TABLE IF EXISTS SkillsMastered;
DROP TABLE IF EXISTS PetActivities;
DROP TABLE IF EXISTS Task;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Shop;
DROP TABLE IF EXISTS Pets;
DROP TABLE IF EXISTS Skills;

CREATE TABLE Task (
    task_id int NOT NULL AUTO_INCREMENT,
    title text,
    description text,
    points int DEFAULT NULL,
    PRIMARY KEY (task_id)
);

CREATE TABLE User (
    user_id int NOT NULL AUTO_INCREMENT,
    username text,
    email text,
    PRIMARY KEY (user_id)
);

CREATE TABLE TaskProgress (
    progress_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    task_id int NOT NULL,
    completion_date timestamp NULL DEFAULT NULL,
    notes text,
    PRIMARY KEY (progress_id),  
    KEY tp_task_id_task_task_id_idx (task_id),
    KEY tp_user_id_user_user_id_idx (user_id),
    CONSTRAINT tp_task_id_task_task_id FOREIGN KEY (task_id) REFERENCES Task (task_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT tp_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Shop (
  item_id int NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(255),
  category VARCHAR(255),
  required_points int DEFAULT NULL,
  PRIMARY KEY (item_id)
);

CREATE TABLE Inventory (
  inventory_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  item_id int NOT NULL,
  bought_date timestamp NULL DEFAULT NULL,
  PRIMARY KEY (inventory_id),
  KEY inv_user_id_user_user_id_idx (user_id),
  KEY inv_item_id_shop_item_id_idx (item_id),
  CONSTRAINT inv_item_id_shop_item_id FOREIGN KEY (item_id) REFERENCES Shop (item_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT inv_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Pets (
  pet_id int NOT NULL AUTO_INCREMENT,
  pet_name VARCHAR(100),
  rarity VARCHAR(20),
  required_eco_points int DEFAULT NULL,
  description VARCHAR(255),
  PRIMARY KEY (pet_id)
);

CREATE TABLE Skills (
  skill_id int NOT NULL AUTO_INCREMENT,
  pet_id int NOT NULL,
  skill_name VARCHAR(25),
  skill_type VARCHAR(25), 
  required_level int DEFAULT NULL,
  description VARCHAR(255),
  PRIMARY KEY (skill_id)
);

CREATE TABLE PetBonds (
  bond_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  pet_id int NOT NULL,
  exp int NOT NULL DEFAULT 0,
  level INT NOT NULL DEFAULT 1,
  next_lv_points INT NOT NULL DEFAULT 100,
  skill_id int DEFAULT NULL,
  PRIMARY KEY (bond_id),
  KEY pb_skill_id_skills_skill_id_idx (skill_id),
  KEY pb_user_id_user_user_id_idx (user_id),
  KEY pb_pet_id_pets_pet_id_idx (pet_id),
  CONSTRAINT pb_skill_id_skills_skill_id FOREIGN KEY (skill_id) REFERENCES skills (skill_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT pb_pet_id_pets_pet_id FOREIGN KEY (pet_id) REFERENCES pets (pet_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT pb_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE SkillsMastered (
  mastered_skill_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  pet_id int NOT NULL,
  skill_id int NOT NULL,
  PRIMARY KEY (mastered_skill_id),
  KEY sm_user_id_user_user_id_idx (user_id),
  KEY sm_pet_id_pets_pet_id_idx (pet_id),
  KEY sm_skill_id_skills_skill_id_idx (skill_id),
  CONSTRAINT sm_pet_id_pets_pet_id FOREIGN KEY (pet_id) REFERENCES pets (pet_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT sm_skill_id_skills_skill_id FOREIGN KEY (skill_id) REFERENCES skills (skill_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT sm_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE PetActivities (
  activity_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  pet_id int NOT NULL,
  task_id int NOT NULL,
  completion_date timestamp NULL DEFAULT NULL,
  PRIMARY KEY (activity_id),
  KEY pa_user_id_user_user_id_idx (user_id),
  KEY pa_pet_id_pets_pet_id_idx (pet_id),
  KEY pa_task_id_task_task_id_idx (task_id),
  CONSTRAINT pa_pet_id_pets_pet_id FOREIGN KEY (pet_id) REFERENCES pets (pet_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT pa_task_id_task_task_id FOREIGN KEY (task_id) REFERENCES task (task_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT pa_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO User VALUES (1,'Harry Potter', 'harry@gsm.ecoquest.org'),(2,'Annie Smithens','annie@gsm.ecoquest.org'),(3,'Peter Parker','peter@gsm.ecoquest.org'),(4,'Ash','ash@gsm.ecoquest.org'),(5,'Steve Rogers','steve@gsm.ecoquest.org');

INSERT INTO Task VALUES (1,'Plant a Tree','Plant a tree in your neighbourhood or a designated green area.',50),(2,'Use Public Transportation','Use public transportation or carpool instead of driving alone.',30),(3,'Reduce Plastic Usage','Commit to using reusable bags and containers.',40),(4,'Energy Conservation','Turn off lights and appliances when not in use.',25),(5,'Composting ','Start composting kitchen scraps to create natural fertilizer.',35);

INSERT INTO TaskProgress VALUES (1,1,2,'2023-11-20 00:00:00','Went to school by MRT'),(2,1,3,'2023-11-14 08:00:00','Brought a reusable bag to the convenience store'),(3,3,4,'2023-11-24 22:00:00','Open windows in daytime to get fresh air and brightness'),(4,2,5,'2023-11-03 10:00:00','Preserve Egg Scraps for fertilizer'),(5,5,1,'2023-11-18 01:00:00','Planted a small tomato plant');

INSERT INTO Shop (item_name, category, required_points) VALUES
  ('Reusable tote bag', 'Everyday Essentials', 5),
  ('Reusable water bottle', 'Everyday Essentials', 10),
  ('Reusable coffee cup', 'Everyday Essentials', 15),
  ('Reusable straws', 'Everyday Essentials', 5),
  ('Reusable food wraps', 'Food & Kitchen', 10),
  ('Reusable produce bags', 'Food & Kitchen', 5),
  ('Reusable cutlery set', 'Food & Kitchen', 20),
  ('LED lightbulbs', 'Energy & Home', 10),
  ('Energy-saving power strip', 'Energy & Home', 15),
  ('Low-flow showerhead', 'Energy & Home', 20),
  ('Smart thermostat', 'Energy & Home', 30),
  ('Solar-powered phone charger', 'Energy & Home', 40),
  ('Natural shampoo and conditioner bars', 'Personal Care', 15),
  ('Bamboo toothbrushes', 'Personal Care', 10),
  ('Compostable dental floss', 'Personal Care', 5),
  ('Reusable makeup remover pads', 'Personal Care', 10),
  ('Solid soap bars', 'Personal Care', 5),
  ('Organic cotton t-shirt', 'Sustainable Fashion', 40),
  ('Recycled polyester jacket', 'Sustainable Fashion', 50),
  ('Upcycled tote bag', 'Sustainable Fashion', 30),
  ('Ethically sourced jewelry', 'Sustainable Fashion', 60),
  ('Vegan leather belt', 'Sustainable Fashion', 40),
  ('Locally grown vegetables', 'Food & Health', 10),
  ('Package-free grains and beans', 'Food & Health', 5),
  ('Vegan snacks', 'Food & Health', 15),
  ('Plant-based milk', 'Food & Health', 20),
  ('Compost bin', 'Green Living', 30),
  ('Seed packets', 'Green Living', 10),
  ('Reusable notebook and pen', 'Green Living', 20),
  ('Donation to charity', 'Green Giving', 100),
  ('Cozy Cat Hammock', 'Pet', 15),
  ('Interactive Puzzle Toy', 'Pet', 20),
  ('Pet-Safe Paint Set', 'Pet', 30),
  ('Brain Games for Pets', 'Pet', 25),
  ('Pet Playdate Voucher', 'Pet', 40),
  ('Personalized Pet Portrait', 'Pet', 50),
  ('Homemade Treat Kit', 'Pet', 10),
  ('Adventure Backpack for Two', 'Pet', 60),
  ('Organic Catnip Mice', 'Pet', 5),
  ('Fish Feather Wand', 'Pet', 10),
  ('Squirrel Squeak Toy', 'Pet', 12),
  ('Interactive Laser Pointer', 'Pet', 15),
  ('Cozy Dog Bed', 'Pet', 20),
  ('Durable Chew Toy', 'Pet', 25),
  ('Scented Tug Rope', 'Pet', 30),
  ('Automatic Treat Dispenser', 'Pet', 40),
  ('Bird Nest Swing', 'Pet', 10),
  ('Foraging Food Puzzle', 'Pet', 15),
  ('Bird Seed Wreath', 'Pet', 20),
  ('Melodious Bird Feeder', 'Pet', 25),
  ('Cozy Hamster Cube', 'Pet', 10),
  ('Exercise Wheel Maze', 'Pet', 15),
  ('Tunnel System Playset', 'Pet', 20),
  ('Delicious Hamster Treats', 'Pet', 5);

  INSERT INTO Inventory VALUES (1,1,2, '2023-12-20 00:00:00'), (2,1,2, '2023-12-25 00:00:00'), (3,2,1, '2023-12-22 00:00:00'), (4,5,4, '2023-12-31 00:00:00');

  INSERT INTO Pets (pet_name, rarity, required_eco_points, description) VALUES
  ("Windwhisper", "Common", 125, "Playful breeze spirit, dancing on leaves and carrying forgotten melodies."),
  ("Stoneheart", "Common", 150, "Steadfast earth guardian, strong and silent, with moss in its fur."),
  ("Emberflare", "Common", 175, "Mischievous spark of fire, leaving trails of glowing dust and laughter."),
  ("Moonbeam", "Common", 200, "Luminous wisp of moonlight, bringing gentle dreams and shimmering hope."),
  ("Cloversprite", "Uncommon", 250, "Lucky companion, clover-marked fur radiating charm and finding treasures."),
  ("Whisperwind", "Uncommon", 350, "Swift messenger of the air, weaving through currents and secrets unseen."),
  ("Silverstream", "Uncommon", 375, "Graceful water spirit, leaving trails of sparkling drops and soothing melodies."),
  ("Mosswhisper", "Uncommon", 400, "Wise forest shaman, speaking through rustling leaves and offering prophecies."),
  ("Suncatcher", "Rare", 500, "Joyful sunbeam sprite, chasing warmth and igniting laughter wherever it flies."),
  ("Duskwing", "Rare", 550, "Mesmerizing twilight creature, cloaked in shadows and shimmering with stardust."),
  ("Whisperstorm", "Rare", 600, "Majestic wind spirit, riding gales and commanding the whispers of the world."),
  ("Everglow", "Rare", 650, "Radiant moonbeam, woven from stardust and illuminating paths through darkness."),
  ("Willowwisp", "Rare", 700, "Mystical protector of the forest, weaving spells of light and shadow."),
  ("Sunforge", "Legendary", 850, "Blazing spirit of fire, crafting wonders from stardust and leaving molten gold."),
  ("Moonstone Wyvern", "Legendary", 950, "Majestic dragon bathed in moonlight, scales shimmering with lunar magic."),
  ("Sylphsong", "Legendary", 1050, "Dazzling starsprite, weaving galaxies with melodies and bringing dreams to life."),
  ("Stardust Wyrm", "Legendary", 1200, "Celestial dragon adorned with constellations, breath echoing creation."),
  ("Dreamwalker", "Legendary", 1350, "Mystifying phantom, traversing forgotten realms and offering hidden wonders."),
  ("Everember Phoenix", "Legendary", 1500, "Blazing bird of endless rebirth, dispelling darkness and leaving hope.");  

  INSERT INTO Skills (pet_id, skill_name, skill_type, required_level, description) VALUES

  (1, "Seed Sprout", "Air", 1, "Gently scatters seeds from nearby plants, promoting natural regeneration."),
  (1, "Whisperwind Blast", "Air", 5, "Disperses airborne pollutants for cleaner air, leaving a sparkling breeze."),
  (1, "Leaf Symphony", "Air", 10, "Encourages pollinating insects with a musical harmony, increasing plant health."),
  (1, "Air Purifying Vortex", "Air", 15, "Creates a temporary vortex that filters dust and toxins from the surrounding area."),

  (2, "Erosion Barrier", "Earth", 1, "Stabilizes loose soil with sturdy roots, preventing soil erosion."),
  (2, "Rockfall Cleanup", "Earth", 5, "Clears paths clogged with debris, aiding in environmental restoration."),
  (2, "Earthwhisper Chant", "Earth", 10, "Promotes plant growth and soil health through resonant vibrations."),
  (2, "Stone Guardian Shield", "Earth", 15, "Creates a protective barrier of earth and rock, shielding vulnerable areas from natural disasters."),

  (3, "Sunlight Gather", "Fire", 1, "Captures a tiny spark of sunlight, converting it into usable energy for small devices."),
  (3, "Smoke Dance", "Fire", 5, "Neutralizes harmful smoke emissions from machinery or wildfires, leaving behind a refreshing scent."),
  (3, "Ash Seedling", "Fire", 10, "Transforms ash into fertile soil, promoting life in barren areas."),
  (3, "Solar Pulse", "Fire", 15, "Emits a burst of concentrated solar energy, powering nearby equipment or activating dormant seeds."),

  (4, "Dreamy Dewdrop", "Moonlight", 1, "Creates a delicate dewdrop imbued with moonlight, reviving wilting plants."),
  (4, "Luminescent Path", "Moonlight", 5, "Illuminates a path with soft moonlight, reducing reliance on artificial lighting."),
  (4, "Moonshadow Camouflage", "Moonlight", 10, "Cloaks pets and nearby creatures in shimmering moonlight, protecting them from harm."),
  (4, "Starlight Beacon", "Moonlight", 15, "Creates a beacon of concentrated moonlight, guiding lost animals and promoting nighttime navigation."),

  (5, "Lucky Finder", "Nature", 1, "Uses its charm to discover hidden caches of seeds or sustainable resources."),
  (5, "Sprout Burst", "Nature", 5, "Encourages abundant growth in nearby soil, creating a mini-garden of useful plants."),
  (5, "Rainbow Bridge", "Nature", 10, "Creates a shimmering bridge of light, guiding others towards eco-friendly solutions."),
  (5, "Clover Blossom Shield", "Nature", 15, "Protects vulnerable areas with a vibrant barrier of blooming clovers, absorbing pollutants and nurturing the land."),

  (6, "Silent Gust", "Air", 1, "Creates a gentle breeze that disperses dust and debris, keeping paths clean and air fresh."),
  (6, "Whirling Seed", "Air", 5, "Carries a seed on a whirlwind journey, finding the perfect spot for a new tree to sprout."),
  (6, "Cloud Song Serenade", "Air", 10, "Lulls clouds into releasing gentle rain, nourishing the land without waste."),
  (6, "Storm Whisperer", "Air", 15, "Calms turbulent winds and redirects stormy weather, protecting vulnerable areas from natural disasters."),

  (7, "Crystal Purify", "Water", 1, "Cleans stagnant water with a touch of shimmering essence, making it drinkable and vibrant."),
  (7, "Dancing Flow", "Water", 5, "Guides water streams away from erosion-prone areas, nourishing the land without harm."),
  (7, "Moonlight Mist", "Water", 10, "Creates a soothing mist that condenses into pure dew, reviving parched earth."),
  (7, "River Song Harmony", "Water", 15, "Restores balance to polluted waterways with a melodic tune, promoting healthy aquatic life."),

  (8, "Forest Balm", "Nature", 1, "Creates a healing salve from moss and leaves, mending injured plants and fostering growth."),
  (8, "Ancient Oak Shield", "Nature", 5, "Empowers nearby trees with ancient wisdom, strengthening them against damage and promoting healthy ecosystems."),
  (8, "Whispering Grove", "Nature", 10, "Lures lost animals back to safety with a mesmerizing dance of rustling leaves and whispering voices."),
  (8, "Living Bridge", "Nature", 15, "Grows sturdy vines and branches into a temporary bridge, allowing safe passage across natural obstacles."),

  (9, "Solar Spark", "Fire", 1, "Ignites a tiny flame that burns eternally, providing warmth and light without fuel."),
  (9, "Sunbeam Dance", "Fire", 5, "Guides sunlight beams to hidden shadows, maximizing solar energy for sustainable needs."),
  (9, "Rainbow Bloom", "Fire", 10, "Infuses a flower with rainbow energy, transforming it into a vibrant beacon of light and hope."),
  (9, "Living Lantern", "Fire", 15, "Creates a lantern from trapped sunlight, illuminating paths and spreading warmth without depleting resources."),

  (10, "Starlight Weaver", "Cosmic", 1, "Repairs damaged constellations with stardust gathered in the night, restoring balance to the sky."),
  (10, "Moonbeam Barrier", "Cosmic", 5, "Creates a shimmering shield of moonlight, protecting nocturnal creatures from harmful light pollution."),
  (10, "Lullaby of Shadows", "Cosmic", 10, "Soothes agitated animals with a calming melody born from the night, promoting peaceful coexistence."),
  (10, "Dreamcatcher Guardian", "Cosmic", 15, "Weaves a shimmering web of dreams that protects against nightmares and fosters peaceful slumber, even for restless creatures."),

  (11, "Wind Whisper", "Air", 1, "Speaks the language of winds, understanding weather patterns and predicting storms."),
  (11, "Gale Sculptor", "Air", 5, "Shapes gentle gusts into playful twisters, clearing debris and spreading seeds with playful energy."),
  (11, "Storm Surge", "Air", 10, "Channels wind energy into a protective barrier, shielding vulnerable areas from tempestuous weather."),
  (11, "Singing Cloud Symphony", "Air", 15, "Commands clouds to weave intricate formations, promoting air purification and regulating rainfall."),

  (12, "Moonlight Whisper", "Moonlight", 1, "Lulls restless creatures into serene slumber with a soft, moonlit glow."),
  (12, "Starbloom Garden", "Moonlight", 5, "Nurtures hidden seeds with moonlight essence, transforming barren spots into luminous flowerbeds."),
  (12, "Dream Weaver", "Moonlight", 10, "Creates shimmering dreamscapes, guiding lost souls back to reality and encouraging peaceful coexistence."),
  (12, "Celestial Beacon", "Moonlight", 15, "Projects a radiant starbeam, illuminating paths and offering hope in moments of darkness."),

  (13, "Forest Guardian's Dance", "Nature", 1, "Creates dancing illusions to distract predators and protect vulnerable creatures."),
  (13, "Vine Bridge Weaver", "Nature", 5, "Sprouts flexible vines into sturdy bridges, granting safe passage across hidden trails."),
  (13, "Whispering Grove Guardian", "Nature", 10, "Merges with the forest essence, becoming invisible and silent while guarding against threats."),
  (13, "Springtime Blossom", "Nature", 15, "Awakens dormant trees and flowers with a touch of vibrant magic, rejuvenating the forest after harsh winters."),

  (14, "Sunlight Weaver", "Fire", 1, "Manipulates sunlight into playful sparks, igniting small campfires or activating dormant technology."),
  (14, "Molten Bloom", "Fire", 5, "Transforms barren rock into fertile soil with bursts of molten energy, promoting new life in desolate areas."),
  (14, "Solstice Spark", "Fire", 10, "Channels the sun's power into a focused beam, driving away darkness and purifying polluted areas."),
  (14, "Living Forge", "Fire", 15, "Creates a temporary forge from molten sand and sunlight, allowing sustainable crafting and repairs."),

  (15, "Lunar Tidal Song", "Water", 1, "Calms choppy waters with soothing moonlight melodies, ensuring safe passage across moonlit seas."),
  (15, "Stardust Shimmer", "Water", 5, "Creates protective scales of shimmering stardust, deflecting harmful projectiles and shielding allies."),
  (15, "Dreamflight Navigation", "Water", 10, "Guides through treacherous landscapes by interpreting constellations and celestial patterns."),
  (15, "Lunar Cascade", "Water", 15, "Summons a cleansing waterfall of moonlight, purifying polluted waterways and invigorating dormant life."),

  (16, "Melody of Creation", "Nature", 1, "Encourages new life with sweet musical notes, promoting the growth of diverse plants and flowers."),
  (16, "Stardust Duststorm", "Nature", 5, "Creates a swirling vortex of stardust, mending damaged ecosystems and restoring balance to nature."),
  (16, "Lullaby of the Cosmos", "Nature", 10, "Soothes enraged creatures with a celestial symphony, calming storms and bringing peace to agitated souls."),
  (16, "Dream Weaver's Galaxy", "Nature", 15, "Paints constellations onto the night sky, inspiring wonder and reminding others of the interconnectedness of all life."),

  (17, "Cosmic Weaver", "Cosmic", 1, "Repairs minor tears in the fabric of reality, strengthening the boundaries between realms."),
  (17, "Asteroid Rain Shower", "Cosmic", 5, "Summons harmless showers of stardust that nourish the land with celestial minerals."),
  (17, "Meteor Guardian", "Cosmic", 10, "Creates a celestial shield from falling stars, protecting vulnerable areas from cosmic debris."),
  (17, "Stardust Seed", "Cosmic", 15, "Plants a luminous seed that grows into a magnificent tree filled with constellations, a beacon of hope and resilience."),

  (18, "Hidden Path Finder", "Dream", 1, "Senses and reveals hidden pathways through forgotten realms, leading to forgotten wisdom and treasures."),
  (18, "Lullaby of Lost Memories", "Dream", 5, "Soothes restless spirits with dream whispers, helping them find peace and move on."),
  (18, "Whispering Glade", "Dream", 10, "Transforms a hostile area into a serene haven, fostering peace and understanding between creatures."),
  (18, "Dream Bridge Architect", "Dream", 15, "Constructs shimmering bridges across the dream world, connecting individuals and unlocking forgotten knowledge."),

  (19, "Spark of Renewal", "Fire", 1, "Ignites withered plants with a tiny ember, encouraging new growth and revitalizing barren lands."),
  (19, "Cinder Bloom", "Fire", 5, "Transforms ash into vibrant flowers, symbolizing beauty born from destruction and fostering sustainable life-cycles."),
  (19, "Solar Blaze Wings", "Fire", 10, "Enhances flight with blazing wings, leaving a trail of rejuvenating embers and dispersing pollutants."),
  (19, "Phoenix Rebirth", "Fire", 15, "Consumes itself in a dazzling inferno, only to rise anew with renewed strength and wisdom, offering hope and resilience in times of darkness.");
`;

pool.query(MYSQLSTATEMENT, (error, results) => {
  try {
    if (error) {
      console.log(error);
    } else {
      console.log("Tables created successfully: ", results);
    }
    process.exit();
  } catch (error) {
    console.log("Error" + error);
  }
});
