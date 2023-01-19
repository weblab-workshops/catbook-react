let canvas;

/** utils */

// load sprites!
let sprites = {
  red: null,
  blue: null,
  green: null,
  yellow: null,
  purple: null,
  orange: null,
  silver: null,
};
Object.keys(sprites).forEach((key) => {
  sprites[key] = new Image(400, 400);
  sprites[key].src = `../player-icons/${key}.png`; // Load sprites from dist folder
});

// converts a coordinate in a normal X Y plane to canvas coordinates
const convertCoord = (x, y) => {
  if (!canvas) return;
  return {
    drawX: x,
    drawY: canvas.height - y,
  };
};

// fills a circle at a given x, y canvas coord with radius and color
const fillCircle = (context, x, y, radius, color) => {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
};

// draws a sprite instead of a colored circle
const drawSprite = (context, x, y, radius, color) => {
  context.save();
  // Saves current context so we can restore to here once we are done drawing
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.closePath();
  context.clip(); // Sets circular clipping region for sprite image
  context.drawImage(sprites[color], x - radius, y - radius, radius * 2, radius * 2);
  context.restore();
  // Restores context to last save (before clipping was applied), so we can draw normally again
};

/** drawing functions */

const drawPlayer = (context, x, y, radius, color) => {
  const { drawX, drawY } = convertCoord(x, y);
  drawSprite(context, drawX, drawY, radius, color);
};

const drawCircle = (context, x, y, radius, color) => {
  const { drawX, drawY } = convertCoord(x, y);
  fillCircle(context, drawX, drawY, radius, color);
};

/** main draw */
export const drawCanvas = (drawState, canvasRef) => {
  // use canvas reference of canvas element to get reference to canvas object
  canvas = canvasRef.current;
  if (!canvas) return;
  const context = canvas.getContext("2d");

  // clear the canvas to black
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // draw all the players
  Object.values(drawState.players).forEach((p) => {
    drawPlayer(context, p.position.x, p.position.y, p.radius, p.color);
  });

  // draw all the foods
  Object.values(drawState.food).forEach((f) => {
    drawCircle(context, f.position.x, f.position.y, f.radius, f.color);
  });
};
