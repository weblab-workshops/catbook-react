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

/** Game state */
const gameState = {
  winner: null,
  players: {},
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

/** Moves a player based off the sent data from the "move" socket msg */
const movePlayer = (id, dir) => {
  // If player doesn't exist, don't move anything
  if (gameState.players[id] == undefined) {
    return;
  }

  // TODO (Step 3.4): given the player id (id) and keyboard input (dir), move the player 10px
  //   in the direction given by `dir` (8-10 lines).
  // `dir` is a string that can take on 4 directions: "up", "down", "left", "right".
  // Remember that x controls left-right, and y controls up-down.
  // Hint: Players are stored in gameState.players, and each player is indexed by its `id`. Each player
  //       has a `position` field, and this `position` field has an `x` field and a `y` field.
  // Your code goes here!
};

/** Update the game state. This function is called once per server tick. */
const updateGameState = () => {
  // This function is currently empty, but we'll add to it later.
};

/** Remove a player from the game state if they disconnect or if they get eaten */
const removePlayer = (id) => {
  if (gameState.players[id] != undefined) {
    delete gameState.players[id];
  }
};

module.exports = {
  gameState,
  spawnPlayer,
  movePlayer,
  removePlayer,
  updateGameState,
};
