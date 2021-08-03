const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const PORT = 3030;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
