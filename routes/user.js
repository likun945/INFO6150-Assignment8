const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const { verifyToken, userCanEdit } = require('../middlewares/authMiddleware');

router.post('/create', UserController.createUser);

router.put('/edit', verifyToken, userCanEdit, UserController.editUser);

router.delete('/delete', verifyToken, userCanEdit, UserController.deleteUser);

router.get('/getAll', UserController.getAllUsers);

module.exports = router;
