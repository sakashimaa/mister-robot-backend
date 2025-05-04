const express = require('express');
const router = express.Router();
const mouseController = require('../controllers/mouseController');

router.get('/', mouseController.getAllMouses);
router.post('/', mouseController.createNewMouse);

module.exports = router;