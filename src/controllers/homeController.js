import connection from '../configs/connectDB';

const getHomePage = (req, res) => {
    connection.query('SELECT * FROM users', function (err, results, fields) {
        res.render('home', { dataUser: results });
    });

    // const [rows, fields] = await pool.execute('SELECT * FROM users');
    // return res.render('home', { dataUser: rows });
};

const getDetailPage = (req, res) => {
    const userId = req.params.id;
    connection.query(`SELECT * FROM users where id = ${userId}`, function (err, results, fields) {
        res.send(JSON.stringify(results));
    });
};
module.exports = {
    getHomePage,
    getDetailPage,
};
