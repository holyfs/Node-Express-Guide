const path = require('path');

const express = require('express');

const notFoundController = require('../controllers/404.js');


const router = express.Router();

router.get('*',notFoundController.get404);

module.exports = router;