const express = require('express');
const router = express.Router();
const keyboardController = require('../controllers/keyboardController');

router.get('/', keyboardController.getAllKeyboards);
router.post('/', keyboardController.createNewKeyboard);

module.exports = router;
