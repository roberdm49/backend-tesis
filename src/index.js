const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const login = require('./api/routes/Login');
const signin = require('./api/routes/Signin');
const user = require('./api/routes/User');
const patient = require('./api/routes/Patient');

app.use(cors());
/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/login', login);
app.use('/signin', signin);
app.use('/user', user);
app.use('/patient', patient);

const PORT = 3030;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
