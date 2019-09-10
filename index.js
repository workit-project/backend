const express = require('express')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const app = express()

app.use(express.json())

app.use((_, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
  res.set('Access-Control-Allow-Headers', 'content-type')
  next()
})

app.use(async (_, __, next) => {
  await mongoose.connect(process.env.DB_URI, {
    connectTimeoutMs: 5000,
    useNewUrlParser: true,
  })
  next()
})

app.get('/', (_, res) => {
  res.send({ hello: "world" })
})

module.exports = app
