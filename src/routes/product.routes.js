import { Router } from "express";
import { ProductManager } from "../productManager.js"

const myProductManager = new ProductManager('./products.txt')
const productsRouters = Router()

// Get

productsRouters.get('/', async (req, res) => {
    let { limit } = req.query

    const productLimit = (await myProductManager.getProducts()).slice(0, limit)

    limit ? res.send(productLimit) : res.send(product)

    const product = await myProductManager.getProducts()
})

productsRouters.get('/:id', async (req, res) => {
    const product = await myProductManager.getProductById(req.params.id)
    res.send(product)
})

// Post

productsRouters.post("/", async(req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body
    await myProductManager.addProduct({ title, description, price, thumbnail, code, stock })
    res.send("Product added")
})

// Put

productsRouters.put("/:id", async(req, res) => {
    const id = req.params.id
    const { title, description, price, thumbnail, code, stock } =req.body

    const message = await myProductManager.updateProduct(id, {title, description, price, thumbnail, code, stock})
    res.send(message)
})

// Delete 

productsRouters.delete("/:id", async(req, res) => {
    const id = req.params.id
    const message = await myProductManager.deleteProduct(id)
    res.send(message)
})

export default productsRouters
