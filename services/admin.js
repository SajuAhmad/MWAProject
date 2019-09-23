async function getUserList(req, res, next) {
    console.debug('admin.getUserList():' + JSON.stringify(req.body));
    try {
        const result = await req.users_col.find({},{projection: {password:0, _id:0}}).toArray();
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(200).json({ msg: 'failed to process request' });
    }
}

async function getCategories(req, res) {
    console.debug('admin.getCategories():' + JSON.stringify(req.body))
    try {
        const result = await req.cats_col.find({},{projection: {_id:0}}).toArray();
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(200).json({ msg: 'failed to process request' });
    }
}

async function addCategory(req, res) {
    console.debug('admin.addCategory():' + JSON.stringify(req.body))

    const result = await req.cats_col.insertOne(req.body,
        (err, rslt) => {
        try {
            if (err) throw err;
            res.status(200).json({ "status": 1 });
        } catch (e) {
            console.log('Error:\n' + e.errmsg);
            res.status(200).json({ "status": e.errmsg });
        }
    });
}

async function updateUser(req, res) {
    console.debug('admin.updateUser():' + JSON.stringify(req.body))
    const result = await req.users_col.updateOne({ username: req.body.username },
        {$set: {role: req.body.role, active: req.body.active }}, (err, rslt) => {
            try {
                if (err) 
                    throw err;
                res.status(200).json({ "status": 1 });
            } catch (e) {
                console.log('Error:\n' + e.errmsg);
                res.status(200).json({ "status": e.errmsg });
            }

        })
}


module.exports = { getUserList, getCategories, addCategory, updateUser }