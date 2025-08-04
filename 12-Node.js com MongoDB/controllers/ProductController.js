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

    static async getProduct(req, res) {
        const id = req.params.id
        const product = await Product.getProductById(id)

        res.render('products/product', { product })
    }

    static async deleteProduct(req, res) {
        const id = req.params.id
        const product = await Product.getProductById(id)

        res.render('products/product', { product })
    }

    static async deleteProduct(req, res) {
        const id = req.params.id
        await Product.deleteProductById(id)

        res.redirect('/products')
    }

    static async editProduct(req, res) {
        const id = req.params.id
        const product = await Product.getProductById(id)

        res.render('products/edit', { product })
    }

    static async editProductPost(req, res) {
        const { _id, name, price, description, image } = req.body

        const product = new Product(name, price, description, image);
        product._id = _id

        await Product.updateProduct(product)

        res.redirect('/products')
    }
}