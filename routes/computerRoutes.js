const express = require('express');
const router = express.Router();
const computerController = require('../controllers/computerController');

router.get('/', computerController.getAllComputers);
router.post('/', computerController.createNewComputer);

module.exports = router;