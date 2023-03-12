import connection from '../configs/connectDB';

const getAllUser = (req, res) => {
    // httk method
    connection.query('SELECT * FROM users', function (err, results, fields) {
        res.status(200).json({
            message: 'ok',
            data: results,
        });
    });
};

const createNewUser = (req, res) => {
    // httk method
    const { firstName, lastName, email, address } = req.body;
    if (!firstName || !lastName || !email || !address) {
        res.status(200).json({
            massage: 'error',
        });
    }
    connection.query(
        'INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ?)',
        [firstName, lastName, email, address],
        function (err, results) {
            res.status(200).json({
                massage: 'ok',
            });
        },
    );
};

const updateUser = (req, res) => {
    const { firstName, lastName, email, address } = req.body;
    if (!firstName || !lastName || !email || !address) {
        res.status(200).json({
            massage: 'error',
        });
    }
    const userId = req.params.id;
    connection.query(
        'UPDATE users SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?',
        [firstName, lastName, email, address, userId],
        function (err, results, fields) {
            res.status(200).json({
                massage: 'ok',
            });
        },
    );
};

const deleteUser = (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        res.status(200).json({
            massage: 'error',
        });
    }
    connection.query('DELETE FROM users WHERE id = ?', [userId], function (err, results, fields) {
        res.status(200).json({
            massage: 'ok',
        });
    });
};

module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
};
