const express = require('express');
const route = express.Router();
const admin = require('../services/admin');

route.post('/get', admin.getCategories);
route.post('/post', admin.addCategory);
route.post('/delete', admin.deleteCategory);

module.exports = route;