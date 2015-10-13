'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('node-uuid');
const - = require('lodash');

const port = 8000;
const app = express();

app.use(bodyParser.json());

app.listen(port, () => {
  console.log('Server is on port:', port);
});
