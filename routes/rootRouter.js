const express = require('express');
const route = express.Router();

const postRouter = require('./postRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')


route.use('/user', userRouter)
route.use('/post', postRouter)
route.use('/category', categoryRouter)


module.exports = route;