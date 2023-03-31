const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    quality: {
        type: Number,
    },
    category: {
        type: String,
    },
    deal: {
        type: Number
    }
});

const ProductModel = new mongoose.model('Product', ProductSchema);
module.exports = ProductModel;