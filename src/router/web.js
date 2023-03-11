import express from 'express';
import homeController from '../controllers/homeController';

let router = express.Router();

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

    return app.use('/', router);
};

export default initWebRoute;
