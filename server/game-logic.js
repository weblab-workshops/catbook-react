/** Utils! */

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

const getDistanceFromGoal = (player) => {
  return Math.abs(player.x - goal.x) + Math.abs(player.y - goal.y);
};

// TODO: getPlayerOverlap, will return percentage of overlap between two players
// TODO: checkOverlaps (pairwise overlaps), will update player states and player radius

const getRandomLocation = () => {
  return {
    x: getRandomInt(-20, 20) * 20,
    y: getRandomInt(-20, 20) * 20,
  };
};

// const getPlayerColor = (id) => {
//   const player = gameState.players[id];
//   const dist = Math.min(getDistanceFromGoal(player) / 800, 1);
//   const blueValue = (1 - dist) * 255;
//   const redValue = dist * 255;
//   return `rgb(${redValue}, 0, ${blueValue})`;
// };

/** constants */
const goal = getRandomLocation();

/** game state */
const gameState = {
  winner: null,
  players: {},
};

/** game logic */

/** Adds a player to the game state, initialized with a random location */
const addPlayer = (id) => {
  gameState.players[id] = getRandomLocation();
};

/** Moves a player based off the sent data from the "move" socket msg */
const movePlayer = (id, dir) => {
  if (dir === "up") {
    gameState.players[id].y += 10;
  } else if (dir === "down") {
    gameState.players[id].y -= 10;
  } else if (dir === "left") {
    gameState.players[id].x -= 10;
  } else if (dir === "right") {
    gameState.players[id].x += 10;
  }
  checkWin();
};

const checkWin = () => {
  const winners = Object.keys(gameState.players).filter((key) => {
    // check if player is too large
    const player = gameState.players[key];
    if (player.radius > 200) {
      return true;
    }
  });

  // warning: race condition here; if two players' radii become 201 at the same time, no winner will be declared
  if (winners.length === 1) {
    gameState.winner = alivePlayers[0];
  }
};

// probably not doing this
// /** Checks whether a player has won, if a player won, change the game state */
// // win condition: only one player is alive at a given moment
// const checkWin = () => {
//   const alivePlayers = Object.keys(gameState.players).filter((key) => {
//     // check if they are on top of goal
//     const player = gameState.players[key];
//     return player.alive;
//   });

//   if (alivePlayers.length === 1) {
//     gameState.winner = alivePlayers[0];
//   }
// };

/** Remove a player from the game state if they disconnect */
const removePlayer = (id) => {
  delete gameState.players[id];
};

module.exports = {
  gameState,
  addPlayer,
  movePlayer,
  removePlayer,
};
