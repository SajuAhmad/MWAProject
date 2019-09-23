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

async function getPostList(req, res, next) {
    // console.log(req.body);

    const datas = await req.posts_col.find({}).sort({
        'like': -1
    }).limit(50).toArray().then(data => {
        // console.log(data)
        return data;
    }).catch(err => {
        // console.log(err);
        throw new Error(err);
    })
    // console.log(datas);
    res.json({
        message: "success",
        status: 200,
        data: datas
    })
}


async function getCategories(req, res) {
    console.debug('post.getCategories():' + JSON.stringify(req.body))
    try {
        const result = await req.users_col.find({}).toArray();
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(200).json({ msg: 'failed to process request' });
    }



}
module.exports = {
    createPost,
    getPostList,
    getPost,
    getCategories
}
