/** constants */
const MAP_LENGTH = 500;
const INITIAL_RADIUS = 20;
const MAX_PLAYER_SIZE = 200;
const FOOD_SIZE = 2;
const EDIBLE_RANGE_RATIO = 0.9;
const colors = ["red", "blue", "green", "yellow", "purple", "orange"]; // colors to use for players

/** Utils! */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

// TODO: getPlayerOverlap, will return percentage of overlap between two players
// TODO: checkOverlaps (pairwise overlaps), will update player states and player radius

let playersEaten = []; // A list of ids of any players that have just been eaten!

// check player overlap with player
const playerAttemptEat = (pid1, pid2) => {
  const player1Position = gameState.players[pid1].position;
  const player2Position = gameState.players[pid2].position;
  const x1 = player1Position.x;
  const y1 = player1Position.y;
  const x2 = player2Position.x;
  const y2 = player2Position.y;
  const dist = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  if (dist < gameState.players[pid1].radius * EDIBLE_RANGE_RATIO) {
    // player 2 is within player 1's eat range
    if (gameState.players[pid1].radius * EDIBLE_RANGE_RATIO > gameState.players[pid2].radius) {
      // player 1 is big enough to eat player 2
      gameState.players[pid1].radius += gameState.players[pid2].radius;
      playersEaten.push(pid2);
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
  playersEaten.forEach((playerid) => {
    removePlayer(playerid);
  });
  playersEaten = [];
};

// check player overlap with food
const playerAttemptEatFood = (pid1, f) => {
  const player1Position = gameState.players[pid1].position;
  const foodPosition = f.position;
  const x1 = player1Position.x;
  const y1 = player1Position.y;
  const x2 = foodPosition.x;
  const y2 = foodPosition.y;
  const dist = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  if (dist < gameState.players[pid1].radius * EDIBLE_RANGE_RATIO) {
    // food is within player 1's eat range
    if (gameState.players[pid1].radius > FOOD_SIZE) {
      // player 1 is big enough to eat food
      gameState.players[pid1].radius += FOOD_SIZE;
      removeFood(f);
    }
  }
};

const computePlayerEatsFood = () => {
  // Attempt all pairwise eating
  Object.keys(gameState.players).forEach((pid1) => {
    if (gameState.players[pid1].radius > FOOD_SIZE) {
      // if player is big enough to eat food
      gameState.food.forEach((f) => {
        playerAttemptEatFood(pid1, f);
      });
    }
  });
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
  food: [],
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

/** Adds a food to the game state, initialized with a random location */
const spawnFood = () => {
  gameState.food.push({
    position: getRandomPosition(),
    radius: FOOD_SIZE,
    color: colors[Math.floor(Math.random() * colors.length)],
  });
};

/** Checks if a player is in the game, given user id */
const playerInGame = (userId) => {
  return userId in gameState.players;
};

/** Moves a player based off the sent data from the "move" socket msg */
const movePlayer = (id, dir) => {
  // Unbounded moves
  // if (dir === "up") {
  //   gameState.players[id].position.y += 10;
  // } else if (dir === "down") {
  //   gameState.players[id].position.y -= 10;
  // } else if (dir === "left") {
  //   gameState.players[id].position.x -= 10;
  // } else if (dir === "right") {
  //   gameState.players[id].position.x += 10;
  // }
  if (gameState.players[id] == undefined) {
    return;
  }

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

const checkEnoughFoods = () => {
  if (gameState.food.length < 10) {
    spawnFood();
  }
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
    gameState.winner = winners[0];
    Object.keys(gameState.players).forEach((key) => {
      // remove all players
      removePlayer(key);
    });
  }
};

const updateGameState = () => {
  // TODO? : buffer moves on server side?
  checkWin();
  computePlayerEats();
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
  playerInGame,
  movePlayer,
  removePlayer,
  updateGameState,
};
