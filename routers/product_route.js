const express = require('express');
const router = express.Router();

//import model
const Product = require('../models/products');

/**
 *
 *  API examples 
 */

//Create product
router.post(`/`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    product.save().then((createdProduct) => {
        res.status(201).json(createdProduct)
    }).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})


//Get all product from database
router.get(`/`, async (req, res) => {
    const productList = await Product.find();
    if(!productList){
        res.status(500).json({success: false})
    }
    res.send(productList);
})

module.exports = router;