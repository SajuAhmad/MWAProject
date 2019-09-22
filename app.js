// 1. Dependencies
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const router = require('./routes/router')
const privates = require('./privates')
const jwt = require('jsonwebtoken');

// 2. Instantiations
const app = express();

// ###############################
const client = new MongoClient(privates.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const logPath = fs.createWriteStream(path.join(__dirname + 'access.log'), { flags: 'a' });
let collection = null;
client.connect((err) => {
    try {
        if (err) throw err;
        const db = client.db(privates.DATABASE_NAME);
        collection = db.collection(privates.USERS_COLLECTION)
        console.log('connected to db...');
    } catch (e) {
        console.log(e);
    }
});

// 3. Configurations
const port = process.env.port || 1000;

// 4. Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev', { stream: logPath }));
app.use(express.json());
app.use((req, res, next) => {
    req.collection = collection;
    next();
});
// check token for every request
app.use(async (req, res, next) => {
    console.log(req.url);
    // const reqUrl = url.parse(req.url);
    // console.log(reqUrl.pathname);
    if (req.url == '/api/login'
        || req.url == '/api/insert'
        || req.url == '/api/check') {
        return next();
    } else {
        if (req.headers.authorization && jwt.verify(req.headers.authorization, 'todo-app-super-shared-secret')) {
            next();
        }
        else
            res.status(404).json({ msg: 'you are not authorized' });
    }
});

// 5. Routers
app.use('/api', router);

// 6. Error Handlers
app.use((err, req, res, next) => {
    error = {
        message: err.message,
        status: err.status || 500
    }
    res.status(error.status).json(error);
});

// 7. Bootup
app.listen(port, _ => { console.log(`Express server is started on ${port}`); });
process.on('exit', _ => { client.close() });