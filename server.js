// Server setup
const express = require('express')
const app = express()
const api = require('./server/routes/api')
const path = require('path')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', api)
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const port = 8000
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})

