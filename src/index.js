const express = require('express');
const path = require('path');
const cors = require('cors');
const config = require('./config/config');
const app = express();
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const fs = require('fs');
// const protectedRoutes = require('./protectedRoutes');
const usersFile = './users.json';
const users = require(usersFile);
const patientsImagesFile = './patientsImages.json';
const patientsImages = require(patientsImagesFile);

app.use(cors());

app.use(morgan('dev'));
app.use(express.json({limit: '5mb'}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('key', config.key);

const protectedRoutes = express.Router(); 

protectedRoutes.use((req, res, next) => {
  const token = req.headers['access-token'];
  if (token) {
    jwt.verify(token, app.get('key'), (err, decoded) => {      
      if (err) {
        return res.json({ mensaje: 'Invalid token' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    res.send({ 
      mensaje: 'Token not provided.' 
    });
  }
});

module.exports = protectedRoutes;

const getFilteredUserInformation = (user) => {
  return {
    id: user.id,
    avatar: user.avatar,
    name: user.name,
    lastname: user.lastname,
    role: user.role,
  }
}

const PORT = 3030;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

app.post('/login', (req, res) => {
  const { username, password } = {...req.body};
  const user = users.find(user => user.username === username);
  if (!!user) {
    if (user.password === password) {
      const payload = {
        check: true
      };
      const expireTime = 1440;
      const token = jwt.sign(payload, app.get('key'), { expiresIn: expireTime });
      const filteredUserInformation = getFilteredUserInformation(user)
      res.json({
        user: filteredUserInformation,
        mensaje: 'Successful user authentication',
        token: token,
        expireTime: expireTime,
      });
    } else {
      return res.json({
        mensaje: "The password is incorrect",
      });
    }
  } else {
    return res.json({
      mensaje: "The user does not exists",
    });
  }
})
  
app.post('/signin', (req, res) => {
  const {
    name,
    lastname,
    avatar,
    username,
    password,
    role,
  } = req.body;
  console.log(req.body)
  const user = users.find(user => user.username === username);
  if (!!user) {
    res.json({
      mensaje: "The user already exists."
    });
  } else {
    let nextId = users.reduce((acum, actual) => {
      if (parseInt(actual.id) >= acum) return actual.id;
    }, -1);
    nextId += 1;
    users.push({ id: nextId, name, lastname, avatar, username, password, role });
    const usersPath = path.join(__dirname,'./users.json');
    fs.writeFile(usersPath, JSON.stringify(users, null, 2), () => {
      res.json({
        mensaje: 'Successful user creation'
      })
    });
  }
});

app.post('/users/:id', protectedRoutes, (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(user => user.id === id)
  if (user) {
    const filteredUserInformation = getFilteredUserInformation(user)
    res.json({
      user: filteredUserInformation,
    })
  } else {
    res.status(404)
  }
})

app.post('/patients', protectedRoutes, (req, res) => {
  const {
    dni,
    images,
  } = req.body;
  const patient = patientsImages.find(elem => elem.dni === dni);
  if (!patient) {
    patientsImages.push({ dni, images });
    const patientsPath = path.join(__dirname,'./patientsImages.json');
    fs.writeFile(patientsPath, JSON.stringify(patientsImages, null, 2), () => {
      res.json({
        mensaje: 'Successful patient creation'
      })
    });
  } else {
    res.json({
      mensaje: "The patient already exists."
    });
  }
})
