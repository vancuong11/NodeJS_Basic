// const express = require('express');
import express from 'express';
import configViewEngine from './configs/viewEngine';
require('dotenv').config();

const app = express();
const port = process.env.PORT;

configViewEngine(app);

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
// truyen bien cho view / Sử dụng lệnh If
app.get('/', (req, res) => {
    res.render('home', { title: 'Trang chu', day: 'Thứ Năm' });
});

// Sử dụng vòng lặp
app.get('/sp', (req, res) => {
    var sp = [
        { name: 'HTC M9', price: 6000000 },
        { name: 'Samsung S8', price: 750000 },
    ];
    res.render('sp', { sp: sp });
});

// Nhận tham số dạng từ url

app.get('/search/:keyword/:page', (req, res) => {
    let str = `keyword= ${req.params.keyword}<br>`;
    str += `page= ${req.params.page}`;
    res.send(str);
});

app.get('/cat', (req, res, next) => {
    str = `idcat= ${req.query.idcat} <br>`;
    str += `page= ${req.query.page}`;
    res.send(str);
});

// Sử dụng form addEmail
app.get('/addEmail', (req, res) => {
    res.render('formEmail');
});

app.post('/addEmail', (req, res) => {
    const email = req.body.email;
    res.send(email);
});

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
