const express = require('express');

const app = express()

app.get('/', (req,res) => {
    res.send('Hello Harmoni')
})

app.listen(8000, () => {
    console.log('port is listening');
})
