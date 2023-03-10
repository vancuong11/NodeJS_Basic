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

const createNewUser = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const address = req.body.address;

    connection.query(
        `INSERT INTO users(firstName, lastName, email, address) VALUES ('${firstName}', '${lastName}', '${email}', '${address}')`,
        function (err, results, fields) {
            res.redirect('/');
        },
    );
};

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
};
