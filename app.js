require('dotenv/config')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const ip = require('ip')
const { DevLog } = require('./lib/helpers')

const API_VERSION = '/api/v1'

const PORT = process.env.PORT || 8080
const NAME = process.env.NAME || 'one_netflix4favs-api'
const PRODUCTION = process.env.NODE_ENV == 'production'
const MONGODB_URI = PRODUCTION ? process.env.MONGODB_URI_PROD : process.env.MONGODB_URI
const FRONTEND_URL = PRODUCTION ? process.env.FRONTEND_URL_PROD : process.env.FRONTEND_URL

const indexRouter = require('./routes/index.routes')
const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/users.routes')
const adminRouter = require('./routes/admin.routes')
const movieRouter = require('./routes/movies.routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors([FRONTEND_URL]))

app.use(API_VERSION + '/', indexRouter)
app.use(API_VERSION + 'auth', authRouter)
app.use(API_VERSION + 'users', userRouter)
app.use(API_VERSION + 'admins', adminRouter)
app.use(API_VERSION + 'movies', movieRouter)

mongoose
        .connect(MONGODB_URI)
        .then(() => {
            app.listen(PORT, () => {
                console.log(
                    `\r====================================================================\n
				    \r\t[*] Endpoints for \x1b[34m${NAME}\x1b[0m are available [*]\n
				    \r\t[*] Local: \x1b[4m\x1b[32mhttp://localhost:${PORT}${API_VERSION}\x1b[0m\r
				    \r\t[*] Your Network: \x1b[4m\x1b[32m${`http://${ip.address()}`}:${PORT}${API_VERSION}\x1b[0m\r
				    \r\n====================================================================`
                )
            })
        })
        .catch((err) => {
            console.log('[!] Failed to connect MongoDb')
            DevLog(err)
        })