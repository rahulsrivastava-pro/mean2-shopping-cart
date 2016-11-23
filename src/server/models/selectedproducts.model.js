var mongoose = require('mongoose');

var selectedProductSchema = mongoose.Schema({
    p_id: String,
    p_sizecode: String,
    p_colorcode: String,
    p_quantity: String
});

var SelectedProducts = mongoose.model('SelectedProducts', selectedProductSchema);

module.exports = SelectedProducts;