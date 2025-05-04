const express = require('express');
const router = express.Router();
const headphonesController = require('../controllers/heaphonesController');

router.get('/', headphonesController.getAllHeadphones);
router.post('/', headphonesController.createNewHeadphones);

module.exports = router;