function calculatePoints(func) {
    let ptPerPixel = (xEnd-xStart) / canvas.width
    for (let x = xStart; x < xEnd; x+=ptPerPixel) {

        if (func.includes("x")) y = evaluatex(func, {'x' : x}, true)()
        else y = evaluatex(func, true)()
        drawRawPoint(x, y)
    }

    console.log(xStart, xEnd, ptPerPixel);
}

function drawPoint(x, y) {
    ctx.fillRect(coordToScreenX(x*defaultPtPerUnit), coordToScreenY(y*defaultPtPerUnit), 2, 2)
}

function drawRawPoint(x, y) {
    ctx.fillRect(coordToScreenX(-x), coordToScreenY(y), 2, 2)
}

var enteredMath

var MQ = MathQuill.getInterface(2);

var answerSpan = document.getElementById("answer");
var answerMathField = MQ.MathField(answerSpan, {
    handlers: {
        edit: function () {
            enteredMath = answerMathField.latex();
            calculatePoints(enteredMath)
            updateCanvas()
        }
    }
});