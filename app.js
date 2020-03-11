// IMPORTS
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const dbConnect = require('./dbConnect');
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
app
.use(bodyParser.json())
.use(expressValidator())
.use(cookieParser())
.use(morgan('dev'));


// ROUTES MIDDLEWARE
app
.use('/api/auth', authRouter)
.use('/api/user', userRouter)
.use('/api', categoryRouter)
.use('/api', productRouter);