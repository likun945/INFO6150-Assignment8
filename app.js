const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost/INFO6150';

mongoose.connect(dbURL, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes);

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});