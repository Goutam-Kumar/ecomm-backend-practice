
const mongoose = require('mongoose');
//Product schema definition
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

//mongoose model creation. 
module.exports = mongoose.model('Product', productSchema)