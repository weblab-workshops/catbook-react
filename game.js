let lastRenderTime = 0;
let SNAKE_SPEED = 5;

main = (currentTime) => {
    window.requestAnimationFrame(main);
    let secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) {
        return;
    }

    lastRenderTime = currentTime;
    update();
    draw();
}

window.requestAnimationFrame(main);

update = () => {
    console.log("Render");
}

draw = () => {
}
