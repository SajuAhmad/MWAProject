
async function checkToken(req, res, next) {
    if (req.headers.authorization) {
        try {
            const result = await req.collection.find({}).toArray();
            res.status(200).json(result);
        } catch (e) {
            console.log(e);
            res.status(404).json({ msg: 'you are not authorized' });
        }
    } else {

    }
}

module.exports = { checkToken };