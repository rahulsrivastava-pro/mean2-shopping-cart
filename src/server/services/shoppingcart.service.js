
var express = require('express');

// Models
var Cat = require('../models/cat.model.js');
var Colors = require('../models/colors.model.js');
var Sizes = require('../models/sizes.model.js');
var Products = require('../models/products.model.js');
var SelectedProducts = require('../models/selectedproducts.model.js');
var Payment = require('../models/payment.model.js');



var calculatePaybleAmount = function(productId, mode)
{
    var price = 0;
    Products.findOne({ p_id: productId }, function (err, product) {
        var oldquanitity = 0;
        var quanitity = 0;
        var subTotal = 0;

        if (!err) {
            if (product) {
                price = parseFloat(product.p_originalprice);
                Payment.findOne({}, function (err, obj) {
                    if (!err) {
                        if (!obj && mode == "ADD") {
                            obj = new Payment({ subtotal: price.toString(), quantity: 1 });
                            obj.save(function (err) { console.log('large: Size saved successfully'); });
                        }
                        else
                        {
                            oldquanitity = (parseInt(obj.quantity) - 0);
                            if (mode == "ADD") {
                                quanitity = (parseInt(obj.quantity) - 0) + 1;
                                subTotal = (parseFloat(obj.subtotal) + parseFloat(price)).toString();
                            }
                            else {// REMOVE
                                quanitity = (parseInt(obj.quantity) - 0) - 1;
                                subTotal = (parseFloat(obj.subtotal) - parseFloat(price)).toString();
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
  
    // =======================
    // routes ================
    // =======================
    // basic route

      /*
  // APIs
  // select all
  app.get('/cats', function(req, res) {
    Cat.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });

  // count all
  app.get('/cats/count', function(req, res) {
    Cat.count(function(err, count) {
      if(err) return console.error(err);
      res.json(count);
    });
  });

  // create
  app.post('/cat', function(req, res) {
    var obj = new Cat(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  // find by id
  app.get('/cat/:id', function(req, res) {
    Cat.findOne({_id: req.params.id}, function(err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    })
  });

  // update by id
  app.put('/cat/:id', function(req, res) {
    Cat.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });

  // delete by id
  app.delete('/cat/:id', function(req, res) {
    Cat.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });
  */

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

    // get all selected products
    app.get('/selectedproducts', function(req, res) {
            SelectedProducts.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        });
    });


    // create
    app.post('/selectedproducts', function(req, res) {

        var productId = req.body.p_id;
        var sizeCode = req.body.p_sizecode;
        var colorCode = req.body.p_colorcode;
        var quantity = 0;
        
        SelectedProducts.find({p_id: productId, p_sizecode:sizeCode, p_colorcode:colorCode}, function(err, product) 
        {
            console.log('product:' + product.length)
                if(!err) {
                    if (!product || product.length == 0) {
                        product = new SelectedProducts({ p_id: productId, p_sizecode: sizeCode, p_colorcode: colorCode, p_quantity: 1 });
                        console.log('product2:' + JSON.stringify(product))
                        product.save(function (err) {
                            if (!err) {
                                calculatePaybleAmount(productId, "ADD");
                                console.log('product  saved successfully');
                            }
                        });
                    }
                    else {
                        console.log('product2:' + JSON.stringify(product));
                        var quant = (parseInt(product.length) - 0) + 1;
                        console.log('quantity:' + quant);
                        product.p_quantity = quant;
                        SelectedProducts.findOneAndUpdate({ p_id: productId, p_sizecode: sizeCode, p_colorcode: colorCode }, { $set: { p_quantity: quant } }, { upsert: true, new: true }, function (err, doc) {
                            if (err) {
                                console.log("Something wrong when updating data!");
                            }
                            calculatePaybleAmount(productId, "ADD");
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

        var productId = req.params.old_p_id;

        var oldSizeCode = req.params.old_p_sizecode;
        var oldColorCode = req.params.old_p_colorcode;

        var newSizeCode = req.params.new_p_sizecode;
        var newColorCode = req.params.new_p_colorcode;

        SelectedProducts.findOneAndUpdate({ p_id: productId, p_sizecode: oldSizeCode, p_colorcode: oldColorCode }, { $set: { p_sizecode: newSizeCode, p_colorcode: oldColorCode } }, { upsert: true, new: true }, function (err, doc) {
            if (err) {
                console.log("Something wrong when updating data!");
            }

            console.log("updated" + JSON.stringify(doc));
            console.log('product  updated successfully');

        });

        res.sendStatus(200);
    });

     // delete products
    app.post('/deleteselectedproducts', function(req, res) {

        var productId = req.params.p_id;
        var sizeCode = req.params.p_sizecode;
        var colorCode = req.params.p_colorcode;

        SelectedProducts.findOneAndRemove({p_id: productId, p_sizecode:sizeCode, p_colorcode:colorCode}, function(err) {
            if (err) return console.error(err);
            calculatePaybleAmount(productId, "REMOVE");
            res.sendStatus(200);
        });
    });


    app.get('/calculateTotal', function(req, res) {

        var _subTotal = 0;
        var _discount = 0;
        var _netAmount = 0;
        var _quantity = 0;
           
        Payment.findOne({}, function (err, obj) {
            if (!err) {
                if (obj) {
                    _subTotal = parseFloat(obj.subtotal);
                    _quantity = parseInt(obj.quantity);

                    if(_quantity == 3)
                    {
                        _discount = 0.05 * parseFloat(_subTotal); // 5%
                    }
                    else if (_quantity > 3 && _quantity <= 6) {
                        _discount = 0.1 * parseFloat(_subTotal); // 10%
                    }
                    else if(_quantity>10){
                        _discount = 0.25 * parseFloat(_subTotal); // 25%
                    }
                    _netAmount = parseFloat(_subTotal) - parseFloat(_discount);

                    _subTotal = parseFloat(_subTotal).toFixed(2);
                    _discount = parseFloat(_discount).toFixed(2);
                    _netAmount = parseFloat(_netAmount).toFixed(2);

                    res.status(200).json({ subTotal: _subTotal.toString(), discount: _discount.toString(), netAmount: _netAmount.toString() });
                }
            }
        });
        res.status(200);
    });

};

