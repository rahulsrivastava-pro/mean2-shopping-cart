var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../../dist'));
app.use('/', express.static(__dirname + '/../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var Cat = require('./cat.model.js');
var Colors = require('./colors.model.js');
var Sizes = require('./sizes.model.js');
var Products = require('./products.model.js');
var SelectedProducts = require('./selectedproducts.model.js');


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

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
      var productA = new Products({p_id: '1',p_name: 'cotton tshirt', p_variation:'solid green', p_style:'ms13kt1906', p_originalprice:'11.0', p_currency:'$'});
      productA.save(function (err) {console.log('product A saved successfully');});
      var productB = new Products({p_id: '2',p_name: 'print girls tee', p_variation:'pink rainbow', p_style:'ms13kt1906', p_originalprice:'17.0', p_currency:'$'});
      productB.save(function (err) {console.log('product B saved successfully');});
      var productC = new Products({p_id: '3',p_name: 'flower pattern shirt', p_variation:'blue', p_style:'ms13kt1906', p_originalprice:'21.0', p_currency:'$'});
      productC.save(function (err) {console.log('product C saved successfully');});
      var productD = new Products({p_id: '4',p_name: 'check pattern tshirt', p_variation:'mens red', p_style:'ms13kt1906', p_originalprice:'22.0', p_currency:'$'});
      productD.save(function (err) {console.log('product D saved successfully');});


  });



  
  // all other routes are handled by Angular
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/../../dist/index.html'));
  });





  app.listen(app.get('port'), function() {
    console.log('Angular 2 Full Stack listening on port '+app.get('port'));
  });
});

module.exports = app;