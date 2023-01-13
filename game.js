const snakeSpeed = 1000/5 # the number of times we update per second
const main = () => {
    update();
    draw();
}

setInterval(main, 1000/5);

const update = () => {
    console.log("updating")
}

const draw = () => {
}
