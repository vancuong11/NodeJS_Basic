// get the client
import mysql from 'mysql2';
// import mysql from 'mysql2/promise';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodejsbasic',
});

// console.log('Creating connection pool...');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'nodejsbasic',
// });

export default connection;
