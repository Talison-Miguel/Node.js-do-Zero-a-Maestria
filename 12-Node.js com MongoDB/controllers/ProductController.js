const Product = require('../models/Product')

module.exports = class ProductController {
    static async showProducts(req, res) {
        const products = await Product.getProducts()

        res.render('products/all', { products })
    }

    static creteProduct(req, res) {
        res.render('products/create')
    }

    static creteProductPost(req, res) {
        const {name, price, description, image} = req.body

        const product = new Product(name, price, description, image)

        product.save()

        res.redirect('/products')
    }

}