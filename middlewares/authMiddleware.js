const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/index');

exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    const tokenWithoutPrefix = token.replace('Bearer ', '');
    jwt.verify(tokenWithoutPrefix, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: err });
        }
        req.user = decoded;
        next();
    });
}

exports.userCanEdit = (req, res, next) => {
    const { email } = req.body;
    if (email !== req.user.email) {
        return res.status(403).json({ message: 'Access denied. You can only edit your own information.' });
    }

    next();
};

