function screenToCoordX(x) {
    return x - Math.round(canvas.width/2) - cameraPos.x
}

function coordToScreenX(x, offset=0) {
    return x + Math.round(canvas.width/2) + cameraPos.x + offset
}


function screenToCoordY(y) {
    return -(y - Math.round(canvas.height/2)) + cameraPos.y
}

function coordToScreenY(y, offset=0) {
    return -(y / zoom - Math.round(canvas.height/2)) + cameraPos.y  + offset
}