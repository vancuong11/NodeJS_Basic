import connection from '../configs/connectDB';

const getHomePage = (req, res) => {
    let data = [];
    connection.query('SELECT * FROM `users`', function (err, results, fields) {
        res.render('home', { dataUser: results });
    });
};

module.exports = {
    getHomePage,
};
