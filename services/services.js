const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function checkEmail(req, res, next) {
    console.log(req.query.email);
    try {
        const data = req.collection.find({ email: req.query.email });
        const result = await data.toArray();
        if (result.length > 0) {
            res.status(200).json({ isExist: true });
        } else {
            res.status(200).json({ isExist: null });
        }

    } catch (e) {
        console.log(e);
    }
}

async function insertUser(req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);
    const user = { username, password, email };
    req.collection.insertOne(user, (err, rslt) => {
        try {
            if (err) throw err;
            res.status(200).json({ "msg": "element added..." });
        } catch (e) {
            console.log('Error:\n' + e.errmsg);
            res.status(200).json({ "msg": "data insertion failed" });
        }
    });
}

async function loginCheck(req, res, next) {
    console.log(req.body.password);
    try {
        const data = req.collection.find({ username: req.body.username });
        const result = await data.toArray();
        if (result.length === 1) {
            const hash = result[0].password;
            const isCorrect = await bcrypt.compare(req.body.password, hash);
            console.log(isCorrect);
            if (isCorrect) {
                const token = jwt.sign({ userID: result._id }, 'todo-app-super-shared-secret', { expiresIn: '2h' });
                res.status(200).json({ token });
            } else {
                res.status(200).json({ "msg": "invalid user" });
            }
        } else {
            res.status(200).json({ "msg": "invalid user" });
        }

    } catch (e) {
        console.log(e);
    }
}

async function getUserList(req, res, next) {
    try {
        const result = await req.collection.find({}).toArray();
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(200).json({ msg: 'failed to process request' });
    }

}

module.exports = { checkEmail, insertUser, loginCheck, getUserList }