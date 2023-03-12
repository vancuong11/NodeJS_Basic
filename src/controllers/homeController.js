import multer from 'multer';
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
    connection.query('SELECT * FROM users where id = ?', [userId], function (err, results, fields) {
        res.send(JSON.stringify(results));
    });
};

const createNewUser = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const address = req.body.address;

    // Sử dụng destructuring get value form
    // const { firstName, lastName, email, address } = req.body;

    connection.query(
        'INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ?)',
        [firstName, lastName, email, address],
        function (err, results, fields) {
            res.redirect('/');
        },
    );
};

// trường hợp dùng method POST để xóa thì thêm một tag Input để get Id => sử dụng req.body để get Id từ tag Input => sử dụng SQL

const deleteUser = (req, res) => {
    const userId = req.params.id;
    connection.query('DELETE FROM users WHERE id = ?', [userId], function (err, results, fields) {
        res.redirect('/');
    });
};

const editUser = (req, res) => {
    const userId = req.params.id;
    connection.query('SELECT * FROM users WHERE id = ?', [userId], function (err, results, fields) {
        // console.log(results[0]);
        res.render('update', { dataUser: results[0] });
    });
};

const updateUser = (req, res) => {
    const userId = req.params.id;

    const { firstName, lastName, email, address } = req.body;
    connection.query(
        'UPDATE users SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?',
        [firstName, lastName, email, address, userId],
        function (err, results, fields) {
            res.redirect('/');
        },
    );
};

const uploadFile = (req, res) => {
    res.render('uploadFile');
};

const upload = multer().single('profile_pic');

let handleUploadProfilePic = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.file) {
            return res.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(
            `You have uploaded this image: <hr/><img src="/upload/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`,
        );
    });
};

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    editUser,
    updateUser,
    uploadFile,
    handleUploadProfilePic,
};
