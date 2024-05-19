# Gamified Sustainiability Movement

## Embark on an eco-adventure with your digital pets!

In this sustainable game, you'll team up with your very own pet to make a difference in the world.

Complete eco-friendly tasks, earn points, and shop sustainable as you journey together.

Choose from adorable and unique pets with points earned, each with special abilities and rarities.

Train your pet with valuable skills, level up, and become the ultimate sustainability duo!

## Here's what awaits you

- Complete sustainable tasks
- Collect Points
- Shop for Green Items
- Befriend Fascinating Pets
- Level Up & Master Useful Skills

## Setup

1. First, run **npm run init_tables** on the terminal, or paste contents of **ca1gsm_db.sql** file onto MySQL WorkBench to initiate database.

2. Run **npm run dev** for nodemon, or **npm start** for node to start server.

3. Open Postman to test APIs. Refer to [Postman Tutorial](https://www.guru99.com/postman-tutorial.html) by [_Guru99_](https://www.guru99.com/) on using Postman.

## How to Play

- Register your name and email to start playing.

  - Refer to **POST /users** for [Registration](#endpoints).
  - Refer to **PUT /users/{user_id}** to [Modify Username, Email](#endpoints).
  - Refer to **GET /users** to check [Other Players](#endpoints).

- Check tasks available and points.

  - Refer to **GET /tasks** to choose [Task to Complete](#endpoints-1).
  - Refer to **GET /tasks/{task_id}** to choose [Specific Task to Complete](#endpoints-1).

- Complete tasks to get points.

  - Refer to **POST /task_progress** to [Complete Tasks](#endpoints-2).
  - Refer to **PUT /task_progress/{progress_id}** to [Update Notes](#endpoints-2) for completed task.

- Create Challenging tasks for game

  - Refer to **POST /tasks** to [Create Challenge](#endpoints-1).
  - Refer to **PUT /tasks/{task_id}** to [Update Challenge](#endpoints-1).
  - Refer to **DELETE /tasks/{task_id}** to [Delete Task](#endpoints-1).

- Check tasks completed by an indiviual user.

  - Refer to **GET /task_progress/{progress_id}** to check [Completed Tasks](#endpoints-2).
  - Refer to **GET /users/{user_id}** for [Points Earned](#endpoints). Note that total_points will be deducted if there are bought items inside user's inventory.
  - Refer to **DELETE /task_progress/{progress_id}** to [Remove Completed Task](#endpoints-2).

- Check items available in shop.

  - Refer to **GET /shop/items** to check [Available Items](#endpoints-3).
  - Refer to **GET /shop/items/{category}** to check [Available Items By Category](#endpoints-3).

- Buy items and put to inventory

  - Refer to **POST /inventory** to [Buy Item](#endpoints-4) from shop.

- Check items in user's inventory

  - Refer to **GET /inventory/{user_id}** to check [User's Inventory](#endpoints-4).
  - Refer to **GET /inventory/{user_id}/{category}** to check [User's Inventory By Category](#endpoints-4).
  - Refer to **DELETE /inventory/:inventory_id** to [Remove Item](#endpoints-4) from user's inventory.

- Check pets to adventure together.

  - Refer to **GET /pets** to check [Available Pets](#endpoints-5).
  - Refer to **GET /pets/{rarity}** to check [Available Pets by Rarity](#endpoints-5).

- Check skills available for each pet.

  - Refer to **GET /skills** to check [Pets' Skills](#endpoints-6).
  - Refer to **GET /skills/{pet_id}** to check [Specific Pet's Skills](#endpoints-6).

- Befriend pets based on total points by completing tasks.

  - Refer to **POST /pet_bonds** to [Befriend Pets](#endpoints-7).
  - Refer to **GET /pet_bonds/{user_id}** to check [User's Pets](#endpoints-7) and their attributes: exp, level, equipped skill.
  - Refer to **GET /pet_bonds** to check [Other Users' Pets](#endpoints-7) and their attributes: exp, levels, equipped skills.
  - Refer to **DELETE /pet_bonds/{bond_id}** to [Release Pet](#endpoints-7).

- Complete activities to earn EXP, level up and learn new skills.

  - Refer to **POST /pet_activities** to [Complete Pet Tasks](#endpoints-8).
  - Refer to **GET /pet_activities/{user_id}/{pet_id}** to check [User's Pet Activities](#endpoints-8).
  - Refer to **GET /pet_activities** to check [All Users' Pet Activities](#endpoints-8).

- Learn new skills for pets.

  - Refer to **POST /skills_mastered** to [Learn Skills](#endpoints-9).
  - Refer to **GET /skills_mastered/{user_id}/{pet_id}** to check [Pet's Learnt Skills](#endpoints-9).
  - Refer to **GET /skills_mastered** to check [All Pets' Learnt Skills](#endpoints-9).

- Equip one learnt skill as main skill for pets.

  - Refer to **PUT /pet_bonds** to [Equip Main Skill](#endpoints-7).

- Delete/Log Out Game.

  - Refer to **DELETE /users/{user_id}** to [Log Out](#endpoints).

## Database Tables

### 1. User

List of users registered for the game.

| user_id |     user_name     |         email          |
| :-----: | :---------------: | :--------------------: |
|    1    | Reusable tote bag | harry@gsm.ecoquest.org |

**MYSQL Syntax**

```SQL
CREATE TABLE User (
    user_id int NOT NULL AUTO_INCREMENT,
    username text,
    email text,
    PRIMARY KEY (user_id)
);
```

### Endpoints

**1. GET /users/{user_id}**

Retrieve user's information by user_id.

**Example Response HTTP Status Code**

`Status: 200 OK`

**2. GET /users**

Retrieve all users' information.

**Example Response HTTP Status Code**

`Status: 200 OK`

**3. POST /users**

Register user's information (username and email) for the game.

**Example Response HTTP Status Code**

`Status: 201 Created`

**Error Handling**

If the provided email is already associated with another user, return _Status: 409 Conflict_ error.

If the request body is missing username or email, return _Status: 400 Bad Request_ error.

**4. PUT /users/{user_id}**

Update user details (username, email) by providing user_id.

**Example Response HTTP Status Code**

`Status: 200 OK`

**Error Handling**

If the requested user_id does not exist, return _Status: 404 Not Found_.

If the provided username or email is already associated with another user, return _Status: 409 Conflict_.

**5. DELETE /users/{user_id}**

Delete user's all related information by providing user_id in the URL.

The tasks completed by both user and pets, the items bought, pets owned, activities and skills completed by pets will all be gone together with it.

**Example Response HTTP Status Code**

`Status: 204 No Content`

**Error Handling**

If the requested user_id does not exist, return _Status: 404 Not Found_ error.

### 2. Task

List of eco-friendly tasks where users will need to complete to unlock pets and items.

| task_id |    title     | description                                                    | points |
| :-----: | :----------: | :------------------------------------------------------------- | :----: |
|    1    | Plant a Tree | Plant a tree in your neighbourhood or a designated green area. |   50   |

**MYSQL Syntax**

```SQL
CREATE TABLE Task (
    task_id int NOT NULL AUTO_INCREMENT,
    title text,
    description text,
    points int DEFAULT NULL,
    PRIMARY KEY (task_id)
);
```

### Endpoints

**1. GET /tasks/{task_id}**

Retrieve details of a specific task by providing its task_id.

The response should include title, description, and points.

**Example Response HTTP Status Code**

`Status: 200 OK`

**Error Handling**

If the requested task_id does not exist, return _Status: 404 Not Found_ error.

**2. GET /tasks**

Retrieve a list of all tasks with their respective task_id, title, description, and points.

**Example Response HTTP Status Code**

`Status: 200 OK`

**3. POST /tasks**

Create a new task by providing title, description, and points in the request body.

Upon successful creation, the response should include the newly generated task_id.

**Example Response HTTP Status Code**

`Status: 201 Created`

**Error Handling**

If the request body is missing title or description or points, return _Status: 400 Bad Request_ error.

**4. PUT /tasks/{task_id}**

Update task details by providing task_id in the URL and updating title, description, or points in the request body.

**Example Response HTTP Status Code**

`Status: 200 OK`

**Error Handling**

If the requested task_id does not exist, return 404 Not Found.

If the request body is missing title or description or points, return _Status: 400 Bad Request_ error.

**5. DELETE /tasks/{task_id}**

Delete a task by providing its task_id.

The task's associated task progress, if any, should also be deleted.

**Example Response HTTP Status Code**

`Status: 204 No Content`

**Error Handling**

If the requested task_id does not exist, return _Status: 404 Not Found_ error.

### 3. TaskProgress

Lists of tasks completed by each of the user and the completed time of the task.

Users can also take notes realted to the task completed.

| progress_id | user_id | task_id |   completion_date   | notes                 |
| :---------: | :-----: | :-----: | :-----------------: | :-------------------- |
|      1      |    1    |    2    | 2023-11-20 00:00:00 | Went to school by MRT |

**MYSQL Syntax**

```SQL
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
```

### Endpoints

**1. GET /task_progress/{progress_id}**

Retrieve details of a specific task progress by providing its progress_id.

The response should include user_id, task_id, completion_date, and notes.

**Example Response HTTP Status Code**

`Status: 200 OK`

**Error Handling**

If the requested progress_id does not exist, return _Status: 404 Not Found_ error.

**2. POST /task_progress**

Create task progress for a user (marking a task as completed) by providing user_id, task_id, completion_date, and optional notes in the request body.

**Example Response HTTP Status Code**

`Status: 201 Created`

**Error Handling**

If the requested user_id or task_id does not exist, return _Status: 404 Not Found_ error.

If the request body is missing completion_date, return _Status: 400 Bad Request_ error.

**3. PUT /task_progress/{progress_id}**

Update task progress details (notes) by providing progress_id in the URL and notes in the request body.

**Example Response HTTP Status Code**

`Status: 200 OK`

**Error Handling**

If the requested progress_id does not exist, return _Status: 404 Not Found_ error.

If the request body is missing notes, return _Status: 400 Bad Request_ error.

**4. DELETE/task_progress/{progress_id}**

Delete task progress by providing its progress_id.

The task progress should be removed from the database.

**Example Response HTTP Status Code**

`Status: 204 No Content`

**Error Handling**

If the requested progress_id does not exist, return _Status: 404 Not Found_ error.

### 4. Shop

A shop where players can purchase green and sustainable items with points obtained from completing tasks from the task table.

| item_id |     item_name     |      category       | required_points |
| :-----: | :---------------: | :-----------------: | :-------------: |
|    1    | Reusable tote bag | Everyday Essentials |        5        |

**MYSQL Syntax**

```SQL
CREATE TABLE Shop (
  item_id int NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(255),
  category VARCHAR(255),
  required_points int DEFAULT NULL,
  PRIMARY KEY (item_id)
);
```

### Endpoints

**1. GET /shop/items/{category}**

Retrieve a list of items for a given category.

**Example Response**

`Status: 200 OK`

```json
[
  {
    "item_id": 1,
    "item_name": "Reusable tote bag",
    "category": "Everyday Essentials",
    "required_points": 5
  },
  {
    "item_id": 2,
    "item_name": "Reusable water bottle",
    "category": "Everyday Essentials",
    "required_points": 10
  }
]
```

**Error Handling**

If provided category is invalid, return _Status: 404 Not Found_ error.

**2. GET /shop/items**

Retrieve a list of all items from shop.

**Example Response**

`Status: 200 OK`

```json
[
  {
    "item_id": 1,
    "item_name": "Reusable tote bag",
    "category": "Everyday Essentials",
    "required_points": 5
  },
  {
    "item_id": 2,
    "item_name": "Reusable water bottle",
    "category": "Everyday Essentials",
    "required_points": 10
  },
  {
    "item_id": 3,
    "item_name": "Reusable coffee cup",
    "category": "Everyday Essentials",
    "required_points": 15
  },
  {
    "item_id": 4,
    "item_name": "Reusable straws",
    "category": "Everyday Essentials",
    "required_points": 5
  },
  {
    "item_id": 5,
    "item_name": "Reusable food wraps",
    "category": "Food & Kitchen",
    "required_points": 10
  },
  {
    "item_id": 6,
    "item_name": "Reusable produce bags",
    "category": "Food & Kitchen",
    "required_points": 5
  }
]
```

### 5. Inventory

An inventory where users' all bought items are stored.

| inventory_id | user_id | item_id |     bought_date     |
| :----------: | :-----: | :-----: | :-----------------: |
|      1       |    1    |    2    | 2023-12-20 00:00:00 |

**MYSQL Syntax**

```SQL
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
```

### Endpoints

**1. GET /inventory/{user_id}/{category}**

Retrieve a list of items from inventory by providing user_id and category in the URL.

**Example Response:**

`Status: 200 OK`

```json
[
  {
    "inventory_id": 1,
    "user_id": 1,
    "item_id": 2,
    "item_name": "Reusable water bottle",
    "category": "Everyday Essentials",
    "bought_date": "2023-12-20"
  },
  {
    "inventory_id": 2,
    "user_id": 1,
    "item_id": 2,
    "item_name": "Reusable water bottle",
    "category": "Everyday Essentials",
    "bought_date": "2023-12-25"
  }
]
```

**Error Handling**

If provided user_id or category is invalid, return _Status: 404 Not Found_ error.

**2. GET /inventory/{user_id}**

Retrieve a list of items from inventory by providing user_id in the URL.

**Example Response:**

`Status: 200 OK`

```json
[
  {
    "inventory_id": 1,
    "user_id": 1,
    "item_id": 2,
    "item_name": "Reusable water bottle",
    "category": "Everyday Essentials",
    "bought_date": "2023-12-20"
  },
  {
    "inventory_id": 2,
    "user_id": 1,
    "item_id": 2,
    "item_name": "Reusable water bottle",
    "category": "Everyday Essentials",
    "bought_date": "2023-12-25"
  }
]
```

**Error Handling**

If provided user_id is invalid, return _Status: 404 Not Found_ error.

**3. POST /inventory**

Purchase items from shop with points obtained by completing tasks.

**Example Request:**

```json
{
  "user_id": 1,
  "item_id": 3
}
```

**Example Response:**

`Status: 201 Created`

```json
{
  "Message": "Item Purchased Successfully",
  "points_left": 135,
  "user_id": 1,
  "item_id": 3,
  "item_name": "Reusable coffee cup",
  "category": "Everyday Essentials",
  "item_cost": 15
}
```

**Error Handling**

If provided user_id or item_id is invalid, return _Status: 404 Not Found_ error.

**4. DELETE /inventory/{inventory_id}**

Discard item bought by user by providing an inventory_id in the URL.

**Example Response**

`Status: 204 No Content`

**Error Handling**

If provided inventory_id is invalid, return _Status: 404 Not Found_ error.

### 6. Pets

List of all pets with their name, rarity, points needed to _exchange_ pets, and description.

| pet_id |  pet_name   | rarity | required_eco_points | description                                                               |
| :----: | :---------: | :----: | :-----------------: | :------------------------------------------------------------------------ |
|   1    | Windwhisper | Common |         125         | Playful breeze spirit, dancing on leaves and carrying forgotten melodies. |

**MYSQL Syntax**

```SQL
CREATE TABLE Pets (
  pet_id int NOT NULL AUTO_INCREMENT,
  pet_name VARCHAR(100),
  rarity VARCHAR(20),
  required_eco_points int DEFAULT NULL,
  description VARCHAR(255),
  PRIMARY KEY (pet_id)
);
```

### Endpoints

**1. GET /pets/{rarity}**

Retrieve a list of pets by providing rarity in the URL.

**Example Response:**

`Status: 200 OK`

```json
[
  {
    "pet_id": 14,
    "pet_name": "Sunforge",
    "rarity": "Legendary",
    "required_eco_points": 850,
    "description": "Blazing spirit of fire, crafting wonders from stardust and leaving molten gold."
  },
  {
    "pet_id": 15,
    "pet_name": "Moonstone Wyvern",
    "rarity": "Legendary",
    "required_eco_points": 950,
    "description": "Majestic dragon bathed in moonlight, scales shimmering with lunar magic."
  },
  {
    "pet_id": 16,
    "pet_name": "Sylphsong",
    "rarity": "Legendary",
    "required_eco_points": 1050,
    "description": "Dazzling starsprite, weaving galaxies with melodies and bringing dreams to life."
  }
]
```

**Error Handling**

If the provided rarity is invalid, return _Status: 404 Not Found_ error.

**2. GET /pets**

Retrieve a list of all pets.

**Example Response:**

`Status: 200 OK`

```json
[
  {
    "pet_id": 1,
    "pet_name": "Windwhisper",
    "rarity": "Common",
    "required_eco_points": 125,
    "description": "Playful breeze spirit, dancing on leaves and carrying forgotten melodies."
  },
  {
    "pet_id": 2,
    "pet_name": "Stoneheart",
    "rarity": "Common",
    "required_eco_points": 150,
    "description": "Steadfast earth guardian, strong and silent, with moss in its fur."
  }
]
```

### 7. Skills

List of all skills for pets.

Each pet has its own distinct set of skills, meaning they can only master the abilities specifically designated for them.

However, each pet's unique abilities can only be fully unlocked upon achieving a particular level of experience.

| skill_id | pet_id | skill_name  | skill_type | required_level | description                                                               |
| :------: | :----: | :---------: | :--------: | :------------: | :------------------------------------------------------------------------ |
|    1     |   1    | Seed Sprout |    Air     |       1        | Gently scatters seeds from nearby plants, promoting natural regeneration. |

### Endpoints

**1. GET /skills/{pet_id}**

Retrieve all learnable skills for a specific pet by providing pet_id in the URL.

**Example Response**

`Status: 200 OK`

```json
[
  {
    "skill_id": 1,
    "pet_id": 1,
    "skill_name": "Seed Sprout",
    "skill_type": "Air",
    "required_level": 1,
    "description": "Gently scatters seeds from nearby plants, promoting natural regeneration."
  },
  {
    "skill_id": 2,
    "pet_id": 1,
    "skill_name": "Whisperwind Blast",
    "skill_type": "Air",
    "required_level": 5,
    "description": "Disperses airborne pollutants for cleaner air, leaving a sparkling breeze."
  }
]
```

**Error Handling**

If provided pet_id is invalid, return _404 Not Found_ error.

**2. GET /skills**

Retrieve learnable skills for all pets.

**Example Response**

`Status: 200 OK`

```json
[
  {
    "skill_id": 1,
    "pet_id": 1,
    "skill_name": "Seed Sprout",
    "skill_type": "Air",
    "required_level": 1,
    "description": "Gently scatters seeds from nearby plants, promoting natural regeneration."
  },
  {
    "skill_id": 2,
    "pet_id": 1,
    "skill_name": "Whisperwind Blast",
    "skill_type": "Air",
    "required_level": 5,
    "description": "Disperses airborne pollutants for cleaner air, leaving a sparkling breeze."
  }
]
```

### 8. PetBonds

Befriend pets with all points obtained from completing tasks, total_eco_points.

Befriending pets requires completing tasks and reaching specific point(required_eco_points) thresholds, unlike item purchases which directly deduct points.

Friendship is earned, not bought! Point earned from tasks unlock pet bonds, not act as currency.

However, player can only exchange one pet of the same kind.

| bond_id | user_id | pet_id | exp | level | next_lv_points | skill_id |
| :-----: | :-----: | :----: | :-: | :---: | :------------: | :------: |
|    1    |    1    |   1    |  0  |   1   |      100       |   null   |

**MYSQL Syntax**

```SQL
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
```

### Endpoints

**1. POST /pet_bonds/**

Register pets to embark on green adventures.

**Example Request Body**

```json
{
  "user_id": 1,
  "pet_id": 2
}
```

**Example Response**

`Status: 201 Created`

```json
{
  "message": "Pet Exchanged Successfully",
  "total_eco_points": 170,
  "user_id": 1,
  "pet_id": 2,
  "pet_name": "Stoneheart",
  "rarity": "Common",
  "required_eco_points": 150,
  "description": "Steadfast earth guardian, strong and silent, with moss in its fur."
}
```

**Error Handling**

If provided user_id or pet_id is invalid, return _Status: 404 Not Found_ error.

If user has insufficient points to befriend pet, return _Status: 406 Not Acceptable_ error.

If user has already owned pet of same kind, return _Status: 409 Conflict_ error.

**2. GET /pet_bonds/{user_id}**

Retrieve all pet attributes and owner information from database by providing user_id in the URL.

If pet has not equipped any skills yet, "Skill Unequipped" will be shown.

**Example Response**

`Status: 200 OK`

```json
[
  {
    "bond_id": 1,
    "user_id": 1,
    "username": "Harry Potter",
    "pet_id": 1,
    "pet_name": "Windwhisper",
    "equipped_skill_id": 1,
    "equipped_skill_name": "Seed Sprout",
    "exp": 0,
    "level": 1
  },
  {
    "bond_id": 2,
    "user_id": 1,
    "username": "Harry Potter",
    "pet_id": 2,
    "pet_name": "Stoneheart",
    "equipped_skill_id": "Skill Unequipped",
    "equipped_skill_name": "Skill Unequipped",
    "exp": 0,
    "level": 1
  }
]
```

**Error Handling**

If the user has not yet befriended any pets, no data in the database, return _Status: 404 Not Found_ error.

If provided user_id is invalid, return _Status: 404 Not Found_ error.

**3. GET /pet_bonds**

Retrieve all pet attributes and owner information from the database.

**Example Response**

`Status: 200 OK`

```json
[
  {
    "bond_id": 1,
    "user_id": 1,
    "username": "Harry Potter",
    "pet_id": 1,
    "pet_name": "Windwhisper",
    "equipped_skill_id": 1,
    "equipped_skill_name": "Seed Sprout",
    "exp": 0,
    "level": 1
  },
  {
    "bond_id": 2,
    "user_id": 1,
    "username": "Harry Potter",
    "pet_id": 2,
    "pet_name": "Stoneheart",
    "equipped_skill_id": "Skill Unequipped",
    "equipped_skill_name": "Skill Unequipped",
    "exp": 0,
    "level": 1
  }
]
```

**Error Handling**

If users have not yet befriended any pets, no data in the database, return _Status: 404 Not Found_ error.

**4. PUT /pet_bonds**

Once pets have learnt at least one skill, they can update it as main mastered skill.

**Example Request Body**

```json
{
  "user_id": 1,
  "pet_id": 2,
  "skill_id": 5
}
```

**Example Response**

`Status: 200 OK`

```json
{
  "message": "Skill Equipped Successfully",
  "user_id": 1,
  "pet_id": 2,
  "skill_id": 5
}
```

**Error Handling**

If users have not yet befriended any pets, no data in the database, return _Status: 404 Not Found_ error.

If provided user_id, pet_id or skill_id is invalid, return _Status: 404 Not Found_ error.

If pet does not belong to user, return _Status: 404 Not Found_ error.

If skill does not belong to pet, return _Status: 404 Not Found_ error.

If pets have not learnt any skills yet, return _Status: 406 Not Acceptable_ error.

**4. DELETE /pet_bonds/{bond_id}**

Release pet. Associated learnt skills and activities completed by user's pet will be all gone after release.

Provide bond_id in the URL to delete/release pet.

**Example Response**

`Status: 204 No Content`

**Error Handling**

If provided bond_id is invalid, return _Status: 404 Not Found_ error.

### 9. PetActivities

Register green activities completed by pets.

Obtain EXP and level up by completing challenging tasks.

| activity_id | user_id | pet_id | task_id |   completion_date   |
| :---------: | :-----: | :----: | :-----: | :-----------------: |
|      1      |    1    |   1    |    1    | 2023-12-27 01:34:20 |

**MYSQL Syntax**

```SQL
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
```

### Endpoints

**1. POST /pet_activities**

Mark the activity completed by pet.
Get EXP, level up and learn new skills.

**Example Request Body**

```json
{
  "user_id": 1,
  "pet_id": 1,
  "task_id": 1
}
```

**Example Response**

`Status: 201 Created`

```json
{
  "activity_id": 1,
  "user_id": 1,
  "pet_id": 1,
  "task_id": 1,
  "exp_obtained": 50
}
```

**Error Handling**

If user_id or pet_id or task_id is invalid, return _Status: 404 Not Found_ error

If pet does not belong to user, return _Status 404 Not Found_ error

**2. GET /pet_activities**

Retrieve a list of activities completed by users' pets.

**Example Response**

`Status: 200 OK`

```json
[
  {
    "activity_id": 1,
    "user_id": 1,
    "pet_id": 1,
    "task_id": 1,
    "completion_date": "2023-12-27"
  },
  {
    "activity_id": 2,
    "user_id": 1,
    "pet_id": 2,
    "task_id": 1,
    "completion_date": "2023-12-27"
  }
]
```

**Error Handling**

If pets have not completed any activities, no data in database, return _Status: 404 Not Found_ error

**3. GET /pet_activities/{user_id}/{pet_id}**

Retrieve all tasks completed by pets by providing user_id and pet_id in the URL.

**Example Response**

`Status: 200 OK`

```json
{
  "activity_id": 1,
  "user_id": 1,
  "pet_id": 1,
  "task_id": 1,
  "title": " Plant a Tree",
  "completion_date": "2023-12-27"
}
```

**Error Handling**

If pets have not completed any activities, no data in database, return _Status: 404 Not Found_ error

If user_id or pet_id is invalid, return _Status: 404 Not Found_ error

If pet does not belong to user, return _Status: 404 Not Found_ error

### 10. SkillsMastered

Register skills learnt by users' pets.

| mastered_skill_id | user_id | pet_id | skill_id |
| :---------------: | :-----: | :----: | :------: |
|         1         |    1    |   1    |    1     |

**MYSQL Syntax**

```SQL
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
```

### Endpoints

**1. POST /skills_mastered**

Unlock new skills to combact sustainability

**Example Request Body**

```json
{
  "user_id": 1,
  "pet_id": 2,
  "skill_id": 5
}
```

**Example Response**

`Status: 201 Created`

```json
{
  "Message": "Skill Learnt Successfully",
  "user_id": 1,
  "skill_id": 5,
  "pet_id": 2,
  "skill_name": "Erosion Barrier",
  "skill_type": "Earth",
  "required_level": 1,
  "description": "Stabilizes loose soil with sturdy roots, preventing soil erosion."
}
```

**Error Handling**

If user_id, pet_id or skill_id is invalid, return _Status: 404 Not Found_ error

If pet does not belong to user, return _Status: 404 Not Found_ error

If pet does not belong to user, return _Status: 404 Not Found_ error

If skill does not belong to pet, return _Status: 404 Not Found_ error

If pet has not reached the required level, return _Status: 406 Not Acceptable_ error

If pet has already leant the provided skill, return _Status: 406 Not Acceptable_ error

**2. GET /skills_mastered**

Retrieve all mastered skills by users' pets.

**Example Response**

```json
[
  {
    "mastered_skill_id": 1,
    "user_id": 1,
    "pet_id": 1,
    "skill_id": 1,
    "skill_name": "Seed Sprout"
  },
  {
    "mastered_skill_id": 2,
    "user_id": 1,
    "pet_id": 2,
    "skill_id": 5,
    "skill_name": "Erosion Barrier"
  }
]
```

**Error Handling**

If no skills were mastered by users' pets, no data in database, return _Status: 404 Not Found_ error

**3. GET /skills_mastered/{user_id}/{pet_id}**

Retrieve skills mastered by user's pet(s) by providing user_id and pet_id in the URL.

**Example Response**

`Status: 200 OK`

```json
{
  "mastered_skill_id": 1,
  "user_id": 1,
  "pet_id": 1,
  "skill_id": 1,
  "skill_name": "Seed Sprout"
}
```

**Error Handling**

If no skills were mastered by user's pet, no data in database, return _Status: 404 Not Found_ error

If user_id or pet_id is invalid, return _Status: 404 Not Found_ error

If pet does not belong to user, return _Status: 404 Not Found_ error
