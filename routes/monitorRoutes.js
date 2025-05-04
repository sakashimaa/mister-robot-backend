const express = require('express');
const router = express.Router();
const monitorController = require('../controllers/monitorController');

router.get('/', monitorController.getAllMonitors);
router.post('/', monitorController.createNewMonitor);

module.exports = router;