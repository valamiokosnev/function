const canvas = document.getElementById('main-canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var cameraPos = {
    x: 0,
    y: 0
}
var zoom = 1

function updateCanvas() {
    drawAxis()
}

function drawAxis() {
    ctx.beginPath()

    //Vertical
    ctx.moveTo(
        Math.round(canvas.width/2) + cameraPos.x,
        cameraPos.y
    )
    ctx.lineTo(
        Math.round(canvas.width/2) + cameraPos.x,
        cameraPos.y + canvas.height
    )

    //Horizontal
    ctx.moveTo(
        cameraPos.x,
        Math.round(canvas.height/2) + cameraPos.y
    )
    ctx.lineTo(
        cameraPos.x + canvas.width,
        Math.round(canvas.height/2) + cameraPos.y
    )

    ctx.strokeStyle = "black";
    ctx.stroke()
}

addEventListener("load", () => updateCanvas())

addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    updateCanvas()
})