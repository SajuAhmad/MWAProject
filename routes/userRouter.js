const express = require('express');
const route = express.Router();
const admin = require('../services/admin');
const register = require('../services/register');
const login = require('../services/login');

route.post('/', admin.updateUser);
route.get('/', admin.getUserList);
route.post('/check', register.checkUserExist);
route.post('/insert', register.insertUser);
route.post('/login', login.loginCheck);

module.exports = route;