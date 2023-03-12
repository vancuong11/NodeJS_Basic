import express from 'express';
import homeController from '../controllers/homeController';
import multer from 'multer';
let router = express.Router();

// handle file
const storage = multer.diskStorage({
    // dinh nghia noi luu tru
    destination: function (req, file, cb) {
        cb(null, './src/public/upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    },
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// 'profile_pic' is the name of our file input field in the HTML form
let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) => {
    // truyen bien cho view / Sử dụng lệnh If
    router.get('/', homeController.getHomePage);

    // trang thoong tin chi tiet
    router.get('/detail/user/:id', homeController.getDetailPage);

    // add user
    router.post('/create-new-user', homeController.createNewUser);

    // delete user
    router.get('/delete/user/:id', homeController.deleteUser);

    // edit user
    router.get('/edit/user/:id', homeController.editUser);
    router.post('/edit/user/:id', homeController.updateUser);

    // upload file
    router.get('/upload', homeController.uploadFile);
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadProfilePic);

    return app.use('/', router);
};

export default initWebRoute;
