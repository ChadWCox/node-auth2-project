const User = require('../users/user-modal');

module.exports = async (req, res, next) => {
    const { username } = req.body;

    try {
        const rows = await User.findBy({ username: username })
        if (!rows.length) {
            next()
        } else {
            res.status(401).json('username taken')
        }
    } catch (e) {
        res.status(500).json( e.message )
    }
};