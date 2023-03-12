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
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    } else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(
        `You have uploaded this image: <hr/><img src="/upload/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`,
    );
};

const handleUploadMultipleImages = (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    } else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = 'You have uploaded these images: <hr />';
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/upload/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
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
    handleUploadMultipleImages,
};
