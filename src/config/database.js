const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pets_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log('Conectado ao banco de dados!');
        connection.release();
    })
    .catch(error => {
        console.error('Erro ao conectar com o banco de dados', error.message);
    });

module.exports = pool;