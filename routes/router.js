const express = require('express');
const route = express.Router();
const service = require('../services/services');

route.get('/checkemail', service.checkEmail);
route.post('/insert', service.insertUser);
route.post('/login', service.loginCheck);
// route.get('/protected', service.getUserList);

module.exports = route;