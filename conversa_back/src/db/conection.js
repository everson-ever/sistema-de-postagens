const mysql = require('mysql');
const { promisify } = require('util');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'projetoBpAssunto'
});

// connection.connect(function(err) {
// 	if (!err) {
// 		module.exports = promisify(connection.query).bind(connection);
// 	} else {
// 		console.log(err.message);
// 	}
// });

module.exports = promisify(connection.query).bind(connection);
