/** constants */
const MAP_LENGTH: number = 500;
const INITIAL_RADIUS: number = 20;
const MAX_PLAYER_SIZE: number = 200;
const FOOD_SIZE: number = 2;
const EDIBLE_RANGE_RATIO: number = 0.9;
const EDIBLE_SIZE_RATIO: number = 0.9;
const colors: string[] = ["red", "blue", "green", "yellow", "purple", "orange", "silver"];

/** Utils! */

/** Helper to generate a random integer */
const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

/** Helper to generate a random position on the map */
const getRandomPosition = (): { x: number; y: number } => {
  return {
    x: getRandomInt(0, MAP_LENGTH),
    y: getRandomInt(0, MAP_LENGTH),
  };
};

let playersEaten: string[] = []; // A list of ids of any players that have just been eaten!

/** Interfaces */
interface Player {
  position: { x: number; y: number };
  radius: number;
  color: string;
}

interface Food {
  position: { x: number; y: number };
  radius: number;
  color: string;
}

interface GameState {
  winner: string | null;
  players: Record<string, Player>;
  food: Food[];
}

/** Game state */
const gameState: GameState = {
  winner: null,
  players: {},
  food: [],
};

/** Helper to compute when player 1 tries to eat player 2 */
const playerAttemptEatPlayer = (pid1: string, pid2: string): void => {
  const player1 = gameState.players[pid1];
  const player2 = gameState.players[pid2];

  const dist = Math.hypot(
    player1.position.x - player2.position.x,
    player1.position.y - player2.position.y
  );

  if (dist < player1.radius * EDIBLE_RANGE_RATIO && player1.radius * EDIBLE_SIZE_RATIO > player2.radius) {
    player1.radius += player2.radius;
    playersEaten.push(pid2);
  }
};

const computePlayersEatPlayers = (): void => {
  const playerIds = Object.keys(gameState.players);
  if (playerIds.length >= 2) {
    playerIds.forEach((pid1) => {
      playerIds.forEach((pid2) => {
        if (pid1 !== pid2) playerAttemptEatPlayer(pid1, pid2);
      });
    });
  }

  playersEaten.forEach(removePlayer);
  playersEaten = [];
};

const playerAttemptEatFood = (pid1: string, f: Food): void => {
  const player = gameState.players[pid1];
  const dist = Math.hypot(
    player.position.x - f.position.x,
    player.position.y - f.position.y
  );

  if (dist < player.radius - FOOD_SIZE && player.radius > FOOD_SIZE) {
    player.radius += FOOD_SIZE;
    removeFood(f);
  }
};

const computePlayersEatFoods = (): void => {
  Object.keys(gameState.players).forEach((pid1) => {
    gameState.food.forEach((f) => {
      playerAttemptEatFood(pid1, f);
    });
  });
};

const spawnPlayer = (id: string): void => {
  gameState.players[id] = {
    position: getRandomPosition(),
    radius: INITIAL_RADIUS,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
};

const spawnFood = (): void => {
  gameState.food.push({
    position: getRandomPosition(),
    radius: FOOD_SIZE,
    color: colors[Math.floor(Math.random() * colors.length)],
  });
};

const movePlayer = (id: string, dir: string): void => {
  const player = gameState.players[id];
  if (!player) return;

  const desiredPosition = { ...player.position };

  if (dir === "up") desiredPosition.y -= 10;
  else if (dir === "down") desiredPosition.y += 10;
  else if (dir === "left") desiredPosition.x -= 10;
  else if (dir === "right") desiredPosition.x += 10;

  desiredPosition.x = Math.min(Math.max(0, desiredPosition.x), MAP_LENGTH);
  desiredPosition.y = Math.min(Math.max(0, desiredPosition.y), MAP_LENGTH);

  player.position = desiredPosition;
};

const checkEnoughFoods = (): void => {
  if (gameState.food.length < 10) spawnFood();
};

const checkWin = (): void => {
  const winners = Object.keys(gameState.players).filter(
    (key) => gameState.players[key].radius > MAX_PLAYER_SIZE
  );

  if (winners.length === 1) {
    gameState.winner = winners[0];
    Object.keys(gameState.players).forEach(removePlayer);
  }
};

const updateGameState = (): void => {
  checkWin();
  computePlayersEatPlayers();
  computePlayersEatFoods();
  checkEnoughFoods();
};

const removePlayer = (id: string): void => {
  delete gameState.players[id];
};

const removeFood = (f: Food): void => {
  const ix = gameState.food.indexOf(f);
  if (ix !== -1) gameState.food.splice(ix, 1);
};

const resetWinner = (): void => {
  gameState.winner = null;
};

export {
  gameState,
  spawnPlayer,
  movePlayer,
  removePlayer,
  updateGameState,
  resetWinner,
};
