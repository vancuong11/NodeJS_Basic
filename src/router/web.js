import express from 'express';
import homeController from '../controllers/homeController';

let router = express.Router();

const initWebRoute = (app) => {
    // truyen bien cho view / Sử dụng lệnh If
    router.get('/', homeController.getHomePage);

    // trang thoong tin chi tiet
    router.get('/detail/users/:id', homeController.getDetailPage);

    return app.use('/', router);
};

export default initWebRoute;
