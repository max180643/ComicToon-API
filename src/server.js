const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = process.env.PORT || 5555

// Import routes
const userRoute = require('./routes/user')
const comicRoute = require('./routes/comic')
const episodeRoute = require('./routes/episode')
const notFoundRoute = require('./routes/notFound')

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/user', userRoute)
app.use('/api/comic', comicRoute)
app.use('/api/episode', episodeRoute)
app.use('/', notFoundRoute)

app.listen(port, () => {
  console.log('Server running at port %d.', port)
})
