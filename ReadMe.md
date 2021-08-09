### 1 Initialize the node project:
    npm init
### 2 To monitor node operation in console:
    npm install nodemon
### 3 Create a file named with your entry point
    Here it is app.js. 
    Please llokinto the code for more under standing
### 4 To start server: 
    npm start
### 5 npm install express 
    To install file server. Please look into app.js for express configuration
### 6 API version control: 
    npm install dotenv
### 7 create a file named .env and configure as per example

### 8 To parse request.body use following command:
    npm install body-parser
### 9 HTTP request logger middleware for node.js:
    npm install morgan

    //middleware
    app.use(morgan('tiny'));

For more reference [click this](https://www.npmjs.com/package/morgan).

### 10 Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
    npm install mongoose
##### import mongoose in your app.js
    const mongoose = require('mongoose');
##### Then create the connectivity
    //mongo connect
    mongoose.connect('enter-your-mongo-connect-link')
    .then(()=> {
        console.log('Database connection is ready');
    })
    .catch((err) => {
        console.log('Database connection error');
    })

For details about mongoose schema [click this](https://mongoosejs.com/docs/guide.html).

### 11 How to enable CORS is node.js: 
*CORS is basically permits other application to use my backend application*
##### To install CORS:
    npm install cors
    //then 
    const cors = require('cors');

    app.use(cors());
    app.options('*', cors());

