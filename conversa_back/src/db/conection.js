const mysql = require('mysql');
const { promisify } = require('util');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'projetoBpAssunto'
});

module.exports = promisify(connection.query).bind(connection);

// connection.query('SELECT * FROM TbUsuario', (error, result) => {
// 	console.log(result);
// });

/*

connection.query('SELECT * FROM TbPostagens', (error, result) => {

});


*/
