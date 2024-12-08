
const express = require('express')
const router = express.Router()
const path = require('path')

const basePath = path.join(__dirname, '../pages')

router.get('/page2', (req, res) => {
    res.sendFile(`${basePath}/page2.html`)
})

router.get('/page3', (req, res) => {
    res.sendFile(`${basePath}/page3.html`)
})

module.exports = router