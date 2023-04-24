import express from 'express'
import productsRouters from './routes/product.routes.js'
import cartsRouters from './routes/carts.routes.js'
import multer from 'multer'
import { __dirname, __filename } from '/path.js'

const app = express()
const PORT = 4000
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})

// Middleware

app.use(express.json()) // Me permite ejecutar json en la app
app.use(express.urlencoded({ extended: true})) // Me permite poder realizar consultas en (req.query)
const upload = (multer({ storage: storage })) 

// Routes
app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("Image uploaded")
app.use('/products', productsRouters)
app.use('/carts', cartsRouters)
app.use('/static', express.static(__dirname + '/public'))
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})