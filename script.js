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

const defaultPxPerUnit = 50
var pxPerUnit = defaultPxPerUnit

const coordinateFontSize = 20

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAxis()
}

function drawAxis() {
    pxPerUnit = Number(parseFloat(defaultPxPerUnit * zoom).toPrecision(12))
    console.log(pxPerUnit);
    ctx.font = `${coordinateFontSize}px serif`
    ctx.textAlign = 'end'

    let yStart = Math.floor((cameraPos.y - Math.round(canvas.height/2)) / pxPerUnit) * pxPerUnit
    let yEnd = cameraPos.y + Math.round(canvas.height/2)
    for (let y = yStart; y < yEnd; y += pxPerUnit) {
        ctx.fillText(y / pxPerUnit, cameraPos.x + Math.round(canvas.width/2) - 10, yEnd - y + (coordinateFontSize / 3))

        ctx.moveTo(0, yEnd - y)
        ctx.lineTo(canvas.width, yEnd - y)
    }

    ctx.textAlign = 'center'

    let xStart = Math.floor((cameraPos.x - Math.round(canvas.width/2)) / pxPerUnit) * pxPerUnit
    let xEnd = cameraPos.x + Math.round(canvas.width/2)
    for (let x = xStart; x < xEnd; x += pxPerUnit) {
        ctx.fillText(x / pxPerUnit, xEnd - x, cameraPos.y + Math.round(canvas.height/2) + (coordinateFontSize))

        ctx.moveTo(xEnd - x, 0)
        ctx.lineTo(xEnd - x, canvas.height)
    }
    

    ctx.strokeStyle = "gray";
    ctx.stroke()


    ctx.beginPath()

    //Y-axis
    ctx.moveTo(
        Math.round(canvas.width/2) + cameraPos.x,
        0
    )
    ctx.lineTo(
        Math.round(canvas.width/2) + cameraPos.x,
        canvas.height
    )

    ctx.strokeStyle = "black";
    ctx.stroke()


    //X-axis
    ctx.moveTo(
        0,
        Math.round(canvas.height/2) + cameraPos.y
    )
    ctx.lineTo(
        canvas.width,
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