const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const login = require('./api/routes/Login');
const signin = require('./api/routes/Signin');
const user = require('./api/routes/User');
const patient = require('./api/routes/Patient');

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/login', login);
app.use('/signin', signin);
app.use('/user', user); //TODO: change USERS for USER
app.use('/patient', patient); //TODO: change PATIENTS for PATIENT

const PORT = 3030;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
