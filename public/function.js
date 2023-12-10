function calculatePoints(func) {

    for (let x = 0; x < 100; x+=0.01) {
        
        y = evaluatex(func, { 'x' : x}, true)()
        drawPoint(x, y)
    }
}

function drawPoint(x, y) {
    ctx.fillRect(coordToScreenX(x*defaultPtPerUnit), coordToScreenY(y*defaultPtPerUnit), 2, 2)
}