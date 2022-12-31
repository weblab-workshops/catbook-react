const MAP_LENGTH = 400;
const INITIAL_RADIUS = 20;
const MAX_PLAYER_SIZE = 200;
// colors to use for players
const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

// const getDistanceFromGoal = (player) => {
//   return Math.abs(player.x - goal.x) + Math.abs(player.y - goal.y);
// };

// TODO: getPlayerOverlap, will return percentage of overlap between two players
// TODO: checkOverlaps (pairwise overlaps), will update player states and player radius

const EDIBLE_RANGE_RATIO = 0.9;
const EDIBLE_SIZE_RATIO = 0.9;

const playerAttemptEat = (pid1, pid2) => {
  const player1Position = players[pid1].position;
  const player2Position = players[pid2].position;
  const x1 = player1Position.x;
  const y1 = player1Position.y;
  const x2 = player2Position.x;
  const y2 = player2Position.y;
  const dist = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  if (dist < pid1 * EDIBLE_RANGE_RATIO) {
    // player 2 is within player 1's eat range
    if (pid1 * EDIBLE_RANGE_RATIO > pid2) {
      // player 1 is big enough to eat player 2
      players[pid1].radius += players[pid2].radius;
      removePlayer(pid2);
    }
  }
};

const computePlayerEats = () => {
  // Attempt all pairwise eating
  if (Object.keys(gameState.players).length >= 2) {
    Object.keys(gameState.players).forEach((pid1) => {
      Object.keys(gameState.players).forEach((pid2) => {
        playerAttemptEat(pid1, pid2);
      });
    });
  }
};

const getRandomPosition = () => {
  return {
    x: getRandomInt(0, MAP_LENGTH),
    y: getRandomInt(0, MAP_LENGTH),
  };
};

/** game state */
const gameState = {
  winner: null,
  players: {},
  food: {},
};

/** game logic */

/** Adds a player to the game state, initialized with a random location */
const spawnPlayer = (id) => {
  gameState.players[id] = {
    position: getRandomPosition(),
    radius: INITIAL_RADIUS,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
};

/** Checks if a player is in the game, given user id */
const playerInGame = (userId) => {
  return userId in gameState.players;
};

/** Moves a player based off the sent data from the "move" socket msg */
const movePlayer = (id, dir) => {
  // if (dir === "up") {
  //   gameState.players[id].position.y += 10;
  // } else if (dir === "down") {
  //   gameState.players[id].position.y -= 10;
  // } else if (dir === "left") {
  //   gameState.players[id].position.x -= 10;
  // } else if (dir === "right") {
  //   gameState.players[id].position.x += 10;
  // }

  const desiredPosition = {
    x: gameState.players[id].position.x,
    y: gameState.players[id].position.y,
  };

  // Move player
  if (dir === "up") {
    desiredPosition.y += 10;
  } else if (dir === "down") {
    desiredPosition.y -= 10;
  } else if (dir === "left") {
    desiredPosition.x -= 10;
  } else if (dir === "right") {
    desiredPosition.x += 10;
  }

  // Keep player in bounds
  if (desiredPosition.x > MAP_LENGTH) {
    desiredPosition.x = MAP_LENGTH;
  }
  if (desiredPosition.x < 0) {
    desiredPosition.x = 0;
  }
  if (desiredPosition.y > MAP_LENGTH) {
    desiredPosition.y = MAP_LENGTH;
  }
  if (desiredPosition.y < 0) {
    desiredPosition.y = 0;
  }

  gameState.players[id].position = desiredPosition;
};

const checkWin = () => {
  const winners = Object.keys(gameState.players).filter((key) => {
    // check if player is too large
    const player = gameState.players[key];
    if (player.radius > MAX_PLAYER_SIZE) {
      return true;
    }
  });

  // warning: race condition here; if two players' radii become 201 at the same time, no winner will be declared
  if (winners.length === 1) {
    gameState.winner = alivePlayers[0];
  }
};

const updateGameState = () => {
  // TODO? : buffer moves on server side?
  checkWin();
  computePlayerEats();
};

/** Remove a player from the game state if they disconnect or if they get eaten */
const removePlayer = (id) => {
  delete gameState.players[id];
};

module.exports = {
  gameState,
  spawnPlayer,
  playerInGame,
  movePlayer,
  removePlayer,
  updateGameState,
};
