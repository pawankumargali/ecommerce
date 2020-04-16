// IMPORTS
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const dbConnect = require('./dbConnect');
const cors = require('cors');
const morgan = require('morgan');

// IMPORT ROUTES
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');

// SERVER & DB SETUP
const app = express();
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
dbConnect();

// APP MIDDLEWARE
app.use(cors());
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cookieParser())
app.use(morgan('dev'));

// ROUTES MIDDLEWARE
app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter);


app.get('/', (req,res) => {
    res.redirect('https://github.com/pawankumargali/ecommerce');
})