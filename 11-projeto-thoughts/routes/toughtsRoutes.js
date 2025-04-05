const express = require('express')
const ToughtController = require('../controllers/ToughtController')
const router = express.Router()

//controller

router.get('/', ToughtController.showToughts)

module.exports = router