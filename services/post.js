var ObjectId = require('mongodb').ObjectId;
async function createPost(req, res, next) {

    await req.posts_col.insertOne(req.body).then(data => {
        // console.log(data)
    }).catch(err => {
        // console.log(err);
        throw new Error(err);
    })
    console.log("finish post");
    res.json({
        message: "success",
        status: 200
    })
}

async function getPost(req, res, next) {
    // console.log(req);
    const id = req.params.id;
    const myData = await req.posts_col.findOne({
        _id: ObjectId(id)
    }).then(data => {
        // console.log(data)
        return data;
    }).catch(err => {
        // console.log(err);
        throw new Error(err);
    })
    console.log(myData);
    res.json({
        message: "success",
        status: 200,
        data: myData
    })
}

async function likePost(req, res, next) {
    const data = req.body;
    await req.posts_col.updateOne({
        _id: ObjectId(data.id)
    }, {
        $push: {
            likes: {
                "username": data.username
            }
        }
    })
    res.json({
        message: "success",
        status: 200,
    });
}

async function getCategoryList(req, res) {
console.log(req.body.category)
    const data = await req.posts_col.find({
            category: req.body.category
        })
        .limit(10).toArray().then(data => {
            // console.log(data)
            return data;
        }).catch(err => {
            // console.log(err);
            throw new Error(err);
        });
    res.json({
        message: "success",
        status: 200,
        data: data
    })
}

async function getCategories(req, res) {
    // console.debug('admin.getCategories():' + JSON.stringify(req.body))

    const data = await req.posts_col.aggregate([{
            $group: {
                _id: {
                    "category": "$category"
                }
            }
        },
        {
            $project: {
                _id: 0,
                name: '$_id.category'
            }
        }
    ]).toArray().then(data => {
        // console.log(data)
        return data;
    }).catch(err => {
        // console.log(err);
        throw new Error(err);
    })
    res.json({
        message: "success",
        status: 200,
        data: data
    })

}

async function unlikePost(req, res, next) {
    const data = req.body;
    await req.posts_col.updateOne({
        _id: ObjectId(data.id)
    }, {
        $pull: {
            likes: {
                "username": data.username
            }
        }
    })
    res.json({
        message: "success",
        status: 200,
    });
}


async function getPostList(req, res, next) {
    console.log(req.body);

    const datas = await req.posts_col.find({}).sort({
        'like': -1
    }).limit(50).toArray().then(data => {
        // console.log(data)
        return data;
    }).catch(err => {
        // console.log(err);
        throw new Error(err);
    })
    console.log(datas);
    res.json({
        message: "success",
        status: 200,
        data: datas
    })
}



async function commendPost(req, res, next) {

    await req.posts_col.updateOne({
        _id: ObjectId(req.body.id)
    }, {
        $push: {
            commends: {
                "username": req.body.username,
                "desc": req.body.comment
            }
        }
    }).then(data => data).catch(error => {
        throw new Error(error);
    })
    res.json({
        message: "success",
        status: 200,
    });

}



module.exports = {
    createPost,
    getPostList,
    getPost,
    commendPost,
    likePost,
    unlikePost,
    getCategories,
    getCategoryList
}