const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(port, (req, res) => {
    console.log(`Project dang chay duoi port ${port}`);
});
