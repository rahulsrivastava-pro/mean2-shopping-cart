var mongoose = require('mongoose');

var sizeSchema = mongoose.Schema({
    name: String,
    code: String
});

var Sizes = mongoose.model('Sizes', sizeSchema);

module.exports = Sizes;