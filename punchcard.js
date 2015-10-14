'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('node-uuid');
const _ = require('lodash');

const port = 8000;
const app = express();
const companies = [];
const users = [];
const companiesPrefix = '/api/companies';
const usersPrefix = '/api/users';

app.use(bodyParser.json());

/*  /api/companies - GET
 *  curl -XGET http://localhost:8000/api/companies
 */
app.get(companiesPrefix, (req, res) => {
  res.send(companies);
});


/*  /api/companies - POST
 *  curl -vv -XPOST -d "{\"name\": \"Apple\", \"punchCount\": \"10\"}" -H "Content-Type: Application/json" http://localhost:8000/api/companies
 */
app.post(companiesPrefix, (req, res) => {
  const data = req.body;
  data.id = uuid.v4();

  if (!data.hasOwnProperty('name')) {
    res.status(412).send('missing name');
  }

  if (!data.hasOwnProperty('punchCount')) {
    res.status(412).send('missing punchCount');
  }

  var newCompanie = {
    name: data.name,
    punchCount: data.punchCount,
    id: data.id
  };

  companies.push(newCompanie);
  res.json(true);
});


/*  /api/companies/{id} - GET
 *  curl -XGET http://localhost:8000/api/companies/:id
 */
app.get(companiesPrefix + '/:id', (req, res) => {
  const id = req.params.id;

  const companyEntry = _.find(companies, (company) => {
    return company.id === id;
  });

  if (companyEntry) {
    res.send(companyEntry);
  } else {
    res.status(404).send('Company not found');
  }

});


/*  /api/users - GET
 *  curl -XGET http://localhost:8000/api/users
 */
app.get(usersPrefix, (req, res) => {
  res.send(users);
});


/*  /api/users - POST
 *  curl -vv -XPOST -d "{\"name\": \"Siggi\", \"email\": \"sigurdura13@ru.is\"}" -H "Content-Type: Application/json" http://localhost:8000/api/users
 */
app.post(usersPrefix, (req, res) => {
  const data = req.body;
  data.id = uuid.v4();

  if (!data.hasOwnProperty('name')) {
    res.status(412).send('missing name');
  }

  if (!data.hasOwnProperty('email')) {
    res.status(412).send('missing email');
  }

  var newUser = {
    name: data.name,
    email: data.email,
    id: data.id
  };

  users.push(newUser);
  res.json(true);
});


/* SERVER */
app.listen(port, () => {
  console.log('Server is on port:', port);
});
