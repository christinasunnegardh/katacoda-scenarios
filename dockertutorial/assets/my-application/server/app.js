const express = require('express')
var cors = require('cors');
const app = express()
const port = 9000

app.use(cors());

app.get('/', (req, res) => res.send('Hi from backend!'))

app.listen(port, () => console.log(`Listening on port ${port}!`))