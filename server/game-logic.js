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
  // TODO (4.1): Add "food" array to gameState here. (1 line)
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
// TODO (Step 4.1): Uncomment the following function which spawns in food at random locations on the map.
// const spawnFood = () => {
//   gameState.food.push({
//     position: getRandomPosition(),
//     radius: FOOD_SIZE,
//     color: colors[Math.floor(Math.random() * colors.length)],
//   });
// };

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
