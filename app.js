// 1. Dependencies
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const route = require('./routes/router');
const url = require('url');


// 2. Instantiations
const app = express();
// ###############################
// please copy past the url i sent you, when you push make sure you removed the url
const dbUrl = 'mongodb+srv://mwaproject:WIAawD9Q7leGEacq@cluster0-mqisf.mongodb.net/test?retryWrites=true&w=majority';
// ###############################
const client = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
// db user: mwaproject, pass: WIAawD9Q7leGEacq
const logPath = fs.createWriteStream(path.join(__dirname + 'access.log'), { flags: 'a' });
let collection = null;
client.connect((err) => {
    try {
        if (err) throw err;
        const db = client.db('final');
        collection = db.collection('login')
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
app.use((req, res, next) => {
    const reqUrl = url.parse(req.url);
    console.log(reqUrl.pathname);
    if (reqUrl.pathname === '/api/login'
        || reqUrl.pathname == '/api/insert'
        || reqUrl.pathname == '/api/checkemail') {
        return next();
    } else {
        if (req.headers.authorization)
            next();
        else
            res.status(404).json({ msg: 'you are not authorized' });
    }
});

// 5. Routers
app.use('/api', route);

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