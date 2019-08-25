const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

const server = express()

// import routes
const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')

// middleware for cors
server.use(cors())

// middleware for json parsing (don't need separate body-parser anymore)
server.use(express.json())

// middleware for routes
server.use('/api/posts', postsRoute)
server.use('/api/user', authRoute)

// Routes
server.get('/', (req, res) => {
  res.send('Home page')
})

mongoose.connect(
  process.env.AUTH_DB_CONNECTION,
  { useNewUrlParser: true },
  () => { console.log('Connected to DB') })

// start server
server.listen(3000, () => {
  console.log('Express server running at http://localhost:3000')
})
