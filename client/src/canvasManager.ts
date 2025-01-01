let canvas: HTMLCanvasElement | null;

/** utils */

// Define sprite types and their structure
interface SpriteImages {
  red: HTMLImageElement;
  blue: HTMLImageElement;
  green: HTMLImageElement;
  yellow: HTMLImageElement;
  purple: HTMLImageElement;
  orange: HTMLImageElement;
  silver: HTMLImageElement;
}

// Load sprites asynchronously
let sprites: SpriteImages = {
  red: new Image(400, 400),
  blue: new Image(400, 400),
  green: new Image(400, 400),
  yellow: new Image(400, 400),
  purple: new Image(400, 400),
  orange: new Image(400, 400),
  silver: new Image(400, 400),
};

Object.keys(sprites).forEach((key) => {
  const sprite = sprites[key as keyof SpriteImages];
  sprite.src = `/player-icons/${key}.png`;
});

// Converts a coordinate in a normal X Y plane to canvas coordinates
const convertCoord = (x: number, y: number): { drawX: number; drawY: number } => {
  if (!canvas) return { drawX: x, drawY: y }; // In case canvas is not set yet
  return {
    drawX: x,
    drawY: canvas.height - y, // Flip Y-coordinate to match canvas coordinate system
  };
};

// Fills a circle at a given x, y canvas coord with radius and color
const fillCircle = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string
) => {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
};

// Draws a sprite instead of a colored circle
const drawSprite = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: keyof SpriteImages
) => {
  const sprite = sprites[color];
  if (sprite.complete && sprite.naturalHeight !== 0) {
    context.save();
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.closePath();
    context.clip();
    context.drawImage(sprite, x - radius, y - radius, radius * 2, radius * 2);
    context.restore();
  } else {
    console.error(`Sprite ${color} is not loaded yet.`);
  }
};

/** drawing functions */

// Draw player using sprite or circle
const drawPlayer = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: keyof SpriteImages
) => {
  const { drawX, drawY } = convertCoord(x, y);
  drawSprite(context, drawX, drawY, radius, color);
};

// Draw circle for food items
const drawCircle = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string
) => {
  const { drawX, drawY } = convertCoord(x, y);
  fillCircle(context, drawX, drawY, radius, color);
};

/** main draw function */

// Type for the `drawState` parameter
export interface GameState {
  players: {
    [id: string]: {
      position: { x: number; y: number };
      radius: number;
      color: keyof SpriteImages;
    };
  };
  food: {
    [id: string]: {
      position: { x: number; y: number };
      radius: number;
      color: string;
    };
  };
  winner?: string;
}

// Main function to draw the game state
export const drawCanvas = (drawState: GameState, canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d");
  if (!context) return;

  // Clear the canvas to black
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw all players
  Object.values(drawState.players).forEach((p) => {
    drawPlayer(context, p.position.x, p.position.y, p.radius, p.color);
  });

  // Draw all food items
  Object.values(drawState.food).forEach((f) => {
    drawCircle(context, f.position.x, f.position.y, f.radius, f.color);
  });
};
