const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String
    },
    color: {
        type: String
    },
    image: {
        type: String,
        required: true
    }
})
categorySchema.plugin(uniqueValidator);

exports.Category = mongoose.model('Category', categorySchema);