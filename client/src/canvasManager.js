let canvas;

/** utils */

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

/** drawing functions */

const drawPlayer = (context, x, y, radius, color) => {
  const { drawX, drawY } = convertCoord(x, y);
  // TODO (Step 2.6): call fillCircle to draw a circle as the player (1 line)
  // Your code goes here
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
    // TODO (Step 2.6, pt 2): call drawPlayer to draw each player (1 line)
    // Hint: each player `p` has a `position` field, and this `position` field
    //   has an `x` field and `y` field.
    // Your code goes here
  });
};
