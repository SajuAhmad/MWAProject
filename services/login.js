const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function loginCheck(req, res, next) {
    console.log(req.body.password);
    try {
        const data = req.users_col.find({ username: req.body.username });
        const result = await data.toArray();
        if (result.length === 1) {
            const hash = result[0].password;
            const isCorrect = await bcrypt.compare(req.body.password, hash);
            
            if (isCorrect) {
                console.log('loginCheck() : user logged in:'+result[0].username);
                const token = jwt.sign({ username: result.username }, 
                    'blog-app-super-shared-secret', 
                    { expiresIn: '2h' });
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