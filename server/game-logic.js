/** constants */
const MAP_LENGTH = 500;
const INITIAL_RADIUS = 20;
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
// TODO (Step 2.1): Uncomment the following object declaration for gameState.
// const gameState = {
//   winner: null,
//   players: {},
// };

/** Game logic */

/** Adds a player to the game state, initialized with a random location */
const spawnPlayer = (id) => {
  // TODO (Step 2.2): Initialize a new player indexed by id with "position" and "radius" properties.
  //    The new player should have a random position on the map.
  //    You can use getRandomPosition() which has been implemented above for you.
  //    The radius should be the initial radius (defined at the top of this file).
  //    Bonus: If you want, you can try to also give a "color" property to each player, and
  //    initialize it to a random color from the colors array at the top of this file.
};

/** Update the game state. This function is called once per server tick. */
// TODO (Step 2.1): Uncomment the following function for updating the game state.
// const updateGameState = () => {
//   // This function is currently empty, but we'll add to it later.
// };

/** Remove a player from the game state if they disconnect or if they get eaten */
const removePlayer = (id) => {
  if (gameState.players[id] != undefined) {
    // TODO (Step 2.3): remove the player from the game state
    // Your code goes here
  }
};

module.exports = {
  gameState,
  spawnPlayer,
  removePlayer,
  updateGameState,
};
