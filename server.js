const express = require("express")
const path = require("path")
const port = process.env.PORT || 3000

console.log(port)

const app = express()

app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, "build")))

app.get('/*', (_, res) => res.sendFile(path.join(__dirname, "build", "index.html")))

app.listen(port, "0.0.0.0")