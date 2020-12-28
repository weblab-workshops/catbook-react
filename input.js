let inputDirection = { x: 0, y: 1 }

window.addEventListener('keydown', event => {
    if (event.key === "ArrowUp" && inputDirection.x !== 0) {
        inputDirection = { x: 0, y: 1 }
    } else if (event.key === "ArrowDown" && inputDirection.x !== 0) {
        inputDirection = { x: 0, y: -1 }
    } else if (event.key === "ArrowRight" && inputDirection.y !== 0) {
        inputDirection = { x: 1, y: 0 }
    } else if (event.key === "ArrowLeft" && inputDirection.y !== 0) {
        inputDirection = { x: -1, y: 0 }
    }
})