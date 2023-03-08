const express = require('express');

const configViewEngine = (app) => {
    // view engine configuration
    app.set('view engine', 'ejs');
    app.set('views', './src/views');

    // public folder configuration
    app.use(express.static('./src/public'));
};

export default configViewEngine;
