function calculatePoints() {

    x = y = 0

    drawPoint(x, y)
}

function drawPoint(x, y) {
    ctx.fillRect(coordToScreenX(x*defaultPtPerUnit), coordToScreenY(y*defaultPtPerUnit), 1, 1)
}