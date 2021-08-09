const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.options('*', cors());


//router
const productsRouter = require('./routers/product_route');

require('dotenv/config');
const api = process.env.API_URL;

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use(`${api}/products`, productsRouter)




//mongo connect
mongoose.connect(process.env.CONNECTION_STRING, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    dbName: 'necessito-database'
 })
.then(()=> {
    console.log('Database connection is ready');
})
.catch((err) => {
    console.log('Database connection error');
})




//server listening from port 3000
app.listen(3000, () => {
    console.log(api);
    console.log('server is running now http://localhost:3000'+api);
})