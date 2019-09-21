const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

module.exports = { loginCheck }