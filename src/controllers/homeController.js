import connection from '../configs/connectDB';

const getHomePage = (req, res) => {
    let data = [];
    connection.query('SELECT * FROM `users`', function (err, results, fields) {
        results.map((row) => {
            data.push({
                id: row.id,
                email: row.email,
                address: row.address,
                firstName: row.firstName,
                lastName: row.lastName,
            });
        });
        res.render('home', { dataUser: JSON.stringify(data) });
    });
};

module.exports = {
    getHomePage,
};
