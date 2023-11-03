const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user'); // Import your Mongoose User model

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost/INFO6150', { useNewUrlParser: true });

app.use(bodyParser.json());

// Create a new user with error handling
app.post('/user/create', async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        const user = new User({ email, password, fullName });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/user/:id', async (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});