/** constants */
const MAP_LENGTH = 500;
const INITIAL_RADIUS = 20;
const MAX_PLAYER_SIZE = 200;
const FOOD_SIZE = 2;
const EDIBLE_RANGE_RATIO = 0.9;
const EDIBLE_SIZE_RATIO = 0.9;
const colors = ["red", "blue", "green", "yellow", "purple", "orange", "silver"]; // colors to use for players

/** Utils! */

/** Helper to generate a random integer */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

/** Helper to generate a random position on the map */
const getRandomPosition = () => {
  return {
    x: getRandomInt(0, MAP_LENGTH),
    y: getRandomInt(0, MAP_LENGTH),
  };
};

let playersEaten = []; // A list of ids of any players that have just been eaten!

// TODO (Step 5.1): Fill out the following playerAttemptEat function for player1 attempting to eat player 2.

/** Helper to compute when player 1 tries to eat player 2 */
const playerAttemptEat = (pid1, pid2) => {
  // TODO (Step 5.1): We can get the players by using gameState.players and indexing by pid1 and pid2 as keys.
  //    Each player has a position property, which has an x and y property.
  //    We want to compute the Euclidean distance between the players' positions using the distance formula.
  //    In order for player1 to eat, we need to check that this distance is less than player1's radius.
  //    We must also check that player1's radius is bigger than player2's radius.
  //    If we pass both of these checks, we should add player2's radius to player1's radius.
  //    Instead of removing player2 immediately, we will just push player2's id to the playersEaten array
  //    for now, and we will formally delete it delete later.
  // Your code here (Step 5.1)
};

/** Attempts all pairwise eating between players */
const computePlayerEats = () => {
  if (Object.keys(gameState.players).length >= 2) {
    Object.keys(gameState.players).forEach((pid1) => {
      Object.keys(gameState.players).forEach((pid2) => {
        // TODO (Step 5.2): call playerAttemptEat helper function (1 line)
      });
    });
  }
  // Remove players who have been eaten
  playersEaten.forEach((playerid) => {
    // TODO (Step 5.3): call removePlayer on each player that has been eaten (1 line)
    // Note that the playerAttemptEat helper function stores all eaten players in playersEaten
  });
  playersEaten = []; // Reset players that have just been eaten
};

/** Helper to check a player eating a piece of food */
const playerAttemptEatFood = (pid1, f) => {
  const player1Position = gameState.players[pid1].position;
  const foodPosition = f.position;
  const x1 = player1Position.x;
  const y1 = player1Position.y;
  const x2 = foodPosition.x;
  const y2 = foodPosition.y;
  const dist = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  if (dist < gameState.players[pid1].radius - FOOD_SIZE) {
    // food is within player 1's eat range
    if (gameState.players[pid1].radius > FOOD_SIZE) {
      // player 1 is big enough to eat food
      gameState.players[pid1].radius += FOOD_SIZE;
      removeFood(f);
    }
  }
};

/** Attempts all pairwise eating between each player and all foods */
const computePlayerEatsFood = () => {
  Object.keys(gameState.players).forEach((pid1) => {
    gameState.food.forEach((f) => {
      playerAttemptEatFood(pid1, f);
    });
  });
};

/** Game state */
const gameState = {
  winner: null,
  players: {},
  food: [],
};

/** Game logic */

/** Adds a player to the game state, initialized with a random location */
const spawnPlayer = (id) => {
  gameState.players[id] = {
    position: getRandomPosition(),
    radius: INITIAL_RADIUS,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
};

/** Adds a food to the game state, initialized with a random location */
const spawnFood = () => {
  gameState.food.push({
    position: getRandomPosition(),
    radius: FOOD_SIZE,
    color: colors[Math.floor(Math.random() * colors.length)],
  });
};

/** Moves a player based off the sent data from the "move" socket msg */
const movePlayer = (id, dir) => {
  // If player doesn't exist, don't move anything
  if (gameState.players[id] == undefined) {
    return;
  }

  // Move player (unbounded)
  if (dir === "up") {
    gameState.players[id].position.y += 10;
  } else if (dir === "down") {
    gameState.players[id].position.y -= 10;
  } else if (dir === "left") {
    gameState.players[id].position.x -= 10;
  } else if (dir === "right") {
    gameState.players[id].position.x += 10;
  }
};

/** Spawn a food if there are less than 10 foods */
const checkEnoughFoods = () => {
  if (gameState.food.length < 10) {
    spawnFood();
  }
};

/** Update the game state. This function is called once per server tick. */
const updateGameState = () => {
  // TODO (Step 5.4): add computePlayerEats to game loop (1 line)
  // This will check all pairwise eating between players every loop
  computePlayerEatsFood();
  checkEnoughFoods();
};

/** Remove a player from the game state if they disconnect or if they get eaten */
const removePlayer = (id) => {
  if (gameState.players[id] != undefined) {
    delete gameState.players[id];
  }
};

/** Remove a food from the game state if it gets eaten, given reference to food object */
const removeFood = (f) => {
  let ix = gameState.food.indexOf(f);
  if (ix !== -1) {
    gameState.food.splice(ix, 1);
  }
};

module.exports = {
  gameState,
  spawnPlayer,
  movePlayer,
  removePlayer,
  updateGameState,
};
