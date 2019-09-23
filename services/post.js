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


async function getCategories(req,res) {
    console.debug('post.getCategories():'+JSON.stringify(req.body))
    try {
        const result = await req.users_col.find({}).toArray();
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(200).json({ msg: 'failed to process request' });
    }



}
module.exports = {
    createPost
}


