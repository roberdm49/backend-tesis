require('dotenv').config()
require('./mongo')
const { NODE_ENV, PORT } = process.env

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const notFound = require('./api/middlewares/notFound')
const handleErrors = require('./api/middlewares/handleErrors')

const patientsRouter = require('./api/routes/Patients')
const loginRouter = require('./api/routes/Login')
const usersRouter = require('./api/routes/Users')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/patients', patientsRouter)

if (NODE_ENV === 'test') {
  const testingRouter = require('./api/routes/Testing')
  app.use('/api/testing', testingRouter)
}

app.use(notFound)
app.use(handleErrors)

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
