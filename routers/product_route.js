const express = require('express');
const router = express.Router();

//import model
const {Product} = require('../models/products');
const {Category} = require('../models/category');
/**
 *
 *  API examples 
 */

//Add product with category id
router.post(`/`, async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);
        if(!category){
            return res.status(400).json({success: false, message: 'Invalid category'});
        }
    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
    
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured
    })

    product.save().then((createdProduct) => {
        return res.status(200).json({success: true, data: createdProduct, message: 'Product added successfully!'});
    }).catch((err) => {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    })
})


//Get all product from database
router.get(`/`, async (req, res) => {
    const productList = await Product.find().populate('category');
    if(!productList){
        res.status(500).json({success: false})
    }
    res.status(200).json({success: true, data: productList});
});

//Get a product by id 
router.get('/details/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate('category');
        
        if(!product)
            return res.status(404).json({success: false, message: 'Product not found!'});
        else
            return res.status(200).json({success: true, message: 'Product found!', data: product});
    } catch (error) {
        return res.status(404).json({success: false, message: error.message});
    }
});

//Get all product name and image from database
router.get('/getname', async (req, res) => {
    const productList = await Product.find().select('name image -_id');
    if(!productList){
        res.status(500).json({success: false})
    }
    res.status(200).json({success: true, data: productList});
});

//Update product 
router.put('/:productId', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.productId,
            {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: req.body.image,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                isFeatured: req.body.isFeatured
            },
            {new : true}
        )
        if(product){
            return res.status(200).json({success: true, message: 'Product updated successfully!', data: product});
        }else{
            return res.status(404).json({success: true, message: 'Product not updated!'});
        }
    } catch (error) {
        return res.status(404).json({success: true, message: error.message});
    }
});

//Update product stock 
router.put('/updatestock/:productId', async(req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            req.params.productId,
            {
                countInStock: req.body.countInStock,
            },
            {new : true}
        ).populate('category');
        if(product){
            return res.status(200).json({success: true, message: 'Stock updated', data: product});
        }else{
            return res.status(404).json({success: false, message: 'Stock not updated'}); 
        }
    } catch (error) {
        return res.status(404).json({success: false, message: error.message}); 
    }
});


//Update product category 
router.put('/updatecategory/:productId', async(req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            req.params.productId,
            {
                category: req.body.category,
            },
            {new : true}
        ).populate('category');
        if(product){
            return res.status(200).json({success: true, message: 'category updated', data: product});
        }else{
            return res.status(404).json({success: false, message: 'category not updated'}); 
        }
    } catch (error) {
        return res.status(404).json({success: false, message: error.message}); 
    }
});

//Make product featured
router.put('/makefeatured/:productId', async(req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            req.params.productId,
            {
                isFeatured: req.body.isFeatured,
            },
            {new : true}
        ).populate('category');
        if(product){
            return res.status(200).json({success: true, message: 'Product status changed', data: product});
        }else{
            return res.status(404).json({success: false, message: 'Product status not changed'}); 
        }
    } catch (error) {
        return res.status(404).json({success: false, message: error.message}); 
    }
});

module.exports = router;