const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage});

router.post('/register', userController.registerUser);
router.get('/users', userController.getAllUsers);
router.post('/login', userController.loginUser);
router.get('/profile/:userId', userController.getUserProfile);
router.get('/orders/:userId', userController.getUserOrders);
router.post('/create', userController.createNewUser);
router.post('/orders', userController.createOrder);
router.delete('/orders/:orderId', userController.deleteOrder);

router.post('/profile/avatar', upload.single('avatar'), userController.uploadAvatar);

module.exports = router;