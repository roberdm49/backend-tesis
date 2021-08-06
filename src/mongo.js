const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

// conection to db
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
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

// User.find({})
//   .then(result => {
//     console.log(result)
//   })
//   .catch(err => {
//     console.log(err)
//   })
//   .finally(() => {
//     mongoose.connection.close()
//   })

// const user = new User({
//   name: 'rober',
//   lastname: 'marcos',
//   username: 'rober',
//   password: 'rober',
//   role: 'technical',
//   avatar: null
// })

// user.save()
//   .then(result => {
//     console.log(result)
//   })
//   .catch(err => {
//     console.log(err)
//   })
//   .finally(() => {
//     mongoose.connection.close()
//   })
