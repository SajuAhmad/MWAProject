async function createPost(req, res, next) {
    console.log("create post");
    console.log(req.body);
    // await req.posts_col.insertOne({}).then(data => {
    //     // console.log(data)
    // }).catch(err => {
    //     console.log(err);
    // })
    console.log("finish post");
    res.json({})

}

module.exports = {
    createPost
}