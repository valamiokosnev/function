function screenToCoordX(x) {
    return x - Math.round(canvas.width/2) - cameraPos.x
}

function coordToScreenX(x, offset=0) {
    return x * zoom + Math.round(canvas.width/2) + cameraPos.x * zoom + offset
}


function screenToCoordY(y) {
    return -(y - Math.round(canvas.height/2)) + cameraPos.y
}

function coordToScreenY(y, offset=0) {
    return -(y * zoom - Math.round(canvas.height/2)) + cameraPos.y * zoom + offset
}

const img = document.getElementById("szia")
img.ondragstart = () => {
    return false
}


function convertToDisplayNumber(n) {
    let displayValue = parseFloat(n / defaultPtPerUnit)

    if(Math.abs(displayValue) >= 10_000) {
        displayValue = displayValue.toExponential()
    }

    return displayValue
}


function updateUnitSizeX() {
    if(Math.abs(xEnd - xStart) / xPtPerUnit * (1000 / canvas.width) < 5) {
        xPtPerUnit /= XunitSizeMultipliers[XunitSizeMultipliers.length-1]

        XunitSizeMultipliers.unshift(XunitSizeMultipliers.pop())
    } else if(Math.abs(xEnd - xStart) / xPtPerUnit * (1000 / canvas.width) > 15) {
        xPtPerUnit *= XunitSizeMultipliers[0]

        XunitSizeMultipliers.push(XunitSizeMultipliers.shift())
    }
}

function updateUnitSizeY() {
    if(Math.abs(yEnd - yStart) / yPtPerUnit * (1000 / canvas.height) < 10) {
        yPtPerUnit /= YunitSizeMultipliers[YunitSizeMultipliers.length-1]

        YunitSizeMultipliers.unshift(YunitSizeMultipliers.pop())
    } else if(Math.abs(yEnd - yStart) / yPtPerUnit * (1000 / canvas.height) > 23) {
        yPtPerUnit *= YunitSizeMultipliers[0]

        YunitSizeMultipliers.push(YunitSizeMultipliers.shift())
    }
}