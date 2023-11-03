const User = require('../models/user');
const mongoose = require('mongoose');

exports.createUser = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        const user = new User({       
            userId: new mongoose.Types.ObjectId(),
            email, 
            password, 
            fullName 
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update user details route controller
exports.editUser = async (req, res) => {
    const userId = req.params.userId;
    const { fullName, password } = req.body;
    // Logic to update user details (full name and password)
    // Add validations for full name and password
    // Proper error message if user is not found
};

// Delete user by email route controller
exports.deleteUser = async (req, res) => {
    // Logic to delete a user by email
};

// Get all users' full name, email addresses, and passwords route controller
exports.getAllUsers = async (req, res) => {
    // Logic to retrieve and return full name, email addresses, and hashed passwords
};

module.exports = exports;
