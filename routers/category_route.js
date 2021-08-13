const express = require('express');
const router = express.Router();

//import model
const {Category} = require('../models/category');

//get all categories 
router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();

    if(!categoryList){
        res.status(500).json({success: false, data: null})
    }
    res.status(200).json({success: true, data: categoryList, message: 'Category list found!'})
});

//add a category
router.post(`/`, async(req, res) => {
    var category  = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
        image: req.body.image
    })
    try {
        category = await category.save();
        if(!category)
            return res.status(404).json({success: false, message: 'Category cannot be created!'});
        res.status(200).json({success: true, data: category, message: 'Category created successfully'});
    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
    
});

//delete a category
router.delete('/:categoryId', (req, res) => {
    Category.findByIdAndRemove(req.params.categoryId).then(category => {
        if(category){
            return res.status(200).json({success: true, message: 'Category deleted successfully!'});
        }else{
            return res.status(404).json({success: false, message: 'Category not found!'});
        }
    }).catch(err => {
        return res.status(400).json({success: false, message: err});
    })
});

//get a category with id
router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category){
        return res.status(404).json({success: false, message: 'Category not found!'});
    }else{
        return res.status(200).json({success: true, message: 'Category found!', data: category});
    }
})


router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                image: req.body.image,
                icon: req.body.icon,
                color: req.body.color
            },
            {new: true}
        )
        if(category){
            return res.status(200).json({success: true, message: 'Category updated successfully!', data: category});
        }else{
            return res.status(404).json({success: true, message: 'Category not updated!'});
        } 
    } catch (error) {
        return res.status(404).json({success: true, message: error.message});
    }
    
})

module.exports = router;