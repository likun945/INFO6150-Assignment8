const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/index');
const routes = require('./routes/index');

const mongoose = require('mongoose');
mongoose.connect(config.dbURL, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});