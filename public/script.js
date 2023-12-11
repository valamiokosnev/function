const menuWidth = document.getElementById("functions").offsetWidth
const canvas = document.getElementById('main-canvas')
const ctx = canvas.getContext('2d')

var xStart, xEnd
var yStart, yEnd

var XunitSizeMultipliers = [2, 2.5, 2]
var YunitSizeMultipliers = [2, 2.5, 2]


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

    if (enteredMath != null && enteredMath.length > 0) calculatePoints(enteredMath)
}

function drawAxis() {
    ctx.font = `${coordinateFontSize}px serif`
    if (vicci) ctx.drawImage(document.getElementById("szia"), 0, 0, 1920, 1080)

    yStart = cameraPos.y - Math.round(canvas.height/2)
    yEnd = cameraPos.y + Math.round(canvas.height/2)

    let range = Math.abs(yStart - yEnd)
    range = range - (range / zoom)

    yStart += range / 2
    yEnd -= range / 2 

    yStart = Math.floor(yStart / yPtPerUnit) * yPtPerUnit

    ctx.fillStyle = "#EEEEEE"
    for (let y = yStart; y < yEnd + yPtPerUnit; y += yPtPerUnit) {
        if (y / defaultPtPerUnit == 0) continue 

        ctx.moveTo(0, coordToScreenY(y))
        ctx.lineTo(canvas.width, coordToScreenY(y))

        let textWidth = ctx.measureText(y / defaultPtPerUnit).width

        let textXCoord = coordToScreenX(0, -10)
        textXCoord = Math.min(canvas.width-textDistanceFromEdge, Math.max(textDistanceFromEdge+textWidth, textXCoord))

        ctx.textAlign = 'end'
        ctx.fillText(convertToDisplayNumber(y), textXCoord, coordToScreenY(y, coordinateFontSize / 3))
    }


    xStart = cameraPos.x - Math.round(canvas.width/2)
    xEnd = cameraPos.x + Math.round(canvas.width/2)

    range = Math.abs(xStart - xEnd)
    range = range - (range / zoom)
    
    xStart += range / 2
    xEnd -= range / 2 

    xStart = Math.floor(xStart / xPtPerUnit) * xPtPerUnit

    ctx.textAlign = 'center'
    
    for (let x = xStart; x < xEnd + xPtPerUnit; x += xPtPerUnit) {
        if (x / defaultPtPerUnit == 0) continue

        ctx.moveTo(coordToScreenX(x), 0)
        ctx.lineTo(coordToScreenX(x), canvas.height)

        let textMeasures = ctx.measureText(-x / defaultPtPerUnit)
        let textHeight = textMeasures.actualBoundingBoxAscent + textMeasures.actualBoundingBoxDescent

        let textYCoord = coordToScreenY(0, coordinateFontSize)
        textYCoord = Math.min(canvas.height-textDistanceFromEdge, Math.max(textDistanceFromEdge+textHeight, textYCoord))
        

        ctx.fillText(convertToDisplayNumber(x), coordToScreenX(x), textYCoord)
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

    cameraPos.x -= (e.clientX - lastMouseCoord.x) / zoom
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

    updateUnitSizeX()

    updateUnitSizeY()

    updateCanvas()
})

document.getElementById('origo').addEventListener('click', () => {
    zoom = 1
    cameraPos = {
        x: 0,
        y: 0
    }

    xPtPerUnit = defaultPtPerUnit
    yPtPerUnit = defaultPtPerUnit

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