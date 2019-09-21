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

module.exports = { checkEmail, insertUser }