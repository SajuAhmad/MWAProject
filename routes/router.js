const express = require('express');
const route = express.Router();
const login = require('../services/login');
const register = require('../services/register');
const admin = require('../services/admin');
const post = require('../services/post');

route.post('/check', register.check);
route.post('/insert', register.insertUser);
route.post('/login', login.loginCheck);
route.post('/categories', post.getCategories);
route.post('/post/create', post.createPost);

route.get('/protected', admin.getUserList);

module.exports = route;