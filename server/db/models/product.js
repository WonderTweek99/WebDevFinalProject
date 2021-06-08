const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    stock: {
        type: Number,
        min: 0,
        required: true
    }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

module.exports = Product
