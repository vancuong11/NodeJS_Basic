import express from 'express';
import APIController from '../controllers/APIController';
let router = express.Router();

const initApiRoute = (app) => {
    // truyen bien cho view / Sử dụng lệnh If
    router.get('/user', APIController.getAllUser); // method GET
    router.post('/createNewUser', APIController.createNewUser); // method POST
    router.put('/update-user/:id', APIController.updateUser); // method PUT
    router.delete('/delete-user/:id', APIController.deleteUser); // method DELETE

    return app.use('/api/v1', router);
};

export default initApiRoute;
