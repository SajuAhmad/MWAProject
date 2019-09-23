const express = require('express');
const route = express.Router();
const login = require('../services/login');
const register = require('../services/register');
const admin = require('../services/admin');
const post = require('../services/post');

route.post('/check', register.check);
route.post('/insert', register.insertUser);
route.post('/login', login.loginCheck);

route.get('/users', admin.getUserList);
route.post('/users', admin.updateUser);
route.post('/categories/get', admin.getCategories);
route.post('/categories/post', admin.addCategory);
route.post('/categories/delete', admin.deleteCategory);


route.post('/post/create', post.createPost);
route.post('/post', post.createPost);
route.get('/post', post.getPostList);
route.get('/post/:id', post.getPost);
route.post('/post/comment', post.commendPost);
route.post('/post/like', post.likePost);
route.post('/post/unlike', post.unlikePost); 
route.post('/post/getCategories', post.getCategories);


module.exports = route;