const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function check(req, res, next) {
    // console.log('register.check():' + JSON.stringify(req.body));
    try {
        const data = req.users_col.find(req.body);
        const result = await data.toArray();
        if (result.length > 0) {
            res.status(200).json({ isExist: true });
        } else {
            res.status(200).json({ isExist: null });
        }
    } catch (e) {
        console.log('register.check().exception:' + e);
    }
}

async function insertUser(req, res, next) {
    // console.log('register.insertUser():' + JSON.stringify(req.body));
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = 'user';//default user
    req.body.active = true;//default user
    req.users_col.insertOne(req.body, (err, rslt) => {
        try {
            if (err) throw err;
            res.status(200).json({ "status": 1 });
        } catch (e) {
            console.log('Error:\n' + e.errmsg);
            res.status(200).json({ "status": e.errmsg });
        }
    });
}

module.exports = { check, insertUser }