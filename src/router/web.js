import express from 'express';
import homeController from '../controllers/homeController';

let router = express.Router();

const initWebRoute = (app) => {
    // truyen bien cho view / Sử dụng lệnh If
    router.get('/', homeController.getHomePage);

    // Sử dụng vòng lặp
    // router.get('/sp', (req, res) => {
    //     var sp = [
    //         { name: 'HTC M9', price: 6000000 },
    //         { name: 'Samsung S8', price: 750000 },
    //     ];
    //     res.render('sp', { sp: sp });
    // });

    // Nhận tham số dạng từ url
    // router.get('/search/:keyword/:page', (req, res) => {
    //     let str = `keyword= ${req.params.keyword}<br>`;
    //     str += `page= ${req.params.page}`;
    //     res.send(str);
    // });

    // router.get('/cat', (req, res, next) => {
    //     let str = `idcat= ${req.query.idcat} <br>`;
    //     str += `page= ${req.query.page}`;
    //     res.send(str);
    // });

    // Sử dụng form addEmail
    // router.get('/addEmail', (req, res) => {
    //     res.render('formEmail');
    // });

    // router.post('/addEmail', (req, res) => {
    //     const email = req.body.email;
    //     res.send(email);
    // });

    return app.use('/', router);
};

export default initWebRoute;
