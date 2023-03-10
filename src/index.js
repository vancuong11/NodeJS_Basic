// const express = require('express');
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './router/web';

require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Form configuration
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// setup view engine
configViewEngine(app);

// set up init web Router
initWebRoute(app);

app.listen(port, () => {
    console.log(`Project dang chay duoi port ${port}`);
});
