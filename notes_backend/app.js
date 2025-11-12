const express = require('express')
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
const noteRouter = require('./controller/notes')
const middleware = require('./utils/middleware')
const usersRouter = require('./controller/user')
const loginRouter = require('./controller/login')


const app = express()

logger.info('connecting to ', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to mongoDB')
    })
    .catch(error => {
        logger.error('error connecting to mongoDB', error.message)
    })

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/notes', noteRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app