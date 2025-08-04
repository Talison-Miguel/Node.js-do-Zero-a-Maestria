const conn = require('../db/conn')
const { ObjectId } = require('mongodb');

class Product {
    constructor(name, price, description, image) {
        this.name = name
        this.price = price
        this.description = description
        this.image = image
    }

    save() {
        const product = conn.db().collection('products').insertOne({
            name: this.name, 
            price: this.price,
            description: this.description,
            image: this.image
        })

        return product
    }

    static getProducts() {
        const products = conn.db().collection('products').find().toArray()

        return products 
    }

    static async getProductById(id) {
        if (!ObjectId.isValid(id)) {    
        throw new Error('ID inválido');
        }

        const product = await conn.db().collection('products').findOne({ _id: new ObjectId(id) });

        return product;
    }

    static async deleteProductById(id) {
        await conn.db().collection('products').deleteOne({ _id: new ObjectId(id) });

        return
    }
    static async updateProduct(product) {
        await conn.db().collection('products').updateOne(
            { _id: new ObjectId(product._id) },
            { $set: { name: product.name, price: product.price, description: product.description, image: product.image } }
        );

        return
    }
}

module.exports = Product;