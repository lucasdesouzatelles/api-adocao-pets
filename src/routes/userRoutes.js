const express = require('express');

const userController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', userController.createUser);

router.use(verifyToken);

router.get('/', isAdmin, userController.listUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', isAdmin, userController.deleteUser);

module.exports = router;
