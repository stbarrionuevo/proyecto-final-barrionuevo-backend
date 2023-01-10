const express = require('express');
const productsRouter = express.Router();
const products = require('../class/productsClass')

productsRouter.get('/productos', async (req, res) => {
    const allProducts = await products.getAll()
    res.json( allProducts )
  })
  

  productsRouter.get('/productos/:id', async (req, res) => {
    const id = Number(req.params.id)
    const product = await products.getById( id )
    product ? res.json( product )
      : res.status(404).send({ error: 'producto no encontrado'})
  })
  

  productsRouter.post('/productos', async (req, res) => {
    const productToAdd = req.body
    await products.save( productToAdd )
    res.redirect('/')
  })
  
  

  productsRouter.put('/productos/:id', async (req, res) => {
    const id = Number(req.params.id)
    const productToModify = req.body
  
    if(await products.getById( id )){
      let allProducts = await products.getAll()
      allProducts[ id - 1 ] = {"id": id, ...productToModify}
      products.saveFile( allProducts )
      res.send({ productToModify })
    } else {
      res.status(404).send({ error: 'id no valido'})
    }
  })
  
  
 
  productsRouter.delete('/productos/:id', async (req, res) => {
    const id = req.params.id
    const productToDelete = await products.getById( id )
  
    if (productToDelete) {
      await products.deleteById( id )
      res.send({ borrado: productToDelete})
    } else {
      res.status(404).send({ error: 'producto no encontrado'})
    }
  })
  



module.exports = productsRouter;