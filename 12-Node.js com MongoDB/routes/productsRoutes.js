const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/ProductController')


router.get('/', ProductController.showProducts)
router.get('/create', ProductController.creteProduct)
router.post('/create', ProductController.creteProductPost)
router.get('/edit/:id', ProductController.editProduct)
router.post('/edit', ProductController.editProductPost)
router.get('/:id', ProductController.getProduct)
router.post('/remove/:id', ProductController.deleteProduct)

module.exports = router;