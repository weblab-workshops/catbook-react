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
};

// let testSprite = new Image(400, 400);
// testSprite.onload = drawSprite;
// testSprite.src = `../player-icons/blue.png`;

Object.keys(sprites).forEach((key) => {
  sprites[key] = new Image(400, 400);
  sprites[key].onload = drawSprite;
  sprites[key].src = `../player-icons/${key}.png`;
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
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.closePath();
  context.clip();
  context.drawImage(sprites[color], x - radius, y - radius, radius * 2, radius * 2);
  context.restore();
};

/** drawing functions */

const drawPlayer = (context, x, y, radius, color) => {
  const { drawX, drawY } = convertCoord(x, y);
  // fillCircle(context, drawX, drawY, radius, color);
  drawSprite(context, drawX, drawY, radius, color);
};

/** main draw */
export const drawCanvas = (drawState) => {
  // get the canvas element
  canvas = document.getElementById("game-canvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");

  // clear the canvas to black
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // draw all the players
  Object.values(drawState.players).forEach((p) => {
    drawPlayer(context, p.position.x, p.position.y, p.radius, p.color);
  });
};
