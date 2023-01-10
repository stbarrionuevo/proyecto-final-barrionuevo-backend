const express = require('express')
const app = express();

const fs = require('fs')
const server = require('http').createServer(app)


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./views'))




const productsRouter = require('./router/productsRouter');
app.use('/api', productsRouter)


const cartRouter = require('./router/cartRouter');
app.use('/cart', cartRouter)

const PORT = 8080;



server.listen(PORT , console.log(`------------ SERVER READY IN PORT: ${PORT} ------------`))