const express = require('express');
const route = express.Router();
const login = require('../services/login');
const register = require('../services/register');
const admin = require('../services/admin');

route.get('/checkemail', register.checkEmail);
route.post('/insert', register.insertUser);
route.post('/login', login.loginCheck);
route.get('/protected', admin.getUserList);

module.exports = route;