var mongoose = require('mongoose');

var colorSchema = mongoose.Schema({
    name: String,
    hexcode: String
});

var Colors = mongoose.model('Colors', colorSchema);

module.exports = Colors;