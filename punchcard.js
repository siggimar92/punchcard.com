'use strict';

const express = require('express');
const bodyParser = require('body-parser');
//const uuid = require('node-uuid');
const _ = require('lodash');

const port = 8000;
const app = express();
const companies = [{"name": "Apple", "punchCount": "10"},{"name": "Microsoft", "punchCount": "22"}];
const users = [{"name": "Gunnar", "email": "g@g.is", "id":"0", "punches": [{ "companyID":"0","dateAdded": "2014-10-10" },{ "companyID":"1","dateAdded": "2015-12-12" }]}];
const punches = [];
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
	var index = companies.length;
	console.log("Company: ", index);
	//data.id = uuid.v4();

	if (!data.hasOwnProperty('name')) {
		res.status(412).send('missing name');
	}

	if (!data.hasOwnProperty('punchCount')) {
		res.status(412).send('missing punchCount');
	}

	var newCompany = {
		name: data.name,
		punchCount: data.punchCount,
		id: index
		//id: data.id
	};

	companies.push(newCompany);
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

/*  /api/users/{id}/punches?company={id} - GET  */
app.get(usersPrefix + '/:id/punches', (req, res) => {
	const id = req.params.id;
	const compID = req.query.company;

	const userEntry = _.find(users, (usr) => {
		return usr.id === id;
	});

	if (userEntry) {
    // if there is a parameter for company id
		if(compID != undefined) {

      const punchesCompany = [];
			for (var i = 0; i < userEntry.punches.length; i++) {
				if (compID === userEntry.punches[i].companyID) {
					punchesCompany.push(userEntry.punches[i]);
				}
			}

			if(punchesCompany) {
				res.send(punchesCompany);
			} else {
				res.status(404).send('Punch not found');
			}

		} else {
			res.send(userEntry.punches);
		}
	} else {
		res.status(404).send('User not found');
	}
});

/*  /api/users - POST
 *  curl -vv -XPOST -d "{\"name\": \"Siggi\", \"email\": \"sigurdura13@ru.is\"}" -H "Content-Type: Application/json" http://localhost:8000/api/users
 */
app.post(usersPrefix, (req, res) => {
	const data = req.body;
	var index = users.length;
	console.log("User: ", index);
	//data.id = uuid.v4();

	if (!data.hasOwnProperty('name')) {
		res.status(412).send('missing name');
	}

	if (!data.hasOwnProperty('email')) {
		res.status(412).send('missing email');
	}

	var newUser = {
		name: data.name,
		email: data.email,
		id: index,
		//id: data.id,
		punches: data.punches
	};

	users.push(newUser);
	res.json(true);
});


/* SERVER */
app.listen(port, () => {
	console.log('Server is on port:', port);
});
