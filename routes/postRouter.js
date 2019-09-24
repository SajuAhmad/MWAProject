const express = require('express');
const route = express.Router();
const post = require('../services/post');

route.post('/', post.createPost);
route.get('/', post.getPostList);
route.get('/:id', post.getPost);
route.post('/comment', post.commendPost);
route.post('/like', post.likePost);
route.post('/unlike', post.unlikePost);
route.post('/getCategories', post.getCategories);
route.post('/categoryList', post.getCategoryList);


module.exports = route;