const express = require("express")
const router = express.Router()
const Product = require("../db/models/product")

router.get("/", async (req, res) => {
    const products = await Product.find()
    res.send(products)
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    Product.deleteOne({ _id: id })
        .then((doc) => {
            res.send(doc)
        })
        .catch((error) => {
            res.status(500).send(error)
        })
})

router.post("/", (req, res) => {
    const { name, brand, price, stock } = req.body
    const product = new Product({ name, brand, price, stock })
    product.save()
        .then((doc) => {
            res.send(doc)
        })
        .catch((error) => {
            res.status(500).send(error)
        })
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const products = await Product.findOne({ _id: id })
        res.send(products)
    }
    catch {
        res.status(404).send({ error: "UnU Error: no se encontró el producto" })
    }
})

router.patch("/:id", async (req, res) => {
    const { id } = req.params

    const { name, brand, price, stock } = req.body
    const newProduct = { name, brand, price, stock }
    for (let x in newProduct) {
        if (!newProduct[x]) delete newProduct[x]
    }
    try {
        const productEdit = await Product.findOneAndUpdate({ _id: id }, newProduct)
        res.send(productEdit)
    }
    catch {
        res.status(404).send({ error: "UnU Error: no se encontró el producto" })
    }
})
module.exports = router