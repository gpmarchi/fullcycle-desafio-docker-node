const express = require('express')
const app = express()
const port = 3000

const config = {
	host: 'fullcycle_docker_mysql',
	user: 'root',
	password: 'root',
	database: 'nodedb',
};

const mysql = require('mysql');

const connection = mysql.createConnection(config);
const create_table = `CREATE TABLE people(id int not null auto_increment, name varchar(255), primary key(id))`;
connection.query(create_table);

const sql1 = `INSERT INTO people(name) values ('Maria')`;
const sql2 = `INSERT INTO people(name) values ('João')`;
const sql3 = `INSERT INTO people(name) values ('Pedro')`;
const sql4 = `INSERT INTO people(name) values ('José')`;
connection.query(sql1);
connection.query(sql2);
connection.query(sql3);
connection.query(sql4);

connection.end();

app.get('/', (req, res) => {
	const connection = mysql.createConnection(config);
	const sql = `SELECT * FROM people`;

	connection.query(sql, (err, results) => {
		let response = '<h1>Full Cycle Rocks!</h1><ul>';

		results.forEach(person => {
			response = response.concat(`<li>${person.name}</li>`);
		});

		response = response.concat('</ul>');

		res.send(response);
	});

	connection.end();
})

app.listen(port, () => {
	console.log(`Rodando na porta ${port}`)
})