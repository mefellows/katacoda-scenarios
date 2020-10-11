const express = require("express")
const cors = require("cors")

const server = express()
server.use(cors())
server.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8")
  next()
})

server.get("/product/:id", (req, res) => {
  res.json({id: 1, name: "aussie", type: "hamburger"})
})

module.exports = {
  server
}
