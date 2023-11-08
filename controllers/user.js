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
        res.success({ user }, 'User created successfully');
    } catch (error) {
        res.error(400, error.message);
    }
};

exports.editUser = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.error(404, 'User not found');
        }
        if (fullName) {
            if (!/^[a-zA-Z ]{1,50}$/.test(fullName)) {
                return res.error(400, 'Invalid full name format');
            }
            user.fullName = fullName;
        }
        if (password) {
            // Validate password (customize the validation as needed)
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
                return res.error(400, 'Invalid password format');
            }
            user.password = password;
        }
        await user.save();
        res.success({ user }, 'User details updated successfully');
    } catch (error) {
        res.error(500, 'Internal server error');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.error(404, 'User not found');
        }
        await user.deleteOne();
        res.success({ user }, 'User deleted successfully');
    } catch (error) {
        res.error(500, error.message);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'email fullName password -_id');
        if (!users || users.length === 0) {
            return res.error(404, 'No users found');
        }

        res.success({ users }, 'Users retrieved successfully');
    } catch (error) {
        res.error(500, 'Internal server error');
    }
};

module.exports = exports;
