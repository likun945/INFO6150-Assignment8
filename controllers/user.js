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

exports.editUser = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        if (email !== req.user.email) {
            return res.status(403).json({ message: 'Access denied. You can only edit your own information.' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (fullName) {
            // Validate full name (customize the validation as needed)
            if (!/^[a-zA-Z ]{1,50}$/.test(fullName)) {
                return res.status(400).json({ message: 'Invalid full name format' });
            }
            user.fullName = fullName;
        }
        if (password) {
            // Validate password (customize the validation as needed)
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
                return res.status(400).json({ message: 'Invalid password format' });
            }
            user.password = password;
        }
        await user.save();

        res.json({ message: 'User details updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.deleteOne();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'email fullName password -_id');
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = exports;
