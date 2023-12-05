const canvas = document.getElementById('main-canvas')
const ctx = canvas.getContext('2d')

var mousedown = false
var lastMouseCoord = {
    x: 0,
    y: 0
}

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var cameraPos = {
    x: 0,
    y: 0
}
var zoom = 1

const defaultPtPerUnit = 50
var ptPerUnit = defaultPtPerUnit

const coordinateFontSize = 20

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAxis()
}

function drawAxis() {
    ctx.font = `${coordinateFontSize}px serif`
    ctx.textAlign = 'end'

    /* let yStart = Math.floor((cameraPos.y - Math.round(canvas.height/2)) / ptPerUnit) * ptPerUnit
    let yEnd = cameraPos.y + Math.round(canvas.height/2) + ptPerUnit */

    let yStart = cameraPos.y - Math.round(canvas.height/2)
    let yEnd = cameraPos.y + Math.round(canvas.height/2)

    let range = Math.abs(yStart - yEnd)
    range = range - range * zoom

    yStart += range / 2
    yEnd -= range / 2

    //yStart = Math.floor(yStart / ptPerUnit) * ptPerUnit

    console.log(yStart, yEnd);
    for (let y = yStart; y < yEnd; y += ptPerUnit) {
        ctx.fillText(y / ptPerUnit, coordToScreenX(0, -10), coordToScreenY(y, coordinateFontSize / 3))

        ctx.moveTo(0, coordToScreenY(y))
        ctx.lineTo(canvas.width, coordToScreenY(y))
    }

    /* ctx.textAlign = 'center'

    let xStart = Math.floor((cameraPos.x - Math.round(canvas.width/2)) / ptPerUnit) * ptPerUnit
    let xEnd = cameraPos.x + Math.round(canvas.width/2) + ptPerUnit
    for (let x = xStart; x < xEnd; x += ptPerUnit) {
        ctx.fillText(x / ptPerUnit, coordToScreenX(-x), coordToScreenY(0, coordinateFontSize))

        ctx.moveTo(coordToScreenX(-x), 0)
        ctx.lineTo(coordToScreenX(-x), canvas.height)
    } */
    

    ctx.strokeStyle = "gray";
    ctx.stroke()


    ctx.beginPath()

    //Y-axis
    ctx.moveTo(
        coordToScreenX(0),
        0
    )
    ctx.lineTo(
        coordToScreenX(0),
        canvas.height
    )

    ctx.strokeStyle = "black";
    ctx.stroke()


    //X-axis
    ctx.moveTo(
        0,
        coordToScreenY(0)
    )
    ctx.lineTo(
        canvas.width,
        coordToScreenY(0)
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

canvas.addEventListener('mousedown', (e) => {
    mousedown = true

    lastMouseCoord.x = e.clientX
    lastMouseCoord.y = e.clientY
})
canvas.addEventListener('mouseup', () => mousedown = false)

canvas.addEventListener('mousemove', (e) => {
    if(!mousedown) return

    cameraPos.x += (e.clientX - lastMouseCoord.x) 
    cameraPos.y += (e.clientY - lastMouseCoord.y) 

    lastMouseCoord.x = e.clientX
    lastMouseCoord.y = e.clientY

    updateCanvas()
})

canvas.addEventListener('wheel', (e) => {
    if(e.deltaY > 0) {
        zoom *= 1.25 
    } else {
        zoom *= 0.8
    }

    updateCanvas()
})