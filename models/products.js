
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//Product schema definition
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        require: true
    },
    richDescription: {
        type: String,
        default: ''
    },
    image:{
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    countInStock : {
        type: Number,
        required: true,
        min: 0, 
        max: 10000
    },
    rating: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})
productSchema.plugin(uniqueValidator);
//mongoose model creation. 
exports.Product = mongoose.model('Product', productSchema);