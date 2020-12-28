
let inputDirection = { x: 0, y: 1 }
let lastInputDirection = { x: 0, y: 1 }

window.addEventListener('keydown', event => {
    if (event.key === "ArrowUp" && lastInputDirection.x !== 0) {
        inputDirection = { x: 0, y: -1 }
    } else if (event.key === "ArrowDown" && lastInputDirection.x !== 0) {
        inputDirection = { x: 0, y: 1 }
    } else if (event.key === "ArrowRight" && lastInputDirection.y !== 0) {
        inputDirection = { x: 1, y: 0 }
    } else if (event.key === "ArrowLeft" && lastInputDirection.y !== 0) {
        inputDirection = { x: -1, y: 0 }
    }
})

getInputDirection = () => {
    lastInputDirection = inputDirection;
    return inputDirection
}