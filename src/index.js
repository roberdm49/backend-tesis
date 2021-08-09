require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const notFound = require('./api/middlewares/notFound')
const handleErrors = require('./api/middlewares/handleErrors')
const patientsRouter = require('./api/controllers/patients')
const signinRouter = require('./api/controllers/signin')
const loginRouter = require('./api/controllers/login')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/login', loginRouter)
app.use('/api/signin', signinRouter)
app.use('/api/patients', patientsRouter)

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
