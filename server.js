const express = require('express')
//const evaluatex = require('evaluatex')

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.static('node_modules'));
app.use(express.static('mathquill'));
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})