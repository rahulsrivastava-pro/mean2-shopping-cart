
var express = require('express');

// Models
var Colors = require('../models/colors.model.js');
var Sizes = require('../models/sizes.model.js');
var Products = require('../models/products.model.js');
var SelectedProducts = require('../models/selectedproducts.model.js');
var Payment = require('../models/payment.model.js');



var calculatePaybleAmount = function(productId, mode, quantity_new, quantity_old)
{
    var price = 0;
    Products.findOne({ p_id: productId }, function (err, product) {
        var oldquanitity = 0;
        var quanitity = parseInt(quantity_new);
        var subTotal = 0;

        if (!err) {
            if (product) {
                price = parseFloat(product.p_originalprice);
                Payment.findOne({}, function (err, obj) {
                    if (!err) {
                        if (!obj && mode == "ADD") {
                            subTotal = ((parseFloat(price) * quanitity)).toString();
                            var net_quantity = parseInt(quanitity);
                            obj = new Payment({ subtotal: subTotal, quantity: net_quantity });
                            obj.save(function (err) { console.log('large: Size saved successfully'); });
                        }
                        else
                        {
                            var oldquanitity = (parseInt(obj.quantity) - 0);
                            var q_old = parseInt(quantity_old);
                            var q_new = parseInt(quantity_new);
                            if (mode == "ADD") {
                                quanitity = parseInt(quanitity);
                                subTotal = (parseFloat(obj.subtotal) + (parseFloat(price) * quanitity)).toString();
                                quanitity = quanitity + oldquanitity;
                            }
                            else if (mode == "EDIT") {
                                quanitity = oldquanitity + q_new - q_old;
                                console.log('quant-calcu: oldquanitity' + oldquanitity + ' q_new:' + q_new + '  q_old:' +q_old);
                                subTotal = (parseFloat(obj.subtotal) + (parseFloat(price) * q_new) - (parseFloat(price) * q_old)).toString();
                            }
                            else {// REMOVE
                                subTotal = (parseFloat(obj.subtotal) - (parseFloat(price) * quanitity)).toString();
                                quanitity = (parseInt(obj.quantity) - 0) - quanitity;
                            }


                            Payment.findOneAndUpdate({ quantity: oldquanitity }, { $set: { quantity: quanitity, subtotal: subTotal } }, { upsert: true, new: true }, function (err, doc) {
                                if (err) {
                                    console.log("Something wrong when updating data!");
                                }

                                console.log("updated" + JSON.stringify(doc));
                                console.log('payment  updated successfully');

                            });
                        }

                    }
                });
            }
        }
    });
    
    


}

module.exports = function(app) {
  'use strict';
  
app.get('/setup', function(req, res) {
    
     // save Color master set
      var colorGreen = new Colors({name: 'green',hexcode: '#A3D2A1'});
      colorGreen.save(function (err) {console.log('green: Color saved successfully');});
      var colorYellow = new Colors({name: 'yellow',hexcode: '#F9F8E6'});
      colorYellow.save(function (err) {console.log('yellow: Color saved successfully');});
      var colorRed = new Colors({name: 'red',hexcode: '#ED99A8'});
      colorRed.save(function (err) {console.log('red: Color saved successfully');});

      // save Sizes master set
      var sizeSmall = new Sizes({name: 'small',code: 's'});
      sizeSmall.save(function (err) {console.log('small: Size saved successfully');});
      var sizeMedium = new Sizes({name: 'medium',code: 'm'});
      sizeMedium.save(function (err) {console.log('medium: Size saved successfully');});
      var sizeLarge = new Sizes({name: 'large',code: 'l'});
      sizeLarge.save(function (err) {console.log('large: Size saved successfully');});
      var sizeXLarge = new Sizes({name: 'extra large',code: 'xl'});
      sizeXLarge.save(function (err) {console.log('extra large: Size saved successfully');});

      // save Products master set
      var productA = new Products({p_id: '1',p_name: 'cotton tshirt', p_variation:'solid green', p_style:'ms13kt1906', p_originalprice:'11.0', p_currency:'$', p_image:'T1.jpg'});
      productA.save(function (err) {console.log('product A saved successfully');});
      var productB = new Products({p_id: '2',p_name: 'print girls tee', p_variation:'pink rainbow', p_style:'ms13kt1906', p_originalprice:'17.0', p_currency:'$', p_image:'T2.jpg'});
      productB.save(function (err) {console.log('product B saved successfully');});
      var productC = new Products({p_id: '3',p_name: 'flower pattern shirt', p_variation:'blue', p_style:'ms13kt1906', p_originalprice:'21.0', p_currency:'$', p_image:'T3.jpg'});
      productC.save(function (err) {console.log('product C saved successfully');});
      var productD = new Products({p_id: '4',p_name: 'check pattern tshirt', p_variation:'mens red', p_style:'ms13kt1906', p_originalprice:'22.0', p_currency:'$', p_image:'T4.jpg'});
      productD.save(function (err) {console.log('product D saved successfully');});

      res.sendStatus(200);

  });

    
    // get all colors
    app.get('/colors', function(req, res) {
            Colors.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        });
    });

    // get all sizes
    app.get('/sizes', function(req, res) {
            Sizes.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        });
    });

    // get all products
    app.get('/products', function(req, res) {
            Products.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        });
    });

    app.get('/products/:id', function (req, res) {
        Products.findOne({ p_id: req.params.id }, function (err, obj) {
            if (err) return console.error(err);
            res.json(obj);
        })
    });

    // get all selected products
    app.get('/selectedproducts', function (req, res) {
        var productsArr = [];
        var productsList = [];
        Products.find({}).lean().exec(function (err, productInfo) {
            productsArr = productInfo;
            SelectedProducts.find({}).lean().exec(function (err, products) {
                for (var i = 0; i < products.length; i++) {
                    for (var j in productsArr) {
                        if (productsArr[j].p_id == products[i].p_id) {
                            products[i].info = productsArr[j];
                        }
                    }
                }
                productsList = products;
                return res.end(JSON.stringify(productsList));
            });
        });
    });

    // create
    app.post('/selectedproducts', function(req, res) {

        var productId = req.body.p_id;
        var sizeCode = req.body.p_sizecode;
        var colorCode = req.body.p_colorcode;
        var quantity = req.body.p_quantity;
        
        SelectedProducts.findOne({ p_id: productId, p_sizecode: sizeCode, p_colorcode: colorCode }, function (err, product)
        {
           
                if(!err) {
                    if (!product) {
                        product = new SelectedProducts({ p_id: productId, p_sizecode: sizeCode, p_colorcode: colorCode, p_quantity: quantity });
                        console.log('product2:' + JSON.stringify(product))
                        product.save(function (err) {
                            if (!err) {
                                calculatePaybleAmount(productId, "ADD", quantity);
                                console.log('product  saved successfully');
                            }
                        });
                    }
                    else {
                        console.log('product2:' + JSON.stringify(product));
                        var quant = parseInt(quantity);
                        var old_quant = parseInt(product.p_quantity);
                        console.log('quantity:' + quant);

                        SelectedProducts.findOneAndUpdate({ p_id: productId, p_sizecode: sizeCode, p_colorcode: colorCode }, { $set: { p_quantity: quant } }, { upsert: true, new: true }, function (err, doc) {
                            if (err) {
                                console.log("Something wrong when updating data!");
                            }
                            calculatePaybleAmount(productId, "EDIT", quant, old_quant);
                            console.log("updated" + JSON.stringify(doc));
                            console.log('product  updated successfully');

                        });
                    }
                }
        });
        res.sendStatus(200);
    });

    // update products
    app.post('/updateselectedproducts', function(req, res) {

        var productId = req.body.p_id;

        var oldSizeCode = req.body.old_p_sizecode;
        var oldColorCode = req.body.old_p_colorcode;

        var newSizeCode = req.body.new_p_sizecode;
        var newColorCode = req.body.new_p_colorcode;

        var quant_old = req.body.old_p_quantity;
        var quant_new = req.body.new_p_quantity;

        //console.log("old" + JSON.stringify(req.body));

        SelectedProducts.findOneAndUpdate({ p_id: productId, p_sizecode: oldSizeCode, p_colorcode: oldColorCode }, { $set: { p_sizecode: newSizeCode, p_colorcode: newColorCode, p_quantity: quant_new } }, { upsert: true, new: true }, function (err, doc) {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            calculatePaybleAmount(productId, "EDIT", quant_new, quant_old);
            console.log("updated" + JSON.stringify(doc));
            console.log('product  updated successfully');

        });

        res.sendStatus(200);
    });

     // delete products
    app.post('/deleteselectedproducts', function(req, res) {

        var productId = req.body.p_id;
        var sizeCode = req.body.p_sizecode;
        var colorCode = req.body.p_colorcode;
        var quantity = req.body.p_quantity;

        SelectedProducts.findOneAndRemove({p_id: productId, p_sizecode:sizeCode, p_colorcode:colorCode}, function(err) {
            if (err) return console.error(err);
            calculatePaybleAmount(productId, "REMOVE", quantity);
            res.sendStatus(200);
        });
    });


    app.get('/calculateTotal', function(req, res) {

        var _subTotal = 0;
        var _discount = 0;
        var _netAmount = 0;
        var _quantity = 0;
        var enableFreeShipping = false;
        var enableDiscount = false;
        var shippingPrice = 5;
        shippingPrice = parseFloat(shippingPrice).toFixed(2);

        Payment.findOne({}, function (err, obj) {
            if (!err) {
                if (obj) {
                    _subTotal = parseFloat(obj.subtotal);
                    _quantity = parseInt(obj.quantity);

                    if (_subTotal > 50)
                    {
                        enableFreeShipping = true;
                        shippingPrice = 0;
                    }
                    if(_quantity == 3)
                    {
                        enableDiscount = true;
                        _discount = 0.05 * parseFloat(_subTotal); // 5%
                    }
                    else if (_quantity > 3 && _quantity <= 6) {
                        enableDiscount = true;
                        _discount = 0.1 * parseFloat(_subTotal); // 10%
                    }
                    else if (_quantity > 10) {
                        enableDiscount = true;
                        _discount = 0.25 * parseFloat(_subTotal); // 25%
                    }
                    _netAmount = parseFloat(_subTotal) - parseFloat(_discount) + parseFloat(shippingPrice);

                    _subTotal = parseFloat(_subTotal).toFixed(2);
                    _discount = parseFloat(_discount).toFixed(2);
                    _netAmount = parseFloat(_netAmount).toFixed(2);

                    res.status(200).json({ subTotal: _subTotal.toString(), discount: _discount.toString(), netAmount: _netAmount.toString(), enableFreeShipping: enableFreeShipping, enableDiscount: enableDiscount, shippingPrice: shippingPrice });
                }
            }
        });
        res.status(200);
    });

};

