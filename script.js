const menuWidth = document.getElementById("functions").offsetWidth
const canvas = document.getElementById('main-canvas')
const ctx = canvas.getContext('2d')

var mousedown = false
var lastMouseCoord = {
    x: 0,
    y: 0
}

canvas.width = window.innerWidth - menuWidth
canvas.height = window.innerHeight

var cameraPos = {
    x: 0,
    y: 0
}

var zoom = 1

const defaultPtPerUnit = 50
var yPtPerUnit= defaultPtPerUnit
var xPtPerUnit = defaultPtPerUnit

const coordinateFontSize = 20
const textDistanceFromEdge = 10

function updateCanvas() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#222831"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    drawAxis()
}

function drawAxis() {
    ctx.font = `${coordinateFontSize}px serif`
    if (vicci) ctx.drawImage(document.getElementById("szia"), 0, 0, 1920, 1080)

    let yStart = cameraPos.y - Math.round(canvas.height/2)
    let yEnd = cameraPos.y + Math.round(canvas.height/2)

    let range = Math.abs(yStart - yEnd)
    range = range - (range / zoom)

    //console.log("start: " + yStart, "end: " + yEnd)

    yStart += range / 2
    yEnd -= range / 2 

    yStart = Math.floor(yStart / yPtPerUnit) * yPtPerUnit

    if(Math.abs(yEnd - yStart) / yPtPerUnit < 10) {
        yPtPerUnit /= 2
    } else if(Math.abs(yEnd - yStart) / yPtPerUnit > 20) {
        yPtPerUnit *= 2
    }

    //console.log("start: " + yStart, "end: " + yEnd, "range: " + range, "ppu: " + yPtPerUnit, "campos: ", cameraPos, "zoom: " + zoom);

    ctx.fillStyle = "#EEEEEE"
    for (let y = yStart; y < yEnd; y += yPtPerUnit) {
        if (y / defaultPtPerUnit == 0) continue 

        ctx.moveTo(0, coordToScreenY(y))
        ctx.lineTo(canvas.width, coordToScreenY(y))

        let textWidth = ctx.measureText(y / defaultPtPerUnit).width

        let textXCoord = coordToScreenX(0, -10)
        textXCoord = Math.min(canvas.width-textDistanceFromEdge, Math.max(textDistanceFromEdge+textWidth, textXCoord))

        ctx.textAlign = 'end'
        ctx.fillText(y / defaultPtPerUnit, textXCoord, coordToScreenY(y, coordinateFontSize / 3))
    }


    let xStart = cameraPos.x - Math.round(canvas.width/2)
    let xEnd = cameraPos.x + Math.round(canvas.width/2)

    range = Math.abs(xStart - xEnd)
    range = range - (range / zoom)

    //console.log("start: " + xStart, "end: " + xEnd)
    
    xStart += range / 2
    xEnd -= range / 2 

    xStart = Math.floor(xStart / xPtPerUnit) * xPtPerUnit

    if(Math.abs(xEnd - xStart) / xPtPerUnit < 10) {
        xPtPerUnit /= 2
    } else if(Math.abs(xEnd - xStart) / xPtPerUnit > 20) {
        xPtPerUnit *= 2
    }

    ctx.textAlign = 'center'

    
    for (let x = xStart; x < xEnd; x += xPtPerUnit) {
        if (x / defaultPtPerUnit == 0) continue

        ctx.moveTo(coordToScreenX(-x), 0)
        ctx.lineTo(coordToScreenX(-x), canvas.height)

        let textMeasures = ctx.measureText(-x / defaultPtPerUnit)
        let textHeight = textMeasures.actualBoundingBoxAscent + textMeasures.actualBoundingBoxDescent

        let textYCoord = coordToScreenY(0, coordinateFontSize)
        textYCoord = Math.min(canvas.height-textDistanceFromEdge, Math.max(textDistanceFromEdge+textHeight, textYCoord))

        ctx.fillText(-x / defaultPtPerUnit, coordToScreenX(-x), textYCoord)
    }

    ctx.strokeStyle = "#393E46";
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

    ctx.strokeStyle = "#00ADB5";
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

    ctx.stroke()
}

addEventListener("load", () => updateCanvas())

addEventListener("resize", () => {
    canvas.width = window.innerWidth - menuWidth
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

    cameraPos.x += (e.clientX - lastMouseCoord.x) / zoom
    cameraPos.y += (e.clientY - lastMouseCoord.y) / zoom

    lastMouseCoord.x = e.clientX
    lastMouseCoord.y = e.clientY

    updateCanvas()
})

canvas.addEventListener('mouseleave', () => mousedown = false)

canvas.addEventListener('wheel', (e) => {
    if(e.deltaY < 0) {
        zoom *= 1.05
    } else {
        zoom *= 0.95
    }

    updateCanvas()
})


const params = new URLSearchParams(window.location.search)
let vicci = params.get("vicci")
if (vicci != null) {
    vicci = true
}

function reset() {
    window.location.replace(location.pathname)
}