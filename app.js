const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const cors = require('cors');
const formidable = require('express-formidable');
require('./db');
const PostRoute = require('./Routes/post');
const CategoryRoute = require('./Routes/category');
const PaymentRoute = require('./Routes/payments');


app.use(cors());

app.use(bodyParse.json({ limit: '50mb', extended: true }));
app.use(bodyParse.urlencoded({ limit: '50mb', extended: true }));


app.use('/post', PostRoute);
app.use('/payment', PaymentRoute);
app.use('/category', CategoryRoute);


app.listen(4444);

