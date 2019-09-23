async function getUserList(req, res, next) {
    console.debug('admin.getUserList():'+JSON.stringify(req.body));
    try {
        const result = await req.users_col.find({}).toArray();
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(200).json({ msg: 'failed to process request' });
    }
}

module.exports = { getUserList }