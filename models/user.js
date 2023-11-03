const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Invalid email address'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                // Validate password strength (e.g., at least 8 characters, with a digit, lowercase, and uppercase letter)
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
            },
            message: 'Password is too weak',
        }
    },
    fullName: String
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch(error) {
        return next(error);
    }
})

const User = mongoose.model('users', userSchema);

module.exports = User;