// const express = require('express');
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './router/web';
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// setup view engine
configViewEngine(app);

// set up init web Router
initWebRoute(app);

// Form configuration
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// multer configuration
const multer = require('multer');
// Định nghĩa nơi lưu trữ, cách lấy file
const storage = multer.diskStorage({
    destination: (req, file, res) => {
        res(null, './src/public/upload');
    },
    filename: (req, file, res) => {
        res(null, Date.now() + '-' + file.originalname);
    },
});

// Khai báo đối tượng multer
// Lưu trữ trên máy tính với 2 tham số định nghĩa ở trên destination, filename
const upload = multer({
    storage: storage,
}).single('productImage');

// ------------------ Render Views ------------------------------

// Upload hình trong form
app.get('/upload', (req, res) => {
    res.render('upload');
});

app.post('/upload', (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log('A Multer error occurred when uploading.');
            res.json({ kq: 0, err: err });
        } else if (err) {
            console.log('An unknown error occurred when uploading.' + err);
            res.json({ kq: 0, err: err });
        } else {
            console.log('Upload is okay');
            console.log(req.file); // Thông tin file đã upload
            res.send({ kq: 1, file: req.file });
        }
    });
});

app.listen(port, () => {
    console.log(`Project dang chay duoi port ${port}`);
});
