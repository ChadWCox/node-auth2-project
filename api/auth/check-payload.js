module.exports = (req, res, next) => {
    const body = req.body;
    if (!body.username || !body.password) {
        res.status(401).json('UserName and Password are required')
    } else {
        next()
    }
}