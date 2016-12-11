# Shopping Cart Module using Angular2, Node, Express and Mongo  [![MIT license](http://img.shields.io/badge/license-MIT-lightgrey.svg)](http://opensource.org/licenses/MIT)


The front-end of this project was generated with [Angular CLI](https://github.com/angular/angular-cli).

This project uses the [MEAN stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)):
* [**M**ongoose.js](http://www.mongoosejs.com) ([MongoDB](http://www.mongodb.com)): database
* [**E**xpress.js](http://expressjs.com): backend framework
* [**A**ngular 2](https://angular.io): frontend framework
* [**N**ode.js](https://nodejs.org): runtime environment
* [Angular CLI](https://cli.angular.io): project scaffolding
* [Bootstrap 4](http://www.getbootstrap.com): layout and styles
* [Font Awesome](http://fontawesome.io): icons

## Prerequisites
1. Install [Node.js](https://nodejs.org) and [MongoDB](http://www.mongodb.com)
2. Install Angular CLI: `npm i angular-cli -g`
3. From project root folder install all the dependencies: `npm i`

## CLOUD URL
1. The application has been deployed to Heroku - Cloud Application Platform. 
2. Visit this link to test the application: [https://heroku-node-shopkart.herokuapp.com/](https://heroku-node-shopkart.herokuapp.com/)

## Run
1. Delete all files from 'dist' folder.
2. Command window 1: `ng build -w`: build the project and keep watching the files for changes
3. Command window 2: `npm start`: run Express server
4. Go to [localhost:8080](http://localhost:8080)
5. Database for the application is placed on Mongo-lab. In order to connect to it, use the following connection settings from any local mongo db client (like RoboMongo):
   `Database: ds133158.mlab.com`,
   `Port: 33158`,
   `Database User: rahul`,
   `Database User's password: rahul`.		

## Production
Run `ng build -prod` to create a production ready bundle.

### Author
* [Rahul Srivastava](https://github.com/rahul-openstack)
