const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'build')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.listen(PORT, () => {
  console.log('server running')
})