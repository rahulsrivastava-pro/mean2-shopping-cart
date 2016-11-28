var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    p_id: String,
    p_name: String,
    p_variation: String,
    p_style: String,
    p_originalprice: String,
    p_currency: String,
    p_image: String
});

var Products = mongoose.model('Products', productSchema);

module.exports = Products;