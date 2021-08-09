const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

// TODO: IN CI/CD WE NEED TO DELETE THE EXTRA DB AND THE TESTING WITH IT
const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

// conection to db
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  keepAlive: 1
})
  .then(() => {
    console.log('Database connected!')
  })
  .catch(err => {
    console.log(err)
  })

process.on('uncaughtexception', () => {
  mongoose.connection.disconnect()
})
