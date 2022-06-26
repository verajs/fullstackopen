const http = require("http");
const express = require("express");
const app = express();
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const cors = require("cors");
const mongoose = require("mongoose");
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

logger.info('connecting to', config.PORT)

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/login', loginRouter)
app.use(middleware.tokenExtractor)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app